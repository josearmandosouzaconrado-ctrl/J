'use strict';
// Soldado em primeira pessoa: movimento, escalada, câmera, vida, máscara de gás, fuzil Lee-Enfield e granadas.
(function () {
  const W = WW1.world;
  const V = THREE.Vector3;
  const DEG = Math.PI / 180;
  const MAG = 10, MAX_RESERVE = 60, MAX_GREN = 4;
  WW1.MAX_RESERVE = MAX_RESERVE; WW1.MAX_GREN = MAX_GREN;

  class Player {
    constructor(camera, vmScene, x, z) {
      this.team = 'allies'; this.isPlayer = true;
      this.camera = camera;
      this.pos = new V(x, W.FLOOR, z);
      this.hp = this.max = 100; this.dead = false;
      this.yaw = 0; this.pitch = 0.07;
      this.vy = 0; this.camH = 1.6;
      this.moveX = 0; this.moveY = 0; this.lookDX = 0; this.lookDY = 0;
      this.crouch = false; this.ads = false; this.sprint = false; this.controls = false; this.maskOn = false;
      this.lastHit = -10; this.lastHitFrom = new V(); this.gasExposure = 0;
      this.shake = 0; this.recoil = 0; this.recoilV = 0; this.bobT = 0; this.stepDist = 0; this.coughT = 0; this.speedNow = 0;
      this.mantle = null; this.inWire = false; this.inTrench = false;
      // arma
      this.mag = MAG; this.reserve = 50; this.grenades = 3;
      this.busyUntil = 0; this.reloading = false; this.reloadStart = 0; this.reloadEnd = 0;
      this.boltStart = -10; this.meleeT = -1; this.throwT = -1; this.adsT = 0; this.kick = 0; this.swayT = 0;
      this.grenadeList = [];
      this.pendingActions = [];
      this.buildViewModel(vmScene);
      WW1.actors.push(this);
    }

    aimPoint(out) { return out.set(this.pos.x, this.pos.y + (this.crouch ? 0.9 : 1.35), this.pos.z); }
    exposure() {
      let f = 1;
      if (this.crouch) f *= 0.55;
      if (this.speedNow > 4.5) f *= 0.7; else if (this.speedNow > 1) f *= 0.85;
      if (this.inTrench) f *= 0.6;
      return f;
    }
    forward() { return new V(Math.sin(this.yaw), 0, Math.cos(this.yaw)); }
    right() { return new V(-Math.cos(this.yaw), 0, Math.sin(this.yaw)); }
    addShake(a) { this.shake = Math.min(1.2, this.shake + a); }

    damage(amt, from) {
      if (this.dead || amt <= 0) return;
      if (this.armor) amt *= this.armor;
      this.hp = Math.max(0, this.hp - amt);
      this.lastHit = WW1.time;
      if (amt >= 1) {
        this.lastHitFrom.copy(from);
        this.addShake(0.25);
        WW1.audio.play2D('hurt', 0.8, WW1.rand(0.9, 1.1));
        WW1.ui.playerHit();
      }
      if (this.hp <= 0) {
        this.dead = true; this.controls = false; this.deathT = 0;
        WW1.audio.play2D('hurt', 1, 0.7);
        WW1.game.playerDied();
      }
    }
    heal(a) { if (!this.dead) this.hp = Math.min(this.max, this.hp + a); }
    revive() {
      this.hp = this.max; this.dead = false; this.controls = true; this.camH = 1.6; this.deathT = 0;
      this.mantle = null; this.vy = 0; this.maskOn = false; this.ads = false; this.crouch = false;
      this.reloading = false; this.busyUntil = 0; this.pendingActions = [];
      this.vm.visible = true;
    }

    nearMiss(from, end) {
      const c = this.camera.position, d = new V().subVectors(end, from);
      const t = WW1.clamp01(new V().subVectors(c, from).dot(d) / d.lengthSq());
      const p = from.clone().addScaledVector(d, t);
      if (p.distanceTo(c) < 3) { WW1.audio.playAt('whiz', p.x, p.y, p.z, 0.8, WW1.rand(0.85, 1.2), 1.5); this.addShake(0.05); }
    }

    // ---------- Movimento sobre o relevo ----------
    blocked(x, z, dirx, dirz) {
      if (x < W.MINX + 7 || x > W.MAXX - 7 || z < W.MINZ + 7 || z > W.MAXZ - 9) return true;
      const h = Math.max(W.S(x, z), W.S(x + dirx * 0.3, z + dirz * 0.3));
      if (WW1.ow && WW1.game.mode === 'open' && WW1.ow.H(x, z) < WW1.ow.WATER - 0.9) return true; // rio fundo
      return h - this.pos.y > 0.78;
    }

    update(dt) {
      const g = WW1.game;
      if (this.dead) {
        this.deathT = Math.min(1, this.deathT + dt * 1.2);
        this.camH = WW1.lerp(this.camH, 0.25, dt * 3);
        this.updateCamera(dt, 70 * DEG * this.deathT);
        this.vm.visible = false;
        return;
      }
      if (WW1.og && g.mode === 'open' && WW1.og.controlPlayer(this, dt)) { this.speedNow = 0; return; }
      this.vm.visible = !this.maskOn;
      const playing = this.controls && g.state === 'playing';
      if (!playing) { this.moveX = this.moveY = 0; }
      if (playing && !this.mantle) {
        const zoom = this.ads ? 0.55 : 1;
        this.yaw -= this.lookDX * zoom * DEG;
        this.pitch = WW1.clamp(this.pitch + this.lookDY * zoom * DEG, -80 * DEG, 80 * DEG);
      }
      this.lookDX = this.lookDY = 0;
      this.recoilV -= this.recoil * 120 * dt;
      this.recoilV *= Math.exp(-14 * dt);
      this.recoil += this.recoilV * dt;

      this.inWire = W.inWire(this.pos.x, this.pos.z);
      this.inTrench = W.inTrench(this.pos) !== null;
      const ox = this.pos.x, oz = this.pos.z;

      if (this.mantle) {
        const m = this.mantle;
        m.t += dt;
        if (m.t < 0.45) { const k = WW1.smooth(0, 1, m.t / 0.45); this.pos.y = WW1.lerp(m.y0, m.top.y, k); }
        else if (m.t < 0.67) { const k = (m.t - 0.45) / 0.22; this.pos.y = m.top.y; this.pos.x = WW1.lerp(m.x0, m.top.x, k); this.pos.z = WW1.lerp(m.z0, m.top.z, k); }
        else { this.pos.set(m.top.x, Math.max(m.top.y, W.S(m.top.x, m.top.z)), m.top.z); this.mantle = null; this.vy = 0; }
      } else {
        const f = this.forward(), r = this.right();
        let wx = r.x * this.moveX + f.x * this.moveY, wz = r.z * this.moveX + f.z * this.moveY;
        const wl = Math.hypot(wx, wz);
        if (wl > 1) { wx /= wl; wz /= wl; }
        const running = this.sprint && this.moveY > 0.5 && !this.crouch && !this.ads;
        let speed = this.crouch ? 1.7 : running ? 5.4 : 3.3;
        if (this.ads) speed *= 0.6;
        if (this.inWire) speed *= 0.4;
        const dx = wx * speed * dt, dz = wz * speed * dt;
        const dl = Math.hypot(dx, dz) || 1, ndx = dx / dl, ndz = dz / dl;
        let hitWall = false;
        if (dx || dz) {
          if (!this.blocked(this.pos.x + dx, this.pos.z + dz, ndx, ndz)) { this.pos.x += dx; this.pos.z += dz; }
          else {
            hitWall = true;
            if (!this.blocked(this.pos.x + dx, this.pos.z, Math.sign(dx), 0)) this.pos.x += dx;
            else if (!this.blocked(this.pos.x, this.pos.z + dz, 0, Math.sign(dz))) this.pos.z += dz;
          }
        }
        // empurra para fora dos outros soldados
        for (const s of WW1.soldiers) {
          if (s.dead) continue;
          const sx = this.pos.x - s.pos.x, sz = this.pos.z - s.pos.z, d = Math.hypot(sx, sz);
          if (d < 0.6 && d > 0.001 && Math.abs(s.pos.y - this.pos.y) < 1.5) { this.pos.x += sx / d * (0.6 - d); this.pos.z += sz / d * (0.6 - d); }
        }
        const ground = W.S(this.pos.x, this.pos.z);
        if (this.pos.y > ground + 0.02) {
          if (this.vy === 0 && this.pos.y - ground < 0.45) this.pos.y = ground;
          else { this.vy -= 18 * dt; this.pos.y += this.vy * dt; if (this.pos.y <= ground) { this.pos.y = ground; this.vy = 0; } }
        } else { this.pos.y = ground; this.vy = 0; }

        if (playing && hitWall && wl > 0.45) this.tryMantle(ndx, ndz);
      }
      this.speedNow = Math.hypot(this.pos.x - ox, this.pos.z - oz) / dt;

      // agachar, balanço e passos
      this.camH = WW1.moveTowards(this.camH, this.crouch ? 1.0 : 1.6, dt * 4);
      if (this.speedNow > 0.5 && this.vy === 0) {
        this.bobT += dt * (this.speedNow > 4.5 ? 11 : 7.5);
        this.stepDist += this.speedNow * dt;
        if (this.stepDist > (this.speedNow > 4.5 ? 1.6 : 1.1)) { this.stepDist = 0; WW1.audio.play2D('step', 0.35, WW1.rand(0.85, 1.15)); }
      }
      this.updateCamera(dt, 0);

      if (WW1.time - this.lastHit > 4.5) this.heal(9 * dt);

      // gás
      const gas = g.gasActive;
      this.gasExposure = WW1.moveTowards(this.gasExposure, gas && !this.maskOn ? 1 : 0, dt * (gas ? 0.6 : 0.3));
      if (gas && !this.maskOn && g.state === 'playing') {
        this.damage(6 * dt, this.pos);
        this.coughT -= dt;
        if (this.coughT <= 0) { this.coughT = WW1.rand(1.2, 2.2); WW1.audio.play2D('cough', 0.9, WW1.rand(0.9, 1.1)); }
      }
      WW1.audio.setLoop('breath', this.maskOn && g.state === 'playing' ? 0.55 : 0);

      // caixas de munição
      for (const c of W.ammoCrates) {
        if (Math.hypot(c.x - this.pos.x, c.y - this.pos.y, c.z - this.pos.z) < 2.2 && (this.reserve < MAX_RESERVE || this.grenades < MAX_GREN)) {
          this.reserve = MAX_RESERVE; this.grenades = MAX_GREN;
          WW1.audio.play2D('reload', 0.5, 1.3);
          WW1.ui.message('Munição e granadas reabastecidas', 2);
        }
      }

      this.updateWeapon(dt);
      this.updateGrenades(dt);
    }

    tryMantle(dx, dz) {
      const ax = this.pos.x + dx * 0.8, az = this.pos.z + dz * 0.8;
      const top = W.S(ax, az), rise = top - this.pos.y;
      if (rise < 0.45 || rise > 2.4) return;
      // o topo precisa ser plano o suficiente para ficar de pé
      if (Math.abs(W.S(ax + dx * 0.3, az + dz * 0.3) - top) > 0.6) return;
      this.mantle = { t: 0, y0: this.pos.y, x0: this.pos.x, z0: this.pos.z, top: new V(ax, top, az) };
      WW1.audio.play2D('step', 0.6, 0.7);
    }

    updateCamera(dt, roll) {
      const shk = (this.shake = WW1.moveTowards(this.shake, 0, dt * 1.5));
      const t = WW1.time;
      const sx = (WW1.noise2(t * 25, 0, 4)) * shk * 0.35, sy = (WW1.noise2(0, t * 25, 5)) * shk * 0.35;
      const bobAmt = WW1.clamp01(this.speedNow / 5) * (this.ads ? 0.2 : 1);
      const bx = Math.cos(this.bobT * 0.5) * 0.03 * bobAmt, by = Math.abs(Math.sin(this.bobT * 0.5)) * 0.05 * bobAmt;
      const r = this.right();
      const c = this.camera;
      c.position.set(this.pos.x + r.x * (bx + sx * 0.3), this.pos.y + this.camH + by + sy * 0.3, this.pos.z + r.z * (bx + sx * 0.3));
      c.rotation.set(this.pitch + this.recoil * DEG + sy * 0.1, this.yaw + Math.PI + sx * 0.1, roll + sx * 0.07, 'YXZ');
      const fov = this.dead ? 62 : this.ads ? 36 : 62;
      c.fov = WW1.lerp(c.fov, fov, Math.min(1, dt * 10));
      c.updateProjectionMatrix();
    }

    // ---------- Fuzil (modelo em primeira pessoa) ----------
    buildViewModel(vmScene) {
      const wood = [0.55, 0.4, 0.27], steel = [0.3, 0.31, 0.32], skin = [0.78, 0.6, 0.49], sleeve = [0.46, 0.41, 0.27];
      const b = new WW1.GeoBuilder(true);
      b.box(0, -0.045, -0.27, 0.042, 0.11, 0.3, [6, 0, 0], wood);
      b.box(0, -0.015, -0.08, 0.038, 0.06, 0.14, [10, 0, 0], wood);
      b.box(0, 0.014, 0.05, 0.036, 0.045, 0.2, null, steel);
      b.box(0, -0.035, 0.07, 0.03, 0.05, 0.08, null, steel);
      b.box(0, 0, 0.37, 0.044, 0.045, 0.5, null, wood);
      b.box(0, 0.028, 0.36, 0.032, 0.014, 0.42, null, wood);
      b.cyl({ x: 0, y: 0.012, z: 0.6 }, { x: 0, y: 0.012, z: 0.72 }, 0.0085, steel, true);
      b.box(0, 0.041, 0.64, 0.004, 0.022, 0.006, null, steel);
      b.box(0.011, 0.038, 0.64, 0.003, 0.028, 0.02, null, steel);
      b.box(-0.011, 0.038, 0.64, 0.003, 0.028, 0.02, null, steel);
      b.box(-0.009, 0.046, 0.13, 0.012, 0.012, 0.01, null, steel);
      b.box(0.009, 0.046, 0.13, 0.012, 0.012, 0.01, null, steel);
      b.box(0, -0.018, 0.9, 0.005, 0.022, 0.42, null, [0.55, 0.56, 0.58]);
      b.box(0, -0.04, -0.01, 0.012, 0.03, 0.06, null, steel);
      b.box(-0.018, -0.045, -0.09, 0.05, 0.08, 0.09, [10, 0, 0], skin);
      b.box(-0.07, -0.1, -0.26, 0.09, 0.09, 0.32, [18, 18, 0], sleeve);
      b.box(0.012, -0.04, 0.33, 0.06, 0.07, 0.1, null, skin);
      b.box(0.1, -0.12, 0.16, 0.09, 0.09, 0.36, [14, -32, 0], sleeve);
      const mat = new THREE.MeshStandardMaterial({ vertexColors: true, map: WW1.tex.cloth, roughness: 0.6, metalness: 0.15 });
      this.vm = new THREE.Group();
      this.vmRifle = new THREE.Mesh(b.build(), mat);
      this.vm.add(this.vmRifle);
      const bb = new WW1.GeoBuilder(true);
      bb.cyl({ x: 0, y: 0, z: 0 }, { x: -0.06, y: 0, z: 0 }, 0.006, steel);
      bb.add(WW1.prim.sph(), WW1.trs(-0.06, 0, 0, null, 0.022), steel);
      this.vmBolt = new THREE.Mesh(bb.build(), mat);
      this.vmBolt.position.set(-0.02, 0.02, -0.01);
      this.vmRifle.add(this.vmBolt);
      this.vmMuzzle = new THREE.Object3D();
      this.vmMuzzle.position.set(0, 0.012, 0.71);
      this.vmRifle.add(this.vmMuzzle);
      vmScene.add(this.vm);
      this.hipPos = new V(-0.14, -0.2, 0.34);
      this.adsPos = new V(0, -0.052, 0.13);
    }

    canAct() { return this.controls && !this.mantle && !this.dead && !this.reloading && WW1.time >= this.busyUntil; }
    later(delay, fn) { this.pendingActions.push({ at: WW1.time + delay, fn }); }

    muzzleWorld() {
      // posição aproximada da boca do fuzil no mundo (o modelo é desenhado numa cena separada)
      const f = new V(0, 0, -1).applyQuaternion(this.camera.quaternion);
      const r = new V(1, 0, 0).applyQuaternion(this.camera.quaternion);
      return this.camera.position.clone().addScaledVector(f, 0.75).addScaledVector(r, 0.15 * (1 - this.adsT)).add(new V(0, -0.12 * (1 - this.adsT), 0));
    }

    fire() {
      if (!this.canAct()) return;
      if (this.mag <= 0) { WW1.audio.play2D('click', 0.7, 1); this.reload(); return; }
      this.mag--;
      const g = WW1.game;
      g.shots++;
      const c = this.camera;
      const fwd = new V(0, 0, -1).applyQuaternion(c.quaternion);
      const up = new V(0, 1, 0).applyQuaternion(c.quaternion), rt = new V(1, 0, 0).applyQuaternion(c.quaternion);
      const moveSpread = WW1.clamp01(Math.hypot(this.moveX, this.moveY)) * 1.6 * (1 - this.adsT * 0.7);
      const spread = (WW1.lerp(2.2, 0.12, this.adsT) + moveSpread) * DEG;
      let dir = fwd.clone().addScaledVector(rt, WW1.rand(-spread, spread)).addScaledVector(up, WW1.rand(-spread, spread)).normalize();
      dir = this.aimAssist(c.position, dir);

      const o = c.position;
      const ground = W.rayHit(o, dir, 450);
      const maxD = ground ? ground.dist : 450;
      const hit = WW1.raySoldiers(o, dir, maxD, s => s.team === 'central');
      if (hit) {
        const s = hit.soldier;
        const dmg = hit.part === 'head' ? 250 : hit.part === 'torso' ? 120 : 75;
        s.damage(dmg, o);
        g.hits++;
        if (s.dead) g.kills++;
        WW1.ui.hitMarker(s.dead, hit.part === 'head');
      } else if (ground) WW1.fx.impact(ground.x, ground.y, ground.z);

      const m = this.muzzleWorld();
      WW1.fx.muzzle(m.x, m.y, m.z, dir.x, dir.y, dir.z);
      WW1.fx.flash(m.x, m.y, m.z, 1.2);
      WW1.audio.play2D('rifle', 1, WW1.rand(0.96, 1.04));
      this.recoilV += (this.adsT > 0.5 ? 1.5 : 2.3) * 18;
      this.addShake(0.06);
      this.kick = 1;
      this.busyUntil = WW1.time + 1.0;
      this.boltStart = WW1.time + 0.2;
      this.later(0.25, () => WW1.audio.play2D('bolt', 0.8, 1));
    }

    aimAssist(o, dir) {
      let bestAng = WW1.lerp(4.5, 2.2, this.adsT) * DEG, best = null;
      const p = new V();
      for (const s of WW1.soldiers) {
        if (s.team !== 'central' || s.dead) continue;
        s.rig.root.updateMatrixWorld(true);
        for (let k = 0; k < 2; k++) {
          if (k === 0) s.rig.upper.localToWorld(p.set(0, 0.3, 0)); else s.rig.head(p);
          const to = p.clone().sub(o), d = to.length();
          if (d > 160) continue;
          const ang = to.angleTo(dir);
          if (ang >= bestAng) continue;
          if (W.los(o.x, o.y, o.z, p.x, p.y, p.z)) { bestAng = ang; best = to.divideScalar(d); break; }
        }
      }
      return best ? dir.clone().lerp(best, 0.85).normalize() : dir;
    }

    reload() {
      if (this.reloading || WW1.time < this.busyUntil || this.mag >= MAG || this.reserve <= 0 || !this.controls) return;
      this.reloading = true;
      this.reloadStart = WW1.time; this.reloadEnd = WW1.time + 2.5;
      WW1.audio.play2D('reload', 0.85, 1);
    }

    throwGrenade() {
      if (!this.canAct() || this.grenades <= 0) return;
      this.grenades--;
      this.throwT = 0;
      this.busyUntil = WW1.time + 0.95;
      WW1.audio.play2D('click', 0.8, 1.4);
      this.later(0.35, () => {
        const c = this.camera, f = new V(0, 0, -1).applyQuaternion(c.quaternion);
        const pos = c.position.clone().addScaledVector(f, 0.5);
        const vel = f.multiplyScalar(16).add(new V(0, 3.5, 0));
        const mesh = new THREE.Mesh(WW1.prim.lowSph(), new THREE.MeshStandardMaterial({ map: WW1.tex.metal, color: 0x5a6045, roughness: 0.6, metalness: 0.3 }));
        mesh.scale.set(0.062, 0.09, 0.062);
        mesh.castShadow = true;
        mesh.position.copy(pos);
        WW1.game.scene.add(mesh);
        this.grenadeList.push({ pos, vel, fuse: 3.4, mesh });
        WW1.audio.play2D('swish', 0.6, 0.8);
      });
    }

    melee() {
      if (!this.canAct()) return;
      this.meleeT = 0;
      this.busyUntil = WW1.time + 0.75;
      WW1.audio.play2D('swish', 0.9, 1.1);
      this.later(0.15, () => {
        const f = this.forward();
        for (const s of WW1.soldiers) {
          if (s.team !== 'central' || s.dead) continue;
          const dx = s.pos.x - this.pos.x, dz = s.pos.z - this.pos.z, d = Math.hypot(dx, dz);
          if (d > 2.6 || Math.abs(s.pos.y - this.pos.y) > 1.6) continue;
          if ((dx * f.x + dz * f.z) / (d || 1) < Math.cos(60 * DEG)) continue;
          s.damage(150, this.pos);
          WW1.game.hits++;
          if (s.dead) WW1.game.kills++;
          WW1.ui.hitMarker(s.dead, false);
          WW1.audio.play2D('thump', 0.9, 1.2);
          this.addShake(0.12);
          break;
        }
      });
    }

    updateGrenades(dt) {
      for (let i = this.grenadeList.length - 1; i >= 0; i--) {
        const gr = this.grenadeList[i];
        gr.vel.y -= 9.8 * dt;
        const nx = gr.pos.x + gr.vel.x * dt, nz = gr.pos.z + gr.vel.z * dt;
        if (W.S(nx, nz) > gr.pos.y + 0.3) { gr.vel.x *= -0.35; gr.vel.z *= -0.35; } // bate na parede/saco de areia
        else { gr.pos.x = nx; gr.pos.z = nz; }
        gr.pos.y += gr.vel.y * dt;
        const ground = W.S(gr.pos.x, gr.pos.z) + 0.05;
        if (gr.pos.y < ground) { gr.pos.y = ground; gr.vel.y = Math.abs(gr.vel.y) > 2 ? -gr.vel.y * 0.25 : 0; gr.vel.x *= 0.55; gr.vel.z *= 0.55; }
        gr.mesh.position.copy(gr.pos);
        gr.mesh.rotation.x += dt * 8;
        gr.fuse -= dt;
        if (gr.fuse <= 0) {
          WW1.game.scene.remove(gr.mesh);
          this.grenadeList.splice(i, 1);
          WW1.explode(gr.pos.clone().add(new V(0, 0.1, 0)), 7.5, 170, 0.8, false);
        }
      }
    }

    updateWeapon(dt) {
      const t = WW1.time;
      for (let i = this.pendingActions.length - 1; i >= 0; i--) {
        if (t >= this.pendingActions[i].at) { const a = this.pendingActions[i]; this.pendingActions.splice(i, 1); if (!this.dead) a.fn(); }
      }
      if (this.reloading && t >= this.reloadEnd) {
        const n = Math.min(MAG - this.mag, this.reserve);
        this.mag += n; this.reserve -= n; this.reloading = false;
      }
      if (this.mag === 0 && this.reserve > 0 && !this.reloading && t >= this.busyUntil && this.controls) this.reload();

      const wantAds = this.ads && !this.reloading && this.throwT < 0 && this.meleeT < 0 && !this.mantle;
      this.adsT = WW1.moveTowards(this.adsT, wantAds ? 1 : 0, dt * 6);
      const k = WW1.smooth(0, 1, this.adsT);
      const pos = this.hipPos.clone().lerp(this.adsPos, k);
      let rx = WW1.lerp(1, 0, this.adsT), ry = WW1.lerp(3, 0, this.adsT), rz = WW1.lerp(-3, 0, this.adsT);
      const moving = WW1.clamp01(Math.hypot(this.moveX, this.moveY));
      this.swayT += dt * (this.sprint ? 11 : 7) * moving;
      const sw = 1 - this.adsT * 0.85;
      pos.x += Math.cos(this.swayT * 0.5) * 0.012 * moving * sw;
      pos.y += (Math.abs(Math.sin(this.swayT * 0.5)) * 0.012 * moving + Math.sin(t * 1.3) * 0.002) * sw;
      if (this.sprint && moving > 0.5 && this.adsT < 0.1) { pos.add(new V(0.05, -0.06, -0.03)); rx += 10; ry += 25; rz -= 15; }

      const bt = (t - this.boltStart) / 0.65;
      let boltUp = 0, boltBack = 0;
      if (bt >= 0 && bt <= 1) {
        boltUp = Math.sin(WW1.clamp01(bt) * Math.PI);
        boltBack = Math.sin(WW1.clamp01((bt - 0.15) / 0.7) * Math.PI);
        rx -= 3 * boltUp; rz += 12 * boltUp * (1 - this.adsT * 0.5); pos.y -= 0.015 * boltUp;
      }
      if (this.reloading) {
        const r = WW1.clamp01((t - this.reloadStart) / (this.reloadEnd - this.reloadStart)), w = Math.sin(r * Math.PI);
        pos.add(new V(0.03, -0.09, -0.03).multiplyScalar(w));
        rx -= 18 * w; ry -= 10 * w; rz += 32 * w;
        boltUp = boltBack = WW1.clamp01(w * 3);
      }
      if (this.throwT >= 0) {
        this.throwT += dt / 0.9;
        const w = Math.sin(WW1.clamp01(this.throwT) * Math.PI);
        pos.add(new V(-0.05, -0.35, 0).multiplyScalar(w)); rx += 25 * w;
        if (this.throwT >= 1) this.throwT = -1;
      }
      if (this.meleeT >= 0) {
        this.meleeT += dt / 0.6;
        const m = this.meleeT < 0.25 ? this.meleeT / 0.25 : WW1.clamp01(1 - (this.meleeT - 0.25) / 0.75);
        pos.add(new V(0.08, 0.04, 0.32).multiplyScalar(m)); rx -= 4 * m; ry -= 6 * m;
        if (this.meleeT >= 1) this.meleeT = -1;
      }
      this.kick = WW1.moveTowards(this.kick, 0, dt * 5);
      pos.y += 0.01 * this.kick; pos.z -= 0.06 * this.kick; rx -= 7 * this.kick;

      this.vmBolt.rotation.z = -70 * DEG * boltUp;
      this.vmBolt.position.z = -0.01 - 0.075 * boltBack;
      // o modelo usa +z para frente; a câmera olha para -z
      this.vm.position.set(-pos.x, pos.y, -pos.z);
      this.vm.rotation.set(-rx * DEG, Math.PI + ry * DEG, rz * DEG, 'YXZ');
      this.vm.visible = !this.dead && !this.maskOn;
    }
  }
  WW1.Player = Player;
})();
