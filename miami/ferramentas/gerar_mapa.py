"""Transforma classes.npy (saída de classificar.py) nos dados do jogo: src/dados_mapa.js

- grade de terreno (1 célula = 4 px de z17 ≈ 4,3 m), codificada em RLE + base64
- prédios: polígonos simplificados + altura estimada por bairro, Uint16 + base64
"""
import sys, math, base64, json, hashlib, numpy as np, cv2

S, W, N, E = 25.752, -80.210, 25.800, -80.118
Z = 17
CEL = 4

def tx(lon): return (lon + 180) / 360 * 2 ** Z * 256
def ty(lat):
    r = math.radians(lat); return (1 - math.asinh(math.tan(r)) / math.pi) / 2 * 2 ** Z * 256

# mesma origem usada pelo corte em baixar_tiles.py
GX0 = int(tx(W) // 256) * 256 + int(tx(W) - int(tx(W) // 256) * 256)
GY0 = int(ty(N) // 256) * 256 + int(ty(N) - int(ty(N) // 256) * 256)
MPP = 156543.03392 * math.cos(math.radians((S + N) / 2)) / 2 ** Z

def px(lat, lon): return tx(lon) - GX0, ty(lat) - GY0

cls = np.load(sys.argv[1])
H, Wd = cls.shape
out = sys.argv[2]

# ---------------- grade de terreno ----------------
gh, gw = H // CEL, Wd // CEL
c = cls[:gh * CEL, :gw * CEL].reshape(gh, CEL, gw, CEL).transpose(0, 2, 1, 3).reshape(gh, gw, CEL * CEL)
cnt = np.stack([(c == k).sum(-1) for k in range(7)], -1)  # gh,gw,7
cnt[..., 5] += cnt[..., 6]
grid = np.ones((gh, gw), np.uint8)
grid[cnt[..., 3] >= 6] = 3
grid[cnt[..., 4] >= 6] = 4
grid[cnt[..., 2] >= 5] = 2
grid[cnt[..., 5] >= 7] = 5
grid[cnt[..., 0] >= 9] = 0
# ruas sobre a água (pontes) continuam transitáveis
ponte = (cnt[..., 0] >= 9) & ((cnt[..., 2] + cnt[..., 1]) >= 2)
grid[ponte] = 6
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
    """altura estimada (m) conforme o bairro real de Miami e o tamanho da base"""
    rnd = int(hashlib.md5(f'{x:.0f},{y:.0f}'.encode()).hexdigest()[:8], 16) / 0xffffffff
    def em(lat0, lat1, lon0, lon1):
        x0, y1 = px(lat0, lon0); x1, y0 = px(lat1, lon1)
        return x0 <= x <= x1 and y0 <= y <= y1
    big = min(1.0, area_m2 / 2500)
    if em(25.7695, 25.7925, -80.1975, -80.1855):        # Downtown
        return 25 + big * (80 + rnd * 140) + rnd * 30
    if em(25.7525, 25.7695, -80.2010, -80.1860):        # Brickell
        return 20 + big * (70 + rnd * 140) + rnd * 30
    if em(25.7925, 25.8000, -80.1925, -80.1855):        # Edgewater (beira da baía)
        return 18 + big * (60 + rnd * 110)
    if em(25.7620, 25.7720, -80.1440, -80.1300):        # South Pointe (torres)
        return 15 + big * (60 + rnd * 70)
    if em(25.7720, 25.8000, -80.1335, -80.1265):        # Collins / beira-mar
        return 10 + big * (25 + rnd * 60)
    if em(25.7720, 25.8000, -80.1460, -80.1380):        # West Ave (torres na baía)
        return 10 + big * (30 + rnd * 60)
    if em(25.7650, 25.7800, -80.1850, -80.1550):        # Porto (Dodge Island): galpões
        return 9 + rnd * 8 + big * 6
    if em(25.7500, 25.7650, -80.1550, -80.1300):        # Fisher Island
        return 6 + big * (20 + rnd * 25)
    return 4 + rnd * 4 + big * (6 + rnd * 12)            # bairros residenciais

blds = []
for ct in cont:
    a = cv2.contourArea(ct)
    if a < 30: continue
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

LUGARES = {
    'base': ('Base Militar - PortMiami', 25.7745, -80.1700),
    'heliporto': ('Heliporto da Base', 25.7728, -80.1640),
    'docas': ('Docas da Marinha', 25.7705, -80.1570),
    'portaavioes': ('Porta-aviões USS Liberty', 25.7660, -80.1218),
    'bayside': ('Bayside Marketplace', 25.7785, -80.1867),
    'kaseya': ('Kaseya Center', 25.7814, -80.1870),
    'freedom': ('Freedom Tower', 25.7800, -80.1897),
    'brickell': ('Brickell City Centre', 25.7670, -80.1932),
    'bayfront': ('Bayfront Park', 25.7752, -80.1860),
    'ocean': ('Ocean Drive', 25.7800, -80.1310),
    'lummus': ('Lummus Park', 25.7760, -80.1305),
    'southpointe': ('South Pointe Park', 25.7680, -80.1340),
    'watson': ('Watson Island', 25.7850, -80.1780),
    'star': ('Star Island', 25.7770, -80.1500),
    'fisher': ('Fisher Island', 25.7600, -80.1430),
    'havana': ('Little Havana', 25.7730, -80.2060),
    'overtown': ('Overtown', 25.7880, -80.2000),
    'convention': ('Centro de Convenções', 25.7950, -80.1340),
    'venetian': ('Venetian Islands', 25.7900, -80.1600),
}
lug = {k: [n, round(px(la, lo)[0], 1), round(px(la, lo)[1], 1)] for k, (n, la, lo) in LUGARES.items()}

meta = dict(gx0=GX0, gy0=GY0, z=Z, mpp=MPP, cel=CEL, gw=gw, gh=gh, wpx=Wd, hpx=H, lugares=lug,
            bbox=[S, W, N, E])
js = ('// gerado por ferramentas/gerar_mapa.py a partir do mapa Esri World_Topo_Map (z17) de Miami\n'
      'export const META = ' + json.dumps(meta, ensure_ascii=False) + ';\n'
      'export const GRADE_RLE = "' + base64.b64encode(grle).decode() + '";\n'
      'export const PREDIOS = "' + base64.b64encode(barr).decode() + '";\n')
open(out, 'w', encoding='utf-8').write(js)
print('grade', gw, gh, 'rle', len(grle), 'prédios', len(blds), 'bytes', len(barr), 'js', len(js), 'MPP', MPP)
print('alturas>60m', sum(1 for h, _ in blds if h > 60), 'max', max(h for h, _ in blds))
