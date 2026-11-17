#!/usr/bin/env python3
"""Quatro NPCs de uma família nobre romana (só os modelos, para o Blockbench).

  Aurélia   a matrona (mãe): stola roxa, palla dourada, coroa de cachos altos e diadema
  Lívia     a filha mais velha: stola azul, palla branca, cabelo preto liso até a cintura
  Cornélia  a irmã: stola rosa, cachos loiros ondulados e coroa de flores
  Júlia     a prima: stola verde, trança ruiva caindo pela frente do ombro e sardas

Estilo: corpo esguio (ombros estreitos, braços finos, cintura marcada e vestido em "A"),
cabeça com rosto em resolução dobrada (16 x 16: olhos grandes com cílios e brilho) e
cabelo em camadas 3D (franja, mechas que emolduram o rosto e volume atrás).

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
D = 2  # densidade da textura: 2 pixels por unidade


def nobre(nome, semente, pele, cabelo, olhos, stola, palla, cabelos, joia=(60, 150, 220)):
    m = Modelo(nome, tex=256, semente=semente)
    o = m.osso
    o('raiz', None, [0, 0, 0])
    o('perna_dir', 'raiz', [1.2, 12, 0])
    o('perna_esq', 'raiz', [-1.2, 12, 0])
    o('corpo', 'raiz', [0, 12, 0])
    o('cabeca', 'corpo', [0, 24, 0])
    o('braco_dir', 'corpo', [4, 22.5, 0])
    o('braco_esq', 'corpo', [-4, 22.5, 0])

    def c(osso, nome_c, de, ate, mat, sem=()):
        m.cubo(osso, nome_c, de, ate, mat, sem=sem, ds=D)

    # ---- corpo esguio: tronco estreito, pescoço, busto discreto e cinto sob o busto
    c('corpo', 'tronco', [-3, 12, -1.5], [3, 23, 1.5], 'tronco')
    c('corpo', 'pescoco', [-1, 23, -1], [1, 24.2, 1], 'pele')
    c('corpo', 'busto', [-2.6, 18.4, -2.05], [2.6, 20.9, -1.5], 'busto', sem=('up',))
    c('corpo', 'cinto', [-3.15, 17.6, -2.1], [3.15, 18.4, 1.65], 'ouro')
    # ---- vestido em "A": cada faixa um pouco mais larga até a barra bordada
    c('corpo', 'saia_1', [-3.3, 9, -1.8], [3.3, 13, 1.8], 'saia')
    c('corpo', 'saia_2', [-3.65, 5, -2.1], [3.65, 9, 2.1], 'saia')
    c('corpo', 'saia_3', [-4, 1, -2.4], [4, 5, 2.4], 'saia')
    c('corpo', 'barra', [-4.3, 0, -2.7], [4.3, 1.2, 2.7], 'barra')
    # ---- palla: cruza o peito na diagonal, cobre o ombro esquerdo e cai pelas costas
    m.cubo_girado('corpo', 'palla_frente', [0.4, 16.4, -2.3], [1.4, 11, 0.35], [0, 0, -36], 'palla', ds=D)
    c('corpo', 'palla_costas', [-3.2, 7, 1.6], [3.2, 22.8, 2.3], 'palla')
    c('braco_esq', 'palla_ombro', [-5.3, 20.2, -1.3], [-2.7, 23.5, 1.3], 'palla')
    # ---- joias
    c('corpo', 'colar', [-1.6, 22.4, -1.75], [1.6, 23, -1.55], 'ouro')
    c('corpo', 'pingente', [-0.4, 21.5, -1.8], [0.4, 22.4, -1.6], 'joia')
    # ---- braços finos com manguinha e pulseira; pés aparecendo na barra
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        b = f'braco_{lado}'
        c(b, f'braco_{lado}', [x(3, 5)[0], 12.5, -1], [x(3, 5)[1], 23, 1], 'braco')
        c(b, f'manga_{lado}', [x(2.8, 5.2)[0], 20.6, -1.2], [x(2.8, 5.2)[1], 23.3, 1.2], 'manga')
        c(b, f'pulseira_{lado}', [x(2.85, 5.15)[0], 14.4, -1.15], [x(2.85, 5.15)[1], 15, 1.15], 'ouro')
        p = f'perna_{lado}'
        c(p, f'perna_{lado}', [x(0.2, 2.2)[0], 1, -1], [x(0.2, 2.2)[1], 12, 1], 'saia')
        c(p, f'pe_{lado}', [x(0.3, 2.3)[0], 0, -3.1], [x(0.3, 2.3)[1], 0.8, 0.6], 'sandalia')
        c('cabeca', f'brinco_{lado}', [x(4, 4.35)[0], 24.6, -0.3], [x(4, 4.35)[1], 26.2, 0.3], 'joia')
    c('cabeca', 'cabeca', [-4, 24, -4], [4, 32, 4], 'rosto')
    for item in cabelos():
        osso, nome_c, de, ate, mat = item[:5]
        extra = item[5] if len(item) > 5 else {}
        if 'rot' in extra:  # de = centro, ate = tamanho
            m.cubo_girado(osso, nome_c, de, ate, extra['rot'], mat, sem=extra.get('sem', ()), ds=D)
        else:
            c(osso, nome_c, de, ate, mat, sem=extra.get('sem', ()))

    pintar(m, nome, pele, cabelo, olhos, stola, palla, joia)
    animacoes(m)
    return m


# =================================================================== pintura
def pintar(m, nome, pele, cabelo, olhos, stola, palla, joia):
    base, claro, escuro = stola
    cab_claro = misturar(cabelo, (255, 255, 255), 0.28)
    cab_esc = misturar(cabelo, (0, 0, 0), 0.35)

    @m.material('pele')
    def _(p, c_):
        p.preencher(pele, forca=1)

    @m.material('braco')
    def _(p, c_):
        p.preencher(pele, misturar(pele, (255, 255, 255), 0.15), misturar(pele, (120, 70, 50), 0.25), forca=1)

    @m.material('rosto')
    def _(p, c_):
        p.preencher(pele, forca=1)
        if p.face == 'north':
            p.desenho([
                'hhhhhhhhhhhhhhhh',
                'hhhhhhhhhhhhhhhh',
                'hhhhhhhhhhhhhhhh',
                'hhhhhhhhhhhhhhhh',
                'hh............hh',
                'h..............h',
                '...bbb....bbb...',
                '..LLLL....LLLL..',
                '.LwSIw....wISwL.',
                '..wIIw....wIIw..',
                '...ll......ll...',
                '..pp...nn...pp..',
                '................',
                '.......MM.......',
                '................',
                '................',
            ], {'h': cabelo, 'b': misturar(cabelo, pele, 0.35), 'L': (44, 26, 32), 'S': (255, 255, 255),
                'I': olhos, 'w': (246, 246, 250), 'l': misturar((44, 26, 32), pele, 0.55),
                'p': misturar(pele, (240, 120, 130), 0.3), 'n': misturar(pele, (150, 90, 70), 0.18),
                'M': misturar(pele, (200, 70, 90), 0.6)})
            if nome == 'julia':  # sardas
                for x, y in ((2, 12), (4, 12), (11, 12), (13, 12), (3, 11), (12, 11)):
                    p.px(x, y, misturar(pele, (170, 100, 60), 0.35))
        elif p.face in ('east', 'west', 'south', 'up'):
            limite = p.h if p.face in ('up', 'south') else 9
            for yy in range(limite):
                for xx in range(p.w):
                    p.px(xx, yy, ruido(cabelo, 5))

    def fios(p, cor, cor_claro, cor_esc, pontas=False):
        """Cabelo com fios verticais e uma faixa de brilho, como em desenho animado."""
        brilho = int(p.h * 0.2)
        for yy in range(p.h):
            for xx in range(p.w):
                if p.face == 'up':
                    c = misturar(cor, cor_claro, 0.12)
                else:
                    c = misturar(cor, cor_esc, ((xx * 7) % 5) / 9)  # fios finos
                    if p.lateral and yy == brilho and xx % 5 != 0:
                        c = misturar(c, cor_claro, 0.45)  # brilho de anime
                    c = misturar(c, cor_esc, yy / max(1, p.h - 1) * 0.25)
                p.px(xx, yy, ruido(c, 2))
        if pontas and p.lateral:
            for xx in range(p.w):
                if xx % 2:
                    p.apagar(xx, p.h - 1)

    @m.material('cabelo')
    def _(p, c_):
        fios(p, cabelo, cab_claro, cab_esc, pontas=c_['de'][1] < 24)

    @m.material('franja')
    def _(p, c_):
        fios(p, cabelo, cab_claro, cab_esc)
        if p.face == 'north':  # pontas da franja irregulares
            for xx in range(p.w):
                if xx % 3 == 1:
                    p.apagar(xx, p.h - 1)

    @m.material('cachos')
    def _(p, c_):
        for yy in range(p.h):
            for xx in range(p.w):
                dx, dy = (xx % 4) - 1.5, ((yy + (xx // 4) * 2) % 4) - 1.5
                d = (dx * dx + dy * dy) ** 0.5
                c = misturar(cabelo, cab_claro, 0.35) if d < 1 else cabelo if d < 1.9 else misturar(cabelo, cab_esc, 0.3)
                p.px(xx, yy, ruido(c, 4))

    @m.material('tronco')
    def _(p, c_):
        p.preencher(base, claro, escuro, forca=2)
        if p.face == 'north':  # decote em V com acabamento dourado
            for yy, (a, b) in enumerate(((3, 9), (4, 8), (5, 7))):
                for xx in range(a, b):
                    p.px(xx, yy, pele)
                p.px(a - 1, yy, OURO)
                p.px(b, yy, OURO)
        if p.lateral:
            for xx in range(2, p.w, 4):
                p.linha_v(xx, misturar(base, escuro, 0.3))

    @m.material('busto')
    def _(p, c_):
        p.preencher(base, claro, escuro, forca=2)
        if p.face == 'north':
            p.linha_h(0, claro)
            p.linha_h(p.h - 1, misturar(base, escuro, 0.5))

    @m.material('saia', 'manga')
    def _(p, c_):
        for yy in range(p.h):  # tecido liso, sem faixa clara no alto (o vestido parece uma peça só)
            for xx in range(p.w):
                p.px(xx, yy, ruido(base if p.face != 'down' else escuro, 2))
        if p.lateral:  # pregas
            for xx in range(1, p.w, 3):
                p.linha_v(xx, misturar(base, escuro, 0.3))
                if xx + 1 < p.w:
                    p.linha_v(xx + 1, misturar(base, claro, 0.25))
            if c_['mat'] == 'manga':
                p.linha_h(p.h - 1, OURO)

    @m.material('barra')
    def _(p, c_):
        p.preencher(base, claro, escuro, forca=2)
        if p.lateral:  # instita: barra bordada com ondas gregas douradas
            onda = ['oooo.', 'o..o.', 'o.oo.']
            for yy in range(min(3, p.h)):
                for xx in range(p.w):
                    if onda[yy][xx % 5] == 'o':
                        p.px(xx, yy, OURO)
            p.linha_h(p.h - 1, OURO_ESC)

    @m.material('palla')
    def _(p, c_):
        p.preencher(palla, misturar(palla, (255, 255, 255), 0.3), misturar(palla, (0, 0, 0), 0.3), forca=2)
        if p.lateral:
            for xx in range(0, p.w, 3):
                p.linha_v(xx, misturar(palla, (0, 0, 0), 0.14))
            p.linha_h(p.h - 1, OURO)
            if p.h > 4:
                for xx in range(0, p.w, 2):
                    p.px(xx, p.h - 2, OURO_CLARO)

    @m.material('ouro')
    def _(p, c_):
        p.preencher(OURO, OURO_CLARO, OURO_ESC, forca=2)

    @m.material('joia')
    def _(p, c_):
        p.preencher(joia, misturar(joia, (255, 255, 255), 0.4), misturar(joia, (0, 0, 0), 0.3), forca=2)
        p.px(0, 0, (255, 255, 255))

    @m.material('sandalia')
    def _(p, c_):
        p.preencher((150, 104, 66), forca=2)
        if p.face in ('up', 'north'):
            for yy in range(0, p.h, 2):
                p.linha_h(yy, OURO)

    @m.material('diadema')
    def _(p, c_):
        p.preencher(OURO_CLARO, OURO_CLARO, OURO, forca=2)
        if p.face == 'north':
            for xx in range(1, p.w, 4):
                p.px(xx, 0, (200, 30, 70))

    @m.material('perolas')
    def _(p, c_):
        for yy in range(p.h):
            for xx in range(p.w):
                p.px(xx, yy, (250, 248, 240) if (xx + yy) % 2 == 0 else (210, 206, 220))

    @m.material('flores')
    def _(p, c_):
        p.preencher((80, 150, 70), forca=3)
        cores = [(250, 250, 250), (244, 130, 170), (255, 220, 90), (244, 130, 170)]
        for xx in range(0, p.w, 2):
            for yy in range(p.h):
                p.px(xx, yy, cores[(xx // 2) % 4])

    @m.material('fita')
    def _(p, c_):
        p.preencher(misturar(base, claro, 0.3), forca=2)
        p.linha_h(0, OURO)


def animacoes(m):
    m.animacoes = {
        'parado': dict(loop='loop', length=4.0, bones={
            'corpo': {'rotation': [(0, [0, 0, 0]), (2, [0, 0, 1.5]), (4, [0, 0, 0])]},
            'cabeca': {'rotation': [(0, [0, 0, 3]), (1.2, [0, 10, 6]), (2.6, [2, -8, -2]), (4, [0, 0, 3])]},
            'braco_esq': {'rotation': [(0, [10, 0, -5])]},
            'braco_dir': {'rotation': [(0, [0, 0, 4]), (2, [4, 0, 6]), (4, [0, 0, 4])]},
        }),
        'andar': dict(loop='loop', length=1.2, bones={
            'perna_dir': {'rotation': [(0, [16, 0, 0]), (0.6, [-16, 0, 0]), (1.2, [16, 0, 0])]},
            'perna_esq': {'rotation': [(0, [-16, 0, 0]), (0.6, [16, 0, 0]), (1.2, [-16, 0, 0])]},
            'braco_dir': {'rotation': [(0, [-14, 0, 5]), (0.6, [14, 0, 5]), (1.2, [-14, 0, 5])]},
            'braco_esq': {'rotation': [(0, [14, 0, -5]), (0.6, [6, 0, -5]), (1.2, [14, 0, -5])]},
            'corpo': {'rotation': [(0, [0, -5, -1.5]), (0.6, [0, 5, 1.5]), (1.2, [0, -5, -1.5])],
                      'position': [(0, [0, 0, 0]), (0.3, [0, 0.35, 0]), (0.6, [0, 0, 0]), (0.9, [0, 0.35, 0]), (1.2, [0, 0, 0])]},
            'cabeca': {'rotation': [(0, [0, 4, 0]), (0.6, [0, -4, 0]), (1.2, [0, 4, 0])]},
        }),
        'acenar': dict(loop='loop', length=1.4, bones={
            'braco_dir': {'rotation': [(0, [0, 0, 150]), (0.35, [0, 0, 166]), (0.7, [0, 0, 146]), (1.05, [0, 0, 166]), (1.4, [0, 0, 150])]},
            'cabeca': {'rotation': [(0, [0, 0, 8])]},
            'braco_esq': {'rotation': [(0, [10, 0, -5])]},
        }),
        'conversar': dict(loop='loop', length=2.4, bones={
            'braco_dir': {'rotation': [(0, [30, 0, 4]), (0.6, [48, -20, 8]), (1.2, [36, 10, 4]), (1.8, [50, -10, 6]), (2.4, [30, 0, 4])]},
            'braco_esq': {'rotation': [(0, [10, 0, -5]), (1.2, [26, 14, -6]), (2.4, [10, 0, -5])]},
            'cabeca': {'rotation': [(0, [4, 0, 4]), (0.6, [-2, 8, 6]), (1.2, [5, -4, -2]), (1.8, [0, 6, 4]), (2.4, [4, 0, 4])]},
            'corpo': {'rotation': [(0, [0, 0, 0]), (1.2, [0, 4, 0]), (2.4, [0, 0, 0])]},
        }),
    }


SEM_FRENTE = {'sem': ('north', 'down')}


def capa():
    return ('cabeca', 'cabelo_capa', [-4.3, 26.5, -4.3], [4.3, 32.4, 4.3], 'cabelo', SEM_FRENTE)


# =================================================================== as quatro
def aurelia():
    def cabelos():
        itens = [
            capa(),
            ('cabeca', 'coroa_cachos', [-4.4, 30.6, -4.7], [4.4, 34.2, -2.2], 'cachos'),
            ('cabeca', 'cachos_topo', [-3.4, 34.2, -4.2], [3.4, 35.2, -2.6], 'cachos'),
            ('cabeca', 'coque', [-2, 26.5, 4.1], [2, 30.5, 6.6], 'cachos'),
            ('cabeca', 'diadema', [-4.5, 30.3, -4.85], [4.5, 31, -4.5], 'diadema'),
        ]
        for lado in ('dir', 'esq'):
            x = espelho(lado)
            itens.append(('cabeca', f'mecha_{lado}', [x(3.9, 4.6)[0], 25.5, -4.3], [x(3.9, 4.6)[1], 30.8, -1.5], 'cabelo'))
        return itens
    return nobre('aurelia', 11, (236, 196, 168), (88, 54, 34), (110, 70, 40),
                 ((112, 40, 120), (150, 70, 160), (70, 22, 80)), (224, 172, 64), cabelos, joia=(196, 30, 70))


def livia():
    def cabelos():
        itens = [
            capa(),
            ('cabeca', 'franja', [-4.3, 29.2, -4.6], [4.3, 32.4, -4], 'franja'),
            ('cabeca', 'cabelo_costas', [-4.4, 13, 3.9], [4.4, 31, 5.1], 'cabelo'),
            ('cabeca', 'tiara', [-4.5, 32.2, -3], [4.5, 32.8, -2.2], 'perolas'),
        ]
        for lado in ('dir', 'esq'):
            x = espelho(lado)
            itens.append(('cabeca', f'mecha_{lado}', [x(3.9, 4.7)[0], 17.5, -4.2], [x(3.9, 4.7)[1], 31, -1], 'cabelo'))
        return itens
    return nobre('livia', 23, (222, 176, 136), (28, 22, 26), (70, 46, 40),
                 ((40, 70, 150), (74, 110, 192), (22, 40, 100)), (238, 234, 226), cabelos)


def cornelia():
    def cabelos():
        itens = [
            capa(),
            ('cabeca', 'franja_lado', [-0.5, 30.9, -4.35], [7.8, 2.6, 0.6], 'franja', {'rot': [0, 0, 8]}),
            ('cabeca', 'cachos_costas', [-4.5, 17, 3.9], [4.5, 31, 5.4], 'cachos'),
            ('cabeca', 'coroa_flores', [-4.6, 31.7, -4.6], [4.6, 32.5, 4.6], 'flores', {'sem': ('down',)}),
        ]
        for lado in ('dir', 'esq'):
            x = espelho(lado)
            for i, (y0, y1, a, b) in enumerate(((29, 31.2, 3.9, 5), (26.8, 29.2, 4.1, 5.3), (24.4, 27, 3.9, 5.1), (22, 24.6, 4.2, 5.4))):
                itens.append(('cabeca', f'cacho_{lado}_{i}', [x(a, b)[0], y0, -3.6], [x(a, b)[1], y1, -0.4], 'cachos'))
        return itens
    return nobre('cornelia', 37, (240, 204, 178), (236, 196, 108), (70, 140, 200),
                 ((206, 92, 118), (236, 136, 156), (146, 52, 74)), (244, 208, 214), cabelos)


def julia():
    def cabelos():
        itens = [
            capa(),
            ('cabeca', 'franja', [-4.3, 29.4, -4.6], [4.3, 32.4, -4], 'franja'),
            ('cabeca', 'mecha_esq', [-4.7, 24, -4.2], [-3.9, 31, -1.2], 'cabelo'),
            ('cabeca', 'mecha_dir', [3.9, 23.5, -2.6], [4.7, 30.5, 0.6], 'cabelo'),
            ('cabeca', 'fita', [-4.45, 30.4, -4.5], [4.45, 31, 4.45], 'fita', {'sem': ('down',)}),
        ]
        # trança grossa caindo pela frente do ombro direito
        for i in range(7):
            w = 0.8 if i % 2 else 0.65
            cx, cy, cz = 3.2 - i * 0.18, 23 - i * 1.4, -1.9 - i * 0.06
            itens.append(('corpo', f'tranca_{i}', [cx - w, cy - 0.8, cz - 0.65], [cx + w, cy + 0.8, cz + 0.65], 'cabelo'))
        itens.append(('corpo', 'laco', [1.2, 12.6, -3], [3.6, 13.6, -1.8], 'ouro'))
        return itens
    return nobre('julia', 41, (240, 200, 170), (184, 74, 36), (60, 140, 80),
                 ((40, 124, 84), (72, 164, 114), (20, 76, 48)), (206, 156, 74), cabelos, joia=(60, 180, 110))


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
