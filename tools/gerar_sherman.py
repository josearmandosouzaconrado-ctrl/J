#!/usr/bin/env python3
"""Tanque M4A3(75)W Sherman, modelo detalhado para o Blockbench e para o add-on.

Medidas reais (M4A3(75)W): altura sobre a cúpula 2,94 m; largura 2,62 m (2,67 m com as saias);
comprimento do casco ~5,9 m; distância entre o centro das esteiras 2,11 m; vão livre 0,43 m;
eixo do canhão a 2,24 m do chão; anel da torre com 1,75 m.

Tudo é descrito em METROS e convertido para a escala do Minecraft (1 bloco = 1 m = 16 unidades).
Frente em -Z, direita do tanque em +X. Superfícies curvas (torre fundida, nariz da transmissão) são
feitas com muitas placas inclinadas; rodas com cilindros de 24 lados.

Saída em minecraft/tanque_sherman/: sherman.bbmodel e sherman.png (usados também pelo add-on).
"""
import json
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mc_lib import Modelo, misturar, ruido  # noqa: E402

SAIDA = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'minecraft', 'tanque_sherman')
K = 16  # unidades por metro
DS = 4  # pixels de textura por unidade

OD, OD_CLARO, OD_ESC = (84, 88, 56), (112, 116, 76), (54, 58, 36)   # verde-oliva
LAMA = (112, 94, 68)
ACO = (66, 66, 62)
BORRACHA = (32, 32, 30)
BRANCO = (238, 236, 226)


