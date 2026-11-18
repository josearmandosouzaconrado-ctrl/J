"""Tropas romanas extras para a Batalha Romana: arqueiro (sagittarius) e cavaleiro (eques).

Usa mc_lib e as peças comuns de gerar_batalha_romana (corpo humano, rosto, animações).
"""
import math

from mc_lib import Modelo, espelho, misturar, ruido, rng
from gerar_batalha_romana import humanoide, rosto, anims_corpo_a_corpo
import vida_npc

PELE = (204, 150, 108)
CABELO = (60, 40, 26)
VERMELHO, VERM_CLARO, VERM_ESC = (160, 30, 30), (204, 62, 50), (98, 16, 18)
ACO, ACO_CLARO, ACO_ESC = (170, 177, 188), (228, 232, 238), (88, 94, 106)
BRONZE, OURO = (206, 150, 64), (255, 206, 80)
COURO, COURO_ESC = (110, 68, 38), (66, 40, 22)


def pintores_comuns(m):
    @m.material('rosto')
    def _(p, c):
        rosto(p, PELE, CABELO, franja=False)

    @m.material('pele')
    def _(p, c):
        p.preencher(PELE, forca=2)

    @m.material('tronco', 'saia', 'capa')
    def _(p, c):
        p.preencher(VERMELHO, VERM_CLARO, VERM_ESC, forca=4)
        if p.lateral and c['mat'] in ('saia', 'capa'):
            for xx in range(1, p.w, 3 if c['mat'] == 'capa' else 2):
                p.linha_v(xx, misturar(VERMELHO, VERM_ESC, 0.45))
        if p.lateral and c['mat'] == 'saia':
            p.linha_h(p.h - 1, OURO)

    @m.material('malha')
    def _(p, c):  # cota de malha (lorica hamata): anéis
        for yy in range(p.h):
            for xx in range(p.w):
                k = (xx + (yy % 2)) % 3
                cor = (182, 188, 198) if k == 0 else (134, 140, 150) if k == 2 else (158, 164, 174)
                p.px(xx, yy, ruido(cor, 4))
        if p.lateral:
            p.linha_h(p.h - 1, misturar(ACO_ESC, (0, 0, 0), 0.2))

    @m.material('galea')
    def _(p, c):
        p.preencher(ACO, ACO_CLARO, ACO_ESC, forca=3)
        if p.lateral:
            p.linha_h(p.h - 1, BRONZE)

    @m.material('bronze', 'ouro')
    def _(p, c):
        p.preencher(BRONZE if c['mat'] == 'bronze' else OURO, forca=4)

    @m.material('couro')
    def _(p, c):
        p.preencher(COURO, forca=4)
        if p.lateral:
            for xx in range(0, p.w, 2):
                p.px(xx, 0, BRONZE)

    @m.material('braco')
    def _(p, c):
        p.preencher(PELE, forca=3)
        if p.lateral:
            for yy in range(4):
                p.linha_h(yy, ruido(VERMELHO, 4))
            for yy in range(p.h - 4, p.h - 2):
                p.linha_h(yy, ruido(COURO, 4))

    @m.material('perna')
    def _(p, c):
        p.preencher(PELE, forca=3)

    @m.material('caliga')
    def _(p, c):
        for yy in range(p.h):
            for xx in range(p.w):
                if yy % 2 == 0 or xx == p.w // 2 or yy == p.h - 1:
                    p.px(xx, yy, ruido(COURO if yy < p.h - 1 else COURO_ESC, 4))

    @m.material('madeira')
    def _(p, c):
        p.preencher((150, 108, 66), forca=3)

    @m.material('ferro')
    def _(p, c):
        p.preencher(ACO_CLARO, forca=3)

    @m.material('penacho')
    def _(p, c):
        for yy in range(p.h):
            for xx in range(p.w):
                cor = misturar(VERM_CLARO, VERM_ESC, yy / max(1, p.h - 1) * 0.8)
                if (xx + yy * 2) % 3 == 0:
                    cor = misturar(cor, (230, 90, 70), 0.4)
                p.px(xx, yy, ruido(cor, 6))


