'use strict';
/* =========================================================
   DIA D — lógica: unidades, combate, fases, base e interface
   ========================================================= */

/* ---------- dados das unidades e construções ---------- */
const UT = {
  rifle: { name: 'Fuzileiro', plural: 'Fuzileiros', team: 'us', inf: true, hp: 45, speed: 6.5, range: 32, dmg: 7, rof: 1.5, acc: 0.5, vision: 75, cost: 60, time: 5, r: 0.9, grenade: true },
  bazooka: { name: 'Bazuqueiro', plural: 'Bazuqueiros', team: 'us', inf: true, hp: 45, speed: 6.2, range: 38, dmg: 115, rof: 5.5, acc: 0.6, at: true, proj: 'rocket', splash: 2.5, vision: 75, cost: 120, time: 8, r: 0.9 },
  sherman: { name: 'Sherman M4', plural: 'Shermans', team: 'us', tank: true, hp: 520, speed: 9.5, range: 60, dmg: 95, rof: 3.8, acc: 0.72, at: true, proj: 'shell', splash: 6, vision: 85, cost: 450, time: 16, r: 3.4, turn: 1.3, armor: 1, coax: true },
  halftrack: { name: 'Meia-lagarta M3', plural: 'Meias-lagartas M3', team: 'us', tank: true, light: true, hp: 320, speed: 12, range: 48, dmg: 6, rof: 0.12, acc: 0.3, tracer: true, vision: 82, cost: 250, time: 10, r: 3.0, turn: 1.6, armor: 1 },
  greyhound: { name: 'M8 Greyhound', plural: 'M8 Greyhounds', team: 'us', tank: true, light: true, hp: 300, speed: 14, range: 54, dmg: 50, rof: 2.2, acc: 0.7, at: true, proj: 'shell', splash: 2.5, vision: 95, cost: 300, time: 11, r: 2.9, turn: 1.8, armor: 0.75, coax: true },
  m10: { name: 'M10 Wolverine', plural: 'M10 Wolverines', team: 'us', tank: true, hp: 430, speed: 9.5, range: 72, dmg: 145, rof: 4.6, acc: 0.78, at: true, proj: 'shell', splash: 4, vision: 85, cost: 500, time: 18, r: 3.4, turn: 1.2, armor: 0.85 },
  medic: { name: 'Médico', plural: 'Médicos', team: 'us', inf: true, medic: true, hp: 45, speed: 7, range: 0, vision: 75, cost: 80, time: 6, r: 0.9 },
  para: { name: 'Paraquedista', plural: 'Paraquedistas', team: 'us', inf: true, hp: 52, speed: 7, range: 33, dmg: 8, rof: 1.3, acc: 0.55, vision: 80, r: 0.9, grenade: true },
  destroyer: { name: 'Contratorpedeiro', plural: 'Contratorpedeiros', team: 'us', naval: true, hp: 2600, speed: 11, range: 215, dmg: 50, rof: 3.2, acc: 0.5, at: true, proj: 'shell', splash: 6, vision: 240, r: 7, turn: 0.35, armor: 1.4, cost: 900, time: 30, aa: { range: 150, dmg: 16, rof: 0.35, acc: 0.28 } },
  cruiser: { name: 'Cruzador leve', plural: 'Cruzadores leves', team: 'us', naval: true, hp: 6000, speed: 9, range: 260, dmg: 75, rof: 1.7, acc: 0.5, at: true, proj: 'shell', splash: 7, vision: 280, r: 10, turn: 0.25, armor: 1.8, cost: 1600, time: 50, aa: { range: 170, dmg: 20, rof: 0.25, acc: 0.3 } },
  pt: { name: 'Lancha PT', plural: 'Lanchas PT', team: 'us', naval: true, navalTarget: true, hp: 480, speed: 24, range: 140, dmg: 380, rof: 10, acc: 0.55, at: true, proj: 'torpedo', splash: 4, vision: 220, r: 4, turn: 1.0, armor: 1, cost: 260, time: 12 },
  dozer: { name: 'Veículo de Construção', plural: 'Veículos de Construção', team: 'us', vehicle: true, hp: 650, speed: 7, range: 0, vision: 60, r: 3.4, turn: 1.3, armor: 1 },
  gren: { name: 'Granadeiro', plural: 'Granadeiros', team: 'de', inf: true, hp: 42, speed: 6, range: 32, dmg: 7, rof: 1.6, acc: 0.45, vision: 72, r: 0.9, grenade: true },
  pzschreck: { name: 'Panzerschreck', plural: 'Panzerschrecks', team: 'de', inf: true, hp: 42, speed: 5.8, range: 36, dmg: 115, rof: 6, acc: 0.55, at: true, proj: 'rocket', splash: 2.5, vision: 72, r: 0.9 },
  panzer4: { name: 'Panzer IV', plural: 'Panzer IV', team: 'de', tank: true, hp: 520, speed: 8.5, range: 62, dmg: 95, rof: 4, acc: 0.7, at: true, proj: 'shell', splash: 6, vision: 82, r: 3.5, turn: 1.2, armor: 1, coax: true },
  sani: { name: 'Sanitäter', plural: 'Sanitäter', team: 'de', inf: true, medic: true, hp: 42, speed: 6.6, range: 0, vision: 72, r: 0.9 },
  sboot: { name: 'Lancha S-Boot', plural: 'Lanchas S-Boot', team: 'de', naval: true, navalTarget: true, hp: 650, speed: 20, range: 130, dmg: 420, rof: 12, acc: 0.55, at: true, proj: 'torpedo', splash: 4, vision: 200, r: 4, turn: 0.9, armor: 1 },
  jinf: { name: 'Fuzileiro japonês', plural: 'Fuzileiros japoneses', team: 'de', inf: true, hp: 40, speed: 6.4, range: 32, dmg: 7, rof: 1.7, acc: 0.45, vision: 72, r: 0.9, grenade: true },
  jat: { name: 'Morteiro de joelho Tipo 89', plural: 'Morteiros Tipo 89', team: 'de', inf: true, hp: 40, speed: 6.0, range: 48, dmg: 50, rof: 5, acc: 0.5, proj: 'grenade', splash: 4.5, vision: 75, r: 0.9 },
  jmedic: { name: 'Padioleiro japonês', plural: 'Padioleiros japoneses', team: 'de', inf: true, medic: true, hp: 40, speed: 6.6, range: 0, vision: 72, r: 0.9 },
  chiha: { name: 'Chi-Ha Tipo 97', plural: 'Chi-Ha Tipo 97', team: 'de', tank: true, hp: 340, speed: 9, range: 52, dmg: 65, rof: 3.2, acc: 0.65, at: true, proj: 'shell', splash: 4, vision: 78, r: 3.0, turn: 1.3, armor: 0.8, coax: true },
  hago: { name: 'Ha-Go Tipo 95', plural: 'Ha-Go Tipo 95', team: 'de', tank: true, light: true, hp: 230, speed: 12, range: 46, dmg: 38, rof: 2.4, acc: 0.65, at: true, proj: 'shell', splash: 2.5, vision: 80, r: 2.6, turn: 1.6, armor: 0.7, coax: true },
  jdd: { name: 'Contratorpedeiro japonês', plural: 'Contratorpedeiros japoneses', team: 'de', naval: true, hp: 2400, speed: 12, range: 205, dmg: 48, rof: 3, acc: 0.5, at: true, proj: 'shell', splash: 6, vision: 230, r: 7, turn: 0.4, armor: 1.3, aa: { range: 140, dmg: 14, rof: 0.4, acc: 0.26 } },
  sdkfz251: { name: 'Sd.Kfz. 251', plural: 'Sd.Kfz. 251', team: 'de', tank: true, light: true, hp: 320, speed: 11, range: 50, dmg: 6, rof: 0.11, acc: 0.3, tracer: true, vision: 80, r: 3.0, turn: 1.5, armor: 1 },
  stug: { name: 'StuG III', plural: 'StuG III', team: 'de', tank: true, casemate: true, hp: 580, speed: 8, range: 66, dmg: 115, rof: 4.2, acc: 0.75, at: true, proj: 'shell', splash: 5, vision: 80, r: 3.4, turn: 1.1, armor: 1.1 },
  tiger: { name: 'Tiger I', plural: 'Tigers', team: 'de', tank: true, hp: 1100, speed: 6.5, range: 72, dmg: 150, rof: 5, acc: 0.78, at: true, proj: 'shell', splash: 7, vision: 90, r: 4.1, turn: 0.8, armor: 1.5, coax: true },
};
const COAX = { range: 45, dmg: 5, rof: 0.16, acc: 0.25, tracer: true };
const GRENADE = { dmg: 60, splash: 4.5, grenade: true };
const NAVAL = { dmg: 60, splash: 9, at: true };
const ARTY = { dmg: 60, splash: 5.5 };

const BT = {
  hq: { name: 'Centro de Comando', hp: 2200, w: 16, d: 14, income: 5, buildR: 90, time: 3, weapon: { range: 50, dmg: 5, rof: 0.15, acc: 0.3, burst: true, tracer: true } },
  depot: { name: 'Depósito de Suprimentos', short: 'Depósito', hp: 700, w: 12, d: 10, cost: 300, time: 14, income: 7, buildR: 50 },
  barracks: { name: 'Quartel', short: 'Quartel', hp: 950, w: 15, d: 10, cost: 400, time: 18, trains: ['rifle', 'bazooka', 'medic'], buildR: 50 },
  factory: { name: 'Fábrica de Tanques', short: 'Fábrica', hp: 1500, w: 20, d: 16, cost: 850, time: 26, trains: ['halftrack', 'greyhound', 'sherman', 'm10'], buildR: 50, req: 'barracks' },
  mgnest: { name: 'Ninho de Metralhadora', short: 'Ninho MG', hp: 600, w: 7, d: 7, cost: 250, time: 10, buildR: 35, weapon: { range: 48, dmg: 5, rof: 0.13, acc: 0.3, burst: true, tracer: true } },
  atgun: { name: 'Canhão AT 57mm', short: 'Canhão AT', hp: 550, w: 7, d: 7, cost: 350, time: 12, buildR: 35, weapon: { range: 65, dmg: 110, rof: 4, acc: 0.7, at: true, proj: 'shell', splash: 3 } },
  hospital: { name: 'Hospital de Campanha', short: 'Hospital', hp: 650, w: 14, d: 12, cost: 350, time: 15, buildR: 45, heal: 4, healR: 32 },
  bunker: { name: 'Casamata alemã', team: 'de', hp: 450, w: 9, d: 8, weapon: { range: 150, dmg: 4, rof: 0.1, acc: 0.3, burst: true, tracer: true } },
  nest_de: { name: 'Ninho de MG42', team: 'de', hp: 420, w: 7, d: 7, weapon: { range: 55, dmg: 5, rof: 0.09, acc: 0.26, burst: true, tracer: true } },
  dehq: { name: 'Quartel-General Alemão', team: 'de', hp: 4000, w: 26, d: 20 },
  naval: { name: 'Base Naval', short: 'Base Naval', hp: 1300, w: 16, d: 12, cost: 700, time: 22, trains: ['pt', 'destroyer', 'cruiser'], buildR: 40, coastOnly: true },
  coastgun: { name: 'Canhão Costeiro 155mm', short: 'Costeiro', hp: 750, w: 8, d: 8, cost: 450, time: 15, buildR: 40, coastOnly: true, weapon: { range: 245, dmg: 90, rof: 4.5, acc: 0.55, at: true, proj: 'shell', splash: 6 } },
  aa: { name: 'Canhão Antiaéreo 40mm', short: 'Antiaéreo', hp: 500, w: 7, d: 7, cost: 300, time: 12, buildR: 35, aa: { range: 175, dmg: 30, rof: 0.55, acc: 0.34 } },
  flak_de: { name: 'Flak 38 de 20 mm', team: 'de', hp: 380, w: 6, d: 6, aa: { range: 150, dmg: 16, rof: 0.32, acc: 0.28 } },
};
const BUILD_ORDER = ['depot', 'barracks', 'factory', 'mgnest', 'atgun', 'aa', 'hospital', 'naval', 'coastgun'];

function foe() { return SC.foe || { adj: 'alemão', adjF: 'alemã', pl: 'alemães', air: 'fw190' }; }
function dispName(e) { return (SC.names && SC.names[e.kind]) || e.def.name; }
function strikeName(k) { return (SC.strikeNames && SC.strikeNames[k]) || STRIKES[k].name; }
function airName(p) { return (SC.airNames && SC.airNames[p.kind]) || p.def.name; }
function hqTown() { return MAP.towns[4].name; }
/* ---------- renderizador e cena ---------- */
const $ = (id) => document.getElementById(id);
const canvas = $('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
let GFX = 'high';
try { if (localStorage.getItem('diad-gfx') === 'low') GFX = 'low'; } catch (e) { /* sem armazenamento */ }

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9ba6ab);
scene.fog = new THREE.Fog(0x9ba6ab, 300, 1200);
const camera = new THREE.PerspectiveCamera(50, 1, 1, 3200);
const hemi = new THREE.HemisphereLight(0xcad4da, 0x4a4632, 0.8); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0d8, 0.8);
sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.near = 10; sun.shadow.camera.far = 700; sun.shadow.bias = -0.0008;
scene.add(sun, sun.target);
const skyGeo = new THREE.SphereGeometry(2600, 24, 12);
skyGeo.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(skyGeo.attributes.position.count * 3), 3));
scene.add(new THREE.Mesh(skyGeo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false })));
// neve caindo (Ardenas)
const SNOW_N = 2200, snowGeo = new THREE.BufferGeometry(), snowPos = new Float32Array(SNOW_N * 3);
for (let i = 0; i < SNOW_N; i++) { snowPos[i * 3] = (Math.random() - 0.5) * 300; snowPos[i * 3 + 1] = Math.random() * 120; snowPos[i * 3 + 2] = (Math.random() - 0.5) * 300; }
snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
const snow = new THREE.Points(snowGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0.85, depthWrite: false }));
snow.frustumCulled = false; snow.visible = false; scene.add(snow);
function updSnow(dt) {
  if (!snow.visible) return;
  const p = snowGeo.attributes.position.array, ty = surfaceH(cam.x, cam.z);
  for (let i = 0; i < SNOW_N; i++) {
    p[i * 3 + 1] -= dt * (5 + (i % 7)); p[i * 3] += Math.sin(S.time * 0.7 + i) * dt * 1.2;
    if (p[i * 3 + 1] < 0) p[i * 3 + 1] += 120;
  }
  snowGeo.attributes.position.needsUpdate = true;
  snow.position.set(cam.x, ty, cam.z);
}
function applyScenarioLook() {
  scene.background.setHex(SC.sky); scene.fog.color.setHex(SC.sky); scene.fog.near = SC.fog[0]; scene.fog.far = SC.fog[1];
  hemi.color.setHex(SC.hemi[0]); hemi.groundColor.setHex(SC.hemi[1]); hemi.intensity = SC.hemi[2];
  sun.color.setHex(SC.sun); sun.intensity = SC.sunI;
  const top = new THREE.Color(SC.skyTop), hor = new THREE.Color(SC.skyHor), cc = new THREE.Color(), pa = skyGeo.attributes.position, ca = skyGeo.attributes.color;
  for (let i = 0; i < pa.count; i++) { const k = clamp(pa.getY(i) / 1400, 0, 1); cc.copy(hor).lerp(top, Math.sqrt(k)); ca.setXYZ(i, cc.r, cc.g, cc.b); }
  ca.needsUpdate = true;
  snow.visible = !!SC.snow;
}
try { const sv = localStorage.getItem('diad-scenario'); if (sv && SCENARIOS[sv]) SC = SCENARIOS[sv]; } catch (e) { /* sem armazenamento */ }
buildWorld(scene);
applyScenarioLook();

function applyGfx() {
  const hi = GFX === 'high';
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, hi ? 1.75 : 1));
  renderer.shadowMap.enabled = hi; sun.castShadow = hi;
  scene.traverse(o => { if (o.material) o.material.needsUpdate = true; });
  $('gfx').textContent = 'Gráficos: ' + (hi ? 'Alto' : 'Leve');
  resize();
}
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);

/* ---------- estado ---------- */
const S = {
  phase: 'menu', time: 0, t: 0, supplies: 0, kills: 0, lost: 0, naval: 0,
  boats: [], wrecks: [], timers: [], wave: 0, waveT: 0, placing: null, strike: null, supportOpen: false, boxMode: false,
  cd: { naval: 0, p47: 0, b26: 0, para: 0 }, planes: [], bombs: [], chutes: [], flybyT: 3, airT: 180, prillerDone: false,
  lst: null, cps: [], bunkers: [], deHQ: null, usHQ: null, dozer: null,
  reinf: [], artT: 4, splashT: 1, cine: false, menuFx: 1, startedAt: 0,
};
const ents = [];
let selected = [];
let eid = 0;
const civs = [];

const rand = Math.random;
function rr(a, b) { return a + (b - a) * rand(); }
function angDiff(a, b) { let d = (a - b) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; }
function turnTo(cur, target, step) { const d = angDiff(target, cur); return cur + clamp(d, -step, step); }
function later(t, fn) { S.timers.push({ t: S.time + t, fn }); }
const TV = new THREE.Vector3(), TV2 = new THREE.Vector3();

