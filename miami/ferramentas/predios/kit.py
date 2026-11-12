"""Kit de construções do jogo, modelado no Blender por código (casas, sobrados, lojas, galpões).
Uso (Blender como módulo: pip install bpy==4.2.0, Python 3.11):
  python -I kit.py -- ../../www/modelos/kit.js [pasta_previas]
Cada módulo é modelado no tamanho padrão (largura x fundo em metros), com a frente para -Y no Blender
(+Z no jogo). O jogo estica cada módulo para o tamanho real de cada construção do mapa.
Materiais: P_ parede (o jogo pinta com a cor de cada casa), D_ detalhe (cor própria), T_ telha (textura de telha
do jogo), V_ vidro (acende à noite). A oclusão de ambiente (cantos escurecidos) é calculada pelo Cycles e gravada
nas cores dos vértices.
"""
import sys, os, math, json, base64, struct
import bpy, bmesh
from mathutils import Vector

ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
SAIDA = ARGS[0]
PREVIAS = ARGS[1] if len(ARGS) > 1 else None

bpy.ops.wm.read_factory_settings(use_empty=True)
SC = bpy.context.scene

# ---------------- materiais ----------------
CORES = {
    'P_parede': (1.0, 1.0, 0.98), 'P_barra': (0.8, 0.8, 0.78),
    'D_moldura': (0.93, 0.93, 0.9), 'D_porta': (0.36, 0.2, 0.09), 'D_metal': (0.28, 0.29, 0.3), 'D_portao': (0.42, 0.44, 0.46),
    'D_laje': (0.62, 0.61, 0.58), 'D_caixa': (0.16, 0.36, 0.72), 'D_toldo': (0.75, 0.16, 0.12), 'D_toldo2': (0.12, 0.42, 0.55),
    'D_letreiro': (0.95, 0.8, 0.2), 'D_piso': (0.6, 0.58, 0.55), 'D_escuro': (0.12, 0.12, 0.13), 'D_galpao': (0.62, 0.64, 0.66),
    'D_madeira': (0.45, 0.3, 0.16), 'D_veneziana': (0.2, 0.42, 0.36),
    'T_telha': (1, 1, 1), 'V_vidro': (0.1, 0.13, 0.17),
}
MATS = {}
for k, c in CORES.items():
    m = bpy.data.materials.new(k); m.use_nodes = True
    m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (*c, 1)
    MATS[k] = m

PECAS = []
def _novo(o, mat):
    o.data.materials.append(MATS[mat]); PECAS.append(o); return o

def caixa(dim, pos, mat, bevel=0.0, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=pos, rotation=rot)
    o = bpy.context.object; o.scale = dim
    bpy.ops.object.transform_apply(scale=True, rotation=True)
    if bevel:
        b = o.modifiers.new('b', 'BEVEL'); b.width = bevel; b.segments = 1; b.limit_method = 'ANGLE'
    return _novo(o, mat)

def cilindro(r, h, pos, mat, n=10):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=h, location=pos, vertices=n)
    return _novo(bpy.context.object, mat)

def malha(verts, faces, mat, esp=0.0):
    bm = bmesh.new(); v = [bm.verts.new(p) for p in verts]
    for f in faces: bm.faces.new([v[i] for i in f])
    me = bpy.data.meshes.new('m'); bm.to_mesh(me); o = bpy.data.objects.new('m', me); SC.collection.objects.link(o)
    if esp:
        s = o.modifiers.new('s', 'SOLIDIFY'); s.thickness = esp; s.offset = 1
    return _novo(o, mat)

def parede(w, d, h, z0=0.0, mat='P_parede'):
    """corpo da construção: caixa com a parede subdividida (para a sombra dos cantos ficar suave)"""
    o = caixa((w, d, h), (0, 0, z0 + h / 2), mat)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.subdivide(number_cuts=1); bpy.ops.object.mode_set(mode='OBJECT')
    return o

