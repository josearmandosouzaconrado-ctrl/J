"""Converte os helicópteros SH-60B Seahawk e CH-47 Chinook (OBJ + texturas) em www/modelos/helis.js.
Uso (Blender como módulo Python: pip install bpy==4.2.0, Python 3.11):
  python -I converter.py -- <pasta_seahawk> <pasta_chinook> ../../www/modelos/helis.js
Cada pasta é o zip extraído (source/<modelo>.obj já descompactado em src/ e textures/).
Eixos do jogo: frente = +Z, cima = +Y, metros. Rotores saem como peças separadas centradas no cubo (para girar).
"""
import sys, os, io, glob, json, base64, struct
import bpy, bmesh
from mathutils import Vector
from PIL import Image

SEA, CHI, SAIDA = sys.argv[-3:]

# peça -> (lista de (grupo ou material), redução de faces)
MODELOS = {
    'seahawk': dict(
        obj=glob.glob(os.path.join(SEA, 'src', '*.obj'))[0],
        escala=16.36 / 1689.0, y0=-1.0,                     # diâmetro real do rotor: 16,36 m
        texturas={'Tex_0045_0_dds': ('tex_0045_0.png', 1024), 'Tex_0044_0_dds': ('tex_0044_0.png', 512)},
        vidro=['Material__44'],
        pecas={'rotor': ['Mesh_0051'], 'cauda': ['Mesh_0050']},
        pivos={'rotor': None, 'cauda': None},               # None: centro dos vértices da peça
        reducao={'Mesh_0053': 0.22, 'Mesh_0051': 0.12, 'Mesh_0052': 0.2, 'Mesh_0044': 0.1, 'Mesh_0021': 0.25, 'Mesh_0050': 0.25, '*': 0.35},
    ),
    'chinook': dict(
        obj=glob.glob(os.path.join(CHI, 'src', '*.obj'))[0],
        escala=15.8 / 215.0, y0=0.94,                       # comprimento real da fuselagem: 15,8 m
        texturas={'Material__14524': ('Texture_01.png', 1024), 'Material__14525': ('Texture_03.png', 256), 'Material__14526': ('Texture_03.png', 256),
                  'Material__14528': ('Texture_02.png', 256), 'Material__14529': ('Texture_02.png', 256), 'Material__14530': ('Texture_02.png', 256), 'Material__14531': ('Texture_02.png', 256)},
        vidro=['13___Default'],
        # rotor traseiro (mais alto) = rotor, dianteiro = rotor2, como no modelo antigo do jogo
        pecas={'rotor': ['Material__14530', 'Material__14529'], 'rotor2': ['Material__14531', 'Material__14528']},
        pivos={'rotor': None, 'rotor2': None},
        reducao={'DrawCall_0145': 0.6, '*': 1.0},
    ),
}
DIRS = {'seahawk': SEA, 'chinook': CHI}

def b64(b): return base64.b64encode(b).decode()
def textura(caminho, lado):
    im = Image.open(caminho).convert('RGB').resize((lado, lado), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=82, optimize=True)
    return 'data:image/jpeg;base64,' + b64(b.getvalue())

saida = {}
for nome, C in MODELOS.items():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    # importa separando por grupo, sem mexer nos eixos (Y do OBJ continua para cima)
    bpy.ops.wm.obj_import(filepath=C['obj'], forward_axis='NEGATIVE_Z', up_axis='Y', use_split_groups=True, use_split_objects=True)
    objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    texs, partes = {}, []
    def peca_de(o, mat):
        for p, chaves in C['pecas'].items():
            if any(k == o.name or o.name.startswith(k) or k == mat for k in chaves): return p
        return 'corpo'
    # redução de faces por objeto
    for o in objs:
        r = next((v for k, v in C['reducao'].items() if k != '*' and o.name.startswith(k)), C['reducao']['*'])
        if r < 1:
            m = o.modifiers.new('dec', 'DECIMATE'); m.ratio = r
    dg = bpy.context.evaluated_depsgraph_get()
    grupos = {}   # (peça, material) -> listas
    for o in objs:
        oe = o.evaluated_get(dg); me = oe.to_mesh()
        me.calc_loop_triangles()
        mw = o.matrix_world
        uvl = me.uv_layers.active.data if me.uv_layers.active else None
        for tri in me.loop_triangles:
            mat = me.materials[tri.material_index].name if me.materials and me.materials[tri.material_index] else '-'
            p = peca_de(o, mat)
            g = grupos.setdefault((p, mat), {'v': [], 'uv': []})
            for li in tri.loops:
                v = mw @ me.vertices[me.loops[li].vertex_index].co
                # blender (x, y, z) com Y do OBJ virando -Z... de volta para os eixos do OBJ: (x, z, -y)
                g['v'].append((v.x, v.z, -v.y))
                g['uv'].append(tuple(uvl[li].uv) if uvl else (0, 0))
        oe.to_mesh_clear()
    E, y0 = C['escala'], C['y0']
    # pivô de cada peça móvel: centro dos vértices dela (cubo do rotor)
    pivos = {}
    for p in C['pecas']:
        vs = [v for (pp, _), g in grupos.items() if pp == p for v in g['v']]
        # pás simétricas em volta do cubo: o centro dos vértices cai no eixo do rotor
        pivos[p] = tuple(sum(v[k] for v in vs) / len(vs) for k in range(3))
    for (p, mat), g in grupos.items():
        px, py, pz = pivos.get(p, (0, y0, 0))
        if p == 'corpo': px, py, pz = 0, y0, 0
        # vértices iguais (posição + uv) viram um só; normais calculadas no jogo
        mapa, pos, uv, idx = {}, [], [], []
        for (x, y, z), (u, v) in zip(g['v'], g['uv']):
            k = (round((x - px) * E * 1000), round((y - py) * E * 1000), round((z - pz) * E * 1000), round(u * 4096), round(v * 4096))
            if k not in mapa:
                mapa[k] = len(mapa); pos += k[:3]; uv += [k[3], k[4]]
            idx.append(mapa[k])
        tex = C['texturas'].get(mat)
        if tex and tex[0] not in texs:
            texs[tex[0]] = textura(os.path.join(DIRS[nome], 'textures', tex[0]), tex[1])
        partes.append(dict(peca=p, tex=tex[0] if tex else None, vidro=mat in C['vidro'],
                           p=b64(struct.pack(f'<{len(pos)}h', *pos)), uv=b64(struct.pack(f'<{len(uv)}h', *[max(-32768, min(32767, a)) for a in uv])),
                           i=b64(struct.pack(f'<{len(idx)}{"H" if len(mapa) < 65536 else "I"}', *idx)), i32=len(mapa) >= 65536))
        print(nome, p, mat, 'vértices', len(mapa), 'triângulos', len(idx) // 3)
    piv = {p: [round((v[0] - 0) * E, 3), round((v[1] - y0) * E, 3), round(v[2] * E, 3)] for p, v in pivos.items()}
    print(nome, 'pivôs (m)', piv)
    saida[nome] = dict(partes=partes, pivos=piv, texturas=texs)
with open(SAIDA, 'w') as f:
    f.write('// Helicópteros SH-60B Seahawk e CH-47 Chinook: modelos 3D convertidos por ferramentas/helis/converter.py\n')
    f.write('window.MODELOS_HELIS = ' + json.dumps(saida, separators=(',', ':')) + ';\n')
print('ok', os.path.getsize(SAIDA))
