#!/usr/bin/env python3
"""Modelos das montarias no formato do Blockbench (.bbmodel, "Free model").

Cada montaria é feita de cubos agrupados em ossos (pernas, pescoço, cabeça, cauda) com o pivô
na articulação, do jeito que se monta no Blockbench. Os arquivos gerados em tools/blockbench/modelos/
podem ser abertos e editados no Blockbench; tools/blockbench/render_cavalos.py lê esses mesmos
arquivos e gera os sprites do jogo. Unidade: 1 = 1 pixel do sprite. x = frente (cabeça), y = altura.
Uso: python3 tools/blockbench/cavalos.py
"""
import base64, json, os, struct, uuid, zlib

AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(AQUI, 'modelos')

# ---------- cores de cada montaria ----------
VARIANTES = {
    'cavalo': dict(pelo='#8a5230', escuro='#5a3218', crina='#2a1810', casco='#2a2420', focinho='#6a3a20', sela='#6a3a1a', manta='#3a5a8a', metal='#c8a040'),
    'burro': dict(pelo='#9a948c', escuro='#6a645e', crina='#4a443e', casco='#2a2420', focinho='#d8d0c4', sela='#7a4a2a', manta='#8a6a3a', metal='#a08040', burro=True),
    'cavalo_guerra': dict(pelo='#26262c', escuro='#141418', crina='#0a0a0e', casco='#3a3a40', focinho='#3a3a42', sela='#5a1a14', manta='#8a1a14', metal='#a8acb4', guerra=True),
    'corcel': dict(pelo='#ecebf2', escuro='#c4c4d4', crina='#c8d4ff', casco='#8a8aa0', focinho='#d8c8d0', sela='#d8d8e4', manta='#2a4aa0', metal='#e8e8ff', elfico=True),
    'alce': dict(pelo='#6a4528', escuro='#45301c', crina='#3a2614', casco='#2a2018', focinho='#4a3020', sela='#5a3418', manta='#6a2a1a', metal='#b08a40', alce=True),
    'camelo': dict(pelo='#c89a5a', escuro='#a07840', crina='#8a6430', casco='#5a4428', focinho='#b08848', sela='#7a2a1a', manta='#c04020', metal='#d0a040', camelo=True),
}

def png_paleta(cores):
    """Textura do modelo: uma faixa de quadradinhos 4x4, um por cor (o Blockbench mostra o modelo colorido)."""
    w, h = 4 * len(cores), 4
    linhas = b''
    for _ in range(h):
        linhas += b'\x00' + b''.join(bytes(int(c[i:i + 2], 16) for i in (1, 3, 5)) + b'\xff' for c in cores for _ in range(4))
    def bloco(t, d): return struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    png = b'\x89PNG\r\n\x1a\n' + bloco(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)) + bloco(b'IDAT', zlib.compress(linhas)) + bloco(b'IEND', b'')
    return 'data:image/png;base64,' + base64.b64encode(png).decode(), w, h

