"""Fachadas dos prédios altos modeladas em 3D no Blender e fotografadas de frente (com sombra de verdade
embaixo das varandas, sobrancelhas e molduras). Cada imagem cobre 4 janelas x 4 andares (14,4 x 14,4 m) e se
repete sem emenda; a segunda imagem de cada estilo é a das janelas acesas à noite.
Uso (Blender como módulo): python -I fachadas.py -- ../../www/modelos/fachadas.js [pasta_previas]
Estilos: concreto (apartamentos com varandas), vidro (pele de vidro), deco (art déco de Miami Beach), tijolo.
As paredes saem quase brancas: o jogo pinta cada prédio com a cor dele.
"""
import sys, os, io, math, json, base64, random
import bpy
from mathutils import Vector

ARGS = sys.argv[sys.argv.index('--') + 1:]
SAIDA = ARGS[0]
PREVIAS = ARGS[1] if len(ARGS) > 1 else None
BAIA, ANDAR, REP, PX = 3.6, 3.6, 4, 512
EXTRA = 2   # baias/andares extras fora da foto (sombra e reflexo contínuos na emenda)

def limpar():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def mat(nome, cor, rug=0.8, metal=0.0, emis=None, ruido=0.0, tijolo=False):
    m = bpy.data.materials.new(nome); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Roughness'].default_value = rug; b.inputs['Metallic'].default_value = metal
    if tijolo:
        t = nt.nodes.new('ShaderNodeTexBrick'); t.inputs['Scale'].default_value = 1.0
        t.inputs['Brick Width'].default_value = 0.24; t.inputs['Row Height'].default_value = 0.075; t.inputs['Mortar Size'].default_value = 0.012
        t.inputs['Color1'].default_value = (0.92, 0.9, 0.87, 1); t.inputs['Color2'].default_value = (0.7, 0.67, 0.64, 1); t.inputs['Mortar'].default_value = (1, 1, 1, 1)
        t.inputs['Mortar Size'].default_value = 0.015
        co = nt.nodes.new('ShaderNodeNewGeometry')
        sep = nt.nodes.new('ShaderNodeSeparateXYZ'); comb = nt.nodes.new('ShaderNodeCombineXYZ')
        nt.links.new(co.outputs['Position'], sep.inputs[0]); nt.links.new(sep.outputs['X'], comb.inputs['X']); nt.links.new(sep.outputs['Z'], comb.inputs['Y'])
        nt.links.new(comb.outputs[0], t.inputs['Vector'])
        nt.links.new(t.outputs['Color'], b.inputs['Base Color'])
    elif ruido:
        n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = 3; n.inputs['Detail'].default_value = 6
        r = nt.nodes.new('ShaderNodeValToRGB')
        r.color_ramp.elements[0].color = (*[c * (1 - ruido) for c in cor], 1); r.color_ramp.elements[1].color = (*cor, 1)
        nt.links.new(n.outputs['Fac'], r.inputs['Fac']); nt.links.new(r.outputs['Color'], b.inputs['Base Color'])
    else:
        b.inputs['Base Color'].default_value = (*cor, 1)
    if emis:
        b.inputs['Emission Color'].default_value = (*emis, 1); b.inputs['Emission Strength'].default_value = 1.0
    return m

def caixa(dim, pos, m):
    bpy.ops.mesh.primitive_cube_add(size=1, location=pos)
    o = bpy.context.object; o.scale = dim; o.data.materials.append(m)
    return o

