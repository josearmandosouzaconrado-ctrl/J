"""Modelos 3D da Rússia e da China feitos no Blender só com código (prévia em imagem).
Uso (Blender como módulo: pip install bpy==4.2.0, Python 3.11):
  python -I modelos_leste.py -- <pasta_saida> [t90 type99 su57 j20]
Eixos do Blender: Z para cima, frente = +Y. Medidas em metros (escala real).
"""
import sys, os, math, random
import bpy, bmesh
from mathutils import Vector, Matrix

ARGS = sys.argv[sys.argv.index('--') + 1:]
OUT = ARGS[0]
QUAIS = ARGS[1:] or ['t90', 'type99', 'su57', 'j20']
os.makedirs(OUT, exist_ok=True)


def limpar():
    bpy.ops.wm.read_factory_settings(use_empty=True)


# ---------------- materiais ----------------
def material(nome, cor, rug=0.6, metal=0.0, camo=None, escala=1.2, sujeira=0.25, vidro=False):
    """camo: lista de cores (camuflagem digital/manchas); sujeira: cantos escurecidos (oclusão)"""
    m = bpy.data.materials.new(nome); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Roughness'].default_value = rug; b.inputs['Metallic'].default_value = metal
    if not vidro and metal < 0.3: b.inputs['Specular IOR Level'].default_value = 0.22   # tinta fosca
    if vidro:
        b.inputs['Base Color'].default_value = (*cor, 1)
        b.inputs['Roughness'].default_value = 0.05; b.inputs['Metallic'].default_value = 0.8
        return m
    co = nt.nodes.new('ShaderNodeTexCoord')
    if camo:
        # camuflagem: ruído "quantizado" (manchas de bordas retas = padrão digital)
        n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = escala; n.inputs['Detail'].default_value = 3
        nt.links.new(co.outputs['Object'], n.inputs['Vector'])
        if len(camo) > 3:
            # digital: arredonda a coordenada em pixels de ~8 cm antes do ruído
            snap = nt.nodes.new('ShaderNodeVectorMath'); snap.operation = 'SNAP'; snap.inputs[1].default_value = (0.09, 0.09, 0.09)
            nt.links.new(co.outputs['Object'], snap.inputs[0]); nt.links.new(snap.outputs[0], n.inputs['Vector'])
        r = nt.nodes.new('ShaderNodeValToRGB'); r.color_ramp.interpolation = 'CONSTANT'
        els = r.color_ramp.elements
        while len(els) < len(camo): els.new(0.5)
        for i, c in enumerate(camo):
            els[i].position = 0.0 if i == 0 else 0.35 + 0.3 * (i - 1) / max(1, len(camo) - 2)
            els[i].color = (*c, 1)
        nt.links.new(n.outputs['Fac'], r.inputs['Fac'])
        base = r.outputs['Color']
    else:
        rgb = nt.nodes.new('ShaderNodeRGB'); rgb.outputs[0].default_value = (*cor, 1)
        base = rgb.outputs[0]
    if sujeira:
        # sujeira nos cantos (oclusão de ambiente) + poeira leve nas partes baixas
        ao = nt.nodes.new('ShaderNodeAmbientOcclusion'); ao.inputs['Distance'].default_value = 0.35
        mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'
        nt.links.new(base, mx.inputs[6]); mx.inputs[7].default_value = (0.35, 0.33, 0.3, 1)
        inv = nt.nodes.new('ShaderNodeMath'); inv.operation = 'SUBTRACT'; inv.inputs[0].default_value = 1.0
        nt.links.new(ao.outputs['AO'], inv.inputs[1])
        k = nt.nodes.new('ShaderNodeMath'); k.operation = 'MULTIPLY'; k.inputs[1].default_value = sujeira * 2.2
        nt.links.new(inv.outputs[0], k.inputs[0]); nt.links.new(k.outputs[0], mx.inputs[0])
        base = mx.outputs[2]
        # variação de tinta (ruído fino) na rugosidade
        n2 = nt.nodes.new('ShaderNodeTexNoise'); n2.inputs['Scale'].default_value = 18
        mr = nt.nodes.new('ShaderNodeMapRange'); mr.inputs[3].default_value = rug * 0.8; mr.inputs[4].default_value = min(1, rug * 1.25)
        nt.links.new(n2.outputs['Fac'], mr.inputs[0]); nt.links.new(mr.outputs[0], b.inputs['Roughness'])
    nt.links.new(base, b.inputs['Base Color'])
    return m


