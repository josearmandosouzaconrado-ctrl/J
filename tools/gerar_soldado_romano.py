#!/usr/bin/env python3
"""Gera o Soldado Romano (legionário) para Minecraft Bedrock, pronto para o Blockbench.

Saída em minecraft/soldado_romano/:
  soldado_romano.bbmodel   projeto do Blockbench (modelo + textura + animações)
  soldado_romano.png       textura 128x128
  SoldadoRomano.mcaddon    add-on pronto para o Minecraft Bedrock
  pacote_recursos/, pacote_comportamento/   o conteúdo do add-on, aberto

Mesmas convenções de tools/gerar_urso_mago.py: coordenadas internas do
Blockbench (frente em -Z, direita do soldado em +X); na exportação Bedrock
o X é espelhado e as rotações X/Y trocam de sinal, como o Blockbench faz.
Rotação X positiva num membro pendurado o leva para a frente.
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

import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import vida_npc  # noqa: E402  (comer, tomar sopa, beber, dormir, conversar)

AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(AQUI, '..', 'minecraft', 'soldado_romano')
TEX = 256
NOME = 'soldado_romano'
NS = 'romano'
ID = f'{NS}:legionario'


def uid(*partes):
    return str(uuid.uuid5(uuid.NAMESPACE_URL, 'soldado_romano/' + '/'.join(map(str, partes))))


# --------------------------------------------------------------------------
# Esqueleto
# --------------------------------------------------------------------------
OSSOS = [
    ('raiz', None, [0, 0, 0], [0, 0, 0]),
    ('perna_dir', 'raiz', [2, 12, 0], [0, 0, 0]),
    ('perna_esq', 'raiz', [-2, 12, 0], [0, 0, 0]),
    ('corpo', 'raiz', [0, 12, 0], [0, 0, 0]),
    ('cabeca', 'corpo', [0, 24, 0], [0, 0, 0]),
    ('crista', 'cabeca', [0, 33, 0], [0, 0, 0]),
    ('capa', 'corpo', [0, 24, 3], [0, 0, 0]),
    ('braco_dir', 'corpo', [5, 22, 0], [0, 0, 0]),
    ('gladio', 'braco_dir', [6, 13, 0], [0, 0, 0]),
    ('martelo', 'braco_dir', [6, 13, 0], [0, 0, 0]),
    *[(n, pai, piv, [0, 0, 0]) for n, pai, piv in vida_npc.ossos_itens(6)],
    ('braco_esq', 'corpo', [-5, 22, 0], [0, 0, 0]),
    ('escudo', 'braco_esq', [-9, 14, 0], [0, 0, 0]),
]

CUBOS = []


def cubo(osso, nome, de, ate, mat, sem=()):
    CUBOS.append(dict(osso=osso, nome=nome, de=de, ate=ate, mat=mat, sem=sem))


def cubo_girado(osso, nome, centro, tam, rot, mat):
    """Cubo com rotação própria (graus, convenção interna) em torno do seu centro."""
    de = [centro[i] - tam[i] / 2 for i in range(3)]
    ate = [centro[i] + tam[i] / 2 for i in range(3)]
    CUBOS.append(dict(osso=osso, nome=nome, de=de, ate=ate, mat=mat, sem=(),
                      rot=rot, origem=list(centro)))


def espelho(lado):
    s = 1 if lado == 'dir' else -1
    return lambda a, b: sorted([a * s, b * s])


# ---- tronco: túnica, lorica segmentata em faixas sobrepostas, cinto e saia
cubo('corpo', 'tronco', [-4, 12, -2], [4, 24, 2], 'tunica')
cubo('corpo', 'gola', [-3, 23.5, -2.5], [3, 24.25, 2.5], 'tunica')
for i, (y0, y1, e) in enumerate(((15, 17, 0.45), (16.8, 18.8, 0.6), (18.6, 20.6, 0.75))):
    cubo('corpo', f'lorica_faixa_{i}', [-4 - e, y0, -2 - e], [4 + e, y1, 2 + e], 'lorica')
cubo('corpo', 'peitoral', [-4.6, 20.4, -2.6], [4.6, 23.4, 2.6], 'peitoral')
for lado in ('dir', 'esq'):
    x = espelho(lado)
    cubo('corpo', f'alca_{lado}', [x(2.2, 2.8)[0], 20.6, -3], [x(2.2, 2.8)[1], 23.6, -2.6], 'bronze')
    cubo('corpo', f'fibula_{lado}', [x(2.9, 3.9)[0], 23, -3.1], [x(2.9, 3.9)[1], 24, -2.6], 'bronze')
cubo('corpo', 'cinto', [-4.9, 13, -2.9], [4.9, 15, 2.9], 'cinto')
cubo('corpo', 'fivela', [-1, 13.25, -3.3], [1, 14.75, -2.9], 'bronze')
for i, x0 in enumerate((-1.9, -0.375, 1.15)):
    cubo('corpo', f'tira_{i}', [x0, 7.8, -3.2], [x0 + 0.75, 13, -2.95], 'couro')
    cubo('corpo', f'ponteira_{i}', [x0 - 0.1, 7, -3.3], [x0 + 0.85, 7.8, -2.85], 'bronze')
cubo('corpo', 'saia', [-4.5, 9, -2.5], [4.5, 13, 2.5], 'saia')
cubo('corpo', 'barra', [-4.9, 8, -2.9], [4.9, 9.5, 2.9], 'saia')
# bainha vazia do gládio (lado direito) e punhal (lado esquerdo)
cubo_girado('corpo', 'bainha', [5.5, 9.5, 3], [1, 7, 2], [-12, 0, 0], 'bainha')
cubo_girado('corpo', 'bainha_boca', [5.5, 13, 3.4], [1.3, 1, 2.3], [-12, 0, 0], 'bronze')
cubo_girado('corpo', 'bainha_ponteira', [5.5, 5.8, 2.2], [1.2, 0.8, 1.6], [-12, 0, 0], 'bronze')
cubo('corpo', 'punhal_bainha', [-4, 9.5, -3.4], [-3, 13, -2.95], 'bainha')
cubo('corpo', 'punhal_cabo', [-3.75, 13, -3.35], [-3.25, 15, -3], 'cabo')
cubo('corpo', 'punhal_pomo', [-4, 15, -3.45], [-3, 15.6, -2.9], 'bronze')
# ---- capa com dobra nos ombros
cubo('capa', 'capa', [-4.5, 8, 3], [4.5, 22, 4], 'capa')
cubo('capa', 'capa_dobra', [-4.7, 21.5, 2.7], [4.7, 24.2, 4.4], 'capa')
# ---- cabeça e galea (capacete) com cúpula, viseira, nuca larga, bochecheiras e penacho
cubo('cabeca', 'cabeca', [-4, 24, -4], [4, 32, 4], 'rosto')
cubo('cabeca', 'nariz', [-0.5, 25.6, -4.6], [0.5, 27, -4], 'nariz')
cubo('cabeca', 'galea', [-4.5, 28, -4.5], [4.5, 32, 4.5], 'galea')
cubo('cabeca', 'cupula', [-4, 32, -4], [4, 33, 4], 'cupula')
cubo('cabeca', 'topo', [-3, 33, -3], [3, 33.5, 3], 'cupula')
cubo('cabeca', 'viseira', [-4.8, 28, -5.3], [4.8, 29, -4.5], 'bronze')
cubo('cabeca', 'nuca', [-4.5, 26.5, 4.5], [4.5, 28.5, 6], 'galea')
cubo('cabeca', 'nuca_aba', [-5, 26, 6], [5, 27, 7.2], 'galea')
for lado in ('dir', 'esq'):
    x = espelho(lado)
    cubo('cabeca', f'bochecheira_{lado}', [x(3.6, 4.6)[0], 24, -4.4], [x(3.6, 4.6)[1], 28, -0.6], 'bochecheira')
    cubo('cabeca', f'rebite_{lado}', [x(4.6, 4.85)[0], 25.6, -3], [x(4.6, 4.85)[1], 26.6, -2], 'bronze')
cubo('crista', 'suporte', [-0.75, 33.5, -0.75], [0.75, 34.5, 0.75], 'bronze')
cubo('crista', 'penacho', [-1, 34.5, -3], [1, 37.5, 3], 'penacho')
cubo('crista', 'penacho_frente', [-1, 34, -4.6], [1, 36.6, -3], 'penacho')
cubo('crista', 'penacho_tras', [-1, 34, 3], [1, 36.6, 4.6], 'penacho')
cubo('crista', 'penacho_topo', [-0.75, 37.5, -2], [0.75, 38.2, 2], 'penacho')
# ---- braços com ombreiras em três placas e braceletes; pernas com caligae vazadas
for lado in ('dir', 'esq'):
    x = espelho(lado)
    b = f'braco_{lado}'
    cubo(b, f'braco_{lado}', [x(4, 8)[0], 12, -2], [x(4, 8)[1], 24, 2], 'braco')
    for i, (xa, xb, y0, y1, e) in enumerate(((3.5, 8.7, 23, 24.8, 2.7), (4, 8.6, 21.3, 23.2, 2.6), (4.2, 8.5, 19.6, 21.5, 2.5))):
        cubo(b, f'ombreira_{lado}_{i}', [x(xa, xb)[0], y0, -e], [x(xa, xb)[1], y1, e], 'ombreira')
    cubo(b, f'bracelete_{lado}', [x(3.7, 8.3)[0], 13.2, -2.3], [x(3.7, 8.3)[1], 16, 2.3], 'bracelete')
    p = f'perna_{lado}'
    cubo(p, f'perna_{lado}', [x(0, 4)[0], 1, -2], [x(0, 4)[1], 12, 2], 'perna')
    cubo(p, f'caliga_{lado}', [x(-0.3, 4.3)[0], 1, -2.3], [x(-0.3, 4.3)[1], 6, 2.3], 'caliga', sem=('up', 'down'))
    cubo(p, f'sola_{lado}', [x(-0.5, 4.5)[0], 0, -2.8], [x(-0.5, 4.5)[1], 1, 2.5], 'sola')
# ---- gládio em 3D: lâmina com nervura e ponta afunilada, guarda, cabo com anéis e pomo
cubo('gladio', 'cabo', [5.6, 12.6, -2], [6.4, 13.4, 1.5], 'cabo')
cubo('gladio', 'anel_0', [5.5, 12.5, -1.2], [6.5, 13.5, -0.8], 'marfim')
cubo('gladio', 'anel_1', [5.5, 12.5, 0.4], [6.5, 13.5, 0.8], 'marfim')
cubo('gladio', 'pomo', [5.1, 12.1, 1.5], [6.9, 13.9, 2.6], 'bronze')
cubo('gladio', 'pomo_topo', [5.4, 12.4, 2.6], [6.6, 13.6, 3.1], 'bronze')
cubo('gladio', 'guarda', [4.8, 11.4, -2.6], [7.2, 14.6, -2], 'bronze')
cubo('gladio', 'guarda_aba', [5.1, 11.8, -2.9], [6.9, 14.2, -2.6], 'marfim')
cubo('gladio', 'lamina', [5.65, 12, -11], [6.35, 14, -2.9], 'lamina')
cubo('gladio', 'nervura', [5.5, 12.7, -11], [6.5, 13.3, -2.9], 'nervura')
cubo('gladio', 'ponta_0', [5.7, 12.25, -12], [6.3, 13.75, -11], 'lamina')
cubo('gladio', 'ponta_1', [5.75, 12.55, -12.8], [6.25, 13.45, -12], 'lamina')
cubo('gladio', 'ponta_2', [5.8, 12.8, -13.4], [6.2, 13.2, -12.8], 'nervura')
# martelo de construção (só aparece na animação construir)
cubo('martelo', 'martelo_cabo', [5.6, 12.6, -7], [6.4, 13.4, 1.5], 'cabo')
cubo('martelo', 'martelo_cabeca', [5.1, 11, -9], [6.9, 15, -6.8], 'ombreira')
cubo('martelo', 'martelo_face', [5.3, 10.4, -8.7], [6.7, 11, -7.1], 'lorica')
# pão, tigela de sopa, caneca e pálpebras (vida dos NPCs)
for _o, _n, _de, _ate, _mat in vida_npc.cubos_itens(6, olhos=(26.9, 28.1)):
    cubo(_o, _n, _de, _ate, _mat)
# ---- scutum curvo: cinco painéis num arco, umbo em domo e bordas douradas
R, CX = 8, -1.5
for i, ang in enumerate((-45, -22.5, 0, 22.5, 45)):
    r = math.radians(ang)
    mat = {0: 'escudo_c', 22.5: 'escudo_m', 45: 'escudo_e'}[abs(ang)]
    cubo_girado('escudo', f'painel_{i}', [CX - R * math.cos(r), 14, R * math.sin(r)], [1, 18, 3.3], [0, ang, 0], mat)
cubo('escudo', 'umbo', [-10.9, 12, -2], [-9.9, 16, 2], 'umbo')
cubo('escudo', 'umbo_domo', [-11.6, 12.5, -1.5], [-10.9, 15.5, 1.5], 'umbo')
cubo('escudo', 'umbo_ponta', [-12, 13.4, -0.6], [-11.6, 14.6, 0.6], 'umbo')

# --------------------------------------------------------------------------
# Pintura
# --------------------------------------------------------------------------
PELE = (212, 158, 118)
PELE_ESC = (168, 114, 82)
PELE_CLARA = (234, 188, 150)
VERMELHO = (160, 30, 30)
VERM_CLARO = (204, 62, 50)
VERM_ESC = (98, 16, 18)
ACO = (170, 177, 188)
ACO_CLARO = (228, 232, 238)
ACO_ESC = (88, 94, 106)
BRONZE = (206, 150, 64)
BRONZE_CLARO = (250, 210, 120)
BRONZE_ESC = (130, 86, 34)
COURO = (110, 68, 38)
COURO_CLARO = (150, 98, 56)
COURO_ESC = (66, 40, 22)
OURO = (255, 206, 80)
OURO_ESC = (200, 142, 44)

rng = random.Random(11)


def misturar(a, b, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


def ruido(cor, forca=6):
    d = rng.randint(-forca, forca)
    return tuple(max(0, min(255, c + d)) for c in cor)


def sombrear(face, xx, yy, w, h, base, claro, escuro):
    if face == 'up':
        c = misturar(base, claro, 0.35)
    elif face == 'down':
        c = misturar(base, escuro, 0.55)
    else:
        t = yy / max(1, h - 1)
        c = misturar(misturar(base, claro, 0.25), escuro, t * 0.55)
        if yy == 0:
            c = misturar(c, claro, 0.3)
    if face != 'up' and xx in (0, w - 1) and w > 2:
        c = misturar(c, escuro, 0.2)
    return c


def preencher(img, x0, y0, w, h, face, base, claro, escuro, forca=5):
    for yy in range(h):
        for xx in range(w):
            img.putpixel((x0 + xx, y0 + yy), ruido(sombrear(face, xx, yy, w, h, base, claro, escuro), forca) + (255,))


def desenhar(img, x0, y0, w, h, desenho, cores):
    for yy, linha in enumerate(desenho):
        for xx, ch in enumerate(linha):
            if ch in cores and 0 <= xx < w and 0 <= yy < h:
                img.putpixel((x0 + xx, y0 + yy), cores[ch] + (255,))


def pintar(img, mat, face, x0, y0, w, h):
    px = lambda x, y, c: img.putpixel((x0 + x, y0 + y), tuple(c) + (255,)) if 0 <= x < w and 0 <= y < h else None
    lateral = face not in ('up', 'down')
    if mat in ('tunica', 'saia', 'capa'):
        preencher(img, x0, y0, w, h, face, VERMELHO, VERM_CLARO, VERM_ESC)
        if lateral and mat in ('saia', 'capa'):  # dobras do tecido
            for xx in range(1, w, 3 if mat == 'capa' else 2):
                for yy in range(h):
                    px(xx, yy, misturar(VERMELHO, VERM_ESC, 0.45))
        if mat == 'saia' and lateral:
            for xx in range(w):
                px(xx, h - 1, OURO if xx % 2 == 0 else VERM_ESC)
        if mat == 'capa' and lateral:
            for xx in range(w):
                px(xx, h - 1, misturar(VERM_ESC, (0, 0, 0), 0.2))
        return
    if mat in ('lorica', 'ombreira'):
        preencher(img, x0, y0, w, h, face, ACO, ACO_CLARO, ACO_ESC, 4)
        if lateral or face == 'up':
            for yy in range(h):
                if yy % 2 == 1:  # placas segmentadas
                    for xx in range(w):
                        px(xx, yy, misturar(ACO, ACO_ESC, 0.55))
                elif lateral:
                    px(0, yy, ACO_CLARO)
        if mat == 'lorica' and face == 'north':
            # fivelas de bronze e alças do peitoral
            for yy in (0, 2, 4):
                px(1, yy, BRONZE)
                px(w - 2, yy, BRONZE)
            for yy in range(0, 3):
                px(w // 2, yy, BRONZE_ESC)
        return
    if mat == 'galea':
        preencher(img, x0, y0, w, h, face, ACO, ACO_CLARO, ACO_ESC, 3)
        if lateral:
            for xx in range(w):
                px(xx, h - 1, BRONZE)
            if h >= 4:
                for xx in range(w):
                    px(xx, 1, misturar(ACO, ACO_CLARO, 0.6))
        if face == 'up':
            for yy in range(h):
                px(w // 2, yy, BRONZE)
        return
    if mat in ('bronze', 'bochecheira', 'umbo'):
        preencher(img, x0, y0, w, h, face, BRONZE, BRONZE_CLARO, BRONZE_ESC, 4)
        if mat == 'umbo' and face == 'west':
            px(1, 1, BRONZE_CLARO)
            px(0, 0, (255, 240, 190))
        if mat == 'bochecheira' and lateral:
            px(0 if w > 1 else 0, h // 2, BRONZE_ESC)
        return
    if mat == 'penacho':
        for yy in range(h):
            for xx in range(w):
                c = misturar(VERM_CLARO, VERM_ESC, yy / max(1, h - 1) * 0.8)
                if (xx + yy * 2) % 3 == 0:
                    c = misturar(c, (230, 90, 70), 0.4)
                px(xx, yy, ruido(c, 6))
        return
    if mat == 'cinto':
        preencher(img, x0, y0, w, h, face, COURO, COURO_CLARO, COURO_ESC, 4)
        if lateral:
            for xx in range(0, w, 2):
                px(xx, 0, BRONZE)
            if face == 'north':
                for xx in range(w // 2 - 1, w // 2 + 1):
                    px(xx, 0, BRONZE_CLARO)
                    px(xx, 1, BRONZE)
        return
    if mat == 'avental':
        for yy in range(h):
            for xx in range(w):
                c = COURO if xx % 2 == 0 else (0, 0, 0)
                if xx % 2 == 0:
                    px(xx, yy, ruido(BRONZE if yy % 2 == 0 else COURO, 4))
                else:
                    img.putpixel((x0 + xx, y0 + yy), (0, 0, 0, 0))
        return
    if mat == 'rosto':
        preencher(img, x0, y0, w, h, face, PELE, PELE_CLARA, PELE_ESC, 3)
        if face == 'north':
            cores = {'b': (245, 245, 245), 'i': (70, 46, 30), 's': (78, 52, 32), 'n': PELE_ESC,
                     'm': (140, 70, 60), 'x': misturar(PELE, (60, 40, 30), 0.25)}
            desenhar(img, x0, y0, w, h, [
                '........',
                '........',
                '........',
                '.ss..ss.',
                '.bi..ib.',
                '...nn...',
                '..xmmx..',
                '.xxxxxx.',
            ], cores)
        elif face in ('east', 'west', 'south'):
            for yy in range(0, 5):
                for xx in range(w):
                    px(xx, yy, ruido((70, 46, 30), 5))  # cabelo
        elif face == 'up':
            for yy in range(h):
                for xx in range(w):
                    px(xx, yy, ruido((70, 46, 30), 5))
        return
    if mat == 'braco':
        preencher(img, x0, y0, w, h, face, PELE, PELE_CLARA, PELE_ESC, 3)
        if lateral:
            for yy in range(0, 4):  # manga da túnica
                for xx in range(w):
                    px(xx, yy, ruido(VERMELHO, 5))
            for yy in range(h - 4, h - 2):  # bracelete de couro
                for xx in range(w):
                    px(xx, yy, ruido(COURO, 4))
        if face == 'up':
            for yy in range(h):
                for xx in range(w):
                    px(xx, yy, ruido(VERMELHO, 5))
        return
    if mat == 'perna':
        preencher(img, x0, y0, w, h, face, PELE, PELE_CLARA, PELE_ESC, 3)
        if lateral:
            # caliga: tiras horizontais de couro e uma tira no meio
            for yy in range(h - 6, h):
                for xx in range(w):
                    if yy >= h - 2:
                        px(xx, yy, COURO_ESC)
                    elif (h - yy) % 2 == 1 or xx == w // 2:
                        px(xx, yy, COURO)
        return
    if mat == 'sola':
        preencher(img, x0, y0, w, h, face, COURO_ESC, COURO, (40, 24, 14), 3)
        if face == 'down':
            for yy in range(1, h, 2):
                for xx in range(1, w, 2):
                    px(xx, yy, (150, 150, 150))  # cravos da sola
        return
    if mat == 'cabo':
        preencher(img, x0, y0, w, h, face, (120, 80, 50), (160, 114, 70), (70, 44, 24), 3)
        return
    if mat == 'lamina':
        preencher(img, x0, y0, w, h, face, (196, 202, 210), (245, 248, 252), (120, 126, 136), 2)
        if lateral and h >= 2:
            for xx in range(w):
                px(xx, 0, (250, 252, 255))
        return
    if mat in ('escudo', 'escudo_borda'):
        if face == 'east':  # parte de trás: madeira
            preencher(img, x0, y0, w, h, face, (128, 88, 52), (160, 118, 74), (86, 56, 30), 5)
            for xx in range(0, w, 3):
                for yy in range(h):
                    px(xx, yy, (100, 66, 36))
            return
        preencher(img, x0, y0, w, h, face, VERMELHO, VERM_CLARO, VERM_ESC, 4)
        if face == 'west':
            for yy in range(h):
                for xx in range(w):
                    if yy in (0, h - 1) or (mat == 'escudo_borda' and xx in (0, w - 1)):
                        px(xx, yy, OURO)
            if mat == 'escudo':
                # moldura interna, faixas em cruz e raios
                desenhar(img, x0, y0, w, h, [
                    '........',
                    '.oooooo.',
                    '.o....o.',
                    '.o.o..o.',
                    '.o..o.o.',
                    '.o.o..o.',
                    '.o..o.o.',
                    'oooooooo',
                    'oooooooo',
                    '.o.o..o.',
                    '.o..o.o.',
                    '.o.o..o.',
                    '.o..o.o.',
                    '.o....o.',
                    '.oooooo.',
                    '........',
                ], {'o': OURO})
        elif lateral:
            for xx in range(w):
                px(xx, 0, OURO)
                px(xx, h - 1, OURO)
        return
    if mat in ('peitoral',):
        preencher(img, x0, y0, w, h, face, ACO, ACO_CLARO, ACO_ESC, 3)
        if lateral:
            for xx in range(w):
                px(xx, 0, ACO_CLARO)
                px(xx, h - 1, ACO_ESC)
            if face == 'north':
                for xx in (1, w - 2):
                    px(xx, 1, BRONZE)
        return
    if mat == 'cupula':
        preencher(img, x0, y0, w, h, face, misturar(ACO, ACO_CLARO, 0.3), ACO_CLARO, ACO, 3)
        if face == 'up':
            for yy in range(h):
                px(w // 2, yy, misturar(ACO, ACO_ESC, 0.4))
        return
    if mat == 'nariz':
        preencher(img, x0, y0, w, h, face, PELE, PELE_CLARA, PELE_ESC, 2)
        return
    if mat in ('couro', 'bainha', 'bracelete'):
        preencher(img, x0, y0, w, h, face, COURO, COURO_CLARO, COURO_ESC, 4)
        if mat == 'bainha' and lateral:
            for yy in range(0, h, 3):
                for xx in range(w):
                    px(xx, yy, BRONZE)
        if mat == 'bracelete' and lateral:
            for xx in range(0, w, 2):
                px(xx, 1, BRONZE)
        return
    if mat == 'caliga':
        for yy in range(h):
            for xx in range(w):
                if yy % 2 == 0 or xx == w // 2 or yy == h - 1:
                    px(xx, yy, ruido(COURO if yy < h - 1 else COURO_ESC, 4))
        return
    if mat == 'marfim':
        preencher(img, x0, y0, w, h, face, (232, 222, 196), (250, 244, 228), (180, 166, 136), 3)
        return
    if mat == 'nervura':
        preencher(img, x0, y0, w, h, face, (226, 232, 240), (255, 255, 255), (150, 156, 168), 2)
        return
    if mat in ('escudo_c', 'escudo_m', 'escudo_e'):
        if face == 'east':
            preencher(img, x0, y0, w, h, face, (128, 88, 52), (160, 118, 74), (86, 56, 30), 5)
            for yy in range(0, h, 4):
                for xx in range(w):
                    px(xx, yy, (100, 66, 36))
            return
        if face != 'west':
            preencher(img, x0, y0, w, h, face, BRONZE, BRONZE_CLARO, BRONZE_ESC, 3)
            return
        preencher(img, x0, y0, w, h, face, VERMELHO, VERM_CLARO, VERM_ESC, 4)
        meio = h // 2
        for xx in range(w):
            px(xx, 0, OURO)
            px(xx, h - 1, OURO)
            px(xx, meio, OURO)
        if mat == 'escudo_e':
            for yy in range(h):
                px(0, yy, OURO)
                px(w - 1, yy, OURO)
        if mat == 'escudo_m':  # um raio dourado em cada metade
            for (xx, yy) in [(2, 3), (1, 4), (2, 5), (1, 6)]:
                px(xx, yy, OURO)
                px(xx, h - 1 - yy, OURO)
        return
    if mat in ('pao', 'tigela', 'sopa', 'caneca'):
        cores = {'pao': (vida_npc.PAO, vida_npc.PAO_CLARO, vida_npc.PAO_ESC),
                 'tigela': (vida_npc.MADEIRA, (160, 116, 76), (90, 58, 30)),
                 'sopa': (vida_npc.SOPA, (230, 170, 100), vida_npc.SOPA),
                 'caneca': (vida_npc.CANECA, (180, 134, 94), (100, 66, 40))}[mat]
        preencher(img, x0, y0, w, h, face, *cores, 3)
        if mat == 'caneca' and face == 'up':
            for yy in range(1, h - 1):
                for xx in range(1, w - 1):
                    px(xx, yy, (150, 40, 60))
        return
    if mat == 'palpebra':
        preencher(img, x0, y0, w, h, face, PELE, PELE_CLARA, PELE_ESC, 1)
        if face == 'north':
            for xx in (1, 2, 5, 6):
                px(xx, h // 2, (70, 46, 30))  # olhos fechados
        return
    raise ValueError(mat)


# --------------------------------------------------------------------------
# UV por face
# --------------------------------------------------------------------------
FACES = ['north', 'east', 'south', 'west', 'up', 'down']


def dims_face(c, face):
    sx, sy, sz = (c['ate'][i] - c['de'][i] for i in range(3))
    return {'north': (sx, sy), 'south': (sx, sy), 'east': (sz, sy), 'west': (sz, sy),
            'up': (sx, sz), 'down': (sx, sz)}[face]


def montar_textura():
    img = Image.new('RGBA', (TEX, TEX), (0, 0, 0, 0))
    pedidos = []
    for c in CUBOS:
        c['uv'] = {}
        for f in FACES:
            w, h = dims_face(c, f)
            if w > 0 and h > 0 and f not in c['sem']:
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
def ida_volta(osso_vals, t):
    return [(0, osso_vals[0]), (t / 2, osso_vals[1]), (t, osso_vals[0])]


def anim_parado():
    return dict(loop='loop', length=4.0, bones={
        'corpo': {'position': [(0, [0, 0, 0]), (2, [0, 0.25, 0]), (4, [0, 0, 0])]},
        'cabeca': {'rotation': [(0, [0, 0, 0]), (1.5, [0, 10, 0]), (2.5, [0, 10, 0]), (3.5, [0, -6, 0]), (4, [0, 0, 0])]},
        'braco_dir': {'rotation': [(0, [0, 0, 3]), (2, [2, 0, 5]), (4, [0, 0, 3])]},
        'braco_esq': {'rotation': [(0, [0, 0, -3]), (2, [2, 0, -5]), (4, [0, 0, -3])]},
        'capa': {'rotation': [(0, [-2, 0, 0]), (2, [-5, 0, 1]), (4, [-2, 0, 0])]},
        'crista': {'rotation': [(0, [0, 0, 0]), (2, [-3, 0, 0]), (4, [0, 0, 0])]},
    })


def anim_andar():
    a = 30
    return dict(loop='loop', length=1.0, bones={
        'perna_dir': {'rotation': [(0, [a, 0, 0]), (0.5, [-a, 0, 0]), (1, [a, 0, 0])]},
        'perna_esq': {'rotation': [(0, [-a, 0, 0]), (0.5, [a, 0, 0]), (1, [-a, 0, 0])]},
        'braco_dir': {'rotation': [(0, [-22, 0, 3]), (0.5, [22, 0, 3]), (1, [-22, 0, 3])]},
        'braco_esq': {'rotation': [(0, [12, 0, -3]), (0.5, [-12, 0, -3]), (1, [12, 0, -3])]},
        'corpo': {'rotation': [(0, [0, -4, 0]), (0.5, [0, 4, 0]), (1, [0, -4, 0])],
                  'position': [(0, [0, 0, 0]), (0.25, [0, 0.6, 0]), (0.5, [0, 0, 0]), (0.75, [0, 0.6, 0]), (1, [0, 0, 0])]},
        'capa': {'rotation': [(0, [-14, 0, 0]), (0.25, [-20, 0, 0]), (0.5, [-14, 0, 0]), (0.75, [-20, 0, 0]), (1, [-14, 0, 0])]},
        'crista': {'rotation': [(0, [0, 0, 0]), (0.25, [-4, 0, 0]), (0.5, [0, 0, 0]), (0.75, [-4, 0, 0]), (1, [0, 0, 0])]},
    })


POSE_COMBATE = {
    'braco_esq': [12, -80, -8],    # escudo na frente do corpo
    'escudo': [0, 0, 0],
    'braco_dir': [28, 0, 10],      # gládio em guarda, apontando para a frente
    'gladio': [-25, 0, 0],
    'corpo': [0, -12, 0],
    'cabeca': [0, 12, 0],
    'perna_dir': [-12, 0, 2],
    'perna_esq': [14, 0, -2],
}


def anim_combate():
    bones = {k: {'rotation': [(0, v)]} for k, v in POSE_COMBATE.items()}
    v = POSE_COMBATE['braco_dir']
    bones['braco_dir'] = {'rotation': [(0, v), (1, [v[0] + 6, 0, v[2]]), (2, v)]}
    bones['corpo'] = {'rotation': [(0, POSE_COMBATE['corpo'])],
                      'position': [(0, [0, -0.6, 0]), (1, [0, -0.3, 0]), (2, [0, -0.6, 0])]}
    bones['capa'] = {'rotation': [(0, [-8, 0, 0]), (1, [-11, 0, 0]), (2, [-8, 0, 0])]}
    return dict(loop='loop', length=2.0, bones=bones)


def anim_atacar():
    return dict(loop='once', length=0.6, bones={
        'braco_dir': {'rotation': [(0, [0, 0, 0]), (0.15, [-30, 0, 8]), (0.3, [85, 0, 0]), (0.42, [85, 0, 0]), (0.6, [0, 0, 0])]},
        'gladio': {'rotation': [(0, [0, 0, 0]), (0.15, [0, 0, 0]), (0.3, [-85, 0, 0]), (0.42, [-85, 0, 0]), (0.6, [0, 0, 0])]},
        'corpo': {'rotation': [(0, [0, 0, 0]), (0.15, [0, -18, 0]), (0.3, [-6, 22, 0]), (0.6, [0, 0, 0])]},
        'braco_esq': {'rotation': [(0, [0, 0, 0]), (0.3, [-10, 0, -6]), (0.6, [0, 0, 0])]},
    })


def anim_saudar():
    return dict(loop='once', length=2.0, bones={
        'braco_dir': {'rotation': [(0, [0, 0, 0]), (0.4, [125, 0, 18]), (1.5, [125, 0, 18]), (2, [0, 0, 0])]},
        'gladio': {'rotation': [(0, [0, 0, 0]), (0.4, [-60, 0, 0]), (1.5, [-60, 0, 0]), (2, [0, 0, 0])]},
        'cabeca': {'rotation': [(0, [0, 0, 0]), (0.4, [8, 0, 0]), (1.5, [8, 0, 0]), (2, [0, 0, 0])]},
        'corpo': {'rotation': [(0, [0, 0, 0]), (0.4, [3, 0, 0]), (1.5, [3, 0, 0]), (2, [0, 0, 0])]},
    })


def anim_construir():
    # marteladas: braço sobe para a frente e desce batendo
    return dict(loop='loop', length=0.6, bones={
        'braco_dir': {'rotation': [(0, [120, 0, 12]), (0.22, [35, 0, 8]), (0.3, [40, 0, 8]), (0.6, [120, 0, 12])]},
        'martelo': {'rotation': [(0, [-30, 0, 0]), (0.22, [10, 0, 0]), (0.6, [-30, 0, 0])]},
        'braco_esq': {'rotation': [(0, [4, 0, -10])]},
        'corpo': {'rotation': [(0, [-4, 0, 0]), (0.22, [-12, 0, 0]), (0.6, [-4, 0, 0])]},
        'cabeca': {'rotation': [(0, [-12, 0, 0]), (0.22, [-20, 0, 0]), (0.6, [-12, 0, 0])]},
        'perna_dir': {'rotation': [(0, [-10, 0, 0])]},
        'perna_esq': {'rotation': [(0, [12, 0, 0])]},
        'capa': {'rotation': [(0, [-6, 0, 0]), (0.22, [-12, 0, 0]), (0.6, [-6, 0, 0])]},
        'gladio': {'scale': [(0, [0, 0, 0], 'step')]},
    })


ANIMACOES = {
    'parado': anim_parado(),
    'andar': anim_andar(),
    'combate': anim_combate(),
    'atacar': anim_atacar(),
    'saudar': anim_saudar(),
}
for _a in ANIMACOES.values():  # martelo escondido fora da obra
    _a['bones']['martelo'] = {'scale': [(0, [0, 0, 0], 'step')]}
ANIMACOES['construir'] = anim_construir()
for _a in ANIMACOES.values():
    vida_npc.esconder(_a['bones'])
for _nome, _a in vida_npc.animacoes().items():
    _a['bones']['martelo'] = {'scale': [(0, [0, 0, 0], 'step')]}
    if _nome != 'conversar':  # o gládio vai para a bainha enquanto come, bebe ou dorme
        _a['bones']['gladio'] = {'scale': [(0, [0, 0, 0], 'step')]}
    ANIMACOES[_nome] = _a


# --------------------------------------------------------------------------
# Blockbench / Bedrock
# --------------------------------------------------------------------------
def num(v):
    v = round(float(v), 4)
    return int(v) if v == int(v) else v


def gerar_bbmodel(png):
    elementos, filhos = [], {o[0]: [] for o in OSSOS}
    for c in CUBOS:
        u = uid('cubo', c['nome'])
        piv = next(o[2] for o in OSSOS if o[0] == c['osso'])
        faces = {f: ({'uv': [num(v) for v in c['uv'][f]], 'texture': 0} if f in c['uv']
                     else {'uv': [0, 0, 0, 0], 'texture': None}) for f in FACES}
        elementos.append({
            'name': c['nome'], 'box_uv': False, 'rescale': False, 'locked': False,
            'light_emission': 0, 'render_order': 'default', 'allow_mirror_modeling': True,
            'from': [num(v) for v in c['de']], 'to': [num(v) for v in c['ate']], 'autouv': 0,
            'color': sum(map(ord, c['mat'])) % 8, 'origin': [num(v) for v in c.get('origem', piv)],
            'rotation': [num(v) for v in c.get('rot', [0, 0, 0])], 'inflate': 0, 'faces': faces, 'type': 'cube', 'uuid': u,
        })
        filhos[c['osso']].append(u)

    def grupo(nome):
        o = next(o for o in OSSOS if o[0] == nome)
        return {
            'name': nome, 'origin': [num(v) for v in o[2]], 'rotation': [num(v) for v in o[3]],
            'color': 0, 'uuid': uid('osso', nome), 'export': True, 'mirror_uv': False,
            'isOpen': nome in ('raiz', 'corpo'), 'locked': False, 'visibility': True, 'autouv': 0,
            'children': filhos[nome] + [grupo(f[0]) for f in OSSOS if f[1] == nome],
        }

    anims = []
    for nome, a in ANIMACOES.items():
        animators = {}
        for osso, canais in a['bones'].items():
            kfs = []
            for canal, chaves in canais.items():
                for ch in chaves:
                    t, v = ch[0], ch[1]
                    kfs.append({
                        'channel': canal,
                        'data_points': [{'x': str(num(v[0])), 'y': str(num(v[1])), 'z': str(num(v[2]))}],
                        'uuid': uid('kf', nome, osso, canal, t), 'time': t, 'color': -1,
                        'interpolation': ch[2] if len(ch) > 2 else 'catmullrom',
                    })
            animators[uid('osso', osso)] = {'name': osso, 'type': 'bone', 'keyframes': kfs}
        anims.append({
            'uuid': uid('anim', nome), 'name': f'animation.{NOME}.{nome}', 'loop': a['loop'],
            'override': False, 'length': a['length'], 'snapping': 24, 'selected': False,
            'anim_time_update': '', 'blend_weight': '', 'start_delay': '', 'loop_delay': '',
            'animators': animators,
        })
    return {
        'meta': {'format_version': '4.10', 'model_format': 'bedrock', 'box_uv': False},
        'name': NOME, 'model_identifier': NOME, 'visible_box': [1, 2.5, 1.25],
        'variable_placeholders': '', 'variable_placeholder_buttons': [], 'timeline_setups': [],
        'unhandled_root_fields': {}, 'resolution': {'width': TEX, 'height': TEX},
        'elements': elementos, 'outliner': [grupo('raiz')],
        'textures': [{
            'path': '', 'name': f'{NOME}.png', 'folder': 'textures/entity', 'namespace': '', 'id': '0',
            'width': TEX, 'height': TEX, 'uv_width': TEX, 'uv_height': TEX, 'particle': False,
            'use_as_default': False, 'layers_enabled': False, 'sync_to_project': '',
            'render_mode': 'default', 'render_sides': 'auto', 'frame_time': 1,
            'frame_order_type': 'loop', 'frame_order': '', 'frame_interpolate': False,
            'visible': True, 'internal': True, 'saved': False, 'uuid': uid('textura'),
            'source': 'data:image/png;base64,' + base64.b64encode(png).decode(),
        }],
        'animations': anims,
    }


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
            uv = {}
            for f, (u1, v1, u2, v2) in c['uv'].items():
                du, dv = u2 - u1, v2 - v1
                if f in ('up', 'down'):
                    uv[f] = {'uv': [num(u2), num(v2)], 'uv_size': [num(-du), num(-dv)]}
                else:
                    uv[f] = {'uv': [num(u1), num(v1)], 'uv_size': [num(du), num(dv)]}
            cubo_br = {'origin': [num(-(c['de'][0] + size[0])), num(c['de'][1]), num(c['de'][2])],
                       'size': [num(v) for v in size], 'uv': uv}
            if any(c.get('rot', [0, 0, 0])):
                o = c['origem']
                cubo_br['pivot'] = [num(-o[0]), num(o[1]), num(o[2])]
                cubo_br['rotation'] = br_rot(c['rot'])
            cubes.append(cubo_br)
        if cubes:
            b['cubes'] = cubes
        bones.append(b)
    return {'format_version': '1.12.0', 'minecraft:geometry': [{
        'description': {'identifier': f'geometry.{NOME}', 'texture_width': TEX, 'texture_height': TEX,
                        'visible_bounds_width': 2.5, 'visible_bounds_height': 3, 'visible_bounds_offset': [0, 1.25, 0]},
        'bones': bones}]}


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
                    vv = br_rot(v) if canal == 'rotation' else (
                        [num(-v[0]), num(v[1]), num(v[2])] if canal == 'position' else [num(x) for x in v])
                    chave = f'{float(t):.4f}'.rstrip('0').rstrip('.')
                    chave += '' if '.' in chave else '.0'
                    interp = ch[2] if len(ch) > 2 else 'catmullrom'
                    kf[chave] = {'post': vv, 'lerp_mode': 'catmullrom'} if interp == 'catmullrom' else vv
                bc[canal] = kf
            bones[osso] = bc
        anim = {'animation_length': a['length'], 'bones': bones}
        if a['loop'] == 'loop':
            anim['loop'] = True
        out[f'animation.{NOME}.{nome}'] = anim
    out[f'animation.{NOME}.olhar'] = {'loop': True, 'bones': {'cabeca': {
        'rotation': ['query.target_x_rotation', 'query.target_y_rotation', 0]}}}
    return {'format_version': '1.8.0', 'animations': out}


COMBATE = f"query.property('{NS}:em_combate')"
OBRA = f"query.property('{NS}:construindo')"
GUARDA = f"query.property('{NS}:de_guarda')"
MARCHA = f"query.property('{NS}:marchando')"
CONTROLADORES = {
    'format_version': '1.10.0',
    'animation_controllers': {
        f'controller.animation.{NOME}.postura': {
            'initial_state': 'normal',
            'states': {
                'normal': {
                    'animations': ['parado', {'andar': 'query.modified_move_speed > 0.05'}],
                    'transitions': [{'combate': COMBATE}, {'construindo': OBRA + ' && !' + COMBATE},
                                    {'guarda': GUARDA + ' && !' + COMBATE}, *vida_npc.estados_acao(NS)[1]],
                    'blend_transition': 0.2,
                },
                **vida_npc.estados_acao(NS)[0],
                'guarda': {  # patrulha na passarela ou vigia nas torres
                    'animations': ['parado', {'andar': MARCHA}],
                    'transitions': [{'combate': COMBATE}, {'normal': '!' + GUARDA}],
                    'blend_transition': 0.2,
                },
                'construindo': {
                    'animations': ['construir'],
                    'transitions': [{'combate': COMBATE}, {'normal': '!' + OBRA}],
                    'blend_transition': 0.2,
                },
                'combate': {
                    'animations': ['combate', {'andar': 'query.modified_move_speed > 0.05'}],
                    'transitions': [{'normal': '!' + COMBATE}],
                    'blend_transition': 0.25,
                },
            },
        },
        f'controller.animation.{NOME}.ataque': {
            'initial_state': 'pronto',
            'states': {
                'pronto': {'transitions': [{'atacando': 'variable.attack_time > 0'}]},
                'atacando': {
                    'animations': ['atacar'],
                    'transitions': [{'pronto': 'query.all_animations_finished'}],
                },
            },
        },
    },
}

ENTIDADE_CLIENTE = {
    'format_version': '1.10.0',
    'minecraft:client_entity': {'description': {
        'identifier': ID,
        'materials': {'default': 'entity_alphatest'},
        'textures': {'default': f'textures/entity/{NOME}'},
        'geometry': {'default': f'geometry.{NOME}'},
        'animations': {**{n: f'animation.{NOME}.{n}' for n in list(ANIMACOES) + ['olhar']},
                       'postura': f'controller.animation.{NOME}.postura',
                       'ataque': f'controller.animation.{NOME}.ataque'},
        'scripts': {'animate': ['postura', 'ataque', 'olhar']},
        'render_controllers': [f'controller.render.{NOME}'],
        'spawn_egg': {'base_color': '#a01e1e', 'overlay_color': '#ffce50'},
    }},
}

RENDER = {'format_version': '1.8.0', 'render_controllers': {f'controller.render.{NOME}': {
    'geometry': 'Geometry.default', 'materials': [{'*': 'Material.default'}], 'textures': ['Texture.default']}}}

ENTIDADE_SERVIDOR = {
    'format_version': '1.21.0',
    'minecraft:entity': {
        'description': {
            'identifier': ID, 'is_spawnable': True, 'is_summonable': True,
            'properties': {f'{NS}:em_combate': {'type': 'bool', 'default': False, 'client_sync': True},
                           f'{NS}:construindo': {'type': 'bool', 'default': False, 'client_sync': True},
                           f'{NS}:de_guarda': {'type': 'bool', 'default': False, 'client_sync': True},
                           f'{NS}:marchando': {'type': 'bool', 'default': False, 'client_sync': True}},
        },
        'components': {
            'minecraft:type_family': {'family': ['romano', 'mob']},
            'minecraft:health': {'value': 30, 'max': 30},
            'minecraft:attack': {'damage': 6},
            'minecraft:knockback_resistance': {'value': 0.4},
            'minecraft:collision_box': {'width': 0.6, 'height': 1.95},
            'minecraft:physics': {},
            'minecraft:pushable': {'is_pushable': True, 'is_pushable_by_piston': True},
            'minecraft:breathable': {'total_supply': 15, 'suffocate_time': 0},
            'minecraft:nameable': {},
            'minecraft:persistent': {},
            'minecraft:movement': {'value': 0.3},
            'minecraft:navigation.walk': {'can_path_over_water': True, 'avoid_damage_blocks': True,
                                          'can_open_doors': True},
            'minecraft:movement.basic': {},
            'minecraft:jump.static': {},
            'minecraft:can_climb': {},
            'minecraft:follow_range': {'value': 24, 'max': 24},
            'minecraft:behavior.float': {'priority': 0},
            'minecraft:behavior.melee_attack': {'priority': 2, 'speed_multiplier': 1.2, 'track_target': True},
            'minecraft:behavior.hurt_by_target': {'priority': 1},
            'minecraft:behavior.nearest_attackable_target': {
                'priority': 3, 'must_see': True, 'reselect_targets': True,
                'entity_types': [{'filters': {'all_of': [
                    {'test': 'is_family', 'subject': 'other', 'value': 'monster'},
                    {'test': 'is_family', 'subject': 'other', 'operator': '!=', 'value': 'creeper'},
                ]}, 'max_dist': 16}],
            },
            'minecraft:behavior.move_towards_village': {'priority': 6, 'speed_multiplier': 0.7},
            'minecraft:behavior.random_stroll': {'priority': 7, 'speed_multiplier': 0.8},
            'minecraft:behavior.look_at_player': {'priority': 8, 'look_distance': 8, 'probability': 0.05},
            'minecraft:behavior.random_look_around': {'priority': 9},
            'minecraft:environment_sensor': {'triggers': [
                {'filters': {'test': 'has_target', 'value': True}, 'event': f'{NS}:entrar_combate'},
                {'filters': {'test': 'has_target', 'value': False}, 'event': f'{NS}:sair_combate'},
            ]},
        },
        'events': {
            f'{NS}:entrar_combate': {'set_property': {f'{NS}:em_combate': True}},
            f'{NS}:sair_combate': {'set_property': {f'{NS}:em_combate': False}},
        },
    },
}
vida_npc.entidade_acoes(ENTIDADE_SERVIDOR, NS)


def manifesto(tipo, nome, desc, dep):
    return {
        'format_version': 2,
        'header': {'name': nome, 'description': desc, 'uuid': uid('pack', tipo),
                   'version': [1, 0, 0], 'min_engine_version': [1, 21, 0]},
        'modules': [{'type': tipo, 'uuid': uid('modulo', tipo), 'version': [1, 0, 0]}],
        'dependencies': [{'uuid': uid('pack', dep), 'version': [1, 0, 0]}],
    }


LANG = {
    'pt_BR': f'entity.{ID}.name=Soldado Romano\nitem.spawn_egg.entity.{ID}.name=Gerar Soldado Romano\n',
    'en_US': f'entity.{ID}.name=Roman Soldier\nitem.spawn_egg.entity.{ID}.name=Spawn Roman Soldier\n',
}


def icone():
    im = Image.new('RGBA', (16, 16), (60, 20, 20, 255))
    d = ImageDraw.Draw(im)
    d.rectangle([4, 7, 11, 14], fill=PELE + (255,))
    d.rectangle([3, 3, 12, 7], fill=ACO + (255,))
    d.rectangle([3, 7, 12, 7], fill=BRONZE + (255,))
    d.rectangle([3, 8, 4, 12], fill=BRONZE + (255,))
    d.rectangle([11, 8, 12, 12], fill=BRONZE + (255,))
    d.rectangle([5, 0, 10, 2], fill=VERM_CLARO + (255,))
    d.point([(6, 9), (9, 9)], fill=(70, 46, 30, 255))
    d.rectangle([6, 12, 9, 12], fill=(140, 70, 60, 255))
    buf = io.BytesIO()
    im.resize((64, 64), Image.NEAREST).save(buf, 'PNG')
    return buf.getvalue()


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
        'manifest.json': manifesto('resources', 'Soldado Romano (recursos)', 'Modelo, textura e animações do legionário', 'data'),
        f'models/entity/{NOME}.geo.json': gerar_geo(),
        f'animations/{NOME}.animation.json': gerar_animacoes_bedrock(),
        f'animation_controllers/{NOME}.animation_controllers.json': CONTROLADORES,
        f'entity/{NOME}.entity.json': ENTIDADE_CLIENTE,
        f'render_controllers/{NOME}.render_controllers.json': RENDER,
        'texts/languages.json': ['pt_BR', 'en_US'],
    }
    bp = {
        'manifest.json': manifesto('data', 'Soldado Romano (comportamento)', 'Legionário que protege e luta contra monstros', 'resources'),
        f'entities/{NOME}.json': ENTIDADE_SERVIDOR,
    }
    arquivos = {}
    for pasta, conteudo in (('pacote_recursos', rp), ('pacote_comportamento', bp)):
        for rel, dados in conteudo.items():
            arquivos[f'{pasta}/{rel}'] = json.dumps(dados, ensure_ascii=False, indent=2).encode()
    for lang, txt in LANG.items():
        arquivos[f'pacote_recursos/texts/{lang}.lang'] = txt.encode()
    arquivos[f'pacote_recursos/textures/entity/{NOME}.png'] = png
    arquivos['pacote_recursos/pack_icon.png'] = arquivos['pacote_comportamento/pack_icon.png'] = icone()
    for rel, dados in arquivos.items():
        caminho = os.path.join(SAIDA, rel)
        os.makedirs(os.path.dirname(caminho), exist_ok=True)
        with open(caminho, 'wb') as f:
            f.write(dados)
    addon = io.BytesIO()
    with zipfile.ZipFile(addon, 'w', zipfile.ZIP_DEFLATED) as z:
        for pasta, nome_pack in (('pacote_recursos', 'SoldadoRomano_RP.mcpack'),
                                 ('pacote_comportamento', 'SoldadoRomano_BP.mcpack')):
            pack = io.BytesIO()
            with zipfile.ZipFile(pack, 'w', zipfile.ZIP_DEFLATED) as zp:
                for rel, dados in sorted(arquivos.items()):
                    if rel.startswith(pasta + '/'):
                        zp.writestr(rel[len(pasta) + 1:], dados)
            z.writestr(nome_pack, pack.getvalue())
    with open(os.path.join(SAIDA, 'SoldadoRomano.mcaddon'), 'wb') as f:
        f.write(addon.getvalue())
    print('ok:', os.path.normpath(SAIDA))


if __name__ == '__main__':
    main()
