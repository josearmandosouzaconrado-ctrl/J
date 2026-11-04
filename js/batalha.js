'use strict';
/* =========================================================
   BATALHA RÁPIDA
   No menu inicial: escolha o seu país e o inimigo, o ano (que define
   os tanques), o terreno, quem ataca e as unidades iniciais de cada lado.
   Não há base nem construção: durante a luta você só pede reforços,
   pagos com pontos que se acumulam com o tempo. O inimigo também recebe.
   Usa o mesmo campo de batalha 3D das batalhas da campanha (startBattle).
   ========================================================= */
const QB = {
  mode: 'world', p: 'USA', e: 'GER', year: 1944, terr: 'N', atk: 'player', rateK: 'normal',
  units: { p: { inf: 10, at: 2, med: 1, tank: 3, light: 2, tk: null, lt: null }, e: { inf: 10, at: 2, med: 1, tank: 3, light: 2, tk: null, lt: null } },
  rate: 5, rp: 0, erp: 0, eT: 0, queue: [],
};
const QB_NATS = ['GER', 'ENG', 'FRA', 'SOV', 'ITA', 'JAP', 'USA', 'POL', 'CHN'];
const QB_YEARS = [1939, 1941, 1942, 1943, 1944, 1945];
const QB_TERR = [['N', 'Campo europeu', 'Normandia', 49], ['W', 'Inverno', 'Ardenas', 50], ['D', 'Deserto', 'El Alamein', 30], ['S', 'Mediterrâneo', 'Sicília', 37], ['T', 'Selva', 'Guadalcanal', -9], ['M', 'Montanhas', 'Monte Cassino', 41]];
const QB_ATK = [['player', 'Você ataca'], ['enemy', 'O inimigo ataca']];
const QB_RATE = [['none', 'Sem reforços', 0], ['few', 'Poucos', 3], ['normal', 'Normal', 5], ['many', 'Muitos', 9]];
const QB_MAX = { inf: 24, at: 8, med: 4, tank: 10, light: 8 }, QB_TOTAL = 50;
const QB_PACK = {
  inf: { n: 'Pelotão de infantaria', cost: 200 }, at: { n: 'Dupla anticarro', cost: 160 }, med: { n: 'Médico', cost: 70 },
  tank: { n: 'Tanque', cost: 420 }, light: { n: 'Veículo leve', cost: 260 },
};
try { const sv = JSON.parse(localStorage.getItem('diad-qb') || 'null'); if (sv) Object.assign(QB, { mode: sv.mode || 'world', p: sv.p || QB.p, e: sv.e || QB.e, year: sv.year || QB.year, terr: sv.terr || QB.terr, atk: sv.atk || QB.atk, rateK: sv.rateK || QB.rateK }, sv.units ? { units: sv.units } : {}); } catch (e) { /* sem armazenamento */ }
function qbSave() { try { localStorage.setItem('diad-qb', JSON.stringify({ mode: QB.mode, p: QB.p, e: QB.e, year: QB.year, terr: QB.terr, atk: QB.atk, rateK: QB.rateK, units: QB.units })); } catch (e) { /* sem armazenamento */ } }

// tabelas da era sem precisar da campanha carregada
function qbLvl(y) { return Math.max(0, TECH.armor.years.filter(v => v <= y).length - 1); }
function qbTab(role, t) { const tab = ERA[role], n = NAT[t] || {}; return tab[t] || (role === 'light' && n.look === 'de' ? tab._de : null) || tab['_' + (n.fac || '')] || tab._; }
// na batalha rápida dá para escolher qualquer modelo do país, não só os da linha da campanha
const QB_EXTRA = {
  tank: { GER: ['panzer38t', 'tiger', 'stug', 'jagdpanther', 'hetzer'], USA: ['m24', 'm26', 'calliope', 'm36'], ENG: ['crusader', 'matilda', 'sherman'], SOV: ['kv1'], FRA: ['charb1', 'somua'], ITA: ['l335'], JAP: ['hago'] },
  light: { GER: ['puma', 'stug', 'hetzer', 'wirbelwind', 'maultier'], USA: ['jeep', 'greyhound', 'm16', 'm10', 'm18', 'm7'], ENG: ['jeep', 'greyhound', 'm10'], SOV: ['t26'], ITA: ['l335', 'sdkfz251'] },
};
function qbList(role, t) { return [...new Set(qbTab(role, t).concat((QB_EXTRA[role] && QB_EXTRA[role][t]) || []))].filter(k => UT[k]); }
function qbAuto(role, t) { const k = qbTab(role, t)[qbLvl(QB.year)]; return UT[k] ? k : qbList(role, t)[0]; }
function qbInf(t) { const look = (NAT[t] || {}).look || 'us'; return look === 'de' ? ['gren', 'pzschreck', 'sani'] : look === 'jp' ? ['jinf', 'jat', 'jmedic'] : ['rifle', 'bazooka', 'medic']; }
function qbFix(side) { const st = QB.units[side], t = QB[side]; if (!qbList('tank', t).includes(st.tk)) st.tk = qbAuto('tank', t); if (!qbList('light', t).includes(st.lt)) st.lt = qbAuto('light', t); }
function qbTotal(side) { const st = QB.units[side]; return st.inf + st.at + st.med + st.tank + st.light; }

