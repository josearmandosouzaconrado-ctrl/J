"""Gera modelos, texturas, entidades, itens, sons e textos do addon Guerra Moderna.

Reaproveita o empacotador de UV e a escrita de geometria do gerador da Guerra Futurista.
Uso: python3 tools/moderna_gerar.py   (requer Pillow; rode antes tools/moderna_sons.py)
"""
import json
import os
import sys

from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from guerra_gerar import c, empacotar, escurecer, salvar_json, salvar_img  # noqa: E402
import moderna_visual as V  # noqa: E402

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BP = os.path.join(RAIZ, "Moderna_BP")
RP = os.path.join(RAIZ, "Moderna_RP")

FACCOES = {
    "oliva": {
        "nome": "Força Tarefa Oliva", "rosto": "gas", "ovo": ("#62623A", "#E4C628"),
        "cores": {"pri": (98, 98, 58), "sec": (80, 76, 58), "dark": (42, 42, 38), "metal": (62, 66, 80), "acento": (228, 198, 40),
                  "capacete": (104, 102, 60), "bota": (150, 95, 55), "visor": (40, 40, 42),
                  "camo": [(84, 80, 60), (98, 96, 62), (70, 68, 52)]},
    },
    "granito": {
        "nome": "Divisão Granito", "rosto": "visor_laranja", "ovo": ("#989898", "#FFB93C"),
        "cores": {"pri": (150, 152, 150), "sec": (88, 98, 74), "dark": (60, 62, 62), "metal": (92, 94, 98), "acento": (255, 185, 60),
                  "capacete": (162, 164, 162), "bota": (72, 72, 72), "visor": (40, 40, 40),
                  "camo": [(80, 92, 66), (104, 112, 86), (62, 70, 54), (140, 142, 140)]},
    },
    "corvo": {
        "nome": "Unidade Corvo", "rosto": "visor_ciano", "ovo": ("#26262C", "#FF8C1E"),
        "cores": {"pri": (38, 38, 44), "sec": (62, 62, 68), "dark": (16, 16, 20), "metal": (78, 78, 86), "acento": (255, 140, 30),
                  "capacete": (34, 34, 40), "bota": (20, 20, 24), "visor": (90, 205, 255),
                  "camo": [(30, 30, 35), (45, 45, 52), (22, 22, 26)]},
    },
    "caveira": {
        "nome": "Legião Caveira", "rosto": "caveira", "ovo": ("#4E5460", "#782D28"),
        "cores": {"pri": (78, 84, 96), "sec": (120, 45, 40), "dark": (38, 38, 44), "metal": (60, 60, 66), "acento": (210, 170, 60),
                  "capacete": (55, 58, 66), "bota": (30, 30, 34), "visor": (228, 222, 205),
                  "camo": [(78, 84, 96), (70, 76, 88), (86, 92, 104)]},
    },
    "azul": {
        "nome": "Força de Paz Azul", "rosto": "bandana", "ovo": ("#586842", "#5AA0E1"),
        "cores": {"pri": (88, 104, 66), "sec": (64, 78, 52), "dark": (46, 40, 34), "metal": (55, 50, 45), "acento": (90, 160, 225),
                  "capacete": (90, 160, 225), "bota": (40, 36, 32), "visor": (230, 226, 215),
                  "camo": [(70, 92, 58), (102, 96, 64), (48, 56, 40), (120, 108, 80)]},
    },
}

NOMES_TIPO = {"fuzileiro": "Fuzileiro", "atirador": "Atirador", "metralhador": "Metralhador", "bazuca": "Antitanque",
              "medico": "Médico", "tanque": "Tanque", "blindado": "Blindado", "tanque_p": "Tanque (pilotável)",
              "blindado_p": "Blindado (pilotável)", "comando": "Posto de Comando"}

# ------------------------------------------------------------------ modelos

ARMAS = {
    "fuzileiro": [c([-7, 1, -1.5], [2, 12, 3], "metal"), c([-7.5, 7, 1.5], [3, 3, 2], "dark"), c([-7, -1, -1], [2, 2, 2], "dark")],
    "atirador": [c([-7, -6, -1], [2, 19, 2], "metal"), c([-7, 6, 1], [2, 6, 2], "dark"), c([-7.5, 8, -2.5], [3, 2, 2], "dark")],
    "metralhador": [c([-8, 1, -2], [4, 12, 4], "metal"), c([-8.5, 6, 2], [5, 4, 3], "dark"), c([-7, -3, -1], [2, 4, 2], "dark")],
    "bazuca": [c([-8, -6, -2], [4, 22, 4], "sec"), c([-8.5, -9, -2.5], [5, 3, 5], "dark"), c([-7, 8, 2], [2, 3, 2], "metal")],
    "medico": [c([-7, 7, -1], [2, 6, 2], "metal")],
}


def soldado(tipo):
    mochila = {"*": "sec", "south": "cruz"} if tipo == "medico" else "sec"
    return [
        {"name": "root", "pivot": [0, 0, 0]},
        {"name": "body", "parent": "root", "pivot": [0, 24, 0], "cubes": [
            c([-4, 12, -2], [8, 12, 4], "camo"),
            c([-4, 16, -2], [8, 7, 4], "colete", 0.6),
            c([-4, 12, -2], [8, 2, 4], "dark", 0.5),
            c([-3, 14, 2], [6, 8, 3], mochila),
            c([2, 21, 3], [1, 8, 1], "dark"),
        ]},
        {"name": "head", "parent": "body", "pivot": [0, 24, 0], "cubes": [
            c([-4, 24, -4], [8, 8, 8], {"*": "capacete", "north": "rosto", "east": "lado_rosto", "west": "lado_rosto"}),
            c([-4, 29, -4], [8, 3, 8], "capacete", 0.6),
        ]},
        {"name": "rightArm", "parent": "body", "pivot": [-5, 22, 0], "cubes": [
            c([-8, 12, -2], [4, 12, 4], "camo"),
            c([-8, 19, -2], [4, 4, 4], "faixa", 0.4),
            c([-8, 12, -2], [4, 3, 4], "dark", 0.15),
        ]},
        {"name": "arma", "parent": "rightArm", "pivot": [-6, 12, 0], "cubes": ARMAS[tipo]},
        {"name": "leftArm", "parent": "body", "pivot": [5, 22, 0], "cubes": [
            c([4, 12, -2], [4, 12, 4], "camo"),
            c([4, 19, -2], [4, 4, 4], "faixa", 0.4),
            c([4, 12, -2], [4, 3, 4], "dark", 0.15),
        ]},
        {"name": "rightLeg", "parent": "root", "pivot": [-1.9, 12, 0], "cubes": [
            c([-3.9, 0, -2], [4, 12, 4], "camo"),
            c([-3.9, 5, -2.6], [4, 3, 1], "joelheira", 0.2),
            c([-3.9, 0, -2], [4, 3, 4], "bota", 0.25),
        ]},
        {"name": "leftLeg", "parent": "root", "pivot": [1.9, 12, 0], "cubes": [
            c([-0.1, 0, -2], [4, 12, 4], "camo"),
            c([-0.1, 5, -2.6], [4, 3, 1], "joelheira", 0.2),
            c([-0.1, 0, -2], [4, 3, 4], "bota", 0.25),
        ]},
    ]


