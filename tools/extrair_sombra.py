#!/usr/bin/env python3
"""Extrai os sprites da Criatura das Sombras da folha de arte (tools/criatura_sombras_ref.png).

Recorta cada pose, remove o fundo escuro, reduz para a escala do jogo
(a criatura tem ~3,5 blocos de altura) preservando os olhos e as veias
vermelhas e grava img/criatura_sombras.png + js/sombra_frames.js.
"""
import json, os
from PIL import Image, ImageFilter
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'tools', 'criatura_sombras_ref.png')

# caixas (x0, y0, x1, y1) de cada pose na folha
BOXES = {
    'frente': (648, 66, 776, 260), 'lado': (800, 72, 1056, 260), 'costas': (1064, 66, 1196, 260),
    'idle': (646, 352, 796, 470), 'andar': (816, 348, 1002, 470), 'correr': (1020, 348, 1212, 472),
    'ataque': (646, 510, 932, 624), 'morte': (970, 530, 1222, 624),
}
TARGET_H = 58          # altura em pixels do jogo da pose de lado (≈ 3,5 blocos de 16 px)

def mask_of(a):
    r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    mx = np.maximum(np.maximum(r, g), b)
    gray = (np.minimum(g, b) >= 24) & (mx >= 30)          # corpo cinza-escuro
    red = (r >= 105) & (r > g * 1.6)                       # veias, olhos, pelos vermelhos
    bone = (mx >= 70)                                      # ossos claros
    base = gray | red | bone
    near = np.array(Image.fromarray((base * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7))) > 127
    black = (mx <= 8) & near                               # contorno/sombras do corpo, só junto do corpo
    m = base | black
    # fecha frestas, remove pontinhos soltos (brilho do fundo) e preenche buracos internos
    img = Image.fromarray((m * 255).astype(np.uint8))
    img = img.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
    m = keep_big(np.array(img) > 127, red)
    return fill_holes(m)

def fill_holes(m):
    h, w = m.shape; seen = np.zeros_like(m); st = [(y, x) for y in range(h) for x in (0, w - 1)] + [(y, x) for x in range(w) for y in (0, h - 1)]
    st = [(y, x) for y, x in st if not m[y, x]]
    for y, x in st: seen[y, x] = True
    while st:
        cy, cx = st.pop()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not m[ny, nx] and not seen[ny, nx]: seen[ny, nx] = True; st.append((ny, nx))
    holes = ~m & ~seen
    # só tapa buracos pequenos (textura escura); vãos grandes, como entre as pernas, continuam vazados
    lab_small = np.zeros_like(m); hh, ww = m.shape; done = np.zeros_like(m)
    for y in range(hh):
        for x in range(ww):
            if holes[y, x] and not done[y, x]:
                comp = []; st = [(y, x)]; done[y, x] = True
                while st:
                    cy, cx = st.pop(); comp.append((cy, cx))
                    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < hh and 0 <= nx < ww and holes[ny, nx] and not done[ny, nx]: done[ny, nx] = True; st.append((ny, nx))
                if len(comp) <= 120:
                    for cy, cx in comp: lab_small[cy, cx] = True
    return m | lab_small

def keep_big(m, red):
    h, w = m.shape
    lab = np.zeros((h, w), int); cur = 0; sizes = {}
    for y in range(h):
        for x in range(w):
            if m[y, x] and not lab[y, x]:
                cur += 1; st = [(y, x)]; lab[y, x] = cur; n = 0
                while st:
                    cy, cx = st.pop(); n += 1
                    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < h and 0 <= nx < w and m[ny, nx] and not lab[ny, nx]:
                            lab[ny, nx] = cur; st.append((ny, nx))
                sizes[cur] = n
    big = max(sizes.values()) if sizes else 0
    hasred = set(np.unique(lab[red & (lab > 0)]).tolist())
    # pedaços soltos sem vermelho (manchas do fundo) saem; fios vermelhos soltos do cabelo ficam
    keep = {k for k, v in sizes.items() if v >= max(40, big * 0.004) and (k in hasred or v >= big * 0.2)}
    return np.isin(lab, list(keep))

