"""Transforma classes.npy (saída de classificar.py) nos dados do jogo: www/mapas/<cidade>.js
Uso: python3 gerar_mapa.py <cidade> classes.npy saida.js   (cidades em cidades.py)

- grade de terreno (1 célula = 4 px de z17 ≈ 4,3 m), codificada em RLE + base64
- prédios: polígonos simplificados + altura estimada por bairro, Uint16 + base64
"""
import sys, os, math, base64, json, hashlib, numpy as np, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cidades import CIDADES

CID = sys.argv[1]
CFG = CIDADES[CID]
S, W, N, E = CFG['bbox']
Z = CFG.get('zoom', 17)
ESC = 2 ** (Z - 17)   # 1 em z17, 0,5 em z16 (escala dos filtros em pixels)
CEL = 4

def tx(lon): return (lon + 180) / 360 * 2 ** Z * 256
def ty(lat):
    r = math.radians(lat); return (1 - math.asinh(math.tan(r)) / math.pi) / 2 * 2 ** Z * 256

# mesma origem usada pelo corte em baixar_tiles.py
GX0 = int(tx(W) // 256) * 256 + int(tx(W) - int(tx(W) // 256) * 256)
GY0 = int(ty(N) // 256) * 256 + int(ty(N) - int(ty(N) // 256) * 256)
MPP = 156543.03392 * math.cos(math.radians((S + N) / 2)) / 2 ** Z

def px(lat, lon): return tx(lon) - GX0, ty(lat) - GY0

cls = np.load(sys.argv[2])
H, Wd = cls.shape
out = sys.argv[3]

# ---------------- ruas na largura real ----------------
# no mapa as ruas são linhas finas: tira ruído (letras dos rótulos) e alarga só sobre chão livre
rua = (cls == 2).astype(np.uint8)
n, lab, st, _ = cv2.connectedComponentsWithStats(rua, connectivity=8)
grandes = np.zeros(n, np.uint8); grandes[1:] = (st[1:, cv2.CC_STAT_AREA] >= 150)
rua = grandes[lab]
kd = 9 if Z >= 17 else 3
larga = cv2.dilate(rua, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (kd, kd)))
cls = cls.copy()
cls[(cls == 2) & (rua == 0)] = 1
cls[(larga == 1) & (cls == 1)] = 2

# ---------------- grade de terreno ----------------
gh, gw = H // CEL, Wd // CEL
c = cls[:gh * CEL, :gw * CEL].reshape(gh, CEL, gw, CEL).transpose(0, 2, 1, 3).reshape(gh, gw, CEL * CEL)
cnt = np.stack([(c == k).sum(-1) for k in range(10)], -1)  # gh,gw,10
cnt[..., 5] += cnt[..., 6]
grid = np.ones((gh, gw), np.uint8)
grid[cnt[..., 9] >= 8] = 9          # fazenda
grid[cnt[..., 8] >= 7] = 8          # floresta/mata
grid[cnt[..., 3] >= 6] = 3
grid[cnt[..., 4] >= 6] = 4
grid[cnt[..., 2] >= 5] = 2
grid[cnt[..., 5] >= 7] = 5
grid[cnt[..., 0] >= 9] = 0
# ruas sobre a água (pontes) continuam transitáveis
ponte = (cnt[..., 0] >= 9) & ((cnt[..., 2] + cnt[..., 1]) >= 2)
grid[ponte] = 6
# linha central das ruas (a linha fina original do mapa)
k7 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7) if Z >= 17 else (4, 4))
larga_via = cv2.dilate(cv2.erode(rua, k7), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11, 11) if Z >= 17 else (6, 6)))
fina = rua & (1 - larga_via)           # vias expressas (largas no mapa) ficam sem faixa central
cr = fina[:gh * CEL, :gw * CEL].reshape(gh, CEL, gw, CEL).sum(axis=(1, 3))
grid[(cr >= 4) & (grid == 2)] = 7
def rle(a):
    a = a.ravel(); res = bytearray(); i = 0; n = len(a)
    while i < n:
        v = a[i]; j = i
        while j < n and a[j] == v and j - i < 255: j += 1
        res += bytes([v, j - i]); i = j
    return bytes(res)
