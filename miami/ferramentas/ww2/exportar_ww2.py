"""Leva para o jogo os modelos da 2ª Guerra de modelos_ww2.py.
A pintura (verde-oliva, estrelas, faixas de invasão, sujeira nos cantos) é "assada" do Blender numa textura;
torre/metralhadora, trem de pouso e hélices saem como peças separadas (giram / recolhem); vidros saem como vidro.
Uso: python -I exportar_ww2.py -- ../../www/modelos/ww2.js [pasta_previas] [nomes...]
Eixos do jogo: Y para cima, frente +Z (Blender: Z para cima, frente +Y -> jogo (-x, z, y)).
"""
import sys, os, math, json, base64, struct
import bpy, bmesh

ARGS = sys.argv[sys.argv.index('--') + 1:]
SAIDA = ARGS[0]
PREV = ARGS[1] if len(ARGS) > 1 else os.path.dirname(os.path.abspath(SAIDA))
SO = ARGS[2:]
os.makedirs(PREV, exist_ok=True)
AQUI = os.path.dirname(os.path.abspath(__file__))
M = {'__name__': 'modelos_ww2', '__file__': os.path.join(AQUI, 'modelos_ww2.py'), 'SO_FUNCOES': True}
exec(compile(open(M['__file__'], encoding='utf-8').read(), M['__file__'], 'exec'), M)

# tamanho da textura e limite de triângulos de cada peça
TANQUE = {'corpo': (1024, 4500), 'torre': (512, 2600)}
RODAS = {'corpo': (1024, 4500), 'torre': (256, 600), 'vidro': (0, 300)}
AVIAO = {'corpo': (1024, 5000), 'trem': (64, 500), 'vidro': (0, 600), 'helice': (128, 700), 'helice2': (128, 700)}
BARCO = {'corpo': (1024, 4000), 'torre': (16, 50), 'vidro': (0, 200)}
CFG = {'sherman': TANQUE, 'pershing': TANQUE, 'priest': TANQUE, 'jeep': RODAS, 'halftrack': RODAS, 'gmc': RODAS,
       'p51': AVIAO, 'p47': AVIAO, 'corsair': AVIAO, 'b25': AVIAO, 'lcvp': BARCO, 'pt': BARCO}


def juntar(objs, nome):
    """aplica os modificadores e junta numa malha só"""
    dg = bpy.context.evaluated_depsgraph_get()
    bm = bmesh.new()
    mats = []
    for o in objs:
        me = o.evaluated_get(dg).to_mesh()
        me = me.copy(); me.transform(o.matrix_world)
        for m in me.materials:
            if m not in mats: mats.append(m)
        remap = [mats.index(m) for m in me.materials]
        for p in me.polygons: p.material_index = remap[p.material_index] if remap else 0
        bm.from_mesh(me)
        bpy.data.meshes.remove(me)
    me = bpy.data.meshes.new(nome); bm.to_mesh(me); bm.free()
    for m in mats: me.materials.append(m)
    ob = bpy.data.objects.new(nome, me); bpy.context.scene.collection.objects.link(ob)
    for p in me.polygons: p.use_smooth = False
    return ob


def assar(ob, lado, nome):
    """desdobra a malha (UV automático) e grava a cor dos materiais numa imagem"""
    bpy.ops.object.select_all(action='DESELECT'); ob.select_set(True); bpy.context.view_layer.objects.active = ob
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.004)
    bpy.ops.object.mode_set(mode='OBJECT')
    img = bpy.data.images.new(nome, lado, lado)
    for m in ob.data.materials:
        nt = m.node_tree; n = nt.nodes.new('ShaderNodeTexImage'); n.image = img
        for x in nt.nodes: x.select = False
        n.select = True; nt.nodes.active = n
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 24; sc.cycles.device = 'CPU'
    sc.render.bake.use_pass_direct = False; sc.render.bake.use_pass_indirect = False; sc.render.bake.margin = 6
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}, use_clear=True)
    caminho = os.path.join(PREV, nome + '.jpg')
    sc.render.image_settings.file_format = 'JPEG'; sc.render.image_settings.color_mode = 'RGB'; sc.render.image_settings.quality = 80
    img.save_render(caminho, scene=sc)
    return 'data:image/jpeg;base64,' + base64.b64encode(open(caminho, 'rb').read()).decode()


