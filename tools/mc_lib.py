"""Biblioteca comum para gerar mobs do Minecraft Bedrock prontos para o Blockbench.

Convenções (as mesmas de gerar_urso_mago.py / gerar_soldado_romano.py):
coordenadas internas do Blockbench, frente em -Z e direita do personagem em +X.
Na exportação Bedrock o X é espelhado e as rotações X/Y trocam de sinal.
Rotação X positiva num membro pendurado o leva para a frente.
"""
import base64
import io
import json
import math
import random
import uuid
import zipfile

from PIL import Image

FACES = ['north', 'east', 'south', 'west', 'up', 'down']

rng = random.Random(1)


def semear(n):
    rng.seed(n)


# ------------------------------------------------------------------ cores
def misturar(a, b, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


def ruido(cor, forca=6):
    d = rng.randint(-forca, forca)
    return tuple(max(0, min(255, c + d)) for c in cor)


def sombrear(face, xx, yy, w, h, base, claro, escuro):
    if face == 'up':
        c = misturar(base, claro, 0.35)
    elif face == 'down':
        c = misturar(base, escuro, 0.55)
    else:
        t = yy / max(1, h - 1)
        c = misturar(misturar(base, claro, 0.25), escuro, t * 0.55)
        if yy == 0:
            c = misturar(c, claro, 0.3)
    if face != 'up' and xx in (0, w - 1) and w > 2:
        c = misturar(c, escuro, 0.2)
    return c


class Pincel:
    """Pinta dentro do retângulo de uma face (coordenadas locais)."""

    def __init__(self, img, face, x0, y0, w, h):
        self.img, self.face, self.x0, self.y0, self.w, self.h = img, face, x0, y0, w, h
        self.lateral = face not in ('up', 'down')

    def px(self, x, y, c, a=255):
        if 0 <= x < self.w and 0 <= y < self.h:
            self.img.putpixel((self.x0 + x, self.y0 + y), tuple(c)[:3] + (a,))

    def apagar(self, x, y):
        self.px(x, y, (0, 0, 0), 0)

    def preencher(self, base, claro=None, escuro=None, forca=5):
        claro = claro or misturar(base, (255, 255, 255), 0.25)
        escuro = escuro or misturar(base, (0, 0, 0), 0.35)
        for yy in range(self.h):
            for xx in range(self.w):
                self.px(xx, yy, ruido(sombrear(self.face, xx, yy, self.w, self.h, base, claro, escuro), forca))

    def xadrez(self, a, b, linha, passo=2):
        """Tecido xadrez (tartã)."""
        for yy in range(self.h):
            for xx in range(self.w):
                c = a
                if (xx // passo) % 2 == 0:
                    c = misturar(c, b, 0.5)
                if (yy // passo) % 2 == 0:
                    c = misturar(c, b, 0.5)
                if xx % (passo * 3) == 0 or yy % (passo * 3) == 0:
                    c = linha
                t = yy / max(1, self.h - 1) if self.lateral else 0.2
                self.px(xx, yy, ruido(misturar(c, (0, 0, 0), t * 0.3), 4))

    def pelo(self, base, comprido=False):
        """Pelagem desgrenhada; com comprido=True a borda de baixo fica irregular."""
        for yy in range(self.h):
            for xx in range(self.w):
                c = sombrear(self.face, xx, yy, self.w, self.h, base,
                             misturar(base, (255, 255, 255), 0.3), misturar(base, (0, 0, 0), 0.45))
                if (xx * 3 + yy) % 4 == 0:
                    c = misturar(c, (0, 0, 0), 0.25)
                self.px(xx, yy, ruido(c, 10))
        if comprido and self.lateral:
            for xx in range(self.w):
                if rng.random() < 0.5:
                    self.apagar(xx, self.h - 1)

    def desenho(self, linhas, cores, ox=0, oy=0):
        for yy, linha in enumerate(linhas):
            for xx, ch in enumerate(linha):
                if ch in cores:
                    self.px(ox + xx, oy + yy, cores[ch])

    def linha_h(self, y, c):
        for xx in range(self.w):
            self.px(xx, y, c)

    def linha_v(self, x, c):
        for yy in range(self.h):
            self.px(x, yy, c)


# ------------------------------------------------------------------ modelo
class Modelo:
    def __init__(self, nome, tex=256, semente=1):
        self.nome, self.tex, self.semente = nome, tex, semente
        self.ossos, self.cubos, self.animacoes = [], [], {}
        self.pintores = {}

    def uid(self, *p):
        return str(uuid.uuid5(uuid.NAMESPACE_URL, f'{self.nome}/' + '/'.join(map(str, p))))

    def osso(self, nome, pai, pivo, rot=(0, 0, 0)):
        self.ossos.append((nome, pai, list(pivo), list(rot)))

    def cubo(self, osso, nome, de, ate, mat, sem=()):
        self.cubos.append(dict(osso=osso, nome=nome, de=list(de), ate=list(ate), mat=mat, sem=sem))

    def cubo_girado(self, osso, nome, centro, tam, rot, mat, sem=()):
        de = [centro[i] - tam[i] / 2 for i in range(3)]
        ate = [centro[i] + tam[i] / 2 for i in range(3)]
        self.cubos.append(dict(osso=osso, nome=nome, de=de, ate=ate, mat=mat, sem=sem,
                               rot=list(rot), origem=list(centro)))

    def material(self, *nomes):
        """Decorador: registra a função que pinta esses materiais."""
        def reg(f):
            for n in nomes:
                self.pintores[n] = f
            return f
        return reg

    # ---------------------------------------------------------- textura
    def montar_textura(self):
        semear(self.semente)
        img = Image.new('RGBA', (self.tex, self.tex), (0, 0, 0, 0))
        pedidos = []
        for c in self.cubos:
            c['uv'] = {}
            for f in FACES:
                w, h = dims_face(c, f)
                if w > 0 and h > 0 and f not in c['sem']:
                    pedidos.append((math.ceil(w), math.ceil(h), c, f))
        pedidos.sort(key=lambda p: (-p[1], -p[0]))
        x = y = alt = 0
        for w, h, c, f in pedidos:
            if x + w > self.tex:
                x, y, alt = 0, y + alt, 0
            if y + h > self.tex:
                raise RuntimeError(f'textura de {self.nome} cheia')
            pintor = self.pintores.get(c['mat'])
            if not pintor:
                raise ValueError(f'material sem pintor: {c["mat"]}')
            pintor(Pincel(img, f, x, y, w, h), c)
            fw, fh = dims_face(c, f)
            c['uv'][f] = [x, y, x + fw, y + fh]
            x += w
            alt = max(alt, h)
        buf = io.BytesIO()
        img.save(buf, 'PNG')
        self.png = buf.getvalue()
        return self.png

    # ---------------------------------------------------------- blockbench
    def bbmodel(self):
        elementos, filhos = [], {o[0]: [] for o in self.ossos}
        for c in self.cubos:
            u = self.uid('cubo', c['nome'])
            piv = next(o[2] for o in self.ossos if o[0] == c['osso'])
            faces = {f: ({'uv': [num(v) for v in c['uv'][f]], 'texture': 0} if f in c['uv']
                         else {'uv': [0, 0, 0, 0], 'texture': None}) for f in FACES}
            elementos.append({
                'name': c['nome'], 'box_uv': False, 'rescale': False, 'locked': False,
                'light_emission': 0, 'render_order': 'default', 'allow_mirror_modeling': True,
                'from': [num(v) for v in c['de']], 'to': [num(v) for v in c['ate']], 'autouv': 0,
                'color': sum(map(ord, c['mat'])) % 8, 'origin': [num(v) for v in c.get('origem', piv)],
                'rotation': [num(v) for v in c.get('rot', [0, 0, 0])], 'inflate': 0, 'faces': faces,
                'type': 'cube', 'uuid': u,
            })
            filhos[c['osso']].append(u)

        def grupo(nome):
            o = next(o for o in self.ossos if o[0] == nome)
            return {
                'name': nome, 'origin': [num(v) for v in o[2]], 'rotation': [num(v) for v in o[3]],
                'color': 0, 'uuid': self.uid('osso', nome), 'export': True, 'mirror_uv': False,
                'isOpen': o[1] is None or nome == 'corpo', 'locked': False, 'visibility': True,
                'autouv': 0, 'children': filhos[nome] + [grupo(f[0]) for f in self.ossos if f[1] == nome],
            }

        anims = []
        for nome, a in self.animacoes.items():
            animators = {}
            for osso, canais in a['bones'].items():
                kfs = []
                for canal, chaves in canais.items():
                    for ch in chaves:
                        t, v = ch[0], ch[1]
                        kfs.append({
                            'channel': canal,
                            'data_points': [{'x': str(num(v[0])), 'y': str(num(v[1])), 'z': str(num(v[2]))}],
                            'uuid': self.uid('kf', nome, osso, canal, t), 'time': t, 'color': -1,
                            'interpolation': ch[2] if len(ch) > 2 else 'catmullrom',
                        })
                animators[self.uid('osso', osso)] = {'name': osso, 'type': 'bone', 'keyframes': kfs}
            anims.append({
                'uuid': self.uid('anim', nome), 'name': f'animation.{self.nome}.{nome}', 'loop': a['loop'],
                'override': False, 'length': a['length'], 'snapping': 24, 'selected': False,
                'anim_time_update': '', 'blend_weight': '', 'start_delay': '', 'loop_delay': '',
                'animators': animators,
            })
        raiz = next(o[0] for o in self.ossos if o[1] is None)
        return {
            'meta': {'format_version': '4.10', 'model_format': 'bedrock', 'box_uv': False},
            'name': self.nome, 'model_identifier': self.nome, 'visible_box': [1.5, 2.5, 1.25],
            'variable_placeholders': '', 'variable_placeholder_buttons': [], 'timeline_setups': [],
            'unhandled_root_fields': {}, 'resolution': {'width': self.tex, 'height': self.tex},
            'elements': elementos, 'outliner': [grupo(raiz)],
            'textures': [{
                'path': '', 'name': f'{self.nome}.png', 'folder': 'textures/entity', 'namespace': '',
                'id': '0', 'width': self.tex, 'height': self.tex, 'uv_width': self.tex,
                'uv_height': self.tex, 'particle': False, 'use_as_default': False,
                'layers_enabled': False, 'sync_to_project': '', 'render_mode': 'default',
                'render_sides': 'auto', 'frame_time': 1, 'frame_order_type': 'loop',
                'frame_order': '', 'frame_interpolate': False, 'visible': True, 'internal': True,
                'saved': False, 'uuid': self.uid('textura'),
                'source': 'data:image/png;base64,' + base64.b64encode(self.png).decode(),
            }],
            'animations': anims,
        }

    # ---------------------------------------------------------- bedrock
    def geo(self):
        bones = []
        for nome, pai, piv, rot in self.ossos:
            b = {'name': nome}
            if pai:
                b['parent'] = pai
            b['pivot'] = [num(-piv[0]), num(piv[1]), num(piv[2])]
            if any(rot):
                b['rotation'] = br_rot(rot)
            cubes = []
            for c in self.cubos:
                if c['osso'] != nome:
                    continue
                size = [c['ate'][i] - c['de'][i] for i in range(3)]
                uv = {}
                for f, (u1, v1, u2, v2) in c['uv'].items():
                    du, dv = u2 - u1, v2 - v1
                    if f in ('up', 'down'):
                        uv[f] = {'uv': [num(u2), num(v2)], 'uv_size': [num(-du), num(-dv)]}
                    else:
                        uv[f] = {'uv': [num(u1), num(v1)], 'uv_size': [num(du), num(dv)]}
                cb = {'origin': [num(-(c['de'][0] + size[0])), num(c['de'][1]), num(c['de'][2])],
                      'size': [num(v) for v in size], 'uv': uv}
                if any(c.get('rot', [0, 0, 0])):
                    o = c['origem']
                    cb['pivot'] = [num(-o[0]), num(o[1]), num(o[2])]
                    cb['rotation'] = br_rot(c['rot'])
                cubes.append(cb)
            if cubes:
                b['cubes'] = cubes
            bones.append(b)
        return {'format_version': '1.12.0', 'minecraft:geometry': [{
            'description': {'identifier': f'geometry.{self.nome}', 'texture_width': self.tex,
                            'texture_height': self.tex, 'visible_bounds_width': 3,
                            'visible_bounds_height': 3.5, 'visible_bounds_offset': [0, 1.25, 0]},
            'bones': bones}]}

    def animacoes_bedrock(self, extra=None):
        out = {}
        for nome, a in self.animacoes.items():
            bones = {}
            for osso, canais in a['bones'].items():
                bc = {}
                for canal, chaves in canais.items():
                    kf = {}
                    for ch in chaves:
                        t, v = ch[0], ch[1]
                        if canal == 'rotation':
                            vv = br_rot(v)
                        elif canal == 'position':
                            vv = [num(-v[0]), num(v[1]), num(v[2])]
                        else:
                            vv = [num(x) for x in v]
                        chave = f'{float(t):.4f}'.rstrip('0').rstrip('.')
                        chave += '' if '.' in chave else '.0'
                        interp = ch[2] if len(ch) > 2 else 'catmullrom'
                        kf[chave] = {'post': vv, 'lerp_mode': 'catmullrom'} if interp == 'catmullrom' else vv
                    bc[canal] = kf
                bones[osso] = bc
            anim = {'animation_length': a['length'], 'bones': bones}
            if a['loop'] == 'loop':
                anim['loop'] = True
            elif a['loop'] == 'hold':
                anim['loop'] = 'hold_on_last_frame'
            out[f'animation.{self.nome}.{nome}'] = anim
        out.update(extra or {})
        return {'format_version': '1.8.0', 'animations': out}


def dims_face(c, face):
    sx, sy, sz = (c['ate'][i] - c['de'][i] for i in range(3))
    return {'north': (sx, sy), 'south': (sx, sy), 'east': (sz, sy), 'west': (sz, sy),
            'up': (sx, sz), 'down': (sx, sz)}[face]


def num(v):
    v = round(float(v), 4)
    return int(v) if v == int(v) else v


def br_rot(v):
    return [num(-v[0]), num(-v[1]), num(v[2])]


def espelho(lado):
    s = 1 if lado == 'dir' else -1
    return lambda a, b: sorted([a * s, b * s])


# ------------------------------------------------------------------ pacotes
def manifesto(base_uid, tipo, nome, desc, dep):
    u = lambda *p: str(uuid.uuid5(uuid.NAMESPACE_URL, base_uid + '/' + '/'.join(p)))
    return {
        'format_version': 2,
        'header': {'name': nome, 'description': desc, 'uuid': u('pack', tipo),
                   'version': [1, 0, 0], 'min_engine_version': [1, 21, 0]},
        'modules': [{'type': tipo, 'uuid': u('modulo', tipo), 'version': [1, 0, 0]}],
        'dependencies': [{'uuid': u('pack', dep), 'version': [1, 0, 0]}],
    }


def json_bytes(d):
    return json.dumps(d, ensure_ascii=False, indent=2).encode()


def mcaddon(arquivos, pacotes):
    """arquivos: {'pasta/rel': bytes}; pacotes: [(pasta, nome.mcpack)]."""
    addon = io.BytesIO()
    with zipfile.ZipFile(addon, 'w', zipfile.ZIP_DEFLATED) as z:
        for pasta, nome_pack in pacotes:
            pack = io.BytesIO()
            with zipfile.ZipFile(pack, 'w', zipfile.ZIP_DEFLATED) as zp:
                for rel, dados in sorted(arquivos.items()):
                    if rel.startswith(pasta + '/'):
                        zp.writestr(rel[len(pasta) + 1:], dados)
            z.writestr(nome_pack, pack.getvalue())
    return addon.getvalue()