def capacete(m, osso='cabeca', y0=24):
    """Galea simples: calota de ferro, bochecheiras e nuca de bronze."""
    m.cubo(osso, 'galea', [-4.5, y0 + 4, -4.5], [4.5, y0 + 8.2, 4.5], 'galea')
    m.cubo(osso, 'galea_topo', [-3.5, y0 + 8.2, -3.5], [3.5, y0 + 9, 3.5], 'galea')
    m.cubo(osso, 'botao', [-0.75, y0 + 9, -0.75], [0.75, y0 + 10, 0.75], 'bronze')
    m.cubo(osso, 'viseira', [-4.7, y0 + 4, -5.2], [4.7, y0 + 4.8, -4.5], 'bronze')
    m.cubo(osso, 'nuca', [-4.5, y0 + 2.5, 4.5], [4.5, y0 + 4.5, 5.8], 'galea')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        m.cubo(osso, f'bochecheira_{lado}', [x(3.6, 4.6)[0], y0, -4.4], [x(3.6, 4.6)[1], y0 + 4, -0.6], 'bronze')


def arco(m, osso='arco'):
    m.cubo(osso, 'empunhadura', [-6.4, 11.5, -0.45], [-5.6, 14.5, 0.45], 'couro')
    for nome, y0, y1, z0, z1 in (('braco_a', 14.5, 18, -0.9, 0.1), ('braco_b', 18, 21, -1.5, -0.5),
                                 ('curva', 21, 22.5, -1.0, 0.0), ('ponta', 22.5, 23.5, -0.3, 0.5)):
        mat = 'madeira' if nome != 'ponta' else 'ferro'
        m.cubo(osso, f'{nome}_cima', [-6.35, y0, z0], [-5.65, y1, z1], mat)
        m.cubo(osso, f'{nome}_baixo', [-6.35, 26 - y1, z0], [-5.65, 26 - y0, z1], mat)
    m.cubo(osso, 'corda', [-6.05, 2.8, 0.42], [-5.95, 23.2, 0.52], 'ferro')


def aljava(m, osso='corpo'):
    eixo = (0.309, 0.951)
    m.cubo_girado(osso, 'aljava', [2, 18, 3.6], [2.6, 9, 2.4], [0, 0, -18], 'couro')
    m.cubo_girado(osso, 'aljava_boca', [2 + eixo[0] * 4.4, 18 + eixo[1] * 4.4, 3.6], [3, 0.9, 2.8], [0, 0, -18], 'bronze')
    for i, (dx, dz) in enumerate(((-0.6, -0.5), (0.5, 0.2), (-0.1, 0.7))):
        base = (2 + dx + eixo[0] * 6.5, 18 + eixo[1] * 6.5, 3.6 + dz)
        m.cubo_girado(osso, f'flecha_{i}', base, [0.3, 4, 0.3], [0, 0, -18], 'madeira')
        topo = (2 + dx + eixo[0] * 8.6, 18 + eixo[1] * 8.6, 3.6 + dz)
        m.cubo_girado(osso, f'pena_{i}', topo, [0.9, 1.6, 0.15], [0, 0, -18], 'penacho' if i == 1 else 'ferro')


def animacoes_arqueiro(m):
    anims_corpo_a_corpo(m, {'braco_dir': [0, 0, 0]}, tem_capa=False)
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


