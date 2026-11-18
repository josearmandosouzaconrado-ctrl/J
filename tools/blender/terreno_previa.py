# Prévia do terreno reformulado (Blender 4.2 + Cycles), vista de cima como no jogo.
# Um pedaço de mundo com os pequenos detalhes: campo com tufos de capim, flores e cogumelos,
# trilha de terra com sulcos de roda, pedrinhas e poças, rio com pedras no fundo, beira de areia
# molhada e juncos, pontezinha de madeira e arbustos. Uso: python terreno_previa.py -- <saída.png> [amostras]
import bpy, bmesh, math, sys, os, random
from mathutils import Vector, noise
ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = ARGS[0] if ARGS else '/tmp/previa.png'; AMOS = int(ARGS[1]) if len(ARGS) > 1 else 48
random.seed(7)
bpy.ops.wm.read_factory_settings(use_empty=True)
S = bpy.context.scene
S.render.engine = 'CYCLES'; S.cycles.device = 'CPU'; S.cycles.samples = AMOS; S.cycles.use_denoising = True
S.render.resolution_x = 1280; S.render.resolution_y = 720; S.view_settings.view_transform = 'Standard'; S.view_settings.look = 'Medium High Contrast'
L, A = 40.0, 22.5
col = bpy.context.collection

def hexrgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((v / 12.92) if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4) for v in c) + (1,)

# ---------- linhas do rio e da trilha ----------
def rio_y(x): return -4.0 + 2.2 * math.sin(x * 0.16) + 0.8 * math.sin(x * 0.41 + 1)
def trilha_x(y): return 3.0 + 3.0 * math.sin(y * 0.18 + 0.5) + 0.6 * math.sin(y * 0.6)
def d_rio(x, y): return abs(y - rio_y(x))
def d_trilha(x, y): return abs(x - trilha_x(y))
LARG_RIO, LARG_TRILHA = 2.4, 1.3

# ---------- chão ----------
bpy.ops.mesh.primitive_grid_add(x_subdivisions=480, y_subdivisions=270, size=1)
chao = bpy.context.object; chao.scale = (L, A, 1); bpy.ops.object.transform_apply(scale=True)
me = chao.data
areia = me.attributes.new('areia', 'FLOAT', 'POINT'); terra = me.attributes.new('terra', 'FLOAT', 'POINT'); molhado = me.attributes.new('molhado', 'FLOAT', 'POINT')
for i, v in enumerate(me.vertices):
    x, y = v.co.x, v.co.y
    z = noise.noise(Vector((x * 0.15, y * 0.15, 0.3))) * 0.35 + noise.noise(Vector((x * 0.9, y * 0.9, 1.7))) * 0.05
    dr = d_rio(x, y) - LARG_RIO
    if dr < 1.6: z -= (1.6 - dr) * 0.35                    # margem descendo até o leito
    if dr < 0: z -= 0.12 + min(1.0, -dr) * 0.22             # leito do rio
    dt = d_trilha(x, y)
    if dt < LARG_TRILHA: z -= 0.06 + 0.05 * math.exp(-((dt - 0.55) ** 2) / 0.02) + 0.05 * math.exp(-((dt + 0.55 - 2 * 0.55) ** 2) / 0.02)
    # sulcos das rodas
    if dt < LARG_TRILHA and abs(dt - 0.5) < 0.12: z -= 0.025
    v.co.z = z
    a = max(0.0, min(1.0, (1.9 - dr) / 0.9)); areia.data[i].value = a
    molhado.data[i].value = max(0.0, min(1.0, (0.7 - dr) / 0.7))
    t = max(0.0, min(1.0, (LARG_TRILHA - dt) / 0.35 + noise.noise(Vector((x * 1.3, y * 1.3, 4))) * 0.4)); terra.data[i].value = t
bpy.ops.object.shade_smooth()

m = bpy.data.materials.new('chao'); m.use_nodes = True; nd = m.node_tree.nodes; ln = m.node_tree.links
b = nd['Principled BSDF']; b.inputs['Roughness'].default_value = 0.9
co = nd.new('ShaderNodeTexCoord')
def ruido(esc, det=6):
    n = nd.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = esc; n.inputs['Detail'].default_value = det; ln.new(co.outputs['Object'], n.inputs['Vector']); return n
