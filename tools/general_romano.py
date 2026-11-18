"""Armadura do General Romano (4 peças vestíveis em 3D) e a skin do general.

As peças são "attachables" do Bedrock: cada osso tem o nome de um osso do jogador
(head, body, rightArm, leftArm, rightLeg, leftLeg) e acompanha os movimentos dele.
Coordenadas internas do Blockbench (direita do jogador = +X); a exportação espelha o X.
"""
import io

from PIL import Image, ImageDraw

from mc_lib import Modelo, espelho, misturar, ruido, rng

OURO, OURO_CLARO, OURO_ESC = (232, 180, 64), (255, 226, 130), (150, 100, 30)
VERM, VERM_CLARO, VERM_ESC = (170, 28, 30), (214, 60, 52), (100, 14, 18)
BRANCO = (236, 230, 214)
COURO, COURO_ESC = (110, 68, 38), (66, 40, 22)

OSSOS_JOGADOR = {
    'head': [0, 24, 0], 'body': [0, 24, 0], 'rightArm': [5, 22, 0], 'leftArm': [-5, 22, 0],
    'rightLeg': [1.9, 12, 0], 'leftLeg': [-1.9, 12, 0],
}


def base(nome, ossos):
    m = Modelo(nome, tex=128, semente=len(nome) * 7)
    for o in ossos:
        m.osso(o, None, OSSOS_JOGADOR[o])
    return m


def pintores(m):
    @m.material('ouro')
    def _(p, c):
        p.preencher(OURO, OURO_CLARO, OURO_ESC, forca=4)
        if p.lateral and p.h >= 3:
            p.linha_h(0, OURO_CLARO)

    @m.material('vermelho')
    def _(p, c):
        p.preencher(VERM, VERM_CLARO, VERM_ESC, forca=4)

    @m.material('crista')
    def _(p, c):
        for yy in range(p.h):
            for xx in range(p.w):
                cor = misturar(VERM_CLARO, VERM_ESC, yy / max(1, p.h - 1) * 0.7)
                if (xx * 2 + yy) % 3 == 0:
                    cor = misturar(cor, (240, 110, 90), 0.35)
                p.px(xx, yy, ruido(cor, 6))

    @m.material('couro')
    def _(p, c):
        p.preencher(COURO, forca=4)


