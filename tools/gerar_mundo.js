// Uso: npm install world-atlas@2.0.2 topojson-client@3.1.0 && node tools/gerar_mundo.js js/dados_mundo.js
// Gera js/dados_mundo.js: províncias do mundo em 1939 a partir do Natural Earth (world-atlas 50m)
const fs = require('fs');
const topo = require('world-atlas/countries-50m.json');
const tc = require('topojson-client');
const feats = tc.feature(topo, topo.objects.countries).features;

const RES = 0.5, LAT0 = 84, LAT1 = -60, W = 360 / RES, H = (LAT0 - LAT1) / RES;
const lonOf = (i) => -180 + (i + 0.5) * RES, latOf = (j) => LAT0 - (j + 0.5) * RES;

// --- polígonos com caixas
const polys = [];
for (const f of feats) {
  const g = f.geometry; if (!g) continue;
  const list = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  for (let rings of list) {
    // polígonos que cruzam o antimeridiano (Chukotka, Fiji): desenrola para 0..360
    let w0 = 1e9, w1 = -1e9; for (const p of rings[0]) { w0 = Math.min(w0, p[0]); w1 = Math.max(w1, p[0]); }
    const wrap = w1 - w0 > 180;
    if (wrap) rings = rings.map(r => r.map(p => [p[0] < 0 ? p[0] + 360 : p[0], p[1]]));
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    for (const p of rings[0]) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
    polys.push({ name: f.properties.name, rings, x0, x1, y0, y1, wrap });
  }
}
function inRing(x, y, r) {
  let c = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const xi = r[i][0], yi = r[i][1], xj = r[j][0], yj = r[j][1];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}
function countryAt(x0, y) {
  for (const p of polys) {
    const x = p.wrap && x0 < 0 ? x0 + 360 : x0;
    if (x < p.x0 || x > p.x1 || y < p.y0 || y > p.y1) continue;
    if (!inRing(x, y, p.rings[0])) continue;
    let hole = false; for (let k = 1; k < p.rings.length; k++) if (inRing(x, y, p.rings[k])) { hole = true; break; }
    if (!hole) return p.name;
  }
  return null;
}

