#!/usr/bin/env python3
"""Infantaria do jogo a partir do modelo "WW2 US Army Ranger".

Modelo original: "WW2 US Army Ranger" por Tactical_Gamer
  https://sketchfab.com/3d-models/ww2-us-army-ranger-dcbe89cd5de243af8e4677b769a831c6
  Licença CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Arquivo original: blender/fontes/ww2_us_army_ranger.glb

O que este script muda (para o jogo de estratégia no celular):
  1. Pose: o modelo vem em pose "A" (braços abertos). Os braços são dobrados em posição de pronto,
     segurando a arma na frente do peito.
  2. Arma: M1 Garand (fuzileiro) ou bazuca M1A1 (antitanque), modeladas aqui.
  3. Leveza: malha reduzida de ~27 mil para ~5 mil triângulos e as 6 texturas juntadas numa só
     (bake) -> 1 material, 1 chamada de desenho por soldado.
  4. Escala real: 1,80 m, pés no chão (z = 0), frente em -Y.
  5. Versão do Eixo: uniforme e capacete em cinza (feldgrau), sem tocar na pele.

Uso:  blender -b -P blender/gerar_soldado.py      (ou python3 com o módulo bpy)
Saída: public/models/soldado.glb, soldado_bazuca.glb, soldado_eixo.glb, soldado_bazuca_eixo.glb
"""
import math
import os

import bpy
import bmesh
import numpy as np
from mathutils import Matrix, Vector

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
FONTE = os.path.join(AQUI, 'fontes', 'ww2_us_army_ranger.glb')
SAIDA = os.path.join(RAIZ, 'public', 'models')
PREV = os.path.join(AQUI, 'previews')
TRIANGULOS = 5000
ATLAS = 1024


def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def rot_entre(a, b):
    a = a / np.linalg.norm(a); b = b / np.linalg.norm(b)
    v = np.cross(a, b); c = np.dot(a, b)
    if np.linalg.norm(v) < 1e-8:
        return np.eye(3)
    vx = np.array([[0, -v[2], v[1]], [v[2], 0, -v[0]], [-v[1], v[0], 0]])
    return np.eye(3) + vx + vx @ vx * (1 / (1 + c))


def importar():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=FONTE)
    objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    # cada peça fica só com a sua 1ª UV (TEXCOORD_0) e todas com o mesmo nome -> o join não embaralha
    for o in objs:
        uvs = o.data.uv_layers
        while len(uvs) > 1:
            uvs.remove(uvs[-1])
        if len(uvs):
            uvs[0].name = 'UVMap'
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.parent_clear(type='CLEAR_KEEP_TRANSFORM')
    bpy.ops.object.join()
    corpo = bpy.context.active_object
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    corpo.name = 'Soldado'
    for o in list(bpy.context.scene.objects):
        if o != corpo:
            bpy.data.objects.remove(o, do_unlink=True)
    return corpo


def posar(corpo):
    """Dobra os braços (pose A -> segurando a arma). Coordenadas do original: altura -1..1, frente = -Y."""
    me = corpo.data
    P = np.array([v.co[:] for v in me.vertices])
    novo = P.copy()
    alvo = {
        # o soldado olha para -Y: o lado direito dele é -X.
        # braço direito (-X): mão na coronha, perto do peito; braço esquerdo (+X): à frente, no guarda-mão
        -1: (np.array([-0.12, -0.25, -0.96]), np.array([0.32, -0.94, 0.1])),
        +1: (np.array([0.02, -0.5, -0.86]), np.array([-0.12, -0.98, 0.14])),
    }
    maos = {}
    for s in (+1, -1):
        S = np.array([s * 0.20, 0.10, 0.63])                       # ombro
        mao = P[(s * P[:, 0] > 0.5)]
        H = mao.mean(0)
        L = np.linalg.norm(H - S)
        a = (H - S) / L
        Le = 0.5 * L                                                  # cotovelo
        u1 = alvo[s][0] / np.linalg.norm(alvo[s][0])
        u2 = alvo[s][1] / np.linalg.norm(alvo[s][1])
        R1 = rot_entre(a, u1)
        R2 = rot_entre(u1, u2)
        E = S + a * Le
        E2 = S + u1 * Le
        x, z = s * P[:, 0], P[:, 2]
        m = smooth(0.17, 0.27, x) * np.where(z > 0.35, 1.0, smooth(0.27, 0.36, x))
        t = (P - S) @ a
        braco = S + (P - S) @ R1.T
        ante = E2 + (P - E) @ (R2 @ R1).T
        f = smooth(Le - 0.05, Le + 0.05, t)[:, None]
        trans = braco * (1 - f) + ante * f
        novo = novo + m[:, None] * (trans - P)
        maos[s] = E2 + (H - E) @ (R2 @ R1).T
    for v, p in zip(me.vertices, novo):
        v.co = p
    me.update()
    return maos


