'use strict';
// ===================== ENTIDADES, IA E COMBATE =====================
const HOSTILE = { enemy: { player: 1, ally: 1 }, ally: { enemy: 1 }, player: { enemy: 1, law: 1 }, npc: {}, law: { player: 1 } };
function isHostile(a, b) { if (b && b.remote) return !!(a === Game.player || a.team === 'ally' || a.team === 'player' || a.faction === 'jogador') && Rede.emGuerra(b.id); if (a && a.remote) return false; if (a.faction || b.faction) return War.hostile(a, b); const h = HOSTILE[a.team]; return !!(h && h[b.team]); }
const BOSS_L0 = { bandido_chefe: 3, rei_goblin: 4, troll_rei: 6, cavaleiro_morto: 6, necromante: 8, yeti: 12, senhor_chamas: 14, hidra: 12, farao: 14, rainha_aranha: 8, guardiao_golem: 13, campeao_orc: 17, rei_draugr: 16, lich: 24, vorthax: 30, dragao: 7, dragao_gelo: 9 };

function collides(L, x, y, r) {
  const x0 = Math.floor((x - r) / 16), x1 = Math.floor((x + r) / 16);
  const y0 = Math.floor((y - r * 0.55) / 16), y1 = Math.floor((y + r * 0.35) / 16);
  for (let ty = y0; ty <= y1; ty++) for (let tx = x0; tx <= x1; tx++) if (L.solidAt(tx, ty)) return true;
  return false;
}
function moveActor(a, dx, dy) {
  const L = Game.level;
  a.blocked = false;
  if (a.fly || collides(L, a.x, a.y, a.r)) { a.x += dx; a.y += dy; return; }
  const n = Math.max(1, Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) / 4));
  const sx = dx / n, sy = dy / n;
  for (let i = 0; i < n; i++) {
    if (sx) {
      if (!collides(L, a.x + sx, a.y, a.r)) a.x += sx;
      else {
        a.blocked = true;
        // desliza em quinas
        if (Math.abs(sy) < Math.abs(sx) * 0.5) {
          for (const o of [3, -3, 6, -6]) if (!collides(L, a.x + sx, a.y + o, a.r) && !collides(L, a.x, a.y + Math.sign(o), a.r)) { a.y += Math.sign(o) * Math.min(Math.abs(sx), 1); break; }
        }
      }
    }
    if (sy) {
      if (!collides(L, a.x, a.y + sy, a.r)) a.y += sy;
      else {
        a.blocked = true;
        if (Math.abs(sx) < Math.abs(sy) * 0.5) {
          for (const o of [3, -3, 6, -6]) if (!collides(L, a.x + o, a.y + sy, a.r) && !collides(L, a.x + Math.sign(o), a.y, a.r)) { a.x += Math.sign(o) * Math.min(Math.abs(sy), 1); break; }
        }
      }
    }
  }
}

// ---------- Fonte bitmap 3x5 para números ----------
const FONT35 = {
  '0': '111101101101111', '1': '010110010010111', '2': '111001111100111', '3': '111001111001111', '4': '101101111001001', '5': '111100111001111',
  '6': '111100111101111', '7': '111001010010010', '8': '111101111101111', '9': '111101111001111', '+': '000010111010000', '-': '000000111000000',
  '!': '010010010000010', 'x': '000101010101000', ' ': '000000000000000',
  'A': '010101111101101', 'B': '110101110101110', 'C': '011100100100011', 'D': '110101101101110', 'E': '111100110100111', 'F': '111100110100100', 'G': '011100101101011', 'H': '101101111101101', 'I': '111010010010111', 'J': '001001001101010', 'K': '101101110101101', 'L': '100100100100111', 'M': '101111111101101', 'N': '110101101101101', 'O': '010101101101010', 'P': '110101110100100', 'Q': '010101101110011', 'R': '110101110101101', 'S': '011100010001110', 'T': '111010010010010', 'U': '101101101101111', 'V': '101101101101010', 'W': '101101111111101', 'X': '101101010101101', 'Y': '101101010010010', 'Z': '111001010100111', '/': '001001010100100', '(': '010100100100010', ')': '010001001001010', '.': '000000000000010', ',': '000000000010100', '?': '110001010000010', ':': '000010000010000'
};
function drawNum(ctx, text, x, y, color, s = 1) {
  const w = text.length * 4 * s;
  x = Math.round(x - w / 2); y = Math.round(y);
  for (let pass = 0; pass < 2; pass++) {
    ctx.fillStyle = pass ? color : '#10080c';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i], g = FONT35[ch] || FONT35[ch.normalize('NFD')[0].toUpperCase()]; if (!g) continue;
      for (let k = 0; k < 15; k++) if (g[k] === '1') {
        const px = x + i * 4 * s + (k % 3) * s, py = y + Math.floor(k / 3) * s;
        if (pass) ctx.fillRect(px, py, s, s);
        else { ctx.fillRect(px - 1, py, s + 2, s); ctx.fillRect(px, py - 1, s, s + 2); }
      }
    }
  }
}

