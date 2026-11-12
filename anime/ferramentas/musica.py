"""Sintetizador da trilha do anime "O Sistema de Eldoria".

Lê partituras em notação ABC (as mesmas tocadas no plugin de partitura)
e gera faixas WAV com melodia, acordes, baixo, arpejo e bateria.
Só usa numpy.  Uso:  python3 musica.py <pasta_saida>
"""
import re
import sys
import wave
from pathlib import Path

import numpy as np

SR = 44100

# ---------------------------------------------------------------- partituras
ABERTURA = """
X:1
T:O Sistema de Eldoria - Abertura
M:4/4
L:1/8
Q:1/4=132
K:Dm
"Dm" A2 D2 F2 A2 | "Bb" B2 A2 G2 F2 | "C" E2 G2 c2 B2 | "A" A6 z2 |
"Dm" d2 c2 A2 F2 | "Gm" G2 B2 d2 c2 | "Bb" B2 A2 G2 E2 | "A" A8 |
"F" A2 c2 f2 c2 | "C" G2 c2 e2 c2 | "Dm" F2 A2 d2 A2 | "A" E2 A2 ^c2 e2 |
"Bb" f4 e2 d2 | "C" e4 d2 c2 | "Dm" d3 c B2 A2 | "F" c6 A2 |
"Bb" B3 c d2 f2 | "C" e3 d c2 e2 | "A" e4 ^c4 | "Dm" d8 |
"""

CALMO = """
X:2
T:Prados de Valdoria
M:3/4
L:1/8
Q:1/4=96
K:G
"G" D2 G2 B2 | "D" A4 F2 | "Em" G2 B2 e2 | "C" d4 B2 |
"G" B2 d2 g2 | "Am" e4 c2 | "D" A2 B2 c2 | "G" B4 z2 |
"C" c2 e2 g2 | "G" d4 B2 | "Am" c2 A2 E2 | "D" F4 D2 |
"Em" E2 G2 B2 | "C" c2 B2 A2 | "D" A2 F2 D2 | "G" G6 |
"""

BATALHA = """
X:3
T:Lamina do Viajante - Batalha
M:4/4
L:1/8
Q:1/4=160
K:Em
"Em" E2 EB, EE G2 | "C" E2 EG EE c2 | "D" A2 AF DD A2 | "B" F2 ^D2 B,2 ^D2 |
"Em" e2 B2 G2 E2 | "C" c2 G2 E2 C2 | "Am" A2 c2 e2 a2 | "B" b2 ^f2 ^d2 B2 |
"Em" g2 f2 e2 B2 | "C" c2 e2 g2 e2 | "D" f2 d2 A2 d2 | "B" ^d4 B4 |
"Am" a2 g2 e2 c2 | "Em" B2 e2 g2 b2 | "B" ^f2 ^d2 B2 ^F2 | "Em" E8 |
"""

ENCERRAMENTO = """
X:4
T:Duas Luas - Encerramento
M:4/4
L:1/8
Q:1/4=76
K:C
"C" E3 D C2 G,2 | "G" D4 B,4 | "Am" C3 D E2 A2 | "F" G6 z2 |
"C" E3 F G2 c2 | "G" B4 G4 | "F" A3 G F2 E2 | "G" D8 |
"Am" c3 B A2 E2 | "F" F4 A4 | "C" G3 F E2 C2 | "G" D6 G2 |
"F" A3 B c2 d2 | "C" e4 c4 | "G" d3 c B2 D2 | "C" C8 |
"""

TAVERNA = """
X:5
T:Taverna do Javali Dourado
M:6/8
L:1/8
Q:3/8=112
K:D
"D" A2F D2F | "G" G2B d2B | "D" A2F D2F | "A" E3 E2A |
"D" A2F D2F | "G" G2B d2e | "A" f2e d2c | "D" d3 d3 |
"G" B2d g2d | "D" A2d f2d | "Em" G2B e2B | "A" A2c e2c |
"G" B2d g2f | "D" e2d c2B | "A" A2G F2E | "D" D3 D3 |
"""

VITORIA = """
X:6
T:Subiu de Nivel - Fanfarra
M:4/4
L:1/8
Q:1/4=120
K:C
"C" G2 GG c4 | "F" A2 AA c4 | "G" B2 cd e2 f2 | "C" g8 |
"""