/* ---------- menu ---------- */
function qbChips(id, list, cur, key) {
  const el = $(id), b = el.querySelector('b').outerHTML;
  el.innerHTML = b + list.map(([v, txt]) => '<button type="button" aria-pressed="' + (String(v) === String(cur)) + '" data-' + key + '="' + v + '">' + txt + '</button>').join('');
}
function qbNats(id, cur, other) {
  $(id).innerHTML = QB_NATS.map(t => '<button type="button" role="radio" aria-checked="' + (t === cur) + '" data-nat="' + t + '"' + (t === other ? ' title="já escolhido do outro lado"' : '') + '><b><i class="sw" style="background:' + NAT[t].c + '"></i>' + NAT[t].n + '</b><span></span></button>').join('');
}
function qbSide(side, label) {
  const st = QB.units[side], t = QB[side], [R, AT, MED] = qbInf(t);
  const row = (k, name, extra) => '<div class="ur"><span>' + name + (extra || '') + '</span><button type="button" data-q="' + side + ':' + k + ':-1" aria-label="Menos ' + name + '"' + (st[k] <= 0 ? ' disabled' : '') + '>−</button><output>' + st[k] + '</output><button type="button" data-q="' + side + ':' + k + ':1" aria-label="Mais ' + name + '"' + (st[k] >= QB_MAX[k] || qbTotal(side) >= QB_TOTAL ? ' disabled' : '') + '>+</button></div>';
  const sel = (key, role) => '<select data-qs="' + side + ':' + key + '" aria-label="Modelo">' + qbList(role, t).map(k => '<option value="' + k + '"' + (k === st[key] ? ' selected' : '') + '>' + UT[k].name + '</option>').join('') + '</select>';
  return '<fieldset><legend>' + label + ' · ' + NAT[t].n.toUpperCase() + '</legend>' + row('inf', UT[R].plural) + row('at', UT[AT].plural) + row('med', UT[MED].plural) +
    row('tank', 'Tanques', sel('tk', 'tank')) + row('light', 'Veículos leves', sel('lt', 'light')) + '<div class="tot">' + qbTotal(side) + ' de ' + QB_TOTAL + ' unidades</div></fieldset>';
}
function qbRender() {
  const battle = QB.mode === 'battle';
  for (const b of document.querySelectorAll('#modeTabs button')) b.setAttribute('aria-selected', String(b.dataset.mode === QB.mode));
  $('modeWorld').hidden = battle; $('modeBattle').hidden = !battle; $('worldTips').hidden = battle; $('worldRow').hidden = battle; $('qbRow').hidden = !battle;
  $('introEyebrow').textContent = battle ? 'BATALHA RÁPIDA · ESCOLHA OS EXÉRCITOS' : '1 DE SETEMBRO DE 1939 · CAMPANHA MUNDIAL';
  if (!battle) return;
  qbFix('p'); qbFix('e');
  qbNats('qbP', QB.p, QB.e); qbNats('qbE', QB.e, QB.p);
  qbChips('qbYear', QB_YEARS.map(y => [y, String(y)]), QB.year, 'qy');
  qbChips('qbTerr', QB_TERR, QB.terr, 'qt');
  qbChips('qbAtk', QB_ATK, QB.atk, 'qa');
  qbChips('qbRate', QB_RATE, QB.rateK, 'qr');
  $('qbUnits').innerHTML = qbSide('p', 'SUAS UNIDADES') + qbSide('e', 'UNIDADES DO INIMIGO');
}
$('modeTabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; QB.mode = b.dataset.mode; qbSave(); qbRender(); });
for (const [id, side] of [['qbP', 'p'], ['qbE', 'e']]) $(id).addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  const o = side === 'p' ? 'e' : 'p', t = b.dataset.nat;
  if (QB[o] === t) { QB[o] = QB[side]; QB.units[o].tk = QB.units[o].lt = null; }   // troca os lados
  QB[side] = t; QB.units[side].tk = QB.units[side].lt = null; qbSave(); qbRender();
});
$('modeBattle').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b || b.disabled) return;
  if (b.dataset.qy) { QB.year = +b.dataset.qy; for (const s of ['p', 'e']) QB.units[s].tk = QB.units[s].lt = null; }
  else if (b.dataset.qt) QB.terr = b.dataset.qt;
  else if (b.dataset.qa) QB.atk = b.dataset.qa;
  else if (b.dataset.qr) QB.rateK = b.dataset.qr;
  else if (b.dataset.q) { const [s, k, d] = b.dataset.q.split(':'), st = QB.units[s]; st[k] = clamp(st[k] + +d, 0, QB_MAX[k]); if (qbTotal(s) > QB_TOTAL) st[k]--; }
  else return;
  qbSave(); qbRender();
});
$('modeBattle').addEventListener('change', (e) => { const s = e.target.closest('select'); if (!s) return; const [side, key] = s.dataset.qs.split(':'); QB.units[side][key] = s.value; qbSave(); });
$('qbStart').addEventListener('click', qbStart);

