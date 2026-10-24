'use strict';
/* =========================================================
   CAMPANHA DO RENO — mapa grande (5,2 × 7,1 km) do Reno ao Elba.
   Gera ~170 lugares para conquistar (vilas, cidades, fábricas,
   aeródromos, estações, fazendas, castelos e o QG em Magdeburg),
   as estradas entre eles, florestas e coberturas.
   Em jogo: guarnições alemãs surgem só quando você chega perto
   (e somem quando você se afasta), e a frente alemã lança
   ofensivas contra os lugares que você conquistou.
   ========================================================= */
const PLACE_NAMES = [
  'Raesfeld', 'Rhede', 'Isselburg', 'Heiden', 'Reken', 'Velen', 'Gescher', 'Legden', 'Ahaus', 'Stadtlohn', 'Vreden', 'Gronau',
  'Haltern', 'Marl', 'Herten', 'Gladbeck', 'Castrop', 'Waltrop', 'Datteln', 'Olfen', 'Selm', 'Lünen', 'Werne', 'Bergkamen',
  'Kamen', 'Unna', 'Bönen', 'Werl', 'Wickede', 'Soest', 'Lippstadt', 'Erwitte', 'Geseke', 'Salzkotten', 'Delbrück', 'Rietberg',
  'Verl', 'Rheda', 'Oelde', 'Beckum', 'Ahlen', 'Ennigerloh', 'Sendenhorst', 'Drensteinfurt', 'Ascheberg', 'Lüdinghausen', 'Nottuln', 'Havixbeck',
  'Billerbeck', 'Coesfeld', 'Dülmen', 'Senden', 'Telgte', 'Everswinkel', 'Warendorf', 'Sassenberg', 'Harsewinkel', 'Greven', 'Emsdetten', 'Lengerich',
  'Ibbenbüren', 'Rheine', 'Steinfurt', 'Halle', 'Werther', 'Herford', 'Enger', 'Bünde', 'Vlotho', 'Lage', 'Lemgo', 'Detmold',
  'Horn', 'Blomberg', 'Steinheim', 'Nieheim', 'Brakel', 'Bad Driburg', 'Warburg', 'Marsberg', 'Brilon', 'Meschede', 'Arnsberg', 'Medebach',
  'Korbach', 'Bad Wildungen', 'Fritzlar', 'Wolfhagen', 'Hofgeismar', 'Höxter', 'Holzminden', 'Bodenwerder', 'Hameln', 'Bad Pyrmont', 'Rinteln', 'Bückeburg',
  'Minden', 'Petershagen', 'Stadthagen', 'Springe', 'Alfeld', 'Einbeck', 'Northeim', 'Uslar', 'Dassel', 'Seesen', 'Bad Gandersheim', 'Osterode',
  'Herzberg', 'Duderstadt', 'Witzenhausen', 'Eschwege', 'Sontra', 'Rotenburg', 'Bebra', 'Melsungen', 'Homberg', 'Goslar', 'Bad Harzburg', 'Wolfenbüttel',
  'Salzgitter', 'Peine', 'Sarstedt', 'Lehrte', 'Gifhorn', 'Wolfsburg', 'Helmstedt', 'Schöningen', 'Königslutter', 'Oschersleben', 'Wanzleben', 'Haldensleben',
  'Wolmirstedt', 'Barleben', 'Schönebeck', 'Staßfurt', 'Aschersleben', 'Quedlinburg', 'Wernigerode', 'Blankenburg', 'Thale', 'Ilsenburg', 'Hornburg', 'Egeln',
  'Calbe', 'Barby', 'Gommern', 'Burg', 'Genthin', 'Tangerhütte', 'Seehausen', 'Hötensleben', 'Weferlingen', 'Oebisfelde', 'Klötze', 'Gardelegen',
  'Bernburg', 'Köthen', 'Zerbst', 'Loburg', 'Möckern', 'Biederitz',
];
const CITY_NAMES = ['Bocholt', 'Borken', 'Recklinghausen', 'Gelsenkirchen', 'Essen', 'Bochum', 'Dortmund', 'Münster', 'Hamm', 'Bielefeld', 'Paderborn', 'Kassel', 'Hannover', 'Hildesheim', 'Göttingen', 'Braunschweig', 'Halberstadt'];
const PLACE_R = { vila: 34, cidade: 58, fabrica: 52, aerodromo: 70, estacao: 40, fazenda: 24, castelo: 30, qg: 78 };
const KIND_LABEL = { vila: 'vila', cidade: 'cidade', fabrica: 'fábrica', aerodromo: 'aeródromo', estacao: 'estação', fazenda: 'fazenda', castelo: 'castelo', qg: 'quartel-general' };

