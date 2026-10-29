'use strict';
/* =========================================================
   GUERRA MUNDIAL — campanha estratégica 1939–1945
   Mapa do mundo com fronteiras de 1939 dividido em províncias
   (dados em dados_mundo.js), visto como globo 3D ou como mapa
   político plano no estilo Hearts of Iron. Divisões andam entre
   províncias, combatem, e qualquer batalha com divisões suas
   pode ser travada no modo tático 3D (game.js).
   ========================================================= */
let MODE = 'world';   // 'world' (mapa estratégico) ou 'tactical' (batalha 3D)

/* ---------------- nações ---------------- */
const NAT = {
  GER: { n: 'Alemanha', a: ['alemão', 'alemã', 'alemães'], c: '#5d6367', fac: 'eixo', mil: 50, mp: 3000, divs: 50, cap: 'Berlim', look: 'de', armor: 1, inf: 1, ind: 1, air: 'fw190', aggr: 1.05 },
  ENG: { n: 'Reino Unido', a: ['britânico', 'britânica', 'britânicos'], c: '#b8343c', fac: 'aliados', mil: 26, mp: 1600, divs: 14, cap: 'Londres', look: 'us', armor: 1, inf: 1, ind: 1, air: 'p47', aggr: 1.3 },
  FRA: { n: 'França', a: ['francês', 'francesa', 'franceses'], c: '#3b62b3', fac: 'aliados', mil: 26, mp: 1500, divs: 36, cap: 'Paris', look: 'us', armor: 1, inf: 1, ind: 1, air: 'p47', aggr: 1.6 },
  SOV: { n: 'União Soviética', a: ['soviético', 'soviética', 'soviéticos'], c: '#8c1d1f', fac: 'comintern', mil: 46, mp: 6000, divs: 66, cap: 'Moscou', look: 'us', armor: 1, inf: 0, ind: 1, air: 'p47', aggr: 1.2 },
  ITA: { n: 'Itália', a: ['italiano', 'italiana', 'italianos'], c: '#3f8a4c', fac: null, mil: 18, mp: 1500, divs: 24, cap: 'Roma', look: 'de', armor: 0, inf: 0, ind: 0, air: 'fw190', aggr: 1.7 },
  JAP: { n: 'Japão', a: ['japonês', 'japonesa', 'japoneses'], c: '#e2cc85', fac: 'japao', mil: 26, mp: 1800, divs: 44, cap: 'Tóquio', look: 'jp', armor: 0, inf: 1, ind: 1, air: 'zero', aggr: 1.3 },
  USA: { n: 'Estados Unidos', a: ['americano', 'americana', 'americanos'], c: '#3b7d99', fac: null, mil: 14, mp: 5000, divs: 9, cap: 'Washington', look: 'us', armor: 0, inf: 0, ind: 1, air: 'p47', aggr: 1.1 },
  POL: { n: 'Polônia', a: ['polonês', 'polonesa', 'poloneses'], c: '#c4627a', fac: 'aliados', mil: 8, mp: 900, divs: 22, cap: 'Varsóvia', look: 'us', armor: 0, inf: 0, ind: 0, air: 'p47', aggr: 1.4 },
  CHN: { n: 'China', a: ['chinês', 'chinesa', 'chineses'], c: '#b9a24c', fac: null, mil: 6, mp: 4000, divs: 44, cap: 'Chongqing', look: 'us', armor: 0, inf: 0, ind: 0, air: 'p47', aggr: 2.2 },
  MAN: { n: 'Manchukuo', a: ['manchu', 'manchu', 'manchus'], c: '#cdb867', fac: 'japao', mil: 3, mp: 300, divs: 8, cap: 'Hsinking', look: 'jp', puppet: 'JAP' },
  SLO: { n: 'Eslováquia', a: ['eslovaco', 'eslovaca', 'eslovacos'], c: '#7290b5', fac: 'eixo', mil: 2, mp: 120, divs: 2, cap: 'Bratislava', look: 'de', puppet: 'GER' },
  MON: { n: 'Mongólia', a: ['mongol', 'mongol', 'mongóis'], c: '#9c5656', fac: 'comintern', mil: 1, mp: 80, divs: 2, cap: 'Ulan Bator', look: 'us', puppet: 'SOV' },
  HUN: { n: 'Hungria', a: ['húngaro', 'húngara', 'húngaros'], c: '#b4775c', mil: 4, mp: 400, divs: 6, cap: 'Budapeste', look: 'de' },
  ROM: { n: 'Romênia', a: ['romeno', 'romena', 'romenos'], c: '#c9b14b', mil: 4, mp: 600, divs: 8, cap: 'Bucareste', look: 'de' },
  BUL: { n: 'Bulgária', a: ['búlgaro', 'búlgara', 'búlgaros'], c: '#6c9150', mil: 2, mp: 300, divs: 4, cap: 'Sófia', look: 'de' },
  YUG: { n: 'Iugoslávia', a: ['iugoslavo', 'iugoslava', 'iugoslavos'], c: '#7b6bab', mil: 3, mp: 600, divs: 8, cap: 'Belgrado', look: 'us' },
  GRE: { n: 'Grécia', a: ['grego', 'grega', 'gregos'], c: '#6aa5d2', mil: 2, mp: 350, divs: 6, cap: 'Atenas', look: 'us' },
  TUR: { n: 'Turquia', a: ['turco', 'turca', 'turcos'], c: '#9a7651', mil: 4, mp: 800, divs: 8, cap: 'Ancara', look: 'us' },
  SPA: { n: 'Espanha', a: ['espanhol', 'espanhola', 'espanhóis'], c: '#cfa442', mil: 4, mp: 700, divs: 8, cap: 'Madri', look: 'de' },
  POR: { n: 'Portugal', a: ['português', 'portuguesa', 'portugueses'], c: '#4f8a60', mil: 1, mp: 200, divs: 3, cap: 'Lisboa', look: 'us' },
  SWI: { n: 'Suíça', a: ['suíço', 'suíça', 'suíços'], c: '#b54646', mil: 2, mp: 250, divs: 4, cap: 'Berna', look: 'us' },
  SWE: { n: 'Suécia', a: ['sueco', 'sueca', 'suecos'], c: '#5a8ccf', mil: 3, mp: 300, divs: 5, cap: 'Estocolmo', look: 'us' },
  NOR: { n: 'Noruega', a: ['norueguês', 'norueguesa', 'noruegueses'], c: '#a95353', mil: 1, mp: 150, divs: 4, cap: 'Oslo', look: 'us' },
  DEN: { n: 'Dinamarca', a: ['dinamarquês', 'dinamarquesa', 'dinamarqueses'], c: '#c06a6a', mil: 1, mp: 100, divs: 2, cap: 'Copenhague', look: 'us' },
  FIN: { n: 'Finlândia', a: ['finlandês', 'finlandesa', 'finlandeses'], c: '#e6e7ef', mil: 2, mp: 300, divs: 6, cap: 'Helsinque', look: 'de' },
  EST: { n: 'Estônia', a: ['estoniano', 'estoniana', 'estonianos'], c: '#4c7cb2', mil: 1, mp: 60, divs: 1, cap: 'Tallinn', look: 'us' },
  LAT: { n: 'Letônia', a: ['letão', 'letã', 'letões'], c: '#8d3c4c', mil: 1, mp: 70, divs: 1, cap: 'Riga', look: 'us' },
  LIT: { n: 'Lituânia', a: ['lituano', 'lituana', 'lituanos'], c: '#cbb348', mil: 1, mp: 80, divs: 2, cap: 'Kaunas', look: 'us' },
  HOL: { n: 'Holanda', a: ['holandês', 'holandesa', 'holandeses'], c: '#d4843f', fac: null, mil: 2, mp: 250, divs: 5, cap: 'Amsterdã', look: 'us' },
  BEL: { n: 'Bélgica', a: ['belga', 'belga', 'belgas'], c: '#c3a43a', mil: 2, mp: 250, divs: 6, cap: 'Bruxelas', look: 'us' },
  LUX: { n: 'Luxemburgo', a: ['luxemburguês', 'luxemburguesa', 'luxemburgueses'], c: '#84b4d4', mil: 0, mp: 10, divs: 0, cap: 'Luxemburgo', look: 'us' },
  IRL: { n: 'Irlanda', a: ['irlandês', 'irlandesa', 'irlandeses'], c: '#5ca362', mil: 1, mp: 80, divs: 1, cap: 'Dublin', look: 'us' },
  ICE: { n: 'Islândia', a: ['islandês', 'islandesa', 'islandeses'], c: '#7393c4', mil: 0, mp: 5, divs: 0, cap: 'Reykjavik', look: 'us' },
  CAN: { n: 'Canadá', a: ['canadense', 'canadense', 'canadenses'], c: '#a33c3c', fac: 'aliados', mil: 4, mp: 400, divs: 3, cap: 'Ottawa', look: 'us', armor: 1 },
  AST: { n: 'Austrália', a: ['australiano', 'australiana', 'australianos'], c: '#5f9c69', fac: 'aliados', mil: 3, mp: 300, divs: 3, cap: 'Canberra', look: 'us', armor: 1 },
  NZL: { n: 'Nova Zelândia', a: ['neozelandês', 'neozelandesa', 'neozelandeses'], c: '#4c6c8c', fac: 'aliados', mil: 1, mp: 80, divs: 1, cap: 'Wellington', look: 'us' },
  SAF: { n: 'África do Sul', a: ['sul-africano', 'sul-africana', 'sul-africanos'], c: '#8c9c5c', fac: 'aliados', mil: 2, mp: 150, divs: 2, cap: 'Pretória', look: 'us' },
  RAJ: { n: 'Raj Britânico', a: ['indiano', 'indiana', 'indianos'], c: '#d27d4c', fac: 'aliados', mil: 4, mp: 2000, divs: 8, cap: 'Nova Délhi', look: 'us' },
  PER: { n: 'Pérsia', a: ['persa', 'persa', 'persas'], c: '#5c9c8c', mil: 1, mp: 200, divs: 3, cap: 'Teerã', look: 'us' },
  IRQ: { n: 'Iraque', a: ['iraquiano', 'iraquiana', 'iraquianos'], c: '#9c8c4c', mil: 0, mp: 60, divs: 1, cap: 'Bagdá', look: 'us' },
  SAU: { n: 'Arábia Saudita', a: ['saudita', 'saudita', 'sauditas'], c: '#4c8c4c', mil: 0, mp: 50, divs: 1, cap: 'Riad', look: 'us' },
  SIA: { n: 'Sião', a: ['siamês', 'siamesa', 'siameses'], c: '#5c6cb4', mil: 1, mp: 150, divs: 3, cap: 'Bangkok', look: 'jp' },
  MEX: { n: 'México', a: ['mexicano', 'mexicana', 'mexicanos'], c: '#4c8c5c', mil: 1, mp: 300, divs: 3, cap: 'Cidade do México', look: 'us' },
  BRA: { n: 'Brasil', a: ['brasileiro', 'brasileira', 'brasileiros'], c: '#4ca44c', mil: 2, mp: 500, divs: 4, cap: 'Rio de Janeiro', look: 'us' },
  ARG: { n: 'Argentina', a: ['argentino', 'argentina', 'argentinos'], c: '#84bce4', mil: 1, mp: 200, divs: 3, cap: 'Buenos Aires', look: 'us' },
};
const MAJORS = ['GER', 'ENG', 'FRA', 'SOV', 'ITA', 'JAP', 'USA', 'POL', 'CHN'];
const FAC_NAME = { eixo: 'Eixo', aliados: 'Aliados', comintern: 'Comintern', japao: 'Esfera de Coprosperidade' };
// veículos de cada época por nação (nível de pesquisa de blindados 0–4)
const ERA = {
  tank: {
    GER: ['panzer2', 'panzer3', 'panzer4', 'panther', 'kingtiger'], SOV: ['t26', 'bt7', 't34', 'kv1', 't34'], USA: ['stuart', 'stuart', 'lee', 'sherman', 'm26'],
    ENG: ['matilda', 'crusader', 'matilda', 'sherman', 'sherman'], FRA: ['somua', 'charb1', 'somua', 'sherman', 'sherman'], ITA: ['l335', 'm1340', 'm1340', 'm1340', 'm1340'],
    JAP: ['hago', 'chiha', 'chiha', 'chiha', 'chiha'], POL: ['tp7', 'tp7', 'tp7', 'tp7', 'tp7'], CHN: ['t26', 't26', 't26', 'stuart', 'sherman'],
    _eixo: ['panzer38t', 'panzer38t', 'panzer3', 'panzer4', 'panzer4'], _aliados: ['matilda', 'matilda', 'stuart', 'sherman', 'sherman'], _comintern: ['t26', 'bt7', 't34', 't34', 't34'], _: ['t26', 't26', 'panzer38t', 'panzer38t', 'stuart'],
  },
  light: {
    GER: ['sdkfz251', 'sdkfz251', 'puma', 'stug', 'jagdpanther'], USA: ['halftrack', 'halftrack', 'greyhound', 'm10', 'm18'], SOV: ['bt7', 'bt7', 't34', 't34', 't34'],
    ENG: ['halftrack', 'halftrack', 'crusader', 'm10', 'm10'], JAP: ['hago', 'hago', 'hago', 'chiha', 'chiha'], _: ['halftrack', 'halftrack', 'halftrack', 'greyhound', 'greyhound'], _de: ['sdkfz251', 'sdkfz251', 'sdkfz251', 'stug', 'hetzer'],
  },
};
const TECH = {
  armor: { n: 'Blindados', years: [1936, 1939, 1941, 1943, 1944] },
  inf: { n: 'Infantaria', years: [1936, 1939, 1941, 1943, 1944] },
  ind: { n: 'Indústria', years: [1937, 1939, 1941, 1943, 1944] },
};
const DIV = {
  inf: { n: 'Infantaria', atk: 6, hard: 1, def: 10, spd: 22, cost: 320, mp: 12, armored: 0 },
  mot: { n: 'Motorizada', atk: 8, hard: 2, def: 9, spd: 42, cost: 600, mp: 12, armored: 0.2 },
  tank: { n: 'Blindada', atk: 15, hard: 9, def: 8, spd: 38, cost: 1000, mp: 12, armored: 0.7 },
};
const TERR = {
  N: { n: 'temperado', def: 1.0 }, S: { n: 'mediterrâneo', def: 1.1 }, D: { n: 'deserto', def: 0.95 }, W: { n: 'frio', def: 1.15 }, T: { n: 'selva', def: 1.3 }, M: { n: 'montanhas', def: 1.5 },
};
const T0 = Date.UTC(1939, 8, 1);
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
function dayDate(d) { return new Date(T0 + d * 86400000); }
function dateStr(d) { const t = dayDate(d); return t.getUTCDate() + ' de ' + MESES[t.getUTCMonth()] + ' de ' + t.getUTCFullYear(); }
function dayOf(y, m, dd) { return Math.round((Date.UTC(y, m - 1, dd) - T0) / 86400000); }
function curYear() { return dayDate(W.day).getUTCFullYear() + dayDate(W.day).getUTCMonth() / 12; }
function nameOf(t) { const n = W.nat[t]; return n ? n.name : t; }

