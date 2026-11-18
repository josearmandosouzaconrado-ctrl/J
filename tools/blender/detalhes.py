# Detalhes miúdos do chão (Blender 4.2 + Cycles), para virar pixel art no estilo do jogo:
# tufos de capim, flores, pedrinhas, folhas caídas, cogumelo, juncos e gravetos.
# Cada um é renderizado pequeno, de cima e um pouco de frente (como os objetos do jogo), com fundo
# transparente; folha_detalhes.py reduz, limita as cores e monta img/detalhes.png.
# Uso: python detalhes.py -- <pasta>
import bpy, bmesh, math, sys, os, random
from mathutils import Vector
ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = ARGS[0] if ARGS else '/tmp/detalhes'; os.makedirs(OUT, exist_ok=True)

def hexrgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((v / 12.92) if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4) for v in c) + (1,)
def mat(cor, rough=0.8):
    m = bpy.data.materials.new(cor); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = hexrgb(cor); b.inputs['Roughness'].default_value = rough; return m
def cena():
    bpy.ops.wm.read_factory_settings(use_empty=True); S = bpy.context.scene
    S.render.engine = 'CYCLES'; S.cycles.device = 'CPU'; S.cycles.samples = 24; S.render.film_transparent = True
    S.render.resolution_x = 96; S.render.resolution_y = 96; S.view_settings.view_transform = 'Standard'
    W = bpy.data.worlds.new('w'); S.world = W; W.use_nodes = True; W.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.6
    bpy.ops.object.light_add(type='SUN'); s = bpy.context.object; s.rotation_euler = Vector((0.6, -0.5, -1.0)).normalized().to_track_quat('-Z', 'Y').to_euler(); s.data.energy = 3.0
    el = math.radians(60)
    bpy.ops.object.camera_add(location=(0, -10 * math.cos(el), 10 * math.sin(el)), rotation=(math.pi / 2 - el, 0, 0)); c = bpy.context.object
    c.data.type = 'ORTHO'; c.data.ortho_scale = 1.0; S.camera = c
    return S
def folhas_finas(n, alt, abre, cores, w=0.03):
    bm = bmesh.new(); ms = []
    for k in range(n):
        ang = random.random() * math.tau; r0 = random.random() * 0.06; h = alt * (0.6 + random.random() * 0.5); inc = abre * (0.4 + random.random() * 0.8)
        bx, by = math.cos(ang) * r0, math.sin(ang) * r0; px, py = -math.sin(ang) * w, math.cos(ang) * w
        v1 = bm.verts.new((bx + px, by + py, 0)); v2 = bm.verts.new((bx - px, by - py, 0)); v3 = bm.verts.new((bx + math.cos(ang) * inc, by + math.sin(ang) * inc, h))
        f = bm.faces.new((v1, v2, v3)); f.material_index = k % len(cores)
    me = bpy.data.meshes.new('f'); bm.to_mesh(me); bm.free(); o = bpy.data.objects.new('f', me); bpy.context.collection.objects.link(o)
    for c in cores: me.materials.append(mat(c, 0.7))
    return o
def bola(r, cor, pos=(0, 0, 0), esc=(1, 1, 1), sub=2, flat=True):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=sub, radius=r, location=pos); o = bpy.context.object; o.scale = esc
    for v in o.data.vertices: v.co *= 0.85 + random.random() * 0.3
    (bpy.ops.object.shade_flat if flat else bpy.ops.object.shade_smooth)(); o.data.materials.append(mat(cor)); return o
def render(nome):
    S = bpy.context.scene; S.render.filepath = f'{OUT}/{nome}.png'; bpy.ops.render.render(write_still=True)

ITENS = []
def item(f): ITENS.append(f); return f
@item
def tufo(v):
    folhas_finas(14, 0.42, 0.18, ['#3e8a26', '#56a032', '#2e6e1c']); return 'tufo'
@item
def tufo_seco(v):
    folhas_finas(12, 0.38, 0.2, ['#9a9a3a', '#b8aa52', '#7a7a2e']); return 'tufo_seco'
@item
def flores(v):
    cor = ['#f4e04a', '#f6f6f2', '#e0506e', '#9a7ae0'][v]
    folhas_finas(6, 0.18, 0.14, ['#3e8a26', '#4e9a30'])
    for k in range(5):
        a = random.random() * math.tau; r = 0.05 + random.random() * 0.14
        bola(0.045, cor, (math.cos(a) * r, math.sin(a) * r, 0.12 + random.random() * 0.06), (1, 1, 0.6))
    return 'flor'
@item
def pedrinhas(v):
    for k in range(3 + v):
        a = random.random() * math.tau; r = random.random() * 0.2
        bola(0.05 + random.random() * 0.05, random.choice(['#8a8680', '#a29c94', '#6e6a66']), (math.cos(a) * r, math.sin(a) * r, 0.02), (1, 0.8, 0.55))
    return 'pedrinhas'
@item
def folhas_caidas(v):
    for k in range(5):
        bpy.ops.mesh.primitive_plane_add(size=0.14, location=(random.uniform(-0.2, 0.2), random.uniform(-0.2, 0.2), 0.01 + k * 0.002)); o = bpy.context.object
        o.scale = (1, 0.55, 1); o.rotation_euler = (random.uniform(-0.2, 0.2), random.uniform(-0.2, 0.2), random.random() * 3)
        o.data.materials.append(mat(random.choice(['#a8642a', '#c8902e', '#8a4a20', '#b8a03a'])))
    return 'folhas'
@item
def cogumelo(v):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.025, depth=0.12, location=(0, 0, 0.06)); bpy.context.object.data.materials.append(mat('#ece4d0'))
    bola(0.09, ['#c0402a', '#a07a4a'][v % 2], (0, 0, 0.13), (1, 1, 0.55), 3, False)
    if v == 0: bpy.ops.mesh.primitive_cylinder_add(radius=0.02, depth=0.08, location=(0.14, 0.05, 0.04)); bpy.context.object.data.materials.append(mat('#ece4d0')); bola(0.06, '#c0402a', (0.14, 0.05, 0.09), (1, 1, 0.55), 3, False)
    return 'cogumelo'
@item
def junco(v):
    folhas_finas(9, 0.75, 0.12, ['#6a7a3a', '#7e8e44', '#55682e'], 0.022)
    for k in range(2):
        a = random.random() * math.tau
        bpy.ops.mesh.primitive_cylinder_add(radius=0.025, depth=0.12, location=(math.cos(a) * 0.05, math.sin(a) * 0.05, 0.6 + k * 0.08)); bpy.context.object.data.materials.append(mat('#5a3a20'))
    return 'junco'
@item
def graveto(v):
    for k in range(2):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.018, depth=0.34 - k * 0.12, location=(0, k * 0.05, 0.02), rotation=(0, math.pi / 2, random.uniform(-0.6, 0.6))); bpy.context.object.data.materials.append(mat('#6a4a2a'))
    return 'graveto'
@item
def neve(v):
    for k in range(3):
        bola(0.07 + random.random() * 0.05, '#f2f6fb', (random.uniform(-0.12, 0.12), random.uniform(-0.12, 0.12), 0.02), (1, 0.8, 0.5), 2, False)
    return 'neve'

for f in ITENS:
    for v in range(4 if f.__name__ == 'flores' else 3):
        random.seed(hash(f.__name__) % 997 + v * 31); cena(); nome = f(v); render(f'{f.__name__}_{v}')
print('FIM')
