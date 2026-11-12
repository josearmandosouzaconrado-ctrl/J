"""Soldados dos EUA, da Rússia e da China feitos no Blender só com código (prévia em imagem).
Uso (Blender como módulo: pip install bpy==4.2.0, Python 3.11):
  python -I soldados.py -- <pasta_saida>
Corpo: esqueleto de vértices com o modificador Skin + subdivisão (formas orgânicas); equipamento com peças
chanfradas. Eixos do Blender: Z para cima, frente = +Y. Altura ~1,80 m.
"""
import sys, os, math
import bpy, bmesh
from mathutils import Vector, Matrix

ARGS = sys.argv[sys.argv.index('--') + 1:]
OUT = ARGS[0]
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
SC = bpy.context.scene


# ---------------- materiais ----------------
def material(nome, cor, rug=0.75, metal=0.0, camo=None, escala=6.0, digital=False, sujeira=0.3):
    m = bpy.data.materials.new(nome); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Roughness'].default_value = rug; b.inputs['Metallic'].default_value = metal
    if metal < 0.3: b.inputs['Specular IOR Level'].default_value = 0.25
    if camo:
        co = nt.nodes.new('ShaderNodeTexCoord')
        vec = co.outputs['Object']
        if digital:
            snap = nt.nodes.new('ShaderNodeVectorMath'); snap.operation = 'SNAP'; snap.inputs[1].default_value = (0.012, 0.012, 0.012)
            nt.links.new(vec, snap.inputs[0]); vec = snap.outputs[0]
        cor_atual = None
        # camadas de manchas: cada cor da lista é uma camada de ruído por cima da anterior
        base = nt.nodes.new('ShaderNodeRGB'); base.outputs[0].default_value = (*camo[0], 1)
        cor_atual = base.outputs[0]
        for i, c in enumerate(camo[1:]):
            n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = escala * (1 + 0.45 * i); n.inputs['Detail'].default_value = 2
            n.noise_dimensions = '4D'; n.inputs['W'].default_value = i * 3.7
            nt.links.new(vec, n.inputs['Vector'])
            r = nt.nodes.new('ShaderNodeMath'); r.operation = 'GREATER_THAN'; r.inputs[1].default_value = 0.56 + 0.02 * i
            nt.links.new(n.outputs['Fac'], r.inputs[0])
            mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'
            nt.links.new(r.outputs[0], mx.inputs[0]); nt.links.new(cor_atual, mx.inputs[6]); mx.inputs[7].default_value = (*c, 1)
            cor_atual = mx.outputs[2]
        saida = cor_atual
    else:
        rgb = nt.nodes.new('ShaderNodeRGB'); rgb.outputs[0].default_value = (*cor, 1); saida = rgb.outputs[0]
    if sujeira:
        ao = nt.nodes.new('ShaderNodeAmbientOcclusion'); ao.inputs['Distance'].default_value = 0.08
        mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'
        nt.links.new(saida, mx.inputs[6]); mx.inputs[7].default_value = (0.3, 0.28, 0.25, 1)
        inv = nt.nodes.new('ShaderNodeMath'); inv.operation = 'SUBTRACT'; inv.inputs[0].default_value = 1
        nt.links.new(ao.outputs['AO'], inv.inputs[1])
        k = nt.nodes.new('ShaderNodeMath'); k.operation = 'MULTIPLY'; k.inputs[1].default_value = sujeira * 2
        nt.links.new(inv.outputs[0], k.inputs[0]); nt.links.new(k.outputs[0], mx.inputs[0])
        saida = mx.outputs[2]
    # trama do tecido (leve relevo)
    if camo or sujeira:
        w = nt.nodes.new('ShaderNodeTexWave'); w.inputs['Scale'].default_value = 900; w.inputs['Distortion'].default_value = 2
        bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.08
        nt.links.new(w.outputs['Fac'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    nt.links.new(saida, b.inputs['Base Color'])
    return m


def objeto(bm, mat, bevel=0.0, suave=False, pai=None):
    me = bpy.data.meshes.new('p'); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new('p', me); SC.collection.objects.link(o)
    me.materials.append(mat)
    if bevel:
        m = o.modifiers.new('b', 'BEVEL'); m.width = bevel; m.segments = 2; m.limit_method = 'ANGLE'
    if suave:
        for p in me.polygons: p.use_smooth = True
    if pai: o.parent = pai
    return o


def caixa(dim, pos, mat, bevel=0.006, rot=Matrix.Identity(3), pai=None):
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=Vector(dim), verts=bm.verts)
    bmesh.ops.rotate(bm, cent=(0, 0, 0), matrix=rot, verts=bm.verts)
    bmesh.ops.translate(bm, vec=Vector(pos), verts=bm.verts)
    return objeto(bm, mat, bevel=bevel, pai=pai)


def cilindro(r1, r2, comp, pos, mat, rot=Matrix.Identity(3), n=16, pai=None):
    """cilindro ao longo de +Y (depois girado por rot)"""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=n, radius1=r1, radius2=r2, depth=comp)
    bmesh.ops.rotate(bm, cent=(0, 0, 0), matrix=rot @ Matrix.Rotation(-math.pi / 2, 3, 'X'), verts=bm.verts)
    bmesh.ops.translate(bm, vec=Vector(pos), verts=bm.verts)
    return objeto(bm, mat, suave=True, pai=pai)


