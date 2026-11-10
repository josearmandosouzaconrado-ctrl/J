'use strict';
// =====================================================================
//  HARÉM: mais de uma esposa (ou esposo) na sua casa
//  • A primeira pessoa com quem você casou é a esposa principal: com ela
//    dá para ter até 10 filhos.
//  • Depois de casado, dá para flertar, namorar e convidar outras pessoas
//    (adultas) para o harém, até 6 no total contando a principal. Com cada
//    uma delas dá para ter 1 filho.
//  • Para convidar: namorar antes, ter um Amuleto da Aurora e a esposa
//    principal precisa aceitar (afeto dela 60 ou mais). Cada convite deixa a
//    principal um pouco enciumada.
//  • Elas moram na sua casa (ou no palácio) junto com a família e dá para
//    conversar, ganhar presentes, ter um filho ou deixar o harém.
// =====================================================================
const Harem = {
  MAX: 6, FILHOS_PRINCIPAL: 10, FILHOS_OUTRAS: 1,
  ids() { const P = Game.player; return ((P && P.harem) || []).filter(id => P.rel[id] && P.rel[id].status === 'harem'); },
  total() { const P = Game.player; return (P && P.spouse ? 1 : 0) + this.ids().length; },
  cheio() { return this.total() >= this.MAX; },
  membro(id) { return this.ids().includes(id); },
  // filhos de cada mãe/pai (os filhos antigos, sem registro, são da esposa principal)
  filhosDe(id) { const P = Game.player; return (P.children || []).filter(k => k.mae ? k.mae === id : id === P.spouse).length; },
  limite(id) { return id === Game.player.spouse ? this.FILHOS_PRINCIPAL : this.FILHOS_OUTRAS; },
  temCasa() { const P = Game.player; return P.spouseHome ? (P.houses.includes(P.spouseHome) || P.spouseHome === 'palacio') : P.houses.length > 0; },
  casaId() { const P = Game.player; return P.spouseHome || P.houses[0] || null; },
  // nunca com crianças nem com a própria família
  podeRomance(a) {
    const P = Game.player;
    if (!a || a.child || a.role === 'child' || a.role === 'kid' || a.family || a.kid || a.angel === 'kid') return false;
    if ((P.children || []).some(k => k.id === a.rid)) return false;
    if (a.look && a.look.short >= 3) return false;
    return true;
  },
  // ---------- as opções na conversa pessoal ----------
  opcoes(c, html, opts) {
    const P = Game.player, { a, r, back } = c, id = a.rid, U = UI, volta = () => U.personal(a, back);
    const fim = opts.length && /^Voltar/.test(String(opts[opts.length - 1].label)) ? opts.pop() : null;
    const add = o => opts.push(o);
    const ela = (m, f) => U.pron(r.sex, m, f);
    if (this.membro(id)) {
      html = html.replace(/<span class="dim">[^<]*(<span[^>]*>[^<]*<\/span>)?[^<]*<\/span><br>/, `<span class="dim"><span class="love">${ela('Seu marido do harém', 'Sua esposa do harém')}</span></span><br>`)
        .replace(/Que bom te ver!|Olá[^<]*|Oi[^<]*/, 'Oi, meu amor!');
      for (let i = opts.length - 1; i >= 0; i--) if (/Flertar|namoro|casamento/.test(opts[i].label)) opts.splice(i, 1);
      if (r.diaH !== Game.day) add({ label: 'Como foi seu dia?', fn: () => {
        r.diaH = Game.day; const g = 25 + P.level * 8;
        if (Math.random() < 0.5) { P.gold += g; Sfx.play('coin'); U.dialog(a.name, a.look, `Guardei um dinheirinho para você. <span class="gold">+${g} ouro</span>`, [{ label: 'Obrigado, meu amor', fn: volta }]); }
        else { P.addItem(Items.make(Math.random() < 0.5 ? 'ensopado' : 'torta_maca', 2)); U.dialog(a.name, a.look, 'Cozinhei para você! Leve na viagem.', [{ label: 'Obrigado, meu amor', fn: volta }]); }
      } });
      const nf = this.filhosDe(id);
      if (nf < this.limite(id) && this.temCasa() && !P.babyDue && r.aff >= 70 && r.babyTryDay !== Game.day) add({ label: 'Vamos ter um filho? 👶', fn: () => {
        r.babyTryDay = Game.day;
        if (typeof Ceu !== 'undefined' && Ceu.babyTry && !Ceu.babyTry(r)) return U.dialog(a.name, a.look, 'Hoje não... talvez outro dia.', [{ label: 'Voltar', fn: volta }]);
        P.babyDue = Game.day + 3; P.babyDe = id; r.aff = Math.min(100, r.aff + 5); Sfx.play('quest');
        U.dialog(a.name, a.look, 'Um bebê! Que alegria! Em alguns dias nossa família vai crescer. 💕', [{ label: 'Voltar', fn: volta }]);
      } });
      else if (nf >= this.limite(id)) html += `<div class="dim small">Vocês já têm ${nf} ${nf === 1 ? 'filho' : 'filhos'} juntos (o limite no harém é ${this.FILHOS_OUTRAS} com cada um).</div>`;
      add({ label: '💔 Deixar o harém', cls: 'danger', fn: () => U.confirm(`${a.name} vai deixar o harém e voltar para a casa ${ela('dele', 'dela')}. Tem certeza?`, () => this.sair(id, a)) });
    } else if (P.spouse && id !== P.spouse && this.podeRomance(a) && r.status !== 'married') {
      // casado(a): dá para cortejar mais alguém enquanto o harém tem lugar
      if (this.cheio()) html += `<div class="dim small">Seu harém já está cheio (${this.MAX}).</div>`;
      else {
        if (r.status !== 'dating' && r.aff >= 25 && r.flirtDay !== Game.day) add({ label: 'Flertar 💕', fn: () => {
          r.flirtDay = Game.day; const ok = Math.random() < 0.3 + P.skill('eloquencia') * 0.005 + r.aff * 0.005;
          r.aff = clamp(r.aff + (ok ? 8 : -5), 0, 100); P.train('eloquencia', 3);
          const L = ok ? ROMANCE_LINES.flirtOk : ['Mas você não é casado(a)?', 'Hmm... e a sua esposa, o que vai achar?', 'Não sei se devo...'];
          U.dialog(a.name, a.look, `${U.hearts(r.aff)}<br>${esc(L[Math.floor(Math.random() * L.length)])}`, [{ label: 'Voltar', fn: volta }]);
        } });
        if (r.status !== 'dating' && r.aff >= 50) add({ label: 'Pedir em namoro', cls: 'gold', fn: () => {
          if (Math.random() < 0.35 + r.aff / 160) { r.status = 'dating'; Sfx.play('quest'); U.dialog(a.name, a.look, `${U.hearts(r.aff)}<br>Mesmo sabendo que você é casado(a)... sim. 💕`, [{ label: 'Voltar', fn: volta }]); }
          else { r.aff = Math.max(0, r.aff - 6); U.dialog(a.name, a.look, 'Você já tem família... preciso pensar.', [{ label: 'Voltar', fn: volta }]); }
        } });
        if (r.status === 'dating') add({ label: `💍 Convidar para o seu harém (${this.total()}/${this.MAX})`, cls: 'gold', fn: () => this.convidar(a, r, volta) });
      }
    }
    if (fim) opts.push(fim);
    return { html, opts };
  },
  convidar(a, r, volta) {
    const P = Game.player, U = UI, sp = P.rel[P.spouse];
    if (this.cheio()) return U.dialog(a.name, a.look, `O harém já tem ${this.MAX} pessoas.`, [{ label: 'Voltar', fn: volta }]);
    if (!P.count('amuleto_aurora')) return U.dialog(a.name, a.look, 'Para o convite você precisa de um <b>Amuleto da Aurora</b> (vendido nos templos).', [{ label: 'Voltar', fn: volta }]);
    if (r.aff < 80) return U.dialog(a.name, a.look, `${U.hearts(r.aff)}<br>Gosto de você... mas ainda é cedo. <span class="dim">(Precisa de 80 de afeto)</span>`, [{ label: 'Voltar', fn: volta }]);
    if (!this.temCasa()) return U.dialog(a.name, a.look, 'E onde vamos morar? Compre uma casa primeiro.', [{ label: 'Voltar', fn: volta }]);
    if (sp && sp.aff < 60) return U.dialog(a.name, a.look, `${esc(sp.name)} não aceita dividir a casa com mais ninguém. <span class="dim">(O afeto da sua esposa principal precisa ser 60 ou mais: converse e dê presentes para ${U.pron(sp.sex, 'ele', 'ela')}.)</span>`, [{ label: 'Voltar', fn: volta }]);
    P.removeItem && P.removeItem('amuleto_aurora', 1);
    P.harem = P.harem || []; if (!P.harem.includes(a.rid)) P.harem.push(a.rid);
    r.status = 'harem'; r.aff = 100; r.casaH = this.casaId(); r.desde = Game.day;
    if (sp) sp.aff = Math.max(0, sp.aff - 10);                 // um pouco de ciúme
    Sfx.play('levelup');
    for (let i = 0; i < 30; i++) Game.particle(P.x + (Math.random() - 0.5) * 40, P.y - 10, (Math.random() - 0.5) * 40, -40 - Math.random() * 60, Math.random() < 0.5 ? '#ff80b0' : '#fff0a0', 1.4, 2);
    Game.centerMsg('NOVO MEMBRO DO HARÉM 💍', `${a.name} vai morar com a sua família (${this.total()}/${this.MAX})`);
    Game.chron(`${a.name} entrou para o meu harém.`); P.addXP(120);
    U.dialog(a.name, a.look, `Sim! Vou morar com vocês. 💕${sp ? `<div class="dim small">${esc(sp.name)} ficou um pouco enciumad${sp.sex === 'f' ? 'a' : 'o'} (−10 de afeto).</div>` : ''}`, [{ label: 'Te amo!', fn: () => U.close() }]);
  },
  sair(id, a) {
    const P = Game.player, r = P.rel[id];
    P.harem = (P.harem || []).filter(x => x !== id);
    if (r) { r.status = 'none'; r.aff = Math.min(r.aff, 40); }
    if (a && a.indoor) { a.dead = true; a.deadT = 10; }
    UI.close(); Game.toast(`${a ? a.name : 'Ela'} deixou o harém.`, '#ffb0c0');
  },
  // as esposas do harém aparecem em casa com a família
  emCasa() {
    const G = Game, P = G.player, L = G.level; if (!L || !L.isInterior || !L.b) return;
    const b = L.b, s = b.settlement; if (!s) return;
    const minha = (b.role === 'playerhouse' && P.houses.includes(s.id)) || b.player; if (!minha) return;
    const rng = new RNG((Math.random() * 1e9) | 0);
    this.ids().forEach((id, i) => {
      const r = P.rel[id]; if (!r || !r.look) return;
      const casa = r.casaH || this.casaId();
      if (!(casa === s.id || (b.player && casa === 'palacio') || (b.player && P.spouseHome === 'palacio'))) return;
      if (G.actors.some(x => x.rid === id && !x.dead)) return;
      const a = new NPC({ role: 'spouse', x: 4 + (i % 4) * 2, y: Math.floor(L.h / 2) + 2 + Math.floor(i / 4) }, s, rng);
      a.name = r.name; a.race = r.race; a.sex = r.sex; a.look = Object.assign({}, r.look); a.S = Sprites.actor(a.look); a.h = a.S.h;
      a.rid = id; a.family = 'harem'; a.indoor = true; G.findFree(a); a.home = { x: a.x, y: a.y }; G.actors.push(a);
    });
  },
  // a lista na aba Família
  html() {
    const P = Game.player, ids = this.ids(); if (!P.spouse && !ids.length) return '';
    const sp = P.rel[P.spouse];
    let h = `<h3>💞 Harém (${this.total()}/${this.MAX})</h3>`;
    if (sp) h += `<div>👑 ${esc(sp.name)} <span class="dim">— esposa principal • filhos: ${this.filhosDe(P.spouse)}/${this.FILHOS_PRINCIPAL}</span></div>`;
    for (const id of ids) { const r = P.rel[id]; h += `<div>💕 ${esc(r.name)} <span class="dim">— ${UI.hearts(r.aff)} • filhos: ${this.filhosDe(id)}/${this.FILHOS_OUTRAS}</span></div>`; }
    if (!ids.length) h += '<div class="dim small">Depois de casado(a), converse com alguém, namore e use o Amuleto da Aurora para convidar para o harém.</div>';
    return h;
  }
};

