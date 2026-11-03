'use strict';
// ===================== A CORTE: VASSALOS, MISSIONÁRIOS, CASAMENTOS, MAGOS E CAVALEIROS =====================

// ---------- magos de batalha e cavaleiros montados ----------
ENEMIES.war_mago = { name: 'Mago de Batalha', look: { k: 'hum', body: '#3a3a7a', robe: true }, hp: 70, dmg: 17, spd: 56, ai: 'caster', proj: 'fireball', xp: 46, armor: 8, gold: [12, 35], drops: [['pocao_magia_p', 0.3]] };
WAR_KIND_RANK.mago = 2;
TROPAS.mago = { nome: 'Mago de batalha', plural: 'Magos de batalha', ouro: 320, soldo: 5, forca: 2.8, precisa: 'magia', pnome: 'Alquimista e Templo' };
(function () {
  const look0 = War.look, pick0 = War.pickKind, make0 = War.makeSoldier, pode0 = Reino.pode;
  War.look = function (k, kind, rng) {
    if (kind !== 'mago') return look0.call(this, k, kind, rng);
    const L = look0.call(this, k, 'milicia', rng), K = this.K[k];
    delete L.helm; delete L.helmStyle; delete L.shield; delete L.chestplate; delete L.tabard; delete L.pauldron; delete L.plume; delete L.crest; delete L.hood;
    L.robe = true; L.body = shade(K.color, -0.25); L.trim = '#f0d060'; L.sash = K.color;
    if (rng.chance(0.6)) { L.hat = 'wide'; L.hatC = shade(K.color, -0.45); L.pena = '#f0d060'; } else L.hood = shade(K.color, -0.4);
    L.weapon = 'staff'; L.wc = rng.pick(['#e0c050', '#80c0ff', '#c070ff']);
    return L;
  };
  War.pickKind = function (k, rng, n) { const r = pick0.call(this, k, rng, n); return r === 'milicia' && rng.chance(0.25) ? 'mago' : r; };
  War.makeSoldier = function (k, kind, x, y, rng) {
    const m = make0.call(this, k, kind, x, y, rng);
    if (kind === 'cavaleiro') { m.montado = true; m.spd *= 1.3; m.cavalo = KSTYLE[k] && KSTYLE[k].musket ? 'cavalo' : 'cavalo_guerra'; }
    return m;
  };
  Reino.pode = function (kind) { if (kind === 'mago') { const V = Vila.st(); return !!(V && V.built.alquimista && V.built.templo); } return pode0.call(this, kind); };
  // o cavaleiro aparece montado no cavalo
  const draw0 = Monster.prototype.draw;
  Monster.prototype.draw = function (ctx, camX, camY) {
    if (!this.montado || this.dead) return draw0.call(this, ctx, camX, camY);
    const H = Sprites.horse(this.cavalo || 'cavalo_guerra'), hk = this.dir === 'left' || this.dir === 'right' ? this.dir : (this.lastH || (Math.cos(this.face || 0) < 0 ? 'left' : 'right'));
    const f = this.moving ? 1 + (Math.floor((this.anim || 0) * 6) % 2) : 0, img = H[hk][f];
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(Math.round(this.x - 11 - camX), Math.round(this.y - 1 - camY), 22, 3);
    ctx.drawImage(img, Math.round(this.x - img.width / 2 - camX), Math.round(this.y - img.height + 3 - camY));
    const z0 = this.z, d0 = this.dir; this.z = (z0 || 0) + 9; this.dir = hk;
    draw0.call(this, ctx, camX, camY);
    this.z = z0; this.dir = d0;
  };
})();

