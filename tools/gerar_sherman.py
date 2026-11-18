#!/usr/bin/env python3
"""Tanque M4A3 Sherman (75 mm, casco soldado, suspensão VVSS), modelo detalhado para o Blockbench.

Escala: 1 unidade ~ 4 cm (comprimento ~146, largura ~66, altura ~68). Frente em -Z, direita em +X.
Formas redondas (rodas, canhão, torre, cúpula) são feitas com cubos girados que formam
polígonos, e as faces laterais das rodas são pintadas com recorte circular (transparência).

Saída em minecraft/tanque_sherman/: sherman.bbmodel e sherman.png.
Animações: andar (rodas girando), girar_torre e atirar (recuo do canhão).
"""
import json
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mc_lib import Modelo, misturar, ruido, rng  # noqa: E402

SAIDA = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'minecraft', 'tanque_sherman')

OD, OD_CLARO, OD_ESC = (88, 92, 58), (118, 122, 80), (56, 60, 38)   # verde-oliva militar
LAMA = (110, 92, 66)
ACO = (62, 62, 60)
BORRACHA = (30, 30, 30)
BRANCO = (236, 234, 224)

m = Modelo('sherman', tex=1024, semente=1944)


def osso(nome, pai, pivo, rot=(0, 0, 0)):
    m.osso(nome, pai, pivo, rot)


def caixa(o, nome, de, ate, mat, sem=(), ds=1):
    m.cubo(o, nome, de, ate, mat, sem=sem, ds=ds)


def girado(o, nome, centro, tam, rot, mat, sem=(), ds=1):
    m.cubo_girado(o, nome, centro, tam, rot, mat, sem=sem, ds=ds)


def cilindro(o, nome, centro, raio, comprimento, eixo, mat, lados=3, ds=1):
    """Cilindro aproximado por 'lados' cubos girados em volta do eixo (3 cubos = 12 lados)."""
    for k in range(lados):
        ang = 90 / lados * k
        if eixo == 'x':
            girado(o, f'{nome}_{k}', centro, (comprimento, 2 * raio, 2 * raio), (ang, 0, 0), mat, ds=ds)
        elif eixo == 'y':
            girado(o, f'{nome}_{k}', centro, (2 * raio, comprimento, 2 * raio), (0, ang, 0), mat, ds=ds)
        else:
            girado(o, f'{nome}_{k}', centro, (2 * raio, 2 * raio, comprimento), (0, 0, ang), mat, ds=ds)


# =================================================================== ossos
osso('tanque', None, [0, 0, 0])
osso('casco', 'tanque', [0, 26, 0])
osso('torre', 'casco', [0, 46, -14])
osso('canhao', 'torre', [0, 52, -38])
osso('metralhadora_50', 'torre', [-8, 60, 6])
for lado, sx in (('dir', 1), ('esq', -1)):
    osso(f'suspensao_{lado}', 'tanque', [27 * sx, 8, 0])
    osso(f'roda_motriz_{lado}', f'suspensao_{lado}', [27 * sx, 17.5, -61])
    osso(f'roda_guia_{lado}', f'suspensao_{lado}', [27 * sx, 11, 60])
    for b, zb in enumerate((-36, 0, 36)):
        for r, dz in enumerate((-6.5, 6.5)):
            osso(f'roda_{lado}_{b}_{r}', f'suspensao_{lado}', [27 * sx, 7.5, zb + dz])
        osso(f'rolete_{lado}_{b}', f'suspensao_{lado}', [27 * sx, 21, zb + 4])

# =================================================================== casco inferior e transmissão
caixa('casco', 'casco_baixo', [-21, 8, -64], [21, 26, 62], 'od_lama')
# tampa da transmissão arredondada (degraus que imitam a curva)
for i, (y0, y1, z0) in enumerate(((8, 11, -67), (11, 14, -70), (14, 22, -72), (22, 25, -70), (25, 27, -67))):
    caixa('casco', f'transmissao_{i}', [-21, y0, z0], [21, y1, -64], 'od_lama' if y0 < 16 else 'od')
caixa('casco', 'transmissao_juntas', [-21.5, 13.5, -71], [21.5, 14.5, -69.5], 'od_esc')
for x in (-14, 0, 14):  # parafusos da tampa
    caixa('casco', f'parafuso_trans_{x}', [x - 1, 18, -72.6], [x + 1, 20, -72], 'od_esc')