// ---------------- ganchos ----------------
(function () {
  // a conversa pessoal ganha as opções do harém
  const p0 = UI.personal;
  UI.personal = function (a, back) {
    const P = Game.player;
    if (!P || !a || a.child || a.role === 'child' || !a.rid) return p0.apply(this, arguments);
    const r = this.relOf(a);
    Harem._ctx = { a, r, back };
    try { return p0.apply(this, arguments); } finally { Harem._ctx = null; }
  };
  const d0 = UI.dialog;
  UI.dialog = function (name, look, html, opts, ...rest) {
    const c = Harem._ctx;
    if (c && Array.isArray(opts)) { Harem._ctx = null; try { const x = Harem.opcoes(c, html, opts.slice()); html = x.html; opts = x.opts; } catch (e) { console.warn('harem', e); } }
    return d0.call(this, name, look, html, opts, ...rest);
  };
  // o bebê nasce com a raça da mãe/pai certo e fica registrado de quem é
  const dt0 = Game.dayTick;
  Game.dayTick = function () {
    const P = this.player;
    if (P && P.babyDue && this.day >= P.babyDue) {
      const de = P.babyDe || P.spouse, sp0 = P.spouse, n0 = (P.children || []).length;
      if (de && P.rel[de]) P.spouse = de;
      let r; try { r = dt0.apply(this, arguments); } finally { P.spouse = sp0; }
      if ((P.children || []).length > n0) P.children[P.children.length - 1].mae = de || sp0;
      P.babyDe = null;
      return r;
    }
    return dt0.apply(this, arguments);
  };
  // as esposas do harém aparecem em casa
  const ei0 = Game.enterInterior;
  Game.enterInterior = function () { const r = ei0.apply(this, arguments); try { Harem.emCasa(); } catch (e) { } return r; };
  // salvar e carregar
  const tj0 = Player.prototype.toJSON; Player.prototype.toJSON = function () { const o = tj0.call(this); if (this.harem && this.harem.length) o.harem = this.harem; if (this.babyDe) o.babyDe = this.babyDe; return o; };
  const fj0 = Player.fromJSON; Player.fromJSON = function (o) { const p = fj0.apply(this, arguments); if (o && o.harem) p.harem = o.harem; if (o && o.babyDe) p.babyDe = o.babyDe; return p; };
  // na aba Família
  const ft0 = UI.familyTab;
  if (ft0) UI.familyTab = function () { const h = ft0.apply(this, arguments); try { const x = Harem.html(); return x ? h + `<div class="harem-box" style="margin-top:8px">${x}</div>` : h; } catch (e) { return h; } };
})();