def esfera(r, pos, mat, esc=(1, 1, 1), corte=None, pai=None):
    """esfera achatada; corte = altura relativa abaixo da qual a malha é removida (capacete)"""
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=28, v_segments=18, radius=r)
    if corte is not None:
        bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.z < r * corte], context='VERTS')
    bmesh.ops.scale(bm, vec=Vector(esc), verts=bm.verts)
    bmesh.ops.translate(bm, vec=Vector(pos), verts=bm.verts)
    o = objeto(bm, mat, suave=True, pai=pai)
    if corte is not None:
        s = o.modifiers.new('s', 'SOLIDIFY'); s.thickness = 0.018; s.offset = 1
    return o


# ---------------- corpo (Skin) ----------------
def corpo(x0, farda, pele, luva, bota):
    P = lambda x, y, z: Vector((x0 + x, y, z))
    # esqueleto: (nome, posição, raio_x, raio_y) e ligações
    J = {
        'pelve': (P(0, 0, 0.98), 0.155, 0.11), 'cintura': (P(0, 0.0, 1.13), 0.14, 0.1), 'peito': (P(0, 0.02, 1.33), 0.18, 0.12),
        'ombros': (P(0, 0.01, 1.45), 0.16, 0.1), 'pescoco': (P(0, 0.025, 1.6), 0.058, 0.058),
        'quadE': (P(-0.1, 0.0, 0.93), 0.09, 0.09), 'joelhoE': (P(-0.11, 0.07, 0.53), 0.062, 0.065), 'tornE': (P(-0.11, 0.02, 0.16), 0.048, 0.052),
        'quadD': (P(0.1, 0.0, 0.93), 0.09, 0.09), 'joelhoD': (P(0.12, -0.03, 0.52), 0.062, 0.065), 'tornD': (P(0.13, -0.08, 0.16), 0.048, 0.052),
        'ombroE': (P(-0.2, 0.01, 1.44), 0.068, 0.066), 'cotoE': (P(-0.25, 0.25, 1.22), 0.052, 0.052), 'pulsoE': (P(-0.07, 0.52, 1.17), 0.034, 0.031),
        'ombroD': (P(0.2, 0.01, 1.44), 0.068, 0.066), 'cotoD': (P(0.27, 0.06, 1.17), 0.052, 0.052), 'pulsoD': (P(0.13, 0.27, 1.09), 0.033, 0.03),
    }
    L = [('pelve', 'cintura'), ('cintura', 'peito'), ('peito', 'ombros'), ('ombros', 'pescoco'),
         ('pelve', 'quadE'), ('quadE', 'joelhoE'), ('joelhoE', 'tornE'), ('pelve', 'quadD'), ('quadD', 'joelhoD'), ('joelhoD', 'tornD'),
         ('ombros', 'ombroE'), ('ombroE', 'cotoE'), ('cotoE', 'pulsoE'), ('ombros', 'ombroD'), ('ombroD', 'cotoD'), ('cotoD', 'pulsoD')]
    nomes = list(J)
    me = bpy.data.meshes.new('corpo')
    me.from_pydata([J[n][0] for n in nomes], [(nomes.index(a), nomes.index(b)) for a, b in L], [])
    o = bpy.data.objects.new('corpo', me); SC.collection.objects.link(o)
    sk = o.modifiers.new('skin', 'SKIN'); sk.use_smooth_shade = True
    for i, n in enumerate(nomes):
        d = me.skin_vertices[0].data[i]; d.radius = (J[n][1], J[n][2]); d.use_root = (n == 'pelve')
    sub = o.modifiers.new('sub', 'SUBSURF'); sub.levels = 2; sub.render_levels = 2
    me.materials.append(farda)
    # cabeça, mãos e botas
    cab = esfera(0.1, P(0, 0.035, 1.665), pele, esc=(0.85, 0.95, 1.08))
    esfera(0.022, P(0, 0.127, 1.655), pele, esc=(0.7, 1.0, 1.1))                              # nariz
    for (n, ang) in (('pulsoE', 0.0), ('pulsoD', 0.0)):
        p = J[n][0]
        esfera(0.034, p + Vector((0, 0.03, -0.01)), luva, esc=(0.85, 1.25, 1.0))
    for lado, tz in (('tornE', 0.02), ('tornD', -0.08)):
        p = J[lado][0]
        caixa((0.11, 0.27, 0.1), (p.x, p.y + 0.06, 0.055), bota, 0.02)
        cilindro(0.058, 0.055, 0.14, (p.x, p.y + 0.0, 0.15), bota, Matrix.Rotation(math.pi / 2, 3, 'X'), 16)   # cano da bota
        caixa((0.115, 0.28, 0.025), (p.x, p.y + 0.06, 0.012), material('sola', (0.03, 0.03, 0.03), sujeira=0), 0.006)
    return J, cab


