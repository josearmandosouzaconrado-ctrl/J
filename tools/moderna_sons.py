"""Sintetiza os efeitos sonoros da Guerra Moderna (tiros, canhão, explosões, motor...).

Nenhum áudio de terceiros: tudo é gerado com ruído filtrado, osciladores e ecos.
Uso: python3 tools/moderna_sons.py   (requer numpy e ffmpeg com libvorbis)
"""
import os
import subprocess
import tempfile
import wave

import numpy as np

SR = 44100
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESTINO = os.path.join(RAIZ, "Moderna_RP", "sounds", "gm")
rng = np.random.default_rng(7)


def t(seg):
    return np.arange(int(SR * seg)) / SR


def ruido(seg):
    return rng.uniform(-1, 1, int(SR * seg))


def passa_baixa_rapido(x, corte):
    """Passa-baixa de 2 polos: convolução com um núcleo exponencial truncado."""
    a = np.exp(-2 * np.pi * corte / SR)
    n = min(len(x), int(SR * 0.05))
    k = (1 - a) * a ** np.arange(n)
    y = np.convolve(x, k)[: len(x)]
    return np.convolve(y, k)[: len(x)]


def passa_alta(x, corte):
    return x - passa_baixa_rapido(x, corte)


def envelope(n, ataque, decaimento):
    e = np.ones(n)
    na = max(1, int(SR * ataque))
    e[:na] = np.linspace(0, 1, na)
    e[na:] = np.exp(-np.arange(n - na) / (SR * decaimento))
    return e


def eco(x, atraso, ganho, vezes=3):
    out = np.concatenate([x, np.zeros(int(SR * atraso * vezes))])
    for k in range(1, vezes + 1):
        d = int(SR * atraso * k)
        out[d : d + len(x)] += x * (ganho ** k)
    return out


def reverb(x, tam=0.6, mistura=0.35):
    n = int(SR * tam)
    ir = rng.uniform(-1, 1, n) * np.exp(-np.arange(n) / (SR * tam / 5))
    ir = passa_baixa_rapido(ir, 3000)
    molhado = np.convolve(x, ir)
    seco = np.concatenate([x, np.zeros(len(molhado) - len(x))])
    molhado /= np.max(np.abs(molhado)) + 1e-9
    return seco * (1 - mistura) + molhado * mistura * np.max(np.abs(x))


def normalizar(x, pico=0.92):
    return x / (np.max(np.abs(x)) + 1e-9) * pico


def tiro(corte_estalo=6000, grave=110, cauda=0.35, peso=1.0, dur=0.6):
    n = int(SR * dur)
    estalo = passa_alta(ruido(dur), 900) * envelope(n, 0.0005, 0.012)
    corpo = passa_baixa_rapido(ruido(dur), corte_estalo) * envelope(n, 0.001, 0.05) * 0.8
    tt = t(dur)
    freq = grave * (1 + 1.5 * np.exp(-tt * 40))
    soco = np.sin(2 * np.pi * np.cumsum(freq) / SR) * envelope(n, 0.001, 0.08) * peso
    cauda_r = passa_baixa_rapido(ruido(dur), 1200) * envelope(n, 0.02, cauda) * 0.35
    return normalizar(estalo * 1.2 + corpo + soco + cauda_r)


def canhao():
    dur = 2.4
    n = int(SR * dur)
    tt = t(dur)
    freq = 38 + 60 * np.exp(-tt * 9)
    boom = np.sin(2 * np.pi * np.cumsum(freq) / SR) * envelope(n, 0.002, 0.45) * 1.4
    estalo = passa_alta(ruido(dur), 500) * envelope(n, 0.0005, 0.03)
    estrondo = passa_baixa_rapido(ruido(dur), 400) * envelope(n, 0.01, 0.7) * 1.2
    return normalizar(reverb(boom + estalo + estrondo, 1.0, 0.3))


def explosao():
    dur = 3.0
    n = int(SR * dur)
    tt = t(dur)
    freq = 30 + 45 * np.exp(-tt * 5)
    boom = np.sin(2 * np.pi * np.cumsum(freq) / SR) * envelope(n, 0.003, 0.6)
    ronco = passa_baixa_rapido(ruido(dur), 250) * envelope(n, 0.005, 0.9) * 2.0
    estalos = passa_alta(ruido(dur), 2000) * (rng.random(n) > 0.9993) * envelope(n, 0.05, 0.6) * 6
    detritos = passa_alta(ruido(dur), 3000) * envelope(n, 0.1, 0.5) * 0.15
    return normalizar(reverb(boom + ronco + estalos + detritos, 1.2, 0.25))


