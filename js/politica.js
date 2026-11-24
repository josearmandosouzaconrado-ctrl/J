'use strict';
// =====================================================================
//  POLÍTICA — cada forma de governo funciona de verdade
//  • Monarquia: o poder é todo seu.
//  • República: as casas nobres disputam a liderança com você. A cada 30
//    dias tem eleição; faça campanha (discursos, pão para o povo, banquetes,
//    alianças com uma casa). Quem perde vira Senador(a): a guerra, a paz e
//    os impostos ficam com o Cônsul eleito até a próxima eleição.
//  • Conselho Mercante: igual, mas as famílias de mercadores votam pelo ouro.
//  • Comuna do Povo: um Conselho dos Anciãos governa e escolhe o Porta-voz
//    a cada 30 dias. Você só tem assento no conselho a partir dos 50 anos.
//  • Junta Militar: generais e comandantes no lugar das casas nobres. Se a
//    lealdade deles cair, um general dá um golpe; com os generais do seu lado
//    você pode dar o contragolpe.
//  • Revoluções: uma guerra civil que o povo vence derruba a monarquia e
//    traz a república ou a comuna; um exército descontente traz a junta.
//  • Os reinos do mundo também: repúblicas fazem eleições, juntas sofrem
//    golpes e comunas trocam de Porta-voz (aparece nas notícias).
// =====================================================================
const POL_IDADE_CONSELHO = 50;   // idade para ter assento no Conselho dos Anciãos
const POL_MANDATO = 30;          // dias entre eleições / assembleias
const POL_GOVS = ['republica', 'mercante', 'comuna', 'junta'];

