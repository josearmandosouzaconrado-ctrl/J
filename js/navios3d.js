'use strict';
/* =========================================================
   NAVIOS 3D — modelados do zero
   - casco por cavernas (seções) com tosamento, alargamento da proa,
     roda de proa inclinada, popa em painel e linha-d'água
   - superestruturas, chaminés inclinadas, mastros com radar, reparos
     de 5" e 6", Bofors de 40 mm, Oerlikons, tubos de torpedo, botes
   - pintura no shader: Measure 22 (azul-marinho e cinza), Measure 21,
     cinza de Kure, Kriegsmarine, verde das lanchas PT, convés e faixa preta
   Proporções reais, escaladas para o comprimento usado pelo jogo.
   Contratos: navios jogáveis { turret, turrets, muzzle, L }; LCVP { ramp, troops };
   LST { doorL, doorR, ramp, L }; navios ao largo { guns, len }
   ========================================================= */
const Navio3 = (() => {
  const KT = Blindado3.kit, { MB, loft, lathe, once, decal, canvasTex, NOISE, box, C6, C8, C12, C16, SPH, PT, PD, STEEL, DARK, tube, prism } = KT;
  const TAU = Math.PI * 2, lerp = (a, b, t) => a + (b - a) * t, ss = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const GLASS = 0x1e2a30, WOODD = 0x8a7454;

  /* ---------- casco ---------- */
  // o = { L, B, D (borda livre a meia-nau), T (calado), sheerF, sheerA, flare, transom (0..1), rake, bowStart, n }
  function hullGeo(o) {
    const N = o.n || 26, R = [];
    for (let i = 0; i <= N; i++) {
      const u = i / N, z = -o.L / 2 + o.L * u;
      let w;
      if (u < 0.12) w = lerp(o.transom !== undefined ? o.transom : 0.72, 1, ss(0, 0.12, u));
      else if (u < (o.bowStart || 0.6)) w = 1;
      else { const v = (u - (o.bowStart || 0.6)) / (1 - (o.bowStart || 0.6)); w = Math.max(0.015, Math.cos(v * Math.PI / 2) * (1 - v * 0.08)); }
      const hw = o.B / 2 * w;
      const h = o.D + (o.sheerF || 0) * Math.pow(ss(0.5, 1, u), 2) + (o.sheerA || 0) * Math.pow(1 - ss(0, 0.35, u), 2) + (o.step && u < o.step[0] ? o.step[1] : 0);
      const fl = 1 + (o.flare || 0.1) * ss(0.55, 1, u), T = o.T * (u < 0.06 ? 0.55 + u * 7 : 1);
      const rk = (o.rake || 0) * ss(0.97, 1, u);
      const side = [[hw * fl, h], [hw * lerp(1, fl, 0.4), h * 0.5], [hw, 0], [hw * 0.94, -T * 0.5], [hw * 0.6, -T * 0.92]];
      const ring = side.map(([x, y]) => [x, y, z + rk * (y + T) / (h + T)]);
      ring.push([0, -T, z]);
      for (let k = side.length - 1; k >= 0; k--) { const [x, y] = side[k]; ring.push([-x, y, z + rk * (y + T) / (h + T)]); }
      R.push(ring);
    }
    return loft(R, {});
  }
  // superestrutura: caixa com cantos chanfrados e teto
  const house = (B, x, y, z, w, h, d, cf) => B.add(KT.prism([[d / 2, 0, w / 2 - (cf || 0)], [d / 2 - (cf || 0), 0, w / 2], [-d / 2, 0, w / 2], [-d / 2, h, w / 2], [d / 2 - (cf || 0), h, w / 2], [d / 2, h, w / 2 - (cf || 0)]].map(p => p)), PT, 1, 1, 1, x, y, z);
  function deckhouse(B, x, y, z, w, h, d, cf) {
    B.add(Blindado3.tloft(Blindado3.plan8(w, d, cf || 0, (cf || 0) * 0.5), [[y, 1, 1], [y + h, 1, 1]]), PT, 1, 1, 1, x, 0, z);
    B.add(box, PD, w + 0.06, 0.08, d + 0.06, x, y + h, z);
  }
  // chaminé oval inclinada com capa
  function funnel(B, x, y, z, rw, rd, h, rake, cap) {
    const R = []; for (let k = 0; k <= 3; k++) { const t = k / 3, r = []; for (let i = 0; i < 14; i++) { const a = i / 14 * TAU; r.push([x + Math.cos(a) * rw, y + h * t, z + Math.sin(a) * rd - rake * h * t]); } R.push(r); }
    B.add(loft(R, { smooth: true }), PT);
    B.add(C16, cap || DARK, rw * 1.04, h * 0.08, rd * 1.04, x, y + h * 0.97, z - rake * h * 0.97);
    B.add(C16, 0x111111, rw * 0.85, h * 0.02, rd * 0.85, x, y + h * 1.01, z - rake * h);
  }
  function mast(B, x, y, z, h, yard) {
    B.add(C8, PD, 0.2, h, 0.2, x, y + h / 2, z);
    if (yard) B.add(box, PD, yard, 0.12, 0.12, x, y + h * 0.72, z);
    B.add(box, DARK, 1.4, 0.6, 0.2, x, y + h * 0.9, z + 0.3);                                 // antena de radar
    for (let i = 0; i < 4; i++) B.add(box, DARK, 0.06, 0.6, 0.06, x - 0.6 + i * 0.4, y + h * 0.9, z + 0.42);
  }
  const rail = (B, pts) => B.add(tube(pts, 0.03, 4), PD);
  // reparo de 40 mm duplo/quádruplo numa banheira
  function bofors(B, x, y, z, ry, quad) {
    B.add(C16, PT, 1.6, 0.9, 1.6, x, y + 0.45, z);
    B.add(box, DARK, quad ? 1.4 : 0.8, 0.5, 0.8, x, y + 1.1, z);
    for (let i = 0; i < (quad ? 4 : 2); i++) B.add(C8, DARK, 0.06, 2.0, 0.06, x + (i - (quad ? 1.5 : 0.5)) * 0.3, y + 1.25, z + Math.cos(ry || 0) * 1.2, Math.PI / 2 - 0.2, ry || 0, 0);
  }
  function oerlikon(B, x, y, z, ry) { B.add(C8, PD, 0.08, 1.0, 0.08, x, y + 0.5, z); B.add(box, PD, 0.6, 0.5, 0.05, x, y + 1.0, z + 0.2); B.add(C8, DARK, 0.04, 1.6, 0.04, x, y + 1.1, z + 0.9, Math.PI / 2 - 0.3, ry || 0, 0); }
  // tubos de torpedo (feixe de n)
  function torpedoes(B, x, y, z, n, len) { B.add(C16, PT, 0.9, 0.4, 0.9, x, y + 0.2, z); for (let i = 0; i < n; i++) B.add(C12, PD, 0.27, len, 0.27, x + (i - (n - 1) / 2) * 0.6, y + 0.7, z, 0, Math.PI / 2, Math.PI / 2); }
  function boat(B, x, y, z, len) { B.add(once('boat', () => lathe([[0, -0.5], [0.4, -0.45], [0.5, 0.0], [0.42, 0.45], [0, 0.5]].map(([r, h]) => [r, h]), 10)), 0xb8b8b0, 0.9, len, 0.6, x, y + 0.5, z, Math.PI / 2, 0, 0); B.add(box, STEEL, 0.1, 1.2, 0.1, x + 0.9, y + 0.6, z + len * 0.3); B.add(box, STEEL, 0.1, 1.2, 0.1, x + 0.9, y + 0.6, z - len * 0.3); }
  function dcRack(B, x, y, z) { for (let i = 0; i < 4; i++) B.add(C12, 0x4a4a46, 0.3, 0.6, 0.3, x, y + 0.4, z + i * 0.65, 0, 0, Math.PI / 2); B.add(box, STEEL, 0.1, 0.8, 2.8, x + 0.35, y + 0.4, z + 0.95); }

  /* ---------- reparos de artilharia (giram) ---------- */
  // 5"/38 fechado (Mk 30) ou duplo (Mk 38); 6"/47 triplo; japonês 5"/50 duplo
  function mountGeo(type) {
    return once('mount' + type, () => {
      const B = new MB(), m = {
        us5: { w: 2.9, d: 4.2, h: 2.3, n: 1, len: 6.0, r: 0.13 }, us5x2: { w: 4.6, d: 5.5, h: 2.6, n: 2, len: 6.0, r: 0.13 },
        us6: { w: 7.0, d: 8.5, h: 3.2, n: 3, len: 9.0, r: 0.2 }, jp5: { w: 4.2, d: 5.0, h: 2.5, n: 2, len: 6.5, r: 0.14 }, us14: { w: 9.5, d: 11, h: 3.8, n: 3, len: 14, r: 0.3 },
        bb12: { w: 8.0, d: 9.5, h: 3.4, n: 2, len: 12, r: 0.26 },
      }[type];
      B.add(Blindado3.tloft(Blindado3.plan8(m.w, m.d, m.w * 0.28, m.w * 0.08, -m.d * 0.08), [[0, 1, 1], [m.h * 0.85, 0.96, 0.96, 0.05], [m.h, 0.82, 0.86, 0.1]]), PT);
      for (let i = 0; i < m.n; i++) {
        const x = (i - (m.n - 1) / 2) * m.r * 4.2;
        B.add(C12, PD, m.r * 1.9, 0.8, m.r * 1.9, x, m.h * 0.45, m.d * 0.45, Math.PI / 2, 0, 0);
        B.add(lathe([[0, 0], [m.r * 1.2, 0], [m.r, m.len * 0.3], [m.r * 0.8, m.len], [0, m.len]], 10), PT, 1, 1, 1, x, m.h * 0.45, m.d * 0.45, Math.PI / 2, 0, 0);
      }
      B.add(box, DARK, m.w * 0.18, 0.4, 0.5, m.w * 0.3, m.h + 0.15, -m.d * 0.2);
      const g = B.build(); g.userData = m; return g;
    });
  }
  function mount(parent, mat, type, x, y, z) {
    const t = new THREE.Group(); t.position.set(x, y, z); parent.add(t);
    const geo = mountGeo(type), m = new THREE.Mesh(geo, mat); m.castShadow = true; t.add(m);
    const mz = new THREE.Object3D(); mz.position.set(0, geo.userData.h * 0.45, geo.userData.d * 0.45 + geo.userData.len); t.add(mz);
    t.userData.muzzle = mz; return t;
  }

  /* ---------- pintura ---------- */
  const PAT = {
    ms22: `vec3 side(vec3 p){ return p.y < uLine ? uC1 : uC0; }`,
    ms21: `vec3 side(vec3 p){ return uC1; }`,
    solid: `vec3 side(vec3 p){ return uC0; }`,
    dazzle: `vec3 side(vec3 p){ float t = step(0.5, fract(p.z * 0.03 + p.y * 0.07)), u = step(0.5, fract(p.z * 0.045 - p.y * 0.05 + 0.3)); return t > 0.5 ? (u > 0.5 ? uC0 : uC1) : (u > 0.5 ? uC2 : uC0); }`,
    kriegs: `vec3 side(vec3 p){ return p.y < uLine ? uC1 : uC0; }`,
  };
  const MATS = new Map();
  function shipMat(sc) {
    const key = JSON.stringify(sc); if (MATS.has(key)) return MATS.get(key);
    const m = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 18, specular: 0x262626 });
    const U = { uC0: { value: new THREE.Color(sc.c[0]) }, uC1: { value: new THREE.Color(sc.c[1] || sc.c[0]) }, uC2: { value: new THREE.Color(sc.c[2] || sc.c[0]) },
      uDeck: { value: new THREE.Color(sc.deck) }, uLine: { value: sc.line || 0 }, uBelow: { value: new THREE.Color(sc.below || 0x5a2a24) } };
    m.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, U);
      sh.vertexShader = 'varying vec3 vDPos;\nvarying vec3 vDNrm;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvDPos = transformed; vDNrm = normalize(objectNormal);');
      sh.fragmentShader = 'varying vec3 vDPos;\nvarying vec3 vDNrm;\nuniform vec3 uC0, uC1, uC2, uDeck, uBelow;\nuniform float uLine;\n' + NOISE + '\n' + PAT[sc.pat] + '\n' +
        sh.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
    vec3 p = vDPos;
    if (vColor.r > 0.995 && vColor.b > 0.995) {
      vec3 c = side(p) * (vColor.g / 0.9);
      if (vDNrm.y > 0.72 && p.y > 0.6) c = uDeck * (0.9 + 0.1 * vColor.g);
      if (p.y < 0.5 && p.y > -0.6) c = vec3(0.07);
      if (p.y <= -0.6) c = uBelow;
      diffuseColor.rgb = c;
    }
    float n = vnoise(p * 0.8) * 0.5 + vnoise(p * 3.5) * 0.5;
    float streak = vnoise(vec3(p.x * 3.0, p.y * 0.25, p.z * 3.0));
    diffuseColor.rgb *= 0.9 + 0.14 * n - 0.1 * smoothstep(0.6, 1.0, streak) * (1.0 - abs(vDNrm.y));`);
    };
    m.customProgramCacheKey = () => 'ship-' + sc.pat;
    MATS.set(key, m); return m;
  }
  const SCH = {
    usn: { pat: 'ms22', c: [0x8a9298, 0x323e4c], deck: 0x3c4652, line: 6.0 },
    usn21: { pat: 'ms21', c: [0x3a4656, 0x3a4656], deck: 0x3c4652 },
    ijn: { pat: 'solid', c: [0x7a7f84], deck: 0x6b5238 },
    km: { pat: 'kriegs', c: [0x9aa0a4, 0x6a7074], deck: 0x7a7a74, line: 1.6 },
    pt: { pat: 'solid', c: [0x3e4c3e], deck: 0x3a443a },
    lst: { pat: 'ms22', c: [0x7a8288, 0x3e4a56], deck: 0x4a525a, line: 5.5 },
    bb: { pat: 'ms22', c: [0x7e868c, 0x3a4654], deck: 0x4a525a, line: 8.0 },
  };

  /* ---------- montagem comum ---------- */
  function ship(realL, gameL, sch, build) {
    const g = new THREE.Group(); g.rotation.order = 'YXZ';
    const inner = new THREE.Group(); inner.scale.setScalar(gameL / realL); g.add(inner);
    const mat = shipMat(SCH[sch]);
    return { g, inner, mat, add(geo) { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; inner.add(m); return m; } };
  }
  const jpflag = () => once('jpflag', () => canvasTex(96, 64, (g) => { g.fillStyle = '#efede4'; g.fillRect(0, 0, 96, 64); g.fillStyle = '#b3241d'; g.beginPath(); g.arc(40, 32, 15, 0, 7); g.fill(); for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; g.beginPath(); g.moveTo(40, 32); g.arc(40, 32, 80, a, a + TAU / 32); g.fill(); } }));
  const usflag = () => once('usflag', () => canvasTex(96, 64, (g) => { for (let i = 0; i < 13; i++) { g.fillStyle = i % 2 ? '#efede4' : '#b22234'; g.fillRect(0, i * 64 / 13, 96, 64 / 13 + 0.5); } g.fillStyle = '#3c3b6e'; g.fillRect(0, 0, 40, 34); }));
  const deflag = () => once('deflag', () => canvasTex(96, 64, (g) => { g.fillStyle = '#efede4'; g.fillRect(0, 0, 96, 64); g.fillStyle = '#141414'; g.fillRect(30, 0, 8, 64); g.fillRect(0, 26, 96, 8); }));
  const hullNum = (n) => once('hn' + n, () => canvasTex(128, 64, (g) => { g.font = 'bold 50px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#efede4'; g.fillText(n, 64, 34); }));

  /* ---------- contratorpedeiro classe Fletcher ---------- */
  function fletcher(gameL) {
    const S = ship(114.8, gameL, 'usn');
    S.add(once('fletH', () => {
      const B = new MB();
      B.add(hullGeo({ L: 114.8, B: 12.0, D: 4.4, T: 4.2, sheerF: 2.6, sheerA: 0.4, flare: 0.14, transom: 0.7, rake: 1.6, bowStart: 0.62 }), PT);
      // casaria de vante com ponte, mastro e radar
      deckhouse(B, 0, 4.8, 30, 7.5, 2.6, 13, 1.5); deckhouse(B, 0, 7.4, 31.5, 6.2, 2.2, 8, 1.4);
      deckhouse(B, 0, 9.6, 32.5, 5.0, 2.0, 5.2, 1.2); B.add(box, GLASS, 4.6, 0.6, 0.1, 0, 10.6, 35.1);
      B.add(box, PT, 7.0, 0.15, 3.0, 0, 11.6, 33.0); rail(B, [[-3.5, 12.4, 34.5], [3.5, 12.4, 34.5]]);
      mast(B, 0, 11.6, 27.5, 14, 6);
      B.add(C16, PD, 1.2, 1.2, 1.2, 0, 12.8, 29.5);                                                  // diretor de tiro Mk 37
      // chaminés
      funnel(B, 0, 4.4, 9, 1.7, 2.6, 7.5, 0.12); funnel(B, 0, 4.4, -6, 1.7, 2.6, 7.0, 0.12);
      deckhouse(B, 0, 4.4, 1.5, 4.5, 2.0, 9, 0.8); deckhouse(B, 0, 4.4, -14, 4.5, 2.0, 8, 0.8);
      torpedoes(B, 0, 4.4, -0.5, 5, 7.5); torpedoes(B, 0, 4.4, -22, 5, 7.5);
      for (const sx of [-1, 1]) { bofors(B, sx * 3.6, 6.4, 1.5, 0, false); oerlikon(B, sx * 5.0, 4.4, 12, 0); oerlikon(B, sx * 5.0, 4.4, -10, 0); boat(B, sx * 5.2, 4.4, 17, 7); }
      deckhouse(B, 0, 4.4, -32, 6.5, 2.4, 10, 0.8);
      bofors(B, 0, 6.8, -28.5, Math.PI, false);
      for (const sx of [-1, 1]) dcRack(B, sx * 2.5, 4.4, -56);
      for (const sx of [-1, 1]) { const pts = []; for (let i = 0; i <= 10; i++) { const z = -55 + i * 9.5; pts.push([sx * 5.85 * (z > 35 ? Math.max(0.1, 1 - (z - 35) / 24) : 1), 5.6 + (z > 30 ? (z - 30) * 0.1 : 0), z]); } rail(B, pts); }
      B.add(C8, PD, 0.12, 6, 0.12, 0, 7.4, -55);
      return B.build();
    }));
    const t0 = mount(S.inner, S.mat, 'us5', 0, 6.6, 45), t1 = mount(S.inner, S.mat, 'us5', 0, 7.4, 38.5), t2 = mount(S.inner, S.mat, 'us5', 0, 6.8, -26.5), t3 = mount(S.inner, S.mat, 'us5', 0, 6.4, -36), t4 = mount(S.inner, S.mat, 'us5', 0, 4.6, -45);
    for (const s of [-1, 1]) decal(S.inner, hullNum(String(500 + ((Math.random() * 99) | 0))), 6, 3, s * 6.6, 6.5, 42, s * Math.PI / 2);
    decal(S.inner, usflag(), 4, 2.6, 0, 9.5, -55.2, Math.PI / 2).rotation.set(0, Math.PI / 2, 0);
    S.g.userData = { turret: t0, turrets: [t1, t2, t3, t4], muzzle: t0.userData.muzzle, wheels: [], L: gameL };
    return S.g;
  }

  /* ---------- cruzador leve classe Cleveland ---------- */
  function cleveland(gameL) {
    const S = ship(186, gameL, 'usn');
    S.add(once('clevH', () => {
      const B = new MB();
      B.add(hullGeo({ L: 186, B: 20.2, D: 7.0, T: 7.5, sheerF: 3.0, sheerA: 0, flare: 0.12, transom: 0.8, rake: 2.5, bowStart: 0.66, step: [0.32, -2.2] }), PT);
      deckhouse(B, 0, 7.0, 34, 13, 3.0, 22, 2.5); deckhouse(B, 0, 10, 36, 10, 3.0, 14, 2);
      deckhouse(B, 0, 13, 37, 7, 3.0, 9, 1.6); B.add(box, GLASS, 6.4, 0.8, 0.1, 0, 14.6, 41.5);
      mast(B, 0, 16, 32, 18, 9); B.add(C16, PD, 2.0, 1.8, 2.0, 0, 17.0, 36);
      funnel(B, 0, 7, 12, 2.8, 3.8, 11, 0.06); funnel(B, 0, 7, -10, 2.8, 3.8, 10, 0.06);
      deckhouse(B, 0, 7, 1, 10, 3, 34, 2);
      deckhouse(B, 0, 7, -32, 11, 3, 16, 2); mast(B, 0, 10, -30, 12, 6); B.add(C16, PD, 1.6, 1.6, 1.6, 0, 11.6, -34);
      for (const sx of [-1, 1]) { for (const z of [14, -4, -24]) bofors(B, sx * 7.2, 7, z, 0, true); for (const z of [24, 2, -14, -40]) oerlikon(B, sx * 8.8, 7, z, 0); boat(B, sx * 6.5, 10, 5, 9); }
      B.add(box, STEEL, 2.0, 1.0, 22, 0, 4.9, -80); B.add(box, STEEL, 1.4, 1.4, 6, 0, 5.5, -88);                 // catapulta e guindaste
      return B.build();
    }));
    const t0 = mount(S.inner, S.mat, 'us6', 0, 7.6, 62), t1 = mount(S.inner, S.mat, 'us6', 0, 10.4, 50), t2 = mount(S.inner, S.mat, 'us6', 0, 10.4, -48), t3 = mount(S.inner, S.mat, 'us6', 0, 5.4, -60);
    const sec = []; for (const sx of [-1, 1]) for (const z of [24, 6, -16]) sec.push(mount(S.inner, S.mat, 'us5x2', sx * 6.0, 10.0, z));
    decal(S.inner, usflag(), 6, 4, 0, 13, -92, Math.PI / 2);
    S.g.userData = { turret: t0, turrets: [t1, t2, t3, ...sec], muzzle: t0.userData.muzzle, wheels: [], L: gameL };
    return S.g;
  }

  /* ---------- contratorpedeiro japonês classe Kagerō ---------- */
  function kagero(gameL) {
    const S = ship(118.5, gameL, 'ijn');
    S.add(once('kagH', () => {
      const B = new MB();
      B.add(hullGeo({ L: 118.5, B: 10.8, D: 4.6, T: 3.8, sheerF: 2.8, sheerA: 0, flare: 0.22, transom: 0.6, rake: 2.2, bowStart: 0.6, step: [0.66, -1.4] }), PT);
      deckhouse(B, 0, 5.2, 34, 5.5, 2.6, 7, 1.2); deckhouse(B, 0, 7.8, 34.5, 4.6, 2.4, 5.2, 1.0); deckhouse(B, 0, 10.2, 35, 3.6, 2.0, 3.8, 0.8);
      B.add(box, GLASS, 3.4, 0.5, 0.1, 0, 11.2, 36.9);
      mast(B, 0, 10, 30, 11, 5);
      funnel(B, 0, 4.4, 18, 1.8, 2.6, 7.5, 0.22); funnel(B, 0, 3.6, 0, 1.7, 2.4, 7.0, 0.22);
      torpedoes(B, 0, 3.6, 9, 4, 8); torpedoes(B, 0, 3.6, -9, 4, 8);
      for (const sx of [-1, 1]) { B.add(box, PD, 1.2, 0.9, 6, sx * 3.5, 4.0, 9); bofors(B, sx * 2.8, 4.0, 13, 0, false); boat(B, sx * 4.4, 3.6, 3, 6); }
      deckhouse(B, 0, 3.6, -22, 4.5, 2.4, 8, 1);
      for (const sx of [-1, 1]) dcRack(B, sx * 2.2, 3.6, -55);
      B.add(C8, PD, 0.12, 6, 0.12, 0, 6.6, -57);
      return B.build();
    }));
    const t0 = mount(S.inner, S.mat, 'jp5', 0, 7.2, 42), t1 = mount(S.inner, S.mat, 'jp5', 0, 6.2, -30), t2 = mount(S.inner, S.mat, 'jp5', 0, 3.8, -42);
    decal(S.inner, jpflag(), 4, 2.6, 0, 8.8, -57.2, Math.PI / 2);
    S.g.userData = { turret: t0, turrets: [t1, t2], muzzle: t0.userData.muzzle, wheels: [], L: gameL };
    return S.g;
  }

  /* ---------- lancha PT (Elco 80') ---------- */
  function ptBoat(gameL) {
    const S = ship(24.4, gameL, 'pt');
    S.add(once('ptH', () => {
      const B = new MB();
      B.add(hullGeo({ L: 24.4, B: 6.3, D: 1.9, T: 1.2, sheerF: 0.5, flare: 0.1, transom: 0.95, rake: 1.6, bowStart: 0.55, n: 16 }), PT);
      deckhouse(B, 0, 1.9, 2.5, 3.2, 1.3, 5.0, 0.6); B.add(box, GLASS, 2.9, 0.35, 0.08, 0, 2.95, 5.0);
      B.add(box, PD, 2.6, 0.8, 1.6, 0, 2.6, 1.0); B.add(C6, PD, 0.08, 4.5, 0.08, 0, 5.5, 1.3); B.add(box, DARK, 1.0, 0.25, 0.25, 0, 7.4, 1.4);
      for (const sx of [-1, 1]) { for (const z of [-1.5, -7.5]) { B.add(C12, PD, 0.3, 5.5, 0.3, sx * 2.6, 2.3, z, Math.PI / 2, 0, 0); B.add(box, STEEL, 0.5, 0.25, 4.5, sx * 2.6, 2.0, z); }
        B.add(C12, PT, 0.55, 0.9, 0.55, sx * 1.5, 2.3, 0.6); for (const d of [-0.12, 0.12]) B.add(C8, DARK, 0.04, 1.8, 0.04, sx * 1.5 + d, 2.9, 1.5, Math.PI / 2 - 0.25, 0, 0); }
      B.add(C12, PT, 0.8, 0.5, 0.8, 0, 2.15, -10); B.add(box, DARK, 0.6, 0.4, 0.8, 0, 2.6, -10); B.add(C8, DARK, 0.06, 2.4, 0.06, 0, 2.75, -8.8, Math.PI / 2 - 0.15, 0, 0);
      B.add(C12, 0x3a3a34, 0.5, 1.4, 0.5, 0, 2.6, -11.7, Math.PI / 2, 0, 0);
      return B.build();
    }));
    const t = new THREE.Group(); t.position.set(0, 1.9, 8.5); S.inner.add(t);
    const gm = new THREE.Mesh(once('ptGun', () => { const B = new MB(); B.add(C8, PT, 0.12, 1.0, 0.12, 0, 0.5, 0); B.add(box, PD, 0.7, 0.6, 0.05, 0, 1.0, 0.3); B.add(C8, DARK, 0.05, 2.0, 0.05, 0, 1.15, 1.0, Math.PI / 2, 0, 0); return B.build(); }), S.mat); t.add(gm);
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, 1.15, 2.1); t.add(muzzle);
    for (const s of [-1, 1]) decal(S.inner, hullNum(String(100 + ((Math.random() * 400) | 0))), 2.4, 1.2, s * 3.2, 1.4, 7.0, s * Math.PI / 2);
    S.g.userData = { turret: t, muzzle, wheels: [], L: gameL };
    return S.g;
  }

  /* ---------- lancha alemã S-100 (S-Boot) ---------- */
  function sboot(gameL) {
    const S = ship(34.9, gameL, 'km');
    S.add(once('sbH', () => {
      const B = new MB();
      B.add(hullGeo({ L: 34.9, B: 5.3, D: 2.0, T: 1.6, sheerF: 0.7, flare: 0.12, transom: 0.7, rake: 2.0, bowStart: 0.55, n: 18 }), PT);
      // ponte blindada em cúpula e tubos de torpedo sob o castelo
      B.add(lathe([[0, 0], [1.4, 0], [1.45, 0.6], [1.2, 1.3], [0.6, 1.7], [0, 1.75]], 14), PT, 1.1, 1, 1.4, 0, 2.0, 3.5);
      B.add(box, GLASS, 1.4, 0.18, 0.08, 0, 3.2, 5.3);
      for (const sx of [-1, 1]) B.add(C12, PT, 0.36, 7.5, 0.36, sx * 1.1, 2.0, 11.5, Math.PI / 2, 0, 0);
      B.add(box, PT, 3.2, 0.5, 8, 0, 2.2, 11.5);
      deckhouse(B, 0, 2.0, -2, 3.0, 0.9, 6, 0.6);
      B.add(C16, PD, 0.8, 0.6, 0.8, 0, 2.3, -10); for (const d of [-0.18, 0.18]) B.add(C8, DARK, 0.05, 2.2, 0.05, d, 2.9, -8.9, Math.PI / 2 - 0.2, 0, 0);
      B.add(C8, PD, 0.08, 4, 0.08, 0, 5.0, 1.5); B.add(box, PD, 1.6, 0.08, 0.08, 0, 6.2, 1.5);
      return B.build();
    }));
    const t = new THREE.Group(); t.position.set(0, 2.3, 9.0); S.inner.add(t);
    const gm = new THREE.Mesh(once('sbGun', () => { const B = new MB(); B.add(C12, PD, 0.6, 0.5, 0.6, 0, 0.25, 0); B.add(box, PD, 1.0, 0.7, 0.06, 0, 0.8, 0.4); B.add(C8, DARK, 0.06, 2.0, 0.06, 0, 0.9, 1.3, Math.PI / 2, 0, 0); return B.build(); }), S.mat); t.add(gm);
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, 0.9, 2.4); t.add(muzzle);
    decal(S.inner, deflag(), 1.6, 1.0, 0, 5.4, 1.5, Math.PI / 2);
    S.g.userData = { turret: t, muzzle, wheels: [], L: gameL };
    return S.g;
  }

  /* ---------- barcaça Higgins (LCVP) ---------- */
  function lcvp(n) {
    const g = new THREE.Group(), mat = shipMat({ pat: 'solid', c: [0x6d7a80], deck: 0x4a4a44, below: 0x4a5258 });
    const add = (geo, par) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; (par || g).add(m); return m; };
    add(once('lcvpH', () => {
      const B = new MB();
      B.add(prism([[5.4, 0.3, 1.62], [4.6, -0.4, 1.4], [-4.8, -0.4, 1.4], [-5.6, 0.3, 1.62], [-5.6, 0.62, 1.62], [5.4, 0.62, 1.62]]), PT);
      for (const sx of [-1, 1]) { B.add(prism([[5.3, 0.6, 0.11], [5.3, 2.05, 0.11], [-4.0, 2.05, 0.11], [-4.2, 2.6, 0.11], [-5.6, 2.6, 0.11], [-5.6, 0.6, 0.11]]), WOODD, 1, 1, 1, sx * 1.62, 0, 0); B.add(box, 0x5a5a52, 0.32, 0.1, 9.4, sx * 1.66, 2.08, 0.6); }
      for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) B.add(box, 0x4a3e2c, 0.05, 1.45, 0.08, sx * 1.48, 1.3, -3.4 + i * 1.8);
      B.add(box, 0x3a3a34, 3.0, 0.06, 9.8, 0, 0.65, 0.2);
      B.add(box, WOODD, 3.25, 2.0, 1.4, 0, 1.6, -4.85); B.add(box, PD, 1.05, 0.95, 0.95, -1.0, 3.0, -4.7);
      for (const sx of [-1, 1]) { B.add(C8, PD, 0.07, 0.6, 0.07, sx * 1.2, 2.9, -4.2); B.add(box, DARK, 0.12, 0.14, 0.45, sx * 1.2, 3.25, -4.1); B.add(C8, DARK, 0.04, 0.9, 0.04, sx * 1.2, 3.27, -3.4, Math.PI / 2, 0, 0); B.add(box, PT, 0.06, 0.45, 0.6, sx * 1.2, 3.2, -3.9); }
      Blindado3.kit.crew(B, 0.95, 2.95, -4.6, 'USA');
      return B.build();
    }));
    const ramp = new THREE.Group(); ramp.position.set(0, 0.25, 5.4); g.add(ramp);
    add(once('lcvpR', () => { const B = new MB(); B.add(box, PT, 3.3, 2.3, 0.18, 0, 1.15, 0); for (let i = 0; i < 4; i++) B.add(box, PD, 3.2, 0.08, 0.1, 0, 0.35 + i * 0.55, -0.12); for (const sx of [-1, 1]) B.add(box, PD, 0.08, 2.2, 0.1, sx * 1.0, 1.15, -0.12); return B.build(); }), ramp);
    const troops = [];
    for (let i = 0; i < n; i++) { const s = makeSoldier('us', 'rifle'); s.position.set(i % 2 ? -0.72 : 0.72, 0.68, 3.4 - Math.floor(i / 2) * 1.5); g.add(s); troops.push(s); }
    g.userData = { ramp, troops };
    return g;
  }

  /* ---------- LST-1 (navio de desembarque de tanques) ---------- */
  function lst() {
    const S = ship(100, 90, 'lst'), W = 15.2;
    S.add(once('lstH', () => {
      const B = new MB();
      B.add(hullGeo({ L: 100, B: W, D: 6.6, T: 2.2, sheerF: 0.6, flare: 0.02, transom: 0.92, rake: 0, bowStart: 0.9, n: 22 }), PT);
      B.add(box, 0x4a525a, W - 1.2, 0.3, 82, 0, 6.65, -2);
      for (const sx of [-1, 1]) rail(B, [[sx * 7.4, 7.6, 46], [sx * 7.4, 7.6, -48]]);
      deckhouse(B, 0, 6.6, -40, 11.5, 3.2, 12, 1); deckhouse(B, 0, 9.8, -40.5, 9, 2.8, 8, 0.8); deckhouse(B, 0, 12.6, -41, 6, 2.2, 5, 0.6);
      B.add(box, GLASS, 5.6, 0.6, 0.1, 0, 13.6, -38.45);
      mast(B, 0, 14.8, -42, 10, 5);
      for (const sx of [-1, 1]) { funnel(B, sx * 4.4, 6.6, -46, 0.5, 0.6, 4.5, 0.05); boat(B, sx * 6.2, 9.8, -32, 6); }
      for (const z of [36, 22, -24]) for (const sx of [-1, 1]) bofors(B, sx * 5.6, 6.6, z, 0, false);
      B.add(box, 0x4f5428, 2.8, 2.2, 5.8, -3.6, 7.8, 8); B.add(box, 0x4f5428, 2.8, 2.2, 5.8, 3.6, 7.8, -6);
      B.add(box, 0x3a3a34, 6, 0.06, 46, 0, 6.82, 4);
      return B.build();
    }));
    const hinge = 45.5, mk = (geo) => new THREE.Mesh(geo, S.mat);
    const doorGeo = (s) => once('lstD' + s, () => { const B = new MB(); B.add(box, PT, W / 2 - 0.3, 6.6, 0.5, -s * (W / 4 - 0.15), 3.0, 0.3); B.add(box, PD, W / 2 - 0.5, 0.25, 0.55, -s * (W / 4 - 0.15), 5.0, 0.32); return B.build(); });
    const doorL = new THREE.Group(); doorL.position.set(-W / 2, 0, hinge); S.inner.add(doorL); doorL.add(mk(doorGeo(-1)));
    const doorR = new THREE.Group(); doorR.position.set(W / 2, 0, hinge); S.inner.add(doorR); doorR.add(mk(doorGeo(1)));
    const ramp = new THREE.Group(); ramp.position.set(0, -1.6, hinge - 0.3); S.inner.add(ramp);
    ramp.add(mk(once('lstR', () => { const B = new MB(); B.add(box, PD, W * 0.56, 0.35, 7.0, 0, 0, 3.5); for (let i = 0; i < 8; i++) B.add(box, DARK, W * 0.55, 0.06, 0.12, 0, 0.2, 0.6 + i * 0.8); return B.build(); })));
    ramp.rotation.x = -Math.PI / 2;
    // balão de barragem
    const bal = mk(once('lstB', () => { const B = new MB(); B.add(lathe([[0, -1], [0.55, -0.85], [0.85, -0.3], [0.8, 0.3], [0.45, 0.8], [0, 1]], 14), 0xb2b5ad, 3.8, 9, 3.8, 0, 52, -6, Math.PI / 2, 0, 0); for (const r of [0, 1, 2]) B.add(box, 0xa3a69e, 0.15, 3.2, 2.6, Math.sin(r * TAU / 3) * 1.8, 52 + Math.cos(r * TAU / 3) * 1.8, -14.5, 0, 0, r * TAU / 3); B.add(C6, 0x2a2a2a, 0.05, 44, 0.05, 0, 29, -4, -0.1, 0, 0); return B.build(); }));
    S.inner.add(bal);
    for (const s of [-1, 1]) decal(S.inner, hullNum(String(300 + ((Math.random() * 600) | 0))), 6, 3, s * (W / 2 + 0.05), 4.6, 32, s * Math.PI / 2);
    S.g.userData = { doorL, doorR, ramp, L: 90 };
    return S.g;
  }

  /* ---------- navios ao largo (bombardeio): encouraçado tipo Nevada ou contratorpedeiro ---------- */
  function warship(len, big) {
    if (!big) { const g = fletcher(len); const ud = g.userData; g.userData = { guns: [ud.turret, ...ud.turrets], len }; return g; }
    const S = ship(177, len, 'bb');
    S.add(once('bbH', () => {
      const B = new MB();
      B.add(hullGeo({ L: 177, B: 29, D: 8.5, T: 8.7, sheerF: 2.0, flare: 0.08, transom: 0.85, rake: 2.0, bowStart: 0.68, step: [0.3, -2.4] }), PT);
      deckhouse(B, 0, 8.5, 22, 16, 4, 24, 3); deckhouse(B, 0, 12.5, 24, 12, 4, 14, 2.4); deckhouse(B, 0, 16.5, 25, 8, 3, 8, 1.6);
      B.add(box, GLASS, 7.4, 0.8, 0.1, 0, 18, 29.05);
      // mastro tripé com plataformas de direção de tiro
      for (const [x, z] of [[0, 18], [-2.4, 13], [2.4, 13]]) B.add(C8, PD, 0.5, 26, 0.5, x * 0.6, 21, z * 0.4 + 9, (z - 18) * 0.012, 0, -x * 0.06);
      B.add(C16, PT, 3.4, 2.6, 3.4, 0, 34, 16.4); B.add(C16, PD, 2.4, 1.6, 2.4, 0, 36, 16.4);
      funnel(B, 0, 8.5, 2, 4.2, 5.2, 13, 0.04);
      deckhouse(B, 0, 8.5, -14, 12, 4, 18, 2); for (const [x, z] of [[0, -14], [-2, -18], [2, -18]]) B.add(C8, PD, 0.4, 16, 0.4, x * 0.5, 18, z, 0, 0, -x * 0.05); B.add(C16, PT, 2.6, 2.0, 2.6, 0, 26, -14.5);
      for (const sx of [-1, 1]) { for (const z of [26, 14, 2, -10]) { B.add(box, PT, 2.0, 1.6, 2.6, sx * 12.5, 9.3, z); B.add(C8, DARK, 0.15, 5, 0.15, sx * 12.5, 9.5, z + 3.5, Math.PI / 2, 0, 0); } for (const z of [8, -4]) bofors(B, sx * 9, 12.5, z, 0, true); boat(B, sx * 9.5, 12.5, -24, 10); }
      return B.build();
    }));
    const guns = [mount(S.inner, S.mat, 'us14', 0, 9.0, 60), mount(S.inner, S.mat, 'bb12', 0, 12.4, 44), mount(S.inner, S.mat, 'bb12', 0, 12.4, -36), mount(S.inner, S.mat, 'us14', 0, 9.0, -52)];
    guns[2].rotation.y = Math.PI; guns[3].rotation.y = Math.PI;
    decal(S.inner, usflag(), 8, 5, 0, 22, -88.6, Math.PI / 2);
    S.g.userData = { guns: guns.map(t => t.userData.muzzle), len };
    return S.g;
  }

  const PLAY = { destroyer: () => fletcher(48), cruiser: () => cleveland(66), jdd: () => kagero(46), pt: () => ptBoat(18), sboot: () => sboot(19) };
  return { ship: (k) => (PLAY[k] || PLAY.destroyer)(), lcvp, lst, warship, kinds: () => Object.keys(PLAY) };
})();
if (typeof makeShip === 'function') makeShip = function (kind) { return Navio3.ship(kind); };
if (typeof makeLCVP === 'function') makeLCVP = function (n) { return Navio3.lcvp(n); };
if (typeof makeLST === 'function') makeLST = function () { return Navio3.lst(); };
if (typeof makeWarship === 'function') makeWarship = function (len, big) { return Navio3.warship(len, big); };
