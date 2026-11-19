'use strict';
// =====================================================================
//  MAIS COISAS PARA FAZER NO MAR
//  • Destroços flutuando: barris, caixotes e baús de naufrágios aparecem
//    no mar aberto; passe com o navio por cima para recolher (ouro, rum,
//    especiarias, seda, joias e às vezes um baú raro).
//  • Rede de pesca: com o navio devagar, lance a rede pela popa; depois
//    de um tempo a tripulação puxa peixes (e, com sorte, um peixe dourado
//    ou uma pérola). Navegar rápido demais rasga a rede.
// =====================================================================
idef('atum', { name: 'Atum', type: 'food', use: { heal: 22 }, value: 16, stack: true, icon: { k: 'fish', c: '#5a6a9a' } });
idef('lagosta', { name: 'Lagosta', type: 'food', use: { heal: 28 }, value: 30, stack: true, icon: { k: 'fish', c: '#d04a30' } });
FOODS && RECIPES && RECIPES.cook && RECIPES.cook.push && RECIPES.cook.push({ out: 'peixe_assado', in: { atum: 1 }, skill: 0 });

const MarExtras = {
  dest: [], dT: 12, rede: null,
  tick(dt, L) {
    const G = Game;
    // destroços
    this.dT -= dt;
    if (this.dT <= 0) {
      this.dT = 14 + Math.random() * 22;
      if (this.dest.length < 4) {
        const a = (L.ang || 0) + (Math.random() - 0.5) * 1.6, d = 500 + Math.random() * 400, x = L.x + Math.cos(a) * d, y = L.y + Math.sin(a) * d;
        if (Mar.navegavel(x, y)) { const r = Math.random(); this.dest.push({ x, y, k: r < 0.08 ? 'bau' : r < 0.5 ? 'barril' : 'caixote', t: Math.random() * 6 }); }
      }
    }
    for (const o of this.dest) o.t += dt;
    this.dest = this.dest.filter(o => {
      const d = dist(o.x, o.y, L.x, L.y);
      if (d > 1600) return false;
      if (d < 110) { this.recolher(o); return false; }
      return true;
    });
    // rede de pesca
    const R = this.rede;
    if (R) {
      R.t += dt;
      if (L.spd > 140) { this.rede = null; Sfx.play('hit'); G.toast('A rede rasgou! Navegue mais devagar com ela na água.', '#ff8060'); }
      else if (R.t >= R.dur) this.puxar(L);
    }
  },
  recolher(o) {
    const G = Game, P = G.player, ganhos = [];
    const add = (id, n) => { P.addItem(Items.make(id, n)); ganhos.push((n > 1 ? n + 'x ' : '') + ITEMS[id].name); };
    const ouro = o.k === 'bau' ? 150 + Math.floor(Math.random() * 350) : Math.floor(Math.random() * 60);
    if (ouro) { P.gold += ouro; ganhos.push(ouro + ' ouro'); }
    if (o.k === 'barril') add(Math.random() < 0.6 ? 'barril_rum' : 'especiarias', 1 + Math.floor(Math.random() * 2));
    if (o.k === 'caixote') add(Math.random() < 0.5 ? 'seda' : Math.random() < 0.5 ? 'especiarias' : 'tabua', 1 + Math.floor(Math.random() * 3));
    if (o.k === 'bau') { add('joias', 1); if (Math.random() < 0.5) P.addItem(Items.randomGear(Math.max(5, P.level + 3), new RNG(Math.floor(Math.random() * 1e9)), 0.15)), ganhos.push('um equipamento'); }
    Sfx.play(o.k === 'bau' ? 'levelup' : 'pickup');
    G.toast(`${o.k === 'bau' ? '🧰 Baú de naufrágio' : o.k === 'barril' ? '🛢 Barril flutuante' : '📦 Caixote flutuante'}: ${ganhos.join(', ')}`, '#ffd880');
  },
  lancar() {
    const G = Game, L = G.level; if (!L || !L.proprio) return;
    if (this.rede) return G.toast('A rede já está na água.', '#c0e0ff');
    if (L.spd > 90) return G.toast('Devagar! Recolha um pouco as velas para lançar a rede.', '#ffd080');
    this.rede = { t: 0, dur: 9 + Math.random() * 5 };
    Sfx.play('swing'); G.toast('🎣 Rede lançada pela popa. Mantenha o navio devagar...', '#c0e0ff');
    Mar.painelKey = '';
  },
  puxar(L) {
    const G = Game, P = G.player, ganhos = [], alto = typeof Canhoes !== 'undefined' && Serpente && Serpente.aberto ? Serpente.aberto(L) : true;
    const n = 2 + Math.floor(Math.random() * 4);
    const tabela = alto ? [['atum', 4], ['peixe', 3], ['salmao', 2], ['lagosta', 1]] : [['peixe', 5], ['salmao', 2], ['lagosta', 2]];
    const sorteia = () => { let tot = 0; for (const [, w] of tabela) tot += w; let x = Math.random() * tot; for (const [id, w] of tabela) { if (x < w) return id; x -= w; } return 'peixe'; };
    const conta = {};
    for (let i = 0; i < n; i++) { const id = sorteia(); conta[id] = (conta[id] || 0) + 1; }
    if (Math.random() < 0.07) conta.peixe_dourado = 1;
    if (Math.random() < 0.05) conta.perola = 1;
    for (const id in conta) { P.addItem(Items.make(id, conta[id])); ganhos.push(conta[id] + 'x ' + ITEMS[id].name); }
    this.rede = null; Sfx.play('harvest'); Mar.painelKey = '';
    G.toast('🎣 A tripulação puxou a rede: ' + ganhos.join(', '), '#a0f080');
  },
  desenhar(ctx, cx, cy) {
    const t = Game.t;
    for (const o of this.dest) {
      const x = Math.round(o.x - cx), y = Math.round(o.y - cy), b = Math.round(Math.sin(o.t * 2) * 2);
      if (x < -40 || y < -40 || x > Game.vw + 40 || y > Game.vh + 40) continue;
      ctx.strokeStyle = 'rgba(230,245,255,0.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x, y + 4, 14 + Math.sin(o.t * 2) * 2, 5, 0, 0, Math.PI * 2); ctx.stroke();
      if (o.k === 'barril') { ctx.fillStyle = '#7a4a22'; ctx.fillRect(x - 6, y - 8 + b, 12, 12); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(x - 6, y - 5 + b, 12, 1); ctx.fillRect(x - 6, y + 1 + b, 12, 1); ctx.fillStyle = '#9a6a3a'; ctx.fillRect(x - 4, y - 8 + b, 2, 12); }
      else if (o.k === 'caixote') { ctx.fillStyle = '#a07a44'; ctx.fillRect(x - 7, y - 8 + b, 14, 11); ctx.strokeStyle = '#5a3a1a'; ctx.strokeRect(x - 7 + 0.5, y - 8 + b + 0.5, 13, 10); ctx.beginPath(); ctx.moveTo(x - 7, y - 8 + b); ctx.lineTo(x + 7, y + 3 + b); ctx.stroke(); }
      else { ctx.fillStyle = '#6a3a1a'; ctx.fillRect(x - 8, y - 9 + b, 16, 11); ctx.fillStyle = '#8a5a2a'; ctx.fillRect(x - 8, y - 11 + b, 16, 3); ctx.fillStyle = '#e0c040'; ctx.fillRect(x - 1, y - 6 + b, 3, 3); if (Math.sin(t * 5 + o.t) > 0.6) { ctx.fillStyle = '#fff8c0'; ctx.fillRect(x + 4, y - 12 + b, 2, 2); } }
    }
  }
};
(function () {
  const n0 = NavioLevel.prototype.update;
  NavioLevel.prototype.update = function (dt) { try { MarExtras.tick(dt, this); } catch (e) { } return n0.apply(this, arguments); };
  const d0 = ShipLevel.prototype.drawWorldStuff;
  ShipLevel.prototype.drawWorldStuff = function (ctx, cx, cy, vw, vh) { const r = d0.apply(this, arguments); if (this.proprio) { try { MarExtras.desenhar(ctx, cx, cy); } catch (e) { } } return r; };
  // botão da rede no painel do timão
  const p0 = Mar.painel;
  Mar.painel = function () {
    const r = p0.apply(this, arguments), L = Game.level, el = this.el;
    if (el && L && L.proprio && L.leme && !el.querySelector('[data-o="rede"]')) {
      const v = el.querySelector('[data-o="vela"]');
      if (v) { const b = document.createElement('button'); b.dataset.o = 'rede'; b.className = 'wide' + (MarExtras.rede ? ' on' : ''); b.textContent = MarExtras.rede ? `🎣 Rede na água (${Math.max(0, Math.ceil(MarExtras.rede.dur - MarExtras.rede.t))}s)` : '🎣 Lançar a rede'; v.after(b); }
    }
    return r;
  };
  document.addEventListener('pointerdown', e => { const b = e.target.closest && e.target.closest('#leme button[data-o="rede"]'); if (b) { e.preventDefault(); e.stopPropagation(); MarExtras.lancar(); } }, true);
})();
