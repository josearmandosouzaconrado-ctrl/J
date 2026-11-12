# Vikings de Hrimgard modelados no Blender 4.2 (bpy) e renderizados como sprites.
# Cada variante é montada com peças simples (malha de anéis, elmo com nasal, capa, escudo redondo,
# machado barbado...) e posada quadro a quadro: 3 direções (frente, costas, lado) x 4 quadros
# (parado, passo A, passo B, golpe). O jogo espelha o lado para a esquerda.
# Uso: python tools/blender/vikings.py -- <pasta de saída>   (gera <variante>_<dir>_<quadro>.png)
import bpy, math, sys, os
from mathutils import Vector

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else '/tmp/vikings'
os.makedirs(OUT, exist_ok=True)
SO = os.environ.get('SO')   # renderizar só uma variante (para testar)
bpy.ops.wm.read_factory_settings(use_empty=True)
S = bpy.context.scene

# ---------------- materiais ----------------
def mat(nome, cor, rough=0.7, metal=0.0, emis=None):
    m = bpy.data.materials.get(nome)
    if m: return m
    m = bpy.data.materials.new(nome); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*cor, 1); b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    if emis: b.inputs['Emission Color'].default_value = (*emis, 1); b.inputs['Emission Strength'].default_value = 2
    return m

def mat_malha(nome, c1, c2):
    # cota de malha: pontinhos claros e escuros (os anéis) em escala fina
    m = bpy.data.materials.new(nome); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    vo = nt.nodes.new('ShaderNodeTexVoronoi'); vo.inputs['Scale'].default_value = 38
    cr = nt.nodes.new('ShaderNodeValToRGB'); cr.color_ramp.elements[0].color = (*c1, 1); cr.color_ramp.elements[1].color = (*c2, 1)
    nt.links.new(vo.outputs['Distance'], cr.inputs['Fac']); nt.links.new(cr.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Metallic'].default_value = 0.35; b.inputs['Roughness'].default_value = 0.6
    return m

def mat_escudo(nome, c1, c2, borda):
    # escudo pintado em quatro gomos alternados, como os escudos nórdicos
    m = bpy.data.materials.new(nome); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); sp = nt.nodes.new('ShaderNodeSeparateXYZ')
    mul = nt.nodes.new('ShaderNodeMath'); mul.operation = 'MULTIPLY'
    gt = nt.nodes.new('ShaderNodeMath'); gt.operation = 'GREATER_THAN'; gt.inputs[1].default_value = 0
    mix = nt.nodes.new('ShaderNodeMix'); mix.data_type = 'RGBA'
    mix.inputs['A'].default_value = (*c1, 1); mix.inputs['B'].default_value = (*c2, 1)
    nt.links.new(tc.outputs['Object'], sp.inputs[0]); nt.links.new(sp.outputs['X'], mul.inputs[0]); nt.links.new(sp.outputs['Z'], mul.inputs[1])
    nt.links.new(mul.outputs[0], gt.inputs[0]); nt.links.new(gt.outputs[0], mix.inputs['Factor']); nt.links.new(mix.outputs['Result'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = 0.8
    return m

AÇO = mat('aco', (0.55, 0.57, 0.6), 0.35, 0.9)
OURO = mat('ouro', (0.85, 0.62, 0.2), 0.3, 1.0)
COURO = mat('couro', (0.32, 0.18, 0.08), 0.8)
COURO_ESC = mat('couro_esc', (0.18, 0.1, 0.05), 0.8)
MADEIRA = mat('madeira', (0.38, 0.24, 0.12), 0.85)
PELE = mat('pele', (0.86, 0.6, 0.45), 0.6)
PELO = mat('pelo', (0.2, 0.13, 0.08), 1.0)
BARBA_RUIVA = mat('barba_ruiva', (0.55, 0.22, 0.08), 0.9)
BARBA_LOIRA = mat('barba_loira', (0.75, 0.6, 0.3), 0.9)
CALCA = mat('calca', (0.33, 0.36, 0.33), 0.9)
VERMELHO = mat('vermelho', (0.55, 0.1, 0.08), 0.8)
MALHA = mat_malha('malha', (0.05, 0.05, 0.06), (0.38, 0.39, 0.42))

# ---------------- peças ----------------
def novo(o, pai, m=None):
    if m: o.data.materials.append(m)
    o.parent = pai
    bpy.ops.object.shade_smooth()
    return o
def cil(r, h, pos, pai, m, r2=None, verts=16, rot=(0, 0, 0)):
    if r2 is None: bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=h, location=pos, rotation=rot)
    else: bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r, radius2=r2, depth=h, location=pos, rotation=rot)
    return novo(bpy.context.object, pai, m)
