# Texturas realistas do chão (Blender 4.2 + Cycles), vistas de cima como no jogo.
# Cada terreno é um pedaço de chão de 24 m (= 24 quadradinhos do jogo) com relevo de verdade
# (malha deslocada por texturas: pedras, torrões, dunas, rachaduras), material procedural e sol
# vindo do noroeste (o mesmo lado da sombra de relevo do jogo). folha_terrenos.py torna cada um
# emendável e monta img/terreno.webp.
# Uso: python terrenos.py -- <pasta> [tamanho] [nomes...]
import bpy, math, sys, os
from mathutils import Vector
ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = ARGS[0] if ARGS else '/tmp/terrenos'; TAM = int(ARGS[1]) if len(ARGS) > 1 else 384; SO = ARGS[2:]
os.makedirs(OUT, exist_ok=True)
ESP = 24.0

def hexrgb(h, k=1.0):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((v / 12.92) if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4) * k for v in c) + (1,)

# cores (escuro, médio, claro), manchas, relevo...
TERRENOS = {
  'grama':      dict(cores=['#2e6a1c', '#3f8c28', '#5aa83a'], manchas=('#8a9a3a', 7, 0.62), pontos=('#2a4a18', 60, 0.08), bump=0.5, desloc=0.05, escala=3.0, fios=True, tufo=7),
  'bosque':     dict(cores=['#24521a', '#33702a', '#4a8a30'], manchas=('#6a4a24', 5, 0.58), pontos=('#7a5a2a', 40, 0.1), bump=0.6, desloc=0.08, escala=2.5, fios=True, tufo=5),
  'areia':      dict(cores=['#c4ae6c', '#dcc98a', '#efe0a8'], manchas=('#b89c60', 4, 0.66), pontos=('#a08860', 90, 0.05), bump=0.35, desloc=0.04, escala=2.0, ondas=True),
  'terra':      dict(cores=['#6a4e30', '#8a6a43', '#a5845a'], manchas=('#5a4a2a', 6, 0.6), pontos=('#9a9286', 55, 0.12), bump=0.8, desloc=0.12, escala=3.5, pedras=True, tufo=4),
  'neve':       dict(cores=['#c8d6ea', '#e6eef8', '#ffffff'], manchas=('#b8cce4', 3, 0.6), pontos=('#ffffff', 80, 0.02), bump=0.4, desloc=0.18, escala=1.6),
  'deserto':    dict(cores=['#c8913c', '#e6b765', '#f4d08a'], manchas=('#b8823a', 3, 0.64), pontos=('#a87a3a', 70, 0.04), bump=0.4, desloc=0.12, escala=1.4, ondas=True),
  'rocha':      dict(cores=['#4a4440', '#77706a', '#a39a92'], manchas=('#5a6a3a', 6, 0.7), pontos=('#2e2a28', 30, 0.15), bump=1.0, desloc=0.6, escala=2.2, pedras=True, rachas=True),
  'piconeve':   dict(cores=['#8a94a2', '#c9d2dc', '#f2f6fa'], manchas=('#ffffff', 4, 0.5), pontos=('#6a6a72', 30, 0.08), bump=0.8, desloc=0.5, escala=2.0, pedras=True, rachas=True),
  'tundra':     dict(cores=['#6a7a52', '#8a9a6e', '#a8b48a'], manchas=('#e6eef6', 5, 0.66), pontos=('#5a5a4a', 50, 0.08), bump=0.5, desloc=0.07, escala=2.6, fios=True, tufo=6),
  'lama':       dict(cores=['#3e3022', '#5e4b35', '#76604a'], manchas=('#2a2a22', 4, 0.6), pontos=('#4a3a2a', 40, 0.1), bump=0.6, desloc=0.08, escala=2.0, poças=True),
  'pantano':    dict(cores=['#36421e', '#4d5a2e', '#66743c'], manchas=('#2a3a2a', 4, 0.58), pontos=('#7a8a3a', 50, 0.08), bump=0.5, desloc=0.06, escala=2.4, poças=True, fios=True, tufo=5),
  'terramorta': dict(cores=['#4e4630', '#6b6040', '#8a7e58'], manchas=('#7a6a40', 5, 0.62), pontos=('#3a3426', 50, 0.1), bump=0.7, desloc=0.08, escala=3.0, rachas=True, tufo=4),
  'terraverm':  dict(cores=['#6e321c', '#9c4a2c', '#bc6a44'], manchas=('#7a3a22', 5, 0.6), pontos=('#5a2a18', 50, 0.1), bump=0.8, desloc=0.18, escala=2.6, pedras=True, rachas=True),
  'cinzas':     dict(cores=['#2e282c', '#4a4246', '#686064'], manchas=('#7a3a22', 7, 0.78), pontos=('#1e1a1c', 50, 0.1), bump=0.6, desloc=0.08, escala=2.4, rachas=True),
}