/* ---------------- geometria das províncias ---------------- */
const WG = { provs: [], arcs: [], tags: MUNDO_DADOS.tags };
(function decode() {
  const D = MUNDO_DADOS, res = D.res, lat0 = D.lat0;
  const chaikin = (pts, closed) => {
    for (let it = 0; it < 2; it++) {
      if (pts.length < 3) break;
      const out = closed ? [] : [pts[0]];
      const n = pts.length - (closed ? 1 : 0);
      for (let i = 0; i < (closed ? n : n - 1); i++) {
        const a = pts[i], b = pts[(i + 1) % n];
        out.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25], [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
      }
      if (closed) out.push(out[0]); else out.push(pts[pts.length - 1]);
      pts = out;
    }
    return pts;
  };
  for (const flat of D.arcs) {
    const pts = []; let x = 0, y = 0;
    for (let i = 0; i < flat.length; i += 2) { x += flat[i]; y += flat[i + 1]; pts.push([-180 + x * res, lat0 - y * res]); }
    const closed = pts.length > 2 && pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1];
    WG.arcs.push(chaikin(pts, closed));
  }
  const DIRN = { N: 'Norte', S: 'Sul', L: 'Leste', O: 'Oeste', NE: 'Nordeste', NO: 'Noroeste', SE: 'Sudeste', SO: 'Sudoeste' };
  const seen = new Map();
  D.provs.forEach((p, id) => {
    const [ti, lon, lat, terr, city, dir, coast, cells, adj, rings] = p;
    let name = city >= 0 ? D.cities[city] : (DIRN[dir] || 'Região') + ' de ' + D.cities[-1 - city];
    const k = seen.get(name) || 0; seen.set(name, k + 1); if (k) name += ' ' + ['II', 'III', 'IV', 'V', 'VI'][Math.min(k - 1, 4)];
    const pr = { id, tag: D.tags[ti], lon, lat, terr, name, coast: !!coast, cells, adj, rings, big: city >= 0 };
    // pontos dos anéis (para preencher e para clicar)
    pr.poly = rings.map(r => {
      const pts = [];
      for (const s of r) { const a = WG.arcs[s < 0 ? ~s : s]; const seq = s < 0 ? a.slice().reverse() : a; for (let i = pts.length ? 1 : 0; i < seq.length; i++) pts.push(seq[i]); }
      return pts;
    });
    let x0 = 999, x1 = -999, y0 = 999, y1 = -999;
    for (const r of pr.poly) for (const q of r) { x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); }
    pr.bb = [x0, y0, x1, y1];
    WG.provs.push(pr);
  });
  D.arcSide.forEach((s, k) => { WG.arcs[k].side = s; });
})();
function provAt(lon, lat) {
  let best = null;
  for (const p of WG.provs) {
    const b = p.bb; if (lon < b[0] || lon > b[2] || lat < b[1] || lat > b[3]) continue;
    let c = false;
    for (const r of p.poly) for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const xi = r[i][0], yi = r[i][1], xj = r[j][0], yj = r[j][1];
      if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) c = !c;
    }
    if (c) { best = p; break; }
  }
  return best;
}
function provDist(a, b) {   // km (haversine)
  const A = WG.provs[a], B = WG.provs[b], R = 6371, r = Math.PI / 180;
  const dl = (B.lat - A.lat) * r, dn = (B.lon - A.lon) * r;
  const h = Math.sin(dl / 2) ** 2 + Math.cos(A.lat * r) * Math.cos(B.lat * r) * Math.sin(dn / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/* ---------------- estado da campanha ---------------- */
let W = null;
function hashColor(t) { let h = 0; for (const ch of t) h = (h * 31 + ch.charCodeAt(0)) | 0; const c = new THREE.Color().setHSL(((h >>> 0) % 360) / 360, 0.32, 0.5); return '#' + c.getHexString(); }
function newCampaign(player) {
  W = { v: 1, day: 0, hour: 0, speed: 2, paused: true, player, auto: true, nat: {}, ctrl: [], divs: [], battles: [], wars: [], done: {}, nextId: 1, log: [], over: false };
  for (const t of new Set([...WG.tags, ...Object.keys(NAT)])) {
    const m = NAT[t] || {};
    W.nat[t] = {
      tag: t, name: m.n || t, adj: m.a || [t, t, t], color: m.c || hashColor(t), fac: m.fac || null, look: m.look || 'us', puppet: m.puppet || null,
      mil: m.mil || (WG.provs.filter(p => p.tag === t).length > 6 ? 2 : 1), mp: m.mp || 60, eq: 200, cap: null, tech: { armor: m.armor || 0, inf: m.inf || 0, ind: m.ind || 0 },
      res: null, resP: 0, queue: [], aggr: m.aggr || 1.4, dead: !WG.tags.includes(t), exile: false, air: m.air || 'p47', homeN: 0,
    };
  }
  WG.provs.forEach((p, i) => { W.ctrl[i] = p.tag; });
  // capitais
  for (const t in W.nat) {
    const m = NAT[t], mine = WG.provs.filter(p => p.tag === t); if (!mine.length) continue;
    let c = m && mine.find(p => p.name === m.cap);
    if (!c) c = mine.slice().sort((a, b) => (b.big - a.big) || (b.cells - a.cells))[0];
    W.nat[t].cap = c.id;
  }
  computeHomes();
  // guerras de 1º de setembro de 1939
  setWar('GER', 'POL'); setWar('SLO', 'POL'); setWar('JAP', 'CHN'); setWar('MAN', 'CHN');
  // divisões iniciais posicionadas perto dos rivais
  const RIV = { GER: ['POL', 'FRA'], POL: ['GER', 'SLO'], FRA: ['GER', 'ITA'], ENG: [], SOV: ['POL', 'FIN', 'EST', 'LAT', 'ROM', 'MAN'], ITA: ['FRA', 'YUG', 'ENG'], JAP: ['CHN'], CHN: ['JAP', 'MAN'], MAN: ['CHN', 'SOV', 'MON'], USA: [] };
  for (const t in W.nat) {
    const n = W.nat[t], m = NAT[t], total = m ? m.divs : Math.min(4, Math.ceil(WG.provs.filter(p => p.tag === t).length / 4));
    if (!n.cap && n.cap !== 0) continue;
    const home = WG.provs.filter(p => p.tag === t && n.home.has(p.id));
    const rivals = RIV[t] || [];
    const border = WG.provs.filter(p => (p.tag === t || (W.nat[p.tag] && W.nat[p.tag].puppet === t)) && p.adj.some(a => rivals.includes(W.ctrl[a])));
    for (let i = 0; i < total; i++) {
      let pr;
      if (border.length && i < total * 0.72) pr = border[i % border.length];
      else if (i % 3 === 0) pr = WG.provs[n.cap];
      else pr = home[(i * 7) % home.length];
      const type = m && i % (t === 'GER' ? 5 : t === 'SOV' ? 7 : 9) === 1 ? 'tank' : m && i % 6 === 3 && ['GER', 'ENG', 'FRA', 'USA'].includes(t) ? 'mot' : 'inf';
      newDiv(t, type, pr.id);
    }
  }
  // colônias: algumas guarnições
  for (const [t, cities] of [['ENG', ['Cairo', 'Alexandria', 'Jerusalém', 'Cingapura']], ['FRA', ['Argel', 'Túnis', 'Damasco', 'Hanói']], ['ITA', ['Trípoli', 'Benghazi', 'Adis Abeba', 'Tobruk']], ['JAP', ['Seul', 'Mukden', 'Saipan']], ['USA', ['Manila', 'Pearl Harbor']], ['HOL', ['Batávia']], ['RAJ', ['Rangum']]]) {
    for (const c of cities) { const p = WG.provs.find(q => q.name === c && W.ctrl[q.id] === t); if (p) newDiv(t, 'inf', p.id); }
  }
  for (const k of ['GER', 'ITA', 'JAP']) W.nat[k].eq = 1200;
  for (const d of W.divs) if (d.tag === 'CHN') d.str = 0.75;
  logNews('1 de setembro de 1939: a Alemanha invade a Polônia. Começa a Segunda Guerra Mundial.');
}
// núcleo: componente conexo de províncias próprias ligado à capital
function computeHomes() {
  for (const t in W.nat) {
    const n = W.nat[t]; n.home = new Set();
    if (n.cap === null || n.cap === undefined) continue;
    const st = [n.cap]; n.home.add(n.cap);
    while (st.length) { const p = st.pop(); for (const a of WG.provs[p].adj) if (WG.provs[a].tag === t && !n.home.has(a)) { n.home.add(a); st.push(a); } }
    n.homeN = n.home.size;
  }
}
const ORD = (n) => n + 'ª';
function newDiv(tag, type, prov) {
  const n = W.nat[tag]; n.cnt = n.cnt || { inf: 0, mot: 0, tank: 0 }; n.cnt[type]++;
  const nm = type === 'tank' ? (tag === 'GER' ? ORD(n.cnt.tank) + ' Divisão Panzer' : ORD(n.cnt.tank) + ' Divisão Blindada') : type === 'mot' ? ORD(n.cnt.mot) + ' Divisão Motorizada' : ORD(n.cnt.inf) + ' Divisão de Infantaria';
  const d = { id: W.nextId++, tag, type, prov, str: 1, org: 1, path: [], prog: 0, name: nm, naval: null, battle: null };
  W.divs.push(d); return d;
}
/* ---------------- guerra e diplomacia ---------------- */
function warKey(a, b) { return a < b ? a + '|' + b : b + '|' + a; }
function atWar(a, b) { return a !== b && W.wars.includes(warKey(a, b)); }
function setWar(a, b) { if (a === b || atWar(a, b) || W.nat[a].dead || W.nat[b].dead) return; W.wars.push(warKey(a, b)); }
function setPeace(a, b) { const k = warKey(a, b); W.wars = W.wars.filter(x => x !== k); }
function allied(a, b) { if (a === b) return true; const A = W.nat[a], B = W.nat[b]; return !!A.fac && A.fac === B.fac; }
function members(fac) { return Object.values(W.nat).filter(n => n.fac === fac && !n.dead).map(n => n.tag); }
function puppetsOf(t) { return Object.values(W.nat).filter(n => n.puppet === t && !n.dead).map(n => n.tag); }
function enemiesOf(t) { const out = []; for (const k of W.wars) { const [a, b] = k.split('|'); if (a === t) out.push(b); else if (b === t) out.push(a); } return out; }
function inWar(t) { return W.wars.some(k => k.split('|').includes(t)); }
// declaração: o alvo chama o seu bloco; o atacante leva os seus fantoches
function declareWar(att, def, withFaction) {
  if (att === def || allied(att, def)) return;
  const A = [att, ...puppetsOf(att)], D = [def, ...puppetsOf(def)];
  if (withFaction && W.nat[att].fac) for (const m of members(W.nat[att].fac)) if (!A.includes(m)) A.push(m);
  if (W.nat[def].fac) for (const m of members(W.nat[def].fac)) if (!D.includes(m) && !A.includes(m)) D.push(m);
  for (const a of A) for (const d of D) if (!allied(a, d)) setWar(a, d);
}
function joinFaction(t, fac) {
  const n = W.nat[t]; if (!n || n.dead) return; n.fac = fac;
  for (const m of members(fac)) for (const e of enemiesOf(m)) if (e !== t && !allied(e, t) && W.nat[e].fac !== fac) setWar(t, e);
}
function canEnter(t, prov) { const c = W.ctrl[prov]; return c === t || allied(t, c) || atWar(t, c); }

/* ---------------- eventos históricos ---------------- */
const EVENTS = [
  { d: dayOf(1939, 9, 3), who: 'ENG', txt: 'Reino Unido e França declaram guerra à Alemanha.', q: 'Declarar guerra à Alemanha em defesa da Polônia?', run: () => { for (const t of ['ENG', 'FRA', 'CAN', 'AST', 'NZL', 'SAF', 'RAJ']) { setWar(t, 'GER'); setWar(t, 'SLO'); } } },
  { d: dayOf(1939, 9, 17), who: 'SOV', need: ['POL'], txt: 'A União Soviética invade a Polônia pelo leste.', q: 'Invadir o leste da Polônia (Pacto Molotov–Ribbentrop)?', run: () => setWar('SOV', 'POL') },
  { d: dayOf(1939, 11, 30), who: 'SOV', need: ['FIN'], txt: 'Guerra de Inverno: a União Soviética ataca a Finlândia.', q: 'Atacar a Finlândia (Guerra de Inverno)?', run: () => setWar('SOV', 'FIN') },
  { d: dayOf(1940, 3, 13), who: 'SOV', need: ['FIN'], cond: () => atWar('SOV', 'FIN'), txt: 'Paz de Moscou: a Finlândia cede a Carélia.', run: () => { setPeace('SOV', 'FIN'); for (const p of WG.provs) if (W.ctrl[p.id] === 'FIN' && p.lat < 62.5 && p.lon > 27.5) transfer(p.id, 'SOV'); } },
  { d: dayOf(1940, 4, 9), who: 'GER', need: ['NOR', 'DEN'], txt: 'Operação Weserübung: a Alemanha invade a Dinamarca e a Noruega.', q: 'Invadir a Dinamarca e a Noruega?', run: () => { for (const t of ['DEN', 'NOR']) { joinFaction(t, 'aliados'); declareWar('GER', t); } } },
  { d: dayOf(1940, 5, 10), who: 'GER', need: ['HOL', 'BEL'], txt: 'Fall Gelb: a Alemanha invade a Holanda, a Bélgica e Luxemburgo.', q: 'Invadir os Países Baixos e atacar a França pela Bélgica?', run: () => { for (const t of ['HOL', 'BEL', 'LUX']) { joinFaction(t, 'aliados'); declareWar('GER', t); } } },
  { d: dayOf(1940, 6, 10), who: 'ITA', txt: 'A Itália entra na guerra ao lado da Alemanha.', q: 'Entrar no Eixo e declarar guerra ao Reino Unido e à França?', run: () => { W.nat.ITA.fac = 'eixo'; for (const e of ['ENG', 'FRA', 'CAN', 'AST', 'NZL', 'SAF', 'RAJ', 'NOR', 'HOL', 'BEL']) if (!W.nat[e].dead && inWar(e)) setWar('ITA', e); } },
  { d: dayOf(1940, 6, 28), who: 'SOV', txt: 'A União Soviética anexa os países bálticos e a Bessarábia.', q: 'Anexar Estônia, Letônia, Lituânia e a Bessarábia?', run: () => {
    for (const t of ['EST', 'LAT', 'LIT']) if (!W.nat[t].dead && !inWar(t)) annex(t, 'SOV');
    for (const p of WG.provs) if (W.ctrl[p.id] === 'ROM' && p.tag === 'ROM' && p.lon > 26.6 && p.lat > 45.3 && !inWar('ROM')) transfer(p.id, 'SOV');
  } },
  { d: dayOf(1940, 9, 27), who: 'JAP', txt: 'Pacto Tripartite: Japão, Alemanha e Itália formam o Eixo.', q: 'Assinar o Pacto Tripartite e entrar no Eixo?', run: () => { for (const t of ['JAP', 'MAN']) W.nat[t].fac = 'eixo'; } },
  { d: dayOf(1941, 7, 28), who: 'JAP', cond: () => !atWar('JAP', 'FRA'), txt: 'O Japão ocupa a Indochina Francesa.', q: 'Ocupar a Indochina Francesa?', run: () => { for (const p of WG.provs) if (W.ctrl[p.id] === 'FRA' && p.lon > 100 && p.lon < 110 && p.lat > 8 && p.lat < 24) W.ctrl[p.id] = 'JAP'; mapDirty = true; } },
  { d: dayOf(1940, 10, 28), who: 'ITA', need: ['GRE'], txt: 'A Itália invade a Grécia.', q: 'Invadir a Grécia a partir da Albânia?', run: () => { joinFaction('GRE', 'aliados'); declareWar('ITA', 'GRE'); } },
  { d: dayOf(1940, 11, 23), who: 'HUN', txt: 'Hungria, Romênia e Eslováquia aderem ao Eixo.', q: 'Aderir ao Eixo?', run: () => { for (const t of ['HUN', 'ROM', 'SLO']) if (!W.nat[t].dead && !inWar(t) || t === 'SLO') joinFaction(t, 'eixo'); } },
  { d: dayOf(1941, 3, 1), who: 'BUL', txt: 'A Bulgária adere ao Eixo.', q: 'Aderir ao Eixo?', run: () => { if (!inWar('BUL')) joinFaction('BUL', 'eixo'); } },
  { d: dayOf(1941, 4, 6), who: 'GER', need: ['YUG'], txt: 'O Eixo invade a Iugoslávia e a Grécia.', q: 'Invadir a Iugoslávia e a Grécia?', run: () => { joinFaction('YUG', 'aliados'); joinFaction('GRE', 'aliados'); for (const a of ['GER', 'ITA', 'HUN', 'BUL']) if (!W.nat[a].dead) { setWar(a, 'YUG'); setWar(a, 'GRE'); } } },
  { d: dayOf(1941, 6, 22), who: 'GER', need: ['SOV'], txt: 'Operação Barbarossa: o Eixo invade a União Soviética.', q: 'Lançar a Operação Barbarossa contra a União Soviética?', run: () => {
    W.nat.SOV.fac = 'aliados'; W.nat.MON.fac = 'aliados';
    for (const a of ['GER', 'ITA', 'ROM', 'HUN', 'SLO', 'FIN']) if (!W.nat[a].dead) { setWar(a, 'SOV'); setWar(a, 'MON'); }
  } },
  { d: dayOf(1941, 12, 7), who: 'JAP', need: ['USA'], txt: 'Pearl Harbor: o Japão ataca os Estados Unidos, o Reino Unido e a Holanda.', q: 'Atacar Pearl Harbor e as colônias aliadas no Pacífico?', run: () => {
    W.nat.USA.fac = 'aliados';
    for (const a of ['JAP', 'MAN', 'SIA']) for (const d of ['USA', 'ENG', 'HOL', 'AST', 'NZL', 'CAN', 'RAJ', 'SAF']) if (!W.nat[a].dead && !W.nat[d].dead) setWar(a, d);
    W.nat.SIA.fac = 'eixo';
    for (const a of ['GER', 'ITA', 'HUN', 'ROM', 'BUL', 'SLO']) if (!W.nat[a].dead && W.nat[a].fac === 'eixo') setWar(a, 'USA');
  } },
  { d: dayOf(1942, 5, 22), who: 'MEX', txt: 'O México declara guerra ao Eixo.', q: 'Declarar guerra ao Eixo?', run: () => joinFaction('MEX', 'aliados') },
  { d: dayOf(1942, 8, 22), who: 'BRA', txt: 'O Brasil declara guerra ao Eixo. A FEB vai lutar na Itália.', q: 'Declarar guerra ao Eixo?', run: () => joinFaction('BRA', 'aliados') },
  { d: dayOf(1945, 8, 8), who: 'SOV', need: ['JAP'], txt: 'A União Soviética declara guerra ao Japão e invade a Manchúria.', q: 'Declarar guerra ao Japão?', run: () => { setWar('SOV', 'JAP'); setWar('SOV', 'MAN'); setWar('MON', 'JAP'); setWar('MON', 'MAN'); } },
];
function runEvents() {
  for (let i = 0; i < EVENTS.length; i++) {
    const ev = EVENTS[i]; if (W.done[i] || W.day < ev.d) continue;
    W.done[i] = true;
    if (W.nat[ev.who].dead || (ev.need && ev.need.some(t => W.nat[t].dead)) || (ev.cond && !ev.cond())) continue;
    if (ev.who === W.player && ev.q) { askEvent(ev); continue; }
    ev.run(); logNews(dateStr(W.day) + ': ' + ev.txt, true);
  }
}
function transfer(prov, t) { W.ctrl[prov] = t; WG.provs[prov].tag = t; mapDirty = true; }
function annex(t, by) {
  for (const p of WG.provs) if (W.ctrl[p.id] === t || p.tag === t) transfer(p.id, by);
  for (const d of W.divs) if (d.tag === t) d.dead = true;
  W.nat[t].dead = true; W.wars = W.wars.filter(k => !k.split('|').includes(t));
}

/* ---------------- movimento, combate e capitulação ---------------- */
function divsIn(prov) { return W.divs.filter(d => !d.dead && d.prov === prov); }
function findPath(t, from, to) {
  if (from === to) return [];
  const N = WG.provs.length, dist = new Float64Array(N).fill(Infinity), prev = new Int32Array(N).fill(-1), done = new Uint8Array(N);
  dist[from] = 0;
  const open = [from];
  while (open.length) {
    let bi = 0; for (let i = 1; i < open.length; i++) if (dist[open[i]] < dist[open[bi]]) bi = i;
    const u = open.splice(bi, 1)[0]; if (done[u]) continue; done[u] = 1;
    if (u === to) break;
    for (const v of WG.provs[u].adj) {
      if (!canEnter(t, v)) continue;
      const c = W.ctrl[v] === t || allied(t, W.ctrl[v]) ? 1 : 2.5;
      const nd = dist[u] + c * provDist(u, v) / 300;
      if (nd < dist[v]) { dist[v] = nd; prev[v] = u; open.push(v); }
    }
  }
  if (prev[to] < 0) return null;
  const path = []; for (let v = to; v !== from; v = prev[v]) path.unshift(v);
  return path;
}
function orderDiv(d, to) {
  if (d.battle) leaveBattle(d);
  if (d.prov === to) { d.path = []; d.prog = 0; return 'ok'; }
  const p = findPath(d.tag, d.prov, to);
  if (p) { d.path = p; d.prog = 0; d.naval = null; return 'ok'; }
  if (WG.provs[d.prov].coast && WG.provs[to].coast && canEnter(d.tag, to)) {
    const km = provDist(d.prov, to); if (km > 12000) return 'longe';
    d.path = []; d.naval = { to, days: 2 + km / 600, t: 0 }; return 'naval';
  }
  return 'sem caminho';
}
function speedOf(d) { return DIV[d.type].spd * (0.6 + 0.4 * d.org); }
function enterProv(d, p) {
  const c = W.ctrl[p];
  if (c !== d.tag && atWar(d.tag, c)) { W.ctrl[p] = d.tag; mapDirty = true; }
  d.prov = p; d.prog = 0;
}
function stepMoves(dt) {
  for (const d of W.divs) {
    if (d.dead || d.battle) continue;
    if (d.naval) {
      d.naval.t += dt; if (d.naval.t < d.naval.days) continue;
      const to = d.naval.to; d.naval = null;
      if (atWar(d.tag, W.ctrl[to]) && divsIn(to).some(e => atWar(d.tag, e.tag))) { d.path = [to]; d.prog = 1; d.landing = true; startAttack(d, to); }
      else if (canEnter(d.tag, to)) enterProv(d, to);
      continue;
    }
    if (!d.path.length) continue;
    const nx = d.path[0];
    if (!canEnter(d.tag, nx)) { d.path = []; d.prog = 0; continue; }
    d.prog += speedOf(d) * dt / Math.max(60, provDist(d.prov, nx));
    if (d.prog < 1) continue;
    d.prog = 1;
    const c = W.ctrl[nx];
    if (atWar(d.tag, c) && divsIn(nx).some(e => atWar(d.tag, e.tag))) startAttack(d, nx);
    else { d.path.shift(); enterProv(d, nx); }
  }
}
function battleAt(p) { return W.battles.find(b => b.prov === p); }
function startAttack(d, p) {
  let b = battleAt(p);
  if (!b) { b = { id: W.nextId++, prov: p, att: [], def: [], since: W.day, atag: d.tag, dtag: W.ctrl[p] }; W.battles.push(b); battleNotice(b); }
  if (!b.att.includes(d.id)) b.att.push(d.id);
  d.battle = b.id;
}
function leaveBattle(d) {
  const b = W.battles.find(x => x.id === d.battle); d.battle = null;
  if (!b) return;
  b.att = b.att.filter(i => i !== d.id); b.def = b.def.filter(i => i !== d.id);
  if (d.prog >= 1) d.prog = 0.9;
}
const divById = (id) => W.divs.find(d => d.id === id);
// doutrina e preparo de cada exército ao longo da guerra (Blitzkrieg, expurgos do Exército Vermelho...)
function doctrine(t) {
  const y = curYear();
  switch (t) {
    case 'GER': return y < 1941.8 ? 1.35 : y < 1943 ? 1.1 : 0.95;
    case 'SOV': return y < 1942 ? 0.95 : y < 1943.5 ? 1.1 : 1.3;
    case 'JAP': return 1.1; case 'MAN': return 0.95; case 'CHN': return 0.8; case 'ITA': return 0.75; case 'FRA': return 0.85; case 'POL': return 0.85;
    case 'USA': return y < 1943 ? 0.95 : 1.2; case 'ENG': return 1.0; case 'FIN': return 1.35; case 'CAN': case 'AST': case 'NZL': return 1.05;
  }
  return 0.8;
}
function power(list, vsArmor, def, terr) {
  let s = 0;
  for (const d of list) {
    const T = DIV[d.type], n = W.nat[d.tag], tech = 1 + 0.15 * (d.type === 'inf' ? n.tech.inf : (n.tech.armor + n.tech.inf) / 2);
    const base = def ? T.def : T.atk * (1 - vsArmor) + T.hard * 1.6 * vsArmor;
    s += base * tech * doctrine(d.tag) * d.str * (0.4 + 0.6 * d.org);
  }
  return s * (def ? terr : 1);
}
function stepBattles(frac) {
  for (const b of W.battles.slice()) {
    const pr = WG.provs[b.prov];
    // defensores = divisões inimigas do atacante na província
    b.def = divsIn(b.prov).filter(e => !e.dead && atWar(b.atag, e.tag) && (!e.path.length || e.battle === b.id)).map(e => { e.battle = b.id; return e.id; });
    const A = b.att.map(divById).filter(d => d && !d.dead), D = b.def.map(divById).filter(d => d && !d.dead);
    if (!A.length) { endBattleWorld(b, false); continue; }
    if (!D.length) { endBattleWorld(b, true); continue; }
    if (b.paused) continue;
    const armA = A.reduce((s, d) => s + DIV[d.type].armored, 0) / A.length, armD = D.reduce((s, d) => s + DIV[d.type].armored, 0) / D.length;
    const terr = TERR[pr.terr].def * (A.some(d => d.landing) ? 1.5 : 1) * (winterOn(pr) && A.some(d => d.tag !== 'SOV' && d.tag !== 'FIN') ? 1.4 : 1);
    // China: estradas precárias e resistência por toda parte atolam o invasor
    const bog = pr.tag === 'CHN' && b.atag !== 'CHN' ? 0.68 : 1;
    const pa = power(A, armD, false, 1) * supply(b.atag, b.prov) * bog, pd = power(D, armA, true, terr);
    const r = pa / Math.max(0.01, pd), k = frac;
    for (const d of D) { d.org = Math.max(0, d.org - k * 0.22 * r * (0.7 + Math.random() * 0.6)); d.str = Math.max(0.05, d.str - k * 0.035 * r * Math.random()); }
    for (const d of A) { d.org = Math.max(0, d.org - k * 0.2 / r * (0.7 + Math.random() * 0.6)); d.str = Math.max(0.05, d.str - k * 0.03 / r * Math.random()); }
    if (D.every(d => d.org < 0.08)) endBattleWorld(b, true);
    else if (A.every(d => d.org < 0.1)) endBattleWorld(b, false);
  }
}
function retreatOrDie(d, from, enemy) {
  const opts = WG.provs[from].adj.filter(a => (W.ctrl[a] === d.tag || allied(d.tag, W.ctrl[a])) && !battleAt(a));
  if (!opts.length) { d.dead = true; return false; }
  d.prov = opts[(Math.random() * opts.length) | 0]; d.path = []; d.prog = 0; d.org = Math.min(d.org, 0.1); d.battle = null;
  void enemy; return true;
}
function endBattleWorld(b, attWon) {
  W.battles = W.battles.filter(x => x !== b);
  const A = b.att.map(divById).filter(d => d && !d.dead), D = b.def.map(divById).filter(d => d && !d.dead);
  for (const d of A.concat(D)) { d.battle = null; d.landing = false; }
  if (attWon) {
    for (const d of D) retreatOrDie(d, b.prov, b.atag);
    const movers = A.filter(d => d.org > 0.12);
    for (const d of movers) { if (d.path[0] === b.prov) d.path.shift(); enterProv(d, b.prov); }
    if (!movers.length && A.length) { const d = A[0]; if (d.path[0] === b.prov) d.path.shift(); enterProv(d, b.prov); }
    if (A.length) W.ctrl[b.prov] = A[0].tag;
    mapDirty = true;
  } else for (const d of A) { d.path = []; d.prog = 0; }
  if (A.concat(D).some(d => d.tag === W.player) || b.atag === W.player || b.dtag === W.player) {
    const mine = A.some(d => d.tag === W.player) ? attWon : !attWon;
    toastW((mine ? 'Vitória em ' : 'Derrota em ') + WG.provs[b.prov].name + '.', mine ? 'good' : 'bad');
  }
}
// linhas de suprimento: atacar longe da capital custa caro
function supply(t, p) {
  const n = W.nat[t]; if (n.cap === null || n.cap === undefined) return 0.8;
  let km = provDist(n.cap, p);
  const naval = ['USA', 'ENG', 'JAP', 'AST', 'CAN', 'ITA'].includes(t);
  if (naval) { if (!n.ports || W.day - (n.portsDay || -99) > 30) { n.ports = WG.provs.filter(q => q.coast && q.tag === t && W.ctrl[q.id] === t).map(q => q.id); n.portsDay = W.day; } for (const q of n.ports) km = Math.min(km, provDist(q, p)); }
  return clamp(1 - (km - 900) / 3200, 0.45, 1);
}
function winterOn(pr) { const m = dayDate(W.day).getUTCMonth(); return (pr.terr === 'W' || (pr.lat > 45 && pr.tag === 'SOV')) && (m >= 10 || m <= 2); }
function checkCapitulation() {
  for (const t in W.nat) {
    const n = W.nat[t]; if (n.dead || !n.homeN || !inWar(t) || n.exile || n.puppet) continue;
    let mine = 0; for (const p of n.home) if (W.ctrl[p] === t) mine++;
    const frac = mine / n.homeN, capLost = W.ctrl[n.cap] !== t;
    const giant = t === 'SOV' || t === 'CHN';
    if (giant ? frac < 0.25 && capLost || frac < 0.12 : (capLost && frac < 0.5) || frac < 0.22 || (t === 'FRA' && capLost && frac < 0.62)) capitulate(t);
  }
}
function capitulate(t) {
  const n = W.nat[t], cnt = {};
  for (const p of n.home) { const c = W.ctrl[p]; if (c !== t) cnt[c] = (cnt[c] || 0) + 1; }
  const winner = Object.keys(cnt).filter(c => atWar(c, t)).sort((a, b) => cnt[b] - cnt[a])[0] || enemiesOf(t)[0];
  const colonies = WG.provs.filter(p => W.ctrl[p.id] === t && p.tag === t && !n.home.has(p.id));
  // territórios inimigos que o capitulado ocupava voltam ao dono (ou a um aliado dele em guerra)
  for (const p of WG.provs) if (W.ctrl[p.id] === t && p.tag !== t) {
    const o = W.nat[p.tag];
    const back = o && !o.dead && atWar(p.tag, t) ? p.tag : winner;
    W.ctrl[p.id] = back || p.tag;
  }
  for (const d of W.divs) if (d.tag === t && W.ctrl[d.prov] !== t) d.dead = true;
  logNews(dateStr(W.day) + ': ' + n.name + ' capitula' + (winner ? ' diante de ' + nameOf(winner) : '') + '.', true);
  if (t === W.player) { gameOverWorld(false, n.name + ' capitulou. A guerra acabou para você.'); }
  for (const p of WG.provs) if (W.ctrl[p.id] === t && n.home.has(p.id)) transfer(p.id, winner && atWar(winner, t) ? winner : W.ctrl[p.id]);
  for (const d of W.divs) if (d.tag === t && n.home.has(d.prov)) d.dead = true;
  if (colonies.length > 3 && t === 'FRA') {
    // governo colaboracionista: sai da guerra e fica com o império
    n.name = 'França de Vichy'; n.fac = null; n.homeN = 0;
    W.wars = W.wars.filter(k => !k.split('|').includes(t));
    for (const d of W.divs) if (d.tag === t && !d.dead) { d.path = []; d.battle = null; }
  } else if (colonies.length > 3 && n.fac === 'aliados') {
    n.exile = true; n.name = n.name + ' (no exílio)';
  } else {
    for (const p of colonies) transfer(p.id, winner || W.ctrl[p.id]);
    for (const d of W.divs) if (d.tag === t) d.dead = true;
    n.dead = true; W.wars = W.wars.filter(k => !k.split('|').includes(t));
  }
  // fantoches caem junto
  for (const pp of puppetsOf(t)) if (!W.nat[pp].dead) capitulate(pp);
  mapDirty = true; checkVictory();
}

/* ---------------- produção, pesquisa e reforços ---------------- */
function techCost(n, br) { const lvl = n.tech[br]; if (lvl >= 4) return Infinity; const ahead = Math.max(0, TECH[br].years[lvl + 1] - curYear()); return 140 * (1 + 0.8 * ahead); }
function dailyEconomy() {
  const y = curYear();
  for (const t in W.nat) {
    const n = W.nat[t]; if (n.dead) continue;
    // indústria cresce em guerra; EUA acelera depois de 1940
    if (W.day % 30 === 0) {
      const war = inWar(t);
      if (t === 'USA') n.mil += y > 1941.9 ? 6 : y > 1940.4 ? 2 : 0;
      else if (war && MAJORS.includes(t)) n.mil += t === 'SOV' && y > 1941.5 ? 3 : 1;
      n.mp += (MAJORS.includes(t) ? 40 : 6) * (t === 'SOV' || t === 'CHN' ? 2 : 1);
    }
    const out = n.mil * (1 + 0.1 * n.tech.ind) * (S.free && S.free.res && t === W.player ? 20 : 1);
    n.eq += out;
    // fila de produção
    while (n.queue.length) {
      const q = n.queue[0], T = DIV[q], cost = T.cost * (t === 'SOV' ? 0.6 : t === 'CHN' ? 0.6 : 1);
      if (n.eq < cost || n.mp < T.mp) break;
      n.eq -= cost; n.mp -= T.mp; n.queue.shift();
      const d = newDiv(t, q, deployProv(t)); if (t === W.player) toastW(d.name + ' pronta em ' + WG.provs[d.prov].name + '.', 'good');
    }
    // suprimento: ligação por terra com a capital, ou por um porto próprio/aliado
    let sup = null;
    if (inWar(t) && n.cap !== null && n.cap !== undefined && W.ctrl[n.cap] === t) {
      sup = new Uint8Array(WG.provs.length); const q = [n.cap]; sup[n.cap] = 1;
      for (const p of WG.provs) if (p.coast && W.ctrl[p.id] === t && !sup[p.id]) { sup[p.id] = 1; q.push(p.id); }   // portos próprios também abastecem
      for (let i = 0; i < q.length; i++) for (const a of WG.provs[q[i]].adj) if (!sup[a] && (W.ctrl[a] === t || allied(t, W.ctrl[a]))) { sup[a] = 1; q.push(a); }
    }
    // reforço das divisões fora de combate
    for (const d of W.divs) if (d.tag === t && !d.dead && !d.battle) {
      if (sup && !sup[d.prov] && !WG.provs[d.prov].coast) { d.org = Math.max(0.03, d.org - 0.2); d.str = Math.max(0.05, d.str - 0.03); d.cut = true; continue; }
      d.cut = false;
      d.org = Math.min(1, d.org + 0.12);
      if (d.str < 1 && n.mp > 1) { const add = Math.min(0.04, 1 - d.str); d.str += add; n.mp -= add * 10; }
    }
    // pesquisa
    if (n.res) { n.resP += 1 * (1 + 0.05 * n.tech.ind); if (n.resP >= techCost(n, n.res)) { n.tech[n.res]++; if (t === W.player) toastW('Pesquisa concluída: ' + TECH[n.res].n + ' nível ' + n.tech[n.res] + ' — ' + eraNote(t, n.res), 'good'); n.res = null; n.resP = 0; } }
    if (!n.res && t !== W.player) { const br = ['armor', 'inf', 'ind'].sort((a, b) => n.tech[a] - n.tech[b])[0]; if (n.tech[br] < 4) n.res = br; }
  }
}
function eraNote(t, br) {
  if (br === 'armor') return 'novo blindado: ' + vehName(eraKind('tank', t));
  if (br === 'inf') return n2(W.nat[t].tech.inf >= 3 ? 'armas antitanque portáteis' : 'mais poder de fogo');
  return '+10% de produção';
}
function n2(s) { return s; }
function deployProv(t) {
  const n = W.nat[t];
  if (n.cap !== null && W.ctrl[n.cap] === t) return n.cap;
  const own = WG.provs.filter(p => W.ctrl[p.id] === t);
  return own.length ? own[0].id : n.cap;
}
function eraKind(role, t) {
  const n = W.nat[t], lvl = clamp(n.tech.armor, 0, 4), tab = ERA[role];
  const list = tab[t] || (role === 'light' && n.look === 'de' ? tab._de : null) || tab['_' + (n.fac || '')] || tab._;
  return list[lvl];
}
function vehName(k) { return (UT[k] && UT[k].name) || k; }

/* ---------------- IA ---------------- */
function hostile(a, b) { const A = W.nat[a], B = W.nat[b]; return !!(A.fac && B.fac && A.fac !== B.fac && (A.fac !== 'japao' || B.fac === 'aliados') && !(A.fac === 'comintern' && B.fac === 'aliados') && !(B.fac === 'comintern' && A.fac === 'aliados')); }
function capDivs(t, n) { return MAJORS.includes(t) ? (24 + n.mil * 1.1) * (t === 'SOV' ? 1.5 : t === 'CHN' ? 1.1 : 1) : 2 + n.mil * 2; }
function myLand(t, p) { const c = W.ctrl[p]; return c === t || (W.nat[c] && W.nat[c].puppet === t); }
function aiStep() {
  const N = WG.provs.length;
  for (const t in W.nat) {
    const n = W.nat[t]; if (n.dead || (t === W.player && !W.auto)) continue;
    const war = inWar(t), all = W.divs.filter(d => d.tag === t && !d.dead && !d.manual);
    // produção
    if (n.queue.length < 1 && all.length < capDivs(t, n)) {
      const r = Math.random(), tankR = { GER: 0.28, SOV: 0.2, USA: 0.28, ENG: 0.2, JAP: 0.08 }[t] || 0.06;
      n.queue.push(r < tankR ? 'tank' : r < tankR + 0.15 && MAJORS.includes(t) ? 'mot' : 'inf');
    }
    // peso de cada província de fronteira: guerra real pesa 1+, vizinho hostil (bloco rival) pesa pouco
    const weight = new Float32Array(N); let wsum = 0, nf = 0;
    for (let p = 0; p < N; p++) {
      if (!myLand(t, p)) continue;
      let w = 0;
      for (const a of WG.provs[p].adj) { const c = W.ctrl[a]; if (c === t || c === undefined) continue; if (atWar(t, c)) w += 1 + power(divsIn(a).filter(e => e.tag === c), 0, false, 1) / 12; else if (hostile(t, c)) w += 0.3; }
      if (w > 0) { weight[p] = w; wsum += w; nf++; }
    }
    if (!nf) { if (war) for (const d of all) if (!d.battle && !d.naval && !d.path.length) aiNaval(t, d); continue; }
    const count = new Int32Array(N);
    for (const d of all) count[d.path.length ? d.path[d.path.length - 1] : d.prov]++;
    const want = (p) => Math.max(1, Math.round(all.length * 0.85 * weight[p] / wsum));
    // campo de distância até as fronteiras
    const dist = new Int32Array(N).fill(-1), q = [];
    for (let p = 0; p < N; p++) if (weight[p] > 0) { dist[p] = 0; q.push(p); }
    for (let i = 0; i < q.length; i++) for (const a of WG.provs[q[i]].adj) if (dist[a] < 0 && (myLand(t, a) || allied(t, W.ctrl[a]))) { dist[a] = dist[q[i]] + 1; q.push(a); }
    // fronteira vazia: puxa a divisão livre mais próxima (busca pelo próprio território)
    const idleAt = new Map();
    for (const d of all) if (!d.battle && !d.naval && !d.path.length) { let l = idleAt.get(d.prov); if (!l) idleAt.set(d.prov, l = []); l.push(d); }
    for (let p = 0; p < N; p++) {
      if (!(weight[p] > 0) || count[p] > 0) continue;
      const par = new Map([[p, -1]]); let fr = [p], found = null;
      for (let depth = 0; depth < 9 && fr.length && !found; depth++) {
        const nx = [];
        for (const u of fr) {
          const l = idleAt.get(u);
          if (l && l.length && (weight[u] === 0 || count[u] > 1)) { found = l.pop(); break; }
          for (const a of WG.provs[u].adj) if (!par.has(a) && (myLand(t, a) || allied(t, W.ctrl[a]))) { par.set(a, u); nx.push(a); }
        }
        fr = nx;
      }
      if (!found) continue;
      const path = []; for (let v = par.get(found.prov); v !== -1 && v !== undefined; v = par.get(v)) path.push(v);
      if (path.length) { found.path = path; found.prog = 0; count[found.prov]--; count[p]++; }
    }
    const phoney = (t === 'FRA' || t === 'ENG' || t === 'BEL' || t === 'HOL') && W.day < dayOf(1940, 5, 10);
    const y = curYear();
    const aggr = n.aggr * (phoney ? 5 : 1) * (t === 'SOV' && y < 1942.85 ? 1.35 : 1) * (t === 'GER' && y > 1943.5 ? 1.4 : 1);
    let keptCap = n.cap === null || !myLand(t, n.cap);
    for (const d of all) {
      if (d.battle || d.naval || d.path.length) continue;
      if (!keptCap && d.prov === n.cap) { keptCap = true; if (weight[d.prov] === 0) continue; }
      const p = d.prov;
      if (weight[p] > 0) {
        // na fronteira: ataca o vizinho inimigo mais fraco se tiver vantagem, sem largar a posição sozinha
        if (war && d.org > 0.6) {
          let best = null, bs = Infinity;
          for (const a of WG.provs[p].adj) {
            if (!atWar(t, W.ctrl[a])) continue;
            const s2 = power(divsIn(a).filter(e => atWar(t, e.tag)), 0, true, TERR[WG.provs[a].terr].def);
            if (s2 < bs) { bs = s2; best = a; }
          }
          if (best !== null) {
            const here = divsIn(p).filter(e => e.tag === t && !e.path.length && !e.battle);
            const mp = power(here, 0, false, 1);
            if ((bs === 0 && (here.length > 1 || Math.random() < 0.5)) || (here.length > 1 && mp > bs * aggr)) { d.path = [best]; d.prog = 0; count[p]--; count[best]++; continue; }
          }
        }
        // sobra aqui: espalha para a fronteira vizinha mais desfalcada
        if (count[p] > want(p) + 1) {
          let best = null, bd = 0;
          for (const a of WG.provs[p].adj) if (weight[a] > 0 && myLand(t, a)) { const def = want(a) - count[a]; if (def > bd) { bd = def; best = a; } }
          if (best !== null) { d.path = [best]; d.prog = 0; count[p]--; count[best]++; }
        }
      } else if (dist[p] > 0) {
        if (war && ['JAP', 'USA', 'ENG', 'AST'].includes(t) && WG.provs[p].coast && Math.random() < 0.06) { aiNaval(t, d); if (d.naval) continue; }
        let best = null, bd = dist[p];
        for (const a of WG.provs[p].adj) if (dist[a] >= 0 && dist[a] < bd) { bd = dist[a]; best = a; }
        if (best !== null) { d.path = [best]; d.prog = 0; }
      } else if (war) aiNaval(t, d);
    }
  }
}
// sem frente terrestre: invasões navais contra províncias costeiras fracas
function aiNaval(t, d) {
  const y = curYear();
  if (!['JAP', 'USA', 'ENG', 'AST', 'CAN', 'NZL'].includes(t)) return;
  if (!WG.provs[d.prov].coast || Math.random() > 0.15) return;
  if ((t === 'ENG' || t === 'USA' || t === 'CAN' || t === 'AST') && y < 1942.8) return;
  if (t === 'JAP' && y < 1941.9 && !atWar('JAP', 'USA')) { if (!enemiesOf(t).includes('CHN')) return; }
  const foes = enemiesOf(t); if (!foes.length) return;
  // invasão coordenada: um alvo por vez, até 8 divisões
  const n = W.nat[t];
  if (!n.inv || W.day > n.inv.until || !atWar(t, W.ctrl[n.inv.to]) || n.inv.sent >= 8) {
    if (n.inv && W.day <= n.inv.until && n.inv.sent >= 8) return;
    let best = null, bs = Infinity;
    for (const p of WG.provs) {
      if (!p.coast || !foes.includes(W.ctrl[p.id])) continue;
      const km = provDist(d.prov, p.id); if (km > 11000) continue;
      const s2 = power(divsIn(p.id).filter(e => atWar(t, e.tag)), 0, true, 1) * 4 + km / 900 + (MAJORS.includes(W.ctrl[p.id]) ? 0 : 6);
      if (s2 < bs) { bs = s2; best = p.id; }
    }
    if (best === null) return;
    n.inv = { to: best, until: W.day + 75, sent: 0 };
  }
  if (orderDiv(d, n.inv.to) === 'naval') n.inv.sent++;
}
function checkVictory() {
  if (W.over) return;
  const p = W.nat[W.player]; if (p.dead) return;
  const enemies = enemiesOf(W.player).filter(e => MAJORS.includes(e));
  if (inWar(W.player) && !enemies.length && W.day > 60) {
    const anyMajorFoe = Object.values(W.nat).some(n => !n.dead && MAJORS.includes(n.tag) && atWar(n.tag, W.player));
    if (!anyMajorFoe) gameOverWorld(true, 'Todos os seus inimigos principais capitularam. ' + p.name + ' venceu a guerra!');
  }
}

/* ---------------- relógio ---------------- */
const SPEED_SEC = [0, 2.2, 1.2, 0.6, 0.28, 0.12];   // segundos reais por dia
let dayAcc = 0;
function worldTick(dt) {
  if (!W || W.paused || W.over || popupOpen) return;
  dayAcc += dt / SPEED_SEC[W.speed];
  let n = 0;
  while (dayAcc >= 0.25 && n++ < 24) {
    dayAcc -= 0.25; W.hour += 6;
    stepMoves(0.25); stepBattles(0.25);
    if (W.hour >= 24) { W.hour = 0; W.day++; newDay(); }
  }
}
function newDay() {
  runEvents(); dailyEconomy();
  if (W.day % 2 === 0) aiStep();
  checkCapitulation();
  W.divs = W.divs.filter(d => !d.dead);
  if (W.day % 15 === 0) saveWorld();
  if (dayDate(W.day).getUTCFullYear() >= 1946 && !W.over) gameOverWorld(nationScore() >= 0, 'A guerra terminou. ' + scoreText());
}
function nationScore() { const n = W.nat[W.player]; let own = 0; for (const p of n.home) if (W.ctrl[p] === W.player) own++; return own / Math.max(1, n.homeN) - 0.5; }
function scoreText() { const own = WG.provs.filter(p => W.ctrl[p.id] === W.player).length; return W.nat[W.player].name + ' termina controlando ' + own + ' províncias.'; }

/* ---------------- salvar ---------------- */
function saveWorld() {
  if (!W) return;
  try {
    const nat = {}; for (const t in W.nat) { const n = W.nat[t]; nat[t] = Object.assign({}, n, { home: [...n.home] }); }
    localStorage.setItem('diad-mundo', JSON.stringify(Object.assign({}, W, { nat, owner: WG.provs.map(p => p.tag) })));
  } catch (e) { /* sem espaço */ }
}
function loadWorld() {
  try {
    const s = JSON.parse(localStorage.getItem('diad-mundo') || 'null'); if (!s || s.v !== 1) return false;
    W = s; W.paused = true;
    for (const t in W.nat) W.nat[t].home = new Set(W.nat[t].home);
    if (s.owner) s.owner.forEach((t, i) => { WG.provs[i].tag = t; });
    delete W.owner; return true;
  } catch (e) { return false; }
}

/* =========================================================
   VISUAL: textura política, globo 3D e mapa plano (estilo HoI4)
   ========================================================= */
let TEXW = 4096, TEXH = 2048; const LATT = MUNDO_DADOS.lat0, LATB = MUNDO_DADOS.lat0 - MUNDO_DADOS.h * MUNDO_DADOS.res;
const tx = (lon) => (lon + 180) / 360 * TEXW, ty = (lat) => (LATT - lat) / (LATT - LATB) * TEXH;
let mapDirty = true, mapT = 0, mapCanvas = null, mapTex = null, mapStyle = 'globo';
const TERR_TINT = { N: '#6d7d4a', S: '#8a8a5a', D: '#c8b07c', W: '#c8ccc6', T: '#3f6a34', M: '#8a8274' };
function drawMap() {
  if (!mapCanvas) {
    // celulares e gráficos leves: textura menor (desenho bem mais rápido)
    if ((typeof GFX !== 'undefined' && GFX === 'low') || window.innerWidth * (window.devicePixelRatio || 1) < 1500) { TEXW = 2048; TEXH = 1024; }
    mapCanvas = document.createElement('canvas'); mapCanvas.width = TEXW; mapCanvas.height = TEXH;
  }
  const K = TEXW / 4096;
  const g = mapCanvas.getContext('2d'), pol = mapStyle === 'plano';
  // mar
  const sea = g.createLinearGradient(0, 0, 0, TEXH); sea.addColorStop(0, '#2a4a66'); sea.addColorStop(0.5, '#1f3f5c'); sea.addColorStop(1, '#2a4a66');
  g.fillStyle = sea; g.fillRect(0, 0, TEXW, TEXH);
  g.globalAlpha = 0.07; g.strokeStyle = '#9fc3dc'; g.lineWidth = 1;
  for (let lon = -180; lon <= 180; lon += 15) { g.beginPath(); g.moveTo(tx(lon), 0); g.lineTo(tx(lon), TEXH); g.stroke(); }
  for (let lat = -60; lat <= 80; lat += 15) { g.beginPath(); g.moveTo(0, ty(lat)); g.lineTo(TEXW, ty(lat)); g.stroke(); }
  g.globalAlpha = 1;
  const path = (p) => { g.beginPath(); for (const r of p.poly) { r.forEach((q, i) => { const x = tx(q[0]), y = ty(q[1]); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); } };
  // brilho da costa no mar
  g.lineJoin = 'round';
  g.strokeStyle = 'rgba(150,200,215,0.28)'; g.lineWidth = 9 * K;
  for (const p of WG.provs) if (p.coast) { path(p); g.stroke(); }
  // províncias
  for (const p of WG.provs) {
    const c = W ? W.ctrl[p.id] : p.tag, n = W && W.nat[c];
    let col = n ? n.color : NAT[c] ? NAT[c].c : hashColor(c);
    if (!pol) col = mixHex(col, TERR_TINT[p.terr], 0.35);
    path(p); g.fillStyle = col; g.fill('evenodd');
    if (W && p.tag !== c) { // ocupada: listras com a cor do dono
      g.save(); g.clip('evenodd'); g.strokeStyle = W.nat[p.tag] ? W.nat[p.tag].color : '#888'; g.globalAlpha = 0.55; g.lineWidth = 3 * K;
      const b = p.bb, x0 = tx(b[0]), x1 = tx(b[2]), y0 = ty(b[3]), y1 = ty(b[1]);
      for (let s = x0 - (y1 - y0); s < x1; s += 9 * K) { g.beginPath(); g.moveTo(s, y1); g.lineTo(s + (y1 - y0), y0); g.stroke(); }
      g.restore();
    }
  }
  // fronteiras: província (fina), país (grossa), costa
  for (const a of WG.arcs) {
    const [l, r] = a.side, cl = l < 0 ? null : (W ? W.ctrl[l] : WG.provs[l].tag), cr = r < 0 ? null : (W ? W.ctrl[r] : WG.provs[r].tag);
    g.beginPath(); a.forEach((q, i) => { const x = tx(q[0]), y = ty(q[1]); i ? g.lineTo(x, y) : g.moveTo(x, y); });
    if (l < 0 || r < 0) { g.strokeStyle = 'rgba(20,30,34,0.85)'; g.lineWidth = 2.2 * K; }
    else if (cl !== cr) { g.strokeStyle = 'rgba(16,16,16,0.9)'; g.lineWidth = 3.2 * K; }
    else { g.strokeStyle = 'rgba(20,20,20,0.28)'; g.lineWidth = Math.max(0.6, 1.1 * K); }
    g.stroke();
  }
  // frentes de batalha em vermelho
  if (W) {
    g.strokeStyle = 'rgba(220,40,30,0.9)'; g.lineWidth = 4 * K;
    for (const a of WG.arcs) { const [l, r] = a.side; if (l < 0 || r < 0) continue; if (atWar(W.ctrl[l], W.ctrl[r]) && (W.ctrl[l] === W.player || W.ctrl[r] === W.player)) { g.beginPath(); a.forEach((q, i) => { const x = tx(q[0]), y = ty(q[1]); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke(); } }
  }
  // nomes dos países: um por bloco contínuo de território (como no HoI)
  if (W) {
    const seen = new Uint8Array(WG.provs.length);
    g.textAlign = 'center'; g.textBaseline = 'middle';
    for (const p0 of WG.provs) {
      if (seen[p0.id]) continue;
      const t = W.ctrl[p0.id], comp = [p0.id]; seen[p0.id] = 1;
      for (let i = 0; i < comp.length; i++) for (const a of WG.provs[comp[i]].adj) if (!seen[a] && W.ctrl[a] === t) { seen[a] = 1; comp.push(a); }
      let x = 0, y = 0, n = 0, x0 = 999, x1 = -999;
      for (const id of comp) { const p = WG.provs[id]; x += p.lon * p.cells; y += p.lat * p.cells; n += p.cells; x0 = Math.min(x0, p.lon); x1 = Math.max(x1, p.lon); }
      if (n < 60 || x1 - x0 > 220) continue;
      const fs = Math.min(58, 8 + Math.sqrt(n) * 1.7) * K;
      g.font = '700 ' + fs + 'px "Barlow Condensed", Arial Narrow, sans-serif';
      const X = tx(x / n), Y = ty(y / n), txt = nameOf(t).toUpperCase().split('').join(String.fromCharCode(8202));
      g.lineWidth = fs * 0.14; g.strokeStyle = 'rgba(0,0,0,0.45)'; g.strokeText(txt, X, Y); g.fillStyle = 'rgba(255,255,255,0.82)'; g.fillText(txt, X, Y);
    }
  }
  if (!mapTex) { mapTex = new THREE.CanvasTexture(mapCanvas); mapTex.anisotropy = 4; }
  mapTex.needsUpdate = true; mapDirty = false;
}
function mixHex(a, b, k) { const A = new THREE.Color(a), B = new THREE.Color(b); return '#' + A.lerp(B, k).getHexString(); }

const WV = { scene: null, cam: null, globe: null, flat: null, lon: 15, lat: 45, dist: 260, fx: 15, fz: -45, fh: 120, arrows: null, figs: new Map(), sel: null, selProv: null, hover: null, rot: 0 };
const GR = 100, FLAT_K = 1.2;
function initWorldView() {
  if (WV.scene) return;
  const sc = WV.scene = new THREE.Scene();
  sc.background = new THREE.Color(0x05080c);
  WV.cam = new THREE.PerspectiveCamera(42, 1, 0.5, 4000);
  sc.add(new THREE.HemisphereLight(0xdfe8ee, 0x30302a, 0.75));
  const sunL = new THREE.DirectionalLight(0xfff4e0, 0.75); sunL.position.set(300, 200, 260); sc.add(sunL);
  drawMap();
  // globo com UV próprio (faixa 84°N–60°S da textura)
  const SEG = 192, RING = 96, pos = [], uv = [], idx = [];
  for (let j = 0; j <= RING; j++) {
    const lat = 90 - j / RING * 180;
    for (let i = 0; i <= SEG; i++) {
      const lon = -180 + i / SEG * 360, v = globePos(lon, lat, GR);
      pos.push(v.x, v.y, v.z); uv.push(i / SEG, 1 - clamp((LATT - lat) / (LATT - LATB), 0.0005, 0.9995));
    }
  }
  for (let j = 0; j < RING; j++) for (let i = 0; i < SEG; i++) { const a = j * (SEG + 1) + i, b = a + 1, c = a + SEG + 1, d = c + 1; idx.push(a, c, b, b, c, d); }
  const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); gg.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); gg.setIndex(idx); gg.computeVertexNormals();
  WV.globe = new THREE.Group(); sc.add(WV.globe);
  WV.globeMesh = new THREE.Mesh(gg, new THREE.MeshPhongMaterial({ map: mapTex, shininess: 12, specular: 0x223344 }));
  WV.globe.add(WV.globeMesh);
  const ant = new THREE.Mesh(new THREE.SphereGeometry(GR * 1.002, 64, 12, 0, Math.PI * 2, Math.PI * (90 + 63) / 180, Math.PI * 27 / 180), new THREE.MeshLambertMaterial({ color: 0xe8eef2 }));
  WV.globe.add(ant);
  const arc = new THREE.Mesh(new THREE.SphereGeometry(GR * 1.001, 64, 8, 0, Math.PI * 2, 0, Math.PI * 6 / 180), new THREE.MeshLambertMaterial({ color: 0xdfe8ee }));
  WV.globe.add(arc);
  const atm = new THREE.Mesh(new THREE.SphereGeometry(GR * 1.06, 64, 32), new THREE.ShaderMaterial({
    side: THREE.BackSide, transparent: true, depthWrite: false,
    vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'varying vec3 vN; void main(){ float k = pow(0.72 - dot(vN, vec3(0.0,0.0,1.0)), 2.2); gl_FragColor = vec4(0.45,0.7,1.0,1.0) * k; }',
  }));
  WV.globe.add(atm);
  // estrelas
  const sp = new Float32Array(3000);
  for (let i = 0; i < 3000; i += 3) { const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(1500 + Math.random() * 600); sp[i] = v.x; sp[i + 1] = v.y; sp[i + 2] = v.z; }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  WV.stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false })); sc.add(WV.stars);
  // mapa plano (mesa de guerra)
  const fw = 360, fh = (LATT - LATB) * FLAT_K;
  const fg = new THREE.PlaneGeometry(fw, fh, 1, 1); fg.rotateX(-Math.PI / 2);
  WV.flat = new THREE.Group(); sc.add(WV.flat);
  WV.flatMesh = new THREE.Mesh(fg, new THREE.MeshLambertMaterial({ map: mapTex })); WV.flatMesh.position.set(0, 0, -(LATT + LATB) / 2 * FLAT_K); WV.flat.add(WV.flatMesh);
  const table = new THREE.Mesh(new THREE.BoxGeometry(fw + 24, 6, fh + 24), new THREE.MeshLambertMaterial({ color: 0x3a2a1c })); table.position.set(0, -3.2, WV.flatMesh.position.z); WV.flat.add(table);
  WV.arrows = new THREE.Group(); sc.add(WV.arrows);
  WV.figRoot = new THREE.Group(); sc.add(WV.figRoot);
  setMapStyle(mapStyle);
}
function globePos(lon, lat, r) {
  const a = lat * Math.PI / 180, b = lon * Math.PI / 180;
  return new THREE.Vector3(r * Math.cos(a) * Math.sin(b), r * Math.sin(a), r * Math.cos(a) * Math.cos(b));
}
function flatPos(lon, lat, h) { return new THREE.Vector3(lon, h || 0, -lat * FLAT_K); }
function mapPos(lon, lat, h) { return mapStyle === 'plano' ? flatPos(lon, lat, h) : globePos(lon, lat, GR + (h || 0) * 0.35); }
function setMapStyle(s) {
  mapStyle = s;
  if (!WV.scene) return;
  WV.globe.visible = s === 'globo'; WV.flat.visible = s === 'plano'; WV.stars.visible = s === 'globo';
  WV.scene.background.setHex(s === 'globo' ? 0x05080c : 0x1b1712);
  mapDirty = true;
  const b = document.getElementById('wStyle'); if (b) b.textContent = s === 'globo' ? 'Mapa: Globo 3D' : 'Mapa: Plano (HoI)';
}
function updWorldCamera() {
  const c = WV.cam;
  if (typeof Z3 !== 'undefined') { Z3.camera(c); return; }
  c.aspect = window.innerWidth / window.innerHeight; c.updateProjectionMatrix();
  if (mapStyle === 'globo') {
    WV.dist = clamp(WV.dist, GR * 1.18, GR * 4.2); WV.lat = clamp(WV.lat, -70, 80);
    const p = globePos(WV.lon, WV.lat, WV.dist);
    c.position.copy(p); c.up.set(0, 1, 0); c.lookAt(0, 0, 0);
  } else {
    WV.fh = clamp(WV.fh, 8, 260); WV.fx = clamp(WV.fx, -180, 180); WV.fz = clamp(WV.fz, LATB, LATT);
    const tz = -WV.fz * FLAT_K, pitch = 0.95 + (WV.fh / 260) * 0.45;
    c.position.set(WV.fx, WV.fh, tz + WV.fh / Math.tan(pitch)); c.up.set(0, 1, 0); c.lookAt(WV.fx, 0, tz);
  }
}
// raio da câmera → (lon, lat)
const wRay = new THREE.Raycaster(), wNdc = new THREE.Vector2();
function screenLonLat(sx, sy) {
  wNdc.set(sx / window.innerWidth * 2 - 1, -(sy / window.innerHeight) * 2 + 1);
  wRay.setFromCamera(wNdc, WV.cam);
  const z = typeof Z3 !== 'undefined' && Z3.pick(wRay); if (z) return z;
  const hit = wRay.intersectObject(mapStyle === 'globo' ? WV.globeMesh : WV.flatMesh, false)[0];
  if (!hit) return null;
  const p = hit.point;
  if (mapStyle === 'globo') return { lon: Math.atan2(p.x, p.z) * 180 / Math.PI, lat: Math.asin(clamp(p.y / p.length(), -1, 1)) * 180 / Math.PI };
  return { lon: p.x, lat: -p.z / FLAT_K };
}
function lookAtProv(id) { const p = WG.provs[id]; WV.lon = p.lon; WV.lat = p.lat; WV.fx = p.lon; WV.fz = p.lat; }

