'use strict';
// ===================== GELEIRA DE HRIMGARD E OS VIKINGS =====================
// Expansão no noroeste de Eldoria: um manto de gelo puro que nunca derrete (nem depois do inverno),
// território de clãs vikings fortíssimos. Os vikings, as casas longas, o salão do jarl, o drakkar,
// as pedras rúnicas e as torres de vigia foram modelados e renderizados no Blender 4.2
// (tools/blender/vikings.py e construcoes_vikings.py) e reduzidos a pixel art.
// A geleira só aparece depois que o resto do mundo foi gerado: nada do mapa antigo muda.
const HRIM = { x: 300, y: 205, rx: 290, ry: 175 };
const HRIM_LVL = [40, 55];
const HRIM_PONTE = { x0: 380, y0: 320, x1: 470, y1: 470, r: 46 };
const VK_VARS = ['guerreiro', 'berserker', 'arqueiro', 'jarl', 'aldea'];

// ---------- inimigos vikings ----------
ENEMIES.viking_guerreiro = { name: 'Guerreiro Viking', look: { k: 'viking', v: 0 }, hp: 260, dmg: 24, spd: 66, ai: 'melee', xp: 320, armor: 45, r: 6, aggro: 330, gold: [60, 160], drops: [['casaco_pele', 0.06], ['pocao_vida_m', 0.2]] };
ENEMIES.viking_berserker = { name: 'Berserker', look: { k: 'viking', v: 1 }, hp: 230, dmg: 32, spd: 92, ai: 'melee', cd: 0.85, xp: 360, armor: 25, r: 6, aggro: 380, gold: [50, 140], drops: [['casaco_pele', 0.08]] };
ENEMIES.viking_arqueiro = { name: 'Arqueiro Viking', look: { k: 'viking', v: 2 }, hp: 170, dmg: 22, spd: 62, ai: 'ranged', proj: 'arrow', xp: 300, armor: 30, r: 6, aggro: 360, gold: [40, 120], drops: [['flecha', 0.6]] };
ENEMIES.viking_jarl = { name: 'Jarl Hrolf Punho-de-Gelo', look: { k: 'viking', v: 3 }, hp: 1100, dmg: 34, spd: 70, ai: 'melee', cd: 0.9, xp: 4000, armor: 70, r: 8, aggro: 500, boss: true, gold: [1500, 2500], drops: [['machado_hrimgard', 1], ['escudo_hrimgard', 1], ['manto_urso', 1]] };
ENEMIES.viking_aldea = { name: 'Aldeã Viking', look: { k: 'viking', v: 4 }, hp: 60, dmg: 0, spd: 70, ai: 'flee', xp: 0, r: 5, passive: true, noMeat: true };
// armas e roupas que só o jarl carrega
idef('machado_hrimgard', { name: 'Machado do Jarl de Hrimgard', type: 'weapon', slot: 'weapon', wclass: 'axe', mat: 'draconico', tier: 8, dmg: 52, cd: 0.5, range: 21, arc: 1.2, crit: 0.12, value: 9000, icon: { k: 'axe', c: '#a8dcff' }, lvl: 35, desc: 'Lâmina barbada forjada com gelo eterno. Dano enorme e golpes críticos.' });
idef('escudo_hrimgard', { name: 'Escudo Rúnico de Hrimgard', type: 'armor', slot: 'offhand', akind: 'shield', mat: 'draconico', tier: 8, armor: 52, value: 7000, icon: { k: 'shield', c: '#c03028' }, lvl: 35, desc: 'Escudo redondo pintado, com runas que brilham no frio.' });
idef('manto_urso', { name: 'Manto de Urso do Jarl', type: 'armor', slot: 'body', akind: 'body', mat: 'couro', armor: 40, quente: 0.8, value: 4000, icon: { k: 'body', c: '#5a3a24' }, lvl: 30, wlook: { body: '#4a2e1c', pauldron: '#d8ccb8' }, desc: 'Pele de urso polar. Quase nada do frio de Hrimgard passa por ele.' });

