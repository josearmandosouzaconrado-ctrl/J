'use strict';
// Explosões com dano e artilharia (barragem aliada, obuses alemães, trovão distante).
(function () {
  const W = WW1.world;
  const tmp = new THREE.Vector3();

  // spareCentral: a barragem aliada não atinge os alemães protegidos nos abrigos.
  WW1.explode = function (p, radius, maxDamage, scale, spareCentral) {
    WW1.fx.explosion(p.x, p.y, p.z, scale);
    WW1.audio.playAt('explosion', p.x, p.y, p.z, 1, WW1.rand(0.85, 1.1) / Math.sqrt(Math.max(0.4, scale)), 9 * scale, true);
    const g = WW1.game, pl = g.player;
    if (pl) pl.addShake(scale * WW1.clamp01(1 - pl.pos.distanceTo(p) / 70) * 0.9);
    if (maxDamage > 0) {
      for (const h of WW1.actors.slice()) {
        if (h.dead || (spareCentral && h.team === 'central')) continue;
        const a = h.aimPoint(tmp), d = a.distanceTo(p);
        if (d > radius) continue;
        let f = Math.pow(1 - d / radius, 1.2);
        if (!W.los(p.x, p.y + 0.4, p.z, a.x, a.y, a.z)) f *= 0.35;
        h.damage(maxDamage * f, p);
        if (h.dead && h.team === 'central' && !spareCentral) g.kills++;
      }
    }
    if (!spareCentral && g.mg) g.mg.explosionAt(p, radius);
  };

  const A = WW1.artillery = {
    friendly: false, z0: 145, z1: 158, interval: 0.8,
    enemy: false, shellInterval: 7, shellMax: 55,
    nextF: 0, nextE: 0, nextR: 0, pending: [],
    reset() { Object.assign(this, { friendly: false, z0: 145, z1: 158, interval: 0.8, enemy: false, shellInterval: 7, shellMax: 55, nextF: 0, nextE: 0, nextR: 0, pending: [] }); },
    update(dt) {
      const g = WW1.game, t = WW1.time;
      const playing = g.state === 'playing', menu = g.state === 'menu' || g.state === 'briefing';
      if ((this.friendly && playing) || menu) {
        if (t >= this.nextF) {
          this.nextF = t + this.interval * WW1.rand(0.5, 1.5) * (menu ? 2.5 : 1);
          const x = WW1.rand(W.MINX + 8, W.MAXX - 8), z = WW1.rand(menu ? 145 : this.z0, menu ? 158 : this.z1);
          const p = new THREE.Vector3(x, W.H(x, z), z);
          if (!g.player || g.player.pos.distanceTo(p) > 18) WW1.explode(p, 8, playing ? 200 : 0, 1.3, true);
        }
      }
      if (this.enemy && playing && t >= this.nextE) {
        this.nextE = t + this.shellInterval * WW1.rand(0.6, 1.4);
        const c = g.player.pos, ang = Math.random() * Math.PI * 2, dist = WW1.rand(g.shellMinDist(), this.shellMax);
        const x = WW1.clamp(c.x + Math.cos(ang) * dist, W.MINX + 6, W.MAXX - 6), z = WW1.clamp(c.z + Math.sin(ang) * dist, W.MINZ + 6, W.MAXZ - 6);
        const p = new THREE.Vector3(x, W.H(x, z), z);
        WW1.audio.playAt('incoming', x, p.y + 15, z, 0.9, WW1.rand(0.9, 1.1), 25);
        this.pending.push({ at: t + 1.15, p });
      }
      for (let i = this.pending.length - 1; i >= 0; i--) {
        if (t >= this.pending[i].at) {
          const p = this.pending[i].p;
          this.pending.splice(i, 1);
          if (playing) WW1.explode(p, 8, 140, 1.2, false);
        }
      }
      if (t >= this.nextR) {
        this.nextR = t + WW1.rand(2.5, 7);
        if (playing || menu) WW1.audio.play2D('rumble', WW1.rand(0.15, 0.35), WW1.rand(0.7, 1.05));
      }
    },
  };
})();