def rampa(src, cores, pos=None):
    r = nd.new('ShaderNodeValToRGB'); ln.new(src, r.inputs[0]); e = r.color_ramp.elements
    e[0].color = hexrgb(cores[0]); e[1].color = hexrgb(cores[-1]); e[0].position = (pos or (0.35, 0.65))[0]; e[1].position = (pos or (0.35, 0.65))[1]
    if len(cores) == 3: e.new(0.5).color = hexrgb(cores[1])
    return r.outputs['Color']
def mistura(a, b2, fac):
    x = nd.new('ShaderNodeMix'); x.data_type = 'RGBA'; ln.new(fac, x.inputs['Factor']); ln.new(a, x.inputs['A']); ln.new(b2, x.inputs['B']); return x.outputs['Result']
def atrib(nome):
    a = nd.new('ShaderNodeAttribute'); a.attribute_name = nome; return a.outputs['Fac']
cor_grama = mistura(rampa(ruido(0.25).outputs['Fac'], ['#245a14', '#3a7e22', '#5c962e']), rampa(ruido(6).outputs['Fac'], ['#1e4a10', '#4a8a28']), ruido(1.2).outputs['Fac'])
cor_terra = rampa(ruido(3).outputs['Fac'], ['#4e3420', '#6e4e30', '#8a6844'])
cor_areia = rampa(ruido(4).outputs['Fac'], ['#a89060', '#c4ae7a', '#d6c494'])
cor_molh = rampa(ruido(4).outputs['Fac'], ['#8a7a58', '#a8966c'])
c = mistura(cor_grama, cor_areia, atrib('areia'))
c = mistura(c, cor_molh, atrib('molhado'))
c = mistura(c, cor_terra, atrib('terra'))
ln.new(c, b.inputs['Base Color'])
fino = ruido(14, 4); bu = nd.new('ShaderNodeBump'); bu.inputs['Strength'].default_value = 0.5; ln.new(fino.outputs['Fac'], bu.inputs['Height']); ln.new(bu.outputs['Normal'], b.inputs['Normal'])
rg = nd.new('ShaderNodeMapRange'); rg.inputs['To Min'].default_value = 0.9; rg.inputs['To Max'].default_value = 0.35; ln.new(atrib('molhado'), rg.inputs['Value']); ln.new(rg.outputs['Result'], b.inputs['Roughness'])
me.materials.append(m)

# ---------- água ----------
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, -0.32)); agua = bpy.context.object; agua.scale = (L, A, 1)
ma = bpy.data.materials.new('agua'); ma.use_nodes = True; nt = ma.node_tree; b2 = nt.nodes['Principled BSDF']
b2.inputs['Base Color'].default_value = hexrgb('#6ab8c0'); b2.inputs['Roughness'].default_value = 0.04; b2.inputs['IOR'].default_value = 1.33; b2.inputs['Transmission Weight'].default_value = 1.0
vol = nt.nodes.new('ShaderNodeVolumeAbsorption'); vol.inputs['Color'].default_value = hexrgb('#8ad0c4'); vol.inputs['Density'].default_value = 0.22
nt.links.new(vol.outputs[0], nt.nodes['Material Output'].inputs['Volume'])
on = nt.nodes.new('ShaderNodeTexNoise'); on.inputs['Scale'].default_value = 3; on.inputs['Detail'].default_value = 4
bw = nt.nodes.new('ShaderNodeBump'); bw.inputs['Strength'].default_value = 0.25; nt.links.new(on.outputs['Fac'], bw.inputs['Height']); nt.links.new(bw.outputs['Normal'], b2.inputs['Normal'])
agua.data.materials.append(ma)
# a água só aparece onde o chão está abaixo dela (o resto fica escondido sob a grama)