# =================================================================== ARQUEIRO ROMANO
def sagitario():
    m = Modelo('sagitario_romano', semente=57)
    humanoide(m, 'arco')
    pintores_comuns(m)
    m.cubo('corpo', 'malha', [-4.4, 14, -2.4], [4.4, 23.6, 2.4], 'malha')
    m.cubo('corpo', 'cinto', [-4.6, 12.8, -2.6], [4.6, 14.2, 2.6], 'couro')
    m.cubo('corpo', 'saia', [-4.5, 9, -2.5], [4.5, 13, 2.5], 'saia')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        m.cubo(f'braco_{lado}', f'manga_malha_{lado}', [x(3.7, 8.3)[0], 19, -2.3], [x(3.7, 8.3)[1], 24.2, 2.3], 'malha')
        m.cubo(f'perna_{lado}', f'caliga_{lado}', [x(-0.3, 4.3)[0], 1, -2.3], [x(-0.3, 4.3)[1], 6, 2.3], 'caliga', sem=('up', 'down'))
        m.cubo(f'perna_{lado}', f'sola_{lado}', [x(-0.5, 4.5)[0], 0, -2.8], [x(-0.5, 4.5)[1], 1, 2.5], 'couro')
    capacete(m)
    aljava(m)
    arco(m)
    animacoes_arqueiro(m)
    vida_npc.adicionar(m, hx=6, pele=PELE, olhos=(26.9, 28.1))
    return m


