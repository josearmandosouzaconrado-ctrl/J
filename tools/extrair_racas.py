#!/usr/bin/env python3
"""Recorta os mini-sprites das 10 raças (tools/racas_ref.png) e dos Anjos (tools/anjos_ref.png).

O fundo escuro de cada painel é removido por preenchimento a partir das bordas
(o fundo é uma área contínua; o que não é alcançado é o personagem), as figuras
são separadas por tamanho e gravadas numa folha img/racas.png + js/racas_frames.js.
"""
import json, os, sys
from PIL import Image, ImageFilter
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARD_X = [10, 278, 540, 795, 1055]
RACES = [('voralis', 0, 0), ('zephyran', 1, 0), ('thaldrim', 2, 0), ('silvano', 3, 0), ('krazul', 4, 0),
         ('nimbor', 0, 1), ('vaelith', 1, 1), ('xarqin', 2, 1), ('brumario', 3, 1), ('terralux', 4, 1)]

def background(a, tol=15, far=46):
    """Fundo = pixels ligados às bordas por passos de cor pequenos e não muito longe da cor média das bordas."""
    h, w, _ = a.shape; a = a.astype(int)
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    ref = np.median(border, axis=0)
    near = np.abs(a - ref).sum(axis=2) < far
    bg = np.zeros((h, w), bool); st = []
    for y in range(h):
        for x in (0, w - 1):
            if near[y, x]: bg[y, x] = True; st.append((y, x))
    for x in range(w):
        for y in (0, h - 1):
            if near[y, x] and not bg[y, x]: bg[y, x] = True; st.append((y, x))
    while st:
        y, x = st.pop()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not bg[ny, nx] and near[ny, nx] and np.abs(a[ny, nx] - a[y, x]).sum() < tol * 3:
                bg[ny, nx] = True; st.append((ny, nx))
    return bg

def components(m):
    h, w = m.shape; lab = np.zeros((h, w), int); out = []; cur = 0
    for y in range(h):
        for x in range(w):
            if m[y, x] and not lab[y, x]:
                cur += 1; st = [(y, x)]; lab[y, x] = cur; pts = []
                while st:
                    cy, cx = st.pop(); pts.append((cy, cx))
                    for dy in (-1, 0, 1):
                        for dx in (-1, 0, 1):
                            ny, nx = cy + dy, cx + dx
                            if 0 <= ny < h and 0 <= nx < w and m[ny, nx] and not lab[ny, nx]: lab[ny, nx] = cur; st.append((ny, nx))
                ys = [p[0] for p in pts]; xs = [p[1] for p in pts]
                out.append({'id': cur, 'n': len(pts), 'y0': min(ys), 'y1': max(ys), 'x0': min(xs), 'x1': max(xs)})
    return lab, out

def segments(prof, minw, maxw):
    """Faixas com conteúdo numa projeção; faixas largas demais (figuras encostadas) são cortadas no vale."""
    segs = []; on = None
    for i, v in enumerate(list(prof) + [0]):
        if v > 1 and on is None: on = i
        elif v <= 1 and on is not None: segs.append([on, i]); on = None
    out = []
    for a, b in segs:
        if b - a < minw: continue
        while b - a > maxw:
            mid = a + int(np.argmin(prof[a + minw:b - minw])) + minw if b - a > 2 * minw else (a + b) // 2
            out.append([a, mid]); a = mid
        out.append([a, b])
    return out

def cut(img, region, hmin, hmax, cols_max=34):
    a = np.array(img.crop(region).convert('RGB'))
    fg = ~background(a)
    h, w = fg.shape
    # tira linhas retas da moldura (fileiras/colunas quase cheias)
    for y in range(h):
        if fg[y].mean() > 0.92: fg[y] = False
    for x in range(w):
        if fg[:, x].mean() > 0.92: fg[:, x] = False
    # remove pontinhos soltos
    lab, comps = components(fg)
    for c in comps:
        if c['n'] < 12: fg[lab == c['id']] = False
    res = []
    for r0, r1 in segments(fg.sum(axis=1), hmin // 2, hmax):
        band = fg[r0:r1]
        for c0, c1 in segments(band.sum(axis=0), 8, cols_max):
            m = band[:, c0:c1]
            ys, xs = np.where(m)
            if not len(ys) or ys.max() - ys.min() + 1 < hmin: continue
            y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
            out = np.zeros((y1 - y0, x1 - x0, 4), np.uint8)
            out[..., :3] = a[r0 + y0:r0 + y1, c0 + x0:c0 + x1]; out[..., 3] = m[y0:y1, x0:x1] * 255
            res.append(out)
    return res

def dilate(m, r=1):
    o = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1): o |= np.roll(np.roll(m, dy, 0), dx, 1)
    return o

def fill_holes(m):
    """Preenche o que não é alcançável a partir da borda (sombras escuras dentro do corpo)."""
    h, w = m.shape; out = np.zeros((h, w), bool); st = []
    for y in range(h):
        for x in (0, w - 1):
            if not m[y, x] and not out[y, x]: out[y, x] = True; st.append((y, x))
    for x in range(w):
        for y in (0, h - 1):
            if not m[y, x] and not out[y, x]: out[y, x] = True; st.append((y, x))
    while st:
        y, x = st.pop()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not m[ny, nx] and not out[ny, nx]: out[ny, nx] = True; st.append((ny, nx))
    return ~out