/* ---------------- figuras 3D das divisões e setas ---------------- */
const FIG_GEO = {};
function figGeo(type) {
  if (FIG_GEO[type]) return FIG_GEO[type];
  const B = new GeoBuilder();
  if (type === 'tank') {
    B.add(G.box, 0xffffff, 1.6, 0.5, 2.6, 0, 0.45, 0); B.add(G.box, 0x333333, 1.9, 0.35, 2.8, 0, 0.2, 0);
    B.add(G.cyl12, 0xffffff, 0.55, 0.4, 0.55, 0, 0.9, -0.1); B.add(G.cyl8, 0xdddddd, 0.09, 1.6, 0.09, 0, 0.9, 0.9, Math.PI / 2, 0, 0);
  } else {
    for (const x of [-0.5, 0.5]) {
      B.add(G.cyl8, 0xffffff, 0.22, 0.8, 0.22, x, 0.6, 0); B.add(G.sph, 0xd2a17a, 0.16, 0.16, 0.16, x, 1.15, 0); B.add(G.dome, 0x555544, 0.22, 0.16, 0.22, x, 1.2, 0);
      B.add(G.cyl8, 0x332211, 0.04, 0.9, 0.04, x + 0.18, 0.85, 0.1, 0.5, 0, 0);
    }
    if (type === 'mot') { B.add(G.box, 0xffffff, 1.4, 0.7, 2.4, 0, 0.55, -1.6); B.add(G.box, 0x333333, 1.5, 0.3, 2.4, 0, 0.2, -1.6); }
  }
  const g = B.build(); FIG_GEO[type] = g; return g;
}
// figuras instanciadas: uma chamada de desenho por tipo (infantaria, motorizada, blindada)
const FIG_INST = {};
const _fm = new THREE.Matrix4(), _fq = new THREE.Quaternion(), _fs = new THREE.Vector3(), _fc = new THREE.Color(), _fup = new THREE.Vector3(0, 1, 0);
function updFigures() {
  const stacks = stackList(), sc = mapStyle === 'globo' ? 0.9 : 0.55, n = { inf: 0, mot: 0, tank: 0 };
  for (const type of ['inf', 'mot', 'tank']) if (!FIG_INST[type]) {
    const m = new THREE.InstancedMesh(figGeo(type), new THREE.MeshLambertMaterial({ vertexColors: true }), 1200);
    for (let i = 0; i < 1200; i++) m.setColorAt(i, _fc.set(0xffffff));   // cria a cor por instância antes do 1º desenho
    m.count = 0; m.frustumCulled = false; WV.figRoot.add(m); FIG_INST[type] = m;
  }
  for (const st of stacks) {
    const type = st.divs.some(d => d.type === 'tank') ? 'tank' : st.divs.some(d => d.type === 'mot') ? 'mot' : 'inf', m = FIG_INST[type];
    if (n[type] >= 1200) continue;
    const p = WG.provs[st.prov], pos = mapPos(p.lon, p.lat, 0.3);
    if (mapStyle === 'globo') _fq.setFromUnitVectors(_fup, pos.clone().normalize()); else _fq.identity();
    _fm.compose(pos, _fq, _fs.set(sc, sc, sc));
    m.setMatrixAt(n[type], _fm); m.setColorAt(n[type], _fc.set(W.nat[st.tag].color)); n[type]++;
  }
  for (const type in FIG_INST) { const m = FIG_INST[type]; m.count = n[type]; m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
}
let arrowsT = 0;
// no zoom 3D as setas ficam coladas no relevo
const wpos = (lon, lat, h) => (typeof Z3 !== 'undefined' && Z3.on() ? Z3.ground(lon, lat, h) : mapPos(lon, lat, h));
function updArrows() {
  while (WV.arrows.children.length) { const c = WV.arrows.children.pop(); c.geometry.dispose(); }
  const segs = [], cols = [];
  for (const d of W.divs) {
    if (d.dead || (d.tag !== W.player && !(WV.sel && WV.sel.includes(d)))) continue;
    const pts = d.naval ? [d.prov, d.naval.to] : d.path.length ? [d.prov, ...d.path] : null; if (!pts) continue;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = WG.provs[pts[i]], b = WG.provs[pts[i + 1]];
      for (let k = 0; k < 8; k++) {
        const t0 = k / 8, t1 = (k + 1) / 8, lift = (t) => (d.naval ? 6 : 1.2) * Math.sin(t * Math.PI) + 0.6;
        const A = wpos(lerp(a.lon, b.lon, t0), lerp(a.lat, b.lat, t0), lift(t0)), Bp = wpos(lerp(a.lon, b.lon, t1), lerp(a.lat, b.lat, t1), lift(t1));
        segs.push(A.x, A.y, A.z, Bp.x, Bp.y, Bp.z);
        const c = d.naval ? [0.5, 0.8, 1] : atWar(d.tag, W.ctrl[pts[i + 1]]) ? [1, 0.35, 0.25] : [0.6, 1, 0.5];
        cols.push(...c, ...c);
      }
    }
  }
  if (!segs.length) return;
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(segs, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  WV.arrows.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ vertexColors: true, depthTest: false, transparent: true, opacity: 0.95 })));
}

