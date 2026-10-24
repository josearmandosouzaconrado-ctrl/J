"""Gera texturas (uniformes, bola, ícones) e os JSONs do cliente que dependem delas.

Uso: python3 tools/gerar_recursos.py
"""
import json
import os

from PIL import Image, ImageDraw

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RP = os.path.join(RAIZ, "Futebol_RP")

# (camisa, detalhe, calção, meião, estilo)
KITS = [
    ((30, 80, 200), (245, 245, 245), (245, 245, 245), (30, 80, 200), "solido"),     # 0 Tubarões
    ((200, 30, 30), (25, 25, 25), (25, 25, 25), (200, 30, 30), "listras"),          # 1 Atlético Serrano
    ((240, 240, 240), (110, 40, 160), (240, 240, 240), (240, 240, 240), "faixa"),   # 2 Real Paulistano
    ((250, 210, 30), (20, 140, 60), (20, 140, 60), (250, 210, 30), "solido"),       # 3 EC Ipê
    ((110, 180, 240), (245, 245, 245), (245, 245, 245), (110, 180, 240), "listras"),# 4 Grêmio Estrela
    ((245, 130, 20), (245, 245, 245), (25, 25, 25), (245, 130, 20), "solido"),      # 5 União Cerrado
    ((25, 25, 25), (240, 240, 240), (25, 25, 25), (240, 240, 240), "listras"),      # 6 SC Aurora
    ((210, 40, 30), (250, 200, 30), (210, 40, 30), (250, 200, 30), "metade"),       # 7 Fênix FC
    ((20, 90, 40), (245, 245, 245), (245, 245, 245), (20, 90, 40), "faixa"),        # 8 Imperial do Norte
    ((100, 40, 150), (245, 245, 245), (100, 40, 150), (245, 245, 245), "solido"),   # 9 Vila Nova Capital
    ((120, 220, 50), (25, 25, 25), (25, 25, 25), (120, 220, 50), "goleiro"),        # 10 Goleiro 1
    ((220, 50, 160), (25, 25, 25), (25, 25, 25), (220, 50, 160), "goleiro"),        # 11 Goleiro 2
]

PELES = [(244, 204, 170), (198, 140, 96), (110, 72, 46)]
CABELOS = [(110, 75, 35), (35, 25, 18), (15, 10, 8)]
PRETO = (20, 20, 20)
BRANCO = (250, 250, 250)


def escurecer(c, f=0.8):
    return tuple(int(v * f) for v in c)


