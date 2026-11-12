# reduz as camadas renderizadas para pixel art (600x240) com paleta limitada
import sys
from PIL import Image
D = sys.argv[1]; W, H = 600, 240
f = Image.open(f'{D}/fundo.png').convert('RGB').resize((W, H), Image.BOX)
f.quantize(colors=128, method=Image.Quantize.MEDIANCUT, kmeans=3, dither=Image.Dither.NONE).save(f'{D}/px_fundo.png', optimize=True)
fr = Image.open(f'{D}/frente.png').convert('RGBA').resize((W, H), Image.LANCZOS)
a = fr.getchannel('A').point(lambda v: 255 if v > 120 else 0)
rgb = fr.convert('RGB').quantize(colors=40, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert('RGBA'); rgb.putalpha(a)
rgb.save(f'{D}/px_frente.png', optimize=True)
c = Image.open(f'{D}/px_fundo.png').convert('RGBA'); c.alpha_composite(Image.open(f'{D}/px_frente.png').convert('RGBA'))
c.resize((W * 2, H * 2), Image.NEAREST).save(f'{D}/chk.png')
