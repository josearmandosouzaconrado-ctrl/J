/* Gerador de APK dentro do app (porta de android/build_apk_ia.py para JavaScript).
 * Monta classes.dex, AndroidManifest.xml binário, resources.arsc, o zip e a assinatura v2
 * (RSA 2048 / SHA-256 com WebCrypto). O jogo vira um app com WebView em tela cheia. */
'use strict';
(function (raiz) {
  // ---------------- bytes ----------------
  class Buf {
    constructor() { this.a = []; }
    get len() { return this.a.length; }
    u8(v) { this.a.push(v & 0xff); return this; }
    u16(v) { this.a.push(v & 0xff, (v >>> 8) & 0xff); return this; }
    u32(v) { v >>>= 0; this.a.push(v & 0xff, (v >>> 8) & 0xff, (v >>> 16) & 0xff, v >>> 24); return this; }
    u64(v) { this.u32(v % 0x100000000); return this.u32(Math.floor(v / 0x100000000)); }
    put(b) { for (let i = 0; i < b.length; i++) this.a.push(b[i]); return this; }
    align(n) { while (this.a.length % n) this.a.push(0); return this; }
    bytes() { return Uint8Array.from(this.a); }
  }
  const uleb = n => { const o = []; do { let b = n & 0x7f; n >>>= 7; o.push(n ? b | 0x80 : b); } while (n); return o; };
  function mutf8(s) {
    const o = [];
    for (const ch of s) {
      const c = ch.codePointAt(0);
      if (c === 0) o.push(0xc0, 0x80);
      else if (c < 0x80) o.push(c);
      else if (c < 0x800) o.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
      else if (c < 0x10000) o.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
      else throw new Error('caractere fora do BMP');
    }
    return o;
  }
  const utf16le = s => { const o = []; for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); o.push(c & 0xff, c >> 8); } return o; };
  const cmp = (a, b) => a < b ? -1 : a > b ? 1 : 0;           // compara unidades UTF-16, como o Python com utf-16-be
  const cmpLista = (a, b) => { for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) return a[i] - b[i]; return a.length - b.length; };
  const utf8 = s => new TextEncoder().encode(s);

  // ---------------- DEX ----------------
  const T = { act: 'Landroid/app/Activity;', bundle: 'Landroid/os/Bundle;', view: 'Landroid/view/View;', ctx: 'Landroid/content/Context;',
    wv: 'Landroid/webkit/WebView;', ws: 'Landroid/webkit/WebSettings;', str: 'Ljava/lang/String;' };
  const URL_INICIAL = 'file:///android_asset/index.html';
  const shorty = (ret, ps) => [ret].concat(ps).map(t => (t[0] === 'L' || t[0] === '[') ? 'L' : t).join('');

  function dex(pacote, corFundo) {
    const ACT = 'L' + (pacote + '.MainActivity').replace(/\./g, '/') + ';';
    const M = {
      act_init: [T.act, '<init>', 'V', []], act_onCreate: [T.act, 'onCreate', 'V', [T.bundle]], act_onPause: [T.act, 'onPause', 'V', []],
      act_onResume: [T.act, 'onResume', 'V', []], act_onBack: [T.act, 'onBackPressed', 'V', []], act_reqFeature: [T.act, 'requestWindowFeature', 'Z', ['I']],
      act_setContent: [T.act, 'setContentView', 'V', [T.view]], my_init: [ACT, '<init>', 'V', []], my_onCreate: [ACT, 'onCreate', 'V', [T.bundle]],
      my_onPause: [ACT, 'onPause', 'V', []], my_onResume: [ACT, 'onResume', 'V', []], my_onBack: [ACT, 'onBackPressed', 'V', []],
      wv_init: [T.wv, '<init>', 'V', [T.ctx]], wv_settings: [T.wv, 'getSettings', T.ws, []], wv_load: [T.wv, 'loadUrl', 'V', [T.str]],
      wv_pause: [T.wv, 'onPause', 'V', []], wv_resume: [T.wv, 'onResume', 'V', []], wv_canBack: [T.wv, 'canGoBack', 'Z', []], wv_back: [T.wv, 'goBack', 'V', []],
      view_bg: [T.view, 'setBackgroundColor', 'V', ['I']], ws_js: [T.ws, 'setJavaScriptEnabled', 'V', ['Z']], ws_dom: [T.ws, 'setDomStorageEnabled', 'V', ['Z']],
      ws_media: [T.ws, 'setMediaPlaybackRequiresUserGesture', 'V', ['Z']], ws_universal: [T.ws, 'setAllowUniversalAccessFromFileURLs', 'V', ['Z']],
      ws_file: [T.ws, 'setAllowFileAccess', 'V', ['Z']],
    };
    const F_WEB = [ACT, 'web', T.wv];
    const strings = new Set([URL_INICIAL]), types = new Set(), protos = new Map();
    for (const [cls, name, ret, ps] of Object.values(M)) {
      strings.add(name); strings.add(shorty(ret, ps));
      [cls, ret].concat(ps).forEach(t => types.add(t));
      protos.set(ret + '|' + ps.join(','), [ret, ps]);
    }
    strings.add(F_WEB[1]); types.add(F_WEB[0]); types.add(F_WEB[2]);
    types.forEach(t => strings.add(t));
    const strList = [...strings].sort(cmp);
    const S = new Map(strList.map((s, i) => [s, i]));
    const typeList = [...types].sort((a, b) => S.get(a) - S.get(b));
    const TY = new Map(typeList.map((t, i) => [t, i]));
    const protoList = [...protos.values()].sort((a, b) => (TY.get(a[0]) - TY.get(b[0])) || cmpLista(a[1].map(x => TY.get(x)), b[1].map(x => TY.get(x))));
    const pkey = p => p[0] + '|' + p[1].join(',');
    const PR = new Map(protoList.map((p, i) => [pkey(p), i]));
    const methList = Object.values(M).sort((a, b) => (TY.get(a[0]) - TY.get(b[0])) || (S.get(a[1]) - S.get(b[1])) || (PR.get(pkey([a[2], a[3]])) - PR.get(pkey([b[2], b[3]]))));
    const MI = {}; for (const k in M) MI[k] = methList.indexOf(M[k]);

    const invoke = (op, m, regs) => { const a = regs.length, r = regs.concat([0, 0, 0, 0, 0]).slice(0, 5);
      return [(a << 12) | (r[4] << 8) | op, MI[m], (r[3] << 12) | (r[2] << 8) | (r[1] << 4) | r[0]]; };
    const vcall = (m, ...r) => invoke(0x6e, m, r), supercall = (m, ...r) => invoke(0x6f, m, r), direct = (m, ...r) => invoke(0x70, m, r);
    const moveObj = a => [(a << 8) | 0x0c], moveRes = a => [(a << 8) | 0x0a], ifEqz = (a, off) => [(a << 8) | 0x38, off & 0xffff];
    const const4 = (a, v) => [((v & 0xf) << 12) | (a << 8) | 0x12], const32 = (a, v) => [(a << 8) | 0x14, v & 0xffff, (v >>> 16) & 0xffff];
    const cstr = (a, s) => [(a << 8) | 0x1a, S.get(s)], newinst = (a, t) => [(a << 8) | 0x22, TY.get(t)];
    const iget = (a, b) => [(b << 12) | (a << 8) | 0x54, 0], iput = (a, b) => [(b << 12) | (a << 8) | 0x5b, 0];
    const ret = [0x000e];
    const onCreate = [].concat(supercall('act_onCreate', 4, 5), const4(0, 1), vcall('act_reqFeature', 4, 0), newinst(0, T.wv), direct('wv_init', 0, 4),
      const32(1, corFundo), vcall('view_bg', 0, 1), vcall('wv_settings', 0), moveObj(1), const4(2, 1), vcall('ws_js', 1, 2), vcall('ws_dom', 1, 2),
      vcall('ws_file', 1, 2), vcall('ws_universal', 1, 2), const4(3, 0), vcall('ws_media', 1, 3), iput(0, 4), vcall('act_setContent', 4, 0),
      cstr(1, URL_INICIAL), vcall('wv_load', 0, 1), ret);
    const onPause = [].concat(supercall('act_onPause', 1), iget(0, 1), vcall('wv_pause', 0), ret);
    const onResume = [].concat(supercall('act_onResume', 1), iget(0, 1), vcall('wv_resume', 0), ret);
    const onBack = [].concat(iget(0, 2), vcall('wv_canBack', 0), moveRes(1), ifEqz(1, 6), vcall('wv_back', 0), ret, supercall('act_onBack', 2), ret);
    const init = [].concat(direct('act_init', 0), ret);
    const metodos = { my_init: [0x10001, 1, 1, 1, init], my_onCreate: [0x4, 6, 2, 2, onCreate], my_onPause: [0x4, 2, 1, 1, onPause],
      my_onResume: [0x4, 2, 1, 1, onResume], my_onBack: [0x1, 3, 1, 1, onBack] };
    const diretos = ['my_init'];
    const virtuais = Object.keys(metodos).filter(k => !diretos.includes(k)).sort((a, b) => MI[a] - MI[b]);

    const nStr = strList.length, nTy = typeList.length, nPr = protoList.length, nMe = methList.length;
    let off = 0x70;
    const oStr = off; off += 4 * nStr; const oTy = off; off += 4 * nTy; const oPr = off; off += 12 * nPr;
    const oFi = off; off += 8; const oMe = off; off += 8 * nMe; const oCd = off; off += 32;
    const dataOff = off;
    const data = new Buf();
    const here = () => dataOff + data.len;
    const codeOff = {};
    for (const k of diretos.concat(virtuais)) {
      data.align(4); codeOff[k] = here();
      const [, regs, ins, outs, code] = metodos[k];
      data.u16(regs).u16(ins).u16(outs).u16(0).u32(0).u32(code.length);
      code.forEach(w => data.u16(w));
    }
    const oCode0 = Math.min(...Object.values(codeOff));
    data.align(4);
    const oTl0 = here(); const tlOff = new Map();
    for (const p of protoList) {
      const k = p[1].join(',');
      if (!p[1].length || tlOff.has(k)) continue;
      data.align(4); tlOff.set(k, here());
      data.u32(p[1].length); p[1].forEach(t => data.u16(TY.get(t)));
    }
    const oSd0 = here(); const sdOff = [];
    for (const s of strList) { sdOff.push(here()); data.put(uleb(s.length)).put(mutf8(s)).u8(0); }
    const oCdata = here();
    data.put(uleb(0)).put(uleb(1)).put(uleb(diretos.length)).put(uleb(virtuais.length)).put(uleb(0)).put(uleb(0x2));
    for (const ks of [diretos, virtuais]) { let prev = 0; for (const k of ks) { data.put(uleb(MI[k] - prev)).put(uleb(metodos[k][0])).put(uleb(codeOff[k])); prev = MI[k]; } }
    data.align(4);
    const oMap = here();
    let items = [[0x0, 1, 0], [0x1, nStr, oStr], [0x2, nTy, oTy], [0x3, nPr, oPr], [0x4, 1, oFi], [0x5, nMe, oMe], [0x6, 1, oCd],
      [0x2001, Object.keys(codeOff).length, oCode0]];
    if (tlOff.size) items.push([0x1001, tlOff.size, oTl0]);
    items.push([0x2002, nStr, oSd0], [0x2000, 1, oCdata], [0x1000, 1, oMap]);
    items.sort((a, b) => a[2] - b[2]);
    data.u32(items.length); items.forEach(([t, n, o]) => data.u16(t).u16(0).u32(n).u32(o));
    data.align(4);
    const fileSize = dataOff + data.len;
    const ids = new Buf();
    sdOff.forEach(o => ids.u32(o));
    typeList.forEach(t => ids.u32(S.get(t)));
    for (const p of protoList) ids.u32(S.get(shorty(p[0], p[1]))).u32(TY.get(p[0])).u32(p[1].length ? tlOff.get(p[1].join(',')) : 0);
    ids.u16(TY.get(F_WEB[0])).u16(TY.get(F_WEB[2])).u32(S.get(F_WEB[1]));
    for (const m of methList) ids.u16(TY.get(m[0])).u16(PR.get(pkey([m[2], m[3]]))).u32(S.get(m[1]));
    ids.u32(TY.get(ACT)).u32(1).u32(TY.get(T.act)).u32(0).u32(0xffffffff).u32(0).u32(oCdata).u32(0);
    if (0x70 + ids.len !== dataOff) throw new Error('dex: tamanho dos índices');
    const h = new Buf().put([0x64, 0x65, 0x78, 0x0a, 0x30, 0x33, 0x35, 0x00]).put(new Array(24).fill(0));
    [fileSize, 0x70, 0x12345678, 0, 0, oMap, nStr, oStr, nTy, oTy, nPr, oPr, 1, oFi, nMe, oMe, 1, oCd, fileSize - dataOff, dataOff].forEach(v => h.u32(v));
    const out = new Uint8Array(fileSize);
    out.set(h.bytes(), 0); out.set(ids.bytes(), 0x70); out.set(data.bytes(), dataOff);
    return out;   // sha1 e adler32 são preenchidos em finalizarDex (sha1 é assíncrono)
  }
  async function finalizarDex(d) {
    const sha = new Uint8Array(await crypto.subtle.digest('SHA-1', d.subarray(32)));
    d.set(sha, 12);
    let a = 1, b = 0;
    for (let i = 12; i < d.length; i++) { a = (a + d[i]) % 65521; b = (b + a) % 65521; }
    new DataView(d.buffer).setUint32(8, ((b << 16) | a) >>> 0, true);
    return d;
  }

  // ---------------- XML binário ----------------
  const ANDROID_NS = 'http://schemas.android.com/apk/res/android';
  const ATTR_IDS = { theme: 0x01010000, label: 0x01010001, icon: 0x01010002, name: 0x01010003, exported: 0x01010010, screenOrientation: 0x0101001e,
    configChanges: 0x0101001f, minSdkVersion: 0x0101020c, versionCode: 0x0101021b, versionName: 0x0101021c, windowSoftInputMode: 0x0101022b,
    targetSdkVersion: 0x01010270, allowBackup: 0x01010280, hardwareAccelerated: 0x010102d3 };
  const TREF = 0x01, TSTR = 0x03, TINT = 0x10, TBOOL = 0x12;
  function stringPool(strs) {
    const offs = [], body = new Buf();
    for (const s of strs) { offs.push(body.len); body.u16(s.length).put(utf16le(s)).u16(0); }
    body.align(4);
    const start = 28 + 4 * strs.length;
    const b = new Buf().u16(1).u16(28).u32(start + body.len).u32(strs.length).u32(0).u32(0).u32(start).u32(0);
    offs.forEach(o => b.u32(o));
    return b.put(body.a).a;
  }
  function manifesto(o) {
    const A = (n, t, v) => [n, t, v];
    const atv = [A('name', TSTR, o.pacote + '.MainActivity'), A('exported', TBOOL, true)];
    if (o.orientacao !== undefined) atv.push(A('screenOrientation', TINT, o.orientacao));
    atv.push(A('configChanges', TINT, 0x0ff0));
    if (o.teclado !== undefined) atv.push(A('windowSoftInputMode', TINT, o.teclado));
    const tree = ['manifest', [A('versionCode', TINT, o.versionCode), A('versionName', TSTR, o.versionName), ['package', TSTR, o.pacote]], [
      ['uses-sdk', [A('minSdkVersion', TINT, 24), A('targetSdkVersion', TINT, 34)], []],
      ['uses-permission', [A('name', TSTR, 'android.permission.INTERNET')], []],
      ['application', [A('theme', TREF, o.tema), A('label', TSTR, o.nome), A('icon', TREF, 0x7f010000), A('allowBackup', TBOOL, true), A('hardwareAccelerated', TBOOL, true)], [
        ['activity', atv, [['intent-filter', [], [
          ['action', [A('name', TSTR, 'android.intent.action.MAIN')], []],
          ['category', [A('name', TSTR, 'android.intent.category.LAUNCHER')], []]]]]]]]]];
    // como no Python: todos os atributos conhecidos entram no mapa de recursos
    const attrNames = Object.keys(ATTR_IDS).sort((a, b) => ATTR_IDS[a] - ATTR_IDS[b]);
    const strs = attrNames.slice();
    const idx = s => { let i = strs.indexOf(s); if (i < 0) { strs.push(s); i = strs.length - 1; } return i; };
    idx('android'); idx(ANDROID_NS);
    (function walk(n) { idx(n[0]); for (const [an, t, v] of n[1]) { idx(an); if (t === TSTR) idx(v); } n[2].forEach(walk); })(tree);
    const body = new Buf();
    body.u16(0x0100).u16(16).u32(24).u32(1).u32(0xffffffff).u32(idx('android')).u32(idx(ANDROID_NS));
    (function emit(n) {
      const attrs = n[1].slice().sort((a, b) => (a[0] in ATTR_IDS ? ATTR_IDS[a[0]] : 0) - (b[0] in ATTR_IDS ? ATTR_IDS[b[0]] : 0));
      const ab = new Buf();
      for (const [an, t, v] of attrs) {
        const ns = an in ATTR_IDS ? idx(ANDROID_NS) : 0xffffffff;
        const raw = t === TSTR ? idx(v) : 0xffffffff;
        const d = t === TSTR ? idx(v) : t === TBOOL ? (v === true ? 0xffffffff : 0) : v;
        ab.u32(ns).u32(idx(an)).u32(raw).u16(8).u8(0).u8(t).u32(d);
      }
      body.u16(0x0102).u16(16).u32(36 + ab.len).u32(1).u32(0xffffffff);
      body.u32(0xffffffff).u32(idx(n[0])).u16(20).u16(20).u16(attrs.length).u16(0).u16(0).u16(0);
      body.put(ab.a);
      n[2].forEach(emit);
      body.u16(0x0103).u16(16).u32(24).u32(1).u32(0xffffffff).u32(0xffffffff).u32(idx(n[0]));
    })(tree);
    body.u16(0x0101).u16(16).u32(24).u32(1).u32(0xffffffff).u32(idx('android')).u32(idx(ANDROID_NS));
    const pool = stringPool(strs);
    const resmap = new Buf().u16(0x0180).u16(8).u32(8 + 4 * attrNames.length);
    attrNames.forEach(n => resmap.u32(ATTR_IDS[n]));
    const total = 8 + pool.length + resmap.len + body.len;
    return new Buf().u16(3).u16(8).u32(total).put(pool).put(resmap.a).put(body.a).bytes();
  }

  // ---------------- resources.arsc (só o ícone) ----------------
  function arsc(pacote) {
    const gpool = stringPool(['res/drawable/icon.png']), types = stringPool(['drawable']), keys = stringPool(['icon']);
    const spec = new Buf().u16(0x0202).u16(16).u32(20).u8(1).u8(0).u16(0).u32(1).u32(0).a;
    const config = new Buf().u32(64).put(new Array(60).fill(0)).a;
    const hdr = 20 + config.length;
    const entries = new Buf().u16(8).u16(0).u32(0).u16(8).u8(0).u8(TSTR).u32(0).a;
    const ttype = new Buf().u16(0x0201).u16(hdr).u32(hdr + 4 + entries.length).u8(1).u8(0).u16(0).u32(1).u32(hdr + 4).put(config).u32(0).put(entries).a;
    const nome = utf16le(pacote).slice(0, 254); while (nome.length < 256) nome.push(0);
    const phdr = 288;
    const pkgSize = phdr + types.length + keys.length + spec.length + ttype.length;
    const pkg = new Buf().u16(0x0200).u16(phdr).u32(pkgSize).u32(0x7f).put(nome).u32(phdr).u32(1).u32(phdr + types.length).u32(1).u32(0)
      .put(types).put(keys).put(spec).put(ttype).a;
    return new Buf().u16(2).u16(12).u32(12 + gpool.length + pkg.length).u32(1).put(gpool).put(pkg).bytes();
  }

  // ---------------- zip (tudo sem compressão, alinhado em 4 bytes) ----------------
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = d => { let c = 0xffffffff; for (let i = 0; i < d.length; i++) c = CRC[(c ^ d[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  function zip(arquivos) {
    const partes = [], central = [];
    let pos = 0;
    const DATA = (2026 - 1980) << 9 | 1 << 5 | 1;
    for (const [nome, dados] of arquivos) {
      const n = utf8(nome), crc = crc32(dados);
      const pad = (4 - (pos + 30 + n.length) % 4) % 4;
      const lh = new Buf().u32(0x04034b50).u16(10).u16(0x800).u16(0).u16(0).u16(DATA).u32(crc).u32(dados.length).u32(dados.length)
        .u16(n.length).u16(pad).put(n).put(new Array(pad).fill(0)).bytes();
      central.push(new Buf().u32(0x02014b50).u16(20).u16(10).u16(0x800).u16(0).u16(0).u16(DATA).u32(crc).u32(dados.length).u32(dados.length)
        .u16(n.length).u16(0).u16(0).u16(0).u16(0).u32(0).u32(pos).put(n).bytes());
      partes.push(lh, dados);
      pos += lh.length + dados.length;
    }
    const cdOff = pos;
    const cdLen = central.reduce((s, c) => s + c.length, 0);
    const eocd = new Buf().u32(0x06054b50).u16(0).u16(0).u16(arquivos.length).u16(arquivos.length).u32(cdLen).u32(cdOff).u16(0).bytes();
    return { entradas: juntar(partes), cd: juntar(central), eocd };
  }
  function juntar(lista) {
    const t = lista.reduce((s, x) => s + x.length, 0), o = new Uint8Array(t);
    let p = 0; for (const x of lista) { o.set(x, p); p += x.length; }
    return o;
  }

  // ---------------- chave e certificado ----------------
  function derLen(n) { if (n < 128) return [n]; const b = []; while (n) { b.unshift(n & 0xff); n >>>= 8; } return [0x80 | b.length].concat(b); }
  const der = (tag, conteudo) => [tag].concat(derLen(conteudo.length), Array.from(conteudo));
  const seq = (...xs) => der(0x30, [].concat(...xs));
  const OID_SHA256RSA = [0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x0b];
  const OID_CN = [0x06, 0x03, 0x55, 0x04, 0x03];
  const ascii = s => Array.from(s, c => c.charCodeAt(0));
  async function chaveDeAssinatura(armazem) {
    let salvo = null;
    try { salvo = JSON.parse(armazem.getItem('nexo_chave_apk') || 'null'); } catch (e) { /* nova */ }
    const alg = { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' };
    if (salvo) {
      const priv = await crypto.subtle.importKey('jwk', salvo.jwk, alg, false, ['sign']);
      return { priv, spki: b64dec(salvo.spki), cert: b64dec(salvo.cert) };
    }
    const par = await crypto.subtle.generateKey(Object.assign({ modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) }, alg), true, ['sign', 'verify']);
    const spki = new Uint8Array(await crypto.subtle.exportKey('spki', par.publicKey));
    const nome = seq(der(0x31, seq(OID_CN, der(0x0c, utf8('Nexo IA Jogos')))));
    const serial = crypto.getRandomValues(new Uint8Array(8)); serial[0] &= 0x7f; serial[0] |= 0x01;
    const tbs = seq(der(0xa0, der(0x02, [2])), der(0x02, serial), seq(OID_SHA256RSA, [0x05, 0x00]), nome,
      seq(der(0x17, ascii('260101000000Z')), der(0x18, ascii('20560101000000Z'))), nome, Array.from(spki));
    const sig = new Uint8Array(await crypto.subtle.sign(alg.name, par.privateKey, Uint8Array.from(tbs)));
    const cert = Uint8Array.from(seq(tbs, seq(OID_SHA256RSA, [0x05, 0x00]), der(0x03, [0].concat(Array.from(sig)))));
    const jwk = await crypto.subtle.exportKey('jwk', par.privateKey);
    try { armazem.setItem('nexo_chave_apk', JSON.stringify({ jwk, spki: b64enc(spki), cert: b64enc(cert) })); } catch (e) { /* sem espaço */ }
    return { priv: par.privateKey, spki, cert };
  }
  function b64enc(u8) { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); }
  function b64dec(s) { const b = atob(s), o = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) o[i] = b.charCodeAt(i); return o; }

  // ---------------- assinatura APK v2 ----------------
  const lp = b => new Buf().u32(b.length).put(b).a;
  async function sha256(b) { return new Uint8Array(await crypto.subtle.digest('SHA-256', b)); }
  async function digestChunks(secoes) {
    const ds = [];
    for (const s of secoes) for (let i = 0; i < s.length; i += 1 << 20) {
      const c = s.subarray(i, i + (1 << 20));
      ds.push(await sha256(juntar([Uint8Array.from(new Buf().u8(0xa5).u32(c.length).a), c])));
    }
    return sha256(juntar([Uint8Array.from(new Buf().u8(0x5a).u32(ds.length).a)].concat(ds)));
  }
  async function assinar(z, chave) {
    const digest = await digestChunks([z.entradas, z.cd, z.eocd]);
    const ALG = 0x0103;
    const signed = Uint8Array.from([].concat(lp(lp(new Buf().u32(ALG).put(lp(Array.from(digest))).a)), lp(lp(Array.from(chave.cert))), lp([])));
    const sig = new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', chave.priv, signed));
    const signer = [].concat(lp(Array.from(signed)), lp(lp(new Buf().u32(ALG).put(lp(Array.from(sig))).a)), lp(Array.from(chave.spki)));
    const valor = lp(lp(signer));
    const par = new Buf().u64(4 + valor.length).u32(0x7109871a).put(valor).a;
    const tam = par.length + 8 + 16;
    const bloco = new Buf().u64(tam).put(par).u64(tam).put(ascii('APK Sig Block 42')).bytes();
    const eocd = z.eocd.slice();
    new DataView(eocd.buffer).setUint32(16, z.entradas.length + bloco.length, true);
    return juntar([z.entradas, bloco, z.cd, eocd]);
  }

  // ---------------- API pública ----------------
  // opcoes: { nome, pacote, versionCode, versionName, html (string), icone (Uint8Array PNG), orientacao: 'paisagem'|'retrato'|'livre', armazem }
  async function construir(o) {
    const pacote = o.pacote;
    if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(pacote)) throw new Error('nome de pacote inválido: ' + pacote);
    const ori = { paisagem: 6, retrato: 7 }[o.orientacao];
    const man = manifesto({ pacote, nome: o.nome, versionCode: o.versionCode || 1, versionName: o.versionName || '1.0', tema: 0x0103000a, orientacao: ori });
    const d = await finalizarDex(dex(pacote, 0xff000000));
    const arquivos = [['AndroidManifest.xml', man], ['classes.dex', d], ['resources.arsc', arsc(pacote)], ['res/drawable/icon.png', o.icone],
      ['assets/index.html', utf8(o.html)]];
    for (const [n, dados] of (o.extras || [])) arquivos.push(['assets/' + n, typeof dados === 'string' ? utf8(dados) : dados]);
    const chave = await chaveDeAssinatura(o.armazem || localStorage);
    return assinar(zip(arquivos), chave);
  }

  raiz.NexoAPK = { construir, b64enc, b64dec, _teste: { dex, finalizarDex, manifesto, arsc, zip, assinar, chaveDeAssinatura } };
})(typeof window !== 'undefined' ? window : globalThis);