// ---------- Ator base ----------
let _actorId = 1;
class Actor {
  constructor(x, y) {
    this.x = x; this.y = y; this.r = 5; this.dir = 'down'; this.face = Math.PI / 2; this.lastH = 'right';
    this.anim = 0; this.moving = false; this.hp = 10; this.maxHp = 10; this.team = 'enemy'; this.dead = false;
    this.flash = 0; this.fx = []; this.kbx = 0; this.kby = 0; this.stun = 0; this.root = 0; this.slowT = 0; this.slowV = 1;
    this.fly = false; this.alpha = 1; this.z = 0; this.id = _actorId++; this.blocked = false;
  }
  setDir(a) {
    this.face = a;
    const c = Math.cos(a), s = Math.sin(a);
    if (Math.abs(c) > Math.abs(s) * 0.85) this.dir = c > 0 ? 'right' : 'left'; else this.dir = s > 0 ? 'down' : 'up';
    if (Math.abs(c) > 0.2) this.lastH = c > 0 ? 'right' : 'left';
  }
  get speedFactor() {
    let f = 1;
    if (this.slowT > 0) f *= this.slowV;
    if (this.root > 0 || this.stun > 0) f = 0;
    if (Game.slowTime > 0 && this.team === 'enemy') f *= 0.45;
    return f;
  }
  addFx(k, t, v) {
    const e = this.fx.find(e => e.k === k);
    if (e) { e.t = Math.max(e.t, t); e.v = Math.max(e.v, v); } else this.fx.push({ k, t, v, acc: 0 });
  }
  updateStatus(dt) {
    if (this.kbx || this.kby) {
      moveActor(this, this.kbx * dt, this.kby * dt);
      const d = Math.min(1, dt * 9); this.kbx -= this.kbx * d; this.kby -= this.kby * d;
      if (Math.abs(this.kbx) < 4 && Math.abs(this.kby) < 4) { this.kbx = 0; this.kby = 0; }
    }
    if (this.flash > 0) this.flash -= dt;
    if (this.stun > 0) this.stun -= dt;
    if (this.root > 0) this.root -= dt;
    if (this.slowT > 0) { this.slowT -= dt; if (this.slowT <= 0) this.slowV = 1; }
    for (let i = this.fx.length - 1; i >= 0; i--) {
      const e = this.fx[i];
      e.t -= dt; e.acc += dt;
      if ((e.k === 'burn' || e.k === 'poison' || e.k === 'bleed') && e.acc >= 0.5) {
        e.acc -= 0.5;
        Combat.damage(this, e.v * 0.5, { elem: e.k === 'burn' ? 'fire' : e.k === 'poison' ? 'poison' : 'phys', dot: true });
        if (e.k === 'burn') Game.burst(this.x, this.y - 8, '#ff8020', 2);
        if (e.k === 'poison') Game.burst(this.x, this.y - 8, '#80e040', 2);
      }
      if (e.t <= 0) this.fx.splice(i, 1);
    }
  }
  hasFx(k) { return this.fx.some(e => e.k === k); }
  drawShadow(ctx, camX, camY, w) {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    const sw = w || this.r * 2 + 4;
    const x = Math.round(this.x - camX), y = Math.round(this.y - camY);
    ctx.fillRect(x - sw / 2 + 1, y - 1, sw - 2, 3); ctx.fillRect(x - sw / 2, y, sw, 1);
  }
  frameIndex() { return this.moving ? 1 + (Math.floor(this.anim * 7) % 2) : 0; }
  drawBody(ctx, camX, camY, S) {
    if (S.placeholder && S.real) { const r = S.real(); if (r) { S = this.S = r; this.h = r.h; } }
    let dk;
    if (S.type === 'hum') dk = this.dir; else dk = this.dir === 'left' || this.dir === 'right' ? this.dir : this.lastH;
    let f = S.type === 'hum' ? this.frameIndex() : (this.moving || this.fly ? 1 + (Math.floor(this.anim * 6) % 2) : 0);
    // poses especiais (Criatura das Sombras): ataque e morte
    if (S.dead && this.dead) { S = S.dead; f = 0; }
    else if (S.atk && (this.windup > 0 || this.swingT > 0 || this.charging > 0)) { S = S.atk; f = 0; }
    const img = this.flash > 0 ? Sprites.actorWhite(S, dk, f) : S[dk][f];
    const x = Math.round(this.x - img.width / 2 - camX), y = Math.round(this.y - img.height + 1 - camY - this.z);
    if (this.alpha < 1) ctx.globalAlpha = this.alpha;
    ctx.drawImage(img, x, y);
    ctx.globalAlpha = 1;
    // efeitos de status
    if (this.hasFx('burn') && Math.random() < 0.3) Game.particle(this.x + (Math.random() - 0.5) * 8, this.y - img.height * Math.random(), 0, -20, '#ff9030', 0.4);
    if (this.slowT > 0 || this.root > 0) { ctx.fillStyle = this.root > 0 ? 'rgba(90,140,50,0.6)' : 'rgba(150,220,255,0.35)'; ctx.fillRect(x + 2, y + img.height - 4, img.width - 4, 3); }
    if (this.stun > 0) { const t = Game.t * 6; for (let i = 0; i < 3; i++) { ctx.fillStyle = '#fff060'; ctx.fillRect(Math.round(this.x - camX + Math.cos(t + i * 2.1) * 6), Math.round(y - 3 + Math.sin(t + i * 2.1) * 2), 2, 2); } }
    // y devolvido = topo visível (a imagem dos humanos tem espaço livre em cima para chapéus altos)
    return { x, y: S.type === 'hum' && S.h ? y + img.height - S.h : y, img };
  }
  drawWeapon(ctx, camX, camY, wimg, wclass, swing) {
    if (!wimg) return;
    const mao = this.S && this.S.handY;   // altura da mão no corpo novo
    let hx = this.x - camX, hy = this.y - camY - (mao || 6) - this.z;
    const d = this.dir;
    const sc = this.sizeScale || 1;
    if (d === 'down') hx += 5 * sc; else if (d === 'up') hx -= 5 * sc; else if (d === 'right') hx += 2 * sc; else hx -= 2 * sc;
    if (!mao) hy -= (sc - 1) * 8;
    if (this.thrustT > 0) { const k = Math.sin((1 - this.thrustT / 0.22) * Math.PI) * 7; hx += Math.cos(this.face) * k; hy += Math.sin(this.face) * k * 0.6; }
    let ang;
    if (swing) ang = swing;
    else if (wclass === 'bow') ang = this.face;
    else if (wclass === 'staff') ang = -Math.PI / 2 + (Math.cos(this.face) >= 0 ? 0.25 : -0.25);
    else ang = this.face + (Math.cos(this.face) >= 0 ? -1.1 : 1.1);
    ctx.save();
    ctx.translate(Math.round(hx), Math.round(hy));
    ctx.rotate(ang);
    if (Math.cos(ang) < 0) ctx.scale(1, -1);
    if (sc !== 1) ctx.scale(sc, sc);
    ctx.drawImage(wimg, -3, -8);
    ctx.restore();
  }
}

