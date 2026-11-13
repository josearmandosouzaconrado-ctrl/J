"""Leva para o jogo o que soldados.py modela no Blender: as texturas de camuflagem (OCP, EMR, Tipo 07) sem emenda
e o equipamento de cada exército (capacete, colete, mochila e fuzil) numa versão leve, com sombra dos cantos
gravada nas cores. Saída: www/modelos/soldados.js (window.SOLDADOS).
Uso: python -I exportar_soldados.py -- ../../www/modelos/soldados.js [pasta_previas]
Eixos do jogo: Y para cima, frente +Z (Blender: Z para cima, frente +Y -> jogo (-x, z, y)).
"""
import sys, os, math, json, base64, struct
import bpy, bmesh
from mathutils import Vector, Matrix
from mathutils.bvhtree import BVHTree

ARGS = sys.argv[sys.argv.index('--') + 1:]
SAIDA = ARGS[0]
PREV = ARGS[1] if len(ARGS) > 1 else os.path.dirname(os.path.abspath(SAIDA))
AQUI = os.path.dirname(os.path.abspath(__file__))

# carrega só as funções de soldados.py (sem montar a cena de prévia)
fonte = open(os.path.join(AQUI, 'soldados.py'), encoding='utf-8').read().split('# ---------------- os três soldados')[0]
sys.argv = [sys.argv[0], '--', PREV]
S = {'__name__': 'soldados', '__file__': os.path.join(AQUI, 'soldados.py')}
exec(compile(fonte, S['__file__'], 'exec'), S)
S['BAIXO'] = True
REG = []
_obj = S['objeto']
def objeto_reg(*a, **k):
    o = _obj(*a, **k); REG.append(o); return o
S['objeto'] = objeto_reg
material = S['material']

CAMOS = {
    'eua': dict(camo=[(0.47, 0.42, 0.31), (0.33, 0.33, 0.22), (0.26, 0.21, 0.14), (0.6, 0.55, 0.42), (0.18, 0.15, 0.1)], escala=7, digital=False),
    'russia': dict(camo=[(0.33, 0.37, 0.25), (0.2, 0.24, 0.15), (0.45, 0.43, 0.32), (0.09, 0.1, 0.07)], escala=6, digital=True),
    'china': dict(camo=[(0.36, 0.4, 0.27), (0.2, 0.26, 0.15), (0.46, 0.42, 0.29), (0.11, 0.13, 0.09)], escala=8, digital=True),
}
TILE = 2.2      # metros cobertos por uma repetição da textura (o mesmo do jogo: uv = metros / 2,2)
PX = 512


