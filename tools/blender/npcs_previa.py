# Prévia (não aplicada no jogo) de uma reformulação dos corpos dos NPCs e personagens:
# bonecos modelados em 3D no Blender (corpo com proporção melhor, ombros, braços, cinto, botas,
# roupas e cabelo com volume), fotografados de frente, de lado e de costas como no jogo e
# convertidos em pixel art (folha_npcs_previa.py). Uso: python npcs_previa.py -- <pasta>
import bpy, math, sys, os
from mathutils import Vector
ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = ARGS[0] if ARGS else '/tmp/npcs'; os.makedirs(OUT, exist_ok=True)

def hexrgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((v / 12.92) if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4) for v in c) + (1,)
MATS = {}
def mat(cor, metal=False):
    if (cor, metal) in MATS: return MATS[(cor, metal)]
    m = bpy.data.materials.new(cor); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = hexrgb(cor); b.inputs['Roughness'].default_value = 0.35 if metal else 0.85; b.inputs['Metallic'].default_value = 0.8 if metal else 0
    MATS[(cor, metal)] = m; return m
PARTES = []
def peca(op, cor, loc, esc=(1, 1, 1), rot=(0, 0, 0), metal=False, **kw):
    op(location=loc, rotation=rot, **kw); o = bpy.context.object; o.scale = esc
    o.data.materials.append(mat(cor, metal)); bpy.ops.object.shade_smooth(); PARTES.append(o); return o
esfera = lambda **k: bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=12, **k)
cil = lambda **k: bpy.ops.mesh.primitive_cylinder_add(vertices=16, **k)
cone = lambda **k: bpy.ops.mesh.primitive_cone_add(vertices=16, **k)
cubo = lambda **k: bpy.ops.mesh.primitive_cube_add(**k)

def boneco(P):
    """P: proporções e cores. Unidade ~ metro; altura ~1.5 (cabeça ~1/4.5 do corpo, menos 'cabeçudo')."""
    a, l = P.get('alt', 1.0), P.get('larg', 1.0)
    pele, roupa, roupa2, calca, bota, cabelo = P['pele'], P['roupa'], P.get('roupa2', P['roupa']), P.get('calca', '#3a3020'), P.get('bota', '#3a2416'), P.get('cabelo', '#3a2414')
    pz = lambda z: z * a
    # pernas e botas
    if not P.get('vestido'):
        for s in (-1, 1):
            peca(cil, calca, (s * 0.09 * l, 0, pz(0.3)), (0.085 * l, 0.085 * l, pz(0.46)), radius=1, depth=1)
            peca(cubo, bota, (s * 0.09 * l, -0.03, pz(0.07)), (0.1 * l, 0.15, pz(0.14)), size=1)
    else:
        peca(cone, roupa, (0, 0, pz(0.4)), (1, 0.8, 1), radius1=0.3 * l, radius2=0.15 * l, depth=pz(0.8))
        for s in (-1, 1): peca(cubo, bota, (s * 0.08, -0.04, pz(0.04)), (0.07, 0.1, 0.04), size=1)
    # tronco (mais largo no peito), barra da túnica e cinto
    peca(cil, roupa, (0, 0, pz(0.83)), (0.18 * l, 0.15 * l, pz(0.2)), radius=1, depth=1.4)
    peca(esfera, roupa, (0, 0, pz(1.0)), (0.21 * l, 0.16 * l, 0.11 * a), radius=1)               # ombros/peito
    if not P.get('vestido'): peca(cone, roupa2, (0, 0, pz(0.6)), (1, 0.75, 1), radius1=0.21 * l, radius2=0.17 * l, depth=pz(0.18))
    peca(cil, P.get('cinto', '#3a2414'), (0, 0, pz(0.69)), (0.175 * l, 0.125 * l, 0.022), radius=1, depth=1)
    peca(cubo, '#d8b040', (0, -0.125 * l, pz(0.69)), (0.03, 0.01, 0.025), size=1)                 # fivela
    # braços (levemente abertos) e mãos
    for s in (-1, 1):
        peca(cil, roupa, (s * 0.24 * l, 0, pz(0.86)), (0.07 * l, 0.07 * l, pz(0.16)), (0, s * 0.12, 0), radius=1, depth=1)
        peca(cil, P.get('manga', roupa), (s * 0.27 * l, -0.01, pz(0.64)), (0.06 * l, 0.06 * l, pz(0.12)), (0, s * 0.05, 0), radius=1, depth=1)
        peca(esfera, pele, (s * 0.28 * l, -0.01, pz(0.5)), (0.05 * l, 0.05 * l, 0.055), radius=1)
    # pescoço e cabeça
    peca(cil, pele, (0, 0, pz(1.1)), (0.06, 0.06, 0.06), radius=1, depth=1)
    hz = pz(1.1) + 0.23
    peca(esfera, pele, (0, 0, hz), (0.24, 0.22, 0.25), radius=1)
    for s in (-1, 1):
        peca(esfera, '#f4f0ea', (s * 0.09, -0.2, hz - 0.01), (0.055, 0.02, 0.065), radius=1)      # olhos
        peca(esfera, P.get('olho', '#2a1a10'), (s * 0.09, -0.215, hz - 0.015), (0.036, 0.012, 0.05), radius=1)
    peca(cubo, '#8a4a3a', (0, -0.215, hz - 0.12), (0.04, 0.01, 0.01), size=1)                     # boca
    for s in (-1, 1):
        if P.get('orelha_elfo'): peca(cone, pele, (s * 0.22, 0.0, hz + 0.05), (1, 1, 1), (0, s * 1.2, 0), radius1=0.04, radius2=0, depth=0.18)
    if P.get('presas'):
        for s in (-1, 1): peca(cone, '#f2eee0', (s * 0.06, -0.18, hz - 0.1), rot=(0, 0, 0), radius1=0.02, radius2=0, depth=0.07)
    if P.get('barba'): peca(cone, P.get('barbaC', cabelo), (0, -0.09, hz - 0.2), (1, 0.7, 1), (math.pi, 0, 0), radius1=0.19, radius2=0.04, depth=0.36)
    # cabelo / elmo
    if P.get('elmo'):
        peca(esfera, '#a8b0bc', (0, 0.02, hz + 0.08), (0.255, 0.235, 0.21), metal=True, radius=1)
        peca(cubo, '#a8b0bc', (0, -0.235, hz + 0.02), (0.018, 0.012, 0.09), metal=True, size=1)
    elif P.get('careca'): pass
    else:
        peca(esfera, cabelo, (0, 0.05, hz + 0.07), (0.255, 0.23, 0.23), radius=1)
        peca(esfera, cabelo, (0, -0.1, hz + 0.16), (0.23, 0.13, 0.09), radius=1)                   # franja
        if P.get('longo'): peca(cil, cabelo, (0, 0.11, hz - 0.18), (0.19, 0.08, 0.24), radius=1, depth=1)
        if P.get('tranca'): peca(cil, cabelo, (0.12, -0.06, hz - 0.2), (0.035, 0.035, 0.16), (0.2, 0, 0), radius=1, depth=1)
    # armadura: ombreiras e peitoral
    if P.get('armadura'):
        peca(esfera, '#9aa2ae', (0, -0.02, pz(0.95)), (0.19 * l, 0.14 * l, 0.16), metal=True, radius=1)
        for s in (-1, 1): peca(esfera, '#8a929e', (s * 0.23 * l, 0, pz(1.0)), (0.08, 0.08, 0.06), metal=True, radius=1)
    if P.get('capa'): peca(cubo, P['capa'], (0, 0.15, pz(0.7)), (0.22 * l, 0.02, pz(0.36)), (0.12, 0, 0), size=1)
    return PARTES