/* ---------------- contadores (HTML, estilo HoI) ---------------- */
function stackList() {
  const m = new Map();
  for (const d of W.divs) { if (d.dead) continue; const k = d.prov + ':' + d.tag; let s = m.get(k); if (!s) m.set(k, s = { prov: d.prov, tag: d.tag, divs: [] }); s.divs.push(d); }
  return [...m.values()];
}
const counterEls = new Map();
function nato(type) { return type === 'tank' ? '<i class="nt tk"></i>' : type === 'mot' ? '<i class="nt mo"></i>' : '<i class="nt in"></i>'; }
function updCounters() {
  const layer = document.getElementById('counters'), stacks = stackList(), seen = new Set();
  const camDir = WV.cam.position.clone().normalize(), v = new THREE.Vector3();
  const Wd = window.innerWidth, Hd = window.innerHeight, zoomedOut = mapStyle === 'globo' ? WV.dist > GR * 2.4 : WV.fh > 140, close = mapStyle === 'globo' ? WV.dist < GR * 1.5 : WV.fh < 50;
  const byProv = {};
  for (const st of stacks) (byProv[st.prov] = byProv[st.prov] || []).push(st);
  for (const st of stacks) {
    const key = st.prov + ':' + st.tag; seen.add(key);
    let el = counterEls.get(key);
    if (!el) { el = document.createElement('button'); el.className = 'ct'; el.dataset.key = key; layer.appendChild(el); counterEls.set(key, el); }
    const p = WG.provs[st.prov], za = typeof Z3 !== 'undefined' && Z3.anchor(st); v.copy(za || mapPos(p.lon, p.lat, 1.5));
    const front = mapStyle !== 'globo' || v.clone().normalize().dot(camDir) > 0.15;
    v.project(WV.cam);
    const x = (v.x + 1) / 2 * Wd, y = (1 - v.y) / 2 * Hd;
    const rel = st.tag === W.player ? 2 : atWar(st.tag, W.player) ? 2 : allied(st.tag, W.player) || inWar(st.tag) ? 1 : 0;
    if (!front || v.z > 1 || x < -40 || x > Wd + 40 || y < -30 || y > Hd + 30 || (zoomedOut && rel < 2) || (!close && rel < 1)) { el.style.display = 'none'; continue; }
    const others = byProv[st.prov], off = others.indexOf(st) * 13;
    el.style.display = ''; el.style.transform = 'translate(' + (x - 18) + 'px,' + (y - 10 + off) + 'px)';
    const str = st.divs.reduce((s, d) => s + d.str, 0) / st.divs.length, org = st.divs.reduce((s, d) => s + d.org, 0) / st.divs.length;
    const type = st.divs.some(d => d.type === 'tank') ? 'tank' : st.divs.some(d => d.type === 'mot') ? 'mot' : 'inf';
    const sig = st.tag + type + st.divs.length + Math.round(str * 10) + Math.round(org * 10) + (WV.sel && WV.sel[0] && WV.sel[0].prov === st.prov && WV.sel[0].tag === st.tag) + st.divs.some(d => d.battle) + st.divs.some(d => d.path.length || d.naval);
    if (el._sig !== sig) {
      el._sig = sig;
      const n = W.nat[st.tag];
      el.style.setProperty('--nc', n.color);
      el.classList.toggle('mine', st.tag === W.player); el.classList.toggle('foe', atWar(st.tag, W.player));
      el.classList.toggle('sel', !!(WV.sel && WV.sel[0] && WV.sel[0].prov === st.prov && WV.sel[0].tag === st.tag));
      el.classList.toggle('fight', st.divs.some(d => d.battle)); el.classList.toggle('moving', st.divs.some(d => d.path.length || d.naval));
      el.innerHTML = nato(type) + '<b>' + st.divs.length + '</b><span class="bars"><i style="width:' + Math.round(str * 100) + '%"></i><i class="o" style="width:' + Math.round(org * 100) + '%"></i></span>';
      el.setAttribute('aria-label', st.divs.length + ' divisões de ' + n.name + ' em ' + p.name);
    }
  }
  for (const [k, el] of counterEls) if (!seen.has(k)) { el.remove(); counterEls.delete(k); }
  // marcadores de batalha
  const bl = document.getElementById('bmarks'); let html = '';
  for (const b of W.battles) {
    const p = WG.provs[b.prov], za = typeof Z3 !== 'undefined' && Z3.anchorProv(b.prov); v.copy(za || mapPos(p.lon, p.lat, 2));
    const front = mapStyle !== 'globo' || v.clone().normalize().dot(camDir) > 0.15; v.project(WV.cam);
    if (!front || v.z > 1) continue;
    const mine = b.atag === W.player || b.dtag === W.player || b.att.concat(b.def).some(i => { const d = divById(i); return d && d.tag === W.player; });
    if (!mine && zoomedOut) continue;
    const A = b.att.map(divById).filter(Boolean), D = b.def.map(divById).filter(Boolean);
    const oa = A.reduce((s, d) => s + d.org, 0) / Math.max(1, A.length), od = D.reduce((s, d) => s + d.org, 0) / Math.max(1, D.length), k = oa / Math.max(0.01, oa + od);
    html += '<button class="bm' + (mine ? ' mine' : '') + '" data-b="' + b.id + '" style="transform:translate(' + ((v.x + 1) / 2 * Wd - 14) + 'px,' + ((1 - v.y) / 2 * Hd - 40) + 'px)" aria-label="Batalha em ' + p.name + '">⚔<i style="width:' + Math.round(k * 100) + '%"></i></button>';
  }
  if (bl._h !== html) { bl._h = html; bl.innerHTML = html; }
}

