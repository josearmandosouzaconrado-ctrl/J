# Extrai o formato e os biomas do continente de Aurévia a partir de tools/novo_mapa_ref.jpg
# e grava js/aurevia_mapa.js (mapa de classes 0..6 em RLE).
#  0 mar, 1 campos, 2 floresta, 3 deserto, 4 serra rubra, 5 terra negra (vulcânica), 6 neve
import sys
from PIL import Image, ImageFilter
import numpy as np

src = sys.argv[1] if len(sys.argv) > 1 else 'tools/novo_mapa_ref.jpg'
out = sys.argv[2] if len(sys.argv) > 2 else 'js/aurevia_mapa.js'
im = Image.open(src).convert('RGB')
W, H = im.size
a = np.asarray(im.filter(ImageFilter.GaussianBlur(1.2))).astype(float)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
water = ((b - r) > 22) & ((b - g) > -12)
m = Image.fromarray((~water).astype(np.uint8) * 255).filter(ImageFilter.MedianFilter(5))
m = m.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
land = np.asarray(m) > 0
# tira a rosa dos ventos e os navios desenhados no mar
yy, xx = np.mgrid[0:H, 0:W]
for cx, cy, rr in [(455, 137, 15), (330, 322, 7), (527, 412, 8)]:
    land[(xx - cx) ** 2 + (yy - cy) ** 2 <= rr * rr] = False
# tira ilhotas de poucos pixels (componentes pequenos)
lab = np.zeros((H, W), np.int32); n = 0; sizes = [0]
for y0 in range(H):
    for x0 in range(W):
        if land[y0, x0] and not lab[y0, x0]:
            n += 1; st = [(y0, x0)]; lab[y0, x0] = n; c = 0
            while st:
                y, x = st.pop(); c += 1
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < H and 0 <= nx < W and land[ny, nx] and not lab[ny, nx]:
                        lab[ny, nx] = n; st.append((ny, nx))
            sizes.append(c)
sizes = np.array(sizes)
land &= sizes[lab] >= 8
# biomas pelas cores
a3 = np.asarray(im.filter(ImageFilter.GaussianBlur(3))).astype(float)
r, g, b = a3[..., 0], a3[..., 1], a3[..., 2]
mx = a3.max(2); mn = a3.min(2); sat = (mx - mn) / (mx + 1); br = a3.mean(2)
cls = np.zeros((H, W), np.uint8)
cls[land] = 1
cls[land & (g > r * 0.98)] = 2
cls[land & (r > g * 1.12) & (g > b * 1.25) & (br > 95)] = 3
cls[land & (r > g * 1.35)] = 4
cls[land & (br < 70)] = 5
cls[land & (br > 150) & (sat < 0.24)] = 6
cls[land & ((xx / 150.0) ** 2 + (yy / 130.0) ** 2 < 1) & (br > 120) & (sat < 0.3)] = 6
# RLE: cada trecho = letra maiúscula da classe (A..G) + comprimento em base 36 (minúsculas)
def b36(n):
    s = ''
    while True:
        s = '0123456789abcdefghijklmnopqrstuvwxyz'[n % 36] + s; n //= 36
        if not n: return s
flat = cls.ravel(); parts = []; i = 0; N = flat.size
while i < N:
    j = i
    while j < N and flat[j] == flat[i]: j += 1
    parts.append('ABCDEFG'[flat[i]] + b36(j - i)); i = j
rle = ''.join(parts)
with open(out, 'w') as f:
    f.write("'use strict';\n// Aurévia: formato e biomas tirados do mapa de referência (tools/novo_mapa_ref.jpg) por tools/extrair_aurevia.py\n")
    f.write("// 0 mar, 1 campos, 2 floresta, 3 deserto, 4 serra rubra, 5 terra negra, 6 neve. RLE: letra maiúscula da classe + comprimento em base 36.\n")
    f.write('const AUREVIA_MAPA = { w: %d, h: %d, rle: "%s" };\n' % (W, H, rle))
pal = np.array([[20, 40, 90], [150, 140, 80], [40, 120, 40], [230, 190, 80], [200, 60, 30], [50, 40, 40], [245, 245, 255]], np.uint8)
Image.fromarray(pal[cls]).save(out.replace('.js', '_previa.png') if len(sys.argv) > 3 else '/dev/null', 'PNG') if len(sys.argv) > 3 else None
print(W, H, len(parts), 'trechos', len(rle), 'bytes')
