'use strict';
/* =========================================================
   SOLDADOS low-poly dos EUA e da Alemanha (1944)
   - silhueta em V: ombros largos, cintura fina, túnica com bolsos
   - capacete M1 (aba reta) e Stahlhelm (viseira e saia abertas)
   - equipamento: cinto de cartucheiras M1923, suspensórios, mochila M1928,
     pá, cantil, baioneta / suspensório em Y, porta-carregadores triplos,
     sacola de pão, lata da máscara de gás, marmita, botas de cano alto
   - fuzis M1 Garand e Kar98k com coronha perfilada
   Facetas planas (flat shading) e poucos polígonos para celular.
   As peças continuam separadas (corpo, coxas, canelas, braços,
   antebraços e arma) com os mesmos pivôs: as animações não mudam.
   Civis e soldados japoneses usam o modelo anterior.
   ========================================================= */
const _makeSoldierOld = makeSoldier;

/* ---------- primitivas facetadas ---------- */
function flatGeo(geo) { const g = geo.toNonIndexed(); g.computeVertexNormals(); return g; }
const SG = {
  c6: flatGeo(new THREE.CylinderGeometry(1, 1, 1, 6)),
  c8: flatGeo(new THREE.CylinderGeometry(1, 1, 1, 8)),
  t8: flatGeo(new THREE.CylinderGeometry(1, 0.8, 1, 8)),
  s6: flatGeo(new THREE.SphereGeometry(1, 6, 4)),
  s8: flatGeo(new THREE.SphereGeometry(1, 8, 6)),
  head: flatGeo(new THREE.SphereGeometry(1, 10, 8)),
  dome: flatGeo(new THREE.SphereGeometry(1, 12, 5, 0, Math.PI * 2, 0, Math.PI / 2)),
};
const _dk = new THREE.Color();
function shade(hex, k) { return _dk.setHex(hex).multiplyScalar(k).getHex(); }
// anéis livres ([x, y, z] por vértice) ligados em faixas, com tampas
function ringLoft(R) {
  const n = R[0].length, tris = [];
  for (let r = 0; r < R.length - 1; r++) for (let i = 0; i < n; i++) {
    const a = R[r][i], b = R[r][(i + 1) % n], c = R[r + 1][(i + 1) % n], d = R[r + 1][i];
    tris.push([a, b, c], [a, c, d]);
  }
  for (const r of [0, R.length - 1]) {
    let cx = 0, cy = 0, cz = 0; for (const p of R[r]) { cx += p[0]; cy += p[1]; cz += p[2]; }
    const c = [cx / n, cy / n, cz / n];
    for (let i = 0; i < n; i++) tris.push([c, R[r][i], R[r][(i + 1) % n]]);
  }
  return _orient(tris);
}
// anel elíptico; f(frente) dá o deslocamento em y e o fator de raio conforme o ângulo (frente = +z)
function helmRing(n, y, rx, rz, dz, f) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2, front = Math.max(0, Math.sin(a)), back = Math.max(0, -Math.sin(a));
    const [dy, k] = f ? f(front, back) : [0, 1];
    out.push([Math.cos(a) * rx * k, y + dy, Math.sin(a) * rz * k + dz]);
  }
  return out;
}
// tons das imagens de referência: verde-oliva americano e cinza-campo alemão
const SOLDIER_PAL2 = {
  us: { jacket: 0x5e6242, pants: 0x4f5337, helm: 0x4c5434, band: 0x3a4028, web: 0x8f8760, boot: 0x5a3c22, legging: 0x9a8e66, pack: 0x7a7350 },
  de: { jacket: 0x5a6656, pants: 0x535d50, helm: 0x56605a },
};
const TORSO_PLAN = superPlan(1, 1, 10, 3.2, 2.6);
const _torsoCache = new Map();
function torsoGeo(key, rings) { let g = _torsoCache.get(key); if (!g) { g = loftPlan(TORSO_PLAN, rings); _torsoCache.set(key, g); } return g; }

