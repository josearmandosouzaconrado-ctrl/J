'use strict';
// Efeitos: explosões (fogo, terra, fumaça), impactos, sangue, clarões, traçantes, chuva e gás.
(function () {
  const F = WW1.fx = {};
  const systems = [];
  let scene, flash = null, flashI = 0, tracers, rain, plumes = [], gasAcc = 0;

  const VS = `
    attribute float aSize; attribute vec4 aColor; attribute float aRot;
    varying vec4 vColor; varying float vRot; varying float vFog;
    uniform float uScale; uniform float uFogDensity;
    void main(){
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mv;
      float d = max(0.1, -mv.z);
      gl_PointSize = min(aSize * uScale / d, 1024.0);
      vColor = aColor; vRot = aRot;
      vFog = 1.0 - exp(-uFogDensity * uFogDensity * d * d);
    }`;
  const FS = `
    uniform sampler2D map; uniform vec3 uFogColor; uniform float uAdd;
    varying vec4 vColor; varying float vRot; varying float vFog;
    void main(){
      vec2 c = gl_PointCoord - 0.5;
      float s = sin(vRot), co = cos(vRot);
      vec2 uv = vec2(co * c.x - s * c.y, s * c.x + co * c.y) + 0.5;
      vec4 t = texture2D(map, uv);
      vec4 col = vColor * t;
      if (uAdd > 0.5) col.rgb *= (1.0 - vFog); else col.rgb = mix(col.rgb, uFogColor, vFog);
      if (col.a < 0.004) discard;
      gl_FragColor = col;
    }`;

  class Particles {
    constructor(max, tex, additive, gravity, drag, grow) {
      this.max = max; this.n = 0; this.gravity = gravity; this.drag = drag; this.grow = grow;
      this.p = new Float32Array(max * 3); this.v = new Float32Array(max * 3);
      this.life = new Float32Array(max); this.maxLife = new Float32Array(max);
      this.size0 = new Float32Array(max); this.col = new Float32Array(max * 4); this.rot = new Float32Array(max); this.rotV = new Float32Array(max);
      const g = this.geo = new THREE.BufferGeometry();
      this.aPos = new THREE.BufferAttribute(new Float32Array(max * 3), 3).setUsage(THREE.DynamicDrawUsage);
      this.aSize = new THREE.BufferAttribute(new Float32Array(max), 1).setUsage(THREE.DynamicDrawUsage);
      this.aColor = new THREE.BufferAttribute(new Float32Array(max * 4), 4).setUsage(THREE.DynamicDrawUsage);
      this.aRot = new THREE.BufferAttribute(new Float32Array(max), 1).setUsage(THREE.DynamicDrawUsage);
      g.setAttribute('position', this.aPos); g.setAttribute('aSize', this.aSize); g.setAttribute('aColor', this.aColor); g.setAttribute('aRot', this.aRot);
      g.setDrawRange(0, 0);
      this.mat = new THREE.ShaderMaterial({
        uniforms: { map: { value: tex }, uScale: { value: 500 }, uFogDensity: { value: 0.0115 }, uFogColor: { value: new THREE.Vector3(0.47, 0.48, 0.47) }, uAdd: { value: additive ? 1 : 0 } },
        vertexShader: VS, fragmentShader: FS, transparent: true, depthWrite: false,
        blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      this.points = new THREE.Points(g, this.mat);
      this.points.frustumCulled = false;
      scene.add(this.points);
      systems.push(this);
    }
    emit(x, y, z, vx, vy, vz, size, life, r, g, b, a) {
      let i = this.n;
      if (i >= this.max) i = Math.floor(Math.random() * this.max); else this.n++;
      this.p[i * 3] = x; this.p[i * 3 + 1] = y; this.p[i * 3 + 2] = z;
      this.v[i * 3] = vx; this.v[i * 3 + 1] = vy; this.v[i * 3 + 2] = vz;
      this.life[i] = 0; this.maxLife[i] = life; this.size0[i] = size;
      this.col[i * 4] = r; this.col[i * 4 + 1] = g; this.col[i * 4 + 2] = b; this.col[i * 4 + 3] = a;
      this.rot[i] = Math.random() * 6.28; this.rotV[i] = (Math.random() - 0.5) * 1.2;
    }
    update(dt) {
      const P = this.p, V = this.v, damp = Math.exp(-this.drag * dt);
      let i = 0;
      while (i < this.n) {
        this.life[i] += dt;
        if (this.life[i] >= this.maxLife[i]) {
          const j = --this.n;
          if (i !== j) {
            for (let k = 0; k < 3; k++) { P[i * 3 + k] = P[j * 3 + k]; V[i * 3 + k] = V[j * 3 + k]; }
            for (let k = 0; k < 4; k++) this.col[i * 4 + k] = this.col[j * 4 + k];
            this.life[i] = this.life[j]; this.maxLife[i] = this.maxLife[j]; this.size0[i] = this.size0[j]; this.rot[i] = this.rot[j]; this.rotV[i] = this.rotV[j];
          }
          continue;
        }
        V[i * 3 + 1] -= 9.8 * this.gravity * dt;
        V[i * 3] *= damp; V[i * 3 + 1] *= damp; V[i * 3 + 2] *= damp;
        P[i * 3] += V[i * 3] * dt; P[i * 3 + 1] += V[i * 3 + 1] * dt; P[i * 3 + 2] += V[i * 3 + 2] * dt;
        if (this.gravity > 0.5) {
          const gy = WW1.world.H(P[i * 3], P[i * 3 + 2]);
          if (P[i * 3 + 1] < gy) { P[i * 3 + 1] = gy; V[i * 3] *= 0.3; V[i * 3 + 1] = 0; V[i * 3 + 2] *= 0.3; }
        }
        this.rot[i] += this.rotV[i] * dt;
        i++;
      }
      const pa = this.aPos.array, sa = this.aSize.array, ca = this.aColor.array, ra = this.aRot.array;
      for (let k = 0; k < this.n; k++) {
        const t = this.life[k] / this.maxLife[k];
        pa[k * 3] = P[k * 3]; pa[k * 3 + 1] = P[k * 3 + 1]; pa[k * 3 + 2] = P[k * 3 + 2];
        sa[k] = this.size0[k] * (1 + (this.grow - 1) * t);
        const fade = Math.min(1, t * 12) * (t < 0.5 ? 1 : 1 - (t - 0.5) * 2);
        ca[k * 4] = this.col[k * 4]; ca[k * 4 + 1] = this.col[k * 4 + 1]; ca[k * 4 + 2] = this.col[k * 4 + 2]; ca[k * 4 + 3] = this.col[k * 4 + 3] * fade;
        ra[k] = this.rot[k];
      }
      this.geo.setDrawRange(0, this.n);
      this.aPos.needsUpdate = this.aSize.needsUpdate = this.aColor.needsUpdate = this.aRot.needsUpdate = true;
    }
  }

  let fire, chunks, spray, smoke, puff, blood, gas;

  F.init = function (sc, quality) {
    scene = sc;
    systems.length = 0; plumes = [];
    const T = WW1.tex;
    fire = new Particles(300, T.puff, true, -0.02, 2, 1.8);
    chunks = new Particles(900, T.soft, false, 1.6, 0.3, 0.8);
    spray = new Particles(500, T.puff, false, 0.9, 1.2, 2.4);
    smoke = new Particles(700, T.puff, false, -0.015, 0.6, 2.8);
    puff = new Particles(500, T.puff, false, 0.25, 2.0, 2.4);
    blood = new Particles(200, T.soft, false, 0.8, 1.5, 1.8);
    gas = new Particles(500, T.puff, false, 0, 0.1, 1.5);

    // Traçantes: fitas viradas para a câmera
    const N = 48;
    const tg = new THREE.BufferGeometry();
    tg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 4 * 3), 3).setUsage(THREE.DynamicDrawUsage));
    tg.setAttribute('color', new THREE.BufferAttribute(new Float32Array(N * 4 * 4), 4).setUsage(THREE.DynamicDrawUsage));
    const ti = [];
    for (let i = 0; i < N; i++) ti.push(i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 2, i * 4 + 1, i * 4 + 3);
    tg.setIndex(ti);
    const tm = new THREE.Mesh(tg, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
    tm.frustumCulled = false;
    scene.add(tm);
    tracers = { geo: tg, list: Array.from({ length: N }, () => ({ on: false })) };

    // Chuva
    const RN = quality === 'low' ? 500 : 1300;
    const rg = new THREE.BufferGeometry();
    rg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(RN * 6), 3).setUsage(THREE.DynamicDrawUsage));
    const rl = new THREE.LineSegments(rg, new THREE.LineBasicMaterial({ color: 0xbfc4ca, transparent: true, opacity: 0.32, depthWrite: false }));
    rl.frustumCulled = false;
    scene.add(rl);
    const drops = new Float32Array(RN * 3);
    for (let i = 0; i < RN; i++) { drops[i * 3] = WW1.rand(-18, 18); drops[i * 3 + 1] = WW1.rand(-2, 14); drops[i * 3 + 2] = WW1.rand(-18, 18); }
    rain = { geo: rg, drops, n: RN };

    flash = null; // clarões só com partículas (luzes dinâmicas pesam no celular)
  };

  F.setFog = function (density, colorVec) {
    for (const s of systems) { s.mat.uniforms.uFogDensity.value = density; s.mat.uniforms.uFogColor.value.copy(colorVec); }
  };
  F.setScale = function (pixelsPerUnit) { for (const s of systems) s.mat.uniforms.uScale.value = pixelsPerUnit; };

  const rnd = WW1.rand;

  F.explosion = function (x, y, z, scale) {
    const q = WW1.game && WW1.game.quality === 'low' ? 0.5 : 1;
    for (let i = 0; i < 8 * scale; i++) fire.emit(x + rnd(-0.6, 0.6), y + 0.6 + rnd(0, 0.8), z + rnd(-0.6, 0.6), rnd(-3, 3), rnd(1, 5), rnd(-3, 3), rnd(1.5, 3.4) * scale, rnd(0.15, 0.35), 1, rnd(0.55, 0.8), 0.3, 0.9);
    for (let i = 0; i < 45 * scale * q; i++) {
      const a = Math.random() * 6.28, sp = rnd(0.2, 0.55);
      chunks.emit(x, y + 0.2, z, Math.cos(a) * sp * 14, rnd(8, 18), Math.sin(a) * sp * 14, rnd(0.12, 0.45), rnd(1.4, 2.6), rnd(0.12, 0.2), rnd(0.09, 0.15), rnd(0.07, 0.1), 1);
    }
    for (let i = 0; i < 14 * scale * q; i++) {
      const a = Math.random() * 6.28, sp = rnd(0, 0.3);
      spray.emit(x, y + 0.3, z, Math.cos(a) * sp * 8, rnd(5, 12), Math.sin(a) * sp * 8, rnd(1, 2.6) * scale, rnd(1, 1.9), rnd(0.26, 0.36), rnd(0.21, 0.29), rnd(0.16, 0.22), 0.85);
    }
    for (let i = 0; i < 11 * scale * q; i++)
      smoke.emit(x + rnd(-1.5, 1.5), y + 1.2 + rnd(0, 1.5), z + rnd(-1.5, 1.5), rnd(-1, 1), rnd(0.5, 2.5), rnd(-1, 1), rnd(2.5, 6) * scale, rnd(4, 8), rnd(0.3, 0.42), rnd(0.29, 0.4), rnd(0.27, 0.37), 0.6);
    F.flash(x, y + 1.5, z, 6 * scale);
  };

  F.impact = function (x, y, z) {
    for (let i = 0; i < 3; i++) puff.emit(x, y, z, rnd(-1.5, 1.5), rnd(1, 3.5), rnd(-1.5, 1.5), rnd(0.2, 0.45), rnd(0.5, 1.1), 0.36, 0.3, 0.24, 0.85);
    chunks.emit(x, y, z, rnd(-2, 2), rnd(2, 4), rnd(-2, 2), 0.05, 0.6, 0.15, 0.12, 0.09, 1);
  };

  F.blood = function (x, y, z) {
    for (let i = 0; i < 4; i++) blood.emit(x, y, z, rnd(-1.5, 1.5), rnd(-0.5, 1.5), rnd(-1.5, 1.5), rnd(0.1, 0.25), rnd(0.25, 0.5), 0.4, 0.04, 0.03, 0.85);
  };

  F.muzzle = function (x, y, z, dx, dy, dz) {
    fire.emit(x + dx * 0.08, y + dy * 0.08, z + dz * 0.08, dx * 2, dy * 2, dz * 2, rnd(0.22, 0.4), 0.05, 1, 0.8, 0.45, 1);
    puff.emit(x + dx * 0.2, y + dy * 0.2, z + dz * 0.2, dx * 1.5, dy * 1.5 + 0.4, dz * 1.5, 0.35, 1.2, 0.6, 0.6, 0.58, 0.45);
  };

  F.flash = function (x, y, z, intensity) {
    if (!flash) return;
    if (flashI > intensity) return;
    flash.position.set(x, y, z);
    flashI = intensity;
  };

  F.tracer = function (a, b, bright) {
    const t = tracers.list.find(t => !t.on);
    if (!t) return;
    const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z, dist = Math.hypot(dx, dy, dz);
    if (dist < 0.5) return;
    Object.assign(t, { on: true, ax: a.x, ay: a.y, az: a.z, dx: dx / dist, dy: dy / dist, dz: dz / dist, dist, time: 0, len: bright ? 7 : 4, speed: bright ? 420 : 500, w: bright ? 0.05 : 0.025, a: bright ? 0.95 : 0.3 });
  };

  F.plume = function (x, y, z, scale) { plumes.push({ x, y, z, scale, acc: 0 }); };

  F.update = function (dt, cam) {
    const q = WW1.game && WW1.game.quality === 'low';
    for (const p of plumes) {
      p.acc += dt * (q ? 3 : 6);
      while (p.acc >= 1) {
        p.acc -= 1;
        smoke.emit(p.x + rnd(-0.3, 0.3), p.y, p.z + rnd(-0.3, 0.3), rnd(0.6, 1.2), rnd(0.6, 1.4), rnd(0.2, 0.5), rnd(1.5, 3.5) * p.scale * 2, rnd(6, 10), rnd(0.15, 0.3), rnd(0.14, 0.29), rnd(0.13, 0.27), 0.5);
      }
    }
    // Gás de cloro
    const g = WW1.game;
    if (g && g.gasActive && g.player) {
      gasAcc += dt * (q ? 4 : 8);
      const c = g.player.pos;
      while (gasAcc >= 1) {
        gasAcc -= 1;
        const x = c.x + rnd(-22, 22), z = c.z + rnd(-10, 26);
        gas.emit(x, WW1.world.H(x, z) + rnd(0.3, 1.5), z, rnd(-0.2, 0.2), 0.05, -1.1, rnd(4, 9), rnd(6, 10), rnd(0.62, 0.72), rnd(0.66, 0.72), rnd(0.38, 0.45), 0.3);
      }
    }
    for (const s of systems) s.update(dt);

    if (flash) {
      flashI = Math.max(0, flashI - dt * 60);
      flash.intensity = flashI;
    }

    // Traçantes
    const pos = tracers.geo.attributes.position.array, col = tracers.geo.attributes.color.array;
    const cp = cam.position;
    tracers.list.forEach((t, i) => {
      let head = 0, tail = 0;
      if (t.on) {
        t.time += dt;
        head = Math.min(t.dist, t.time * t.speed);
        tail = Math.max(0, t.time * t.speed - t.len);
        if (tail >= t.dist) t.on = false;
      }
      if (!t.on) { for (let k = 0; k < 12; k++) pos[i * 12 + k] = 0; for (let k = 0; k < 16; k++) col[i * 16 + k] = 0; return; }
      const hx = t.ax + t.dx * head, hy = t.ay + t.dy * head, hz = t.az + t.dz * head;
      const tx = t.ax + t.dx * tail, ty = t.ay + t.dy * tail, tz = t.az + t.dz * tail;
      // lado perpendicular à direção de visão
      let vx = cp.x - hx, vy = cp.y - hy, vz = cp.z - hz;
      let sx = t.dy * vz - t.dz * vy, sy = t.dz * vx - t.dx * vz, sz = t.dx * vy - t.dy * vx;
      const sl = Math.hypot(sx, sy, sz) || 1; sx *= t.w / sl; sy *= t.w / sl; sz *= t.w / sl;
      const P = [tx - sx, ty - sy, tz - sz, tx + sx, ty + sy, tz + sz, hx - sx, hy - sy, hz - sz, hx + sx, hy + sy, hz + sz];
      for (let k = 0; k < 12; k++) pos[i * 12 + k] = P[k];
      const C = [1, 0.85, 0.55, 0, 1, 0.85, 0.55, 0, 1, 0.9, 0.7, t.a, 1, 0.9, 0.7, t.a];
      for (let k = 0; k < 16; k++) col[i * 16 + k] = C[k];
    });
    tracers.geo.attributes.position.needsUpdate = true;
    tracers.geo.attributes.color.needsUpdate = true;

    // Chuva caindo em volta da câmera
    const rp = rain.geo.attributes.position.array, d = rain.drops;
    for (let i = 0; i < rain.n; i++) {
      d[i * 3 + 1] -= 15 * dt; d[i * 3] -= 1.2 * dt; d[i * 3 + 2] += 0.6 * dt;
      if (d[i * 3 + 1] < -3) { d[i * 3] = rnd(-18, 18); d[i * 3 + 1] = rnd(10, 14); d[i * 3 + 2] = rnd(-18, 18); }
      const x = cp.x + d[i * 3], y = cp.y + d[i * 3 + 1], z = cp.z + d[i * 3 + 2];
      rp[i * 6] = x; rp[i * 6 + 1] = y; rp[i * 6 + 2] = z;
      rp[i * 6 + 3] = x + 0.04; rp[i * 6 + 4] = y + 0.5; rp[i * 6 + 5] = z - 0.02;
    }
    rain.geo.attributes.position.needsUpdate = true;
  };
})();
