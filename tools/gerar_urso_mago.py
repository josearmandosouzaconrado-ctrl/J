#!/usr/bin/env python3
"""Gera o Urso Mago para Minecraft (Bedrock), pronto para abrir no Blockbench.

Saída em minecraft/urso_mago/:
  urso_mago.bbmodel             projeto do Blockbench (modelo + textura + animações)
  urso_mago.png                 textura 128x128
  UrsoMago.mcaddon              add-on pronto para importar no Minecraft Bedrock
  pacote_recursos/, pacote_comportamento/   os mesmos arquivos do add-on, abertos

Coordenadas: "internas" do Blockbench (a frente do urso aponta para -Z e o lado
direito dele é +X). Na hora de exportar para o Bedrock, X é espelhado e as
rotações X/Y trocam de sinal, exatamente como o próprio Blockbench faz.
Valores de animação também estão na convenção interna (a que aparece no
Blockbench): rotação X positiva levanta a frente do osso.
"""
import base64
import io
import json
import math
import os
import random
import uuid
import zipfile

from PIL import Image, ImageDraw

AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(AQUI, '..', 'minecraft', 'urso_mago')
TEX = 256
NOME = 'urso_mago'
NS = 'mago'
ID = f'{NS}:{NOME}'


def uid(*partes):
    return str(uuid.uuid5(uuid.NAMESPACE_URL, 'urso_mago/' + '/'.join(map(str, partes))))


# --------------------------------------------------------------------------
# Esqueleto: nome, pai, pivô, rotação de repouso (graus, convenção interna)
# --------------------------------------------------------------------------
OSSOS = [
    ('urso', None, [0, 0, 0], [0, 0, 0]),
    ('perna_traseira_dir', 'urso', [5, 11, 6.5], [0, 0, 0]),
    ('perna_traseira_esq', 'urso', [-5, 11, 6.5], [0, 0, 0]),
    ('quadril', 'urso', [0, 15, 6], [0, 0, 0]),
    ('cauda', 'quadril', [0, 17, 11], [0, 0, 0]),
    ('perna_dianteira_dir', 'quadril', [5, 11, -6.5], [0, 0, 0]),
    ('perna_dianteira_esq', 'quadril', [-5, 11, -6.5], [0, 0, 0]),
    ('cabeca', 'quadril', [0, 16, -10], [0, 0, 0]),
    ('mandibula', 'cabeca', [0, 10, -16], [0, 0, 0]),
    ('orelha_dir', 'cabeca', [6.5, 18, -13], [0, 0, 0]),
    ('orelha_esq', 'cabeca', [-6.5, 18, -13], [0, 0, 0]),
    ('chapeu', 'cabeca', [0, 20, -14.5], [0, 0, 0]),
    ('chapeu_meio', 'chapeu', [0, 25, -14.5], [8, 0, 6]),
    ('chapeu_ponta', 'chapeu_meio', [0, 28, -14.5], [14, 0, 12]),
    ('chapeu_bico', 'chapeu_ponta', [0, 31, -14.5], [18, 0, 18]),
    ('orbe', 'urso', [-14, 23, -11], [0, 0, 0]),
    ('circulo_magico', 'urso', [0, 0, -2], [0, 0, 0]),
]

# --------------------------------------------------------------------------
# Cubos: osso, nome, de, até, material
# --------------------------------------------------------------------------
CUBOS = []


def cubo(osso, nome, de, ate, mat):
    CUBOS.append(dict(osso=osso, nome=nome, de=de, ate=ate, mat=mat))


# corpo: tronco, peito felpudo, barriga, traseiro arredondado e manto de mago
cubo('quadril', 'corpo', [-8, 9, -10], [8, 21, 10], 'corpo')
cubo('quadril', 'peito', [-7, 8, -11], [7, 15, -8], 'peito')
cubo('quadril', 'barriga', [-6, 8, -6], [6, 9, 7], 'barriga')
cubo('quadril', 'traseiro', [-7, 10, 9], [7, 20, 11], 'corpo')
cubo('quadril', 'manto', [-8.5, 20, -10], [8.5, 23, 2], 'manto')
cubo('quadril', 'manto_topo', [-7, 23, -8], [7, 24, 0], 'manto')
cubo('quadril', 'manto_dir', [8, 12, -10], [9, 20, 2], 'manto_lado')
cubo('quadril', 'manto_esq', [-9, 12, -10], [-8, 20, 2], 'manto_lado')
cubo('quadril', 'gola', [-8.5, 18, -11], [8.5, 21, -9], 'gola')
cubo('cauda', 'cauda', [-1.5, 16, 11], [1.5, 19, 13], 'cauda')
# cabeça redonda com bochechas, focinho, nariz, mandíbula e barbinha
cubo('cabeca', 'cabeca', [-5, 10, -19], [5, 20, -10], 'cabeca')
cubo('cabeca', 'bochechas', [-6, 10, -17], [6, 15, -12], 'bochecha')
cubo('cabeca', 'focinho', [-3, 11, -23], [3, 15, -19], 'focinho')
cubo('cabeca', 'nariz', [-1.5, 14, -23.5], [1.5, 16, -22.5], 'nariz')
cubo('mandibula', 'queixo', [-2.5, 10, -22], [2.5, 11, -17], 'focinho')
cubo('mandibula', 'barba', [-2.5, 7, -21], [2.5, 10, -17], 'barba')
cubo('mandibula', 'barba_ponta', [-1.5, 5, -20], [1.5, 7, -18], 'barba')
for lado, s in (('dir', 1), ('esq', -1)):
    def x(a, b):
        return sorted([a * s, b * s])
    xo, xt = x(5, 8), x(6, 8)
    cubo(f'orelha_{lado}', f'orelha_{lado}', [xo[0], 17, -14], [xo[1], 20, -12], 'orelha')
    cubo(f'orelha_{lado}', f'orelha_ponta_{lado}', [xt[0], 20, -14], [xt[1], 21, -12], 'orelha')