def textura_camo(nome, cfg):
    """camuflagem sem emenda: o ruído 4D é lido num toro (u e v dão a volta), então a imagem repete perfeitamente"""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    bpy.ops.mesh.primitive_plane_add(size=1.0); pl = bpy.context.object
    m = bpy.data.materials.new('camo'); m.use_nodes = True; nt = m.node_tree
    for n in list(nt.nodes): nt.nodes.remove(n)
    out = nt.nodes.new('ShaderNodeOutputMaterial'); em = nt.nodes.new('ShaderNodeEmission')
    nt.links.new(em.outputs[0], out.inputs['Surface'])
    tc = nt.nodes.new('ShaderNodeTexCoord'); uv = tc.outputs['UV']
    if cfg['digital']:
        sn = nt.nodes.new('ShaderNodeVectorMath'); sn.operation = 'SNAP'; sn.inputs[1].default_value = (0.012 / TILE, 0.012 / TILE, 1)
        nt.links.new(uv, sn.inputs[0]); uv = sn.outputs[0]
    sep = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(uv, sep.inputs[0])
    def trig(entrada, op):
        mul = nt.nodes.new('ShaderNodeMath'); mul.operation = 'MULTIPLY'; mul.inputs[1].default_value = 2 * math.pi
        nt.links.new(entrada, mul.inputs[0])
        f = nt.nodes.new('ShaderNodeMath'); f.operation = op; nt.links.new(mul.outputs[0], f.inputs[0])
        return f.outputs[0]
    comb = nt.nodes.new('ShaderNodeCombineXYZ')
    nt.links.new(trig(sep.outputs['X'], 'COSINE'), comb.inputs['X'])
    nt.links.new(trig(sep.outputs['X'], 'SINE'), comb.inputs['Y'])
    nt.links.new(trig(sep.outputs['Y'], 'COSINE'), comb.inputs['Z'])
    wv = trig(sep.outputs['Y'], 'SINE')
    camo = cfg['camo']
    rgb = nt.nodes.new('ShaderNodeRGB'); rgb.outputs[0].default_value = (*camo[0], 1); cor = rgb.outputs[0]
    for i, c in enumerate(camo[1:]):
        n = nt.nodes.new('ShaderNodeTexNoise'); n.noise_dimensions = '4D'; n.inputs['Detail'].default_value = 2
        # raio 1 no toro = 2π de circunferência: escala para dar ~escala*TILE manchas por volta
        n.inputs['Scale'].default_value = cfg['escala'] * (1 + 0.45 * i) * TILE / (2 * math.pi)
        off = nt.nodes.new('ShaderNodeMath'); off.operation = 'ADD'; off.inputs[1].default_value = i * 3.7
        nt.links.new(wv, off.inputs[0])
        nt.links.new(comb.outputs[0], n.inputs['Vector']); nt.links.new(off.outputs[0], n.inputs['W'])
        g = nt.nodes.new('ShaderNodeMath'); g.operation = 'GREATER_THAN'; g.inputs[1].default_value = 0.56 + 0.02 * i
        nt.links.new(n.outputs['Fac'], g.inputs[0])
        mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'
        nt.links.new(g.outputs[0], mx.inputs[0]); nt.links.new(cor, mx.inputs[6]); mx.inputs[7].default_value = (*c, 1)
        cor = mx.outputs[2]
    nt.links.new(cor, em.inputs['Color'])
    pl.data.materials.append(m)
    cam = bpy.data.objects.new('c', bpy.data.cameras.new('c')); sc.collection.objects.link(cam); sc.camera = cam
    cam.data.type = 'ORTHO'; cam.data.ortho_scale = 1.0; cam.location = (0, 0, 2)
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 4; sc.cycles.use_denoising = False; sc.cycles.filter_width = 0.01
    sc.view_settings.view_transform = 'Standard'
    sc.render.resolution_x = sc.render.resolution_y = PX
    sc.render.image_settings.file_format = 'JPEG'; sc.render.image_settings.quality = 85
    caminho = os.path.join(PREV, f'camo_{nome}.jpg'); sc.render.filepath = caminho
    bpy.ops.render.render(write_still=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(open(caminho, 'rb').read()).decode()


def exportar(objs, centro, escala=1.0, excluir=()):
    """junta as peças, leva para o espaço da peça do jogo e grava cor (com sombra dos cantos), uv e 'liso'"""
    objs = [o for o in objs if o.data.materials and o.data.materials[0].name not in excluir]
    dg = bpy.context.evaluated_depsgraph_get()
    tris = []   # (pos, normal, material) por canto
    malhas = []
    for o in objs:
        me = o.evaluated_get(dg).to_mesh().copy()
        me.transform(o.matrix_world); malhas.append(me)
    # árvore para a sombra dos cantos (todas as peças juntas)
    bm = bmesh.new()
    for me in malhas: bm.from_mesh(me)
    arvore = BVHTree.FromBMesh(bm)
    dirs = []
    for i in range(16):
        z = 1 - (i + 0.5) / 16; r = math.sqrt(1 - z * z); a = i * 2.39996
        dirs.append(Vector((math.cos(a) * r, math.sin(a) * r, z)))
    def ao(p, n):
        t = Vector((1, 0, 0)) if abs(n.x) < 0.9 else Vector((0, 1, 0)); b1 = n.cross(t).normalized(); b2 = n.cross(b1)
        livre = tot = 0
        for d in dirs:
            v = (b1 * d.x + b2 * d.y + n * d.z).normalized(); w = d.z; tot += w
            if arvore.ray_cast(p + n * 0.003, v, 0.12)[0] is None: livre += w
        return livre / tot
    mapa, P, N, Cc, U, L, I = {}, [], [], [], [], [], []
    for me in malhas:
        me.calc_loop_triangles()
        for tri in me.loop_triangles:
            mat = me.materials[tri.material_index]
            cor = list(mat['cor']) if mat else [0.5, 0.5, 0.5]; camo = bool(mat['camo']) if mat else False
            nf = tri.normal
            for li in tri.loops:
                v = me.vertices[me.loops[li].vertex_index].co
                n = me.corners[li].normal if hasattr(me, 'corners') else me.loops[li].normal
                a = 0.55 + 0.45 * ao(v, Vector(n))
                c = [1.0 * a, 1.0 * a, 1.0 * a] if camo else [x * a for x in cor]
                q = (v - centro) * escala
                pos = (-q.x, q.z, q.y); nor = (-n.x, n.z, n.y)
                # uv em metros/2,2 projetado pelo lado dominante (camuflagem na mesma escala do corpo)
                ax, ay, az = abs(nf.x), abs(nf.y), abs(nf.z)
                uv = (v.x, v.z) if ay >= ax and ay >= az else (v.y, v.z) if ax >= az else (v.x, v.y)
                k = (round(pos[0] * 2000), round(pos[1] * 2000), round(pos[2] * 2000), round(nor[0] * 127), round(nor[1] * 127), round(nor[2] * 127),
                     round(c[0] * 255), round(c[1] * 255), round(c[2] * 255), round(uv[0] / TILE * 2048), round(uv[1] / TILE * 2048), 0 if camo else 1)
                if k not in mapa:
                    mapa[k] = len(mapa); P += k[:3]; N += k[3:6]; Cc += k[6:9]; U += k[9:11]; L.append(k[11])
                I.append(mapa[k])
    b = lambda f, a: base64.b64encode(struct.pack(f'<{len(a)}{f}', *a)).decode()
    print(f'    {len(mapa)} vértices, {len(I) // 3} triângulos')
    return dict(p=b('h', P), n=b('b', N), c=b('B', [min(255, max(0, x)) for x in Cc]), uv=b('h', [max(-32768, min(32767, x)) for x in U]), l=b('B', L), i=b('H', I))


def pecas(nacao):
    """monta o soldado da nação (como em soldados.py) e devolve as peças do equipamento no espaço do jogo"""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    S['SC'] = bpy.context.scene
    preto = material('arma', (0.035, 0.035, 0.035), 0.45, 0.4)
    cfg = CAMOS[nacao]
    camo = material('camo', None, camo=cfg['camo'], escala=cfg['escala'], digital=cfg['digital'])
    if nacao == 'eua':
        cor_col, cor_bolsa, cor_cap, mag = material('coyote', (0.4, 0.33, 0.23)), material('coyote2', (0.36, 0.3, 0.21)), material('cap', (0.38, 0.33, 0.24)), material('mag', (0.33, 0.28, 0.2))
    elif nacao == 'russia':
        cor_col, cor_bolsa, cor_cap, mag = camo, material('verde_ru2', (0.14, 0.17, 0.1)), camo, material('mag_ru', (0.12, 0.1, 0.08))
    else:
        cor_col, cor_bolsa, cor_cap, mag = camo, material('verde_cn', (0.22, 0.26, 0.16)), camo, preto
    REG.clear()
    J, cab = S['corpo'](0.0, camo, material('pele', (0.7, 0.5, 0.4)), preto, preto)
    vs = [v.co for v in cab.data.vertices]; cen_cab = sum(vs, Vector()) / len(vs)
    res = {}
    # capacete: no jogo o centro da cabeça fica 12 cm acima do pivô da cabeça e a cabeça é ~10% maior
    REG.clear(); S['capacete'](cab, nacao, cor_cap, preto)
    print(' ', nacao, 'capacete'); res['capacete'] = exportar(list(REG), cen_cab - Vector((0, 0.005, 0.12 / 1.1)), 1.1, excluir=('balaclava', 'pele2'))
    # colete (com cinto e bolsas) e mochila: pivô 1,115 m de altura, 2 cm à frente
    REG.clear(); S['colete'](J, cor_col, cor_bolsa, 0.0, 4 if nacao == 'russia' else 3)
    print(' ', nacao, 'colete'); res['colete'] = exportar(list(REG), Vector((0, 0.02, 1.115)))
    if nacao != 'russia':
        REG.clear(); S['mochila'](J, cor_bolsa if nacao == 'eua' else camo)
        print(' ', nacao, 'mochila'); res['mochila'] = exportar(list(REG), Vector((0, 0.02, 1.115)))
    # fuzil: pivô na empunhadura
    REG.clear(); S['fuzil'](nacao, None, preto, mag)
    print(' ', nacao, 'fuzil'); res['arma'] = exportar(list(REG), Vector((0, 0.28, -0.065)))
    return res


saida = {'texturas': {}, 'pecas': {}, 'tile': TILE}
for n, cfg in CAMOS.items():
    saida['texturas'][n] = textura_camo(n, cfg)
    saida['pecas'][n] = pecas(n)
with open(SAIDA, 'w') as f:
    f.write('// Soldados: camuflagens e equipamento modelados no Blender (ferramentas/leste/exportar_soldados.py)\n')
    f.write('window.SOLDADOS = ' + json.dumps(saida, separators=(',', ':')) + ';\n')
print('ok', os.path.getsize(SAIDA))