def objeto(bm, mat, nome='p', bevel=0.0, suave=False, segs=2):
    me = bpy.data.meshes.new(nome); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(nome, me); bpy.context.scene.collection.objects.link(o)
    me.materials.append(mat)
    if bevel:
        m = o.modifiers.new('bevel', 'BEVEL'); m.width = bevel; m.segments = segs; m.limit_method = 'ANGLE'; m.angle_limit = math.radians(35)
        m.harden_normals = True
    if suave:
        for p in me.polygons: p.use_smooth = True
        o.modifiers.new('wn', 'WEIGHTED_NORMAL').keep_sharp = True
    return o


def caixa(dim, pos, mat, bevel=0.02, rot=(0, 0, 0)):
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=Vector(dim), verts=bm.verts)
    bmesh.ops.rotate(bm, cent=(0, 0, 0), matrix=Matrix.Rotation(rot[0], 3, 'X') @ Matrix.Rotation(rot[1], 3, 'Y') @ Matrix.Rotation(rot[2], 3, 'Z'), verts=bm.verts)
    bmesh.ops.translate(bm, vec=Vector(pos), verts=bm.verts)
    return objeto(bm, mat, bevel=bevel)


def cilindro(r1, r2, comp, pos, mat, eixo='Y', n=24, bevel=0.0):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=n, radius1=r1, radius2=r2, depth=comp)
    R = {'X': Matrix.Rotation(math.pi / 2, 3, 'Y'), 'Y': Matrix.Rotation(-math.pi / 2, 3, 'X'), 'Z': Matrix.Identity(3)}[eixo] if isinstance(eixo, str) else eixo
    bmesh.ops.rotate(bm, cent=(0, 0, 0), matrix=R, verts=bm.verts)
    bmesh.ops.translate(bm, vec=Vector(pos), verts=bm.verts)
    return objeto(bm, mat, bevel=bevel, suave=True)


def casco(pontos, mat, bevel=0.03):
    """sólido convexo a partir de pontos (blindagem angulosa)"""
    bm = bmesh.new()
    for p in pontos: bm.verts.new(p)
    bmesh.ops.convex_hull(bm, input=bm.verts)
    return objeto(bm, mat, bevel=bevel)


