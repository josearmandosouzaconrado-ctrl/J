#!/usr/bin/env python3
"""Roda o plugin do Blender sem janela (pip install bpy): cria o Sherman, renderiza no Cycles,
salva o .blend e exporta .glb/.obj e o plugin em .zip para minecraft/tanque_sherman/blender/."""
import math
import os
import sys
import zipfile

import bpy  # noqa: I001 (bpy precisa vir antes de addon_utils)
import addon_utils
from mathutils import Vector

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
import blender_sherman  # noqa: E402

SAIDA = os.path.abspath(os.path.join(AQUI, '..', 'minecraft', 'tanque_sherman', 'blender'))
AMOSTRAS = int(os.environ.get('AMOSTRAS', '96'))


def limpar():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    addon_utils.enable('cycles', default_set=True)
    addon_utils.enable('io_scene_gltf2', default_set=True)


def cenario():
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = AMOSTRAS
    sc.cycles.use_denoising = True
    sc.render.resolution_x, sc.render.resolution_y = 1600, 900
    sc.view_settings.view_transform = 'AgX'
    sc.view_settings.look = 'AgX - Medium High Contrast'
    sc.view_settings.exposure = -0.6
    mundo = bpy.data.worlds.new('Céu')
    sc.world = mundo
    mundo.use_nodes = True
    nt = mundo.node_tree
    ceu = nt.nodes.new('ShaderNodeTexSky')
    ceu.sky_type = 'MULTIPLE_SCATTERING' if 'MULTIPLE_SCATTERING' in ceu.bl_rna.properties['sky_type'].enum_items.keys() else 'NISHITA'
    ceu.sun_elevation = math.radians(28)
    ceu.sun_rotation = math.radians(215)
    fundo = nt.nodes['Background']
    fundo.inputs['Strength'].default_value = 0.12
    nt.links.new(ceu.outputs['Color'], fundo.inputs['Color'])
    sol = bpy.data.objects.new('Sol', bpy.data.lights.new('Sol', 'SUN'))
    sol.data.energy = 3.0
    sol.data.angle = math.radians(2)
    sol.rotation_euler = (math.radians(62), 0, math.radians(215))
    sc.collection.objects.link(sol)
    # chão de terra batida
    bpy.ops.mesh.primitive_plane_add(size=80)
    chao = bpy.context.object
    chao.name = 'Chão'
    mat = bpy.data.materials.new('Terra')
    mat.use_nodes = True
    n = mat.node_tree.nodes
    b = n['Principled BSDF']
    b.inputs['Roughness'].default_value = 0.95
    ru = n.new('ShaderNodeTexNoise')
    ru.inputs['Scale'].default_value = 2.0
    ru.inputs['Detail'].default_value = 10
    rampa = n.new('ShaderNodeValToRGB')
    rampa.color_ramp.elements[0].color = (0.11, 0.085, 0.055, 1)
    rampa.color_ramp.elements[1].color = (0.2, 0.17, 0.11, 1)
    mat.node_tree.links.new(ru.outputs['Fac'], rampa.inputs['Fac'])
    mat.node_tree.links.new(rampa.outputs['Color'], b.inputs['Base Color'])
    bump = n.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = 0.4
    mat.node_tree.links.new(ru.outputs['Fac'], bump.inputs['Height'])
    mat.node_tree.links.new(bump.outputs['Normal'], b.inputs['Normal'])
    chao.data.materials.append(mat)
    cam = bpy.data.objects.new('Câmera', bpy.data.cameras.new('Câmera'))
    sc.collection.objects.link(cam)
    sc.camera = cam
    return cam


def mirar(cam, pos, alvo, lente=50):
    cam.location = pos
    d = Vector(alvo) - Vector(pos)
    cam.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    cam.data.lens = lente


def main():
    os.makedirs(SAIDA, exist_ok=True)
    limpar()
    blender_sherman.register()
    bpy.ops.mesh.adicionar_sherman()
    cam = cenario()
    sc = bpy.context.scene
    vistas = [
        ('sherman_blender_frente.png', (-6.5, -8.5, 3.0), (0, -0.4, 1.2), 45, 1),
        ('sherman_blender_lado.png', (-11.0, -0.2, 1.6), (0, -0.2, 1.25), 48, 1),
        ('sherman_blender_tras.png', (6.0, 8.0, 4.6), (0, 0.2, 1.1), 42, 1),
        ('sherman_blender_torre.png', (-2.4, -4.6, 3.6), (0, -0.9, 2.2), 50, 60),
        ('sherman_blender_suspensao.png', (-4.2, -3.0, 0.7), (-1.1, -1.0, 0.55), 35, 1),
    ]
    so = os.environ.get('VISTAS')
    for nome, pos, alvo, lente, quadro in vistas:
        if so and nome not in so:
            continue
        sc.frame_set(quadro)
        mirar(cam, pos, alvo, lente)
        sc.render.filepath = os.path.join(SAIDA, nome)
        bpy.ops.render.render(write_still=True)
    sc.frame_set(1)
    if not so:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.join(SAIDA, 'sherman.blend'), compress=True)
        for ob in list(bpy.data.objects):  # exporta só o tanque
            ob.select_set(ob.name not in ('Chão', 'Sol', 'Câmera'))
        bpy.ops.export_scene.gltf(filepath=os.path.join(SAIDA, 'sherman.glb'), use_selection=True,
                                  export_apply=True, export_animations=True)
        bpy.ops.wm.obj_export(filepath=os.path.join(SAIDA, 'sherman.obj'), export_selected_objects=True,
                              apply_modifiers=True, export_animation=False)
        with zipfile.ZipFile(os.path.join(SAIDA, 'sherman_blender_addon.zip'), 'w', zipfile.ZIP_DEFLATED) as z:
            for arq in ('__init__.py', 'construir.py', 'blender_manifest.toml'):
                z.write(os.path.join(AQUI, 'blender_sherman', arq), arq)
    contagem = sum(len(o.data.polygons) for o in bpy.data.objects if o.type == 'MESH' and o.name != 'Chão')
    print('objetos:', len(bpy.data.objects), 'faces:', contagem)


if __name__ == '__main__':
    main()
