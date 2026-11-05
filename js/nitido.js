'use strict';
// =====================================================================
//  TEXTO NÍTIDO
//  O jogo é desenhado em pixels grandes e ampliado; o texto pequeno ficava
//  borrado. Os balões de fala (NPCs e jogadores) e os nomes dos jogadores
//  agora são desenhados numa camada por cima, na resolução da tela.
//  A sua própria mensagem do chat também aparece num balão em cima de você.
// =====================================================================
const Nitido = {
  cv: null, ctx: null, fila: [],
  init() {
    if (this.cv) return;
    const base = document.getElementById('cv'); if (!base) return;
    const cv = document.createElement('canvas'); cv.id = 'cv-nitido';
    cv.style.cssText = 'position:absolute;inset:0;pointer-events:none;display:block';
    base.parentNode.insertBefore(cv, base.nextSibling);
    this.cv = cv; this.ctx = cv.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  },
  resize() {
    if (!this.cv) return;
    const d = window.devicePixelRatio || 1, w = window.innerWidth, h = window.innerHeight;
    this.cv.width = Math.round(w * d); this.cv.height = Math.round(h * d);
    this.cv.style.width = w + 'px'; this.cv.style.height = h + 'px';
  },
  // quantos pixels da tela vale um pixel do jogo
  k() { return this.cv && Game.vw ? this.cv.width / Game.vw : 1; },
  // balão com a ponta em (x, y), em pixels do jogo (já com a câmera)
  balao(x, y, txt, o = {}) { if (txt) this.fila.push({ t: 'b', x, y, txt: String(txt), o }); },
  // etiqueta de nome centrada em x, com a base em y
  nome(x, y, txt, o = {}) { if (txt) this.fila.push({ t: 'n', x, y, txt: String(txt), o }); },
  fonte(px) { return `${px}px VT323, monospace`; },
  linhas(ctx, txt, max) {
    const pal = txt.split(' '), out = [];
    let l = '';
    for (const p of pal) {
      const t = l ? l + ' ' + p : p;
      if (ctx.measureText(t).width > max && l) { out.push(l); l = p; } else l = t;
      if (out.length >= 3) break;
    }
    if (l && out.length < 3) out.push(l);
    return out;
  },
  desenhar() {
    const c = this.ctx; if (!c) { this.fila.length = 0; return; }
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, this.cv.width, this.cv.height);
    if (!this.fila.length) return;
    const k = this.k(), fs = Math.max(10, Math.round(10 * k)), lh = Math.round(fs * 0.95), pad = Math.round(3 * k);
    c.font = this.fonte(fs); c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    for (const it of this.fila) {
      const x = Math.round(it.x * k), y = Math.round(it.y * k), o = it.o;
      if (it.t === 'b') {
        const ls = this.linhas(c, it.txt, (o.max || 150) * k);
        const w = Math.max(...ls.map(l => c.measureText(l).width)) + pad * 2, h = ls.length * lh + pad * 1.4;
        const bx = Math.round(x - w / 2), by = Math.round(y - h - 2 * k), r = Math.round(3 * k);
        c.fillStyle = o.fundo || 'rgba(250,246,232,0.96)'; c.strokeStyle = o.borda || '#3a2a1a'; c.lineWidth = Math.max(1, Math.round(k * 0.7));
        c.beginPath();
        if (c.roundRect) c.roundRect(bx, by, w, h, r); else c.rect(bx, by, w, h);
        c.fill(); c.stroke();
        // a pontinha do balão
        c.beginPath(); c.moveTo(x - 3 * k, by + h - 1); c.lineTo(x, y); c.lineTo(x + 3 * k, by + h - 1); c.closePath(); c.fill();
        c.beginPath(); c.moveTo(x - 3 * k, by + h); c.lineTo(x, y); c.lineTo(x + 3 * k, by + h); c.stroke();
        c.fillStyle = o.cor || '#2a1a10';
        ls.forEach((l, i) => c.fillText(l, x, by + pad * 0.7 + lh * (i + 1) - lh * 0.18));
      } else {
        const w = c.measureText(it.txt).width + pad * 2, h = lh + pad * 0.6;
        c.fillStyle = o.fundo || 'rgba(0,0,0,0.6)'; c.fillRect(Math.round(x - w / 2), Math.round(y - h), Math.round(w), Math.round(h));
        if (o.faixa) { c.fillStyle = o.faixa; c.fillRect(Math.round(x - w / 2 - 4 * k), Math.round(y - h), Math.round(3 * k), Math.round(h)); }
        c.fillStyle = '#000'; c.fillText(it.txt, x + 1, y - pad * 0.55 + 1);
        c.fillStyle = o.cor || '#fff'; c.fillText(it.txt, x, y - pad * 0.55);
      }
    }
    this.fila.length = 0;
    c.textAlign = 'left';
  }
};

// ---------------- ganchos ----------------
(function () {
  Nitido.init();
  const r0 = Game.render;
  Game.render = function () {
    Nitido.fila.length = 0;
    const r = r0.apply(this, arguments);
    // o seu balão do chat
    const P = this.player;
    if (P && P.chat && this.t < (P.chatAte || 0) && this.level && (this.level.isWorld || this.level.isCeu) && !P.dead) {
      Nitido.balao(Math.round(P.x - Math.round(this.camX)), Math.round(P.y - (P.h || 28) - 8 - Math.round(this.camY) - (P.mounted ? 9 : 0)), P.chat, { fundo: 'rgba(255,248,210,0.97)', borda: '#806020' });
    }
    Nitido.desenhar();
    return r;
  };
  const rs0 = Game.resize; Game.resize = function () { const r = rs0.apply(this, arguments); Nitido.resize(); return r; };
  // os NPCs conversando
  Vida.drawChats = function (ctx, camX, camY) {
    for (const c of this.chats) {
      const first = c.t > 2.6 || !c.par[1], who = first ? c.a : c.b, txt = first ? c.par[0] : c.par[1];
      if (!txt || who === Game.player) continue;
      Nitido.balao(Math.round(who.x - camX), Math.round(who.y - (who.h || 28) - 6 - camY), txt);
    }
  };
  // a sua mensagem volta da sala: mostra o balão em cima de você
  const rc0 = Rede.receber;
  Rede.receber = function (m) {
    if (m && m.t === 'chat' && m.id === this.id && Game.player) { Game.player.chat = String(m.txt || '').slice(0, 140); Game.player.chatAte = Game.t + 6; }
    return rc0.apply(this, arguments);
  };
})();