# chapéu de mago curvado, com faixa dourada e estrela na ponta
cubo('chapeu', 'aba', [-6.5, 20, -21], [6.5, 21, -8], 'aba')
cubo('chapeu', 'faixa', [-4.5, 21, -19], [4.5, 22, -10], 'faixa')
cubo('chapeu', 'copa', [-4, 22, -18.5], [4, 25, -10.5], 'copa')
cubo('chapeu_meio', 'cone', [-3, 25, -17.5], [3, 28, -11.5], 'cone')
cubo('chapeu_ponta', 'ponta', [-2, 28, -16.5], [2, 31, -12.5], 'ponta')
cubo('chapeu_bico', 'bico', [-1, 31, -15.5], [1, 33, -13.5], 'ponta')
cubo('chapeu_bico', 'estrela', [-0.5, 33, -15], [0.5, 34, -14], 'estrela')
# pernas grossas: ombro/coxa, pata, pé e garras
for lado, s in (('dir', 1), ('esq', -1)):
    def x(a, b):
        return sorted([a * s, b * s])
    xa, xp, xc = x(2, 8), x(1.5, 8.5), x(1.5, 8.5)
    fd, td = f'perna_dianteira_{lado}', f'perna_traseira_{lado}'
    cubo(fd, f'ombro_{lado}', [xc[0], 7, -10], xc[1:] + [13, -3], 'coxa')
    cubo(fd, f'pata_dianteira_{lado}', [xa[0], 2, -9.5], [xa[1], 7, -3.5], 'perna')
    cubo(fd, f'pe_dianteiro_{lado}', [xp[0], 0, -11], [xp[1], 2, -3], 'pe')
    cubo(td, f'coxa_{lado}', [xc[0], 6, 2.5], xc[1:] + [15, 10.5], 'coxa')
    cubo(td, f'pata_traseira_{lado}', [xa[0], 2, 3.5], [xa[1], 6, 9.5], 'perna')
    cubo(td, f'pe_traseiro_{lado}', [xp[0], 0, 2.5], [xp[1], 2, 10.5], 'pe')
    for i, gx in enumerate((2.5, 4.5, 6.5)):
        g = x(gx, gx + 1)
        cubo(fd, f'garra_d{lado}_{i}', [g[0], 0, -12], [g[1], 1, -11], 'garra')
        cubo(td, f'garra_t{lado}_{i}', [g[0], 0, 1.5], [g[1], 1, 2.5], 'garra')
# orbe mágico com anel e faíscas
cubo('orbe', 'nucleo', [-16, 21, -13], [-12, 25, -9], 'orbe')
cubo('orbe', 'anel', [-18.5, 23, -15.5], [-9.5, 23, -6.5], 'anel')
for i, (dx, dz) in enumerate(((5, 0), (-5, 0), (0, 5), (0, -5))):
    cx, cz = -14 + dx, -11 + dz
    cubo('orbe', f'faisca_{i}', [cx - 0.5, 21.5 + 2 * (i % 2), cz - 0.5], [cx + 0.5, 22.5 + 2 * (i % 2), cz + 0.5], 'faisca')
cubo('circulo_magico', 'runas', [-14, 0.1, -16], [14, 0.1, 12], 'circulo')

# --------------------------------------------------------------------------
# Pintura da textura
# --------------------------------------------------------------------------
PELO = (122, 80, 47)
PELO_ESC = (78, 49, 29)
PELO_CLARO = (166, 117, 72)
FOCINHO = (212, 175, 128)
NARIZ = (34, 24, 22)
PE = (58, 38, 26)
GARRA = (236, 230, 212)
CHAPEU = (46, 36, 118)
CHAPEU_CLARO = (84, 66, 184)
MANTO = (92, 40, 130)
MANTO_CLARO = (128, 66, 172)
OURO = (255, 208, 82)
OURO_ESC = (198, 140, 40)
CIANO = (96, 228, 255)
BARBA = (226, 222, 214)

rng = random.Random(7)


