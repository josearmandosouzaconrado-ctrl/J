"""Gera o mapa de uma cidade a partir de um arquivo do OpenStreetMap (.osm, exportado do site).
Uso: python3 osm_mapa.py <cidade> mapa.osm <pasta_saida>
Saída: <pasta>/classes.npy (classes de terreno já finais, em pixels de z17) e <pasta>/predios.json
Depois: python3 gerar_mapa.py <cidade> <pasta>/classes.npy ../www/mapas/<cidade>.js <pasta>/predios.json

- água (lagoas), parques, matas, campos, ruas na largura real, pontes e trilhos vêm do OSM;
- prédios do OSM com a altura dos andares (building:levels) quando houver;
- onde o OSM não tem prédios desenhados, o quarteirão é preenchido com casas e prédios ao longo das ruas,
  mais altos no centro e mais baixos nos bairros (gerados com semente fixa: o mapa sai sempre igual).
Classes: 0 água, 1 chão, 2 rua, 3 parque, 4 areia/terra, 5 prédio, 6 ponte, 7 centro da rua, 8 mata, 9 campo
"""
import sys, os, math, json, random, xml.etree.ElementTree as ET
import numpy as np, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cidades import CIDADES

CID, OSM, OUT = sys.argv[1:4]
CFG = CIDADES[CID]
S, W, N, E = CFG['bbox']
Z = 17

def tx(lon): return (lon + 180) / 360 * 2 ** Z * 256
def ty(lat):
    r = math.radians(lat); return (1 - math.asinh(math.tan(r)) / math.pi) / 2 * 2 ** Z * 256
GX0, GY0 = int(tx(W)), int(ty(N))
MPP = 156543.03392 * math.cos(math.radians((S + N) / 2)) / 2 ** Z
WD, HT = int(math.ceil(tx(E) - GX0)), int(math.ceil(ty(S) - GY0))
def px(lat, lon): return (tx(lon) - GX0, ty(lat) - GY0)
M = 1 / MPP   # pixels por metro

# ---------------- leitura do OSM ----------------
raiz = ET.parse(OSM).getroot()
nos = {n.get('id'): px(float(n.get('lat')), float(n.get('lon'))) for n in raiz.iter('node')}
def tags(x): return {t.get('k'): t.get('v') for t in x.findall('tag')}
vias = {}
for w in raiz.findall('way'):
    pts = [nos[n.get('ref')] for n in w.findall('nd') if n.get('ref') in nos]
    vias[w.get('id')] = (pts, tags(w))

def aneis(rel):
    """junta os pedaços (ways) de uma relação multipolígono em anéis fechados"""
    res = {'outer': [], 'inner': []}
    for papel in res:
        pedacos = [list(vias[m.get('ref')][0]) for m in rel.findall('member')
                   if m.get('type') == 'way' and m.get('role', 'outer') in ((papel,) if papel == 'inner' else ('outer', '')) and m.get('ref') in vias]
        pedacos = [p for p in pedacos if len(p) >= 2]
        while pedacos:
            anel = pedacos.pop(0)
            mudou = True
            while anel[0] != anel[-1] and mudou:
                mudou = False
                for i, p in enumerate(pedacos):
                    if p[0] == anel[-1]: anel += p[1:]
                    elif p[-1] == anel[-1]: anel += p[::-1][1:]
                    elif p[-1] == anel[0]: anel = p[:-1] + anel
                    elif p[0] == anel[0]: anel = p[::-1][:-1] + anel
                    else: continue
                    pedacos.pop(i); mudou = True; break
            if len(anel) >= 3: res[papel].append(anel)
    return res

areas = []   # (tags, aneis externos, aneis internos)
for wid, (pts, t) in vias.items():
    if len(pts) >= 4 and pts[0] == pts[-1]: areas.append((t, [pts], []))
for r in raiz.findall('relation'):
    t = tags(r)
    if t.get('type') == 'multipolygon':
        a = aneis(r)
        if a['outer']: areas.append((t, a['outer'], a['inner']))

