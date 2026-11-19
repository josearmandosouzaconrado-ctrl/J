# Prévia (não aplicada no jogo) de bichos do oceano modelados no Blender: golfinho, tubarão, orca,
# baleia-jubarte, tartaruga-marinha, arraia-manta, kraken e água-viva. Corpo feito por "anéis" ao longo
# do eixo (como um casco), com nadadeiras finas, pele com dorso escuro e barriga clara, levemente
# curvados como se estivessem nadando. Fotografados de cima e um pouco de frente (como a câmera do jogo),
# com fundo transparente; folha_oceanicos_previa.py monta as prévias em 3D e em pixel art.
# Uso: python oceanicos_previa.py -- <pasta>
import bpy, bmesh, math, sys, os
from mathutils import Vector
ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = ARGS[0] if ARGS else '/tmp/oceanicos'; os.makedirs(OUT, exist_ok=True)

def lin(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((v / 12.92) if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4) for v in c) + (1,)

def pele(nome, dorso, barriga, manchas=None, rough=0.45, transl=0.0, emis=None):
    """Dorso escuro e barriga clara (pela normal), um pouco de textura de pele e brilho molhado."""
    m = bpy.data.materials.new(nome); m.use_nodes = True; nt = m.node_tree; nd = nt.nodes; ln = nt.links
    b = nd['Principled BSDF']; b.inputs['Roughness'].default_value = rough; b.inputs['Specular IOR Level'].default_value = 0.6
    g = nd.new('ShaderNodeNewGeometry'); sp = nd.new('ShaderNodeSeparateXYZ'); ln.new(g.outputs['Normal'], sp.inputs[0])
    mr = nd.new('ShaderNodeMapRange'); mr.inputs['From Min'].default_value = -0.35; mr.inputs['From Max'].default_value = 0.15; ln.new(sp.outputs['Z'], mr.inputs['Value'])
    mx = nd.new('ShaderNodeMix'); mx.data_type = 'RGBA'; ln.new(mr.outputs['Result'], mx.inputs['Factor']); mx.inputs['A'].default_value = lin(barriga); mx.inputs['B'].default_value = lin(dorso)
    cor = mx.outputs['Result']
    co = nd.new('ShaderNodeTexCoord')
    nz = nd.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 14; nz.inputs['Detail'].default_value = 6; ln.new(co.outputs['Object'], nz.inputs['Vector'])
    mm = nd.new('ShaderNodeMix'); mm.data_type = 'RGBA'; mm.blend_type = 'MULTIPLY'; mm.inputs['Factor'].default_value = 0.18; ln.new(cor, mm.inputs['A'])
    rr = nd.new('ShaderNodeValToRGB'); ln.new(nz.outputs['Fac'], rr.inputs[0]); rr.color_ramp.elements[0].color = (0.7, 0.7, 0.7, 1); ln.new(rr.outputs['Color'], mm.inputs['B']); cor = mm.outputs['Result']
    if manchas:   # manchas claras (orca, tartaruga, manta) por um padrão de voronoi
        vo = nd.new('ShaderNodeTexVoronoi'); vo.inputs['Scale'].default_value = manchas[1]; ln.new(co.outputs['Object'], vo.inputs['Vector'])
        if len(manchas) > 3: vo.feature = 'DISTANCE_TO_EDGE'
        r2 = nd.new('ShaderNodeValToRGB'); ln.new(vo.outputs['Distance'], r2.inputs[0]); e = r2.color_ramp.elements; e[0].position = manchas[2]; e[0].color = (1, 1, 1, 1); e[1].position = manchas[2] + 0.04; e[1].color = (0, 0, 0, 1)
        m3 = nd.new('ShaderNodeMix'); m3.data_type = 'RGBA'; ln.new(r2.outputs['Color'], m3.inputs['Factor']); ln.new(cor, m3.inputs['A']); m3.inputs['B'].default_value = lin(manchas[0]); cor = m3.outputs['Result']
    ln.new(cor, b.inputs['Base Color'])
    bu = nd.new('ShaderNodeBump'); bu.inputs['Strength'].default_value = 0.25; ln.new(nz.outputs['Fac'], bu.inputs['Height']); ln.new(bu.outputs['Normal'], b.inputs['Normal'])
    if emis: b.inputs['Emission Color'].default_value = lin(emis); b.inputs['Emission Strength'].default_value = 0.6
    return m

def objeto(nome, bm, mat, sub=2, suave=True):
    me = bpy.data.meshes.new(nome); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(nome, me); bpy.context.collection.objects.link(o)
    o.data.materials.append(mat)
    if suave:
        for p in me.polygons: p.use_smooth = True
    if sub: md = o.modifiers.new('s', 'SUBSURF'); md.levels = sub; md.render_levels = sub
    return o

