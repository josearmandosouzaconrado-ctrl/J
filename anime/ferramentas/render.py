"""Monta o episódio a partir do roteiro: câmera, efeitos, legendas,
janelas do Sistema, trilha e efeitos sonoros.

Uso:
  python3 render.py <pasta_trabalho> [--so 0-5] [--quadro N T]   (testes)
  python3 render.py <pasta_trabalho>                             (episódio inteiro)
"""
import json
import math
import os
import subprocess
import sys
import wave
from functools import lru_cache
from multiprocessing import Pool
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

sys.path.insert(0, str(Path(__file__).parent))
import musica  # noqa: E402
import roteiro  # noqa: E402

W, H = 1280, 720
FPS = roteiro.FPS
ARTE = Path(__file__).resolve().parent.parent / "arte"

FD = "/usr/share/fonts/truetype/dejavu/"
FL = "/usr/share/fonts/truetype/liberation/"


@lru_cache(None)
def fonte(nome, tam):
    return ImageFont.truetype(nome, tam)


F_LEG = lambda: fonte(FD + "DejaVuSans-Bold.ttf", 33)  # noqa: E731
F_NOME = lambda: fonte(FD + "DejaVuSans-Bold.ttf", 26)  # noqa: E731
F_NARRA = lambda: fonte(FL + "LiberationSerif-BoldItalic.ttf", 36)  # noqa: E731
F_SIS = lambda: fonte(FD + "DejaVuSans.ttf", 25)  # noqa: E731
F_SIS_T = lambda: fonte(FD + "DejaVuSans-Bold.ttf", 24)  # noqa: E731
F_LOCAL = lambda: fonte(FL + "LiberationSerif-Bold.ttf", 50)  # noqa: E731
F_LOCAL_S = lambda: fonte(FL + "LiberationSerif-Italic.ttf", 26)  # noqa: E731
F_TIT = lambda: fonte(FL + "LiberationSerif-Bold.ttf", 82)  # noqa: E731
F_TIT_S = lambda: fonte(FL + "LiberationSerif-BoldItalic.ttf", 36)  # noqa: E731
F_CRED = lambda: fonte(FD + "DejaVuSans.ttf", 22)  # noqa: E731
F_CRED_N = lambda: fonte(FL + "LiberationSerif-Bold.ttf", 34)  # noqa: E731

CORES = {
    "Rafa": (120, 200, 255), "Lyriel": (150, 230, 150), "Borin": (255, 150, 90),
    "Mira": (255, 205, 80), "Elsa": (240, 160, 210), "Morvath": (195, 140, 255),
    "Goblin": (170, 200, 70), "Rei Goblin": (200, 230, 60), "Guarda": (180, 190, 210),
    "???": (220, 220, 220),
}


# ================================================================ linha do tempo
def dur_fala(txt):
    return min(8.5, max(2.4, 1.4 + len(txt) / 14.5))


def dur_sis(linhas):
    n = sum(len(x) for x in linhas)
    digitar = 0.3 + n / 38
    return digitar + max(2.4, 1.0 + n / 22)


