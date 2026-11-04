'use strict';
// ===================== EXPANSÃO DO MAR: ILHAS, NAVIO PRÓPRIO E PIRATARIA =====================
// Ilhas pequenas e médias espalhadas pelos oceanos (enseadas piratas, ilhas do tesouro, desertas e
// rochosas). O jogador compra um navio num porto e pilota de verdade: vai até o timão no convés e o
// joystick vira o leme enquanto o mundo passa por baixo. Com canhões e abordagens dá para saquear
// navios mercantes — e virar pirata, com recompensa pela cabeça e a marinha dos reinos na caça.

const NAVIOS = {
  chalupa: { name: 'Chalupa', preco: 2500, hp: 140, canhoes: 6, vel: 1.12, trip: 4, desc: 'Pequena e veloz. Boa para começar e fugir da marinha.' },
  bergantim: { name: 'Bergantim', preco: 7500, hp: 240, canhoes: 10, vel: 1, trip: 6, desc: 'Equilibrado: bom casco, bons canhões.' },
  galeao: { name: 'Galeão', preco: 18000, hp: 380, canhoes: 16, vel: 0.88, trip: 8, desc: 'Uma fortaleza flutuante. Lento, mas ninguém aguenta uma bordada dele.' }
};
const NOMES_NAVIO = ['Gaivota Rubra', 'Vento Bravo', 'Sereia de Ferro', 'Corvo do Mar', 'Estrela Errante', 'Maré Alta', 'Tormenta', 'Dama da Névoa', 'Leviatã', 'Âncora de Prata', 'Lua Sangrenta', 'Coral Negro'];
const ILHA_NOMES = ['Ilha da Caveira', 'Ilha das Gaivotas', 'Ilhota do Coqueiro', 'Ilha do Naufrágio', 'Ilha da Tartaruga', 'Ilha dos Corais', 'Ilha do Farol Velho', 'Ilha da Areia Branca', 'Ilha do Vento Sul', 'Ilha da Lua Cheia', 'Ilha das Palmeiras', 'Ilha do Rochedo', 'Ilha da Sereia', 'Ilha do Ouro Perdido', 'Ilha da Bruma', 'Ilha do Papagaio', 'Ilha das Conchas', 'Ilha do Tubarão', 'Ilha da Maré', 'Ilha Esquecida', 'Ilha do Polvo', 'Ilha da Âncora', 'Ilha do Sol Poente', 'Ilha do Mangue', 'Ilha das Tormentas', 'Ilha do Caranguejo', 'Ilha do Coral Rubro', 'Ilha da Baleia', 'Ilha dos Ventos', 'Ilha do Eremita', 'Ilha da Garrafa', 'Ilha do Sino', 'Ilha das Sombras', 'Ilha do Cachimbo', 'Ilha da Bússola', 'Ilha do Leme', 'Ilha da Vela Rasgada', 'Ilha do Mastro', 'Ilha das Pérolas', 'Ilha do Arpão', 'Ilha da Espuma', 'Ilha do Recife', 'Ilha do Albatroz', 'Ilha da Brisa', 'Ilha dos Ossos', 'Ilha do Rum', 'Ilha da Gávea', 'Ilha do Canhão', 'Ilha do Pelicano', 'Ilha da Ostra'];
const ENSEADA_NOMES = ['Enseada do Corvo', 'Porto da Caveira', 'Refúgio dos Bucaneiros', 'Baía do Rum'];
const TITULOS_PIRATA = [[0, 'Marujo'], [20, 'Corsário'], [60, 'Capitão Pirata'], [150, 'Terror dos Mares'], [300, 'Rei dos Piratas']];
const FALAS_PIRATA = ['Arr! Bem-vindo à enseada, marujo. Aqui ninguém pergunta de onde vem o ouro.', 'Rum, ouro e vento nas velas. O resto é conversa de terra firme.', 'A marinha nunca acha esta enseada. Ou acha... e nunca volta.', 'Ouvi dizer que tem um tesouro enterrado numa ilha com uma caveira de pedra.', 'Navio mercante com bandeira negra à vista? Eles baixam as velas rapidinho!', 'Se vai abordar, abaixe o casco deles primeiro com os canhões.', 'Meu papagaio fala três línguas. Todas palavrão.'];
const SAQUE_ITENS = ['seda', 'especiarias', 'barril_rum', 'joias'];

idef('seda', { name: 'Rolo de Seda', type: 'material', value: 70, stack: true, icon: { k: 'silk', c: '#e04878' }, desc: 'Carga de navio mercante. O receptador da enseada paga bem.' });
idef('especiarias', { name: 'Caixa de Especiarias', type: 'material', value: 60, stack: true, icon: { k: 'crate', c: '#c87830' }, desc: 'Cravo, canela e pimenta das terras de além-mar.' });
idef('barril_rum', { name: 'Barril de Rum', type: 'material', value: 45, stack: true, icon: { k: 'bottle', c: '#8a4a1a' }, desc: 'O combustível de todo pirata.' });
idef('joias', { name: 'Baú de Joias', type: 'material', value: 180, stack: true, icon: { k: 'ring', c: '#f0c040' }, desc: 'Anéis, colares e moedas antigas.' });