def construir():
    m = Modelo('sherman', tex=2048, semente=1944)

    def M(v):
        return [round(x * K, 4) for x in v]

    def caixa(o, nome, de, ate, mat, sem=(), ds=DS):
        m.cubo(o, nome, M(de), M(ate), mat, sem=sem, ds=ds)

    def placa(o, nome, centro, tam, rot, mat, sem=(), ds=DS):
        m.cubo_girado(o, nome, M(centro), M(tam), rot, mat, sem=sem, ds=ds)

    def cilindro(o, nome, centro, raio, comp, eixo, mat, lados=3, ds=DS):
        for k in range(lados):
            a = 90 / lados * k
            tam = {'x': (comp, 2 * raio, 2 * raio), 'y': (2 * raio, comp, 2 * raio), 'z': (2 * raio, 2 * raio, comp)}[eixo]
            rot = {'x': (a, 0, 0), 'y': (0, a, 0), 'z': (0, 0, a)}[eixo]
            placa(o, f'{nome}_{k}', centro, tam, rot, mat, ds=ds)

    def entre(o, nome, p0, p1, largura, espessura, mat, x=0.0, ds=DS):
        """Placa plana ligando dois pontos (y, z) no plano lateral, centrada em x."""
        (y0, z0), (y1, z1) = p0, p1
        comp = math.hypot(y1 - y0, z1 - z0)
        ang = math.degrees(math.atan2(-(y1 - y0), z1 - z0))
        placa(o, nome, (x, (y0 + y1) / 2, (z0 + z1) / 2), (largura, espessura, comp), (ang, 0, 0), mat, ds=ds)

    # ------------------------------------------------------------------ ossos
    o = m.osso
    o('tanque', None, [0, 0, 0])
    o('casco', 'tanque', [0, 0, 0])
    ZT = -0.55  # centro do anel da torre
    o('torre', 'casco', M([0, 1.88, ZT]))
    o('canhao', 'torre', M([0, 2.24, ZT - 0.86]))
    o('metralhadora_50', 'torre', M([-0.05, 2.78, ZT + 0.62]))
    BOGIES = (-1.5, 0.0, 1.5)
    for lado, sx in (('dir', 1), ('esq', -1)):
        o(f'suspensao_{lado}', 'casco', M([1.055 * sx, 0.4, 0]))
        o(f'motriz_{lado}', f'suspensao_{lado}', M([1.055 * sx, 0.78, -2.45]))
        o(f'guia_{lado}', f'suspensao_{lado}', M([1.055 * sx, 0.45, 2.55]))
        for b, zb in enumerate(BOGIES):
            for r, dz in enumerate((-0.265, 0.265)):
                o(f'roda_{lado}_{b}_{r}', f'suspensao_{lado}', M([1.055 * sx, 0.27, zb + dz]))
            o(f'rolete_{lado}_{b}', f'suspensao_{lado}', M([1.055 * sx, 0.9, zb + 0.24]))

    # ------------------------------------------------------------------ casco inferior e nariz da transmissão
    caixa('casco', 'casco_baixo', [-0.84, 0.43, -2.55], [0.84, 1.06, 2.85], 'od_lama')
    # nariz arredondado (fundido em uma peça): placas em volta de uma curva
    perfil = [(1.22, -2.56), (1.12, -2.75), (0.98, -2.88), (0.82, -2.95), (0.66, -2.93), (0.53, -2.84), (0.44, -2.66), (0.43, -2.5)]
    for i in range(len(perfil) - 1):
        entre('casco', f'nariz_{i}', perfil[i], perfil[i + 1], 1.66, 0.06, 'od_lama' if i > 3 else 'od')
    caixa('casco', 'nariz_miolo', [-0.82, 0.5, -2.78], [0.82, 1.15, -2.5], 'od_lama')
    for i in range(len(perfil) - 1):  # tampas laterais do nariz seguindo a curva
        (ya, za), (yb, zb) = perfil[i], perfil[i + 1]
        for sx in (1, -1):
            x0, x1 = sorted([sx * 0.79, sx * 0.83])
            caixa('casco', f'nariz_lado_{i}_{sx}', [x0, min(ya, yb), max(za, zb) - 0.01], [x1, max(ya, yb), -2.5], 'od_lama')
    for sx in (1, -1):
        # ganchos de reboque e argolas
        caixa('casco', f'gancho_{sx}', [sx * 0.52 - 0.06, 0.6, -3.02], [sx * 0.52 + 0.06, 0.74, -2.9], 'aco')
    caixa('casco', 'nariz_flange', [-0.84, 0.97, -2.9], [0.84, 1.0, -2.86], 'od_esc')
    # ------------------------------------------------------------------ casco superior com sponsons e placa frontal 47°
    caixa('casco', 'casco_cima', [-1.25, 1.06, -1.82], [1.25, 1.88, 2.85], 'od_lateral')
    entre('casco', 'glacis', (1.88, -1.82), (1.2, -2.56), 2.5, 0.08, 'od')
    for k in range(8):  # lateral em degraus sob a placa frontal (o perfil inclinado visto de lado)
        y0 = 1.06 + k * 0.1025
        zf = -2.56 + (y0 + 0.1025 - 1.2) / 0.68 * 0.74
        caixa('casco', f'glacis_degrau_{k}', [-1.25, y0, max(zf, -2.56) + 0.02], [1.25, y0 + 0.1025, -1.82], 'od')
    for sx in (1, -1):
        caixa('casco', f'sponson_frente_{sx}', [min(sx * 0.84, sx * 1.25), 1.06, -2.05], [max(sx * 0.84, sx * 1.25), 1.2, -1.82], 'od')
    # elos de esteira reserva na placa frontal
    for i in range(6):
        entre('casco', f'elo_reserva_{i}', (1.62, -2.06), (1.34, -2.36), 0.15, 0.05, 'elo', x=-0.55 + i * 0.22)
    # metralhadora .30 em bola (lado direito) e faróis com grade
    cilindro('casco', 'bola_mg', (0.42, 1.52, -2.24), 0.1, 0.12, 'z', 'od_esc', lados=3)
    cilindro('casco', 'cano_mg', (0.42, 1.52, -2.48), 0.025, 0.4, 'z', 'aco', lados=2)
    for sx in (1, -1):
        cilindro('casco', f'farol_{sx}', (sx * 1.0, 1.72, -2.0), 0.08, 0.1, 'z', 'farol', lados=3)
        for k, dx in enumerate((-0.09, 0, 0.09)):
            caixa('casco', f'grade_farol_{sx}_{k}', [sx * 1.0 + dx - 0.012, 1.6, -2.12], [sx * 1.0 + dx + 0.012, 1.86, -2.1], 'aco')
        caixa('casco', f'olhal_{sx}', [sx * 1.05 - 0.04, 1.88, -1.7], [sx * 1.05 + 0.04, 1.98, -1.58], 'od_esc')
        caixa('casco', f'olhal_tras_{sx}', [sx * 1.05 - 0.04, 1.88, 2.6], [sx * 1.05 + 0.04, 1.98, 2.72], 'od_esc')
    cilindro('casco', 'sirene', (-0.95, 1.92, -1.68), 0.06, 0.12, 'z', 'od_esc', lados=2)
    # escotilhas grandes do motorista e do auxiliar (casco de escotilha grande), periscópios
    for sx, nome in ((-1, 'motorista'), (1, 'auxiliar')):
        caixa('casco', f'escotilha_{nome}', [sx * 0.5 - 0.27, 1.88, -1.78], [sx * 0.5 + 0.27, 1.92, -1.3], 'escotilha')
        caixa('casco', f'periscopio_{nome}', [sx * 0.5 - 0.07, 1.92, -1.72], [sx * 0.5 + 0.07, 2.0, -1.62], 'periscopio')
        caixa('casco', f'dobradica_{nome}', [sx * 0.5 - 0.29, 1.88, -1.3], [sx * 0.5 + 0.29, 1.95, -1.25], 'od_esc')
    cilindro('casco', 'ventilador', (0, 1.9, -1.55), 0.09, 0.06, 'y', 'od_esc', lados=3)
    # deque do motor: tampas, grade, tampas de combustível, ferramentas e cabo de reboque
    for i, z0 in enumerate((0.55, 1.15)):
        caixa('casco', f'tampa_motor_{i}', [-0.75, 1.88, z0], [0.75, 1.91, z0 + 0.5], 'escotilha')
    caixa('casco', 'grade_motor', [-0.75, 1.88, 1.8], [0.75, 1.91, 2.75], 'grade')
    for sx in (1, -1):
        cilindro('casco', f'combustivel_{sx}', (sx * 0.95, 1.9, 0.3), 0.07, 0.04, 'y', 'od_esc', lados=2)
    caixa('casco', 'pa_cabo', [-1.2, 1.88, 0.5], [-1.15, 1.93, 1.5], 'madeira')
    caixa('casco', 'pa_lamina', [-1.24, 1.88, 1.5], [-1.1, 1.92, 1.78], 'ferro')
    caixa('casco', 'machado_cabo', [-1.2, 1.88, 1.9], [-1.15, 1.93, 2.6], 'madeira')
    caixa('casco', 'machado_lamina', [-1.25, 1.88, 1.86], [-1.1, 1.93, 1.98], 'ferro')
    caixa('casco', 'marreta_cabo', [1.15, 1.88, 0.5], [1.2, 1.93, 1.5], 'madeira')
    caixa('casco', 'marreta_cabeca', [1.1, 1.88, 1.5], [1.25, 1.97, 1.62], 'ferro')
    caixa('casco', 'picareta_cabo', [1.15, 1.88, 1.8], [1.2, 1.93, 2.55], 'madeira')
    caixa('casco', 'picareta_ferro', [1.06, 1.88, 2.5], [1.29, 1.93, 2.56], 'ferro')
    caixa('casco', 'cabo_reboque', [-0.95, 1.88, 2.78], [0.95, 1.94, 2.85], 'cabo')
    # traseira: placa, defletor de escapamento, lanternas, ganchos e telefone da infantaria
    caixa('casco', 'traseira', [-1.25, 0.6, 2.85], [1.25, 1.88, 2.9], 'od_lama')
    entre('casco', 'defletor', (1.8, 2.9), (1.55, 3.06), 2.0, 0.05, 'od_esc')
    for sx in (1, -1):
        caixa('casco', f'lanterna_{sx}', [sx * 1.05 - 0.07, 1.62, 2.9], [sx * 1.05 + 0.07, 1.74, 2.94], 'lanterna')
        caixa('casco', f'gancho_tras_{sx}', [sx * 0.6 - 0.07, 0.62, 2.9], [sx * 0.6 + 0.07, 0.8, 3.04], 'aco')
    caixa('casco', 'telefone', [0.82, 1.2, 2.9], [1.02, 1.42, 2.97], 'od_esc')
    # saias de areia e para-lamas
    for sx in (1, -1):
        x0, x1 = sorted([sx * 1.29, sx * 1.335])
        for i, z0 in enumerate((-2.25, -1.25, -0.25, 0.75, 1.75)):
            caixa('casco', f'saia_{sx}_{i}', [x0, 0.93, z0], [x1, 1.1, z0 + 0.98], 'od')
        a0, a1 = sorted([sx * 0.84, sx * 1.335])
        entre('casco', f'paralama_{sx}', (1.1, -2.32), (1.02, -2.72), abs(a1 - a0), 0.03, 'od', x=(a0 + a1) / 2)

    # ------------------------------------------------------------------ torre fundida (cúpula de placas inclinadas)
    def raio(phi):  # frente um pouco mais estreita, traseira (bustle) mais saliente
        return 0.9 - 0.06 * math.cos(phi) + 0.02 * math.cos(2 * phi)
    faixas = ((1.88, 2.1, 1.0, 0.995), (2.1, 2.34, 0.995, 0.965), (2.34, 2.54, 0.965, 0.89), (2.54, 2.68, 0.89, 0.77), (2.68, 2.74, 0.77, 0.68))
    N = 24
    for f, (y0, y1, a0, a1) in enumerate(faixas):
        for k in range(N):
            phi = 2 * math.pi * k / N
            r0, r1 = raio(phi) * a0, raio(phi) * a1
            inc = math.degrees(math.atan2(r0 - r1, y1 - y0))
            rm = (r0 + r1) / 2
            largura = 2 * rm * math.tan(math.pi / N) * 1.12
            altura = math.hypot(y1 - y0, r0 - r1) * 1.04
            centro = (-rm * math.sin(phi), (y0 + y1) / 2, ZT - rm * math.cos(phi))
            mat = 'torre'
            if f == 1 and k in (N // 4, 3 * N // 4):
                mat = 'torre_estrela'
            placa('torre', f'torre_{f}_{k}', centro, (largura, altura, 0.07), (inc, math.degrees(phi), 0), mat)
    for k in range(3):  # teto e miolo
        a = 30 * k
        placa('torre', f'teto_{k}', (0, 2.72, ZT + 0.03), (0.86, 0.04, 0.86), (0, a, 0), 'torre')
        placa('torre', f'miolo_{k}', (0, 2.3, ZT + 0.02), (1.15, 0.78, 1.15), (0, a, 0), 'torre')
    caixa('torre', 'anel', [-0.95, 1.86, ZT - 0.95], [0.95, 1.9, ZT + 0.95], 'od_esc')
    # escudo do rotor ("orelhas") e mantlet M34A1 de face inteira com bordas arredondadas
    caixa('torre', 'rotor', [-0.42, 2.0, ZT - 0.92], [0.42, 2.5, ZT - 0.82], 'od_esc')
    caixa('canhao', 'mantlet', [-0.36, 2.04, ZT - 1.04], [0.36, 2.44, ZT - 0.9], 'od')
    entre('canhao', 'mantlet_cima', (2.44, ZT - 0.9), (2.5, ZT - 0.98), 0.72, 0.05, 'od')
    entre('canhao', 'mantlet_baixo', (2.04, ZT - 0.9), (1.98, ZT - 0.98), 0.72, 0.05, 'od')
    for sx in (1, -1):
        placa('canhao', f'mantlet_canto_{sx}', (sx * 0.37, 2.24, ZT - 0.97), (0.06, 0.4, 0.1), (0, sx * 30, 0), 'od')
    # canhão M3 de 75 mm
    cilindro('canhao', 'luva', (0, 2.24, ZT - 1.16), 0.085, 0.26, 'z', 'od', lados=3)
    cilindro('canhao', 'tubo', (0, 2.24, ZT - 2.05), 0.06, 1.6, 'z', 'od', lados=3)
    cilindro('canhao', 'boca', (0, 2.24, ZT - 2.85), 0.072, 0.12, 'z', 'od_esc', lados=3)
    cilindro('canhao', 'furo', (0, 2.24, ZT - 2.915), 0.04, 0.01, 'z', 'preto', lados=2)
    cilindro('canhao', 'coaxial', (0.22, 2.2, ZT - 1.16), 0.02, 0.3, 'z', 'aco', lados=2)
    caixa('canhao', 'mira', [-0.3, 2.42, ZT - 1.05], [-0.22, 2.5, ZT - 1.0], 'periscopio')
    # cúpula de visão do comandante (direita, atrás), escotilha oval do carregador, periscópios
    CX, CZ = 0.34, ZT + 0.28
    cilindro('torre', 'cupula', (CX, 2.79, CZ), 0.24, 0.14, 'y', 'od_esc', lados=4)
    cilindro('torre', 'cupula_tampa', (CX, 2.88, CZ), 0.2, 0.05, 'y', 'escotilha', lados=4)
    for k in range(6):  # blocos de visão em volta
        a = 2 * math.pi * k / 6
        placa('torre', f'visao_{k}', (CX - 0.235 * math.sin(a), 2.79, CZ - 0.235 * math.cos(a)), (0.08, 0.06, 0.02),
              (0, math.degrees(a), 0), 'vidro')
    caixa('torre', 'periscopio_cmd', [CX - 0.04, 2.9, CZ - 0.05], [CX + 0.04, 2.94, CZ + 0.05], 'periscopio')
    cilindro('torre', 'escotilha_carregador', (-0.34, 2.75, ZT + 0.05), 0.2, 0.03, 'y', 'escotilha', lados=3)
    caixa('torre', 'periscopio_carregador', [-0.44, 2.74, ZT - 0.3], [-0.32, 2.82, ZT - 0.22], 'periscopio')
    cilindro('torre', 'domo_ventilacao', (0.0, 2.76, ZT - 0.42), 0.08, 0.06, 'y', 'od_esc', lados=2)
    placa('torre', 'porta_pistola', (-0.86, 2.24, ZT + 0.05), (0.04, 0.16, 0.16), (0, 0, -8), 'od_esc')
    for sx, zz in ((1, ZT - 0.2), (-1, ZT - 0.2), (0, ZT + 0.7)):
        caixa('torre', f'olhal_torre_{sx}_{zz:.1f}', [sx * 0.45 - 0.03, 2.72, zz - 0.03], [sx * 0.45 + 0.03, 2.8, zz + 0.03], 'od_esc')
    caixa('torre', 'antena_base', [-0.6, 2.5, ZT + 0.62], [-0.5, 2.64, ZT + 0.72], 'od_esc')
    caixa('torre', 'antena', [-0.56, 2.64, ZT + 0.66], [-0.54, 4.6, ZT + 0.68], 'aco')
    # metralhadora .50 M2 no teto, com caixa de munição
    caixa('metralhadora_50', 'suporte', [-0.07, 2.72, ZT + 0.58], [-0.03, 2.86, ZT + 0.66], 'aco')
    caixa('metralhadora_50', 'corpo_50', [-0.1, 2.86, ZT + 0.35], [0.0, 2.96, ZT + 0.75], 'aco')
    cilindro('metralhadora_50', 'camisa_50', (-0.05, 2.92, ZT + 0.05), 0.035, 0.6, 'z', 'camisa', lados=2)
    cilindro('metralhadora_50', 'cano_50', (-0.05, 2.92, ZT - 0.45), 0.018, 0.4, 'z', 'aco', lados=2)
    caixa('metralhadora_50', 'municao', [0.0, 2.82, ZT + 0.45], [0.12, 2.94, ZT + 0.62], 'municao')

    # ------------------------------------------------------------------ suspensão VVSS e esteiras
    for lado, sx in (('dir', 1), ('esq', -1)):
        s = f'suspensao_{lado}'
        xc = 1.055 * sx
        xin = sorted([sx * 0.84, sx * 0.96])
        for b, zb in enumerate(BOGIES):
            caixa(s, f'suporte_{lado}_{b}', [xin[0], 0.36, zb - 0.22], [xin[1], 0.84, zb + 0.22], 'od_lama')
            for k, dz in enumerate((-0.07, 0.07)):  # molas volutas verticais
                cilindro(s, f'mola_{lado}_{b}_{k}', (xc - sx * 0.02, 0.6, zb + dz), 0.065, 0.3, 'y', 'mola', lados=2)
            caixa(s, f'cabeca_{lado}_{b}', [min(xc - 0.17, xc + 0.17), 0.76, zb - 0.2], [max(xc - 0.17, xc + 0.17), 0.84, zb + 0.2], 'od_lama')
            for k, dz in enumerate((-0.265, 0.265)):  # braços até as rodas
                entre(s, f'braco_{lado}_{b}_{k}', (0.5, zb + dz * 0.3), (0.3, zb + dz), 0.06, 0.07, 'od_lama', x=xc - sx * 0.14)
            entre(s, f'apoio_rolete_{lado}_{b}', (0.82, zb + 0.05), (0.9, zb + 0.24), 0.08, 0.06, 'od_lama', x=xc - sx * 0.1)
            for r, dz in enumerate((-0.265, 0.265)):
                cilindro(f'roda_{lado}_{b}_{r}', f'roda_{lado}_{b}_{r}', (xc, 0.27, zb + dz), 0.254, 0.34, 'x', 'roda', lados=6)
                cilindro(f'roda_{lado}_{b}_{r}', f'cubo_{lado}_{b}_{r}', (xc + sx * 0.18, 0.27, zb + dz), 0.07, 0.03, 'x', 'od_esc', lados=2)
            cilindro(f'rolete_{lado}_{b}', f'rolete_{lado}_{b}', (xc, 0.9, zb + 0.24), 0.1, 0.32, 'x', 'rolete', lados=3)
        cilindro(f'motriz_{lado}', f'motriz_{lado}', (xc, 0.78, -2.45), 0.33, 0.38, 'x', 'dentada', lados=6)
        cilindro(f'motriz_{lado}', f'motriz_cubo_{lado}', (xc + sx * 0.2, 0.78, -2.45), 0.12, 0.04, 'x', 'od_esc', lados=3)
        caixa(s, f'carcaca_motriz_{lado}', [xin[0], 0.55, -2.65], [xin[1], 1.0, -2.25], 'od_lama')
        cilindro(f'guia_{lado}', f'guia_{lado}', (xc, 0.45, 2.55), 0.28, 0.34, 'x', 'roda', lados=6)
        caixa(s, f'braco_guia_{lado}', [xin[0], 0.36, 2.25], [xin[1], 0.56, 2.6], 'od_lama')

        # esteira T48 (borracha com garras em "V"): elos ao longo do contorno
        pontos = [(0.03, z / 100) for z in range(-226, 236, 12)]
        pontos += [(0.45 - 0.42 * math.cos(math.radians(a)), 2.55 + 0.42 * math.sin(math.radians(a))) for a in range(20, 180, 20)]
        pontos += [(0.87 + (1.08 - 0.87) * (2.55 - z / 100) / 4.95, z / 100) for z in range(255, -241, -12)]
        pontos += [(0.78 + 0.33 * math.cos(math.radians(a)), -2.45 - 0.33 * math.sin(math.radians(a))) for a in range(20, 180, 22)]
        pontos += [(0.03 + (0.45 - 0.03) * (1 - t / 4), -2.62 + 0.36 * t / 4) for t in range(4)]
        for i in range(len(pontos)):
            p0, p1 = pontos[i], pontos[(i + 1) % len(pontos)]
            comp = math.hypot(p1[0] - p0[0], p1[1] - p0[1])
            if comp < 0.01:
                continue
            entre(s, f'elo_{lado}_{i}', p0, p1, 0.42, 0.07, 'esteira', x=xc, ds=2)

    pintar(m)
    animar(m)
    return m


# =================================================================== pintura
def od(p, base=OD, forca=4, lama=0.0):
    for yy in range(p.h):
        for xx in range(p.w):
            c = base
            if p.face == 'up':
                c = misturar(base, OD_CLARO, 0.22)
            elif p.face == 'down':
                c = misturar(base, OD_ESC, 0.45)
            elif p.lateral:
                c = misturar(base, OD_ESC, yy / max(1, p.h - 1) * 0.18)
                if lama and yy > p.h * (1 - lama):
                    c = misturar(c, LAMA, min(1, (yy - p.h * (1 - lama)) / max(1, p.h * lama) + 0.15) * 0.8)
            if (xx * 7 + yy * 13) % 151 == 0:
                c = misturar(c, OD_ESC, 0.45)
            if (xx * 11 + yy * 5) % 173 == 0:
                c = misturar(c, OD_CLARO, 0.5)
            p.px(xx, yy, ruido(c, forca))


def estrela(p, cx, cy, r, circulo=False, cor=BRANCO):
    pts = [(cx + (r if k % 2 == 0 else r * 0.38) * math.cos(math.radians(-90 + k * 36)),
            cy + (r if k % 2 == 0 else r * 0.38) * math.sin(math.radians(-90 + k * 36))) for k in range(10)]

    def dentro(x, y):
        c, j = False, len(pts) - 1
        for i in range(len(pts)):
            (xi, yi), (xj, yj) = pts[i], pts[j]
            if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi + 1e-9) + xi:
                c = not c
            j = i
        return c
    for yy in range(int(cy - r * 1.3), int(cy + r * 1.3) + 1):
        for xx in range(int(cx - r * 1.3), int(cx + r * 1.3) + 1):
            d = math.hypot(xx + 0.5 - cx, yy + 0.5 - cy)
            if dentro(xx + 0.5, yy + 0.5) or (circulo and r * 1.08 <= d <= r * 1.2):
                p.px(xx, yy, ruido(cor, 3))