def esf(r, pos, pai, m, esc=(1, 1, 1)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=12, radius=r, location=pos)
    o = bpy.context.object; o.scale = esc; return novo(o, pai, m)
def caixa(t, pos, pai, m, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(location=pos, rotation=rot); o = bpy.context.object
    o.scale = (t[0] / 2, t[1] / 2, t[2] / 2); return novo(o, pai, m)
def vazio(nome, pos, pai=None):
    o = bpy.data.objects.new(nome, None); bpy.context.collection.objects.link(o)
    o.location = pos; o.parent = pai; return o
def lamina_machado(pai, pos, larg=0.32, alt=0.34, esp=0.03, m=AÇO):
    # lâmina "barbada": um trapézio com a barba descendo pelo cabo
    import bmesh
    me = bpy.data.meshes.new('lamina'); o = bpy.data.objects.new('lamina', me); bpy.context.collection.objects.link(o)
    bm = bmesh.new()
    pts = [(0, 0.08), (larg * 0.55, alt * 0.45), (larg, alt * 0.55), (larg, -alt * 0.45), (larg * 0.5, -alt * 0.35), (0, -0.12)]
    vs = [bm.verts.new((x, -esp, y)) for x, y in pts] + [bm.verts.new((x, esp, y)) for x, y in pts]
    n = len(pts)
    bm.faces.new(vs[:n]); bm.faces.new(list(reversed(vs[n:])))
    for i in range(n):
        j = (i + 1) % n; bm.faces.new([vs[i], vs[j], vs[n + j], vs[n + i]])
    bm.to_mesh(me); bm.free()
    o.data.materials.append(m); o.parent = pai; o.location = pos
    return o
def machado(pai, comprimento=0.75, grande=False):
    cil(0.03, comprimento, (0, 0, -comprimento * 0.35), pai, MADEIRA)
    lamina_machado(pai, (0.03, 0, -comprimento * 0.35 + comprimento * 0.42), 0.36 if grande else 0.28, 0.4 if grande else 0.3)
def escudo(pai, m, raio=0.42):
    o = cil(raio, 0.05, (0, 0, 0), pai, m, verts=28, rot=(math.radians(90), 0, 0))
    cil(raio + 0.015, 0.06, (0, 0, 0), pai, COURO_ESC, verts=28, rot=(math.radians(90), 0, 0)).scale = (1, 1, 0.6)
    esf(0.1, (0, -0.04, 0), pai, AÇO, (1, 0.7, 1))
    return o

def viking(var):
    root = vazio('raiz', (0, 0, 0))
    jarl = var == 'jarl'; bers = var == 'berserker'; arq = var == 'arqueiro'; ald = var == 'aldea'
    capa_m = mat('capa_' + var, {'guerreiro': (0.1, 0.14, 0.035), 'berserker': (0.22, 0.17, 0.11), 'arqueiro': (0.08, 0.12, 0.16), 'jarl': (0.26, 0.025, 0.03), 'aldea': (0.35, 0.3, 0.22)}[var], 0.9)
    k = 1.12 if jarl else 1.0
    corpo = vazio('corpo', (0, 0, 0), root); corpo.scale = (k, k, k)
    # ---- pernas (pivô no quadril) ----
    pernas = []
    for lado in (-1, 1):
        q = vazio('quadril', (0.13 * lado, 0, 0.95), corpo)
        cil(0.11, 0.55, (0, 0, -0.3), q, CALCA)                           # calça
        cil(0.12, 0.32, (0, 0, -0.68), q, COURO, r2=0.13)                  # bota alta de couro
        caixa((0.18, 0.28, 0.1), (0, -0.07, -0.86), q, COURO_ESC)          # pé
        for z in (-0.42, -0.5, -0.58): cil(0.118, 0.025, (0, 0, z), q, COURO_ESC)   # faixas da perna
        pernas.append(q)
    # ---- tronco: cota de malha (ou pelo e pele, no berserker) ----
    tronco_m = PELO if bers else (mat('tunica', (0.42, 0.34, 0.24), 0.9) if ald else MALHA)
    cil(0.27, 0.62, (0, 0, 1.25), corpo, tronco_m, r2=0.31)               # peito
    cil(0.33, 0.42, (0, 0, 0.8), corpo, tronco_m, r2=0.27)                # saia da cota até o joelho
    cil(0.335, 0.05, (0, 0, 0.6), corpo, VERMELHO)                        # barra bordada
    cil(0.285, 0.07, (0, 0, 1.0), corpo, COURO)                           # cinto
    caixa((0.08, 0.04, 0.08), (0, -0.29, 1.0), corpo, OURO)               # fivela
    if not ald: caixa((0.06, 0.66, 0.05), (0.02, -0.02, 1.25), corpo, COURO, rot=(0, math.radians(38), math.radians(90)))   # correia cruzada
    # ---- capa e gola ----
    if not ald:
        bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=0.36, depth=1.1, location=(0, 0.07, 1.0))
        cp = bpy.context.object
        import bmesh
        bm = bmesh.new(); bm.from_mesh(cp.data)
        bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.calc_center_median().y < -0.02 or abs(f.normal.z) > 0.9], context='FACES')
        for v in bm.verts:
            t = (1.55 - v.co.z) / 1.1; v.co.x *= 1 + t * 0.18; v.co.y += t * 0.08   # a capa abre embaixo
        bm.to_mesh(cp.data); bm.free(); novo(cp, corpo, capa_m)
        cp.modifiers.new('esp', 'SOLIDIFY').thickness = 0.03
        bpy.ops.mesh.primitive_torus_add(major_radius=0.27, minor_radius=0.09 if bers else 0.07, location=(0, 0, 1.56))
        novo(bpy.context.object, corpo, PELO if (bers or jarl) else capa_m)
        esf(0.05, (-0.14, -0.26, 1.52), corpo, OURO)                      # broche da capa
    # ---- cabeça ----
    cab = vazio('cabeca', (0, 0, 1.78), corpo)
    esf(0.2, (0, 0, 0), cab, PELE, (1, 0.95, 1.05))
    for x in (-0.07, 0.07): esf(0.025, (x, -0.18, 0.03), cab, mat('olho', (0.05, 0.05, 0.08), 0.3))
    barba = BARBA_RUIVA if var in ('berserker', 'aldea') else BARBA_LOIRA
    esf(0.15, (0, -0.1, -0.13), cab, barba, (1.05, 0.8, 1.25))           # barba cheia
    if bers:
        esf(0.205, (0, 0.02, 0.05), cab, barba, (1, 1, 0.9))             # cabelo, sem elmo
        cil(0.03, 0.3, (0, 0.17, -0.12), cab, barba, rot=(math.radians(-20), 0, 0))   # trança
    elif not ald:
        cil(0.215, 0.24, (0, 0.01, -0.08), cab, MALHA, r2=0.24)          # camal de malha no pescoço
        esf(0.225, (0, 0, 0.04), cab, OURO if jarl else AÇO, (1, 1, 1.12))   # elmo arredondado
        caixa((0.05, 0.04, 0.2), (0, -0.225, -0.02), cab, OURO if jarl else AÇO)   # nasal
        caixa((0.36, 0.04, 0.05), (0, -0.21, 0.06), cab, OURO if jarl else AÇO)   # aro dos olhos
        cil(0.03, 0.12, (0, 0, 0.26), cab, OURO if jarl else AÇO)        # ponta
        if jarl:
            for lado in (-1, 1): cil(0.04, 0.3, (0.24 * lado, 0, 0.14), cab, mat('chifre', (0.9, 0.86, 0.75), 0.5), r2=0.005, rot=(0, math.radians(-50 * lado), 0))
    else:
        esf(0.2, (0, 0.02, 0.07), cab, mat('lenco', (0.6, 0.55, 0.45), 0.9), (1.02, 1.02, 0.9))
    # ---- braços (pivô no ombro) ----
    bracos = []
    for lado in (-1, 1):
        o = vazio('ombro', (0.36 * lado, 0, 1.5), corpo)
        cil(0.085, 0.3, (0, 0, -0.15), o, PELE if bers else (mat('manga', (0.4, 0.33, 0.25), 0.9) if ald else VERMELHO))   # manga vermelha
        cil(0.09, 0.28, (0, 0, -0.42), o, PELE if bers else COURO, r2=0.08)   # braçadeira de couro
        esf(0.08, (0, 0, -0.6), o, COURO_ESC if not bers else PELE)           # luva
        esf(0.12, (0, 0, 0.02), o, PELO if bers else (MALHA if not ald else tronco_m))   # ombro
        mao = vazio('mao', (0, 0, -0.6), o)
        bracos.append((o, mao))
    # ---- armas ----
    md = bracos[1][1]; me_ = bracos[0][1]
    if arq:
        arco = vazio('arco', (0, -0.05, 0), me_)
        bpy.ops.mesh.primitive_torus_add(major_radius=0.5, minor_radius=0.025, location=(0, 0, 0), rotation=(0, math.radians(90), 0))
        a = novo(bpy.context.object, arco, MADEIRA)
        import bmesh
        bm = bmesh.new(); bm.from_mesh(a.data)
        bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.x > 0.2 * 0 + 0.18], context='VERTS'); bm.to_mesh(a.data); bm.free()
        cil(0.005, 0.86, (-0.15, 0, 0), arco, mat('corda', (0.9, 0.85, 0.7)))
        alj = vazio('aljava', (0.1, 0.2, 1.3), corpo); cil(0.08, 0.5, (0, 0, 0), alj, COURO, rot=(math.radians(15), math.radians(20), 0))
        for i in range(3): cil(0.012, 0.2, (-0.03 + i * 0.03, 0.04, 0.32), alj, MADEIRA)
        caixa((0.12, 0.66, 0.04), (0, 0, 0.62), md, COURO)              # faca curta
    elif ald:
        cil(0.03, 0.9, (0, 0, -0.2), md, MADEIRA)                        # cajado de pastor
    else:
        mao_arma = vazio('arma', (0, -0.05, 0), md); mao_arma.rotation_euler = (math.radians(-80), 0, 0)
        machado(mao_arma, 0.95 if bers or jarl else 0.75, grande=bers or jarl)
        if bers:
            seg = vazio('arma2', (0, -0.05, 0), me_); seg.rotation_euler = (math.radians(-80), 0, math.radians(180))
            machado(seg, 0.75)
        else:
            esc_m = mat_escudo('escudo_' + var, *({'guerreiro': ((0.55, 0.48, 0.36), (0.12, 0.2, 0.42)), 'jarl': ((0.8, 0.65, 0.2), (0.45, 0.05, 0.05))}[var]), None)
            ep = vazio('escudo', (-0.06, -0.16, 0.1), me_); ep.rotation_euler = (0, 0, math.radians(-20))
            escudo(ep, esc_m, 0.46 if jarl else 0.42)
    return {'root': root, 'pernas': pernas, 'bracos': bracos, 'cab': cab, 'arq': arq, 'bers': bers}