def misturar(a, b, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


def ruido(cor, forca=10):
    d = rng.randint(-forca, forca)
    return tuple(max(0, min(255, c + d)) for c in cor)


def sombrear(face, xx, yy, w, h, base, claro, escuro):
    """Luz vinda de cima: topo claro, laterais em degradê, bordas com sombra."""
    if face == 'up':
        c = misturar(base, claro, 0.35)
    elif face == 'down':
        c = misturar(base, escuro, 0.55)
    else:
        t = yy / max(1, h - 1)
        c = misturar(misturar(base, claro, 0.3), escuro, t * 0.7)
        if yy == 0:
            c = misturar(c, claro, 0.35)
    if face != 'up' and (xx in (0, w - 1)) and w > 2:
        c = misturar(c, escuro, 0.2)
    return c


def pintar_pelo(img, x0, y0, w, h, face, base=PELO, claro=PELO_CLARO, escuro=PELO_ESC, belly=None):
    tela = [[None] * w for _ in range(h)]
    for yy in range(h):
        for xx in range(w):
            if face == 'down' and belly:
                c = belly
            else:
                c = sombrear(face, xx, yy, w, h, base, claro, escuro)
            tela[yy][xx] = ruido(c, 7)
    # mechas de pelo: tracinhos verticais claros e escuros
    for _ in range(max(1, w * h // 7)):
        sx, sy = rng.randrange(w), rng.randrange(h)
        tom = escuro if rng.random() < 0.6 else claro
        for k in range(rng.randint(1, 3)):
            if sy + k < h:
                tela[sy + k][sx] = misturar(tela[sy + k][sx], tom, 0.35)
    for yy in range(h):
        for xx in range(w):
            img.putpixel((x0 + xx, y0 + yy), tela[yy][xx] + (255,))


def preencher(img, x0, y0, w, h, face, base, claro, escuro, forca=5):
    for yy in range(h):
        for xx in range(w):
            c = sombrear(face, xx, yy, w, h, base, claro, escuro)
            img.putpixel((x0 + xx, y0 + yy), ruido(c, forca) + (255,))


def desenhar(img, x0, y0, w, h, desenho, cores):
    oy = 0
    for yy, linha in enumerate(desenho):
        for xx, ch in enumerate(linha):
            if ch in cores and 0 <= xx < w and 0 <= yy + oy < h:
                img.putpixel((x0 + xx, y0 + yy + oy), cores[ch] + (255,))


def pintar(img, mat, face, x0, y0, w, h):
    px = lambda x, y, c: img.putpixel((x0 + x, y0 + y), tuple(c) + (255,))
    lateral = face not in ('up', 'down')
    if mat in ('corpo', 'cauda', 'perna', 'coxa', 'orelha', 'cabeca', 'bochecha', 'peito', 'barriga'):
        base = {'cabeca': misturar(PELO, PELO_CLARO, 0.15), 'bochecha': misturar(PELO, PELO_CLARO, 0.3),
                'cauda': PELO_CLARO, 'peito': misturar(PELO, FOCINHO, 0.35),
                'barriga': misturar(PELO, FOCINHO, 0.3)}.get(mat, PELO)
        belly = misturar(PELO, FOCINHO, 0.3) if mat in ('corpo', 'peito', 'barriga') else None
        pintar_pelo(img, x0, y0, w, h, face, base, belly=belly)
        if mat == 'perna' and lateral:
            for yy in range(max(0, h - 2), h):
                for xx in range(w):
                    px(xx, yy, ruido(misturar(PELO_ESC, PE, 0.6), 5))
        if mat == 'orelha' and face == 'north' and w >= 3:
            for yy in range(1, h):
                for xx in range(1, w - 1):
                    px(xx, yy, ruido((170, 112, 94), 5))
        if mat == 'bochecha' and face == 'north':
            for xx in (0, 1, w - 2, w - 1):
                for yy in range(h):
                    px(xx, yy, ruido(misturar(PELO_CLARO, FOCINHO, 0.4), 6))
        if mat == 'cabeca' and face == 'north':
            olho = ['wd', 'dk']
            cores = {'w': (250, 250, 255), 'd': (16, 12, 14), 'k': (52, 34, 30)}
            desenhar(img, x0 + 2, y0 + 4, w, h, olho, cores)
            desenhar(img, x0 + 6, y0 + 4, w, h, ['dw', 'kd'], cores)
            sobr = misturar(PELO_ESC, (0, 0, 0), 0.35)
            for xx in (1, 2, 3, 6, 7, 8):
                px(xx, 3, sobr if xx in (2, 3, 6, 7) else misturar(PELO_ESC, PELO, 0.5))
            for xx in (2, 7):  # brilhinho mágico abaixo dos olhos
                px(xx, 6, misturar(PELO_CLARO, FOCINHO, 0.5))
        return
    if mat == 'focinho':
        preencher(img, x0, y0, w, h, face, FOCINHO, (236, 206, 164), (160, 120, 82))
        if face == 'north':
            meio = w // 2
            for yy in range(1, h):
                px(meio - 1 if w % 2 == 0 else meio, yy, (120, 76, 56))
            if h >= 4:
                for xx in range(1, w - 1):
                    px(xx, h - 1, (120, 76, 56))
        return
    if mat == 'nariz':
        preencher(img, x0, y0, w, h, face, NARIZ, (90, 78, 80), (10, 8, 8), 2)
        if face == 'north':
            px(0, h - 1, (8, 6, 6))
            px(w - 1, h - 1, (8, 6, 6))
            px(1, 0, (120, 110, 115))
        return
    if mat == 'barba':
        preencher(img, x0, y0, w, h, face, BARBA, (255, 255, 255), (170, 166, 160), 6)
        if lateral:
            for xx in range(0, w, 2):
                for yy in range(h):
                    px(xx, yy, misturar(BARBA, (160, 156, 150), 0.25 + 0.1 * (yy % 2)))
        return
    if mat == 'pe':
        preencher(img, x0, y0, w, h, face, PE, (92, 64, 44), (36, 24, 18), 4)
        if face == 'down':
            for yy in range(2, h - 2):
                for xx in range(2, w - 2):
                    px(xx, yy, (40, 28, 26))
        return
    if mat == 'garra':
        px(0, 0, GARRA)
        return
    if mat in ('manto', 'manto_lado', 'gola'):
        preencher(img, x0, y0, w, h, face, MANTO, MANTO_CLARO, (54, 22, 80), 6)
        if mat == 'manto' and face == 'up':
            for xx in range(w):
                for yy in range(h):
                    if xx in (0, w - 1) or yy in (0, h - 1):
                        px(xx, yy, OURO if (xx + yy) % 2 else OURO_ESC)
            desenhar(img, x0 + w // 2 - 2, y0 + h // 2 - 2, w, h,
                     ['..#..', '.#.#.', '#.o.#', '.#.#.', '..#..'], {'#': OURO, 'o': CIANO})
        if mat == 'manto_lado' and lateral:
            for xx in range(w):
                px(xx, h - 1, OURO)
                if h > 2:
                    px(xx, h - 2, OURO_ESC)
            if w >= 7:
                desenhar(img, x0 + w // 2 - 2, y0 + 1, w, h,
                         ['..#..', '.#.#.', '#.#.#', '.#.#.', '..#..'], {'#': CIANO})
        if mat == 'gola' and lateral:
            for xx in range(w):
                px(xx, 0, OURO)
                px(xx, h - 1, OURO_ESC)
        return
    if mat in ('aba', 'faixa', 'copa', 'cone', 'ponta'):
        if mat == 'faixa':
            preencher(img, x0, y0, w, h, face, OURO, (255, 240, 160), OURO_ESC, 4)
            return
        preencher(img, x0, y0, w, h, face, CHAPEU, CHAPEU_CLARO, (26, 20, 74), 5)
        if mat == 'aba' and lateral:
            for xx in range(w):
                px(xx, 0, OURO_ESC)
        if mat == 'aba' and face == 'up':
            for xx in range(w):
                for yy in range(h):
                    if xx in (0, w - 1) or yy in (0, h - 1):
                        px(xx, yy, OURO)
        if lateral and mat != 'aba':
            pts = {'copa': [(1, 1), (5, 0), (6, 2)], 'cone': [(1, 0), (4, 1)], 'ponta': [(2, 1)]}[mat]
            for sx, sy in pts:
                if sx < w and sy < h:
                    px(sx, sy, OURO)
            if mat == 'copa' and face == 'north':  # lua crescente na frente
                desenhar(img, x0 + 3, y0, w, h, ['.##', '#..', '.##'], {'#': (255, 236, 150)})
        return
    if mat == 'estrela':
        px(0, 0, (255, 236, 120))
        return
    if mat == 'orbe':
        cx, cy = (w - 1) / 2, (h - 1) / 2
        for yy in range(h):
            for xx in range(w):
                d = math.hypot(xx - cx, yy - cy) / max(cx, 1)
                px(xx, yy, misturar((225, 252, 255), (30, 110, 220), d * 0.8))
        px(1, 1, (255, 255, 255))
        return
    if mat == 'anel':
        cx, cy = (w - 1) / 2, (h - 1) / 2
        for yy in range(h):
            for xx in range(w):
                d = math.hypot(xx - cx, yy - cy)
                if cx - 1.2 <= d <= cx + 0.3:
                    px(xx, yy, (190, 160, 255) if (xx + yy) % 3 else (255, 255, 255))
        return
    if mat == 'faisca':
        px(0, 0, (255, 250, 190))
        return
    if mat == 'circulo':
        desenhar_circulo(img, x0, y0, w, h)
        return
    raise ValueError(mat)


def desenhar_circulo(img, x0, y0, w, h):
    """Círculo de runas com fundo transparente."""
    cx, cy = (w - 1) / 2, (h - 1) / 2
    for yy in range(h):
        for xx in range(w):
            d = math.hypot(xx - cx, yy - cy)
            c = None
            if 12.6 <= d <= 13.6:
                c = CIANO
            elif 9.6 <= d <= 10.4:
                c = (150, 120, 255)
            elif 10.4 < d < 12.6:
                ang = math.degrees(math.atan2(yy - cy, xx - cx)) % 360
                if int(ang // 15) % 3 == 0 and abs(d - 11.5) < 0.9:
                    c = (200, 245, 255)  # runas entre os anéis
            if c:
                img.putpixel((x0 + xx, y0 + yy), c + (255,))
    # estrela de seis pontas no meio
    camada = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    dr = ImageDraw.Draw(camada)
    pts = [(cx + 9 * math.cos(math.radians(a)), cy + 9 * math.sin(math.radians(a)))
           for a in range(-90, 270, 60)]
    for tri in (pts[0::2], pts[1::2]):
        dr.polygon(tri, outline=CIANO + (255,))
    for yy in range(h):
        for xx in range(w):
            p = camada.getpixel((xx, yy))
            if p[3]:
                img.putpixel((x0 + xx, y0 + yy), p)


# --------------------------------------------------------------------------
# Distribuição das faces na textura (UV por face)
# --------------------------------------------------------------------------
FACES = ['north', 'east', 'south', 'west', 'up', 'down']


def dims_face(c, face):
    sx = c['ate'][0] - c['de'][0]
    sy = c['ate'][1] - c['de'][1]
    sz = c['ate'][2] - c['de'][2]
    return {'north': (sx, sy), 'south': (sx, sy), 'east': (sz, sy), 'west': (sz, sy),
            'up': (sx, sz), 'down': (sx, sz)}[face]


def montar_textura():
    img = Image.new('RGBA', (TEX, TEX), (0, 0, 0, 0))
    pedidos = []
    for c in CUBOS:
        c['uv'] = {}
        for f in FACES:
            w, h = dims_face(c, f)
            if w <= 0 or h <= 0:
                continue
            pedidos.append((math.ceil(w), math.ceil(h), c, f))
    pedidos.sort(key=lambda p: (-p[1], -p[0]))
    x = y = alt = 0
    for w, h, c, f in pedidos:
        if x + w > TEX:
            x, y, alt = 0, y + alt, 0
        if y + h > TEX:
            raise RuntimeError('textura cheia')
        pintar(img, c['mat'], f, x, y, w, h)
        fw, fh = dims_face(c, f)
        c['uv'][f] = [x, y, x + fw, y + fh]
        x += w
        alt = max(alt, h)
    return img


# --------------------------------------------------------------------------
# Animações (convenção interna do Blockbench)
# --------------------------------------------------------------------------
EM_PE = {
    'quadril': 72, 'cabeca': -64, 'braco': -48,
}


def anim_parado():
    return dict(loop='loop', length=3.0, bones={
        'quadril': {'position': [(0, [0, 0, 0]), (1.5, [0, 0.35, 0]), (3, [0, 0, 0])]},
        'cabeca': {'rotation': [(0, [0, 0, 0]), (1, [-3, -6, 0]), (2, [2, 5, 0]), (3, [0, 0, 0])]},
        'cauda': {'rotation': [(0, [0, 0, 0]), (1.5, [0, 12, 0]), (3, [0, 0, 0])]},
        'orelha_dir': {'rotation': [(0, [0, 0, 0]), (2.0, [0, 0, 0]), (2.1, [0, 0, -18]), (2.3, [0, 0, 0]), (3, [0, 0, 0])]},
        'orelha_esq': {'rotation': [(0, [0, 0, 0]), (0.8, [0, 0, 0]), (0.9, [0, 0, 18]), (1.1, [0, 0, 0]), (3, [0, 0, 0])]},
        'mandibula': {'rotation': [(0, [0, 0, 0]), (1.5, [-3, 0, 0]), (3, [0, 0, 0])]},
        'chapeu': {'rotation': [(0, [0, 0, 0]), (1.5, [0, 0, 3]), (3, [0, 0, 0])]},
        'chapeu_ponta': {'rotation': [(0, [0, 0, 0]), (1.5, [0, 0, -10]), (3, [0, 0, 0])]},
        'orbe': {'position': [(0, [0, 0, 0]), (1.5, [0, 1.5, 0]), (3, [0, 0, 0])],
                 'rotation': [(0, [0, 0, 0], 'linear'), (3, [0, 360, 0], 'linear')]},
        'circulo_magico': {'scale': [(0, [0, 0, 0], 'step')]},
    })


def anim_andar():
    a, b = 26, -26
    return dict(loop='loop', length=1.0, bones={
        'perna_dianteira_dir': {'rotation': [(0, [a, 0, 0]), (0.5, [b, 0, 0]), (1, [a, 0, 0])]},
        'perna_traseira_esq': {'rotation': [(0, [a, 0, 0]), (0.5, [b, 0, 0]), (1, [a, 0, 0])]},
        'perna_dianteira_esq': {'rotation': [(0, [b, 0, 0]), (0.5, [a, 0, 0]), (1, [b, 0, 0])]},
        'perna_traseira_dir': {'rotation': [(0, [b, 0, 0]), (0.5, [a, 0, 0]), (1, [b, 0, 0])]},
        'quadril': {'rotation': [(0, [0, 0, 2]), (0.5, [0, 0, -2]), (1, [0, 0, 2])],
                    'position': [(0, [0, 0, 0]), (0.25, [0, 0.5, 0]), (0.5, [0, 0, 0]),
                                 (0.75, [0, 0.5, 0]), (1, [0, 0, 0])]},
        'cabeca': {'rotation': [(0, [2, 0, 0]), (0.25, [-2, 0, 0]), (0.5, [2, 0, 0]),
                                (0.75, [-2, 0, 0]), (1, [2, 0, 0])]},
        'cauda': {'rotation': [(0, [0, 15, 0]), (0.5, [0, -15, 0]), (1, [0, 15, 0])]},
        'chapeu_ponta': {'rotation': [(0, [0, 0, 8]), (0.5, [0, 0, -8]), (1, [0, 0, 8])]},
        'orbe': {'position': [(0, [0, 0, 0]), (0.5, [0, 1, 0]), (1, [0, 0, 0])],
                 'rotation': [(0, [0, 0, 0], 'linear'), (1, [0, 180, 0], 'linear')]},
        'circulo_magico': {'scale': [(0, [0, 0, 0], 'step')]},
    })


def pose_em_pe(extra_braco=0):
    q, c, br = EM_PE['quadril'], EM_PE['cabeca'], EM_PE['braco'] + extra_braco
    return {
        'quadril': [q, 0, 0], 'cabeca': [c, 0, 0],
        'perna_dianteira_dir': [br, 0, 8], 'perna_dianteira_esq': [br, 0, -8],
        'perna_traseira_dir': [-6, 0, 0], 'perna_traseira_esq': [-6, 0, 0],
        'cauda': [-30, 0, 0],
    }


def anim_transicao(subir):
    pose = pose_em_pe()
    zero = {k: [0, 0, 0] for k in pose}
    ini, fim = (zero, pose) if subir else (pose, zero)
    dur = 1.0 if subir else 0.8
    bones = {}
    for k in pose:
        meio = [v * (1.08 if subir else 0.35) for v in fim[k]] if subir else [v * 0.35 for v in ini[k]]
        bones[k] = {'rotation': [(0, ini[k]), (dur * 0.65, meio), (dur, fim[k])]}
    bones['orbe'] = {'position': [(0, [0, 0, 0] if subir else [-1, 8, 10]), (dur, [-1, 8, 10] if subir else [0, 0, 0])]}
    bones['chapeu_ponta'] = {'rotation': [(0, [0, 0, 0]), (dur * 0.5, [0, 0, -14 if subir else 14]), (dur, [0, 0, 0])]}
    bones['circulo_magico'] = {'scale': [(0, [0, 0, 0], 'step')]}
    if subir:  # rugido ao levantar
        bones['mandibula'] = {'rotation': [(0, [0, 0, 0]), (0.45, [-28, 0, 0]), (0.75, [-28, 0, 0]), (dur, [0, 0, 0])]}
        bones['orelha_dir'] = {'rotation': [(0, [0, 0, 0]), (0.45, [0, 0, -20]), (dur, [0, 0, 0])]}
        bones['orelha_esq'] = {'rotation': [(0, [0, 0, 0]), (0.45, [0, 0, 20]), (dur, [0, 0, 0])]}
    return dict(loop='hold', length=dur, bones=bones)


def anim_em_pe():
    p = pose_em_pe()
    q = p['quadril'][0]
    bones = {k: {'rotation': [(0, v)]} for k, v in p.items()}
    bones['quadril'] = {'rotation': [(0, [q, 0, 0]), (1.5, [q + 2, 0, 3]), (3, [q, 0, 0])]}
    bones['cabeca'] = {'rotation': [(0, p['cabeca']), (1, [p['cabeca'][0], 12, 0]),
                                    (2, [p['cabeca'][0], -12, 0]), (3, p['cabeca'])]}
    br = p['perna_dianteira_dir'][0]
    bones['perna_dianteira_dir'] = {'rotation': [(0, [br, 0, 8]), (1.5, [br + 6, 0, 10]), (3, [br, 0, 8])]}
    bones['perna_dianteira_esq'] = {'rotation': [(0, [br + 6, 0, -10]), (1.5, [br, 0, -8]), (3, [br + 6, 0, -10])]}
    bones['orbe'] = {'position': [(0, [-1, 8, 10]), (1.5, [-1, 9.5, 10]), (3, [-1, 8, 10])],
                     'rotation': [(0, [0, 0, 0], 'linear'), (3, [0, 360, 0], 'linear')]}
    bones['circulo_magico'] = {'scale': [(0, [0, 0, 0], 'step')]}
    return dict(loop='loop', length=3.0, bones=bones)


def anim_magia():
    p = pose_em_pe()
    q, c = p['quadril'][0], p['cabeca'][0]
    bones = {k: {'rotation': [(0, v)]} for k, v in p.items()}
    bones['quadril'] = {'rotation': [(0, [q, 0, 0]), (0.5, [q + 4, 0, 0]), (1, [q, 0, 0])]}
    bones['cabeca'] = {'rotation': [(0, [c + 8, 0, 0]), (0.5, [c + 14, 0, 0]), (1, [c + 8, 0, 0])]}
    for lado, z in (('dir', 1), ('esq', -1)):
        bones[f'perna_dianteira_{lado}'] = {'rotation': [
            (0, [52, 0, 26 * z]), (0.25, [62, 0, 32 * z]), (0.5, [52, 0, 26 * z]),
            (0.75, [62, 0, 32 * z]), (1, [52, 0, 26 * z])]}
    bones['orbe'] = {'position': [(0, [14, 19, -6]), (0.5, [14, 20.5, -6]), (1, [14, 19, -6])],
                     'rotation': [(0, [0, 0, 0], 'linear'), (1, [0, 720, 0], 'linear')],
                     'scale': [(0, [1.3, 1.3, 1.3]), (0.5, [1.6, 1.6, 1.6]), (1, [1.3, 1.3, 1.3])]}
    bones['circulo_magico'] = {'rotation': [(0, [0, 0, 0], 'linear'), (1, [0, -180, 0], 'linear')],
                               'scale': [(0, [1, 1, 1]), (0.5, [1.12, 1, 1.12]), (1, [1, 1, 1])]}
    bones['chapeu'] = {'rotation': [(0, [0, 0, 0]), (0.5, [0, 0, 6]), (1, [0, 0, 0])]}
    bones['mandibula'] = {'rotation': [(0, [-8, 0, 0]), (0.5, [-18, 0, 0]), (1, [-8, 0, 0])]}
    bones['chapeu_ponta'] = {'rotation': [(0, [0, 0, 10]), (0.5, [0, 0, -10]), (1, [0, 0, 10])]}
    return dict(loop='loop', length=1.0, bones=bones)


ANIMACOES = {
    'parado': anim_parado(),
    'andar': anim_andar(),
    'levantar': anim_transicao(True),
    'em_pe': anim_em_pe(),
    'magia': anim_magia(),
    'abaixar': anim_transicao(False),
}

# --------------------------------------------------------------------------
# Projeto do Blockbench (.bbmodel)
# --------------------------------------------------------------------------


def num(v):
    v = round(float(v), 4)
    return int(v) if v == int(v) else v


def gerar_bbmodel(png_bytes):
    elementos = []
    filhos = {o[0]: [] for o in OSSOS}
    for c in CUBOS:
        u = uid('cubo', c['nome'])
        piv = next(o[2] for o in OSSOS if o[0] == c['osso'])
        faces = {}
        for f in FACES:
            if f in c['uv']:
                faces[f] = {'uv': [num(v) for v in c['uv'][f]], 'texture': 0}
            else:
                faces[f] = {'uv': [0, 0, 0, 0], 'texture': None}
        elementos.append({
            'name': c['nome'], 'box_uv': False, 'rescale': False, 'locked': False,
            'light_emission': 0, 'render_order': 'default', 'allow_mirror_modeling': True,
            'from': [num(v) for v in c['de']], 'to': [num(v) for v in c['ate']],
            'autouv': 0, 'color': sum(map(ord, c['mat'])) % 8, 'origin': [num(v) for v in piv],
            'rotation': [0, 0, 0], 'inflate': 0, 'faces': faces, 'type': 'cube', 'uuid': u,
        })
        filhos[c['osso']].append(u)

    def grupo(nome):
        o = next(o for o in OSSOS if o[0] == nome)
        kids = [grupo(f[0]) for f in OSSOS if f[1] == nome]
        return {
            'name': nome, 'origin': [num(v) for v in o[2]], 'rotation': [num(v) for v in o[3]],
            'color': 0, 'uuid': uid('osso', nome), 'export': True, 'mirror_uv': False,
            'isOpen': nome in ('urso', 'quadril'), 'locked': False, 'visibility': True,
            'autouv': 0, 'children': filhos[nome] + kids,
        }

    anims = []
    for nome, a in ANIMACOES.items():
        animators = {}
        for osso, canais in a['bones'].items():
            kfs = []
            for canal, chaves in canais.items():
                for ch in chaves:
                    t, v = ch[0], ch[1]
                    interp = ch[2] if len(ch) > 2 else 'catmullrom'
                    if interp == 'step':
                        interp = 'step'
                    kfs.append({
                        'channel': canal,
                        'data_points': [{'x': str(num(v[0])), 'y': str(num(v[1])), 'z': str(num(v[2]))}],
                        'uuid': uid('kf', nome, osso, canal, t), 'time': t, 'color': -1,
                        'interpolation': interp,
                    })
            animators[uid('osso', osso)] = {'name': osso, 'type': 'bone', 'keyframes': kfs}
        anims.append({
            'uuid': uid('anim', nome), 'name': f'animation.{NOME}.{nome}',
            'loop': a['loop'], 'override': False, 'length': a['length'], 'snapping': 24,
            'selected': False, 'anim_time_update': '', 'blend_weight': '', 'start_delay': '',
            'loop_delay': '', 'animators': animators,
        })

    return {
        'meta': {'format_version': '4.10', 'model_format': 'bedrock', 'box_uv': False},
        'name': NOME,
        'model_identifier': NOME,
        'visible_box': [1.5, 2.5, 0.75],
        'variable_placeholders': '',
        'variable_placeholder_buttons': [],
        'timeline_setups': [],
        'unhandled_root_fields': {},
        'resolution': {'width': TEX, 'height': TEX},
        'elements': elementos,
        'outliner': [grupo('urso')],
        'textures': [{
            'path': '', 'name': f'{NOME}.png', 'folder': 'textures/entity', 'namespace': '',
            'id': '0', 'width': TEX, 'height': TEX, 'uv_width': TEX, 'uv_height': TEX,
            'particle': False, 'use_as_default': False, 'layers_enabled': False,
            'sync_to_project': '', 'render_mode': 'default', 'render_sides': 'auto',
            'frame_time': 1, 'frame_order_type': 'loop', 'frame_order': '',
            'frame_interpolate': False, 'visible': True, 'internal': True, 'saved': False,
            'uuid': uid('textura'),
            'source': 'data:image/png;base64,' + base64.b64encode(png_bytes).decode(),
        }],
        'animations': anims,
    }


# --------------------------------------------------------------------------
# Exportação Bedrock (mesmas regras do exportador do Blockbench)
# --------------------------------------------------------------------------


def br_rot(v):
    return [num(-v[0]), num(-v[1]), num(v[2])]


def gerar_geo():
    bones = []
    for nome, pai, piv, rot in OSSOS:
        b = {'name': nome}
        if pai:
            b['parent'] = pai
        b['pivot'] = [num(-piv[0]), num(piv[1]), num(piv[2])]
        if any(rot):
            b['rotation'] = br_rot(rot)
        cubes = []
        for c in CUBOS:
            if c['osso'] != nome:
                continue
            size = [c['ate'][i] - c['de'][i] for i in range(3)]
            origem = [-(c['de'][0] + size[0]), c['de'][1], c['de'][2]]
            uv = {}
            for f, (u1, v1, u2, v2) in c['uv'].items():
                du, dv = u2 - u1, v2 - v1
                if f in ('up', 'down'):
                    uv[f] = {'uv': [num(u1 + du), num(v1 + dv)], 'uv_size': [num(-du), num(-dv)]}
                else:
                    uv[f] = {'uv': [num(u1), num(v1)], 'uv_size': [num(du), num(dv)]}
            cubes.append({'origin': [num(v) for v in origem], 'size': [num(v) for v in size], 'uv': uv})
        if cubes:
            b['cubes'] = cubes
        bones.append(b)
    return {
        'format_version': '1.12.0',
        'minecraft:geometry': [{
            'description': {
                'identifier': f'geometry.{NOME}', 'texture_width': TEX, 'texture_height': TEX,
                'visible_bounds_width': 3, 'visible_bounds_height': 3.5, 'visible_bounds_offset': [0, 1.25, 0],
            },
            'bones': bones,
        }],
    }


def gerar_animacoes_bedrock():
    out = {}
    for nome, a in ANIMACOES.items():
        bones = {}
        for osso, canais in a['bones'].items():
            bc = {}
            for canal, chaves in canais.items():
                kf = {}
                for ch in chaves:
                    t, v = ch[0], ch[1]
                    interp = ch[2] if len(ch) > 2 else 'catmullrom'
                    if canal == 'rotation':
                        vv = br_rot(v)
                    elif canal == 'position':
                        vv = [num(-v[0]), num(v[1]), num(v[2])]
                    else:
                        vv = [num(x) for x in v]
                    chave = f'{float(t):.4f}'.rstrip('0').rstrip('.')
                    if '.' not in chave:
                        chave += '.0'
                    kf[chave] = {'post': vv, 'lerp_mode': 'catmullrom'} if interp == 'catmullrom' else vv
                bc[canal] = kf
            bones[osso] = bc
        anim = {'animation_length': a['length'], 'bones': bones}
        if a['loop'] == 'loop':
            anim['loop'] = True
        elif a['loop'] == 'hold':
            anim['loop'] = 'hold_on_last_frame'
        out[f'animation.{NOME}.{nome}'] = anim
    out[f'animation.{NOME}.olhar'] = {
        'loop': True,
        'bones': {'cabeca': {'rotation': ['query.target_x_rotation * 0.6', 'query.target_y_rotation * 0.8', 0]}},
    }
    return {'format_version': '1.8.0', 'animations': out}


CONTROLADOR = {
    'format_version': '1.10.0',
    'animation_controllers': {
        f'controller.animation.{NOME}.postura': {
            'initial_state': 'quatro_patas',
            'states': {
                'quatro_patas': {
                    'animations': ['parado', {'andar': 'query.modified_move_speed > 0.05'}],
                    'transitions': [{'levantando': f"query.property('{NS}:em_pe') || query.property('{NS}:conjurando')"}],
                    'blend_transition': 0.2,
                },
                'levantando': {
                    'animations': ['levantar'],
                    'transitions': [{'em_pe': 'query.all_animations_finished'}],
                },
                'em_pe': {
                    'animations': ['em_pe'],
                    'transitions': [
                        {'conjurando': f"query.property('{NS}:conjurando')"},
                        {'abaixando': f"!query.property('{NS}:em_pe') && !query.property('{NS}:conjurando')"},
                    ],
                    'blend_transition': 0.25,
                },
                'conjurando': {
                    'animations': ['magia'],
                    'transitions': [{'em_pe': f"!query.property('{NS}:conjurando')"}],
                    'blend_transition': 0.25,
                },
                'abaixando': {
                    'animations': ['abaixar'],
                    'transitions': [{'quatro_patas': 'query.all_animations_finished'}],
                },
            },
        }
    },
}

ENTIDADE_CLIENTE = {
    'format_version': '1.10.0',
    'minecraft:client_entity': {
        'description': {
            'identifier': ID,
            'materials': {'default': 'entity_alphatest'},
            'textures': {'default': f'textures/entity/{NOME}'},
            'geometry': {'default': f'geometry.{NOME}'},
            'animations': {
                **{n: f'animation.{NOME}.{n}' for n in list(ANIMACOES) + ['olhar']},
                'postura': f'controller.animation.{NOME}.postura',
            },
            'scripts': {'animate': ['postura', 'olhar']},
            'render_controllers': [f'controller.render.{NOME}'],
            'spawn_egg': {'base_color': '#6b4426', 'overlay_color': '#5fe4ff'},
        }
    },
}

RENDER = {
    'format_version': '1.8.0',
    'render_controllers': {
        f'controller.render.{NOME}': {
            'geometry': 'Geometry.default',
            'materials': [{'*': 'Material.default'}],
            'textures': ['Texture.default'],
            'part_visibility': [{'*': True}, {'circulo_magico': f"query.property('{NS}:conjurando')"}],
        }
    },
}

ENTIDADE_SERVIDOR = {
    'format_version': '1.21.0',
    'minecraft:entity': {
        'description': {
            'identifier': ID, 'is_spawnable': True, 'is_summonable': True,
            'properties': {
                f'{NS}:em_pe': {'type': 'bool', 'default': False, 'client_sync': True},
                f'{NS}:conjurando': {'type': 'bool', 'default': False, 'client_sync': True},
            },
        },
        'component_groups': {
            f'{NS}:quatro_patas': {
                'minecraft:timer': {'looping': False, 'randomInterval': True, 'time': [15, 40],
                                    'time_down_event': {'event': f'{NS}:levantar'}},
            },
            f'{NS}:em_pe': {
                'minecraft:timer': {'looping': False, 'randomInterval': True, 'time': [6, 14],
                                    'time_down_event': {'event': f'{NS}:abaixar'}},
                'minecraft:movement': {'value': 0.0},
            },
        },
        'components': {
            'minecraft:type_family': {'family': ['urso_mago', 'mob']},
            'minecraft:health': {'value': 40, 'max': 40},
            'minecraft:collision_box': {'width': 1.2, 'height': 1.5},
            'minecraft:physics': {},
            'minecraft:pushable': {'is_pushable': True, 'is_pushable_by_piston': True},
            'minecraft:breathable': {'total_supply': 15, 'suffocate_time': 0},
            'minecraft:nameable': {},
            'minecraft:movement': {'value': 0.25},
            'minecraft:navigation.walk': {'can_path_over_water': True, 'avoid_damage_blocks': True},
            'minecraft:movement.basic': {},
            'minecraft:jump.static': {},
            'minecraft:follow_range': {'value': 24, 'max': 24},
            'minecraft:behavior.float': {'priority': 0},
            'minecraft:behavior.hurt_by_target': {'priority': 1},
            'minecraft:behavior.summon_entity': {
                'priority': 2,
                'summon_choices': [
                    {
                        'min_activation_range': 0.0, 'max_activation_range': 4.0, 'cooldown_time': 5.0,
                        'weight': 3, 'cast_duration': 2.0, 'particle_color': '#FF5FE4FF',
                        'start_sound_event': 'cast.spell',
                        'sequence': [
                            {'shape': 'circle', 'target': 'self', 'base_delay': 1.0, 'delay_per_summon': 0.0,
                             'num_entities_spawned': 6, 'entity_type': 'minecraft:evocation_fang',
                             'size': 1.5, 'entity_lifespan': 1.1, 'sound_event': 'prepare.attack'},
                            {'shape': 'circle', 'target': 'self', 'base_delay': 0.15, 'delay_per_summon': 0.0,
                             'num_entities_spawned': 10, 'entity_type': 'minecraft:evocation_fang',
                             'size': 2.5, 'entity_lifespan': 1.1},
                        ],
                    },
                    {
                        'min_activation_range': 4.0, 'max_activation_range': 16.0, 'cooldown_time': 5.0,
                        'weight': 3, 'cast_duration': 2.0, 'particle_color': '#FF5FE4FF',
                        'start_sound_event': 'cast.spell',
                        'sequence': [
                            {'shape': 'line', 'target': 'self', 'base_delay': 1.0, 'delay_per_summon': 0.05,
                             'num_entities_spawned': 16, 'entity_type': 'minecraft:evocation_fang',
                             'size': 20, 'entity_lifespan': 1.1},
                        ],
                    },
                ],
            },
            'minecraft:behavior.look_at_target': {'priority': 3},
            'minecraft:behavior.random_stroll': {'priority': 6, 'speed_multiplier': 0.8},
            'minecraft:behavior.look_at_player': {'priority': 7, 'look_distance': 8, 'probability': 0.03},
            'minecraft:behavior.random_look_around': {'priority': 8},
            'minecraft:environment_sensor': {
                'triggers': [
                    {'filters': {'test': 'has_target', 'value': True}, 'event': f'{NS}:comecar_magia'},
                    {'filters': {'test': 'has_target', 'value': False}, 'event': f'{NS}:parar_magia'},
                ]
            },
        },
        'events': {
            'minecraft:entity_spawned': {'add': {'component_groups': [f'{NS}:quatro_patas']}},
            f'{NS}:levantar': {
                'remove': {'component_groups': [f'{NS}:quatro_patas']},
                'add': {'component_groups': [f'{NS}:em_pe']},
                'set_property': {f'{NS}:em_pe': True},
            },
            f'{NS}:abaixar': {
                'remove': {'component_groups': [f'{NS}:em_pe']},
                'add': {'component_groups': [f'{NS}:quatro_patas']},
                'set_property': {f'{NS}:em_pe': False},
            },
            f'{NS}:comecar_magia': {'set_property': {f'{NS}:conjurando': True}},
            f'{NS}:parar_magia': {'set_property': {f'{NS}:conjurando': False}},
        },
    },
}

SPAWN = {
    'format_version': '1.8.0',
    'minecraft:spawn_rules': {
        'description': {'identifier': ID, 'population_control': 'animal'},
        'conditions': [{
            'minecraft:spawns_on_surface': {},
            'minecraft:brightness_filter': {'min': 7, 'max': 15, 'adjust_for_weather': False},
            'minecraft:weight': {'default': 2},
            'minecraft:herd': {'min_size': 1, 'max_size': 1},
            'minecraft:biome_filter': {'any_of': [
                {'test': 'has_biome_tag', 'value': 'taiga'},
                {'test': 'has_biome_tag', 'value': 'forest'},
            ]},
        }],
    },
}


def manifesto(tipo, nome, desc, dep=None):
    m = {
        'format_version': 2,
        'header': {'name': nome, 'description': desc, 'uuid': uid('pack', tipo),
                   'version': [1, 0, 0], 'min_engine_version': [1, 21, 0]},
        'modules': [{'type': tipo, 'uuid': uid('modulo', tipo), 'version': [1, 0, 0]}],
    }
    if dep:
        m['dependencies'] = [{'uuid': uid('pack', dep), 'version': [1, 0, 0]}]
    return m


LANG = {
    'pt_BR': f'entity.{ID}.name=Urso Mago\nitem.spawn_egg.entity.{ID}.name=Gerar Urso Mago\n',
    'en_US': f'entity.{ID}.name=Wizard Bear\nitem.spawn_egg.entity.{ID}.name=Spawn Wizard Bear\n',
}


def main():
    os.makedirs(SAIDA, exist_ok=True)
    img = montar_textura()
    buf = io.BytesIO()
    img.save(buf, 'PNG')
    png = buf.getvalue()

    with open(os.path.join(SAIDA, f'{NOME}.png'), 'wb') as f:
        f.write(png)
    with open(os.path.join(SAIDA, f'{NOME}.bbmodel'), 'w', encoding='utf-8') as f:
        json.dump(gerar_bbmodel(png), f, ensure_ascii=False, indent=1)

    rp = {
        'manifest.json': manifesto('resources', 'Urso Mago (recursos)', 'Modelo, textura e animações do Urso Mago', 'data'),
        f'models/entity/{NOME}.geo.json': gerar_geo(),
        f'animations/{NOME}.animation.json': gerar_animacoes_bedrock(),
        f'animation_controllers/{NOME}.animation_controllers.json': CONTROLADOR,
        f'entity/{NOME}.entity.json': ENTIDADE_CLIENTE,
        f'render_controllers/{NOME}.render_controllers.json': RENDER,
        'texts/languages.json': ['pt_BR', 'en_US'],
    }
    bp = {
        'manifest.json': manifesto('data', 'Urso Mago (comportamento)', 'Urso que usa magia e fica em pé quando quer', 'resources'),
        f'entities/{NOME}.json': ENTIDADE_SERVIDOR,
        f'spawn_rules/{NOME}.json': SPAWN,
    }
    arquivos = {}
    for pasta, conteudo in (('pacote_recursos', rp), ('pacote_comportamento', bp)):
        for rel, dados in conteudo.items():
            arquivos[f'{pasta}/{rel}'] = json.dumps(dados, ensure_ascii=False, indent=2).encode()
    for lang, txt in LANG.items():
        arquivos[f'pacote_recursos/texts/{lang}.lang'] = txt.encode()
    arquivos[f'pacote_recursos/textures/entity/{NOME}.png'] = png
    arquivos['pacote_recursos/pack_icon.png'] = icone(img)
    arquivos['pacote_comportamento/pack_icon.png'] = arquivos['pacote_recursos/pack_icon.png']

    for rel, dados in arquivos.items():
        caminho = os.path.join(SAIDA, rel)
        os.makedirs(os.path.dirname(caminho), exist_ok=True)
        with open(caminho, 'wb') as f:
            f.write(dados)

    # .mcaddon = zip com um .mcpack de cada pacote
    addon = io.BytesIO()
    with zipfile.ZipFile(addon, 'w', zipfile.ZIP_DEFLATED) as z:
        for pasta, nome_pack in (('pacote_recursos', 'UrsoMago_RP.mcpack'), ('pacote_comportamento', 'UrsoMago_BP.mcpack')):
            pack = io.BytesIO()
            with zipfile.ZipFile(pack, 'w', zipfile.ZIP_DEFLATED) as zp:
                for rel, dados in sorted(arquivos.items()):
                    if rel.startswith(pasta + '/'):
                        zp.writestr(rel[len(pasta) + 1:], dados)
            z.writestr(nome_pack, pack.getvalue())
    with open(os.path.join(SAIDA, 'UrsoMago.mcaddon'), 'wb') as f:
        f.write(addon.getvalue())
    print('ok:', os.path.normpath(SAIDA))


def icone(textura):
    """Ícone 64x64 simples: rosto do urso com chapéu, tirado da própria paleta."""
    im = Image.new('RGBA', (16, 16), (40, 30, 90, 255))
    d = ImageDraw.Draw(im)
    d.rectangle([3, 6, 12, 14], fill=PELO + (255,))
    d.rectangle([2, 5, 4, 7], fill=PELO_ESC + (255,))
    d.rectangle([11, 5, 13, 7], fill=PELO_ESC + (255,))
    d.rectangle([2, 5, 13, 5], fill=OURO + (255,))
    d.polygon([(5, 4), (10, 4), (8, 0)], fill=CHAPEU_CLARO + (255,))
    d.point((8, 1), fill=OURO + (255,))
    d.rectangle([5, 9, 6, 10], fill=(18, 14, 14, 255))
    d.rectangle([9, 9, 10, 10], fill=(18, 14, 14, 255))
    d.rectangle([6, 11, 9, 14], fill=FOCINHO + (255,))
    d.rectangle([7, 11, 8, 12], fill=NARIZ + (255,))
    buf = io.BytesIO()
    im.resize((64, 64), Image.NEAREST).save(buf, 'PNG')
    return buf.getvalue()


if __name__ == '__main__':
    main()
