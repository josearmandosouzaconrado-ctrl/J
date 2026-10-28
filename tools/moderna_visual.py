"""Modelos e texturas detalhados da Guerra Moderna (estilo "boneco de Minecraft bem acabado").

- Soldados: o corpo é o modelo do jogador (tools/modelos/soldado_base.geo.json, cubos e UV intactos);
  aqui só entram a pintura (rosto, túnica, cinto, botas...) e os acessórios nos ossos vazios
  (chapéu/capacete em "helmet", arma em "rightItem", coldre e sabre no corpo).
- Tanque e blindado com saias laterais, faróis, escapamento, tambores, blindagem reativa e número pintado.
- Texturas pintadas em resolução dobrada (2 pixels por unidade de UV).
"""
from PIL import Image

ESC = 2  # pixels de textura por unidade de UV

PELES = [
    {"pele": (236, 196, 160), "sombra": (206, 160, 126), "cabelo": (110, 72, 40), "olho": (70, 110, 160)},
    {"pele": (190, 136, 96), "sombra": (160, 108, 74), "cabelo": (40, 28, 20), "olho": (70, 50, 30)},
    {"pele": (118, 78, 52), "sombra": (92, 60, 40), "cabelo": (20, 14, 10), "olho": (40, 28, 20)},
]


def tam_uv_cubo(cu):
    w, h, d = (int(round(v)) for v in cu["s"])
    return 2 * (w + d), d + h


def k(o, s, cor, inflate=0, rot=None, piv=None):
    cu = {"o": o, "s": s, "cor": cor if isinstance(cor, dict) else {"*": cor}, "inflate": inflate}
    if rot:
        cu["rot"] = rot
        cu["piv"] = piv
    return cu


# ------------------------------------------------------------------ visual por facção / classe

def visual(f, tipo):
    """(chapéu, rosto, comprimento da saia do casaco)."""
    if f == "oliva":
        if tipo == "atirador":
            return "boina", "humano", 3
        return "capacete", "humano" if tipo == "medico" else "mascara_gas", 3
    if f == "granito":
        return ("capacete", "humano", 2) if tipo == "medico" else ("capacete_exo", "visor_exo", 2)
    if f == "corvo":
        if tipo == "atirador":
            return "capuz", "balaclava", 3
        return ("capacete", "humano", 3) if tipo == "medico" else ("capacete", "balaclava", 3)
    if f == "caveira":
        if tipo in ("atirador", "medico"):
            return "quepe", "caveira", 8
        return "capacete_aba_larga", "caveira", 8
    if f == "azul":
        return ("boina", "bandana", 3) if tipo == "atirador" else ("capacete", "bandana", 3)
    return "capacete", "humano", 3


ARMAS = {
    "fuzileiro": [
        k([-7, 11, -1.5], [2, 4, 3], "coronha"),
        k([-7, 4, -1.5], [2, 7, 3], "arma"),
        k([-7, 6, 1.5], [2, 3, 2], "arma_escura"),
        k([-7, 0, -1], [2, 4, 2], "guarda_mao"),
        k([-6.5, -4, -0.5], [1, 4, 1], "arma_escura"),
        k([-7, 8, -2.5], [2, 2, 1], "arma_escura"),
    ],
    "atirador": [
        k([-7, 11, -1.5], [2, 4, 3], "coronha"),
        k([-7, 3, -1], [2, 8, 2], "arma"),
        k([-6.5, -10, -0.5], [1, 13, 1], "arma_escura"),
        k([-7, 3, -3.5], [2, 7, 2], "luneta"),
        k([-7.5, -2, 0.5], [1, 4, 1], "arma_escura", 0, [25, 0, 0], [-7, -2, 1]),
        k([-6.5, -2, 0.5], [1, 4, 1], "arma_escura", 0, [25, 0, 0], [-6, -2, 1]),
    ],
    "metralhador": [
        k([-7, 11, -1.5], [2, 4, 3], "coronha"),
        k([-7.5, 2, -2], [3, 9, 4], "arma"),
        k([-8.5, 5, 2], [5, 4, 3], "caixa_municao"),
        k([-6.5, -6, -0.5], [1, 8, 1], "arma_escura"),
        k([-7, -2, -1], [2, 3, 2], "guarda_mao"),
    ],
    "bazuca": [
        k([-8, -7, -2], [4, 22, 4], "lancador"),
        k([-8.5, -10, -2.5], [5, 3, 5], "ogiva"),
        k([-7, 6, 2], [2, 3, 2], "arma_escura"),
        k([-8, 9, -3], [2, 3, 1], "luneta"),
    ],
    "medico": [
        k([-7, 7, -1], [2, 6, 2], "arma"),
        k([-7, 5, -1], [2, 2, 2], "arma_escura"),
    ],
}


def chapeu(tipo_chapeu):
    if tipo_chapeu == "capacete":
        return [
            k([-4, 29, -4], [8, 3, 8], {"*": "capacete", "north": "capacete_frente"}, 0.75),
            k([-5, 28.2, -5], [10, 1, 10], "capacete_aba"),
        ]
    if tipo_chapeu == "capacete_aba_larga":
        return [
            k([-4, 29, -4], [8, 3, 8], {"*": "capacete", "north": "capacete_frente"}, 0.85),
            k([-5.5, 28.1, -5.5], [11, 1, 11], "capacete_aba"),
        ]
    if tipo_chapeu == "capacete_exo":
        return [
            k([-4, 24, -4], [8, 8, 8], {"*": "capacete", "north": "visor_exo_frente", "east": "capacete_lado", "west": "capacete_lado"}, 0.9),
            k([-5.6, 26, -1.5], [1, 3, 3], "metal"),
            k([4.6, 26, -1.5], [1, 3, 3], "metal"),
        ]
    if tipo_chapeu == "quepe":
        return [
            k([-4.5, 30.5, -4.5], [9, 3, 9], {"*": "quepe", "up": "quepe_topo", "north": "quepe_frente"}),
            k([-4, 29.5, -4], [8, 1, 8], "quepe_faixa", 0.6),
            k([-4, 29.2, -7], [8, 1, 3], "aba_couro"),
        ]
    if tipo_chapeu == "boina":
        return [
            k([-4.5, 30, -4.5], [9, 2, 9], {"*": "boina", "north": "boina_frente"}, 0.1, [0, 0, -7], [0, 31, 0]),
            k([-4, 29.5, -4], [8, 1, 8], "boina_faixa", 0.55),
        ]
    if tipo_chapeu == "capuz":
        return [k([-4, 24, -4], [8, 8, 8], {"*": "capuz", "north": "capuz_frente"}, 0.6)]
    return []


