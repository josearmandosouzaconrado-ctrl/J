'use strict';
// =====================================================================
//  ACAMPAMENTO E FOGUEIRA EM QUALQUER LUGAR
//  Na Mochila há o botão "🏕 Acampar": no mundo aberto você faz uma
//  fogueira (esquenta no frio, cozinha e ilumina a noite) ou monta um
//  acampamento (tenda + fogueira) na sua frente. Na tenda dá para dormir;
//  depois é só desmontar. Sem lenha? Junte gravetos por perto.
//  A fogueira se apaga sozinha depois de dois dias.
// =====================================================================
const ACAMP_MAX = 8;

const Acampamento = {
  lista() { const P = Game.player; return P.acamps || (P.acamps = []); },
  // o lugar na sua frente
  lugar(n) {
    const P = Game.player, W = Game.world, L = Game.level;
    if (!L || !L.isWorld) return 'Só dá para acampar no mundo aberto.';
    if (Game.curTown || W.settlementAt(Math.floor(P.x / 16), Math.floor(P.y / 16))) return 'Dentro da cidade não pode. Saia para o campo ou a floresta.';
    const fx = Math.cos(P.face || 0), fy = Math.sin(P.face || 0);
    const tx = Math.floor((P.x + fx * 22) / 16), ty = Math.floor((P.y + fy * 18) / 16);
    for (let i = 0; i < n; i++) {
      const x = tx + i * 2, y = ty;
      if (W.solidAt(x, y) || TWATER[W.tileAt(x, y)] || W.settlementAt(x, y) || W.objAt(x, y) || this.lista().some(a => a.x === x && a.y === y)) return 'Não há espaço livre na sua frente. Olhe para um lugar aberto.';
    }
    return { x: tx, y: ty };
  },
  menu() {
    const P = Game.player, lenha = P.count('lenha'), couro = P.count('couro');
    const perto = this.perto(48);
    const ops = [
      { label: `🔥 Fazer uma fogueira (2 lenha) — você tem ${lenha}`, cls: lenha >= 2 ? 'gold' : '', fn: () => this.fazer('fogueira') },
      { label: `⛺ Montar acampamento: tenda + fogueira (3 lenha, 2 couro) — você tem ${lenha} lenha e ${couro} couro`, cls: lenha >= 3 && couro >= 2 ? 'gold' : '', fn: () => this.fazer('acampamento') },
      { label: '🌿 Juntar gravetos (30 min, +2 lenha)', fn: () => this.gravetos() }
    ];
    if (perto) ops.push({ label: perto.tipo === 'fogueira' ? '💨 Apagar a fogueira' : '📦 Desmontar o acampamento (devolve 1 couro)', fn: () => this.desmontar(perto) });
    ops.push({ label: 'Voltar', fn: () => UI.openMenu('inv') });
    UI.dialog('🏕 Acampar', null, 'O que você quer montar aqui? A fogueira esquenta no frio, cozinha e ilumina a noite. Na tenda dá para dormir.', ops);
  },
  gravetos() {
    const P = Game.player;
    if (!Game.level.isWorld || Game.curTown) return Game.toast('Os gravetos ficam no campo e na floresta.', '#ffb080');
    Academy.passTime(30); P.addItem(Items.make('lenha', 2)); Sfx.play('harvest');
    Game.toast('Você juntou gravetos: +2 lenha.', '#c8e0a0'); this.menu();
  },
  fazer(tipo) {
    const P = Game.player, tenda = tipo === 'acampamento';
    const pos = this.lugar(tenda ? 2 : 1);
    if (typeof pos === 'string') return Game.toast(pos, '#ffb080');
    const lenha = tenda ? 3 : 2;
    if (P.count('lenha') < lenha) return Game.toast(`Falta lenha (precisa de ${lenha}). Junte gravetos.`, '#ff8080');
    if (tenda && P.count('couro') < 2) return Game.toast('Falta couro (precisa de 2) para a tenda.', '#ff8080');
    P.removeItem('lenha', lenha); if (tenda) P.removeItem('couro', 2);
    const L = this.lista();
    if (tenda) L.push({ tipo: 'tenda', x: pos.x, y: pos.y, dia: Game.day });
    L.push({ tipo: 'fogueira', x: pos.x + (tenda ? 2 : 0), y: pos.y, dia: Game.day });
    while (L.length > ACAMP_MAX) L.shift();
    this.aplicar();
    UI.close(); Sfx.play('fire');
    for (let i = 0; i < 18; i++) Game.particle((pos.x + (tenda ? 2 : 0)) * 16 + 8 + (Math.random() - 0.5) * 8, pos.y * 16 + 8, (Math.random() - 0.5) * 14, -20 - Math.random() * 25, Math.random() < 0.5 ? '#ff9030' : '#ffd060', 0.9, 1, -10);
    Game.toast(tenda ? '⛺ Acampamento montado! Toque na tenda para dormir.' : '🔥 Fogueira acesa!', '#ffd080');
    Game.chron(tenda ? 'Montei um acampamento no meio do caminho.' : 'Acendi uma fogueira para me esquentar.');
  },
  perto(r) {
    const P = Game.player; let best = null, bd = r;
    for (const a of this.lista()) { const d = dist(P.x, P.y, a.x * 16 + 8, a.y * 16 + 8); if (d < bd) { bd = d; best = a; } }
    if (best && best.tipo === 'fogueira') { const t = this.lista().find(a => a.tipo === 'tenda' && a.y === best.y && a.x === best.x - 2); if (t) best = t; }
    return best;
  },
  desmontar(a) {
    const L = this.lista(), P = Game.player;
    const tirar = a.tipo === 'tenda' ? L.filter(o => o === a || (o.tipo === 'fogueira' && o.y === a.y && o.x === a.x + 2)) : [a];
    P.acamps = L.filter(o => !tirar.includes(o));
    if (a.tipo === 'tenda') P.addItem(Items.make('couro', 1));
    this.aplicar(tirar); UI.close();
    Game.toast(a.tipo === 'tenda' ? 'Acampamento desmontado.' : 'Fogueira apagada.', '#e0d0b0');
  },
  // coloca (e tira) os objetos no mundo
  aplicar(tirados) {
    const W = Game.world; if (!W) return;
    const sujos = new Set();
    for (const [k, list] of W.stampIndex) { const f = list.filter(st => !st.acamp); if (f.length !== list.length) { W.stampIndex.set(k, f); sujos.add(k); } }
    for (const a of this.lista()) {
      W.addStamp({ x0: a.x, y0: a.y, w: 1, h: 1, tiles: new Uint8Array([255]), objs: new Uint8Array([a.tipo === 'tenda' ? O.TENT : O.CAMPFIRE]), acamp: true });
      sujos.add(W.ckey(a.x >> 5, a.y >> 5));
    }
    for (const a of tirados || []) sujos.add(W.ckey(a.x >> 5, a.y >> 5));
    for (const k of sujos) { W.chunks.delete(k); W.canvases.delete(k); }
  },
  dia() {
    const L = this.lista(), velhas = L.filter(a => a.tipo === 'fogueira' && Game.day - a.dia >= 2);
    if (!velhas.length) return;
    Game.player.acamps = L.filter(a => !velhas.includes(a));
    this.aplicar(velhas);
  }
};

