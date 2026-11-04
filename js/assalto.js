'use strict';
// =====================================================================
//  ASSALTO AO VIVO: ao amanhecer as armas de cerco trabalham de verdade.
//  Trabucos jogam pedras e abrem brechas na muralha, a catapulta põe fogo na cidade,
//  a balista derruba os arqueiros do adarve, o aríete avança e arromba o portão,
//  e as torres e escadas encostam na muralha: os soldados sobem, lutam lá em cima
//  contra os defensores e depois pulam para dentro da cidade.
// =====================================================================
const Assalto = {
  tiros: [], fx: [],
  ativo() { const C = Cerco.atual(); return !!(C && C.fase === 'assalto'); },
  // lado da muralha virado para o acampamento: o portão mais perto e as peças dali
  plano(C, s) {
    const g = Muralhas.geo(s), cx = C.x * 16, cy = C.y * 16;
    let porta = null, bd = Infinity;
    for (const v of g.vaos) { const mx = v.tiles.reduce((n, t) => n + t[0], 0) / v.tiles.length, my = v.tiles.reduce((n, t) => n + t[1], 0) / v.tiles.length; const d = dist(mx * 16, my * 16, cx, cy); if (d < bd) { bd = d; porta = { v, x: mx * 16 + 8, y: my * 16 + 8 }; } }
    if (!porta) return null;
    const lado = porta.v.lado, nrm = { n: [0, -1], s: [0, 1], w: [-1, 0], e: [1, 0] }[lado];
    const pecas = g.pecas.filter(p => p.lado === lado).map(p => ({ x: p.x, y: p.y, d: dist(p.x * 16 + 8, p.y * 16 + 8, porta.x, porta.y) })).sort((a, b) => a.d - b.d);
    return { porta, lado, nrm, pecas };
  },
  // ---------- começar ----------
  comecar() {
    const G = Game, C = Cerco.atual(), s = Cerco.cidade(); if (!C || !s) return;
    const A = Reino.campo(); if (!A) return;
    const pl = this.plano(C, s);
    if (!pl) return Cerco._assaltar0.call(Cerco);   // sem portão conhecido: o assalto antigo
    // a batalha começa com os portões fechados: defensores dentro, seu exército fora
    A.state = 'follow';
    Reino._invadir.call(Reino);
    const S = War.st(), D = S.armies.find(x => x.cidade === s.id && x.state === 'battle');
    if (!D) return;
    let fogo = false; for (const [k, n] of Object.entries(C.armas)) if (ARMAS_CERCO[k].fogo && n) fogo = true;
    D.fraco = Math.max(0.55, 0.82 - 0.04 * (Cerco.diasCerco() - 1) - (fogo ? 0.05 : 0));
    if (C.armas.manta) A.forte = 1.1;
    C.fase = 'assalto'; C.aberto = false; C.danos = {}; C.brechas = []; C.portaoHp = 7; C.t = 0;
    C.lado = pl.lado; C.nrm = pl.nrm; C.porta = { x: pl.porta.x, y: pl.porta.y }; C.defId = D.id;
    // as máquinas saem do acampamento e vão para os seus lugares
    const [nx, ny] = pl.nrm, lx = -ny, ly = nx, P = pl.porta, M = [];
    const base = { x: C.x * 16, y: C.y * 16 + 20 };
    const pecaLivre = (min, i) => { const l = pl.pecas.filter(p => p.d >= min * 16); return l[Math.min(l.length - 1, i)]; };
    let it = 0, il = 0, ie = 0;
    for (const [k, n] of Object.entries(C.armas)) for (let i = 0; i < Math.min(n, k === 'escada' ? 3 : 2); i++) {
      const m = { k, x: base.x + (Math.random() - 0.5) * 60, y: base.y + (Math.random() - 0.5) * 30, f: 0, cd: 2 + Math.random() * 2, fase: 'vai' };
      if (k === 'ariete') { m.tx = P.x + nx * 22; m.ty = P.y + ny * 22 + 6; m.v = 16; }
      else if (k === 'torre' || k === 'escada') {
        const pc = pecaLivre(k === 'torre' ? 3 : 2, k === 'torre' ? 2 + it++ * 5 : 1 + ie++ * 3 + (il++ % 2) * 0);
        if (!pc) continue;
        m.peca = { x: pc.x, y: pc.y }; m.tx = pc.x * 16 + 8 + nx * (k === 'torre' ? 30 : 22); m.ty = pc.y * 16 + 8 + ny * (k === 'torre' ? 30 : 22) + (ny ? 0 : 6); m.v = k === 'torre' ? 12 : 22;
      } else if (k === 'manta') { m.tx = P.x + nx * 80 + lx * (i ? 40 : -40); m.ty = P.y + ny * 80 + ly * (i ? 40 : -40); m.v = 20; }
      else { const sl = (M.filter(q => q.alcance).length - 1) * 44; m.alcance = true; m.tx = P.x + nx * 170 + lx * sl; m.ty = P.y + ny * 170 + ly * sl; m.v = 22; }
      M.push(m);
    }
    C.maq = M;
    // arqueiros e soldados de verdade em cima da muralha, perto do portão
    const rng = new RNG(Game.day * 7 + s.id.length), nDef = s.type === 'capital' ? 7 : s.type === 'town' ? 5 : 3;
    const bt = S.battles.find(b => b.a === D.id || b.b === D.id);
    const exD = G.actors.find(a => a.armyId === D.id && !a.dead);
    for (let i = 0; i < nDef && i < pl.pecas.length; i++) {
      const pc = pl.pecas[Math.min(pl.pecas.length - 1, 1 + i * 2)];
      const m = War.makeSoldier(D.k, i % 3 === 2 ? 'soldado' : 'arqueiro', pc.x * 16 + 8, pc.y * 16 + 8, rng);
      m.ctrl = 'battle'; m.battleId = bt ? bt.id : null; m.armyId = D.id; m.repr = exD ? exD.repr : 2; m.aggro = 300; m.naMuralha = s.id;
      if (D.fraco) { m.maxHp = m.hp = Math.round(m.maxHp * D.fraco); m.dmg *= D.fraco; }
      G.actors.push(m);
    }
    this.adarve(s);
    G.centerMsg('O ASSALTO COMEÇOU!', 'As máquinas avançam. Proteja o aríete e as torres de cerco!'); Sfx.play('shout'); G.shake = 6;
    Reino.painelKey = '';
  },
  // os tiles por onde se anda em cima da muralha
  adarve(s) { const g = Muralhas.geo(s), A = new Set(); for (const p of g.pecas) A.add(tkey(p.x, p.y)); for (const v of g.vaos) for (const [x, y] of v.tiles) A.add(tkey(x, y)); this.walk = A; this.cid = s.id; return A; },
  // ---------- cada quadro ----------
  tick(dt) {
    const G = Game, C = Cerco.atual();
    if (!C || C.fase !== 'assalto') { if (this.walk) this.limpar(); return; }
    const s = Cerco.cidade(); if (!s || !G.level.isWorld) return;
    if (!this.walk || this.cid !== s.id) this.adarve(s);
    C.t += dt;
    // quem está no alto da muralha fica lá em cima (e os tiros passam por cima das ameias)
    for (const a of G.actors) if (a.naMuralha && !a.dead) a.z = MURO_H - 2;
    const P = G.player; if (P.naMuralha) P.z = MURO_H - 2;
    for (const a of G.actors) if (a.caindo > 0) { a.caindo -= dt; a.z = Math.max(0, (MURO_H - 2) * a.caindo / 0.45); if (a.caindo <= 0) a.z = 0; }
    if (P.caindo > 0) { P.caindo -= dt; P.z = Math.max(0, (MURO_H - 2) * P.caindo / 0.45); if (P.caindo <= 0) P.z = 0; }
    for (const p of G.projectiles) if (!p.ghost && (p.kind === 'arrow' || p.kind === 'bullet' || p.kind === 'bolt') && dist(p.x / 16, p.y / 16, s.mid.x, s.mid.y) < s.w) p.ghost = true;
    const M = C.maq || [];
    for (const m of M) {
      if (m.fase === 'vai') {
        const d = dist(m.x, m.y, m.tx, m.ty);
        if (d < 2) { m.fase = 'pronta'; m.cd = m.alcance ? 1 : 0.8; if (m.k === 'torre' || m.k === 'escada') this.encostou(m); }
        else { const v = Math.min(d, m.v * dt); m.x += (m.tx - m.x) / d * v; m.y += (m.ty - m.y) / d * v; m.f += dt; }
        continue;
      }
      m.cd -= dt; if (m.anim > 0) m.anim -= dt;
      if (m.k === 'ariete' && !C.aberto && m.cd <= 0) this.bate(m, C, s);
      else if ((m.k === 'trabuco' || m.k === 'catapulta' || m.k === 'balista') && m.cd <= 0) this.atira(m, C, s);
      else if ((m.k === 'torre' || m.k === 'escada') && m.sobem > 0 && m.cd <= 0) this.sobe(m, C, s);
    }
    // os projéteis das máquinas
    for (let i = this.tiros.length - 1; i >= 0; i--) {
      const t = this.tiros[i]; t.t += dt;
      if (t.t >= t.dur) { this.tiros.splice(i, 1); this.cai(t, C, s); }
    }
    for (let i = this.fx.length - 1; i >= 0; i--) { const f = this.fx[i]; f.t += dt; if (f.t > f.dur) this.fx.splice(i, 1); }
    // soldados seus que limparam o trecho da muralha pulam para dentro da cidade
    for (const a of G.actors) {
      if (!a.naMuralha || a.dead || a.faction !== 'jogador') continue;
      const perto = G.actors.some(o => o.naMuralha && !o.dead && o.armyId === C.defId && dist(o.x, o.y, a.x, a.y) < 110);
      a.limpoT = perto ? 0 : (a.limpoT || 0) + dt;
      if (a.limpoT > 1.2) this.pula(a, s);
    }
    // depois que alguém pulou lá dentro, o portão é aberto por dentro
    if (!C.aberto && C.dentroT !== undefined) { C.dentroT -= dt; if (C.dentroT <= 0) this.abre(C, 'Seus soldados abriram o portão por dentro!'); }
  },
  // o aríete bate no portão
  bate(m, C, s) {
    m.cd = 1.3; m.anim = 0.35;
    C.portaoHp--; Game.shake = Math.max(Game.shake || 0, 4); Sfx.play('boom');
    for (let i = 0; i < 8; i++) Game.particle(C.porta.x + (Math.random() - 0.5) * 20, C.porta.y + (Math.random() - 0.5) * 8 - 6, (Math.random() - 0.5) * 80, -Math.random() * 60, Math.random() < 0.5 ? '#7a4a24' : '#a0a0a8', 0.6);
    if (C.portaoHp <= 0) { C.portaoQuebrado = true; this.abre(C, 'O ARÍETE ARROMBOU O PORTÃO!'); }
  },
  abre(C, txt) {
    if (C.aberto) return;
    C.aberto = true; Muralhas.cT = 0; Game.flow = null;
    Game.centerMsg(txt, 'Para dentro! Tomem a cidade!'); Sfx.play('shout'); Game.shake = 8;
    Reino.ordem = 'atacar'; Reino.painelKey = '';
  },
  // trabuco (pedra na muralha), catapulta (fogo na cidade) e balista (dardo nos arqueiros do adarve)
  atira(m, C, s) {
    const G = Game, [nx, ny] = C.nrm;
    if (m.k === 'balista') {
      const alvo = G.actors.filter(a => a.naMuralha && !a.dead && a.armyId === C.defId).sort((a, b) => dist(a.x, a.y, m.x, m.y) - dist(b.x, b.y, m.x, m.y))[0];
      m.cd = 3.2; if (!alvo) return;
      m.anim = 0.3; Sfx.play('swing');
      this.tiros.push({ k: 'dardo', x0: m.x, y0: m.y - 14, x1: alvo.x, y1: alvo.y - MURO_H - 6, t: 0, dur: 0.35, alvo });
      return;
    }
    if (m.k === 'catapulta') {
      m.cd = 4.5; m.anim = 0.5; Sfx.play('swing');
      const fx = C.porta.x - nx * (40 + Math.random() * 90) + (Math.random() - 0.5) * 120, fy = C.porta.y - ny * (40 + Math.random() * 90) + (Math.random() - 0.5) * 120;
      this.tiros.push({ k: 'fogo', x0: m.x, y0: m.y - 20, x1: fx, y1: fy, t: 0, dur: 1.5, h: 120 });
      return;
    }
    // trabuco: escolhe uma peça da muralha perto do portão (de preferência a que já está rachada)
    m.cd = 6; m.anim = 0.6; Sfx.play('swing');
    const g = Muralhas.geo(s), br = new Set(C.brechas);
    const cand = g.pecas.filter(p => p.lado === C.lado && !br.has(tkey(p.x, p.y)) && dist(p.x * 16, p.y * 16, C.porta.x, C.porta.y) > 40 && dist(p.x * 16, p.y * 16, C.porta.x, C.porta.y) < 170);
    if (!cand.length) return;
    cand.sort((a, b) => ((C.danos[tkey(b.x, b.y)] || 0) - (C.danos[tkey(a.x, a.y)] || 0)) || (dist(a.x * 16, a.y * 16, m.x, m.y) - dist(b.x * 16, b.y * 16, m.x, m.y)));
    const p = Math.random() < 0.75 ? cand[0] : cand[Math.floor(Math.random() * cand.length)];
    this.tiros.push({ k: 'pedra', x0: m.x, y0: m.y - 34, x1: p.x * 16 + 8, y1: p.y * 16 + 8 - MURO_H, t: 0, dur: 1.7, h: 150, peca: p });
  },
  cai(t, C, s) {
    const G = Game;
    if (t.k === 'dardo') { if (t.alvo && !t.alvo.dead) Combat.damage(t.alvo, 70, { kb: { x: 0, y: -40 } }); G.burst(t.x1, t.y1, '#c0b090', 6, 50); return; }
    if (t.k === 'fogo') {
      Sfx.play('boom'); G.shake = Math.max(G.shake || 0, 3);
      this.fx.push({ k: 'incendio', x: t.x1, y: t.y1, t: 0, dur: 9 });
      for (const a of G.actors) if (!a.dead && a.armyId === C.defId && dist(a.x, a.y, t.x1, t.y1) < 36) Combat.damage(a, 28, { elem: 'fire', burn: 4 });
      for (let i = 0; i < 14; i++) G.particle(t.x1, t.y1, (Math.random() - 0.5) * 120, -Math.random() * 90, Math.random() < 0.5 ? '#ff8020' : '#ffd040', 0.7);
      return;
    }
    // a pedra do trabuco acerta a muralha
    const p = t.peca, k = tkey(p.x, p.y);
    Sfx.play('boom'); G.shake = Math.max(G.shake || 0, 7);
    for (let i = 0; i < 16; i++) G.particle(t.x1 + (Math.random() - 0.5) * 14, t.y1 + 6, (Math.random() - 0.5) * 140, -Math.random() * 110, Math.random() < 0.6 ? '#9a9488' : '#5a544a', 0.8);
    this.fx.push({ k: 'poeira', x: t.x1, y: t.y1 + 8, t: 0, dur: 1.6 });
    for (const a of G.actors) if (!a.dead && a.naMuralha && dist(a.x, a.y, p.x * 16 + 8, p.y * 16 + 8) < 26) Combat.damage(a, 60, {});
    if (C.brechas.includes(k)) return;
    C.danos[k] = (C.danos[k] || 0) + 1;
    if (C.danos[k] >= 2) {
      C.brechas.push(k);
      // a peça ao lado também desaba: a brecha fica larga o bastante para passar
      const g = Muralhas.geo(s), viz = g.pecas.find(q => q.lado === p.lado && Math.abs(q.i - g.pecas.find(r => r.x === p.x && r.y === p.y).i) === 1 && !C.brechas.includes(tkey(q.x, q.y)));
      if (viz) C.brechas.push(tkey(viz.x, viz.y));
      for (const a of G.actors) if (a.naMuralha && !a.dead && C.brechas.includes(tkey(Math.floor(a.x / 16), Math.floor(a.y / 16)))) { a.naMuralha = null; a.caindo = 0.45; Combat.damage(a, 50, {}); }
      G.flow = null;
      G.centerMsg('BRECHA NA MURALHA!', 'O trabuco derrubou um pedaço da muralha!');
      this.fx.push({ k: 'poeira', x: t.x1, y: t.y1 + 8, t: 0, dur: 3, grande: true });
    }
  },
  // a torre ou a escada encostou na muralha: os soldados começam a subir
  encostou(m) { m.sobem = m.k === 'torre' ? 5 : 2; m.cd = m.k === 'torre' ? 1.2 : 2; Game.toast(m.k === 'torre' ? 'A torre de cerco encostou na muralha! Os soldados estão subindo.' : 'Escada na muralha! Os soldados estão subindo.', '#ffe080'); },
  sobe(m, C, s) {
    const G = Game, S = War.st(), A = Reino.campo() || S.armies.find(a => a.k === 'jogador' && a.state === 'battle'); if (!A) { m.sobem = 0; return; }
    m.sobem--; m.cd = m.k === 'torre' ? 1.4 : 2.4;
    const bt = S.battles.find(b => b.a === A.id || b.b === A.id), rng = new RNG(Math.floor(Math.random() * 1e9));
    const ex = G.actors.find(a => a.armyId === A.id && !a.dead);
    const sd = War.makeSoldier('jogador', Reino.kind(A, rng), m.peca.x * 16 + 8, m.peca.y * 16 + 8, rng);
    sd.ctrl = 'battle'; sd.battleId = bt ? bt.id : null; sd.armyId = A.id; sd.repr = ex ? ex.repr : 2; sd.aggro = 300; sd.naMuralha = s.id; sd.z = MURO_H - 2;
    if (A.forte) { sd.maxHp = sd.hp = Math.round(sd.maxHp * A.forte); }
    G.actors.push(sd);
    G.particle(sd.x, sd.y - MURO_H, 0, -30, '#ffe080', 0.4);
  },
  // pular do adarve para dentro da cidade
  pula(a, s) {
    const g = Muralhas.geo(s), tx = Math.floor(a.x / 16), ty = Math.floor(a.y / 16), C = Cerco.atual();
    const mx = s.x0 + s.w / 2, my = s.y0 + s.h / 2;
    const ix = Math.sign(mx - tx) * (Math.abs(mx - tx) > Math.abs(my - ty) ? 1 : 0), iy = Math.sign(my - ty) * (Math.abs(my - ty) >= Math.abs(mx - tx) ? 1 : 0);
    for (let k = 1; k < 5; k++) {
      const x = tx + ix * k, y = ty + iy * k;
      if (Game.world.solidAt(x, y) || this.walk.has(tkey(x, y))) continue;
      a.naMuralha = null; a.x = x * 16 + 8; a.y = y * 16 + 8; a.caindo = 0.45; a.limpoT = 0;
      if (a.home) a.home = { x: a.x, y: a.y };
      if (C && C.dentroT === undefined && !C.aberto) C.dentroT = 6;
      return true;
    }
    void g; return false;
  },
  // ---------- o jogador sobe pela torre (ou escada) e pula para dentro ----------
  findInteract(fx, fy) {
    const C = Cerco.atual(); if (!C || C.fase !== 'assalto') return null;
    const P = Game.player, s = Cerco.cidade(); if (!s) return null;
    if (P.naMuralha) return { kind: 'mar', fn: () => this.pularJogador(), label: 'Pular', name: 'para dentro da cidade', d: 5, prio: true };
    for (const m of C.maq || []) {
      if ((m.k !== 'torre' && m.k !== 'escada') || m.fase !== 'pronta') continue;
      if (dist(fx, fy, m.x, m.y) < 40) return { kind: 'mar', fn: () => this.subirJogador(m), label: 'Subir', name: m.k === 'torre' ? 'pela torre de cerco' : 'pela escada', d: 6, prio: true };
    }
    return null;
  },
  subirJogador(m) {
    const P = Game.player; P.mounted = false;
    P.x = m.peca.x * 16 + 8; P.y = m.peca.y * 16 + 8; P.naMuralha = Cerco.atual().cid; P.z = MURO_H - 2;
    Game.toast('Você está no alto da muralha! Lute contra os defensores e pule para dentro da cidade.', '#ffe080'); Sfx.play('door');
  },
  pularJogador() { const s = Cerco.cidade(), P = Game.player; if (s && this.pula(P, s)) { P.naMuralha = null; Game.toast('Você pulou para dentro da cidade!', '#ffe080'); } },
  limpar() {
    const G = Game; this.walk = null; this.tiros = []; this.fx = [];
    for (const a of G.actors) if (a.naMuralha) { a.naMuralha = null; a.z = 0; }
    const P = G.player; if (P && P.naMuralha) { P.naMuralha = null; P.z = 0; const s = G.world.settlements.find(x => x.id === this.cid); if (s) { P.x = s.mid.x * 16 + 8; P.y = s.mid.y * 16 + 8; G.findFree(P); } }
    G.flow = null;
  },
  // ---------- desenho ----------
  entulho() {
    if (this._ent) return this._ent;
    const c = Sprites.cv(24, 26), p = Sprites.P(c.getContext('2d')), r = new RNG(7);
    // o toco quebrado da muralha (pontas irregulares) e as pedras caídas em volta
    for (let x = 3; x < 21; x++) { const h = 4 + Math.round(Math.abs(Math.sin(x * 1.7)) * 5); p(x, 18 - h, x % 3 ? '#7a746a' : '#8a8478', 1, h); p(x, 18 - h, '#9a9488'); }
    p(3, 17, '#4a443c', 18, 2);
    for (let i = 0; i < 26; i++) { const x = r.int(0, 21), y = r.int(14, 23), w = r.int(2, 4); p(x, y, r.pick(['#8a8478', '#6a645a', '#a8a296', '#5a544a']), w, w - 1); }
    Sprites.outline(c, '#2a2620'); return (this._ent = c);
  },
  drawables(D, camX, camY, vw, vh) {
    const C = Cerco.atual(); if (!C || C.fase !== 'assalto') return;
    const G = Game, s = Cerco.cidade(); if (!s) return;
    // quem está no adarve é desenhado por cima da muralha
    for (const e of D) if (e.a && e.a.naMuralha) e.y = Math.floor(e.a.y / 16) * 16 + 15.95;
    // entulho das brechas
    for (const k of C.brechas || []) { const [x, y] = k.split(',').map(Number), im = this.entulho(); D.push({ y: y * 16 + 15.2, img: im, x: x * 16 - 4, yy: y * 16 - 6 }); }
    // portão arrombado
    if (C.portaoQuebrado) D.push({ y: C.porta.y + 9, fn: (ctx) => { const x = C.porta.x - camX, y = C.porta.y - camY; ctx.fillStyle = '#5a3418'; ctx.fillRect(x - 14, y + 2, 9, 3); ctx.fillRect(x + 5, y - 1, 8, 3); ctx.fillStyle = '#3a3a42'; ctx.fillRect(x - 4, y + 4, 10, 2); } });
    // as máquinas
    for (const m of C.maq || []) {
      let f = 0; if (m.anim > 0 && (m.k === 'trabuco' || m.k === 'catapulta')) f = 1;
      const img = Cerco.sprite(m.k, f); let ox = 0;
      if (m.k === 'ariete' && m.anim > 0) ox = Math.round(Math.sin((0.35 - m.anim) / 0.35 * Math.PI) * 6) * (C.nrm[0] ? -C.nrm[0] : 1);
      if (m.fase === 'vai') ox += Math.round(Math.sin(m.f * 8)) ;
      const flip = m.k === 'ariete' && (C.nrm[0] > 0);
      D.push({ y: m.y, fn: (ctx) => { const x = Math.round(m.x - img.width / 2 - camX + ox), y = Math.round(m.y - img.height - camY); if (flip) { ctx.save(); ctx.translate(x + img.width, y); ctx.scale(-1, 1); ctx.drawImage(img, 0, 0); ctx.restore(); } else ctx.drawImage(img, x, y); } });
    }
    // fumaça e fogo dos incêndios, poeira das pedras
    for (const f of this.fx) {
      D.push({ y: f.y + 2, fn: (ctx) => {
        const x = f.x - camX, y = f.y - camY, k = f.t / f.dur;
        if (f.k === 'incendio') { for (let i = 0; i < 5; i++) { const fl = Math.sin(G.t * 12 + i * 2) * 2; ctx.fillStyle = i % 2 ? '#ffb020' : '#ff6010'; ctx.fillRect(Math.round(x - 8 + i * 4), Math.round(y - 6 - (i % 3) * 3 + fl), 3, 6 + (i % 2) * 3); } ctx.fillStyle = `rgba(60,50,50,${0.4 * (1 - k)})`; ctx.beginPath(); ctx.arc(x + 2, y - 18 - k * 20, 8 + k * 10, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.fillStyle = `rgba(170,160,140,${0.6 * (1 - k)})`; ctx.beginPath(); ctx.arc(x, y - 8 - k * 10, (f.grande ? 18 : 9) + k * 14, 0, Math.PI * 2); ctx.fill(); }
      } });
    }
    // projéteis em arco (com sombra no chão)
    for (const t of this.tiros) {
      const k = t.t / t.dur, x = t.x0 + (t.x1 - t.x0) * k, yb = t.y0 + (t.y1 - t.y0) * k, y = yb - (t.h || 0) * 4 * k * (1 - k);
      D.push({ y: 1e9, fn: (ctx) => {
        if (t.h) { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(Math.round(x - 3 - camX), Math.round(yb + 6 - camY), 7, 2); }
        if (t.k === 'pedra') { ctx.fillStyle = '#2a2620'; ctx.fillRect(Math.round(x - 4 - camX), Math.round(y - 4 - camY), 8, 8); ctx.fillStyle = '#8a8478'; ctx.fillRect(Math.round(x - 3 - camX), Math.round(y - 3 - camY), 6, 6); ctx.fillStyle = '#b0aa9e'; ctx.fillRect(Math.round(x - 3 - camX), Math.round(y - 3 - camY), 3, 2); }
        else if (t.k === 'fogo') { ctx.fillStyle = '#ff7010'; ctx.fillRect(Math.round(x - 3 - camX), Math.round(y - 3 - camY), 6, 6); ctx.fillStyle = '#ffe060'; ctx.fillRect(Math.round(x - 1 - camX), Math.round(y - 2 - camY), 3, 3); if (Math.random() < 0.6) G.particle(x, y, 0, 10, '#ff9030', 0.3); }
        else { const a = Math.atan2(t.y1 - t.y0, t.x1 - t.x0); ctx.strokeStyle = '#6a4a24'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - camX, y - camY); ctx.lineTo(x - Math.cos(a) * 12 - camX, y - Math.sin(a) * 12 - camY); ctx.stroke(); ctx.fillStyle = '#c0c0c8'; ctx.fillRect(Math.round(x - camX) - 1, Math.round(y - camY) - 1, 3, 3); }
      } });
    }
    // escadas encostadas: o desenho da escada sobe até o alto da muralha
    for (const m of C.maq || []) if (m.k === 'escada' && m.fase === 'pronta') { const px = m.peca.x * 16 + 8, py = m.peca.y * 16 + 8; D.push({ y: py + 15.9, fn: (ctx) => { ctx.fillStyle = '#7a4a24'; const x0 = Math.round(px - 5 - camX), x1 = Math.round(px + 4 - camX), yt = Math.round(py - MURO_H - 2 - camY), yb = Math.round(m.y - camY); ctx.fillRect(x0, yt, 2, yb - yt); ctx.fillRect(x1, yt, 2, yb - yt); ctx.fillStyle = '#9a6436'; for (let y = yt + 2; y < yb; y += 4) ctx.fillRect(x0, y, x1 - x0 + 2, 1); } }); }
  }
};