def janela(x, y, z, larg, alt, face='-y', persiana=False):
    """moldura saliente, vidro recuado e peitoril; face: lado da parede (-y frente, +y fundo, -x, +x)"""
    s = -1 if face[0] == '-' else 1
    if face[1] == 'y':
        caixa((larg + 0.18, 0.1, alt + 0.18), (x, y + s * 0.03, z), 'D_moldura')
        caixa((larg, 0.12, alt), (x, y + s * 0.06, z), 'V_vidro')
        caixa((larg + 0.32, 0.22, 0.07), (x, y + s * 0.11, z - alt / 2 - 0.08), 'D_moldura')
        if persiana:
            for k in (-1, 1): caixa((larg * 0.5, 0.05, alt + 0.1), (x + k * (larg * 0.75 + 0.1), y + s * 0.06, z), 'D_veneziana')
    else:
        caixa((0.1, larg + 0.18, alt + 0.18), (x + s * 0.03, y, z), 'D_moldura')
        caixa((0.12, larg, alt), (x + s * 0.06, y, z), 'V_vidro')
        caixa((0.22, larg + 0.32, 0.07), (x + s * 0.11, y, z - alt / 2 - 0.08), 'D_moldura')

def porta(x, y, larg=1.0, alt=2.15, mat='D_porta'):
    caixa((larg + 0.16, 0.1, alt + 0.08), (x, y - 0.03, alt / 2), 'D_moldura')
    caixa((larg, 0.12, alt), (x, y - 0.06, alt / 2), mat)

def telhado_2aguas(w, d, z0, alt, beiral=0.5, ridge='x', parede_oitao='P_parede'):
    a, b = w / 2 + beiral, d / 2 + beiral
    if ridge == 'x':
        verts = [(-a, -b, 0), (a, -b, 0), (a, 0, alt), (-a, 0, alt), (-a, b, 0), (a, b, 0)]
        faces = [(0, 1, 2, 3), (3, 2, 5, 4)]
    else:
        verts = [(-a, -b, 0), (0, -b, alt), (0, b, alt), (-a, b, 0), (a, -b, 0), (a, b, 0)]
        faces = [(0, 1, 2, 3), (1, 4, 5, 2)]
    o = malha([(x, y, z + z0) for x, y, z in verts], faces, 'T_telha', 0.12)
    # oitões
    h = alt * (w / 2) / a if ridge == 'y' else alt * (d / 2) / b
    for s in (-1, 1):
        if ridge == 'x':
            malha([(s * w / 2, -d / 2, z0), (s * w / 2, d / 2, z0), (s * w / 2, 0, z0 + h)], [(0, 1, 2) if s > 0 else (2, 1, 0)], parede_oitao)
        else:
            malha([(-w / 2, s * d / 2, z0), (w / 2, s * d / 2, z0), (0, s * d / 2, z0 + h)], [(2, 1, 0) if s > 0 else (0, 1, 2)], parede_oitao)
    return o

def telhado_4aguas(w, d, z0, alt, beiral=0.5):
    a, b = w / 2 + beiral, d / 2 + beiral
    r = max(0.0, a - b)   # cumeeira ao longo do eixo maior (x)
    verts = [(-a, -b, 0), (a, -b, 0), (a, b, 0), (-a, b, 0), (-r, 0, alt), (r, 0, alt)]
    faces = [(0, 1, 5, 4), (2, 3, 4, 5), (1, 2, 5), (3, 0, 4)]
    return malha([(x, y, z + z0) for x, y, z in verts], faces, 'T_telha', 0.12)

def platibanda(w, d, z0, alt=0.8, esp=0.18, mat='P_parede'):
    for s in (-1, 1):
        caixa((w, esp, alt), (0, s * (d / 2 - esp / 2), z0 + alt / 2), mat)
        caixa((esp, d - 2 * esp, alt), (s * (w / 2 - esp / 2), 0, z0 + alt / 2), mat)
    caixa((w - 2 * esp, d - 2 * esp, 0.12), (0, 0, z0 + 0.06), 'D_laje')

# ---------------- módulos ----------------
MODULOS = {}
def modulo(nome, w, d, h, tipo):
    def dec(f):
        MODULOS[nome] = dict(f=f, w=w, d=d, h=h, tipo=tipo); return f
    return dec

