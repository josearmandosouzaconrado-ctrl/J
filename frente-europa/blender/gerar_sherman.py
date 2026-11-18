#!/usr/bin/env python3
"""Sherman detalhado do jogo a partir do modelo M4_Sherman.usdz enviado pelo dono do projeto.

Fonte: blender/fontes/sherman/scene.usdc (+ texturas em 0/). O arquivo não trazia autor nem licença
(veja blender/fontes/sherman/LEIA-ME.txt).

O que este script faz:
  1. Importa o USD e separa a TORRE (torre, mantelete, canhão de 75 mm, metralhadora .50, antena)
     do CASCO, para a torre girar no jogo (nó "Torre", origem no centro do anel da torre).
  2. Escala real: 2,62 m de largura (5,9 m de comprimento), esteiras no chão (z = 0), frente em -Y.
  3. Leveza para celular: de ~279 mil para ~12 mil triângulos; todas as texturas PBR juntadas num
     único atlas de cor (1 material, 2 peças).
  4. Versão do Eixo (sherman_eixo.glb) com a pintura acinzentada e sem a estrela americana.

Uso: blender -b -P blender/gerar_sherman.py   (ou python3 com o módulo bpy)
"""
import math
import os

import bpy
from mathutils import Vector

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
FONTE = os.path.join(AQUI, 'fontes', 'sherman', 'scene.usdc')
SAIDA = os.path.join(RAIZ, 'public', 'models')
PREV = os.path.join(AQUI, 'previews')
LARGURA_REAL = 2.62
TRI_CASCO, TRI_TORRE = 8500, 3500
ATLAS = 2048
MATS_TORRE = ('M4_Base_Tower', 'MG_M4A2_001')
DESCARTAR = ('Bullet_Firefly',)   # projétil solto em cima da torre (20 mil triângulos)


def caixa(o):
    b = [o.matrix_world @ Vector(c) for c in o.bound_box]
    return Vector(map(min, *b)), Vector(map(max, *b))


def importar():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.wm.usd_import(filepath=FONTE)
    for o in list(bpy.context.scene.objects):
        if o.type != 'MESH':
            continue
    objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    torre, casco = [], []
    for o in objs:
        mat = o.data.materials[0].name if o.data.materials else ''
        if mat in DESCARTAR:
            bpy.data.objects.remove(o, do_unlink=True)
            continue
        lo, hi = caixa(o)
        c = (lo + hi) / 2
        no_teto = lo.z > 0.36 and math.hypot(c.x, c.y - 0.2) < 0.62
        (torre if mat in MATS_TORRE or no_teto else casco).append(o)
    # cada peça só com a 1ª UV (no USD ela se chama 'st' e os nós de textura usam esse nome)
    for o in torre + casco:
        uvs = o.data.uv_layers
        while len(uvs) > 1:
            uvs.remove(uvs[-1])
    return juntar(torre, 'Torre'), juntar(casco, 'Casco')


def juntar(objs, nome):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.parent_clear(type='CLEAR_KEEP_TRANSFORM')
    bpy.ops.object.join()
    o = bpy.context.active_object
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    o.name = o.data.name = nome
    return o


def escala_real(torre, casco):
    lo, hi = caixa(casco)
    k = LARGURA_REAL / (hi.x - lo.x)
    lo2, _ = caixa(torre)
    zmin = min(lo.z, lo2.z)
    for o in (torre, casco):
        for v in o.data.vertices:
            v.co = Vector(((v.co.x) * k, (v.co.y) * k, (v.co.z - zmin) * k))
        o.data.update()
    # pivô da torre: centro do anel (centro x/y da torre principal, na altura do teto do casco)
    lo, hi = caixa(torre)
    pivo = Vector((0.0, 0.195 * k, (0.29 - zmin) * k))
    bpy.context.scene.cursor.location = pivo
    bpy.ops.object.select_all(action='DESELECT')
    torre.select_set(True)
    bpy.context.view_layer.objects.active = torre
    bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
    bpy.context.scene.cursor.location = (0, 0, 0)
    print('ESCALA', round(k, 3), 'COMPRIMENTO', round((caixa(casco)[1].y - caixa(casco)[0].y), 2), 'ALTURA',
          round(caixa(torre)[1].z, 2))


def reduzir(o, alvo):
    bpy.context.view_layer.objects.active = o
    # 1º: junta faces no mesmo plano (não deforma nada)
    md = o.modifiers.new('Planar', 'DECIMATE')
    md.decimate_type = 'DISSOLVE'
    md.angle_limit = math.radians(4)
    md.delimit = {'UV'}
    bpy.ops.object.modifier_apply(modifier=md.name)
    tris = sum(len(p.vertices) - 2 for p in o.data.polygons)
    if tris <= alvo:
        return
    md = o.modifiers.new('Reduzir', 'DECIMATE')
    md.ratio = alvo / tris
    md.use_collapse_triangulate = True
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.modifier_apply(modifier=md.name)