/* ---------- capacetes ---------- */
const HELM_M1 = (() => ringLoft([
  helmRing(14, 2.085, 0.238, 0.258, -0.005),
  helmRing(14, 2.06, 0.244, 0.264, -0.005, (f, b) => [-0.03 * (1 - f) - 0.01 * b, 1]),
  helmRing(14, 2.055, 0.272, 0.292, -0.005, (f, b) => [-0.03 * (1 - f) - 0.012 * b, 1]),
]))();
const HELM_DE = (() => ringLoft([
  helmRing(14, 2.09, 0.228, 0.248, -0.012),
  helmRing(14, 2.08, 0.232, 0.252, -0.012, (f) => [-0.1 * (1 - f) + 0.04 * f, 1 - 0.02 * f]),
  helmRing(14, 2.02, 0.27, 0.29, -0.012, (f) => [-0.1 * (1 - f) + 0.075 * f - 0.005, 1 + 0.08 * (1 - f) - 0.06 * f]),
]))();

/* ---------- rosto ---------- */
function soldierHead(B, sk) {
  const sd = shade(sk, 0.86), dark = 0x2a1e16;
  B.add(SG.c8, sk, 0.075, 0.16, 0.08, 0, 1.83, 0.0);
  B.add(SG.head, sk, 0.162, 0.19, 0.178, 0, 2.0, 0.0);
  B.add(G.box, sd, 0.2, 0.1, 0.17, 0, 1.905, 0.045);                 // mandíbula com barba por fazer
  B.add(G.box, sk, 0.21, 0.07, 0.16, 0, 1.955, 0.055);               // maçãs do rosto
  B.add(G.box, sd, 0.1, 0.05, 0.05, 0, 1.87, 0.115);                 // queixo
  B.add(G.box, sk, 0.045, 0.075, 0.06, 0, 1.975, 0.175, -0.25, 0, 0); // nariz
  B.add(G.box, 0x6a3a2c, 0.075, 0.014, 0.02, 0, 1.912, 0.165);       // boca
  for (const sx of [-1, 1]) {
    B.add(G.box, 0xece6da, 0.045, 0.024, 0.012, sx * 0.058, 2.018, 0.163);
    B.add(G.box, 0x1c1610, 0.022, 0.024, 0.014, sx * 0.058, 2.018, 0.167);
    B.add(G.box, dark, 0.07, 0.02, 0.03, sx * 0.06, 2.048, 0.16, 0, 0, sx * -0.12); // sobrancelhas
    B.add(SG.s6, sk, 0.032, 0.05, 0.025, sx * 0.162, 1.99, -0.005);  // orelhas
  }
}