const Politica = {
  R() { const P = Game.player; return P && P.reino; },
  gov() { return Governos.de('jogador'); },
  st() {
    const R = this.R(); if (!R) return null;
    const g = this.gov();
    if (!R.pol || R.pol.g !== g) this.iniciar(g);
    return R.pol;
  },
  sexoP() { const P = Game.player; return (P.app && P.app.sex) || 'm'; },
  raca() { const P = Game.player; return NAMES[P.race] ? P.race : 'humano'; },
  rng() { return new RNG(Math.floor(Math.random() * 1e9)); },
  pessoa(rng, sobrenome) {
    const N = NAMES[this.raca()], sx = rng.chance(0.5) ? 'm' : 'f';
    return { nome: rng.pick(N[sx]) + ' ' + (sobrenome || rng.pick(N.s)), sexo: sx };
  },
  ritmo() { const P = Game.player; return (P && P.vidaRitmo) || 12; },     // dias de jogo por ano de vida
  idade(p) { return Math.floor(p.idade0 + (Game.day - p.dia0) / this.ritmo()); },
  // ---------- começar um governo novo ----------
  iniciar(g, lider) {
    const R = this.R(), rng = this.rng(), S = { g, dia0: Game.day, lider: lider || null, feito: {}, log: [] };
    if (g === 'republica' || g === 'mercante') {
      const casas = g === 'republica' ? Nobreza.familiaPropria().casas.map(c => ({ nome: c.chefe.nome, casa: c.nome, sexo: Governos.sexo(c.chefe.nome, this.raca()) }))
        : [0, 1, 2].map(() => { const p = this.pessoa(rng); return { nome: p.nome, casa: 'Família ' + p.nome.split(' ').slice(-1)[0], sexo: p.sexo }; });
      S.cands = [{ id: 'jogador', nome: Game.player.name, casa: 'Você', apoio: 34 }].concat(casas.map((c, i) => ({ id: 'c' + i, nome: c.nome, casa: c.casa, sexo: c.sexo, apoio: 0 })));
      let resto = 66; S.cands.slice(1).forEach((c, i, L) => { c.apoio = i === L.length - 1 ? resto : rng.int(14, 26); resto -= c.apoio; });
      if (lider) { const c = S.cands.find(c => c.nome === lider.nome); if (c) c.apoio += 12; else S.cands.push({ id: 'c' + S.cands.length, nome: lider.nome, casa: 'Líder da revolução', sexo: lider.sexo, apoio: 28 }); this.normalizar(S); }
      S.eleicao = Game.day + (lider ? 15 : POL_MANDATO);
    } else if (g === 'comuna') {
      S.conselho = [];
      for (let i = 0; i < 5; i++) { const p = this.pessoa(rng); S.conselho.push({ nome: p.nome, sexo: p.sexo, idade0: rng.int(58, 79), dia0: Game.day }); }
      S.apoio = 45;                       // quanto o conselho confia em você (0 a 100)
      S.assembleia = Game.day + (lider ? 15 : POL_MANDATO);
      // quem fundou a comuna com 50 anos ou mais começa como Porta-voz; os mais novos ficam fora do conselho
      if (!lider && Geracoes.anos() < POL_IDADE_CONSELHO) S.lider = this.maisVelho(S);
    } else if (g === 'junta') {
      S.generais = [];
      for (let i = 0; i < 4; i++) { const p = this.pessoa(rng); S.generais.push({ nome: p.nome, sexo: p.sexo, posto: i < 2 ? 'General' : 'Comandante', leal: rng.int(55, 80) }); }
    }
    R.pol = S;
    return S;
  },
  normalizar(S) { const t = S.cands.reduce((s, c) => s + Math.max(1, c.apoio), 0); for (const c of S.cands) c.apoio = Math.max(1, c.apoio) * 100 / t; },
  maisVelho(S) { const v = S.conselho.slice().sort((a, b) => this.idade(b) - this.idade(a))[0]; return { nome: v.nome, sexo: v.sexo, cargo: 'Porta-voz' }; },
  // ---------- quem manda ----------
  manda() { const R = this.R(); if (!R || !Reino.ativo()) return true; const S = this.st(); return !S || !S.lider; },
  lider() { const S = this.st(); if (!S || !S.lider) return null; const L = S.lider, g = this.gov(); return { nome: L.nome, titulo: L.cargo || Governos.titulo(g, L.sexo) }; },
  membroConselho() { return Geracoes.anos() >= POL_IDADE_CONSELHO; },
  meuCargo() {
    const g = this.gov(), f = this.sexoP() === 'f';
    if (g === 'republica') return f ? 'Senadora' : 'Senador';
    if (g === 'mercante') return f ? 'Conselheira Mercante' : 'Conselheiro Mercante';
    if (g === 'comuna') return this.membroConselho() ? (f ? 'Anciã do Conselho' : 'Ancião do Conselho') : (f ? 'Cidadã' : 'Cidadão');
    if (g === 'junta') return f ? 'Comandante' : 'Comandante';
    return null;
  },
  semPoder(oque, back) {
    const L = this.lider(), S = this.st(), g = this.gov();
    const quando = g === 'republica' || g === 'mercante' ? `A próxima eleição é no dia ${S.eleicao}: faça campanha em 🗳 Política.` : g === 'comuna' ? (this.membroConselho() ? `O conselho escolhe o Porta-voz de novo no dia ${S.assembleia}.` : `Você só pode ter assento no Conselho dos Anciãos a partir dos ${POL_IDADE_CONSELHO} anos (hoje tem ${Geracoes.anos()}).`) : 'Conquiste a lealdade dos generais e dê o contragolpe em 🗳 Política.';
    UI.dialog('🏛 Você não governa', null, `Quem decide ${oque} é <b>${esc(L.titulo)} ${esc(L.nome)}</b>. Você é ${esc(this.meuCargo())}.<br><br>${quando}`, [{ label: '🗳 Política', fn: () => this.tela(back) }, { label: 'Voltar', fn: back || (() => UI.close()) }]);
  },
  // ---------- todo dia ----------
  dia() {
    if (!Game.player) return;
    try { this.diaIA(); } catch (e) { console.warn('Política IA', e); }
    if (!Reino.ativo() || !Vila.st()) return;
    const S = this.st(), g = S.g, rng = this.rng(), felic = this.felic();
    S.feito = {};
    if (g === 'republica' || g === 'mercante') {
      const eu = S.cands.find(c => c.id === 'jogador');
      eu.apoio += (felic - 50) / 25 + (S.lider ? 0 : 0.3);                // povo feliz apoia quem governa (ou a oposição, se infeliz)
      for (const c of S.cands) if (c.id !== 'jogador') c.apoio += rng.next() * 2.2;
      this.normalizar(S);
      if (Game.day >= S.eleicao) this.eleicao();
    } else if (g === 'comuna') {
      S.apoio = clamp(S.apoio + (felic - 50) / 30, 0, 100);
      // anciãos morrem de velhice e outros entram
      for (const v of S.conselho.slice()) if (this.idade(v) > 82 && rng.chance(0.05)) {
        S.conselho.splice(S.conselho.indexOf(v), 1); const p = this.pessoa(rng); S.conselho.push({ nome: p.nome, sexo: p.sexo, idade0: rng.int(58, 70), dia0: Game.day });
        this.noticia(`🕯 ${v.nome}, do Conselho dos Anciãos, morreu aos ${this.idade(v)} anos. ${p.nome} assumiu o assento.`);
        if (S.lider && S.lider.nome === v.nome) S.lider = this.maisVelho(S);
      }
      if (!S.avisou50 && this.membroConselho()) { S.avisou50 = true; this.noticia(`✊ Você completou ${POL_IDADE_CONSELHO} anos e agora tem assento no Conselho dos Anciãos.`, true); }
      if (Game.day >= S.assembleia) this.assembleia();
    } else if (g === 'junta') {
      for (const gn of S.generais) gn.leal = clamp(gn.leal - rng.next() * 1.6 + (felic > 60 ? 0.4 : 0) + (War.warOf('jogador').length ? 0.3 : -0.2), 0, 100);
      const media = S.generais.reduce((s, x) => s + x.leal, 0) / S.generais.length;
      if (!S.lider && media < 45 && !S.avisoLeal) { S.avisoLeal = true; this.noticia('⚠ Os generais da junta estão insatisfeitos. Pague o soldo extra ou promova alguém antes que haja um golpe (Reinos → 🗳 Política).', true); }
      if (media > 55) S.avisoLeal = false;
      if (!S.lider && media < 38 && rng.chance(0.3)) this.golpeJunta();
    }
    // quem governa no seu lugar também decide
    if (S.lider) this.decidirPorVoce(rng);
  },
  felic() { try { return Povo.st().felic; } catch (e) { return 50; } },
  noticia(t, grande) { War.news(t, !!grande, ['jogador']); const V = Vila.st(); if (V && grande) V.noticia = t; Game.chron(t.replace(/^\S+\s/, '')); },
  // ---------- república e conselho mercante: eleição ----------
  eleicao() {
    const S = this.st(), rng = this.rng(), g = S.g;
    const votos = S.cands.map(c => ({ c, v: Math.max(0.5, c.apoio + (rng.next() - 0.5) * 8) }));
    const t = votos.reduce((s, x) => s + x.v, 0); votos.sort((a, b) => b.v - a.v);
    const venc = votos[0].c, pct = Math.round(votos[0].v * 100 / t);
    const tit = Governos.titulo(g, venc.id === 'jogador' ? this.sexoP() : venc.sexo);
    const era = S.lider ? S.lider.nome : Game.player.name;
    S.ultima = { dia: Game.day, res: votos.map(x => [x.c.nome, Math.round(x.v * 100 / t)]) };
    S.eleicao = Game.day + POL_MANDATO;
    if (venc.id === 'jogador') {
      S.lider = null;
      this.noticia(`🗳 Eleições no ${Reino.nome()}: ${Game.player.name} ${era === Game.player.name ? 'foi reeleito(a)' : 'venceu e volta a governar'} com ${pct}% dos votos.`, true);
      Game.centerMsg('🗳 VOCÊ VENCEU A ELEIÇÃO!', `${tit} ${Game.player.name} • ${pct}% dos votos`);
    } else {
      S.lider = { nome: venc.nome, sexo: venc.sexo };
      this.noticia(`🗳 Eleições no ${Reino.nome()}: ${venc.nome} (${venc.casa}) venceu com ${pct}% e é ${tit}. ${Game.player.name} agora é ${this.meuCargo()}.`, true);
      Game.centerMsg('🗳 VOCÊ PERDEU A ELEIÇÃO', `${tit} ${venc.nome} governa até o dia ${S.eleicao}`);
    }
    Sfx.play('quest');
  },
  campanha(acao) {
    const S = this.st(), eu = S.cands.find(c => c.id === 'jogador'), rng = this.rng(), V = Vila.st(), P = Game.player;
    if (S.feito[acao]) return Game.toast('Você já fez isso hoje. Volte amanhã.', '#ffb080');
    const pagar = n => { if (V.cofre >= n && this.manda()) { V.cofre -= n; return true; } if (P.gold >= n) { P.gold -= n; return true; } Game.toast(`Faltam ${n} de ouro${this.manda() ? '' : ' (sem governar, o cofre do reino não é seu: paga da bolsa)'}.`, '#ff8080'); return false; };
    let ganho = 0, txt = '';
    if (acao === 'discurso') { ganho = this.felic() >= 40 ? rng.range(1, 4) : rng.range(-2, 2.5); txt = ganho > 1 ? 'A praça aplaudiu o seu discurso!' : ganho > 0 ? 'Algumas pessoas gostaram do discurso.' : 'O povo vaiou o seu discurso...'; }
    else if (acao === 'pao') { if (!pagar(400)) return; ganho = rng.range(4, 7); try { Povo.st().felic = clamp(Povo.st().felic + 2, 0, 100); } catch (e) { } txt = 'Você distribuiu pão nas praças. O povo não esquece quem mata a sua fome.'; }
    else if (acao === 'banquete') { if (!pagar(600)) return; ganho = rng.range(4, 6); txt = 'O banquete agradou a nobreza.'; }
    else if (acao === 'guildas') { if (!pagar(1000)) return; ganho = rng.range(7, 10); txt = 'As guildas de mercadores agora estão do seu lado.'; }
    else if (acao.startsWith('alianca:')) {
      const c = S.cands.find(x => x.id === acao.slice(8)); if (!c) return;
      if (!pagar(800)) return;
      const ok = rng.chance(c.apoio < eu.apoio ? 0.8 : 0.35);
      if (ok) { ganho = c.apoio * 0.7; S.cands = S.cands.filter(x => x !== c); txt = `${c.nome} retirou a candidatura e pediu votos para você!`; }
      else { txt = `${c.nome} aceitou o ouro... e continuou candidato(a).`; }
    }
    S.feito[acao.split(':')[0]] = true;
    eu.apoio += ganho; this.normalizar(S);
    Game.toast(`${txt} (${ganho >= 0 ? '+' : ''}${ganho.toFixed(1)}%)`, ganho > 0 ? '#a0ffa0' : '#ffb080');
    this.tela(this._back);
  },
  // ---------- comuna: o Conselho dos Anciãos escolhe o Porta-voz ----------
  assembleia() {
    const S = this.st(), rng = this.rng();
    S.assembleia = Game.day + POL_MANDATO;
    const membro = this.membroConselho();
    let meus = 0;
    const votos = S.conselho.map(v => { const eu = membro && rng.chance(S.apoio / 100); if (eu) meus++; return eu; });
    if (membro) meus++;                                           // o seu próprio voto
    const total = S.conselho.length + (membro ? 1 : 0);
    if (membro && meus > total / 2) {
      S.lider = null;
      this.noticia(`✊ Assembleia da Comuna: o Conselho dos Anciãos escolheu ${Game.player.name} como Porta-voz (${meus} de ${total} votos).`, true);
      Game.centerMsg('✊ VOCÊ É O PORTA-VOZ', `${meus} de ${total} votos do Conselho dos Anciãos`);
    } else {
      const velhos = S.conselho.filter((v, i) => !votos[i]);
      const esc0 = (velhos.length ? velhos : S.conselho).slice().sort((a, b) => this.idade(b) - this.idade(a))[rng.int(0, Math.min(1, Math.max(0, velhos.length - 1)))];
      S.lider = { nome: esc0.nome, sexo: esc0.sexo, cargo: 'Porta-voz' };
      this.noticia(`✊ Assembleia da Comuna: ${esc0.nome}, ${this.idade(esc0)} anos, é o(a) novo(a) Porta-voz.${membro ? ` Você recebeu ${meus} de ${total} votos.` : ''}`, true);
    }
    Sfx.play('quest');
  },
  conselhoAcao(acao) {
    const S = this.st(), rng = this.rng(), V = Vila.st(), P = Game.player;
    if (S.feito[acao]) return Game.toast('Você já fez isso hoje. Volte amanhã.', '#ffb080');
    let ganho = 0, txt = '';
    if (acao === 'discursar') {
      if (!this.membroConselho()) return Game.toast(`Só quem tem ${POL_IDADE_CONSELHO} anos ou mais fala no conselho.`, '#ffb080');
      ganho = rng.range(-1, 5); txt = ganho > 2 ? 'Os anciãos concordaram com as suas palavras.' : ganho > 0 ? 'Alguns anciãos balançaram a cabeça.' : 'Os anciãos acharam você impaciente demais.';
    } else if (acao === 'ajudar') {
      const n = 300; if (P.gold >= n) P.gold -= n; else if (V.cofre >= n && this.manda()) V.cofre -= n; else return Game.toast('Faltam 300 de ouro.', '#ff8080');
      ganho = rng.range(3, 6); try { Povo.st().felic = clamp(Povo.st().felic + 2, 0, 100); } catch (e) { }
      txt = 'Você ajudou as famílias mais pobres da comuna. Os anciãos ficaram sabendo.';
    }
    S.feito[acao] = true; S.apoio = clamp(S.apoio + ganho, 0, 100);
    Game.toast(`${txt} (confiança do conselho ${ganho >= 0 ? '+' : ''}${ganho.toFixed(1)})`, ganho > 0 ? '#a0ffa0' : '#ffb080');
    this.tela(this._back);
  },
  // ---------- junta militar: lealdade, golpe e contragolpe ----------
  golpeJunta(nome) {
    const S = this.st(); if (S.lider) return;
    const gn = nome ? S.generais.find(x => x.nome === nome) : S.generais.slice().sort((a, b) => a.leal - b.leal)[0];
    S.lider = { nome: gn.nome, sexo: gn.sexo };
    this.noticia(`🗡 GOLPE NA JUNTA! ${this.posto(gn)} ${gn.nome} tomou o poder no ${Reino.nome()}. ${Game.player.name} virou ${this.meuCargo()}.`, true);
    Game.centerMsg('🗡 GOLPE MILITAR!', `${this.posto(gn)} ${gn.nome} tomou o poder`); Sfx.play('shout');
  },
  juntaAcao(acao, alvo) {
    const S = this.st(), rng = this.rng(), V = Vila.st(), P = Game.player;
    const pagar = n => { if (V.cofre >= n && this.manda()) { V.cofre -= n; return true; } if (P.gold >= n) { P.gold -= n; return true; } Game.toast(`Faltam ${n} de ouro.`, '#ff8080'); return false; };
    if (acao === 'soldo') { if (S.feito.soldo) return Game.toast('O soldo extra já foi pago hoje.', '#ffb080'); if (!pagar(500)) return; S.feito.soldo = true; for (const g of S.generais) g.leal = clamp(g.leal + 7, 0, 100); Game.toast('Os generais receberam o soldo extra. (+7 de lealdade)', '#a0ffa0'); }
    else if (acao === 'promover') { if (S.feito.promover) return Game.toast('Só uma promoção por dia.', '#ffb080'); const g = S.generais.find(x => x.nome === alvo); if (!g) return; S.feito.promover = true; g.leal = clamp(g.leal + 20, 0, 100); if (g.posto === 'Comandante') g.posto = 'General'; for (const o of S.generais) if (o !== g) o.leal = clamp(o.leal - 3, 0, 100); Game.toast(`${g.nome} foi promovido(a) e está mais leal. Os outros ficaram com ciúmes.`, '#a0ffa0'); }
    else if (acao === 'expurgar') {
      const g = S.generais.find(x => x.nome === alvo); if (!g) return;
      return UI.confirm(`Expurgar <b>${esc(this.posto(g))} ${esc(g.nome)}</b> da junta?<br><small>Os outros ficam com medo (mais leais)... ou se revoltam.</small>`, () => {
        if (rng.chance(g.leal < 30 ? 0.35 : 0.15)) { this.golpeJunta(g.nome); return this.tela(this._back); }
        S.generais = S.generais.filter(x => x !== g); const p = this.pessoa(rng); S.generais.push({ nome: p.nome, sexo: p.sexo, posto: 'Comandante', leal: rng.int(62, 78) });
        for (const o of S.generais) o.leal = clamp(o.leal + 5, 0, 100);
        this.noticia(`⚔ ${this.posto(g)} ${g.nome} foi expulso(a) da junta. ${p.nome} assumiu como Comandante.`);
        this.tela(this._back);
      }, () => this.tela(this._back));
    } else if (acao === 'contragolpe') {
      const leais = S.generais.filter(g => g.leal >= 55).length;
      if (leais < Math.ceil(S.generais.length / 2)) return Game.toast(`Só ${leais} de ${S.generais.length} generais estão do seu lado (lealdade 55 ou mais).`, '#ffb080');
      if (!pagar(800)) return;
      const era = S.lider.nome; S.lider = null;
      for (const g of S.generais) g.leal = clamp(g.leal + 4, 0, 100);
      this.noticia(`⚔ CONTRAGOLPE! Com os generais do seu lado, ${Game.player.name} derrubou ${era} e volta a comandar o ${Reino.nome()}.`, true);
      Game.centerMsg('⚔ CONTRAGOLPE!', `${Game.player.name} volta ao poder`); Sfx.play('levelup');
    }
    this.tela(this._back);
  },
  // ---------- quem governa no seu lugar também toma decisões ----------
  decidirPorVoce(rng) {
    const R = this.R(), V = Vila.st(), L = this.lider(), g = this.gov();
    // os impostos das cidades conquistadas vão para o cofre do reino, não para você
    if (R.impostos > 0 && V) { V.cofre += Math.floor(R.impostos); R.impostos = 0; }
    for (const w of War.warOf('jogador').slice()) {
      const k = w.a === 'jogador' ? w.b : w.a, dias = Game.day - w.since;
      if (dias > 8 && rng.chance(g === 'junta' ? 0.04 : 0.12)) { War.peace(w); this.noticia(`🕊 ${L.titulo} ${L.nome} assinou a paz com ${War.K[k] ? War.K[k].short : k}.`, true); }
    }
    if (g === 'junta' && rng.chance(0.03)) {
      const viz = War.kingdoms().filter(K => K.id !== 'jogador' && !K.extinto && !War.atWar('jogador', K.id) && Reino.rel(K.id) < -30);
      if (viz.length) { const K = rng.pick(viz); War.declare('jogador', K.id); this.noticia(`⚔ ${L.titulo} ${L.nome} declarou guerra a ${K.short}!`, true); }
    }
  },
  // ---------- revoluções do seu povo ----------
  revolucao(C) {
    const R = this.R(), rng = this.rng(), desert = C && C.rebeldes > 14;
    const g = desert && rng.chance(0.6) ? 'junta' : rng.chance(0.55) ? 'republica' : 'comuna';
    const N = NAMES[this.raca()], lider = { nome: (C && C.lider) || (rng.pick(N.m) + ' ' + rng.pick(N.s)), sexo: 'm' };
    R.gov = g; R.govDia = Game.day; Reino.inject();
    const S = this.iniciar(g, lider);
    if (g === 'comuna') { S.conselho[0] = { nome: lider.nome, sexo: lider.sexo, idade0: 61, dia0: Game.day }; S.lider = { nome: lider.nome, sexo: lider.sexo, cargo: 'Porta-voz' }; }
    if (g === 'junta') { S.generais[0] = { nome: lider.nome, sexo: lider.sexo, posto: 'General', leal: 20 }; S.lider = { nome: lider.nome, sexo: lider.sexo }; }
    R.civil = null; try { Povo.st().civil = null; Povo.st().felic = 55; } catch (e) { }
    const G = GOVERNOS[g];
    this.noticia(`🔥 REVOLUÇÃO! O povo venceu a guerra civil e derrubou a monarquia: o ${Reino.nome()} agora é uma ${G.nome}. ${S.lider ? `${Governos.titulo(g, S.lider.sexo)} ${S.lider.nome} governa.` : ''}`, true);
    Game.centerMsg(`🔥 REVOLUÇÃO: ${G.nome.toUpperCase()}`, S.lider ? `${Governos.titulo(g, S.lider.sexo)} ${S.lider.nome} no poder` : 'O povo decide');
    Sfx.play('shout');
  },
  // ---------- os reinos do mundo ----------
  diaIA() {
    const SW = Game.mods && Game.mods.war; if (!SW || !War.K) return;
    for (const K of War.kingdoms()) {
      const k = K.id; if (k === 'jogador' || K.extinto) continue;
      const g = Governos.de(k), h = hashStr(k) % POL_MANDATO;
      if ((g === 'republica' || g === 'mercante') && Game.day % POL_MANDATO === h) {
        if (Math.random() < 0.4) War.news(`🗳 Eleições em ${K.name}: ${K.ruler.title} ${K.ruler.name} foi reeleito(a).`, false, [k]);
        else this.novoLiderIA(K, g, n => `🗳 Eleições em ${K.name}: ${n} venceu e é ${g === 'mercante' ? 'o novo Doge' : 'o novo Cônsul'}.`);
      } else if (g === 'comuna' && Game.day % POL_MANDATO === h && Math.random() < 0.6) {
        this.novoLiderIA(K, g, n => `✊ Assembleia em ${K.name}: o Conselho dos Anciãos escolheu ${n} como Porta-voz.`);
      } else if (g === 'junta' && Math.random() < 0.012) {
        this.novoLiderIA(K, g, n => `🗡 Golpe na junta de ${K.name}! ${n} derrubou ${K.ruler.title} ${K.ruler.name}.`, true);
      }
    }
  },
  novoLiderIA(K, g, texto, grande) {
    const N = NAMES[K.race] || NAMES.humano, sx = Math.random() < 0.5 ? 'm' : 'f';
    const nome = N[sx][Math.floor(Math.random() * N[sx].length)] + ' ' + N.s[Math.floor(Math.random() * N.s.length)];
    const msg = texto(nome), PS = Povo.S();
    PS.governantes[K.id] = { title: Governos.titulo(g, sx), name: nome };
    const SG = Governos.S(); if (SG.govs[K.id]) SG.govs[K.id].sx = sx;
    Povo.aplicaGov(); Governos.titulos();
    War.news(msg, !!grande, [K.id]);
  },
  // ---------- a tela de política ----------
  posto(x) { return x.posto === 'General' && x.sexo === 'f' ? 'Generala' : x.posto; },
  barra(p, cor) { return `<span style="display:inline-block;width:90px;height:8px;background:#000;border:1px solid #6a5a40;vertical-align:middle"><span style="display:block;height:100%;width:${Math.round(clamp(p, 0, 100))}%;background:${cor || '#e0b040'}"></span></span>`; },
  tela(back) {
    this._back = back = back || (() => UI.openMenu('war'));
    if (!Reino.ativo() || !Vila.st()) return back();
    const S = this.st(), g = S.g, G = GOVERNOS[g], L = this.lider(), V = Vila.st(), P = Game.player;
    const quem = L ? `<b class="warn">${esc(L.titulo)} ${esc(L.nome)}</b> governa. Você é ${esc(this.meuCargo())}: a guerra, a paz, os impostos e o governo não estão nas suas mãos.` : `<b class="good">Você governa</b> como ${esc(Reino.titulo())}.`;
    let body = `${G.icon} <b>${G.nome}</b> — ${quem}`, ops = [];
    if (g === 'monarquia' || g === 'teocracia') {
      body += g === 'monarquia' ? '<br>O poder está todo nas suas mãos: ninguém disputa o trono com você (a não ser que o povo se revolte). As casas nobres obedecem:<br>' + Nobreza.familiaPropria().casas.map(c => `• ${esc(c.chefe.titulo)} ${esc(c.chefe.nome)} (${esc(c.nome)})`).join('<br>')
        : '<br>Os sacerdotes governam em seu nome. Enquanto o povo for fiel, ninguém disputa o poder com você.';
      body += '<br><br><small class="dim">Na República as casas nobres disputam eleições com você; na Comuna do Povo governa o Conselho dos Anciãos; na Junta Militar os generais podem dar golpes.</small>';
    } else if (g === 'republica' || g === 'mercante') {
      const lin = S.cands.slice().sort((a, b) => b.apoio - a.apoio).map(c => `${c.id === 'jogador' ? '<b>⭐ ' + esc(c.nome) + ' (você)</b>' : esc(c.nome) + ' <span class="dim">(' + esc(c.casa) + ')</span>'} ${this.barra(c.apoio, c.id === 'jogador' ? '#60c060' : '#c08040')} ${c.apoio.toFixed(1)}%`).join('<br>');
      body += `<br>🗳 <b>Próxima eleição: dia ${S.eleicao}</b> (faltam ${Math.max(0, S.eleicao - Game.day)} dias). Intenção de voto:<br>${lin}`;
      if (S.ultima) body += `<br><small class="dim">Última eleição (dia ${S.ultima.dia}): ${S.ultima.res.map(([n, p]) => `${esc(n)} ${p}%`).join(', ')}</small>`;
      body += `<br><small class="dim">O povo feliz apoia quem governa. Cada ação de campanha pode ser feita uma vez por dia${L ? '; sem governar, você paga com o ouro da bolsa' : ''}.</small>`;
      ops.push({ label: '🗣 Discurso na praça (grátis)', fn: () => this.campanha('discurso') });
      ops.push({ label: '🍞 Distribuir pão ao povo (400)', fn: () => this.campanha('pao') });
      if (g === 'republica') ops.push({ label: '🍷 Banquete para os nobres (600)', fn: () => this.campanha('banquete') });
      else ops.push({ label: '💰 Comprar o apoio das guildas (1000)', fn: () => this.campanha('guildas') });
      for (const c of S.cands) if (c.id !== 'jogador' && !S.feito.alianca) ops.push({ label: `🤝 Propor aliança a ${c.nome} (800)`, fn: () => this.campanha('alianca:' + c.id) });
    } else if (g === 'comuna') {
      const membro = this.membroConselho(), anos = Geracoes.anos();
      body += `<br>👴 <b>Conselho dos Anciãos</b> (escolhe o Porta-voz no dia ${S.assembleia}):<br>` + S.conselho.map(v => `• ${esc(v.nome)}, ${this.idade(v)} anos${L && L.nome === v.nome ? ' — <b>Porta-voz</b>' : ''}`).join('<br>');
      body += membro ? `<br>• <b>${esc(P.name)} (você), ${anos} anos</b>${!L ? ' — <b>Porta-voz</b>' : ''}` : `<br><span class="warn">Você tem ${anos} anos: só tem assento no conselho a partir dos ${POL_IDADE_CONSELHO}.</span> Até lá, ajude o povo para que os anciãos confiem em você.`;
      body += `<br>Confiança do conselho em você: ${this.barra(S.apoio, '#60c060')} ${Math.round(S.apoio)}`;
      if (membro) ops.push({ label: '🗣 Discursar na assembleia', fn: () => this.conselhoAcao('discursar') });
      ops.push({ label: '🎁 Ajudar as famílias pobres (300)', fn: () => this.conselhoAcao('ajudar') });
    } else if (g === 'junta') {
      body += '<br>⚔ <b>Generais e comandantes</b> (lealdade a você):<br>' + S.generais.map(x => `${esc(this.posto(x))} <b>${esc(x.nome)}</b>${L && L.nome === x.nome ? ' — <b class="warn">no poder</b>' : ''} ${this.barra(x.leal, x.leal >= 55 ? '#60c060' : x.leal >= 35 ? '#e0b040' : '#e05040')} ${Math.round(x.leal)}`).join('<br>');
      body += `<br><small class="dim">A lealdade cai com o tempo e sobe com soldo, promoções e guerras. Se a média ficar baixa, um general dá um golpe.${L ? ' Com metade dos generais do seu lado (55+), você pode dar o contragolpe.' : ''}</small>`;
      ops.push({ label: '💰 Pagar soldo extra aos generais (500)', fn: () => this.juntaAcao('soldo') });
      if (L) ops.push({ label: '⚔ Dar o contragolpe (800)', cls: 'gold', fn: () => this.juntaAcao('contragolpe') });
      if (!S.feito.promover) for (const x of S.generais) if (!(L && L.nome === x.nome)) ops.push({ label: `🎖 Promover ${x.nome}`, fn: () => this.juntaAcao('promover', x.nome) });
      if (!L) for (const x of S.generais.filter(x => x.leal < 40)) ops.push({ label: `🗡 Expurgar ${x.nome}`, cls: 'danger', fn: () => this.juntaAcao('expurgar', x.nome) });
    }
    body += `<br><small class="dim">Cofre do reino: ${fmt(Math.floor(V.cofre))} • sua bolsa: ${fmt(P.gold)}</small>`;
    UI.dialog('🗳 Política do reino', null, body, ops.concat([{ label: 'Voltar', fn: back }]));
  }
};
// ---------- ganchos ----------
(function () {
  const dt0 = Game.dayTick; Game.dayTick = function () { const r = dt0.apply(this, arguments); try { Politica.dia(); } catch (e) { console.warn('Política', e); } return r; };
  // sem governar, a guerra, a paz, os impostos e o governo não são seus
  const dp0 = Reino.diplo; Reino.diplo = function (k, back) { if (!Politica.manda()) return Politica.semPoder('a diplomacia (guerra, paz e alianças)', back); return dp0.apply(this, arguments); };
  const gt0 = Governos.tela; Governos.tela = function (back) { if (!Politica.manda()) return Politica.semPoder('a forma de governo', back); return gt0.apply(this, arguments); };
  const gm0 = Governos.mostrar;
  Governos.mostrar = function (p) {
    if (Politica.manda()) return gm0.apply(this, arguments);
    // quem governa decide a proposta de paz (e nunca paga com o seu ouro)
    const V = Vila.st(), L = Politica.lider(), K = War.K[p.k];
    const aceita = p.tipo === 'exige' ? (V && V.cofre >= p.ouro && Math.random() < 0.5) : Math.random() < 0.7;
    if (aceita) { this.aceitar(p); UI.close(); } else this.recusar(p);
    War.news(`${aceita ? '🕊' : '⚔'} ${L.titulo} ${L.nome} ${aceita ? 'aceitou' : 'recusou'} a proposta de paz de ${K ? K.short : p.k}.`, true, ['jogador']);
  };
  const mg0 = Reino.menuGovernador;
  if (mg0) Reino.menuGovernador = function (b) { if (!Politica.manda()) { const R = Politica.R(), V = Vila.st(); if (R && V && R.impostos > 0) { V.cofre += Math.floor(R.impostos); R.impostos = 0; } } return mg0.apply(this, arguments); };
  // o seu título: quem não governa é Senador(a), Ancião/Anciã do Conselho, Cidadão/Cidadã ou Comandante
  const ti0 = Reino.titulo; Reino.titulo = function () { try { if (Reino.ativo() && !Politica.manda()) return Politica.meuCargo(); } catch (e) { } return ti0.apply(this, arguments); };
  // mudar de governo começa a política nova (e quem mudou começa no poder)
  const bt0 = Governos.botoesTab;
  Governos.botoesTab = function (f) {
    const h = bt0.call(this, f); if (!h) return h;
    let st = ''; try { const L = Politica.lider(); st = L ? `<br><span class="warn">Quem governa: ${esc(L.titulo)} ${esc(L.nome)}</span>` : ''; } catch (e) { }
    return h.replace(/<\/div>$/, `${st}<br><button class="sbtn gold" ${f(() => Politica.tela(() => UI.openMenu('war')))}>🗳 Política do reino</button></div>`);
  };
  // a guerra civil que dura demais (o povo não volta a confiar) vira revolução
  const pd0 = Povo.dia;
  if (pd0) Povo.dia = function () {
    const R = Game.player && Game.player.reino, C = R && R.civil;
    const r = pd0.apply(this, arguments);
    const C2 = R && R.civil;
    if (C2 && C2 === C && Game.day - C2.dia >= 6 && Governos.de('jogador') === 'monarquia' && Math.random() < 0.25) Politica.revolucao(C2);
    return r;
  };
})();
