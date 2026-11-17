#!/usr/bin/env python3
"""Urso de Guerra de Hrimgard — modelo do Blockbench (.bbmodel), feito em cubos.

Gera tools/blockbench/urso_guerra.bbmodel (formato "Generic Model" do Blockbench 4.x, com a textura
embutida) e a textura em tools/blockbench/urso_guerra.png. Abra o .bbmodel no Blockbench
(File > Open Model) para editar os cubos, a textura e as animações ("andar" e "parado").

Ossos: urso > corpo > (cabeca, cauda, perna_fe, perna_fd, perna_te, perna_td).
O urso olha para o norte (-Z), como as entidades no Blockbench. 16 unidades = 1 bloco.
Depois: tools/blockbench/render.js (quadros do jogo) e tools/blockbench/montaria_px.py (pixel art).
Uso: python3 urso_guerra.py
"""
import base64, io, json, math, os, random, uuid
from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
random.seed(7)
U = lambda: str(uuid.UUID(int=random.getrandbits(128), version=4))
TEX = 128   # textura 128x128, ladrilhos de 32x32 (um por material)

# ---------------- textura: um ladrilho por material ----------------
MATS = ['pelo', 'pelo_esc', 'pelo_claro', 'focinho', 'nariz', 'olho', 'osso', 'metal',
        'ouro', 'couro', 'manta', 'orelha', 'escudo', 'correia']