def montar():
    """Resolve a linha do tempo de cada cena e devolve a lista de cenas prontas."""
    cenas = []
    t_glob = 0.0
    for idx, c in enumerate(roteiro.CENAS):
        cur = 0.0
        ev = []
        for it in c["itens"]:
            k = it[0]
            if k in ("fala", "narra"):
                txt = it[-1]
                d = dur_fala(txt)
                ev.append(dict(k=k, t0=cur, t1=cur + d, quem=it[1] if k == "fala" else None, txt=txt))
                cur += d + 0.25
            elif k in ("sis", "alerta"):
                d = dur_sis(it[2])
                ev.append(dict(k=k, t0=cur, t1=cur + d, tit=it[1], linhas=it[2]))
                ev.append(dict(k="sfx", t0=cur, nome="ding" if k == "sis" else "alarme"))
                cur += d + 0.2
            elif k == "local":
                ev.append(dict(k=k, t0=cur, t1=cur + 4.8, nome=it[1], sub=it[2]))
            elif k in ("titulo", "credito"):
                ev.append(dict(k=k, t0=cur, t1=None, a=it[1], b=it[2]))
            elif k == "rolagem":
                ev.append(dict(k=k, t0=0, t1=None, i=it[1], n=it[2]))
            elif k == "flash":
                ev.append(dict(k=k, t0=cur, t1=cur + 0.4))
            elif k == "tremor":
                ev.append(dict(k=k, t0=cur, t1=cur + it[1], amp=it[2]))
            elif k == "sfx":
                ev.append(dict(k=k, t0=cur, nome=it[1]))
            elif k == "pausa":
                cur += it[1]
        dur = max(c["dur"], cur + 0.5) if c["itens"] else c["dur"]
        # nas cenas da abertura o corte é fixo, no ritmo da música
        if all(e["k"] in ("titulo", "credito", "flash") for e in ev) and c["dur"] == roteiro.OP_CORTE:
            dur = c["dur"]
        for e in ev:
            if e.get("t1") is None and e["k"] != "sfx":
                e["t1"] = dur
        nf = int(round(dur * FPS))
        cenas.append(dict(c, idx=idx, ev=ev, dur=nf / FPS, nf=nf, t_ini=t_glob))
        t_glob += nf / FPS
    return cenas


# ================================================================ desenho
def suave(x):
    x = min(1.0, max(0.0, x))
    return x * x * (3 - 2 * x)


def camera(kf, f):
    if f <= kf[0][0]:
        return kf[0][1:]
    for a, b in zip(kf, kf[1:]):
        if f <= b[0]:
            u = suave((f - a[0]) / max(1e-6, b[0] - a[0]))
            return tuple(a[i] + (b[i] - a[i]) * u for i in (1, 2, 3))
    return kf[-1][1:]


@lru_cache(8)
def carregar(img):
    if img is None:
        return Image.new("RGB", (W, H), (0, 0, 0))
    return Image.open(ARTE / f"{img}.jpg").convert("RGB")


@lru_cache(1)
def vinheta():
    y, x = np.mgrid[0:H, 0:W]
    d = np.sqrt(((x - W / 2) / (W / 2)) ** 2 + ((y - H / 2) / (H / 2)) ** 2)
    a = np.clip((d - 0.75) * 0.9, 0, 0.55)
    arr = np.zeros((H, W, 4), np.uint8)
    arr[..., 3] = (a * 255).astype(np.uint8)
    return Image.fromarray(arr, "RGBA")


@lru_cache(1)
def faixa_legenda():
    arr = np.zeros((H, W, 4), np.uint8)
    y = np.arange(H)
    a = np.clip((y - (H - 190)) / 190, 0, 1) * 0.62
    arr[..., 3] = (a[:, None] * 255).astype(np.uint8)
    return Image.fromarray(arr, "RGBA")


def quebrar(txt, fnt, larg):
    linhas, atual = [], ""
    for p in txt.split(" "):
        teste = (atual + " " + p).strip()
        if fnt.getlength(teste) <= larg:
            atual = teste
        else:
            linhas.append(atual)
            atual = p
    linhas.append(atual)
    return linhas


def alfa_ev(e, t, ent=0.18, sai=0.18):
    return min(1, (t - e["t0"]) / ent, (e["t1"] - t) / sai)


def texto(dr, xy, s, fnt, cor, alfa=1.0, borda=3, anc="la"):
    a = int(255 * alfa)
    dr.text(xy, s, font=fnt, fill=cor + (a,), stroke_width=borda, stroke_fill=(0, 0, 0, int(a * 0.9)), anchor=anc)


