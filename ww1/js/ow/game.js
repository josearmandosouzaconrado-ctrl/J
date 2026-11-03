'use strict';
// Jogo no mundo aberto: chegada de comboio, funções (soldado, tanquista, artilheiro, comandante),
// soldados ao redor do jogador, missões, setores da frente, viagem rápida e final.
(function () {
  const O = WW1.ow, V = THREE.Vector3, DEG = Math.PI / 180;
  const G = WW1.og = {
    role: 'soldier', mode: 'foot', sectors: [], rank: 0, done: 0, mission: null,
    objective: '', timer: '', marker: null, prompt: '', promptAct: null, vehicle: null, gun: null, observe: false,
    camYaw: 0, camPitch: -0.15, introT: 0, msgQueue: [],
  };
  const RANKS = ['Soldado', 'Cabo', 'Sargento', 'Tenente', 'Capitão', 'Major'];
  G.RANKS = RANKS;
  const ROLE_NAMES = { soldier: 'Soldado de infantaria', tank: 'Tanquista', artillery: 'Artilheiro', commander: 'Comandante de divisão' };
  G.ROLE_NAMES = ROLE_NAMES;
  const places = G.places = {};
  let parked = [], traffic = [], guns = [], gunTargets = [], townPop = new Map();
  const slotSoldiers = new Map(), deadSlots = new Set();
  WW1.mgNests = [];

  // ---------------- salvar / carregar ----------------
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem('ww1_open') || 'null');
      if (s) { G.sectors = s.sectors; G.rank = s.rank || 0; G.done = s.done || 0; }
    } catch (e) { /* sem armazenamento */ }
    if (!Array.isArray(G.sectors) || G.sectors.length !== 20) G.sectors = Array(20).fill('german');
  }
  function save() {
    try { localStorage.setItem('ww1_open', JSON.stringify({ sectors: G.sectors, rank: G.rank, done: G.done })); } catch (e) { }
  }
  G.reset = () => { try { localStorage.removeItem('ww1_open'); } catch (e) { } };
  G.alliedSectors = () => G.sectors.filter(s => s === 'allied').length;

  function msg(t, s) { WW1.ui.message(t, s || 3); }

  // ---------------- início ----------------
  G.start = function (role) {
    G.role = role;
    load();
    const albert = O.towns.find(t => t.hq);
    places.hq = { x: albert.flagPos[0] + 2, z: albert.flagPos[2] + 2, name: 'Quartel-general (Albert)' };
    places.hospital = { x: albert.square[0] - 8, z: albert.square[1] + 4, name: 'Hospital de campanha' };
    places.depot = { x: 700, z: 110, name: 'Depósito de tanques' };
    places.battery = { x: -500, z: -330, name: 'Bateria de artilharia' };
    for (const p of Object.values(places)) p.y = O.H(p.x, p.z);

    // caminhões estacionados em Albert
    for (let i = 0; i < 3; i++) { const [px, pz] = albert.toW(-8 - i * 5, -5); parked.push(new WW1.Vehicle('truck', px, pz, albert.ang)); }
    // tanques no depósito
    for (let i = 0; i < 3; i++) parked.push(new WW1.Vehicle('tank', places.depot.x - 12 + i * 10, places.depot.z, 0));
    tent(places.depot.x, places.depot.z - 16);
    tent(places.hq.x - 10, places.hq.z + 8);
    // bateria de canhões
    for (let i = 0; i < 4; i++) {
      const gx = places.battery.x - 18 + i * 12, gz = places.battery.z;
      guns.push(new WW1.FieldGun(gx, gz, 0));
      gunPit(gx, gz);
    }
    // caminhões andando pelas estradas (trânsito)
    for (const [ra, rb, k] of [['Albert', 'Bray', 0], ['Corbie', 'Albert', 0.4]]) {
      const rd = O.roads.find(r => r.a === ra && r.b === rb);
      if (!rd) continue;
      const path = laneOf(rd.pts, 1.8);
      const i0 = Math.floor(path.length * k);
      const t = new WW1.Vehicle('truck', path[i0][0], path[i0][1], 0);
      t.path = path.concat(laneOf(rd.pts.slice().reverse(), 1.8)); t.pathIdx = i0; t.aiSpeed = 10; t.loop = true;
      t.onArrive = v => { v.pathIdx = 0; };
      traffic.push(t);
    }
    makeTargets();
    // pontos de reabastecimento: QG, depósito e a trincheira aliada de cada setor
    WW1.world.ammoCrates = [places.hq, places.depot].map(p => ({ x: p.x, y: p.y, z: p.z }));
    for (let i = 0; i < 20; i++) { const x = O.sectorX(i); WW1.world.ammoCrates.push({ x, y: O.trenchFloor(x) + 0.2, z: O.alliedZ(x) }); }
    G.mode = 'foot';
    startConvoy(albert);
  };

  function tent(x, z) {
    const b = new WW1.GeoBuilder(true), y = O.H(x, z);
    b.add(new THREE.CylinderGeometry(3.2, 3.2, 8, 3, 1), WW1.trs(x, y + 1.4, z, [0, 0, 90], 1, 1, 1), [0.5, 0.48, 0.38]);
    WW1.game.scene.add(b.mesh(new THREE.MeshStandardMaterial({ vertexColors: true, map: WW1.tex.cloth, roughness: 0.95 })));
    O.addSolid({ x, z, hw: 4, hd: 2.8, c: 1, s: 0, top: y + 2.8 });
  }
  function gunPit(x, z) {
    const bags = new WW1.GeoBuilder(false), y = O.H(x, z);
    for (let a = -150; a <= 150; a += 15) {
      const r = a * DEG, bx = x + Math.sin(r) * 3.2, bz = z + Math.cos(r) * 3.2;
      for (let row = 0; row < 2; row++) bags.add(WW1.prim.lowSph(), WW1.trs(bx, O.H(bx, bz) + 0.1 + row * 0.2, bz, [0, a + 90, 0], 0.36, 0.24, 0.62));
    }
    WW1.game.scene.add(bags.mesh(O.mats.bag));
  }

  // caminho deslocado para a mão direita da estrada
  function laneOf(pts, off) {
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const fx = b[0] - a[0], fz = b[1] - a[1], l = Math.hypot(fx, fz) || 1;
      out.push([pts[i][0] - fz / l * off, pts[i][1] + fx / l * off]);
    }
    return out;
  }

  // ---------------- comboio de chegada ----------------
  let convoy = [], riders = [];
  function startConvoy(albert) {
    const rd = O.roads.find(r => r.a === 'Corbie' && r.b === 'Albert');
    const lane = laneOf(rd.pts, 1.8);
    let i0 = lane.length - 1;
    while (i0 > 0 && Math.hypot(lane[i0][0] - albert.x, lane[i0][1] - albert.z) < 640) i0--;
    const path = lane.slice(i0);
    path[path.length - 1] = [albert.square[0], albert.square[1]];
    let prev = null;
    for (let k = 0; k < 4; k++) {
      const p = path[0], q = path[1];
      const yaw = Math.atan2(q[0] - p[0], q[1] - p[1]);
      const back = k * 17;
      const t = new WW1.Vehicle('truck', p[0] - Math.sin(yaw) * back, p[1] - Math.cos(yaw) * back, yaw);
      t.path = path.map(pt => pt.slice());
      t.path[t.path.length - 1] = [albert.square[0] - Math.sin(yaw) * k * 13, albert.square[1] - Math.cos(yaw) * k * 13];
      t.aiSpeed = 12; t.follow = prev; prev = t;
      convoy.push(t);
      // soldiers sentados na carroceria
      for (let s = 0; s < 6; s++) {
        if (k === 1 && s === 5) continue;
        const r = new WW1.Rig('allies');
        r.kneelTarget = 1; r.kneel = 1; r.animate(0, 0.016, 0);
        r.root.position.set(s < 3 ? 0.65 : -0.65, 0.65, -0.6 - (s % 3) * 1.05);
        r.root.rotation.y = s < 3 ? -Math.PI / 2 : Math.PI / 2;
        t.model.add(r.root);
        riders.push(r);
      }
    }
    const mine = convoy[1];
    mine.onArrive = () => { if (G.mode === 'ride') G.disembark(); };
    G.mode = 'ride'; G.vehicle = mine;
    G.camYaw = Math.PI; G.camPitch = -0.05;
    G.introT = 0;
    G.objective = 'Chegando a Albert com o comboio de reforços.';
    G.marker = null;
    const intro = [
      [1, 'Julho de 1916. A grande ofensiva do Somme começou.'],
      [7, 'Você chega de caminhão com os reforços para a frente.'],
      [13, 'Albert, a cidade logo atrás das trincheiras britânicas.'],
      [19, 'Função: ' + ROLE_NAMES[G.role] + ' — posto: ' + RANKS[G.rank] + '.'],
    ];
    G.msgQueue = intro;
  }

  G.skipIntro = function () {
    if (G.mode !== 'ride') return;
    for (const t of convoy) {
      const end = t.path[t.path.length - 1];
      const pre = t.path[Math.max(0, t.path.length - 2)];
      t.pos.set(end[0], 0, end[1]);
      t.yaw = Math.atan2(end[0] - pre[0], end[1] - pre[1]);
      t.pathIdx = t.path.length; t.speed = 0; t.place();
    }
    G.disembark();
  };

  G.disembark = function () {
    const pl = WW1.game.player, t = G.vehicle;
    const c = Math.cos(t.yaw), s = Math.sin(t.yaw);
    const lx = 2.2, lz = -3.6;
    const x = t.pos.x + lx * c + lz * s, z = t.pos.z - lx * s + lz * c;
    G.mode = 'foot'; G.vehicle = null;
    pl.pos.set(x, O.S(x, z), z);
    pl.yaw = t.yaw + Math.PI * 0.5; pl.pitch = 0;
    pl.controls = true;
    G.msgQueue = [];
    // os soldados descem e ficam pela praça
    for (const r of riders) r.root.parent && r.root.parent.remove(r.root);
    riders = [];
    for (const tr of convoy) { tr.path = null; tr.speed = 0; parked.push(tr); }
    convoy = [];
    msg('Bem-vindo a Albert, ' + RANKS[G.rank].toLowerCase() + '!', 3);
    if (G.role === 'soldier') { G.objective = 'Vá ao quartel-general (bandeira) para receber missões. Caminhões estacionados podem ser dirigidos.'; G.marker = places.hq; }
    if (G.role === 'tank') { G.objective = 'Vá ao depósito de tanques. Use um caminhão ou a viagem rápida no MAPA.'; G.marker = places.depot; }
    if (G.role === 'artillery') { G.objective = 'Vá à bateria de artilharia. Use um caminhão ou a viagem rápida no MAPA.'; G.marker = places.battery; }
    if (G.role === 'commander') { G.objective = 'Vá ao quartel-general para assumir o comando da divisão.'; G.marker = places.hq; }
  };

  // ---------------- alvos da artilharia ----------------
  function makeTargets() {
    gunTargets = [];
    const R = WW1.RNG(77 + G.done);
    const kinds = [['Bateria alemã', 900, 1], ['Ninho de metralhadora', 80, 1], ['Depósito de munição', 600, 1], ['Posto de comando', 400, 2], ['Cruzamento de trincheiras', 30, 2]];
    for (let i = 0; i < 4; i++) {
      const [name, depth, hits] = kinds[R.int(kinds.length)];
      const x = places.battery.x + R.range(-700, 700);
      const z = O.germanZ(x) + depth * R.range(0.8, 1.2);
      gunTargets.push({ name, x, z, y: O.H(x, z), hits, need: hits, sector: O.sectorOf(x), marker: makeTargetModel(name, x, z) });
    }
  }
  function makeTargetModel(name, x, z) {
    const g = new THREE.Group(), y = O.H(x, z);
    if (name === 'Bateria alemã') {
      for (let i = 0; i < 3; i++) { const fg = new WW1.FieldGun(x - 8 + i * 8, z, Math.PI); fg.model.traverse(o => { if (o.isMesh) o.material = o.material.clone(); }); g.userData.guns = (g.userData.guns || []).concat(fg); }
    } else {
      const b = new WW1.GeoBuilder(false);
      for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; b.add(WW1.prim.lowSph(), WW1.trs(x + Math.sin(a) * 3, O.H(x + Math.sin(a) * 3, z + Math.cos(a) * 3) + 0.15, z + Math.cos(a) * 3, [0, a * 57, 0], 0.4, 0.3, 0.7)); }
      if (name === 'Depósito de munição') for (let i = 0; i < 6; i++) b.box(x - 1.5 + (i % 3) * 1.1, y + 0.3 + Math.floor(i / 3) * 0.5, z, 1, 0.45, 0.6);
      g.add(b.mesh(O.mats.bag));
    }
    WW1.game.scene.add(g);
    return g;
  }

  // ---------------- população ao redor do jogador ----------------
  function updateGarrison(px, pz) {
    const near = Math.abs(pz - O.frontZ(px)) < 430;
    const want = new Set();
    if (near) {
      for (let xi = Math.floor((px - 200) / 14); xi <= Math.floor((px + 200) / 14); xi++) {
        const x = xi * 14 + 7;
        if (x < -2960 || x > 2960) continue;
        for (const side of ['allied', 'german']) {
          const key = side + xi;
          if (deadSlots.has(key)) continue;
          want.add(key);
          if (slotSoldiers.has(key)) continue;
          const owner = side === 'allied' ? 'allied' : G.sectors[O.sectorOf(x)];
          const team = owner === 'allied' ? 'allies' : 'central';
          const tz = side === 'allied' ? O.alliedZ(x) : O.germanZ(x);
          const off = team === 'central' ? -O.API.STEPOFF : O.API.STEPOFF;
          const sy = O.stepY(x);
          const s = new WW1.Soldier(team, 'defender', x, sy, tz + off, team === 'central' ? Math.PI : 0);
          s.holdStep(sy, team === 'central' ? Math.PI : 0);
          s.rushes = false; s.active = true;
          s.accuracy = team === 'central' ? 0.16 : 0.12;
          s.slot = key;
          s.onDeath = () => { deadSlots.add(key); if (team === 'central' && G.mission && G.mission.onKill) G.mission.onKill(s); };
          slotSoldiers.set(key, s);
        }
      }
    }
    for (const [key, s] of slotSoldiers) if (!want.has(key) || s.pos.distanceTo(WW1.game.player.pos) > 330) { s.remove(); slotSoldiers.delete(key); }
  }
  G.slotsAlive = function (x0, x1) {
    let n = 0;
    for (let xi = Math.floor((x0 - 7) / 14); xi <= Math.floor((x1 - 7) / 14); xi++) {
      const x = xi * 14 + 7;
      if (x < x0 || x > x1) continue;
      if (G.sectors[O.sectorOf(x)] === 'german' && !deadSlots.has('german' + xi)) n++;
    }
    return n;
  };

  function updateTowns(px, pz) {
    for (const t of O.towns) {
      const d = Math.hypot(t.x - px, t.z - pz);
      let list = townPop.get(t.name);
      if (d < t.r + 160 && !list && t.side !== 'ruin') {
        list = [];
        const german = t.side === 'german' && !(t.name === 'Bapaume' && G.finalWon);
        const n = german ? (t.name === 'Bapaume' ? 14 : 8) : 8;
        const R = WW1.RNG(Math.round(t.x + t.z));
        for (let i = 0; i < n; i++) {
          const [x, z] = t.toW(R.range(-t.r * 0.7, t.r * 0.7), R.range(-3, 3));
          const s = new WW1.Soldier(german ? 'central' : 'allies', german ? 'attacker' : (i === 0 ? 'officer' : 'ally'), x, O.H(x, z), z, R() * 6.28);
          s.rushes = false;
          s.active = german;
          s.accuracy = 0.18;
          s.town = t;
          if (!german) s.wander = 1;
          if (german) s.onDeath = () => { if (G.mission && G.mission.onKill) G.mission.onKill(s); };
          list.push(s);
        }
        townPop.set(t.name, list);
      } else if (list && d > t.r + 260) {
        list.forEach(s => s.remove());
        townPop.delete(t.name);
      }
      if (list) for (const s of list) {
        if (s.dead || !s.wander) continue;
        if (!s.moving && Math.random() < 0.004) {
          const [x, z] = t.toW(WW1.rand(-t.r * 0.6, t.r * 0.6), WW1.rand(-3, 3));
          s.runSpeed = 1.4; s.goTo(x, z);
        }
      }
    }
  }
  G.townAlive = name => (townPop.get(name) || []).filter(s => !s.dead && s.team === 'central').length;
  G.townSpawned = name => townPop.has(name);

  // ---------------- interação (botão USAR / triângulo / E) ----------------
  function findInteraction(pl) {
    const p = pl.pos;
    if (G.mode !== 'foot') return null;
    const cands = [];
    const dist = o => Math.hypot(o.x - p.x, o.z - p.z);
    if (dist(places.hq) < 6) cands.push([dist(places.hq), G.role === 'commander' ? 'Assumir o comando da divisão' : 'Ver missões no quartel-general', () => (G.role === 'commander' ? WW1.ui.openCommand() : WW1.ui.openMissions())]);
    const officer = { x: places.depot.x, z: places.depot.z - 12 };
    if (G.role === 'tank' && dist(officer) < 5) cands.push([dist(officer), 'Receber ordens de ataque com tanque', () => WW1.ui.openMissions()]);
    for (const g of guns) if (dist(g.pos) < 3.5) cands.push([dist(g.pos), 'Operar o canhão de 18 libras', () => enterGun(g)]);
    for (const v of WW1.vehicles) {
      if (v.dead || v.path) continue;
      const d = dist(v.pos) - v.len * 0.3;
      if (d < 5) cands.push([d, v.tank ? 'Entrar no tanque Mark IV' : 'Dirigir o caminhão' + (v.cargo ? ' de munição' : ''), () => enterVehicle(v)]);
    }
    if (!cands.length) return null;
    cands.sort((x, y) => x[0] - y[0]);
    return [cands[0][1], cands[0][2]];
  }
  G.interact = function () {
    const pl = WW1.game.player;
    if (G.mode === 'drive') return exitVehicle();
    if (G.mode === 'gun') return exitGun();
    if (G.mode === 'ride') return G.skipIntro();
    const it = findInteraction(pl);
    if (it) it[1]();
  };

  function enterVehicle(v) {
    const pl = WW1.game.player;
    G.mode = 'drive'; G.vehicle = v; v.driver = 'player';
    G.camYaw = v.yaw; G.camPitch = -0.18;
    pl.armor = v.tank ? 0.12 : 0.7;
    pl.ads = false; pl.crouch = false;
    WW1.audio.play2D('thump', 0.6, 0.8);
    msg(v.tank ? 'Tanque Mark IV: joystick dirige, ATIRAR dispara o canhão' : 'Caminhão: joystick dirige', 3);
  }
  function exitVehicle() {
    const pl = WW1.game.player, v = G.vehicle;
    if (!v) return;
    if (Math.abs(v.speed) > 2) { msg('Pare o veículo antes de sair', 1.5); return; }
    v.driver = null; v.speed = 0;
    const c = Math.cos(v.yaw), s = Math.sin(v.yaw);
    for (const lx of [v.wid / 2 + 1.2, -(v.wid / 2 + 1.2)]) {
      const x = v.pos.x + lx * c, z = v.pos.z - lx * s;
      if (O.S(x, z) - v.pos.y < 1.5) { pl.pos.set(x, O.S(x, z), z); break; }
    }
    pl.yaw = v.yaw; pl.pitch = 0;
    G.mode = 'foot'; G.vehicle = null; pl.armor = 0;
  }
  function enterGun(g) {
    G.mode = 'gun'; G.gun = g; G.observe = false;
    G.camYaw = g.yaw;
    msg('Canhão de 18 libras: arraste/analógico para mirar, FOGO para disparar', 3.5);
    if (G.role === 'artillery' && !G.mission) G.mission = artilleryMission();
  }
  function exitGun() { G.mode = 'foot'; G.gun = null; G.observe = false; }
  G.toggleObserve = () => { if (G.mode === 'gun') G.observe = !G.observe; };

  // ---------------- controle do jogador fora do modo "a pé" ----------------
  // Retorna true quando o modo especial cuidou do jogador neste quadro.
  G.controlPlayer = function (pl, dt) {
    if (G.mode === 'foot') return false;
    const cam = pl.camera;
    pl.vm.visible = false;
    const ldx = pl.lookDX, ldy = pl.lookDY;
    pl.lookDX = pl.lookDY = 0;
    G.lookHeld = Math.abs(ldx) + Math.abs(ldy) > 0.01;
    if (G.mode === 'gun') {
      G.camYaw -= ldx * DEG * 0.3;
      if (G.gun) G.gun.elev = WW1.clamp(G.gun.elev + ldy * DEG * 0.2, 0, 40 * DEG);
    } else {
      G.camYaw -= ldx * DEG;
      G.camPitch = WW1.clamp(G.camPitch + ldy * DEG, -1.2, 0.6);
    }
    if (G.mode === 'ride') {
      const v = G.vehicle;
      v.model.updateMatrixWorld(true);
      const seat = v.model.localToWorld(new V(0.0, 2.05, -2.7));
      pl.pos.set(seat.x, seat.y - 1.6, seat.z);
      cam.position.copy(seat);
      cam.rotation.set(G.camPitch, v.yaw + G.camYaw + Math.PI, 0, 'YXZ');
      cam.fov = 62; cam.updateProjectionMatrix();
      return true;
    }
    if (G.mode === 'drive') {
      const v = G.vehicle;
      if (v.dead) { exitVehicleForce(pl); return true; }
      v.update(dt, { throttle: pl.moveY, steer: pl.moveX });
      pl.pos.set(v.pos.x, v.pos.y + (v.tank ? 1.0 : 0.5), v.pos.z);
      // câmera atrás do veículo (volta sozinha para trás quando não mexe)
      if (Math.abs(pl.moveY) > 0.1 && !G.lookHeld) G.camYaw += WW1.angleDelta(G.camYaw, v.yaw) * Math.min(1, dt * 1.5);
      const dist = v.tank ? 12 : 9.5, h = v.tank ? 4.2 : 3.4;
      const f = new V(Math.sin(G.camYaw), 0, Math.cos(G.camYaw));
      const tgt = new V(v.pos.x, v.pos.y + h * 0.6, v.pos.z);
      const want = tgt.clone().addScaledVector(f, -dist * Math.cos(G.camPitch)).add(new V(0, h - Math.sin(G.camPitch) * dist, 0));
      // se uma casa ou morro esconder o veículo, a câmera sobe até enxergar por cima
      const clear = q2 => { for (let i = 1; i <= 12; i++) { const q = tgt.clone().lerp(q2, i / 12); if (q.y < O.S(q.x, q.z) + 0.6) return false; } return true; };
      let lift = 0;
      while (lift < 16 && !clear(want.clone().add(new V(0, lift, 0)))) lift += 2;
      G.camLift = G.camLift === undefined ? lift : G.camLift + (lift - G.camLift) * Math.min(1, dt * (lift > G.camLift ? 6 : 1.5));
      const cp = want.clone().add(new V(0, G.camLift, 0));
      cp.y = Math.max(cp.y, O.S(cp.x, cp.z) + 1.2);
      cam.position.copy(cp);
      cam.lookAt(tgt.x + f.x * 6, tgt.y + 1, tgt.z + f.z * 6);
      cam.fov = 64; cam.updateProjectionMatrix();
      engineSound(v, dt);
      if (v.tank && pl.wantFire) {
        const d = new V(0, 0, -1).applyQuaternion(cam.quaternion);
        d.y += 0.04; d.normalize();
        if (v.fireCannon(d)) pl.addShake(0.3); else if (v.reload > 0) msg('Recarregando o canhão...', 0.8);
      }
      if (v.tank && pl.wantMG) tankMG(v, cam, dt);
      pl.wantFire = false;
      return true;
    }
    if (G.mode === 'gun') {
      const g = G.gun;
      g.yaw = G.camYaw;
      g.update(dt);
      if (pl.wantFire) {
        if (g.fire(200, hit => artilleryImpact(hit))) pl.addShake(0.5);
        pl.wantFire = false;
      }
      if (G.observe && G.mission && G.mission.target) {
        const t = G.mission.target;
        cam.position.set(t.x - 60, t.y + 110, t.z - 140);
        cam.lookAt(t.x, t.y, t.z);
        cam.fov = 40;
      } else {
        const f = new V(Math.sin(g.yaw), 0, Math.cos(g.yaw));
        cam.position.set(g.pos.x - f.x * 4.5, g.pos.y + 2.2, g.pos.z - f.z * 4.5);
        cam.rotation.set(-0.05 + g.elev * 0.3, g.yaw + Math.PI, 0, 'YXZ');
        cam.fov = 55;
      }
      cam.updateProjectionMatrix();
      pl.pos.set(g.pos.x - Math.sin(g.yaw) * 2, g.pos.y, g.pos.z - Math.cos(g.yaw) * 2);
      return true;
    }
    if (G.mode === 'command') {
      const t = WW1.performance || performance.now() / 1000;
      const cx = G.cmdFocus ? G.cmdFocus.x : 0, cz = G.cmdFocus ? G.cmdFocus.z : 300;
      cam.position.set(cx + Math.sin(t * 0.05) * 140, 120, cz - 260);
      cam.lookAt(cx, 20, cz);
      cam.fov = 55; cam.updateProjectionMatrix();
      return true;
    }
    return false;
  };
  function exitVehicleForce(pl) {
    const v = G.vehicle;
    G.mode = 'foot'; G.vehicle = null; pl.armor = 0;
    if (v) pl.pos.set(v.pos.x + 3, O.S(v.pos.x + 3, v.pos.z), v.pos.z);
    msg('O veículo foi destruído!', 3);
  }

  let engT = 0;
  function engineSound(v, dt) {
    engT -= dt;
    if (engT <= 0) {
      engT = v.tank ? 0.22 : 0.16;
      const rate = 0.5 + Math.abs(v.speed) / v.maxSpeed * (v.tank ? 0.4 : 0.9);
      WW1.audio.play2D('thump', v.tank ? 0.35 : 0.22, rate * (v.tank ? 0.55 : 0.9));
    }
  }
  let mgT = 0;
  function tankMG(v, cam, dt) {
    mgT -= dt;
    if (mgT > 0) return;
    mgT = 0.12;
    const d = new V(0, 0, -1).applyQuaternion(cam.quaternion);
    const o = new V(v.pos.x, v.pos.y + 1.5, v.pos.z).addScaledVector(d, 3);
    const spread = new V(WW1.rand(-0.03, 0.03), WW1.rand(-0.02, 0.02), WW1.rand(-0.03, 0.03));
    d.add(spread).normalize();
    const g = WW1.world.rayHit(o, d, 300);
    const hit = WW1.raySoldiers(o, d, g ? g.dist : 300, s => s.team === 'central');
    let end = g ? new V(g.x, g.y, g.z) : o.clone().addScaledVector(d, 300);
    if (hit) { hit.soldier.damage(45, o); if (hit.soldier.dead) WW1.game.kills++; WW1.ui.hitMarker(hit.soldier.dead, false); end = o.clone().addScaledVector(d, hit.t); }
    else if (g) WW1.fx.impact(g.x, g.y, g.z);
    WW1.fx.tracer(o, end, true);
    WW1.audio.play2D('mg', 0.6, 1.05);
  }

  // ---------------- missões ----------------
  function sectorTrench(sec, side) {
    const x = O.sectorX(sec);
    return { x, z: side === 'german' ? O.germanZ(x) : O.alliedZ(x), y: O.H(x, side === 'german' ? O.germanZ(x) : O.alliedZ(x)) };
  }
  function completeMission(text) {
    G.done++;
    const old = G.rank;
    G.rank = Math.min(RANKS.length - 1, Math.floor(G.done / 2));
    save();
    msg(text + (G.rank > old ? '  Promovido a ' + RANKS[G.rank] + '!' : ''), 4);
    WW1.audio.play2D('whistle', 0.4, 1.2);
    G.mission = null; G.marker = null; G.timer = '';
    G.objective = G.role === 'artillery' ? 'Volte ao canhão para novos alvos.' : 'Missão cumprida. Volte ao quartel-general para novas ordens (ou explore o mapa).';
    if (G.role === 'tank') G.objective = 'Missão cumprida. Volte ao depósito de tanques para novas ordens.';
    if (G.alliedSectors() >= 8 && !G.finalOffered) { G.finalOffered = true; setTimeout(() => msg('A linha alemã está rompida! A ofensiva final sobre Bapaume está disponível no QG.', 5), 4500); }
  }
  function captureSector(sec) {
    if (G.sectors[sec] === 'allied') return;
    G.sectors[sec] = 'allied';
    save();
    // a guarnição alemã restante do setor se rende
    for (const [key, s] of slotSoldiers) if (key.startsWith('german') && O.sectorOf(s.pos.x) === sec) { s.remove(); slotSoldiers.delete(key); }
    msg('Setor ' + (sec + 1) + ' capturado!', 3);
  }
  G.captureSector = captureSector;

  G.missionOffers = function () {
    const R = WW1.RNG(1000 + G.done * 17);
    const open = [];
    for (let i = 2; i < 18; i++) if (G.sectors[i] === 'german') open.push(i);
    const pick = () => open.length ? open[R.int(open.length)] : 9;
    if (G.role === 'tank') {
      return [0, 1, 2].map(() => { const s = pick(); return { type: 'tank', sector: s, title: 'Romper a linha no setor ' + (s + 1), desc: 'Leve o tanque até a trincheira alemã e destrua os dois ninhos de metralhadora.' }; });
    }
    const list = [];
    if (G.alliedSectors() >= 8) list.push({ type: 'final', title: 'OFENSIVA FINAL: tomar Bapaume', desc: 'Atravesse as linhas e elimine a guarnição alemã na praça de Bapaume.' });
    const types = ['assault', 'mg', 'supply', 'defend'];
    while (list.length < 3) {
      const t = types[R.int(types.length)], s = pick();
      if (list.some(m => m.type === t)) continue;
      const titles = { assault: 'Assalto à trincheira do setor ' + (s + 1), mg: 'Destruir ninho de metralhadora (setor ' + (s + 1) + ')', supply: 'Levar munição para a frente (setor ' + (s + 1) + ')', defend: 'Defender a linha no setor ' + (s + 1) };
      const descs = {
        assault: 'Junte-se ao pelotão na trincheira aliada e tome a trincheira alemã em frente.',
        mg: 'Uma MG 08 está segurando o avanço. Destrua com granadas ou abata o atirador.',
        supply: 'Dirija o caminhão de munição de Albert até o depósito atrás da trincheira.',
        defend: 'Os alemães vão atacar. Segure a trincheira aliada contra três ondas.',
      };
      list.push({ type: t, sector: s, title: titles[t], desc: descs[t] });
    }
    return list;
  };

  G.acceptMission = function (o) {
    const m = { ...o, stage: 0, t: 0 };
    if (o.type === 'assault') {
      const a = sectorTrench(o.sector, 'allied'), gz = sectorTrench(o.sector, 'german');
      m.update = dt => {
        const pl = WW1.game.player;
        if (m.stage === 0) {
          G.objective = 'Vá até a trincheira aliada do setor ' + (o.sector + 1) + '.';
          G.marker = a;
          if (Math.hypot(pl.pos.x - a.x, pl.pos.z - a.z) < 22) {
            m.stage = 1;
            WW1.audio.playAt('whistle', a.x, a.y + 1, a.z, 1, 1, 15);
            msg('AO ATAQUE!', 2.5);
            for (let i = 0; i < 6; i++) {
              const x = a.x - 15 + i * 6, z = O.alliedZ(x) + 1;
              const s = new WW1.Soldier('allies', 'ally', x, O.H(x, z), z, 0);
              s.active = true;
              s.goTo(x + WW1.rand(-4, 4), O.germanZ(x) - 14);
              s.waypoints = [[x, O.germanZ(x) + 1]];
              s.arrived = q => q.holdStep(O.stepY(q.pos.x), 0);
            }
          }
        } else {
          const n = G.slotsAlive(gz.x - 55, gz.x + 55);
          G.objective = 'Tome a trincheira alemã: ' + n + ' defensores restantes.';
          G.marker = gz;
          if (n === 0) { captureSector(o.sector); completeMission('Trincheira tomada!'); }
        }
      };
    } else if (o.type === 'mg' || o.type === 'tank') {
      m.nests = [];
      m.update = dt => {
        const pl = WW1.game.player;
        const t = sectorTrench(o.sector, 'german');
        if (m.stage === 0) {
          G.objective = o.type === 'tank' ? 'Leve o tanque até o setor ' + (o.sector + 1) + ' e ataque a linha alemã.' : 'Vá até o setor ' + (o.sector + 1) + ' e destrua o ninho de metralhadora.';
          G.marker = sectorTrench(o.sector, 'allied');
          if (Math.hypot(pl.pos.x - t.x, pl.pos.z - t.z) < 320) {
            m.stage = 1;
            const xs = o.type === 'tank' ? [t.x - 25, t.x + 25] : [t.x];
            for (const x of xs) {
              const n = new WW1.MGNest(x, O.germanZ(x) - 3.6);
              n.active = true;
              m.nests.push(n); WW1.mgNests.push(n);
            }
          }
        } else {
          const left = m.nests.filter(n => !n.destroyed);
          G.objective = left.length + (left.length === 1 ? ' ninho de metralhadora restante.' : ' ninhos de metralhadora restantes.');
          G.marker = left[0] ? { x: left[0].pos.x, y: left[0].pos.y, z: left[0].pos.z } : null;
          if (!left.length) {
            if (o.type === 'tank') captureSector(o.sector);
            completeMission(o.type === 'tank' ? 'A linha foi rompida pelos tanques!' : 'Ninho de metralhadora destruído!');
          }
        }
      };
      m.cleanup = () => { for (const n of m.nests) { const i = WW1.mgNests.indexOf(n); if (i >= 0) WW1.mgNests.splice(i, 1); } };
    } else if (o.type === 'supply') {
      const albert = O.towns.find(t => t.hq);
      const [x, z] = albert.toW(-8, 5);
      const truck = new WW1.Vehicle('truck', x, z, albert.ang);
      truck.cargo = true;
      parked.push(truck);
      const dest = { x: O.sectorX(o.sector), z: O.alliedZ(O.sectorX(o.sector)) - 70 };
      dest.y = O.H(dest.x, dest.z);
      m.update = dt => {
        if (truck.dead) { G.mission = null; msg('O caminhão de munição foi destruído. Missão fracassada.', 3); return; }
        if (G.vehicle !== truck) { G.objective = 'Pegue o caminhão de munição em Albert.'; G.marker = { x: truck.pos.x, y: truck.pos.y, z: truck.pos.z }; return; }
        G.objective = 'Leve a munição até o depósito do setor ' + (o.sector + 1) + '.';
        G.marker = dest;
        if (Math.hypot(truck.pos.x - dest.x, truck.pos.z - dest.z) < 18) completeMission('Munição entregue na frente!');
      };
    } else if (o.type === 'defend') {
      const a = sectorTrench(o.sector, 'allied');
      m.wave = 0; m.list = [];
      m.update = dt => {
        const pl = WW1.game.player;
        if (m.stage === 0) {
          G.objective = 'Vá até a trincheira aliada do setor ' + (o.sector + 1) + ' e prepare-se.';
          G.marker = a;
          if (Math.hypot(pl.pos.x - a.x, pl.pos.z - a.z) < 25) { m.stage = 1; m.t = 5; msg('Eles estão vindo!', 2.5); }
          return;
        }
        m.t -= dt;
        const alive = m.list.filter(s => !s.dead).length;
        if (m.t <= 0 && m.wave < 3 && alive < 3) {
          m.wave++; m.t = 25;
          for (let i = 0; i < 6; i++) {
            const x = a.x + WW1.rand(-30, 30), z = O.germanZ(x) - 3;
            const s = new WW1.Soldier('central', 'attacker', x, O.H(x, z), z, Math.PI);
            s.active = true; s.accuracy = 0.18;
            s.goTo(x + WW1.rand(-5, 5), O.alliedZ(x) + 12);
            s.arrived = q => { q.chasePlayer = true; };
            m.list.push(s);
          }
          if (m.wave > 1) msg('Nova onda de ataque!', 2);
        }
        G.objective = 'Defenda a trincheira: onda ' + m.wave + ' de 3 — inimigos: ' + alive;
        G.marker = null;
        if (m.wave >= 3 && alive === 0 && m.t < 23) completeMission('A linha resistiu!');
      };
    } else if (o.type === 'final') {
      const bap = O.towns.find(t => t.name === 'Bapaume');
      m.update = dt => {
        const pl = WW1.game.player;
        const d = Math.hypot(pl.pos.x - bap.x, pl.pos.z - bap.z);
        if (!G.townSpawned('Bapaume') || d > bap.r + 120) {
          G.objective = 'Ofensiva final: chegue a Bapaume.';
          G.marker = { x: bap.square[0], y: O.H(bap.square[0], bap.square[1]), z: bap.square[1] };
          return;
        }
        const n = G.townAlive('Bapaume');
        G.objective = 'Elimine a guarnição de Bapaume: ' + n + ' restantes.';
        if (n === 0) { G.finalWon = true; G.mission = null; WW1.game.victory(); }
      };
    }
    if (G.mission && G.mission.cleanup) G.mission.cleanup();
    G.mission = m;
    msg('Missão: ' + o.title, 3);
  };

  // ---------------- artilharia ----------------
  function artilleryMission() {
    const m = { type: 'artillery', shots: 0 };
    m.pick = () => { m.target = gunTargets.find(t => t.hits > 0) || null; if (!m.target) { makeTargets(); m.target = gunTargets[0]; } };
    m.pick();
    m.update = () => {
      const g = G.gun, t = m.target;
      if (!t) return;
      const dist = Math.hypot(t.x - places.battery.x, t.z - places.battery.z);
      const bearing = ((Math.atan2(t.x - (g ? g.pos.x : places.battery.x), t.z - (g ? g.pos.z : places.battery.z)) / DEG) + 360) % 360;
      G.objective = 'Alvo: ' + t.name + ' — distância ' + Math.round(dist) + ' m, direção ' + Math.round(bearing) + '°. Acertos: ' + (t.need - t.hits) + '/' + t.need;
      G.marker = t;
    };
    return m;
  }
  function artilleryImpact(hit) {
    const m = G.mission;
    if (!m || m.type !== 'artillery' || !m.target) return;
    const t = m.target;
    const dx = hit.x - t.x, dz = hit.z - t.z, d = Math.hypot(dx, dz);
    if (d < 16) {
      t.hits--;
      if (t.marker) { WW1.fx.plume(t.x, t.y + 1, t.z, 0.6); if (t.hits <= 0) t.marker.visible = false; }
      if (t.hits <= 0) {
        G.artKills = (G.artKills || 0) + 1;
        if (G.artKills % 3 === 0) { const s = t.sector; if (G.sectors[s] === 'german') captureSector(s); }
        completeMission('Alvo destruído: ' + t.name + '!');
        G.mission = artilleryMission();
      } else msg('Acerto! Mais um disparo no alvo.', 2.5);
      return;
    }
    // correção do observador
    const g = G.gun || guns[0];
    const fx = Math.sin(g.yaw), fz = Math.cos(g.yaw);
    const along = dx * fx + dz * fz, side = dx * -fz + dz * fx;
    const parts = [];
    if (Math.abs(along) > 8) parts.push(along > 0 ? 'Longo ' + Math.round(along) + ' m' : 'Curto ' + Math.round(-along) + ' m');
    if (Math.abs(side) > 8) parts.push(side > 0 ? 'à direita ' + Math.round(side) + ' m' : 'à esquerda ' + Math.round(-side) + ' m');
    msg('Observador: ' + (parts.join(', ') || 'muito perto!'), 3.5);
  }
  G.gunInfo = () => {
    const g = G.gun;
    if (!g) return '';
    return 'Direção ' + Math.round(((g.yaw / DEG) % 360 + 360) % 360) + '°   Elevação ' + (g.elev / DEG).toFixed(1) + '°' + (g.reload > 0 ? '   (recarregando)' : '');
  };

  // ---------------- comandante (mapa estratégico) ----------------
  G.cmd = null;
  G.initCommand = function () {
    if (G.cmd) return;
    const names = ['1º Royal Fusiliers', '2º Lancashire', '10º Lincolns', '1º Newfoundland', '8º Devons', '2º Middlesex', '16º Highland', '7º Yorkshire'];
    G.cmd = {
      bats: names.map((n, i) => ({ name: n, str: 100, sector: 6 + i, order: 'defend', target: null })),
      german: G.sectors.map(o => (o === 'german' ? 70 + Math.random() * 50 : 0)),
      barrageCd: 0, sel: 0, log: [], time: 0,
    };
  };
  G.cmdOrder = function (batIdx, sector, kind) {
    const c = G.cmd, b = c.bats[batIdx];
    if (kind === 'barrage') {
      if (c.barrageCd > 0) return 'A artilharia ainda está recarregando (' + Math.ceil(c.barrageCd) + ' s).';
      if (G.sectors[sector] === 'allied') return 'Escolha um setor alemão para a barragem.';
      c.barrageCd = 25;
      const loss = c.german[sector] * WW1.rand(0.25, 0.4);
      c.german[sector] -= loss;
      c.log.unshift('Barragem no setor ' + (sector + 1) + ': -' + Math.round(loss) + ' alemães.');
      G.cmdFocus = { x: O.sectorX(sector), z: O.germanZ(O.sectorX(sector)) };
      for (let i = 0; i < 6; i++) WW1.game.later(i * 0.4, () => { const x = O.sectorX(sector) + WW1.rand(-120, 120), z = O.germanZ(x) + WW1.rand(-10, 40); WW1.explode(new V(x, O.H(x, z), z), 8, 0, 1.3, true); });
      return '';
    }
    if (kind === 'attack') {
      if (G.sectors[sector] === 'allied') return 'Esse setor já é nosso.';
      if (Math.abs(sector - b.sector) > 1 && !(G.sectors[sector - 1] === 'allied' || G.sectors[sector + 1] === 'allied')) return 'O batalhão só pode atacar setores vizinhos ou já abertos.';
      b.order = 'attack'; b.target = sector;
      c.log.unshift(b.name + ' ataca o setor ' + (sector + 1) + '.');
      G.cmdFocus = { x: O.sectorX(sector), z: O.germanZ(O.sectorX(sector)) };
      return '';
    }
    if (kind === 'defend') { b.order = 'defend'; b.target = null; b.sector = sector; return ''; }
    return '';
  };
  G.cmdUpdate = function (dt) {
    const c = G.cmd;
    if (!c) return;
    c.time += dt;
    c.barrageCd = Math.max(0, c.barrageCd - dt);
    for (const b of c.bats) {
      if (b.order === 'defend') b.str = Math.min(100, b.str + dt * 0.4);
      if (b.order !== 'attack' || b.target === null) continue;
      const s = b.target, def = c.german[s];
      // combate: perdas dos dois lados
      b.str -= dt * WW1.rand(0.2, 1.2) * (def / 40);
      c.german[s] -= dt * WW1.rand(0.4, 1.4) * (b.str / 35);
      if (c.german[s] <= 0) {
        c.german[s] = 0; captureSector(s); b.sector = s; b.order = 'defend'; b.target = null;
        c.log.unshift(b.name + ' tomou o setor ' + (s + 1) + '!');
      } else if (b.str < 25) {
        b.order = 'defend'; b.target = null;
        c.log.unshift(b.name + ' recuou com pesadas baixas.');
      }
      b.str = Math.max(0, b.str);
    }
    // contra-ataque alemão de vez em quando
    if (Math.random() < dt / 70) {
      const ours = G.sectors.map((o, i) => (o === 'allied' ? i : -1)).filter(i => i >= 0);
      if (ours.length) {
        const s = ours[Math.floor(Math.random() * ours.length)];
        const defenders = c.bats.filter(b => b.sector === s && b.order === 'defend');
        const power = defenders.reduce((a, b) => a + b.str, 0);
        if (power < 40 && Math.random() < 0.5) { G.sectors[s] = 'german'; c.german[s] = 50; save(); c.log.unshift('Contra-ataque alemão retomou o setor ' + (s + 1) + '!'); }
        else { defenders.forEach(b => (b.str -= 10)); c.log.unshift('Contra-ataque alemão repelido no setor ' + (s + 1) + '.'); }
      }
    }
    c.log.length = Math.min(c.log.length, 6);
    if (G.alliedSectors() >= 10 && !G.cmdWon) { G.cmdWon = true; WW1.game.victory(); }
  };

  // ---------------- respawn (ferido em combate) ----------------
  G.respawn = function () {
    const pl = WW1.game.player;
    pl.revive();
    G.mode = 'foot'; G.vehicle = null; G.gun = null; pl.armor = 0;
    const h = places.hospital;
    pl.pos.set(h.x, O.S(h.x, h.z), h.z);
    if (G.mission && G.mission.cleanup) G.mission.cleanup();
    G.mission = null; G.marker = null;
    G.objective = 'Você se recuperou no hospital de campanha. Volte ao quartel-general.';
    msg('Ferido em combate — tratado no hospital de Albert.', 4);
  };

  // ---------------- viagem rápida ----------------
  G.fastTravel = function (p) {
    const pl = WW1.game.player;
    if (G.mode !== 'foot') return;
    WW1.game.fade = 1;
    pl.pos.set(p.x, O.S(p.x, p.z), p.z);
    msg('Viagem até ' + p.name, 2.5);
  };
  G.travelPoints = function () {
    const pts = [places.hq, places.depot, places.battery];
    for (const t of O.towns) if (t.side === 'allied') pts.push({ x: t.square[0], z: t.square[1], name: t.name });
    for (let s = 2; s < 18; s += 3) { const x = O.sectorX(s), z = O.alliedZ(x) - 40; pts.push({ x, z, name: 'Retaguarda do setor ' + (s + 1) }); }
    return pts;
  };

  // ---------------- atualização por quadro ----------------
  G.update = function (dt) {
    const pl = WW1.game.player, p = pl.pos;
    G.introT += dt;
    if (G.msgQueue.length && G.introT >= G.msgQueue[0][0]) { msg(G.msgQueue[0][1], 5.5); G.msgQueue.shift(); }
    for (const v of WW1.vehicles) if (v !== G.vehicle || G.mode === 'ride') v.update(dt, null);
    WW1.vehUpdate(dt);
    for (const g of guns) if (g !== G.gun) g.update(dt);
    if (G.mode !== 'ride' && G.mode !== 'command') { updateGarrison(p.x, p.z); updateTowns(p.x, p.z); }
    for (const n of WW1.mgNests) n.update(dt, true);
    if (G.mission && G.mission.update) G.mission.update(dt);
    // bombardeio alemão perto da frente
    const art = WW1.artillery;
    const nearFront = Math.abs(p.z - O.frontZ(p.x)) < 350 && G.mode !== 'ride' && G.mode !== 'command' && G.mode !== 'gun';
    art.enemy = nearFront; art.shellInterval = 9; art.shellMax = 70;
    // interação disponível
    const it = findInteraction(pl);
    G.prompt = G.mode === 'drive' ? 'Sair do veículo' : G.mode === 'gun' ? 'Deixar o canhão' : G.mode === 'ride' ? 'Pular a viagem' : it ? it[0] : '';
    if (G.mode === 'command') G.cmdUpdate(dt);
  };
})();
