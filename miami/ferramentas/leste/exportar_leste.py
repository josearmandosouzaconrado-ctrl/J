"""Leva para o jogo os tanques e jatos de modelos_leste.py (T-90M, Type 99A, Su-57, J-20).
A pintura (camuflagem, sujeira e estrelas) é "assada" do Blender numa textura; a torre dos tanques e o trem de
pouso dos jatos saem como peças separadas (giram / recolhem); a cabine sai como vidro.
Uso: python -I exportar_leste.py -- ../../www/modelos/leste.js [pasta_previas]
Eixos do jogo: Y para cima, frente +Z (Blender: Z para cima, frente +Y -> jogo (-x, z, y)).
"""
import sys, os, math, json, base64, struct
import bpy, bmesh

ARGS = sys.argv[sys.argv.index('--') + 1:]
SAIDA = ARGS[0]
PREV = ARGS[1] if len(ARGS) > 1 else os.path.dirname(os.path.abspath(SAIDA))
AQUI = os.path.dirname(os.path.abspath(__file__))
fonte = open(os.path.join(AQUI, 'modelos_leste.py'), encoding='utf-8').read().split('# ---------------- cena e foto')[0]
sys.argv = [sys.argv[0], '--', PREV]
M = {'__name__': 'modelos_leste', '__file__': os.path.join(AQUI, 'modelos_leste.py')}
exec(compile(fonte, M['__file__'], 'exec'), M)

# tamanho da textura e limite de triângulos de cada peça
CFG = {
    't90': dict(f=lambda: M['tanque']('t90'), pecas={'corpo': (1024, 3500), 'torre': (512, 2500)}),
    'type99': dict(f=lambda: M['tanque']('type99'), pecas={'corpo': (1024, 3500), 'torre': (512, 2200)}),
    'su57': dict(f=lambda: M['jato']('su57'), pecas={'corpo': (512, 2500), 'trem': (64, 500), 'vidro': (0, 400)}),
    'j20': dict(f=lambda: M['jato']('j20'), pecas={'corpo': (512, 2500), 'trem': (64, 500), 'vidro': (0, 400)}),
}


def juntar(objs, nome):
    """aplica os modificadores e junta numa malha só"""
    dg = bpy.context.evaluated_depsgraph_get()
    bm = bmesh.new()
    mats = []
    for o in objs:
        me = o.evaluated_get(dg).to_mesh()
        me = me.copy(); me.transform(o.matrix_world)
        base = len(mats)
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
    sc.render.image_settings.file_format = 'JPEG'; sc.render.image_settings.color_mode = 'RGB'; sc.render.image_settings.quality = 78
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
            n = nf if not tri.use_smooth else (me.corners[li].normal if hasattr(me, 'corners') else me.loops[li].normal)
            u = uvl[li].uv if uvl else (0, 0)
            k = (round(-(v.x - px) * 1000), round((v.z - pz) * 1000), round((v.y - py) * 1000), round(-n.x * 127), round(n.z * 127), round(n.y * 127), round(u[0] * 32767), round(u[1] * 32767))
            if k not in mapa:
                mapa[k] = len(mapa); P += k[:3]; N += k[3:6]; U += k[6:8]
            I.append(mapa[k])
    b = lambda f, a: base64.b64encode(struct.pack(f'<{len(a)}{f}', *a)).decode()
    print(f'    {ob.name}: {len(mapa)} vértices, {len(I) // 3} triângulos')
    assert len(mapa) < 65536
    return dict(p=b('h', P), n=b('b', N), uv=b('h', [max(-32768, min(32767, x)) for x in U]), i=b('H', I))


saida = {}
for nome, cfg in CFG.items():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    cfg['f']()
    grupos = {}
    for o in list(bpy.context.scene.objects):
        if o.type != 'MESH': continue
        parte = o.get('parte', 'corpo')
        if any(m and m.name.startswith('cabine') for m in o.data.materials): parte = 'vidro'
        grupos.setdefault(parte, []).append(o)
    juntos = {p: juntar(objs, f'{nome}_{p}') for p, objs in grupos.items()}
    for objs in grupos.values():
        for o in objs: o.hide_render = True        # as peças originais saem da cena (a sombra vem das juntas)
    res = {}
    for p, ob in juntos.items():
        lado, limite = cfg['pecas'].get(p, (512, 4000))
        ntri = sum(len(f.vertices) - 2 for f in ob.data.polygons)
        if ntri > limite:
            d = ob.modifiers.new('dec', 'DECIMATE'); d.ratio = limite / ntri
            bpy.context.view_layer.objects.active = ob; bpy.ops.object.select_all(action='DESELECT'); ob.select_set(True)
            bpy.ops.object.modifier_apply(modifier='dec')
        tex = assar(ob, lado, f'{nome}_{p}') if lado else None
        pivo = (0, 0, 1.62) if p == 'torre' else (0, 0, 0)
        res[p] = dict(malha(ob, pivo), tex=tex)
    saida[nome] = res
    print('ok', nome)
with open(SAIDA, 'w') as f:
    f.write('// Tanques e jatos da Rússia e da China modelados no Blender (ferramentas/leste/exportar_leste.py)\n')
    f.write('window.MODELOS_LESTE = ' + json.dumps(saida, separators=(',', ':')) + ';\n')
print('tamanho', os.path.getsize(SAIDA))