@lru_cache(64)
def painel_base(tit, linhas, alerta):
    """Janela do Sistema completa (sem animação)."""
    ft, fl = F_SIS_T(), F_SIS()
    larg = max([fl.getlength(x) for x in linhas] + [ft.getlength("◆  " + tit + "  ◆") + 40, 460]) + 80
    larg = int(min(larg, 1100))
    alt = 70 + 38 * len(linhas) + 26
    pad = 24
    im = Image.new("RGBA", (larg + pad * 2, alt + pad * 2), (0, 0, 0, 0))
    if alerta:
        borda, fundo, cab, txtc = (255, 90, 90), (60, 8, 12, 205), (150, 20, 30, 230), (255, 215, 215)
    else:
        borda, fundo, cab, txtc = (90, 205, 255), (8, 24, 58, 200), (20, 70, 150, 230), (210, 240, 255)
    glow = Image.new("RGBA", im.size, (0, 0, 0, 0))
    dg = ImageDraw.Draw(glow)
    dg.rounded_rectangle((pad, pad, pad + larg, pad + alt), 10, outline=borda + (255,), width=6)
    glow = glow.filter(ImageFilter.GaussianBlur(9))
    im.alpha_composite(glow)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((pad, pad, pad + larg, pad + alt), 10, fill=fundo, outline=borda + (255,), width=2)
    d.rounded_rectangle((pad + 6, pad + 6, pad + larg - 6, pad + 48), 6, fill=cab)
    # cantoneiras
    for (x, y, sx, sy) in ((pad, pad, 1, 1), (pad + larg, pad, -1, 1), (pad, pad + alt, 1, -1),
                           (pad + larg, pad + alt, -1, -1)):
        d.line((x - 4 * sx, y - 4 * sy, x + 26 * sx, y - 4 * sy), fill=borda + (255,), width=3)
        d.line((x - 4 * sx, y - 4 * sy, x - 4 * sx, y + 26 * sy), fill=borda + (255,), width=3)
    d.text((pad + larg / 2, pad + 27), "◆  " + tit + "  ◆", font=ft, fill=(255, 255, 255, 255), anchor="mm")
    return im, larg, alt, pad, txtc


@lru_cache(512)
def painel(tit, linhas, alerta, nvis):
    base, larg, alt, pad, txtc = painel_base(tit, linhas, alerta)
    im = base.copy()
    d = ImageDraw.Draw(im)
    resta = nvis
    for i, ln in enumerate(linhas):
        if resta <= 0:
            break
        s = ln[:resta]
        resta -= len(ln)
        d.text((pad + 34, pad + 68 + 38 * i), s, font=F_SIS(), fill=txtc + (255,))
        if resta < 0:  # cursor piscando
            x = pad + 34 + F_SIS().getlength(s) + 2
            d.rectangle((x, pad + 70 + 38 * i, x + 10, pad + 92 + 38 * i), fill=txtc + (200,))
    return im


def desenhar_sis(fr, e, t):
    a = alfa_ev(e, t, 0.22, 0.2)
    if a <= 0:
        return
    linhas = tuple(e["linhas"])
    nvis = int(max(0, t - e["t0"] - 0.25) * 38)
    total = sum(len(x) for x in linhas)
    im = painel(e["tit"], linhas, e["k"] == "alerta", min(nvis, total))
    # abre na vertical como um holograma
    ab = suave((t - e["t0"]) / 0.22)
    fe = suave((e["t1"] - t) / 0.2)
    esc = min(ab, fe)
    w, h = im.size
    hh = max(2, int(h * esc))
    if hh != h:
        im = im.resize((w, hh), Image.BILINEAR)
    if a < 1:
        arr = np.array(im)
        arr[..., 3] = (arr[..., 3] * a).astype(np.uint8)
        im = Image.fromarray(arr, "RGBA")
    cy = 250
    fr.alpha_composite(im, (int(W / 2 - w / 2), int(cy - hh / 2)))


def desenhar_fala(fr, e, t):
    a = alfa_ev(e, t)
    if a <= 0:
        return
    d = ImageDraw.Draw(fr)
    if e["k"] == "narra":
        fnt = F_NARRA()
        linhas = quebrar(e["txt"], fnt, 1080)
        y = H - 40 - 44 * len(linhas)
        for i, ln in enumerate(linhas):
            texto(d, (W / 2, y + 44 * i), ln, fnt, (245, 232, 200), a, 3, "ma")
        return
    fnt = F_LEG()
    linhas = quebrar(e["txt"], fnt, 1100)
    y = H - 36 - 42 * len(linhas)
    cor = CORES.get(e["quem"], (230, 230, 230))
    texto(d, (W / 2, y - 36), e["quem"], F_NOME(), cor, a, 3, "ma")
    for i, ln in enumerate(linhas):
        texto(d, (W / 2, y + 42 * i), ln, fnt, (255, 255, 255), a, 3, "ma")