// ---------- Combate ----------
const Combat = {
  targetsOf(src) {
    const out = [];
    const P = Game.player;
    if (P && !P.dead && isHostile(src, P)) out.push(P);
    for (const a of Game.actors) if (!a.dead && a !== src && isHostile(src, a)) out.push(a);
    return out;
  },
  nearestHostile(src, x, y, range, prefAng) {
    let best = null, bs = Infinity;
    for (const a of this.targetsOf(src)) {
      if (a.fogHidden) continue;  // a mira automática não acha o que está escondido na névoa
      if (a.passive && src === Game.player && !a.provoked && range < 60) { /* animais passivos ainda podem ser alvo */ }
      const d = dist(x, y, a.x, a.y - a.z * 0.5);
      if (d > range + a.r) continue;
      let score = d;
      if (prefAng !== undefined) score += Math.abs(angDiff(prefAng, angleTo(x, y, a.x, a.y))) * 30;
      if (score < bs) { bs = score; best = a; }
    }
    return best;
  },
  damage(t, amount, o = {}) {
    if (!t || t.dead) return 0;
    if (t.remote) return Rede.acertar(t, amount, o);
    const P = Game.player;
    const elem = o.elem || 'phys';
    let dmg = amount;
    if (t === P) {
      if (P.rolling > 0 || P.invuln > 0 || Game.godMode) return 0;
      if (elem === 'phys') dmg *= 100 / (100 + P.stat.armor);
      else dmg *= (100 / (100 + P.stat.armor * 0.35)) * (1 - clamp(P.res(elem), 0, 0.85));
      dmg *= P.dmgTakenMul();
      if (!o.dot && P.equip.offhand && ITEMS[P.equip.offhand.id].akind === 'shield' && Math.random() < 0.18 + P.skill('armadura') * 0.002) {
        dmg *= 0.25; Game.floatText(P.x, P.y - 22, 'BLOQUEIO', '#c0d0ff'); Sfx.play('block');
      }
      P.lastHurt = 0;
      if (!o.dot) { Game.shake = Math.max(Game.shake, 4); Sfx.play('hurt'); P.train('armadura', 1.2); }
    } else {
      const d = t.def || {};
      if (t.team === 'npc') return 0;
      if (elem === 'phys') dmg *= 100 / (100 + (d.armor || 0));
      if (d.elem && elem === d.elem && (elem === 'fire' || elem === 'frost')) dmg *= 0.25;
      if (d.elem === 'fire' && elem === 'frost') dmg *= 1.5;
      if (d.elem === 'frost' && elem === 'fire') dmg *= 1.5;
      if (elem === 'holy' && d.undead) dmg *= 3;
      if (d.undead && elem === 'poison') dmg *= 0.2;
      if (d.ghost && elem === 'phys' && !o.magic) dmg *= 0.6;
      if (!o.dot) { t.provoked = o.src || P; t.retarget = 0; if (o.src && !t.target && isHostile(t, o.src)) t.target = o.src; }
    }
    dmg = Math.max(1, Math.round(dmg));
    t.hp -= dmg;
    t.flash = 0.1;
    if (o.kb && !(t.def && t.def.boss) && !t.fly) { const km = t.def && (t.def.r >= 7 || t.def.hp >= 100) ? 0.25 : t === P ? 0.8 : 1; t.kbx += o.kb.x * km; t.kby += o.kb.y * km; }
    if (o.burn) t.addFx('burn', 3, o.burn);
    if (o.poison) t.addFx('poison', 4, o.poison);
    if (o.slow) { t.slowV = Math.min(t.slowT > 0 ? t.slowV : 1, 1 - o.slow); t.slowT = Math.max(t.slowT, 2.5); }
    if (o.stun && !(t.def && t.def.boss)) t.stun = Math.max(t.stun, o.stun);
    if (o.root && !(t.def && t.def.boss)) t.root = Math.max(t.root, o.root);
    const col = t === P ? '#ff5050' : o.crit ? '#ffe040' : elem === 'fire' ? '#ff9040' : elem === 'frost' ? '#a0e0ff' : elem === 'shock' ? '#fff080' : elem === 'holy' ? '#fff4b0' : elem === 'poison' ? '#90f060' : elem === 'dark' ? '#d070ff' : '#ffffff';
    if (!o.noNum) Game.floater(t.x + (Math.random() - 0.5) * 6, t.y - (t.h || 18) - t.z, String(dmg) + (o.crit ? '!' : ''), col, o.crit ? 2 : 1);
    if (!o.dot) {
      Game.burst(t.x, t.y - 8 - t.z, t.def && (t.def.undead || t.def.k === 'golem') ? '#d8d0c0' : t.def && t.def.look && t.def.look.k === 'slime' ? t.def.look.c : t.def && t.def.look && t.def.look.k === 'elemental' ? t.def.look.c : '#c02020', 4);
      if (t !== P) Sfx.play(o.crit ? 'crit' : 'hit');
      Juice.hit(t, o, dmg);
    }
    // roubo de vida
    if (o.src === P && !o.dot) {
      const ls = (o.drain || 0) + P.stat.lifesteal;
      if (ls > 0) P.heal(dmg * ls, true);
    }
    if (t.hp <= 0) { if (Ceu.duelGuard(t)) return dmg; t.hp = 0; t.die(o.src); }
    return dmg;
  },
  melee(src, ang, arc, range, dmgFn) {
    let hits = 0;
    for (const a of this.targetsOf(src)) {
      const d = dist(src.x, src.y - 4, a.x, a.y - 4 - a.z * 0.6);
      if (d > range + a.r) continue;
      const da = Math.abs(angDiff(ang, angleTo(src.x, src.y - 4, a.x, a.y - 4)));
      if (da > arc / 2 + 0.35 && d > a.r + 6) continue;
      dmgFn(a); hits++;
    }
    return hits;
  },
  explode(x, y, r, dmg, src, o = {}) {
    const team = { team: src ? src.team : 'player' };
    for (const a of this.targetsOf(src || team)) {
      if (dist(x, y, a.x, a.y - a.z * 0.5) <= r + a.r) {
        const ang = angleTo(x, y, a.x, a.y);
        Combat.damage(a, dmg * (o.falloff ? 1 - 0.4 * dist(x, y, a.x, a.y) / r : 1), Object.assign({ src, kb: { x: Math.cos(ang) * (o.kb || 60), y: Math.sin(ang) * (o.kb || 60) } }, o));
      }
    }
    Game.fx.push({ kind: 'ring', x, y, r0: 4, r1: r, t: 0, dur: 0.35, color: o.color || '#ff9030' });
    Game.burst(x, y, o.color || '#ff9030', 14, 90);
    Juice.explode(x, y, r, o.color || '#ff9030');
  },
  projectile(src, x, y, ang, kind, dmg, o = {}) {
    const spd = o.spd || (kind === 'arrow' ? 260 : 170);
    const p = Object.assign({ x, y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, ang, kind, dmg, src, team: src.team, life: o.life || 1.6, r: o.r || 3, hit: new Set() }, o);
    Game.projectiles.push(p);
    if (src === Game.player) Rede.projetil(p);
    return p;
  },
  projElem(kind) { return { bullet: 'fire', fireball: 'fire', frost: 'frost', dark: 'dark', poison: 'poison', bolt: 'magic', rock: 'phys', arrow: 'phys', breath: 'fire', shock: 'shock' }[kind] || 'phys'; }
};

