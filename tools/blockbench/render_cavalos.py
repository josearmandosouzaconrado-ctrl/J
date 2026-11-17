# Renderiza os modelos do Blockbench (tools/blockbench/modelos/*.bbmodel) como sprites do jogo.
# Lê cubos, ossos (grupos com pivô) e cores do próprio .bbmodel, posa as pernas para o trote e
# fotografa com câmera ortográfica em 1 pixel por unidade (pixels nítidos, sem borrão).
# Vistas: lado (direita), frente (vindo para baixo), costas (indo para cima) e só cabeça+pescoço de
# frente (desenhada por cima das pernas do cavaleiro). Uso (Blender 4.2 / bpy):
#   python render_cavalos.py -- <pasta de saída> [variante...]
import bpy, json, math, os, sys, base64, io, struct, zlib

ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = ARGS[0] if ARGS else '/tmp/cavalos'
SO = ARGS[1:]
AQUI = os.path.dirname(os.path.abspath(__file__))
os.makedirs(OUT, exist_ok=True)

def cores_da_textura(src):
    """decodifica a faixa de cores do .bbmodel (PNG RGBA, 4 px por cor)"""
    raw = base64.b64decode(src.split(',', 1)[1])
    w, h = struct.unpack('>II', raw[16:24])
    i, dados = 8, b''
    while i < len(raw):
        n = struct.unpack('>I', raw[i:i + 4])[0]; t = raw[i + 4:i + 8]
        if t == b'IDAT': dados += raw[i + 8:i + 8 + n]
        i += 12 + n
    px = zlib.decompress(dados)
    linha = px[1:1 + w * 4]
    return [tuple(linha[k * 16 + c] / 255 for c in range(3)) for k in range(w // 4)]

def srgb_lin(c): return tuple((v / 12.92) if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c)

def carregar(caminho):
    for o in list(bpy.data.objects):
        if o.type not in ('CAMERA', 'LIGHT'): bpy.data.objects.remove(o, do_unlink=True)
    M = json.load(open(caminho))
    paleta = cores_da_textura(M['textures'][0]['source'])
    mats = {}
    def mat(i):
        if i in mats: return mats[i]
        m = bpy.data.materials.new('c%d' % i); m.use_nodes = True
        b = m.node_tree.nodes['Principled BSDF']; b.inputs['Base Color'].default_value = (*srgb_lin(paleta[i]), 1); b.inputs['Roughness'].default_value = 1
        b.inputs['Specular IOR Level'].default_value = 0
        mats[i] = m; return m
    # Blockbench: y para cima; Blender: z para cima. (x, y, z)bb -> (x, -z, y)
    V = lambda p: (p[0], -p[2], p[1])
    els = {e['uuid']: e for e in M['elements']}
    objs, ossos = {}, {}
    def vazio(nome, origem, pai):
        o = bpy.data.objects.new(nome, None); bpy.context.collection.objects.link(o)
        o.location = V(origem); o.rotation_mode = 'XYZ'
        if pai: o.parent = pai; o.location = (o.location[0] - pai.matrix_world.translation[0], o.location[1] - pai.matrix_world.translation[1], o.location[2] - pai.matrix_world.translation[2])
        bpy.context.view_layer.update(); return o
    def monta(g, pai):
        osso = vazio(g['name'], g['origin'], pai); ossos[g['name']] = osso
        for c in g['children']:
            if isinstance(c, dict): monta(c, osso); continue
            e = els[c]; a, b = e['from'], e['to']
            ctr = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2)
            # pivô próprio do cubo (rotação do elemento no Blockbench)
            piv = vazio('piv_' + e['name'], e.get('origin', ctr), osso)
            r = e.get('rotation') or [0, 0, 0]
            piv.rotation_mode = 'ZYX'
            # (bb) rotação em x -> Blender x; em y -> Blender z; em z -> Blender -y
            piv.rotation_euler = (math.radians(r[0]), -math.radians(r[2]), math.radians(r[1]))
            bpy.ops.mesh.primitive_cube_add(size=1)
            cu = bpy.context.object; cu.name = e['name']
            cu.scale = (abs(b[0] - a[0]), abs(b[2] - a[2]), abs(b[1] - a[1]))
            cu.parent = piv
            o0 = e.get('origin', ctr)
            cu.location = (ctr[0] - o0[0], -(ctr[2] - o0[2]), ctr[1] - o0[1])
            i = round((e['faces']['north']['uv'][0] - 0.5) / 4)
            cu.data.materials.append(mat(i))
            objs[e['name'] + e['uuid']] = cu
            cu['grupo'] = g['name']
    for g in M['outliner']: monta(g, None)
    return ossos

# ---------- cena ----------
bpy.ops.wm.read_factory_settings(use_empty=True)
S = bpy.context.scene
W = bpy.data.worlds.new('w'); S.world = W; W.use_nodes = True
W.node_tree.nodes['Background'].inputs['Color'].default_value = (1, 1, 1, 1); W.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.42
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(40), math.radians(-30), math.radians(-25)))
sol = bpy.context.object; sol.data.energy = 2.6; sol.data.angle = math.radians(2)
bpy.ops.object.camera_add(); cam = bpy.context.object; S.camera = cam; cam.data.type = 'ORTHO'
S.render.engine = 'CYCLES'; S.cycles.device = 'CPU'; S.cycles.samples = 12; S.cycles.use_denoising = False
S.cycles.filter_width = 0.01            # sem borrão: cada pixel vale um ponto do modelo
S.render.film_transparent = True; S.render.image_settings.file_format = 'PNG'; S.render.image_settings.color_mode = 'RGBA'
S.view_settings.view_transform = 'Standard'
CW, CH = 44, 34                         # tamanho de cada quadro (px)
S.render.resolution_x = CW; S.render.resolution_y = CH