# ---------- peças pequenas (modelos) ----------
def mat_simples(nome, cor, rough=0.8, sss=0.0):
    mm = bpy.data.materials.new(nome); mm.use_nodes = True; bb = mm.node_tree.nodes['Principled BSDF']
    bb.inputs['Base Color'].default_value = hexrgb(cor); bb.inputs['Roughness'].default_value = rough
    if sss: bb.inputs['Subsurface Weight'].default_value = sss
    return mm
def modelo_tufo(cores):
    bm = bmesh.new()
    for k in range(9):
        ang = random.random() * math.tau; r0 = random.random() * 0.05; alt = 0.18 + random.random() * 0.22; incl = 0.06 + random.random() * 0.12
        bx, by = math.cos(ang) * r0, math.sin(ang) * r0; w = 0.012
        px, py = -math.sin(ang) * w, math.cos(ang) * w
        v1 = bm.verts.new((bx + px, by + py, 0)); v2 = bm.verts.new((bx - px, by - py, 0)); v3 = bm.verts.new((bx + math.cos(ang) * incl, by + math.sin(ang) * incl, alt))
        bm.faces.new((v1, v2, v3))
    mesh = bpy.data.meshes.new('tufo'); bm.to_mesh(mesh); bm.free()
    o = bpy.data.objects.new('tufo', mesh); mesh.materials.append(mat_simples('capim', cores, 0.7, 0.2)); return o
def modelo_pedra(cor, esc):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=1); o = bpy.context.object
    for v in o.data.vertices: v.co *= 0.75 + random.random() * 0.45
    o.scale = (esc, esc * (0.7 + random.random() * 0.4), esc * 0.5); bpy.ops.object.transform_apply(scale=True); bpy.ops.object.shade_flat()
    o.data.materials.append(mat_simples('pedra', cor, 0.85)); col.objects.unlink(o); return o
def modelo_flor(cor):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=8, ring_count=4, radius=0.035); o = bpy.context.object; o.scale.z = 0.5
    bpy.ops.object.transform_apply(scale=True); o.data.materials.append(mat_simples('flor', cor, 0.5)); col.objects.unlink(o); return o
def modelo_cogumelo():
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=6, radius=0.07); o = bpy.context.object; o.scale.z = 0.55
    bpy.ops.object.transform_apply(scale=True); o.data.materials.append(mat_simples('chapeu', '#b8402a', 0.6)); col.objects.unlink(o); return o
def modelo_junco():
    bm = bmesh.new()
    for k in range(7):
        ang = random.random() * math.tau; bx, by = math.cos(ang) * 0.06, math.sin(ang) * 0.06; alt = 0.45 + random.random() * 0.35; w = 0.015
        v1 = bm.verts.new((bx - w, by, 0)); v2 = bm.verts.new((bx + w, by, 0)); v3 = bm.verts.new((bx + random.uniform(-0.05, 0.05), by + random.uniform(-0.05, 0.05), alt)); bm.faces.new((v1, v2, v3))
    mesh = bpy.data.meshes.new('junco'); bm.to_mesh(mesh); bm.free(); o = bpy.data.objects.new('junco', mesh); mesh.materials.append(mat_simples('junco', '#6a7a3a', 0.7, 0.2)); return o
def modelo_arbusto(raio=0.6, n=7, cor='#2a5a1a', alt=0.0):
    partes = []
    for k in range(n):
        bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=4, radius=raio * (0.55 + random.random() * 0.35), location=(random.gauss(0, raio * 0.55), random.gauss(0, raio * 0.55), alt + random.random() * raio * 0.4))
        o = bpy.context.object; d = o.modifiers.new('d', 'DISPLACE'); t = bpy.data.textures.new('c', 'CLOUDS'); t.noise_scale = 0.05 * raio / 0.6; t.noise_depth = 3; d.texture = t; d.strength = 0.14 * raio / 0.6
        bpy.ops.object.modifier_apply(modifier='d'); partes.append(o)
    for o in partes: o.select_set(True)
    bpy.context.view_layer.objects.active = partes[0]; bpy.ops.object.join(); o = bpy.context.object; bpy.ops.object.shade_smooth()
    mm = bpy.data.materials.new('folhas'); mm.use_nodes = True; nt = mm.node_tree; bb = nt.nodes['Principled BSDF']; bb.inputs['Roughness'].default_value = 0.8; bb.inputs['Subsurface Weight'].default_value = 0.15
    nn = nt.nodes.new('ShaderNodeTexNoise'); nn.inputs['Scale'].default_value = 6; rr = nt.nodes.new('ShaderNodeValToRGB'); nt.links.new(nn.outputs['Fac'], rr.inputs[0])
    rr.color_ramp.elements[0].color = hexrgb('#173a10'); rr.color_ramp.elements[1].color = hexrgb('#4a8a2a'); nt.links.new(rr.outputs['Color'], bb.inputs['Base Color'])
    o.data.materials.append(mm); col.objects.unlink(o); return o