/* ---------- efeitos: partículas, traçantes, projéteis, crateras ---------- */
const FX = { parts: [], idx: 0, tracers: [], tidx: 0, proj: [], emitters: [], craters: [], cidx: 0, pool: { shell: [], rocket: [], grenade: [], torpedo: [] } };
for (let i = 0; i < 460; i++) {
  const m = new THREE.Mesh(G.ico, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false }));
  m.visible = false; scene.add(m);
  FX.parts.push({ m, life: 0, max: 1, vx: 0, vy: 0, vz: 0, grav: 0, drag: 0, s0: 1, s1: 1, sy: 1, a: 1, c0: new THREE.Color(), c1: new THREE.Color() });
}
function emit(x, y, z, o) {
  const p = FX.parts[FX.idx]; FX.idx = (FX.idx + 1) % FX.parts.length;
  p.life = p.max = o.life; p.vx = o.vx || 0; p.vy = o.vy || 0; p.vz = o.vz || 0; p.grav = o.grav || 0; p.drag = o.drag || 0;
  p.s0 = o.s0; p.s1 = o.s1 === undefined ? o.s0 : o.s1; p.sy = o.sy || 1; p.a = o.a === undefined ? 1 : o.a;
  p.c0.setHex(o.c); p.c1.setHex(o.c1 === undefined ? o.c : o.c1);
  p.m.position.set(x, y, z); p.m.rotation.set(rand() * 3, rand() * 3, 0); p.m.scale.set(p.s0, p.s0 * p.sy, p.s0);
  p.m.material.color.copy(p.c0); p.m.material.opacity = p.a; p.m.visible = true;
}
function updParts(dt) {
  for (const p of FX.parts) {
    if (p.life <= 0) continue;
    p.life -= dt;
    if (p.life <= 0) { p.m.visible = false; continue; }
    const k = 1 - p.life / p.max, dr = Math.max(0, 1 - p.drag * dt);
    p.vy -= p.grav * dt; p.vx *= dr; p.vz *= dr; if (!p.grav) p.vy *= dr;
    const m = p.m; m.position.x += p.vx * dt; m.position.y += p.vy * dt; m.position.z += p.vz * dt;
    if (p.grav && m.position.y < -2) { p.life = 0; m.visible = false; continue; }
    const s = p.s0 + (p.s1 - p.s0) * k; m.scale.set(s, s * p.sy, s);
    m.material.color.copy(p.c0).lerp(p.c1, k); m.material.opacity = p.a * (1 - k);
  }
}
const trMat = new THREE.MeshBasicMaterial({ color: 0xffd98a });
const trGeo = new THREE.BoxGeometry(0.1, 0.1, 3.4);
for (let i = 0; i < 70; i++) { const m = new THREE.Mesh(trGeo, trMat); m.visible = false; scene.add(m); FX.tracers.push({ m, a: new THREE.Vector3(), d: new THREE.Vector3(), len: 0, t: 0, dur: 0 }); }
function tracer(a, b) {
  const T = FX.tracers[FX.tidx]; FX.tidx = (FX.tidx + 1) % FX.tracers.length;
  T.a.copy(a); T.d.subVectors(b, a); T.len = T.d.length(); T.d.normalize(); T.t = 0; T.dur = T.len / 380;
  T.m.position.copy(a); T.m.lookAt(b); T.m.visible = true;
}
function updTracers(dt) {
  for (const T of FX.tracers) {
    if (!T.m.visible) continue;
    T.t += dt; if (T.t >= T.dur) { T.m.visible = false; continue; }
    T.m.position.copy(T.a).addScaledVector(T.d, T.len * T.t / T.dur);
  }
}
const projMeshes = {
  shell: () => new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 1.6), new THREE.MeshBasicMaterial({ color: 0xffc46b })),
  rocket: () => { const m = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.9), new THREE.MeshBasicMaterial({ color: 0x3a3a30 })); return m; },
  grenade: () => new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 4), new THREE.MeshBasicMaterial({ color: 0x2c2c26 })),
  torpedo: () => new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 3, 8).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x2c3034 })),
};
function getProj(kind) { const pool = FX.pool[kind]; const m = pool.pop() || projMeshes[kind](); m.visible = true; scene.add(m); return m; }
function launch(o) {
  o.p1 = new THREE.Vector3(o.tx, o.ty, o.tz); o.t = 0;
  o.dur = Math.max(0.08, o.p0.distanceTo(o.p1) / o.speed); o.mesh = getProj(o.kind);
  o.mesh.position.copy(o.p0); FX.proj.push(o);
}
function updProj(dt) {
  for (let i = FX.proj.length - 1; i >= 0; i--) {
    const o = FX.proj[i]; o.t += dt;
    const k = Math.min(1, o.t / o.dur);
    TV.lerpVectors(o.p0, o.p1, k); TV.y += (o.arc || 0) * 4 * k * (1 - k);
    o.mesh.lookAt(TV); o.mesh.position.copy(TV);
    if (o.kind === 'rocket' && rand() < 0.7) emit(TV.x, TV.y, TV.z, { c: 0xbdb7a8, life: 0.7, s0: 0.3, s1: 1.1, a: 0.5 });
    if (o.kind === 'torpedo' && rand() < 0.8) emit(TV.x, 0.25, TV.z, { c: 0xeef3f1, life: 2.2, s0: 0.5, s1: 1.6, a: 0.7 });
    if (k >= 1) { FX.proj.splice(i, 1); o.mesh.visible = false; scene.remove(o.mesh); FX.pool[o.kind].push(o.mesh); impact(o); }
  }
}
function impact(o) {
  const x = o.p1.x, z = o.p1.z, y = o.p1.y;
  if (o.target && o.target.alive) damage(o.target, o.w.dmg, o.src, o.w);
  if (o.w.splash) areaDamage(x, z, o.w.splash, o.w.dmg * 0.55, o.team, o.w, o.src, o.target);
  if (o.kind === 'torpedo') explosion(x, 0, z, 2.0);
  else if (o.target && o.target.armored) {
    explosion(x, y, z, o.kind === 'shell' ? 0.8 : 0.6, true);
  } else explosion(x, Math.max(y, surfaceH(x, z)), z, o.kind === 'grenade' ? 0.7 : o.kind === 'rocket' ? 0.75 : 1.0);
}
const craterMat = new THREE.MeshLambertMaterial({ map: TEX.crater, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 });
for (let i = 0; i < 140; i++) { const m = new THREE.Mesh(G.plane, craterMat); m.rotation.x = -Math.PI / 2; m.visible = false; m.renderOrder = 1; scene.add(m); FX.craters.push(m); }
const bloodMat = new THREE.MeshLambertMaterial({ map: TEX.blood, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 });
const bloods = []; let bloodIdx = 0;
for (let i = 0; i < 60; i++) { const m = new THREE.Mesh(G.plane, bloodMat); m.rotation.x = -Math.PI / 2; m.visible = false; m.renderOrder = 1; scene.add(m); bloods.push(m); }
function blood(x, z, s) {
  const h = groundH(x, z); if (h < 0.05) return;
  const m = bloods[bloodIdx]; bloodIdx = (bloodIdx + 1) % bloods.length;
  m.position.set(x, h + 0.1, z); m.scale.set(s, s, 1); m.rotation.z = rand() * 6; m.visible = true;
}
function crater(x, z, s) {
  const h = groundH(x, z); if (h < 0.05) return;
  const m = FX.craters[FX.cidx]; FX.cidx = (FX.cidx + 1) % FX.craters.length;
  m.position.set(x, h + 0.12, z); m.scale.set(s, s, 1); m.rotation.z = rand() * 6; m.visible = true;
  if (s > 2.4) MAP.coverPts.add({ x, z, r: s * 0.45 + 0.6 });
}
function explosion(x, y, z, size, small) {
  if (surfaceH(x, z) <= 0.05 && y < 1.5) {
    for (let i = 0; i < 14; i++) emit(x + rr(-1, 1) * size, 0.3, z + rr(-1, 1) * size, { c: 0xe6ecee, c1: 0xb9c6ca, life: rr(1.0, 1.6), vx: rr(-2, 2), vy: rr(10, 22) * size, vz: rr(-2, 2), grav: 20, s0: 0.8 * size, s1: 2.2 * size, sy: 1.6, a: 0.85 });
    for (let i = 0; i < 6; i++) emit(x, 0.4, z, { c: 0xdfe6e8, life: 1.6, vx: rr(-4, 4), vz: rr(-4, 4), s0: 1.5 * size, s1: 4 * size, a: 0.5, drag: 1.5 });
    sfx('splash', x, z); return;
  }
  emit(x, y + 0.5, z, { c: 0xfff0b0, c1: 0xff8a2a, life: 0.18, s0: 1.8 * size, s1: 4.2 * size, a: 1 });
  for (let i = 0; i < (small ? 4 : 7); i++) emit(x + rr(-1, 1), y + 1, z + rr(-1, 1), { c: 0xff9a35, c1: 0x553322, life: rr(0.4, 0.7), vx: rr(-3, 3) * size, vy: rr(3, 7) * size, vz: rr(-3, 3) * size, s0: 1.2 * size, s1: 2.6 * size, a: 0.95, drag: 2 });
  for (let i = 0; i < (small ? 4 : 9); i++) emit(x + rr(-1.5, 1.5), y + 1, z + rr(-1.5, 1.5), { c: 0x3c3934, c1: 0x7d776c, life: rr(2.4, 4), vx: rr(-1.5, 1.5) + 1, vy: rr(2, 5), vz: rr(-1.5, 1.5), s0: 1.6 * size, s1: 6.5 * size, a: 0.7, drag: 0.9 });
  if (!small) {
    for (let i = 0; i < 8; i++) emit(x, y + 0.6, z, { c: 0x5a4630, life: 1.3, vx: rr(-8, 8) * size, vy: rr(8, 15) * size, vz: rr(-8, 8) * size, grav: 26, s0: 0.45 * size, a: 1 });
    crater(x, z, 3.2 * size);
  }
  sfx(size > 1.2 ? 'bigboom' : 'boom', x, z);
  const d = Math.hypot(x - cam.x, z - cam.z);
  if (d < 140) cam.shake = Math.max(cam.shake, size * 0.9 * (1 - d / 140));
  for (const c of civs) if (Math.hypot(c.x - x, c.z - z) < 45) c.flee = { x: c.x + (c.x - x) * 3, z: c.z + (c.z - z) * 3, t: S.time + 6 };
}
function muzzleFlash(p, size) {
  emit(p.x, p.y, p.z, { c: 0xfff1a8, c1: 0xff9a35, life: 0.07, s0: size * 0.6, s1: size, a: 1 });
  if (size > 1.5) for (let i = 0; i < 3; i++) emit(p.x, p.y, p.z, { c: 0xa49d8c, life: 1.4, vx: rr(-1, 1), vy: rr(0.5, 1.5), vz: rr(-1, 1), s0: 0.6, s1: 2.6, a: 0.5 });
}
function updEmitters(dt) {
  for (let i = FX.emitters.length - 1; i >= 0; i--) {
    const e = FX.emitters[i];
    if (S.time > e.until) { FX.emitters.splice(i, 1); continue; }
    e.t -= dt; if (e.t > 0) continue; e.t = 0.18;
    emit(e.x + rr(-0.6, 0.6), e.y, e.z + rr(-0.6, 0.6), { c: 0x2a2826, c1: 0x5d5a54, life: rr(3, 4.5), vx: rr(0.5, 1.6), vy: rr(2.5, 4.5), vz: rr(-0.5, 0.5), s0: 1.0 * e.s, s1: 5 * e.s, a: 0.55 });
    if (e.fire && rand() < 0.6) emit(e.x + rr(-0.7, 0.7), e.y, e.z + rr(-0.7, 0.7), { c: 0xffa040, c1: 0x7a3010, life: 0.5, vy: rr(2, 4), s0: 0.9 * e.s, s1: 1.6 * e.s, a: 0.9 });
  }
}

/* ---------- áudio sintetizado ---------- */
const AU = { ctx: null, master: null, on: true, noise: null, last: {} };
function initAudio() {
  if (AU.ctx) { if (AU.ctx.state === 'suspended') AU.ctx.resume(); return; }
  try {
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
    AU.ctx = new C(); AU.master = AU.ctx.createGain(); AU.master.gain.value = 0.7; AU.master.connect(AU.ctx.destination);
    const len = AU.ctx.sampleRate, buf = AU.ctx.createBuffer(1, len, AU.ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = rand() * 2 - 1;
    AU.noise = buf;
    const surf = AU.ctx.createBufferSource(); surf.buffer = buf; surf.loop = true;
    const lp = AU.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420;
    const g = AU.ctx.createGain(); g.gain.value = 0.05;
    const lfo = AU.ctx.createOscillator(); lfo.frequency.value = 0.12; const lg = AU.ctx.createGain(); lg.gain.value = 0.035;
    lfo.connect(lg); lg.connect(g.gain); surf.connect(lp); lp.connect(g); g.connect(AU.master); surf.start(); lfo.start();
  } catch (e) { AU.ctx = null; }
}
const SFX = {
  rifle: { gap: 0.035, f: 'bandpass', freq: 1500, q: 0.8, dur: 0.14, vol: 0.35 },
  mg: { gap: 0.03, f: 'highpass', freq: 900, q: 0.7, dur: 0.06, vol: 0.28 },
  cannon: { gap: 0.06, f: 'lowpass', freq: 800, q: 0.6, dur: 0.9, vol: 0.9, thump: 70 },
  rocket: { gap: 0.06, f: 'bandpass', freq: 600, q: 0.5, dur: 0.5, vol: 0.5 },
  boom: { gap: 0.05, f: 'lowpass', freq: 380, q: 0.5, dur: 1.3, vol: 0.9, thump: 50 },
  bigboom: { gap: 0.05, f: 'lowpass', freq: 260, q: 0.5, dur: 2.0, vol: 1.2, thump: 40 },
  splash: { gap: 0.08, f: 'bandpass', freq: 500, q: 0.4, dur: 1.1, vol: 0.45 },
  clank: { gap: 0.2, f: 'bandpass', freq: 300, q: 2, dur: 0.4, vol: 0.5, thump: 110 },
};
function sfx(type, x, z) {
  if (!AU.ctx || !AU.on) return;
  const s = SFX[type], now = AU.ctx.currentTime;
  if (s.gap && now - (AU.last[type] || 0) < s.gap) return;
  const d = x === undefined ? 0 : Math.hypot(x - cam.x, z - cam.z);
  let v = clamp(1 - d / (cam.dist * 1.6 + 260), 0, 1); v = v * v * s.vol;
  if (v < 0.01) return;
  AU.last[type] = now;
  const src = AU.ctx.createBufferSource(); src.buffer = AU.noise; src.playbackRate.value = 0.8 + rand() * 0.4;
  const f = AU.ctx.createBiquadFilter(); f.type = s.f; f.frequency.value = s.freq; f.Q.value = s.q;
  const g = AU.ctx.createGain(); g.gain.setValueAtTime(v, now); g.gain.exponentialRampToValueAtTime(0.001, now + s.dur);
  src.connect(f); f.connect(g); g.connect(AU.master); src.start(now, rand() * 0.5); src.stop(now + s.dur + 0.05);
  if (s.thump) {
    const o = AU.ctx.createOscillator(), og = AU.ctx.createGain(); o.frequency.setValueAtTime(s.thump, now); o.frequency.exponentialRampToValueAtTime(s.thump * 0.4, now + s.dur * 0.6);
    og.gain.setValueAtTime(v * 0.8, now); og.gain.exponentialRampToValueAtTime(0.001, now + s.dur * 0.7);
    o.connect(og); og.connect(AU.master); o.start(now); o.stop(now + s.dur);
  }
}
function whistle(x, z) {
  if (!AU.ctx || !AU.on) return;
  const d = Math.hypot(x - cam.x, z - cam.z), v = clamp(1 - d / 400, 0, 1) * 0.06; if (v < 0.005) return;
  const now = AU.ctx.currentTime, o = AU.ctx.createOscillator(), g = AU.ctx.createGain();
  o.frequency.setValueAtTime(1300, now); o.frequency.exponentialRampToValueAtTime(380, now + 0.95);
  g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(v, now + 0.3); g.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
  o.connect(g); g.connect(AU.master); o.start(now); o.stop(now + 1.05);
}

/* ---------- entidades ---------- */
const ringGeo = new THREE.RingGeometry(0.85, 1.0, 32);
const ringMat = { us: new THREE.MeshBasicMaterial({ color: 0x9be37a, transparent: true, opacity: 0.9, depthWrite: false }) };
const barBg = new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.7, depthTest: false });
const barFg = [0x7fd35f, 0xe3c03c, 0xe0573f].map(c => new THREE.MeshBasicMaterial({ color: c, depthTest: false }));

function addEnt(o) {
  o.id = ++eid; o.alive = true; o.sel = false; o.hitT = -99; o.seen = o.team !== 'de'; o.revealT = -99;
  ents.push(o); scene.add(o.mesh); return o;
}
function spawnUnit(kind, x, z, o) {
  o = o || {};
  if (SC.unitMap && SC.unitMap[kind]) kind = SC.unitMap[kind];
  const d = UT[kind];
  const mesh = d.inf ? makeSoldier(d.team, kind) : kind === 'dozer' ? makeDozer() : d.naval ? makeShip(kind) : makeTank(kind);
  const u = addEnt({
    kind, def: d, team: d.team, unit: true, inf: !!d.inf, tank: !!d.tank, armored: !d.inf, armor: d.armor || 1,
    x, z, y: groundH(x, z), heading: o.heading !== undefined ? o.heading : (d.team === 'us' ? Math.PI : 0),
    hp: d.hp, maxHp: d.hp, r: d.r, mesh, order: o.order || 'idle', dest: null, target: null, forced: null,
    home: { x, z }, ph: rand() * 6, speedNow: 0, turretYaw: 0, cool: rand() * 1.5, mgCool: 0, gcool: 3 + rand() * 3,
    cover: 0, coverT: -9, retarget: rand() * 0.4, fireT: -9, recoil: 0,
  });
  mesh.position.set(x, u.y, z); mesh.rotation.y = u.heading;
  return u;
}
function spawnBuilding(kind, x, z, o) {
  o = o || {};
  const d = BT[kind]; const mesh = makeBuilding(kind);
  const b = addEnt({
    kind, def: d, team: d.team || 'us', building: true, armored: true, armor: 1,
    x, z, y: groundH(x, z), hp: d.hp, maxHp: d.hp, r: Math.max(d.w, d.d) * 0.55, mesh,
    complete: !!o.complete, progress: o.complete ? 1 : 0, queue: [], prodT: 0, heading: o.heading || 0,
    wcool: rand(), burst: rand() * 2, turretYaw: 0, retarget: rand() * 0.5, target: null, rally: null,
  });
  mesh.position.set(x, b.y, z); mesh.rotation.y = b.heading;
  if (!b.complete) { mesh.scale.y = 0.06; b.hp = d.hp * 0.1; if (mesh.userData.scaffold) mesh.userData.scaffold.visible = true; }
  b.obs = MAP.obstacles.add({ x, z, r: b.r });
  return b;
}
function removeEnt(e) {
  e.alive = false; e.removed = true; scene.remove(e.mesh);
  if (e.bar) scene.remove(e.bar);
  if (e.obs) e.obs.dead = true;
  const ud = e.mesh.userData; if (ud.trackMat) { ud.trackMat.map.dispose(); ud.trackMat.dispose(); }
  const i = ents.indexOf(e); if (i >= 0) ents.splice(i, 1);
  deselect(e);
}

function damage(t, amt, src, w) {
  if (!t.alive) return;
  if (t.downed) { t.downed = false; kill(t); return; }
  if (src && src.team !== t.team) t.threatSrc = src;
  let a = amt;
  if (t.armored) { if (w.at) a /= (t.armor || 1); else if (w.grenade) a *= t.building ? 1 : t.def.light ? 0.6 : 0.25; else a *= t.def.light ? 0.3 : 0.05; }
  t.hp -= a; t.hitT = S.time;
  if (src && src.alive && src.team !== t.team && t.unit && !t.target && t.order !== 'move' && t.def.range > 0) t.target = src;
  if (t.hp <= 0) {
    if (t.inf && S.phase !== 'menu' && rand() < 0.6) downUnit(t, src); else kill(t);
  }
}
function areaDamage(x, z, R, dmg, team, w, src, skip) {
  for (let i = 0; i < ents.length; i++) {
    const e = ents[i];
    if (!e.alive || e === skip || (team && e.team === team)) continue;
    const d = Math.hypot(e.x - x, e.z - z) - (e.building ? e.r * 0.7 : 0);
    if (d >= R) continue;
    let f = 1 - Math.max(0, d) / R * 0.7;
    if (e.inf && e.cover === 2) f *= 0.4; else if (e.inf && e.cover) f *= 0.7;
    damage(e, dmg * f, src, w);
  }
}
function charMesh(mesh) {
  const dark = M(0x1d1b18);
  mesh.traverse(o => { if (o.isMesh && o.material !== BLOB_MAT && !(o.material.map && o.material.transparent)) o.material = dark; });
}
function kill(t) {
  t.alive = false; t.hp = 0; t.deathT = S.time; deselect(t);
  if (t.team === 'us') S.lost++; else S.kills++;
  if (t.bar) t.bar.visible = false;
  if (t.inf) { t.fall = rand() < 0.5 ? 1 : -1; blood(t.x, t.z, rr(1.4, 2.2)); }
  else if (t.unit) {
    explosion(t.x, t.y + 1.6, t.z, 1.5);
    charMesh(t.mesh);
    const ud = t.mesh.userData; if (ud.turret) { ud.turret.position.y += 0.35; ud.turret.rotation.z = rr(-0.3, 0.3); }
    FX.emitters.push({ x: t.x, y: t.y + 2.5, z: t.z, until: S.time + 45, t: 0, fire: true, s: 1 });
    if (t.kind === 'dozer' && S.phase === 'deploy') endGame(false, 'O Veículo de Construção foi destruído antes de montar a base.');
  } else if (t.building) {
    explosion(t.x, t.y + 3, t.z, 2.2); later(0.35, () => explosion(t.x + rr(-4, 4), t.y + 2, t.z + rr(-4, 4), 1.4));
    if (t.obs) t.obs.dead = true;
    FX.emitters.push({ x: t.x, y: t.y + 3, z: t.z, until: S.time + 50, t: 0, fire: true, s: 1.6 });
    charMesh(t.mesh);
    if (t.team === 'us') toast(t.def.name + ' destruído!', 'bad');
    else if (t.kind === 'bunker') toast('Casamata destruída!', 'good');
  }
}

/* ---------- alvos e disparos ---------- */
function findTarget(e, range) {
  let best = null, bs = Infinity; const r2 = range * range;
  const at = e.def && e.def.at, rifle = e.unit && !at;
  for (let i = 0; i < ents.length; i++) {
    const o = ents[i];
    if (!o.alive || o.team === e.team || o.downed) continue;
    if (e.team === 'us' && !o.seen) continue;
    if (e.def && e.def.navalTarget && !o.naval) continue;
    const dx = o.x - e.x, dz = o.z - e.z, rr2 = range + (o.r || 0), d2 = dx * dx + dz * dz;
    if (d2 > rr2 * rr2 && d2 > r2) continue;
    let s = d2;
    if (at) s *= o.armored ? 0.5 : 1.4; else if (rifle) s *= o.armored ? (e.def.grenade && o.building ? 1.3 : 2.2) : 1;
    if (o.kind === 'dozer') s *= 0.8;
    if (s < bs) { bs = s; best = o; }
  }
  return best;
}
function muzzlePos(e, out) {
  const m = e.mesh.userData.muzzle;
  if (m) { e.mesh.updateMatrixWorld(true); m.getWorldPosition(out); }
  else if (e.inf) out.set(e.x + Math.sin(e.heading) * 0.8, e.y + 1.75, e.z + Math.cos(e.heading) * 0.8);
  else out.set(e.x, e.y + 1.8, e.z);
  return out;
}
function fireWeapon(src, tgt, w, dist, fromPos) {
  const p = fromPos || muzzlePos(src, TV2.set(0, 0, 0)).clone();
  let acc = w.acc * (1 - 0.45 * clamp(dist / w.range, 0, 1));
  if (tgt.inf) { if (tgt.cover === 2) acc *= 0.35; else if (tgt.cover) acc *= 0.5; if (tgt.speedNow > 3) acc *= 0.8; }
  else acc = Math.min(0.95, acc * 1.5);
  if (src.inf && src.speedNow > 1) acc *= 0.6;
  const hit = rand() < acc;
  const ty = tgt.y + (tgt.inf ? 1.2 : tgt.building ? 2.5 : 1.5);
  src.revealT = S.time;
  if (w.proj) {
    let ax = tgt.x, az = tgt.z, ay = ty;
    if (!hit) { const a = rand() * 6.28, m = 2.5 + rand() * 6; ax += Math.cos(a) * m; az += Math.sin(a) * m; ay = surfaceH(ax, az); }
    else if (tgt.building) { ax += rr(-1, 1) * tgt.r * 0.4; az += rr(-1, 1) * tgt.r * 0.4; }
    if (w.proj === 'torpedo') { p.y = 0.2; ay = 0.2; }
    launch({ kind: w.proj, p0: p, tx: ax, ty: ay, tz: az, speed: w.proj === 'shell' ? 240 : w.proj === 'torpedo' ? 32 : 75, arc: w.proj === 'rocket' ? 0.6 : 0, target: hit ? tgt : null, w, src, team: src.team });
    muzzleFlash(p, w.proj === 'shell' ? 2.4 : 1.2);
    sfx(w.proj === 'shell' ? 'cannon' : 'rocket', src.x, src.z);
    src.recoil = 1;
  } else {
    muzzleFlash(p, 0.7);
    sfx(w.tracer ? 'mg' : 'rifle', src.x, src.z);
    const jx = hit ? 0 : rr(-2.5, 2.5), jz = hit ? 0 : rr(-2.5, 2.5);
    if (w.tracer ? rand() < 0.5 : rand() < 0.12) tracer(p, TV.set(tgt.x + jx, ty, tgt.z + jz));
    if (hit) damage(tgt, w.dmg, src, w);
    else if (rand() < 0.3) {
      const x = tgt.x + jx, z = tgt.z + jz, h = groundH(x, z);
      if (h < 0) emit(x, 0.2, z, { c: 0xe6ecee, life: 0.5, vy: 6, grav: 14, s0: 0.25, s1: 0.4, sy: 2, a: 0.8 });
      else emit(x, h + 0.2, z, { c: 0x8a7a5a, life: 0.6, vy: 2, s0: 0.3, s1: 1.0, a: 0.7 });
    }
  }
}
function throwGrenade(u, t) {
  const p = TV2.set(u.x, u.y + 1.9, u.z).clone();
  const err = t.building ? 1.5 : 2.5;
  const tx = t.x + rr(-err, err), tz = t.z + rr(-err, err);
  launch({ kind: 'grenade', p0: p, tx, ty: surfaceH(tx, tz) + 0.2, tz, speed: 16, arc: 5, target: t.building && rand() < 0.85 ? t : null, w: GRENADE, src: u, team: u.team });
  u.fireT = S.time;
}

