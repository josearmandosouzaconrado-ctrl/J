#!/usr/bin/env python3
"""Frente Europa 1944 — gera no Blender todos os modelos 3D do jogo.

Veículos, aviões, navios, soldados e estruturas do Exército/Marinha dos EUA na
Segunda Guerra (inclusive o P-80 Shooting Star, primeiro caça a jato dos EUA, de 1944/45),
modelados em low-poly com as MEDIDAS REAIS de cada um (em metros).

Uso (Blender instalado):
    blender -b -P blender/gerar_modelos.py
ou com o módulo bpy do pip (pip install bpy):
    python3 blender/gerar_modelos.py

Saída:
    public/models/<nome>.glb          -> usados pelo jogo
    blender/frente_europa_modelos.blend -> todos os modelos lado a lado, para editar
    blender/previews/<nome>.jpg        -> renders de conferência

Fotos de referência: coloque fotos em blender/referencias/<nome>.jpg|png
(ex.: sherman.jpg). Elas entram no .blend como imagens de fundo ao lado do modelo,
para você refinar a malha à mão. Use fotos de domínio público (as fotos do
Exército dos EUA da época são de domínio público).

Convenção: frente do modelo = -Y no Blender (vira +Z no glTF / Three.js),
cima = +Z, chão = z 0 (navios: linha d'água = z 0).
Peças que o jogo anima têm nomes fixos: "Torre" (gira), "Helice". Materiais "Pintura" e "Insignia" são recoloridos para o inimigo.
"""
import math
import os
import sys

import bpy
import bmesh
from mathutils import Vector

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
SAIDA_GLB = os.path.join(RAIZ, 'public', 'models')
SAIDA_PREV = os.path.join(AQUI, 'previews')
REFS = os.path.join(AQUI, 'referencias')
SO = [a for a in sys.argv[sys.argv.index('--') + 1:]] if '--' in sys.argv else []
PREVIEW = os.environ.get('PREVIEW', '1') == '1'

R = math.radians


# ----------------------------------------------------------------------------
# Materiais
# ----------------------------------------------------------------------------
def _lin(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def mat(nome, hexcor, metal=0.0, rough=0.7, alpha=1.0, emit=0.0):
    m = bpy.data.materials.get(nome)
    if m:
        return m
    m = bpy.data.materials.new(nome)
    if m.node_tree is None:
        m.use_nodes = True
    rgb = tuple(_lin((hexcor >> s) & 255) for s in (16, 8, 0))
    m.diffuse_color = (*rgb, alpha)
    b = m.node_tree.nodes.get('Principled BSDF') if m.node_tree else None
    if b:
        b.inputs['Base Color'].default_value = (*rgb, 1)
        b.inputs['Metallic'].default_value = metal
        b.inputs['Roughness'].default_value = rough
        if alpha < 1:
            b.inputs['Alpha'].default_value = alpha
            try:
                m.surface_render_method = 'BLENDED'
            except Exception:
                pass
        if emit:
            b.inputs['Emission Color'].default_value = (*rgb, 1)
            b.inputs['Emission Strength'].default_value = emit
    return m


def paleta():
    return {
        'od': mat('Pintura', 0x5d6436, rough=0.85),             # verde-oliva (olive drab)
        'od2': mat('PinturaEscura', 0x474d2a, rough=0.9),
        'metal': mat('Metal', 0x2d2d2b, metal=0.8, rough=0.45),
        'aco': mat('Aco', 0x6a6c6e, metal=0.9, rough=0.35),
        'aluminio': mat('Aluminio', 0xb9bdc1, metal=0.85, rough=0.3),
        'esteira': mat('Esteira', 0x262421, rough=1.0),
        'pneu': mat('Pneu', 0x1d1d1d, rough=0.95),
        'vidro': mat('Vidro', 0x8fb8d0, metal=0.2, rough=0.05, alpha=0.55),
        'estrela': mat('Insignia', 0xf2f2ee, rough=0.6),
        'azul': mat('InsigniaAzul', 0x1f2f6b, rough=0.6),
        'preto': mat('Preto', 0x141414, rough=0.8),
        'branco': mat('Branco', 0xeeeeea, rough=0.7),
        'lona': mat('Lona', 0x6f6c48, rough=1.0),
        'madeira': mat('Madeira', 0x6e4a2b, rough=0.8),
        'pele': mat('Pele', 0xd2a07c, rough=0.8),
        'farda': mat('Farda', 0x6b6a49, rough=0.95),
        'calca': mat('Calca', 0x55553b, rough=0.95),
        'bota': mat('Bota', 0x3b2a1c, rough=0.9),
        'navio': mat('PinturaNavio', 0x5a6670, rough=0.7),
        'navio2': mat('Casco', 0x3a434b, rough=0.7),
        'convoo': mat('Convoo', 0x5e5a4e, rough=0.95),
        'concreto': mat('Concreto', 0x9a978d, rough=1.0),
        'chapa': mat('Chapa', 0x7a8068, metal=0.4, rough=0.6),
        'areia': mat('SacoAreia', 0xa89a6e, rough=1.0),
        'vermelho': mat('Vermelho', 0xb22234, rough=0.7),
        'amarelo': mat('Amarelo', 0xe8c23a, rough=0.6),
        'pista': mat('Pista', 0x55534e, rough=1.0),
        'escape': mat('Escape', 0x3a2e28, metal=0.5, rough=0.6),
        'luz': mat('Luz', 0xffe9a8, emit=2.0),
    }


# ----------------------------------------------------------------------------
# Primitivas
# ----------------------------------------------------------------------------
def _fim(o, nome, m):
    o.name = nome
    o.data.name = nome
    if m is not None:
        o.data.materials.clear()
        o.data.materials.append(m)
    return o


def _aplicar(o):
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)


def chanfro(o, w, seg=1):
    md = o.modifiers.new('Chanfro', 'BEVEL')
    md.width = w
    md.segments = seg
    md.limit_method = 'ANGLE'
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.modifier_apply(modifier=md.name)
    return o


def caixa(nome, sx, sy, sz, x=0, y=0, z=0, m=None, bev=0.0, rot=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    o = bpy.context.active_object
    o.scale = (sx, sy, sz)
    if rot:
        o.rotation_euler = [R(a) for a in rot]
    _aplicar(o)
    if bev:
        chanfro(o, bev)
    return _fim(o, nome, m)


def cil(nome, r, h, x=0, y=0, z=0, eixo='z', m=None, v=16, r2=None, rot=None, esc=None):
    rr = {'z': (0, 0, 0), 'x': (0, R(90), 0), 'y': (R(90), 0, 0)}[eixo]
    if r2 is None:
        bpy.ops.mesh.primitive_cylinder_add(vertices=v, radius=r, depth=h, location=(x, y, z), rotation=rr)
    else:
        bpy.ops.mesh.primitive_cone_add(vertices=v, radius1=r, radius2=r2, depth=h, location=(x, y, z), rotation=rr)
    o = bpy.context.active_object
    if esc:
        o.scale = esc
    if rot:
        o.rotation_euler = [a + R(b) for a, b in zip(o.rotation_euler, rot)]
    _aplicar(o)
    return _fim(o, nome, m)


def esfera(nome, r, x=0, y=0, z=0, esc=(1, 1, 1), m=None, seg=16, aneis=10):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=aneis, radius=r, location=(x, y, z))
    o = bpy.context.active_object
    o.scale = esc
    _aplicar(o)
    return _fim(o, nome, m)


def anel(nome, r, rt, x=0, y=0, z=0, m=None, eixo='z'):
    rr = {'z': (0, 0, 0), 'x': (0, R(90), 0), 'y': (R(90), 0, 0)}[eixo]
    bpy.ops.mesh.primitive_torus_add(major_radius=r, minor_radius=rt, major_segments=20, minor_segments=6,
                                     location=(x, y, z), rotation=rr)
    o = bpy.context.active_object
    _aplicar(o)
    return _fim(o, nome, m)


def _malha(nome, verts, faces, m):
    me = bpy.data.meshes.new(nome)
    me.from_pydata(verts, [], faces)
    me.validate()
    me.update()
    o = bpy.data.objects.new(nome, me)
    bpy.context.collection.objects.link(o)
    return _fim(o, nome, m)


def loft(nome, secoes, m, n=14, p=2.0, tampa=True):
    """Corpo de revolução ao longo de Y. secoes = [(y, meia_largura, meia_altura, z_centro), ...].
    p = expoente da superelipse (2 = elipse, maior = mais quadrado)."""
    verts, faces = [], []
    for (y, w, h, zc) in secoes:
        for k in range(n):
            t = 2 * math.pi * k / n
            c, s = math.cos(t), math.sin(t)
            x = w * math.copysign(abs(c) ** (2 / p), c)
            z = zc + h * math.copysign(abs(s) ** (2 / p), s)
            verts.append((x, y, z))
    for i in range(len(secoes) - 1):
        for k in range(n):
            a = i * n + k
            b = i * n + (k + 1) % n
            faces.append((a, b, b + n, a + n))
    if tampa:
        faces.append(tuple(reversed(range(n))))
        last = (len(secoes) - 1) * n
        faces.append(tuple(range(last, last + n)))
    o = _malha(nome, verts, faces, m)
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.remove_doubles(threshold=0.0005)
    bpy.ops.mesh.normals_make_consistent(inside=False)
    bpy.ops.object.mode_set(mode='OBJECT')
    return o


def _perfil(corda, esp):
    # perfil de asa simples (y para trás, z para cima), bordo de ataque em y=0
    return [(0, 0), (0.08 * corda, 0.42 * esp), (0.3 * corda, 0.5 * esp), (0.7 * corda, 0.3 * esp),
            (corda, 0), (0.7 * corda, -0.12 * esp), (0.3 * corda, -0.2 * esp), (0.08 * corda, -0.18 * esp)]


