'use strict';
// =====================================================================
//  DOMÍNIOS NOBRES, MANSÕES E ARMADURAS
//  • Cada reino tem 3 casas nobres (Duque, Conde e Barão). Agora cada uma
//    governa uma parte das terras do reino: uma cidade-sede e as vilas mais
//    perto dela. As terras perto da capital são da Coroa.
//  • Cada casa tem uma mansão grande perto da sua sede, com muro, jardim,
//    fontes, estátuas, estandartes e guardas. Nenhuma é igual: muda o
//    tamanho, as alas, as torres, o telhado, a pedra, as janelas, as cores e
//    o brasão. Dá para entrar e conversar com o chefe da casa.
//  • Brasões e armaduras: cada casa tem as suas cores e o seu elmo; cada
//    reino ganhou um uniforme próprio (cor de detalhe, elmo, escudo, ombreiras).
//    Parte dos soldados dos exércitos são tropas das casas nobres, com as
//    cores e o elmo da casa ("Soldado da Casa de ...").
// =====================================================================
const HER_COR = ['#a81c1c', '#1c3a8c', '#1c6a2c', '#5a1c7a', '#202020', '#b85a10', '#1c6a7a', '#7a1c3a', '#2a2a6a', '#6a4a1c'];
const HER_NOME = { '#a81c1c': 'vermelho', '#1c3a8c': 'azul', '#1c6a2c': 'verde', '#5a1c7a': 'púrpura', '#202020': 'negro', '#b85a10': 'laranja', '#1c6a7a': 'azul-petróleo', '#7a1c3a': 'vinho', '#2a2a6a': 'anil', '#6a4a1c': 'castanho', '#f0cc40': 'ouro', '#e8e8f0': 'prata' };
const HER_METAL = ['#f0cc40', '#e8e8f0'];
const HER_ELMOS = ['kettle', 'full', 'spangen', 'spike'];
const ELMO_NOME = { kettle: 'chapéu de ferro', full: 'elmo fechado', spangen: 'elmo de placas', spike: 'elmo com ponta', leaf: 'elmo élfico', turban: 'turbante', tricorne: 'tricórnio', shako: 'barretina', bearskin: 'gorro de pele' };
const MAN_PAREDE = ['#e8e0d0', '#c8b898', '#a8a8b0', '#b0604a', '#f2f0ea', '#d8c080', '#8a8a92', '#c89880'];
const MAN_TELHADO = ['#3a4a6a', '#5a3030', '#2a2a32', '#8a3a24', '#2e5a44', '#5a3a6a', '#4a3a2a', '#304a5a'];
BUILDINGS.mansao = { name: 'Mansão', w: 16, h: 7, role: 'mansao' };
INTERIOR_SIZES.mansao = [24, 16];

const Heraldica = {
  _c: {},
  // cores, elmo e a mansão de cada casa (sempre as mesmas para o mesmo reino)
  casa(k, i) {
    const key = k + ':' + i; if (this._c[key]) return this._c[key];
    const ord = new RNG(hashStr(k) + 5).shuffle(HER_COR.map((_, j) => j)), elmos = new RNG(hashStr(k) + 9).shuffle(HER_ELMOS.slice());
    const pw = new RNG(hashStr(k) + 17).shuffle(MAN_PAREDE.slice()), pt = new RNG(hashStr(k) + 23).shuffle(MAN_TELHADO.slice());
    const r = new RNG(hashStr(k) * 7 + i * 977 + 13);
    const c1 = HER_COR[ord[i]], c2 = HER_METAL[r.int(0, 1)];
    return (this._c[key] = {
      c1, c2, elmo: elmos[i], redondo: r.chance(0.5), pluma: r.chance(0.5) ? c2 : shade(c1, 0.35),
      man: { wall: pw[i], roof: pt[i], alas: r.chance(0.65), torres: r.pick([0, 1, 2, 2]), telhado: r.pick(['duas', 'mansarda', 'quatro']), material: r.pick(['pedra', 'tijolo', 'reboco', 'reboco']), andares: r.chance(0.35) ? 3 : 2, arco: r.chance(0.5), venezianas: r.chance(0.6), portico: r.chance(0.7), chamines: r.int(1, 4), jardim: r.pick(['fontes', 'estatuas', 'pomar', 'sebes']) }
    });
  },
  // o uniforme de cada reino: cor de detalhe, elmos, escudo e ombreiras
  uniforme(k) {
    const key = 'u:' + k; if (this._c[key]) return this._c[key];
    const K = War.K && War.K[k], r = new RNG(hashStr(k) + 101), base = K ? K.color : '#888888';
    const det = r.chance(0.5) ? r.pick(HER_METAL) : r.pick(HER_COR.filter(c => c !== base));
    const e = r.shuffle(HER_ELMOS.slice());
    return (this._c[key] = { det, elmo1: e[0], elmo2: e[1], redondo: r.chance(0.45), ombro: r.chance(0.5), malha: r.chance(0.4), capa: r.chance(0.5) });
  },
  nomeCor(c) { return HER_NOME[c] || 'cores próprias'; },
  aplicarCasa(L, k, i, kind) {
    const H = this.casa(k, i), S = KSTYLE[k] || {}, r = WAR_KIND_RANK[kind] || 1;
    L.casa = i;
    if (S.musket) { if (r !== 2) L.body = H.c1; L.sleeve = H.c2; L.plume = H.c2; if (L.tabard) L.tabard = H.c1; }
    else {
      L.tabard = H.c1; L.tabardSign = H.c2;
      if (r >= 1 && S.helm1 !== 'turban' && S.helm1 !== 'leaf') L.helmStyle = H.elmo;
      if (r >= 1) L.plume = H.pluma;
      if (L.cape) L.cape = H.c1;
    }
    if (L.shield) { L.shield = H.c1; L.shieldB = H.c2; L.shieldRound = H.redondo; }
    return L;
  }
};