/* ---------- movimento ---------- */
function steer(u, tx, tz, stop, dt) {
  const dx = tx - u.x, dz = tz - u.z, dist = Math.hypot(dx, dz);
  if (dist <= stop) { u.speedNow = 0; return true; }
  const want = Math.atan2(dx, dz), d = u.def;
  let spd = d.speed;
  if (u.inf) u.heading = turnTo(u.heading, want, 9 * dt);
  else {
    u.heading = turnTo(u.heading, want, d.turn * dt);
    const err = Math.abs(angDiff(want, u.heading));
    spd *= Math.max(0.1, Math.cos(Math.min(err, 1.45)));
  }
  const h0 = groundH(u.x, u.z), h1 = groundH(u.x + Math.sin(u.heading) * 2, u.z + Math.cos(u.heading) * 2), sl = (h1 - h0) / 2;
  if (sl > 0.25 && !d.naval) spd *= u.inf ? 0.72 : 0.55;
  if (h0 < 0.3 && !d.naval) spd *= 0.55;
  if (u.inf && inWire(u.x, u.z)) spd *= 0.35;
  spd *= u.speedMul || 1;
  u.speedNow += (spd - u.speedNow) * Math.min(1, dt * (u.inf ? 6 : 1.4));
  const step = Math.min(u.speedNow * dt, dist);
  u.x += Math.sin(u.heading) * step; u.z += Math.cos(u.heading) * step;
  return false;
}
const _obs = [];
function separate() {
  const L = [];
  for (const e of ents) if (e.unit && e.alive && !e.downed) L.push(e);
  for (let i = 0; i < L.length; i++) {
    const a = L[i];
    for (let j = i + 1; j < L.length; j++) {
      const b = L[j];
      if (!!a.def.naval !== !!b.def.naval) continue;
      const dx = b.x - a.x, dz = b.z - a.z, md = a.r + b.r;
      if (dx > md || dx < -md || dz > md || dz < -md) continue;
      const d2 = dx * dx + dz * dz;
      if (d2 >= md * md || d2 < 1e-6) continue;
      const d = Math.sqrt(d2), push = (md - d), wa = b.r / md, wb = a.r / md, nx = dx / d, nz = dz / d;
      a.x -= nx * push * wa * 0.5; a.z -= nz * push * wa * 0.5; b.x += nx * push * wb * 0.5; b.z += nz * push * wb * 0.5;
    }
    if (a.def.naval) { a.x = clamp(a.x, WORLD.minX + 10, WORLD.maxX - 10); a.z = clamp(a.z, 362, 900); continue; }
    MAP.obstacles.near(a.x, a.z, _obs);
    for (const o of _obs) {
      const dx = a.x - o.x, dz = a.z - o.z, md = o.r + a.r, d2 = dx * dx + dz * dz;
      if (d2 < md * md && d2 > 1e-6) { const d = Math.sqrt(d2); a.x = o.x + dx / d * md; a.z = o.z + dz / d * md; }
    }
    a.x = clamp(a.x, WORLD.minX + 5, WORLD.maxX - 5); a.z = clamp(a.z, WORLD.minZ + 5, SC.coast ? SHORE_Z + 12 : WORLD.maxZ - 5);
  }
}

/* ---------- atualização das unidades ---------- */
/* ---------- IA de infantaria: avançar de cobertura em cobertura ---------- */
// devolve o próximo ponto de parada (cobertura), 'wait' enquanto espera abrigado, ou null para ir direto
function advanceGoal(u, tx, tz, threat, dt) {
  const dd = Math.hypot(tx - u.x, tz - u.z);
  if (!threat || dd < 12) { u.hop = null; u.hopWait = null; return null; }
  if (u.hop) {
    if (Math.hypot(u.hop.x - u.x, u.hop.z - u.z) > 1.1 && S.time < u.hop.until) return u.hop;
    if (u.hopWait === null || u.hopWait === undefined) u.hopWait = u.hop.cover ? 1.6 + rand() * 2.4 : 0;
    u.hopWait -= dt;
    if (u.hopWait > 0) return 'wait';
    u.hop = null; u.hopWait = null;
  }
  const c = findCover(u.x, u.z, tx, tz, threat.x, threat.z, 26, 3);
  if (c) { c.cover = true; u.hop = c; }
  else { const ux = (tx - u.x) / dd, uz = (tz - u.z) / dd, s = Math.min(14, dd); u.hop = { x: u.x + ux * s + rr(-2, 2), z: u.z + uz * s + rr(-2, 2), cover: false }; }
  u.hop.until = S.time + 12;
  return u.hop;
}
function nearestEnemy(e, range) {
  let best = null, bd = range;
  for (const o of ents) {
    if (!o.alive || o.downed || o.team === e.team || (!o.unit && !(o.def && (o.def.weapon || o.def.aa)))) continue;
    if (o.def && o.def.naval) continue;
    const d = Math.hypot(o.x - e.x, o.z - e.z); if (d < bd) { bd = d; best = o; }
  }
  return best;
}

/* ---------- feridos, médicos e cobertura ---------- */
function downUnit(t, src) {
  t.downed = true; t.hp = 1; t.bleed = 38; t.target = null; t.forced = null; t.order = 'idle'; t.dest = null;
  t.hop = null; t.medic = null; t.dragged = null; t.speedNow = 0; t.covering = null;
  blood(t.x, t.z, 1.1);
  deselect(t);
  shout(t, t.team === 'us' ? 'MÉDICO!' : 'SANITÄTER!');
  void src;
}
function updateDowned(u, dt) {
  u.bleed -= dt * (u.medic && u.medic.medState === 'heal' ? 0 : 1); u.hitT = S.time;
  const m = u.mesh, ud = m.userData;
  if (u.dragged && u.dragged.alive && !u.dragged.downed && u.dragged.patient === u) {
    const md = u.dragged, sx = Math.sin(md.heading), cz = Math.cos(md.heading);
    u.x = md.x - sx * 1.5; u.z = md.z - cz * 1.5; u.heading = md.heading + Math.PI;
    if (rand() < dt * 6) emit(u.x, groundH(u.x, u.z) + 0.2, u.z, { c: SC.biome === 'winter' ? 0xeef2f4 : 0x8a7a5a, life: 0.8, vy: 0.6, s0: 0.3, s1: 0.9, a: 0.5 });
  } else u.dragged = null;
  if (u.bleed <= 0) { u.downed = false; kill(u); return; }
  u.y = groundH(u.x, u.z);
  m.position.set(u.x, u.y + 0.25, u.z); m.rotation.y = u.heading; m.rotation.x = -Math.PI / 2 * 0.92;
  ud.armR.rotation.x = u.dragged ? -2.9 : -2.5 + Math.sin(S.time * 3 + u.id) * 0.5; ud.foreR.rotation.x = -0.3;
  ud.armL.rotation.x = u.dragged ? -2.9 : -0.3; ud.legL.rotation.x = 0.15; ud.legR.rotation.x = -0.2 + Math.sin(S.time * 1.7 + u.id) * 0.15;
  ud.shinL.rotation.x = 0.3; ud.shinR.rotation.x = 0.5;
}
function assignCoverer(medic, w) {
  let best = null, bd = 40;
  for (const e of ents) {
    if (!e.alive || e.downed || e.team !== w.team || !e.inf || e.def.medic || !(e.def.range > 0) || e.covering) continue;
    if (e.order === 'move' && e.team === 'us') continue;
    const d = Math.hypot(e.x - w.x, e.z - w.z); if (d < bd) { bd = d; best = e; }
  }
  if (!best) return;
  const th = nearestEnemy(w, 130);
  let px = w.x, pz = w.z;
  if (th) { const ax = th.x - w.x, az = th.z - w.z, al = Math.hypot(ax, az) || 1; px += ax / al * 5 + rr(-2, 2); pz += az / al * 5 + rr(-2, 2); }
  best.order = best.team === 'de' ? 'amove' : 'move'; best.dest = { x: px, z: pz }; best.hop = null; best.covering = w; best.coverUntil = S.time + 22;
  shout(best, best.team === 'us' ? 'COBRINDO!' : 'FEUERSCHUTZ!');
}
function medicGoal(u, dt) {
  let w = u.patient;
  if (w && (!w.alive || !w.downed)) { if (w.dragged === u) w.dragged = null; w = u.patient = null; u.medState = null; u.kneel = false; u.speedMul = 1; }
  if (!w) {
    if (u.order === 'move' || S.time < (u.medScan || 0)) return null;
    u.medScan = S.time + 0.7;
    let best = null, bd = 80;
    for (const e of ents) if (e.alive && e.downed && e.team === u.team && !e.medic) { const d = Math.hypot(e.x - u.x, e.z - u.z); if (d < bd) { bd = d; best = e; } }
    if (!best) return null;
    w = u.patient = best; best.medic = u; u.medState = 'go'; u.medT = S.time; assignCoverer(u, best);
    if (u.team === 'us') shout(u, 'ESTOU INDO!');
  }
  if (u.medState === 'go') {
    if (Math.hypot(w.x - u.x, w.z - u.z) < 1.7) {
      u.medState = 'drag'; u.medT = S.time; w.dragged = u; u.speedMul = 0.38;
      const th = nearestEnemy(w, 120);
      let c = null;
      if (th) {
        const ax = w.x - th.x, az = w.z - th.z, al = Math.hypot(ax, az) || 1;
        c = findCover(w.x, w.z, w.x + ax / al * 16, w.z + az / al * 16, th.x, th.z, 18, 1) || { x: w.x + ax / al * 9, z: w.z + az / al * 9 };
      }
      u.dragTo = c || { x: w.x + 0.5, z: w.z + 0.5 };
    }
    return { goal: w, stop: 1.3 };
  }
  if (u.medState === 'drag') {
    if (Math.hypot(u.dragTo.x - u.x, u.dragTo.z - u.z) < 1.4 || S.time - u.medT > 16) {
      u.medState = 'heal'; u.healT = 4.5; w.dragged = null; u.speedMul = 1;
      u.heading = Math.atan2(w.x - u.x, w.z - u.z);
    }
    return { goal: u.dragTo, stop: 1.0 };
  }
  if (u.medState === 'heal') {
    u.kneel = true; u.healT -= dt;
    if (rand() < dt * 4) emit(w.x, w.y + 0.7, w.z, { c: 0xf2f2f2, life: 0.6, vy: 1.4, s0: 0.18, s1: 0.05, a: 0.9 });
    if (u.healT <= 0) {
      w.downed = false; w.hp = Math.round(w.maxHp * 0.6); w.medic = null; w.mesh.rotation.x = 0; w.order = 'idle'; w.home = { x: w.x, z: w.z };
      u.patient = null; u.medState = null; u.kneel = false; u.home = { x: u.x, z: u.z };
      if (w.team === 'us') shout(w, 'DE VOLTA À LUTA!');
    }
    return { goal: null };
  }
  return null;
}

/* ---------- falas sobre as cabeças ---------- */
const _shoutTex = new Map();
function shoutTex(txt) {
  let t = _shoutTex.get(txt);
  if (!t) {
    t = canvasTex(256, 64, (g) => {
      g.font = 'bold 34px "Barlow Condensed", Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.lineWidth = 7; g.strokeStyle = 'rgba(20,20,16,0.9)'; g.strokeText(txt, 128, 34); g.fillStyle = '#f4ecd0'; g.fillText(txt, 128, 34);
    });
    _shoutTex.set(txt, t);
  }
  return t;
}
const shouts = [];
function shout(e, txt) {
  if ((e.team === 'de' && !e.seen) || shouts.length > 10 || S.phase === 'menu') return;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: shoutTex(txt), depthTest: false, transparent: true }));
  sp.renderOrder = 12; scene.add(sp); shouts.push({ sp, e, t: 2.2 });
}
function updShouts(dt) {
  const f = clamp(cam.dist / 90, 0.7, 2.6);
  for (let i = shouts.length - 1; i >= 0; i--) {
    const s = shouts[i]; s.t -= dt;
    if (s.t <= 0) { scene.remove(s.sp); s.sp.material.dispose(); shouts.splice(i, 1); continue; }
    s.sp.position.set(s.e.x, s.e.y + 3.6 * f + (2.2 - s.t) * 0.5, s.e.z);
    s.sp.scale.set(6 * f, 1.5 * f, 1); s.sp.material.opacity = Math.min(1, s.t * 2);
  }
}

/* ---------- atualização das unidades ---------- */
function updateUnit(u, dt) {
  if (!u.alive) { updateCorpse(u, dt); return; }
  if (u.downed) { updateDowned(u, dt); return; }
  const d = u.def;
  u.cool -= dt; u.gcool -= dt; u.mgCool -= dt; u.retarget -= dt;
  if (u.target && (!u.target.alive || u.target.downed)) u.target = null;
  if (u.forced && (!u.forced.alive || u.forced.downed)) { u.forced = null; if (u.order === 'attack') { u.order = 'idle'; u.home = { x: u.x, z: u.z }; } }
  if (u.covering && S.time > u.coverUntil) u.covering = null;
  if (u.retarget <= 0) {
    u.retarget = 0.35 + rand() * 0.25;
    if (d.range > 0) {
      if (u.order === 'attack' && u.forced) u.target = u.forced;
      else {
        const scan = u.order === 'move' ? (u.inf ? 0 : d.range) : u.order === 'hold' ? d.range + 4 : Math.max(d.vision, d.range + 10);
        u.target = scan > 0 ? findTarget(u, scan) : null;
      }
    }
    if (u.inf) {
      const moving = u.order === 'move' || u.order === 'amove' || u.order === 'attack';
      let th = u.target || (moving ? findTarget(u, d.vision || 70, true) : null);
      if (!th && u.threatSrc && u.threatSrc.alive && S.time - u.hitT < 6) th = u.threatSrc;
      u.threat = th;
      if (S.time - u.coverT > 0.5) { u.coverT = S.time; u.cover = coverAt(u.x, u.z); }
    }
  }
  let goal = null, stop = 1.2, waiting = false;
  const t = u.target;
  let tdist = 0;
  const mg = d.medic ? medicGoal(u, dt) : null;
  if (mg) { goal = mg.goal; stop = mg.stop || 1.2; }
  else if (u.banzai && t && t.unit && !t.def.naval && Math.hypot(t.x - u.x, t.z - u.z) < 38) {
    // carga banzai: corre com a baioneta sem procurar cobertura
    tdist = Math.hypot(t.x - u.x, t.z - u.z);
    if (!u.banzaiCry) { u.banzaiCry = true; shout(u, 'BANZAI!'); }
    goal = t; stop = 1.3; u.speedMul = 1.35;
    if (tdist < 2.8 && u.cool <= 0) { u.cool = 1.1; damage(t, 32, u, { dmg: 32 }); u.fireT = S.time; sfx('clank', u.x, u.z); }
  }
  else if (t) {
    tdist = Math.hypot(t.x - u.x, t.z - u.z) - (t.building ? t.r * 0.8 : 0);
    const inRange = tdist <= d.range;
    const leash = u.team === 'us' ? 32 : 48;
    const far = Math.hypot(u.home.x - u.x, u.home.z - u.z) > leash;
    if (u.order === 'move') {
      const g = u.inf ? advanceGoal(u, u.dest.x, u.dest.z, u.threat, dt) : null;
      if (g === 'wait') waiting = true; else goal = g || u.dest;
    } else if (u.order === 'attack' && d.grenade && t.building && tdist > 10) {
      const g = u.inf ? advanceGoal(u, t.x, t.z, t, dt) : null;
      if (g === 'wait') waiting = true; else { goal = g || t; stop = g ? 1.0 : 9 + t.r * 0.8; }
    } else if (inRange || u.order === 'hold') {
      if (u.inf && u.coverPt && u.order !== 'hold' && Math.hypot(u.coverPt.x - u.x, u.coverPt.z - u.z) > 1.3) { goal = u.coverPt; stop = 0.8; }
    } else if ((u.order === 'idle' || u.order === 'guard') && far) { u.target = null; goal = u.home; }
    else {
      const g = u.inf ? advanceGoal(u, t.x, t.z, t, dt) : null;
      if (g === 'wait') waiting = true; else if (g) { goal = g; stop = 1.0; } else { goal = t; stop = d.range * 0.85 + (t.building ? t.r * 0.8 : 0); }
    }
    if (inRange && (u.order !== 'move' || !u.inf || waiting)) tryFire(u, t, tdist, dt);
    if (d.grenade && u.gcool <= 0 && tdist < 15 && tdist > 3 && (u.order !== 'move' || waiting)) { throwGrenade(u, t); u.gcool = 7 + rand() * 4; }
    if (u.inf && (u.order === 'idle' || u.order === 'guard') && u.cover === 0 && S.time > (u.seekT || 0)) {
      u.seekT = S.time + 3 + rand() * 2;
      const c = findCover(u.x, u.z, t.x, t.z, t.x, t.z, 12, -14);
      if (c) { u.coverPt = c; u.home = { x: c.x, z: c.z }; }
    }
  } else {
    if (u.order === 'move' || u.order === 'amove') {
      const g = u.inf ? advanceGoal(u, u.dest.x, u.dest.z, u.threat, dt) : null;
      if (g === 'wait') {
        waiting = true;
        const th = u.threat;
        if (th && th.alive && d.range > 0) { const td = Math.hypot(th.x - u.x, th.z - u.z) - (th.building ? th.r * 0.8 : 0); if (td <= d.range) { tryFire(u, th, td, dt); u.heading = turnTo(u.heading, Math.atan2(th.x - u.x, th.z - u.z), 8 * dt); } }
      } else goal = g || u.dest;
    } else if ((u.order === 'guard' || u.order === 'idle') && Math.hypot(u.home.x - u.x, u.home.z - u.z) > 5 && !d.medic) goal = u.home;
  }
  let moving = false;
  if (goal) {
    const isDest = goal === u.dest;
    const arrived = steer(u, goal.x, goal.z, isDest ? (u.inf ? 1.2 : d.naval ? 8 : 3) : stop, dt);
    moving = !arrived;
    if (arrived && isDest && (u.order === 'move' || u.order === 'amove')) {
      u.order = u.team === 'de' ? 'guard' : 'idle'; u.home = { x: u.x, z: u.z }; u.dest = null; u.hop = null; u.coverPt = null;
    } else if (arrived && goal === u.home) u.speedNow = 0;
  } else u.speedNow = Math.max(0, u.speedNow - dt * 20);

  const ud0 = u.mesh.userData;
  if ((u.tank || d.naval) && ud0.turret) {
    let want = t ? angDiff(Math.atan2(t.x - u.x, t.z - u.z), u.heading) : 0;
    if (d.casemate) { if (t && !moving) u.heading = turnTo(u.heading, Math.atan2(t.x - u.x, t.z - u.z), d.turn * dt); want = clamp(want, -0.15, 0.15); }
    u.turretYaw = turnTo(u.turretYaw, want, (d.proj ? 1.5 : 3) * dt);
    ud0.turret.rotation.y = u.turretYaw;
    if (ud0.turrets) for (const tt of ud0.turrets) tt.rotation.y = u.turretYaw;
  } else if (u.inf && t && !moving) u.heading = turnTo(u.heading, Math.atan2(t.x - u.x, t.z - u.z), 8 * dt);

  // posição visual
  const m = u.mesh;
  if (d.naval) {
    u.y = 0;
    if (d.aa) updateAA(u, dt);
    m.position.set(u.x, 0.15 + Math.sin(S.time * 0.9 + u.id) * 0.2, u.z); m.rotation.y = u.heading;
    m.rotation.z = Math.sin(S.time * 0.7 + u.id) * 0.03; m.rotation.x = Math.sin(S.time * 0.5 + u.id) * 0.015;
    if (u.speedNow > 1) {
      const sx = Math.sin(u.heading), cz = Math.cos(u.heading), L = (m.userData.L || 30) / 2;
      if (rand() < dt * 14) emit(u.x - sx * L + rr(-1.5, 1.5), 0.3, u.z - cz * L + rr(-1.5, 1.5), { c: 0xeef3f1, life: 2.4, vx: rr(-1, 1), vz: rr(-1, 1), s0: 1.0, s1: 3.6, a: 0.65, drag: 1 });
      if (rand() < dt * 8 * u.speedNow / d.speed) emit(u.x + sx * L, 0.6, u.z + cz * L, { c: 0xeef3f1, life: 0.9, vx: rr(-3, 3), vy: 3, grav: 6, s0: 0.6, s1: 1.6, a: 0.7 });
    }
    return;
  }
  const gh = groundH(u.x, u.z);
  u.y = gh;
  if (u.inf) {
    let y = gh - (u.cover === 2 ? 0.95 : 0);
    animSoldier(u, dt, moving, !!t);
    if (u.crouch) y -= 0.5;
    m.position.set(u.x, y + (moving ? Math.abs(Math.cos(u.ph)) * 0.08 : 0), u.z); m.rotation.y = u.heading;
  } else {
    const sx = Math.sin(u.heading), cz = Math.cos(u.heading), L = (m.userData.L || 6) / 2;
    const hf = groundH(u.x + sx * L, u.z + cz * L), hb = groundH(u.x - sx * L, u.z - cz * L);
    const hl = groundH(u.x + cz * 1.5, u.z - sx * 1.5), hr = groundH(u.x - cz * 1.5, u.z + sx * 1.5);
    m.position.set(u.x, Math.max(gh, (hf + hb) / 2) + 0.02, u.z);
    m.rotation.y = u.heading; m.rotation.x = Math.atan2(hb - hf, L * 2); m.rotation.z = Math.atan2(hr - hl, 3) * 0.6;
    const ud = m.userData;
    if (ud.trackMat) ud.trackMat.map.offset.x -= u.speedNow * dt * 1.15;
    for (const w of ud.wheels) w.rotation.x += u.speedNow * dt * 2.4;
    if (ud.gun) { u.recoil = Math.max(0, u.recoil - dt * 3); ud.gun.position.z = ud.gun.userData.z0 === undefined ? (ud.gun.userData.z0 = ud.gun.position.z) : ud.gun.userData.z0 - u.recoil * 0.6; }
    if (u.speedNow > 1 && rand() < dt * 4) emit(u.x - sx * L, u.y + 1.6, u.z - cz * L, { c: 0x5a5852, life: 1.2, vy: 1.5, s0: 0.4, s1: 1.4, a: 0.35 });
  }
}

