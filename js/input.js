'use strict';
// ===================== ENTRADA: toque e teclado =====================
const Input = {
  move: { x: 0, y: 0, mag: 0 },
  keys: {}, queue: new Set(), held: {}, sprint: false,
  stick: { id: null, bx: 0, by: 0, x: 0, y: 0, active: false },
  usingTouch: false,
  KEYMAP: {
    KeyJ: 'attack', Space: 'attack', Enter: 'attack', KeyK: 'spell', KeyQ: 'spellnext', KeyL: 'roll', KeyE: 'interact', KeyF: 'potion', KeyG: 'mana',
    KeyR: 'shout', KeyT: 'racial', KeyH: 'mount', Tab: 'menu', KeyI: 'menu', Escape: 'menu', KeyM: 'map', KeyC: 'shoutnext'
  },
  init() {
    window.addEventListener('keydown', e => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      this.keys[e.code] = true;
      const act = this.KEYMAP[e.code];
      if (act) { if (!e.repeat) this.press(act); e.preventDefault(); }
      if (e.code.startsWith('Digit')) { const n = parseInt(e.code.slice(5)); if (n >= 1 && n <= 9) this.press('spell' + n); }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.sprint = true;
      if (e.code.startsWith('Arrow')) e.preventDefault();
    });
    window.addEventListener('keyup', e => {
      this.keys[e.code] = false;
      const act = this.KEYMAP[e.code];
      if (act) this.release(act);
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.sprint = false;
    });
    window.addEventListener('blur', () => { this.keys = {}; this.held = {}; this.sprint = false; this.endStick(); });
    const zone = document.getElementById('stick-zone');
    const base = document.getElementById('stick-base'), knob = document.getElementById('stick-knob');
    this.base = base; this.knob = knob;
    zone.addEventListener('touchstart', e => {
      e.preventDefault(); this.usingTouch = true; Sfx.unlock();
      for (const t of e.changedTouches) if (this.stick.id === null) this.beginStick(t.identifier, t.clientX, t.clientY);
    }, { passive: false });
    window.addEventListener('touchmove', e => {
      for (const t of e.changedTouches) if (t.identifier === this.stick.id) { this.moveStick(t.clientX, t.clientY); e.preventDefault(); }
    }, { passive: false });
    const end = e => { for (const t of e.changedTouches) if (t.identifier === this.stick.id) this.endStick(); };
    window.addEventListener('touchend', end); window.addEventListener('touchcancel', end);
    // mouse no joystick (teste no PC)
    zone.addEventListener('mousedown', e => { this.beginStick('m', e.clientX, e.clientY); });
    window.addEventListener('mousemove', e => { if (this.stick.id === 'm') this.moveStick(e.clientX, e.clientY); });
    window.addEventListener('mouseup', () => { if (this.stick.id === 'm') this.endStick(); });
    document.querySelectorAll('[data-act]').forEach(b => this.bindButton(b));
    document.getElementById('cv').addEventListener('touchstart', e => e.preventDefault(), { passive: false });
  },
  bindButton(b) {
    const act = b.dataset.act;
    b.addEventListener('touchstart', e => { e.preventDefault(); e.stopPropagation(); this.usingTouch = true; Sfx.unlock(); this.press(act); b.classList.add('down'); }, { passive: false });
    b.addEventListener('touchend', e => { e.preventDefault(); this.release(act); b.classList.remove('down'); }, { passive: false });
    b.addEventListener('touchcancel', () => { this.release(act); b.classList.remove('down'); });
    b.addEventListener('mousedown', e => { e.preventDefault(); Sfx.unlock(); this.press(act); b.classList.add('down'); });
    b.addEventListener('mouseup', () => { this.release(act); b.classList.remove('down'); });
    b.addEventListener('mouseleave', () => { if (this.held[act]) { this.release(act); b.classList.remove('down'); } });
  },
  beginStick(id, x, y) {
    const s = this.stick;
    s.id = id; s.bx = x; s.by = y; s.x = x; s.y = y; s.active = true;
    this.base.style.left = (x - 55) + 'px'; this.base.style.top = (y - 55) + 'px';
    this.base.classList.add('on');
    this.knob.style.transform = 'translate(0px,0px)';
  },
  moveStick(x, y) {
    const s = this.stick; s.x = x; s.y = y;
    let dx = x - s.bx, dy = y - s.by;
    const R = 50, d = Math.hypot(dx, dy);
    if (d > R * 1.6) { s.bx = x - dx / d * R * 1.6; s.by = y - dy / d * R * 1.6; this.base.style.left = (s.bx - 55) + 'px'; this.base.style.top = (s.by - 55) + 'px'; dx = x - s.bx; dy = y - s.by; }
    const k = Math.min(1, Math.hypot(dx, dy) / R);
    const a = Math.atan2(dy, dx);
    this.knob.style.transform = `translate(${Math.cos(a) * k * R}px,${Math.sin(a) * k * R}px)`;
  },
  endStick() {
    this.stick.id = null; this.stick.active = false;
    if (this.base) this.base.classList.remove('on');
    if (this.knob) this.knob.style.transform = 'translate(0px,0px)';
  },
  press(act) { this.queue.add(act); this.held[act] = true; },
  release(act) { this.held[act] = false; },
  consume(act) { if (this.queue.has(act)) { this.queue.delete(act); return true; } return false; },
  clear() { this.queue.clear(); this.held = {}; this.endStick(); },
  update() {
    const s = this.stick;
    if (s.active) {
      const dx = s.x - s.bx, dy = s.y - s.by, d = Math.hypot(dx, dy);
      const R = 50;
      const mag = Math.min(1, d / R);
      if (d < 4) { this.move.x = 0; this.move.y = 0; this.move.mag = 0; }
      else { this.move.x = dx / d * mag; this.move.y = dy / d * mag; this.move.mag = mag; }
      return;
    }
    let x = 0, y = 0; const k = this.keys;
    if (k.KeyA || k.ArrowLeft) x -= 1; if (k.KeyD || k.ArrowRight) x += 1;
    if (k.KeyW || k.ArrowUp) y -= 1; if (k.KeyS || k.ArrowDown) y += 1;
    const d = Math.hypot(x, y);
    if (d) { this.move.x = x / d; this.move.y = y / d; this.move.mag = 0.9; } else { this.move.x = 0; this.move.y = 0; this.move.mag = 0; }
  }
};