function genPlaces() {
  const P = [], sp = 400;
  for (let gz = WORLD.minZ + 250; gz <= 40; gz += sp) for (let gx = WORLD.minX + 250; gx <= WORLD.maxX - 250; gx += sp) {
    const x = gx + wrr(-125, 125), z = gz + wrr(-125, 125);
    if (z > 40 || (x > CORE.minX - 160 && x < CORE.maxX + 160 && z > CORE.minZ - 160)) continue;
    P.push({ x, z });
  }
  let hq = null;
  for (const p of P) if (p.z < WORLD.minZ + 700 && (!hq || Math.abs(p.x) < Math.abs(hq.x))) hq = p;
  P.sort((a, b) => b.z - a.z);
  let ni = 0, ci = 0;
  for (const p of P) {
    p.tier = clamp(Math.floor((-p.z - 900) / 1250), 0, 3);
    let k = 'vila';
    if (p === hq) k = 'qg';
    else {
      const ruhr = p.z < -1400 && p.z > -2900, r = wr();
      const cuts = [['fabrica', ruhr ? 0.24 : 0.07], ['aerodromo', 0.06], ['estacao', 0.08], ['fazenda', 0.13], ['castelo', 0.04], ['cidade', 0.09]];
      let acc = 0; for (const [kk, w] of cuts) { acc += w; if (r < acc) { k = kk; break; } }
    }
    const base = k === 'cidade' && ci < CITY_NAMES.length ? CITY_NAMES[ci++] : PLACE_NAMES[ni++ % PLACE_NAMES.length];
    p.kind = k; p.r = PLACE_R[k]; p.ang = wrr(0, Math.PI);
    p.name = k === 'qg' ? 'Magdeburg' : k === 'fabrica' ? wpick(['Siderúrgica de ', 'Fábrica de ', 'Usina de ', 'Mina de carvão de ']) + base
      : k === 'aerodromo' ? 'Aeródromo de ' + base : k === 'estacao' ? 'Estação de ' + base : k === 'fazenda' ? 'Fazenda ' + wpick(['Gut ', 'Hof ']) + base
      : k === 'castelo' ? 'Castelo de ' + base : base;
    if (k === 'castelo') MAP.bumps.push([p.x, p.z, 13, 62]);
  }
  MAP.places = P;
}
function nearPlace(x, z, pad) {
  for (const p of MAP.places) { const dx = x - p.x, dz = z - p.z, r = p.r + pad + (p.kind === 'aerodromo' ? 70 : 0); if (dx * dx + dz * dz < r * r) return p; }
  return null;
}

/* ---------- construção em blocos (uma malha por setor, para o recorte da câmera) ---------- */
class ChunkBuilder {
  constructor(size) { this.size = size; this.map = new Map(); }
  at(x, z) {
    const k = Math.floor(x / this.size) * 4096 + Math.floor(z / this.size);
    let b = this.map.get(k); if (!b) { b = new GeoBuilder(); this.map.set(k, b); }
    return b;
  }
  meshes(root, mat, cast) {
    for (const b of this.map.values()) {
      if (!b.p.length) continue;
      const m = new THREE.Mesh(b.build(), mat); m.castShadow = cast; m.receiveShadow = true; root.add(m);
    }
  }
}
const _one3 = new THREE.Vector3(1, 1, 1);
function placeMat(x, z, ry, y) { return new THREE.Matrix4().compose(new THREE.Vector3(x, y === undefined ? groundH(x, z) : y, z), new THREE.Quaternion().setFromAxisAngle(UP, ry || 0), _one3); }