const Dominios = {
  FW: 26, FH: 19,
  // ---------- na criação do mundo ----------
  gerar(W) {
    W.mansoes = [];
    const rng = new RNG(W.seed * 71 + 3), porK = {};
    for (const s of W.settlements) {
      const R = s.region; if (!R || R.hostile || R.neutral || s.playerVila || s.pirata || s.type === 'enseada') continue;
      (porK[R.id] = porK[R.id] || []).push(s);
    }
    for (const k in porK) {
      const L = porK[k], cap = L.find(s => s.type === 'capital'); if (!cap) continue;
      const cands = L.filter(s => s !== cap && (s.type === 'town' || s.type === 'village') && !s.port);
      const sedes = [];
      for (let i = 0; i < 3; i++) {
        let best = null, bd = -1;
        for (const s of cands) { if (sedes.includes(s)) continue; const d = Math.min(dist(s.x, s.y, cap.x, cap.y), ...sedes.map(z => dist(s.x, s.y, z.x, z.y))); if (d > bd) { bd = d; best = s; } }
        if (best) sedes.push(best);
      }
      // cada cidade é da casa com a sede mais perto (perto da capital: terras da Coroa)
      for (const s of L) {
        if (s === cap) { s.coroa = true; continue; }
        let bi = -1, bd = dist(s.x, s.y, cap.x, cap.y) * 1.15;
        sedes.forEach((z, i) => { const d = dist(s.x, s.y, z.x, z.y); if (d < bd) { bd = d; bi = i; } });
        if (bi >= 0) s.dominio = { k, i: bi }; else s.coroa = true;
      }
      sedes.forEach((z, i) => { z.sede = i; this.mansao(W, k, i, z, rng); });
    }
  },
  cabe(W, x0, y0) {
    const { FW, FH } = this, m = 4;
    if (x0 < 4 || y0 < 4 || x0 + FW > WORLD_W - 4 || y0 + FH > WORLD_H - 4) return false;
    for (const o of W.settlements) if (x0 - m < o.x0 + o.w && x0 + FW + m > o.x0 && y0 - m < o.y0 + o.h && y0 + FH + m > o.y0) return false;
    for (const l of [W.fazendas || [], W.mansoes]) for (const f of l) if (x0 - m < f.x0 + f.w && x0 + FW + m > f.x0 && y0 - m < f.y0 + f.h && y0 + FH + m > f.y0) return false;
    for (const l of [W.dungeons, W.pois]) for (const o of l) if (o.x > x0 - 8 && o.x < x0 + FW + 8 && o.y > y0 - 8 && o.y < y0 + FH + 8) return false;
    for (let y = y0; y < y0 + FH; y += 2) for (let x = x0; x < x0 + FW; x += 2) {
      const t = W.baseTile(x, y); if (TSOLID[t] || TWATER[t] || t === T.DEEP || t === T.LAVA || W._e > 0.7) return false;
      if (Gestao.ehEstrada(W, x, y)) return false;
    }
    return true;
  },
  mansao(W, k, i, sede, rng) {
    const { FW, FH } = this;
    let pos = null;
    for (let t = 0; t < 28 && !pos; t++) {
      const ang = rng.range(0, Math.PI * 2), d = sede.w / 2 + 18 + rng.range(0, 30);
      const x0 = Math.round(sede.mid.x + Math.cos(ang) * d - FW / 2), y0 = Math.round(sede.mid.y + Math.sin(ang) * d - FH / 2);
      if (this.cabe(W, x0, y0)) pos = { x0, y0 };
    }
    if (!pos) return;
    const { x0, y0 } = pos, H = Heraldica.casa(k, i), M = H.man, r = new RNG(hashStr(k) + i * 31 + 7);
    const N = FW * FH, tiles = new Uint8Array(N).fill(255), objs = new Uint8Array(N).fill(0), occ = new Uint8Array(N);
    const set = (x, y, t, o) => { if (x < 0 || y < 0 || x >= FW || y >= FH) return; const j = y * FW + x; if (t !== null) tiles[j] = t; if (o !== undefined) objs[j] = o; };
    const gx = 13;    // o portão e o caminho ficam no meio
    // gramado, muro e portão
    // o chão fica o natural do lugar (areia no deserto, grama no campo): só some o mato e as árvores
    for (let y = 0; y < FH; y++) for (let x = 0; x < FW; x++) set(x, y, null, 0);
    for (let x = 0; x < FW; x++) { set(x, 0, null, O.FENCE); if (x !== gx && x !== gx - 1) set(x, FH - 1, null, O.FENCE); }
    for (let y = 0; y < FH; y++) { set(0, y, null, O.FENCE); set(FW - 1, y, null, O.FENCE); }
    set(gx - 2, FH - 1, T.COBBLE, O.BANNER); set(gx + 1, FH - 1, T.COBBLE, O.BANNER);
    // pátio e caminho de pedra até a porta
    for (let x = 4; x < FW - 4; x++) { set(x, 9, T.COBBLE, 0); set(x, 10, T.COBBLE, 0); }
    for (let y = 9; y < FH; y++) { set(gx - 1, y, T.COBBLE, 0); set(gx, y, T.COBBLE, 0); }
    for (let y = 12; y < FH - 1; y += 3) { set(gx - 2, y, null, O.LAMP); set(gx + 1, y, null, O.LAMP); }
    // o jardim muda de casa para casa
    const lado = (fn) => { for (const sx of [-1, 1]) fn(sx, sx < 0 ? 2 : FW - 3); };
    if (M.jardim === 'fontes') { set(6, 14, T.COBBLE, O.FOUNTAIN); set(FW - 7, 14, T.COBBLE, O.FOUNTAIN); for (let x = 3; x < 10; x++) set(x, 17, null, O.FLOWERS); for (let x = FW - 10; x < FW - 3; x++) set(x, 17, null, O.FLOWERS); }
    else if (M.jardim === 'estatuas') { for (let y = 12; y < FH - 2; y += 2) { set(gx - 4, y, null, O.STATUE); set(gx + 3, y, null, O.STATUE); } set(5, 15, null, O.ANGELSTATUE); set(FW - 6, 15, null, O.ANGELSTATUE); }
    else if (M.jardim === 'pomar') { for (let y = 12; y < FH - 2; y += 3) for (let x = 3; x < FW - 3; x += 3) if (Math.abs(x - gx) > 3) set(x, y, null, O.OAK); }
    else { for (let y = 12; y < FH - 2; y++) for (let x = 3; x < FW - 3; x++) if (Math.abs(x - gx) > 2 && (y === 12 || y === FH - 3 || x === 3 || x === FW - 4 || (y === 15 && x % 4 !== 1))) set(x, y, null, O.BUSH); set(7, 14, null, O.FOUNTAIN); set(FW - 8, 14, null, O.FOUNTAIN); }
    lado((sx, x) => { set(x, 3, null, O.PINE); set(x, 6, null, O.PINE); });
    set(3, 9, null, O.WELL);
    // o pseudo-assentamento da mansão (como as fazendas)
    const f = { id: 'mansao_' + k + '_' + i, name: 'Mansão', type: 'mansao', mansao: true, region: sede.region, sede, dominio: { k, i }, x0, y0, w: FW, h: FH, mid: { x: x0 + gx, y: y0 + 11 }, x: x0 + gx, y: y0 + 11, cx: x0 + gx, cy: y0 + 11, gates: [{ x: x0 + gx, y: y0 + FH - 1, dir: 's' }], buildings: [], npcSpots: [], lamps: [] };
    const b = W.placeBuilding(f, 'mansao', 5, 1, r, objs, occ, FW, CULTURES[sede.region.culture] || CULTURES.human);
    b.spec = Object.assign({}, b.spec, M, { type: 'mansao', style: 'mansao', c1: H.c1, c2: H.c2, seed: hashStr(f.id), sign: null, w: 16, h: 7 });
    b.dominio = { k, i };
    W.addStamp({ x0, y0, w: FW, h: FH, tiles, objs });
    W.mansoes.push(f);
  },
  // ---------- nomes (as casas nobres só existem depois que os reinos estão prontos) ----------
  casaDe(k, i) { try { const F = Nobreza.familia(k); return F && F.casas[i]; } catch (e) { return null; } },
  nomear(b) {
    if (b._nome || !Game.world) return;
    const { k, i } = b.dominio, C = this.casaDe(k, i); if (!C) return;
    b._nome = true; b.name = 'Mansão da ' + C.nome;
    const race = Nobreza.raca(k), sex = Governos.sexo(C.chefe.nome, race), rng = new RNG(hashStr(b.name));
    let L = Nobreza.vestir(npcLook(race, sex, rng, 'citizen'), C.chefe.titulo, War.K && War.K[k]);
    const H = Heraldica.casa(k, i); L = Object.assign(L, { cape: H.c1, trim: H.c2 });
    b.owner = { name: C.chefe.titulo + ' ' + C.chefe.nome, race, sex, look: L, seed: rng.int(1, 1e6) };
  },
  terras(k, i) { return Game.world.settlements.filter(s => s.dominio && s.dominio.k === k && s.dominio.i === i); },
  reinoNome(k) { const K = War.K && War.K[k]; if (K) return K.name; const R = Game.world.regions.find(r => r.id === k); return R ? R.name : k; },
  senhor(k) { const K = War.K && War.K[k]; const R = Game.world.regions.find(r => r.id === k); const ru = (K && K.ruler) || (R && R.ruler); return ru ? `${ru.title} ${ru.name}` : 'a Coroa'; },
  // ---------- conversar com o chefe da casa ----------
  falar(b) {
    this.nomear(b);
    const { k, i } = b.dominio, C = this.casaDe(k, i), H = Heraldica.casa(k, i), o = b.owner || {};
    const look = (UI._ownerNpc && UI._ownerNpc.look) || o.look;
    const terras = this.terras(k, i), dono = s => { const w = War.ownerOf && War.ownerOf(s); return w && w !== k && War.K[w] ? ` <span class="bad">(ocupada por ${esc(War.K[w].short)})</span>` : ''; };
    const lista = terras.map(s => `${esc(s.name)}${s.sede === i ? ' <b>(sede)</b>' : ''}${dono(s)}`).join(', ') || 'só esta mansão e os campos em volta';
    const ops = [
      { label: 'Quais são as terras da sua casa?', fn: () => UI.dialog(o.name || 'Nobre', look, `A ${esc(C ? C.nome : 'nossa casa')} governa: ${lista}.<br><br>As terras em volta da capital são da Coroa.`, [{ label: 'Voltar', fn: () => this.falar(b) }]) },
      { label: 'Fale do seu brasão e dos seus soldados', fn: () => UI.dialog(o.name || 'Nobre', look, `O nosso brasão é <b style="color:${H.c1}">${Heraldica.nomeCor(H.c1)}</b> e <b style="color:${H.c2}">${Heraldica.nomeCor(H.c2)}</b>. Os soldados da casa usam essas cores no tabardo e no escudo e lutam de <b>${ELMO_NOME[H.elmo]}</b>. Quando ${esc(this.senhor(k))} chama para a guerra, as nossas tropas marcham junto com o exército do reino.`, [{ label: 'Voltar', fn: () => this.falar(b) }]) },
      { label: 'Tchau' }
    ];
    UI.dialog(o.name || 'Nobre', look, `*recebe você no grande salão* Bem-vindo(a) à mansão da <b>${esc(C ? C.nome : 'nossa casa')}</b>. Governamos estas terras em nome de ${esc(this.senhor(k))} (${esc(this.reinoNome(k))}).`, ops);
  },
  // ---------- o interior da mansão ----------
  interior(L, r) {
    const W = L.w, H = L.h, dx = L.dx, b = L.b, Hc = Heraldica.casa(b.dominio.k, b.dominio.i);
    for (let x = 2; x < W - 2; x += 3) L.wall(x, r.chance(0.5) ? O.WINDOW : O.PAINTING);
    for (let y = 3; y < H - 1; y++) for (let x = dx - 1; x <= dx + 1; x++) L.setFloor(x, y, T.CARPET);
    L.put(dx, 2, O.FIREPLACE); L.put(dx - 2, 2, O.BANNER); L.put(dx + 2, 2, O.BANNER); L.put(dx - 3, 2, O.CANDLE); L.put(dx + 3, 2, O.CANDLE);
    for (let x = 1; x <= 4; x++) L.put(x, 2, O.BOOKSHELF);
    L.put(W - 2, 2, O.WARDROBE); L.put(W - 3, 2, O.ARMORSTAND || O.STATUE); L.put(W - 4, 2, O.WEAPONRACK || O.STATUE);
    // duas mesas de banquete compridas
    for (const x0 of [3, W - 9]) for (let x = x0; x < x0 + 6; x++) { L.put(x, 7, O.TABLE); L.put(x, 6, O.CHAIR); L.put(x, 8, O.CHAIR); }
    for (let y = 5; y < H - 2; y += 4) { L.put(dx - 4, y, O.PILLAR); L.put(dx + 4, y, O.PILLAR); }
    L.put(1, H - 2, O.PLANT); L.put(W - 2, H - 2, O.PLANT); L.put(2, H - 3, O.STATUE); L.put(W - 3, H - 3, O.STATUE);
    L.spot('owner', dx, 4);
    L.spot('guard', dx - 2, H - 3); L.spot('guard', dx + 2, H - 3); L.spot('guard', dx - 6, 4); L.spot('guard', dx + 6, 4);
    L.spot('patron', 5, 10); L.spot('patron', W - 6, 11);
    L.corCasa = Hc;
  },
  // ---------- guardas da casa (dentro e no portão) ----------
  lookGuarda(k, i, kind, rng) {
    let L;
    if (War.K && War.K[k] && KSTYLE[k]) L = War.look(k, kind, rng);
    else { L = Object.assign({}, ENEMIES.guarda.look); L.helm = '#b8c0cc'; L.helmStyle = 'kettle'; L.body = '#a8b0bc'; L.chestplate = true; L.shield = '#888'; }
    return Heraldica.aplicarCasa(L, k, i, kind);
  },
  guardas(f, x, y, n) {
    const G = Game, { k, i } = f.dominio, C = this.casaDe(k, i), rng = new RNG(hashStr(f.id) + G.day), L = [];
    for (let j = 0; j < n; j++) {
      const look = this.lookGuarda(k, i, j === 0 ? 'elite' : 'soldado', rng);
      const a = new Monster('guarda', (x + (j ? 1.5 : -1.5)) * 16 + 8, y * 16 + 10, Math.max(10, G.player.level + 4), { look, name: 'Guarda da ' + (C ? C.nome : 'Casa') });
      a.guardOf = f.sede || f; a.home = { x: a.x, y: a.y }; a.portao = true;
      G.findFree(a); G.actors.push(a); L.push(a);
    }
    return L;
  },
  // ---------- jogador perto: guardas no portão e aviso de que entrou nas terras de uma casa ----------
  tT: 0, ultimo: null,
  tick(dt) {
    const G = Game, W = G.world, P = G.player; if (!W || !P || !W.mansoes || G.level !== W) return;
    this.tT -= dt; if (this.tT > 0) return; this.tT = 1.2;
    const ptx = P.x / 16, pty = P.y / 16;
    for (const f of W.mansoes) {
      const d = dist(ptx, pty, f.mid.x, f.mid.y);
      if (!f.ativa && d < 55) { f.ativa = true; for (const b of f.buildings) this.nomear(b); f.guardas = this.guardas(f, f.mid.x, f.y0 + this.FH, 2); }
      else if (f.ativa && d > 85) { f.ativa = false; const set = new Set(f.guardas || []); f.guardas = null; G.actors = G.actors.filter(a => !set.has(a)); }
    }
    // em que terras o jogador está
    const s = W.settlementAt(Math.floor(ptx), Math.floor(pty));
    let chave = null, txt = '';
    if (s && s.dominio) { const C = this.casaDe(s.dominio.k, s.dominio.i); if (C) { chave = s.dominio.k + s.dominio.i; txt = `🛡 Terras da ${C.nome} — ${C.chefe.titulo} ${C.chefe.nome}`; } }
    else if (s && s.coroa) { chave = 'coroa' + s.region.id; txt = `👑 Terras da Coroa — ${this.senhor(s.region.id)}`; }
    if (chave && chave !== this.ultimo) { this.ultimo = chave; G.toast(txt, '#f0d890'); }
    else if (!s) this.ultimo = this.ultimo && dist(ptx, pty, ...(this._ult || [0, 0])) > 120 ? null : this.ultimo;
    if (s) this._ult = [ptx, pty];
  },
  // no mapa: um escudo com as cores da casa em cada mansão
  drawMap(ctx, toS, z) {
    const W = Game.world, M = Game.mods; if (!W || !W.mansoes) return;
    for (const f of W.mansoes) {
      const mx = Math.floor(f.mid.x / 16), my = Math.floor(f.mid.y / 16);
      if (M && M.explored && !M.explored[my * MAP_W + mx]) continue;
      const [x, y] = toS(f.mid.x, f.mid.y), H = Heraldica.casa(f.dominio.k, f.dominio.i);
      ctx.fillStyle = '#000'; ctx.fillRect(x - 4, y - 5, 9, 10);
      ctx.fillStyle = H.c1; ctx.fillRect(x - 3, y - 4, 7, 7); ctx.fillRect(x - 2, y + 3, 5, 1);
      ctx.fillStyle = H.c2; ctx.fillRect(x - 3, y - 1, 7, 2);
      if (z >= 3.5) { const C = this.casaDe(f.dominio.k, f.dominio.i); if (C) { ctx.font = '12px VT323, monospace'; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillText(C.nome, x + 1, y + 15); ctx.fillStyle = '#f0e0b0'; ctx.fillText(C.nome, x, y + 14); } }
    }
  },
  textoDiplo(k) {
    const W = Game.world; if (!W || !W.mansoes) return '';
    const L = [0, 1, 2].map(i => { const C = this.casaDe(k, i), t = this.terras(k, i); if (!C || !t.length) return ''; const H = Heraldica.casa(k, i); return `<span style="color:${H.c1 === '#202020' ? '#a0a0a0' : H.c1}">■</span> <b>${esc(C.nome)}</b> (${esc(C.chefe.titulo)} ${esc(C.chefe.nome)}): ${t.map(s => esc(s.name)).join(', ')}`; }).filter(Boolean);
    return L.length ? `<br><small><b>Casas nobres e suas terras:</b><br>${L.join('<br>')}</small>` : '';
  }
};