/* ---------- corpo (parte fixa) ---------- */
function soldierBodyNew(B, team, pal, variant, role) {
  const us = team === 'us', J = pal.jacket, Jd = shade(J, 0.82), sk = pal.skin;
  B.cf = camoFor(team, variant, J);
  // túnica: alemã mais longa, com saia e bolsos baixos
  B.add(torsoGeo(team, us
    ? [[0.86, 0.5, 0.31], [1.0, 0.46, 0.28], [1.2, 0.5, 0.3], [1.44, 0.6, 0.34, 0.01], [1.63, 0.64, 0.31], [1.73, 0.54, 0.26], [1.8, 0.28, 0.19]]
    : [[0.8, 0.55, 0.34], [1.0, 0.46, 0.28], [1.2, 0.5, 0.3], [1.44, 0.6, 0.34, 0.01], [1.63, 0.64, 0.31], [1.73, 0.54, 0.26], [1.8, 0.28, 0.19]]), J, 1, 1, 1, 0, 0, 0);
  B.add(G.box, pal.pants, 0.22, 0.14, 0.24, 0, 0.86, 0);             // entrepernas
  for (const sx of [-1, 1]) {
    // bolsos do peito com lapela e botão
    B.add(G.box, Jd, 0.13, 0.12, 0.02, sx * 0.14, 1.43, 0.177);
    B.add(G.box, shade(J, 0.7), 0.135, 0.035, 0.03, sx * 0.14, 1.485, 0.18);
    B.add(G.box, 0x2c2a22, 0.018, 0.018, 0.02, sx * 0.14, 1.475, 0.195);
    if (!us) {
      B.add(G.box, Jd, 0.15, 0.14, 0.03, sx * 0.15, 0.9, 0.17);      // bolsos baixos
      B.add(G.box, shade(J, 0.7), 0.155, 0.04, 0.035, sx * 0.15, 0.96, 0.172);
      B.add(G.box, pal.collar || Jd, 0.11, 0.03, 0.16, sx * 0.27, 1.72, 0);  // dragonas
    }
  }
  // botões frontais
  for (let i = 0; i < 4; i++) B.add(G.box, us ? 0x3a3a2c : 0x8c8c80, 0.022, 0.022, 0.015, 0, 1.2 + i * 0.13, 0.182 + (i > 1 ? 0 : -0.01));
  // gola
  if (us) for (const sx of [-1, 1]) B.add(G.box, J, 0.13, 0.03, 0.1, sx * 0.07, 1.79, 0.08, 0.6, sx * 0.5, 0);
  else {
    B.add(SG.c8, pal.collar, 0.15, 0.08, 0.14, 0, 1.79, 0.0);
    for (const sx of [-1, 1]) B.add(G.box, 0xb8b8a8, 0.045, 0.03, 0.01, sx * 0.07, 1.79, 0.135);
    B.add(G.box, 0xb8b8a8, 0.1, 0.035, 0.01, 0.14, 1.53, 0.18);       // águia do peito
  }
  B.cf = null;
  soldierHead(B, sk);
  if (us) {
    // capacete M1 com jugular
    B.add(SG.dome, pal.helm, 0.238, 0.22, 0.258, 0, 2.085, -0.005);
    B.add(HELM_M1, pal.helm, 1, 1, 1, 0, 0, 0);
    for (const sx of [-1, 1]) B.add(G.box, pal.band, 0.022, 0.17, 0.02, sx * 0.168, 1.93, 0.02, 0, 0, sx * -0.08);
    if (variant === 1) for (const [x, z, s] of [[0.1, 0.1, 1], [-0.13, -0.04, 1.2], [0.03, -0.16, 0.9], [-0.05, 0.13, 0.8], [0.16, -0.08, 0.9]]) B.add(G.ico, 0x55603a, 0.08 * s, 0.05, 0.08 * s, x, 2.28, z);
    else for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; B.add(G.box, shade(pal.helm, 0.75), 0.012, 0.012, 0.3, Math.cos(a) * 0.12, 2.225, Math.sin(a) * 0.12, 0, a, 0.4); } // rede
    // cinto de cartucheiras M1923 e suspensórios
    B.add(torsoGeo('usbelt', [[0.97, 0.5, 0.31], [1.07, 0.5, 0.31]]), pal.web, 1, 1, 1, 0, 0, 0);
    for (const x of [-0.2, -0.1, 0.1, 0.2]) B.add(G.box, pal.web, 0.085, 0.11, 0.06, x, 1.02, 0.16);
    for (const sx of [-1, 1]) B.add(G.box, pal.web, 0.06, 0.11, 0.08, sx * 0.25, 1.02, 0.07, 0, sx * 0.9, 0);
    B.add(G.box, 0x8a8a7a, 0.06, 0.055, 0.02, 0, 1.02, 0.165);
    for (const sx of [-1, 1]) {
      B.add(G.box, pal.web, 0.045, 0.66, 0.02, sx * 0.09, 1.4, 0.19, -0.06, 0, sx * 0.08);
      B.add(G.box, pal.web, 0.045, 0.02, 0.32, sx * 0.13, 1.745, -0.01);
      B.add(G.box, pal.web, 0.045, 0.62, 0.02, sx * 0.1, 1.42, -0.17, 0.05, 0, sx * -0.06);
    }
    // mochila M1928 com pá M1943; cantil e baioneta no cinto
    B.add(G.box, pal.pack, 0.32, 0.36, 0.13, 0, 1.42, -0.235);
    B.add(G.box, shade(pal.pack, 0.85), 0.3, 0.11, 0.05, 0, 1.56, -0.31);
    B.add(SG.c8, 0x7d6d48, 0.075, 0.38, 0.075, 0, 1.68, -0.24, 0, 0, Math.PI / 2);   // cobertor enrolado
    B.add(G.box, 0x4d4f45, 0.15, 0.2, 0.03, 0, 1.1, -0.3);
    B.add(SG.c6, 0x5e4a30, 0.018, 0.22, 0.018, 0, 1.3, -0.3);
    B.add(SG.c8, 0x5f6040, 0.07, 0.17, 0.065, 0.24, 0.94, -0.13);
    B.add(G.box, 0x3a3a34, 0.04, 0.3, 0.03, -0.26, 0.93, -0.08);
    B.add(G.box, 0x6b6747, 0.1, 0.1, 0.06, -0.15, 0.93, 0.15);        // estojo de primeiros socorros
  } else {
    // Stahlhelm M40
    B.add(SG.dome, pal.helm, 0.228, 0.2, 0.248, 0, 2.09, -0.012);
    B.add(HELM_DE, pal.helm, 1, 1, 1, 0, 0, 0);
    for (const sx of [-1, 1]) B.add(SG.s6, shade(pal.helm, 0.8), 0.012, 0.012, 0.012, sx * 0.232, 2.11, 0);
    B.add(G.box, 0x1d1b19, 0.02, 0.15, 0.02, 0.165, 1.92, 0.03, 0, 0, -0.1);
    if (variant === 1) for (const [x, z] of [[0.12, 0.05], [-0.1, -0.08], [0.0, 0.12], [0.05, -0.15]]) B.add(G.ico, 0x4e5a35, 0.08, 0.05, 0.08, x, 2.26, z);
    // cinto, suspensório em Y e porta-carregadores triplos
    B.add(torsoGeo('debelt', [[0.97, 0.5, 0.31], [1.06, 0.5, 0.31]]), pal.web, 1, 1, 1, 0, 0, 0);
    B.add(G.box, 0x8a8a80, 0.07, 0.06, 0.02, 0, 1.015, 0.165);
    for (const sx of [-1, 1]) {
      for (const x of [0.085, 0.155, 0.225]) B.add(G.box, pal.web, 0.065, 0.11, 0.075, sx * x, 1.07, 0.17);
      B.add(G.box, pal.web, 0.04, 0.66, 0.02, sx * 0.105, 1.42, 0.19, -0.06, 0, sx * 0.1);
      B.add(G.box, pal.web, 0.04, 0.02, 0.3, sx * 0.14, 1.745, 0.0);
    }
    B.add(G.box, pal.web, 0.045, 0.64, 0.02, 0, 1.38, -0.17);
    // sacola de pão, cantil, marmita, lata da máscara de gás, pá e baioneta
    B.add(G.box, 0x6b6a52, 0.22, 0.18, 0.08, 0.18, 0.9, -0.15, 0, -0.4, 0);
    B.add(SG.c8, 0x4a4c3a, 0.065, 0.16, 0.06, 0.28, 0.92, -0.04);
    B.add(G.box, 0x4f5348, 0.17, 0.14, 0.07, 0.07, 1.42, -0.22);
    B.add(SG.c8, 0x4f5348, 0.075, 0.32, 0.075, -0.06, 1.2, -0.25, 0, 0, 0.75);
    B.add(SG.c8, 0x3e423a, 0.08, 0.03, 0.08, 0.06, 1.31, -0.25, 0, 0, 0.75);
    B.add(G.box, 0x45473b, 0.13, 0.17, 0.03, -0.24, 0.9, -0.12, 0, 0.5, 0);
    B.add(G.box, 0x3a3a34, 0.04, 0.3, 0.035, -0.27, 0.93, -0.02);
  }
  if (role === 'med') {
    // braçadeira e cruzes no capacete
    const y = us ? 2.165 : 2.15, r = us ? 0.235 : 0.226;
    for (const [x, z, ry] of [[0, r + 0.012, 0], [0, -r - 0.012, Math.PI], [r - 0.02, 0, Math.PI / 2], [-r + 0.02, 0, -Math.PI / 2]]) {
      B.add(G.box, 0xf2f0e8, 0.15, 0.15, 0.015, x, y, z, 0, ry, 0);
      B.add(G.box, 0xb3241d, 0.1, 0.03, 0.02, x, y, z, 0, ry, 0);
      B.add(G.box, 0xb3241d, 0.03, 0.1, 0.02, x, y, z, 0, ry, 0);
    }
    B.add(G.box, 0xf2f0e8, 0.3, 0.2, 0.12, 0, 1.0, -0.2);
    B.add(G.box, 0xb3241d, 0.1, 0.03, 0.01, 0, 1.0, -0.265);
  }
}