def altura(x, y):
    # altura do chão no ponto (mesma conta da malha)
    z = noise.noise(Vector((x * 0.15, y * 0.15, 0.3))) * 0.35 + noise.noise(Vector((x * 0.9, y * 0.9, 1.7))) * 0.05
    dr = d_rio(x, y) - LARG_RIO
    if dr < 1.6: z -= (1.6 - dr) * 0.35
    if dr < 0: z -= 0.12 + min(1.0, -dr) * 0.22
    if d_trilha(x, y) < LARG_TRILHA: z -= 0.06
    return z
def poe(modelo, x, y, rot=None, esc=1.0, dz=0.0):
    o = bpy.data.objects.new(modelo.name, modelo.data); col.objects.link(o)
    o.location = (x, y, altura(x, y) + dz); o.rotation_euler = (0, 0, rot if rot is not None else random.random() * math.tau); o.scale = (esc, esc, esc); return o

tufos = [modelo_tufo(c) for c in ('#4e8e2a', '#5e9e34', '#3e7a22', '#7a9a3a')]
pedras = [modelo_pedra(c, s) for c, s in (('#8a8680', 0.07), ('#a09a92', 0.05), ('#6e6a66', 0.09), ('#9a9488', 0.12))]
flores = [modelo_flor(c) for c in ('#f2e24a', '#f0f0f0', '#d84a6a', '#8a6ad8')]
cog = modelo_cogumelo(); junco = modelo_junco(); arb = modelo_arbusto(); copa = modelo_arbusto(2.0, 10, alt=0.0)
mx, my = L / 2 - 0.3, A / 2 - 0.3
rnd = lambda: (random.uniform(-mx, mx), random.uniform(-my, my))
n = 0
for _ in range(14000):                                        # capim
    x, y = rnd()
    if d_rio(x, y) < LARG_RIO + 1.4 or d_trilha(x, y) < LARG_TRILHA + random.random() * 0.4: continue
    if noise.noise(Vector((x * 0.35, y * 0.35, 9))) < -0.35: continue          # clareiras
    poe(random.choice(tufos), x, y, esc=0.7 + random.random() * 0.7); n += 1
for _ in range(220):                                          # canteiros de flores
    cx, cy = rnd()
    if d_rio(cx, cy) < LARG_RIO + 1.5 or d_trilha(cx, cy) < LARG_TRILHA + 0.6: continue
    f = random.choice(flores)
    for _ in range(random.randint(3, 9)): poe(f, cx + random.gauss(0, 0.25), cy + random.gauss(0, 0.25), dz=0.12 + random.random() * 0.08)
for _ in range(700):                                          # pedrinhas na trilha e no leito
    x, y = rnd()
    if d_trilha(x, y) < LARG_TRILHA + 0.2 or d_rio(x, y) < LARG_RIO + 0.3 or random.random() < 0.05: poe(random.choice(pedras), x, y, esc=0.6 + random.random() * 1.0, dz=-0.01)
for _ in range(900):                                          # seixos no fundo do rio
    x, y = rnd()
    if d_rio(x, y) < LARG_RIO - 0.1: poe(random.choice(pedras), x, y, esc=0.8 + random.random() * 1.6, dz=-0.02)
