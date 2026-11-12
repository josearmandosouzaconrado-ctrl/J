# Cena 3D da tela inicial de Crônicas de Eldoria (Blender 4.2, bpy)
# Renderiza em camadas transparentes (céu, montanhas, castelo, frente) para o parallax do jogo.
import bpy, math, random, sys, os
from mathutils import Vector

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else '/tmp/bl_out'
os.makedirs(OUT, exist_ok=True)
random.seed(7)
bpy.ops.wm.read_factory_settings(use_empty=True)
S = bpy.context.scene

# ---------- materiais ----------
def mat(nome, cor, rough=0.8, emis=None, forca=0.0, metal=0.0):
    m = bpy.data.materials.new(nome); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*cor, 1)
    b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metal
    if emis:
        b.inputs['Emission Color'].default_value = (*emis, 1)
        b.inputs['Emission Strength'].default_value = forca
    return m

def mat_ruido(nome, c1, c2, escala=4.0, rough=0.9):
    m = bpy.data.materials.new(nome); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = escala; nz.inputs['Detail'].default_value = 6
    cr = nt.nodes.new('ShaderNodeValToRGB')
    cr.color_ramp.elements[0].color = (*c1, 1); cr.color_ramp.elements[1].color = (*c2, 1)
    nt.links.new(nz.outputs['Fac'], cr.inputs['Fac']); nt.links.new(cr.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = rough
    return m

PEDRA = mat_ruido('pedra', (0.16, 0.14, 0.17), (0.32, 0.29, 0.31), 30)
TELHADO = mat('telhado', (0.12, 0.05, 0.08), 0.6)
JANELA = mat('janela', (1, 0.6, 0.2), 0.5, (1.0, 0.55, 0.15), 18)
GRAMA = mat_ruido('grama', (0.03, 0.06, 0.05), (0.08, 0.12, 0.08), 3)
MONTE = mat_ruido('monte', (0.07, 0.06, 0.12), (0.16, 0.13, 0.22), 1.5)
NEVE = mat('neve', (0.75, 0.78, 0.95), 0.7)
PINHO = mat_ruido('pinho', (0.01, 0.04, 0.035), (0.03, 0.08, 0.06), 8)
TRONCO = mat('tronco', (0.06, 0.035, 0.02), 0.9)
AGUA = mat('agua', (0.02, 0.03, 0.06), 0.04)
BANDEIRA = mat('bandeira', (0.6, 0.08, 0.08), 0.7)

camadas = {'montes': [], 'castelo': [], 'frente': []}
def junta(o, camada, m=None):
    if m: o.data.materials.append(m)
    camadas[camada].append(o); return o

# ---------- terreno ----------
def terreno(nome, tam, sub, altura, escala, pos, m, camada, semente, mascara=None):
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=sub, y_subdivisions=sub, size=tam, location=pos)
    o = bpy.context.object; o.name = nome
    import mathutils.noise as N
    for v in o.data.vertices:
        w = o.matrix_world @ v.co
        h = N.fractal(Vector((w.x * escala + semente, w.y * escala, semente)), 0.6, 2.1, 6) * altura
        if mascara: h = mascara(w, h)
        v.co.z += h
    bpy.ops.object.shade_smooth()
    return junta(o, camada, m)

# montanhas distantes com picos nevados
def mascara_montes(w, h):
    return max(0.0, h + 14) * min(1.0, max(0.0, (w.y - 75) / 30.0)) - (4.0 if w.y < 75 else 0.0)
