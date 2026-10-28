#!/usr/bin/env python3
"""Gera o APK Android de Crônicas de Eldoria sem o Android SDK.

O aplicativo é uma Activity com WebView em tela cheia e deitada (paisagem) que
abre o jogo a partir de assets/. Este script escreve à mão tudo o que o SDK
normalmente gera:
  - classes.dex         (bytecode Dalvik da MainActivity)
  - AndroidManifest.xml (XML binário)
  - resources.arsc      (tabela com o ícone)
  - assinatura APK v2   (RSA 2048 / SHA-256)

Uso: python3 android/build_apk.py         ->  CronicasDeEldoria.apk (jogo normal)
     python3 android/build_apk.py --adm   ->  CronicasDeEldoria-ADM.apk (painel de testes,
                                             instala separado do jogo normal)
Requer apenas Python 3 e o pacote `cryptography`.
"""
import datetime
import hashlib
import io
import os
import struct
import sys
import zipfile
import zlib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERE = os.path.join(ROOT, 'android')
ADM = '--adm' in sys.argv
OUT = os.path.join(ROOT, 'CronicasDeEldoria-ADM.apk' if ADM else 'CronicasDeEldoria.apk')

PACKAGE = 'com.eldoria.cronicas.adm' if ADM else 'com.eldoria.cronicas'
ACTIVITY = PACKAGE + '.MainActivity'
APP_NAME = 'Eldoria ADM' if ADM else 'Crônicas de Eldoria'
UA_TAG = ' EldoriaAPK EldoriaADM' if ADM else ' EldoriaAPK'
VERSION_CODE = 11
VERSION_NAME = '0.9.2-beta'
MIN_SDK, TARGET_SDK = 24, 34
WEB_FILES = ['index.html', 'manifest.json', 'css', 'js', 'icons']


# ======================================================================
# Utilitários
# ======================================================================
def uleb(n):
    out = bytearray()
    while True:
        b = n & 0x7f
        n >>= 7
        if n:
            out.append(b | 0x80)
        else:
            out.append(b)
            return bytes(out)


def mutf8(s):
    out = bytearray()
    for ch in s:
        c = ord(ch)
        if c == 0:
            out += b'\xc0\x80'
        elif c < 0x80:
            out.append(c)
        elif c < 0x800:
            out += bytes([0xc0 | (c >> 6), 0x80 | (c & 0x3f)])
        elif c < 0x10000:
            out += bytes([0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f)])
        else:
            raise ValueError('caractere fora do BMP')
    return bytes(out)


def align(buf, n):
    while len(buf) % n:
        buf.append(0)


# ======================================================================
# DEX: bytecode da MainActivity
# ======================================================================
ACT = 'L' + ACTIVITY.replace('.', '/') + ';'
T_ACTIVITY = 'Landroid/app/Activity;'
T_BUNDLE = 'Landroid/os/Bundle;'
T_VIEW = 'Landroid/view/View;'
T_CONTEXT = 'Landroid/content/Context;'
T_WEBVIEW = 'Landroid/webkit/WebView;'
T_SETTINGS = 'Landroid/webkit/WebSettings;'
T_STRING = 'Ljava/lang/String;'
T_VALUECB = 'Landroid/webkit/ValueCallback;'

UI_FLAGS = 0x1706          # layout stable/hide nav/fullscreen + hide nav + fullscreen + immersive sticky
SAVE_JS = "typeof Game!=='undefined'&&Game.started&&Game.saveGame(0,true)"
BACK_JS = "window.androidBack&&androidBack()"