// ---------- vassalagem ----------
const Vassalagem = {
  st() { const S = War.st(); if (!S.vassalos) S.vassalos = {}; return S.vassalos; },
  senhor(k) { return this.st()[k] || null; },
  dele(k) { return Object.keys(this.st()).filter(v => this.st()[v] === k && War.K[v] && !War.extinto(v)); },
  cidades(k) { return Game.world.settlements.filter(s => War.ownerOf(s) === k).length; },
  poder(k) {
    const S = War.st(); let n = this.cidades(k) * 14;
    for (const a of S.armies) if (a.k === k) n += a.n;
    if (k === 'jogador') n += Reino.total();
    for (const v of this.dele(k)) n += this.cidades(v) * 6;
    return n;
  },
  exigir(k, back) {
    const K = War.K[k], pj = this.poder('jogador'), pk = this.poder(k), rel = Reino.rel(k), fe = Missionarios.bonus(k);
    const w = War.st().wars.find(x => [x.a, x.b].includes(k) && [x.a, x.b].includes('jogador')), ps = (w && w.ps) || 0;
    const aceita = w ? (ps >= 2 || pj > pk * 2 * (1 - fe)) : ((pj > pk * 1.5 * (1 - fe) && rel >= -10) || (rel >= 60 && pj > pk * 0.9));
    if (!aceita) { Reino.addRel(k, -8); return UI.dialog(`${K.ruler.title} ${K.ruler.name}`, null, `Jamais! ${esc(K.short)} não se curva a ninguém. <span class="dim">(Seu poder: ${pj} • o deles: ${pk}${w ? ` • vitórias na guerra: ${ps}` : ''})</span>`, [{ label: 'Voltar', fn: back }]); }
    this.st()[k] = 'jogador';
    if (w) War.peace(w);
    Reino.addRel(k, 5);
    War.news(`👑 ${K.name} jurou vassalagem ao ${Reino.nome()}!`, true, [k, 'jogador']);
    Game.centerMsg(K.short.toUpperCase() + ' É SEU VASSALO', 'Pagam tributo todo dia e lutam nas suas guerras.'); Sfx.play('levelup');
    Game.chron(`${K.name} jurou vassalagem ao ${Reino.nome()}.`);
    UI.close();
  },
  libertar(k) { delete this.st()[k]; Reino.addRel(k, 20); War.news(`🕊 ${War.K[k].name} deixou de ser vassalo do ${Reino.nome()}.`, true, [k, 'jogador']); UI.close(); },
  tributo(k) { return 25 * this.cidades(k); },
  daily() {
    const S = this.st(), V = Vila.st();
    for (const v of Object.keys(S)) { if (!War.K[v] || War.extinto(v) || !War.K[S[v]] && S[v] !== 'jogador' || War.atWar(v, S[v])) delete S[v]; }
    // tributo dos vassalos do jogador
    if (V) { let t = 0; for (const v of this.dele('jogador')) t += this.tributo(v); if (t) { V.cofre = (V.cofre || 0) + t; } }
    // reinos fracos se tornam vassalos de vizinhos fortes
    if (Math.random() < 0.05) {
      const ks = War.kingdoms().filter(k => k.id !== 'jogador' && !k.extinto && !S[k.id]);
      const fraco = ks.filter(k => this.cidades(k.id) <= 2 && this.cidades(k.id) > 0)[0];
      if (fraco) {
        const forte = ks.filter(k => k !== fraco && !S[k.id] && !War.atWar(k.id, fraco.id) && War.rel(k.id, fraco.id) > 15 && this.cidades(k.id) >= this.cidades(fraco.id) * 3)[0];
        if (forte) { S[fraco.id] = forte.id; War.news(`👑 ${fraco.name} jurou vassalagem a ${forte.name}.`, false, [fraco.id, forte.id]); }
      }
    }
  },
  // vassalos não guerreiam com o senhor e entram nas guerras dele
  aoDeclarar(a, b) {
    for (const v of this.dele(a)) if (v !== b && !War.atWar(v, b)) War.declare(v, b, true);
    for (const v of this.dele(b)) if (v !== a && !War.atWar(v, a)) War.declare(v, a, true);
  }
};
(function () {
  const dec0 = War.declare;
  War.declare = function (a, b, quiet) {
    const V = Vassalagem;
    if (a !== 'jogador' && b !== 'jogador' && (V.senhor(a) === b || V.senhor(b) === a)) return;   // vassalo não ataca o senhor (nem é atacado por ele)
    if ((a === 'jogador' && V.senhor(b) === 'jogador') || (b === 'jogador' && V.senhor(a) === 'jogador')) delete V.st()[a === 'jogador' ? b : a];   // guerra rompe a vassalagem
    const antes = this.atWar(a, b);
    dec0.call(this, a, b, quiet);
    if (!antes && this.atWar(a, b)) V.aoDeclarar(a, b);
  };
})();

