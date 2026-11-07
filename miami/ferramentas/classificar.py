"""Classifica o mapa topográfico (Esri World_Topo_Map z17) em classes de terreno.
Gera classes.png (debug) e classes.npy (uint8) na pasta de trabalho.
Classes: 0 água, 1 chão, 2 rua, 3 parque, 4 areia, 5 prédio, 6 prédio destaque
"""
import sys, numpy as np, cv2
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
src, out = sys.argv[1], sys.argv[2]
a = np.asarray(Image.open(src).convert('RGB')).astype(np.int16)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
H, W = r.shape
cls = np.ones((H, W), np.uint8)
water = (abs(r - 204) <= 10) & (abs(g - 237) <= 8) & (abs(b - 255) <= 6)
park = (g > r + 8) & (g > b + 15)
sand = (r >= 238) & (g >= 232) & (b < g - 8) & (r - b > 10) & ~park
gray = (abs(r - g) <= 1)
bld = gray & ((r - b) >= 1) & ((r - b) <= 3) & (r >= 185) & (r <= 228)
pink = (r - g >= 15) & (r - g <= 26) & (g - b >= 2) & (g - b <= 9) & (r >= 220) & (r <= 245)
purpleb = (b >= r + 5) & (b >= g + 16) & (r < 236) & ~water
road = gray & (abs(r - b) <= 1) & (r >= 140)  # ruas brancas, contornos e vias expressas cinza
cls[road] = 2
cls[park] = 3
cls[sand] = 4
cls[bld] = 5
cls[pink | purpleb] = 6
cls[water] = 0
# limpeza: rótulos de texto na água / ruído -> filtro de maioria 5x5 para a água
wm = (cls == 0).astype(np.uint8)
wm = cv2.morphologyEx(wm, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
wm = cv2.morphologyEx(wm, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
# pontes: linhas claras finas sobre a água não podem sumir no fechamento
ponte = (gray & (r >= 232)) | (cls == 2)
cls[(wm == 1) & (cls != 5) & (cls != 6) & ~ponte] = 0
cls[(wm == 0) & (cls == 0)] = 1
np.save(out + '.npy', cls)
pal = np.array([[40, 110, 170], [235, 232, 220], [120, 120, 125], [110, 170, 90], [235, 215, 160], [200, 80, 60], [220, 40, 160]], np.uint8)
Image.fromarray(pal[cls]).save(out + '.png')
print('ok', W, H, np.bincount(cls.ravel(), minlength=7))