# =================================================================== CAVALEIRO (eques)
def cavaleiro():
    m = Modelo('cavaleiro_romano', semente=71)
    CAVALO, CAVALO_CLARO, CAVALO_ESC = (122, 74, 40), (160, 104, 62), (70, 40, 22)
    CRINA = (34, 24, 20)
    o = m.osso
    o('raiz', None, [0, 0, 0])
    for nome, x, z in (('pata_frente_dir', 3, -7.5), ('pata_frente_esq', -3, -7.5),
                       ('pata_tras_dir', 3, 7.5), ('pata_tras_esq', -3, 7.5)):
        o(nome, 'raiz', [x, 12, z])
    o('cavalo', 'raiz', [0, 14, 0])
    o('pescoco', 'cavalo', [0, 20, -10])
    o('cauda', 'cavalo', [0, 20, 11.5], [-22, 0, 0])
    o('cavaleiro', 'cavalo', [0, 23, 0])
    o('cabeca', 'cavaleiro', [0, 35, 0])
    o('capa', 'cavaleiro', [0, 35, 3])
    o('braco_dir', 'cavaleiro', [5, 33, 0])
    o('arma', 'braco_dir', [6, 24, 0])
    o('braco_esq', 'cavaleiro', [-5, 33, 0])
    o('escudo', 'braco_esq', [-9, 26, 0])
    o('perna_dir', 'cavaleiro', [4, 24, -1])
    o('perna_esq', 'cavaleiro', [-4, 24, -1])
    c = m.cubo

    # ---- cavalo baio de crina preta, com manta vermelha e sela romana de quatro pontas
    c('cavalo', 'corpo_cavalo', [-5, 12, -11], [5, 22, 11], 'cavalo')
    c('cavalo', 'peito', [-4.5, 13, -12], [4.5, 21, -11], 'cavalo')
    c('cavalo', 'garupa', [-4.5, 14, 11], [4.5, 21.5, 12.2], 'cavalo')
    c('cavalo', 'manta', [-5.6, 16, -5.5], [5.6, 22.4, 5.5], 'manta', sem=('down',))
    c('cavalo', 'sela', [-3.5, 22.4, -4], [3.5, 23.2, 4], 'couro')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        for z0 in (-4, 3):
            c('cavalo', f'ponta_sela_{lado}_{z0}', [x(2.4, 3.5)[0], 23.2, z0], [x(2.4, 3.5)[1], 24.6, z0 + 1], 'couro')
    for nome, z0 in (('frente', -9.5), ('tras', 5.5)):
        for lado in ('dir', 'esq'):
            x = espelho(lado)
            osso = f'pata_{nome}_{lado}'
            c(osso, f'coxa_{nome}_{lado}', [x(1, 5)[0], 6, z0], [x(1, 5)[1], 13, z0 + 4], 'cavalo')
            c(osso, f'canela_{nome}_{lado}', [x(1.5, 4.5)[0], 1.5, z0 + 0.5], [x(1.5, 4.5)[1], 6, z0 + 3.5], 'canela')
            c(osso, f'casco_{nome}_{lado}', [x(1.3, 4.7)[0], 0, z0 + 0.3], [x(1.3, 4.7)[1], 1.5, z0 + 3.7], 'casco')
    a35 = math.radians(35)
    centro_pescoco = (0, 25, -12.5)
    m.cubo_girado('pescoco', 'pescoco', centro_pescoco, [5, 12, 6], [-35, 0, 0], 'cavalo')
    m.cubo_girado('pescoco', 'crina', (0, centro_pescoco[1] + 3.3 * math.sin(a35), centro_pescoco[2] + 3.3 * math.cos(a35)),
                  [1.6, 12.5, 1.4], [-35, 0, 0], 'crina')
    m.cubo_girado('pescoco', 'cabeca_cavalo', (0, 28.6, -19.2), [5, 5, 9], [-25, 0, 0], 'cabeca_cavalo')
    m.cubo_girado('pescoco', 'focinho', (0, 26.3, -23.4), [4, 3.6, 3], [-25, 0, 0], 'focinho')
    m.cubo_girado('pescoco', 'topete', (0, 31.4, -17.2), [2, 1.2, 2.4], [-25, 0, 0], 'crina')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        c('pescoco', f'orelha_cavalo_{lado}', [x(0.8, 2)[0], 31, -16.4], [x(0.8, 2)[1], 33.6, -15.2], 'cavalo')
    c('cauda', 'cauda', [-1.2, 10, 11.5], [1.2, 20, 13.5], 'crina')

    # ---- cavaleiro: cota de malha, capa vermelha, galea com penacho, lança e parma
    c('cavaleiro', 'tronco', [-4, 23, -2], [4, 35, 2], 'tronco')
    c('cavaleiro', 'malha', [-4.4, 25, -2.4], [4.4, 34.6, 2.4], 'malha')
    c('cavaleiro', 'cinto', [-4.6, 23.8, -2.6], [4.6, 25.2, 2.6], 'couro')
    c('cabeca', 'cabeca', [-4, 35, -4], [4, 43, 4], 'rosto')
    c('cabeca', 'nariz', [-0.5, 36.8, -4.6], [0.5, 38.2, -4], 'pele')
    capacete(m, 'cabeca', 35)
    c('cabeca', 'penacho', [-1, 45, -3.5], [1, 47.5, 3.5], 'penacho')
    c('capa', 'capa', [-4.5, 21, 2.4], [4.5, 35, 3.4], 'capa')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        c(f'braco_{lado}', f'braco_{lado}', [x(4, 8)[0], 23, -2], [x(4, 8)[1], 35, 2], 'braco')
        c(f'braco_{lado}', f'manga_malha_{lado}', [x(3.7, 8.3)[0], 30, -2.3], [x(3.7, 8.3)[1], 35.2, 2.3], 'malha')
        c(f'perna_{lado}', f'coxa_{lado}', [x(2, 8)[0], 22.5, -4.5], [x(2, 8)[1], 25.5, 0], 'saia')
        c(f'perna_{lado}', f'canela_{lado}', [x(5.6, 8.6)[0], 13.5, -3], [x(5.6, 8.6)[1], 23, 0], 'perna')
        c(f'perna_{lado}', f'caliga_{lado}', [x(5.3, 8.9)[0], 13, -3.3], [x(5.3, 8.9)[1], 17, 0.3], 'caliga', sem=('up',))
    # hasta: lança comprida
    c('arma', 'haste', [5.6, 23.6, -20], [6.4, 24.4, 12], 'madeira')
    c('arma', 'ponta_0', [5.7, 23.2, -23.5], [6.3, 24.8, -20], 'ferro')
    c('arma', 'ponta_1', [5.75, 23.45, -25.5], [6.25, 24.55, -23.5], 'ferro')
    c('arma', 'ponta_2', [5.8, 23.75, -26.8], [6.2, 24.25, -25.5], 'ferro')
    # parma equestris: escudo oval de cavalaria
    for i, (y0, y1, hw) in enumerate(((18, 20, 3), (20, 22, 4.5), (22, 30, 5), (30, 32, 4.5), (32, 34, 3))):
        c('escudo', f'parma_{i}', [-10, y0, -hw], [-9, y1, hw], 'parma')
    c('escudo', 'umbo', [-10.7, 24.5, -1.5], [-10, 27.5, 1.5], 'bronze')

    pintores_comuns(m)

    @m.material('cavalo')
    def _(p, c_):
        p.preencher(CAVALO, CAVALO_CLARO, CAVALO_ESC, forca=5)
        if p.lateral:  # pelagem com reflexos
            for _ in range(p.w * p.h // 12):
                p.px(rng.randrange(p.w), rng.randrange(p.h), misturar(CAVALO, CAVALO_CLARO, 0.4))

    @m.material('canela')
    def _(p, c_):
        p.preencher(CAVALO_ESC, forca=4)
        if p.lateral:
            p.linha_h(p.h - 1, (230, 226, 216))  # meias brancas

    @m.material('casco')
    def _(p, c_):
        p.preencher((40, 32, 28), forca=3)

    @m.material('crina')
    def _(p, c_):
        p.pelo(CRINA)

    @m.material('cabeca_cavalo')
    def _(p, c_):
        p.preencher(CAVALO, CAVALO_CLARO, CAVALO_ESC, forca=4)
        if p.face == 'north':  # estrela branca na testa
            for yy in range(1, p.h - 1):
                p.px(p.w // 2, yy, (236, 232, 222))
        if p.face in ('east', 'west'):
            p.px(p.w // 3, 1, (20, 16, 14))  # olho
            p.px(p.w // 3, 2, (20, 16, 14))
            for yy in range(p.h):
                p.px(p.w // 2, yy, COURO_ESC)  # cabresto
        if p.face == 'up':
            for xx in range(p.w):
                p.px(xx, p.h // 3, COURO_ESC)

    @m.material('focinho')
    def _(p, c_):
        p.preencher((70, 50, 42), forca=4)
        if p.face == 'north':
            p.px(1, 1, (20, 14, 12))
            p.px(p.w - 2, 1, (20, 14, 12))

    @m.material('manta')
    def _(p, c_):
        p.preencher(VERMELHO, VERM_CLARO, VERM_ESC, forca=4)
        if p.lateral:
            p.linha_h(p.h - 1, OURO)
            p.linha_h(p.h - 2, OURO)
            for xx in range(1, p.w, 3):
                p.px(xx, p.h - 3, OURO)

    @m.material('parma')
    def _(p, c_):
        if p.face == 'east':
            p.preencher((128, 88, 52), forca=4)
            return
        if p.face != 'west':
            p.preencher(BRONZE, forca=3)
            return
        p.preencher((40, 70, 150), (70, 110, 190), (24, 44, 100), forca=4)
        p.linha_v(0, OURO)
        p.linha_v(p.w - 1, OURO)
        if c_['nome'] in ('parma_0', 'parma_4'):
            p.linha_h(0 if c_['nome'] == 'parma_4' else p.h - 1, OURO)
        if c_['nome'] == 'parma_2':
            meio = p.w // 2
            for yy in range(p.h):
                p.px(meio, yy, OURO)
            for xx in range(p.w):
                p.px(xx, p.h // 2, OURO)

    # ---- animações
    a = 32
    par = lambda f, t: {'rotation': [(0, [a * f, 0, 0]), (0.35, [-a * f, 0, 0]), (0.7, [a * f, 0, 0])]}
    m.animacoes = {
        'parado': dict(loop='loop', length=4.0, bones={
            'cavalo': {'position': [(0, [0, 0, 0]), (2, [0, 0.3, 0]), (4, [0, 0, 0])]},
            'pescoco': {'rotation': [(0, [0, 0, 0]), (1.4, [-6, 0, 0]), (2.2, [-6, 0, 0]), (3, [4, 6, 0]), (4, [0, 0, 0])]},
            'cauda': {'rotation': [(0, [0, 0, 0]), (1, [0, 18, 0]), (1.5, [0, -14, 0]), (2, [0, 0, 0]), (4, [0, 0, 0])]},
            'arma': {'rotation': [(0, [80, 0, 0])]},
            'cabeca': {'rotation': [(0, [0, 0, 0]), (1.5, [0, 15, 0]), (3, [0, -10, 0]), (4, [0, 0, 0])]},
            'capa': {'rotation': [(0, [-4, 0, 0]), (2, [-7, 0, 0]), (4, [-4, 0, 0])]},
        }),
        'andar': dict(loop='loop', length=0.7, bones={
            'pata_frente_dir': par(1, 0), 'pata_tras_esq': par(1, 0),
            'pata_frente_esq': par(-1, 0), 'pata_tras_dir': par(-1, 0),
            'cavalo': {'position': [(0, [0, 0, 0]), (0.175, [0, 1, 0]), (0.35, [0, 0, 0]), (0.525, [0, 1, 0]), (0.7, [0, 0, 0])],
                       'rotation': [(0, [2, 0, 0]), (0.35, [-2, 0, 0]), (0.7, [2, 0, 0])]},
            'pescoco': {'rotation': [(0, [6, 0, 0]), (0.35, [-6, 0, 0]), (0.7, [6, 0, 0])]},
            'cauda': {'rotation': [(0, [-12, 0, 0]), (0.35, [-20, 0, 0]), (0.7, [-12, 0, 0])]},
            'cavaleiro': {'position': [(0, [0, 0, 0]), (0.175, [0, -0.5, 0]), (0.35, [0, 0, 0]), (0.525, [0, -0.5, 0]), (0.7, [0, 0, 0])]},
            'capa': {'rotation': [(0, [-18, 0, 0]), (0.35, [-26, 0, 0]), (0.7, [-18, 0, 0])]},
        }),
        'combate': dict(loop='loop', length=2.0, bones={
            'braco_dir': {'rotation': [(0, [30, 0, 10]), (1, [36, 0, 10]), (2, [30, 0, 10])]},
            'arma': {'rotation': [(0, [-20, 0, 0])]},
            'braco_esq': {'rotation': [(0, [12, -80, -8])]},
            'pescoco': {'rotation': [(0, [-10, 0, 0])]},
            'capa': {'rotation': [(0, [-10, 0, 0])]},
        }),
        'atacar': dict(loop='once', length=0.6, bones={
            'braco_dir': {'rotation': [(0, [0, 0, 0]), (0.15, [-30, 0, 8]), (0.3, [85, 0, 0]), (0.42, [85, 0, 0]), (0.6, [0, 0, 0])]},
            'arma': {'rotation': [(0, [0, 0, 0]), (0.15, [0, 0, 0]), (0.3, [-85, 0, 0]), (0.42, [-85, 0, 0]), (0.6, [0, 0, 0])]},
            'cavalo': {'rotation': [(0, [0, 0, 0]), (0.3, [10, 0, 0]), (0.6, [0, 0, 0])]},
            'pata_frente_dir': {'rotation': [(0, [0, 0, 0]), (0.3, [-40, 0, 0]), (0.6, [0, 0, 0])]},
            'pata_frente_esq': {'rotation': [(0, [0, 0, 0]), (0.3, [-30, 0, 0]), (0.6, [0, 0, 0])]},
        }),
    }
    return m
