"""Exército dos EUA na 2ª Guerra (1941-1945) modelado no Blender só com código, em escala real (metros).
Tanques M4A3 Sherman e M26 Pershing, Jeep Willys MB, meia-lagarta M3, caminhão GMC CCKW, obuseiro M7 Priest,
caças P-51D Mustang, P-47D Thunderbolt e F4U-1D Corsair, bombardeiro B-25J Mitchell, lancha de desembarque
LCVP (Higgins) e lancha torpedeira PT (Elco 80 pés).
As medidas vêm das fichas técnicas publicadas de cada veículo (comprimento, largura, altura, envergadura,
diâmetro das rodas e hélices); as formas foram desenhadas a partir de fotos e plantas de época.

Uso (Blender como módulo: pip install bpy):
  python -I modelos_ww2.py -- <pasta_saida> [sherman pershing jeep halftrack gmc priest p51 p47 corsair b25 lcvp pt]
  (gera uma prévia .png de cada modelo)
Eixos do Blender: Z para cima, frente = +Y.
"""
import sys, os, math, random
import bpy, bmesh
from mathutils import Vector, Matrix

AQUI = os.path.dirname(os.path.abspath(__file__))
# funções de modelagem compartilhadas (material, caixa, cilindro, casco, loft, placa, esteira...) de ../leste
_fonte = open(os.path.join(AQUI, '..', 'leste', 'modelos_leste.py'), encoding='utf-8').read()
_fonte = _fonte.split('# ---------------- materiais')[1].split('# ---------------- tanques ----------------')[0]
exec(compile('# ---------------- materiais' + _fonte, 'modelos_leste.py', 'exec'), globals())

PARTE = 'corpo'
PIVO = (0, 0, 1.9)      # pivô da torre (x, frente, altura)
PIVOS = {}              # pivô de cada hélice ('helice', 'helice2'...)
LEVE = False


# ---------------- cores da época ----------------
def tintas_ww2(od=True):
    T = dict(
        od=material('od', (0.085, 0.09, 0.04), 0.75, sujeira=0.35),                 # Olive Drab nº 9 do Exército
        od2=material('od2', (0.065, 0.07, 0.03), 0.8, sujeira=0.3),
        escuro=material('escuro', (0.02, 0.02, 0.018), 0.6, 0.3, sujeira=0.1),
        aco=material('aco', (0.12, 0.12, 0.11), 0.45, 0.8, sujeira=0.25),
        borracha=material('borracha', (0.03, 0.028, 0.026), 0.9, sujeira=0.25),
        lagarta=material('lagarta', (0.05, 0.045, 0.04), 0.8, 0.5, sujeira=0.35),
        branco=material('branco', (0.75, 0.75, 0.7), 0.7, sujeira=0.08),
        lona=material('lona', (0.13, 0.12, 0.07), 0.95, sujeira=0.3),
        madeira=material('madeira', (0.25, 0.12, 0.05), 0.7, sujeira=0.2),
        farol=material('farol', (0.8, 0.78, 0.68), 0.15, 0.3, sujeira=0),
        couro=material('couro', (0.12, 0.06, 0.03), 0.7, sujeira=0.15),
    )
    return T


def poligono(pts2d, mat, pos, u, v, n, off=0.006):
    """forma plana (decalque) no plano (u, v) em volta de pos, deslocada 'off' na direção n"""
    bm = bmesh.new()
    u, v, n = Vector(u).normalized(), Vector(v).normalized(), Vector(n).normalized()
    base = Vector(pos) + n * off
    vs = [bm.verts.new(base + u * x + v * y) for x, y in pts2d]
    bm.faces.new(vs)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    f = bm.faces[0]
    if f.normal.dot(n) < 0: bmesh.ops.reverse_faces(bm, faces=[f])
    return objeto(bm, mat)


def pts_estrela(r, rot=0.0):
    return [(math.cos(math.pi / 2 + rot + i * math.pi / 5) * (r if i % 2 == 0 else r * 0.382),
             math.sin(math.pi / 2 + rot + i * math.pi / 5) * (r if i % 2 == 0 else r * 0.382)) for i in range(10)]


def pts_circulo(r, n=28):
    return [(math.cos(2 * math.pi * i / n) * r, math.sin(2 * math.pi * i / n) * r) for i in range(n)]


def estrela_aliada(pos, r, n, cima, T, anel=True):
    """estrela branca dos veículos do Exército (com ou sem círculo)"""
    n = Vector(n).normalized(); cima = Vector(cima).normalized(); u = cima.cross(n)
    poligono(pts_estrela(r), T['branco'], pos, u, cima, n, 0.008)
    if anel:
        # círculo em volta: anel fino montado com trapézios
        k = 32
        for i in range(k):
            a0, a1 = 2 * math.pi * i / k, 2 * math.pi * (i + 1) / k
            R0, R1 = r * 1.08, r * 1.2
            poligono([(math.cos(a0) * R0, math.sin(a0) * R0), (math.cos(a1) * R0, math.sin(a1) * R0),
                      (math.cos(a1) * R1, math.sin(a1) * R1), (math.cos(a0) * R1, math.sin(a0) * R1)], T['branco'], pos, u, cima, n, 0.008)


def insignia_aviao(pos, r, n, cima, azul, branco):
    """'star and bar' de 1943-45: círculo azul com estrela branca e barras brancas contornadas de azul"""
    n = Vector(n).normalized(); cima = Vector(cima).normalized(); u = cima.cross(n)
    poligono(pts_circulo(r * 1.0), azul, pos, u, cima, n, 0.006)
    poligono([(-r * 2.05, -r * 0.6), (r * 2.05, -r * 0.6), (r * 2.05, r * 0.42), (-r * 2.05, r * 0.42)], azul, pos, u, cima, n, 0.005)
    poligono([(-r * 1.95, -r * 0.5), (r * 1.95, -r * 0.5), (r * 1.95, r * 0.32), (-r * 1.95, r * 0.32)], branco, pos, u, cima, n, 0.008)
    poligono(pts_circulo(r * 0.9), azul, pos, u, cima, n, 0.01)
    poligono(pts_estrela(r * 0.9), branco, pos, u, cima, n, 0.013)


# ---------------- superfícies de avião ----------------
def perfil(corda, tc, n=9):
    """perfil simétrico NACA 00xx: lista (dx para trás, dz) em volta do perfil, bordo de fuga -> extradorso -> intradorso"""
    xs = [0.5 - 0.5 * math.cos(math.pi * i / (n - 1)) for i in range(n)]
    yt = lambda x: 5 * tc * (0.2969 * math.sqrt(x) - 0.126 * x - 0.3516 * x * x + 0.2843 * x ** 3 - 0.1036 * x ** 4)
    sup = [(x * corda, yt(x) * corda) for x in reversed(xs)]
    inf = [(x * corda, -yt(x) * corda) for x in xs[1:-1]]
    return sup + inf


def asa(estacoes, mats, sx=1, eixo='x'):
    """asa/estabilizador/deriva por estações: (pos ao longo da envergadura, y do bordo de ataque, corda, altura, espessura).
    eixo 'x' = asa horizontal (estação em x); 'z' = deriva vertical (estação em z, 'altura' vira x lateral).
    mats: um material por trecho entre estações (faixas de invasão, pontas pintadas)."""
    aneis = []
    for (s, yle, c, h, tc) in estacoes:
        pts = perfil(c, tc)
        if eixo == 'x': aneis.append([(sx * s, yle - dx, h + dz) for dx, dz in pts])
        else: aneis.append([(h + dz, yle - dx, s) for dx, dz in pts])
    for i in range(len(aneis) - 1):
        bm = bmesh.new()
        A = [bm.verts.new(p) for p in aneis[i]]; B = [bm.verts.new(p) for p in aneis[i + 1]]
        k = len(A)
        for j in range(k): bm.faces.new((A[j], A[(j + 1) % k], B[(j + 1) % k], B[j]))
        if i == 0: bm.faces.new(list(reversed(A)))
        if i == len(aneis) - 2: bm.faces.new(B)
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        objeto(bm, mats[min(i, len(mats) - 1)], suave=True)


def lerp_secao(a, b, t):
    return tuple(x + (y - x) * t for x, y in zip(a, b))


def secao_em(secoes, y):
    for a, b in zip(secoes, secoes[1:]):
        if a[0] <= y <= b[0]:
            return lerp_secao(a, b, (y - a[0]) / (b[0] - a[0]) if b[0] > a[0] else 0)
    return secoes[0] if y < secoes[0][0] else secoes[-1]


def fuselagem(secoes, faixas, mat, n=28):
    """loft dividido em trechos: faixas = [(y0, y1, material)] pintadas por cima da cor base"""
    cortes = sorted({secoes[0][0], secoes[-1][0]} | {y for f in faixas for y in f[:2] if secoes[0][0] < y < secoes[-1][0]})
    for y0, y1 in zip(cortes, cortes[1:]):
        m = mat
        for f in faixas:
            if f[0] <= y0 + 1e-6 and y1 <= f[1] + 1e-6: m = f[2]
        sec = [secao_em(secoes, y0)] + [s for s in secoes if y0 < s[0] < y1] + [secao_em(secoes, y1)]
        loft(sec, m, n)