FONTE = {'U': ['101', '101', '101', '101', '111'], 'S': ['111', '100', '111', '001', '111'],
         'A': ['010', '101', '111', '101', '101'], '0': ['111', '101', '101', '101', '111'],
         '1': ['010', '110', '010', '010', '111'], '2': ['111', '001', '111', '100', '111'],
         '3': ['111', '001', '111', '001', '111'], '4': ['101', '101', '111', '001', '001'],
         '6': ['111', '100', '111', '101', '111'], '8': ['111', '101', '111', '101', '111'], ' ': ['000'] * 5}


def letras(p, texto, x0, y0, esc=1, cor=BRANCO):
    x = x0
    for ch in texto:
        for yy, linha in enumerate(FONTE.get(ch, FONTE[' '])):
            for xx, b in enumerate(linha):
                if b == '1':
                    for a in range(esc):
                        for c in range(esc):
                            p.px(x + xx * esc + a, y0 + yy * esc + c, cor)
        x += 4 * esc


def disco(p, f):
    cx, cy = p.w / 2, p.h / 2
    r = min(p.w, p.h) / 2
    for yy in range(p.h):
        for xx in range(p.w):
            dx, dy = xx + 0.5 - cx, yy + 0.5 - cy
            f(xx, yy, min(math.hypot(dx, dy) / r, 0.999), math.atan2(dy, dx))