# ---------------- equipamento ----------------
def colete(J, cor, bolsa, x0, carregadores=3):
    pe = J['peito'][0]
    caixa((0.36, 0.06, 0.34), (pe.x, pe.y + 0.13, pe.z - 0.04), cor, 0.02)        # placa da frente
    caixa((0.36, 0.06, 0.36), (pe.x, pe.y - 0.13, pe.z - 0.03), cor, 0.02)        # placa de trás
    for sx in (-1, 1):
        caixa((0.05, 0.22, 0.24), (pe.x + sx * 0.19, pe.y, pe.z - 0.08), cor, 0.015)   # laterais
        caixa((0.07, 0.24, 0.035), (pe.x + sx * 0.11, pe.y, pe.z + 0.15), cor, 0.01)   # alças
    for i in range(carregadores):
        xx = pe.x + (i - (carregadores - 1) / 2) * 0.1
        caixa((0.085, 0.05, 0.15), (xx, pe.y + 0.18, pe.z - 0.12), bolsa, 0.012)
        caixa((0.087, 0.055, 0.035), (xx, pe.y + 0.185, pe.z - 0.04), bolsa, 0.01)   # aba
    caixa((0.16, 0.04, 0.11), (pe.x, pe.y + 0.17, pe.z + 0.06), bolsa, 0.012)       # bolsa administrativa
    # cinto com bolsas
    pv = J['pelve'][0]
    caixa((0.34, 0.25, 0.06), (pv.x, pv.y, pv.z + 0.06), material('cinto', (0.08, 0.08, 0.07), 0.8, sujeira=0.2), 0.015)
    for sx in (-1, 1): caixa((0.07, 0.08, 0.13), (pv.x + sx * 0.17, pv.y + 0.05, pv.z), bolsa, 0.012)


def joelheiras(J, cor):
    for n in ('joelhoE', 'joelhoD'):
        p = J[n][0]
        esfera(0.06, p + Vector((0, 0.05, 0)), cor, esc=(1.0, 0.6, 1.25))


