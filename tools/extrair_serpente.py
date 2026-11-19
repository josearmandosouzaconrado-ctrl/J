#!/usr/bin/env python3
"""Recorta as 4 poses da Serpente-do-Abismo da arte de referência (tools/serpente_ref.png, faixa de baixo)
e monta img/serpente.webp para o jogo: 0 = emergindo de boca aberta, 1 = nadando (vista de cima),
2 = cabeça erguida com o corpo em curva, 3 = enrolada (afundando).
O fundo da faixa é preto com restos de azul puro (de um fundo chroma): tudo isso vira transparente."""
import os
from PIL import Image, ImageFilter, ImageDraw
import numpy as np
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CORTES = [(0, 420), (420, 1025), (1025, 1385), (1385, 1672)]
ALTURAS = [190, 120, 190, 170]          # altura de cada pose no jogo (px do mundo)

def main():
    im = Image.open(os.path.join(ROOT, 'tools', 'serpente_ref.png')).convert('RGB')
    a = np.asarray(im).astype(int)[600:941]
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    chroma = (b > 200) & (r < 35) & (g < 35)
    m = ((r >= 10) & (a.sum(2) > 70) & ~chroma).astype(np.uint8) * 255
    M = Image.fromarray(m).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    W, H = M.size; F = Image.new('L', (W + 2, H + 2), 0); F.paste(M, (1, 1)); ImageDraw.floodfill(F, (0, 0), 128)
    keep = np.asarray(F)[1:-1, 1:-1] != 128
    # buracos grandes (vãos entre o rabo e a cabeça) continuam transparentes; só os pequenos são preenchidos
    buraco = keep & (np.asarray(M) == 0); visto = np.zeros_like(buraco)
    hy, hx = np.nonzero(buraco)
    for y0, x0 in zip(hy, hx):
        if visto[y0, x0]: continue
        pilha = [(y0, x0)]; visto[y0, x0] = True; comp = []
        while pilha:
            y, x = pilha.pop(); comp.append((y, x))
            for yy, xx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= yy < H and 0 <= xx < W and buraco[yy, xx] and not visto[yy, xx]: visto[yy, xx] = True; pilha.append((yy, xx))
        if len(comp) > 250:
            ys, xs = zip(*comp); keep[list(ys), list(xs)] = False
    # restos do fundo presos dentro do corpo (azul puro e verde-água sem vermelho): repinta com a cor da pele em volta
    resto = keep & (((r < 10) & ((g > 40) | (b > 140))) | ((b > 180) & (r < 70) & (g < 70) & (b - np.maximum(r, g) > 140)))
    cor = a.astype(np.float32).copy()
    for _ in range(40):
        if not resto.any(): break
        soma = np.zeros_like(cor); n = np.zeros(resto.shape, np.float32); ok = keep & ~resto
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if not dx and not dy: continue
                o = np.roll(np.roll(ok, dy, 0), dx, 1); c = np.roll(np.roll(cor, dy, 0), dx, 1)
                soma += c * o[..., None]; n += o
        pode = resto & (n > 0)
        cor[pode] = soma[pode] / n[pode][:, None]; resto = resto & ~pode
    a = cor.astype(int)
    rgba = np.zeros(a.shape[:2] + (4,), np.uint8); rgba[..., :3] = a; rgba[..., 3] = keep * 255
    full = Image.fromarray(rgba)
    poses = []
    for (x0, x1), alt in zip(CORTES, ALTURAS):
        p = full.crop((x0, 0, x1, full.height)); bb = p.getchannel('A').getbbox(); p = p.crop(bb)
        w = round(p.width * alt / p.height)
        # reduz com média ponderada pela transparência (sem escurecer as bordas) e alfa limpo
        f = np.asarray(p, dtype=np.float32); al = f[..., 3:4] / 255
        pm = Image.fromarray(np.clip(f[..., :3] * al, 0, 255).astype(np.uint8)).resize((w, alt), Image.BOX)
        am = p.getchannel('A').resize((w, alt), Image.BOX)
        rgb = np.asarray(pm, dtype=np.float32); aa = np.asarray(am, dtype=np.float32)[..., None] / 255
        rgb = np.clip(rgb / np.maximum(aa, 1e-3), 0, 255)
        o = np.zeros((alt, w, 4), np.uint8); o[..., :3] = rgb.astype(np.uint8); o[..., 3] = np.where(aa[..., 0] > 0.45, 255, 0)
        poses.append(Image.fromarray(o))
    larg = sum(p.width for p in poses) + 2 * len(poses); alt = max(p.height for p in poses)
    folha = Image.new('RGBA', (larg, alt)); x = 0; meta = []
    for p in poses: folha.paste(p, (x, 0)); meta.append([x, 0, p.width, p.height]); x += p.width + 2
    q = folha.quantize(colors=96, method=Image.FASTOCTREE, dither=Image.NONE).convert('RGBA'); q.putalpha(folha.getchannel('A'))
    q.save(os.path.join(ROOT, 'img', 'serpente.webp'), lossless=True, quality=100, method=6)
    print('img/serpente.webp', folha.size, meta)

if __name__ == '__main__':
    main()
