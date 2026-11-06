'use strict';
// =====================================================================
//  ERA MODERNA (SÓ NO MODO ADM)
//  Este arquivo só existe no APK ADM (o APK normal nem leva ele) e só faz
//  alguma coisa quando você liga uma era no painel ADM (aba ⚙ Eras):
//  • 1ª Guerra (1914): soldados de farda e capacete com fuzil e baioneta,
//    tanque losango (Mark), caminhão, biplano, trincheiras e arame farpado.
//  • 2ª Guerra (1940): fardas e capacetes de aço, tanque de torre, jipe,
//    caça, bunker com metralhadora, canhão antiaéreo e base aérea.
//  • Nas duas: navio de guerra (encouraçado), kit de soldado (fuzil ou
//    submetralhadora, munição e granadas), batalha moderna com tanques e
//    aviões dos dois lados e ataque aéreo inimigo.
//  Os veículos são pilotáveis: chegue perto e toque em "Entrar". Ataque =
//  arma principal (canhão / metralhadora), Magia = arma secundária (bomba /
//  metralhadora do tanque), Interagir = sair (no avião: pousar).
// =====================================================================
if (typeof IS_ADM !== 'undefined' && IS_ADM) (function () {
  const ERAS = {
    ww1: { nome: '1ª Guerra (1914)', farda: '#6a6448', capacete: '#5a5a46', tanques: ['mark4', 'ft17'], carro: 'caminhao', aviao: 'biplano', arma: 'fuzil_ferrolho' },
    ww2: { nome: '2ª Guerra (1940)', farda: '#4e5a3c', capacete: '#4a4e42', tanques: ['sherman', 'tiger', 'panzer4'], carro: 'jipe', aviao: 'caca', arma: 'submetralhadora' }
  };
  // os veículos (a arte de cada um está em eramoderna_arte.js)
  const TIPOS = {
    mark4: { nome: 'Mark IV (1916)', arte: 'mark4', hp: 950, armor: 240, vel: 30, giro: 1.1, r: 22, canhao: { dmg: 120, r: 40, cd: 2.2, alc: 360 }, mg: { dmg: 10, cd: 0.22 }, cor: '#6b6245' },
    ft17: { nome: 'Renault FT (1917)', arte: 'ft17', hp: 540, armor: 180, vel: 44, giro: 2, r: 14, canhao: { dmg: 80, r: 30, cd: 1.3, alc: 300 }, mg: { dmg: 9, cd: 0.2 }, cor: '#6a6a4a' },
    sherman: { nome: 'M4 Sherman (1942)', arte: 'sherman', hp: 1250, armor: 300, vel: 58, giro: 1.7, r: 20, canhao: { dmg: 160, r: 46, cd: 1.5, alc: 420 }, mg: { dmg: 14, cd: 0.12 }, cor: '#5b6136' },
    tiger: { nome: 'Tiger I (1942)', arte: 'tiger', hp: 1900, armor: 430, vel: 40, giro: 1.15, r: 23, canhao: { dmg: 240, r: 52, cd: 2, alc: 480 }, mg: { dmg: 14, cd: 0.12 }, cor: '#8f8460' },
    panzer4: { nome: 'Panzer IV (1942)', arte: 'panzer4', hp: 1350, armor: 320, vel: 52, giro: 1.6, r: 21, canhao: { dmg: 180, r: 48, cd: 1.7, alc: 440 }, mg: { dmg: 14, cd: 0.12 }, cor: '#6c6f6a' },
    caminhao: { nome: 'Caminhão (1914)', hp: 340, armor: 40, vel: 110, giro: 2.2, r: 16, cor: '#5a5a40' },
    jipe: { nome: 'Jipe Willys (1942)', hp: 300, armor: 40, vel: 165, giro: 3, r: 13, cor: '#56603e' },
    biplano: { nome: 'Biplano (1917)', hp: 260, armor: 20, vel: 140, giro: 1.6, voa: true, r: 14, mg: { dmg: 14, cd: 0.13 }, bomba: { dmg: 130, r: 42, cd: 1.6 }, cor: '#a08850' },
    caca: { nome: 'Caça (1940)', hp: 360, armor: 40, vel: 220, giro: 1.9, voa: true, r: 15, mg: { dmg: 22, cd: 0.08 }, bomba: { dmg: 210, r: 56, cd: 1.4 }, cor: '#6a7a6a' },
    navio: { nome: 'Encouraçado', hp: 3200, armor: 400, vel: 70, giro: 0.7, agua: true, r: 36, canhao: { dmg: 240, r: 62, cd: 2.6, alc: 520 }, mg: { dmg: 14, cd: 0.16 }, cor: '#7a8088' }
  };
  Object.assign(TIPOS, {
    destroier: { nome: 'Destróier (1940)', nav: 'destroier', hp: 1900, armor: 260, vel: 105, giro: 1.3, agua: true, r: 28, canhao: { dmg: 140, r: 40, cd: 1.7, alc: 460 }, mg: { dmg: 12, cd: 0.14 }, cor: '#6a7078' },
    submarino: { nome: 'Submarino (1940)', nav: 'submarino', hp: 950, armor: 150, vel: 70, giro: 1.1, agua: true, r: 22, torpedo: { dmg: 520, cd: 5, alc: 480 }, cor: '#4a5058' },
    portaavioes: { nome: 'Porta-aviões (1942)', nav: 'portaavioes', hp: 4600, armor: 380, vel: 48, giro: 0.5, agua: true, r: 46, mg: { dmg: 12, cd: 0.1 }, lanca: true, cor: '#6e747a' },
    lancha: { nome: 'Lancha de desembarque', nav: 'lancha', hp: 420, armor: 60, vel: 92, giro: 2.2, agua: true, r: 14, mg: { dmg: 9, cd: 0.2 }, carga: 8, cor: '#5a6648' }
  });
  TIPOS.tanque1 = TIPOS.mark4; TIPOS.tanque2 = TIPOS.sherman;      // nomes antigos (jogos salvos)
  for (const [k, T] of Object.entries(TIPOS)) ENEMIES['veic_' + k] = { name: T.nome, look: { k: 'hum', body: T.cor }, hp: T.hp, dmg: 0, spd: T.vel, ai: 'melee', xp: Math.round(T.hp / 6), armor: T.armor, gold: [10, 40], r: T.r || 13 };
  // armas e munição
  idef('fuzil_ferrolho', { name: 'Fuzil de Ferrolho (1914)', type: 'weapon', slot: 'weapon', wclass: 'musket', bayonet: true, dmg: 58, cd: 0.9, range: 320, ranged: true, two: true, value: 900, icon: { k: 'musket', c: '#5a4a32', g: '#ffd080' }, lvl: 1, tier: 5, desc: 'Era moderna (ADM). Tiro certeiro e baioneta.' });
  idef('submetralhadora', { name: 'Submetralhadora (1940)', type: 'weapon', slot: 'weapon', wclass: 'pistol', dmg: 17, cd: 0.11, range: 230, ranged: true, value: 1200, icon: { k: 'pistol', c: '#3a3a3a', g: '#ffd080' }, lvl: 1, tier: 5, desc: 'Era moderna (ADM). Segure o ataque para rajadas.' });
  idef('granada', { name: 'Granada', type: 'misc', use: { granada: true }, value: 30, stack: true, icon: { k: 'stone', c: '#4a5a3a' }, desc: 'Era moderna (ADM). Joga na sua frente e explode.' });
  idef('capacete_aco', { name: 'Capacete de Aço', type: 'armor', slot: 'head', akind: 'head', mat: 'aco', armor: 30, icon: { k: 'head', c: '#5a5e4a' }, value: 200, lvl: 1, desc: 'Era moderna (ADM).' });

  const px = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), w, h); };
  const giro = (a, alvo, max) => { const d = angDiff(a, alvo); return a + clamp(d, -max, max); };

  const Era = {
    st() { const P = Game.player; return P && (P.eraMod || (P.eraMod = { era: null, estr: [], veic: [] })); },
    era() { const s = this.st(); return s && s.era; },
    E() { return ERAS[this.era()] || null; },
    pil: null, mons: new Map(), uid: 1,
    // ---------- soldados modernos ----------
    fardar(m, k) {
      const E = this.E(), K = War.K[k], L = Object.assign({}, m.look);
      for (const x of ['robe', 'cape', 'crest', 'horns', 'fur', 'pauldron', 'shield', 'hood', 'hat', 'trim', 'tabard']) delete L[x];
      L.body = mix(E.farda, (K && K.color) || E.farda, 0.18); L.legs = shade(E.farda, -0.18); L.boots = '#2a2418';
      L.helm = mix(E.capacete, (K && K.color) || E.capacete, 0.1); L.chestplate = false; L.weapon = 'musketb'; L.wc = '#3a3226';
      m.look = L; m.S = Sprites.actor(L); m.h = m.S.h; m.wclass = 'musketb'; m.wimg = Sprites.weapon('musketb', '#3a3226', '#ffd080');
      m.ai = 'musket'; m.proj = 'bullet'; m.aggro = 330; m.dmg *= this.era() === 'ww2' ? 1.7 : 1.4;
      m.name = (this.era() === 'ww2' ? 'Soldado de Infantaria' : 'Fuzileiro') + (K ? ' de ' + K.short : '');
    },
    // ---------- veículos ----------
    novo(tipo, x, y, dono, ang) {
      const T = TIPOS[tipo], m = new Monster('veic_' + tipo, x, y, 20, {});
      m.veic = { tipo, ang: ang || 0, mira: ang || 0, anim: 0, cd: 0, cd2: 0, alt: 0, vel: 0 };
      m.z = 0; m.sizeScale = 1; m.h = T.voa ? 16 : 22;
      if (dono === 'jogador') { m.team = 'ally'; m.passive = true; m.meu = true; }
      else if (dono) { m.faction = dono; m.team = 'war'; m.aggro = 450; }
      else { m.team = 'enemy'; m.aggro = 600; }
      m.update = dt => this.ia(m, dt);
      m.draw = (ctx, cx, cy) => this.desenhar(ctx, m, cx, cy);
      m.drawShadow = () => { };
      Game.findFree(m); Game.actors.push(m);
      return m;
    },
    // o jogador cria um veículo da era perto de si (o navio vai para a água mais próxima)
    criar(tipo) {
      const P = Game.player, W = Game.world;
      if (!Game.level.isWorld) return Adm.msg('só no mundo aberto');
      let x = P.x + Math.cos(P.face || 0) * 40, y = P.y + 18;
      if (TIPOS[tipo].agua) {
        const tx0 = Math.floor(P.x / 16), ty0 = Math.floor(P.y / 16); let ok = null;
        for (let r = 2; r < 40 && !ok; r++) for (let a = 0; a < 24 && !ok; a++) { const tx = Math.round(tx0 + Math.cos(a / 24 * 6.28) * r), ty = Math.round(ty0 + Math.sin(a / 24 * 6.28) * r); if (TWATER[W.tileAt(tx, ty)] && TWATER[W.tileAt(tx + 3, ty)] && TWATER[W.tileAt(tx - 3, ty)]) ok = { x: tx * 16 + 8, y: ty * 16 + 8 }; }
        if (!ok) return Adm.msg('não há mar por perto (vá até a costa)');
        x = ok.x; y = ok.y;
      }
      const d = { id: this.uid++, tipo, x, y, hp: TIPOS[tipo].hp };
      this.st().veic.push(d);
      const m = this.novo(tipo, x, y, 'jogador', 0); m.dado = d; this.mons.set(d.id, m);
      if (TIPOS[tipo].agua) { m.x = x; m.y = y; }
      Adm.msg(`${TIPOS[tipo].nome} pronto. Chegue perto e toque em Entrar.`);
    },
    // os veículos salvos voltam ao mundo
    sincronizar() {
      const S = this.st(); if (!S || !Game.level || !Game.level.isWorld) return;
      for (const d of S.veic) {
        let m = this.mons.get(d.id);
        if (m && Game.actors.includes(m) && !m.dead) { d.x = m.x; d.y = m.y; d.hp = m.hp; continue; }
        if (m && m.dead) continue;
        if (dist(d.x, d.y, Game.player.x, Game.player.y) > 1400) continue;
        m = this.novo(d.tipo, d.x, d.y, 'jogador', 0); m.x = d.x; m.y = d.y; m.hp = Math.min(m.maxHp, d.hp || m.maxHp); m.dado = d; this.mons.set(d.id, m);
        if (this.pil && this.pil.dado && this.pil.dado.id === d.id) this.pil = m;
      }
      if (S.veic.length > 30) S.veic.splice(0, S.veic.length - 30);
    },
    entrar(m) {
      const P = Game.player;
      if (P.mounted) P.toggleMount();
      this.pil = m; m.passive = false; Sfx.play('door');
      Game.toast(`🛡 Você está no ${TIPOS[m.veic.tipo].nome}. Ataque: ${TIPOS[m.veic.tipo].canhao ? 'canhão' : TIPOS[m.veic.tipo].mg ? 'metralhadora' : '—'}${TIPOS[m.veic.tipo].bomba ? ' • Magia: bomba' : TIPOS[m.veic.tipo].canhao && TIPOS[m.veic.tipo].mg ? ' • Magia: metralhadora' : ''}`, '#c0e0a0');
    },
    sair(forcado) {
      const P = Game.player, m = this.pil; if (!m) return;
      const T = TIPOS[m.veic.tipo];
      if (T.voa && m.veic.alt > 2 && !forcado) { m.veic.pousar = true; Game.toast('Pousando...', '#e0e0c0'); return; }
      if (T.agua && !forcado) {
        // desembarca na terra mais próxima
        const W = Game.world, tx0 = Math.floor(m.x / 16), ty0 = Math.floor(m.y / 16); let ok = null;
        for (let r = 1; r < 8 && !ok; r++) for (let a = 0; a < 16 && !ok; a++) { const tx = Math.round(tx0 + Math.cos(a / 16 * 6.28) * r), ty = Math.round(ty0 + Math.sin(a / 16 * 6.28) * r); if (W.isLand(tx, ty)) ok = { x: tx * 16 + 8, y: ty * 16 + 8 }; }
        if (!ok) return Game.toast('Chegue mais perto da costa para desembarcar.', '#ffb080');
        P.x = ok.x; P.y = ok.y;
      } else { P.x = m.x; P.y = m.y + 20; }
      this.pil = null; m.passive = true; m.veic.vel = 0; m.moving = false;
      Game.findFree(P); Sfx.play('door');
    },
    // ---------- pilotar ----------
    dirigir(m, dt) {
      const P = Game.player, v = m.veic, T = TIPOS[v.tipo], mv = Input.move, L = Game.level;
      if (T.voa) {
        if (v.pousar) { v.alt = Math.max(0, v.alt - 22 * dt); v.vel = Math.max(T.vel * 0.3, v.vel - T.vel * 0.6 * dt); if (v.alt <= 0) { v.pousar = false; if (!Game.world.isLand(Math.floor(m.x / 16), Math.floor(m.y / 16))) { v.alt = 6; Game.toast('Aqui é água! Pouse em terra firme.', '#ffb080'); } else { v.vel = 0; this.sair(true); return; } } }
        else { v.alt = Math.min(44, v.alt + 26 * dt); v.vel = Math.min(T.vel, v.vel + T.vel * 0.8 * dt); }
        if (mv.mag > 0.2) v.ang = giro(v.ang, Math.atan2(mv.y, mv.x), T.giro * dt);
        m.x += Math.cos(v.ang) * v.vel * dt; m.y += Math.sin(v.ang) * v.vel * dt * 0.8;
        m.x = clamp(m.x, 40, WORLD_W * 16 - 40); m.y = clamp(m.y, 40, WORLD_H * 16 - 40);
        m.z = v.alt; v.mira = v.ang; m.moving = true;
      } else {
        if (mv.mag > 0.15) {
          v.ang = giro(v.ang, Math.atan2(mv.y, mv.x), T.giro * dt * 2.2);
          const sp = T.vel * Math.min(1, mv.mag * 1.2) * dt, nx = m.x + Math.cos(v.ang) * sp, ny = m.y + Math.sin(v.ang) * sp;
          const rr = Math.min(18, (T.r || 13) * 0.75), pode = (x, y) => { for (const [ox, oy] of [[-rr, 0], [rr, 0], [0, -4], [0, 3]]) { const tx = Math.floor((x + ox) / 16), ty = Math.floor((y + oy) / 16), t = L.tileAt(tx, ty); if (T.agua ? !TWATER[t] : (L.solidAt(tx, ty) || TWATER[t])) return false; } return true; };
          if (pode(nx, m.y)) m.x = nx; if (pode(m.x, ny)) m.y = ny;
          m.moving = true; v.anim += sp * 0.4;
          if (Math.random() < dt * 6) Game.particle(m.x - Math.cos(v.ang) * 16, m.y - 2, (Math.random() - 0.5) * 10, -6, T.agua ? '#e0f0ff' : '#a09070', 0.5);
        } else m.moving = false;
        // a torre mira sozinha no inimigo mais perto
        const alvo = Combat.nearestHostile(P, m.x, m.y - 8, (T.canhao && T.canhao.alc) || 260);
        v.mira = alvo ? angleTo(m.x, m.y - 8, alvo.x, alvo.y - 6) : v.ang;
      }
      P.x = m.x; P.y = m.y; P.moving = false; P.mounted = false;
      v.cd -= dt; v.cd2 -= dt;
    },
    principal(m) {
      const v = m.veic, T = TIPOS[v.tipo], P = Game.player;
      if (T.canhao) { if (v.cd > 0) return; v.cd = T.canhao.cd; this.canhao(m, v.mira, P); return; }
      if (T.mg) this.metralhadora(m, P);
    },
    secundaria(m) {
      const v = m.veic, T = TIPOS[v.tipo], P = Game.player;
      if (T.bomba) { if (v.cd2 > 0) return; v.cd2 = T.bomba.cd; this.bomba(m, P); return; }
      if (T.mg) this.metralhadora(m, P);
    },
    canhao(m, ang, src) {
      const T = TIPOS[m.veic.tipo], c = T.canhao, b = m.veic.boca, x = b ? b.x : m.x + Math.cos(ang) * 20, y = b ? b.y : m.y - 12 + Math.sin(ang) * 8;
      m.veic.recuo = Game.t + 0.15;
      Game.fx.push({ kind: 'glowfx', x, y, r: 14, t: 0, dur: 0.18, color: '#ffd080' });
      Combat.projectile(src, x, y, ang, 'bullet', c.dmg, { spd: 420, life: c.alc / 420, aoe: c.r, color: '#ffb040', r: 4, weapon: src === Game.player });
      Game.musketFx(x, y, ang, '#ffd080'); Sfx.play('boom'); Game.shake = Math.max(Game.shake, 3);
      for (let i = 0; i < 6; i++) Game.particle(x, y, Math.cos(ang) * 40 + (Math.random() - 0.5) * 30, -20 - Math.random() * 20, '#9a9a9a', 0.8);
    },
    metralhadora(m, src) {
      const v = m.veic, T = TIPOS[v.tipo]; if (v.cdmg > Game.t) return; v.cdmg = Game.t + T.mg.cd;
      const ang = (v.mira || v.ang) + (Math.random() - 0.5) * 0.08, alt = v.alt || 0;
      const b = v.boca, x = (b ? b.x : m.x) + Math.cos(ang) * 4, y = (b ? b.y : m.y - 10 - alt) + Math.sin(ang) * 2;
      Combat.projectile(src, x, y, ang, 'bullet', T.mg.dmg, { spd: 620, life: 0.5, color: '#ffe080', r: 2, weapon: src === Game.player, z: alt });
      if (Math.random() < 0.5) Sfx.play('shot');
    },
    bomba(m, src) {
      const v = m.veic, T = TIPOS[v.tipo], b = T.bomba, x = m.x, y = m.y;
      Game.fx.push({ kind: 'telegraph', x, y, r: b.r, t: 0, dur: 0.6, friendly: src === Game.player });
      Sfx.play('swing');
      setTimeout(() => { Combat.explode(x, y, b.r, b.dmg, src, { falloff: true, kb: 220, color: '#ff8030' }); Sfx.play('boom'); Game.shake = Math.max(Game.shake, 6); for (let i = 0; i < 14; i++) Game.particle(x + (Math.random() - 0.5) * b.r, y, (Math.random() - 0.5) * 30, -30 - Math.random() * 40, '#6a6a6a', 1.4); }, 600);
    },
    // ---------- a IA dos veículos inimigos ----------
    ia(m, dt) {
      const v = m.veic, T = TIPOS[v.tipo];
      if (m.meu) { if (this.pil === m) return; m.moving = false; if (T.voa) { v.alt = Math.max(0, v.alt - 20 * dt); m.z = v.alt; } return; }
      v.cd -= dt; v.cd2 -= dt;
      const alvo = Combat.nearestHostile(m, m.x, m.y, T.voa ? 520 : 460);
      if (T.voa) {
        // circula sobre o alvo, metralha na descida e solta bombas por cima
        v.alt = Math.min(40, v.alt + 20 * dt); m.z = v.alt; v.vel = T.vel * 0.85;
        const ax = alvo ? alvo.x : m.home.x, ay = alvo ? alvo.y : m.home.y, d = dist(m.x, m.y, ax, ay);
        const want = d > 140 ? angleTo(m.x, m.y, ax, ay) : v.ang + 0.9;
        v.ang = giro(v.ang, want, T.giro * dt);
        m.x += Math.cos(v.ang) * v.vel * dt; m.y += Math.sin(v.ang) * v.vel * dt * 0.8; m.moving = true;
        v.mira = v.ang;
        if (alvo && d < 220 && Math.abs(angDiff(v.ang, angleTo(m.x, m.y, ax, ay))) < 0.35) this.metralhadora(m, m);
        if (alvo && d < 40 && T.bomba && v.cd2 <= 0) { v.cd2 = T.bomba.cd * 1.6; this.bomba(m, m); }
        return;
      }
      if (!alvo) { m.moving = false; return; }
      const d = dist(m.x, m.y, alvo.x, alvo.y);
      v.mira = angleTo(m.x, m.y - 8, alvo.x, alvo.y - 6);
      if (d > (T.canhao ? 170 : 40)) {
        v.ang = giro(v.ang, angleTo(m.x, m.y, alvo.x, alvo.y), T.giro * dt);
        const sp = T.vel * 0.8 * dt, nx = m.x + Math.cos(v.ang) * sp, ny = m.y + Math.sin(v.ang) * sp, L = Game.level;
        const ok = (x, y) => { const tx = Math.floor(x / 16), ty = Math.floor(y / 16), t = L.tileAt(tx, ty); return T.agua ? TWATER[t] : !L.solidAt(tx, ty) && !TWATER[t]; };
        if (ok(nx, m.y)) m.x = nx; if (ok(m.x, ny)) m.y = ny;
        m.moving = true; v.anim += sp * 0.4;
      } else m.moving = false;
      if (T.canhao && v.cd <= 0 && d < T.canhao.alc) { v.cd = T.canhao.cd * 1.3; this.canhao(m, v.mira, m); }
      else if (T.mg && d < 220) this.metralhadora(m, m);
    },
    // ---------- desenhos (pixel art feita no código) ----------
    desenhar(ctx, m, cx, cy) {
      const v = m.veic, T = TIPOS[v.tipo], alt = v.alt || 0, A_ = window.EraArte;
      const x = Math.round(m.x - cx), y = Math.round(m.y - cy);
      const K = m.faction && War.K[m.faction], R = Game.player && Game.player.reino;
      const cor = m.meu ? T.cor : K ? mix(T.cor, K.color, 0.2) : shade(T.cor, -0.12);
      const em = m.meu ? ((R && R.cor && Reino.ativo()) ? R.cor : '#f0f0f0') : K ? K.color : '#2a2a2a';
      const c = Math.cos(v.ang), s = Math.sin(v.ang), f = m.moving ? Math.floor(v.anim) % 3 : 0;
      if (Math.abs(c) > 0.3) v.lado = c >= 0 ? 1 : -1;
      const ld = v.lado || 1, recuo = v.recuo > Game.t ? 2 : 0;
      let topo = y - 30;
      if (m.flash > 0) ctx.globalAlpha = 0.65;
      if (T.arte && A_.TANQUES[T.arte]) {
        const A = A_.tanque(T.arte, cor, em), M = A.M;
        const vista = Math.abs(c) >= Math.abs(s) * 0.75 ? 'lado' : s > 0 ? 'frente' : 'tras';
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(x, y + 1, vista === 'lado' ? M.W * 0.48 : M.frenteW * 0.55, 5, 0, 0, 6.29); ctx.fill();
        let ax, ay, hx, hy;
        if (vista === 'lado') {
          const img = (ld > 0 ? A.lado : A.ladoE)[f]; hx = x - Math.round(M.W / 2); hy = y - M.H + 3 + (m.moving && f === 1 ? -1 : 0);
          ctx.drawImage(img, hx, hy); topo = hy;
          if (M.ancora) { ax = ld > 0 ? hx + M.ancora[0] : hx + M.W - M.ancora[0]; ay = hy + M.ancora[1]; }
          else { v.boca = { x: (ld > 0 ? hx + M.cano[0] : hx + M.W - M.cano[0]) + cx, y: hy + M.cano[1] + cy }; }
        } else {
          const img = vista === 'frente' ? A.frente : A.tras; hx = x - Math.round(img.width / 2); hy = y - img.height + 3 + (m.moving && f === 1 ? -1 : 0);
          ctx.drawImage(img, hx, hy); topo = hy;
          if (M.ancora) { ax = x; ay = hy + img.height - 18; } else v.boca = { x: m.x, y: hy + 12 + cy };
        }
        if (M.ancora) {
          // a torre gira sozinha para onde está mirando
          const mc = Math.cos(v.mira), ms = Math.sin(v.mira);
          if (Math.abs(mc) >= Math.abs(ms) * 0.75) {
            const td = mc >= 0 ? 1 : -1, ti = td > 0 ? A.torre : A.torreE, px = td > 0 ? M.pivo[0] : ti.width - M.pivo[0];
            ctx.drawImage(ti, ax - px - td * recuo, ay - M.pivo[1]);
            v.boca = { x: ax + td * (M.cano[0] - M.pivo[0] - recuo) + cx, y: ay + M.cano[1] - M.pivo[1] + cy };
          } else {
            const ti = ms > 0 ? A.tFrente : A.tTras; ctx.drawImage(ti, ax - Math.round(ti.width / 2), ay - ti.height + 2 + (ms > 0 ? recuo : -recuo));
            v.boca = { x: ax + cx, y: ay - 6 + cy };
          }
          topo = Math.min(topo, ay - 20);
        }
      } else if (v.tipo === 'jipe' || v.tipo === 'caminhao') {
        const A = A_[v.tipo](cor, em), img = (ld > 0 ? A.lado : A.ladoE)[f];
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(x, y + 1, A.W * 0.45, 4, 0, 0, 6.29); ctx.fill();
        const hy = y - A.H + 3 + (m.moving && f === 1 ? -1 : 0); ctx.drawImage(img, x - Math.round(A.W / 2), hy); topo = hy;
      } else if (T.voa) {
        const A = A_[v.tipo](cor, em), ang = v.ang + Math.PI / 2;
        v.inclina = (v.inclina || 0) * 0.9 + clamp(angDiff(v.angAnt === undefined ? v.ang : v.angAnt, v.ang) * 30, -0.5, 0.5) * 0.1; v.angAnt = v.ang;
        const esc = 1 - Math.min(0.4, Math.abs(v.inclina));
        ctx.save(); ctx.translate(x + alt * 0.25, y + 2); ctx.rotate(ang); ctx.scale(esc * (0.7 + 0.3 * (1 - alt / 50)), 0.7 + 0.3 * (1 - alt / 50)); ctx.globalAlpha = 0.25; ctx.drawImage(A.sombra, -A.W / 2, -A.H / 2); ctx.restore();
        ctx.save(); ctx.translate(x, y - alt); ctx.rotate(ang); ctx.scale(esc, 1);
        ctx.drawImage(A.c, -Math.round(A.W / 2), -Math.round(A.H / 2));
        // a hélice girando
        const giro_ = Math.floor(Game.t * 40) % 3, ny = -A.H / 2 + A.nariz;
        ctx.globalAlpha = 0.55; ctx.fillStyle = '#e8e8e0';
        if (v.vel > 5 || this.pil === m) { if (giro_ === 0) ctx.fillRect(-7, ny - 1, 14, 1); else if (giro_ === 1) ctx.fillRect(-5, ny - 1, 10, 1); else ctx.fillRect(-1, ny - 1, 2, 1); ctx.globalAlpha = 0.18; ctx.beginPath(); ctx.ellipse(0, ny - 1, 7, 1.4, 0, 0, 6.29); ctx.fill(); }
        else ctx.fillRect(-6, ny - 1, 12, 1);
        ctx.restore(); topo = y - alt - A.H / 2;
        v.boca = { x: m.x + Math.cos(v.ang) * 18, y: m.y - alt + Math.sin(v.ang) * 18 };
      } else if (v.tipo === 'navio') {
        const A = A_.navio(cor, em), img = ld > 0 ? A.c : A.cE, hx = x - Math.round(A.W / 2), hy = y - A.H + 12 + Math.round(Math.sin(Game.t * 1.4) * 1);
        ctx.drawImage(img, hx, hy); topo = hy;
        ctx.fillStyle = 'rgba(180,220,255,0.35)'; ctx.fillRect(hx + 6, y + 8, A.W - 14, 2);
        v.boca = { x: m.x + ld * 50, y: hy + 32 + cy };
        if (Math.random() < 0.35) { Game.particle(m.x + ld * -12, hy + 14 + cy, (Math.random() - 0.5) * 8, -16, '#5a5a5a', 1.8); Game.particle(m.x + ld * -24, hy + 17 + cy, (Math.random() - 0.5) * 8, -14, '#6a6a6a', 1.6); }
        if (m.moving && Math.random() < 0.7) Game.particle(m.x + ld * 74, m.y + 6, ld * 20 + (Math.random() - 0.5) * 20, -6, '#f0f8ff', 0.6);
      } else if (T.nav && A_[T.nav]) {
        // destróier, submarino, porta-aviões e lancha
        const A = A_[T.nav](cor, em, v.carga > 0), img = ld > 0 ? A.c : A.cE, hx = x - Math.round(A.W / 2), afunda = T.nav === 'submarino' ? 9 : T.nav === 'lancha' ? 6 : 10;
        const hy = y - A.H + afunda + Math.round(Math.sin(Game.t * 1.6 + m.x * 0.01) * 1);
        if (T.nav === 'submarino' && v.mergulho) ctx.globalAlpha = 0.38;
        ctx.drawImage(img, hx, hy); topo = hy; ctx.globalAlpha = m.flash > 0 ? 0.65 : 1;
        ctx.fillStyle = 'rgba(180,220,255,0.4)'; ctx.fillRect(hx + 4, y + afunda - 4, A.W - 10, 2);
        v.boca = { x: m.x + ld * A.W * 0.34, y: hy + A.H * 0.5 + cy };
        if (T.nav !== 'submarino' && T.nav !== 'lancha' && Math.random() < 0.3) Game.particle(m.x - ld * A.W * 0.12, hy + 10 + cy, (Math.random() - 0.5) * 8, -15, '#5a5a5a', 1.6);
        if (m.moving && Math.random() < 0.6) Game.particle(m.x + ld * A.W * 0.46, m.y + 4, ld * 18 + (Math.random() - 0.5) * 20, -6, '#f0f8ff', 0.6);
        if (m.moving && Math.random() < 0.5) Game.particle(m.x - ld * A.W * 0.48, m.y + 4, -ld * 12, -4, '#e0f0ff', 0.7);
      }
      ctx.globalAlpha = 1;
      // fumaça e fogo quando está avariado, poeira e escapamento andando
      if (!T.voa && !T.agua) {
        if (m.moving && Math.random() < 0.5) Game.particle(m.x - ld * 30 + (Math.random() - 0.5) * 6, m.y, -ld * 10 + (Math.random() - 0.5) * 10, -8, '#b0a080', 0.6);
        if (m.moving && Math.random() < 0.25) Game.particle(m.x - ld * 26, topo + 6 + cy, -ld * 6, -14, '#7a7a7a', 1.2);
      }
      if (m.hp < m.maxHp * 0.5 && Math.random() < 0.3) Game.particle(m.x + (Math.random() - 0.5) * 12, topo + 4 + cy, (Math.random() - 0.5) * 8, -20, '#4a4a4a', 1.6);
      if (m.hp < m.maxHp * 0.25 && Math.random() < 0.35) Game.particle(m.x + (Math.random() - 0.5) * 10, topo + 6 + cy, (Math.random() - 0.5) * 8, -26, Math.random() < 0.5 ? '#ff9030' : '#ffd060', 0.5);
      if (m.hp < m.maxHp) { const fr = clamp(m.hp / m.maxHp, 0, 1); px(ctx, x - 14, topo - 5, 28, 3, '#200'); px(ctx, x - 14, topo - 5, Math.round(28 * fr), 3, m.meu ? '#40c040' : '#e04040'); }
    },
    // ---------- estruturas ----------
    construir(tipo) {
      const P = Game.player; if (!Game.level.isWorld) return Adm.msg('só no mundo aberto');
      const f = P.face || 0, x = Math.round(P.x + Math.cos(f) * 50), y = Math.round(P.y + Math.sin(f) * 34);
      this.st().estr.push({ tipo, x, y, cd: 0, mira: 0 });
      Adm.msg(`${{ trincheira: 'Trincheira', arame: 'Arame farpado', bunker: 'Bunker', base: 'Base aérea', flak: 'Canhão antiaéreo' }[tipo]} construído(a)`);
    },
    desenharEstr(ctx, s, cx, cy) {
      const x = Math.round(s.x - cx), y = Math.round(s.y - cy);
      if (s.tipo === 'trincheira') {
        px(ctx, x - 40, y - 4, 80, 9, '#3a2a1a'); px(ctx, x - 38, y - 2, 76, 5, '#2a1e12');
        for (let i = 0; i < 8; i++) px(ctx, x - 37 + i * 10, y - 2, 1, 5, '#5a4428');            // tábuas
        for (let i = 0; i < 13; i++) { ctx.fillStyle = i % 2 ? '#c8b48a' : '#b8a47a'; ctx.beginPath(); ctx.ellipse(x - 38 + i * 6.3, y - 6, 3.4, 2, 0, 0, 6.29); ctx.fill(); }
      } else if (s.tipo === 'arame') {
        for (let i = 0; i <= 6; i++) px(ctx, x - 30 + i * 10, y - 9, 1, 10, '#4a3a2a');
        ctx.strokeStyle = '#9a9aa0'; ctx.lineWidth = 1; ctx.beginPath();
        for (let i = 0; i <= 12; i++) { const xx = x - 30 + i * 5; if (i === 0) ctx.moveTo(xx, y - 3); else ctx.lineTo(xx, y - (i % 2 ? 8 : 3)); }
        ctx.stroke(); ctx.beginPath(); for (let i = 0; i <= 12; i++) { const xx = x - 30 + i * 5; if (i === 0) ctx.moveTo(xx, y - 8); else ctx.lineTo(xx, y - (i % 2 ? 3 : 8)); } ctx.stroke();
      } else if (s.tipo === 'bunker') {
        for (let i = 0; i < 8; i++) { ctx.fillStyle = '#b8a47a'; ctx.beginPath(); ctx.ellipse(x - 21 + i * 6, y + 1, 3.4, 2, 0, 0, 6.29); ctx.fill(); }
        px(ctx, x - 16, y - 16, 32, 16, '#8a8a84'); px(ctx, x - 17, y - 19, 34, 4, '#a0a098'); px(ctx, x - 16, y - 15, 32, 1, '#6a6a64');
        px(ctx, x - 9, y - 11, 18, 3, '#1a1a1a');                                                    // a fresta
        const a = s.mira || 0; px(ctx, x + Math.round(Math.cos(a) * 9), y - 10, 3, 1, '#2a2a2a');
      } else if (s.tipo === 'flak') {
        for (let i = 0; i < 10; i++) { const a = i / 10 * 6.28; ctx.fillStyle = '#b8a47a'; ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * 12, y + Math.sin(a) * 5, 3.4, 2, 0, 0, 6.29); ctx.fill(); }
        px(ctx, x - 4, y - 8, 8, 6, '#5a5e4a');
        ctx.strokeStyle = '#2a2e24'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 7); const a = s.mira || -1.2; ctx.lineTo(x + Math.cos(a) * 14, y - 7 - Math.abs(Math.sin(a)) * 14 - 4); ctx.stroke();
      } else if (s.tipo === 'base') {
        px(ctx, x - 100, y - 12, 200, 24, '#55554f'); px(ctx, x - 100, y - 12, 200, 1, '#7a7a72'); px(ctx, x - 100, y + 11, 200, 1, '#3a3a36');
        for (let i = 0; i < 12; i++) px(ctx, x - 92 + i * 16, y - 1, 9, 2, '#e8e8e0');               // faixa da pista
        // hangar, torre e biruta
        const hx = x + 118, hy = y + 8;
        ctx.fillStyle = '#7a7a6a'; ctx.beginPath(); ctx.ellipse(hx, hy - 4, 26, 26, 0, Math.PI, 0); ctx.fill();
        px(ctx, hx - 26, hy - 4, 52, 4, '#6a6a5c'); px(ctx, hx - 12, hy - 18, 24, 14, '#2a2a26');
        for (let i = 0; i < 5; i++) px(ctx, hx - 22 + i * 11, hy - 26 + Math.abs(i - 2) * 4, 1, 4, '#8a8a7a');
        px(ctx, x - 130, y - 30, 10, 30, '#9a9488'); px(ctx, x - 132, y - 36, 14, 7, '#6a7a8a'); px(ctx, x - 131, y - 35, 12, 4, '#a8c8e0');
        px(ctx, x - 110, y - 26, 1, 24, '#4a4a4a'); px(ctx, x - 109, y - 26, 8, 3, Math.sin(Game.t * 3) > 0 ? '#ff8030' : '#ffa050');
      }
    },
    estrTick(dt) {
      const S = this.st(), P = Game.player; if (!S || !S.estr.length || !Game.level.isWorld) return;
      for (const s of S.estr) {
        if (dist(s.x, s.y, P.x, P.y) > 900) continue;
        s.cd = (s.cd || 0) - dt;
        if (s.tipo === 'bunker' && s.cd <= 0) {
          const a = Combat.nearestHostile(P, s.x, s.y - 10, 240); if (!a) continue;
          s.cd = 0.16; s.mira = angleTo(s.x, s.y - 10, a.x, a.y - 6);
          Combat.projectile(P, s.x + Math.cos(s.mira) * 12, s.y - 10, s.mira + (Math.random() - 0.5) * 0.06, 'bullet', 24, { spd: 620, life: 0.5, color: '#ffe080', r: 2 });
          if (Math.random() < 0.4) Sfx.play('shot');
        } else if (s.tipo === 'flak' && s.cd <= 0) {
          const a = Game.actors.find(o => o.veic && TIPOS[o.veic.tipo].voa && !o.dead && !o.meu && isHostile(P, o) && dist(o.x, o.y, s.x, s.y) < 340);
          if (!a) continue;
          s.cd = 0.7; s.mira = angleTo(s.x, s.y, a.x, a.y);
          const ex = a.x + (Math.random() - 0.5) * 30, ey = a.y + (Math.random() - 0.5) * 20;
          setTimeout(() => { Combat.damage(a, 70, { src: P }); Game.fx.push({ kind: 'ring', x: ex, y: ey - (a.z || 30), r0: 2, r1: 18, t: 0, dur: 0.3, color: '#ffd080' }); for (let i = 0; i < 6; i++) Game.particle(ex, ey - (a.z || 30), (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, '#5a5a5a', 1); }, 300);
          Sfx.play('boom');
        } else if (s.tipo === 'arame' && s.cd <= 0) {
          s.cd = 0.5;
          for (const a of Game.actors) if (!a.dead && !a.veic && isHostile(P, a) && Math.abs(a.x - s.x) < 32 && Math.abs(a.y - s.y) < 10) { Combat.damage(a, 6, { src: P }); a.x -= Math.sign(a.x - s.x || 1) * 0; a.kbx = (a.kbx || 0); }
        }
      }
    },
    naTrincheira(P) { const S = this.st(); return S && S.estr.some(s => s.tipo === 'trincheira' && Math.abs(P.x - s.x) < 40 && Math.abs(P.y - s.y) < 9); },
    // ---------- guerra moderna ----------
    batalha() {
      if (!this.era()) return Adm.msg('ligue uma era primeiro');
      Adm.ka = Adm.ka || 'aurelion'; Adm.kb = Adm.kb || 'ferrania';
      const [a, b] = Adm.pair(); if (!a) return;
      Adm.battleHere();
      setTimeout(() => {
        const E = this.E(), P = Game.player;
        for (const [k, s] of [[a, -1], [b, 1]]) {
          const so = Game.actors.filter(o => o.faction === k && !o.veic && !o.dead);
          const cx = so.length ? so.reduce((t, o) => t + o.x, 0) / so.length : P.x + s * 160, cy = so.length ? so.reduce((t, o) => t + o.y, 0) / so.length : P.y;
          const tq = E.tanques[hashStr(k) % E.tanques.length];
          for (let i = 0; i < 2; i++) this.novo(i ? E.tanques[(hashStr(k) + 1) % E.tanques.length] : tq, cx + s * 50, cy + (i ? 36 : -36), k, s < 0 ? 0 : Math.PI);
          const av = this.novo(E.aviao, cx + s * 120, cy - 40, k, s < 0 ? 0 : Math.PI); av.veic.alt = 30; av.z = 30;
        }
        Adm.msg('batalha moderna: tanques e aviões dos dois lados');
      }, 300);
    },
    ataqueAereo() {
      if (!this.era()) return Adm.msg('ligue uma era primeiro');
      const P = Game.player, E = this.E(); UI.close();
      for (let i = 0; i < 3; i++) { const a = i * 2.1; const m = this.novo(E.aviao, P.x + Math.cos(a) * 380, P.y + Math.sin(a) * 260, null, a + Math.PI); m.veic.alt = 36; m.z = 36; }
      Game.centerMsg('✈ ATAQUE AÉREO!', 'Aviões inimigos se aproximam!'); Sfx.play('shout');
    },
    kit() {
      const P = Game.player, E = this.E(); if (!E) return Adm.msg('ligue uma era primeiro');
      P.addItem(Items.make(E.arma)); P.addItem(Items.make('bala_arcana', 300)); P.addItem(Items.make('granada', 8)); P.addItem(Items.make('capacete_aco'));
      Adm.msg('kit de soldado na mochila (arma, 300 cartuchos, 8 granadas, capacete)');
    },
    granada(P) {
      const f = P.face || 0, x = P.x + Math.cos(f) * 90, y = P.y + Math.sin(f) * 60;
      Game.fx.push({ kind: 'telegraph', x, y, r: 46, t: 0, dur: 1.1, friendly: true });
      Sfx.play('swing'); Game.toast('Granada!', '#ffd080');
      setTimeout(() => { Combat.explode(x, y, 46, 110, P, { falloff: true, kb: 200, color: '#ff9030' }); Sfx.play('boom'); Game.shake = Math.max(Game.shake, 5); }, 1100);
    },
    // ---------- o painel ADM ----------
    painel() {
      const f = UI.reg(), b = (label, fn, cls = '') => `<button class="sbtn ${cls}" ${f(fn)}>${label}</button>`;
      const tabs = [['jogador', 'Jogador'], ['itens', 'Itens'], ['mundo', 'Mundo'], ['guerra', 'Guerra'], ['inimigos', 'Inimigos'], ['era', '⚙ Eras']];
      const e = this.era(), E = this.E(), S = this.st();
      const so = e ? '' : ' <span class="dim">(ligue uma era primeiro)</span>';
      const body = `<div class="adm-row">Era: ${b('Medieval (desligado)', () => { S.era = null; this.painel(); }, !e ? 'on' : '')} ${b('1ª Guerra (1914)', () => { S.era = 'ww1'; War.clearLive(); this.painel(); }, e === 'ww1' ? 'on' : '')} ${b('2ª Guerra (1940)', () => { S.era = 'ww2'; War.clearLive(); this.painel(); }, e === 'ww2' ? 'on' : '')}</div>
        <small class="dim">Só existe no modo ADM. Com uma era ligada, os exércitos dos reinos usam farda, capacete e fuzil, e aparecem os veículos e as estruturas abaixo.</small>
        <h3>Veículos${so}</h3><div class="adm-grid">
          ${e ? E.tanques.map(t => b(`🛡 ${TIPOS[t].nome}`, () => { UI.close(); this.criar(t); })).join('') + b(`🚙 ${TIPOS[E.carro].nome}`, () => { UI.close(); this.criar(E.carro); }) + b(`✈ ${TIPOS[E.aviao].nome}`, () => { UI.close(); this.criar(E.aviao); }) + b('🚢 Encouraçado (no mar mais perto)', () => { UI.close(); this.criar('navio'); }) : ''}
        </div>
        <h3>Estruturas (na sua frente)${so}</h3><div class="adm-grid">
          ${e === 'ww1' ? b('Trincheira', () => { UI.close(); this.construir('trincheira'); }) + b('Arame farpado', () => { UI.close(); this.construir('arame'); }) : ''}
          ${e === 'ww2' ? b('Bunker com metralhadora', () => { UI.close(); this.construir('bunker'); }) + b('Canhão antiaéreo', () => { UI.close(); this.construir('flak'); }) + b('Trincheira', () => { UI.close(); this.construir('trincheira'); }) : ''}
          ${e ? b('🛫 Base aérea (pista, hangar, torre)', () => { UI.close(); this.construir('base'); }) : ''}
        </div>
        <h3>Guerra${so}</h3><div class="adm-grid">
          ${e ? b('🎒 Kit de soldado', () => this.kit()) + b('⚔ Batalha moderna AQUI (reinos A × B da aba Guerra)', () => { UI.close(); this.batalha(); }) + b('✈ Ataque aéreo inimigo', () => this.ataqueAereo()) : ''}
          ${b('Remover veículos e estruturas', () => { if (this.pil) this.sair(true); S.veic = []; S.estr = []; Game.actors = Game.actors.filter(a => !a.veic); this.mons.clear(); Adm.msg('removidos'); this.painel(); }, 'danger')}
        </div>
        <small class="dim">Veículos: ${S.veic.length} • estruturas: ${S.estr.length}</small>`;
      const el = UI.show('adm', `<div class="panel wide adm-panel"><div class="ptitle"><span class="adm-badge">ADM</span> Painel de testes</div>
        <div class="adm-tabs">${tabs.map(([k, n]) => b(n, () => { if (k === 'era') this.painel(); else { Adm.tab = k; Adm.open(k); } }, k === 'era' ? 'on' : '')).join('')}</div>
        <div class="adm-body">${body}</div>
        <button class="mbtn" ${f(() => UI.close())}>Fechar</button></div>`, { onBack: () => UI.close() });
      UI.bind(el, f); Game.paused = true; Adm.tab = 'era';
    }
  };
  Era.TIPOS = TIPOS;
  window.Era = Era;

  // ---------------- ganchos ----------------
  const tj0 = Player.prototype.toJSON;
  Player.prototype.toJSON = function () {
    const o = tj0.call(this);
    if (this.eraMod) { Era.sincronizar(); o.eraMod = { era: this.eraMod.era, estr: this.eraMod.estr, veic: this.eraMod.veic.map(d => ({ id: d.id, tipo: d.tipo, x: Math.round(d.x), y: Math.round(d.y), hp: Math.round(d.hp) })) }; }
    return o;
  };
  // a aba ⚙ Eras no painel
  const op0 = Adm.open;
  Adm.open = function (tab) {
    if ((tab || this.tab) === 'era') return Era.painel();
    const r = op0.apply(this, arguments);
    const bar = UI.current && UI.current.el && UI.current.el.querySelector('.adm-tabs');
    if (bar && !bar.querySelector('.bt-era')) { const bt = document.createElement('button'); bt.className = 'sbtn bt-era'; bt.textContent = '⚙ Eras'; bt.onclick = () => Era.painel(); bar.appendChild(bt); }
    return r;
  };
  // soldados com farda, capacete e fuzil
  const ms0 = War.makeSoldier;
  War.makeSoldier = function (k) { const m = ms0.apply(this, arguments); if (Era.era() && m) Era.fardar(m, k); return m; };
  // pilotar: o jogador vai dentro do veículo
  const up0 = Player.prototype.update;
  Player.prototype.update = function (dt) {
    const m = Era.pil;
    if (!m) return up0.apply(this, arguments);
    if (m.dead || !Game.actors.includes(m) || !Game.level.isWorld) { Era.pil = null; return up0.apply(this, arguments); }
    const mv = Input.move, x0 = mv.x, y0 = mv.y, g0 = mv.mag;
    Era.dirigir(m, dt);
    mv.x = 0; mv.y = 0; mv.mag = 0;
    try { up0.apply(this, arguments); } finally { mv.x = x0; mv.y = y0; mv.mag = g0; }
    this.x = m.x; this.y = m.y;
  };
  const at0 = Player.prototype.attack;
  Player.prototype.attack = function () { if (Era.pil) { this.atkT = 0.05; return Era.principal(Era.pil); } return at0.apply(this, arguments); };
  const cs0 = Player.prototype.castSpell;
  Player.prototype.castSpell = function () { if (Era.pil) { this.castT = 0.05; return Era.secundaria(Era.pil); } return cs0.apply(this, arguments); };
  const pd0 = Player.prototype.draw;
  Player.prototype.draw = function () { if (Era.pil) return; return pd0.apply(this, arguments); };
  // dano no jogador vai para o veículo (e a trincheira protege)
  const cd0 = Combat.damage;
  Combat.damage = function (t, amount, o) {
    const P = Game.player;
    if (t === P && Era.pil && !Era.pil.dead) { const m = Era.pil; const r = cd0.call(this, m, amount, o); if (m.dead || m.hp <= 0) { Era.sair(true); P.hp = Math.max(1, P.hp - 30); Game.centerMsg('VEÍCULO DESTRUÍDO!', 'Você saltou no último segundo'); } return r; }
    if (t === P && P && Era.naTrincheira(P)) amount *= 0.5;
    return cd0.call(this, t, amount, o);
  };
  // um veículo destruído explode
  const od0 = Game.onMonsterDeath;
  Game.onMonsterDeath = function (m) {
    if (m && m.veic) {
      Juice.explode(m.x, m.y - 8, 40, '#ff8030'); Sfx.play('boom'); Game.shake = Math.max(Game.shake, 6);
      for (let i = 0; i < 18; i++) Game.particle(m.x + (Math.random() - 0.5) * 30, m.y - 6, (Math.random() - 0.5) * 50, -30 - Math.random() * 50, Math.random() < 0.5 ? '#ff9030' : '#5a5a5a', 1.2);
      if (m.meu && m.dado) { const S = Era.st(); S.veic = S.veic.filter(d => d !== m.dado); Era.mons.delete(m.dado.id); }
    }
    return od0.apply(this, arguments);
  };
  // granadas (e atalhos podem levar granadas)
  const ui0 = Player.prototype.useItem;
  Player.prototype.useItem = function (it) { const d = ITEMS[it.id]; if (d && d.use && d.use.granada) { this.removeInst(it); Era.granada(this); return; } return ui0.apply(this, arguments); };
  if (typeof Atalhos !== 'undefined') { const po0 = Atalhos.pode.bind(Atalhos); Atalhos.pode = it => po0(it) || !!(ITEMS[it.id] && ITEMS[it.id].use && ITEMS[it.id].use.granada); }
  // Entrar / Sair / Pousar e a base aérea
  const fi0 = Muralhas.findInteract;
  Muralhas.findInteract = function (fx, fy) {
    const P = Game.player;
    if (Era.pil) { const T = TIPOS[Era.pil.veic.tipo]; return { kind: 'mar', label: T.voa && Era.pil.veic.alt > 2 ? 'Pousar' : 'Sair', name: T.nome, d: 0, prio: 9, fn: () => Era.sair() }; }
    if (Game.level && Game.level.isWorld && Game.actors) {
      const m = Game.actors.find(a => a.veic && a.meu && !a.dead && dist(P.x, P.y, a.x, a.y) < (TIPOS[a.veic.tipo].agua ? 70 : 34));
      if (m) return { kind: 'mar', label: 'Entrar', name: TIPOS[m.veic.tipo].nome, d: 1, prio: 6, fn: () => Era.entrar(m) };
      const S = Era.st(), base = S && Era.era() && S.estr.find(s => s.tipo === 'base' && dist(P.x, P.y, s.x + 118, s.y) < 50);
      if (base) return { kind: 'mar', label: 'Hangar', name: 'Base aérea', d: 1, prio: 5, fn: () => UI.dialog('🛫 Hangar', null, 'Qual avião vai decolar?', [
        { label: `✈ ${TIPOS[Era.E().aviao].nome}`, cls: 'gold', fn: () => { UI.close(); const d = { id: Era.uid++, tipo: Era.E().aviao, x: base.x - 80, y: base.y, hp: TIPOS[Era.E().aviao].hp }; Era.st().veic.push(d); const m2 = Era.novo(d.tipo, d.x, d.y, 'jogador', 0); m2.x = d.x; m2.y = d.y; m2.dado = d; Era.mons.set(d.id, m2); Game.toast('O avião está na cabeceira da pista.', '#c0e0a0'); } },
        { label: 'Fechar' }]) };
    }
    return fi0.apply(this, arguments);
  };
  // desenhar as estruturas e manter os veículos no mundo
  const dw0 = War.drawables;
  War.drawables = function (D, camX, camY, vw, vh) {
    const r = dw0.apply(this, arguments), S = Era.st();
    if (S && S.estr.length) for (const s of S.estr) { if (Math.abs(s.x - camX - vw / 2) > vw + 260 || Math.abs(s.y - camY - vh / 2) > vh + 120) continue; D.push({ y: s.tipo === 'trincheira' || s.tipo === 'base' || s.tipo === 'arame' ? s.y - 30 : s.y, fn: (ctx, cx, cy) => Era.desenharEstr(ctx, s, cx, cy) }); }
    return r;
  };
  const t0 = Reino.tick;
  Reino.tick = function (dt) { const r = t0.apply(this, arguments); const S = Era.st(); if (S && (S.veic.length || S.estr.length)) { Era.sincronizar(); Era.estrTick(dt); } return r; };
})();