ESTEIRA = {"*": "esteira", "east": "rodas", "west": "rodas"}
CASCO = {"*": "blindagem", "up": "blindagem_topo"}


def tanque():
    return [
        {"name": "root", "pivot": [0, 0, 0]},
        {"name": "casco", "parent": "root", "pivot": [0, 0, 0], "cubes": [
            c([-19, 0, -30], [7, 9, 60], ESTEIRA),
            c([12, 0, -30], [7, 9, 60], ESTEIRA),
            c([-12, 4, -28], [24, 10, 56], CASCO),
            c([-19, 9, -31], [38, 2, 62], CASCO),
            c([-12, 5, -33], [24, 6, 5], CASCO),
            c([-10, 11, 21], [20, 4, 8], "grade"),
        ]},
        {"name": "torre", "parent": "casco", "pivot": [0, 14, -2], "cubes": [
            c([-11, 14, -14], [22, 7, 24], CASCO),
            c([-9, 14, 10], [18, 6, 6], "dark"),
            c([-13, 15, -10], [2, 4, 6], "metal"),
            c([11, 15, -10], [2, 4, 6], "metal"),
            c([-3, 21, -2], [6, 2, 6], "metal"),
            c([6, 21, 6], [1, 9, 1], "dark"),
        ]},
        {"name": "canhao", "parent": "torre", "pivot": [0, 17.5, -14], "cubes": [
            c([-4, 15, -18], [8, 6, 4], CASCO),
            c([-1.5, 16.5, -50], [3, 3, 32], "metal"),
            c([-2.5, 15.5, -54], [5, 5, 4], "dark"),
        ]},
        {"name": "mg", "parent": "torre", "pivot": [0, 23, 0], "cubes": [
            c([-0.5, 23.5, -7], [1, 1, 7], "dark"),
            c([-1, 23, 0], [2, 2, 2], "metal"),
        ]},
    ]


def blindado():
    return [
        {"name": "root", "pivot": [0, 0, 0]},
        {"name": "casco", "parent": "root", "pivot": [0, 0, 0], "cubes": [
            c([-16, 0, -32], [6, 8, 64], ESTEIRA),
            c([10, 0, -32], [6, 8, 64], ESTEIRA),
            c([-11, 3, -30], [22, 14, 60], CASCO),
            c([-16, 8, -33], [32, 2, 66], CASCO),
            c([-11, 6, -35], [22, 8, 5], CASCO),
            c([-5, 4, 30], [10, 11, 1], "dark"),
        ]},
        {"name": "torre", "parent": "casco", "pivot": [0, 17, -2], "cubes": [
            c([-7, 17, -10], [14, 6, 14], CASCO),
            c([7, 18, -6], [3, 4, 7], "dark"),
            c([-2, 23, 0], [4, 2, 4], "metal"),
            c([-6, 23, 2], [1, 8, 1], "dark"),
        ]},
        {"name": "canhao", "parent": "torre", "pivot": [0, 20, -10], "cubes": [
            c([-2.5, 18.5, -12], [5, 4, 2], "dark"),
            c([-1, 19.5, -38], [2, 2, 26], "metal"),
        ]},
    ]


def comando():
    return [
        {"name": "root", "pivot": [0, 0, 0], "cubes": [
            c([-16, 0, -16], [32, 12, 32], {"*": "concreto", "up": "concreto_topo", "north": "bunker_frente"}),
            c([-18, 0, -18], [36, 3, 4], "sacos"),
            c([-18, 0, 14], [36, 3, 4], "sacos"),
            c([10, 12, 10], [2, 22, 2], "metal"),
            c([-12, 12, -12], [1, 24, 1], "metal"),
        ]},
        {"name": "radar", "parent": "root", "pivot": [0, 13, 0], "cubes": [
            c([-1, 12, -1], [2, 3, 2], "metal"),
            c([-5, 15, -1], [10, 5, 1], "metal"),
        ]},
        {"name": "bandeira", "parent": "root", "pivot": [-12, 30, -12], "cubes": [c([-11, 28, -12], [10, 7, 1], "bandeira")]},
    ]


def projetil(tam):
    h = tam / 2
    return [{"name": "body", "pivot": [0, 0, 0], "cubes": [c([-h, 0, -h], [tam, tam, tam], "brilho")]}]


MODELOS = {
    "fuzileiro": soldado("fuzileiro"), "atirador": soldado("atirador"), "metralhador": soldado("metralhador"),
    "bazuca": soldado("bazuca"), "medico": soldado("medico"),
    "tanque": tanque(), "blindado": blindado(), "comando": comando(),
    "bala": projetil(1), "foguete": projetil(2),
}

# ------------------------------------------------------------------ pintura


def _hash(x, y, s=0):
    h = (x * 374761393 + y * 668265263 + s * 2147483647) & 0xFFFFFFFF
    h = (h ^ (h >> 13)) * 1274126177 & 0xFFFFFFFF
    return (h ^ (h >> 16)) / 0xFFFFFFFF


