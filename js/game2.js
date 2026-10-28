'use strict';
// ===================== SISTEMAS DE VIDA: montaria, carroça, caça, empregos, construção, crônica =====================
Object.assign(Game, {
  carcasses: [],
  chron(text) {
    const P = this.player; if (!P) return;
    P.chronicle = P.chronicle || [];
    P.chronicle.push({ day: this.day, text });
    if (P.chronicle.length > 300) P.chronicle.shift();
  },
  // ---------- Cavalo e carroça ----------
  whistle() {
    const P = this.player;
    if (!P.horse) return;
    const d = dist(P.horse.x, P.horse.y, P.x, P.y);
    if (d > 700) { const a = Math.random() * Math.PI * 2; P.horse.x = P.x + Math.cos(a) * 380; P.horse.y = P.y + Math.sin(a) * 380; }
    this.horseRun = 6;
    this.floatText(P.x, P.y - 30, '♪ Fiuuu!', '#ffffff', 1);
    Sfx.play('horse');
    this.toast(`Você assobiou. Seu ${MOUNTS[P.mount].name.toLowerCase()} está vindo!`, '#ffd080');
  },
  updateMounts(dt) {
    const P = this.player;
    if (!this.level.isWorld) return;
    const h = P.horse;
    if (h && this.horseRun > 0) {
      this.horseRun -= dt;
      const d = dist(h.x, h.y, P.x, P.y);
      if (d > 30) { const a = angleTo(h.x, h.y, P.x, P.y); h.x += Math.cos(a) * 190 * dt; h.y += Math.sin(a) * 190 * dt; h.dir = Math.cos(a) >= 0 ? 'right' : 'left'; h.moving = true; }
      else { this.horseRun = 0; h.moving = false; }
    } else if (h) h.moving = false;
    const c = P.cart;
    if (c && c.hitched) {
      const anchor = P.mounted ? P : P.horse;
      if (anchor) {
        const ax = anchor.x, ay = anchor.y - 1;
        const d = dist(c.x, c.y, ax, ay);
        const want = 24;
        if (d > want) { const a = angleTo(c.x, c.y, ax, ay); c.x += Math.cos(a) * (d - want); c.y += Math.sin(a) * (d - want); c.moving = true; c.dir = Math.cos(a) >= 0 ? 'right' : 'left'; c.anim = (c.anim || 0) + (d - want) * 0.08; }
        else c.moving = false;
      }
    }
  },
  drawMountsCart(D) {
    const P = this.player;
    if (!this.level.isWorld) return;
    if (P.horse && P.mount) D.push({ y: P.horse.y, fn: (ctx, cx, cy) => {
      const H = Sprites.horse(P.mount), h = P.horse;
      const f = h.moving ? 1 + (Math.floor(this.t * 8) % 2) : 0;
      const img = H[h.dir || 'right'][f];
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(Math.round(h.x - 10 - cx), Math.round(h.y - 1 - cy), 20, 3);
      ctx.drawImage(img, Math.round(h.x - img.width / 2 - cx), Math.round(h.y - img.height + 3 - cy));
    } });
    const c = P.cart;
    if (c) D.push({ y: c.y, fn: (ctx, cx, cy) => {
      const C = Sprites.cart();
      const dir = c.dir || 'right';
      const img = C[dir][c.moving ? 1 + (Math.floor(c.anim || 0) % 2) : 0];
      const x = Math.round(c.x - img.width / 2 - cx), y = Math.round(c.y - img.height + 2 - cy);
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x + 2, y + img.height - 3, img.width - 4, 3);
      ctx.drawImage(img, x, y);
      (c.load || []).forEach((it, i) => {
        const ci = Sprites.carcass(it.eid); const sc = Math.min(0.75, 22 / ci.width);
        const lx = x + 4 + (i % 3) * 8 + (dir === 'left' ? 4 : 0), ly = y + 7 - Math.floor(i / 3) * 5 - ci.height * sc + 4;
        ctx.drawImage(ci, Math.round(lx), Math.round(ly), Math.round(ci.width * sc), Math.round(ci.height * sc));
      });
      if (c.hitched && !P.mounted && P.horse) { ctx.strokeStyle = '#5a3418'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(c.x + (dir === 'right' ? 15 : -15) - cx, c.y - 8 - cy); ctx.lineTo(P.horse.x - cx, P.horse.y - 10 - cy); ctx.stroke(); }
      if (c.hitched && P.mounted) { ctx.strokeStyle = '#5a3418'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(c.x + (dir === 'right' ? 15 : -15) - cx, c.y - 8 - cy); ctx.lineTo(P.x - cx, P.y - 10 - cy); ctx.stroke(); }
    } });
  },
  // ---------- Carcaças ----------
  carcassValue(c) { return Math.round((14 + c.lvl * 3) * CARCASS[c.eid] * 2.2); },
  spawnCarcass(m) {
    this.carcasses.push({ eid: m.eid, lvl: m.lvl, x: m.x, y: m.y, level: this.level, t: 0 });
    if (this.carcasses.length > 30) this.carcasses.shift();
  },
  skin(c) {
    const P = this.player, d = ENEMIES[c.eid];
    const rng = new RNG(Math.floor(Math.random() * 1e9));
    for (const [id] of d.drops || []) P.addItem(Items.make(id, 1 + (CARCASS[c.eid] > 1 && rng.chance(0.5) ? 1 : 0)));
    if (!d.noMeat && !(d.drops || []).some(x => x[0] === 'carne_crua')) P.addItem(Items.make('carne_crua', CARCASS[c.eid]));
    Sfx.play('harvest');
  },
  drawCarcasses(D) {
    for (const c of this.carcasses) {
      if (c.level !== this.level) continue;
      D.push({ y: c.y - 2, fn: (ctx, cx, cy) => { const img = Sprites.carcass(c.eid); ctx.drawImage(img, Math.round(c.x - img.width / 2 - cx), Math.round(c.y - img.height + 4 - cy)); } });
    }
  },
  // ---------- Empregos ----------
  jobRank(job) { let r = 0; JOB_RANKS.forEach(([n, th], i) => { if (job.shifts >= th) r = i; }); return r; },
  jobPay(id) { const J = JOBS[id], P = this.player; const r = P.job && P.job.id === id ? this.jobRank(P.job) : 0; return Math.round((J.pay + r * 9) * (1 + P.skill(J.skill) / 120) * (1 + (P.level - 1) * 0.04)); },
  workShift(b) {
    const P = this.player, job = P.job, J = JOBS[job.id];
    const h = this.time / 60;
    if (h < 6 || h >= 22) { this.toast('O expediente é das 6h às 22h. Volte de manhã.', '#ffb080'); return false; }
    if (job.lastDay !== this.day) { job.lastDay = this.day; job.today = 0; }
    if (job.today >= 2) { this.toast('Você já trabalhou dois turnos hoje. Descanse!', '#ffb080'); return false; }
    job.today++;
    const pay = this.jobPay(job.id);
    let bonus = 0, extra = '';
    if (J.combat && Math.random() < 0.35) { bonus = Math.round(pay * 0.8); P.hp = Math.max(1, P.hp - P.stat.maxHp * 0.15); extra = 'Você enfrentou um ladrão durante a patrulha! '; P.train('combate', 4); }
    this.time += 4 * 60;
    while (this.time >= 1440) { this.time -= 1440; this.day++; this.mods.day = this.day; this.dayTick(); }
    P.gold += pay + bonus;
    P.train(J.skill, 6);
    const rng = new RNG(Math.floor(Math.random() * 1e9));
    let got = '';
    if (J.yield.length && rng.chance(0.6)) { const id = rng.pick(J.yield); const n = id === 'lenha' || id === 'pedra' || id === 'trigo' ? rng.int(2, 5) : 1; P.addItem(Items.make(id, n), true); got = ` e ganhou ${ITEMS[id].name}${n > 1 ? ' x' + n : ''}`; }
    const r0 = this.jobRank(job);
    job.shifts++;
    const r1 = this.jobRank(job);
    UI.fade(); Sfx.play('coin');
    this.toast(`${extra}Turno concluído: +${pay + bonus} ouro${got}.`, '#ffd040');
    if (r1 > r0) { this.centerMsg('PROMOÇÃO!', `${J.name}: ${JOB_RANKS[r1][0]}`); Sfx.play('levelup'); this.chron(`Fui promovido(a) a ${JOB_RANKS[r1][0]} como ${J.name} em ${b.settlement.name}.`); }
    return true;
  },
  // ---------- Construção ----------
  canBuildHere(tier) {
    const P = this.player, W = this.world, T_ = HOME_TIERS[tier];
    if (!this.level.isWorld) return 'Saia para o mundo aberto para construir.';
    const ptx = Math.floor(P.x / 16), pty = Math.floor(P.y / 16);
    const x0 = ptx - Math.floor(T_.w / 2), y0 = pty - T_.h - 1;
    for (let y = y0 - 1; y <= y0 + T_.h + 1; y++) for (let x = x0 - 1; x <= x0 + T_.w; x++) {
      const t = W.tileAt(x, y);
      if (TSOLID[t] || TWATER[t] || t === T.LAVA) return 'O terreno precisa ser plano e seco (sem água, rocha ou lava).';
      const o = W.objAt(x, y);
      if (o && OSOLID[o]) return TREE_OBJS.has(o) ? 'Há árvores no caminho. Corte-as com um Machado de Lenhador para limpar o terreno.' : 'Há algo no caminho. Limpe o terreno primeiro.';
    }
    for (const s of W.settlements) if (Math.abs(s.mid.x - ptx) < s.w / 2 + 10 && Math.abs(s.mid.y - pty) < s.h / 2 + 10) return 'Não é permitido construir dentro de cidades. Escolha um terreno afastado.';
    for (const d of W.dungeons) if (Math.abs(d.x - ptx) < 12 && Math.abs(d.y - pty) < 12) return 'Muito perto de uma masmorra!';
    for (const h of W.homes) if (Math.abs(h.x - x0) < 14 && Math.abs(h.y - y0) < 12) return 'Muito perto de outra construção sua.';
    if (W.homes.length >= 4) return 'Você já tem construções demais (máximo 4).';
    return { x: x0, y: y0 };
  },
  hasMats(mats, mul = 1) { const P = this.player; return Object.entries(mats).every(([id, n]) => P.count(id) >= Math.ceil(n * mul)); },
  takeMats(mats, mul = 1) { const P = this.player; for (const [id, n] of Object.entries(mats)) P.removeItem(id, Math.ceil(n * mul)); },
  startHome(tier, mode, master) {
    const P = this.player, T_ = HOME_TIERS[tier];
    const pos = this.canBuildHere(tier);
    if (typeof pos === 'string') { this.toast(pos, '#ffa0a0'); return false; }
    let cost = 0;
    if (mode === 'hire') cost = Math.round(T_.hire * (master ? 1.5 : 1));
    else if (mode === 'labor') { if (!this.hasMats(T_.mats)) { this.toast('Materiais insuficientes.', '#ffa0a0'); return false; } cost = T_.labor; }
    else if (!this.hasMats(T_.mats)) { this.toast('Materiais insuficientes.', '#ffa0a0'); return false; }
    if (P.gold < cost) { this.toast('Ouro insuficiente.', '#ffa0a0'); return false; }
    P.gold -= cost;
    if (mode !== 'hire') this.takeMats(T_.mats);
    const reg = this.world.regions[this.world.regAt(pos.x, pos.y)];
    const h = { id: 'home' + Date.now().toString(36), x: pos.x, y: pos.y, tier, mode, quality: mode === 'self' ? 0 : (master ? 3 : 2), done: false, progress: 0, skillSum: 0, sessions: 0, name: `${T_.name} de ${P.name}`, finishDay: mode === 'self' ? null : this.day + T_.days, region: reg.id };
    this.mods.homes.push(h);
    this.world.addHome(h);
    P.y += 8; this.findFree(P);
    Sfx.play('forge');
    this.chron(`Comecei a construir ${mode === 'self' ? 'com minhas próprias mãos ' : ''}minha ${T_.name.toLowerCase()} em ${reg.short}.`);
    this.centerMsg('OBRA INICIADA!', mode === 'self' ? 'Toque na obra para trabalhar nela.' : `Os construtores terminam em ${T_.days} dias.`);
    return h;
  },
  workOnHome(h) {
    const P = this.player, T_ = HOME_TIERS[h.tier];
    const add = (1 / T_.work) * (1 + P.skill('construcao') / 60);
    h.progress = Math.min(1, h.progress + add);
    h.skillSum += P.skill('construcao'); h.sessions++;
    P.train('construcao', 9);
    this.time += 2 * 60;
    while (this.time >= 1440) { this.time -= 1440; this.day++; this.mods.day = this.day; this.dayTick(); }
    P.st = Math.max(0, P.st - 30);
    Sfx.play('forge'); UI.fade();
    this.burst(h.x * 16 + T_.w * 8, (h.y + T_.h) * 16, '#c8a070', 16, 60);
    if (h.progress >= 1) {
      const avg = h.skillSum / Math.max(1, h.sessions);
      h.quality = clamp(Math.floor(avg / 20), 0, 4);
      this.finishHome(h);
    } else { this.world.addHome(h); this.toast(`Obra: ${Math.round(h.progress * 100)}% concluída.`, '#c8e0a0'); }
  },
  finishHome(h) {
    const P = this.player;
    h.done = true; h.progress = 1;
    this.world.addHome(h);
    if (!P.houses.includes(h.id)) P.houses.push(h.id);
    P.storage[h.id] = P.storage[h.id] || [];
    const q = HOME_QUALITY[h.quality];
    this.centerMsg('CASA PRONTA!', `${h.name} • Qualidade: ${q}`);
    Sfx.play('levelup');
    this.chron(`Terminei de construir minha ${HOME_TIERS[h.tier].name.toLowerCase()}. Ficou ${q.toLowerCase()}.`);
    if (P.spouse && !P.spouseHome) P.spouseHome = h.id;
  },
  checkHomes() {
    for (const h of this.mods.homes) if (!h.done && h.finishDay && this.day >= h.finishDay) this.finishHome(h);
  },
  reformHome(h, hire) {
    const P = this.player, T_ = HOME_TIERS[h.tier];
    if (h.quality >= 4) { this.toast('Sua casa já é uma obra-prima!', '#ffd040'); return; }
    if (hire) {
      const cost = Math.round(T_.hire * 0.35);
      if (h.quality >= 3) { this.toast('Só um mestre construtor (você!) pode tornar a casa uma obra-prima.', '#ffa0a0'); return; }
      if (P.gold < cost) { this.toast('Ouro insuficiente.', '#ffa0a0'); return; }
      P.gold -= cost; h.quality = Math.min(3, h.quality + 1);
    } else {
      if (!this.hasMats(T_.mats, 0.3)) { this.toast('Faltam materiais (30% dos materiais da obra).', '#ffa0a0'); return; }
      const target = clamp(Math.floor(P.skill('construcao') / 20), 0, 4);
      if (target <= h.quality) { this.toast(`Sua habilidade de Construção (${P.skill('construcao')}) ainda não é suficiente para melhorar esta casa.`, '#ffa0a0'); return; }
      this.takeMats(T_.mats, 0.3);
      h.quality = target;
      P.train('construcao', 20);
      this.time += 6 * 60; while (this.time >= 1440) { this.time -= 1440; this.day++; this.mods.day = this.day; this.dayTick(); }
    }
    this.world.addHome(h);
    UI.fade(); Sfx.play('forge');
    this.centerMsg('REFORMA CONCLUÍDA!', `Qualidade: ${HOME_QUALITY[h.quality]}`);
    this.chron(`Reformei minha casa. Agora ela é ${HOME_QUALITY[h.quality].toLowerCase()}.`);
  },
  // ---------- Cena inicial ----------
  startIntro(vill) {
    const P = this.player;
    P.sleeping = true;
    const rng = new RNG(this.world.seed + 77);
    const race = CULTURES[vill.region.culture].race, sex = rng.chance(0.5) ? 'm' : 'f';
    const npc = new NPC({ role: 'mayor', x: vill.mid.x, y: vill.mid.y + 1 }, vill, rng);
    npc.race = race; npc.sex = sex;
    npc.name = rng.pick(NAMES[race][sex]) + ' ' + rng.pick(NAMES[race].s);
    npc.look = npcLook(race, sex, rng, 'quest'); npc.look.body = '#6a3a7a'; npc.look.cape = '#3a2a5a';
    npc.S = Sprites.actor(npc.look); npc.h = npc.S.h;
    const a = Math.random() * Math.PI * 2;
    npc.x = P.x + Math.cos(a) * 110; npc.y = P.y + Math.sin(a) * 80; this.findFree(npc);
    this.actors.push(npc);
    this.intro = { npc, vill, t: 1.5 };
  },
  updateIntro(dt) {
    const I = this.intro, P = this.player, n = I.npc;
    I.t -= dt;
    if (I.t > 0 || I.talking) return;
    const d = dist(n.x, n.y, P.x, P.y);
    if (d > 22) { const a = angleTo(n.x, n.y, P.x, P.y); moveActor(n, Math.cos(a) * 34 * dt, Math.sin(a) * 34 * dt); n.moving = true; n.anim += dt; n.setDir(a); if (n.blocked) { n.x += Math.cos(a) * 34 * dt; n.y += Math.sin(a) * 34 * dt; } return; }
    n.moving = false; n.setDir(angleTo(n.x, n.y, P.x, P.y));
    I.talking = true;
    const v = I.vill.name, title = n.sex === 'f' ? 'a prefeita' : 'o prefeito';
    const lines = [
      `Ei! Ei, acorde! Você está bem?`,
      `*Você abre os olhos devagar. Tudo gira. Sua cabeça dói e você não se lembra de quase nada.*`,
      `Calma, calma... Eu sou ${n.name}, ${title} de ${v}. Os moradores encontraram você caído aqui hoje cedo, sem nada além da roupa do corpo e alguns pertences.`,
      `Não se lembra de onde veio? Hm... Pela sua bolsa você parece um viajante. Talvez tenha sido assaltado na estrada.`,
      `Bem, aqui em ${v} todo mundo merece um recomeço. Tome, algumas moedas e um pão quentinho.`,
      `Se quiser trabalho honesto, a taverna, o armazém e a ferraria sempre precisam de ajuda. Se tiver coragem, a Guilda dos Heróis paga bem por aventureiros. E se quiser um lar, terreno é o que não falta para construir.`,
      `Ah, e se um dia quiser aprender magia... dizem que na Academia Real de Astralis, entre Valdoria e Sylvaris, até príncipes e princesas de outros reinos vão estudar. Mas não é barato!`,
      `O que você vai fazer da sua vida agora... é com você. Seja bem-vindo(a) a ${v}!`
    ];
    let i = 0;
    const next = () => {
      if (i < lines.length) {
        const txt = lines[i]; i++;
        if (i === 2) { P.sleeping = false; Sfx.play('roll'); }
        UI.dialog(i === 2 ? P.name : n.name, i === 2 ? P.look : n.look, esc(txt), [{ label: i < lines.length ? 'Continuar ▶' : 'Obrigado!', fn: next }]);
      } else {
        UI.close();
        P.sleeping = false;
        P.gold += 40; P.addItem(Items.make('pao', 2));
        this.intro = null;
        n.role = 'citizen'; n.home = { x: I.vill.mid.x * 16 + 8, y: I.vill.mid.y * 16 + 8 };
        this.chron(`Acordei em ${v}, sem memória. ${n.name}, ${title}, me ajudou a recomeçar.`);
        this.centerMsg(v, 'Sua história começa agora. Viva como quiser!');
        this.saveGame(0, true);
        const tips = ['Dica: arraste o lado esquerdo da tela para andar.', 'Dica: entre nas casas e lojas tocando no botão de AÇÃO perto da porta.', 'Dica: peça emprego na taverna, armazém ou ferraria para ganhar dinheiro.', 'Dica: o diário (Menu > Missões) guarda a sua história.', 'Dica: compre um Machado de Lenhador no armazém para cortar árvores e construir sua casa.', 'Dica: você nasceu sem magia. A Academia Real de Astralis (marcada em azul no mapa) pode despertá-la.'];
        tips.forEach((t, k) => this.later(4 + k * 9, () => this.toast(t, '#a0e0ff')));
      }
    };
    next();
  }
});