// ---------- monstros da geleira e cultura ----------
SPAWNS.hrimgard = {
  day: [['viking_guerreiro', 2.5], ['viking_berserker', 1.5], ['viking_arqueiro', 1.5], ['lobo_gelo', 2], ['urso_polar', 1], ['troll_gelo', 1.2], ['yeti', 0.8]],
  night: [['viking_guerreiro', 2], ['viking_berserker', 2], ['draugr', 2], ['lobo_gelo', 2], ['troll_gelo', 1.2], ['espectro', 1], ['yeti', 1]]
};
if (typeof ORE_BY_REGION !== 'undefined') ORE_BY_REGION.hrimgard = ORE_BY_REGION.nordheim;
CULTURES.viking = Object.assign({}, CULTURES.nordic);

const Vikings = {
  img: null, ok: false, casas: {}, cache: {},
  carregar() {
    const im = new Image(); im.onload = () => { this.img = im; this.ok = true; this.cache = {}; }; im.src = imgSrc('img/vikings.png');
    for (const n of ['casa_longa', 'salao_jarl', 'drakkar', 'pedra_runica', 'torre_vigia']) { const c = new Image(); c.src = imgSrc('img/vk_' + n + '.png'); this.casas[n] = c; }
  },
  // folha: uma faixa por variante; 3 direções (down, up, right) x 4 quadros (parado, passo, passo, golpe)
  sheet(v) {
    if (this.cache[v]) return this.cache[v];
    if (!this.ok) { const c = Sprites.cv(20, 30), x = c.getContext('2d'); x.fillStyle = '#5a6068'; x.fillRect(5, 4, 10, 24); const a = [c, c, c]; return { type: 'hum', white: {}, down: a, up: a, left: a, right: a, w: 20, h: 30, placeholder: true, real: () => this.ok ? this.sheet(v) : null }; }
    const FW = this.img.width / 12, FH = this.img.height / VK_VARS.length;
    const q = (d, i, flip) => { const c = Sprites.cv(FW, FH), x = c.getContext('2d'); if (flip) { x.translate(FW, 0); x.scale(-1, 1); } x.drawImage(this.img, (d * 4 + i) * FW, v * FH, FW, FH, 0, 0, FW, FH); return c; };
    const S = { type: 'hum', white: {} };
    S.down = [0, 1, 2].map(i => q(0, i)); S.up = [0, 1, 2].map(i => q(1, i)); S.right = [0, 1, 2].map(i => q(2, i)); S.left = [0, 1, 2].map(i => q(2, i, true));
    S.atk = { type: 'hum', white: {}, down: [q(0, 3)], up: [q(1, 3)], right: [q(2, 3)], left: [q(2, 3, true)] };
    S.w = FW; S.h = FH;
    return (this.cache[v] = S);
  }
};
(function () {
  const a0 = Sprites.actor;
  Sprites.actor = function (L) { if (L && L.k === 'viking') return Vikings.sheet(L.v || 0); return a0.apply(this, arguments); };
})();