for sx in (1, -1):  # ganchos de reboque dianteiros
    caixa('casco', f'gancho_frente_{sx}', [sx * 15 - 2, 9, -73], [sx * 15 + 2, 13, -67], 'aco')
    caixa('casco', f'gancho_furo_{sx}', [sx * 15 - 1, 10, -74], [sx * 15 + 1, 12, -73], 'aco')

# =================================================================== casco superior (sponsons sobre as esteiras)
caixa('casco', 'casco_cima', [-31, 26, -50], [31, 44, 62], 'od_lateral')
girado('casco', 'glacis', (0, 35.2, -57.6), (62, 23, 2.6), (38, 0, 0), 'od')  # placa frontal inclinada
girado('casco', 'glacis_borda_dir', (31.2, 35, -57.4), (0.8, 23, 2.4), (38, 0, 0), 'od_esc')
girado('casco', 'glacis_borda_esq', (-31.2, 35, -57.4), (0.8, 23, 2.4), (38, 0, 0), 'od_esc')
caixa('casco', 'parafusos_glacis', [-30, 43.4, -51.2], [30, 44.4, -49.8], 'od_esc')
# elos de esteira reserva presos na placa frontal (proteção extra usada em campo)
for i in range(7):
    girado('casco', f'elo_reserva_{i}', (-18 + i * 6, 33, -59.6), (5.2, 11, 1.4), (38, 0, 0), 'elo')
# metralhadora .30 do operador de rádio, na placa frontal (lado direito)
cilindro('casco', 'bola_mg', (12, 37, -60.5), 2.6, 3, 'z', 'od_esc', lados=2)
cilindro('casco', 'cano_mg_frente', (12, 37, -67), 0.55, 12, 'z', 'aco', lados=2)
caixa('casco', 'mg_frente_mira', [11.4, 38.5, -64], [12.6, 39.2, -62], 'aco')
# faróis com grade de proteção, sirene e olhais de içamento
for sx in (1, -1):
    cilindro('casco', f'farol_{sx}', (sx * 26, 40.4, -55.4), 1.8, 2.6, 'z', 'farol', lados=2)
    for k, dx in enumerate((-2.6, 0, 2.6)):
        caixa('casco', f'grade_farol_{sx}_{k}', [sx * 26 + dx - 0.3, 37.6, -58.2], [sx * 26 + dx + 0.3, 43.4, -57.6], 'aco')
    caixa('casco', f'grade_farol_topo_{sx}', [sx * 26 - 3, 43, -58.2], [sx * 26 + 3, 43.6, -54], 'aco')
    caixa('casco', f'olhal_frente_{sx}', [sx * 21 - 1, 44, -48], [sx * 21 + 1, 46.5, -45], 'od_esc')
    caixa('casco', f'olhal_tras_{sx}', [sx * 24 - 1, 44, 57], [sx * 24 + 1, 46.5, 60], 'od_esc')
cilindro('casco', 'sirene', (-23, 46, -49), 1.6, 3, 'z', 'od_esc', lados=2)
# escotilhas do motorista e do auxiliar, com periscópios e domos de ventilação
for sx, nome in ((-1, 'motorista'), (1, 'auxiliar')):
    caixa('casco', f'escotilha_{nome}', [sx * 12 - 6, 44, -48], [sx * 12 + 6, 45.4, -38], 'od_escotilha')
    caixa('casco', f'dobradica_{nome}', [sx * 12 - 6.5, 44.6, -38], [sx * 12 + 6.5, 46, -36.6], 'od_esc')
    caixa('casco', f'periscopio_{nome}', [sx * 12 - 2.2, 45.4, -46.5], [sx * 12 + 2.2, 47.6, -44.5], 'periscopio')
    caixa('casco', f'periscopio_capa_{nome}', [sx * 12 - 2.6, 47.6, -47], [sx * 12 + 2.6, 48.3, -44], 'od_esc')
    caixa('casco', f'periscopio_fixo_{nome}', [sx * 12 - 2, 44, -51], [sx * 12 + 2, 46.6, -49], 'periscopio')
