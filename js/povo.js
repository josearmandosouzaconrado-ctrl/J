'use strict';
// =====================================================================
//  O POVO: felicidade, revoltas, guerra civil, títulos de nobreza e conspirações
//  (no seu reino e nos reinos da IA)
// =====================================================================
const CARGOS_CONSP = ['o seu conselheiro', 'um capitão da guarda', 'um nobre da corte', 'o tesoureiro real', 'o mestre de armas', 'a dama de companhia'];
const TITULOS_FEUDO = [
  { id: 'barao', m: 'Barão', f: 'Baronesa', renda: 20 },
  { id: 'conde', m: 'Conde', f: 'Condessa', renda: 45 },
  { id: 'duque', m: 'Duque', f: 'Duquesa', renda: 80 }
];

const Povo = {
  // ---------------- o seu reino ----------------
  st() { const R = Reino.st(); if (R.felic === undefined) R.felic = 60; return R; },
  fatores() {
    const P = Game.player, V = Vila.st(), R = this.st(), b = V ? V.built : {}, f = [];
    f.push(['Base', 50]);
    if (b.templo) f.push(['Templo', 6]);
    if (b.taverna) f.push(['Taverna', 5]);
    if (b.fazenda) f.push(['Fazenda', 3]);
    if (b.armazem) f.push(['Armazém', 2]);
    if (V) { if ((V.trigo || 0) >= 10) f.push(['Celeiro cheio', 4]); else if (!V.trigo && V.pop > 6) f.push(['Fome', -6]); }
    if (Estacoes.inverno()) f.push(['Inverno', -5]);
    const g = War.warOf('jogador').length; if (g) f.push([`Guerra (${g})`, -Math.min(21, g * 7)]);
    const h = clamp(Math.round((P.honra || 0) / 8), -10, 10); if (h) f.push(['Sua honra', h]);
    if (V && V.trib) f.push(['Tributo ao suserano', -5]);
    if (V && Reino.total() > V.pop * 1.5 + 4) f.push(['Recrutamento forçado', -4]);
    const cid = Game.world.settlements.filter(s => !s.playerVila && War.ownerOf(s) === 'jogador').length; if (cid) f.push([`Cidades ocupadas (${cid})`, -Math.min(10, cid * 2)]);
    const vs = Vassalagem.dele('jogador').length; if (vs) f.push(['Glória dos vassalos', Math.min(6, vs * 2)]);
    if ((R.festaAte || 0) >= Game.day) f.push(['Festival', 12]);
    if ((R.pao || 0) >= Game.day) f.push(['Pão para o povo', 7]);
    if ((R.medo || 0) > 0) f.push(['Medo das execuções', -Math.round(R.medo)]);
    if (R.civil) f.push(['Guerra civil', -8]);
    return f;
  },
  alvo() { return clamp(this.fatores().reduce((n, x) => n + x[1], 0), 0, 100); },
  txt(v) { return v >= 70 ? '<span class="good">Feliz</span>' : v >= 45 ? 'Contente' : v >= 30 ? '<span class="warn">Insatisfeito</span>' : v >= 15 ? '<span class="bad">Revoltado</span>' : '<span class="bad">Em revolta!</span>'; },
  // a renda do dia muda com o humor do povo
  rendaMul() { const v = this.st().felic; return this.st().civil ? 0.5 : v >= 70 ? 1.15 : v >= 45 ? 1 : v >= 30 ? 0.85 : 0.65; },
  dia() {
    const P = Game.player; if (!P || !P.reino || !Vila.st()) return;
    const R = this.st(), V = Vila.st();
    R.felic = clamp(R.felic + (this.alvo() - R.felic) * 0.2, 0, 100);
    if (R.medo) R.medo = Math.max(0, R.medo - 1);
    if (!Reino.ativo()) return;
    // revolta: o povo infeliz pega em armas
    if (!R.civil && (R.felic < 15 || (R.felic < 30 && Math.random() < 0.25))) this.guerraCivil();
    else if (R.civil) {
      const C = R.civil;
      if (Game.day - C.dia >= 1) {
        const perda = Math.floor(V.cofre * 0.25); V.cofre -= perda;
        V.noticia = `Os rebeldes de ${C.lider} saquearam ${perda} de ouro do cofre. Vá até ${V.nome} e esmague a revolta, ou negocie com eles.`;
        if (Math.random() < 0.2) this.desertaCidade();
      }
      if (R.felic >= 45) { R.civil = null; Game.centerMsg('A REVOLTA ACABOU', 'O povo voltou a confiar na coroa.'); Game.chron('A guerra civil terminou: o povo voltou a confiar em mim.'); }
    }
    this.conspDia();
  },
  guerraCivil() {
    const R = this.st(), V = Vila.st(), P = Game.player, rng = new RNG(Game.day * 31 + hashStr(P.name));
    const lider = rng.pick(NAMES.humano.m) + ' ' + rng.pick(NAMES.humano.s);
    let desert = 0; for (const k in R.tropas) { const n = Math.floor((R.tropas[k] || 0) * 0.3); R.tropas[k] -= n; desert += n; }
    R.civil = { dia: Game.day, lider, rebeldes: Math.max(6, desert + Math.round(V.pop / 3)), mortos: 0 };
    let n = 0; for (let i = 0; i < 3; i++) if (Math.random() < 0.5 && this.desertaCidade()) n++;
    Game.centerMsg('⚔ GUERRA CIVIL!', `${lider} lidera o povo contra a coroa!`); Sfx.play('shout');
    War.news(`🔥 Guerra civil no ${Reino.nome()}: ${lider} levantou o povo contra ${P.name}${desert ? ` (${desert} soldados desertaram)` : ''}${n ? ` e ${n} cidade(s) se rebelaram` : ''}.`, true, ['jogador']);
    Game.chron(`O povo se revoltou: ${lider} começou uma guerra civil contra mim.`);
  },
  // uma cidade conquistada volta para o seu antigo reino
  desertaCidade() {
    const S = War.st(), cs = Game.world.settlements.filter(s => !s.playerVila && War.ownerOf(s) === 'jogador' && War.K[s.region.id] && !War.extinto(s.region.id));
    if (!cs.length) return false;
    const s = cs[Math.floor(Math.random() * cs.length)];
    S.owner[s.id] = s.region.id;
    if (s.active) { const set = new Set(s.npcs || []); Game.actors = Game.actors.filter(q => !set.has(q)); s.active = false; s.npcs = null; }
    War.news(`🔥 ${s.name} se rebelou contra o ${Reino.nome()} e voltou para ${War.K[s.region.id].short}.`, true, ['jogador', s.region.id]);
    return true;
  },
  // os rebeldes aparecem quando você chega na sua vila
  tick(dt) {
    const P = Game.player, R = P && P.reino, C = R && R.civil; if (!C || !Game.level || !Game.level.isWorld) return;
    const s = Vila.s; if (!s) return;
    const L_ = this._reb || (this._reb = []), vivos = L_.filter(a => !a.dead && Game.actors.includes(a));
    if (!vivos.length && L_.length) {
      const mortos = L_.filter(a => a.dead).length; this._reb = [];
      if (!mortos) return;   // você fugiu: eles voltam quando você voltar
      C.rebeldes -= mortos; C.leva = 0;
      if (C.rebeldes <= 0) {
        R.civil = null; R.felic = Math.max(R.felic, 38); Vida.honra(2);
        Game.centerMsg('A REVOLTA FOI ESMAGADA', `${C.lider} caiu. O ${Reino.nome()} está em paz.`); Sfx.play('levelup');
        War.news(`⚔ ${P.name} esmagou a revolta de ${C.lider}.`, true, ['jogador']); Game.chron(`Esmaguei a revolta de ${C.lider}.`);
        return;
      }
      Game.toast(`Os rebeldes recuaram, mas ainda restam ${C.rebeldes}.`, '#ffd080');
    }
    if (vivos.length || dist(P.x / 16, P.y / 16, s.mid.x, s.mid.y) > 45) return;
    this._reb = [];
    C.leva = Math.min(8, C.rebeldes);
    for (let i = 0; i < C.leva; i++) {
      const ang = Math.random() * Math.PI * 2, r = 120 + Math.random() * 90;
      const m = new Monster(i % 3 === 2 ? 'bandido_arqueiro' : 'bandido', P.x + Math.cos(ang) * r, P.y + Math.sin(ang) * r, Math.max(3, P.level - 1), { name: i === 0 && C.rebeldes <= 8 ? 'Líder ' + C.lider : 'Rebelde' });
      if (collides(Game.world, m.x, m.y, m.r)) Game.findFree(m);
      m.rebelde = true; m.provoked = P; m.aggro = 400;
      Game.actors.push(m); this._reb.push(m);
    }
    Game.centerMsg('OS REBELDES ATACAM!', `${C.leva} rebeldes de ${C.lider}`); Sfx.play('shout');
  },
  // ---------------- menu ----------------
  menu(back) {
    back = back || (() => UI.close());
    const R = this.st(), P = Game.player, V = Vila.st();
    if (!V) return UI.dialog('O povo', null, 'Você ainda não tem uma vila.', [{ label: 'Voltar', fn: back }]);
    const f = this.fatores().filter(x => x[0] !== 'Base').map(([t, v]) => `<small>${v > 0 ? '<span class="good">+' + v : '<span class="bad">' + v}</span> ${esc(t)}</small>`).join('<br>');
    const C = R.civil, K = R.consp;
    let txt = `Felicidade do povo: <b>${Math.round(R.felic)}%</b> — ${this.txt(R.felic)} <span class="dim">(tende a ${Math.round(this.alvo())}%)</span><br>${f}<br><span class="dim small">Povo feliz rende mais impostos. Abaixo de 30% o povo pode se revoltar e começar uma guerra civil.</span>`;
    if (C) txt += `<br><br>⚔ <b class="bad">Guerra civil!</b> ${esc(C.lider)} lidera ${C.rebeldes} rebeldes. Vá até ${esc(V.nome)} para enfrentá-los.`;
    if (K && K.visto) txt += `<br><br>🗡 <b class="warn">Conspiração:</b> ${K.revelado ? `<b>${esc(K.lider)}</b>, ${esc(K.cargo)}, trama contra você!` : 'há boatos de traição no palácio...'}`;
    const o = [];
    const custoF = 300 + Game.world.settlements.filter(s => War.ownerOf(s) === 'jogador').length * 40;
    o.push({ label: `🎉 Festival real (${custoF} ouro)`, cls: 'gold', fn: () => { if (!this.pagar(custoF)) return; R.festaAte = Game.day + 4; R.felic = Math.min(100, R.felic + 6); Vida.honra(1); Sfx.play('quest'); Game.toast('Música e banquete em todo o reino! 🎉', '#ffe080'); this.menu(back); } });
    o.push({ label: '🍞 Distribuir pão (150 ouro)', fn: () => { if (!this.pagar(150)) return; R.pao = Game.day + 3; R.felic = Math.min(100, R.felic + 3); Game.toast('O povo recebeu pão da coroa.', '#ffe0a0'); this.menu(back); } });
    if (C) o.push({ label: `🤝 Negociar com os rebeldes (${C.rebeldes * 60} ouro)`, fn: () => { if (!this.pagar(C.rebeldes * 60)) return; R.civil = null; R.felic = Math.min(100, R.felic + 15); Game.centerMsg('ACORDO DE PAZ', `${C.lider} depôs as armas.`); Game.chron(`Negociei a paz com os rebeldes de ${C.lider}.`); this.menu(back); } });
    if (K && K.visto && !K.revelado) o.push({ label: '🔍 Investigar a conspiração (300 ouro)', fn: () => this.investigar(back) });
    if (K && K.revelado) {
      o.push({ label: `⚔ Executar ${K.lider}`, cls: 'danger', fn: () => { R.consp = null; R.medo = (R.medo || 0) + 6; Vida.honra(-3, 'executei um traidor'); Game.centerMsg('O TRAIDOR FOI EXECUTADO', K.lider); Game.chron(`Mandei executar ${K.lider}, ${K.cargo}, por traição.`); this.menu(back); } });
      o.push({ label: `🚪 Exilar ${K.lider}`, fn: () => { R.consp = null; R.felic = Math.max(0, R.felic - 1); Game.toast(`${K.lider} foi exilado(a) do reino.`, '#ffd080'); Game.chron(`Exilei ${K.lider} por conspirar contra mim.`); this.menu(back); } });
      o.push({ label: `🕊 Perdoar ${K.lider}`, fn: () => { Vida.honra(3, 'perdoei um traidor'); if (Math.random() < 0.6) { R.consp = null; Game.toast(`${K.lider} jurou lealdade, comovido(a).`, '#a0ffa0'); } else { K.revelado = false; K.prazo = Game.day + 3; Game.toast(`${K.lider} agradeceu... mas há algo no olhar dele(a).`, '#ffb080'); } this.menu(back); } });
    }
    o.push({ label: 'Voltar', fn: back });
    UI.dialog('O povo e a corte', null, txt, o);
  },
  pagar(n) { const P = Game.player, V = Vila.st(); if (V && V.cofre >= n) { V.cofre -= n; return true; } if (P.gold >= n) { P.gold -= n; Sfx.play('coin'); return true; } Game.toast('Ouro insuficiente (nem no cofre nem na bolsa).', '#ff8080'); return false; },
  botoesTab(f) {
    if (!Reino.ativo() || !Vila.st()) return '';
    const R = this.st();
    return `<div class="quest"><b>😊 O povo</b> — ${this.txt(R.felic)} (${Math.round(R.felic)}%)${R.civil ? ' • <span class="bad">guerra civil!</span>' : ''}${R.consp && R.consp.visto ? ' • <span class="warn">conspiração</span>' : ''}<br><button class="mbtn" ${f(() => this.menu())}>😊 Povo, revoltas e conspirações</button></div>`;
  },

  // ---------------- conspirações contra você ----------------
  conspDia() {
    const R = this.st(), P = Game.player;
    if (!R.consp) {
      const ch = 0.015 + (R.felic < 40 ? 0.04 : 0) + ((P.honra || 0) < 0 ? 0.02 : 0);
      if (Math.random() < ch) {
        const rng = new RNG(Game.day * 77 + 5);
        R.consp = { lider: rng.pick(NAMES.humano[rng.chance(0.5) ? 'm' : 'f']) + ' ' + rng.pick(NAMES.humano.s), cargo: rng.pick(CARGOS_CONSP), dia: Game.day, prazo: Game.day + 4 + rng.int(0, 3), visto: false, revelado: false };
      }
      return;
    }
    const K = R.consp;
    if (!K.visto && Game.day - K.dia >= 1) { K.visto = true; const V = Vila.st(); if (V) V.noticia = 'Há boatos de uma conspiração no palácio... Investigue antes que seja tarde (Reinos → O povo).'; Game.toast('🗡 Boatos de conspiração na corte!', '#ffb080'); }
    if (Game.day >= K.prazo) { K.atentado = true; }
  },
  investigar(back) {
    const R = this.st(), K = R.consp; if (!K) return back();
    if (!this.pagar(300)) return;
    if (Math.random() < 0.65) { K.revelado = true; Sfx.play('quest'); UI.dialog('Espiões', null, `Seus espiões descobriram tudo: <b>${esc(K.lider)}</b>, ${esc(K.cargo)}, planeja matar você e tomar o trono!`, [{ label: 'O que fazer?', fn: () => this.menu(back) }]); }
    else { K.prazo = Math.max(Game.day, K.prazo - 1); UI.dialog('Espiões', null, 'Os espiões não encontraram nada... e os conspiradores ficaram mais cautelosos e apressados.', [{ label: 'Voltar', fn: () => this.menu(back) }]); }
  },
  // o atentado acontece quando você está no mundo aberto
  atentadoTick() {
    const P = Game.player, R = P && P.reino, K = R && R.consp; if (!K || !K.atentado || !Game.level || !Game.level.isWorld || Game.paused) return;
    R.consp = null;
    for (let i = 0; i < 3; i++) {
      const ang = Math.random() * Math.PI * 2, m = new Monster('ninja', P.x + Math.cos(ang) * 90, P.y + Math.sin(ang) * 90, P.level + 1, { name: 'Assassino de ' + K.lider.split(' ')[0], dmgMul: 1.15 });
      if (collides(Game.world, m.x, m.y, m.r)) Game.findFree(m);
      m.provoked = P; m.aggro = 500; Game.actors.push(m);
    }
    const V = Vila.st(); if (V) V.cofre -= Math.floor(V.cofre * 0.25);
    Game.centerMsg('🗡 ATENTADO!', `Assassinos enviados por ${K.lider}, ${K.cargo}!`); Sfx.play('shout');
    Game.chron(`Sofri um atentado tramado por ${K.lider}, ${K.cargo}.`);
  },

  // ---------------- os reinos da IA ----------------
  S() { const S = War.st(); S.felic = S.felic || {}; S.governantes = S.governantes || {}; S.civis = S.civis || {}; S.consp = S.consp || []; return S; },
  felicIA(k) { const S = this.S(); if (S.felic[k] === undefined) S.felic[k] = 55 + (hashStr(k) % 15); return S.felic[k]; },
  alvoIA(k) {
    const S = War.st(), P = Game.player;
    let v = 55 - War.warOf(k).length * 8;
    if (!War.warOf(k).length) v += 5;
    const perdidas = Game.world.settlements.filter(s => s.region.id === k && War.ownerOf(s) !== k && War.ownerOf(s)).length; v -= perdidas * 4;
    if (Vassalagem.senhor(k)) v -= 6;
    if (P && P.tirania && P.tirania.k === k) v -= 12;
    if (S.civis && S.civis[k]) v -= 10;
    return clamp(v, 0, 100);
  },
  diaIA() {
    const S = this.S(), P = Game.player;
    for (const K of War.kingdoms()) {
      const k = K.id; if (k === 'jogador' || K.extinto) continue;
      const f = this.felicIA(k);
      S.felic[k] = clamp(f + (this.alvoIA(k) - f) * 0.2 + (Math.random() - 0.5) * 6, 0, 100);
      const C = S.civis[k];
      if (C) {
        if (Game.day >= C.fim) { delete S.civis[k]; if (Math.random() < (C.apoio ? 0.85 : 0.55)) this.golpe(k, 'revolucao', C.apoio); else { S.felic[k] = 40; War.news(`⚔ O rei de ${K.short} esmagou a revolta do povo.`, false, [k]); } }
        continue;
      }
      if (S.felic[k] < 25 && Math.random() < 0.12) this.civilIA(k);
      else if (Math.random() < 0.004) this.golpe(k, 'golpe');
    }
    // conspirações que você pagou
    for (const c of S.consp.slice()) {
      if (Game.day < c.fim) continue;
      S.consp.splice(S.consp.indexOf(c), 1);
      const K = War.K[c.k]; if (!K || K.extinto) continue;
      const ch = 0.5 + (this.felicIA(c.k) < 40 ? 0.25 : 0);
      if (Math.random() < ch) this.golpe(c.k, 'golpe', true);
      else {
        Reino.addRel(c.k, -40, 'você conspirou contra o nosso rei');
        Game.centerMsg('A CONSPIRAÇÃO FALHOU', `${K.short} descobriu o seu plano!`);
        War.news(`🗡 ${K.short} descobriu que ${P.name} tramava contra o seu rei!`, true, [c.k, 'jogador']);
        if (Reino.ativo() && Math.random() < 0.5) War.declare(c.k, 'jogador');
      }
    }
  },
  civilIA(k) {
    const S = this.S(), K = War.K[k];
    S.civis[k] = { inicio: Game.day, fim: Game.day + 3 + Math.floor(Math.random() * 4) };
    for (const a of S.armies) if (a.k === k) a.n = Math.ceil(a.n * 0.6);   // metade do exército luta contra o povo
    War.news(`🔥 Guerra civil em ${K.name}! O povo pegou em armas contra ${K.ruler.title} ${K.ruler.name}.`, true, [k]);
  },
  // o rei cai: um novo governante assume (revolução do povo ou golpe da corte)
  golpe(k, tipo, amigo) {
    const S = this.S(), K = War.K[k], P = Game.player; if (!K) return;
    const velho = `${K.ruler.title} ${K.ruler.name}`;
    const N = NAMES[K.race] || NAMES.humano, sexo = Math.random() < 0.5 ? 'm' : 'f';
    const tit = { Rei: ['Rei', 'Rainha'], Rainha: ['Rei', 'Rainha'], Jarl: ['Jarl', 'Jarl'], Imperador: ['Imperador', 'Imperatriz'], Imperatriz: ['Imperador', 'Imperatriz'], Sultão: ['Sultão', 'Sultana'], Sultana: ['Sultão', 'Sultana'] }[K.ruler.title];
    const novo = { title: tit ? tit[sexo === 'm' ? 0 : 1] : K.ruler.title, name: N[sexo][Math.floor(Math.random() * N[sexo].length)] + ' ' + N.s[Math.floor(Math.random() * N.s.length)] };
    S.governantes[k] = novo; this.aplicaGov();
    S.felic[k] = 68;
    // o novo governo faz as pazes e se liberta
    for (const w of War.warOf(k).slice()) if (Math.random() < 0.6) War.peace(w);
    if (Vassalagem.senhor(k)) delete Vassalagem.st()[k];
    if (amigo) Reino.addRel(k, 45, 'você nos ajudou a tomar o trono');
    War.news(tipo === 'revolucao' ? `🔥 REVOLUÇÃO em ${K.name}! O povo derrubou ${velho}. ${novo.title} ${novo.name} assume o trono.` : `🗡 GOLPE em ${K.name}! ${velho} foi deposto(a) pela corte. ${novo.title} ${novo.name} assume o trono.`, true, [k]);
    if (Game.started) Game.centerMsg(tipo === 'revolucao' ? '🔥 REVOLUÇÃO!' : '🗡 GOLPE DE ESTADO!', `${K.short}: ${novo.title} ${novo.name} no trono`);
    // o reino tirano que levou a sua família caiu
    if (P && P.tirania && P.tirania.k === k) {
      Game.chron(`${velho}, o tirano que levou ${P.tirania.crianca || 'a minha família'}, foi derrubado.`);
      P.tiraniaCaiu = Object.assign({}, P.tirania, { dia: Game.day, por: novo.name }); P.tirania = null;
      Game.toast('O reino tirano caiu! Os guardas não vão mais perseguir você.', '#a0ffa0');
    }
  },
  aplicaGov() {
    const S = Game.mods && Game.mods.war; if (!S || !S.governantes || !War.K) return;
    for (const k in S.governantes) { const K = War.K[k]; if (K && K.ruler.name !== S.governantes[k].name) { K.ruler = Object.assign({}, K.ruler, S.governantes[k]); const r = Game.world.regions.find(x => x.id === k); if (r) r.ruler = K.ruler; } }
  },
  textoDiplo(k) {
    const S = this.S(), v = this.felicIA(k);
    return `<br>😊 Povo: ${this.txt(v)} (${Math.round(v)}%)${S.civis[k] ? ' • <span class="bad">guerra civil!</span>' : ''}${S.consp.some(c => c.k === k) ? ' • <span class="warn">🗡 sua conspiração em andamento</span>' : ''}`;
  },
  opcoesDiplo(k, volta) {
    const S = this.S(), o = [], K = War.K[k];
    if (S.consp.some(c => c.k === k)) return o;
    if (S.civis[k]) o.push({ label: '🔥 Apoiar os rebeldes (800 ouro)', fn: () => { if (!this.pagarBolsa(800)) return; S.civis[k].apoio = true; Game.toast(`Armas e ouro chegaram aos rebeldes de ${K.short}.`, '#ffd080'); volta(); } });
    else o.push({ label: '🗡 Financiar uma conspiração (1500 ouro)', fn: () => UI.confirm(`Pagar nobres de ${esc(K.short)} para derrubar ${esc(K.ruler.title + ' ' + K.ruler.name)}? Se der certo, o novo governante será seu amigo. Se falhar, eles vão descobrir.`, () => { if (!this.pagarBolsa(1500)) return; S.consp.push({ k, fim: Game.day + 3 + Math.floor(Math.random() * 3) }); Game.toast('Os conspiradores receberam o ouro. Aguarde alguns dias...', '#ffd080'); Game.chron(`Financiei uma conspiração contra ${K.ruler.title} ${K.ruler.name} de ${K.short}.`); volta(); }, volta) });
    return o;
  },
  pagarBolsa(n) { const P = Game.player; if (P.gold < n) { Game.toast('Ouro insuficiente.', '#ff8080'); return false; } P.gold -= n; Sfx.play('coin'); return true; }
};

