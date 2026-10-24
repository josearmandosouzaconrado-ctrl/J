"""Gera modelos, texturas, entidades, itens e textos do addon Guerra Futurista.

Os modelos são definidos aqui como listas de cubos; o script calcula o UV de cada cubo,
pinta as texturas com a paleta de cada facção e escreve os JSONs dos dois pacotes.

Uso: python3 tools/guerra_gerar.py   (requer Pillow)
"""
import json
import os

from PIL import Image, ImageDraw

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BP = os.path.join(RAIZ, "Guerra_BP")
RP = os.path.join(RAIZ, "Guerra_RP")

FACCOES = {
    "solar": {
        "nome": "Legião Solar",
        "cores": {"pri": (225, 185, 55), "sec": (240, 238, 228), "dark": (95, 72, 30), "visor": (255, 140, 20),
                  "metal": (165, 165, 172), "energia": (255, 225, 90)},
        "ovo": ("#E1B937", "#FF8C14"),
    },
    "nyx": {
        "nome": "Enxame Nyx",
        "cores": {"pri": (110, 40, 165), "sec": (40, 32, 55), "dark": (22, 16, 32), "visor": (235, 70, 255),
                  "metal": (85, 75, 105), "energia": (205, 90, 255)},
        "ovo": ("#6E28A5", "#EB46FF"),
    },
    "ferro": {
        "nome": "Coalizão Ferro",
        "cores": {"pri": (170, 40, 35), "sec": (95, 95, 100), "dark": (45, 45, 50), "visor": (255, 70, 40),
                  "metal": (135, 135, 140), "energia": (255, 110, 40)},
        "ovo": ("#AA2823", "#5F5F64"),
    },
    "aurora": {
        "nome": "Vanguarda Aurora",
        "cores": {"pri": (40, 185, 210), "sec": (232, 244, 250), "dark": (28, 70, 92), "visor": (120, 255, 255),
                  "metal": (160, 180, 192), "energia": (110, 245, 255)},
        "ovo": ("#28B9D2", "#78FFFF"),
    },
}

NOMES_TIPO = {"soldado": "Soldado", "sniper": "Atirador", "pesado": "Artilheiro", "medico": "Médico",
              "drone": "Drone", "tita": "Titã", "nucleo": "Núcleo"}


# ------------------------------------------------------------------ modelos

def c(o, s, cor, inflate=0):
    """Cubo: origem, tamanho, cor (chave da paleta ou dict por face)."""
    return {"o": o, "s": s, "cor": cor if isinstance(cor, dict) else {"*": cor}, "inflate": inflate}


ARMAS = {
    "soldado": [c([-7, 3, -1.5], [2, 10, 3], "metal"), c([-7, 1, -1], [2, 2, 2], "energia"), c([-7.5, 8, 1], [3, 3, 1], "dark")],
    "sniper": [c([-7, -5, -1], [2, 18, 2], "metal"), c([-7.5, 7, 1], [3, 3, 2], "dark"), c([-7, -7, -1], [2, 2, 2], "energia")],
    "pesado": [c([-8.5, 1, -2.5], [5, 11, 5], "dark"), c([-7.5, -4, -1.5], [3, 5, 3], "metal"), c([-7, -5, -1], [2, 1, 2], "energia")],
    "medico": [c([-7, 7, -1], [2, 6, 2], "metal"), c([-7, 6, -1], [2, 1, 2], "energia")],
}


def humanoide(tipo):
    mochila = "cruz" if tipo == "medico" else "metal"
    braco_pad = 0.6 if tipo == "pesado" else 0.3
    return [
        {"name": "root", "pivot": [0, 0, 0]},
        {"name": "body", "parent": "root", "pivot": [0, 24, 0], "cubes": [
            c([-4, 12, -2], [8, 12, 4], {"*": "pri", "north": "peito"}),
            c([-4, 12, -2], [8, 2, 4], "dark", 0.4),
            c([-3, 15, 2], [6, 7, 2], {"*": mochila if tipo == "medico" else "metal", "south": mochila}),
        ]},
        {"name": "head", "parent": "body", "pivot": [0, 24, 0], "cubes": [
            c([-4, 24, -4], [8, 8, 8], {"*": "sec", "north": "visor_faixa", "up": "pri"}),
            c([2, 30, 1], [1, 4, 1], "metal"),
        ]},
        {"name": "rightArm", "parent": "body", "pivot": [-5, 22, 0], "cubes": [
            c([-8, 12, -2], [4, 12, 4], "sec"),
            c([-8, 19, -2], [4, 4, 4], "pri", braco_pad),
        ]},
        {"name": "arma", "parent": "rightArm", "pivot": [-6, 12, 0], "cubes": ARMAS[tipo]},
        {"name": "leftArm", "parent": "body", "pivot": [5, 22, 0], "cubes": [
            c([4, 12, -2], [4, 12, 4], "sec"),
            c([4, 19, -2], [4, 4, 4], "pri", braco_pad),
        ]},
        {"name": "rightLeg", "parent": "root", "pivot": [-1.9, 12, 0], "cubes": [
            c([-3.9, 0, -2], [4, 12, 4], {"*": "dark", "north": "perna"}),
            c([-3.9, 0, -2], [4, 3, 4], "metal", 0.3),
        ]},
        {"name": "leftLeg", "parent": "root", "pivot": [1.9, 12, 0], "cubes": [
            c([-0.1, 0, -2], [4, 12, 4], {"*": "dark", "north": "perna"}),
            c([-0.1, 0, -2], [4, 3, 4], "metal", 0.3),
        ]},
    ]


