"""Construção procedural do M4A3(75)W Sherman no Blender (em metros, Z para cima, frente em -Y).

Lado direito do tanque = -X (escotilha do comandante, metralhadora do casco); esquerdo = +X.
Medidas reais: altura 2,94 m, largura 2,62 m, comprimento do casco ~5,9 m, bitola 2,11 m,
vão livre 0,43 m, eixo do canhão a 2,24 m, anel da torre de 1,75 m.
"""
import math

import bpy
from mathutils import Matrix, Vector

I4 = Matrix.Identity(4)
TORRE_Y, TORRE_Z = -0.55, 1.88        # centro do anel da torre
MUNHAO = (0.0, TORRE_Y - 0.80, 2.24)   # eixo de elevação do canhão
BITOLA = 1.055                          # meia distância entre os centros das esteiras
RODAS_Z = 0.32
BOGIES = (-1.5, 0.0, 1.5)
MOTRIZ = (-2.45, 0.62, 0.33)            # y, z, raio
GUIA = (2.55, 0.46, 0.28)


def T(x, y, z):
    return Matrix.Translation((x, y, z))


def R(ang, eixo):
    return Matrix.Rotation(math.radians(ang), 4, eixo)


# ====================================================================== geometria
class Geo:
    """Acumula vértices e faces (com a orientação certa) para virar um objeto."""

    def __init__(self):
        self.v, self.f, self.sm = [], [], []

    def _add(self, verts, faces, M, smooth):
        o = len(self.v)
        self.v += [tuple(M @ Vector(p)) for p in verts]
        self.f += [tuple(i + o for i in fc) for fc in faces]
        self.sm += [smooth] * len(faces)

    def caixa(self, centro, tam, M=I4):
        cx, cy, cz = centro
        a, b, c = (t / 2 for t in tam)
        vs = [(cx + sx * a, cy + sy * b, cz + sz * c) for sx in (-1, 1) for sy in (-1, 1) for sz in (-1, 1)]
        fs = [(4, 6, 7, 5), (2, 0, 1, 3), (2, 3, 7, 6), (0, 4, 5, 1), (1, 5, 7, 3), (0, 2, 6, 4)]
        self._add(vs, fs, M, False)

    def caixa_de(self, de, ate, M=I4):
        self.caixa([(de[i] + ate[i]) / 2 for i in range(3)], [abs(ate[i] - de[i]) for i in range(3)], M)

    def torno(self, perfil, segs=32, M=I4, liso=True, fase=0.0):
        """Sólido de revolução em volta do eixo Z local; perfil = [(raio, z)] de baixo para cima."""
        ang = [2 * math.pi * k / segs + fase for k in range(segs)]
        for j in range(len(perfil) - 1):
            (r0, z0), (r1, z1) = perfil[j], perfil[j + 1]
            vs, fs = [], []

            def anel(r, z):
                if r < 1e-9:
                    vs.append((0, 0, z))
                    return [len(vs) - 1] * segs
                base = len(vs)
                vs.extend((r * math.cos(a), r * math.sin(a), z) for a in ang)
                return [base + k for k in range(segs)]
            a0, a1 = anel(r0, z0), anel(r1, z1)
            for k in range(segs):
                k2 = (k + 1) % segs
                q = [a0[k], a0[k2], a1[k2], a1[k]]
                q = [x for i, x in enumerate(q) if x not in q[:i]]
                if len(q) >= 3:
                    fs.append(tuple(q))
            self._add(vs, fs, M, liso)

    def prisma(self, perfil_yz, x0, x1, M=I4):
        """Polígono no plano YZ extrudado de x0 a x1."""
        area = sum(perfil_yz[i][0] * perfil_yz[(i + 1) % len(perfil_yz)][1]
                   - perfil_yz[(i + 1) % len(perfil_yz)][0] * perfil_yz[i][1] for i in range(len(perfil_yz)))
        p = perfil_yz if area > 0 else perfil_yz[::-1]
        n = len(p)
        vs = [(x0, y, z) for y, z in p] + [(x1, y, z) for y, z in p]
        fs = [tuple(range(n, 2 * n)), tuple(range(n - 1, -1, -1))]
        fs += [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
        self._add(vs, fs, M, False)

    def loft(self, aneis, tampa_cima=True, tampa_baixo=True, M=I4):
        """Superfície lisa ligando anéis (listas de pontos 3D anti-horários vistos de cima)."""
        n = len(aneis[0])
        vs = [p for anel in aneis for p in anel]
        fs = []
        for j in range(len(aneis) - 1):
            for k in range(n):
                k2 = (k + 1) % n
                fs.append((j * n + k, j * n + k2, (j + 1) * n + k2, (j + 1) * n + k))
        self._add(vs, fs, M, True)
        if tampa_cima:
            topo = aneis[-1]
            c = tuple(sum(p[i] for p in topo) / n for i in range(3))
            self._add(list(topo) + [c], [(k, (k + 1) % n, n) for k in range(n)], M, True)
        if tampa_baixo:
            b = aneis[0]
            c = tuple(sum(p[i] for p in b) / n for i in range(3))
            self._add(list(b) + [c], [(n, (k + 1) % n, k) for k in range(n)], M, False)

    def malha(self, verts, faces, M=I4, liso=False):
        self._add(verts, faces, M, liso)


# ====================================================================== materiais
def _no(nt, tipo, x, y, **props):
    n = nt.nodes.new(tipo)
    n.location = (x, y)
    for k, v in props.items():
        setattr(n, k, v)
    return n


def material(nome, cor, rugosidade=0.6, metal=0.0, tinta=False, lama=False, emissao=None):
    if nome in bpy.data.materials:
        return bpy.data.materials[nome]
    m = bpy.data.materials.new(nome)
    m.use_nodes = True
    nt = m.node_tree
    bsdf = nt.nodes['Principled BSDF']
    bsdf.inputs['Roughness'].default_value = rugosidade
    bsdf.inputs['Metallic'].default_value = metal
    m.diffuse_color = (*cor, 1)
    if emissao:
        bsdf.inputs['Emission Color'].default_value = (*emissao, 1)
        bsdf.inputs['Emission Strength'].default_value = 0.8
    if not tinta:
        bsdf.inputs['Base Color'].default_value = (*cor, 1)
        return m
    # tinta verde-oliva desbotada com manchas, arranhões e lama subindo do chão
    coord = _no(nt, 'ShaderNodeTexCoord', -1400, 0)
    ruido = _no(nt, 'ShaderNodeTexNoise', -1150, 200)
    ruido.inputs['Scale'].default_value = 3.5
    ruido.inputs['Detail'].default_value = 8
    nt.links.new(coord.outputs['Object'], ruido.inputs['Vector'])
    rampa = _no(nt, 'ShaderNodeValToRGB', -900, 200)
    rampa.color_ramp.elements[0].position = 0.35
    rampa.color_ramp.elements[0].color = (*[c * 0.72 for c in cor], 1)
    rampa.color_ramp.elements[1].position = 0.7
    rampa.color_ramp.elements[1].color = (*[min(1, c * 1.25) for c in cor], 1)
    nt.links.new(ruido.outputs['Fac'], rampa.inputs['Fac'])
    cor_final = rampa.outputs['Color']
    risco = _no(nt, 'ShaderNodeTexNoise', -1150, -200)
    risco.inputs['Scale'].default_value = 40
    risco.inputs['Detail'].default_value = 2
    nt.links.new(coord.outputs['Object'], risco.inputs['Vector'])
    rampa_r = _no(nt, 'ShaderNodeValToRGB', -900, -200)
    rampa_r.color_ramp.elements[0].position = 0.68
    rampa_r.color_ramp.elements[1].position = 0.72
    nt.links.new(risco.outputs['Fac'], rampa_r.inputs['Fac'])
    mix_r = _no(nt, 'ShaderNodeMix', -600, 100, data_type='RGBA')
    nt.links.new(rampa_r.outputs['Color'], mix_r.inputs[0])
    nt.links.new(cor_final, mix_r.inputs[6])
    mix_r.inputs[7].default_value = (0.09, 0.085, 0.07, 1)  # metal escuro aparecendo
    mix_r.inputs[0].default_value = 0.0
    cor_final = mix_r.outputs[2]
    if lama:
        geo = _no(nt, 'ShaderNodeNewGeometry', -1400, -500)
        sep = _no(nt, 'ShaderNodeSeparateXYZ', -1150, -500)
        nt.links.new(geo.outputs['Position'], sep.inputs[0])
        faixa = _no(nt, 'ShaderNodeMapRange', -900, -500)
        faixa.inputs['From Min'].default_value = 1.25
        faixa.inputs['From Max'].default_value = 0.35
        nt.links.new(sep.outputs['Z'], faixa.inputs['Value'])
        ruido_l = _no(nt, 'ShaderNodeTexNoise', -900, -750)
        ruido_l.inputs['Scale'].default_value = 7
        nt.links.new(coord.outputs['Object'], ruido_l.inputs['Vector'])
        mult = _no(nt, 'ShaderNodeMath', -650, -550, operation='MULTIPLY')
        nt.links.new(faixa.outputs['Result'], mult.inputs[0])
        nt.links.new(ruido_l.outputs['Fac'], mult.inputs[1])
        degrau = _no(nt, 'ShaderNodeMapRange', -450, -550)
        degrau.inputs['From Min'].default_value = 0.2
        degrau.inputs['From Max'].default_value = 0.55
        nt.links.new(mult.outputs[0], degrau.inputs['Value'])
        mix_l = _no(nt, 'ShaderNodeMix', -250, 0, data_type='RGBA')
        nt.links.new(degrau.outputs['Result'], mix_l.inputs[0])
        nt.links.new(cor_final, mix_l.inputs[6])
        mix_l.inputs[7].default_value = (0.16, 0.12, 0.075, 1)
        cor_final = mix_l.outputs[2]
    nt.links.new(cor_final, bsdf.inputs['Base Color'])
    bump = _no(nt, 'ShaderNodeBump', -250, -300)
    bump.inputs['Strength'].default_value = 0.12
    nt.links.new(ruido.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    return m


def materiais():
    od = (0.105, 0.115, 0.045)
    return {
        'od': material('Sherman verde-oliva', od, 0.62, tinta=True),
        'od_lama': material('Sherman verde-oliva com lama', od, 0.7, tinta=True, lama=True),
        'od_esc': material('Sherman verde escuro', (0.055, 0.06, 0.025), 0.6, tinta=True),
        'borracha': material('Borracha', (0.018, 0.018, 0.017), 0.85),
        'aco': material('Aço', (0.06, 0.06, 0.058), 0.45, metal=0.85),
        'aco_claro': material('Aço gasto', (0.3, 0.3, 0.29), 0.35, metal=0.9),
        'esteira': material('Esteira', (0.05, 0.047, 0.04), 0.7, metal=0.4, lama=True, tinta=True),
        'vidro': material('Vidro', (0.05, 0.09, 0.11), 0.05, metal=0.3),
        'madeira': material('Madeira', (0.32, 0.18, 0.08), 0.7),
        'latao': material('Latão', (0.6, 0.42, 0.12), 0.3, metal=1.0),
        'branco': material('Tinta branca', (0.75, 0.74, 0.68), 0.55),
        'farol': material('Farol', (0.8, 0.78, 0.6), 0.1, emissao=(1.0, 0.95, 0.75)),
        'lanterna': material('Lanterna', (0.5, 0.03, 0.02), 0.2),
        'cabo': material('Cabo de aço', (0.12, 0.11, 0.1), 0.6, metal=0.6),
    }


# ====================================================================== objetos
class Montador:
    def __init__(self, colecao, opcoes):
        self.col = colecao
        self.op = opcoes
        self.mat = materiais()
        self.origens = {}
        self.raiz = self.vazio('Sherman M4A3(75)W', None, (0, 0, 0))

    def vazio(self, nome, pai, origem):
        e = bpy.data.objects.new(nome, None)
        e.empty_display_type = 'PLAIN_AXES'
        e.empty_display_size = 0.5
        self.col.objects.link(e)
        self._prender(e, pai, origem)
        return e

    def _prender(self, ob, pai, origem):
        self.origens[ob.name] = Vector(origem)
        if pai is not None:
            ob.parent = pai
            ob.location = Vector(origem) - self.origens[pai.name]
        else:
            ob.location = origem

    def obj(self, nome, geo, mat, pai=None, origem=(0, 0, 0), chanfro=0.0, segmentos=2):
        o = Vector(origem)
        me = bpy.data.meshes.new(nome)
        me.from_pydata([tuple(Vector(p) - o) for p in geo.v], [], geo.f)
        me.update(calc_edges=True)
        me.polygons.foreach_set('use_smooth', geo.sm)
        me.materials.append(self.mat[mat])
        ob = bpy.data.objects.new(nome, me)
        self.col.objects.link(ob)
        self._prender(ob, pai or self.raiz, o)
        if chanfro:
            b = ob.modifiers.new('Chanfro', 'BEVEL')
            b.width = chanfro
            b.segments = segmentos
            b.limit_method = 'ANGLE'
            b.angle_limit = math.radians(35)
            b.harden_normals = False
        return ob


# ====================================================================== partes
def casco(m, cas):
    # casco inferior (entre as esteiras) com o nariz da transmissão fundido e arredondado
    nariz = [(-2.56, 1.22), (-2.68, 1.18), (-2.78, 1.1), (-2.86, 0.99), (-2.92, 0.86), (-2.94, 0.74), (-2.92, 0.63),
             (-2.86, 0.53), (-2.76, 0.46), (-2.62, 0.43)]
    g = Geo()
    g.prisma(nariz + [(2.8, 0.43), (2.88, 0.55), (2.88, 1.08), (-2.0, 1.08), (-2.56, 1.22)][:-1], -0.84, 0.84)
    m.obj('Casco inferior e transmissão', g, 'od_lama', cas, chanfro=0.03, segmentos=3)
    g = Geo()  # flange parafusada da transmissão
    g.prisma([(-2.62, 1.205), (-2.56, 1.24), (-2.5, 1.24), (-2.5, 1.205)], -0.86, 0.86)
    for k in range(13):
        x = -0.78 + k * 0.13
        g.torno([(0, 0), (0.018, 0), (0.018, 0.02), (0, 0.022)], 8, T(x, -2.53, 1.24))
    m.obj('Flange da transmissão', g, 'od', cas, chanfro=0.005)
    # casco superior soldado: placa frontal a 47°, sponsons sobre as esteiras, traseira
    perfil = [(-2.56, 1.2), (-1.82, 1.88), (2.78, 1.88), (2.88, 1.8), (2.88, 1.06), (-2.08, 1.06)]
    g = Geo()
    g.prisma(perfil, -1.25, 1.25)
    m.obj('Casco superior', g, 'od', cas, chanfro=0.025, segmentos=3)
    g = Geo()  # cordões de solda nas arestas
    for x in (-1.25, 1.25):
        g.prisma([(-2.56, 1.2), (-1.82, 1.88), (-1.79, 1.86), (-2.53, 1.18)], x - 0.015, x + 0.015)
    g.caixa_de((-1.24, -1.82, 1.875), (1.24, 2.76, 1.895))
    m.obj('Teto do casco', g, 'od', cas)
    # elos de esteira de reserva presos na placa frontal
    g = Geo()
    ang = math.degrees(math.atan2(0.68, 0.74))
    for i in range(7):
        x = -0.66 + i * 0.22
        M = T(x, -2.17, 1.56) @ R(ang, 'X')
        g.caixa((0, 0, 0.025), (0.19, 0.15, 0.04), M)
        for dx in (-0.06, 0.06):
            g.caixa((dx, 0, 0.055), (0.04, 0.13, 0.025), M)
    m.obj('Elos de reserva', g, 'esteira', cas, chanfro=0.008)
    g = Geo()
    for x in (-0.8, 0.8):
        M = T(x, -2.17, 1.56) @ R(ang, 'X')
        g.caixa((0, 0, 0.02), (0.05, 0.4, 0.03), M)
    m.obj('Suportes dos elos', g, 'od_esc', cas)
    # metralhadora .30 do casco (lado direito) em bola blindada
    M = T(-0.42, -2.21, 1.53) @ R(ang + 30, 'X')
    g = Geo()
    g.torno([(0, -0.02), (0.1, -0.02), (0.125, 0.03), (0.11, 0.08), (0, 0.09)], 24, M)
    m.obj('Bola da metralhadora', g, 'od', cas)
    g = Geo()
    g.torno([(0, 0), (0.028, 0), (0.028, 0.18), (0.016, 0.2), (0.016, 0.52), (0, 0.52)], 12, M @ T(0, 0, 0.06))
    m.obj('Metralhadora .30', g, 'aco', cas)
    # faróis com grades de proteção
    for x in (-1.0, 1.0):
        g = Geo()
        g.torno([(0, 0), (0.085, 0), (0.09, 0.08), (0, 0.08)], 20, T(x, -1.9, 1.8) @ R(90, 'X'))
        m.obj(f'Farol {"dir" if x < 0 else "esq"}', g, 'od_esc', cas)
        g = Geo()
        g.torno([(0, 0), (0.07, 0.0), (0, 0.005)], 20, T(x, -1.985, 1.8) @ R(90, 'X'))
        m.obj(f'Lente {"dir" if x < 0 else "esq"}', g, 'farol', cas)
        g = Geo()
        for k in range(3):
            g.caixa((x - 0.1 + k * 0.1, -2.05, 1.8), (0.018, 0.018, 0.26))
        g.caixa((x, -2.05, 1.93), (0.24, 0.018, 0.018))
        g.caixa_de((x - 0.12, -2.06, 1.66), (x + 0.12, -1.9, 1.68))
        m.obj(f'Grade do farol {"dir" if x < 0 else "esq"}', g, 'od', cas)
    g = Geo()
    g.torno([(0, 0), (0.06, 0), (0.07, 0.1), (0.05, 0.14), (0, 0.15)], 16, T(-0.98, -1.68, 1.89) @ R(90, 'X'))
    m.obj('Sirene', g, 'od_esc', cas)
    # escotilhas grandes do motorista (esq.) e do auxiliar (dir.), periscópios, ventilador
    for x, nome in ((0.5, 'motorista'), (-0.5, 'auxiliar')):
        g = Geo()
        g.caixa_de((x - 0.26, -1.76, 1.895), (x + 0.26, -1.3, 1.935))
        m.obj(f'Escotilha do {nome}', g, 'od', cas, chanfro=0.012)
        g = Geo()
        g.caixa_de((x - 0.24, -1.29, 1.895), (x + 0.24, -1.23, 1.96))
        g.caixa_de((x - 0.07, -1.7, 1.93), (x + 0.07, -1.58, 2.02))
        m.obj(f'Dobradiça e periscópio do {nome}', g, 'od_esc', cas, chanfro=0.008)
        g = Geo()
        g.caixa_de((x - 0.055, -1.705, 1.945), (x + 0.055, -1.7, 2.0))
        m.obj(f'Vidro do periscópio do {nome}', g, 'vidro', cas)
    g = Geo()
    g.torno([(0, 0), (0.11, 0), (0.11, 0.03), (0.09, 0.08), (0, 0.09)], 20, T(0, -1.55, 1.89))
    m.obj('Ventilador', g, 'od_esc', cas)
    # olhais de içamento
    g = Geo()
    for x in (-1.08, 1.08):
        for y in (-1.7, 2.6):
            g.torno([(0, 0), (0.04, 0), (0.04, 0.03), (0, 0.03)], 10, T(x, y, 1.89))
            g.caixa((x, y, 1.97), (0.02, 0.1, 0.1))
    m.obj('Olhais de içamento', g, 'od_esc', cas, chanfro=0.006)
    # deque do motor: tampas, grade, tampas de combustível
    g = Geo()
    for y0 in (0.42, 1.04):
        g.caixa_de((-0.76, y0, 1.895), (0.76, y0 + 0.55, 1.92))
    m.obj('Tampas do motor', g, 'od', cas, chanfro=0.008)
    g = Geo()
    g.caixa_de((-0.8, 1.68, 1.895), (0.8, 2.74, 1.905))
    for k in range(26):
        y = 1.71 + k * 0.04
        g.caixa_de((-0.77, y, 1.905), (0.77, y + 0.014, 1.935))
    m.obj('Grade do motor', g, 'od_esc', cas)
    g = Geo()
    for x in (-0.98, 0.98):
        g.torno([(0, 0), (0.075, 0), (0.075, 0.025), (0.06, 0.035), (0, 0.035)], 16, T(x, 0.25, 1.89))
    m.obj('Tampas de combustível', g, 'od_esc', cas)
    # ferramentas de sapador com presilhas
    g = Geo()
    g.caixa_de((-1.2, 0.4, 1.9), (-1.15, 1.45, 1.94))
    g.caixa_de((-1.2, 1.9, 1.9), (-1.15, 2.62, 1.94))
    g.caixa_de((1.15, 0.4, 1.9), (1.2, 1.45, 1.94))
    g.caixa_de((1.15, 1.78, 1.9), (1.2, 2.55, 1.94))
    m.obj('Cabos de madeira', g, 'madeira', cas, chanfro=0.008)
    g = Geo()
    g.caixa_de((-1.23, 1.45, 1.9), (-1.12, 1.74, 1.92))   # pá
    g.caixa_de((-1.25, 1.84, 1.9), (-1.1, 1.96, 1.95))    # machado
    g.caixa_de((1.1, 1.45, 1.9), (1.25, 1.58, 1.99))      # marreta
    g.caixa_de((1.06, 2.5, 1.9), (1.29, 2.56, 1.945))     # picareta
    for y in (0.6, 1.2, 2.1, 2.4):
        for x in (-1.175, 1.175):
            g.caixa((x, y, 1.925), (0.1, 0.03, 0.05))
    m.obj('Ferramentas', g, 'aco_claro', cas, chanfro=0.005)
    # cabo de reboque enrolado no deque traseiro
    g = Geo()
    pts = [(-0.95 + 1.9 * t / 40, 2.8, 1.92) for t in range(41)]
    for a, b in zip(pts, pts[1:]):
        g.caixa(((a[0] + b[0]) / 2, a[1], a[2]), (0.05, 0.035, 0.035), R(0, 'X'))
    for x in (-0.95, 0.95):
        g.torno([(0, 0), (0.05, 0), (0.05, 0.08), (0, 0.08)], 12, T(x, 2.72, 1.9))
    m.obj('Cabo de reboque', g, 'cabo', cas)
    # traseira: defletor de escapamento, lanternas, ganchos, telefone da infantaria
    g = Geo()
    g.prisma([(2.88, 1.84), (3.06, 1.6), (3.1, 1.6), (2.92, 1.86)], -1.0, 1.0)
    m.obj('Defletor do escapamento', g, 'od', cas, chanfro=0.008)
    for x in (-1.06, 1.06):
        g = Geo()
        g.caixa_de((x - 0.08, 2.88, 1.6), (x + 0.08, 2.95, 1.74))
        m.obj(f'Caixa da lanterna {"dir" if x < 0 else "esq"}', g, 'od_esc', cas, chanfro=0.01)
        g = Geo()
        g.caixa_de((x - 0.05, 2.95, 1.63), (x + 0.05, 2.96, 1.71))
        m.obj(f'Lanterna {"dir" if x < 0 else "esq"}', g, 'lanterna', cas)
    g = Geo()
    for x in (-0.6, 0.6):
        g.caixa_de((x - 0.08, 2.88, 0.58), (x + 0.08, 3.06, 0.78))
    g.caixa_de((-1.02, 2.88, 1.18), (-0.8, 2.98, 1.42))
    for x in (-0.55, 0.55):  # ganchos dianteiros
        g.caixa_de((x - 0.07, -3.04, 0.6), (x + 0.07, -2.86, 0.78))
    m.obj('Ganchos e telefone', g, 'od_esc', cas, chanfro=0.015)
    # para-lamas e saias de areia
    g = Geo()
    for x0, x1 in ((0.84, 1.33), (-1.33, -0.84)):
        g.prisma([(-2.0, 1.06), (-2.78, 0.98), (-2.8, 1.0), (-2.02, 1.08)], x0, x1)
        g.prisma([(2.88, 1.06), (3.0, 1.06), (3.0, 1.08), (2.88, 1.08)], x0, x1)
    m.obj('Para-lamas', g, 'od', cas, chanfro=0.005)
    if m.op.get('saias', True):
        g = Geo()
        for x in (-1.315, 1.315):
            for i in range(5):
                y0 = -2.22 + i * 1.0
                g.caixa_de((x - 0.012, y0, 0.9), (x + 0.012, y0 + 0.97, 1.08))
                g.caixa_de((x - 0.022, y0 + 0.02, 1.05), (x + 0.022, y0 + 0.95, 1.075))
        m.obj('Saias de areia', g, 'od_lama', cas, chanfro=0.006)


def estrela_pontos(cx, cy, r):
    return [(cx + (r if k % 2 == 0 else r * 0.382) * math.cos(math.radians(90 + 36 * k)),
             cy + (r if k % 2 == 0 else r * 0.382) * math.sin(math.radians(90 + 36 * k))) for k in range(10)]


def marcas(m, cas, col):
    """Estrela branca no círculo nas laterais e número de registro do Exército."""
    g = Geo()
    for lado in (-1, 1):
        x = lado * 1.252
        cy, cz, r = -0.35, 1.47, 0.29
        pts = estrela_pontos(cy, cz, r)
        centro = len(pts)
        vs = [(x, y, z) for y, z in pts] + [(x, cy, cz)]
        fs = [(centro, k, (k + 1) % 10) if lado > 0 else (centro, (k + 1) % 10, k) for k in range(10)]
        g.malha(vs, fs)
        n = 48
        anel = [(x, cy + rr * math.cos(2 * math.pi * k / n), cz + rr * math.sin(2 * math.pi * k / n)) for rr in (r * 1.1, r * 1.22) for k in range(n)]
        fs = [(k, (k + 1) % n, n + (k + 1) % n, n + k) if lado > 0 else (n + k, n + (k + 1) % n, (k + 1) % n, k) for k in range(n)]
        g.malha(anel, fs)
    # estrela no topo da torre também (identificação aérea)
    m.obj('Estrelas', g, 'branco', cas)
    # número de registro em texto 3D convertido em malha
    for lado in (-1, 1):
        cu = bpy.data.curves.new(f'registro_{lado}', 'FONT')
        cu.body = 'USA 3081624'
        cu.size = 0.13
        cu.extrude = 0.002
        cu.align_x = 'CENTER'
        ob = bpy.data.objects.new(f'Número de registro {"esq" if lado > 0 else "dir"}', cu)
        col.objects.link(ob)
        ob.data.materials.append(m.mat['branco'])
        ob.parent = cas
        ob.location = (lado * 1.254, 0.65 if lado > 0 else 0.65, 1.42)
        ob.rotation_euler = (math.radians(90), 0, math.radians(90 if lado > 0 else -90))
        m.origens[ob.name] = Vector(ob.location)


def raio_torre(phi, h):
    """phi = 0 na frente; h de 0 (anel) a 1 (teto). Torre fundida com a traseira (bustle) saliente."""
    frente = math.cos(phi)
    r = 0.9 - 0.05 * frente + 0.13 * max(0.0, -frente) ** 3
    cai = max(0.0, (h - 0.25) / 0.75)
    r *= 1 - 0.28 * cai ** 1.8
    if h < 0.12:
        r *= 0.985 + 0.015 * h / 0.12
    # face achatada na frente, onde fica o escudo do canhão
    limite = 0.76 - 0.06 * cai
    if frente > 0.4:
        r = min(r, limite / frente)
    return r


def torre(m, cas):
    tor = m.vazio('Torre', cas, (0, TORRE_Y, TORRE_Z))
    N, H = 72, 0.86
    aneis = []
    for j in range(16):
        h = j / 15
        z = TORRE_Z + 0.02 + H * h
        anel = []
        for k in range(N):
            phi = 2 * math.pi * k / N - math.pi / 2  # começa atrás e gira anti-horário visto de cima
            # ângulo em relação à frente (-Y)
            ang_frente = math.atan2(math.cos(phi), -math.sin(phi))
            r = raio_torre(ang_frente, h)
            anel.append((r * math.cos(phi), TORRE_Y + r * math.sin(phi), z))
        aneis.append(anel)
    g = Geo()
    g.loft(aneis, tampa_cima=False, tampa_baixo=True)
    # teto levemente abaulado
    topo = aneis[-1]
    for j, s in enumerate((0.75, 0.45)):
        prox = [(p[0] * s, TORRE_Y + (p[1] - TORRE_Y) * s, p[2] + 0.025 * (j + 1)) for p in topo]
        g.loft([topo, prox], tampa_cima=(j == 1), tampa_baixo=False)
        topo = prox
    m.obj('Torre fundida', g, 'od', tor)
    g = Geo()
    g.torno([(0.9, 0), (0.97, 0), (0.97, 0.05), (0.9, 0.05)], 72, T(0, TORRE_Y, TORRE_Z - 0.03))
    m.obj('Anel da torre', g, 'od_esc', tor)
    # escudo do rotor com "orelhas" laterais
    yf = TORRE_Y - 0.76
    g = Geo()
    g.prisma([(yf + 0.02, 2.0), (yf - 0.1, 2.02), (yf - 0.12, 2.24), (yf - 0.1, 2.48), (yf + 0.02, 2.5)], -0.47, 0.47)
    m.obj('Escudo do rotor', g, 'od', tor, chanfro=0.03, segmentos=3)
    for x in (-0.47, 0.47):
        g = Geo()
        g.prisma([(yf + 0.05, 2.04), (yf - 0.1, 2.04), (yf - 0.1, 2.46), (yf + 0.05, 2.46)], x - 0.03, x + 0.03)
        m.obj(f'Orelha do rotor {"dir" if x < 0 else "esq"}', g, 'od', tor, chanfro=0.02)
    # cúpula de visão do comandante (direita), escotilha do carregador (esquerda), periscópios
    cx, cy = -0.36, TORRE_Y + 0.3
    zt = TORRE_Z + H + 0.04
    g = Geo()
    g.torno([(0, 0), (0.29, 0), (0.29, 0.05), (0.26, 0.07), (0.26, 0.15), (0.25, 0.19), (0.2, 0.22), (0, 0.23)], 36, T(cx, cy, zt - 0.02))
    m.obj('Cúpula do comandante', g, 'od', tor, chanfro=0.0)
    g = Geo()
    for k in range(6):
        a = math.radians(60 * k + 30)
        g.caixa((0, 0, 0), (0.07, 0.012, 0.045), T(cx + 0.262 * math.sin(a), cy - 0.262 * math.cos(a), zt + 0.1) @ R(-math.degrees(a), 'Z'))
    m.obj('Blocos de visão', g, 'vidro', tor)
    g = Geo()
    g.caixa_de((cx - 0.05, cy - 0.06, zt + 0.2), (cx + 0.05, cy + 0.06, zt + 0.28))
    g.torno([(0, 0), (0.24, 0), (0.24, 0.03), (0, 0.03)], 32, T(-cx, TORRE_Y + 0.08, zt + 0.0))
    m.obj('Escotilha do carregador', g, 'od', tor, chanfro=0.008)
    g = Geo()
    for x, y in ((0.35, TORRE_Y - 0.28), (-0.22, TORRE_Y - 0.4)):
        g.caixa_de((x - 0.07, y - 0.06, zt - 0.02), (x + 0.07, y + 0.06, zt + 0.07))
    g.torno([(0, 0), (0.1, 0), (0.1, 0.04), (0.08, 0.07), (0, 0.075)], 20, T(0.0, TORRE_Y + 0.45, zt))
    m.obj('Periscópios e ventilação', g, 'od_esc', tor, chanfro=0.008)
    g = Geo()
    for x, y in ((0.35, TORRE_Y - 0.28), (-0.22, TORRE_Y - 0.4)):
        g.caixa_de((x - 0.055, y - 0.065, zt), (x + 0.055, y - 0.06, zt + 0.055))
    m.obj('Vidros dos periscópios', g, 'vidro', tor)
    g = Geo()  # porta de pistola, olhais e suporte da antena
    g.caixa((0.89, TORRE_Y + 0.1, 2.25), (0.04, 0.18, 0.18), R(0, 'Z'))
    for x, y in ((-0.5, TORRE_Y - 0.25), (0.5, TORRE_Y - 0.25), (0.0, TORRE_Y + 0.82)):
        g.caixa((x, y, zt - 0.02 if y < TORRE_Y + 0.5 else 2.4), (0.03, 0.1, 0.1))
    g.torno([(0, 0), (0.06, 0), (0.06, 0.12), (0, 0.12)], 12, T(0.55, TORRE_Y + 0.68, 2.55))
    m.obj('Detalhes da torre', g, 'od_esc', tor, chanfro=0.006)
    g = Geo()
    g.torno([(0, 0), (0.008, 0), (0.004, 2.0), (0, 2.0)], 8, T(0.55, TORRE_Y + 0.68, 2.67))
    m.obj('Antena', g, 'aco', tor)
    # estrela no teto
    g = Geo()
    pts = estrela_pontos(0, TORRE_Y + 0.05, 0.22)
    z1, z0 = zt + 0.04, zt + 0.0
    vs = [(x, y, z1) for x, y in pts] + [(0, TORRE_Y + 0.05, z1)] + [(x, y, z0) for x, y in pts] + [(0, TORRE_Y + 0.05, z0)]
    fs = [(10, k, (k + 1) % 10) for k in range(10)] + [(21, 11 + (k + 1) % 10, 11 + k) for k in range(10)]
    fs += [(k, 11 + k, 11 + (k + 1) % 10, (k + 1) % 10) for k in range(10)]
    g.malha(vs, fs)
    m.obj('Estrela do teto', g, 'branco', tor)
    canhao(m, tor)
    metralhadora_50(m, tor, zt)
    return tor


def canhao(m, tor):
    can = m.vazio('Canhão', tor, MUNHAO)
    yf = TORRE_Y - 0.76
    g = Geo()  # mantlet M34A1 de face inteira, bordas arredondadas
    g.prisma([(yf - 0.1, 2.02), (yf - 0.26, 2.06), (yf - 0.28, 2.24), (yf - 0.26, 2.44), (yf - 0.1, 2.48)], -0.4, 0.4)
    m.obj('Mantlet M34A1', g, 'od', can, origem=MUNHAO, chanfro=0.05, segmentos=4)
    g = Geo()  # canhão M3 de 75 mm
    perfil = [(0, 0), (0.105, 0), (0.105, 0.22), (0.085, 0.26), (0.07, 0.3), (0.062, 0.5), (0.055, 1.6),
              (0.068, 1.62), (0.068, 1.78), (0.04, 1.78), (0.04, 1.5), (0, 1.5)]
    g.torno(perfil, 32, T(0, yf - 0.28, 2.24) @ R(90, 'X'))
    m.obj('Canhão M3 75 mm', g, 'od', can, origem=MUNHAO)
    g = Geo()
    g.torno([(0, 0), (0.022, 0), (0.022, 0.12), (0.014, 0.14), (0, 0.14)], 12, T(-0.24, yf - 0.28, 2.2) @ R(90, 'X'))
    g.caixa_de((0.24, yf - 0.3, 2.42), (0.3, yf - 0.24, 2.5))
    m.obj('Coaxial e mira', g, 'aco', can, origem=MUNHAO)


def metralhadora_50(m, tor, zt):
    base = (-0.05, TORRE_Y + 0.58, zt)
    mg = m.vazio('Metralhadora .50', tor, base)
    bx, by, bz = base
    g = Geo()
    g.torno([(0, 0), (0.035, 0), (0.03, 0.22), (0, 0.22)], 12, T(bx, by, bz))
    m.obj('Pino da .50', g, 'aco', mg, origem=base)
    g = Geo()
    g.caixa_de((bx - 0.06, by - 0.25, bz + 0.22), (bx + 0.06, by + 0.18, bz + 0.34))
    g.caixa_de((bx - 0.03, by + 0.18, bz + 0.24), (bx + 0.03, by + 0.26, bz + 0.3))
    g.torno([(0, 0), (0.035, 0), (0.035, 0.42), (0, 0.42)], 16, T(bx, by - 0.25, bz + 0.28) @ R(90, 'X'))
    for k in range(10):
        g.torno([(0.036, 0), (0.041, 0), (0.041, 0.012), (0.036, 0.012), (0.036, 0)], 12, T(bx, by - 0.28 - k * 0.04, bz + 0.28) @ R(90, 'X'))
    g.torno([(0, 0), (0.016, 0), (0.016, 0.6), (0.022, 0.6), (0.022, 0.68), (0, 0.68)], 12, T(bx, by - 0.67, bz + 0.28) @ R(90, 'X'))
    m.obj('Metralhadora M2 .50', g, 'aco', mg, origem=base)
    g = Geo()
    g.caixa_de((bx + 0.06, by - 0.1, bz + 0.16), (bx + 0.2, by + 0.12, bz + 0.32))
    m.obj('Caixa de munição .50', g, 'od_esc', mg, origem=base, chanfro=0.008)
    g = Geo()
    for k in range(7):
        g.caixa((bx + 0.05, by - 0.06 + k * 0.025, bz + 0.3), (0.05, 0.012, 0.025))
    m.obj('Fita de munição', g, 'latao', mg, origem=base)


# ---------------------------------------------------------------------- suspensão VVSS e esteiras
def perfil_roda():
    # roda estampada com pneu de borracha (de dentro para fora em X local)
    return [(0, -0.12), (0.06, -0.12), (0.17, -0.1), (0.2, -0.1)], \
           [(0.2, -0.105), (0.248, -0.105), (0.254, -0.09), (0.254, 0.09), (0.248, 0.105), (0.2, 0.105)], \
           [(0.2, 0.1), (0.17, 0.1), (0.15, 0.07), (0.1, 0.075), (0.075, 0.1), (0.05, 0.12), (0.05, 0.14), (0, 0.14)]


def suspensao(m, cas, lado):
    s = 1 if lado == 'esq' else -1
    xc = s * BITOLA
    rodas, nome_l = [], 'esquerda' if s > 0 else 'direita'
    dentro, pneu, fora = perfil_roda()
    for b, yb in enumerate(BOGIES):
        g = Geo()  # suporte do truque preso ao casco
        g.caixa_de((s * 0.84, yb - 0.24, 0.42), (s * 0.95, yb + 0.24, 0.86))
        g.caixa_de((xc - 0.17, yb - 0.21, 0.78), (xc + 0.17, yb + 0.21, 0.86))
        g.caixa_de((s * 0.92, yb - 0.08, 0.36), (xc - s * 0.13, yb + 0.08, 0.5))
        for dy in (-0.265, 0.265):  # braços até os eixos das rodas
            p0, p1 = Vector((xc - s * 0.15, yb + dy * 0.25, 0.6)), Vector((xc - s * 0.15, yb + dy, RODAS_Z))
            d = p1 - p0
            ang = math.degrees(math.atan2(d.z, d.y))
            g.caixa(((p0.x + p1.x) / 2, (p0.y + p1.y) / 2, (p0.z + p1.z) / 2), (0.07, d.length + 0.08, 0.09), T(0, 0, 0) @ I4)
            g.v[-8:] = [tuple(T(*(p0 + p1) / 2) @ R(ang, 'X') @ T(*-(p0 + p1) / 2) @ Vector(p)) for p in g.v[-8:]]
        # braço do rolete de retorno
        g.caixa_de((xc - s * 0.2, yb - 0.04, 0.84), (xc - s * 0.12, yb + 0.28, 0.92))
        m.obj(f'Truque {b + 1} {nome_l}', g, 'od_lama', cas, chanfro=0.015)
        g = Geo()  # molas volutas
        for dy in (-0.075, 0.075):
            for k in range(7):
                z = 0.5 + k * 0.04
                g.torno([(0.04, 0), (0.07, 0), (0.07, 0.03), (0.04, 0.03), (0.04, 0)], 16, T(xc - s * 0.03, yb + dy, z))
        m.obj(f'Molas {b + 1} {nome_l}', g, 'od_esc', cas)
        for r, dy in enumerate((-0.265, 0.265)):
            centro = (xc, yb + dy, RODAS_Z)
            g = Geo()
            M = T(*centro) @ R(90 * s, 'Y')
            g.torno(dentro, 32, M)
            g.torno(fora, 32, M)
            g.torno([(0.035, 0.14), (0.045, 0.145), (0.0, 0.15)], 6, M)
            for k in range(6):  # porcas do cubo
                a = 2 * math.pi * k / 6
                g.torno([(0, 0), (0.012, 0), (0.012, 0.02), (0, 0.02)], 6, M @ T(0.075 * math.cos(a), 0.075 * math.sin(a), 0.085))
            ob = m.obj(f'Roda {b + 1}{"ab"[r]} {nome_l}', g, 'od_lama', cas, origem=centro)
            g = Geo()
            g.torno(pneu, 40, M)
            m.obj(f'Pneu {b + 1}{"ab"[r]} {nome_l}', g, 'borracha', ob, origem=centro)
            rodas.append(ob)
        # rolete de retorno
        centro = (xc, yb + 0.24, 0.0)
        rodas.append(('rolete', b, centro))
    # roda motriz dentada (frente) e roda-guia (trás)
    my, mz, mr = MOTRIZ
    centro = (xc, my, mz)
    M = T(*centro) @ R(90 * s, 'Y')
    g = Geo()
    g.torno([(0, -0.16), (0.2, -0.16), (0.24, -0.12), (0.27, -0.12)], 36, M)
    g.torno([(0.27, 0.12), (0.24, 0.12), (0.2, 0.15), (0.12, 0.15), (0.1, 0.19), (0, 0.19)], 36, M)
    g.torno([(0.12, -0.13), (0.29, -0.13), (0.29, 0.13), (0.12, 0.13)], 36, M)
    for k in range(13):
        a = 360 / 13 * k
        for dz in (-0.1, 0.1):
            g.caixa((0, 0, 0), (0.09, 0.07, 0.04), M @ R(a, 'Z') @ T(mr - 0.01, 0, dz))
    for k in range(8):
        a = 2 * math.pi * k / 8
        g.torno([(0, 0), (0.015, 0), (0.015, 0.02), (0, 0.02)], 6, M @ T(0.14 * math.cos(a), 0.14 * math.sin(a), 0.15))
    motriz = m.obj(f'Roda motriz {nome_l}', g, 'od_lama', cas, origem=centro)
    g = Geo()
    g.prisma([(my - 0.25, mz - 0.2), (my + 0.35, mz - 0.25), (my + 0.45, mz + 0.05), (my + 0.05, mz + 0.22), (my - 0.2, mz + 0.15)],
             min(s * 0.84, s * 0.92), max(s * 0.84, s * 0.92))
    m.obj(f'Carcaça do diferencial {nome_l}', g, 'od_lama', cas, chanfro=0.02)
    gy, gz, gr = GUIA
    centro = (xc, gy, gz)
    M = T(*centro) @ R(90 * s, 'Y')
    g = Geo()
    g.torno([(0, -0.15), (0.1, -0.15), (0.24, -0.1), (0.28, -0.1), (0.28, -0.03), (0.2, -0.03), (0.2, 0.03),
             (0.28, 0.03), (0.28, 0.1), (0.24, 0.1), (0.1, 0.15), (0, 0.15)], 36, M)
    guia = m.obj(f'Roda-guia {nome_l}', g, 'od_lama', cas, origem=centro)
    g = Geo()
    g.caixa_de((s * 0.84, gy - 0.35, gz - 0.08), (s * 0.95, gy + 0.05, gz + 0.08))
    g.caixa_de((s * 0.9, gy - 0.02, gz - 0.05), (xc - s * 0.14, gy + 0.02, gz + 0.05))
    m.obj(f'Braço da roda-guia {nome_l}', g, 'od_lama', cas, chanfro=0.015)
    return rodas, motriz, guia


def casco_convexo(pts):
    pts = sorted(set(pts))

    def cruz(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    baixo, cima = [], []
    for p in pts:
        while len(baixo) >= 2 and cruz(baixo[-2], baixo[-1], p) <= 0:
            baixo.pop()
        baixo.append(p)
    for p in reversed(pts):
        while len(cima) >= 2 and cruz(cima[-2], cima[-1], p) <= 0:
            cima.pop()
        cima.append(p)
    return baixo[:-1] + cima[:-1]  # anti-horário


def caminho_esteira(folga=0.035):
    circ = [(MOTRIZ[0], MOTRIZ[1], MOTRIZ[2] + folga), (GUIA[0], GUIA[1], GUIA[2] + folga)]
    for yb in BOGIES:
        for dy in (-0.265, 0.265):
            circ.append((yb + dy, RODAS_Z, 0.254 + folga))
    pts = []
    for cy, cz, r in circ:
        for k in range(48):
            a = 2 * math.pi * k / 48
            pts.append((round(cy + r * math.cos(a), 5), round(cz + r * math.sin(a), 5)))
    return casco_convexo(pts)


def reamostrar(poli, passo):
    segs = [(poli[i], poli[(i + 1) % len(poli)]) for i in range(len(poli))]
    total = sum(math.dist(a, b) for a, b in segs)
    n = round(total / passo)
    passo = total / n
    saida, alvo, acum = [], 0.0, 0.0
    for a, b in segs:
        L = math.dist(a, b)
        while alvo <= acum + L and len(saida) < n:
            t = (alvo - acum) / L if L else 0
            saida.append(((a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t), ((b[0] - a[0]) / L, (b[1] - a[1]) / L)))
            alvo += passo
        acum += L
    return saida, passo


def esteira(m, cas, lado):
    s = 1 if lado == 'esq' else -1
    xc = s * BITOLA
    caminho = caminho_esteira()
    elos, passo = reamostrar(caminho, 0.152)
    g = Geo()
    for (y, z), (ty, tz) in elos:
        # eixo local: X largura, Y ao longo da esteira, Z para fora (polígono anti-horário: normal = (tz, -ty))
        Mx = Matrix(((-1, 0, 0, xc), (0, ty, tz, y), (0, tz, -ty, z), (0, 0, 0, 1)))
        g.caixa((0, 0, 0), (0.42, passo * 0.9, 0.05), Mx)                       # bloco de borracha
        for dx in (-1, 1):                                                       # garras em "V"
            g.caixa((dx * 0.1, 0, 0.032), (0.17, 0.035, 0.018), Mx @ R(dx * 18, 'Z'))
        for dx in (-0.225, 0.0, 0.225):                                          # conectores de aço
            g.caixa((dx, passo / 2, -0.005), (0.05 if dx else 0.07, 0.05, 0.06), Mx)
        g.caixa((0, 0, -0.04), (0.05, 0.08, 0.05), Mx)                           # guia central
    m.obj(f'Esteira {"esquerda" if s > 0 else "direita"}', g, 'esteira', cas)
    # roletes de retorno encostando no ramo de cima da esteira
    cima = [p for p in caminho if p[1] > 0.7]
    roletes = []
    for b, yb in enumerate(BOGIES):
        y = yb + 0.24
        viz = sorted(cima, key=lambda p: abs(p[0] - y))[:2]
        (y0, z0), (y1, z1) = sorted(viz)
        zc = z0 + (z1 - z0) * ((y - y0) / (y1 - y0) if y1 != y0 else 0) - 0.035 - 0.1
        centro = (xc, y, zc)
        g = Geo()
        M = T(*centro) @ R(90 * s, 'Y')
        g.torno([(0, -0.16), (0.1, -0.16), (0.1, 0.16), (0, 0.16)], 24, M)
        roletes.append(m.obj(f'Rolete de retorno {b + 1} {"esquerdo" if s > 0 else "direito"}', g, 'borracha', cas, origem=centro))
        g = Geo()
        g.caixa_de((xc - s * 0.2, y - 0.04, zc), (xc - s * 0.15, y + 0.04, 0.92))
        m.obj(f'Haste do rolete {b + 1} {"esquerdo" if s > 0 else "direito"}', g, 'od_lama', cas)
    return roletes


# ====================================================================== animação
def animar(m, torre_obj, canhao_obj, girar):
    sc = bpy.context.scene
    sc.frame_start, sc.frame_end = 1, 240
    for f, a in ((1, 0), (60, 35), (120, 35), (180, -30), (240, 0)):
        torre_obj.rotation_euler.z = math.radians(a)
        torre_obj.keyframe_insert('rotation_euler', index=2, frame=f)
    for f, a in ((1, 0), (60, 8), (120, 8), (180, 3), (240, 0)):
        canhao_obj.rotation_euler.x = math.radians(a)
        canhao_obj.keyframe_insert('rotation_euler', index=0, frame=f)
    for ob, raio in girar:  # rodas giram como se o tanque andasse 1 m/s
        ob.rotation_mode = 'XYZ'
        for f in (1, 240):
            dist = (f - 1) / 24
            ob.rotation_euler.x = -dist / raio
            ob.keyframe_insert('rotation_euler', index=0, frame=f)


# ====================================================================== principal
def construir_sherman(colecao=None, **opcoes):
    if colecao is None:
        colecao = bpy.data.collections.new('Sherman')
        bpy.context.scene.collection.children.link(colecao)
    m = Montador(colecao, opcoes)
    cas = m.vazio('Casco', m.raiz, (0, 0, 0))
    casco(m, cas)
    if opcoes.get('marcas', True):
        marcas(m, cas, colecao)
    tor = torre(m, cas)
    girar = []
    for lado in ('dir', 'esq'):
        rodas, motriz, guia = suspensao(m, cas, lado)
        girar += [(r, 0.254) for r in rodas if not isinstance(r, tuple)]
        girar += [(motriz, MOTRIZ[2]), (guia, GUIA[2])]
        girar += [(r, 0.1) for r in esteira(m, cas, lado)]
    can = bpy.data.objects['Canhão']
    if opcoes.get('animar', True):
        animar(m, tor, can, girar)
    return m.raiz