/* ---------- navios: lanchas torpedeiras alemãs ---------- */
function sbootRaid(n) {
  const targets = ents.filter(e => e.alive && e.team === 'us' && e.def.naval);
  if (!targets.length) return;
  const sides = []; for (let i = 0; i < (n || 2); i++) sides.push(i % 2 ? 1 : -1);
  for (const sx of sides) {
    const u = spawnUnit('sboot', sx * 690, 520 + rr(-40, 40), { heading: sx > 0 ? -Math.PI / 2 : Math.PI / 2 });
    const t = targets[(rand() * targets.length) | 0];
    u.order = 'amove'; u.dest = { x: t.x, z: t.z }; u.alwaysSeen = true;
  }
  toast(SC.biome === 'tropical' ? 'A frota japonesa ataca! Contratorpedeiros inimigos se aproximam.' : 'Lanchas torpedeiras S-Boot atacam os navios!', 'bad');
}

/* ---------- paraquedistas ---------- */
function dropPara(p) {
  const kind = p.kinds.shift() || 'para';
  const g = new THREE.Group();
  const s = makeSoldier('us', kind); s.position.y = 0; g.add(s);
  const chute = VM(merged('chute', B => {
    B.add(G.dome, 0xd9d6c4, 3.2, 2.0, 3.2, 0, 0, 0);
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; B.add(G.cyl8, 0x8a8a80, 0.02, 5.4, 0.02, Math.sin(a) * 1.55, -2.6, Math.cos(a) * 1.55, Math.cos(a) * 0.5, 0, -Math.sin(a) * 0.5); }
  }), g, 0, 7.4, 0, true);
  chute.scale.setScalar(0.05);
  scene.add(g);
  S.chutes.push({ g, s, chute, x: p.x, y: p.y - 2, z: p.z, vx: p.dx * 20, vz: p.dz * 20, vy: -10, open: 0, kind });
}
function updChutes(dt) {
  for (let i = S.chutes.length - 1; i >= 0; i--) {
    const c = S.chutes[i];
    c.open += dt;
    const k = smooth((c.open - 0.35) / 0.6);
    c.chute.scale.set(0.05 + k * 0.95, 0.05 + k * 0.95, 0.05 + k * 0.95);
    const vt = k > 0.5 ? -8 : -16;
    c.vy += (vt - c.vy) * Math.min(1, dt * 2.5);
    c.vx += (1.4 - c.vx) * dt * 0.8; c.vz += (0.4 - c.vz) * dt * 0.8;
    c.x += c.vx * dt; c.y += c.vy * dt; c.z += c.vz * dt;
    c.g.position.set(c.x, c.y, c.z); c.g.rotation.z = Math.sin(S.time * 1.3 + i) * 0.08;
    const ud = c.s.userData; ud.legL.rotation.x = Math.sin(S.time * 2 + i) * 0.2; ud.legR.rotation.x = -ud.legL.rotation.x; ud.armL.rotation.x = -2.8; ud.armR.rotation.x = -2.8;
    const h = groundH(c.x, c.z);
    if (c.y <= Math.max(h, 0) + 0.05) {
      scene.remove(c.g); S.chutes.splice(i, 1);
      if (h < -0.8) { S.lost++; continue; }
      const u = spawnUnit(c.kind, c.x, c.z, { heading: Math.PI });
      if (!S.paraMsg) { S.paraMsg = true; shout(u, 'NO CHÃO!'); }
    }
  }
}

function tryFire(u, t, dist, dt) {
  const d = u.def;
  if (u.tank || d.naval) {
    const err = Math.abs(angDiff(angDiff(Math.atan2(t.x - u.x, t.z - u.z), u.heading), u.turretYaw));
    if (d.coax && t.inf && dist < COAX.range && u.mgCool <= 0) {
      u.mgCool = COAX.rof * (rand() < 0.08 ? 8 : 1);
      if (err < 0.3) fireWeapon(u, t, COAX, dist);
    }
    if (err > (d.proj ? 0.07 : 0.25) || u.cool > 0) return;
  } else if (u.cool > 0) return;
  if (u.inf && Math.abs(angDiff(Math.atan2(t.x - u.x, t.z - u.z), u.heading)) > 0.4) return;
  u.cool = d.rof * (0.85 + rand() * 0.3);
  u.fireT = S.time;
  fireWeapon(u, t, d, dist);
}
function animSoldier(u, dt, moving, aiming) {
  const ud = u.mesh.userData, k = Math.min(1, dt * 12);
  u.crouch = (!moving && u.cover === 1) || !!u.kneel;
  const aim = (aiming && !moving) || S.time - u.fireT < 1.0;
  let tL = 0, tR = 0, sL = 0.08, sR = 0.08;
  if (moving) {
    u.ph += dt * Math.max(2, u.speedNow) * 1.45;
    const s = Math.sin(u.ph);
    tL = s * 0.8; tR = -s * 0.8;
    sL = 0.15 + Math.max(0, Math.sin(u.ph + 1.6)) * 1.1; sR = 0.15 + Math.max(0, -Math.sin(u.ph + 1.6)) * 1.1;
  } else if (u.crouch) { tL = -1.45; sL = 1.45; tR = 0.15; sR = 1.65; }
  ud.legL.rotation.x += (tL - ud.legL.rotation.x) * k; ud.legR.rotation.x += (tR - ud.legR.rotation.x) * k;
  ud.shinL.rotation.x += (sL - ud.shinL.rotation.x) * k; ud.shinR.rotation.x += (sR - ud.shinR.rotation.x) * k;
  let aL, aR, fL, fR, zL, zR;
  if (aim) { aL = -1.3; fL = -0.3; zL = 0.38; aR = -0.85; fR = -1.35; zR = -0.3; }
  else if (moving) { aL = -0.7; fL = -1.0; zL = 0.3; aR = -0.35; fR = -1.15; zR = -0.1; }
  else { aL = -0.55; fL = -0.75; zL = 0.25; aR = -0.25; fR = -0.95; zR = -0.05; }
  if (ud.tube) { aR = -0.3; fR = -1.9; zR = 0; if (!aim) { aL = -0.9; fL = -0.6; } }
  ud.armL.rotation.x += (aL - ud.armL.rotation.x) * k; ud.armR.rotation.x += (aR - ud.armR.rotation.x) * k;
  ud.foreL.rotation.x += (fL - ud.foreL.rotation.x) * k; ud.foreR.rotation.x += (fR - ud.foreR.rotation.x) * k;
  ud.armL.rotation.z = zL; ud.armR.rotation.z = zR;
  if (ud.rifle && !ud.tube) {
    if (aim) { ud.rifle.position.set(0.12, 1.6, 0.42); ud.rifle.rotation.set(0, 0, 0); }
    else if (moving) { ud.rifle.position.set(0.04, 1.38, 0.3); ud.rifle.rotation.set(-0.95, 0.45, 0); }
    else { ud.rifle.position.set(0.1, 1.28, 0.36); ud.rifle.rotation.set(-0.5, 0, 0); }
  }
}
function updateCorpse(u, dt) {
  const age = S.time - u.deathT, m = u.mesh;
  if (u.inf) {
    const k = Math.min(1, age / 0.45);
    m.rotation.x = -u.fall * k * Math.PI / 2;
    m.position.y = groundH(u.x, u.z) + 0.2 * k - Math.max(0, age - 35) * 0.25;
    if (age > 40) removeEnt(u);
  } else if (age > 100) removeEnt(u);
}

/* ---------- construções ---------- */
function updateBuilding(b, dt) {
  const d = b.def, m = b.mesh;
  if (!b.alive) {
    const age = S.time - b.deathT;
    m.scale.y = Math.max(0.18, 1 - age * 0.5);
    if (age > 70) removeEnt(b);
    return;
  }
  if (!b.complete) {
    b.progress = Math.min(1, b.progress + dt / (d.time || 5));
    b.hp = Math.min(b.maxHp, b.hp + d.hp * 0.9 * dt / (d.time || 5));
    m.scale.y = 0.06 + 0.94 * b.progress;
    if (m.userData.scaffold) m.userData.scaffold.scale.y = 1 / Math.max(0.3, m.scale.y);
    if (rand() < dt * 6) emit(b.x + rr(-d.w / 2, d.w / 2), b.y + 0.5, b.z + rr(-d.d / 2, d.d / 2), { c: 0x9a8b6c, life: 1.2, vy: 1.5, s0: 0.6, s1: 2.2, a: 0.5 });
    if (b.progress >= 1) {
      b.complete = true; m.scale.y = 1; if (m.userData.scaffold) m.userData.scaffold.visible = false;
      if (b.team === 'us') { toast(d.name + ' concluído.', 'good'); refreshPanel(true); }
    }
    return;
  }
  if (d.aa) updateAA(b, dt);
  if (b.queue.length) {
    const k = b.queue[0]; b.prodT += dt;
    if (b.prodT >= UT[k].time) {
      b.prodT = 0; b.queue.shift();
      const nv = UT[k].naval;
      const sx = b.x + rr(-3, 3), sz = nv ? 372 : b.z + d.d / 2 + 3;
      const u = spawnUnit(k, sx, sz, { heading: 0 });
      const rp = nv ? { x: b.x + rr(-40, 40), z: 405 + rr(0, 30) } : b.rally || { x: b.x + rr(-8, 8), z: b.z + d.d / 2 + 14 + rr(0, 6) };
      u.order = 'move'; u.dest = { x: rp.x + rr(-4, 4), z: rp.z + rr(-4, 4) };
      refreshPanel(true);
    }
  }
  if (d.heal) {
    b.healT = (b.healT || 0) - dt;
    if (b.healT <= 0) {
      b.healT = 1;
      for (const e of ents) if (e.alive && e.inf && e.team === 'us' && e.hp < e.maxHp && Math.hypot(e.x - b.x, e.z - b.z) < d.healR) {
        e.hp = Math.min(e.maxHp, e.hp + d.heal); emit(e.x, e.y + 2.6, e.z, { c: 0xe0f0d0, life: 0.6, vy: 1.5, s0: 0.25, s1: 0.1, a: 0.9 });
      }
    }
  }
  const w = d.weapon;
  if (w) {
    b.wcool -= dt; b.retarget -= dt;
    if (b.target && !b.target.alive) b.target = null;
    if (b.retarget <= 0) { b.retarget = 0.5; b.target = findTarget(b, w.range); }
    const t = b.target, ud = m.userData;
    if (t) {
      const want = angDiff(Math.atan2(t.x - b.x, t.z - b.z), b.heading);
      if (ud.turret) { b.turretYaw = turnTo(b.turretYaw, clamp(want, -1.3, 1.3), 2.2 * dt); ud.turret.rotation.y = b.turretYaw; }
      let firing = true;
      if (w.burst) { b.burst -= dt; if (b.burst < -1.1 - rand() * 0.8) b.burst = 1.3 + rand(); firing = b.burst > 0; }
      const dist = Math.hypot(t.x - b.x, t.z - b.z);
      const inArc = Math.abs(want) < 1.45 || b.kind !== 'bunker';
      if (firing && inArc && b.wcool <= 0 && dist <= w.range + (t.r || 0)) { b.wcool = w.rof * (0.9 + rand() * 0.2); fireWeapon(b, t, w, dist); }
    }
  }
}
function canPlace(kind, x, z) {
  const d = BT[kind], r = Math.max(d.w, d.d) * 0.55;
  if (kind === 'naval') {
    if (!SC.coast) return 'Sem litoral neste cenário.';
    if (z < 282 || z > 326) return 'A Base Naval precisa ficar na praia, perto da água.';
  } else if (groundH(x, z) < 1.4 || (SC.coast && z > 300)) return 'Terreno inválido: muito perto da água.';
  let inR = false;
  for (const e of ents) if (e.building && e.alive && e.team === 'us' && e.complete) {
    const R = (e.def.buildR || 40) * (kind === 'naval' || kind === 'coastgun' ? 2.4 : 1); if (Math.hypot(e.x - x, e.z - z) < R) { inR = true; break; }
  }
  if (!inR) return 'Fora da área da base: construa perto das suas construções.';
  for (const e of ents) if (e.building && e.alive && Math.hypot(e.x - x, e.z - z) < e.r + r + 1.5) return 'Espaço ocupado por outra construção.';
  MAP.obstacles.near(x, z, _obs);
  for (const o of _obs) if (Math.hypot(o.x - x, o.z - z) < o.r + r) return 'Espaço ocupado: há edifícios aqui.';
  if (inTrench(x, z)) return 'Não dá para construir sobre a trincheira.';
  for (const e of ents) if (e.alive && e.team === 'de' && Math.hypot(e.x - x, e.z - z) < 40) return 'Inimigos muito perto.';
  const hs = [groundH(x - r, z - r), groundH(x + r, z - r), groundH(x - r, z + r), groundH(x + r, z + r)];
  if (Math.max(...hs) - Math.min(...hs) > 6) return 'Terreno muito inclinado.';
  return null;
}

/* ---------- ordens ---------- */
function orderMove(list, x, z) {
  const n = list.length; if (!n) return;
  let cx = 0, cz = 0; for (const u of list) { cx += u.x; cz += u.z; } cx /= n; cz /= n;
  let dx = x - cx, dz = z - cz; const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
  const sp = list.some(u => u.def.naval) ? 30 : list.some(u => !u.inf) ? 8 : 2.8, cols = Math.ceil(Math.sqrt(n * 1.6));
  const sorted = list.slice().sort((a, b) => (a.inf - b.inf) || (a.x - b.x));
  sorted.forEach((u, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const ox = (col - (cols - 1) / 2) * sp, oz = -row * sp;
    u.dest = { x: x + (-dz) * ox + dx * oz, z: z + dx * ox + dz * oz };
    if (u.def.naval) u.dest.z = Math.max(u.dest.z, 368);
    u.order = 'move'; u.target = null; u.forced = null; u.hop = null; u.hopWait = null; u.coverPt = null; u.covering = null;
  });
  marker(x, z, 0x9be37a);
}
function orderAttack(list, t) {
  for (const u of list) { u.order = 'attack'; u.forced = t; u.target = t; u.dest = null; u.home = { x: u.x, z: u.z }; }
  marker(t.x, t.z, 0xe0573f);
}
const markers = [];
for (let i = 0; i < 4; i++) { const m = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.visible = false; scene.add(m); markers.push({ m, t: 0 }); }
let markerIdx = 0;
function marker(x, z, color) {
  const k = markers[markerIdx++ % markers.length];
  k.m.material.color.setHex(color); k.m.position.set(x, surfaceH(x, z) + 0.4, z); k.t = 0.7; k.m.visible = true;
}
function updMarkers(dt) {
  for (const k of markers) {
    if (!k.m.visible) continue; k.t -= dt;
    if (k.t <= 0) { k.m.visible = false; continue; }
    const s = 1 + k.t * 5; k.m.scale.set(s, s, 1); k.m.material.opacity = k.t / 0.7;
  }
}

/* ---------- seleção ---------- */
function setSel(list) {
  for (const e of selected) { e.sel = false; if (e.ring) e.ring.visible = false; }
  selected = list.filter(e => e.alive && !e.downed && e.team === 'us');
  for (const e of selected) {
    e.sel = true;
    if (!e.ring) {
      e.ring = new THREE.Mesh(ringGeo, ringMat.us); e.ring.rotation.x = -Math.PI / 2;
      const s = e.building ? e.r * 1.15 : e.inf ? 1.1 : e.r * 1.25;
      e.ring.scale.set(s, s, 1); e.ring.position.y = 0.25; e.ring.renderOrder = 2; e.mesh.add(e.ring);
    }
    e.ring.visible = true;
  }
  refreshPanel(true);
}
function deselect(e) {
  if (!e.sel) return;
  e.sel = false; if (e.ring) e.ring.visible = false;
  const i = selected.indexOf(e); if (i >= 0) { selected.splice(i, 1); refreshPanel(true); }
}
function onScreen(e) {
  TV.set(e.x, e.y + 1, e.z).project(camera);
  return TV.z < 1 && Math.abs(TV.x) < 1.05 && Math.abs(TV.y) < 1.05;
}

/* ---------- barras de vida ---------- */
function updBars() {
  const f = clamp(cam.dist / 110, 0.75, 2.4);
  for (const e of ents) {
    const show = e.alive && e.seen && (e.sel || S.time - e.hitT < 6 || (e.building && (!e.complete || (e.hp < e.maxHp && e.team === 'us'))));
    if (!show) { if (e.bar) e.bar.visible = false; continue; }
    if (!e.bar) {
      const g = new THREE.Group(), bg = new THREE.Mesh(G.plane, barBg), fg = new THREE.Mesh(G.plane, barFg[0]);
      bg.renderOrder = 10; fg.renderOrder = 11; g.add(bg, fg); g.userData.fg = fg; g.userData.bg = bg; e.bar = g; scene.add(g);
    }
    const w = (e.inf ? 1.8 : e.building ? clamp(e.r * 1.1, 5, 14) : e.def.naval ? 12 : 4.5) * (e.building ? 1 : f), h = 0.34 * (e.building ? Math.max(1, f * 0.8) : f);
    const yo = e.inf ? 2.8 + f * 0.4 : e.building ? (e.kind === 'dehq' ? 20 : 8.5) : e.def.naval ? 13 : 4.8;
    const frac = clamp(e.hp / e.maxHp, 0, 1), ud = e.bar.userData;
    e.bar.visible = true; e.bar.position.set(e.x, e.y + yo, e.z); e.bar.quaternion.copy(camera.quaternion);
    ud.bg.scale.set(w + 0.2, h + 0.16, 1);
    ud.fg.scale.set(Math.max(0.01, w * frac), h, 1); ud.fg.position.x = -w * (1 - frac) / 2;
    ud.fg.material = e.team === 'de' ? barFg[2] : frac > 0.6 ? barFg[0] : frac > 0.3 ? barFg[1] : barFg[2];
  }
}