/* ---------------- entrada no mapa ---------------- */
const wPtr = new Map(); let wGest = null;
function worldPointer(type, e) {
  if (MODE !== 'world' || !W || !WV.scene) return false;
  if (type === 'down') {
    wPtr.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (wPtr.size === 1) wGest = { t: 'tap', sx: e.clientX, sy: e.clientY, lx: e.clientX, ly: e.clientY, right: e.button === 2 };
    else if (wPtr.size === 2) { const [a, b] = [...wPtr.values()]; wGest = { t: 'pinch', d0: Math.hypot(a.x - b.x, a.y - b.y), z0: mapStyle === 'globo' ? WV.dist - GR : WV.fh }; }
  } else if (type === 'move') {
    const p = wPtr.get(e.pointerId); if (!p) return true; p.x = e.clientX; p.y = e.clientY;
    if (!wGest) return true;
    if (wGest.t === 'tap' && Math.hypot(e.clientX - wGest.sx, e.clientY - wGest.sy) > 8) wGest.t = 'pan';
    if (wGest.t === 'pan') { worldPan(e.clientX - wGest.lx, e.clientY - wGest.ly); wGest.lx = e.clientX; wGest.ly = e.clientY; }
    else if (wGest.t === 'pinch' && wPtr.size >= 2) { const [a, b] = [...wPtr.values()]; const k = wGest.d0 / Math.max(20, Math.hypot(a.x - b.x, a.y - b.y)); if (mapStyle === 'globo') WV.dist = GR + wGest.z0 * k; else WV.fh = wGest.z0 * k; }
  } else if (type === 'up') {
    if (!wPtr.has(e.pointerId)) return true; wPtr.delete(e.pointerId);
    if (wGest && wGest.t === 'tap' && wPtr.size === 0) worldTap(e.clientX, e.clientY, wGest.right);
    if (wPtr.size === 0) wGest = null;
  }
  return true;
}
function worldPan(dx, dy) {
  if (mapStyle === 'globo') { const k = (WV.dist - GR) / GR * 0.28, cl = WV.dist - GR < 15 ? Math.max(0.35, Math.cos(WV.lat * Math.PI / 180)) : 1; WV.lon -= dx * k / cl; WV.lat += dy * k; }
  else { const k = WV.fh / window.innerHeight * 1.1; WV.fx -= dx * k; WV.fz += dy * k / FLAT_K; }
}
function worldZoom(f) { if (mapStyle === 'globo') WV.dist = GR + (WV.dist - GR) * f; else WV.fh *= f; }   // multiplica a altitude: dá para descer até o chão
function worldTap(sx, sy, right) {
  initAudio();
  const ll = screenLonLat(sx, sy); const p = ll && provAt(ll.lon, ll.lat);
  const mineSel = WV.sel && WV.sel.length && WV.sel[0].tag === W.player;
  if (p && mineSel && (right || p.id !== WV.sel[0].prov)) {
    let ok = 0, last = '';
    for (const d of WV.sel) { last = orderDiv(d, p.id); if (last === 'ok' || last === 'naval') { ok++; d.manual = true; } }
    if (ok) { toastW((last === 'naval' ? 'Transporte naval para ' : (atWar(W.player, W.ctrl[p.id]) ? 'Atacar ' : 'Mover para ')) + p.name + ' (' + ok + ' divisões).', 'good'); arrowsT = 0; }
    else toastW(last === 'longe' ? 'Longe demais para o transporte naval.' : 'Sem caminho até ' + p.name + ' (só dá para entrar em território próprio, aliado ou inimigo em guerra).', 'bad');
    return;
  }
  WV.sel = null; WV.selProv = p ? p.id : null;
  if (p) { const own = divsIn(p.id).filter(d => d.tag === W.player); if (own.length) WV.sel = own; }
  wPanel();
}
function selectStack(key) {
  const [prov, tag] = key.split(':'); const list = divsIn(+prov).filter(d => d.tag === tag);
  if (WV.sel && WV.sel[0] && WV.sel[0].tag === W.player && tag !== W.player) { worldTap(...provScreen(+prov), false); return; }
  WV.sel = list; WV.selProv = +prov; wPanel();
}
function provScreen(id) { const p = WG.provs[id], v = mapPos(p.lon, p.lat, 0).project(WV.cam); return [(v.x + 1) / 2 * window.innerWidth, (1 - v.y) / 2 * window.innerHeight]; }

