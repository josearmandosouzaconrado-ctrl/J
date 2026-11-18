# Junta as texturas de terreno (terrenos.py) numa folha: cada uma vira emendável (mistura com ela
# mesma deslocada meia volta, só perto das bordas), a cor média é puxada para a cor do terreno no
# jogo (combina com as bordas e o mapa) e tudo vai para img/terreno.webp (4 colunas).
# Uso: python3 folha_terrenos.py <pasta>
import sys, numpy as np
from PIL import Image
D = sys.argv[1]
ORDEM = [('grama', '#3e9226'), ('bosque', '#3c8a2c'), ('areia', '#dcc98a'), ('terra', '#8a6a43'), ('neve', '#eef3fa'), ('deserto', '#e6b765'), ('rocha', '#77706a'),
         ('piconeve', '#c9d2dc'), ('tundra', '#8a9a6e'), ('lama', '#5e4b35'), ('pantano', '#4d5a2e'), ('terramorta', '#6b6040'), ('terraverm', '#9c4a2c'), ('cinzas', '#4a4246')]
C = 4; T = None; imgs = []
for nome, cor in ORDEM:
    im = Image.open(f'{D}/{nome}.png').convert('RGB'); T = im.size[0]
    # tira 4 px da borda do render (a beira da malha sai com sombra errada)
    a = np.asarray(im.crop((4, 4, T - 4, T - 4)).resize((T, T), Image.LANCZOS), dtype=np.float32)
    b = np.roll(np.roll(a, T // 2, 0), T // 2, 1)
    t = np.arange(T) / (T - 1); w = np.clip(np.minimum(t, 1 - t) / 0.22, 0, 1); w = w * w * (3 - 2 * w)
    m = (w[:, None] * w[None, :])[..., None]
    f = a * m + b * (1 - m)
    alvo = np.array([int(cor[i:i + 2], 16) for i in (1, 3, 5)], dtype=np.float32)
    f += (alvo - f.reshape(-1, 3).mean(0)) * 0.85
    cz = f.mean(axis=2, keepdims=True); f = cz + (f - cz) * 1.12          # um pouco mais de cor
    imgs.append(np.clip(f + 0.5, 0, 255).astype(np.uint8))
L = (len(imgs) + C - 1) // C
folha = Image.new('RGB', (C * T, L * T))
for i, im in enumerate(imgs): folha.paste(Image.fromarray(im), ((i % C) * T, (i // C) * T))
folha.save('img/terreno.webp', 'WEBP', quality=82, method=6)
print('img/terreno.webp', folha.size, [n for n, _ in ORDEM])
