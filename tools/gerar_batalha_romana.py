#!/usr/bin/env python3
"""Add-on "Batalha Romana": o legionário romano contra os inimigos de Roma.

Inimigos (todos modelados em volume, com arma 3D e animações):
  Guerreiro Gaulês     espada longa celta, escudo oval, torque de ouro, calça xadrez
  Guerreiro Germânico  lança (framea), escudo redondo, pele de lobo, coque suevo, barba
  Arqueiro Parto       arco recurvo, aljava com flechas, gorro curvado, calça bufante

Saída em minecraft/batalha_romana/: um .bbmodel por inimigo (abre no Blockbench),
o add-on BatalhaRomana.mcaddon (já inclui o legionário de gerar_soldado_romano.py)
e as pastas abertas dos pacotes.
"""
import copy
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mc_lib as L  # noqa: E402
import vida_npc  # noqa: E402
from mc_lib import Modelo, espelho, misturar, ruido  # noqa: E402

AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(AQUI, '..', 'minecraft', 'batalha_romana')
NS = 'inimigo'

# ------------------------------------------------------------------ paleta comum
COURO = (110, 68, 38)
COURO_ESC = (66, 40, 22)
FERRO = (138, 142, 150)
FERRO_CLARO = (205, 210, 218)
BRONZE = (206, 150, 64)
OURO = (255, 204, 74)
MADEIRA = (134, 92, 54)


# ------------------------------------------------------------------ corpo humano base
def humanoide(m, mao_esq):
    m.osso('raiz', None, [0, 0, 0])
    m.osso('perna_dir', 'raiz', [2, 12, 0])
    m.osso('perna_esq', 'raiz', [-2, 12, 0])
    m.osso('corpo', 'raiz', [0, 12, 0])
    m.osso('cabeca', 'corpo', [0, 24, 0])
    m.osso('capa', 'corpo', [0, 24, 3])
    m.osso('braco_dir', 'corpo', [5, 22, 0])
    m.osso('arma', 'braco_dir', [6, 13, 0])
    m.osso('braco_esq', 'corpo', [-5, 22, 0])
    m.osso(mao_esq, 'braco_esq', [-9, 14, 0] if mao_esq == 'escudo' else [-6, 13, 0])
    m.cubo('corpo', 'tronco', [-4, 12, -2], [4, 24, 2], 'tronco')
    m.cubo('cabeca', 'cabeca', [-4, 24, -4], [4, 32, 4], 'rosto')
    m.cubo('cabeca', 'nariz', [-0.5, 25.8, -4.6], [0.5, 27.2, -4], 'pele')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        m.cubo(f'braco_{lado}', f'braco_{lado}', [x(4, 8)[0], 12, -2], [x(4, 8)[1], 24, 2], 'braco')
        m.cubo(f'perna_{lado}', f'perna_{lado}', [x(0, 4)[0], 1, -2], [x(0, 4)[1], 12, 2], 'perna')


def rosto(p, pele, cabelo, olhos=(70, 46, 30), franja=True, extra=None):
    p.preencher(pele, forca=3)
    if p.face == 'north':
        linhas = [
            'hhhhhhhh' if franja else '........',
            'hh.hh.hh' if franja else '........',
            '........',
            '.ss..ss.',
            '.wi..iw.',
            '........',
            '........',
            '...mm...',
        ]
        p.desenho(linhas, {'h': cabelo, 's': misturar(cabelo, (0, 0, 0), 0.3), 'w': (245, 245, 245),
                           'i': olhos, 'm': (140, 70, 60)})
        if extra:
            p.desenho(extra, {'b': cabelo})
    elif p.face in ('east', 'west', 'south', 'up'):
        for yy in range(p.h if p.face == 'up' else 5):
            for xx in range(p.w):
                p.px(xx, yy, ruido(cabelo, 6))


# ------------------------------------------------------------------ animações comuns
def anims_corpo_a_corpo(m, combate, parado_arma=None, tem_capa=True):
    capa = lambda vals: {'capa': {'rotation': vals}} if tem_capa else {}
    parado = {
        'corpo': {'position': [(0, [0, 0, 0]), (2, [0, 0.25, 0]), (4, [0, 0, 0])]},
        'cabeca': {'rotation': [(0, [0, 0, 0]), (1.5, [0, 12, 0]), (2.5, [0, 12, 0]), (3.5, [0, -8, 0]), (4, [0, 0, 0])]},
        'braco_dir': {'rotation': [(0, [0, 0, 3]), (2, [2, 0, 5]), (4, [0, 0, 3])]},
        'braco_esq': {'rotation': [(0, [0, 0, -3]), (2, [2, 0, -5]), (4, [0, 0, -3])]},
        **capa([(0, [-2, 0, 0]), (2, [-5, 0, 1]), (4, [-2, 0, 0])]),
    }
    if parado_arma:
        parado['arma'] = {'rotation': [(0, parado_arma)]}
    a = 30
    andar = {
        'perna_dir': {'rotation': [(0, [a, 0, 0]), (0.5, [-a, 0, 0]), (1, [a, 0, 0])]},
        'perna_esq': {'rotation': [(0, [-a, 0, 0]), (0.5, [a, 0, 0]), (1, [-a, 0, 0])]},
        'braco_dir': {'rotation': [(0, [-22, 0, 3]), (0.5, [22, 0, 3]), (1, [-22, 0, 3])]},
        'braco_esq': {'rotation': [(0, [12, 0, -3]), (0.5, [-12, 0, -3]), (1, [12, 0, -3])]},
        'corpo': {'rotation': [(0, [0, -4, 0]), (0.5, [0, 4, 0]), (1, [0, -4, 0])],
                  'position': [(0, [0, 0, 0]), (0.25, [0, 0.6, 0]), (0.5, [0, 0, 0]), (0.75, [0, 0.6, 0]), (1, [0, 0, 0])]},
        **capa([(0, [-14, 0, 0]), (0.25, [-20, 0, 0]), (0.5, [-14, 0, 0]), (0.75, [-20, 0, 0]), (1, [-14, 0, 0])]),
    }
    comb = {k: {'rotation': [(0, v)]} for k, v in combate.items()}
    v = combate['braco_dir']
    comb['braco_dir'] = {'rotation': [(0, v), (1, [v[0] + 6, v[1], v[2]]), (2, v)]}
    comb['corpo'] = {'rotation': [(0, combate.get('corpo', [0, 0, 0]))],
                     'position': [(0, [0, -0.6, 0]), (1, [0, -0.3, 0]), (2, [0, -0.6, 0])]}
    if tem_capa:
        comb['capa'] = {'rotation': [(0, [-8, 0, 0]), (1, [-11, 0, 0]), (2, [-8, 0, 0])]}
    atacar = {
        'braco_dir': {'rotation': [(0, [0, 0, 0]), (0.15, [-30, 0, 8]), (0.3, [85, 0, 0]), (0.42, [85, 0, 0]), (0.6, [0, 0, 0])]},
        'arma': {'rotation': [(0, [0, 0, 0]), (0.15, [0, 0, 0]), (0.3, [-85, 0, 0]), (0.42, [-85, 0, 0]), (0.6, [0, 0, 0])]},
        'corpo': {'rotation': [(0, [0, 0, 0]), (0.15, [0, -18, 0]), (0.3, [-6, 22, 0]), (0.6, [0, 0, 0])]},
    }
    m.animacoes = {
        'parado': dict(loop='loop', length=4.0, bones=parado),
        'andar': dict(loop='loop', length=1.0, bones=andar),
        'combate': dict(loop='loop', length=2.0, bones=comb),
        'atacar': dict(loop='once', length=0.6, bones=atacar),
    }


