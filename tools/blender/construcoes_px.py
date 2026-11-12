# Reduz as construções renderizadas no Blender a pixel art (largura final em px de jogo).
# Uso: python construcoes_px.py <pasta> <pasta de saída> nome:largura ...
import sys
from PIL import Image, ImageFilter, ImageEnhance
src, dst = sys.argv[1], sys.argv[2]
for arg in sys.argv[3:]:
    nome, larg = arg.split(':'); larg = int(larg)
    im = Image.open(f'{src}/{nome}.png').convert('RGBA'); im = im.crop(im.getbbox())
    k = larg / im.width; w, h = larg, max(1, round(im.height * k))
    a = im.getchannel('A').resize((w, h), Image.BOX).point(lambda v: 255 if v > 110 else 0)
    rgb = ImageEnhance.Color(ImageEnhance.Contrast(im.convert('RGB').resize((w, h), Image.LANCZOS)).enhance(1.2)).enhance(1.15)
    q = rgb.quantize(colors=40, method=Image.Quantize.MEDIANCUT, kmeans=2).convert('RGBA'); q.putalpha(a)
    c = Image.new('RGBA', (w + 2, h + 2), (0, 0, 0, 0)); c.alpha_composite(q, (1, 1))
    g = c.getchannel('A').filter(ImageFilter.MaxFilter(3)); base = Image.new('RGBA', c.size, (20, 14, 12, 255)); base.putalpha(g); base.alpha_composite(c)
    base.save(f'{dst}/vk_{nome}.png', optimize=True); print(nome, base.size)