def corpo(nome, secs, mat, curva=0.0, N=16, gordo=1.0):
    """secs: (x, largura, altura, z) da cauda para a cabeça; curva: ondulação lateral de quem nada."""
    bm = bmesh.new(); aneis = []
    x0, x1 = secs[0][0], secs[-1][0]
    for (x, w, h, z) in secs:
        w *= gordo; h *= gordo
        t = (x - x0) / (x1 - x0); y0 = curva * math.sin((1 - t) * math.pi * 1.2) * (1 - t)
        aneis.append([bm.verts.new((x, y0 + math.cos(a) * w / 2, z + math.sin(a) * h / 2)) for a in [k / N * math.tau for k in range(N)]])
    for i in range(len(aneis) - 1):
        for k in range(N): bm.faces.new((aneis[i][k], aneis[i][(k + 1) % N], aneis[i + 1][(k + 1) % N], aneis[i + 1][k]))
    for ring, rev in ((aneis[0], True), (aneis[-1], False)):
        c = bm.verts.new(sum((v.co for v in ring), Vector()) / N)
        for k in range(N): bm.faces.new((ring[k], ring[(k + 1) % N], c) if rev else (ring[(k + 1) % N], ring[k], c))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return objeto(nome, bm, mat)

def nadadeira(nome, pts, mat, plano='xy', esp=0.03, origem=(0, 0, 0), rot=(0, 0, 0)):
    """Nadadeira fina a partir de um contorno 2D (com espessura)."""
    bm = bmesh.new()
    vs = []
    for (u, v) in pts:
        p = (u, v, 0) if plano == 'xy' else (u, 0, v) if plano == 'xz' else (0, u, v)
        vs.append(bm.verts.new(p))
    f = bm.faces.new(vs)
    r = bmesh.ops.extrude_face_region(bm, geom=[f]); n = Vector((0, 0, 1)) if plano == 'xy' else Vector((0, 1, 0)) if plano == 'xz' else Vector((1, 0, 0))
    bmesh.ops.translate(bm, vec=n * esp, verts=[e for e in r['geom'] if isinstance(e, bmesh.types.BMVert)])
    bmesh.ops.translate(bm, vec=-n * esp / 2, verts=bm.verts)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    o = objeto(nome, bm, mat, sub=1)
    o.location = origem; o.rotation_euler = rot
    return o

def olho(x, y, z, r=0.03):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=(x, y, z)); o = bpy.context.object
    m = bpy.data.materials.get('olho') or pele('olho', '#0a0808', '#0a0808', rough=0.1); o.data.materials.append(m); bpy.ops.object.shade_smooth(); return o

