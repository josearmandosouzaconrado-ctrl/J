'use strict';
/* =========================================================
   CONTROLE (Gamepad API): Xbox, PlayStation 4/5 e outros,
   com fio ou Bluetooth. Mapeamento padrão do navegador:
   0 A/✕  1 B/○  2 X/□  3 Y/△  4 LB/L1  5 RB/R1  6 LT/L2  7 RT/R2
   8 View/Share  9 Menu/Options  12–15 direcional
   Analógico esquerdo: cursor · direito: girar/zoom.
   ========================================================= */
const PAD = { on: false, idx: -1, prev: [], cx: 0, cy: 0, nav: false, kind: 'xbox', rep: 0, lastDir: -1 };
function padGlyphs() { return PAD.kind === 'ps' ? { A: '✕', B: '○', X: '□', Y: '△', LB: 'L1', RB: 'R1', LT: 'L2', RT: 'R2', ST: 'Options', BK: 'Share' } : { A: 'A', B: 'B', X: 'X', Y: 'Y', LB: 'LB', RB: 'RB', LT: 'LT', RT: 'RT', ST: 'Menu', BK: 'View' }; }
window.addEventListener('gamepadconnected', (e) => {
  PAD.on = true; PAD.idx = e.gamepad.index;
  const id = e.gamepad.id.toLowerCase();
  PAD.kind = /054c|playstation|dualsense|dualshock|wireless controller/.test(id) ? 'ps' : 'xbox';
  PAD.cx = window.innerWidth / 2; PAD.cy = window.innerHeight / 2;
  const g = padGlyphs();
  const name = PAD.kind === 'ps' ? 'PlayStation' : /xbox|xinput|045e/.test(id) ? 'Xbox' : 'genérico';
  if (typeof toast === 'function') toast('Controle ' + name + ' conectado. ' + g.A + ' seleciona/ordena · ' + g.X + ' atacar/mover · ' + g.B + ' cancela · direcional navega nos menus.', 'good');
});
window.addEventListener('gamepaddisconnected', (e) => { if (e.gamepad.index === PAD.idx) { PAD.on = false; PAD.idx = -1; const c = document.getElementById('padcur'); if (c) c.hidden = true; } });
function padRumble(strong, ms) {
  if (!PAD.on) return;
  const gp = navigator.getGamepads && navigator.getGamepads()[PAD.idx];
  try { if (gp && gp.vibrationActuator) gp.vibrationActuator.playEffect('dual-rumble', { duration: ms || 160, strongMagnitude: Math.min(1, strong), weakMagnitude: Math.min(1, strong * 0.7) }); } catch (e) { /* sem vibração */ }
}
const dz = (v) => Math.abs(v) < 0.16 ? 0 : (v - Math.sign(v) * 0.16) / 0.84;
// botões visíveis para navegação por direcional
function padTargets() {
  const sel = 'button:not([disabled]), [role="radio"], .ct, .bm';
  const modal = !document.getElementById('wEvent').hidden ? document.getElementById('wEvent') : !document.getElementById('end').hidden ? document.getElementById('end') : !document.getElementById('intro').hidden ? document.getElementById('intro') : null;
  const root = modal || document;
  // nos menus vale botão fora da tela (a tela rola até ele); no jogo, só o que está à vista
  return [...root.querySelectorAll(sel)].filter(el => { if (el.closest('[hidden]') || (el.offsetParent === null && getComputedStyle(el).position !== 'fixed')) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (modal || (r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth)); });
}
function padModal() { return !document.getElementById('wEvent').hidden || !document.getElementById('end').hidden || !document.getElementById('intro').hidden; }
function padMoveFocus(dir) {
  const list = padTargets(); if (!list.length) return;
  let cur = document.activeElement && list.includes(document.activeElement) ? document.activeElement : null;
  if (!cur) { cur = list[0]; setPadFocus(cur); return; }
  const r0 = cur.getBoundingClientRect(), cx = r0.left + r0.width / 2, cy = r0.top + r0.height / 2;
  let best = null, bs = Infinity;
  for (const el of list) {
    if (el === cur) continue;
    const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, dx = x - cx, dy = y - cy;
    const along = [dy < 0 ? -dy : -1, dy > 0 ? dy : -1, dx < 0 ? -dx : -1, dx > 0 ? dx : -1][dir];
    if (along <= 2) continue;
    const across = dir < 2 ? Math.abs(dx) : Math.abs(dy), s = along + across * 2.2;
    if (s < bs) { bs = s; best = el; }
  }
  if (best) setPadFocus(best);
}
function setPadFocus(el) {
  for (const o of document.querySelectorAll('.padfocus')) o.classList.remove('padfocus');
  el.classList.add('padfocus'); try { el.focus({ preventScroll: false }); } catch (e) { el.focus(); }
  el.scrollIntoView && el.scrollIntoView({ block: 'nearest' });
  PAD.nav = true;
  const r = el.getBoundingClientRect(); PAD.cx = r.left + r.width / 2; PAD.cy = r.top + r.height / 2;
}
function padClickAtCursor(right) {
  const el = document.elementFromPoint(PAD.cx, PAD.cy);
  const hit = el && el.closest && el.closest('button, .ct, .bm, [role="radio"]');
  if (hit && !right) { hit.click(); return; }
  if (MODE === 'world') worldTap(PAD.cx, PAD.cy, right);
  else handleTap(PAD.cx, PAD.cy, right);
}
function pollPad(dt) {
  if (!PAD.on || !navigator.getGamepads) return;
  const gp = navigator.getGamepads()[PAD.idx]; if (!gp) return;
  const b = (i) => !!(gp.buttons[i] && gp.buttons[i].pressed), v = (i) => gp.buttons[i] ? gp.buttons[i].value : 0;
  const down = (i) => b(i) && !PAD.prev[i];
  const lx = dz(gp.axes[0] || 0), ly = dz(gp.axes[1] || 0), rx = dz(gp.axes[2] || 0), ry = dz(gp.axes[3] || 0);
  const cur = document.getElementById('padcur');
  // cursor
  if (lx || ly) {
    const sp = 950 * dt;
    PAD.cx = clamp(PAD.cx + Math.sign(lx) * lx * lx * sp, 0, window.innerWidth); PAD.cy = clamp(PAD.cy + Math.sign(ly) * ly * ly * sp, 0, window.innerHeight);
    if (PAD.nav) { PAD.nav = false; for (const o of document.querySelectorAll('.padfocus')) o.classList.remove('padfocus'); if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); }
  }
  cur.hidden = padModal() && PAD.nav; cur.style.left = PAD.cx + 'px'; cur.style.top = PAD.cy + 'px';
  if (!padModal()) {
    // empurrar o cursor contra a borda move a câmera
    const m = 36, ex = PAD.cx < m ? -1 : PAD.cx > window.innerWidth - m ? 1 : 0, ey = PAD.cy < m ? -1 : PAD.cy > window.innerHeight - m ? 1 : 0;
    const pan = 520 * dt;
    if (ex || ey) { if (MODE === 'world') worldPan(-ex * pan, -ey * pan); else if (!S.cine) panScreen(-ex * pan, -ey * pan); }
    // analógico direito: girar e zoom; gatilhos: zoom
    const zoom = ry * 1.6 * dt + (v(6) - v(7)) * 1.4 * dt;
    if (MODE === 'world') { if (rx) worldPan(-rx * 600 * dt, 0); if (zoom) worldZoom(1 + zoom); }
    else { if (rx) cam.yaw -= rx * 2.2 * dt; if (zoom) { cam.tDist = null; cam.dist = clamp(cam.dist * (1 + zoom), 22, 420); } }
  }
  // direcional: navega nos botões (repetição ao segurar)
  let dir = -1; for (let k = 0; k < 4; k++) if (b(12 + k)) dir = k;
  if (dir >= 0) { if (dir !== PAD.lastDir) { PAD.rep = 0.38; padMoveFocus(dir); } else { PAD.rep -= dt; if (PAD.rep <= 0) { PAD.rep = 0.12; padMoveFocus(dir); } } }
  PAD.lastDir = dir;
  // botões
  if (down(0)) {
    initAudio();
    const f = document.activeElement;
    if (PAD.nav && f && f !== document.body && f.click) f.click();
    else if (padModal()) { const t = padTargets(); if (t.length) setPadFocus(t[0]); }
    else padClickAtCursor(false);
  }
  if (down(2) && !padModal()) padClickAtCursor(true);
  if (down(1)) {
    if (PAD.nav && document.activeElement && document.activeElement.blur) { document.activeElement.blur(); PAD.nav = false; for (const o of document.querySelectorAll('.padfocus')) o.classList.remove('padfocus'); }
    else if (MODE === 'world') wAction('close');
    else { if (S.placing) cancelPlacing(); else { S.strike = null; S.supportOpen = false; setSel([]); updSide(); } }
  }
  if (down(3)) { if (MODE === 'world') { panelMode = panelMode === 'bat' ? null : 'bat'; wPanel(); } else document.getElementById('bAll').click(); }
  if (down(4)) { if (MODE === 'world' && W) { W.speed = Math.max(1, W.speed - 1); wTop(); } else document.getElementById('bTanks').click(); }
  if (down(5)) { if (MODE === 'world' && W) { W.speed = Math.min(5, W.speed + 1); W.paused = false; wTop(); } else document.getElementById('bNaval').click(); }
  if (down(9)) { if (MODE === 'world' && W) { W.paused = !W.paused; wTop(); } else document.getElementById('bNaval').click(); }
  if (down(8)) { if (MODE === 'world') setMapStyle(mapStyle === 'globo' ? 'plano' : 'globo'); else document.getElementById('bBox').click(); }
  for (let i = 0; i < gp.buttons.length; i++) PAD.prev[i] = b(i);
  // no modo tático, o botão "caixa" usa o cursor do controle: segurar X e mover não é necessário
}