# ---------------- câmera, luz e render ----------------
W = bpy.data.worlds.new('w'); S.world = W; W.use_nodes = True
W.node_tree.nodes['Background'].inputs['Color'].default_value = (0.5, 0.52, 0.6, 1); W.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.55
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(50), math.radians(-25), math.radians(-35)))
bpy.context.object.data.energy = 3.2; bpy.context.object.data.angle = math.radians(8)
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(-60), 0, math.radians(160)))
bpy.context.object.data.energy = 0.8; bpy.context.object.data.color = (0.7, 0.8, 1)   # contraluz frio
# câmera ortográfica levemente de cima, como a vista do jogo
bpy.ops.object.camera_add(location=(0, -8, 3.73 - 0.05), rotation=(math.radians(65), 0, 0))
cam = bpy.context.object; S.camera = cam; cam.data.type = 'ORTHO'; cam.data.ortho_scale = 2.9
S.render.engine = 'CYCLES'; S.cycles.device = 'CPU'; S.cycles.samples = int(os.environ.get('AMOSTRAS', 24)); S.cycles.use_denoising = True
S.render.resolution_x = 200; S.render.resolution_y = 220; S.render.film_transparent = True
S.render.image_settings.file_format = 'PNG'; S.render.image_settings.color_mode = 'RGBA'
S.view_settings.view_transform = 'Standard'

