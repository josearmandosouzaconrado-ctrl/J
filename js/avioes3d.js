'use strict';
/* =========================================================
   AVIÕES 3D — modelados do zero em metros reais
   - fuselagem por seções (oval/superelipse), asas e empenagens com
     perfil aerodinâmico, diedro, enflechamento, ponta arredondada e
     asa de gaivota (Stuka, PZL)
   - cabine de vidro com armação, motor radial com cilindros ou nariz
     afilado com spinner, hélices que giram, armas, tanques, bombas e foguetes
   - pintura no shader: cor de cima e de baixo, camuflagem estilhaçada
     alemã, RAF, anéis italianos, soviética, japonesa, francesa e as
     faixas da invasão (Normandia, 1944)
   Contrato com o jogo: userData.props = hélices (giram em z)
   ========================================================= */
const Aviao3 = (() => {
  const KT = Blindado3.kit, { MB, loft, lathe, once, decal, canvasTex, star5, NOISE, box, C8, C12, C16, SPH, PT, PD, STEEL, DARK, smoothSides } = KT;
  const TAU = Math.PI * 2, KS = 1.2;
  const lerp = (a, b, t) => a + (b - a) * t;
  const GL = 0x22323c, BLK = 0x1b1b19, YEL = 0xd9b52a;

  /* ---------- formas ---------- */
  // fuselagem: estações [z, meia-largura, altura acima, altura abaixo, centro y]
  function fuse(st, n, k) {
    n = n || 16; const e = 2 / (k || 2.2);
    const R = st.map(([z, w, t, b, yc]) => { const r = []; for (let i = 0; i < n; i++) { const a = i / n * TAU, c = Math.cos(a), s = Math.sin(a); r.push([Math.sign(c) * Math.pow(Math.abs(c), e) * w, (yc || 0) + Math.sign(s) * Math.pow(Math.abs(s), e) * (s > 0 ? t : b), z]); } return r; });
    return loft(R, { smooth: true });
  }
  // perfil aerodinâmico (fração da corda para trás, espessura relativa)
  const AF = [[0, 0], [0.04, 0.55], [0.15, 0.95], [0.32, 1.0], [0.6, 0.7], [1, 0.05], [1, -0.02], [0.6, -0.25], [0.3, -0.4], [0.1, -0.35], [0.03, -0.22]];
  // asa: estações ao longo da envergadura; d = { x0, span, rc, tc, z (bordo de ataque na raiz), sweep, y, dih (graus), th, tip, gull:[[t, dy]] }
  // posição da asa num ponto t (0 raiz, 1 ponta): corda, bordo de ataque, altura e espessura
  function wingAt(d, t) {
    const x = d.x0 + d.span * t;
    let c = lerp(d.rc, d.tc, t);
    if (d.tip === 'ellip') c = d.rc * Math.sqrt(Math.max(0.04, 1 - Math.pow(t * 0.97, 2.2)));
    else if (d.tip === 'round' && t > 0.8) c *= 1 - Math.pow((t - 0.8) / 0.2, 2) * 0.55;
    let zl = d.z + (d.sweep || 0) * t;
    if (d.tip === 'ellip' || d.tip === 'round') zl = d.z - (d.rc - c) * (d.mid !== undefined ? d.mid : 0.35) + (d.sweep || 0) * t;
    let y = d.y + Math.tan((d.dih || 0) * Math.PI / 180) * (x - d.x0);
    if (d.gull) { let g = 0; for (let k = 0; k < d.gull.length - 1; k++) { const [t0, y0] = d.gull[k], [t1, y1] = d.gull[k + 1]; if (t >= t0 && t <= t1) g = lerp(y0, y1, (t - t0) / (t1 - t0)); } y = d.y + g; }
    return { x, c, zl, y, th: (d.th || 0.13) * lerp(1, 0.75, t) * c * 0.5 };
  }
  let WING = null;
  function wingGeo(d, side) {
    const N = d.n || 7, R = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, x = d.x0 + d.span * t;
      let c = lerp(d.rc, d.tc, t);
      if (d.tip === 'ellip') c = d.rc * Math.sqrt(Math.max(0.04, 1 - Math.pow(t * 0.97, 2.2)));
      else if (d.tip === 'round' && t > 0.8) c *= 1 - Math.pow((t - 0.8) / 0.2, 2) * 0.55;
      let zl = d.z + (d.sweep || 0) * t;
      if (d.tip === 'ellip' || d.tip === 'round') zl = d.z - (d.rc - c) * (d.mid !== undefined ? d.mid : 0.35) + (d.sweep || 0) * t;
      let y = d.y + Math.tan((d.dih || 0) * Math.PI / 180) * (x - d.x0);
      if (d.gull) { let g = 0; for (let k = 0; k < d.gull.length - 1; k++) { const [t0, y0] = d.gull[k], [t1, y1] = d.gull[k + 1]; if (t >= t0 && t <= t1) g = lerp(y0, y1, (t - t0) / (t1 - t0)); } y = d.y + g; }
      const th = (d.th || 0.13) * lerp(1, 0.75, t) * c * 0.5;
      R.push(AF.map(([f, v]) => [side * x, y + v * th, zl - f * c]));
    }
    return loft(R, { smooth: true });
  }
  // deriva vertical: estações em altura
  function finGeo(d) {
    const N = d.n || 5, R = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, y = d.y + d.h * t;
      let c = lerp(d.rc, d.tc, t); if (d.round && t > 0.6) c *= 1 - Math.pow((t - 0.6) / 0.4, 2) * 0.6;
      const zl = d.z + (d.sweep || 0) * t - (d.round ? (d.rc - c) * 0.2 : 0), th = (d.th || 0.1) * c * 0.5;
      R.push(AF.map(([f, v]) => [v * th, y, zl - f * c]));
    }
    return loft(R, { smooth: true });
  }
  const W = (B, col, d) => { if (!WING) WING = d; for (const s of [-1, 1]) B.add(wingGeo(d, s), col); };
  // hélice: cubo + pás (giram juntas em torno de z)
  function propGeo(r, n, spin, col, tips) {
    const B = new MB();
    B.add(lathe([[0, 0], [spin[0], 0], [spin[0] * 0.92, spin[1] * 0.45], [spin[0] * 0.5, spin[1] * 0.85], [0, spin[1]]], 14), col, 1, 1, 1, 0, 0, 0, Math.PI / 2, 0, 0);
    const blade = once('blade', () => { const R = []; for (let i = 0; i <= 4; i++) { const t = i / 4, w = 0.11 * (t < 0.3 ? lerp(0.6, 1, t / 0.3) : lerp(1, 0.55, (t - 0.3) / 0.7)); R.push([[-w, t, 0.02], [0, t, 0.025], [w, t, -0.01], [0, t, -0.02]]); } return loft(R, { smooth: true }); });
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU;
      B.add(blade, BLK, 1, r, 1, 0, 0, spin[1] * 0.3, 0.0, 0, -a);
      if (tips) B.add(box, YEL, 0.2, r * 0.1, 0.04, Math.sin(a) * r * 0.93, Math.cos(a) * r * 0.93, spin[1] * 0.3, 0, 0, -a);
    }
    return B.build();
  }
  // face do motor radial: cilindros em estrela
  function radial(B, z, r, n) {
    B.add(C16, BLK, r * 0.95, 0.04, r * 0.95, 0, 0, z, Math.PI / 2, 0, 0);
    for (let i = 0; i < n; i++) { const a = i / n * TAU; B.add(C8, 0x4a4a46, r * 0.12, r * 0.55, r * 0.12, Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55, z + 0.03, 0, 0, a - Math.PI / 2); }
  }
  const canopy = (B, st, frames) => {
    B.add(fuse(st, 14, 2.0), GL);
    for (const z of frames || []) { let w = 0, t = 0, yc = 0; for (let i = 0; i < st.length - 1; i++) if (z <= st[i][0] && z >= st[i + 1][0]) { const k = (st[i][0] - z) / (st[i][0] - st[i + 1][0]); w = lerp(st[i][1], st[i + 1][1], k); t = lerp(st[i][2], st[i + 1][2], k); yc = lerp(st[i][4] || 0, st[i + 1][4] || 0, k); }
      const pts = []; for (let i = 0; i <= 8; i++) { const a = i / 8 * Math.PI; pts.push([Math.cos(a) * w * 1.03, yc + Math.sin(a) * t * 1.03, z]); } B.add(KT.tube(pts, 0.02, 4), PD); }
  };
  const barrel = (B, x, y, z, len, r) => B.add(C8, DARK, r || 0.025, len, r || 0.025, x, y, z + len / 2, Math.PI / 2, 0, 0);
  function bomb(B, x, y, z, L, r, col) {
    B.add(lathe([[0, 0], [r * 0.5, 0.02], [r, L * 0.2], [r, L * 0.62], [r * 0.4, L * 0.95], [0, L]], 10), col || 0x4a4f2e, 1, 1, 1, x, y, z - L * 0.5, Math.PI / 2, 0, 0);
    for (let i = 0; i < 4; i++) B.add(box, col || 0x4a4f2e, 0.02, r * 1.6, L * 0.2, x, y, z - L * 0.45, 0, 0, i * Math.PI / 2 + Math.PI / 4);
  }
  function rocket(B, x, y, z, L) { B.add(C8, 0x5a5a50, 0.05, L, 0.05, x, y, z, Math.PI / 2, 0, 0); B.add(C8, 0x8a2a22, 0.06, 0.2, 0.06, x, y, z + L / 2, Math.PI / 2, 0, 0); B.add(box, STEEL, 0.03, 0.06, L * 0.8, x, y + 0.08, z); }

  /* ---------- pintura ---------- */
  const PAT = {
    solid: `vec3 camo(vec3 p){ return uC0; }`,
    splinter: `vec3 camo(vec3 p){ float t = step(0.5, fract(p.x * 0.17 + p.z * 0.09)), u = step(0.5, fract(p.z * 0.14 - p.x * 0.08 + 0.3)); return abs(t - u) > 0.5 ? uC0 : uC1; }`,
    mottle: `vec3 camo(vec3 p){ float t = step(0.5, fract(p.x * 0.17 + p.z * 0.09)), u = step(0.5, fract(p.z * 0.14 - p.x * 0.08 + 0.3)); vec3 top = abs(t - u) > 0.5 ? uC0 : uC1;
      float side = 1.0 - smoothstep(0.35, 0.6, abs(vDNrm.y)); float m = step(0.62, vnoise(p * 2.4)); vec3 sd = mix(uU, uC1, m * 0.9); return mix(top, sd, side * smoothstep(-0.2, 0.2, -vDNrm.y + 0.25)); }`,
    raf: `vec3 camo(vec3 p){ float a = vnoise(vec3(p.x * 0.45, 0.0, p.z * 0.45) + 4.0); return a > 0.52 ? uC0 : uC1; }`,
    rings: `vec3 camo(vec3 p){ float n = vnoise(p * 1.1 + 2.0); float r = 1.0 - smoothstep(0.02, 0.05, abs(n - 0.55)); return mix(uC0, uC1, r); }`,
    blotch: `vec3 camo(vec3 p){ float a = vnoise(vec3(p.x, 0.0, p.z) * 0.55 + 5.0), b = vnoise(vec3(p.x, 0.0, p.z) * 0.6 + 21.0); vec3 c = uC0; c = mix(c, uC1, step(0.55, a)); c = mix(c, uC2, step(0.57, b) * (1.0 - step(0.55, a))); return c; }`,
  };
  const MATS = new Map();
  function planeMat(sc) {
    const key = JSON.stringify(sc);
    if (MATS.has(key)) return MATS.get(key);
    const m = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 22, specular: 0x2a2a28 });
    const U = { uC0: { value: new THREE.Color(sc.c[0]) }, uC1: { value: new THREE.Color(sc.c[1] || sc.c[0]) }, uC2: { value: new THREE.Color(sc.c[2] || sc.c[0]) }, uU: { value: new THREE.Color(sc.u) },
      uWS: { value: new THREE.Vector4(...(sc.ws || [0, 0, 0, 0])) }, uFS: { value: new THREE.Vector4(...(sc.fs || [0, 0, 0, 0])) } };
    m.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, U);
      sh.vertexShader = 'varying vec3 vDPos;\nvarying vec3 vDNrm;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvDPos = transformed; vDNrm = normalize(objectNormal);');
      sh.fragmentShader = 'varying vec3 vDPos;\nvarying vec3 vDNrm;\nuniform vec3 uC0, uC1, uC2, uU;\nuniform vec4 uWS, uFS;\n' + NOISE + '\n' + PAT[sc.pat] + '\n' +
        sh.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
    vec3 p = vDPos;
    if (vColor.r > 0.995 && vColor.b > 0.995) {
      float under = smoothstep(-0.05, -0.35, vDNrm.y);
      vec3 c = mix(camo(p), uU, under) * (vColor.g / 0.9);
      // faixas da invasão: asas (uWS = início, largura, nº, ativo) e fuselagem (uFS)
      if (uWS.w > 0.5) { float ax = abs(p.x) - uWS.x; if (ax > 0.0 && ax < uWS.y * uWS.z) c = mod(floor(ax / uWS.y), 2.0) < 0.5 ? vec3(0.92, 0.91, 0.86) : vec3(0.08); }
      if (uFS.w > 0.5) { float az = uFS.x - p.z; if (az > 0.0 && az < uFS.y * uFS.z && abs(p.x) < 1.6) c = mod(floor(az / uFS.y), 2.0) < 0.5 ? vec3(0.92, 0.91, 0.86) : vec3(0.08); }
      diffuseColor.rgb = c;
    }
    float n = vnoise(p * 3.0) * 0.5 + vnoise(p * 11.0) * 0.5;
    diffuseColor.rgb *= 0.92 + 0.12 * n;
    float ex = (1.0 - smoothstep(0.0, 0.25, abs(vDNrm.x))) * 0.0;
    diffuseColor.rgb *= 1.0 - ex;`);
    };
    m.customProgramCacheKey = () => 'plane-' + sc.pat;
    MATS.set(key, m); return m;
  }

  /* ---------- insígnias ---------- */
  const T = {};
  const tex = (k, fn) => T[k] || (T[k] = canvasTex(128, 64, fn));
  const INS = {
    usbar: () => tex('usbar', (g) => { g.fillStyle = '#23305e'; g.beginPath(); g.arc(64, 32, 28, 0, 7); g.fill(); g.fillRect(8, 22, 112, 20); g.fillStyle = '#efede4'; g.fillRect(12, 25, 104, 14); g.fillStyle = '#23305e'; g.beginPath(); g.arc(64, 32, 24, 0, 7); g.fill(); g.fillStyle = '#efede4'; star5(g, 64, 33, 23, 9); g.fill(); }),
    usstar: () => tex('usstar', (g) => { g.fillStyle = '#23305e'; g.beginPath(); g.arc(64, 32, 28, 0, 7); g.fill(); g.fillStyle = '#efede4'; star5(g, 64, 33, 26, 10); g.fill(); }),
    cross: () => tex('cross', (g) => { g.fillStyle = '#efede4'; g.fillRect(52, 4, 24, 56); g.fillRect(36, 20, 56, 24); g.fillStyle = '#141414'; g.fillRect(58, 8, 12, 48); g.fillRect(40, 26, 48, 12); }),
    raf: () => tex('raf', (g) => { for (const [r, c] of [[29, '#d9b52a'], [26, '#23305e'], [17, '#efede4'], [9, '#9a2a24']]) { g.fillStyle = c; g.beginPath(); g.arc(64, 32, r, 0, 7); g.fill(); } }),
    rafw: () => tex('rafw', (g) => { for (const [r, c] of [[28, '#23305e'], [10, '#9a2a24']]) { g.fillStyle = c; g.beginPath(); g.arc(64, 32, r, 0, 7); g.fill(); } }),
    hino: () => tex('hino', (g) => { g.fillStyle = '#efede4'; g.beginPath(); g.arc(64, 32, 29, 0, 7); g.fill(); g.fillStyle = '#b3241d'; g.beginPath(); g.arc(64, 32, 26, 0, 7); g.fill(); }),
    redstar: () => tex('redstar', (g) => { g.fillStyle = '#efede4'; star5(g, 64, 34, 29, 12); g.fill(); g.fillStyle = '#b3241d'; star5(g, 64, 34, 25, 10); g.fill(); }),
    fra: () => tex('fra', (g) => { for (const [r, c] of [[29, '#9a2a24'], [20, '#efede4'], [11, '#23305e']]) { g.fillStyle = c; g.beginPath(); g.arc(64, 32, r, 0, 7); g.fill(); } }),
    pol: () => tex('pol', (g) => { for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { g.fillStyle = (i + j) % 2 ? '#b3241d' : '#efede4'; g.fillRect(36 + i * 14, 4 + j * 14, 14, 14); } }),
    chn: () => tex('chn', (g) => { g.fillStyle = '#23305e'; g.beginPath(); g.arc(64, 32, 29, 0, 7); g.fill(); g.fillStyle = '#efede4'; for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; g.beginPath(); g.moveTo(64 + Math.cos(a) * 22, 32 + Math.sin(a) * 22); g.lineTo(64 + Math.cos(a + 0.2) * 12, 32 + Math.sin(a + 0.2) * 12); g.lineTo(64 + Math.cos(a - 0.2) * 12, 32 + Math.sin(a - 0.2) * 12); g.fill(); } g.beginPath(); g.arc(64, 32, 12, 0, 7); g.fill(); g.fillStyle = '#23305e'; g.beginPath(); g.arc(64, 32, 9, 0, 7); g.fill(); g.fillStyle = '#efede4'; g.beginPath(); g.arc(64, 32, 7.5, 0, 7); g.fill(); }),
    ita: () => tex('ita', (g) => { g.fillStyle = '#efede4'; g.fillRect(56, 4, 16, 56); g.fillRect(36, 24, 56, 16); }),
    itaFas: () => tex('itaFas', (g) => { g.fillStyle = '#141414'; g.beginPath(); g.arc(64, 32, 28, 0, 7); g.fill(); g.fillStyle = '#efede4'; g.beginPath(); g.arc(64, 32, 25, 0, 7); g.fill(); g.fillStyle = '#141414'; for (let i = 0; i < 3; i++) g.fillRect(52 + i * 9, 12, 6, 40); }),
  };
  const ins = (k) => INS[k]();
  // decalque na superfície de cima/baixo da asa e nas laterais
  // insígnias da asa: posição calculada na superfície (t = fração da envergadura)
  function wingMarks(g, tk, t, s, bottomTk, info) {
    const d = info.wing, w = wingAt(d, t), z = w.zl - w.c * 0.42;
    for (const sx of [-1, 1]) { decal(g, ins(tk), s * 2, s, sx * w.x, w.y + w.th * 1.0 + 0.02, z, 0, -Math.PI / 2); decal(g, ins(bottomTk || tk), s * 2, s, sx * w.x, w.y - w.th * 0.42 - 0.02, z, 0, Math.PI / 2); }
  }
  function sideMarks(g, tk, x, y, z, s) { for (const sx of [-1, 1]) decal(g, ins(tk), s * 2, s, sx * x, y, z, sx * Math.PI / 2); }

  /* ---------- aviões ---------- */
  const year = () => (typeof SC !== 'undefined' && SC.year) || 1944;
  const invasion = () => typeof SC !== 'undefined' && (SC.id === 'omaha' || (SC.biome === 'normandy' && year() >= 1944.4 && year() < 1945));
  const SPEC = {};

  // Republic P-47D Thunderbolt (bolha)
  SPEC.p47 = {
    paint: () => ({ pat: 'solid', c: [0x4f5530], u: 0x8d908a, ws: invasion() ? [2.6, 0.46, 5, 1] : null, fs: invasion() ? [-2.4, 0.46, 5, 1] : null }),
    build(B) {
      B.add(fuse([[4.65, 0.64, 0.62, 0.66, 0.0], [4.3, 0.78, 0.76, 0.8, 0.0], [3.0, 0.75, 0.8, 0.86, 0.02], [1.0, 0.7, 0.86, 0.9, 0.05], [-1.0, 0.6, 0.72, 0.82, 0.08], [-3.5, 0.38, 0.5, 0.55, 0.14], [-5.6, 0.16, 0.32, 0.18, 0.22], [-6.1, 0.06, 0.18, 0.06, 0.25]]), PT);
      radial(B, 4.62, 0.62, 9);
      canopy(B, [[1.3, 0.05, 0.05, 0.02, 0.8], [1.0, 0.32, 0.42, 0.05, 0.75], [0.0, 0.34, 0.5, 0.05, 0.78], [-0.9, 0.28, 0.38, 0.05, 0.75], [-1.3, 0.06, 0.06, 0.02, 0.72]], [0.95, 0.4]);
      W(B, PT, { x0: 0.5, span: 5.7, rc: 2.75, tc: 0.9, z: 2.1, y: -0.62, dih: 4.5, th: 0.15, tip: 'ellip', mid: 0.3 });
      W(B, PT, { x0: 0.15, span: 2.3, rc: 1.4, tc: 0.5, z: -4.5, y: 0.1, dih: 0, th: 0.1, tip: 'ellip' });
      B.add(finGeo({ y: 0.2, h: 1.65, rc: 1.8, tc: 0.7, z: -4.4, sweep: -0.85, th: 0.1, round: true }), PT);
      for (const sx of [-1, 1]) for (let k = 0; k < 4; k++) barrel(B, sx * (2.4 + k * 0.28), -0.55 + k * 0.02, 1.85 - k * 0.06, 0.7, 0.022);
      bomb(B, 0, -1.05, 1.2, 2.6, 0.38, 0x8d908a); B.add(box, STEEL, 0.06, 0.25, 0.6, 0, -0.85, 1.1);
      for (const sx of [-1, 1]) { B.add(box, PD, 0.25, 0.08, 0.3, sx * 0.7, -0.1, 3.2); B.add(box, DARK, 0.2, 0.04, 0.5, sx * 0.62, -0.42, 2.0); }
      B.add(C8, STEEL, 0.015, 0.6, 0.015, 0, 1.1, -0.9, -0.3, 0, 0);
      return { props: [{ x: 0, y: 0, z: 4.68, r: 1.98, n: 4, spin: [0.36, 0.5], col: BLK, tips: true }], L: 11 };
    },
    marks(g, info) { wingMarks(g, year() >= 1943.5 ? 'usbar' : 'usstar', 0.62, 1.0, null, info); sideMarks(g, year() >= 1943.5 ? 'usbar' : 'usstar', 0.66, 0.1, -2.0, 0.85); },
  };

  // Focke-Wulf Fw 190 A-8
  SPEC.fw190 = {
    paint: () => ({ pat: 'mottle', c: [0x575c55, 0x6a6f6a], u: 0xa9b4b8 }),
    build(B) {
      B.add(fuse([[3.7, 0.58, 0.55, 0.58, 0.0], [3.4, 0.65, 0.62, 0.66, 0.0], [2.2, 0.6, 0.66, 0.66, 0.02], [0.6, 0.48, 0.66, 0.66, 0.05], [-1.2, 0.38, 0.5, 0.56, 0.08], [-3.6, 0.2, 0.32, 0.3, 0.12], [-4.9, 0.08, 0.2, 0.08, 0.16], [-5.2, 0.04, 0.1, 0.04, 0.18]]), PT);
      B.add(C16, YEL, 0.63, 0.35, 0.67, 0, -0.04, 2.7, Math.PI / 2, 0, 0);
      radial(B, 3.68, 0.54, 14);
      canopy(B, [[1.2, 0.05, 0.05, 0.02, 0.62], [0.9, 0.28, 0.32, 0.05, 0.6], [0.0, 0.3, 0.42, 0.05, 0.62], [-1.0, 0.24, 0.3, 0.05, 0.6], [-1.8, 0.06, 0.06, 0.02, 0.55]], [0.85, 0.3, -0.6]);
      W(B, PT, { x0: 0.4, span: 4.85, rc: 2.35, tc: 1.05, z: 1.9, y: -0.48, dih: 5, th: 0.14, tip: 'round', sweep: -0.35 });
      W(B, PT, { x0: 0.12, span: 1.65, rc: 1.1, tc: 0.6, z: -3.9, y: 0.12, th: 0.1, tip: 'round' });
      B.add(finGeo({ y: 0.15, h: 1.25, rc: 1.3, tc: 0.6, z: -3.85, sweep: -0.45, th: 0.1, round: true }), PT);
      for (const sx of [-1, 1]) { barrel(B, sx * 1.05, -0.42, 1.95, 0.55, 0.03); barrel(B, sx * 0.22, 0.48, 2.9, 0.6, 0.02); }
      bomb(B, 0, -0.95, 0.9, 1.65, 0.3, 0x5a5f5a); B.add(box, STEEL, 0.05, 0.25, 0.5, 0, -0.68, 0.9);
      for (let i = 0; i < 4; i++) for (const sx of [-1, 1]) B.add(box, DARK, 0.05, 0.08, 0.08, sx * 0.62, -0.15 - i * 0.1, 2.35);
      return { props: [{ x: 0, y: 0, z: 3.75, r: 1.65, n: 3, spin: [0.3, 0.42], col: BLK }], L: 9 };
    },
    marks(g, info) { wingMarks(g, 'cross', 0.62, 0.85, null, info); sideMarks(g, 'cross', 0.45, 0.15, -2.0, 0.7); },
  };

  // Junkers Ju 87 D Stuka (asa de gaivota invertida, trem fixo carenado)
  SPEC.ju87 = {
    paint: () => ({ pat: 'splinter', c: [0x3b4a34, 0x2c3529], u: 0x9fb2b8 }),
    build(B) {
      B.add(fuse([[4.9, 0.32, 0.34, 0.4, 0.05], [4.3, 0.5, 0.48, 0.66, 0.0], [2.8, 0.55, 0.56, 0.72, 0.0], [1.0, 0.55, 0.62, 0.72, 0.02], [-1.5, 0.48, 0.52, 0.6, 0.05], [-3.8, 0.26, 0.34, 0.32, 0.12], [-5.3, 0.08, 0.18, 0.08, 0.18]], 16, 2.6), PT);
      B.add(fuse([[3.6, 0.32, 0.12, 0.3, -0.62], [2.8, 0.36, 0.14, 0.34, -0.66], [2.2, 0.3, 0.1, 0.28, -0.62]]), PD);
      for (const sx of [-1, 1]) for (let i = 0; i < 6; i++) B.add(box, 0x3a2a22, 0.07, 0.06, 0.12, sx * 0.5, 0.2, 4.1 - i * 0.18);
      canopy(B, [[1.9, 0.06, 0.06, 0.02, 0.6], [1.6, 0.32, 0.4, 0.05, 0.58], [0.0, 0.34, 0.46, 0.05, 0.6], [-1.3, 0.3, 0.38, 0.05, 0.58], [-1.6, 0.06, 0.06, 0.02, 0.55]], [1.55, 1.0, 0.4, -0.2, -0.8]);
      B.add(C8, DARK, 0.025, 0.7, 0.025, 0, 0.75, -1.9, Math.PI / 2 + 0.3, 0, 0);
      W(B, PT, { x0: 0.5, span: 6.4, rc: 2.6, tc: 1.1, z: 2.0, y: -0.55, th: 0.15, tip: 'round', sweep: -0.5, gull: [[0, 0], [0.38, -0.35], [1, 0.25]] });
      W(B, PT, { x0: 0.15, span: 2.4, rc: 1.4, tc: 1.0, z: -3.95, y: 0.15, th: 0.1, tip: 'round' });
      for (const sx of [-1, 1]) B.add(box, STEEL, 0.04, 0.9, 0.04, sx * 1.2, -0.2, -4.4, 0.35, 0, sx * 0.4);
      B.add(finGeo({ y: 0.2, h: 1.5, rc: 1.5, tc: 1.0, z: -3.9, sweep: -0.25, th: 0.1 }), PT);
      // carenagens do trem fixo
      for (const sx of [-1, 1]) {
        B.add(fuse([[1.6, 0.14, 0.25, 0.25, -1.3], [1.2, 0.2, 0.4, 0.3, -1.45], [0.6, 0.18, 0.35, 0.25, -1.5], [0.2, 0.06, 0.1, 0.06, -1.6]], 10), PT, 1, 1, 1, sx * 2.45, 0, 0);
        B.add(box, PT, 0.12, 0.8, 0.5, sx * 2.45, -1.15, 1.1);
        B.add(C12, DARK, 0.32, 0.12, 0.32, sx * 2.45, -1.95, 1.0, 0, 0, Math.PI / 2);
        B.add(box, STEEL, 0.6, 0.05, 0.15, sx * 3.6, -1.0, 1.1);                             // freio de mergulho
      }
      bomb(B, 0, -1.1, 0.8, 2.1, 0.32, 0x4a4f44); B.add(box, STEEL, 0.06, 0.3, 0.8, 0, -0.78, 0.8);
      for (const sx of [-1, 1]) bomb(B, sx * 3.0, -1.15, 1.1, 1.2, 0.17, 0x4a4f44);
      return { props: [{ x: 0, y: 0.04, z: 4.92, r: 1.7, n: 3, spin: [0.26, 0.5], col: BLK }], L: 11.1 };
    },
    marks(g, info) { wingMarks(g, 'cross', 0.66, 0.9, null, info); sideMarks(g, 'cross', 0.5, 0.05, -2.2, 0.75); },
  };

  // Macchi C.202 Folgore
  SPEC.c202 = {
    paint: () => ({ pat: 'rings', c: [0xb59c6a, 0x5a6438], u: 0x9a9e98 }),
    build(B) {
      B.add(fuse([[4.2, 0.12, 0.12, 0.12, 0.0], [3.8, 0.42, 0.42, 0.45, -0.02], [2.4, 0.55, 0.6, 0.62, 0.0], [0.6, 0.5, 0.62, 0.64, 0.04], [-1.5, 0.36, 0.48, 0.5, 0.08], [-3.6, 0.15, 0.28, 0.2, 0.14], [-4.6, 0.05, 0.12, 0.05, 0.16]]), PT);
      B.add(C12, 0xefede4, 0.4, 0.4, 0.5, 0, 0.05, -2.3, Math.PI / 2, 0, 0);
      canopy(B, [[1.4, 0.05, 0.05, 0.02, 0.58], [1.0, 0.28, 0.32, 0.05, 0.56], [0.2, 0.3, 0.38, 0.05, 0.58], [-0.6, 0.2, 0.25, 0.05, 0.56], [-1.4, 0.05, 0.05, 0.02, 0.52]], [0.95, 0.4]);
      B.add(fuse([[1.8, 0.2, 0.08, 0.25, -0.58], [1.0, 0.24, 0.1, 0.28, -0.6], [0.2, 0.15, 0.05, 0.18, -0.55]]), PD);
      W(B, PT, { x0: 0.45, span: 4.85, rc: 2.3, tc: 1.0, z: 1.65, y: -0.45, dih: 5, th: 0.14, tip: 'round', sweep: -0.15 });
      W(B, PT, { x0: 0.1, span: 1.55, rc: 1.0, tc: 0.55, z: -3.4, y: 0.12, th: 0.1, tip: 'round' });
      B.add(finGeo({ y: 0.15, h: 1.15, rc: 1.2, tc: 0.55, z: -3.4, sweep: -0.4, th: 0.1, round: true }), PT);
      for (const sx of [-1, 1]) barrel(B, sx * 0.2, 0.42, 2.6, 0.6, 0.018);
      return { props: [{ x: 0, y: 0, z: 4.0, r: 1.52, n: 3, spin: [0.2, 0.55], col: 0x6a6f6a }], L: 8.85 };
    },
    marks(g, info) { for (const sx of [-1, 1]) decal(g, ins('ita'), 1.6, 0.8, sx * 0.08, 0.75, -3.75, sx * Math.PI / 2); wingMarks(g, 'itaFas', 0.66, 0.75, null, info); },
  };

  // Ilyushin Il-2M Sturmovik (dois lugares)
  SPEC.il2 = {
    paint: () => ({ pat: 'raf', c: [0x4b5a32, 0x2a2e26], u: 0x8aa2b0 }),
    build(B) {
      B.add(fuse([[5.2, 0.15, 0.15, 0.15, 0.0], [4.8, 0.5, 0.5, 0.58, -0.04], [3.0, 0.62, 0.62, 0.72, -0.02], [1.0, 0.6, 0.7, 0.72, 0.02], [-1.5, 0.48, 0.55, 0.6, 0.06], [-4.2, 0.22, 0.32, 0.3, 0.12], [-5.6, 0.07, 0.15, 0.07, 0.16]], 16, 2.6), PT);
      for (const sx of [-1, 1]) for (let i = 0; i < 6; i++) B.add(box, 0x3a2a22, 0.07, 0.06, 0.12, sx * 0.6, 0.15, 4.4 - i * 0.2);
      canopy(B, [[1.9, 0.05, 0.05, 0.02, 0.7], [1.5, 0.3, 0.36, 0.05, 0.68], [0.0, 0.32, 0.42, 0.05, 0.7], [-1.0, 0.28, 0.36, 0.05, 0.68], [-1.4, 0.06, 0.06, 0.02, 0.65]], [1.45, 0.7, -0.1, -0.8]);
      B.add(C8, DARK, 0.03, 0.9, 0.03, 0, 1.1, -1.5, Math.PI / 2 + 0.35, 0, 0);
      W(B, PT, { x0: 0.6, span: 6.6, rc: 2.9, tc: 1.2, z: 2.0, y: -0.55, dih: 3, th: 0.15, tip: 'round', sweep: -1.2 });
      W(B, PT, { x0: 0.15, span: 2.2, rc: 1.3, tc: 0.7, z: -4.5, y: 0.12, th: 0.1, tip: 'round' });
      B.add(finGeo({ y: 0.15, h: 1.4, rc: 1.5, tc: 0.7, z: -4.4, sweep: -0.55, th: 0.1, round: true }), PT);
      for (const sx of [-1, 1]) {
        B.add(fuse([[2.4, 0.18, 0.15, 0.28, -0.75], [1.3, 0.22, 0.18, 0.3, -0.8], [0.2, 0.1, 0.1, 0.12, -0.75]], 10), PT, 1, 1, 1, sx * 1.85, 0, 0);
        barrel(B, sx * 2.3, -0.6, 2.0, 0.9, 0.035);
        for (const k of [0, 1]) rocket(B, sx * (3.2 + k * 0.55), -0.85, 1.0, 0.9);
      }
      return { props: [{ x: 0, y: 0, z: 5.25, r: 1.8, n: 3, spin: [0.26, 0.5], col: BLK }], L: 11.6 };
    },
    marks(g, info) { for (const sx of [-1, 1]) decal(g, ins('redstar'), 1.6, 0.8, sx * 0.08, 0.9, -4.6, sx * Math.PI / 2); sideMarks(g, 'redstar', 0.4, 0.15, -2.8, 0.75); { const w = wingAt(info.wing, 0.62); for (const sx of [-1, 1]) decal(g, ins('redstar'), 2.2, 1.1, sx * w.x, w.y - w.th * 0.42 - 0.02, w.zl - w.c * 0.42, 0, Math.PI / 2); } },
  };

  // Hawker Typhoon IB (bolha, radiador no queixo, foguetes)
  SPEC.typhoon = {
    paint: () => ({ pat: 'raf', c: [0x4a4f3a, 0x7b8086], u: 0x9a9e9c, ws: invasion() ? [2.2, 0.46, 5, 1] : null, fs: invasion() ? [-2.0, 0.46, 5, 1] : null }),
    build(B) {
      B.add(fuse([[4.6, 0.16, 0.16, 0.16, 0.0], [4.2, 0.55, 0.52, 0.6, -0.02], [2.6, 0.62, 0.66, 0.68, 0.0], [0.6, 0.58, 0.7, 0.7, 0.04], [-1.5, 0.42, 0.52, 0.56, 0.08], [-4.0, 0.18, 0.3, 0.22, 0.14], [-4.9, 0.06, 0.15, 0.06, 0.18]]), PT);
      B.add(fuse([[3.9, 0.45, 0.1, 0.62, -0.38], [3.2, 0.5, 0.12, 0.72, -0.42], [2.4, 0.4, 0.1, 0.5, -0.36]]), PT);
      B.add(C16, BLK, 0.36, 0.04, 0.5, 0, -0.85, 3.92, Math.PI / 2, 0, 0);
      canopy(B, [[1.2, 0.05, 0.05, 0.02, 0.7], [0.9, 0.3, 0.38, 0.05, 0.68], [0.0, 0.32, 0.48, 0.05, 0.7], [-0.9, 0.26, 0.36, 0.05, 0.68], [-1.3, 0.05, 0.05, 0.02, 0.65]], [0.85]);
      W(B, PT, { x0: 0.5, span: 5.8, rc: 2.8, tc: 1.2, z: 2.0, y: -0.5, dih: 5.5, th: 0.16, tip: 'round', sweep: -0.3, gull: [[0, 0], [0.25, -0.08], [1, 0.48]] });
      W(B, PT, { x0: 0.12, span: 2.1, rc: 1.3, tc: 0.7, z: -3.75, y: 0.15, th: 0.1, tip: 'round' });
      B.add(finGeo({ y: 0.18, h: 1.45, rc: 1.5, tc: 0.7, z: -3.7, sweep: -0.5, th: 0.1, round: true }), PT);
      for (const sx of [-1, 1]) { for (const k of [0, 1]) { barrel(B, sx * (2.3 + k * 0.4), -0.48, 1.85, 0.75, 0.035); B.add(C8, PD, 0.06, 0.4, 0.06, sx * (2.3 + k * 0.4), -0.48, 1.75, Math.PI / 2, 0, 0); } for (let k = 0; k < 4; k++) rocket(B, sx * (2.4 + k * 0.42), -0.75, 0.9, 1.0); }
      return { props: [{ x: 0, y: 0, z: 4.65, r: 2.1, n: 4, spin: [0.3, 0.5], col: BLK, tips: true }], L: 9.73 };
    },
    marks(g, info) { wingMarks(g, 'rafw', 0.7, 1.0, 'raf', info); sideMarks(g, 'raf', 0.5, 0.1, -1.6, 0.9); },
  };

  // Mitsubishi A6M Zero
  SPEC.zero = {
    paint: () => (year() < 1943 ? { pat: 'solid', c: [0xb8b4a0], u: 0xb8b4a0 } : { pat: 'solid', c: [0x3d5a3a], u: 0xb8b4a0 }),
    build(B) {
      B.add(fuse([[3.6, 0.55, 0.55, 0.55, 0.0], [3.2, 0.58, 0.58, 0.6, 0.0], [2.2, 0.5, 0.56, 0.58, 0.02], [0.6, 0.42, 0.56, 0.56, 0.05], [-1.5, 0.3, 0.42, 0.46, 0.08], [-4.0, 0.12, 0.25, 0.14, 0.13], [-5.0, 0.05, 0.12, 0.05, 0.15]]), PT);
      B.add(fuse([[3.7, 0.56, 0.56, 0.56, 0.0], [2.6, 0.6, 0.6, 0.62, 0.0]]), BLK);
      radial(B, 3.68, 0.5, 14);
      canopy(B, [[1.5, 0.05, 0.05, 0.02, 0.55], [1.2, 0.26, 0.3, 0.05, 0.53], [0.0, 0.28, 0.4, 0.05, 0.56], [-1.4, 0.24, 0.32, 0.05, 0.53], [-2.0, 0.05, 0.05, 0.02, 0.48]], [1.15, 0.5, -0.2, -0.9]);
      W(B, PT, { x0: 0.4, span: 5.6, rc: 2.5, tc: 1.0, z: 1.75, y: -0.45, dih: 6, th: 0.13, tip: 'ellip', mid: 0.4 });
      for (const sx of [-1, 1]) B.add(box, YEL, 0.9, 0.02, 0.12, sx * 3.6, -0.06, 1.66);
      W(B, PT, { x0: 0.1, span: 1.9, rc: 1.1, tc: 0.5, z: -3.85, y: 0.12, th: 0.1, tip: 'ellip' });
      B.add(finGeo({ y: 0.12, h: 1.3, rc: 1.3, tc: 0.55, z: -3.8, sweep: -0.55, th: 0.1, round: true }), PT);
      B.add(fuse([[2.0, 0.25, 0.25, 0.25, -0.95], [1.0, 0.3, 0.3, 0.3, -0.95], [-0.3, 0.06, 0.06, 0.06, -0.95]], 10), PT);
      for (const sx of [-1, 1]) barrel(B, sx * 2.6, -0.42, 1.7, 0.4, 0.028);
      return { props: [{ x: 0, y: 0, z: 3.72, r: 1.45, n: 3, spin: [0.24, 0.4], col: 0x6a5a3a }], L: 9.06 };
    },
    marks(g, info) { wingMarks(g, 'hino', 0.62, 0.95, null, info); sideMarks(g, 'hino', 0.36, 0.12, -2.6, 0.75); },
  };

  // Dewoitine D.520
  SPEC.d520 = {
    paint: () => ({ pat: 'blotch', c: [0x6e6450, 0x4f5a3a, 0x8a7a5a], u: 0xa2a6a0 }),
    build(B) {
      B.add(fuse([[4.1, 0.12, 0.12, 0.12, 0.0], [3.7, 0.42, 0.42, 0.45, -0.02], [2.2, 0.52, 0.58, 0.62, 0.0], [0.4, 0.48, 0.6, 0.62, 0.04], [-1.6, 0.34, 0.44, 0.48, 0.08], [-3.8, 0.12, 0.25, 0.16, 0.14], [-4.6, 0.05, 0.12, 0.05, 0.16]]), PT);
      canopy(B, [[0.6, 0.05, 0.05, 0.02, 0.56], [0.3, 0.26, 0.32, 0.05, 0.54], [-0.6, 0.28, 0.38, 0.05, 0.56], [-1.4, 0.18, 0.22, 0.05, 0.52], [-2.0, 0.05, 0.05, 0.02, 0.48]], [0.3, -0.5]);
      B.add(fuse([[1.0, 0.28, 0.08, 0.3, -0.58], [0.0, 0.3, 0.1, 0.32, -0.6], [-0.8, 0.15, 0.05, 0.18, -0.55]]), PD);
      W(B, PT, { x0: 0.45, span: 4.7, rc: 2.2, tc: 1.0, z: 1.4, y: -0.45, dih: 6, th: 0.14, tip: 'round', sweep: -0.1 });
      W(B, PT, { x0: 0.1, span: 1.55, rc: 1.0, tc: 0.55, z: -3.45, y: 0.12, th: 0.1, tip: 'round' });
      B.add(finGeo({ y: 0.15, h: 1.2, rc: 1.2, tc: 0.6, z: -3.4, sweep: -0.35, th: 0.1, round: true }), PT);
      for (const k of [0, 1, 2]) B.add(box, [0x23305e, 0xefede4, 0x9a2a24][k], 0.03, 1.0, 0.25, 0, 0.7, -4.35 + k * 0.22);
      barrel(B, 0, 0.0, 4.1, 0.4, 0.035);
      return { props: [{ x: 0, y: 0, z: 3.95, r: 1.5, n: 3, spin: [0.2, 0.55], col: 0x5a5a50 }], L: 8.76 };
    },
    marks(g, info) { wingMarks(g, 'fra', 0.64, 0.75, null, info); },
  };

  // PZL P.11c (asa alta de gaivota, motor com anel Townend)
  SPEC.pzl11 = {
    paint: () => ({ pat: 'solid', c: [0x6a6a48], u: 0x9aa8b0 }),
    build(B) {
      B.add(fuse([[2.8, 0.5, 0.5, 0.5, 0.0], [2.3, 0.56, 0.56, 0.58, 0.0], [1.0, 0.5, 0.6, 0.62, 0.02], [-1.0, 0.36, 0.5, 0.5, 0.06], [-3.6, 0.12, 0.28, 0.12, 0.12], [-4.4, 0.04, 0.12, 0.04, 0.14]]), PT);
      radial(B, 2.78, 0.48, 9);
      B.add(box, GL, 0.5, 0.25, 0.04, 0, 0.72, 0.3, -0.4, 0, 0); B.add(C12, DARK, 0.3, 0.05, 0.3, 0, 0.62, -0.1);
      W(B, PT, { x0: 0.0, span: 5.35, rc: 1.8, tc: 1.3, z: 1.5, y: 0.75, th: 0.12, tip: 'round', gull: [[0, 0], [0.18, 0.18], [1, 0.25]] });
      for (const sx of [-1, 1]) { B.add(box, STEEL, 0.05, 1.15, 0.06, sx * 1.2, 0.1, 1.0, 0, 0, sx * 0.75); B.add(box, STEEL, 0.05, 1.3, 0.06, sx * 0.6, -0.9, 0.9, 0, 0, sx * 0.2); B.add(C12, DARK, 0.3, 0.1, 0.3, sx * 0.75, -1.55, 0.9, 0, 0, Math.PI / 2); }
      W(B, PT, { x0: 0.1, span: 1.7, rc: 1.0, tc: 0.7, z: -3.3, y: 0.15, th: 0.08, tip: 'round' });
      B.add(finGeo({ y: 0.12, h: 1.0, rc: 1.0, tc: 0.6, z: -3.3, sweep: -0.25, th: 0.08, round: true }), PT);
      for (const sx of [-1, 1]) barrel(B, sx * 0.2, 0.42, 1.7, 0.6, 0.02);
      return { props: [{ x: 0, y: 0, z: 2.82, r: 1.4, n: 2, spin: [0.18, 0.3], col: 0x6a5a3a }], L: 7.55 };
    },
    marks(g, info) { { const w = wingAt(info.wing, 0.62); for (const sx of [-1, 1]) decal(g, ins('pol'), 1.6, 0.8, sx * w.x, w.y + w.th + 0.02, w.zl - w.c * 0.45, 0, -Math.PI / 2); } for (const sx of [-1, 1]) decal(g, ins('pol'), 1.4, 0.7, sx * 0.28, 0.2, -2.6, sx * Math.PI / 2); },
  };

  // Polikarpov I-16 tipo 24
  SPEC.i16 = {
    paint: () => ({ pat: 'solid', c: [0x5a6a40], u: 0x8aa2b0 }),
    build(B) {
      B.add(fuse([[2.3, 0.58, 0.58, 0.58, 0.0], [1.8, 0.66, 0.66, 0.66, 0.0], [0.3, 0.62, 0.7, 0.68, 0.05], [-1.2, 0.42, 0.52, 0.48, 0.1], [-3.0, 0.14, 0.26, 0.14, 0.16], [-3.6, 0.05, 0.12, 0.05, 0.18]]), PT);
      B.add(C16, BLK, 0.5, 0.04, 0.5, 0, 0, 2.31, Math.PI / 2, 0, 0); for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; B.add(box, DARK, 0.06, 0.25, 0.04, Math.cos(a) * 0.36, Math.sin(a) * 0.36, 2.33, 0, 0, a); }
      canopy(B, [[0.0, 0.05, 0.05, 0.02, 0.68], [-0.3, 0.25, 0.3, 0.05, 0.66], [-1.0, 0.2, 0.22, 0.05, 0.64]], [-0.3]);
      W(B, PT, { x0: 0.5, span: 4.0, rc: 2.0, tc: 1.1, z: 1.2, y: -0.4, dih: 5, th: 0.15, tip: 'round', sweep: -0.2 });
      W(B, PT, { x0: 0.1, span: 1.45, rc: 0.9, tc: 0.6, z: -2.7, y: 0.15, th: 0.08, tip: 'round' });
      B.add(finGeo({ y: 0.12, h: 1.0, rc: 1.0, tc: 0.55, z: -2.7, sweep: -0.25, th: 0.08, round: true }), PT);
      for (const sx of [-1, 1]) barrel(B, sx * 1.6, -0.35, 1.1, 0.5, 0.025);
      return { props: [{ x: 0, y: 0, z: 2.4, r: 1.4, n: 2, spin: [0.22, 0.4], col: BLK }], L: 6.13 };
    },
    marks(g, info) { for (const sx of [-1, 1]) decal(g, ins(typeof SC !== 'undefined' && SC.nat && (SC.nat.A === 'CHN' || SC.nat.B === 'CHN') ? 'chn' : 'redstar'), 1.4, 0.7, sx * 0.08, 0.7, -3.0, sx * Math.PI / 2); },
  };

  // Douglas C-47 Skytrain
  SPEC.c47 = {
    paint: () => ({ pat: 'solid', c: [0x4f5530], u: 0x8d908a, ws: invasion() ? [5.6, 0.55, 5, 1] : null, fs: invasion() ? [-4.0, 0.55, 5, 1] : null }),
    build(B) {
      B.add(fuse([[8.8, 0.25, 0.3, 0.3, 0.1], [8.0, 0.95, 0.95, 1.0, 0.05], [6.5, 1.25, 1.28, 1.28, 0.05], [2.0, 1.32, 1.35, 1.35, 0.05], [-3.0, 1.15, 1.2, 1.15, 0.15], [-7.0, 0.55, 0.7, 0.45, 0.45], [-10.4, 0.12, 0.25, 0.1, 0.7]]), PT);
      for (let i = 0; i < 6; i++) for (const sx of [-1, 1]) B.add(box, GL, 0.04, 0.3, 0.35, sx * 1.33, 0.35, 4.0 - i * 1.15);
      B.add(box, GL, 1.5, 0.35, 0.5, 0, 0.92, 7.75, -0.6, 0, 0);
      B.add(box, 0x161616, 0.04, 1.6, 1.4, -1.33, 0.05, -2.8);
      W(B, PT, { x0: 1.0, span: 13.5, rc: 4.4, tc: 1.4, z: 4.4, y: -0.7, dih: 5, th: 0.16, tip: 'round', sweep: -1.0 });
      W(B, PT, { x0: 0.2, span: 4.0, rc: 2.2, tc: 1.1, z: -8.4, y: 0.7, th: 0.1, tip: 'round' });
      B.add(finGeo({ y: 0.7, h: 3.2, rc: 3.0, tc: 1.2, z: -7.8, sweep: -1.5, th: 0.1, round: true }), PT);
      for (const sx of [-1, 1]) {
        B.add(fuse([[5.6, 0.7, 0.7, 0.7, -0.55], [5.2, 0.78, 0.78, 0.78, -0.55], [3.0, 0.7, 0.62, 0.78, -0.6], [0.8, 0.3, 0.3, 0.4, -0.6]], 14), PT, 1, 1, 1, sx * 4.3, 0, 0);
        radial(B, 5.58, 0.66, 9); B.add(C16, BLK, 0.7, 0.04, 0.7, sx * 4.3, -0.55, 5.58, Math.PI / 2, 0, 0);
      }
      return { props: [-1, 1].map(sx => ({ x: sx * 4.3, y: -0.55, z: 5.65, r: 1.75, n: 3, spin: [0.25, 0.35], col: BLK, tips: true })), L: 19.4 };
    },
    marks(g, info) { wingMarks(g, year() >= 1943.5 ? 'usbar' : 'usstar', 0.66, 1.6, null, info); sideMarks(g, year() >= 1943.5 ? 'usbar' : 'usstar', 1.18, 0.2, -3.6, 1.3); },
  };

  // Martin B-26 Marauder
  SPEC.b26 = {
    paint: () => ({ pat: 'solid', c: [0x4f5530], u: 0x8d908a, ws: invasion() ? [5.3, 0.55, 5, 1] : null, fs: invasion() ? [-3.5, 0.55, 5, 1] : null }),
    build(B) {
      B.add(fuse([[8.9, 0.2, 0.2, 0.2, 0.0], [8.2, 0.75, 0.78, 0.78, 0.0], [5.5, 1.05, 1.1, 1.1, 0.02], [0.0, 1.1, 1.15, 1.1, 0.05], [-4.5, 0.85, 0.95, 0.85, 0.12], [-8.2, 0.3, 0.45, 0.3, 0.3], [-8.9, 0.15, 0.25, 0.15, 0.35]]), PT);
      B.add(fuse([[9.0, 0.2, 0.2, 0.2, 0.0], [8.3, 0.6, 0.6, 0.6, 0.0], [7.8, 0.72, 0.72, 0.72, 0.0]]), GL);
      canopy(B, [[6.9, 0.05, 0.05, 0.02, 0.9], [6.5, 0.55, 0.42, 0.05, 0.88], [5.4, 0.6, 0.48, 0.05, 0.9], [4.6, 0.06, 0.06, 0.02, 0.9]], [6.4, 5.9]);
      B.add(lathe([[0, 0], [0.55, 0], [0.55, 0.15], [0.45, 0.4], [0.2, 0.58], [0, 0.6]], 14), GL, 1, 1, 1, 0, 1.05, -1.5);
      for (const sx of [-1, 1]) barrel(B, sx * 0.15, 1.35, -1.3, 0.9, 0.025);
      W(B, PT, { x0: 1.0, span: 9.8, rc: 3.8, tc: 1.6, z: 3.0, y: 0.55, dih: 2, th: 0.16, tip: 'round', sweep: -0.6 });
      W(B, PT, { x0: 0.25, span: 3.9, rc: 2.0, tc: 1.1, z: -6.9, y: 0.9, dih: 6, th: 0.1, tip: 'round' });
      B.add(finGeo({ y: 0.6, h: 3.5, rc: 3.0, tc: 1.6, z: -6.4, sweep: -1.6, th: 0.1 }), PT);
      B.add(C8, GL, 0.35, 0.6, 0.35, 0, 0.3, -9.0, Math.PI / 2, 0, 0); for (const sx of [-1, 1]) barrel(B, sx * 0.1, 0.3, -10.0, 0.7, 0.025);
      for (const sx of [-1, 1]) {
        B.add(fuse([[5.6, 0.75, 0.75, 0.75, 0.15], [5.2, 0.92, 0.92, 0.95, 0.12], [2.0, 0.85, 0.82, 0.95, 0.05], [-1.2, 0.3, 0.3, 0.4, 0.0]], 14), PT, 1, 1, 1, sx * 4.0, 0, 0);
        radial(B, 5.58, 0.72, 14);
        for (const z of [7.4, 6.8]) barrel(B, sx * 1.15, -0.1, z - 0.3, 0.5, 0.025);
      }
      return { props: [-1, 1].map(sx => ({ x: sx * 4.0, y: 0.15, z: 5.7, r: 2.0, n: 4, spin: [0.3, 0.4], col: BLK, tips: true })), L: 17.8 };
    },
    marks(g, info) { wingMarks(g, year() >= 1943.5 ? 'usbar' : 'usstar', 0.68, 1.5, null, info); sideMarks(g, year() >= 1943.5 ? 'usbar' : 'usstar', 1.0, 0.25, -4.2, 1.2); },
  };

  /* ---------- montagem ---------- */
  function make(kind) {
    const S = SPEC[kind] || SPEC.p47;
    const sc = S.paint(), mat = planeMat(sc);
    const g = new THREE.Group(), inner = new THREE.Group(); inner.scale.setScalar(KS); g.add(inner);
    let info;
    const geo = once('AV' + kind, () => { const B = new MB(); WING = null; info = S.build(B); info.wing = WING; const gg = B.build(); gg.userData = info; return gg; });
    info = geo.userData;
    const m = new THREE.Mesh(geo, mat); m.castShadow = true; inner.add(m);
    const props = info.props.map((p, i) => {
      const pg = once('PR' + kind + i, () => propGeo(p.r, p.n, p.spin, p.col, p.tips));
      const pm = new THREE.Mesh(pg, mat); pm.position.set(p.x, p.y, p.z); inner.add(pm); return pm;
    });
    if (S.marks) S.marks(inner, info);
    g.userData = { props, L: info.L * KS, a3: true };
    return g;
  }
  return { make, has: (k) => !!SPEC[k], kinds: () => Object.keys(SPEC), SPEC };
})();
if (typeof makePlane === 'function') makePlane = function (kind) { return Aviao3.make(kind); };