/* ---------------- interface do mapa ---------------- */
let popupOpen = false;
function toastW(msg, cls) { if (typeof toast === 'function') toast(msg, cls); }
function logNews(t, show) { W.log.unshift(t); W.log.length = Math.min(W.log.length, 40); if (show) toastW(t); }
function flagCSS(t) { const n = W.nat[t]; return 'background:' + n.color; }
function wTop() {
  const n = W.nat[W.player];
  document.getElementById('wDate').textContent = dateStr(W.day);
  document.getElementById('wNation').textContent = n.name;
  document.getElementById('wFlag').style.background = n.color;
  document.getElementById('wFac').textContent = n.fac ? FAC_NAME[n.fac] : 'Neutro';
  document.getElementById('wMil').textContent = Math.round(n.mil);
  document.getElementById('wEq').textContent = S.free && S.free.res ? '∞' : Math.round(n.eq);
  document.getElementById('wMp').textContent = Math.round(n.mp) + 'k';
  document.getElementById('wDivs').textContent = W.divs.filter(d => d.tag === W.player && !d.dead).length;
  for (const b of document.querySelectorAll('#wSpeed button')) b.classList.toggle('on', (+b.dataset.sp === 0 && W.paused) || (!W.paused && +b.dataset.sp === W.speed));
  const nb = W.battles.filter(b => isMine(b)).length;
  document.getElementById('wBat').textContent = nb ? nb : '—';
}
function isMine(b) { return b.att.concat(b.def).some(i => { const d = divById(i); return d && d.tag === W.player; }); }
let panelMode = null;
function wPanel() {
  const P = document.getElementById('wPanel'), T = document.getElementById('wpTitle'), I = document.getElementById('wpInfo'), Bt = document.getElementById('wpBtns');
  let title = '', info = '', btns = '';
  if (panelMode === 'prod') {
    const n = W.nat[W.player];
    title = 'Produção militar'; btns += '<button class="pb' + (W.auto ? ' go' : '') + '" data-w="auto">GENERAL ' + (W.auto ? 'LIGADO' : 'DESLIGADO') + '<small>IA comanda as frentes</small></button>'; info = Math.round(n.mil) + ' fábricas militares · equipamento ' + (S.free.res ? '∞' : Math.round(n.eq)) + ' · mão de obra ' + Math.round(n.mp) + 'k. Fila: ' + (n.queue.map(q => DIV[q].n).join(', ') || 'vazia') + '.';
    for (const k of ['inf', 'mot', 'tank']) btns += '<button class="pb" data-w="build:' + k + '">Divisão ' + DIV[k].n + '<small>' + DIV[k].cost + ' equip. · ' + (k === 'tank' ? vehName(eraKind('tank', W.player)) : k === 'mot' ? 'caminhões e ' + vehName(eraKind('light', W.player)) : 'fuzileiros') + '</small></button>';
    if (n.queue.length) btns += '<button class="pb warn" data-w="clearq">Limpar fila<small>' + n.queue.length + ' na fila</small></button>';
  } else if (panelMode === 'res') {
    const n = W.nat[W.player];
    title = 'Pesquisa'; info = n.res ? 'Pesquisando ' + TECH[n.res].n + ' (' + Math.round(n.resP / techCost(n, n.res) * 100) + '%).' : 'Escolha um ramo. Pesquisar antes do ano histórico demora mais.';
    for (const k of ['armor', 'inf', 'ind']) {
      const lvl = n.tech[k], nx = TECH[k].years[lvl + 1];
      const what = k === 'armor' ? (lvl < 4 ? 'próximo: ' + vehName(eraNext(W.player, lvl + 1)) : 'máximo') : k === 'inf' ? (lvl < 4 ? '+15% de combate' : 'máximo') : (lvl < 4 ? '+10% de produção' : 'máximo');
      btns += '<button class="pb' + (n.res === k ? ' go' : '') + '" data-w="res:' + k + '"' + (lvl >= 4 ? ' disabled' : '') + '>' + TECH[k].n + ' ' + lvl + '/4<small>' + (nx ? nx + ' · ' : '') + what + '</small></button>';
    }
  } else if (panelMode === 'dip') {
    title = 'Diplomacia'; info = 'Em guerra com: ' + (enemiesOf(W.player).map(nameOf).join(', ') || 'ninguém') + '.';
    const p = WV.selProv !== null && WV.selProv !== undefined ? W.ctrl[WV.selProv] : null;
    if (p && p !== W.player) {
      info += ' Selecionado: ' + nameOf(p) + (W.nat[p].fac ? ' (' + FAC_NAME[W.nat[p].fac] + ')' : ' (neutro)') + '.';
      if (!atWar(W.player, p) && !allied(W.player, p)) btns += '<button class="pb warn" data-w="war:' + p + '">Declarar guerra<small>a ' + nameOf(p) + '</small></button>';
      if (atWar(W.player, p) && !MAJORS.includes(p)) btns += '<button class="pb" data-w="peace:' + p + '">Propor paz<small>' + nameOf(p) + '</small></button>';
    } else info += ' Toque num país no mapa para agir sobre ele.';
    if (!W.nat[W.player].fac) for (const f of ['aliados', 'eixo']) btns += '<button class="pb" data-w="join:' + f + '">Entrar nos ' + FAC_NAME[f] + '<small>aliança</small></button>';
  } else if (panelMode === 'bat') {
    title = 'Batalhas'; const mine = W.battles.filter(isMine);
    info = mine.length ? 'Toque em LUTAR EM 3D para comandar a batalha no campo. As outras são resolvidas automaticamente.' : 'Nenhuma batalha com suas divisões agora.';
    for (const b of mine.slice(0, 8)) btns += '<button class="pb go" data-w="fight:' + b.id + '">' + WG.provs[b.prov].name + '<small>LUTAR EM 3D · ' + nameOf(b.atag) + ' ataca</small></button>';
  } else if (WV.sel && WV.sel.length) {
    const d0 = WV.sel[0], n = W.nat[d0.tag], p = WG.provs[d0.prov];
    title = WV.sel.length + ' ' + (WV.sel.length > 1 ? 'divisões' : 'divisão') + ' · ' + n.name;
    info = p.name + ' · ' + WV.sel.map(d => d.name + ' (' + Math.round(d.str * 100) + '%)').slice(0, 3).join(', ') + (WV.sel.length > 3 ? '…' : '');
    if (d0.tag === W.player) {
      info += ' — toque numa província para mover ou atacar.';
      const b = W.battles.find(x => WV.sel.some(d => d.battle === x.id));
      if (b) btns += '<button class="pb go" data-w="fight:' + b.id + '">LUTAR EM 3D<small>' + WG.provs[b.prov].name + '</small></button>';
      btns += '<button class="pb" data-w="stop">PARAR<small>cancelar ordens</small></button>';
      if (W.auto && WV.sel.some(d => d.manual)) btns += '<button class="pb" data-w="gen">AO GENERAL<small>IA comanda</small></button>';
      if (WV.sel.length > 1) btns += '<button class="pb" data-w="split">SEPARAR<small>só a primeira</small></button>';
    }
    btns += '<button class="pb" data-w="close">FECHAR<small>&nbsp;</small></button>';
  } else if (WV.selProv !== null && WV.selProv !== undefined) {
    const p = WG.provs[WV.selProv], c = W.ctrl[p.id];
    title = p.name; info = nameOf(c) + (p.tag !== c ? ' (ocupada; dono: ' + nameOf(p.tag) + ')' : '') + ' · terreno ' + TERR[p.terr].n + (p.coast ? ' · costa' : '');
    const foes = divsIn(p.id); if (foes.length) info += ' · ' + foes.length + ' divisões';
    if (c !== W.player) btns += '<button class="pb" data-w="dipof">DIPLOMACIA<small>' + nameOf(c) + '</small></button>';
    btns += '<button class="pb" data-w="close">FECHAR<small>&nbsp;</small></button>';
  } else { P.hidden = true; return; }
  if (panelMode) btns += '<button class="pb" data-w="close">FECHAR<small>&nbsp;</small></button>';
  T.textContent = title; I.textContent = info; if (Bt._h !== btns) { Bt._h = btns; Bt.innerHTML = btns; }
  P.hidden = false;
}
function eraNext(t, lvl) { const n = W.nat[t], o = n.tech.armor; n.tech.armor = lvl; const k = eraKind('tank', t); n.tech.armor = o; return k; }
function wAction(act, arg) {
  const n = W.nat[W.player];
  if (act === 'build') { n.queue.push(arg); toastW('Divisão ' + DIV[arg].n + ' na fila de produção.'); }
  else if (act === 'clearq') n.queue = [];
  else if (act === 'res') { if (n.res !== arg) { n.res = arg; n.resP = 0; } }
  else if (act === 'war') { declareWar(W.player, arg, true); mapDirty = true; logNews(dateStr(W.day) + ': ' + n.name + ' declara guerra a ' + nameOf(arg) + '.', true); }
  else if (act === 'peace') { if (Math.random() < 0.5) { setPeace(W.player, arg); toastW('Paz assinada com ' + nameOf(arg) + '.', 'good'); } else toastW(nameOf(arg) + ' recusou a paz.', 'bad'); }
  else if (act === 'join') { joinFaction(W.player, arg); toastW(n.name + ' entrou nos ' + FAC_NAME[arg] + '.', 'good'); }
  else if (act === 'stop') { for (const d of WV.sel || []) { if (d.battle) leaveBattle(d); d.path = []; d.prog = 0; d.naval = null; d.manual = true; } }
  else if (act === 'gen') { for (const d of WV.sel || []) d.manual = false; toastW('Divisões devolvidas ao general.'); }
  else if (act === 'auto') { W.auto = !W.auto; toastW(W.auto ? 'General automático ligado: a IA comanda as frentes; divisões que você ordenar ficam com você.' : 'General automático desligado: você comanda todas as divisões.', 'good'); }
  else if (act === 'split') WV.sel = [WV.sel[0]];
  else if (act === 'fight') { const b = W.battles.find(x => x.id === +arg); if (b) fightBattle(b); return; }
  else if (act === 'dipof') panelMode = 'dip';
  else if (act === 'close') { panelMode = null; WV.sel = null; WV.selProv = null; }
  wPanel();
}
function battleNotice(b) {
  if (!W.player) return;
  const mine = b.atag === W.player || W.ctrl[b.prov] === W.player;
  if (!mine) return;
  const box = document.getElementById('toasts'), el = document.createElement('div');
  el.className = 'toast bad act'; el.innerHTML = '⚔ Batalha em ' + WG.provs[b.prov].name + ' <button class="pb go" data-w="fight:' + b.id + '">LUTAR EM 3D</button>';
  box.appendChild(el); while (box.children.length > 3) box.removeChild(box.firstChild);
  setTimeout(() => el.remove(), 7000);
}
function askEvent(ev) {
  popupOpen = true;
  const m = document.getElementById('wEvent');
  document.getElementById('weDate').textContent = dateStr(W.day);
  document.getElementById('weTitle').textContent = 'Decisão de ' + W.nat[W.player].name;
  document.getElementById('weText').textContent = ev.q + ' (Historicamente: ' + ev.txt + ')';
  m.hidden = false;
  const done = (yes) => { m.hidden = true; popupOpen = false; if (yes) { ev.run(); logNews(dateStr(W.day) + ': ' + ev.txt, true); mapDirty = true; } else toastW('Você mudou a história.', 'good'); };
  document.getElementById('weYes').onclick = () => done(true);
  document.getElementById('weNo').onclick = () => done(false);
  setTimeout(() => document.getElementById('weYes').focus(), 50);
}
function gameOverWorld(win, text) {
  W.over = true; saveWorld();
  setTimeout(() => {
    $('endEyebrow').textContent = dateStr(W.day).toUpperCase() + ' · ' + W.nat[W.player].name.toUpperCase();
    $('endTitle').textContent = win ? 'VITÓRIA' : 'FIM DA GUERRA';
    $('endText').textContent = text;
    $('stTime').textContent = Math.floor(W.day / 365 * 10) / 10 + ' anos';
    $('stKills').textContent = W.divs.filter(d => d.tag === W.player && !d.dead).length;
    $('stLost').textContent = W.battles.length;
    $('stTowns').textContent = WG.provs.filter(p => W.ctrl[p.id] === W.player).length;
    $('again').textContent = 'NOVA CAMPANHA';
    $('again').onclick = () => { try { localStorage.removeItem('diad-mundo'); } catch (e) { /* */ } location.reload(); };
    $('end').hidden = false; $('whud').hidden = true;
  }, 1200);
}