const Mar = {
  frota: [], balas: [], efeitos: [], spawnT: 8, painelKey: '',
  st() { const P = Game.player; if (!P.mar) P.mar = { navio: null, fama: 0, recompensa: 0, negra: false, saques: 0, afundados: 0 }; return P.mar; },
  titulo() { const f = this.st().fama; let t = TITULOS_PIRATA[0][1]; for (const [v, n] of TITULOS_PIRATA) if (f >= v) t = n; return t; },
  navegavel(px, py) { const t = Game.world.tileAt(Math.floor(px / 16), Math.floor(py / 16)); return t === T.DEEP || (TWATER[t] && t !== T.ICE); },

  // ================= ILHAS =================
  gerarIlhas(W) {
    const base = World.prototype._base0, rng = new RNG(W.seed * 97 + 4242), L = [];
    const fundo = (x, y) => base.call(W, Math.round(x), Math.round(y)) === T.DEEP;
    for (let gy = 360; gy < WORLD_H - 360; gy += 620) for (let gx = 360; gx < WORLD_W - 360; gx += 620) {
      if (rng.next() < 0.42) continue;
      const x = gx + rng.int(-200, 200), y = gy + rng.int(-200, 200);
      const rx = rng.int(24, 72), ry = Math.max(18, Math.round(rx * rng.range(0.6, 1)));
      if (!fundo(x, y)) continue;
      if (Math.abs(x - ISLE.x) < 900 && Math.abs(y - ISLE.y) < 800) continue;
      if (!W.farFrom(x, y, L, 520) || !W.farFrom(x, y, W.settlements, 420) || !W.farFrom(x, y, W.dungeons, 300)) continue;
      let ok = true;
      for (let k = 0; k < 12 && ok; k++) { const a = k / 12 * Math.PI * 2; for (const f of [1, 2.2]) if (!fundo(x + Math.cos(a) * (rx + 40) * f, y + Math.sin(a) * (ry + 40) * f)) { ok = false; break; } }
      if (ok) L.push({ x, y, rx, ry });
    }
    // tipos: 4 enseadas piratas bem separadas nas ilhas grandes, ilhas do tesouro, rochosas e desertas
    const nomes = rng.shuffle(ILHA_NOMES.slice()), grandes = L.filter(i => i.rx >= 46 && i.ry >= 34).sort((a, b) => b.rx * b.ry - a.rx * a.ry), ens = [];
    for (const i of grandes) { if (ens.length >= 4) break; if (W.farFrom(i.x, i.y, ens, 2400)) ens.push(i); }
    L.forEach((i, n) => {
      i.id = 'ilha' + n;
      if (ens.includes(i)) { i.tipo = 'enseada'; i.nome = ENSEADA_NOMES[ens.indexOf(i)].replace(/^(Enseada|Porto|Refúgio|Baía) /, 'Ilha '); }
      else { i.tipo = n % 4 === 1 ? 'tesouro' : n % 5 === 3 ? 'rochosa' : 'deserta'; i.nome = nomes[n % nomes.length] + (n >= nomes.length ? ' ' + 'IVX'[Math.floor(n / nomes.length) % 3] : ''); }
    });
    // índice por blocos de 256 tiles para achar a ilha de um tile rapidinho
    const G = new Map();
    for (const i of L) for (let by = (i.y - i.ry * 1.4) >> 8; by <= (i.y + i.ry * 1.4) >> 8; by++) for (let bx = (i.x - i.rx * 1.4) >> 8; bx <= (i.x + i.rx * 1.4) >> 8; bx++) { const k = bx * 4096 + by; if (!G.has(k)) G.set(k, []); G.get(k).push(i); }
    W.ilhas = L; W.ilhaGrade = G; W.enseadas = [];
    for (const i of L) {
      const r = new RNG(W.seed + i.x * 7 + i.y);
      if (i.tipo === 'enseada') this.enseada(W, i, r, ENSEADA_NOMES[ens.indexOf(i)]);
      else if (i.tipo === 'tesouro') this.tesouro(W, i, r);
      else this.naufragio(W, i, r);
    }
  },
  ilhaEm(W, x, y) {
    const l = W.ilhaGrade && W.ilhaGrade.get((x >> 8) * 4096 + (y >> 8)); if (!l) return null;
    for (const i of l) if (Math.abs(x - i.x) < i.rx * 1.4 && Math.abs(y - i.y) < i.ry * 1.4) return i;
    return null;
  },
  forma(W, i, x, y) { const dx = (x - i.x) / i.rx, dy = (y - i.y) / i.ry; return Math.sqrt(dx * dx + dy * dy) + W.nW.noise(x / 22 + 31.7, y / 22 - 12.1) * 0.2 + W.nW.noise(x / 7 - 5.3, y / 7 + 8.9) * 0.05; },
  tileIlha(W, i, x, y, t) {
    const d = this.forma(W, i, x, y);
    if (d >= 1.22) return t;
    if (d >= 0.98) return T.WATER;
    if (d >= 0.8) return T.SAND;
    if (i.tipo === 'rochosa' && d < 0.34) return T.ROCK;
    return W.nD.noise(x / 26, y / 26) > 0.22 && i.tipo !== 'rochosa' ? T.DGRASS : T.GRASS;
  },
  objIlha(W, x, y, t) {
    const h = hash2(x, y, W.seed + 313);
    if (t === T.SAND) return h < 0.035 ? O.PALM : h < 0.045 ? O.ROCK : h < 0.05 ? O.BUSH : 0;
    if (t === T.GRASS) return h < 0.07 ? O.PALM : h < 0.11 ? O.BUSH : h < 0.19 ? O.TALLGRASS : h < 0.22 ? O.FLOWERS : h < 0.226 ? O.HERB_RED : h < 0.232 ? O.ROCK : 0;
    if (t === T.DGRASS) return h < 0.22 ? O.PALM : h < 0.3 ? O.BUSH : h < 0.36 ? O.TALLGRASS : h < 0.367 ? O.HERB_SHROOM : 0;
    return -1;
  },
  ilhaDe(x, y) { const W = Game.world, i = W && this.ilhaEm(W, x, y); return i && this.forma(W, i, x, y) < 1 ? i : null; },
  // costa sul da ilha (para o píer e para o navio ancorar)
  costa(W, i) {
    for (const dx of [0, 6, -6, 12, -12, 18, -18]) {
      const x = i.x + dx; let y = i.y;
      while (y < i.y + i.ry * 1.5 && W.isLand(x, y + 1)) y++;
      if (W.isLand(x, y) && !W.isLand(x, y + 2) && !W.isLand(x, y + 6)) return { x, y };
    }
    return null;
  },
  enseada(W, i, rng, nome) {
    const c = this.costa(W, i); if (!c) { i.tipo = 'deserta'; return; }
    const R = W.regions[(W.baseTile(c.x, c.y), W._r)], cul = CULTURES[R.culture] || CULTURES.human;
    const N = 20, x0 = c.x - 10, y0 = c.y - 16;
    const st = { id: 'enseada' + W.enseadas.length, name: nome, type: 'enseada', pirata: true, region: R, x: c.x, y: c.y - 8, cx: c.x, cy: c.y - 8, x0, y0, w: N, h: N, ilha: i.id };
    st.buildings = []; st.npcSpots = []; st.lamps = []; st.gates = [];
    const tiles = new Uint8Array(N * N).fill(255), objs = new Uint8Array(N * N).fill(255), occ = new Uint8Array(N * N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const t = W.baseTile(x0 + x, y0 + y), j = y * N + x;
      if (y >= 16) { if (x >= 9 && x <= 10) { tiles[j] = T.BRIDGE; objs[j] = 0; occ[j] = 2; } continue; }   // píer sobre a água
      if (TWATER[t] || t === T.DEEP || TSOLID[t]) { tiles[j] = T.SAND; objs[j] = 0; }
      else objs[j] = 0;
      if ((x >= 8 && x <= 11 && y >= 6) || (y >= 10 && y <= 11)) { tiles[j] = T.DIRT; occ[j] = 2; }
    }
    const cul2 = Object.assign({}, cul, { roof: ['#3a2a22', '#4a3020', '#2a2a2a'] });
    const inn = W.placeBuilding(st, 'inn', 1, 2, rng, objs, occ, N, cul2); inn.name = 'Taverna ' + rng.pick(['do Papagaio Caolho', 'da Caveira Sorridente', 'do Rum Eterno', 'da Perna de Pau']);
    W.placeBuilding(st, 'house', 13, 2, rng, objs, occ, N, cul2);
    for (const [x, y, o] of [[8, 13, O.BARREL], [11, 13, O.CRATE], [12, 13, O.BARREL], [7, 12, O.CRATE], [3, 12, O.CAMPFIRE], [9, 15, O.LAMP], [10, 9, O.LAMP], [16, 12, O.BARREL], [17, 13, O.CRATE], [2, 14, O.TENT], [15, 15, O.LIFEBOAT]]) { const j = y * N + x; if (!occ[j] || occ[j] === 2) objs[j] = o; }
    st.npcSpots.push({ role: 'corsario', x: x0 + 9, y: y0 + 14 }, { role: 'receptador', x: x0 + 12, y: y0 + 12 }, { role: 'pirata', x: x0 + 4, y: y0 + 11 }, { role: 'pirata', x: x0 + 15, y: y0 + 10 }, { role: 'pirata', x: x0 + 6, y: y0 + 13 });
    st.gates.push({ x: x0 + 9, y: y0 - 1, dir: 'n' });
    st.mid = { x: x0 + 9, y: y0 + 11 };
    st.lamps.push({ x: x0 + 9, y: y0 + 15 });
    st.cais = { x: (x0 + 10) * 16, y: (y0 + N + 2) * 16 };     // onde o navio do jogador atraca
    W.addStamp({ x0, y0, w: N, h: N, tiles, objs });
    W.settlements.push(st); W.enseadas.push(st);
  },
  tesouro(W, i, rng) {
    const R = W.regions[(W.baseTile(i.x, i.y), W._r)];
    const p = { id: 'campilha' + i.id, kind: 'camp', pirata: true, x: i.x, y: i.y, region: R, lvl: Math.max(R.lvl[0] + 2, 8), name: 'Acampamento Pirata (' + i.nome + ')' };
    W.stampCamp(p, rng); W.pois.push(p);
    // o tesouro enterrado fica longe do acampamento, perto da praia
    const a = rng.range(0, Math.PI * 2), tx = Math.round(i.x + Math.cos(a) * i.rx * 0.55), ty = Math.round(i.y + Math.sin(a) * i.ry * 0.55);
    if (W.isLand(tx, ty)) W.addStamp({ x0: tx, y0: ty, w: 1, h: 1, tiles: new Uint8Array([T.DIRT]), objs: new Uint8Array([O.CHEST_BOSS]) });
  },
  naufragio(W, i, rng) {
    const c = this.costa(W, i); if (!c) return;
    const objs = new Uint8Array(25).fill(255), list = [O.CRATE, O.BARREL, O.CRATE, O.LIFEBOAT, O.BARREL];
    for (let k = 0; k < 5; k++) objs[rng.int(0, 24)] = list[k];
    objs[12] = rng.chance(0.6) ? O.CHEST : O.CRATE;
    W.addStamp({ x0: c.x - 2, y0: c.y - 4, w: 5, h: 5, tiles: new Uint8Array(25).fill(255), objs });
  },

  // ================= NAVIO DO JOGADOR NO MUNDO =================
  // procura um ponto de mar aberto onde o casco inteiro cabe (36 tiles de comprimento)
  marAberto(x, y, ang) {
    const livre = (px, py, a) => { if (!this.navegavel(px, py)) return false; for (const k of [-310, -160, 160, 310]) if (!this.navegavel(px + Math.cos(a) * k, py + Math.sin(a) * k)) return false; for (const k of [-95, 95]) if (!this.navegavel(px - Math.sin(a) * k, py + Math.cos(a) * k)) return false; return true; };
    for (let r = 0; r < 900; r += 32) for (let k = 0; k < (r ? 16 : 1); k++) {
      const a = k / 16 * Math.PI * 2, px = x + Math.cos(ang) * r * 0.6 + Math.cos(a) * r * 0.5, py = y + Math.sin(ang) * r * 0.6 + Math.sin(a) * r * 0.5;
      for (const aa of [ang, ang + Math.PI / 2]) if (livre(px, py, aa)) return { x: px, y: py, ang: aa };
    }
    return null;
  },
  // praia mais perto do navio (para desembarcar de bote)
  terraPerto(x, y, raio = 34) {
    const W = Game.world, cx = Math.floor(x / 16), cy = Math.floor(y / 16);
    for (let r = 2; r <= raio; r++) for (let k = 0; k < r * 8; k++) {
      const a = k / (r * 8) * Math.PI * 2, tx = Math.round(cx + Math.cos(a) * r), ty = Math.round(cy + Math.sin(a) * r), t = W.tileAt(tx, ty);
      if (!TWATER[t] && t !== T.DEEP && !TSOLID[t] && t !== T.LAVA && !W.solidAt(tx, ty) && !W.solidAt(tx, ty - 1)) return { x: tx, y: ty };
    }
    return null;
  },
  // ponto na água junto da praia onde o navio aparece ancorado no mundo
  junto(terra, x, y) {
    const a = Math.atan2(y - (terra.y * 16 + 8), x - (terra.x * 16 + 8));
    for (let k = 1; k < 30; k++) { const px = terra.x * 16 + 8 + Math.cos(a) * k * 8, py = terra.y * 16 + 8 + Math.sin(a) * k * 8; if (this.navegavel(px, py) && this.navegavel(px + Math.cos(a) * 24, py + Math.sin(a) * 24)) return { x: px + Math.cos(a) * 26, y: py + Math.sin(a) * 26 }; }
    return { x, y };
  },
  comprar(tipo, s, volta) {
    const P = Game.player, M = this.st(), T_ = NAVIOS[tipo], preco = Math.round(T_.preco * (s.pirata ? 0.9 : 1));
    if (P.gold < preco) return Game.toast('Ouro insuficiente.', '#ff8080');
    const dock = s.cais || s.port.ship;
    const aSea = s.cais ? Math.PI / 2 : s.port.axis === 'y' ? (s.port.dir > 0 ? Math.PI / 2 : -Math.PI / 2) : (s.port.dir > 0 ? 0 : Math.PI);
    const vis = { x: dock.x + Math.cos(aSea + Math.PI / 2) * 112 - Math.cos(aSea) * 30, y: dock.y + Math.sin(aSea + Math.PI / 2) * 112 - Math.sin(aSea) * 30 };
    const pos = this.marAberto(dock.x + Math.cos(aSea) * 360, dock.y + Math.sin(aSea) * 360, aSea);
    if (!pos) return Game.toast('O estaleiro não achou água funda o bastante aqui. Tente outro porto.', '#ff8080');
    P.gold -= preco; Sfx.play('coin');
    const velho = M.navio;
    M.navio = { tipo, nome: NOMES_NAVIO[Math.floor(Math.random() * NOMES_NAVIO.length)], hp: T_.hp, x: pos.x, y: pos.y, ang: pos.ang, vis, porto: s.id, cor: s.pirata ? '#2a2a2a' : s.region.color, trip: T_.trip };
    if (velho) Game.toast(`O ${velho.nome} foi vendido como parte do pagamento.`, '#c0e0ff');
    UI.dialog('Estaleiro', null, `Parabéns, capitão! O <b>${esc(M.navio.nome)}</b> (${T_.name}) é seu.<br><br>Ele está ancorado ao lado do píer. Chegue perto e toque em <b>Embarcar</b>. No convés, vá até o <b>timão</b> na popa para pilotar: o joystick vira o leme.`, [{ label: 'Ótimo!', fn: volta }]);
    Game.chron(`Comprei um navio: o ${M.navio.nome}, uma ${T_.name.toLowerCase()}.`);
  },
  opcoesPorto(a, volta) {
    const P = Game.player, M = this.st(), s = a.s, nav = M.navio, o = [];
    const procurado = M.recompensa >= 300 && !s.pirata;
    o.push({ label: '⚓ Estaleiro: comprar um navio próprio', fn: () => {
      if (procurado) return UI.dialog(a.name, a.look, `Você é procurado(a) por pirataria — <b>${M.recompensa} de ouro</b> pela sua cabeça. Aqui ninguém vende navio para pirata.`, [{ label: 'Voltar', fn: volta }]);
      const k = s.pirata ? 0.9 : 1;
      UI.dialog('Estaleiro', null, 'Escolha o seu navio. Todos vêm com tripulação, canhões e um bote.' + (nav ? `<br><span class="dim">O ${esc(nav.nome)} entra como parte do pagamento.</span>` : ''),
        Object.entries(NAVIOS).map(([id, t]) => ({ label: `⛵ ${t.name} — ${Math.round(t.preco * k)} ouro (casco ${t.hp}, ${t.canhoes} canhões)`, cls: 'gold', fn: () => this.comprar(id, s, volta) })).concat([{ label: 'Voltar', fn: volta }]));
    } });
    if (nav && nav.hp < NAVIOS[nav.tipo].hp) {
      const custo = Math.ceil((NAVIOS[nav.tipo].hp - nav.hp) * (s.pirata ? 2 : 3));
      o.push({ label: `🔧 Consertar o ${nav.nome} (${nav.hp}/${NAVIOS[nav.tipo].hp}) — ${custo} ouro`, fn: () => { if (procurado) return Game.toast('Não consertamos navio pirata!', '#ff8080'); if (P.gold < custo) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= custo; nav.hp = NAVIOS[nav.tipo].hp; Sfx.play('forge'); Game.toast('Casco consertado!', '#a0ff90'); volta(); } });
    }
    if (nav && this.longeDoNavio(s)) o.push({ label: `🚣 Trazer o ${nav.nome} até este porto — 300 ouro`, fn: () => { if (P.gold < 300) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= 300; this.trazer(s); Game.toast(`O ${nav.nome} chegou ao porto.`, '#a0e0ff'); volta(); } });
    return o;
  },
  longeDoNavio(s) { const n = this.st().navio, d = s.cais || s.port.ship; return n && dist(n.vis.x, n.vis.y, d.x, d.y) > 400; },
  trazer(s) {
    const nav = this.st().navio, dock = s.cais || s.port.ship;
    const aSea = s.cais ? Math.PI / 2 : s.port.axis === 'y' ? (s.port.dir > 0 ? Math.PI / 2 : -Math.PI / 2) : (s.port.dir > 0 ? 0 : Math.PI);
    const pos = this.marAberto(dock.x + Math.cos(aSea) * 360, dock.y + Math.sin(aSea) * 360, aSea); if (!pos) return;
    Object.assign(nav, { x: pos.x, y: pos.y, ang: pos.ang, vis: { x: dock.x + Math.cos(aSea + Math.PI / 2) * 112 - Math.cos(aSea) * 30, y: dock.y + Math.sin(aSea + Math.PI / 2) * 112 - Math.sin(aSea) * 30 } });
  },
  sprite(nav) { return Naval.sprite(nav.tipo === 'galeao' ? 'galeao' : nav.tipo === 'chalupa' ? 'drakkar' : 'galeao', this.st().negra ? '#1e1e1e' : nav.cor, 0); },
  // navio ancorado desenhado no mundo
  drawables(D, camX, camY, vw, vh) {
    const G = Game, M = G.player && G.player.mar, nav = M && M.navio;
    if (!nav || !G.level.isWorld) return;
    const v = nav.vis; if (v.x < camX - 120 || v.x > camX + vw + 120 || v.y < camY - 120 || v.y > camY + vh + 120) return;
    const img = this.sprite(nav);
    D.push({ y: v.y + 6, fn: (ctx) => { ctx.save(); Naval.drawShip(ctx, img, v.x - camX, v.y - camY, { seed: 3 }); ctx.restore(); if (M.negra) this.caveira(ctx, Math.round(v.x - camX) - 2, Math.round(v.y - camY) - 70); } });
  },
  caveira(ctx, x, y) { ctx.fillStyle = '#141414'; ctx.fillRect(x - 1, y - 1, 9, 7); ctx.fillStyle = '#f0f0f0'; ctx.fillRect(x + 2, y, 3, 3); ctx.fillRect(x + 1, y + 3, 1, 1); ctx.fillRect(x + 5, y + 3, 1, 1); ctx.fillStyle = '#141414'; ctx.fillRect(x + 2, y + 1, 1, 1); ctx.fillRect(x + 4, y + 1, 1, 1); },
  findInteract(fx, fy) {
    const G = Game, M = G.player.mar, nav = M && M.navio;
    if (!nav || !G.level.isWorld) return null;
    const d = dist(fx, fy, nav.vis.x, nav.vis.y);
    return d < 150 ? { kind: 'mar', fn: () => this.embarcar(), label: 'Embarcar', name: nav.nome, d: d - 130 } : null;
  },

  // ================= A BORDO =================
  embarcar() {
    const G = Game, P = G.player, W = G.world, nav = this.st().navio; if (!nav) return;
    if (G.actors.some(a => a.team === 'enemy' && !a.dead && a.target === P && dist(a.x, a.y, P.x, P.y) < 200)) return G.toast('Não dá para embarcar com inimigos por perto!', '#ff8080');
    if (!this.navegavel(nav.x, nav.y)) { const pos = this.marAberto(nav.x, nav.y, nav.ang || 0); if (pos) Object.assign(nav, pos); }
    const s = W.nearestSettlement(Math.floor(nav.x / 16), Math.floor(nav.y / 16)) || W.settlements[0];
    UI.close();
    const L = new NavioLevel(nav, s);
    L.embarque = { x: P.x, y: P.y };
    G.worldPos = { x: P.x, y: P.y };
    G.level = L; P.mounted = false;
    const keep = G.actors.filter(a => a.team === 'ally' && a.follow && !a.dead);
    for (const st of W.settlements) if (st.active) { st.active = false; st.npcs = null; }
    for (const p of W.pois) p.spawned = false;
    P.x = L.entry.x * 16 + 8; P.y = L.entry.y * 16 + 12;
    for (const a of keep) { a.x = P.x + (Math.random() - 0.5) * 20; a.y = P.y - 4; G.findFree(a); }
    Ship.spawnCrew(L);
    // o capitão é você: quem fica no convés é o imediato
    const cap = L.crew[0].find(a => a.shipCrew === 'captain');
    if (cap) { cap.shipCrew = 'imediato'; cap.name = 'Imediato ' + cap.name.split(' ').slice(-1)[0]; const p = L.T(5, SHIP_C + 2); cap.x = p.x * 16 + 8; cap.y = p.y * 16 + 12; cap.home = { x: cap.x, y: cap.y }; }
    L.crew[1] = L.crew[1].filter(a => a.shipCrew !== 'passenger');
    G.actors = keep.concat(L.crew[0]);
    G.projectiles = []; G.clouds = []; G.pickups = []; G.particles = []; G.timers = G.timers.filter(t => t.keep);
    G.camX = P.x - G.vw / 2; G.camY = P.y - G.vh / 2; G.flow = null;
    this.frota = []; this.balas = []; this.efeitos = []; this.spawnT = 10;
    Sfx.play('quest'); UI.fade();
    G.centerMsg(nav.nome, `${NAVIOS[nav.tipo].name} • casco ${Math.round(nav.hp)}/${NAVIOS[nav.tipo].hp}`);
    G.toast('Vá até o timão na popa e toque em Pilotar. O joystick vira o leme.', '#ffe8a0');
  },
  desembarcar() {
    const G = Game, L = G.level, P = G.player; if (!L || !L.proprio) return;
    if (L.spd > 40) return G.toast('Recolha as velas e pare o navio antes de descer o bote.', '#ffd080');
    if (L.abordagem) return G.toast('Termine a abordagem primeiro!', '#ff8080');
    const t = this.terraPerto(L.x, L.y);
    if (!t) return G.toast('Não há praia por perto. Chegue mais perto da costa.', '#ffd080');
    const nav = L.nav;
    nav.x = L.x; nav.y = L.y; nav.ang = L.ang; nav.vis = this.junto(t, L.x, L.y);
    G.worldPos = { x: t.x * 16 + 8, y: t.y * 16 + 8 };
    L.leme = false; this.frota = []; this.balas = [];
    G.exitDungeon();
    P.mounted = false;
    for (const s of G.world.settlements) if (s.active) { s.active = false; const set = new Set(s.npcs || []); G.actors = G.actors.filter(x => !set.has(x)); s.npcs = null; }
    const i = this.ilhaDe(t.x, t.y);
    G.toast(`Você desceu de bote${i ? ' na ' + i.nome : ''}. O ${nav.nome} ficou ancorado.`, '#a0e0ff');
    this.painel();
  },
  leme() {
    const L = Game.level; if (!L || !L.proprio) return;
    if (L.abordagem) return Game.toast('Abordagem em andamento!', '#ff8080');
    L.leme = !L.leme;
    if (L.leme) { Sfx.play('creak'); Game.toast('Você assumiu o timão. Empurre o joystick para onde quer navegar.', '#c0e0ff'); }
    this.painelKey = '';
  },
  velas() { const L = Game.level; if (!L || !L.proprio) return; L.vela = L.vela >= 1 ? 0 : L.vela >= 0.5 ? 1 : 0.5; Sfx.play('creak'); this.painelKey = ''; },
  bandeira() {
    const M = this.st(); M.negra = !M.negra; this.painelKey = '';
    if (M.negra) { Game.centerMsg('🏴‍☠️ BANDEIRA NEGRA', 'Mercantes tremem quando veem você chegar'); Sfx.play('shout'); }
    else Game.toast('Você baixou a bandeira negra.', '#c0e0ff');
  },
  dormir() {
    const G = Game, L = G.level, P = G.player; if (!L || !L.proprio) return;
    if (this.frota.some(f => f.hostil && !f.sink && dist(f.x, f.y, L.x, L.y) < 900) || L.abordagem) return G.toast('Há inimigos por perto!', '#ff8080');
    UI.close(); UI.fade();
    L.spd = 0; L.vela = 0; L.leme = false;
    G.time += 8 * 60; while (G.time >= 1440) { G.time -= 1440; G.day++; G.mods.day = G.day; G.dayTick(); }
    P.hp = P.stat.maxHp; P.mp = P.stat.maxMp; P.st = P.stat.maxSt; Vida.dormiu();
    G.toast('Você dormiu 8 horas na cabine do capitão.', '#c0e0ff');
  },
  falarImediato(a) {
    const L = Game.level, M = this.st(), nav = L.nav, T_ = NAVIOS[nav.tipo];
    const txt = `Capitão! O <b>${esc(nav.nome)}</b> está com o casco em <b>${Math.round(nav.hp)}/${T_.hp}</b> e ${nav.trip} marujos a bordo.<br>` +
      (M.recompensa ? `Pela sua cabeça a marinha paga <b>${M.recompensa} de ouro</b>. Fama: <b>${this.titulo()}</b>.<br>` : '') +
      '<span class="dim">Timão na popa para pilotar • escotilhas levam ao porão (cabine, beliches e cozinha).</span>';
    UI.dialog(a.name, a.look, txt, [
      { label: '💤 Dormir na cabine (8h)', fn: () => this.dormir() },
      { label: '🚣 Descer o bote (desembarcar)', fn: () => { UI.close(); this.desembarcar(); } },
      { label: 'Ver o mapa', fn: () => { UI.close(); UI.openMap(); } },
      { label: 'Tchau' }
    ]);
  },

  // ================= OUTROS NAVIOS, CANHÕES E ABORDAGENS =================
  reinos() { return Object.keys(War.K || {}).filter(k => k !== 'jogador' && War.K[k] && !(War.st().extintos || {})[k]); },
  spawnNavio(L) {
    const M = this.st();
    for (let t = 0; t < 8; t++) {
      const a = Math.random() * Math.PI * 2, r = 700 + Math.random() * 400, x = L.x + Math.cos(a) * r, y = L.y + Math.sin(a) * r;
      if (!this.navegavel(x, y) || !this.navegavel(x + 60, y) || !this.navegavel(x - 60, y)) continue;
      const roll = Math.random(), pMar = 0.16 + Math.min(0.4, M.recompensa / 2500);
      const tipo = roll < pMar ? 'marinha' : roll < pMar + 0.2 ? 'pirata' : 'mercante';
      const ks = this.reinos(), k = ks.length ? ks[Math.floor(Math.random() * ks.length)] : null, K = k ? War.K[k] : null;
      const max = tipo === 'marinha' ? 200 : tipo === 'pirata' ? 150 : 95;
      const nome = tipo === 'pirata' ? 'Navio pirata ' + NOMES_NAVIO[Math.floor(Math.random() * NOMES_NAVIO.length)] : (tipo === 'marinha' ? 'Fragata da marinha' : 'Navio mercante') + (K ? ' de ' + K.short : '');
      this.frota.push({ id: Math.random(), tipo, x, y, ang: Math.atan2(L.y - y, L.x - x) + (Math.random() - 0.5) * 2.4, spd: 70, hp: max, max, k, cor: tipo === 'pirata' ? '#1e1e1e' : K ? K.color : '#6a4a2a', nome, ouro: tipo === 'mercante' ? 300 + Math.floor(Math.random() * 900) : tipo === 'pirata' ? 400 + Math.floor(Math.random() * 700) : 150 + Math.floor(Math.random() * 300), reload: 3, sink: 0, seed: Math.random() * 9 });
      return;
    }
  },
  hostil(f) {
    const M = this.st();
    if (f.rendido || f.saqueado) return false;
    if (f.tipo === 'marinha') return M.recompensa >= 300 || f.atacado;
    if (f.tipo === 'pirata') return !M.negra || f.atacado;
    return false;
  },
  tickNavio(dt, L) {
    const G = Game, M = this.st(), nav = L.nav;
    this.spawnT -= dt;
    if (this.spawnT <= 0) { this.spawnT = 16 + Math.random() * 22; if (this.frota.filter(f => !f.sink).length < 3) this.spawnNavio(L); }
    for (const f of this.frota) {
      if (f.sink) { f.sink += dt * 0.35; continue; }
      const d = dist(f.x, f.y, L.x, L.y), toP = Math.atan2(L.y - f.y, L.x - f.x);
      f.hostil = this.hostil(f);
      let want = f.ang, vmax = 70;
      if (f.saqueado) { want = toP + Math.PI; vmax = 90; }
      else if (f.rendido) vmax = 0;
      else if (f.tipo === 'mercante' && (f.atacado || (M.negra && d < 520))) {
        want = toP + Math.PI; vmax = 115;
        // com a bandeira negra por perto, os mercantes costumam se render
        if (M.negra && d < 300 && !f.tentouFugir) { f.tentouFugir = true; if (Math.random() < 0.55 + Math.min(0.3, M.fama / 300)) { f.rendido = true; G.toast(`${f.nome} baixou as velas e se rendeu! Chegue perto e aborde.`, '#ffe080'); } }
      } else if (f.hostil) { want = d > 260 ? toP : toP + Math.PI / 2; vmax = f.tipo === 'marinha' ? 130 : 120; }
      // desvia da terra
      if (!this.navegavel(f.x + Math.cos(want) * 150, f.y + Math.sin(want) * 150)) { f.desvio = (f.desvio || 1); want = f.ang + f.desvio * 1.3; if (!this.navegavel(f.x + Math.cos(want) * 150, f.y + Math.sin(want) * 150)) f.desvio = -f.desvio; }
      let da = want - f.ang; while (da > Math.PI) da -= Math.PI * 2; while (da < -Math.PI) da += Math.PI * 2;
      f.ang += clamp(da, -0.7 * dt, 0.7 * dt);
      f.spd += clamp(vmax - f.spd, -40 * dt, 30 * dt);
      const nx = f.x + Math.cos(f.ang) * f.spd * dt, ny = f.y + Math.sin(f.ang) * f.spd * dt;
      if (this.navegavel(nx, ny)) { f.x = nx; f.y = ny; } else f.spd *= 0.5;
      // canhões inimigos
      f.reload -= dt;
      if (f.hostil && d < 340 && f.reload <= 0) {
        f.reload = 3 + Math.random() * 1.5;
        const n = f.tipo === 'marinha' ? 4 : 3;
        for (let i = 0; i < n; i++) this.balas.push({ de: f, x0: f.x, y0: f.y - 6, x1: L.x + (Math.random() - 0.5) * 220, y1: L.y + (Math.random() - 0.5) * 160, t: -i * 0.12, dur: d / 320, dmg: f.tipo === 'marinha' ? 7 : 5 });
        Sfx.play('boom');
      }
    }
    this.frota = this.frota.filter(f => f.sink < 1.2 && dist(f.x, f.y, L.x, L.y) < 1900);
    // balas de canhão em arco
    for (const b of this.balas) {
      b.t += dt / Math.max(0.3, b.dur);
      if (b.t < 1 || b.feito) continue;
      b.feito = true;
      if (b.de === 'jog') {
        const alvo = this.frota.find(f => !f.sink && dist(f.x, f.y, b.x1, b.y1) < 70);
        if (alvo) this.acertou(alvo, b.dmg, L); else this.efeitos.push({ k: 'agua', x: b.x1, y: b.y1, t: 0 });
      } else if (dist(b.x1, b.y1, L.x, L.y) < 150) {
        nav.hp -= b.dmg; G.shake = 5; Sfx.play('hit');
        const p = L.T(3 + Math.floor(Math.random() * 30), 1 + Math.floor(Math.random() * (SHIP_B - 2)));
        G.burst(p.x * 16 + 8, p.y * 16 + 8, '#ff9030', 10, 70); G.burst(p.x * 16 + 8, p.y * 16 + 8, '#8a5a2a', 8, 60);
        if (Math.random() < 0.25 && !G.player.dead && dist(G.player.x, G.player.y, p.x * 16 + 8, p.y * 16 + 8) < 50) Combat.damage(G.player, 8 + b.dmg, { elem: 'fire' });
        if (nav.hp <= 0) { this.naufragar(L); return; }
      } else this.efeitos.push({ k: 'agua', x: b.x1, y: b.y1, t: 0 });
    }
    this.balas = this.balas.filter(b => !b.feito);
    for (const e of this.efeitos) e.t += dt;
    this.efeitos = this.efeitos.filter(e => e.t < 0.9);
    // fim da abordagem
    if (L.abordagem) {
      const vivos = G.actors.some(a => a.abordagem === L.abordagem && !a.dead);
      if (!vivos) { const f = L.abordagem; L.abordagem = null; G.actors = G.actors.filter(a => !a.marujo); this.saquear(f); }
    }
  },
  crime(f) {
    const M = this.st(), E = Eventos.state();
    if (f.tipo === 'pirata' || f.crime) return;
    f.crime = true;
    const v = f.tipo === 'marinha' ? 350 : 200;
    M.recompensa += v; E.procurado += 1;
    Vida.honra(-6, f.tipo === 'marinha' ? 'ataquei a marinha' : 'ataquei um navio mercante');
    Game.toast(`Pirataria! Agora há ${M.recompensa} de ouro pela sua cabeça.`, '#ff8060');
  },
  acertou(f, dmg, L) {
    f.hp -= dmg; f.atacado = true; this.crime(f);
    this.efeitos.push({ k: 'fogo', x: f.x + (Math.random() - 0.5) * 30, y: f.y - 20 - Math.random() * 20, t: 0 });
    if (f.hp <= f.max * 0.35 && !f.avisou) { f.avisou = true; Game.toast(`${f.nome} está avariado! Chegue perto e aborde.`, '#ffe080'); }
    if (f.hp <= 0 && !f.sink) {
      f.sink = 0.01; Sfx.play('boom');
      const M = this.st(), P = Game.player; M.afundados++; M.fama += 3;
      const g = Math.floor(f.ouro * 0.25); P.gold += g;
      if (f.tipo === 'pirata' && !M.negra) { P.gold += 250; Game.centerMsg('PIRATA AFUNDADO', `A marinha paga 250 de ouro pela proeza! (+${g} dos destroços)`); }
      else Game.toast(`${f.nome} afundou! Você pescou ${g} de ouro dos destroços.`, '#ffd040');
    }
    void L;
  },
  disparar(lado) {
    const G = Game, L = G.level; if (!L || !L.proprio) return;
    L.reload = L.reload || {};
    if (L.reload[lado] > 0) return G.toast('Recarregando os canhões...', '#c0c0c0');
    L.reload[lado] = 3.4;
    const n = Math.max(2, NAVIOS[L.nav.tipo].canhoes / 2), nrm = L.ang + (lado === 'est' ? Math.PI / 2 : -Math.PI / 2);
    // o artilheiro ajusta o alcance pelo navio que estiver daquele lado
    let alc = 330;
    for (const f of this.frota) { if (f.sink) continue; const dx = f.x - L.x, dy = f.y - L.y, d = Math.hypot(dx, dy), c = (dx * Math.cos(nrm) + dy * Math.sin(nrm)) / Math.max(1, d); if (d < 560 && c > 0.6) { alc = clamp(d * c - 90, 120, 470); break; } }
    for (let i = 0; i < n; i++) {
      const al = (i / (n - 1) - 0.5) * 380, sx = L.x + Math.cos(L.ang) * al + Math.cos(nrm) * 90, sy = L.y + Math.sin(L.ang) * al + Math.sin(nrm) * 90;
      const r = alc + (Math.random() - 0.5) * 50;
      this.balas.push({ de: 'jog', x0: sx, y0: sy, x1: sx + Math.cos(nrm) * r + (Math.random() - 0.5) * 50, y1: sy + Math.sin(nrm) * r + (Math.random() - 0.5) * 50, t: -i * 0.06, dur: 1.05, dmg: 11 });
    }
    Sfx.play('boom'); G.shake = 4;
    // fumaça nos canhões daquele lado do convés
    const cxL = L.w * 8, cyL = L.h * 8, F = L.floors[0];
    for (let j = 0; j < F.objs.length; j++) if (F.objs[j] === O.CANNON) {
      const x = (j % L.w) * 16 + 8, y = ((j / L.w) | 0) * 16 + 8;
      if ((x - cxL) * Math.cos(nrm) + (y - cyL) * Math.sin(nrm) <= 0) continue;
      for (let k = 0; k < 4; k++) G.particle(x + Math.cos(nrm) * 10, y + Math.sin(nrm) * 10, Math.cos(nrm) * 40 + (Math.random() - 0.5) * 20, Math.sin(nrm) * 40 - 15, Math.random() < 0.5 ? 'rgba(220,220,220,0.8)' : 'rgba(150,150,150,0.7)', 1.2, 2, 0);
      G.particle(x, y, 0, 0, '#ffd060', 0.15, 3, 0);
    }
  },
  alvoAbordagem(L) { return this.frota.find(f => !f.sink && !f.saqueado && (f.rendido || f.hp <= f.max * 0.35) && dist(f.x, f.y, L.x, L.y) < 330) || null; },
  abordar() {
    const G = Game, L = G.level, P = G.player; if (!L || !L.proprio || L.abordagem) return;
    const f = this.alvoAbordagem(L); if (!f) return;
    L.leme = false; L.spd = 0; L.vela = 0; f.spd = 0; f.atacado = true; this.crime(f);
    if (f.rendido) return this.saquear(f);
    L.abordagem = f;
    const n = 3 + (f.tipo === 'marinha' ? 3 : f.tipo === 'pirata' ? 2 : 0), K = f.k ? War.K[f.k] : null;
    const spots = L.deckSpots.slice().sort(() => Math.random() - 0.5);
    for (let i = 0; i < n; i++) {
      const [u, v] = spots[i % spots.length], p = L.T(u, v);
      const look = f.tipo === 'marinha' ? { k: 'hum', skin: '#e0ac69', hair: '#3a2a1a', body: K ? K.color : '#2a3a6a', legs: '#e8e4dc', boots: '#1a1a1a', helm: '#1a1a22', helmStyle: 'tricorne', crossbelt: true, weapon: 'sword', wc: '#d0d0d8' }
        : f.tipo === 'pirata' ? undefined : { k: 'hum', skin: '#d8a070', hair: '#4a3a2a', body: '#e8e4dc', legs: '#3a3a4a', boots: '#3a2618', bandana: true, weapon: 'dagger', wc: '#c0c0c0' };
      const id = f.tipo === 'pirata' && i % 3 === 2 ? 'pirata_arqueiro' : 'pirata';
      const m = new Monster(id, p.x * 16 + 8, p.y * 16 + 12, P.level, { look, name: f.tipo === 'marinha' ? 'Fuzileiro da Marinha' : f.tipo === 'pirata' ? undefined : 'Marinheiro Mercante', hpMul: f.tipo === 'marinha' ? 1.15 : f.tipo === 'pirata' ? 1 : 0.65, dmgMul: f.tipo === 'mercante' ? 0.7 : 1 });
      m.abordagem = f; G.findFree(m); G.actors.push(m);
    }
    // a sua tripulação luta junto
    for (let i = 0; i < Math.min(4, Math.floor(L.nav.trip / 2)); i++) {
      const [u, v] = spots[(n + i) % spots.length], p = L.T(u, v);
      const m = new Monster('pirata', p.x * 16 + 8, p.y * 16 + 12, Math.max(1, P.level - 2), { look: { k: 'hum', skin: '#c68642', hair: '#2a1a10', body: '#7a2a2a', legs: '#2a2a40', boots: '#3a2618', weapon: 'sword', wc: '#d0d0d0' }, name: 'Seu marujo', hpMul: 0.9 });
      m.team = 'ally'; m.marujo = true; G.findFree(m); G.actors.push(m);
    }
    G.centerMsg('⚔ ABORDAGEM!', `Os ganchos voam! A tripulação do ${f.nome} invade o convés!`);
    Sfx.play('shout'); G.shake = 6;
    this.painelKey = '';
  },
  saquear(f) {
    const G = Game, P = G.player, M = this.st();
    f.saqueado = true; f.rendido = true;
    const itens = [];
    const pool = f.tipo === 'marinha' ? ['pocao_vida_p', 'lingote_ferro', 'joias'] : f.tipo === 'pirata' ? ['joias', 'perola', 'rubi', 'barril_rum'] : SAQUE_ITENS;
    const nIt = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < nIt; i++) { const id = pool[Math.floor(Math.random() * pool.length)]; if (!ITEMS[id]) continue; const q = 1 + Math.floor(Math.random() * 3); P.addItem(Items.make(id, q)); itens.push(`${q}× ${ITEMS[id].name}`); }
    P.gold += f.ouro; Sfx.play('coin');
    M.saques++; M.fama += f.tipo === 'marinha' ? 10 : f.tipo === 'pirata' ? 8 : 5;
    if (f.tipo !== 'pirata') Vida.honra(-4, 'saqueei um navio');
    P.addXP(60 + P.level * 4);
    UI.dialog('Saque!', null, `Você saqueou o <b>${esc(f.nome)}</b>!<br><br>💰 <b>${f.ouro} de ouro</b><br>${itens.join('<br>')}<br><br><span class="dim">Fama: ${this.titulo()} • recompensa pela sua cabeça: ${M.recompensa} de ouro</span>`, [{ label: 'Arr!' }]);
    G.chron(`Saqueei o ${f.nome} em alto-mar.`);
    this.painelKey = '';
  },
  naufragar(L) {
    const G = Game, P = G.player, W = G.world, M = this.st(), nav = L.nav;
    const ports = (W.ports || []).concat(W.enseadas || []);
    let best = null, bd = Infinity; for (const s of ports) { const d = dist(s.x * 16, s.y * 16, L.x, L.y); if (d < bd) { bd = d; best = s; } }
    M.navio = null; L.leme = false; this.frota = []; this.balas = [];
    const perda = Math.floor(P.gold * 0.2); P.gold -= perda;
    G.worldPos = best ? (best.port ? Ship.landing(best) : { x: best.mid.x * 16 + 8, y: best.mid.y * 16 + 8 }) : L.embarque;
    G.exitDungeon();
    P.hp = Math.max(1, P.stat.maxHp * 0.3);
    G.centerMsg('NAUFRÁGIO', `O ${nav.nome} afundou! Você acordou na praia${best ? ' perto de ' + best.name : ''}. (−${perda} de ouro)`);
    G.chron(`Meu navio, o ${nav.nome}, afundou em combate.`);
    this.painelKey = '';
  },
  // desenha os outros navios, as balas e os efeitos no mar (coordenadas do mundo)
  desenhar(ctx, cx, cy) {
    for (const f of this.frota) {
      const img = Naval.sprite('galeao', f.cor, 0);
      const x = f.x - cx, y = f.y - cy; if (x < -260 || y < -260 || x > Game.vw + 260 || y > Game.vh + 260) continue;
      ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.scale(2.6, 2.6);
      Naval.drawShip(ctx, img, 0, 0, { flip: Math.cos(f.ang) < 0, sink: f.sink, seed: f.seed, moving: f.spd > 30 });
      ctx.restore();
      if (f.tipo === 'pirata') this.caveira(ctx, Math.round(x) - 4, Math.round(y) - 185);
      if (!f.sink && (f.atacado || f.hostil)) { const w = 60; ctx.fillStyle = '#10080c'; ctx.fillRect(Math.round(x - w / 2) - 1, Math.round(y + 14), w + 2, 5); ctx.fillStyle = f.hostil ? '#e03030' : '#e0b030'; ctx.fillRect(Math.round(x - w / 2), Math.round(y + 15), Math.ceil(w * Math.max(0, f.hp) / f.max), 3); }
      if (f.rendido && !f.saqueado) { ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(x) - 1, Math.round(y) - 200, 2, 18); ctx.fillRect(Math.round(x) + 1, Math.round(y) - 200, 10, 7); }
    }
    for (const b of this.balas) {
      if (b.t < 0) continue;
      const x = lerp(b.x0, b.x1, b.t) - cx, y = lerp(b.y0, b.y1, b.t) - cy, z = Math.sin(Math.PI * b.t) * 34;
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(Math.round(x) - 2, Math.round(y), 4, 2);
      ctx.fillStyle = '#18181c'; ctx.fillRect(Math.round(x) - 2, Math.round(y - z) - 2, 4, 4); ctx.fillStyle = '#7a7a80'; ctx.fillRect(Math.round(x) - 1, Math.round(y - z) - 1, 1, 1);
    }
    for (const e of this.efeitos) {
      const x = Math.round(e.x - cx), y = Math.round(e.y - cy), k = e.t / 0.9;
      if (e.k === 'agua') { ctx.fillStyle = `rgba(235,245,255,${0.85 * (1 - k)})`; for (let i = 0; i < 7; i++) ctx.fillRect(x - 6 + i * 2, y - Math.round(Math.sin(i * 1.3 + 1) * 14 * (1 - Math.abs(k * 2 - 1))) - 2, 2, 3); ctx.fillRect(x - 8, y, 16, 1); }
      else { ctx.fillStyle = `rgba(255,${Math.round(200 - k * 120)},60,${1 - k})`; ctx.beginPath(); ctx.arc(x, y, 6 + k * 14, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = `rgba(60,60,60,${0.6 * (1 - k)})`; ctx.beginPath(); ctx.arc(x + 4, y - 10 - k * 10, 5 + k * 10, 0, Math.PI * 2); ctx.fill(); }
    }
  },

  // setas na borda da tela para os navios que estão fora de vista
  setas(ctx, cx, cy) {
    const vw = Game.vw, vh = Game.vh, L = Game.level;
    ctx.font = '12px VT323, monospace';
    for (const f of this.frota) {
      if (f.sink) continue;
      const sx = f.x - cx, sy = f.y - 60 - cy;
      if (sx > 20 && sy > 20 && sx < vw - 20 && sy < vh - 20) continue;
      const a = Math.atan2(sy - vh / 2, sx - vw / 2), k = Math.min((vw / 2 - 18) / Math.max(1e-3, Math.abs(Math.cos(a))), (vh / 2 - 18) / Math.max(1e-3, Math.abs(Math.sin(a))));
      const x = vw / 2 + Math.cos(a) * k, y = vh / 2 + Math.sin(a) * k;
      const col = f.hostil ? '#ff4040' : f.tipo === 'mercante' ? '#ffd040' : f.rendido ? '#ffffff' : '#a0d0ff';
      ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(a);
      ctx.fillStyle = '#10080c'; ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(-6, -7); ctx.lineTo(-6, 7); ctx.closePath(); ctx.fill();
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(7, 0); ctx.lineTo(-4, -5); ctx.lineTo(-4, 5); ctx.closePath(); ctx.fill();
      ctx.restore();
      const txt = (f.tipo === 'mercante' ? '💰' : f.tipo === 'pirata' ? '☠' : '⚓') + Math.round(dist(f.x, f.y, L.x, L.y) / 16) + 'm';
      const tx = clamp(x - Math.cos(a) * 22 - 12, 2, vw - 40), ty = clamp(y - Math.sin(a) * 18 + 4, 10, vh - 4);
      ctx.fillStyle = '#000'; ctx.fillText(txt, tx + 1, ty + 1); ctx.fillStyle = col; ctx.fillText(txt, tx, ty);
    }
  },

  // ================= ENSEADA PIRATA =================
  vestir(a, rng) {
    a.look = Object.assign({}, a.look, { body: rng.pick(['#7a2a2a', '#2a2a3a', '#e8e4dc', '#3a4a2a', '#5a3a6a']), legs: rng.pick(['#2a2a40', '#3a3028']), robe: false, vest: rng.chance(0.5) ? '#3a2a1a' : undefined, shirt: '#e8dcc0', hat: rng.pick(['bandana', 'bandana', 'wide', 'cap']), hatC: rng.pick(['#a02020', '#1a1a1a', '#2a4a6a', '#e0c050']), patch: true, pouch: true });
    if (a.role === 'corsario') { a.name = (a.sex === 'f' ? 'Capitã ' : 'Capitão ') + a.name.split(' ')[0] + rng.pick([' Barba-Rubra', ' Olho-de-Vidro', ' Mão-de-Ferro', ' Dente-de-Ouro']); a.look.hat = 'wide'; a.look.hatC = '#1a1a1a'; a.look.pena = '#e02020'; a.look.cape = '#5a1a1a'; }
    if (a.role === 'receptador') { a.name = 'Receptador ' + a.name.split(' ')[0]; a.look.apron = '#5a4030'; }
    a.S = Sprites.actor(a.look); a.h = a.S.h;
  },
  falar(a) {
    const P = Game.player, M = this.st(), volta = () => this.falar(a);
    if (a.role === 'receptador') {
      const saque = P.inv.filter(it => SAQUE_ITENS.includes(it.id) || it.id === 'perola');
      const total = saque.reduce((s, it) => s + Math.round(ITEMS[it.id].value * 1.5) * (it.n || 1), 0);
      return UI.dialog(a.name, a.look, saque.length ? `Hmm... ${saque.map(it => `${it.n || 1}× ${ITEMS[it.id].name}`).join(', ')}. Pago <b>${total} de ouro</b> por tudo, sem perguntas.` : 'Traga seda, especiarias, rum, joias ou pérolas dos navios que você saquear. Pago melhor que qualquer mercador de terra firme.', (saque.length ? [{ label: `💰 Vender tudo por ${total} de ouro`, cls: 'gold', fn: () => { for (const it of saque) P.removeInst(it, it.n || 1); P.gold += total; Sfx.play('coin'); Game.toast(`+${total} de ouro`, '#ffd040'); volta(); } }] : []).concat([{ label: 'Tchau' }]));
    }
    if (a.role === 'corsario') {
      const limpar = Math.round(M.recompensa * 1.2);
      const o = [];
      if (M.recompensa > 0) o.push({ label: `📜 Subornar os juízes e limpar meu nome — ${limpar} ouro`, fn: () => { if (P.gold < limpar) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= limpar; M.recompensa = 0; Eventos.state().procurado = 0; Sfx.play('coin'); Game.toast('Seu nome está limpo. Por enquanto...', '#a0ff90'); volta(); } });
      if (M.navio) o.push({ label: `🏴‍☠️ Recrutar 2 marujos (${M.navio.trip}/${NAVIOS[M.navio.tipo].trip * 2}) — 300 ouro`, fn: () => { if (M.navio.trip >= NAVIOS[M.navio.tipo].trip * 2) return Game.toast('O navio já está lotado.', '#ffd080'); if (P.gold < 300) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= 300; M.navio.trip += 2; Game.toast('Dois marujos se juntaram à tripulação!', '#a0ff90'); volta(); } });
      o.push(...this.opcoesPorto(a, volta));
      o.push({ label: 'Tchau' });
      return UI.dialog(a.name, a.look, `Ahoy! Esta é a <b>${esc(a.s.name)}</b>, porto livre dos irmãos da costa.<br>Fama: <b>${this.titulo()}</b> • saques: ${M.saques} • navios afundados: ${M.afundados}${M.recompensa ? `<br>A marinha paga <b>${M.recompensa} de ouro</b> pela sua cabeça.` : ''}`, o);
    }
    UI.dialog(a.name, a.look, esc(FALAS_PIRATA[Math.floor(Math.random() * FALAS_PIRATA.length)]), [{ label: 'Tchau' }]);
  },
  spawns(tx, ty, night) {
    const i = this.ilhaDe(tx, ty); if (!i) return null;
    if (i.tipo === 'tesouro') return [['pirata', 3], ['pirata_arqueiro', 1.5], ['esqueleto', night ? 3 : 1]];
    if (i.tipo === 'enseada') return [['caranguejo_abissal', 0.2], ['slime', 1]];
    return [['lagarto', 2], ['slime', 1.5], ['caranguejo_abissal', 0.4], ['pirata', 0.6]];
  },

  // ================= PAINEL DO LEME E LAÇOS COM O JOGO =================
  painel() {
    let el = this.el;
    const L = Game.level;
    if (!el) {
      const hud = document.getElementById('hud'); if (!hud) return;
      el = this.el = document.createElement('div'); el.id = 'leme'; el.className = 'hidden'; hud.appendChild(el);
      el.addEventListener('pointerdown', e => { const b = e.target.closest('button'); if (!b) return; e.preventDefault(); e.stopPropagation(); const o = b.dataset.o; if (o === 'vela') this.velas(); else if (o === 'bom' || o === 'est') this.disparar(o); else if (o === 'flag') this.bandeira(); else if (o === 'ancora') this.desembarcar(); else if (o === 'leme') this.leme(); else if (o === 'abordar') this.abordar(); this.painelKey = ''; });
    }
    const show = !!(L && L.proprio) && !Game.paused;
    const alvo = show && this.alvoAbordagem(L), M = show ? this.st() : null;
    const key = show ? [L.leme, L.vela, M.negra, !!alvo, !!L.abordagem, Math.round(L.nav.hp), Math.round(L.spd / 10), this.rumo(L.ang)].join() : 'x';
    if (key === this.painelKey) return;
    this.painelKey = key;
    el.classList.toggle('hidden', !show);
    if (!show) return;
    const T_ = NAVIOS[L.nav.tipo], nos = Math.round(L.spd / 18);
    const topo = `<div class="tat-t">⛵ ${esc(L.nav.nome)} • ${Math.round(L.nav.hp)}/${T_.hp} • ${nos} nós • rumo ${this.rumo(L.ang)}</div>`;
    if (L.abordagem) { el.innerHTML = topo + '<div class="tat-t">⚔ Abordagem! Derrote a tripulação inimiga</div>'; return; }
    if (!L.leme) { el.innerHTML = topo + '<button data-o="ancora" class="wide">🚣 Desembarcar (bote)</button>'; return; }
    const vl = L.vela >= 1 ? 'Cheias' : L.vela >= 0.5 ? 'A meio' : 'Recolhidas';
    el.innerHTML = topo + `<button data-o="vela" class="wide">⛵ Velas: ${vl}</button><button data-o="bom">💥 Bombordo</button><button data-o="est">💥 Estibordo</button>` +
      (alvo ? `<button data-o="abordar" class="on wide">⚔ Abordar ${esc(alvo.nome)}</button>` : '') +
      `<button data-o="flag" class="${M.negra ? 'on' : ''}">🏴‍☠️ ${M.negra ? 'Negra' : 'Bandeira'}</button><button data-o="ancora">⚓ Desembarcar</button><button data-o="leme" class="wide">✋ Largar o timão</button>`;
  },
  rumo(a) { const d = ['L', 'SE', 'S', 'SO', 'O', 'NO', 'N', 'NE']; return d[((Math.round(a / (Math.PI / 4)) % 8) + 8) % 8]; },
  // carta náutica: a costa, as ilhas e os navios em volta (o norte fica em cima)
  carta(L, x) {
    const W = Game.world, PASSO = 64, N = 48;
    this._amostra = this._amostra || new Map();
    if (this._amostra.size > 20000) this._amostra.clear();
    const cx0 = Math.floor(L.x / PASSO), cy0 = Math.floor(L.y / PASSO);
    const img = x.createImageData(96, 96), d = img.data;
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const gx = cx0 + i - N / 2, gy = cy0 + j - N / 2, k = gx * 100000 + gy;
      let t2 = this._amostra.get(k);
      if (t2 === undefined) { t2 = W.baseTile(Math.floor(gx * PASSO / 16), Math.floor(gy * PASSO / 16)); this._amostra.set(k, t2); }
      const col = t2 === T.DEEP ? [24, 52, 96] : TWATER[t2] ? [46, 96, 150] : t2 === T.SAND || t2 === T.DESERT ? [200, 178, 120] : TSOLID[t2] ? [110, 104, 96] : [70, 120, 60];
      for (let yy = 0; yy < 2; yy++) for (let xx = 0; xx < 2; xx++) { const o = ((j * 2 + yy) * 96 + i * 2 + xx) * 4; d[o] = col[0]; d[o + 1] = col[1]; d[o + 2] = col[2]; d[o + 3] = 255; }
    }
    x.putImageData(img, 0, 0);
    const toC = (px, py) => [48 + (px - L.x) / PASSO * 2, 48 + (py - L.y) / PASSO * 2];
    for (const f of this.frota) { if (f.sink) continue; const [a, b] = toC(f.x, f.y); if (a < 0 || b < 0 || a > 96 || b > 96) continue; x.fillStyle = f.hostil ? '#ff4040' : f.tipo === 'mercante' ? '#ffd040' : '#c0e0ff'; x.fillRect(Math.round(a) - 1, Math.round(b) - 1, 3, 3); }
    // o seu navio (seta no rumo) e o rumo desejado no joystick
    x.save(); x.translate(48, 48); x.rotate(L.ang); x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(6, 0); x.lineTo(-4, -4); x.lineTo(-2, 0); x.lineTo(-4, 4); x.closePath(); x.fill(); x.restore();
    const m = Input.move; if (m.mag > 0.25) { x.strokeStyle = 'rgba(255,230,120,0.9)'; x.beginPath(); x.moveTo(48, 48); x.lineTo(48 + m.x / m.mag * 20, 48 + m.y / m.mag * 20); x.stroke(); }
    x.fillStyle = '#fff'; x.font = '9px monospace'; x.fillText('N', 45, 9);
  },
  tick(dt) {
    const G = Game, P = G.player, W = G.world; if (!P || !W) return;
    this.painel();
    if (!G.level.isWorld) return;
    this.discT = (this.discT || 0) - dt;
    if (this.discT > 0) return;
    this.discT = 0.6;
    const i = this.ilhaDe(Math.floor(P.x / 16), Math.floor(P.y / 16));
    if (i && !G.mods.discovered.has(i.id)) {
      G.mods.discovered.add(i.id);
      G.centerMsg(i.nome.toUpperCase(), { enseada: 'Uma enseada pirata! Aqui ninguém pergunta nada.', tesouro: 'Dizem que há um tesouro enterrado aqui...', rochosa: 'Uma ilha de pedra e vento.', deserta: 'Uma ilha deserta no meio do oceano.' }[i.tipo]);
      P.addXP(40); Sfx.play('quest');
    }
  },
  nomeLocal(tx, ty) { const i = this.ilhaDe(tx, ty); return i ? i.nome : null; },
  drawMap(ctx, toS) {
    const W = Game.world; if (!W || !W.ilhas) return;
    ctx.font = '13px VT323, monospace';
    for (const i of W.ilhas) {
      if (!Game.mods.discovered.has(i.id)) continue;
      const [x, y] = toS(i.x, i.y);
      ctx.fillStyle = '#000'; ctx.fillText((i.tipo === 'enseada' ? '☠ ' : '') + i.nome, x + 5, y + 4); ctx.fillStyle = i.tipo === 'enseada' ? '#ff9080' : '#f0e8c0'; ctx.fillText((i.tipo === 'enseada' ? '☠ ' : '') + i.nome, x + 4, y + 3);
    }
    const nav = Game.player.mar && Game.player.mar.navio;
    if (nav) { const p = Game.level.proprio ? { x: Game.level.x, y: Game.level.y } : nav.vis, [x, y] = toS(p.x / 16, p.y / 16); ctx.font = '15px VT323, monospace'; ctx.fillStyle = '#000'; ctx.fillText('⛵', x - 5, y + 6); ctx.fillStyle = '#ffe070'; ctx.fillText('⛵', x - 6, y + 5); }
  }
};