def poly(pts): return np.round(np.array(pts) * 8).astype(np.int32)   # 3 bits de subpixel
def encher(img, ext, inte, v):
    cv2.fillPoly(img, [poly(p) for p in ext], v, lineType=cv2.LINE_8, shift=3)
    if inte: cv2.fillPoly(img, [poly(p) for p in inte], 1 if img.dtype == np.uint8 and v != 1 else 0, shift=3)

cls = np.ones((HT, WD), np.uint8)

# ---------------- uso do solo ----------------
def classe_area(t):
    if t.get('building') or t.get('building:part'): return None
    nat, lu, le = t.get('natural'), t.get('landuse'), t.get('leisure')
    if nat == 'water' or 'water' in t or lu in ('reservoir', 'basin') or t.get('waterway') == 'riverbank': return 0
    if nat in ('wood', 'scrub', 'heath') or lu == 'forest': return 8
    if lu in ('farmland', 'meadow', 'farmyard', 'orchard', 'grassland') or nat == 'grassland': return 9
    if le in ('park', 'garden', 'pitch', 'golf_course', 'recreation_ground', 'playground', 'dog_park', 'track') or \
       lu in ('grass', 'recreation_ground', 'village_green', 'cemetery') or nat == 'wetland' or t.get('amenity') == 'grave_yard': return 3
    if nat in ('sand', 'beach', 'bare_rock') or lu in ('construction', 'quarry', 'brownfield'): return 4
    return None
ordem = [9, 8, 3, 4, 0]
for k in ordem:
    for t, ext, inte in areas:
        if classe_area(t) == k: encher(cls, ext, inte, k)
agua = cls == 0

# ---------------- ruas, pontes e trilhos ----------------
LARG = {'motorway': 16, 'trunk': 14, 'primary': 12, 'secondary': 10, 'tertiary': 9, 'unclassified': 7, 'residential': 7,
        'living_street': 6, 'service': 4.5, 'pedestrian': 5, 'busway': 7, 'motorway_link': 7, 'trunk_link': 7, 'primary_link': 7,
        'secondary_link': 7, 'tertiary_link': 7, 'road': 7}
rua = np.zeros((HT, WD), np.uint8); ponte = np.zeros_like(rua); centro = np.zeros_like(rua); terra = np.zeros_like(rua)
ruas = []   # (pontos, largura m, tipo) para as casas
for wid, (pts, t) in vias.items():
    hw = t.get('highway')
    if len(pts) < 2: continue
    if t.get('railway') in ('rail', 'light_rail', 'narrow_gauge') and t.get('tunnel') != 'yes':
        cv2.polylines(terra, [poly(pts)], False, 1, max(1, int(round(4 * M))), shift=3); continue
    if hw == 'track':
        cv2.polylines(terra, [poly(pts)], False, 1, max(1, int(round(3.5 * M))), shift=3); continue
    if hw not in LARG or t.get('tunnel') == 'yes' or t.get('area') == 'yes': continue
    lm = LARG[hw] * (1.3 if t.get('oneway') == 'no' and hw in ('primary', 'trunk') else 1)
    lp = max(2, int(round(lm * M)))
    cv2.polylines(rua, [poly(pts)], False, 1, lp, shift=3)
    if t.get('bridge') in ('yes', 'viaduct'): cv2.polylines(ponte, [poly(pts)], False, 1, lp, shift=3)
    if lm >= 7 and hw not in ('service', 'pedestrian') and t.get('oneway') != 'yes':
        cv2.polylines(centro, [poly(pts)], False, 1, 1, shift=3)
    ruas.append((pts, lm, hw))
cls[(terra == 1) & ~agua] = 4
cls[(rua == 1)] = 2
cls[(rua == 1) & agua & (ponte == 1)] = 6
cls[(centro == 1) & (cls == 2)] = 7

# ---------------- prédios do OSM ----------------
def altura_osm(t, area_m2, rnd):
    try: return float(t['height'].split()[0])
    except Exception: pass
    try: return max(1, float(t['building:levels'])) * 3.1 + 1.2
    except Exception: pass
    b = t.get('building') or t.get('building:part')
    tab = {'house': 5.5, 'detached': 5.5, 'residential': 7, 'apartments': 18, 'commercial': 9, 'retail': 7.5, 'school': 8,
           'church': 14, 'cathedral': 22, 'industrial': 9, 'warehouse': 8, 'stadium': 16, 'hospital': 14, 'public': 9,
           'garage': 3.5, 'roof': 5, 'shed': 3}
    if b in tab: return tab[b] * (0.85 + 0.3 * rnd)
    return 4.5 + rnd * 3 + min(1, area_m2 / 3000) * 8