mt = terreno('montanhas', 600, 160, 38, 0.012, (0, 230, -6), MONTE, 'montes', 3.0, mascara_montes)
# neve nos picos: material por altura
m2 = bpy.data.materials.new('monte_neve'); m2.use_nodes = True
nt = m2.node_tree; b = nt.nodes['Principled BSDF']
geo = nt.nodes.new('ShaderNodeNewGeometry'); sep = nt.nodes.new('ShaderNodeSeparateXYZ')
mr = nt.nodes.new('ShaderNodeMapRange'); mr.inputs['From Min'].default_value = 18; mr.inputs['From Max'].default_value = 26
mix = nt.nodes.new('ShaderNodeMix'); mix.data_type = 'RGBA'
mix.inputs['A'].default_value = (0.08, 0.07, 0.13, 1); mix.inputs['B'].default_value = (0.55, 0.58, 0.8, 1)
nt.links.new(geo.outputs['Position'], sep.inputs[0]); nt.links.new(sep.outputs['Z'], mr.inputs['Value'])
nt.links.new(mr.outputs['Result'], mix.inputs['Factor']); nt.links.new(mix.outputs['Result'], b.inputs['Base Color'])
b.inputs['Roughness'].default_value = 0.85
mt.data.materials.clear(); mt.data.materials.append(m2)

# colina do castelo (lado esquerdo)
def mascara_colina(w, h):
    d = math.hypot(w.x + 26, w.y - 52)
    return h * 0.4 + max(0.0, 10.5 - d * 0.36) - 1.5 + (0.0 if d > 9 else (9 - d) * 0.02) - (4.0 if d > 27 else 0.0)
terreno('colina', 160, 120, 3, 0.05, (-10, 55, 0), GRAMA, 'castelo', 9.0, mascara_colina)

# margem da frente e lago
# terreno('margem', 160, 80, 2.2, 0.08, (0, -26, -0.2), mat_ruido('grama2', (0.015, 0.03, 0.03), (0.04, 0.06, 0.05), 6), 'frente', 1.0, lambda w, h: h - (2.5 if -14 < w.x < 34 and w.y > -4 else 0))
bpy.ops.mesh.primitive_plane_add(size=400, location=(0, 60, 0.15)); junta(bpy.context.object, 'castelo', AGUA).name = 'lago'

# ---------- castelo ----------
CX, CY, CZ = -26.0, 52.0, 8.2
def cubo(x, y, z, sx, sy, sz, m, cam='castelo'):
    bpy.ops.mesh.primitive_cube_add(location=(x, y, z)); o = bpy.context.object
    o.scale = (sx / 2, sy / 2, sz / 2); return junta(o, cam, m)
def torre(x, y, r, h, telhado=True):
    bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=r, depth=h, location=(x, y, CZ + h / 2)); junta(bpy.context.object, 'castelo', PEDRA)
    if telhado:
        bpy.ops.mesh.primitive_cone_add(vertices=16, radius1=r * 1.25, depth=r * 2.6, location=(x, y, CZ + h + r * 1.3)); junta(bpy.context.object, 'castelo', TELHADO)
        bpy.ops.mesh.primitive_cylinder_add(vertices=4, radius=0.05, depth=2.2, location=(x, y, CZ + h + r * 2.6 + 1.0)); junta(bpy.context.object, 'castelo', TRONCO)
        cubo(x + 0.5, y, CZ + h + r * 2.6 + 1.6, 1.0, 0.05, 0.6, BANDEIRA)
    else:
        for k in range(10):
            a = k / 10 * math.tau; cubo(x + math.cos(a) * r, y + math.sin(a) * r, CZ + h + 0.35, 0.5, 0.5, 0.7, PEDRA)
    # janelas acesas espalhadas
    for k in range(int(h / 2.2)):
        if random.random() < 0.55:
            a = random.uniform(-2.4, -0.7); z = CZ + 1.5 + k * 2.2
            cubo(x + math.cos(a) * r * 0.98, y + math.sin(a) * r * 0.98, z, 0.35, 0.35, 0.65, JANELA)