SOMBRIO = """
X:7
T:Trono de Ossos
M:4/4
L:1/8
Q:1/4=60
K:Dm
"Dm" D4 F4 | "Bb" F4 E4 | "Gm" D4 ^C4 | "A" D8 |
"Dm" A4 G4 | "Bb" F4 E4 | "Gm" G4 ^G4 | "A" A8 |
"""

# ---------------------------------------------------------------- parser ABC
NOTA_BASE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
ARMADURAS = {  # notas alteradas por tonalidade
    "C": {}, "G": {"F": 1}, "D": {"F": 1, "C": 1}, "A": {"F": 1, "C": 1, "G": 1},
    "Em": {"F": 1}, "Dm": {"B": -1}, "F": {"B": -1}, "Am": {},
}
ACORDE_TIPO = {"": [0, 4, 7], "m": [0, 3, 7], "7": [0, 4, 7, 10], "dim": [0, 3, 6]}


def _frac(txt, padrao=1.0):
    if not txt:
        return padrao
    if "/" in txt:
        a, b = txt.split("/")
        a = float(a) if a else 1.0
        b = float(b) if b else 2.0
        return a / b
    return float(txt)


def parse_abc(abc):
    cab = {}
    corpo = []
    for linha in abc.strip().splitlines():
        m = re.match(r"^([A-Z]):(.*)$", linha.strip())
        if m and len(linha.strip()) > 1 and linha.strip()[1] == ":":
            cab[m.group(1)] = m.group(2).strip()
        else:
            corpo.append(linha)
    L = _frac(cab.get("L", "1/8"))
    q = cab.get("Q", "1/4=120")
    qa, qn = q.split("=")
    seg_semibreve = 60.0 / float(qn) / _frac(qa)
    unid = L * seg_semibreve
    m = cab.get("M", "4/4")
    compasso = _frac(m) / L  # unidades por compasso
    tom = cab.get("K", "C")
    arm = ARMADURAS.get(tom, {})

    notas, acordes = [], []
    t = 0.0
    txt = " ".join(corpo)
    tok = re.compile(r'"([^"]+)"|(\^|_|=)?([A-Ga-gz])([,\']*)(\d*/?\d*)|(\|\]|\||:)')
    for mt in tok.finditer(txt):
        if mt.group(1):
            nome = mt.group(1)
            raiz = NOTA_BASE[nome[0]]
            resto = nome[1:]
            if resto.startswith("b"):
                raiz -= 1
                resto = resto[1:]
            elif resto.startswith("#"):
                raiz += 1
                resto = resto[1:]
            acordes.append((t, raiz % 12, ACORDE_TIPO.get(resto, [0, 4, 7])))
            continue
        if mt.group(6):
            continue
        acid, letra, oit, dur = mt.group(2), mt.group(3), mt.group(4), mt.group(5)
        d = _frac(dur)
        if letra == "z":
            t += d
            continue
        n = NOTA_BASE[letra.upper()]
        if acid == "^":
            n += 1
        elif acid == "_":
            n -= 1
        elif acid != "=":
            n += arm.get(letra.upper(), 0)
        midi = 60 + n + (12 if letra.islower() else 0)
        midi += 12 * oit.count("'") - 12 * oit.count(",")
        notas.append((t, d, midi))
        t += d
    total = round(t / compasso) * compasso
    return {"unid": unid, "compasso": compasso, "notas": notas,
            "acordes": acordes, "total": total}


# ---------------------------------------------------------------- síntese
def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def env(n, a, d, s, r):
    e = np.ones(n) * s
    a, d, r = int(a * SR), int(d * SR), int(r * SR)
    a = min(a, n)
    e[:a] = np.linspace(0, 1, a, endpoint=False) if a else e[:a]
    d2 = min(d, n - a)
    if d2 > 0:
        e[a:a + d2] = np.linspace(1, s, d2)
    r = min(r, n)
    if r:
        e[-r:] *= np.linspace(1, 0, r)
    return e


def osc(freq, n, tipo, vib=0.0):
    t = np.arange(n) / SR
    f = freq * (1 + vib * np.sin(2 * np.pi * 5.2 * t) * np.clip(t * 2, 0, 1))
    fase = 2 * np.pi * np.cumsum(f) / SR
    if tipo == "flauta":
        return np.sin(fase) + 0.25 * np.sin(2 * fase) + 0.08 * np.sin(3 * fase)
    if tipo == "metal":  # trompas/cordas: serrote suave
        return sum(np.sin(k * fase) / k ** 1.1 for k in range(1, 9))
    if tipo == "sino":
        return np.sin(fase) * np.exp(-t * 3) + 0.4 * np.sin(2.76 * fase) * np.exp(-t * 6)
    if tipo == "corda":  # dedilhado (alaúde)
        return sum(np.sin(k * fase) * np.exp(-t * (2 + k)) / k for k in range(1, 7))
    if tipo == "pad":
        return sum(np.sin(k * fase) / k ** 1.6 for k in range(1, 6))
    return np.sin(fase)