def desenhar_local(fr, e, t):
    a = alfa_ev(e, t, 0.4, 0.6)
    if a <= 0:
        return
    d = ImageDraw.Draw(fr)
    desl = (1 - suave((t - e["t0"]) / 0.6)) * -60
    x, y = 60 + desl, 52
    texto(d, (x, y), e["nome"], F_LOCAL(), (255, 215, 120), a, 3)
    lw = F_LOCAL().getlength(e["nome"])
    d.line((x, y + 66, x + lw * suave((t - e["t0"]) / 0.8), y + 66), fill=(255, 215, 120, int(220 * a)), width=3)
    texto(d, (x, y + 76), e["sub"], F_LOCAL_S(), (240, 240, 240), a, 2)


def desenhar_titulo(fr, e, t):
    a = alfa_ev(e, t, 0.7, 0.5)
    if a <= 0:
        return
    camada = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(camada)
    cy = H / 2 - 20 if e["b"] else H / 2
    d.text((W / 2, cy), e["a"], font=F_TIT(), fill=(120, 200, 255, 255), anchor="mm")
    brilho = camada.filter(ImageFilter.GaussianBlur(14))
    fr.alpha_composite(brilho)
    fr.alpha_composite(brilho)
    d = ImageDraw.Draw(fr)
    texto(d, (W / 2, cy), e["a"], F_TIT(), (255, 225, 140), a, 4, "mm")
    if e["b"]:
        texto(d, (W / 2, cy + 70), e["b"], F_TIT_S(), (235, 245, 255), a, 3, "mm")


def desenhar_credito(fr, e, t):
    a = alfa_ev(e, t, 0.5, 0.4)
    d = ImageDraw.Draw(fr)
    texto(d, (W - 50, H - 110), e["a"], F_CRED(), (200, 220, 240), a, 2, "ra")
    texto(d, (W - 50, H - 80), e["b"], F_CRED_N(), (255, 255, 255), a, 3, "ra")