/* ---------------- ponte com o modo tático 3D ---------------- */
function fightBattle(b) {
  const pr = WG.provs[b.prov];
  const A = b.att.map(divById).filter(d => d && !d.dead), D = b.def.map(divById).filter(d => d && !d.dead);
  if (!A.length || !D.length) { toastW('Essa batalha já terminou.'); return; }
  const playerAtt = A.some(d => d.tag === W.player) || (b.atag === W.player);
  const mineL = playerAtt ? A : D, foeL = playerAtt ? D : A;
  const pTag = W.player, eTag = foeL[0].tag;
  W.paused = true; b.paused = true;
  const t = dayDate(W.day);
  startBattle({
    prov: { name: pr.name, terr: pr.terr, lat: pr.lat, lon: pr.lon, id: pr.id }, year: t.getUTCFullYear(), month: t.getUTCMonth(),
    attacker: playerAtt ? 'player' : 'enemy',
    player: { tag: pTag, nat: W.nat[pTag], divs: mineL.filter(d => d.tag === pTag || allied(d.tag, pTag)).map(d => ({ type: d.type, str: d.str, tag: d.tag })) },
    enemy: { tag: eTag, nat: W.nat[eTag], divs: foeL.map(d => ({ type: d.type, str: d.str, tag: d.tag })) },
    onEnd: (res) => {
      b.paused = false;
      // perdas proporcionais
      for (const d of mineL) { d.str = Math.max(0.05, d.str * (1 - res.playerLoss * 0.8)); d.org = res.win ? Math.max(d.org, 0.5) : 0.05; }
      for (const d of foeL) { d.str = Math.max(0.05, d.str * (1 - res.enemyLoss * 0.8)); d.org = res.win ? 0.02 : Math.max(d.org, 0.5); }
      if (W.battles.includes(b)) endBattleWorld(b, playerAtt ? res.win : !res.win);
      checkCapitulation(); mapDirty = true; saveWorld();
      showWorld();
    },
  });
}