/* ---------- névoa de guerra ---------- */
function updVisibility() {
  const viewers = [];
  for (const e of ents) if (e.alive && e.team === 'us') viewers.push(e);
  for (const e of ents) {
    if (e.team !== 'de' || !e.alive) continue;
    let vis = e.alwaysSeen || S.time - e.revealT < 2.5;
    if (!vis) for (const v of viewers) {
      const r = (v.def.vision || 60) + e.r, dx = v.x - e.x, dz = v.z - e.z;
      if (dx * dx + dz * dz < r * r) { vis = true; break; }
    }
    if (vis && e.building) e.discovered = true;
    e.seen = vis || !!e.discovered;
    e.mesh.visible = e.seen || S.phase === 'menu';
  }
}

/* ---------- fase 1: desembarque ---------- */
function newBoat(x, z, troops) {
  const road = !SC.coast;
  const mesh = road ? VM(merged('convoyTruck', B => bTruck(B, 0, 0, 0)), null, 0, 0, 0, true) : makeLCVP(troops.length);
  if (road) mesh.userData = {};
  mesh.rotation.y = Math.PI; mesh.position.set(x, road ? groundH(x, z) : 0.2, z); scene.add(mesh);
  const b = { mesh, x, z, tz: road ? 296 + rr(-8, 8) : SHORE_Z + 2, state: 'in', t: 0, troops, unloaded: 0, speed: road ? 15 : 13, road };
  S.boats.push(b); return b;
}
function updateBoats(dt) {
  for (let i = S.boats.length - 1; i >= 0; i--) {
    const b = S.boats[i], ud = b.mesh.userData;
    if (b.state === 'in') {
      const sp = clamp((b.z - b.tz) * 0.45 + 3, 3, b.speed);
      b.z -= sp * dt;
      if (b.road) { if (rand() < dt * 10) emit(b.x + rr(-1.2, 1.2), groundH(b.x, b.z) + 0.4, b.z + 3.5, { c: SC.biome === 'winter' ? 0xe8ecef : 0xb8a37c, life: 1.2, vy: 1.2, s0: 0.7, s1: 2.4, a: 0.5 }); }
      else if (rand() < dt * 8) emit(b.x + rr(-1.5, 1.5), 0.3, b.z - 5.8, { c: 0xe9efee, life: 0.9, vx: rr(-3, 3), vy: 2, vz: 3, grav: 6, s0: 0.5, s1: 1.4, a: 0.7 });
      if (b.z <= b.tz) { b.z = b.tz; b.state = 'ramp'; b.t = 0; sfx('clank', b.x, b.z); }
    } else if (b.state === 'ramp') {
      b.t += dt; if (ud.ramp) ud.ramp.rotation.x = smooth(b.t / 0.7) * 1.45;
      if (b.t > 0.8) {
        b.state = 'unload'; b.t = 0;
        if (!S.rampMsg) {
          S.rampMsg = true; cam.follow = null; cam.tDist = 105; cam.tPitch = 0.82;
          toast(b.road ? 'DESEMBARCAR! Corram para a cobertura das pedras e toras.' : 'RAMPA ABAIXADA! Corra para a cobertura dos obstáculos.', 'bad');
        }
      }
    } else if (b.state === 'unload') {
      b.t += dt;
      while (b.unloaded < b.troops.length && b.t > b.unloaded * 0.32) {
        const i2 = b.unloaded++, side = i2 % 2 ? -0.8 : 0.8;
        if (ud.troops && ud.troops[i2]) ud.troops[i2].visible = false;
        const u = spawnUnit(b.troops[i2], b.x + side, b.road ? b.z + 4.2 : b.z - 6.4);
        u.order = 'move'; u.dest = { x: b.x + rr(-12, 12), z: b.z - 24 - rr(0, 14) };
      }
      if (b.unloaded >= b.troops.length && b.t > b.troops.length * 0.32 + 2.5) { b.state = 'out'; b.t = 0; }
    } else if (b.state === 'out') {
      b.t += dt; if (ud.ramp) ud.ramp.rotation.x = Math.max(0, 1.45 - b.t);
      b.z += Math.min(10, b.t * 3) * dt;
      if (b.z > (b.road ? 640 : 760)) { scene.remove(b.mesh); S.boats.splice(i, 1); continue; }
    }
    if (b.road) {
      b.mesh.position.set(b.x, groundH(b.x, b.z) + Math.abs(Math.sin(S.time * 9 + b.x)) * 0.05 * (b.state === 'in' ? 1 : 0), b.z);
      b.mesh.rotation.x = Math.atan2(groundH(b.x, b.z + 3) - groundH(b.x, b.z - 3), 6);
    } else {
      b.mesh.position.set(b.x, 0.18 + Math.sin(S.time * 2 + b.x) * 0.16, b.z);
      b.mesh.rotation.z = Math.sin(S.time * 1.6 + b.x) * 0.03; b.mesh.rotation.x = Math.sin(S.time * 1.3 + b.x * 0.3) * 0.02;
    }
  }
}
const LANES = [-235, -150, -60, 40, 165, 250];
const ROAD_LANES = [-222, 22, 176];
function boatTroops(n, baz) {
  const t = [];
  for (let i = 0; i < n; i++) t.push(i < baz ? 'bazooka' : i === baz ? 'medic' : 'rifle');
  return t.reverse();
}
function startLanding() {
  S.phase = 'landing'; S.t = 0; S.startedAt = S.time;
  $('intro').hidden = true; $('hud').hidden = false;
  const road = !SC.coast;
  (road ? ROAD_LANES : [-235, -60, 165]).forEach((x, i) => newBoat(x + (road ? 0 : rr(-8, 8)), (road ? 560 : 470) + i * 14, boatTroops(6, 1)));
  S.reinf = [{ t: 40, n: 2 }, { t: 80, n: 2 }, { t: 125, n: 1 }];
  cam.follow = () => { let x = 0, z = 0, n = 0; for (const b of S.boats) if (b.state !== 'out') { x += b.x; z += b.z; n++; } return n ? { x: x / n, z: z / n - 30 } : null; };
  cam.x = -40; cam.z = road ? 520 : 440; cam.dist = 90; cam.pitch = 0.42; cam.yaw = 0; cam.tDist = 125; cam.tPitch = 0.55;
  setPhaseText(road ? 'FASE 1 · CHEGADA DO COMBOIO' : 'FASE 1 · DESEMBARQUE', objective1(0));
  toast(road ? 'O comboio chega pela estrada. Preparem-se para desembarcar!' : 'Hora H — as barcaças Higgins se aproximam da praia.');
  later(7, () => toast('Dica: toque em APOIO para chamar ' + (SC.coast ? 'destróieres, ' : '') + 'caças P-47 ou paraquedistas.'));
}
function objective1(done) { return 'Destrua as 4 ' + (SC.coast ? 'casamatas ' + foe().pl.replace('ses', 'sas').replace('ães', 'ãs') + ' na praia' : 'posições ' + foe().pl.replace('ães', 'ãs') + ' na colina') + ' (' + done + '/4).'; }
function updateLanding(dt) {
  updateBoats(dt);
  for (let i = S.reinf.length - 1; i >= 0; i--) {
    if (S.t >= S.reinf[i].t) {
      const r = S.reinf.splice(i, 1)[0];
      for (let k = 0; k < r.n; k++) {
        if (SC.coast) newBoat(LANES[(rand() * LANES.length) | 0] + rr(-10, 10), 600 + k * 20, boatTroops(6, 1 + (rand() < 0.5)));
        else newBoat(ROAD_LANES[(rand() * 3) | 0] + rr(-5, 5), 600 + k * 24, boatTroops(6, 1 + (rand() < 0.5)));
      }
      toast(SC.coast ? 'Nova onda de barcaças a caminho!' : 'Mais caminhões com reforços a caminho!', 'good');
    }
  }
  if (SC.coast && !S.ddArrived && S.t > 45) {
    S.ddArrived = true;
    for (const [x, z, tx] of [[-200, 760, -180], [170, 800, 150]]) { const u = spawnUnit('destroyer', x, z, { heading: Math.PI }); u.order = 'move'; u.dest = { x: tx, z: 392 }; }
    toast('Contratorpedeiros se aproximam da costa! Selecione-os e toque no mar para movê-los.', 'good');
  }
  if (SC.coast && !S.sbootDone && S.t > 115) { S.sbootDone = true; sbootRaid(2); if (SC.biome === 'tropical') later(20, () => kamikazeRaid(2)); }
  const alive = S.bunkers.filter(b => b.alive).length;
  S.artT -= dt;
  if (S.artT <= 0 && alive > 0) {
    S.artT = 1.6 + (4 - alive) * 1.1 + rand() * 1.8;
    const beach = ents.filter(e => e.alive && e.team === 'us' && e.unit && !e.def.naval && e.z > 205);
    let x, z;
    if (beach.length && rand() < 0.75) { const v = beach[(rand() * beach.length) | 0]; const a = rand() * 6.28, m = rr(6, 20); x = v.x + Math.cos(a) * m; z = v.z + Math.sin(a) * m; }
    else { x = rr(-450, 450); z = rr(240, 330); }
    artilleryShell(x, z);
  }
  S.splashT -= dt;
  if (S.splashT <= 0) {
    S.splashT = 0.6 + rand() * 0.9;
    const bs = S.boats.filter(b => b.state === 'in');
    if (bs.length) { const b = bs[(rand() * bs.length) | 0]; const x = b.x + rr(-25, 25), z = b.z + rr(-30, 20); explosion(x, surfaceH(x, z), z, rr(0.8, 1.3)); }
  }
  setPhaseText(null, objective1(4 - alive));
  if (alive === 0) { toast(SC.coast ? 'PRAIA ASSEGURADA! As casamatas caíram.' : 'COLINA TOMADA! As posições inimigas caíram.', 'good'); startLST(); return; }
  const usAlive = ents.some(e => e.alive && e.team === 'us' && !e.def.naval);
  const pending = S.reinf.length || S.boats.some(b => b.state !== 'out');
  if (!usAlive && !pending) endGame(false, 'A primeira onda foi aniquilada. As posições inimigas resistiram.');
}
function artilleryShell(x, z) {
  whistle(x, z);
  later(0.95, () => { explosion(x, surfaceH(x, z), z, 1.1); if (groundH(x, z) > -0.3) areaDamage(x, z, ARTY.splash, ARTY.dmg, 'de', ARTY, null); });
}

/* ---------- LST (litoral) ou comboio de engenharia (estrada) com o veículo de construção ---------- */
function startLST() {
  S.phase = 'lst'; S.cine = true; S.lstT = 0;
  $('letterbox').hidden = false; $('skip').hidden = false;
  setSel([]); cancelPlacing(); S.strike = null; S.supportOpen = false;
  if (!SC.coast) {
    S.lst = { convoy: true, state: 'drive', t: 0 };
    const dz = spawnUnit('dozer', 22, 600, { heading: Math.PI }); dz.order = 'move'; dz.dest = { x: 22, z: 268 }; S.dozer = dz;
    later(2.5, () => { const s = spawnUnit('sherman', 22, 610, { heading: Math.PI }); s.order = 'move'; s.dest = { x: 6, z: 276 }; });
    later(5, () => { const s = spawnUnit('sherman', 22, 610, { heading: Math.PI }); s.order = 'move'; s.dest = { x: 38, z: 276 }; });
    cam.follow = () => S.dozer && S.dozer.alive ? { x: S.dozer.x, z: S.dozer.z + 10 } : null;
    cam.tDist = 90; cam.tPitch = 0.5; cam.yaw = -0.35;
    setPhaseText('FASE 2 · CABEÇA DE PONTE', 'Um comboio de engenharia traz o Veículo de Construção.');
    toast('O comboio de engenharia chegou!', 'good');
    return;
  }
  const m = makeLST(); m.rotation.y = Math.PI; scene.add(m);
  S.lst = { mesh: m, x: 20, z: 820, tz: SHORE_Z + 47, state: 'in', t: 0, step: 0 };
  cam.follow = () => S.lst && S.lst.state === 'in' ? { x: S.lst.x + 30, z: S.lst.z - 75 } : null;
  cam.tDist = 160; cam.tPitch = 0.42; cam.yaw = -0.35;
  setPhaseText('FASE 2 · CABEÇA DE PRAIA', 'Um LST está chegando com o Veículo de Construção.');
}
function updateLST(dt) {
  const L = S.lst; if (!L) return;
  if (L.convoy) {
    L.t += dt;
    if (L.state === 'drive' && (L.t > 26 || (S.dozer && S.dozer.alive && S.dozer.z < 280))) finishLST();
    if (L.state === 'leave') S.lst = null;
    return;
  }
  const ud = L.mesh.userData;
  if (L.state === 'in') {
    L.z -= clamp((L.z - L.tz) * 0.22, 3, 24) * dt;
    if (rand() < dt * 10) emit(L.x + rr(-7, 7), 0.4, L.z - 46, { c: 0xe9efee, life: 1.2, vx: rr(-5, 5), vy: 3, vz: 2, grav: 6, s0: 0.8, s1: 2.5, a: 0.7 });
    if (L.z <= L.tz + 0.2) { L.z = L.tz; L.state = 'open'; L.t = 0; sfx('clank', L.x, L.z - 45); }
  } else if (L.state === 'open') {
    L.t += dt; const k = smooth(L.t / 2);
    ud.doorL.rotation.y = -1.45 * k; ud.doorR.rotation.y = 1.45 * k;
    ud.ramp.rotation.x = lerp(-Math.PI / 2, 0.12, smooth((L.t - 1.2) / 1.6));
    if (L.t > 3) { L.state = 'unload'; L.t = 0; }
  } else if (L.state === 'unload') {
    L.t += dt; const bz = L.z - 48;
    if (L.step === 0) {
      L.step = 1; const dz = spawnUnit('dozer', L.x, bz); dz.order = 'move'; dz.dest = { x: L.x, z: 262 }; S.dozer = dz;
      cam.follow = () => S.dozer && S.dozer.alive ? { x: S.dozer.x, z: S.dozer.z + 10 } : null; cam.tDist = 75; cam.tPitch = 0.6;
      toast('O Veículo de Construção desembarcou!', 'good');
    }
    if (L.step === 1 && L.t > 2.6) { L.step = 2; const s = spawnUnit('sherman', L.x, bz); s.order = 'move'; s.dest = { x: L.x - 16, z: 268 }; }
    if (L.step === 2 && L.t > 4.8) { L.step = 3; const s = spawnUnit('sherman', L.x, bz); s.order = 'move'; s.dest = { x: L.x + 16, z: 268 }; }
    if (L.step === 3 && L.t > 7.5) finishLST();
  } else if (L.state === 'leave') {
    L.t += dt;
    if (L.t > 4) {
      const k = smooth((L.t - 4) / 2);
      ud.doorL.rotation.y = -1.45 * (1 - k); ud.doorR.rotation.y = 1.45 * (1 - k); ud.ramp.rotation.x = lerp(0.12, -Math.PI / 2, k);
      if (L.t > 6) L.z += Math.min(9, (L.t - 6) * 2) * dt;
      if (L.z > 1000) { scene.remove(L.mesh); S.lst = null; return; }
    }
  }
  L.mesh.position.set(L.x, 0.5 + Math.sin(S.time * 0.9) * 0.12, L.z);
  L.mesh.rotation.z = Math.sin(S.time * 0.7) * 0.01;
}
function skipCine() {
  const L = S.lst; if (!L) return;
  if (L.convoy) {
    for (const e of ents) if (e.alive && e.team === 'us' && e.unit && e.dest && e.z > 300) { e.x = e.dest.x; e.z = e.dest.z + 4; }
    finishLST(); return;
  }
  if (L.state === 'in') L.z = L.tz;
  else if (L.state === 'open') L.t = 3;
  else if (L.state === 'unload') {
    while (L.step < 3) { L.t = 99; updateLST(0); }
    if (S.dozer) { S.dozer.x = L.x; S.dozer.z = 262; }
    finishLST();
  }
}
function finishLST() {
  const L = S.lst; if (!L || L.state === 'leave') return;
  L.state = 'leave'; L.t = 0;
  S.phase = 'deploy'; S.cine = false; $('letterbox').hidden = true; $('skip').hidden = true;
  cam.follow = null; cam.tDist = 95; cam.tPitch = 0.85;
  if (S.dozer && S.dozer.alive) { cam.x = S.dozer.dest ? S.dozer.dest.x : S.dozer.x; cam.z = 250; }
  if (S.dozer && S.dozer.alive) setSel([S.dozer]);
  setPhaseText(SC.coast ? 'FASE 2 · CABEÇA DE PRAIA' : 'FASE 2 · CABEÇA DE PONTE', 'Leve o Veículo de Construção para um local seguro e toque em MONTAR BASE.');
  toast(SC.coast ? 'Escolha um local no alto da praia ou da falésia e monte a base.' : 'Escolha um local perto da estrada e monte a base.');
}
function validHQ(x, z) {
  if (groundH(x, z) < 1.2 || (SC.coast && z > 300)) return 'Aqui não dá: leve o veículo para longe da água.';
  MAP.obstacles.near(x, z, _obs);
  for (const o of _obs) if (Math.hypot(o.x - x, o.z - z) < o.r + 9) return 'Espaço ocupado: afaste-se dos edifícios.';
  if (inTrench(x, z)) return 'Saia de cima da trincheira para montar a base.';
  for (const e of ents) if (e.alive && e.team === 'de' && Math.hypot(e.x - x, e.z - z) < 45) return 'Inimigos muito perto: limpe a área primeiro.';
  return null;
}
function deployHQ() {
  const d = S.dozer; if (!d || !d.alive) return;
  const err = validHQ(d.x, d.z); if (err) { toast(err, 'bad'); return; }
  const x = d.x, z = d.z; removeEnt(d); S.dozer = null;
  const hq = spawnBuilding('hq', x, z, { complete: false });
  S.usHQ = hq; S.phase = 'base'; S.supplies = 1200; S.waveT = 150; S.baseAt = S.time;
  $('bBuild').hidden = false;
  setSel([hq]);
  toast('Base montada! Construa um Depósito e um Quartel.', 'good');
  setPhaseText('FASE 3 · AVANÇO', 'Capture as vilas e destrua o quartel-general ' + foe().adj + ' em ' + hqTown() + '.');
}

