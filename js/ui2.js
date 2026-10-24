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
    if (r.talkDay !== day) opts.push({ label: 'Conversar', fn: () => {
      r.talkDay = day; const gain = 4 + Math.floor(P.skill('eloquencia') / 12) + (isSpouse ? 0 : Math.floor(Math.random() * 4));
      r.aff = Math.min(100, r.aff + gain); P.train('eloquencia', 2);
      const lines = isSpouse ? ROMANCE_LINES.spouse : ROMANCE_LINES.talk;
      this.dialog(a.name, a.look, `${this.hearts(r.aff)}<br>${esc(lines[Math.floor(Math.random() * lines.length)])} <span class="good">(+${gain})</span>`, [{ label: 'Voltar', fn: () => this.personal(a, back) }]);
    } });
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
      if (P.spouseHome && P.houses.includes(P.spouseHome) && (P.children || []).length < 4 && !P.babyDue && r.aff >= 70) opts.push({ label: 'Vamos aumentar a família? 👶', fn: () => {
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
    const kids = [0, 1, 2].map(() => { const race = rng.pick(Object.keys(RACES)), sex = rng.chance(0.5) ? 'm' : 'f'; const look = npcLook(race, sex, rng, 'kid'); look.short = 3; look.blush = true; delete look.beard; return { id: 'k' + uid(), name: rng.pick(NAMES[race][sex]), race, sex, look, born: Game.day - 5 }; });
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
      <h3>Casas</h3><div class="dim">${P.houses.length ? P.houses.map(id => esc((W.settlements.find(s => s.id === id) || {}).name || id)).join(', ') : 'Nenhuma. Compre uma casa nas capitais.'}</div>`;
  }
});