// ---------- a mansão desenhada (cada uma diferente) ----------
Sprites.extraBuilding.mansao = function (sp) {
  const W = sp.w * 16, FH = sp.h * 16, EX = 70, H = FH + EX;
  const c = Sprites.cv(W + 2, H + 1), g = c.getContext('2d'), r = new RNG(sp.seed || 1);
  const f = (x, y, w, h, col) => { if (w <= 0 || h <= 0) return; g.fillStyle = col; g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };
  const wall = sp.wall || '#e8e0d0', roof = sp.roof || '#3a4a6a', c1 = sp.c1 || '#a81c1c', c2 = sp.c2 || '#f0cc40';
  const wHi = shade(wall, 0.12), wSh = shade(wall, -0.16), wDk = shade(wall, -0.38), rHi = shade(roof, 0.22), rSh = shade(roof, -0.28), rDk = shade(roof, -0.5);
  const ox = 1, base = H;
  const parede = (x, y, w, h) => {
    f(x, y, w, h, wall);
    if (sp.material === 'pedra') { for (let yy = 0; yy < h; yy += 5) { const off = (yy / 5) % 2 ? 4 : 0; for (let xx = -off; xx < w; xx += 9) f(x + Math.max(0, xx), y + yy, 1, 5, wSh); f(x, y + yy, w, 1, wSh); } }
    else if (sp.material === 'tijolo') { for (let yy = 0; yy < h; yy += 3) { f(x, y + yy, w, 1, wSh); const off = (yy / 3) % 2 ? 3 : 0; for (let xx = -off; xx < w; xx += 6) f(x + Math.max(0, xx), y + yy, 1, 3, wSh); } }
    // cunhais nos cantos e cornija
    for (let yy = 0; yy < h; yy += 6) { f(x, y + yy, 4, 3, wHi); f(x + w - 4, y + yy + 3, 4, 3, wHi); }
    f(x - 1, y, w + 2, 3, wHi); f(x - 1, y + 3, w + 2, 1, wDk);
    f(x, y + h - 4, w, 4, wDk);
  };
  const janela = (x, y, w, h) => {
    f(x - 1, y - 1, w + 2, h + 2, wHi);
    f(x, y, w, h, '#2a3450'); f(x + 1, y + 1, Math.max(1, w - 3), 2, '#7a90b8'); f(x + Math.floor(w / 2), y, 1, h, wHi);
    if (sp.arco) { f(x, y - 2, w, 1, wHi); f(x + 1, y - 3, w - 2, 1, wHi); }
    if (sp.venezianas) { f(x - 3, y, 2, h, shade(c1, -0.1)); f(x + w + 1, y, 2, h, shade(c1, -0.1)); }
    f(x - 1, y + h, w + 2, 1, wDk);
  };
  const andar = (x, y, w, h, n) => { const fl = Math.max(1, Math.floor((h - 6) / n)); for (let a = 0; a < n; a++) { const yy = y + 8 + a * fl; for (let xx = x + 8; xx < x + w - 10; xx += 15) janela(xx, yy, 6, Math.min(11, fl - 8)); } };
  const telhado = (x, y, w, h, tipo) => {
    for (let yy = 0; yy < h; yy++) {
      const k = yy / h, ins = tipo === 'mansarda' ? (k < 0.35 ? Math.round((0.35 - k) * w * 0.35) : 0) : tipo === 'quatro' ? Math.round((1 - k) * h * 0.9) : Math.round((1 - k) * h * 0.55);
      f(x + ins, y + yy, w - ins * 2, 1, yy % 4 === 0 ? rSh : roof);
    }
    f(x, y + h - 1, w, 2, rDk);
    if (tipo === 'mansarda') for (let xx = x + 10; xx < x + w - 14; xx += 18) { f(xx, y + Math.round(h * 0.4), 8, 9, wall); f(xx + 2, y + Math.round(h * 0.4) + 3, 4, 5, '#2a3450'); f(xx - 1, y + Math.round(h * 0.4) - 2, 10, 2, rDk); }
    else f(x + Math.round(w * 0.3), y + Math.round(h * 0.15), Math.round(w * 0.4), 1, rHi);
  };
  // sombra no chão
  f(ox + 2, base - 3, W - 4, 3, 'rgba(0,0,0,0.25)');
  const andares = sp.andares || 2;
  const cW = sp.alas ? Math.round(W * 0.48) : W - 10, cX = ox + Math.round((W - cW) / 2), cH = 40 + andares * 18;
  const aW = sp.alas ? Math.round((W - cW) / 2) - 3 : 0, aH = 30 + (andares - 1) * 18;
  // chaminés (atrás do telhado)
  for (let j = 0; j < (sp.chamines || 2); j++) { const xx = cX + 10 + j * Math.round((cW - 26) / Math.max(1, (sp.chamines || 2) - 1)); f(xx, base - cH - 34, 7, 16, wSh); f(xx - 1, base - cH - 35, 9, 2, wDk); }
  // alas
  if (sp.alas) for (const ax of [ox + 3, ox + W - 3 - aW]) { telhado(ax - 2, base - aH - 20, aW + 4, 21, sp.telhado); parede(ax, base - aH, aW, aH); andar(ax, base - aH, aW, aH, andares - 1); }
  // corpo central
  telhado(cX - 3, base - cH - 28, cW + 6, 29, sp.telhado);
  parede(cX, base - cH, cW, cH);
  andar(cX, base - cH, cW, cH, andares);
  // torres
  const torre = (tx, tw, th, ponta) => {
    parede(tx, base - th, tw, th);
    for (let yy = base - th + 10; yy < base - 18; yy += 18) janela(tx + Math.floor(tw / 2) - 2, yy, 4, 8);
    const rh = ponta ? 30 : 22;
    for (let yy = 0; yy < rh; yy++) { const ins = Math.round((rh - yy) / rh * tw * 0.5); f(tx - 2 + ins, base - th - rh + yy, tw + 4 - ins * 2, 1, yy % 4 === 0 ? rSh : roof); }
    f(tx + Math.floor(tw / 2), base - th - rh - 8, 1, 8, '#4a4a4a'); f(tx + Math.floor(tw / 2) + 1, base - th - rh - 8, 6, 4, c1); f(tx + Math.floor(tw / 2) + 1, base - th - rh - 6, 6, 1, c2);
  };
  if (sp.torres === 2) { torre(ox + 1, 22, cH + 16, false); torre(ox + W - 23, 22, cH + 16, false); }
  else if (sp.torres === 1) { torre(ox + Math.round(W / 2) - 13, 26, cH + 30, true); }
  // pórtico com colunas, frontão e o brasão
  const dX = ox + Math.round(W / 2) - 7, dW = 14, dH = 18;
  if (sp.portico) {
    const pw = 46, px = ox + Math.round(W / 2) - pw / 2, ph = 34;
    f(px - 2, base - ph - 2, pw + 4, 3, wHi);
    for (let yy = 0; yy < 10; yy++) { const ins = Math.round((10 - yy) * pw / 22); f(px + ins, base - ph - 12 + yy, pw - ins * 2, 1, yy === 9 ? wDk : wHi); }
    for (let j = 0; j < 4; j++) { const cx = px + 3 + j * Math.round((pw - 10) / 3); f(cx, base - ph + 1, 4, ph - 3, '#f4f0e8'); f(cx + 3, base - ph + 1, 1, ph - 3, '#c8c0b0'); f(cx - 1, base - ph + 1, 6, 2, '#e0d8c8'); }
  }
  // escudo com as cores da casa
  const ex = ox + Math.round(W / 2) - 5, ey = base - (sp.portico ? 46 : dH + 16);
  f(ex - 1, ey - 1, 12, 14, '#2a2a2a'); f(ex, ey, 10, 9, c1); f(ex + 1, ey + 9, 8, 2, c1); f(ex + 3, ey + 11, 4, 1, c1); f(ex, ey + 3, 10, 3, c2);
  // porta dupla e degraus
  f(dX - 2, base - dH - 3, dW + 4, dH + 3, wDk); f(dX, base - dH, dW, dH, '#3a2414'); f(dX + Math.floor(dW / 2), base - dH, 1, dH, '#1a0e08');
  f(dX + 4, base - 9, 1, 2, '#f0cc40'); f(dX + dW - 5, base - 9, 1, 2, '#f0cc40'); f(dX - 4, base - 2, dW + 8, 2, '#c8c0b0');
  // estandartes da casa na fachada
  for (const bx of [cX + 6, cX + cW - 12]) { f(bx, base - cH + 8, 6, 20, c1); f(bx, base - cH + 14, 6, 3, c2); f(bx, base - cH + 28, 2, 3, c1); f(bx + 4, base - cH + 28, 2, 3, c1); }
  return c;
};