def cena():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    S = bpy.context.scene
    S.render.engine = 'CYCLES'; S.cycles.device = 'CPU'; S.cycles.samples = 24; S.cycles.use_denoising = True
    S.render.resolution_x = TAM; S.render.resolution_y = TAM; S.view_settings.view_transform = 'Standard'
    S.render.image_settings.file_format = 'PNG'
    W = bpy.data.worlds.new('ceu'); S.world = W; W.use_nodes = True
    bg = W.node_tree.nodes['Background']; bg.inputs['Color'].default_value = (0.55, 0.65, 0.85, 1); bg.inputs['Strength'].default_value = 0.55
    bpy.ops.object.light_add(type='SUN'); sol = bpy.context.object
    d = Vector((1.0, -1.0, -0.85)).normalized()            # o sol vem do noroeste
    sol.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler(); sol.data.energy = 3.2; sol.data.angle = math.radians(3)
    bpy.ops.object.camera_add(location=(0, 0, 50)); cam = bpy.context.object
    cam.data.type = 'ORTHO'; cam.data.ortho_scale = ESP; S.camera = cam
    return S

def textura(tipo, escala, **kw):
    t = bpy.data.textures.new(tipo, tipo); t.noise_scale = escala
    for k, v in kw.items(): setattr(t, k, v)
    return t

