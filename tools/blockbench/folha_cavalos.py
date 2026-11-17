#!/usr/bin/env python3
"""Junta os quadros renderizados em img/cavalos.png, com o contorno escuro de 1 px dos sprites do jogo.
Folha: uma faixa por montaria; em cada faixa 12 quadros: lado 0-2 | frente 0-2 | cabeça 0-2 | costas 0-2.
Cada quadro fica numa célula do mesmo tamanho, com os cascos na mesma altura e o centro no meio da célula.
Uso: python3 folha_cavalos.py <pasta dos quadros> <saída.png>
"""
import sys, json
from PIL import Image, ImageFilter
src, out = sys.argv[1], sys.argv[2]
VARS = ['cavalo', 'burro', 'cavalo_guerra', 'corcel', 'alce', 'camelo']
VISTAS = ['lado', 'frente', 'cabeca', 'costas']
def contorno(im, cor=(18, 12, 12, 255)):
    a = im.getchannel('A').point(lambda v: 255 if v > 100 else 0)
    im = im.copy(); im.putalpha(a)
    g = a.filter(ImageFilter.MaxFilter(3)); base = Image.new('RGBA', im.size, cor); base.putalpha(g); base.alpha_composite(im); return base
CW, CH = 46, 50
folha = Image.new('RGBA', (CW * 12, CH * len(VARS)), (0, 0, 0, 0))
for r, v in enumerate(VARS):
    for i, (w, q) in enumerate((w, q) for w in VISTAS for q in range(3)):
        im = Image.open(f'{src}/{v}_{"frente" if w == "cabeca" else w}_{q}.png' if False else f'{src}/{v}_{w}_{q}.png').convert('RGBA')
        c = Image.new('RGBA', (im.width + 2, im.height + 2), (0, 0, 0, 0)); c.alpha_composite(im, (1, 1)); c = contorno(c)
        folha.alpha_composite(c, (i * CW + (CW - c.width) // 2, r * CH + CH - c.height))
folha.save(out, optimize=True)
print('folha', folha.size)