def cut_bright(img, region, hmin, thr=62):
    """Figuras claras sobre o fundo escuro dos quadros: componentes de pixels claros (as linhas
    finas das molduras são escuras e ficam de fora), cada uma recortada pela própria caixa."""
    a = np.array(img.crop(region).convert('RGB')).astype(int)
    core = a.max(axis=2) > thr
    lab, comps = components(dilate(core, 1))
    res = []
    for c in sorted(comps, key=lambda c: (c['y0'] // 60, c['x0'])):
        ch, cw = c['y1'] - c['y0'] + 1, c['x1'] - c['x0'] + 1
        if ch < hmin or cw < 8: continue
        # pedaços cortados pela borda, molduras, armas soltas e ícones ficam de fora
        if c['x0'] == 0 or c['y0'] == 0 or c['x1'] == a.shape[1] - 1 or c['y1'] == a.shape[0] - 1: continue
        if not 0.3 <= cw / ch <= 0.95 or c['n'] < 0.35 * cw * ch: continue
        y0, y1, x0, x1 = c['y0'], c['y1'] + 1, c['x0'], c['x1'] + 1
        m = (lab[y0:y1, x0:x1] == c['id']) & dilate(a[y0:y1, x0:x1].max(axis=2) > thr * 0.55, 0)
        m = fill_holes(m)
        ys, xs = np.where(m); y0b, x0b = y0 + ys.min(), x0 + xs.min(); m = m[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
        out = np.zeros(m.shape + (4,), np.uint8)
        out[..., :3] = a[y0b:y0b + m.shape[0], x0b:x0b + m.shape[1]]; out[..., 3] = m * 255
        res.append(out)
    return res

def fit(spr, H):
    im = Image.fromarray(spr, 'RGBA'); s = H / im.height
    im = im.resize((max(1, round(im.width * s)), H), Image.LANCZOS)
    a = np.array(im); a[..., 3] = np.where(a[..., 3] > 110, 255, 0)
    # contorno escuro de 1 pixel
    al = a[..., 3] > 0; h, w = al.shape; res = np.zeros((h + 2, w + 2, 4), np.uint8); res[1:-1, 1:-1] = a
    a2 = np.zeros((h + 2, w + 2), bool); a2[1:-1, 1:-1] = al; edge = np.zeros_like(a2)
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)): edge |= np.roll(np.roll(a2, dy, 0), dx, 1)
    res[edge & ~a2] = (10, 8, 16, 255)
    return res

def main():
    racas = Image.open(os.path.join(ROOT, 'tools', 'racas_ref.png'))
    sheet = []; meta = {}
    for rid, col, row in RACES:
        cx = CARD_X[col]
        figs = cut_bright(racas, (cx + 118, 284, cx + 278, 402) if row == 0 else (cx + 118, 828, cx + 278, 946), 28, {'zephyran': 100}.get(rid, 62))
        figs = [f for f in figs if f.shape[0] >= 24 and f.shape[1] >= 9]
        figs = [fit(f, 32) for f in figs][:8]
        meta[rid] = []
        for f in figs: meta[rid].append(len(sheet)); sheet.append(f)
        print(rid, len(figs))
    # Anjos: cidadão, guerreiro, arqueiro, mago, clérigo, assassino (linha de sprites grandes)
    anjos = Image.open(os.path.join(ROOT, 'tools', 'anjos_ref.png'))
    roles = ['cidadao', 'guerreiro', 'arqueiro', 'mago', 'clerigo', 'assassino']
    figs = [f for f in cut(anjos, (12, 525, 850, 690), 100, 175, cols_max=150) if f.shape[1] >= 30]
    figs = sorted(figs, key=lambda f: 0)  # já vêm da esquerda para a direita
    meta['anjo'] = []
    for f in figs[:6]: g = fit(f, 40); meta['anjo'].append(len(sheet)); sheet.append(g)
    print('anjo', len(figs))
    # folha: uma linha com todas as figuras
    W = sum(f.shape[1] + 1 for f in sheet); H = max(f.shape[0] for f in sheet)
    out = np.zeros((H, W, 4), np.uint8); boxes = []; x = 0
    for f in sheet:
        h, w = f.shape[:2]; out[H - h:H, x:x + w] = f; boxes.append([x, H - h, w, h]); x += w + 1
    Image.fromarray(out, 'RGBA').save(os.path.join(ROOT, 'img', 'racas.png'), optimize=True)
    with open(os.path.join(ROOT, 'js', 'racas_frames.js'), 'w') as fp:
        fp.write("'use strict';\n// gerado por tools/extrair_racas.py a partir das folhas de arte das raças\n")
        fp.write('const RACAS_BOXES = ' + json.dumps(boxes) + ';\nconst RACAS_FRAMES = ' + json.dumps(meta) + ';\n')
    big = Image.fromarray(out, 'RGBA').resize((W * 3, H * 3), Image.NEAREST)
    bg = Image.new('RGBA', big.size, (60, 90, 50, 255)); bg.alpha_composite(big); bg.save(os.path.join(ROOT, 'tools', 'racas_preview.png'))

if __name__ == '__main__':
    main()