# muralha
for (x0, y0, x1, y1) in [(-34, 46, -18, 46), (-34, 46, -34, 58), (-18, 46, -18, 58), (-34, 58, -18, 58)]:
    L = math.hypot(x1 - x0, y1 - y0)
    o = cubo((x0 + x1) / 2, (y0 + y1) / 2, CZ + 2.2, L if y0 == y1 else 1.2, L if x0 == x1 else 1.2, 4.4, PEDRA)
    n = int(L / 1.1)
    for i in range(n):
        t = (i + 0.5) / n
        if i % 2 == 0: cubo(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, CZ + 4.75, 0.6, 0.6, 0.7, PEDRA)
for (x, y) in [(-34, 46), (-18, 46), (-34, 58), (-18, 58)]: torre(x, y, 1.6, 8.5)
# torre de menagem e salão
cubo(-26, 53, CZ + 5, 7, 6, 10, PEDRA)
for k in range(7):
    cubo(-29.5 + k, 49.9, CZ + 10.35, 0.5, 0.5, 0.7, PEDRA)
for (x, z) in [(-28, 4), (-24, 4), (-26, 7), (-28, 7.2), (-24, 7.2)]: cubo(x, 49.95, CZ + z, 0.5, 0.2, 1.0, JANELA)
torre(-26, 55, 1.9, 17)
torre(-22, 50.5, 1.0, 13)
# portão
cubo(-26, 45.9, CZ + 1.3, 2.2, 0.4, 2.6, mat('portao', (0.05, 0.03, 0.02)))

# ---------- pinheiros ----------
def pinheiro(x, y, z, h, cam):
    bpy.ops.mesh.primitive_cylinder_add(vertices=6, radius=h * 0.05, depth=h * 0.3, location=(x, y, z + h * 0.15)); junta(bpy.context.object, cam, TRONCO)
    for i in range(3):
        r = h * (0.33 - i * 0.08); zz = z + h * (0.3 + i * 0.22)
        bpy.ops.mesh.primitive_cone_add(vertices=8, radius1=r, depth=h * 0.42, location=(x, y, zz + h * 0.2))
        o = bpy.context.object; o.rotation_euler.z = random.random(); junta(o, cam, PINHO)
import mathutils.noise as N
def chao(x, y, base, esc, alt):
    return base + N.fractal(Vector((x * esc + 9.0, y * esc, 9.0)), 0.6, 2.1, 6) * alt
for _ in range(70):
    x = random.uniform(-70, 60); y = random.uniform(62, 95)
    pinheiro(x, y, 0.2, random.uniform(3, 6), 'castelo')
for _ in range(24):
    x = random.uniform(-48, -6); y = random.uniform(38, 66)
    if math.hypot(x + 26, y - 52) < 12: continue
    d = math.hypot(x + 26, y - 52)
    pinheiro(x, y, max(0.0, 10.5 - d * 0.36) - 1.5, random.uniform(2.5, 4.2), 'castelo')
# pinheiros grandes da frente, nas bordas (moldura)
for (x, y, h) in [(-44, 2, 13), (-38, 9, 9), (40, 4, 14), (33, 10, 9), (47, 14, 11)]:
    pinheiro(x, y, 0.4, h, 'frente')
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=h * 0.35, location=(x, y, -h * 0.12)); o = bpy.context.object; o.scale.z = 0.35; junta(o, 'frente', GRAMA)

# ---------- luz, céu e câmera ----------
W = bpy.data.worlds.new('ceu'); S.world = W; W.use_nodes = True
nt = W.node_tree; bg = nt.nodes['Background']
tc = nt.nodes.new('ShaderNodeTexCoord'); sp = nt.nodes.new('ShaderNodeSeparateXYZ'); cr = nt.nodes.new('ShaderNodeValToRGB')
nt.links.new(tc.outputs['Generated'], sp.inputs[0])
# gradiente vertical: laranja no horizonte, roxo e azul-noite no alto
cr.color_ramp.elements[0].position = 0.0; cr.color_ramp.elements[0].color = (0.9, 0.36, 0.12, 1)
e = cr.color_ramp.elements.new(0.05); e.color = (0.5, 0.13, 0.22, 1)
e = cr.color_ramp.elements.new(0.14); e.color = (0.12, 0.04, 0.16, 1)
cr.color_ramp.elements[-1].position = 0.32; cr.color_ramp.elements[-1].color = (0.008, 0.005, 0.03, 1)
nt.links.new(sp.outputs['Z'], cr.inputs['Fac']); nt.links.new(cr.outputs['Color'], bg.inputs['Color'])
bg.inputs['Strength'].default_value = 1.0