def malha(ob, pivo=(0, 0, 0)):
    me = ob.data; me.calc_loop_triangles()
    uvl = me.uv_layers.active.data if me.uv_layers.active else None
    mapa, P, N, U, I = {}, [], [], [], []
    px, py, pz = pivo
    for tri in me.loop_triangles:
        nf = tri.normal
        for li in tri.loops:
            v = me.vertices[me.loops[li].vertex_index].co
            n = nf
            u = uvl[li].uv if uvl else (0, 0)
            k = (round(-(v.x - px) * 1000), round((v.z - pz) * 1000), round((v.y - py) * 1000), round(-n.x * 127), round(n.z * 127), round(n.y * 127), round(u[0] * 32767), round(u[1] * 32767))
            if k not in mapa:
                mapa[k] = len(mapa); P += k[:3]; N += k[3:6]; U += k[6:8]
            I.append(mapa[k])
    b = lambda f, a: base64.b64encode(struct.pack(f'<{len(a)}{f}', *a)).decode()
    print(f'    {ob.name}: {len(mapa)} vértices, {len(I) // 3} triângulos')
    assert len(mapa) < 65536 and max(abs(x) for x in P) < 32767
    return dict(p=b('h', P), n=b('b', N), uv=b('h', [max(-32768, min(32767, x)) for x in U]), i=b('H', I))


jogo = lambda p: [round(-p[0], 3), round(p[2], 3), round(p[1], 3)]
saida = {}
if os.path.exists(SAIDA) and SO:
    txt = open(SAIDA).read(); saida = json.loads(txt[txt.index('{'):txt.rindex('}') + 1])
for nome, pecas in CFG.items():
    if SO and nome not in SO: continue
    bpy.ops.wm.read_factory_settings(use_empty=True)
    M['PIVO'] = (0, 0, 1.9); M['LEVE'] = True; M['PIVOS'].clear()
    M['FAB'][nome]()
    PV = M['PIVO']; PVS = dict(M['PIVOS'])
    grupos = {}
    for o in list(bpy.context.scene.objects):
        if o.type != 'MESH': continue
        parte = o.get('parte', 'corpo')
        if parte == 'corpo' and any(m and m.name.startswith('cabine') for m in o.data.materials): parte = 'vidro'
        grupos.setdefault(parte, []).append(o)
    juntos = {p: juntar(objs, f'{nome}_{p}') for p, objs in grupos.items()}
    for objs in grupos.values():
        for o in objs: o.hide_render = True
    res = {}
    for p, ob in juntos.items():
        lado, limite = pecas.get(p, (256, 2000))
        ntri = sum(len(f.vertices) - 2 for f in ob.data.polygons)
        if ntri > limite:
            d = ob.modifiers.new('dec', 'DECIMATE'); d.ratio = limite / ntri
            bpy.context.view_layer.objects.active = ob; bpy.ops.object.select_all(action='DESELECT'); ob.select_set(True)
            bpy.ops.object.modifier_apply(modifier='dec')
        tex = assar(ob, lado, f'{nome}_{p}') if lado else None
        pivo = PV if p == 'torre' else PVS[p] if p in PVS else (0, 0, 0)
        res[p] = dict(malha(ob, pivo), tex=tex)
    res['pivo'] = jogo(PV)
    res['helices'] = [dict(peca=k, pos=jogo(v)) for k, v in PVS.items()]
    # dimensões (para conferir no jogo): comprimento, largura e altura
    xs, ys, zs = [], [], []
    for ob in juntos.values():
        for v in ob.data.vertices: xs.append(v.co.x); ys.append(v.co.y); zs.append(v.co.z)
    res['dim'] = [round(max(xs) - min(xs), 2), round(max(zs) - min(zs), 2), round(max(ys) - min(ys), 2)]
    saida[nome] = res
    print('ok', nome, res['dim'])
with open(SAIDA, 'w') as f:
    f.write('// Exército dos EUA na 2ª Guerra modelado no Blender (ferramentas/ww2/exportar_ww2.py)\n')
    f.write('window.MODELOS_WW2 = ' + json.dumps(saida, separators=(',', ':')) + ';\n')
print('tamanho', os.path.getsize(SAIDA))