def helice(parte, centro, r, pas, mat, cubo_mat, eixo=Vector((0, 1, 0)), corda=0.24, ponta=None):
    """hélice de 'pas' pás com cubo (spinner), como peça separada que gira no jogo"""
    global PARTE
    ant = PARTE; PARTE = parte
    PIVOS[parte] = tuple(centro)
    cx, cy, cz = centro
    loft([(cy - 0.05, 0.5 * r / 1.7, 0.25 * r / 1.7, 0.25 * r / 1.7, cx, cz, 2.0), (cy + 0.25, 0.42 * r / 1.7, 0.21 * r / 1.7, 0.21 * r / 1.7, cx, cz, 2.0),
          (cy + 0.55 * r / 1.7, 0.02, 0.01, 0.01, cx, cz, 2.0)], cubo_mat, 20)
    for k in range(pas):
        a = 2 * math.pi * k / pas
        # pá torcida: chapa afinando para a ponta, com passo maior na raiz
        cont = [(-corda * 0.35, 0.1), (corda * 0.5, 0.1), (corda * 0.55, r * 0.55), (corda * 0.35, r * 0.97), (-corda * 0.15, r), (-corda * 0.4, r * 0.6)]
        o = placa(cont, 0.035, mat, bevel=0.006)
        rad = Vector((math.cos(a), 0, math.sin(a))); tan = Vector((-math.sin(a), 0, math.cos(a))); ax = Vector((0, 1, 0))
        for v in o.data.vertices:
            x, y, z = v.co
            th = 0.9 - 0.55 * max(0.0, min(1.0, y / r))
            cd = tan * math.cos(th) + ax * math.sin(th); td = -tan * math.sin(th) + ax * math.cos(th)
            v.co = Vector((cx, cy + 0.12, cz)) + rad * y + cd * x + td * z
    if ponta:
        for k in range(pas):
            a = 2 * math.pi * k / pas
            d = Matrix.Rotation(a, 3, 'Y') @ Vector((0, 0, r * 0.93))
            caixa((corda * 0.7, 0.04, r * 0.1), (cx + d.x, cy + 0.12, cz + d.z), ponta, 0.005, rot=(0, -a, 0))
    PARTE = ant


def roda_aviao(x, y, z, r, larg, T, perna=None):
    cilindro(r, r, larg, (x, y, z), T['borracha'], 'X', 20, bevel=0.03)
    cilindro(r * 0.55, r * 0.55, larg * 1.04, (x, y, z), T['trem'], 'X', 16)
    if perna:
        (x1, y1, z1) = perna
        d = Vector((x1 - x, y1 - y, z1 - z)); L = d.length
        cilindro(0.06, 0.06, L, tuple((Vector((x, y, z)) + Vector((x1, y1, z1))) / 2), T['trem'], Vector((0, 0, 1)).rotation_difference(d).to_matrix(), 10)


# =====================================================================
#   TANQUES
# =====================================================================
def esteira_vvss(T, x, L, z0=0.28):
    """suspensão VVSS do Sherman: 3 truques de 2 rodas, roda motriz alta na frente, roda-guia atrás"""
    y0, y1 = -L / 2, L / 2
    rodas = []
    for b in range(3):
        yb = y0 + 1.05 + b * (L - 2.05) / 2
        for k in (-0.33, 0.33): rodas.append((yb + k, z0, 0.255))
    rodas += [(y1 - 0.25, 0.78, 0.33), (y0 + 0.2, 0.5, 0.3), (y1 - 1.3, 1.02, 0.07), (y0 + 1.3, 1.02, 0.07), (0, 1.02, 0.07)]
    esteira(x, 0.42, rodas, T['lagarta'], T['od'], T['aco'])
    for b in range(3):
        yb = y0 + 1.05 + b * (L - 2.05) / 2
        caixa((0.18, 0.7, 0.38), (x * 0.82, yb, 0.62), T['od'], 0.03)                 # caixa do truque com mola
        caixa((0.14, 0.2, 0.28), (x * 0.86, yb + 0.15, 0.95), T['od'], 0.02)          # suporte do rolete


def sherman():
    """M4A3 Sherman (canhão 75 mm M3), casco soldado de glacis a 47°, torre fundida"""
    global PARTE, PIVO
    PARTE = 'corpo'
    T = tintas_ww2()
    od, od2, aco, escuro = T['od'], T['od2'], T['aco'], T['escuro']
    L = 5.9
    y0, y1 = -L / 2, L / 2
    # casco inferior (entre as lagartas) e nariz arredondado da transmissão
    casco([(sx * 0.9, y, z) for sx in (-1, 1) for (y, z) in [(y0 + 0.1, 0.45), (y0, 1.05), (y1 - 0.4, 1.05), (y1 - 0.05, 0.75), (y1 - 0.3, 0.45)]], od, 0.05)
    cilindro(0.38, 0.38, 2.4, (0, y1 - 0.35, 0.78), od, 'X', 24, bevel=0.02)          # carcaça do diferencial (3 peças)
    for sx in (-0.82, 0.82): caixa((0.06, 0.5, 0.75), (sx, y1 - 0.35, 0.78), od2, 0.01)
    # casco superior com sponsons sobre as lagartas: glacis inclinado, laterais retas, traseira em ângulo
    casco([(sx * 1.31, y, z) for sx in (-1, 1) for (y, z) in [(y0 + 0.15, 1.05), (y0, 1.8), (y0 + 0.4, 1.95), (y1 - 1.62, 1.95), (y1 - 0.2, 1.08)]], od, 0.04)
    # escotilhas do motorista e do auxiliar (com "capuz") no glacis, metralhadora de casco
    ang = math.atan2(1.95 - 1.08, 1.42)
    for sx in (-0.48, 0.48):
        caixa((0.62, 0.55, 0.22), (sx, y1 - 1.45, 1.98), od, 0.05)
        caixa((0.18, 0.08, 0.08), (sx, y1 - 1.18, 2.02), escuro, 0.01)                 # periscópio
    cilindro(0.11, 0.13, 0.12, (0.5, y1 - 0.72, 1.55), od, Matrix.Rotation(-ang, 3, 'X') @ Matrix.Rotation(-math.pi / 2, 3, 'X'), 16)
    cilindro(0.025, 0.025, 0.35, (0.5, y1 - 0.55, 1.6), escuro, 'Y', 8)
    # faróis com protetor, buzina, ganchos de reboque
    for sx in (-1, 1):
        cilindro(0.09, 0.09, 0.12, (sx * 0.95, y1 - 0.55, 1.4), T['farol'], 'Y', 14)
        gaiola((0.26, 0.2, 0.24), (sx * 0.95, y1 - 0.43, 1.4), aco, 0.012)
        cilindro(0.06, 0.06, 0.12, (sx * 0.7, y1 + 0.02, 0.6), aco, 'X', 10)
    # lagartas e para-lamas
    for sx in (-1, 1):
        esteira_vvss(T, sx * 1.07, L - 0.2)
        caixa((0.55, 0.45, 0.04), (sx * 1.08, y1 - 0.1, 1.08), od, 0.01, rot=(-0.4, 0, 0))
        estrela_aliada((sx * 1.315, -0.4, 1.5), 0.32, (sx, 0, 0), (0, 0, 1), T)
    # deck do motor: grades, ferramentas (pá, picareta, machado), tampas
    for k in range(2): caixa((1.9, 0.5, 0.03), (0, y0 + 0.5 + k * 0.6, 1.96), escuro, 0.01)
    for sx in (-1, 1):
        caixa((0.1, 1.2, 0.05), (sx * 1.0, y0 + 1.7, 1.98), T['madeira'], 0.01)
        caixa((0.18, 0.28, 0.03), (sx * 1.0, y0 + 2.35, 1.98), aco, 0.01)
    caixa((2.4, 0.3, 0.4), (0, y0 - 0.05, 1.45), od, 0.03)                            # defletor traseiro
    for sx in (-0.6, 0.6): cilindro(0.12, 0.12, 0.25, (sx, y0 - 0.15, 1.2), escuro, 'Y', 14)   # escapamento
    # sacos de areia/caixas de ração na traseira (detalhe de campo)
    caixa((0.9, 0.35, 0.3), (-0.6, y0 + 0.25, 2.12), T['lona'], 0.06)
    # ---- torre fundida ----
    PARTE = 'torre'
    yt, zt = 0.35, 1.95
    PIVO = (0, yt, zt)
    loft([(yt - 1.35, 1.2, 0.55, 0.05, 0, zt + 0.25, 2.2), (yt - 1.1, 1.75, 0.7, 0.05, 0, zt + 0.25, 2.4), (yt - 0.4, 1.98, 0.74, 0.05, 0, zt + 0.25, 2.5),
          (yt + 0.45, 1.92, 0.7, 0.05, 0, zt + 0.25, 2.5), (yt + 0.95, 1.6, 0.58, 0.05, 0, zt + 0.25, 2.3), (yt + 1.15, 1.2, 0.45, 0.05, 0, zt + 0.25, 2.1)], od, 28)
    caixa((0.9, 0.32, 0.6), (0, yt + 1.18, zt + 0.42), od, 0.08)                      # mantelete (escudo do canhão)
    caixa((0.62, 0.3, 0.45), (0, yt + 1.4, zt + 0.42), od, 0.05)
    cilindro(0.06, 0.055, 2.95, (0, yt + 2.95, zt + 0.42), od, 'Y', 18)               # canhão 75 mm M3
    cilindro(0.075, 0.075, 0.1, (0, yt + 4.4, zt + 0.42), od2, 'Y', 18)
    cilindro(0.02, 0.02, 0.3, (0.24, yt + 1.6, zt + 0.42), escuro, 'Y', 8)            # metralhadora coaxial
    # cúpula do comandante (escotilha dupla) e escotilha do carregador
    cilindro(0.38, 0.4, 0.12, (-0.32, yt - 0.3, zt + 1.02), od, 'Z', 20, bevel=0.01)
    caixa((0.6, 0.35, 0.05), (-0.32, yt - 0.42, zt + 1.1), od2, 0.02)
    caixa((0.45, 0.45, 0.05), (0.42, yt - 0.25, zt + 1.0), od2, 0.02)
    caixa((0.1, 0.12, 0.12), (0.32, yt + 0.55, zt + 0.98), escuro, 0.01)              # periscópio do atirador
    # metralhadora .50 M2 no teto
    cilindro(0.02, 0.02, 0.7, (-0.32, yt - 0.3, zt + 1.4), aco, 'Z', 8)
    caixa((0.12, 0.6, 0.14), (-0.32, yt - 0.25, zt + 1.75), escuro, 0.01)
    cilindro(0.022, 0.022, 1.0, (-0.32, yt + 0.5, zt + 1.77), escuro, 'Y', 8)
    caixa((0.12, 0.25, 0.18), (-0.18, yt - 0.35, zt + 1.68), od2, 0.01)               # caixa de munição
    cilindro(0.01, 0.014, 2.2, (0.55, yt - 1.0, zt + 1.6), aco, 'Z', 6)               # antena de rádio
    for sx in (-1, 1): estrela_aliada((sx * 0.98, yt - 0.25, zt + 0.5), 0.26, (sx, 0, 0.1), (0, 0, 1), T, anel=False)
    return 'tanque'