@modulo('casa_telha', 10, 8, 3.0, 'pitched')
def _():
    w, d, h = 10, 8, 3.0
    parede(w, d, h)
    caixa((w + 0.04, d + 0.04, 0.5), (0, 0, 0.25), 'P_barra')          # barrado
    telhado_2aguas(w, d, h, 2.0)
    for x in (-3.0, 2.8): janela(x, -d / 2, 1.65, 1.5, 1.2)
    porta(-0.3, -d / 2)
    for x in (-2.5, 2.5): janela(x, d / 2, 1.75, 1.2, 1.0, '+y')
    for s in ('-x', '+x'): janela((-1 if s[0] == '-' else 1) * w / 2, 0, 1.7, 1.2, 1.1, s)
    caixa((1.6, 1.2, 0.15), (-0.3, -d / 2 - 0.6, 0.075), 'D_piso')     # degrau

@modulo('casa_alpendre', 11, 9, 3.0, 'pitched')
def _():
    w, d, h = 11, 9, 3.0
    corpo = parede(w, 6.5, h); corpo.location.y = 1.25
    caixa((w + 0.04, 6.54, 0.5), (0, 1.25, 0.25), 'P_barra')
    telhado_2aguas(w, d, h, 2.1)
    caixa((w, 2.5, 0.18), (0, -3.25, 0.09), 'D_piso')                    # piso do alpendre
    for x in (-w / 2 + 0.3, -1.5, 1.5, w / 2 - 0.3): caixa((0.25, 0.25, h), (x, -d / 2 + 0.3, h / 2), 'D_moldura', 0.02)
    caixa((w, 0.08, 0.9), (0, -d / 2 + 0.3, 0.45 + 0.18), 'D_metal')    # guarda-corpo baixo
    for x in (-3.4, 3.2): janela(x, -2.0, 1.65, 1.6, 1.2, persiana=True)
    porta(-0.2, -2.0)
    for x in (-2.6, 2.6): janela(x, d / 2 - 0.0 + 0.0, 1.75, 1.2, 1.0, '+y')

@modulo('sobrado_laje', 9, 9, 6.2, 'flat')
def _():
    w, d, h = 9, 9, 6.2
    parede(w, d, h)
    caixa((w + 0.04, d + 0.04, 0.5), (0, 0, 0.25), 'P_barra')
    caixa((w + 0.3, d + 0.3, 0.25), (0, 0, h + 0.12), 'D_laje')
    platibanda(w + 0.3, d + 0.3, h + 0.25, 0.9)
    cilindro(0.8, 1.2, (2.4, 2.2, h + 0.85), 'D_caixa', 12)
    caixa((4.6, 1.4, 0.15), (-1.5, -d / 2 - 0.7, 3.25), 'D_laje')       # varanda
    for i in range(10): caixa((0.05, 0.05, 1.0), (-3.7 + i * 0.48, -d / 2 - 1.35, 3.8), 'D_metal')
    caixa((4.6, 0.06, 0.06), (-1.5, -d / 2 - 1.35, 4.3), 'D_metal')
    janela(-1.5, -d / 2, 4.65, 2.4, 1.7)
    janela(2.6, -d / 2, 4.65, 1.3, 1.2); janela(2.6, -d / 2, 1.65, 1.3, 1.2)
    caixa((2.7, 0.12, 2.35), (-1.5, -d / 2 - 0.06, 1.18), 'D_portao')   # garagem
    for z in (1.7, 4.7):
        for x in (-2.4, 2.4): janela(x, d / 2, z, 1.2, 1.0, '+y')
        for s in ('-x', '+x'): janela((-1 if s[0] == '-' else 1) * w / 2, -1.0, z, 1.1, 1.0, s)

