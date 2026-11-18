#!/usr/bin/env python3
"""Infantaria do jogo a partir do modelo "WW2 US Army Ranger".

Modelo original: "WW2 US Army Ranger" por Tactical_Gamer
  https://sketchfab.com/3d-models/ww2-us-army-ranger-dcbe89cd5de243af8e4677b769a831c6
  Licença CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Arquivo original: blender/fontes/ww2_us_army_ranger.glb

O que este script muda (para o jogo de estratégia no celular):
  1. Pose: o modelo vem em pose "A" (braços abertos). Os braços são dobrados em posição de pronto,
     segurando a arma na frente do peito.
  2. Armas do pacote "WW2 weapons" (blender/fontes/armas): M1 Garand, Thompson, BAR e MP44 (Eixo),
     e a bazuca M1A1 modelada aqui. A arma é posicionada primeiro (coronha no ombro direito, cano para
     a frente) e os braços são levados até o punho e o guarda-mão por cinemática inversa (IK de 2 ossos).
  3. Leveza: malha reduzida de ~27 mil para ~5 mil triângulos e as 6 texturas juntadas numa só
     (bake) -> 1 material, 1 chamada de desenho por soldado.
  4. Escala real: 1,80 m, pés no chão (z = 0), frente em -Y.
  5. Versão do Eixo: uniforme e capacete em cinza (feldgrau), sem tocar na pele.

Uso:  blender -b -P blender/gerar_soldado.py      (ou python3 com o módulo bpy)
Saída: public/models/soldado*.glb (fuzil, thompson, bar, eixo/MP44, bazuca e bazuca do Eixo)
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


# ombros e mãos medidos no modelo original (altura -1..1), já convertidos para metros (x0,9, pés em z=0)
K = 0.9
OMBRO = {+1: np.array([0.20 * K, 0.10 * K, 0.63 * K + 0.9]), -1: np.array([-0.20 * K, 0.10 * K, 0.63 * K + 0.9])}
# lado: -1 = braço DIREITO (o soldado olha para -Y, então a direita dele é -X); +1 = braço esquerdo


def escala_real(corpo):
    """2 unidades -> 1,80 m, pés em z = 0."""
    M = Matrix.Translation((0, 0, 0.9)) @ Matrix.Scale(K, 4)
    corpo.data.transform(M)
    corpo.data.update()


def medir_bracos(P):
    """Braço reto em pose A: ombro -> cotovelo (metade) -> centro da mão."""
    med = {}
    for s in (+1, -1):
        S = OMBRO[s]
        H = P[s * P[:, 0] > 0.45].mean(0)
        a = (H - S) / np.linalg.norm(H - S)
        L = np.linalg.norm(H - S)
        E = S + a * L * 0.5
        med[s] = dict(S=S, H=H, E=E, a=a, Lu=np.linalg.norm(E - S), Lf=np.linalg.norm(H - E))
    return med


def ik(S, T, Lu, Lf, lado):
    """IK de 2 ossos: devolve (cotovelo, mão). O cotovelo aponta para baixo e para fora."""
    v = T - S
    d = np.linalg.norm(v)
    d = np.clip(d, abs(Lu - Lf) + 1e-3, (Lu + Lf) * 0.999)
    u = v / np.linalg.norm(v)
    T2 = S + u * d
    a = (Lu * Lu - Lf * Lf + d * d) / (2 * d)
    h = np.sqrt(max(0.0, Lu * Lu - a * a))
    polo = np.array([lado * 0.7, 0.15, -1.0])
    polo = polo - (polo @ u) * u
    polo /= np.linalg.norm(polo)
    return S + u * a + polo * h, T2


def posar_ik(corpo, alvos):
    """Deforma os braços para as mãos chegarem nos alvos (pegada da arma)."""
    me = corpo.data
    P = np.array([v.co[:] for v in me.vertices])
    med = medir_bracos(P)
    novo = P.copy()
    for s in (+1, -1):
        m = med[s]
        E, T = ik(m['S'], alvos[s], m['Lu'], m['Lf'], s)
        R1 = rot_entre(m['E'] - m['S'], E - m['S'])
        Rf = rot_entre(m['H'] - m['E'], T - E)
        x, z = s * P[:, 0], P[:, 2]
        peso = smooth(0.153, 0.243, x) * np.where(z > 1.215, 1.0, smooth(0.243, 0.324, x))
        t = (P - m['S']) @ m['a']
        braco = m['S'] + (P - m['S']) @ R1.T
        ante = E + (P - m['E']) @ Rf.T
        f = smooth(m['Lu'] - 0.045, m['Lu'] + 0.045, t)[:, None]
        trans = braco * (1 - f) + ante * f
        novo = novo + peso[:, None] * (trans - P)
    for v, p in zip(me.vertices, novo):
        v.co = p
    me.update()


# Armas do pacote (blender/fontes/armas/armas_ww2.obj), já em tamanho real.
# cano: +1 se o cano está em +X no arquivo. pegada: distância a partir da coronha (fração do comprimento)
ARMAS = {
    'm1garand': dict(cano=+1, mao_dir=0.30, mao_esq=0.47),
    'thompson': dict(cano=+1, mao_dir=0.40, mao_esq=0.63),
    'bar': dict(cano=+1, mao_dir=0.27, mao_esq=0.44),
    'mp44': dict(cano=-1, mao_dir=0.34, mao_esq=0.56),
}


def importar_arma(nome):
    bpy.ops.wm.obj_import(filepath=os.path.join(AQUI, 'fontes', 'armas', 'armas_ww2.obj'), use_split_groups=True)
    arma_obj = None
    for o in list(bpy.context.selected_objects):
        if o.type == 'MESH' and o.name.split('.')[0] == nome:
            arma_obj = o
        else:
            bpy.data.objects.remove(o, do_unlink=True)
    bpy.context.view_layer.objects.active = arma_obj
    arma_obj.select_set(True)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    uvs = arma_obj.data.uv_layers
    if len(uvs):
        uvs[0].name = 'UVMap'
    return arma_obj


def colocar_arma(obj, cano, butt, direcao):
    """Move a arma: coronha em 'butt', cano apontando para 'direcao', mira para cima."""
    P = np.array([v.co[:] for v in obj.data.vertices])
    eixo = np.array([cano, 0.0, 0.0])
    xs = P[:, 0] * cano
    coronha = P[np.argmin(xs)].copy()
    coronha[1:] = P[:, 1:].mean(0)
    comp = xs.max() - xs.min()
    d = direcao / np.linalg.norm(direcao)
    cima = np.array([0, 0, 1.0]) - d[2] * d
    cima /= np.linalg.norm(cima)
    lado = np.cross(cima, d)
    # base local: eixo -> d, z -> cima, y -> lado
    Rl = np.stack([eixo, [0, 1.0, 0] if cano > 0 else [0, -1.0, 0], [0, 0, 1.0]], 1)   # colunas do sistema da arma
    Rw = np.stack([d, lado if cano > 0 else lado, cima], 1)
    R = Rw @ np.linalg.inv(Rl)
    novo = (P - coronha) @ R.T + butt
    for v, p in zip(obj.data.vertices, novo):
        v.co = p
    obj.data.update()
    return comp


def escolher_pegada(info, comp):
    """Procura a posição da arma em que as duas mãos alcançam, com a coronha no ombro direito
    e o cano o mais para a frente possível (posição de pronto)."""
    SR, SL = OMBRO[-1], OMBRO[+1]
    alcance = 0.6            # ombro -> centro da mão do modelo: 0,62 m
    ts = np.linspace(0, 1, 11)
    melhor, mpont = None, 1e9
    for x0 in np.linspace(-0.24, -0.04, 6):
        for y0 in np.linspace(-0.3, 0.04, 8):
            for z0 in np.linspace(1.05, 1.42, 8):
                b = np.array([x0, y0, z0])
                for th in np.radians(np.arange(0, 64, 6)):
                    for ph in np.radians(np.arange(-40, 6, 5)):
                        d = np.array([np.sin(th), -np.cos(th), np.tan(ph)])
                        d /= np.linalg.norm(d)
                        g = b + d * comp * info['mao_dir']
                        f = b + d * comp * info['mao_esq']
                        dr, dl = np.linalg.norm(g - SR), np.linalg.norm(f - SL)
                        if dr > alcance or dl > alcance or dr < 0.2 or dl < 0.25:
                            continue
                        # a arma não pode atravessar o peito/barriga
                        pts = b + np.outer(ts * comp, d)
                        dentro = (np.abs(pts[:, 0]) < 0.17) & (pts[:, 2] > 0.95) & (pts[:, 2] < 1.55) & (pts[:, 1] > -0.09)
                        if dentro.any():
                            continue
                        pont = 1.5 * th + 1.0 * abs(ph + np.radians(10)) + 3.0 * np.linalg.norm(b - (SR + np.array([0.03, -0.12, -0.12])))
                        if pont < mpont:
                            mpont, melhor = pont, (b, d, g, f)
    if melhor is None:
        raise RuntimeError('nenhuma pegada alcançável')
    return melhor


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


def bazuca():
    """Bazuca M1A1 (1,4 m) no ombro direito, apontando para a frente. Devolve peças e alvos das mãos."""
    madeira = mat_cor('ArmaMadeira', (0.07, 0.03, 0.012), rough=0.5)
    metal = mat_cor('ArmaMetal', (0.06, 0.06, 0.06), metal=0.8, rough=0.35)
    oliva = mat_cor('ArmaOliva', (0.2, 0.22, 0.12), rough=0.6)
    ombro = Vector((-0.15, 0.0, 1.5))
    frente = Vector((0.06, -1, 0.0)).normalized()
    pc = [peca('Tubo', (0, 0, 1.4), ombro + frente * 0.25, frente, oliva, cil=True, raio=0.045),
          peca('Boca', (0, 0, 0.12), ombro + frente * 0.95, frente, metal, cil=True, raio=0.06),
          peca('Punho', (0.03, 0.04, 0.14), ombro + frente * 0.3 + Vector((0, 0, -0.1)), Vector((0, 0, 1)), madeira),
          peca('Apoio', (0.03, 0.04, 0.1), ombro + frente * 0.5 + Vector((0, 0, -0.08)), Vector((0, 0, 1)), madeira),
          peca('Mira', (0.02, 0.06, 0.06), ombro + frente * 0.1 + Vector((0.06, 0, 0.04)), frente, metal)]
    alvos = {-1: np.array(ombro + frente * 0.3 + Vector((0, 0, -0.16))),
             +1: np.array(ombro + frente * 0.5 + Vector((0.02, 0, -0.12)))}
    return pc, alvos


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


VARIANTES = [
    # (nome do arquivo, arma, uniforme do Eixo?)
    ('soldado', 'm1garand', False),
    ('soldado_thompson', 'thompson', False),
    ('soldado_bar', 'bar', False),
    ('soldado_eixo', 'mp44', True),
    ('soldado_bazuca', 'bazuca', False),
    ('soldado_bazuca_eixo', 'bazuca', True),
]


def main():
    import sys
    so = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    os.makedirs(SAIDA, exist_ok=True)
    for nome, tipo, eixo in VARIANTES:
        if so and nome not in so:
            continue
        corpo = importar()
        escala_real(corpo)
        if tipo == 'bazuca':
            pecas, alvos = bazuca()
        else:
            arma_obj = importar_arma(tipo)
            info = ARMAS[tipo]
            P = np.array([v.co[:] for v in arma_obj.data.vertices])
            comp = P[:, 0].max() - P[:, 0].min()
            b, d, g, f = escolher_pegada(info, comp)
            colocar_arma(arma_obj, info['cano'], b, d)
            pecas = [arma_obj]
            alvos = {-1: g + np.array([0, 0, -0.02]), +1: f + np.array([0, 0, -0.03])}
            print('PEGADA', nome, 'coronha', np.round(b, 2), 'direção', np.round(d, 2))
        posar_ik(corpo, alvos)
        if eixo:
            tingir_eixo()
        bpy.ops.object.select_all(action='DESELECT')
        for o in pecas + [corpo]:
            o.select_set(True)
        bpy.context.view_layer.objects.active = corpo
        bpy.ops.object.join()
        obj = bpy.context.active_object
        bake_e_exportar(obj, nome)
        preview(nome)


if __name__ == '__main__':
    main()
