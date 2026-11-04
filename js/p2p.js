'use strict';
// =====================================================================
//  MULTIPLAYER P2P (PeerJS): até 4 jogadores na mesma sala com um código de convite.
//  Quem cria a sala é o anfitrião: o aparelho dele faz o papel do antigo servidor
//  (confere os golpes, guarda as guerras, repassa as posições). Os amigos se ligam
//  direto ao anfitrião pelo código, sem servidor próprio. O PeerJS só é baixado
//  quando alguém abre o multiplayer.
// =====================================================================
const P2P_MAX = 4;
const P2P_SEED = 777777;                     // todas as salas usam o mesmo mundo: o seu herói do multiplayer entra em qualquer sala
const P2P_PREFIXO = 'cronicas-eldoria-';
const P2P_CDN = ['https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.4/peerjs.min.js', 'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js', 'https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js'];
const P2P_LETRAS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   // sem 0/O e 1/I para não confundir

const P2P = {
  modo: null, codigo: null, peer: null, conn: null,
  // ---------- carregar a biblioteca ----------
  carregar(ok, erro) {
    if (typeof RTCPeerConnection === 'undefined') return erro('Este navegador não permite conexão direta entre aparelhos (WebRTC). Jogue pelo APK ou por um navegador comum.');
    if (window.Peer) return ok();
    let i = 0;
    const tenta = () => {
      if (i >= P2P_CDN.length) return erro('Não foi possível baixar o PeerJS. Confira a internet e tente de novo.');
      const s = document.createElement('script'); s.src = P2P_CDN[i++]; s.async = true;
      s.onload = () => window.Peer ? ok() : tenta(); s.onerror = () => { s.remove(); tenta(); };
      document.head.appendChild(s);
    };
    tenta();
  },
  novoCodigo() { let c = ''; const r = crypto.getRandomValues(new Uint8Array(6)); for (const b of r) c += P2P_LETRAS[b % P2P_LETRAS.length]; return c; },
  limpaCodigo(c) { return String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6); },
  meuCodigo() { let c = null; try { c = localStorage.getItem('eldoria_p2p_sala'); } catch (e) { } if (!c) { c = this.novoCodigo(); try { localStorage.setItem('eldoria_p2p_sala', c); } catch (e) { } } return c; },
  // ---------- criar a sala (anfitrião) ----------
  criar(cb, novo) {
    Rede.sair(true);
    if (novo) { try { localStorage.removeItem('eldoria_p2p_sala'); } catch (e) { } }
    const codigo = this.meuCodigo();
    Rede.status = 'Abrindo a sala...'; cb && cb();
    this.carregar(() => {
      const peer = new Peer(P2P_PREFIXO + codigo.toLowerCase(), { debug: 0 });
      this.peer = peer; this.modo = 'anfitriao'; this.codigo = codigo;
      const t0 = setTimeout(() => { if (!Rede.ws) { Rede.status = 'O serviço do PeerJS não respondeu. Confira a internet e tente de novo.'; this.fechar(); cb && cb(); } }, 15000);
      peer.on('open', () => {
        clearTimeout(t0);
        Sala.abrir(codigo);
        // o anfitrião também é um jogador: fala com a sala dentro do próprio aparelho
        const eu = { enviar: m => setTimeout(() => Rede.receber(m, cb), 0) };
        Sala.entrar(eu);
        const ws = { readyState: 1, send: s => { let m; try { m = JSON.parse(s); } catch (e) { return; } Sala.receber(eu, m); }, close: () => this.fechar() };
        Rede.ws = ws; Rede.salaNome = 'Sala ' + codigo;
        ws.send(JSON.stringify({ t: 'hello', pid: Rede.pid(), v: GAME_VERSION }));
      });
      peer.on('connection', conn => {
        // até a conexão abrir de verdade as mensagens ficam numa fila
        const fila = [], c = { conn, enviar: m => { if (!conn.open) { if (fila.length < 200) fila.push(m); return; } try { conn.send(m); } catch (e) { /* conexão caindo */ } } };
        conn.on('open', () => { for (const m of fila.splice(0)) try { conn.send(m); } catch (e) { } });
        Sala.entrar(c);   // já na chegada: o primeiro 'olá' do amigo pode vir antes do aviso de conexão aberta
        conn.on('data', m => { if (m && typeof m === 'object') Sala.receber(c, m); });
        conn.on('close', () => Sala.sair(c));
        conn.on('error', () => Sala.sair(c));
      });
      peer.on('disconnected', () => { if (this.peer === peer && !peer.destroyed) try { peer.reconnect(); } catch (e) { } });
      peer.on('error', e => {
        clearTimeout(t0);
        if (e && e.type === 'unavailable-id') { if (Rede.ws) return; Rede.status = 'Esse código já está em uso. Gerando um código novo...'; cb && cb(); this.fechar(); return setTimeout(() => this.criar(cb, true), 600); }
        if (!Rede.ws) { Rede.status = 'Erro ao abrir a sala: ' + ((e && e.type) || 'rede') + '. Tente de novo.'; this.fechar(); cb && cb(); }
      });
    }, msg => { Rede.status = msg; cb && cb(); });
  },
  // ---------- entrar numa sala com o código ----------
  entrar(codigoTxt, cb, tentativa = 0) {
    const codigo = this.limpaCodigo(codigoTxt);
    if (codigo.length !== 6) { Rede.status = 'O código de convite tem 6 letras ou números.'; cb && cb(); return; }
    Rede.sair(true);
    Rede.status = 'Procurando a sala ' + codigo + '...'; cb && cb();
    this.carregar(() => {
      const peer = new Peer({ debug: 0 });
      this.peer = peer; this.modo = 'cliente'; this.codigo = codigo;
      const falhou = (txt) => { if (Rede.ws) return; Rede.status = txt; this.fechar(); cb && cb(); };
      const t0 = setTimeout(() => falhou('A sala não respondeu. Confira o código e se o anfitrião está com o jogo aberto.'), 20000);
      peer.on('open', () => {
        const conn = peer.connect(P2P_PREFIXO + codigo.toLowerCase(), { reliable: true, serialization: 'json' });
        this.conn = conn;
        conn.on('open', () => {
          clearTimeout(t0);
          const ws = { readyState: 1, send: s => { let m; try { m = JSON.parse(s); } catch (e) { return; } try { conn.send(m); } catch (e) { } }, close: () => this.fechar() };
          Rede.ws = ws; Rede.salaNome = 'Sala ' + codigo;
          ws.send(JSON.stringify({ t: 'hello', pid: Rede.pid(), v: GAME_VERSION }));
        });
        conn.on('data', m => { if (m && typeof m === 'object') Rede.receber(m, cb); });
        conn.on('close', () => this.caiu(cb));
        conn.on('error', () => this.caiu(cb));
      });
      peer.on('error', e => {
        clearTimeout(t0);
        if (e && e.type === 'peer-unavailable') falhou(`Não existe nenhuma sala aberta com o código ${codigo}. Confira o código e peça ao anfitrião para abrir a sala.`);
        else if (!Rede.ws) falhou('Erro de conexão: ' + ((e && e.type) || 'rede') + '. Tente de novo.');
        else this.caiu(cb);
      });
    }, msg => { Rede.status = msg; cb && cb(); });
  },
  // o cliente perdeu a ligação com o anfitrião
  caiu(cb) {
    const ws = Rede.ws; if (!ws || this.modo !== 'cliente') return;
    const estava = Rede.on, codigo = this.codigo;
    Rede.ws = null; Rede.on = false;
    for (const o of Rede.outros.values()) Rede.tirar(o);
    Rede.outros.clear();
    this.fechar();
    if (estava && Game.mp) {
      Game.toast('A ligação com a sala caiu. Tentando voltar...', '#ff9080');
      let n = 0; const volta = () => { if (Rede.ws || !Game.mp) return; if (++n > 4) { Game.toast('Não foi possível voltar à sala. O anfitrião pode ter fechado o jogo.', '#ff8080'); Rede.atualizaBotao(); return; } this.entrar(codigo, () => { if (!Rede.ws) setTimeout(volta, 5000); }); };
      setTimeout(volta, 3000);
    } else { if (!/^Sala cheia/.test(Rede.status)) Rede.status = 'A sala foi fechada pelo anfitrião.'; cb && cb(); }
  },
  fechar() {
    if (this.modo === 'anfitriao') Sala.fechar();
    const p = this.peer; this.peer = null; this.conn = null;
    if (p) try { p.destroy(); } catch (e) { }
  }
};

