#!/usr/bin/env python3
"""Gera o APK do Nexo IA (pasta ia/) sem o Android SDK.

Reaproveita as partes genéricas de build_apk.py (XML binário, resources.arsc e
assinatura v2) e escreve uma MainActivity própria para um app de chat:
  - WebView em tela normal (sem modo imersivo), em pé ou deitado
  - teclado empurra a tela (windowSoftInputMode = adjustResize)
  - setAllowUniversalAccessFromFileURLs(true): a página aberta de file:///android_asset
    pode ler qualquer site (Google, YouTube, DuckDuckGo...) sem bloqueio de CORS
  - botão Voltar: volta no histórico da página (fecha painéis); sem histórico, sai do app
  - links clicados abrem fora (YouTube, navegador), pois não há WebViewClient

Uso: python3 android/build_apk_ia.py   ->  NexoIA.apk
"""
import hashlib
import io
import os
import struct
import sys
import zipfile
import zlib

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import build_apk as B  # noqa: E402

ROOT = B.ROOT
WWW = os.path.join(ROOT, 'ia')
OUT = os.path.join(ROOT, 'NexoIA.apk')
PACKAGE = 'com.nexo.ia'
APP_NAME = 'Nexo IA'
# a versão vem de ia/novidades.js (a primeira entrada é a atual)
def _versao():
    import json
    t = open(os.path.join(WWW, 'novidades.js'), encoding='utf-8').read()
    v = json.loads(t[t.index('['):t.rindex(']') + 1])[0]
    return v['codigo'], v['versao']
VERSION_CODE, VERSION_NAME = _versao()
ACTIVITY = PACKAGE + '.MainActivity'
MIN_SDK, TARGET_SDK = 24, 34

# build_arsc e load_key leem estes globais do módulo
B.PACKAGE = PACKAGE
B.SIGN_DIR = 'signing_nexo'
B.CERT_NOME = 'Nexo IA'

uleb, mutf8, align = B.uleb, B.mutf8, B.align

ACT = 'L' + ACTIVITY.replace('.', '/') + ';'
T_ACTIVITY = 'Landroid/app/Activity;'
T_BUNDLE = 'Landroid/os/Bundle;'
T_VIEW = 'Landroid/view/View;'
T_CONTEXT = 'Landroid/content/Context;'
T_WEBVIEW = 'Landroid/webkit/WebView;'
T_SETTINGS = 'Landroid/webkit/WebSettings;'
T_STRING = 'Ljava/lang/String;'
URL_INICIAL = 'file:///android_asset/index.html'
COR_FUNDO = 0xff0d0f14

M = {
    'act_init': (T_ACTIVITY, '<init>', 'V', []),
    'act_onCreate': (T_ACTIVITY, 'onCreate', 'V', [T_BUNDLE]),
    'act_onPause': (T_ACTIVITY, 'onPause', 'V', []),
    'act_onResume': (T_ACTIVITY, 'onResume', 'V', []),
    'act_onBack': (T_ACTIVITY, 'onBackPressed', 'V', []),
    'act_reqFeature': (T_ACTIVITY, 'requestWindowFeature', 'Z', ['I']),
    'act_setContent': (T_ACTIVITY, 'setContentView', 'V', [T_VIEW]),
    'my_init': (ACT, '<init>', 'V', []),
    'my_onCreate': (ACT, 'onCreate', 'V', [T_BUNDLE]),
    'my_onPause': (ACT, 'onPause', 'V', []),
    'my_onResume': (ACT, 'onResume', 'V', []),
    'my_onBack': (ACT, 'onBackPressed', 'V', []),
    'wv_init': (T_WEBVIEW, '<init>', 'V', [T_CONTEXT]),
    'wv_settings': (T_WEBVIEW, 'getSettings', T_SETTINGS, []),
    'wv_load': (T_WEBVIEW, 'loadUrl', 'V', [T_STRING]),
    'wv_pause': (T_WEBVIEW, 'onPause', 'V', []),
    'wv_resume': (T_WEBVIEW, 'onResume', 'V', []),
    'wv_canBack': (T_WEBVIEW, 'canGoBack', 'Z', []),
    'wv_back': (T_WEBVIEW, 'goBack', 'V', []),
    'view_bg': (T_VIEW, 'setBackgroundColor', 'V', ['I']),
    'ws_js': (T_SETTINGS, 'setJavaScriptEnabled', 'V', ['Z']),
    'ws_dom': (T_SETTINGS, 'setDomStorageEnabled', 'V', ['Z']),
    'ws_media': (T_SETTINGS, 'setMediaPlaybackRequiresUserGesture', 'V', ['Z']),
    'ws_universal': (T_SETTINGS, 'setAllowUniversalAccessFromFileURLs', 'V', ['Z']),
    'ws_file': (T_SETTINGS, 'setAllowFileAccess', 'V', ['Z']),
}
F_WEB = (ACT, 'web', T_WEBVIEW)
CONST_STRINGS = [URL_INICIAL]


