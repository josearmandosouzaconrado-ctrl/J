# Converte os detalhes renderizados (detalhes.py) em pixel art no estilo do jogo:
# recorta, reduz para poucos pixels (cada detalhe cabe em meio quadradinho ou um pouco mais),
# deixa a borda dura (sem meio-transparente), limita as cores e monta img/detalhes.png
# (células de 16x16, uma linha por tipo).
# Uso: python3 folha_detalhes.py <pasta>
import sys, glob, os
import numpy as np
from PIL import Image
D = sys.argv[1]
TAM = {'tufo': 10, 'tufo_seco': 10, 'flores': 11, 'pedrinhas': 9, 'folhas_caidas': 11, 'cogumelo': 8, 'junco': 9, 'graveto': 10, 'neve': 10}
TIPOS = list(TAM)
BRILHO = {'tufo': 1.9, 'tufo_seco': 1.6, 'junco': 1.9, 'graveto': 1.2, 'flores': 1.15}
folha = Image.new('RGBA', (16 * 4, 16 * len(TIPOS)), (0, 0, 0, 0))
for j, t in enumerate(TIPOS):
    for v in range(4):
        f = f'{D}/{t}_{v}.png'
        if not os.path.exists(f): continue
        im = Image.open(f).convert('RGBA'); bb = im.getchannel('A').point(lambda a: 255 if a > 30 else 0).getbbox(); im = im.crop(bb)
        w = TAM[t]; h = max(2, round(im.height * w / im.width))
        if h > 15: w = max(2, round(w * 15 / h)); h = 15
        im = im.resize((w, h), Image.BOX)
        a = np.asarray(im).copy()
        k = BRILHO.get(t, 1.0); a[..., :3] = np.clip(a[..., :3].astype(np.float32) * k + (6 if k > 1 else 0), 0, 255).astype(np.uint8)
        a[..., 3] = np.where(a[..., 3] > 110, 255, 0)
        # poucas cores, como o pixel art do jogo
        rgb = Image.fromarray(a[..., :3]).quantize(colors=5, method=Image.MEDIANCUT).convert('RGB')
        a[..., :3] = np.asarray(rgb)
        px = Image.fromarray(a, 'RGBA')
        folha.paste(px, (v * 16 + (16 - w) // 2, j * 16 + (16 - h)), px)
folha.save('img/detalhes.png')
print('img/detalhes.png', folha.size, TIPOS)
