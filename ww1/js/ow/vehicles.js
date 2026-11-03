'use strict';
// Veículos do mundo aberto: caminhão de transporte, tanque Mark IV e canhão de campanha de 18 libras.
(function () {
  const V = THREE.Vector3;
  const DEG = Math.PI / 180;
  const VH = WW1.vehicles = [];
  const projectiles = [];
  let scene, mat, wheelGeo, wheelMat;

  const OLIVE = [0.45, 0.46, 0.33], DARK = [0.12, 0.12, 0.11], CANVAS = [0.64, 0.6, 0.48], WOOD = [0.5, 0.38, 0.26], STEEL = [0.33, 0.34, 0.34];
  const TANKC = [0.55, 0.5, 0.37];

  WW1.vehInit = function (sc) {
    scene = sc;
    VH.length = 0; projectiles.length = 0;
    mat = new THREE.MeshStandardMaterial({ vertexColors: true, map: WW1.tex.cloth, roughness: 0.7, metalness: 0.2 });
    wheelGeo = new WW1.GeoBuilder(true);
    wheelGeo.add(new THREE.CylinderGeometry(0.46, 0.46, 0.22, 14), WW1.trs(0, 0, 0, [0, 0, 90], 1), [0.1, 0.1, 0.1]);
    wheelGeo.add(new THREE.CylinderGeometry(0.28, 0.28, 0.24, 10), WW1.trs(0, 0, 0, [0, 0, 90], 1), OLIVE);
    for (let i = 0; i < 6; i++) wheelGeo.box(0, 0, 0, 0.23, 0.05, 0.8, [i * 30, 0, 0], OLIVE);
    wheelGeo = wheelGeo.build();
    wheelMat = mat;
  };

  // ---------------- Modelos ----------------
  function truckModel() {
    const b = new WW1.GeoBuilder(true);
    b.box(0, 0.75, -0.2, 0.9, 0.22, 6.6, null, DARK);                        // longarinas
    b.box(0, 1.25, 2.85, 1.05, 0.8, 1.3, null, OLIVE);                       // capô
    b.box(0, 1.25, 3.52, 1.1, 0.95, 0.08, null, [0.15, 0.15, 0.13]);         // radiador
    for (let i = 0; i < 7; i++) b.box(-0.42 + i * 0.14, 1.25, 3.57, 0.04, 0.8, 0.02, null, [0.3, 0.3, 0.28]);
    b.ball(0.48, 1.55, 3.45, 0.11, 0.11, 0.08, [0.6, 0.55, 0.3]);            // faróis
    b.ball(-0.48, 1.55, 3.45, 0.11, 0.11, 0.08, [0.6, 0.55, 0.3]);
    b.box(0, 1.55, 1.75, 1.9, 1.5, 0.9, null, OLIVE);                        // cabine
    b.box(0, 2.35, 1.95, 2.0, 0.08, 1.5, null, OLIVE);                       // teto
    b.box(0, 1.95, 2.21, 1.6, 0.55, 0.04, null, [0.12, 0.14, 0.15]);          // para-brisa
    b.box(0.97, 1.7, 2.3, 0.04, 0.9, 1.0, null, OLIVE);                      // portas
    b.box(-0.97, 1.7, 2.3, 0.04, 0.9, 1.0, null, OLIVE);
    b.box(0, 1.1, -1.05, 2.25, 0.12, 4.2, null, WOOD);                        // carroceria
    for (const s of [-1, 1]) b.box(s * 1.1, 1.45, -1.05, 0.06, 0.6, 4.2, null, WOOD);
    b.box(0, 1.45, -3.12, 2.25, 0.6, 0.06, null, WOOD);
    b.box(0, 1.45, 1.03, 2.25, 0.6, 0.06, null, WOOD);
    const tilt = new THREE.CylinderGeometry(1.12, 1.12, 4.1, 14, 1, true, -Math.PI / 2, Math.PI);
    b.add(tilt, WW1.trs(0, 1.75, -1.05, [-90, 0, 0], 1), CANVAS);             // lona
    for (const s of [-1, 1]) b.box(s * 1.12, 1.75, -1.05, 0.03, 0.55, 4.1, null, CANVAS);
    for (const s of [-1, 1]) {
      b.box(s * 0.95, 1.0, 2.55, 0.35, 0.06, 1.1, [8, 0, 0], OLIVE);          // para-lamas
      b.box(s * 1.1, 0.92, -1.6, 0.4, 0.06, 1.3, null, OLIVE);
    }
    b.box(0.75, 0.85, 0.4, 0.5, 0.45, 0.8, null, OLIVE);                     // tanque de combustível
    const g = new THREE.Group();
    g.add(new THREE.Mesh(b.build(), mat));
    const wheels = [];
    for (const [x, z] of [[0.92, 2.55], [-0.92, 2.55], [0.95, -1.6], [-0.95, -1.6], [0.72, -1.6], [-0.72, -1.6]]) {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.position.set(x, 0.46, z);
      g.add(w); wheels.push(w);
    }
    g.traverse(o => { if (o.isMesh) o.castShadow = true; });
    return { group: g, wheels };
  }

  function tankModel() {
    const prof = [[-3.6, 0.0], [2.9, 0.0], [4.2, 1.45], [3.6, 2.45], [-3.4, 2.45], [-4.2, 0.9]];
    const frame = WW1.extrude(prof, 0.66);
    const b = new WW1.GeoBuilder(true);
    b.add(frame, WW1.trs(-1.6, 0, 0, null, 1), TANKC);
    b.add(frame, WW1.trs(1.6, 0, 0, null, 1), TANKC);
    b.box(0, 1.45, 0.2, 2.6, 1.7, 5.6, null, TANKC);
    b.box(0, 2.45, 1.6, 1.3, 0.45, 1.3, null, TANKC);       // cabine do motorista
    b.box(0, 2.42, 1.95, 0.9, 0.12, 0.05, null, DARK);       // visor
    b.box(0, 2.75, -0.8, 1.2, 0.35, 0.8, null, TANKC);      // escotilha
    b.cyl({ x: -1.6, y: 2.9, z: -2.5 }, { x: 1.6, y: 2.9, z: -2.5 }, 0.16, WOOD); // viga de desatolar
    b.cyl({ x: 0.8, y: 2.5, z: -2.0 }, { x: 0.8, y: 3.3, z: -2.0 }, 0.09, STEEL); // escapamento
    for (const s of [-1, 1]) {
      b.box(s * 2.25, 1.3, 0.4, 0.75, 1.15, 2.2, null, TANKC); // sponsons
      b.cyl({ x: s * 2.6, y: 1.45, z: 0.9 }, { x: s * 2.7, y: 1.45, z: 2.9 }, 0.075, STEEL);
      for (let k = 0; k < 22; k++) {
        const t = k / 22, a = t * Math.PI * 2;
        b.box(s * 1.6, 1.2 + Math.sin(a) * 1.25, 0.2 + Math.cos(a) * 3.9 * 1.0, 0.72, 0.06, 0.35, [-a * 180 / Math.PI, 0, 0], [0.22, 0.2, 0.17]); // placas da esteira
      }
    }
    const g = new THREE.Group();
    g.add(new THREE.Mesh(b.build(), mat));
    g.traverse(o => { if (o.isMesh) o.castShadow = true; });
    return { group: g, wheels: [] };
  }

  function gunModel() {
    const g = new THREE.Group();
    const carriage = new WW1.GeoBuilder(true);
    for (const s of [-1, 1]) {
      carriage.add(new THREE.CylinderGeometry(0.72, 0.72, 0.1, 18), WW1.trs(s * 0.85, 0.72, 0, [0, 0, 90], 1), WOOD);
      carriage.add(new THREE.CylinderGeometry(0.12, 0.12, 0.2, 10), WW1.trs(s * 0.85, 0.72, 0, [0, 0, 90], 1), STEEL);
      for (let i = 0; i < 6; i++) carriage.box(s * 0.85, 0.72, 0, 0.06, 1.35, 0.06, [i * 30, 0, 0], WOOD);
    }
    carriage.cyl({ x: -0.85, y: 0.72, z: 0 }, { x: 0.85, y: 0.72, z: 0 }, 0.06, STEEL);
    carriage.box(0, 0.45, -1.7, 0.25, 0.22, 3.2, [-10, 0, 0], OLIVE);   // flecha (trail)
    carriage.box(0, 1.2, 0.45, 1.75, 1.1, 0.05, [-8, 0, 0], OLIVE);     // escudo
    g.add(new THREE.Mesh(carriage.build(), mat));
    const pivot = new THREE.Group();
    pivot.position.set(0, 1.05, 0.2);
    const barrel = new WW1.GeoBuilder(true);
    barrel.cyl({ x: 0, y: 0, z: -0.9 }, { x: 0, y: 0, z: 2.3 }, 0.075, STEEL, true);
    barrel.cyl({ x: 0, y: 0.17, z: -0.8 }, { x: 0, y: 0.17, z: 1.1 }, 0.1, OLIVE, true); // recuperador
    barrel.box(0, 0, -0.95, 0.3, 0.3, 0.35, null, STEEL);              // culatra
    pivot.add(new THREE.Mesh(barrel.build(), mat));
    g.add(pivot);
    g.traverse(o => { if (o.isMesh) o.castShadow = true; });
    return { group: g, pivot };
  }

  // ---------------- Veículo ----------------
  class Vehicle {
    constructor(kind, x, z, yaw) {
      this.kind = kind;
      const m = kind === 'tank' ? tankModel() : truckModel();
      this.model = m.group; this.wheels = m.wheels;
      scene.add(this.model);
      this.pos = new V(x, WW1.world.S(x, z), z);
      this.yaw = yaw; this.speed = 0; this.pitch = 0; this.roll = 0;
      this.tank = kind === 'tank';
      this.len = this.tank ? 8.2 : 6.8; this.wid = this.tank ? 4.2 : 2.3;
      this.maxSpeed = this.tank ? 4.2 : 15; this.maxRev = this.tank ? 2 : 4;
      this.accel = this.tank ? 0.6 : 1.4; this.turnRate = this.tank ? 0.45 : 0.75;
      this.maxStep = this.tank ? 2.4 : 0.9;
      this.hp = this.max = this.tank ? 900 : 250;
      this.driver = null; this.path = null; this.pathIdx = 0; this.aiSpeed = 9; this.follow = null;
      this.reload = 0; this.mgT = 0; this.dead = false;
      this.engineT = 0;
      this.place();
      VH.push(this);
    }
    forward() { return new V(Math.sin(this.yaw), 0, Math.cos(this.yaw)); }
    sample(lx, lz) {
      const c = Math.cos(this.yaw), s = Math.sin(this.yaw);
      const x = this.pos.x + lx * c + lz * s, z = this.pos.z - lx * s + lz * c;
      return WW1.ow ? WW1.ow.H(x, z) : WW1.world.S(x, z); // casas não inclinam o veículo (só bloqueiam)
    }
    place() {
      const L = this.len * 0.42, Wd = this.wid * 0.42;
      const f = this.sample(0, L), b = this.sample(0, -L), l = this.sample(-Wd, 0), r = this.sample(Wd, 0);
      const mid = this.sample(0, 0);
      let y;
      if (this.tank) y = Math.max((f + b) / 2, mid, Math.min(f, b) + 0.4) - 0.05;  // o tanque "passa por cima" das valas
      else y = Math.max((f + b + l + r) / 4, Math.min(f, b));
      this.pos.y = Math.max(y, WW1.ow ? WW1.ow.WATER - 0.6 : -1e9);
      this.pitch = Math.atan2(b - f, this.len * 0.84) * (this.tank ? 0.8 : 1);
      this.roll = Math.atan2(r - l, this.wid * 0.84) * 0.8;
      this.model.position.copy(this.pos);
      this.model.rotation.set(this.pitch, this.yaw, this.roll, 'YXZ');
    }
    blockedAt(x, z) {
      if (x < WW1.world.MINX || x > WW1.world.MAXX || z < WW1.world.MINZ || z > WW1.world.MAXZ) return true;
      const h = WW1.world.S(x, z);
      if (h - this.pos.y > this.maxStep) return true;
      if (!this.tank && this.pos.y - h > 1.5) return true;            // caminhão não desce em trincheira
      if (WW1.ow && WW1.ow.H(x, z) < WW1.ow.WATER - 0.4) return true;  // rio
      for (const o of VH) {
        if (o === this || o.dead) continue;
        const d = Math.hypot(o.pos.x - x, o.pos.z - z);
        if (d < (this.len + o.len) * 0.38 && Math.hypot(o.pos.x - this.pos.x, o.pos.z - this.pos.z) > d) return true;
      }
      return false;
    }
    update(dt, input) {
      if (this.dead) return;
      let throttle = 0, steer = 0;
      if (input) { throttle = input.throttle; steer = input.steer; }
      else if (this.path) [throttle, steer] = this.autopilot();
      const target = throttle >= 0 ? throttle * this.maxSpeed : throttle * this.maxRev;
      const rate = (Math.sign(target - this.speed) !== Math.sign(this.speed) && Math.abs(this.speed) > 0.3 ? 3 : 1) * this.accel;
      this.speed += WW1.clamp(target - this.speed, -rate * 4 * dt, rate * 2.2 * dt);
      const turn = this.tank ? steer * this.turnRate * (Math.abs(this.speed) > 0.2 ? 1 : 1.3) : steer * this.turnRate * WW1.clamp(this.speed / 5, -1, 1);
      this.yaw -= turn * dt;
      if (Math.abs(this.speed) > 0.01) {
        const f = this.forward(), d = this.speed * dt;
        const nx = this.pos.x + f.x * d, nz = this.pos.z + f.z * d;
        const lead = Math.sign(this.speed) * this.len * 0.45;
        if (this.blockedAt(nx + f.x * lead, nz + f.z * lead)) { this.speed *= -0.15; if (input) WW1.audio.play2D('thump', 0.5, 0.6); }
        else { this.pos.x = nx; this.pos.z = nz; }
      }
      this.place();
      for (const w of this.wheels) w.rotation.x += this.speed * dt / 0.46;
      // tanque esmaga quem estiver na frente
      if (this.tank && Math.abs(this.speed) > 0.5) {
        for (const s of WW1.soldiers) {
          if (s.dead || s.team === 'allies') continue;
          const dx = s.pos.x - this.pos.x, dz = s.pos.z - this.pos.z;
          const c = Math.cos(this.yaw), sn = Math.sin(this.yaw);
          const lx = dx * c - dz * sn, lz = dx * sn + dz * c;
          if (Math.abs(lx) < 2.2 && Math.abs(lz) < 4.2) { s.damage(999, this.pos); if (this.driver === 'player') WW1.game.kills++; }
        }
      }
      this.reload = Math.max(0, this.reload - dt);
    }
    autopilot() {
      if (this.pathIdx >= this.path.length) return [0, 0];
      const p = this.path[this.pathIdx];
      const dx = p[0] - this.pos.x, dz = p[1] - this.pos.z, d = Math.hypot(dx, dz);
      if (d < 6) { this.pathIdx++; if (this.pathIdx >= this.path.length && this.onArrive) this.onArrive(this); return this.autopilot(); }
      const want = Math.atan2(dx, dz);
      const err = WW1.angleDelta(this.yaw, want);
      let speed = this.aiSpeed * WW1.clamp(1 - Math.abs(err) * 0.8, 0.25, 1);
      if (this.follow && !this.follow.dead) {
        const fd = Math.hypot(this.follow.pos.x - this.pos.x, this.follow.pos.z - this.pos.z);
        if (fd < 16) speed = Math.min(speed, Math.max(0, (fd - 11) * 1.5));
      }
      return [speed / this.maxSpeed, WW1.clamp(-err * 2.2, -1, 1)];
    }
    damage(amt) {
      if (this.dead) return;
      this.hp -= amt;
      if (this.hp <= 0) {
        this.dead = true; this.speed = 0;
        WW1.fx.explosion(this.pos.x, this.pos.y + 1, this.pos.z, 1.2);
        WW1.fx.plume(this.pos.x, this.pos.y + 2, this.pos.z, 0.6);
        this.model.traverse(o => { if (o.isMesh) { o.material = o.material.clone(); o.material.color.setRGB(0.25, 0.23, 0.2); } });
        if (this.onDestroyed) this.onDestroyed(this);
      }
    }
    // Canhão do tanque (6 libras): projétil rápido na direção da mira
    fireCannon(dir) {
      if (this.reload > 0 || this.dead) return false;
      this.reload = 3.2;
      const side = WW1.angleDelta(this.yaw, Math.atan2(dir.x, dir.z)) > 0 ? 1 : -1;
      const c = Math.cos(this.yaw), s = Math.sin(this.yaw);
      const lx = side * 2.7, lz = 2.9;
      const o = new V(this.pos.x + lx * c + lz * s, this.pos.y + 1.45, this.pos.z - lx * s + lz * c);
      fireShell(o, dir.clone().multiplyScalar(320), 4.5, 240, 0.8, true);
      WW1.fx.muzzle(o.x, o.y, o.z, dir.x, dir.y, dir.z);
      WW1.audio.playAt('explosion', o.x, o.y, o.z, 0.7, 1.6, 6);
      return true;
    }
    dispose() { scene.remove(this.model); const i = VH.indexOf(this); if (i >= 0) VH.splice(i, 1); }
  }
  WW1.Vehicle = Vehicle;

  // ---------------- Canhão de campanha ----------------
  class FieldGun {
    constructor(x, z, yaw) {
      const m = gunModel();
      this.model = m.group; this.pivot = m.pivot;
      this.pos = new V(x, WW1.world.H(x, z), z);
      this.model.position.copy(this.pos);
      this.yaw = yaw; this.elev = 12 * DEG; this.reload = 0; this.recoil = 0;
      this.model.rotation.y = yaw;
      scene.add(this.model);
    }
    muzzle() {
      const d = this.dir();
      return new V(this.pos.x, this.pos.y + 1.05, this.pos.z).addScaledVector(d, 2.4);
    }
    dir() {
      return new V(Math.sin(this.yaw) * Math.cos(this.elev), Math.sin(this.elev), Math.cos(this.yaw) * Math.cos(this.elev));
    }
    fire(speed, onImpact) {
      if (this.reload > 0) return false;
      this.reload = 4;
      this.recoil = 1;
      const m = this.muzzle(), d = this.dir();
      fireShell(m, d.clone().multiplyScalar(speed), 10, 280, 1.6, false, onImpact);
      WW1.fx.muzzle(m.x, m.y, m.z, d.x, d.y, d.z);
      WW1.fx.explosion(m.x + d.x * 0.5, m.y - 0.8, m.z + d.z * 0.5, 0.25);
      WW1.audio.play2D('explosion', 1, 1.5);
      WW1.audio.play2D('rifle', 0.8, 0.5);
      return true;
    }
    update(dt) {
      this.reload = Math.max(0, this.reload - dt);
      this.recoil = Math.max(0, this.recoil - dt * 2.5);
      this.model.rotation.y = this.yaw;
      this.pivot.rotation.x = -this.elev;
      this.pivot.position.z = 0.2 - this.recoil * 0.5;
    }
  }
  WW1.FieldGun = FieldGun;

  // ---------------- Projéteis (granadas de artilharia e do tanque) ----------------
  function fireShell(o, vel, radius, dmg, scale, flat, onImpact) {
    const mesh = new THREE.Mesh(WW1.prim.lowSph(), new THREE.MeshBasicMaterial({ color: 0x222222 }));
    mesh.scale.setScalar(0.18);
    mesh.position.copy(o);
    scene.add(mesh);
    projectiles.push({ pos: o.clone(), vel, radius, dmg, scale, mesh, t: 0, flat, onImpact, whistle: false });
  }
  WW1.fireShell = fireShell;
  WW1.projectiles = projectiles;

  WW1.vehUpdate = function (dt) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      p.t += dt;
      const steps = 4;
      let hit = null;
      for (let k = 0; k < steps && !hit; k++) {
        const h = dt / steps;
        p.vel.y -= 9.8 * h * (p.flat ? 0.3 : 1);
        p.pos.addScaledVector(p.vel, h);
        const g = WW1.world.S(p.pos.x, p.pos.z);
        if (p.pos.y <= g || p.t > 40) hit = new V(p.pos.x, Math.max(g, p.pos.y), p.pos.z);
        // acerto direto em veículo
        for (const v of VH) if (!v.dead && p.flat && p.t > 0.05 && v.pos.distanceTo(p.pos) < 3) hit = p.pos.clone();
      }
      p.mesh.position.copy(p.pos);
      const pl = WW1.game.player;
      if (!p.whistle && pl && p.vel.y < 0 && !p.flat && p.pos.distanceTo(pl.pos) < 250) {
        p.whistle = true;
        WW1.audio.playAt('incoming', p.pos.x, p.pos.y, p.pos.z, 0.8, 1, 30);
      }
      if (hit) {
        scene.remove(p.mesh);
        projectiles.splice(i, 1);
        WW1.explode(hit, p.radius, p.dmg, p.scale, false);
        for (const v of VH) {
          const d = v.pos.distanceTo(hit);
          if (d < p.radius + 2) v.damage(p.dmg * (1 - d / (p.radius + 2)) * (v.tank ? 0.5 : 1.5));
        }
        if (p.onImpact) p.onImpact(hit);
      }
    }
  };
})();