def pershing():
    """M26 Pershing: tanque pesado de 1945, canhão 90 mm M3 com freio de boca, suspensão de barras de torção"""
    global PARTE, PIVO
    PARTE = 'corpo'
    T = tintas_ww2()
    od, od2, aco, escuro = T['od'], T['od2'], T['aco'], T['escuro']
    L = 6.33
    y0, y1 = -L / 2, L / 2
    casco([(sx * 1.08, y, z) for sx in (-1, 1) for (y, z) in [(y0 + 0.3, 0.42), (y0, 0.95), (y0 + 0.1, 1.85), (y1 - 1.75, 1.9), (y1, 1.1), (y1 - 0.45, 0.42)]], od, 0.04)
    casco([(sx * 1.72, y, z) for sx in (-1, 1) for (y, z) in [(y0 + 0.2, 1.2), (y0 + 0.1, 1.85), (y1 - 1.75, 1.9), (y1 - 0.15, 1.2)]], od, 0.04)
    for sx in (-1, 1):
        rodas = [(y0 + 0.75 + i * (L - 1.75) / 5, 0.38, 0.33) for i in range(6)]
        rodas += [(y0 + 0.15, 0.72, 0.33), (y1 - 0.2, 0.62, 0.3)]
        for k in range(5): rodas.append((y0 + 1.0 + k * 1.05, 1.06, 0.08))
        esteira(sx * 1.4, 0.61, rodas, T['lagarta'], od, aco)
        caixa((0.66, L - 0.1, 0.04), (sx * 1.4, 0, 1.23), od, 0.01)
        estrela_aliada((sx * 1.725, -0.6, 1.55), 0.3, (sx, 0, 0), (0, 0, 1), T)
    for sx in (-0.5, 0.5):
        caixa((0.55, 0.5, 0.18), (sx, y1 - 1.6, 1.95), od, 0.05)
        caixa((0.18, 0.08, 0.08), (sx, y1 - 1.35, 1.98), escuro, 0.01)
    cilindro(0.1, 0.12, 0.12, (0.55, y1 - 0.9, 1.6), od, Matrix.Rotation(-0.9, 3, 'X') @ Matrix.Rotation(-math.pi / 2, 3, 'X'), 16)
    for sx in (-1, 1):
        cilindro(0.09, 0.09, 0.1, (sx * 1.1, y1 - 0.4, 1.35), T['farol'], 'Y', 14)
        gaiola((0.25, 0.2, 0.24), (sx * 1.1, y1 - 0.3, 1.35), aco, 0.012)
    for k in range(3): caixa((2.4, 0.45, 0.03), (0, y0 + 0.5 + k * 0.55, 1.88), escuro, 0.01)
    caixa((3.0, 0.25, 0.45), (0, y0 - 0.05, 1.5), od, 0.03)
    # ---- torre ----
    PARTE = 'torre'
    yt, zt = 0.2, 1.9
    PIVO = (0, yt, zt)
    loft([(yt - 1.9, 1.6, 0.6, 0.05, 0, zt + 0.25, 3.2), (yt - 1.2, 2.25, 0.78, 0.05, 0, zt + 0.25, 3.4), (yt - 0.2, 2.45, 0.8, 0.05, 0, zt + 0.25, 3.6),
          (yt + 0.8, 2.35, 0.76, 0.05, 0, zt + 0.25, 3.2), (yt + 1.25, 1.9, 0.62, 0.05, 0, zt + 0.25, 2.6)], od, 28)
    caixa((1.05, 0.35, 0.68), (0, yt + 1.35, zt + 0.48), od, 0.06)
    cilindro(0.085, 0.075, 4.3, (0, yt + 3.6, zt + 0.48), od, 'Y', 18)                # canhão 90 mm M3
    cilindro(0.13, 0.13, 0.45, (0, yt + 5.9, zt + 0.48), od2, 'Y', 16, bevel=0.01)     # freio de boca
    caixa((0.3, 0.3, 0.12), (0, yt + 5.9, zt + 0.48), escuro, 0.01)
    cilindro(0.02, 0.02, 0.3, (0.3, yt + 1.6, zt + 0.48), escuro, 'Y', 8)
    cilindro(0.4, 0.42, 0.22, (-0.5, yt - 0.3, zt + 1.1), od, 'Z', 20, bevel=0.01)
    for k in range(6): caixa((0.08, 0.06, 0.08), (-0.5 + 0.38 * math.cos(k), yt - 0.3 + 0.38 * math.sin(k), zt + 1.2), escuro, 0.01)
    caixa((0.5, 0.5, 0.05), (0.5, yt - 0.2, zt + 1.04), od2, 0.02)
    cilindro(0.02, 0.02, 0.55, (0.5, yt - 0.7, zt + 1.3), aco, 'Z', 8)
    caixa((0.12, 0.6, 0.14), (0.5, yt - 0.65, zt + 1.6), escuro, 0.01)
    cilindro(0.022, 0.022, 1.0, (0.5, yt + 0.1, zt + 1.62), escuro, 'Y', 8)
    caixa((2.0, 0.6, 0.45), (0, yt - 2.05, zt + 0.5), od2, 0.03)                       # bagageiro traseiro
    cilindro(0.01, 0.014, 2.2, (-0.9, yt - 1.6, zt + 1.6), aco, 'Z', 6)
    for sx in (-1, 1): estrela_aliada((sx * 1.2, yt - 0.3, zt + 0.55), 0.26, (sx, 0, 0.05), (0, 0, 1), T, anel=False)
    return 'tanque'


def priest():
    """M7 Priest: obuseiro autopropulsado de 105 mm no chassi do Sherman, com o 'púlpito' da metralhadora .50"""
    global PARTE, PIVO
    PARTE = 'corpo'
    T = tintas_ww2()
    od, od2, aco, escuro = T['od'], T['od2'], T['aco'], T['escuro']
    L = 6.02
    y0, y1 = -L / 2, L / 2
    casco([(sx * 0.9, y, z) for sx in (-1, 1) for (y, z) in [(y0 + 0.1, 0.45), (y0, 1.05), (y1 - 0.4, 1.05), (y1 - 0.05, 0.75), (y1 - 0.3, 0.45)]], od, 0.05)
    cilindro(0.38, 0.38, 2.4, (0, y1 - 0.35, 0.78), od, 'X', 24, bevel=0.02)
    # superestrutura aberta: paredes finas em volta do compartimento de combate
    casco([(sx * 1.4, y, z) for sx in (-1, 1) for (y, z) in [(y0 + 0.15, 1.05), (y0, 1.75), (y0 + 2.2, 1.75), (y0 + 2.2, 1.05)]], od, 0.03)
    for sx in (-1, 1):
        caixa((0.05, 3.0, 0.75), (sx * 1.38, y1 - 2.0, 1.85), od, 0.01)
        caixa((0.18, 2.8, 0.55), (sx * 1.25, y1 - 2.0, 1.65), od2, 0.02)                # paióis de munição
    casco([(sx * 1.4, y, z) for sx in (-1, 1) for (y, z) in [(y1 - 0.2, 1.05), (y1 - 0.5, 2.2), (y1 - 0.75, 2.2), (y1 - 0.75, 1.05)]], od, 0.03)
    caixa((2.6, 2.8, 0.05), (0, y1 - 2.0, 1.15), escuro, 0.01)                          # piso
    # púlpito da .50 (anel circular à direita)
    cilindro(0.45, 0.45, 0.85, (0.85, y1 - 0.9, 1.9), od, 'Z', 24)
    cilindro(0.47, 0.47, 0.06, (0.85, y1 - 0.9, 2.35), aco, 'Z', 24)
    caixa((0.12, 0.7, 0.14), (0.85, y1 - 0.6, 2.5), escuro, 0.01)
    cilindro(0.022, 0.022, 1.0, (0.85, y1 + 0.1, 2.52), escuro, 'Y', 8)
    for sx in (-1, 1):
        esteira_vvss(T, sx * 1.07, L - 0.2)
        estrela_aliada((sx * 1.41, y0 + 1.0, 1.45), 0.3, (sx, 0, 0), (0, 0, 1), T)
        cilindro(0.09, 0.09, 0.12, (sx * 0.95, y1 - 0.55, 1.4), T['farol'], 'Y', 14)
    # ---- obuseiro 105 mm M2A1 (peça que aponta) ----
    PARTE = 'torre'
    yt, zt = 0.3, 1.2
    PIVO = (-0.15, yt, zt)
    caixa((0.75, 1.0, 0.55), (-0.15, yt + 0.2, zt + 0.65), od2, 0.03)                   # berço e recuperador
    caixa((0.95, 0.12, 0.85), (-0.15, yt + 0.85, zt + 0.75), od, 0.02)                 # escudo
    cilindro(0.075, 0.07, 2.3, (-0.15, yt + 1.95, zt + 0.85), od, 'Y', 18)
    cilindro(0.09, 0.09, 0.12, (-0.15, yt + 3.1, zt + 0.85), od2, 'Y', 16)
    cilindro(0.06, 0.06, 1.0, (-0.15, yt + 0.6, zt + 0.62), aco, 'Y', 12)
    return 'tanque'