# a fachada fica no plano XZ, olhando para -Y; x = largura, z = altura
def construir(estilo, noite, rnd):
    limpar()
    W = (REP + 2 * EXTRA) * BAIA
    preto = mat('preto', (0, 0, 0), 1.0)
    def M(nome, *a, **k): return preto if noite else mat(nome, *a, **k)
    parede = M('parede', (0.93, 0.92, 0.9), 0.85, ruido=0.08) if estilo != 'tijolo' else M('tijolo', (1, 1, 1), 0.9, tijolo=True)
    laje = M('laje', (0.8, 0.79, 0.77), 0.8, ruido=0.1)
    alum = M('alum', (0.62, 0.64, 0.66), 0.4, 0.6)
    # pele de vidro reflete o céu (clara, azulada); janelas comuns são mais escuras
    if estilo == 'vidro':
        vidros_dia = [mat(f'vidro{i}', (0.36 + 0.06 * i / 5, 0.47 + 0.08 * i / 5, 0.58 + 0.1 * i / 5), 0.1, 0.1) for i in range(6)]
    else:
        vidros_dia = [mat(f'vidro{i}', (0.14 + 0.06 * i / 5, 0.19 + 0.08 * i / 5, 0.25 + 0.1 * i / 5), 0.06, 0.2) for i in range(6)]
    def vidro():
        # reflexo do céu varia de um painel para outro
        if not noite: return vidros_dia[rnd.randrange(6)]
        if rnd.random() < 0.42:
            k = 0.7 + rnd.random() * 0.3
            return mat('luz', (0, 0, 0), 1.0, emis=(1.0 * k, (0.78 + rnd.random() * 0.15) * k, (0.5 + rnd.random() * 0.25) * k))
        return preto
    for f in range(-EXTRA, REP + EXTRA):
        z0 = f * ANDAR
        for b in range(-EXTRA, REP + EXTRA):
            x0 = b * BAIA; xc = x0 + BAIA / 2
            if estilo == 'concreto':
                # apartamento: janela com caixilho, varanda de laje com guarda-corpo em baias alternadas
                caixa((BAIA, 0.3, ANDAR), (xc, 0.15, z0 + ANDAR / 2), parede)
                caixa((1.9, 0.12, 1.5), (xc, -0.02, z0 + 1.0 + 0.75), alum)
                caixa((1.78, 0.12, 1.38), (xc, -0.06, z0 + 1.0 + 0.75), vidro())
                caixa((0.04, 0.14, 1.38), (xc, -0.07, z0 + 1.75), alum)
                caixa((2.1, 0.25, 0.06), (xc, -0.1, z0 + 0.97), laje)
                if b % 2 == 1:
                    caixa((BAIA - 0.2, 1.1, 0.16), (xc, -0.55, z0 + 0.08), laje)
                    for k in range(9): caixa((0.035, 0.035, 1.0), (x0 + 0.25 + k * 0.39, -1.05, z0 + 0.66), alum)
                    caixa((BAIA - 0.2, 0.05, 0.05), (xc, -1.05, z0 + 1.15), alum)
                caixa((BAIA, 0.4, 0.18), (xc, -0.05, z0 + 0.09), laje)          # faixa da laje
            elif estilo == 'vidro':
                # pele de vidro: dois painéis por baia, montantes salientes e faixa opaca na laje
                for k in (0, 1):
                    caixa((BAIA / 2 - 0.06, 0.1, ANDAR - 0.55), (x0 + BAIA / 4 + k * BAIA / 2, 0.0, z0 + 0.55 + (ANDAR - 0.55) / 2), vidro())
                caixa((BAIA, 0.12, 0.55), (xc, 0.02, z0 + 0.275), M('spandrel', (0.5, 0.55, 0.6), 0.3, 0.4))
                for k in (0, 1): caixa((0.07, 0.22, ANDAR), (x0 + k * BAIA / 2, -0.06, z0 + ANDAR / 2), alum)
                caixa((BAIA, 0.18, 0.06), (xc, -0.05, z0 + 0.55), alum)
                caixa((BAIA, 0.4, 0.4), (xc, 0.25, z0 + ANDAR / 2), parede)        # fundo
            elif estilo == 'deco':
                # art déco: janela quadrada, "sobrancelha" saliente, pilastras a cada duas baias e frisos
                caixa((BAIA, 0.3, ANDAR), (xc, 0.15, z0 + ANDAR / 2), parede)
                caixa((1.5, 0.1, 1.45), (xc, -0.01, z0 + 1.05 + 0.72), M('moldura', (0.97, 0.97, 0.96), 0.6))
                caixa((1.36, 0.12, 1.32), (xc, -0.04, z0 + 1.05 + 0.72), vidro())
                caixa((0.05, 0.14, 1.32), (xc, -0.05, z0 + 1.77), alum)
                caixa((2.2, 0.55, 0.08), (xc, -0.28, z0 + 2.62), laje)          # sobrancelha
                if b % 2 == 0: caixa((0.32, 0.3, ANDAR), (x0, -0.1, z0 + ANDAR / 2), parede)
                for k in range(3): caixa((BAIA, 0.05, 0.05), (xc, -0.02, z0 + 0.25 + k * 0.12), laje)
            else:
                # tijolo: janela alta com verga e peitoril de pedra clara
                caixa((BAIA, 0.3, ANDAR), (xc, 0.15, z0 + ANDAR / 2), parede)
                caixa((1.3, 0.1, 2.0), (xc, -0.01, z0 + 0.9 + 1.0), M('moldura', (0.97, 0.96, 0.94), 0.6))
                caixa((1.16, 0.12, 1.86), (xc, -0.04, z0 + 1.9), vidro())
                caixa((0.04, 0.14, 1.86), (xc, -0.05, z0 + 1.9), M('caix', (0.95, 0.95, 0.93), 0.5))
                caixa((1.6, 0.25, 0.22), (xc, -0.08, z0 + 3.02), M('pedra', (0.9, 0.88, 0.84), 0.8))
                caixa((1.5, 0.28, 0.1), (xc, -0.1, z0 + 0.86), M('pedra2', (0.9, 0.88, 0.84), 0.8))
    sc = bpy.context.scene
    cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
    cam.data.type = 'ORTHO'; cam.data.ortho_scale = REP * BAIA
    cam.location = (REP * BAIA / 2, -40, REP * ANDAR / 2); cam.rotation_euler = (math.radians(90), 0, 0)
    sc.world = bpy.data.worlds.new('w'); sc.world.use_nodes = True
    bg = sc.world.node_tree.nodes['Background']
    if noite:
        bg.inputs['Strength'].default_value = 0
    else:
        bg.inputs['Color'].default_value = (1, 1, 1, 1); bg.inputs['Strength'].default_value = 0.75
        sol = bpy.data.objects.new('sol', bpy.data.lights.new('sol', 'SUN')); sol.data.energy = 2.2; sol.data.angle = math.radians(8)
        sol.rotation_euler = (math.radians(38), 0, math.radians(-25)); sc.collection.objects.link(sol)
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 64 if not noite else 8; sc.cycles.use_denoising = True
    sc.view_settings.view_transform = 'Standard'
    sc.render.resolution_x = sc.render.resolution_y = PX
    caminho = os.path.join(PREVIAS or '/tmp', f'fachada_{estilo}_{"noite" if noite else "dia"}.png')
    sc.render.filepath = caminho
    bpy.ops.render.render(write_still=True)
    return caminho

def jpeg(caminho):
    import struct
    # converte com o próprio Blender (sem PIL): carrega e salva como JPEG
    im = bpy.data.images.load(caminho)
    sc = bpy.context.scene
    sc.render.image_settings.file_format = 'JPEG'; sc.render.image_settings.quality = 86
    out = caminho[:-4] + '.jpg'
    im.save_render(out, scene=sc)
    sc.render.image_settings.file_format = 'PNG'
    return 'data:image/jpeg;base64,' + base64.b64encode(open(out, 'rb').read()).decode()

res = {}
for est in ('concreto', 'vidro', 'deco', 'tijolo'):
    dia = construir(est, False, random.Random(1))
    noite = construir(est, True, random.Random({'concreto': 3, 'vidro': 5, 'deco': 7, 'tijolo': 9}[est]))
    res[est] = {'cor': jpeg(dia), 'luz': jpeg(noite)}
    print(est, 'ok')
with open(SAIDA, 'w') as f:
    f.write('// Fachadas dos prédios modeladas no Blender por ferramentas/predios/fachadas.py (não editar à mão)\n')
    f.write('window.FACHADAS = ' + json.dumps(res, separators=(',', ':')) + ';\n')
print('ok', os.path.getsize(SAIDA))
