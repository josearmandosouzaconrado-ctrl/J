'use strict';
// ===================== INTERFACE: relacionamentos, família, destino =====================
Object.assign(UI, {
  hearts(aff) {
    const n = Math.max(0, Math.min(10, Math.round(aff / 10)));
    return `<span class="hearts">${'♥'.repeat(Math.floor(n / 2))}${n % 2 ? '♡' : ''}<span class="dim">${'♡'.repeat(5 - Math.ceil(n / 2))}</span></span>`;
  },
  relOf(a) {
    const P = Game.player;
    let r = P.rel[a.rid];
    if (!r) r = P.rel[a.rid] = { aff: 0, talkDay: -1, giftDay: -1, status: 'none', name: a.name, race: a.race, sex: a.sex, look: a.look };
    r.name = a.name; r.look = a.look; r.race = a.race; r.sex = a.sex;
    return r;
  },
  pron(sex, m, f) { return sex === 'f' ? f : m; },
  // Conversa pessoal / romance
  personal(a, back) {
    const P = Game.player;
    if (a.child || a.role === 'child') return this.childNPC(a);
    const r = this.relOf(a);
    const isSpouse = P.spouse === a.rid;
    const opts = [];
    const day = Game.day;
    const statusTxt = isSpouse ? `<span class="love">${this.pron(r.sex, 'Seu marido', 'Sua esposa')}</span>` : r.status === 'dating' ? '<span class="love">Namorando</span>' : r.aff >= 60 ? 'Muito próximos' : r.aff >= 30 ? 'Amigos' : r.aff >= 10 ? 'Conhecidos' : 'Estranhos';
    const head = `${this.hearts(r.aff)} <span class="dim">${statusTxt}</span><br>`;
    if (r.talkDay !== day || (r.talkN || 0) < 3) opts.push({ label: 'Conversar 💬', fn: () => Vida.conversar(a, r, () => this.personal(a, back)) });
    if (r.giftDay !== day) opts.push({ label: 'Dar um presente', fn: () => this.giftMenu(a, back) });
    if (!isSpouse && r.status !== 'dating' && r.aff >= 25 && !P.spouse) opts.push({ label: 'Flertar 💕', fn: () => {
      if (r.flirtDay === day) return this.dialog(a.name, a.look, 'Já chega por hoje, galanteador(a)!', [{ label: 'Voltar', fn: () => this.personal(a, back) }]);
      r.flirtDay = day;
      const ch = 0.35 + P.skill('eloquencia') * 0.005 + r.aff * 0.005;
      const ok = Math.random() < ch;
      r.aff = clamp(r.aff + (ok ? 8 : -4), 0, 100); P.train('eloquencia', 3);
      const L = ok ? ROMANCE_LINES.flirtOk : ROMANCE_LINES.flirtBad;
      this.dialog(a.name, a.look, `${this.hearts(r.aff)}<br>${esc(L[Math.floor(Math.random() * L.length)])}`, [{ label: 'Voltar', fn: () => this.personal(a, back) }]);
    } });
    if (!isSpouse && r.status !== 'dating' && r.aff >= 50 && !P.spouse) opts.push({ label: 'Pedir em namoro', cls: 'gold', fn: () => {
      if (Math.random() < 0.5 + r.aff / 150) { r.status = 'dating'; Sfx.play('quest'); this.dialog(a.name, a.look, `${this.hearts(r.aff)}<br>Sim! Eu esperava que você pedisse... 💕`, [{ label: 'Voltar', fn: () => this.personal(a, back) }]); }
      else { r.aff = Math.max(0, r.aff - 5); this.dialog(a.name, a.look, 'Ainda não estou pronto(a)... vamos nos conhecer mais.', [{ label: 'Voltar', fn: () => this.personal(a, back) }]); }
    } });
    if (r.status === 'dating' && !P.spouse) opts.push({ label: 'Pedir em casamento 💍', cls: 'gold', fn: () => this.propose(a, r, back) });
    if (isSpouse) {
      if (r.giftDayS !== day) opts.push({ label: 'Como foi seu dia?', fn: () => {
        r.giftDayS = day;
        const roll = Math.random();
        let txt;
        if (roll < 0.4) { const g = 40 + P.level * 12; P.gold += g; txt = `Guardei um dinheirinho para você. <span class="gold">+${g} ouro</span>`; Sfx.play('coin'); }
        else if (roll < 0.8) { P.addItem(Items.make(Math.random() < 0.5 ? 'ensopado' : 'torta_maca', 2)); txt = 'Cozinhei para você! Leve na sua viagem.'; }
        else { P.addItem(Items.make(Items.potionFor(P.level, new RNG(Date.now() & 0xffff)), 2)); txt = 'Comprei umas poções para você. Volte inteiro(a)!'; }
        P.heal(P.stat.maxHp);
        this.dialog(a.name, a.look, txt, [{ label: 'Obrigado, meu amor', fn: () => this.personal(a, back) }]);
      } });
      const following = P.follower && P.follower.spouse;
      if (!following) opts.push({ label: 'Venha aventurar comigo', fn: () => {
        P.follower = { name: a.name, spouse: true, look: a.look };
        if (a.indoor) { a.dead = true; a.deadT = 10; }
        Game.spawnFollower(); this.close(); Game.toast(`${a.name} agora acompanha você!`, '#ff90c0');
      } });
      if (P.houses.length && !P.spouseHome) opts.push({ label: 'Vamos morar na minha casa', fn: () => { P.spouseHome = P.houses[0]; const s = Game.world.settlements.find(s => s.id === P.spouseHome); Game.toast(`${a.name} vai morar na sua casa em ${s ? s.name : ''}.`, '#ff90c0'); this.personal(a, back); } });
      if (P.spouseHome && P.houses.includes(P.spouseHome) && (P.children || []).length < 4 && !P.babyDue && r.aff >= 70 && r.babyTryDay !== day) opts.push({ label: 'Vamos aumentar a família? 👶', fn: () => {
        // anjos quase nunca aceitam ter filhos
        if (!Ceu.babyTry(r)) return this.dialog(a.name, a.look, `${this.hearts(r.aff)}<br>${esc(this.pron(r.sex, 'Ele', 'Ela'))} desvia o olhar e fecha as asas.<br>"Anjos não costumam ter filhos... hoje não. Talvez nunca."<div class="dim small">(Com um anjo a chance de ter um filho é muito pequena. Dá para tentar de novo amanhã.)</div>`, [{ label: 'Voltar', fn: () => this.personal(a, back) }]);
        P.babyDue = Game.day + 3; r.aff = Math.min(100, r.aff + 5); Sfx.play('quest');
        this.dialog(a.name, a.look, 'Um bebê! Que alegria! Em alguns dias nossa família vai crescer. 💕', [{ label: 'Voltar', fn: () => this.personal(a, back) }]);
      } });
    }
    opts.push({ label: 'Voltar', fn: back || (() => this.close()) });
    this.dialog(a.name, a.look, head + esc(isSpouse ? 'Oi, meu amor!' : r.aff >= 30 ? 'Que bom te ver!' : GREETINGS[Math.floor(Math.random() * GREETINGS.length)]), opts);
  },
  giftMenu(a, back) {
    const P = Game.player, r = this.relOf(a);
    const f = this.reg();
    const items = P.inv.filter(it => !P.isEquipped(it) && ITEMS[it.id].type !== 'quest' && it.id !== 'alma_dragao');
    const val = it => { const d = ITEMS[it.id]; let v = Items.value(it) / 8; if (it.id === 'buque') v = 15; if (d.type === 'material' && d.icon && d.icon.k === 'gem') v *= 1.5; if (d.slot === 'ring' || d.slot === 'neck') v *= 1.4; return Math.round(clamp(v, 1, 25)); };
    const rows = items.map(it => `<div class="irow" ${f(() => {
      const g = val(it); P.removeInst(it, 1); r.aff = Math.min(100, r.aff + g); r.giftDay = Game.day; Sfx.play('pickup');
      this.dialog(a.name, a.look, `${this.hearts(r.aff)}<br>${g >= 15 ? 'Uau! É lindo! Obrigado(a)!' : g >= 6 ? 'Que gentil da sua parte!' : 'Ah... obrigado(a).'} <span class="good">(+${g})</span>`, [{ label: 'Voltar', fn: () => this.personal(a, back) }]);
    })}>${this.icon(Items.icon(it))}<span class="iname" style="color:${Items.color(it)}">${esc(Items.name(it))}${it.n > 1 ? ' x' + it.n : ''}</span><span class="love">+${val(it)}♥</span></div>`).join('') || '<div class="dim pad">Nada para presentear.</div>';
    const el = this.show('gift', `<div class="panel"><div class="ptitle">Presente para ${esc(a.name)}</div><div class="dim">Flores, joias e gemas são os presentes favoritos. 1 presente por dia.</div><div class="ilist" style="max-height:55vh">${rows}</div><button class="mbtn small" ${f(() => this.personal(a, back))}>Voltar</button></div>`, { onBack: () => this.personal(a, back) });
    this.bind(el, f);
  },
  propose(a, r, back) {
    const P = Game.player;
    if (!P.count('amuleto_aurora')) { this.dialog(a.name, a.look, 'Para pedir alguém em casamento você precisa de um <b>Amuleto da Aurora</b>. Eles são vendidos nos templos.', [{ label: 'Voltar', fn: () => this.personal(a, back) }]); return; }
    if (r.aff < 80) { this.dialog(a.name, a.look, `${this.hearts(r.aff)}<br>Eu gosto muito de você... mas ainda é cedo. <span class="dim">(Precisa de 80 de afeto)</span>`, [{ label: 'Voltar', fn: () => this.personal(a, back) }]); return; }
    P.spouse = a.rid; r.status = 'married'; r.aff = 100;
    if (P.houses.length) P.spouseHome = P.houses[0];
    Sfx.play('levelup');
    for (let i = 0; i < 40; i++) Game.particle(P.x + (Math.random() - 0.5) * 40, P.y - 10, (Math.random() - 0.5) * 40, -40 - Math.random() * 60, Math.random() < 0.5 ? '#ff80b0' : '#fff0a0', 1.4, 2);
    Game.centerMsg('VOCÊS SE CASARAM! 💍', `${P.name} e ${a.name}`);
    P.addXP(200);
    const home = P.spouseHome ? `Vou me mudar para sua casa em ${(Game.world.settlements.find(s => s.id === P.spouseHome) || {}).name}.` : 'Quando você comprar uma casa, vamos morar juntos. Até lá fico aqui.';
    this.dialog(a.name, a.look, `Sim! Mil vezes sim! 💕<br>${esc(home)}`, [{ label: 'Te amo!', fn: () => this.close() }]);
  },
  childNPC(a) {
    const P = Game.player;
    const kid = a.kid;
    const opts = [];
    const line = ROMANCE_LINES.child[Math.floor(Math.random() * ROMANCE_LINES.child.length)];
    if (kid) {
      const age = Game.day - kid.born;
      if (kid.playDay !== Game.day) opts.push({ label: 'Brincar', fn: () => { kid.playDay = Game.day; Sfx.play('pickup'); if (Math.random() < 0.35) P.addItem(Items.make('desenho')); P.addBuff('regen', 2, 300, 'Alegria'); this.dialog(a.name, a.look, 'Hahaha! De novo, de novo! 😄<br><span class="good">Você se sente revigorado(a).</span>', [{ label: 'Voltar', fn: () => this.childNPC(a) }]); } });
      if (kid.giftDay !== Game.day) {
        const toy = P.inv.find(it => it.id === 'boneca' || it.id === 'espada_madeira' || it.id === 'doce' || ITEMS[it.id].type === 'food');
        if (toy) opts.push({ label: `Dar ${ITEMS[toy.id].name}`, fn: () => { kid.giftDay = Game.day; P.removeInst(toy, 1); Sfx.play('learn'); this.dialog(a.name, a.look, 'Uau, obrigado!! Você é o(a) melhor! 💖', [{ label: 'Voltar', fn: () => this.childNPC(a) }]); } });
      }
      opts.push({ label: 'Sair' });
      this.dialog(`${a.name} (${age < 15 ? 'criança' : 'jovem'}, ${age} dias)`, a.look, esc(line), opts);
      return;
    }
    this.dialog(a.name, a.look, esc(['Oi! Você é um aventureiro de verdade?', 'Minha mãe disse para não falar com estranhos...', 'Você já viu um dragão?!', 'Quer brincar de pega-pega?'][Math.floor(Math.random() * 4)]), [{ label: 'Tchau' }]);
  },
  babyCrib() {
    const P = Game.player;
    const babies = (P.children || []).filter(c => Game.day - c.born < 3);
    if (!babies.length) { this.dialog('Berço', null, 'O berço está vazio.', [{ label: 'Ok' }]); return; }
    const b = babies[0];
    this.dialog('Berço', null, `${esc(b.name)} está dormindo tranquilamente. 👶<br><span class="dim">Em ${3 - (Game.day - b.born)} dia(s) vai começar a andar pela casa.</span>`, [{ label: 'Fazer carinho', fn: () => { P.addBuff('regen', 2, 300, 'Amor'); Sfx.play('learn'); this.close(); Game.toast('Você se sente cheio(a) de amor.', '#ff90c0'); } }, { label: 'Sair' }]);
  },
  nameChild(kid) {
    const f = this.reg();
    const el = this.show('name', `<div class="panel small center"><div class="ptitle">Nome do bebê</div><p>${kid.sex === 'm' ? 'É um menino!' : 'É uma menina!'} Como vai se chamar?</p><input id="kidname" maxlength="16" value="${esc(kid.name)}"><div class="row end"><button class="mbtn gold" ${f(() => { const v = (document.getElementById('kidname').value || '').trim(); if (v) kid.name = v; this.close(); Game.toast(`Bem-vindo(a) à família, ${kid.name}!`, '#ff90c0'); })}>Confirmar</button></div></div>`);
    this.bind(el, f);
  },
  adopt(b) {
    const P = Game.player;
    if (!P.houses.length) { this.dialog(b.owner.name, this.ownerLook(b), 'Para adotar uma criança você precisa ter uma casa. Casas são vendidas nas capitais.', [{ label: 'Voltar', fn: () => this.building(b) }]); return; }
    if ((P.children || []).length >= 4) { this.dialog(b.owner.name, this.ownerLook(b), 'Sua família já é grande! Cuide bem deles.', [{ label: 'Voltar', fn: () => this.building(b) }]); return; }
    const rng = new RNG(Date.now() & 0xffffff);
    const kids = [0, 1, 2].map(() => { const race = rng.pick(playableRaces()), sex = rng.chance(0.5) ? 'm' : 'f'; const look = npcLook(race, sex, rng, 'kid'); look.short = 3; look.blush = true; delete look.beard; return { id: 'k' + uid(), name: rng.pick(NAMES[race][sex]), race, sex, look, born: Game.day - 5 }; });
    const f = this.reg();
    const el = this.show('adopt', `<div class="panel"><div class="ptitle">Orfanato do Templo</div><p>Estas crianças esperam por uma família. Custo de 100 ouro (doação ao templo).</p>
      <div class="adopt">${kids.map(k => `<div class="choice">${this.portrait(k.look)}<span>${esc(k.name)}</span><small class="dim">${RACES[k.race].name}</small><button class="sbtn gold" ${f(() => {
        if (P.gold < 100) return Game.toast('Ouro insuficiente.', '#ff8080');
        P.gold -= 100; P.children.push(k); Sfx.play('levelup');
        Game.centerMsg('NOVO MEMBRO DA FAMÍLIA!', `${k.name} vai morar na sua casa.`); this.close();
      })}>Adotar</button></div>`).join('')}</div>
      <button class="mbtn small" ${f(() => this.building(b))}>Voltar</button></div>`, { onBack: () => this.building(b) });
    this.bind(el, f);
  },
  pets(b) {
    const P = Game.player;
    const f = this.reg();
    const el = this.show('pets', `<div class="panel"><div class="ptitle">Animais de Estimação <span class="gold right">${fmt(P.gold)} ouro</span></div>
      <p class="dim">Seu animal segue você e luta ao seu lado. Se ferido, volta no dia seguinte.</p>
      ${Object.entries(PETS).map(([k, pt]) => `<div class="crow">${this.portrait(ENEMIES[k].look)}<div class="cinfo"><b>${pt.name}</b><br><small>Vida ${ENEMIES[k].hp} • Dano ${ENEMIES[k].dmg}</small></div><button class="sbtn gold" ${f(() => {
        if (P.gold < pt.price) return Game.toast('Ouro insuficiente.', '#ff8080');
        P.gold -= pt.price;
        for (const a of Game.actors) if (a.isPet) a.vanish();
        P.pet = { kind: k, name: pt.names[Math.floor(Math.random() * pt.names.length)] };
        Game.spawnPet(); Sfx.play('learn'); Game.toast(`${P.pet.name} agora é seu companheiro!`, '#80e0ff'); this.close();
      })}>${pt.price}o</button></div>`).join('')}
      <button class="mbtn small" ${f(() => this.building(b))}>Voltar</button></div>`, { onBack: () => this.building(b) });
    this.bind(el, f);
  },
  destiny(o) {
    const P = Game.player;
    const key = o === O.DESTINY ? 'guerreiro' : o === O.DESTINY2 ? 'mago' : 'ladrao';
    const D = DESTINY[key];
    const cur = P.sign ? DESTINY[P.sign].name : 'nenhuma';
    this.dialog(D.name, null, `<b style="color:${D.c}">${D.name}</b><br>${D.desc}<br><br><span class="dim">Bênção atual: ${cur}. Você pode trocar quando quiser.</span>`, P.sign === key ? [{ label: 'Esta já é sua bênção' }] : [
      { label: 'Receber esta bênção', cls: 'gold', fn: () => { P.sign = key; Sfx.play('shout'); Game.shake = 4; Game.centerMsg(D.name.toUpperCase(), D.desc); this.close(); } },
      { label: 'Agora não' }
    ]);
  },
  familyTab(f) {
    const P = Game.player, W = Game.world;
    const sp = P.spouse ? P.rel[P.spouse] : null;
    const home = P.spouseHome ? W.settlements.find(s => s.id === P.spouseHome) : null;
    const kids = (P.children || []).map(k => { const age = Game.day - k.born; return `<div class="spell">${this.portrait(Object.assign({}, k.look, { short: age < 15 ? 3 : 2 }))}<div><b>${esc(k.name)}</b><br><small>${age < 3 ? 'Bebê' : age < 15 ? 'Criança' : 'Jovem'} • ${age} dias • ${RACES[k.race].name}</small></div></div>`; }).join('');
    const rels = Object.entries(P.rel).filter(([id, r]) => r.aff > 0 && id !== P.spouse).sort((a, b) => b[1].aff - a[1].aff).slice(0, 12)
      .map(([id, r]) => `<div class="spell">${r.look ? this.portrait(r.look) : ''}<div><b>${esc(r.name)}</b> ${r.status === 'dating' ? '<span class="love">namorando</span>' : ''}<br>${this.hearts(r.aff)}</div></div>`).join('');
    return `<h3>Cônjuge</h3>${sp ? `<div class="spell">${this.portrait(sp.look)}<div><b>${esc(sp.name)}</b> <span class="love">💍 casados</span><br><small class="dim">${home ? 'Mora na sua casa em ' + esc(home.name) : 'Ainda mora na casa dele(a)'}${P.follower && P.follower.spouse ? ' • acompanhando você' : ''}</small></div></div>` : '<div class="dim pad">Solteiro(a). Converse com moradores dentro das casas e lojas, dê presentes e conquiste alguém! Amuletos da Aurora são vendidos nos templos.</div>'}
      ${P.babyDue ? `<div class="good">👶 Um bebê está a caminho! (dia ${P.babyDue})</div>` : ''}
      <h3>Filhos</h3><div class="spells">${kids || '<div class="dim pad">Nenhum filho ainda. Casado(a) e com casa, converse com seu cônjuge — ou adote no templo.</div>'}</div>
      <h3>Animal de estimação</h3>${P.pet ? `<div class="spell">${this.portrait(ENEMIES[P.pet.kind].look)}<div><b>${esc(P.pet.name)}</b><br><small>${PETS[P.pet.kind].name}${P.pet.downDay !== undefined ? ' • se recuperando' : ''}</small></div></div>` : '<div class="dim pad">Compre um animal no estábulo de uma capital.</div>'}
      <h3>Relacionamentos</h3><div class="spells">${rels || '<div class="dim pad">Ninguém ainda.</div>'}</div>
      <h3>Casas</h3><div class="dim">${P.houses.length ? P.houses.map(id => esc((W.settlements.find(s => s.id === id) || W.homes.find(h => h.id === id) || {}).name || id)).join(', ') : 'Nenhuma. Compre uma casa nas capitais ou construa a sua.'}</div>
      ${W.homes.filter(h => !h.done).map(h => `<div class="good">🔨 Em obra: ${esc(h.name)} (${Math.round(h.progress * 100)}%)</div>`).join('')}
      <div class="row"><button class="sbtn gold" ${f(() => this.buildMenu())}>🔨 Construir uma casa aqui</button></div>
      <h3>Montaria e carroça</h3><div class="dim">${P.mount ? MOUNTS[P.mount].name : 'Nenhuma montaria'}${P.cart ? ` • Carroça com ${(P.cart.load || []).length}/${CART_CAP} caças` : ''}</div>`;
  }
});
Object.assign(UI, {
  carcassMenu(c) {
    const P = Game.player, d = ENEMIES[c.eid];
    const opts = [
      { label: 'Carregar no ombro', cls: 'gold', fn: () => { Game.carcasses = Game.carcasses.filter(x => x !== c); P.carrying = { eid: c.eid, lvl: c.lvl }; P.mounted = false; Sfx.play('roll'); this.close(); Game.toast(P.cart ? 'Leve até a carroça para guardar.' : 'Leve até uma cidade para vender ou esfole.', '#ffd080'); } },
      { label: 'Esfolar aqui (carne e couro)', fn: () => { Game.carcasses = Game.carcasses.filter(x => x !== c); Game.skin(c); this.close(); } },
      { label: 'Deixar' }
    ];
    this.dialog(`Carcaça de ${d.name}`, null, `Uma carcaça grande. Vale cerca de <span class="gold">${Game.carcassValue(c)} ouro</span> inteira no açougue (armazém ou taverna).<br><span class="dim">Esfolando aqui você só pega carne e couro.</span>`, opts);
  },
  cartMenu() {
    const P = Game.player, c = P.cart;
    const load = c.load || (c.load = []);
    const opts = [];
    if (P.carrying) opts.push({ label: 'Colocar carcaça na carroça', cls: 'gold', fn: () => { if (load.length >= CART_CAP) return Game.toast('A carroça está cheia!', '#ffa0a0'); load.push(P.carrying); P.carrying = null; Sfx.play('roll'); this.cartMenu(); } });
    if (!P.carrying && load.length) opts.push({ label: 'Pegar uma carcaça', fn: () => { P.carrying = load.pop(); this.close(); } });
    if (load.length) opts.push({ label: `Esfolar toda a carga (${load.length})`, fn: () => { for (const it of load) Game.skin(it); c.load = []; this.close(); } });
    const horseNear = P.mounted || (P.horse && dist(P.horse.x, P.horse.y, c.x, c.y) < 70);
    if (!c.hitched) {
      if (horseNear) opts.push({ label: 'Atrelar ao cavalo', cls: 'gold', fn: () => { c.hitched = true; Sfx.play('horse'); Game.toast('Carroça atrelada! Monte e o cavalo vai puxá-la.', '#ffd080'); this.close(); } });
      else opts.push({ label: P.mount ? 'Traga seu cavalo para perto (assobie com o botão de montaria)' : 'Você precisa de um cavalo para puxar a carroça', fn: () => this.close() });
    } else opts.push({ label: 'Desatrelar', fn: () => { c.hitched = false; this.close(); } });
    opts.push({ label: 'Fechar' });
    const list = load.map(l => ENEMIES[l.eid].name).join(', ') || 'vazia';
    this.dialog('Sua Carroça', null, `Carga (${load.length}/${CART_CAP}): ${esc(list)}${load.length ? `<br>Valor estimado: <span class="gold">${load.reduce((a, l) => a + Game.carcassValue(l), 0)} ouro</span>. Venda no armazém ou na taverna de qualquer cidade.` : ''}`, opts);
  },
  sellCart(b) {
    const P = Game.player, c = P.cart;
    let total = c.load.reduce((a, l) => a + Game.carcassValue(l), 0);
    if (P.job && P.job.id === 'cacador') total = Math.round(total * 1.5);
    total = Math.round(total * (1 + P.skill('eloquencia') / 200));
    const n = c.load.length;
    c.load = []; P.gold += total; P.train('eloquencia', 4); Sfx.play('coin');
    Game.chron(`Vendi uma carroça com ${n} caças em ${b.settlement.name} por ${total} ouro.`);
    Game.toast(`Carga vendida: +${total} ouro`, '#ffd040');
    this.building(b);
  },
  jobOptions(b, opts) {
    const P = Game.player, s = b.settlement;
    const here = Object.entries(JOBS).filter(([id, J]) => J.role === b.role && (!J.village || s.type === 'village' || s.type === 'town'));
    for (const [id, J] of here) {
      if (P.job && P.job.id === id && P.job.sid === s.id) {
        const rank = JOB_RANKS[Game.jobRank(P.job)][0];
        if (Work.isActive(id)) opts.push({ label: `💼 Começar turno: ${J.name} <span class="dim">(${{ taverneiro: 'servir as mesas', fazendeiro: 'plantar e colher', minerador: 'minerar na mina' }[id]}, ~${Math.round(Game.jobPay(id) * 1.4)} ouro + gorjetas)</span>`, cls: 'gold', fn: () => Work.start(b, id) });
        else opts.push({ label: `💼 Trabalhar um turno: ${J.name} (4h, ~${Game.jobPay(id)} ouro)`, cls: 'gold', fn: () => { if (Game.workShift(b)) this.building(b); } });
        opts.push({ label: `Pedir demissão (${rank}, ${P.job.shifts} turnos)`, cls: 'danger', fn: () => this.confirm(`Pedir demissão do cargo de ${J.name}?`, () => { Game.chron(`Deixei o emprego de ${J.name} em ${s.name}.`); P.job = null; this.building(b); }, () => this.building(b)) });
      } else {
        opts.push({ label: `💼 Pedir emprego: ${J.name} <span class="dim">(${J.desc} ~${Game.jobPay(id)} ouro/turno)</span>`, fn: () => {
          const go = () => { P.job = { id, sid: s.id, sname: s.name, shifts: 0, lastDay: -1, today: 0 }; Sfx.play('quest'); Game.chron(`Consegui um emprego de ${J.name} em ${s.name}.`); Game.toast(`Contratado(a): ${J.name}! Trabalhe turnos aqui.`, '#ffd040'); this.building(b); };
          if (P.job) this.confirm(`Largar o emprego atual (${JOBS[P.job.id].name}) para ser ${J.name}?`, go, () => this.building(b)); else go();
        } });
      }
    }
  },
  mountsShop(b) {
    const P = Game.player, R = b.settlement.region;
    const f = this.reg();
    const list = Object.entries(MOUNTS).filter(([k, M]) => !M.where || M.where === R.id);
    const el = this.show('mounts', `<div class="panel"><div class="ptitle">Estábulo <span class="gold right">${fmt(P.gold)} ouro</span></div>
      <p class="dim">Montarias especiais só são vendidas em seus reinos: Corcel Élfico (Sylvaris), Alce (Nordheim), Camelo (Zahrim), Lobo Gigante (Gor'Thak), Cavalo de Guerra (Valdoria).</p>
      ${list.map(([k, M]) => `<div class="crow"><img class="portrait" style="width:52px;height:44px" src="${Sprites.horse(k).right[0].toDataURL()}"><div class="cinfo"><b>${M.name}</b> ${P.mount === k ? '<span class="good">(sua)</span>' : ''}<br><small>Velocidade ${Math.round(M.speed * 100)}% • ${M.desc}</small></div>${P.mount === k ? '' : `<button class="sbtn gold" ${f(() => {
        if (P.gold < M.price) return Game.toast('Ouro insuficiente.', '#ff8080');
        P.gold -= M.price; P.mount = k; P.hasHorse = true; P.mounted = false; P.horse = { x: (b.door.x) * 16 + 8, y: (b.door.y + 2) * 16 + 8, dir: 'right' };
        Sfx.play('horse'); Game.chron(`Comprei ${M.name === 'Burro' ? 'um' : 'um(a)'} ${M.name.toLowerCase()} em ${b.settlement.name}.`); Game.centerMsg(M.name.toUpperCase() + ' ADQUIRIDO!', 'Está esperando na frente do estábulo. Use o botão de montaria.'); this.close();
      })}>${M.price}o</button>`}</div>`).join('')}
      <div class="crow"><img class="portrait" style="width:56px;height:36px" src="${Sprites.cart().right[0].toDataURL()}"><div class="cinfo"><b>Carroça</b> ${P.cart ? '<span class="good">(você tem)</span>' : ''}<br><small>Atrele ao cavalo para transportar até ${CART_CAP} carcaças de animais grandes.</small></div>${P.cart ? `<button class="sbtn" ${f(() => { P.cart.x = b.door.x * 16 + 40; P.cart.y = (b.door.y + 2) * 16 + 8; P.cart.hitched = false; Game.toast('Carroça trazida para cá.', '#ffd080'); this.close(); })}>Buscar (50o)</button>` : `<button class="sbtn gold" ${f(() => {
        if (P.gold < CART_PRICE) return Game.toast('Ouro insuficiente.', '#ff8080');
        P.gold -= CART_PRICE; P.cart = { x: b.door.x * 16 + 40, y: (b.door.y + 2) * 16 + 8, hitched: false, load: [], dir: 'right' };
        Sfx.play('coin'); Game.chron(`Comprei uma carroça em ${b.settlement.name}.`); Game.centerMsg('CARROÇA COMPRADA!', 'Está na frente do estábulo. Traga o cavalo e atrele.'); this.close();
      })}>${CART_PRICE}o</button>`}</div>
      <button class="mbtn small" ${f(() => this.building(b))}>Voltar</button></div>`, { onBack: () => this.building(b) });
    this.bind(el, f);
  },
  construction(h) {
    const P = Game.player, T_ = HOME_TIERS[h.tier];
    const opts = [];
    if (h.mode === 'self') {
      opts.push({ label: `🔨 Trabalhar na obra (2h) — Construção ${P.skill('construcao')}`, cls: 'gold', fn: () => { if (P.st < 25) return Game.toast('Você está cansado demais. Descanse um pouco.', '#80ff80'); this.close(); Game.workOnHome(h); } });
      opts.push({ label: 'Usar bancada de carpintaria', fn: () => this.craft('carpentry') });
    }
    opts.push({ label: 'Fechar' });
    const q = h.mode === 'self' ? `Qualidade prevista: <b>${HOME_QUALITY[clamp(Math.floor((h.skillSum + P.skill('construcao')) / Math.max(1, h.sessions + 1) / 20), 0, 4)]}</b> (depende da sua habilidade de Construção)` : `Construtores trabalhando. Pronta no dia ${h.finishDay}. Qualidade: <b>${HOME_QUALITY[h.quality]}</b>`;
    this.dialog(h.name, null, `Progresso: <b>${Math.round(h.progress * 100)}%</b><br>${q}`, opts);
  },
  buildMenu() {
    const P = Game.player;
    const f = this.reg();
    const matTxt = mats => Object.entries(mats).map(([id, n]) => `<span class="${P.count(id) >= n ? 'good' : 'bad'}">${ITEMS[id].name} ${P.count(id)}/${n}</span>`).join(', ');
    const rows = Object.entries(HOME_TIERS).map(([k, T_]) => {
      const can = Game.canBuildHere(k);
      return `<div class="quest"><b class="gold">${T_.name}</b> <small class="dim">(${T_.w}×${T_.h})</small><br><small>Materiais: ${matTxt(T_.mats)}</small><br>
        ${typeof can === 'string' ? `<small class="bad">${esc(can)}</small>` : `<div class="row">
          <button class="sbtn" ${f(() => { if (Game.startHome(k, 'hire', false)) this.close(); })}>Contratar construtores: ${T_.hire}o</button>
          <button class="sbtn" ${f(() => { if (Game.startHome(k, 'hire', true)) this.close(); })}>Mestre de obras: ${Math.round(T_.hire * 1.5)}o (Excelente)</button>
          <button class="sbtn" ${f(() => { if (Game.startHome(k, 'labor', false)) this.close(); })}>Meus materiais + mão de obra: ${T_.labor}o</button>
          <button class="sbtn gold" ${f(() => { if (Game.startHome(k, 'self', false)) this.close(); })}>Construir sozinho(a) (grátis)</button></div>`}</div>`;
    }).join('');
    const el = this.show('build', `<div class="panel"><div class="ptitle">Construir uma Casa</div>
      <p class="dim">A casa será construída logo acima de onde você está. Escolha um terreno plano, longe das cidades.<br>
      Materiais: <b>Tábuas</b> (serre lenha na bancada de carpintaria), <b>Pedras</b> (quebre rochas com uma picareta), <b>Pregos</b> (feitos de lingote de ferro) e <b>Blocos de pedra</b>. Tudo também é vendido nos armazéns.<br>
      Construindo sozinho a qualidade depende da sua habilidade de <b>Construção</b> (${P.skill('construcao')}); você pode reformar depois para melhorar.</p>
      ${rows}<button class="mbtn small" ${f(() => this.close())}>Fechar</button></div>`, { cls: 'scroll' });
    this.bind(el, f);
  },
  chronicleHTML() {
    const P = Game.player;
    const list = (P.chronicle || []).slice().reverse();
    return `<h3>📜 Sua História</h3><div class="chron">${list.map(e => `<div><span class="gold">Dia ${e.day}</span> — ${esc(e.text)}</div>`).join('') || '<div class="dim">Sua história ainda está para ser escrita...</div>'}</div>`;
  }
});