# métodos referenciados: (classe, nome, retorno, [parâmetros])
M = {
    'act_init': (T_ACTIVITY, '<init>', 'V', []),
    'act_onCreate': (T_ACTIVITY, 'onCreate', 'V', [T_BUNDLE]),
    'act_onPause': (T_ACTIVITY, 'onPause', 'V', []),
    'act_onResume': (T_ACTIVITY, 'onResume', 'V', []),
    'act_onFocus': (T_ACTIVITY, 'onWindowFocusChanged', 'V', ['Z']),
    'act_reqFeature': (T_ACTIVITY, 'requestWindowFeature', 'Z', ['I']),
    'act_setContent': (T_ACTIVITY, 'setContentView', 'V', [T_VIEW]),
    'my_init': (ACT, '<init>', 'V', []),
    'my_onCreate': (ACT, 'onCreate', 'V', [T_BUNDLE]),
    'my_onPause': (ACT, 'onPause', 'V', []),
    'my_onResume': (ACT, 'onResume', 'V', []),
    'my_onFocus': (ACT, 'onWindowFocusChanged', 'V', ['Z']),
    'my_onBack': (ACT, 'onBackPressed', 'V', []),
    'my_hide': (ACT, 'hideBars', 'V', []),
    'wv_init': (T_WEBVIEW, '<init>', 'V', [T_CONTEXT]),
    'wv_settings': (T_WEBVIEW, 'getSettings', T_SETTINGS, []),
    'wv_load': (T_WEBVIEW, 'loadUrl', 'V', [T_STRING]),
    'wv_eval': (T_WEBVIEW, 'evaluateJavascript', 'V', [T_STRING, T_VALUECB]),
    'wv_pause': (T_WEBVIEW, 'onPause', 'V', []),
    'wv_resume': (T_WEBVIEW, 'onResume', 'V', []),
    'view_ui': (T_VIEW, 'setSystemUiVisibility', 'V', ['I']),
    'view_bg': (T_VIEW, 'setBackgroundColor', 'V', ['I']),
    'ws_js': (T_SETTINGS, 'setJavaScriptEnabled', 'V', ['Z']),
    'ws_dom': (T_SETTINGS, 'setDomStorageEnabled', 'V', ['Z']),
    'ws_media': (T_SETTINGS, 'setMediaPlaybackRequiresUserGesture', 'V', ['Z']),
    'ws_getua': (T_SETTINGS, 'getUserAgentString', T_STRING, []),
    'ws_setua': (T_SETTINGS, 'setUserAgentString', 'V', [T_STRING]),
    'str_concat': (T_STRING, 'concat', T_STRING, [T_STRING]),
}
F_WEB = (ACT, 'web', T_WEBVIEW)
CONST_STRINGS = ['file:///android_asset/index.html', UA_TAG, SAVE_JS, BACK_JS]


def shorty(ret, params):
    s = lambda t: 'L' if t[0] in 'L[' else t
    return s(ret) + ''.join(s(p) for p in params)


