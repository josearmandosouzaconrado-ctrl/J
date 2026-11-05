'use strict';
// =====================================================================
//  ATALHOS E ARMA NAS COSTAS
//  • 4 atalhos ao lado do livro vermelho: coloque neles bebidas, comidas,
//    poções ou armas (na mochila, toque no item e em "📌 Atalho"). Um toque
//    no atalho usa o item, ou troca de arma na hora. No teclado: 1, 2, 3, 4.
//  • A arma fica guardada nas costas (ou na cintura, a adaga) quando você não
//    está lutando, e dá para vê-la. Na hora de bater, o personagem saca.
// =====================================================================
const ATALHOS_N = 4;

const Atalhos = {
  lista() { const P = Game.player; if (!P.atalhos || P.atalhos.length !== ATALHOS_N) P.atalhos = Array.from({ length: ATALHOS_N }, (_, i) => (P.atalhos && P.atalhos[i]) || null); return P.atalhos; },
  // o item do atalho: o mesmo item (armas) ou qualquer um do mesmo tipo (comida, bebida, poção)
  item(i) {
    const P = Game.player, a = this.lista()[i]; if (!a) return null;
    return P.inv.find(it => it.u === a.u) || (a.pilha ? P.inv.find(it => it.id === a.id) : null);
  },
  pode(it) { const d = ITEMS[it.id]; return !!d && (d.slot === 'weapon' || d.slot === 'offhand' || ((d.type === 'food' || d.type === 'potion') && d.use)); },
  por(i, it) {
    const L = this.lista();
    for (let j = 0; j < L.length; j++) if (L[j] && (L[j].u === it.u || (L[j].pilha && L[j].id === it.id))) L[j] = null;
    L[i] = { u: it.u, id: it.id, pilha: Items.stackable(it) };
    Game.toast(`📌 ${ITEMS[it.id].name} no atalho ${i + 1}.`, '#ffe0a0');
    this.atualizar(true);
  },
  usar(i) {
    const P = Game.player; if (!Game.started || !P || P.dead || UI.current) return;
    const it = this.item(i);
    if (!it) { if (this.lista()[i]) Game.toast('Esse item acabou. Escolha outro na mochila (📌 Atalho).', '#ffb080'); else Game.toast('Atalho vazio: na mochila, toque num item e em 📌 Atalho.', '#e0d0b0'); return; }
    const d = ITEMS[it.id];
    if (d.slot && P.isEquipped(it)) { Game.toast(`${d.name} já está na mão.`, '#c8c8d8'); return; }
    P.useItem(it);
    if (d.slot) { Game.toast(`⚔ ${d.name}`, '#ffe0a0'); P.recalc && P.recalc(); }
    this.atualizar(true);
  },
  // ---------- os botões ----------
  montar() {
    const top = document.getElementById('topbtns'); if (!top || document.getElementById('atalhos')) return;
    const box = document.createElement('div'); box.id = 'atalhos';
    box.style.cssText = 'display:flex;gap:4px;margin-right:4px';
    for (let i = 0; i < ATALHOS_N; i++) {
      const b = document.createElement('button'); b.className = 'tbtn atalho'; b.id = 'atalho' + i;
      b.style.cssText = 'position:relative;width:36px;height:36px;opacity:.92';
      b.innerHTML = `<span class="at-n" style="position:absolute;left:2px;top:0;font-size:11px;color:#c8b890">${i + 1}</span>`;
      const go = e => { e.preventDefault(); e.stopPropagation(); this.usar(i); };
      b.addEventListener('touchstart', go, { passive: false }); b.addEventListener('mousedown', go);
      box.appendChild(b);
    }
    top.insertBefore(box, top.firstChild);
    this.atualizar(true);
  },
  atualizar(forcar) {
    const P = Game.player; if (!P || !document.getElementById('atalhos')) return;
    const chave = this.lista().map((a, i) => { const it = this.item(i); return it ? it.id + ':' + it.n + ':' + (ITEMS[it.id].slot ? (P.isEquipped(it) ? 'e' : '') : '') : a ? 'x' : '-'; }).join('|');
    if (!forcar && chave === this._chave) return;
    this._chave = chave;
    for (let i = 0; i < ATALHOS_N; i++) {
      const b = document.getElementById('atalho' + i), it = this.item(i), a = this.lista()[i];
      const n = `<span class="at-n" style="position:absolute;left:2px;top:0;font-size:11px;color:#c8b890">${i + 1}</span>`;
      if (!it) { b.innerHTML = n + (a ? '<span style="opacity:.35;font-size:18px">∅</span>' : ''); b.style.borderColor = ''; continue; }
      const eq = ITEMS[it.id].slot && P.isEquipped(it);
      b.innerHTML = n + `<img src="${Sprites.iconURL(Items.icon(it))}" style="width:24px;height:24px">` + (it.n > 1 ? `<span style="position:absolute;right:2px;bottom:0;font-size:12px;color:#fff;text-shadow:1px 1px 0 #000">${it.n}</span>` : '');
      b.style.borderColor = eq ? '#ffd040' : '';
    }
  },
  // escolher o atalho de um item (na mochila)
  escolher(it, volta) {
    const L = this.lista();
    UI.dialog('📌 Atalho', null, `Em qual atalho colocar <b>${esc(ITEMS[it.id].name)}</b>? Ele fica ao lado do livro vermelho.`, L.map((a, i) => {
      const atual = this.item(i);
      return { label: `${i + 1}: ${atual ? ITEMS[atual.id].name : a ? '(acabou)' : 'vazio'}`, fn: () => { this.por(i, it); volta(); } };
    }).concat([{ label: 'Tirar dos atalhos', fn: () => { for (let j = 0; j < L.length; j++) if (L[j] && (L[j].u === it.u || (L[j].pilha && L[j].id === it.id))) L[j] = null; this.atualizar(true); volta(); } }, { label: 'Voltar', fn: volta }]));
  }
};