predios = []
ocup = np.zeros((HT, WD), np.uint8)
rng = random.Random(7)
for t, ext, inte in areas:
    if not (t.get('building') or t.get('building:part')) or t.get('building') == 'roof': continue
    for anel in ext:
        a = abs(cv2.contourArea(np.array(anel, np.float32))) * MPP * MPP
        if a < 12: continue
        ap = cv2.approxPolyDP(np.array(anel, np.float32), 0.6, True).reshape(-1, 2)
        if len(ap) < 3: continue
        predios.append((round(altura_osm(t, a, rng.random()), 1), ap.round(1).tolist()))
        cv2.fillPoly(ocup, [poly(ap)], 1, shift=3)
        cv2.fillPoly(cls, [poly(ap)], 5, shift=3)
n_osm = len(predios)

# ---------------- casas e prédios gerados ao longo das ruas ----------------
cen = CFG.get('centro')          # (lat, lon, raio do centro m, raio dos bairros próximos m)
cx0, cy0 = px(cen[0], cen[1])
reservas = [(px(la, lo), r * M) for la, lo, r in CFG.get('reservas', [])]   # base militar etc.
ind = np.zeros((HT, WD), np.uint8)
for t, ext, inte in areas:
    if t.get('landuse') in ('industrial', 'commercial', 'retail') or t.get('building') in ('industrial', 'warehouse'):
        encher(ind, ext, [], 1 if t.get('landuse') == 'industrial' else 2)
