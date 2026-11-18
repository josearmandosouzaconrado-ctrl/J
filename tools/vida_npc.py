"""Vida dos NPCs: objetos de mão (pão, tigela de sopa, caneca), pálpebras e as animações de
comer, tomar sopa, beber, dormir e conversar.

Funciona com qualquer humanoide feito com mc_lib (ossos raiz, corpo, cabeca, braco_dir,
braco_esq). Os objetos ficam escondidos (escala 0) em todas as outras animações.
Também exporta as peças de controlador e de entidade usadas pelo gerador do add-on.
"""
from mc_lib import misturar

ITENS = ('pao', 'tigela', 'caneca', 'palpebras')
ACOES = {1: 'comer', 2: 'tomar_sopa', 3: 'beber', 4: 'dormir', 5: 'conversar'}

PAO, PAO_CLARO, PAO_ESC = (196, 140, 72), (228, 182, 110), (138, 88, 40)
MADEIRA = (130, 86, 48)
SOPA = (196, 120, 50)
CANECA = (150, 104, 66)


def cubos_itens(hx, hy=13.0, olhos=(26.9, 28.6)):
    """[(osso, nome, de, ate, mat)] dos objetos de mão e das pálpebras."""
    return [
        # pão comprido segurado na horizontal, atravessado na frente da mão
        ('pao', 'pao', [hx - 3.2, hy - 1.6, -3.4], [hx + 1.2, hy + 0.4, -1.4], 'pao'),
        ('pao', 'pao_ponta', [hx - 3.7, hy - 1.4, -3.2], [hx - 3.2, hy + 0.2, -1.6], 'pao'),
        ('tigela', 'tigela', [hx - 1.6, hy - 1, -4.4], [hx + 1.6, hy + 0.4, -1.2], 'tigela'),
        ('tigela', 'sopa', [hx - 1.3, hy + 0.4, -4.1], [hx + 1.3, hy + 0.6, -1.5], 'sopa'),
        ('caneca', 'caneca', [hx - 0.9, hy - 1.4, -3.4], [hx + 0.9, hy + 1.4, -1.6], 'caneca'),
        ('caneca', 'alca', [hx + 0.9, hy - 0.6, -2.8], [hx + 1.3, hy + 0.8, -2.2], 'caneca'),
        ('palpebras', 'palpebras', [-3.6, olhos[0], -4.08], [3.6, olhos[1], -4.02], 'palpebra'),
    ]


def ossos_itens(hx, hy=13.0):
    return [('pao', 'braco_dir', [hx, hy, -2]), ('tigela', 'braco_dir', [hx, hy, -2]),
            ('caneca', 'braco_dir', [hx, hy, -2]), ('palpebras', 'cabeca', [0, 27.5, -4])]


def esconder(bones, menos=()):
    for item in ITENS:
        if item not in menos:
            bones[item] = {'scale': [(0, [0, 0, 0], 'step')]}
    return bones