ESTEIRA = {"*": "esteira", "east": "rodas", "west": "rodas"}
CASCO = {"*": "blindagem", "up": "blindagem_topo"}
TORRE = {"*": "blindagem", "up": "blindagem_topo", "east": "torre_lado", "west": "torre_lado"}


def tanque():
    return [
        {"name": "root", "pivot": [0, 0, 0]},
        {"name": "casco", "parent": "root", "pivot": [0, 0, 0], "cubes": [
            k([-19, 0, -30], [7, 9, 60], ESTEIRA),
            k([12, 0, -30], [7, 9, 60], ESTEIRA),
            k([-12, 4, -28], [24, 10, 56], CASCO),
            k([-19, 9, -31], [38, 2, 62], CASCO),
            k([-20, 4, -27], [2, 5, 52], "saia_blindada"),
            k([18, 4, -27], [2, 5, 52], "saia_blindada"),
            k([-12, 5, -33], [24, 6, 5], {"*": "blindagem", "north": "frente_casco"}),
            k([-10, 11, 21], [20, 4, 8], "grade"),
            k([-11, 10, -34], [3, 2, 1], "farol"),
            k([8, 10, -34], [3, 2, 1], "farol"),
            k([-7, 11, 29], [4, 2, 2], "escapamento"),
            k([3, 11, 29], [4, 2, 2], "escapamento"),
            k([-17, 11, 20], [4, 4, 4], "tambor"),
            k([13, 11, 20], [4, 4, 4], "tambor"),
            k([-16, 11, -24], [1, 1, 30], "cabo"),
        ]},
        {"name": "torre", "parent": "casco", "pivot": [0, 14, -2], "cubes": [
            k([-11, 14, -14], [22, 7, 24], TORRE),
            k([-12, 15, -12], [1, 4, 10], "era"),
            k([11, 15, -12], [1, 4, 10], "era"),
            k([-9, 14, 10], [18, 6, 6], "caixa_carga"),
            k([-14, 15, -10], [2, 4, 6], "lancador_fumaca"),
            k([12, 15, -10], [2, 4, 6], "lancador_fumaca"),
            k([-4, 21, -3], [6, 2, 6], {"*": "metal", "up": "escotilha"}),
            k([3, 21, 2], [5, 1, 5], {"*": "metal", "up": "escotilha"}),
            k([6, 21, 7], [1, 12, 1], "antena"),
            k([-9, 21, 6], [1, 8, 1], "antena"),
            k([-10, 21, -11], [3, 3, 4], "periscopio"),
        ]},
        {"name": "canhao", "parent": "torre", "pivot": [0, 17.5, -14], "cubes": [
            k([-4, 15, -18], [8, 6, 4], CASCO),
            k([-1.5, 16.5, -50], [3, 3, 32], "cano"),
            k([-2, 16, -34], [4, 4, 6], "cano_luva"),
            k([-2.5, 15.5, -54], [5, 5, 4], "boca"),
        ]},
        {"name": "mg", "parent": "torre", "pivot": [0, 23, 0], "cubes": [
            k([-1.5, 23.5, -8], [1, 1, 7], "arma_escura"),
            k([-2, 23, -1], [2, 2, 3], "arma"),
        ]},
    ]


def blindado():
    return [
        {"name": "root", "pivot": [0, 0, 0]},
        {"name": "casco", "parent": "root", "pivot": [0, 0, 0], "cubes": [
            k([-16, 0, -32], [6, 8, 64], ESTEIRA),
            k([10, 0, -32], [6, 8, 64], ESTEIRA),
            k([-11, 3, -30], [22, 14, 60], {"*": "blindagem", "up": "blindagem_topo", "east": "casco_lado", "west": "casco_lado"}),
            k([-16, 8, -33], [32, 2, 66], CASCO),
            k([-17, 3, -29], [2, 5, 56], "saia_blindada"),
            k([15, 3, -29], [2, 5, 56], "saia_blindada"),
            k([-11, 6, -35], [22, 8, 5], {"*": "blindagem", "north": "frente_casco"}),
            k([-5, 4, 30], [10, 11, 1], "porta_traseira"),
            k([-10, 12, -36], [3, 2, 1], "farol"),
            k([7, 12, -36], [3, 2, 1], "farol"),
            k([-9, 17, 18], [6, 1, 8], {"*": "metal", "up": "escotilha"}),
            k([3, 17, 18], [6, 1, 8], {"*": "metal", "up": "escotilha"}),
        ]},
        {"name": "torre", "parent": "casco", "pivot": [0, 17, -2], "cubes": [
            k([-7, 17, -10], [14, 6, 14], TORRE),
            k([7, 18, -6], [3, 4, 7], "lancador_fumaca"),
            k([-10, 18, -6], [3, 4, 7], "caixa_carga"),
            k([-2, 23, 0], [4, 2, 4], {"*": "metal", "up": "escotilha"}),
            k([-6, 23, 2], [1, 10, 1], "antena"),
            k([2, 23, -6], [3, 3, 3], "periscopio"),
        ]},
        {"name": "canhao", "parent": "torre", "pivot": [0, 20, -10], "cubes": [
            k([-2.5, 18.5, -12], [5, 4, 2], "boca"),
            k([-1, 19.5, -38], [2, 2, 26], "cano"),
            k([-1.5, 19, -40], [3, 3, 2], "boca"),
        ]},
    ]


