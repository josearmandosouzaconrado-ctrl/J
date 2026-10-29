'use strict';
// ===================== SERVIDOR DA SALA OFICIAL — Crônicas de Eldoria =====================
// Node.js puro (sem dependências). Serve o jogo pelo navegador e a sala multiplayer por WebSocket em /ws.
// Uma única sala oficial, até 20 jogadores, mesmo mundo (mesma semente) para todos.
// Iniciar:  node rede/servidor.js        (porta: variável PORT, padrão 8790)
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT, 10) || 8790;
const MAX = 20;
const SEED = 777777;                       // o mundo da Sala Oficial
const RAIZ = path.resolve(__dirname, '..');
const DADOS = process.env.DADOS || path.join(__dirname, 'sala.json');
const PUBLICOS = ['index.html', 'manifest.json', 'sw.js', 'CronicasDeEldoria.apk', 'CronicasDeEldoria-ADM.apk'];
const PASTAS = ['css/', 'js/', 'icons/', 'img/'];
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.ttf': 'font/ttf', '.apk': 'application/vnd.android.package-archive', '.svg': 'image/svg+xml' };

// ---------- estado persistente: guerras e jogadores conhecidos ----------
let sala = { guerras: [], conhecidos: {}, abates: {} };
try { sala = Object.assign(sala, JSON.parse(fs.readFileSync(DADOS, 'utf8'))); } catch (e) { /* sala nova */ }
let salvarT = null;
function salvar() { clearTimeout(salvarT); salvarT = setTimeout(() => { try { fs.writeFileSync(DADOS, JSON.stringify(sala)); } catch (e) { /* disco só de leitura: segue em memória */ } }, 1000); }
const chave = (a, b) => a < b ? a + '|' + b : b + '|' + a;
const emGuerra = (a, b) => sala.guerras.some(g => g.k === chave(a, b));

// ---------- HTTP: o jogo e a saúde do servidor ----------
const srv = http.createServer((req, res) => {
  let url = decodeURIComponent((req.url || '/').split('?')[0]);
  if (url === '/saude') { res.writeHead(200, { 'content-type': 'application/json' }); return res.end(JSON.stringify({ ok: true, jogadores: online().length, max: MAX })); }
  if (url === '/') url = '/index.html';
  const rel = url.replace(/^\/+/, '');
  if (rel.includes('..') || !(PUBLICOS.includes(rel) || PASTAS.some(p => rel.startsWith(p)))) { res.writeHead(404); return res.end('não encontrado'); }
  const arq = path.join(RAIZ, rel);
  fs.readFile(arq, (err, buf) => {
    if (err) { res.writeHead(404); return res.end('não encontrado'); }
    res.writeHead(200, { 'content-type': TIPOS[path.extname(arq)] || 'application/octet-stream', 'cache-control': 'no-cache' });
    res.end(buf);
  });
});