const Hrimgard = {
  // quanto este ponto está dentro da geleira (0 fora, 1 no centro), com a borda recortada
  mask(W, x, y) {
    const nx = (x - HRIM.x) / HRIM.rx, ny = (y - HRIM.y) / HRIM.ry;
    const rug = W.nW.noise(x / 90 + 17.3, y / 90 - 5.1) * 0.12 + W.nW.noise(x / 30, y / 30) * 0.03;
    let g = 1 - (Math.sqrt(nx * nx + ny * ny) + rug);
    // istmo de gelo que liga a geleira às Terras de Nordheim (dá para chegar a pé)
    const P = HRIM_PONTE, vx = P.x1 - P.x0, vy = P.y1 - P.y0, t = clamp(((x - P.x0) * vx + (y - P.y0) * vy) / (vx * vx + vy * vy), 0, 1);
    const dp = Math.hypot(x - (P.x0 + vx * t), y - (P.y0 + vy * t)) / P.r;
    g = Math.max(g, (1 - dp - rug * 0.8) * 0.55);
    if (g <= 0) return 0;
    // não toca nas cidades, masmorras e ilhas que já existiam
    for (const e of W.hrim.ex) { const k = (Math.hypot(x - e.x, y - e.y) - e.r) / 30; if (k < 1) g *= Math.max(0, k); }
    return g;
  },
  // ---------- o terreno ----------
  tile(W, x, y, t) {
    const g = this.mask(W, x, y); if (g <= 0) return t;
    const e0 = W._e, rugo = fbm(W.nM, x / 60, y / 60, 3);
    const e = Math.max(e0, 0.31 + g * 0.6 + rugo * 0.05);
    if (g > 0.08) W._r = W.hrim.idx;
    W._e = e;
    if (e < 0.3) return T.DEEP;
    if (e < 0.37) return T.ICE;                                                // banquisa: o mar congelado da costa
    if (g > 0.3 && fbm(W.nE, x / 150 + 40, y / 150, 4) > 0.36) return T.SNOWROCK;   // penhascos de gelo
    if (Math.abs(fbm(W.nR, x / 160 + 9, y / 160, 3)) < 0.05) return T.ICE;    // rios e lagos congelados
    return T.SNOW;
  },
  // ---------- geração (depois do mundo inteiro pronto) ----------
  gerar(W) {
    const idx = W.regions.length;
    W.regions.push({ id: 'hrimgard', name: 'Geleira de Hrimgard', short: 'Hrimgard', race: 'nordico', biome: 'snow', lvl: HRIM_LVL.slice(), mount: 0.05, culture: 'viking', cont: 0, cx: HRIM.x, cy: HRIM.y, index: idx, hostile: true, towns: 0, villages: 0, dungeons: 0, geleira: true });
    const ex = [];
    const perto = (x, y, m) => x > HRIM.x - HRIM.rx - m && x < HRIM.x + HRIM.rx + m && y > HRIM.y - HRIM.ry - m && y < HRIM.y + HRIM.ry + m;
    for (const s of W.settlements) if (perto(s.mid ? s.mid.x : s.x, s.mid ? s.mid.y : s.y, 60)) ex.push({ x: s.mid ? s.mid.x : s.x, y: s.mid ? s.mid.y : s.y, r: 40 });
    for (const d of W.dungeons.concat(W.pois)) if (perto(d.x, d.y, 40)) ex.push({ x: d.x, y: d.y, r: 14 });
    for (const i of W.ilhas || []) if (perto(i.x, i.y, (i.rx || 60) + 40)) ex.push({ x: i.x, y: i.y, r: Math.max(i.rx || 60, i.ry || 60) + 12 });
    W.hrim = { idx, ex, vilas: [], torres: [], casas: [], drakkar: null };
    // trechos que já tinham sido calculados nessa área são refeitos com o gelo
    for (let cy = Math.floor((HRIM.y - HRIM.ry - 40) / 32); cy <= Math.ceil((HRIM_PONTE.y1 + HRIM_PONTE.r + 40) / 32); cy++)
      for (let cx = Math.floor((HRIM.x - HRIM.rx - 40) / 32); cx <= Math.ceil((HRIM.x + HRIM.rx + 40) / 32); cx++) {
        if (cx < 0 || cy < 0) continue; const k = W.ckey(cx, cy); W.chunks.delete(k); if (W.dropCanvas) W.dropCanvas(k);
      }
    const rng = new RNG(W.seed * 13 + 4207);
    const plano = (x, y, w, h) => { for (let yy = y - h; yy <= y + 2; yy++) for (let xx = x - w; xx <= x + w; xx++) { const t = W.baseTile(xx, yy); if (t !== T.SNOW && t !== T.ICE) return false; } return this.mask(W, x, y) > 0.3; };
    const acha = (cx, cy, raio, w, h, longe) => {
      for (let k = 0; k < 600; k++) {
        const a = rng.next() * Math.PI * 2, r = rng.next() * raio, x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * 0.7);
        if (plano(x, y, w, h) && longe.every(o => Math.hypot(o.x - x, o.y - y) > o.r)) return { x, y };
      }
      return null;
    };
    // três aldeias: a do jarl no centro e duas menores
    const centros = [[HRIM.x + 10, HRIM.y - 10], [HRIM.x - 150, HRIM.y + 40], [HRIM.x + 150, HRIM.y + 20]];
    centros.forEach(([cx, cy], i) => {
      const p = acha(cx, cy, 110, 18, 10, W.hrim.vilas.map(v => ({ x: v.x, y: v.y, r: 70 }))); if (!p) return;
      const v = { id: 'hv' + i, x: p.x, y: p.y, nome: ['Jarlsby', 'Frostheim', 'Vargvik'][i], jarl: i === 0 };
      W.hrim.vilas.push(v); this.carimbaVila(W, v, rng);
    });
    // torres de vigia na borda sul e leste (por onde se chega de Nordheim)
    for (let k = 0; k < 7; k++) {
      const a = Math.PI * (0.05 + k * 0.13), x = Math.round(HRIM.x + Math.cos(a) * HRIM.rx * 0.72), y = Math.round(HRIM.y + Math.sin(a) * HRIM.ry * 0.72);
      const p = acha(x, y, 30, 2, 2, W.hrim.torres.map(t => ({ x: t.x, y: t.y, r: 30 })));
      if (!p) continue;
      const t = { x: p.x, y: p.y }; W.hrim.torres.push(t); this.bloqueia(W, p.x - 1, p.y - 1, 3, 2);
      W.hrim.casas.push({ img: 'torre_vigia', tx: p.x, ty: p.y });
    }
    // o drakkar fica encalhado na banquisa mais perto da aldeia do jarl
    const vj = W.hrim.vilas[0];
    if (vj) for (let r = 20; r < 160 && !W.hrim.drakkar; r += 3) for (let a = 0; a < 24 && !W.hrim.drakkar; a++) {
      const x = Math.round(vj.x + Math.cos(a / 24 * Math.PI * 2) * r), y = Math.round(vj.y + Math.sin(a / 24 * Math.PI * 2) * r);
      let ok = true; for (let yy = y - 2; yy <= y; yy++) for (let xx = x - 5; xx <= x + 5; xx++) if (W.baseTile(xx, yy) !== T.ICE) ok = false;
      if (ok) { W.hrim.drakkar = { x, y }; W.hrim.casas.push({ img: 'drakkar', tx: x, ty: y }); this.bloqueia(W, x - 4, y - 1, 9, 2); }
    }
  },
  bloqueia(W, x0, y0, w, h) {
    const tiles = new Uint8Array(w * h).fill(255), objs = new Uint8Array(w * h).fill(O.BLOCK);
    W.addStamp({ x0, y0, w, h, tiles, objs, hrim: true });
  },
  carimbaVila(W, v, rng) {
    // chão pisado em volta da aldeia, sem árvores
    const R = 15, w = R * 2 + 1, tiles = new Uint8Array(w * w).fill(255), objs = new Uint8Array(w * w).fill(255);
    for (let y = -R; y <= R; y++) for (let x = -R; x <= R; x++) {
      const d = Math.hypot(x, y * 1.3); if (d > R) continue;
      const i = (y + R) * w + (x + R); objs[i] = 0;
      if (d < 4) tiles[i] = T.TUNDRA;   // só em volta da fogueira a neve derreteu
    }
    const put = (x, y, o) => { if (Math.abs(x) <= R && Math.abs(y) <= R) objs[(y + R) * w + (x + R)] = o; };
    put(0, 3, O.CAMPFIRE); put(-2, 4, O.PELT); put(2, 4, O.BENCH); put(-3, 2, O.BARREL); put(3, 2, O.KEG); put(-9, -1, O.WEAPONRACK); put(6, 9, O.CRATE); put(-6, 9, O.HAY);
    W.addStamp({ x0: v.x - R, y0: v.y - R, w, h: w, tiles, objs, hrim: true });
    // casas: o salão do jarl (ou uma casa longa) no fundo e casas longas em volta
    const lista = v.jarl ? [['salao_jarl', 0, -3, 11], ['casa_longa', -12, 7, 7], ['casa_longa', 12, 7, 7], ['casa_longa', 0, 12, 7]] : [['casa_longa', -8, -3, 7], ['casa_longa', 8, -3, 7], ['casa_longa', 0, 10, 7]];
    for (const [img, dx, dy, larg] of lista) {
      const tx = v.x + dx, ty = v.y + dy, meia = larg >> 1;
      this.bloqueia(W, tx - meia, ty - 2, larg + 1, 3);
      const c = { img, tx, ty, vila: v }; W.hrim.casas.push(c);
      if (img === 'salao_jarl') v.salao = c;
    }
    for (const dx of [-5, 5]) { this.bloqueia(W, v.x + dx, v.y + 1, 1, 1); W.hrim.casas.push({ img: 'pedra_runica', tx: v.x + dx, ty: v.y + 1 }); }
  },
  em(tx, ty) { const W = Game.world; return !!(W && W.hrim && W.regAt(tx, ty) === W.hrim.idx); },
  // ---------- desenho ----------
  drawables(D, camX, camY, vw, vh) {
    const W = Game.world; if (!Game.level.isWorld || !W.hrim) return;
    for (const c of W.hrim.casas) {
      const im = Vikings.casas[c.img]; if (!im || !im.width) continue;
      const x = c.tx * 16 + 8 - (im.width >> 1), base = (c.ty + 1) * 16, y = base - im.height + 2;
      if (x - camX > vw + 10 || x + im.width - camX < -10 || y - camY > vh + 10 || base - camY < -10) continue;
      D.push({ y: base, img: im, x, yy: y });
    }
  },
  findInteract(fx, fy) {
    const W = Game.world; if (!Game.level.isWorld || !W.hrim) return null;
    for (const v of W.hrim.vilas) {
      const s = v.salao; if (!s) continue;
      const dx = s.tx * 16 + 8, dy = (s.ty + 1) * 16 + 4, d = dist(fx, fy, dx, dy);
      if (d < 26) return { kind: 'mar', d, label: 'Entrar', name: 'Salão do Jarl', fn: () => this.entrarSalao(v) };
    }
    return null;
  },
  // ---------- perigo: entrada, frio, nevasca, alarme das torres e as aldeias guarnecidas ----------
  tick() {
    const G = Game, W = G.world; if (!G.level || !G.level.isWorld || !W || !W.hrim || !G.player) return;
    const P = G.player, tx = Math.floor(P.x / 16), ty = Math.floor(P.y / 16), dentro = this.em(tx, ty);
    if (dentro && !this.dentro) {
      G.centerMsg('GELEIRA DE HRIMGARD', 'Território dos clãs vikings. Poucos voltam vivos.');
      G.toast('❄ O gelo aqui nunca derrete. O frio é mortal: roupas de pele e fogueiras são a sua vida.', '#a0d8ff');
    }
    this.dentro = dentro;
    if (dentro) { G.weather.kind = 'nevasca'; G.weather.t = Math.max(G.weather.t || 0, 8); }
    // torres de vigia: quem é visto ouve a trompa, e um bando de guerreiros sai à caça
    this.alarmeT = Math.max(0, (this.alarmeT || 0) - 1);
    for (const t of W.hrim.torres) {
      if (this.alarmeT > 0) break;
      if (Math.hypot(t.x - tx, t.y - ty) < 26) {
        this.alarmeT = 80; Sfx.play && Sfx.play('horn');
        G.centerMsg('🎺 A TROMPA DE GUERRA!', 'A sentinela viu você. Um bando viking vem caçar.');
        const n = 4 + Math.floor(Math.random() * 3);
        for (let k = 0; k < n; k++) { const m = this.viking(['viking_guerreiro', 'viking_berserker', 'viking_arqueiro'][k % 3], t.x * 16 + (Math.random() - 0.5) * 60, t.y * 16 + 30 + Math.random() * 30); m.target = P; m.aggro = 900; m.hrimBando = true; }
      }
    }
    // aldeias: guarnição quando você chega perto, some quando você vai embora
    for (const v of W.hrim.vilas) {
      const d = Math.hypot(v.x - tx, v.y - ty);
      if (d < 75 && !v.ativa && (v.saqueada || -99) < G.day - 2) {
        v.ativa = true;
        const n = v.jarl ? 10 : 7, ids = ['viking_guerreiro', 'viking_guerreiro', 'viking_berserker', 'viking_arqueiro'];
        for (let k = 0; k < n; k++) { const m = this.viking(ids[k % ids.length], (v.x + (Math.random() - 0.5) * 22) * 16, (v.y + 2 + (Math.random() - 0.5) * 14) * 16); m.hrimVila = v; m.home = { x: m.x, y: m.y }; }
        for (let k = 0; k < 4; k++) { const m = this.viking('viking_aldea', (v.x + (Math.random() - 0.5) * 16) * 16, (v.y + 4 + Math.random() * 6) * 16); m.hrimVila = v; }
      } else if (d > 130 && v.ativa) {
        v.ativa = false; G.actors = G.actors.filter(a => a.hrimVila !== v);
      } else if (v.ativa && !G.actors.some(a => a.hrimVila === v && !a.dead && a.eid !== 'viking_aldea')) {
        v.ativa = false; v.saqueada = G.day;
        G.centerMsg('ALDEIA DERROTADA', `Os guerreiros de ${v.nome} caíram. Eles voltam em alguns dias.`);
      }
    }
    // o bando que se afastou demais volta para a geleira
    G.actors = G.actors.filter(a => !a.hrimBando || a.dead || dist(a.x, a.y, P.x, P.y) < 900);
  },
  viking(id, x, y) {
    const G = Game, lvl = clamp(G.player.level + 8, HRIM_LVL[0], HRIM_LVL[1]);
    const m = new Monster(id, x, y, ENEMIES[id].boss ? lvl + 5 : lvl);
    G.findFree(m); G.actors.push(m); return m;
  },
  // ---------- o salão do jarl ----------
  entrarSalao(v) {
    const G = Game, P = G.player, s = v.salao;
    G.worldPos = { x: s.tx * 16 + 8, y: (s.ty + 2) * 16 + 8 };
    const L = new SalaoJarl(v);
    G.level = L; P.mounted = false;
    const keep = G.actors.filter(a => a.team === 'ally' && a.follow && !a.dead);
    G.actors = keep;
    P.x = L.porta.x * 16 + 8; P.y = (L.porta.y - 1) * 16 + 8; G.findFree(P);
    for (const a of keep) { a.x = P.x + 10; a.y = P.y - 4; G.findFree(a); }
    const vivo = !G.mods.cleared.hrim_jarl;
    if (vivo) {
      const j = this.viking('viking_jarl', L.trono.x * 16 + 8, (L.trono.y + 2) * 16); j.hrimJarl = true; j.home = { x: j.x, y: j.y };
      for (const [dx, dy] of [[-4, 3], [4, 3], [-7, 7], [7, 7], [-3, 10], [3, 10]]) { const m = this.viking(dy < 8 ? 'viking_guerreiro' : 'viking_berserker', (L.trono.x + dx) * 16 + 8, (L.trono.y + dy) * 16); m.home = { x: m.x, y: m.y }; }
    }
    G.projectiles = []; G.clouds = []; G.pickups = []; G.timers = G.timers.filter(t => t.keep);
    G.camX = P.x - G.vw / 2; G.camY = P.y - G.vh / 2; G.flow = null;
    Sfx.play('door'); UI.fade();
    G.toast(vivo ? '🪓 O Jarl Hrolf levanta do trono: "Quem ousa entrar no meu salão?!"' : 'O salão está quieto. O trono do jarl está vazio.', '#ffd0a0');
  }
};