cilindro('casco', 'ventilador', (0, 45, -44), 2.6, 2, 'y', 'od_esc', lados=2)
# deque do motor: grades, tampas de inspeção, ferramentas e cabo de reboque
caixa('casco', 'deque_motor', [-24, 44, 14], [24, 44.8, 60], 'od')
for i, z0 in enumerate((18, 30)):
    caixa('casco', f'tampa_motor_{i}', [-20, 44.8, z0], [20, 45.5, z0 + 10], 'od_escotilha')
caixa('casco', 'grade_motor', [-20, 44.8, 44], [20, 45.4, 58], 'grade')
caixa('casco', 'tampa_combustivel_d', [17, 44.8, 4], [21, 45.6, 8], 'od_esc')
caixa('casco', 'tampa_combustivel_e', [-21, 44.8, 4], [-17, 45.6, 8], 'od_esc')
# ferramentas de pioneiro presas no deque
caixa('casco', 'pa_cabo', [-29, 44.4, 10], [-27.8, 45.6, 36], 'madeira')
caixa('casco', 'pa_lamina', [-30.5, 44.4, 36], [-26.3, 45.2, 42], 'ferro')
caixa('casco', 'machado_cabo', [-29, 44.4, 44], [-27.8, 45.6, 60], 'madeira')
caixa('casco', 'machado_lamina', [-30.6, 44.4, 43], [-26.6, 45.6, 46], 'ferro')
caixa('casco', 'marreta_cabo', [27.8, 44.4, 12], [29, 45.6, 36], 'madeira')
caixa('casco', 'marreta_cabeca', [26.4, 44, 36], [30.4, 46.2, 40], 'ferro')
caixa('casco', 'picareta_cabo', [27.8, 44.4, 42], [29, 45.6, 60], 'madeira')
caixa('casco', 'picareta_ferro', [25.8, 44.4, 58.5], [31, 45.6, 60], 'ferro')
for i, z in enumerate((14, 34, 50)):
    caixa('casco', f'presilha_d_{i}', [26.5, 44.2, z], [30.5, 46, z + 1], 'aco')
    caixa('casco', f'presilha_e_{i}', [-30.5, 44.2, z], [-26.5, 46, z + 1], 'aco')
caixa('casco', 'cabo_reboque', [-23, 44.6, 61], [23, 46, 62.6], 'cabo')
# traseira: placa, defletor de escapamento, lanternas, ganchos e caixa de telefone da infantaria
caixa('casco', 'placa_traseira', [-31, 26, 62], [31, 44, 63.2], 'od_lama')
girado('casco', 'defletor', (0, 41, 65.6), (46, 7, 1.4), (-28, 0, 0), 'od_esc')
for sx in (1, -1):
    caixa('casco', f'escape_{sx}', [sx * 12 - 4, 30, 63.2], [sx * 12 + 4, 38, 64.6], 'grade')
    caixa('casco', f'lanterna_{sx}', [sx * 26 - 2, 40, 63.2], [sx * 26 + 2, 43, 64.4], 'lanterna')
    caixa('casco', f'gancho_tras_{sx}', [sx * 16 - 2, 26, 63], [sx * 16 + 2, 30, 67], 'aco')
caixa('casco', 'telefone', [22, 30, 63.2], [28, 36, 65.2], 'od_esc')
# para-lamas dianteiros sobre as esteiras
for sx in (1, -1):
    caixa('casco', f'paralama_{sx}', [sx * 21.5 if sx > 0 else -33, 25.5, -68], [33 if sx > 0 else -21.5, 26.3, -50], 'od')

# =================================================================== torre fundida arredondada
ZT = -14  # centro da torre
for i, (y0, y1, r) in enumerate(((44.6, 46.6, 22.6), (46.6, 52, 22.2), (52, 54.4, 21.4), (54.4, 56.4, 20.2),
                                  (56.4, 58.2, 18.4), (58.2, 59.6, 15.6))):
    for k, ang in enumerate((0, 30, 60)):
        girado('torre', f'torre_{i}_{k}', (0, (y0 + y1) / 2, ZT), (2 * r, y1 - y0, 2 * r), (0, ang, 0),
               'od_torre' if i == 1 else 'od')
caixa('torre', 'anel_torre', [-24, 44.2, ZT - 24], [24, 44.8, ZT + 24], 'od_esc')
for k, ang in enumerate((0, 30, 60)):  # bustle (traseira da torre)
    girado('torre', f'bustle_{k}', (0, 50, ZT + 20), (26, 8, 14), (0, ang / 3, 0), 'od')