def animacoes():
    """Animações novas (convenção interna do Blockbench)."""
    a = {}
    # comer pão: leva à boca, dá mordidas, mastiga
    a['comer'] = dict(loop='loop', length=2.4, bones=esconder({
        'braco_dir': {'rotation': [(0, [35, 8, 0]), (0.5, [118, 28, 0]), (0.65, [110, 26, 0]), (0.8, [118, 28, 0]),
                                   (0.95, [110, 26, 0]), (1.4, [40, 8, 0]), (2.4, [35, 8, 0])]},
        'cabeca': {'rotation': [(0, [0, 0, 0]), (0.5, [-6, 0, 0]), (0.65, [-2, 0, 0]), (0.8, [-6, 0, 0]),
                                (1.1, [0, 0, 0]), (1.4, [2, 0, 0]), (1.7, [0, 0, 0]), (2.4, [0, 0, 0])]},
        'braco_esq': {'rotation': [(0, [8, 0, -6])]},
        'corpo': {'position': [(0, [0, 0, 0]), (1.2, [0, 0.2, 0]), (2.4, [0, 0, 0])]},
    }, menos=('pao',)))
    # tomar sopa: tigela no peito, ergue até a boca, inclina e volta
    a['tomar_sopa'] = dict(loop='loop', length=3.0, bones=esconder({
        'braco_dir': {'rotation': [(0, [45, 14, 0]), (0.9, [102, 30, 0]), (1.7, [102, 30, 0]), (2.4, [45, 14, 0]), (3, [45, 14, 0])]},
        'tigela': {'rotation': [(0, [-45, 0, 0]), (0.9, [-82, 0, 0]), (1.3, [-70, 0, 0]), (1.7, [-82, 0, 0]),
                                (2.4, [-45, 0, 0]), (3, [-45, 0, 0])]},
        'braco_esq': {'rotation': [(0, [40, -16, 0]), (0.9, [70, -26, 0]), (1.7, [70, -26, 0]), (2.4, [40, -16, 0]), (3, [40, -16, 0])]},
        'cabeca': {'rotation': [(0, [-8, 0, 0]), (0.9, [6, 0, 0]), (1.7, [10, 0, 0]), (2.4, [-8, 0, 0]), (3, [-8, 0, 0])]},
    }, menos=('tigela',)))
    # beber: caneca à boca, cabeça para trás, goles
    a['beber'] = dict(loop='loop', length=2.6, bones=esconder({
        'braco_dir': {'rotation': [(0, [40, 10, 0]), (0.6, [125, 30, 0]), (1.0, [130, 30, 0]), (1.4, [125, 30, 0]),
                                   (1.9, [40, 10, 0]), (2.6, [40, 10, 0])]},
        'caneca': {'rotation': [(0, [0, 0, 0]), (0.6, [-60, 0, 0]), (1.0, [-75, 0, 0]), (1.4, [-60, 0, 0]),
                                (1.9, [0, 0, 0]), (2.6, [0, 0, 0])]},
        'cabeca': {'rotation': [(0, [0, 0, 0]), (0.6, [14, 0, 0]), (1.0, [18, 0, 0]), (1.4, [14, 0, 0]), (1.9, [0, 0, 0]), (2.6, [0, 0, 0])]},
        'braco_esq': {'rotation': [(0, [6, 0, -6])]},
    }, menos=('caneca',)))
    # dormir: deitado de costas, olhos fechados, respirando devagar
    a['dormir'] = dict(loop='loop', length=4.0, bones=esconder({
        'raiz': {'rotation': [(0, [90, 0, 0])], 'position': [(0, [0, 2.2, 0])]},
        'cabeca': {'rotation': [(0, [0, 25, 0]), (2, [2, 23, 0]), (4, [0, 25, 0])]},
        'corpo': {'position': [(0, [0, 0, 0]), (2, [0, 0, -0.25]), (4, [0, 0, 0])]},
        'braco_dir': {'rotation': [(0, [0, 0, 10])]},
        'braco_esq': {'rotation': [(0, [12, 0, -14])]},
    }, menos=('palpebras',)))
    # conversar: gestos com as mãos e cabeça viva
    a['conversar'] = dict(loop='loop', length=2.4, bones=esconder({
        'braco_dir': {'rotation': [(0, [30, 0, 4]), (0.6, [48, -20, 8]), (1.2, [36, 10, 4]), (1.8, [50, -10, 6]), (2.4, [30, 0, 4])]},
        'braco_esq': {'rotation': [(0, [10, 0, -5]), (1.2, [26, 14, -6]), (2.4, [10, 0, -5])]},
        'cabeca': {'rotation': [(0, [4, 0, 0]), (0.6, [-2, 8, 3]), (1.2, [5, -4, -2]), (1.8, [0, 6, 2]), (2.4, [4, 0, 0])]},
        'corpo': {'rotation': [(0, [0, 0, 0]), (1.2, [0, 4, 0]), (2.4, [0, 0, 0])]},
    }))
    return a


