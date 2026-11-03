'use strict';
// Controle de videogame (DualShock 4 / PS4 por Bluetooth, Xbox e genéricos).
// No APK os eventos vêm do Android (window.AndroidPad); no navegador, da Gamepad API.
(function () {
  const BTN = ['cross', 'circle', 'square', 'triangle', 'l1', 'r1', 'l2b', 'r2b', 'share', 'options', 'l3', 'r3', 'up', 'down', 'left', 'right', 'ps', 'touch'];
  const P = WW1.pad = { connected: false, active: false, lx: 0, ly: 0, rx: 0, ry: 0, l2: 0, r2: 0, lastUse: -10 };
  const cur = {}, prev = {};
  BTN.forEach(b => { cur[b] = prev[b] = false; });

  const dz = (v, d) => (Math.abs(v) < d ? 0 : (v - Math.sign(v) * d) / (1 - d));

  function readAndroid() {
    if (!window.AndroidPad || !AndroidPad.state) return false;
    const s = String(AndroidPad.state()).split(',').map(Number);
    if (s.length < 10 || !s[9]) return false;
    P.lx = s[0]; P.ly = s[1]; P.rx = s[2]; P.ry = s[3]; P.l2 = s[4]; P.r2 = s[5];
    const mask = s[8];
    BTN.forEach((b, i) => { cur[b] = !!(mask & (1 << i)); });
    if (s[6] < -0.5) cur.left = true; if (s[6] > 0.5) cur.right = true;   // cruz direcional como eixo (hat)
    if (s[7] < -0.5) cur.up = true; if (s[7] > 0.5) cur.down = true;
    return true;
  }

  function readWeb() {
    const list = navigator.getGamepads ? navigator.getGamepads() : [];
    let g = null;
    for (const c of list) if (c && c.connected) { g = c; break; }
    if (!g) return false;
    const ax = g.axes, bt = g.buttons;
    P.lx = ax[0] || 0; P.ly = ax[1] || 0; P.rx = ax[2] || 0; P.ry = ax[3] || 0;
    const val = i => (bt[i] ? (typeof bt[i] === 'object' ? bt[i].value : bt[i]) : 0);
    const on = i => (bt[i] ? (typeof bt[i] === 'object' ? bt[i].pressed : bt[i] > 0.5) : false);
    P.l2 = val(6); P.r2 = val(7);
    BTN.forEach((b, i) => { cur[b] = on(i); });
    return true;
  }

  P.update = function () {
    BTN.forEach(b => { prev[b] = cur[b]; cur[b] = false; });
    P.connected = readAndroid() || readWeb();
    if (!P.connected) { P.lx = P.ly = P.rx = P.ry = P.l2 = P.r2 = 0; return; }
    P.lx = dz(P.lx, 0.18); P.ly = dz(P.ly, 0.18); P.rx = dz(P.rx, 0.14); P.ry = dz(P.ry, 0.14);
    cur.l2b = cur.l2b || P.l2 > 0.45; cur.r2b = cur.r2b || P.r2 > 0.45;
    const used = Math.abs(P.lx) + Math.abs(P.ly) + Math.abs(P.rx) + Math.abs(P.ry) > 0.1 || BTN.some(b => cur[b]);
    if (used) P.lastUse = performance.now() / 1000;
    const act = performance.now() / 1000 - P.lastUse < 20;
    if (act !== P.active) { P.active = act; document.body.classList.toggle('pad', act); }
  };
  P.held = b => cur[b];
  P.pressed = b => cur[b] && !prev[b];

  // ----- navegação nos menus com o controle -----
  let focusIdx = 0, navT = 0;
  P.menuNav = function (dt) {
    const screen = document.querySelector('.screen.on');
    const btns = screen ? Array.from(screen.querySelectorAll('button')).filter(b => b.offsetParent !== null) : [];
    document.querySelectorAll('button.focus').forEach(b => { if (!btns.includes(b) || !P.active) b.classList.remove('focus'); });
    if (!btns.length || !P.connected) return false;
    navT -= dt;
    let dir = 0;
    if (P.pressed('up') || P.pressed('left')) dir = -1;
    if (P.pressed('down') || P.pressed('right')) dir = 1;
    const sy = P.ly + P.lx;
    if (!dir && Math.abs(sy) > 0.6 && navT <= 0) { dir = Math.sign(sy); navT = 0.25; }
    if (Math.abs(sy) < 0.3) navT = 0;
    if (dir) { focusIdx = (focusIdx + dir + btns.length) % btns.length; P.lastUse = performance.now() / 1000; }
    focusIdx = Math.min(focusIdx, btns.length - 1);
    btns.forEach((b, i) => b.classList.toggle('focus', i === focusIdx && P.active));
    if (P.pressed('cross')) { btns[focusIdx].click(); focusIdx = 0; return true; }
    return false;
  };
})();