def capacete(cab, estilo, cor, acessorio):
    c = cab.location if False else None
    p = Vector(cab.data.vertices[0].co) * 0 + Vector((0, 0, 0))
    # centro da cabeça (a esfera foi criada já posicionada: pega a média dos vértices)
    vs = [v.co for v in cab.data.vertices]
    cen = sum(vs, Vector()) / len(vs)
    if estilo == 'eua':
        esfera(0.125, cen + Vector((0, -0.005, 0.0)), cor, esc=(0.93, 1.02, 0.95), corte=-0.05)
        caixa((0.05, 0.02, 0.05), cen + Vector((0, 0.13, 0.07)), acessorio, 0.005)            # suporte de visão noturna
        for sx in (-1, 1):
            caixa((0.012, 0.11, 0.02), cen + Vector((sx * 0.112, 0.0, 0.03)), acessorio, 0.003)   # trilhos
            cilindro(0.045, 0.045, 0.035, cen + Vector((sx * 0.105, -0.005, -0.02)), acessorio, Matrix.Rotation(math.pi / 2, 3, 'Z'), 16)   # fones
        caixa((0.17, 0.02, 0.035), cen + Vector((0, 0.1, -0.005)), material('oculos', (0.02, 0.02, 0.02), 0.1, 0.6, sujeira=0), 0.008)   # óculos
    elif estilo == 'russia':
        esfera(0.13, cen + Vector((0, 0.0, 0.0)), cor, esc=(0.95, 1.0, 0.93), corte=-0.15)
        caixa((0.045, 0.02, 0.04), cen + Vector((0, 0.13, 0.06)), acessorio, 0.005)
        # balaclava (capuz de tecido no rosto)
        esfera(0.103, cen + Vector((0, 0.003, -0.012)), material('balaclava', (0.18, 0.2, 0.14), 0.95, sujeira=0.2), esc=(0.86, 0.95, 1.0))
        caixa((0.12, 0.012, 0.03), cen + Vector((0, 0.104, 0.0)), material('pele2', (0.62, 0.45, 0.33), 0.6, sujeira=0), 0.008)   # fresta dos olhos
    else:
        esfera(0.128, cen + Vector((0, 0.0, 0.0)), cor, esc=(0.95, 1.02, 0.95), corte=-0.1)
        caixa((0.04, 0.02, 0.04), cen + Vector((0, 0.13, 0.06)), acessorio, 0.005)
        caixa((0.16, 0.02, 0.03), cen + Vector((0, 0.1, -0.005)), material('oculos2', (0.05, 0.05, 0.04), 0.1, 0.5, sujeira=0), 0.008)


def mochila(J, cor):
    pe = J['peito'][0]
    caixa((0.28, 0.12, 0.34), (pe.x, pe.y - 0.22, pe.z - 0.05), cor, 0.03)
    caixa((0.24, 0.05, 0.14), (pe.x, pe.y - 0.29, pe.z - 0.12), cor, 0.02)