/* ---------- início da batalha ---------- */
function qbKinds(side) {
  const st = QB.units[side], [R, AT, MED] = qbInf(QB[side]), out = [];
  const add = (k, n) => { for (let i = 0; i < n; i++) out.push(k); };
  add(st.tk, st.tank); add(st.lt, st.light); add(R, st.inf); add(AT, st.at); add(MED, st.med);
  return out;
}
function qbStart() {
  initAudio();
  qbFix('p'); qbFix('e');
  if (!qbKinds('p').length || !qbKinds('e').length) { toast('Cada lado precisa de pelo menos uma unidade.', 'bad'); return; }
  // as nações (bandeiras, uniformes, nomes) vêm do mesmo estado da campanha, criado só para esta batalha
  newCampaign(QB.p);
  const lvl = qbLvl(QB.year);
  for (const t of [QB.p, QB.e]) { W.nat[t].tech.armor = lvl; W.nat[t].tech.inf = lvl; }
  const T = QB_TERR.find(x => x[0] === QB.terr) || QB_TERR[0], winter = QB.terr === 'W';
  const month = winter ? (QB.year === 1939 ? 11 : 0) : QB.year === 1939 ? 8 : 6;
  W.day = Math.max(0, dayOf(QB.year, month + 1, 15));
  startBattle({
    quick: true, prov: { name: T[2], terr: QB.terr, lat: T[3], lon: 10, id: (Math.random() * 900) | 0 }, year: QB.year, month,
    attacker: QB.atk,
    player: { tag: QB.p, nat: W.nat[QB.p], divs: [], kinds: qbKinds('p') },
    enemy: { tag: QB.e, nat: W.nat[QB.e], divs: [], kinds: qbKinds('e') },
    onEnd: () => { W = null; MODE = 'world'; $('hud').hidden = true; $('intro').hidden = false; renderIntro(); },
  });
}
function quickStart() {
  QB.rate = (QB_RATE.find(r => r[0] === QB.rateK) || QB_RATE[2])[2];
  QB.rp = QB.rate ? 150 : 0; QB.erp = QB.rp; QB.eT = 25; QB.queue = [];
  if (QB.rate) later(6, () => toast('Sem base nesta batalha: toque em REFORÇO para chamar tropas com os pontos que se acumulam.', 'good'));
}

