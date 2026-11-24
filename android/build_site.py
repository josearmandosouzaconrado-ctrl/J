#!/usr/bin/env python3
"""Gera o site do Nexo IA em docs/ (para o GitHub Pages) a partir de ia/.

No site o Nexo roda no Google Chrome, sem instalar nada, e ganha o que o APK não tem:
reconhecimento de voz (modo assistente) e "Adicionar à tela inicial" (PWA).
Uso: python3 android/build_site.py
"""
import json
import os
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'ia')
OUT = os.path.join(ROOT, 'docs')


def main():
    t = open(os.path.join(SRC, 'novidades.js'), encoding='utf-8').read()
    versao = json.loads(t[t.index('['):t.rindex(']') + 1])[0]
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)
    arquivos = []
    for nome in sorted(os.listdir(SRC)):
        if nome.startswith('.') or nome == 'LEIAME.md':
            continue
        shutil.copy2(os.path.join(SRC, nome), os.path.join(OUT, nome))
        arquivos.append(nome)
    manifesto = {
        'name': 'Nexo IA', 'short_name': 'Nexo', 'lang': 'pt-BR', 'start_url': './', 'scope': './',
        'display': 'standalone', 'orientation': 'portrait', 'background_color': '#0d0f14', 'theme_color': '#0d0f14',
        'description': 'Assistente de IA com voz, animes e criador de jogos',
        'icons': [{'src': 'icon-192.png', 'sizes': '192x192', 'type': 'image/png', 'purpose': 'any'},
                  {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any'}],
    }
    open(os.path.join(OUT, 'manifest.webmanifest'), 'w', encoding='utf-8').write(json.dumps(manifesto, ensure_ascii=False, indent=1))
    # service worker: busca a versão nova primeiro e usa a guardada quando estiver sem internet
    lista = ['./'] + [a for a in arquivos if a != 'wllama.wasm']
    sw = f"""const CACHE = 'nexo-{versao['codigo']}';
const ARQUIVOS = {json.dumps(lista)};
self.addEventListener('install', e => {{ e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())); }});
self.addEventListener('activate', e => {{ e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); }});
self.addEventListener('fetch', e => {{
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (u.pathname.endsWith('.wasm')) {{
    e.respondWith(caches.open(CACHE).then(c => c.match(e.request).then(r => r || fetch(e.request).then(n => {{ c.put(e.request, n.clone()); return n; }}))));
    return;
  }}
  e.respondWith(fetch(e.request).then(n => {{ const copia = n.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return n; }}).catch(() => caches.match(e.request)));
}});
"""
    open(os.path.join(OUT, 'sw.js'), 'w', encoding='utf-8').write(sw)
    html = open(os.path.join(OUT, 'index.html'), encoding='utf-8').read()
    html = html.replace('<link rel="icon" href="icon-192.png">',
                        '<link rel="icon" href="icon-192.png">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icon-192.png">')
    html = html.replace('</body>', "<script>if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});</script>\n</body>")
    open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(html)
    open(os.path.join(OUT, '.nojekyll'), 'w').close()
    print(f'Site gerado em {OUT} (versão {versao["versao"]}, {len(arquivos)} arquivos)')


if __name__ == '__main__':
    main()
