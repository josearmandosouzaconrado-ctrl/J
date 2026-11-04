#!/usr/bin/env python3
"""Pacote do código para o APK: todos os scripts do jogo num só arquivo comprimido com LZMA.

O LZMA comprime o código bem mais que o deflate do ZIP/APK. O pacote (js/pacote.js) leva os
scripts comprimidos em base64 e um descompactador pequeno (tools/unlzma.js). Quando o jogo abre,
cada script é descompactado e executado na mesma ordem do index.html, um por um, como se tivesse
vindo do seu próprio arquivo. O jogo é exatamente o mesmo; só o APK fica menor.
"""
import base64, json, lzma, os, re

AQUI = os.path.dirname(os.path.abspath(__file__))
TAG = re.compile(r'<script src="(js/[^"]+)"></script>\n?')


def scripts_do_index(html):
    return TAG.findall(html)


def index_com_pacote(html):
    """Troca as tags dos scripts por uma só, no lugar da primeira."""
    primeiro = [True]

    def troca(m):
        if primeiro[0]:
            primeiro[0] = False
            return '<script src="js/pacote.js"></script>\n'
        return ''
    return TAG.sub(troca, html)


def comprimir(dados):
    filtros = [{'id': lzma.FILTER_LZMA1, 'preset': 9 | lzma.PRESET_EXTREME, 'dict_size': 1 << 22, 'lc': 3, 'lp': 0, 'pb': 0, 'nice_len': 273}]
    return lzma.compress(dados, format=lzma.FORMAT_ALONE, filters=filtros)


def pacote_js(arquivos, enxugar_js):
    """arquivos: lista de (nome, bytes) na ordem do index.html."""
    blob = b''.join(d for _, d in arquivos)
    tam = [len(d) for _, d in arquivos]
    nomes = [n for n, _ in arquivos]
    dec = enxugar_js(open(os.path.join(AQUI, 'unlzma.js'), encoding='utf-8').read())
    b64 = base64.b64encode(comprimir(blob)).decode('ascii')
    return (
        "'use strict';\n" + dec +
        "(function () {\n"
        f"const N = {json.dumps(nomes)}, T = {json.dumps(tam)}, Z = {len(blob)};\n"
        f"const B = '{b64}';\n"
        "const s = atob(B), u = new Uint8Array(s.length);\n"
        "for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);\n"
        "const o = unlzma(u, Z), td = new TextDecoder('utf-8');\n"
        "let p = 0;\n"
        "for (let i = 0; i < N.length; i++) {\n"
        "const e = document.createElement('script');\n"
        "e.text = td.decode(o.subarray(p, p + T[i])) + '\\n//# sourceURL=' + N[i];\n"
        "p += T[i];\n"
        "document.head.appendChild(e);\n"
        "}\n"
        "})();\n"
    ).encode('utf-8')