// ---------------- títulos de nobreza: servir bem a um reino rende terras ----------------
const Titulos = {
  nome(i) { const P = Game.player, T_ = TITULOS_FEUDO[i]; return P.app && P.app.sex === 'f' ? T_.f : T_.m; },
  atual() { const P = Game.player; return P.nobre && War.K[P.nobre.k] ? P.nobre : null; },
  // o que falta para o próximo título
  requisito(k) {
    const P = Game.player, A = P.army && P.army.k === k ? P.army : null, N = this.atual(), i = N && N.k === k ? N.i + 1 : 0, V = Vila.st();
    if (i >= TITULOS_FEUDO.length) return { i, falta: 'Você já tem o maior título.' };
    if (War.atWar('jogador', k)) return { i, falta: 'Estamos em guerra.' };
    const merito = A ? A.merit : 0, rank = A ? A.rank : -1, honra = P.honra || 0;
    if (i === 0) return (rank >= 2 && merito >= 70) || honra >= 70 ? { i } : { i, falta: `Sirva como Cavaleiro com 70 de mérito (tem ${merito}) ou tenha 70 de honra (tem ${Math.round(honra)}).` };
    if (i === 1) return (merito >= 150 || honra >= 85) && V && V.pop >= 8 ? { i } : { i, falta: `150 de mérito ou 85 de honra, e o seu feudo com 8 colonos${V ? ` (tem ${V.pop})` : ' (funde-o com a Carta de Fundação)'}.` };
    return (rank >= 3 && merito >= 250 || honra >= 95) && V && V.pop >= 16 ? { i } : { i, falta: `Elite Real com 250 de mérito ou 95 de honra, e o seu feudo com 16 colonos${V ? ` (tem ${V.pop})` : ''}.` };
  },
  opcoes(b, opts, k) {
    const P = Game.player, K = War.K[k], N = this.atual();
    if (!K || k === 'jogador' || Reino.ativo()) return '';
    if (N && N.k !== k) return '';
    let txt = '';
    if (N) {
      txt = `<br>👑 Você é <b class="gold">${this.nome(N.i)} de ${esc(N.terra)}</b>, nobre de ${esc(K.short)}.`;
      if (N.renda >= 1) opts.unshift({ label: `💰 Receber a renda do feudo (${Math.floor(N.renda)} ouro)`, cls: 'gold', fn: () => { const g = Math.floor(N.renda); P.gold += g; N.renda = 0; Sfx.play('coin'); Game.toast(`+${g} ouro`, '#ffd040'); UI.building(b); } });
    }
    const r = this.requisito(k);
    if (r.i < TITULOS_FEUDO.length) opts.push({ label: `👑 Pedir o título de ${this.nome(r.i)}`, fn: () => this.pedir(b, k) });
    return txt;
  },
  pedir(b, k) {
    const P = Game.player, K = War.K[k], r = this.requisito(k), back = () => UI.building(b);
    let look = null; try { look = UI.ownerLook(b); } catch (e) { /* prédio sem dono desenhável */ }
    if (r.falta) return UI.dialog(`${K.ruler.title} ${K.ruler.name}`, look, `Títulos de nobreza são para quem prova o seu valor. <span class="dim">${esc(r.falta)}</span>`, [{ label: 'Voltar', fn: back }]);
    const terra = this.atual() ? this.atual().terra : this.terra(k);
    P.nobre = { k, i: r.i, terra, dia: Game.day, renda: 0 };
    let extra = '';
    if (r.i === 0) {
      if (!Vila.st()) { P.addItem(Items.make('carta_fundacao', 1)); extra = '<br><br>Receba também uma <b>Carta de Fundação</b>: escolha um pedaço de terra e construa o seu feudo.'; }
      const R = Reino.st(); R.suserano = k;   // o feudo deve lealdade a este reino
    }
    Vida.honra(3); P.addXP(200 * (r.i + 1)); Sfx.play('levelup');
    Game.centerMsg(`${this.nome(r.i).toUpperCase()} DE ${terra.toUpperCase()}!`, `Nobre de ${K.short} • renda de ${TITULOS_FEUDO[r.i].renda} ouro/dia`);
    Game.chron(`${K.ruler.title} ${K.ruler.name} me nomeou ${this.nome(r.i)} de ${terra}, nobre de ${K.name}.`);
    War.news(`👑 ${P.name} foi nomeado(a) ${this.nome(r.i)} de ${terra} por ${K.short}.`, false, [k]);
    UI.dialog(`${K.ruler.title} ${K.ruler.name}`, look, `Ajoelhe-se. Pelos seus serviços a ${esc(K.name)}, eu o(a) nomeio <b class="gold">${this.nome(r.i)} de ${esc(terra)}</b>. Suas terras renderão ${TITULOS_FEUDO[r.i].renda} de ouro por dia.${extra}`, [{ label: 'Servirei com honra', cls: 'gold', fn: back }]);
  },
  terra(k) { const V = Vila.st(); if (V) return V.nome; const rng = new RNG(hashStr(Game.player.name + k)); return rng.pick(VILA_NOMES); },
  dia() {
    const P = Game.player, N = P && this.atual(); if (!N) return;
    if (War.atWar('jogador', N.k) || (P.reino && Reino.ativo())) {
      const K = War.K[N.k]; P.nobre = null;
      Game.toast(`Você perdeu o seu título de nobreza em ${K.short}.`, '#ff9080'); Game.chron(`Perdi o meu título de nobreza em ${K.short}.`);
      return;
    }
    N.renda = Math.min(TITULOS_FEUDO[N.i].renda * 20, (N.renda || 0) + TITULOS_FEUDO[N.i].renda);
    const V = Vila.st(); if (V && N.terra !== V.nome && N.i === 0 && V.fund >= N.dia) N.terra = V.nome;
  }
};