# escudo do canhão (mantlet) e escudo do rotor
caixa('torre', 'escudo_rotor', [-14, 46, ZT - 24.6], [14, 57.4, ZT - 21.8], 'od_esc')
caixa('canhao', 'mantlet', [-10, 47.5, ZT - 28.4], [10, 56.5, ZT - 24.6], 'od')
caixa('canhao', 'mantlet_borda', [-10.4, 47.2, ZT - 26.4], [10.4, 56.8, ZT - 25.6], 'od_esc')
# canhão M3 de 75 mm: luva da base, tubo e reforço da boca
cilindro('canhao', 'luva', (0, 52, ZT - 32), 2.6, 7, 'z', 'od')
cilindro('canhao', 'tubo', (0, 52, ZT - 68), 1.9, 66, 'z', 'od', lados=3)
cilindro('canhao', 'boca', (0, 52, ZT - 102.5), 2.3, 3.5, 'z', 'od_esc')
cilindro('canhao', 'boca_furo', (0, 52, ZT - 104.3), 1.1, 0.2, 'z', 'preto', lados=2)
# metralhadora coaxial .30 e mira
cilindro('canhao', 'coaxial', (6, 50.5, ZT - 32), 0.55, 8, 'z', 'aco', lados=2)
caixa('canhao', 'mira', [-6.5, 53.8, ZT - 29.2], [-4.5, 55.8, ZT - 28.2], 'periscopio')
# escotilha dupla do comandante (direita) e do carregador (esquerda), periscópios
cilindro('torre', 'cupula', (8, 60.2, ZT + 4), 6.4, 1.6, 'y', 'od_esc')
caixa('torre', 'escotilha_cmd_a', [2.4, 61, ZT + -1.8], [8, 61.8, ZT + 9.8], 'od_escotilha')
caixa('torre', 'escotilha_cmd_b', [8, 61, ZT + -1.8], [13.6, 61.8, ZT + 9.8], 'od_escotilha')
caixa('torre', 'periscopio_cmd', [5.6, 61.8, ZT - 3.2], [10.4, 64, ZT - 1], 'periscopio')
cilindro('torre', 'escotilha_carregador', (-8, 59.9, ZT + 2), 4.6, 1.2, 'y', 'od_escotilha', lados=2)
caixa('torre', 'periscopio_carregador', [-11, 59.6, ZT - 8], [-7, 62.2, ZT - 5.6], 'periscopio')
cilindro('torre', 'domo_ventilacao', (0, 59.8, ZT + 10), 2.2, 1.6, 'y', 'od_esc', lados=2)
caixa('torre', 'porta_pistola', [-21.6, 50, ZT + 4], [-20.6, 54, ZT + 8], 'od_esc')
caixa('torre', 'antena_base', [-15, 51, ZT + 21], [-11, 54.5, ZT + 25], 'od_esc')
caixa('torre', 'antena', [-13.3, 54.5, ZT + 22.7], [-12.7, 96, ZT + 23.3], 'aco')
caixa('torre', 'ganchos_torre', [-23.5, 50, ZT - 12], [-22.4, 52, ZT - 6], 'od_esc')
# metralhadora .50 (M2 Browning) no suporte do teto, com caixa de munição
caixa('metralhadora_50', 'suporte_50', [-9, 59.4, ZT + 18.5], [-7, 64, ZT + 20.5], 'aco')
caixa('metralhadora_50', 'corpo_50', [-9.6, 64, ZT + 12], [-6.4, 67, ZT + 24], 'aco')
caixa('metralhadora_50', 'empunhadura_50', [-9, 64.4, ZT + 24], [-7, 66.4, ZT + 26], 'aco')
cilindro('metralhadora_50', 'camisa_50', (-8, 65.6, ZT + 5), 1.1, 14, 'z', 'camisa', lados=2)
cilindro('metralhadora_50', 'cano_50', (-8, 65.6, ZT - 8), 0.55, 12, 'z', 'aco', lados=2)
caixa('metralhadora_50', 'municao_50', [-6.4, 62.4, ZT + 14], [-2.8, 66, ZT + 20], 'municao')

# =================================================================== estrela branca e números (no casco e na torre)
# (pintadas pelas faces laterais dos materiais 'od_lateral' e 'od_torre')