# lua (luz fria) e brilho do pôr do sol atrás das montanhas (luz quente rasante)
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(55), 0, math.radians(200)))
lua = bpy.context.object.data; lua.energy = 0.9; lua.color = (0.6, 0.7, 1.0); lua.angle = math.radians(1)
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(84), 0, math.radians(185)))
sol = bpy.context.object.data; sol.energy = 2.2; sol.color = (1.0, 0.45, 0.2); sol.angle = math.radians(3)
# lua visível como disco brilhante
bpy.ops.mesh.primitive_uv_sphere_add(radius=9, location=(95, 330, 120))
lm = mat('lua', (1, 0.95, 0.8), 1, (1.0, 0.92, 0.75), 6); o = bpy.context.object; o.data.materials.append(lm); o.visible_shadow = False
camadas['ceu_lua'] = []; o.hide_render = True
# luzes quentes nas janelas para iluminar a pedra
for (x, y, z) in [(-26, 48.5, CZ + 5), (-30, 45, CZ + 4), (-22, 45, CZ + 4)]:
    bpy.ops.object.light_add(type='POINT', location=(x, y, z)); l = bpy.context.object.data; l.energy = 400; l.color = (1, 0.55, 0.2); l.shadow_soft_size = 1

bpy.ops.object.camera_add(location=(-2, -52, 10.5), rotation=(math.radians(88.5), 0, math.radians(3)))
cam = bpy.context.object; S.camera = cam; cam.data.lens = 30

# ---------- render ----------
S.render.engine = 'CYCLES'; S.cycles.device = 'CPU'; S.cycles.samples = int(os.environ.get('AMOSTRAS', 48))
S.cycles.use_denoising = True
S.render.resolution_x = int(os.environ.get('LARG', 1200)); S.render.resolution_y = int(os.environ.get('ALT', 480))
S.render.image_settings.file_format = 'PNG'; S.render.image_settings.color_mode = 'RGBA'
S.view_settings.view_transform = 'Filmic' if 'Filmic' in [i.identifier for i in S.view_settings.bl_rna.properties['view_transform'].enum_items] else 'AgX'
S.view_settings.look = 'None'; S.view_settings.exposure = 0.7

def so(lista_visiveis, transparente):
    vis = set(o.name for nome in lista_visiveis for o in camadas[nome])
    for nome, objs in camadas.items():
        for o in objs: o.visible_camera = o.name in vis
    S.render.film_transparent = transparente

modo = os.environ.get('MODO', 'camadas')
if modo == 'icone':
    cam.location = (-24, 8, 15.5); cam.rotation_euler = (math.radians(89), 0, math.radians(2.7)); cam.data.lens = 46
    S.render.resolution_x = S.render.resolution_y = 1024
    so(list(camadas), False); S.render.filepath = OUT + '/icone.png'; bpy.ops.render.render(write_still=True)
elif modo == 'previa':
    so(list(camadas), False); S.render.filepath = OUT + '/previa.png'; bpy.ops.render.render(write_still=True)
else:
    so(['montes', 'castelo'], False); S.render.filepath = OUT + '/fundo.png'; bpy.ops.render.render(write_still=True)
    so(['frente'], True); S.render.filepath = OUT + '/frente.png'; bpy.ops.render.render(write_still=True)
print('FIM')