NPCS = {
  'campones': dict(pele='#e8b48a', roupa='#7a5a3a', roupa2='#6a4a2e', cabelo='#3a2414'),
  'camponesa': dict(pele='#f0c8a0', roupa='#a83a3a', cabelo='#c8902e', vestido=True, longo=True, tranca=True),
  'guarda': dict(pele='#e0aa80', roupa='#3a5aa8', roupa2='#2a4a88', calca='#2a2a32', elmo=True, armadura=True, capa='#2a4a88'),
  'anao': dict(pele='#e0a07a', roupa='#6a4a2a', roupa2='#5a3a20', cabelo='#a0502a', barba=True, alt=0.72, larg=1.35),
  'elfa': dict(pele='#f6dcc0', roupa='#3a7a5a', roupa2='#2a6a4a', cabelo='#e8e0b0', orelha_elfo=True, longo=True, alt=1.08, larg=0.9, capa='#2a5a3a'),
  'orc': dict(pele='#6a9a4a', roupa='#5a4a3a', roupa2='#4a3a2a', cabelo='#1a1a1a', presas=True, larg=1.35, alt=1.05),
}

for nome, P in NPCS.items():
    for vista, rz in (('frente', 0), ('lado', -math.pi / 2), ('costas', math.pi)):
        bpy.ops.wm.read_factory_settings(use_empty=True); MATS.clear(); PARTES.clear()
        S = bpy.context.scene; S.render.engine = 'CYCLES'; S.cycles.device = 'CPU'; S.cycles.samples = 16; S.render.film_transparent = True
        S.render.resolution_x = 160; S.render.resolution_y = 224; S.view_settings.view_transform = 'Standard'
        W = bpy.data.worlds.new('w'); S.world = W; W.use_nodes = True; W.node_tree.nodes['Background'].inputs['Strength'].default_value = 2.4
        ps = boneco(P)
        raiz = bpy.data.objects.new('raiz', None); bpy.context.collection.objects.link(raiz)
        for o in ps: o.parent = raiz
        raiz.rotation_euler.z = rz
        bpy.ops.object.light_add(type='SUN'); s = bpy.context.object; s.rotation_euler = Vector((0.4, 0.8, -0.7)).normalized().to_track_quat('-Z', 'Y').to_euler(); s.data.energy = 3.6
        el = math.radians(12)
        bpy.ops.object.camera_add(location=(0, -10 * math.cos(el), 0.8 + 10 * math.sin(el)), rotation=(math.pi / 2 - el, 0, 0)); c = bpy.context.object
        c.data.type = 'ORTHO'; c.data.ortho_scale = 2.4; S.camera = c
        S.render.filepath = f'{OUT}/{nome}_{vista}.png'; bpy.ops.render.render(write_still=True)
    print('ok', nome)
print('FIM')
