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
TEX = 128
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
    ('cauda', 'quadril', [0, 17, 10], [0, 0, 0]),
    ('perna_dianteira_dir', 'quadril', [5, 11, -6.5], [0, 0, 0]),
    ('perna_dianteira_esq', 'quadril', [-5, 11, -6.5], [0, 0, 0]),
    ('cabeca', 'quadril', [0, 16, -10], [0, 0, 0]),
    ('chapeu', 'cabeca', [0, 20, -14], [0, 0, 0]),
    ('chapeu_meio', 'chapeu', [0, 24, -14], [10, 0, 8]),
    ('chapeu_ponta', 'chapeu_meio', [0, 27, -14], [16, 0, 16]),
    ('orbe', 'urso', [-13, 23, -11], [0, 0, 0]),
    ('circulo_magico', 'urso', [0, 0, -2], [0, 0, 0]),
]

# --------------------------------------------------------------------------
# Cubos: osso, nome, de, até, material
# --------------------------------------------------------------------------
CUBOS = []


def cubo(osso, nome, de, ate, mat):
    CUBOS.append(dict(osso=osso, nome=nome, de=de, ate=ate, mat=mat))


cubo('quadril', 'corpo', [-8, 9, -10], [8, 21, 10], 'corpo')
cubo('quadril', 'corcova', [-7, 21, -9], [7, 23, 0], 'corcova')
cubo('cauda', 'cauda', [-1.5, 15, 10], [1.5, 18, 12], 'cauda')
cubo('cabeca', 'cabeca', [-4.5, 11, -18], [4.5, 20, -10], 'cabeca')
cubo('cabeca', 'focinho', [-2.5, 11, -21], [2.5, 15, -18], 'focinho')
cubo('cabeca', 'orelha_dir', [3.5, 17.5, -14], [6.5, 20.5, -12], 'orelha')
cubo('cabeca', 'orelha_esq', [-6.5, 17.5, -14], [-3.5, 20.5, -12], 'orelha')
cubo('chapeu', 'aba', [-5.5, 20, -19.5], [5.5, 21, -8.5], 'aba')
cubo('chapeu', 'copa', [-3.5, 21, -17.5], [3.5, 25, -10.5], 'copa')
cubo('chapeu_meio', 'cone', [-2.5, 24.5, -16.5], [2.5, 27.5, -11.5], 'cone')
cubo('chapeu_ponta', 'ponta', [-1.5, 27, -15.5], [1.5, 30, -12.5], 'ponta')
for lado, s in (('dir', 1), ('esq', -1)):
    def x(a, b):
        return sorted([a * s, b * s])
    xa = x(2, 8)
    xp = x(1.5, 8.5)
    cubo(f'perna_dianteira_{lado}', f'pata_dianteira_{lado}', [xa[0], 2, -9.5], [xa[1], 11, -3.5], 'perna')
    cubo(f'perna_dianteira_{lado}', f'pe_dianteiro_{lado}', [xp[0], 0, -10], [xp[1], 2, -3], 'pe')
    cubo(f'perna_traseira_{lado}', f'pata_traseira_{lado}', [xa[0], 2, 3.5], [xa[1], 11, 9.5], 'perna')
    cubo(f'perna_traseira_{lado}', f'pe_traseiro_{lado}', [xp[0], 0, 3], [xp[1], 2, 10], 'pe')
cubo('orbe', 'nucleo', [-15, 21, -13], [-11, 25, -9], 'orbe')
for i, (dx, dz) in enumerate(((4, 0), (-4, 0), (0, 4), (0, -4))):
    cx, cz = -13 + dx, -11 + dz
    cubo('orbe', f'faisca_{i}', [cx - 0.5, 22.5 + (i % 2), cz - 0.5], [cx + 0.5, 23.5 + (i % 2), cz + 0.5], 'faisca')
cubo('circulo_magico', 'runas', [-14, 0.1, -16], [14, 0.1, 12], 'circulo')

# --------------------------------------------------------------------------
# Pintura da textura
# --------------------------------------------------------------------------
PELO = (116, 76, 45)
PELO_ESC = (84, 54, 32)
PELO_CLARO = (150, 104, 64)
FOCINHO = (201, 163, 118)
NARIZ = (38, 26, 22)
PE = (64, 42, 28)
GARRA = (230, 224, 206)
CHAPEU = (52, 42, 128)
CHAPEU_CLARO = (74, 60, 168)
OURO = (255, 210, 84)
CIANO = (96, 228, 255)

rng = random.Random(7)


def misturar(a, b, t):
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


def ruido(cor, forca=10):
    d = rng.randint(-forca, forca)
    return tuple(max(0, min(255, c + d)) for c in cor)


