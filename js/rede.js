'use strict';
// ===================== MULTIPLAYER: SALA OFICIAL =====================
// Até 20 jogadores no mesmo mundo. Cada um vê os outros andando, conversa pelo chat e pode declarar
// guerra a outro jogador: em guerra, os golpes, flechas e magias acertam de verdade (o servidor confere).
// Monstros, cidades e reinos de NPCs continuam sendo simulados em cada aparelho.
const REDE_SERVIDOR = 'wss://cronicas-de-eldoria.onrender.com/ws';   // endereço da Sala Oficial (pode ser trocado na tela do multiplayer)

class Remoto extends Actor {
  constructor(p) {
    super(p.st ? p.st.x : 0, p.st ? p.st.y : 0);
    this.remote = true; this.id = p.id; this.team = 'rede'; this.r = 5; this.dir = 'down';
    this.tx = this.x; this.ty = this.y; this.hp = 100; this.maxHp = 100; this.lv = 1;
    this.aplicar(p);
  }
  aplicar(p) {
    this.nome = p.nome || this.nome || 'Viajante'; this.name = this.nome;
    this.reino = p.reino || ''; this.cor = p.cor || '#ffffff'; this.vila = p.vila || null; this.abates = p.abates || 0;
    if (p.look && JSON.stringify(p.look) !== this._lk) { this._lk = JSON.stringify(p.look); this.look = p.look; this.S = Sprites.actor(p.look); this.h = this.S.h; }
    if (!this.S) { this.look = { k: 'hum', skin: '#d8a070', body: '#6a5a8a', legs: '#3a3028', hair: '#3a2a1a' }; this.S = Sprites.actor(this.look); this.h = this.S.h; }
    if (p.w !== undefined) { const d = p.w && ITEMS[p.w]; this.wclass = d ? d.wclass : null; this.wimg = d ? Sprites.weapon(d.bayonet ? 'musketb' : d.wclass, d.icon.c, d.icon.g) : null; }
    if (p.st) this.estado(p.st);
  }
  estado(s) {
    if (Math.hypot(s.x - this.x, s.y - this.y) > 260) { this.x = s.x; this.y = s.y; }
    this.tx = s.x; this.ty = s.y; this.dir = s.d || this.dir; this.netMoving = !!s.m; this.mounted = !!s.mo;
    this.hp = s.hp; this.maxHp = s.mh; this.lv = s.lv; this.area = s.a; this.morto = !!s.dead;
    if (this.dir === 'left' || this.dir === 'right') this.lastH = this.dir;
  }
  update(dt) {
    const d = Math.hypot(this.tx - this.x, this.ty - this.y);
    if (d > 0.5) { const k = Math.min(1, dt * 12); this.x += (this.tx - this.x) * k; this.y += (this.ty - this.y) * k; }
    this.moving = this.netMoving || d > 2;
    if (this.moving) this.anim += dt;
    if (this.swing) { this.swing.t += dt; if (this.swing.t >= this.swing.dur) this.swing = null; }
    if (this.chatT > 0) this.chatT -= dt;
    if (this.flash > 0) this.flash -= dt;
  }
  die() { }
  get hidden() { return this.morto; }
  swingAngle() { if (!this.swing) return null; const k = this.swing.t / this.swing.dur; return this.swing.ang - this.swing.arc / 2 + this.swing.arc * smooth(Math.min(1, k)); }
  draw(ctx, camX, camY) {
    if (this.mounted) {
      const H = Sprites.horse('cavalo'), hk = this.dir === 'left' || this.dir === 'right' ? this.dir : this.lastH;
      const img = H[hk][this.moving ? 1 + (Math.floor(this.anim * 6) % 2) : 0];
      this.drawShadow(ctx, camX, camY, 20);
      ctx.drawImage(img, Math.round(this.x - img.width / 2 - camX), Math.round(this.y - img.height + 3 - camY));
      this.z = 9; const sd = this.dir; this.dir = hk; this.drawBody(ctx, camX, camY, this.S); this.dir = sd; this.z = 0;
    } else {
      this.drawShadow(ctx, camX, camY);
      const sa = this.swingAngle();
      if (this.dir === 'up') this.drawWeapon(ctx, camX, camY, this.wimg, this.wclass, sa);
      this.drawBody(ctx, camX, camY, this.S);
      if (this.dir !== 'up') this.drawWeapon(ctx, camX, camY, this.wimg, this.wclass, sa);
    }
    // nome, nível, reino e vida
    const guerra = Rede.emGuerra(this.id), x = Math.round(this.x - camX), y = Math.round(this.y - (this.h || 28) - 6 - camY - (this.mounted ? 9 : 0));
    ctx.font = '10px VT323, monospace'; ctx.textAlign = 'center';
    const t = `${this.nome} Nv${this.lv}`;
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; const w = ctx.measureText(t).width + 4; ctx.fillRect(x - w / 2, y - 9, w, 10);
    ctx.fillStyle = guerra ? '#ff6050' : '#a0e8ff'; ctx.fillText(t, x, y - 1);
    if (this.reino) { ctx.fillStyle = this.cor; ctx.fillRect(x - w / 2 - 4, y - 8, 3, 8); }
    if (guerra || this.hp < this.maxHp) { const f = clamp(this.hp / this.maxHp, 0, 1); ctx.fillStyle = '#200'; ctx.fillRect(x - 12, y + 1, 24, 3); ctx.fillStyle = guerra ? '#e03030' : '#40c040'; ctx.fillRect(x - 12, y + 1, Math.round(24 * f), 3); }
    if (this.chatT > 0 && this.chat) {
      const cw = Math.min(150, ctx.measureText(this.chat).width + 8), cy = y - 14;
      ctx.fillStyle = 'rgba(255,255,240,0.95)'; ctx.fillRect(x - cw / 2, cy - 10, cw, 12); ctx.fillRect(x - 2, cy + 2, 4, 2);
      ctx.fillStyle = '#1a1020'; ctx.fillText(this.chat, x, cy - 1, 144);
    }
    ctx.textAlign = 'left';
  }
}