def tentaculo(nome, p0, dirs, comp, r0, mat, enrola=0.0, seg=24):
    """Tentáculo: uma curva com espessura que afina, enrolando na ponta."""
    cu = bpy.data.curves.new(nome, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = r0; cu.bevel_resolution = 3
    sp = cu.splines.new('POLY'); sp.points.add(seg - 1)
    x, y, z = p0; a = dirs
    for i in range(seg):
        t = i / (seg - 1)
        sp.points[i].co = (x, y, z, 1); sp.points[i].radius = max(0.08, 1 - t)
        a += enrola * t * 0.35 + math.sin(t * 6 + p0[1] * 3) * 0.08
        x += math.cos(a) * comp / seg; y += math.sin(a) * comp / seg; z = p0[2] - 0.25 * math.sin(t * math.pi) * 0.3
    o = bpy.data.objects.new(nome, cu); bpy.context.collection.objects.link(o); o.data.materials.append(mat); return o

# ------------------------------------------------------------------ os bichos
def golfinho():
    m = pele('golfinho', '#4a6a8e', '#e4eaf0')
    corpo('c', [(-1.15, .05, .05, 0), (-0.95, .1, .09, 0), (-0.6, .22, .2, .01), (-0.1, .32, .3, .02), (0.4, .3, .28, .02), (0.78, .2, .2, .03), (0.92, .1, .1, .0), (1.12, .06, .05, -.02), (1.2, .02, .02, -.02)], m, curva=0.12, gordo=1.55)
    nadadeira('dorsal', [(-0.25, 0), (0.15, 0), (-0.05, 0.12), (-0.25, 0.22), (-0.3, 0.2)], m, 'xz', 0.03, (0, 0, 0.14))
    for s in (-1, 1): nadadeira('peit', [(0.02, -0.1 * s), (0.16, -0.1 * s), (-0.12, 0.3 * s), (-0.2, 0.28 * s)], m, 'xy', 0.03, (0.42, 0.14 * s, -0.08), (0.25 * s, 0, 0))
    nadadeira('cauda', [(0, 0), (-0.12, 0.3), (-0.26, 0.32), (-0.14, 0), (-0.26, -0.32), (-0.12, -0.3)], m, 'xy', 0.025, (-1.1, 0.0, 0))
    for s in (-1, 1): olho(0.88, 0.075 * s, 0.03, 0.018)
    return 2.6
def tubarao():
    m = pele('tubarao', '#5a6a72', '#e8eaea')
    corpo('c', [(-1.5, .06, .1, .02), (-1.2, .12, .16, 0), (-0.7, .28, .3, 0), (0, .42, .42, 0), (0.7, .34, .32, -.01), (1.1, .2, .18, -.03), (1.25, .14, .1, -.04)], m, curva=0.12, gordo=1.4)
    # a cabeça em forma de martelo, com um olho em cada ponta
    nadadeira('martelo', [(1.12, -0.5), (1.32, -0.48), (1.42, -0.2), (1.44, 0), (1.42, 0.2), (1.32, 0.48), (1.12, 0.5), (1.18, 0.1), (1.18, -0.1)], m, 'xy', 0.09, (0, 0, -0.03))
    for s in (-1, 1): olho(1.24, 0.5 * s, -0.02, 0.03)
    nadadeira('dorsal', [(-0.3, 0), (0.25, 0), (-0.15, 0.5), (-0.28, 0.46)], m, 'xz', 0.05, (0.05, 0, 0.24))
    for s in (-1, 1): nadadeira('peit', [(0.02, -0.15 * s), (0.26, -0.15 * s), (-0.32, 0.62 * s), (-0.42, 0.56 * s)], m, 'xy', 0.035, (0.35, 0.22 * s, -0.12), (0.15 * s, 0, 0))
    nadadeira('cauda', [(0, 0), (-0.25, 0.55), (-0.38, 0.55), (-0.18, 0.02), (-0.3, -0.3), (-0.2, -0.32)], m, 'xz', 0.04, (-1.45, 0, 0.02))
    return 3.3
def orca():
    m = pele('orca', '#101216', '#f0f0ee', manchas=('#f4f4f2', 2.2, 0.0))
    corpo('c', [(-2.3, .08, .08, 0), (-1.9, .2, .18, 0), (-1.0, .62, .55, .02), (0, .85, .78, .03), (1.0, .72, .66, .02), (1.75, .42, .4, 0), (2.15, .12, .1, -.02)], m, curva=0.18, gordo=1.4)
    br = pele('orca_branco', '#f4f4f2', '#f4f4f2')
    for s in (-1, 1):
        bpy.ops.mesh.primitive_uv_sphere_add(radius=1, location=(1.45, 0.4 * s, 0.2)); o = bpy.context.object; o.scale = (0.34, 0.12, 0.1); o.rotation_euler = (0, 0, -0.25 * s); o.data.materials.append(br); bpy.ops.object.shade_smooth()   # mancha do olho
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1, location=(-0.6, 0, 0.5)); o = bpy.context.object; o.scale = (0.32, 0.26, 0.08); o.data.materials.append(pele('sela', '#6a6e76', '#6a6e76')); bpy.ops.object.shade_smooth()   # sela cinza
    nadadeira('dorsal', [(-0.25, 0), (0.25, 0), (0.05, 0.6), (-0.05, 0.95), (-0.12, 0.9)], m, 'xz', 0.06, (-0.1, 0, 0.32))
    for s in (-1, 1): nadadeira('peit', [(0.02, -0.2 * s), (0.34, -0.2 * s), (0.05, 0.7 * s), (-0.22, 0.62 * s)], m, 'xy', 0.06, (0.75, 0.42 * s, -0.22), (0.3 * s, 0, 0))
    nadadeira('cauda', [(0, 0), (-0.25, 0.6), (-0.5, 0.65), (-0.3, 0), (-0.5, -0.65), (-0.25, -0.6)], m, 'xy', 0.05, (-2.2, 0, 0))
    return 5.2