def build_dex():
    shorty = B.shorty
    strings, types, protos = set(CONST_STRINGS), set(), set()
    for cls, name, ret, params in M.values():
        strings.update([name, shorty(ret, params)])
        types.update([cls, ret] + params)
        protos.add((ret, tuple(params)))
    strings.add(F_WEB[1])
    types.update([F_WEB[0], F_WEB[2]])
    strings.update(types)
    str_list = sorted(strings, key=lambda s: s.encode('utf-16-be'))
    S = {s: i for i, s in enumerate(str_list)}
    type_list = sorted(types, key=lambda t: S[t])
    TY = {t: i for i, t in enumerate(type_list)}
    proto_list = sorted(protos, key=lambda p: (TY[p[0]], [TY[x] for x in p[1]]))
    PR = {p: i for i, p in enumerate(proto_list)}
    meth_list = sorted(M.values(), key=lambda m: (TY[m[0]], S[m[1]], PR[(m[2], tuple(m[3]))]))
    MI = {k: meth_list.index(v) for k, v in M.items()}
    FI = 0

    def invoke(op, mkey, regs):
        a = len(regs)
        r = list(regs) + [0] * (5 - a)
        return [(a << 12) | (r[4] << 8) | op, MI[mkey], (r[3] << 12) | (r[2] << 8) | (r[1] << 4) | r[0]]
    vcall = lambda m, *r: invoke(0x6e, m, r)
    supercall = lambda m, *r: invoke(0x6f, m, r)
    direct = lambda m, *r: invoke(0x70, m, r)
    move_obj = lambda a: [(a << 8) | 0x0c]
    move_res = lambda a: [(a << 8) | 0x0a]
    if_eqz = lambda a, off: [(a << 8) | 0x38, off & 0xffff]
    const4 = lambda a, v: [((v & 0xf) << 12) | (a << 8) | 0x12]
    const32 = lambda a, v: [(a << 8) | 0x14, v & 0xffff, (v >> 16) & 0xffff]
    cstr = lambda a, s: [(a << 8) | 0x1a, S[s]]
    newinst = lambda a, t: [(a << 8) | 0x22, TY[t]]
    iget = lambda a, b: [(b << 12) | (a << 8) | 0x54, FI]
    iput = lambda a, b: [(b << 12) | (a << 8) | 0x5b, FI]
    ret = [0x000e]

    # onCreate: registradores v0..v3 locais, v4 = this, v5 = bundle
    on_create = (
        supercall('act_onCreate', 4, 5) +
        const4(0, 1) + vcall('act_reqFeature', 4, 0) +
        newinst(0, T_WEBVIEW) + direct('wv_init', 0, 4) +
        const32(1, COR_FUNDO) + vcall('view_bg', 0, 1) +
        vcall('wv_settings', 0) + move_obj(1) +
        const4(2, 1) + vcall('ws_js', 1, 2) + vcall('ws_dom', 1, 2) +
        vcall('ws_file', 1, 2) + vcall('ws_universal', 1, 2) +
        const4(3, 0) + vcall('ws_media', 1, 3) +
        iput(0, 4) + vcall('act_setContent', 4, 0) +
        cstr(1, URL_INICIAL) + vcall('wv_load', 0, 1) + ret)
    on_pause = supercall('act_onPause', 1) + iget(0, 1) + vcall('wv_pause', 0) + ret
    on_resume = supercall('act_onResume', 1) + iget(0, 1) + vcall('wv_resume', 0) + ret
    # onBackPressed: if (web.canGoBack()) web.goBack(); else super.onBackPressed();
    #   0: iget v0        (2)
    #   2: canGoBack      (3)
    #   5: move-result v1 (1)
    #   6: if-eqz v1, +6  (2)  -> 12
    #   8: goBack         (3)
    #  11: return-void    (1)
    #  12: super.onBack   (3)
    #  15: return-void    (1)
    on_back = (iget(0, 2) + vcall('wv_canBack', 0) + move_res(1) + if_eqz(1, 6) +
               vcall('wv_back', 0) + ret + supercall('act_onBack', 2) + ret)
    assert len(iget(0, 2) + vcall('wv_canBack', 0) + move_res(1)) == 6
    init = direct('act_init', 0) + ret
    methods = {
        'my_init': (0x10001, 1, 1, 1, init),           # public constructor
        'my_onCreate': (0x0004, 6, 2, 2, on_create),    # protected
        'my_onPause': (0x0004, 2, 1, 1, on_pause),
        'my_onResume': (0x0004, 2, 1, 1, on_resume),
        'my_onBack': (0x0001, 3, 1, 1, on_back),        # public
    }
    direct_keys = ['my_init']
    virtual_keys = sorted([k for k in methods if k not in direct_keys], key=lambda k: MI[k])

    n_str, n_ty, n_pr, n_me, n_fi = len(str_list), len(type_list), len(proto_list), len(meth_list), 1
    off = 0x70
    o_str = off; off += 4 * n_str
    o_ty = off; off += 4 * n_ty
    o_pr = off; off += 12 * n_pr
    o_fi = off; off += 8 * n_fi
    o_me = off; off += 8 * n_me
    o_cd = off; off += 32
    data_off = off
    data = bytearray()

    def here():
        return data_off + len(data)

    code_off = {}
    for k in direct_keys + virtual_keys:
        align(data, 4)
        code_off[k] = here()
        _, regs, ins, outs, code = methods[k]
        data += struct.pack('<HHHHII', regs, ins, outs, 0, 0, len(code))
        data += b''.join(struct.pack('<H', w & 0xffff) for w in code)
    n_code = len(code_off)
    o_code0 = min(code_off.values())
    align(data, 4)
    o_tl0 = here()
    tl_off = {}
    for p in proto_list:
        params = p[1]
        if not params or params in tl_off:
            continue
        align(data, 4)
        tl_off[params] = here()
        data += struct.pack('<I', len(params)) + b''.join(struct.pack('<H', TY[t]) for t in params)
    n_tl = len(tl_off)
    o_sd0 = here()
    sd_off = []
    for s in str_list:
        sd_off.append(here())
        data += uleb(len(s.encode('utf-16-le')) // 2) + mutf8(s) + b'\x00'
    o_cdata = here()
    cdata = bytearray(uleb(0) + uleb(1) + uleb(len(direct_keys)) + uleb(len(virtual_keys)))
    cdata += uleb(FI) + uleb(0x0002)   # private WebView web
    for keys in (direct_keys, virtual_keys):
        prev = 0
        for k in keys:
            cdata += uleb(MI[k] - prev) + uleb(methods[k][0]) + uleb(code_off[k])
            prev = MI[k]
    data += cdata
    align(data, 4)
    o_map = here()
    items = [(0x0000, 1, 0), (0x0001, n_str, o_str), (0x0002, n_ty, o_ty), (0x0003, n_pr, o_pr), (0x0004, n_fi, o_fi),
             (0x0005, n_me, o_me), (0x0006, 1, o_cd), (0x2001, n_code, o_code0)]
    if n_tl:
        items.append((0x1001, n_tl, o_tl0))
    items += [(0x2002, n_str, o_sd0), (0x2000, 1, o_cdata), (0x1000, 1, o_map)]
    items.sort(key=lambda x: x[2])
    data += struct.pack('<I', len(items)) + b''.join(struct.pack('<HHII', t, 0, n, o) for t, n, o in items)
    align(data, 4)
    file_size = data_off + len(data)

    ids = bytearray()
    ids += b''.join(struct.pack('<I', o) for o in sd_off)
    ids += b''.join(struct.pack('<I', S[t]) for t in type_list)
    for p in proto_list:
        ids += struct.pack('<III', S[shorty(p[0], p[1])], TY[p[0]], tl_off.get(p[1], 0) if p[1] else 0)
    ids += struct.pack('<HHI', TY[F_WEB[0]], TY[F_WEB[2]], S[F_WEB[1]])
    for m in meth_list:
        ids += struct.pack('<HHI', TY[m[0]], PR[(m[2], tuple(m[3]))], S[m[1]])
    ids += struct.pack('<IIIIIIII', TY[ACT], 0x0001, TY[T_ACTIVITY], 0, 0xffffffff, 0, o_cdata, 0)
    assert 0x70 + len(ids) == data_off

    header = bytearray(b'dex\n035\x00' + b'\x00' * 24)
    header += struct.pack('<' + 'I' * 20, file_size, 0x70, 0x12345678, 0, 0, o_map,
                          n_str, o_str, n_ty, o_ty, n_pr, o_pr, n_fi, o_fi, n_me, o_me, 1, o_cd,
                          file_size - data_off, data_off)
    dex = header + ids + data
    assert len(dex) == file_size
    dex[12:32] = hashlib.sha1(dex[32:]).digest()
    dex[8:12] = struct.pack('<I', zlib.adler32(bytes(dex[12:])) & 0xffffffff)
    return bytes(dex)


# ----------------------------------------------------------------------
# AndroidManifest.xml (binário)
# ----------------------------------------------------------------------
ATTR_IDS = dict(B.ATTR_IDS)
ATTR_IDS['windowSoftInputMode'] = 0x0101022b
TYPE_REF, TYPE_STRING, TYPE_INT, TYPE_BOOL = B.TYPE_REF, B.TYPE_STRING, B.TYPE_INT, B.TYPE_BOOL
ANDROID_NS = B.ANDROID_NS
THEME_BLACK_NO_TITLE = 0x01030009   # @android:style/Theme.Black.NoTitleBar (barra de status visível)


def build_manifest():
    A = lambda n, t, v: (n, t, v)
    tree = ('manifest', [A('versionCode', TYPE_INT, VERSION_CODE), A('versionName', TYPE_STRING, VERSION_NAME), ('package', TYPE_STRING, PACKAGE)], [
        ('uses-sdk', [A('minSdkVersion', TYPE_INT, MIN_SDK), A('targetSdkVersion', TYPE_INT, TARGET_SDK)], []),
        ('uses-permission', [A('name', TYPE_STRING, 'android.permission.INTERNET')], []),
        ('application', [A('theme', TYPE_REF, THEME_BLACK_NO_TITLE), A('label', TYPE_STRING, APP_NAME), A('icon', TYPE_REF, 0x7f010000),
                         A('allowBackup', TYPE_BOOL, True), A('hardwareAccelerated', TYPE_BOOL, True)], [
            ('activity', [A('name', TYPE_STRING, ACTIVITY), A('exported', TYPE_BOOL, True),
                          A('configChanges', TYPE_INT, 0x0ff0), A('windowSoftInputMode', TYPE_INT, 0x10)], [   # adjustResize
                ('intent-filter', [], [
                    ('action', [A('name', TYPE_STRING, 'android.intent.action.MAIN')], []),
                    ('category', [A('name', TYPE_STRING, 'android.intent.category.LAUNCHER')], []),
                ]),
            ]),
        ]),
    ])
    attr_names = sorted(ATTR_IDS, key=lambda n: ATTR_IDS[n])
    strings = list(attr_names)

    def idx(s):
        if s not in strings:
            strings.append(s)
        return strings.index(s)
    for s in ('android', ANDROID_NS):
        idx(s)

    def walk(node):
        name, attrs, kids = node
        idx(name)
        for n, t, v in attrs:
            idx(n)
            if t == TYPE_STRING:
                idx(v)
        for k in kids:
            walk(k)
    walk(tree)
    body = bytearray()
    body += struct.pack('<HHIIIII', 0x0100, 16, 24, 1, 0xffffffff, idx('android'), idx(ANDROID_NS))

    def emit(node):
        name, attrs, kids = node
        attrs = sorted(attrs, key=lambda a: ATTR_IDS.get(a[0], 0xffffffff) if a[0] in ATTR_IDS else 0)
        ab = bytearray()
        for n, t, v in attrs:
            ns = idx(ANDROID_NS) if n in ATTR_IDS else 0xffffffff
            raw = idx(v) if t == TYPE_STRING else 0xffffffff
            data = idx(v) if t == TYPE_STRING else (0xffffffff if v is True else 0) if t == TYPE_BOOL else v
            ab += struct.pack('<IIIHBBI', ns, idx(n), raw, 8, 0, t, data)
        body.extend(struct.pack('<HHIII', 0x0102, 16, 36 + len(ab), 1, 0xffffffff))
        body.extend(struct.pack('<IIHHHHHH', 0xffffffff, idx(name), 20, 20, len(attrs), 0, 0, 0))
        body.extend(ab)
        for k in kids:
            emit(k)
        body.extend(struct.pack('<HHIIIII', 0x0103, 16, 24, 1, 0xffffffff, 0xffffffff, idx(name)))
    emit(tree)
    body += struct.pack('<HHIIIII', 0x0101, 16, 24, 1, 0xffffffff, idx('android'), idx(ANDROID_NS))
    pool = B.string_pool(strings)
    resmap = struct.pack('<HHI', 0x0180, 8, 8 + 4 * len(attr_names)) + b''.join(struct.pack('<I', ATTR_IDS[n]) for n in attr_names)
    total = 8 + len(pool) + len(resmap) + len(body)
    return struct.pack('<HHI', 0x0003, 8, total) + pool + resmap + bytes(body)


def main():
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, 'w') as z:
        B.add(z, 'AndroidManifest.xml', build_manifest())
        B.add(z, 'classes.dex', build_dex())
        B.add(z, 'resources.arsc', B.build_arsc('res/drawable/icon.png'), store=True)
        B.add(z, 'res/drawable/icon.png', open(os.path.join(WWW, 'icon-192.png'), 'rb').read(), store=True)
        for nome in sorted(os.listdir(WWW)):
            if nome in ('LEIAME.md', 'icon-512.png') or nome.startswith('.'):
                continue
            B.add(z, 'assets/' + nome, open(os.path.join(WWW, nome), 'rb').read(), store=nome.endswith('.png'))
    apk = B.sign_v2(buf.getvalue())
    open(OUT, 'wb').write(apk)
    print(f'APK gerado: {OUT} ({len(apk) // 1024} KB)')


if __name__ == '__main__':
    sys.exit(main())
