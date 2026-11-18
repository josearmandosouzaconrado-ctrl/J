# Oceano realista para o mar do jogo (Blender 4.2, modificador Ocean + Cycles).
# Renderiza de cima, em câmera ortográfica, exatamente um período do oceano (a simulação FFT
# se repete no espaço) -> a textura emenda sem costura em todas as direções.
# Gera 2N quadros no tempo; folha_oceano.py junta em N quadros que fecham o laço sem pulo.
# Uso: python oceano.py -- <pasta> [N] [tam]
import bpy, math, sys, os
ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = ARGS[0] if ARGS else '/tmp/oceano'; N = int(ARGS[1]) if len(ARGS) > 1 else 24; TAM = int(ARGS[2]) if len(ARGS) > 2 else 384
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
S = bpy.context.scene
ESP = 42.0        # tamanho do pedaço de oceano (m) = 24 quadradinhos do jogo
DT = 0.125        # segundos de simulação por quadro (8 quadros por segundo no jogo)

# ---- o oceano ----
bpy.ops.mesh.primitive_plane_add(size=2)
mar = bpy.context.object
oc = mar.modifiers.new('Ocean', 'OCEAN')
oc.geometry_mode = 'GENERATE'; oc.resolution = 16; oc.spatial_size = int(ESP); oc.repeat_x = 3; oc.repeat_y = 3
oc.wave_scale = 1.7; oc.choppiness = 1.2; oc.wind_velocity = 10.0; oc.wave_alignment = 0.35; oc.wave_direction = 0.6
oc.damping = 0.6; oc.random_seed = 7
oc.use_normals = True; oc.use_foam = True; oc.foam_layer_name = 'espuma'; oc.foam_coverage = 0.3
bpy.ops.object.shade_smooth()

# ---- material da água ----
m = bpy.data.materials.new('agua'); m.use_nodes = True; nt = m.node_tree; nd = nt.nodes; ln = nt.links
bsdf = nd['Principled BSDF']
bsdf.inputs['Roughness'].default_value = 0.06; bsdf.inputs['IOR'].default_value = 1.33
bsdf.inputs['Specular IOR Level'].default_value = 0.45
# cor: azul profundo nas partes planas, mais claro e esverdeado nas encostas das ondas
geo = nd.new('ShaderNodeNewGeometry'); sep = nd.new('ShaderNodeSeparateXYZ'); ln.new(geo.outputs['Normal'], sep.inputs[0])
rampa = nd.new('ShaderNodeValToRGB'); ln.new(sep.outputs['Z'], rampa.inputs[0])
rampa.color_ramp.elements[0].position = 0.78; rampa.color_ramp.elements[0].color = (0.018, 0.16, 0.24, 1)
rampa.color_ramp.elements[1].position = 1.0; rampa.color_ramp.elements[1].color = (0.004, 0.045, 0.14, 1)
# espuma (atributo gerado pelo modificador)
at = nd.new('ShaderNodeAttribute'); at.attribute_name = 'espuma'
fr = nd.new('ShaderNodeMapRange'); fr.inputs['From Min'].default_value = 0.45; fr.inputs['From Max'].default_value = 1.1; ln.new(at.outputs['Fac'], fr.inputs['Value'])
mix = nd.new('ShaderNodeMix'); mix.data_type = 'RGBA'; ln.new(fr.outputs['Result'], mix.inputs['Factor'])
ln.new(rampa.outputs['Color'], mix.inputs['A']); mix.inputs['B'].default_value = (0.85, 0.92, 0.95, 1)
ln.new(mix.outputs['Result'], bsdf.inputs['Base Color'])
rg = nd.new('ShaderNodeMapRange'); rg.inputs['To Min'].default_value = 0.06; rg.inputs['To Max'].default_value = 0.6; ln.new(fr.outputs['Result'], rg.inputs['Value']); ln.new(rg.outputs['Result'], bsdf.inputs['Roughness'])
mar.data.materials.append(m)

# ---- céu e sol (o que a água reflete) ----
W = bpy.data.worlds.new('ceu'); S.world = W; W.use_nodes = True
sky = W.node_tree.nodes.new('ShaderNodeTexSky'); sky.sky_type = 'NISHITA'; sky.sun_elevation = math.radians(35); sky.sun_rotation = math.radians(200); sky.sun_size = math.radians(1.5)
W.node_tree.links.new(sky.outputs['Color'], W.node_tree.nodes['Background'].inputs['Color']); W.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.12

# ---- câmera ortográfica de cima, enquadrando exatamente um período ----
bpy.ops.object.camera_add(location=(0, 0, 60)); cam = bpy.context.object; cam.rotation_euler = (0, 0, 0)
cam.data.type = 'ORTHO'; cam.data.ortho_scale = ESP; S.camera = cam
S.render.engine = 'CYCLES'; S.cycles.device = 'CPU'; S.cycles.samples = 24; S.cycles.use_denoising = True
S.render.resolution_x = TAM; S.render.resolution_y = TAM; S.render.film_transparent = False
S.view_settings.view_transform = 'Standard'
S.render.image_settings.file_format = 'PNG'
# a malha gerada cobre 3x3 períodos: a câmera mira o centro do período do meio
bpy.context.view_layer.update()
ev = mar.evaluated_get(bpy.context.evaluated_depsgraph_get()).to_mesh()
xs = [v.co.x for v in ev.vertices]; ys = [v.co.y for v in ev.vertices]
cam.location.x = (min(xs) + max(xs)) / 2; cam.location.y = (min(ys) + max(ys)) / 2
print('malha', min(xs), max(xs), min(ys), max(ys), 'periodo', ESP)
for q in range(2 * N):
    oc.time = q * DT
    S.render.filepath = f'{OUT}/q{q:03d}.png'
    bpy.ops.render.render(write_still=True)
print('FIM')