@lru_cache(1)
def rolo_creditos():
    lh = 52
    alt = lh * len(roteiro.CREDITOS) + H
    im = Image.new("RGBA", (W, alt), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    secoes = {"ELENCO", "O MUNDO", "PRODUÇÃO"}
    for i, s in enumerate(roteiro.CREDITOS):
        y = H * 0.55 + i * lh
        if i == 0:
            texto(d, (W / 2, y), s, fonte(FL + "LiberationSerif-Bold.ttf", 54), (255, 220, 130), 1, 4, "mm")
        elif s in secoes:
            texto(d, (W / 2, y), s, fonte(FD + "DejaVuSans-Bold.ttf", 28), (120, 200, 255), 1, 3, "mm")
        else:
            texto(d, (W / 2, y), s, fonte(FL + "LiberationSerif-Bold.ttf", 32), (255, 255, 255), 1, 3, "mm")
    return im


def desenhar_rolagem(fr, e, t, dur):
    rolo = rolo_creditos()
    total = rolo.height - H * 0.5
    off = int((e["i"] + t / dur) / e["n"] * total)
    fr.alpha_composite(rolo.crop((0, off, W, off + H)))


# ================================================================ partículas
class Particulas:
    def __init__(self, tipo, seed):
        self.tipo = tipo
        r = np.random.default_rng(seed)
        n = {"brilho": 70, "chuva": 260, "brasas": 90, "petalas": 55, "neve": 160, "vagalumes": 45,
             "poeira": 70, "ouro": 100}[tipo]
        self.x = r.uniform(0, W, n)
        self.y = r.uniform(0, H, n)
        self.s = r.uniform(0.5, 1.0, n)
        self.f = r.uniform(0, 6.28, n)

    def desenhar(self, d, t):
        tp = self.tipo
        for x, y, s, f in zip(self.x, self.y, self.s, self.f):
            if tp == "chuva":
                yy = (y + t * 1400 * s) % (H + 60) - 30
                xx = (x - t * 260 * s) % W
                d.line((xx, yy, xx - 6, yy + 26 * s), fill=(200, 210, 230, int(110 * s)), width=1)
            elif tp in ("brilho", "ouro"):
                yy = (y - t * 60 * s) % H
                xx = x + 14 * math.sin(t * 1.5 + f)
                a = int(255 * (0.5 + 0.5 * math.sin(t * 4 + f * 3)) * s)
                c = (130, 220, 255) if tp == "brilho" else (255, 215, 110)
                r = 2 + 3 * s
                d.ellipse((xx - r, yy - r, xx + r, yy + r), fill=c + (a,))
            elif tp == "brasas":
                yy = (y - t * 90 * s) % H
                xx = x + 25 * math.sin(t * 0.9 + f)
                a = int(230 * s)
                r = 1.5 + 2.5 * s
                d.ellipse((xx - r, yy - r, xx + r, yy + r), fill=(255, 140 + int(60 * s), 40, a))
            elif tp == "petalas":
                yy = (y + t * 55 * s) % (H + 20) - 10
                xx = (x + t * 30 + 40 * math.sin(t + f)) % W
                r = 5 * s + 2
                d.ellipse((xx - r, yy - r * 0.55, xx + r, yy + r * 0.55), fill=(255, 180, 210, 210))
            elif tp == "neve":
                yy = (y + t * 45 * s) % H
                xx = (x + 20 * math.sin(t * 0.7 + f)) % W
                r = 1 + 2.5 * s
                d.ellipse((xx - r, yy - r, xx + r, yy + r), fill=(255, 255, 255, int(220 * s)))
            elif tp == "vagalumes":
                xx = x + 40 * math.sin(t * 0.4 + f)
                yy = y + 30 * math.cos(t * 0.5 + f * 2)
                a = int(255 * max(0, math.sin(t * 2 + f * 5)))
                r = 2.5
                d.ellipse((xx - r, yy - r, xx + r, yy + r), fill=(220, 255, 120, a))
            elif tp == "poeira":
                xx = (x + t * 12 * s) % W
                yy = (y - t * 6 * s + 10 * math.sin(t + f)) % H
                r = 1 + 1.5 * s
                d.ellipse((xx - r, yy - r, xx + r, yy + r), fill=(230, 210, 170, int(140 * s)))


def linhas_velocidade(fr, t, seed):
    r = np.random.default_rng(seed + int(t * 12))
    cam = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(cam)
    cx, cy = W / 2, H / 2
    for _ in range(46):
        ang = r.uniform(0, 2 * math.pi)
        r0 = r.uniform(380, 560)
        larg = r.uniform(0.004, 0.012)
        p = [(cx + math.cos(ang) * r0, cy + math.sin(ang) * r0),
             (cx + math.cos(ang - larg) * 1000, cy + math.sin(ang - larg) * 1000),
             (cx + math.cos(ang + larg) * 1000, cy + math.sin(ang + larg) * 1000)]
        d.polygon(p, fill=(255, 255, 255, int(r.uniform(60, 140))))
    fr.alpha_composite(cam)


def glitch(arr, t, seed):
    r = np.random.default_rng(seed + int(t * 24))
    if r.random() > 0.45:
        return arr
    out = arr.copy()
    for _ in range(r.integers(2, 7)):
        y0 = r.integers(0, H - 40)
        hh = r.integers(6, 50)
        dx = r.integers(-60, 60)
        out[y0:y0 + hh] = np.roll(out[y0:y0 + hh], dx, axis=1)
    out[..., 0] = np.roll(out[..., 0], 6, axis=1)
    out[..., 2] = np.roll(out[..., 2], -6, axis=1)
    return out


# ================================================================ quadro
def quadro(c, t, parts):
    img = carregar(c["img"])
    iw, ih = img.size
    cx, cy, z = camera(c["cam"], t / c["dur"])
    # tremor
    sx = sy = 0.0
    for e in c["ev"]:
        if e["k"] == "tremor" and e["t0"] <= t < e["t1"]:
            dec = 1 - (t - e["t0"]) / (e["t1"] - e["t0"])
            sx += e["amp"] * dec * math.sin(t * 91.0)
            sy += e["amp"] * dec * math.cos(t * 77.0)
            z = min(z, 0.97)
    cw, ch = iw * z, ih * z
    x0 = min(max(cx * iw - cw / 2, 0), iw - cw) + sx * cw / W
    y0 = min(max(cy * ih - ch / 2, 0), ih - ch) + sy * ch / H
    fr = img.transform((W, H), Image.Transform.EXTENT, (x0, y0, x0 + cw, y0 + ch), Image.BILINEAR)
    if "desfoque" in c["fx"]:
        fr = fr.filter(ImageFilter.GaussianBlur(7))
    if "glitch" in c["fx"] and t < 4.5:
        fr = Image.fromarray(glitch(np.asarray(fr), t, c["idx"]))
    fr = fr.convert("RGBA")
    if "escuro" in c["fx"]:
        fr.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 10, 120)))
    # partículas
    if parts:
        cam = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(cam)
        for p in parts:
            p.desenhar(d, t)
        if any(p.tipo in ("brilho", "ouro", "brasas", "vagalumes") for p in parts):
            fr.alpha_composite(cam.filter(ImageFilter.GaussianBlur(2.5)))
        fr.alpha_composite(cam)
    if "velocidade" in c["fx"]:
        linhas_velocidade(fr, t, c["idx"])
    fr.alpha_composite(vinheta())
    # legendas e janelas
    tem_leg = any(e["k"] in ("fala", "narra") and e["t0"] <= t < e["t1"] for e in c["ev"])
    if tem_leg:
        fr.alpha_composite(faixa_legenda())
    for e in c["ev"]:
        k = e["k"]
        if k == "sfx" or not (e["t0"] <= t < e["t1"]):
            continue
        if k in ("fala", "narra"):
            desenhar_fala(fr, e, t)
        elif k in ("sis", "alerta"):
            desenhar_sis(fr, e, t)
        elif k == "local":
            desenhar_local(fr, e, t)
        elif k == "titulo":
            desenhar_titulo(fr, e, t)
        elif k == "credito":
            desenhar_credito(fr, e, t)
        elif k == "rolagem":
            desenhar_rolagem(fr, e, t, c["dur"])
    # flash
    for e in c["ev"]:
        if e["k"] == "flash" and e["t0"] <= t < e["t1"]:
            a = 1 - (t - e["t0"]) / 0.4
            fr.alpha_composite(Image.new("RGBA", (W, H), (255, 255, 255, int(235 * a))))
    # fades
    fi, fo = c["fade"]
    a = 1.0
    if fi:
        a = min(a, t / fi)
    if fo:
        a = min(a, (c["dur"] - t) / fo)
    if a < 1:
        fr.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, int(255 * (1 - max(0, a))))))
    return fr.convert("RGB")