@modulo('sobrado_telha', 9, 8, 6.0, 'pitched')
def _():
    w, d, h = 9, 8, 6.0
    parede(w, d, h)
    caixa((w + 0.04, d + 0.04, 0.5), (0, 0, 0.25), 'P_barra')
    caixa((w + 0.08, d + 0.08, 0.2), (0, 0, 3.05), 'D_moldura')          # friso entre andares
    telhado_4aguas(w, d, h, 2.0)
    caixa((3.0, 1.1, 0.14), (2.0, -d / 2 - 0.55, 3.15), 'D_laje')       # sacada
    caixa((3.0, 0.06, 0.95), (2.0, -d / 2 - 1.08, 3.7), 'D_metal')
    janela(2.0, -d / 2, 4.6, 1.8, 1.6, persiana=True); janela(-2.4, -d / 2, 4.6, 1.3, 1.2, persiana=True)
    janela(2.4, -d / 2, 1.65, 1.6, 1.2); porta(-1.6, -d / 2)
    for z in (1.7, 4.6):
        for x in (-2.2, 2.2): janela(x, d / 2, z, 1.2, 1.0, '+y')
        for s in ('-x', '+x'): janela((-1 if s[0] == '-' else 1) * w / 2, 0, z, 1.1, 1.0, s)

@modulo('casa_plana', 12, 9, 3.4, 'flat')
def _():
    # casa da Flórida / Miami: reboco claro, teto plano com platibanda e friso, toldo e janelas largas
    w, d, h = 12, 9, 3.4
    parede(w, d, h)
    caixa((w + 0.2, d + 0.2, 0.3), (0, 0, h - 0.15), 'D_moldura')         # friso art déco
    platibanda(w, d, h, 0.6)
    for x in (-3.8, 3.6): janela(x, -d / 2, 1.75, 2.2, 1.3, persiana=True)
    porta(0, -d / 2, 1.2)
    caixa((3.0, 1.3, 0.1), (0, -d / 2 - 0.65, 2.65), 'D_toldo2', rot=(math.radians(-14), 0, 0))
    for x in (-3, 3): janela(x, d / 2, 1.8, 1.6, 1.1, '+y')
    for s in ('-x', '+x'): janela((-1 if s[0] == '-' else 1) * w / 2, 0, 1.8, 1.4, 1.1, s)
    caixa((1.3, 1.0, 0.8), (3.5, 1.8, h + 0.4), 'D_galpao')              # ar-condicionado

@modulo('loja', 10, 12, 4.2, 'flat')
def _():
    w, d, h = 10, 12, 4.2
    parede(w, d, h)
    platibanda(w, d, h, 1.0)
    caixa((w * 0.82, 0.12, 2.6), (-0.4, -d / 2 - 0.06, 1.3), 'V_vidro')  # vitrine
    for x in (-4.1, 3.3): caixa((0.2, 0.2, 2.8), (x, -d / 2 - 0.08, 1.4), 'D_moldura')
    caixa((w * 0.82, 0.25, 0.35), (-0.4, -d / 2 - 0.18, 2.95), 'D_metal')  # caixa da porta de aço
    caixa((w + 0.2, 1.6, 0.08), (0, -d / 2 - 0.8, 3.2), 'D_toldo', rot=(math.radians(-12), 0, 0))
    caixa((w * 0.7, 0.15, 0.9), (0, -d / 2 - 0.1, 4.45), 'D_letreiro')
    for y in (-2, 2): janela(w / 2, y, 2.2, 1.2, 1.0, '+x')

@modulo('galpao', 20, 30, 7.0, 'pitched')
def _():
    w, d, h = 20, 30, 7.0
    parede(w, d, h, mat='P_parede')
    caixa((w + 0.04, d + 0.04, 1.2), (0, 0, 0.6), 'P_barra')
    # telhado de metal de duas águas (cumeeira ao longo do comprimento)
    a, b = w / 2 + 0.6, d / 2 + 0.4
    malha([(-a, -b, h), (0, -b, h + 2.6), (0, b, h + 2.6), (-a, b, h), (a, -b, h), (a, b, h)], [(0, 1, 2, 3), (1, 4, 5, 2)], 'D_galpao', 0.1)
    for s in (-1, 1):
        malha([(-w / 2, s * d / 2, h), (w / 2, s * d / 2, h), (0, s * d / 2, h + 2.5)], [(2, 1, 0) if s > 0 else (0, 1, 2)], 'P_parede')
    caixa((6, 0.15, 5), (0, -d / 2 - 0.08, 2.5), 'D_portao')               # portão de enrolar
    for x in (-7, 7): janela(x, -d / 2, 5.0, 3, 1.0)
    for y in range(-12, 13, 6): janela(w / 2, y, 5.2, 3.5, 1.0, '+x'); janela(-w / 2, y, 5.2, 3.5, 1.0, '-x')

