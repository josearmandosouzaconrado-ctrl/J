'use strict';
// Soldados (modelo, animação, detecção de acertos), inteligência artificial e ninho de metralhadora.
(function () {
  const W = WW1.world;
  const actors = WW1.actors = [];   // tudo que tem vida: soldados e jogador
  const soldiers = WW1.soldiers = [];
  let scene, mat, geos = {};
  const V = THREE.Vector3;
  const tmpV = new V(), tmpA = new V(), tmpB = new V();
  const DEG = Math.PI / 180;

  // ---------- Modelos (geometrias com cores por vértice, compartilhadas) ----------
  const V3 = (x, y, z) => ({ x, y, z });
  const tint = (c, k) => [c[0] * k, c[1] * k, c[2] * k];

  // Capacetes feitos por revolução de perfil (formato real)
  function lathe(points, segs) {
    return new THREE.LatheGeometry(points.map(p => new THREE.Vector2(p[0], p[1])), segs || 14);
  }
  const HELMETS = {
    brodie: () => lathe([[0, 0.105], [0.05, 0.1], [0.1, 0.082], [0.13, 0.05], [0.145, 0.018], [0.15, 0.004], [0.2, -0.004], [0.207, -0.012], [0.19, -0.016], [0.14, -0.006], [0, -0.006]]),
    stahl: () => lathe([[0, 0.125], [0.06, 0.12], [0.11, 0.095], [0.14, 0.055], [0.15, 0.0], [0.152, -0.04], [0.168, -0.085], [0.18, -0.098], [0.17, -0.1], [0.14, -0.06], [0, -0.06]]),
    pickel: () => lathe([[0, 0.12], [0.07, 0.11], [0.12, 0.075], [0.14, 0.03], [0.142, -0.03], [0.15, -0.045], [0.12, -0.04], [0, -0.04]]),
  };

  // variant: { team, k (tom), mustache, hat: 'brodie'|'stahl'|'pickel'|'cap', officer }
  function buildGeos(v) {
    const brit = v.team === 'allies';
    const k = v.k || 1;
    const tunic = tint(brit ? [0.47, 0.41, 0.27] : [0.44, 0.46, 0.41], k);
    const trousers = tint(brit ? [0.45, 0.39, 0.26] : [0.38, 0.39, 0.36], k);
    const putt = tint(brit ? [0.38, 0.33, 0.22] : [0.38, 0.39, 0.36], k);
    const helmet = brit ? [0.36, 0.37, 0.27] : [0.33, 0.36, 0.33];
    const web = brit ? [0.6, 0.55, 0.4] : [0.27, 0.19, 0.12];
    const leather = [0.33, 0.21, 0.12], boot = brit ? [0.2, 0.13, 0.08] : [0.1, 0.085, 0.07];
    const skin = tint([0.8, 0.61, 0.5], 0.92 + (v.k || 1) * 0.08), hair = [0.22, 0.15, 0.1], dark = [0.06, 0.05, 0.05];
    const wood = [0.45, 0.31, 0.19], steel = [0.24, 0.25, 0.26], brass = [0.6, 0.48, 0.2];
    const P = WW1.prim, trs = WW1.trs;
    if (v.officer) { tunic[0] *= 1.05; tunic[1] *= 1.03; }

    // ---- coxa (da cintura ao joelho) ----
    const thigh = new WW1.GeoBuilder(true);
    thigh.ball(0, -0.02, 0, 0.095, 0.08, 0.095, trousers);
    thigh.seg(V3(0, 0, 0), V3(0, -0.44, 0.01), 0.098, 0.074, trousers, 10);
    thigh.ball(0, -0.2, 0.0, 0.1, 0.09, 0.09, trousers); // culote mais largo
    // ---- canela + bota ----
    const shin = new WW1.GeoBuilder(true);
    shin.ball(0, 0, 0.005, 0.074, 0.074, 0.074, trousers); // joelho
    if (brit) {
      shin.seg(V3(0, 0, 0), V3(0, -0.12, 0), 0.07, 0.066, trousers, 10);
      shin.seg(V3(0, -0.11, 0), V3(0, -0.4, -0.005), 0.068, 0.055, putt, 10); // perneiras enroladas
      for (let i = 0; i < 6; i++) shin.seg(V3(0, -0.14 - i * 0.045, 0), V3(0, -0.15 - i * 0.045, 0), 0.07 - i * 0.002, 0.069 - i * 0.002, tint(putt, 0.85), 10);
      shin.seg(V3(0, -0.39, 0), V3(0, -0.46, 0), 0.058, 0.06, boot, 10);
    } else {
      shin.seg(V3(0, 0, 0), V3(0, -0.06, 0), 0.07, 0.068, trousers, 10);
      shin.seg(V3(0, -0.05, 0), V3(0, -0.46, 0), 0.074, 0.062, boot, 10);   // bota alta de cano
    }
    shin.box(0, -0.475, 0.045, 0.105, 0.07, 0.25, null, boot);  // pé
    shin.box(0, -0.505, 0.04, 0.11, 0.02, 0.26, null, dark);     // sola

    // ---- tronco, braços, cabeça e equipamento ----
    const u = new WW1.GeoBuilder(true);
    // quadril e túnica
    u.add(new THREE.CylinderGeometry(0.17, 0.165, 0.2, 12), trs(0, 0.02, 0, null, 1, 1, 0.68), trousers);
    u.add(new THREE.CylinderGeometry(0.205, 0.172, 0.5, 12), trs(0, 0.36, 0.005, null, 1, 1, 0.64), tunic);
    u.add(new THREE.CylinderGeometry(0.19, 0.205, 0.17, 12), trs(0, 0.04, 0, null, 1, 1, 0.7), tunic); // aba da túnica
    u.add(new THREE.SphereGeometry(0.205, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), trs(0, 0.6, 0.005, null, 1, 0.38, 0.64), tunic); // ombros
    u.add(new THREE.CylinderGeometry(0.06, 0.07, 0.06, 10), trs(0, 0.66, 0.0, null, 1), tunic); // gola
    u.box(0.09, 0.47, 0.125, 0.09, 0.09, 0.012, null, tint(tunic, 0.9));  // bolsos do peito
    u.box(-0.09, 0.47, 0.125, 0.09, 0.09, 0.012, null, tint(tunic, 0.9));
    u.box(0.09, 0.515, 0.13, 0.095, 0.03, 0.014, null, tint(tunic, 0.82));
    u.box(-0.09, 0.515, 0.13, 0.095, 0.03, 0.014, null, tint(tunic, 0.82));
    for (let i = 0; i < 4; i++) u.ball(0, 0.57 - i * 0.1, 0.13, 0.009, 0.009, 0.006, brass);
    // cinto e equipamento
    u.add(new THREE.CylinderGeometry(0.19, 0.19, 0.055, 12), trs(0, 0.13, 0, null, 1, 1, 0.68), v.officer ? leather : web);
    if (v.officer) {
      u.box(0, 0.38, 0.0, 0.035, 0.6, 0.3, [0, 0, 32], leather);                // cinto Sam Browne
      u.box(0.19, 0.08, 0.04, 0.06, 0.14, 0.1, null, leather);                  // coldre
    } else {
      u.box(0.06, 0.38, 0.0, 0.045, 0.62, 0.285, [0, 0, 26], web);              // suspensórios cruzados
      u.box(-0.06, 0.38, 0.0, 0.045, 0.62, 0.285, [0, 0, -26], web);
      for (const sx of [-1, 1]) for (let i = 0; i < (brit ? 3 : 2); i++)        // cartucheiras
        u.box(sx * (0.06 + i * 0.045), 0.2, 0.125, 0.042, brit ? 0.1 : 0.075, 0.05, null, brit ? web : leather);
      u.box(0, 0.4, -0.17, 0.3, 0.3, 0.12, null, brit ? web : [0.42, 0.35, 0.25]); // mochila
      u.add(P.cylHi(), trs(-0.19, 0.06, -0.06, [0, 0, 90], 0.11, 0.06, 0.11), brit ? [0.3, 0.33, 0.3] : [0.3, 0.27, 0.2]); // cantil
      u.box(0.19, 0.05, -0.06, 0.06, 0.16, 0.16, null, brit ? web : leather);   // embornal
      u.seg(V3(0.05, 0.3, -0.24), V3(0.0, -0.05, -0.2), 0.012, 0.012, wood);    // cabo da pá
      if (!brit) u.add(P.cyl(), trs(-0.12, 0.13, 0.12, [0, 0, 0], 0.03, 0.12, 0.03), steel); // granada de cabo no cinto
    }
    // cabeça
    u.add(P.cyl(), trs(0, 0.69, 0, null, 0.1, 0.09, 0.1), skin);
    u.ball(0, 0.79, 0.005, 0.095, 0.112, 0.102, skin);
    u.ball(0, 0.735, 0.04, 0.072, 0.05, 0.07, skin);       // queixo
    u.box(0, 0.79, 0.1, 0.028, 0.05, 0.035, [12, 0, 0], tint(skin, 0.95)); // nariz
    u.ball(0.096, 0.79, 0, 0.018, 0.028, 0.012, tint(skin, 0.92));
    u.ball(-0.096, 0.79, 0, 0.018, 0.028, 0.012, tint(skin, 0.92));
    u.ball(0.034, 0.81, 0.088, 0.011, 0.008, 0.006, dark);   // olhos
    u.ball(-0.034, 0.81, 0.088, 0.011, 0.008, 0.006, dark);
    u.box(0, 0.83, 0.09, 0.09, 0.008, 0.01, null, hair);    // sobrancelhas
    if (v.mustache) u.box(0, 0.755, 0.098, 0.06, 0.014, 0.012, null, hair);
    u.ball(0, 0.81, -0.03, 0.094, 0.1, 0.09, hair);         // cabelo atrás
    // chapéu / capacete
    if (v.hat === 'brodie') {
      u.add(HELMETS.brodie(), trs(0, 0.885, 0, [6, 0, 0], 1, 1, 1.06), helmet);
      u.box(0, 0.74, 0.05, 0.16, 0.008, 0.01, [0, 0, 0], leather); // jugular
    } else if (v.hat === 'stahl') {
      u.add(HELMETS.stahl(), trs(0, 0.905, -0.012, [4, 0, 0], 1, 1, 1.08), helmet);
      u.ball(0.15, 0.88, 0.0, 0.012, 0.012, 0.012, tint(helmet, 0.8));
      u.ball(-0.15, 0.88, 0.0, 0.012, 0.012, 0.012, tint(helmet, 0.8));
    } else if (v.hat === 'pickel') {
      u.add(HELMETS.pickel(), trs(0, 0.885, 0, [4, 0, 0], 1, 1, 1.1), [0.42, 0.42, 0.36]);   // capa de pano
      u.add(new THREE.ConeGeometry(0.022, 0.1, 8), trs(0, 1.05, 0.0, null, 1), [0.42, 0.42, 0.36]);
      u.box(0, 0.85, 0.135, 0.17, 0.012, 0.06, [-15, 0, 0], leather);
    } else {
      // quepe de oficial
      u.add(new THREE.CylinderGeometry(0.12, 0.105, 0.075, 14), trs(0, 0.89, -0.005, [-4, 0, 0], 1, 1, 1.08), tunic);
      u.add(new THREE.CylinderGeometry(0.125, 0.125, 0.012, 14), trs(0, 0.925, -0.005, [-4, 0, 0], 1, 1, 1.08), tint(tunic, 0.9));
      u.box(0, 0.86, 0.11, 0.14, 0.012, 0.07, [-18, 0, 0], leather);
      u.ball(0, 0.89, 0.115, 0.016, 0.016, 0.006, brass);
    }
    // braços (ombro -> cotovelo -> mão segurando o fuzil, ou baixos no oficial)
    const arm = (sh, el, ha) => {
      u.ball(sh.x, sh.y, sh.z, 0.07, 0.07, 0.07, tunic);
      u.seg(sh, el, 0.064, 0.056, tunic, 10);
      u.ball(el.x, el.y, el.z, 0.056, 0.056, 0.056, tunic);
      u.seg(el, ha, 0.055, 0.045, tunic, 10);
      u.seg(V3(el.x + (ha.x - el.x) * 0.82, el.y + (ha.y - el.y) * 0.82, el.z + (ha.z - el.z) * 0.82), ha, 0.05, 0.05, tint(tunic, 0.88), 10); // punho
      u.ball(ha.x, ha.y, ha.z, 0.045, 0.04, 0.055, skin);
    };
    if (v.officer) {
      arm(V3(0.22, 0.56, 0), V3(0.25, 0.33, 0.02), V3(0.22, 0.12, 0.08));
      arm(V3(-0.22, 0.56, 0), V3(-0.25, 0.33, 0.0), V3(-0.22, 0.12, 0.04));
      u.box(0.22, 0.09, 0.14, 0.03, 0.05, 0.12, null, dark); // pistola na mão
    } else {
      arm(V3(0.22, 0.56, 0), V3(0.25, 0.36, 0.02), V3(0.08, 0.33, 0.17));
      arm(V3(-0.22, 0.56, 0), V3(-0.17, 0.39, 0.25), V3(0.045, 0.36, 0.47));
      // fuzil (Lee-Enfield / Gewehr 98) com baioneta
      const rf = trs(0.06, 0.36, 0.22, null, 1);
      const R = (x, y, z, sx, sy, sz, col, rot) => u.add(P.box(), rf.clone().multiply(trs(x, y, z, rot || null, sx, sy, sz)), col);
      R(0, -0.04, -0.2, 0.042, 0.11, 0.3, wood, [8, 0, 0]);   // coronha
      R(0, -0.01, -0.03, 0.038, 0.06, 0.12, wood);
      R(0, 0.01, 0.07, 0.035, 0.045, 0.18, steel);             // culatra
      R(0.025, 0.02, 0.0, 0.03, 0.012, 0.012, steel);           // alavanca
      R(0, -0.035, 0.08, 0.03, 0.045, 0.07, steel);             // carregador
      R(0, 0.0, 0.38, 0.042, 0.045, 0.48, wood);                // guarda-mão
      u.add(P.cyl(), rf.clone().multiply(trs(0, 0.012, 0.68, [90, 0, 0], 0.018, 0.14, 0.018)), steel);
      R(0, -0.012, 0.93, 0.006, 0.024, 0.4, [0.5, 0.52, 0.55]); // baioneta
      R(0, 0.03, 0.62, 0.006, 0.02, 0.006, steel);
    }
    return { thigh: thigh.build(), shin: shin.build(), upper: u.build() };
  }

  const VARIANTS = {
    allies: [{ team: 'allies', hat: 'brodie', k: 1 }, { team: 'allies', hat: 'brodie', k: 0.93, mustache: true }, { team: 'allies', hat: 'brodie', k: 1.06 }],
    central: [{ team: 'central', hat: 'stahl', k: 1 }, { team: 'central', hat: 'stahl', k: 0.94, mustache: true }, { team: 'central', hat: 'pickel', k: 1.04, mustache: true }],
    alliesOfficer: [{ team: 'allies', hat: 'cap', officer: true, mustache: true, k: 1.03 }],
    centralOfficer: [{ team: 'central', hat: 'cap', officer: true, mustache: true, k: 1 }],
  };
  let variantSeed = 0;

  WW1.soldierInit = function (sc) {
    scene = sc;
    actors.length = 0; soldiers.length = 0;
    if (!mat) {
      mat = new THREE.MeshStandardMaterial({ vertexColors: true, map: WW1.tex.cloth, roughness: 0.86, metalness: 0 });
      for (const key in VARIANTS) geos[key] = VARIANTS[key].map(buildGeos);
    }
  };

  function part(geo, parent, x, y, z) {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = false;
    parent.add(m);
    return m;
  }

  class Rig {
    constructor(team, officer) {
      const list = geos[team + (officer ? 'Officer' : '')];
      const g = list[(variantSeed++) % list.length];
      this.officer = !!officer;
      this.root = new THREE.Group();
      this.hips = new THREE.Group(); this.hips.position.y = 0.95; this.root.add(this.hips);
      this.thighL = part(g.thigh, this.hips, -0.11, 0, 0);
      this.thighR = part(g.thigh, this.hips, 0.11, 0, 0);
      this.shinL = part(g.shin, this.thighL, 0, -0.46, 0);
      this.shinR = part(g.shin, this.thighR, 0, -0.46, 0);
      this.upper = part(g.upper, this.hips, 0, 0.03, 0);
      this.kneel = 0; this.kneelTarget = 0; this.phase = 0;
      scene.add(this.root);
    }
    animate(speed, dt, aimPitch) {
      this.kneel = WW1.moveTowards(this.kneel, this.kneelTarget, dt * 3.5);
      const mv = WW1.clamp01(speed / 3.5), k = this.kneel;
      if (mv > 0.01) this.phase += dt * (3 + speed * 1.9);
      const s = Math.sin(this.phase), swing = s * 34 * mv;
      const kl = Math.max(0, -s) * 55 * mv + 8 * mv, kr = Math.max(0, s) * 55 * mv + 8 * mv;
      this.thighL.rotation.x = WW1.lerp(swing, -88, k) * DEG;
      this.shinL.rotation.x = WW1.lerp(kl, 88, k) * DEG;
      this.thighR.rotation.x = WW1.lerp(-swing, 5, k) * DEG;
      this.shinR.rotation.x = WW1.lerp(kr, 85, k) * DEG;
      this.hips.position.y = 0.95 - k * 0.45 + Math.abs(Math.cos(this.phase)) * 0.05 * mv;
      this.upper.rotation.x = (12 * mv + WW1.clamp(aimPitch, -30, 30) * 0.6) * DEG;
    }
    muzzle(out) { return this.officer ? this.upper.localToWorld(out.set(0.22, 0.1, 0.22)) : this.upper.localToWorld(out.set(0.06, 0.37, 0.99)); }
    head(out) { return this.upper.localToWorld(out.set(0, 0.79, 0)); }
    dispose() { scene.remove(this.root); }
  }
  WW1.Rig = Rig;

  // ---------- Teste de raio contra cápsulas ----------
  function segSegDist(p1, d1, p2, d2) {
    // menor distância entre segmentos p1+s*d1 e p2+t*d2 (s,t em [0,1])
    const r = tmpV.subVectors(p1, p2);
    const a = d1.dot(d1), e = d2.dot(d2), f = d2.dot(r);
    let s, t;
    const c = d1.dot(r), b = d1.dot(d2), den = a * e - b * b;
    if (e < 1e-8) { t = 0; s = WW1.clamp01(-c / a); }
    else {
      s = den > 1e-8 ? WW1.clamp01((b * f - c * e) / den) : 0;
      t = (b * s + f) / e;
    }
    if (t < 0) { t = 0; s = WW1.clamp01(-c / a); } else if (t > 1) { t = 1; s = WW1.clamp01((b - c) / a); }
    const cx = p1.x + d1.x * s - (p2.x + d2.x * t), cy = p1.y + d1.y * s - (p2.y + d2.y * t), cz = p1.z + d1.z * s - (p2.z + d2.z * t);
    return { dist: Math.hypot(cx, cy, cz), s };
  }

  const ra = new V(), rb = new V(), hp = new V(), ta = new V(), tb = new V();
  // Retorna o soldado mais próximo atingido por um raio (o,d) até maxDist.
  WW1.raySoldiers = function (o, d, maxDist, filter) {
    let best = null;
    const rd = new V().copy(d).multiplyScalar(maxDist);
    for (const s of soldiers) {
      if (s.dead || (filter && !filter(s))) continue;
      const p = s.pos;
      // descarte rápido
      const px = p.x - o.x, py = p.y + 1 - o.y, pz = p.z - o.z;
      const along = px * d.x + py * d.y + pz * d.z;
      if (along < 0 || along > maxDist + 2) continue;
      const lat2 = px * px + py * py + pz * pz - along * along;
      if (lat2 > 2.5 * 2.5) continue;
      const rig = s.rig;
      rig.root.updateMatrixWorld(true);
      const tests = [];
      rig.head(hp);
      tests.push(['head', hp.clone(), new V(), 0.14]);
      rig.upper.localToWorld(ta.set(0, 0.02, 0)); rig.upper.localToWorld(tb.set(0, 0.58, 0));
      tests.push(['torso', ta.clone(), tb.clone().sub(ta), 0.22]);
      for (const [th, sh] of [[rig.thighL, rig.shinL], [rig.thighR, rig.shinR]]) {
        th.localToWorld(ta.set(0, 0, 0)); sh.localToWorld(tb.set(0, 0, 0));
        tests.push(['leg', ta.clone(), tb.clone().sub(ta), 0.1]);
        sh.localToWorld(ta.set(0, 0, 0)); sh.localToWorld(tb.set(0, -0.47, 0));
        tests.push(['leg', ta.clone(), tb.clone().sub(ta), 0.09]);
      }
      for (const [name, a, ab, r] of tests) {
        const q = segSegDist(o, rd, a, ab);
        if (q.dist < r) {
          const t = q.s * maxDist - Math.sqrt(Math.max(0, r * r - q.dist * q.dist));
          if (!best || t < best.t) best = { soldier: s, part: name, t };
        }
      }
    }
    return best;
  };

  // ---------- IA ----------
  class Soldier {
    constructor(team, role, x, y, z, yaw) {
      this.team = team; this.role = role;
      this.rig = new Rig(team, role === 'officer');
      this.pos = this.rig.root.position;
      this.pos.set(x, y, z);
      this.yaw = yaw; this.faceYaw = yaw;
      this.rig.root.rotation.y = yaw;
      this.hp = this.max = 100;
      this.dead = false;
      this.active = false; this.holdOnStep = false; this.stepY = 0;
      this.moving = false; this.dest = new V(x, 0, z); this.waypoints = [];
      this.rushes = true; this.chasePlayer = false; this.retreating = false;
      this.accuracy = team === 'allies' ? 0.12 : 0.22;
      this.damageOut = team === 'allies' ? 60 : 22;
      this.range = 115; this.runSpeed = 3.9;
      this.target = null; this.nextScan = 0; this.nextFire = WW1.time + WW1.rand(1, 4);
      this.pauseUntil = 0; this.nextRushStop = WW1.time + WW1.rand(2, 5); this.nextMelee = 0;
      this.fallT = -1; this.arrived = null; this.onDeath = null;
      actors.push(this); soldiers.push(this);
    }
    aimPoint(out) { return out.set(this.pos.x, this.pos.y + (this.rig.kneel > 0.5 ? 0.85 : 1.3), this.pos.z); }
    goTo(x, z) { this.dest.set(x, 0, z); this.moving = true; this.holdOnStep = false; }
    holdStep(y, yaw) { this.holdOnStep = true; this.stepY = y; this.moving = false; this.faceYaw = yaw; }
    damage(amount, from) {
      if (this.dead || amount <= 0) return;
      this.hp = Math.max(0, this.hp - amount);
      const a = this.aimPoint(tmpA);
      WW1.fx.blood(a.x + WW1.rand(-0.1, 0.1), a.y, a.z + WW1.rand(-0.1, 0.1));
      if (this.hp <= 0) this.die();
    }
    die() {
      this.dead = true;
      this.fallT = 0;
      this.fallDir = Math.random() < 0.5 ? -1 : 1;
      this.fallY0 = this.pos.y;
      this.fallYaw = this.yaw + WW1.rand(-0.5, 0.5);
      WW1.audio.playAt('hurt', this.pos.x, this.pos.y + 1, this.pos.z, 0.8, WW1.rand(0.8, 1.05), 3);
      if (this.onDeath) this.onDeath(this);
    }
    remove() {
      this.rig.dispose();
      const i = actors.indexOf(this); if (i >= 0) actors.splice(i, 1);
      const j = soldiers.indexOf(this); if (j >= 0) soldiers.splice(j, 1);
    }

    update(dt, playing) {
      const rig = this.rig;
      if (this.dead) {
        if (this.fallT >= 0 && this.fallT < 1) {
          this.fallT = Math.min(1, this.fallT + dt * 1.6);
          const e = this.fallT * this.fallT;
          rig.root.rotation.set(this.fallDir * 86 * DEG * e, this.fallYaw, 0, 'YXZ');
          const gy = W.S(this.pos.x, this.pos.z);
          this.pos.y = WW1.lerp(this.fallY0, gy + 0.12, e);
          rig.kneelTarget = 0;
          rig.animate(0, dt, 0);
        }
        return;
      }
      const t = WW1.time, player = WW1.game.player;
      if (t >= this.nextScan) {
        this.nextScan = t + WW1.rand(0.35, 0.75);
        this.target = this.active && playing && !this.retreating ? this.findTarget() : null;
      }
      if (this.target && this.target.dead) this.target = null;

      let speed = 0, paused = t < this.pauseUntil, mdx = 0, mdz = 0;
      if (this.chasePlayer && playing && player && !player.dead) {
        const dd = Math.hypot(player.pos.x - this.pos.x, player.pos.z - this.pos.z);
        if (dd < 30) {
          this.dest.set(player.pos.x, 0, player.pos.z);
          this.moving = true; this.holdOnStep = false;
          paused = paused && dd > 12;
        }
      }
      if (this.moving && !paused && playing) {
        const dx = this.dest.x - this.pos.x, dz = this.dest.z - this.pos.z, d = Math.hypot(dx, dz);
        const stop = this.chasePlayer ? 1.3 : 0.6;
        if (d < stop) {
          if (this.waypoints.length) { const w = this.waypoints.shift(); this.dest.set(w[0], 0, w[1]); }
          else { this.moving = this.chasePlayer; if (!this.chasePlayer && this.arrived) this.arrived(this); }
        } else {
          const spd = this.runSpeed * (W.inWire(this.pos.x, this.pos.z) ? 0.45 : 1);
          mdx = dx / d; mdz = dz / d;
          const step = Math.min(spd * dt, d);
          let px = mdx * step, pz = mdz * step;
          for (const o of soldiers) {
            if (o === this || o.dead) continue;
            const sx = this.pos.x - o.pos.x, sz = this.pos.z - o.pos.z, m = sx * sx + sz * sz;
            if (m < 1.2 && m > 1e-4) { const k = (1.2 - m) * 2.5 * dt / Math.sqrt(m); px += sx * k; pz += sz * k; }
          }
          this.pos.x += px; this.pos.z += pz;
          speed = spd;
          if (this.rushes && !this.chasePlayer && t > this.nextRushStop && this.target) {
            this.pauseUntil = t + WW1.rand(1.6, 3.4);
            this.nextRushStop = this.pauseUntil + WW1.rand(3, 6);
          }
        }
      }
      this.pos.y = this.holdOnStep ? this.stepY : W.H(this.pos.x, this.pos.z);

      let lx = 0, lz = 0;
      if (this.target && (speed < 0.1 || this.role === 'defender')) { const tp = this.target.pos; lx = tp.x - this.pos.x; lz = tp.z - this.pos.z; }
      else if (speed > 0) { lx = mdx; lz = mdz; }
      if (lx * lx + lz * lz > 1e-4) this.faceYaw = Math.atan2(lx, lz);
      this.yaw = WW1.moveAngle(this.yaw, this.faceYaw, 5.2 * dt);
      rig.root.rotation.set(0, this.yaw, 0);

      let aimPitch = 0;
      if (this.target) {
        const a = this.target.aimPoint(tmpA);
        aimPitch = -Math.atan2(a.y - (this.pos.y + 1.4), Math.hypot(a.x - this.pos.x, a.z - this.pos.z)) / DEG;
      }

      // baioneta
      if (this.target && playing && t >= this.nextMelee) {
        const tp = this.target.pos;
        if (Math.hypot(tp.x - this.pos.x, tp.z - this.pos.z) < 1.9) {
          this.nextMelee = t + 1.3;
          WW1.audio.playAt('swish', this.pos.x, this.pos.y + 1, this.pos.z, 0.9, 1, 2);
          this.target.damage(this.target.isPlayer ? 30 : 70, this.pos);
          this.nextFire = t + 1;
        }
      }
      if (this.target && playing && t >= this.nextFire && (speed < 0.1 || this.role === 'defender')) this.fire();

      const kneelRole = this.role === 'attacker' || this.role === 'ally' || this.role === 'gunner';
      rig.kneelTarget = ((speed < 0.1 && kneelRole && !this.holdOnStep) || this.role === 'gunner') ? 1 : 0;
      rig.animate(speed, dt, aimPitch);
    }

    findTarget() {
      const eyeY = this.pos.y + (this.rig.kneelTarget > 0.5 ? 1.05 : 1.55);
      const cands = [];
      for (const h of actors) {
        if (h.team === this.team || h.dead) continue;
        const d = Math.hypot(h.pos.x - this.pos.x, h.pos.z - this.pos.z);
        if (d > this.range) continue;
        cands.push([d * (h.isPlayer ? 0.8 : 1), h]);
      }
      cands.sort((a, b) => a[0] - b[0]);
      for (let i = 0; i < Math.min(3, cands.length); i++) {
        const h = cands[i][1], a = h.aimPoint(tmpA);
        if (W.los(this.pos.x, eyeY, this.pos.z, a.x, a.y, a.z)) return h;
      }
      return null;
    }

    fire() {
      const t = WW1.time;
      this.nextFire = t + WW1.rand(2.4, 4.6) * (this.team === 'allies' ? 1.2 : 1);
      this.rig.root.updateMatrixWorld(true);
      const m = this.rig.muzzle(new V());
      const aim = this.target.aimPoint(new V());
      const dist = m.distanceTo(aim);
      let chance = this.accuracy * WW1.clamp01(1.25 - dist / this.range);
      if (this.team === 'central') chance *= WW1.game.enemyAccuracy();
      if (this.target.isPlayer) chance *= this.target.exposure();
      const hit = Math.random() < chance && W.los(m.x, m.y, m.z, aim.x, aim.y, aim.z);
      shotFX(m, aim, hit, this.target, this.damageOut, dist, this.range, false);
    }
  }
  WW1.Soldier = Soldier;

  // Efeito e resultado de um tiro de IA (fuzil ou metralhadora)
  function shotFX(m, aim, hit, target, dmg, dist, range, mg) {
    let end = aim.clone();
    if (!hit) {
      const s = WW1.lerp(0.7, 2.6, dist / range);
      end.x += WW1.rand(-s, s); end.y += WW1.rand(-s * 0.6, s * 0.4); end.z += WW1.rand(-s, s);
    }
    const dir = end.clone().sub(m).normalize();
    const h = W.rayHit(m, dir, dist + 30);
    if (hit) target.damage(dmg, m);
    else if (h && h.dist < dist + 30) { WW1.fx.impact(h.x, h.y, h.z); end.set(h.x, h.y, h.z); }
    else end.copy(m).addScaledVector(dir, dist + 30);
    if (!mg || Math.random() < 0.5) WW1.fx.tracer(m, end, mg);
    WW1.fx.muzzle(m.x, m.y, m.z, dir.x, dir.y, dir.z);
    WW1.audio.playAt(mg ? 'mg' : 'rifle', m.x, m.y, m.z, 1, WW1.rand(0.92, 1.08), mg ? 8 : 6);
    if (!hit && target.isPlayer) target.nearMiss(m, end);
  }

  // ---------- Ninho de metralhadora MG 08 ----------
  class MGNest {
    constructor(x, z) {
      this.pos = new V(x, W.H(x, z), z);
      this.active = false; this.destroyed = false;
      this.yaw = Math.PI; this.nextScan = 0; this.nextShot = 0; this.burstEnd = 0; this.pauseUntil = 0;
      const bags = new WW1.GeoBuilder(false);
      for (let row = 0; row < 3; row++)
        for (let a = -110; a <= 110; a += 13) {
          const ang = (a + row * 6.5) * DEG, bx = x + Math.sin(ang) * 1.6, bz = z - Math.cos(ang) * 1.6;
          bags.add(WW1.prim.lowSph(), WW1.trs(bx, W.H(bx, bz) + 0.1 + row * 0.2, bz, [0, -a - row * 6.5 + 90, 0], 0.36, 0.24, 0.62));
        }
      scene.add(bags.mesh(W.mats.bag));
      W.stamp(x - 2, x + 2, z - 2, z + 2, (px, pz, h) => {
        const dx = px - x, dz = pz - z, r = Math.hypot(dx, dz);
        if (r < 1.35 || r > 1.9) return null;
        if (Math.atan2(dx, -dz) / DEG < -118 || Math.atan2(dx, -dz) / DEG > 118) return null;
        return h + 0.66;
      });
      const g = new WW1.GeoBuilder(false);
      g.box(0, -0.12, -0.1, 0.5, 0.06, 0.9); g.box(0, 0.05, -0.05, 0.12, 0.3, 0.12); g.box(0, 0.28, -0.1, 0.15, 0.16, 0.4);
      g.cyl({ x: 0, y: 0.29, z: 0.1 }, { x: 0, y: 0.29, z: 0.75 }, 0.055, null, true);
      g.cyl({ x: 0, y: 0.29, z: 0.75 }, { x: 0, y: 0.29, z: 0.88 }, 0.02);
      g.box(0, 0.27, -0.36, 0.14, 0.1, 0.08); g.box(0.22, 0.25, -0.1, 0.12, 0.12, 0.24);
      this.gun = g.mesh(new THREE.MeshStandardMaterial({ map: WW1.tex.metal, color: 0x6e7068, roughness: 0.5, metalness: 0.6 }));
      this.gun.matrixAutoUpdate = true;
      this.gun.position.set(x, this.pos.y + 0.42, z + 0.3);
      this.gun.rotation.set(0, this.yaw, 0, 'YXZ');
      scene.add(this.gun);
      this.gunner = new Soldier('central', 'gunner', x, W.H(x, z + 0.95), z + 0.95, Math.PI);
      this.gunner.hp = this.gunner.max = 70;
      this.gunner.rushes = false;
      this.gunner.onDeath = () => this.wreck('Atirador da metralhadora abatido!');
    }
    muzzle(out) { this.gun.updateMatrixWorld(); return this.gun.localToWorld(out.set(0, 0.29, 0.9)); }
    explosionAt(p, radius) {
      if (this.destroyed) return;
      if (Math.hypot(p.x - this.pos.x, p.y - this.pos.y, p.z - this.pos.z) < Math.max(5.5, radius * 0.75)) {
        if (!this.gunner.dead) this.gunner.damage(999, p);
        this.wreck('Ninho de metralhadora destruído!');
      }
    }
    wreck(msg) {
      if (this.destroyed) return;
      this.destroyed = true; this.active = false;
      this.gun.rotation.set(-25 * DEG, this.yaw + 0.4, 30 * DEG, 'YXZ');
      WW1.fx.plume(this.pos.x, this.pos.y + 0.5, this.pos.z, 0.35);
      WW1.ui.message(msg, 3);
    }
    update(dt, playing) {
      if (this.destroyed || !this.active || !playing) return;
      const t = WW1.time;
      const m = this.muzzle(new V());
      if (t >= this.nextScan) {
        this.nextScan = t + 0.6;
        this.target = null;
        let best = 1e9;
        for (const h of actors) {
          if (h.team !== 'allies' || h.dead) continue;
          const d = h.pos.distanceTo(this.pos);
          if (d > 170) continue;
          const score = d * (h.isPlayer ? 0.9 : 1) + Math.random() * 25;
          const a = h.aimPoint(tmpA);
          if (score < best && W.los(m.x, m.y, m.z, a.x, a.y, a.z)) { best = score; this.target = h; }
        }
      }
      const tg = this.target;
      if (!tg || tg.dead) return;
      const a = tg.aimPoint(tmpA);
      const want = Math.atan2(a.x - this.gun.position.x, a.z - this.gun.position.z) + Math.sin(t * 2.3) * 0.045;
      this.yaw = WW1.moveAngle(this.yaw, want, 0.8 * dt);
      const pitch = -Math.atan2(a.y - this.gun.position.y, Math.hypot(a.x - this.gun.position.x, a.z - this.gun.position.z));
      this.gun.rotation.set(pitch, this.yaw, 0, 'YXZ');
      if (t < this.pauseUntil) return;
      if (this.burstEnd <= 0) this.burstEnd = t + WW1.rand(1.2, 2.4);
      if (t > this.burstEnd) { this.burstEnd = 0; this.pauseUntil = t + WW1.rand(1.3, 2.6); return; }
      if (t >= this.nextShot) {
        this.nextShot = t + 0.11;
        const dist = m.distanceTo(a);
        let chance = (tg.isPlayer ? 0.075 : 0.11) * WW1.clamp01(1.3 - dist / 170) * WW1.game.enemyAccuracy();
        if (tg.isPlayer) chance *= tg.exposure();
        const hit = Math.random() < chance && W.los(m.x, m.y, m.z, a.x, a.y, a.z);
        shotFX(m, a.clone(), hit, tg, tg.isPlayer ? 15 : 45, dist, 170, true);
      }
    }
  }
  WW1.MGNest = MGNest;

  // Corpo caído (decoração)
  WW1.corpse = function (team, x, z, yaw, dir) {
    const r = new Rig(team);
    r.root.position.set(x, W.H(x, z) + 0.12, z);
    r.root.rotation.set(dir * 86 * DEG, yaw, 0, 'YXZ');
    r.animate(0, 0.016, 0);
    return r;
  };
})();