for _ in range(500):                                          # juncos na beira
    x, y = rnd()
    if LARG_RIO - 0.2 < d_rio(x, y) < LARG_RIO + 0.7: poe(junco, x, y, esc=0.7 + random.random() * 0.6)
arbs = []
for _ in range(14):                                           # arbustos e cogumelos à sombra
    for t in range(40):
        x, y = rnd()
        if d_rio(x, y) > LARG_RIO + 2.5 and d_trilha(x, y) > LARG_TRILHA + 2: break
    poe(arb, x, y, esc=0.7 + random.random() * 0.8, dz=0.15); arbs.append((x, y))
    for _ in range(random.randint(0, 4)): poe(cog, x + random.uniform(-1.1, 1.1), y + random.uniform(-1.1, 1.1), dz=0.03)
# árvores (copas grandes que fazem sombra)
for k in range(5):
    for t in range(60):
        x, y = rnd()
        if d_rio(x, y) > LARG_RIO + 3.5 and d_trilha(x, y) > LARG_TRILHA + 3.5: break
    poe(copa, x, y, esc=0.85 + random.random() * 0.35, dz=3.0)
# poças na trilha
mp = bpy.data.materials.new('poca'); mp.use_nodes = True; bp = mp.node_tree.nodes['Principled BSDF']; bp.inputs['Base Color'].default_value = hexrgb('#4a4030'); bp.inputs['Roughness'].default_value = 0.02; bp.inputs['Metallic'].default_value = 0.3
for k in range(4):
    yy = random.uniform(-my, my);
    if abs(yy - rio_y(trilha_x(yy))) < 4: continue
    bpy.ops.mesh.primitive_circle_add(vertices=24, radius=0.4 + random.random() * 0.3, fill_type='NGON', location=(trilha_x(yy) + random.uniform(-0.3, 0.3), yy, altura(trilha_x(yy), yy) + 0.02))
    o = bpy.context.object; o.scale.y = 0.6; o.rotation_euler.z = random.random() * 3; o.data.materials.append(mp)
# pontezinha de madeira onde a trilha cruza o rio
mm = mat_simples('madeira', '#7a5532', 0.75)
yc = None
for yy in [i * 0.05 - my for i in range(int(A / 0.05))]:
    if abs(yy - rio_y(trilha_x(yy))) < 0.06: yc = yy; break
if yc is not None:
    xc = trilha_x(yc)
    for k in range(-14, 15):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(xc + random.uniform(-0.03, 0.03), yc + k * 0.24, -0.02 + random.uniform(-0.02, 0.02)))
        o = bpy.context.object; o.scale = (2.0, 0.21, 0.08); o.rotation_euler.z = random.uniform(-0.03, 0.03); o.data.materials.append(mm)
    for sx in (-1.05, 1.05):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(xc + sx, yc, 0.08)); o = bpy.context.object; o.scale = (0.1, 7.0, 0.12); o.data.materials.append(mm)
print('capim', n)

# ---------- luz, céu e câmera ----------
W = bpy.data.worlds.new('ceu'); S.world = W; W.use_nodes = True
sky = W.node_tree.nodes.new('ShaderNodeTexSky'); sky.sky_type = 'NISHITA'; sky.sun_elevation = math.radians(48); sky.sun_rotation = math.radians(135)
W.node_tree.links.new(sky.outputs['Color'], W.node_tree.nodes['Background'].inputs['Color']); W.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.2
bpy.ops.object.light_add(type='SUN'); sol = bpy.context.object
sol.rotation_euler = Vector((0.7, -0.7, -1.0)).normalized().to_track_quat('-Z', 'Y').to_euler(); sol.data.energy = 2.4; sol.data.angle = math.radians(2)
bpy.ops.object.camera_add(location=(0, 0, 40)); cam = bpy.context.object; cam.data.type = 'ORTHO'; cam.data.ortho_scale = 26.0
if yc is not None: cam.location.x = trilha_x(yc) + 2.0; cam.location.y = yc + 1.0; S.camera = cam
S.render.filepath = OUT; bpy.ops.render.render(write_still=True)
print('FIM')
