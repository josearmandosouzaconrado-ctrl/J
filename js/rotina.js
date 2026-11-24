'use strict';
// =====================================================================
//  ROTINA — cada morador tem uma vida
//  Todo morador das cidades e vilas ganha uma casa, uma profissão e um dia:
//  acorda e sai de casa, vai a pé pelas ruas até o trabalho (ferraria,
//  armazém, taverna, templo, estábulo, barraca do mercado, lavoura...),
//  almoça na taverna ou em casa, volta ao trabalho, faz compras no fim da
//  tarde, passa na taverna à noite e dorme em casa. Quem está dentro de
//  um prédio some da rua e aparece de novo na porta quando sai.
//  O caminho é achado de verdade pelas ruas (busca em largura nos tiles
//  da cidade), então ninguém atravessa parede.
// =====================================================================
const ROT_PROF = {
  smith: { nome: 'ferreiro', nomeF: 'ferreira', fora: true, ic: '🔨' },
  general: { nome: 'vendedor', nomeF: 'vendedora', ic: '📦' },
  inn: { nome: 'taberneiro', nomeF: 'taberneira', ic: '🍺' },
  temple: { nome: 'sacerdote', nomeF: 'sacerdotisa', ic: '🙏' },
  stable: { nome: 'cavalariço', nomeF: 'cavalariça', fora: true, ic: '🐴' },
  alchemist: { nome: 'aprendiz de alquimia', nomeF: 'aprendiz de alquimia', ic: '⚗' },
  magic: { nome: 'escriba', nomeF: 'escriba', ic: '📜' },
  guild: { nome: 'mensageiro da guilda', nomeF: 'mensageira da guilda', ic: '✉' },
  ruler: { nome: 'criado do castelo', nomeF: 'criada do castelo', ic: '👑' },
  mercado: { nome: 'feirante', nomeF: 'feirante', fora: true, ic: '🧺' },
  campo: { nome: 'lavrador', nomeF: 'lavradora', fora: true, ic: '🌾' },
  pasto: { nome: 'vaqueiro', nomeF: 'vaqueira', fora: true, ic: '🐄' }
};
const ROT_ATIV = {
  casa: { txt: 'em casa', ic: '🏠' }, dormir: { txt: 'dormindo', ic: '💤' }, trabalho: { txt: 'trabalhando', ic: '' },
  almoco: { txt: 'almoçando', ic: '🍲' }, compras: { txt: 'fazendo compras', ic: '🛒' }, taverna: { txt: 'na taverna', ic: '🍺' },
  passeio: { txt: 'passeando', ic: '' }, templo: { txt: 'rezando no templo', ic: '🙏' }
};
const Rotina = {
  tT: 0,
  hora() { return (Game.time / 60) % 24; },
  // ---------- montar a vida de um morador ----------
  preparar(a) {
    const s = a.s; if (!s || !s.buildings || a.rot !== undefined) return;
    if (a.role !== 'citizen' && a.role !== 'merchant') { a.rot = null; return; }
    const r = new RNG(a.seed || 1), B = s.buildings.filter(b => b.door && !b.decorative);
    const casas = B.filter(b => b.role === 'house');
    const casa = casas.length ? casas[r.int(0, casas.length - 1)] : null;
    let job;
    if (a.role === 'merchant') job = { k: 'mercado', x: Math.round(a.home.x / 16), y: Math.round(a.home.y / 16) };
    else {
      const trab = B.filter(b => ROT_PROF[b.role] && b.role !== 'mercado');
      const x = r.next();
      if (s.fazenda) job = x < 0.35 && s.pasto ? { k: 'pasto', x: Math.round((s.pasto.x0 + s.pasto.x1) / 32), y: Math.round((s.pasto.y0 + s.pasto.y1) / 32) } : { k: 'campo', ...this.campo(s, r) };
      else if (s.type === 'village' && x < 0.45) job = { k: 'campo', ...this.campo(s, r) };
      else if (trab.length && x < 0.85) { const b = trab[r.int(0, trab.length - 1)]; job = { k: b.role, b, x: b.door.x, y: b.door.y + 1 }; }
      else job = { k: 'mercado', x: s.mid.x + r.int(-3, 3), y: s.mid.y + r.int(-2, 2) };
    }
    a.rot = {
      casa, job, ativ: null, dentro: false, alvo: null, cam: null, ci: 0, preso: 0,
      acorda: 5.5 + r.next() * 1.5, entra: 7 + r.next(), sai: 16.5 + r.next() * 1.5, dorme: 21 + r.next() * 1.8,
      gostaTaverna: r.next(), gostaTemplo: r.next(), compraDia: r.int(0, 6), fim: 0
    };
    if (a.role === 'citizen') a.sleeper = false;
  },
  // um pedaço de lavoura perto da vila (os tiles de plantação ficam nas bordas)
  campo(s, r) {
    const W = Game.world;
    for (let i = 0; i < 40; i++) {
      const x = s.x0 + r.int(1, s.w - 2), y = s.y0 + r.int(1, s.h - 2);
      if (W.tileAt(x, y) === T.FARM && !Game.level.solidAt(x, y)) return { x, y };
    }
    return { x: s.mid.x + r.int(-6, 6), y: s.mid.y + r.int(-6, 6) };
  },
  ponto(b) { return b && b.door ? { x: b.door.x, y: b.door.y + 1 } : null; },
  // ---------- o que o morador quer fazer agora ----------
  desejo(a) {
    const R = a.rot, h = this.hora(), s = a.s, dia = Game.day || 1;
    const casa = this.ponto(R.casa);
    const taverna = s.buildings.find(b => b.role === 'inn' && b.door), templo = s.buildings.find(b => b.role === 'temple' && b.door), loja = s.buildings.find(b => b.role === 'general' && b.door);
    if (h < R.acorda || h >= R.dorme + 0.6) return { ativ: 'dormir', p: casa, entra: true };
    if (h < R.entra) return { ativ: 'casa', p: casa, entra: true };
    if (h >= 12 && h < 13) return R.gostaTaverna > 0.5 && taverna ? { ativ: 'almoco', p: this.ponto(taverna), entra: true } : { ativ: 'almoco', p: casa, entra: true };
    if (h < R.sai) {
      const J = R.job, P = ROT_PROF[J.k] || {};
      return { ativ: 'trabalho', p: { x: J.x, y: J.y }, entra: !P.fora && !!J.b, roda: P.fora ? (J.k === 'campo' ? 3 : J.k === 'pasto' ? 5 : 1.5) : 0 };
    }
    if (h < R.sai + 1.4) {
      if (R.gostaTemplo > 0.8 && templo && dia % 7 === 0) return { ativ: 'templo', p: this.ponto(templo), entra: true };
      if ((dia + R.compraDia) % 3 === 0 && loja) return { ativ: 'compras', p: this.ponto(loja), entra: true };
      return { ativ: 'passeio', p: { x: s.mid.x, y: s.mid.y }, roda: 5 };
    }
    if (h < R.dorme) return R.gostaTaverna > 0.35 && taverna ? { ativ: 'taverna', p: this.ponto(taverna), entra: true } : { ativ: 'casa', p: casa, entra: true };
    return { ativ: 'dormir', p: casa, entra: true };
  },
  // ---------- caminho pelas ruas (busca em largura dentro da cidade) ----------
  caminho(a, tx, ty) {
    const s = a.s, L = Game.level, m = 3, x0 = s.x0 - m, y0 = s.y0 - m, w = s.w + m * 2, h = s.h + m * 2;
    const sx = Math.floor(a.x / 16) - x0, sy = Math.floor(a.y / 16) - y0, gx = tx - x0, gy = ty - y0;
    if (sx < 0 || sy < 0 || sx >= w || sy >= h || gx < 0 || gy < 0 || gx >= w || gy >= h) return null;
    const prev = new Int32Array(w * h).fill(-1), Q = new Int32Array(w * h);
    let qh = 0, qt = 0; const ini = sy * w + sx, fim = gy * w + gx;
    prev[ini] = ini; Q[qt++] = ini;
    const livre = (x, y) => !L.solidAt(x + x0, y + y0);
    let achou = -1, melhor = ini, bd = 1e9;
    while (qh < qt) {
      const i = Q[qh++], x = i % w, y = (i / w) | 0;
      const d = Math.abs(x - gx) + Math.abs(y - gy); if (d < bd) { bd = d; melhor = i; }
      if (i === fim) { achou = i; break; }
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const j = ny * w + nx; if (prev[j] >= 0 || (!livre(nx, ny) && j !== fim)) continue;
        prev[j] = i; Q[qt++] = j;
      }
    }
    let k = achou >= 0 ? achou : melhor; const pts = [];
    while (k !== ini) { pts.push({ x: (k % w + x0) * 16 + 8, y: ((k / w | 0) + y0) * 16 + 10 }); k = prev[k]; }
    pts.reverse();
    // tira os pontos do meio das retas (o andar fica mais natural)
    return pts.filter((p, i) => i === pts.length - 1 || i % 2 === 1);
  },
  // ---------- relógio da cidade: decide e troca as atividades ----------
  tick(dt) {
    const G = Game, W = G.world;
    if (!W || G.level !== W || !G.player) return;
    this.tT -= dt; if (this.tT > 0) return; this.tT = 0.5;
    let cota = 6;   // no máximo 6 caminhos novos por vez (sem travar)
    for (const s of W.settlements.concat(W.fazendas || [])) {
      if (!s.active || !s.npcs || s.playerVila) continue;
      for (const a of s.npcs) {
        if (!(a instanceof NPC) || a.dead) continue;
        if (a.rot === undefined) this.preparar(a);
        const R = a.rot; if (!R || a.isFollower || a.visiting || a.vilaNPC) continue;
        const D = this.desejo(a);
        if (!D.p) continue;
        if (R.ativ !== D.ativ || !R.alvo || R.alvo.x !== D.p.x || R.alvo.y !== D.p.y) {
          if (cota <= 0) continue; cota--;
          R.ativ = D.ativ; R.alvo = { x: D.p.x, y: D.p.y }; R.entrar = !!D.entra; R.roda = D.roda || 0;
          if (R.dentro) { R.dentro = false; a.x = R.porta ? R.porta.x : a.x; a.y = R.porta ? R.porta.y : a.y; }
          R.cam = this.caminho(a, D.p.x, D.p.y); R.ci = 0; R.preso = 0; R.chegou = false;
          if (!R.cam) { a.x = D.p.x * 16 + 8; a.y = D.p.y * 16 + 10; R.cam = []; }
        }
      }
    }
  },
  // ---------- andar ----------
  mover(a, dt) {
    const R = a.rot;
    a.moving = false;
    if (R.dentro) return;
    if (R.cam && R.ci < R.cam.length) {
      const p = R.cam[R.ci], d = dist(a.x, a.y, p.x, p.y);
      if (d < 3) { R.ci++; return; }
      const ang = angleTo(a.x, a.y, p.x, p.y), v = a.spd * (Game.isNight() ? 1 : 1.15);
      const ox = a.x, oy = a.y;
      moveActor(a, Math.cos(ang) * v * dt, Math.sin(ang) * v * dt);
      a.moving = true; a.anim += dt; a.setDir(ang);
      if (dist(ox, oy, a.x, a.y) < v * dt * 0.2) { R.preso += dt; if (R.preso > 1.2) { a.x = p.x; a.y = p.y; R.ci++; R.preso = 0; } }
      return;
    }
    if (!R.alvo) return;
    // chegou: entra no prédio ou fica trabalhando por perto
    if (!R.chegou) { R.chegou = true; R.porta = { x: a.x, y: a.y }; if (R.entrar) { R.dentro = true; a.wp = null; return; } }
    if (R.roda) {
      a.wT = (a.wT || 0) - dt;
      if (a.wT <= 0) { a.wT = 2 + Math.random() * 4; const ang = Math.random() * 6.28, rr = Math.random() * R.roda * 16; a.wp = { x: R.alvo.x * 16 + 8 + Math.cos(ang) * rr, y: R.alvo.y * 16 + 10 + Math.sin(ang) * rr, t: 4 }; }
      if (a.wp) {
        a.wp.t -= dt;
        if (dist(a.x, a.y, a.wp.x, a.wp.y) < 3 || a.wp.t <= 0) a.wp = null;
        else { const ang = angleTo(a.x, a.y, a.wp.x, a.wp.y); moveActor(a, Math.cos(ang) * a.spd * 0.6 * dt, Math.sin(ang) * a.spd * 0.6 * dt); if (a.blocked) a.wp = null; a.moving = true; a.anim += dt; a.setDir(ang); }
      } else if (R.ativ === 'trabalho' && (R.job.k === 'smith' || R.job.k === 'campo') && Math.random() < dt * 0.8) a.trabalhoFx = 0.25;
    }
  },
  // ---------- o que o morador conta sobre o próprio dia ----------
  profissao(a) { const R = a.rot; if (!R) return null; const P = ROT_PROF[R.job.k]; return P ? (a.sex === 'f' ? P.nomeF : P.nome) : null; },
  onde(a) {
    const R = a.rot; if (!R || !R.ativ) return '';
    const A = ROT_ATIV[R.ativ], indo = R.cam && R.ci < R.cam.length;
    const lugar = R.ativ === 'trabalho' ? (R.job.b ? R.job.b.name : R.job.k === 'campo' ? 'a lavoura' : R.job.k === 'pasto' ? 'o pasto cuidar das vacas' : 'a feira') : R.ativ === 'taverna' || (R.ativ === 'almoco' && R.alvo && R.casa && R.alvo.y !== R.casa.door.y + 1) ? 'a taverna' : R.ativ === 'compras' ? 'o armazém' : R.ativ === 'templo' ? 'o templo' : R.ativ === 'passeio' ? 'a praça' : 'casa';
    return indo ? `Estou indo para ${lugar}.` : `Estou ${A.txt}.`;
  },
  fala(a) {
    const R = a.rot; if (!R || a.role !== 'citizen') return null;
    const p = this.profissao(a), h = this.hora();
    const dia = h < 11 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    return `${dia}! Sou ${p}. ${this.onde(a)}`;
  },
  agenda(a) {
    const R = a.rot; if (!R) return '';
    const hh = x => { const t = Math.round(x * 6) * 10, h = Math.floor(t / 60) % 24, m = t % 60; return `${h}h${m ? String(m).padStart(2, '0') : ''}`; };
    const trab = R.job.b ? R.job.b.name : R.job.k === 'campo' ? 'na lavoura' : R.job.k === 'pasto' ? 'no pasto, com as vacas' : 'na feira da praça';
    return `Acordo lá pelas ${hh(R.acorda)}, às ${hh(R.entra)} já estou no trabalho (${esc(trab)}). Ao meio-dia ${R.gostaTaverna > 0.5 ? 'almoço na taverna' : 'almoço em casa'}. Largo às ${hh(R.sai)}, ${R.compraDia % 3 === 0 ? 'passo no armazém de vez em quando, ' : ''}${R.gostaTaverna > 0.35 ? 'e de noite tomo uma na taverna' : 'e de noite fico em casa com a família'}. Durmo lá pelas ${hh(R.dorme)}.`;
  },
  // ---------- ícone da atividade em cima de quem está perto ----------
  drawables(D, camX, camY, vw, vh) {
    const G = Game, P = G.player; if (!P || G.level !== G.world) return;
    for (const s of G.world.settlements.concat(G.world.fazendas || [])) {
      if (!s.active || !s.npcs) continue;
      for (const a of s.npcs) {
        const R = a.rot; if (!R || R.dentro || !R.ativ || dist(a.x, a.y, P.x, P.y) > 150) continue;
        const ic = R.ativ === 'trabalho' ? (ROT_PROF[R.job.k] || {}).ic : ROT_ATIV[R.ativ].ic;
        if (!ic) continue;
        const fx = a.trabalhoFx > 0;
        D.push({ y: a.y + 0.6, fn: (ctx, cx, cy) => {
          ctx.globalAlpha = 0.85; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(ic, Math.round(a.x - cx), Math.round(a.y - cy - (a.h || 28) - 4 - (fx ? 2 : 0)));
          ctx.globalAlpha = 1; ctx.textAlign = 'left';
        } });
        if (a.trabalhoFx > 0) a.trabalhoFx -= 1 / 60;
      }
    }
  }
};
// ---------- ganchos ----------
(function () {
  const u0 = NPC.prototype.update;
  NPC.prototype.update = function (dt) {
    if (!this.rot || this.talkT > 0 || this.chatT > 0 || this.visiting || this.isFollower || Game.level !== Game.world) return u0.call(this, dt);
    if (this.chatCd > 0) this.chatCd -= dt;
    Rotina.mover(this, dt);
  };
  const hid = Object.getOwnPropertyDescriptor(NPC.prototype, 'hidden');
  Object.defineProperty(NPC.prototype, 'hidden', { configurable: true, get() { if (this.rot) return !!this.rot.dentro && Game.level === Game.world; return hid.get.call(this); } });
  const t0 = Inverno.tick.bind(Inverno);
  Inverno.tick = function (dt) { t0(dt); try { Rotina.tick(dt); } catch (e) { if (!Rotina._err) { Rotina._err = 1; console.warn('Rotina', e); } } };
  const d0 = Inverno.drawables.bind(Inverno);
  Inverno.drawables = function (D, camX, camY, vw, vh) { d0(D, camX, camY, vw, vh); try { Rotina.drawables(D, camX, camY, vw, vh); } catch (e) { } };
})();