// ---------- Monstros (e aliados) ----------
class Monster extends Actor {
  constructor(id, x, y, lvl, opts = {}) {
    super(x, y);
    const d = ENEMIES[id];
    this.eid = id; this.def = d; this.lvl = Math.max(1, Math.round(lvl));
    this.name = opts.name || d.name;
    this.team = d.ally ? 'ally' : 'enemy';
    const L0 = BOSS_L0[id] || 1;
    const hpMul = d.boss ? Math.max(0.55, 1 + 0.08 * (this.lvl - L0)) : 1 + 0.12 * (this.lvl - 1);
    const dmgMul = d.boss ? Math.max(0.6, 1 + 0.07 * (this.lvl - L0)) : 1 + 0.1 * (this.lvl - 1);
    const gH = d.ally ? 1 : d.boss ? 1.2 : 1.35, gD = d.ally ? 1 : 1.4;
    this.maxHp = this.hp = Math.round(d.hp * hpMul * gH * (opts.hpMul || 1));
    this.dmg = d.dmg * dmgMul * gD * (opts.dmgMul || 1);
    this.spd = d.spd * (opts.spdMul || 1);
    this.r = d.r || 5; this.fly = !!d.fly; this.ai = d.ai; this.aggro = d.aggro || 130;
    this.passive = !!d.passive;
    this.atkCd = 0.5 + Math.random(); this.windup = 0; this.home = { x, y }; this.wT = Math.random() * 3; this.target = null; this.retarget = 0;
    this.look = opts.look || d.look;
    this.S = Sprites.actor(this.look);
    this.h = this.S.h;
    this.sizeScale = this.look.size || 1;
    this.xp = Math.round(d.xp * (1 + 0.1 * (this.lvl - 1)));
    this.boss = !!d.boss; this.follow = !!opts.follow; this.summonT = opts.t; this.camp = opts.camp || null; this.guard = !!d.guard;
    if (this.look.k === 'hum' && this.look.weapon) { this.wclass = this.look.weapon; this.wimg = Sprites.weapon(this.look.weapon, this.look.wc || '#a0a0a0', '#a060ff'); }
    this.specialT = 3 + Math.random() * 2; this.blockedT = 0; this.flowT = 0; this.chargeCd = 2; this.charging = 0;
    this.swingT = 0;
    if (this.ai === 'flyer') { this.z = 22; this.fstate = 'circle'; this.fT = 4; this.orbit = Math.random() * 6; }
    // criatura das sombras: parada, andar sem pressa (vista de lado) e corrida atrás da presa
    if (this.look.k === 'sombra') this.frameIndex = () => !this.moving ? 0 : this.target ? 1 + (Math.floor(this.anim * 7) % 2) : (Math.floor(this.anim * 4) % 2 ? 3 : 1);
    if (d.look.ghostly || d.ghost) this.alpha = 0.8;
    this.minions = 0;
    this.deadT = 0;
  }
  get displayName() { return this.name + (this.boss ? '' : ''); }
  findTarget() {
    const P = Game.player;
    let range = this.aggro * (this.provoked ? 2.2 : 1);
    let best = null, bd = Infinity;
    const consider = (a) => {
      if (a.dead || a === this || !isHostile(this, a)) return;
      let r = range;
      if (a === P) { if (P.perks.has('furtivo')) r *= 0.6; if (P.invisible > 0) return; }
      const d = dist2(this.x, this.y, a.x, a.y);
      if (d < r * r && d < bd) { bd = d; best = a; }
    };
    if (P) consider(P);
    for (const a of Game.actors) consider(a);
    if (this.team === 'ally' && this.follow && best && P && dist(best.x, best.y, P.x, P.y) > 260) best = null;
    if (best && !this.follow && this.home && !this.boss && dist(this.x, this.y, this.home.x, this.home.y) > (this.guard ? 220 : 520)) { this.provoked = null; best = null; this.returning = true; }
    return best;
  }
  moveToward(tx, ty, spd, dt) {
    let ang = angleTo(this.x, this.y, tx, ty);
    if (!this.fly && this.flowT > 0 && this.target === Game.player) { const g = Game.flowDir(this.x, this.y); if (g !== null) ang = g; }
    moveActor(this, Math.cos(ang) * spd * dt, Math.sin(ang) * spd * dt);
    if (this.blocked) { this.blockedT += dt; if (this.blockedT > 0.12) this.flowT = 1.5; } else this.blockedT = Math.max(0, this.blockedT - dt);
    if (this.flowT > 0) this.flowT -= dt;
    this.moving = true; this.anim += dt; this.setDir(ang);
  }
  startAttack(kind, wind) {
    this.windup = wind || (this.boss ? 0.5 : this.ai === 'melee' || this.ai === 'charge' ? 0.32 : 0.38);
    this.atkKind = kind;
    if (this.target) { this.atkAng = angleTo(this.x, this.y, this.target.x, this.target.y); this.setDir(this.atkAng); }
  }
  release() {
    const t = this.target, d = this.def;
    this.atkCd = (d.cd || (this.boss ? 1.1 : this.ai === 'ranged' || this.ai === 'caster' ? 1.6 : 1.25)) * COMBAT_TEMPO;
    if (!t || t.dead) return;
    const ang = angleTo(this.x, this.y, t.x, t.y);
    if (this.atkKind === 'melee') {
      this.swingT = 0.2;
      const reach = this.r + t.r + 12 * this.sizeScale;
      Game.fx.push({ kind: 'swing', x: this.x, y: this.y - 6 * this.sizeScale, ang, arc: 1.6, r: reach, t: 0, dur: 0.18, color: '#ffffff' });
      if (dist(this.x, this.y, t.x, t.y) <= reach + 16) {
        const el = d.elem && Math.random() < 0.35 ? d.elem : 'phys';
        Combat.damage(t, this.dmg * (0.85 + Math.random() * 0.3), { src: this, elem: el, poison: d.poison ? d.poison * (1 + this.lvl * 0.1) : 0, kb: { x: Math.cos(ang) * (this.boss ? 160 : 90), y: Math.sin(ang) * (this.boss ? 160 : 90) }, slow: el === 'frost' ? 0.3 : 0, burn: el === 'fire' ? this.dmg * 0.2 : 0 });
      }
      Sfx.play('swing');
    } else if (this.atkKind === 'bayonet') {
      // estocada de baioneta
      this.thrustT = 0.22;
      const reach = this.r + t.r + 18;
      Game.fx.push({ kind: 'swing', x: this.x, y: this.y - 7, ang, arc: 0.45, r: reach, t: 0, dur: 0.14, color: '#e0e8f4' });
      moveActor(this, Math.cos(ang) * 4, Math.sin(ang) * 4);
      if (dist(this.x, this.y, t.x, t.y) <= reach + 8) Combat.damage(t, this.dmg * (0.8 + Math.random() * 0.3), { src: this, kb: { x: Math.cos(ang) * 110, y: Math.sin(ang) * 110 } });
      Sfx.play('swing');
    } else if (this.atkKind === 'shoot') {
      const kind = this.proj || d.proj || 'arrow';
      const n = this.boss ? 3 : 1;
      for (let i = 0; i < n; i++) {
        const a = ang + (i - (n - 1) / 2) * 0.22 + (Math.random() - 0.5) * 0.08;
        Combat.projectile(this, this.x, this.y - 8 * this.sizeScale - this.z, a, kind, this.dmg * (kind === 'arrow' ? 0.9 : 1), { elem: Combat.projElem(kind), spd: kind === 'arrow' ? 220 : kind === 'bullet' ? 430 : 150, poison: kind === 'poison' ? 4 + this.lvl * 0.4 : 0, slow: kind === 'frost' ? 0.35 : 0, magic: kind === 'bullet', color: '#80c0ff', r: kind === 'bullet' ? 2 : undefined });
      }
      if (kind === 'bullet') Game.musketFx(this.x + Math.cos(ang) * 12, this.y - 9 + Math.sin(ang) * 8, ang, '#80c0ff');
      else Sfx.play(kind === 'arrow' ? 'bow' : 'spell');
    }
    if (this.look.k === 'sombra' && this.atkKind === 'melee') Sombra.strike(this);
  }
  special() {
    const d = this.def, t = this.target;
    const opts = [];
    if (d.summon && this.minions < 4) opts.push('summon');
    if (d.proj) opts.push('volley');
    opts.push('slam');
    if (d.charge) opts.push('charge', 'charge');
    if (d.teleport) opts.push('teleport');
    const k = opts[Math.floor(Math.random() * opts.length)];
    this.specialT = this.hp < this.maxHp * 0.4 ? 3.5 : 5.5;
    if (k === 'summon') {
      for (let i = 0; i < 2; i++) {
        const a = Math.random() * Math.PI * 2;
        const x = this.x + Math.cos(a) * 30, y = this.y + Math.sin(a) * 30;
        if (collides(Game.level, x, y, 5)) continue;
        const m = new Monster(d.summon, x, y, Math.max(1, this.lvl - 3));
        m.master = this; m.provoked = Game.player; this.minions++;
        Game.actors.push(m);
        Game.fx.push({ kind: 'ring', x, y, r0: 2, r1: 18, t: 0, dur: 0.5, color: '#a060ff' });
      }
      Game.toast(this.name + ' invoca reforços!', '#c080ff');
    } else if (k === 'volley') {
      const kind = d.proj;
      const n = 10;
      const base = t ? angleTo(this.x, this.y, t.x, t.y) : 0;
      for (let i = 0; i < n; i++) {
        const a = this.hp < this.maxHp * 0.5 ? (i / n) * Math.PI * 2 : base + (i - n / 2) * 0.12;
        Combat.projectile(this, this.x, this.y - 10 * this.sizeScale - this.z, a, kind, this.dmg * 0.7, { elem: Combat.projElem(kind), spd: 130, poison: kind === 'poison' ? 5 : 0, slow: kind === 'frost' ? 0.35 : 0 });
      }
      Sfx.play('spell');
    } else if (k === 'slam') {
      const x = t ? t.x : this.x, y = t ? t.y : this.y;
      const R = 34 + this.r;
      Game.fx.push({ kind: 'telegraph', x, y, r: R, t: 0, dur: 0.9, color: '#ff3030' });
      Game.later(0.9, () => { if (this.dead) return; Combat.explode(x, y, R, this.dmg * 1.3, this, { color: '#d0a070', kb: 140 }); Game.shake = 6; Sfx.play('boom'); });
    } else if (k === 'charge' && t) {
      this.windup = 0.45; this.atkKind = 'charge'; this.chargeAng = angleTo(this.x, this.y, t.x, t.y);
      Game.fx.push({ kind: 'line', x: this.x, y: this.y, ang: this.chargeAng, len: 150, t: 0, dur: 0.45, color: '#ff3030' });
      return;
    } else if (k === 'teleport' && t) {
      for (let i = 0; i < 10; i++) {
        const a = Math.random() * Math.PI * 2, x = t.x + Math.cos(a) * 90, y = t.y + Math.sin(a) * 90;
        if (!collides(Game.level, x, y, this.r)) { Game.burst(this.x, this.y - 10, '#a040ff', 20, 80); this.x = x; this.y = y; Game.burst(x, y - 10, '#a040ff', 20, 80); break; }
      }
    }
  }
  update(dt) {
    if (this.dead) { this.deadT += dt; return; }
    this.updateStatus(dt);
    if (this.dead) return;
    if (this.summonT !== undefined) { this.summonT -= dt; if (this.summonT <= 0) { this.vanish(); return; } }
    if (this.def.regen && this.hp < this.maxHp) this.hp = Math.min(this.maxHp, this.hp + this.def.regen * (1 + this.lvl * 0.1) * dt);
    this.atkCd -= dt; this.specialT -= dt; this.chargeCd -= dt;
    if (this.swingT > 0) this.swingT -= dt;
    if (this.thrustT > 0) this.thrustT -= dt;
    if (this.look.k === 'sombra') { if (this.S.placeholder && Sombra.ready) { this.S = Sombra.sheet(); this.h = this.S.h; } Sombra.update(this, dt); if (this.dead) return; }
    this.moving = false;
    if (this.stun > 0) return;
    const sf = this.speedFactor;
    if (this.windup > 0) {
      this.windup -= dt * (Game.slowTime > 0 && this.team === 'enemy' ? 0.5 : 1);
      if (this.windup <= 0) {
        if (this.atkKind === 'charge') { this.charging = 0.55; this.chargeHit = false; }
        else this.release();
      }
      return;
    }
    if (this.charging > 0) {
      this.charging -= dt;
      moveActor(this, Math.cos(this.chargeAng) * this.spd * 3.4 * dt, Math.sin(this.chargeAng) * this.spd * 3.4 * dt);
      this.moving = true; this.anim += dt * 2;
      Game.particle(this.x, this.y, (Math.random() - 0.5) * 20, -10, '#c8b090', 0.4);
      for (const a of Combat.targetsOf(this)) {
        if (!this.chargeHit && dist(this.x, this.y, a.x, a.y) < this.r + a.r + 6) {
          this.chargeHit = true;
          Combat.damage(a, this.dmg * 1.3, { src: this, kb: { x: Math.cos(this.chargeAng) * 260, y: Math.sin(this.chargeAng) * 260 }, stun: 0.6 });
        }
      }
      if (this.blocked) this.charging = 0;
      if (this.charging <= 0) { this.atkCd = 1; if (this.look.k === 'sombra') Sombra.strike(this); }
      return;
    }
    if (this.look.k === 'sombra' && Sombra.control(this, dt, sf)) return;
    this.retarget -= dt;
    if (this.retarget <= 0) { this.retarget = 0.25 + Math.random() * 0.2; this.target = this.findTarget(); }
    const t = this.target;
    if (this.faction === 'jogador' && Reino.tatica(this, t, dt, sf)) return;
    if (this.ai === 'flee') return this.updateFlee(dt, sf);
    if (this.ai === 'flyer') return this.updateFlyer(dt, sf);
    if (!t || t.dead) { this.target = null; if (this.ctrl && War.steer(this, dt, sf)) return; return this.idle(dt, sf); }
    const d = dist(this.x, this.y, t.x, t.y);
    const reach = this.r + t.r + 10 * this.sizeScale;
    if (this.boss && this.specialT <= 0 && d < 260) { this.special(); return; }
    switch (this.ai) {
      case 'melee': case 'boss':
        if (d > reach) this.moveToward(t.x, t.y, this.spd * sf, dt);
        else { this.setDir(angleTo(this.x, this.y, t.x, t.y)); if (this.atkCd <= 0) this.startAttack('melee'); }
        break;
      case 'charge':
        if (this.chargeCd <= 0 && d > 40 && d < 130) { this.chargeCd = 4 + Math.random() * 2; this.windup = 0.5; this.atkKind = 'charge'; this.chargeAng = angleTo(this.x, this.y, t.x, t.y); this.setDir(this.chargeAng); }
        else if (d > reach) this.moveToward(t.x, t.y, this.spd * sf, dt);
        else if (this.atkCd <= 0) this.startAttack('melee');
        break;
      case 'musket': War.musketAI(this, t, d, dt, sf); break;
      case 'ranged': case 'caster': {
        const ideal = this.ai === 'caster' ? 110 : 120;
        if (d < 60) this.moveToward(this.x - (t.x - this.x), this.y - (t.y - this.y), this.spd * 0.8 * sf, dt);
        else if (d > ideal + 50) this.moveToward(t.x, t.y, this.spd * sf, dt);
        else {
          const a = angleTo(t.x, t.y, this.x, this.y) + 0.6 * ((this.id % 2) ? 1 : -1);
          if (Math.random() < 0.6) this.moveToward(t.x + Math.cos(a) * ideal, t.y + Math.sin(a) * ideal, this.spd * 0.45 * sf, dt);
          this.setDir(angleTo(this.x, this.y, t.x, t.y));
        }
        if (this.atkCd <= 0 && d < 220) this.startAttack('shoot');
        break;
      }
    }
  }
  idle(dt, sf) {
    const P = Game.player;
    if (this.follow && P) {
      const d = dist(this.x, this.y, P.x, P.y);
      if (d > 420 || (Game.level !== this.levelRef && this.levelRef)) { this.x = P.x + 10; this.y = P.y + 10; }
      else if (d > 36) this.moveToward(P.x, P.y, this.spd * (d > 120 ? 1.3 : 1) * sf, dt);
      return;
    }
    if (this.returning || dist(this.x, this.y, this.home.x, this.home.y) > 300) {
      this.moveToward(this.home.x, this.home.y, this.spd * sf, dt);
      if (dist(this.x, this.y, this.home.x, this.home.y) < 20) this.returning = false;
      if (this.hp < this.maxHp) this.hp = Math.min(this.maxHp, this.hp + this.maxHp * 0.2 * dt);
      return;
    }
    this.wT -= dt;
    if (this.wT <= 0) { this.wT = 2 + Math.random() * 4; const a = Math.random() * Math.PI * 2, r = Math.random() * (this.guard ? 24 : 60); this.wp = { x: this.home.x + Math.cos(a) * r, y: this.home.y + Math.sin(a) * r, t: 2 }; }
    if (this.wp) {
      this.wp.t -= dt;
      if (dist(this.x, this.y, this.wp.x, this.wp.y) < 4 || this.wp.t <= 0 || this.blocked) this.wp = null;
      else this.moveToward(this.wp.x, this.wp.y, this.spd * 0.4 * sf, dt);
    }
  }
  updateFlee(dt, sf) {
    const P = Game.player;
    const d = P ? dist(this.x, this.y, P.x, P.y) : 999;
    if (d < (this.provoked ? 160 : 80)) this.moveToward(this.x * 2 - P.x, this.y * 2 - P.y, this.spd * sf, dt);
    else { this.provoked = this.provoked && d < 200 ? this.provoked : null; this.idle(dt, sf); }
  }
  updateFlyer(dt, sf) {
    const t = this.target || (Game.player && !Game.player.dead && dist(this.x, this.y, Game.player.x, Game.player.y) < 600 ? Game.player : null);
    this.anim += dt; this.moving = true;
    if (!t) { this.orbit += dt * 0.3; this.x += Math.cos(this.orbit) * this.spd * 0.5 * dt; this.y += Math.sin(this.orbit) * this.spd * 0.5 * dt; return; }
    this.target = t;
    this.fT -= dt;
    if (this.fstate === 'circle') {
      this.orbit += dt * 0.9 * sf;
      const R = 110;
      const gx = t.x + Math.cos(this.orbit) * R, gy = t.y + Math.sin(this.orbit) * R * 0.7;
      const a = angleTo(this.x, this.y, gx, gy);
      const sp = Math.min(this.spd * 1.6, dist(this.x, this.y, gx, gy) * 3) * sf;
      this.x += Math.cos(a) * sp * dt; this.y += Math.sin(a) * sp * dt;
      this.setDir(angleTo(this.x, this.y, t.x, t.y));
      this.z = lerp(this.z, 26, dt * 2);
      if (this.fT <= 0) { this.fstate = Math.random() < (this.hp < this.maxHp * 0.6 ? 0.45 : 0.25) ? 'land' : 'breath'; this.fT = this.fstate === 'land' ? 5 : 1.6; this.breathAcc = 0; if (this.fstate === 'breath') { Game.toast(this.name + ' prepara o sopro!', '#ff8040'); } }
    } else if (this.fstate === 'breath') {
      this.setDir(angleTo(this.x, this.y, t.x, t.y));
      this.breathAcc += dt;
      if (this.fT < 1.2 && this.breathAcc > 0.09) {
        this.breathAcc = 0;
        const a = angleTo(this.x, this.y - this.z, t.x, t.y) + (Math.random() - 0.5) * 0.35;
        const kind = this.def.proj === 'frost' ? 'frost' : 'breath';
        Combat.projectile(this, this.x + Math.cos(this.face) * 16, this.y - this.z - 6, a, kind, this.dmg * 0.45, { elem: kind === 'frost' ? 'frost' : 'fire', spd: 170, life: 1.1, burn: kind === 'breath' ? this.dmg * 0.1 : 0, slow: kind === 'frost' ? 0.35 : 0, r: 5 });
        if (Math.random() < 0.3) Sfx.play('fire');
      }
      if (this.fT <= 0) { this.fstate = 'circle'; this.fT = 3 + Math.random() * 2; }
    } else if (this.fstate === 'land') {
      this.z = lerp(this.z, 0, dt * 3);
      const d = dist(this.x, this.y, t.x, t.y);
      if (d > this.r + t.r + 14) { const a = angleTo(this.x, this.y, t.x, t.y); this.x += Math.cos(a) * this.spd * 0.8 * sf * dt; this.y += Math.sin(a) * this.spd * 0.8 * sf * dt; this.setDir(a); }
      else if (this.atkCd <= 0) { this.startAttack('melee', 0.45); }
      if (this.fT <= 0) { this.fstate = 'circle'; this.fT = 4; }
    }
  }
  vanish() { this.dead = true; this.deadT = 10; Game.burst(this.x, this.y - 8, '#a0c0ff', 12, 60); if (this.master) this.master.minions--; }
  die(killer) {
    if (this.dead) return;
    this.dead = true; this.deadT = 0;
    if (this.master) this.master.minions--;
    Game.onMonsterDeath(this, killer);
  }
  draw(ctx, camX, camY) {
    if (this.fogHidden) return;  // escondida na névoa: não dá para ver
    if (this.dead) {
      if (this.deadT > 0.6) return;
      ctx.globalAlpha = 1 - this.deadT / 0.6;
    }
    if (this.fly && this.z > 2) this.drawShadow(ctx, camX, camY, this.S.w * 0.6); else this.drawShadow(ctx, camX, camY, Math.max(8, this.S.w * 0.55));
    const aw = this.dir === 'up';
    let swingAng = null;
    if (this.swingT > 0 && this.wclass && this.wclass !== 'bow' && this.wclass !== 'staff') swingAng = this.face - 1 + (1 - this.swingT / 0.2) * 2;
    if (this.thrustT > 0 || this.aimT > 0 || this.windup > 0 && this.ai === 'musket') swingAng = this.face;
    if (aw && this.wimg) this.drawWeapon(ctx, camX, camY, this.wimg, this.wclass, swingAng);
    const r = this.drawBody(ctx, camX, camY, this.S);
    if (!aw && this.wimg) this.drawWeapon(ctx, camX, camY, this.wimg, this.wclass, swingAng);
    ctx.globalAlpha = 1;
    if (this.dead) return;
    // telegrafia do ataque
    if (this.windup > 0 && this.team === 'enemy') {
      ctx.fillStyle = Math.floor(Game.t * 16) % 2 ? '#ff3030' : '#ffff60';
      const ex = Math.round(this.x - camX), ey = r.y - 7;
      ctx.fillRect(ex - 1, ey, 2, 4); ctx.fillRect(ex - 1, ey + 5, 2, 1);
    }
    // barra de vida
    if (this.hp < this.maxHp && !this.boss && this.team !== 'npc') {
      const w = Math.max(12, Math.min(26, this.S.w * 0.8)), x = Math.round(this.x - w / 2 - camX), y = r.y - 4;
      ctx.fillStyle = '#10080c'; ctx.fillRect(x - 1, y - 1, w + 2, 4);
      ctx.fillStyle = this.team === 'ally' ? '#40c0ff' : '#e03030'; ctx.fillRect(x, y, Math.ceil(w * this.hp / this.maxHp), 2);
    }
    if (this.team === 'ally' && !this.guard && !this.hpShown) { ctx.fillStyle = '#40c0ff'; ctx.fillRect(Math.round(this.x - camX) - 1, r.y - 6, 2, 2); }
  }
}