/* ---------------- ciclo do modo mundo ---------------- */
let wUiT = 0;
function worldFrame(dt) {
  initWorldView();
  if (W) worldTick(dt);
  // giro automático do globo no menu
  if (!W || $('intro').hidden === false) { if (mapStyle === 'globo') WV.lon += dt * 3; }
  if (W && mapDirty) { mapT -= dt; if (mapT <= 0) { mapT = 1.2; drawMap(); } }
  const K2 = cam.keys, sp2 = (mapStyle === 'globo' ? 260 : 380) * dt;
  if (K2.w || K2.arrowup) worldPan(0, sp2); if (K2.s || K2.arrowdown) worldPan(0, -sp2);
  if (K2.a || K2.arrowleft) worldPan(sp2, 0); if (K2.d || K2.arrowright) worldPan(-sp2, 0);
  updWorldCamera();
  if (W && !$('whud').hidden) {
    wUiT -= dt;
    if (wUiT <= 0) { wUiT = 0.2; wTop(); if (!$('wPanel').hidden || panelMode) wPanel(); updFigures(); }
    arrowsT -= dt; if (arrowsT <= 0) { arrowsT = 0.5; updArrows(); }
    updCounters();
  }
  if (typeof Z3 !== 'undefined') Z3.update(dt);
  renderer.render(WV.scene, WV.cam);
}
function showWorld() {
  MODE = 'world';
  $('hud').hidden = true; $('end').hidden = true; $('intro').hidden = true; $('whud').hidden = false;
  W.paused = true; mapDirty = true; wTop(); wPanel();
}
function startWorld(player, cont) {
  if (cont && loadWorld()) { /* continua */ } else newCampaign(player);
  initWorldView(); drawMap();
  lookAtProv(W.nat[W.player].cap); WV.dist = GR * 1.9; WV.fh = 70;
  showWorld();
  toastW('Toque nas suas divisões e depois numa província para mover ou atacar. Use ▶ para o tempo andar.', 'good');
}
// botões do HUD do mundo
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-w]'); if (b && !b.disabled) { const [a, arg] = b.dataset.w.split(':'); wAction(a, arg); return; }
  const c = e.target.closest('.ct'); if (c) { selectStack(c.dataset.key); return; }
  const m = e.target.closest('.bm'); if (m) { const bt = W.battles.find(x => x.id === +m.dataset.b); if (bt && isMine(bt)) { panelMode = 'bat'; wPanel(); } else if (bt) { WV.selProv = bt.prov; WV.sel = null; panelMode = null; wPanel(); } return; }
  const sp = e.target.closest('#wSpeed button'); if (sp && W) { const v = +sp.dataset.sp; if (v === 0) W.paused = !W.paused; else { W.speed = v; W.paused = false; } wTop(); return; }
  const tab = e.target.closest('[data-tab]'); if (tab && W) { panelMode = panelMode === tab.dataset.tab ? null : tab.dataset.tab; wPanel(); return; }
});