# =====================================================================
#   VEÍCULOS DE RODAS
# =====================================================================
def roda_ww2(T, x, y, z, r, larg, dupla=False):
    for k in ([-0.55, 0.55] if dupla else [0]):
        xx = x + k * larg
        cilindro(r, r, larg, (xx, y, z), T['borracha'], 'X', 16 if LEVE else 24, bevel=0.03)
        for j in range(0 if LEVE else 14):
            a = 2 * math.pi * j / 14
            caixa((larg * 0.85, 0.06, 0.03), (xx, y + math.cos(a) * r, z + math.sin(a) * r), T['borracha'], 0.006, rot=(a + math.pi / 2, 0, 0))
    lado = 1 if x > 0 else -1
    xo = x + lado * (larg * (1.05 if dupla else 0.5))
    cilindro(r * 0.62, r * 0.62, 0.04, (xo, y, z), T['od'], 'X', 18)                   # aro "combat rim"
    cilindro(r * 0.22, r * 0.26, 0.1, (xo + lado * 0.03, y, z), T['od2'], 'X', 12)
    for j in range(6):
        a = 2 * math.pi * j / 6
        cilindro(0.018, 0.018, 0.04, (xo + lado * 0.02, y + math.cos(a) * r * 0.42, z + math.sin(a) * r * 0.42), T['aco'], 'X', 6)


def jeep():
    """Willys MB (1/4 ton 4x4): o Jeep, com metralhadora Browning M1919 .30 no pedestal"""
    global PARTE, PIVO
    PARTE = 'corpo'
    T = tintas_ww2()
    od, od2, aco, escuro = T['od'], T['od2'], T['aco'], T['escuro']
    L = 3.36
    y0, y1 = -L / 2, L / 2
    caixa((0.75, L - 0.3, 0.15), (0, 0, 0.5), escuro, 0.02)                              # chassi
    # carroceria: banheira de lados retos, capô plano, grade de 9 fendas
    casco([(sx * 0.66, y, z) for sx in (-1, 1) for (y, z) in [(y0 + 0.05, 0.55), (y0, 0.95), (0.4, 0.95), (0.42, 0.55)]], od, 0.03)
    for sx in (-1, 1): caixa((0.03, 0.42, 0.2), (sx * 0.665, -0.05, 0.86), od2, 0.01)   # recorte da porta (sem porta)
    casco([(sx * 0.5, y, z) for sx in (-1, 1) for (y, z) in [(0.4, 0.62), (0.4, 1.0), (y1 - 0.25, 0.97), (y1 - 0.25, 0.62)]], od, 0.03)
    caixa((1.0, 0.06, 0.5), (0, y1 - 0.22, 0.78), od, 0.01)
    for k in range(9): caixa((0.035, 0.04, 0.33), (-0.32 + k * 0.08, y1 - 0.18, 0.78), escuro, 0.004)
    for sx in (-1, 1):
        cilindro(0.08, 0.08, 0.06, (sx * 0.4, y1 - 0.17, 0.82), T['farol'], 'Y', 14)
        # para-lamas planos
        caixa((0.36, 0.95, 0.03), (sx * 0.66, y1 - 0.6, 0.92), od, 0.01)
        caixa((0.36, 0.32, 0.03), (sx * 0.66, y1 - 0.02, 0.84), od, 0.01, rot=(-0.55, 0, 0))
        caixa((0.36, 0.55, 0.03), (sx * 0.66, y0 + 0.4, 0.92), od, 0.01)
        for y in (y1 - 0.6, y0 + 0.55): roda_ww2(T, sx * 0.62, y, 0.37, 0.37, 0.18)
    estrela_aliada((0, y1 - 0.6, 1.0), 0.24, (0, 0.05, 1), (0, 1, 0), T, anel=True)     # estrela no capô
    for sx in (-1, 1): estrela_aliada((sx * 0.665, y0 + 0.75, 0.78), 0.12, (sx, 0, 0), (0, 0, 1), T, anel=False)
    # para-brisa rebatível (moldura e dois vidros)
    for sx in (-1, 1):
        caixa((0.6, 0.05, 0.38), (sx * 0.31, 0.42, 1.2), material('cabine_j', (0.05, 0.08, 0.08), vidro=True), 0.005)
    caixa((1.3, 0.06, 0.05), (0, 0.42, 1.4), od, 0.01); caixa((1.3, 0.06, 0.05), (0, 0.42, 1.0), od, 0.01)
    for sx in (-1, 1): caixa((0.05, 0.06, 0.45), (sx * 0.64, 0.42, 1.2), od, 0.01)
    # bancos, volante, estepe, galão e pá
    for sx in (-0.32, 0.32): caixa((0.42, 0.42, 0.1), (sx, -0.1, 0.92), T['lona'], 0.04); caixa((0.42, 0.08, 0.38), (sx, -0.32, 1.1), T['lona'], 0.03)
    caixa((1.1, 0.4, 0.1), (0, y0 + 0.35, 0.92), T['lona'], 0.04)
    cilindro(0.17, 0.17, 0.025, (0.32, 0.2, 1.2), escuro, Matrix.Rotation(-0.9, 3, 'X'), 20)
    cilindro(0.33, 0.33, 0.16, (0.3, y0 - 0.12, 0.75), T['borracha'], 'Y', 22, bevel=0.02)
    caixa((0.15, 0.3, 0.42), (-0.4, y0 - 0.08, 0.78), od2, 0.03)
    # ---- pedestal com a .30 ----
    PARTE = 'torre'
    yt, zt = -0.55, 0.95
    PIVO = (0, yt, zt)
    cilindro(0.04, 0.05, 0.6, (0, yt, zt + 0.3), aco, 'Z', 10)
    caixa((0.1, 0.55, 0.13), (0, yt + 0.1, zt + 0.66), escuro, 0.01)
    cilindro(0.022, 0.022, 0.65, (0, yt + 0.68, zt + 0.68), escuro, 'Y', 8)
    caixa((0.08, 0.18, 0.15), (0.1, yt + 0.05, zt + 0.6), od2, 0.01)
    return 'blindado'


def halftrack():
    """M3 meia-lagarta: rodas na frente, lagartas atrás, carroceria blindada aberta para 10 soldados e .50 no anel"""
    global PARTE, PIVO
    PARTE = 'corpo'
    T = tintas_ww2()
    od, od2, aco, escuro = T['od'], T['od2'], T['aco'], T['escuro']
    L = 6.18
    y0, y1 = -L / 2, L / 2
    caixa((0.9, L - 0.5, 0.2), (0, 0.1, 0.62), escuro, 0.02)
    # rolo de para-choque, capô blindado com veneziana, cabine com para-brisa blindado rebatido
    cilindro(0.2, 0.2, 1.9, (0, y1 - 0.15, 0.75), od2, 'X', 18)
    casco([(sx * 0.62, y, z) for sx in (-1, 1) for (y, z) in [(y1 - 0.4, 0.75), (y1 - 0.4, 1.45), (y1 - 1.75, 1.6), (y1 - 1.75, 0.75)]], od, 0.03)
    caixa((0.95, 0.06, 0.6), (0, y1 - 0.37, 1.1), escuro, 0.01)
    for k in range(10): caixa((0.85, 0.05, 0.03), (0, y1 - 0.34, 0.85 + k * 0.055), od2, 0.003)
    # cabine + compartimento de tropas (paredes blindadas, aberto em cima)
    yb, ym = y0, y1 - 1.75                                                               # caixa aberta: piso e 4 paredes de 6 mm
    caixa((2.16, ym - yb, 0.25), (0, (yb + ym) / 2, 1.07), od, 0.02)
    for sx in (-1, 1): caixa((0.06, ym - yb, 0.95), (sx * 1.05, (yb + ym) / 2, 1.42), od, 0.01)
    caixa((2.16, 0.06, 0.95), (0, yb + 0.03, 1.42), od, 0.01)
    caixa((2.16, 0.06, 0.95), (0, ym - 0.03, 1.42), od, 0.01)
    caixa((2.0, ym - yb - 0.2, 0.02), (0, (yb + ym) / 2, 1.2), od2, 0.005)
    caixa((1.2, 0.08, 0.38), (0, y1 - 1.78, 2.05), od, 0.01, rot=(0.15, 0, 0))          # para-brisa blindado
    for sx in (-1, 1):
        caixa((0.05, L - 2.3, 0.04), (sx * 1.09, (y0 + y1 - 1.75) / 2, 1.9), aco, 0.005)
        # para-lamas dianteiros arredondados e rodas
        caixa((0.4, 1.2, 0.04), (sx * 0.85, y1 - 1.0, 1.25), od, 0.01)
        roda_ww2(T, sx * 0.82, y1 - 1.0, 0.45, 0.45, 0.25)
        cilindro(0.09, 0.09, 0.1, (sx * 0.62, y1 - 0.42, 1.5), T['farol'], 'Y', 14)
        # lagarta de borracha (roda motriz na frente, guia atrás, 4 rodas de apoio)
        rodas = [(-0.35 - i * 0.48, 0.3, 0.22) for i in range(4)] + [(0.45, 0.42, 0.28), (y0 + 0.55, 0.42, 0.28), (-0.9, 0.62, 0.07)]
        esteira(sx * 0.88, 0.3, rodas, T['borracha'], od, aco)
        caixa((0.45, 2.4, 0.04), (sx * 0.88, -0.65, 0.8), od, 0.01)
        estrela_aliada((sx * 1.085, -0.9, 1.45), 0.25, (sx, 0, 0), (0, 0, 1), T, anel=False)
        caixa((0.06, 0.6, 0.3), (sx * 1.12, y0 + 1.0, 1.4), od2, 0.02)                 # porta-minas lateral
    # porta traseira, bancos, galões
    caixa((0.6, 0.05, 0.85), (0, y0 - 0.02, 1.4), od2, 0.01)
    for sx in (-0.78, 0.78): caixa((0.35, 2.3, 0.1), (sx, -0.95, 1.45), T['lona'], 0.02); caixa((0.08, 2.3, 0.35), (sx * 1.25, -0.95, 1.65), T['lona'], 0.02)
    for sx in (-0.55, 0.55): caixa((0.15, 0.28, 0.4), (sx, y0 - 0.15, 1.25), od2, 0.02)
    estrela_aliada((0, y1 - 1.1, 1.53), 0.22, (0, 0.15, 1), (0, 1, 0), T)
    # ---- .50 M2 no pedestal (anel de patins) ----
    PARTE = 'torre'
    yt, zt = y1 - 2.05, 1.9
    PIVO = (0, yt, zt)
    cilindro(0.04, 0.06, 0.55, (0, yt, zt + 0.27), aco, 'Z', 10)
    caixa((0.13, 0.75, 0.16), (0, yt + 0.1, zt + 0.62), escuro, 0.01)
    cilindro(0.025, 0.025, 1.0, (0, yt + 0.95, zt + 0.64), escuro, 'Y', 8)
    caixa((0.12, 0.22, 0.18), (0.13, yt, zt + 0.55), od2, 0.01)
    return 'blindado'


