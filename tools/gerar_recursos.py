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


# ------------------------------------------------------------------ ícones dos menus (32x32)

def _base(cor):
    img = Image.new("RGBA", (32, 32), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((1, 1, 30, 30), radius=7, fill=cor + (255,), outline=escurecer(cor, 0.6) + (255,), width=2)
    return img, d


def icones_ui():
    B = (250, 250, 250, 255)
    P = (30, 30, 35, 255)
    out = {}

    img, d = _base((46, 160, 67))
    d.polygon([(12, 8), (24, 16), (12, 24)], fill=B)
    out["jogar"] = img

    img, d = _base((52, 120, 210))
    d.polygon([(7, 9), (16, 16), (7, 23)], fill=B)
    d.polygon([(16, 9), (25, 16), (16, 23)], fill=B)
    out["simular"] = img

    img, d = _base((90, 95, 110))
    d.rectangle((8, 6, 24, 26), fill=B)
    d.rectangle((12, 4, 20, 8), fill=(180, 180, 190, 255))
    for y in (11, 15, 19, 23):
        d.line([(11, y), (21, y)], fill=P, width=1)
    out["tabela"] = img

    img, d = _base((200, 150, 30))
    d.polygon([(9, 7), (23, 7), (21, 16), (11, 16)], fill=(255, 225, 90, 255))
    d.arc((4, 7, 12, 15), 90, 270, fill=(255, 225, 90, 255), width=2)
    d.arc((20, 7, 28, 15), 270, 90, fill=(255, 225, 90, 255), width=2)
    d.rectangle((14, 16, 18, 21), fill=(255, 225, 90, 255))
    d.rectangle((10, 21, 22, 25), fill=(120, 80, 30, 255))
    out["copa"] = img

    img, d = _base((25, 110, 170))
    d.ellipse((6, 6, 26, 26), fill=(70, 160, 230, 255), outline=B, width=1)
    d.polygon([(10, 10), (16, 9), (17, 14), (12, 17)], fill=(60, 170, 70, 255))
    d.polygon([(18, 17), (23, 15), (22, 22), (18, 23)], fill=(60, 170, 70, 255))
    d.line([(6, 16), (26, 16)], fill=(200, 230, 255, 255))
    d.arc((11, 6, 21, 26), 0, 360, fill=(200, 230, 255, 255))
    out["mundo"] = img

    img, d = _base((120, 120, 130))
    d.rectangle((6, 11, 9, 21), fill=P)
    d.rectangle((23, 11, 26, 21), fill=P)
    d.rectangle((9, 14, 23, 18), fill=(200, 200, 210, 255))
    d.rectangle((4, 13, 6, 19), fill=P)
    d.rectangle((26, 13, 28, 19), fill=P)
    out["treino"] = img

    img, d = _base((230, 120, 40))
    d.rectangle((8, 12, 24, 26), fill=B)
    d.arc((11, 5, 21, 17), 180, 360, fill=B, width=2)
    d.ellipse((14, 17, 18, 21), fill=(230, 120, 40, 255))
    out["loja"] = img

    img, d = _base((40, 90, 190))
    d.polygon([(10, 6), (14, 8), (18, 8), (22, 6), (28, 11), (25, 15), (23, 13), (23, 27), (9, 27), (9, 13), (7, 15), (4, 11)], fill=B)
    d.text((12, 13), "10", fill=(40, 90, 190, 255))
    out["perfil"] = img

    img, d = _base((35, 35, 45))
    d.rounded_rectangle((10, 4, 22, 28), radius=3, fill=(20, 20, 25, 255), outline=(150, 150, 160, 255))
    d.rectangle((12, 7, 20, 23), fill=(90, 200, 255, 255))
    d.ellipse((15, 24, 17, 26), fill=(150, 150, 160, 255))
    d.rectangle((13, 9, 19, 11), fill=(255, 255, 255, 255))
    d.rectangle((13, 13, 17, 14), fill=(255, 120, 160, 255))
    out["celular"] = img

    img, d = _base((95, 95, 105))
    d.ellipse((9, 9, 23, 23), outline=B, width=4)
    for x, y in ((16, 5), (16, 27), (5, 16), (27, 16), (8, 8), (24, 24), (8, 24), (24, 8)):
        d.ellipse((x - 2, y - 2, x + 2, y + 2), fill=B)
    out["config"] = img

    img, d = _base((190, 40, 40))
    d.line([(10, 10), (22, 22)], fill=B, width=4)
    d.line([(22, 10), (10, 22)], fill=B, width=4)
    out["apagar"] = img

    img, d = _base((110, 110, 120))
    d.polygon([(8, 16), (16, 8), (16, 13), (24, 13), (24, 19), (16, 19), (16, 24)], fill=B)
    out["voltar"] = img

    img, d = _base((40, 140, 60))
    d.rectangle((5, 8, 26, 23), outline=B, width=1)
    d.line([(16, 8), (16, 23)], fill=B)
    d.ellipse((13, 13, 19, 19), outline=B)
    d.rectangle((5, 12, 8, 19), outline=B)
    d.rectangle((23, 12, 26, 19), outline=B)
    out["estadio"] = img

    img, d = _base((220, 170, 30))
    d.text((12, 8), "?", fill=P)
    d.text((13, 8), "?", fill=P)
    out["ajuda"] = img

    img, d = _base((170, 50, 70))
    d.rounded_rectangle((12, 5, 20, 18), radius=4, fill=(60, 60, 70, 255))
    d.arc((9, 9, 23, 22), 0, 180, fill=B, width=2)
    d.rectangle((15, 22, 17, 26), fill=B)
    d.rectangle((11, 26, 21, 27), fill=B)
    out["entrevista"] = img

    img, d = _base((210, 205, 190))
    d.rectangle((6, 7, 26, 25), fill=B, outline=P)
    d.rectangle((8, 9, 24, 12), fill=P)
    d.rectangle((8, 14, 15, 21), fill=(150, 150, 150, 255))
    for y in (14, 17, 20, 23):
        d.line([(17, y), (24, y)], fill=P)
    out["noticias"] = img

    img, d = _base((60, 170, 90))
    d.rectangle((6, 9, 26, 24), fill=B)
    d.line([(6, 9), (16, 18), (26, 9)], fill=(60, 170, 90, 255), width=2)
    out["mensagens"] = img

    img, d = _base((220, 70, 140))
    d.ellipse((7, 9, 16, 18), fill=B)
    d.ellipse((16, 9, 25, 18), fill=B)
    d.polygon([(7, 14), (25, 14), (16, 25)], fill=B)
    out["rede"] = img

    img, d = _base((200, 60, 60))
    d.rectangle((6, 8, 26, 26), fill=B)
    d.rectangle((6, 8, 26, 12), fill=(200, 60, 60, 255))
    for i in range(3):
        for j in range(3):
            d.rectangle((9 + i * 6, 15 + j * 4, 11 + i * 6, 16 + j * 4), fill=P)
    out["agenda"] = img

    img, d = _base((60, 140, 70))
    d.ellipse((7, 7, 25, 25), fill=(250, 210, 60, 255), outline=(170, 130, 20, 255), width=2)
    d.text((13, 10), "$", fill=(140, 100, 10, 255))
    out["banco"] = img

    img, d = _base((70, 70, 80))
    d.ellipse((8, 12, 22, 24), fill=(200, 200, 210, 255))
    d.rectangle((15, 10, 27, 16), fill=(200, 200, 210, 255))
    d.ellipse((12, 15, 17, 20), fill=(70, 70, 80, 255))
    out["apito"] = img

    img, d = _base((120, 70, 190))
    d.ellipse((8, 6, 24, 22), fill=(255, 215, 80, 255), outline=(180, 130, 20, 255), width=2)
    d.polygon([(10, 20), (13, 28), (16, 24), (19, 28), (22, 20)], fill=(200, 40, 40, 255))
    out["premio"] = img

    img, d = _base((46, 160, 67))
    d.ellipse((6, 6, 26, 26), fill=B, outline=P)
    d.polygon([(16, 11), (20, 14), (19, 19), (13, 19), (12, 14)], fill=P)
    out["bola"] = img
    return out


def icone_drible():
    img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.arc((1, 3, 15, 15), 200, 340, fill=(200, 80, 220, 255), width=2)
    d.polygon([(13, 6), (15, 10), (11, 9)], fill=(200, 80, 220, 255))
    d.ellipse((5, 9, 10, 14), fill=(245, 245, 245, 255), outline=(30, 30, 30, 255))
    for x in (2, 4):
        d.line([(x, 2), (x + 3, 2)], fill=(250, 250, 250, 255))
    return img


def icone_celular():
    img = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((4, 1, 11, 14), radius=1, fill=(25, 25, 30, 255), outline=(160, 160, 170, 255))
    d.rectangle((5, 3, 10, 11), fill=(90, 200, 255, 255))
    d.rectangle((6, 4, 9, 5), fill=(255, 255, 255, 255))
    d.rectangle((6, 7, 8, 8), fill=(255, 120, 160, 255))
    d.point((7, 12), fill=(160, 160, 170, 255))
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
    salvar(icone_drible(), "textures", "items", "fut_drible.png")
    salvar(icone_celular(), "textures", "items", "fut_celular.png")
    for nome, img in icones_ui().items():
        salvar(img, "textures", "ui", "fut", f"{nome}.png")

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