// ---------- o navio do jogador: o mesmo convés das viagens, mas quem pilota é você ----------
class NavioLevel extends ShipLevel {
  constructor(nav, s) {
    const fake = { name: nav.nome, region: s.region, port: { cont: 0 } };
    const a = { x: nav.x, y: nav.y }, b = { x: nav.x + Math.cos(nav.ang || 0) * 40, y: nav.y + Math.sin(nav.ang || 0) * 40 };
    super(fake, fake, [a, b], false, Mar.st().negra ? '#1e1e1e' : nav.cor, { name: 'Imediato', look: { k: 'hum', skin: '#d8a070', hair: '#3a2a1a', body: '#3a4a7a', legs: '#3a3028', beard: true } });
    this.proprio = true; this.nav = nav; this.name = nav.nome; this.from = s; this.to = s;
    this.ang = nav.ang || 0; this.spd = 0; this.vela = 0; this.leme = false; this.reload = {};
  }
  maxS() { return 250 * NAVIOS[this.nav.tipo].vel; }
  savePos() { const t = Mar.terraPerto(this.x, this.y, 60); if (t) { this.nav.vis = Mar.junto(t, this.x, this.y); return { x: t.x * 16 + 8, y: t.y * 16 + 8 }; } return this.embarque; }
  progress() { return 0; }
  remaining() { return 0; }
  update(dt) {
    const G = Game, W = G.world, P = G.player, nav = this.nav;
    // no timão: o jogador fica parado ao lado do leme e o joystick escolhe o rumo
    let alvo = this.vela * this.maxS();
    if (this.leme) {
      const p = this.T(3, SHIP_C); P.x = p.x * 16 + 8; P.y = p.y * 16 + 12;
      const h = this.T(2, SHIP_C); P.setDir(Math.atan2(h.y - p.y, h.x - p.x));
      const m = Input.move;
      if (m.mag > 0.25) {
        const want = Math.atan2(m.y, m.x);
        let da = want - this.ang; while (da > Math.PI) da -= Math.PI * 2; while (da < -Math.PI) da += Math.PI * 2;
        const giro = (0.6 + 0.6 * Math.min(1, this.spd / 140)) * dt;   // vira mesmo parado (remos), mais rápido com vento
        this.ang += clamp(da, -giro, giro);
        alvo = Math.max(alvo, this.maxS() * Math.min(1, m.mag * 1.15));
      }
    }
    this.spd += clamp(alvo - this.spd, -70 * dt, 48 * dt);
    // terra à frente: o navio para (e se bater rápido, o casco sofre)
    const frente = SHIP_L * 8 + 20;
    if (this.spd > 1 && (!Mar.navegavel(this.x + Math.cos(this.ang) * frente, this.y + Math.sin(this.ang) * frente) || !Mar.navegavel(this.x + Math.cos(this.ang) * 160, this.y + Math.sin(this.ang) * 160))) {
      if (this.spd > 150) { nav.hp -= 6; G.shake = 6; Sfx.play('hit'); }
      this.spd = 0; this.x -= Math.cos(this.ang) * 6; this.y -= Math.sin(this.ang) * 6;   // recua um pouco: dá para virar e sair
      if ((this.avisoT || 0) <= 0) { this.avisoT = 4; G.toast('⚠ Terra à frente! Empurre o joystick para o mar aberto (o navio vira parado).', '#ffd080'); }
    }
    if (this.avisoT > 0) this.avisoT -= dt;
    const nx = this.x + Math.cos(this.ang) * this.spd * dt, ny = this.y + Math.sin(this.ang) * this.spd * dt;
    if (Mar.navegavel(nx, ny)) { this.x = nx; this.y = ny; } else this.spd = 0;
    nav.x = this.x; nav.y = this.y; nav.ang = this.ang;
    // o casco gira (em quartos) quando o rumo muda bastante
    const want4 = ShipLevel.oriOf(this.ang);
    let da = Math.abs(this.ang - ShipLevel.oriAng(this.ori)); if (da > Math.PI) da = Math.PI * 2 - da;
    if (want4 !== this.ori && da > Math.PI / 3.2) { this.turnT += dt; if (this.turnT > 0.45) { this.turnT = 0; this.turn(want4); } } else this.turnT = 0;
    // mundo ao redor, névoa do mapa, espuma, gaivotas e criaturas (como nas viagens)
    W.pregen(this.x + Math.cos(this.ang) * 900, this.y + Math.sin(this.ang) * 900);
    G.worldPos = { x: this.x, y: this.y };
    const ex = Math.floor(this.x / 256), ey = Math.floor(this.y / 256), M = G.mods;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const x = ex + dx, y = ey + dy; if (x >= 0 && y >= 0 && x < MAP_W && y < MAP_H && dx * dx + dy * dy <= 5) M.explored[y * MAP_W + x] = 1; }
    this.trailT -= dt;
    if (this.trailT <= 0 && this.spd > 20) {
      this.trailT = 0.16;
      const oa = ShipLevel.oriAng(this.ori), back = SHIP_L * 8 + 10;
      this.trail.push({ x: this.x - Math.cos(oa) * back, y: this.y - Math.sin(oa) * back, a: this.ang, t: G.t, seed: (Math.random() * 1000) | 0 });
      if (this.trail.length > 42) this.trail.shift();
    }
    if (this.floor === 0 && this.spd > 60 && Math.random() < dt * 12) {
      const b = this.T(SHIP_L - 1, SHIP_C), bx = b.x * 16 + 8, by = b.y * 16 + 8;
      for (let i = 0; i < 3; i++) G.particle(bx + (Math.random() - 0.5) * 20, by + (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40 - Math.cos(this.ang) * 30, -20 - Math.random() * 20, 'rgba(235,245,255,0.85)', 0.6, 1, 60);
    }
    if (Math.random() < dt * 0.1 && this.fauna.length < 3) {
      const a = Math.random() * Math.PI * 2, r = 220 + Math.random() * 160, whale = Math.random() < 0.25;
      const x = this.x + Math.cos(a) * r, y = this.y + Math.sin(a) * r;
      if (W.tileAt(Math.floor(x / 16), Math.floor(y / 16)) === T.DEEP) this.fauna.push({ kind: whale ? 'whale' : 'dolphin', x, y, vx: Math.cos(this.ang) * (whale ? 40 : 150), vy: Math.sin(this.ang) * (whale ? 40 : 150), t: 0, dur: whale ? 9 : 4 });
    }
    for (const a of this.fauna) a.t += dt;
    this.fauna = this.fauna.filter(a => a.t < a.dur);
    if (!this.gulls.length) for (let i = 0; i < 3; i++) this.gulls.push({ cx: this.w * 8 + (Math.random() - 0.5) * 80, cy: this.h * 8, r: 50 + Math.random() * 70, a: Math.random() * 6.28, s: 0.4 + Math.random() * 0.5 });
    for (const g of this.gulls) g.a += g.s * dt;
    this.creakT = (this.creakT || 3) - dt;
    if (this.creakT <= 0) { this.creakT = 4 + Math.random() * 6; Sfx.play(Math.random() < 0.5 ? 'creak' : 'wave'); }
    for (const k of ['bom', 'est']) if (this.reload[k] > 0) this.reload[k] -= dt;
    // no timão a câmera olha para o meio do navio (dá para ver o mar à frente e dos lados)
    // no timão a câmera olha para a frente do navio, para onde ele está indo
    if (this.leme) { const c = this.T(Math.floor(SHIP_L * 0.55), SHIP_C), q = this.T(3, SHIP_C); this.camOff = { x: (c.x - q.x) * 16 + Math.cos(this.ang) * 190, y: (c.y - q.y) * 16 + Math.sin(this.ang) * 130 }; } else this.camOff = null;
    G.updateWeather(dt);
    Mar.tickNavio(dt, this);
  }
  drawWorldStuff(ctx, cx, cy, vw, vh) { super.drawWorldStuff(ctx, cx, cy, vw, vh); Mar.desenhar(ctx, cx, cy); }
  drawOverlay(ctx, camX, camY) {
    this.col = Mar.st().negra ? '#1e1e1e' : this.nav.cor;
    super.drawOverlay(ctx, camX, camY);
    if (this.floor === 0 && Mar.st().negra) { const st = this.T(0, SHIP_C); Mar.caveira(ctx, Math.round(st.x * 16 + 8 - camX) + 3, Math.round(st.y * 16 + 8 - camY) - 29); }
    if (this.floor === 0) Mar.setas(ctx, this.ox() + camX, this.oy() + camY);
  }
}