def render_cena(args):
    c, saida = args
    if Path(saida).exists():
        return saida
    parts = [Particulas(f, c["idx"] * 10 + i) for i, f in enumerate(c["fx"])
             if f in ("brilho", "chuva", "brasas", "petalas", "neve", "vagalumes", "poeira", "ouro")]
    tmp = str(saida) + ".tmp.mp4"
    p = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
                          "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "medium",
                          "-tune", "animation", "-crf", "23", "-pix_fmt", "yuv420p", "-g", "48",
                          "-threads", "2", tmp], stdin=subprocess.PIPE)
    for f in range(c["nf"]):
        p.stdin.write(quadro(c, f / FPS, parts).tobytes())
    p.stdin.close()
    p.wait()
    os.replace(tmp, saida)
    return saida


# ================================================================ áudio
SR = musica.SR


def ruido(n, seed=0):
    return np.random.default_rng(seed).standard_normal(n)


def filtro(x, lo, hi):
    N = len(x)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(N, 1 / SR)
    X[(f < lo) | (f > hi)] = 0
    return np.fft.irfft(X, N)


def sfx(nome):
    t = lambda s: np.arange(int(s * SR)) / SR  # noqa: E731
    if nome == "ding":
        tt = t(1.2)
        return 0.35 * (np.sin(2 * np.pi * 1318.5 * tt) * np.exp(-tt * 5) +
                       0.7 * np.sin(2 * np.pi * 1975.5 * tt) * np.exp(-tt * 4) * (tt > 0.08))
    if nome == "alarme":
        tt = t(1.0)
        f = np.where((tt * 4).astype(int) % 2 == 0, 880, 660)
        return 0.25 * np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * np.exp(-tt * 1.5) * 0.6
    if nome in ("whoosh", "grito"):
        tt = t(0.8)
        x = filtro(ruido(len(tt), 3), 300, 4000) * np.sin(np.pi * tt / 0.8) ** 2
        return 0.6 * x / np.abs(x).max()
    if nome == "vento":
        tt = t(4.5)
        x = filtro(ruido(len(tt), 4), 150, 2500) * np.sin(np.pi * tt / 4.5)
        return 0.7 * x / np.abs(x).max()
    if nome == "corte":
        tt = t(0.6)
        x = filtro(ruido(len(tt), 5), 2000, 9000) * np.exp(-tt * 14)
        ring = np.sin(2 * np.pi * 2600 * tt) * np.exp(-tt * 6) * 0.3
        return 0.8 * (x / np.abs(x).max() + ring)
    if nome in ("impacto", "impacto_leve"):
        tt = t(1.4)
        f = 40 + 90 * np.exp(-tt * 10)
        boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 3.5)
        x = filtro(ruido(len(tt), 6), 60, 1500) * np.exp(-tt * 8)
        s = boom + 0.6 * x / np.abs(x).max()
        return s * (0.9 if nome == "impacto" else 0.35)
    if nome == "levelup":
        out = np.zeros(int(1.6 * SR))
        for i, m in enumerate([72, 76, 79, 84, 88]):
            tt = t(1.6 - i * 0.1)
            s = np.sin(2 * np.pi * musica.hz(m) * tt) * np.exp(-tt * 3)
            k = int(i * 0.1 * SR)
            out[k:k + len(s)] += s * 0.25
        return out
    if nome == "magia":
        tt = t(2.5)
        out = np.zeros(len(tt))
        for k in range(8):
            out += np.sin(2 * np.pi * (800 + k * 230) * tt * (1 + tt * 0.2)) * np.exp(-((tt - 0.4 - k * 0.15) ** 2) * 18)
        return 0.15 * out
    if nome == "rugido":
        tt = t(3.0)
        x = filtro(ruido(len(tt), 7), 40, 700)
        x = x / np.abs(x).max()
        saw = ((tt * 55) % 1 - 0.5) * (1 + 0.5 * np.sin(2 * np.pi * 9 * tt))
        env = np.sin(np.pi * np.clip(tt / 3.0, 0, 1)) ** 0.6
        return 0.9 * (x + 0.6 * saw) * env
    return np.zeros(10)