// ---------- missionários ----------
const MISSIONARIOS_NOMES = ['Irmão Tomé', 'Irmã Clara', 'Frei Bento', 'Madre Inês', 'Irmão Lucas', 'Irmã Beatriz', 'Frei Anselmo', 'Irmã Vitória'];
const Missionarios = {
  st() { const R = Reino.st(); if (!R.fe) R.fe = {}; if (!R.missoes) R.missoes = []; return R; },
  bonus(k) { const R = Game.player && Game.player.reino; return R && R.fe ? Math.min(0.25, (R.fe[k] || 0) / 400) : 0; },
  pode() { const V = Vila.st(); return !!(V && V.built.templo); },
  menu(back) {
    if (!this.pode()) return UI.dialog('Missionários', null, 'Para enviar missionários a sua cidade precisa de um <b>Templo</b>.', [{ label: 'Voltar', fn: back }]);
    const R = this.st(), ks = War.kingdoms().filter(k => k.id !== 'jogador' && !k.extinto);
    const fora = R.missoes.map(m => `✝ ${esc(m.nome)} em ${esc(War.K[m.k] ? War.K[m.k].short : '?')} (volta no dia ${m.volta})`).join('<br>');
    UI.dialog('Missionários', null, `Seus missionários levam a fé do seu povo para outros reinos. A fé melhora as relações e ajuda em casamentos, tratados e vassalagem.<br><span class="dim">Cada missão custa 300 de ouro e dura alguns dias.</span>${fora ? '<br><br>' + fora : ''}`,
      ks.slice(0, 12).map(K => ({ label: `✝ ${K.short} — fé ${Math.round(R.fe[K.id] || 0)}%${War.atWar('jogador', K.id) ? ' ⚔' : ''}`, fn: () => this.enviar(K.id, back) })).concat([{ label: 'Voltar', fn: back }]));
  },
  enviar(k, back) {
    const P = Game.player, R = this.st();
    if (War.atWar('jogador', k)) return Game.toast('Em guerra os missionários não passam da fronteira.', '#ff8080');
    if (R.missoes.filter(m => m.k === k).length) return Game.toast('Já há missionários lá.', '#ffd080');
    if (R.missoes.length >= 3) return Game.toast('Seu templo só sustenta 3 missões ao mesmo tempo.', '#ffd080');
    if (P.gold < 300) return Game.toast('Ouro insuficiente.', '#ff8080');
    P.gold -= 300;
    const nome = MISSIONARIOS_NOMES[Math.floor(Math.random() * MISSIONARIOS_NOMES.length)];
    R.missoes.push({ k, nome, volta: Game.day + 3 + Math.floor(Math.random() * 3) });
    Sfx.play('quest'); Game.toast(`${nome} partiu em missão para ${War.K[k].short}.`, '#f0e0a0');
    this.menu(back);
  },
  daily() {
    if (!Game.player || !Game.player.reino) return;
    const R = this.st();
    for (const m of R.missoes.slice()) {
      if (Game.day < m.volta) continue;
      R.missoes.splice(R.missoes.indexOf(m), 1);
      const K = War.K[m.k]; if (!K || War.extinto(m.k)) continue;
      const rel = Reino.rel(m.k), h = Game.player.honra || 0, x = Math.random();
      const ok = 0.55 + rel / 250 + h / 300;
      if (x < ok) {
        R.fe[m.k] = Math.min(100, (R.fe[m.k] || 0) + 25); Reino.addRel(m.k, 8); Vida.honra(2);
        War.news(`✝ Missionários do ${Reino.nome()} pregaram em ${K.name}.`, false, [m.k, 'jogador']);
        if (R.fe[m.k] >= 100) { Reino.addRel(m.k, 20); Game.centerMsg(K.short.toUpperCase() + ' ABRAÇOU A SUA FÉ', 'O povo de lá agora vê o seu reino como irmão.'); War.news(`✝ ${K.name} abraçou a fé do ${Reino.nome()}!`, true, [m.k, 'jogador']); }
        else Game.toast(`${m.nome} voltou de ${K.short}: a fé lá cresceu para ${R.fe[m.k]}%.`, '#f0e0a0');
      } else if (x < ok + 0.25) { Reino.addRel(m.k, -4); Game.toast(`${m.nome} foi expulso(a) de ${K.short}.`, '#ffb080'); }
      else { Reino.addRel(m.k, -10); Vida.honra(3, `${m.nome} foi martirizado(a) em ${K.short}`); Game.centerMsg('MÁRTIR', `${m.nome} morreu pregando em ${K.short}.`); }
    }
    // reinos que abraçaram a fé vão ficando amigos
    for (const [k, v] of Object.entries(R.fe)) if (v >= 100 && Reino.rel(k) < 40 && !War.atWar('jogador', k)) Reino.addRel(k, 1);
  }
};