// ---------- WebSocket (RFC 6455) ----------
const conexoes = new Set();
srv.on('upgrade', (req, sock) => {
  if ((req.url || '').split('?')[0] !== '/ws' || (req.headers.upgrade || '').toLowerCase() !== 'websocket' || !req.headers['sec-websocket-key']) { sock.destroy(); return; }
  const acc = crypto.createHash('sha1').update(req.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + acc + '\r\n\r\n');
  sock.setNoDelay(true);
  const c = { sock, buf: Buffer.alloc(0), frag: [], vivo: Date.now(), cota: 0, cotaT: Date.now(), hits: [], chatT: 0, p: null };
  conexoes.add(c);
  sock.on('data', d => { c.buf = Buffer.concat([c.buf, d]); try { ler(c); } catch (e) { fechar(c); } });
  sock.on('close', () => sair(c));
  sock.on('error', () => sair(c));
});
function ler(c) {
  for (;;) {
    const b = c.buf; if (b.length < 2) return;
    const fin = b[0] & 0x80, op = b[0] & 0x0f, mask = b[1] & 0x80;
    let len = b[1] & 0x7f, o = 2;
    if (len === 126) { if (b.length < 4) return; len = b.readUInt16BE(2); o = 4; }
    else if (len === 127) { if (b.length < 10) return; len = Number(b.readBigUInt64BE(2)); o = 10; }
    if (len > 65536 || !mask) return fechar(c);
    if (b.length < o + 4 + len) return;
    const m = b.slice(o, o + 4), dados = Buffer.from(b.slice(o + 4, o + 4 + len));
    for (let i = 0; i < dados.length; i++) dados[i] ^= m[i & 3];
    c.buf = b.slice(o + 4 + len);
    c.vivo = Date.now();
    if (op === 8) return fechar(c);
    if (op === 9) { quadro(c, dados, 10); continue; }
    if (op === 10) continue;
    if (op === 1 || op === 0) {
      c.frag.push(dados);
      if (!fin) continue;
      const txt = Buffer.concat(c.frag).toString('utf8'); c.frag = [];
      let msg; try { msg = JSON.parse(txt); } catch (e) { continue; }
      if (msg && typeof msg === 'object') receber(c, msg);
    }
  }
}
function quadro(c, dados, op = 1) {
  if (!c.sock.writable) return;
  const n = dados.length;
  const h = n < 126 ? Buffer.from([0x80 | op, n]) : n < 65536 ? Buffer.from([0x80 | op, 126, n >> 8, n & 255]) : (() => { const x = Buffer.alloc(10); x[0] = 0x80 | op; x[1] = 127; x.writeBigUInt64BE(BigInt(n), 2); return x; })();
  c.sock.write(Buffer.concat([h, dados]));
}
function enviar(c, msg) { quadro(c, Buffer.from(JSON.stringify(msg))); }
function todos(msg, exceto) { const d = Buffer.from(JSON.stringify(msg)); for (const c of conexoes) if (c.p && c !== exceto) quadro(c, d); }
function fechar(c) { try { quadro(c, Buffer.alloc(0), 8); c.sock.end(); } catch (e) { /* já fechada */ } sair(c); }
function sair(c) {
  if (!conexoes.has(c)) return;
  conexoes.delete(c);
  try { c.sock.destroy(); } catch (e) { /* */ }
  if (c.p) { todos({ t: 'leave', id: c.p.id }); if (c.p.nome) todos({ t: 'aviso', txt: `${c.p.nome} saiu da sala.` }); }
}
const online = () => [...conexoes].filter(c => c.p);
const porId = id => online().find(c => c.p.id === id);
const limpa = (s, n) => String(s || '').replace(/[<>\u0000-\u001f]/g, '').trim().slice(0, n);
const num = (v, a, b) => { v = Number(v); return Number.isFinite(v) ? Math.max(a, Math.min(b, v)) : a; };
const publico = p => ({ id: p.id, nome: p.nome, st: p.st, look: p.look, w: p.w, reino: p.reino, cor: p.cor, vila: p.vila, abates: sala.abates[p.pid] || 0 });