// ---------- ganchos no mundo: as ilhas só entram depois de cidades, portos e masmorras ----------
(function () {
  const P = World.prototype;
  P._base0 = P.baseTile;
  const nat0 = P.natObj, gen0 = P.generateSites;
  P.generateSites = function () { gen0.call(this); try { Mar.gerarIlhas(this); } catch (e) { console.error('ilhas', e); this.ilhas = null; this.ilhaGrade = null; } };
  P.baseTile = function (x, y) {
    const t = this._base0(x, y);
    if (!this.ilhaGrade || (t !== T.DEEP && t !== T.WATER)) return t;
    const i = Mar.ilhaEm(this, x, y);
    return i ? Mar.tileIlha(this, i, x, y, t) : t;
  };
  P.natObj = function (x, y, t, ri) {
    if (this.ilhaGrade && Mar.ilhaEm(this, x, y)) { const o = Mar.objIlha(this, x, y, t); if (o >= 0) return o; }
    return nat0.call(this, x, y, t, ri);
  };
})();

// no seu navio, o minimapa vira a carta náutica: costa, ilhas e navios num raio grande
(function () {
  const d0 = UI.drawShipMinimap;
  UI.drawShipMinimap = function (L) { if (L && L.proprio) return Mar.carta(L, this.mmx); return d0.call(this, L); };
})();