def tingir_eixo():
    """Pintura acinzentada (feldgrau) para os tanques do Eixo."""
    for m in bpy.data.materials:
        if not m.node_tree or not m.name.startswith('M4_Base') or 'Tracks' in m.name or 'Suspension' in m.name:
            continue
        nt = m.node_tree
        b = next((n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'), None)
        if not b:
            continue
        link = next((l for l in nt.links if l.to_socket == b.inputs['Base Color']), None)
        hs = nt.nodes.new('ShaderNodeHueSaturation')
        hs.inputs['Saturation'].default_value = 0.15
        hs.inputs['Value'].default_value = 1.15
        if link:
            src = link.from_socket
            nt.links.remove(link)
            nt.links.new(src, hs.inputs['Color'])
        else:
            hs.inputs['Color'].default_value = b.inputs['Base Color'].default_value
        nt.links.new(hs.outputs['Color'], b.inputs['Base Color'])


def bake_e_exportar(torre, casco, nome):
    objs = [casco, torre]
    for o in objs:
        me = o.data
        me.uv_layers[0].active_render = True
        at = me.uv_layers.new(name='Atlas')
        me.uv_layers.active = at
    # UV do atlas das duas peças juntas (sem sobreposição)
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = casco
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(60), island_margin=0.002)
    bpy.ops.object.mode_set(mode='OBJECT')
    img = bpy.data.images.new(nome + '_atlas', ATLAS, ATLAS)
    for o in objs:
        for m in o.data.materials:
            nt = m.node_tree
            n = nt.nodes.new('ShaderNodeTexImage')
            n.image = img
            nt.nodes.active = n
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = 1
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}, margin=4, use_clear=True)
    if nome.endswith('_eixo'):
        # tira a estrela americana: brancos viram o cinza da pintura
        import numpy as np
        px = np.array(img.pixels[:]).reshape(-1, 4)
        rgb = px[:, :3]
        branco = (rgb.min(1) > 0.45) & (rgb.max(1) - rgb.min(1) < 0.12)
        rgb[branco] = rgb[branco] * 0.0 + np.array([0.13, 0.135, 0.13])
        px[:, :3] = rgb
        img.pixels.foreach_set(px.ravel().astype(np.float32))
    caminho = os.path.join(SAIDA, nome + '_atlas.jpg')
    img.filepath_raw = caminho
    img.file_format = 'JPEG'
    img.save()
    img.pack()
    novo = bpy.data.materials.new('Pintura')
    if novo.node_tree is None:
        novo.use_nodes = True
    b = novo.node_tree.nodes.get('Principled BSDF')
    b.inputs['Roughness'].default_value = 0.8
    b.inputs['Metallic'].default_value = 0.1
    t = novo.node_tree.nodes.new('ShaderNodeTexImage')
    t.image = img
    novo.node_tree.links.new(t.outputs['Color'], b.inputs['Base Color'])
    for o in objs:
        me = o.data
        me.materials.clear()
        me.materials.append(novo)
        me.uv_layers.remove(me.uv_layers[0])
        me.uv_layers.active = me.uv_layers[0]
        me.uv_layers[0].active_render = True
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=os.path.join(SAIDA, nome + '.glb'), export_format='GLB', use_selection=True,
                              export_apply=True, export_yup=True, export_image_format='JPEG')
    os.remove(caminho)
    print('OK', nome, sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in objs), 'triângulos')


def preview(nome):
    sc = bpy.context.scene
    sc.cycles.samples = 24
    sc.render.resolution_x, sc.render.resolution_y = 640, 480
    sc.render.image_settings.file_format = 'JPEG'
    if not sc.world:
        sc.world = bpy.data.worlds.new('Mundo')
    if sc.world.node_tree is None:
        sc.world.use_nodes = True
    bg = sc.world.node_tree.nodes['Background']
    bg.inputs['Color'].default_value = (0.55, 0.6, 0.68, 1)
    bg.inputs['Strength'].default_value = 1.6
    if not bpy.data.objects.get('SolPrev'):
        sol = bpy.data.objects.new('SolPrev', bpy.data.lights.new('SolPrev', 'SUN'))
        sol.data.energy = 4
        sol.rotation_euler = (math.radians(40), math.radians(10), math.radians(-30))
        sc.collection.objects.link(sol)
    cam = bpy.data.objects.get('CamPrev') or bpy.data.objects.new('CamPrev', bpy.data.cameras.new('CamPrev'))
    if cam.name not in sc.collection.objects:
        sc.collection.objects.link(cam)
    cam.data.lens = 45
    cam.location = Vector((-6.5, -8.5, 5.0))
    cam.rotation_euler = (Vector((0, 0.3, 1.0)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
    sc.camera = cam
    sc.render.filepath = os.path.join(PREV, nome + '.jpg')
    bpy.ops.render.render(write_still=True)


def main():
    os.makedirs(SAIDA, exist_ok=True)
    for nome, eixo in (('sherman', False), ('sherman_eixo', True)):
        torre, casco = importar()
        escala_real(torre, casco)
        reduzir(casco, TRI_CASCO)
        reduzir(torre, TRI_TORRE)
        if eixo:
            tingir_eixo()
        bake_e_exportar(torre, casco, nome)
        preview(nome)


if __name__ == '__main__':
    main()
