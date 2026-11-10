"""Desenha o ícone do app (skyline de Miami ao pôr do sol, helicóptero e símbolo de risco biológico)."""
import math, sys
from PIL import Image, ImageDraw

def icone(N):
    S = 4 * N
    im = Image.new('RGB', (S, S))
    d = ImageDraw.Draw(im)
    for y in range(S):
        t = y / S
        c = (int(40 + 200 * t), int(20 + 60 * t), int(70 + 20 * (1 - t)))
        d.line([(0, y), (S, y)], fill=c)
    # sol
    d.ellipse([S * 0.3, S * 0.38, S * 0.7, S * 0.78], fill=(255, 150, 60))
    # prédios
    import random
    random.seed(3)
    x = 0
    while x < S:
        w = random.randint(S // 14, S // 7)
        h = random.randint(S // 6, S // 2)
        d.rectangle([x, S * 0.78 - h, x + w, S * 0.8], fill=(18, 14, 34))
        for wy in range(int(S * 0.78 - h + S * 0.03), int(S * 0.78), S // 28):
            for wx in range(x + S // 60, x + w - S // 60, S // 30):
                if random.random() < 0.35: d.rectangle([wx, wy, wx + S // 90, wy + S // 90], fill=(255, 210, 120))
        x += w + random.randint(0, S // 40)
    # água
    d.rectangle([0, S * 0.8, S, S], fill=(20, 60, 90))
    for i in range(6):
        y = S * (0.83 + i * 0.03)
        d.line([(S * 0.1 + i * 13, y), (S * 0.9 - i * 9, y)], fill=(255, 140, 80), width=S // 120)
    # helicóptero (silhueta)
    hx, hy = S * 0.66, S * 0.2
    d.ellipse([hx - S * 0.09, hy - S * 0.04, hx + S * 0.07, hy + S * 0.04], fill=(10, 10, 16))
    d.rectangle([hx - S * 0.22, hy - S * 0.012, hx - S * 0.06, hy + S * 0.008], fill=(10, 10, 16))
    d.line([(hx - S * 0.2, hy - S * 0.07), (hx + S * 0.18, hy - S * 0.07)], fill=(10, 10, 16), width=S // 70)
    d.line([(hx, hy - S * 0.07), (hx, hy - S * 0.03)], fill=(10, 10, 16), width=S // 70)
    # risco biológico
    cx, cy, R = S * 0.27, S * 0.3, S * 0.17
    vermelho = (230, 30, 50)
    for k in range(3):
        a = math.radians(90 + k * 120)
        ox, oy = cx + math.cos(a) * R * 0.48, cy - math.sin(a) * R * 0.48
        d.ellipse([ox - R * 0.52, oy - R * 0.52, ox + R * 0.52, oy + R * 0.52], fill=vermelho)
        ox2, oy2 = cx + math.cos(a) * R * 0.66, cy - math.sin(a) * R * 0.66
        d.ellipse([ox2 - R * 0.36, oy2 - R * 0.36, ox2 + R * 0.36, oy2 + R * 0.36], fill=(0, 0, 0, 0) if False else im.getpixel((int(ox2), int(oy2 - R * 0.6))))
    d.ellipse([cx - R * 0.2, cy - R * 0.2, cx + R * 0.2, cy + R * 0.2], fill=vermelho)
    d.ellipse([cx - R * 0.1, cy - R * 0.1, cx + R * 0.1, cy + R * 0.1], fill=(40, 20, 50))
    d.ellipse([cx - R * 0.62, cy - R * 0.62, cx + R * 0.62, cy + R * 0.62], outline=vermelho, width=int(R * 0.1))
    # cantos arredondados
    m = Image.new('L', (S, S), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, S - 1, S - 1], radius=S // 5, fill=255)
    out = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    out.paste(im, (0, 0), m)
    return out.resize((N, N), Image.LANCZOS)

base = sys.argv[1]
icone(192).save(base + '/icone-192.png', optimize=True)
icone(512).save(base + '/icone-512.png', optimize=True)
print('ok')