def gmc():
    """GMC CCKW 352 '2½ ton' 6x6 ('Jimmy' / 'Deuce and a half') com cabine de lona e carroceria coberta"""
    global PARTE, PIVO
    PARTE = 'corpo'
    T = tintas_ww2()
    od, od2, aco, escuro, lona = T['od'], T['od2'], T['aco'], T['escuro'], T['lona']
    L = 6.9
    y0, y1 = -L / 2, L / 2
    caixa((0.95, L - 0.6, 0.22), (0, -0.1, 0.85), escuro, 0.02)
    # capô e para-lamas arredondados, grade com protetor
    casco([(sx * 0.52, y, z) for sx in (-1, 1) for (y, z) in [(y1 - 0.25, 1.0), (y1 - 0.25, 1.62), (y1 - 1.55, 1.7), (y1 - 1.55, 1.0)]], od, 0.05)
    caixa((0.95, 0.06, 0.62), (0, y1 - 0.22, 1.3), escuro, 0.01)
    for k in range(12): caixa((0.03, 0.05, 0.58), (-0.42 + k * 0.077, y1 - 0.18, 1.3), od2, 0.003)
    caixa((2.2, 0.15, 0.18), (0, y1 + 0.02, 0.9), od, 0.02)
    for sx in (-1, 1):
        loft([(y1 - 1.45, 0.62, 0.32, 0.01, sx * 0.83, 1.1, 2.2), (y1 - 0.9, 0.62, 0.36, 0.01, sx * 0.83, 1.12, 2.2), (y1 - 0.35, 0.55, 0.22, 0.01, sx * 0.83, 1.05, 2.0)], od, 16)
        cilindro(0.1, 0.1, 0.12, (sx * 0.6, y1 - 0.35, 1.48), T['farol'], 'Y', 14)
    # cabine: painel e portas em aço, teto de lona, para-brisa dividido
    casco([(sx * 1.0, y, z) for sx in (-1, 1) for (y, z) in [(y1 - 1.55, 1.0), (y1 - 1.55, 1.85), (y1 - 2.65, 1.85), (y1 - 2.65, 1.0)]], od, 0.03)
    caixa((2.0, 1.15, 0.5), (0, y1 - 2.1, 2.3), lona, 0.08)
    for sx in (-1, 1):
        caixa((0.82, 0.05, 0.42), (sx * 0.45, y1 - 1.57, 2.05), material('cabine_j', (0.05, 0.08, 0.08), vidro=True), 0.005)
        caixa((0.05, 0.6, 0.35), (sx * 1.0, y1 - 2.0, 2.05), material('cabine_j', (0.05, 0.08, 0.08), vidro=True), 0.005)
        estrela_aliada((sx * 1.005, y1 - 2.1, 1.4), 0.2, (sx, 0, 0), (0, 0, 1), T, anel=False)
    estrela_aliada((0, y1 - 0.9, 1.7), 0.22, (0, 0.06, 1), (0, 1, 0), T)
    # carroceria de madeira/aço com cobertura de lona sobre arcos
    yc0, yc1 = y0 + 0.05, y1 - 2.8
    caixa((2.24, yc1 - yc0, 0.12), (0, (yc0 + yc1) / 2, 1.28), od2, 0.02)
    for sx in (-1, 1): caixa((0.05, yc1 - yc0, 0.55), (sx * 1.11, (yc0 + yc1) / 2, 1.6), od, 0.01)
    caixa((2.24, 0.05, 0.55), (0, yc0, 1.6), od, 0.01)
    loft([(yc0, 2.26, 1.05, 0.01, 0, 1.9, 4.0), (yc1, 2.26, 1.05, 0.01, 0, 1.9, 4.0)], lona, 20)
    for k in range(5): loft([(yc0 + 0.3 + k * (yc1 - yc0 - 0.6) / 4 - 0.03, 2.29, 1.07, 0.01, 0, 1.9, 4.0), (yc0 + 0.3 + k * (yc1 - yc0 - 0.6) / 4 + 0.03, 2.29, 1.07, 0.01, 0, 1.9, 4.0)], T['lona'], 20)
    # rodas: 1 eixo na frente e 2 atrás (rodado duplo)
    for sx in (-1, 1):
        roda_ww2(T, sx * 0.82, y1 - 0.9, 0.48, 0.48, 0.24)
        for y in (y0 + 1.95, y0 + 0.75): roda_ww2(T, sx * 0.78, y, 0.48, 0.48, 0.22, dupla=True)
        caixa((0.6, 2.2, 0.04), (sx * 0.9, y0 + 1.35, 1.07), od, 0.01)
        caixa((0.35, 0.5, 0.35), (sx * 0.9, y1 - 2.4, 0.95), od2, 0.02)                # tanque e caixa de ferramentas
    cilindro(0.47, 0.47, 0.24, (0, y1 - 2.9, 1.15), T['borracha'], 'X', 20)            # estepe atrás da cabine
    # ---- metralhadora .50 no anel da cabine ----
    PARTE = 'torre'
    yt, zt = y1 - 2.3, 2.55
    PIVO = (0.45, yt, zt)
    cilindro(0.45, 0.45, 0.05, (0.45, yt, zt), aco, 'Z', 24)
    caixa((0.12, 0.7, 0.15), (0.45, yt + 0.1, zt + 0.2), escuro, 0.01)
    cilindro(0.024, 0.024, 0.9, (0.45, yt + 0.85, zt + 0.22), escuro, 'Y', 8)
    return 'blindado'


# =====================================================================
#   AVIÕES (todos em atitude de voo nivelado; trem de pouso é peça separada que recolhe)
# =====================================================================
def tintas_aviao(estilo):
    T = dict(
        metal=material('aluminio', (0.55, 0.56, 0.57), 0.35, 0.85, sujeira=0.12),
        od=material('od_aviao', (0.075, 0.08, 0.035), 0.75, sujeira=0.2),
        cinza=material('cinza_neutro', (0.22, 0.23, 0.23), 0.7, sujeira=0.15),
        azul_mar=material('azul_mar', (0.012, 0.022, 0.06), 0.35, 0.2, sujeira=0.12),
        azul=material('azul_ins', (0.01, 0.02, 0.12), 0.6, sujeira=0),
        branco=material('branco_ins', (0.8, 0.8, 0.78), 0.6, sujeira=0),
        preto=material('preto', (0.012, 0.012, 0.012), 0.6, sujeira=0.05),
        amarelo=material('amarelo', (0.7, 0.45, 0.02), 0.5, sujeira=0),
        vermelho=material('vermelho', (0.5, 0.02, 0.02), 0.5, sujeira=0),
        escuro=material('escuro', (0.02, 0.02, 0.02), 0.5, 0.4, sujeira=0.1),
        trem=material('trem', (0.4, 0.41, 0.4), 0.4, 0.6, sujeira=0.2),
        borracha=material('pneu', (0.025, 0.025, 0.025), 0.9, sujeira=0),
        helice=material('helice', (0.015, 0.015, 0.015), 0.5, 0.3, sujeira=0),
        cabine=material('cabine', (0.35, 0.42, 0.45), vidro=True),
        cromo=material('cromo', (0.6, 0.6, 0.6), 0.2, 1.0, sujeira=0),
    )
    return T


def faixas_invasao(c0, larg=0.46):
    """5 faixas (branco, preto, branco, preto, branco) do Dia D, a partir de c0"""
    return [(c0 + i * larg, c0 + (i + 1) * larg, i % 2) for i in range(5)]


def asa_com_faixas(T, raiz, ponta, base, x_faixa, sx, extra=None, n_meio=None):
    """asa trapezoidal raiz->ponta com faixas de invasão começando em x_faixa (ou sem, se None)"""
    def est(x):
        t = (x - raiz[0]) / (ponta[0] - raiz[0])
        return lerp_secao(raiz, ponta, t)
    xs = [raiz[0]]
    mats = []
    if x_faixa is not None:
        fx = faixas_invasao(x_faixa)
        xs.append(fx[0][0]); mats.append(base)
        for a, b, i in fx: xs.append(b); mats.append(T['branco'] if i == 0 else T['preto'])
    xs.append(ponta[0]); mats.append(base)
    if extra:      # ponta pintada (ex.: amarelo)
        xs.insert(-1, ponta[0] - extra[0]); mats.append(extra[1])
    asa([est(x) for x in xs], mats, sx)