// ---------- ganchos ----------
(function () {
  // criar os domínios e as mansões junto com o mundo (depois das fazendas)
  const g0 = World.prototype.generateSites;
  World.prototype.generateSites = function () { g0.apply(this, arguments); try { Dominios.gerar(this); } catch (e) { console.warn('Domínios', e); this.mansoes = []; } };
  const b0 = World.prototype.buildingsInView;
  World.prototype.buildingsInView = function (x0, y0, x1, y1) {
    const out = b0.call(this, x0, y0, x1, y1);
    for (const f of this.mansoes || []) { if (f.x0 * 16 > x1 + 96 || (f.x0 + f.w) * 16 < x0 - 96 || f.y0 * 16 > y1 + 200 || (f.y0 + f.h) * 16 < y0 - 96) continue; for (const b of f.buildings) { Dominios.nomear(b); out.push(b); } }
    return out;
  };
  // o interior
  const ib0 = Interior.prototype.build;
  Interior.prototype.build = function (kind, r) { if (kind === 'mansao') return Dominios.interior(this, r); return ib0.call(this, kind, r); };
  const en0 = Game.enterInterior;
  Game.enterInterior = function (b) { if (b && b.role === 'mansao') Dominios.nomear(b); return en0.apply(this, arguments); };
  const sp0 = Game.spawnInteriorNPCs;
  Game.spawnInteriorNPCs = function (L) {
    const r = sp0.apply(this, arguments);
    const b = L && L.b;
    if (b && b.role === 'mansao' && b.dominio) {
      const { k, i } = b.dominio, C = Dominios.casaDe(k, i), rng = new RNG(hashStr(b.name) + Game.day);
      for (const a of this.actors) if (a instanceof Monster && a.guardOf === b.settlement) { a.look = Dominios.lookGuarda(k, i, 'soldado', rng); a.S = Sprites.actor(a.look); a.h = a.S.h; a.name = 'Guarda da ' + (C ? C.nome : 'Casa'); }
    }
    return r;
  };
  // conversar com o chefe da casa
  const ub0 = UI.building;
  UI.building = function (b) { if (b && b.role === 'mansao') return Dominios.falar(b); return ub0.apply(this, arguments); };
  // uniformes dos reinos e tropas das casas nobres
  const lk0 = War.look;
  War.look = function (k, kind, rng) {
    const L = lk0.call(this, k, kind, rng), S = KSTYLE[k] || {}, U = Heraldica.uniforme(k), r = WAR_KIND_RANK[kind] || 0, K = this.K[k];
    if (!S.musket) {
      const cultural = S.helm1 === 'turban' || S.helm1 === 'leaf';
      if (r >= 1 && !cultural) L.helmStyle = r >= 2 ? (S.helm2 === S.helm1 ? U.elmo2 : S.helm2) : U.elmo1;
      L.tabardSign = U.det; L.trim = U.det;
      if (L.shield) { L.shieldB = U.det; L.shieldRound = U.redondo; }
      if (r >= 1 && U.ombro && !L.pauldron) L.pauldron = shade(U.det, -0.15);
      if (r === 1 && U.malha) L.mail = true;
      if (r === 1 && U.capa && K) L.cape = shade(K.color, -0.25);
    } else { L.sleeve = L.sleeve || U.det; }
    // parte das tropas vem das casas nobres (com as cores e o elmo da casa)
    if (K && !K.novo && rng.next() < 0.42) Heraldica.aplicarCasa(L, k, rng.int(0, 2), kind);
    return L;
  };
  const ms0 = War.makeSoldier;
  War.makeSoldier = function (k, kind, x, y, rng) {
    const m = ms0.apply(this, arguments);
    if (m && m.look && m.look.casa !== undefined) { const C = Dominios.casaDe(k, m.look.casa); if (C) m.name = `${ENEMIES['war_' + kind].name} da ${C.nome}`; }
    return m;
  };
  // mapa, diplomacia e o aviso das terras
  const wd0 = War.drawMap;
  War.drawMap = function (ctx, toS, z) { wd0.apply(this, arguments); try { Dominios.drawMap(ctx, toS, z); } catch (e) { } };
  const td0 = Povo.textoDiplo; Povo.textoDiplo = function (k) { return td0.call(this, k) + Dominios.textoDiplo(k); };
  const t0 = Inverno.tick.bind(Inverno);
  Inverno.tick = function (dt) { t0(dt); try { Dominios.tick(dt); } catch (e) { if (!Dominios._err) { Dominios._err = 1; console.warn('Domínios', e); } } };
  // moradores comentam de quem são as terras
  if (typeof Rotina !== 'undefined') {
    const fl0 = Rotina.fala;
    Rotina.fala = function (a) { let t = fl0.call(this, a); try { if (t && a.s && a.s.dominio && Math.random() < 0.35) { const C = Dominios.casaDe(a.s.dominio.k, a.s.dominio.i); if (C) t += ` Estas terras são da ${C.nome}.`; } } catch (e) { } return t; };
  }
})();