// ---------- casamentos diplomáticos ----------
const CasamentoDiplo = {
  // você mesmo se casa com um príncipe, princesa ou herdeiro nobre
  meu(par, back) {
    const P = Game.player, k = par.k, monarca = Reino.ativo(), heroi = (P.honra || 0) >= 60;
    if (P.spouse) return UI.dialog('Casamento', null, 'Você já é casado(a).', [{ label: 'Voltar', fn: back }]);
    if (!monarca && !heroi) return UI.dialog('Casamento', par.look, 'A nobreza só se casa com reis, rainhas ou heróis lendários. <span class="dim">(Seja monarca ou tenha 60 de honra.)</span>', [{ label: 'Voltar', fn: back }]);
    if (k !== 'jogador') {
      if (War.atWar('jogador', k)) return UI.dialog(War.K[k].short, null, 'Com o inimigo? Nunca.', [{ label: 'Voltar', fn: back }]);
      const chance = clamp(0.3 + Reino.rel(k) / 120 + (P.honra || 0) / 300 + Missionarios.bonus(k), 0.05, 0.95);
      if (Reino.rel(k) < 20 || Math.random() > chance) { Reino.addRel(k, -3); return UI.dialog(War.K[k].short, par.look, `${esc(par.nome)} recusou o pedido. <span class="dim">Melhore as relações e tente de novo.</span>`, [{ label: 'Voltar', fn: back }]); }
    }
    const id = 'nobre_' + par.id;
    P.rel[id] = { aff: 100, talkDay: -1, giftDay: -1, status: 'married', name: par.nome, race: par.race, sex: par.sexo, look: par.look, nobre: true };
    P.spouse = id;
    const V = Vila.st(); P.spouseHome = V && V.palacio ? 'palacio' : (P.houses[0] || null);
    Nobreza.st().casados[par.id] = true;
    Nobreza.st().unioes.push({ filho: P.name, conjuge: `${par.titulo} ${par.nome}`, reino: k === 'jogador' ? Reino.nome() : War.K[k].short, dia: Game.day });
    if (k !== 'jogador') { Reino.addRel(k, 35); const t = Reino.trat(k); if (Reino.rel(k) >= 50) t.alianca = true; War.news(`💍 ${P.name} casou-se com ${par.titulo} ${par.nome} de ${War.K[k].name}!`, true, [k, 'jogador']); }
    else Vida.honra(5);
    Sfx.play('levelup'); P.addXP(300);
    Game.centerMsg('CASAMENTO REAL! 💍', `${P.name} e ${par.titulo} ${par.nome}`);
    Game.chron(`Casei-me com ${par.titulo} ${par.nome}${k !== 'jogador' ? ' de ' + War.K[k].name : ''}.`);
    UI.close();
  },
  // durante a guerra: paz selada com o casamento de um filho seu com um herdeiro deles
  paz(k, back) {
    const P = Game.player, w = War.st().wars.find(x => [x.a, x.b].includes(k) && [x.a, x.b].includes('jogador')); if (!w) return;
    const filho = Nobreza.filhos()[0], par = Nobreza.familia(k).herdeiros.find(p => !Nobreza.casado(p));
    if (!filho || !par) return UI.dialog('Paz por casamento', null, !filho ? 'Você precisa de um filho solteiro para oferecer em casamento.' : 'Eles não têm herdeiros solteiros.', [{ label: 'Voltar', fn: back }]);
    const ps = w.ps || 0, chance = clamp(0.35 + ps * 0.15 + Reino.rel(k) / 300 + Missionarios.bonus(k), 0.05, 0.9);
    if (Math.random() > chance) { Reino.addRel(k, -4); return UI.dialog(War.K[k].short, null, 'Paz por um casamento? Primeiro mostre força no campo de batalha.', [{ label: 'Voltar', fn: back }]); }
    War.peace(w);
    Nobreza.st().casados[par.id] = true; filho.conjuge = par.nome; filho.conjugeLook = par.look;
    Nobreza.st().unioes.push({ filho: filho.name, conjuge: `${par.titulo} ${par.nome}`, reino: War.K[k].short, dia: Game.day });
    Reino.addRel(k, 40);
    Game.centerMsg('PAZ SELADA COM CASAMENTO', `${filho.name} e ${par.titulo} ${par.nome}`); Sfx.play('levelup');
    War.news(`💍🕊 O ${Reino.nome()} e ${War.K[k].name} fizeram as pazes com um casamento real.`, true, [k, 'jogador']);
    UI.close();
  },
  // os outros reinos também casam os seus herdeiros
  daily() {
    if (Math.random() > 0.04) return;
    const ks = War.kingdoms().filter(k => k.id !== 'jogador' && !k.extinto);
    for (let t = 0; t < 6; t++) {
      const a = ks[Math.floor(Math.random() * ks.length)], b = ks[Math.floor(Math.random() * ks.length)];
      if (!a || !b || a === b || War.atWar(a.id, b.id) || War.rel(a.id, b.id) < 15) continue;
      const ha = Nobreza.familia(a.id).herdeiros.find(p => !Nobreza.casado(p)), hb = Nobreza.familia(b.id).herdeiros.find(p => !Nobreza.casado(p) && (!ha || p.sexo !== ha.sexo));
      if (!ha || !hb) continue;
      Nobreza.st().casados[ha.id] = Nobreza.st().casados[hb.id] = true;
      const S = War.st(), key = War.key(a.id, b.id); S.rel[key] = Math.min(100, (S.rel[key] || 0) + 25);
      War.news(`💍 ${ha.titulo} ${ha.nome} (${a.short}) casou-se com ${hb.titulo} ${hb.nome} (${b.short}).`, false, [a.id, b.id]);
      return;
    }
  }
};

