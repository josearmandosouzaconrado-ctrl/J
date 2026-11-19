# Monta a prévia dos bichos do oceano (oceanicos_previa.py): 1) em 3D sobre o mar do jogo, com sombra
# e espuma; 2) convertidos em pixel art no tamanho que teriam no jogo, sobre o mesmo mar.
# Uso: python3 folha_oceanicos_previa.py <pasta_renders> <img/oceano.webp> <saida_3d.png> <saida_pixel.png>
import sys, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
R, OCEANO, OUT3, OUTP = sys.argv[1:5]
NS = [('golfinho', 'Golfinho', 30), ('tubarao', 'Tubarão-martelo', 38), ('orca', 'Orca', 56), ('baleia', 'Baleia-jubarte', 120),
      ('tartaruga', 'Tartaruga-marinha', 22), ('manta', 'Arraia-manta', 44), ('kraken', 'Kraken (lenda)', 100), ('aguaviva', 'Água-viva', 20)]
fonte = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 20)
mar = Image.open(OCEANO).convert('RGBA').crop((0, 0, 384, 384))
def mar_de(w, h):
    m = Image.new('RGBA', (w, h))
    for y in range(0, h, 384):
        for x in range(0, w, 384): m.paste(mar, (x, y))
    return m
def no_mar(fundo, bicho, pos):
    """Sombra azul-escura embaixo, um pouco de espuma em volta e o bicho por cima."""
    M = max(8, bicho.width // 12); pad = Image.new('RGBA', (bicho.width + 2 * M, bicho.height + 2 * M)); pad.paste(bicho, (M, M)); bicho = pad; pos = (pos[0] - M, pos[1] - M)   # margem: o desfoque não corta na borda
    a = bicho.getchannel('A')
    sombra = Image.new('RGBA', bicho.size, (6, 22, 48, 0)); sombra.putalpha(a.point(lambda v: int(v * 0.45)).filter(ImageFilter.GaussianBlur(max(2, bicho.width // 60))))
    fundo.alpha_composite(sombra, (pos[0] + bicho.width // 40, pos[1] + bicho.height // 25))
    esp = Image.new('RGBA', bicho.size, (235, 245, 255, 0)); esp.putalpha(a.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(3)).point(lambda v: int(v * 0.35)))
    fundo.alpha_composite(esp, pos); fundo.alpha_composite(bicho, pos)
def pixel(f, comp):
    im = Image.open(f).convert('RGBA'); bb = im.getchannel('A').point(lambda a: 255 if a > 40 else 0).getbbox(); im = im.crop(bb)
    k = comp / max(im.width, im.height); w, h = max(2, round(im.width * k)), max(2, round(im.height * k))
    fl = np.asarray(im, dtype=np.float32); al = fl[..., 3:4] / 255
    pm = Image.fromarray(np.clip(fl[..., :3] * al, 0, 255).astype(np.uint8)).resize((w, h), Image.BOX)
    am = im.getchannel('A').resize((w, h), Image.BOX)
    rgb = np.asarray(pm, dtype=np.float32); aa = np.asarray(am, dtype=np.float32)[..., None] / 255
    rgb = np.clip(rgb / np.maximum(aa, 1e-3), 0, 255)
    a = np.zeros((h, w, 4), np.uint8); a[..., :3] = rgb.astype(np.uint8); a[..., 3] = np.where(aa[..., 0] > 0.35, 255, 0)
    q = Image.fromarray(a[..., :3]).quantize(colors=12, method=Image.MEDIANCUT).convert('RGB'); a[..., :3] = np.asarray(q)
    m = a[..., 3] > 0; out = np.zeros((h + 2, w + 2, 4), np.uint8); out[1:-1, 1:-1] = a
    m2 = np.zeros((h + 2, w + 2), bool); m2[1:-1, 1:-1] = m
    b = np.zeros_like(m2); b[1:] |= m2[:-1]; b[:-1] |= m2[1:]; b[:, 1:] |= m2[:, :-1]; b[:, :-1] |= m2[:, 1:]; b &= ~m2
    out[b] = (14, 22, 34, 255)
    return Image.fromarray(out, 'RGBA')
def rotulo(d, xy, t): d.text(xy, t, fill=(255, 244, 200), font=fonte, stroke_width=3, stroke_fill=(0, 0, 0))
# 1) em 3D
C = 400; f3 = mar_de(4 * C, 2 * C); d = ImageDraw.Draw(f3)
for i, (n, nome, _) in enumerate(NS):
    b = Image.open(f'{R}/{n}.png').convert('RGBA').resize((C - 20, C - 20), Image.LANCZOS)
    no_mar(f3, b, ((i % 4) * C + 10, (i // 4) * C + 10)); rotulo(d, ((i % 4) * C + 12, (i // 4) * C + C - 34), nome)
f3.convert('RGB').save(OUT3)
# 2) em pixel art, no tamanho do jogo (ampliado 3x para ver), com um barco de 6 m como escala
E = 3; W0, H0 = 500, 215; fp = mar_de(W0, H0)
pos = {'baleia': (8, 40), 'kraken': (150, 22), 'orca': (265, 30), 'manta': (345, 30), 'tubarao': (420, 40), 'golfinho': (265, 120), 'tartaruga': (340, 125), 'aguaviva': (440, 122)}
etiquetas = []
for n, nome, comp in NS:
    b = pixel(f'{R}/{n}.png', comp); x, y = pos[n]; no_mar(fp, b, (x, y)); etiquetas.append((nome, x, y + b.height + 2))
# o barquinho do jogador para comparar (um bote de 2 tiles)
bote = Image.new('RGBA', (34, 12)); db = ImageDraw.Draw(bote); db.polygon([(0, 4), (30, 4), (34, 6), (30, 10), (4, 10)], fill=(110, 70, 36, 255), outline=(30, 18, 10, 255)); db.line([(6, 6), (28, 6)], fill=(150, 100, 56, 255))
fp.alpha_composite(bote, (190, 170))
big = fp.resize((W0 * E, H0 * E), Image.NEAREST); d = ImageDraw.Draw(big)
for nome, x, y in etiquetas: rotulo(d, (x * E, min(y * E, H0 * E - 26)), nome)
rotulo(d, (190 * E, 184 * E), 'bote (escala)')
big.convert('RGB').save(OUTP)
print(OUT3, OUTP)