def adicionar(m, hx, pele, ds=1, hy=13.0, olhos=(26.9, 28.6), olho_linha=None):
    """Põe objetos, pálpebras e animações num Modelo do mc_lib (chamar depois das animações dele)."""
    for nome, pai, piv in ossos_itens(hx, hy):
        m.osso(nome, pai, piv)
    for osso, nome, de, ate, mat in cubos_itens(hx, hy, olhos):
        m.cubo(osso, nome, de, ate, mat, ds=ds)
    for a in m.animacoes.values():  # esconde os objetos nas animações que já existiam
        esconder(a['bones'])
    novas = animacoes()
    if 'conversar' in m.animacoes:
        novas.pop('conversar')
        esconder(m.animacoes['conversar']['bones'])
    m.animacoes.update(novas)
    pintores(m, pele, olho_linha)


def pintores(m, pele, olho_linha=None):
    @m.material('pao')
    def _(p, c):
        p.preencher(PAO, PAO_CLARO, PAO_ESC, forca=3)
        if p.face == 'up':
            for xx in range(1, p.w, 3):
                p.linha_v(xx, PAO_ESC)  # cortes na casca

    @m.material('tigela')
    def _(p, c):
        p.preencher(MADEIRA, misturar(MADEIRA, (255, 255, 255), 0.2), misturar(MADEIRA, (0, 0, 0), 0.3), forca=2)
        if p.lateral:
            p.linha_h(0, misturar(MADEIRA, (255, 255, 255), 0.3))

    @m.material('sopa')
    def _(p, c):
        p.preencher(SOPA, misturar(SOPA, (255, 230, 160), 0.4), SOPA, forca=4)
        if p.face == 'up':
            for xx in range(0, p.w, 3):
                p.px(xx, 1, (120, 170, 70))  # pedacinhos de verdura

    @m.material('caneca')
    def _(p, c):
        p.preencher(CANECA, misturar(CANECA, (255, 255, 255), 0.2), misturar(CANECA, (0, 0, 0), 0.3), forca=2)
        if p.face == 'up':
            for yy in range(1, p.h - 1):
                for xx in range(1, p.w - 1):
                    p.px(xx, yy, (150, 40, 60))  # vinho

    @m.material('palpebra')
    def _(p, c):
        p.preencher(pele, forca=1)
        if p.face == 'north':
            linha = olho_linha or (44, 26, 32)
            meio = p.h // 2
            for xx in range(p.w):
                lado = xx < p.w * 0.45 or xx >= p.w * 0.55
                olho = (p.w * 0.1 <= xx <= p.w * 0.4) or (p.w * 0.6 <= xx <= p.w * 0.9)
                if lado and olho:
                    p.px(xx, meio, linha)  # olho fechado: um tracinho


# ------------------------------------------------------------------ controlador e entidade
def estados_acao(ns, voltar='normal'):
    """Estados extras do controlador de postura e as transições de entrada."""
    estados, entradas = {}, []
    for k, nome in ACOES.items():
        q = f"query.property('{ns}:acao') == {k}"
        estados[f'acao_{nome}'] = {'animations': [nome], 'transitions': [{voltar: f"query.property('{ns}:acao') != {k}"}],
                                   'blend_transition': 0.3}
        entradas.append({f'acao_{nome}': q})
    return estados, entradas


def entidade_acoes(ent, ns):
    """Acrescenta propriedade, grupo e eventos de ação numa entidade do comportamento."""
    desc = ent['minecraft:entity']['description']
    desc.setdefault('properties', {})[f'{ns}:acao'] = {'type': 'int', 'range': [0, 5], 'default': 0, 'client_sync': True}
    ent['minecraft:entity'].setdefault('component_groups', {})[f'{ns}:ocupado'] = {'minecraft:movement': {'value': 0.0}}
    ev = ent['minecraft:entity'].setdefault('events', {})
    ev[f'{ns}:acao_0'] = {'set_property': {f'{ns}:acao': 0}, 'remove': {'component_groups': [f'{ns}:ocupado']}}
    for k in ACOES:
        ev[f'{ns}:acao_{k}'] = {'set_property': {f'{ns}:acao': k}, 'add': {'component_groups': [f'{ns}:ocupado']}}
    return ent
