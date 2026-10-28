#!/usr/bin/env python3
"""Gera js/imgdata.js com as imagens de img/ embutidas (data URI).

No APK o jogo abre direto do aparelho (file://) e o Android trata cada arquivo como
outra origem: uma imagem carregada de arquivo "suja" o canvas, e ler os pixels dela
(getImageData/toDataURL, usados para recolorir sprites e fazer retratos) dá erro.
Imagens em data URI não têm esse problema. Rode de novo sempre que mudar algo em img/.
"""
import base64, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = ["'use strict';", '// gerado por tools/gerar_imgdata.py: imagens embutidas (ver o comentário do script)', 'const IMG_DATA = {']
for name in sorted(os.listdir(os.path.join(ROOT, 'img'))):
    if not name.endswith('.png'): continue
    data = base64.b64encode(open(os.path.join(ROOT, 'img', name), 'rb').read()).decode()
    out.append(f"  'img/{name}': 'data:image/png;base64,{data}',")
out.append('};')
out.append("function imgSrc(path) { return IMG_DATA[path] || path; }")
open(os.path.join(ROOT, 'js', 'imgdata.js'), 'w').write('\n'.join(out) + '\n')
print('js/imgdata.js gerado')
