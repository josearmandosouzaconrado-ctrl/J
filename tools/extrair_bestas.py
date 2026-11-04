#!/usr/bin/env python3
"""Recorta os dragões e as montarias de tools/bestas_ref.jpg e gera js/bestas_px.js.

A imagem de referência é pixel art ampliada (~5x) sobre fundo verde. Cada sprite é reduzido
para a escala do jogo (bloco de 5x5 -> 1 pixel, cor mediana), o verde vira transparente e as
cores de cada grupo são reduzidas a uma paleta. No jogo (js/bestas.js) os pixels viram canvas.
"""
import base64, json, os
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
im = np.array(Image.open(os.path.join(ROOT, 'tools', 'bestas_ref.jpg')).convert('RGB')).astype(int)
r, g, b = im[..., 0], im[..., 1], im[..., 2]
fundo = (g > r + 35) & (g > b + 45) & (g > 110)
SC = 5.0

def faixas(v, minimo, folga):
    out, s, ult = [], None, None
    for i, x in enumerate(v):
        if x:
            if s is None: s = i
            ult = i
        elif s is not None and i - ult > folga:
            if ult - s >= minimo: out.append((s, ult + 1))
            s = None
    if s is not None and ult - s >= minimo: out.append((s, ult + 1))
    return out

def recorta(y0, y1, x0, x1):
    y0 -= 2; x0 -= 2; y1 += 2; x1 += 2
    H, W = int(round((y1 - y0) / SC)), int(round((x1 - x0) / SC))
    out = np.zeros((H, W, 4), dtype=np.uint8)
    for j in range(H):
        for i in range(W):
            ya, yb, xa, xb = int(y0 + j * SC), int(y0 + (j + 1) * SC), int(x0 + i * SC), int(x0 + (i + 1) * SC)
            m = fundo[ya:yb, xa:xb].reshape(-1)
            if m.mean() > 0.5: continue
            out[j, i, :3] = np.median(im[ya:yb, xa:xb].reshape(-1, 3)[~m], axis=0); out[j, i, 3] = 255
    # tira pixels soltos
    a = out[..., 3] > 0
    for j in range(H):
        for i in range(W):
            if a[j, i] and sum(a[jj, ii] for jj, ii in ((j-1, i), (j+1, i), (j, i-1), (j, i+1)) if 0 <= jj < H and 0 <= ii < W) == 0: out[j, i, 3] = 0
    return out

linhas = faixas((~fundo).sum(1) > 3, 30, 4)
sprites = []
for (y0, y1) in linhas:
    cols = faixas((~fundo)[y0:y1].sum(0) > 1, 30, 6)
    sprites.append([recorta(y0, y1, c0, c1) for c0, c1 in cols])
# ordem da imagem: dragão vermelho, dragão azul, montarias na ordem de MOUNTS
grupos = {'dragao_vermelho': sprites[0], 'dragao_azul': sprites[1]}
nomes = ['burro', 'cavalo', 'cavalo_guerra', 'corcel', 'alce', 'camelo', 'lobo_gigante']
mont = sprites[2] + sprites[3] + sprites[4]
for k, n in enumerate(nomes): grupos[n] = mont[k * 3:k * 3 + 3]

def junta(frames):
    # todos os quadros do mesmo tamanho, alinhados embaixo e pela direita (a cabeça fica parada)
    H = max(f.shape[0] for f in frames); W = max(f.shape[1] for f in frames)
    out = []
    for f in frames:
        c = np.zeros((H, W, 4), dtype=np.uint8); c[H - f.shape[0]:, W - f.shape[1]:] = f; out.append(c)
    return out

dados = {}
for nome, frames in grupos.items():
    frames = junta(frames)
    H, W = frames[0].shape[:2]
    tira = np.concatenate(frames, axis=1)
    alfa = tira[..., 3] > 0
    rgb = Image.fromarray(np.where(alfa[..., None], tira[..., :3], 0).astype(np.uint8), 'RGB')
    q = rgb.quantize(colors=40 if nome.startswith('dragao') else 24, method=Image.Quantize.MEDIANCUT)
    pal = q.getpalette()[:3 * 256]; idx = np.array(q)
    usados = sorted(set(idx[alfa].tolist()))
    mapa = {u: k + 1 for k, u in enumerate(usados)}
    cores = ['#%02x%02x%02x' % tuple(pal[3 * u:3 * u + 3]) for u in usados]
    quadros = []
    for f in range(3):
        sub = idx[:, f * W:(f + 1) * W]; sa = alfa[:, f * W:(f + 1) * W]
        bts = bytes((mapa[int(sub[j, i])] if sa[j, i] else 0) for j in range(H) for i in range(W))
        quadros.append(base64.b64encode(bts).decode())
    dados[nome] = {'w': W, 'h': H, 'pal': cores, 'f': quadros}
    pass
js = ["'use strict';", '// gerado por tools/extrair_bestas.py a partir de tools/bestas_ref.jpg: dragões e montarias (quadros de perfil, virados à direita)', 'const BESTAS_PX = ' + json.dumps(dados, separators=(',', ':')) + ';']
open(os.path.join(ROOT, 'js', 'bestas_px.js'), 'w').write('\n'.join(js) + '\n')
print({k: (v['w'], v['h'], len(v['pal'])) for k, v in dados.items()}, os.path.getsize(os.path.join(ROOT, 'js', 'bestas_px.js')))