def tita():
    return [
        {"name": "root", "pivot": [0, 0, 0]},
        {"name": "rightLeg", "parent": "root", "pivot": [-5, 16, 0], "cubes": [
            c([-8, 2, -3], [6, 14, 6], {"*": "pri", "north": "perna"}),
            c([-9, 0, -5], [8, 2, 9], "dark"),
        ]},
        {"name": "leftLeg", "parent": "root", "pivot": [5, 16, 0], "cubes": [
            c([2, 2, -3], [6, 14, 6], {"*": "pri", "north": "perna"}),
            c([1, 0, -5], [8, 2, 9], "dark"),
        ]},
        {"name": "body", "parent": "root", "pivot": [0, 16, 0], "cubes": [
            c([-6, 14, -4], [12, 3, 8], "dark"),
            c([-8, 17, -5], [16, 11, 10], {"*": "pri", "north": "peito"}),
            c([-6, 28, 1], [12, 4, 5], {"*": "dark", "north": "energia"}),
        ]},
        {"name": "head", "parent": "body", "pivot": [0, 28, -2], "cubes": [
            c([-4, 28, -5], [8, 5, 6], {"*": "sec", "north": "visor_faixa"}),
        ]},
        {"name": "canhaoD", "parent": "body", "pivot": [-11, 25, 0], "cubes": [
            c([-14, 21, -4], [6, 8, 8], "sec"),
            c([-13, 22, -17], [4, 4, 14], "metal"),
            c([-12.5, 22.5, -19], [3, 3, 2], "energia"),
        ]},
        {"name": "canhaoE", "parent": "body", "pivot": [11, 25, 0], "cubes": [
            c([8, 21, -4], [6, 8, 8], "sec"),
            c([9, 22, -17], [4, 4, 14], "metal"),
            c([9.5, 22.5, -19], [3, 3, 2], "energia"),
        ]},
    ]


def drone():
    return [
        {"name": "root", "pivot": [0, 0, 0]},
        {"name": "body", "parent": "root", "pivot": [0, 8, 0], "cubes": [
            c([-3, 6, -3], [6, 3, 6], {"*": "pri", "up": "sec"}),
            c([-1, 6.5, -4], [2, 2, 1], "energia"),
            c([-7, 7.5, -0.5], [14, 1, 1], "metal"),
            c([-0.5, 7.5, -7], [1, 1, 14], "metal"),
            c([-1, 4, -3], [2, 2, 4], "dark"),
        ]},
        {"name": "rotor1", "parent": "body", "pivot": [-7, 9, 0], "cubes": [c([-9, 9, -2], [4, 1, 4], "dark")]},
        {"name": "rotor2", "parent": "body", "pivot": [7, 9, 0], "cubes": [c([5, 9, -2], [4, 1, 4], "dark")]},
        {"name": "rotor3", "parent": "body", "pivot": [0, 9, -7], "cubes": [c([-2, 9, -9], [4, 1, 4], "dark")]},
        {"name": "rotor4", "parent": "body", "pivot": [0, 9, 7], "cubes": [c([-2, 9, 5], [4, 1, 4], "dark")]},
    ]


def nucleo():
    return [
        {"name": "root", "pivot": [0, 0, 0], "cubes": [
            c([-8, 0, -8], [16, 4, 16], {"*": "dark", "up": "pri"}),
            c([-8, 4, -8], [3, 12, 3], "metal"),
            c([5, 4, -8], [3, 12, 3], "metal"),
            c([-8, 4, 5], [3, 12, 3], "metal"),
            c([5, 4, 5], [3, 12, 3], "metal"),
        ]},
        {"name": "cristal", "parent": "root", "pivot": [0, 14, 0], "cubes": [c([-3, 7, -3], [6, 14, 6], "energia")]},
    ]


