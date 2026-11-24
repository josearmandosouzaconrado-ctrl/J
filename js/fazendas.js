'use strict';
// =====================================================================
//  FAZENDAS — grandes fazendas no campo, fora das vilas e cidades
//  Cada fazenda tem a casa do fazendeiro (dá para entrar), um celeiro,
//  um poço, plantações em fileiras com fardos de feno e um pasto cercado
//  com vacas (às vezes porcos e galinhas no terreiro). Os fazendeiros
//  têm rotina: saem de casa cedo, trabalham na lavoura e no pasto, almoçam
//  em casa e voltam ao anoitecer (js/rotina.js).
//  As fazendas aparecem perto das vilas e cidades dos povos que plantam
//  (nunca no deserto, na neve, nos vulcões ou nas terras sem lei).
// =====================================================================
const FAZ_TERRA = new Set([T.GRASS, T.DGRASS, T.SAVANNA, T.ELFGRASS, T.DIRT, T.DEADGRASS]);
const FAZ_NOMES = ['dos Carvalhos', 'Boa Vista', 'do Moinho Velho', 'Três Riachos', 'do Vale', 'Santa Clara', 'da Colina', 'dos Girassóis', 'Água Fria', 'do Ipê', 'Sete Vacas', 'do Trigo Alto', 'Pedra Branca', 'do Sol', 'Bela Aurora', 'do Pomar', 'da Ponte', 'Campo Largo', 'dos Ventos', 'do Feno'];
const Fazendas = {
  FW: 34, FH: 24,
  // ---------- geração (no fim da criação do mundo) ----------
  gerar(W) {
    const rng = new RNG(W.seed * 59 + 7);
    W.fazendas = [];
    const { FW, FH } = this;
    let n = 0;
    for (const s of W.settlements) {
      if ((s.type !== 'village' && s.type !== 'town') || s.port || s.region.hostile || s.region.neutral || s.pirata) continue;
      const b = s.region.biome;
      if (b === 'desert' || b === 'snow' || b === 'volcanic' || b === 'dead' || b === 'obsidian' || b === 'crystal' || b === 'cosmic' || b === 'reef' || b === 'dusk') continue;
      const quantas = s.type === 'village' ? (rng.chance(0.75) ? 1 + (rng.chance(0.3) ? 1 : 0) : 0) : (rng.chance(0.55) ? 1 : 0);
      for (let q = 0; q < quantas; q++) {
        let pos = null;
        for (let t = 0; t < 14 && !pos; t++) {
          const ang = rng.range(0, Math.PI * 2), d = s.w / 2 + 14 + rng.range(0, 26);
          const x0 = Math.round(s.mid.x + Math.cos(ang) * d - FW / 2), y0 = Math.round(s.mid.y + Math.sin(ang) * d - FH / 2);
          if (this.cabe(W, x0, y0)) pos = { x0, y0 };
        }
        if (!pos) continue;
        this.carimbar(W, pos.x0, pos.y0, s, rng, n++);
      }
    }
  },
  cabe(W, x0, y0) {
    const { FW, FH } = this, m = 3;
    for (const o of W.settlements) if (x0 - m < o.x0 + o.w && x0 + FW + m > o.x0 && y0 - m < o.y0 + o.h && y0 + FH + m > o.y0) return false;
    for (const f of W.fazendas) if (x0 - m < f.x0 + f.w && x0 + FW + m > f.x0 && y0 - m < f.y0 + f.h && y0 + FH + m > f.y0) return false;
    for (const l of [W.dungeons, W.pois]) for (const o of l) if (o.x > x0 - 8 && o.x < x0 + FW + 8 && o.y > y0 - 8 && o.y < y0 + FH + 8) return false;
    for (let y = y0; y < y0 + FH; y += 3) for (let x = x0; x < x0 + FW; x += 3) {
      const t = W.baseTile(x, y); if (!FAZ_TERRA.has(t) || W._e > 0.66) return false;
      if (W.roadTiles.has(tkey(x, y))) return false;
    }
    return true;
  },
  carimbar(W, x0, y0, s, rng, n) {
    const { FW, FH } = this, N = FW * FH;
    const tiles = new Uint8Array(N).fill(255), objs = new Uint8Array(N).fill(0), occ = new Uint8Array(N);
    const set = (x, y, t, o) => { if (x < 0 || y < 0 || x >= FW || y >= FH) return; const i = y * FW + x; if (t !== null) tiles[i] = t; if (o !== undefined) objs[i] = o; };
    const nome = 'Fazenda ' + FAZ_NOMES[(n * 7 + rng.int(0, 19)) % FAZ_NOMES.length];
    const f = { id: 'faz' + n, name: nome, type: 'fazenda', fazenda: true, region: s.region, perto: s, x0, y0, w: FW, h: FH, buildings: [], mid: { x: x0 + 16, y: y0 + 9 }, npcSpots: [], gates: [], lamps: [] };
    // terreiro e caminhos de terra
    for (let x = 1; x < FW - 1; x++) { set(x, 8, T.DIRT); set(x, 9, T.DIRT); }
    for (let y = 8; y < FH; y++) { set(16, y, T.DIRT); set(17, y, T.DIRT); }
    for (let y = 2; y < 8; y++) for (let x = 2; x < 17; x++) set(x, y, rng.chance(0.75) ? T.DIRT : null);
    // casa do fazendeiro e celeiro
    const casa = W.placeBuilding(f, 'house2', 3, 3, rng, objs, occ, FW, CULTURES[s.region.culture] || CULTURES.human);
    casa.name = 'Casa da ' + nome;
    const cel = W.placeBuilding(f, 'stable', 10, 3, rng, objs, occ, FW, CULTURES[s.region.culture] || CULTURES.human, true);
    cel.name = 'Celeiro'; cel.spec = Object.assign({}, cel.spec, { roof: '#8a2a1e', wall: '#a8502e' });
    for (let y = 6; y <= 7; y++) set(5, y, T.DIRT);
    set(8, 6, T.DIRT, O.WELL); set(2, 7, null, O.BARREL); set(9, 7, null, O.CRATE);
    for (const [x, y] of [[16, 4], [15, 6], [13, 7]]) set(x, y, null, O.HAY);
    // plantações em fileiras (esquerda, embaixo)
    for (let y = 11; y < FH - 1; y++) for (let x = 1; x < 15; x++) {
      if (y % 3 === 1) { set(x, y, T.DIRT); if (x % 6 === 3 && rng.chance(0.5)) set(x, y, T.DIRT, O.HAY); continue; }
      set(x, y, T.FARM, rng.chance(0.9) ? O.CROP : 0);
    }
    // pasto cercado (direita) com porteira para o caminho
    const px0 = 19, px1 = FW - 2, py0 = 2, py1 = FH - 2;
    for (let x = px0; x <= px1; x++) { set(x, py0, null, O.FENCE); set(x, py1, null, O.FENCE); }
    for (let y = py0; y <= py1; y++) { set(px0, y, null, y === 8 || y === 9 ? 0 : O.FENCE); set(px1, y, null, O.FENCE); }
    for (let y = py0 + 1; y < py1; y++) for (let x = px0 + 1; x < px1; x++) set(x, y, rng.chance(0.6) ? T.GRASS : T.DGRASS, rng.chance(0.03) ? O.HAY : rng.chance(0.04) ? O.FLOWERS : 0);
    set(px0 + 3, py0 + 2, null, O.WELL);
    f.pasto = { x0: (x0 + px0 + 1) * 16, y0: (y0 + py0 + 1) * 16 + 8, x1: (x0 + px1) * 16, y1: (y0 + py1) * 16 };
    f.vacas = 3 + rng.int(0, 4);
    // os fazendeiros (moram na casa e trabalham na lavoura)
    const nF = 2 + rng.int(0, 2);
    for (let i = 0; i < nF; i++) f.npcSpots.push({ role: 'citizen', x: x0 + 6 + i * 2, y: y0 + 8 });
    W.addStamp({ x0, y0, w: FW, h: FH, tiles, objs });
    W.fazendas.push(f);
  },
  // ---------- moradores e bichos quando o jogador chega perto ----------
  tT: 0,
  tick(dt) {
    const G = Game, W = G.world, P = G.player;
    if (!W || !W.fazendas || !P || G.level !== W) return;
    this.tT -= dt; if (this.tT > 0) return; this.tT = 0.6;
    const ptx = P.x / 16, pty = P.y / 16;
    for (const f of W.fazendas) {
      const d = dist(ptx, pty, f.mid.x, f.mid.y);
      if (!f.active && d < 60) {
        f.active = true; f.npcs = [];
        const rng = new RNG(hashStr(f.id) + W.seed);
        for (const spot of f.npcSpots) {
          const a = new NPC(spot, f, rng);
          a.name = a.name.split(' ')[0] + ' ' + (a.sex === 'f' ? 'a Fazendeira' : 'o Fazendeiro');
          a.look = Object.assign({}, a.look, { hat: rng.chance(0.7) ? 'straw' : a.look.hat, hatC: '#d8b860', apron: undefined, robe: false });
          a.S = Sprites.actor(a.look);
          G.findFree(a); a.home = { x: a.x, y: a.y };
          a.fazendeiro = true;
          f.npcs.push(a); G.actors.push(a);
        }
      } else if (f.active && d > 95) {
        f.active = false; const set = new Set(f.npcs); f.npcs = null;
        G.actors = G.actors.filter(a => !set.has(a));
      }
      // vacas no pasto (bichos de enfeite da fauna, presos na cerca)
      if (f.active && f.pasto && typeof Fauna !== 'undefined') {
        const em = Fauna.L.filter(a => a.cerca === f.pasto).length;
        const vis = f.pasto.x1 > G.camX - 200 && f.pasto.x0 < G.camX + G.vw + 200 && f.pasto.y1 > G.camY - 200 && f.pasto.y0 < G.camY + G.vh + 200;
        if (vis && em < f.vacas) {
          const p = f.pasto, x = p.x0 + Math.random() * (p.x1 - p.x0), y = p.y0 + Math.random() * (p.y1 - p.y0);
          const k = em < f.vacas - 1 || Math.random() < 0.7 ? 'vaca' : Math.random() < 0.5 ? 'porco' : 'ovelha';
          Fauna.L.push({ k, x, y, vx: 0, vy: 0, t: Math.random() * 10, mude: 0, dir: Math.random() < 0.5 ? 1 : -1, st: 'anda', f: Math.random() * 6, cor: k === 'vaca' ? (Math.random() < 0.6 ? 'malhada' : '#8a5a34') : undefined, cerca: f.pasto });
        }
      }
    }
  }
};
// ---------- ganchos ----------
(function () {
  const g0 = World.prototype.generateSites;
  World.prototype.generateSites = function () { g0.apply(this, arguments); try { Fazendas.gerar(this); } catch (e) { console.warn('Fazendas', e); this.fazendas = []; } };
  const b0 = World.prototype.buildingsInView;
  World.prototype.buildingsInView = function (x0, y0, x1, y1) {
    const out = b0.call(this, x0, y0, x1, y1);
    for (const f of this.fazendas || []) { if (f.x0 * 16 > x1 + 64 || (f.x0 + f.w) * 16 < x0 - 64 || f.y0 * 16 > y1 + 160 || (f.y0 + f.h) * 16 < y0 - 64) continue; for (const b of f.buildings) out.push(b); }
    return out;
  };
  // as vacas não pulam a cerca
  const m0 = Fauna.mover.bind(Fauna);
  Fauna.mover = function (W, a, dt, dp, P) {
    m0(W, a, dt, dp, P);
    const c = a.cerca; if (!c) return;
    if (a.x < c.x0) { a.x = c.x0; a.vx = Math.abs(a.vx || 0); } if (a.x > c.x1) { a.x = c.x1; a.vx = -Math.abs(a.vx || 0); }
    if (a.y < c.y0) { a.y = c.y0; a.vy = Math.abs(a.vy || 0); } if (a.y > c.y1) { a.y = c.y1; a.vy = -Math.abs(a.vy || 0); }
  };
  const t0 = Inverno.tick.bind(Inverno);
  Inverno.tick = function (dt) { t0(dt); try { Fazendas.tick(dt); } catch (e) { if (!Fazendas._err) { Fazendas._err = 1; console.warn('Fazendas', e); } } };
})();