/* ---------- fuzis ---------- */
const _rifleOld = WEAPONS.rifle;
WEAPONS.rifle = (B, team) => {
  if (team === 'de' && jpGear()) return _rifleOld(B, team);
  const de = team === 'de', wood = de ? 0x5e3b22 : 0x7e4a28, met = 0x2a2b2b;
  // coronha perfilada (z = frente, y = cima)
  const stock = de
    ? [[-0.62, 0.03], [-0.25, 0.02], [-0.2, 0.0], [0.62, 0.0], [0.64, -0.025], [0.6, -0.045], [-0.02, -0.05], [-0.18, -0.06], [-0.26, -0.06], [-0.62, -0.13]]
    : [[-0.62, 0.04], [-0.3, 0.025], [-0.2, 0.0], [0.56, 0.0], [0.58, -0.02], [0.55, -0.05], [0.0, -0.055], [-0.12, -0.07], [-0.19, -0.11], [-0.26, -0.075], [-0.62, -0.14]];
  B.add(sideProfile(stock, 0.065), wood, 1, 1, 1, 0, 0, 0);
  B.add(G.box, 0x1e1e1c, 0.07, 0.15, 0.02, 0, -0.05, -0.625);        // chapa da soleira
  B.add(G.box, met, 0.055, 0.06, 0.3, 0, 0.03, -0.06);                // caixa da culatra
  B.add(G.box, wood, 0.055, 0.035, de ? 0.32 : 0.42, 0, 0.032, de ? 0.4 : 0.31);
  B.add(SG.c6, met, 0.017, de ? 0.34 : 0.42, 0.017, 0, 0.025, de ? 0.78 : 0.76, Math.PI / 2, 0, 0);
  B.add(G.box, met, 0.012, 0.035, 0.015, 0, 0.055, de ? 0.94 : 0.95);  // massa de mira
  B.add(G.box, met, 0.035, 0.03, 0.03, 0, 0.075, -0.15);              // alça de mira
  B.add(G.box, met, 0.02, 0.045, 0.08, 0, -0.07, -0.1);               // guarda-mato
  for (const z of de ? [0.2, 0.58] : [0.2, 0.5]) B.add(G.box, met, 0.068, 0.07, 0.02, 0, 0.0, z); // braçadeiras
  if (de) { B.add(SG.c6, met, 0.012, 0.09, 0.012, 0.055, 0.0, -0.12, 0, 0, Math.PI / 2 + 0.4); B.add(SG.s6, met, 0.02, 0.02, 0.02, 0.095, -0.02, -0.12); }
  else B.add(G.box, met, 0.02, 0.02, 0.05, 0.035, 0.05, 0.0);         // alavanca de manejo
  B.add(G.box, 0x5a4a30, 0.012, 0.018, 0.7, -0.04, -0.09, 0.02, 0.06, 0, 0); // bandoleira
};