def escala_real(corpo, maos):
    # 2 unidades -> 1,80 m, pés em z = 0
    k = 0.9
    M = Matrix.Translation((0, 0, 0.9)) @ Matrix.Scale(k, 4)
    corpo.data.transform(M)
    corpo.data.update()
    return {s: np.array(M @ Vector(p)) for s, p in maos.items()}


def mat_cor(nome, cor, metal=0.0, rough=0.6):
    m = bpy.data.materials.new(nome)
    if m.node_tree is None:
        m.use_nodes = True
    b = m.node_tree.nodes.get('Principled BSDF')
    b.inputs['Base Color'].default_value = (*cor, 1)
    b.inputs['Metallic'].default_value = metal
    b.inputs['Roughness'].default_value = rough
    return m


def peca(nome, tam, centro, eixo, m, cil=False, raio=0.02):
    """Caixa ou cilindro com o comprimento ao longo de 'eixo' (vetor)."""
    if cil:
        bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=raio, depth=tam[2], location=(0, 0, 0))
    else:
        bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
        bpy.context.active_object.scale = tam
        bpy.ops.object.transform_apply(scale=True)
    o = bpy.context.active_object
    o.name = nome
    eixo = Vector(eixo).normalized()
    o.rotation_euler = eixo.to_track_quat('Z', 'Y').to_euler()
    o.location = Vector(centro)
    bpy.ops.object.transform_apply(location=True, rotation=True)
    o.data.materials.append(m)
    return o


def arma(maos, tipo):
    md, me_ = Vector(maos[-1]), Vector(maos[+1])   # mão direita (-X) e esquerda (+X)
    d = (me_ - md).normalized()               # da mão direita (coronha) para a esquerda (cano)
    madeira = mat_cor('ArmaMadeira', (0.07, 0.03, 0.012), rough=0.5)
    metal = mat_cor('ArmaMetal', (0.06, 0.06, 0.06), metal=0.8, rough=0.35)
    oliva = mat_cor('ArmaOliva', (0.2, 0.22, 0.12), rough=0.6)
    if tipo == 'fuzil':
        # M1 Garand: 1,1 m. Coronha atrás da mão direita, cano passa da mão esquerda
        inicio = md - d * 0.30
        pc = [peca('Coronha', (0.04, 0.07, 0.42), inicio + d * 0.21, d, madeira),
              peca('Guarda-mao', (0.04, 0.05, 0.45), inicio + d * 0.62, d, madeira),
              peca('Receptor', (0.035, 0.045, 0.2), inicio + d * 0.42 + Vector((0, 0, 0.02)), d, metal),
              peca('Cano', (0, 0, 0.4), inicio + d * 0.98, d, metal, cil=True, raio=0.011)]
    else:
        # bazuca M1A1: tubo de 1,4 m no ombro direito, apontando para a frente
        ombro = Vector((-0.17, 0.02, 1.48))
        frente = Vector((0, -1, 0.05)).normalized()
        pc = [peca('Tubo', (0, 0, 1.4), ombro + frente * 0.25, frente, oliva, cil=True, raio=0.045),
              peca('Boca', (0, 0, 0.12), ombro + frente * 0.95, frente, metal, cil=True, raio=0.06),
              peca('Punho', (0.03, 0.05, 0.16), ombro + frente * 0.05 + Vector((0, 0, -0.1)), Vector((0, 0, 1)), madeira),
              peca('Mira', (0.02, 0.06, 0.06), ombro + frente * 0.1 + Vector((0.06, 0, 0.04)), frente, metal)]
    return pc


def tingir_eixo():
    """Uniforme e capacete em feldgrau (pele, couro e equipamento ficam)."""
    for m in bpy.data.materials:
        if m.name not in ('Cloth', 'Helmet') or not m.node_tree:
            continue
        nt = m.node_tree
        b = nt.nodes.get('Principled BSDF')
        link = next((l for l in nt.links if l.to_socket == b.inputs['Base Color']), None)
        hs = nt.nodes.new('ShaderNodeHueSaturation')
        hs.inputs['Saturation'].default_value = 0.25
        hs.inputs['Value'].default_value = 0.95
        mul = nt.nodes.new('ShaderNodeMix')
        mul.data_type = 'RGBA'
        mul.blend_type = 'MULTIPLY'
        mul.inputs['Factor'].default_value = 1.0
        mul.inputs[7].default_value = (0.78, 0.84, 0.86, 1)
        if link:
            src = link.from_socket
            nt.links.remove(link)
            nt.links.new(src, hs.inputs['Color'])
        else:
            hs.inputs['Color'].default_value = b.inputs['Base Color'].default_value
        nt.links.new(hs.outputs['Color'], mul.inputs[6])
        nt.links.new(mul.outputs[2], b.inputs['Base Color'])


