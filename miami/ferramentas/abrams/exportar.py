# Exporta o M1 Abrams do .blend para um módulo JS compacto (posições int16 em mm, normais int8, índice de cor por vértice)
# Uso: pip install bpy==4.2.0 (Python 3.11) e depois
#   python -I exportar.py -- m1abrams.blend ../../src/abrams_dados.js 0.2
# O .blend (CGTrader, licença Royalty Free) não vai para o repositório: a licença não permite redistribuir o arquivo original.
import sys, bpy, base64, struct, json
from mathutils import Vector
src, dst, ratio_lag = sys.argv[-3], sys.argv[-2], float(sys.argv[-1])
bpy.ops.wm.open_mainfile(filepath=src, load_ui=False, use_scripts=False)
DROP = {'Cubo.002', 'Cilindro.002'}
TORRE = {'Cubo.001', 'Cilindro', 'Cube.001', 'Cube.002'}
DEC = {'Cubo.003': ratio_lag, 'Cubo.011': ratio_lag, 'Cube.001': 0.55, 'Cube.002': 0.55, 'Cubo.001': 0.8, 'Cilindro': 0.6}
for n, r in DEC.items():
    o = bpy.data.objects[n]; m = o.modifiers.new('dec', 'DECIMATE'); m.ratio = r; m.use_collapse_triangulate = True
# materiais -> índice de cor (definido no jogo)
CORES = {'Materiais': 0, 'Materiais.001': 1, 'Materiais.002': 2, 'Materiais.003': 3, 'Materiais.004': 4,
         'Material.004': 5, 'Material.005': 6, 'Material.006': 7, 'Material.007': 8, 'Material.008': 5}
dg = bpy.context.evaluated_depsgraph_get()
S = 7.93 / 2.86           # comprimento real do casco
CX, CY, Z0 = 0.34, 0.96, -0.25
TP = None                  # pivô da torre (centro do anel)
def conv(v):              # blender (x, y, z), frente -Y  ->  three (x, z, -y), frente +Z (rotação, sem espelho)
    return ((v.x - CX) * S, (v.z - Z0) * S, (v.y - CY) * S * -1)
partes = {'casco': [], 'torre': []}
for o in bpy.data.objects:
    if o.type != 'MESH' or o.name in DROP: continue
    oe = o.evaluated_get(dg); me = oe.to_mesh()
    mw = o.matrix_world; nm = mw.to_3x3().inverted().transposed()
    mats = [m.name if m else None for m in me.materials]
    lista = partes['torre' if o.name in TORRE else 'casco']
    me.calc_loop_triangles() if hasattr(me, 'calc_loop_triangles') else None
    cn = me.corner_normals if hasattr(me, 'corner_normals') else None
    for tri in me.loop_triangles:
        cor = CORES.get(mats[tri.material_index] if mats else None, 0)
        vs = []
        for li in tri.loops:
            vi = me.loops[li].vertex_index
            p = mw @ me.vertices[vi].co
            n = (nm @ (cn[li].vector if cn else me.loops[li].normal)).normalized()
            vs.append((conv(p), (n.x, n.z, -n.y), cor))
        lista.append((vs[0], vs[1], vs[2]))
    oe.to_mesh_clear()
saida = {}
for nome, tris in partes.items():
    pos, nor, cor, idx, mapa = [], [], [], [], {}
    for t in tris:
        for (p, n, c) in t:
            k = (round(p[0]*1000), round(p[1]*1000), round(p[2]*1000), round(n[0]*127), round(n[1]*127), round(n[2]*127), c)
            if k not in mapa:
                mapa[k] = len(mapa); pos += k[:3]; nor += k[3:6]; cor.append(c)
            idx.append(mapa[k])
    assert len(mapa) < 65536
    saida[nome] = dict(n=len(mapa), t=len(idx)//3,
        p=base64.b64encode(struct.pack(f'<{len(pos)}h', *pos)).decode(),
        no=base64.b64encode(struct.pack(f'<{len(nor)}b', *nor)).decode(),
        c=base64.b64encode(bytes(cor)).decode(),
        i=base64.b64encode(struct.pack(f'<{len(idx)}H', *idx)).decode())
    ys = [pos[i+1] for i in range(0, len(pos), 3)]; zs = [pos[i+2] for i in range(0, len(pos), 3)]; xs = [pos[i] for i in range(0, len(pos), 3)]
    print(nome, 'vértices', len(mapa), 'triângulos', len(idx)//3, 'x', min(xs), max(xs), 'y', min(ys), max(ys), 'z', min(zs), max(zs))
with open(dst, 'w') as f:
    f.write('// M1 Abrams: modelo 3D "M1 Abrams low poly" (CGTrader, gratuito), convertido por ferramentas/abrams.\n')
    f.write('// Gerado automaticamente: posições em mm (int16), normais int8, cor por vértice (índice).\n')
    f.write('export const ABRAMS = ' + json.dumps(saida, separators=(',', ':')) + ';\n')
