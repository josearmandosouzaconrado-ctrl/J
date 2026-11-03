'use strict';
// ===================== POSTOS AVANÇADOS =====================
// Cada reino mantém acampamentos militares no caminho dos rivais: paliçada, tendas, fogueira e a
// bandeira do reino, com soldados de guarda. Os exércitos partem deles para a guerra. Em guerra,
// dá para destruir o posto do inimigo matando a guarda. Depois da independência o jogador escolhe
// onde montar os seus (até 4): lá suas tropas se reúnem e você pode descansar.
const Postos = {
  _lista: null,
  st() { const S = War.st(); if (!S.postosCaidos) S.postosCaidos = {}; return S; },
  meus() { const R = Game.player && Game.player.reino; return R ? (R.postos || (R.postos = [])) : []; },
  // postos dos reinos (gerados pelo mapa) + os do jogador
  lista() {
    const W = Game.world; if (!W || !War.K) return [];
    if (!this._lista || this._lista.w !== W) this._lista = { w: W, l: this.gerar(W) };
    const meus = this.meus(); for (const p of meus) { p.k = 'jogador'; this.carimbo(W, p); }
    return this._lista.l.concat(meus);
  },
  livre(W, x, y) {
    if (!W.isLand(x, y)) return false;
    for (let dy = -6; dy <= 6; dy += 3) for (let dx = -6; dx <= 6; dx += 3) { const t = W.baseTile(x + dx, y + dy); if (TSOLID[t] || TWATER[t] || t === T.DEEP || t === T.LAVA) return false; }
    return W.farFrom(x, y, W.settlements, 40) && W.farFrom(x, y, W.dungeons, 20) && W.farFrom(x, y, W.pois, 16);
  },
  gerar(W) {
    const out = [], ks = Object.values(War.K).filter(K => K.id !== 'jogador' && K.cap && !(War.st().extintos || {})[K.id]);
    for (const K of ks) {
      const outros = ks.filter(o => o !== K && contAt(o.cap.x, o.cap.y) === contAt(K.cap.x, K.cap.y)).sort((a, b) => dist(a.cap.x, a.cap.y, K.cap.x, K.cap.y) - dist(b.cap.x, b.cap.y, K.cap.x, K.cap.y)).slice(0, 2);
      outros.forEach((o, i) => {
        const tx = lerp(K.cap.x, o.cap.x, 0.38), ty = lerp(K.cap.y, o.cap.y, 0.38), rng = new RNG(hashStr(K.id + o.id) + W.seed);
        const pos = W.findLand(tx, ty, rng, 90, (x, y) => this.livre(W, x, y) && W.regionAt(x, y) === W.regionAt(K.cap.x, K.cap.y));
        if (pos && W.farFrom(pos.x, pos.y, out, 60)) out.push({ id: 'posto_' + K.id + i, k: K.id, x: pos.x, y: pos.y });
      });
    }
    for (const p of out) this.carimbo(W, p);
    return out;
  },
  carimbo(W, p) {
    if (!this._feitos || this._feitos.w !== W) this._feitos = { w: W, s: new Set() };
    if (this._feitos.s.has(p.id)) return; this._feitos.s.add(p.id);
    const N = 11, x0 = p.x - 5, y0 = p.y - 5, tiles = new Uint8Array(N * N).fill(255), objs = new Uint8Array(N * N).fill(0);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const j = y * N + x, borda = x === 0 || y === 0 || x === N - 1 || y === N - 1;
      tiles[j] = T.DIRT;
      if (borda && !(y === N - 1 && x >= 4 && x <= 6)) objs[j] = O.FENCE;
    }
    for (const [x, y, o] of [[5, 5, O.CAMPFIRE], [2, 2, O.TENT], [8, 2, O.TENT], [2, 7, O.TENT], [5, 2, O.BANNER], [8, 7, O.CRATE], [8, 8, O.BARREL], [3, 5, O.DUMMY]]) objs[y * N + x] = o;
    W.addStamp({ x0, y0, w: N, h: N, tiles, objs, posto: p.id });
    for (let cy = (y0 >> 5) - 1; cy <= ((y0 + N) >> 5) + 1; cy++) for (let cx = (x0 >> 5) - 1; cx <= ((x0 + N) >> 5) + 1; cx++) { const k = W.ckey(cx, cy); W.chunks.delete(k); W.canvases.delete(k); }
  },
  caido(p) { const d = this.st().postosCaidos[p.id]; return d !== undefined && Game.day - d < 8; },
  deReino(k, alvo) {
    let best = null, bd = Infinity;
    for (const p of this.lista()) if (p.k === k && !this.caido(p)) { const d = dist(p.x, p.y, alvo.x, alvo.y); if (d < bd) { bd = d; best = p; } }
    return best;
  },
  // ---------- guarda do posto ----------
  tick(dt) {
    const G = Game, P = G.player; if (!G.level || !G.level.isWorld || !P || !War.K) return;
    this.t = (this.t || 0) - dt; if (this.t > 0) return; this.t = 1.5;
    const ptx = P.x / 16, pty = P.y / 16;
    for (const p of this.lista()) {
      if (p.k === 'jogador' && !War.K.jogador) continue;
      const d = dist(ptx, pty, p.x, p.y);
      if (!p.on && d < 45 && !this.caido(p)) {
        p.on = true; const rng = new RNG(hashStr(p.id) + G.day);
        for (let i = 0; i < 4; i++) {
          const m = War.makeSoldier(p.k, i === 0 ? 'cavaleiro' : i === 3 ? 'arqueiro' : 'soldado', (p.x + (i % 2 ? 2 : -2)) * 16 + 8, (p.y + (i < 2 ? -1 : 2)) * 16 + 8, rng);
          G.findFree(m); m.ctrl = 'posto'; m.posto = p.id; m.home = { x: p.x * 16 + 8, y: p.y * 16 + 8 }; m.aggro = 200;
          G.actors.push(m);
        }
      } else if (p.on && d > 80) { p.on = false; G.actors = G.actors.filter(a => a.posto !== p.id); }
      else if (p.on && p.k !== 'jogador' && War.atWar('jogador', p.k) && !G.actors.some(a => a.posto === p.id && !a.dead)) {
        // a guarda caiu: o posto inimigo foi destruído
        this.st().postosCaidos[p.id] = G.day; p.on = false;
        G.centerMsg('POSTO AVANÇADO DESTRUÍDO!', `${War.K[p.k].short} perdeu um acampamento militar.`); Sfx.play('quest');
        War.news(`⛺ O posto avançado de ${War.K[p.k].short} foi destruído.`, true, [p.k, 'jogador']);
        Reino.addRel(p.k, -6);
      }
    }
  },
  // ---------- postos do jogador ----------
  podeMontar() {
    const G = Game, P = G.player, W = G.world;
    if (!Reino.ativo()) return 'Só depois da independência o seu reino pode ter postos avançados.';
    if (!G.level.isWorld) return 'Saia para o mundo aberto.';
    if (this.meus().length >= 4) return 'Seu reino já tem 4 postos avançados.';
    const x = Math.round(P.x / 16), y = Math.round(P.y / 16);
    if (!this.livre(W, x, y)) return 'Aqui não dá: escolha um campo aberto longe de cidades, masmorras e da água.';
    if (!W.farFrom(x, y, this.lista(), 40)) return 'Já existe um posto avançado perto daqui.';
    return null;
  },
  montar() {
    const P = Game.player, erro = this.podeMontar();
    if (erro) return Game.toast(erro, '#ffa080');
    const custo = { tabua: 30, couro: 6 };
    if (P.gold < 1500) return Game.toast('O posto custa 1500 de ouro, 30 tábuas e 6 couros.', '#ff8080');
    if (!Game.hasMats(custo)) return Game.toast('Faltam materiais: 30 tábuas e 6 couros.', '#ff8080');
    P.gold -= 1500; Game.takeMats(custo);
    const p = { id: 'posto_j' + Date.now(), x: Math.round(P.x / 16), y: Math.round(P.y / 16) + 3, nome: 'Posto ' + (this.meus().length + 1) };
    this.meus().push(p); this.carimbo(Game.world, p);
    UI.close(); UI.fade(); Sfx.play('forge');
    Game.centerMsg('POSTO AVANÇADO MONTADO', 'Suas tropas podem se reunir aqui e você pode descansar no acampamento.');
    Game.chron(`Montei um posto avançado do ${Reino.nome()} em ${Game.locationName()}.`);
  },
  perto(k = 'jogador') { const P = Game.player; return this.lista().find(p => p.k === k && dist(P.x / 16, P.y / 16, p.x, p.y) < 9) || null; },
  findInteract(fx, fy) {
    if (!Game.level.isWorld) return null;
    const p = this.lista().find(p => p.k === 'jogador' && dist(fx / 16, fy / 16, p.x, p.y - 3) < 1.6);
    return p ? { kind: 'mar', fn: () => this.menu(p), label: 'Posto', name: 'Posto avançado', d: 2 } : null;
  },
  menu(p) {
    const P = Game.player;
    UI.dialog('Posto avançado', null, `Acampamento militar do <b>${esc(Reino.nome())}</b>.<br>Tropas na reserva: <b>${Reino.total()}</b>.`, [
      { label: '💤 Descansar no acampamento', fn: () => UI.rest(null, 0) },
      ...(War.warOf('jogador').length && Reino.total() >= 5 && !Reino.campo() ? [{ label: '🚩 Reunir o exército aqui', cls: 'gold', fn: () => { UI.close(); Reino.formar(1); } }] : []),
      { label: 'Fechar' }
    ]);
    void P;
  },
  botoesTab(f) {
    if (!Reino.ativo()) return '';
    const l = this.meus();
    return `<div class="quest"><b>⛺ Postos avançados</b> <small class="dim">(${l.length}/4)</small><br><small class="dim">Vá até o lugar que quiser (campo aberto) e monte um acampamento militar. 1500 ouro, 30 tábuas e 6 couros.</small><br><button class="mbtn" ${f(() => this.montar())}>⛺ Montar posto avançado aqui</button></div>`;
  },
  drawMap(ctx, toS) {
    ctx.font = '13px VT323, monospace';
    for (const p of this.lista()) {
      if (p.k !== 'jogador' && !Game.mods.discovered.has(p.id) && !(Game.mods.explored && Game.mods.explored[Math.floor(p.y / 16) * MAP_W + Math.floor(p.x / 16)])) continue;
      const [x, y] = toS(p.x, p.y), K = War.K[p.k]; if (!K) continue;
      ctx.fillStyle = '#000'; ctx.fillText('⛺', x - 5, y + 6); ctx.fillStyle = this.caido(p) ? '#808080' : K.color; ctx.fillText('⛺', x - 6, y + 5);
    }
  }
};