// ---------------- ganchos ----------------
(function () {
  const tj0 = Player.prototype.toJSON; Player.prototype.toJSON = function () { const o = tj0.call(this); if (this.acamps && this.acamps.length) o.acamps = this.acamps; return o; };
  // o mundo é montado de novo: põe os acampamentos de volta
  const vr0 = Vila.restore; Vila.restore = function () { const r = vr0.apply(this, arguments); if (Game.player && Game.player.acamps) Acampamento.aplicar(); return r; };
  const dt0 = Game.dayTick; Game.dayTick = function () { const r = dt0.apply(this, arguments); Acampamento.dia(); return r; };
  // dormir na tenda
  const fi0 = Muralhas.findInteract;
  Muralhas.findInteract = function (fx, fy) {
    const r = fi0.apply(this, arguments); if (r || !Game.level || !Game.level.isWorld || !Game.player) return r;
    const t = Acampamento.lista().find(a => a.tipo === 'tenda' && dist(fx, fy, a.x * 16 + 8, a.y * 16 + 8) < 20);
    if (!t) return null;
    return { kind: 'mar', label: 'Tenda', name: 'Seu acampamento', d: 2, fn: () => UI.dialog('⛺ Tenda', null, 'O seu acampamento.', [
      { label: '💤 Dormir na tenda', cls: 'gold', fn: () => { UI.close(); Vida.acampar(null); } },
      { label: '📦 Desmontar (devolve 1 couro)', fn: () => Acampamento.desmontar(t) },
      { label: 'Fechar' }
    ]) };
  };
  // o botão na Mochila
  const om0 = UI.openMenu;
  UI.openMenu = function (tab) {
    const r = om0.apply(this, arguments);
    if ((tab === 'inv' || (!tab && this.menuTab === 'inv')) && this.current && this.current.el) {
      const alvo = this.current.el.querySelector('.inv-left');
      if (alvo && !alvo.querySelector('.bt-acamp')) {
        const b = document.createElement('button'); b.className = 'sbtn bt-acamp'; b.textContent = '🏕 Acampar / Fogueira';
        b.style.cssText = 'width:100%;margin:4px 0';
        b.onclick = () => Acampamento.menu();
        alvo.insertBefore(b, alvo.firstChild);
      }
    }
    return r;
  };
})();
