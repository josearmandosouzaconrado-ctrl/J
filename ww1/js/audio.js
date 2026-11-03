'use strict';
// Sons sintetizados com Web Audio: tiros com eco, metralhadora, explosões, apito, chuva, gás...
(function () {
  const A = WW1.audio = {};
  let ctx = null, master, clips = {}, loops = {}, listener = { x: 0, y: 0, z: 0, rx: 1, rz: 0 };
  const SR = 22050;
  let seed = 1918;
  const N = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x3fffffff - 1; };

  function make(len, fn) {
    const n = Math.floor(len * SR), d = new Float32Array(n);
    fn(d, n);
    let peak = 1e-4;
    for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(d[i]));
    const g = 0.95 / peak;
    for (let i = 0; i < n; i++) d[i] *= g;
    const b = ctx.createBuffer(1, n, SR);
    b.copyToChannel ? b.copyToChannel(d, 0) : b.getChannelData(0).set(d);
    return b;
  }
  const crossfade = (d, n, f) => { for (let i = 0; i < f; i++) { const k = i / f; d[i] = d[i] * k + d[n - f + i] * (1 - k); } };

  function gun(len, body) {
    return make(len, (d, n) => {
      let lp = 0, lp2 = 0, lp3 = 0;
      for (let i = 0; i < n; i++) {
        const t = i / SR, x = N();
        lp += (x - lp) * 0.09; lp2 += (x - lp2) * 0.025; lp3 += (lp2 - lp3) * 0.05;
        d[i] = x * Math.exp(-t * 110) * 0.9 + lp * Math.exp(-t * 9) * 2.4 * body + lp3 * Math.exp(-t * (3.2 / body)) * 9 * body + Math.sin(2 * Math.PI * 85 * t) * Math.exp(-t * 28) * 0.9;
      }
    });
  }
  function boom(len, transient, bright) {
    return make(len, (d, n) => {
      let a = 0, b = 0, c = 0;
      for (let i = 0; i < n; i++) {
        const t = i / SR, x = N();
        a += (x - a) * 0.08 * bright; b += (a - b) * 0.06 * bright; c += (b - c) * 0.04;
        const env = Math.min(1, t / 0.008) * Math.exp(-t * 1.5);
        const sub = Math.sin(2 * Math.PI * (48 - 14 * t) * t) * Math.exp(-t * 2.6);
        const crackle = t < 1.4 && Math.random() < 0.0015 ? N() * 0.6 : 0;
        d[i] = c * 14 * env + x * Math.exp(-t * 35) * transient * 10 + sub * 0.8 + crackle * Math.exp(-t * 2);
      }
    });
  }
  function clicks(len, at) {
    return make(len, (d, n) => {
      for (let i = 0; i < n; i++) {
        const t = i / SR; let s = 0;
        at.forEach((a, k) => {
          const dt = t - a;
          if (dt < 0 || dt > 0.08) return;
          s += N() * Math.exp(-dt * 380) + Math.sin(2 * Math.PI * (2600 + 700 * (k % 3)) * dt) * Math.exp(-dt * 110) * 0.45;
        });
        d[i] = s;
      }
    });
  }

  function build() {
    clips.rifle = gun(1.1, 1);
    clips.mg = gun(0.32, 0.75);
    clips.explosion = boom(3.2, 0.05, 1);
    clips.rumble = boom(3.5, 0.02, 0.6);
    clips.incoming = make(1.2, (d, n) => { let ph = 0; for (let i = 0; i < n; i++) { const k = i / n; ph += 2 * Math.PI * (1450 - 850 * k) / SR; d[i] = (Math.sin(ph) * 0.6 + N() * 0.12) * (0.08 + 0.92 * k * k); } });
    clips.whistle = make(1.7, (d, n) => { let ph = 0; for (let i = 0; i < n; i++) { const t = i / SR, tr = Math.sin(2 * Math.PI * 27 * t); ph += 2 * Math.PI * (2650 + 140 * tr) / SR; d[i] = (Math.sin(ph) * (0.7 + 0.3 * tr) + N() * 0.05) * Math.min(1, t / 0.03) * WW1.clamp01((1.7 - t) / 0.15); } });
    clips.bolt = clicks(0.5, [0, 0.12, 0.3, 0.42]);
    clips.reload = clicks(2.4, [0.1, 0.3, 0.7, 0.85, 1.0, 1.15, 1.3, 1.6, 1.9, 2.1]);
    clips.click = clicks(0.12, [0]);
    clips.rain = make(4, (d, n) => { let lp = 0, lp2 = 0; for (let i = 0; i < n; i++) { const x = N(); lp += (x - lp) * 0.35; lp2 += (x - lp2) * 0.03; d[i] = (x - lp2) * 0.25 + lp * 0.35 + (Math.random() < 0.004 ? N() * 2 : 0); } crossfade(d, n, SR / 2); });
    clips.wind = make(6, (d, n) => { let a = 0, b = 0; for (let i = 0; i < n; i++) { const t = i / SR; a += (N() - a) * 0.02; b += (a - b) * 0.02; d[i] = b * (0.55 + 0.45 * Math.sin(2 * Math.PI * t / 6) * Math.sin(2 * Math.PI * 2 * t / 6 + 1)); } crossfade(d, n, SR / 2); });
    const thud = (len, f, noise) => make(len, (d, n) => { let lp = 0; for (let i = 0; i < n; i++) { const t = i / SR; lp += (N() - lp) * 0.1; d[i] = Math.sin(2 * Math.PI * f * t * (1 - t)) * Math.exp(-t * 18) + lp * noise * Math.exp(-t * 25) * 3; } });
    clips.hurt = thud(0.35, 70, 0.8);
    clips.thump = thud(0.25, 110, 0.5);
    clips.cough = make(0.9, (d, n) => { let a = 0, b = 0; for (let i = 0; i < n; i++) { const t = i / SR, x = N(); a += (x - a) * 0.25; b += (a - b) * 0.25; let env = 0; for (const s of [0, 0.28, 0.55]) { const dt = t - s; if (dt >= 0 && dt < 0.25) env += Math.min(1, dt / 0.01) * Math.exp(-dt * 14); } d[i] = (a - b) * env * 3 + Math.sin(2 * Math.PI * 160 * t) * env * 0.2; } });
    clips.breath = make(3.2, (d, n) => { let a = 0, b = 0; for (let i = 0; i < n; i++) { const t = i / SR, x = N(); a += (x - a) * 0.3; b += (a - b) * 0.08; const inh = t < 1.3 ? Math.sin(t / 1.3 * Math.PI) : 0, exh = t > 1.6 && t < 2.9 ? Math.sin((t - 1.6) / 1.3 * Math.PI) : 0; d[i] = (a - b) * (inh * 0.8 + exh * 0.5) + b * exh * 0.6 + (t > 1.6 && t < 1.62 ? N() * 0.4 : 0); } });
    clips.step = make(0.22, (d, n) => { let a = 0, b = 0; for (let i = 0; i < n; i++) { const t = i / SR, x = N(); a += (x - a) * 0.12; b += (a - b) * 0.2; d[i] = b * Math.min(1, t / 0.015) * Math.exp(-t * 18) * 3 + Math.sin(2 * Math.PI * (180 + 300 * t) * t) * Math.exp(-t * 30) * 0.3; } });
    clips.swish = make(0.35, (d, n) => { let a = 0, b = 0; for (let i = 0; i < n; i++) { const k = i / n, x = N(), c = 0.05 + 0.4 * Math.sin(k * Math.PI); a += (x - a) * c; b += (a - b) * c; d[i] = (a - b) * Math.sin(k * Math.PI); } });
    clips.heart = make(0.95, (d, n) => { for (let i = 0; i < n; i++) { const t = i / SR, t2 = t - 0.25; d[i] = Math.sin(2 * Math.PI * 55 * t) * Math.exp(-t * 22) + (t2 > 0 ? Math.sin(2 * Math.PI * 50 * t2) * Math.exp(-t2 * 26) * 0.7 : 0); } });
    clips.bell = make(2.4, (d, n) => { const fr = [520, 1243, 1690, 2210, 2830]; for (let i = 0; i < n; i++) { const t = i / SR; let s = 0; for (const st of [0, 0.4, 0.8, 1.2, 1.6]) { const dt = t - st; if (dt < 0) continue; fr.forEach((f, k) => { s += Math.sin(2 * Math.PI * f * dt) * Math.exp(-dt * (2.5 + k * 1.5)) / (k + 1); }); } d[i] = s; } });
    clips.whiz = make(0.28, (d, n) => { let ph = 0; for (let i = 0; i < n; i++) { const k = i / n; ph += 2 * Math.PI * (3200 - 2000 * k) / SR; const e = Math.sin(k * Math.PI); d[i] = (Math.sin(ph) * 0.5 + N() * 0.4) * e * e; } });
  }

  function loop(name, vol) {
    const src = ctx.createBufferSource();
    src.buffer = clips[name]; src.loop = true;
    const g = ctx.createGain(); g.gain.value = vol;
    src.connect(g).connect(master);
    src.start();
    loops[name] = g;
  }

  // Precisa ser chamado num toque do usuário (regra dos navegadores)
  A.start = function () {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);
    build();
    loop('rain', 0.3); loop('wind', 0.3); loop('breath', 0); loop('heart', 0);
  };
  A.ready = () => !!ctx;

  A.setListener = function (x, y, z, yaw) {
    listener.x = x; listener.y = y; listener.z = z;
    listener.rx = -Math.cos(yaw); listener.rz = Math.sin(yaw);
  };

  function play(name, vol, rate, pan, delay) {
    if (!ctx || !clips[name] || vol < 0.003) return;
    const src = ctx.createBufferSource();
    src.buffer = clips[name];
    src.playbackRate.value = rate || 1;
    const g = ctx.createGain(); g.gain.value = vol;
    let node = src.connect(g);
    if (pan && ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = WW1.clamp(pan, -1, 1); node = node.connect(p); }
    node.connect(master);
    src.start(ctx.currentTime + (delay || 0));
  }

  A.play2D = (name, vol, rate) => play(name, vol, rate, 0, 0);

  // Som posicionado: volume pela distância, lado esquerdo/direito e atraso do som (explosões distantes)
  A.playAt = function (name, x, y, z, vol, rate, minDist, delaySound) {
    const dx = x - listener.x, dy = y - listener.y, dz = z - listener.z, d = Math.hypot(dx, dy, dz);
    const md = minDist || 3;
    const g = vol * Math.min(1, md / Math.max(d, 0.01)) ** 0.9;
    const pan = d > 0.5 ? (dx * listener.rx + dz * listener.rz) / d * 0.8 : 0;
    play(name, g, rate, pan, delaySound ? d / 340 : 0);
  };

  A.setLoop = function (name, vol, rate) {
    const g = loops[name];
    if (!g) return;
    g.gain.value += (vol - g.gain.value) * 0.08;
  };
  A.pause = on => { if (ctx) on ? ctx.suspend() : ctx.resume(); };
})();
