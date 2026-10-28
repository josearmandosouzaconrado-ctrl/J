'use strict';
// ===================== ACADEMIA REAL DE ASTRALIS =====================
// Alunos fixos (príncipes, princesas, nobres e bolsistas), matrícula, aulas de magia e
// esgrima, despertar da magia, amigos que te procuram pela escola e cenas (cutscenes).
const Academy = {
  _roster: null, key: '', refT: 0, visitT: 60, visit: null, spar: null, cine: false,

  // ---------- Alunos ----------
  students() {
    const W = Game.world;
    if (this._roster && this._roster.seed === W.seed) return this._roster.list;
    const rng = new RNG(W.seed * 13 + 5), list = [];
    const uni = '#2a3a8a';
    const add = (o) => {
      const look = npcLook(o.race, o.sex, rng, 'student');
      Object.assign(look, { body: uni, legs: '#1a1a2a', robe: o.sex === 'f' && rng.chance(0.6) });
      delete look.hood;
      if (o.rank === 'royal') { look.crown = true; look.cape = o.color; }
      else if (o.rank === 'noble') look.cape = rng.pick(['#7a1a2a', '#1a5a3a', '#5a1a6a', '#6a5a1a']);
      o.look = look; o.i = list.length; o.id = 'stu:' + o.i;
      o.pers = rng.pick(Object.keys(ACADEMY.personalities));
      o.aff = rng.pick(Object.keys(ACADEMY.affinities));
      o.dorm = o.rank === 'common' ? 'dorm' : 'dorm_real';
      list.push(o);
    };
    for (const R of REGIONS) {
      if (!R.ruler) continue;
      const race = R.ruler.race || CULTURES[R.culture].race, sex = rng.chance(0.5) ? 'm' : 'f';
      const first = rng.pick(NAMES[race][sex]);
      const t = R.id === 'colinas' ? (sex === 'f' ? 'Herdeira' : 'Herdeiro') : R.id === 'gorthak' ? (sex === 'f' ? 'Filha do Chefe' : 'Filho do Chefe') : (sex === 'f' ? 'Princesa' : 'Príncipe');
      add({ rank: 'royal', race, sex, name: `${t} ${first}`, title: `${t} de ${R.name}`, from: R.name, color: R.color });
    }
    const races = playableRaces();
    for (let i = 0; i < 8; i++) {
      const race = rng.pick(races), sex = rng.chance(0.5) ? 'm' : 'f';
      const house = rng.pick(NAMES[race].s), first = rng.pick(NAMES[race][sex]);
      add({ rank: 'noble', race, sex, name: `${sex === 'f' ? 'Lady' : 'Lorde'} ${first} ${house}`, title: `Herdeiro(a) da Casa ${house}`, from: 'Casa ' + house });
    }
    for (let i = 0; i < 6; i++) {
      const race = rng.pick(races), sex = rng.chance(0.5) ? 'm' : 'f';
      add({ rank: 'common', race, sex, name: `${rng.pick(NAMES[race][sex])} ${rng.pick(NAMES[race].s)}`, title: 'Bolsista', from: 'Povo comum' });
    }
    this._roster = { seed: W.seed, list };
    return list;
  },
  byId(id) { return this.students().find(s => s.id === id); },
  // onde cada aluno está agora (agenda diária)
  where(st) {
    const P = Game.player, h = Game.time / 60;
    if (P.follower && P.follower.student === st.id) return 'follow';
    if (P.spouse === st.id && P.spouseHome) return 'home';
    if (this.visit && this.visit.st === st) return 'visit';
    if (h >= 22 || h < 6) return st.dorm;
    const blk = h < 8 ? 0 : h < 12 ? 1 : h < 14 ? 2 : h < 18 ? 3 : 4;
    const r = hash2(st.i * 7 + blk, Game.day, 991);
    if (blk === 0) return r < 0.5 ? 'refectory' : 'campus';
    if (blk === 1) return r < 0.7 ? 'grandhall' : r < 0.85 ? 'library' : 'campus';
    if (blk === 2) return r < 0.7 ? 'refectory' : 'campus';
    if (blk === 3) return r < 0.5 ? 'fencing' : r < 0.7 ? 'library' : 'campus';
    return r < 0.45 ? 'campus' : r < 0.6 ? 'library' : r < 0.8 ? 'refectory' : st.dorm;
  },
  // onde o jogador está dentro da Academia (null = fora)
  place() {
    const W = Game.world, A = W && W.academy, L = Game.level, P = Game.player;
    if (!A || !L) return null;
    if (L.isWorld) { const tx = P.x / 16, ty = P.y / 16; return (tx >= A.x0 - 3 && ty >= A.y0 - 3 && tx < A.x0 + A.w + 3 && ty < A.y0 + A.h + 3) ? 'campus' : null; }
    if (L.isInterior && L.s === A) return L.b.kind;
    return null;
  },
  isFriend(st) { const r = Game.player.rel[st.id]; return r && r.aff >= 25; },
  spawnPos(place, near) {
    const L = Game.level, A = Game.world.academy;
    for (let k = 0; k < 40; k++) {
      let tx, ty;
      if (near) { const a = Math.random() * Math.PI * 2, r = near.r + Math.random() * 30; tx = Math.floor((near.x + Math.cos(a) * r) / 16); ty = Math.floor((near.y + Math.sin(a) * r) / 16); }
      else if (place === 'campus') { tx = A.x0 + 4 + Math.floor(Math.random() * (A.w - 8)); ty = A.y0 + 12 + Math.floor(Math.random() * (A.h - 16)); }
      else {
        const pool = (L.seatSpots && L.seatSpots.length ? L.seatSpots : null) || (L.bedSpots && L.bedSpots.length ? L.bedSpots : null);
        if (pool && k < 20) { const s = pool[Math.floor(Math.random() * pool.length)]; tx = s.x; ty = s.y; }
        else { tx = 1 + Math.floor(Math.random() * (L.w - 2)); ty = 3 + Math.floor(Math.random() * (L.h - 5)); }
      }
      if (!L.solidAt(tx, ty)) return { x: tx * 16 + 8, y: ty * 16 + 12 };
    }
    return null;
  },
  makeNPC(st, x, y) {
    const A = Game.world.academy;
    const a = new NPC({ role: 'student', x: 0, y: 0 }, A, new RNG(st.i + 1));
    a.x = x; a.y = y;
    a.name = st.name; a.race = st.race; a.sex = st.sex; a.look = st.look; a.S = Sprites.actor(st.look); a.h = a.S.h;
    a.rid = st.id; a.student = st; a.indoor = !Game.level.isWorld;
    Game.findFree(a); a.home = { x: a.x, y: a.y };
    return a;
  },
  refresh(place) {
    const want = place ? this.students().filter(st => this.where(st) === place) : [];
    const keepIds = new Set(want.map(s => s.id));
    Game.actors = Game.actors.filter(a => !a.student || a.visiting || keepIds.has(a.student.id));
    const have = new Set(Game.actors.filter(a => a.student).map(a => a.student.id));
    for (const st of want) {
      if (have.has(st.id)) continue;
      const p = this.spawnPos(place);
      if (p) Game.actors.push(this.makeNPC(st, p.x, p.y));
    }
  },

  // ---------- Loop ----------
  update(dt) {
    const P = Game.player;
    if (!Game.world || !Game.world.academy) return;
    const place = this.place();
    this.refT -= dt;
    if (this.refT <= 0) {
      this.refT = 1;
      const h = Game.time / 60, blk = (h >= 22 || h < 6) ? 9 : h < 8 ? 0 : h < 12 ? 1 : h < 14 ? 2 : h < 18 ? 3 : 4;
      const key = `${place}|${blk}|${Game.day}|${Game.level.isWorld ? 'w' : Game.level.name}`;
      if (key !== this.key) { this.key = key; this.refresh(place); }
    }
    this.updateVisit(dt, place);
    this.updateSpar(dt);
    this.updateHunt();
    if (this.cine) Input.queue.clear();
    void P;
  },

  // ---------- Cenas ----------
  cineOn(v) {
    this.cine = v;
    const el = document.getElementById('cine');
    if (el) el.classList.toggle('on', v);
  },
  // Sequência de falas: [{ n, look, t, fx }] — mostra barras de cinema e bloqueia o jogo
  scene(steps, done) {
    this.cineOn(true);
    let i = 0;
    const next = () => {
      if (i >= steps.length) { UI.close(); this.cineOn(false); if (done) done(); return; }
      const s = steps[i++];
      if (s.fx) s.fx();
      if (s.wait) { UI.close(); this.cineOn(true); Game.later(s.wait, next); return; }
      UI.dialog(s.n, s.look || null, s.t, [{ label: i < steps.length ? 'Continuar ▶' : (s.end || 'Fim'), fn: next }]);
    };
    next();
  },
  look(o) {
    if (!o.look) {
      const L = npcLook(o.race, o.sex, new RNG(hashStr(o.name)), 'shop');
      L.robe = true; L.body = o === ACADEMY.fencingTeacher ? '#8a2a2a' : o === ACADEMY.head ? '#e0dcf0' : '#3a2a6a';
      L.cape = o === ACADEMY.head ? '#2a3a8a' : undefined;
      if (o === ACADEMY.fencingTeacher) L.robe = false;
      o.look = L;
    }
    return o.look;
  },
  passTime(min) {
    Game.time += min;
    while (Game.time >= 1440) { Game.time -= 1440; Game.day++; Game.mods.day = Game.day; Game.dayTick(); }
  },
  state() {
    const P = Game.player;
    if (!P.academy) P.academy = { enrolled: false, affinity: null, lessons: { magia: 0, esgrima: 0 }, dorm: null, graduated: false, magicDay: -1, fenceDay: -1, examDay: -1, outings: 0, hunts: 0, hunt: null };
    return P.academy;
  },

  // ---------- Grande Salão (matrícula, aulas, graduação) ----------
  hall(b) {
    const P = Game.player, A = this.state(), H = ACADEMY.head, look = this.look(H);
    const opts = [];
    let text;
    if (!A.enrolled) {
      text = `Bem-vindo(a) à <b>${ACADEMY.name}</b>, a única e mais renomada academia de magia e esgrima de todos os reinos. Reis e rainhas de toda Eldoria enviam para cá seus príncipes e princesas, e as grandes casas nobres, seus herdeiros.<br><br>Você deseja estudar aqui?`;
      opts.push({ label: `Matricular-me (${ACADEMY.fee} ouro)`, cls: 'gold', fn: () => { if (P.gold < ACADEMY.fee) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= ACADEMY.fee; Sfx.play('coin'); this.enroll('dorm', false); } });
      if (A.examDay !== Game.day) opts.push({ label: 'Fazer o exame de admissão (bolsa)', fn: () => this.exam() });
      opts.push({ label: 'Como funciona a Academia?', fn: () => UI.dialog(H.name, look, 'Ensinamos <b>magia</b> no Grande Salão (das 8h às 12h) com o Professor Crowe e <b>esgrima</b> no Salão de Esgrima (das 14h às 18h) com a Mestra Ysolde. Cada aluno ganha uma cama no dormitório.<br><br>Quem nasce sem magia, como você, desperta seu dom aqui. Ao completar 15 aulas de magia e 12 de esgrima, você se gradua.', [{ label: 'Voltar', fn: () => this.hall(b) }]) });
    } else {
      const L = A.lessons, h = Game.time / 60;
      text = `${A.graduated ? '<span class="gold">Graduado(a) de Astralis</span><br>' : ''}Afinidade: <b style="color:${ACADEMY.affinities[A.affinity].c}">${ACADEMY.affinities[A.affinity].name}</b> • Dormitório: ${BUILDINGS[A.dorm].name}<br>Aulas de magia: <b>${L.magia}/${ACADEMY.graduateMagic}</b> • Aulas de esgrima: <b>${L.esgrima}/${ACADEMY.graduateFencing}</b><br><span class="dim">Magia: 8h–12h no Grande Salão • Esgrima: 14h–18h no Salão de Esgrima</span>`;
      if (A.magicDay !== Game.day && h >= 8 && h < 12) opts.push({ label: '📖 Assistir à aula de magia', cls: 'gold', fn: () => this.magicClass() });
      else opts.push({ label: A.magicDay === Game.day ? 'Aula de magia (já assistiu hoje)' : 'Aula de magia (só das 8h às 12h)', fn: () => Game.toast('Volte no horário da aula de magia (8h–12h).', '#c0a0ff') });
      if (!A.graduated && L.magia >= ACADEMY.graduateMagic && L.esgrima >= ACADEMY.graduateFencing) opts.push({ label: '🎓 Pedir a graduação', cls: 'gold', fn: () => this.graduate() });
      opts.push({ label: 'Conversa pessoal 💬', fn: () => UI.personal(this.headNPC(b), () => this.hall(b)) });
    }
    opts.push({ label: 'Sair' });
    UI.dialog(H.name, look, text, opts);
  },
  headNPC(b) {
    const H = ACADEMY.head;
    return { name: H.name, race: H.race, sex: H.sex, look: this.look(H), rid: Game.ownerId(b), role: 'owner' };
  },
  exam() {
    const A = this.state(), H = ACADEMY.head, look = this.look(H);
    A.examDay = Game.day;
    const qs = new RNG(Date.now() & 0xffffff).shuffle(ACADEMY.quiz.slice()).slice(0, 3);
    let ok = 0, i = 0;
    const ask = () => {
      if (i >= qs.length) {
        if (ok >= 2) UI.dialog(H.name, look, `Você acertou <b>${ok} de 3</b>. ${ok === 3 ? 'Impressionante! Você ganhou a <b class="gold">Bolsa de Honra</b> e dormirá no Dormitório Real, junto aos príncipes e princesas.' : 'Muito bem! Você ganhou uma bolsa de estudos.'}`, [{ label: 'Continuar ▶', cls: 'gold', fn: () => this.enroll(ok === 3 ? 'dorm_real' : 'dorm', true) }]);
        else UI.dialog(H.name, look, `Você acertou ${ok} de 3. Estude mais sobre o mundo e volte amanhã para tentar de novo.`, [{ label: 'Entendi' }]);
        return;
      }
      const q = qs[i++];
      UI.dialog(H.name, look, `<b>Pergunta ${i} de 3</b><br>${esc(q.q)}`, q.a.map((a, k) => ({ label: esc(a), fn: () => { if (k === q.ok) { ok++; Sfx.play('pickup'); } else Sfx.play('fail'); ask(); } })));
    };
    ask();
  },
  enroll(dorm, scholar) {
    const P = Game.player, A = this.state(), H = ACADEMY.head, look = this.look(H);
    const keys = Object.keys(ACADEMY.affinities);
    const aff = keys[Math.floor(Math.random() * keys.length)], AF = ACADEMY.affinities[aff];
    const mates = this.students().filter(s => s.dorm === dorm);
    const mate = mates[Math.floor(Math.random() * mates.length)];
    UI.close(); UI.fade();
    this.scene([
      { n: H.name, look, t: `<i>Os sinos de Astralis tocam. Alunos de todos os reinos lotam o Grande Salão.</i><br><br>Atenção, alunos! Hoje recebemos ${esc(P.name)}${scholar ? ', aprovado(a) no exame de admissão' : ''}.` },
      { n: H.name, look, t: 'Aproxime-se e coloque a mão sobre o <b>Cristal das Afinidades</b>. Ele revela a natureza da magia adormecida em cada um de nós.' },
      { n: ACADEMY.name, t: `<i>O cristal brilha com uma luz <b style="color:${AF.c}">${AF.name.toLowerCase()}</b>... Um murmúrio corre entre os nobres.</i>`, fx: () => { Sfx.play('learn'); Game.burst(P.x, P.y - 10, AF.c, 30, 90); Game.centerMsg('AFINIDADE: ' + AF.name.toUpperCase(), 'Sua magia ainda está adormecida'); } },
      { n: H.name, look, t: `Afinidade com <b style="color:${AF.c}">${AF.name}</b>! Mas não se iluda: você nasceu sem magia desperta. Nas aulas do Professor Crowe você aprenderá a despertá-la.` },
      { n: H.name, look, t: `Você ficará no <b>${BUILDINGS[dorm].name}</b>. Tome seu uniforme e sua espada de treino. Seja bem-vindo(a) a Astralis!`, fx: () => { for (const id of ['uniforme_academia', 'espada_treino']) { const it = Items.make(id); P.addItem(it, true); P.equipItem(P.findItem(it.u), true); } Sfx.play('quest'); Game.toast('Você vestiu o uniforme de Astralis e pegou a espada de treino.', '#a0e0ff'); } },
      mate ? { n: mate.name, look: mate.look, t: `${mate.rank === 'royal' ? `Sou ${esc(mate.title)}. ` : ''}Então você é ${P.sex === 'f' ? 'a novata' : 'o novato'}? Eu sou ${esc(mate.name)}, vamos dividir o dormitório. ${esc(ACADEMY.personalities[mate.pers].hi[0])}`, fx: () => { const r = UI.relOf({ rid: mate.id, name: mate.name, race: mate.race, sex: mate.sex, look: mate.look }); r.aff = Math.max(r.aff, 15); } } : null
    ].filter(Boolean), () => {
      Object.assign(A, { enrolled: true, affinity: aff, dorm, scholar });
      Game.centerMsg('MATRICULADO(A) EM ASTRALIS!', `Afinidade: ${AF.name} • ${BUILDINGS[dorm].name}`);
      Game.chron(`Entrei para a ${ACADEMY.name}${scholar ? ' como bolsista' : ''}. O cristal revelou minha afinidade: ${AF.name}.`);
      this.key = '';
    });
  },
  magicClass() {
    const P = Game.player, A = this.state(), T = ACADEMY.magicTeacher, look = this.look(T), AF = ACADEMY.affinities[A.affinity];
    const n = A.lessons.magia + 1;
    const topics = ['a respiração arcana: sentir a mana que corre no corpo', 'como canalizar a energia para as mãos', 'os seis elementos e suas afinidades', 'círculos de proteção', 'a leitura de runas antigas', 'a história dos grandes magos de Eldoria', 'o controle da intensidade dos feitiços', 'como lançar magia em movimento', 'a magia dos dragões e seus Gritos', 'escudos e barreiras', 'a ética da necromancia (e por que é proibida)', 'magia combinada em grupo', 'a meditação dos elfos de Sylvaris', 'os feitiços de grande poder', 'a prova final: dominar sua afinidade'];
    const topic = topics[Math.min(topics.length - 1, n - 1)];
    const mates = Game.actors.filter(a => a.student && !a.dead);
    const steps = [
      { n: T.name, look, t: `Sentem-se, sentem-se! Hoje, na aula ${n}, vamos estudar <b>${esc(topic)}</b>.`, fx: () => UI.fade() },
      { n: T.name, look, t: n === 1 ? `${esc(P.name)}, feche os olhos. Sinta o calor no peito... a magia sempre esteve aí, só estava dormindo. Agora — <b>desperte!</b>` : `<i>O professor desenha runas brilhantes na lousa enquanto os alunos praticam.</i>`, fx: () => { Sfx.play('spell'); Game.burst(P.x, P.y - 10, AF.c, 18, 60); } }
    ];
    if (mates.length) { const m = mates[Math.floor(Math.random() * mates.length)]; steps.push({ n: m.name, look: m.look, t: esc(ACADEMY.personalities[m.student.pers].hi[1] || 'Essa aula foi ótima!') }); }
    this.scene(steps, () => {
      A.lessons.magia = n; A.magicDay = Game.day;
      P.train('destruicao', 22); P.train('restauracao', 14); P.train('conjuracao', 14);
      for (const m of mates) { const r = UI.relOf(m); r.aff = Math.min(100, r.aff + 2); }
      this.passTime(3 * 60);
      const ms = ACADEMY.magicMilestones.indexOf(n);
      if (n === 1 && !P.magicAwake) { P.magicAwake = true; Game.chron('Minha magia despertou na Academia de Astralis!'); }
      if (ms >= 0) {
        const sp = AF.spells[ms];
        if (sp && !P.spells.includes(sp)) P.spells.push(sp);
        Sfx.play('learn');
        Game.centerMsg(n === 1 ? 'MAGIA DESPERTADA!' : 'NOVA MAGIA!', sp ? SPELLS[sp].name : '');
        if (sp) Game.toast('Magia aprendida: ' + SPELLS[sp].name + (n === 1 ? ' — use o botão de Magia!' : ''), '#c0a0ff');
      } else Game.toast(`Aula de magia concluída (${n}/${ACADEMY.graduateMagic}).`, '#c0a0ff');
      UI.fade();
    });
  },

  // ---------- Esgrima ----------
  fencingHall(b) {
    const P = Game.player, A = this.state(), T = ACADEMY.fencingTeacher, look = this.look(T), h = Game.time / 60;
    const opts = [];
    let text = 'Postura firme, olhar no adversário! A espada é uma extensão do seu braço.';
    if (!A.enrolled) text = 'Só alunos matriculados treinam aqui. Fale com a Arquimaga no Grande Salão.';
    else {
      text += `<br><br>Aulas de esgrima: <b>${A.lessons.esgrima}/${ACADEMY.graduateFencing}</b> <span class="dim">(14h–18h)</span>`;
      if (A.fenceDay !== Game.day && h >= 14 && h < 18) opts.push({ label: '⚔ Aula de esgrima (duelo de treino)', cls: 'gold', fn: () => this.fencingClass() });
      else opts.push({ label: A.fenceDay === Game.day ? 'Aula de esgrima (já treinou hoje)' : 'Aula de esgrima (só das 14h às 18h)', fn: () => Game.toast('Volte no horário da aula de esgrima (14h–18h).', '#ffd080') });
    }
    opts.push({ label: 'Comprar equipamento de treino', fn: () => UI.shop(b, 'smith') });
    opts.push({ label: 'Sair' });
    UI.dialog(T.name, look, text, opts);
  },
  fencingClass() {
    const P = Game.player, A = this.state(), T = ACADEMY.fencingTeacher, look = this.look(T);
    const present = Game.actors.filter(a => a.student && !a.dead);
    const st = present.length ? present[Math.floor(Math.random() * present.length)].student : this.students()[Math.floor(Math.random() * this.students().length)];
    this.scene([
      { n: T.name, look, t: `Hoje: duelo de treino! ${esc(P.name)} contra <b>${esc(st.name)}</b>. Quem fizer o outro recuar vence. Nada de magia, só aço!` },
      { n: st.name, look: st.look, t: st.rank === 'royal' ? 'Não vou pegar leve só porque você é plebeu(eia)!' : 'Que vença o melhor!' }
    ], () => {
      const L = Game.level;
      const x = L.isInterior ? Math.floor(L.w / 2) * 16 + 8 : Game.player.x + 30, y = L.isInterior ? 6 * 16 + 8 : Game.player.y;
      const m = new Monster('mercenario', x, y, Math.max(2, P.level), { look: Object.assign({}, st.look, { weapon: 'sword', wc: '#c0c8e0' }), name: st.name + ' (treino)', dmgMul: 0.35, hpMul: 0.35 });
      m.spar = true; m.student = null; m.team = 'enemy'; m.follow = false;
      Game.findFree(m); m.home = { x: m.x, y: m.y }; m.target = P; m.aggro = true;
      Game.actors = Game.actors.filter(a => !(a.student && a.student.id === st.id));
      Game.actors.push(m);
      this.spar = { m, st, t: 0 };
      Game.centerMsg('DUELO DE TREINO!', 'Faça seu oponente recuar');
    });
  },
  updateSpar(dt) {
    const S = this.spar;
    if (!S) return;
    const P = Game.player, m = S.m;
    S.t += dt;
    if (!Game.actors.includes(m) && !m.dead) { this.spar = null; return; }
    if (m.dead || m.hp <= m.maxHp * 0.25) return this.endSpar(true);
    if (P.hp <= P.stat.maxHp * 0.3 || S.t > 90) return this.endSpar(false);
  },
  endSpar(win) {
    const S = this.spar, P = Game.player, A = this.state(), T = ACADEMY.fencingTeacher;
    this.spar = null;
    S.m.dead = true; S.m.deadT = 10; Game.actors = Game.actors.filter(a => a !== S.m);
    P.hp = Math.max(P.hp, P.stat.maxHp * 0.6);
    A.lessons.esgrima++; A.fenceDay = Game.day;
    P.train('combate', win ? 30 : 15); P.train('armadura', 8);
    const r = UI.relOf({ rid: S.st.id, name: S.st.name, race: S.st.race, sex: S.st.sex, look: S.st.look }); r.aff = Math.min(100, r.aff + (win ? 4 : 6));
    this.key = '';
    this.scene([
      { n: T.name, look: this.look(T), t: win ? `Excelente! ${esc(P.name)} vence o duelo! Viram essa guarda? Aprendam!` : `${esc(S.st.name)} vence! Mas você lutou bem, ${esc(P.name)}. Corrija os pés e tente de novo amanhã.` },
      { n: S.st.name, look: S.st.look, t: win ? 'Ugh... Bela luta. Da próxima vez eu ganho!' : 'Hehe, foi por pouco. Você está melhorando!' }
    ], () => {
      this.passTime(3 * 60);
      Sfx.play(win ? 'quest' : 'learn');
      if (A.lessons.esgrima === ACADEMY.graduateFencing) Game.chron('Completei o treinamento de esgrima de Astralis.');
      Game.toast(`Aula de esgrima concluída (${A.lessons.esgrima}/${ACADEMY.graduateFencing}).`, '#ffd080');
      UI.fade();
    });
  },

  // ---------- Graduação ----------
  graduate() {
    const P = Game.player, A = this.state(), H = ACADEMY.head, look = this.look(H);
    const friends = this.students().filter(s => this.isFriend(s)).slice(0, 2);
    UI.fade();
    this.scene([
      { n: H.name, look, t: '<i>O Grande Salão está enfeitado com os estandartes de todos os reinos. Príncipes, princesas e nobres aplaudem de pé.</i>' },
      { n: H.name, look, t: `${esc(P.name)}, você chegou aqui sem magia e com uma espada velha. Hoje sai como mago(a) e espadachim de Astralis. Poucos no mundo podem dizer o mesmo.` },
      ...friends.map(f => ({ n: f.name, look: f.look, t: f.rank === 'royal' ? `Quando eu for ${f.sex === 'f' ? 'rainha' : 'rei'}, você sempre será bem-vindo(a) em ${esc(f.from)}. Parabéns, amigo(a)!` : 'Parabéns! Eu sabia que você conseguiria!' })),
      { n: H.name, look, t: 'Receba o <b>Manto do Graduado</b> e o <b>Florete Real de Astralis</b>. Que eles te lembrem de onde você aprendeu a voar.', fx: () => { P.addItem(Items.make('manto_astralis')); P.addItem(Items.make('florete_real')); Sfx.play('levelup'); Game.burst(P.x, P.y - 10, '#ffd040', 40, 100); } }
    ], () => {
      A.graduated = true;
      P.addXP(1500);
      Game.centerMsg('GRADUADO(A) EM ASTRALIS!', 'O mundo inteiro conhece este título');
      Game.chron(`Me graduei na ${ACADEMY.name}, aplaudido(a) por príncipes e princesas de todos os reinos.`);
    });
  },

  // ---------- Conversa com alunos ----------
  talk(a) {
    const P = Game.player, st = a.student, A = this.state(), r = UI.relOf(a);
    const pers = ACADEMY.personalities[st.pers];
    a.talkT = 3;
    if (this.visit && this.visit.a === a) { const V = this.visit; this.visit = null; a.visiting = false; UI.relOf(a).inviteDay = Game.day; return this.inviteMenu(V.st, a, false, V.dorm); }
    const back = () => this.talk(a);
    let text = `<span class="dim">${esc(st.title)}</span> ${UI.hearts(r.aff)}<br>`;
    text += A.enrolled ? esc(pers.hi[Math.floor(Math.random() * pers.hi.length)]) : (st.rank === 'royal' ? 'Você não é aluno(a) daqui, é? Plebeus precisam de matrícula... ou de muito talento no exame.' : 'Você é novo por aqui? A Arquimaga recebe novos alunos no Grande Salão.');
    const opts = [{ label: 'Conversa pessoal 💬', fn: () => UI.personal(a, back) }];
    opts.push({ label: 'Quem é você?', fn: () => UI.dialog(a.name, a.look, `${esc(st.title)}${st.rank !== 'common' ? ` — ${esc(st.from)}` : ''}.<br>Afinidade: <b style="color:${ACADEMY.affinities[st.aff].c}">${ACADEMY.affinities[st.aff].name}</b> • Jeito: ${({ gentil: 'gentil', orgulhoso: 'orgulhoso(a)', timido: 'tímido(a)', aventureiro: 'aventureiro(a)', estudioso: 'estudioso(a)', brincalhao: 'brincalhão(ona)' })[st.pers]}<br>Gosta de: ${pers.likes === 'city' ? 'passear pela cidade' : 'caçar monstros'}`, [{ label: 'Voltar', fn: back }]) });
    if (A.enrolled && this.isFriend(st) && r.inviteDay !== Game.day && !P.follower) opts.push({ label: 'Vamos sair juntos? 🎉', cls: 'gold', fn: () => { r.inviteDay = Game.day; this.inviteMenu(st, a, true); } });
    opts.push({ label: 'Tchau' });
    UI.dialog(a.name, a.look, text, opts);
  },

  // ---------- Amigos que te procuram ----------
  updateVisit(dt, place) {
    const P = Game.player, A = P.academy;
    const V = this.visit;
    if (V) {
      if (!place) { this.cancelVisit(); return; } // você saiu da Academia: eles não sabem para onde foi
      if (place !== V.place || !Game.actors.includes(V.a)) {
        // você mudou de lugar dentro da escola: o amigo te procura lá
        V.place = place;
        const p = this.spawnPos(place, { x: P.x, y: P.y, r: 90 }) || this.spawnPos(place);
        if (!p) { this.cancelVisit(); return; }
        V.a = this.makeNPC(V.st, p.x, p.y); V.a.visiting = true; Game.actors.push(V.a);
      }
      if (UI.current) return;
      V.t += dt;
      const a = V.a, d = dist(a.x, a.y, P.x, P.y);
      if (V.t > 70) { Game.toast(`${V.st.name} desistiu de te procurar.`, '#c0c0c0'); this.cancelVisit(); return; }
      if (d > 22) {
        const ang = angleTo(a.x, a.y, P.x, P.y);
        const mv = a.blocked ? ang + (a.side || (a.side = Math.random() < 0.5 ? 1.2 : -1.2)) : ang;
        moveActor(a, Math.cos(mv) * 46 * dt, Math.sin(mv) * 46 * dt);
        a.moving = true; a.anim += dt; a.setDir(mv); a.talkT = 0; a.wp = null;
        if (a.blocked) { a.stuck = (a.stuck || 0) + dt; if (a.stuck > 2.5) { const p = this.spawnPos(place, { x: P.x, y: P.y, r: 26 }); if (p) { a.x = p.x; a.y = p.y; } a.stuck = 0; } }
        return;
      }
      a.moving = false; a.setDir(angleTo(a.x, a.y, P.x, P.y)); P.setDir(angleTo(P.x, P.y, a.x, a.y));
      this.visit = null; a.visiting = false; a.home = { x: a.x, y: a.y };
      const r = UI.relOf(a); r.inviteDay = Game.day;
      this.inviteMenu(V.st, a, false, V.dorm);
      return;
    }
    if (!A || !A.enrolled || !place || this.spar || this.cine || UI.current || (P.follower && P.follower.student)) return;
    const h = Game.time / 60;
    if (h < 7 || h >= 23) return;
    this.visitT -= dt;
    if (this.visitT > 0) return;
    this.visitT = 90 + Math.random() * 120;
    const friends = this.students().filter(st => { const r = P.rel[st.id]; return r && r.aff >= 25 && r.inviteDay !== Game.day && P.spouse !== st.id && this.where(st) !== 'follow'; });
    if (!friends.length) return;
    this.startVisit(friends[Math.floor(Math.random() * friends.length)], place);
  },
  startVisit(st, place) {
    const P = Game.player, A = P.academy, L = Game.level;
    const dorm = L.isInterior && place === A.dorm;
    let a = Game.actors.find(x => x.student && x.student.id === st.id);
    if (dorm) {
      // bate na porta do dormitório e entra
      Game.toast('🚪 Toc, toc! Alguém bate na porta do dormitório...', '#ffe0a0'); Sfx.play('door');
      if (a) Game.actors = Game.actors.filter(x => x !== a);
      a = this.makeNPC(st, L.entry.x * 16 + 8, L.entry.y * 16 + 10);
      Game.actors.push(a);
    } else {
      if (!a) {
        const p = this.spawnPos(place, { x: P.x, y: P.y, r: 110 }) || this.spawnPos(place);
        if (!p) return;
        a = this.makeNPC(st, p.x, p.y); Game.actors.push(a);
      }
      Game.toast(`${st.name} está te procurando!`, '#ffb0e0');
    }
    a.visiting = true;
    this.visit = { st, a, place, t: 0, dorm };
  },
  cancelVisit() {
    const V = this.visit;
    this.visit = null;
    if (V && V.a) { V.a.visiting = false; Game.actors = Game.actors.filter(x => x !== V.a); }
    this.key = '';
  },
  inviteMenu(st, a, mine, dorm) {
    const P = Game.player, pers = ACADEMY.personalities[st.pers];
    const intro = mine ? `Sair? Claro! Para onde vamos?` : dorm
      ? `Ei, ${esc(P.name)}! Sabia que ia te achar no dormitório. Chega de livros por hoje! Vamos sair? Podíamos curtir a cidade... ou caçar uns monstros!`
      : `Aí está você, ${esc(P.name)}! Te procurei pela escola inteira. Vamos sair? Curtir a cidade ou caçar monstros, você escolhe!`;
    const like = pers.likes === 'city' ? ' <span class="dim">(parece preferir a cidade)</span>' : ' <span class="dim">(parece querer caçar)</span>';
    UI.dialog(st.name, st.look, intro + like, [
      { label: '🎉 Curtir a cidade', cls: 'gold', fn: () => this.outing(st, a) },
      { label: '⚔ Caçar monstros', cls: 'gold', fn: () => this.startHunt(st, a) },
      { label: 'Hoje não, desculpe', fn: () => { const r = UI.relOf(a); r.aff = Math.max(0, r.aff - 1); UI.close(); Game.toast(`${st.name} ficou um pouco chateado(a).`, '#c0c0c0'); a.wp = null; this.key = ''; } }
    ]);
  },
  nearCity() {
    const W = Game.world, A = W.academy;
    let best = null, bd = 1e9;
    for (const s of W.settlements) { if (s === A || s.type === 'village') continue; const d = dist(s.x, s.y, A.x, A.y); if (d < bd) { bd = d; best = s; } }
    return best;
  },
  outing(st, a) {
    const P = Game.player, A = this.state(), pers = ACADEMY.personalities[st.pers];
    const city = this.nearCity(), r = UI.relOf(a);
    const line = ACADEMY.outingsCity[Math.floor(Math.random() * ACADEMY.outingsCity.length)];
    const gain = pers.likes === 'city' ? 12 : 8, cost = Math.min(P.gold, 25);
    UI.close(); UI.fade();
    this.scene([
      { n: ACADEMY.short, t: `<i>Vocês saem pelos portões de Astralis e seguem até ${esc(city ? city.name : 'a cidade')}.</i>`, fx: () => { Game.actors = Game.actors.filter(x => x !== a); } },
      { n: st.name, look: st.look, t: `<i>${esc(line)}</i>` },
      { n: st.name, look: st.look, t: st.rank === 'royal' ? 'No castelo eu nunca posso fazer isso... Obrigado(a) por hoje. De verdade.' : r.status === 'dating' ? 'Hoje foi perfeito... 💕' : 'Haha, que dia! Precisamos repetir isso.' }
    ], () => {
      P.gold -= cost;
      r.aff = Math.min(100, r.aff + gain + (r.status === 'dating' ? 4 : 0));
      P.addBuff('regen', 1, 600, 'Dia divertido'); P.train('eloquencia', 6);
      this.passTime(3 * 60);
      A.outings = (A.outings || 0) + 1;
      if (!r.outed) { r.outed = true; Game.chron(`Saí para curtir ${city ? city.name : 'a cidade'} com ${st.name}.`); }
      UI.fade(); this.key = '';
      Game.toast(`Vocês voltaram para a Academia. ${st.name} ficou mais próximo(a) de você (+${gain}).`, '#ff90c0');
    });
  },
  startHunt(st, a) {
    const P = Game.player, A = this.state();
    UI.close();
    Game.actors = Game.actors.filter(x => x !== a);
    P.follower = { name: st.name, look: st.look, student: st.id };
    Game.spawnFollower();
    A.hunt = { sid: st.id, kills: 0, need: 4 + Math.floor(Math.random() * 3), reg: Game.world.academy.region.index };
    Game.toast(`${st.name} vai caçar com você! Derrotem ${A.hunt.need} monstros por perto.`, '#80c0ff');
    if (!P.rel[st.id].hunted) { P.rel[st.id].hunted = true; Game.chron(`Fui caçar monstros com ${st.name}, da Academia.`); }
  },
  onKill(m) {
    const P = Game.player, A = P.academy;
    if (!A || !A.hunt || m.team !== 'enemy' || m.spar) return;
    const H = A.hunt; H.kills++;
    const st = this.byId(H.sid);
    if (H.kills < H.need) { Game.toast(`Caçada com ${st.name}: ${H.kills}/${H.need}`, '#80c0ff'); return; }
    const pers = ACADEMY.personalities[st.pers], r = P.rel[st.id];
    const gain = pers.likes === 'hunt' ? 14 : 9;
    if (r) r.aff = Math.min(100, r.aff + gain);
    A.hunt = null; A.hunts = (A.hunts || 0) + 1;
    P.addItem(Items.make(Items.potionFor(P.level, new RNG(Date.now() & 0xffff))));
    Game.later(0.8, () => UI.dialog(st.name, st.look, `Que caçada! ${pers.likes === 'hunt' ? 'Era disso que eu precisava!' : 'Meu coração ainda está acelerado!'} Tome, divida isso comigo. Vou voltar para a Academia antes do toque de recolher. <span class="good">(+${gain})</span>`, [{ label: 'Até mais!', fn: () => { UI.close(); this.dismissFollower(); } }]));
  },
  dismissFollower(msg) {
    const P = Game.player;
    if (!P.follower || !P.follower.student) return;
    P.follower = null;
    for (const a of Game.actors) if (a.isFollower && a.studentId) { a.isFollower = false; a.vanish(); }
    if (P.academy) P.academy.hunt = null;
    if (msg) Game.toast(msg, '#c0c0c0');
    this.key = '';
  },
  updateHunt() {
    const P = Game.player, W = Game.world;
    if (!P.follower || !P.follower.student || !Game.level.isWorld) return;
    const A = W.academy, st = this.byId(P.follower.student);
    if (!st) return;
    const reg = W.regionAt(Math.floor(P.x / 16), Math.floor(P.y / 16));
    if (reg !== A.region.index && dist(P.x / 16, P.y / 16, A.x, A.y) > 260) this.dismissFollower(`${st.name} não conhece estas terras e voltou para a Academia.`);
  },
  followerTalk(a) {
    const st = this.byId(a.studentId), A = this.state();
    UI.dialog(a.name, a.look, A.hunt ? `Ainda faltam ${A.hunt.need - A.hunt.kills} monstros! Vamos lá!` : 'Vamos continuar?', [
      { label: 'Vamos!' },
      { label: 'Volte para a Academia', fn: () => { UI.close(); const r = Game.player.rel[a.studentId]; if (r && A.hunt) r.aff = Math.max(0, r.aff - 2); this.dismissFollower(`${st ? st.name : a.name} voltou para a Academia.`); } }
    ]);
  }
};