def asa(nome, env, corda_raiz, corda_ponta, flecha, esp, x=0, y=0, z=0, m=None, diedro=0.0, vertical=False,
        espelhar=True):
    """Asa/estabilizador. env = envergadura total (ou altura, se vertical). esp = espessura relativa à corda."""
    secs = []
    if vertical:
        secs = [(0, 0, 0, corda_raiz), (0, flecha, env, corda_ponta)]
    else:
        lado = env / 2 if espelhar else env
        dz = math.tan(R(diedro)) * lado
        if espelhar:
            secs = [(-lado, flecha, dz, corda_ponta), (0, 0, 0, corda_raiz), (lado, flecha, dz, corda_ponta)]
        else:
            secs = [(0, 0, 0, corda_raiz), (lado, flecha, dz, corda_ponta)]
    verts, faces = [], []
    n = 8
    for (sx, sy, sz, c) in secs:
        for (py, pz) in _perfil(c, c * esp):
            if vertical:
                verts.append((x + pz, y - corda_raiz / 2 + sy + py, z + sz))
            else:
                verts.append((x + sx, y - corda_raiz / 2 + sy + py, z + sz + pz))
    for i in range(len(secs) - 1):
        for k in range(n):
            a = i * n + k
            b = i * n + (k + 1) % n
            faces.append((a, b, b + n, a + n))
    faces.append(tuple(reversed(range(n))))
    last = (len(secs) - 1) * n
    faces.append(tuple(range(last, last + n)))
    o = _malha(nome, verts, faces, m)
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.normals_make_consistent(inside=False)
    bpy.ops.object.mode_set(mode='OBJECT')
    return o


def estrela(nome, r, x, y, z, normal='x', m=None, disco=None, mdisco=None):
    """Estrela branca de 5 pontas (insígnia dos EUA), opcionalmente sobre um disco azul."""
    pts = []
    for i in range(10):
        a = math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * 0.382
        pts.append((rr * math.cos(a), rr * math.sin(a)))
    verts = [(0, 0)] + pts
    faces = [(0, 1 + i, 1 + (i + 1) % 10) for i in range(10)]

    def orient(u, v, off):
        if normal == 'x':
            return (x + off, y - u, z + v)
        if normal == '-x':
            return (x - off, y + u, z + v)
        if normal == 'z':
            return (x + u, y - v, z + off)
        if normal == '-z':
            return (x - u, y - v, z - off)
        if normal == 'y':
            return (x - u, y + off, z + v)
        return (x + u, y - off, z + v)

    objs = []
    if disco:
        dv = [(0, 0)] + [(disco * math.cos(2 * math.pi * i / 16), disco * math.sin(2 * math.pi * i / 16))
                         for i in range(16)]
        df = [(0, 1 + i, 1 + (i + 1) % 16) for i in range(16)]
        objs.append(_malha(nome + 'Disco', [orient(u, v, 0.01) for u, v in dv], df, mdisco))
    objs.append(_malha(nome, [orient(u, v, 0.02) for u, v in verts], faces, m))
    for o in objs:
        bpy.context.view_layer.objects.active = o
        o.select_set(True)
        bpy.ops.object.mode_set(mode='EDIT')
        bpy.ops.mesh.select_all(action='SELECT')
        bpy.ops.mesh.normals_make_consistent(inside=False)
        bpy.ops.object.mode_set(mode='OBJECT')
        # faz a face olhar para fora: se a normal média aponta para dentro, inverte
    return objs


def juntar(objs, nome, origem=None):
    objs = [o for o in objs if o is not None]
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    if len(objs) > 1:
        bpy.ops.object.join()
    o = bpy.context.active_object
    o.name = nome
    o.data.name = nome
    if origem is not None:
        bpy.context.scene.cursor.location = origem
        bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
        bpy.context.scene.cursor.location = (0, 0, 0)
    return o


def espelho_x(fn):
    """Chama fn(lado) para lado = +1 e -1 e devolve a lista de objetos."""
    out = []
    for s in (1, -1):
        r = fn(s)
        out += r if isinstance(r, list) else [r]
    return out


