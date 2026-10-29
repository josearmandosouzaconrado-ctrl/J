'use strict';
/* =========================================================
   ZOOM 3D DO MAPA MUNDIAL
   Ao aproximar o globo (ou o mapa plano) a câmera desce e inclina
   e o mapa vira terreno 3D de verdade:
   - relevo gerado das províncias (montanhas, colinas, planícies,
     litoral suave, neve nos picos) com a cor política por cima
   - fronteiras e frentes de batalha coladas no relevo
   - cidades com casas, telhados e torres nas capitais, e nomes
   - florestas instanciadas
   - divisões em miniatura 3D (tanques, caminhões, meias-lagartas,
     soldados e navios de transporte) andando pelo terreno conforme
     o progresso real da marcha, com tiros e explosões nas batalhas
   Tudo instanciado (poucas chamadas de desenho) para rodar no Android.
   ========================================================= */
const Z3 = (() => {
  const V3 = THREE.Vector3, D2R = Math.PI / 180;
  const sst = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const EX = 4;                    // exagero vertical do relevo
  const ALT_ON = 1100;             // km: abaixo disso o terreno 3D aparece
  const ALT_UNITS = 450;           // km: abaixo disso aparecem as miniaturas
  const S = { blend: 0, uH: 0, alt: 1e4, tk: 0, fgH: 0, g: null, t: 0, lastBuild: -9, linesT: 0, init: false, units: false };
  const low = () => typeof GFX !== 'undefined' && GFX === 'low';
  const isG = () => mapStyle === 'globo';
  const KU = () => (isG() ? 63.71 : 100);          // km por unidade da cena
  const altKm = () => (isG() ? (WV.dist - GR) * 63.71 : WV.fh * 100);
  const focusLL = () => (isG() ? [WV.lon, WV.lat] : [WV.fx, WV.fz]);
  function surf(lon, lat, h, out) {
    out = out || new V3();
    if (isG()) { const a = lat * D2R, b = lon * D2R, r = GR + h; return out.set(r * Math.cos(a) * Math.sin(b), r * Math.sin(a), r * Math.cos(a) * Math.cos(b)); }
    return out.set(lon, h, -lat * FLAT_K);
  }
  function frame(lon, lat, up, no, ea) {
    if (isG()) {
      const a = lat * D2R, b = lon * D2R, sa = Math.sin(a), ca = Math.cos(a), sb = Math.sin(b), cb = Math.cos(b);
      up.set(ca * sb, sa, ca * cb); no.set(-sa * sb, ca, -sa * cb); ea.set(cb, 0, -sb);
    } else { up.set(0, 1, 0); no.set(0, 0, -1); ea.set(1, 0, 0); }
  }
  function toLL(p) {
    if (isG()) return [Math.atan2(p.x, p.z) / D2R, Math.asin(Math.max(-1, Math.min(1, p.y / p.length()))) / D2R];
    return [p.x, -p.z / FLAT_K];
  }

  /* ---------- ruído determinístico (coordenadas em km) ---------- */
  function hash(i, j) { let h = Math.imul(i, 374761393) + Math.imul(j, 668265263) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
  function vn(x, y) {
    const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    const a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y, o) { let s = 0, a = 0.5, f = 1; for (let k = 0; k < o; k++) { s += a * vn(x * f, y * f); f *= 2.03; a *= 0.5; } return s; }
  function ridged(x, y, o) { let s = 0, a = 0.55, f = 1; for (let k = 0; k < o; k++) { const n = 1 - Math.abs(vn(x * f + 17, y * f - 9) * 2 - 1); s += a * n * n; f *= 2.1; a *= 0.5; } return s; }
  function rng(seed) { let s = seed * 9301 + 49297 | 0; return () => { s = Math.imul(s ^ (s >>> 15), 2246822507) + 0x9e3779b9 | 0; return ((s ^ (s >>> 13)) >>> 0) / 4294967296; }; }

  /* ---------- objetos da cena ---------- */
  let tileMesh = null, tileMat = null, lines = null, houses = null, roofs = null, trees = null, labels = null, sun = null, hemi = null, sun0 = null;
  const UM = {};                   // miniaturas instanciadas por tipo
  let fire = null, smoke = null;
  function init() {
    if (S.init || !WV.scene) return;
    S.init = true;
    const sc = WV.scene;
    sc.fog = new THREE.Fog(0x9db6c8, 1e5, 2e5);
    for (const o of sc.children) { if (o.isDirectionalLight) sun = o; if (o.isHemisphereLight) hemi = o; }
    if (sun) sun0 = sun.position.clone();
    mapTex.wrapS = THREE.RepeatWrapping; mapTex.needsUpdate = true;
    tileMat = new THREE.MeshLambertMaterial({ vertexColors: true, map: mapTex });
    tileMat.userData.u = { uMix: { value: 1 }, uH: { value: 1 }, uO: { value: new V3() }, uG: { value: 1 } };
    tileMat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, tileMat.userData.u);
      sh.vertexShader = 'attribute float aH;\nuniform float uH;\nuniform vec3 uO;\nuniform float uG;\n' + sh.vertexShader.replace('#include <begin_vertex>',
        '#include <begin_vertex>\nvec3 upv = uG > 0.5 ? normalize(position + uO) : vec3(0.0, 1.0, 0.0);\ntransformed -= upv * aH * (1.0 - uH);');
      sh.fragmentShader = 'uniform float uMix;\n' + sh.fragmentShader.replace('#include <map_fragment>', '')
        .replace('#include <color_fragment>', 'vec3 tcol = texture2D(map, vUv).rgb;\ndiffuseColor.rgb = mix(vColor, tcol, uMix);');
    };
    tileMat.customProgramCacheKey = () => 'z3tile';
    tileMesh = new THREE.Mesh(new THREE.BufferGeometry(), tileMat); tileMesh.visible = false; sc.add(tileMesh);
    lines = new THREE.Group(); sc.add(lines);
    // cidades
    const hb = new THREE.BoxGeometry(1, 1, 1); hb.translate(0, 0.5, 0);
    const rf = new THREE.ConeGeometry(0.74, 1, 4); rf.rotateY(Math.PI / 4); rf.translate(0, 0.5, 0);
    houses = inst(hb, new THREE.MeshLambertMaterial(), 5000); roofs = inst(rf, new THREE.MeshLambertMaterial(), 5000);
    // árvores: copa (cor por instância) e tronco escuro
    const tr = mm([[new THREE.ConeGeometry(1, 2.2, 6, 1, true), -1, 1, 1, 1, 0, 1.6, 0], [new THREE.ConeGeometry(0.72, 1.5, 6, 1, true), -1.1, 1, 1, 1, 0, 2.45, 0], [new THREE.CylinderGeometry(0.18, 0.22, 0.6, 4, 1, true), 0x4a3524, 1, 1, 1, 0, 0.3, 0]]);
    trees = inst(tr, paintMat(), 4000);
    // miniaturas
    for (const [k, g] of Object.entries(models())) UM[k] = inst(g, paintMat(), k === 'man' ? 1600 : 400);
    UM.ring = inst((() => { const r = new THREE.RingGeometry(0.86, 1, 24); r.rotateX(-Math.PI / 2); return r; })(), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.6, depthWrite: false }), 400);
    fire = fx(true); smoke = fx(false);
    labels = document.createElement('div'); labels.id = 'zlabels';
    labels.style.cssText = 'position:fixed;inset:0;z-index:3;pointer-events:none;overflow:hidden;font:600 12px "Barlow Condensed",Arial Narrow,sans-serif;color:#fff;text-shadow:0 1px 2px #000,0 0 3px #000;';
    document.body.appendChild(labels);
  }
  function inst(geo, mat, n) {
    const m = new THREE.InstancedMesh(geo, mat, n), c = new THREE.Color(1, 1, 1);
    for (let i = 0; i < n; i++) m.setColorAt(i, c);
    m.count = 0; m.frustumCulled = false; WV.scene.add(m); return m;
  }
  // tinta: vértices marcados (1, g, 1) recebem a cor da instância; o resto mantém a cor própria
  function paintMat() {
    const m = new THREE.MeshLambertMaterial({ vertexColors: true });
    m.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader.replace('#include <color_vertex>',
        'vColor = vec3(1.0);\n#ifdef USE_COLOR\nvColor = color.rgb;\n#endif\n#ifdef USE_INSTANCING_COLOR\nif (vColor.r > 0.99 && vColor.b > 0.99 && vColor.g < 0.995) vColor = instanceColor.rgb * (vColor.g / 0.9);\n#endif');
    };
    m.customProgramCacheKey = () => 'z3paint';
    return m;
  }
  // junta peças [geo, cor, sx, sy, sz, x, y, z, rx, ry, rz] numa só geometria com cor por vértice
  function mm(parts) {
    const P = [], N = [], C = [], m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), nm = new THREE.Matrix3(), v = new V3(), col = new THREE.Color();
    for (const [geo, c, sx, sy, sz, x, y, z, rx = 0, ry = 0, rz = 0] of parts) {
      const g = geo.index ? geo.toNonIndexed() : geo, pa = g.attributes.position, na = g.attributes.normal;
      e.set(rx, ry, rz, 'YXZ'); q.setFromEuler(e); m.compose(new V3(x, y, z), q, new V3(sx, sy, sz)); nm.getNormalMatrix(m);
      if (c < 0) col.setRGB(1, Math.min(0.99, -c * 0.9), 1); else col.setHex(c);
      for (let i = 0; i < pa.count; i++) {
        v.fromBufferAttribute(pa, i).applyMatrix4(m); P.push(v.x, v.y, v.z);
        v.fromBufferAttribute(na, i).applyMatrix3(nm).normalize(); N.push(v.x, v.y, v.z); C.push(col.r, col.g, col.b);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(N, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(C, 3));
    return g;
  }

  /* ---------- miniaturas (metros reais, frente em +z) ---------- */
  const PT = -1, PD = -0.8, PL = -1.08, TRK = 0x2a2924, RUB = 0x1e1e1c, CAN = 0x6d6648, SKIN = 0xc99a74, WOOD = 0x6a4a2c;
  function models() {
    const box = new THREE.BoxGeometry(1, 1, 1), c8 = new THREE.CylinderGeometry(1, 1, 1, 8), c6 = new THREE.CylinderGeometry(1, 1, 1, 6), sph = new THREE.SphereGeometry(1, 5, 3), hemi = new THREE.SphereGeometry(1, 6, 2, 0, Math.PI * 2, 0, Math.PI / 2);
    const tank = (L, W, H, tr, th, gl, td) => {
      const y = 0.95, p = [[box, TRK, 0.66, 0.95, L, -(W / 2 - 0.33), 0.48, 0], [box, TRK, 0.66, 0.95, L, W / 2 - 0.33, 0.48, 0],
        [box, PT, W * 0.92, H, L * 0.86, 0, y + H / 2, -0.04 * L], [box, PD, W * 0.9, H * 0.12, L * 0.34, 0, y + H * 0.55, L * 0.43, -0.75, 0, 0],
        [box, PD, W * 1.0, 0.08, L * 0.9, 0, y + 0.05, 0]];
      for (const s of [-1, 1]) for (let i = 0; i < 4; i++) p.push([c8, RUB, 0.36, 0.12, 0.36, s * (W / 2 - 0.33) * 1.08, 0.42, (i - 1.5) * L * 0.22, 0, 0, Math.PI / 2]);
      if (td) { p.push([box, PL, W * 0.82, th, L * 0.48, 0, y + H + th / 2, 0.06 * L], [c6, PD, 0.11, gl, 0.11, 0, y + H + th * 0.45, 0.06 * L + L * 0.24 + gl / 2, Math.PI / 2, 0, 0]); }
      else {
        const tz = -0.06 * L;
        p.push([c8, PL, tr, th, tr * 1.1, 0, y + H + th / 2, tz], [box, PT, tr * 1.3, th * 0.8, tr * 0.9, 0, y + H + th * 0.45, tz - tr * 0.9],
          [c6, PD, 0.1, gl, 0.1, 0, y + H + th * 0.5, tz + tr + gl / 2, Math.PI / 2, 0, 0], [c8, PD, 0.18, 0.4, 0.18, 0, y + H + th * 0.5, tz + tr * 0.95, Math.PI / 2, 0, 0],
          [c8, PD, tr * 0.32, 0.22, tr * 0.32, tr * 0.25, y + H + th + 0.1, tz - tr * 0.2]);
      }
      return mm(p);
    };
    const wheels = (p, zs, r, w) => { for (const z of zs) for (const s of [-1, 1]) p.push([c8, RUB, r, 0.3, r, s * w, r, z, 0, 0, Math.PI / 2]); };
    const truck = () => { const p = [[box, 0x262622, 1.9, 0.35, 6.4, 0, 0.85, 0], [box, PT, 1.8, 0.95, 1.3, 0, 1.45, 2.55], [box, PT, 2.1, 1.35, 1.25, 0, 1.75, 1.35], [box, 0x1a1e20, 1.9, 0.4, 0.05, 0, 2.05, 2.0],
      [box, CAN, 2.25, 1.75, 3.9, 0, 2.05, -1.25], [box, PD, 2.3, 0.45, 3.9, 0, 1.25, -1.25]]; wheels(p, [2.4, -0.6, -2.0], 0.5, 0.95); return mm(p); };
    const half = () => { const p = [[box, TRK, 0.5, 0.8, 2.8, -0.85, 0.42, -1.3], [box, TRK, 0.5, 0.8, 2.8, 0.85, 0.42, -1.3], [box, PT, 2.1, 1.25, 4.4, 0, 1.45, -0.6],
      [box, PT, 1.7, 0.85, 1.6, 0, 1.25, 2.3], [box, PD, 2.15, 0.08, 4.4, 0, 2.1, -0.6], [c6, PD, 0.06, 1.2, 0.06, 0, 2.4, 0.6, -1.2, 0, 0]]; wheels(p, [2.3], 0.45, 0.9); return mm(p); };
    const man = () => mm([[box, PD, 0.34, 0.86, 0.22, 0, 0.43, 0], [box, PT, 0.46, 0.62, 0.27, 0, 1.17, 0], [box, PD, 0.36, 0.38, 0.16, 0, 1.22, -0.2], [sph, SKIN, 0.12, 0.13, 0.12, 0, 1.6, 0],
      [hemi, PD, 0.17, 0.13, 0.17, 0, 1.66, 0], [box, WOOD, 0.05, 0.06, 1.15, 0.2, 1.2, 0.18, -0.55, 0, 0], [box, PT, 0.12, 0.5, 0.13, -0.29, 1.15, 0.04], [box, PT, 0.12, 0.5, 0.13, 0.29, 1.15, 0.08, -0.4, 0, 0]]);
    const ship = () => {
      const G = 0x6a7076, D = 0x4a5056, p = [[box, 0x3c2a24, 11, 3, 100, 0, 1.2, -4], [box, G, 12, 5.5, 104, 0, 5, -4], [new THREE.ConeGeometry(6, 26, 4), G, 1, 1, 0.85, 0, 5, 59, Math.PI / 2, Math.PI / 4, 0],
        [box, D, 12.2, 0.4, 130, 0, 7.8, 2], [box, 0xd8d4c8, 9, 7, 16, 0, 11.5, -12], [box, 0xd8d4c8, 6, 3, 10, 0, 16, -12], [c8, 0x2a2826, 2, 8, 2, 0, 16, -22],
        [box, CAN, 7, 2.5, 14, 0, 9, 22], [box, CAN, 7, 2.5, 14, 0, 9, -40], [c6, D, 0.4, 20, 0.4, 0, 17, 30], [c6, D, 0.4, 18, 0.4, 0, 16, -46]];
      return mm(p);
    };
    return { tl: tank(4.6, 2.3, 0.85, 0.72, 0.58, 1.6), tm: tank(6.0, 2.9, 1.05, 0.98, 0.72, 3.0), th: tank(6.9, 3.5, 1.2, 1.22, 0.85, 4.6), td: tank(6.2, 3.0, 0.95, 0, 0.85, 3.4, true),
      truck: truck(), half: half(), man: man(), ship: ship() };
  }
  const LIGHT = ['panzer2', 'panzer38t', 't26', 'bt7', 'l335', 'hago', 'stuart', 'tp7', 'm24', 'crusader'];
  const HEAVY = ['tiger', 'kingtiger', 'kv1', 'panther', 'm26', 'charb1', 'matilda'];
  const TD = ['stug', 'jagdpanther', 'hetzer', 'm10', 'm18', 'm36', 'm7', 'calliope', 'wirbelwind'];
  function tankCls(tag) {
    let k = 'sherman'; try { k = eraKind('tank', tag) || k; } catch (e) { /* nação sem tabela */ }
    return LIGHT.includes(k) ? 'tl' : HEAVY.includes(k) ? 'th' : TD.includes(k) ? 'td' : 'tm';
  }
  const NATK = { CAN: 'ENG', AST: 'ENG', NZL: 'ENG', SAF: 'ENG', RAJ: 'ENG', IND: 'ENG', MAN: 'JAP', BRA: 'USA', VIC: 'FRA' };
  const _pc = new Map();
  function paint(tag) {
    const k = tag + (curYear() > 1943.15 ? 'L' : 'E'); if (_pc.has(k)) return _pc.get(k);
    const n = NATK[tag] || tag, late = curYear() > 1943.15;
    const veh = { GER: late ? 0xaf9a63 : 0x5a6064, USA: 0x5d6640, ENG: 0x6a5f45, SOV: 0x56663a, FRA: 0x9b8a57, POL: 0x9a8a58, JAP: 0x8a7448, ITA: 0x7a7e5c }[n] || 0x646a46;
    const L = typeof Soldado3 !== 'undefined' && Soldado3.LOOK && Soldado3.LOOK[n], jac = (L && L.pal && L.pal.jacket) || 0x6e6c4c;
    // um pouco mais claro que o real para aparecer no terreno visto de longe
    const r = { veh: new THREE.Color(veh).multiplyScalar(1.25), man: new THREE.Color(jac).multiplyScalar(1.3), nat: new THREE.Color((W.nat[tag] && W.nat[tag].color) || '#888') };
    _pc.set(k, r); return r;
  }

  /* ---------- efeitos de batalha (pontos com tamanho em unidades) ---------- */
  function fx(add) {
    const N = 220, g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    g.setAttribute('aS', new THREE.BufferAttribute(new Float32Array(N), 1));
    g.setAttribute('aC', new THREE.BufferAttribute(new Float32Array(N * 4), 4));
    const m = new THREE.ShaderMaterial({
      uniforms: { uP: { value: 600 } }, transparent: true, depthWrite: false, blending: add ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexShader: 'attribute float aS; attribute vec4 aC; varying vec4 vC; uniform float uP; void main(){ vC = aC; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = clamp(aS * uP / -mv.z, 0.0, 256.0); gl_Position = projectionMatrix * mv; }',
      fragmentShader: 'varying vec4 vC; void main(){ float d = length(gl_PointCoord - 0.5) * 2.0; float a = vC.a * (1.0 - smoothstep(0.3, 1.0, d)); if (a < 0.01) discard; gl_FragColor = vec4(vC.rgb, a); }',
    });
    const p = new THREE.Points(g, m); p.frustumCulled = false; WV.scene.add(p);
    p.userData.parts = Array.from({ length: N }, () => ({ life: 0, max: 1, p: new V3(), v: new V3(), s: 1, c: [1, 1, 1] }));
    p.userData.i = 0; return p;
  }
  function spawn(P, pos, vel, s, c, life) {
    const u = P.userData, q = u.parts[u.i = (u.i + 1) % u.parts.length];
    q.p.copy(pos); q.v.copy(vel); q.s = s; q.c = c; q.life = q.max = life;
  }
  function stepFx(P, dt, grow) {
    const u = P.userData, pa = P.geometry.attributes.position, sa = P.geometry.attributes.aS, ca = P.geometry.attributes.aC;
    u.parts.forEach((q, i) => {
      if (q.life > 0) { q.life -= dt; q.p.addScaledVector(q.v, dt); }
      const k = Math.max(0, q.life / q.max);
      pa.setXYZ(i, q.p.x, q.p.y, q.p.z); sa.setX(i, q.life > 0 ? q.s * (grow ? 1 + (1 - k) * 2.2 : 0.6 + k * 0.6) : 0);
      ca.setXYZW(i, q.c[0], q.c[1], q.c[2], q.life > 0 ? (grow ? 0.4 * Math.min(1, k * 3) * Math.min(1, (1 - k) * 8) : k) : 0);
    });
    pa.needsUpdate = sa.needsUpdate = ca.needsUpdate = true;
    P.material.uniforms.uP.value = window.innerHeight * renderer.getPixelRatio() / (2 * Math.tan(WV.cam.fov * D2R / 2));
  }

  /* ---------- terreno ---------- */
  const BIO = { N: [88, 122, 56], S: [132, 130, 78], D: [201, 172, 118], W: [112, 124, 96], T: [44, 88, 40], M: [104, 100, 78] };
  const MNT = { N: 0, S: 0.32, D: 0.12, W: 0.15, T: 0.1, M: 1 }, FOR = { N: 0.45, S: 0.15, D: 0, W: 0.55, T: 1, M: 0.3 };
  function needR(alt) { return Math.max(160, Math.min(1500, alt * (2 + 10 * S.tk))); }
  function raster(lo0, lo1, la0, la1, RW) {
    const ca = document.createElement('canvas'), cb = document.createElement('canvas'); ca.width = cb.width = ca.height = cb.height = RW;
    const A = ca.getContext('2d'), B = cb.getContext('2d');
    A.fillStyle = '#000'; A.fillRect(0, 0, RW, RW); B.fillStyle = '#000'; B.fillRect(0, 0, RW, RW); A.lineWidth = B.lineWidth = 1.2; A.lineJoin = B.lineJoin = 'round';
    const sx = RW / (lo1 - lo0), sy = RW / (la1 - la0);
    for (const p of WG.provs) for (const off of [-360, 0, 360]) {
      const b = p.bb; if (b[0] + off > lo1 || b[2] + off < lo0 || b[1] > la1 || b[3] < la0) continue;
      const path = (g) => { g.beginPath(); for (const r of p.poly) { r.forEach((q, i) => { const x = (q[0] + off - lo0) * sx, y = (la1 - q[1]) * sy; i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); } };
      const c = BIO[p.terr] || BIO.N;
      // contorno da mesma cor fecha a costura do antisserrilhado entre províncias vizinhas
      path(A); A.fillStyle = A.strokeStyle = 'rgb(' + c + ')'; A.fill('evenodd'); A.stroke();
      path(B); B.fillStyle = B.strokeStyle = 'rgb(' + Math.round(MNT[p.terr] * 255) + ',255,' + Math.round(FOR[p.terr] * 255) + ')'; B.fill('evenodd'); B.stroke();
    }
    const da = A.getImageData(0, 0, RW, RW).data, db = B.getImageData(0, 0, RW, RW).data, n = RW * RW;
    const m = new Float32Array(n), l = new Float32Array(n), f = new Float32Array(n);
    for (let i = 0; i < n; i++) { m[i] = db[i * 4] / 255; l[i] = db[i * 4 + 1] / 255; f[i] = db[i * 4 + 2] / 255; }
    for (const a of [m, l, f]) blur(a, RW, 2);
    return { RW, da, m, l, f };
  }
  function blur(a, n, r) {
    const t = new Float32Array(a.length);
    for (let it = 0; it < 2; it++) {
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let s = 0, c = 0; for (let k = -r; k <= r; k++) { const xx = x + k; if (xx >= 0 && xx < n) { s += a[y * n + xx]; c++; } } t[y * n + x] = s / c; }
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let s = 0, c = 0; for (let k = -r; k <= r; k++) { const yy = y + k; if (yy >= 0 && yy < n) { s += t[yy * n + x]; c++; } } a[y * n + x] = s / c; }
    }
  }
  function samp(R, arr, u, v) {
    const n = R.RW, x = Math.max(0, Math.min(n - 1.001, u * n - 0.5)), y = Math.max(0, Math.min(n - 1.001, v * n - 0.5)), i = x | 0, j = y | 0, fx = x - i, fy = y - j, k = j * n + i;
    return (arr[k] * (1 - fx) + arr[k + 1] * fx) * (1 - fy) + (arr[k + n] * (1 - fx) + arr[k + n + 1] * fx) * fy;
  }
  function sampC(R, u, v, out) {
    const n = R.RW, x = Math.max(0, Math.min(n - 1, Math.round(u * n - 0.5))), y = Math.max(0, Math.min(n - 1, Math.round(v * n - 0.5))), k = (y * n + x) * 4;
    out[0] = R.da[k] / 255; out[1] = R.da[k + 1] / 255; out[2] = R.da[k + 2] / 255; return out;
  }
  function capitals() { const s = new Set(); if (W) for (const t in W.nat) if (!W.nat[t].dead && W.nat[t].cap != null) s.add(W.nat[t].cap); return s; }

  function build(lon0, lat0, Rkm) {
    const n = low() ? 110 : 160, Rlat = Rkm / 111, cl = Math.max(0.2, Math.cos(lat0 * D2R)), Rlon = Math.min(175, Rkm / (111 * cl));
    const la0 = Math.max(LATB, lat0 - Rlat), la1 = Math.min(LATT, lat0 + Rlat), lo0 = lon0 - Rlon, lo1 = lon0 + Rlon;
    const R = raster(lo0, lo1, la0, la1, low() ? 128 : 176), ku = KU(), cellKm = 2 * Rkm / n;
    const oct = Math.max(2, Math.min(7, Math.round(Math.log2(120 / (2 * cellKm)) + 1)));
    const caps = capitals(), cities = [];
    for (const p of WG.provs) {
      if (!p.big) continue;
      let L = p.lon; while (L < lo0) L += 360; while (L > lo1) L -= 360;
      if (L < lo0 || L > lo1 || p.lat < la0 || p.lat > la1) continue;
      cities.push({ p, lon: L, lat: p.lat, cap: caps.has(p.id), r: caps.has(p.id) ? 11 : 6 });
    }
    const O = surf(lon0, lat0, 0), N1 = n + 1, cnt = N1 * N1;
    const pos = new Float32Array(cnt * 3), col = new Float32Array(cnt * 3), uv = new Float32Array(cnt * 2), aH = new Float32Array(cnt), hg = new Float32Array(cnt), fw = new Float32Array(cnt), lw = new Float32Array(cnt);
    const v = new V3(), c = [0, 0, 0], snowB = (lat) => 3.3 - 2.3 * sst(42, 70, Math.abs(lat));
    for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) {
      const k = j * N1 + i, u = i / n, w = j / n, lon = lo0 + (lo1 - lo0) * u, lat = la0 + (la1 - la0) * w, vv = 1 - w;
      const land = samp(R, R.l, u, vv), mnt = samp(R, R.m, u, vv), fo = samp(R, R.f, u, vv);
      const xk = lon * 111 * Math.cos(lat * D2R), yk = lat * 111;
      let urb = 0; for (const ct of cities) { const dx = (lon - ct.lon) * 111 * Math.cos(lat * D2R), dy = (lat - ct.lat) * 111, d = Math.sqrt(dx * dx + dy * dy); if (d < ct.r * 1.5) urb = Math.max(urb, sst(ct.r * 1.5, ct.r * 0.5, d)); }
      let e = 0.06 + 0.32 * fbm(xk / 160, yk / 160, oct);
      const rg = ridged(xk / 95, yk / 95, oct); e += mnt * (0.25 + 2.6 * rg * rg * 1.6) * (0.5 + fbm(xk / 400 + 3, yk / 400, 2));
      e *= sst(0.47, 0.72, land) * (1 - urb * 0.6);
      const edge = sst(0, 0.1, Math.min(u, 1 - u, w, 1 - w)); e *= edge;
      const sea = land < 0.5;
      let h = sea ? 0 : (e * EX + 0.03) / ku;
      if (i === 0 || j === 0 || i === n || j === n) h = -0.6;
      hg[k] = h; aH[k] = h; fw[k] = fo * (1 - urb); lw[k] = land;
      surf(lon, lat, h, v).sub(O); pos.set([v.x, v.y, v.z], k * 3);
      uv[k * 2] = (lon + 180) / 360; uv[k * 2 + 1] = 1 - Math.max(0.0005, Math.min(0.9995, (LATT - lat) / (LATT - LATB)));
      if (sea) { const s = sst(0.1, 0.5, land); c[0] = 0.08 + 0.1 * s; c[1] = 0.2 + 0.17 * s; c[2] = 0.33 + 0.12 * s; }
      else {
        sampC(R, u, vv, c); if (c[0] + c[1] + c[2] < 0.05) { c[0] = 0.35; c[1] = 0.48; c[2] = 0.22; }
        const vr = 0.88 + 0.24 * fbm(xk / 25 + 5, yk / 25, 3); c[0] *= vr; c[1] *= vr; c[2] *= vr;
        const rock = sst(1.5, 2.7, e), sn = sst(snowB(lat), snowB(lat) + 0.5, e), beach = sst(0.58, 0.5, land) * (1 - mnt);
        const alp = mnt * (1 - sst(0.5, 1.6, e)) * 0.75;   // encostas baixas das montanhas com pasto e mata
        for (let q = 0; q < 3; q++) {
          c[q] = c[q] + ([0.3, 0.42, 0.2][q] - c[q]) * alp;
          c[q] = c[q] + ([0.46, 0.43, 0.39][q] - c[q]) * rock;
          c[q] = c[q] + ([0.8, 0.74, 0.58][q] - c[q]) * beach;
          c[q] = c[q] + ([0.46, 0.44, 0.41][q] - c[q]) * urb * 0.8;
          c[q] = c[q] + ([0.94, 0.95, 0.97][q] - c[q]) * sn;
        }
      }
      col.set(c, k * 3);
    }
    const idx = new (cnt > 65535 ? Uint32Array : Uint16Array)(n * n * 6); let t = 0;
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const a = j * N1 + i, b = a + 1, cc = a + N1, d = cc + 1; idx[t++] = a; idx[t++] = b; idx[t++] = cc; idx[t++] = b; idx[t++] = d; idx[t++] = cc; }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); g.setAttribute('aH', new THREE.BufferAttribute(aH, 1));
    g.setIndex(new THREE.BufferAttribute(idx, 1)); g.computeVertexNormals(); g.computeBoundingSphere();
    // a face precisa apontar para fora: confere com a normal do meio
    tileMesh.geometry.dispose(); tileMesh.geometry = g; tileMesh.position.copy(O);
    tileMat.userData.u.uO.value.copy(O); tileMat.userData.u.uG.value = isG() ? 1 : 0;
    S.g = { lo0, lo1, la0, la1, n, h: hg, fw, lw, lon0, lat0, Rkm, O, cities, style: mapStyle };
    S.raw = true; buildCities(cities); buildTrees(); S.raw = false; buildLines();
    // orientação dos triângulos: se a normal saiu para dentro, inverte os índices
    const nr = g.attributes.normal, mid = ((n / 2) | 0) * N1 + ((n / 2) | 0), up = new V3(), no = new V3(), ea = new V3();
    frame(lon0, lat0, up, no, ea);
    if (nr.getX(mid) * up.x + nr.getY(mid) * up.y + nr.getZ(mid) * up.z < 0) { for (let q = 0; q < idx.length; q += 3) { const s = idx[q + 1]; idx[q + 1] = idx[q + 2]; idx[q + 2] = s; } g.index.needsUpdate = true; g.computeVertexNormals(); }
  }
  function rawH(lon, lat) {
    const G = S.g; if (!G) return 0;
    while (lon < G.lo0 - 180) lon += 360; while (lon > G.lo0 + 180) lon -= 360;
    const u = (lon - G.lo0) / (G.lo1 - G.lo0), w = (lat - G.la0) / (G.la1 - G.la0);
    if (u < 0.02 || u > 0.98 || w < 0.02 || w > 0.98) return 0;
    const n = G.n, x = u * n, y = w * n, i = Math.min(n - 1, x | 0), j = Math.min(n - 1, y | 0), fx = x - i, fy = y - j, k = j * (n + 1) + i, N1 = n + 1;
    return Math.max(0, (G.h[k] * (1 - fx) + G.h[k + 1] * fx) * (1 - fy) + (G.h[k + N1] * (1 - fx) + G.h[k + N1 + 1] * fx) * fy);
  }
  const hAt = (lon, lat) => rawH(lon, lat) * S.uH;
  function fieldAt(arr, lon, lat) {
    const G = S.g, u = (lon - G.lo0) / (G.lo1 - G.lo0), w = (lat - G.la0) / (G.la1 - G.la0);
    if (u < 0 || u > 1 || w < 0 || w > 1) return 0;
    return arr[Math.round(w * G.n) * (G.n + 1) + Math.round(u * G.n)];
  }

  const _m = new THREE.Matrix4(), _up = new V3(), _no = new V3(), _ea = new V3(), _f = new V3(), _x = new V3(), _p = new V3(), _c = new THREE.Color();
  // matriz de um objeto em pé no terreno: rumo hd (0 = norte, horário), escala s, altura extra lift
  function place(m, i, lon, lat, hd, sx, sy, sz, lift) {
    frame(lon, lat, _up, _no, _ea);
    _f.copy(_no).multiplyScalar(Math.cos(hd)).addScaledVector(_ea, Math.sin(hd));
    _x.crossVectors(_up, _f);
    surf(lon, lat, (S.raw ? rawH(lon, lat) : hAt(lon, lat)) + (lift || 0), _p);
    _m.makeBasis(_x.multiplyScalar(sx), _up.multiplyScalar(sy), _f.multiplyScalar(sz)); _m.setPosition(_p);
    m.setMatrixAt(i, _m);
  }
  function offLL(lon, lat, hd, ox, oz) {   // deslocamento local (km) → lon/lat
    const e = Math.cos(hd) * -ox + Math.sin(hd) * oz, nn = Math.cos(hd) * oz + Math.sin(hd) * ox;
    return [lon + e / (111 * Math.max(0.2, Math.cos(lat * D2R))), lat + nn / 111];
  }

  function buildCities(cities) {
    let n = 0; const ku = KU(), lim = houses.instanceMatrix.count;
    cities.sort((a, b) => b.cap - a.cap);
    for (const ct of cities) {
      const rnd = rng(ct.p.id + 7), N = (ct.cap ? 110 : 45) * (S.alt > 400 ? 0.5 : 1) | 0, north = Math.abs(ct.lat) > 47;
      for (let q = 0; q < N && n < lim; q++) {
        const a = rnd() * Math.PI * 2, rr = ct.r * Math.pow(rnd(), 0.75), [lo, la] = offLL(ct.lon, ct.lat, 0, Math.cos(a) * rr, Math.sin(a) * rr);
        const core = 1 - rr / ct.r, tower = ct.cap && q < 5;
        const w = (0.35 + rnd() * 0.45) / ku, d = (0.35 + rnd() * 0.5) / ku, hh = (tower ? 1.6 + rnd() * 1.2 : 0.22 + rnd() * 0.3 + core * 0.55 * rnd()) / ku;
        const hd = rnd() * 0.5 + (q % 2) * Math.PI / 2;
        place(houses, n, lo, la, hd, tower ? w * 0.6 : w, hh, tower ? w * 0.6 : d, -0.02 / ku);
        _c.setRGB(0.74 + rnd() * 0.12, 0.7 + rnd() * 0.1, 0.62 + rnd() * 0.08); houses.setColorAt(n, _c);
        _m.identity(); place(roofs, n, lo, la, hd, (tower ? w * 0.6 : w) * 1.02, (tower ? 0.7 : 0.18 + rnd() * 0.1) / ku, (tower ? w * 0.6 : d) * 1.02, hh - 0.02 / ku);
        if (tower) _c.setRGB(0.32, 0.45, 0.4); else if (north) _c.setRGB(0.3 + rnd() * 0.08, 0.31, 0.34); else _c.setRGB(0.55 + rnd() * 0.12, 0.26, 0.17);
        roofs.setColorAt(n, _c); n++;
      }
    }
    houses.count = roofs.count = n;
    for (const m of [houses, roofs]) { m.instanceMatrix.needsUpdate = true; m.instanceColor.needsUpdate = true; }
  }
  function buildTrees() {
    const G = S.g, ku = KU(), lim = low() ? 1500 : 4000, rad = Math.min(G.Rkm * 0.85, Math.max(60, S.alt * 4)), sc = Math.max(0.6, Math.min(3, S.alt / 50));
    const rnd = rng(Math.round(G.lon0 * 7 + G.lat0 * 13)); let n = 0, tries = 0;
    while (n < lim && tries++ < lim * 3) {
      const a = rnd() * Math.PI * 2, rr = rad * Math.sqrt(rnd()), [cx, cy] = offLL(G.lon0, G.lat0, 0, Math.cos(a) * rr, Math.sin(a) * rr);
      const fo = fieldAt(G.fw, cx, cy), la = fieldAt(G.lw, cx, cy);
      if (la < 0.62 || rnd() > fo * 1.2) continue;
      const k = 6 + (rnd() * 10 | 0);
      for (let q = 0; q < k && n < lim; q++) {
        const [lo, lt] = offLL(cx, cy, 0, (rnd() - 0.5) * 6 * sc, (rnd() - 0.5) * 6 * sc);
        if (fieldAt(G.lw, lo, lt) < 0.6) continue;
        const s = (0.12 + rnd() * 0.1) * sc / ku, hs = s * (0.9 + rnd() * 0.5);
        place(trees, n, lo, lt, rnd() * 6, s, hs, s, -0.01 / ku);
        const dark = Math.abs(lt) > 50 ? 0.75 : 1;
        _c.setRGB((0.2 + rnd() * 0.08) * dark, (0.36 + rnd() * 0.1) * dark, (0.14 + rnd() * 0.05) * dark); trees.setColorAt(n, _c); n++;
      }
    }
    trees.count = n; trees.instanceMatrix.needsUpdate = true; trees.instanceColor.needsUpdate = true;
  }
  function buildLines() {
    while (lines.children.length) { const o = lines.children.pop(); o.geometry.dispose(); o.material.dispose(); }
    const G = S.g; if (!G) return;
    const O = G.O, step = Math.max(0.02, (G.la1 - G.la0) / G.n * 1.2), lift = Math.max(0.003, S.alt / KU() * 0.004);
    const sets = { nat: [], prov: [], front: [] }, a = new V3(), b = new V3();
    const inT = (q) => { let L = q[0]; while (L < G.lo0) L += 360; while (L > G.lo1) L -= 360; return L >= G.lo0 && L <= G.lo1 && q[1] >= G.la0 && q[1] <= G.la1; };
    for (const arc of WG.arcs) {
      const [l, r] = arc.side; if (l < 0 || r < 0) continue;
      if (!arc.some(inT)) continue;
      const cl = W ? W.ctrl[l] : WG.provs[l].tag, cr = W ? W.ctrl[r] : WG.provs[r].tag;
      const set = W && atWar(cl, cr) && (cl === W.player || cr === W.player) ? sets.front : cl !== cr ? sets.nat : sets.prov;
      for (let i = 0; i < arc.length - 1; i++) {
        const p = arc[i], q = arc[i + 1], segs = Math.max(1, Math.ceil(Math.hypot(q[0] - p[0], q[1] - p[1]) / step));
        for (let s = 0; s < segs; s++) {
          const t0 = s / segs, t1 = (s + 1) / segs, x0 = p[0] + (q[0] - p[0]) * t0, y0 = p[1] + (q[1] - p[1]) * t0, x1 = p[0] + (q[0] - p[0]) * t1, y1 = p[1] + (q[1] - p[1]) * t1;
          surf(x0, y0, rawH(x0, y0) + lift, a).sub(O); surf(x1, y1, rawH(x1, y1) + lift, b).sub(O);
          set.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }
    }
    for (const [k, col, op] of [['prov', 0x1c1c18, 0.3], ['nat', 0x101010, 0.85], ['front', 0xff3020, 0.95]]) {
      if (!sets[k].length) continue;
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(sets[k], 3));
      const L = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op })); L.position.copy(O); lines.add(L);
    }
  }

  /* ---------- câmera (chamada pelo updWorldCamera) ---------- */
  const _F = new V3();
  function camera(c) {
    c.aspect = window.innerWidth / window.innerHeight;
    if (isG()) { WV.dist = Math.max(GR + 0.32, Math.min(GR * 4.2, WV.dist)); WV.lat = Math.max(-70, Math.min(80, WV.lat)); }
    else { WV.fh = Math.max(0.22, Math.min(260, WV.fh)); WV.fx = Math.max(-180, Math.min(180, WV.fx)); WV.fz = Math.max(LATB, Math.min(LATT, WV.fz)); }
    const alt = S.alt = altKm(), [lon, lat] = focusLL();
    S.tk = sst(0, 1, (Math.log(1500) - Math.log(alt)) / (Math.log(1500) - Math.log(25)));
    S.blend = 1 - sst(ALT_ON * 0.5, ALT_ON, alt);
    S.fgH += (hAt(lon, lat) - S.fgH) * 0.12;
    frame(lon, lat, _up, _no, _ea);
    const D = alt / KU();
    surf(lon, lat, S.fgH, _F);
    if (isG()) {
      const t = 1.25 * S.tk;
      c.position.copy(_F).addScaledVector(_up, Math.cos(t) * D).addScaledVector(_no, -Math.sin(t) * D);
      c.up.copy(_no).multiplyScalar(Math.cos(t)).addScaledVector(_up, Math.sin(t));
    } else {
      const pitch = 0.95 + (WV.fh / 260) * 0.45 - 0.6 * S.tk;
      c.position.set(_F.x, _F.y + WV.fh, _F.z + WV.fh / Math.tan(pitch)); c.up.set(0, 1, 0);
    }
    // nunca entra na montanha
    if (S.g && S.uH > 0) {
      const [cl, ca] = toLL(c.position), gh = hAt(cl, ca) + 0.09;
      if (isG()) { const r = c.position.length(); if (r < GR + gh) c.position.multiplyScalar((GR + gh) / r); }
      else if (c.position.y < gh) c.position.y = gh;
    }
    c.lookAt(_F);
    c.near = Math.max(0.004, D * 0.02); c.far = D > 12 ? 4000 : Math.max(60, D * 90);
    c.updateProjectionMatrix();
  }

  /* ---------- divisões em miniatura ---------- */
  const disp = new Map();   // id → { lon, lat, hd }
  function target(d) {
    const A = WG.provs[d.prov]; let B = null, t = 0;
    if (d.naval) { B = WG.provs[d.naval.to]; t = Math.min(1, d.naval.t / Math.max(0.01, d.naval.days)); }
    else if (d.path.length) { B = WG.provs[d.path[0]]; t = d.battle ? Math.min(d.prog, 0.68) : d.prog; }
    if (!B) return [A.lon, A.lat, null];
    const dl = ((B.lon - A.lon + 540) % 360) - 180;
    return [A.lon + dl * t, A.lat + (B.lat - A.lat) * t, Math.atan2(dl * Math.cos(A.lat * D2R), B.lat - A.lat)];
  }
  function units(dt) {
    for (const k in UM) UM[k].count = 0;
    const on = W && S.alt < ALT_UNITS && S.g && S.uH > 0.5;
    S.units = on; WV.figRoot.visible = !on;
    if (!on) return;
    const G = S.g, ku = KU(), [flon, flat] = focusLL();
    const US = Math.max(0.2, Math.min(9, S.alt * 0.03)) / 6 / ku;   // unidades por metro de miniatura
    const kk = 1 - Math.exp(-dt * 5), seen = new Set(), cnt = {};
    const put = (k, lon, lat, hd, s, col) => { const m = UM[k], i = m.count; if (i >= m.instanceMatrix.count) return; place(m, i, lon, lat, hd, s, s, s, 0); m.setColorAt(i, col); m.count++; };
    const byProv = new Map();
    for (const d of W.divs) {
      if (d.dead) continue;
      const k = d.prov + ':' + d.tag; let a = byProv.get(k); if (!a) byProv.set(k, a = []); a.push(d);
    }
    const tagIdx = new Map();
    for (const [k, list] of byProv) {
      const pr = WG.provs[list[0].prov];
      let dl = Math.abs(((pr.lon - flon + 540) % 360) - 180) * Math.cos(flat * D2R), dd = Math.abs(pr.lat - flat);
      if (Math.hypot(dl, dd) * 111 > Math.min(G.Rkm * 1.1, S.alt * 7)) continue;
      const ti = (tagIdx.get(pr.id) || 0); tagIdx.set(pr.id, ti + 1);
      list.slice(0, 5).forEach((d, i) => {
        seen.add(d.id);
        let [tl, ta, th] = target(d), o = disp.get(d.id);
        if (th === null) { const b = d.battle && W.battles.find(x => x.id === d.battle); th = o ? o.hd : (d.id * 2.4) % 6.28; if (b && b.att.length) { const a = divById(b.att[0]); if (a && a.tag !== d.tag) { const P = WG.provs[a.prov]; th = Math.atan2((P.lon - tl) * Math.cos(ta * D2R), P.lat - ta); } } }
        if (!o || Math.abs(o.lon - tl) > 4 || Math.abs(o.lat - ta) > 4) disp.set(d.id, o = { lon: tl, lat: ta, hd: th });
        o.lon += (tl - o.lon) * kk; o.lat += (ta - o.lat) * kk;
        let dh = ((th - o.hd + Math.PI * 3) % (Math.PI * 2)) - Math.PI; o.hd += dh * kk;
        // posição da divisão dentro da pilha
        const sp = 46 * US * ku, side = (i - (Math.min(5, list.length) - 1) / 2) * sp * 1.15, back = ti * sp * 1.4;
        const [cx, cy] = offLL(o.lon, o.lat, o.hd, side, -back), pc = paint(d.tag), hd = o.hd, km = US * ku;
        o.x = cx; o.y = cy;
        const at = (ox, oz) => offLL(cx, cy, hd, ox * km, oz * km);
        if (d.naval) { const [a, b] = at(0, 0); put('ship', a, b, hd, US * 0.55, _c.setRGB(1, 1, 1)); }
        else if (d.type === 'tank') {
          const tk = tankCls(d.tag);
          for (const [ox, oz] of [[0, 9], [-11, -2], [11, -2]]) { const [a, b] = at(ox, oz); put(tk, a, b, hd, US, pc.veh); }
          const [a, b] = at(0, -15); put('truck', a, b, hd, US, pc.veh);
        } else if (d.type === 'mot') {
          for (const [ox, oz, k] of [[0, 10, 'half'], [-6, -2, 'truck'], [6, -2, 'truck']]) { const [a, b] = at(ox, oz); put(k, a, b, hd, US, pc.veh); }
          for (let q = 0; q < 3; q++) { const [a, b] = at((q - 1) * 4, -12); put('man', a, b, hd, US * 2.4, pc.man); }
        } else {
          const rows = S.alt > 120 ? 2 : 3; for (let r = 0; r < rows; r++) for (let q = 0; q < 3; q++) { const [a, b] = at((q - 1) * 4.6 + (r % 2) * 0.8, 9 - r * 5); put('man', a, b, hd, US * 2.4, pc.man); }
          const [a, b] = at(0, -10); put('truck', a, b, hd, US, pc.veh);
        }
        { const [a, b] = at(0, -1); const m = UM.ring, j = m.count; if (j < m.instanceMatrix.count) { const r = 21 * US; place(m, j, a, b, 0, r, r, r, 0.4 * US); m.setColorAt(j, pc.nat); m.count++; } }
        cnt[d.tag] = 1;
      });
    }
    for (const id of disp.keys()) if (!seen.has(id)) disp.delete(id);
    for (const k in UM) { const m = UM[k]; m.instanceMatrix.needsUpdate = true; m.instanceColor.needsUpdate = true; }
    battles(dt, US);
  }
  const _v = new V3(), _w = new V3();
  function battles(dt, US) {
    const ku = US * KU();
    for (const b of W.battles) {
      const A = b.att.map(divById).filter(d => d && disp.has(d.id)), D = b.def.map(divById).filter(d => d && disp.has(d.id));
      if (!A.length && !D.length) continue;
      const rate = 10 * dt;
      for (const [L, E] of [[A, D], [D, A]]) {
        if (!L.length) continue;
        let n = rate * L.length; while (n > 0) {
          if (Math.random() > n) break; n -= 1;
          const s = disp.get(L[(Math.random() * L.length) | 0].id), [lo, la] = offLL(s.x, s.y, s.hd, (Math.random() - 0.5) * 30 * ku, (Math.random() * 14) * ku);
          surf(lo, la, hAt(lo, la) + 2.5 * US, _v); frame(lo, la, _up, _no, _ea);
          spawn(fire, _v, _w.set(0, 0, 0), 3 * US, [1, 0.8, 0.4], 0.09 + Math.random() * 0.06);
          if (E.length && Math.random() < 0.45) {
            const t = disp.get(E[(Math.random() * E.length) | 0].id), [lx, ly] = offLL(t.x, t.y, t.hd, (Math.random() - 0.5) * 40 * ku, (Math.random() - 0.5) * 30 * ku);
            surf(lx, ly, hAt(lx, ly) + 2 * US, _v); frame(lx, ly, _up, _no, _ea);
            spawn(fire, _v, _w.copy(_up).multiplyScalar(3 * US), 7 * US, [1, 0.5, 0.18], 0.3 + Math.random() * 0.2);
            if (Math.random() < 0.5) spawn(smoke, _v, _w.copy(_up).multiplyScalar(4 * US).addScaledVector(_ea, 1.5 * US), 4.5 * US, Math.random() < 0.5 ? [0.32, 0.3, 0.28] : [0.5, 0.48, 0.44], 2.2 + Math.random() * 1.6);
          }
        }
      }
    }
  }

  /* ---------- nomes das cidades ---------- */
  const lab = new Map();
  function updLabels() {
    const show = S.g && S.uH > 0.6 && S.alt < 700 && !$('whud').hidden;
    labels.style.display = show ? '' : 'none'; if (!show) return;
    const [flon, flat] = focusLL(), Wd = window.innerWidth, Hd = window.innerHeight, used = new Set();
    const list = S.g.cities.map(c => ({ c, d: Math.hypot((c.lon - flon) * Math.cos(flat * D2R), c.lat - flat) })).sort((a, b) => b.c.cap - a.c.cap || a.d - b.d).slice(0, 28);
    for (const { c } of list) {
      surf(c.lon, c.lat, hAt(c.lon, c.lat) + (c.cap ? 2.6 : 1.2) / KU(), _v);
      const camD = _v.distanceTo(WV.cam.position); _v.project(WV.cam);
      if (_v.z > 1 || _v.x < -1.1 || _v.x > 1.1 || _v.y < -1.1 || _v.y > 1.1 || camD > S.g.Rkm / KU() * 0.9) continue;
      let el = lab.get(c.p.id);
      if (!el) { el = document.createElement('div'); el.style.cssText = 'position:absolute;left:0;top:0;white-space:nowrap;will-change:transform'; el.textContent = (c.cap ? '★ ' : '') + c.p.name; if (c.cap) el.style.fontSize = '14px'; labels.appendChild(el); lab.set(c.p.id, el); }
      used.add(c.p.id); el.style.display = '';
      el.style.transform = 'translate(' + ((_v.x + 1) / 2 * Wd) + 'px,' + ((1 - _v.y) / 2 * Hd) + 'px) translate(-50%,-100%)';
    }
    for (const [id, el] of lab) if (!used.has(id)) el.style.display = 'none';
  }

  /* ---------- quadro ---------- */
  const SPACE = new THREE.Color(0x05080c), TABLE = new THREE.Color(0x1b1712), SKY = new THREE.Color(0x9db6c8);
  function update(dt) {
    if (!WV.scene || !mapTex) return;
    init(); S.t += dt;
    const alt = S.alt, b = S.blend, [lon, lat] = focusLL();
    S.uH = sst(ALT_ON, ALT_ON * 0.6, alt);
    // céu, névoa e luz acompanham a descida
    const sky = sst(500, 60, alt);
    WV.scene.background.copy(isG() ? SPACE : TABLE).lerp(SKY, sky);
    if (WV.stars) WV.stars.visible = isG() && sky < 0.3;
    if (isG()) WV.globe.scale.setScalar(1 - 0.004 * b); else WV.flat.position.y = -0.4 * b;
    frame(lon, lat, _up, _no, _ea);
    if (sun) { _v.copy(_up).multiplyScalar(0.55).addScaledVector(_ea, 0.62).addScaledVector(_no, -0.4).normalize().multiplyScalar(300); sun.position.copy(sun0).lerp(_v, b); }
    if (hemi) { hemi.position.set(0, 1, 0).lerp(_up, b); hemi.intensity = 0.75 - 0.2 * b; }
    if (sun) sun.intensity = 0.75 + 0.2 * b;
    if (b <= 0) { tileMesh.visible = lines.visible = false; houses.count = roofs.count = trees.count = 0; WV.scene.fog.near = 1e5; WV.scene.fog.far = 2e5; units(dt); stepFx(fire, dt, false); stepFx(smoke, dt, true); updLabels(); return; }
    // reconstrói o pedaço de terreno quando a câmera anda ou o zoom muda bastante
    const Rk = needR(alt), G = S.g;
    let need = !G || G.style !== mapStyle;
    if (!need) { const dk = Math.hypot((((lon - G.lon0 + 540) % 360) - 180) * 111 * Math.cos(lat * D2R), (lat - G.lat0) * 111); need = dk > G.Rkm * 0.22 || Rk / G.Rkm > 1.45 || Rk / G.Rkm < 0.62; }
    const busy = typeof wPtr !== 'undefined' && wPtr.size >= 2;
    if (need && S.t - S.lastBuild > (busy ? 0.6 : 0.25)) { S.lastBuild = S.t; build(lon, lat, Rk); S.linesT = 0; }
    if (!S.g) return;
    S.linesT += dt; if (S.linesT > 2.5) { S.linesT = 0; buildLines(); }
    tileMesh.visible = lines.visible = true;
    tileMat.userData.u.uMix.value = (1 - 0.84 * sst(ALT_ON, ALT_ON * 0.5, alt)) * (1 - 0.75 * sst(300, 60, alt));   // de perto a cor política some e ficam as linhas de fronteira
    tileMat.userData.u.uH.value = S.uH;
    lines.visible = S.uH > 0.92;
    const showC = S.uH > 0.92; houses.visible = roofs.visible = showC; trees.visible = showC && alt < 160;
    // névoa esconde a borda do pedaço
    const camR = Math.hypot(S.g.Rkm, alt) / KU(), ff = camR * 0.93;
    WV.scene.fog.color.copy(WV.scene.background);
    WV.scene.fog.far = ff + (1 - b) * 1e5; WV.scene.fog.near = ff * 0.42 + (1 - b) * 1e5;
    units(dt); stepFx(fire, dt, false); stepFx(smoke, dt, true);
    updLabels();
  }

  // pontos de ancoragem para os contadores HTML quando o zoom 3D está ligado
  function anchor(st) {
    if (!S.units) return null;
    const o = st.divs.map(d => disp.get(d.id)).find(Boolean); if (!o) return null;
    const US = Math.max(0.2, Math.min(9, S.alt * 0.03)) / 6 / KU();
    return surf(o.x, o.y, hAt(o.x, o.y) + 16 * US);
  }
  function anchorProv(id) { if (!S.units) return null; const p = WG.provs[id]; return surf(p.lon, p.lat, hAt(p.lon, p.lat) + Math.max(0.2, S.alt * 0.03) / 6 / KU() * 30); }
  function ground(lon, lat, lift) { return surf(lon, lat, hAt(lon, lat) + Math.max(0.003, S.alt / KU() * 0.006) + lift * 0.004 * (S.alt / KU())); }
  function pick(ray) {
    if (!tileMesh || !tileMesh.visible || S.uH < 0.5) return null;
    const h = ray.intersectObject(tileMesh, false)[0]; if (!h) return null;
    const [lon, lat] = toLL(h.point); return { lon: ((lon + 540) % 360) - 180, lat };
  }
  const on = () => S.blend > 0.5 && !!S.g;
  return { update, camera, anchor, anchorProv, ground, pick, on, hAt, altKm, state: S, surf, fx: () => [fire, smoke, lines, tileMat] };
})();