def comando():
    return [
        {"name": "root", "pivot": [0, 0, 0], "cubes": [
            k([-16, 0, -16], [32, 12, 32], {"*": "concreto", "up": "concreto_topo", "north": "bunker_frente"}),
            k([-18, 0, -18], [36, 3, 4], "sacos"),
            k([-18, 0, 14], [36, 3, 4], "sacos"),
            k([-18, 0, -14], [4, 3, 28], "sacos"),
            k([10, 12, 10], [2, 22, 2], "metal"),
            k([-12, 12, -12], [1, 24, 1], "metal"),
            k([2, 12, -12], [8, 4, 6], "caixa_carga"),
        ]},
        {"name": "radar", "parent": "root", "pivot": [0, 13, 0], "cubes": [
            k([-1, 12, -1], [2, 3, 2], "metal"),
            k([-5, 15, -1], [10, 5, 1], "radar"),
        ]},
        {"name": "bandeira", "parent": "root", "pivot": [-12, 30, -12], "cubes": [k([-11, 28, -12], [10, 7, 1], "bandeira")]},
    ]


def projetil(tam):
    h = tam / 2
    return [{"name": "body", "pivot": [0, 0, 0], "cubes": [k([-h, 0, -h], [tam, tam, tam], "brilho")]}]


# ------------------------------------------------------------------ geometria

def geo_json(ident, bones, larg, alt):
    saida = []
    for b in bones:
        nb = {"name": b["name"], "pivot": b["pivot"]}
        if "parent" in b:
            nb["parent"] = b["parent"]
        if b.get("cubes"):
            nb["cubes"] = []
            for cu in b["cubes"]:
                cj = {"origin": cu["o"], "size": cu["s"], "uv": cu["uv"]}
                if cu["inflate"]:
                    cj["inflate"] = cu["inflate"]
                if cu.get("rot"):
                    cj["rotation"] = cu["rot"]
                    cj["pivot"] = cu["piv"]
                nb["cubes"].append(cj)
        saida.append(nb)
    return {
        "format_version": "1.12.0",
        "minecraft:geometry": [{
            "description": {
                "identifier": ident, "texture_width": larg, "texture_height": alt,
                "visible_bounds_width": 5, "visible_bounds_height": 4, "visible_bounds_offset": [0, 1.5, 0],
            },
            "bones": saida,
        }],
    }


# ------------------------------------------------------------------ pintura (2 px por unidade)

