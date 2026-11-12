# Construções vikings de Hrimgard modeladas no Blender 4.2 (bpy): casa longa, salão do jarl,
# drakkar encalhado, pedra rúnica e torre de vigia. Renderizadas de frente e um pouco de cima,
# como a vista do jogo, com neve nos telhados. Uso: python construcoes_vikings.py -- <pasta>
import bpy, bmesh, math, sys, os, random

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else '/tmp/vk_casas'
os.makedirs(OUT, exist_ok=True)
SO = os.environ.get('SO')
random.seed(3)
bpy.ops.wm.read_factory_settings(use_empty=True)
S = bpy.context.scene

def mat(nome, cor, rough=0.8, metal=0.0, emis=None, forca=3):
    m = bpy.data.materials.get(nome)
    if m: return m
    m = bpy.data.materials.new(nome); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*cor, 1); b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    if emis: b.inputs['Emission Color'].default_value = (*emis, 1); b.inputs['Emission Strength'].default_value = forca
    return m
def mat_tabuas(nome, c1, c2, escala=(1, 9, 1), direcao='X'):
    # tábuas verticais: listras com ruído
    m = bpy.data.materials.new(nome); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = escala
    wv = nt.nodes.new('ShaderNodeTexWave'); wv.wave_type = 'BANDS'; wv.bands_direction = direcao; wv.inputs['Scale'].default_value = 3; wv.inputs['Distortion'].default_value = 2
    cr = nt.nodes.new('ShaderNodeValToRGB'); cr.color_ramp.elements[0].color = (*c1, 1); cr.color_ramp.elements[1].color = (*c2, 1)
    nt.links.new(tc.outputs['Object'], mp.inputs[0]); nt.links.new(mp.outputs[0], wv.inputs['Vector']); nt.links.new(wv.outputs['Fac'], cr.inputs['Fac']); nt.links.new(cr.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = 0.9
    return m

MAD = mat_tabuas('madeira', (0.14, 0.08, 0.04), (0.38, 0.23, 0.11), (2.2, 2.2, 1), 'X')
MAD_ESC = mat('madeira_esc', (0.12, 0.07, 0.035))
NEVE = mat('neve', (0.88, 0.92, 1.0), 0.6)
GELO = mat('gelo', (0.6, 0.78, 0.92), 0.15)
PEDRA = mat('pedra', (0.32, 0.33, 0.36), 0.9)
PALHA = mat_tabuas('palha', (0.17, 0.11, 0.05), (0.48, 0.36, 0.17), (1, 1, 2.6), 'Z')
OURO = mat('ouro', (0.8, 0.58, 0.18), 0.3, 1.0)
LUZ = mat('luz', (0.35, 0.12, 0.03), 0.5, emis=(1, 0.4, 0.08), forca=0.9)
VELA = mat('vela', (0.75, 0.68, 0.55), 0.9)
VELA_LISTRA = mat('vela_listra', (0.55, 0.06, 0.05), 0.9)
RUNA = mat('runa', (0.3, 0.8, 1.0), 0.4, emis=(0.3, 0.8, 1.0), forca=1.5)
ESCUDOS = [mat('esc%d' % i, c, 0.8) for i, c in enumerate([(0.55, 0.08, 0.06), (0.12, 0.2, 0.42), (0.6, 0.5, 0.25), (0.1, 0.25, 0.12)])]

def caixa(t, pos, m, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(location=pos, rotation=rot); o = bpy.context.object
    o.scale = (t[0] / 2, t[1] / 2, t[2] / 2); o.data.materials.append(m); return o
def cil(r, h, pos, m, rot=(0, 0, 0), v=16, r2=None):
    if r2 is None: bpy.ops.mesh.primitive_cylinder_add(vertices=v, radius=r, depth=h, location=pos, rotation=rot)
    else: bpy.ops.mesh.primitive_cone_add(vertices=v, radius1=r, radius2=r2, depth=h, location=pos, rotation=rot)
    o = bpy.context.object; o.data.materials.append(m); return o
def suave(o): o.select_set(True); bpy.context.view_layer.objects.active = o; bpy.ops.object.shade_smooth(); o.select_set(False)

def telhado(L, larg, alt_parede, alt, m_telha, neve=True, curva=0.25):
    # telhado de duas águas com a cumeeira levemente curvada (como um casco de barco virado)
    me = bpy.data.meshes.new('telhado'); o = bpy.data.objects.new('telhado', me); bpy.context.collection.objects.link(o)
    bm = bmesh.new(); n = 16; cols = []
    for i in range(n + 1):
        x = -L / 2 + L * i / n; t = (2 * i / n - 1); dz = curva * t * t
        cols.append([bm.verts.new((x, -larg / 2 - 0.35, alt_parede + dz * 0.4)), bm.verts.new((x, 0, alt_parede + alt + dz)), bm.verts.new((x, larg / 2 + 0.35, alt_parede + dz * 0.4))])
    for i in range(n):
        a, b = cols[i], cols[i + 1]
        bm.faces.new([a[0], b[0], b[1], a[1]]); bm.faces.new([a[1], b[1], b[2], a[2]])
    bm.to_mesh(me); bm.free(); o.data.materials.append(m_telha)
    o.modifiers.new('esp', 'SOLIDIFY').thickness = 0.18
    if neve:
        # camada de neve por cima, um pouco mais curta nas beiradas
        o2 = o.copy(); o2.data = o.data.copy(); bpy.context.collection.objects.link(o2)
        o2.data.materials.clear(); o2.data.materials.append(NEVE); o2.location.z += 0.12; o2.scale = (0.98, 0.9, 1.0)
        o2.modifiers['esp'].thickness = 0.14
    return o

def oitao(x, larg, alt_parede, alt, m):
    # parede triangular da ponta do telhado e as cabeças de dragão cruzadas no topo
    me = bpy.data.meshes.new('oitao'); o = bpy.data.objects.new('oitao', me); bpy.context.collection.objects.link(o)
    bm = bmesh.new(); vs = [bm.verts.new((x, -larg / 2, alt_parede)), bm.verts.new((x, larg / 2, alt_parede)), bm.verts.new((x, 0, alt_parede + alt))]
    bm.faces.new(vs); bm.to_mesh(me); bm.free(); o.data.materials.append(m); o.modifiers.new('esp', 'SOLIDIFY').thickness = 0.15
    for lado in (-1, 1):
        cil(0.07, 1.4, (x, 0.25 * lado, alt_parede + alt + 0.35), MAD_ESC, rot=(math.radians(35 * lado), 0, 0))
        cil(0.11, 0.3, (x, 0.62 * lado, alt_parede + alt + 0.88), MAD_ESC, rot=(math.radians(90 * lado), 0, 0), r2=0.04)

def casa_longa(L=9.0, larg=4.4, grande=False):
    ap = 1.7 if not grande else 2.3
    # paredes de tábuas, levemente abauladas no meio
    caixa((L, larg, ap), (0, 0, ap / 2), MAD)
    caixa((L + 0.2, larg + 0.2, 0.35), (0, 0, 0.17), PEDRA)             # alicerce de pedra
    for x in [-L / 2 + 0.2 + i * (L - 0.4) / (6 if grande else 4) for i in range((6 if grande else 4) + 1)]:
        caixa((0.22, larg + 0.1, ap), (x, 0, ap / 2), MAD_ESC)           # vigas
    telhado(L + 0.9, larg, ap, 2.4 if not grande else 3.2, PALHA)
    for x in (-L / 2 - 0.05, L / 2 + 0.05): oitao(x, larg, ap, 2.4 if not grande else 3.2, MAD)
    # porta na frente (lado virado para a câmera) com luz quente saindo
    pw = 1.1 if not grande else 1.6
    caixa((pw + 0.3, 0.2, ap * 0.85 + 0.2), (0, -larg / 2 - 0.05, ap * 0.42), MAD_ESC)
    caixa((pw, 0.12, ap * 0.85), (0, -larg / 2 - 0.12, ap * 0.42), LUZ if grande else mat('porta', (0.2, 0.11, 0.05)))
    # escudos pendurados na parede da frente
    for i, x in enumerate([-L / 2 + 1.2 + j * 1.2 for j in range(int(L / 1.2) - 1)]):
        if abs(x) < pw: continue
        o = cil(0.36, 0.08, (x, -larg / 2 - 0.08, ap * 0.6), ESCUDOS[i % 4], rot=(math.radians(90), 0, 0), v=20)
        cil(0.09, 0.1, (x, -larg / 2 - 0.13, ap * 0.6), OURO if grande else PEDRA, rot=(math.radians(90), 0, 0), v=10)
    if grande:
        for x in (-pw - 0.4, pw + 0.4):   # tochas na porta
            cil(0.05, 1.0, (x, -larg / 2 - 0.3, 1.3), MAD_ESC); bpy.ops.mesh.primitive_uv_sphere_add(radius=0.14, location=(x, -larg / 2 - 0.3, 1.88)); bpy.context.object.data.materials.append(LUZ)
            bpy.ops.object.light_add(type='POINT', location=(x, -larg / 2 - 0.8, 2.0)); bpy.context.object.data.energy = 60; bpy.context.object.data.color = (1, 0.55, 0.2)
    # neve amontoada nas paredes
    for x in [random.uniform(-L / 2, L / 2) for _ in range(10)]:
        bpy.ops.mesh.primitive_uv_sphere_add(radius=random.uniform(0.35, 0.6), location=(x, larg / 2 * random.choice([-1, 1]) * 1.02, 0.0))
        o = bpy.context.object; o.scale.z = 0.45; o.data.materials.append(NEVE); suave(o)
    # fumaça da lareira saindo do telhado (um pouco de brilho no buraco)
    caixa((0.5, 0.5, 0.2), (L * 0.15, 0, ap + (2.4 if not grande else 3.2) - 0.05), MAD_ESC)

def drakkar():
    # casco alongado de tábuas (meia elipse), proa e popa com cabeça de dragão, mastro e vela listrada
    me = bpy.data.meshes.new('casco'); o = bpy.data.objects.new('casco', me); bpy.context.collection.objects.link(o)
    bm = bmesh.new(); n = 22; L = 11; aneis = []
    for i in range(n + 1):
        t = i / n; x = -L / 2 + L * t; w = math.sin(math.pi * t) ** 0.7 * 1.5 + 0.05; zt = 1.1 + 2.2 * abs(2 * t - 1) ** 3
        aneis.append([bm.verts.new((x, -w, zt)), bm.verts.new((x, -w * 0.75, 0.45)), bm.verts.new((x, 0, 0.0)), bm.verts.new((x, w * 0.75, 0.45)), bm.verts.new((x, w, zt))])
    for i in range(n):
        a, b = aneis[i], aneis[i + 1]
        for j in range(4): bm.faces.new([a[j], b[j], b[j + 1], a[j + 1]])
    bm.to_mesh(me); bm.free(); o.data.materials.append(mat_tabuas('casco', (0.12, 0.07, 0.035), (0.3, 0.18, 0.09), (1, 1, 10)))
    o.modifiers.new('esp', 'SOLIDIFY').thickness = 0.1; suave(o)
    for lado in (-1, 1):
        cil(0.14, 1.8, (lado * (L / 2 + 0.25), 0, 3.6), MAD_ESC, rot=(0, math.radians(-20 * lado), 0))
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.28, location=(lado * (L / 2 + 0.75), 0, 4.45)); h = bpy.context.object; h.scale = (1.6, 0.7, 0.8); h.data.materials.append(MAD_ESC)
    for i, x in enumerate([-L / 2 + 1.6 + j * 0.95 for j in range(9)]):   # escudos na amurada
        cil(0.34, 0.06, (x, -1.42, 1.0), ESCUDOS[i % 4], rot=(math.radians(90), 0, 0), v=18)
    cil(0.1, 5.2, (0, 0, 2.8), MAD_ESC)
    # vela quadrada listrada de vermelho
    vela = vazio_vela = None
    for k in range(5):
        caixa((3.4, 0.06, 0.62), (0, -0.1, 3.0 + k * 0.6), VELA_LISTRA if k % 2 else VELA)
    caixa((3.8, 0.12, 0.12), (0, -0.1, 4.4), MAD_ESC)
    # neve no fundo do barco e encalhado no gelo
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1, location=(0, 0, 0.35)); g = bpy.context.object; g.scale = (L * 0.42, 1.0, 0.28); g.data.materials.append(NEVE); suave(g)