TAM = {'lado': (44, 34), 'frente': (32, 48), 'costas': (32, 48)}
def camera(vista, cx):
    global CW, CH
    CW, CH = TAM[vista]; S.render.resolution_x = CW; S.render.resolution_y = CH
    # 1 unidade = 1 pixel; câmera um pouco acima, como a vista do jogo. O ponto mirado fica no meio do
    # quadro e foi escolhido para o chão (z=0) cair 1-2 px acima da borda de baixo em todas as vistas.
    # de lado a câmera fica um pouco acima (mostra a sela); de frente e de costas fica bem mais alta,
    # como os outros sprites do jogo vistos de cima, e um pouco mais perto (o cavalo é estreito)
    cam.data.ortho_scale = max(CW, CH) if vista == 'lado' else max(CW, CH) / 1.3
    el = math.radians({'lado': 24, 'frente': 38, 'costas': 50}[vista])
    k = 1 if vista == 'lado' else 1.3
    alvo = (cx, 0, (CH / 2 - 1.5) / k / math.cos(el) if vista == 'lado' else (CH / 2 - 2) / k / math.cos(el))
    if vista == 'lado': cam.rotation_euler = (math.pi / 2 - el, 0, 0); d = (0, math.cos(el), -math.sin(el))
    elif vista == 'frente': cam.rotation_euler = (math.pi / 2 - el, 0, math.pi / 2); d = (-math.cos(el), 0, -math.sin(el))
    else: cam.rotation_euler = (math.pi / 2 - el, 0, -math.pi / 2); d = (math.cos(el), 0, -math.sin(el))
    cam.location = (alvo[0] - 80 * d[0], alvo[1] - 80 * d[1], alvo[2] - 80 * d[2])

def pose(ossos, q):
    # 0 parado; 1 e 2: trote (pares diagonais alternados), cabeça e cauda acompanham
    a = math.radians(26) * (0 if q == 0 else 1 if q == 1 else -1)
    for nome, s in (('perna_fd', 1), ('perna_te', 1), ('perna_fe', -1), ('perna_td', -1)):
        if nome in ossos: ossos[nome].rotation_euler = (0, -a * s * (0.8 if 'perna_t' in nome else 1), 0)
    if 'pescoco' in ossos: ossos['pescoco'].rotation_euler = (0, math.radians(-4) * (1 if q else 0), 0)
    if 'cauda' in ossos: ossos['cauda'].rotation_euler = (0, math.radians(10) * (1 if q == 1 else -1 if q == 2 else 0), 0)
    if 'corpo' in ossos: ossos['corpo'].location.z = ossos['corpo']['z0'] + (0.5 if q else 0)

VARS = SO or [f[:-8] for f in sorted(os.listdir(os.path.join(AQUI, 'modelos'))) if f.endswith('.bbmodel')]
for v in VARS:
    ossos = carregar(os.path.join(AQUI, 'modelos', v + '.bbmodel'))
    ossos['corpo']['z0'] = ossos['corpo'].location.z
    sela = [o for o in bpy.data.objects if o.name.startswith('sela') and o.type == 'MESH']
    bpy.context.view_layer.update()
    cx = sum(o.matrix_world.translation.x for o in sela) / max(1, len(sela))
    cabeca = {o.name for o in bpy.data.objects if o.type == 'MESH' and o.get('grupo') in ('pescoco', 'cabeca')}
    for vista in ('lado', 'frente', 'costas'):
        camera(vista, cx)
        # de frente e de costas o cavalo fica um pouco mais largo (fica legível em poucos pixels, como os outros sprites)
        ossos['corpo'].scale = (1, 1 if vista == 'lado' else 1.45, 1)
        for q in range(3):
            pose(ossos, q)
            for o in bpy.data.objects:
                if o.type == 'MESH': o.hide_render = False
            S.render.filepath = f'{OUT}/{v}_{vista}_{q}.png'; bpy.ops.render.render(write_still=True)
            if vista == 'frente':
                # só pescoço e cabeça, na mesma posição, para ficar na frente do cavaleiro
                for o in bpy.data.objects:
                    if o.type == 'MESH': o.hide_render = o.name not in cabeca
                S.render.filepath = f'{OUT}/{v}_cabeca_{q}.png'; bpy.ops.render.render(write_still=True)
print('FIM')