def gerar_skin(kit, pele_idx):
    camisa, detalhe, calcao, meiao, estilo = kit
    pele, cabelo = PELES[pele_idx], CABELOS[pele_idx]
    img = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
    px = img.load()

    def ret(x, y, w, h, cor):
        for i in range(x, x + w):
            for j in range(y, y + h):
                px[i, j] = cor + (255,)

    # Cabeça
    ret(0, 0, 32, 16, pele)
    ret(8, 0, 8, 8, cabelo)       # topo
    ret(24, 8, 8, 8, cabelo)      # nuca
    ret(0, 8, 8, 3, cabelo)       # lado direito
    ret(16, 8, 8, 3, cabelo)      # lado esquerdo
    ret(8, 8, 8, 2, cabelo)       # franja
    for x in (9, 10, 13, 14):
        px[x, 12] = BRANCO + (255,)
    px[10, 12] = (40, 60, 120, 255)
    px[13, 12] = (40, 60, 120, 255)
    ret(11, 14, 2, 1, escurecer(pele, 0.7))

    # Tronco (camisa)
    def pintar_camisa(x0, y0, w, h, frente=False):
        for i in range(w):
            for j in range(h):
                cor = camisa
                if estilo == "listras" and (i // 2) % 2 == 1:
                    cor = detalhe
                elif estilo == "faixa" and frente and abs((i) - (j * w / h)) < 1.6:
                    cor = detalhe
                elif estilo == "metade" and i >= w / 2:
                    cor = detalhe
                if j == 0 and h > 4:
                    cor = detalhe if estilo != "listras" else escurecer(camisa, 0.7)
                if estilo == "goleiro" and h > 4 and j in (5, 6):
                    cor = detalhe
                px[x0 + i, y0 + j] = cor + (255,)

    pintar_camisa(20, 16, 8, 4)
    pintar_camisa(28, 16, 8, 4)
    pintar_camisa(16, 20, 4, 12)
    pintar_camisa(20, 20, 8, 12, frente=True)
    pintar_camisa(28, 20, 4, 12)
    pintar_camisa(32, 20, 8, 12, frente=True)

    luva = BRANCO if estilo == "goleiro" else pele

    def braco(x0, y0):
        ret(x0 + 4, y0, 4, 4, camisa)        # topo
        ret(x0 + 8, y0, 4, 4, luva)          # mão
        ret(x0, y0 + 4, 16, 4, camisa)       # manga
        ret(x0, y0 + 7, 16, 1, detalhe if estilo != "goleiro" else camisa)
        ret(x0, y0 + 8, 16, 5, pele)
        ret(x0, y0 + 13, 16, 3, luva)

    braco(40, 16)
    braco(32, 48)

    def perna(x0, y0):
        ret(x0 + 4, y0, 4, 4, calcao)
        ret(x0 + 8, y0, 4, 4, PRETO)
        ret(x0, y0 + 4, 16, 5, calcao)
        ret(x0, y0 + 9, 16, 5, meiao)
        ret(x0, y0 + 10, 16, 1, detalhe if meiao != detalhe else BRANCO)
        ret(x0, y0 + 14, 16, 2, PRETO)

    perna(0, 16)
    perna(16, 48)
    return img


def gerar_bola():
    img = Image.new("RGBA", (32, 16), (0, 0, 0, 0))
    px = img.load()
    faces = [(6, 0), (12, 0), (0, 6), (6, 6), (12, 6), (18, 6)]
    for fx, fy in faces:
        for i in range(6):
            for j in range(6):
                px[fx + i, fy + j] = (245, 245, 245, 255)
        for i, j in ((2, 2), (3, 2), (2, 3), (3, 3)):
            px[fx + i, fy + j] = (25, 25, 25, 255)
        for i, j in ((0, 0), (5, 0), (0, 5), (5, 5)):
            px[fx + i, fy + j] = (60, 60, 60, 255)
    return img


def icone_bola(tam=16, fundo=None):
    img = Image.new("RGBA", (tam, tam), fundo or (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    m = tam // 16
    d.ellipse((1 * m, 1 * m, 14 * m, 14 * m), fill=(245, 245, 245, 255), outline=(30, 30, 30, 255), width=max(1, m))
    c = tam / 2
    r = 2.6 * m
    pent = [(c, c - r), (c + r, c - r * 0.3), (c + r * 0.6, c + r), (c - r * 0.6, c + r), (c - r, c - r * 0.3)]
    d.polygon(pent, fill=(25, 25, 25, 255))
    for ang in ((3, 3), (11, 3), (2, 10), (12, 10), (7, 13)):
        d.rectangle((ang[0] * m, ang[1] * m, (ang[0] + 1) * m, (ang[1] + 1) * m), fill=(40, 40, 40, 255))
    return img


def icone_chute():
    img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # chuteira
    d.polygon([(1, 6), (5, 6), (6, 9), (11, 10), (12, 12), (1, 12)], fill=(20, 20, 20, 255))
    d.line([(2, 8), (5, 8)], fill=(250, 200, 30, 255))
    for x in (2, 5, 8, 11):
        d.point((x, 13), fill=(200, 200, 200, 255))
    # bola pequena
    d.ellipse((11, 3, 15, 7), fill=(245, 245, 245, 255), outline=(30, 30, 30, 255))
    d.line([(7, 5), (10, 5)], fill=(250, 200, 30, 255))
    return img


def icone_passe():
    img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.line([(2, 12), (12, 4)], fill=(40, 200, 80, 255), width=2)
    d.polygon([(13, 2), (13, 8), (8, 3)], fill=(40, 200, 80, 255))
    d.ellipse((1, 10, 5, 14), fill=(245, 245, 245, 255), outline=(30, 30, 30, 255))
    return img


def icone_dividida():
    img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.polygon([(1, 9), (8, 9), (14, 12), (14, 14), (1, 14)], fill=(200, 40, 30, 255))
    d.line([(2, 4), (10, 4)], fill=(250, 250, 250, 255), width=1)
    d.line([(4, 6), (12, 6)], fill=(250, 250, 250, 255), width=1)
    d.line([(1, 2), (6, 2)], fill=(250, 250, 250, 255), width=1)
    return img


def icone_pedir():
    img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((1, 1, 14, 11), radius=3, fill=(250, 210, 30, 255), outline=(120, 90, 10, 255))
    d.polygon([(4, 11), (8, 11), (3, 15)], fill=(250, 210, 30, 255))
    d.rectangle((7, 3, 8, 7), fill=(30, 30, 30, 255))
    d.rectangle((7, 9, 8, 9), fill=(30, 30, 30, 255))
    return img


def salvar(img, *partes):
    caminho = os.path.join(RP, *partes)
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    img.save(caminho)


def salvar_json(obj, *partes):
    caminho = os.path.join(RP, *partes)
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    with open(caminho, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
        f.write("\n")


def main():
    total = len(KITS) * len(PELES)
    for k, kit in enumerate(KITS):
        for p in range(len(PELES)):
            salvar(gerar_skin(kit, p), "textures", "entity", "fut", f"jogador_{k * len(PELES) + p}.png")
    salvar(gerar_bola(), "textures", "entity", "fut", "bola.png")
    salvar(icone_chute(), "textures", "items", "fut_chute.png")
    salvar(icone_passe(), "textures", "items", "fut_passe.png")
    salvar(icone_dividida(), "textures", "items", "fut_dividida.png")
    salvar(icone_pedir(), "textures", "items", "fut_pedir.png")
    salvar(icone_bola(), "textures", "items", "fut_menu.png")

    pack = icone_bola(64, (40, 140, 60, 255))
    pack.save(os.path.join(RP, "pack_icon.png"))
    pack.save(os.path.join(RAIZ, "Futebol_BP", "pack_icon.png"))

    texturas = {f"s{i}": f"textures/entity/fut/jogador_{i}" for i in range(total)}
    salvar_json({
        "format_version": "1.10.0",
        "minecraft:client_entity": {
            "description": {
                "identifier": "fut:jogador",
                "materials": {"default": "entity_alphatest"},
                "textures": texturas,
                "geometry": {"default": "geometry.fut_jogador"},
                "animations": {
                    "correr": "animation.fut_jogador.correr",
                    "chutar": "animation.fut_jogador.chutar",
                    "comemorar": "animation.fut_jogador.comemorar",
                    "olhar": "animation.fut_jogador.olhar",
                },
                "scripts": {
                    "animate": [
                        "olhar",
                        {"correr": "query.property('fut:anim') == 1"},
                        {"chutar": "query.property('fut:anim') == 2"},
                        {"comemorar": "query.property('fut:anim') == 3"},
                    ]
                },
                "render_controllers": ["controller.render.fut_jogador"],
                "enable_attachables": False,
            }
        },
    }, "entity", "jogador.entity.json")

    salvar_json({
        "format_version": "1.8.0",
        "render_controllers": {
            "controller.render.fut_jogador": {
                "arrays": {"textures": {"Array.skins": [f"Texture.s{i}" for i in range(total)]}},
                "geometry": "Geometry.default",
                "materials": [{"*": "Material.default"}],
                "textures": ["Array.skins[query.property('fut:skin')]"],
            }
        },
    }, "render_controllers", "jogador.render_controllers.json")
    print(f"{total} skins geradas")


if __name__ == "__main__":
    main()
