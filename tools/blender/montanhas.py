# Montanhas e pedras realistas (Blender 4.2 + Cycles):
#  1) paredão: a frente das montanhas (o "penhasco" que aparece embaixo de cada maciço), vista de
#     frente, com camadas de rocha, saliências e sombras; emendável na horizontal.
#     Variantes: rocha, pico nevado (neve nas saliências) e cânion (arenito).
#  2) pedras: pedrinhas e rochedos modelados em 3D (esfera deformada), vistos de cima/frente como
#     os outros objetos do jogo, com fundo transparente. Variantes cinza, gelo e arenito.
# Uso: python montanhas.py -- <pasta>
import bpy, math, sys, os, random
from mathutils import Vector
ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = ARGS[0] if ARGS else '/tmp/montanhas'
os.makedirs(OUT, exist_ok=True)

def hexrgb(h, k=1.0):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((v / 12.92) if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4) * k for v in c) + (1,)

def cena(w, h, transp=False):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    S = bpy.context.scene
    S.render.engine = 'CYCLES'; S.cycles.device = 'CPU'; S.cycles.samples = 32; S.cycles.use_denoising = True
    S.render.resolution_x = w; S.render.resolution_y = h; S.view_settings.view_transform = 'Standard'
    S.render.film_transparent = transp; S.render.image_settings.file_format = 'PNG'; S.render.image_settings.color_mode = 'RGBA'
    W = bpy.data.worlds.new('ceu'); S.world = W; W.use_nodes = True
    bg = W.node_tree.nodes['Background']; bg.inputs['Color'].default_value = (0.55, 0.65, 0.85, 1); bg.inputs['Strength'].default_value = 0.5
    return S

def sol(d, e=3.2):
    bpy.ops.object.light_add(type='SUN'); s = bpy.context.object
    s.rotation_euler = Vector(d).normalized().to_track_quat('-Z', 'Y').to_euler(); s.data.energy = e; s.data.angle = math.radians(4)

def textura(tipo, escala, **kw):
    t = bpy.data.textures.new(tipo, tipo); t.noise_scale = escala
    for k, v in kw.items(): setattr(t, k, v)
    return t

def material_rocha(cores, neve=0.0):
    m = bpy.data.materials.new('rocha'); m.use_nodes = True; nt = m.node_tree; nd = nt.nodes; ln = nt.links
    b = nd['Principled BSDF']; b.inputs['Roughness'].default_value = 0.9; b.inputs['Specular IOR Level'].default_value = 0.25
    co = nd.new('ShaderNodeTexCoord')
    n1 = nd.new('ShaderNodeTexNoise'); n1.inputs['Scale'].default_value = 1.2; n1.inputs['Detail'].default_value = 10; n1.inputs['Roughness'].default_value = 0.65; ln.new(co.outputs['Object'], n1.inputs['Vector'])
    r = nd.new('ShaderNodeValToRGB'); ln.new(n1.outputs['Fac'], r.inputs[0]); e = r.color_ramp.elements
    e[0].position = 0.38; e[0].color = hexrgb(cores[0]); e[1].position = 0.62; e[1].color = hexrgb(cores[2]); e.new(0.5).color = hexrgb(cores[1])
    cor = r.outputs['Color']
    # camadas (estratos) horizontais
    wv = nd.new('ShaderNodeTexWave'); wv.wave_type = 'BANDS'; wv.bands_direction = 'Z'; wv.inputs['Scale'].default_value = 1.6; wv.inputs['Distortion'].default_value = 4; wv.inputs['Detail'].default_value = 3; ln.new(co.outputs['Object'], wv.inputs['Vector'])
    mx = nd.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'; mx.inputs['Factor'].default_value = 0.25; ln.new(cor, mx.inputs['A'])
    wr = nd.new('ShaderNodeValToRGB'); ln.new(wv.outputs['Fac'], wr.inputs[0]); wr.color_ramp.elements[0].color = (0.6, 0.6, 0.6, 1); ln.new(wr.outputs['Color'], mx.inputs['B']); cor = mx.outputs['Result']
    if neve > 0:
        # neve onde a superfície olha para cima
        g = nd.new('ShaderNodeNewGeometry'); sp = nd.new('ShaderNodeSeparateXYZ'); ln.new(g.outputs['Normal'], sp.inputs[0])
        nr = nd.new('ShaderNodeMapRange'); nr.inputs['From Min'].default_value = 0.55 - neve * 0.3; nr.inputs['From Max'].default_value = 0.75 - neve * 0.3; ln.new(sp.outputs['Z'], nr.inputs['Value'])
        mn = nd.new('ShaderNodeMix'); mn.data_type = 'RGBA'; ln.new(nr.outputs['Result'], mn.inputs['Factor']); ln.new(cor, mn.inputs['A']); mn.inputs['B'].default_value = hexrgb('#f2f6fb'); cor = mn.outputs['Result']
    ln.new(cor, b.inputs['Base Color'])
    fino = nd.new('ShaderNodeTexNoise'); fino.inputs['Scale'].default_value = 9; fino.inputs['Detail'].default_value = 6; ln.new(co.outputs['Object'], fino.inputs['Vector'])
    bu = nd.new('ShaderNodeBump'); bu.inputs['Strength'].default_value = 0.7; ln.new(fino.outputs['Fac'], bu.inputs['Height']); ln.new(bu.outputs['Normal'], b.inputs['Normal'])
    return m