// ---------------- ganchos ----------------
(function () {
  const d0 = War.daily; War.daily = function () { d0.call(this); try { Povo.diaIA(); Povo.dia(); Titulos.dia(); } catch (e) { console.error('povo', e); } };
  const k0 = War.kingdoms; War.kingdoms = function () { const r = k0.call(this); Povo.aplicaGov(); return r; };
  const c0 = War.castleOptions; War.castleOptions = function (b, opts) { let t = c0.call(this, b, opts); const k = this.ownerOf(b.settlement); if (k) t += Titulos.opcoes(b, opts, k); return t; };
  const td = Corte.textoDiplo; Corte.textoDiplo = function (k) { return td.call(this, k) + Povo.textoDiplo(k); };
  const od = Corte.opcoesDiplo; Corte.opcoesDiplo = function (k, volta) { return od.call(this, k, volta).concat(Povo.opcoesDiplo(k, volta)); };
  // a renda da vila muda com o humor do povo; nobres pagam menos tributo
  const v0 = Vila.dia; Vila.dia = function () {
    const V = Vila.st(), c = V ? V.cofre : 0; v0.call(this);
    if (V && Game.player.reino) { const g = V.cofre - c; if (g > 0) V.cofre = c + Math.round(g * Povo.rendaMul()); }
  };
  const t0 = Reino.tributo; Reino.tributo = function (renda) { const n = t0.call(this, renda); return Titulos.atual() ? Math.round(n * 0.5) : n; };
})();