def terreno(nome, P):
    S = cena()
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=TAM, y_subdivisions=TAM, size=ESP)
    chao = bpy.context.object
    # relevo de verdade: duas camadas de deslocamento (formas grandes + detalhe)
    m1 = chao.modifiers.new('relevo', 'DISPLACE'); m1.texture = textura('CLOUDS', P['escala'] * 0.5, noise_depth=4); m1.strength = P['desloc'] * 2.5; m1.mid_level = 0.5
    m1b = chao.modifiers.new('detalhe', 'DISPLACE'); m1b.texture = textura('CLOUDS', 0.18, noise_depth=2); m1b.strength = P['desloc'] * 0.8; m1b.mid_level = 0.5
    if P.get('pedras') or P.get('rachas'):
        tv = textura('VORONOI', 0.45, distance_metric='DISTANCE', color_mode='INTENSITY'); tv.noise_intensity = 1.2
        m2 = chao.modifiers.new('pedras', 'DISPLACE'); m2.texture = tv; m2.strength = P['desloc'] * 0.7; m2.mid_level = 0.6
    if P.get('ondas'):
        to = textura('WOOD', 0.6, wood_type='BANDNOISE', noise_basis_2='SIN', turbulence=6.0)
        m3 = chao.modifiers.new('ondas', 'DISPLACE'); m3.texture = to; m3.strength = P['desloc'] * 0.9; m3.mid_level = 0.5
    # a origem dos padrões fica longe da imagem (alguns padrões espelham na origem e deixariam uma linha)
    ori = bpy.data.objects.new('origem', None); bpy.context.collection.objects.link(ori); ori.location = (731.37, -517.91, 0)
    for md in chao.modifiers: md.texture_coords = 'OBJECT'; md.texture_coords_object = ori
    bpy.ops.object.shade_smooth()
    # material
    mt = bpy.data.materials.new(nome); mt.use_nodes = True; nt = mt.node_tree; nd = nt.nodes; ln = nt.links
    b = nd['Principled BSDF']; b.inputs['Roughness'].default_value = 0.92; b.inputs['Specular IOR Level'].default_value = 0.2
    co = nd.new('ShaderNodeTexCoord')
    ruido = nd.new('ShaderNodeTexNoise'); ruido.inputs['Scale'].default_value = 0.35; ruido.inputs['Detail'].default_value = 8; ruido.inputs['Roughness'].default_value = 0.62
    ln.new(co.outputs['Object'], ruido.inputs['Vector'])
    rampa = nd.new('ShaderNodeValToRGB'); ln.new(ruido.outputs['Fac'], rampa.inputs[0])
    e = rampa.color_ramp.elements; e[0].position = 0.4; e[0].color = hexrgb(P['cores'][0]); e[1].position = 0.6; e[1].color = hexrgb(P['cores'][2])
    meio = e.new(0.5); meio.color = hexrgb(P['cores'][1])
    cor = rampa.outputs['Color']
    # variação média (uns 40 cm)
    meso = nd.new('ShaderNodeTexNoise'); meso.inputs['Scale'].default_value = 2.6; meso.inputs['Detail'].default_value = 6; ln.new(co.outputs['Object'], meso.inputs['Vector'])
    rm2 = nd.new('ShaderNodeValToRGB'); ln.new(meso.outputs['Fac'], rm2.inputs[0]); e2 = rm2.color_ramp.elements; e2[0].position = 0.35; e2[0].color = hexrgb(P['cores'][0]); e2[1].position = 0.68; e2[1].color = hexrgb(P['cores'][2])
    mm = nd.new('ShaderNodeMix'); mm.data_type = 'RGBA'; mm.inputs['Factor'].default_value = 0.45; ln.new(cor, mm.inputs['A']); ln.new(rm2.outputs['Color'], mm.inputs['B']); cor = mm.outputs['Result']
    # tufos de capim / torrões: cada célula é um montinho com sombra na borda
    alt = None
    if P.get('tufo'):
        tu = nd.new('ShaderNodeTexVoronoi'); tu.inputs['Scale'].default_value = P['tufo']; tu.inputs['Randomness'].default_value = 1.0
        dist = nd.new('ShaderNodeTexNoise'); dist.inputs['Scale'].default_value = 3; ln.new(co.outputs['Object'], dist.inputs['Vector'])
        sm = nd.new('ShaderNodeVectorMath'); sm.operation = 'MULTIPLY_ADD'; sm.inputs[1].default_value = (0.12, 0.12, 0.12); ln.new(dist.outputs['Color'], sm.inputs[0]); ln.new(co.outputs['Object'], sm.inputs[2]); ln.new(sm.outputs['Vector'], tu.inputs['Vector'])
        tr = nd.new('ShaderNodeMapRange'); tr.inputs['From Min'].default_value = 0.15; tr.inputs['From Max'].default_value = 0.55; ln.new(tu.outputs['Distance'], tr.inputs['Value'])
        cr = nd.new('ShaderNodeValToRGB'); ln.new(tu.outputs['Color'], cr.inputs[0]); cr.color_ramp.elements[0].color = hexrgb(P['cores'][0]); cr.color_ramp.elements[1].color = hexrgb(P['cores'][2])
        mt1 = nd.new('ShaderNodeMix'); mt1.data_type = 'RGBA'; mt1.inputs['Factor'].default_value = 0.35; ln.new(cor, mt1.inputs['A']); ln.new(cr.outputs['Color'], mt1.inputs['B']); cor = mt1.outputs['Result']
        mt2 = nd.new('ShaderNodeMix'); mt2.data_type = 'RGBA'; ln.new(tr.outputs['Result'], mt2.inputs['Factor']); ln.new(cor, mt2.inputs['A']); mt2.inputs['B'].default_value = hexrgb(P['cores'][0], 0.7); cor = mt2.outputs['Result']
        inv = nd.new('ShaderNodeMath'); inv.operation = 'SUBTRACT'; inv.inputs[0].default_value = 1.0; ln.new(tu.outputs['Distance'], inv.inputs[1]); alt = inv.outputs['Value']
    # manchas grandes (capim seco, folhas, neve, musgo, poças...)
    mc, ms, mlim = P['manchas']
    rm = nd.new('ShaderNodeTexNoise'); rm.inputs['Scale'].default_value = ms / ESP * 3; rm.inputs['Detail'].default_value = 5; ln.new(co.outputs['Object'], rm.inputs['Vector'])
    mr = nd.new('ShaderNodeMapRange'); mr.inputs['From Min'].default_value = mlim; mr.inputs['From Max'].default_value = mlim + 0.08; ln.new(rm.outputs['Fac'], mr.inputs['Value'])
    mx = nd.new('ShaderNodeMix'); mx.data_type = 'RGBA'; ln.new(mr.outputs['Result'], mx.inputs['Factor']); ln.new(cor, mx.inputs['A']); mx.inputs['B'].default_value = hexrgb(mc); cor = mx.outputs['Result']
    # pontinhos (pedrinhas, flores secas, gravetos)
    pc, ps, plim = P['pontos']
    vor = nd.new('ShaderNodeTexVoronoi'); vor.inputs['Scale'].default_value = ps / ESP * 4; ln.new(co.outputs['Object'], vor.inputs['Vector'])
    pr = nd.new('ShaderNodeMapRange'); pr.inputs['From Min'].default_value = plim; pr.inputs['From Max'].default_value = plim * 0.6; ln.new(vor.outputs['Distance'], pr.inputs['Value'])
    mx2 = nd.new('ShaderNodeMix'); mx2.data_type = 'RGBA'; ln.new(pr.outputs['Result'], mx2.inputs['Factor']); ln.new(cor, mx2.inputs['A']); mx2.inputs['B'].default_value = hexrgb(pc); cor = mx2.outputs['Result']
    # rachaduras escuras
    if P.get('rachas'):
        rv = nd.new('ShaderNodeTexVoronoi'); rv.feature = 'DISTANCE_TO_EDGE'; rv.inputs['Scale'].default_value = 0.9
        rn = nd.new('ShaderNodeTexNoise'); rn.inputs['Scale'].default_value = 1.5; rn.inputs['Detail'].default_value = 6; ln.new(co.outputs['Object'], rn.inputs['Vector'])
        rsm = nd.new('ShaderNodeVectorMath'); rsm.operation = 'MULTIPLY_ADD'; rsm.inputs[1].default_value = (0.6, 0.6, 0.6); ln.new(rn.outputs['Color'], rsm.inputs[0]); ln.new(co.outputs['Object'], rsm.inputs[2]); ln.new(rsm.outputs['Vector'], rv.inputs['Vector'])
        rr = nd.new('ShaderNodeMapRange'); rr.inputs['From Min'].default_value = 0.025; rr.inputs['From Max'].default_value = 0.0; ln.new(rv.outputs['Distance'], rr.inputs['Value'])
        mx3 = nd.new('ShaderNodeMix'); mx3.data_type = 'RGBA'; ln.new(rr.outputs['Result'], mx3.inputs['Factor']); ln.new(cor, mx3.inputs['A']); mx3.inputs['B'].default_value = hexrgb(P['cores'][0], 0.6); cor = mx3.outputs['Result']
    # fios de capim / grão fino (relevo pequeno no material)
    fino = nd.new('ShaderNodeTexNoise'); fino.inputs['Scale'].default_value = 14 if P.get('fios') else 18; fino.inputs['Detail'].default_value = 4
    if P.get('fios'):
        est = nd.new('ShaderNodeMapping'); est.inputs['Scale'].default_value = (1, 2.2, 1); est.inputs['Rotation'].default_value = (0, 0, 0.6); ln.new(co.outputs['Object'], est.inputs['Vector']); ln.new(est.outputs['Vector'], fino.inputs['Vector'])
    else: ln.new(co.outputs['Object'], fino.inputs['Vector'])
    h = fino.outputs['Fac']
    if alt is not None:
        so = nd.new('ShaderNodeMath'); so.operation = 'MULTIPLY_ADD'; so.inputs[1].default_value = 0.6; ln.new(alt, so.inputs[0]); ln.new(fino.outputs['Fac'], so.inputs[2]); h = so.outputs['Value']
    bu = nd.new('ShaderNodeBump'); bu.inputs['Strength'].default_value = P['bump']; bu.inputs['Distance'].default_value = 0.08; ln.new(h, bu.inputs['Height']); ln.new(bu.outputs['Normal'], b.inputs['Normal'])
    # grão fino na cor (cada pixel um pouco diferente)
    gr = nd.new('ShaderNodeTexNoise'); gr.inputs['Scale'].default_value = 22; gr.inputs['Detail'].default_value = 2; ln.new(co.outputs['Object'], gr.inputs['Vector'])
    gc = nd.new('ShaderNodeValToRGB'); ln.new(gr.outputs['Fac'], gc.inputs[0]); gc.color_ramp.elements[0].color = hexrgb(P['cores'][0]); gc.color_ramp.elements[1].color = hexrgb(P['cores'][2])
    mg = nd.new('ShaderNodeMix'); mg.data_type = 'RGBA'; mg.inputs['Factor'].default_value = 0.22; ln.new(cor, mg.inputs['A']); ln.new(gc.outputs['Color'], mg.inputs['B']); cor = mg.outputs['Result']
    ln.new(cor, b.inputs['Base Color'])
    # poças brilhantes
    if P.get('poças'):
        pz = nd.new('ShaderNodeMapRange'); pz.inputs['From Min'].default_value = mlim + 0.02; pz.inputs['From Max'].default_value = mlim + 0.06; pz.inputs['To Min'].default_value = 0.9; pz.inputs['To Max'].default_value = 0.08; ln.new(rm.outputs['Fac'], pz.inputs['Value']); ln.new(pz.outputs['Result'], b.inputs['Roughness'])
    chao.data.materials.append(mt)
    S.render.filepath = f'{OUT}/{nome}.png'
    bpy.ops.render.render(write_still=True)

for nome, P in TERRENOS.items():
    if SO and nome not in SO: continue
    terreno(nome, P)
    print('ok', nome)
print('FIM')