def pedra_runica():
    bpy.ops.mesh.primitive_cube_add(location=(0, 0, 1.3)); o = bpy.context.object; o.scale = (0.55, 0.25, 1.3); o.data.materials.append(PEDRA)
    bv = o.modifiers.new('bv', 'BEVEL'); bv.width = 0.18; bv.segments = 3
    for k in range(6): caixa((0.08, 0.05, 0.3), (-0.25 + (k % 3) * 0.25, -0.27, 0.7 + (k // 3) * 0.9 + (k % 2) * 0.15), RUNA, rot=(0, math.radians(20 * (k % 2 * 2 - 1)), 0))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.55, location=(0, 0, 2.55)); n = bpy.context.object; n.scale = (1.05, 0.5, 0.35); n.data.materials.append(NEVE); suave(n)
    bpy.ops.object.light_add(type='POINT', location=(0, -0.8, 1.2)); bpy.context.object.data.energy = 4; bpy.context.object.data.color = (0.3, 0.8, 1)

def torre():
    for (x, y) in [(-0.9, -0.9), (0.9, -0.9), (-0.9, 0.9), (0.9, 0.9)]: cil(0.14, 4.6, (x, y, 2.3), MAD_ESC, rot=(math.radians(-4 * (y > 0) + 4 * (y < 0)), math.radians(4 * (x > 0) - 4 * (x < 0)), 0))
    caixa((2.4, 2.4, 0.2), (0, 0, 4.4), MAD)
    for (x, y, sx, sy) in [(0, -1.15, 2.4, 0.1), (0, 1.15, 2.4, 0.1), (-1.15, 0, 0.1, 2.4), (1.15, 0, 0.1, 2.4)]: caixa((sx, sy, 0.9), (x, y, 4.95), MAD)
    bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=2.1, depth=1.6, location=(0, 0, 6.3), rotation=(0, 0, math.radians(45))); o = bpy.context.object; o.data.materials.append(PALHA)
    bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=2.0, depth=1.35, location=(0, 0, 6.45), rotation=(0, 0, math.radians(45))); o = bpy.context.object; o.data.materials.append(NEVE)
    for k in range(3): caixa((0.1, 0.1, 1.3), (0.9 - k * 0.12, -0.95, 0.9 + k * 1.2), MAD_ESC, rot=(math.radians(10), 0, 0))
    cil(0.08, 0.5, (0.7, -1.3, 4.9), mat('chifre', (0.85, 0.8, 0.68)), rot=(0, math.radians(70), 0), r2=0.02)   # trompa de guerra
    bpy.ops.object.light_add(type='POINT', location=(0, -1.6, 5)); bpy.context.object.data.energy = 30; bpy.context.object.data.color = (1, 0.55, 0.2)

# ---------- cena ----------
W = bpy.data.worlds.new('w'); S.world = W; W.use_nodes = True
W.node_tree.nodes['Background'].inputs['Color'].default_value = (0.55, 0.6, 0.72, 1); W.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.6
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(50), math.radians(-20), math.radians(-30))); bpy.context.object.data.energy = 3.0; bpy.context.object.data.angle = math.radians(6)
S.render.engine = 'CYCLES'; S.cycles.device = 'CPU'; S.cycles.samples = int(os.environ.get('AMOSTRAS', 32)); S.cycles.use_denoising = True
S.render.film_transparent = True; S.render.image_settings.file_format = 'PNG'; S.render.image_settings.color_mode = 'RGBA'; S.view_settings.view_transform = 'Standard'
bpy.ops.object.camera_add(location=(0, -30, 21), rotation=(math.radians(55), 0, 0)); cam = bpy.context.object; S.camera = cam; cam.data.type = 'ORTHO'

PECAS = {   # nome: (função, largura da imagem, altura, escala ortográfica, centro z)
    'casa_longa': (lambda: casa_longa(), 520, 380, 13.5, 1.6),
    'salao_jarl': (lambda: casa_longa(15.0, 6.2, True), 760, 520, 19.5, 2.2),
    'drakkar': (drakkar, 640, 420, 15.0, 2.2),
    'pedra_runica': (pedra_runica, 120, 200, 3.4, 1.3),
    'torre_vigia': (torre, 260, 420, 7.6, 3.4),
}
for nome, (fn, w, h, esc, cz) in PECAS.items():
    if SO and nome != SO: continue
    for o in list(bpy.data.objects):
        if o.type != 'CAMERA' and not (o.type == 'LIGHT' and o.data.type == 'SUN'): bpy.data.objects.remove(o, do_unlink=True)
    fn()
    S.render.resolution_x = w; S.render.resolution_y = h; cam.data.ortho_scale = esc
    cam.location = (0, -30, 21 + cz); cam.location.z = cz + 30 * math.tan(math.radians(35))
    S.render.filepath = f'{OUT}/{nome}.png'; bpy.ops.render.render(write_still=True)
print('FIM')