def ler_wav(p):
    with wave.open(str(p)) as w:
        return np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32767


def periodo(nome):
    abc, lead, est, voltas, oit = musica.FAIXAS[nome]
    pp = musica.parse_abc(abc)
    return pp["total"] * pp["unid"] * voltas


def montar_audio(cenas, pasta_musica, saida):
    total = cenas[-1]["t_ini"] + cenas[-1]["dur"]
    n = int(total * SR) + SR
    mus = np.zeros(n, np.float32)
    efx = np.zeros(n, np.float32)
    # trilha
    cues = []
    for c in cenas:
        if c["musica"] is not None:
            cues.append((c["t_ini"], c["musica"], c["vol"]))
    cues.append((total, "-", 0))
    for (t0, nome, vol), (t1, _, _) in zip(cues, cues[1:]):
        if nome == "-":
            continue
        trilha = ler_wav(Path(pasta_musica) / f"{nome}.wav")
        per = periodo(nome)
        i0 = int(t0 * SR)
        i1 = min(n, int((t1 + 1.2) * SR))
        seg = np.zeros(i1 - i0, np.float32)
        if nome == "vitoria":
            k = min(len(seg), len(trilha))
            seg[:k] = trilha[:k]
        else:
            pos = 0
            while pos < len(seg):
                k = min(len(seg) - pos, len(trilha))
                seg[pos:pos + k] += trilha[:k]
                pos += int(per * SR)
        # entrada suave e saída de 1,2 s
        fi = min(len(seg), int(0.3 * SR))
        seg[:fi] *= np.linspace(0, 1, fi)
        fo = min(len(seg), int(1.2 * SR))
        seg[-fo:] *= np.linspace(1, 0, fo)
        mus[i0:i1] += seg * vol
    # efeitos
    for c in cenas:
        for e in c["ev"]:
            if e["k"] == "sfx":
                s = sfx(e["nome"]).astype(np.float32)
                i = int((c["t_ini"] + e["t0"]) * SR)
                j = min(n, i + len(s))
                efx[i:j] += s[:j - i]
            elif e["k"] == "flash":
                s = sfx("impacto_leve").astype(np.float32) * 0.6
                i = int((c["t_ini"] + e["t0"]) * SR)
                j = min(n, i + len(s))
                efx[i:j] += s[:j - i]
        if "chuva" in c["fx"]:
            i = int(c["t_ini"] * SR)
            k = int(c["dur"] * SR)
            r = filtro(ruido(k, 11), 400, 6000)
            r = r / np.abs(r).max() * 0.18
            env = np.minimum(1, np.minimum(np.arange(k) / SR / 1.5, (k - np.arange(k)) / SR / 1.0))
            efx[i:i + k] += (r * env).astype(np.float32)
    mix = mus * 0.62 + efx * 0.8
    mix /= max(1.0, np.abs(mix).max() / 0.95)
    musica.salvar(saida, mix)
    return total


