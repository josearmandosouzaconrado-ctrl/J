'use strict';
// =====================================================================
//  A FAMÍLIA PODE MORRER
//  • Doença: de vez em quando alguém da família adoece (mais no inverno e
//    os bebês mais ainda). Cuide em casa com uma poção ou chame o
//    curandeiro; sem cuidado, a pessoa pode morrer.
//  • Ataques: bandidos que atacam a vila quando você está fora, a vila que
//    cai na guerra e o cônjuge que luta ao seu lado (na dificuldade Brutal o
//    risco é maior) podem matar alguém da família.
//  • Luto: aviso, crônica, túmulo no cemitério da vila e a lista de quem
//    se foi na tela da família. Dá para visitar o túmulo e prestar homenagem.
// =====================================================================
OBRAS.tumulo = { cat: 'Decoração', nome: 'Túmulo', obj: () => O.GRAVE, ouro: 40, mats: { pedra: 4 } };

const Luto = {
  saude() { const P = Game.player; return P.saude || (P.saude = {}); },
  mortos() { const P = Game.player; return P.falecidos || (P.falecidos = []); },
  brutal() { return Game.settings && Game.settings.dif === 'brutal'; },
  membros() {
    const P = Game.player, l = [];
    if (P.spouse && P.rel[P.spouse] && P.rel[P.spouse].status !== 'falecido') l.push({ id: P.spouse, r: P.rel[P.spouse], tipo: 'Cônjuge', bebe: false });
    for (const c of P.children || []) l.push({ id: c.id, r: c, tipo: c.sex === 'f' ? 'Filha' : 'Filho', bebe: Game.day - (c.born || 0) < 10 });
    return l;
  },
  // ---------- doenças ----------
  dia() {
    const P = Game.player; if (!P) return;
    const S = this.saude(), inv = Estacoes.inverno();
    for (const m of this.membros()) {
      const s = S[m.id];
      if (s && s.doente > 0) {
        s.doente--;
        if (Math.random() < (m.bebe ? 0.2 : 0.12) * (this.brutal() ? 1.4 : 1)) { this.morrer(m, 'doença'); continue; }
        if (s.doente <= 0) { delete S[m.id]; Game.toast(`${m.r.name} melhorou da doença!`, '#a0e0a0'); }
        else Game.toast(`😷 ${m.r.name} continua doente (${m.tipo.toLowerCase()}). Cuide em casa!`, '#ffb080');
        continue;
      }
      const ch = 0.02 * (inv ? 2 : 1) * (m.bebe ? 1.6 : 1);
      if (Math.random() < ch) {
        S[m.id] = { doente: 3 + Math.floor(Math.random() * 3), desde: Game.day };
        Game.centerMsg(`😷 ${m.r.name.toUpperCase()} FICOU DOENTE`, `${m.tipo}: vá para casa e cuide com uma poção, ou chame um curandeiro.`);
        Game.chron(`${m.r.name} ficou doente${inv ? ' com o frio do inverno' : ''}.`);
      }
    }
    // a casa longe da vila também pode ser roubada (raramente)
  },
  doente(id) { const s = this.saude()[id]; return s && s.doente > 0 ? s : null; },
  curar(m, como) {
    const P = Game.player;
    if (como === 'pocao') {
      const id = ['pocao_vida_p', 'pocao_vida_m', 'pocao_vida_g', 'elixir_heroi'].find(i => P.count(i)); if (!id) return Game.toast('Você não tem poção de vida.', '#ff8080');
      P.removeItem(id, 1);
    } else { if (P.gold < 150) return Game.toast('Ouro insuficiente para o curandeiro (150).', '#ff8080'); P.gold -= 150; }
    delete this.saude()[m.id]; Sfx.play('learn');
    Game.toast(`${m.r.name} está curado(a)! ❤`, '#a0e0a0'); Game.chron(`Cuidei de ${m.r.name} até sarar.`);
    Vida.honra(1);
  },
  // ---------- quando alguém da família morre ----------
  morrer(m, causa) {
    const G = Game, P = G.player;
    if (m.r && m.r.sex === 'f') causa = causa.replace(/^morto /, 'morta ');
    if (m.tipo === 'Cônjuge') {
      const r = P.rel[m.id]; if (r) r.status = 'falecido';
      P.spouse = null; P.spouseHome = null; if (P.follower && P.follower.spouse) P.follower = null;
    } else P.children = (P.children || []).filter(c => c.id !== m.id);
    delete this.saude()[m.id];
    this.mortos().unshift({ nome: m.r.name, tipo: m.tipo, dia: G.day, causa, look: m.r.look, race: m.r.race, sex: m.r.sex });
    G.actors = G.actors.filter(a => !(a.rid === m.id || a.kid === m.r || (a.isFollower && a.spouse && m.tipo === 'Cônjuge')));
    this.tumulo(m);
    G.centerMsg('✝ LUTO', `${m.r.name} (${m.tipo.toLowerCase()}) morreu: ${causa}.`);
    G.chron(`${m.r.name}, ${m.tipo === 'Cônjuge' ? 'meu amor' : m.tipo === 'Filha' ? 'minha filha' : 'meu filho'}, morreu (${causa}). Que descanse em paz.`);
    Sfx.play('hurt');
    try { if (Reino.ativo()) { const R = Povo.st(); R.felic = Math.max(0, R.felic - 4); } } catch (e) { /* sem reino */ }
  },
  // um túmulo no cemitério, no canto da vila
  tumulo(m) {
    const V = Vila.st(), s = Vila.s, W = Game.world; if (!V || !s || !W) return;
    const obras = Construcao.obras();
    for (let k = 0; k < 40; k++) {
      const x = s.x0 + s.w + 2 + (k % 6), y = s.y0 + s.h - 6 + Math.floor(k / 6);
      if (obras.some(o => o.x === x && o.y === y) || W.solidAt(x, y) || TWATER[W.tileAt(x, y)] || W.settlementAt(x, y)) continue;
      obras.push({ k: 'tumulo', x, y, r: 0, de: m.r.name });
      Construcao.aplicar();
      return;
    }
  },
  // ---------- causas ----------
  riscoAtaque(chance, causa) {
    const l = this.membros(); if (!l.length) return;
    for (const m of l) if (Math.random() < chance * (this.brutal() ? 1.5 : 1)) { this.morrer(m, causa); return; }
  },
  // ---------- telas ----------
  html() {
    const l = this.membros(), M = this.mortos();
    let h = l.length ? l.map(m => { const s = this.doente(m.id); return `${m.tipo}: <b>${esc(m.r.name)}</b> — ${s ? `<span class="warn">😷 doente (${s.doente} dia(s))</span>` : '<span class="good">saudável</span>'}`; }).join('<br>') : '<span class="dim">Ninguém da família vivo.</span>';
    if (M.length) h += `<div class="sub">✝ Em memória</div>` + M.slice(0, 8).map(d => `<small class="dim">✝ ${esc(d.nome)} (${d.tipo.toLowerCase()}) — dia ${d.dia}, ${esc(d.causa)}</small>`).join('<br>');
    return h;
  },
  opcoes(volta) {
    const o = [];
    for (const m of this.membros()) if (this.doente(m.id)) {
      o.push({ label: `🧪 Dar poção de vida para ${m.r.name}`, cls: 'gold', fn: () => { this.curar(m, 'pocao'); volta(); } });
      o.push({ label: `🩺 Chamar o curandeiro para ${m.r.name} (150 ouro)`, fn: () => { this.curar(m, 'curandeiro'); volta(); } });
    }
    return o;
  }
};

