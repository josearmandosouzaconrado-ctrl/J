'use strict';
// Interface: telas, HUD e controles (toque no celular, teclado e mouse no PC).
(function () {
  const U = WW1.ui = {};
  const $ = id => document.getElementById(id);
  let msgUntil = 0, hitUntil = 0, hurtT = -10, isTouch = false;
  const btns = {};
  const held = new Set();
  const fingers = {};             // id do toque -> 'joy' | 'look' | nome do botão
  const joy = { active: false, ox: 0, oy: 0, x: 0, y: 0, r: 100, homeX: 0, homeY: 0 };
  const keys = {};
  const last = {};
  const DIFF = ['Recruta', 'Soldado', 'Veterano'];

  function set(id, prop, val) {
    const k = id + prop;
    if (last[k] === val) return;
    last[k] = val;
    const el = $(id);
    if (prop === 'text') el.textContent = val; else if (prop === 'html') el.innerHTML = val; else el.style[prop] = val;
  }

  U.show = function (name) {
    for (const s of ['loading', 'menu', 'briefing', 'pause', 'dead', 'victory1', 'victory2']) $(s).classList.toggle('on', s === name);
    $('hud').classList.toggle('on', name === null || name === 'pause' || name === 'dead');
    $('touch').classList.toggle('on', name === null);
  };

  U.message = function (text, sec) { $('msg').textContent = text; msgUntil = performance.now() / 1000 + sec; };
  U.hitMarker = function (kill, head) {
    hitUntil = performance.now() / 1000 + (kill ? 0.45 : 0.25);
    const c = kill ? (head ? '#ff6a40' : '#ff3a2a') : '#fff';
    document.querySelectorAll('#hitm i').forEach(i => (i.style.background = c));
    if (kill) WW1.audio.play2D('thump', 0.35, 1.6);
  };
  U.playerHit = () => { hurtT = WW1.time; };

  function refreshMenu() {
    $('bDiff').textContent = 'Dificuldade: ' + DIFF[WW1.settings.diff];
    $('bQual').textContent = 'Gráficos: ' + (WW1.settings.quality === 'low' ? 'Desempenho' : 'Realista');
    $('sensVal').textContent = 'Sensibilidade ' + WW1.settings.sens.toFixed(1);
  }

  function makeMaskImage() {
    const c = document.createElement('canvas'); c.width = 512; c.height = 256;
    const x = c.getContext('2d');
    x.fillStyle = 'rgba(8,8,5,0.97)'; x.fillRect(0, 0, 512, 256);
    x.globalCompositeOperation = 'destination-out';
    for (const cx of [150, 362]) {
      x.save(); x.translate(cx, 118); x.scale(1, 1.25);
      const g = x.createRadialGradient(0, 0, 70, 0, 0, 92);
      g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = g; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill(); x.restore();
    }
    const m = $('mask');
    m.style.background = `url(${c.toDataURL()}) center / 112% 125% no-repeat, rgba(40,48,30,0.12)`;
  }

  U.layout = function () {
    const W = innerWidth, H = innerHeight, u = Math.min(H / 100, W / 100 * 0.56) * 1;
    const place = (b, cx, cy, r) => {
      const el = btns[b]; if (!el) return;
      el.style.left = (cx - r) + 'px'; el.style.top = (cy - r) + 'px'; el.style.width = el.style.height = (2 * r) + 'px';
      el._c = { x: cx, y: cy, r };
    };
    place('fire', W - 23 * u, H - 28 * u, 11.5 * u);
    place('aim', W - 46 * u, H - 16 * u, 8 * u);
    place('grenade', W - 44 * u, H - 39 * u, 6.7 * u);
    place('melee', W - 21 * u, H - 52 * u, 6.7 * u);
    place('reload', W - 65 * u, H - 11 * u, 6.3 * u);
    place('crouch', W - 9 * u, H - 9.5 * u, 5.8 * u);
    place('mask', W - 63 * u, H - 31 * u, 7.2 * u);
    place('pause', W - 6.5 * u, 6.5 * u, 4.5 * u);
    joy.r = 14 * u; joy.homeX = 25 * u; joy.homeY = H - 26 * u;
  };

  function hitButton(x, y) {
    for (const b in btns) {
      const c = btns[b]._c;
      if (!c || btns[b].style.display === 'none') continue;
      if (Math.hypot(x - c.x, y - c.y) <= c.r * 1.12) return b;
    }
    return null;
  }

  function press(b) {
    const p = WW1.game.player;
    if (!p) return;
    switch (b) {
      case 'fire': p.fire(); break;
      case 'aim': p.ads = !p.ads; break;
      case 'reload': p.reload(); break;
      case 'grenade': p.throwGrenade(); break;
      case 'melee': p.melee(); break;
      case 'crouch': p.crouch = !p.crouch; break;
      case 'mask': toggleMask(); break;
      case 'pause': WW1.game.pause(); break;
    }
  }
  function toggleMask() {
    const p = WW1.game.player, g = WW1.game;
    if (!g.gasActive && !p.maskOn) return;
    p.maskOn = !p.maskOn;
    if (p.maskOn) p.ads = false;
    WW1.audio.play2D('swish', 0.6, 0.7);
  }

  function lookScale() { return 0.25 * WW1.settings.sens * (420 / Math.max(1, innerHeight)); }

  U.init = function () {
    isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    document.body.classList.toggle('touch', isTouch);
    document.body.classList.toggle('desk', !isTouch);
    document.querySelectorAll('.tb').forEach(el => (btns[el.dataset.b] = el));
    makeMaskImage();
    U.layout();
    addEventListener('resize', U.layout);
    $('briefText').innerHTML = WW1.mission.BRIEFING.split('\n\n').map(s => `<p class="txt">${s.replace(/\n/g, '<br>')}</p>`).join('');
    $('epilogue').innerHTML = WW1.mission.EPILOGUE.split('\n\n').map(s => `<p class="txt">${s}</p>`).join('');

    const tap = (id, fn) => $(id).addEventListener('click', e => { WW1.audio.start(); WW1.audio.play2D('click', 0.6, 0.9); fn(e); });
    tap('bStart', () => WW1.game.briefing());
    tap('bDiff', () => { WW1.settings.diff = (WW1.settings.diff + 1) % 3; WW1.saveSettings(); refreshMenu(); });
    tap('bQual', () => { WW1.settings.quality = WW1.settings.quality === 'low' ? 'high' : 'low'; WW1.saveSettings(); refreshMenu(); WW1.game.applyQuality(); });
    tap('bSensM', () => { WW1.settings.sens = Math.max(0.3, WW1.settings.sens - 0.1); WW1.saveSettings(); refreshMenu(); });
    tap('bSensP', () => { WW1.settings.sens = Math.min(3, WW1.settings.sens + 0.1); WW1.saveSettings(); refreshMenu(); });
    tap('bGo', () => WW1.game.begin());
    tap('bResume', () => WW1.game.resume());
    tap('bRestart', () => WW1.game.restart(true));
    tap('bMenu', () => WW1.game.restart(false));
    tap('bRetry', () => WW1.game.restart(true));
    tap('bMenu2', () => WW1.game.restart(false));
    tap('bNext', () => U.show('victory2'));
    tap('bAgain', () => WW1.game.restart(true));
    tap('bMenu3', () => WW1.game.restart(false));
    refreshMenu();
    document.addEventListener('pointerdown', () => WW1.audio.start(), { once: false });

    // ----- toque -----
    const playing = () => WW1.game.state === 'playing' && WW1.game.player && WW1.game.player.controls;
    document.addEventListener('touchstart', e => {
      if (!playing()) return;
      e.preventDefault();
      for (const t of e.changedTouches) {
        const b = hitButton(t.clientX, t.clientY);
        if (b) { fingers[t.identifier] = b; held.add(b); press(b); }
        else if (t.clientX < innerWidth * 0.42 && !Object.values(fingers).includes('joy')) {
          fingers[t.identifier] = 'joy'; joy.active = true; joy.ox = joy.x = t.clientX; joy.oy = joy.y = t.clientY;
        } else if (!Object.values(fingers).includes('look')) fingers[t.identifier] = 'look';
        fingers['p' + t.identifier] = [t.clientX, t.clientY];
      }
    }, { passive: false });
    document.addEventListener('touchmove', e => {
      if (!playing()) return;
      e.preventDefault();
      const p = WW1.game.player;
      for (const t of e.changedTouches) {
        const f = fingers[t.identifier], prev = fingers['p' + t.identifier];
        if (!f) continue;
        if (f === 'joy') { joy.x = t.clientX; joy.y = t.clientY; }
        else if ((f === 'look' || f === 'fire') && prev) {
          const s = lookScale();
          p.lookDX += (t.clientX - prev[0]) * s;
          p.lookDY -= (t.clientY - prev[1]) * s;
        }
        fingers['p' + t.identifier] = [t.clientX, t.clientY];
      }
    }, { passive: false });
    const end = e => {
      for (const t of e.changedTouches) {
        const f = fingers[t.identifier];
        if (f === 'joy') joy.active = false;
        else if (f) held.delete(f);
        delete fingers[t.identifier]; delete fingers['p' + t.identifier];
      }
    };
    document.addEventListener('touchend', end);
    document.addEventListener('touchcancel', end);

    // ----- teclado e mouse -----
    addEventListener('keydown', e => {
      keys[e.code] = true;
      const g = WW1.game, p = g.player;
      if (e.code === 'Escape' || e.code === 'KeyP') { if (g.state === 'playing') g.pause(); else if (g.state === 'paused') g.resume(); }
      if (g.state !== 'playing' || !p) return;
      if (e.code === 'KeyC' || e.code === 'ControlLeft') p.crouch = !p.crouch;
      if (e.code === 'KeyR') p.reload();
      if (e.code === 'KeyG') p.throwGrenade();
      if (e.code === 'KeyF' || e.code === 'KeyV') p.melee();
      if (e.code === 'KeyM') toggleMask();
    });
    addEventListener('keyup', e => { keys[e.code] = false; });
    const canvas = WW1.game.renderer.domElement;
    document.addEventListener('mousedown', e => {
      if (isTouch || WW1.game.state !== 'playing') return;
      if (document.pointerLockElement !== canvas) { if (e.target === canvas || e.target.closest('#hud')) canvas.requestPointerLock && canvas.requestPointerLock(); return; }
      if (e.button === 0) WW1.game.player.fire();
      if (e.button === 2) WW1.game.player.ads = true;
    });
    document.addEventListener('mouseup', e => { if (e.button === 2 && WW1.game.player) WW1.game.player.ads = false; });
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('mousemove', e => {
      if (document.pointerLockElement !== canvas || WW1.game.state !== 'playing') return;
      const p = WW1.game.player, s = 0.12 * WW1.settings.sens;
      p.lookDX += e.movementX * s; p.lookDY -= e.movementY * s;
    });
    // botão "voltar" do Android (chamado pelo APK)
    window.androidBack = () => { const g = WW1.game; if (g.state === 'playing') g.pause(); else if (g.state === 'paused') g.resume(); };
    document.addEventListener('visibilitychange', () => { if (document.hidden && WW1.game.state === 'playing') WW1.game.pause(); });
  };

  // Entrada contínua (joystick e teclas) — chamado a cada quadro
  U.input = function () {
    const p = WW1.game.player;
    if (!p) return;
    let mx = 0, my = 0, sprint = false;
    if (joy.active) {
      let dx = (joy.x - joy.ox) / joy.r, dy = (joy.y - joy.oy) / joy.r;
      const l = Math.hypot(dx, dy);
      if (l > 1) { joy.ox = joy.x - dx / l * joy.r; joy.oy = joy.y - dy / l * joy.r; dx /= l; dy /= l; }
      mx = dx; my = -dy;
      sprint = my > 0.92;
    }
    if (keys.KeyW || keys.ArrowUp) my = 1;
    if (keys.KeyS || keys.ArrowDown) my = -1;
    if (keys.KeyD || keys.ArrowRight) mx = 1;
    if (keys.KeyA || keys.ArrowLeft) mx = -1;
    if (keys.ShiftLeft || keys.ShiftRight) sprint = true;
    p.moveX = mx; p.moveY = my; p.sprint = sprint;
    if (sprint && p.crouch && my > 0.5) p.crouch = false;
  };

  // HUD — chamado a cada quadro
  U.update = function () {
    const g = WW1.game, p = g.player, m = WW1.mission, now = performance.now() / 1000;
    if (!p) return;
    const W = innerWidth, H = innerHeight, u = Math.min(H / 100, W / 100 * 0.56);

    set('objText', 'text', m.objective || '');
    set('timer', 'text', m.timer || '');
    set('objective', 'display', m.objective ? 'block' : 'none');
    set('mag', 'text', String(p.mag));
    set('mag', 'color', p.mag === 0 ? '#ff6650' : '#fff');
    set('res', 'text', '/ ' + p.reserve);
    set('gren', 'text', 'Granadas: ' + p.grenades);
    const hp = p.hp / p.max;
    set('hpFill', 'width', (hp * 100).toFixed(1) + '%');
    set('hpFill', 'background', hp < 0.35 ? '#c0281a' : hp < 0.6 ? '#c99a5a' : '#bfb88c');

    const hurt = WW1.clamp01(1 - (WW1.time - hurtT) / 0.8);
    const low = hp < 0.45 ? (0.45 - hp) / 0.45 * (0.75 + 0.25 * Math.sin(now * 6)) : 0;
    set('red', 'opacity', Math.max(hurt * 0.7, low * 0.85).toFixed(2));
    if (hurt > 0.01) {
      const d = p.lastHitFrom, ang = Math.atan2(d.x - p.pos.x, d.z - p.pos.z);
      const rel = WW1.angleDelta(p.yaw, ang);
      set('dmgDir', 'transform', `rotate(${(-rel * 180 / Math.PI).toFixed(0)}deg)`);
    }
    set('dmgDir', 'opacity', (hurt * 0.9).toFixed(2));
    set('gas', 'opacity', (p.gasExposure * 0.45).toFixed(2));
    set('mask', 'display', p.maskOn ? 'block' : 'none');

    // mira
    const showCross = p.adsT < 0.5 && !p.dead;
    set('cross', 'display', showCross ? 'block' : 'none');
    if (showCross) {
      const sp = Math.round((1.4 + Math.hypot(p.moveX, p.moveY) * 2.2) * u), l = Math.round(1.6 * u), t = Math.max(2, Math.round(0.3 * u));
      const key = sp + ',' + l;
      if (last.cross !== key) {
        last.cross = key;
        const is = document.querySelectorAll('#cross i');
        const st = (i, x, y, w, h) => Object.assign(is[i].style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
        st(0, -sp - l, -t / 2, l, t); st(1, sp, -t / 2, l, t); st(2, -t / 2, sp, t, l); st(3, -t / 2, -2, t, 4);
      }
    }
    const hm = now < hitUntil;
    set('hitm', 'opacity', hm ? '1' : '0');
    if (!last.hitInit) {
      last.hitInit = 1;
      const is = document.querySelectorAll('#hitm i'), s = 7 * u, a = 1.2 * u, b = 2.2 * u, t = Math.max(2, 0.4 * u);
      Object.assign(is[0].style, { left: (s / 2 - a - b) + 'px', top: (s / 2 - t / 2) + 'px', width: b + 'px', height: t + 'px' });
      Object.assign(is[1].style, { left: (s / 2 + a) + 'px', top: (s / 2 - t / 2) + 'px', width: b + 'px', height: t + 'px' });
      Object.assign(is[2].style, { left: (s / 2 - t / 2) + 'px', top: (s / 2 - a - b) + 'px', width: t + 'px', height: b + 'px' });
      Object.assign(is[3].style, { left: (s / 2 - t / 2) + 'px', top: (s / 2 + a) + 'px', width: t + 'px', height: b + 'px' });
    }
    set('reload', 'display', p.reloading ? 'block' : 'none');
    if (p.reloading) $('reload').firstElementChild.style.width = (WW1.clamp01((WW1.time - p.reloadStart) / (p.reloadEnd - p.reloadStart)) * 100) + '%';

    // marcador do objetivo
    if (m.marker && !p.dead) {
      const v = new THREE.Vector3(m.marker.x, m.marker.y + 1.5, m.marker.z).project(g.camera);
      let x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H;
      const behind = v.z > 1;
      if (behind) { x = W - x; y = H - 22 * u; }
      const mx = 8 * u, my = 22 * u;
      const clamped = behind || x < mx || x > W - mx || y < my || y > H - my;
      x = WW1.clamp(x, mx, W - mx); y = WW1.clamp(y, my, H - my);
      set('marker', 'display', 'block');
      set('marker', 'transform', `translate(${x.toFixed(0)}px,${y.toFixed(0)}px)`);
      const dist = Math.round(Math.hypot(m.marker.x - p.pos.x, m.marker.z - p.pos.z));
      const el = $('marker').lastElementChild, txt = (clamped ? '> ' : '') + dist + ' m';
      if (el.textContent !== txt) el.textContent = txt;
    } else set('marker', 'display', 'none');

    const msgA = WW1.clamp01((msgUntil - now) * 2);
    set('msg', 'opacity', msgA.toFixed(2));
    let warn = '';
    if (p.inWire) warn = '<span style="color:#ffa070">ARAME FARPADO — você está lento!</span>';
    if (g.gasActive && !p.maskOn) warn = `<span style="color:#d8ff66;opacity:${(0.6 + 0.4 * Math.sin(now * 8)).toFixed(2)}">GÁS! COLOQUE A MÁSCARA!</span>`;
    set('warn', 'html', warn);
    set('hint', 'text', !isTouch && g.playTime < 25 && !document.pointerLockElement ? 'Clique na tela para controlar a mira com o mouse' : '');

    // controles de toque
    if (isTouch) {
      const jx = joy.active ? joy.ox : joy.homeX, jy = joy.active ? joy.oy : joy.homeY;
      let kx = joy.active ? joy.x : jx, ky = joy.active ? joy.y : jy;
      const dl = Math.hypot(kx - jx, ky - jy);
      if (dl > joy.r) { kx = jx + (kx - jx) / dl * joy.r; ky = jy + (ky - jy) / dl * joy.r; }
      set('joy', 'transform', `translate(${jx.toFixed(0)}px,${jy.toFixed(0)}px)`);
      set('knob', 'transform', `translate(${kx.toFixed(0)}px,${ky.toFixed(0)}px)`);
      const maskVis = g.gasActive || p.maskOn;
      btns.mask.style.display = maskVis ? 'flex' : 'none';
      btns.mask.textContent = p.maskOn ? 'TIRAR' : 'MÁSCARA';
      btns.crouch.textContent = p.crouch ? 'LEVANTAR' : 'AGACHAR';
      for (const b in btns) {
        const el = btns[b];
        el.classList.toggle('held', held.has(b));
        el.classList.toggle('on', (b === 'aim' && p.ads) || (b === 'crouch' && p.crouch));
        el.classList.toggle('pulse', b === 'mask' && !p.maskOn && g.gasActive);
      }
    }
  };

  U.resetTouches = function () {
    for (const k in fingers) delete fingers[k];
    held.clear();
    joy.active = false;
  };

  U.deathStats = function (g) {
    $('deadStats').textContent = `Inimigos abatidos: ${g.kills}    Tempo: ${WW1.fmtTime(g.playTime)}`;
  };
  U.winStats = function (g) {
    const acc = g.shots ? Math.round(100 * g.hits / g.shots) : 0;
    $('winStats').innerHTML = `Inimigos abatidos: ${g.kills}<br>Tiros disparados: ${g.shots}<br>Precisão: ${acc}%<br>Tempo de missão: ${WW1.fmtTime(g.playTime)}<br>Dificuldade: ${DIFF[WW1.settings.diff]}`;
  };
  U.fade = function (a) { set('fade', 'opacity', a.toFixed(3)); };
})();