// --- dono em 1939 (tag) a partir do país moderno e da posição
const SIMPLE = {
  Germany: 'GER', Austria: 'GER', Czechia: 'GER', Slovakia: 'SLO', France: 'FRA', 'United Kingdom': 'ENG', Ireland: 'IRL', Iceland: 'ICE',
  Spain: 'SPA', Portugal: 'POR', Italy: 'ITA', 'San Marino': 'ITA', Vatican: 'ITA', Malta: 'ENG', Switzerland: 'SWI', Liechtenstein: 'SWI', Netherlands: 'HOL', Belgium: 'BEL', Luxembourg: 'LUX',
  Denmark: 'DEN', Greenland: 'DEN', 'Faeroe Is.': 'DEN', Norway: 'NOR', Sweden: 'SWE', Finland: 'FIN', Estonia: 'EST', Latvia: 'LAT', Hungary: 'HUN', Romania: 'ROM', Moldova: 'ROM',
  Bulgaria: 'BUL', Greece: 'GRE', Albania: 'ITA', Turkey: 'TUR', Cyprus: 'ENG', 'N. Cyprus': 'ENG',
  Serbia: 'YUG', Croatia: 'YUG', Slovenia: 'YUG', 'Bosnia and Herz.': 'YUG', Montenegro: 'YUG', Macedonia: 'YUG', 'North Macedonia': 'YUG', Kosovo: 'YUG',
  Georgia: 'SOV', Armenia: 'SOV', Azerbaijan: 'SOV', Kazakhstan: 'SOV', Uzbekistan: 'SOV', Turkmenistan: 'SOV', Kyrgyzstan: 'SOV', Tajikistan: 'SOV', Mongolia: 'MON',
  Libya: 'ITA', Eritrea: 'ITA', Ethiopia: 'ITA', Egypt: 'ENG', Sudan: 'ENG', 'S. Sudan': 'ENG', Algeria: 'FRA', Tunisia: 'FRA', Morocco: 'FRA', 'W. Sahara': 'SPA', Mauritania: 'FRA', Mali: 'FRA', Niger: 'FRA', Chad: 'FRA',
  Senegal: 'FRA', Guinea: 'FRA', "Côte d'Ivoire": 'FRA', 'Burkina Faso': 'FRA', Benin: 'FRA', Togo: 'FRA', Cameroon: 'FRA', 'Central African Rep.': 'FRA', Congo: 'FRA', Gabon: 'FRA', Madagascar: 'FRA', Djibouti: 'FRA', Comoros: 'FRA',
  Nigeria: 'ENG', Ghana: 'ENG', 'Sierra Leone': 'ENG', Gambia: 'ENG', Kenya: 'ENG', Uganda: 'ENG', Tanzania: 'ENG', Zambia: 'ENG', Zimbabwe: 'ENG', Malawi: 'ENG', Botswana: 'ENG', 'eSwatini': 'SAF', Lesotho: 'SAF', 'South Africa': 'SAF', Namibia: 'SAF', Mauritius: 'ENG',
  'Dem. Rep. Congo': 'BEL', Rwanda: 'BEL', Burundi: 'BEL', Angola: 'POR', Mozambique: 'POR', 'Guinea-Bissau': 'POR', 'Eq. Guinea': 'SPA', Liberia: 'LBR', 'Cabo Verde': 'POR', 'São Tomé and Principe': 'POR',
  Syria: 'FRA', Lebanon: 'FRA', Iraq: 'IRQ', Jordan: 'ENG', Israel: 'ENG', Palestine: 'ENG', 'Saudi Arabia': 'SAU', Yemen: 'YEM', Oman: 'ENG', 'United Arab Emirates': 'ENG', Qatar: 'ENG', Kuwait: 'ENG', Bahrain: 'ENG', Iran: 'PER', Afghanistan: 'AFG',
  India: 'RAJ', Pakistan: 'RAJ', Bangladesh: 'RAJ', 'Sri Lanka': 'RAJ', Myanmar: 'RAJ', Nepal: 'NEP', Bhutan: 'RAJ', Malaysia: 'ENG', Singapore: 'ENG', Brunei: 'ENG',
  Vietnam: 'FRA', Laos: 'FRA', Cambodia: 'FRA', Thailand: 'SIA', Indonesia: 'HOL', 'Timor-Leste': 'POR', 'Papua New Guinea': 'AST', Philippines: 'USA',
  'North Korea': 'JAP', 'South Korea': 'JAP', Korea: 'JAP', Taiwan: 'JAP', Japan: 'JAP', Palau: 'JAP', Micronesia: 'JAP', 'Marshall Is.': 'JAP', 'N. Mariana Is.': 'JAP', Guam: 'USA',
  Australia: 'AST', 'New Zealand': 'NZL', Fiji: 'ENG', 'Solomon Is.': 'ENG', Vanuatu: 'FRA', 'New Caledonia': 'FRA', 'Fr. Polynesia': 'FRA', Samoa: 'NZL', Kiribati: 'ENG', Tonga: 'ENG',
  'United States of America': 'USA', Canada: 'CAN', Mexico: 'MEX', Cuba: 'CUB', Guatemala: 'GUA', Belize: 'ENG', Honduras: 'HON', 'El Salvador': 'ELS', Nicaragua: 'NIC', 'Costa Rica': 'COS', Panama: 'PAN',
  Haiti: 'HAI', 'Dominican Rep.': 'DOM', Jamaica: 'ENG', Bahamas: 'ENG', 'Trinidad and Tobago': 'ENG', 'Puerto Rico': 'USA', Colombia: 'COL', Venezuela: 'VEN', Guyana: 'ENG', Suriname: 'HOL', Ecuador: 'ECU', Peru: 'PRU',
  Brazil: 'BRA', Bolivia: 'BOL', Paraguay: 'PAR', Chile: 'CHL', Argentina: 'ARG', Uruguay: 'URG', 'Falkland Is.': 'ENG',
};
function owner1939(name, x, y) {
  switch (name) {
    case 'Russia':
      if (x < 23 && y > 54 && y < 55.6) return 'GER';               // Prússia Oriental (Königsberg)
      if (y > 60 && y < 62.2 && x > 27.5 && x < 32.5) return 'FIN'; // Carélia finlandesa
      if (y > 68.8 && x > 28.5 && x < 32) return 'FIN';               // Petsamo
      if (x > 141 && y < 50 && y > 45.5) return 'JAP';                // Sacalina do Sul
      return 'SOV';
    case 'Ukraine':
      if (y < 48.4 && x < 24.2) return 'HUN';                         // Rutênia dos Cárpatos
      if (y < 48.6 && x > 24.9 && x < 27.6 && y > 47.6) return 'ROM'; // Bucovina do Norte
      if (x < 26.4 && y > 48.4) return 'POL';                         // Galícia e Volínia
      if (y < 46.2 && x < 30.7 && x > 28.3) return 'ROM';             // sul da Bessarábia
      return 'SOV';
    case 'Belarus': return x < 27.2 ? 'POL' : 'SOV';
    case 'Lithuania': if (x < 21.7 && y > 55.4) return 'GER'; if (x > 24.8 && y < 55.3) return 'POL'; return 'LIT';
    case 'Poland':
      if (y > 53.25 && x > 19.4) return 'GER';                        // Prússia Oriental
      if (x < 16.7) return 'GER';
      if (y > 53.5 && x < 17.6) return 'GER';                         // Pomerânia
      if (y < 51.7 && y > 50.0 && x < 18.4) return 'GER';             // Silésia
      if (y > 54.25 && x > 18.4 && x < 19.0) return 'GER';            // Danzig
      return 'POL';
    case 'Somalia': return y > 8 && x < 49 ? 'ENG' : 'ITA';
    case 'Somaliland': return 'ENG';
    case 'Morocco': return y > 34.9 && x > -6.2 ? 'SPA' : 'FRA';
    case 'China':
      if (y > 40.5 && x > 117.5) return 'MAN';                        // Manchukuo
      if (y > 41 && x > 112 && x < 117.5) return 'MAN';               // Jehol / Mongólia Interior oriental
      if (x > 112.5 && y > 21.5 && y < 40.6) return 'JAP';            // costa ocupada
      if (x > 110.5 && y > 34 && y < 40.6) return 'JAP';              // Shanxi/Hebei
      if (x > 106 && x < 113 && y > 34.5 && y < 41) return y > 38 ? 'JAP' : 'CHN';
      return 'CHN';
  }
  if (SIMPLE[name]) return SIMPLE[name];
  return null;
}