/* ---------- reforços ---------- */
function qbPack(key, team) {
  const side = team === 'us' ? 'p' : 'e', st = QB.units[side], [R, AT, MED] = qbInf(QB[side]);
  return key === 'inf' ? [R, R, R, R, R] : key === 'at' ? [AT, AT] : key === 'med' ? [MED] : key === 'tank' ? [st.tk] : [st.lt];
}
const qbAlive = (team) => ents.filter(e => e.alive && e.unit && e.team === team && !e.downed).length + QB.queue.filter(q => q.team === team).reduce((s, q) => s + q.kinds.length, 0);
function quickCall(key, team) {
  const P = QB_PACK[key]; if (!P || !QB.rate) return;
  const free = team === 'us' && S.free.res, kinds = qbPack(key, team);
  if (qbAlive(team) + kinds.length > 80) { if (team === 'us') toast('Limite de tropas em campo atingido.', 'bad'); return; }
  if (team === 'us') { if (!free && QB.rp < P.cost) return; if (!free) QB.rp -= P.cost; }
  else { if (QB.erp < P.cost) return; QB.erp -= P.cost; }
  QB.queue.push({ t: 9, team, kinds, key });
  if (team === 'us') { toast(P.n + ' a caminho (chega em 9 s pela retaguarda).', 'good'); }
}
function quickPanel() {
  const free = S.free.res, n = QB.queue.filter(q => q.team === 'us').length;
  if (!QB.rate) return ['Reforços', 'Nesta batalha não há reforços: lute com as tropas que você escolheu.', '<button class="pb" data-act="reinfclose">FECHAR<small>&nbsp;</small></button>'];
  let btns = '';
  for (const k of Object.keys(QB_PACK)) {
    const P = QB_PACK[k], kinds = qbPack(k, 'us'), ok = free || QB.rp >= P.cost;
    const what = kinds.length > 1 ? kinds.length + ' × ' + UT[kinds[0]].name + (k === 'inf' ? '' : '') : UT[kinds[0]].name;
    btns += '<button class="pb' + (ok ? ' go' : '') + '" data-act="reinf:' + k + '"' + (ok ? '' : ' disabled') + '>' + P.n + '<small>' + (free ? 'grátis' : P.cost + ' pts') + ' · ' + what + '</small></button>';
  }
  btns += '<button class="pb" data-act="reinfclose">FECHAR<small>&nbsp;</small></button>';
  return ['Pedir reforço', (free ? 'Recursos ilimitados.' : 'Pontos: ' + Math.floor(QB.rp) + ' (+' + QB.rate + '/s).') + ' Chegam pela retaguarda.' + (n ? ' ' + n + ' a caminho.' : ''), btns];
}
function qbArrive(q) {
  const pAtt = BAT.cfg.attacker === 'player', atkSide = (q.team === 'us') === pAtt;
  const z0 = atkSide ? 360 : 40, z1 = atkSide ? 290 : 172, cx = rr(-260, 260), n = q.kinds.length;
  q.kinds.forEach((k, i) => {
    const x = cx + (i - (n - 1) / 2) * 7, u = spawnUnit(k, x, z0 + rr(-6, 6), { team: q.team, pal: q.team === 'us' ? 'A' : 'B', heading: atkSide ? Math.PI : 0 });
    if (q.team === 'us') { u.order = 'move'; u.dest = { x, z: z1 + rr(-8, 8) }; }
    else {
      const goal = S.cps.filter(c => c.owner !== 'de').sort((a, b) => Math.hypot(a.x - x, a.z - z0) - Math.hypot(b.x - x, b.z - z0))[0];
      u.order = 'amove'; u.dest = goal ? { x: goal.x + rr(-15, 15), z: goal.z + rr(-15, 15) } : { x, z: z1 };
    }
  });
  if (q.team === 'us') toast(QB_PACK[q.key].n + ' chegou.', 'good');
  else if (rand() < 0.5) toast('Reforços ' + foe().pl + ' chegando!', 'bad');
}
function quickTick(dt) {
  if (QB.rate) { QB.rp = Math.min(3000, QB.rp + QB.rate * dt); QB.erp = Math.min(3000, QB.erp + QB.rate * 0.9 * dt); }
  for (let i = QB.queue.length - 1; i >= 0; i--) { const q = QB.queue[i]; q.t -= dt; if (q.t <= 0) { QB.queue.splice(i, 1); qbArrive(q); } }
  // IA do inimigo: compra reforços conforme a situação
  QB.eT -= dt;
  if (QB.rate && QB.eT <= 0) {
    QB.eT = 5 + rand() * 4;
    const pt = ents.filter(e => e.alive && e.team === 'us' && e.tank).length, r = rand();
    const key = pt > 2 && r < 0.45 ? (rand() < 0.5 ? 'tank' : 'at') : r < 0.45 ? 'inf' : r < 0.65 ? 'tank' : r < 0.8 ? 'light' : r < 0.92 ? 'at' : 'med';
    quickCall(key, 'de');
  }
  const sm = $('bReinf').querySelector('small'), txt = QB.queue.some(q => q.team === 'us') ? 'a caminho' : QB.rate ? Math.floor(QB.rp) + ' pts' : '—';
  if (sm.textContent !== txt) sm.textContent = txt;
  $('bReinf').classList.toggle('on', !!S.reinfOpen);
}
$('bReinf').addEventListener('click', () => {
  initAudio();
  S.reinfOpen = !S.reinfOpen; if (S.reinfOpen) { S.supportOpen = false; S.strike = null; cancelPlacing(); }
  $('bReinf').classList.toggle('on', S.reinfOpen);
  refreshPanel(true); updSide();
});

// o menu inicial mostra as duas abas
const _renderIntro0 = renderIntro;
renderIntro = function () { _renderIntro0(); qbRender(); };
qbRender();