// ---------- a arma nas costas ----------
const Bainha = {
  guardada(P, wclass) {
    if (!wclass || wclass === 'staff' || P.sleeping) return false;
    if (P.atkT > 0 || P.swing || P.castT > 0 || P.rolling > 0 || P.thrustT > 0) return false;
    return Game.t - (P._ultimoAtk || -99) > 3;
  },
  desenhar(P, ctx, camX, camY) {
    const img = P.wimg, wc = P.wclass; if (!img) return;
    const h = P.h || 24, d = P.dir, lado = d === 'right' ? -1 : d === 'left' ? 1 : 0;
    let hx, hy, ang;
    if (wc === 'dagger') { hx = P.x + (lado ? lado * 2 : 4); hy = P.y - 7; ang = Math.PI / 2 + 0.3; }       // na cintura
    else if (wc === 'bow') { hx = P.x + 3 + lado * 2; hy = P.y - h * 0.78; ang = Math.PI * 0.62; }
    else { hx = P.x + 3 + lado * 2; hy = P.y - h * 0.8; ang = Math.PI * 0.72; }                       // cabo no ombro, lâmina descendo nas costas
    ctx.save();
    ctx.translate(Math.round(hx - camX), Math.round(hy - camY - (P.z || 0)));
    ctx.rotate(ang);
    if (Math.cos(ang) < 0) ctx.scale(1, -1);
    ctx.drawImage(img, -3, -8);
    ctx.restore();
  }
};

// ---------------- ganchos ----------------
(function () {
  const tj0 = Player.prototype.toJSON; Player.prototype.toJSON = function () { const o = tj0.call(this); if (this.atalhos) o.atalhos = this.atalhos; return o; };
  // a arma guardada: some da mão e aparece nas costas (atrás do corpo, ou por cima quando você está de costas)
  const dw0 = Player.prototype.drawWeapon;
  Player.prototype.drawWeapon = function (ctx, camX, camY, wimg, wclass, swing) {
    if (wimg === this.wimg && Bainha.guardada(this, wclass)) return;
    return dw0.apply(this, arguments);
  };
  const db0 = Player.prototype.drawBody;
  Player.prototype.drawBody = function (ctx, camX, camY, S) {
    const g = S === this.S && Bainha.guardada(this, this.wclass) && !this.mounted;
    if (g && this.dir !== 'up') Bainha.desenhar(this, ctx, camX, camY);
    const r = db0.apply(this, arguments);
    if (g && this.dir === 'up') Bainha.desenhar(this, ctx, camX, camY);
    return r;
  };
  // sacar a arma para bater
  const at0 = Player.prototype.attack;
  Player.prototype.attack = function () {
    const sacar = this.wimg && Bainha.guardada(this, this.wclass);
    this._ultimoAtk = Game.t;
    if (sacar) Sfx.play('equip');
    return at0.apply(this, arguments);
  };
  const ca0 = Player.prototype.castSpell; if (ca0) Player.prototype.castSpell = function () { this._ultimoAtk = Game.t; return ca0.apply(this, arguments); };
  // ao apanhar também saca (para se defender)
  const cd0 = Combat.damage; Combat.damage = function (t) { if (t === Game.player && t) t._ultimoAtk = Game.t; return cd0.apply(this, arguments); };
  // os botões aparecem com o painel
  const sh0 = UI.showHUD; UI.showHUD = function (on) { const r = sh0.apply(this, arguments); if (on) { Atalhos.montar(); Atalhos.atualizar(true); } return r; };
  setInterval(() => { if (Game.started && Game.player) Atalhos.atualizar(); }, 400);
  // teclas 1 a 4
  window.addEventListener('keydown', e => { if (/^Digit[1-4]$/.test(e.code) && !(e.target && /INPUT|TEXTAREA/.test(e.target.tagName))) Atalhos.usar(+e.code.slice(5) - 1); });
  // na mochila: o botão 📌 Atalho no item escolhido
  const om0 = UI.openMenu;
  UI.openMenu = function (tab) {
    const r = om0.apply(this, arguments);
    const it = this.invSel, P = Game.player;
    if ((tab === 'inv' || (!tab && this.menuTab === 'inv')) && it && P && P.inv.includes(it) && Atalhos.pode(it)) {
      const row = this.current && this.current.el && this.current.el.querySelector('.idetail + .row');
      if (row) { const b = document.createElement('button'); b.className = 'sbtn'; b.textContent = '📌 Atalho'; b.onclick = () => Atalhos.escolher(it, () => UI.openMenu('inv')); row.appendChild(b); }
    }
    return r;
  };
})();