// ---------- NPCs ----------
function npcLook(race, sex, rng, role) {
  const R = RACES[race];
  if (R.sheet) return sheetLook(race, sex, rng, role);
  const L = { k: 'hum', skin: rng.pick(R.skins), hair: rng.pick(R.hairs), hairStyle: sex === 'f' ? rng.pick([1, 1, 4, 0]) : rng.pick([0, 0, 2, 3, 0]) };
  if (R.ears) L.ears = R.ears;
  if (R.tall) L.tall = 1; if (R.short) L.short = R.short; if (R.bulky) L.bulky = true;
  if (R.beard && sex === 'm' && rng.chance(0.8)) L.beard = true;
  if (R.tusks) L.tusks = true; if (R.snout) L.snout = true; if (R.horns) L.horns = true;
  if (R.tail) { L.tail = true; L.tailC = R.tailHair ? L.hair : L.skin; }
  if (R.catears) L.catears = true; if (R.muzzle) L.muzzle = true; if (R.eyes) L.eyes = R.eyes;
  const clothes = ['#7a4a2a', '#4a6a3a', '#3a4a7a', '#7a3a3a', '#6a5a3a', '#5a3a6a', '#8a7a5a', '#3a6a6a', '#9a8a6a', '#a05a30'];
  L.body = rng.pick(clothes);
  L.legs = rng.pick(['#3a3020', '#2a2a30', '#4a3a2a', '#3a3a3a']);
  if (sex === 'f' && rng.chance(0.5)) L.robe = true;
  if (role === 'merchant') { L.body = rng.pick(['#a06a30', '#8a5a2a']); L.robe = false; }
  if (role === 'quest') { L.hood = rng.chance(0.5) ? rng.pick(['#3a5a3a', '#5a3a2a', '#3a3a5a']) : undefined; }
  if (role === 'ruler') { L.crown = true; L.cape = '#a02030'; L.body = '#d0b040'; }
  vestirNPC(L, sex, rng, role);
  return L;
}
// roupas em camadas e acessórios: colete e camisa, avental, cachecol, bolsa, chapéus, idosos com bengala
const CAMISAS = ['#e8dcc0', '#d8d0c0', '#c8b89a', '#f0e8d8', '#b8c8d0', '#e0c8c0'];
const CORES_CHAPEU = ['#c8a050', '#5a4a3a', '#3a3a4a', '#7a2a2a', '#2a4a6a', '#4a6a3a', '#6a4a7a'];
function vestirNPC(L, sex, rng, role) {
  if (role === 'guard' || role === 'ruler') return;
  const r = rng, kid = role === 'kid' || role === 'child';
  L.seed = r.int(0, 9);
  if (!L.robe && r.chance(sex === 'm' ? 0.4 : 0.22)) { L.vest = r.pick(['#5a3a24', '#3a4a3a', '#4a3a5a', '#6a4a2a', '#2a3a4a', '#7a5a3a', '#6a2a2a']); L.shirt = r.pick(CAMISAS); }
  else if (!L.robe && r.chance(0.18)) L.stripes = true;
  if (L.robe && r.chance(0.5)) L.sash = r.pick(['#a03030', '#3a5a8a', '#c0a040', '#4a7a4a', '#7a3a7a']);
  if (role === 'merchant' || (role === 'shop' && r.chance(0.65))) L.apron = r.pick(['#ece4d4', '#d8c8a8', '#8a6a4a', '#5a4a3a']);
  else if (!kid && r.chance(L.robe ? 0.3 : 0.08)) L.apron = r.pick(['#f0ece0', '#e8dcc8', '#c8b8a0']);
  if (r.chance(0.22)) L.scarf = r.pick(['#a03030', '#3a6a3a', '#c0a040', '#4a4a8a', '#8a5a2a', '#d07090']);
  else if (r.chance(0.3)) L.collar = r.pick(CAMISAS);
  if (!L.robe && r.chance(0.45)) L.pouch = true;
  if (!kid && r.chance(role === 'merchant' ? 0.4 : 0.16)) L.bag = r.pick(['#8a5a30', '#6a4a2a', '#a07a4a', '#5a5a3a']);
  if (!L.robe && r.chance(0.2)) L.patch = true;
  if (!L.hood) {
    const h = r.next();
    if (h < 0.12) { L.hat = 'straw'; L.hatC = '#d8b868'; }
    else if (h < 0.2 && !kid) { L.hat = 'wide'; L.hatC = r.pick(CORES_CHAPEU); if (r.chance(0.5)) L.pena = r.pick(['#e04040', '#f0f0f0', '#40a0e0', '#f0c040']); }
    else if (h < 0.29 && sex === 'm') { L.hat = 'cap'; L.hatC = r.pick(CORES_CHAPEU); }
    else if (h < 0.35) { L.hat = 'bandana'; L.hatC = r.pick(['#a03030', '#3a5a8a', '#c08030', '#4a7a4a']); }
    else if (h < 0.4 && !kid) { L.hat = 'beret'; L.hatC = r.pick(CORES_CHAPEU); }
    else if (h < 0.5 && sex === 'f') { L.hat = r.chance(0.5) ? 'flores' : 'lenco'; L.hatC = r.pick(['#e8dcc8', '#a03050', '#3a6a8a', '#c0a040']); }
  }
  if (!kid && r.chance(0.1)) { L.old = true; L.hair = r.pick(['#c8c8c8', '#e0e0e0', '#a8a8a8']); if (L.beard) L.beardC = L.hair; if (r.chance(0.55)) L.cane = true; }
}
class NPC extends Actor {
  constructor(spot, s, rng) {
    super(spot.x * 16 + 8, spot.y * 16 + 12);
    this.team = 'npc'; this.role = spot.role; this.s = s; this.home = { x: this.x, y: this.y };
    const cul = CULTURES[s.region.culture];
    this.race = spot.race ? spot.race : RACES[cul.race].npcOnly ? cul.race : (s.type === 'capital' && rng.chance(0.3)) ? rng.pick(playableRaces()) : cul.race;
    this.sex = rng.chance(0.5) ? 'm' : 'f';
    const N = NAMES[this.race];
    this.name = rng.pick(N[this.sex]) + ' ' + rng.pick(N.s);
    this.look = npcLook(this.race, this.sex, rng, this.role);
    this.S = Sprites.actor(this.look);
    this.h = this.S.h;
    this.r = 4; this.hp = this.maxHp = 100;
    this.wT = rng.range(0, 3); this.spd = 26 + rng.range(0, 10);
    this.seed = rng.int(1, 1e9);
    this.dir = 'down';
    this.talkT = 0;
    this.sleeper = this.role === 'citizen' && rng.chance(0.6);
    if (spot.vilaNPC) this.vilaNPC = spot.vilaNPC;
  }
  update(dt) {
    this.moving = false;
    if (this.talkT > 0) { this.talkT -= dt; const P = Game.player; this.setDir(angleTo(this.x, this.y, P.x, P.y)); return; }
    if (this.chatT > 0) { this.chatT -= dt; const o = this.chatWith; if (o) this.setDir(angleTo(this.x, this.y, o.x, o.y)); if (this.chatT <= 0) { this.chatT = 0; this.chatCd = 6 + Math.random() * 10; } return; }
    if (this.chatCd > 0) this.chatCd -= dt;
    if (this.visiting) return;
    const wander = this.role === 'student' || this.role === 'citizen' || this.role === 'resident' || this.role === 'patron' || this.role === 'child' || this.role === 'kid' || this.role === 'spouse';
    if (!wander) {
      const P = Game.player;
      if (P && dist(this.x, this.y, P.x, P.y) < 40) this.setDir(angleTo(this.x, this.y, P.x, P.y));
      return;
    }
    this.wT -= dt;
    if (this.wT <= 0) {
      this.wT = 2 + Math.random() * 5;
      if (Math.random() < (this.indoor ? 0.4 : 0.6)) { const a = Math.random() * Math.PI * 2, r = this.indoor ? 8 + Math.random() * 30 : 16 + Math.random() * 90; this.wp = { x: this.home.x + Math.cos(a) * r, y: this.home.y + Math.sin(a) * r, t: 4 }; }
    }
    if (this.wp) {
      this.wp.t -= dt;
      if (dist(this.x, this.y, this.wp.x, this.wp.y) < 4 || this.wp.t <= 0) this.wp = null;
      else {
        const a = angleTo(this.x, this.y, this.wp.x, this.wp.y);
        moveActor(this, Math.cos(a) * this.spd * dt, Math.sin(a) * this.spd * dt);
        if (this.blocked) this.wp = null;
        this.moving = true; this.anim += dt; this.setDir(a);
      }
    }
  }
  die() { }
  get hidden() { return this.sleeper && !this.indoor && Game.isNight(); }
  draw(ctx, camX, camY) {
    this.drawShadow(ctx, camX, camY);
    const r = this.drawBody(ctx, camX, camY, this.S);
    if (this.role === 'quest' || this.role === 'merchant') {
      const P = Game.player;
      const bob = Math.round(Math.sin(Game.t * 4) * 1.5);
      const x = Math.round(this.x - camX), y = r.y - 9 + bob;
      ctx.fillStyle = '#10080c'; ctx.fillRect(x - 2, y - 1, 5, 8);
      ctx.fillStyle = this.role === 'quest' ? '#ffd040' : '#80e0ff';
      if (this.role === 'quest') { ctx.fillRect(x - 1, y, 3, 4); ctx.fillRect(x - 1, y + 5, 3, 1); }
      else { ctx.fillRect(x - 1, y + 1, 3, 4); ctx.fillRect(x, y, 1, 6); }
      void P;
    }
  }
}
