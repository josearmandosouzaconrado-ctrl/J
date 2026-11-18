"""Cidade francesa de 1944 para o Blender: texturas pintadas, casas, árvores e catedrais.

Chamado por gerar_modelos.py (recebe as funções auxiliares de lá).
- Texturas: pintadas pixel a pixel aqui mesmo (numpy) e salvas em public/texturas/*.jpg.
  Paredes: 1 tile = 4 m de largura x 3 m de altura (uma janela por andar).
  Telhados: 1 tile = 2 m x 2 m.
- Casas com medidas reais (a frente fica em -Y), mapeamento UV em metros (as texturas repetem
  certinho, sem esticar). Os mesmos nomes de material são usados pelo jogo nos prédios do OpenStreetMap.
"""
import math
import os

import bpy
import numpy as np

R = math.radians
AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA_TEX = os.path.join(os.path.dirname(AQUI), 'public', 'texturas')

# escala das texturas em metros (o jogo usa os mesmos valores em src/cidades3d.js)
ESCALA = {'Parede': (4.0, 3.0), 'Telhado': (2.0, 2.0)}


# =============================================================================
# Pintura das texturas (numpy, origem no canto de baixo à esquerda)
# =============================================================================
def _ruido(h, w, escala, rng, amp):
    n = rng.random((h // escala + 2, w // escala + 2))
    n = np.kron(n, np.ones((escala, escala)))[:h, :w]
    # suaviza
    for _ in range(2):
        n = (n + np.roll(n, 1, 0) + np.roll(n, -1, 0) + np.roll(n, 1, 1) + np.roll(n, -1, 1)) / 5
    return (n - 0.5) * amp


def _base(h, w, cor, rng, amp=0.08):
    img = np.ones((h, w, 3)) * np.array(cor)
    img += _ruido(h, w, 8, rng, amp)[..., None]
    img += _ruido(h, w, 2, rng, amp * 0.6)[..., None]
    return img


def _ret(img, x0, y0, x1, y1, cor):
    h, w = img.shape[:2]
    x0, x1 = max(0, int(x0)), min(w, int(x1))
    y0, y1 = max(0, int(y0)), min(h, int(y1))
    if x1 > x0 and y1 > y0:
        img[y0:y1, x0:x1] = cor


def _linha(img, x0, y0, x1, y1, esp, cor):
    n = int(max(abs(x1 - x0), abs(y1 - y0)))
    for i in range(n + 1):
        t = i / max(1, n)
        x, y = x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
        _ret(img, x - esp / 2, y - esp / 2, x + esp / 2, y + esp / 2, cor)


def _janela(img, cx, y0, larg, alt, persiana, moldura=(0.93, 0.92, 0.88), varanda=False):
    """Janela francesa de duas folhas com persianas (volets) dos lados."""
    x0, x1 = cx - larg / 2, cx + larg / 2
    _ret(img, x0 - 8, y0 - 10, x1 + 8, y0 + alt + 8, np.array(moldura) * 0.92)       # pedra/peitoril
    _ret(img, x0, y0, x1, y0 + alt, moldura)
    vidro = np.array([0.16, 0.2, 0.25])
    _ret(img, x0 + 7, y0 + 7, x1 - 7, y0 + alt - 7, vidro)
    # reflexo
    _ret(img, x0 + 10, y0 + alt * 0.55, x1 - 10, y0 + alt - 10, vidro + 0.12)
    _ret(img, cx - 3, y0, cx + 3, y0 + alt, moldura)                                     # folhas
    for k in (1, 2):
        yy = y0 + alt * k / 3
        _ret(img, x0, yy - 2, x1, yy + 2, moldura)
    if persiana is not None:
        p = np.array(persiana)
        for xs in (x0 - 12 - larg / 2, x1 + 12):
            _ret(img, xs, y0, xs + larg / 2, y0 + alt, p)
            for yy in range(int(y0) + 6, int(y0 + alt), 9):
                _ret(img, xs + 3, yy, xs + larg / 2 - 3, yy + 2, p * 0.75)
    if varanda:  # grade de ferro (prédios haussmannianos)
        _ret(img, x0 - 14, y0 - 4, x1 + 14, y0 + 2, (0.08, 0.08, 0.08))
        _ret(img, x0 - 14, y0 + 36, x1 + 14, y0 + 40, (0.08, 0.08, 0.08))
        for xx in range(int(x0 - 12), int(x1 + 14), 8):
            _ret(img, xx, y0, xx + 2, y0 + 38, (0.1, 0.1, 0.1))


def tex_pedra(rng, cor=(0.84, 0.78, 0.65), persiana=(0.42, 0.5, 0.56), varanda=False, nome='pedra'):
    h, w = 384, 512
    img = _base(h, w, cor, rng, 0.06)
    junta = np.array(cor) * 0.78
    linha = 0
    for y in range(0, h, 42):
        off = 0 if linha % 2 == 0 else 55
        _ret(img, 0, y, w, y + 3, junta)
        x = -off
        while x < w:
            comp = rng.integers(90, 135)
            _ret(img, x, y, x + 3, y + 42, junta)
            tom = 1 + (rng.random() - 0.5) * 0.08
            if x + comp > 0:
                img[y + 3:y + 42, max(0, x + 3):min(w, x + comp)] *= tom
            x += comp
        linha += 1
    _janela(img, w / 2, 115, 135, 190, persiana, varanda=varanda)
    return img


def tex_reboco(rng, cor=(0.9, 0.86, 0.76), persiana=(0.36, 0.45, 0.33)):
    img = _base(384, 512, cor, rng, 0.07)
    # manchas de umidade embaixo
    img[:40] *= 0.9
    _janela(img, 256, 115, 130, 185, persiana)
    return img


def tex_enxaimel(rng):
    """Enxaimel (colombage) normando: reboco claro com vigas de carvalho escuras."""
    img = _base(384, 512, (0.92, 0.89, 0.8), rng, 0.06)
    viga = np.array([0.24, 0.16, 0.1])
    _ret(img, 0, 0, 512, 22, viga)
    _ret(img, 0, 362, 512, 384, viga)
    _ret(img, 0, 180, 512, 194, viga)
    for x in (0, 140, 372, 498):
        _ret(img, x, 0, x + 16, 384, viga)
    for x in (60, 440):
        _ret(img, x, 22, x + 12, 362, viga)
    _linha(img, 16, 30, 132, 176, 11, viga)
    _linha(img, 496, 30, 380, 176, 11, viga)
    _linha(img, 16, 352, 132, 200, 11, viga)
    _linha(img, 496, 352, 380, 200, 11, viga)
    _janela(img, 256, 200, 110, 140, None, moldura=(0.85, 0.82, 0.74))
    _ret(img, 210, 22, 302, 170, viga * 1.2)      # painel de madeira embaixo da janela
    return img


def tex_tijolo(rng):
    h, w = 384, 512
    img = _base(h, w, (0.56, 0.27, 0.19), rng, 0.08)
    junta = np.array([0.72, 0.68, 0.6])
    for i, y in enumerate(range(0, h, 24)):
        _ret(img, 0, y, w, y + 3, junta)
        off = 0 if i % 2 == 0 else 30
        for x in range(-off, w, 60):
            _ret(img, x, y, x + 3, y + 24, junta)
            if x + 60 > 0:
                img[y + 3:y + 24, max(0, x + 3):min(w, x + 60)] *= 1 + (rng.random() - 0.5) * 0.18
    _janela(img, 256, 115, 120, 180, None, moldura=(0.9, 0.88, 0.82))
    _ret(img, 180, 300, 332, 318, (0.85, 0.82, 0.75))  # verga de pedra
    return img


def tex_telhado(rng, tipo):
    h, w = 512, 512
    if tipo == 'ardosia':
        img = _base(h, w, (0.3, 0.33, 0.37), rng, 0.05)
        for i, y in enumerate(range(0, h, 32)):
            off = 0 if i % 2 == 0 else 26
            _ret(img, 0, y, w, y + 3, (0.13, 0.14, 0.16))
            for x in range(-off, w, 52):
                _ret(img, x, y, x + 2, y + 32, (0.16, 0.17, 0.19))
                if x + 52 > 0:
                    img[y + 3:y + 32, max(0, x + 2):min(w, x + 52)] *= 1 + (rng.random() - 0.5) * 0.25
            img[y + 3:y + 10] *= 0.85
    elif tipo == 'telha':
        img = _base(h, w, (0.66, 0.32, 0.2), rng, 0.08)
        xs = np.arange(w)
        onda = 0.78 + 0.32 * np.abs(np.sin(xs / 40 * math.pi))
        img *= onda[None, :, None]
        for y in range(0, h, 48):
            img[y:y + 6] *= 0.6
            img[y:y + 48] *= 1 + (rng.random() - 0.5) * 0.12
    else:  # zinco (Paris)
        img = _base(h, w, (0.55, 0.58, 0.61), rng, 0.04)
        for x in range(0, w, 64):
            _ret(img, x, 0, x + 5, h, (0.72, 0.74, 0.76))
            _ret(img, x + 5, 0, x + 9, h, (0.38, 0.4, 0.42))
    return img


def salvar_textura(nome, img):
    os.makedirs(SAIDA_TEX, exist_ok=True)
    img = np.clip(img, 0, 1)
    h, w = img.shape[:2]
    rgba = np.ones((h, w, 4), dtype=np.float32)
    rgba[..., :3] = img
    caminho = os.path.join(SAIDA_TEX, nome + '.jpg')
    im = bpy.data.images.get(nome) or bpy.data.images.new(nome, w, h, alpha=False)
    if im.size[0] != w or im.size[1] != h:
        im.scale(w, h)
    im.pixels.foreach_set(rgba.ravel())
    im.filepath_raw = caminho
    im.file_format = 'JPEG'
    bpy.context.scene.render.image_settings.quality = 88
    im.save()
    im.reload()
    return im


TEXTURAS = {}


def gerar_texturas():
    rng = np.random.default_rng(1944)
    pinturas = {
        'Parede_pedra': lambda: tex_pedra(rng),
        'Parede_haussmann': lambda: tex_pedra(rng, cor=(0.89, 0.85, 0.75), persiana=None, varanda=True),
        'Parede_reboco': lambda: tex_reboco(rng),
        'Parede_ocre': lambda: tex_reboco(rng, cor=(0.86, 0.64, 0.38), persiana=(0.3, 0.45, 0.32)),
        'Parede_enxaimel': lambda: tex_enxaimel(rng),
        'Parede_tijolo': lambda: tex_tijolo(rng),
        'Telhado_ardosia': lambda: tex_telhado(rng, 'ardosia'),
        'Telhado_telha': lambda: tex_telhado(rng, 'telha'),
        'Telhado_zinco': lambda: tex_telhado(rng, 'zinco'),
    }
    for nome, fn in pinturas.items():
        TEXTURAS[nome] = salvar_textura(nome.lower(), fn())


def mat_tex(nome):
    m = bpy.data.materials.get(nome)
    if m:
        return m
    m = bpy.data.materials.new(nome)
    if m.node_tree is None:
        m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes.get('Principled BSDF')
    b.inputs['Roughness'].default_value = 0.9
    t = nt.nodes.new('ShaderNodeTexImage')
    t.image = TEXTURAS[nome]
    nt.links.new(t.outputs['Color'], b.inputs['Base Color'])
    m.diffuse_color = (0.7, 0.7, 0.7, 1)
    return m


# =============================================================================
# UV em metros
# =============================================================================
def uv_metros(obj):
    me = obj.data
    uv = me.uv_layers.new(name='UVMap') if not me.uv_layers else me.uv_layers[0]
    for p in me.polygons:
        mname = obj.material_slots[p.material_index].name if obj.material_slots else ''
        su, sv = ESCALA['Parede'] if mname.startswith('Parede') else ESCALA['Telhado'] if mname.startswith('Telhado') else (2, 2)
        n = p.normal
        for li in p.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            if abs(n.z) < 0.35:
                tx, ty = -n.y, n.x
                L = math.hypot(tx, ty) or 1
                u = (co.x * tx + co.y * ty) / L / su
                v = co.z / sv
            elif abs(n.z) > 0.98:
                u, v = co.x / su, co.y / sv
            else:
                rx, ry = -n.y, n.x
                L = math.hypot(rx, ry) or 1
                rx, ry = rx / L, ry / L
                # direção da descida do telhado
                sx, sy, sz = n.y * 0 - n.z * ry, n.z * rx, n.x * ry - n.y * rx
                Ls = math.sqrt(sx * sx + sy * sy + sz * sz) or 1
                u = (co.x * rx + co.y * ry) / su
                v = (co.x * sx + co.y * sy + co.z * sz) / Ls / sv
            uv.data[li].uv = (u, v)


# =============================================================================
# Construções
# =============================================================================
def modelos(h):
    caixa, cil, esfera, _malha, juntar, mat = h['caixa'], h['cil'], h['esfera'], h['_malha'], h['juntar'], h['mat']

    def telhado_duas_aguas(larg, prof, z0, inclinacao, m_tel, m_par, beiral=0.35):
        """Cumeeira ao longo de X (fachada comprida para a rua em -Y); empenas nas pontas ±X."""
        alt = (prof / 2) * math.tan(R(inclinacao))
        L, P = larg / 2 + beiral, prof / 2 + beiral
        zb = z0 - beiral * math.tan(R(inclinacao))
        v = [(-L, -P, zb), (L, -P, zb), (L, 0, z0 + alt), (-L, 0, z0 + alt), (L, P, zb), (-L, P, zb)]
        tel = _malha('Telhado', v, [(0, 1, 2, 3), (3, 2, 4, 5)], m_tel)
        ve = [(-larg / 2, -prof / 2, z0), (-larg / 2, prof / 2, z0), (-larg / 2, 0, z0 + alt),
              (larg / 2, -prof / 2, z0), (larg / 2, prof / 2, z0), (larg / 2, 0, z0 + alt)]
        emp = _malha('Empena', ve, [(0, 1, 2), (3, 5, 4)], m_par)
        return [tel, emp], alt

    def porta(larg_casa, prof, cor=0x3b2a1c, x=0):
        return caixa('Porta', 1.1, 0.12, 2.2, x, -prof / 2 - 0.04, 1.1, mat('Porta', cor))

    def casa(nome, larg, prof, parede, inclinacao, m_par, m_tel, chamines=1, porta_cor=0x3b2a1c):
        mp, mt = mat_tex(m_par), mat_tex(m_tel)
        pc = [caixa('Paredes', larg, prof, parede, 0, 0, parede / 2, mp)]
        tel, alt = telhado_duas_aguas(larg, prof, parede, inclinacao, mt, mp)
        pc += tel
        pc.append(porta(larg, prof, porta_cor, x=-larg * 0.15))
        tijolo = mat('Chamine', 0x8a4a35)
        for i in range(chamines):
            x = (larg / 2 - 0.8) * (1 if i == 0 else -1)
            pc.append(caixa('Chamine', 0.7, 0.9, alt + 1.6, x, 0.6, parede + (alt + 1.6) / 2 - 0.3, tijolo))
        o = juntar(pc, 'Casa')
        uv_metros(o)
        return [o]

    def haussmann():
        mp, mt = mat_tex('Parede_haussmann'), mat_tex('Telhado_zinco')
        L, P, A = 15.0, 14.0, 17.0
        pc = [caixa('Paredes', L, P, A, 0, 0, A / 2, mp)]
        # mansarda de zinco (Paris)
        L2, P2, A2 = L - 3, P - 3, A + 3.6
        v = [(-L / 2, -P / 2, A), (L / 2, -P / 2, A), (L / 2, P / 2, A), (-L / 2, P / 2, A),
             (-L2 / 2, -P2 / 2, A2), (L2 / 2, -P2 / 2, A2), (L2 / 2, P2 / 2, A2), (-L2 / 2, P2 / 2, A2)]
        pc.append(_malha('Mansarda', v, [(0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7), (4, 5, 6, 7)], mt))
        for i in range(4):
            x = -4.5 + i * 3
            pc.append(caixa('Lucarna', 1.3, 1.0, 1.6, x, -P / 2 + 1.0, A + 1.3, mp))
        pc.append(caixa('Cornija', L + 0.5, P + 0.5, 0.5, 0, 0, A, mat('CornijaPedra', 0xd4cbb5)))
        for x in (-5, 5):
            pc.append(caixa('Chamine', 1.6, 0.8, 2.2, x, 1.5, A2 + 0.8, mat('Chamine', 0x8a4a35)))
        pc.append(caixa('Portao', 2.4, 0.15, 3.6, 0, -P / 2 - 0.05, 1.8, mat('Porta', 0x2c3a2e)))
        o = juntar(pc, 'Predio')
        uv_metros(o)
        return [o]

    # ------------------------------------------------------------- árvores
    def arvore(tipo):
        tronco = mat('Tronco', 0x4a3626)
        pc = []
        if tipo == 'carvalho':
            pc.append(cil('Tronco', 0.38, 5, 0, 0, 2.5, 'z', tronco, v=7, r2=0.25))
            folha = mat('Folhagem', 0x3d5a27)
            for (x, y, z, r) in [(0, 0, 7.5, 4.2), (2.2, 0.8, 6.4, 3.0), (-2.0, -0.6, 6.6, 3.1), (0.5, -1.8, 8.6, 2.6), (-0.6, 1.9, 8.4, 2.7)]:
                pc.append(esfera('Copa', r, x, y, z, (1, 1, 0.85), folha, 7, 5))
        elif tipo == 'choupo':
            pc.append(cil('Tronco', 0.25, 4, 0, 0, 2, 'z', tronco, v=6))
            pc.append(esfera('Copa', 1.9, 0, 0, 11, (1, 1, 4.6), mat('FolhagemChoupo', 0x4c6a2c), 8, 8))
        elif tipo == 'macieira':
            pc.append(cil('Tronco', 0.2, 1.8, 0, 0, 0.9, 'z', tronco, v=6))
            pc.append(esfera('Copa', 2.6, 0, 0, 3.3, (1, 1, 0.7), mat('FolhagemMacieira', 0x5b7a33), 8, 6))
            maca = mat('Maca', 0xb3322a)
            for i in range(7):
                a = i * 0.9
                pc.append(esfera('Maca', 0.18, math.cos(a) * 2.3, math.sin(a) * 2.3, 3.1 + (i % 3) * 0.4, (1, 1, 1), maca, 5, 3))
        else:  # pinheiro-manso (sul da França)
            pc.append(cil('Tronco', 0.3, 9, 0, 0, 4.5, 'z', tronco, v=6, rot=(0, 5, 0)))
            pc.append(esfera('Copa', 4.2, 0.4, 0, 10.2, (1, 1, 0.42), mat('FolhagemPinho', 0x2f4a26), 9, 5))
        return [juntar(pc, 'Arvore')]

    # ------------------------------------------------------------- catedrais
    def catedral(comp, larg_nave, alt_nave, larg_total, torres, flecha, torre_central=None, cupula_verde=False):
        pedra = mat('PedraCatedral', 0xcfc4a8, rough=0.95)
        pedra2 = mat('PedraCatedralEsc', 0xb3a78b, rough=0.95)
        chumbo = mat('TelhadoChumbo', 0x4c5257, rough=0.6)
        vitral = mat('Vitral', 0x26304a, rough=0.2)
        pc = []
        y0, y1 = -comp / 2 + 14, comp / 2 - 8
        # nave e naves laterais
        pc.append(caixa('Nave', larg_nave, y1 - y0, alt_nave, 0, (y0 + y1) / 2, alt_nave / 2, pedra))
        for s in (1, -1):
            pc.append(caixa('Lateral', (larg_total - larg_nave) / 2, y1 - y0, alt_nave * 0.5, s * (larg_nave + larg_total) / 4,
                            (y0 + y1) / 2, alt_nave * 0.25, pedra2))
            # arcobotantes e vitrais
            for y in np.arange(y0 + 4, y1 - 2, 7.0):
                pc.append(caixa('Arcobotante', 1.2, 1.0, alt_nave * 0.55, s * (larg_nave / 2 + 3.2), y, alt_nave * 0.72, pedra2,
                                rot=(0, s * 35, 0)))
                pc.append(caixa('Vitral', 0.3, 2.4, alt_nave * 0.3, s * (larg_nave / 2 + 0.1), y + 3.5, alt_nave * 0.72, vitral))
        tel, alt = None, larg_nave / 2 * math.tan(R(55))
        v = [(-larg_nave / 2 - 0.5, y0, alt_nave), (larg_nave / 2 + 0.5, y0, alt_nave), (0, y0, alt_nave + alt),
             (-larg_nave / 2 - 0.5, y1, alt_nave), (larg_nave / 2 + 0.5, y1, alt_nave), (0, y1, alt_nave + alt)]
        pc.append(_malha('TelhadoNave', v, [(0, 3, 5, 2), (1, 2, 5, 4), (0, 2, 1), (3, 4, 5)], chumbo))
        # transepto
        yt = y0 + (y1 - y0) * 0.62
        pc.append(caixa('Transepto', larg_total * 1.45, larg_nave, alt_nave, 0, yt, alt_nave / 2, pedra))
        vt = [(-larg_total * 0.725, yt - larg_nave / 2, alt_nave), (-larg_total * 0.725, yt + larg_nave / 2, alt_nave),
              (-larg_total * 0.725, yt, alt_nave + alt), (larg_total * 0.725, yt - larg_nave / 2, alt_nave),
              (larg_total * 0.725, yt + larg_nave / 2, alt_nave), (larg_total * 0.725, yt, alt_nave + alt)]
        pc.append(_malha('TelhadoTransepto', vt, [(0, 2, 5, 3), (1, 4, 5, 2), (0, 3, 4, 1)], chumbo))
        # abside (cabeceira redonda)
        pc.append(cil('Abside', larg_total / 2, alt_nave * 0.95, 0, y1, alt_nave * 0.475, 'z', pedra, v=16))
        pc.append(cil('TelhadoAbside', larg_total / 2 + 0.5, alt * 0.8, 0, y1, alt_nave * 0.95 + alt * 0.4, 'z', chumbo, v=16, r2=0.5))
        # fachada oeste com duas torres
        yf = -comp / 2 + 7
        pc.append(caixa('Fachada', larg_total, 14, alt_nave * 1.15, 0, yf, alt_nave * 0.575, pedra))
        pc.append(cil('Rosacea', 4.5, 0.6, 0, yf - 7.1, alt_nave * 0.75, 'y', vitral, v=24))
        for x in (-1.1, 0, 1.1):
            pc.append(caixa('Portal', 3.6, 1.0, 7.5, x * 9, yf - 7.2, 3.75, pedra2))
        for s in (1, -1):
            x = s * (larg_total / 2 - 5)
            pc.append(caixa('Torre', 10, 12, torres, x, yf, torres / 2, pedra))
            for z in np.arange(torres * 0.45, torres - 3, 6.0):
                pc.append(caixa('Seteira', 10.2, 1.4, 4, x, yf - 0.1, z, vitral))
            if flecha:
                pc.append(cil('Flecha', 5.6, flecha, x, yf, torres + flecha / 2, 'z', pedra2, v=8, r2=0.3))
            else:
                pc.append(caixa('Balaustrada', 10.6, 12.6, 1.2, x, yf, torres + 0.6, pedra2))
        if torre_central:
            yt2 = yt
            pc.append(cil('TorreCentral', 6.5, torre_central[0], 0, yt2, alt_nave + torre_central[0] / 2, 'z', pedra, v=8))
            topo = alt_nave + torre_central[0]
            if cupula_verde:
                pc.append(esfera('Cupula', 6.6, 0, yt2, topo, (1, 1, 1.3), mat('Cobre', 0x5f9c86, metal=0.3, rough=0.5), 12, 8))
                pc.append(cil('Lanterna', 1.5, 12, 0, yt2, topo + 13, 'z', mat('Cobre', 0x5f9c86), v=8, r2=0.2))
            else:
                pc.append(cil('Flecha central', 4.0, torre_central[1], 0, yt2, topo + torre_central[1] / 2, 'z', chumbo, v=8, r2=0.15))
        return [juntar(pc, 'Catedral')]

    return {
        'casa_normanda': lambda: casa('casa_normanda', 10, 6.5, 4.2, 52, 'Parede_enxaimel', 'Telhado_ardosia'),
        'casa_pedra': lambda: casa('casa_pedra', 9, 7.5, 6.0, 45, 'Parede_pedra', 'Telhado_ardosia', chamines=2),
        'fazenda': lambda: casa('fazenda', 16, 7, 3.6, 38, 'Parede_pedra', 'Telhado_telha', porta_cor=0x5a3a22),
        'casa_cidade': lambda: casa('casa_cidade', 7, 11, 9.0, 45, 'Parede_reboco', 'Telhado_ardosia'),
        'casa_tijolo': lambda: casa('casa_tijolo', 7.5, 9, 6.0, 45, 'Parede_tijolo', 'Telhado_ardosia'),
        'casa_provence': lambda: casa('casa_provence', 10, 8, 6.0, 22, 'Parede_ocre', 'Telhado_telha', porta_cor=0x37543a),
        'predio_haussmann': haussmann,
        'arvore_carvalho': lambda: arvore('carvalho'),
        'arvore_choupo': lambda: arvore('choupo'),
        'macieira': lambda: arvore('macieira'),
        'pinheiro': lambda: arvore('pinheiro'),
        # Catedral de Bayeux: 102 m, flechas de 75 m e torre central com cúpula de cobre
        'catedral_bayeux': lambda: catedral(102, 11, 22, 26, 45, 30, torre_central=(40, 0), cupula_verde=True),
        # Notre-Dame de Paris: 128 m, torres de 69 m, flecha de 96 m
        'notre_dame': lambda: catedral(128, 13, 33, 40, 69, 0, torre_central=(6, 50)),
    }
