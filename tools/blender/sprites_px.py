# Reduz os quadros renderizados no Blender para pixel art e monta a folha de sprites.
# Uso: python tools/blender/sprites_px.py <pasta dos quadros> <saída.png> <altura padrão> <variante[:altura]...>
# Folha: uma faixa por variante; em cada faixa, 3 direções (down, up, right) x 4 quadros, lado a lado.
import sys
from PIL import Image, ImageFilter, ImageEnhance
src, out, alt0 = sys.argv[1], sys.argv[2], int(sys.argv[3]); VARS = sys.argv[4:]
DIRS = ['down', 'up', 'right']
def reduz(im, k):
    w, h = round(im.width * k), round(im.height * k)
    a = im.getchannel('A').resize((w, h), Image.BOX).point(lambda v: 255 if v > 100 else 0)
    rgb = im.convert('RGB').resize((w, h), Image.LANCZOS)
    rgb = ImageEnhance.Color(ImageEnhance.Contrast(rgb).enhance(1.3)).enhance(1.25)
    o = rgb.convert('RGBA'); o.putalpha(a); return o
def contorno(im, cor=(18, 14, 20, 255)):
    # contorno escuro de 1 pixel, como os outros sprites do jogo
    a = im.getchannel('A'); g = a.filter(ImageFilter.MaxFilter(3))
    base = Image.new('RGBA', im.size, cor); base.putalpha(g)
    base.alpha_composite(im); return base
faixas = []
for v in VARS:
    v, alt = (v.split(':')[0], int(v.split(':')[1])) if ':' in v else (v, alt0)
    fr = {(d, q): Image.open(f'{src}/{v}_{d}_{q}.png').convert('RGBA') for d in DIRS for q in range(4)}
    # caixa comum a todos os quadros (pés sempre no mesmo lugar) e simétrica no centro
    x0 = min(im.getbbox()[0] for im in fr.values()); x1 = max(im.getbbox()[2] for im in fr.values())
    y0 = min(im.getbbox()[1] for im in fr.values()); y1 = max(im.getbbox()[3] for im in fr.values())
    cx = fr[('down', 0)].width / 2; meia = max(cx - x0, x1 - cx)
    caixa = (int(cx - meia), y0, int(cx + meia + 0.999), y1)
    pes = max(fr[('down', 0)].getbbox()[3], fr[('down', 1)].getbbox()[3])
    k = alt / (pes - y0)
    q = []
    for d in DIRS:
        for i in range(4):
            im = reduz(fr[(d, i)].crop(caixa), k)
            pal = im.convert('RGB').quantize(colors=20, method=Image.Quantize.MEDIANCUT, kmeans=2).convert('RGBA'); pal.putalpha(im.getchannel('A'))
            c = Image.new('RGBA', (pal.width + 2, pal.height + 2), (0, 0, 0, 0)); c.alpha_composite(pal, (1, 1))
            q.append(contorno(c))
    faixas.append(q)
fw = max(im.width for f in faixas for im in f); fh = max(im.height for f in faixas for im in f)
folha = Image.new('RGBA', (fw * 12, fh * len(faixas)), (0, 0, 0, 0))
for j, f in enumerate(faixas):
    for i, im in enumerate(f): folha.alpha_composite(im, (i * fw + (fw - im.width) // 2, j * fh + (fh - im.height)))
folha.save(out, optimize=True)
print('folha', folha.size, 'quadro', fw, fh)