def build_dex():
    # ---------- tabelas de índices ----------
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

    # ---------- instruções ----------
    def invoke(op, mkey, regs):
        a = len(regs)
        r = list(regs) + [0] * (5 - a)
        return [(a << 12) | (r[4] << 8) | op, MI[mkey], (r[3] << 12) | (r[2] << 8) | (r[1] << 4) | r[0]]
    vcall = lambda m, *r: invoke(0x6e, m, r)
    supercall = lambda m, *r: invoke(0x6f, m, r)
    direct = lambda m, *r: invoke(0x70, m, r)
    move_obj = lambda a: [(a << 8) | 0x0c]
    const4 = lambda a, v: [((v & 0xf) << 12) | (a << 8) | 0x12]
    const32 = lambda a, v: [(a << 8) | 0x14, v & 0xffff, (v >> 16) & 0xffff]
    cstr = lambda a, s: [(a << 8) | 0x1a, S[s]]
    newinst = lambda a, t: [(a << 8) | 0x22, TY[t]]
    iget = lambda a, b: [(b << 12) | (a << 8) | 0x54, FI]
    iput = lambda a, b: [(b << 12) | (a << 8) | 0x5b, FI]
    ret = [0x000e]

    # (chave, flags de acesso, registradores, entradas, saídas, código)
    # registradores: locais v0..; parâmetros no fim (this = primeiro parâmetro)
    on_create = (
        supercall('act_onCreate', 5, 6) +
        const4(0, 1) + vcall('act_reqFeature', 5, 0) +
        newinst(0, T_WEBVIEW) + direct('wv_init', 0, 5) +
        const32(1, -0x1000000 & 0xffffffff) + vcall('view_bg', 0, 1) +
        vcall('wv_settings', 0) + move_obj(1) +
        const4(2, 1) + vcall('ws_js', 1, 2) + vcall('ws_dom', 1, 2) +
        const4(3, 0) + vcall('ws_media', 1, 3) +
        vcall('ws_getua', 1) + move_obj(3) + cstr(4, UA_TAG) + vcall('str_concat', 3, 4) + move_obj(3) + vcall('ws_setua', 1, 3) +
        iput(0, 5) + vcall('act_setContent', 5, 0) +
        cstr(1, 'file:///android_asset/index.html') + vcall('wv_load', 0, 1) +
        direct('my_hide', 5) + ret)
    hide = iget(0, 2) + const32(1, UI_FLAGS) + vcall('view_ui', 0, 1) + ret
    on_focus = supercall('act_onFocus', 0, 1) + direct('my_hide', 0) + ret
    on_pause = (supercall('act_onPause', 3) + iget(0, 3) + cstr(1, SAVE_JS) + const4(2, 0) +
                vcall('wv_eval', 0, 1, 2) + vcall('wv_pause', 0) + ret)
    on_resume = supercall('act_onResume', 1) + iget(0, 1) + vcall('wv_resume', 0) + direct('my_hide', 1) + ret
    on_back = iget(0, 3) + cstr(1, BACK_JS) + const4(2, 0) + vcall('wv_eval', 0, 1, 2) + ret
    init = direct('act_init', 0) + ret
    methods = {
        'my_init': (0x10001, 1, 1, 1, init),            # public constructor
        'my_hide': (0x0002, 3, 1, 2, hide),             # private
        'my_onCreate': (0x0004, 7, 2, 2, on_create),     # protected
        'my_onPause': (0x0004, 4, 1, 3, on_pause),
        'my_onResume': (0x0004, 2, 1, 1, on_resume),
        'my_onFocus': (0x0001, 2, 2, 2, on_focus),       # public
        'my_onBack': (0x0001, 4, 1, 3, on_back),
    }
    direct_keys = sorted([k for k in methods if k in ('my_init', 'my_hide')], key=lambda k: MI[k])
    virtual_keys = sorted([k for k in methods if k not in direct_keys], key=lambda k: MI[k])

    # ---------- layout ----------
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

    # code items
    code_off = {}
    for k in direct_keys + virtual_keys:
        align(data, 4)
        code_off[k] = here()
        _, regs, ins, outs, code = methods[k]
        data += struct.pack('<HHHHII', regs, ins, outs, 0, 0, len(code))
        data += b''.join(struct.pack('<H', w & 0xffff) for w in code)
    n_code = len(code_off)
    o_code0 = min(code_off.values())
    # type lists (parâmetros dos protótipos)
    align(data, 4)
    o_tl0 = here()
    tl_off = {}
    for p in proto_list:
        params = p[1]
        if not params:
            continue
        if params in tl_off:
            continue
        align(data, 4)
        tl_off[params] = here()
        data += struct.pack('<I', len(params)) + b''.join(struct.pack('<H', TY[t]) for t in params)
    n_tl = len(tl_off)
    # string data
    o_sd0 = here()
    sd_off = []
    for s in str_list:
        sd_off.append(here())
        data += uleb(len(s.encode('utf-16-le')) // 2) + mutf8(s) + b'\x00'
    # class data
    o_cdata = here()
    cdata = bytearray(uleb(0) + uleb(1) + uleb(len(direct_keys)) + uleb(len(virtual_keys)))
    cdata += uleb(FI) + uleb(0x0002)   # private WebView web
    for keys in (direct_keys, virtual_keys):
        prev = 0
        for k in keys:
            cdata += uleb(MI[k] - prev) + uleb(methods[k][0]) + uleb(code_off[k])
            prev = MI[k]
    data += cdata
    # map
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

    # ---------- seções de índices ----------
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


# ======================================================================
# XML binário (AndroidManifest.xml)
# ======================================================================
ANDROID_NS = 'http://schemas.android.com/apk/res/android'
ATTR_IDS = {
    'theme': 0x01010000, 'label': 0x01010001, 'icon': 0x01010002, 'name': 0x01010003,
    'exported': 0x01010010, 'screenOrientation': 0x0101001e, 'configChanges': 0x0101001f,
    'minSdkVersion': 0x0101020c, 'versionCode': 0x0101021b, 'versionName': 0x0101021c,
    'targetSdkVersion': 0x01010270, 'allowBackup': 0x01010280, 'hardwareAccelerated': 0x010102d3,
}
TYPE_REF, TYPE_STRING, TYPE_INT, TYPE_BOOL = 0x01, 0x03, 0x10, 0x12


def string_pool(strings):
    offs, body = [], bytearray()
    for s in strings:
        offs.append(len(body))
        u = s.encode('utf-16-le')
        body += struct.pack('<H', len(u) // 2) + u + b'\x00\x00'
    align(body, 4)
    hdr = 28
    start = hdr + 4 * len(strings)
    chunk = struct.pack('<HHIIIIII', 0x0001, hdr, start + len(body), len(strings), 0, 0, start, 0)
    return chunk + b''.join(struct.pack('<I', o) for o in offs) + bytes(body)


def build_manifest():
    # (elemento, [(atributo, tipo, valor)], filhos)
    A = lambda n, t, v: (n, t, v)
    tree = ('manifest', [A('versionCode', TYPE_INT, VERSION_CODE), A('versionName', TYPE_STRING, VERSION_NAME), ('package', TYPE_STRING, PACKAGE)], [
        ('uses-sdk', [A('minSdkVersion', TYPE_INT, MIN_SDK), A('targetSdkVersion', TYPE_INT, TARGET_SDK)], []),
        ('application', [A('theme', TYPE_REF, 0x01030007), A('label', TYPE_STRING, APP_NAME), A('icon', TYPE_REF, 0x7f010000),
                         A('allowBackup', TYPE_BOOL, True), A('hardwareAccelerated', TYPE_BOOL, True)], [
            ('activity', [A('name', TYPE_STRING, ACTIVITY), A('exported', TYPE_BOOL, True),
                          A('screenOrientation', TYPE_INT, 6), A('configChanges', TYPE_INT, 0x0ff0)], [
                ('intent-filter', [], [
                    ('action', [A('name', TYPE_STRING, 'android.intent.action.MAIN')], []),
                    ('category', [A('name', TYPE_STRING, 'android.intent.category.LAUNCHER')], []),
                ]),
            ]),
        ]),
    ])
    # atributos android:* vêm primeiro no pool, na mesma ordem do mapa de recursos
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
    pool = string_pool(strings)
    resmap = struct.pack('<HHI', 0x0180, 8, 8 + 4 * len(attr_names)) + b''.join(struct.pack('<I', ATTR_IDS[n]) for n in attr_names)
    total = 8 + len(pool) + len(resmap) + len(body)
    return struct.pack('<HHI', 0x0003, 8, total) + pool + resmap + bytes(body)


# ======================================================================
# resources.arsc com um único recurso: @drawable/icon (0x7f010000)
# ======================================================================
def build_arsc(icon_path):
    gpool = string_pool([icon_path])
    types = string_pool(['drawable'])
    keys = string_pool(['icon'])
    spec = struct.pack('<HHIBBHI', 0x0202, 16, 16 + 4, 1, 0, 0, 1) + struct.pack('<I', 0)
    config = struct.pack('<I', 64) + b'\x00' * 60
    hdr = 20 + len(config)
    entries = struct.pack('<HHI', 8, 0, 0) + struct.pack('<HBBI', 8, 0, TYPE_STRING, 0)
    ttype = struct.pack('<HHIBBHII', 0x0201, hdr, hdr + 4 + len(entries), 1, 0, 0, 1, hdr + 4) + config + struct.pack('<I', 0) + entries
    name = PACKAGE.encode('utf-16-le')[:254].ljust(256, b'\x00')
    phdr = 288
    pkg_size = phdr + len(types) + len(keys) + len(spec) + len(ttype)
    pkg = struct.pack('<HHII', 0x0200, phdr, pkg_size, 0x7f) + name + struct.pack('<IIIII', phdr, 1, phdr + len(types), 1, 0)
    pkg += types + keys + spec + ttype
    total = 12 + len(gpool) + len(pkg)
    return struct.pack('<HHII', 0x0002, 12, total, 1) + gpool + pkg


# ======================================================================
# Chave de assinatura (gerada uma vez e guardada em android/signing/)
# ======================================================================
def load_key():
    from cryptography import x509
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import rsa
    from cryptography.x509.oid import NameOID
    d = os.path.join(HERE, 'signing')
    kp, cp = os.path.join(d, 'key.pem'), os.path.join(d, 'cert.pem')
    if not os.path.exists(kp):
        os.makedirs(d, exist_ok=True)
        key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
        name = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, 'Cronicas de Eldoria'), x509.NameAttribute(NameOID.ORGANIZATION_NAME, 'Eldoria')])
        now = datetime.datetime(2026, 1, 1, tzinfo=datetime.timezone.utc)
        cert = (x509.CertificateBuilder().subject_name(name).issuer_name(name).public_key(key.public_key())
                .serial_number(x509.random_serial_number()).not_valid_before(now)
                .not_valid_after(now + datetime.timedelta(days=365 * 30)).sign(key, hashes.SHA256()))
        open(kp, 'wb').write(key.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption()))
        open(cp, 'wb').write(cert.public_bytes(serialization.Encoding.PEM))
    key = serialization.load_pem_private_key(open(kp, 'rb').read(), None)
    cert = x509.load_pem_x509_certificate(open(cp, 'rb').read())
    return key, cert