# =================================================================== ELMO
def elmo():
    m = base('elmo_general', ['head'])
    pintores(m)
    c = m.cubo
    c('head', 'calota', [-4.6, 28.2, -4.6], [4.6, 32.8, 4.6], 'calota')
    c('head', 'diadema', [-4.8, 29.2, -5], [4.8, 30.4, -4.5], 'diadema')
    c('head', 'cupula', [-4, 32.8, -4], [4, 33.8, 4], 'ouro')
    c('head', 'nuca', [-4.6, 26.2, 4.4], [4.6, 28.4, 5.8], 'ouro')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        c('head', f'bochecheira_{lado}', [x(3.9, 4.8)[0], 24.6, -4.4], [x(3.9, 4.8)[1], 28.4, -0.4], 'bochecheira')
        c('head', f'crista_ponta_{lado}', [x(6, 6.8)[0], 33.2, -0.9], [x(6, 6.8)[1], 37.4, 0.9], 'crista')
    # crista transversal (de orelha a orelha), sinal de comando
    c('head', 'suporte', [-5.6, 33.8, -0.8], [5.6, 34.6, 0.8], 'ouro')
    c('head', 'crista', [-6, 34.6, -1], [6, 38, 1], 'crista')
    c('head', 'crista_topo', [-5.2, 38, -0.8], [5.2, 38.8, 0.8], 'crista')

    @m.material('calota')
    def _(p, c_):
        p.preencher(OURO, OURO_CLARO, OURO_ESC, forca=4)
        if p.face == 'north':  # deixa o rosto à mostra
            for yy in range(2, p.h):
                for xx in range(p.w):
                    p.apagar(xx, yy)
        elif p.face in ('east', 'west'):  # recorte da orelha
            for yy in range(3, p.h):
                for xx in range(p.w // 2 - 1, p.w // 2 + 1):
                    p.apagar(xx, yy)

    @m.material('diadema')
    def _(p, c_):
        p.preencher(OURO_CLARO, forca=3)
        if p.face == 'north':
            for xx in range(0, p.w, 2):
                p.px(xx, 0, (40, 120, 200))  # pedrinhas azuis
            p.px(p.w // 2, 0, VERM)

    @m.material('bochecheira')
    def _(p, c_):
        p.preencher(OURO, OURO_CLARO, OURO_ESC, forca=4)
        if p.lateral:
            p.px(p.w // 2, p.h // 2, OURO_ESC)
            p.px(p.w // 2, p.h // 2 - 1, OURO_CLARO)
    return m


# =================================================================== COURAÇA (peito, ombros e capa)
def couraca():
    m = base('couraca_general', ['body', 'rightArm', 'leftArm'])
    m.osso('capa', 'body', [0, 24, 3])
    pintores(m)
    c = m.cubo
    c('body', 'couraca', [-4.6, 15.4, -2.7], [4.6, 24.3, 2.7], 'musculos')
    c('body', 'faixa', [-4.8, 16.6, -2.9], [4.8, 17.6, 2.9], 'vermelho')
    c('body', 'no_faixa', [-1, 15.4, -3.3], [1, 17.6, -2.8], 'vermelho')
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        c('body', f'fibula_{lado}', [x(2.9, 4.2)[0], 22.8, -3.1], [x(2.9, 4.2)[1], 24.1, -2.6], 'ouro')
        braco = 'rightArm' if lado == 'dir' else 'leftArm'
        c(braco, f'ombreira_{lado}', [x(3.6, 8.6)[0], 20.6, -2.7], [x(3.6, 8.6)[1], 24.6, 2.7], 'ouro')
        c(braco, f'tiras_{lado}', [x(3.7, 8.5)[0], 17.6, -2.55], [x(3.7, 8.5)[1], 20.6, 2.55], 'tiras', sem=('up', 'down'))
        c(braco, f'bracelete_{lado}', [x(3.7, 8.3)[0], 12.6, -2.3], [x(3.7, 8.3)[1], 15.6, 2.3], 'ouro')
    c('capa', 'capa', [-5, 6, 2.9], [5, 24.4, 3.9], 'capa')
    c('capa', 'capa_ombros', [-5.2, 22.4, 2.1], [5.2, 24.8, 4.1], 'capa')

    @m.material('musculos')
    def _(p, c_):
        p.preencher(OURO, OURO_CLARO, OURO_ESC, forca=3)
        if p.face == 'north':  # couraça anatômica: peitorais, abdômen e águia
            sombra, brilho = OURO_ESC, OURO_CLARO
            p.desenho([
                '.........',
                '.bbb.bbb.',
                '.b.s.s.b.',
                '..sss.s..',
                '....s....',
                '..bs.sb..',
                '..ss.ss..',
                '..bs.sb..',
                '..ss.ss..',
            ], {'b': brilho, 's': sombra})
            p.desenho(['.w.w.', '..w..'], {'w': (250, 250, 240)}, ox=p.w // 2 - 2, oy=1)
        if p.lateral:
            p.linha_h(p.h - 1, OURO_ESC)

    @m.material('tiras')
    def _(p, c_):  # pteruges: tiras de couro branco com ponta dourada, vazadas
        for xx in range(p.w):
            if xx % 2:
                continue
            for yy in range(p.h):
                p.px(xx, yy, OURO if yy == p.h - 1 else ruido(BRANCO, 4))

    @m.material('capa')
    def _(p, c_):
        p.preencher(VERM, VERM_CLARO, VERM_ESC, forca=4)
        if p.lateral:
            for xx in range(1, p.w, 3):
                p.linha_v(xx, misturar(VERM, VERM_ESC, 0.4))
            p.linha_h(p.h - 1, OURO)
            if p.h > 6:
                p.linha_h(p.h - 2, OURO_ESC)
    return m


# =================================================================== SAIOTE (pteruges e barra da túnica)
def saiote():
    m = base('saiote_general', ['body', 'rightLeg', 'leftLeg'])
    pintores(m)
    m.cubo('body', 'cinto', [-4.7, 14.6, -2.8], [4.7, 15.6, 2.8], 'ouro')
    m.cubo('body', 'pteruges', [-4.7, 9.2, -2.8], [4.7, 14.6, 2.8], 'pteruges', sem=('up', 'down'))
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        perna = 'rightLeg' if lado == 'dir' else 'leftLeg'
        m.cubo(perna, f'barra_{lado}', [x(-0.25, 4.15)[0], 8.6, -2.25], [x(-0.25, 4.15)[1], 12, 2.25], 'vermelho')

    @m.material('pteruges')
    def _(p, c_):
        for xx in range(p.w):
            for yy in range(p.h):
                if xx % 2 == 0:
                    cor = OURO if yy == p.h - 1 else (BRANCO if (xx // 2) % 2 else VERM_CLARO)
                    p.px(xx, yy, ruido(cor, 4))
    return m


# =================================================================== GREVAS e sandálias
def grevas():
    m = base('grevas_general', ['rightLeg', 'leftLeg'])
    pintores(m)
    for lado in ('dir', 'esq'):
        x = espelho(lado)
        perna = 'rightLeg' if lado == 'dir' else 'leftLeg'
        m.cubo(perna, f'greva_{lado}', [x(-0.35, 4.25)[0], 2.2, -2.45], [x(-0.35, 4.25)[1], 10, 2.4], 'greva', sem=('up', 'down'))
        m.cubo(perna, f'joelho_{lado}', [x(0.4, 3.5)[0], 9, -2.8], [x(0.4, 3.5)[1], 11, -2.2], 'ouro')
        m.cubo(perna, f'sandalia_{lado}', [x(-0.35, 4.25)[0], 0, -2.6], [x(-0.35, 4.25)[1], 2.2, 2.4], 'sandalia', sem=('up',))

    @m.material('greva')
    def _(p, c_):
        p.preencher(OURO, OURO_CLARO, OURO_ESC, forca=3)
        if p.face == 'south':  # atrás fica aberta (amarrada com tiras)
            for yy in range(p.h):
                for xx in range(p.w):
                    if not (yy % 3 == 1):
                        p.apagar(xx, yy)
        if p.face == 'north':
            p.linha_v(p.w // 2, OURO_CLARO)

    @m.material('sandalia')
    def _(p, c_):
        for yy in range(p.h):
            for xx in range(p.w):
                if yy == p.h - 1 or yy % 2 == 0 or xx == p.w // 2 or p.face == 'down':
                    p.px(xx, yy, ruido(COURO if yy < p.h - 1 else COURO_ESC, 4))
    return m


PECAS = [
    # (construtor, id do item, nome, slot do wearable, variável que esconde a camada do jogador, proteção)
    (elmo, 'batalha:elmo_general', 'Elmo do General', 'slot.armor.head', 'variable.helmet_layer_visible = 0.0;', 4),
    (couraca, 'batalha:couraca_general', 'Couraça do General', 'slot.armor.chest', 'variable.chest_layer_visible = 0.0;', 9),
    (saiote, 'batalha:saiote_general', 'Saiote do General', 'slot.armor.legs', 'variable.leg_layer_visible = 0.0;', 7),
    (grevas, 'batalha:grevas_general', 'Grevas do General', 'slot.armor.feet', 'variable.boot_layer_visible = 0.0;', 4),
]


def attachable(item_id, nome_modelo, setup):
    return {'format_version': '1.10.0', 'minecraft:attachable': {'description': {
        'identifier': item_id,
        'materials': {'default': 'armor', 'enchanted': 'armor_enchanted'},
        'textures': {'default': f'textures/models/armor/{nome_modelo}', 'enchanted': 'textures/misc/enchanted_item_glint'},
        'geometry': {'default': f'geometry.{nome_modelo}'},
        'scripts': {'parent_setup': setup},
        'render_controllers': ['controller.render.armor'],
    }}}


def item_armadura(item_id, nome, slot, protecao, icone):
    enc = {'slot.armor.head': 'armor_head', 'slot.armor.chest': 'armor_torso',
           'slot.armor.legs': 'armor_legs', 'slot.armor.feet': 'armor_feet'}[slot]
    return {'format_version': '1.21.0', 'minecraft:item': {
        'description': {'identifier': item_id, 'menu_category': {'category': 'equipment'}},
        'components': {
            'minecraft:icon': {'textures': {'default': icone}},
            'minecraft:display_name': {'value': f'§6{nome}'},
            'minecraft:max_stack_size': 1,
            'minecraft:wearable': {'slot': slot, 'protection': protecao},
            'minecraft:durability': {'max_durability': 900},
            'minecraft:enchantable': {'slot': enc, 'value': 18},
        }}}


ITEM_SISTEMA = {'format_version': '1.21.0', 'minecraft:item': {
    'description': {'identifier': 'batalha:sistema', 'menu_category': {'category': 'items'}},
    'components': {
        'minecraft:icon': {'textures': {'default': 'sistema'}},
        'minecraft:display_name': {'value': '§b[ Sistema ]'},
        'minecraft:max_stack_size': 1,
        'minecraft:glint': True,
    }}}


ITEM_BASTAO = {'format_version': '1.21.0', 'minecraft:item': {
    'description': {'identifier': 'batalha:bastao', 'menu_category': {'category': 'items'}},
    'components': {
        'minecraft:icon': {'textures': {'default': 'bastao'}},
        'minecraft:display_name': {'value': '§6Bastão do Centurião §7(clique: atacar | agachado: ordens)'},
        'minecraft:max_stack_size': 1,
        'minecraft:hand_equipped': True,
    }}}

# =================================================================== ícones 16 x 16
def _icone(desenho, cores):
    im = Image.new('RGBA', (16, 16), (0, 0, 0, 0))
    for y, linha in enumerate(desenho):
        for x, ch in enumerate(linha):
            if ch in cores:
                im.putpixel((x, y), cores[ch] + (255,))
    buf = io.BytesIO()
    im.save(buf, 'PNG')
    return buf.getvalue()


CORES_ICONE = {'o': OURO, 'c': OURO_CLARO, 'e': OURO_ESC, 'r': VERM, 'R': VERM_ESC, 'w': BRANCO,
               'b': (60, 200, 255), 'B': (20, 90, 200), 'k': (10, 30, 60), 'l': (180, 240, 255), 'm': COURO}
ICONES = {
    'elmo_general': [
        '......rrrr......', '....rrrrrrrr....', '...rRrrrrrrRr...', '......cccc......',
        '....ccooooee....', '...cooooooooe...', '...coooooooee...', '...ce......ee...',
        '...ce......ee...', '...oe......ee...', '...oe......oe...', '....e......e....',
        '................', '................', '................', '................'],
    'couraca_general': [
        '................', '..oo.cccccc.oo..', '.ooocooooooeooo.', '.oooccoeeoceooo.',
        '.oo.cooeeooe.oo.', '.oo.coooeooe.oo.', '....cooeeooe....', '....crrrrrre....',
        '....coeeeeoe....', '....cooeeooe....', '....ceoooooe....', '.....eeeeeee....',
        '................', '................', '................', '................'],
    'saiote_general': [
        '................', '................', '...oooooooooo...', '...eeeeeeeeee...',
        '...w.r.w.r.w.r..', '...w.r.w.r.w.r..', '...w.r.w.r.w.r..', '...w.r.w.r.w.r..',
        '...o.o.o.o.o.o..', '................', '................', '................',
        '................', '................', '................', '................'],
    'grevas_general': [
        '................', '................', '..co......co....', '..coe.....coe...',
        '..coe.....coe...', '..coe.....coe...', '..ooe.....ooe...', '..coe.....coe...',
        '..coe.....coe...', '..coe.....coe...', '..mmm.....mmm...', '.mmmm....mmmm...',
        '................', '................', '................', '................'],
    'bastao': [
        '..............o.', '.............ce.', '............mm..', '...........mm...',
        '..........mm....', '.........mm.....', '........mm......', '.......mm.......',
        '......mm........', '.....mm.........', '....mm..........', '...mm...........',
        '..rr............', '.rR.............', '................', '................'],
    'sistema': [
        '................', '...BBBBBBBBBB...', '..BbbbbbbbbbbB..', '..BbkkkkkkkkbB..',
        '..Bbklbbbbbkb B.', '..BbkbllllbkbB..', '..BbkbbbbbbkbB..', '..BbklllbbbkbB..',
        '..BbkbbbbbbkbB..', '..BbkllllllkbB..', '..BbkkkkkkkkbB..', '..BbbbbbbbbbbB..',
        '...BBBBBBBBBB...', '................', '................', '................'],
}


def icones():
    return {nome: _icone(d, CORES_ICONE) for nome, d in ICONES.items()}


# =================================================================== SKIN do general (64 x 64)
def skin():
    im = Image.new('RGBA', (64, 64), (0, 0, 0, 0))
    PELE, PELE_ESC, PELE_CLARA = (206, 150, 108), (168, 114, 80), (226, 176, 136)
    CAB = (52, 34, 24)
    TUN, TUN_ESC = (150, 26, 28), (104, 16, 20)

    def caixa(u, v, w, h, d, pintor):
        faces = {'top': (u + d, v, w, d), 'bottom': (u + d + w, v, w, d), 'right': (u, v + d, d, h),
                 'front': (u + d, v + d, w, h), 'left': (u + d + w, v + d, d, h), 'back': (u + 2 * d + w, v + d, w, h)}
        for nome, (x0, y0, fw, fh) in faces.items():
            for yy in range(fh):
                for xx in range(fw):
                    cor = pintor(nome, xx, yy, fw, fh)
                    if cor:
                        im.putpixel((x0 + xx, y0 + yy), tuple(cor[:3]) + (cor[3] if len(cor) > 3 else 255,))

    def sombra(cor, yy, h, k=0.25):
        return misturar(cor, (0, 0, 0), yy / max(1, h - 1) * k)

    # ---- cabeça: cabelo curto escuro com franja (estilo romano), olhos castanhos, barba rala
    ROSTO = [
        'hhhhhhhh',
        'hhhhhhhh',
        'h......h',
        '.ss..ss.',
        '.wi..iw.',
        '...nn...',
        '...mm...',
        '.x.xx.x.',
    ]
    cr = {'h': CAB, 's': (40, 26, 18), 'w': (245, 245, 245), 'i': (96, 60, 30), 'n': PELE_ESC,
          'm': (168, 100, 86), 'x': misturar(PELE, (70, 50, 40), 0.14)}

    def cabeca(f, xx, yy, w, h):
        if f == 'top':
            return ruido(CAB, 6)
        if f == 'bottom':
            return PELE_ESC
        if f == 'front':
            ch = ROSTO[yy][xx]
            return ruido(cr[ch], 3) if ch in cr else ruido(PELE, 3)
        if yy < 3 or (f == 'back' and yy < 6):
            return ruido(CAB, 6)
        if f in ('left', 'right') and yy == 4 and xx in (3, 4):
            return PELE_ESC  # orelha
        return ruido(PELE, 3)
    caixa(0, 0, 8, 8, 8, cabeca)

    # coroa de louros (camada de cima da cabeça)
    def louros(f, xx, yy, w, h):
        if f in ('front', 'left', 'right', 'back') and yy == 1 and (xx + (f == 'back')) % 2 == 0:
            return (70, 150, 60)
        if f in ('front', 'left', 'right', 'back') and yy == 2 and (xx + (f == 'back')) % 2 == 1:
            return (50, 120, 46)
        if f == 'front' and yy == 1 and xx in (3, 4):
            return (232, 180, 64)
        return None
    caixa(32, 0, 8, 8, 8, louros)

    # ---- corpo: túnica vermelha com gola e barra dourada, cinto com fivela
    def corpo(f, xx, yy, w, h):
        if f in ('top', 'bottom'):
            return TUN if f == 'bottom' else PELE
        if yy == 0:
            return (232, 180, 64) if f in ('front', 'back') and 2 <= xx <= 5 else TUN
        if yy in (8, 9):
            return (232, 180, 64) if f == 'front' and xx in (3, 4) else ruido(COURO, 4)
        if yy == h - 1:
            return (232, 180, 64)
        cor = sombra(TUN, yy, h)
        if f == 'front' and xx in (2, 5) and 2 <= yy <= 6:
            cor = TUN_ESC  # dobras do tecido
        return ruido(cor, 4)
    caixa(16, 16, 8, 12, 4, corpo)

    # ---- braços: manga vermelha, braço forte, bracelete de couro
    def braco(f, xx, yy, w, h):
        if f == 'top':
            return TUN
        if f == 'bottom':
            return PELE_ESC
        if yy < 3:
            return (232, 180, 64) if yy == 2 else ruido(TUN, 4)
        if 8 <= yy <= 9:
            return ruido(COURO, 3)
        return ruido(sombra(PELE, yy, h, 0.15), 3)
    caixa(40, 16, 4, 12, 4, braco)
    caixa(32, 48, 4, 12, 4, braco)

    # ---- pernas: barra da túnica, pernas, sandálias
    def perna(f, xx, yy, w, h):
        if f == 'top':
            return TUN
        if f == 'bottom':
            return COURO_ESC
        if yy < 3:
            return (232, 180, 64) if yy == 2 else ruido(TUN, 4)
        if yy >= h - 5:
            if yy == h - 1 or yy % 2 == 0 or xx == 1:
                return ruido(COURO, 3)
        return ruido(sombra(PELE, yy, h, 0.12), 3)
    caixa(0, 16, 4, 12, 4, perna)
    caixa(16, 48, 4, 12, 4, perna)

    buf = io.BytesIO()
    im.save(buf, 'PNG')
    return buf.getvalue(), im