// ---------------- a sala, rodando no aparelho do anfitrião ----------------
// (as mesmas regras do antigo servidor: confere golpes, guerras, posições e chat)
const Sala = {
  aberta: false, conexoes: new Set(), codigo: null, dados: null,
  chave: (a, b) => a < b ? a + '|' + b : b + '|' + a,
  idDe(pid) { return (hashStr(pid).toString(36) + hashStr(pid + '#').toString(36)).slice(0, 10); },
  abrir(codigo) {
    this.fechar(); this.aberta = true; this.codigo = codigo;
    let d = null; try { d = JSON.parse(localStorage.getItem('eldoria_p2p_dados_' + codigo)); } catch (e) { }
    this.dados = Object.assign({ guerras: [], abates: {} }, d || {});
    this.posT = setInterval(() => this.posicoes(), 100);
  },
  fechar() {
    if (!this.aberta) return;
    this.todos({ t: 'aviso', txt: 'O anfitrião fechou a sala.' });
    this.aberta = false; clearInterval(this.posT);
    for (const c of this.conexoes) if (c.conn) try { c.conn.close(); } catch (e) { }
    this.conexoes.clear();
  },
  salvar() { try { localStorage.setItem('eldoria_p2p_dados_' + this.codigo, JSON.stringify(this.dados)); } catch (e) { } },
  emGuerra(a, b) { return this.dados.guerras.some(g => g.k === this.chave(a, b)); },
  entrar(c) { c.cota = 0; c.cotaT = Date.now(); c.hits = []; c.chatT = 0; c.p = null; this.conexoes.add(c); },
  online() { return [...this.conexoes].filter(c => c.p); },
  porId(id) { return this.online().find(c => c.p.id === id); },
  enviar(c, m) { c.enviar(m); },
  todos(m, exceto) { for (const c of this.conexoes) if (c.p && c !== exceto) c.enviar(m); },
  sair(c) {
    if (!this.conexoes.has(c)) return;
    this.conexoes.delete(c);
    if (c.p) { this.todos({ t: 'leave', id: c.p.id }); if (c.p.nome) this.todos({ t: 'aviso', txt: `${c.p.nome} saiu da sala.` }); }
  },
  limpa: (s, n) => String(s || '').replace(/[<>\u0000-\u001f]/g, '').trim().slice(0, n),
  num: (v, a, b) => { v = Number(v); return Number.isFinite(v) ? Math.max(a, Math.min(b, v)) : a; },
  publico(p) { return { id: p.id, nome: p.nome, st: p.st, look: p.look, w: p.w, reino: p.reino, cor: p.cor, vila: p.vila, abates: this.dados.abates[p.pid] || 0 }; },
  guerrasPub() { return this.dados.guerras.map(g => [this.idDe(g.a), this.idDe(g.b)]); },
  receber(c, m) {
    if (!this.aberta || !this.conexoes.has(c)) return;
    const agora = Date.now(), L = this.limpa, N = this.num;
    if (agora - c.cotaT > 1000) { c.cotaT = agora; c.cota = 0; }
    if (++c.cota > 80) return;
    if (m.t === 'ping') return this.enviar(c, { t: 'pong' });
    if (m.t === 'hello') {
      if (c.p) return;
      const pid = L(m.pid, 64); if (pid.length < 16) return;
      for (const o of this.online()) if (o.p.pid === pid && o !== c) { this.sair(o); if (o.conn) try { o.conn.close(); } catch (e) { } }
      if (this.online().length >= P2P_MAX) { this.enviar(c, { t: 'full', max: P2P_MAX }); return setTimeout(() => { if (c.conn) try { c.conn.close(); } catch (e) { } this.sair(c); }, 300); }
      const id = this.idDe(pid);
      c.p = { pid, id, nome: '', st: null, look: null, w: null, reino: '', cor: '#ffffff', vila: null };
      return this.enviar(c, { t: 'welcome', id, seed: P2P_SEED, max: P2P_MAX, sala: 'Sala ' + this.codigo, players: this.online().filter(o => o !== c && o.p.nome).map(o => this.publico(o.p)), wars: this.guerrasPub() });
    }
    const p = c.p; if (!p) return;
    switch (m.t) {
      case 'perfil': {
        const novo = !p.nome;
        p.nome = L(m.nome, 20) || 'Viajante'; p.reino = L(m.reino, 40); p.cor = /^#[0-9a-f]{6}$/i.test(m.cor) ? m.cor : '#ffffff';
        p.vila = m.vila && typeof m.vila === 'object' ? { nome: L(m.vila.nome, 30), cx: N(m.vila.cx, 0, 30000), cy: N(m.vila.cy, 0, 30000) } : null;
        if (m.look && typeof m.look === 'object' && JSON.stringify(m.look).length < 2000) p.look = m.look;
        p.w = L(m.w, 40) || null;
        this.todos(novo ? { t: 'join', p: this.publico(p) } : { t: 'perfil', p: this.publico(p) }, c);
        if (novo) this.todos({ t: 'aviso', txt: `${p.nome} entrou na sala.` }, c);
        return;
      }
      case 'st': p.st = { x: N(m.x, 0, 400000), y: N(m.y, 0, 400000), d: L(m.d, 6), m: m.m ? 1 : 0, mo: m.mo ? 1 : 0, hp: N(m.hp, 0, 1e6), mh: N(m.mh, 1, 1e6), lv: N(m.lv, 1, 999), a: m.a === 'w' ? 'w' : '', dead: m.dead ? 1 : 0 }; p.mudou = true; return;
      case 'atk': if (p.st) this.todos({ t: 'atk', id: p.id, ang: N(m.ang, -10, 10), arc: N(m.arc, 0, 7), dur: N(m.dur, 0.05, 1) }, c); return;
      case 'proj': if (p.st) this.todos({ t: 'proj', id: p.id, x: N(m.x, 0, 400000), y: N(m.y, 0, 400000), ang: N(m.ang, -10, 10), kind: L(m.kind, 16), spd: N(m.spd, 10, 900), life: N(m.life, 0.05, 3), color: L(m.color, 9), r: N(m.r, 1, 12) }, c); return;
      case 'hit': {
        const alvo = this.porId(m.to); if (!alvo || !p.st || !alvo.p.st) return;
        if (!this.emGuerra(p.pid, alvo.p.pid) || p.st.a !== 'w' || alvo.p.st.a !== 'w' || p.st.dead || alvo.p.st.dead) return;
        if (Math.hypot(p.st.x - alvo.p.st.x, p.st.y - alvo.p.st.y) > 650) return;
        c.hits = c.hits.filter(t => agora - t < 1000); if (c.hits.length >= 10) return; c.hits.push(agora);
        return this.enviar(alvo, { t: 'hurt', from: p.id, dmg: N(m.dmg, 1, 400), kx: N(m.kx, -600, 600), ky: N(m.ky, -600, 600), elem: L(m.elem, 10), crit: m.crit ? 1 : 0 });
      }
      case 'dead': {
        const k = this.porId(m.by);
        if (k && this.emGuerra(k.p.pid, p.pid)) {
          this.dados.abates[k.p.pid] = (this.dados.abates[k.p.pid] || 0) + 1;
          const g = this.dados.guerras.find(g => g.k === this.chave(k.p.pid, p.pid)); if (g) g.placar[k.p.pid] = (g.placar[k.p.pid] || 0) + 1;
          this.salvar(); this.todos({ t: 'kill', killer: k.p.id, victim: p.id, kn: k.p.nome, vn: p.nome });
        }
        return;
      }
      case 'chat': { if (agora - c.chatT < 800) return; c.chatT = agora; const txt = L(m.txt, 140); if (!txt) return; return this.todos({ t: 'chat', id: p.id, nome: p.nome, txt }); }
      case 'guerra': {
        const alvo = this.porId(m.to); if (!alvo || alvo === c || this.emGuerra(p.pid, alvo.p.pid)) return;
        this.dados.guerras.push({ k: this.chave(p.pid, alvo.p.pid), a: p.pid, b: alvo.p.pid, desde: agora, placar: {} }); this.salvar();
        return this.todos({ t: 'guerra', a: p.id, b: alvo.p.id, an: p.reino || p.nome, bn: alvo.p.reino || alvo.p.nome });
      }
      case 'paz': { const alvo = this.porId(m.to); if (alvo && this.emGuerra(p.pid, alvo.p.pid)) this.enviar(alvo, { t: 'pazPedido', from: p.id, nome: p.reino || p.nome }); return; }
      case 'pazR': {
        const alvo = this.porId(m.to); if (!alvo || !this.emGuerra(p.pid, alvo.p.pid)) return;
        if (!m.ok) return this.enviar(alvo, { t: 'aviso', txt: `${p.nome} recusou a paz.` });
        this.dados.guerras = this.dados.guerras.filter(g => g.k !== this.chave(p.pid, alvo.p.pid)); this.salvar();
        return this.todos({ t: 'paz', a: p.id, b: alvo.p.id, an: p.reino || p.nome, bn: alvo.p.reino || alvo.p.nome });
      }
    }
  },
  // 10 vezes por segundo: as posições de todos
  posicoes() {
    const l = [];
    for (const c of this.online()) if (c.p.mudou && c.p.st && c.p.nome) { c.p.mudou = false; const s = c.p.st; l.push([c.p.id, Math.round(s.x), Math.round(s.y), s.d, s.m, s.mo, Math.round(s.hp), Math.round(s.mh), s.lv, s.a, s.dead]); }
    if (l.length) this.todos({ t: 'sts', l });
  }
};