bloq = ((cls != 1) & (cls != 4)).astype(np.uint8)
bloq_rua = cv2.dilate(((cls == 2) | (cls == 6) | (cls == 7)).astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
bloq = np.maximum(cv2.dilate(bloq, np.ones((3, 3), np.uint8)), bloq_rua)
for (rx, ry), rr in reservas: cv2.circle(bloq, (int(rx), int(ry)), int(rr), 1, -1)
bloq = np.maximum(bloq, cv2.dilate(ocup, np.ones((3, 3), np.uint8)))

def zona(x, y):
    d = math.hypot(x - cx0, y - cy0) * MPP
    i = ind[int(min(HT - 1, max(0, y))), int(min(WD - 1, max(0, x)))]
    if i == 1: return 'ind'
    if d < cen[2]: return 'centro'
    if d < cen[3] or i == 2: return 'anel'
    return 'bairro'
# (frente m, fundo m) e alturas por zona
PARAM = {
    'centro': ((12, 26), (14, 26), 1.2, 0.04),
    'anel':   ((11, 24), (10, 18), 2.0, 0.26),
    'bairro': ((10, 22), (9, 15), 2.5, 0.36),
    'ind':    ((26, 48), (20, 40), 3.0, 0.25),
}   # frente (m), fundo (m), recuo extra (m), chance de lote vago
def altura(z, r):
    u = r.random()
    # Sete Lagoas: prédios de concreto de até ~14 andares no centro, poucos mais altos
    if z == 'centro':
        if u < 0.015: return 45 + r.random() * 10         # 15 a 18 andares
        if u < 0.10: return 30 + r.random() * 14          # 10 a 14 andares
        if u < 0.32: return 15 + r.random() * 15          # 5 a 9 andares
        return 7 + r.random() * 7                          # sobrados e lojas de 2 a 4 andares
    if z == 'anel':
        if u < 0.012: return 28 + r.random() * 16
        if u < 0.07: return 15 + r.random() * 15
        if u < 0.24: return 8 + r.random() * 4
        return 3.6 + r.random() * 3.6
    if z == 'ind': return 7 + r.random() * 4
    if u < 0.01: return 12 + r.random() * 10
    if u < 0.12: return 6.5 + r.random() * 3
    return 3.4 + r.random() * 3

def livre(cs):
    x0, y0 = np.floor(cs.min(0)).astype(int) - 1; x1, y1 = np.ceil(cs.max(0)).astype(int) + 1
    if x0 < 0 or y0 < 0 or x1 >= WD or y1 >= HT: return False
    m = np.zeros((y1 - y0 + 1, x1 - x0 + 1), np.uint8)
    cv2.fillPoly(m, [poly(cs - [x0, y0])], 1, shift=3)
    if (m & bloq[y0:y1 + 1, x0:x1 + 1]).any(): return False
    # o vizinho pode encostar, mas fica uma fresta de ~1 m entre as casas
    return not (cv2.dilate(m, np.ones((3, 3), np.uint8)) & ocup[y0:y1 + 1, x0:x1 + 1]).any()

r = random.Random(11)
ELEG = {'residential', 'living_street', 'unclassified', 'tertiary', 'secondary', 'primary', 'trunk', 'tertiary_link', 'secondary_link', 'primary_link', 'pedestrian', 'road'}
ruas.sort(key=lambda a: -a[1])   # avenidas primeiro: os prédios maiores ficam de frente para elas
gerados = 0
for pts, lm, hw in ruas:
    if hw not in ELEG: continue
    P = np.array(pts, np.float64)
    seg = np.diff(P, axis=0); comp = np.hypot(seg[:, 0], seg[:, 1]); acum = np.concatenate([[0], np.cumsum(comp)])
    L = acum[-1]
    if L < 8 * M: continue
    def ponto(s):
        i = min(len(comp) - 1, max(0, np.searchsorted(acum, s) - 1))
        f = (s - acum[i]) / max(1e-6, comp[i])
        return P[i] + seg[i] * f, seg[i] / max(1e-6, comp[i])
    for lado in (-1, 1):
        s = r.random() * 4 * M
        while s < L:
            p, tv = ponto(min(L, s + 5 * M))
            z = zona(*p)
            (f0, f1), (d0, d1), rec, vago = PARAM[z]
            w = (f0 + r.random() * (f1 - f0)) * M
            if r.random() < vago: s += w; continue      # lote vago / quintal
            d = (d0 + r.random() * (d1 - d0)) * M
            if s + w > L: break
            p, tv = ponto(s + w / 2)
            nv = np.array([-tv[1], tv[0]]) * lado
            off = (lm / 2 + 2.6 + r.random() * rec) * M
            ok = False
            for dd in (d, d * 0.65, d * 0.45):
                if dd < 6 * M: break
                c = p + nv * (off + dd / 2)
                cs = np.array([c - tv * w / 2 - nv * dd / 2, c + tv * w / 2 - nv * dd / 2, c + tv * w / 2 + nv * dd / 2, c - tv * w / 2 + nv * dd / 2])
                if livre(cs): ok = True; break
            if ok:
                h = altura(z, r)
                if h > 11 and w * dd * MPP * MPP < 180: h = 3.6 + r.random() * 3   # lote pequeno demais para prédio: casa
                predios.append((round(h, 1), cs.round(1).tolist()))
                cv2.fillPoly(ocup, [poly(cs)], 1, shift=3)
                cv2.fillPoly(cls, [poly(cs)], 5, shift=3)
                gerados += 1
                s += w + (0.6 + r.random() * 1.2) * M
            else:
                s += 3 * M

os.makedirs(OUT, exist_ok=True)
np.save(os.path.join(OUT, 'classes.npy'), cls)
json.dump(predios, open(os.path.join(OUT, 'predios.json'), 'w'))
pal = np.array([[40, 110, 170], [235, 232, 220], [120, 120, 125], [110, 170, 90], [200, 175, 130], [200, 80, 60], [40, 40, 40], [250, 220, 60], [40, 90, 40], [200, 190, 120]], np.uint8)
cv2.imwrite(os.path.join(OUT, 'classes.png'), cv2.cvtColor(pal[cls], cv2.COLOR_RGB2BGR))
print(f'{WD}x{HT} px, MPP {MPP:.3f} | prédios do OSM {n_osm}, gerados {gerados}, total {len(predios)}')
print('classes', np.bincount(cls.ravel(), minlength=10))