TILE = {m: ((i % 4) * 32, (i // 4) * 32) for i, m in enumerate(MATS)}

def hexrgb(h): return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))
def var(c, k): return tuple(max(0, min(255, round(v * k))) for v in c)

def pintar():
    im = Image.new('RGBA', (TEX, TEX), (0, 0, 0, 0)); px = im.load()
    def tile(m, fn):
        ox, oy = TILE[m]
        for y in range(32):
            for x in range(32): px[ox + x, oy + y] = (*fn(x, y), 255)
    def pelo(base, esc, clr):
        b, e, c = hexrgb(base), hexrgb(esc), hexrgb(clr)
        fios = [[random.random() for _ in range(32)] for _ in range(32)]
        def fn(x, y):
            r = fios[y][x]; acima = fios[(y - 1) % 32][x]   # fios verticais: o pelo escorre para baixo
            if r < 0.07 or (acima < 0.07 and r < 0.4): return e
            if r > 0.95: return c
            return var(b, 0.97 + 0.06 * random.random())
        return fn
    tile('pelo', pelo('#6b4527', '#4a2e18', '#8a5e36'))
    tile('pelo_esc', pelo('#4a2f1a', '#311e10', '#5e3e24'))
    tile('pelo_claro', pelo('#9a7048', '#7a5434', '#b88a5c'))
    tile('focinho', pelo('#a88458', '#8a6840', '#c4a070'))
    tile('nariz', lambda x, y: (60, 44, 40) if (x + y) % 7 == 0 else (28, 20, 18))
    tile('olho', lambda x, y: (18, 10, 8))
    tile('osso', lambda x, y: var(hexrgb('#e8dcc0'), 0.95 + 0.08 * random.random()))
    def metal(x, y):
        aco = hexrgb('#9aa2ac')
        if x % 8 in (1, 6) and y % 8 in (1, 6): return (210, 214, 220)   # rebites
        if y % 8 == 0: return var(aco, 0.72)                               # emendas das placas
        return var(aco, 1.05 - 0.25 * (y % 8) / 8 + 0.05 * random.random())
    tile('metal', metal)
    tile('ouro', lambda x, y: var(hexrgb('#d8a840'), 1.15 if (x + y) % 5 == 0 else 0.9 + 0.1 * random.random()))
    def couro(x, y):
        c = hexrgb('#7a2a1c')
        if x % 16 == 0 or y % 16 == 0: return (200, 170, 110)            # costura
        return var(c, 0.88 + 0.16 * random.random())
    tile('couro', couro)
    def manta(x, y):
        # pano azul-escuro com barras vermelhas e um trançado dourado, como as velas e capas vikings
        b = y % 16
        if b in (0, 1): return hexrgb('#9a2a1e')
        if b == 3 and (x // 2) % 2 == 0: return hexrgb('#d8a840')
        if b == 14 and (x // 2) % 2 == 1: return hexrgb('#d8a840')
        return var(hexrgb('#24365e'), 0.9 + 0.12 * random.random())
    tile('manta', manta)
    tile('orelha', lambda x, y: var(hexrgb('#6a3a30'), 0.9 + 0.15 * random.random()))
    def escudo(x, y):
        # escudo redondo pintado em gomos, aro de ferro e umbo de ouro (centro em 16,16)
        dx, dy = x - 15.5, y - 15.5; r = math.hypot(dx, dy)
        if r < 3: return hexrgb('#e0b048')
        if r > 11: return hexrgb('#5a5e66')
        g = int(((math.atan2(dy, dx) + math.pi) / (2 * math.pi)) * 8) % 2
        return var(hexrgb('#b02a20') if g else hexrgb('#e8dcc0'), 0.92 + 0.1 * random.random())
    tile('escudo', escudo)
    tile('correia', lambda x, y: (200, 170, 110) if x % 6 == 0 and y % 3 == 0 else var(hexrgb('#3a2414'), 0.9 + 0.2 * random.random()))
    return im

# ---------------- cubos ----------------
GRUPOS = {}      # nome -> dados do grupo (pivô, pai, filhos)
ELEMS = []

def grupo(nome, pivo, pai=None):
    GRUPOS[nome] = {'name': nome, 'origin': list(pivo), 'pai': pai, 'uuid': U(), 'filhos': []}
    if pai: GRUPOS[pai]['filhos'].append(('g', nome))

def uv_face(mat, face, d, mundo=None):
    """Retângulo da face no ladrilho do material: 1 texel por unidade (2 no escudo, mapeado pela posição)."""
    tx, ty = TILE[mat]
    dx, dy, dz = d
    if mundo:
        # escudo: a pintura acompanha a posição no mundo, então os 3 cubos formam um círculo só
        (x0, y0, z0), (x1, y1, z1), (cz, cy) = mundo
        if face in ('east', 'west'):
            a, b = (cz - z1, cz - z0) if face == 'east' else (z0 - cz, z1 - cz)
            return [tx + 16 + a * 2, ty + 16 + (cy - y1) * 2, tx + 16 + b * 2, ty + 16 + (cy - y0) * 2]
    du, dv = {'north': (dx, dy), 'south': (dx, dy), 'east': (dz, dy), 'west': (dz, dy), 'up': (dx, dz), 'down': (dx, dz)}[face]
    return [tx, ty, tx + min(du, 32), ty + min(dv, 32)]

def cubo(nome, a, b, mat, g, rot=None, pivo=None, mundo=None, faces=None):
    a, b = list(a), list(b)
    d = [b[i] - a[i] for i in range(3)]
    fs = {}
    for f in ('north', 'east', 'south', 'west', 'up', 'down'):
        m = (faces or {}).get(f, mat)
        fs[f] = {'uv': [round(v, 3) for v in uv_face(m, f, d, mundo if m == 'escudo' else None)], 'texture': 0}
    e = {'name': nome, 'box_uv': False, 'rescale': False, 'locked': False, 'render_order': 'default',
         'allow_mirror_modeling': True, 'from': a, 'to': b, 'autouv': 0, 'color': MATS.index(mat) % 8,
         'origin': list(pivo or [(a[i] + b[i]) / 2 for i in range(3)]), 'faces': fs, 'type': 'cube', 'uuid': U()}
    if rot: e['rotation'] = list(rot)
    ELEMS.append(e); GRUPOS[g]['filhos'].append(('e', e['uuid']))
    return e

def par(nome, a, b, mat, g, **kw):
    """Cubo do lado esquerdo (x<0) e o espelho no direito."""
    cubo(nome + '_e', a, b, mat, g, **kw)
    a2, b2 = [-b[0], a[1], a[2]], [-a[0], b[1], b[2]]
    kw = dict(kw)
    if kw.get('rot'): kw['rot'] = [kw['rot'][0], -kw['rot'][1], -kw['rot'][2]]
    if kw.get('pivo'): kw['pivo'] = [-kw['pivo'][0], kw['pivo'][1], kw['pivo'][2]]
    cubo(nome + '_d', a2, b2, mat, g, **kw)

grupo('urso', [0, 0, 0])
grupo('corpo', [0, 14, 0], 'urso')
# tronco: corpo pesado, corcova nos ombros, peito claro e barriga escura
cubo('tronco', [-7, 8, -11], [7, 19, 10], 'pelo', 'corpo')
cubo('corcova', [-6, 19, -10], [6, 21, -3], 'pelo', 'corpo')
cubo('garupa', [-6, 19, 4], [6, 20, 9], 'pelo', 'corpo')
cubo('peito', [-6, 9, -11.5], [6, 16, -11], 'pelo_claro', 'corpo')
cubo('barriga', [-6, 7.5, -8], [6, 8, 8], 'pelo_esc', 'corpo')
cubo('pescoco', [-5.5, 11, -14], [5.5, 19, -10], 'pelo_esc', 'corpo')
# armadura viking: peitoral com umbo de ouro e placas nos ombros
cubo('peitoral', [-5, 10, -12.1], [5, 16, -11.5], 'metal', 'corpo')
cubo('umbo_peito', [-1, 12, -12.5], [1, 14, -12.1], 'ouro', 'corpo')
par('ombreira', [-7.6, 11, -10], [-7, 17.5, -4], 'metal', 'corpo')
par('ombreira_aro', [-7.8, 17, -10.2], [-7, 17.8, -3.8], 'ouro', 'corpo')
# manta, sela, estribos e cilha
cubo('manta', [-7.5, 13, -3], [7.5, 19.5, 5], 'manta', 'corpo')
cubo('sela', [-4.5, 19.5, -2.5], [4.5, 21, 4.5], 'couro', 'corpo')
cubo('cabeca_sela', [-1.5, 21, -2.5], [1.5, 23, -1.5], 'couro', 'corpo')
cubo('patilha', [-3.5, 21, 3.5], [3.5, 22.5, 4.5], 'couro', 'corpo')
cubo('cilha', [-7.4, 7.6, 0], [7.4, 13, 1.5], 'correia', 'corpo')
par('loro', [-7.8, 9, 0.2], [-7.5, 13, 1.3], 'correia', 'corpo')
par('estribo', [-8.3, 8, -0.2], [-7.5, 9, 1.7], 'metal', 'corpo')
# escudo redondo pendurado no flanco direito (três cubos formam o círculo)
ESC = (7, 13)
for i, (a, b) in enumerate([([7.5, 10, 4.5], [8.2, 16, 9.5]), ([7.5, 9, 5.5], [8.2, 17, 8.5]), ([7.5, 11, 4], [8.2, 15, 10])]):
    cubo('escudo%d' % i, a, b, 'metal', 'corpo', mundo=(a, b, ESC), faces={'east': 'escudo'})
cubo('umbo_escudo', [8.2, 12.3, 6.3], [8.7, 13.7, 7.7], 'ouro', 'corpo')

grupo('cabeca', [0, 16, -13], 'corpo')
cubo('cranio', [-5.5, 11.5, -20], [5.5, 21, -12.5], 'pelo', 'cabeca')
cubo('focinho', [-3.5, 11.5, -24.5], [3.5, 17, -20], 'focinho', 'cabeca')
cubo('nariz', [-1.8, 15.3, -25], [1.8, 17, -24.5], 'nariz', 'cabeca')
cubo('mandibula', [-2.5, 11, -23], [2.5, 12.5, -19.5], 'pelo_claro', 'cabeca')
par('presa', [-2.2, 10.6, -23.4], [-1.4, 12, -22.6], 'osso', 'cabeca')
par('olho', [-4, 17.5, -20.2], [-2.2, 18.8, -20], 'olho', 'cabeca')
par('olho_lado', [-5.7, 17, -19.8], [-5.5, 19, -17.8], 'olho', 'cabeca')
par('orelha', [-5.5, 20, -16], [-2.5, 23, -14], 'pelo', 'cabeca')
par('orelha_dentro', [-4.8, 20.5, -16.2], [-3.2, 22.2, -16], 'orelha', 'cabeca')
# testeira de ferro (chanfro) descendo pela testa até o focinho, com crista de ouro e chifres
cubo('testeira', [-2, 21, -20], [2, 21.6, -14], 'metal', 'cabeca')
cubo('testeira_frente', [-2, 17, -20.6], [2, 21.6, -20], 'metal', 'cabeca')
cubo('testeira_focinho', [-1.5, 17, -24], [1.5, 17.6, -20.6], 'metal', 'cabeca')
cubo('crista', [-0.5, 21.6, -20], [0.5, 22.2, -14.5], 'ouro', 'cabeca')
par('chifre', [-3, 21, -17.5], [-2, 24.5, -16.5], 'osso', 'cabeca', rot=[0, 0, 25], pivo=[-2.5, 21, -17])
par('chifre_ponta', [-4.6, 24, -17.3], [-3.8, 25.5, -16.7], 'osso', 'cabeca', rot=[0, 0, 45], pivo=[-4.2, 24, -17])

grupo('cauda', [0, 18, 10], 'corpo')
cubo('cauda', [-1.5, 16, 10], [1.5, 19, 12.5], 'pelo_esc', 'cauda')

PERNAS = {'perna_fe': (-4, -7), 'perna_fd': (4, -7), 'perna_te': (-4, 6.5), 'perna_td': (4, 6.5)}
for nome, (x, z) in PERNAS.items():
    grupo(nome, [x, 14, z], 'corpo')
    tras = nome.startswith('perna_t')
    if tras:   # coxa grossa e pata de trás
        cubo('coxa', [x - 2.8, 6, z - 3], [x + 2.8, 15, z + 3], 'pelo', nome)
        cubo('canela', [x - 2.3, 0, z - 2], [x + 2.3, 6, z + 2.5], 'pelo_esc', nome)
    else:
        cubo('braco', [x - 2.6, 7, z - 3], [x + 2.6, 15, z + 3], 'pelo', nome)
        cubo('antebraco', [x - 2.3, 0, z - 2.5], [x + 2.3, 7, z + 2], 'pelo_esc', nome)
    cubo('pata', [x - 2.6, 0, z - 3.2], [x + 2.6, 1.8, z + 2.6], 'pelo_esc', nome)
    for i in range(3):   # garras
        cx = x - 1.8 + i * 1.8
        cubo('garra%d' % i, [cx - 0.4, 0, z - 4.1], [cx + 0.4, 0.8, z - 3.2], 'osso', nome)

# ---------------- animações ----------------
def kf(canal, t, x=0, y=0, z=0):
    return {'channel': canal, 'data_points': [{'x': str(x), 'y': str(y), 'z': str(z)}], 'uuid': U(), 'time': t, 'color': -1, 'interpolation': 'catmullrom'}

def animacao(nome, dur, quadros):
    an = {}
    for g, chaves in quadros.items():
        an[GRUPOS[g]['uuid']] = {'name': g, 'type': 'bone', 'keyframes': [kf(c, t, *v) for c, t, v in chaves]}
    return {'uuid': U(), 'name': nome, 'loop': 'loop', 'override': False, 'length': dur, 'snapping': 24, 'selected': False,
            'anim_time_update': '', 'blend_weight': '', 'start_delay': '', 'loop_delay': '', 'animators': an}

# andar: patas em diagonal (dianteira esquerda com traseira direita), corpo balança e a cabeça acompanha
PASSO = 18
def perna(sinal):
    return [('rotation', t, (sinal * a, 0, 0)) for t, a in ((0, 0), (0.25, PASSO), (0.5, 0), (0.75, -PASSO), (1, 0))]
ANDAR = animacao('andar', 1, {
    'perna_fe': perna(1), 'perna_td': perna(1), 'perna_fd': perna(-1), 'perna_te': perna(-1),
    'corpo': [('position', t, (0, y, 0)) for t, y in ((0, 0), (0.25, -0.6), (0.5, 0), (0.75, -0.6), (1, 0))],
    'cabeca': [('rotation', t, (a, 0, 0)) for t, a in ((0, 0), (0.25, -5), (0.5, 0), (0.75, -5), (1, 0))],
    'cauda': [('rotation', t, (0, a, 0)) for t, a in ((0, 0), (0.25, 15), (0.5, 0), (0.75, -15), (1, 0))]})
PARADO = animacao('parado', 3, {
    'corpo': [('scale', t, (1, s, 1)) for t, s in ((0, 1), (1.5, 1.03), (3, 1))],
    'cabeca': [('rotation', t, (a, b, 0)) for t, a, b in ((0, 0, 0), (1, 6, 8), (2, 2, -6), (3, 0, 0))]})

# ---------------- arquivo .bbmodel ----------------
def outliner(nome):
    G = GRUPOS[nome]
    filhos = [outliner(n) if k == 'g' else n for k, n in G['filhos']]
    return {'name': nome, 'origin': G['origin'], 'color': 0, 'uuid': G['uuid'], 'export': True, 'mirror_uv': False,
            'isOpen': True, 'locked': False, 'visibility': True, 'autouv': 0, 'children': filhos}

def main():
    tex = pintar()
    tex.save(os.path.join(AQUI, 'urso_guerra.png'))
    buf = io.BytesIO(); tex.save(buf, 'PNG')
    modelo = {
        'meta': {'format_version': '4.10', 'model_format': 'free', 'box_uv': False},
        'name': 'urso_guerra', 'model_identifier': 'urso_guerra', 'visible_box': [2, 2, 0],
        'variable_placeholders': '', 'variable_placeholder_buttons': [], 'timeline_setups': [], 'unhandled_root_fields': {},
        'resolution': {'width': TEX, 'height': TEX},
        'elements': ELEMS,
        'outliner': [outliner('urso')],
        'textures': [{'path': '', 'name': 'urso_guerra.png', 'folder': '', 'namespace': '', 'id': '0', 'width': TEX, 'height': TEX,
                      'uv_width': TEX, 'uv_height': TEX, 'particle': False, 'use_as_default': False, 'layers_enabled': False,
                      'sync_to_project': '', 'render_mode': 'default', 'render_sides': 'auto', 'frame_time': 1,
                      'frame_order_type': 'loop', 'frame_order': '', 'frame_interpolate': False, 'visible': True,
                      'internal': True, 'saved': True, 'uuid': U(), 'relative_path': '../urso_guerra.png',
                      'source': 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()}],
        'animations': [ANDAR, PARADO]
    }
    with open(os.path.join(AQUI, 'urso_guerra.bbmodel'), 'w') as f: json.dump(modelo, f, ensure_ascii=False, indent=1)
    print('%d cubos, %d ossos' % (len(ELEMS), len(GRUPOS)))

if __name__ == '__main__': main()