// ---------------- ganchos ----------------
(function () {
  // o botão "Assaltar a muralha" agora começa o assalto ao vivo
  Cerco._assaltar0 = Cerco.assaltar;
  Cerco.assaltar = function () {
    const G = Game, C = this.atual(), s = this.cidade(); if (!C || !s) return;
    if (C.fase === 'assalto') return G.toast('O assalto já começou!', '#ffd080');
    if (!this.pronto()) return G.toast('O assalto só pode começar ao amanhecer de amanhã.', '#ffd080');
    if (!this.podeAssaltar()) return G.toast('Sem aríete, escadas, torre de cerco ou trabuco não há como passar pela muralha!', '#ff8080');
    Assalto.comecar();
  };
  const pa0 = Cerco.podeAssaltar; Cerco.podeAssaltar = function () { const C = this.atual(); return pa0.call(this) || !!(C && C.armas.trabuco); };
  // as máquinas do assalto substituem as máquinas paradas no acampamento
  const cd0 = Cerco.drawables; Cerco.drawables = function (D, camX, camY) { if (Assalto.ativo()) return; return cd0.call(this, D, camX, camY); };
  const ct0 = Cerco.tick; Cerco.tick = function () { ct0.call(this); };
  const md0 = Muralhas.drawables;
  Muralhas.drawables = function (D, camX, camY, vw, vh) {
    const C = Cerco.atual(), br = C && C.fase === 'assalto' && C.brechas && C.brechas.length ? new Set(C.brechas) : null;
    const s = C && C.fase === 'assalto' ? Cerco.cidade() : null, ronda = s && s._ronda;
    if (s) s._ronda = { key: Muralhas.geo(s).key, l: [] };   // os guardas "de enfeite" saem: no assalto estão os de verdade
    const n0 = D.length;
    md0.call(this, D, camX, camY, vw, vh);
    if (s) s._ronda = ronda;
    if (br) for (let i = D.length - 1; i >= n0; i--) { const e = D[i]; if (e.img && e.x !== undefined && br.has(tkey(Math.floor((e.x + 4) / 16), Math.floor((e.y - 15) / 16)))) D.splice(i, 1); }
    Assalto.drawables(D, camX, camY, vw, vh);
  };
  const mt0 = Muralhas.tick; Muralhas.tick = function (dt) { mt0.call(this, dt); try { Assalto.tick(dt); } catch (e) { console.error('assalto', e); } };
  const fi0 = Muralhas.findInteract; Muralhas.findInteract = function (fx, fy) { return Assalto.findInteract(fx, fy) || fi0.call(this, fx, fy); };
  // brechas na muralha deixam passar
  const WP = World.prototype, solid0 = WP.solidAt;
  WP.solidAt = function (tx, ty) { const C = Game.player && Game.player.reino && Game.player.reino.cerco; if (C && C.brechas && C.brechas.length && C.brechas.includes(tkey(tx, ty))) return false; return solid0.call(this, tx, ty); };
  // no alto da muralha só se anda pelo adarve
  const mv0 = moveActor;
  moveActor = function (a, dx, dy) {
    if (!a.naMuralha || !Assalto.walk) return mv0(a, dx, dy);
    const nx = a.x + dx, ny = a.y + dy;
    if (Assalto.walk.has(tkey(Math.floor(nx / 16), Math.floor(ny / 16)))) { a.x = nx; a.y = ny; a.blocked = false; }
    else if (Assalto.walk.has(tkey(Math.floor(nx / 16), Math.floor(a.y / 16)))) { a.x = nx; a.blocked = true; }
    else if (Assalto.walk.has(tkey(Math.floor(a.x / 16), Math.floor(ny / 16)))) { a.y = ny; a.blocked = true; }
    else a.blocked = true;
  };
})();