def montaria(nome, C):
    cores = []                     # paleta da textura, na ordem em que as cores aparecem
    els, grupos = [], {}
    def cor(c):
        if c not in cores: cores.append(c)
        return cores.index(c)
    def cubo(g, nm, a, b, c, rot=None, orig=None):
        """cubo de a=(x,y,z) até b, com a cor c; rot=(rx,ry,rz) em graus em torno de orig."""
        e = {'name': nm, 'box_uv': False, 'rescale': False, 'locked': False, 'render_order': 'default', 'allow_mirror_modeling': True,
             'from': list(a), 'to': list(b), 'autouv': 0, 'color': 0, 'origin': list(orig or a), 'uuid': str(uuid.uuid4()), 'type': 'cube', '_cor': c}; cor(c)
        if rot: e['rotation'] = list(rot)
        els.append(e); grupos.setdefault(g, []).append(e['uuid']); return e
    P = C
    camelo, alce, burro = P.get('camelo'), P.get('alce'), P.get('burro')
    k = 0.85 if burro else 1.0                      # o burro é menor
    L = lambda v: round(v * k, 2)
    alt = 8 if not camelo else 9                    # altura das pernas (a sela fica onde o cavaleiro senta)
    # ---------- pernas (osso com pivô no quadril/ombro) ----------
    pivos = {'perna_fd': (L(22), alt + 1, -2.6), 'perna_fe': (L(22), alt + 1, 2.6), 'perna_td': (L(8), alt + 1, -2.6), 'perna_te': (L(8), alt + 1, 2.6)}
    for g, (px, py, pz) in pivos.items():
        z0, z1 = pz - 1.2, pz + 1.2
        frente = g.startswith('perna_f')
        cubo(g, g + '_coxa', (px - 1.6, py - 4.5, z0 - 0.2), (px + 1.6, py + 1, z1 + 0.2), P['pelo'], orig=(px, py, pz))
        cubo(g, g + '_canela', (px - 1.0, 1.4, z0 + 0.1), (px + 1.0, py - 4.4, z1 - 0.1), P['escuro'] if not P.get('elfico') else P['pelo'], orig=(px, py, pz))
        cubo(g, g + '_casco', (px - 1.25, 0, z0), (px + 1.35, 1.5, z1), P['casco'], orig=(px, py, pz))
        if P.get('guerra') and frente: cubo(g, g + '_greva', (px - 1.3, 3, z0 - 0.1), (px + 1.3, 6, z1 + 0.1), P['metal'], orig=(px, py, pz))
    # ---------- corpo ----------
    by0, by1 = alt - 1, alt + 6.5
    cubo('corpo', 'barriga', (L(6), by0, -3.6), (L(24), by1, 3.6), P['pelo'])
    cubo('corpo', 'peito', (L(21), by0 + 0.6, -3.4), (L(26), by1 - 0.3, 3.4), P['pelo'])
    cubo('corpo', 'garupa', (L(4), by0 + 0.8, -3.5), (L(10), by1 + 0.6, 3.5), P['pelo'])
    cubo('corpo', 'ventre', (L(9), by0 - 0.6, -3.0), (L(21), by0 + 0.6, 3.0), P['escuro'])
    if camelo:
        cubo('corpo', 'corcova', (L(12), by1 - 0.2, -2.8), (L(19), by1 + 4.2, 2.8), P['pelo'])
        cubo('corpo', 'corcova_topo', (L(13.5), by1 + 4, -2.0), (L(17.5), by1 + 5.2, 2.0), P['pelo'])
    # ---------- arreios: manta, sela, estribo e (no cavalo de guerra) a armadura ----------
    sx0, sx1 = (L(9.5), L(15.5)) if camelo else (L(11), L(18))
    sy = by1 + (4.6 if camelo else 0)
    cubo('arreio', 'manta', (sx0 - 1, sy - 3.2, -3.9), (sx1 + 1, sy + 0.4, 3.9), P['manta'])
    cubo('arreio', 'sela', (sx0, sy, -3.0), (sx1, sy + 1.6, 3.0), P['sela'])
    cubo('arreio', 'sela_arco', (sx1 - 1.2, sy + 1.2, -2.2), (sx1 + 0.2, sy + 2.6, 2.2), P['sela'])
    cubo('arreio', 'sela_cantil', (sx0 - 0.2, sy + 1.1, -2.6), (sx0 + 1, sy + 2.2, 2.6), P['sela'])
    for z in (-4.1, 3.6): cubo('arreio', 'estribo', ((sx0 + sx1) / 2 - 0.5, sy - 4.6, z), ((sx0 + sx1) / 2 + 0.5, sy - 3, z + 0.5), P['metal'])
    if P.get('guerra'):
        cubo('arreio', 'barda', (L(5), by0 + 0.3, -3.9), (L(25), by0 + 3.2, 3.9), P['manta'])
        for x in range(6, 25, 4): cubo('arreio', 'barda_franja', (L(x), by0 - 0.6, -4.0), (L(x) + 1.6, by0 + 0.3, 4.0), P['metal'])
    if P.get('elfico'):
        cubo('arreio', 'manta_borda', (sx0 - 1.1, sy - 3.3, -4.0), (sx1 + 1.1, sy - 2.6, 4.0), P['metal'])
    # ---------- pescoço e cabeça (osso com pivô na base do pescoço) ----------
    nx, ny = L(23.5), by1 - 1
    pesc_rot = (0, 0, 32 if not camelo else 18)
    if camelo:
        cubo('pescoco', 'pescoco', (nx - 1.4, ny - 1, -1.6), (nx + 2.2, ny + 6.5, 1.6), P['pelo'], rot=(0, 0, -40), orig=(nx, ny, 0))
        hx, hy = nx + 6.2, ny + 7.5
    else:
        cubo('pescoco', 'pescoco', (nx - 1.8, ny - 1, -1.7), (nx + 2.2, ny + 8.5, 1.7), P['pelo'], rot=(0, 0, -pesc_rot[2]), orig=(nx, ny, 0))
        cubo('pescoco', 'crina', (nx - 2.6, ny + 0.5, -0.7), (nx - 1.6, ny + 9.5, 0.7), P['crina'], rot=(0, 0, -pesc_rot[2]), orig=(nx, ny, 0))
        hx, hy = nx + 5.3, ny + 8.2
        if P.get('guerra'): cubo('pescoco', 'crineira_metal', (nx - 1.9, ny + 1, -1.9), (nx + 0.4, ny + 8, 1.9), P['metal'], rot=(0, 0, -pesc_rot[2]), orig=(nx, ny, 0))
    # cabeça: inclinada para baixo, com o focinho mais fino na ponta
    cubo('cabeca', 'cranio', (hx - 2.0, hy - 1.6, -1.8), (hx + 2.6, hy + 2.0, 1.8), P['pelo'], rot=(0, 0, -28), orig=(hx, hy, 0))
    cubo('cabeca', 'focinho', (hx + 2.4, hy - 1.2, -1.35), (hx + 5.6, hy + 1.2, 1.35), P['focinho'], rot=(0, 0, -28), orig=(hx, hy, 0))
    cubo('cabeca', 'olho', (hx + 0.6, hy + 0.3, -1.95), (hx + 1.5, hy + 1.1, 1.95), '#120a08', rot=(0, 0, -28), orig=(hx, hy, 0))
    cubo('cabeca', 'narina', (hx + 5.0, hy - 0.6, -1.4), (hx + 5.7, hy - 0.1, 1.4), '#1a0e0a', rot=(0, 0, -28), orig=(hx, hy, 0))
    orelha = 3.2 if burro else 1.8
    for z in (-1.4, 0.6): cubo('cabeca', 'orelha', (hx - 1.6, hy + 1.8, z), (hx - 0.6, hy + 1.8 + orelha, z + 0.8), P['pelo'] if not burro else P['escuro'], rot=(0, 0, -10), orig=(hx, hy, 0))
    if not camelo: cubo('cabeca', 'topete', (hx - 1.0, hy + 1.6, -0.9), (hx + 0.6, hy + 2.6, 0.9), P['crina'], rot=(0, 0, -28), orig=(hx, hy, 0))
    # cabresto (rédea) e, no cavalo de guerra, a testeira de metal
    cubo('cabeca', 'cabresto', (hx + 2.2, hy - 1.7, -1.9), (hx + 2.8, hy + 1.6, 1.9), P['sela'], rot=(0, 0, -28), orig=(hx, hy, 0))
    if P.get('guerra'): cubo('cabeca', 'testeira', (hx - 0.4, hy + 1.6, -1.9), (hx + 4.6, hy + 2.2, 1.9), P['metal'], rot=(0, 0, -28), orig=(hx, hy, 0))
    if P.get('elfico'): cubo('cabeca', 'diadema', (hx - 0.2, hy + 1.9, -1.9), (hx + 1.6, hy + 2.4, 1.9), P['metal'], rot=(0, 0, -28), orig=(hx, hy, 0))
    if alce:   # galhada larga e achatada
        for z, s in ((-1.6, -1), (0.8, 1)):
            cubo('cabeca', 'galhada', (hx - 1.2, hy + 2.3, z), (hx - 0.4, hy + 6.0, z + 0.8), '#d8c8a0', rot=(28 * s, 0, -12), orig=(hx - 0.8, hy + 2.3, z))
            cubo('cabeca', 'galhada_palma', (hx - 3.0, hy + 5.0, z), (hx + 1.6, hy + 6.4, z + 0.8), '#d8c8a0', rot=(28 * s, 0, -12), orig=(hx - 0.8, hy + 2.3, z))
            for dx in (-2.6, -1.0, 0.8): cubo('cabeca', 'galhada_ponta', (hx + dx, hy + 6.3, z), (hx + dx + 0.6, hy + 7.6, z + 0.8), '#d8c8a0', rot=(28 * s, 0, -12), orig=(hx - 0.8, hy + 2.3, z))
    # ---------- cauda (osso com pivô na garupa) ----------
    tx, ty = L(4.4), by1 - 0.2
    if camelo: cubo('cauda', 'cauda', (tx - 0.8, ty - 6, -0.6), (tx + 0.2, ty, 0.6), P['crina'], rot=(0, 0, -12), orig=(tx, ty, 0))
    else:
        cubo('cauda', 'cauda_base', (tx - 1.6, ty - 2.4, -1.0), (tx + 0.4, ty + 0.6, 1.0), P['crina'], rot=(0, 0, 22), orig=(tx, ty, 0))
        cubo('cauda', 'cauda_fios', (tx - 2.6, ty - 8.5, -1.3), (tx - 0.4, ty - 1.8, 1.3), P['crina'], rot=(0, 0, 12), orig=(tx, ty, 0))
    # ---------- arquivo .bbmodel ----------
    tex, tw, th = png_paleta(cores)
    for e in els:
        i = cores.index(e.pop('_cor')); u0, u1 = i * 4 + 0.5, i * 4 + 3.5
        e['faces'] = {f: {'uv': [u0, 0.5, u1, 3.5], 'texture': 0} for f in ('north', 'east', 'south', 'west', 'up', 'down')}
    def grupo(nome, origem, filhos=None):
        return {'name': nome, 'origin': list(origem), 'color': 0, 'uuid': str(uuid.uuid4()), 'export': True, 'mirror_uv': False, 'isOpen': True,
                'locked': False, 'visibility': True, 'autouv': 0, 'children': (grupos.get(nome, []) + (filhos or []))}
    ossos = [grupo(g, pivos[g]) for g in ('perna_fd', 'perna_fe', 'perna_td', 'perna_te')]
    cab = grupo('cabeca', (hx, hy, 0))
    pes = grupo('pescoco', (nx, ny, 0), [cab])
    raiz = grupo('corpo', (L(15), alt, 0), [grupo('arreio', (L(15), by1, 0)), pes, grupo('cauda', (tx, ty, 0))] + ossos)
    return {
        'meta': {'format_version': '4.10', 'model_format': 'free', 'box_uv': False},
        'name': nome, 'model_identifier': nome, 'visible_box': [2, 2, 0], 'variable_placeholders': '', 'variable_placeholder_buttons': [],
        'timeline_setups': [], 'unhandled_root_fields': {},
        'resolution': {'width': tw, 'height': th},
        'elements': els, 'outliner': [raiz],
        'textures': [{'path': '', 'name': nome + '_cores.png', 'folder': '', 'namespace': '', 'id': '0', 'width': tw, 'height': th, 'uv_width': tw, 'uv_height': th,
                      'particle': False, 'render_mode': 'default', 'render_sides': 'auto', 'frame_time': 1, 'frame_order_type': 'loop', 'frame_order': '', 'frame_interpolate': False,
                      'visible': True, 'internal': True, 'saved': True, 'uuid': str(uuid.uuid4()), 'source': tex}]
    }

if __name__ == '__main__':
    os.makedirs(SAIDA, exist_ok=True)
    for nome, C in VARIANTES.items():
        m = montaria(nome, C)
        with open(os.path.join(SAIDA, nome + '.bbmodel'), 'w') as f: json.dump(m, f, ensure_ascii=False, indent=1)
        print(nome, len(m['elements']), 'cubos')