def baleia():
    m = pele('baleia', '#3a4452', '#c8ccd0')
    corpo('c', [(-5.2, .2, .15, 0), (-4.4, .6, .5, 0), (-2.5, 1.7, 1.5, .05), (0, 2.6, 2.2, .1), (2.2, 2.4, 2.0, .05), (3.8, 1.7, 1.3, -.05), (4.7, .8, .6, -.1), (5.0, .2, .15, -.12)], m, curva=0.35, gordo=1.2)
    br = pele('baleia_br', '#c8ccd0', '#e8ecee')
    for s in (-1, 1): nadadeira('peit', [(0.1, -0.6 * s), (0.7, -0.6 * s), (0.2, 2.2 * s), (-0.1, 3.4 * s), (-0.5, 3.3 * s), (-0.3, 2.0 * s)], br, 'xy', 0.14, (1.6, 1.3 * s, -0.5), (0.25 * s, 0, 0))
    nadadeira('cauda', [(0, 0), (-0.5, 1.4), (-1.1, 1.8), (-0.8, 0.3), (-0.95, 0), (-0.8, -0.3), (-1.1, -1.8), (-0.5, -1.4)], m, 'xy', 0.1, (-5.0, 0, 0))
    nadadeira('dorsal', [(-0.3, 0), (0.3, 0), (0, 0.25)], m, 'xz', 0.08, (-2.0, 0, 0.75))
    # calombos na cabeça e cracas
    for i in range(14):
        a = i * 2.4; bpy.ops.mesh.primitive_uv_sphere_add(radius=0.12, location=(3.4 + (i % 4) * 0.35, math.sin(a) * 0.5, 0.6 + (i % 3) * 0.05)); o = bpy.context.object; o.data.materials.append(m); bpy.ops.object.shade_smooth()
    return 11.0
def tartaruga():
    casco = pele('casco', '#6a5226', '#d8c890', manchas=('#2a2010', 3.2, 0.035, 'borda'), rough=0.3)
    pelem = pele('tartaruga_pele', '#6a7a4a', '#d8d0a8', manchas=('#c8c090', 18, 0.05))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1, segments=32, ring_count=16, location=(0, 0, 0)); c = bpy.context.object; c.scale = (0.62, 0.5, 0.2); c.data.materials.append(casco); bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1, location=(0.72, 0, 0.0)); h = bpy.context.object; h.scale = (0.18, 0.13, 0.1); h.data.materials.append(pelem); bpy.ops.object.shade_smooth()
    for s in (-1, 1):
        nadadeira('frente', [(0, 0), (0.12, 0), (-0.2, 0.62 * s), (-0.34, 0.6 * s)], pelem, 'xy', 0.04, (0.32, 0.36 * s, -0.04), (0.2 * s, 0, 0))
        nadadeira('tras', [(0, 0), (-0.05, 0), (-0.25, 0.22 * s), (-0.32, 0.18 * s)], pelem, 'xy', 0.04, (-0.45, 0.22 * s, -0.04))
        olho(0.86, 0.07 * s, 0.03, 0.02)
    return 1.9
def manta():
    m = pele('manta', '#1a1e26', '#eceae4', manchas=('#d8d8d4', 3.2, 0.03))
    pts = [(0.7, 0), (0.45, 0.25), (0.15, 0.9), (-0.05, 1.7), (-0.25, 1.65), (-0.5, 0.6), (-0.75, 0.15), (-0.8, 0)]
    contorno = pts + [(x, -y) for (x, y) in reversed(pts[1:-1])]
    o = nadadeira('asas', contorno, m, 'xy', 0.16)
    o.modifiers.new('ondula', 'SIMPLE_DEFORM').deform_method = 'BEND'; o.modifiers['ondula'].angle = 0.6; o.modifiers['ondula'].deform_axis = 'X'
    for s in (-1, 1): nadadeira('chifre', [(0, 0), (0.28, 0.02 * s), (0.3, 0.1 * s), (0.02, 0.1 * s)], m, 'xy', 0.05, (0.62, 0.18 * s, 0.02))
    tentaculo('cauda', (-0.75, 0, 0), math.pi, 1.4, 0.025, m)
    for s in (-1, 1): olho(0.58, 0.28 * s, 0.05, 0.03)
    return 3.6
def kraken():
    m = pele('kraken', '#6a1e3a', '#e09aa0', manchas=('#e8b0b8', 9, 0.04), rough=0.3)
    corpo('manto', [(-2.4, .1, .1, .25), (-2.0, 1.0, 0.9, .3), (-1.2, 1.5, 1.3, .3), (-0.4, 1.4, 1.2, .25), (0.1, 1.0, 0.9, .1), (0.35, .6, .5, 0)], m, curva=0.0)
    for s in (-1, 1):
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.2, location=(0.0, 0.48 * s, 0.25)); o = bpy.context.object; o.data.materials.append(pele('olhok', '#f0c020', '#f0c020', rough=0.1)); bpy.ops.object.shade_smooth()
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.1, location=(0.1, 0.52 * s, 0.32)); o = bpy.context.object; o.scale = (0.4, 1, 1); o.data.materials.append(bpy.data.materials.get('olho') or pele('olho', '#0a0808', '#0a0808')); bpy.ops.object.shade_smooth()
    for i in range(8):
        a = -1.4 + i / 7 * 2.8
        tentaculo('t%d' % i, (0.35, math.sin(a) * 0.35, -0.05), a, 3.2 + (i % 3) * 0.5, 0.2, m, enrola=(1 if i % 2 else -1) * 1.6)
    return 7.0