// casa simples (poucas peças) para o interior; enxaimel nas casas claras
function bigHouse(B, x, z, ry, damaged, wide) {
  const st = SC.houses || HOUSE_STYLE[SC.biome];
  const w = wrr(7, 10) * (wide || 1), d = wrr(6, 8.5), h = wrr(5, 7.5), wall = wpick(st.walls), par = placeMat(x, z, ry);
  B.add(G.box, wall, w, h + 3, d, 0, (h + 3) / 2 - 3, 0, 0, 0, 0, par);
  if (damaged) {
    for (let i = 0; i < 3; i++) B.add(G.box, wall, wrr(1.5, 3), wrr(0.5, 2), 0.6, wrr(-w / 2, w / 2), h + 0.4, wrr(-d / 2, d / 2), 0, wrr(0, 3), 0, par);
    for (let i = 0; i < 4; i++) B.add(G.ico, 0x7d7465, wrr(0.6, 1.4), wrr(0.4, 0.9), wrr(0.6, 1.4), wrr(-w / 2 - 2, w / 2 + 2), 0.3, wrr(d / 2, d / 2 + 2.5), 0, 0, 0, par);
    B.add(G.roof, 0x2d2a26, w * 0.6, h * 0.3, d + 0.4, -w * 0.2, h - 0.3, 0, 0.12, 0, 0, par);
  } else {
    B.add(G.roof, wpick(st.roofs), w + 0.7, h * 0.55, d + 1, 0, h, 0, 0, 0, 0, par);
    B.add(G.box, 0x8a7d6a, 0.8, 2.2, 0.8, w * 0.3, h * 1.3, -d * 0.2, 0, 0, 0, par);
  }
  for (const wx of [-w / 4, w / 4]) B.add(G.box, 0x2a2e31, 1.0, 1.2, d + 0.08, wx, h * 0.58, 0, 0, 0, 0, par);
  if (wall === 0xd8d0bc || wall === 0xe0d8c4) { B.add(G.box, 0x4a3426, w + 0.06, 0.2, d + 0.06, 0, h * 0.84, 0, 0, 0, 0, par); B.add(G.box, 0x4a3426, w + 0.06, 0.2, d + 0.06, 0, h * 0.3, 0, 0, 0, 0, par); }
  B.add(G.box, 0x4a3524, 1.1, 2.1, 0.12, 0, 1.05, d / 2 + 0.04, 0, 0, 0, par);
  MAP.obstacles.add({ x, z, r: Math.max(w, d) * 0.58 });
}
function bigChurch(B, x, z, ry, twin) {
  const par = placeMat(x, z, ry), wall = 0x9a8f80, roof = 0x4a4e57;
  B.add(G.box, wall, 9, 11, 22, 0, 2.5, 0, 0, 0, 0, par);
  B.add(G.roof, roof, 23, 4.5, 10, 0, 8, 0, 0, Math.PI / 2, 0, par);
  for (const sx of twin ? [-2.6, 2.6] : [0]) {
    B.add(G.box, wall, twin ? 4.2 : 5.5, twin ? 26 : 18, twin ? 4.2 : 5.5, sx, twin ? 10 : 6, 13, 0, 0, 0, par);
    B.add(G.cone4, 0x3d5a52, 3.4, twin ? 11 : 9, 3.4, sx, twin ? 28.5 : 19.5, 13, 0, Math.PI / 4, 0, par);
  }
  for (let i = 0; i < 3; i++) for (const sx of [-1, 1]) B.add(G.box, 0x2f3540, 0.15, 2.6, 1.2, sx * 4.55, 4.5, -6 + i * 5, 0, 0, 0, par);
  MAP.obstacles.add({ x: x + Math.sin(ry) * -4, z: z + Math.cos(ry) * -4, r: 8 }); MAP.obstacles.add({ x: x + Math.sin(ry) * 12, z: z + Math.cos(ry) * 12, r: 5 });
}
// rua com casas dos dois lados ao longo do ângulo a
function street(B, R, p, a, len, plaza, ruin, wide) {
  const ux = Math.cos(a), uz = Math.sin(a), vx = -uz, vz = ux;
  const pts = [[p.x - ux * (len + 14), p.z - uz * (len + 14)], [p.x + ux * (len + 14), p.z + uz * (len + 14)]];
  MAP.roads.push(pts); MAP.roadSegs.push([pts[0][0], pts[0][1], pts[1][0], pts[1][1]]);
  R.ribbon(pts, 5.5, 0.14, 0x857759, 0x7d7155);
  for (let s = -len; s <= len; s += wrr(10.5, 12.5)) {
    if (Math.abs(s) < plaza) continue;
    for (const side of [-1, 1]) {
      if (wr() < 0.14) continue;
      const off = wrr(9.5, 11), x = p.x + ux * s + vx * off * side, z = p.z + uz * s + vz * off * side;
      bigHouse(B, x, z, Math.atan2(-side * vx, -side * vz), wr() < ruin, wide);
    }
  }
}
function parkedPlane(B, x, z, ry) {
  const A = local(B, placeMat(x, z, ry)), C = 0x4d5a45, D = 0x2a2e2a;
  A(G.cyl12, C, 0.55, 8.6, 0.6, 0, 1.75, 0, Math.PI / 2, 0, 0);
  A(G.cone, C, 0.5, 1.8, 0.5, 0, 1.75, -5.1, -Math.PI / 2, 0, 0);
  A(G.box, C, 10, 0.16, 1.7, 0, 1.45, 1.2);
  A(G.box, C, 3.4, 0.1, 0.9, 0, 1.95, -4.6);
  A(G.box, C, 0.1, 1.4, 1.0, 0, 2.6, -4.8);
  A(G.box, 0x2e3a3c, 0.6, 0.45, 1.2, 0, 2.35, 0.6);
  A(G.cyl12, D, 0.28, 0.5, 0.28, 0, 1.75, 4.45, Math.PI / 2, 0, 0);
  A(G.box, D, 0.12, 2.6, 0.18, 0, 1.75, 4.75);
  for (const sx of [-1, 1]) { A(G.box, D, 0.1, 1.3, 0.1, sx * 1.2, 0.85, 1.4, 0, 0, sx * 0.15); A(G.cyl12, RUBBER, 0.36, 0.18, 0.36, sx * 1.3, 0.36, 1.4, 0, 0, Math.PI / 2); }
}
function buildPlace(B, R, p, L) {
  const k = p.kind, a = p.ang;
  if (k === 'vila') {
    street(B, R, p, a, 34 + wr() * 10, 13, 0.2);
    if (wr() < 0.45) street(B, R, p, a + Math.PI / 2, 22, 13, 0.2);
    if (wr() < 0.7) bigChurch(B, p.x + Math.cos(a + 0.9) * 26, p.z + Math.sin(a + 0.9) * 26, -a);
  } else if (k === 'cidade' || k === 'qg') {
    const big = k === 'qg' ? 78 : 58;
    street(B, R, p, a, big, 16, 0.3, 1.15);
    street(B, R, p, a + Math.PI / 2, big, 16, 0.3, 1.15);
    for (const d of [Math.PI / 4, -Math.PI / 4]) street(B, R, p, a + d, big * 0.55, 30, 0.35);
    bigChurch(B, p.x + Math.cos(a + 0.78) * 30, p.z + Math.sin(a + 0.78) * 30, -a, k === 'qg' || wr() < 0.3);
    // prefeitura (Rathaus)
    const par = placeMat(p.x + Math.cos(a + 3.9) * 27, p.z + Math.sin(a + 3.9) * 27, -a);
    B.add(G.box, 0xb8a888, 18, 13, 11, 0, 3.5, 0, 0, 0, 0, par); B.add(G.roof, 0x7a3a2a, 19, 5, 12, 0, 10, 0, 0, 0, 0, par);
    B.add(G.box, 0xb8a888, 4, 22, 4, 0, 8, 0, 0, 0, 0, par); B.add(G.cone4, 0x3d5a52, 3, 6, 3, 0, 22, 0, 0, Math.PI / 4, 0, par);
    MAP.obstacles.add({ x: par.elements[12], z: par.elements[14], r: 10 });
  } else if (k === 'fabrica') {
    for (let i = 0; i < 3; i++) {
      const hx = p.x + Math.cos(a) * (i - 1) * 32 + Math.cos(a + Math.PI / 2) * 18, hz = p.z + Math.sin(a) * (i - 1) * 32 + Math.sin(a + Math.PI / 2) * 18;
      const par = placeMat(hx, hz, -a), w = 26, d = 16, h = wrr(8, 11);
      B.add(G.box, wpick([0x8a5a44, 0x7a4c3a, 0x9a6a50]), w, h + 3, d, 0, (h + 3) / 2 - 3, 0, 0, 0, 0, par);
      for (let t = 0; t < 5; t++) { B.add(G.roof, 0x4a4e57, d, 2.6, w / 5, -w / 2 + w / 10 + t * w / 5, h, 0, 0, Math.PI / 2, 0, par); B.add(G.box, 0x6a7a80, 0.1, 2.2, d, -w / 2 + t * w / 5 + 0.05, h + 1.1, 0, 0, 0, 0, par); }
      for (let t = 0; t < 4; t++) B.add(G.box, 0x2a2e31, 2.2, 3, d + 0.08, -w / 2 + 3.5 + t * 6.3, h * 0.5, 0, 0, 0, 0, par);
      MAP.obstacles.add({ x: hx, z: hz, r: 13 });
    }
    for (let i = 0; i < 2 + (wr() < 0.5); i++) {
      const cx = p.x + Math.cos(a) * (i * 22 - 18) - Math.cos(a + Math.PI / 2) * 14, cz = p.z + Math.sin(a) * (i * 22 - 18) - Math.sin(a + Math.PI / 2) * 14, y = groundH(cx, cz);
      B.add(G.cyl12, 0x7a4434, 1.5, 34, 1.5, cx, y + 17, cz); B.add(G.cyl12, 0x3a2a24, 1.75, 1.4, 1.75, cx, y + 33, cz);
      for (const yy of [8, 20]) B.add(G.cyl12, 0x5a3a2e, 1.6, 0.6, 1.6, cx, y + yy, cz);
      MAP.obstacles.add({ x: cx, z: cz, r: 2.2 });
    }
    const tx = p.x - Math.cos(a) * 38, tz = p.z - Math.sin(a) * 38, ty = groundH(tx, tz);
    for (const [ox, oz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) B.add(G.cyl8, 0x3a3a38, 0.18, 13, 0.18, tx + ox, ty + 6.5, tz + oz);
    B.add(G.cyl12, 0x5a5e60, 3.4, 4.5, 3.4, tx, ty + 15, tz); B.add(G.cone, 0x4a4e57, 3.6, 1.6, 3.6, tx, ty + 18, tz);
    for (let i = 0; i < 4; i++) { const cx = p.x + wrr(-40, 40), cz = p.z + wrr(-40, 40); if (!nearRoad(cx, cz, 4)) B.add(G.ico, 0x252421, wrr(3, 5), wrr(1.5, 2.6), wrr(3, 5), cx, groundH(cx, cz), cz); }
  } else if (k === 'aerodromo') {
    const ux = Math.cos(a), uz = Math.sin(a), vx = -uz, vz = ux;
    const rw = [[p.x - ux * 120 + vx * 30, p.z - uz * 120 + vz * 30], [p.x + ux * 120 + vx * 30, p.z + uz * 120 + vz * 30]];
    R.ribbon(rw, 26, 0.16, 0x6e6c66, 0x74726b);
    for (let i = 0; i < 2; i++) {
      const hx = p.x + ux * (i * 34 - 17) - vx * 28, hz = p.z + uz * (i * 34 - 17) - vz * 28, par = placeMat(hx, hz, -a);
      B.add(G.halfcyl, 0x5d6250, 9.5, 24, 9, 0, 0, 0, ...ARCH_Z, par);
      B.add(G.box, 0x2a2e2a, 15, 7, 0.2, 0, 3.5, 12, 0, 0, 0, par);
      MAP.obstacles.add({ x: hx, z: hz, r: 12 });
    }
    const par = placeMat(p.x - ux * 48 - vx * 12, p.z - uz * 48 - vz * 12, -a);
    B.add(G.box, 0xc9bfa6, 6, 9, 6, 0, 4.5, 0, 0, 0, 0, par); B.add(G.box, 0x2e3a3c, 6.4, 1.6, 6.4, 0, 8.6, 0, 0, 0, 0, par); B.add(G.box, 0x4a4e57, 7, 0.4, 7, 0, 9.6, 0, 0, 0, 0, par);
    for (let i = 0; i < 4; i++) parkedPlane(B, p.x + ux * (i * 16 - 24) + vx * 8, p.z + uz * (i * 16 - 24) + vz * 8, -a + Math.PI / 2 + wrr(-0.2, 0.2));
    for (let i = 0; i < 10; i++) B.add(G.cyl12, i % 2 ? 0x4a4c34 : 0x5a3a2a, 0.35, 0.95, 0.35, p.x - ux * 30 + (i % 5) * 0.8 * ux, groundH(p.x, p.z) + 0.45, p.z - uz * 30 + Math.floor(i / 5) * 0.8);
  } else if (k === 'estacao') {
    const ux = Math.cos(a), uz = Math.sin(a), vx = -uz, vz = ux;
    const tr = (o) => [[p.x - ux * 190 + vx * o, p.z - uz * 190 + vz * o], [p.x + ux * 190 + vx * o, p.z + uz * 190 + vz * o]];
    R.ribbon(tr(12), 4.5, 0.15, 0x6a6458, 0x625c50);
    for (const o of [11.25, 12.75]) R.ribbon(tr(o), 0.2, 0.3, 0x3c3a36);
    MAP.roads.push(tr(12));
    const plat = placeMat(p.x + vx * 6.5, p.z + vz * 6.5, -a);
    B.add(G.box, 0x8a857a, 60, 1.0, 5, 0, 0.5, 0, 0, 0, 0, plat);
    const par = placeMat(p.x - vx * 6, p.z - vz * 6, -a);
    B.add(G.box, 0xb07055, 20, 10, 9, 0, 2, 0, 0, 0, 0, par); B.add(G.roof, 0x4a4e57, 21, 3.5, 10, 0, 7, 0, 0, 0, 0, par);
    B.add(G.box, 0xb07055, 4, 14, 4, 7, 4, 0, 0, 0, 0, par); B.add(G.box, 0xe8e2d0, 1.6, 1.6, 4.1, 7, 9, 0, 0, 0, 0, par);
    MAP.obstacles.add({ x: p.x - vx * 6, z: p.z - vz * 6, r: 10 });
    // trem de carga e locomotiva
    for (let i = 0; i < 4; i++) {
      const cx = p.x + ux * (i * 12.5 - 10) + vx * 12, cz = p.z + uz * (i * 12.5 - 10) + vz * 12, cp = placeMat(cx, cz, -a);
      if (i === 0) {
        B.add(G.cyl12, 0x1e1e1c, 1.3, 7, 1.3, 0.5, 2.6, 0, 0, 0, Math.PI / 2, cp); B.add(G.box, 0x1e1e1c, 3, 3.2, 2.8, -3.5, 2.8, 0, 0, 0, 0, cp);
        B.add(G.cyl12, 0x1e1e1c, 0.45, 1.6, 0.45, 3, 4.4, 0, 0, 0, 0, cp); B.add(G.box, 0x7a1c16, 8.5, 0.3, 2.9, 0, 1.0, 0, 0, 0, 0, cp);
      } else { B.add(G.box, wpick([0x6a3a2a, 0x5a4a3a, 0x4a4e44]), 10, 3, 2.9, 0, 2.4, 0, 0, 0, 0, cp); B.add(G.halfcyl, 0x4a4e44, 1.5, 10, 0.4, 0, 3.9, 0, 0, 0, Math.PI / 2, cp); }
      for (const ox of [-3, 3]) for (const oz of [-1.3, 1.3]) B.add(G.cyl12, 0x2a2a28, 0.45, 0.2, 0.45, ox, 0.6, oz, Math.PI / 2, 0, 0, cp);
      MAP.obstacles.add({ x: cx, z: cz, r: 3.6 });
    }
    bigHouse(B, p.x - ux * 30 - vx * 18, p.z - uz * 30 - vz * 18, -a, false);
    bigHouse(B, p.x + ux * 28 - vx * 20, p.z + uz * 28 - vz * 20, -a, wr() < 0.3);
  } else if (k === 'fazenda') {
    const ux = Math.cos(a), uz = Math.sin(a);
    bigHouse(B, p.x + ux * 12, p.z + uz * 12, -a + Math.PI / 2, false);
    const bp = placeMat(p.x - ux * 14, p.z - uz * 14, -a);
    B.add(G.box, 0x6a3a2a, 14, 9, 9, 0, 1.5, 0, 0, 0, 0, bp); B.add(G.roof, 0x4a3a30, 15, 4, 10, 0, 6, 0, 0, 0, 0, bp);
    B.add(G.box, 0x3a2a20, 4, 4, 0.15, 0, 2, 4.55, 0, 0, 0, bp);
    MAP.obstacles.add({ x: p.x - ux * 14, z: p.z - uz * 14, r: 8 });
    for (let i = 0; i < 4; i++) { const hx = p.x + wrr(-20, 20), hz = p.z + wrr(14, 22); const y = groundH(hx, hz); B.add(G.cyl12, 0xb8a060, 1.6, 2, 1.6, hx, y + 1, hz); B.add(G.cone, 0xa89050, 1.7, 1.4, 1.7, hx, y + 2.6, hz); MAP.coverPts.add({ x: hx, z: hz, r: 2.6, q: 1 }); }
    for (let s = -24; s <= 24; s += 3) for (const [fx, fz] of [[s, -20], [s, 26], [-24, s], [24, s]]) { const x = p.x + fx, z = p.z + fz; if (!nearRoad(x, z, 5)) { L.posts.push([x, z]); L.rails.push([x + (Math.abs(fz) > 19 ? 1.5 : 0), z + (Math.abs(fz) > 19 ? 0 : 1.5), Math.abs(fz) > 19 ? Math.PI / 2 : 0]); } }
  } else if (k === 'castelo') {
    const y0 = groundH(p.x, p.z);
    for (let i = 0; i < 10; i++) {
      const t = i / 10 * Math.PI * 2, wx = p.x + Math.cos(t) * 22, wz = p.z + Math.sin(t) * 22;
      if (i === 3) continue; // portão
      B.add(G.box, 0x8a857a, 14, 9, 2.4, wx, groundH(wx, wz) + 2.5, wz, 0, -t + Math.PI / 2, 0);
      MAP.coverPts.add({ x: wx, z: wz, r: 4, q: 1.5 });
    }
    for (let i = 0; i < 4; i++) {
      const t = i / 4 * Math.PI * 2 + 0.4, tx = p.x + Math.cos(t) * 22, tz = p.z + Math.sin(t) * 22, ty = groundH(tx, tz);
      B.add(G.cyl12, 0x7d786c, 3.4, 15, 3.4, tx, ty + 5.5, tz); B.add(G.cone, 0x5a3026, 3.9, 6, 3.9, tx, ty + 16, tz);
      MAP.obstacles.add({ x: tx, z: tz, r: 3.6 });
    }
    const kp = placeMat(p.x - 7, p.z - 8, p.ang, y0);
    B.add(G.box, 0x8a857a, 11, 22, 11, 0, 8, 0, 0, 0, 0, kp); B.add(G.roof, 0x5a3026, 12, 5, 12, 0, 19, 0, 0, 0, 0, kp);
    for (let i = 0; i < 4; i++) B.add(G.box, 0x2a2e31, 1, 1.6, 11.1, 0, 7 + i * 3, 0, 0, i % 2 ? 0 : Math.PI / 2, 0, kp);
    MAP.obstacles.add({ x: p.x - 7, z: p.z - 8, r: 7.5 });
  }
}

/* ---------- conteúdo do mapa grande ---------- */
function buildBig(root, L) {
  const CB = new ChunkBuilder(700), CR = new ChunkBuilder(700);
  for (const p of MAP.places) buildPlace(CB.at(p.x, p.z), CR.at(p.x, p.z), p, L);
  // estradas: árvore geradora mínima + uma ligação extra por lugar (inclui as vilas do núcleo)
  const nodes = MAP.places.map(p => ({ x: p.x, z: p.z, core: false })).concat(MAP.towns.map(t => ({ x: t.x, z: t.z, core: true })));
  const n = nodes.length, inT = new Array(n).fill(false), best = new Array(n).fill(Infinity), from = new Array(n).fill(-1), edges = [];
  const dist = (i, j) => Math.hypot(nodes[i].x - nodes[j].x, nodes[i].z - nodes[j].z);
  best[n - 1] = 0;
  for (let it = 0; it < n; it++) {
    let u = -1; for (let i = 0; i < n; i++) if (!inT[i] && (u < 0 || best[i] < best[u])) u = i;
    inT[u] = true; if (from[u] >= 0) edges.push([from[u], u]);
    for (let v = 0; v < n; v++) if (!inT[v]) { const d = nodes[u].core && nodes[v].core ? Infinity : dist(u, v); if (d < best[v]) { best[v] = d; from[v] = u; } }
  }
  const has = new Set(edges.map(([a, b]) => Math.min(a, b) + ',' + Math.max(a, b)));
  for (let i = 0; i < n; i++) {
    if (nodes[i].core || wr() < 0.35) continue;
    let bj = -1, bd = Infinity;
    for (let j = 0; j < n; j++) if (j !== i && !has.has(Math.min(i, j) + ',' + Math.max(i, j))) { const d = dist(i, j); if (d < bd) { bd = d; bj = j; } }
    if (bj >= 0 && bd < 620) { has.add(Math.min(i, bj) + ',' + Math.max(i, bj)); edges.push([i, bj]); }
  }
  for (const [i, j] of edges) {
    const a = nodes[i], b = nodes[j], mx = (a.x + b.x) / 2, mz = (a.z + b.z) / 2, l = dist(i, j) || 1, o = wrr(-0.12, 0.12) * l;
    const pts = [[a.x, a.z], [mx + (b.z - a.z) / l * o, mz - (b.x - a.x) / l * o], [b.x, b.z]];
    MAP.roads.push(pts);
    for (let k = 0; k < 2; k++) MAP.roadSegs.push([pts[k][0], pts[k][1], pts[k + 1][0], pts[k + 1][1]]);
    CR.at(mx, mz).ribbon(pts, 5.5, 0.14, 0x8b7d5e, 0x857759);
    // alamedas: fileiras de árvores ao longo das estradas
    if (wr() < 0.45) for (let k = 0; k < 2; k++) {
      const [ax, az] = pts[k], [bx, bz] = pts[k + 1], sl = Math.hypot(bx - ax, bz - az), dx = (bx - ax) / sl, dz = (bz - az) / sl;
      for (let s = 20; s < sl - 20; s += 13) for (const side of [-1, 1]) {
        const x = ax + dx * s - dz * side * 6.5, z = az + dz * s + dx * side * 6.5;
        if (!nearPlace(x, z, 8) && !nearTown(x, z, 10)) L.trees.push([x, z, wrr(0.9, 1.2), wr() < 0.6 ? 'tall' : 'bare']);
      }
    }
  }
  // florestas de pinheiros e bosques sem folhas (março)
  for (let f = 0; f < 130; f++) {
    const cx = wrr(WORLD.minX + 100, WORLD.maxX - 100), cz = wrr(WORLD.minZ + 100, 120);
    if ((cx > CORE.minX - 40 && cx < CORE.maxX + 40 && cz > CORE.minZ - 40) || nearPlace(cx, cz, 50)) continue;
    const nT = 40 + (wr() * 50 | 0), rad = wrr(40, 75), mix = wr();
    for (let k = 0; k < nT; k++) {
      const a = wrr(0, 6.28), d = Math.sqrt(wr()) * rad, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
      if (nearRoad(x, z, 5) || nearPlace(x, z, 6)) continue;
      L.trees.push([x, z, wrr(0.9, 1.6), wr() < mix ? 'pine' : wr() < 0.5 ? 'bare' : 'round']);
    }
  }
  for (let k = 0; k < 900; k++) {
    const x = wrr(WORLD.minX + 60, WORLD.maxX - 60), z = wrr(WORLD.minZ + 60, 150);
    if ((x > CORE.minX && x < CORE.maxX && z > CORE.minZ) || nearRoad(x, z, 6) || nearPlace(x, z, 4)) continue;
    if (wr() < 0.4) L.trees.push([x, z, wrr(0.8, 1.3), wpick(['round', 'bare', 'apple'])]); else L.bush.push([x, z, wrr(1.6, 3), wrr(1.2, 2.2)]);
  }
  const mS = addDetail(new THREE.MeshLambertMaterial({ vertexColors: true }), 'stone', true);
  const mG = addDetail(new THREE.MeshLambertMaterial({ vertexColors: true, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }), 'ground', true);
  CB.meshes(root, mS, true); CR.meshes(root, mG, false);
}
function buildBigCover(rocks, logs) {
  for (let i = 0; i < 1500; i++) {
    const x = wrr(WORLD.minX + 50, WORLD.maxX - 50), z = wrr(WORLD.minZ + 50, 160);
    if ((x > CORE.minX && x < CORE.maxX && z > CORE.minZ) || nearRoad(x, z, 6) || nearPlace(x, z, 5)) continue;
    if (i % 3) rocks.push([x, z, wrr(1.0, 2.3), wrr(0.7, 1.4)]); else logs.push([x, z, wrr(0, 3)]);
  }
  // pedras e toras perto de cada lugar, para a infantaria se abrigar ao atacar
  for (const p of MAP.places) for (let i = 0; i < 10; i++) {
    const a = wrr(0, 6.28), d = p.r + wrr(15, 70), x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d;
    if (nearRoad(x, z, 5) || nearPlace(x, z, 3)) continue;
    if (i % 2) rocks.push([x, z, wrr(1.1, 2.0), wrr(0.8, 1.3)]); else logs.push([x, z, wrr(0, 3)]);
  }
}

/* =========================================================
   FRENTE DE BATALHA (em jogo)
   ========================================================= */
const DE_POOL = [
  ['kubel', 'puma', 'sdkfz251', 'panzer4', 'hetzer', 'stug'],
  ['puma', 'sdkfz251', 'panzer4', 'hetzer', 'stug', 'panther', 'wirbelwind', 'maultier'],
  ['panzer4', 'panther', 'jagdpanther', 'tiger', 'wirbelwind', 'maultier', 'hetzer'],
  ['panther', 'jagdpanther', 'tiger', 'kingtiger', 'wirbelwind', 'maultier'],
];
const SMALL_POOL = { omaha: ['panzer4', 'sdkfz251', 'stug', 'puma', 'panther'], italia: ['panzer4', 'sdkfz251', 'stug', 'tiger'], ardenas: ['panzer4', 'panther', 'kingtiger', 'stug', 'puma', 'wirbelwind'], africa: ['panzer4', 'sdkfz251', 'tiger'], pacifico: ['chiha', 'hago'] };
const GAR = { vila: [5, 1, 1], cidade: [9, 2, 3], fabrica: [7, 2, 2], aerodromo: [5, 1, 1], estacao: [6, 1, 2], fazenda: [3, 0, 0], castelo: [7, 2, 1], qg: [14, 3, 6] };
const GAR_BLD = { vila: ['nest_de?'], cidade: ['nest_de', 'nest_de', 'flak_de'], fabrica: ['flak_de', 'flak_de', 'nest_de'], aerodromo: ['flak_de', 'flak_de', 'flak_de'], estacao: ['nest_de', 'flak_de'], fazenda: [], castelo: ['bunker', 'nest_de'], qg: ['bunker', 'bunker', 'flak_de', 'flak_de', 'flak_de', 'nest_de', 'nest_de'] };
const FRONT = { scanT: 0 };
function frontActive() { return SC.big || !!S.free.nowaves; }
function vehPool(tier) { return SC.big ? DE_POOL[clamp(tier, 0, 3)] : SMALL_POOL[SC.id] || DE_POOL[0]; }

function placesInit() {
  S.places = []; S.hqPlace = null;
  if (!SC.big) return;
  for (const pl of MAP.places) {
    const p = Object.assign({}, pl, { spawned: false, units: [], left: null, built: false });
    p.cp = makeCP({ x: p.x, z: p.z, name: p.name }); p.cp.place = p;
    S.cps.push(p.cp); S.places.push(p);
    if (p.kind === 'qg') { S.deHQ = spawnBuilding('dehq', p.x + Math.cos(p.ang) * 30, p.z + Math.sin(p.ang) * 30, { complete: true }); S.hqPlace = p; }
  }
}
function freeSpotNear(x, z, r0, r1, rad) {
  for (let k = 0; k < 14; k++) {
    const a = rand() * 6.28, d = rr(r0, r1), px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d;
    MAP.obstacles.near(px, pz, _obs);
    if (!_obs.some(o => Math.hypot(o.x - px, o.z - pz) < o.r + rad) && !inTrench(px, pz) && groundH(px, pz) > 0.5) return { x: px, z: pz };
  }
  return { x: x + rr(-6, 6), z: z + rr(-6, 6) };
}
function garrisonKinds(p) {
  const g = GAR[p.kind], T = p.tier, out = [];
  for (let i = 0; i < g[0] + T; i++) out.push('gren');
  for (let i = 0; i < g[1] + (T > 1 ? 1 : 0); i++) out.push('pzschreck');
  out.push('sani');
  const pool = vehPool(T), nv = g[2] + (T >= 2 && g[2] ? 1 : 0);
  for (let i = 0; i < nv; i++) out.push(p.kind === 'qg' ? wpickR(['kingtiger', 'tiger', 'jagdpanther', 'panther']) : wpickR(pool));
  if (p.kind === 'aerodromo') out.push('wirbelwind');
  return out;
}
function wpickR(a) { return a[(rand() * a.length) | 0]; }
function materialize(p) {
  if (!p.built) {
    p.built = true;
    for (let k of GAR_BLD[p.kind]) {
      if (k.endsWith('?')) { if (rand() < 0.5) continue; k = k.slice(0, -1); }
      const s = freeSpotNear(p.x, p.z, 14, p.r * 0.9, 6);
      spawnBuilding(k, s.x, s.z, { complete: true, heading: Math.atan2(p.x - s.x, p.z - s.z) + Math.PI });
    }
  }
  const kinds = p.left || garrisonKinds(p);
  p.units = [];
  for (const k of kinds) {
    const inf = UT[(SC.unitMap && SC.unitMap[k]) || k].inf, s = freeSpotNear(p.x, p.z, inf ? 4 : 14, p.r * (inf ? 0.8 : 1.1), inf ? 1 : 4);
    p.units.push(spawnUnit(k, s.x, s.z, { order: 'guard', heading: rand() * 6.28 }));
  }
  p.left = null; p.spawned = true;
}
function dematerialize(p) {
  const alive = p.units.filter(u => u.alive && !u.removed);
  if (alive.some(u => u.downed || u.target || S.time - u.hitT < 8)) return;
  p.left = alive.map(u => u.kind);
  for (const u of alive) removeEnt(u);
  p.units = []; p.spawned = false;
}
function updFront(dt) {
  if (!SC.big || (S.phase !== 'base' && S.phase !== 'deploy')) return;
  FRONT.scanT -= dt; if (FRONT.scanT > 0) return; FRONT.scanT = 1.5;
  const us = [], deN = { n: 0 };
  for (const e of ents) {
    if (!e.alive) continue;
    if (e.team === 'us' && !(e.def && e.def.naval)) us.push(e);
    else if (e.team === 'de' && e.unit) deN.n++;
  }
  // tropas de ofensivas que chegaram viram a nova guarnição do lugar
  for (const e of ents) if (e.alive && e.raidPlace && e.order === 'guard') { const p = e.raidPlace; e.raidPlace = null; p.units.push(e); p.spawned = true; p.built = true; }
  for (const p of S.places) {
    let md = Infinity;
    for (const e of us) { const dx = e.x - p.x, dz = e.z - p.z, d = dx * dx + dz * dz; if (d < md) { md = d; if (md < 490000) break; } }
    md = Math.sqrt(md);
    if (!p.spawned && md < 700 && p.cp.owner === 'de' && deN.n < 240) { materialize(p); deN.n += p.units.length; }
    else if (p.spawned && md > 1350) dematerialize(p);
  }
}
// a frente alemã escolhe um lugar seu exposto (ou a base) e ataca a partir do lugar alemão mais próximo
function frontOffensive(n) {
  const mine = S.cps.filter(c => c.owner === 'us'), base = S.usHQ && S.usHQ.alive ? S.usHQ : ents.find(e => e.alive && e.team === 'us' && e.building);
  const expo = (t) => { let bd = Infinity, src = null; for (const c of S.cps) if (c.owner === 'de') { const d = Math.hypot(c.x - t.x, c.z - t.z); if (d > 150 && d < bd) { bd = d; src = c; } } return [bd, src]; };
  let tgt = null, src = null, isBase = false;
  if (mine.length && (rand() < 0.75 || !base)) {
    const ranked = mine.map(c => [expo(c), c]).filter(r => r[0][1]).sort((a, b) => a[0][0] - b[0][0]).slice(0, 3);
    if (ranked.length) { const r = ranked[(rand() * ranked.length) | 0]; tgt = r[1]; src = r[0][1]; }
  }
  if (!tgt && base) { tgt = base; isBase = true; src = expo(base)[1]; }
  if (!tgt) return;
  const sx = src ? src.x : S.deHQ ? S.deHQ.x : tgt.x, sz = src ? src.z : S.deHQ ? S.deHQ.z - 60 : tgt.z - 400;
  const srcName = src ? src.town.name : hqTown(), tier = src && src.place ? src.place.tier : Math.min(3, Math.floor(n / 3));
  const comp = [];
  for (let i = 0; i < 4 + Math.min(n, 10); i++) comp.push('gren');
  for (let i = 0; i < 1 + Math.floor(n / 3); i++) comp.push('pzschreck');
  comp.push('sani');
  for (let i = 0; i < Math.min(1 + Math.floor(n / 2), 6); i++) comp.push(wpickR(vehPool(tier)));
  const tz = tgt.z, tx = tgt.x;
  for (const k of comp) {
    const u = spawnUnit(k, sx + rr(-22, 22), sz + rr(-22, 22), { heading: Math.atan2(tx - sx, tz - sz) });
    u.order = 'amove'; u.dest = { x: tx + rr(-16, 16), z: tz + rr(-16, 16) };
    if (isBase) u.wave = true; else u.raidPlace = tgt.place || null;
    if (u.kind === 'jinf' && rand() < 0.5) u.banzai = true;
  }
  S.pings.push({ x: tx, z: tz, t: 6 }); S.pings.push({ x: sx, z: sz, t: 6 });
  toast('Ofensiva ' + foe().adjF + ' saindo de ' + srcName + ' rumo a ' + (isBase ? 'sua base' : tgt.town.name) + '!', 'bad');
}
