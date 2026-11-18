'use strict';
// =====================================================================
//  ATALHOS E ARMA NAS COSTAS
//  • 4 atalhos ao lado do livro vermelho: coloque neles bebidas, comidas,
//    poções ou armas (na mochila, toque no item e em "📌 Atalho"). Um toque
//    no atalho usa o item, ou troca de arma na hora. No teclado: 1, 2, 3, 4.
//  • A arma fica guardada quando você não está lutando, e dá para vê-la: espada e
//    adaga na cintura, dentro da bainha; machado e maça pendurados no cinto; armas
//    grandes, arcos e lanças nas costas. Na hora de bater, o personagem saca.
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
    // uma fileira logo abaixo do livro vermelho e do mapa (não cobre o meio da tela)
    const box = document.createElement('div'); box.id = 'atalhos';
    box.style.cssText = 'position:absolute;display:flex;gap:4px;pointer-events:auto;top:calc(52px + var(--sa-t, 0px));right:calc(118px + var(--sa-r, 0px))';
    for (let i = 0; i < ATALHOS_N; i++) {
      const b = document.createElement('button'); b.className = 'tbtn atalho'; b.id = 'atalho' + i;
      b.style.cssText = 'position:relative;width:36px;height:36px;opacity:.92';
      b.innerHTML = `<span class="at-n" style="position:absolute;left:2px;top:0;font-size:11px;color:#c8b890">${i + 1}</span>`;
      const go = e => { e.preventDefault(); e.stopPropagation(); this.usar(i); };
      b.addEventListener('touchstart', go, { passive: false }); b.addEventListener('mousedown', go);
      box.appendChild(b);
    }
    top.parentNode.appendChild(box);
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
  // espadas e adagas: na cintura, dentro da bainha (só o cabo aparece); machado e maça: pendurados no cinto;
  // armas grandes (duas mãos), arcos e lanças continuam nas costas
  CINTURA: { sword: 11, dagger: 7 }, CINTO: { axe: 1, mace: 1 },
  cor(P) {
    const it = P.equip && P.equip.weapon, d = it && ITEMS[it.id];
    return (d && d.icon && d.icon.c) || '#c8ccd4';
  },
  // linha de pixels (passos inteiros, como o pixel art do jogo)
  linha(ctx, x0, y0, x1, y1, w, cor) {
    ctx.fillStyle = cor; const n = Math.max(1, Math.round(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))));
    for (let i = 0; i <= n; i++) ctx.fillRect(Math.round(x0 + (x1 - x0) * i / n - w / 2), Math.round(y0 + (y1 - y0) * i / n - w / 2), w, w);
  },
  bainha(P, ctx, camX, camY) {
    const d = P.dir, L = this.CINTURA[P.wclass], z = P.z || 0, h = P.h || 24;
    // quadril de trás (o lado da mão que não segura a arma) e para onde a bainha aponta
    let hx, hy = P.y - h * 0.2, dx, dy;
    if (d === 'right') { hx = P.x - 2; dx = -0.62; dy = 0.78; }
    else if (d === 'left') { hx = P.x + 2; dx = 0.62; dy = 0.78; }
    else if (d === 'down') { hx = P.x + 5; dx = 0.25; dy = 0.97; }
    else { hx = P.x - 5; dx = -0.25; dy = 0.97; }
    const x = Math.round(hx - camX), y = Math.round(hy - camY - z);
    const tx = x + dx * L, ty = y + dy * L, metal = this.cor(P);
    ctx.save();
    // bainha de couro com a ponteira de metal
    this.linha(ctx, x, y, tx, ty, 3, '#2a1a10');
    this.linha(ctx, x, y, tx, ty, 2, '#5a3820');
    this.linha(ctx, x + (d === 'left' ? 0 : -0.5), y, tx, ty, 1, '#7a5030');
    ctx.fillStyle = '#c8ccd4'; ctx.fillRect(Math.round(tx - 1), Math.round(ty - 1), 2, 2);
    ctx.fillStyle = '#d8b040'; ctx.fillRect(Math.round(x - 1), Math.round(y), 2, 1);                // boca da bainha
    // cabo saindo para cima e para a frente: guarda, punho e pomo
    const cx = x - dx * 4, cy = y - dy * 4;
    const px = -dy, py = dx;                                                                           // perpendicular (guarda)
    this.linha(ctx, x - px * 2, y - py * 2, x + px * 2, y + py * 2, 1, P.wclass === 'dagger' ? '#a0a0a8' : '#d8b040');
    this.linha(ctx, x - dx, y - dy, cx, cy, 2, '#4a2e1a');
    ctx.fillStyle = metal; ctx.fillRect(Math.round(cx - 1), Math.round(cy - 1), 2, 2);
    ctx.restore();
  },
  desenhar(P, ctx, camX, camY) {
    const img = P.wimg, wc = P.wclass; if (!img) return;
    if (this.CINTURA[wc]) return this.bainha(P, ctx, camX, camY);
    const h = P.h || 24, d = P.dir, lado = d === 'right' ? -1 : d === 'left' ? 1 : 0;
    let hx, hy, ang;
    if (this.CINTO[wc]) { hx = P.x + (lado ? lado * 3 : 5); hy = P.y - h * 0.2; ang = Math.PI / 2 + (lado ? lado * 0.25 : 0.15); }   // pendurado no cinto, cabeça para baixo
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
    const naFrente = Bainha.CINTURA[this.wclass] || Bainha.CINTO[this.wclass] ? this.dir !== 'right' : this.dir === 'up';
    if (g && !naFrente) Bainha.desenhar(this, ctx, camX, camY);
    const r = db0.apply(this, arguments);
    if (g && naFrente) Bainha.desenhar(this, ctx, camX, camY);
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