// ---------- a corte nas telas ----------
const Corte = {
  textoDiplo(k) {
    const sen = Vassalagem.senhor(k), fe = Missionarios.st ? ((Game.player.reino && Game.player.reino.fe) || {})[k] || 0 : 0, vs = Vassalagem.dele(k);
    return (sen ? `<br>👑 Vassalo de <b>${esc(sen === 'jogador' ? Reino.nome() : War.K[sen].short)}</b>${sen === 'jogador' ? ` • tributo: ${Vassalagem.tributo(k)} ouro/dia` : ''}` : '') +
      (vs.length ? `<br>👑 Vassalos: ${vs.map(v => esc(War.K[v].short)).join(', ')}` : '') + (fe ? `<br>✝ Fé no seu reino: ${Math.round(fe)}%` : '');
  },
  opcoesDiplo(k, volta) {
    const o = [];
    if (!Reino.ativo()) return o;
    if (Vassalagem.senhor(k) === 'jogador') o.push({ label: '🕊 Libertar este vassalo', fn: () => UI.confirm(`Libertar ${esc(War.K[k].short)} da vassalagem?`, () => Vassalagem.libertar(k)) });
    else if (!Vassalagem.senhor(k)) o.push({ label: '👑 Exigir vassalagem', cls: 'gold', fn: () => Vassalagem.exigir(k, volta) });
    if (War.atWar('jogador', k)) o.push({ label: '💍 Propor paz com um casamento real', fn: () => CasamentoDiplo.paz(k, volta) });
    return o;
  },
  daily() { try { Vassalagem.daily(); Missionarios.daily(); CasamentoDiplo.daily(); } catch (e) { console.error('corte', e); } }
};
(function () { const d0 = War.daily; War.daily = function () { d0.call(this); Corte.daily(); }; })();
