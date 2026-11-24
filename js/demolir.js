'use strict';
// =====================================================================
//  DEMOLIR — na aba Família, mande trabalhadores derrubarem as casas que
//  você construiu (as do "Construir uma casa aqui" e os prédios da sua
//  vila). Eles chegam, trabalham algumas horas (dá para ver a poeira) e a
//  casa some. Parte dos materiais volta para você, e o que estava guardado
//  no baú da casa vai para a bolsa.
// =====================================================================
const DEMOLIR_HORAS = 5, DEMOLIR_PRECO = 150;
const Demolir = {
  agora() { return (Game.day || 1) * 1440 + Game.time; },
  minhas() {
    const W = Game.world, L = [];
    for (const h of (W && W.homes) || []) L.push({ tipo: 'casa', h, nome: h.name, obra: !h.done });
    try { for (const ob of Construcao.obras()) { const d = OBRAS[ob.k]; if (d && d.bt) L.push({ tipo: 'vila', ob, nome: `${d.nome} (${Vila.st().nome})` }); } } catch (e) { }
    return L;
  },
  emAndamento(it) { return it.tipo === 'casa' ? it.h.demolir : it.ob.demolir; },
  pedir(it, back) {
    const P = Game.player;
    UI.dialog('🪓 Demolir', null, `Mandar trabalhadores derrubarem <b>${esc(it.nome)}</b>?<br><br>Eles cobram <b>${DEMOLIR_PRECO} de ouro</b> e levam umas ${DEMOLIR_HORAS} horas. Parte dos materiais volta para você e o que estiver guardado lá vai para a sua bolsa.<br><span class="warn">Não tem volta.</span>`, [
      { label: `🪓 Contratar os trabalhadores (${DEMOLIR_PRECO})`, cls: 'danger', fn: () => {
        if (P.gold < DEMOLIR_PRECO) return Game.toast('Ouro insuficiente.', '#ff8080');
        P.gold -= DEMOLIR_PRECO; Sfx.play('coin');
        const fim = this.agora() + DEMOLIR_HORAS * 60;
        if (it.tipo === 'casa') it.h.demolir = fim; else it.ob.demolir = fim;
        Game.toast(`Os trabalhadores estão a caminho de ${it.nome}.`, '#ffd080');
        Game.chron(`Mandei demolir ${it.nome}.`);
        back ? back() : UI.close();
      } },
      { label: 'Cancelar', fn: back || (() => UI.close()) }
    ]);
  },
  // ---------- trabalhadores e poeira enquanto derruba ----------
  tT: 0, gente: new Map(),
  tick(dt) {
    const G = Game, W = G.world, P = G.player; if (!W || !P || !G.started) return;
    this.tT -= dt; if (this.tT > 0) return; this.tT = 1;
    const agora = this.agora();
    for (const h of W.homes.slice()) if (h.demolir) {
      const T_ = HOME_TIERS[h.tier], cx = (h.x + T_.w / 2) * 16, cy = (h.y + T_.h) * 16;
      const dentro = G.level && G.level.b && G.level.b.home === h;
      if (agora >= h.demolir && !dentro) { this.tirarGente(h.id); this.derrubarCasa(h); continue; }
      if (G.level === W && dist(P.x, P.y, cx, cy) < 16 * 30) { this.porGente(h.id, h._s, cx, cy); if (Math.random() < 0.7) G.burst(cx + (Math.random() - 0.5) * T_.w * 14, cy - Math.random() * T_.h * 14, '#b8a890', 6, 40); }
      else this.tirarGente(h.id);
    }
    try {
      const L = Construcao.obras();
      for (const ob of L.slice()) if (ob.demolir) {
        const [w, hh] = Construcao.tamanho(ob.k, ob.r), cx = (ob.x + w / 2) * 16, cy = (ob.y + hh) * 16, id = 'obra' + ob.x + '_' + ob.y;
        if (agora >= ob.demolir) { this.tirarGente(id); this.derrubarObra(ob); continue; }
        const s = W.settlements.find(x => x.playerVila);
        if (G.level === W && s && dist(P.x, P.y, cx, cy) < 16 * 30) { this.porGente(id, s, cx, cy); if (Math.random() < 0.7) G.burst(cx + (Math.random() - 0.5) * w * 14, cy - Math.random() * hh * 14, '#b8a890', 6, 40); }
        else this.tirarGente(id);
      }
    } catch (e) { }
  },
  porGente(id, s, cx, cy) {
    if (this.gente.has(id) || !s) return;
    const G = Game, rng = new RNG(hashStr(id)), L = [];
    for (let i = 0; i < 3; i++) {
      const a = new NPC({ role: 'citizen', x: Math.floor(cx / 16) + i * 2 - 2, y: Math.floor(cy / 16) + 1 }, s, rng);
      a.name = 'Demolidor ' + a.name.split(' ')[0]; a.rot = null; a.demolidor = true;
      a.look = Object.assign({}, a.look, { body: '#8a6a4a', legs: '#4a3a2a', hat: 'cap', hatC: '#c0a060', weapon: 'hammer', wc: '#8a8a90', robe: false });
      a.S = Sprites.actor(a.look); a.h = a.S.h; G.findFree(a); a.home = { x: a.x, y: a.y };
      G.actors.push(a); L.push(a);
    }
    this.gente.set(id, L);
  },
  tirarGente(id) { const L = this.gente.get(id); if (!L) return; const set = new Set(L); Game.actors = Game.actors.filter(a => !set.has(a)); this.gente.delete(id); },
  // ---------- a casa cai ----------
  derrubarCasa(h) {
    const G = Game, W = G.world, P = G.player, T_ = HOME_TIERS[h.tier];
    W.homes = W.homes.filter(x => x !== h); G.mods.homes = G.mods.homes.filter(x => x.id !== h.id);
    for (const [k, list] of W.stampIndex) W.stampIndex.set(k, list.filter(st => st.homeId !== h.id));
    for (const [k, d] of W.doors) if (d.home && d.home.id === h.id) W.doors.delete(k);
    for (let cy = (h.y >> 5) - 1; cy <= ((h.y + T_.h + 3) >> 5) + 1; cy++) for (let cx = ((h.x - 1) >> 5) - 1; cx <= ((h.x + T_.w + 2) >> 5) + 1; cx++) { W.chunks.delete(W.ckey(cx, cy)); W.canvases.delete(W.ckey(cx, cy)); }
    W.pending = null;
    P.houses = (P.houses || []).filter(id => id !== h.id);
    // o que estava guardado vai para a bolsa
    const guard = P.storage && P.storage[h.id]; let n = 0;
    if (guard) { for (const it of guard) { P.addItem(it); n++; } delete P.storage[h.id]; }
    if (P.spouseHome === h.id) P.spouseHome = (P.houses || [])[0] || null;
    // parte dos materiais volta
    const volta = [];
    for (const [id, q] of Object.entries(T_.mats || {})) { const m = Math.floor(q * 0.4); if (m > 0 && ITEMS[id]) { P.addItem(Items.make(id, m)); volta.push(`${m} ${ITEMS[id].name}`); } }
    G.burst((h.x + T_.w / 2) * 16, (h.y + T_.h) * 16, '#b8a890', 40, 90); Sfx.play('shout');
    G.toast(`${h.name} foi demolida.${volta.length ? ' Voltaram: ' + volta.join(', ') + '.' : ''}${n ? ` ${n} item(ns) do baú foram para a bolsa.` : ''}`, '#ffd080');
    G.chron(`${h.name} foi demolida.`);
  },
  derrubarObra(ob) {
    const L = Construcao.obras(), i = L.indexOf(ob); if (i < 0) return;
    const d = OBRAS[ob.k]; L.splice(i, 1); Construcao.aplicar();
    const volta = Math.floor((d.ouro || 0) / 2); Game.player.gold += volta;
    Game.toast(`${d.nome} da vila foi demolido(a). +${volta} de ouro dos materiais.`, '#ffd080');
    Game.chron(`Mandei demolir ${d.nome.toLowerCase()} da minha vila.`);
  },
  // ---------- a seção na aba Família ----------
  secao(f) {
    const L = this.minhas(); if (!L.length) return '';
    const back = () => UI.openMenu('family');
    return `<h3>🪓 Demolir</h3><div class="dim small">Mande trabalhadores derrubarem uma casa que você construiu (${DEMOLIR_PRECO} de ouro, umas ${DEMOLIR_HORAS} horas).</div>` + L.map(it => {
      const fim = this.emAndamento(it);
      const est = fim ? `<span class="warn">🪓 sendo demolida (pronto em ~${Math.max(1, Math.ceil((fim - this.agora()) / 60))}h)</span>` : it.obra ? '<span class="dim">em obra</span>' : '';
      return `<div class="row" style="justify-content:space-between;align-items:center;gap:6px"><span>${esc(it.nome)} ${est}</span>${fim ? '' : `<button class="sbtn small danger" ${f(() => this.pedir(it, back))}>Mandar demolir</button>`}</div>`;
    }).join('');
  }
};
(function () {
  const ft0 = UI.familyTab;
  UI.familyTab = function (f) { let h = ft0.call(this, f); try { h += Demolir.secao(f); } catch (e) { console.warn('Demolir', e); } return h; };
  const t0 = Inverno.tick.bind(Inverno);
  Inverno.tick = function (dt) { t0(dt); try { Demolir.tick(dt); } catch (e) { if (!Demolir._err) { Demolir._err = 1; console.warn('Demolir', e); } } };
})();