def foguete():
    dur = 1.1
    n = int(SR * dur)
    tt = t(dur)
    disparo = tiro(4000, 90, 0.2, 0.7, dur)
    sibilo = passa_alta(ruido(dur), 1500) * np.clip(tt * 4, 0, 1) * np.exp(-tt * 2.2) * 0.6
    return normalizar(disparo + sibilo)


def recarga():
    dur = 0.9
    out = np.zeros(int(SR * dur))
    for inicio, f, ganho in ((0.05, 2600, 0.8), (0.12, 1900, 0.6), (0.55, 3100, 1.0), (0.62, 2300, 0.7)):
        seg = 0.06
        n = int(SR * seg)
        clique = passa_alta(ruido(seg), 1500) * envelope(n, 0.0003, 0.006)
        tom = np.sin(2 * np.pi * f * t(seg)) * envelope(n, 0.0003, 0.015) * 0.5
        i = int(SR * inicio)
        out[i : i + n] += (clique + tom) * ganho
    return normalizar(out, 0.8)


def motor():
    dur = 2.0  # loop
    tt = t(dur)
    base = 32
    sinal = np.zeros_like(tt)
    for h, g in ((1, 1.0), (2, 0.6), (3, 0.35), (4, 0.2), (6, 0.1)):
        sinal += g * np.sin(2 * np.pi * base * h * tt)
    pulso = 0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 8 * tt))  # pulsos do diesel
    rugido = passa_baixa_rapido(ruido(dur), 300) * 0.6
    esteira = passa_alta(ruido(dur), 2500) * (0.5 + 0.5 * np.sin(2 * np.pi * 14 * tt)) * 0.08
    x = (sinal * pulso + rugido + esteira)
    # emenda suave para tocar em loop
    f = int(SR * 0.05)
    x[:f] *= np.linspace(0, 1, f)
    x[-f:] *= np.linspace(1, 0, f)
    return normalizar(x, 0.75)


def assobio():
    dur = 1.6
    tt = t(dur)
    freq = 1500 - 900 * (tt / dur) ** 1.3
    s = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.clip(tt * 3, 0, 1) * 0.6
    ar = passa_alta(ruido(dur), 2500) * 0.08 * np.clip(tt * 2, 0, 1)
    return normalizar(s + ar, 0.7)


def impacto():
    dur = 0.25
    n = int(SR * dur)
    tt = t(dur)
    ping = np.sin(2 * np.pi * (2400 - 1500 * tt / dur) * tt) * envelope(n, 0.0005, 0.05) * 0.5
    poeira = passa_alta(ruido(dur), 1200) * envelope(n, 0.0005, 0.02)
    return normalizar(ping + poeira, 0.7)


def radio():
    dur = 0.7
    tt = t(dur)
    bips = np.sin(2 * np.pi * 1400 * tt) * ((tt % 0.2) < 0.08) * 0.5
    chiado = passa_alta(ruido(dur), 2000) * 0.15
    return normalizar(bips + chiado, 0.6)


def salvar_ogg(x, nome, pico=0.95):
    os.makedirs(DESTINO, exist_ok=True)
    x = normalizar(x, pico)
    dados = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        caminho_wav = tmp.name
    with wave.open(caminho_wav, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(dados.tobytes())
    destino = os.path.join(DESTINO, f"{nome}.ogg")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", caminho_wav, "-c:a", "libvorbis", "-q:a", "4", destino], check=True)
    os.remove(caminho_wav)


def main():
    for i in range(3):
        salvar_ogg(reverb(tiro(6000 + i * 800, 105 + i * 10, 0.3), 0.5, 0.25), f"fuzil{i + 1}")
        salvar_ogg(reverb(tiro(5000 + i * 500, 95 + i * 8, 0.25, 1.2, 0.45), 0.4, 0.2), f"metralhadora{i + 1}")
    for i in range(2):
        salvar_ogg(eco(reverb(tiro(7000, 80 + i * 10, 0.6, 1.5, 1.2), 0.9, 0.35), 0.35, 0.35), f"sniper{i + 1}")
        salvar_ogg(canhao(), f"canhao{i + 1}")
        salvar_ogg(explosao(), f"explosao{i + 1}")
        salvar_ogg(impacto(), f"impacto{i + 1}")
    salvar_ogg(foguete(), "foguete")
    salvar_ogg(recarga(), "recarga", 0.8)
    salvar_ogg(motor(), "motor", 0.7)
    salvar_ogg(assobio(), "assobio")
    salvar_ogg(radio(), "radio", 0.6)
    print("Sons gerados em", DESTINO)


if __name__ == "__main__":
    main()