def p51():
    """North American P-51D Mustang: alumínio sem pintura, painel antirreflexo verde-oliva, faixas de invasão"""
    global PARTE
    PARTE = 'corpo'
    PIVOS.clear()
    T = tintas_aviao('p51')
    met, od = T['metal'], T['od']
    zc = 1.9                                    # eixo da fuselagem
    sec = [(-5.0, 0.12, 0.25, 0.1, 0, zc + 0.15, 2.0), (-4.2, 0.4, 0.62, 0.28, 0, zc + 0.15, 2.1), (-2.5, 0.72, 0.62, 0.42, 0, zc + 0.08, 2.2),
           (-0.6, 0.92, 0.66, 0.6, 0, zc + 0.02, 2.3), (0.8, 0.98, 0.62, 0.62, 0, zc, 2.4), (2.6, 1.0, 0.58, 0.55, 0, zc, 2.4),
           (3.9, 0.9, 0.5, 0.48, 0, zc, 2.3), (4.65, 0.7, 0.4, 0.4, 0, zc, 2.2)]
    fuselagem(sec, [(-2.6, -2.6 + 0.46, T['branco']), (-2.14, -1.68, T['preto']), (-1.68, -1.22, T['branco']), (-1.22, -0.76, T['preto']), (-0.76, -0.3, T['branco']),
                    ], met, 28)
    loft([(2.0, 0.42, 0.03, 0.0, 0, zc + 0.555, 2.0), (3.9, 0.42, 0.03, 0.0, 0, zc + 0.5, 2.0), (4.6, 0.3, 0.03, 0.0, 0, zc + 0.4, 2.0)], od, 12)   # painel antirreflexo
    loft([(4.3, 0.93, 0.47, 0.47, 0, zc, 2.25), (4.66, 0.72, 0.41, 0.41, 0, zc, 2.2)], T['vermelho'], 28)   # faixa vermelha no nariz
    # radiador ventral (a "barriga" do Mustang)
    loft([(-1.6, 0.06, 0.02, 0.02, 0, zc - 0.55, 2.0), (-0.9, 0.5, 0.05, 0.3, 0, zc - 0.6, 2.4), (0.2, 0.6, 0.05, 0.45, 0, zc - 0.6, 2.6), (0.9, 0.62, 0.05, 0.5, 0, zc - 0.62, 2.6), (1.2, 0.6, 0.05, 0.45, 0, zc - 0.62, 2.6)], met, 20)
    cilindro(0.26, 0.26, 0.03, (0, 1.22, zc - 0.98), T['escuro'], 'Y', 18)
    # canopi em bolha (vidro) e escapamentos
    loft([(-0.1, 0.1, 0.05, 0.02, 0, zc + 0.6, 2.0), (0.5, 0.62, 0.45, 0.02, 0, zc + 0.62, 2.2), (1.5, 0.6, 0.42, 0.02, 0, zc + 0.62, 2.2), (2.2, 0.3, 0.12, 0.02, 0, zc + 0.6, 2.0)], T['cabine'], 20)
    for sx in (-1, 1):
        for k in range(6): cilindro(0.04, 0.05, 0.12, (sx * 0.43, 3.6 - k * 0.2, zc + 0.15), T['escuro'], 'X', 8)
    # asas (perfil laminar, diedro 5°) com faixas de invasão; pontas e estabilizadores
    d = math.tan(math.radians(5))
    for sx in (-1, 1):
        asa_com_faixas(T, (0.45, 1.75, 2.75, zc - 0.45, 0.15), (5.64, 0.75, 1.15, zc - 0.45 + 5.2 * d, 0.1), met, 1.9, sx)
        asa([(0.2, -3.6, 1.35, zc + 0.12, 0.1), (2.05, -4.15, 0.75, zc + 0.12, 0.09)], [met], sx)
        insignia_aviao((sx * 4.0, 1.12, zc - 0.45 + 3.6 * d + 0.12), 0.38, (0, 0, 1), (0, 1, 0), T['azul'], T['branco'])
        insignia_aviao((sx * 0.5, -1.7, zc + 0.02), 0.32, (sx, 0, 0), (0, 0, 1), T['azul'], T['branco'])
        # metralhadoras .50 (3 em cada asa)
        for k in range(3): cilindro(0.02, 0.02, 0.35, (sx * (2.0 + k * 0.22), 1.8, zc - 0.43), T['escuro'], 'Y', 6)
    # deriva vertical (eixo z): estações em altura
    asa([(zc + 0.2, -3.25, 1.95, 0, 0.09), (zc + 1.9, -4.35, 0.75, 0, 0.08)], [met], eixo='z')
    loft([(-2.4, 0.08, 0.6, 0.02, 0, zc + 0.3, 2.0), (-1.3, 0.04, 0.05, 0.02, 0, zc + 0.35, 2.0)], met, 8)   # filete dorsal
    caixa((0.02, 0.3, 0.25), (0, -4.6, zc + 1.3), T['preto'], 0.002)
    # hélice Hamilton Standard de 4 pás (3,4 m)
    helice('helice', (0, 4.75, zc + 0.02), 1.7, 4, T['helice'], T['metal'], ponta=T['amarelo'])
    # trem de pouso
    PARTE = 'trem'
    for sx in (-1, 1): roda_aviao(sx * 1.75, 1.1, 0.36, 0.36, 0.17, T, (sx * 1.7, 1.2, zc - 0.5))
    roda_aviao(0, -3.6, 0.95, 0.15, 0.08, T, (0, -3.6, zc - 0.3))
    return 'aviao'


def p47():
    """Republic P-47D Thunderbolt 'Jug': verde-oliva sobre cinza, motor radial na carenagem redonda, hélice de 4 pás"""
    global PARTE
    PARTE = 'corpo'
    PIVOS.clear()
    T = tintas_aviao('p47')
    od, cz = T['od'], T['cinza']
    zc = 2.05
    sec = [(-5.6, 0.15, 0.2, 0.15, 0, zc + 0.1, 2.0), (-4.6, 0.5, 0.65, 0.35, 0, zc + 0.1, 2.1), (-2.5, 1.0, 0.75, 0.62, 0, zc + 0.05, 2.2),
           (-0.3, 1.25, 0.82, 0.85, 0, zc, 2.3), (2.0, 1.4, 0.8, 0.85, 0, zc, 2.4), (3.6, 1.45, 0.72, 0.72, 0, zc, 2.3), (4.6, 1.42, 0.7, 0.7, 0, zc, 2.2), (4.9, 1.2, 0.6, 0.6, 0, zc, 2.1)]
    fuselagem(sec, [(-3.2 + i * 0.46, -2.74 + i * 0.46, T['branco'] if i % 2 == 0 else T['preto']) for i in range(5)], od, 28)
    cilindro(0.55, 0.55, 0.05, (0, 4.92, zc), T['escuro'], 'Y', 24)                    # motor radial (frente escura)
    for k in range(18):
        a = 2 * math.pi * k / 18
        caixa((0.08, 0.1, 0.32), (math.cos(a) * 0.38, 4.88, zc + math.sin(a) * 0.38), T['cinza'], 0.01, rot=(0, -a, 0))
    loft([(4.5, 1.44, 0.72, 0.72, 0, zc, 2.2), (4.95, 1.42, 0.7, 0.7, 0, zc, 2.2)], T['branco'], 28)   # faixa branca no nariz (Europa)
    loft([(0.2, 0.15, 0.05, 0.02, 0, zc + 0.75, 2.0), (0.9, 0.7, 0.5, 0.02, 0, zc + 0.76, 2.2), (2.0, 0.68, 0.46, 0.02, 0, zc + 0.75, 2.2), (2.7, 0.3, 0.12, 0.02, 0, zc + 0.72, 2.0)], T['cabine'], 20)
    loft([(-4.0, 0.12, 0.55, 0.02, 0, zc + 0.45, 2.0), (0.2, 0.25, 0.32, 0.02, 0, zc + 0.6, 2.0)], od, 8)
    d = math.tan(math.radians(4))
    for sx in (-1, 1):
        asa_com_faixas(T, (0.6, 1.9, 2.9, zc - 0.55, 0.16), (6.2, 0.9, 1.35, zc - 0.55 + 5.6 * d, 0.1), od, 2.0, sx)
        asa([(0.25, -4.0, 1.5, zc + 0.15, 0.1), (2.4, -4.6, 0.9, zc + 0.15, 0.09)], [od], sx)
        insignia_aviao((sx * 4.6, 1.2, zc - 0.55 + 4.0 * d + 0.14), 0.42, (0, 0, 1), (0, 1, 0), T['azul'], T['branco'])
        insignia_aviao((sx * 0.68, -2.0, zc), 0.38, (sx, 0, 0), (0, 0, 1), T['azul'], T['branco'])
        for k in range(4): cilindro(0.02, 0.02, 0.4, (sx * (2.5 + k * 0.22), 1.95, zc - 0.53), T['escuro'], 'Y', 6)
        # bomba de 500 lb sob a asa
        loft([(1.3, 0.05, 0.03, 0.03, sx * 2.4, zc - 1.05, 2.0), (1.0, 0.36, 0.18, 0.18, sx * 2.4, zc - 1.05, 2.0), (-0.1, 0.36, 0.18, 0.18, sx * 2.4, zc - 1.05, 2.0), (-0.5, 0.1, 0.05, 0.05, sx * 2.4, zc - 1.05, 2.0)], od, 14)
    asa([(zc + 0.25, -3.9, 2.0, 0, 0.09), (zc + 2.0, -5.0, 0.95, 0, 0.08)], [od], eixo='z')
    caixa((0.02, 0.7, 0.35), (0, -5.0, zc + 1.4), T['branco'], 0.002)                   # faixa branca na deriva
    loft([(-1.0, 0.85, 0.05, 0.4, 0, zc - 0.7, 2.4), (0.6, 0.9, 0.05, 0.45, 0, zc - 0.72, 2.4), (1.2, 0.5, 0.05, 0.2, 0, zc - 0.72, 2.0)], cz, 16)   # tanque ventral
    helice('helice', (0, 5.0, zc), 2.0, 4, T['helice'], T['branco'], corda=0.3, ponta=T['amarelo'])
    PARTE = 'trem'
    for sx in (-1, 1): roda_aviao(sx * 2.4, 1.3, 0.42, 0.42, 0.2, T, (sx * 2.3, 1.4, zc - 0.6))
    roda_aviao(0, -4.2, 1.0, 0.18, 0.1, T, (0, -4.2, zc - 0.4))
    return 'aviao'