# ---------- 1) paredões ----------
PAREDES = {'rocha': (['#4a4440', '#77706a', '#a39a92'], 0.0), 'piconeve': (['#5a5e66', '#8a909a', '#b8bec8'], 1.0), 'canion': (['#6a4224', '#8a6038', '#b88a58'], 0.0)}
def parede(nome, cores, neve):
    S = cena(1536, 96)
    L, A = 24.0, 1.5                     # 24 m de largura, 1,5 m de altura (a faixa de 16 px do jogo + folga)
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=768, y_subdivisions=48, size=1); pl = bpy.context.object
    pl.scale = (L, A, 1); pl.rotation_euler = (math.pi / 2, 0, 0); bpy.ops.object.transform_apply(scale=True, rotation=True)
    ori = bpy.data.objects.new('o', None); bpy.context.collection.objects.link(ori); ori.location = (313.7, 0, -211.3)
    for tx, s, f in ((textura('CLOUDS', 0.5, noise_depth=5), 0.0, 0.35), (textura('VORONOI', 0.35), 0.0, 0.22), (textura('CLOUDS', 0.12, noise_depth=2), 0.0, 0.08)):
        md = pl.modifiers.new('d', 'DISPLACE'); md.texture = tx; md.strength = f; md.direction = 'Y'; md.texture_coords = 'OBJECT'; md.texture_coords_object = ori
    bpy.ops.object.shade_smooth()
    pl.data.materials.append(material_rocha(cores, neve))
    sol((0.6, 0.8, -0.9))               # de cima, da esquerda e de frente
    bpy.ops.object.camera_add(location=(0, -30, 0), rotation=(math.pi / 2, 0, 0)); cam = bpy.context.object
    cam.data.type = 'ORTHO'; cam.data.ortho_scale = L; S.camera = cam
    S.render.filepath = f'{OUT}/parede_{nome}.png'; bpy.ops.render.render(write_still=True)

# ---------- 2) pedras ----------
PEDRAS = {'pedra': (['#5a5a60', '#7a7a80', '#a2a2aa'], 0.55, (0.95, 0.8, 0.55)), 'rochedo': (['#5c5852', '#8a8580', '#b0aba4'], 1.0, (1.0, 0.85, 0.85)),
          'gelo': (['#6a90b0', '#a0c8e0', '#e0f2fa'], 1.0, (1.0, 0.85, 0.8)), 'arenito': (['#8a6a40', '#c8a070', '#e6c898'], 1.0, (1.0, 0.85, 0.75))}
def pedra(nome, cores, tam, esc, v):
    S = cena(128, 112, True)
    random.seed(hash(nome) % 1000 + v * 17)
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=5, radius=1); p = bpy.context.object
    p.scale = (esc[0] * (0.9 + random.random() * 0.25), esc[1] * (0.85 + random.random() * 0.3), esc[2] * (0.85 + random.random() * 0.3)); bpy.ops.object.transform_apply(scale=True)
    ori = bpy.data.objects.new('o', None); bpy.context.collection.objects.link(ori); ori.location = (random.random() * 50, random.random() * 50, 7)
    for tx, f in ((textura('VORONOI', 0.9), 0.35), (textura('CLOUDS', 0.5, noise_depth=4), 0.25), (textura('CLOUDS', 0.15, noise_depth=2), 0.06)):
        md = p.modifiers.new('d', 'DISPLACE'); md.texture = tx; md.strength = f; md.texture_coords = 'OBJECT'; md.texture_coords_object = ori
    p.location.z = 0.35
    bpy.ops.object.shade_flat() if nome != 'gelo' else bpy.ops.object.shade_smooth()
    p.data.materials.append(material_rocha(cores, 0.6 if nome == 'gelo' else 0.0))
    # chão invisível que só recebe sombra
    bpy.ops.mesh.primitive_plane_add(size=8); ch = bpy.context.object; ch.is_shadow_catcher = True
    sol((0.7, 0.6, -1.0), 3.0)
    # câmera como a do jogo: de cima e um pouco de frente
    el = math.radians(52)
    bpy.ops.object.camera_add(location=(0, -12 * math.cos(el), 12 * math.sin(el) + 0.3), rotation=(math.pi / 2 - el, 0, 0)); cam = bpy.context.object
    cam.data.type = 'ORTHO'; cam.data.ortho_scale = 3.0; S.camera = cam
    S.render.filepath = f'{OUT}/{nome}_{v}.png'; bpy.ops.render.render(write_still=True)

SO = ARGS[1:]
for n, (c, ne) in PAREDES.items():
    if not SO or 'paredes' in SO: parede(n, c, ne); print('ok parede', n)
for n, (c, t, e) in PEDRAS.items():
    if not SO or 'pedras' in SO:
        for v in range(3): pedra(n, c, t, e, v)
        print('ok pedra', n)
print('FIM')
