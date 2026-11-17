#!/usr/bin/env python3
"""Quatro NPCs de uma família nobre romana (só os modelos, para o Blockbench).

  Aurélia   a matrona (mãe): stola roxa, palla dourada, cachos altos com diadema
  Lívia     a filha mais velha: stola azul, palla branca, cabelo preto longo com rede de ouro
  Cornélia  a irmã: stola rosa, cachos loiros e coroa de flores
  Júlia     a prima: stola verde, trança ruiva comprida e sardas

Saída em minecraft/nobres_romanas/: um .bbmodel e a textura de cada uma.
Animações: parado, andar, acenar e conversar.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mc_lib import Modelo, espelho, misturar, ruido  # noqa: E402

SAIDA = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'minecraft', 'nobres_romanas')
OURO, OURO_CLARO, OURO_ESC = (236, 190, 70), (255, 228, 140), (160, 112, 34)


def nobre(nome, semente, pele, cabelo, olhos, stola, palla, extras):
    m = Modelo(nome, tex=128, semente=semente)
    o = m.osso
    o('raiz', None, [0, 0, 0])
    o('perna_dir', 'raiz', [2, 12, 0])
    o('perna_esq', 'raiz', [-2, 12, 0])
    o('corpo', 'raiz', [0, 12, 0])
    o('cabeca', 'corpo', [0, 24, 0])
    o('braco_dir', 'corpo', [5, 22, 0])
    o('braco_esq', 'corpo', [-5, 22, 0])
    c = m.cubo

    # ---- corpo feminino com stola (vestido longo), cinto sob o busto e palla (manto)
    c('corpo', 'tronco', [-4, 12, -2], [4, 24, 2], 'tronco')
    c('corpo', 'busto', [-3.5, 18.6, -2.7], [3.5, 21.4, -2], 'busto')
    c('corpo', 'cinto', [-4.2, 17.6, -2.4], [4.2, 18.6, 2.4], 'ouro')
    c('corpo', 'saia', [-4.5, 3, -2.6], [4.5, 13, 2.6], 'saia')
    c('corpo', 'barra', [-5, 0, -3], [5, 3, 3], 'barra')
    c('corpo', 'palla_costas', [-4.6, 8, 2.1], [4.6, 23.8, 3.1], 'palla')
    c('corpo', 'colar', [-2.5, 22.6, -2.35], [2.5, 23.4, -2.05], 'ouro')
    c('corpo', 'pingente', [-0.5, 21.8, -2.45], [0.5, 22.6, -2.1], 'joia')
    c('braco_esq', 'palla_ombro', [-7.3, 21.4, -1.8], [-3.7, 24.4, 1.8], 'palla')
    # a palla cruza o peito na diagonal, do ombro esquerdo até o quadril direito
    m.cubo_girado('corpo', 'palla_frente', [0.2, 17.6, -2.4], [1.9, 13, 0.45], [0, 0, -38], 'palla')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        c(f'braco_{lado}', f'braco_{lado}', [x(4, 7)[0], 12.5, -1.5], [x(4, 7)[1], 24, 1.5], 'braco')
        c(f'braco_{lado}', f'pulseira_{lado}', [x(3.8, 7.2)[0], 14.5, -1.7], [x(3.8, 7.2)[1], 15.3, 1.7], 'ouro')
        c(f'perna_{lado}', f'perna_{lado}', [x(0.5, 3.5)[0], 1, -1.5], [x(0.5, 3.5)[1], 12, 1.5], 'saia')
        c(f'perna_{lado}', f'sandalia_{lado}', [x(0.5, 3.5)[0], 0, -3.6], [x(0.5, 3.5)[1], 1, 1.5], 'sandalia')
        c('cabeca', f'brinco_{lado}', [x(4, 4.4)[0], 25.4, -0.4], [x(4, 4.4)[1], 26.6, 0.4], 'joia')
    c('cabeca', 'cabeca', [-4, 24, -4], [4, 32, 4], 'rosto')
    c('cabeca', 'nariz', [-0.5, 26.2, -4.35], [0.5, 27.2, -4], 'pele')
    for args in extras(espelho):
        c('cabeca', *args)

    # ---- pintura
    @m.material('pele', 'braco')
    def _(p, c_):
        p.preencher(pele, forca=2)
        if c_['mat'] == 'braco' and p.lateral:
            for yy in range(3):
                p.linha_h(yy, ruido(stola[0], 3))  # manga curta

    @m.material('rosto')
    def _(p, c_):
        p.preencher(pele, forca=2)
        if p.face == 'north':
            p.desenho([
                'hhhhhhhh',
                'hh....hh',
                '.bb..bb.',
                'l......l',
                '.wi..iw.',
                '.r....r.',
                '...mm...',
                '........',
            ], {'h': cabelo, 'b': misturar(cabelo, pele, 0.45), 'l': misturar((40, 26, 24), pele, 0.2),
                'w': (250, 250, 250), 'i': olhos, 'r': misturar(pele, (236, 120, 120), 0.22),
                'm': misturar(pele, (200, 80, 90), 0.6)})
            if nome == 'julia':  # sardas
                for x, y in ((1, 5), (6, 5), (2, 6), (5, 6)):
                    p.px(x, y, misturar(pele, (150, 90, 50), 0.4))
        elif p.face in ('east', 'west', 'south', 'up'):
            for yy in range(p.h if p.face in ('up', 'south') else 5):
                for xx in range(p.w):
                    p.px(xx, yy, ruido(cabelo, 6))

    @m.material('tronco', 'busto', 'saia')
    def _(p, c_):
        base, claro, escuro = stola
        p.preencher(base, claro, escuro, forca=3)
        if p.lateral:  # pregas do tecido
            for xx in range(1, p.w, 3):
                for yy in range(p.h):
                    p.px(xx, yy, misturar(base, escuro, 0.35))
        if c_['nome'] == 'tronco' and p.face == 'north':  # decote discreto e gola dourada
            for xx in range(2, 6):
                p.px(xx, 0, pele)
            p.px(3, 1, pele)
            p.px(4, 1, pele)
            p.px(1, 0, OURO)
            p.px(6, 0, OURO)
        if c_['nome'] == 'busto' and p.face == 'north':
            p.linha_h(0, claro)

    @m.material('barra')
    def _(p, c_):
        p.preencher(stola[0], stola[1], stola[2], forca=3)
        if p.lateral:  # instita: barra dourada bordada
            p.linha_h(p.h - 1, OURO)
            for xx in range(0, p.w, 2):
                p.px(xx, p.h - 2, OURO_CLARO)

    @m.material('palla')
    def _(p, c_):
        base = palla
        p.preencher(base, misturar(base, (255, 255, 255), 0.3), misturar(base, (0, 0, 0), 0.35), forca=3)
        if p.lateral:
            for xx in range(0, p.w, 3):
                p.linha_v(xx, misturar(base, (0, 0, 0), 0.18))
            p.linha_h(p.h - 1, OURO)

    @m.material('ouro')
    def _(p, c_):
        p.preencher(OURO, OURO_CLARO, OURO_ESC, forca=3)

    @m.material('joia')
    def _(p, c_):
        p.preencher((60, 150, 220) if nome != 'aurelia' else (190, 40, 70), forca=3)

    @m.material('sandalia')
    def _(p, c_):
        p.preencher((140, 96, 60), forca=3)
        if p.face == 'up':
            for yy in range(0, p.h, 2):
                p.linha_h(yy, OURO)

    @m.material('cabelo')
    def _(p, c_):
        p.pelo(cabelo)

    @m.material('diadema')
    def _(p, c_):
        p.preencher(OURO_CLARO, forca=3)
        if p.face == 'north':
            for xx in range(1, p.w, 3):
                p.px(xx, 0, (190, 40, 70))

    @m.material('rede')
    def _(p, c_):  # rede de ouro sobre o cabelo
        p.pelo(cabelo)
        for yy in range(p.h):
            for xx in range(p.w):
                if (xx + 2 * yy) % 5 == 0 and yy % 2 == 0:
                    p.px(xx, yy, OURO)

    @m.material('flores')
    def _(p, c_):
        p.preencher((70, 140, 60), forca=4)
        for xx in range(0, p.w, 2):
            for yy in range(p.h):
                p.px(xx, yy, (250, 250, 250) if (xx // 2) % 2 else (240, 120, 160))
        for xx in range(1, p.w, 4):
            p.px(xx, 0, (255, 220, 80))

    animacoes(m)
    return m


def animacoes(m):
    m.animacoes = {
        'parado': dict(loop='loop', length=4.0, bones={
            'corpo': {'rotation': [(0, [0, 0, 0]), (2, [0, 0, 1.5]), (4, [0, 0, 0])]},
            'cabeca': {'rotation': [(0, [0, 0, 0]), (1.2, [0, 10, 4]), (2.6, [2, -8, -3]), (4, [0, 0, 0])]},
            'braco_esq': {'rotation': [(0, [12, 0, -4])]},
            'braco_dir': {'rotation': [(0, [0, 0, 3]), (2, [4, 0, 5]), (4, [0, 0, 3])]},
        }),
        'andar': dict(loop='loop', length=1.2, bones={
            'perna_dir': {'rotation': [(0, [18, 0, 0]), (0.6, [-18, 0, 0]), (1.2, [18, 0, 0])]},
            'perna_esq': {'rotation': [(0, [-18, 0, 0]), (0.6, [18, 0, 0]), (1.2, [-18, 0, 0])]},
            'braco_dir': {'rotation': [(0, [-14, 0, 4]), (0.6, [14, 0, 4]), (1.2, [-14, 0, 4])]},
            'braco_esq': {'rotation': [(0, [16, 0, -4]), (0.6, [8, 0, -4]), (1.2, [16, 0, -4])]},
            'corpo': {'rotation': [(0, [0, -5, -1.5]), (0.6, [0, 5, 1.5]), (1.2, [0, -5, -1.5])],
                      'position': [(0, [0, 0, 0]), (0.3, [0, 0.4, 0]), (0.6, [0, 0, 0]), (0.9, [0, 0.4, 0]), (1.2, [0, 0, 0])]},
        }),
        'acenar': dict(loop='loop', length=1.4, bones={
            'braco_dir': {'rotation': [(0, [0, 0, 150]), (0.35, [0, 0, 165]), (0.7, [0, 0, 145]), (1.05, [0, 0, 165]), (1.4, [0, 0, 150])]},
            'cabeca': {'rotation': [(0, [0, 0, 6])]},
            'braco_esq': {'rotation': [(0, [12, 0, -4])]},
        }),
        'conversar': dict(loop='loop', length=2.4, bones={
            'braco_dir': {'rotation': [(0, [30, 0, 4]), (0.6, [48, -20, 8]), (1.2, [36, 10, 4]), (1.8, [50, -10, 6]), (2.4, [30, 0, 4])]},
            'braco_esq': {'rotation': [(0, [12, 0, -4]), (1.2, [26, 14, -6]), (2.4, [12, 0, -4])]},
            'cabeca': {'rotation': [(0, [4, 0, 0]), (0.6, [-2, 8, 3]), (1.2, [5, -4, -2]), (1.8, [0, 6, 2]), (2.4, [4, 0, 0])]},
            'corpo': {'rotation': [(0, [0, 0, 0]), (1.2, [0, 4, 0]), (2.4, [0, 0, 0])]},
        }),
    }


# =================================================================== as quatro
def aurelia():
    def extras(x):
        return [
            ('cabelo_capa', [-4.5, 27.5, -4.5], [4.5, 32.4, 4.5], 'cabelo', ('north', 'down')),
            ('cachos_altos', [-4.2, 31, -4.8], [4.2, 34.6, -1.6], 'cabelo'),
            ('cachos_topo', [-3.4, 34.6, -4.4], [3.4, 35.6, -2.2], 'cabelo'),
            ('diadema', [-4.4, 31.2, -5], [4.4, 32, -4.6], 'diadema'),
            ('coque', [-2.2, 27, 4.2], [2.2, 31.2, 6.8], 'cabelo'),
        ]
    return nobre('aurelia', 11, (232, 190, 160), (74, 46, 30), (90, 60, 40),
                 ((112, 40, 120), (150, 70, 160), (70, 22, 80)), (220, 168, 60), extras)


def livia():
    def extras(x):
        return [
            ('cabelo_capa', [-4.5, 27.5, -4.5], [4.5, 32.5, 4.5], 'rede', ('north', 'down')),
            ('cabelo_longo', [-4.5, 15, 3.8], [4.5, 30, 5.2], 'cabelo'),
            ('mecha_dir', [4, 20, -1.2], [5, 28, 1.6], 'cabelo'),
            ('mecha_esq', [-5, 20, -1.2], [-4, 28, 1.6], 'cabelo'),
        ]
    m = nobre('livia', 23, (214, 164, 124), (26, 20, 22), (70, 50, 40),
              ((40, 70, 150), (70, 110, 190), (22, 40, 100)), (236, 232, 222), extras)
    return m


def cornelia():
    def extras(x):
        itens = [
            ('cabelo_capa', [-4.5, 27.5, -4.5], [4.5, 32.5, 4.5], 'cabelo', ('north', 'down')),
            ('cachos_costas', [-4.6, 21, 3.8], [4.6, 30, 5.4], 'cabelo'),
            ('coroa_flores', [-4.8, 31.4, -4.8], [4.8, 32.4, 4.8], 'flores', ('down',)),
        ]
        for lado in ('dir', 'esq'):
            xs = espelho(lado)
            itens.append((f'cachos_{lado}', [xs(4, 5.2)[0], 24.5, -2], [xs(4, 5.2)[1], 30, 2], 'cabelo'))
        return itens
    return nobre('cornelia', 37, (238, 200, 172), (232, 196, 110), (70, 130, 170),
                 ((200, 88, 112), (232, 130, 150), (140, 50, 70)), (242, 204, 210), extras)


def julia():
    def extras(x):
        itens = [('cabelo_capa', [-4.5, 27.5, -4.5], [4.5, 32.5, 4.5], 'cabelo', ('north', 'down'))]
        for i, y in enumerate(range(28, 13, -2)):  # trança comprida descendo pelas costas
            w = 1.2 if i % 2 else 0.9
            itens.append((f'tranca_{i}', [-w, y - 2, 4.2], [w, y, 5.6], 'cabelo'))
        itens.append(('laco', [-1.4, 12.4, 4.1], [1.4, 13.6, 5.8], 'ouro'))
        return itens
    return nobre('julia', 41, (236, 194, 162), (176, 70, 34), (60, 120, 70),
                 ((40, 120, 80), (70, 160, 110), (20, 74, 46)), (200, 150, 70), extras)


def main():
    os.makedirs(SAIDA, exist_ok=True)
    for f in (aurelia, livia, cornelia, julia):
        m = f()
        png = m.montar_textura()
        with open(os.path.join(SAIDA, f'{m.nome}.bbmodel'), 'w', encoding='utf-8') as arq:
            json.dump(m.bbmodel(), arq, ensure_ascii=False, indent=1)
        with open(os.path.join(SAIDA, f'{m.nome}.png'), 'wb') as arq:
            arq.write(png)
        print(m.nome, len(m.cubos), 'cubos')


if __name__ == '__main__':
    main()