def bake_e_exportar(obj, nome):
    me = obj.data
    # decimar
    tris = sum(len(p.vertices) - 2 for p in me.polygons)
    if tris > TRIANGULOS:
        md = obj.modifiers.new('Reduzir', 'DECIMATE')
        md.ratio = TRIANGULOS / tris
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.modifier_apply(modifier=md.name)
    # UV novo do atlas (a UV original continua ativa para as texturas de origem)
    orig = me.uv_layers[0]
    orig.active_render = True
    atlas = me.uv_layers.new(name='Atlas')
    me.uv_layers.active = atlas
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.004)
    bpy.ops.object.mode_set(mode='OBJECT')
    img = bpy.data.images.new(nome + '_atlas', ATLAS, ATLAS)
    for m in me.materials:
        nt = m.node_tree
        n = nt.nodes.new('ShaderNodeTexImage')
        n.image = img
        nt.nodes.active = n
        for nd in nt.nodes:
            nd.select = nd == n
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = 1
    sc.render.bake.use_pass_direct = False
    sc.render.bake.use_pass_indirect = False
    sc.render.bake.use_pass_color = True
    sc.render.bake.margin = 6
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}, margin=6, use_clear=True)
    caminho = os.path.join(SAIDA, nome + '_atlas.jpg')
    img.filepath_raw = caminho
    img.file_format = 'JPEG'
    img.save()
    img.pack()
    # material único com o atlas
    novo = bpy.data.materials.new(nome)
    if novo.node_tree is None:
        novo.use_nodes = True
    b = novo.node_tree.nodes.get('Principled BSDF')
    b.inputs['Roughness'].default_value = 0.85
    t = novo.node_tree.nodes.new('ShaderNodeTexImage')
    t.image = img
    novo.node_tree.links.new(t.outputs['Color'], b.inputs['Base Color'])
    me.materials.clear()
    me.materials.append(novo)
    me.uv_layers.remove(me.uv_layers[0])  # tira a UV original; fica só a do atlas
    me.uv_layers.active = me.uv_layers[0]
    me.uv_layers[0].active_render = True
    bpy.ops.export_scene.gltf(filepath=os.path.join(SAIDA, nome + '.glb'), export_format='GLB',
                              use_selection=True, export_apply=True, export_yup=True,
                              export_image_format='JPEG')
    os.remove(caminho)  # a textura já vai dentro do .glb
    print('OK', nome, sum(len(p.vertices) - 2 for p in me.polygons), 'triângulos')
    return obj


def preview(nome):
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.samples = 24
    sc.render.resolution_x, sc.render.resolution_y = 640, 480
    sc.render.image_settings.file_format = 'JPEG'
    if not sc.world:
        sc.world = bpy.data.worlds.new('Mundo')
    sc.world.color = (0.55, 0.6, 0.68)
    if sc.world.node_tree is None:
        sc.world.use_nodes = True
    sc.world.node_tree.nodes['Background'].inputs['Strength'].default_value = 1.4
    sc.world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.55, 0.6, 0.68, 1)
    if not bpy.data.objects.get('SolPrev'):
        sol = bpy.data.objects.new('SolPrev', bpy.data.lights.new('SolPrev', 'SUN'))
        sol.data.energy = 4
        sol.rotation_euler = (math.radians(40), math.radians(10), math.radians(-30))
        sc.collection.objects.link(sol)
    cam = bpy.data.objects.get('CamPrev') or bpy.data.objects.new('CamPrev', bpy.data.cameras.new('CamPrev'))
    if cam.name not in sc.collection.objects:
        sc.collection.objects.link(cam)
    cam.data.lens = 70
    cam.location = Vector((-2.6, -3.8, 1.9))
    cam.rotation_euler = (Vector((0, 0, 0.95)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
    sc.camera = cam
    sc.render.filepath = os.path.join(PREV, nome + '.jpg')
    bpy.ops.render.render(write_still=True)


def main():
    os.makedirs(SAIDA, exist_ok=True)
    for tipo, nome in (('fuzil', 'soldado'), ('bazuca', 'soldado_bazuca')):
        for eixo in (False, True):
            corpo = importar()
            maos = escala_real(corpo, posar(corpo))
            pecas = arma(maos, tipo)
            if eixo:
                tingir_eixo()
            bpy.ops.object.select_all(action='DESELECT')
            for o in pecas + [corpo]:
                o.select_set(True)
            bpy.context.view_layer.objects.active = corpo
            bpy.ops.object.join()
            obj = bpy.context.active_object
            final = nome + ('_eixo' if eixo else '')
            bake_e_exportar(obj, final)
            preview(final)


if __name__ == '__main__':
    main()
