#!/usr/bin/env python3
"""Reduz os quadros renderizados do modelo do Blockbench (render.js) a pixel art e grava um .js para o jogo.

Cada vista é recortada pela mesma caixa em todos os quadros (as patas ficam sempre na última linha e a
cabeça da vista de frente encaixa certinho no corpo), reduzida, com paleta única e contorno escuro como
o das outras montarias. Saída no formato do js/bestas_px.js: paleta + índices em base64 (0 = vazio).
Uso: python3 montaria_px.py <pasta dos quadros> <saída .js> <NOME_DA_CONST> <px por unidade>
"""
import base64, json, sys
from PIL import Image, ImageFilter, ImageEnhance

src, dst, const, k = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4])
RENDER_PX = 8   # pixels por unidade em render.js
CONTORNO = (18, 12, 12)
VISTAS = {'lado': ['lado_%d'], 'frente': ['frente_corpo_%d', 'frente_cabeca_%d'], 'costas': ['costas_%d']}

def reduz(im, caixa, w, h):
    im = im.crop(caixa)
    a = im.getchannel('A').resize((w, h), Image.BOX).point(lambda v: 255 if v > 100 else 0)
    rgb = ImageEnhance.Contrast(im.convert('RGB').resize((w, h), Image.LANCZOS)).enhance(1.12)
    # detalhes escuros pequenos (olhos, nariz) somem na média: onde eles cobrem boa parte do pixel, ficam
    escuro = Image.eval(im.convert('L'), lambda v: 255 if v < 17 else 0)
    escuro.paste(0, mask=Image.eval(im.getchannel('A'), lambda v: 255 - v))
    escuro = escuro.resize((w, h), Image.BOX).point(lambda v: 255 if v > 70 else 0)
    rgb.paste((24, 14, 10), mask=escuro)
    out = rgb.convert('RGBA'); out.putalpha(a); return out

SELAS = json.load(open(f'{src}/selas.json'))   # onde fica a sela em cada vista (render.js)
quadros = {}   # nome -> imagem reduzida (antes da paleta)
for vista, camadas in VISTAS.items():
    ims = {c % f: Image.open(f'{src}/{c % f}.png').convert('RGBA') for c in camadas for f in range(3)}
    caixas = [im.getbbox() for im in ims.values()]
    caixa = (min(b[0] for b in caixas), min(b[1] for b in caixas), max(b[2] for b in caixas), max(b[3] for b in caixas))
    # o jogo desenha o cavaleiro no meio do quadro: a caixa fica simétrica em volta da sela
    sx = SELAS[vista][0]; meia = max(sx - caixa[0], caixa[2] - sx)
    caixa = (round(sx - meia), caixa[1], round(sx + meia), caixa[3])
    w = max(1, round((caixa[2] - caixa[0]) * k / RENDER_PX)); h = max(1, round((caixa[3] - caixa[1]) * k / RENDER_PX))
    for n, im in ims.items(): quadros[n] = reduz(im, caixa, w, h)

# paleta única para todos os quadros
nomes = list(quadros)
folha = Image.new('RGB', (sum(q.width for q in quadros.values()), max(q.height for q in quadros.values())))
x = 0
for n in nomes:
    q = quadros[n]; folha.paste(q.convert('RGB'), (x, 0), q.getchannel('A')); x += q.width
pal_img = folha.quantize(colors=44, method=Image.Quantize.MEDIANCUT, kmeans=3)
pal = pal_img.getpalette()[:44 * 3]
cores = [tuple(pal[i:i + 3]) for i in range(0, len(pal), 3)] + [CONTORNO]
iC = len(cores) - 1

def indices(q):
    w, h = q.size
    ix = q.convert('RGB').quantize(palette=pal_img, dither=Image.Dither.NONE).load()
    A = q.getchannel('A').load()
    W, H = w + 2, h + 2
    grade = [[-1] * W for _ in range(H)]
    for y in range(h):
        for xx in range(w):
            if A[xx, y]: grade[y + 1][xx + 1] = ix[xx, y]
    # contorno: vizinhos (4 direções) vazios de um pixel cheio viram a cor escura
    out = [row[:] for row in grade]
    for y in range(H):
        for xx in range(W):
            if grade[y][xx] < 0 and any(0 <= y + dy < H and 0 <= xx + dx < W and grade[y + dy][xx + dx] >= 0 for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                out[y][xx] = iC
    return W, H, out

dados = {}
for vista, camadas in VISTAS.items():
    for c in camadas:
        fr = []
        for f in range(3):
            W, H, g = indices(quadros[c % f])
            fr.append(base64.b64encode(bytes(v + 1 for row in g for v in row)).decode())
        dados[c.replace('_%d', '')] = {'w': W, 'h': H, 'f': fr}
saida = {'pal': ['#%02x%02x%02x' % c for c in cores], **dados}
with open(dst, 'w') as f:
    f.write("'use strict';\n// gerado por tools/blockbench/montaria_px.py a partir do modelo do Blockbench (tools/blockbench/urso_guerra.bbmodel)\n")
    f.write('const %s = %s;\n' % (const, json.dumps(saida, separators=(',', ':'))))
for n, d in dados.items(): print(n, d['w'], 'x', d['h'])