def fuzil(estilo, J, preto, extra):
    """fuzil na posição baixa (pronto): coronha no ombro direito, cano apontando para a frente e para baixo"""
    # mão direita na empunhadura (0,33 m da coronha, 8 cm abaixo do eixo) e esquerda no guarda-mão
    mD = J['pulsoD'][0] + Vector((0, 0.03, -0.01)); mE = J['pulsoE'][0] + Vector((0, 0.03, -0.01))
    d = (mE - mD).normalized()
    up = Vector((0, 0, 1)); up = (up - d * up.dot(d)).normalized()
    E = 0.85                                   # escala do fuzil (M4: ~84 cm)
    coronha = mD + up * 0.075 * E - d * 0.33 * E
    R = Vector((0, 1, 0)).rotation_difference(d).to_matrix()
    # corrige o giro em torno do eixo para a empunhadura ficar para baixo
    zl = R @ Vector((0, 0, 1)); ang = math.atan2(zl.cross(up).dot(d), zl.dot(up))
    R = Matrix.Rotation(ang, 3, d) @ R
    R = R @ Matrix.Diagonal((E, E, E))
    Rn = R @ Matrix.Diagonal((1 / E, 1 / E, 1 / E))
    def peca(dim, local, mat, bevel=0.004, giro=0.0):
        caixa(Vector(dim) * E, coronha + R @ Vector(local), mat, bevel, rot=Rn @ Matrix.Rotation(giro, 3, 'X'))
    def tubo(r, comp, local, mat):
        cilindro(r * E, r * E, comp * E, coronha + R @ Vector(local), mat, Rn, 12)
    if estilo == 'eua':
        # M4A1: coronha telescópica, receptor, guarda-mão com trilhos, carregador reto, mira holográfica e lanterna
        peca((0.045, 0.2, 0.08), (0, 0.06, -0.01), extra)
        tubo(0.016, 0.16, (0, 0.2, 0.0), preto)
        peca((0.05, 0.3, 0.075), (0, 0.4, 0.0), preto)
        peca((0.055, 0.3, 0.06), (0, 0.69, 0.005), preto)
        tubo(0.011, 0.24, (0, 0.95, 0.005), preto)
        tubo(0.016, 0.05, (0, 1.08, 0.005), preto)
        peca((0.032, 0.08, 0.15), (0, 0.46, -0.11), extra)                     # carregador
        peca((0.03, 0.05, 0.09), (0, 0.33, -0.08), preto)                      # empunhadura
        peca((0.04, 0.09, 0.055), (0, 0.42, 0.07), preto)                      # mira
        caixa((0.026, 0.005, 0.03), coronha + R @ Vector((0, 0.466, 0.075)), material('lente', (0.1, 0.25, 0.2), 0.05, 0.6, sujeira=0), 0.002, rot=Rn)
        tubo(0.014, 0.1, (0.035, 0.75, 0.0), preto)                            # lanterna
    elif estilo == 'russia':
        # AK-12: coronha rebatível, receptor alto, carregador curvo, trilho superior e freio de boca
        peca((0.04, 0.22, 0.09), (0, 0.06, -0.01), preto)
        peca((0.05, 0.36, 0.085), (0, 0.42, 0.0), preto)
        peca((0.055, 0.24, 0.07), (0, 0.72, -0.005), preto)
        tubo(0.011, 0.24, (0, 0.95, 0.0), preto)
        tubo(0.017, 0.07, (0, 1.09, 0.0), preto)
        for k in range(5):                                                      # carregador curvo (banana) em segmentos
            a = 0.16 * k
            peca((0.03, 0.07, 0.05), (0, 0.5 + 0.11 * math.sin(a) * 1.4 + 0.012 * k, -0.075 - 0.045 * k), extra, 0.003, giro=a)
        peca((0.03, 0.05, 0.09), (0, 0.32, -0.08), preto)
        peca((0.035, 0.3, 0.012), (0, 0.48, 0.05), preto)                       # trilho
        peca((0.04, 0.08, 0.05), (0, 0.44, 0.08), preto)                        # mira
    else:
        # QBZ-191: coronha ajustável, guarda-mão longo, carregador reto, mira óptica
        peca((0.045, 0.2, 0.08), (0, 0.06, -0.01), preto)
        peca((0.05, 0.3, 0.075), (0, 0.4, 0.0), preto)
        peca((0.058, 0.34, 0.065), (0, 0.72, 0.0), preto)
        tubo(0.011, 0.2, (0, 0.98, 0.0), preto)
        tubo(0.016, 0.05, (0, 1.1, 0.0), preto)
        peca((0.032, 0.08, 0.15), (0, 0.47, -0.11), preto)
        peca((0.03, 0.05, 0.09), (0, 0.33, -0.08), preto)
        tubo(0.022, 0.13, (0, 0.44, 0.075), preto)                              # luneta
        peca((0.03, 0.05, 0.04), (0, 0.44, 0.045), preto)


# ---------------- os três soldados ----------------
pele_c = material('pele', (0.72, 0.52, 0.4), 0.55, sujeira=0.15)
pele_a = material('pele_a', (0.7, 0.53, 0.38), 0.55, sujeira=0.15)
preto = material('arma', (0.035, 0.035, 0.035), 0.45, 0.4, sujeira=0.15)

# EUA: OCP (multicam), colete coyote, luvas e botas coyote
ocp = material('ocp', None, camo=[(0.47, 0.42, 0.31), (0.33, 0.33, 0.22), (0.26, 0.21, 0.14), (0.6, 0.55, 0.42), (0.18, 0.15, 0.1)], escala=7)
coyote = material('coyote', (0.4, 0.33, 0.23), 0.85)
coy2 = material('coyote2', (0.36, 0.3, 0.21), 0.85)
J, cab = corpo(-1.0, ocp, pele_c, coyote, coyote)
colete(J, coyote, coy2, -1.0, 3); joelheiras(J, coy2); mochila(J, coy2)
capacete(cab, 'eua', material('capacete_eua', (0.38, 0.33, 0.24), 0.8), preto)
fuzil('eua', J, preto, material('mag', (0.33, 0.28, 0.2), 0.8))

