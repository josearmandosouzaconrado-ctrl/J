#!/usr/bin/env python3
"""Compila o Nexo IA como app Android nativo (Java + WebView) com as ferramentas oficiais do Android SDK.

O app nativo adiciona o que o WebView sozinho não consegue:
  - voz de verdade (reconhecimento e fala do Android)
  - bolha flutuante por cima dos outros apps que atende quando você fala o nome do assistente
  - lista e abre os apps e jogos instalados

Baixa sozinho (uma vez) a plataforma Android 34 e o build-tools 34 de dl.google.com.
Uso: python3 android/build_nexo_nativo.py   ->  NexoIA.apk
"""
import io
import json
import os
import shutil
import subprocess
import sys
import urllib.request
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJ = os.path.join(ROOT, 'android', 'nexo')
WWW = os.path.join(ROOT, 'ia')
OUT = os.path.join(ROOT, 'NexoIA.apk')
SDK = os.environ.get('NEXO_SDK') or os.path.join(os.path.expanduser('~'), '.cache', 'nexo-android-sdk')
TMP = os.path.join(PROJ, 'build')
ASSINATURA = os.path.join(ROOT, 'android', 'signing_nexo')
R8 = '8.13.25'
PACOTES = {
    'plat': ('https://dl.google.com/android/repository/platform-34-ext7_r03.zip', 'android-34'),
    'bt': ('https://dl.google.com/android/repository/build-tools_r34-linux.zip', 'android-14'),
}


def sh(*cmd, **kw):
    print('$', ' '.join(str(c) for c in cmd)[:220])
    subprocess.run([str(c) for c in cmd], check=True, **kw)


def garantir_sdk():
    for nome, (url, pasta) in PACOTES.items():
        destino = os.path.join(SDK, nome)
        if os.path.isdir(os.path.join(destino, pasta)):
            continue
        print('Baixando', url)
        os.makedirs(destino, exist_ok=True)
        dados = urllib.request.urlopen(url, timeout=600).read()
        with zipfile.ZipFile(io.BytesIO(dados)) as z:
            for info in z.infolist():
                z.extract(info, destino)
                modo = info.external_attr >> 16
                if modo:
                    os.chmod(os.path.join(destino, info.filename), modo)
    # o d8 do build-tools 34 falha com classes do Java 21; usa o R8/D8 mais novo do Maven do Google
    r8 = os.path.join(SDK, 'r8-' + R8 + '.jar')
    if not os.path.exists(r8):
        print('Baixando R8', R8)
        open(r8, 'wb').write(urllib.request.urlopen(f'https://dl.google.com/android/maven2/com/android/tools/r8/{R8}/r8-{R8}.jar', timeout=600).read())
    plat = os.path.join(SDK, 'plat', 'android-34')
    bt = os.path.join(SDK, 'bt', 'android-14')
    return plat, bt, r8


def versao():
    t = open(os.path.join(WWW, 'novidades.js'), encoding='utf-8').read()
    v = json.loads(t[t.index('['):t.rindex(']') + 1])[0]
    return v['codigo'], v['versao']


def main():
    plat, bt, r8 = garantir_sdk()
    android_jar = os.path.join(plat, 'android.jar')
    codigo, nome_versao = versao()
    if os.path.isdir(TMP):
        shutil.rmtree(TMP)
    for d in ('res/drawable', 'assets', 'classes', 'dex'):
        os.makedirs(os.path.join(TMP, d))
    shutil.copy(os.path.join(WWW, 'icon-192.png'), os.path.join(TMP, 'res', 'drawable', 'icon.png'))
    for nome in sorted(os.listdir(WWW)):
        if nome in ('LEIAME.md', 'icon-512.png') or nome.startswith('.'):
            continue
        shutil.copy(os.path.join(WWW, nome), os.path.join(TMP, 'assets', nome))

    # recursos + manifesto
    sh(os.path.join(bt, 'aapt2'), 'compile', '-o', os.path.join(TMP, 'res.zip'), '--dir', os.path.join(TMP, 'res'))
    sh(os.path.join(bt, 'aapt2'), 'link', '-I', android_jar, '--manifest', os.path.join(PROJ, 'AndroidManifest.xml'),
       '--min-sdk-version', '24', '--target-sdk-version', '34', '--version-code', codigo, '--version-name', nome_versao,
       '-A', os.path.join(TMP, 'assets'), '-o', os.path.join(TMP, 'base.apk'), os.path.join(TMP, 'res.zip'))

    # Java -> .class -> classes.dex
    fontes = []
    for d, _, fs in os.walk(os.path.join(PROJ, 'java')):
        fontes += [os.path.join(d, f) for f in fs if f.endswith('.java')]
    sh('javac', '-nowarn', '-Xlint:-options', '-source', '8', '-target', '8', '-encoding', 'UTF-8',
       '-bootclasspath', android_jar + os.pathsep + os.path.join(bt, 'core-lambda-stubs.jar'), '-classpath', android_jar, '-d', os.path.join(TMP, 'classes'), *fontes)
    classes = []
    for d, _, fs in os.walk(os.path.join(TMP, 'classes')):
        classes += [os.path.join(d, f) for f in fs if f.endswith('.class')]
    sh('java', '-cp', r8, 'com.android.tools.r8.D8', '--release', '--min-api', '24',
       '--lib', android_jar, '--output', os.path.join(TMP, 'dex'), *classes)

    # junta, alinha e assina com a mesma chave das versões anteriores (instala por cima)
    with zipfile.ZipFile(os.path.join(TMP, 'base.apk'), 'a') as z:
        z.write(os.path.join(TMP, 'dex', 'classes.dex'), 'classes.dex')
    sh(os.path.join(bt, 'zipalign'), '-f', '-p', '4', os.path.join(TMP, 'base.apk'), os.path.join(TMP, 'alinhado.apk'))
    chave_der = os.path.join(TMP, 'chave.pk8')
    from cryptography.hazmat.primitives import serialization
    chave = serialization.load_pem_private_key(open(os.path.join(ASSINATURA, 'key.pem'), 'rb').read(), None)
    open(chave_der, 'wb').write(chave.private_bytes(serialization.Encoding.DER, serialization.PrivateFormat.PKCS8, serialization.NoEncryption()))
    sh('java', '-jar', os.path.join(bt, 'lib', 'apksigner.jar'), 'sign', '--key', chave_der, '--cert', os.path.join(ASSINATURA, 'cert.pem'),
       '--min-sdk-version', '24', '--v4-signing-enabled', 'false', '--out', OUT, os.path.join(TMP, 'alinhado.apk'))
    os.remove(chave_der)
    sh('java', '-jar', os.path.join(bt, 'lib', 'apksigner.jar'), 'verify', '--min-sdk-version', '24', OUT)
    print(f'APK nativo gerado: {OUT} ({os.path.getsize(OUT) // 1024} KB), versão {nome_versao} ({codigo})')


if __name__ == '__main__':
    sys.exit(main())