# =================================================================== GAULÊS
def gaules():
    m = Modelo('guerreiro_gaules', semente=21)
    humanoide(m, 'escudo')
    PELE, CABELO = (228, 180, 142), (214, 146, 58)
    VERDE, VERDE_B = (48, 104, 58), (90, 150, 80)
    VERM, OCRE = (150, 46, 34), (196, 150, 60)
    AZUL, AZUL_B = (44, 66, 132), (90, 120, 180)

    # roupas: túnica xadrez verde, calça xadrez vermelha e ocre, manto azul
    m.cubo('corpo', 'cinto', [-4.4, 12.8, -2.4], [4.4, 14, 2.4], 'cinto')
    m.cubo('corpo', 'barra', [-4.5, 10.5, -2.5], [4.5, 13, 2.5], 'tronco')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        m.cubo(f'perna_{lado}', f'sapato_{lado}', [x(-0.3, 4.3)[0], 0, -2.7], [x(-0.3, 4.3)[1], 2, 2.3], 'couro')
        m.cubo(f'braco_{lado}', f'bracelete_{lado}', [x(3.8, 8.2)[0], 14.5, -2.2], [x(3.8, 8.2)[1], 15.5, 2.2], 'ouro')
    m.cubo('capa', 'manto', [-4.5, 10, 2.4], [4.5, 24, 3.4], 'manto')
    m.cubo('capa', 'manto_dobra', [-4.7, 21.8, 2.1], [4.7, 24.3, 3.8], 'manto')
    m.cubo('corpo', 'broche', [2.6, 22.8, -2.7], [3.8, 24, -2.2], 'ouro')
    # torque (colar de ouro aberto na frente, com terminais)
    m.cubo('corpo', 'torque_tras', [-2.9, 23.3, 2.2], [2.9, 24.1, 2.8], 'ouro')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        m.cubo('corpo', f'torque_{lado}', [x(2.3, 2.9)[0], 23.3, -2.6], [x(2.3, 2.9)[1], 24.1, 2.8], 'ouro')
        m.cubo('corpo', f'torque_ponta_{lado}', [x(1.2, 2.5)[0], 23.1, -3.1], [x(1.2, 2.5)[1], 24.3, -2.3], 'ouro')
    # cabelo espetado e bigodão
    m.cubo('cabeca', 'cabelo', [-4.5, 27, -4.5], [4.5, 32.5, 4.5], 'cabelo', sem=('north',))
    for i, (a, b) in enumerate((([-3.2, 32.5, -3.4], [-1.2, 34.2, -1.2]), ([0.6, 32.5, -2.6], [2.8, 34.8, -0.4]),
                                ([-1.4, 32.5, 0.4], [0.8, 34.4, 2.6]), ([1.5, 32.5, 1.5], [3.5, 33.8, 3.6]))):
        m.cubo('cabeca', f'mecha_{i}', a, b, 'cabelo')
    m.cubo('cabeca', 'cabelo_nuca', [-4.5, 22.5, 4], [4.5, 27, 5.4], 'cabelo')
    m.cubo('cabeca', 'bigode', [-2.6, 25.3, -4.65], [2.6, 26, -4], 'bigode')
    m.cubo('cabeca', 'bigode_dir', [2.1, 23.8, -4.65], [2.9, 25.6, -4.1], 'bigode')
    m.cubo('cabeca', 'bigode_esq', [-2.9, 23.8, -4.65], [-2.1, 25.6, -4.1], 'bigode')
    # espada longa celta: lâmina comprida de ponta arredondada
    m.cubo('arma', 'cabo', [5.6, 12.6, -2], [6.4, 13.4, 2], 'cabo')
    m.cubo('arma', 'pomo', [5.25, 12.25, 2], [6.75, 13.75, 3], 'bronze')
    m.cubo('arma', 'guarda', [5, 11.6, -2.6], [7, 14.4, -2], 'bronze')
    m.cubo('arma', 'lamina', [5.65, 12.15, -16], [6.35, 13.85, -2.6], 'ferro')
    m.cubo('arma', 'gume', [5.55, 12.7, -16], [6.45, 13.3, -2.6], 'ferro_claro')
    m.cubo('arma', 'ponta', [5.7, 12.4, -17], [6.3, 13.6, -16], 'ferro')
    # escudo oval com espinha de madeira e umbo de ferro
    for i, (y0, y1, hw) in enumerate(((5.5, 7.5, 3), (7.5, 9.5, 4.5), (9.5, 18.5, 5.2), (18.5, 20.5, 4.5), (20.5, 22.5, 3))):
        m.cubo('escudo', f'escudo_{i}', [-10, y0, -hw], [-9, y1, hw], 'escudo')
    m.cubo('escudo', 'espinha', [-10.6, 6.5, -0.6], [-10, 21.5, 0.6], 'madeira')
    m.cubo('escudo', 'umbo', [-11.2, 12.2, -1.8], [-10.6, 15.8, 1.8], 'ferro')
    m.cubo('escudo', 'umbo_barra', [-11, 13.5, -3], [-10.6, 14.5, 3], 'ferro')

    @m.material('rosto')
    def _(p, c):
        rosto(p, PELE, CABELO)

    @m.material('pele')
    def _(p, c):
        p.preencher(PELE, forca=2)

    @m.material('tronco')
    def _(p, c):
        p.xadrez(VERDE, VERDE_B, (220, 200, 120))

    @m.material('braco')
    def _(p, c):
        p.preencher(PELE, forca=3)
        if p.lateral or p.face == 'up':
            for yy in range(0 if p.face == 'up' else 0, p.h if p.face == 'up' else 5):
                for xx in range(p.w):
                    p.px(xx, yy, ruido(VERDE, 5))

    @m.material('perna')
    def _(p, c):
        p.xadrez(VERM, OCRE, (60, 30, 20))

    @m.material('manto')
    def _(p, c):
        p.xadrez(AZUL, AZUL_B, (230, 220, 200), passo=3)

    @m.material('cabelo', 'bigode')
    def _(p, c):
        p.pelo(CABELO)

    @m.material('cinto')
    def _(p, c):
        p.preencher(COURO, forca=3)
        if p.lateral:
            for xx in range(0, p.w, 2):
                p.px(xx, 0, BRONZE)

    @m.material('couro')
    def _(p, c):
        p.preencher(COURO, forca=4)
        if p.lateral:
            p.linha_h(0, COURO_ESC)

    @m.material('ouro', 'bronze')
    def _(p, c):
        p.preencher(OURO if c['mat'] == 'ouro' else BRONZE, forca=4)

    @m.material('cabo')
    def _(p, c):
        p.preencher((96, 62, 36), forca=3)
        for yy in range(0, p.h, 2):
            p.linha_h(yy, (70, 44, 24))

    @m.material('ferro', 'ferro_claro')
    def _(p, c):
        p.preencher(FERRO if c['mat'] == 'ferro' else FERRO_CLARO, forca=3)

    @m.material('madeira')
    def _(p, c):
        p.preencher(MADEIRA, forca=4)

    @m.material('escudo')
    def _(p, c):
        if p.face == 'east':
            p.preencher(MADEIRA, forca=5)
            return
        if p.face != 'west':
            p.preencher((70, 46, 28), forca=3)
            return
        p.preencher(VERDE, VERDE_B, misturar(VERDE, (0, 0, 0), 0.4), forca=4)
        # espirais celtas brancas nas duas metades
        espiral = ['.www.', 'w...w', 'w.w.w', 'w.ww.', '.w...']
        if p.h >= 8:
            p.desenho(espiral, {'w': (236, 228, 200)}, ox=p.w // 2 - 2 if p.w > 5 else 0, oy=1)
            p.desenho(espiral[::-1], {'w': (236, 228, 200)}, ox=p.w // 2 - 2 if p.w > 5 else 0, oy=p.h - 6)
        borda = (220, 196, 110)
        p.px(0, p.h // 2, borda)
        p.px(p.w - 1, p.h // 2, borda)
        for yy in range(p.h):
            p.px(0, yy, borda)
            p.px(p.w - 1, yy, borda)
        if c['nome'] == 'escudo_0':
            p.linha_h(p.h - 1, borda)
        if c['nome'] == 'escudo_4':
            p.linha_h(0, borda)

    anims_corpo_a_corpo(m, {
        'braco_esq': [12, -80, -8], 'braco_dir': [40, 0, 14], 'arma': [-30, 0, 0],
        'corpo': [0, -12, 0], 'cabeca': [0, 12, 0], 'perna_dir': [-12, 0, 2], 'perna_esq': [14, 0, -2],
    })
    return m


# =================================================================== GERMÂNICO
def germano():
    m = Modelo('guerreiro_germano', semente=33)
    humanoide(m, 'escudo')
    PELE, CABELO = (232, 190, 156), (222, 196, 128)
    LOBO = (118, 106, 92)
    LA = (86, 62, 44)

    m.cubo('corpo', 'cinto', [-4.3, 12.4, -2.3], [4.3, 14, 2.3], 'couro')
    m.cubo('corpo', 'fivela', [-0.8, 12.6, -2.6], [0.8, 13.8, -2.3], 'ferro')
    m.cubo('corpo', 'calca_topo', [-4.3, 10.5, -2.3], [4.3, 12.4, 2.3], 'la')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        m.cubo(f'perna_{lado}', f'faixas_{lado}', [x(-0.3, 4.3)[0], 1.5, -2.3], [x(-0.3, 4.3)[1], 8, 2.3], 'faixas', sem=('up', 'down'))
        m.cubo(f'perna_{lado}', f'sapato_{lado}', [x(-0.3, 4.3)[0], 0, -2.7], [x(-0.3, 4.3)[1], 1.6, 2.3], 'couro')
        m.cubo(f'braco_{lado}', f'pele_ombro_{lado}', [x(3.5, 8.6)[0], 20.2, -2.7], [x(3.5, 8.6)[1], 24.8, 2.7], 'lobo')
        m.cubo(f'braco_{lado}', f'argola_{lado}', [x(3.8, 8.2)[0], 17.5, -2.2], [x(3.8, 8.2)[1], 18.5, 2.2], 'ferro')
    m.cubo('capa', 'pele_costas', [-5, 9, 2.2], [5, 24.6, 3.6], 'lobo_longo')
    m.cubo('corpo', 'pele_gola', [-4.6, 22.6, -2.8], [4.6, 24.8, 2.2], 'lobo')
    # cabelo com coque suevo do lado direito e barba trançada
    m.cubo('cabeca', 'cabelo', [-4.5, 27.5, -4.5], [4.5, 32.4, 4.5], 'cabelo', sem=('north',))
    m.cubo('cabeca', 'coque', [4.2, 28.4, -1.2], [6.2, 30.6, 1.2], 'cabelo')
    m.cubo('cabeca', 'coque_ponta', [4.6, 30.6, -0.6], [5.8, 31.8, 0.6], 'cabelo')
    m.cubo('cabeca', 'cabelo_nuca', [-4.5, 23.5, 4], [4.5, 28, 5.3], 'cabelo')
    m.cubo('cabeca', 'barba', [-3.6, 22.3, -4.7], [3.6, 25.6, -3.7], 'barba')
    m.cubo('cabeca', 'barba_ponta', [-2, 20.4, -4.5], [2, 22.3, -3.7], 'barba')
    m.cubo('cabeca', 'bigode', [-2.7, 25.5, -4.75], [2.7, 26.3, -4], 'barba')
    # framea: lança de madeira com ponta de ferro em folha
    m.cubo('arma', 'haste', [5.6, 12.6, -20], [6.4, 13.4, 10], 'madeira')
    m.cubo('arma', 'alvado', [5.45, 12.45, -21], [6.55, 13.55, -19.5], 'ferro')
    m.cubo('arma', 'ponta_0', [5.7, 12.2, -23.5], [6.3, 13.8, -21], 'ferro_claro')
    m.cubo('arma', 'ponta_1', [5.75, 12.45, -25.3], [6.25, 13.55, -23.5], 'ferro_claro')
    m.cubo('arma', 'ponta_2', [5.8, 12.75, -26.6], [6.2, 13.25, -25.3], 'ferro')
    m.cubo('arma', 'conto', [5.5, 12.5, 10], [6.5, 13.5, 10.8], 'ferro')
    # escudo redondo de tábuas pintadas com umbo pontudo
    for i, (y0, y1, hw) in enumerate(((7, 8.5, 3.2), (8.5, 10, 4.9), (10, 12, 6.3), (12, 16, 7),
                                     (16, 18, 6.3), (18, 19.5, 4.9), (19.5, 21, 3.2))):
        m.cubo('escudo', f'escudo_{i}', [-10, y0, -hw], [-9, y1, hw], 'escudo')
    m.cubo('escudo', 'umbo', [-10.7, 12.5, -1.5], [-10, 15.5, 1.5], 'ferro')
    m.cubo('escudo', 'umbo_cone', [-11.3, 13.2, -0.8], [-10.7, 14.8, 0.8], 'ferro')
    m.cubo('escudo', 'umbo_ponta', [-11.9, 13.7, -0.3], [-11.3, 14.3, 0.3], 'ferro_claro')

    @m.material('rosto')
    def _(p, c):
        rosto(p, PELE, CABELO, olhos=(60, 110, 160))

    @m.material('pele')
    def _(p, c):
        p.preencher(PELE, forca=2)

    @m.material('tronco')
    def _(p, c):  # peito nu com músculos
        p.preencher(PELE, forca=3)
        if p.face == 'north':
            sombra = misturar(PELE, (120, 70, 50), 0.35)
            p.desenho(['........', '........', '.ssssss.', '...ss...', '........', '..s..s..',
                       '........', '..s..s..', '........', '..s..s..'], {'s': sombra})

    @m.material('braco')
    def _(p, c):
        p.preencher(PELE, forca=3)

    @m.material('perna', 'la')
    def _(p, c):
        p.preencher(LA, forca=6)

    @m.material('faixas')
    def _(p, c):
        for yy in range(p.h):
            for xx in range(p.w):
                if yy % 2 == 0:
                    p.px(xx, yy, ruido((168, 150, 120), 6))
                elif xx == p.w // 2:
                    p.px(xx, yy, ruido((120, 100, 76), 4))

    @m.material('lobo', 'lobo_longo')
    def _(p, c):
        p.pelo(LOBO, comprido=c['mat'] == 'lobo_longo')

    @m.material('cabelo', 'barba')
    def _(p, c):
        p.pelo(CABELO)
        if c['mat'] == 'barba' and p.lateral and p.w >= 4:  # tranças
            for yy in range(p.h):
                if yy % 2:
                    p.px(p.w // 2, yy, misturar(CABELO, (0, 0, 0), 0.25))

    @m.material('couro')
    def _(p, c):
        p.preencher(COURO, forca=4)

    @m.material('ferro', 'ferro_claro')
    def _(p, c):
        p.preencher(FERRO if c['mat'] == 'ferro' else FERRO_CLARO, forca=3)

    @m.material('madeira')
    def _(p, c):
        p.preencher(MADEIRA, forca=4)
        if p.lateral:
            for yy in range(p.h):
                if (yy * 7) % 5 == 0:
                    p.px(0, yy, misturar(MADEIRA, (0, 0, 0), 0.3))

    @m.material('escudo')
    def _(p, c):
        if p.face == 'east':
            p.preencher(MADEIRA, forca=5)
            return
        if p.face != 'west':
            p.preencher(COURO_ESC, forca=3)
            return
        meio = p.w / 2
        for yy in range(p.h):
            for xx in range(p.w):
                cor = (164, 42, 32) if xx < meio else (34, 30, 30)
                if xx % 3 == 0:
                    cor = misturar(cor, (0, 0, 0), 0.25)  # tábuas
                p.px(xx, yy, ruido(cor, 5))
        p.px(0, 0, COURO_ESC)
        p.px(p.w - 1, 0, COURO_ESC)
        for xx in (0, p.w - 1):
            for yy in range(p.h):
                p.px(xx, yy, COURO_ESC)

    anims_corpo_a_corpo(m, {
        'braco_esq': [12, -80, -8], 'braco_dir': [30, 0, 10], 'arma': [-25, 0, 0],
        'corpo': [0, -12, 0], 'cabeca': [0, 12, 0], 'perna_dir': [-14, 0, 2], 'perna_esq': [16, 0, -2],
    }, parado_arma=[80, 0, 0])
    return m


# =================================================================== ARQUEIRO PARTO
def arqueiro():
    m = Modelo('arqueiro_parto', semente=45)
    humanoide(m, 'arco')
    PELE, CABELO = (194, 140, 98), (74, 48, 30)
    TUNICA, TUNICA_B = (200, 136, 40), (236, 186, 80)
    CALCA = (52, 72, 140)
    GORRO = (146, 38, 40)

    m.cubo('corpo', 'saia', [-4.6, 8.5, -2.6], [4.6, 13, 2.6], 'saia')
    m.cubo('corpo', 'cinto', [-4.3, 12.6, -2.3], [4.3, 13.8, 2.3], 'couro')
    m.cubo('corpo', 'punhal', [3.6, 9.5, -2.8], [4.4, 13, -2.2], 'couro')
    m.cubo('corpo', 'punhal_cabo', [3.75, 13, -2.75], [4.25, 14.6, -2.25], 'ouro')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        m.cubo(f'perna_{lado}', f'calca_bufante_{lado}', [x(-0.4, 4.4)[0], 3, -2.4], [x(-0.4, 4.4)[1], 9, 2.4], 'calca')
        m.cubo(f'perna_{lado}', f'bota_{lado}', [x(-0.2, 4.2)[0], 0, -2.8], [x(-0.2, 4.2)[1], 3, 2.2], 'bota')
        m.cubo(f'braco_{lado}', f'punho_{lado}', [x(3.8, 8.2)[0], 13, -2.2], [x(3.8, 8.2)[1], 14.2, 2.2], 'ouro')
    # gorro curvado para a frente, com abas laterais
    m.cubo('cabeca', 'gorro', [-4.5, 28, -4.5], [4.5, 32.2, 4.5], 'gorro')
    m.cubo('cabeca', 'gorro_topo', [-3.2, 32.2, -2.8], [3.2, 34, 2.4], 'gorro')
    m.cubo('cabeca', 'gorro_curva', [-2.2, 33.6, -4.2], [2.2, 35, -0.6], 'gorro')
    m.cubo('cabeca', 'gorro_ponta', [-1.4, 33.2, -5.8], [1.4, 34.6, -3.6], 'gorro')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        m.cubo('cabeca', f'aba_{lado}', [x(4.2, 4.8)[0], 24, -1.5], [x(4.2, 4.8)[1], 28.2, 2.5], 'gorro')
    m.cubo('cabeca', 'barba', [-3, 23.6, -4.4], [3, 24.8, -3.9], 'barba')
    m.cubo('cabeca', 'cavanhaque', [-1, 22.8, -4.4], [1, 23.6, -3.9], 'barba')
    m.cubo('cabeca', 'bigode', [-2.2, 25.4, -4.5], [2.2, 25.9, -4], 'barba')
    # aljava nas costas com flechas
    eixo = (0.309, 0.951)
    m.cubo_girado('corpo', 'aljava', [2, 18, 3.6], [2.6, 9, 2.4], [0, 0, -18], 'aljava')
    m.cubo_girado('corpo', 'aljava_boca', [2 + eixo[0] * 4.4, 18 + eixo[1] * 4.4, 3.6], [3, 0.9, 2.8], [0, 0, -18], 'ouro')
    for i, (dx, dz, cor) in enumerate(((-0.6, -0.5, 'pena_branca'), (0.5, 0.2, 'pena_vermelha'), (-0.1, 0.7, 'pena_branca'))):
        base = (2 + dx + eixo[0] * 6.5, 18 + eixo[1] * 6.5, 3.6 + dz)
        m.cubo_girado('corpo', f'flecha_{i}', base, [0.3, 4, 0.3], [0, 0, -18], 'madeira')
        topo = (2 + dx + eixo[0] * 8.6, 18 + eixo[1] * 8.6, 3.6 + dz)
        m.cubo_girado('corpo', f'pena_{i}', topo, [0.9, 1.6, 0.15], [0, 0, -18], cor)
    # arco recurvo composto (madeira e chifre) com corda
    m.cubo('arco', 'empunhadura', [-6.4, 11.5, -0.45], [-5.6, 14.5, 0.45], 'couro')
    for nome, y0, y1, z0, z1 in (('braco_a', 14.5, 18, -0.9, 0.1), ('braco_b', 18, 21, -1.5, -0.5),
                                 ('curva', 21, 22.5, -1.0, 0.0), ('ponta', 22.5, 23.5, -0.3, 0.5)):
        m.cubo('arco', f'{nome}_cima', [-6.35, y0, z0], [-5.65, y1, z1], 'chifre' if nome != 'ponta' else 'osso')
        m.cubo('arco', f'{nome}_baixo', [-6.35, 26 - y1, z0], [-5.65, 26 - y0, z1], 'chifre' if nome != 'ponta' else 'osso')
    m.cubo('arco', 'corda', [-6.05, 2.8, 0.42], [-5.95, 23.2, 0.52], 'corda')

    @m.material('rosto')
    def _(p, c):
        rosto(p, PELE, CABELO, olhos=(40, 28, 20), franja=False)

    @m.material('pele')
    def _(p, c):
        p.preencher(PELE, forca=2)

    @m.material('tronco', 'saia')
    def _(p, c):
        p.preencher(TUNICA, TUNICA_B, misturar(TUNICA, (0, 0, 0), 0.4), forca=4)
        if p.face == 'north':
            meio = p.w // 2
            for yy in range(p.h):
                p.px(meio - 1, yy, GORRO)
                p.px(meio, yy, OURO if yy % 2 else GORRO)
        if p.lateral and c['mat'] == 'saia':
            p.linha_h(p.h - 1, GORRO)
            p.linha_h(p.h - 2, OURO)

    @m.material('braco')
    def _(p, c):  # mangas compridas
        p.preencher(TUNICA, TUNICA_B, misturar(TUNICA, (0, 0, 0), 0.4), forca=4)
        if p.face == 'down':
            p.preencher(PELE, forca=2)

    @m.material('perna', 'calca')
    def _(p, c):
        p.preencher(CALCA, forca=5)
        if p.lateral:
            for yy in range(p.h):
                p.px(p.w // 2, yy, (210, 180, 90))
            if c['mat'] == 'calca':
                for xx in range(p.w):
                    if xx % 2:
                        for yy in range(p.h):
                            p.px(xx, yy, misturar(CALCA, (0, 0, 0), 0.2))

    @m.material('bota')
    def _(p, c):
        p.preencher((140, 96, 60), forca=4)
        if p.lateral:
            p.linha_h(0, OURO)

    @m.material('gorro')
    def _(p, c):
        p.preencher(GORRO, forca=4)
        if p.lateral and c['nome'] == 'gorro':
            p.linha_h(p.h - 1, OURO)
            for xx in range(0, p.w, 2):
                p.px(xx, p.h - 2, (240, 220, 160))

    @m.material('barba')
    def _(p, c):
        p.pelo(CABELO)

    @m.material('couro', 'aljava')
    def _(p, c):
        p.preencher(COURO, forca=4)
        if c['mat'] == 'aljava' and p.lateral:
            for yy in range(1, p.h, 3):
                p.linha_h(yy, OURO)

    @m.material('ouro')
    def _(p, c):
        p.preencher(OURO, forca=4)

    @m.material('madeira')
    def _(p, c):
        p.preencher((176, 136, 90), forca=3)

    @m.material('pena_branca', 'pena_vermelha')
    def _(p, c):
        p.preencher((240, 240, 236) if c['mat'] == 'pena_branca' else (196, 40, 36), forca=4)

    @m.material('chifre')
    def _(p, c):
        p.preencher((92, 60, 36), forca=4)
        if p.lateral:
            p.linha_v(0, (200, 170, 110))

    @m.material('osso')
    def _(p, c):
        p.preencher((230, 220, 190), forca=3)

    @m.material('corda')
    def _(p, c):
        p.preencher((236, 230, 210), forca=2)

    # animações: parado, andar e mirar (puxa a corda e solta, em loop)
    anims_corpo_a_corpo(m, {'braco_dir': [0, 0, 0]}, tem_capa=False)
    m.animacoes['parado']['bones'].pop('capa', None)
    m.animacoes.pop('atacar')
    m.animacoes['combate'] = dict(loop='loop', length=1.6, bones={
        'braco_esq': {'rotation': [(0, [88, 6, 0])]},
        'arco': {'rotation': [(0, [-88, 0, 0])]},
        'braco_dir': {'rotation': [(0, [86, 26, 0]), (0.9, [84, 32, 0]), (1.0, [96, 14, 0]), (1.6, [86, 26, 0])],
                      'position': [(0, [0, 0, 0]), (0.9, [0, 0, 3]), (1.0, [0, 0, -0.5]), (1.6, [0, 0, 0])]},
        'corpo': {'rotation': [(0, [0, -8, 0])]},
        'cabeca': {'rotation': [(0, [0, 8, 0])]},
        'perna_dir': {'rotation': [(0, [-10, 0, 2])]},
        'perna_esq': {'rotation': [(0, [10, 0, -2])]},
    })
    return m


# =================================================================== comportamento
def entidade_cliente(ident, nome, cores, corpo_a_corpo=True, extras=()):
    anims = {n: f'animation.{nome}.{n}' for n in ['parado', 'andar', 'combate', *extras] + (['atacar'] if corpo_a_corpo else [])}
    anims['olhar'] = f'animation.{nome}.olhar'
    anims['postura'] = f'controller.animation.{nome}.postura'
    animate = ['postura', 'olhar']
    if corpo_a_corpo:
        anims['ataque'] = f'controller.animation.{nome}.ataque'
        animate.insert(1, 'ataque')
    return {'format_version': '1.10.0', 'minecraft:client_entity': {'description': {
        'identifier': ident, 'materials': {'default': 'entity_alphatest'},
        'textures': {'default': f'textures/entity/{nome}'}, 'geometry': {'default': f'geometry.{nome}'},
        'animations': anims, 'scripts': {'animate': animate},
        'render_controllers': [f'controller.render.{nome}'],
        'spawn_egg': {'base_color': cores[0], 'overlay_color': cores[1]}}}}


def controladores(nome, corpo_a_corpo=True, ns=NS, vida=False):
    comb = f"query.property('{ns}:em_combate')"
    ctr = {f'controller.animation.{nome}.postura': {'initial_state': 'normal', 'states': {
        'normal': {'animations': ['parado', {'andar': 'query.modified_move_speed > 0.05'}],
                   'transitions': [{'combate': comb}], 'blend_transition': 0.2},
        'combate': {'animations': ['combate', {'andar': 'query.modified_move_speed > 0.05'}],
                    'transitions': [{'normal': '!' + comb}], 'blend_transition': 0.25}}}}
    if vida:  # comer, tomar sopa, beber, dormir e conversar
        estados, entradas = vida_npc.estados_acao(ns)
        ctr[f'controller.animation.{nome}.postura']['states'].update(estados)
        ctr[f'controller.animation.{nome}.postura']['states']['normal']['transitions'] += entradas
    if corpo_a_corpo:
        ctr[f'controller.animation.{nome}.ataque'] = {'initial_state': 'pronto', 'states': {
            'pronto': {'transitions': [{'atacando': 'variable.attack_time > 0'}]},
            'atacando': {'animations': ['atacar'], 'transitions': [{'pronto': 'query.all_animations_finished'}]}}}
    return {'format_version': '1.10.0', 'animation_controllers': ctr}


def render(nome):
    return {'format_version': '1.8.0', 'render_controllers': {f'controller.render.{nome}': {
        'geometry': 'Geometry.default', 'materials': [{'*': 'Material.default'}], 'textures': ['Texture.default']}}}


def entidade_inimigo(ident, vida, dano, vel, arqueiro=False):
    comp = {
        'minecraft:type_family': {'family': ['barbaro', 'mob']},
        'minecraft:health': {'value': vida, 'max': vida},
        'minecraft:collision_box': {'width': 0.6, 'height': 1.95},
        'minecraft:physics': {},
        'minecraft:pushable': {'is_pushable': True, 'is_pushable_by_piston': True},
        'minecraft:breathable': {'total_supply': 15, 'suffocate_time': 0},
        'minecraft:nameable': {},
        'minecraft:despawn': {'despawn_from_distance': {}},
        'minecraft:movement': {'value': vel},
        'minecraft:navigation.walk': {'can_path_over_water': True, 'avoid_damage_blocks': True},
        'minecraft:movement.basic': {},
        'minecraft:jump.static': {},
        'minecraft:can_climb': {},
        'minecraft:follow_range': {'value': 24, 'max': 24},
        'minecraft:loot': {'table': 'loot_tables/batalha/inimigo.json'},
        'minecraft:behavior.float': {'priority': 0},
        'minecraft:behavior.hurt_by_target': {'priority': 1},
        'minecraft:behavior.nearest_attackable_target': {
            'priority': 3, 'must_see': True, 'reselect_targets': True,
            'entity_types': [
                {'filters': {'test': 'is_family', 'subject': 'other', 'value': 'romano'}, 'max_dist': 20},
                {'filters': {'test': 'is_family', 'subject': 'other', 'value': 'player'}, 'max_dist': 16},
            ]},
        'minecraft:behavior.random_stroll': {'priority': 7, 'speed_multiplier': 0.8},
        'minecraft:behavior.look_at_player': {'priority': 8, 'look_distance': 8, 'probability': 0.05},
        'minecraft:behavior.random_look_around': {'priority': 9},
        'minecraft:environment_sensor': {'triggers': [
            {'filters': {'test': 'has_target', 'value': True}, 'event': f'{NS}:entrar_combate'},
            {'filters': {'test': 'has_target', 'value': False}, 'event': f'{NS}:sair_combate'},
        ]},
    }
    # chamam os companheiros quando um é atacado
    comp['minecraft:behavior.hurt_by_target'] = {'priority': 1, 'alert_same_type': True}
    # moral: com pouca vida fogem dos romanos por alguns segundos
    comp['minecraft:environment_sensor']['triggers'].append(
        {'filters': {'test': 'actor_health', 'subject': 'self', 'operator': '<', 'value': 6}, 'event': f'{NS}:fugir'})
    if arqueiro:
        # mantém distância: recua se um romano chega perto e volta a atirar de longe
        comp['minecraft:behavior.avoid_mob_type'] = {'priority': 1, 'entity_types': [
            {'filters': {'test': 'is_family', 'subject': 'other', 'value': 'romano'},
             'max_dist': 6, 'walk_speed_multiplier': 1.1, 'sprint_speed_multiplier': 1.4}]}
        comp['minecraft:shooter'] = {'def': 'minecraft:arrow'}
        comp['minecraft:behavior.ranged_attack'] = {'priority': 2, 'attack_interval_min': 1.5,
                                                    'attack_interval_max': 3.0, 'attack_radius': 15.0}
    else:
        comp['minecraft:attack'] = {'damage': dano}
        comp['minecraft:behavior.melee_attack'] = {'priority': 2, 'speed_multiplier': 1.25, 'track_target': True}
    return {'format_version': '1.21.0', 'minecraft:entity': {
        'description': {'identifier': ident, 'is_spawnable': True, 'is_summonable': True,
                        'properties': {f'{NS}:em_combate': {'type': 'bool', 'default': False, 'client_sync': True}}},
        'component_groups': {f'{NS}:fugindo': {
            'minecraft:behavior.avoid_mob_type': {'priority': 0, 'entity_types': [
                {'filters': {'any_of': [{'test': 'is_family', 'subject': 'other', 'value': 'romano'},
                                        {'test': 'is_family', 'subject': 'other', 'value': 'player'}]},
                 'max_dist': 14, 'walk_speed_multiplier': 1.2, 'sprint_speed_multiplier': 1.5}]},
            'minecraft:timer': {'looping': False, 'time': 8, 'time_down_event': {'event': f'{NS}:voltar'}}}},
        'components': comp,
        'events': {f'{NS}:entrar_combate': {'set_property': {f'{NS}:em_combate': True}},
                   f'{NS}:sair_combate': {'set_property': {f'{NS}:em_combate': False}},
                   f'{NS}:fugir': {'add': {'component_groups': [f'{NS}:fugindo']}},
                   f'{NS}:voltar': {'remove': {'component_groups': [f'{NS}:fugindo']}}}}}


def entidade_tropa_romana(ident, vida, dano, vel, arqueiro=False, caixa=(0.6, 1.95)):
    """Arqueiro romano e cavaleiro: lutam contra bárbaros e monstros, chamam ajuda e podem vigiar torres."""
    comp = {
        'minecraft:type_family': {'family': ['romano', 'mob']},
        'minecraft:health': {'value': vida, 'max': vida},
        'minecraft:collision_box': {'width': caixa[0], 'height': caixa[1]},
        'minecraft:physics': {},
        'minecraft:pushable': {'is_pushable': True, 'is_pushable_by_piston': True},
        'minecraft:breathable': {'total_supply': 15, 'suffocate_time': 0},
        'minecraft:nameable': {},
        'minecraft:persistent': {},
        'minecraft:movement': {'value': vel},
        'minecraft:navigation.walk': {'can_path_over_water': True, 'avoid_damage_blocks': True},
        'minecraft:movement.basic': {},
        'minecraft:jump.static': {},
        'minecraft:follow_range': {'value': 28, 'max': 28},
        'minecraft:knockback_resistance': {'value': 0.5 if not arqueiro else 0.1},
        'minecraft:behavior.float': {'priority': 0},
        'minecraft:behavior.hurt_by_target': {'priority': 1, 'alert_same_type': True},
        'minecraft:behavior.nearest_attackable_target': {
            'priority': 3, 'must_see': True, 'reselect_targets': True,
            'entity_types': [
                {'filters': {'test': 'is_family', 'subject': 'other', 'value': 'barbaro'}, 'max_dist': 24},
                {'filters': {'all_of': [{'test': 'is_family', 'subject': 'other', 'value': 'monster'},
                                        {'test': 'is_family', 'subject': 'other', 'operator': '!=', 'value': 'creeper'}]},
                 'max_dist': 16},
            ]},
        'minecraft:behavior.random_stroll': {'priority': 7, 'speed_multiplier': 0.8},
        'minecraft:behavior.look_at_player': {'priority': 8, 'look_distance': 8, 'probability': 0.05},
        'minecraft:behavior.random_look_around': {'priority': 9},
        'minecraft:environment_sensor': {'triggers': [
            {'filters': {'test': 'has_target', 'value': True}, 'event': 'romano:entrar_combate'},
            {'filters': {'test': 'has_target', 'value': False}, 'event': 'romano:sair_combate'},
        ]},
    }
    if arqueiro:
        comp['minecraft:behavior.avoid_mob_type'] = {'priority': 1, 'entity_types': [
            {'filters': {'test': 'is_family', 'subject': 'other', 'value': 'barbaro'},
             'max_dist': 5, 'walk_speed_multiplier': 1.1, 'sprint_speed_multiplier': 1.4}]}
        comp['minecraft:shooter'] = {'def': 'minecraft:arrow'}
        comp['minecraft:behavior.ranged_attack'] = {'priority': 2, 'attack_interval_min': 1.2,
                                                    'attack_interval_max': 2.5, 'attack_radius': 18.0}
    else:
        comp['minecraft:attack'] = {'damage': dano}
        comp['minecraft:behavior.melee_attack'] = {'priority': 2, 'speed_multiplier': 1.3, 'track_target': True}
    return {'format_version': '1.21.0', 'minecraft:entity': {
        'description': {'identifier': ident, 'is_spawnable': True, 'is_summonable': True,
                        'properties': {'romano:em_combate': {'type': 'bool', 'default': False, 'client_sync': True}}},
        'component_groups': {'romano:guarda': {'minecraft:movement': {'value': 0.0}}},
        'components': comp,
        'events': {
            'romano:entrar_combate': {'set_property': {'romano:em_combate': True}},
            'romano:sair_combate': {'set_property': {'romano:em_combate': False}},
            'romano:comecar_guarda': {'add': {'component_groups': ['romano:guarda']}},
            'romano:terminar_guarda': {'remove': {'component_groups': ['romano:guarda']}},
        }}}


def regra_spawn(ident, biomas, grupo):
    return {'format_version': '1.8.0', 'minecraft:spawn_rules': {
        'description': {'identifier': ident, 'population_control': 'monster'},
        'conditions': [{
            'minecraft:spawns_on_surface': {},
            'minecraft:weight': {'default': 3},
            'minecraft:herd': {'min_size': grupo[0], 'max_size': grupo[1]},
            'minecraft:biome_filter': {'any_of': [{'test': 'has_biome_tag', 'value': b} for b in biomas]},
        }]}}


SAQUE = {'pools': [
    {'rolls': 1, 'entries': [{'type': 'item', 'name': 'minecraft:iron_nugget', 'weight': 1,
                              'functions': [{'function': 'set_count', 'count': {'min': 1, 'max': 4}}]}]},
    {'rolls': 1, 'entries': [{'type': 'item', 'name': 'minecraft:gold_nugget', 'weight': 1,
                              'functions': [{'function': 'set_count', 'count': {'min': 0, 'max': 2}}]}]},
]}

BATALHA = """# Batalha Romana: uma legião contra um exército de bárbaros.
# Use olhando para um lugar plano e aberto: /function batalha
say §6Uma legião romana enfrenta os inimigos de Roma!
summon romano:legionario ~-4 ~ ~10
summon romano:legionario ~-1.5 ~ ~10
summon romano:legionario ~1.5 ~ ~10
summon romano:legionario ~4 ~ ~10
summon romano:legionario ~-2.5 ~ ~12
summon romano:legionario ~2.5 ~ ~12
summon inimigo:guerreiro_gaules ~-4 ~ ~-10
summon inimigo:guerreiro_gaules ~0 ~ ~-10
summon inimigo:guerreiro_germano ~4 ~ ~-10
summon inimigo:guerreiro_germano ~-2 ~ ~-12
summon inimigo:arqueiro_parto ~2 ~ ~-14
summon inimigo:arqueiro_parto ~5 ~ ~-14
summon romano:sagitario ~-3 ~ ~15
summon romano:sagitario ~3 ~ ~15
summon romano:cavaleiro ~-8 ~ ~11
summon romano:cavaleiro ~8 ~ ~11
"""

BATALHA_GRANDE = """# Batalha grande: duas legiões e uma horda (cuidado com o lag em celulares fracos)
function batalha
summon romano:legionario ~-6 ~ ~14
summon romano:legionario ~-3 ~ ~14
summon romano:legionario ~0 ~ ~14
summon romano:legionario ~3 ~ ~14
summon romano:legionario ~6 ~ ~14
summon inimigo:guerreiro_gaules ~-6 ~ ~-12
summon inimigo:guerreiro_gaules ~6 ~ ~-12
summon inimigo:guerreiro_germano ~-4 ~ ~-14
summon inimigo:guerreiro_germano ~0 ~ ~-14
summon inimigo:guerreiro_germano ~4 ~ ~-14
summon inimigo:arqueiro_parto ~-3 ~ ~-17
summon inimigo:arqueiro_parto ~3 ~ ~-17
"""

POSTO = """# Manda os legionários por perto (até 32 blocos) construírem um posto avançado
# de madeira na direção para onde você está olhando, com o portão virado para você.
scriptevent romano:construir
"""

INIMIGOS = [
    # construtor, nome pt, nome en, vida, dano, velocidade, arqueiro, cores do ovo, biomas, grupo
    (gaules, 'Guerreiro Gaulês', 'Gaulish Warrior', 26, 7, 0.32, False, ('#30683a', '#ffcc4a'),
     ['plains', 'forest'], (2, 4)),
    (germano, 'Guerreiro Germânico', 'Germanic Warrior', 30, 6, 0.3, False, ('#76695c', '#a42a20'),
     ['taiga', 'forest'], (2, 4)),
    (arqueiro, 'Arqueiro Parto', 'Parthian Archer', 20, 0, 0.3, True, ('#c88828', '#923026'),
     ['desert', 'savanna', 'mesa'], (1, 3)),
]


def main():
    import gerar_soldado_romano as gs

    os.makedirs(SAIDA, exist_ok=True)
    arquivos, lang_pt, lang_en = {}, [], []
    rp, bp = 'pacote_recursos', 'pacote_comportamento'

    for construtor, pt, en, vida, dano, vel, arq, cores, biomas, grupo in INIMIGOS:
        m = construtor()
        png = m.montar_textura()
        ident = f'{NS}:{m.nome}'
        with open(os.path.join(SAIDA, f'{m.nome}.bbmodel'), 'w', encoding='utf-8') as f:
            L.json.dump(m.bbmodel(), f, ensure_ascii=False, indent=1)
        with open(os.path.join(SAIDA, f'{m.nome}.png'), 'wb') as f:
            f.write(png)
        olhar = {f'animation.{m.nome}.olhar': {'loop': True, 'bones': {'cabeca': {
            'rotation': ['query.target_x_rotation', 'query.target_y_rotation', 0]}}}}
        arquivos[f'{rp}/models/entity/{m.nome}.geo.json'] = L.json_bytes(m.geo())
        arquivos[f'{rp}/animations/{m.nome}.animation.json'] = L.json_bytes(m.animacoes_bedrock(olhar))
        arquivos[f'{rp}/animation_controllers/{m.nome}.animation_controllers.json'] = L.json_bytes(controladores(m.nome, not arq))
        arquivos[f'{rp}/entity/{m.nome}.entity.json'] = L.json_bytes(entidade_cliente(ident, m.nome, cores, not arq))
        arquivos[f'{rp}/render_controllers/{m.nome}.render_controllers.json'] = L.json_bytes(render(m.nome))
        arquivos[f'{rp}/textures/entity/{m.nome}.png'] = png
        arquivos[f'{bp}/entities/{m.nome}.json'] = L.json_bytes(entidade_inimigo(ident, vida, dano, vel, arq))
        arquivos[f'{bp}/spawn_rules/{m.nome}.json'] = L.json_bytes(regra_spawn(ident, biomas, grupo))
        lang_pt += [f'entity.{ident}.name={pt}', f'item.spawn_egg.entity.{ident}.name=Gerar {pt}']
        lang_en += [f'entity.{ident}.name={en}', f'item.spawn_egg.entity.{ident}.name=Spawn {en}']

    # legionário romano (de gerar_soldado_romano.py), agora também caçando os bárbaros
    img = gs.montar_textura()
    buf = L.io.BytesIO()
    img.save(buf, 'PNG')
    arquivos[f'{rp}/models/entity/{gs.NOME}.geo.json'] = L.json_bytes(gs.gerar_geo())
    arquivos[f'{rp}/animations/{gs.NOME}.animation.json'] = L.json_bytes(gs.gerar_animacoes_bedrock())
    arquivos[f'{rp}/animation_controllers/{gs.NOME}.animation_controllers.json'] = L.json_bytes(gs.CONTROLADORES)
    arquivos[f'{rp}/entity/{gs.NOME}.entity.json'] = L.json_bytes(gs.ENTIDADE_CLIENTE)
    arquivos[f'{rp}/render_controllers/{gs.NOME}.render_controllers.json'] = L.json_bytes(gs.RENDER)
    arquivos[f'{rp}/textures/entity/{gs.NOME}.png'] = buf.getvalue()
    romano = copy.deepcopy(gs.ENTIDADE_SERVIDOR)
    alvo = romano['minecraft:entity']['components']['minecraft:behavior.nearest_attackable_target']
    alvo['entity_types'].insert(0, {'filters': {'test': 'is_family', 'subject': 'other', 'value': 'barbaro'}, 'max_dist': 24})
    alvo['priority'] = 2
    ent = romano['minecraft:entity']
    comp = ent['components']
    comp['minecraft:behavior.hurt_by_target'] = {'priority': 1, 'alert_same_type': True}
    # parede de escudos: o scutum segura metade do dano das flechas
    comp['minecraft:damage_sensor'] = {'triggers': [{'cause': 'projectile', 'damage_multiplier': 0.5}]}
    comp['minecraft:environment_sensor']['triggers'].append(
        {'filters': {'test': 'actor_health', 'subject': 'self', 'operator': '<', 'value': 8}, 'event': 'romano:recuar'})
    ent['component_groups'] = {
        'romano:obra': {'minecraft:movement': {'value': 0.0}},
        'romano:recuando': {
            'minecraft:behavior.avoid_mob_type': {'priority': 0, 'entity_types': [
                {'filters': {'test': 'is_family', 'subject': 'other', 'value': 'barbaro'},
                 'max_dist': 10, 'walk_speed_multiplier': 1.1, 'sprint_speed_multiplier': 1.4}]},
            'minecraft:timer': {'looping': False, 'time': 6, 'time_down_event': {'event': 'romano:fim_recuo'}}},
    }
    ent['events'].update({
        'romano:comecar_obra': {'add': {'component_groups': ['romano:obra']},
                                'set_property': {'romano:construindo': True}},
        'romano:terminar_obra': {'remove': {'component_groups': ['romano:obra']},
                                 'set_property': {'romano:construindo': False}},
        'romano:recuar': {'add': {'component_groups': ['romano:recuando']}},
        'romano:fim_recuo': {'remove': {'component_groups': ['romano:recuando']}},
        'romano:comecar_guarda': {'add': {'component_groups': ['romano:guarda']},
                                  'set_property': {'romano:de_guarda': True}},
        'romano:terminar_guarda': {'remove': {'component_groups': ['romano:guarda']},
                                   'set_property': {'romano:de_guarda': False, 'romano:marchando': False}},
        'romano:marchar': {'set_property': {'romano:marchando': True}},
        'romano:parar': {'set_property': {'romano:marchando': False}},
    })
    ent['component_groups']['romano:guarda'] = {'minecraft:movement': {'value': 0.0}}
    arquivos[f'{bp}/entities/{gs.NOME}.json'] = L.json_bytes(romano)
    for js in ('main.js', 'plano.js', 'obras.js', 'sistema.js', 'vida.js', 'dialogos.js', 'comando.js'):
        with open(os.path.join(AQUI, 'scripts_batalha', js), 'rb') as f:
            arquivos[f'{bp}/scripts/{js}'] = f.read()
    lang_pt += [f'entity.{gs.ID}.name=Soldado Romano', f'item.spawn_egg.entity.{gs.ID}.name=Gerar Soldado Romano']
    lang_en += [f'entity.{gs.ID}.name=Roman Soldier', f'item.spawn_egg.entity.{gs.ID}.name=Spawn Roman Soldier']

    # ---- tropas romanas novas: arqueiro (sagittarius) e cavaleiro (eques)
    import tropas_romanas as TR
    for construtor, ident, pt, en, vida, dano, vel, arq, caixa, cores in (
        (TR.sagitario, 'romano:sagitario', 'Arqueiro Romano', 'Roman Archer', 22, 0, 0.3, True, (0.6, 1.95), ('#a01e1e', '#b8bec8')),
        (TR.cavaleiro, 'romano:cavaleiro', 'Cavaleiro Romano', 'Roman Cavalry', 44, 8, 0.36, False, (1.3, 2.9), ('#7a4a28', '#a01e1e')),
    ):
        m = construtor()
        png = m.montar_textura()
        with open(os.path.join(SAIDA, f'{m.nome}.bbmodel'), 'w', encoding='utf-8') as f:
            L.json.dump(m.bbmodel(), f, ensure_ascii=False, indent=1)
        olhar = {f'animation.{m.nome}.olhar': {'loop': True, 'bones': {'cabeca': {
            'rotation': ['query.target_x_rotation', 'query.target_y_rotation', 0]}}}}
        arquivos[f'{rp}/models/entity/{m.nome}.geo.json'] = L.json_bytes(m.geo())
        arquivos[f'{rp}/animations/{m.nome}.animation.json'] = L.json_bytes(m.animacoes_bedrock(olhar))
        arquivos[f'{rp}/animation_controllers/{m.nome}.animation_controllers.json'] = L.json_bytes(
            controladores(m.nome, not arq, 'romano', vida=arq))
        arquivos[f'{rp}/entity/{m.nome}.entity.json'] = L.json_bytes(entidade_cliente(
            ident, m.nome, cores, not arq, extras=list(vida_npc.ACOES.values()) if arq else ()))
        arquivos[f'{rp}/render_controllers/{m.nome}.render_controllers.json'] = L.json_bytes(render(m.nome))
        arquivos[f'{rp}/textures/entity/{m.nome}.png'] = png
        ent_tropa = entidade_tropa_romana(ident, vida, dano, vel, arq, caixa)
        if arq:  # o arqueiro também come, bebe, dorme e conversa
            vida_npc.entidade_acoes(ent_tropa, 'romano')
        arquivos[f'{bp}/entities/{m.nome}.json'] = L.json_bytes(ent_tropa)
        lang_pt += [f'entity.{ident}.name={pt}', f'item.spawn_egg.entity.{ident}.name=Gerar {pt}']
        lang_en += [f'entity.{ident}.name={en}', f'item.spawn_egg.entity.{ident}.name=Spawn {en}']

    # ---- família nobre e Aélia: NPCs que passeiam, comem, bebem, dormem e conversam
    import gerar_nobres_romanas as GN
    import gerar_personagem_aelia as GA
    acoes = list(vida_npc.ACOES.values())
    for construtor, ident, nome_pt, cores in (
        (GN.aurelia, 'nobre:aurelia', 'Aurélia', ('#702878', '#e0ac40')),
        (GN.livia, 'nobre:livia', 'Lívia', ('#284696', '#eeeae2')),
        (GN.cornelia, 'nobre:cornelia', 'Cornélia', ('#ce5c76', '#ecc46c')),
        (GN.julia, 'nobre:julia', 'Júlia', ('#287c54', '#b84a24')),
        (GA.modelo, 'nobre:aelia', 'Aélia', ('#f4eee2', '#eaa8c4')),
    ):
        m = construtor()
        nome = f'nobre_{m.nome}'
        png = m.montar_textura()
        m.nome = nome  # identificadores de geometria e animação próprios do add-on
        arquivos[f'{rp}/models/entity/{nome}.geo.json'] = L.json_bytes(m.geo())
        olhar = {f'animation.{nome}.olhar': {'loop': True, 'bones': {'cabeca': {
            'rotation': ['query.target_x_rotation * 0.7', 'query.target_y_rotation * 0.7', 0]}}}}
        arquivos[f'{rp}/animations/{nome}.animation.json'] = L.json_bytes(m.animacoes_bedrock(olhar))
        estados, entradas = vida_npc.estados_acao('nobre')
        arquivos[f'{rp}/animation_controllers/{nome}.animation_controllers.json'] = L.json_bytes({
            'format_version': '1.10.0', 'animation_controllers': {f'controller.animation.{nome}.postura': {
                'initial_state': 'normal', 'states': {
                    'normal': {'animations': ['parado', {'andar': 'query.modified_move_speed > 0.05'}],
                               'transitions': entradas, 'blend_transition': 0.2},
                    **estados}}}})
        anims = {n: f'animation.{nome}.{n}' for n in ['parado', 'andar', 'acenar', 'olhar', *acoes]}
        anims['postura'] = f'controller.animation.{nome}.postura'
        arquivos[f'{rp}/entity/{nome}.entity.json'] = L.json_bytes({
            'format_version': '1.10.0', 'minecraft:client_entity': {'description': {
                'identifier': ident, 'materials': {'default': 'entity_alphatest'},
                'textures': {'default': f'textures/entity/{nome}'}, 'geometry': {'default': f'geometry.{nome}'},
                'animations': anims, 'scripts': {'animate': ['postura', 'olhar']},
                'render_controllers': [f'controller.render.{nome}'],
                'spawn_egg': {'base_color': cores[0], 'overlay_color': cores[1]}}}})
        arquivos[f'{rp}/render_controllers/{nome}.render_controllers.json'] = L.json_bytes(render(nome))
        arquivos[f'{rp}/textures/entity/{nome}.png'] = png
        ent_nobre = {'format_version': '1.21.0', 'minecraft:entity': {
            'description': {'identifier': ident, 'is_spawnable': True, 'is_summonable': True, 'properties': {}},
            'components': {
                'minecraft:type_family': {'family': ['nobre', 'mob']},
                'minecraft:health': {'value': 20, 'max': 20},
                'minecraft:collision_box': {'width': 0.6, 'height': 1.9},
                'minecraft:physics': {}, 'minecraft:pushable': {'is_pushable': True, 'is_pushable_by_piston': True},
                'minecraft:breathable': {'total_supply': 15, 'suffocate_time': 0},
                'minecraft:nameable': {}, 'minecraft:persistent': {},
                'minecraft:movement': {'value': 0.22},
                'minecraft:navigation.walk': {'can_path_over_water': True, 'avoid_damage_blocks': True, 'can_open_doors': True},
                'minecraft:movement.basic': {}, 'minecraft:jump.static': {},
                'minecraft:behavior.float': {'priority': 0},
                'minecraft:behavior.panic': {'priority': 1, 'speed_multiplier': 1.4},
                'minecraft:behavior.avoid_mob_type': {'priority': 2, 'entity_types': [
                    {'filters': {'test': 'is_family', 'subject': 'other', 'value': 'barbaro'},
                     'max_dist': 10, 'walk_speed_multiplier': 1.2, 'sprint_speed_multiplier': 1.5}]},
                'minecraft:behavior.random_stroll': {'priority': 6, 'speed_multiplier': 0.6},
                'minecraft:behavior.look_at_player': {'priority': 7, 'look_distance': 8, 'probability': 0.1},
                'minecraft:behavior.random_look_around': {'priority': 8},
            }, 'events': {}}}
        arquivos[f'{bp}/entities/{nome}.json'] = L.json_bytes(vida_npc.entidade_acoes(ent_nobre, 'nobre'))
        lang_pt += [f'entity.{ident}.name={nome_pt}', f'item.spawn_egg.entity.{ident}.name=Gerar {nome_pt}']
        lang_en += [f'entity.{ident}.name={nome_pt}', f'item.spawn_egg.entity.{ident}.name=Spawn {nome_pt}']

    # ---- vozes dos personagens
    import gerar_vozes
    sons, defs_sons = gerar_vozes.gerar()
    for rel, dados in sons.items():
        arquivos[f'{rp}/{rel}'] = dados
    arquivos[f'{rp}/sounds/sound_definitions.json'] = L.json_bytes(defs_sons)

    # ---- armadura do general (attachables), item do Sistema, ícones e skin
    import general_romano as GR
    texturas_itens = {}
    for construtor, item_id, nome, slot, setup, protecao in GR.PECAS:
        m = construtor()
        png = m.montar_textura()
        with open(os.path.join(SAIDA, f'{m.nome}.bbmodel'), 'w', encoding='utf-8') as f:
            L.json.dump(m.bbmodel(), f, ensure_ascii=False, indent=1)
        arquivos[f'{rp}/models/entity/{m.nome}.geo.json'] = L.json_bytes(m.geo())
        arquivos[f'{rp}/textures/models/armor/{m.nome}.png'] = png
        arquivos[f'{rp}/attachables/{m.nome}.json'] = L.json_bytes(GR.attachable(item_id, m.nome, setup))
        arquivos[f'{bp}/items/{m.nome}.json'] = L.json_bytes(GR.item_armadura(item_id, nome, slot, protecao, m.nome))
        texturas_itens[m.nome] = {'textures': f'textures/items/{m.nome}'}
    arquivos[f'{bp}/items/sistema.json'] = L.json_bytes(GR.ITEM_SISTEMA)
    arquivos[f'{bp}/items/bastao.json'] = L.json_bytes(GR.ITEM_BASTAO)
    texturas_itens['bastao'] = {'textures': 'textures/items/bastao'}
    texturas_itens['sistema'] = {'textures': 'textures/items/sistema'}
    for nome, png in GR.icones().items():
        arquivos[f'{rp}/textures/items/{nome}.png'] = png
    arquivos[f'{rp}/textures/item_texture.json'] = L.json_bytes(
        {'resource_pack_name': 'batalha_romana', 'texture_name': 'atlas.items', 'texture_data': texturas_itens})
    sk = 'pacote_skin'
    skin_png, _ = GR.skin()
    arquivos[f'{sk}/general_romano.png'] = skin_png
    arquivos[f'{sk}/skins.json'] = L.json_bytes({
        'skins': [{'localization_name': 'general', 'geometry': 'geometry.humanoid.custom',
                   'texture': 'general_romano.png', 'type': 'free'}],
        'serialize_name': 'BatalhaRomana', 'localization_name': 'BatalhaRomana'})
    for lg, nome_skin in (('pt_BR', 'General Romano'), ('en_US', 'Roman General')):
        arquivos[f'{sk}/texts/{lg}.lang'] = (f'skinpack.BatalhaRomana=Batalha Romana\nskin.BatalhaRomana.general={nome_skin}\n').encode()
    arquivos[f'{sk}/texts/languages.json'] = L.json_bytes(['pt_BR', 'en_US'])
    man_skin = L.manifesto('batalha_romana', 'skin_pack', 'Batalha Romana: General', 'Skin do General Romano', 'nada')
    man_skin.pop('dependencies')
    man_skin['header'].pop('min_engine_version')
    man_skin['format_version'] = 1
    arquivos[f'{sk}/manifest.json'] = L.json_bytes(man_skin)

    arquivos[f'{bp}/functions/batalha.mcfunction'] = BATALHA.encode()
    arquivos[f'{bp}/functions/batalha_grande.mcfunction'] = BATALHA_GRANDE.encode()
    arquivos[f'{bp}/functions/posto_avancado.mcfunction'] = POSTO.encode()
    arquivos[f'{bp}/functions/cancelar_obras.mcfunction'] = b'scriptevent romano:cancelar\n'
    arquivos[f'{bp}/functions/ordens.mcfunction'] = b'# Menu de ordens da legiao\nscriptevent legiao:menu\n'
    arquivos[f'{bp}/functions/bastao.mcfunction'] = b'give @s batalha:bastao\n'
    for ordem in ('seguir', 'formacao', 'testudo', 'atacar', 'defender', 'aguardar', 'guarda'):
        arquivos[f'{bp}/functions/legiao_{ordem}.mcfunction'] = f'scriptevent legiao:{ordem}\n'.encode()
    arquivos[f'{bp}/functions/sistema.mcfunction'] = b'# Abre a janela do Sistema\nscriptevent sistema:abrir\n'
    arquivos[f'{bp}/functions/familia_nobre.mcfunction'] = ('# A família nobre e Aélia aparecem perto de você\n'
        + ''.join(f'summon nobre:{n} ~{dx} ~ ~{dz}\n' for n, dx, dz in
                  (('aurelia', 2, 2), ('livia', -2, 2), ('cornelia', 3, -1), ('julia', -3, -1), ('aelia', 0, 3)))).encode()
    arquivos[f'{bp}/functions/reiniciar_sistema.mcfunction'] = (
        '# Apaga seu progresso no Sistema e mostra a chegada do General de novo\nscriptevent sistema:reiniciar\n').encode()
    arquivos[f'{bp}/loot_tables/batalha/inimigo.json'] = L.json_bytes(SAQUE)
    arquivos[f'{rp}/texts/languages.json'] = L.json_bytes(['pt_BR', 'en_US'])
    arquivos[f'{rp}/texts/pt_BR.lang'] = ('\n'.join(lang_pt) + '\n').encode()
    arquivos[f'{rp}/texts/en_US.lang'] = ('\n'.join(lang_en) + '\n').encode()
    base = 'batalha_romana'
    arquivos[f'{rp}/manifest.json'] = L.json_bytes(L.manifesto(base, 'resources', 'Batalha Romana (recursos)',
                                                              'Romanos contra gauleses, germânicos e partos', 'data'))
    man = L.manifesto(base, 'data', 'Batalha Romana (comportamento)',
                      'Use /function batalha para começar uma batalha', 'resources')
    man['modules'].append({'type': 'script', 'language': 'javascript', 'entry': 'scripts/main.js',
                           'uuid': L.uuid.uuid5(L.uuid.NAMESPACE_URL, base + '/modulo/script').__str__(),
                           'version': [1, 0, 0]})
    man['dependencies'].append({'module_name': '@minecraft/server', 'version': '1.11.0'})
    man['dependencies'].append({'module_name': '@minecraft/server-ui', 'version': '1.2.0'})
    arquivos[f'{bp}/manifest.json'] = L.json_bytes(man)
    icone = gs.icone()
    arquivos[f'{rp}/pack_icon.png'] = icone
    arquivos[f'{bp}/pack_icon.png'] = icone

    for rel, dados in arquivos.items():
        caminho = os.path.join(SAIDA, rel)
        os.makedirs(os.path.dirname(caminho), exist_ok=True)
        with open(caminho, 'wb') as f:
            f.write(dados)
    with open(os.path.join(SAIDA, 'BatalhaRomana.mcaddon'), 'wb') as f:
        f.write(L.mcaddon(arquivos, [(rp, 'BatalhaRomana_RP.mcpack'), (bp, 'BatalhaRomana_BP.mcpack'),
                                     ('pacote_skin', 'BatalhaRomana_Skin.mcpack')]))
    with open(os.path.join(SAIDA, 'SkinGeneralRomano.mcpack'), 'wb') as f:
        f.write(_zip_pasta(arquivos, 'pacote_skin'))
    print('ok:', os.path.normpath(SAIDA))


def _zip_pasta(arquivos, pasta):
    buf = L.io.BytesIO()
    with L.zipfile.ZipFile(buf, 'w', L.zipfile.ZIP_DEFLATED) as z:
        for rel, dados in sorted(arquivos.items()):
            if rel.startswith(pasta + '/'):
                z.writestr(rel[len(pasta) + 1:], dados)
    return buf.getvalue()


if __name__ == '__main__':
    main()