# Rússia: EMR "tsifra" (digital verde), colete Ratnik verde, balaclava
emr = material('emr', None, camo=[(0.33, 0.37, 0.25), (0.2, 0.24, 0.15), (0.45, 0.43, 0.32), (0.09, 0.1, 0.07)], escala=6, digital=True)
verde_ru = material('verde_ru', (0.17, 0.2, 0.12), 0.85)
verde_ru2 = material('verde_ru2', (0.14, 0.17, 0.1), 0.85)
J, cab = corpo(0.0, emr, pele_c, material('luva_ru', (0.08, 0.08, 0.07), 0.8), material('bota_ru', (0.06, 0.05, 0.04), 0.7))
colete(J, emr, verde_ru2, 0.0, 4); joelheiras(J, verde_ru)
capacete(cab, 'russia', emr, preto)
fuzil('russia', J, preto, material('mag_ru', (0.12, 0.1, 0.08), 0.6))

# China: Tipo 07 (digital de floresta), colete digital, mochila
t07 = material('t07', None, camo=[(0.36, 0.4, 0.27), (0.2, 0.26, 0.15), (0.46, 0.42, 0.29), (0.11, 0.13, 0.09)], escala=8, digital=True)
verde_cn = material('verde_cn', (0.22, 0.26, 0.16), 0.85)
J, cab = corpo(1.0, t07, pele_a, material('luva_cn', (0.2, 0.22, 0.14), 0.85), material('bota_cn', (0.07, 0.06, 0.05), 0.7))
colete(J, t07, verde_cn, 1.0, 3); joelheiras(J, verde_cn); mochila(J, t07)
capacete(cab, 'china', t07, preto)
fuzil('china', J, preto, preto)


# ---------------- cena e fotos ----------------
chao = material('chao', (0.16, 0.15, 0.13), 0.9, sujeira=0)
bpy.ops.mesh.primitive_plane_add(size=60); bpy.context.object.data.materials.append(chao)
SC.world = bpy.data.worlds.new('ceu'); SC.world.use_nodes = True
sky = SC.world.node_tree.nodes.new('ShaderNodeTexSky'); sky.sky_type = 'NISHITA'; sky.sun_elevation = math.radians(35); sky.sun_rotation = math.radians(200)
SC.world.node_tree.links.new(sky.outputs['Color'], SC.world.node_tree.nodes['Background'].inputs['Color'])
SC.world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.14
sol = bpy.data.objects.new('sol', bpy.data.lights.new('sol', 'SUN')); sol.data.energy = 2.6; sol.data.angle = math.radians(4)
sol.rotation_euler = (math.radians(50), 0, math.radians(200)); SC.collection.objects.link(sol)
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); SC.collection.objects.link(cam); SC.camera = cam
SC.render.engine = 'CYCLES'; SC.cycles.samples = 96; SC.cycles.use_denoising = True
SC.view_settings.view_transform = 'AgX'; SC.view_settings.look = 'AgX - Medium High Contrast'; SC.view_settings.exposure = -0.5


def foto(nome, alvo, pos, lente, w=1400, h=900):
    cam.data.lens = lente
    cam.location = pos; cam.rotation_euler = (Vector(alvo) - Vector(pos)).to_track_quat('-Z', 'Y').to_euler()
    SC.render.resolution_x = w; SC.render.resolution_y = h
    SC.render.filepath = os.path.join(OUT, nome + '.png'); bpy.ops.render.render(write_still=True)


foto('soldados', (0, 0.1, 0.95), (2.6, 4.6, 1.5), 45)
for i, n in enumerate(['eua', 'russia', 'china']):
    x = -1.0 + i
    foto('soldado_' + n, (x, 0.1, 1.0), (x + 1.3, 2.3, 1.45), 55, 900, 1100)
print('ok')