# ---------------- montagem, sombra dos cantos e exportação ----------------
def montar(nome):
    for o in list(SC.objects): bpy.data.objects.remove(o, do_unlink=True)
    PECAS.clear()
    MODULOS[nome]['f']()
    # chão para a sombra dos cantos na base
    bpy.ops.mesh.primitive_plane_add(size=80, location=(0, 0, 0)); chao = bpy.context.object
    for o in PECAS:
        for m in o.modifiers: pass
    bpy.ops.object.select_all(action='DESELECT')
    for o in PECAS: o.select_set(True)
    bpy.context.view_layer.objects.active = PECAS[0]
    for o in PECAS:
        bpy.context.view_layer.objects.active = o
        for m in list(o.modifiers): bpy.ops.object.modifier_apply(modifier=m.name)
    bpy.ops.object.select_all(action='DESELECT')
    for o in PECAS: o.select_set(True)
    bpy.context.view_layer.objects.active = PECAS[0]
    bpy.ops.object.join()
    obj = bpy.context.object
    return obj, chao

# sombra dos cantos (AO) calculada com raios: fração do céu visível em volta de cada vértice (com o chão)
from mathutils.bvhtree import BVHTree
_DIRS = []
for i in range(24):
    # direções no hemisfério (espiral de Fibonacci, mais densas perto da normal)
    z = 1 - (i + 0.5) / 24; r = math.sqrt(1 - z * z); a = i * 2.39996
    _DIRS.append(Vector((math.cos(a) * r, math.sin(a) * r, z)))
def ao_de(tree, co, n, dist=2.2):
    n = n.normalized()
    t = Vector((1, 0, 0)) if abs(n.x) < 0.9 else Vector((0, 1, 0))
    b1 = n.cross(t).normalized(); b2 = n.cross(b1)
    origem = co + n * 0.03
    livre = tot = 0.0
    for d in _DIRS:
        v = (b1 * d.x + b2 * d.y + n * d.z).normalized()
        w = d.z
        tot += w
        if v.z < -1e-3 and origem.z / -v.z < dist: continue          # chão
        hit = tree.ray_cast(origem, v, dist)
        if hit[0] is None: livre += w
    return livre / tot if tot else 1.0

