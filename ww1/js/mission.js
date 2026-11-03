'use strict';
// Campanha completa: bombardeio, apito, terra de ninguém, metralhadora, tomada da trincheira,
// ataque de gás, contra-ataque e chegada dos reforços (final).
(function () {
  const W = WW1.world;
  const M = WW1.mission = {
    BRIEFING:
      'Depois de sete dias de bombardeio, o Exército Britânico vai atacar as linhas alemãs. Você é o soldado Thomas Hale, do 1º Batalhão de Fuzileiros.\n\n' +
      'Quando o oficial apitar, saia da trincheira, atravesse a terra de ninguém, destrua o ninho de metralhadora e tome a trincheira inimiga. Depois, segure a posição até os reforços chegarem.\n\n' +
      '• Use as crateras e o tanque destruído como cobertura.\n• Agachado você é um alvo bem menor.\n• Para sair da trincheira, use as rampas ou empurre contra a parede para escalar.\n• Fique longe do arame farpado: passe pelas brechas abertas pela artilharia.\n\n' +
      'Boa sorte, soldado.',
    EPILOGUE:
      'Naquele 1º de julho de 1916, o primeiro dia da Batalha do Somme, cerca de 20 mil soldados britânicos morreram — o dia mais sangrento da história do Exército Britânico.\n\n' +
      'A batalha durou até novembro de 1916 e deixou mais de um milhão de mortos e feridos entre britânicos, franceses e alemães, para um avanço de poucos quilômetros.\n\n' +
      'Dois anos depois, às 11 horas do dia 11 de novembro de 1918, os canhões finalmente silenciaram na Frente Ocidental. A Grande Guerra havia terminado.\n\n' +
      'Em memória de todos que lutaram e caíram.',
    objective: '', timer: '', marker: null,
    allies: [], defenders: [], attackers: [], officer: null, co: null, started: false,
  };

  const R = (r, a, b) => a + r() * (b - a);
  const clampX = x => WW1.clamp(x, W.MINX + 9, W.MAXX - 9);
  const alive = list => list.filter(s => !s.dead).length;

  // Coloca os soldados no mapa (já aparecem no menu)
  M.setup = function () {
    Object.assign(M, { objective: '', timer: '', marker: null, allies: [], defenders: [], attackers: [], officer: null, co: null, started: false });
    for (const x of [-17, -14.5, -9, -6, -3.2, 4.5, 7, 9.5, 15, 18]) {
      const a = new WW1.Soldier('allies', 'ally', x, W.STEPY, W.trenchZ(x, W.PLAYER_TRENCH) + W.STEPOFF, 0);
      a.holdStep(W.STEPY, 0);
      M.allies.push(a);
    }
    const ox = 1.8;
    M.officer = new WW1.Soldier('allies', 'officer', ox, W.FLOOR, W.trenchZ(ox, 0) - 0.4, 0.35);
    M.officer.holdStep(W.FLOOR, 0.35);
    M.allies.push(M.officer);
    for (let x = -38; x <= 38; x += 6.4) {
      if (Math.abs(x - 6) < 3) continue;
      const d = new WW1.Soldier('central', 'defender', x, W.STEPY, W.trenchZ(x, W.ENEMY_TRENCH) - W.STEPOFF, Math.PI);
      d.holdStep(W.STEPY, Math.PI);
      d.rushes = false; d.accuracy = 0.2;
      M.defenders.push(d);
    }
    const mz = W.trenchZ(6, W.ENEMY_TRENCH) - 3.6;
    WW1.game.mg = new WW1.MGNest(6, mz);
    W.mgPos = { x: 6, y: W.H(6, mz), z: mz };
    M.defenders.push(WW1.game.mg.gunner);
    const rng = WW1.RNG(5);
    for (let i = 0; i < 8; i++) WW1.corpse(i % 3 === 0 ? 'central' : 'allies', R(rng, -40, 40), R(rng, 50, 125), rng() * 6.28, rng() < 0.5 ? 1 : -1);
  };

  M.begin = function () {
    if (M.started) return;
    M.started = true;
    M.co = run();
    M.wait = 0; M.until = null;
  };

  // Executa a "corrotina" da missão a cada quadro
  M.update = function (dt) {
    if (!M.co) return;
    if (M.wait > 0) { M.wait -= dt; return; }
    if (M.until && !M.until()) return;
    M.until = null;
    const r = M.co.next(dt);
    if (r.done) { M.co = null; return; }
    if (typeof r.value === 'number') M.wait = r.value;
    else if (typeof r.value === 'function') M.until = r.value;
  };

  function* run() {
    const g = WW1.game, art = WW1.artillery, pc = g.player, ui = WW1.ui;
    const rng = WW1.RNG(1);

    // ---- 0. Bombardeio e espera pelo apito ----
    Object.assign(art, { friendly: true, z0: 143, z1: 160, interval: 0.55 });
    M.marker = null;
    M.objective = 'Aguarde o apito do oficial. A artilharia aliada está bombardeando a linha alemã.';
    ui.message('Calar baionetas!', 3);
    for (let t = 12; t > 0;) { M.timer = 'Ataque em ' + Math.ceil(t) + ' s'; t -= yield; }
    M.timer = '';

    // ---- Apito! ----
    const o = M.officer.pos;
    WW1.audio.playAt('whistle', o.x, o.y + 1.6, o.z, 1, 1, 15);
    yield 0.4;
    WW1.audio.playAt('whistle', pc.pos.x - 25, pc.pos.y + 1.5, pc.pos.z + 1, 0.6, 0.97, 10);
    WW1.audio.playAt('whistle', pc.pos.x + 30, pc.pos.y + 1.5, pc.pos.z + 1, 0.5, 1.03, 10);
    ui.message('AVANCEM! SAIAM DA TRINCHEIRA!', 3.5);
    for (const a of M.allies) {
      if (a.dead) continue;
      const x0 = a.pos.x;
      a.active = true;
      a.goTo(clampX(x0 + R(rng, -5, 5)), R(rng, 28, 45));
      a.waypoints = [[clampX(x0 + R(rng, -6, 6)), R(rng, 60, 85)], [clampX(x0 + R(rng, -6, 6)), R(rng, 98, 120)], [clampX(x0 + R(rng, -6, 6)), R(rng, 124, 133)]];
    }
    for (const d of M.defenders) if (d.role === 'defender') d.active = true;
    g.mg.active = true;
    Object.assign(art, { z0: 165, z1: 190, interval: 1.1 });
    g.later(18, () => { art.friendly = false; });
    yield 4;
    Object.assign(art, { enemy: true, shellInterval: 7.5, shellMax: 55 });

    // ---- 1. Terra de ninguém até a cratera ----
    const cr = W.objectiveCrater;
    M.objective = 'Saia da trincheira (pelas rampas ou escalando a parede) e avance até a grande cratera.';
    M.marker = cr;
    yield () => Math.hypot(pc.pos.x - cr.x, pc.pos.z - cr.z) < 8 || pc.pos.z > cr.z + 10;
    ui.message('Cratera alcançada! Pegue fôlego...', 2.5);

    // ---- 2. Ninho de metralhadora ----
    if (!g.mg.destroyed) {
      M.objective = 'Destrua o ninho de metralhadora: jogue uma granada nele ou abata o atirador.';
      M.marker = W.mgPos;
      yield () => g.mg.destroyed;
    }
    yield 1.5;

    // ---- 3. Tomar a trincheira inimiga ----
    while (alive(M.defenders) > 0) {
      M.objective = `Invada a trincheira alemã e elimine os defensores (${alive(M.defenders)} restantes).`;
      let best = 1e9, near = null;
      for (const d of M.defenders) {
        if (d.dead) continue;
        const dist = d.pos.distanceTo(pc.pos);
        if (dist < best) { best = dist; near = d; }
        if (pc.pos.z > W.ENEMY_TRENCH - 30 && dist < 22 && d.role === 'defender') d.chasePlayer = true;
      }
      if (near) M.marker = { x: near.pos.x, y: near.pos.y, z: near.pos.z };
      yield 0.3;
    }
    art.enemy = false;
    ui.message('TRINCHEIRA TOMADA!', 3.5);

    let k = 0;
    for (const a of M.allies) {
      if (a.dead) continue;
      let x = clampX(pc.pos.x + (k % 2 === 0 ? 1 : -1) * (3 + k * 2.2));
      k++;
      if (Math.abs(x - 6) < 2) x += 3;
      a.waypoints = [[x, W.trenchZ(x, W.ENEMY_TRENCH) + W.STEPOFF]];
      a.goTo(x, W.trenchZ(x, W.ENEMY_TRENCH) - 6);
      a.arrived = s => s.holdStep(W.STEPY, 0);
    }

    // ---- Reabastecer ----
    let crate = W.ammoCrates[1], cd = 1e9;
    for (let i = 1; i < W.ammoCrates.length; i++) {
      const c = W.ammoCrates[i], d = Math.hypot(c.x - pc.pos.x, c.z - pc.pos.z);
      if (d < cd) { cd = d; crate = c; }
    }
    M.objective = 'Pegue munição e granadas na caixa e prepare-se para o contra-ataque.';
    M.marker = crate;
    let wait = 18;
    while (wait > 0 && !(pc.reserve >= WW1.MAX_RESERVE && pc.grenades >= WW1.MAX_GREN)) wait -= yield;

    // ---- 4. Ataque de gás ----
    M.marker = null;
    g.gasActive = true;
    WW1.audio.play2D('bell', 0.8, 1);
    ui.message('GÁS! GÁS! GÁS!', 3.5);
    M.objective = 'Ataque de gás! Coloque a máscara (botão MÁSCARA / tecla M).';
    for (let t = 0; !pc.maskOn && t < 6;) t += yield;

    // ---- 5. Defender até os reforços ----
    M.objective = 'Defenda a trincheira capturada do contra-ataque alemão até os reforços chegarem.';
    Object.assign(art, { enemy: true, shellInterval: 6.5, shellMax: 45 });
    const DEF = 100, waveAt = [0, 22, 45, 70], waveSize = [5, 6, 6, 7];
    let wave = 0, gasOver = false;
    for (let t = 0; t < DEF;) {
      if (wave < waveAt.length && t >= waveAt[wave]) {
        spawnWave(waveSize[wave] + (WW1.settings.diff === 2 ? 2 : 0) - (WW1.settings.diff === 0 ? 1 : 0));
        if (wave > 0) ui.message('Eles estão vindo de novo!', 2.5);
        wave++;
      }
      if (!gasOver && t > 30) { gasOver = true; g.gasActive = false; ui.message('O gás se dissipou. Pode tirar a máscara.', 3); }
      M.timer = `Reforços em ${WW1.fmtTime(DEF - t)}   ·   Inimigos à vista: ${alive(M.attackers)}`;
      t += yield;
    }
    g.gasActive = false;
    M.timer = '';

    // ---- Final: chegam os reforços ----
    art.enemy = false;
    ui.message('OS REFORÇOS CHEGARAM!', 4);
    M.objective = 'Posição garantida. Os alemães estão recuando!';
    for (let i = 0; i < 10; i++) {
      const x = clampX(pc.pos.x + R(rng, -20, 20)), z = R(rng, 112, 126);
      const r = new WW1.Soldier('allies', 'ally', x, W.H(x, z), z, 0);
      r.active = true; r.rushes = false;
      r.goTo(x, W.trenchZ(x, W.ENEMY_TRENCH) + W.STEPOFF);
      r.arrived = s => s.holdStep(W.STEPY, 0);
    }
    for (const a of M.attackers) {
      if (a.dead) continue;
      Object.assign(a, { retreating: true, active: false, chasePlayer: false, rushes: false, waypoints: [] });
      a.goTo(a.pos.x, 266);
      a.arrived = s => s.remove();
    }
    yield 6;
    g.victory();
  }

  function spawnWave(count) {
    const px = WW1.game.player.pos.x;
    let n = alive(M.attackers);
    for (let i = 0; i < count && n < 12; i++, n++) {
      const x = clampX(px + WW1.rand(-32, 32)), z = WW1.rand(240, 256);
      const a = new WW1.Soldier('central', 'attacker', x, W.H(x, z), z, Math.PI);
      a.active = true; a.accuracy = 0.2; a.range = 110; a.runSpeed = WW1.rand(3.4, 4.2);
      const tx = clampX(x + WW1.rand(-10, 10));
      a.goTo(clampX(x + WW1.rand(-6, 6)), WW1.rand(195, 212));
      a.waypoints = [[tx, W.trenchZ(tx, W.ENEMY_TRENCH) + WW1.rand(7, 12)]];
      a.arrived = s => { s.chasePlayer = true; };
      M.attackers.push(a);
    }
  }
})();