def shrink(a, m, scale):
    h, w = m.shape
    W, H = max(1, round(w * scale)), max(1, round(h * scale))
    out = np.zeros((H, W, 4), np.uint8)
    for Y in range(H):
        y0, y1 = int(Y / scale), max(int(Y / scale) + 1, int((Y + 1) / scale))
        for X in range(W):
            x0, x1 = int(X / scale), max(int(X / scale) + 1, int((X + 1) / scale))
            mm = m[y0:y1, x0:x1]; cov = mm.mean() if mm.size else 0
            if cov < 0.2: continue
            px = a[y0:y1, x0:x1][mm].astype(int)
            r, g, b = px[:, 0], px[:, 1], px[:, 2]
            hot = (r >= 150) & (r > g * 2)                  # brilho vermelho (olhos / veias)
            bone = (r >= 120) & (g >= 90)                   # osso claro
            if hot.mean() >= 0.18: c = px[hot].max(axis=0) if hot.sum() < 3 else np.percentile(px[hot], 75, axis=0)
            elif bone.mean() >= 0.3: c = px[bone].mean(axis=0)
            else: c = px.mean(axis=0) * 1.08
            out[Y, X, :3] = np.clip(c, 0, 255); out[Y, X, 3] = 255
    return out

def outline(o):
    al = o[..., 3] > 0; H, W = al.shape
    res = np.zeros((H + 2, W + 2, 4), np.uint8); res[1:-1, 1:-1] = o
    a2 = np.zeros((H + 2, W + 2), bool); a2[1:-1, 1:-1] = al
    edge = np.zeros_like(a2)
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        edge |= np.roll(np.roll(a2, dy, 0), dx, 1)
    edge &= ~a2
    res[edge] = (10, 6, 9, 255)
    return res

def anchor(o):
    al = o[..., 3] > 0; H = al.shape[0]
    rows = np.where(al.any(axis=1))[0]; low = al[max(0, rows.max() - H // 4):rows.max() + 1]
    cols = np.where(low.any(axis=0))[0]
    return int(round((cols.min() + cols.max()) / 2))

def main():
    im = np.array(Image.open(SRC).convert('RGB'))
    side_h = None; frames = {}
    # escala única baseada na pose de lado (todas as poses ficam proporcionais à folha)
    x0, y0, x1, y1 = BOXES['lado']; m = mask_of(im[y0:y1, x0:x1]); rows = np.where(m.any(axis=1))[0]
    scale = TARGET_H / (rows.max() - rows.min() + 1)
    # as animações estão desenhadas menores na folha: iguala pela largura do corpo andando
    def width(k):
        x0, y0, x1, y1 = BOXES[k]; mm = mask_of(im[y0:y1, x0:x1]); xs = np.where(mm.any(axis=0))[0]; return xs.max() - xs.min() + 1
    anim = scale * width('lado') / width('andar')
    for k, (x0, y0, x1, y1) in BOXES.items():
        a = im[y0:y1, x0:x1]; m = mask_of(a)
        ys, xs = np.where(m); a = a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]; m = m[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
        sc = anim if k in ('idle', 'andar', 'correr', 'ataque', 'morte') else scale
        o = outline(shrink(a, m, sc))
        frames[k] = o
        print(k, o.shape[1], 'x', o.shape[0])
    # monta a folha (uma linha) e os metadados
    W = sum(f.shape[1] + 2 for f in frames.values()); H = max(f.shape[0] for f in frames.values())
    sheet = np.zeros((H, W, 4), np.uint8); meta = {}; x = 0
    for k, f in frames.items():
        h, w = f.shape[:2]; sheet[H - h:H, x:x + w] = f
        meta[k] = {'x': x, 'y': H - h, 'w': w, 'h': h, 'ax': anchor(f)}; x += w + 2
    os.makedirs(os.path.join(ROOT, 'img'), exist_ok=True)
    Image.fromarray(sheet, 'RGBA').save(os.path.join(ROOT, 'img', 'criatura_sombras.png'), optimize=True)
    with open(os.path.join(ROOT, 'js', 'sombra_frames.js'), 'w') as fp:
        fp.write("'use strict';\n// gerado por tools/extrair_sombra.py a partir da folha de arte da Criatura das Sombras\n")
        fp.write('const SOMBRA_FRAMES = ' + json.dumps(meta) + ';\n')
    big = Image.fromarray(sheet, 'RGBA').resize((W * 4, H * 4), Image.NEAREST)
    bg = Image.new('RGBA', big.size, (60, 90, 50, 255)); bg.alpha_composite(big); bg.save(os.path.join(ROOT, 'tools', 'criatura_sombras_preview.png'))

if __name__ == '__main__':
    main()