def cor_camo(p, gx, gy, bloco):
    lista = p["camo"]
    v = _hash(gx // bloco, gy // bloco, 3)
    return lista[int(v * len(lista)) % len(lista)]


def pintar(bones, larg, alt, p, rosto):
    img = Image.new("RGBA", (larg, alt), (0, 0, 0, 0))
    px = img.load()

    def put(x, y, cor):
        px[x, y] = tuple(int(v) for v in cor[:3]) + (255,)

    def area(x0, y0, w, h, chave, face):
        if w <= 0 or h <= 0:
            return
        for i in range(w):
            for j in range(h):
                gx, gy = x0 + i, y0 + j
                borda = (i == 0 or j == 0 or i == w - 1 or j == h - 1) and w >= 4 and h >= 4
                cor = cor_pixel(chave, i, j, w, h, gx, gy, face)
                if borda and chave not in ("brilho", "rosto", "camo", "esteira"):
                    cor = escurecer(cor, 0.8)
                if face == "up" and chave not in ("brilho",):
                    cor = escurecer(cor, 1.08)
                elif face == "down":
                    cor = escurecer(cor, 0.7)
                put(gx, gy, cor)

    def cor_pixel(k, i, j, w, h, gx, gy, face):
        if k in p and not isinstance(p[k], list):
            return p[k]
        if k == "camo":
            return cor_camo(p, gx, gy, 2)
        if k == "colete":
            base = p["pri"] if rosto != "caveira" else p["dark"]
            if j % 3 == 2:
                return escurecer(base, 0.75)
            if i in (1, w - 2) and j < 2:
                return p["acento"]
            return base
        if k == "faixa":
            return p["acento"] if h // 2 - 1 <= j <= h // 2 else cor_camo(p, gx, gy, 2)
        if k == "joelheira":
            return p["metal"] if 0 < i < w - 1 and 0 < j < h - 1 else p["dark"]
        if k == "cruz":
            mx, my = w / 2 - 0.5, h / 2 - 0.5
            if (abs(i - mx) < 1 and abs(j - my) < 2.5) or (abs(j - my) < 1 and abs(i - mx) < 2.5):
                return (220, 35, 35)
            return (235, 235, 235)
        if k == "lado_rosto":
            return p["capacete"] if j < 3 else (p["visor"] if rosto in ("caveira", "bandana") else p["dark"])
        if k == "rosto":
            return cor_rosto(i, j)
        if k == "esteira":
            return p["metal"] if (j + i // 6) % 3 == 0 else escurecer(p["dark"], 0.8)
        if k == "rodas":
            # rodas: círculos ao longo da lateral
            raio = max(2, h // 2 - 1)
            passo = raio * 2 + 2
            cx = (i % passo) - passo / 2 + 0.5
            cy = j - h / 2 + 0.5
            d = (cx * cx + cy * cy) ** 0.5
            if j <= 1 or j >= h - 2:
                return escurecer(p["dark"], 0.8)
            if d < raio * 0.45:
                return escurecer(p["metal"], 1.2)
            if d < raio:
                return p["metal"]
            return p["dark"]
        if k in ("blindagem", "blindagem_topo"):
            base = cor_camo(p, gx, gy, 6) if rosto in ("bandana", "granito_camo") else p["pri"]
            if i % 10 == 0 or j % 8 == 0:
                return escurecer(base, 0.82)
            if (i % 10 == 2 and j % 8 == 2):
                return escurecer(base, 1.25)
            return base
        if k == "grade":
            return p["dark"] if i % 2 else p["metal"]
        if k in ("concreto", "concreto_topo", "bunker_frente"):
            base = (128, 128, 124)
            if k == "bunker_frente" and h // 3 <= j <= h // 3 + 1 and 2 < i < w - 3:
                return (20, 20, 20)
            v = 0.9 + 0.2 * _hash(gx, gy, 9)
            if j % 8 == 0:
                v *= 0.85
            return escurecer(base, v)
        if k == "sacos":
            base = (150, 132, 96)
            return escurecer(base, 0.75 if (i % 6 == 0 or j % 3 == 0) else 1.0)
        if k == "bandeira":
            return p["acento"] if j < h // 2 else p["pri"]
        if k == "brilho":
            return (255, 225, 140)
        return p.get("pri")

    def cor_rosto(i, j):
        cap, vis, dark, metal, ac = p["capacete"], p["visor"], p["dark"], p["metal"], p["acento"]
        if rosto == "gas":
            if j < 2:
                return cap
            if 2 <= j <= 3:
                return (25, 25, 25) if i in (1, 2, 5, 6) else metal
            if j >= 5 and 3 <= i <= 4:
                return metal
            return vis
        if rosto == "visor_laranja":
            if j < 3:
                return cap
            if j == 3:
                return ac if i in (1, 6) else (30, 30, 30)
            return escurecer(cap, 0.85)
        if rosto == "visor_ciano":
            if j < 2:
                return cap
            if 2 <= j <= 3:
                return vis
            return dark
        if rosto == "caveira":
            if j < 2:
                return cap
            if j in (3, 4) and i in (1, 2, 5, 6):
                return (20, 15, 15) if not (j == 3 and i in (2, 5)) else (200, 40, 40)
            if j == 5 and i in (3, 4):
                return (40, 35, 35)
            if j == 6 and 1 <= i <= 6:
                return (40, 35, 35) if i % 2 else vis
            return vis
        if rosto == "bandana":
            if j < 2:
                return cap
            if 2 <= j <= 3:
                return (25, 25, 25) if 1 <= i <= 6 else (200, 170, 140)
            if j >= 4:
                return (30, 30, 30) if (j == 6 and i % 2 == 0) or (j == 4 and i in (2, 5)) else vis
            return (200, 170, 140)
        return vis

    for b in bones:
        for cu in b.get("cubes", []):
            w, h, d = (int(round(v)) for v in cu["s"])
            u, v = cu["uv"]
            cores = cu["cor"]
            pega = lambda f: cores.get(f, cores["*"])  # noqa: E731
            area(u + d, v, w, d, pega("up"), "up")
            area(u + d + w, v, w, d, pega("down"), "down")
            area(u, v + d, d, h, pega("east"), "east")
            area(u + d, v + d, w, h, pega("north"), "north")
            area(u + d + w, v + d, d, h, pega("west"), "west")
            area(u + 2 * d + w, v + d, w, h, pega("south"), "south")
    return img


# ------------------------------------------------------------------ comportamento

SOLDADOS = ["fuzileiro", "atirador", "metralhador", "bazuca", "medico"]

UNIDADES = {
    "fuzileiro": {"vida": 24, "vel": 0.32, "intervalo": [0.8, 1.3], "alcance": 22, "proj": "bala_fuzil", "rajada": 3, "rajada_int": 0.12},
    "atirador": {"vida": 20, "vel": 0.3, "intervalo": [3.0, 4.0], "alcance": 40, "proj": "bala_sniper"},
    "metralhador": {"vida": 36, "vel": 0.27, "intervalo": [1.8, 2.4], "alcance": 20, "proj": "bala_mg", "rajada": 8, "rajada_int": 0.08},
    "bazuca": {"vida": 26, "vel": 0.3, "intervalo": [5.0, 6.0], "alcance": 26, "proj": "foguete"},
    "medico": {"vida": 22, "vel": 0.32, "intervalo": [1.4, 2.0], "alcance": 16, "proj": "bala_fuzil"},
    "tanque": {"vida": 180, "vel": 0.16, "intervalo": [3.5, 4.5], "alcance": 36, "proj": "granada_tanque", "caixa": [3.2, 2.4], "veiculo": True},
    "blindado": {"vida": 110, "vel": 0.22, "intervalo": [2.0, 2.6], "alcance": 30, "proj": "bala_canhao", "rajada": 5, "rajada_int": 0.18,
                 "caixa": [2.8, 2.4], "veiculo": True},
}

PROJETEIS = {
    "bala_fuzil": {"dano": 4, "power": 4.0, "incerteza": 6, "modelo": "bala"},
    "bala_sniper": {"dano": 15, "power": 5.0, "incerteza": 0.5, "modelo": "bala"},
    "bala_mg": {"dano": 3, "power": 4.0, "incerteza": 10, "modelo": "bala"},
    "bala_canhao": {"dano": 7, "power": 3.5, "incerteza": 4, "modelo": "bala"},
    "foguete": {"dano": 10, "power": 2.0, "incerteza": 2, "modelo": "foguete", "explode": 2.2},
    "granada_tanque": {"dano": 18, "power": 3.0, "incerteza": 1.5, "modelo": "foguete", "explode": 2.8},
}


def filtro_inimigo(f):
    return {"any_of": [
        {"all_of": [
            {"test": "is_family", "subject": "other", "value": "gm"},
            {"test": "is_family", "subject": "other", "operator": "!=", "value": f"gm_{f}"},
        ]},
        {"all_of": [
            {"test": "is_family", "subject": "other", "value": "player"},
            {"test": "has_tag", "subject": "other", "value": f"gm_inimigo_{f}"},
        ]},
    ]}


def sensor(f, blindado=False):
    t = [
        {"on_damage": {"filters": {"test": "is_family", "subject": "damager", "value": f"gm_{f}"}}, "deals_damage": False},
        {"on_damage": {"filters": {"all_of": [
            {"test": "is_family", "subject": "damager", "value": "player"},
            {"test": "has_tag", "subject": "damager", "value": f"gm_aliado_{f}"},
        ]}}, "deals_damage": False},
        {"cause": "fall", "deals_damage": False},
        {"cause": "suffocation", "deals_damage": False},
    ]
    if blindado:
        # balas quase não arranham a blindagem; explosões (foguetes, granadas, canhão) causam dano cheio
        t += [{"cause": "projectile", "damage_multiplier": 0.12}, {"cause": "entity_attack", "damage_multiplier": 0.12}]
    return {"triggers": t}


def comps_veiculo(caixa, vel, assentos, pilotavel):
    comps = {
        "minecraft:collision_box": {"width": caixa[0], "height": caixa[1]},
        "minecraft:knockback_resistance": {"value": 1.0},
        "minecraft:pushable": {"is_pushable": False, "is_pushable_by_piston": False},
        "minecraft:fire_immune": True,
        "minecraft:variable_max_auto_step": {"base_value": 1.0625, "controlled_value": 1.0625, "jump_prevented_value": 1.0625},
    }
    if pilotavel:
        seats = [{"position": [0, caixa[1] + 0.2, 0.4], "lock_rider_rotation": 0}]
        for k in range(1, assentos):
            seats.append({"position": [(-0.6 if k % 2 else 0.6), caixa[1] - 0.1, 1.0 + (k // 2) * 0.8], "lock_rider_rotation": 0})
        comps.update({
            "minecraft:rideable": {"seat_count": assentos, "family_types": ["player"], "interact_text": "action.interact.ride.horse",
                                   "crouching_skip_interact": True, "pull_in_entities": False, "seats": seats},
            "minecraft:input_ground_controlled": {},
            "minecraft:movement": {"value": vel},
            "minecraft:movement.basic": {},
            "minecraft:jump.static": {},
            "minecraft:physics": {},
            "minecraft:navigation.walk": {"avoid_water": True},
        })
    return comps


def entidade_unidade(f, tipo):
    u = UNIDADES[tipo]
    veic = u.get("veiculo", False)

    def alvo(raio, ver):
        return {"minecraft:behavior.nearest_attackable_target": {
            "priority": 2, "within_radius": raio, "reselect_targets": True, "scan_interval": 10,
            "must_see": ver, "must_see_forget_duration": 4,
            "entity_types": [{"filters": filtro_inimigo(f), "max_dist": raio}],
        }}

    largura, altura = u.get("caixa", [0.6, 1.9])
    comps = {
        "minecraft:type_family": {"family": ["gm", "gm_unidade", f"gm_{f}", f"gm_{tipo}", "mob"] + (["gm_veiculo"] if veic else [])},
        "minecraft:health": {"value": u["vida"], "max": u["vida"]},
        "minecraft:collision_box": {"width": largura, "height": altura},
        "minecraft:physics": {},
        "minecraft:pushable": {"is_pushable": not veic, "is_pushable_by_piston": not veic},
        "minecraft:movement": {"value": u["vel"]},
        "minecraft:movement.basic": {},
        "minecraft:jump.static": {},
        "minecraft:navigation.walk": {"avoid_water": True, "avoid_damage_blocks": True, "can_pass_doors": True, "can_path_over_water": True},
        "minecraft:follow_range": {"value": 64, "max": 64},
        "minecraft:damage_sensor": sensor(f, veic),
        "minecraft:shooter": {"def": f"gm:{u['proj']}"},
        "minecraft:behavior.ranged_attack": {
            "priority": 3, "attack_interval_min": u["intervalo"][0], "attack_interval_max": u["intervalo"][1],
            "attack_radius": u["alcance"], "speed_multiplier": 1.0,
            **({"burst_shots": u["rajada"], "burst_interval": u["rajada_int"]} if "rajada" in u else {}),
        },
        "minecraft:behavior.hurt_by_target": {"priority": 1, "entity_types": {"filters": {"test": "is_family", "subject": "other", "operator": "!=", "value": f"gm_{f}"}}},
        "minecraft:behavior.float": {"priority": 0},
        "minecraft:behavior.random_stroll": {"priority": 7, "speed_multiplier": 0.8},
        "minecraft:behavior.random_look_around": {"priority": 9},
        "minecraft:nameable": {},
        "minecraft:conditional_bandwidth_optimization": {},
    }
    if veic:
        comps.update(comps_veiculo(u["caixa"], u["vel"], 1, False))
        comps["minecraft:nameable"] = {"always_show": False}
    else:
        comps["minecraft:behavior.tempt"] = {"priority": 2, "speed_multiplier": 1.25, "within_radius": 28, "items": [f"gm:bandeira_{f}"], "can_tempt_vertically": True}
        comps["minecraft:behavior.look_at_player"] = {"priority": 8, "look_distance": 8}
    return {
        "format_version": "1.20.80",
        "minecraft:entity": {
            "description": {
                "identifier": f"gm:{f}_{tipo}", "is_spawnable": True, "is_summonable": True, "is_experimental": False,
                **({} if veic else {"properties": {"gm:pele": {"type": "int", "range": [0, 2], "default": "math.random_integer(0, 2)", "client_sync": True}}}),
            },
            "component_groups": {
                "modo_ataque": alvo(64, False),
                "modo_defesa": {**alvo(24, True), "minecraft:home": {"restriction_radius": 16}},
            },
            "components": comps,
            "events": {
                "minecraft:entity_spawned": {"add": {"component_groups": ["modo_ataque"]}},
                "gm:atacar": {"remove": {"component_groups": ["modo_defesa"]}, "add": {"component_groups": ["modo_ataque"]}},
                "gm:defender": {"remove": {"component_groups": ["modo_ataque"]}, "add": {"component_groups": ["modo_defesa"]}},
            },
        },
    }


def entidade_pilotavel(f, tipo):
    base = tipo.replace("_p", "")
    u = UNIDADES[base]
    vida = {"tanque": 320, "blindado": 200}[base]
    comps = {
        "minecraft:type_family": {"family": ["gm", "gm_pilotavel", f"gm_{f}", "gm_veiculo", f"gm_{tipo}", "inanimate"]},
        "minecraft:health": {"value": vida, "max": vida},
        "minecraft:damage_sensor": sensor(f, True),
        "minecraft:nameable": {},
        "minecraft:persistent": {},
        **comps_veiculo(u["caixa"], {"tanque": 0.28, "blindado": 0.34}[base], {"tanque": 1, "blindado": 4}[base], True),
    }
    return {
        "format_version": "1.20.80",
        "minecraft:entity": {
            "description": {
                "identifier": f"gm:{f}_{tipo}", "is_spawnable": True, "is_summonable": True, "is_experimental": False,
                "properties": {
                    "gm:torre": {"type": "float", "range": [-180, 180], "default": 0, "client_sync": True},
                    "gm:elev": {"type": "float", "range": [-30, 30], "default": 0, "client_sync": True},
                },
            },
            "components": comps,
        },
    }


def entidade_comando(f):
    return {
        "format_version": "1.20.80",
        "minecraft:entity": {
            "description": {"identifier": f"gm:{f}_comando", "is_spawnable": True, "is_summonable": True, "is_experimental": False},
            "components": {
                "minecraft:type_family": {"family": ["gm", "gm_comando", f"gm_{f}", "inanimate"]},
                "minecraft:health": {"value": 900, "max": 900},
                "minecraft:collision_box": {"width": 2.0, "height": 1.6},
                "minecraft:physics": {},
                "minecraft:pushable": {"is_pushable": False, "is_pushable_by_piston": False},
                "minecraft:knockback_resistance": {"value": 1.0},
                "minecraft:damage_sensor": sensor(f, True),
                "minecraft:nameable": {"always_show": True, "allow_name_tag_renaming": False},
                "minecraft:fire_immune": True,
                "minecraft:persistent": {},
            },
        },
    }


def entidade_projetil(nome):
    pj = PROJETEIS[nome]
    explosivo = "explode" in pj
    on_hit = {"impact_damage": {"damage": pj["dano"], "knockback": True, "destroy_on_hit": True}}
    grupos = {"sumir": {"minecraft:instant_despawn": {}}}
    eventos = {"gm:sumir": {"add": {"component_groups": ["sumir"]}}}
    if explosivo:
        on_hit["definition_event"] = {"affect_projectile": True, "event_trigger": {"event": "gm:explodir", "target": "self"}}
        grupos["explodir"] = {"minecraft:explode": {"fuse_length": 0, "fuse_lit": True, "power": pj["explode"], "causes_fire": False, "breaks_blocks": False}}
        eventos["gm:explodir"] = {"add": {"component_groups": ["explodir"]}}
    else:
        on_hit["remove_on_hit"] = {}
    return {
        "format_version": "1.20.80",
        "minecraft:entity": {
            "description": {"identifier": f"gm:{nome}", "is_spawnable": False, "is_summonable": True, "is_experimental": False},
            "component_groups": grupos,
            "components": {
                "minecraft:type_family": {"family": ["gm_projetil"]},
                "minecraft:collision_box": {"width": 0.2, "height": 0.2},
                "minecraft:projectile": {
                    "on_hit": on_hit, "power": pj["power"], "gravity": 0.0, "inertia": 1.0, "liquid_inertia": 1.0,
                    "uncertainty_base": pj["incerteza"], "uncertainty_multiplier": 0.5, "anchor": 1, "offset": [0, -0.1, 0],
                    "reflect_on_hurt": False,
                },
                "minecraft:physics": {},
                "minecraft:pushable": {"is_pushable": False, "is_pushable_by_piston": False},
                "minecraft:timer": {"time": 3, "looping": False, "time_down_event": {"event": "gm:sumir"}},
            },
            "events": eventos,
        },
    }


# ------------------------------------------------------------------ itens

ITENS = {
    "radio": ("§aRádio de Campanha", 1),
    "fuzil": ("§eFuzil de Assalto", 1),
    "sniper": ("§bRifle de Precisão", 1),
    "metralhadora": ("§6Metralhadora", 1),
    "bazuca": ("§cLança-Foguetes", 1),
    "granada": ("§7Granada", 8),
    "kit_medico": ("§fKit Médico", 4),
    "disparo_canhao": ("§c§lCANHÃO", 1),
    "disparo_mg": ("§e§lMETRALHADORA", 1),
}
AUTOMATICAS = {"fuzil", "metralhadora", "disparo_mg"}


def icone(nome, cor=None):
    img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    preto, cinza, verde = (30, 30, 32, 255), (95, 98, 105, 255), (90, 100, 60, 255)
    if nome == "radio":
        d.rectangle((4, 4, 12, 15), fill=verde, outline=preto)
        d.line([(10, 4), (12, 0)], fill=preto)
        d.rectangle((6, 6, 10, 8), fill=(120, 255, 140, 255))
        for x in (6, 8, 10):
            d.point((x, 11), fill=preto)
    elif nome == "fuzil":
        d.rectangle((1, 7, 14, 8), fill=preto)
        d.rectangle((4, 9, 6, 13), fill=preto)
        d.rectangle((8, 9, 9, 12), fill=cinza)
        d.rectangle((0, 7, 3, 10), fill=(110, 80, 50, 255))
    elif nome == "sniper":
        d.rectangle((0, 8, 15, 8), fill=preto)
        d.rectangle((4, 5, 10, 6), fill=preto)
        d.rectangle((2, 9, 4, 12), fill=(110, 80, 50, 255))
        d.point((15, 7), fill=preto)
    elif nome == "metralhadora":
        d.rectangle((1, 6, 14, 9), fill=preto)
        d.rectangle((5, 10, 9, 13), fill=verde)
        d.line([(12, 10), (14, 14)], fill=cinza)
    elif nome == "bazuca":
        d.rectangle((0, 6, 15, 9), fill=verde)
        d.rectangle((0, 5, 2, 10), fill=preto)
        d.polygon([(13, 5), (15, 7), (13, 10)], fill=(200, 60, 40, 255))
        d.rectangle((6, 10, 7, 13), fill=preto)
    elif nome == "granada":
        d.ellipse((4, 5, 12, 14), fill=verde, outline=preto)
        d.rectangle((7, 2, 10, 5), fill=cinza)
        d.line([(10, 3), (13, 2)], fill=cinza)
    elif nome == "kit_medico":
        d.rectangle((2, 4, 14, 14), fill=(235, 235, 235, 255), outline=preto)
        d.rectangle((7, 6, 9, 12), fill=(210, 30, 30, 255))
        d.rectangle((5, 8, 11, 10), fill=(210, 30, 30, 255))
    elif nome == "disparo_canhao":
        d.rectangle((1, 9, 11, 14), fill=verde, outline=preto)
        d.rectangle((4, 6, 9, 9), fill=verde)
        d.rectangle((9, 7, 15, 8), fill=preto)
    elif nome == "disparo_mg":
        d.rectangle((2, 7, 13, 9), fill=preto)
        for x in range(3, 13, 3):
            d.rectangle((x, 10, x + 1, 13), fill=(220, 180, 60, 255))
    elif nome.startswith("bandeira"):
        d.line([(3, 1), (3, 15)], fill=cinza, width=2)
        d.rectangle((4, 2, 14, 9), fill=cor + (255,))
        d.rectangle((4, 2, 14, 4), fill=escurecer(cor, 0.7) + (255,))
    return img


def animacoes():
    andar = "math.cos(query.modified_distance_moved * 38.17) * query.modified_move_speed"
    return {
        "format_version": "1.8.0",
        "animations": {
            "animation.gm.olhar": {"loop": True, "bones": {"head": {"rotation": ["query.target_x_rotation", "query.target_y_rotation", 0]}}},
            "animation.gm.andar": {"loop": True, "bones": {
                "rightLeg": {"rotation": [f"{andar} * 70", 0, 0]},
                "leftLeg": {"rotation": [f"-{andar} * 70", 0, 0]},
            }},
            "animation.gm.capa": {"loop": True, "bones": {
                "cape": {"rotation": ["6 + query.modified_move_speed * 28 + math.sin(query.life_time * 200) * 2", 0, 0]},
            }},
            "animation.gm.mirar": {"loop": True, "bones": {
                "rightArm": {"rotation": ["-85 + query.target_x_rotation", "-5 + query.target_y_rotation", 0]},
                "leftArm": {"rotation": ["-80 + query.target_x_rotation", "35 + query.target_y_rotation", 0]},
            }},
            "animation.gm.torre_ia": {"loop": True, "bones": {
                "torre": {"rotation": [0, "query.target_y_rotation", 0]},
                "canhao": {"rotation": ["math.clamp(query.target_x_rotation, -15, 10)", 0, 0]},
            }},
            "animation.gm.torre_piloto": {"loop": True, "bones": {
                "torre": {"rotation": [0, "query.property('gm:torre')", 0]},
                "canhao": {"rotation": ["math.clamp(query.property('gm:elev'), -15, 10)", 0, 0]},
            }},
            "animation.gm.chacoalhar": {"loop": True, "bones": {
                "casco": {"position": [0, "math.sin(query.life_time * 2400) * 0.15 * query.modified_move_speed", 0]},
            }},
            "animation.gm.comando": {"loop": True, "bones": {
                "radar": {"rotation": [0, "query.life_time * 90", 0]},
                "bandeira": {"rotation": [0, "math.sin(query.life_time * 120) * 12", 0]},
            }},
        },
    }


def particula():
    return {
        "format_version": "1.10.0",
        "particle_effect": {
            "description": {"identifier": "gm:tracante", "basic_render_parameters": {"material": "particles_add", "texture": "textures/particle/particles"}},
            "components": {
                "minecraft:emitter_rate_instant": {"num_particles": 1},
                "minecraft:emitter_lifetime_once": {"active_time": 0.05},
                "minecraft:emitter_shape_point": {},
                "minecraft:particle_lifetime_expression": {"max_lifetime": 0.12},
                "minecraft:particle_appearance_billboard": {
                    "size": [0.07, 0.07], "facing_camera_mode": "rotate_xyz",
                    "uv": {"texture_width": 128, "texture_height": 128, "uv": [0, 0], "uv_size": [8, 8]},
                },
                "minecraft:particle_appearance_tinting": {"color": [1, 0.85, 0.45, 1]},
            },
        },
    }


SONS = {
    "gm.tiro.fuzil": (["fuzil1", "fuzil2", "fuzil3"], 1.0, 96),
    "gm.tiro.metralhadora": (["metralhadora1", "metralhadora2", "metralhadora3"], 1.0, 96),
    "gm.tiro.sniper": (["sniper1", "sniper2"], 1.0, 128),
    "gm.canhao": (["canhao1", "canhao2"], 1.0, 160),
    "gm.explosao": (["explosao1", "explosao2"], 1.0, 160),
    "gm.foguete": (["foguete"], 1.0, 96),
    "gm.recarga": (["recarga"], 0.8, 16),
    "gm.motor": (["motor"], 0.7, 40),
    "gm.assobio": (["assobio"], 1.0, 128),
    "gm.impacto": (["impacto1", "impacto2"], 0.6, 24),
    "gm.radio": (["radio"], 0.7, 16),
}


def main():
    lang = ["pack.name=Guerra Moderna", "pack.description=Guerra moderna com tanques, blindados e sons realistas"]
    textos_rp = list(lang)
    texturas_itens = {}

    # ---- modelos e texturas detalhados (moderna_visual)
    def gerar_modelo(ident, bones, arquivo):
        larg, alt = empacotar(bones)
        salvar_json(V.geo_json(ident, bones, larg, alt), RP, "models", "entity", f"{arquivo}.geo.json")
        return larg, alt

    for f in FACCOES:
        for tipo in SOLDADOS:
            # modelo do jogador (tools/modelos/soldado_base.geo.json) + acessórios num espaço de UV abaixo dele
            bones, acessorios, larg_base, alt_base = V.soldado_do_jogador(f, tipo)
            larg_ac, _ = empacotar([{"cubes": acessorios}])
            total_ac = max((cu["uv"][1] + V.tam_uv_cubo(cu)[1] for cu in acessorios), default=0)
            for cu in acessorios:
                cu["uv"] = [cu["uv"][0], cu["uv"][1] + alt_base]
            larg = max(larg_base, larg_ac)
            alt = alt_base
            while alt < alt_base + total_ac:
                alt *= 2
            salvar_json(V.geo_do_jogador(f"geometry.gm_{f}_{tipo}", bones, larg, alt), RP, "models", "entity", f"{f}_{tipo}.geo.json")
            for n, pele in enumerate(V.PELES):
                salvar_img(V.pintar(bones, larg, alt, V.PALETAS[f], pele), RP, "textures", "entity", "gm", f"{f}_{tipo}_{n}.png")
    for nome, fabrica in (("tanque", V.tanque), ("blindado", V.blindado), ("comando", V.comando)):
        bones = fabrica()
        larg, alt = gerar_modelo(f"geometry.gm_{nome}", bones, nome)
        for f in FACCOES:
            salvar_img(V.pintar(bones, larg, alt, V.PALETAS[f]), RP, "textures", "entity", "gm", f"{f}_{nome}.png")
    for nome, tam in (("bala", 1), ("foguete", 2)):
        bones = V.projetil(tam)
        larg, alt = gerar_modelo(f"geometry.gm_{nome}", bones, nome)
        salvar_img(V.pintar(bones, larg, alt, V.PALETAS["oliva"]), RP, "textures", "entity", "gm", f"{nome}.png")

    salvar_json({
        "format_version": "1.8.0",
        "render_controllers": {"controller.render.gm_soldado": {
            "arrays": {"textures": {"Array.peles": ["Texture.p0", "Texture.p1", "Texture.p2"]}},
            "geometry": "Geometry.default",
            "materials": [{"*": "Material.default"}],
            "textures": ["Array.peles[query.property('gm:pele')]"],
        }},
    }, RP, "render_controllers", "soldado.render_controllers.json")

    def cliente(ident, textura, geo, anims, scripts, ovo=None, material="entity_alphatest", peles=False):
        desc = {
            "identifier": ident,
            "materials": {"default": material},
            "textures": {f"p{n}": f"{textura}_{n}" for n in range(3)} if peles else {"default": textura},
            "geometry": {"default": geo},
            "animations": anims,
            "scripts": {"animate": scripts},
            "render_controllers": ["controller.render.gm_soldado" if peles else "controller.render.default"],
            "enable_attachables": False,
        }
        if ovo:
            desc["spawn_egg"] = {"base_color": ovo[0], "overlay_color": ovo[1]}
        return {"format_version": "1.10.0", "minecraft:client_entity": {"description": desc}}

    anim_humano = ({"olhar": "animation.gm.olhar", "andar": "animation.gm.andar", "mirar": "animation.gm.mirar", "capa": "animation.gm.capa"},
                   ["olhar", "andar", "mirar", "capa"])
    anim_ia = ({"torre": "animation.gm.torre_ia", "chacoalhar": "animation.gm.chacoalhar"}, ["torre", "chacoalhar"])
    anim_piloto = ({"torre": "animation.gm.torre_piloto", "chacoalhar": "animation.gm.chacoalhar"}, ["torre", "chacoalhar"])

    for f, info in FACCOES.items():
        sufixo = info["nome"]
        for tipo in list(UNIDADES) + ["tanque_p", "blindado_p", "comando"]:
            ident = f"gm:{f}_{tipo}"
            if tipo == "comando":
                salvar_json(entidade_comando(f), BP, "entities", f"{f}_comando.json")
                cli = cliente(ident, f"textures/entity/gm/{f}_comando", "geometry.gm_comando",
                              {"girar": "animation.gm.comando"}, ["girar"], info["ovo"])
            elif tipo.endswith("_p"):
                base = tipo[:-2]
                salvar_json(entidade_pilotavel(f, tipo), BP, "entities", f"{f}_{tipo}.json")
                cli = cliente(ident, f"textures/entity/gm/{f}_{base}", f"geometry.gm_{base}", *anim_piloto, info["ovo"])
            else:
                salvar_json(entidade_unidade(f, tipo), BP, "entities", f"{f}_{tipo}.json")
                if UNIDADES[tipo].get("veiculo"):
                    cli = cliente(ident, f"textures/entity/gm/{f}_{tipo}", f"geometry.gm_{tipo}", *anim_ia, info["ovo"])
                else:
                    cli = cliente(ident, f"textures/entity/gm/{f}_{tipo}", f"geometry.gm_{f}_{tipo}", *anim_humano, info["ovo"], peles=True)
            salvar_json(cli, RP, "entity", f"{f}_{tipo}.json")
            nome_unid = f"{NOMES_TIPO[tipo]} - {sufixo}"
            textos_rp.append(f"entity.{ident}.name={nome_unid}")
            textos_rp.append(f"item.spawn_egg.entity.{ident}.name={nome_unid}")
        ITENS[f"bandeira_{f}"] = (f"§fBandeira: {sufixo}", 1)
        salvar_img(icone(f"bandeira_{f}", V.PALETAS[f]["acento"]), RP, "textures", "items", f"gm_bandeira_{f}.png")

    for nome, pj in PROJETEIS.items():
        salvar_json(entidade_projetil(nome), BP, "entities", "projeteis", f"{nome}.json")
        salvar_json(cliente(f"gm:{nome}", f"textures/entity/gm/{pj['modelo']}", f"geometry.gm_{pj['modelo']}", {}, [], None,
                            "entity_emissive_alpha"), RP, "entity", "projeteis", f"{nome}.json")

    for item, (nome, pilha) in ITENS.items():
        if not item.startswith("bandeira"):
            salvar_img(icone(item), RP, "textures", "items", f"gm_{item}.png")
        texturas_itens[f"gm_{item}"] = {"textures": f"textures/items/gm_{item}"}
        comps = {
            "minecraft:icon": {"textures": {"default": f"gm_{item}"}},
            "minecraft:display_name": {"value": nome},
            "minecraft:max_stack_size": pilha,
            "minecraft:can_destroy_in_creative": False,
        }
        if item in AUTOMATICAS:
            comps["minecraft:use_modifiers"] = {"use_duration": 30.0, "movement_modifier": 1.0}
        salvar_json({"format_version": "1.21.0", "minecraft:item": {
            "description": {"identifier": f"gm:{item}", "menu_category": {"category": "equipment"}}, "components": comps}},
            BP, "items", f"{item}.json")
        textos_rp.append(f"item.gm:{item}={nome}")

    salvar_json({"resource_pack_name": "guerra_moderna", "texture_name": "atlas.items", "texture_data": texturas_itens},
                RP, "textures", "item_texture.json")
    salvar_json(animacoes(), RP, "animations", "gm.animation.json")
    salvar_json(particula(), RP, "particles", "tracante.json")
    salvar_json({"format_version": "1.14.0", "sound_definitions": {
        nome: {"category": "hostile", "min_distance": 2.0, "max_distance": float(dist),
               "sounds": [{"name": f"sounds/gm/{a}", "volume": vol, "load_on_low_memory": True} for a in arqs]}
        for nome, (arqs, vol, dist) in SONS.items()}}, RP, "sounds", "sound_definitions.json")
    for pack, linhas in ((BP, lang), (RP, textos_rp)):
        salvar_json(["pt_BR", "en_US"], pack, "texts", "languages.json")
        for l in ("pt_BR", "en_US"):
            with open(os.path.join(pack, "texts", f"{l}.lang"), "w", encoding="utf-8") as fh:
                fh.write("\n".join(linhas) + "\n")

    # ícone dos pacotes: tanque em silhueta sobre faixas das facções
    pack = Image.new("RGBA", (64, 64), (34, 38, 30, 255))
    d = ImageDraw.Draw(pack)
    for i, info in enumerate(FACCOES.values()):
        d.rectangle((0, 52 + i * 2, 63, 53 + i * 2), fill=info["cores"]["acento"] + (255,))
    d.rectangle((8, 34, 56, 46), fill=(98, 98, 58, 255))
    d.rectangle((6, 44, 58, 50), fill=(30, 30, 30, 255))
    d.rectangle((20, 26, 42, 34), fill=(110, 110, 66, 255))
    d.rectangle((40, 28, 62, 30), fill=(60, 60, 60, 255))
    for x in range(10, 56, 8):
        d.ellipse((x, 45, x + 5, 50), fill=(90, 90, 90, 255))
    pack.save(os.path.join(RP, "pack_icon.png"))
    pack.save(os.path.join(BP, "pack_icon.png"))
    print("Recursos da Guerra Moderna gerados.")


if __name__ == "__main__":
    main()