/* ---------- fase 3: base, vilas e contra-ataques ---------- */
function makeCP(t) {
  const g = new THREE.Group(); g.position.set(t.x, groundH(t.x, t.z), t.z);
  P(G.cyl8, 0x8a8a84, 0.12, 12, 0.12, 0, 6, 0, g);
  P(G.box, 0x6e6658, 2.4, 0.6, 2.4, 0, 0.3, 0, g);
  const cloth = new THREE.Mesh(G.plane, decalMat(foeFlag())); cloth.scale.set(3.6, 2.4, 1); cloth.position.set(1.85, 10.6, 0); g.add(cloth);
  scene.add(g);
  const ring = new THREE.Mesh(new THREE.RingGeometry(29, 30, 64), new THREE.MeshBasicMaterial({ color: 0xe0573f, transparent: true, opacity: 0.5, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.set(t.x, groundH(t.x, t.z) + 0.6, t.z); scene.add(ring);
  return { town: t, x: t.x, z: t.z, owner: 'de', prog: -1, cloth, ring, g };
}
function updCPs() {
  if (S.phase !== 'base') return;
  for (const c of S.cps) {
    let us = 0, de = 0;
    for (const e of ents) if (e.alive && e.unit && !e.downed && Math.abs(e.x - c.x) < 30 && Math.abs(e.z - c.z) < 30 && Math.hypot(e.x - c.x, e.z - c.z) < 30) { if (e.team === 'us') us++; else de++; }
    if (us && !de) c.prog = Math.min(1, c.prog + 0.5 / 7);
    else if (de && !us) c.prog = Math.max(-1, c.prog - 0.5 / 7);
    if (c.prog >= 1 && c.owner !== 'us') { c.owner = 'us'; toast(c.town.name + ' libertada! +6 suprimentos/s', 'good'); }
    if (c.prog <= -1 && c.owner !== 'de') { c.owner = 'de'; toast(c.town.name + ' foi retomada pelos ' + foe().pl + '!', 'bad'); }
    const k = Math.abs(c.prog);
    c.cloth.material = decalMat(c.prog >= 0 ? TEX.usflag : foeFlag());
    c.cloth.position.y = 2 + k * 8.6;
    c.ring.material.color.setHex(c.owner === 'us' ? 0x8fd16f : 0xe0573f);
  }
}
function income() {
  let inc = 0;
  for (const e of ents) if (e.alive && e.building && e.team === 'us' && e.complete && e.def.income) inc += e.def.income;
  for (const c of S.cps) if (c.owner === 'us') inc += 6;
  return inc;
}
function spawnWave(n) {
  const hq = S.deHQ; if (!hq || !hq.alive) return;
  let src = hq, best = Infinity;
  const tgt = S.usHQ && S.usHQ.alive ? S.usHQ : ents.find(e => e.alive && e.team === 'us' && e.building);
  if (!tgt) return;
  for (const c of S.cps) if (c.owner === 'de') { const d = Math.hypot(c.x - tgt.x, c.z - tgt.z); if (d < best && d > 160) { best = d; src = c; } }
  const comp = [];
  for (let i = 0; i < Math.min(4 + 2 * n, 16); i++) comp.push('gren');
  if (n >= 3) comp.push('pzschreck', 'pzschreck');
  if (n >= 2) for (let i = 0; i < Math.min(Math.floor((n + 1) / 2), 4); i++) comp.push('panzer4');
  if (n >= 4 && n % 2 === 0) comp.push('tiger');
  if (n >= 8) comp.push('tiger');
  comp.push('sani');
  if (n >= 2) comp.push('sdkfz251');
  if (n >= 5) comp.push('sdkfz251');
  if (n >= 3) comp.push('stug');
  if (n >= 6) comp.push('stug');
  comp.forEach((k) => {
    const u = spawnUnit(k, src.x + rr(-22, 22), src.z + rr(10, 30), { heading: 0 });
    u.order = 'amove'; u.dest = { x: tgt.x + rr(-18, 18), z: tgt.z + rr(-18, 18) }; u.wave = true;
    if (u.kind === 'jinf' && rand() < 0.5) u.banzai = true;
  });
  toast((SC.biome === 'tropical' ? 'Contra-ataque japonês com cargas banzai!' : 'Contra-ataque ' + foe().adj + '!') + ' Onda ' + n + ' saindo de ' + (src === hq ? hqTown() : src.town.name) + '.', 'bad');
}
function waveRetarget() {
  const targets = ents.filter(e => e.alive && e.team === 'us' && e.building);
  for (const u of ents) {
    if (!u.alive || !u.wave || u.order !== 'amove') continue;
    if (u.dest && targets.some(t => Math.hypot(t.x - u.dest.x, t.z - u.dest.z) < 30)) continue;
    let best = null, bd = Infinity;
    for (const t of targets) { const d = Math.hypot(t.x - u.x, t.z - u.z); if (d < bd) { bd = d; best = t; } }
    if (best) u.dest = { x: best.x + rr(-10, 10), z: best.z + rr(-10, 10) };
  }
}
function updateBase(dt) {
  S.supplies += income() * dt;
  S.waveT -= dt;
  if (S.waveT <= 0 && S.deHQ && S.deHQ.alive) { S.wave++; spawnWave(S.wave); S.waveT = Math.max(55, 105 - S.wave * 6); }
  S.retT = (S.retT || 0) - dt; if (S.retT <= 0) { S.retT = 5; waveRetarget(); }
  const freed = S.cps.filter(c => c.owner === 'us').length;
  const mm = Math.floor(Math.max(0, S.waveT) / 60), ss = Math.floor(Math.max(0, S.waveT) % 60);
  setPhaseText(null, 'Destrua o QG ' + foe().adj + ' em ' + hqTown() + '. Vilas libertadas: ' + freed + '/4. Contra-ataque em ' + mm + ':' + String(ss).padStart(2, '0') + '.');
  if (S.deHQ && !S.deHQ.alive) endGame(true, 'O quartel-general ' + foe().adj + ' em ' + hqTown() + ' caiu. A operação foi um sucesso e o caminho para o interior está aberto.');
  else if (S.usHQ && !S.usHQ.alive) endGame(false, 'O Centro de Comando foi destruído. Sem comando, a cabeça de praia não resistiu ao contra-ataque.');
}

/* ---------- guarnições alemãs ---------- */
const GAR_EXTRA = [['sdkfz251'], ['stug'], [], ['sdkfz251', 'stug'], ['stug', 'sdkfz251']];
function spawnWrecks() {
  const put = (mesh, x, z, ry, rx, rz, sink) => {
    const h = groundH(x, z); mesh.position.set(x, Math.max(h, -0.6) - sink, z); mesh.rotation.order = 'YXZ'; mesh.rotation.set(rx, ry, rz);
    charMesh(mesh); scene.add(mesh); S.wrecks.push(mesh);
    FX.emitters.push({ x, y: Math.max(h, 0) + 2, z, until: 1e12, t: rand(), fire: rand() < 0.5, s: 0.7 });
  };
  put(makeTank('sherman'), -330, SC.coast ? 292 : 300, 2.6, 0.05, 0.12, 0.2);
  put(makeTank('sherman'), 95, SC.coast ? 300 : 286, -2.9, -0.04, -0.1, 0.25);
  if (SC.coast) {
    put(makeLCVP(0), -120, 334, 0.4, 0.1, 0.2, 0.35);
    put(makeLCVP(0), 300, 332, -0.5, -0.08, -0.22, 0.3);
    put(makeLCVP(0), -470, 336, 2.8, 0.06, 0.28, 0.4);
  } else {
    put(VM(merged('convoyTruck', B => bTruck(B, 0, 0, 0)), null, 0, 0, 0, true), -150, 310, 0.6, 0, 0.2, 0.1);
    put(VM(merged('convoyTruck', B => bTruck(B, 0, 0, 0)), null, 0, 0, 0, true), 260, 300, -0.9, 0, -0.15, 0.1);
    put(makeTank('panzer4'), -40, 250, 0.3, 0.05, 0.1, 0.15);
  }
}
function spawnGermans() {
  spawnWrecks();
  spawnBuilding('flak_de', 20, 138, { complete: true });
  for (const [x, z] of MAP.bunkerSpots) { const b = spawnBuilding('bunker', x, z, { complete: true }); b.alwaysSeen = true; S.bunkers.push(b); }
  const bluff = MAP.trenchSpots.filter(p => p[1] > 150).sort(() => rand() - 0.5).slice(0, 18);
  for (const p of bluff) spawnUnit('gren', p[0], p[1], { order: 'hold' });
  const line2 = MAP.trenchSpots.filter(p => p[1] < -300 && p[1] > -360).sort(() => rand() - 0.5);
  if (line2.length >= 14) {
    line2.slice(0, 12).forEach(p => spawnUnit('gren', p[0], p[1], { order: 'hold' }));
    line2.slice(12, 14).forEach(p => spawnBuilding('nest_de', p[0], p[1] - 4, { complete: true }));
  } else {
    // sem linha de trincheiras: postos avançados nas sebes, pedras e casas
    for (let i = 0; i < 12; i++) { const x = rr(-420, 420), z = -330 + rr(-14, 14), c = findCover(x, z, x, z - 1, x, z + 40, 14, -20) || { x, z }; spawnUnit('gren', c.x, c.z, { order: 'guard' }); }
    for (const x of [-180, 200]) { let z = -330; MAP.obstacles.near(x, z, _obs); if (_obs.some(o => Math.hypot(o.x - x, o.z - z) < o.r + 6)) z += 20; spawnBuilding('nest_de', x, z, { complete: true }); }
  }
  const gar = [[6, 0, 1, 0, 1], [6, 1, 0, 0, 1], [5, 0, 1, 0, 0], [8, 2, 1, 0, 2], [12, 2, 0, 1, 2]];
  MAP.towns.forEach((t, ti) => {
    const [g, p4, nest, tig, ps] = gar[ti];
    const at = (k) => { const a = rand() * 6.28, d = rr(6, 20); spawnUnit(k, t.x + Math.cos(a) * d, t.z + Math.sin(a) * d, { order: 'guard' }); };
    for (let i = 0; i < g; i++) at('gren');
    for (let i = 0; i < ps; i++) at('pzschreck');
    at('sani');
    for (let i = 0; i < p4; i++) at('panzer4');
    for (let i = 0; i < tig; i++) at('tiger');
    for (const k of GAR_EXTRA[ti]) at(k);
    if (nest) spawnBuilding('nest_de', t.x + 8, t.z + 9, { complete: true });
    if (ti === 3 || ti === 1) spawnBuilding('flak_de', t.x - 14, t.z + 13, { complete: true });
    if (t.cp) S.cps.push(makeCP(t));
    if (t.hq) {
      S.deHQ = spawnBuilding('dehq', t.x, t.z - 6, { complete: true });
      spawnBuilding('bunker', t.x - 45, t.z + 70, { complete: true });
      spawnBuilding('flak_de', t.x + 32, t.z + 30, { complete: true });
      spawnBuilding('flak_de', t.x - 34, t.z - 30, { complete: true });
      spawnBuilding('bunker', t.x + 45, t.z + 70, { complete: true });
      const ringSpots = MAP.trenchSpots.filter(p => Math.hypot(p[0] - t.x, p[1] - t.z) > 90 && Math.hypot(p[0] - t.x, p[1] - t.z) < 140).sort(() => rand() - 0.5).slice(0, 10);
      ringSpots.forEach(p => spawnUnit('gren', p[0], p[1], { order: 'hold' }));
      for (let i = ringSpots.length; i < 10; i++) { const a = rand() * Math.PI, x = t.x + Math.cos(a) * 110, z = t.z + Math.sin(a) * 95; spawnUnit('gren', x, z, { order: 'guard' }); }
    }
    if (t.cp) for (let i = 0; i < 4; i++) {
      const c = { x: t.x + rr(-20, 20), z: t.z + rr(-20, 20), mesh: makeSoldier('civ'), ph: rand() * 6, dest: null, wait: rand() * 4, town: t, flee: null, heading: 0 };
      c.mesh.position.set(c.x, groundH(c.x, c.z), c.z); scene.add(c.mesh); civs.push(c);
    }
  });
}
function updCivs(dt) {
  for (const c of civs) {
    let goal = null, spd = 2.2;
    if (c.flee && S.time < c.flee.t) { goal = c.flee; spd = 6; }
    else {
      c.flee = null;
      if (!c.dest) { c.wait -= dt; if (c.wait <= 0) { const a = rand() * 6.28, d = rr(4, c.town.r * 0.8); c.dest = { x: c.town.x + Math.cos(a) * d, z: c.town.z + Math.sin(a) * d }; } }
      goal = c.dest;
    }
    const ud = c.mesh.userData;
    if (goal) {
      const dx = goal.x - c.x, dz = goal.z - c.z, d = Math.hypot(dx, dz);
      if (d < 1) { c.dest = null; c.wait = rr(2, 7); }
      else {
        c.heading = turnTo(c.heading, Math.atan2(dx, dz), 6 * dt);
        c.x += Math.sin(c.heading) * spd * dt; c.z += Math.cos(c.heading) * spd * dt;
        MAP.obstacles.near(c.x, c.z, _obs);
        for (const o of _obs) { const ox = c.x - o.x, oz = c.z - o.z, md = o.r + 0.6, d2 = ox * ox + oz * oz; if (d2 < md * md && d2 > 1e-6) { const q = Math.sqrt(d2); c.x = o.x + ox / q * md; c.z = o.z + oz / q * md; if (!c.flee) c.dest = null; } }
        c.ph += dt * spd * 1.6; const s = Math.sin(c.ph);
        ud.legL.rotation.x = s * 0.6; ud.legR.rotation.x = -s * 0.6; ud.armL.rotation.x = -s * 0.5; ud.armR.rotation.x = s * 0.5;
      }
    } else { ud.legL.rotation.x *= 0.8; ud.legR.rotation.x *= 0.8; ud.armL.rotation.x *= 0.8; ud.armR.rotation.x *= 0.8; }
    c.mesh.position.set(c.x, groundH(c.x, c.z), c.z); c.mesh.rotation.y = c.heading;
  }
}

/* ---------- aviação: caças, bombardeiros e antiaérea ---------- */
const AIR = {
  p47: { name: 'P-47 Thunderbolt', team: 'us', hp: 130, speed: 95, alt: 70 },
  b26: { name: 'B-26 Marauder', team: 'us', hp: 320, speed: 72, alt: 85 },
  fw190: { name: 'Fw 190', team: 'de', hp: 110, speed: 100, alt: 62 },
  c47: { name: 'C-47 Skytrain', team: 'us', hp: 260, speed: 66, alt: 62 },
  zero: { name: 'Zero A6M', team: 'de', hp: 90, speed: 105, alt: 60 },
};
const STRIKES = {
  naval: { name: 'Destróieres', desc: 'bombardeio naval', cd: 60, phases: ['landing', 'deploy', 'base'], tip: 'Toque no alvo do bombardeio naval.' },
  p47: { name: 'Caças P-47', desc: 'metralhar e foguetes', cd: 50, phases: ['landing', 'deploy', 'base'], tip: 'Toque no alvo: os P-47 vêm de trás da câmera.' },
  b26: { name: 'Bombardeiros B-26', desc: 'tapete de bombas', cd: 100, phases: ['deploy', 'base'], tip: 'Toque no alvo: as bombas caem numa faixa na direção da câmera.' },
  para: { name: 'Paraquedistas', desc: '9 homens da 101ª Aerotransportada', cd: 150, phases: ['landing', 'deploy', 'base'], tip: 'Toque no ponto de salto dos paraquedistas.' },
};
const AIR_GUN = { dmg: 9, splash: 2.4 };
const AIR_ROCKET = { dmg: 170, splash: 5, at: true };
const AIR_BOMB = { dmg: 230, splash: 11, at: true };

function spawnPlane(kind, tx, tz, dx, dz, role, side, lead) {
  const a = AIR[kind], mesh = makePlane(kind); scene.add(mesh);
  side = side || 0; lead = lead || 750;
  const ox = -dz * side, oz = dx * side;
  const base = Math.max(22, groundH(tx, tz));
  const p = {
    kind, def: a, team: a.team, role, mesh, dx, dz, tx: tx + ox, tz: tz + oz, base,
    x: tx + ox - dx * lead, z: tz + oz - dz * lead, y: base + a.alt + (role === 'flyby' ? 60 : 0), vy: 0,
    hp: a.hp, state: 'fly', gunT: 0, rockets: role === 'strafe' && kind === 'p47' ? 2 : 0,
    bombs: role === 'bomb' ? 6 : kind === 'fw190' && role === 'strafe' ? 1 : 0, bombT: 0, spin: 0, snd: null, kinds: [], dropT: 0,
  };
  S.planes.push(p); planeSound(p);
  return p;
}
function planeSound(p) {
  if (!AU.ctx || S.planes.length > 8) return;
  try {
    const o = AU.ctx.createOscillator(), f = AU.ctx.createBiquadFilter(), g = AU.ctx.createGain();
    o.type = 'sawtooth'; o.frequency.value = p.kind === 'b26' ? 48 : 62 + rand() * 8;
    f.type = 'lowpass'; f.frequency.value = 320; g.gain.value = 0;
    o.connect(f); f.connect(g); g.connect(AU.master); o.start();
    p.snd = { o, g };
  } catch (e) { p.snd = null; }
}
function removePlane(p) {
  scene.remove(p.mesh);
  if (p.snd) { try { p.snd.o.stop(); } catch (e) { /* já parado */ } p.snd = null; }
  const i = S.planes.indexOf(p); if (i >= 0) S.planes.splice(i, 1);
}
function shootDown(p) {
  if (p.state === 'down') return;
  p.state = 'down'; p.vy = -4;
  if (p.team === 'de') { S.kills++; toast(airName(p) + ' abatido!', 'good'); }
  else { S.lost++; toast(airName(p) + ' abatido pela antiaérea!', 'bad'); }
}
function dropBomb(p) {
  const m = makeBomb(); scene.add(m);
  S.bombs.push({ mesh: m, x: p.x, y: p.y - 1.2, z: p.z, vx: p.dx * p.def.speed * 0.85, vz: p.dz * p.def.speed * 0.85, vy: -2, team: p.team });
}
function updBombs(dt) {
  for (let i = S.bombs.length - 1; i >= 0; i--) {
    const b = S.bombs[i];
    b.vy -= 30 * dt; b.x += b.vx * dt; b.y += b.vy * dt; b.z += b.vz * dt;
    b.mesh.position.set(b.x, b.y, b.z); b.mesh.lookAt(b.x + b.vx, b.y + b.vy, b.z + b.vz);
    if (!b.whistled && b.vy < -12) { b.whistled = true; whistle(b.x, b.z); }
    const h = surfaceH(b.x, b.z);
    if (b.y <= h) {
      scene.remove(b.mesh); S.bombs.splice(i, 1);
      explosion(b.x, h, b.z, 1.8);
      if (groundH(b.x, b.z) > -0.3) areaDamage(b.x, b.z, AIR_BOMB.splash, AIR_BOMB.dmg, null, AIR_BOMB, null);
    }
  }
}
// distância à frente do alvo em que a bomba precisa ser solta (ela segue voando enquanto cai)
function bombLead(p) {
  const h = Math.max(1, p.y - surfaceH(p.tx, p.tz)), tFall = (2 + Math.sqrt(4 + 60 * h)) / 30;
  return p.def.speed * 0.85 * tFall;
}
function airTarget(p) {
  let best = null, bd = 24;
  for (const e of ents) {
    if (!e.alive || e.team === p.team || !e.armored) continue;
    const d = Math.hypot(e.x - p.tx, e.z - p.tz); if (d < bd) { bd = d; best = e; }
  }
  return best;
}
function updatePlane(p, dt) {
  const a = p.def, m = p.mesh;
  if (p.state === 'down') {
    p.vy -= 22 * dt; p.spin += dt * 3;
    p.x += p.dx * a.speed * 0.75 * dt; p.z += p.dz * a.speed * 0.75 * dt; p.y += p.vy * dt;
    emit(p.x, p.y, p.z, { c: 0x2a2826, c1: 0x6a665e, life: 2.5, vy: 1, s0: 1.2, s1: 4.5, a: 0.7 });
    if (rand() < 0.7) emit(p.x, p.y, p.z, { c: 0xffa040, c1: 0x7a3010, life: 0.4, s0: 1.0, s1: 1.8, a: 0.9 });
    const h = surfaceH(p.x, p.z);
    if (p.y <= h + 0.5) {
      explosion(p.x, h, p.z, 1.9);
      if (groundH(p.x, p.z) > -0.3) areaDamage(p.x, p.z, 7, 80, null, { at: true, splash: 7 }, null);
      removePlane(p); return;
    }
  } else if (p.role === 'kamikaze') {
    if (!p.tgt || !p.tgt.alive) { const ships = ents.filter(e => e.alive && e.team === 'us' && e.def.naval); p.tgt = ships[0] || null; if (!p.tgt) { p.role = 'flyby'; return; } }
    const t = p.tgt, dx = t.x - p.x, dz = t.z - p.z, dh = Math.hypot(dx, dz) || 1;
    p.dx += (dx / dh - p.dx) * Math.min(1, dt * 1.5); p.dz += (dz / dh - p.dz) * Math.min(1, dt * 1.5);
    const l = Math.hypot(p.dx, p.dz) || 1; p.dx /= l; p.dz /= l;
    const yt = dh > 320 ? 70 : 3 + (dh / 320) * 67;
    p.vy = clamp((yt - p.y) * 2.2, -45, 30);
    p.x += p.dx * a.speed * dt; p.z += p.dz * a.speed * dt; p.y += p.vy * dt;
    if (Math.hypot(dh, p.y - 3) < 9) {
      explosion(p.x, Math.max(p.y, 1.5), p.z, 2.2); damage(t, 650, null, { at: true }); removePlane(p);
      if (t.alive) toast(dispName(t) + ' atingido por um kamikaze!', 'bad');
      return;
    }
    if (p.y < 0.5) { explosion(p.x, 0, p.z, 1.6); removePlane(p); return; }
  } else {
    const s = (p.tx - p.x) * p.dx + (p.tz - p.z) * p.dz;
    let yt = p.base + a.alt;
    if (p.role === 'strafe') {
      const low = p.base + 15;
      if (s < 320 && s > 40) yt = lerp(low, p.base + a.alt, (s - 40) / 280);
      else if (s <= 40) yt = low + (40 - s) * 0.5;
    } else if (p.role === 'flyby') yt = p.base + a.alt + 60;
    p.vy = clamp((yt - p.y) * 1.6, -32, 30);
    p.y += p.vy * dt; p.x += p.dx * a.speed * dt; p.z += p.dz * a.speed * dt;
    if (p.role === 'strafe') {
      if (s < 210 && s > 20) {
        p.gunT -= dt;
        while (p.gunT <= 0) {
          p.gunT += 0.06;
          const gy = surfaceH(p.x, p.z), along = Math.max(10, (p.y - gy) * 1.7);
          const ix = p.x + p.dx * along + rr(-2.5, 2.5), iz = p.z + p.dz * along + rr(-2.5, 2.5), ih = surfaceH(ix, iz);
          const side = rand() < 0.5 ? -1 : 1;
          tracer(TV2.set(p.x - p.dz * side * 3, p.y - 0.5, p.z + p.dx * side * 3).clone(), TV.set(ix, ih, iz));
          if (groundH(ix, iz) < 0) emit(ix, 0.2, iz, { c: 0xe6ecee, life: 0.6, vy: 7, grav: 14, s0: 0.35, s1: 0.6, sy: 2, a: 0.8 });
          else emit(ix, ih + 0.3, iz, { c: 0x8a7a5a, life: 0.7, vy: 2.5, s0: 0.4, s1: 1.4, a: 0.7 });
          areaDamage(ix, iz, AIR_GUN.splash, AIR_GUN.dmg, p.team, AIR_GUN, null);
          sfx('mg', p.x, p.z);
        }
      }
      if (p.rockets > 0 && s < 150) {
        const tg = airTarget(p);
        for (const side of [-1, 1]) {
          const hit = tg && rand() < 0.65, tx = hit ? tg.x : p.tx + rr(-4, 4), tz = hit ? tg.z : p.tz + rr(-4, 4);
          launch({ kind: 'rocket', p0: new THREE.Vector3(p.x - p.dz * side * 4, p.y - 0.9, p.z + p.dx * side * 4), tx, ty: surfaceH(tx, tz) + (hit ? 1.2 : 0), tz, speed: 170, arc: 0, target: hit ? tg : null, w: AIR_ROCKET, src: null, team: p.team });
        }
        p.rockets = 0; sfx('rocket', p.x, p.z);
      }
      if (p.bombs > 0 && s < bombLead(p)) { dropBomb(p); p.bombs = 0; }
    } else if (p.role === 'para' && p.kinds.length && s < 45) {
      p.dropT -= dt; if (p.dropT <= 0) { p.dropT = 0.42; dropPara(p); }
    } else if (p.role === 'bomb' && p.bombs > 0 && s < bombLead(p) + 45) {
      p.bombT -= dt; if (p.bombT <= 0) { p.bombT = 0.28; dropBomb(p); p.bombs--; }
    }
    if (s < -950) { removePlane(p); return; }
    p.s = s;
  }
  m.position.set(p.x, p.y, p.z);
  m.lookAt(p.x + p.dx * 10, p.y + p.vy * 10 / a.speed, p.z + p.dz * 10);
  m.rotateZ(p.state === 'down' ? p.spin : Math.sin(S.time * 0.8 + p.tx) * 0.06);
  for (const pr of m.userData.props) pr.rotation.z += dt * 45;
  if (p.snd) {
    const d = Math.hypot(p.x - camera.position.x, p.y - camera.position.y, p.z - camera.position.z);
    const v = AU.on ? Math.pow(clamp(1 - d / 650, 0, 1), 2) * (p.kind === 'b26' ? 0.16 : 0.12) : 0;
    p.snd.g.gain.setTargetAtTime(v, AU.ctx.currentTime, 0.1);
    p.snd.o.frequency.setTargetAtTime((p.kind === 'b26' ? 48 : 64) + clamp(-p.vy, 0, 30) * 1.5, AU.ctx.currentTime, 0.2);
  }
}
function updateAA(b, dt) {
  const w = b.def.aa, ud = b.mesh.userData;
  if (b.building) b.wcool -= dt; else { b.aaCool = (b.aaCool || 0) - dt; if (b.aaCool > 0) return; b.aaCool = w.rof; b.wcool = 0; }
  let best = null, bd = w.range;
  for (const p of S.planes) {
    if (p.state === 'down' || p.team === b.team) continue;
    const d = Math.hypot(p.x - b.x, p.y - b.y, p.z - b.z); if (d < bd) { bd = d; best = p; }
  }
  if (!best) return;
  const lead = bd / 260 * best.def.speed;
  const ax = best.x + best.dx * lead, az = best.z + best.dz * lead, ay = best.y;
  const ship = !b.building;
  if (!ship) {
    b.turretYaw = turnTo(b.turretYaw, angDiff(Math.atan2(ax - b.x, az - b.z), b.heading), 3.5 * dt);
    ud.turret.rotation.y = b.turretYaw;
    if (ud.barrel) ud.barrel.rotation.x = -Math.atan2(ay - b.y - 2, Math.hypot(ax - b.x, az - b.z));
  }
  if (b.wcool > 0) return;
  b.wcool = w.rof * (0.9 + rand() * 0.2);
  if (ship) TV2.set(b.x + rr(-3, 3), 5.5, b.z + rr(-8, 8));
  else { b.mesh.updateMatrixWorld(true); ud.muzzle.getWorldPosition(TV2); }
  const mp = TV2.clone(); muzzleFlash(mp, 1.3);
  const hit = rand() < w.acc * (1 - 0.5 * bd / w.range);
  tracer(mp, TV.set(ax + rr(-3, 3), ay + rr(-2, 2), az + rr(-3, 3)));
  later(bd / 380, () => emit(best.x + rr(-6, 6), best.y + rr(-3, 4), best.z + rr(-6, 6), { c: 0x2b2a28, c1: 0x55524c, life: 2.4, s0: 1.2, s1: 3.8, a: 0.75 }));
  sfx('cannon', b.x, b.z);
  b.revealT = S.time;
  if (hit) { best.hp -= w.dmg; if (best.hp <= 0) shootDown(best); }
}
function callStrike(kind, x, z) {
  S.cd[kind] = STRIKES[kind].cd;
  const dx = -Math.sin(cam.yaw), dz = -Math.cos(cam.yaw);
  if (kind === 'naval') navalStrike(x, z);
  else if (kind === 'p47') {
    spawnPlane('p47', x, z, dx, dz, 'strafe', -5, 700);
    spawnPlane('p47', x, z, dx, dz, 'strafe', 6, 880);
    toast(strikeName('p47') + ' a caminho!', 'good');
  } else if (kind === 'para') {
    [['para', 'para', 'medic'], ['para', 'bazooka', 'para'], ['para', 'para', 'para']].forEach((ks, i) => {
      const pl = spawnPlane('c47', x, z, dx, dz, 'para', (i - 1) * 16, 740 + i * 30); pl.kinds = ks.slice();
    });
    toast('C-47 com paraquedistas da 101ª a caminho!', 'good');
  } else if (kind === 'b26') {
    for (const [side, lead] of [[-16, 760], [0, 720], [16, 780]]) spawnPlane('b26', x, z, dx, dz, 'bomb', side, lead);
    toast(strikeName('b26') + ' a caminho! Afaste suas tropas do alvo.', 'good');
  }
  marker(x, z, 0xe3a33c);
  updSide();
}
function germanRaid(tx, tz, dx, dz) {
  const k = foe().air;
  spawnPlane(k, tx, tz, dx, dz, 'strafe', -5, 650);
  spawnPlane(k, tx, tz, dx, dz, 'strafe', 5, 760);
  toast(k === 'zero' ? 'Caças Zero japoneses atacando!' : 'Caças Fw 190 da Luftwaffe atacando!', 'bad');
}
// kamikazes: caças Zero mergulham contra os navios
function kamikazeRaid(n) {
  const ships = ents.filter(e => e.alive && e.team === 'us' && e.def.naval);
  if (!ships.length) return;
  for (let i = 0; i < n; i++) {
    const t = ships[(rand() * ships.length) | 0], a = rr(-0.8, 0.8);
    const p = spawnPlane('zero', t.x, t.z, Math.sin(a), Math.cos(a) * -1, 'kamikaze', rr(-10, 10), 700 + i * 90);
    p.tgt = t;
  }
  toast('KAMIKAZES! Caças Zero mergulham contra a frota!', 'bad');
}
function raidTarget() {
  const list = ents.filter(e => e.alive && e.team === 'us' && (e.building || e.armored));
  const units = ents.filter(e => e.alive && e.team === 'us' && e.unit);
  const pool = list.length && rand() < 0.6 ? list : units;
  return pool.length ? pool[(rand() * pool.length) | 0] : null;
}
function updAir(dt) {
  for (const k in S.cd) if (S.cd[k] > 0) S.cd[k] -= dt;
  for (let i = S.planes.length - 1; i >= 0; i--) { const p = S.planes[i]; if (p) updatePlane(p, dt); }
  updBombs(dt);
  if (S.phase === 'landing') {
    S.flybyT -= dt;
    if (S.flybyT <= 0) { S.flybyT = 38 + rand() * 15; const x = rr(-300, 300); for (const [side, lead] of [[-18, 900], [0, 860], [18, 920]]) spawnPlane('b26', x, 0, 0, -1, 'flyby', side, lead); }
    if (!S.prillerDone && S.t > 70) {
      const beach = ents.filter(e => e.alive && e.team === 'us' && e.z > 200);
      if (beach.length) { S.prillerDone = true; const v = beach[(rand() * beach.length) | 0]; germanRaid(v.x, v.z, rand() < 0.5 ? 1 : -1, 0.15); }
    }
  } else if (S.phase === 'base') {
    if (SC.coast) {
      S.sbootT = (S.sbootT === undefined ? 200 : S.sbootT) - dt;
      if (S.sbootT <= 0) {
        S.navalWave = (S.navalWave || 0) + 1;
        const jp = SC.biome === 'tropical';
        S.sbootT = jp ? 170 : 220;
        sbootRaid(jp ? 2 + Math.floor(S.navalWave / 2) : 2);
        if (jp) later(25, () => kamikazeRaid(2 + Math.floor(S.navalWave / 2)));
      }
    }
    S.airT -= dt;
    if (S.airT <= 0) {
      S.airT = 110 + rand() * 50;
      const t = raidTarget();
      if (t) { const a = rr(-0.6, 0.6); germanRaid(t.x, t.z, Math.sin(a), Math.cos(a)); }
    }
  }
}
function strikeAvail(k) { return STRIKES[k].phases.includes(S.phase) && (k !== 'naval' || SC.coast); }
function supportReady(k) { return S.cd[k] <= 0 && strikeAvail(k); }

/* ---------- apoio naval ---------- */
function navalStrike(x, z) {
  toast('Destróieres abrindo fogo! Cuidado com fogo amigo.', 'good');
  for (let i = 0; i < 6; i++) {
    later(0.5 + i * 0.45, () => {
      const g = MAP.navalGuns[(rand() * MAP.navalGuns.length) | 0];
      if (g) { g.getWorldPosition(TV); muzzleFlash(TV.set(TV.x, TV.y + 2, TV.z), 9); }
    });
    later(1.2 + i * 0.45, () => {
      const a = rand() * 6.28, m = rand() * 11, px = x + Math.cos(a) * m, pz = z + Math.sin(a) * m;
      whistle(px, pz);
      later(0.95, () => { explosion(px, surfaceH(px, pz), pz, 1.5); areaDamage(px, pz, NAVAL.splash, NAVAL.dmg, null, NAVAL, null); });
    });
  }
  updSide();
}

/* ---------- câmera ---------- */
const cam = { x: 0, z: 280, dist: 160, pitch: 0.4, yaw: 0, tDist: null, tPitch: null, follow: null, shake: 0, keys: {} };
let shadowExt = 0;
function updateCamera(dt) {
  if (S.phase === 'menu') {
    const t = S.time;
    cam.x = Math.sin(t * 0.045) * 120; cam.z = 270; cam.yaw = Math.sin(t * 0.06) * 0.45; cam.dist = 170; cam.pitch = 0.36;
  } else {
    if (cam.follow) { const f = cam.follow(); if (f) { const k = Math.min(1, dt * 2.2); cam.x += (f.x - cam.x) * k; cam.z += (f.z - cam.z) * k; } }
    if (cam.tDist !== null) { cam.dist += (cam.tDist - cam.dist) * Math.min(1, dt * 1.4); if (Math.abs(cam.tDist - cam.dist) < 0.5) cam.tDist = null; }
    if (cam.tPitch !== null) { cam.pitch += (cam.tPitch - cam.pitch) * Math.min(1, dt * 1.4); if (Math.abs(cam.tPitch - cam.pitch) < 0.01) cam.tPitch = null; }
    const K = cam.keys, sp = cam.dist * 1.1 * dt;
    if (K.w || K.arrowup) panWorld(0, -sp); if (K.s || K.arrowdown) panWorld(0, sp);
    if (K.a || K.arrowleft) panWorld(-sp, 0); if (K.d || K.arrowright) panWorld(sp, 0);
    if (K.q) cam.yaw += dt * 1.2; if (K.e) cam.yaw -= dt * 1.2;
  }
  cam.x = clamp(cam.x, WORLD.minX + 30, WORLD.maxX - 30); cam.z = clamp(cam.z, WORLD.minZ + 30, 900);
  cam.dist = clamp(cam.dist, 22, 420); cam.pitch = clamp(cam.pitch, 0.3, 1.38);
  const ty = surfaceH(cam.x, cam.z), cp = Math.cos(cam.pitch) * cam.dist;
  camera.position.set(cam.x + Math.sin(cam.yaw) * cp, ty + Math.sin(cam.pitch) * cam.dist, cam.z + Math.cos(cam.yaw) * cp);
  const gh = surfaceH(camera.position.x, camera.position.z); if (camera.position.y < gh + 5) camera.position.y = gh + 5;
  if (cam.shake > 0) { camera.position.x += (rand() - 0.5) * cam.shake; camera.position.y += (rand() - 0.5) * cam.shake; cam.shake = Math.max(0, cam.shake - dt * 2.5); }
  camera.lookAt(cam.x, ty + 1, cam.z);
  sun.position.set(cam.x + 150, ty + 260, cam.z + 110); sun.target.position.set(cam.x, ty, cam.z);
  const ext = clamp(cam.dist * 1.15, 70, 230);
  if (Math.abs(ext - shadowExt) > 10) { shadowExt = ext; const sc = sun.shadow.camera; sc.left = -ext; sc.right = ext; sc.top = ext; sc.bottom = -ext; sc.updateProjectionMatrix(); }
}
function panWorld(dx, dz) {
  const rx = Math.cos(cam.yaw), rz = -Math.sin(cam.yaw), fx = -Math.sin(cam.yaw), fz = -Math.cos(cam.yaw);
  cam.x += rx * dx - fx * dz; cam.z += rz * dx - fz * dz;
}
function panScreen(dx, dy) {
  const k = 2 * cam.dist * Math.tan(camera.fov * Math.PI / 360) / window.innerHeight;
  cam.follow = null;
  panWorld(-dx * k, -dy * k / Math.max(0.55, Math.sin(cam.pitch)));
}

/* ---------- entrada (toque e mouse) ---------- */
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
function screenToGround(sx, sy) {
  ndc.set(sx / window.innerWidth * 2 - 1, -(sy / window.innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const o = ray.ray.origin, d = ray.ray.direction;
  let t = 0, step = 3;
  for (let i = 0; i < 1500; i++) {
    const x = o.x + d.x * t, y = o.y + d.y * t, z = o.z + d.z * t;
    if (y < surfaceH(x, z)) {
      let a = t - step, b = t;
      for (let k = 0; k < 14; k++) { const m = (a + b) / 2; const mx = o.x + d.x * m, my = o.y + d.y * m, mz = o.z + d.z * m; if (my < surfaceH(mx, mz)) b = m; else a = m; }
      return { x: o.x + d.x * b, z: o.z + d.z * b };
    }
    t += step; if (t > 3000) break;
  }
  return null;
}
function pickEntity(sx, sy) {
  let best = null, bs = 1;
  const W = window.innerWidth, H = window.innerHeight, f = H / (2 * Math.tan(camera.fov * Math.PI / 360));
  for (const e of ents) {
    if (!e.alive || e.downed || (e.team === 'de' && !e.seen)) continue;
    TV.set(e.x, e.y + (e.inf ? 1.2 : e.building ? 3 : 1.8), e.z);
    const dc = TV.distanceTo(camera.position); TV.project(camera); if (TV.z > 1) continue;
    const px = (TV.x + 1) / 2 * W, py = (1 - TV.y) / 2 * H;
    const rpx = (e.inf ? 1.4 : e.r * 1.05) * f / dc, thr = Math.max(e.inf ? 20 : 26, rpx);
    const s = Math.hypot(px - sx, py - sy) / thr * (e.team === 'us' && e.unit ? 0.9 : 1);
    if (s < bs) { bs = s; best = e; }
  }
  return best;
}
let lastTap = { e: null, t: 0 };
function handleTap(sx, sy, right) {
  initAudio();
  if (S.phase === 'menu' || S.cine || S.phase === 'won' || S.phase === 'lost') return;
  const g = screenToGround(sx, sy);
  if (S.placing) { if (g) { S.placing.x = g.x; S.placing.z = g.z; updGhost(); } return; }
  if (S.strike) { const k = S.strike; S.strike = null; if (g) callStrike(k, g.x, g.z); refreshPanel(true); updSide(); return; }
  const hit = pickEntity(sx, sy);
  const movers = selected.filter(e => e.unit);
  if (right) {
    if (hit && hit.team === 'de') { const a = movers.filter(e => e.def.range > 0); if (a.length) orderAttack(a, hit); }
    else if (g && movers.length) orderMove(movers, g.x, g.z);
    return;
  }
  if (hit && hit.team === 'us') {
    const now = performance.now();
    if (lastTap.e === hit && now - lastTap.t < 380 && hit.unit) setSel(ents.filter(e => e.alive && e.team === 'us' && e.kind === hit.kind && onScreen(e)));
    else setSel([hit]);
    lastTap = { e: hit, t: now }; return;
  }
  if (hit && hit.team === 'de') {
    const a = movers.filter(e => e.def.range > 0);
    if (a.length) orderAttack(a, hit); else toast(dispName(hit) + ' · inimigo');
    return;
  }
  if (!g) return;
  if (movers.length) orderMove(movers, g.x, g.z);
  else if (selected.length === 1 && selected[0].building && selected[0].def.trains) { selected[0].rally = { x: g.x, z: g.z }; marker(g.x, g.z, 0xe3a33c); toast('Ponto de reunião definido.'); }
  else if (selected.length) setSel([]);
}
function boxSelect(x0, y0, x1, y1) {
  const W = window.innerWidth, H = window.innerHeight, l = Math.min(x0, x1), r = Math.max(x0, x1), t = Math.min(y0, y1), b = Math.max(y0, y1);
  const list = ents.filter(e => {
    if (!e.alive || e.team !== 'us' || !e.unit) return false;
    TV.set(e.x, e.y + 1, e.z).project(camera); if (TV.z > 1) return false;
    const px = (TV.x + 1) / 2 * W, py = (1 - TV.y) / 2 * H;
    return px >= l && px <= r && py >= t && py <= b;
  });
  setSel(list);
  if (S.boxMode) { S.boxMode = false; updSide(); }
}
const ptrs = new Map();
let gest = null;
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('pointerdown', (e) => {
  try { canvas.setPointerCapture(e.pointerId); } catch (er) { /* ignorar */ }
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (ptrs.size === 1) gest = { type: 'tap', sx: e.clientX, sy: e.clientY, lx: e.clientX, ly: e.clientY, box: S.boxMode || e.shiftKey, right: e.button === 2 };
  else if (ptrs.size === 2) {
    const [a, b] = [...ptrs.values()];
    gest = { type: 'pinch', d0: Math.hypot(a.x - b.x, a.y - b.y), a0: Math.atan2(b.y - a.y, b.x - a.x), dist0: cam.dist, yaw0: cam.yaw, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
    $('boxrect').hidden = true;
  }
});
canvas.addEventListener('pointermove', (e) => {
  const p = ptrs.get(e.pointerId); if (!p) return;
  p.x = e.clientX; p.y = e.clientY;
  if (!gest || S.phase === 'menu') return;
  if (gest.type === 'tap' && Math.hypot(e.clientX - gest.sx, e.clientY - gest.sy) > 9) gest.type = gest.box ? 'box' : 'pan';
  if (gest.type === 'pan') { if (!S.cine) panScreen(e.clientX - gest.lx, e.clientY - gest.ly); gest.lx = e.clientX; gest.ly = e.clientY; }
  else if (gest.type === 'box') {
    const r = $('boxrect'); r.hidden = false;
    r.style.left = Math.min(gest.sx, e.clientX) + 'px'; r.style.top = Math.min(gest.sy, e.clientY) + 'px';
    r.style.width = Math.abs(e.clientX - gest.sx) + 'px'; r.style.height = Math.abs(e.clientY - gest.sy) + 'px';
  } else if (gest.type === 'pinch' && ptrs.size >= 2) {
    const [a, b] = [...ptrs.values()];
    const d = Math.hypot(a.x - b.x, a.y - b.y), ang = Math.atan2(b.y - a.y, b.x - a.x), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    cam.tDist = null; cam.dist = clamp(gest.dist0 * gest.d0 / Math.max(20, d), 22, 420);
    let da = angDiff(ang, gest.a0); cam.yaw = gest.yaw0 + da;
    if (!S.cine) panScreen(mx - gest.mx, my - gest.my); gest.mx = mx; gest.my = my;
  }
});
function endPtr(e) {
  if (!ptrs.has(e.pointerId)) return;
  ptrs.delete(e.pointerId);
  if (!gest) return;
  if (gest.type === 'tap' && ptrs.size === 0) handleTap(e.clientX, e.clientY, gest.right);
  else if (gest.type === 'box') { $('boxrect').hidden = true; boxSelect(gest.sx, gest.sy, e.clientX, e.clientY); }
  if (ptrs.size === 0) gest = null;
  else if (gest.type === 'pinch') { const p = [...ptrs.values()][0]; gest = { type: 'pan', lx: p.x, ly: p.y }; }
}
canvas.addEventListener('pointerup', endPtr);
canvas.addEventListener('pointercancel', (e) => { ptrs.delete(e.pointerId); if (!ptrs.size) { gest = null; $('boxrect').hidden = true; } });
canvas.addEventListener('wheel', (e) => { e.preventDefault(); cam.tDist = null; cam.dist = clamp(cam.dist * (e.deltaY > 0 ? 1.12 : 0.89), 22, 420); }, { passive: false });
window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase(); cam.keys[k] = true;
  if (k === 'escape') { if (S.placing) cancelPlacing(); else { S.strike = null; S.supportOpen = false; setSel([]); updSide(); } }
  if (k === '=' || k === '+') cam.dist *= 0.85; if (k === '-') cam.dist *= 1.15;
});
window.addEventListener('keyup', (e) => { cam.keys[e.key.toLowerCase()] = false; });
window.addEventListener('blur', () => { cam.keys = {}; });

const mini = $('mini'), mctx = mini.getContext('2d');
function miniTo(e) {
  const r = mini.getBoundingClientRect();
  cam.follow = null;
  cam.x = WORLD.minX + (e.clientX - r.left) / r.width * (WORLD.maxX - WORLD.minX);
  cam.z = WORLD.minZ + (e.clientY - r.top) / r.height * (WORLD.maxZ - WORLD.minZ);
}
mini.addEventListener('pointerdown', (e) => { if (S.cine) return; mini.setPointerCapture(e.pointerId); miniTo(e); mini._drag = true; });
mini.addEventListener('pointermove', (e) => { if (mini._drag) miniTo(e); });
mini.addEventListener('pointerup', () => { mini._drag = false; });

/* ---------- construção (posicionamento) ---------- */
const ghostMat = new THREE.MeshBasicMaterial({ color: 0x8fd16f, transparent: true, opacity: 0.45, depthWrite: false });
const radiusRings = [];
function startPlacing(kind) {
  const d = BT[kind];
  if (S.supplies < d.cost) { toast('Suprimentos insuficientes para ' + d.name + '.', 'bad'); return; }
  if (d.req && !ents.some(e => e.alive && e.kind === d.req && e.complete)) { toast('Requer ' + BT[d.req].name + ' concluído.', 'bad'); return; }
  cancelPlacing();
  const g = makeBuilding(kind); g.traverse(o => { if (o.isMesh) { o.material = ghostMat; o.castShadow = false; } }); scene.add(g);
  const c = screenToGround(window.innerWidth / 2, window.innerHeight * 0.45) || { x: cam.x, z: cam.z };
  S.placing = { kind, ghost: g, x: c.x, z: c.z };
  for (const e of ents) if (e.alive && e.building && e.team === 'us' && e.complete) {
    const R = e.def.buildR || 40, m = new THREE.Mesh(new THREE.RingGeometry(R - 0.8, R, 64), new THREE.MeshBasicMaterial({ color: 0xe3a33c, transparent: true, opacity: 0.55, depthWrite: false }));
    m.rotation.x = -Math.PI / 2; m.position.set(e.x, e.y + 1.5, e.z); scene.add(m); radiusRings.push(m);
  }
  $('placebar').hidden = false; $('panel').hidden = true;
  updGhost();
}
function updGhost() {
  const p = S.placing; if (!p) return;
  p.ghost.position.set(p.x, groundH(p.x, p.z), p.z);
  p.err = canPlace(p.kind, p.x, p.z);
  ghostMat.color.setHex(p.err ? 0xe0573f : 0x8fd16f);
  $('placeInfo').textContent = p.err || (BT[p.kind].name + ' · ' + BT[p.kind].cost + ' suprimentos');
  $('pOk').disabled = !!p.err;
}
function confirmPlacing() {
  const p = S.placing; if (!p) return;
  p.err = canPlace(p.kind, p.x, p.z);
  if (p.err) { toast(p.err, 'bad'); updGhost(); return; }
  const d = BT[p.kind];
  if (S.supplies < d.cost) { toast('Suprimentos insuficientes.', 'bad'); return; }
  S.supplies -= d.cost;
  const b = spawnBuilding(p.kind, p.x, p.z, { complete: false });
  toast('Construindo ' + d.name + '…');
  cancelPlacing(); setSel([b]);
}
function cancelPlacing() {
  if (S.placing) { scene.remove(S.placing.ghost); S.placing = null; }
  for (const m of radiusRings) scene.remove(m); radiusRings.length = 0;
  $('placebar').hidden = true; refreshPanel(true);
}
$('pOk').addEventListener('click', confirmPlacing);
$('pNo').addEventListener('click', cancelPlacing);

/* ---------- interface ---------- */
function toast(msg, cls) {
  const box = $('toasts'), el = document.createElement('div');
  el.className = 'toast' + (cls ? ' ' + cls : ''); el.textContent = msg; box.appendChild(el);
  while (box.children.length > 3) box.removeChild(box.firstChild);
  setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 4200);
}
let phaseName = '', objText = '';
function setPhaseText(name, text) {
  if (name !== null && name !== phaseName) { phaseName = name; $('phaseName').textContent = name; }
  if (text !== objText) { objText = text; $('objText').textContent = text; }
}
let panelSig = '';
function refreshPanel(force) {
  const panel = $('panel');
  let title = '', info = '', btns = '';
  if (!S.placing && (S.supportOpen || S.strike)) {
    if (S.strike) {
      title = strikeName(S.strike); info = 'Toque no mapa para escolher o alvo.';
      btns = '<button class="pb warn" data-act="strikecancel">CANCELAR<small>voltar</small></button>';
    } else {
      title = 'Apoio de fogo'; info = 'Escolha o tipo de ataque e depois toque no alvo.';
      for (const k of Object.keys(STRIKES)) {
        if (k === 'naval' && !SC.coast) continue;
        const st = STRIKES[k], ok = supportReady(k), avail = strikeAvail(k);
        btns += '<button class="pb' + (ok ? ' go' : '') + '" data-act="strike:' + k + '"' + (ok ? '' : ' disabled') + '>' + strikeName(k) + '<small>' + (!avail ? 'após montar a base' : ok ? st.desc : 'recarga ' + Math.ceil(S.cd[k]) + 's') + '</small></button>';
      }
      btns += '<button class="pb" data-act="supclose">FECHAR<small>&nbsp;</small></button>';
    }
    const sig = title + '|' + info + '|' + btns;
    if (force || sig !== panelSig) { panelSig = sig; $('pTitle').textContent = title; $('pInfo').textContent = info; $('pBtns').innerHTML = btns; }
    panel.hidden = false; return;
  }
  if (S.placing || !selected.length) { panel.hidden = true; panelSig = ''; return; }
  const sel = selected;
  if (sel.length === 1 && sel[0].building) {
    const b = sel[0], d = b.def;
    title = d.name;
    info = b.complete ? 'Integridade ' + Math.ceil(b.hp) + '/' + d.hp : 'Em construção…';
    if (!b.complete) btns += '<div style="flex-basis:100%" class="qbar"><i data-prog="build"></i></div>';
    else if (b.kind === 'hq') {
      for (const k of BUILD_ORDER) {
        if (BT[k].coastOnly && !SC.coast) continue;
        const bd = BT[k], ok = S.supplies >= bd.cost && (!bd.req || ents.some(e => e.alive && e.kind === bd.req && e.complete));
        btns += '<button class="pb" data-act="build:' + k + '"' + (ok ? '' : ' disabled') + '>' + bd.short + '<small>' + bd.cost + '</small></button>';
      }
      info += ' · Renda +' + income() + '/s';
    } else if (d.trains) {
      for (const k of d.trains) {
        const ud = UT[k], q = b.queue.filter(x => x === k).length;
        btns += '<button class="pb" data-act="train:' + k + '"' + (S.supplies >= ud.cost && b.queue.length < 6 ? '' : ' disabled') + '>' + ud.name + (q ? ' ×' + q : '') + '<small>' + ud.cost + '</small></button>';
      }
      if (b.queue.length) btns += '<div style="flex-basis:100%" class="qbar"><i data-prog="queue"></i></div>';
      info += ' · Toque no chão para o ponto de reunião';
    } else if (d.income) info += ' · +' + d.income + ' suprimentos/s';
    else if (d.heal) info += ' · Cura infantaria num raio de ' + d.healR + ' m';
    else if (d.weapon) info += ' · Alcance ' + d.weapon.range + ' m';
  } else {
    const counts = {};
    for (const e of sel) counts[e.kind] = (counts[e.kind] || 0) + 1;
    title = Object.keys(counts).map(k => counts[k] + ' ' + (counts[k] > 1 ? UT[k].plural : UT[k].name)).join(' · ');
    if (sel.length === 1) {
      const u = sel[0];
      info = 'Vida ' + Math.ceil(u.hp) + '/' + u.maxHp + (u.inf ? (u.cover === 2 ? ' · na trincheira' : u.cover ? ' · em cobertura' : ' · exposto') : '');
    } else info = 'Toque no chão para mover · num inimigo para atacar';
    if (sel.some(e => e.kind === 'dozer') && S.phase === 'deploy') btns += '<button class="pb go" data-act="deploy">MONTAR BASE<small>Centro de Comando</small></button>';
    btns += '<button class="pb" data-act="stop">PARAR<small>segurar posição</small></button>';
  }
  btns += '<button class="pb" data-act="desel">FECHAR<small>desmarcar</small></button>';
  const sig = title + '|' + info + '|' + btns;
  if (force || sig !== panelSig) {
    panelSig = sig; $('pTitle').textContent = title; $('pInfo').textContent = info; $('pBtns').innerHTML = btns;
  }
  panel.hidden = false;
  updProgress();
}
function updProgress() {
  const b = selected.length === 1 && selected[0].building ? selected[0] : null; if (!b) return;
  const pb = document.querySelector('[data-prog="build"]'); if (pb) pb.style.width = (b.progress * 100).toFixed(0) + '%';
  const pq = document.querySelector('[data-prog="queue"]'); if (pq && b.queue.length) pq.style.width = (b.prodT / UT[b.queue[0]].time * 100).toFixed(0) + '%';
}
$('pBtns').addEventListener('click', (e) => {
  const btn = e.target.closest('button'); if (!btn || btn.disabled) return;
  initAudio();
  const [act, arg] = btn.dataset.act.split(':');
  if (act === 'strike') { if (supportReady(arg)) { S.strike = arg; S.supportOpen = false; toast(STRIKES[arg].tip); } updSide(); }
  else if (act === 'strikecancel') { S.strike = null; updSide(); }
  else if (act === 'supclose') { S.supportOpen = false; updSide(); }
  else if (act === 'desel') setSel([]);
  else if (act === 'stop') { for (const u of selected) if (u.unit) { u.order = 'idle'; u.dest = null; u.forced = null; u.home = { x: u.x, z: u.z }; } }
  else if (act === 'deploy') deployHQ();
  else if (act === 'build') startPlacing(arg);
  else if (act === 'train') {
    const b = selected[0], d = UT[arg];
    if (b && S.supplies >= d.cost && b.queue.length < 6) { S.supplies -= d.cost; b.queue.push(arg); }
  }
  refreshPanel(true);
});
function updSide() {
  const nb = $('bNaval'), keys = Object.keys(STRIKES), avail = keys.filter(strikeAvail);
  const ready = avail.filter(supportReady).length;
  nb.disabled = !avail.length;
  nb.classList.toggle('on', !!S.strike || S.supportOpen);
  nb.querySelector('small').textContent = S.strike ? 'alvo' : ready ? ready + ' pronto' + (ready > 1 ? 's' : '') : avail.length ? Math.ceil(Math.min(...avail.map(k => S.cd[k]))) + 's' : '—';
  $('bBox').classList.toggle('on', S.boxMode);
  $('bSound').querySelector('small').textContent = AU.on ? 'ligado' : 'mudo';
}
$('bAll').addEventListener('click', () => { initAudio(); setSel(ents.filter(e => e.alive && e.team === 'us' && e.unit && e.kind !== 'dozer')); });
$('bTanks').addEventListener('click', () => { initAudio(); const t = ents.filter(e => e.alive && e.team === 'us' && e.tank); if (t.length) setSel(t); else toast('Você ainda não tem tanques.'); });
$('bBox').addEventListener('click', () => { S.boxMode = !S.boxMode; updSide(); if (S.boxMode) toast('Arraste na tela para selecionar um grupo.'); });
$('bNaval').addEventListener('click', () => {
  initAudio();
  if (S.strike) S.strike = null; else S.supportOpen = !S.supportOpen;
  if (S.supportOpen) cancelPlacing();
  refreshPanel(true); updSide();
});
$('bBuild').addEventListener('click', () => {
  if (S.usHQ && S.usHQ.alive) { setSel([S.usHQ]); cam.follow = null; cam.x = S.usHQ.x; cam.z = S.usHQ.z + 10; }
});
$('bSound').addEventListener('click', () => { initAudio(); AU.on = !AU.on; if (AU.master) AU.master.gain.value = AU.on ? 0.7 : 0; updSide(); });
$('skip').addEventListener('click', skipCine);

function drawMini() {
  const W = MAP.MMW, H = MAP.MMH;
  mctx.drawImage(MAP.miniBase, 0, 0);
  for (const c of S.cps) {
    const q = MAP.toM(c.x, c.z); mctx.fillStyle = c.owner === 'us' ? '#8fd16f' : '#e0573f';
    mctx.fillRect(q[0] - 1, q[1] - 7, 1.5, 7); mctx.fillRect(q[0], q[1] - 7, 5, 3);
  }
  for (const e of ents) {
    if (!e.alive || (e.team === 'de' && !e.seen)) continue;
    const q = MAP.toM(e.x, e.z);
    mctx.fillStyle = e.team === 'us' ? (e.sel ? '#ffffff' : '#9be37a') : '#ff5a40';
    const s = e.building ? 4 : e.inf ? 2 : e.def.naval ? 5 : 3;
    mctx.fillRect(q[0] - s / 2, q[1] - s / 2, s, s);
  }
  mctx.fillStyle = '#d6dde0';
  for (const b of S.boats) { const q = MAP.toM(b.x, b.z); mctx.fillRect(q[0] - 1, q[1] - 2, 2, 4); }
  if (S.lst) { const q = MAP.toM(S.lst.x, S.lst.z); mctx.fillRect(q[0] - 2, q[1] - 6, 4, 12); }
  for (const p of S.planes) { const q = MAP.toM(p.x, p.z); mctx.fillStyle = p.team === 'us' ? '#e8f0ff' : '#ff8a70'; mctx.beginPath(); mctx.moveTo(q[0] + p.dx * 4, q[1] + p.dz * 4); mctx.lineTo(q[0] - p.dx * 3 - p.dz * 3, q[1] - p.dz * 3 + p.dx * 3); mctx.lineTo(q[0] - p.dx * 3 + p.dz * 3, q[1] - p.dz * 3 - p.dx * 3); mctx.fill(); }
  const corners = [[0, 0], [window.innerWidth, 0], [window.innerWidth, window.innerHeight], [0, window.innerHeight]].map(([x, y]) => screenToGround(x, y));
  mctx.strokeStyle = 'rgba(255,255,255,0.85)'; mctx.lineWidth = 1; mctx.beginPath();
  let n = 0;
  for (const c of corners) { if (!c) continue; const q = MAP.toM(c.x, c.z); n++ ? mctx.lineTo(q[0], q[1]) : mctx.moveTo(q[0], q[1]); }
  if (n > 2) { mctx.closePath(); mctx.stroke(); }
  else { const q = MAP.toM(cam.x, cam.z); mctx.strokeRect(q[0] - 6, q[1] - 6, 12, 12); }
  void W; void H;
}
function updHUD() {
  $('sup').textContent = Math.floor(S.supplies);
  $('inc').textContent = S.phase === 'base' ? '+' + income() + '/s' : 'sem base';
  let inf = 0, tk = 0;
  for (const e of ents) if (e.alive && e.team === 'us' && e.unit) { if (e.inf) inf++; else if (e.tank) tk++; }
  $('count').textContent = inf + ' soldados · ' + tk + ' tanques';
  updSide();
  if (selected.length || S.supportOpen || S.strike) refreshPanel(false);
}

/* ---------- fim de jogo ---------- */
function endGame(win, text) {
  if (S.phase === 'won' || S.phase === 'lost') return;
  S.phase = win ? 'won' : 'lost'; S.cine = false; cancelPlacing();
  toast(win ? 'VITÓRIA!' : 'DERROTA', win ? 'good' : 'bad');
  setTimeout(() => {
    $('endEyebrow').textContent = win ? 'OPERAÇÃO OVERLORD · MISSÃO CUMPRIDA' : 'OPERAÇÃO OVERLORD · MISSÃO FRACASSADA';
    $('endTitle').textContent = win ? 'VITÓRIA' : 'DERROTA';
    $('endText').textContent = text;
    const secs = Math.floor(S.time - S.startedAt);
    $('stTime').textContent = Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0');
    $('stKills').textContent = S.kills; $('stLost').textContent = S.lost;
    $('stTowns').textContent = S.cps.filter(c => c.owner === 'us').length + '/4';
    $('end').hidden = false; $('hud').hidden = true;
  }, 2600);
}
$('again').addEventListener('click', () => location.reload());

/* ---------- laço principal ---------- */
let visT = 0, cpT = 0, uiT = 0, miniT = 0;
function update(dt) {
  S.t += dt;
  for (let i = S.timers.length - 1; i >= 0; i--) if (S.time >= S.timers[i].t) { const f = S.timers[i].fn; S.timers.splice(i, 1); f(); }
  if (S.phase === 'menu') {
    S.menuFx -= dt;
    if (S.menuFx <= 0) {
      S.menuFx = 1.2 + rand() * 1.8; const x = rr(-420, 420), z = rr(160, 215);
      const g = MAP.navalGuns[(rand() * MAP.navalGuns.length) | 0]; if (g) { g.getWorldPosition(TV); muzzleFlash(TV, 8); }
      later(1.1, () => explosion(x, groundH(x, z), z, rr(1.1, 1.6)));
    }
  } else if (S.phase === 'landing') updateLanding(dt);
  else if (S.phase === 'base') updateBase(dt);
  if (S.lst) updateLST(dt);
  for (let i = ents.length - 1; i >= 0; i--) {
    const e = ents[i]; if (!e) continue;
    if (e.unit) updateUnit(e, dt); else if (e.building) updateBuilding(e, dt);
  }
  separate();
  updAir(dt); updChutes(dt); updShouts(dt); updSnow(dt);
  updProj(dt); updParts(dt); updTracers(dt); updEmitters(dt); updMarkers(dt); updCivs(dt);
  visT -= dt; if (visT <= 0) { visT = 0.3; updVisibility(); }
  cpT -= dt; if (cpT <= 0) { cpT = 0.5; updCPs(); }
  uiT -= dt; if (uiT <= 0 && S.phase !== 'menu') { uiT = 0.2; updHUD(); updProgress(); if (S.placing) updGhost(); }
  miniT -= dt; if (miniT <= 0 && S.phase !== 'menu') { miniT = 0.25; drawMini(); }
  if (S.placing && S.placing.ghost) S.placing.ghost.visible = true;
}
let lastT = performance.now();
function frame(now) {
  requestAnimationFrame(frame);
  let dt = (now - lastT) / 1000; lastT = now;
  if (dt <= 0) return; if (dt > 0.05) dt = 0.05;
  S.time += dt;
  update(dt);
  updateCamera(dt);
  updateWater(S.time);
  updBars();
  renderer.render(scene, camera);
}

/* ---------- início ---------- */
$('gfx').addEventListener('click', () => {
  GFX = GFX === 'high' ? 'low' : 'high';
  try { localStorage.setItem('diad-gfx', GFX); } catch (e) { /* sem armazenamento */ }
  applyGfx();
});
$('start').addEventListener('click', () => { initAudio(); startLanding(); });
function renderIntro() {
  $('scEyebrow').textContent = SC.eyebrow; $('scTitle').textContent = SC.title; $('scSub').textContent = SC.subtitle;
  $('scB1').textContent = SC.brief[0]; $('scB2').textContent = SC.brief[1];
  $('start').textContent = SC.coast ? 'INICIAR DESEMBARQUE' : 'INICIAR OPERAÇÃO';
  $('scen').innerHTML = Object.values(SCENARIOS).map(c => '<button type="button" role="radio" aria-checked="' + (c === SC) + '" data-sc="' + c.id + '"><b>' + c.card + '</b><span>' + c.when + '</span></button>').join('');
}
// troca de cenário no menu: refaz o mapa, as guarnições e a aparência
function selectScenario(id) {
  if (S.phase !== 'menu' || !SCENARIOS[id] || SCENARIOS[id] === SC) return;
  SC = SCENARIOS[id];
  try { localStorage.setItem('diad-scenario', id); } catch (e) { /* sem armazenamento */ }
  $('loading').textContent = 'Preparando o terreno…';
  for (const e of ents.slice()) removeEnt(e);
  for (const c of civs) scene.remove(c.mesh); civs.length = 0;
  for (const c of S.cps) { scene.remove(c.g); scene.remove(c.ring); } S.cps = [];
  for (const w of S.wrecks) scene.remove(w); S.wrecks = [];
  S.bunkers = []; S.deHQ = null; FX.emitters.length = 0;
  for (const m of FX.craters) m.visible = false;
  buildWorld(scene); applyScenarioLook(); spawnGermans(); updVisibility();
  scene.traverse(o => { if (o.material && o.material.needsUpdate !== undefined && GFX === 'low') o.material.needsUpdate = true; });
  renderIntro();
  $('loading').textContent = 'Terreno pronto. Boa sorte, soldado.';
}
$('scen').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { b.disabled = true; setTimeout(() => selectScenario(b.dataset.sc), 30); } });
renderIntro();
spawnGermans();
applyGfx();
updVisibility();
requestAnimationFrame(frame);
$('start').disabled = false;
$('loading').textContent = 'Terreno pronto. Boa sorte, soldado.';