// --- grade
const tag = new Array(W * H).fill(null);
const unknown = new Map();
for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
  const x = lonOf(i), y = latOf(j), n = countryAt(x, y);
  if (!n) continue;
  const t = owner1939(n, x, y);
  if (!t) { unknown.set(n, (unknown.get(n) || 0) + 1); continue; }
  if (n === 'Antarctica') continue;
  tag[j * W + i] = t;
}
console.error('sem dono:', [...unknown.entries()].filter(e => e[0] !== 'Antarctica').map(e => e.join(':')).join(', '));

// --- espaçamento das províncias por região
function spacing(x, y) {
  if (x > -11 && x < 42 && y > 35 && y < 71) return 1.3;            // Europa
  if (x >= 42 && x < 62 && y > 38 && y < 70) return 2.2;            // URSS europeia / Cáucaso
  if (x > 95 && x < 146 && y > 18 && y < 52) return 2.7;            // China, Coreia, Japão
  if (x > -18 && x < 62 && y > 8 && y <= 38) return 3.6;            // Norte da África e Oriente Médio
  if (x > 92 && x < 180 && y > -25 && y <= 18) return 3.2;          // Sudeste Asiático e Pacífico
  if (x > -130 && x < -60 && y > 24 && y < 50) return 4.5;          // EUA
  if (x > 112 && x < 155 && y < -10) return 8;                      // Austrália
  return 6;
}
let rs = 1939;
const rnd = () => { rs = (rs * 16807) % 2147483647; return (rs - 1) / 2147483646; };
const idx = (i, j) => j * W + ((i + W) % W);
// componentes conexos por dono
const comp = new Int32Array(W * H).fill(-1), comps = [];
for (let s = 0; s < W * H; s++) {
  if (!tag[s] || comp[s] >= 0) continue;
  const c = comps.length, cells = [s], t = tag[s]; comp[s] = c;
  for (let k = 0; k < cells.length; k++) {
    const q = cells[k], i = q % W, j = (q / W) | 0;
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const jj = j + dj, ii = i + di; if (jj < 0 || jj >= H || ii < 0 || ii >= W) continue;   // sem atravessar o antimeridiano
      const n = idx(ii, jj); if (tag[n] === t && comp[n] < 0) { comp[n] = c; cells.push(n); }
    }
  }
  comps.push({ tag: t, cells });
}
const dist2 = (a, b) => { const ai = a % W, aj = (a / W) | 0, bi = b % W, bj = (b / W) | 0; let dx = Math.abs(ai - bi); const cl = Math.cos(latOf((aj + bj) / 2) * Math.PI / 180); dx *= cl * RES; const dy = (aj - bj) * RES; return dx * dx + dy * dy; };
// sementes: disco de Poisson dentro de cada componente
let seeds = [];
for (const c of comps) {
  const order = c.cells.slice().sort(() => rnd() - 0.5), mine = [];
  const s0 = c.cells[0], sp = spacing(lonOf(s0 % W), latOf((s0 / W) | 0));
  const pacific = lonOf(s0 % W) > 130 || lonOf(s0 % W) < -150;
  if (c.cells.length < Math.max(2, (sp / RES) * (sp / RES) / 10) && !(pacific && c.cells.length >= 1 && Math.abs(latOf((s0 / W) | 0)) < 30)) continue;
  for (const q of order) {
    const sp2 = spacing(lonOf(q % W), latOf((q / W) | 0)) ** 2;
    if (mine.every(m => dist2(m, q) > sp2)) mine.push(q);
  }
  for (const m of mine) seeds.push({ cell: m, tag: c.tag, comp: comps.indexOf(c) });
}
// atribuição + 2 passos de Lloyd
const prov = new Int32Array(W * H).fill(-1);
function assign() {
  const byComp = new Map(), byTag = new Map();
  seeds.forEach((s, k) => { (byComp.get(s.comp) || byComp.set(s.comp, []).get(s.comp)).push(k); (byTag.get(s.tag) || byTag.set(s.tag, []).get(s.tag)).push(k); });
  comps.forEach((c, ci) => {
    const cand = byComp.get(ci) || byTag.get(c.tag) || [];
    for (const q of c.cells) { let b = -1, bd = Infinity; for (const k of cand) { const d = dist2(seeds[k].cell, q); if (d < bd) { bd = d; b = k; } } prov[q] = b; }
  });
}
for (let it = 0; it < 3; it++) {
  assign();
  if (it === 2) break;
  const acc = seeds.map(() => [0, 0, 0, 0, 0]);
  for (let q = 0; q < W * H; q++) if (prov[q] >= 0) { const a = acc[prov[q]], i = q % W, j = (q / W) | 0; a[4] += i; a[2] += j; a[3]++; }
  seeds.forEach((s, k) => {
    const a = acc[k]; if (!a[3]) return;
    let ii = Math.round(a[4] / a[3]), jj = Math.round(a[2] / a[3]);
    const q = idx(ii, jj);
    if (prov[q] === k) s.cell = q; else { // centróide fora: célula da província mais perto do centróide
      let b = s.cell, bd = Infinity; for (let r = 0; r < W * H; r++) if (prov[r] === k) { const d = dist2(r, q); if (d < bd) { bd = d; b = r; } } s.cell = b;
    }
  });
}
// remove sementes vazias e renumera
const used = new Set(prov.filter(p => p >= 0));
const remap = new Map(); const P = [];
seeds.forEach((s, k) => { if (used.has(k)) { remap.set(k, P.length); P.push({ tag: s.tag, cell: s.cell, n: 0, sx: 0, sy: 0, cx: 0, cz: 0, coast: false, adj: new Set() }); } });
for (let q = 0; q < W * H; q++) if (prov[q] >= 0) prov[q] = remap.get(prov[q]);
// estatísticas, costa e adjacência
for (let q = 0; q < W * H; q++) {
  const p = prov[q]; if (p < 0) continue;
  const i = q % W, j = (q / W) | 0, pr = P[p]; pr.n++;
  for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const jj = j + dj; if (jj < 0 || jj >= H) { continue; }
    const o = prov[idx(i + di, jj)];
    if (o < 0) pr.coast = true; else if (o !== p) pr.adj.add(o);
  }
}
// estreitos: províncias costeiras a até ~0,6° pelo mar (Messina, Øresund, Bósforo, Kerch, Japão...)
const coastCells = [];
for (let q = 0; q < W * H; q++) if (prov[q] >= 0 && P[prov[q]].coast) coastCells.push(q);
const GB = (x, y) => x > -6.5 && x < 1.5 && y > 49.8 && y < 59;
for (let a = 0; a < coastCells.length; a++) for (let b = a + 1; b < coastCells.length; b++) {
  const qa = coastCells[a], qb = coastCells[b], pa = prov[qa], pb = prov[qb];
  if (pa === pb || P[pa].adj.has(pb)) continue;
  const dj = Math.abs(((qa / W) | 0) - ((qb / W) | 0)); if (dj > 2) continue;
  if (dist2(qa, qb) > 0.62 * 0.62 + 1e-6) continue;
  const xa = lonOf(qa % W), ya = latOf((qa / W) | 0), xb = lonOf(qb % W), yb = latOf((qb / W) | 0);
  if (GB(xa, ya) !== GB(xb, yb)) continue;
  P[pa].adj.add(pb); P[pb].adj.add(pa);
}
// --- nomes: cidades
const CITIES = require('./cidades.js');
for (const pr of P) pr.city = -1;
CITIES.forEach((c, k) => {
  const i = Math.floor((c[2] + 180) / RES), j = Math.floor((LAT0 - c[1]) / RES);
  if (j < 0 || j >= H) return;
  let q = idx(i, j);
  if (prov[q] < 0) { let b = -1, bd = 9; for (let dj = -2; dj <= 2; dj++) for (let di = -2; di <= 2; di++) { const jj = j + dj; if (jj < 0 || jj >= H) continue; const r = idx(i + di, jj); if (prov[r] >= 0 && di * di + dj * dj < bd) { bd = di * di + dj * dj; b = r; } } q = b; }
  if (q < 0) return;
  const pr = P[prov[q]];
  if (pr.city < 0) { pr.city = k; pr.cityCell = q; }
});
// centro: célula da cidade principal ou semente
for (const pr of P) { const q = pr.city >= 0 ? pr.cityCell : pr.cell; pr.cx = lonOf(q % W); pr.cy = latOf((q / W) | 0); }
for (const pr of P) if (pr.city < 0) {
  let b = 0, bd = Infinity;
  CITIES.forEach((c, k) => { let dx = Math.abs(c[2] - pr.cx); dx = Math.min(dx, 360 - dx) * Math.cos(pr.cy * Math.PI / 180); const d = dx * dx + (c[1] - pr.cy) ** 2; if (d < bd) { bd = d; b = k; } });
  pr.near = b;
  const c = CITIES[b]; let dx = pr.cx - c[2]; if (dx > 180) dx -= 360; if (dx < -180) dx += 360; dx *= Math.cos(pr.cy * Math.PI / 180); const dy = pr.cy - c[1];
  pr.dir = Math.abs(dx) > Math.abs(dy) * 1.5 ? (dx > 0 ? 'L' : 'O') : Math.abs(dy) > Math.abs(dx) * 1.5 ? (dy > 0 ? 'N' : 'S') : (dy > 0 ? 'N' : 'S') + (dx > 0 ? 'E' : 'O');
}
// terreno
function terrain(x, y, t) {
  const desert = (y > 15 && y < 33 && x > -17 && x < 60) || (t === 'SOV' && y > 36 && y < 47 && x > 52 && x < 80) || (y > 38 && y < 46 && x > 92 && x < 115) || (y > -31 && y < -19 && x > 118 && x < 144) || (y > -28 && y < -17 && x > 13 && x < 25);
  if (desert) return 'D';
  if (y > 59 || (t === 'SOV' && y > 49 && x > 58) || (t === 'MON') || (y > 50 && x < -55 && x > -170)) return 'W';
  if (Math.abs(y) < 21 || (y < 26 && x > 97)) return 'T';
  const mount = (y > 44.5 && y < 48 && x > 5.5 && x < 16) || (y > 41 && y < 44 && x > 39 && x < 49) || (y > 27 && y < 37 && x > 72 && x < 100) || (y > 42 && y < 43.5 && x > -2 && x < 3) || (y > 46 && y < 49.5 && x > 22 && x < 26.5) || (y > 41 && y < 45 && x > 18 && x < 22);
  if (mount) return 'M';
  if (y > 30 && y < 45.5 && x > -10 && x < 42) return 'S';
  return 'N';
}
// --- arcos de fronteira compartilhados (cantos da grade)
const VW = W + 1, key = (i, j) => j * VW + i;
const edges = []; // [v0, v1, esquerda, direita] no sentido v0 -> v1 (y para baixo)
const pid = (i, j) => (j < 0 || j >= H) ? -1 : prov[idx(i, j)];
for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
  const a = pid(i, j);
  // aresta direita (vertical) entre (i,j) e (i+1,j)
  const b = i + 1 < W ? pid(i + 1, j) : -2; // não fecha a costura do antimeridiano
  if (b !== -2 && a !== b) edges.push([key(i + 1, j), key(i + 1, j + 1), b, a]);
  // aresta de baixo (horizontal) entre (i,j) e (i,j+1)
  const c = pid(i, j + 1);
  if (a !== c) edges.push([key(i, j + 1), key(i + 1, j + 1), a, c]);
}
for (let i = 0; i < W; i++) { const a = pid(i, 0); if (a >= 0) edges.push([key(i, 0), key(i + 1, 0), -1, a]); }
for (let j = 0; j < H; j++) { const a = pid(0, j), b = pid(W - 1, j); if (a >= 0) edges.push([key(0, j), key(0, j + 1), a, -1]); if (b >= 0) edges.push([key(W, j), key(W, j + 1), -1, b]); }
const pairKey = (a, b) => a < b ? a + ',' + b : b + ',' + a;
const vEdges = new Map();
edges.forEach((e, k) => { for (const v of [e[0], e[1]]) { let l = vEdges.get(v); if (!l) vEdges.set(v, l = []); l.push(k); } });
const usedE = new Uint8Array(edges.length), arcs = [];
const isJunction = (v, pk) => { const l = vEdges.get(v); if (l.length !== 2) return true; return l.some(k => pairKey(edges[k][2], edges[k][3]) !== pk); };
function walk(k0) {
  const e0 = edges[k0], pk = pairKey(e0[2], e0[3]);
  usedE[k0] = 1;
  const pts = [e0[0], e0[1]];
  for (const dir of [1, 0]) {
    let v = dir ? pts[pts.length - 1] : pts[0];
    for (;;) {
      if (isJunction(v, pk)) break;
      const nk = vEdges.get(v).find(k => !usedE[k]); if (nk === undefined) break;
      usedE[nk] = 1; const e = edges[nk], nv = e[0] === v ? e[1] : e[0];
      if (dir) pts.push(nv); else pts.unshift(nv);
      v = nv;
    }
  }
  return { pts, a: Math.min(e0[2], e0[3]), b: Math.max(e0[2], e0[3]), L: e0[2], R: e0[3] };
}
for (let k = 0; k < edges.length; k++) if (!usedE[k]) arcs.push(walk(k));
// simplificação Douglas-Peucker em coordenadas de grade (mantém extremos)
function dp(pts, tol) {
  if (pts.length < 3) return pts;
  const P2 = pts.map(v => [v % VW, (v / VW) | 0]);
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const closed = pts[0] === pts[pts.length - 1];
  if (closed) keep[Math.floor(pts.length / 2)] = 1;
  const rec = (a, b) => {
    let md = -1, mi = -1; const [ax, ay] = P2[a], [bx, by] = P2[b], L = Math.hypot(bx - ax, by - ay) || 1;
    for (let i = a + 1; i < b; i++) { const d = Math.abs((bx - ax) * (ay - P2[i][1]) - (ax - P2[i][0]) * (by - ay)) / L; if (d > md) { md = d; mi = i; } }
    if (md > tol) { keep[mi] = 1; rec(a, mi); rec(mi, b); }
  };
  if (closed) { const m = Math.floor(pts.length / 2); rec(0, m); rec(m, pts.length - 1); } else rec(0, pts.length - 1);
  return pts.filter((_, i) => keep[i]);
}
for (const a of arcs) a.pts = dp(a.pts, 0.75);
// anéis de cada província: arcos orientados com a província à esquerda, encadeados
const pArcs = P.map(() => []);
arcs.forEach((a, k) => { if (a.a >= 0) pArcs[a.a].push(k); if (a.b >= 0) pArcs[a.b].push(k); });
const rings = P.map(() => []);
P.forEach((pr, p) => {
  const segs = pArcs[p].map(k => {
    const a = arcs[k];
    const fwd = a.L === p;
    const pts = fwd ? a.pts : a.pts.slice().reverse();
    return { k: fwd ? k : ~k, s: pts[0], e: pts[pts.length - 1] };
  });
  const byStart = new Map(); segs.forEach(s => { let l = byStart.get(s.s); if (!l) byStart.set(s.s, l = []); l.push(s); });
  const usedS = new Set();
  for (const s0 of segs) {
    if (usedS.has(s0)) continue;
    const ring = []; let s = s0, guard = 0;
    while (s && !usedS.has(s) && guard++ < 10000) {
      usedS.add(s); ring.push(s.k);
      if (s.e === s0.s) break;
      const cand = (byStart.get(s.e) || []).filter(x => !usedS.has(x));
      s = cand[0];
    }
    rings[p].push(ring);
  }
});
// --- saída compacta
const tags = [...new Set(P.map(p => p.tag))].sort();
const out = {
  res: RES, lat0: LAT0, w: W, h: H, tags,
  cities: CITIES.map(c => c[0]),
  arcs: arcs.map(a => {
    const flat = []; let px = 0, py = 0;
    for (const v of a.pts) { const x = v % VW, y = (v / VW) | 0; flat.push(x - px, y - py); px = x; py = y; }
    return flat;
  }),
  arcSide: arcs.map(a => [a.a, a.b]),
  provs: P.map((pr, p) => [tags.indexOf(pr.tag), Math.round(pr.cx * 10) / 10, Math.round(pr.cy * 10) / 10, terrain(pr.cx, pr.cy, pr.tag), pr.city >= 0 ? pr.city : -1 - pr.near, pr.dir || '', pr.coast ? 1 : 0, pr.n, [...pr.adj], rings[p]]),
};
const js = '// Gerado por gen.js a partir do Natural Earth (world-atlas 50m): fronteiras de 1939, províncias e adjacências.\nconst MUNDO_DADOS = ' + JSON.stringify(out) + ';\n';
fs.writeFileSync(process.argv[2], js);
console.error('provincias', P.length, 'arcos', arcs.length, 'bytes', js.length, 'tags', tags.length);
const cnt = {}; P.forEach(p => cnt[p.tag] = (cnt[p.tag] || 0) + 1); console.error(JSON.stringify(cnt));
console.error('aneis multiplos', rings.filter(r => r.length > 1).length, 'sem cidade', P.filter(p => p.city < 0).length);