# =================================================================== suspensão VVSS e esteiras
for lado, sx in (('dir', 1), ('esq', -1)):
    s = f'suspensao_{lado}'
    xw0, xw1 = sorted([sx * 21.5, sx * 32.5])
    for b, zb in enumerate((-36, 0, 36)):
        # truque: suporte, mola voluta e braços
        caixa(s, f'truque_{lado}_{b}', [min(sx * 21, sx * 25), 9, zb - 7], [max(sx * 21, sx * 25), 19, zb + 7], 'od_lama')
        caixa(s, f'mola_{lado}_{b}', [min(sx * 25, sx * 29), 10, zb - 2.5], [max(sx * 25, sx * 29), 16, zb + 2.5], 'mola')
        caixa(s, f'bracos_{lado}_{b}', [min(sx * 25, sx * 30), 6.5, zb - 8], [max(sx * 25, sx * 30), 9, zb + 8], 'od_lama')
        caixa(s, f'suporte_rolete_{lado}_{b}', [min(sx * 21, sx * 26), 19, zb + 2], [max(sx * 21, sx * 26), 21.5, zb + 6], 'od_lama')
        for r, dz in enumerate((-6.5, 6.5)):
            cilindro(f'roda_{lado}_{b}_{r}', f'roda_{lado}_{b}_{r}', (sx * 27, 7.5, zb + dz), 6.4, 9, 'x', 'roda', lados=6)
            cilindro(f'roda_{lado}_{b}_{r}', f'cubo_{lado}_{b}_{r}', (sx * 31.6, 7.5, zb + dz), 1.6, 1, 'x', 'od_esc', lados=2)
        cilindro(f'rolete_{lado}_{b}', f'rolete_{lado}_{b}', (sx * 27, 21.8, zb + 4), 2.2, 8, 'x', 'rolete', lados=2)
    # roda dentada (motriz) na frente e roda-guia atrás
    cilindro(f'roda_motriz_{lado}', f'motriz_{lado}', (sx * 27, 17.5, -61), 8.4, 9.5, 'x', 'dentada', lados=6)
    cilindro(f'roda_motriz_{lado}', f'motriz_cubo_{lado}', (sx * 32, 17.5, -61), 3, 1.4, 'x', 'od_esc', lados=2)
    caixa(s, f'carcaca_motriz_{lado}', [min(sx * 21, sx * 24), 12, -66], [max(sx * 21, sx * 24), 23, -56], 'od_lama')
    cilindro(f'roda_guia_{lado}', f'guia_{lado}', (sx * 27, 11, 60), 6.8, 9, 'x', 'roda', lados=6)
    caixa(s, f'braco_guia_{lado}', [min(sx * 21, sx * 23), 9, 52], [max(sx * 21, sx * 23), 13, 61], 'od_lama')

    # esteira: elos ao longo do contorno (embaixo, roda-guia, em cima, roda dentada)
    pontos = [(0.9, z) for z in range(-54, 55, 3)]
    pontos += [(11 - 10.1 * math.cos(math.radians(a)), 60 + 10.1 * math.sin(math.radians(a))) for a in range(15, 180, 22)]
    pontos += [(22.4 + (24.6 - 22.4) * (54 - z) / 108, z) for z in range(54, -55, -3)]
    pontos += [(17.5 + 8.9 * math.cos(math.radians(a)), -61 - 8.9 * math.sin(math.radians(a))) for a in range(15, 180, 22)]
    for i in range(len(pontos)):
        (y0, z0), (y1, z1) = pontos[i], pontos[(i + 1) % len(pontos)]
        dy, dz = y1 - y0, z1 - z0
        comp = math.hypot(dy, dz)
        ang = math.degrees(math.atan2(-dy, dz))
        girado(s, f'elo_{lado}_{i}', (sx * 27, (y0 + y1) / 2, (z0 + z1) / 2), (11, 1.6, comp + 0.25), (ang, 0, 0), 'esteira')