def mix(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def esc(c, f):
    return tuple(max(0, min(255, int(v * f))) for v in c[:3])


def _hash(x, y, s=0):
    h = (x * 374761393 + y * 668265263 + s * 2147483647) & 0xFFFFFFFF
    h = (h ^ (h >> 13)) * 1274126177 & 0xFFFFFFFF
    return (h ^ (h >> 16)) / 0xFFFFFFFF


def ruido(c, gx, gy, forca=0.06, s=1):
    return esc(c, 1 + (_hash(gx, gy, s) - 0.5) * 2 * forca)


DIGITOS = {
    "0": ["111", "101", "101", "101", "111"], "1": ["010", "110", "010", "010", "111"], "2": ["111", "001", "111", "100", "111"],
    "3": ["111", "001", "111", "001", "111"], "4": ["101", "101", "111", "001", "001"], "5": ["111", "100", "111", "001", "111"],
    "6": ["111", "100", "111", "101", "111"], "7": ["111", "001", "010", "010", "010"], "8": ["111", "101", "111", "101", "111"],
    "9": ["111", "101", "111", "001", "111"],
}


class Pintor:
    def __init__(self, p, rostos, pele):
        self.p = p  # paleta da facção
        self.pele = pele

    def tecido(self, base, i, j, W, H, gx, gy):
        c = ruido(base, gx, gy, 0.05)
        if j >= H - 2:
            c = esc(c, 0.82)  # sombra na barra
        if j < 1:
            c = esc(c, 1.08)
        return c

    def camo(self, gx, gy, bloco=3):
        lista = self.p["camo"]
        v = _hash(gx // bloco, gy // bloco, 3)
        # manchas maiores: mistura de dois tamanhos de bloco
        w = _hash(gx // (bloco * 2), gy // (bloco * 2), 5)
        idx = int((v * 0.5 + w * 0.5) * len(lista)) % len(lista)
        return ruido(lista[idx], gx, gy, 0.04)

    def base_uniforme(self, gx, gy):
        return self.camo(gx, gy) if self.p.get("uniforme_camo") else self.p["uniforme"]

    def rosto(self, estilo, i, j, W, H, gx, gy):
        pl = self.pele
        pele, sombra, cabelo, olho = pl["pele"], pl["sombra"], pl["cabelo"], pl["olho"]
        branco, preto = (240, 238, 232), (25, 22, 20)
        # sobrancelhas (8), olhos (9-10), nariz (12), boca (14) — abaixo da aba do capacete
        def humano():
            if j < 4:
                return ruido(cabelo, gx, gy, 0.08)
            if j in (4, 5) and i in (0, 1, 14, 15):
                return cabelo
            if j == 8 and i in (3, 4, 5, 10, 11, 12):
                return esc(cabelo, 1.1)
            if j in (9, 10):
                if i in (3, 4, 11, 12):
                    return branco
                if i in (5, 10):
                    return olho if j == 9 else esc(olho, 0.6)
            if j == 12 and i in (7, 8):
                return sombra
            if j == 14 and 6 <= i <= 9:
                return esc(sombra, 0.8)
            if j >= 14 and i in (0, 15):
                return sombra
            return ruido(pele, gx, gy, 0.03)
        if estilo == "humano":
            return humano()
        if estilo == "mascara_gas":
            m = self.p["mascara"]
            if j < 6:
                return humano() if j < 3 else ruido(m, gx, gy, 0.05)
            if j in (8, 9, 10) and i in (2, 3, 4, 5, 10, 11, 12, 13):
                borda = j in (8, 10) or i in (2, 5, 10, 13)
                return self.p["metal"] if borda else (40, 55, 60)
            if j >= 11 and 6 <= i <= 9:
                return esc(self.p["metal"], 1.15) if (i + j) % 2 else self.p["metal"]
            return ruido(m, gx, gy, 0.05)
        if estilo == "visor_exo":
            cap = self.p["capacete"]
            if 8 <= j <= 10:
                return self.p["visor"] if 1 <= i <= 14 else esc(cap, 0.7)
            return ruido(cap, gx, gy, 0.05)
        if estilo == "balaclava":
            if j in (8, 9, 10):
                return self.p["visor"] if 2 <= i <= 13 else (20, 20, 24)
            return ruido((28, 28, 32), gx, gy, 0.06)
        if estilo == "caveira":
            osso = self.p["mascara"]
            if j < 4:
                return ruido(osso, gx, gy, 0.04)
            if j in (7, 8, 9, 10) and (2 <= i <= 5 or 10 <= i <= 13):
                if j in (8, 9) and i in (4, 11):
                    return (200, 40, 40)
                return (18, 14, 14)
            if j in (11, 12) and i in (7, 8):
                return (40, 32, 30)
            if j == 13 and 2 <= i <= 13:
                return (40, 32, 30) if i % 2 else osso
            if j == 14 and 3 <= i <= 12:
                return esc(osso, 0.85)
            return ruido(osso, gx, gy, 0.04)
        if estilo == "bandana":
            if j >= 11:
                b = self.p["mascara"]
                if j == 13 and 3 <= i <= 12:
                    return preto if i % 2 else b
                if j == 11 and i in (4, 5, 10, 11):
                    return preto
                return ruido(b, gx, gy, 0.04)
            if j in (9, 10) and 2 <= i <= 13:
                return (25, 25, 28) if not (i in (7, 8)) else (60, 60, 64)  # óculos escuros
            return humano()
        return humano()

    def cor(self, chave, i, j, W, H, gx, gy, face):
        p = self.p
        pl = self.pele
        if chave.startswith("rosto:"):
            return self.rosto(chave.split(":")[1], i, j, W, H, gx, gy)
        if chave == "pele":
            return ruido(pl["pele"], gx, gy, 0.03)
        if chave == "lado_cabeca":
            if j < 4 or (j < 7 and (i < 3 or i > W - 4) and False):
                return ruido(pl["cabelo"], gx, gy, 0.08)
            if j < 6 and i > W - 5:
                return ruido(pl["cabelo"], gx, gy, 0.08)
            if 7 <= j <= 10 and 6 <= i <= 8:
                return pl["sombra"]  # orelha
            return ruido(pl["pele"], gx, gy, 0.03)
        if chave in ("nuca", "topo_cabeca"):
            return ruido(pl["cabelo"], gx, gy, 0.1) if chave == "topo_cabeca" or j < 11 else ruido(pl["pele"], gx, gy, 0.03)
        if chave in ("casaco", "casaco_costas", "saia"):
            c = self.tecido(self.base_uniforme(gx, gy), i, j, W, H, gx, gy)
            if chave == "casaco_costas" and j in (H // 2, H // 2 + 1):
                return esc(c, 0.85)
            return c
        if chave in ("casaco_frente", "saia_frente"):
            base = self.base_uniforme(gx, gy)
            c = self.tecido(base, i, j, W, H, gx, gy)
            if i in (W // 2 - 1, W // 2):
                c = esc(c, 0.86)  # abotoamento
                if chave == "casaco_frente" and j % 5 == 2:
                    return p["botao"]
            if chave == "casaco_frente":
                # bolsos do peito
                if 4 <= j <= 9 and (2 <= i <= 5 or W - 6 <= i <= W - 3):
                    if j == 4 or i in (2, 5, W - 6, W - 3):
                        return esc(c, 0.78)
                # correias cruzadas (oficiais de casaco)
                if not p.get("colete_visivel"):
                    if abs((i - 1) - j * (W - 3) / H) < 1.2 or abs((W - 2 - i) - j * (W - 3) / H) < 1.2:
                        return ruido(p["couro"], gx, gy, 0.05)
            return c
        if chave == "tunica_frente":
            # túnica com botões, bolsos e correia cruzada; facções modernas usam colete por cima
            c = self.cor("casaco_frente", i, j, W, H, gx, gy, face)
            if p.get("colete_visivel") and 3 <= j < int(H * 0.62):
                c = self.cor("colete_frente", i, j - 3, W, H, gx, gy, face)
                if j == 3 or i in (0, W - 1):
                    c = esc(c, 0.8)
            if H - 6 <= j < H - 3:
                c = ruido(p["couro"], gx, gy, 0.07)  # cinto
                if W // 2 - 2 <= i <= W // 2 + 1:
                    c = p["fivela"]
                if j == H - 6:
                    c = esc(c, 0.85)
            if j >= H - 3:
                c = self.tecido(self.base_uniforme(gx, gy), i, j, W, H, gx, gy)
            return c
        if chave == "perna_bota":
            meio = H // 2
            if j < meio:
                c = self.cor("calca", i, j, W, H, gx, gy, face)
                if p.get("joelheira_metal") and face == "north" and meio - 6 <= j < meio - 1:
                    return esc(ruido(p["metal"], gx, gy, 0.05), 0.9)
                if p.get("colete_visivel") and face == "north" and meio - 6 <= j < meio - 1 and 1 <= i <= W - 2:
                    return esc(ruido(p["colete"], gx, gy, 0.05), 0.72)  # joelheira
                return c
            return self.cor("bota_frente" if face == "north" else "bota", i, j - meio, W, H - meio, gx, gy, face)
        if chave == "capa":
            if p.get("colete_visivel"):
                # mochila presa às costas
                c = self.tecido(esc(p["colete"], 0.85) if not p.get("colete_camo") else self.camo(gx, gy), i, j, W, H, gx, gy)
                if j in (3, 4) or i in (1, W - 2):
                    return esc(c, 0.72)
                if 8 <= j <= 12 and 3 <= i <= W - 4:
                    return esc(c, 0.9)
                return c
            c = self.tecido(self.base_uniforme(gx, gy), i, j, W, H, gx, gy)  # aba do casaco longo
            if i in (W // 2 - 1, W // 2) and j > H // 2:
                return esc(c, 0.78)
            return c
        if chave in ("colete", "colete_costas"):
            return self.tecido(p["colete"], i, j, W, H, gx, gy) if not p.get("colete_camo") else self.camo(gx, gy)
        if chave == "colete_frente":
            base = self.camo(gx, gy) if p.get("colete_camo") else p["colete"]
            c = self.tecido(base, i, j, W, H, gx, gy)
            if j % 5 == 0:
                return esc(c, 0.75)  # fitas MOLLE
            if j < 3 and (i in (2, 3) or i in (W - 4, W - 3)):
                return p["acento"]  # faixa de identificação
            return c
        if chave == "bolsa":
            c = self.tecido(esc(p["colete"], 0.92) if not p.get("colete_camo") else self.camo(gx, gy), i, j, W, H, gx, gy)
            return esc(c, 0.75) if j == 1 else c
        if chave in ("cinto", "cinto_frente", "coldre", "aba_couro", "bainha"):
            c = ruido(p["couro"], gx, gy, 0.07)
            if chave == "cinto_frente" and W // 2 - 2 <= i <= W // 2 + 1:
                return p["fivela"]
            if chave == "coldre" and j < 2:
                return esc(c, 0.8)
            if chave == "bainha" and j < 2:
                return p["fivela"]
            return esc(c, 0.85) if j in (0, H - 1) else c
        if chave == "gola":
            return self.tecido(esc(self.p["uniforme"] if not p.get("uniforme_camo") else self.camo(gx, gy), 0.9), i, j, W, H, gx, gy)
        if chave == "dragona":
            c = ruido(p.get("dragona", p["acento"]), gx, gy, 0.05)
            return esc(c, 0.8) if i in (0, W - 1) else c
        if chave == "manga":
            mao = H - 6
            if j >= mao:
                return self.cor("mao", i, j, W, H, gx, gy, face)
            if mao - 2 <= j < mao:
                return esc(self.base_uniforme(gx, gy), 0.8)  # punho
            c = self.tecido(self.base_uniforme(gx, gy), i, j, W, H, gx, gy)
            if 8 <= j <= 10:
                return p["acento"] if p.get("faixa_braco") else c
            if j % 9 == 4:
                return esc(c, 0.9)  # dobras
            return c
        if chave == "mao":
            return ruido(p["luva"], gx, gy, 0.06) if p.get("luva") else ruido(pl["pele"], gx, gy, 0.03)
        if chave == "calca":
            base = self.camo(gx, gy) if p.get("calca_camo") else p["calca"]
            c = self.tecido(base, i, j, W, H, gx, gy)
            if i == W // 2 and face == "north":
                return esc(c, 0.85)  # vinco
            return c
        if chave in ("bota", "bota_frente"):
            c = ruido(p["bota"], gx, gy, 0.06)
            if j >= H - 2:
                return (20, 18, 16)  # sola
            if j < 2:
                return esc(c, 1.15)  # cano dobrado
            if chave == "bota_frente" and j > 4 and j % 2 == 0 and 2 <= i <= W - 3:
                return esc(c, 0.7)  # cadarço
            return c
        if chave == "sola":
            return (20, 18, 16)
        if chave == "joelheira":
            c = ruido(p["metal"] if p.get("joelheira_metal") else esc(p["colete"], 0.7), gx, gy, 0.05)
            return esc(c, 0.75) if (i in (0, W - 1) or j in (0, H - 1)) else c
        if chave in ("mochila", "mochila_costas"):
            c = self.tecido(esc(p["colete"], 0.85) if not p.get("colete_camo") else self.camo(gx, gy), i, j, W, H, gx, gy)
            if chave == "mochila_costas" and (j == 4 or i in (2, W - 3)):
                return esc(c, 0.75)
            return c
        if chave == "cruz":
            mx, my = W / 2 - 0.5, H / 2 - 0.5
            if (abs(i - mx) < 1.5 and abs(j - my) < 4.5) or (abs(j - my) < 1.5 and abs(i - mx) < 4.5):
                return (210, 30, 30)
            return ruido((236, 236, 232), gx, gy, 0.03)
        if chave == "cantil":
            return ruido((70, 80, 60), gx, gy, 0.06) if j > 1 else (40, 40, 40)
        if chave == "antena":
            return (30, 30, 32)
        if chave in ("capacete", "capacete_frente", "capacete_lado"):
            base = self.camo(gx, gy, 2) if p.get("capacete_camo") else p["capacete"]
            c = ruido(base, gx, gy, 0.06)
            if chave == "capacete_frente" and j > H - 3:
                return esc(c, 0.8)
            if chave == "capacete" and face == "up" and (i + j) % 6 == 0 and p.get("rede"):
                return esc(c, 0.7)  # rede de camuflagem
            if chave == "capacete_lado" and 4 <= j <= 6:
                return p["acento"]
            return c
        if chave == "capacete_aba":
            base = p["capacete"] if not p.get("capacete_camo") else self.camo(gx, gy, 2)
            return esc(ruido(base, gx, gy, 0.05), 0.85)
        if chave == "visor_exo_frente":
            return self.rosto("visor_exo", i, j, W, H, gx, gy)
        if chave == "oculos":
            return (25, 25, 25) if i % 6 not in (0, 5) else p["metal"]
        if chave in ("quepe", "quepe_topo", "quepe_frente"):
            c = ruido(p["quepe"], gx, gy, 0.05)
            if chave == "quepe_frente" and W // 2 - 2 <= i <= W // 2 + 1 and 1 <= j <= 4:
                return p["fivela"] if (i + j) % 2 else (230, 225, 210)  # insígnia
            return c
        if chave == "quepe_faixa":
            return ruido(p["acento"], gx, gy, 0.05)
        if chave in ("boina", "boina_frente"):
            c = ruido(p["boina"], gx, gy, 0.05)
            if chave == "boina_frente" and 3 <= i <= 6 and 1 <= j <= 3:
                return p["fivela"]
            return c
        if chave == "boina_faixa":
            return (28, 26, 24)
        if chave in ("capuz", "capuz_frente"):
            c = ruido((26, 26, 30), gx, gy, 0.06)
            if chave == "capuz_frente" and 3 <= i <= W - 4 and 7 <= j <= H - 1:
                return None  # abertura transparente: mostra o rosto
            return c
        # ---------------- armas
        if chave == "arma":
            c = ruido(p["arma"], gx, gy, 0.05)
            return esc(c, 1.25) if i == 0 else c
        if chave in ("arma_escura", "luneta"):
            c = ruido((32, 33, 36), gx, gy, 0.05)
            if chave == "luneta" and j in (0, H - 1):
                return (60, 140, 180)
            return c
        if chave == "coronha":
            return ruido(p["coronha"], gx, gy, 0.06)
        if chave == "guarda_mao":
            return esc(ruido(p["arma"], gx, gy, 0.05), 0.75) if j % 2 else ruido(p["arma"], gx, gy, 0.05)
        if chave == "caixa_municao":
            c = ruido((78, 86, 60), gx, gy, 0.06)
            return (210, 170, 60) if j == 0 else c
        if chave == "lancador":
            c = ruido((86, 94, 62), gx, gy, 0.06)
            return (40, 40, 40) if j in (2, H - 3) else c
        if chave == "ogiva":
            return ruido((92, 100, 66), gx, gy, 0.05) if j > 2 else (40, 40, 40)
        if chave == "dourado":
            return ruido(p["fivela"], gx, gy, 0.08)
        # ---------------- veículos
        if chave in ("blindagem", "blindagem_topo", "torre_lado", "frente_casco", "casco_lado"):
            base = self.camo(gx, gy, 8) if p.get("veiculo_camo") else p["veiculo"]
            c = ruido(base, gx, gy, 0.05, 7)
            # desgaste: sujeira subindo da parte de baixo
            if face != "up":
                c = mix(c, (88, 74, 56), max(0, (j - H * 0.7) / (H * 0.3)) * 0.45)
            if i % 24 == 0 or j % 20 == 0:
                c = esc(c, 0.78)  # linhas de painel
            elif i % 24 == 1 or j % 20 == 1:
                c = esc(c, 1.12)
            if (i % 24 == 3 or i % 24 == 21) and j % 6 == 3:
                c = esc(c, 1.3)  # rebites
            if chave == "torre_lado":
                # número e emblema da facção pintados na lateral da torre
                num = p["numero"]
                x0, y0 = 6, 4
                for n, dig in enumerate(num):
                    for r, linha in enumerate(DIGITOS[dig]):
                        for q, ch in enumerate(linha):
                            if ch == "1" and i in (x0 + n * 8 + q * 2, x0 + n * 8 + q * 2 + 1) and j in (y0 + r * 2, y0 + r * 2 + 1):
                                return (230, 228, 220)
                cx, cy = W - 10, H // 2
                if (i - cx) ** 2 + (j - cy) ** 2 <= 9:
                    return p["acento"]
            if chave == "frente_casco" and j in (H // 2,) and i % 4 < 2:
                return (40, 40, 40)
            if chave == "casco_lado" and H // 3 <= j <= H // 3 + 3 and i % 30 in range(4, 12):
                return (35, 40, 45)  # vigias
            return c
        if chave == "saia_blindada":
            c = ruido(p["veiculo"] if not p.get("veiculo_camo") else self.camo(gx, gy, 8), gx, gy, 0.05)
            c = mix(c, (88, 74, 56), 0.25)
            if i % 16 == 0:
                return esc(c, 0.7)
            if i % 16 == 3 and j in (2, H - 3):
                return esc(c, 1.3)
            return c
        if chave == "esteira":
            return (70, 70, 72) if (j + i // 4) % 4 == 0 else ruido((36, 36, 38), gx, gy, 0.1)
        if chave == "rodas":
            raio = max(3, H // 2 - 2)
            passo = raio * 2 + 3
            cx = (i % passo) - passo / 2 + 0.5
            cy = j - H / 2 + 0.5
            d = (cx * cx + cy * cy) ** 0.5
            if j <= 1 or j >= H - 2:
                return (70, 70, 72) if (i // 2) % 2 else (36, 36, 38)
            if d < raio * 0.3:
                return (120, 120, 118)
            if d < raio * 0.75:
                return esc(p["veiculo"] if not p.get("veiculo_camo") else p["camo"][0], 0.9)
            if d < raio:
                return (40, 40, 42)
            return (28, 28, 30)
        if chave == "grade":
            return (30, 30, 32) if i % 3 == 0 else (75, 75, 78)
        if chave == "farol":
            return (250, 245, 210) if 1 <= i <= W - 2 and 1 <= j <= H - 2 else (40, 40, 40)
        if chave in ("escapamento", "boca"):
            return (30, 28, 26) if face in ("north", "south") and 1 <= i <= W - 2 and 1 <= j <= H - 2 else ruido((58, 56, 54), gx, gy, 0.08)
        if chave == "tambor":
            c = ruido((70, 86, 54), gx, gy, 0.06)
            return esc(c, 0.7) if j in (2, H - 3) else c
        if chave == "cabo":
            return (40, 38, 34) if (i + j) % 3 else (90, 86, 78)
        if chave == "era":
            c = ruido(esc(p["veiculo"] if not p.get("veiculo_camo") else p["camo"][1], 0.9), gx, gy, 0.05)
            return esc(c, 0.7) if (i % 6 == 0 or j % 6 == 0) else c
        if chave in ("caixa_carga", "lancador_fumaca", "periscopio", "porta_traseira"):
            c = ruido(esc(p["veiculo"] if not p.get("veiculo_camo") else p["camo"][0], 0.82), gx, gy, 0.06)
            if chave == "lancador_fumaca" and face == "north" and (i % 4 in (1, 2)) and (j % 4 in (1, 2)):
                return (25, 25, 25)
            if chave == "periscopio" and face == "north" and j in (1, 2):
                return (80, 160, 200)
            return esc(c, 0.75) if (i in (0, W - 1) or j in (0, H - 1)) else c
        if chave == "escotilha":
            cx, cy = W / 2 - 0.5, H / 2 - 0.5
            d = ((i - cx) ** 2 + (j - cy) ** 2) ** 0.5
            return (50, 52, 55) if abs(d - min(W, H) / 2.6) < 0.8 else ruido((86, 88, 92), gx, gy, 0.05)
        if chave in ("cano", "cano_luva"):
            c = ruido(p["veiculo"] if not p.get("veiculo_camo") else p["camo"][0], gx, gy, 0.04)
            return esc(c, 1.15) if j == 0 or i == 0 else (esc(c, 0.85) if chave == "cano_luva" else c)
        if chave == "metal":
            return ruido((92, 95, 100), gx, gy, 0.06)
        if chave in ("concreto", "concreto_topo", "bunker_frente"):
            base = (130, 130, 126)
            if chave == "bunker_frente" and H // 3 <= j <= H // 3 + 3 and 4 < i < W - 5:
                return (18, 18, 18)
            c = ruido(base, gx, gy, 0.1, 9)
            if j % 16 == 0:
                c = esc(c, 0.85)
            if _hash(gx // 3, gy // 3, 11) > 0.93:
                c = esc(c, 0.7)  # marcas de tiro
            return c
        if chave == "sacos":
            base = (150, 132, 96)
            return esc(ruido(base, gx, gy, 0.06), 0.72 if (i % 10 == 0 or j % 6 == 0) else 1.0)
        if chave == "radar":
            return (200, 200, 205) if (i + j) % 5 else (150, 150, 155)
        if chave == "bandeira":
            return p["acento"] if j < H // 2 else esc(p["acento"], 0.6)
        if chave == "brilho":
            return (255, 225, 140)
        if chave == "vazio":
            return None
        return p.get(chave, (255, 0, 255))


def pintar(bones, larg, alt, paleta, pele=None):
    img = Image.new("RGBA", (larg * ESC, alt * ESC), (0, 0, 0, 0))
    px = img.load()
    pt = Pintor(paleta, None, pele or PELES[0])

    def area(x0, y0, w, h, chave, face):
        W, H = w * ESC, h * ESC
        if W <= 0 or H <= 0:
            return
        for i in range(W):
            for j in range(H):
                gx, gy = x0 * ESC + i, y0 * ESC + j
                cor = pt.cor(chave, i, j, W, H, gx, gy, face)
                if cor is None:
                    continue
                if face == "up" and not chave.startswith("rosto"):
                    cor = esc(cor, 1.06)
                elif face == "down":
                    cor = esc(cor, 0.72)
                px[gx, gy] = tuple(int(v) for v in cor[:3]) + (255,)

    for b in bones:
        for cu in b.get("cubes", []):
            cores = cu["cor"]
            pega = lambda f: cores.get(f, cores.get("*"))  # noqa: E731
            if isinstance(cu["uv"], dict):
                # UV por face: (u, v, largura, altura), tamanhos negativos espelham a mesma região
                for face, r in cu["uv"].items():
                    (u, v), (w, h) = r["uv"], r["uv_size"]
                    x0, y0 = min(u, u + w), min(v, v + h)
                    area(int(x0), int(y0), int(abs(w)), int(abs(h)), pega(face), face)
                continue
            w, h, d = (int(round(v)) for v in cu["s"])
            u, v = cu["uv"]
            area(u + d, v, w, d, pega("up"), "up")
            area(u + d + w, v, w, d, pega("down"), "down")
            area(u, v + d, d, h, pega("east"), "east")
            area(u + d, v + d, w, h, pega("north"), "north")
            area(u + d + w, v + d, d, h, pega("west"), "west")
            area(u + 2 * d + w, v + d, w, h, pega("south"), "south")
    return img


# ------------------------------------------------------------------ paletas das facções

PALETAS = {
    "oliva": {
        "uniforme": (92, 92, 56), "calca": (84, 82, 55), "colete": (98, 98, 60), "capacete": (104, 102, 60),
        "couro": (96, 64, 38), "fivela": (180, 170, 140), "bota": (110, 72, 44), "metal": (62, 66, 80), "acento": (228, 198, 40),
        "mascara": (48, 48, 50), "visor": (40, 40, 42), "botao": (60, 60, 40), "luva": (70, 64, 50), "arma": (58, 62, 74),
        "coronha": (60, 62, 56), "boina": (72, 86, 46), "quepe": (92, 92, 56), "veiculo": (96, 98, 58), "numero": "12",
        "camo": [(84, 80, 60), (98, 96, 62), (70, 68, 52)], "colete_visivel": True, "faixa_braco": True, "rede": True,
    },
    "granito": {
        "uniforme": (140, 142, 140), "uniforme_camo": True, "calca": (88, 98, 74), "calca_camo": True, "colete": (150, 152, 150),
        "capacete": (162, 164, 162), "couro": (70, 70, 72), "fivela": (180, 180, 184), "bota": (64, 64, 66), "metal": (98, 100, 104),
        "acento": (255, 185, 60), "mascara": (60, 60, 60), "visor": (255, 175, 60), "botao": (90, 90, 90), "luva": (60, 62, 62),
        "arma": (70, 72, 78), "coronha": (60, 62, 66), "boina": (90, 96, 80), "quepe": (120, 122, 120), "veiculo": (150, 152, 148),
        "numero": "07", "camo": [(80, 92, 66), (104, 112, 86), (62, 70, 54), (138, 140, 138)], "colete_visivel": True,
        "joelheira_metal": True,
    },
    "corvo": {
        "uniforme": (34, 34, 40), "calca": (30, 30, 36), "colete": (46, 46, 52), "capacete": (32, 32, 38), "couro": (26, 26, 30),
        "fivela": (150, 150, 155), "bota": (20, 20, 24), "metal": (78, 78, 86), "acento": (255, 140, 30), "mascara": (28, 28, 32),
        "visor": (90, 205, 255), "botao": (60, 60, 66), "luva": (22, 22, 26), "arma": (40, 40, 46), "coronha": (30, 30, 34),
        "boina": (30, 30, 34), "quepe": (34, 34, 40), "veiculo": (40, 40, 46), "numero": "99",
        "camo": [(30, 30, 35), (45, 45, 52), (22, 22, 26)], "colete_visivel": True, "faixa_braco": True, "dragona": (255, 140, 30),
    },
    "caveira": {
        "uniforme": (78, 84, 96), "calca": (58, 60, 70), "colete": (70, 72, 82), "capacete": (55, 58, 66), "couro": (66, 44, 30),
        "fivela": (210, 170, 60), "bota": (30, 28, 30), "metal": (66, 66, 72), "acento": (150, 40, 36), "mascara": (228, 222, 205),
        "visor": (228, 222, 205), "botao": (210, 170, 60), "luva": (34, 30, 30), "arma": (52, 52, 58), "coronha": (92, 60, 36),
        "boina": (60, 30, 30), "quepe": (60, 64, 74), "veiculo": (82, 86, 96), "numero": "13", "dragona": (210, 170, 60),
        "camo": [(78, 84, 96), (70, 76, 88), (86, 92, 104)],
    },
    "azul": {
        "uniforme": (88, 104, 66), "uniforme_camo": True, "calca": (64, 78, 52), "calca_camo": True, "colete": (82, 96, 62),
        "colete_camo": True, "capacete": (90, 160, 225), "couro": (70, 52, 36), "fivela": (170, 160, 130), "bota": (44, 38, 32),
        "metal": (58, 54, 48), "acento": (90, 160, 225), "mascara": (232, 228, 216), "visor": (230, 226, 215), "botao": (50, 50, 40),
        "arma": (46, 46, 50), "coronha": (110, 76, 46), "boina": (80, 150, 215), "quepe": (88, 104, 66), "veiculo": (210, 212, 205),
        "veiculo_camo": False, "numero": "24", "camo": [(70, 92, 58), (102, 96, 64), (48, 56, 40), (120, 108, 80)],
        "colete_visivel": True, "faixa_braco": True, "dragona": (90, 160, 225),
    },
}


# ------------------------------------------------------------------ soldado a partir do modelo do jogador

import copy as _copy
import json as _json
import os as _os

_BASE = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "modelos", "soldado_base.geo.json")

PINTURA_BASE = {
    "body": {"*": "casaco", "north": "tunica_frente", "south": "casaco_costas"},
    "rightArm": {"*": "manga", "down": "mao"},
    "leftArm": {"*": "manga", "down": "mao"},
    "rightLeg": {"*": "perna_bota", "down": "sola"},
    "leftLeg": {"*": "perna_bota", "down": "sola"},
    "cape": {"*": "capa"},
}


def modelo_base():
    with open(_BASE, encoding="utf-8") as fh:
        return _json.load(fh)["minecraft:geometry"][0]


def soldado_do_jogador(f, tipo):
    """Usa os cubos do modelo do jogador como estão e acrescenta acessórios nos ossos vazios.

    Devolve (ossos, cubos_acessorios, largura_base, altura_base).
    """
    g = modelo_base()
    tipo_chapeu, rosto, _ = visual(f, tipo)
    ossos = []
    for b in g["bones"]:
        nb = {k: _copy.deepcopy(v) for k, v in b.items() if k != "cubes"}
        nb["cubes"] = []
        for cu in b.get("cubes", []):
            if b["name"] == "head":
                cor = {"north": f"rosto:{rosto}", "east": "lado_cabeca", "west": "lado_cabeca", "south": "nuca",
                       "up": "topo_cabeca", "down": "pele", "*": "pele"}
            else:
                cor = PINTURA_BASE.get(b["name"], {"*": "casaco"})
            nb["cubes"].append({"o": cu["origin"], "s": cu["size"], "uv": cu["uv"], "cor": dict(cor),
                                "inflate": cu.get("inflate", 0), "fixo": True})
        ossos.append(nb)
    por_nome = {b["name"]: b for b in ossos}
    acessorios = []

    def por(osso, cubos):
        por_nome[osso]["cubes"].extend(cubos)
        acessorios.extend(cubos)

    por("helmet", chapeu(tipo_chapeu))
    if tipo_chapeu == "capacete" and f in ("oliva", "corvo"):
        por("helmet", [k([-3, 30.2, -5.2], [6, 1, 1], "oculos", 0.25)])
    por("rightItem", _copy.deepcopy(ARMAS[tipo]))
    cinto = [k([2, 9.5, -3], [2, 3, 1], "coldre", 0.1)]
    if f == "caveira":
        cinto += [
            k([4.6, 1, -0.5], [1, 10, 1], "bainha", 0, [0, 0, -10], [5, 11, 0]),
            k([4.2, 10.5, -1], [2, 2, 2], "dourado", 0, [0, 0, -10], [5, 11, 0]),
        ]
    por("body", cinto)
    d = g["description"]
    return ossos, acessorios, d["texture_width"], d["texture_height"]


def geo_do_jogador(ident, ossos, larg, alt):
    """JSON de geometria preservando o UV original (inclusive o UV por face da capa)."""
    saida = []
    for b in ossos:
        nb = {k: v for k, v in b.items() if k != "cubes"}
        if b["cubes"]:
            nb["cubes"] = []
            for cu in b["cubes"]:
                cj = {"origin": cu["o"], "size": cu["s"], "uv": cu["uv"]}
                if cu["inflate"]:
                    cj["inflate"] = cu["inflate"]
                if cu.get("rot"):
                    cj["rotation"] = cu["rot"]
                    cj["pivot"] = cu["piv"]
                nb["cubes"].append(cj)
        saida.append(nb)
    base = modelo_base()["description"]
    return {
        "format_version": "1.12.0",
        "minecraft:geometry": [{
            "description": {**base, "identifier": ident, "texture_width": larg, "texture_height": alt},
            "bones": saida,
        }],
    }