// ---------- mensagens ----------
function receber(c, m) {
  // limite de mensagens por segundo
  const agora = Date.now();
  if (agora - c.cotaT > 1000) { c.cotaT = agora; c.cota = 0; }
  if (++c.cota > 80) return;
  if (m.t === 'ping') return enviar(c, { t: 'pong' });
  if (m.t === 'hello') {
    if (c.p) return;
    const pid = limpa(m.pid, 64);
    if (pid.length < 16) return fechar(c);
    // o mesmo jogador entrando de novo derruba a conexão antiga
    for (const o of online()) if (o.p.pid === pid) sair(o);
    if (online().length >= MAX) { enviar(c, { t: 'full', max: MAX }); return setTimeout(() => fechar(c), 200); }
    const id = crypto.createHash('sha1').update(pid).digest('hex').slice(0, 10);
    c.p = { pid, id, nome: '', st: null, look: null, w: null, reino: '', cor: '#ffffff', vila: null };
    return enviar(c, { t: 'welcome', id, seed: SEED, max: MAX, sala: 'Sala Oficial', players: online().filter(o => o !== c && o.p.nome).map(o => publico(o.p)), wars: guerrasPub() });
  }
  const p = c.p; if (!p) return;
  switch (m.t) {
    case 'perfil': {
      const novo = !p.nome;
      p.nome = limpa(m.nome, 20) || 'Viajante';
      p.reino = limpa(m.reino, 40); p.cor = /^#[0-9a-f]{6}$/i.test(m.cor) ? m.cor : '#ffffff';
      p.vila = m.vila && typeof m.vila === 'object' ? { nome: limpa(m.vila.nome, 30), cx: num(m.vila.cx, 0, 30000), cy: num(m.vila.cy, 0, 30000) } : null;
      if (m.look && typeof m.look === 'object' && JSON.stringify(m.look).length < 2000) p.look = m.look;
      p.w = limpa(m.w, 40) || null;
      sala.conhecidos[p.pid] = { nome: p.nome, id: p.id, visto: Date.now() }; salvar();
      todos(novo ? { t: 'join', p: publico(p) } : { t: 'perfil', p: publico(p) }, c);
      if (novo) todos({ t: 'aviso', txt: `${p.nome} entrou na sala.` }, c);
      return;
    }
    case 'st': {
      p.st = { x: num(m.x, 0, 400000), y: num(m.y, 0, 400000), d: limpa(m.d, 6), m: m.m ? 1 : 0, mo: m.mo ? 1 : 0, hp: num(m.hp, 0, 1e6), mh: num(m.mh, 1, 1e6), lv: num(m.lv, 1, 999), a: m.a === 'w' ? 'w' : '', dead: m.dead ? 1 : 0 };
      p.mudou = true;
      return;
    }
    case 'atk': if (p.st) todos({ t: 'atk', id: p.id, ang: num(m.ang, -10, 10), arc: num(m.arc, 0, 7), dur: num(m.dur, 0.05, 1) }, c); return;
    case 'proj': if (p.st) todos({ t: 'proj', id: p.id, x: num(m.x, 0, 400000), y: num(m.y, 0, 400000), ang: num(m.ang, -10, 10), kind: limpa(m.kind, 16), spd: num(m.spd, 10, 900), life: num(m.life, 0.05, 3), color: limpa(m.color, 9), r: num(m.r, 1, 12) }, c); return;
    case 'hit': {
      const alvo = porId(m.to); if (!alvo || !p.st || !alvo.p.st) return;
      if (!emGuerra(p.pid, alvo.p.pid) || p.st.a !== 'w' || alvo.p.st.a !== 'w' || p.st.dead || alvo.p.st.dead) return;
      if (Math.hypot(p.st.x - alvo.p.st.x, p.st.y - alvo.p.st.y) > 650) return;
      c.hits = c.hits.filter(t => agora - t < 1000); if (c.hits.length >= 10) return; c.hits.push(agora);
      return enviar(alvo, { t: 'hurt', from: p.id, dmg: num(m.dmg, 1, 400), kx: num(m.kx, -600, 600), ky: num(m.ky, -600, 600), elem: limpa(m.elem, 10), crit: m.crit ? 1 : 0 });
    }
    case 'dead': {
      const k = porId(m.by);
      if (k && emGuerra(k.p.pid, p.pid)) {
        sala.abates[k.p.pid] = (sala.abates[k.p.pid] || 0) + 1;
        const g = sala.guerras.find(g => g.k === chave(k.p.pid, p.pid)); if (g) g.placar[k.p.pid] = (g.placar[k.p.pid] || 0) + 1;
        salvar();
        todos({ t: 'kill', killer: k.p.id, victim: p.id, kn: k.p.nome, vn: p.nome });
      }
      return;
    }
    case 'chat': {
      if (agora - c.chatT < 800) return; c.chatT = agora;
      const txt = limpa(m.txt, 140); if (!txt) return;
      return todos({ t: 'chat', id: p.id, nome: p.nome, txt });
    }
    case 'guerra': {
      const alvo = porId(m.to); if (!alvo || alvo === c || emGuerra(p.pid, alvo.p.pid)) return;
      sala.guerras.push({ k: chave(p.pid, alvo.p.pid), a: p.pid, b: alvo.p.pid, desde: agora, placar: {} }); salvar();
      return todos({ t: 'guerra', a: p.id, b: alvo.p.id, an: p.reino || p.nome, bn: alvo.p.reino || alvo.p.nome });
    }
    case 'paz': { const alvo = porId(m.to); if (alvo && emGuerra(p.pid, alvo.p.pid)) enviar(alvo, { t: 'pazPedido', from: p.id, nome: p.reino || p.nome }); return; }
    case 'pazR': {
      const alvo = porId(m.to); if (!alvo || !emGuerra(p.pid, alvo.p.pid)) return;
      if (!m.ok) return enviar(alvo, { t: 'aviso', txt: `${p.nome} recusou a paz.` });
      sala.guerras = sala.guerras.filter(g => g.k !== chave(p.pid, alvo.p.pid)); salvar();
      return todos({ t: 'paz', a: p.id, b: alvo.p.id, an: p.reino || p.nome, bn: alvo.p.reino || alvo.p.nome });
    }
  }
}
function guerrasPub() {
  const id = pid => crypto.createHash('sha1').update(pid).digest('hex').slice(0, 10);
  return sala.guerras.map(g => [id(g.a), id(g.b)]);
}
// ---------- 10 vezes por segundo: posições de todos ----------
setInterval(() => {
  const l = [];
  for (const c of online()) if (c.p.mudou && c.p.st && c.p.nome) { c.p.mudou = false; const s = c.p.st; l.push([c.p.id, Math.round(s.x), Math.round(s.y), s.d, s.m, s.mo, Math.round(s.hp), Math.round(s.mh), s.lv, s.a, s.dead]); }
  if (l.length) todos({ t: 'sts', l });
}, 100);
// conexões mortas
setInterval(() => { const t = Date.now(); for (const c of conexoes) { if (t - c.vivo > 70000) fechar(c); else quadro(c, Buffer.alloc(0), 9); } }, 25000);

srv.listen(PORT, () => console.log(`Sala Oficial de Eldoria na porta ${PORT} (máx. ${MAX} jogadores)`));