# =================================================================== pintura
def preencher_od(p, base=OD, forca=6, lama=0.0):
    for yy in range(p.h):
        for xx in range(p.w):
            c = base
            if p.face == 'up':
                c = misturar(base, OD_CLARO, 0.25)
            elif p.face == 'down':
                c = misturar(base, OD_ESC, 0.5)
            elif p.lateral:
                c = misturar(base, OD_ESC, yy / max(1, p.h - 1) * 0.25)
                if lama and yy > p.h * (1 - lama):
                    c = misturar(c, LAMA, min(1, (yy - p.h * (1 - lama)) / (p.h * lama) + 0.2) * 0.85)
            if (xx * 7 + yy * 13) % 97 == 0:
                c = misturar(c, OD_ESC, 0.5)  # manchas e arranhões
            if (xx * 11 + yy * 3) % 131 == 0:
                c = misturar(c, OD_CLARO, 0.6)
            p.px(xx, yy, ruido(c, forca))
    if p.lateral and p.w > 3 and p.h > 3:  # bordas gastas
        for xx in range(p.w):
            p.px(xx, 0, misturar(OD_CLARO, (160, 160, 130), 0.2))


def estrela(p, cx, cy, r, cor=BRANCO, circulo=False):
    pts = []
    for k in range(10):
        ang = math.radians(-90 + k * 36)
        rr = r if k % 2 == 0 else r * 0.38
        pts.append((cx + rr * math.cos(ang), cy + rr * math.sin(ang)))

    def dentro(x, y):
        c = False
        j = len(pts) - 1
        for i in range(len(pts)):
            xi, yi = pts[i]
            xj, yj = pts[j]
            if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi + 1e-9) + xi:
                c = not c
            j = i
        return c
    for yy in range(int(cy - r - 2), int(cy + r + 3)):
        for xx in range(int(cx - r - 2), int(cx + r + 3)):
            d = math.hypot(xx + 0.5 - cx, yy + 0.5 - cy)
            if dentro(xx + 0.5, yy + 0.5) or (circulo and r * 1.08 <= d <= r * 1.22):
                p.px(xx, yy, ruido(cor, 4))


def letras(p, texto, x0, y0, cor=BRANCO):
    fonte = {'U': ['101', '101', '101', '101', '111'], 'S': ['111', '100', '111', '001', '111'],
             'A': ['010', '101', '111', '101', '101'], '3': ['111', '001', '111', '001', '111'],
             '0': ['111', '101', '101', '101', '111'], '8': ['111', '101', '111', '101', '111'],
             '1': ['010', '110', '010', '010', '111'], '2': ['111', '001', '111', '100', '111'],
             '4': ['101', '101', '111', '001', '001'], '6': ['111', '100', '111', '101', '111'], ' ': ['000'] * 5}
    x = x0
    for ch in texto:
        for yy, linha in enumerate(fonte.get(ch, fonte[' '])):
            for xx, b in enumerate(linha):
                if b == '1':
                    p.px(x + xx, y0 + yy, cor)
        x += 4


@m.material('od')
def _(p, c):
    preencher_od(p)


@m.material('od_esc')
def _(p, c):
    preencher_od(p, base=misturar(OD, OD_ESC, 0.45), forca=4)


@m.material('od_lama')
def _(p, c):
    preencher_od(p, lama=0.6)


