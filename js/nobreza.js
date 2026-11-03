'use strict';
// ===================== NOBREZA E CASAMENTOS REAIS =====================
// Todo reino tem a sua família real (príncipes e princesas) e casas nobres (duques, condes e
// barões). Quem é rei ou rainha pode casar os filhos com príncipes, princesas ou herdeiros nobres:
// casamentos com outros reinos selam alianças; com a nobreza do seu reino trazem dote e honra.
// O Palácio Real do jogador tem quartos para a família real, e a família passa a morar lá.
const TITULOS_NOBRES = [['Duque', 'Duquesa'], ['Conde', 'Condessa'], ['Barão', 'Baronesa']];
const Nobreza = {
  st() { const S = War.st(); if (!S.nobreza) S.nobreza = { casados: {}, unioes: [] }; return S.nobreza; },
  raca(k) { const K = War.K[k]; return (K && K.race && NAMES[K.race]) ? K.race : 'humano'; },
  // família real e casas nobres de um reino (sempre as mesmas para o mesmo mundo)
  familia(k) {
    this._fam = this._fam || {};
    const key = k + Game.world.seed;
    if (this._fam[key]) return this._fam[key];
    const K = War.K[k], race = this.raca(k), N = NAMES[race], rng = new RNG(hashStr(key) + 17);
    const sobrenome = K && K.ruler && K.ruler.name ? K.ruler.name.split(' ').slice(-1)[0] : rng.pick(N.s);
    const pessoa = (sexo, titulo, idade0) => ({ id: k + ':' + rng.int(1, 1e9), nome: rng.pick(N[sexo]) + ' ' + sobrenome, sexo, titulo, idade0, race, k, look: this.vestir(npcLook(race, sexo, new RNG(rng.int(1, 1e9)), 'citizen'), titulo, K) });
    const herdeiros = [];
    for (let i = 0, n = rng.int(2, 4); i < n; i++) { const sx = rng.chance(0.5) ? 'm' : 'f'; herdeiros.push(pessoa(sx, sx === 'm' ? 'Príncipe' : 'Princesa', rng.int(12, 24))); }
    const casas = [];
    for (let i = 0; i < 3; i++) {
      const sob = rng.pick(N.s), T_ = TITULOS_NOBRES[i], sxc = rng.chance(0.6) ? 'm' : 'f';
      const chefe = { nome: rng.pick(N[sxc]) + ' ' + sob, titulo: T_[sxc === 'm' ? 0 : 1] };
      const hs = []; for (let j = 0; j < 2; j++) { const sx = rng.chance(0.5) ? 'm' : 'f'; const h = pessoa(sx, (sx === 'm' ? 'Herdeiro' : 'Herdeira') + ' da Casa ' + sob, rng.int(13, 26)); h.nome = rng.pick(N[sx]) + ' ' + sob; hs.push(h); }
      casas.push({ nome: 'Casa de ' + sob, chefe, herdeiros: hs, rank: i });
    }
    return (this._fam[key] = { k, herdeiros, casas });
  },
  vestir(L, titulo, K) {
    const real = /Príncipe|Princesa/.test(titulo), cor = K ? K.color : '#8a2040';
    L = Object.assign({}, L, { body: real ? shade(cor, -0.1) : shade(cor, -0.3), cape: real ? '#8a2040' : shade(cor, -0.45), trim: '#f0d060' });
    if (real) L.crown = true; else delete L.hat;
    return L;
  },
  idade(p) { return p.idade0 + Math.floor((Game.day || 1) / 12); },
  // a nobreza do reino do jogador (formada quando ele se torna rei)
  familiaPropria() {
    const P = Game.player, k = 'jogador';
    this._fam = this._fam || {};
    const key = k + Game.world.seed + P.race;
    if (this._fam[key]) return this._fam[key];
    const race = NAMES[P.race] ? P.race : 'humano', N = NAMES[race], rng = new RNG(hashStr(key) + 3), casas = [];
    for (let i = 0; i < 3; i++) {
      const sob = rng.pick(N.s), T_ = TITULOS_NOBRES[i], hs = [];
      for (let j = 0; j < 2; j++) { const sx = rng.chance(0.5) ? 'm' : 'f'; hs.push({ id: 'j:' + rng.int(1, 1e9), nome: rng.pick(N[sx]) + ' ' + sob, sexo: sx, titulo: (sx === 'm' ? 'Herdeiro' : 'Herdeira') + ' da Casa ' + sob, idade0: rng.int(14, 24), race, k, look: this.vestir(npcLook(race, sx, new RNG(rng.int(1, 1e9)), 'citizen'), '', War.K.jogador) }); }
      casas.push({ nome: 'Casa de ' + sob, chefe: { nome: rng.pick(N[rng.chance(0.5) ? 'm' : 'f']) + ' ' + sob, titulo: T_[0] }, herdeiros: hs, rank: i });
    }
    return (this._fam[key] = { k, herdeiros: [], casas });
  },
  filhos() { const P = Game.player; return (P.children || []).filter(c => !c.conjuge); },
  idadeFilho(c) { return Game.day - c.born; },
  casado(p) { return !!this.st().casados[p.id]; },
  // ---------- telas ----------
  botoesTab(f) {
    if (!War.K) return '';
    return `<div class="quest"><b>👑 Famílias nobres</b><br><small class="dim">Príncipes, princesas e casas nobres de cada reino${Reino.ativo() ? ' — e os casamentos reais dos seus filhos' : ''}.</small><br><button class="mbtn" ${f(() => this.menu())}>👑 Ver famílias nobres</button></div>`;
  },
  menu() {
    const ks = War.kingdoms().filter(k => k.id !== 'jogador' && !k.extinto);
    const P = Game.player;
    const opts = ks.slice(0, 12).map(K => ({ label: `${K.short} — ${K.ruler.title} ${K.ruler.name}`, fn: () => this.verReino(K.id, () => this.menu()) }));
    if (Reino.ativo()) opts.unshift({ label: `🏰 Nobreza do ${Reino.nome()}`, cls: 'gold', fn: () => this.verProprio(() => this.menu()) });
    const unioes = this.st().unioes.map(u => `💍 ${esc(u.filho)} e ${esc(u.conjuge)} <span class="dim">(${esc(u.reino)}, dia ${u.dia})</span>`).join('<br>');
    UI.dialog('Famílias nobres', null, (Reino.ativo() ? `Como ${Reino.titulo()}, você pode casar seus filhos (${(P.children || []).length}) com a nobreza.<br>` : 'Só monarcas arranjam casamentos reais.<br>') + (unioes ? '<br>' + unioes : ''), opts.concat([{ label: 'Fechar' }]));
  },
  linha(p) { const c = this.casado(p); return `${esc(p.titulo)} <b>${esc(p.nome)}</b>, ${this.idade(p)} anos${c ? ' — <span class="dim">casado(a)</span>' : ''}`; },
  verReino(k, back) {
    const K = War.K[k], F = this.familia(k);
    const txt = `<b style="color:${K.color}">■</b> <b>${esc(K.name)}</b><br>${esc(K.ruler.title)} ${esc(K.ruler.name)}<br><br><b>Família real</b><br>${F.herdeiros.map(p => this.linha(p)).join('<br>')}<br><br><b>Casas nobres</b><br>` +
      F.casas.map(c => `${esc(c.nome)} — ${esc(c.chefe.titulo)} ${esc(c.chefe.nome)}`).join('<br>');
    const opts = [];
    for (const p of F.herdeiros.concat(...F.casas.map(c => c.herdeiros))) if (!this.casado(p)) opts.push({ label: `💍 ${p.titulo.split(' ')[0]} ${p.nome.split(' ')[0]} (${this.idade(p)} anos)`, fn: () => this.casarCom(p, () => this.verReino(k, back)) });
    opts.push({ label: 'Voltar', fn: back });
    UI.dialog('Família real de ' + K.short, F.herdeiros[0] ? F.herdeiros[0].look : null, txt, opts);
  },
  verProprio(back) {
    const F = this.familiaPropria();
    const txt = `As casas nobres que juraram lealdade ao <b>${esc(Reino.nome())}</b>:<br><br>` + F.casas.map(c => `<b>${esc(c.nome)}</b> — ${esc(c.chefe.titulo)} ${esc(c.chefe.nome)}<br>${c.herdeiros.map(p => this.linha(p)).join('<br>')}`).join('<br><br>');
    const opts = [];
    for (const c of F.casas) for (const p of c.herdeiros) if (!this.casado(p)) opts.push({ label: `💍 ${p.nome} (${this.idade(p)} anos)`, fn: () => this.casarCom(p, () => this.verProprio(back)) });
    opts.push({ label: 'Voltar', fn: back });
    UI.dialog('Nobreza do seu reino', null, txt, opts);
  },
  // casar com quem: um dos seus filhos ou você mesmo(a)
  casarCom(par, back) {
    const P = Game.player, o = [];
    if (Reino.ativo()) o.push({ label: '👪 Casar com um dos meus filhos', fn: () => this.escolherFilho(par, () => this.casarCom(par, back)) });
    if (!P.spouse) o.push({ label: '💍 Pedir a mão para mim', cls: 'gold', fn: () => CasamentoDiplo.meu(par, () => this.casarCom(par, back)) });
    if (!o.length) return UI.dialog('Casamento', par.look, 'Só monarcas arranjam casamentos para os filhos, e você já é casado(a).', [{ label: 'Voltar', fn: back }]);
    o.push({ label: 'Voltar', fn: back });
    UI.dialog(`${par.titulo} ${par.nome}`, par.look, `${esc(par.titulo)} <b>${esc(par.nome)}</b>, ${this.idade(par)} anos. Um casamento une famílias e reinos.`, o);
  },
  escolherFilho(par, back) {
    const l = this.filhos();
    if (!l.length) return UI.dialog('Casamento real', null, 'Você não tem filhos solteiros. Case-se e tenha filhos para arranjar casamentos reais.', [{ label: 'Voltar', fn: back }]);
    UI.dialog('Casamento real', par.look, `Qual dos seus filhos vai se casar com <b>${esc(par.titulo)} ${esc(par.nome)}</b>?`, l.map(c => ({ label: `${c.sex === 'f' ? 'Princesa' : 'Príncipe'} ${c.name} (${this.idadeFilho(c)} anos)`, fn: () => this.propor(par, c, back) })).concat([{ label: 'Voltar', fn: back }]));
  },
  propor(par, filho, back) {
    const P = Game.player, k = par.k, S = this.st();
    const reino = k === 'jogador' ? Reino.nome() : War.K[k].short;
    const idade = this.idadeFilho(filho);
    if (k !== 'jogador') {
      if (War.atWar('jogador', k)) return UI.dialog(reino, null, 'Estamos em guerra! Nenhum filho do nosso sangue se casa com o inimigo.', [{ label: 'Voltar', fn: back }]);
      const rel = Reino.rel(k), chance = clamp(0.25 + rel / 100 + (P.honra || 0) / 250 + Missionarios.bonus(k) + (/Príncipe|Princesa/.test(par.titulo) ? -0.1 : 0.1), 0.05, 0.95);
      if (rel < -10 || Math.random() > chance) { Reino.addRel(k, -3); return UI.dialog(reino, null, `${esc(War.K[k].ruler.title)} ${esc(War.K[k].ruler.name)} recusou a proposta. <span class="dim">Melhore as relações (presentes, comércio) e tente de novo.</span>`, [{ label: 'Voltar', fn: back }]); }
    }
    S.casados[par.id] = true;
    filho.conjuge = par.nome; filho.conjugeLook = par.look; filho.noivo = idade < 15;
    S.unioes.push({ filho: filho.name, conjuge: `${par.titulo} ${par.nome}`, reino, dia: Game.day });
    if (k !== 'jogador') {
      Reino.addRel(k, 30);
      const t = Reino.trat(k); if (Reino.rel(k) >= 50) t.alianca = true;
      War.news(`💍 Casamento real entre o ${Reino.nome()} e ${War.K[k].name}!`, true, [k, 'jogador']);
    } else { const dote = 400 + par.idade0 * 20; P.gold += dote; Vida.honra(6, 'casei meu filho com a nobreza do reino'); Game.toast(`Dote recebido: ${dote} de ouro`, '#ffd060'); }
    Sfx.play('levelup');
    Game.centerMsg(idade < 15 ? 'NOIVADO REAL!' : 'CASAMENTO REAL!', `${filho.name} e ${par.titulo} ${par.nome}${k !== 'jogador' ? ` — aliança de sangue com ${reino}` : ''}`);
    Game.chron(`${idade < 15 ? 'Arranjei o noivado de' : 'Casei'} ${filho.name} com ${par.titulo} ${par.nome} (${reino}).`);
    UI.close();
  },
  // ---------- palácio: quartos da família real ----------
  quartos(L, W, H, dx) {
    const put = (x, y, o) => L.put(x, y, o);
    // ala esquerda: quarto do rei/rainha; ala direita: quartos dos filhos
    put(2, H - 3, O.BED); put(3, H - 3, O.WARDROBE); put(1, H - 5, O.CANDLE); put(4, H - 5, O.PLANT);
    for (let x = 1; x <= 5; x++) L.setFloor(x, H - 4, T.CARPET);
    for (const x of [W - 3, W - 5, W - 7]) { put(x, H - 3, O.BEDSMALL); }
    put(W - 2, H - 5, O.WARDROBE); put(W - 8, H - 5, O.CANDLE);
    for (let x = W - 8; x <= W - 2; x++) L.setFloor(x, H - 4, T.CARPET);
    L.quartosReais = true; void dx;
  }
};