def corsair():
    """Vought F4U-1D Corsair da Marinha/Fuzileiros: azul-marinho brilhante e asa de gaivota invertida"""
    global PARTE
    PARTE = 'corpo'
    PIVOS.clear()
    T = tintas_aviao('corsair')
    az = T['azul_mar']
    zc = 2.0
    sec = [(-5.1, 0.12, 0.25, 0.12, 0, zc + 0.15, 2.0), (-4.2, 0.45, 0.6, 0.3, 0, zc + 0.12, 2.1), (-2.0, 0.92, 0.7, 0.6, 0, zc + 0.05, 2.2),
           (0.4, 1.18, 0.78, 0.75, 0, zc, 2.3), (2.5, 1.3, 0.74, 0.74, 0, zc, 2.3), (4.2, 1.32, 0.68, 0.68, 0, zc, 2.2), (5.0, 1.25, 0.64, 0.64, 0, zc, 2.1)]
    fuselagem(sec, [], az, 28)
    cilindro(0.5, 0.5, 0.05, (0, 5.02, zc), T['escuro'], 'Y', 24)
    for k in range(18):
        a = 2 * math.pi * k / 18
        caixa((0.08, 0.1, 0.3), (math.cos(a) * 0.36, 4.98, zc + math.sin(a) * 0.36), T['cinza'], 0.01, rot=(0, -a, 0))
    # cabine bem para trás (o nariz comprido tapava a visão do piloto)
    loft([(-0.9, 0.15, 0.05, 0.02, 0, zc + 0.7, 2.0), (-0.3, 0.68, 0.48, 0.02, 0, zc + 0.72, 2.2), (0.6, 0.66, 0.44, 0.02, 0, zc + 0.72, 2.2), (1.2, 0.3, 0.12, 0.02, 0, zc + 0.7, 2.0)], T['cabine'], 20)
    for sx in (-1, 1):
        # asa de gaivota invertida: painel interno desce (-15°), externo sobe (+9°)
        x1 = 1.65
        z1 = zc - 0.5 - x1 * math.tan(math.radians(15))
        asa([(0.5, 1.4, 2.6, zc - 0.5, 0.17), (x1, 1.25, 2.4, z1, 0.15)], [az], sx)
        asa([(x1, 1.25, 2.4, z1, 0.15), (6.25, 0.55, 1.2, z1 + (6.25 - x1) * math.tan(math.radians(9)), 0.1)], [az], sx)
        insignia_aviao((sx * 4.3, 0.95, z1 + (4.3 - x1) * math.tan(math.radians(9)) + 0.13), 0.42, (0, 0, 1), (0, 1, 0), T['azul'], T['branco'])
        insignia_aviao((sx * 0.62, -2.0, zc), 0.36, (sx, 0, 0), (0, 0, 1), T['azul'], T['branco'])
        asa([(0.3, -3.8, 1.6, zc + 0.05, 0.1), (2.6, -4.4, 0.9, zc + 0.05, 0.09)], [az], sx)
        for k in range(3): cilindro(0.02, 0.02, 0.35, (sx * (2.4 + k * 0.22), 1.25, z1 + 0.1), T['escuro'], 'Y', 6)
        # foguetes HVAR sob a asa externa
        for k in range(2):
            xx = sx * (3.0 + k * 0.55)
            cilindro(0.06, 0.06, 1.7, (xx, 0.4, z1 + (abs(xx) - x1) * math.tan(math.radians(9)) - 0.25), T['cinza'], 'Y', 8)
    asa([(zc + 0.25, -3.7, 2.0, 0, 0.09), (zc + 1.9, -4.75, 1.0, 0, 0.08)], [az], eixo='z')
    caixa((0.03, 0.5, 0.25), (0, -4.6, zc + 1.2), T['branco'], 0.002)
    helice('helice', (0, 5.1, zc), 2.0, 3, T['helice'], az, corda=0.3, ponta=T['amarelo'])
    PARTE = 'trem'
    for sx in (-1, 1): roda_aviao(sx * 1.65, 1.6, 0.4, 0.4, 0.18, T, (sx * 1.65, 1.5, zc - 1.0))
    roda_aviao(0, -4.2, 1.0, 0.15, 0.08, T, (0, -4.2, zc - 0.4))
    caixa((0.05, 0.8, 0.05), (0, -4.6, zc - 0.25), T['trem'], 0.01, rot=(0.4, 0, 0))     # gancho de parada
    return 'aviao'


def b25():
    """North American B-25J Mitchell: bimotor de bombardeio médio, deriva dupla, nariz envidraçado"""
    global PARTE
    PARTE = 'corpo'
    PIVOS.clear()
    T = tintas_aviao('b25')
    od, cz = T['od'], T['cinza']
    zc = 2.4
    sec = [(-8.1, 0.2, 0.3, 0.25, 0, zc + 0.2, 2.0), (-6.5, 0.8, 0.6, 0.55, 0, zc + 0.15, 2.4), (-3.0, 1.35, 0.85, 0.85, 0, zc, 2.6),
           (1.0, 1.45, 0.95, 0.9, 0, zc, 2.7), (4.5, 1.45, 0.95, 0.88, 0, zc, 2.6), (6.6, 1.3, 0.75, 0.72, 0, zc - 0.05, 2.3), (7.6, 1.0, 0.55, 0.55, 0, zc - 0.1, 2.1)]
    fuselagem(sec, [], od, 28)
    loft([(7.5, 1.0, 0.55, 0.55, 0, zc - 0.1, 2.1), (8.0, 0.75, 0.42, 0.42, 0, zc - 0.12, 2.0), (8.25, 0.15, 0.1, 0.1, 0, zc - 0.15, 2.0)], T['cabine'], 20)   # nariz envidraçado
    loft([(4.4, 0.3, 0.05, 0.02, 0, zc + 0.85, 2.0), (5.0, 1.2, 0.45, 0.02, 0, zc + 0.85, 2.2), (6.0, 1.15, 0.35, 0.02, 0, zc + 0.75, 2.2), (6.5, 0.6, 0.05, 0.02, 0, zc + 0.7, 2.0)], T['cabine'], 20)
    cilindro(0.55, 0.6, 0.55, (0, 2.6, zc + 1.0), od, 'Z', 18)                           # torre dorsal com .50 duplas
    loft([(2.2, 0.6, 0.02, 0.02, 0, zc + 1.28, 2.0), (2.6, 1.0, 0.4, 0.02, 0, zc + 1.28, 2.0), (3.0, 0.6, 0.02, 0.02, 0, zc + 1.28, 2.0)], T['cabine'], 16)
    for sx in (-0.12, 0.12): cilindro(0.02, 0.02, 1.1, (sx, 3.2, zc + 1.45), T['escuro'], 'Y', 6)
    for k in range(4): cilindro(0.025, 0.025, 0.5, (-0.25 + k * 0.17, 7.4, zc - 0.35), T['escuro'], 'Y', 6)   # metralhadoras do nariz
    d = math.tan(math.radians(4))
    for sx in (-1, 1):
        asa([(0.6, 2.4, 3.6, zc - 0.25, 0.17), (3.0, 2.3, 3.3, zc - 0.25 + 2.4 * d * 3, 0.15)], [od], sx)
        asa([(3.0, 2.3, 3.3, zc - 0.25 + 2.4 * d * 3, 0.15), (10.3, 0.7, 1.4, zc - 0.25 + 2.4 * d * 3 - 7.3 * math.tan(math.radians(1.5)), 0.1)], [od], sx)
        insignia_aviao((sx * 7.0, 1.0, zc - 0.25 + 2.4 * d * 3 + 0.14), 0.55, (0, 0, 1), (0, 1, 0), T['azul'], T['branco'])
        insignia_aviao((sx * 0.73, -3.4, zc), 0.45, (sx, 0, 0), (0, 0, 1), T['azul'], T['branco'])
        # naceles dos motores Wright R-2600 (radiais) e escapamentos
        xm = sx * 3.0; zm = zc - 0.05 + 2.4 * d * 3 - 0.2 * 0
        loft([(-1.7, 0.2, 0.15, 0.15, xm, zm, 2.0), (-0.5, 1.0, 0.55, 0.65, xm, zm, 2.2), (2.0, 1.35, 0.68, 0.7, xm, zm, 2.2), (3.6, 1.42, 0.7, 0.7, xm, zm, 2.2), (4.1, 1.3, 0.62, 0.62, xm, zm, 2.1)], od, 24)
        cilindro(0.5, 0.5, 0.04, (xm, 4.12, zm), T['escuro'], 'Y', 22)
        helice('helice' if sx < 0 else 'helice2', (xm, 4.2, zm), 1.85, 3, T['helice'], od, corda=0.3, ponta=T['amarelo'])
        # estabilizador horizontal com as duas derivas nas pontas
        asa([(0.4, -6.1, 2.0, zc + 0.3, 0.09), (3.3, -6.6, 1.3, zc + 0.3, 0.08)], [od], sx)
        asa([(zc - 0.55, -6.2, 1.9, sx * 3.25, 0.08), (zc + 1.6, -6.4, 1.6, sx * 3.25, 0.08)], [od], eixo='z')
    caixa((0.6, 1.3, 0.5), (0, -7.6, zc + 0.05), T['cabine'], 0.08)                     # posto do metralhador de cauda
    PARTE = 'trem'
    for sx in (-1, 1): roda_aviao(sx * 3.0, 1.4, 0.55, 0.55, 0.25, T, (sx * 3.0, 1.5, zc - 0.6))
    roda_aviao(0, 6.0, 0.4, 0.35, 0.16, T, (0, 6.0, zc - 0.7))
    return 'aviao'