// ---------------- ganchos ----------------
(function () {
  // salvar e carregar a saúde da família e quem já morreu
  const tj0 = Player.prototype.toJSON; Player.prototype.toJSON = function () { const o = tj0.call(this); o.saude = this.saude || {}; o.falecidos = this.falecidos || []; return o; };
  // um dia passa
  const dt0 = Game.dayTick; Game.dayTick = function () { const r = dt0.apply(this, arguments); Luto.dia(); return r; };
  // bandidos atacaram a vila enquanto você estava fora
  const vd0 = Vila.dia;
  Vila.dia = function () {
    const V = Vila.st(), a0 = V ? V.ataques : 0, r = vd0.apply(this, arguments);
    if (V && V.ataques > a0 && !Vila.raid) { const def = (V.built.torre ? 1 : 0) + (V.built.muralha ? 2 : 0); Luto.riscoAtaque([0.14, 0.08, 0.04, 0.02][def], 'morto pelos bandidos que atacaram a vila'); }
    return r;
  };
  // a vila caiu na guerra
  const vc0 = Reino.vilaCaiu; Reino.vilaCaiu = function () { const r = vc0.apply(this, arguments); Luto.riscoAtaque(0.3, 'morto quando a cidade caiu na guerra'); return r; };
  // o cônjuge que luta ao seu lado pode não voltar
  const md0 = Game.onMonsterDeath;
  Game.onMonsterDeath = function (m, killer) {
    if (m.isFollower && m.spouse && Game.player.spouse && Math.random() < (Luto.brutal() ? 0.35 : 0.15)) {
      const P = Game.player, mem = { id: P.spouse, r: P.rel[P.spouse], tipo: 'Cônjuge' };
      const r = md0.apply(this, arguments);
      if (mem.r) Luto.morrer(mem, 'caiu em combate ao seu lado');
      return r;
    }
    return md0.apply(this, arguments);
  };
  // a tela da família mostra a saúde e quem já se foi, com as opções de cuidar
  const fm0 = Familia.menu;
  Familia.menu = function () {
    const op = Luto.opcoes(() => Familia.menu());
    if (!op.length && !Luto.mortos().length) return fm0.call(this);
    UI.dialog('Família', null, Luto.html(), op.concat([{ label: '🎨 Personalizar a família', fn: () => fm0.call(Familia) }, { label: 'Fechar' }]));
  };
  // visitar o túmulo e prestar homenagem (flores)
  const fi0 = Muralhas.findInteract;
  Muralhas.findInteract = function (fx, fy) {
    const r = fi0.call(this, fx, fy); if (r || !Game.level || !Game.level.isWorld || !Vila.st()) return r;
    const t = Construcao.obras().find(o => o.k === 'tumulo' && dist(fx, fy, o.x * 16 + 8, o.y * 16 + 8) < 20);
    if (!t) return null;
    return { kind: 'mar', label: 'Homenagem', name: 'Túmulo' + (t.de ? ' de ' + t.de : ''), d: 3, fn: () => {
      const P = Game.player;
      if (t.flores === Game.day) return Game.toast('Você já deixou flores aqui hoje.', '#c8c8d8');
      t.flores = Game.day; Vida.honra(1, 'lembrei de quem se foi'); Sfx.play('learn');
      Game.toast(`🌼 Você deixou flores no túmulo${t.de ? ' de ' + t.de : ''}. Saudade...`, '#e0d0f0'); void P;
    } };
  };
  // falar com quem está doente em casa
  const pe0 = UI.personal;
  UI.personal = function (a) {
    const id = a.rid || (a.kid && a.kid.id), s = id && Luto.doente(id);
    if (s) { const m = Luto.membros().find(x => x.id === id); if (m) return UI.dialog(a.name, a.look, `${m.tipo === 'Cônjuge' ? 'Não estou me sentindo bem...' : 'Tô com febre... 🤒'}<br><span class="warn">Doente há ${Game.day - s.desde} dia(s).</span>`, Luto.opcoes(() => UI.close()).concat([{ label: 'Descanse, eu já volto' }])); }
    return pe0.call(this, a);
  };
})();
