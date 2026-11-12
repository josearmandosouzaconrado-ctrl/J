# Converte o porta-aviões "USS Enterprise CVN-80" (OBJ + texturas) em www/modelos/porta.js
# Uso: python3 -I converter.py "USS Enterprise CVN-80 Aircraft Carrier.obj" pasta/textures ../../www/modelos/porta.js
# Uso: python3 -I converter.py modelo.obj pasta_texturas saida.js
# Eixos do jogo: frente (proa) = +Z, cima = +Y, boreste (lado da ilha) = -X. Escala real: 333 m de comprimento.
import sys, base64, io, json, struct
import numpy as np
from PIL import Image

obj, texdir, saida = sys.argv[1:4]
V, VT, VN, faces = [], [], [], {}
mat = None
for l in open(obj, encoding='utf-8', errors='ignore'):
    if l.startswith('v '): V.append([float(a) for a in l.split()[1:4]])
    elif l.startswith('vt '): VT.append([float(a) for a in l.split()[1:3]])
    elif l.startswith('vn '): VN.append([float(a) for a in l.split()[1:4]])
    elif l.startswith('usemtl'): mat = l.split()[1]
    elif l.startswith('f '):
        cs = [tuple(int(x) - 1 if x else -1 for x in c.split('/')) for c in l.split()[1:]]
        for k in range(1, len(cs) - 1): faces.setdefault(mat, []).append((cs[0], cs[k], cs[k + 1]))
V, VT, VN = np.array(V), np.array(VT), np.array(VN)
S = 333.0 / (V[:, 2].max() - V[:, 2].min())
zc = (V[:, 2].max() + V[:, 2].min()) / 2
def conv(p): return np.stack([-p[:, 0] * S, p[:, 1] * S, -(p[:, 2] - zc) * S], 1)
P = conv(V)
N = np.stack([-VN[:, 0], VN[:, 1], -VN[:, 2]], 1)
# altura do convoo: a faixa de altura com mais área virada para cima
cima = [c[0] for f in faces.values() for t in f for c in t if c[2] >= 0 and N[c[2], 1] > 0.95]
hs = P[cima, 1]; h, e = np.histogram(hs[(hs > 10) & (hs < 30)], bins=200)
deck = float(e[h.argmax()] + (e[1] - e[0]) / 2)
print('escala', S, 'convoo', deck, 'limites', P.min(0).round(1), P.max(0).round(1))

def textura(nome, jpeg):
    im = Image.open(f'{texdir}/{nome}')
    b = io.BytesIO()
    if jpeg: im.convert('RGB').save(b, 'JPEG', quality=80, optimize=True); tipo = 'jpeg'
    else: im.save(b, 'PNG', optimize=True); tipo = 'png'
    return f'data:image/{tipo};base64,' + base64.b64encode(b.getvalue()).decode()

partes = []
for nome, tex, jpeg in [('boat.0', 'Cvn_80_Enterprise.png', True), ('boat.1', 'Cvn_80_Enterprise2.png', False)]:
    mapa, pos, nor, uv, idx = {}, [], [], [], []
    for t in faces[nome]:
        for c in t:
            if c not in mapa:
                mapa[c] = len(mapa)
                pos.append(P[c[0]]); nor.append(N[c[2]] if c[2] >= 0 else (0, 1, 0)); uv.append(VT[c[1]] if c[1] >= 0 else (0, 0))
            idx.append(mapa[c])
    pos, nor, uv = np.array(pos), np.array(nor), np.array(uv)
    nor = nor / np.maximum(1e-6, np.linalg.norm(nor, axis=1, keepdims=True))
    print(nome, 'vértices', len(pos), 'triângulos', len(idx) // 3, 'uv', uv.min(0).round(2), uv.max(0).round(2))
    q = lambda a, t: base64.b64encode(np.ascontiguousarray(a).astype(t).tobytes()).decode()
    partes.append(dict(
        p=q(np.round(pos * 100), '<i2'), n=q(np.round(nor * 127), 'i1'),
        uv=q(np.round(uv * (32767 / max(1.0, np.abs(uv).max()))), '<i2'), uvs=float(max(1.0, np.abs(uv).max())),
        i=q(np.array(idx), '<u2' if len(pos) < 65536 else '<u4'), i32=len(pos) >= 65536,
        tex=textura(tex, jpeg), alfa=not jpeg))
with open(saida, 'w') as f:
    f.write('// Porta-aviões USS Enterprise (CVN-80): modelo 3D do Sketchfab convertido por ferramentas/porta/converter.py\n')
    f.write('window.MODELO_PORTA = ' + json.dumps(dict(deck=round(deck, 2), partes=partes), separators=(',', ':')) + ';\n')