def pintar(m):
    mat = m.material

    @mat('od')
    def _(p, c):
        od(p)

    @mat('od_esc')
    def _(p, c):
        od(p, base=misturar(OD, OD_ESC, 0.45), forca=3)

    @mat('od_lama')
    def _(p, c):
        od(p, lama=0.65)

    @mat('torre')
    def _(p, c):
        od(p, base=misturar(OD, OD_CLARO, 0.06), forca=3)

    @mat('torre_estrela')
    def _(p, c):
        od(p, base=misturar(OD, OD_CLARO, 0.06), forca=3)
        if p.face in ('north', 'south'):
            estrela(p, p.w / 2, p.h / 2, min(p.w, p.h) * 0.45)

    @mat('od_lateral')
    def _(p, c):  # laterais dos sponsons: estrela no círculo e número de série
        od(p, lama=0.12)
        if p.face in ('east', 'west'):
            estrela(p, p.w * 0.3, p.h * 0.48, p.h * 0.3, circulo=True)
            letras(p, 'USA 3081624', int(p.w * 0.52), int(p.h * 0.42), esc=2)
        if p.face == 'south':
            letras(p, 'USA 3081624', p.w // 2 - 44, 8, esc=2)

    @mat('escotilha')
    def _(p, c):
        od(p, base=misturar(OD, OD_CLARO, 0.1), forca=3)
        if p.face == 'up':
            for xx in range(p.w):
                p.px(xx, 0, OD_ESC)
                p.px(xx, p.h - 1, OD_ESC)
            for yy in range(p.h):
                p.px(0, yy, OD_ESC)
                p.px(p.w - 1, yy, OD_ESC)

    @mat('grade')
    def _(p, c):
        for yy in range(p.h):
            for xx in range(p.w):
                fenda = (xx % 4 in (1, 2)) if p.face == 'up' else yy % 3 == 1
                p.px(xx, yy, (24, 26, 20) if fenda else ruido(OD_ESC, 3))

    @mat('elo')
    def _(p, c):
        for yy in range(p.h):
            for xx in range(p.w):
                p.px(xx, yy, (46, 44, 40) if xx in (0, p.w - 1) or yy % 5 == 0 else ruido((70, 66, 58), 5))

    @mat('esteira')
    def _(p, c):
        for yy in range(p.h):
            for xx in range(p.w):
                cor = ruido((44, 42, 38), 3)
                if p.face in ('up', 'down'):
                    meio = p.w / 2
                    if abs(xx + 0.5 - meio) / meio < 0.85 and (yy + abs(xx + 0.5 - meio) * 0.5) % 3 < 1:
                        cor = (68, 66, 60)  # garras em "V"
                    if xx in (0, 1, p.w - 2, p.w - 1) or abs(xx + 0.5 - meio) < 0.8:
                        cor = (96, 92, 84)  # conectores de aço
                    if p.face == 'down':
                        cor = misturar(cor, LAMA, 0.35)
                p.px(xx, yy, cor)

    @mat('roda')
    def _(p, c):
        if p.face in ('east', 'west'):  # roda estampada com pneu de borracha
            def cor(xx, yy, d, a):
                if d > 0.82:
                    return p.px(xx, yy, ruido(BORRACHA, 3))
                base = misturar(OD, LAMA, 0.3)
                if 0.72 < d <= 0.82 or 0.36 < d <= 0.44:
                    base = misturar(base, OD_ESC, 0.55)
                elif 0.2 < d < 0.34 and abs(((a / (2 * math.pi) * 8) % 1) - 0.5) < 0.14:
                    base = (150, 150, 140)  # porcas do cubo
                p.px(xx, yy, ruido(base, 3))
            disco(p, cor)
        else:
            p.preencher(BORRACHA, forca=3)

    @mat('dentada')
    def _(p, c):
        if p.face in ('east', 'west'):
            def cor(xx, yy, d, a):
                dente = abs(((a / (2 * math.pi) * 13) % 1) - 0.5) < 0.24
                if d > 0.86:
                    return p.px(xx, yy, ruido(misturar(ACO, OD, 0.3), 3) if dente else (38, 38, 32))
                furo = 0.5 < d < 0.66 and abs(((a / (2 * math.pi) * 6) % 1) - 0.5) < 0.15
                p.px(xx, yy, (28, 28, 24) if furo else ruido(misturar(OD, LAMA, 0.25), 3))
            disco(p, cor)
        else:
            for yy in range(p.h):
                for xx in range(p.w):
                    p.px(xx, yy, ruido(misturar(ACO, OD, 0.3), 3) if yy % 4 else (38, 38, 32))

    @mat('rolete')
    def _(p, c):
        if p.face in ('east', 'west'):
            disco(p, lambda xx, yy, d, a: p.px(xx, yy, ruido(BORRACHA if d > 0.7 else OD_ESC, 3)))
        else:
            p.preencher(BORRACHA, forca=3)

    @mat('mola')
    def _(p, c):
        for yy in range(p.h):
            for xx in range(p.w):
                p.px(xx, yy, (40, 42, 32) if yy % 3 == 0 else ruido(misturar(OD, ACO, 0.4), 3))

    @mat('aco', 'camisa', 'preto', 'ferro')
    def _(p, c):
        base = {'aco': ACO, 'camisa': (52, 52, 50), 'preto': (10, 10, 10), 'ferro': (96, 98, 100)}[c['mat']]
        p.preencher(base, misturar(base, (255, 255, 255), 0.18), misturar(base, (0, 0, 0), 0.3), forca=3)
        if c['mat'] == 'camisa' and p.lateral:
            for yy in range(1, p.h - 1, 2):
                for xx in range(1, p.w - 1, 3):
                    p.px(xx, yy, (18, 18, 18))

    @mat('madeira')
    def _(p, c):
        p.preencher((140, 100, 60), forca=4)

    @mat('cabo')
    def _(p, c):
        for yy in range(p.h):
            for xx in range(p.w):
                p.px(xx, yy, (72, 68, 60) if (xx + yy) % 3 else (40, 38, 34))

    @mat('municao')
    def _(p, c):
        od(p, base=(72, 78, 50), forca=3)

    @mat('periscopio')
    def _(p, c):
        p.preencher(misturar(OD, OD_ESC, 0.4), forca=3)
        if p.face == 'north':
            for yy in range(1, p.h - 1):
                for xx in range(1, p.w - 1):
                    p.px(xx, yy, (150, 190, 210) if yy == 1 else (80, 110, 130))

    @mat('vidro')
    def _(p, c):
        p.preencher((90, 120, 140), forca=3)

    @mat('farol', 'lanterna')
    def _(p, c):
        p.preencher(OD_ESC, forca=3)
        if p.face in ('north', 'south'):
            cor = (240, 236, 200) if c['mat'] == 'farol' else (180, 30, 26)
            disco(p, lambda xx, yy, d, a: p.px(xx, yy, cor if d < 0.7 else OD_ESC))


# =================================================================== animações
def animar(m):
    rodas = [o[0] for o in m.ossos if o[0].startswith(('roda_', 'rolete_', 'motriz_', 'guia_'))]
    giro = {r: {'rotation': [(0, [0, 0, 0], 'linear'), (1.5, [-360, 0, 0], 'linear')]} for r in rodas}
    m.animacoes = {
        'andar': dict(loop='loop', length=1.5, bones={
            **giro,
            'casco': {'rotation': [(0, [0, 0, 0]), (0.4, [0.5, 0, 0.25]), (0.75, [0, 0, 0]), (1.1, [-0.4, 0, -0.25]), (1.5, [0, 0, 0])],
                      'position': [(0, [0, 0, 0]), (0.4, [0, 0.12, 0]), (0.75, [0, 0, 0]), (1.1, [0, 0.08, 0]), (1.5, [0, 0, 0])]},
        }),
        'girar_torre': dict(loop='loop', length=8.0, bones={
            'torre': {'rotation': [(0, [0, 0, 0]), (2, [0, 45, 0]), (4, [0, 0, 0]), (6, [0, -45, 0]), (8, [0, 0, 0])]},
            'canhao': {'rotation': [(0, [0, 0, 0]), (2, [6, 0, 0]), (4, [0, 0, 0]), (6, [-3, 0, 0]), (8, [0, 0, 0])]},
        }),
        'atirar': dict(loop='once', length=1.0, bones={
            'canhao': {'position': [(0, [0, 0, 0]), (0.04, [0, 0, 5]), (0.5, [0, 0, 0])],
                       'rotation': [(0, [0, 0, 0]), (0.04, [3, 0, 0]), (0.5, [0, 0, 0])]},
            'casco': {'rotation': [(0, [0, 0, 0]), (0.06, [-1.2, 0, 0]), (0.4, [0.4, 0, 0]), (0.8, [0, 0, 0])]},
        }),
    }


def main():
    os.makedirs(SAIDA, exist_ok=True)
    m = construir()
    png = m.montar_textura()
    with open(os.path.join(SAIDA, 'sherman.bbmodel'), 'w', encoding='utf-8') as f:
        json.dump(m.bbmodel(), f, ensure_ascii=False)
    with open(os.path.join(SAIDA, 'sherman.png'), 'wb') as f:
        f.write(png)
    print('sherman:', len(m.cubos), 'cubos,', len(m.ossos), 'ossos')
    return m


if __name__ == '__main__':
    main()