# ================================================================ principal
def main():
    pasta = Path(sys.argv[1])
    pasta.mkdir(parents=True, exist_ok=True)
    (pasta / "seg").mkdir(exist_ok=True)
    cenas = montar()
    total = cenas[-1]["t_ini"] + cenas[-1]["dur"]
    print(f"{len(cenas)} cenas, {total / 60:.1f} min")
    if "--quadro" in sys.argv:
        i = sys.argv.index("--quadro")
        c = cenas[int(sys.argv[i + 1])]
        t = float(sys.argv[i + 2])
        parts = [Particulas(f, c["idx"] * 10 + k) for k, f in enumerate(c["fx"])
                 if f in ("brilho", "chuva", "brasas", "petalas", "neve", "vagalumes", "poeira", "ouro")]
        quadro(c, t, parts).save(pasta / f"quadro_{c['idx']:03d}_{t:.1f}.png")
        return
    sel = range(len(cenas))
    if "--so" in sys.argv:
        a, b = sys.argv[sys.argv.index("--so") + 1].split("-")
        sel = range(int(a), int(b) + 1)
    if "--tempos" in sys.argv:
        for c in cenas:
            print(f"{c['idx']:3d} {c['t_ini'] / 60:5.2f}min {c['dur']:5.1f}s {c['img']}")
        return
    trabalhos = [(cenas[i], pasta / "seg" / f"{i:03d}.mp4") for i in sel]
    trabalhos.sort(key=lambda x: -x[0]["nf"])
    with Pool(int(os.environ.get("PROC", "4"))) as pool:
        for k, s in enumerate(pool.imap_unordered(render_cena, trabalhos)):
            print(f"  [{k + 1}/{len(trabalhos)}] {Path(s).name}", flush=True)
    if "--so" in sys.argv:
        return
    print("áudio...")
    montar_audio(cenas, pasta / "audio", pasta / "audio_final.wav")
    with open(pasta / "lista.txt", "w") as f:
        for i in range(len(cenas)):
            f.write(f"file 'seg/{i:03d}.mp4'\n")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(pasta / "lista.txt"),
                    "-i", str(pasta / "audio_final.wav"), "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                    "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart",
                    str(pasta / "episodio1.mp4")], check=True)
    json.dump([dict(idx=c["idx"], img=c["img"], t=c["t_ini"], dur=c["dur"]) for c in cenas],
              open(pasta / "tempos.json", "w"), indent=1)
    print("pronto:", pasta / "episodio1.mp4")


if __name__ == "__main__":
    main()