def projetil(tam):
    h = tam / 2
    return [{"name": "body", "pivot": [0, 0, 0], "cubes": [c([-h, 0, -h], [tam, tam, tam], "energia")]}]


MODELOS = {
    "soldado": humanoide("soldado"),
    "sniper": humanoide("sniper"),
    "pesado": humanoide("pesado"),
    "medico": humanoide("medico"),
    "tita": tita(),
    "drone": drone(),
    "nucleo": nucleo(),
    "laser": projetil(2),
    "missil": projetil(4),
}


def tam_uv(cubo):
    w, h, d = (int(round(v)) for v in cubo["s"])
    return 2 * (w + d), d + h


def empacotar(bones):
    """Distribui os UVs (prateleiras) e devolve (largura, altura)."""
    cubos = [cu for b in bones for cu in b.get("cubes", [])]
    larg = 64
    while True:
        x = y = alt_linha = 0
        ok = True
        for cu in sorted(cubos, key=lambda k: -tam_uv(k)[1]):
            w, h = tam_uv(cu)
            if w > larg:
                ok = False
                break
            if x + w > larg:
                x = 0
                y += alt_linha
                alt_linha = 0
            cu["uv"] = [x, y]
            x += w
            alt_linha = max(alt_linha, h)
        total = y + alt_linha
        if ok and total <= larg:
            break
        larg *= 2
    alt = 16
    while alt < total:
        alt *= 2
    return larg, alt


def escurecer(cor, f):
    return tuple(max(0, min(255, int(v * f))) for v in cor)