def reverb(x, tempo=1.6, mix=0.25, seed=3):
    rng = np.random.default_rng(seed)
    n = int(tempo * SR)
    ir = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 6.9 / tempo)
    ir[:int(0.02 * SR)] = 0
    ir /= np.sqrt((ir ** 2).sum())
    N = 1 << int(np.ceil(np.log2(len(x) + n)))
    w = np.fft.irfft(np.fft.rfft(x, N) * np.fft.rfft(ir, N), N)[:len(x)]
    return x * (1 - mix) + w * mix * 1.2


def bumbo(n=0.35):
    k = int(n * SR)
    t = np.arange(k) / SR
    f = 50 + 110 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)


def caixa(n=0.25, seed=1):
    k = int(n * SR)
    t = np.arange(k) / SR
    r = np.random.default_rng(seed).standard_normal(k)
    return (0.6 * r * np.exp(-t * 18) + 0.5 * np.sin(2 * np.pi * 190 * t) * np.exp(-t * 25))


def chimbal(n=0.06, seed=2):
    k = int(n * SR)
    r = np.random.default_rng(seed).standard_normal(k)
    r = np.diff(r, prepend=0)
    return r * np.exp(-np.arange(k) / SR * 60) * 0.35


def tambor_guerra(n=0.6):
    k = int(n * SR)
    t = np.arange(k) / SR
    f = 70 + 40 * np.exp(-t * 12)
    r = np.random.default_rng(5).standard_normal(k) * np.exp(-t * 20) * 0.3
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) + r) * np.exp(-t * 5)


def colocar(buf, som, pos, vol=1.0):
    i = int(pos * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(som))
    buf[i:j] += som[:j - i] * vol