const Rede = {
  ws: null, on: false, pendente: false, id: null, seed: null, max: 20, outros: new Map(), guerras: new Set(), log: [], status: '',
  pid() {
    let p = null; try { p = localStorage.getItem('eldoria_mp_pid'); } catch (e) { }
    if (!p) { p = Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join(''); try { localStorage.setItem('eldoria_mp_pid', p); } catch (e) { } }
    return p;
  },
  padrao() {
    // jogando pelo próprio servidor (navegador): a sala está no mesmo endereço
    try { const h = new URL(REDE_SERVIDOR.replace(/^ws/, 'http')).host; if (location.protocol.startsWith('http') && (location.host === h || /:8790$/.test(location.host))) return (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + '/ws'; } catch (e) { }
    return REDE_SERVIDOR;
  },
  url() { let u = null; try { u = localStorage.getItem('eldoria_mp_url'); } catch (e) { } return u || this.padrao(); },
  emGuerra(id) { return this.guerras.has(this.k(this.id, id)); },
  k(a, b) { return a < b ? a + '|' + b : b + '|' + a; },
  // ---------- conexão ----------
  conectar(url, cb) {
    this.sair(true);
    try { localStorage.setItem('eldoria_mp_url', url); } catch (e) { }
    this.status = 'Conectando...'; cb && cb();
    let ws;
    try { ws = new WebSocket(url); } catch (e) { this.status = 'Endereço inválido.'; cb && cb(); return; }
    this.ws = ws;
    const t0 = setTimeout(() => { if (ws.readyState !== 1) { this.status = 'O servidor não respondeu. Ele pode estar acordando (servidores gratuitos dormem): tente de novo em 1 minuto.'; try { ws.close(); } catch (e) { } cb && cb(); } }, 15000);
    ws.onopen = () => { clearTimeout(t0); this.send({ t: 'hello', pid: this.pid(), v: GAME_VERSION }); };
    ws.onmessage = (e) => { let m; try { m = JSON.parse(e.data); } catch (er) { return; } this.receber(m, cb); };
    ws.onclose = () => {
      clearTimeout(t0);
      if (this.ws !== ws) return;
      const estava = this.on;
      this.ws = null; this.on = false;
      for (const o of this.outros.values()) this.tirar(o);
      this.outros.clear();
      if (estava) { Game.toast('Conexão com a Sala Oficial perdida. Tentando de novo...', '#ff9080'); this.reconectar(); }
      else if (!this.status.startsWith('Sala cheia')) { if (this.status === 'Conectando...') this.status = `Não foi possível conectar a ${url}. O servidor da Sala Oficial precisa estar ligado (no Render) e o endereço precisa estar certo. Se ele acabou de ser criado ou estava dormindo, espere 1 minuto e tente de novo.`; cb && cb(); }
    };
    ws.onerror = () => { };
  },
  reconectar() {
    if (this.recT) return;
    this.recT = setTimeout(() => { this.recT = null; if (!Game.mp || this.ws) return; this.conectar(this.url(), () => { if (this.on) return; if (!this.ws) this.reconectar(); }); }, 4000);
  },
  sair(silencioso) {
    if (this.recT) { clearTimeout(this.recT); this.recT = null; }
    const ws = this.ws; this.ws = null; this.on = false;
    if (ws) try { ws.close(); } catch (e) { }
    for (const o of this.outros.values()) this.tirar(o);
    this.outros.clear(); this.guerras.clear();
    if (!silencioso) { Game.mp = false; this.pendente = false; }
    this.atualizaBotao();
  },
  send(m) { if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(m)); },
  receber(m, cb) {
    const G = Game;
    switch (m.t) {
      case 'welcome': {
        this.id = m.id; this.seed = m.seed; this.max = m.max;
        this.guerras = new Set(m.wars.map(([a, b]) => this.k(a, b)));
        for (const p of m.players) this.outros.set(p.id, new Remoto(p));
        this.status = `Conectado à ${m.sala}: ${m.players.length + 1}/${m.max} jogadores.`;
        if (G.mp && G.started) { this.on = true; this.perfil(); G.toast('Reconectado à Sala Oficial.', '#a0ffa0'); }
        else this.pendente = true;
        cb && cb();
        break;
      }
      case 'full': this.status = `Sala cheia: já há ${m.max} jogadores. Tente mais tarde.`; cb && cb(); break;
      case 'join': this.outros.set(m.p.id, new Remoto(m.p)); break;
      case 'perfil': { const o = this.outros.get(m.p.id); if (o) o.aplicar(m.p); else this.outros.set(m.p.id, new Remoto(m.p)); break; }
      case 'leave': { const o = this.outros.get(m.id); if (o) { this.tirar(o); this.outros.delete(m.id); } break; }
      case 'sts': for (const [id, x, y, d, mv, mo, hp, mh, lv, a, dead] of m.l) { const o = this.outros.get(id); if (o) o.estado({ x, y, d, m: mv, mo, hp, mh, lv, a, dead }); } break;
      case 'atk': { const o = this.outros.get(m.id); if (o) { o.swing = { t: 0, dur: m.dur, ang: m.ang, arc: m.arc }; o.dir = Math.abs(Math.cos(m.ang)) > Math.abs(Math.sin(m.ang)) ? (Math.cos(m.ang) > 0 ? 'right' : 'left') : (Math.sin(m.ang) > 0 ? 'down' : 'up'); } break; }
      case 'proj': { const o = this.outros.get(m.id); if (o && G.level && G.level.isWorld && o.area === 'w') Combat.projectile(o, m.x, m.y, m.ang, m.kind, 0, { spd: m.spd, life: m.life, color: m.color || undefined, r: m.r, rede: true }); break; }
      case 'hurt': {
        const P = G.player, o = this.outros.get(m.from); if (!P || P.dead || !G.started) break;
        const ang = Math.atan2(m.ky, m.kx);
        Combat.damage(P, m.dmg, { src: o || null, elem: m.elem || 'phys', crit: !!m.crit, kb: { x: Math.cos(ang) * 120, y: Math.sin(ang) * 120 }, rede: true });
        break;
      }
      case 'kill': {
        const eu = m.killer === this.id, morri = m.victim === this.id;
        G.toast(`⚔ ${m.kn} derrotou ${m.vn}!`, eu ? '#a0ffa0' : morri ? '#ff8070' : '#ffd0a0');
        this.addLog(`⚔ ${m.kn} derrotou ${m.vn}`, '#ffb080');
        if (eu) { G.centerMsg('INIMIGO DERROTADO!', m.vn); G.player.stats.pvp = (G.player.stats.pvp || 0) + 1; }
        break;
      }
      case 'chat': {
        const o = this.outros.get(m.id); if (o) { o.chat = m.txt; o.chatT = 6; }
        this.addLog(`${m.nome}: ${m.txt}`, m.id === this.id ? '#ffe0a0' : '#e8f0ff');
        break;
      }
      case 'guerra': {
        this.guerras.add(this.k(m.a, m.b));
        const eu = m.a === this.id || m.b === this.id;
        const txt = `⚔ ${m.an} declarou guerra a ${m.bn}!`;
        this.addLog(txt, '#ff9080');
        if (eu) { G.centerMsg('GUERRA ENTRE JOGADORES!', `${m.an} × ${m.bn}`); Sfx.play('shout'); } else G.toast(txt, '#ffb090');
        break;
      }
      case 'paz': {
        this.guerras.delete(this.k(m.a, m.b));
        const txt = `🕊 Paz entre ${m.an} e ${m.bn}.`;
        this.addLog(txt, '#a0ffa0');
        if (m.a === this.id || m.b === this.id) G.centerMsg('PAZ!', `${m.an} e ${m.bn}`); else G.toast(txt, '#a0ffa0');
        break;
      }
      case 'pazPedido': {
        const o = this.outros.get(m.from);
        UI.dialog(m.nome, o ? o.look : null, `<b>${esc(m.nome)}</b> propõe paz. Aceitar?`, [
          { label: '🕊 Aceitar a paz', cls: 'gold', fn: () => { this.send({ t: 'pazR', to: m.from, ok: true }); UI.close(); } },
          { label: 'Recusar', fn: () => { this.send({ t: 'pazR', to: m.from, ok: false }); UI.close(); } }
        ]);
        break;
      }
      case 'aviso': this.addLog(m.txt, '#c0c0d0'); G.toast(m.txt, '#d0d0e0'); break;
    }
  },
  // ---------- dentro do jogo ----------
  entrou() {
    if (!this.pendente || !this.ws) return;
    this.pendente = false; this.on = true; Game.mp = true;
    this.perfil();
    Game.toast(`Você está na Sala Oficial (${this.outros.size + 1}/${this.max}).`, '#a0ffa0');
    this.addLog('Bem-vindo(a) à Sala Oficial! Toque em 💬 para ver os jogadores e conversar.', '#ffe0a0');
  },
  perfil() {
    const P = Game.player; if (!P) return;
    const V = P.vila, R = P.reino;
    this._lk = JSON.stringify(P.look) + (P.equip.weapon ? P.equip.weapon.id : '');
    this.send({ t: 'perfil', nome: P.name, look: P.look, w: P.equip.weapon ? P.equip.weapon.id : null, reino: R && R.status !== 'vassalo' && V ? Reino.nome() : '', cor: R ? R.cor : '#ffffff', vila: V ? { nome: V.nome, cx: V.cx, cy: V.cy } : null });
  },
  tirar(o) { const i = Game.actors ? Game.actors.indexOf(o) : -1; if (i >= 0) Game.actors.splice(i, 1); },
  tick(dt) {
    const G = Game, P = G.player;
    this.atualizaBotao();
    if (!this.on || !G.started || !P) return;
    // o estado do jogador 10 vezes por segundo
    this.stT = (this.stT || 0) - dt;
    const area = G.level && G.level.isWorld ? 'w' : '';
    const s = [Math.round(P.x), Math.round(P.y), P.dir, P.moving ? 1 : 0, P.mounted ? 1 : 0, Math.round(P.hp), P.stat.maxHp, P.level, area, P.dead ? 1 : 0].join();
    if (this.stT <= 0 && (s !== this._st || this.stT < -1)) { this.stT = 0.1; this._st = s; this.send({ t: 'st', x: P.x, y: P.y, d: P.dir, m: P.moving, mo: P.mounted, hp: P.hp, mh: P.stat.maxHp, lv: P.level, a: area, dead: P.dead }); }
    this.pingT = (this.pingT || 20) - dt; if (this.pingT <= 0) { this.pingT = 20; this.send({ t: 'ping' }); }
    // aparência e reino mudaram?
    this.lkT = (this.lkT || 0) - dt;
    if (this.lkT <= 0) { this.lkT = 1; const lk = JSON.stringify(P.look) + (P.equip.weapon ? P.equip.weapon.id : '') + (P.reino ? P.reino.status : '') + (P.vila ? P.vila.nome : ''); if (lk !== this._lk2) { this._lk2 = lk; this.perfil(); } }
    // os outros jogadores existem no mundo aberto
    for (const o of this.outros.values()) {
      const deve = area === 'w' && o.area === 'w' && !o.morto && o.S;
      const esta = G.actors.includes(o);
      if (deve && !esta) G.actors.push(o); else if (!deve && esta) this.tirar(o);
    }
    // ataque de perto: avisa os outros para mostrarem o golpe
    if (P.swing && P.swing !== this._sw) { this._sw = P.swing; this.send({ t: 'atk', ang: P.swing.ang, arc: P.swing.arc, dur: P.swing.dur }); }
  },
  // golpe num jogador remoto: o dano vai pelo servidor (que confere se há guerra)
  acertar(t, amount, o) {
    if (!this.emGuerra(t.id) || t.morto) return 0;
    const dmg = Math.max(1, Math.round(amount));
    const src = o.src || Game.player, ang = angleTo(src.x || t.x, src.y || t.y, t.x, t.y);
    this.send({ t: 'hit', to: t.id, dmg, kx: Math.cos(ang) * 100, ky: Math.sin(ang) * 100, elem: o.elem || 'phys', crit: !!o.crit });
    t.flash = 0.1;
    Game.floater(t.x + (Math.random() - 0.5) * 6, t.y - (t.h || 18), String(dmg) + (o.crit ? '!' : ''), o.crit ? '#ffe040' : '#ffffff', o.crit ? 2 : 1);
    if (!o.dot) { Game.burst(t.x, t.y - 8, '#c02020', 4); Sfx.play(o.crit ? 'crit' : 'hit'); Juice.hit(t, o, dmg); }
    return dmg;
  },
  projetil(p) { if (this.on && p.src === Game.player && !p.rede) this.send({ t: 'proj', x: p.x, y: p.y, ang: p.ang, kind: p.kind, spd: Math.hypot(p.vx, p.vy), life: p.life, color: p.color || '', r: p.r }); },
  morri(killer) { if (this.on && killer && killer.remote) this.send({ t: 'dead', by: killer.id }); },
  // ---------- telas ----------
  addLog(txt, cor) {
    this.log.push({ txt, cor, t: Date.now() }); if (this.log.length > 40) this.log.shift();
    let el = document.getElementById('chatlog');
    if (!el) { const hud = document.getElementById('hud'); if (!hud) return; el = document.createElement('div'); el.id = 'chatlog'; hud.appendChild(el); }
    el.innerHTML = this.log.slice(-5).map(l => `<div style="color:${l.cor}">${esc(l.txt)}</div>`).join('');
    el.classList.remove('fade'); void el.offsetWidth; el.classList.add('fade');
  },
  atualizaBotao() {
    let b = this.btn;
    const show = !!(Game.mp && Game.started);
    if (!b) { if (!show) return; const hud = document.getElementById('hud'); if (!hud) return; b = this.btn = document.createElement('button'); b.id = 'b-sala'; hud.appendChild(b); b.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); this.painel(); }); }
    const txt = !show ? '' : this.on ? `💬 Sala ${this.outros.size + 1}/${this.max}` : '💬 offline';
    if (txt !== this._bt) { this._bt = txt; b.textContent = txt; b.classList.toggle('hidden', !show); }
  },
  painel() {
    if (!Game.mp) return;
    const P = Game.player, l = [...this.outros.values()].sort((a, b) => dist(a.x, a.y, P.x, P.y) - dist(b.x, b.y, P.x, P.y));
    const lista = l.map(o => `${this.emGuerra(o.id) ? '⚔ ' : ''}<b style="color:${this.emGuerra(o.id) ? '#ff8070' : '#a0e8ff'}">${esc(o.nome)}</b> Nv${o.lv}${o.reino ? ` • <span style="color:${o.cor}">${esc(o.reino)}</span>` : ''} <span class="dim small">${o.area === 'w' ? Math.round(dist(o.x, o.y, P.x, P.y) / 16 * 2) + ' m' : 'em um interior'}</span>`).join('<br>') || '<span class="dim">Ninguém mais está na sala agora.</span>';
    const msgs = this.log.slice(-8).map(m => `<div style="color:${m.cor}" class="small">${esc(m.txt)}</div>`).join('');
    UI.dialog('Sala Oficial', null, `${this.on ? `<span class="good">${this.outros.size + 1}/${this.max} jogadores online</span>` : '<span class="bad">Desconectado</span>'}<br>${lista}<div class="chatbox">${msgs}</div><input id="chat-in" maxlength="140" placeholder="Escreva uma mensagem..." style="width:100%">`,
      [{ label: '💬 Enviar', cls: 'gold', fn: () => { const i = document.getElementById('chat-in'); const v = i && i.value.trim(); if (v) this.send({ t: 'chat', txt: v }); this.painel(); } }]
        .concat(l.slice(0, 6).map(o => ({ label: `${this.emGuerra(o.id) ? '⚔ ' : ''}${o.nome}`, fn: () => this.menu(o) })))
        .concat([{ label: 'Fechar' }]));
    const i = document.getElementById('chat-in'); if (i) i.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') { const v = i.value.trim(); if (v) this.send({ t: 'chat', txt: v }); this.painel(); } });
  },
  menu(o) {
    const g = this.emGuerra(o.id);
    const txt = `<b>${esc(o.nome)}</b> — nível ${o.lv}${o.reino ? `<br><span style="color:${o.cor}">${esc(o.reino)}</span>` : ''}${o.vila ? `<br>Vila: ${esc(o.vila.nome)}` : ''}<br>Vitórias em guerra: ${o.abates || 0}<br>${g ? '<span class="bad">⚔ Vocês estão em guerra</span>' : '<span class="good">Em paz com você</span>'}`;
    const opts = [];
    if (!g) opts.push({ label: '⚔ Declarar guerra', cls: 'danger', fn: () => UI.confirm(`Declarar guerra a <b>${esc(o.nome)}</b>?<br><span class="dim">Em guerra, vocês podem se ferir e se derrotar no mundo aberto. Seus soldados também atacam.</span>`, () => { this.send({ t: 'guerra', to: o.id }); UI.close(); }, () => this.menu(o)) });
    else opts.push({ label: '🕊 Propor paz', cls: 'gold', fn: () => { this.send({ t: 'paz', to: o.id }); Game.toast(`Proposta de paz enviada a ${o.nome}.`, '#a0ffa0'); UI.close(); } });
    opts.push({ label: '💬 Mandar mensagem', fn: () => this.painel() });
    opts.push({ label: 'Voltar', fn: () => this.painel() });
    UI.dialog(o.nome, o.look, txt, opts);
  },
  drawMap(ctx, toS) {
    if (!Game.mp) return;
    ctx.font = 'bold 13px VT323, monospace'; ctx.textAlign = 'center';
    for (const o of this.outros.values()) {
      if (o.vila) { const [x, y] = toS(o.vila.cx, o.vila.cy); ctx.fillStyle = '#000'; ctx.fillRect(x - 5, y - 5, 10, 10); ctx.fillStyle = o.cor; ctx.fillRect(x - 4, y - 4, 8, 8); ctx.fillStyle = '#fff'; ctx.fillText(o.vila.nome, x, y - 8); }
      if (o.area !== 'w') continue;
      const [x, y] = toS(o.x / 16, o.y / 16);
      ctx.fillStyle = '#000'; ctx.fillRect(x - 3, y - 3, 7, 7); ctx.fillStyle = this.emGuerra(o.id) ? '#ff4040' : '#40d0ff'; ctx.fillRect(x - 2, y - 2, 5, 5);
      ctx.fillStyle = '#fff'; ctx.fillText(o.nome, x, y + 14);
    }
    ctx.textAlign = 'left';
  }
};