# =====================================================================
#   BARCOS
# =====================================================================
def lcvp():
    """LCVP 'Higgins boat': casco de madeira, rampa de aço na proa, leva 36 soldados; 2 metralhadoras .30 na popa"""
    global PARTE, PIVO
    PARTE = 'corpo'
    T = tintas_ww2()
    cinza = material('cinza_naval', (0.13, 0.15, 0.17), 0.7, sujeira=0.3)
    cinza2 = material('cinza_naval2', (0.09, 0.1, 0.12), 0.7, sujeira=0.3)
    L, B = 10.9, 3.3
    y0, y1 = -L / 2, L / 2
    # casco: fundo plano, laterais retas, popa larga
    casco([(sx * x, y, z) for sx in (-1, 1) for (x, y, z) in [(1.4, y0, 0.2), (B / 2, y0, 1.6), (1.35, y1 - 1.7, 0.0), (B / 2, y1 - 1.7, 1.7), (1.4, y1 - 0.6, 0.25), (B / 2, y1 - 0.6, 1.75)]], cinza, 0.05)
    caixa((B - 0.3, L - 2.5, 0.2), (0, -0.6, 1.55), T['escuro'], 0.02)                    # porão aberto (escuro)
    for sx in (-1, 1): caixa((0.08, L - 0.8, 0.14), (sx * (B / 2 - 0.02), -0.3, 1.72), cinza2, 0.02)   # amurada
    # rampa da proa (aço) e alojamento do motor/timoneiro na popa
    caixa((2.9, 0.16, 1.55), (0, y1 - 0.45, 1.0), cinza2, 0.03, rot=(0.2, 0, 0))
    for k in range(5): caixa((2.7, 0.04, 0.05), (0, y1 - 0.35, 0.45 + k * 0.28), T['aco'], 0.005, rot=(0.2, 0, 0))
    caixa((B - 0.2, 2.2, 0.55), (0, y0 + 1.1, 1.85), cinza, 0.04)
    caixa((0.9, 0.7, 0.5), (0.7, y0 + 1.2, 2.35), cinza2, 0.04)                           # posto do timoneiro
    for sx in (-1, 1):
        cilindro(0.15, 0.15, 0.5, (sx * 1.1, y0 + 1.6, 2.25), cinza2, 'Z', 14)           # anéis das metralhadoras
        caixa((0.08, 0.6, 0.12), (sx * 1.1, y0 + 1.9, 2.6), T['escuro'], 0.01)
        cilindro(0.018, 0.018, 0.55, (sx * 1.1, y0 + 2.45, 2.62), T['escuro'], 'Y', 8)
    PARTE = 'torre'
    PIVO = (0, 0, 1.7)
    caixa((0.02, 0.02, 0.02), (0, 0, 1.7), cinza, 0)
    return 'barco'


def pt_boat():
    """Lancha torpedeira PT (Elco 80'): casco de mogno, 4 tubos de torpedo Mk 18, torres com .50 duplas, canhão Oerlikon 20 mm"""
    global PARTE, PIVO
    PARTE = 'corpo'
    T = tintas_ww2()
    verde = material('verde_pt', (0.04, 0.07, 0.04), 0.6, sujeira=0.25)
    verde2 = material('verde_pt2', (0.025, 0.045, 0.025), 0.6, sujeira=0.25)
    cinza = material('cinza_pt', (0.12, 0.13, 0.13), 0.6, sujeira=0.2)
    L, B = 24.4, 6.3
    y0, y1 = -L / 2, L / 2
    casco([(sx * x, y, z) for sx in (-1, 1) for (x, y, z) in [(2.6, y0, 0.3), (B / 2, y0, 2.0), (2.7, 0, -0.05), (B / 2, 0, 2.2), (1.0, y1 - 2.0, 0.6), (2.2, y1 - 2.5, 2.4), (0.15, y1, 1.6), (0.25, y1, 2.55)]], verde, 0.08)
    caixa((B - 0.4, L - 4.0, 0.06), (0, -1.2, 2.18), cinza, 0.01)                        # convés
    # casaria (ponte de comando) com para-brisa e mastro
    casco([(sx * x, y, z) for sx in (-1, 1) for (x, y, z) in [(1.4, 1.0, 2.15), (1.4, 1.0, 3.2), (1.2, 4.6, 2.2), (1.0, 4.0, 3.05)]], verde2, 0.05)
    caixa((1.9, 0.05, 0.35), (0, 3.95, 3.3), material('cabine_j', (0.05, 0.08, 0.08), vidro=True), 0.005, rot=(-0.6, 0, 0))
    cilindro(0.05, 0.05, 4.0, (0, 1.6, 5.0), cinza, 'Z', 8)
    caixa((1.2, 0.05, 0.05), (0, 1.6, 6.0), cinza, 0.01)
    cilindro(0.35, 0.3, 0.3, (0, 1.6, 6.5), cinza, 'Z', 14)                              # radar SO
    for sx in (-1, 1):
        # tubos de torpedo / torpedos Mk 13 nos berços
        for k in (0.75, 2.2):
            cilindro(0.27, 0.27, 5.5, (sx * k, -4.0 + (0.8 if k > 1 else 0), 2.55), cinza, 'Y', 16)
            loft([(-1.0 + (0.8 if k > 1 else 0) + 1.85, 0.54, 0.27, 0.27, sx * k, 2.55, 2.0), (-1.0 + (0.8 if k > 1 else 0) + 2.15, 0.1, 0.05, 0.05, sx * k, 2.55, 2.0)], cinza, 14)
        # torres de .50 duplas
        cilindro(0.55, 0.55, 0.9, (sx * 1.6, 0.0, 2.6), cinza, 'Z', 18)
        for d in (-0.12, 0.12): cilindro(0.025, 0.025, 1.2, (sx * 1.6 + d, 0.8, 3.2), T['escuro'], 'Y', 8)
    # canhão de 20 mm na popa e 37 mm na proa
    cilindro(0.35, 0.45, 0.5, (0, y0 + 2.0, 2.45), cinza, 'Z', 14)
    caixa((0.6, 0.1, 0.5), (0, y0 + 2.2, 2.9), cinza, 0.02)
    cilindro(0.04, 0.04, 2.0, (0, y0 + 3.0, 3.0), T['escuro'], 'Y', 8)
    cilindro(0.35, 0.4, 0.4, (0, y1 - 4.5, 2.6), cinza, 'Z', 14)
    cilindro(0.06, 0.06, 2.2, (0, y1 - 3.3, 2.95), T['escuro'], 'Y', 10)
    # número no casco
    for sx in (-1, 1): caixa((0.02, 1.4, 0.45), (sx * (B / 2 - 0.25), y1 - 5.0, 2.0), T['branco'], 0.002)
    PARTE = 'torre'
    PIVO = (0, 0, 2.2)
    caixa((0.02, 0.02, 0.02), (0, 0, 2.2), cinza, 0)
    return 'barco'


FAB = {'sherman': sherman, 'pershing': pershing, 'priest': priest, 'jeep': jeep, 'halftrack': halftrack, 'gmc': gmc,
       'p51': p51, 'p47': p47, 'corsair': corsair, 'b25': b25, 'lcvp': lcvp, 'pt': pt_boat}


# ---------------- cena e foto ----------------
def fotografar(nome, tipo, out, amostras=48):
    sc = bpy.context.scene
    chao_m = material('chao', (0.16, 0.15, 0.12), 0.9, sujeira=0)
    bpy.ops.mesh.primitive_plane_add(size=300, location=(0, 0, 0)); bpy.context.object.data.materials.append(chao_m)
    sc.world = bpy.data.worlds.new('ceu'); sc.world.use_nodes = True
    bg = sc.world.node_tree.nodes['Background']; bg.inputs['Color'].default_value = (0.5, 0.62, 0.8, 1); bg.inputs['Strength'].default_value = 0.6
    sol = bpy.data.objects.new('sol', bpy.data.lights.new('sol', 'SUN')); sol.data.energy = 3.2; sol.data.angle = math.radians(3)
    sol.rotation_euler = (math.radians(50), 0, math.radians(215)); sc.collection.objects.link(sol)
    cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
    cam.data.lens = 50
    k = {'tanque': 1.0, 'blindado': 0.85, 'aviao': 1.9, 'barco': 2.6}[tipo]
    if nome in ('jeep',): k = 0.55
    if nome in ('b25', 'pt'): k *= 1.5
    alvo, pos = Vector((0, 0.3, 1.3 * min(1.4, k))), Vector((10.5 * k, 11.0 * k, 5.5 * k))
    cam.location = pos; cam.rotation_euler = (alvo - pos).to_track_quat('-Z', 'Y').to_euler()
    sc.render.engine = 'CYCLES'; sc.cycles.samples = amostras; sc.cycles.use_denoising = True; sc.cycles.device = 'CPU'
    sc.view_settings.view_transform = 'AgX'
    sc.render.resolution_x = 960; sc.render.resolution_y = 600
    sc.render.filepath = os.path.join(out, nome + '.png')
    bpy.ops.render.render(write_still=True)


if __name__ == '__main__' and '--' in sys.argv and not globals().get('SO_FUNCOES'):
    ARGS2 = sys.argv[sys.argv.index('--') + 1:]
    OUT2 = ARGS2[0]; os.makedirs(OUT2, exist_ok=True)
    for nome in ARGS2[1:] or list(FAB):
        bpy.ops.wm.read_factory_settings(use_empty=True)
        random.seed(1)
        tipo = FAB[nome]()
        fotografar(nome, tipo, OUT2)
        print('ok', nome)