# ----------------------------------------------------------------------------
# VEÍCULOS TERRESTRES
# ----------------------------------------------------------------------------
def esteiras(P, comp, larg, xoff, rodas=6, rr=0.3, zs=0.68):
    """Conjunto de esteira estilo VVSS (Sherman / M7). Devolve peças."""
    pc = []
    for s in (1, -1):
        x = s * xoff
        pc.append(caixa('Esteira', larg, comp, 0.72, x, 0.05, 0.42, P['esteira'], bev=0.3))
        pc.append(cil('Roda motriz', 0.34, larg + 0.06, x, -comp / 2 + 0.25, zs, 'x', P['metal'], v=12))
        pc.append(cil('Roda guia', 0.3, larg + 0.06, x, comp / 2 - 0.2, 0.45, 'x', P['metal'], v=12))
        passo = (comp - 1.4) / (rodas - 1)
        for i in range(rodas):
            yy = -comp / 2 + 0.75 + i * passo
            pc.append(cil('Roda', rr, 0.16, x + s * (larg / 2 + 0.03), yy, rr + 0.02, 'x', P['metal'], v=12))
        for b in range(rodas // 2):
            yy = -comp / 2 + 0.75 + (2 * b + 0.5) * passo
            pc.append(caixa('Truque', 0.12, passo * 0.9, 0.35, x + s * (larg / 2 + 0.12), yy, 0.55, P['od']))
    return pc


def sherman():
    P = paleta()
    pc = esteiras(P, 5.3, 0.45, 1.08)
    pc.append(caixa('Casco inf', 2.0, 5.0, 0.8, 0, 0.1, 0.95, P['od']))
    pc.append(caixa('Casco sup', 2.62, 3.9, 0.72, 0, 0.55, 1.68, P['od'], bev=0.06))
    pc.append(caixa('Glacis', 2.5, 2.0, 0.12, 0, -1.9, 1.48, P['od'], rot=(-56, 0, 0)))
    pc.append(caixa('Transmissao', 2.2, 0.6, 0.8, 0, -2.45, 0.95, P['od'], bev=0.2))
    pc.append(caixa('Deck motor', 2.4, 1.6, 0.1, 0, 1.75, 2.06, P['od2']))
    pc.append(caixa('Grade', 1.2, 0.9, 0.04, 0, 1.9, 2.12, P['metal']))
    for s in (1, -1):
        pc.append(caixa('Escotilha mot', 0.55, 0.7, 0.06, s * 0.45, -1.15, 2.07, P['od2']))
        pc.append(cil('Farol', 0.1, 0.2, s * 0.85, -2.65, 1.35, 'y', P['luz'], v=10))
        pc.append(caixa('Para-lama', 0.45, 0.5, 0.05, s * 1.08, -2.75, 1.15, P['od'], rot=(-20, 0, 0)))
        pc.append(caixa('Escapamento', 0.3, 0.2, 0.3, s * 0.6, 2.65, 1.4, P['escape']))
        for i in range(4):
            pc.append(caixa('Elo extra', 0.4, 0.12, 0.05, s * 0.55, -1.75 + i * 0.18, 1.62 - i * 0.12, P['esteira'],
                            rot=(-56, 0, 0)))
    pc += estrela('Estrela', 0.42, 1.315, 0.7, 1.68, 'x', P['estrela'])
    pc += estrela('Estrela', 0.42, -1.315, 0.7, 1.68, '-x', P['estrela'])
    pc += estrela('Estrela', 0.45, 0, 1.2, 2.13, 'z', P['estrela'])
    casco = juntar(pc, 'Casco')
    # Torre (gira em torno do eixo vertical)
    t = [cil('Torre base', 0.98, 0.72, 0, 0.25, 2.42, 'z', P['od'], v=20, r2=0.88, esc=(1, 1.12, 1))]
    t.append(caixa('Bustle', 1.5, 0.8, 0.55, 0, 1.15, 2.42, P['od'], bev=0.15))
    t.append(caixa('Mantelete', 0.95, 0.3, 0.55, 0, -0.85, 2.38, P['od'], bev=0.08))
    t.append(cil('Canhao 75', 0.065, 2.5, 0, -2.2, 2.38, 'y', P['od'], v=10))
    t.append(cil('Boca', 0.085, 0.18, 0, -3.4, 2.38, 'y', P['metal'], v=10))
    t.append(cil('Cupula', 0.32, 0.24, 0.38, 0.5, 2.9, 'z', P['od'], v=12))
    t.append(caixa('Escotilha', 0.5, 0.45, 0.06, -0.38, 0.45, 2.81, P['od2']))
    t.append(cil('Ponto 50', 0.03, 1.5, 0.38, -0.05, 3.18, 'y', P['metal'], v=6))
    t.append(caixa('Suporte 50', 0.08, 0.1, 0.25, 0.38, 0.55, 3.05, P['metal']))
    t.append(caixa('Caixa municao', 0.12, 0.25, 0.18, 0.5, 0.2, 3.1, P['od2']))
    t.append(cil('Antena', 0.012, 2.4, -0.6, 1.3, 3.9, 'z', P['metal'], v=4))
    torre = juntar(t, 'Torre', origem=(0, 0.25, 2.1))
    return [casco, torre]


def m7_priest():
    P = paleta()
    pc = esteiras(P, 5.3, 0.45, 1.12)
    pc.append(caixa('Casco inf', 2.1, 5.0, 0.8, 0, 0.1, 0.95, P['od']))
    pc.append(caixa('Glacis', 2.5, 1.6, 0.12, 0, -1.95, 1.45, P['od'], rot=(-50, 0, 0)))
    pc.append(caixa('Transmissao', 2.2, 0.6, 0.8, 0, -2.45, 0.95, P['od'], bev=0.2))
    # superestrutura aberta (paredes finas)
    pc.append(caixa('Piso', 2.7, 3.2, 0.1, 0, 0.3, 1.4, P['od2']))
    for s in (1, -1):
        pc.append(caixa('Parede lat', 0.06, 3.4, 0.85, s * 1.36, 0.3, 1.85, P['od']))
        pc.append(cil('Farol', 0.1, 0.2, s * 0.85, -2.6, 1.3, 'y', P['luz'], v=10))
    pc.append(caixa('Parede tras', 2.7, 0.06, 0.85, 0, 2.0, 1.85, P['od']))
    pc.append(caixa('Parede frente', 2.7, 0.06, 0.95, 0, -1.3, 1.95, P['od']))
    pc.append(caixa('Deck motor', 2.4, 0.9, 0.1, 0, 2.2, 1.45, P['od2']))
    # púlpito da metralhadora
    pc.append(cil('Pulpito', 0.45, 0.9, 0.85, -1.15, 2.05, 'z', P['od'], v=16))
    pc.append(anel('Anel 50', 0.42, 0.04, 0.85, -1.15, 2.55, P['metal']))
    pc.append(cil('Ponto 50', 0.03, 1.5, 0.85, -1.9, 2.65, 'y', P['metal'], v=6))
    # obus 105 mm
    pc.append(caixa('Berço', 0.6, 1.0, 0.5, -0.25, -0.9, 2.1, P['od']))
    pc.append(cil('Obus 105', 0.085, 2.5, -0.25, -2.3, 2.15, 'y', P['od'], v=12))
    pc.append(cil('Boca', 0.11, 0.2, -0.25, -3.55, 2.15, 'y', P['metal'], v=12))
    for i in range(3):
        pc.append(caixa('Municao', 0.45, 0.3, 0.3, -0.75 + i * 0.5, 1.6, 1.62, P['madeira']))
    pc += estrela('Estrela', 0.42, 1.395, 0.5, 1.85, 'x', P['estrela'])
    pc += estrela('Estrela', 0.42, -1.395, 0.5, 1.85, '-x', P['estrela'])
    return [juntar(pc, 'Casco')]


def roda(P, r, larg, x, y, z):
    return [cil('Pneu', r, larg, x, y, z, 'x', P['pneu'], v=16),
            cil('Cubo', r * 0.55, larg + 0.02, x, y, z, 'x', P['od'], v=10)]


def jeep():
    P = paleta()
    pc = []
    for s in (1, -1):
        for yy in (-1.02, 1.03):
            pc += roda(P, 0.36, 0.2, s * 0.62, yy, 0.36)
        pc.append(caixa('Para-lama', 0.3, 0.75, 0.05, s * 0.6, -1.15, 0.78, P['od']))
        pc.append(cil('Farol', 0.07, 0.1, s * 0.3, -1.66, 0.85, 'y', P['luz'], v=10))
    pc.append(caixa('Chassi', 1.0, 3.2, 0.15, 0, 0, 0.5, P['metal']))
    pc.append(caixa('Carroceria', 1.25, 2.0, 0.5, 0, 0.42, 0.78, P['od'], bev=0.05))
    pc.append(caixa('Capô', 0.95, 1.15, 0.3, 0, -1.08, 0.88, P['od'], bev=0.06))
    pc.append(caixa('Grade', 0.82, 0.06, 0.42, 0, -1.66, 0.82, P['od2']))
    for i in range(9):
        pc.append(caixa('Fenda', 0.03, 0.08, 0.32, -0.32 + i * 0.08, -1.68, 0.84, P['preto']))
    pc.append(caixa('Para-brisa', 1.2, 0.05, 0.45, 0, -0.45, 1.27, P['vidro'], rot=(-8, 0, 0)))
    pc.append(caixa('Moldura', 1.26, 0.07, 0.06, 0, -0.42, 1.5, P['od']))
    for s in (1, -1):
        pc.append(caixa('Banco', 0.45, 0.45, 0.12, s * 0.28, -0.05, 0.98, P['lona']))
        pc.append(caixa('Encosto', 0.45, 0.1, 0.4, s * 0.28, 0.2, 1.18, P['lona']))
    pc.append(caixa('Banco tras', 1.0, 0.45, 0.12, 0, 0.8, 0.98, P['lona']))
    pc.append(anel('Volante', 0.17, 0.02, -0.28, -0.32, 1.15, P['preto'], eixo='y'))
    pc.append(cil('Estepe', 0.36, 0.2, 0, 1.48, 0.8, 'y', P['pneu'], v=16))
    pc.append(cil('Pedestal', 0.04, 0.9, 0, 0.55, 1.4, 'z', P['metal'], v=8))
    pc.append(cil('Metralhadora 30', 0.03, 1.1, 0, 0.2, 1.88, 'y', P['metal'], v=6))
    pc.append(cil('Galao', 0.12, 0.45, 0.45, 1.45, 0.85, 'z', P['od2'], v=8))
    pc += estrela('Estrela', 0.3, 0, -1.05, 1.035, 'z', P['estrela'])
    return [juntar(pc, 'Jeep')]


def halftrack():
    P = paleta()
    pc = []
    for s in (1, -1):
        pc += roda(P, 0.48, 0.28, s * 0.86, -1.95, 0.48)
        pc.append(caixa('Esteira', 0.32, 2.95, 0.7, s * 0.86, 1.25, 0.42, P['esteira'], bev=0.28))
        for i in range(4):
            pc.append(cil('Roda', 0.25, 0.1, s * 1.05, 0.25 + i * 0.65, 0.3, 'x', P['metal'], v=10))
        pc.append(caixa('Para-lama', 0.4, 1.0, 0.05, s * 0.86, -1.95, 1.02, P['od'], rot=(0, s * 15, 0)))
        pc.append(cil('Farol', 0.09, 0.12, s * 0.55, -2.65, 1.25, 'y', P['luz'], v=10))
    pc.append(caixa('Chassi', 1.3, 5.8, 0.25, 0, 0, 0.75, P['metal']))
    pc.append(caixa('Capô', 1.1, 1.25, 0.6, 0, -2.0, 1.2, P['od'], bev=0.05))
    pc.append(caixa('Blindagem radiador', 1.15, 0.08, 0.7, 0, -2.66, 1.2, P['od']))
    pc.append(cil('Rolo', 0.18, 1.6, 0, -2.95, 0.75, 'x', P['od2'], v=12))
    pc.append(caixa('Cabine', 2.1, 1.1, 0.95, 0, -0.85, 1.42, P['od']))
    pc.append(caixa('Visor', 1.9, 0.08, 0.4, 0, -1.42, 1.98, P['od'], rot=(20, 0, 0)))
    pc.append(caixa('Piso', 2.0, 3.6, 0.1, 0, 1.1, 0.95, P['od2']))
    for s in (1, -1):
        pc.append(caixa('Parede lat', 0.06, 3.7, 1.0, s * 1.03, 1.05, 1.45, P['od']))
        for i in range(4):
            pc.append(caixa('Soldado sentado', 0.35, 0.35, 0.55, s * 0.7, 0.2 + i * 0.75, 1.3, P['farda']))
    pc.append(caixa('Parede tras', 2.1, 0.06, 1.0, 0, 2.9, 1.45, P['od']))
    pc.append(caixa('Porta tras', 0.7, 0.07, 0.9, 0, 2.94, 1.4, P['od2']))
    pc.append(anel('Anel 50', 0.55, 0.05, 0.4, -0.75, 2.05, P['od']))
    pc.append(cil('Suporte', 0.05, 0.4, 0.4, -0.75, 2.2, 'z', P['metal'], v=6))
    pc.append(cil('Ponto 50', 0.035, 1.6, 0.4, -1.45, 2.35, 'y', P['metal'], v=6))
    pc.append(caixa('Lona enrolada', 1.9, 0.3, 0.25, 0, 2.7, 2.0, P['lona'], bev=0.1))
    pc += estrela('Estrela', 0.32, 0, -2.0, 1.51, 'z', P['estrela'])
    pc += estrela('Estrela', 0.4, 1.065, 1.1, 1.45, 'x', P['estrela'])
    pc += estrela('Estrela', 0.4, -1.065, 1.1, 1.45, '-x', P['estrela'])
    return [juntar(pc, 'Halftrack')]


def caminhao():
    P = paleta()
    pc = []
    for s in (1, -1):
        for yy in (-2.3, 1.15, 2.35):
            pc += roda(P, 0.46, 0.3, s * 0.88, yy, 0.46)
        pc.append(caixa('Para-lama', 0.42, 1.0, 0.05, s * 0.85, -2.3, 1.0, P['od']))
        pc.append(cil('Farol', 0.1, 0.12, s * 0.55, -3.05, 1.25, 'y', P['luz'], v=10))
        pc.append(caixa('Estribo', 0.3, 0.9, 0.05, s * 0.9, -1.2, 0.85, P['od']))
    pc.append(caixa('Chassi', 1.1, 6.6, 0.25, 0, 0, 0.8, P['metal']))
    pc.append(caixa('Capô', 1.05, 1.4, 0.6, 0, -2.35, 1.25, P['od'], bev=0.05))
    pc.append(caixa('Grade', 0.95, 0.06, 0.7, 0, -3.06, 1.2, P['od2']))
    pc.append(caixa('Cabine', 2.0, 1.3, 1.05, 0, -1.1, 1.55, P['od']))
    pc.append(caixa('Para-brisa', 1.8, 0.05, 0.5, 0, -1.78, 1.85, P['vidro']))
    pc.append(caixa('Teto lona', 2.0, 1.25, 0.08, 0, -1.1, 2.32, P['lona']))
    pc.append(caixa('Carroceria', 2.25, 4.0, 0.12, 0, 1.4, 1.2, P['madeira']))
    for s in (1, -1):
        pc.append(caixa('Grade lat', 0.06, 4.0, 0.55, s * 1.11, 1.4, 1.5, P['madeira']))
    pc.append(cil('Lona', 1.12, 3.9, 0, 1.4, 1.75, 'y', P['lona'], v=16, esc=(1, 1, 0.75)))
    pc.append(caixa('Tampa', 2.25, 0.1, 0.6, 0, 3.38, 1.5, P['madeira']))
    pc += estrela('Estrela', 0.3, 1.0, -1.1, 1.5, 'x', P['estrela'])
    pc += estrela('Estrela', 0.3, -1.0, -1.1, 1.5, '-x', P['estrela'])
    pc += estrela('Estrela', 0.28, 0, -2.4, 1.555, 'z', P['estrela'])
    return [juntar(pc, 'Caminhao')]


# ----------------------------------------------------------------------------
# SOLDADOS
# ----------------------------------------------------------------------------
def soldado(arma='fuzil'):
    P = paleta()
    pc = []
    for s in (1, -1):
        pc.append(caixa('Perna', 0.15, 0.17, 0.82, s * 0.1, s * 0.06, 0.48, P['calca'], rot=(s * 8, 0, 0)))
        pc.append(caixa('Bota', 0.15, 0.26, 0.12, s * 0.1, s * 0.1 - 0.04, 0.06, P['bota']))
        pc.append(caixa('Polaina', 0.16, 0.18, 0.2, s * 0.1, s * 0.09, 0.2, P['lona']))
    pc.append(caixa('Tronco', 0.4, 0.25, 0.62, 0, 0, 1.18, P['farda'], bev=0.04))
    pc.append(caixa('Cinto', 0.42, 0.27, 0.08, 0, 0, 0.92, P['lona']))
    for s in (1, -1):
        pc.append(caixa('Suspensorio', 0.05, 0.27, 0.6, s * 0.12, 0, 1.2, P['lona']))
        pc.append(caixa('Cartucheira', 0.1, 0.06, 0.1, s * 0.12, -0.15, 0.95, P['lona']))
    pc.append(caixa('Mochila', 0.32, 0.14, 0.32, 0, 0.19, 1.25, P['lona']))
    pc.append(cil('Pescoco', 0.05, 0.08, 0, 0, 1.52, 'z', P['pele'], v=8))
    pc.append(esfera('Cabeca', 0.11, 0, 0, 1.62, (1, 1.05, 1.1), P['pele'], 12, 8))
    # capacete M1
    pc.append(esfera('Capacete', 0.155, 0, 0.01, 1.66, (1, 1.08, 0.75), P['od'], 14, 8))
    pc.append(cil('Aba', 0.17, 0.02, 0, 0.01, 1.63, 'z', P['od'], v=14, esc=(1, 1.08, 1)))
    if arma == 'bazuca':
        pc.append(caixa('Braco', 0.1, 0.5, 0.1, 0.25, -0.12, 1.38, P['farda'], rot=(-10, 0, 0)))
        pc.append(caixa('Braco', 0.1, 0.42, 0.1, -0.2, -0.22, 1.3, P['farda'], rot=(-20, 0, 0)))
        pc.append(cil('Bazuca', 0.045, 1.45, 0.17, -0.15, 1.5, 'y', P['od'], v=10))
        pc.append(cil('Boca', 0.06, 0.12, 0.17, 0.55, 1.5, 'y', P['metal'], v=10))
        pc.append(caixa('Punho', 0.04, 0.05, 0.15, 0.17, -0.3, 1.4, P['madeira']))
    else:
        for s in (1, -1):
            pc.append(caixa('Braco', 0.1, 0.48, 0.1, s * 0.2, -0.2, 1.22, P['farda'], rot=(-35, 0, s * -10)))
            pc.append(caixa('Mao', 0.08, 0.1, 0.08, s * 0.12, -0.42, 1.08, P['pele']))
        pc.append(caixa('Coronha', 0.05, 0.45, 0.1, 0.04, -0.15, 1.12, P['madeira'], rot=(10, 0, 0)))
        pc.append(caixa('Guarda-mao', 0.05, 0.5, 0.06, 0.04, -0.6, 1.07, P['madeira'], rot=(10, 0, 0)))
        pc.append(cil('Cano Garand', 0.012, 0.5, 0.04, -1.0, 1.0, 'y', P['metal'], v=6, rot=(10, 0, 0)))
    return [juntar(pc, 'Soldado')]


# ----------------------------------------------------------------------------
# AVIÕES
# ----------------------------------------------------------------------------
def helice(P, pas, r, x, y, z, larg=0.18):
    pc = [cil('Cubo', 0.18, 0.3, x, y, z, 'y', P['metal'], v=10)]
    for i in range(pas):
        a = 360.0 * i / pas
        o = caixa('Pa', larg, 0.04, r, x, y, z + r / 2, P['preto'])
        # gira a pá em torno do eixo y passando pelo cubo
        bpy.context.scene.cursor.location = (x, y, z)
        bpy.ops.object.select_all(action='DESELECT')
        o.select_set(True)
        bpy.context.view_layer.objects.active = o
        bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
        o.rotation_euler = (0, R(a), 0)
        _aplicar(o)
        pc.append(o)
    bpy.context.scene.cursor.location = (0, 0, 0)
    return juntar(pc, 'Helice', origem=(x, y, z))


def faixas_invasao(P, x0, x1, y, corda, z, esp=0.32, n=5, eixo='x'):
    pc = []
    w = (x1 - x0) / n
    for i in range(n):
        m = P['branco'] if i % 2 == 0 else P['preto']
        if eixo == 'x':
            pc.append(caixa('Faixa', w, corda, esp, x0 + w * (i + 0.5), y, z, m))
    return pc


def p51():
    P = paleta()
    pc = [loft('Fuselagem', [
        (-4.75, 0.05, 0.05, 0.0), (-4.6, 0.3, 0.34, 0.0), (-4.2, 0.46, 0.55, 0.02), (-3.2, 0.5, 0.62, 0.05),
        (-1.4, 0.5, 0.64, 0.1), (0.4, 0.46, 0.6, 0.08), (2.4, 0.3, 0.46, 0.14), (4.2, 0.12, 0.3, 0.22),
        (4.9, 0.03, 0.12, 0.28)], P['aluminio'], n=16)]
    pc.append(cil('Spinner', 0.32, 0.55, 0, -5.0, 0, 'y', P['vermelho'], v=14, r2=0.05,
                  rot=(180, 0, 0)))
    pc.append(esfera('Canopi', 0.36, 0, -0.6, 0.62, (1, 2.4, 1.05), P['vidro'], 16, 10))
    pc.append(loft('Radiador', [(-0.2, 0.02, 0.02, -0.55), (0.2, 0.3, 0.25, -0.62), (1.6, 0.3, 0.25, -0.62),
                                (2.4, 0.05, 0.05, -0.5)], P['aluminio'], n=10))
    pc.append(asa('Asa', 11.28, 2.65, 1.25, 0.5, 0.15, 0, -0.5, -0.38, P['aluminio'], diedro=5))
    pc.append(asa('Profundor', 4.1, 1.2, 0.65, 0.3, 0.1, 0, 4.15, 0.22, P['aluminio']))
    pc.append(asa('Deriva', 1.45, 1.6, 0.75, 0.6, 0.1, 0, 4.05, 0.25, P['aluminio'], vertical=True))
    pc.append(caixa('Painel anti-reflexo', 0.35, 1.8, 0.05, 0, -2.8, 0.6, P['od']))
    for s in (1, -1):
        for i in range(3):
            pc.append(cil('Metralhadora 50', 0.025, 0.6, s * (2.2 + i * 0.25), -1.95, -0.38, 'y', P['metal'], v=6))
        pc.append(cil('Escape', 0.05, 1.2, s * 0.42, -3.6, 0.25, 'y', P['escape'], v=6))
        pc += faixas_invasao(P, s * 1.6 if s > 0 else -3.2, 3.2 if s > 0 else -1.6, -0.35, 2.4, -0.33)
    pc += estrela('Estrela', 0.5, -4.2, -0.4, -0.1, 'z', P['estrela'], disco=0.55, mdisco=P['azul'])
    pc += estrela('Estrela', 0.5, 4.2, -0.4, -0.66, '-z', P['estrela'], disco=0.55, mdisco=P['azul'])
    pc += estrela('Estrela', 0.32, 0.37, 2.2, 0.15, 'x', P['estrela'], disco=0.36, mdisco=P['azul'])
    pc += estrela('Estrela', 0.32, -0.37, 2.2, 0.15, '-x', P['estrela'], disco=0.36, mdisco=P['azul'])
    corpo = juntar(pc, 'Aviao')
    return [corpo, helice(P, 4, 1.65, 0, -4.95, 0, 0.2)]


def p80():
    P = paleta()
    pc = [loft('Fuselagem', [
        (-5.3, 0.03, 0.03, 0.05), (-5.0, 0.28, 0.3, 0.05), (-4.0, 0.5, 0.55, 0.05), (-2.0, 0.62, 0.66, 0.05),
        (0.5, 0.66, 0.68, 0.0), (3.0, 0.55, 0.58, 0.0), (5.0, 0.42, 0.42, 0.05), (5.3, 0.4, 0.4, 0.05)],
        P['aluminio'], n=16)]
    pc.append(esfera('Canopi', 0.36, 0, -2.4, 0.62, (1, 2.2, 0.9), P['vidro'], 16, 10))
    pc.append(cil('Bocal', 0.36, 0.3, 0, 5.4, 0.05, 'y', P['escape'], v=14))
    pc.append(asa('Asa', 11.8, 2.9, 1.3, 0.5, 0.13, 0, 0.3, -0.25, P['aluminio'], diedro=4))
    pc.append(asa('Profundor', 4.6, 1.3, 0.7, 0.4, 0.1, 0, 4.4, 0.35, P['aluminio']))
    pc.append(asa('Deriva', 1.9, 1.8, 0.8, 0.9, 0.1, 0, 4.2, 0.4, P['aluminio'], vertical=True))
    for s in (1, -1):
        pc.append(loft('Entrada ar', [(-1.3, 0.02, 0.05, 0.0), (-1.2, 0.18, 0.3, 0.0), (0.8, 0.15, 0.25, 0.0),
                                      (1.6, 0.02, 0.05, 0.0)], P['aluminio'], n=10))
        pc[-1].location.x = s * 0.62
        pc.append(esfera('Tanque ponta', 0.38, s * 5.95, 0.4, -0.15, (1, 4.2, 1), P['aluminio'], 14, 8))
        for i in range(3):
            pc.append(cil('Metralhadora 50', 0.025, 0.5, s * 0.12 * (i + 1), -5.35, 0.25, 'y', P['metal'], v=6))
    pc += estrela('Estrela', 0.5, -4.3, 0.5, 0.05, 'z', P['estrela'], disco=0.55, mdisco=P['azul'])
    pc += estrela('Estrela', 0.5, 4.3, 0.5, -0.4, '-z', P['estrela'], disco=0.55, mdisco=P['azul'])
    pc += estrela('Estrela', 0.4, 0.6, 2.4, 0.05, 'x', P['estrela'], disco=0.45, mdisco=P['azul'])
    pc += estrela('Estrela', 0.4, -0.6, 2.4, 0.05, '-x', P['estrela'], disco=0.45, mdisco=P['azul'])
    return [juntar(pc, 'Aviao')]


def b17():
    P = paleta()
    od = P['od']
    pc = [loft('Fuselagem', [
        (-11.2, 0.05, 0.05, 0.1), (-11.0, 0.6, 0.65, 0.1), (-10.2, 0.95, 1.05, 0.15), (-7.5, 1.15, 1.35, 0.25),
        (-2.0, 1.2, 1.45, 0.3), (3.0, 1.05, 1.3, 0.35), (7.5, 0.6, 0.9, 0.6), (10.6, 0.3, 0.5, 0.9),
        (11.4, 0.2, 0.3, 1.0)], od, n=18)]
    pc.append(esfera('Nariz vidro', 0.62, 0, -10.9, 0.1, (1, 1.1, 1), P['vidro'], 14, 8))
    pc.append(esfera('Cabine', 0.6, 0, -7.6, 1.35, (1.2, 1.8, 0.7), P['vidro'], 14, 8))
    pc.append(esfera('Torreta sup', 0.55, 0, -6.2, 1.62, (1, 1, 0.8), P['vidro'], 12, 8))
    pc.append(esfera('Torreta bola', 0.6, 0, -1.0, -1.15, (1, 1, 1), P['metal'], 12, 8))
    pc.append(esfera('Torreta queixo', 0.42, 0, -10.6, -0.55, (1, 1, 0.8), P['metal'], 12, 8))
    pc.append(asa('Asa', 31.6, 5.9, 2.1, 1.9, 0.17, 0, -3.0, -0.25, od, diedro=4.5))
    pc.append(asa('Profundor', 13.5, 3.4, 1.4, 1.2, 0.12, 0, 9.4, 0.9, od))
    pc.append(asa('Deriva', 5.4, 7.5, 2.4, 5.2, 0.12, 0, 7.6, 1.0, od, vertical=True))
    for s in (1, -1):
        for xx in (4.25, 8.1):
            dz = math.tan(R(4.5)) * xx - 0.25
            pc.append(loft('Nacele', [(-6.6, 0.55, 0.55, dz), (-5.6, 0.62, 0.66, dz), (-3.0, 0.5, 0.55, dz),
                                      (-1.0, 0.2, 0.25, dz + 0.1)], od, n=12))
            pc[-1].location.x = s * xx
            pc.append(cil('Capô motor', 0.62, 0.8, s * xx, -6.4, dz, 'y', od, v=14))
        pc.append(cil('Metralhadora cintura', 0.03, 1.0, s * 1.3, 2.0, 0.6, 'x', P['metal'], v=6))
    pc += estrela('Estrela', 1.1, -11.0, -2.0, 0.6, 'z', P['estrela'], disco=1.2, mdisco=P['azul'])
    pc += estrela('Estrela', 0.85, 1.1, 4.0, 0.5, 'x', P['estrela'], disco=0.95, mdisco=P['azul'])
    pc += estrela('Estrela', 0.85, -1.1, 4.0, 0.5, '-x', P['estrela'], disco=0.95, mdisco=P['azul'])
    pc.append(caixa('Triangulo cauda', 0.06, 1.6, 1.6, 0.18, 9.6, 4.2, P['branco']))
    pc.append(caixa('Triangulo cauda', 0.06, 1.6, 1.6, -0.18, 9.6, 4.2, P['branco']))
    corpo = juntar(pc, 'Aviao')
    hs = []
    for s in (1, -1):
        for xx in (4.25, 8.1):
            dz = math.tan(R(4.5)) * xx - 0.25
            hs.append(helice(P, 3, 1.75, s * xx, -6.9, dz, 0.25))
    return [corpo, juntar(hs, 'Helice', origem=(0, -6.9, 0))]


def c47():
    P = paleta()
    od = P['od']
    pc = [loft('Fuselagem', [
        (-9.6, 0.05, 0.05, 0.3), (-9.3, 0.7, 0.75, 0.25), (-8.0, 1.2, 1.25, 0.2), (-5.5, 1.4, 1.45, 0.2),
        (1.0, 1.4, 1.45, 0.2), (5.0, 1.0, 1.1, 0.4), (8.5, 0.35, 0.5, 0.9), (9.8, 0.1, 0.2, 1.1)], od, n=18)]
    pc.append(esfera('Para-brisa', 0.7, 0, -8.0, 0.95, (1.3, 0.9, 0.5), P['vidro'], 12, 8))
    pc.append(asa('Asa', 29.0, 4.9, 1.6, 1.5, 0.15, 0, -2.6, -0.85, od, diedro=5))
    pc.append(asa('Profundor', 8.2, 2.6, 1.2, 0.6, 0.1, 0, 8.4, 1.0, od))
    pc.append(asa('Deriva', 3.4, 4.0, 1.4, 2.4, 0.1, 0, 7.6, 1.2, od, vertical=True))
    for s in (1, -1):
        xx = 2.85
        dz = math.tan(R(5)) * xx - 0.85
        pc.append(loft('Nacele', [(-5.3, 0.62, 0.62, dz), (-4.6, 0.7, 0.72, dz), (-2.0, 0.6, 0.7, dz - 0.1),
                                  (0.0, 0.2, 0.3, dz)], od, n=12))
        pc[-1].location.x = s * xx
        pc.append(cil('Capô motor', 0.72, 0.8, s * xx, -5.1, dz, 'y', od, v=14))
        for i in range(6):
            pc.append(caixa('Janela', 0.04, 0.35, 0.3, s * 1.4, -3.0 + i * 0.9, 0.75, P['vidro']))
        pc += faixas_invasao(P, s * 4.0 if s > 0 else -7.0, 7.0 if s > 0 else -4.0, -2.6, 3.6, -0.6)
    pc.append(caixa('Porta carga', 0.05, 1.6, 1.6, -1.42, 2.0, 0.2, od))
    for i in range(5):
        yy = 3.4 + i * 0.35
        t = (yy - 1.0) / 4.0
        pc.append(cil('Faixa fus', 1.0, 0.35, 0, yy, 0.2 + 0.2 * t, 'y',
                      P['branco'] if i % 2 == 0 else P['preto'], v=18, esc=(1.43 - 0.4 * t, 1, 1.48 - 0.35 * t)))
    pc += estrela('Estrela', 1.0, -9.5, -2.6, -0.35, 'z', P['estrela'], disco=1.1, mdisco=P['azul'])
    pc += estrela('Estrela', 0.7, 1.33, -0.5, 0.4, 'x', P['estrela'], disco=0.78, mdisco=P['azul'])
    pc += estrela('Estrela', 0.7, -1.33, -0.5, 0.4, '-x', P['estrela'], disco=0.78, mdisco=P['azul'])
    corpo = juntar(pc, 'Aviao')
    hs = []
    for s in (1, -1):
        dz = math.tan(R(5)) * 2.85 - 0.85
        hs.append(helice(P, 3, 1.75, s * 2.85, -5.6, dz, 0.25))
    return [corpo, juntar(hs, 'Helice', origem=(0, -5.6, 0))]


# ----------------------------------------------------------------------------
# NAVIOS
# ----------------------------------------------------------------------------
def casco_navio(P, comp, larg, calado, borda, m, n=16):
    L2 = comp / 2
    secs = [(-L2, 0.05, (calado + borda) / 2 * 0.9, (borda - calado) / 2 + 0.6),
            (-L2 * 0.85, larg * 0.28, (calado + borda) / 2, (borda - calado) / 2 + 0.3),
            (-L2 * 0.6, larg * 0.46, (calado + borda) / 2, (borda - calado) / 2),
            (-L2 * 0.2, larg * 0.5, (calado + borda) / 2, (borda - calado) / 2),
            (L2 * 0.5, larg * 0.5, (calado + borda) / 2, (borda - calado) / 2),
            (L2 * 0.88, larg * 0.42, (calado + borda) / 2 * 0.95, (borda - calado) / 2 + 0.1),
            (L2, larg * 0.3, (calado + borda) / 2 * 0.7, (borda - calado) / 2 + 0.4)]
    return loft('Casco', secs, m, n=n, p=5.0)


def torre_canhao(P, nome, x, y, z, rcan=0.12, comp=5.5, dupla=False, larg=3.0, m=None):
    m = m or P['navio']
    pc = [caixa(nome, larg, 3.4, 2.2, x, y, z + 1.1, m, bev=0.4)]
    for dx in ((-0.45, 0.45) if dupla else (0,)):
        pc.append(cil('Cano', rcan, comp, x + dx, y - comp / 2 - 1.5, z + 1.2, 'y', P['aco'], v=8))
    return pc


def porta_avioes():
    P = paleta()
    pc = [casco_navio(P, 262, 28.4, 8.5, 12.0, P['navio2'], n=20)]
    pc.append(caixa('Hangar', 26, 200, 6, 0, 5, 14.5, P['navio']))
    pc.append(caixa('Convoo', 32, 262, 0.8, 0, 2, 17.8, P['convoo']))
    pc.append(caixa('Linha central', 0.6, 240, 0.05, 0, 2, 18.22, P['branco']))
    for yy in (-70, -10, 60):
        pc.append(caixa('Elevador', 13, 14, 0.06, 0, yy, 18.23, P['navio2']))
    for yy in range(-120, 125, 20):
        pc.append(caixa('Faixa', 31, 0.4, 0.05, 0, yy, 18.22, P['amarelo']))
    pc.append(caixa('Numero 9', 4, 10, 0.06, -8, -112, 18.24, P['branco']))
    # ilha (a boreste / direita = +x)
    pc.append(caixa('Ilha', 7, 32, 9, 14.5, -2, 22.6, P['navio'], bev=0.4))
    pc.append(caixa('Ponte', 8, 12, 3, 14.5, -8, 28.6, P['navio'], bev=0.3))
    pc.append(caixa('Janelas', 8.1, 0.2, 1.0, 14.5, -14.05, 28.9, P['vidro']))
    pc.append(cil('Chamine', 3.0, 9, 15, 6, 31, 'z', P['navio2'], v=12, esc=(1, 2.2, 1), rot=(12, 0, 0)))
    pc.append(cil('Mastro', 0.4, 18, 14.5, -4, 38, 'z', P['navio2'], v=8))
    pc.append(caixa('Radar', 5, 0.4, 2.5, 14.5, -4, 44, P['metal']))
    pc += torre_canhao(P, 'Canhao 127', 14.5, -24, 18.2, dupla=True, larg=4)
    pc += torre_canhao(P, 'Canhao 127', 14.5, 22, 18.2, dupla=True, larg=4)
    for s in (1, -1):
        for yy in (-90, -45, 40, 95):
            pc.append(cil('Bofors', 1.2, 1.5, s * 16.5, yy, 17, 'z', P['navio'], v=10))
            pc.append(cil('Cano AA', 0.08, 3, s * 16.5, yy - 1.5, 18.2, 'y', P['aco'], v=6, rot=(-20, 0, 0)))
        pc.append(caixa('Passadico', 3, 200, 0.5, s * 16.5, 0, 16.0, P['navio2']))
    # aviões estacionados no convés (silhuetas simples)
    for i in range(6):
        yy = 80 + i * 8
        x = -8 + (i % 2) * 10
        pc.append(asa('Aviao convoo', 12, 2.5, 1.2, 0.4, 0.15, x, yy, 19.6, P['azul']))
        pc.append(cil('Fus convoo', 0.6, 9, x, yy + 1, 19.8, 'y', P['azul'], v=8))
    pc += estrela('Estrela', 2.5, 13.4, -50, 13.0, '-x', P['estrela'])
    return [juntar(pc, 'Navio')]


def contratorpedeiro():
    P = paleta()
    pc = [casco_navio(P, 114.8, 12.0, 4.2, 6.5, P['navio2'], n=18)]
    pc.append(caixa('Convés', 11, 108, 0.3, 0, 2, 6.2, P['convoo']))
    pc.append(caixa('Castelo', 10, 35, 2.4, 0, -28, 7.4, P['navio']))
    pc.append(caixa('Superestrutura', 8, 14, 3.4, 0, -24, 10.2, P['navio'], bev=0.3))
    pc.append(caixa('Ponte', 9, 6, 2.6, 0, -28, 13.2, P['navio'], bev=0.3))
    pc.append(caixa('Janelas', 9.1, 0.2, 0.8, 0, -31.05, 13.6, P['vidro']))
    pc.append(cil('Mastro', 0.25, 14, 0, -22, 18, 'z', P['navio2'], v=8))
    pc.append(caixa('Radar', 3, 0.3, 1.2, 0, -22, 23, P['metal']))
    for yy in (-6, 6):
        pc.append(cil('Chamine', 1.5, 7.5, 0, yy, 10.5, 'z', P['navio2'], v=12, esc=(1, 1.4, 1), rot=(8, 0, 0)))
    pc += torre_canhao(P, 'Canhao 127', 0, -46, 6.3, larg=3, comp=5.5)
    pc += torre_canhao(P, 'Canhao 127', 0, -37, 8.6, larg=3, comp=5.5)
    pc += torre_canhao(P, 'Canhao 127', 0, 28, 6.3, larg=3, comp=5.5)
    pc += torre_canhao(P, 'Canhao 127', 0, 38, 8.6, larg=3, comp=5.5)
    pc.append(caixa('Base torre', 4, 5, 2.2, 0, 38, 7.4, P['navio']))
    pc += torre_canhao(P, 'Canhao 127', 0, 47, 6.3, larg=3, comp=5.5)
    for yy in (14, 20):
        pc.append(cil('Torpedos', 0.6, 6, 0, yy, 7.5, 'x', P['aco'], v=10, esc=(1, 2, 1)))
    for s in (1, -1):
        pc.append(cil('Bofors', 0.9, 1.2, s * 4, -2, 7.2, 'z', P['navio'], v=10))
        pc.append(caixa('Bote', 1.6, 6, 1.0, s * 4.4, 4, 8.0, P['madeira'], bev=0.3))
    pc.append(caixa('Numero', 0.1, 4, 2.5, 6.02, -48, 4.3, P['branco']))
    return [juntar(pc, 'Navio')]


def higgins():
    P = paleta()
    pc = [caixa('Fundo', 3.2, 10.0, 0.6, 0, 0.3, -0.3, P['navio2'], bev=0.2)]
    for s in (1, -1):
        pc.append(caixa('Costado', 0.12, 9.5, 1.6, s * 1.55, 0.5, 0.5, P['navio']))
    pc.append(caixa('Popa', 3.2, 0.12, 1.8, 0, 5.2, 0.6, P['navio']))
    pc.append(caixa('Rampa', 3.0, 0.15, 2.0, 0, -4.75, 0.45, P['navio'], rot=(-12, 0, 0)))
    pc.append(caixa('Piso', 2.9, 7.0, 0.1, 0, -0.5, -0.05, P['madeira']))
    pc.append(caixa('Cabine piloto', 1.0, 1.2, 1.4, 0.8, 4.3, 0.9, P['navio']))
    for s in (1, -1):
        pc.append(cil('Metralhadora 30', 0.03, 1.0, s * 1.2, 3.6, 1.9, 'y', P['metal'], v=6))
        for i in range(4):
            pc.append(caixa('Soldado', 0.35, 0.35, 0.9, s * 0.7, -3.0 + i * 1.3, 0.45, P['farda']))
            pc.append(esfera('Capacete', 0.17, s * 0.7, -3.0 + i * 1.3, 1.0, (1, 1, 0.7), P['od'], 8, 6))
    return [juntar(pc, 'Navio')]


# ----------------------------------------------------------------------------
# ESTRUTURAS
# ----------------------------------------------------------------------------
def bandeira_eua(P, x, y, z, larg=3.6, alt=1.9):
    pc = [cil('Mastro', 0.07, z + 0.5, x, y, (z + 0.5) / 2, 'z', P['aco'], v=8)]
    faixa = alt / 13
    for i in range(13):
        m = P['vermelho'] if i % 2 == 0 else P['branco']
        pc.append(caixa('Listra', 0.03, larg, faixa, x, y + larg / 2 + 0.08, z - i * faixa, m))
    pc.append(caixa('Canton', 0.05, larg * 0.4, faixa * 7, x, y + larg * 0.2 + 0.08, z - faixa * 3, P['azul']))
    return pc


def sacos_areia(P, cx, cy, raio, n=14, z=0.25):
    pc = []
    for i in range(n):
        a = 2 * math.pi * i / n
        o = caixa('Saco', 0.9, 0.5, 0.5, cx + raio * math.cos(a), cy + raio * math.sin(a), z, P['areia'], bev=0.12)
        o.rotation_euler = (0, 0, a + math.pi / 2)
        _aplicar(o)
        pc.append(o)
    return pc


def quonset(P, nome, r, comp, x=0, y=0, m=None):
    pc = [cil(nome, r, comp, x, y, 0, 'y', m or P['chapa'], v=24)]
    pc.append(caixa('Piso', r * 2, comp, 0.2, x, y, 0.1, P['concreto']))
    for s in (1, -1):
        pc.append(caixa('Parede', r * 1.9, 0.15, r * 0.95, x, y + s * comp / 2, r * 0.47, P['madeira']))
        pc.append(caixa('Porta', r * 0.6, 0.2, r * 0.6, x, y + s * comp / 2, r * 0.3, P['preto']))
    return pc


def qg():
    P = paleta()
    pc = [caixa('Predio', 22, 12, 7.5, 0, 0, 3.75, P['concreto'], bev=0.2)]
    pc.append(caixa('Telhado', 23, 13, 0.6, 0, 0, 7.8, P['metal']))
    for i in range(6):
        for j in (2.2, 5.4):
            pc.append(caixa('Janela', 1.4, 0.15, 1.3, -8 + i * 3.2, -6.02, j, P['vidro']))
    pc.append(caixa('Porta', 2.2, 0.3, 2.8, 0, -6.05, 1.4, P['madeira']))
    pc.append(caixa('Toldo', 4, 2, 0.15, 0, -7, 3.1, P['lona']))
    pc += bandeira_eua(P, 0, -9, 11)
    pc += sacos_areia(P, 0, -12, 3.5)
    pc.append(cil('Antena radio', 0.08, 12, 9, 3, 13.5, 'z', P['aco'], v=6))
    for s in (1, -1):
        pc.append(caixa('Tenda', 6, 5, 3, s * 16, 3, 1.5, P['lona'], bev=1.2))
    return [juntar(pc, 'Estrutura')]


def quartel():
    P = paleta()
    pc = quonset(P, 'Quonset', 4.5, 18)
    pc += quonset(P, 'Quonset', 4.5, 18, x=11)
    pc.append(caixa('Patio', 22, 26, 0.1, 5.5, 0, 0.05, P['areia']))
    pc += bandeira_eua(P, -6.5, -12, 8)
    for i in range(4):
        pc.append(caixa('Caixa', 1.2, 0.8, 0.7, -5 + i * 1.4, 11, 0.35, P['od']))
    return [juntar(pc, 'Estrutura')]


def garagem():
    P = paleta()
    pc = [caixa('Piso', 26, 16, 0.3, 0, 0, 0.15, P['concreto'])]
    for i in range(5):
        for s in (1, -1):
            pc.append(cil('Coluna', 0.2, 6, -12 + i * 6, s * 7.5, 3, 'z', P['aco'], v=8))
    pc.append(caixa('Telhado', 26.5, 16.5, 0.4, 0, 0, 6.2, P['chapa']))
    pc.append(caixa('Parede fundo', 26, 0.3, 6, 0, 7.8, 3, P['chapa']))
    pc.append(caixa('Oficina', 6, 5, 3, 16, 3, 1.5, P['madeira']))
    for i in range(6):
        pc.append(cil('Tambor', 0.3, 0.9, 14 + (i % 3) * 0.7, -4 + (i // 3) * 0.7, 0.45, 'z', P['od'], v=10))
    pc.append(caixa('Placa', 4, 0.1, 1, 0, -8.3, 5.4, P['amarelo']))
    return [juntar(pc, 'Estrutura')]


def aerodromo():
    P = paleta()
    pc = quonset(P, 'Hangar', 11, 32, x=0, y=0)
    pc.append(caixa('Pista', 30, 700, 0.1, 40, -150, 0.05, P['pista']))
    for i in range(14):
        pc.append(caixa('Faixa pista', 1.2, 18, 0.05, 40, -470 + i * 46, 0.11, P['branco']))
    pc.append(caixa('Taxiway', 25, 12, 0.1, 18, -18, 0.05, P['pista']))
    pc.append(caixa('Torre', 4, 4, 9, -18, -20, 4.5, P['madeira']))
    pc.append(caixa('Cabine torre', 5.5, 5.5, 2.6, -18, -20, 10.3, P['vidro']))
    pc.append(caixa('Teto torre', 6, 6, 0.4, -18, -20, 11.8, P['metal']))
    pc.append(cil('Biruta', 0.05, 7, -26, -30, 3.5, 'z', P['aco'], v=6))
    pc.append(cil('Manga', 0.35, 2.2, -26, -31.1, 6.8, 'y', P['amarelo'], v=10, r2=0.15))
    for i in range(3):
        pc.append(cil('Tanque comb', 1.4, 5, -20 + i * 3.4, 22, 1.4, 'y', P['od'], v=14))
    return [juntar(pc, 'Estrutura')]


def porto():
    P = paleta()
    pc = [caixa('Cais', 14, 70, 2.5, 0, -30, 0.9, P['concreto'])]
    for i in range(8):
        for s in (1, -1):
            pc.append(cil('Estaca', 0.35, 6, s * 6.5, -60 + i * 8, -1.5, 'z', P['madeira'], v=8))
    pc.append(caixa('Armazem', 30, 18, 9, 0, 14, 4.5, P['chapa']))
    pc.append(caixa('Telhado', 31, 19, 0.5, 0, 14, 9.2, P['metal']))
    pc.append(caixa('Portao', 8, 0.2, 6, 0, 4.9, 3, P['preto']))
    # guindaste
    pc.append(caixa('Base guindaste', 4, 4, 3, 4, -40, 3.5, P['amarelo']))
    pc.append(caixa('Torre guindaste', 1.2, 1.2, 14, 4, -40, 11, P['amarelo']))
    pc.append(caixa('Lanca', 0.8, 22, 0.8, 4, -48, 18, P['amarelo'], rot=(-12, 0, 0)))
    pc.append(cil('Cabo', 0.04, 10, 4, -58, 13, 'z', P['preto'], v=4))
    for i in range(5):
        pc.append(caixa('Caixote', 2.4, 6, 2.4, -4 + (i % 2) * 3, -10 - i * 6, 3.3, P['od']))
    pc += bandeira_eua(P, -6, 2, 10)
    return [juntar(pc, 'Estrutura')]


def bunker():
    P = paleta()
    pc = [caixa('Casamata', 10, 8, 3.2, 0, 0, 1.6, P['concreto'], bev=0.6)]
    pc.append(caixa('Seteira', 6, 0.5, 0.45, 0, -4.0, 2.0, P['preto']))
    pc.append(caixa('Entrada', 2, 3, 2.4, 0, 5, 1.2, P['concreto']))
    pc.append(caixa('Porta', 1.2, 0.2, 1.9, 0, 6.5, 0.95, P['preto']))
    pc.append(cil('Cano MG', 0.05, 1.0, 1.2, -4.4, 2.0, 'y', P['metal'], v=6))
    pc += sacos_areia(P, 0, 0, 7.5, n=22)
    pc.append(caixa('Camuflagem', 11, 9, 0.3, 0, 0, 3.3, P['od2'], bev=0.1))
    return [juntar(pc, 'Estrutura')]


def antiaerea():
    P = paleta()
    pc = sacos_areia(P, 0, 0, 3.6, n=18)
    pc += sacos_areia(P, 0, 0, 3.6, n=18, z=0.7)
    pc.append(cil('Plataforma', 2.2, 0.5, 0, 0, 0.35, 'z', P['od'], v=16))
    base = juntar(pc, 'Estrutura')
    t = [cil('Pedestal', 0.6, 0.9, 0, 0, 1.0, 'z', P['od'], v=12)]
    t.append(caixa('Berço', 1.4, 1.6, 0.8, 0, 0, 1.7, P['od'], bev=0.1))
    t.append(caixa('Escudo', 1.8, 0.08, 1.0, 0, -0.75, 1.9, P['od']))
    t.append(cil('Cano Bofors', 0.06, 3.2, 0, -2.2, 2.6, 'y', P['od2'], v=8, rot=(-25, 0, 0)))
    t.append(cil('Quebra-chama', 0.1, 0.4, 0, -3.6, 3.25, 'y', P['metal'], v=8, rot=(-25, 0, 0)))
    for s in (1, -1):
        t.append(caixa('Assento', 0.4, 0.4, 0.1, s * 0.9, 0.3, 1.6, P['metal']))
    torre = juntar(t, 'Torre', origem=(0, 0, 1.0))
    return [base, torre]


# ----------------------------------------------------------------------------
# MARCOS DE PARIS (decoração do mapa, medidas reais)
# ----------------------------------------------------------------------------
def tronco_piramide(nome, cx0, cy0, h0, z0, cx1, cy1, h1, z1, m):
    """Prisma de base quadrada entre dois quadrados horizontais (meia-largura h0 em z0 -> h1 em z1)."""
    v = [(cx0 - h0, cy0 - h0, z0), (cx0 + h0, cy0 - h0, z0), (cx0 + h0, cy0 + h0, z0), (cx0 - h0, cy0 + h0, z0),
         (cx1 - h1, cy1 - h1, z1), (cx1 + h1, cy1 - h1, z1), (cx1 + h1, cy1 + h1, z1), (cx1 - h1, cy1 + h1, z1)]
    f = [(0, 3, 2, 1), (4, 5, 6, 7), (0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)]
    return _malha(nome, v, f, m)


def torre_eiffel():
    ferro = mat('FerroEiffel', 0x5e4b3c, metal=0.6, rough=0.6)
    pc = []
    for sx in (1, -1):
        for sy in (1, -1):
            # pés curvos: 3 trechos cada vez mais inclinados para dentro
            pts = [(50, 12, 0), (40, 10.5, 25), (31, 9, 45), (26, 8, 57)]
            for (a, ha, za), (b, hb, zb) in zip(pts, pts[1:]):
                pc.append(tronco_piramide('Pe', sx * a, sy * a, ha, za, sx * b, sy * b, hb, zb, ferro))
            pc.append(tronco_piramide('Pe2', sx * 25, sy * 25, 7, 61, sx * 15, sy * 15, 5, 115, ferro))
            # travessas em X (treliça) entre os pés
            for z in (12, 30, 80, 100):
                pc.append(caixa('Travessa', 1.0, 1.0, 1.0, sx * (44 - z * 0.35), 0, z, ferro))
    # arcos decorativos entre os pés do 1º nível (curva feita de segmentos)
    n = 14
    for lado in range(4):
        for i in range(n):
            t0, t1 = -1 + 2 * i / n, -1 + 2 * (i + 1) / n
            x0, x1 = 34 * t0, 34 * t1
            z0, z1 = 53 - 30 * t0 * t0, 53 - 30 * t1 * t1
            L = math.hypot(x1 - x0, z1 - z0)
            ang = math.degrees(math.atan2(z1 - z0, x1 - x0))
            o = caixa('Arco', L + 0.4, 2.5, 3.0, (x0 + x1) / 2, 34, (z0 + z1) / 2, ferro, rot=(0, -ang, 0))
            bpy.context.scene.cursor.location = (0, 0, 0)
            bpy.ops.object.select_all(action='DESELECT')
            o.select_set(True)
            bpy.context.view_layer.objects.active = o
            bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
            o.rotation_euler = (0, 0, R(90 * lado))
            _aplicar(o)
            pc.append(o)
    pc.append(caixa('1o andar', 72, 72, 7, 0, 0, 57.5, ferro))
    pc.append(caixa('Restaurante', 60, 60, 4, 0, 0, 63, mat('Vidraca', 0x8a7a66, rough=0.4)))
    pc.append(caixa('2o andar', 42, 42, 5, 0, 0, 116, ferro))
    pc.append(tronco_piramide('Fuste', 0, 0, 14, 118, 0, 0, 4.5, 276, ferro))
    for z in (150, 190, 230):
        pc.append(caixa('Anel fuste', 2 * (14 - (z - 118) * 0.0603) + 1.5, 2 * (14 - (z - 118) * 0.0603) + 1.5, 1.2, 0, 0, z, ferro))
    pc.append(caixa('Topo', 11, 11, 9, 0, 0, 280, ferro))
    pc.append(cil('Lanterna', 3, 10, 0, 0, 289, 'z', ferro, v=10))
    pc.append(cil('Antena', 0.8, 30, 0, 0, 309, 'z', mat('Aco', 0x6a6c6e, metal=0.9, rough=0.35), v=8))
    return [juntar(pc, 'TorreEiffel')]


def arco_triunfo():
    pedra = mat('Pedra', 0xd9cfb6, rough=0.9)
    pedra2 = mat('PedraEscura', 0xbdb196, rough=0.9)
    pc = []
    for s in (1, -1):
        # pilares (o arco grande atravessa no eixo Y, os arcos laterais no eixo X)
        for t in (1, -1):
            pc.append(caixa('Pilar', 15.2, 6.6, 37, s * 14.9, t * 7.7, 18.5, pedra))
        pc.append(caixa('Pilar meio', 15.2, 8.8, 18.4, s * 14.9, 0, 27.8, pedra))
        pc.append(caixa('Relevo', 9, 0.6, 12, s * 14.9, -11.2, 9, pedra2))
        pc.append(caixa('Relevo', 9, 0.6, 12, s * 14.9, 11.2, 9, pedra2))
    pc.append(caixa('Sobre arco', 14.6, 22, 8, 0, 0, 33, pedra))
    pc.append(caixa('Cornija', 46.5, 23.5, 1.4, 0, 0, 37.7, pedra2))
    pc.append(caixa('Atico', 45, 22, 11, 0, 0, 43.9, pedra))
    pc.append(caixa('Topo', 45.6, 22.6, 0.8, 0, 0, 49.8, pedra2))
    pc.append(caixa('Base', 50, 27, 0.8, 0, 0, 0.4, pedra2))
    pc.append(cil('Chama', 0.6, 0.6, 0, 0, 1.0, 'z', mat('Luz', 0xffe9a8, emit=2.0), v=8))
    return [juntar(pc, 'ArcoTriunfo')]


MODELOS = {
    'sherman': sherman, 'm7_priest': m7_priest, 'jeep': jeep, 'halftrack': halftrack, 'caminhao': caminhao,
    'soldado': lambda: soldado('fuzil'), 'soldado_bazuca': lambda: soldado('bazuca'),
    'p51': p51, 'p80': p80, 'b17': b17, 'c47': c47,
    'porta_avioes': porta_avioes, 'contratorpedeiro': contratorpedeiro, 'higgins': higgins,
    'qg': qg, 'quartel': quartel, 'garagem': garagem, 'aerodromo': aerodromo, 'porto': porto,
    'bunker': bunker, 'antiaerea': antiaerea,
    'torre_eiffel': torre_eiffel, 'arco_triunfo': arco_triunfo,
}

# casas francesas texturizadas, árvores e catedrais (blender/cidade_francesa.py)
sys.path.insert(0, AQUI)
import cidade_francesa  # noqa: E402
MODELOS.update(cidade_francesa.modelos(globals()))


# ----------------------------------------------------------------------------
# Exportação, renders e .blend
# ----------------------------------------------------------------------------
def tamanho(objs):
    mn = Vector((1e9, 1e9, 1e9))
    mx = Vector((-1e9, -1e9, -1e9))
    for o in objs:
        for c in o.bound_box:
            w = o.matrix_world @ Vector(c)
            mn = Vector(map(min, mn, w))
            mx = Vector(map(max, mx, w))
    return mn, mx


def exportar(nome, objs):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    caminho = os.path.join(SAIDA_GLB, nome + '.glb')
    bpy.ops.export_scene.gltf(filepath=caminho, export_format='GLB', use_selection=True, export_apply=True,
                              export_yup=True, export_materials='EXPORT')
    return caminho


def render_preview(nome, objs):
    sc = bpy.context.scene
    # Cycles na CPU: funciona sem placa de vídeo (servidor / linha de comando)
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = int(os.environ.get('AMOSTRAS', '24'))
    sc.cycles.use_denoising = False
    sc.render.resolution_x = 640
    sc.render.resolution_y = 480
    sc.render.film_transparent = False
    if not sc.world:
        sc.world = bpy.data.worlds.new('Mundo')
        sc.world.color = (0.55, 0.62, 0.7)
        try:
            sc.world.use_nodes = True
        except Exception:
            pass
        bg = sc.world.node_tree.nodes.get('Background') if sc.world.node_tree else None
        if bg:
            bg.inputs['Color'].default_value = (0.5, 0.58, 0.68, 1)
            bg.inputs['Strength'].default_value = 0.9
    sol = bpy.data.objects.get('SolPreview')
    if not sol:
        ld = bpy.data.lights.new('SolPreview', 'SUN')
        ld.energy = 3.5
        ld.angle = R(8)
        sol = bpy.data.objects.new('SolPreview', ld)
        sc.collection.objects.link(sol)
        sol.rotation_euler = (R(40), R(15), R(-35))
    mn, mx = tamanho(objs)
    centro = (mn + mx) / 2
    raio = (mx - mn).length / 2
    cam = bpy.data.objects.get('CamPreview')
    if not cam:
        cd = bpy.data.cameras.new('CamPreview')
        cam = bpy.data.objects.new('CamPreview', cd)
        sc.collection.objects.link(cam)
    cam.data.lens = 50
    d = raio * 2.9
    direcao = Vector((-0.75, -1.0, 0.55)).normalized()
    cam.location = centro + direcao * d
    cam.rotation_euler = (centro - cam.location).to_track_quat('-Z', 'Y').to_euler()
    cam.data.clip_end = d * 4
    sc.camera = cam
    sc.render.image_settings.file_format = 'JPEG'
    sc.render.image_settings.quality = 85
    sc.render.filepath = os.path.join(SAIDA_PREV, nome + '.jpg')
    bpy.ops.render.render(write_still=True)


def carregar_referencia(nome, x0, tam):
    for ext in ('.jpg', '.jpeg', '.png'):
        p = os.path.join(REFS, nome + ext)
        if os.path.exists(p):
            img = bpy.data.images.load(p)
            e = bpy.data.objects.new('Ref ' + nome, None)
            e.empty_display_type = 'IMAGE'
            e.data = img
            e.empty_display_size = max(tam, 3)
            e.location = (x0, tam * 1.2, tam * 0.5)
            e.rotation_euler = (R(90), 0, 0)
            bpy.context.scene.collection.objects.link(e)
            return True
    return False


def main():
    os.makedirs(SAIDA_GLB, exist_ok=True)
    os.makedirs(SAIDA_PREV, exist_ok=True)
    bpy.ops.wm.read_factory_settings(use_empty=True)
    cidade_francesa.gerar_texturas()
    nomes = SO or list(MODELOS)
    x0 = 0.0
    for nome in nomes:
        col = bpy.data.collections.new(nome)
        bpy.context.scene.collection.children.link(col)
        bpy.context.view_layer.active_layer_collection = bpy.context.view_layer.layer_collection.children[col.name]
        objs = MODELOS[nome]()
        mn, mx = tamanho(objs)
        caminho = exportar(nome, objs)
        if PREVIEW:
            # esconde os outros modelos durante o render
            for c in bpy.data.collections:
                c.hide_render = c.name != nome
            render_preview(nome, objs)
        tam = max(mx.x - mn.x, mx.y - mn.y, 1.0)
        # no .blend, enfileira os modelos ao longo de X
        raiz = bpy.data.objects.new(nome, None)
        col.objects.link(raiz)
        for o in objs:
            o.parent = raiz
        raiz.location.x = x0 + tam / 2
        carregar_referencia(nome, raiz.location.x, tam)
        print('OK %-18s %6.1f x %6.1f x %5.1f m  %s' % (nome, mx.x - mn.x, mx.y - mn.y, mx.z - mn.z,
                                                     os.path.relpath(caminho, RAIZ)))
        x0 += tam + 6
    for c in bpy.data.collections:
        c.hide_render = False
    if not SO:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.join(AQUI, 'frente_europa_modelos.blend'), compress=True)


if __name__ == '__main__':
    main()