# ======================================================================
# Assinatura APK v2
# ======================================================================
def lp(b):
    return struct.pack('<I', len(b)) + b


def chunk_digest(sections):
    digests = []
    for sec in sections:
        for i in range(0, len(sec), 1 << 20):
            c = sec[i:i + (1 << 20)]
            digests.append(hashlib.sha256(b'\xa5' + struct.pack('<I', len(c)) + c).digest())
    return hashlib.sha256(b'\x5a' + struct.pack('<I', len(digests)) + b''.join(digests)).digest()


def sign_v2(apk):
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import padding
    key, cert = load_key()
    eocd = apk.rfind(b'PK\x05\x06')
    cd_off, = struct.unpack('<I', apk[eocd + 16:eocd + 20])
    entries, cd, eo = apk[:cd_off], apk[cd_off:eocd], apk[eocd:]
    digest = chunk_digest([entries, cd, eo])
    ALG = 0x0103  # RSASSA-PKCS1-v1_5 com SHA-256
    cert_der = cert.public_bytes(serialization.Encoding.DER)
    signed = lp(lp(struct.pack('<I', ALG) + lp(digest))) + lp(lp(cert_der)) + lp(b'')
    sig = key.sign(signed, padding.PKCS1v15(), hashes.SHA256())
    pub = key.public_key().public_bytes(serialization.Encoding.DER, serialization.PublicFormat.SubjectPublicKeyInfo)
    signer = lp(signed) + lp(lp(struct.pack('<I', ALG) + lp(sig))) + lp(pub)
    value = lp(lp(signer))
    pair = struct.pack('<Q', 4 + len(value)) + struct.pack('<I', 0x7109871a) + value
    size = len(pair) + 8 + 16
    block = struct.pack('<Q', size) + pair + struct.pack('<Q', size) + b'APK Sig Block 42'
    new_eo = eo[:16] + struct.pack('<I', cd_off + len(block)) + eo[20:]
    return entries + block + cd + new_eo