@m.material('od_escotilha')
def _(p, c):
    preencher_od(p, base=misturar(OD, OD_CLARO, 0.1))
    if p.face == 'up':
        for xx in range(p.w):
            p.px(xx, 0, OD_ESC)
            p.px(xx, p.h - 1, OD_ESC)
        for yy in range(p.h):
            p.px(0, yy, OD_ESC)
            p.px(p.w - 1, yy, OD_ESC)
        p.px(p.w // 2, p.h // 2, (40, 40, 36))  # puxador


@m.material('od_lateral')
def _(p, c):  # casco superior: estrela branca e número de série nas laterais
    preencher_od(p, lama=0.15)
    if p.face in ('east', 'west'):
        estrela(p, p.w * 0.3, p.h * 0.48, p.h * 0.32, circulo=True)
        letras(p, 'USA 3081624', int(p.w * 0.5), int(p.h * 0.4))
    if p.face == 'south':
        letras(p, 'USA 3081624', p.w // 2 - 22, 3)


@m.material('od_torre')
def _(p, c):
    preencher_od(p)
    if p.lateral and c['nome'].endswith('_0') and p.face in ('east', 'west'):
        estrela(p, p.w * 0.5, p.h * 0.5, p.h * 0.42)


@m.material('grade')
def _(p, c):
    for yy in range(p.h):
        for xx in range(p.w):
            fenda = (xx % 3 == 1) if p.face == 'up' else (yy % 2 == 1)
            p.px(xx, yy, (26, 28, 22) if fenda else ruido(OD_ESC, 4))


@m.material('elo')
def _(p, c):
    for yy in range(p.h):
        for xx in range(p.w):
            borda = xx in (0, p.w - 1) or yy % 4 == 0
            p.px(xx, yy, (48, 46, 42) if borda else ruido((70, 66, 58), 6))


@m.material('esteira')
def _(p, c):
    for yy in range(p.h):
        for xx in range(p.w):
            cor = ruido((44, 42, 38), 4)
            if p.face in ('up', 'down'):
                meio = p.w / 2
                chevron = abs(xx + 0.5 - meio) / meio  # garras em "V"
                if (yy + chevron * 2) % 3 < 1.2:
                    cor = (70, 68, 62)
                if xx in (0, p.w - 1) or abs(xx + 0.5 - meio) < 0.7:
                    cor = (96, 92, 84)  # conectores e guias de aço
                if p.face == 'down':
                    cor = misturar(cor, LAMA, 0.35)
            p.px(xx, yy, cor)


def disco(p, raio_frac, pintar_dentro):
    cx, cy = p.w / 2, p.h / 2
    r = min(p.w, p.h) / 2 * raio_frac
    for yy in range(p.h):
        for xx in range(p.w):
            dx, dy = xx + 0.5 - cx, yy + 0.5 - cy
            d = math.hypot(dx, dy)
            pintar_dentro(xx, yy, min(d / r, 0.999), math.atan2(dy, dx))


@m.material('roda')
def _(p, c):
    if p.face in ('east', 'west'):  # roda raiada com pneu de borracha
        def cor(xx, yy, d, ang):
            if d > 0.78:
                return p.px(xx, yy, ruido(BORRACHA, 4))
            if d < 0.22:
                return p.px(xx, yy, ruido(OD_ESC, 4))
            # roda estampada (lisa): anel externo, aba côncava e anel de parafusos no cubo
            base = misturar(OD, LAMA, 0.3)
            if 0.62 < d <= 0.68 or 0.34 < d <= 0.4:
                base = misturar(base, OD_ESC, 0.6)
            elif d < 0.34 and abs(((ang / (2 * math.pi) * 8) % 1) - 0.5) < 0.12 and d > 0.24:
                base = (150, 150, 140)  # parafusos
            p.px(xx, yy, ruido(base, 4))
        disco(p, 1, cor)
    else:
        for yy in range(p.h):
            for xx in range(p.w):
                p.px(xx, yy, ruido(BORRACHA, 3))


@m.material('dentada')
def _(p, c):
    if p.face in ('east', 'west'):
        def cor(xx, yy, d, ang):
            dente = abs(((ang / (2 * math.pi) * 13) % 1) - 0.5) < 0.25
            if d > 0.86 and not dente:
                return p.px(xx, yy, (40, 40, 34))
            if d < 0.3:
                return p.px(xx, yy, OD_ESC)
            furo = 0.5 < d < 0.66 and abs(((ang / (2 * math.pi) * 6) % 1) - 0.5) < 0.18
            p.px(xx, yy, (30, 30, 26) if furo else ruido(misturar(OD, ACO, 0.3), 4))
        disco(p, 1, cor)
    else:
        for yy in range(p.h):
            for xx in range(p.w):
                p.px(xx, yy, ruido(misturar(ACO, OD, 0.3) if yy % 3 else (40, 40, 36), 4))


@m.material('rolete')
def _(p, c):
    if p.face in ('east', 'west'):
        disco(p, 1, lambda xx, yy, d, a: p.px(xx, yy, ruido(BORRACHA if d > 0.7 else OD_ESC, 3)))
    else:
        p.preencher(BORRACHA, forca=3)


@m.material('mola')
def _(p, c):
    for yy in range(p.h):
        for xx in range(p.w):
            p.px(xx, yy, (40, 42, 32) if yy % 2 else ruido(misturar(OD, ACO, 0.4), 4))


@m.material('aco', 'camisa', 'preto', 'ferro')
def _(p, c):
    base = {'aco': ACO, 'camisa': (52, 52, 50), 'preto': (12, 12, 12), 'ferro': (96, 98, 100)}[c['mat']]
    p.preencher(base, misturar(base, (255, 255, 255), 0.18), misturar(base, (0, 0, 0), 0.3), forca=3)
    if c['mat'] == 'camisa' and p.lateral:  # furos de refrigeração da camisa da .50
        for yy in range(1, p.h - 1, 2):
            for xx in range(1, p.w - 1, 3):
                p.px(xx, yy, (20, 20, 20))


@m.material('madeira')
def _(p, c):
    p.preencher((140, 100, 60), forca=4)


@m.material('cabo')
def _(p, c):
    for yy in range(p.h):
        for xx in range(p.w):
            p.px(xx, yy, (70, 66, 58) if (xx + yy) % 3 else (40, 38, 34))


@m.material('municao')
def _(p, c):
    preencher_od(p, base=(70, 76, 48), forca=3)
    if p.face == 'north':
        letras(p, '50', 1, 1, cor=(230, 210, 80))


@m.material('periscopio')
def _(p, c):
    p.preencher(misturar(OD, OD_ESC, 0.4), forca=3)
    if p.face == 'north':
        for yy in range(1, p.h - 1):
            for xx in range(1, p.w - 1):
                p.px(xx, yy, (80, 110, 130) if yy > 1 else (150, 190, 210))  # vidro


@m.material('farol', 'lanterna')
def _(p, c):
    p.preencher(OD_ESC, forca=3)
    if p.face in ('north', 'south'):
        cor = (240, 236, 200) if c['mat'] == 'farol' else (180, 30, 26)
        disco(p, 0.95, lambda xx, yy, d, a: p.px(xx, yy, cor if d < 0.7 else OD_ESC))


# =================================================================== animações
rodas = [o[0] for o in m.ossos if o[0].startswith(('roda_', 'rolete_'))]
giro = {r: {'rotation': [(0, [0, 0, 0], 'linear'), (2, [-360, 0, 0], 'linear')]} for r in rodas}
m.animacoes = {
    'andar': dict(loop='loop', length=2.0, bones={
        **giro,
        'casco': {'rotation': [(0, [0, 0, 0]), (0.5, [0.6, 0, 0.3]), (1, [0, 0, 0]), (1.5, [-0.5, 0, -0.3]), (2, [0, 0, 0])],
                  'position': [(0, [0, 0, 0]), (0.5, [0, 0.3, 0]), (1, [0, 0, 0]), (1.5, [0, 0.2, 0]), (2, [0, 0, 0])]},
        'antena': {},
    }),
    'girar_torre': dict(loop='loop', length=8.0, bones={
        'torre': {'rotation': [(0, [0, 0, 0]), (2, [0, 45, 0]), (4, [0, 0, 0]), (6, [0, -45, 0]), (8, [0, 0, 0])]},
        'canhao': {'rotation': [(0, [0, 0, 0]), (2, [6, 0, 0]), (4, [0, 0, 0]), (6, [-3, 0, 0]), (8, [0, 0, 0])]},
        'metralhadora_50': {'rotation': [(0, [0, 0, 0]), (3, [0, -30, 0]), (5, [0, 30, 0]), (8, [0, 0, 0])]},
    }),
    'atirar': dict(loop='once', length=1.2, bones={
        'canhao': {'position': [(0, [0, 0, 0]), (0.05, [0, 0, 7]), (0.6, [0, 0, 0])],
                   'rotation': [(0, [0, 0, 0]), (0.05, [3, 0, 0]), (0.6, [0, 0, 0])]},
        'casco': {'rotation': [(0, [0, 0, 0]), (0.08, [-1.2, 0, 0]), (0.5, [0.4, 0, 0]), (0.9, [0, 0, 0])]},
    }),
}
del m.animacoes['andar']['bones']['antena']


def main():
    os.makedirs(SAIDA, exist_ok=True)
    png = m.montar_textura()
    with open(os.path.join(SAIDA, 'sherman.bbmodel'), 'w', encoding='utf-8') as f:
        json.dump(m.bbmodel(), f, ensure_ascii=False)
    with open(os.path.join(SAIDA, 'sherman.png'), 'wb') as f:
        f.write(png)
    print('sherman:', len(m.cubos), 'cubos,', len(m.ossos), 'ossos')


if __name__ == '__main__':
    main()