// ===================== PORTOS E NAVIOS =====================
Object.assign(Game, {
  shipImg(col, flip) {
    this._ships = this._ships || {};
    const key = col + flip;
    if (this._ships[key]) return this._ships[key];
    const c = Sprites.cv(72, 64), p = Sprites.P(c.getContext('2d'));
    // casco
    for (let y = 0; y < 14; y++) { const inset = Math.round(y * y * 0.06) + (y > 10 ? (y - 10) * 2 : 0); p(4 + inset, 44 + y - 6, y < 2 ? '#a07040' : y % 4 === 0 ? '#5a3418' : '#7a4a24', 64 - inset * 2 - (y < 6 ? 0 : 0), 1); }
    p(60, 36, '#7a4a24', 8, 4); p(66, 34, '#6a4020', 4, 3); // proa
    p(2, 34, '#6a4020', 10, 5); p(2, 32, '#8a5a30', 10, 2);  // popa
    for (let x = 14; x < 58; x += 8) { S_dot(p, x, 42); }
    // mastros e velas
    p(26, 4, '#5a3a1e', 2, 36); p(46, 10, '#5a3a1e', 2, 30);
    for (const [mx, top, w, h] of [[27, 6, 22, 20], [47, 12, 16, 16]]) {
      for (let y = 0; y < h; y++) { const bulge = Math.round(Math.sin(y / h * Math.PI) * 3); p(mx - w / 2 - bulge, top + y, y % 5 === 0 ? '#d8d0c0' : '#f0ead8', w + bulge * 2, 1); }
      p(mx - w / 2 + 2, top + h / 2 - 2, col, w - 4, 4);
      p(mx - w / 2 - 1, top - 1, '#5a3a1e', w + 2, 1); p(mx - w / 2 - 1, top + h, '#5a3a1e', w + 2, 1);
    }
    p(28, 0, col, 8, 4); p(28, 0, shade(col, 0.3), 8, 1);
    // cordas
    for (let i = 0; i < 12; i++) { p(8 + i * 1.5, 34 - i * 2.3, '#3a2a1a'); p(48 + i * 1.6, 12 + i * 2, '#3a2a1a'); }
    function S_dot(pp, x, y) { pp(x, y, '#2a1a10', 3, 3); pp(x + 1, y + 1, '#e8c070', 1, 1); }
    Sprites.outline && Sprites.outline(c);
    let out = c;
    if (flip) out = Sprites.flip(c);
    this._ships[key] = out;
    return out;
  },
  drawShips(D, camX, camY) {
    for (const s of this.world.ports || []) {
      if (this.level.isShip && (s === this.level.from || s === this.level.to)) continue;
      const sh = s.port.ship;
      if (sh.x < camX - 80 || sh.x > camX + this.vw + 80 || sh.y < camY - 80 || sh.y > camY + this.vh + 80) continue;
      const own = War.ownerOf(s), col = own && War.K[own] ? War.K[own].color : s.region.color;
      const img = Naval.sprite(own ? Naval.shipTypeOf(own) : 'galeao', col, Math.floor(this.t * 2) % 2);
      const flip = s.port.axis !== 'y' && s.port.dir < 0, x = sh.x + (s.port.axis === 'y' ? 0 : s.port.dir * 6), y = sh.y + 12;
      D.push({ y: sh.y + 10, fn: (ctx) => Naval.drawShip(ctx, img, x - camX, y - camY, { flip }) });
    }
  },
  captainTalk(a) {
    const P = this.player, here = a.s, W = this.world;
    const others = (W.ports || []).filter(p => p.port.cont !== here.port.cont).sort((x, y) => x.port.cont - y.port.cont);
    const fee = 120;
    const look = a.look;
    const opts = others.map(o => ({ label: `⛵ Viajar para ${o.name} (${CONTINENTS[o.port.cont]}) — ${fee} ouro`, cls: 'gold', fn: () => { if (P.gold < fee) return this.toast('Ouro insuficiente.', '#ff8080'); P.gold -= fee; this.voyage(here, o, a); } }));
    const lands = ['<b>Eldoria</b>: a terra dos nove reinos de humanos, elfos, anões, orcs, pequeninos, nórdicos, felinos e draconatos.', '<b>Kaeloria</b>, a leste do Mar das Brumas: Talassa dos tritões, Azhkar dos tieflings e Shirokai das kitsunes.', '<b>Valtheria</b>, o Grande Continente ao sul, maior que Eldoria: os reinos humanos da era industrial (o Império de Aurélion e a República de Ferrânia), com fábricas a vapor e mosquetes arcanos, os meio-gigantes de Gromhald, os elfos da lua de Lunethar, os gnomos de Rodafina, os anões de Kharzul, as hordas orcs de Orkhai, os draconatos de Serpentis, os felinos de Kumari e o terrível Abismo de Umbraval.'];
    opts.push({ label: 'Como são as outras terras?', fn: () => UI.dialog(a.name, look, lands.filter((_, i) => i !== here.port.cont).join('<br><br>'), [{ label: 'Voltar', fn: () => this.captainTalk(a) }]) });
    opts.push({ label: 'Tchau' });
    UI.dialog(a.name, look, `Ahoy! Sou o capitão do <b>${esc(here.name)}</b>. Meu navio leva você para além-mar — você pode andar pelo convés e pelas cabines durante toda a travessia.${P.horse ? '<br><span class="dim">Seu cavalo pode ir no porão.</span>' : ''}`, opts);
  },
  voyage(from, to, cap) {
    const P = this.player;
    if (Ship.board(from, to, cap)) return;
    UI.close(); UI.fade();
    Academy.scene([
      { n: cap.name, look: cap.look, t: 'Levantar âncora! Içar as velas! Rumo ao Mar das Brumas!', fx: () => Sfx.play('quest') },
      { n: to.port.cont === 2 || from.port.cont === 2 ? 'Oceano do Sul' : 'Mar das Brumas', t: '<i>O navio corta as ondas. Gaivotas acompanham o casco e a névoa cobre o horizonte...</i>' },
      { n: to.port.cont === 2 || from.port.cont === 2 ? 'Oceano do Sul' : 'Mar das Brumas', t: '<i>À noite, o céu se enche de estrelas. Os marinheiros cantam velhas canções sobre serpentes marinhas.</i>' },
      ...(War.st().navals && War.st().navals.length ? [{ n: cap.name, look: cap.look, t: `Ao longe, canhões trovejam no horizonte: ${esc(War.st().navals[0].name.replace('Batalha naval', 'uma batalha naval'))}! Mantenham distância!` }] : []),
      { n: cap.name, look: cap.look, t: `Terra à vista! Bem-vindo(a) a ${esc(to.name)}.` }
    ], () => {
      const d = to.port.dock, land = to.port.axis === 'y' ? { x: to.mid.x * 16 + 8, y: (to.mid.y - to.port.dir * 2) * 16 + 8 } : { x: to.mid.x * 16 + 8 - to.port.dir * 32, y: to.mid.y * 16 + 8 };
      P.mounted = false;
      P.x = land.x; P.y = land.y; this.findFree(P);
      if (P.horse) { P.horse.x = P.x - 20; P.horse.y = P.y + 8; }
      if (P.cart && P.cart.hitched) { P.cart.x = P.x - 50; P.cart.y = P.y + 10; }
      for (const m of this.actors) if (m.follow || m.isFollower || m.isPet) { m.x = P.x + 12; m.y = P.y + 6; this.findFree(m); }
      this.camX = P.x - this.vw / 2; this.camY = P.y - this.vh / 2;
      this.time += 12 * 60; while (this.time >= 1440) { this.time -= 1440; this.day++; this.mods.day = this.day; this.dayTick(); }
      for (const s of this.world.settlements) if (s.active) { s.active = false; const set = new Set(s.npcs || []); this.actors = this.actors.filter(x => !set.has(x)); s.npcs = null; }
      this.mods.discovered.add(to.id);
      UI.fade();
      const first = !P.visitedCont || !P.visitedCont.includes(to.port.cont);
      if (first) { P.visitedCont = (P.visitedCont || [0]).concat(to.port.cont); this.centerMsg(CONTINENTS[to.port.cont].toUpperCase(), 'Você atravessou o mar!'); this.chron(`Atravessei o mar e cheguei a ${CONTINENTS[to.port.cont]}, desembarcando em ${to.name}.`); P.addXP(150); }
      else this.toast(`Você desembarcou em ${to.name}.`, '#a0e0ff');
      void d;
    });
  }
});
