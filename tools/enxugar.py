#!/usr/bin/env python3
"""Enxuga o código para o APK sem mudar nada do que o jogo faz.

Tira comentários, a indentação e as linhas em branco dos .js e .css. Não mexe dentro de
textos ('...', "...", `...`) nem de expressões regulares, e mantém as quebras de linha
(para o JavaScript continuar entendendo o fim de cada comando do mesmo jeito).
O código-fonte do projeto continua igual: só a cópia que vai para o APK é enxugada.

Uso para testar:  python3 tools/enxugar.py PASTA_DESTINO   (copia o jogo enxugado para lá)
"""
import os, re, shutil, sys

PALAVRAS_REGEX = {'return', 'typeof', 'case', 'in', 'of', 'new', 'delete', 'void', 'throw', 'instanceof', 'else', 'do', 'yield', 'await'}
ANTES_REGEX = set('(,=:[!&|?{};+-*%<>~^')


def enxugar_js(src):
    out, i, n = [], 0, len(src)
    linha = []            # pedaços da linha atual (fora de textos de várias linhas)
    ultimo = ''           # último caractere significativo (para saber se '/' é divisão ou regex)
    palavra = ''          # última palavra (return, typeof...)
    pilha = []            # dentro de `...${ ... }...`: quantas chaves abertas em cada nível

    def fecha_linha():
        s = ''.join(linha).strip()
        if s: out.append(s)
        linha.clear()

    while i < n:
        c = src[i]
        # comentários
        if c == '/' and i + 1 < n and src[i + 1] == '/':
            while i < n and src[i] != '\n': i += 1
            continue
        if c == '/' and i + 1 < n and src[i + 1] == '*':
            j = src.find('*/', i + 2); j = n if j < 0 else j + 2
            if '\n' in src[i:j]: fecha_linha()
            else: linha.append(' ')
            i = j; continue
        # textos simples
        if c in '\'"':
            j = i + 1
            while j < n and src[j] != c:
                if src[j] == '\\': j += 1
                elif src[j] == '\n': break
                j += 1
            linha.append(src[i:j + 1]); i = j + 1; ultimo = c; palavra = ''; continue
        # texto com crase (pode ter várias linhas e ${ ... })
        if c == '`' or (c == '}' and pilha and pilha[-1] == 0):
            if c == '}': pilha.pop()
            j = i + 1
            while j < n:
                if src[j] == '\\': j += 2; continue
                if src[j] == '`': break
                if src[j] == '$' and j + 1 < n and src[j + 1] == '{': break
                j += 1
            if j < n and src[j] == '$':
                linha.append(src[i:j + 2]); i = j + 2; pilha.append(0); ultimo = '{'
            else:
                linha.append(src[i:j + 1]); i = j + 1; ultimo = '`'
            palavra = ''; continue
        if pilha:
            if c == '{': pilha[-1] += 1
            elif c == '}': pilha[-1] -= 1
        # expressão regular
        if c == '/' and (ultimo == '' or ultimo in ANTES_REGEX or palavra in PALAVRAS_REGEX):
            j, classe = i + 1, False
            while j < n:
                d = src[j]
                if d == '\\': j += 2; continue
                if d == '[': classe = True
                elif d == ']': classe = False
                elif d == '/' and not classe: break
                elif d == '\n': break
                j += 1
            j += 1
            while j < n and (src[j].isalnum()): j += 1   # flags
            linha.append(src[i:j]); i = j; ultimo = '/r'; palavra = ''; continue
        if c == '\n':
            fecha_linha(); i += 1; continue
        if c in ' \t\r':
            # espaços seguidos viram um só
            if linha and linha[-1] != ' ': linha.append(' ')
            i += 1; continue
        linha.append(c)
        if c.isalnum() or c in '_$':
            palavra = (palavra + c) if (ultimo and (ultimo.isalnum() or ultimo in '_$')) else c
        else:
            palavra = ''
        ultimo = c
        i += 1
    fecha_linha()
    return '\n'.join(out) + '\n'


def enxugar_css(src):
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
    linhas = [l.strip() for l in src.split('\n')]
    return '\n'.join(l for l in linhas if l) + '\n'


def enxugar(nome, dados):
    if nome.endswith('.js'):
        return enxugar_js(dados.decode('utf-8')).encode('utf-8')
    if nome.endswith('.css'):
        return enxugar_css(dados.decode('utf-8')).encode('utf-8')
    return dados


if __name__ == '__main__':
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dest = sys.argv[1]
    if os.path.exists(dest): shutil.rmtree(dest)
    for pasta in ['css', 'js', 'icons', 'img']:
        for base, _, arqs in os.walk(os.path.join(raiz, pasta)):
            for a in arqs:
                o = os.path.join(base, a); rel = os.path.relpath(o, raiz); d = os.path.join(dest, rel)
                os.makedirs(os.path.dirname(d), exist_ok=True)
                open(d, 'wb').write(enxugar(a, open(o, 'rb').read()))
    for a in ['index.html', 'manifest.json', 'sw.js']:
        shutil.copy(os.path.join(raiz, a), os.path.join(dest, a))
    antes = sum(os.path.getsize(os.path.join(b, f)) for p in ['js', 'css'] for b, _, fs in os.walk(os.path.join(raiz, p)) for f in fs)
    depois = sum(os.path.getsize(os.path.join(b, f)) for p in ['js', 'css'] for b, _, fs in os.walk(os.path.join(dest, p)) for f in fs)
    print(f'js+css: {antes // 1024} KB -> {depois // 1024} KB')
