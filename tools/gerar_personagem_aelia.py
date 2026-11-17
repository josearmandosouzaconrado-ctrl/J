#!/usr/bin/env python3
"""Aélia: personagem feita a partir de uma ilustração de referência (modelo para o Blockbench).

Cabelo platinado muito longo e ondulado com reflexos lilás e dourados, coroa trançada de lado,
tiara de corrente com joia azul na testa, brincos de gota vermelha, olhos azuis grandes, blusa
branca de gola alta de renda com os ombros de fora, mangas brancas soltas, braçadeira dourada com
pingentes, corpete dourado em ponta, saia rosa com sobressaia branca e pulseiras de ouro.

Saída em minecraft/personagem_aelia/: aelia.bbmodel e aelia.png.
Animações: parado, andar, acenar e conversar.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mc_lib import Modelo, espelho, misturar, ruido  # noqa: E402
from gerar_nobres_romanas import animacoes  # noqa: E402

SAIDA = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'minecraft', 'personagem_aelia')
D = 2

PELE = (252, 232, 222)
CABELO = (248, 244, 234)
CABELO_SOMBRA = (214, 216, 238)   # reflexo lilás-azulado
CABELO_LUZ = (255, 247, 214)      # reflexo dourado
CABELO_ROSA = (248, 226, 234)
OLHO, OLHO_CLARO = (84, 132, 218), (150, 192, 246)
BRANCO, BRANCO_SOMBRA = (248, 246, 250), (214, 210, 232)
ROSA, ROSA_CLARO, ROSA_ESC = (234, 168, 196), (246, 202, 220), (198, 120, 156)
OURO, OURO_CLARO, OURO_ESC = (222, 178, 92), (250, 222, 150), (156, 112, 48)
RUBI = (196, 46, 40)
SAFIRA = (90, 150, 230)


def modelo():
    m = Modelo('aelia', tex=256, semente=99)
    o = m.osso
    o('raiz', None, [0, 0, 0])
    o('perna_dir', 'raiz', [1.2, 12, 0])
    o('perna_esq', 'raiz', [-1.2, 12, 0])
    o('corpo', 'raiz', [0, 12, 0])
    o('cabeca', 'corpo', [0, 24, 0])
    o('braco_dir', 'corpo', [4, 22.5, 0])
    o('braco_esq', 'corpo', [-4, 22.5, 0])

    def c(osso, nome, de, ate, mat, sem=()):
        m.cubo(osso, nome, de, ate, mat, sem=sem, ds=D)

    def g(osso, nome, centro, tam, rot, mat, sem=()):
        m.cubo_girado(osso, nome, centro, tam, rot, mat, sem=sem, ds=D)

    # ---- corpo: blusa branca, gola alta de renda, corpete dourado em ponta
    c('corpo', 'tronco', [-3, 12, -1.5], [3, 22.6, 1.5], 'blusa')
    c('corpo', 'pescoco', [-1, 22.6, -1], [1, 24.2, 1], 'pele')
    c('corpo', 'gola', [-1.3, 22.8, -1.3], [1.3, 24.2, 1.3], 'renda', sem=('up', 'down'))
    c('corpo', 'busto', [-2.6, 18.4, -2.05], [2.6, 20.9, -1.5], 'blusa', sem=('up',))
    c('corpo', 'corpete', [-3.25, 15.4, -2.1], [3.25, 18.6, 1.75], 'corpete')
    c('corpo', 'corpete_ponta', [-1.1, 14.6, -2.1], [1.1, 15.4, -1.8], 'corpete')
    c('corpo', 'colar', [-1.7, 22.1, -1.75], [1.7, 22.5, -1.55], 'ouro')
    c('corpo', 'colar_2', [-1.1, 21.3, -1.85], [1.1, 21.7, -1.6], 'ouro')
    c('corpo', 'pingente', [-0.35, 20.6, -1.95], [0.35, 21.3, -1.7], 'safira')
    # ---- saia rosa em "A" com sobressaia branca aberta na frente
    for i, (y0, y1, hw, hz) in enumerate(((9, 15, 3.3, 1.8), (5, 9, 3.65, 2.1), (1, 5, 4, 2.4))):
        c('corpo', f'saia_{i}', [-hw, y0, -hz], [hw, y1, hz], 'saia')
        c('corpo', f'sobressaia_{i}', [-hw - 0.15, y0, -hz + 0.9], [hw + 0.15, y1, hz + 0.15], 'sobressaia', sem=('north', 'up'))
    c('corpo', 'barra', [-4.3, 0, -2.7], [4.3, 1.2, 2.7], 'barra')
    # ---- braços: ombros de fora, manga branca solta com fenda, braçadeira com pingentes, pulseira
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        b = f'braco_{lado}'
        c(b, f'braco_{lado}', [x(3, 5)[0], 12.5, -1], [x(3, 5)[1], 23, 1], 'braco')
        c(b, f'manga_{lado}', [x(2.7, 5.3)[0], 16.4, -1.3], [x(2.7, 5.3)[1], 20.8, 1.3], 'manga', sem=('up',))
        c(b, f'bracadeira_{lado}', [x(2.75, 5.25)[0], 20.8, -1.25], [x(2.75, 5.25)[1], 21.5, 1.25], 'ouro')
        for k, zz in enumerate((-0.6, 0.4)):
            c(b, f'pingente_bracadeira_{lado}_{k}', [x(5.25, 5.45)[0], 19.6, zz], [x(5.25, 5.45)[1], 20.8, zz + 0.3], 'ouro')
        c(b, f'pulseira_{lado}', [x(2.85, 5.15)[0], 13.2, -1.15], [x(2.85, 5.15)[1], 14.4, 1.15], 'ouro')
        c(f'perna_{lado}', f'perna_{lado}', [x(0.2, 2.2)[0], 1, -1], [x(0.2, 2.2)[1], 12, 1], 'saia')
        c(f'perna_{lado}', f'pe_{lado}', [x(0.3, 2.3)[0], 0, -3.1], [x(0.3, 2.3)[1], 0.8, 0.6], 'sapatilha')

    # ---- cabeça e cabelo: risca no meio, franja de lado, mechas longas pela frente e atrás
    c('cabeca', 'cabeca', [-4, 24, -4], [4, 32, 4], 'rosto')
    c('cabeca', 'cabelo_capa', [-4.3, 26.5, -4.3], [4.3, 32.4, 4.3], 'cabelo', sem=('north', 'down'))
    c('cabeca', 'cabelo_topo', [-4.5, 32.4, -3.8], [4.5, 33.1, 4.4], 'cabelo', sem=('down',))
    # franja aberta na risca do meio, caindo para as têmporas
    g('cabeca', 'franja_esq', (-2.15, 31.15, -4.4), (4.2, 2.3, 0.6), (0, 0, -24), 'franja')
    g('cabeca', 'franja_dir', (2.15, 31.15, -4.4), (4.2, 2.3, 0.6), (0, 0, 24), 'franja')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        # mecha fina emoldurando o rosto e caindo na frente do ombro
        c('cabeca', f'mecha_frente_{lado}', [x(3.55, 4.5)[0], 18.5, -4.2], [x(3.55, 4.5)[1], 30.6, -2.8], 'cabelo_longo')
        c('cabeca', f'volume_{lado}', [x(4.2, 5.3)[0], 12, -2], [x(4.2, 5.3)[1], 31, 3.6], 'cabelo_longo')
        # brincos: argola de ouro e gota vermelha
        c('cabeca', f'brinco_ouro_{lado}', [x(4.05, 4.45)[0], 25.4, -0.25], [x(4.05, 4.45)[1], 26, 0.25], 'ouro')
        c('cabeca', f'brinco_gota_{lado}', [x(4, 4.5)[0], 24, -0.35], [x(4, 4.5)[1], 25.4, 0.35], 'rubi')
        c('cabeca', f'brinco_franja_{lado}', [x(4.15, 4.35)[0], 23, -0.1], [x(4.15, 4.35)[1], 24, 0.1], 'ouro')
    # cabelo das costas em mechas de comprimentos diferentes (solto e ondulado)
    for i, (fim, fim2) in enumerate(((7, 10), (4, 7), (2, 5), (3, 8), (6, 11))):
        x0 = -5 + i * 2
        dz = 0.35 * (i % 2)
        c('cabeca', f'costas_{i}', [x0, fim, 3.6 + dz], [x0 + 2.05, 31, 5 + dz], 'cabelo_longo')
        c('cabeca', f'costas_fundo_{i}', [x0 + 0.2, fim2, 5 + dz], [x0 + 1.85, 27, 5.9 + dz], 'cabelo_longo')
    # coroa trançada do lado esquerdo, indo da têmpora até atrás da cabeça
    for i in range(6):
        zc = -2.6 + i * 1.15
        yc = 31.2 + (0.35 if i % 2 else 0)
        c('cabeca', f'tranca_{i}', [-4.75, yc - 0.6, zc - 0.6], [-3.9, yc + 0.6, zc + 0.6], 'tranca')
    # tiara: correntinhas da têmpora até o centro da testa, com a joia azul pendurada
    g('cabeca', 'tiara_esq', (-1.85, 30.15, -4.5), (3.9, 0.35, 0.3), (0, 0, -14), 'ouro')
    g('cabeca', 'tiara_dir', (1.85, 30.15, -4.5), (3.9, 0.35, 0.3), (0, 0, 14), 'ouro')
    c('cabeca', 'tiara_engaste', [-0.5, 29.75, -4.6], [0.5, 30.1, -4.4], 'ouro')
    c('cabeca', 'tiara_joia', [-0.32, 29.05, -4.6], [0.32, 29.75, -4.42], 'safira')
    c('cabeca', 'tiara_pingo', [-0.12, 28.7, -4.55], [0.12, 29.05, -4.45], 'ouro')

    pintar(m)
    animacoes(m)
    return m


def pintar(m):
    def mat(*nomes):
        return m.material(*nomes)

    @mat('pele')
    def _(p, c_):
        p.preencher(PELE, forca=1)

    @mat('braco')
    def _(p, c_):
        p.preencher(PELE, misturar(PELE, (255, 255, 255), 0.2), misturar(PELE, (220, 160, 150), 0.35), forca=1)

    @mat('rosto')
    def _(p, c_):
        p.preencher(PELE, forca=1)
        if p.face == 'north':
            p.desenho([
                'hhhh........hhhh',
                'hhh..........hhh',
                'hh............hh',
                'h..............h',
                '................',
                '................',
                '...bbb....bbb...',
                '..LLLL....LLLL..',
                '.LwSIw....wISwL.',
                '..wIJw....wJIw..',
                '...ll......ll...',
                '.ppp...nn...ppp.',
                '..pp........pp..',
                '.......MM.......',
                '................',
                '................',
            ], {'h': CABELO, 'b': misturar(PELE, (176, 136, 120), 0.5), 'L': (70, 52, 70), 'S': (255, 255, 255),
                'I': OLHO, 'J': OLHO_CLARO, 'w': (250, 250, 255), 'l': misturar((70, 52, 70), PELE, 0.6),
                'p': misturar(PELE, (240, 140, 156), 0.42), 'n': misturar(PELE, (190, 130, 120), 0.18),
                'M': (222, 104, 122)})
        elif p.face in ('east', 'west', 'south', 'up'):
            limite = p.h if p.face in ('up', 'south') else 9
            for yy in range(limite):
                for xx in range(p.w):
                    p.px(xx, yy, ruido(CABELO, 3))

    def cabelo(p, ondas=True):
        """Cabelo platinado com fios finos, reflexos lilás/dourado/rosa e ondas."""
        for yy in range(p.h):
            for xx in range(p.w):
                if p.face in ('up', 'down'):
                    cor = misturar(CABELO, CABELO_LUZ, 0.2)
                else:
                    onda = (xx + (yy // 4) % 2) if ondas else xx
                    cor = CABELO
                    if onda % 5 == 0:
                        cor = misturar(CABELO, CABELO_SOMBRA, 0.55)
                    elif onda % 7 == 3:
                        cor = CABELO_LUZ
                    elif onda % 9 == 5:
                        cor = CABELO_ROSA
                    cor = misturar(cor, CABELO_SOMBRA, (yy / max(1, p.h - 1)) * 0.3)
                    if yy == int(p.h * 0.12) and xx % 4:
                        cor = (255, 252, 240)  # brilho
                p.px(xx, yy, ruido(cor, 2))

    @mat('cabelo', 'franja')
    def _(p, c_):
        cabelo(p, ondas=False)
        if c_['mat'] == 'franja' and p.face == 'north':
            for xx in range(p.w):
                if xx % 3 == 1:
                    p.apagar(xx, p.h - 1)

    @mat('cabelo_longo')
    def _(p, c_):
        cabelo(p)
        if p.lateral:  # pontas onduladas
            for xx in range(p.w):
                corte = (xx // 2) % 3
                for yy in range(p.h - corte, p.h):
                    p.apagar(xx, yy)

    @mat('tranca')
    def _(p, c_):
        for yy in range(p.h):
            for xx in range(p.w):
                cor = CABELO_LUZ if (xx + yy) % 3 == 0 else CABELO if (xx + yy) % 3 == 1 else CABELO_SOMBRA
                p.px(xx, yy, cor)

    @mat('blusa')
    def _(p, c_):
        p.preencher(BRANCO, (255, 255, 255), BRANCO_SOMBRA, forca=1)
        if p.lateral:
            for xx in range(2, p.w, 4):
                p.linha_v(xx, misturar(BRANCO, BRANCO_SOMBRA, 0.4))
        if c_['nome'] == 'tronco' and p.face in ('east', 'west'):  # ombro de fora
            for yy in range(0, 3):
                for xx in range(p.w):
                    p.px(xx, yy, PELE)
        if c_['nome'] == 'busto' and p.face == 'north':
            p.linha_h(p.h - 1, BRANCO_SOMBRA)

    @mat('renda')
    def _(p, c_):
        for yy in range(p.h):
            for xx in range(p.w):
                p.px(xx, yy, BRANCO if (xx + yy) % 2 else (236, 232, 246))
        p.linha_h(p.h - 1, (230, 226, 240))
        for xx in range(0, p.w, 2):
            p.apagar(xx, 0)  # babadinho no alto

    @mat('manga')
    def _(p, c_):
        p.preencher(BRANCO, (255, 255, 255), BRANCO_SOMBRA, forca=1)
        if p.lateral:
            for xx in range(1, p.w, 3):
                p.linha_v(xx, misturar(BRANCO, BRANCO_SOMBRA, 0.5))
            if p.face in ('east', 'west'):  # fenda da manga mostrando o braço
                for yy in range(2, p.h - 1):
                    for xx in range(p.w // 2 - 1, p.w // 2 + 1):
                        p.apagar(xx, yy)

    @mat('corpete')
    def _(p, c_):
        p.preencher(OURO, OURO_CLARO, OURO_ESC, forca=2)
        if p.face == 'north' and p.h >= 5:  # arabescos em espiral
            espiral = ['.eee.', 'e...e', 'e.e.e', 'e.ee.', '.e...']
            p.desenho(espiral, {'e': OURO_ESC}, ox=p.w // 2 - 2, oy=1)
            p.linha_h(0, OURO_CLARO)
            p.linha_h(p.h - 1, OURO_ESC)

    @mat('saia')
    def _(p, c_):
        for yy in range(p.h):
            for xx in range(p.w):
                cor = ROSA if (xx % 3) else misturar(ROSA, ROSA_ESC, 0.35)
                if xx % 3 == 1:
                    cor = misturar(ROSA, ROSA_CLARO, 0.4)
                p.px(xx, yy, ruido(cor, 2))

    @mat('sobressaia')
    def _(p, c_):
        for yy in range(p.h):
            for xx in range(p.w):
                cor = BRANCO if xx % 3 else misturar(BRANCO, BRANCO_SOMBRA, 0.6)
                p.px(xx, yy, ruido(cor, 1))

    @mat('barra')
    def _(p, c_):
        p.preencher(ROSA, ROSA_CLARO, ROSA_ESC, forca=2)
        if p.lateral:
            p.linha_h(p.h - 1, OURO)
            for xx in range(0, p.w, 3):
                p.px(xx, 0, BRANCO)

    @mat('ouro')
    def _(p, c_):
        p.preencher(OURO, OURO_CLARO, OURO_ESC, forca=2)

    @mat('rubi', 'safira')
    def _(p, c_):
        cor = RUBI if c_['mat'] == 'rubi' else SAFIRA
        p.preencher(cor, misturar(cor, (255, 255, 255), 0.45), misturar(cor, (0, 0, 0), 0.3), forca=1)
        p.px(0, 0, (255, 255, 255))

    @mat('sapatilha')
    def _(p, c_):
        p.preencher(BRANCO, forca=1)
        if p.face == 'up':
            p.linha_h(0, OURO)


def main():
    os.makedirs(SAIDA, exist_ok=True)
    m = modelo()
    png = m.montar_textura()
    with open(os.path.join(SAIDA, 'aelia.bbmodel'), 'w', encoding='utf-8') as f:
        json.dump(m.bbmodel(), f, ensure_ascii=False, indent=1)
    with open(os.path.join(SAIDA, 'aelia.png'), 'wb') as f:
        f.write(png)
    print('aelia', len(m.cubos), 'cubos')


if __name__ == '__main__':
    main()