def pintar(bones, larg, alt, paleta):
    img = Image.new("RGBA", (larg, alt), (0, 0, 0, 0))
    px = img.load()

    def area(x0, y0, w, h, chave, face):
        if w <= 0 or h <= 0:
            return
        base_key = "pri" if chave in ("peito", "perna", "cruz", "visor_faixa") else chave
        if chave == "visor_faixa":
            base_key = "sec"
        if chave == "cruz":
            base_key = "sec"
        base = paleta[base_key]
        if face == "up":
            base = escurecer(base, 1.12)
        elif face == "down":
            base = escurecer(base, 0.7)
        for i in range(w):
            for j in range(h):
                cor = base
                borda = (i == 0 or j == 0 or i == w - 1 or j == h - 1) and w >= 4 and h >= 4
                if borda and chave not in ("energia",):
                    cor = escurecer(base, 0.78)
                if chave == "visor_faixa" and h >= 4 and h // 3 <= j <= h // 3 + max(1, h // 4) and 0 < i < w - 1:
                    cor = paleta["visor"]
                if chave == "peito":
                    if j in (2, 3) and 1 <= i < w - 1:
                        cor = paleta["sec"]
                    if j == h // 2 and w // 2 - 1 <= i <= w // 2:
                        cor = paleta["energia"]
                if chave == "perna" and j in (h // 3, h // 3 + 1) and 0 < i < w - 1:
                    cor = paleta["pri"]
                if chave == "cruz":
                    mx, my = w // 2, h // 2
                    if (abs(i - mx + 0.5) < 1 and abs(j - my + 0.5) < 3) or (abs(j - my + 0.5) < 1 and abs(i - mx + 0.5) < 3):
                        cor = (230, 40, 40)
                if chave == "energia" and (i + j) % 3 == 0:
                    cor = escurecer(base, 1.15)
                px[x0 + i, y0 + j] = cor + (255,)

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


def geo_json(nome, bones, larg, alt):
    saida = []
    for b in bones:
        nb = {k: b[k] for k in ("name", "pivot") if k in b}
        if "parent" in b:
            nb["parent"] = b["parent"]
        if b.get("cubes"):
            nb["cubes"] = []
            for cu in b["cubes"]:
                cj = {"origin": cu["o"], "size": cu["s"], "uv": cu["uv"]}
                if cu["inflate"]:
                    cj["inflate"] = cu["inflate"]
                nb["cubes"].append(cj)
        saida.append(nb)
    return {
        "format_version": "1.12.0",
        "minecraft:geometry": [{
            "description": {
                "identifier": f"geometry.guerra_{nome}",
                "texture_width": larg,
                "texture_height": alt,
                "visible_bounds_width": 4,
                "visible_bounds_height": 4,
                "visible_bounds_offset": [0, 1.5, 0],
            },
            "bones": saida,
        }],
    }


# ------------------------------------------------------------------ comportamento

UNIDADES = {
    "soldado": {"vida": 24, "vel": 0.3, "intervalo": [1.0, 1.6], "alcance": 18, "proj": "laser", "dano": 4, "power": 2.4, "incerteza": 5},
    "sniper": {"vida": 18, "vel": 0.28, "intervalo": [2.8, 3.4], "alcance": 32, "proj": "laser", "dano": 13, "power": 3.6, "incerteza": 0.5},
    "pesado": {"vida": 50, "vel": 0.24, "intervalo": [2.0, 2.6], "alcance": 14, "proj": "laser", "dano": 2, "power": 2.2, "incerteza": 9,
               "rajada": 5, "escala": 1.15},
    "medico": {"vida": 22, "vel": 0.3, "intervalo": [1.8, 2.4], "alcance": 14, "proj": "laser", "dano": 3, "power": 2.2, "incerteza": 4},
    "drone": {"vida": 14, "vel": 0.3, "intervalo": [1.2, 1.8], "alcance": 16, "proj": "laser", "dano": 3, "power": 2.4, "incerteza": 4, "voa": True},
    "tita": {"vida": 260, "vel": 0.18, "intervalo": [2.6, 3.4], "alcance": 26, "proj": "missil", "dano": 6, "power": 1.8, "incerteza": 3,
             "rajada": 2, "escala": 1.5, "caixa": [2.0, 3.2]},
}


def filtro_inimigo(f):
    return {"any_of": [
        {"all_of": [
            {"test": "is_family", "subject": "other", "value": "guerra"},
            {"test": "is_family", "subject": "other", "operator": "!=", "value": f"faccao_{f}"},
        ]},
        {"all_of": [
            {"test": "is_family", "subject": "other", "value": "player"},
            {"test": "has_tag", "subject": "other", "value": f"guerra_inimigo_{f}"},
        ]},
    ]}


def sensor(f):
    return {"triggers": [
        {"on_damage": {"filters": {"test": "is_family", "subject": "damager", "value": f"faccao_{f}"}}, "deals_damage": False},
        {"on_damage": {"filters": {"all_of": [
            {"test": "is_family", "subject": "damager", "value": "player"},
            {"test": "has_tag", "subject": "damager", "value": f"guerra_aliado_{f}"},
        ]}}, "deals_damage": False},
        {"cause": "fall", "deals_damage": False},
        {"cause": "suffocation", "deals_damage": False},
    ]}


def entidade_unidade(f, tipo):
    u = UNIDADES[tipo]
    alvo = lambda raio, ver: {  # noqa: E731
        "minecraft:behavior.nearest_attackable_target": {
            "priority": 2,
            "within_radius": raio,
            "reselect_targets": True,
            "scan_interval": 10,
            "must_see": ver,
            "must_see_forget_duration": 4,
            "entity_types": [{"filters": filtro_inimigo(f), "max_dist": raio}],
        }
    }
    largura, altura = u.get("caixa", [0.6, 1.9])
    comps = {
        "minecraft:type_family": {"family": ["guerra", "guerra_unidade", f"faccao_{f}", f"guerra_{tipo}", "mob"]},
        "minecraft:health": {"value": u["vida"], "max": u["vida"]},
        "minecraft:collision_box": {"width": largura, "height": altura},
        "minecraft:physics": {},
        "minecraft:pushable": {"is_pushable": True, "is_pushable_by_piston": True},
        "minecraft:movement": {"value": u["vel"]},
        "minecraft:follow_range": {"value": 64, "max": 64},
        "minecraft:damage_sensor": sensor(f),
        "minecraft:shooter": {"def": f"guerra:{u['proj']}_{f}_{tipo}"},
        "minecraft:behavior.ranged_attack": {
            "priority": 3,
            "attack_interval_min": u["intervalo"][0],
            "attack_interval_max": u["intervalo"][1],
            "attack_radius": u["alcance"],
            "speed_multiplier": 1.0,
            **({"burst_shots": u["rajada"], "burst_interval": 0.15} if "rajada" in u else {}),
        },
        "minecraft:behavior.hurt_by_target": {
            "priority": 1,
            "entity_types": {"filters": {"test": "is_family", "subject": "other", "operator": "!=", "value": f"faccao_{f}"}},
        },
        "minecraft:behavior.tempt": {"priority": 2, "speed_multiplier": 1.25, "within_radius": 28,
                                     "items": [f"guerra:estandarte_{f}"], "can_tempt_vertically": True},
        "minecraft:behavior.random_look_around": {"priority": 9},
        "minecraft:behavior.look_at_player": {"priority": 8, "look_distance": 8},
        "minecraft:nameable": {},
        "minecraft:conditional_bandwidth_optimization": {},
        "minecraft:fire_immune": tipo in ("tita", "drone"),
    }
    if u.get("voa"):
        comps.update({
            "minecraft:can_fly": {},
            "minecraft:flying_speed": {"value": 0.18},
            "minecraft:navigation.hover": {"can_path_over_water": True, "can_sink": False, "can_pass_doors": False,
                                           "can_path_from_air": True, "avoid_water": True, "avoid_damage_blocks": True},
            "minecraft:movement.hover": {},
            "minecraft:behavior.random_hover": {"priority": 7, "xz_dist": 8, "y_dist": 3, "y_offset": -1, "interval": 1,
                                                "hover_height": [3, 6]},
        })
    else:
        comps.update({
            "minecraft:movement.basic": {},
            "minecraft:jump.static": {},
            "minecraft:navigation.walk": {"avoid_water": True, "avoid_damage_blocks": True, "can_pass_doors": True,
                                          "can_path_over_water": True},
            "minecraft:behavior.float": {"priority": 0},
            "minecraft:behavior.random_stroll": {"priority": 7, "speed_multiplier": 0.8},
        })
    if "escala" in u:
        comps["minecraft:scale"] = {"value": u["escala"]}
    if tipo == "tita":
        comps["minecraft:knockback_resistance"] = {"value": 1.0}
        comps["minecraft:nameable"] = {"always_show": True}
    return {
        "format_version": "1.20.80",
        "minecraft:entity": {
            "description": {"identifier": f"guerra:{f}_{tipo}", "is_spawnable": True, "is_summonable": True, "is_experimental": False},
            "component_groups": {
                "modo_ataque": alvo(64, False),
                "modo_defesa": {**alvo(22, True), "minecraft:home": {"restriction_radius": 14}},
            },
            "components": comps,
            "events": {
                "minecraft:entity_spawned": {"add": {"component_groups": ["modo_ataque"]}},
                "guerra:atacar": {"remove": {"component_groups": ["modo_defesa"]}, "add": {"component_groups": ["modo_ataque"]}},
                "guerra:defender": {"remove": {"component_groups": ["modo_ataque"]}, "add": {"component_groups": ["modo_defesa"]}},
            },
        },
    }


def entidade_nucleo(f):
    return {
        "format_version": "1.20.80",
        "minecraft:entity": {
            "description": {"identifier": f"guerra:{f}_nucleo", "is_spawnable": True, "is_summonable": True, "is_experimental": False},
            "components": {
                "minecraft:type_family": {"family": ["guerra", "guerra_nucleo", f"faccao_{f}", "inanimate"]},
                "minecraft:health": {"value": 600, "max": 600},
                "minecraft:collision_box": {"width": 1.6, "height": 2.2},
                "minecraft:scale": {"value": 1.6},
                "minecraft:physics": {},
                "minecraft:pushable": {"is_pushable": False, "is_pushable_by_piston": False},
                "minecraft:knockback_resistance": {"value": 1.0},
                "minecraft:damage_sensor": sensor(f),
                "minecraft:nameable": {"always_show": True, "allow_name_tag_renaming": False},
                "minecraft:fire_immune": True,
                "minecraft:persistent": {},
            },
        },
    }


def entidade_projetil(f, tipo):
    u = UNIDADES[tipo]
    explosivo = u["proj"] == "missil"
    on_hit = {"impact_damage": {"damage": u["dano"], "knockback": True, "destroy_on_hit": True}, "remove_on_hit": {}}
    grupos = {"sumir": {"minecraft:instant_despawn": {}}}
    eventos = {"guerra:sumir": {"add": {"component_groups": ["sumir"]}}}
    if explosivo:
        on_hit["definition_event"] = {"affect_projectile": True, "event_trigger": {"event": "guerra:explodir", "target": "self"}}
        del on_hit["remove_on_hit"]
        grupos["explodir"] = {"minecraft:explode": {"fuse_length": 0, "fuse_lit": True, "power": 1.8, "causes_fire": False,
                                                    "breaks_blocks": False}}
        eventos["guerra:explodir"] = {"add": {"component_groups": ["explodir"]}}
    return {
        "format_version": "1.20.80",
        "minecraft:entity": {
            "description": {"identifier": f"guerra:{u['proj']}_{f}_{tipo}", "is_spawnable": False, "is_summonable": True,
                            "is_experimental": False},
            "component_groups": grupos,
            "components": {
                "minecraft:type_family": {"family": ["guerra_projetil"]},
                "minecraft:collision_box": {"width": 0.25, "height": 0.25},
                "minecraft:projectile": {
                    "on_hit": on_hit,
                    "power": u["power"],
                    "gravity": 0.0,
                    "inertia": 1.0,
                    "liquid_inertia": 1.0,
                    "uncertainty_base": u["incerteza"],
                    "uncertainty_multiplier": 0.5,
                    "anchor": 1,
                    "offset": [0, -0.1, 0],
                    "reflect_on_hurt": False,
                    "hit_sound": "random.fizz" if not explosivo else "random.explode",
                    "shoot_sound": "mob.blaze.shoot" if not explosivo else "mob.ghast.fireball",
                },
                "minecraft:physics": {},
                "minecraft:pushable": {"is_pushable": False, "is_pushable_by_piston": False},
                "minecraft:timer": {"time": 4, "looping": False, "time_down_event": {"event": "guerra:sumir"}},
            },
            "events": eventos,
        },
    }


# ------------------------------------------------------------------ itens e ícones

ITENS = {
    "nucleo_batalha": ("§bNúcleo de Batalha", "Inicia a transformação do terreno e a guerra"),
    "rifle": ("§eRifle de Plasma", "Tiro rápido de plasma"),
    "canhao": ("§cCanhão de Íons", "Disparo explosivo pesado"),
    "granada": ("§6Granada de Pulso", "Arremesse e exploda"),
    "escudo": ("§9Escudo de Energia", "Proteção temporária"),
    "comunicador": ("§aComunicador Tático", "Ordens, reforços e ataque orbital"),
}


def icone(nome, cor_fac=None):
    img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if nome == "nucleo_batalha":
        d.polygon([(8, 1), (14, 8), (8, 15), (2, 8)], fill=(40, 60, 90, 255), outline=(20, 30, 50, 255))
        d.polygon([(8, 4), (11, 8), (8, 12), (5, 8)], fill=(110, 245, 255, 255))
        d.point((8, 8), fill=(255, 255, 255, 255))
    elif nome == "rifle":
        d.rectangle((1, 7, 12, 9), fill=(150, 150, 160, 255))
        d.rectangle((12, 7, 15, 8), fill=(255, 220, 80, 255))
        d.rectangle((3, 9, 5, 13), fill=(70, 70, 80, 255))
        d.rectangle((6, 5, 9, 6), fill=(80, 200, 255, 255))
    elif nome == "canhao":
        d.rectangle((1, 6, 11, 10), fill=(90, 90, 100, 255))
        d.rectangle((11, 5, 15, 11), fill=(255, 90, 40, 255))
        d.rectangle((3, 10, 6, 14), fill=(50, 50, 60, 255))
    elif nome == "granada":
        d.ellipse((3, 4, 13, 14), fill=(70, 80, 70, 255), outline=(30, 30, 30, 255))
        d.rectangle((6, 1, 10, 4), fill=(150, 150, 150, 255))
        d.ellipse((6, 7, 10, 11), fill=(255, 150, 30, 255))
    elif nome == "escudo":
        d.polygon([(8, 1), (14, 3), (13, 10), (8, 15), (3, 10), (2, 3)], fill=(60, 120, 255, 200), outline=(180, 220, 255, 255))
    elif nome == "comunicador":
        d.rectangle((4, 3, 12, 15), fill=(50, 55, 60, 255))
        d.rectangle((5, 5, 11, 10), fill=(80, 255, 140, 255))
        d.line([(10, 3), (12, 0)], fill=(160, 160, 160, 255))
    elif nome.startswith("estandarte"):
        d.line([(3, 1), (3, 15)], fill=(120, 120, 130, 255), width=2)
        d.rectangle((4, 2, 14, 9), fill=cor_fac + (255,))
        d.rectangle((7, 4, 10, 7), fill=(255, 255, 255, 255))
    return img


# ------------------------------------------------------------------ escrita

def salvar_json(obj, *partes):
    caminho = os.path.join(*partes)
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    with open(caminho, "w", encoding="utf-8") as fh:
        json.dump(obj, fh, indent=2, ensure_ascii=False)
        fh.write("\n")


def salvar_img(img, *partes):
    caminho = os.path.join(*partes)
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    img.save(caminho)


def animacoes():
    andar = "math.cos(query.modified_distance_moved * 38.17) * query.modified_move_speed"
    return {
        "format_version": "1.8.0",
        "animations": {
            "animation.guerra.olhar": {"loop": True, "bones": {"head": {"rotation": ["query.target_x_rotation", "query.target_y_rotation", 0]}}},
            "animation.guerra.andar": {"loop": True, "bones": {
                "rightLeg": {"rotation": [f"{andar} * 70", 0, 0]},
                "leftLeg": {"rotation": [f"-{andar} * 70", 0, 0]},
            }},
            "animation.guerra.mirar": {"loop": True, "bones": {
                "rightArm": {"rotation": ["-85 + query.target_x_rotation", "-5 + query.target_y_rotation", 0]},
                "leftArm": {"rotation": ["-80 + query.target_x_rotation", "35 + query.target_y_rotation", 0]},
            }},
            "animation.guerra.tita_andar": {"loop": True, "bones": {
                "rightLeg": {"rotation": [f"{andar} * 35", 0, 0]},
                "leftLeg": {"rotation": [f"-{andar} * 35", 0, 0]},
                "body": {"rotation": [0, f"{andar} * 6", 0]},
            }},
            "animation.guerra.drone": {"loop": True, "bones": {
                "body": {"position": [0, "math.sin(query.life_time * 200) * 1", 0]},
                "rotor1": {"rotation": [0, "query.life_time * 1440", 0]},
                "rotor2": {"rotation": [0, "-query.life_time * 1440", 0]},
                "rotor3": {"rotation": [0, "query.life_time * 1440", 0]},
                "rotor4": {"rotation": [0, "-query.life_time * 1440", 0]},
            }},
            "animation.guerra.nucleo": {"loop": True, "bones": {
                "cristal": {"rotation": [0, "query.life_time * 60", 0], "position": [0, "math.sin(query.life_time * 90) * 1.5", 0]},
            }},
            "animation.guerra.projetil": {"loop": True, "bones": {"body": {"rotation": ["query.life_time * 720", "query.life_time * 540", 0]}}},
        },
    }


def particula():
    return {
        "format_version": "1.10.0",
        "particle_effect": {
            "description": {"identifier": "guerra:raio",
                            "basic_render_parameters": {"material": "particles_add", "texture": "textures/particle/particles"}},
            "components": {
                "minecraft:emitter_rate_instant": {"num_particles": 1},
                "minecraft:emitter_lifetime_once": {"active_time": 0.05},
                "minecraft:emitter_shape_point": {},
                "minecraft:particle_lifetime_expression": {"max_lifetime": 0.3},
                "minecraft:particle_appearance_billboard": {
                    "size": ["0.14 - variable.particle_age * 0.3", "0.14 - variable.particle_age * 0.3"],
                    "facing_camera_mode": "rotate_xyz",
                    "uv": {"texture_width": 128, "texture_height": 128, "uv": [0, 0], "uv_size": [8, 8]},
                },
                "minecraft:particle_appearance_tinting": {"color": ["variable.color.r", "variable.color.g", "variable.color.b", 1]},
            },
        },
    }


def main():
    lang = ["pack.name=Guerra Futurista", "pack.description=Facções futuristas em batalhas épicas"]
    texturas_itens = {}

    animacoes_tipo = {
        "humano": ({"olhar": "animation.guerra.olhar", "andar": "animation.guerra.andar", "mirar": "animation.guerra.mirar"},
                   ["olhar", "andar", "mirar"]),
        "tita": ({"andar": "animation.guerra.tita_andar"}, ["andar"]),
        "drone": ({"voar": "animation.guerra.drone"}, ["voar"]),
        "nucleo": ({"girar": "animation.guerra.nucleo"}, ["girar"]),
        "projetil": ({"girar": "animation.guerra.projetil"}, ["girar"]),
    }

    for nome, bones in MODELOS.items():
        larg, alt = empacotar(bones)
        salvar_json(geo_json(nome, bones, larg, alt), RP, "models", "entity", f"{nome}.geo.json")
        for f, info in FACCOES.items():
            salvar_img(pintar(bones, larg, alt, info["cores"]), RP, "textures", "entity", "guerra", f"{f}_{nome}.png")

    for f, info in FACCOES.items():
        nome_fac = info["nome"]
        for tipo in list(UNIDADES) + ["nucleo"]:
            ident = f"guerra:{f}_{tipo}"
            if tipo == "nucleo":
                salvar_json(entidade_nucleo(f), BP, "entities", f"{f}_nucleo.json")
                anim_tipo, material = "nucleo", "entity_emissive_alpha"
            else:
                salvar_json(entidade_unidade(f, tipo), BP, "entities", f"{f}_{tipo}.json")
                salvar_json(entidade_projetil(f, tipo), BP, "entities", "projeteis", f"{f}_{tipo}.json")
                anim_tipo = "tita" if tipo == "tita" else "drone" if tipo == "drone" else "humano"
                material = "entity_alphatest"
                proj = UNIDADES[tipo]["proj"]
                anims, scripts = animacoes_tipo["projetil"]
                salvar_json({
                    "format_version": "1.10.0",
                    "minecraft:client_entity": {"description": {
                        "identifier": f"guerra:{proj}_{f}_{tipo}",
                        "materials": {"default": "entity_emissive_alpha"},
                        "textures": {"default": f"textures/entity/guerra/{f}_{proj}"},
                        "geometry": {"default": f"geometry.guerra_{proj}"},
                        "animations": anims,
                        "scripts": {"animate": scripts},
                        "render_controllers": ["controller.render.default"],
                    }},
                }, RP, "entity", "projeteis", f"{f}_{tipo}.json")
            anims, scripts = animacoes_tipo[anim_tipo]
            salvar_json({
                "format_version": "1.10.0",
                "minecraft:client_entity": {"description": {
                    "identifier": ident,
                    "materials": {"default": material},
                    "textures": {"default": f"textures/entity/guerra/{f}_{tipo}"},
                    "geometry": {"default": f"geometry.guerra_{tipo}"},
                    "animations": anims,
                    "scripts": {"animate": scripts},
                    "render_controllers": ["controller.render.default"],
                    "spawn_egg": {"base_color": info["ovo"][0], "overlay_color": info["ovo"][1]},
                    "enable_attachables": False,
                }},
            }, RP, "entity", f"{f}_{tipo}.json")
            nome_unid = f"{NOMES_TIPO[tipo]} {nome_fac.split()[-1]}"
            lang.append(f"entity.{ident}.name={nome_unid}")
            lang.append(f"item.spawn_egg.entity.{ident}.name=Gerar {nome_unid}")

        # estandarte da facção
        ITENS[f"estandarte_{f}"] = (f"§fEstandarte: {nome_fac}", f"Segure para suas tropas ({nome_fac}) te seguirem")
        salvar_img(icone(f"estandarte_{f}", info["cores"]["pri"]), RP, "textures", "items", f"guerra_estandarte_{f}.png")

    for item, (nome, desc) in ITENS.items():
        if not item.startswith("estandarte"):
            salvar_img(icone(item), RP, "textures", "items", f"guerra_{item}.png")
        texturas_itens[f"guerra_{item}"] = {"textures": f"textures/items/guerra_{item}"}
        comps = {
            "minecraft:icon": {"texture": f"guerra_{item}"},
            "minecraft:display_name": {"value": nome},
            "minecraft:max_stack_size": 16 if item == "granada" else 1,
            "minecraft:can_destroy_in_creative": False,
        }
        if item == "nucleo_batalha":
            comps["minecraft:glint"] = True
        salvar_json({
            "format_version": "1.20.50",
            "minecraft:item": {"description": {"identifier": f"guerra:{item}", "menu_category": {"category": "equipment"}},
                               "components": comps},
        }, BP, "items", f"{item}.json")
        lang.append(f"item.guerra:{item}={nome}")

    salvar_json({"resource_pack_name": "guerra_futurista", "texture_name": "atlas.items", "texture_data": texturas_itens},
                RP, "textures", "item_texture.json")
    salvar_json(animacoes(), RP, "animations", "guerra.animation.json")
    salvar_json(particula(), RP, "particles", "raio.json")
    for pack in (BP, RP):
        salvar_json(["pt_BR", "en_US"], pack, "texts", "languages.json")
        for l in ("pt_BR", "en_US"):
            caminho = os.path.join(pack, "texts", f"{l}.lang")
            with open(caminho, "w", encoding="utf-8") as fh:
                fh.write("\n".join(lang) + "\n")

    # ícones dos pacotes
    pack = Image.new("RGBA", (64, 64), (15, 20, 35, 255))
    d = ImageDraw.Draw(pack)
    for i, info in enumerate(FACCOES.values()):
        x, y = (i % 2) * 32, (i // 2) * 32
        d.rectangle((x + 3, y + 3, x + 28, y + 28), fill=info["cores"]["pri"] + (255,))
    d.polygon([(32, 8), (52, 32), (32, 56), (12, 32)], fill=(20, 30, 50, 255))
    d.polygon([(32, 18), (42, 32), (32, 46), (22, 32)], fill=(110, 245, 255, 255))
    pack.save(os.path.join(RP, "pack_icon.png"))
    pack.save(os.path.join(BP, "pack_icon.png"))
    print("Recursos do Guerra Futurista gerados.")


if __name__ == "__main__":
    main()