grle = rle(grid)

# ---------------- prédios ----------------
m = ((cls == 5) | (cls == 6)).astype(np.uint8)
m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
cont, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

def zona_altura(x, y, area_m2, h):
    """altura estimada (m) conforme o bairro real e o tamanho da base do prédio"""
    rnd = int(hashlib.md5(f'{x:.0f},{y:.0f}'.encode()).hexdigest()[:8], 16) / 0xffffffff
    big = min(1.0, area_m2 / 2500)
    rnd2 = int(hashlib.md5(f'{y:.0f}:{x:.0f}'.encode()).hexdigest()[:8], 16) / 0xffffffff
    for z in CFG['zonas']:
        la0, la1, lo0, lo1, base, mult, var = z[:7]
        chance = z[7] if len(z) > 7 else CFG.get('chance_alto', 1.0)
        x0, y1 = px(la0, lo0); x1, y0 = px(la1, lo1)
        if x0 <= x <= x1 and y0 <= y <= y1:
            if rnd2 > chance:
                return base * 0.6 + rnd * base   # prédio comum do bairro
            if area_m2 > 6000:
                big = 0.5 + rnd2 * 0.5           # quarteirão inteiro: torre um pouco mais baixa
            return base + big * (mult + rnd * var) + rnd * min(30, base)
    b0, b1, m0, m1 = CFG.get('altura_padrao', (4, 4, 6, 12))
    return b0 + rnd * b1 + big * (m0 + rnd * m1)

blds = []
for ct in cont:
    a = cv2.contourArea(ct)
    if a * MPP * MPP < 35: continue
    ap = cv2.approxPolyDP(ct, 1.3, True).reshape(-1, 2)
    if len(ap) < 3: continue
    if len(ap) > 40:
        ap = cv2.approxPolyDP(ct, 2.5, True).reshape(-1, 2)
    xs, ys = ap[:, 0].mean(), ap[:, 1].mean()
    am2 = a * MPP * MPP
    hgt = zona_altura(xs, ys, am2, H)
    blds.append((hgt, ap))
arr = []
for hgt, ap in blds:
    arr += [len(ap), int(min(hgt, 300) * 4)]
    for x, y in ap:
        arr += [int(x) * 2, int(y) * 2]
barr = np.array(arr, np.uint16).tobytes()

LUGARES = CFG['lugares']
lug = {k: [n, round(px(la, lo)[0], 1), round(px(la, lo)[1], 1)] for k, (n, la, lo) in LUGARES.items()}

dele = [[n, round(px(la, lo)[0], 1), round(px(la, lo)[1], 1)] for (n, la, lo) in CFG['delegacias']]
saidas = [[n, round(px(la, lo)[0], 1), round(px(la, lo)[1], 1), d] for (n, la, lo, d) in CFG.get('saidas', [])]
meta = dict(cidade=CID, nome=CFG['nome'], pais=CFG['pais'], costa=CFG['costa'], baseAng=CFG['base_ang'], rural=CFG.get('rural', False), saidas=saidas,
            focos=CFG['focos'], delegacias=dele,
            gx0=GX0, gy0=GY0, z=Z, mpp=MPP, cel=CEL, gw=gw, gh=gh, wpx=Wd, hpx=H, lugares=lug,
            bbox=[S, W, N, E])
js = ('// gerado por ferramentas/gerar_mapa.py a partir do mapa Esri World_Topo_Map (z17): ' + CFG['nome'] + '\n'
      'window.MAPA_DADOS = {META: ' + json.dumps(meta, ensure_ascii=False) + ',\n'
      'GRADE_RLE: "' + base64.b64encode(grle).decode() + '",\n'
      'PREDIOS: "' + base64.b64encode(barr).decode() + '"};\n')
open(out, 'w', encoding='utf-8').write(js)
print('grade', gw, gh, 'rle', len(grle), 'prédios', len(blds), 'bytes', len(barr), 'js', len(js), 'MPP', MPP)
print('alturas>60m', sum(1 for h, _ in blds if h > 60), 'max', max(h for h, _ in blds))
