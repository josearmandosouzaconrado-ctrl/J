'use strict';
// Interface do mundo aberto: mapa com viagem rápida, ordens de missão, painel do comandante e HUD de veículos.
(function () {
  const U = WW1.ui, O = WW1.ow;
  const $ = id => document.getElementById(id);
  let mapBase = null;
  const W0 = -3000, SIZE = 6000;

  // ---------- mapa do mundo ----------
  function buildMapBase() {
    const N = 320, c = document.createElement('canvas');
    c.width = c.height = N;
    const x = c.getContext('2d'), img = x.createImageData(N, N), d = img.data;
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const wx = W0 + (i + 0.5) / N * SIZE, wz = W0 + (1 - (j + 0.5) / N) * SIZE;
      const f = O.frontness(wx, wz), base = O.baseH(wx, wz);
      let r = 120, g = 140, b = 80;
      const field = WW1.hash(Math.floor((0.94 * wx - 0.34 * wz) / 85), Math.floor((0.34 * wx + 0.94 * wz) / 60), 51);
      if (field < 0.25) { r = 170; g = 155; b = 85; } else if (field < 0.38) { r = 120; g = 100; b = 75; }
      const forest = WW1.vnoise(wx * 0.0035 + 5, wz * 0.0035 + 9, 63);
      if (forest > 0.62 && f < 0.35) { r = 60; g = 85; b = 50; }
      const shade = 0.8 + (base - 18) / 70;
      r *= shade; g *= shade; b *= shade;
      if (f > 0.15) { const k = Math.min(1, (f - 0.15) * 1.6); r = r * (1 - k) + 105 * k; g = g * (1 - k) + 88 * k; b = b * (1 - k) + 66 * k; }
      if (O.riverDist(wx, wz) < 14) { r = 60; g = 85; b = 105; }
      if (O.roadDist(wx, wz) < 6) { r = 200; g = 185; b = 150; }
      const k = (j * N + i) * 4;
      d[k] = r; d[k + 1] = g; d[k + 2] = b; d[k + 3] = 255;
    }
    x.putImageData(img, 0, 0);
    mapBase = c;
  }
  const toMap = (wx, wz, S) => [(wx - W0) / SIZE * S, (1 - (wz - W0) / SIZE) * S];

  function drawMap() {
    const cv = $('mapCanvas'), x = cv.getContext('2d'), S = cv.width;
    if (!mapBase) buildMapBase();
    x.imageSmoothingEnabled = true;
    x.drawImage(mapBase, 0, 0, S, S);
    const og = WW1.og;
    // linhas de trincheira e setores
    for (const [fn, col] of [[O.alliedZ, '#2f4f9a'], [O.germanZ, '#9a2f2a']]) {
      x.strokeStyle = col; x.lineWidth = 2.5; x.beginPath();
      for (let wx = -3000; wx <= 3000; wx += 30) { const [px, py] = toMap(wx, fn(wx), S); wx === -3000 ? x.moveTo(px, py) : x.lineTo(px, py); }
      x.stroke();
    }
    for (let i = 0; i < 20; i++) {
      if (og.sectors[i] !== 'allied') continue;
      const xa = O.sectorX(i) - 150, xb = xa + 300;
      const [p0] = toMap(xa, 0, S), [p1] = toMap(xb, 0, S), [, py] = toMap(0, O.germanZ(O.sectorX(i)), S);
      x.fillStyle = 'rgba(60,90,200,0.35)'; x.fillRect(p0, py - 12, p1 - p0, 18);
    }
    // cidades
    x.font = 'bold ' + Math.round(S / 48) + 'px Georgia';
    x.textAlign = 'center';
    for (const t of O.towns) {
      const [px, py] = toMap(t.x, t.z, S);
      x.fillStyle = t.side === 'german' ? 'rgba(120,40,40,0.75)' : t.side === 'ruin' ? 'rgba(80,70,60,0.75)' : 'rgba(70,70,75,0.8)';
      x.beginPath(); x.arc(px, py, Math.max(4, t.r / SIZE * S), 0, Math.PI * 2); x.fill();
      x.fillStyle = '#fff'; x.strokeStyle = '#000'; x.lineWidth = 3;
      x.strokeText(t.name, px, py - 9); x.fillText(t.name, px, py - 9);
    }
    // lugares
    const icon = (p, ch, col) => { const [px, py] = toMap(p.x, p.z, S); x.fillStyle = col; x.beginPath(); x.arc(px, py, 7, 0, 7); x.fill(); x.fillStyle = '#fff'; x.fillText(ch, px, py + 4); };
    icon(og.places.hq, 'Q', '#2a4a8a');
    icon(og.places.depot, 'T', '#556b2f');
    icon(og.places.battery, 'A', '#7a5a2a');
    if (og.marker) { const [px, py] = toMap(og.marker.x, og.marker.z, S); x.fillStyle = '#ffd060'; x.save(); x.translate(px, py); x.rotate(Math.PI / 4); x.fillRect(-7, -7, 14, 14); x.restore(); }
    // jogador
    const pl = WW1.game.player, [px, py] = toMap(pl.pos.x, pl.pos.z, S);
    const cam = WW1.game.camera, f = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
    x.save(); x.translate(px, py); x.rotate(Math.atan2(f.x, f.z) + Math.PI);
    x.fillStyle = '#fff'; x.strokeStyle = '#000'; x.lineWidth = 2;
    x.beginPath(); x.moveTo(0, -11); x.lineTo(7, 8); x.lineTo(0, 4); x.lineTo(-7, 8); x.closePath(); x.fill(); x.stroke();
    x.restore();
    x.textAlign = 'left'; x.fillStyle = '#fff'; x.font = Math.round(S / 50) + 'px Georgia';
    x.fillText('N ↑   Azul: linha britânica   Vermelho: linha alemã   1 km = ' + Math.round(S / 6) + ' px', 8, S - 10);
  }

  U.openMap = function () {
    U.openOverlay('map');
    drawMap();
    const side = $('mapSide'), og = WW1.og;
    side.innerHTML = '<div class="side-title">Viagem rápida' + (og.mode !== 'foot' ? ' (só a pé)' : '') + '</div>';
    for (const p of og.travelPoints()) {
      const b = document.createElement('button');
      b.className = 'b'; b.textContent = p.name;
      b.disabled = og.mode !== 'foot';
      b.onclick = () => { U.closeOverlays(); og.fastTravel(p); };
      side.appendChild(b);
    }
    const info = document.createElement('div');
    info.className = 'side-title';
    info.textContent = 'Setores tomados: ' + og.alliedSectors() + ' de 20 — Posto: ' + og.RANKS[og.rank];
    side.prepend(info);
  };

  // ---------- missões ----------
  U.openMissions = function () {
    const og = WW1.og;
    U.openOverlay('missions');
    $('missionsTitle').textContent = og.role === 'tank' ? 'ORDENS DO DEPÓSITO DE TANQUES' : 'ORDENS DO QUARTEL-GENERAL';
    const list = $('missionList');
    list.innerHTML = '';
    if (og.mission && og.mission.title) {
      const cur = document.createElement('div');
      cur.className = 'mcard';
      cur.innerHTML = '<b>Missão atual: ' + og.mission.title + '</b><div>' + (og.objective || '') + '</div>';
      const ab = document.createElement('button'); ab.className = 'b'; ab.textContent = 'Abandonar missão';
      ab.onclick = () => { if (og.mission.cleanup) og.mission.cleanup(); og.mission = null; og.marker = null; og.objective = 'Missão abandonada.'; U.openMissions(); };
      cur.appendChild(ab);
      list.appendChild(cur);
    }
    for (const o of og.missionOffers()) {
      const c = document.createElement('div');
      c.className = 'mcard';
      c.innerHTML = '<b>' + o.title + '</b><div>' + o.desc + '</div>';
      const b = document.createElement('button'); b.className = 'b'; b.textContent = 'Aceitar';
      b.onclick = () => { og.acceptMission(o); U.closeOverlays(); };
      c.appendChild(b);
      list.appendChild(c);
    }
  };

  // ---------- comandante ----------
  let selSector = 9;
  U.openCommand = function () {
    const og = WW1.og;
    og.initCommand();
    og.mode = 'command';
    U.openOverlay('command');
    renderCmdSide();
  };
  function renderCmdSide(note) {
    const og = WW1.og, c = og.cmd, side = $('cmdSide');
    side.innerHTML = '';
    const t = document.createElement('div'); t.className = 'side-title';
    t.textContent = 'Setores tomados: ' + og.alliedSectors() + ' / 20 (meta: 10). Setor escolhido: ' + (selSector + 1);
    side.appendChild(t);
    const row = document.createElement('div'); row.style.display = 'flex'; row.style.gap = '8px';
    for (const [lbl, d] of [['◀ Setor', -1], ['Setor ▶', 1]]) {
      const b = document.createElement('button'); b.className = 'b'; b.textContent = lbl;
      b.onclick = () => { selSector = WW1.clamp(selSector + d, 0, 19); renderCmdSide(); };
      row.appendChild(b);
    }
    side.appendChild(row);
    const bt = document.createElement('div'); bt.className = 'side-title'; bt.textContent = 'Batalhão: ' + c.bats[c.sel].name + ' (' + Math.round(c.bats[c.sel].str) + '%)';
    side.appendChild(bt);
    const act = (lbl, fn) => { const b = document.createElement('button'); b.className = 'b'; b.textContent = lbl; b.onclick = fn; side.appendChild(b); };
    act('Próximo batalhão', () => { c.sel = (c.sel + 1) % c.bats.length; selSector = c.bats[c.sel].target !== null ? c.bats[c.sel].target : c.bats[c.sel].sector; renderCmdSide(); });
    act('ATACAR o setor ' + (selSector + 1), () => renderCmdSide(og.cmdOrder(c.sel, selSector, 'attack')));
    act('Defender (descansar e reforçar)', () => renderCmdSide(og.cmdOrder(c.sel, c.bats[c.sel].sector, 'defend')));
    act('Barragem de artilharia no setor ' + (selSector + 1) + (c.barrageCd > 0 ? ' (' + Math.ceil(c.barrageCd) + ' s)' : ''), () => renderCmdSide(og.cmdOrder(c.sel, selSector, 'barrage')));
    const log = document.createElement('div'); log.id = 'cmdLog';
    log.innerHTML = (note ? '<span style="color:#ffb070">' + note + '</span><br>' : '') + c.log.join('<br>');
    side.appendChild(log);
  }
  function drawCommand() {
    const og = WW1.og, c = og.cmd, cv = $('cmdCanvas'), x = cv.getContext('2d'), Wd = cv.width, Hd = cv.height;
    if (!mapBase) buildMapBase();
    // recorte da faixa da frente (z de -700 a 1300)
    const z0 = -700, z1 = 1300;
    const sy = (1 - (z1 - W0) / SIZE) * mapBase.height, sh = (z1 - z0) / SIZE * mapBase.height;
    x.drawImage(mapBase, 0, sy, mapBase.width, sh, 0, 0, Wd, Hd);
    const P = (wx, wz) => [(wx - W0) / SIZE * Wd, (z1 - wz) / (z1 - z0) * Hd];
    for (const [fn, col] of [[O.alliedZ, '#3355bb'], [O.germanZ, '#bb3333']]) {
      x.strokeStyle = col; x.lineWidth = 3; x.beginPath();
      for (let wx = -3000; wx <= 3000; wx += 40) { const [px, py] = P(wx, fn(wx)); wx === -3000 ? x.moveTo(px, py) : x.lineTo(px, py); }
      x.stroke();
    }
    x.font = 'bold ' + Math.round(Hd / 28) + 'px Georgia'; x.textAlign = 'center';
    for (let i = 0; i < 20; i++) {
      const wx = O.sectorX(i), [px, py] = P(wx, O.germanZ(wx) + 60);
      const ours = og.sectors[i] === 'allied';
      x.fillStyle = ours ? 'rgba(50,80,190,0.45)' : 'rgba(170,40,40,0.35)';
      const [pa] = P(wx - 148, 0), [pb] = P(wx + 148, 0);
      x.fillRect(pa, py - 22, pb - pa, 30);
      if (i === selSector) { x.strokeStyle = '#ffd060'; x.lineWidth = 3; x.strokeRect(pa, py - 22, pb - pa, 30); }
      x.fillStyle = '#fff';
      x.fillText(ours ? (i + 1) + '' : (i + 1) + ': ' + Math.round(c.german[i]), px, py - 2);
    }
    c.bats.forEach((b, k) => {
      const s = b.target !== null ? b.target : b.sector;
      const wx = O.sectorX(s) + (k % 2 ? 40 : -40), [px, py] = P(wx, b.target !== null ? O.germanZ(wx) - 35 : O.alliedZ(wx) - 60 - (k % 3) * 18);
      x.fillStyle = k === c.sel ? '#ffd060' : '#e8e8f0';
      x.fillRect(px - 16, py - 9, 32, 18);
      x.strokeStyle = '#000'; x.lineWidth = 1.5; x.strokeRect(px - 16, py - 9, 32, 18);
      x.beginPath(); x.moveTo(px - 16, py - 9); x.lineTo(px + 16, py + 9); x.moveTo(px + 16, py - 9); x.lineTo(px - 16, py + 9); x.stroke();
      x.fillStyle = '#fff'; x.font = Math.round(Hd / 34) + 'px Georgia';
      x.fillText(Math.round(b.str) + '%', px, py + 24);
    });
    const albert = O.towns.find(t => t.hq), [ax, ay] = P(albert.x, Math.max(z0 + 60, albert.z));
    x.fillStyle = '#fff'; x.fillText('↓ Albert (QG)', ax, ay);
  }
  // clique no mapa do comando escolhe o setor
  document.addEventListener('DOMContentLoaded', () => { });
  function cmdClick(ev) {
    const cv = $('cmdCanvas'), r = cv.getBoundingClientRect();
    const fx = (ev.clientX - r.left) / r.width;
    selSector = WW1.clamp(Math.floor(fx * 20), 0, 19);
    renderCmdSide();
  }

  // controle: L1/R1 trocam o setor no painel do comando
  U.overlayPad = function (pad) {
    if (!$('command').classList.contains('on')) return;
    if (pad.pressed('l1')) { selSector = Math.max(0, selSector - 1); renderCmdSide(); }
    if (pad.pressed('r1')) { selSector = Math.min(19, selSector + 1); renderCmdSide(); }
  };

  // ---------- HUD do mundo aberto (chamado a cada quadro) ----------
  let lastMode = '', cmdT = 0;
  U.updateOpen = function (p, isTouch) {
    const og = WW1.og, m = og.mode;
    const cls = m + (og.vehicle && og.vehicle.tank ? '-tank' : '');
    if (cls !== lastMode) {
      lastMode = cls;
      const b = document.body;
      b.classList.add('open');
      ['m-foot', 'm-drive', 'm-gun', 'm-ride', 'm-tank', 'm-command'].forEach(c => b.classList.remove(c));
      b.classList.add('m-' + m);
      if (og.vehicle && og.vehicle.tank && m === 'drive') b.classList.add('m-tank');
      const fire = document.querySelector('.tb[data-b=fire]');
      fire.textContent = m === 'drive' ? 'CANHÃO' : m === 'gun' ? 'FOGO' : 'ATIRAR';
      const use = document.querySelector('.tb[data-b=use]');
      use.textContent = m === 'drive' || m === 'gun' ? 'SAIR' : m === 'ride' ? 'PULAR' : 'USAR';
    }
    const pr = $('prompt');
    const key = WW1.pad.active ? '△ ' : isTouch ? 'USAR: ' : 'E: ';
    const txt = og.prompt ? key + og.prompt : '';
    if (pr.textContent !== txt) { pr.textContent = txt; pr.style.display = txt ? 'block' : 'none'; }
    const vh = $('vehHud');
    let vt = '';
    if (m === 'drive' && og.vehicle) {
      const v = og.vehicle;
      vt = (v.tank ? 'Tanque Mark IV' : 'Caminhão') + ' — ' + Math.round(Math.abs(v.speed) * 3.6) + ' km/h — blindagem ' + Math.max(0, Math.round(v.hp / v.max * 100)) + '%' + (v.tank && v.reload > 0 ? ' — canhão recarregando' : '');
    } else if (m === 'gun') vt = og.gunInfo() + (og.observe ? '   [vista do observador]' : '');
    if (vh.textContent !== vt) { vh.textContent = vt; vh.style.display = vt ? 'block' : 'none'; }
    const rk = og.RANKS[og.rank] + ' · ' + og.ROLE_NAMES[og.role] + ' · Setores tomados: ' + og.alliedSectors() + '/20';
    if ($('rankHud').textContent !== rk) $('rankHud').textContent = rk;
    if ($('command').classList.contains('on')) {
      drawCommand();
      cmdT += 1;
      if (cmdT % 30 === 0) renderCmdSide();
    }
  };

  // textos de vitória do mundo aberto
  U.openVictoryTexts = function () {
    const og = WW1.og;
    const first = og.role === 'commander'
      ? 'Sob o seu comando, a divisão rompeu a linha alemã em dez setores da frente do Somme.'
      : 'Bapaume foi tomada. A ofensiva rompeu a frente alemã no Somme.';
    document.querySelector('#victory1 p.txt').textContent = first;
    $('epilogue').innerHTML = [
      'Na história real, a Batalha do Somme terminou em novembro de 1916 sem que os Aliados chegassem a Bapaume. A cidade só foi tomada em março de 1917, quando os alemães recuaram para a Linha Hindenburg.',
      'A guerra ainda duraria até 11 de novembro de 1918, quando o armistício silenciou os canhões às 11 horas.',
      'Você terminou como ' + og.RANKS[og.rank] + ', com ' + og.done + ' missões cumpridas.',
      'Em memória de todos que lutaram e caíram.',
    ].map(t => '<p class="txt">' + t + '</p>').join('');
  };

  // liga os botões das janelas
  window.addEventListener('load', () => {
    $('mClose').onclick = () => U.closeOverlays();
    $('mapClose').onclick = () => U.closeOverlays();
    $('cmdClose').onclick = () => U.closeOverlays();
    $('cmdCanvas').addEventListener('click', cmdClick);
    $('mapCanvas').addEventListener('click', ev => {
      // toque no mapa: viaja até o ponto de viagem mais próximo do toque
      const og = WW1.og;
      if (og.mode !== 'foot') return;
      const cv = $('mapCanvas'), r = cv.getBoundingClientRect();
      const wx = W0 + (ev.clientX - r.left) / r.width * SIZE, wz = W0 + (1 - (ev.clientY - r.top) / r.height) * SIZE;
      let best = null, bd = 260;
      for (const p of og.travelPoints()) { const d = Math.hypot(p.x - wx, p.z - wz); if (d < bd) { bd = d; best = p; } }
      if (best) { U.closeOverlays(); og.fastTravel(best); }
    });
  });
})();
