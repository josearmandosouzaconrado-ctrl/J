#!/usr/bin/env python3
"""Vozes dos NPCs: falas em "língua de personagem" (sílabas sintetizadas), como em jogos de RPG.

Cada tipo de voz tem timbre e altura próprios. Cada fala é uma sequência de sílabas com consoante
(ruído curto) e vogal (formantes de voz humana), com entonação que sobe e desce. No jogo, cada NPC
toca a voz do seu tipo com uma variação de tom só dele.

Gera arquivos .ogg em minecraft/batalha_romana/pacote_recursos/sounds/batalha/ e o
sound_definitions.json correspondente (chamado pelo gerador do add-on).
"""
import io
import os
import random
import subprocess
import wave

import numpy as np

TAXA = 22050
VOGAIS = {  # formantes F1, F2, F3 (Hz)
    'a': (800, 1200, 2500), 'e': (500, 1800, 2500), 'i': (300, 2300, 3000),
    'o': (500, 900, 2400), 'u': (330, 800, 2300),
}
VOZES = {
    # tipo: (frequência base, variação, velocidade das sílabas, brilho)
    'soldado': (108, 0.18, 0.115, 0.55),
    'general': (95, 0.15, 0.13, 0.5),
    'nobre': (215, 0.22, 0.105, 0.8),
    'matrona': (180, 0.18, 0.12, 0.7),
}
FALAS_POR_VOZ = 8


class Rng(random.Random):
    """random.Random com ruído gaussiano em lote (numpy)."""

    def __init__(self, semente):
        super().__init__(semente)
        self._np = np.random.default_rng(semente)

    def standard_normal(self, n):
        return self._np.standard_normal(n)


def silaba(f0, dur, vogal, brilho, rng, consoante=True):
    n = int(TAXA * dur)
    t = np.arange(n) / TAXA
    # entonação: leve subida ou descida dentro da sílaba
    curva = f0 * (1 + rng.uniform(-0.06, 0.06) * t / max(dur, 1e-3))
    fase = 2 * np.pi * np.cumsum(curva) / TAXA
    f1, f2, f3 = VOGAIS[vogal]
    sinal = np.zeros(n)
    for h in range(1, 30):  # harmônicos com peso dos formantes
        fh = f0 * h
        if fh > 4500:
            break
        peso = sum(np.exp(-((fh - f) / (90 + 0.08 * f)) ** 2) * a for f, a in ((f1, 1.0), (f2, 0.7 * brilho), (f3, 0.35 * brilho)))
        sinal += (peso + 0.02 / h) * np.sin(h * fase)
    env = np.minimum(1, t / 0.012) * np.minimum(1, (dur - t) / 0.03)
    sinal *= np.clip(env, 0, 1)
    if consoante:  # pequeno estalo de consoante no começo
        nc = int(TAXA * rng.uniform(0.015, 0.035))
        ruido = rng.standard_normal(nc) * np.linspace(0.5, 0, nc)
        if rng.random() < 0.5:
            ruido = np.convolve(ruido, np.ones(4) / 4, mode='same')
        sinal[:nc] += ruido * 0.6 * np.max(np.abs(sinal) + 1e-9)
    return sinal


def fala(tipo, rng):
    f0, var, vel, brilho = VOZES[tipo]
    partes = []
    n_sil = rng.randint(4, 9)
    pergunta = rng.random() < 0.3
    for k in range(n_sil):
        prog = k / max(1, n_sil - 1)
        tom = f0 * (1 + var * np.sin(prog * np.pi) * rng.uniform(0.3, 1))
        if pergunta and k == n_sil - 1:
            tom *= 1.25
        dur = vel * rng.uniform(0.75, 1.35)
        partes.append(silaba(tom, dur, rng.choice('aeiou'), brilho, rng, consoante=rng.random() < 0.8))
        if rng.random() < 0.18:  # pausa curta entre palavras
            partes.append(np.zeros(int(TAXA * rng.uniform(0.04, 0.09))))
    s = np.concatenate(partes)
    s = s / (np.max(np.abs(s)) + 1e-9) * 0.85
    return (s * 32767).astype(np.int16)


def para_ogg(amostras):
    buf = io.BytesIO()
    with wave.open(buf, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(TAXA)
        w.writeframes(amostras.tobytes())
    r = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-f', 'wav', '-i', 'pipe:0',
                        '-c:a', 'libvorbis', '-q:a', '3', '-f', 'ogg', 'pipe:1'],
                       input=buf.getvalue(), capture_output=True, check=True)
    return r.stdout


def gerar():
    """Devolve ({caminho_relativo: bytes}, sound_definitions)."""
    rng_py = random.Random(2026)
    arquivos, defs = {}, {}
    for tipo in VOZES:
        sons = []
        for i in range(FALAS_POR_VOZ):
            rng = Rng(rng_py.randint(0, 1 << 30))
            nome = f'sounds/batalha/voz_{tipo}_{i}'
            arquivos[nome + '.ogg'] = para_ogg(fala(tipo, rng))
            sons.append({'name': nome, 'volume': 0.9})
        defs[f'batalha.voz.{tipo}'] = {'category': 'neutral', 'max_distance': 20, 'sounds': sons}
    return arquivos, {'format_version': '1.14.0', 'sound_definitions': defs}


if __name__ == '__main__':
    arqs, defs = gerar()
    pasta = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'minecraft', 'batalha_romana', 'amostras_voz')
    os.makedirs(pasta, exist_ok=True)
    for rel, dados in arqs.items():
        if rel.endswith('_0.ogg'):
            with open(os.path.join(pasta, os.path.basename(rel)), 'wb') as f:
                f.write(dados)
    print(len(arqs), 'falas;', sum(len(d) for d in arqs.values()) // 1024, 'KB')