/* ---------- soldado completo ---------- */
makeSoldier = function (team, kind, palKey) {
  if (team === 'civ' || (team === 'de' && jpGear())) return _makeSoldierOld(team, kind, palKey);
  const us = team === 'us';
  const variant = (Math.random() * 3) | 0, skin = (Math.random() * SKINS.length) | 0;
  const role = kind === 'medic' || kind === 'sani' ? 'med' : kind === 'para' ? 'para' : '';
  const pal = Object.assign({}, SOLDIER_PAL[team], SOLDIER_PAL2[team], (SC.pal && SC.pal[palKey || team]) || {}, role === 'para' ? PARA_PAL : {}, { skin: SKINS[skin] });
  const key = 'v2' + team + (palKey || '') + variant + 's' + skin + role + SC.id;
  const g = new THREE.Group(); g.rotation.order = 'YXZ';
  VM(merged('body' + key, B => { soldierBodyNew(B, team, pal, variant, role); if (role === 'para') roleExtras(B, team, role); }), g, 0, 0, 0, true);
  const thighG = merged('thigh' + key, B => {
    B.cf = camoFor(team, variant, pal.pants);
    B.add(SG.s8, pal.pants, 0.125, 0.12, 0.135, 0, 0, 0);
    B.add(SG.t8, pal.pants, 0.13, 0.5, 0.14, 0, -0.25, 0);
    B.add(G.box, shade(pal.pants, 0.85), 0.04, 0.16, 0.13, 0.12 * (us ? 1 : 0.9), -0.24, 0.01);  // bolso lateral
  });
  const shinG = merged('shin' + key, B => {
    const boot = pal.boot;
    B.add(SG.s8, pal.pants, 0.105, 0.1, 0.112, 0, 0, 0.01);
    B.add(SG.t8, pal.pants, 0.105, 0.3, 0.11, 0, -0.15, 0);
    if (us) {
      // perneira de lona com ilhoses e botina marrom
      B.add(SG.t8, pal.legging, 0.105, 0.22, 0.112, 0, -0.35, 0);
      for (let i = 0; i < 4; i++) B.add(G.box, 0x3e3a2c, 0.02, 0.018, 0.02, 0.1, -0.27 - i * 0.05, 0.03);
      B.add(G.box, boot, 0.15, 0.09, 0.25, 0, -0.475, 0.05);
      B.add(SG.s6, boot, 0.078, 0.055, 0.085, 0, -0.475, 0.17);
    } else {
      // bota de cano alto (Marschstiefel)
      B.add(SG.c8, boot, 0.108, 0.34, 0.118, 0, -0.3, 0);
      B.add(SG.c8, shade(boot, 1.4), 0.112, 0.025, 0.122, 0, -0.135, 0);
      B.add(G.box, boot, 0.15, 0.09, 0.25, 0, -0.475, 0.05);
      B.add(SG.s6, boot, 0.078, 0.055, 0.085, 0, -0.475, 0.17);
    }
    B.add(G.box, 0x171410, 0.16, 0.03, 0.3, 0, -0.52, 0.06);            // sola e salto
  });
  const upperG = merged('upper' + key, B => {
    B.cf = camoFor(team, variant, pal.jacket);
    B.add(SG.s8, pal.jacket, 0.11, 0.11, 0.115, 0, 0, 0);
    B.add(SG.t8, pal.jacket, 0.095, 0.38, 0.1, 0, -0.18, 0);
    if (role === 'med') { B.add(SG.c8, 0xf2f0e8, 0.1, 0.11, 0.105, 0, -0.1, 0); B.add(G.box, 0xb3241d, 0.205, 0.07, 0.025, 0, -0.1, 0); B.add(G.box, 0xb3241d, 0.205, 0.025, 0.07, 0, -0.1, 0); }
    if (us && variant === 2) for (let i = 0; i < 3; i++) for (const sx of [-1, 1]) B.add(G.box, 0xc9b25a, 0.012, 0.022, 0.12, sx * 0.086, -0.1 - i * 0.04, 0, 0, 0, 0);
  });
  const foreG = merged('fore' + key, B => {
    B.cf = camoFor(team, variant, pal.jacket);
    B.add(SG.s8, pal.jacket, 0.085, 0.085, 0.088, 0, 0, 0);
    B.add(SG.t8, pal.jacket, 0.084, 0.28, 0.086, 0, -0.14, 0);
    B.add(SG.c8, shade(pal.jacket, 0.85), 0.074, 0.05, 0.076, 0, -0.28, 0);
    B.cf = null;
    B.add(G.box, pal.skin, 0.085, 0.11, 0.065, 0, -0.35, 0.015);        // punho
    B.add(G.box, pal.skin, 0.03, 0.06, 0.03, -0.04, -0.33, 0.05);       // polegar
  });
  const leg = (x) => {
    const th = new THREE.Group(); th.position.set(x, 0.98, 0); VM(thighG, th, 0, 0, 0, false);
    const kn = new THREE.Group(); kn.position.y = -0.5; th.add(kn); VM(shinG, kn, 0, 0, 0, false);
    g.add(th); return [th, kn];
  };
  const arm = (x) => {
    const sh = new THREE.Group(); sh.position.set(x, 1.68, 0); VM(upperG, sh, 0, 0, 0, false);
    const el = new THREE.Group(); el.position.y = -0.36; sh.add(el); VM(foreG, el, 0, 0, 0, false);
    g.add(sh); return [sh, el];
  };
  const [legL, shinL] = leg(-0.13), [legR, shinR] = leg(0.13);
  const [armL, foreL] = arm(-0.39), [armR, foreR] = arm(0.39);
  let rifle = null, tube = false;
  if (role !== 'med') {
    let wk = kind === 'bazooka' ? 'bazooka' : kind === 'pzschreck' ? 'pzschreck' : 'rifle';
    if (wk === 'rifle' && variant === 2) wk = us ? 'thompson' : 'mp40';
    rifle = new THREE.Group(); g.add(rifle);
    VM(merged('wpn2' + wk + team, B => WEAPONS[wk](B, team)), rifle, 0, 0, 0, false);
    if (wk === 'bazooka' || wk === 'pzschreck') { tube = true; rifle.position.set(0.27, 1.84, 0.12); }
  }
  blob(g, 1.4);
  g.scale.setScalar(1.12);
  g.userData = { legL, legR, shinL, shinR, armL, armR, foreL, foreR, rifle, tube };
  return g;
};