def render(abc, lead="metal", estilo="epico", voltas=2, oitava_lead=0):
    p = parse_abc(abc)
    u = p["unid"]
    dur_volta = p["total"] * u
    tot = dur_volta * voltas
    buf_lead = np.zeros(int((tot + 3) * SR))
    buf_harm = np.zeros_like(buf_lead)
    buf_bat = np.zeros_like(buf_lead)
    comp_seg = p["compasso"] * u
    acordes = p["acordes"]
    for v in range(voltas):
        base = v * dur_volta
        # melodia
        for (t, d, m) in p["notas"]:
            n = int((d * u + 0.15) * SR)
            o = osc(hz(m + oitava_lead), n, lead, vib=0.006 if lead != "sino" else 0)
            if lead == "corda":
                e = env(n, 0.005, 0.1, 0.6, 0.08)
            elif lead == "sino":
                e = env(n, 0.002, 0.2, 0.4, 0.1)
            else:
                e = env(n, 0.03, 0.12, 0.75, 0.12)
            colocar(buf_lead, o * e, base + t * u, 0.22)
        # harmonia
        for idx, (t, raiz, tipo) in enumerate(acordes):
            fim = acordes[idx + 1][0] if idx + 1 < len(acordes) else p["total"]
            dseg = (fim - t) * u
            n = int((dseg + 0.4) * SR)
            pad = np.zeros(n)
            for iv in tipo[:3]:
                for det in (-0.004, 0.004):
                    pad += osc(hz(48 + raiz + iv) * (1 + det), n, "pad")
            pad *= env(n, 0.25 if estilo != "batalha" else 0.05, 0.3, 0.8, 0.4)
            colocar(buf_harm, pad, base + t * u, 0.045)
            # baixo
            pulsos = {"epico": 1, "batalha": 0.5, "calmo": 3, "taverna": 3,
                      "balada": 2, "sombrio": 4, "fanfarra": 1}[estilo]
            nb = int(pulsos * 2 * u * SR * 0.95) if estilo not in ("calmo", "taverna") else int(dseg * SR)
            tt = t
            while tt < fim - 1e-6:
                b = osc(hz(36 + raiz), nb, "metal") * env(nb, 0.01, 0.1, 0.7, 0.08)
                colocar(buf_harm, b, base + tt * u, 0.09 if estilo != "batalha" else 0.11)
                tt += pulsos * 2 if estilo not in ("calmo", "taverna") else 99
            # arpejo
            if estilo in ("calmo", "balada", "taverna"):
                passo = 1 if estilo != "balada" else 1
                notas_arp = [48 + raiz + tipo[0], 48 + raiz + tipo[1], 48 + raiz + tipo[2], 60 + raiz]
                k = 0
                tt = t
                while tt < fim - 1e-6:
                    m = notas_arp[k % 4] + 12
                    na = int(0.6 * SR)
                    a = osc(hz(m), na, "corda") * env(na, 0.003, 0.1, 0.5, 0.2)
                    colocar(buf_harm, a, base + tt * u, 0.06)
                    tt += passo
                    k += 1
        # bateria
        nc = int(round(p["total"] / p["compasso"]))
        for c in range(nc):
            c0 = base + c * comp_seg
            if estilo == "epico":
                for b in range(4):
                    bt = c0 + b * comp_seg / 4
                    colocar(buf_bat, bumbo(), bt, 0.5 if b % 2 == 0 else 0.25)
                    if b % 2 == 1:
                        colocar(buf_bat, caixa(), bt, 0.35)
                    colocar(buf_bat, chimbal(), bt + comp_seg / 8, 0.5)
                if c % 4 == 3:
                    colocar(buf_bat, tambor_guerra(), c0 + comp_seg * 0.75, 0.5)
            elif estilo == "batalha":
                for b in range(8):
                    bt = c0 + b * comp_seg / 8
                    if b in (0, 3, 4, 6):
                        colocar(buf_bat, bumbo(), bt, 0.55)
                    if b in (2, 6):
                        colocar(buf_bat, caixa(), bt, 0.4)
                    colocar(buf_bat, chimbal(), bt, 0.45)
                if c % 2 == 1:
                    colocar(buf_bat, tambor_guerra(), c0 + comp_seg * 0.875, 0.55)
            elif estilo == "taverna":
                for b in range(2):
                    colocar(buf_bat, tambor_guerra(0.3), c0 + b * comp_seg / 2, 0.25)
                    colocar(buf_bat, chimbal(), c0 + b * comp_seg / 2 + comp_seg / 3, 0.4)
            elif estilo == "sombrio":
                colocar(buf_bat, tambor_guerra(1.2), c0, 0.45)
            elif estilo == "fanfarra":
                colocar(buf_bat, tambor_guerra(), c0, 0.5)
                colocar(buf_bat, caixa(), c0 + comp_seg / 2, 0.3)
    mix = reverb(buf_lead, 1.8, 0.3) + reverb(buf_harm, 2.2, 0.35) + buf_bat
    if estilo == "sombrio":  # drone grave
        n = len(mix)
        t = np.arange(n) / SR
        mix += 0.05 * np.sin(2 * np.pi * 36.7 * t) * (1 + 0.3 * np.sin(2 * np.pi * 0.1 * t))
        mix += 0.02 * np.sin(2 * np.pi * 55.0 * 1.06 * t)
    mix = mix[:int((tot + 2.5) * SR)]
    mix /= max(1e-6, np.abs(mix).max()) / 0.85
    return mix.astype(np.float32), dur_volta


def salvar(caminho, x):
    x = np.clip(x, -1, 1)
    with wave.open(str(caminho), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


FAIXAS = {
    "abertura": (ABERTURA, "metal", "epico", 2, 0),
    "calmo": (CALMO, "flauta", "calmo", 3, 12),
    "batalha": (BATALHA, "metal", "batalha", 3, 0),
    "encerramento": (ENCERRAMENTO, "flauta", "balada", 2, 12),
    "taverna": (TAVERNA, "corda", "taverna", 3, 0),
    "vitoria": (VITORIA, "metal", "fanfarra", 1, 0),
    "sombrio": (SOMBRIO, "pad", "sombrio", 3, -12),
}

if __name__ == "__main__":
    saida = Path(sys.argv[1] if len(sys.argv) > 1 else "audio")
    saida.mkdir(parents=True, exist_ok=True)
    so = sys.argv[2:] or list(FAIXAS)
    for nome in so:
        abc, lead, est, voltas, oit = FAIXAS[nome]
        x, dv = render(abc, lead, est, voltas, oit)
        salvar(saida / f"{nome}.wav", x)
        print(f"{nome}: {len(x) / SR:.1f}s (volta {dv:.1f}s)")