def pintar_pelo(img, x0, y0, w, h, face, base=PELO, belly=None):
    for yy in range(h):
        for xx in range(w):
            if face in ('up',):
                c = misturar(base, PELO_CLARO, 0.25)
            elif face == 'down':
                c = belly or misturar(base, PELO_ESC, 0.5)
            else:
                t = yy / max(1, h - 1)
                c = misturar(misturar(base, PELO_CLARO, 0.2), PELO_ESC, t * 0.6)
            # mechas de pelo: listras verticais suaves
            if face not in ('up', 'down') and (xx * 7 + yy // 3) % 5 == 0:
                c = misturar(c, PELO_ESC, 0.25)
            img.putpixel((x0 + xx, y0 + yy), ruido(c, 9) + (255,))


def pintar(img, mat, face, x0, y0, w, h):
    px = lambda x, y, c: img.putpixel((x0 + x, y0 + y), tuple(c) + (255,))
    if mat in ('corpo', 'corcova', 'cauda', 'perna', 'orelha', 'cabeca'):
        base = {'cabeca': misturar(PELO, PELO_CLARO, 0.15), 'corcova': PELO,
                'cauda': PELO_CLARO}.get(mat, PELO)
        belly = misturar(PELO, FOCINHO, 0.35) if mat == 'corpo' else None
        pintar_pelo(img, x0, y0, w, h, face, base, belly)
        if mat == 'perna' and face not in ('up', 'down'):
            for yy in range(h - 3, h):
                for xx in range(w):
                    px(xx, yy, ruido(misturar(PELO_ESC, PE, 0.5), 6))
        if mat == 'orelha' and face == 'north':
            for yy in range(1, h):
                for xx in range(1, w - 1):
                    px(xx, yy, ruido((150, 98, 82), 5))
        if mat == 'cabeca' and face == 'north':
            for ex in (1, 6):  # olhos 2x2 com brilho
                for dy in range(2):
                    for dx in range(2):
                        px(ex + dx, 3 + dy, (18, 14, 14))
                px(ex, 3, (240, 240, 255))
                px(ex, 2, misturar(PELO_ESC, (0, 0, 0), 0.3))
                px(ex + 1, 2, misturar(PELO_ESC, (0, 0, 0), 0.3))
        if mat == 'corpo' and face in ('east', 'west'):
            # runa mágica brilhante no ombro
            runa = ['..#..', '.#.#.', '#.#.#', '.#.#.', '..#..']
            ox = 3 if face == 'east' else w - 8
            for yy, linha in enumerate(runa):
                for xx, ch in enumerate(linha):
                    if ch == '#':
                        px(ox + xx, 3 + yy, CIANO)
        return
    if mat == 'focinho':
        for yy in range(h):
            for xx in range(w):
                c = FOCINHO if face != 'down' else misturar(FOCINHO, PELO_ESC, 0.3)
                img.putpixel((x0 + xx, y0 + yy), ruido(c, 6) + (255,))
        if face == 'north':
            for xx in range(1, 4):
                px(xx, 0, NARIZ)
            px(2, 1, NARIZ)
            px(2, 2, (90, 50, 40))
            px(1, 3, (90, 50, 40))
            px(3, 3, (90, 50, 40))
            px(1, 0, (90, 80, 80))
        if face == 'up':
            for xx in range(1, 4):
                px(xx, h - 1, NARIZ)
        return
    if mat == 'pe':
        for yy in range(h):
            for xx in range(w):
                img.putpixel((x0 + xx, y0 + yy), ruido(PE, 5) + (255,))
        if face == 'north':
            for xx in (1, 3, 5) if w >= 6 else (1,):
                px(xx, h - 1, GARRA)
        if face == 'down':
            for yy in range(1, h - 1):
                for xx in range(1, w - 1):
                    px(xx, yy, (44, 30, 24))
        return
    if mat in ('aba', 'copa', 'cone', 'ponta'):
        for yy in range(h):
            for xx in range(w):
                c = misturar(CHAPEU, CHAPEU_CLARO, rng.random() * 0.5)
                if mat == 'aba' and face not in ('up', 'down'):
                    c = OURO
                if mat == 'copa' and face not in ('up', 'down') and yy == h - 1:
                    c = OURO
                img.putpixel((x0 + xx, y0 + yy), ruido(c, 5) + (255,))
        if face not in ('up', 'down') and mat != 'aba':
            # estrelas douradas
            pts = {'copa': [(1, 0), (4, 1), (2, 2), (6, 1)], 'cone': [(1, 1), (3, 0)],
                   'ponta': [(1, 1)]}[mat]
            for (sx, sy) in pts:
                if sx < w and sy < h:
                    px(sx, sy, OURO)
        if mat == 'aba' and face == 'up':
            for xx in range(w):
                for yy in range(h):
                    if (xx in (0, w - 1) or yy in (0, h - 1)):
                        px(xx, yy, OURO)
        return
    if mat == 'orbe':
        for yy in range(h):
            for xx in range(w):
                borda = xx in (0, w - 1) or yy in (0, h - 1)
                c = misturar(CIANO, (40, 120, 230), 0.4) if borda else (205, 250, 255)
                px(xx, yy, c)
        px(1, 1, (255, 255, 255))
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
    bones['orbe'] = {'position': [(0, [13, 19, -6]), (0.5, [13, 20.5, -6]), (1, [13, 19, -6])],
                     'rotation': [(0, [0, 0, 0], 'linear'), (1, [0, 720, 0], 'linear')],
                     'scale': [(0, [1.3, 1.3, 1.3]), (0.5, [1.6, 1.6, 1.6]), (1, [1.3, 1.3, 1.3])]}
    bones['circulo_magico'] = {'rotation': [(0, [0, 0, 0], 'linear'), (1, [0, -180, 0], 'linear')],
                               'scale': [(0, [1, 1, 1]), (0.5, [1.12, 1, 1.12]), (1, [1, 1, 1])]}
    bones['chapeu'] = {'rotation': [(0, [0, 0, 0]), (0.5, [0, 0, 6]), (1, [0, 0, 0])]}
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