def exportar(nome, obj):
    me = obj.data; me.calc_loop_triangles()
    tree = BVHTree.FromObject(obj, bpy.context.evaluated_depsgraph_get())
    cache = {}
    partes = {}
    M = MODULOS[nome]
    for tri in me.loop_triangles:
        # faces que nunca aparecem: viradas para baixo e enterradas dentro do volume da parede
        c = tri.center; nz = tri.normal.z
        if nz < -0.9 and c.z < M['h'] + 3: continue
        if abs(c.x) < M['w'] / 2 - 0.03 and abs(c.y) < M['d'] / 2 - 0.03 and 0.03 < c.z < M['h'] - 0.03 and nome not in ('casa_alpendre',): continue
        mat = me.materials[tri.material_index].name
        cat = mat[0]
        if cat == 'V':
            # vidro: só a face de fora (as laterais ficam escondidas pela moldura)
            n0 = tri.normal
            if abs(abs(c.y) - M['d'] / 2) < 0.4 and abs(c.x) < M['w'] / 2 + 0.3:
                if n0.y * (1 if c.y > 0 else -1) < 0.9: continue
            elif abs(abs(c.x) - M['w'] / 2) < 0.4:
                if n0.x * (1 if c.x > 0 else -1) < 0.9: continue
        g = partes.setdefault('V' if cat == 'V' else 'T' if cat == 'T' else 'C', [])
        for li in tri.loops:
            v = me.vertices[me.loops[li].vertex_index].co
            n = me.corners[li].normal if hasattr(me, 'corners') else me.loops[li].normal
            kc = (me.loops[li].vertex_index, round(n.x, 2), round(n.y, 2), round(n.z, 2))
            if kc not in cache: cache[kc] = 0.58 + 0.42 * ao_de(tree, v, Vector(n))
            a = cache[kc]
            base = CORES[mat]
            tinge = 1 if cat == 'P' else 0
            g.append(((v.x, v.z, -v.y), (n.x, n.z, -n.y), tuple(c * a for c in base) if cat != 'T' else (a, a, a), tinge))
    res = {}
    for k, vs in partes.items():
        mapa, pos, nor, col, tin, uv, idx = {}, [], [], [], [], [], []
        for (p, n, c, t) in vs:
            # coordenadas de textura planas pelo lado dominante (telha: fileiras paralelas à cumeeira)
            ax, ay, az = abs(n[0]), abs(n[1]), abs(n[2])
            if k == 'T': u, w = (p[0], p[2]) if az >= ax else (p[2], p[0])
            elif ay >= ax and ay >= az: u, w = p[0], p[2]
            elif ax >= az: u, w = p[2], p[1]
            else: u, w = p[0], p[1]
            key = (round(p[0] * 1000), round(p[1] * 1000), round(p[2] * 1000), round(n[0] * 127), round(n[1] * 127), round(n[2] * 127),
                   round(c[0] * 255), round(c[1] * 255), round(c[2] * 255), t, round(u * 512), round(w * 512))
            if key not in mapa:
                mapa[key] = len(mapa); pos += key[:3]; nor += key[3:6]; col += key[6:9]; tin.append(t); uv += [key[10], key[11]]
            idx.append(mapa[key])
        b = lambda fmt, a: base64.b64encode(struct.pack(f'<{len(a)}{fmt}', *a)).decode()
        res[k] = dict(p=b('h', pos), n=b('b', nor), c=b('B', [min(255, max(0, x)) for x in col]), t=b('B', tin),
                      uv=b('h', [max(-32768, min(32767, x)) for x in uv]), i=b('H', idx))
        print(f'  {nome} {k}: {len(mapa)} vértices, {len(idx) // 3} triângulos')
    return res

def previa(nome, obj, chao):
    # foto do módulo com a cor de parede de exemplo (só para conferir)
    for m in obj.data.materials:
        if m.name.startswith('P_'): m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.93, 0.8, 0.55, 1)
        if m.name.startswith('T_'): m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.6, 0.24, 0.1, 1)
    sun = bpy.data.objects.new('sol', bpy.data.lights.new('sol', 'SUN')); sun.data.energy = 3; sun.rotation_euler = (0.9, 0.2, 3.6); SC.collection.objects.link(sun)
    SC.world.color = (0.5, 0.55, 0.62)
    cam = bpy.data.objects.new('c', bpy.data.cameras.new('c')); SC.collection.objects.link(cam); SC.camera = cam
    M = MODULOS[nome]; R = max(M['w'], M['d'], M['h']) * 1.6
    cam.location = Vector((R * 0.75, -R * 1.0, R * 0.6)); cam.rotation_euler = (Vector((0, 0, M['h'] * 0.45)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
    SC.cycles.samples = 24; SC.render.resolution_x = 640; SC.render.resolution_y = 420
    SC.render.filepath = os.path.join(PREVIAS, nome + '.png'); bpy.ops.render.render(write_still=True)

saida = {}
for nome, M in MODULOS.items():
    obj, chao = montar(nome)
    saida[nome] = dict(w=M['w'], d=M['d'], h=M['h'], tipo=M['tipo'], partes=exportar(nome, obj))
    if PREVIAS: previa(nome, obj, chao)
os.makedirs(os.path.dirname(os.path.abspath(SAIDA)), exist_ok=True)
with open(SAIDA, 'w') as f:
    f.write('// Kit de construções modelado no Blender por ferramentas/predios/kit.py (não editar à mão)\n')
    f.write('window.KIT_PREDIOS = ' + json.dumps(saida, separators=(',', ':')) + ';\n')
print('ok', os.path.getsize(SAIDA), 'bytes')