# ======================================================================
# Montagem do APK
# ======================================================================
def web_files():
    for item in WEB_FILES:
        p = os.path.join(ROOT, item)
        if os.path.isfile(p):
            yield p, item
        else:
            for d, _, fs in os.walk(p):
                for f in sorted(fs):
                    full = os.path.join(d, f)
                    yield full, os.path.relpath(full, ROOT).replace(os.sep, '/')


def add(z, name, data, store=False):
    info = zipfile.ZipInfo(name, date_time=(2026, 1, 1, 0, 0, 0))
    info.compress_type = zipfile.ZIP_STORED if store else zipfile.ZIP_DEFLATED
    info.create_system = 0
    if store:
        # alinha o conteúdo não comprimido em 4 bytes (zipalign)
        hdr_len = 30 + len(name.encode())
        pad = (-(z.fp.tell() + hdr_len)) % 4
        info.extra = b'\x00' * pad
    z.writestr(info, data)


def main():
    icon = os.path.join(ROOT, 'icons', 'icon-adm-192.png' if ADM else 'icon-192.png')
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, 'w') as z:
        add(z, 'AndroidManifest.xml', build_manifest())
        add(z, 'classes.dex', build_dex())
        add(z, 'resources.arsc', build_arsc('res/drawable/icon.png'), store=True)
        add(z, 'res/drawable/icon.png', open(icon, 'rb').read(), store=True)
        for full, rel in web_files():
            add(z, 'assets/' + rel, open(full, 'rb').read(), store=rel.endswith(('.png', '.ttf')))
    apk = sign_v2(buf.getvalue())
    open(OUT, 'wb').write(apk)
    print(f'APK gerado: {OUT} ({len(apk) // 1024} KB)')


if __name__ == '__main__':
    sys.exit(main())
