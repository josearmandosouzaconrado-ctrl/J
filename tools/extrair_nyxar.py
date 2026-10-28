#!/usr/bin/env python3
"""Reduz a arte da raça Nyxar (tools/nyxar_ref.png, fundo transparente) para o tamanho do jogo.

Preserva as veias turquesa brilhantes, os olhos roxos e os chifres/garras de osso
(cores que sumiriam numa média simples) e grava img/nyxar.png.
"""
import os
from PIL import Image
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET_H = 46            # ~1,7x a altura de um humano no jogo

def main():
    im = np.array(Image.open(os.path.join(ROOT, 'tools', 'nyxar_ref.png')).convert('RGBA')).astype(int)
    al = im[..., 3] > 128
    ys, xs = np.where(al); im = im[ys.min():ys.max() + 1, xs.min():xs.max() + 1]; al = al[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    h, w = al.shape; s = TARGET_H / h; W, H = round(w * s), TARGET_H
    out = np.zeros((H, W, 4), np.uint8)
    for Y in range(H):
        y0, y1 = int(Y / s), max(int(Y / s) + 1, int((Y + 1) / s))
        for X in range(W):
            x0, x1 = int(X / s), max(int(X / s) + 1, int((X + 1) / s))
            m = al[y0:y1, x0:x1]
            if m.mean() < 0.4: continue
            px = im[y0:y1, x0:x1][m][:, :3]; r, g, b = px[:, 0], px[:, 1], px[:, 2]
            teal = (g >= 150) & (b >= 140) & (r < 140)           # veias turquesa
            eye = (b >= 170) & (r >= 120) & (g < 120)             # olhos roxos
            bone = (r >= 170) & (g >= 150) & (b >= 110)           # chifres, garras, ossos
            if eye.mean() >= 0.05: c = px[eye].max(axis=0)
            elif teal.mean() >= 0.14: c = np.percentile(px[teal], 70, axis=0)
            elif bone.mean() >= 0.36: c = px[bone].mean(axis=0)
            else: c = px.mean(axis=0) * 1.05
            out[Y, X, :3] = np.clip(c, 0, 255); out[Y, X, 3] = 255
    # contorno escuro de 1 pixel, no estilo dos outros sprites
    a = out[..., 3] > 0; res = np.zeros((H + 2, W + 2, 4), np.uint8); res[1:-1, 1:-1] = out
    a2 = np.zeros((H + 2, W + 2), bool); a2[1:-1, 1:-1] = a; edge = np.zeros_like(a2)
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)): edge |= np.roll(np.roll(a2, dy, 0), dx, 1)
    res[edge & ~a2] = (12, 8, 16, 255)
    os.makedirs(os.path.join(ROOT, 'img'), exist_ok=True)
    Image.fromarray(res, 'RGBA').save(os.path.join(ROOT, 'img', 'nyxar.png'), optimize=True)
    big = Image.fromarray(res, 'RGBA').resize(((W + 2) * 6, (H + 2) * 6), Image.NEAREST)
    bg = Image.new('RGBA', big.size, (60, 90, 50, 255)); bg.alpha_composite(big); bg.save(os.path.join(ROOT, 'tools', 'nyxar_preview.png'))
    print(W + 2, 'x', H + 2)

if __name__ == '__main__':
    main()