// ---------- interior do salão: fogueira longa no meio, mesas, peles e o trono ----------
class SalaoJarl {
  constructor(v) {
    this.isWorld = false; this.isInterior = false; this.isSalaoJarl = true; this.dark = true;
    this.name = 'Salão do Jarl de ' + v.nome; this.regIndex = Game.world.hrim.idx;
    const W = this.w = 34, H = this.h = 22;
    this.tiles = new Uint8Array(W * H).fill(T.LOGWALL); this.objs = new Uint8Array(W * H);
    for (let y = 2; y < H - 1; y++) for (let x = 1; x < W - 1; x++) this.tiles[y * W + x] = T.WOOD;
    this.trono = { x: W >> 1, y: 3 }; this.porta = { x: W >> 1, y: H - 1 };
    const put = (x, y, o) => { if (x > 0 && y > 0 && x < W - 1 && y < H - 1) this.objs[y * W + x] = o; };
    put(this.trono.x, this.trono.y, O.THRONE); put(this.trono.x - 2, this.trono.y, O.BANNER); put(this.trono.x + 2, this.trono.y, O.BANNER);
    for (let y = 7; y <= 16; y += 3) put(W >> 1, y, O.CAMPFIRE);                                   // a fogueira comprida do salão
    for (let y = 6; y <= 17; y++) { if (y % 2) { put((W >> 1) - 5, y, O.TABLE); put((W >> 1) + 5, y, O.TABLE); } else { put((W >> 1) - 6, y, O.BENCH); put((W >> 1) + 6, y, O.BENCH); } }
    for (let x = 3; x < W - 3; x += 4) { put(x, 2, O.WEAPONRACK); }
    for (let y = 4; y < H - 2; y += 3) { put(1, y, O.TORCH); put(W - 2, y, O.TORCH); }   // tochas nas paredes
    for (let x = 2; x < W - 2; x += 5) put(x, H - 2, O.TORCH);
    for (const [x, y, o] of [[2, 6, O.KEG], [2, 8, O.BARREL], [W - 3, 6, O.KEG], [W - 3, 8, O.BARREL], [3, H - 4, O.PELT], [W - 4, H - 4, O.PELT], [2, 12, O.TROPHY], [W - 3, 12, O.TROPHY]]) put(x, y, o);
    if (Game.mods.cleared.hrim_jarl) put(this.trono.x, this.trono.y + 2, O.CHEST_OPEN);
    this.objs[this.porta.y * W + this.porta.x] = O.DOOR_IN; this.tiles[this.porta.y * W + this.porta.x] = T.WOOD;
    this.canvas = null;
  }
  inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  tileAt(tx, ty) { return this.inb(tx, ty) ? this.tiles[ty * this.w + tx] : T.LOGWALL; }
  objAt(tx, ty) { return this.inb(tx, ty) ? this.objs[ty * this.w + tx] : 0; }
  regAt() { return this.regIndex; }
  setObj(tx, ty, o) { if (!this.inb(tx, ty)) return; const i = ty * this.w + tx, old = this.objs[i]; this.objs[i] = o; if (OBJ_BAKED[old] || OBJ_BAKED[o]) this.canvas = null; }
  solidAt(tx, ty) { if (!this.inb(tx, ty)) return true; const i = ty * this.w + tx; return TSOLID[this.tiles[i]] || OSOLID[this.objs[i]]; }
  render() {
    const c = Sprites.cv(this.w * 16, this.h * 16), ctx = c.getContext('2d');
    Sprites.paintTiles(ctx, this.w, this.h, (x, y) => this.tileAt(x, y), 7311);
    // tapete vermelho até o trono e escudos pendurados nas paredes
    ctx.fillStyle = 'rgba(120,20,20,0.55)'; ctx.fillRect((this.w >> 1) * 16 + 2, 4 * 16, 12, (this.h - 5) * 16);
    const cores = ['#8a1a14', '#203a6a', '#9a7a30', '#1a4a24'];
    for (let x = 2; x < this.w - 2; x += 3) { const cx = x * 16 + 8, cy = 16 + 6; ctx.fillStyle = '#1a1210'; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, 7); ctx.fill(); ctx.fillStyle = cores[x % 4]; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, 7); ctx.fill(); ctx.fillStyle = '#c0c0c8'; ctx.fillRect(cx - 1, cy - 1, 3, 3); }
    for (let i = 0; i < this.w * this.h; i++) {
      const o = this.objs[i]; if (!OBJ_BAKED[o]) continue;
      const x = i % this.w, y = (i / this.w) | 0, s = Sprites.obj(o, Math.floor(hash2(x, y, 5) * (OBJ_VARIANTS[o] || 1)));
      ctx.drawImage(s.c, x * 16 + 8 - (s.w >> 1), y * 16 + 16 - s.h + s.oy);
    }
    this.canvas = c;
  }
  drawGround(ctx, camX, camY, vw, vh) {
    if (!this.canvas) this.render();
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, vw, vh);
    ctx.drawImage(this.canvas, -camX, -camY);
  }
}

