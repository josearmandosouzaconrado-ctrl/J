# Monta img/montanha.png com o que montanhas.py renderizou:
#  linhas 0-47: paredões (rocha, pico nevado, cânion), 384x16 cada, emendáveis na horizontal
#  linha 48+: 12 pedras (pedra, rochedo, gelo, arenito x 3 variações), células de 32x28
# Uso: python3 folha_montanhas.py <pasta>
import sys, numpy as np
from PIL import Image
D = sys.argv[1]
folha = Image.new('RGBA', (384, 48 + 28), (0, 0, 0, 0))
for i, n in enumerate(['rocha', 'piconeve', 'canion']):
    im = Image.open(f'{D}/parede_{n}.png').convert('RGB').resize((384, 16), Image.LANCZOS)
    a = np.asarray(im, dtype=np.float32); T = a.shape[1]
    b = np.roll(a, T // 2, 1); t = np.arange(T) / (T - 1); w = np.clip(np.minimum(t, 1 - t) / 0.2, 0, 1); w = (w * w * (3 - 2 * w))[None, :, None]
    f = a * w + b * (1 - w)
    # escurece um pouco embaixo (a base do penhasco fica na sombra) e clareia a borda de cima
    g = np.linspace(1.12, 0.78, 16)[:, None, None]; f = f * g
    folha.paste(Image.fromarray(np.clip(f, 0, 255).astype(np.uint8)), (0, i * 16))
LARG = {'pedra': 17, 'rochedo': 21, 'gelo': 21, 'arenito': 21}
k = 0
for n in ['pedra', 'rochedo', 'gelo', 'arenito']:
    for v in range(3):
        im = Image.open(f'{D}/{n}_{v}.png').convert('RGBA'); im = im.crop(im.getchannel('A').point(lambda a: 255 if a > 20 else 0).getbbox())
        w = LARG[n]; h = max(1, round(im.height * w / im.width)); im = im.resize((w, h), Image.LANCZOS)
        if n in ('pedra', 'rochedo'):   # um pouco mais claras (no chão de grama ou neve sumiam de tão escuras)
            a = np.asarray(im, dtype=np.float32); a[..., :3] = np.clip(a[..., :3] * 1.22 + 8, 0, 255); im = Image.fromarray(a.astype(np.uint8), 'RGBA')
        cx, cy = 48 + 0, 0
        folha.paste(im, ((k % 12) * 32 + (32 - w) // 2, 48 + (28 - h)), im); k += 1
folha.save('img/montanha.png', optimize=True)
print('img/montanha.png', folha.size)