def aguaviva():
    m = bpy.data.materials.new('aguaviva'); m.use_nodes = True; bs = m.node_tree.nodes['Principled BSDF']
    bs.inputs['Base Color'].default_value = lin('#f4c8ec'); bs.inputs['Alpha'].default_value = 0.45; bs.inputs['Roughness'].default_value = 0.08
    bs.inputs['Emission Color'].default_value = lin('#d070c0'); bs.inputs['Emission Strength'].default_value = 0.35
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1, segments=40, ring_count=20); b = bpy.context.object; b.scale = (0.5, 0.5, 0.18); b.data.materials.append(m); bpy.ops.object.shade_smooth()
    gon = pele('gonada', '#c050b0', '#c050b0', rough=0.2, emis='#f070e0')
    for i in range(4):
        a = i / 4 * math.tau + 0.4
        bpy.ops.mesh.primitive_torus_add(major_radius=0.11, minor_radius=0.025, location=(math.cos(a) * 0.17, math.sin(a) * 0.17, 0.02)); o = bpy.context.object; o.scale = (1, 0.7, 0.6); o.rotation_euler.z = a; o.data.materials.append(gon); bpy.ops.object.shade_smooth()
    fio = pele('fio', '#f0d0f0', '#f0d0f0', rough=0.1, emis='#f0a0f0')
    for i in range(16):
        a = i / 16 * math.tau
        tentaculo('t%d' % i, (math.cos(a) * 0.46, math.sin(a) * 0.46, -0.02), a + 0.4, 0.7 + (i % 3) * 0.2, 0.008, fio, enrola=0.4)
    for i in range(4):
        a = i / 4 * math.tau + 0.8
        tentaculo('b%d' % i, (math.cos(a) * 0.05, math.sin(a) * 0.05, -0.05), a, 0.6, 0.035, gon, enrola=1.2)   # braços orais
    return 1.8

BICHOS = [('golfinho', golfinho), ('tubarao', tubarao), ('orca', orca), ('baleia', baleia), ('tartaruga', tartaruga), ('manta', manta), ('kraken', kraken), ('aguaviva', aguaviva)]
SO = ARGS[1:]
for nome, fn in BICHOS:
    if SO and nome not in SO: continue
    bpy.ops.wm.read_factory_settings(use_empty=True)
    S = bpy.context.scene; S.render.engine = 'CYCLES'; S.cycles.device = 'CPU'; S.cycles.samples = 32; S.render.film_transparent = True
    S.render.resolution_x = 640; S.render.resolution_y = 640; S.view_settings.view_transform = 'Standard'
    W = bpy.data.worlds.new('w'); S.world = W; W.use_nodes = True; bg = W.node_tree.nodes['Background']; bg.inputs['Color'].default_value = (0.55, 0.7, 0.9, 1); bg.inputs['Strength'].default_value = 0.9
    tam = fn()
    # nadando na diagonal, como se cruzasse a tela
    raiz = bpy.data.objects.new('raiz', None); bpy.context.collection.objects.link(raiz)
    for o in list(bpy.context.collection.objects):
        if o is not raiz and o.parent is None: o.parent = raiz
    raiz.rotation_euler.z = math.radians(25)
    bpy.ops.object.light_add(type='SUN'); s = bpy.context.object; s.rotation_euler = Vector((0.5, 0.7, -1.0)).normalized().to_track_quat('-Z', 'Y').to_euler(); s.data.energy = 3.2; s.data.angle = math.radians(6)
    el = math.radians(62)
    bpy.ops.object.camera_add(location=(0, -20 * math.cos(el), 20 * math.sin(el)), rotation=(math.pi / 2 - el, 0, 0)); c = bpy.context.object
    c.data.type = 'ORTHO'; c.data.ortho_scale = tam * 1.15; S.camera = c
    S.render.filepath = f'{OUT}/{nome}.png'; bpy.ops.render.render(write_still=True)
    print('ok', nome)
print('FIM')