def loft(secoes, mat, n=24, suave=True, bevel=0.0):
    """secoes: (y, w, hc, hb, cx, cz, e) — largura, altura acima/abaixo do centro, centro, expoente da superelipse"""
    bm = bmesh.new(); aneis = []
    for (y, w, hc, hb, cx, cz, e) in secoes:
        anel = []
        for i in range(n):
            a = 2 * math.pi * i / n
            c, s = math.cos(a), math.sin(a)
            x = cx + w / 2 * math.copysign(abs(c) ** (2 / e), c)
            z = cz + (hc if s >= 0 else hb) * math.copysign(abs(s) ** (2 / e), s)
            anel.append(bm.verts.new((x, y, z)))
        aneis.append(anel)
    for A, B in zip(aneis, aneis[1:]):
        for i in range(n):
            bm.faces.new((A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]))
    bm.faces.new(list(reversed(aneis[0]))); bm.faces.new(aneis[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return objeto(bm, mat, suave=suave, bevel=bevel)


def placa(contorno, esp, mat, z=0.0, rot=None, pos=(0, 0, 0), bevel=0.01):
    """chapa plana (asa, deriva, aleta): contorno em (x, y), espessura esp, depois girada e movida"""
    bm = bmesh.new()
    vs = [bm.verts.new((x, y, z - esp / 2)) for x, y in contorno]
    f = bm.faces.new(vs)
    r = bmesh.ops.extrude_face_region(bm, geom=[f])
    bmesh.ops.translate(bm, vec=(0, 0, esp), verts=[v for v in r['geom'] if isinstance(v, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if rot is not None: bmesh.ops.rotate(bm, cent=(0, 0, z), matrix=rot, verts=bm.verts)
    bmesh.ops.translate(bm, vec=Vector(pos), verts=bm.verts)
    return objeto(bm, mat, bevel=bevel)


def gaiola(dim, pos, mat, esp=0.025):
    """cesto/grade (caixa com modificador de arame)"""
    o = caixa(dim, pos, mat, bevel=0)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.subdivide(number_cuts=4); bpy.ops.object.mode_set(mode='OBJECT')
    w = o.modifiers.new('arame', 'WIREFRAME'); w.thickness = esp
    return o


def estrela(pos, r, mat, normal=(1, 0, 0), china=False, mat_amarelo=None):
    """estrela vermelha pintada (decal fino) virada para 'normal'"""
    bm = bmesh.new()
    vs = []
    for i in range(10):
        a = math.pi / 2 + i * math.pi / 5; q = r if i % 2 == 0 else r * 0.4
        vs.append(bm.verts.new((math.cos(a) * q, math.sin(a) * q, 0)))
    bm.faces.new(vs)
    rot = Vector((0, 0, 1)).rotation_difference(Vector(normal)).to_matrix()
    bmesh.ops.rotate(bm, cent=(0, 0, 0), matrix=rot, verts=bm.verts)
    bmesh.ops.translate(bm, vec=Vector(pos) + Vector(normal) * 0.004, verts=bm.verts)
    objeto(bm, mat)


# ---------------- esteiras ----------------
def hull2d(pts):
    pts = sorted(set(pts))
    def cross(o, a, b): return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lo, hi = [], []
    for p in pts:
        while len(lo) >= 2 and cross(lo[-2], lo[-1], p) <= 0: lo.pop()
        lo.append(p)
    for p in reversed(pts):
        while len(hi) >= 2 and cross(hi[-2], hi[-1], p) <= 0: hi.pop()
        hi.append(p)
    return lo[:-1] + hi[:-1]


def esteira(x, larg, rodas, m_lagarta, m_roda, m_aro):
    """rodas: lista (y, z, r). A lagarta é o contorno das rodas, com espessura e sapatas."""
    pts = []
    for (y, z, r) in rodas:
        for k in range(24):
            a = 2 * math.pi * k / 24
            pts.append((round(y + math.cos(a) * r, 4), round(z + math.sin(a) * r, 4)))
    cont = hull2d(pts)
    # reamostra o contorno com passo fixo (sapatas de ~16 cm)
    L = [math.dist(cont[i], cont[(i + 1) % len(cont)]) for i in range(len(cont))]
    tot = sum(L); nseg = int(tot / 0.16)
    amostras = []
    for k in range(nseg):
        s = k * tot / nseg; i = 0
        while s > L[i]: s -= L[i]; i += 1
        a, b = cont[i], cont[(i + 1) % len(cont)]; f = s / L[i]
        amostras.append((a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f))
    n = len(amostras)
    bm = bmesh.new()
    def anel(off, xx):
        out = []
        for i in range(n):
            p0, p1 = amostras[i - 1], amostras[(i + 1) % n]
            ty, tz = p1[0] - p0[0], p1[1] - p0[1]; l = math.hypot(ty, tz) or 1
            ny, nz = tz / l, -ty / l           # normal para fora (contorno anti-horário)
            extra = 0.035 if (i % 2 == 0 and off > 0) else 0.0   # sapatas salientes
            out.append(bm.verts.new((xx, amostras[i][0] + ny * (off + extra), amostras[i][1] + nz * (off + extra))))
        return out
    a0, a1 = anel(0.0, x - larg / 2), anel(0.0, x + larg / 2)
    b0, b1 = anel(0.09, x - larg / 2), anel(0.09, x + larg / 2)
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new((b0[i], b0[j], b1[j], b1[i]))     # face externa
        bm.faces.new((a0[j], a0[i], a1[i], a1[j]))     # face interna
        bm.faces.new((a0[i], a0[j], b0[j], b0[i]))     # lado
        bm.faces.new((a1[j], a1[i], b1[i], b1[j]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    objeto(bm, m_lagarta)
    for (y, z, r) in rodas:
        cilindro(r - 0.02, r - 0.02, larg * 0.82, (x, y, z), m_lagarta, 'X', 28, bevel=0.015)   # pneu de borracha
        cilindro(r - 0.09, r - 0.09, larg * 0.86, (x, y, z), m_roda, 'X', 28)
        cilindro(r * 0.55, r * 0.55, larg * 0.86, (x, y, z), m_aro, 'X', 20)
        cilindro(r * 0.18, r * 0.2, larg * 0.95, (x, y, z), m_aro, 'X', 10)


# ---------------- tanques ----------------
def tanque(estilo):
    russo = estilo == 't90'
    if russo:
        tinta = material('verde', (0.13, 0.15, 0.08), 0.65, camo=[(0.12, 0.14, 0.07), (0.09, 0.1, 0.05), (0.2, 0.18, 0.1)], escala=0.9)
    else:
        tinta = material('camo_cn', (0.2, 0.22, 0.13), 0.6, camo=[(0.2, 0.22, 0.12), (0.12, 0.15, 0.08), (0.3, 0.27, 0.16), (0.06, 0.07, 0.05)], escala=1.6)
    escuro = material('escuro', (0.03, 0.03, 0.03), 0.5, 0.3, sujeira=0.1)
    borracha = material('lagarta', (0.04, 0.035, 0.03), 0.85, 0.4, sujeira=0.3)
    aco = material('aco', (0.2, 0.2, 0.19), 0.4, 0.8, sujeira=0.2)
    vidro = material('vidro', (0.05, 0.12, 0.1), vidro=True)
    vermelho = material('estrela', (0.6, 0.03, 0.02), 0.6, sujeira=0)
    L = 6.9 if russo else 7.6
    # casco: corpo entre as lagartas, sobre as lagartas e glacis inclinado
    y0, y1 = -L / 2, L / 2
    casco([(sx * 1.12, y, z) for sx in (-1, 1) for (y, z) in [(y0 + 0.2, 0.45), (y0, 0.9), (y0, 1.55), (y1 - 1.25, 1.62), (y1, 0.95), (y1 - 0.25, 0.42)]], tinta, 0.04)
    for sx in (-1, 1):
        caixa((0.62, L - 0.2, 0.06), (sx * 1.45, 0, 1.12), tinta, 0.01)            # para-lamas
    # blindagem reativa no glacis (blocos em fileiras inclinadas)
    ang = math.atan2(1.62 - 0.95, 1.25)
    for fil in range(2):
        t = 0.28 + fil * 0.42
        for i in range(6 if russo else 5):
            caixa((0.46, 0.5, 0.12), (-1.25 + i * (0.5 if russo else 0.62), y1 - 1.25 + t * 1.25, 1.62 - t * 0.67 + 0.05), tinta, 0.015, rot=(-ang, 0, 0))
    # lagartas
    nr = 6
    for sx in (-1, 1):
        rodas = [(y0 + 0.95 + i * (L - 1.9) / (nr - 1), 0.4, 0.37) for i in range(nr)]
        rodas += [(y1 - 0.3, 0.6, 0.3), (y0 + 0.3, 0.66, 0.32)]
        esteira(sx * 1.45, 0.58, rodas, borracha, tinta, aco)
        # saia lateral com blindagem reativa e aba de borracha
        caixa((0.06, L - 0.5, 0.5), (sx * 1.78, 0.1, 0.88), tinta, 0.01)
        for i in range(8 if russo else 6):
            caixa((0.1, (L - 1.0) / (8 if russo else 6) - 0.04, 0.42), (sx * 1.84, y0 + 0.7 + (i + 0.5) * (L - 1.0) / (8 if russo else 6), 0.88), tinta, 0.012)
        if russo: estrela((sx * 1.9, -0.6, 0.9), 0.18, vermelho, (sx, 0, 0))
    # traseira
    if russo:
        for sx in (-0.55, 0.55):
            cilindro(0.3, 0.3, 1.5, (sx, y0 - 0.3, 1.25), tinta, 'X', 24, bevel=0.01)   # tambores de combustível
            for k in (-0.5, 0.5): cilindro(0.31, 0.31, 0.04, (sx + k, y0 - 0.3, 1.25), aco, 'X', 24)
    else:
        caixa((2.6, 0.4, 0.6), (0, y0 - 0.15, 1.2), tinta, 0.02)
    caixa((0.25, 0.06, 0.15), (0.95, y1 + 0.02, 1.0), vidro, 0.01); caixa((0.25, 0.06, 0.15), (-0.95, y1 + 0.02, 1.0), vidro, 0.01)
    for sx in (-1, 1):
        cilindro(0.025, 0.025, 1.6, (sx * 0.9, y0 + 1.6, 1.68), aco, 'Y', 8)            # cabos de reboque
    # ---- torre ----
    zt = 1.62
    if russo:
        casco([(sx * w, y, zt + z) for sx in (-1, 1) for (w, y, z) in [(1.0, -1.9, 0.0), (1.05, -1.9, 0.6), (1.32, -0.9, 0.0), (1.38, -0.7, 0.66), (1.3, 0.6, 0.0), (1.2, 0.8, 0.7), (0.55, 1.6, 0.05), (0.5, 1.5, 0.55)]], tinta, 0.05)
        # cunhas Relikt na frente da torre
        for sx in (-1, 1):
            casco([(sx * x, y, zt + z) for (x, y, z) in [(0.35, 0.9, 0.08), (0.35, 0.9, 0.62), (1.28, 0.7, 0.05), (1.22, 0.75, 0.65), (0.4, 2.0, 0.1), (0.4, 1.95, 0.55)]], tinta, 0.03)
        gaiola((2.4, 1.2, 0.75), (0, -2.45, zt + 0.42), aco, 0.02)                   # cesto traseiro
    else:
        # torre de laterais retas e frente em ponta de flecha (blindagem modular)
        casco([(sx * w, y, zt + z) for sx in (-1, 1) for (w, y, z) in [(1.25, -2.0, 0.0), (1.25, -2.0, 0.72), (1.45, 0.3, 0.0), (1.42, 0.3, 0.75), (0.45, 2.1, 0.05), (0.42, 2.0, 0.68)]], tinta, 0.04)
        for sx in (-1, 1):
            for k in range(3): caixa((0.08, 0.65, 0.55), (sx * (1.48 + k * 0.0), -1.5 + k * 0.68, zt + 0.38), tinta, 0.01)
        caixa((0.5, 0.55, 0.38), (-0.95, -0.2, zt + 0.95), escuro, 0.03)            # dissuasor a laser
        caixa((2.4, 0.9, 0.5), (0, -2.45, zt + 0.32), tinta, 0.03)
    # canhão 125 mm: camisa térmica em segmentos, extrator de fumos, mantelete
    yg = 1.5 if russo else 1.95
    caixa((0.8, 0.5, 0.55), (0, yg, zt + 0.38), tinta, 0.04)
    cilindro(0.15, 0.14, 1.8, (0, yg + 1.2, zt + 0.38), tinta, 'Y', 24)
    cilindro(0.19, 0.19, 0.75, (0, yg + 2.55, zt + 0.38), tinta, 'Y', 24, bevel=0.01)
    cilindro(0.13, 0.12, 2.6, (0, yg + 4.2, zt + 0.38), tinta, 'Y', 24)
    for k in range(4): cilindro(0.145, 0.145, 0.04, (0, yg + 0.5 + k * 0.85, zt + 0.38), aco, 'Y', 20)
    cilindro(0.1, 0.1, 0.25, (0, yg + 5.6, zt + 0.38), escuro, 'Y', 16)
    # cúpula, estação de armas com metralhadora, miras, antenas e lançadores de fumaça
    cilindro(0.36, 0.38, 0.22, (0.6, -0.4, zt + 0.82), tinta, 'Z', 20, bevel=0.01)
    caixa((0.45, 0.6, 0.3), (0.6, -0.35, zt + 1.08), tinta, 0.02)
    cilindro(0.03, 0.03, 1.1, (0.6, 0.35, zt + 1.12), aco, 'Y', 8)
    caixa((0.3, 0.2, 0.15), (0.6, 0.15, zt + 1.14), aco, 0.01)
    caixa((0.42, 0.45, 0.4), (-0.55, 0.45, zt + 0.92), tinta, 0.03)
    caixa((0.3, 0.05, 0.22), (-0.55, 0.69, zt + 0.95), vidro, 0.01)
    cilindro(0.012, 0.018, 2.6, (-0.95, -1.4, zt + 2.0), aco, 'Z', 6)
    cilindro(0.012, 0.018, 2.0, (0.9, -1.5, zt + 1.7), aco, 'Z', 6)
    for sx in (-1, 1):
        for k in range(4 if russo else 3):
            R = Matrix.Rotation(-0.5, 3, 'X') @ Matrix.Rotation(sx * 0.2 * (k - 1.5), 3, 'Z')
            cilindro(0.055, 0.055, 0.32, (sx * (1.15 + k * 0.08), 0.1 - k * 0.12, zt + 0.72), aco, R @ Matrix.Rotation(-math.pi / 2, 3, 'X'), 10)
    if not russo:
        for sx in (-1, 1): estrela((sx * 1.88, 0.5, 1.05), 0.2, vermelho, (sx, 0, 0))
    return 'tanque'


# ---------------- jatos ----------------
def jato(estilo):
    su = estilo == 'su57'
    if su:
        tinta = material('su57', (0.2, 0.25, 0.3), 0.85, 0.0, camo=[(0.17, 0.22, 0.28), (0.1, 0.13, 0.18), (0.3, 0.35, 0.4), (0.06, 0.08, 0.11)], escala=0.35, sujeira=0.15)
    else:
        tinta = material('j20', (0.055, 0.06, 0.068), 0.85, 0.0, sujeira=0.12)
    escuro = material('bocal', (0.05, 0.05, 0.05), 0.35, 0.8, sujeira=0.1)
    cabine = material('cabine', (0.55, 0.42, 0.12) if su else (0.6, 0.45, 0.15), vidro=True)
    vermelho = material('estrela', (0.6, 0.03, 0.02), 0.6, sujeira=0)
    amarelo = material('amarelo', (0.8, 0.6, 0.05), 0.6, sujeira=0)
    # fuselagem: seções do nariz à cauda (y, largura, altura de cima, de baixo, cx, cz, expoente)
    if su:
        corpo = [(-9.4, 1.3, 0.35, 0.3, 0, 1.6, 2.4), (-8.0, 2.6, 0.55, 0.5, 0, 1.6, 2.8), (-5.0, 4.0, 0.7, 0.55, 0, 1.62, 3.4), (-1.0, 4.4, 0.85, 0.65, 0, 1.65, 3.6),
                 (2.0, 3.0, 0.85, 0.7, 0, 1.7, 3.0), (4.5, 1.7, 0.75, 0.6, 0, 1.75, 2.6), (7.0, 1.1, 0.55, 0.45, 0, 1.75, 2.2), (9.0, 0.5, 0.25, 0.25, 0, 1.68, 2.0), (10.2, 0.05, 0.03, 0.03, 0, 1.62, 2.0)]
    else:
        corpo = [(-9.6, 1.1, 0.3, 0.3, 0, 1.7, 2.4), (-7.0, 1.9, 0.6, 0.55, 0, 1.7, 2.8), (-3.0, 2.2, 0.75, 0.6, 0, 1.72, 3.0), (1.5, 2.3, 0.8, 0.65, 0, 1.75, 3.0),
                 (5.0, 1.6, 0.7, 0.6, 0, 1.78, 2.6), (7.5, 1.1, 0.5, 0.45, 0, 1.78, 2.2), (9.4, 0.5, 0.22, 0.22, 0, 1.72, 2.0), (10.5, 0.05, 0.03, 0.03, 0, 1.68, 2.0)]
    loft(corpo, tinta, 32)
    # nacele dos motores (afastados no Su-57, juntos no J-20) e bocais
    xm = 1.15 if su else 0.62
    for sx in (-1, 1):
        loft([(-10.0, 1.05, 0.5, 0.5, sx * xm, 1.45, 2.2), (-6.0, 1.25, 0.6, 0.6, sx * xm, 1.45, 2.4), (-1.0, 1.3, 0.62, 0.62, sx * xm * 0.95, 1.45, 2.6), (2.5, 1.2, 0.6, 0.55, sx * xm * 0.8, 1.5, 2.6),
              (4.5, 0.9, 0.45, 0.45, sx * xm * 0.65, 1.5, 2.4)], tinta, 24)
        cilindro(0.5, 0.42, 1.0, (sx * xm, -10.4, 1.45), escuro, 'Y', 24)
        cilindro(0.38, 0.38, 0.05, (sx * xm, -10.9, 1.45), material('fogo', (0.02, 0.02, 0.02), 0.9, sujeira=0), 'Y', 24)
        # entradas de ar
        caixa((0.95, 0.4, 0.75), (sx * (xm + 0.25), 4.2 if su else 3.4, 1.45), tinta, 0.08, rot=(0, 0, sx * -0.12))
        caixa((0.8, 0.05, 0.6), (sx * (xm + 0.25), 4.42 if su else 3.62, 1.45), escuro, 0.02, rot=(0, 0, sx * -0.12))
    # cabine
    loft([(4.0, 0.2, 0.08, 0.02, 0, 2.3, 2.0), (5.0, 0.95, 0.5, 0.02, 0, 2.3, 2.2), (6.6, 0.9, 0.42, 0.02, 0, 2.25, 2.2), (7.6, 0.4, 0.15, 0.02, 0, 2.2, 2.0)], cabine, 24)
    if su:
        # asa em diamante com LEVCON, derivas inclinadas totalmente móveis, estabilizadores
        for sx in (-1, 1):
            placa([(sx * 1.8, 4.0), (sx * 7.1, -3.6), (sx * 7.1, -4.6), (sx * 1.8, -5.0)], 0.12, tinta, z=1.65)
            placa([(sx * 1.6, 6.8), (sx * 2.6, 4.2), (sx * 1.9, 3.8)], 0.08, tinta, z=1.7)                 # LEVCON
            placa([(sx * 1.5, -6.0), (sx * 5.0, -8.6), (sx * 5.0, -9.6), (sx * 1.5, -9.4)], 0.08, tinta, z=1.62)
            placa([(0, 0), (0, 2.6), (2.6, 0.8), (2.6, -0.3)], 0.08, tinta, rot=Matrix.Rotation(-math.pi / 2, 3, 'Y') @ Matrix.Rotation(sx * 0.45, 3, 'Y'), pos=(sx * 1.4, -9.2, 2.1))
            estrela((sx * 4.6, -2.6, 1.72), 0.45, vermelho, (0, 0, 1))
            estrela((sx * 2.2, -8.4, 3.4), 0.3, vermelho, (sx * 0.9, 0, 0.4))
    else:
        # asa delta, canards, derivas inclinadas e aletas ventrais
        for sx in (-1, 1):
            placa([(sx * 1.0, 1.2), (sx * 6.5, -6.0), (sx * 6.5, -6.8), (sx * 1.0, -7.4)], 0.12, tinta, z=1.68)
            placa([(sx * 1.0, 5.4), (sx * 3.4, 3.6), (sx * 3.4, 3.0), (sx * 1.0, 3.6)], 0.08, tinta, z=1.9)                 # canards
            placa([(0, 0), (0, 2.4), (2.4, 0.6), (2.4, -0.4)], 0.08, tinta, rot=Matrix.Rotation(-math.pi / 2, 3, 'Y') @ Matrix.Rotation(sx * 0.35, 3, 'Y'), pos=(sx * 1.0, -9.0, 2.2))
            placa([(0, 0), (0, 1.6), (0.9, 0.5), (0.9, 0.0)], 0.06, tinta, rot=Matrix.Rotation(math.pi / 2, 3, 'Y') @ Matrix.Rotation(sx * -0.4, 3, 'Y'), pos=(sx * 0.9, -8.6, 1.1))
            estrela((sx * 4.5, -4.0, 1.75), 0.45, vermelho, (0, 0, 1))
            cilindro(0.12, 0.12, 0.012, (sx * 4.5, -4.0, 1.745), amarelo, 'Z', 12)
            estrela((sx * 1.85, -8.3, 3.3), 0.3, vermelho, (sx * 0.9, 0, 0.4))
    # trem de pouso
    trem = material('trem', (0.55, 0.56, 0.55), 0.4, 0.5, sujeira=0.2)
    pneu = material('pneu', (0.03, 0.03, 0.03), 0.9, sujeira=0)
    for (x, y, h, r) in [(0, 7.0, 1.0, 0.3), (-1.6, -2.0, 1.0, 0.42), (1.6, -2.0, 1.0, 0.42)]:
        cilindro(0.06, 0.06, h, (x, y, 0.4 + h / 2), trem, 'Z', 10)
        cilindro(r, r, 0.25, (x, y, r), pneu, 'X', 24, bevel=0.03)
    return 'jato'


# ---------------- cena e foto ----------------
def fotografar(nome, tipo):
    sc = bpy.context.scene
    chao_m = material('chao', (0.13, 0.125, 0.115), 0.9, sujeira=0)
    bpy.ops.mesh.primitive_plane_add(size=200, location=(0, 0, 0)); bpy.context.object.data.materials.append(chao_m)
    sc.world = bpy.data.worlds.new('ceu'); sc.world.use_nodes = True
    sky = sc.world.node_tree.nodes.new('ShaderNodeTexSky'); sky.sky_type = 'NISHITA'; sky.sun_elevation = math.radians(32); sky.sun_rotation = math.radians(215)
    sc.world.node_tree.links.new(sky.outputs['Color'], sc.world.node_tree.nodes['Background'].inputs['Color'])
    sc.world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.12
    sol = bpy.data.objects.new('sol', bpy.data.lights.new('sol', 'SUN')); sol.data.energy = 2.4; sol.data.angle = math.radians(3)
    sol.rotation_euler = (math.radians(55), 0, math.radians(215)); sc.collection.objects.link(sol)
    cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
    cam.data.lens = 50
    if tipo == 'tanque':
        alvo, pos = Vector((0, 0.8, 1.3)), Vector((10.5, 11.0, 5.5))
    else:
        alvo, pos = Vector((0, -0.5, 1.6)), Vector((17.0, 17.0, 10.0))
    cam.location = pos; cam.rotation_euler = (alvo - pos).to_track_quat('-Z', 'Y').to_euler()
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 96; sc.cycles.use_denoising = True; sc.cycles.device = 'CPU'
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'; sc.view_settings.exposure = -0.7
    sc.render.resolution_x = 1280; sc.render.resolution_y = 800
    sc.render.filepath = os.path.join(OUT, nome + '.png')
    bpy.ops.render.render(write_still=True)


for nome in QUAIS:
    limpar()
    random.seed(1)
    tipo = tanque(nome) if nome in ('t90', 'type99') else jato(nome)
    fotografar(nome, tipo)
    print('ok', nome)