// ---------- ganchos ----------
(function () {
  Vikings.carregar();
  // o terreno da geleira por cima do mundo (só depois que ele estiver pronto)
  const bt0 = World.prototype.baseTile;
  World.prototype.baseTile = function (x, y) {
    const t = bt0.call(this, x, y);
    if (!this.hrim || x < 0 || y < 0 || x > HRIM.x + HRIM.rx + 30 || y > HRIM_PONTE.y1 + HRIM_PONTE.r + 10) return t;
    return Hrimgard.tile(this, x, y, t);
  };
  const gs0 = World.prototype.generateSites;
  World.prototype.generateSites = function () { gs0.call(this); try { Hrimgard.gerar(this); } catch (e) { console.error('hrimgard', e); this.hrim = null; } };
  // desenho, interação e o tique de 1 segundo vão junto com os da alcateia Nyxar
  const nd0 = Nyxar.drawables; Nyxar.drawables = function () { nd0.apply(this, arguments); Hrimgard.drawables.apply(Hrimgard, arguments); };
  const nf0 = Nyxar.findInteract; Nyxar.findInteract = function (fx, fy) { const a = nf0.apply(this, arguments), b = Hrimgard.findInteract(fx, fy); return !a ? b : !b ? a : (b.d < a.d ? b : a); };
  const nm0 = Nyxar.manage; Nyxar.manage = function () { nm0.apply(this, arguments); try { Hrimgard.tick(); } catch (e) { console.warn('hrimgard', e); } };
  // o frio de Hrimgard é o pior do mundo, em qualquer estação
  const fa0 = Inverno.frioAqui; Inverno.frioAqui = function () {
    const f = fa0.apply(this, arguments), G = Game, P = G.player;
    if (!G.level || !G.level.isWorld || !P || !Hrimgard.em(Math.floor(P.x / 16), Math.floor(P.y / 16))) return f;
    return Math.max(f, G.world.settlementAt(Math.floor(P.x / 16), Math.floor(P.y / 16)) ? 1.2 : 2.6);
  };
  // morte do jarl: o salão fica conquistado para sempre
  const od0 = Monster.prototype.die;
  if (od0) Monster.prototype.die = function () {
    const r = od0.apply(this, arguments);
    if (this.hrimJarl && !Game.mods.cleared.hrim_jarl) {
      Game.mods.cleared.hrim_jarl = true;
      Game.centerMsg('O JARL CAIU!', 'Hrolf Punho-de-Gelo foi derrotado. Hrimgard vai lembrar o seu nome.');
      if (Game.player.addHonra) Game.player.addHonra(10);
    }
    return r;
  };
})();
// a trompa de guerra das torres de vigia: duas notas graves e longas
(function () {
  const p0 = Sfx.play;
  Sfx.play = function (name) {
    if (name !== 'horn') return p0.apply(this, arguments);
    if (!this.ctx || !this.sfxOn) return;
    this.tone(110, 1.1, 'sawtooth', 0.12, 0, 0); this.tone(165, 1.4, 'sawtooth', 0.1, -8, 0.9); this.tone(55, 2.2, 'triangle', 0.14, 0, 0);
  };
})();