VARS = ['guerreiro', 'berserker', 'arqueiro', 'jarl', 'aldea']
DIRS = {'down': 0, 'up': 180, 'right': 90}
for var in VARS:
    if SO and var != SO: continue
    for o in list(bpy.data.objects):
        if o.type not in ('CAMERA', 'LIGHT'): bpy.data.objects.remove(o, do_unlink=True)
    V = viking(var)
    V['root'].location = (0, 0, -1.05)
    for dnome, ang in DIRS.items():
        V['root'].rotation_euler = (0, 0, math.radians(ang))
        for q in range(4):
            # 0 parado, 1/2 passos, 3 golpe
            sw = [0, 1, -1, 0][q] * math.radians(28)
            V['pernas'][0].rotation_euler = (sw, 0, 0); V['pernas'][1].rotation_euler = (-sw, 0, 0)
            (oe, _), (od, _) = V['bracos']
            oe.rotation_euler = (-sw * 0.7, 0, math.radians(-8)); od.rotation_euler = (sw * 0.7, 0, math.radians(8))
            if V['arq']: oe.rotation_euler = (math.radians(-70 if q == 3 else -35), 0, math.radians(-10))
            if q == 3:
                if V['arq']: od.rotation_euler = (math.radians(-85), 0, math.radians(30))   # puxando a corda
                else: od.rotation_euler = (math.radians(-150), 0, math.radians(10))   # machado erguido para o golpe
                if V['bers']: oe.rotation_euler = (math.radians(-110), 0, math.radians(-15))
            V['cab'].rotation_euler = (0, 0, math.radians([0, 4, -4, 0][q]))
            S.render.filepath = f'{OUT}/{var}_{dnome}_{q}.png'
            bpy.ops.render.render(write_still=True)
print('FIM')
