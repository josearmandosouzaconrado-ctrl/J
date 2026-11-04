'use strict';
// =====================================================================
//  PATRULHAS DO REINO
//  Você manda soldados da guarnição patrulharem uma estrada (caçando
//  bandidos) ou as matas longe da civilização (caçando lobos). A patrulha
//  anda de verdade pelo mapa: quando você está perto, os soldados aparecem
//  e lutam; longe, a patrulha segue caçando sozinha. Onde ela passa quase
//  não aparecem bandidos (ou lobos). No mapa ela aparece com 🛡.
// =====================================================================
const PAT_V = 40;          // tiles por hora do jogo
const PAT_DIAS = 3;        // dias em serviço antes de voltar

const Patrulhas = {
  lista() { const S = War.st(); return S.patrulhas || (S.patrulhas = []); },
  ativas() { return this.lista().filter(p => !p.fim); },
  agora() { return Game.day * 1440 + Game.time; },
  rota(p) {
    if (!p.path) return null;
    const c = this._r || (this._r = new Map()); let L = c.get(p.id);
    if (!L) { L = [[p.x0, p.y0]]; let x = p.x0, y = p.y0; for (const ch of p.path) { const d = EST_DIRS[ch.charCodeAt(0) - 97]; x += d[0]; y += d[1]; L.push([x, y]); } c.set(p.id, L); }
    return L;
  },
  // ---------- mandar uma patrulha ----------
  tirarTropas(n) {
    const T = Reino.st().tropas, comp = {};
    for (const k of ['soldado', 'arqueiro', 'milicia', 'cavaleiro', 'mosqueteiro']) { const q = Math.min(T[k] || 0, n); if (q > 0) { comp[k] = q; T[k] -= q; n -= q; } if (!n) break; }
    return comp;
  },
  devolver(p) {
    const T = Reino.st().tropas, tot = Object.values(p.comp).reduce((a, b) => a + b, 0) || 1;
    let resto = p.n;
    for (const k in p.comp) { const q = Math.min(resto, Math.round(p.n * p.comp[k] / tot)); T[k] = (T[k] || 0) + q; resto -= q; }
    if (resto > 0) T.milicia = (T.milicia || 0) + resto;
  },
  podeMandar(n) {
    if (!Vila.st()) return 'Funde uma vila primeiro.';
    if (Reino.total() < n) return `Faltam soldados na guarnição (tem ${Reino.total()}, precisa de ${n}). Recrute no Quartel.`;
    if (this.ativas().length >= 4) return 'Você já tem 4 patrulhas na rua.';
    return null;
  },
  mandarEstrada(o, n) {
    const erro = this.podeMandar(n); if (erro) return Game.toast(erro, '#ffa080');
    const S = War.st(); S.patId = (S.patId || 0) + 1;
    const p = { id: S.patId, tipo: 'bandidos', n, n0: n, comp: this.tirarTropas(n), x0: o.L[0][0], y0: o.L[0][1], path: Gestao.codifica(o.L), s: 0, sentido: 1, x: o.L[0][0], y: o.L[0][1], t: this.agora(), ate: Game.day + PAT_DIAS, abates: 0, perdas: 0, para: o.nome };
    this.lista().push(p); this.avisar(p);
  },
  // um lugar bem longe das estradas e das cidades, para caçar lobos
  zonaSelvagem() {
    const W = Game.world, V = Vila.st(); if (!V) return null;
    const rng = new RNG(Game.day * 31 + 7);
    for (let i = 0; i < 160; i++) {
      const a = rng.range(0, Math.PI * 2), r = rng.range(55, 130), x = Math.round(V.cx + Math.cos(a) * r), y = Math.round(V.cy + Math.sin(a) * r);
      const t = W.baseTile(x, y); if (TSOLID[t] || TWATER[t] || t === T.LAVA) continue;
      if (Game.distEstrada(x, y) < 18 || W.settlementAt(x, y)) continue;
      const s = W.nearestSettlement(x, y); if (s && dist(s.mid.x, s.mid.y, x, y) < 50) continue;
      return { x, y };
    }
    return null;
  },
  mandarMata(n) {
    const erro = this.podeMandar(n); if (erro) return Game.toast(erro, '#ffa080');
    const z = this.zonaSelvagem(); if (!z) return Game.toast('Não há matas selvagens por perto da sua vila.', '#ffa080');
    const V = Vila.st(), S = War.st(); S.patId = (S.patId || 0) + 1;
    const p = { id: S.patId, tipo: 'lobos', n, n0: n, comp: this.tirarTropas(n), x: V.cx, y: V.cy + 18, zona: z, alvo: z, t: this.agora(), ate: Game.day + PAT_DIAS, abates: 0, perdas: 0, para: 'as matas' };
    this.lista().push(p); this.avisar(p);
  },
  avisar(p) {
    Sfx.play('shout');
    Game.centerMsg('PATRULHA EM MARCHA!', p.tipo === 'bandidos' ? `${p.n} soldados vão caçar bandidos na estrada até ${p.para}` : `${p.n} soldados vão caçar lobos nas matas`);
    Game.chron(p.tipo === 'bandidos' ? `Mandei uma patrulha caçar bandidos na estrada até ${p.para}.` : 'Mandei uma patrulha caçar lobos nas matas.');
    Gestao.tela('pat');
  },
  // ---------- o tempo passa: a patrulha anda e caça ----------
  tick(dt) {
    const G = Game; if (!G.started || !G.player || !G.world || !War.K) return;
    this.tT = (this.tT || 0) - dt;
    if (this.tT > 0) return; this.tT = 0.25;
    const now = this.agora();
    for (const p of this.ativas()) {
      const dm = clamp(now - p.t, 0, 1440 * 4); p.t = now; if (!dm) continue;
      this.anda(p, dm / 60 * PAT_V);
      // caça (contada por hora) e as baixas
      p.acc = (p.acc || 0) + dm / 60;
      while (p.acc >= 1) {
        p.acc -= 1;
        if (p.voltando) continue;
        const forca = Math.min(1.5, p.n / 6);
        if (Math.random() < (p.tipo === 'bandidos' ? 0.22 : 0.28) * forca) p.abates++;
        if (Math.random() < 0.025) { p.n--; p.perdas++; }
      }
      if (p.n <= 0) { p.fim = true; this.limparVisiveis(p); G.toast('🛡 Uma patrulha foi destruída!', '#ff8080'); G.chron('Perdi uma patrulha inteira.'); continue; }
      if (!p.voltando && G.day >= p.ate) this.voltar(p);
    }
    if (G.level && G.level.isWorld) this.visiveis();
  },
  anda(p, passo) {
    const V = Vila.st();
    if (p.voltando) {
      const tx = V ? V.cx : p.x, ty = V ? V.cy + 18 : p.y, d = dist(p.x, p.y, tx, ty);
      if (d <= passo) { this.chegou(p); return; }
      p.x += (tx - p.x) / d * passo; p.y += (ty - p.y) / d * passo; return;
    }
    if (p.tipo === 'bandidos') {
      // vai e volta pela estrada
      const L = this.rota(p); if (!L) return;
      p.s += passo * p.sentido;
      if (p.s >= L.length - 1) { p.s = L.length - 1; p.sentido = -1; }
      if (p.s <= 0) { p.s = 0; p.sentido = 1; }
      const i = Math.floor(p.s), k = p.s - i, a = L[i], b = L[Math.min(L.length - 1, i + 1)];
      p.x = a[0] + (b[0] - a[0]) * k; p.y = a[1] + (b[1] - a[1]) * k;
    } else {
      // anda até a mata e depois vai de clareira em clareira
      const d = dist(p.x, p.y, p.alvo.x, p.alvo.y);
      if (d <= passo) { p.x = p.alvo.x; p.y = p.alvo.y; const a = Math.random() * Math.PI * 2, r = 6 + Math.random() * 22; p.alvo = { x: p.zona.x + Math.cos(a) * r, y: p.zona.y + Math.sin(a) * r }; }
      else { p.x += (p.alvo.x - p.x) / d * passo; p.y += (p.alvo.y - p.y) / d * passo; }
    }
  },
  voltar(p) { p.voltando = true; },
  chegou(p) {
    p.fim = true; this.devolver(p); this.limparVisiveis(p);
    const txt = `${p.abates} ${p.tipo === 'bandidos' ? 'bandidos' : 'lobos'} abatidos${p.perdas ? `, ${p.perdas} soldado(s) perdido(s)` : ''}`;
    Game.toast(`🛡 A patrulha voltou: ${txt}.`, '#a0e0a0'); Game.chron(`Uma patrulha voltou: ${txt}.`);
    if (p.abates >= 3) Vida.honra(1, 'as estradas estão mais seguras');
  },
  // ---------- onde há patrulha, quase não aparecem bandidos (nem lobos) ----------
  suprime(pick, tx, ty) {
    const lobo = /^lobo/.test(pick), band = Game.tabelaEstrada([]).some(e => e[0] === pick) || /bandido|pistoleiro|renegado|ronin|ninja|cultista/.test(pick);
    if (!lobo && !band) return false;
    for (const p of this.ativas()) { if ((p.tipo === 'lobos') !== lobo) continue; if (dist(p.x, p.y, tx, ty) < 75 && Math.random() < 0.85) return true; }
    return false;
  },
  // longe das estradas e das cidades: matilhas de lobos e muitos bichos
  tabelaSelvagem(R, tx, ty, de) {
    if (de < 18 || !R || R.hostile || ['desert', 'volcanic', 'dead', 'cosmic', 'obsidian', 'reef'].includes(R.biome)) return null;
    const s = Game.world.nearestSettlement(tx, ty); if (s && dist(s.mid.x, s.mid.y, tx, ty) < 40) return null;
    if (Math.random() > 0.55) return null;
    const frio = R.biome === 'snow' || R.biome === 'mountain' || Estacoes.inverno();
    return frio ? [['lobo_gelo', 4], ['lobo', 2], ['urso', 1]] : [['lobo', 5], ['javali', 1.5], ['urso', 1]];
  },
  // ---------- os soldados que dá para ver ----------
  vivos(p) { return Game.actors.filter(a => a.patrulha === p.id && !a.dead); },
  limparVisiveis(p) { Game.actors = Game.actors.filter(a => a.patrulha !== p.id); },
  visiveis() {
    const G = Game, P = G.player;
    for (const p of this.ativas()) {
      const px = p.x * 16 + 8, py = p.y * 16 + 8, d = dist(px, py, P.x, P.y), V = this.vivos(p);
      if (d > 820) { if (V.length) this.limparVisiveis(p); continue; }
      if (d > 640) continue;
      const quer = Math.min(6, p.n);
      if (V.length >= quer) continue;
      const kinds = []; for (const k in p.comp) for (let i = 0; i < p.comp[k]; i++) kinds.push(k);
      const rng = new RNG(p.id * 977 + V.length);
      for (let i = V.length; i < quer; i++) {
        const kind = kinds[i % Math.max(1, kinds.length)] || 'soldado', a = (i / quer) * Math.PI * 2;
        const m = War.makeSoldier('jogador', kind, px + Math.cos(a) * 18, py + Math.sin(a) * 12, rng);
        m.ctrl = 'patrulha'; m.patrulha = p.id; m.slot = i; m.aggro = 230; m.name = 'Patrulheiro de ' + Reino.nome().replace(/^Reino de /, '');
        if (collides(G.world, m.x, m.y, m.r)) G.findFree(m);
        G.actors.push(m);
      }
    }
  },
  // sem inimigo por perto: o soldado acompanha a patrulha em formação
  steer(m, dt, sf) {
    const p = this.lista().find(q => q.id === m.patrulha); if (!p || p.fim) { m.dead = true; return true; }
    const a = (m.slot / 6) * Math.PI * 2 + Game.t * 0.05, tx = p.x * 16 + 8 + Math.cos(a) * 20, ty = p.y * 16 + 8 + Math.sin(a) * 12;
    m.home = { x: tx, y: ty };
    const d = dist(m.x, m.y, tx, ty);
    if (d > 500) { m.x = tx; m.y = ty; Game.findFree(m); return true; }
    if (d > 6) m.moveToward(tx, ty, m.spd * (d > 80 ? 1.4 : 1) * sf, dt); else { m.moving = false; }
    return true;
  },
  // ---------- telas ----------
  html(f) {
    const ats = this.ativas(), tot = Reino.total();
    let h = `<div class="small">Soldados na guarnição: <b>${tot}</b> • patrulhas na rua: <b>${ats.length}</b>/4</div>`;
    for (const p of ats) h += `<div class="quest"><b class="gold">🛡 ${p.tipo === 'bandidos' ? 'Caça aos bandidos' : 'Caça aos lobos'}</b> — ${p.tipo === 'bandidos' ? `estrada até ${esc(p.para)}` : 'nas matas selvagens'}<br><small>${p.n}/${p.n0} soldados • ${p.abates} abatidos • ${p.voltando ? 'voltando para casa' : `volta no dia ${p.ate}`} • a ${(dist(Game.player.x / 16, Game.player.y / 16, p.x, p.y) * 2 / 1000).toFixed(1)} km</small> <button class="sbtn small" ${f(() => { this.voltar(p); Gestao.tela('pat'); })}>Chamar de volta</button></div>`;
    h += '<div class="sub">Mandar patrulha contra bandidos (pela estrada)</div>';
    const op = Gestao.opcoes().filter(o => o.dest).slice(0, 5);
    h += op.length ? op.map(o => `<div class="arm-l">🛡 Estrada até <b>${esc(o.nome)}</b> (${o.L.length} trechos) <button class="sbtn small" ${f(() => this.mandarEstrada(o, 6))}>6 soldados</button><button class="sbtn small gold" ${f(() => this.mandarEstrada(o, 12))}>12 soldados</button></div>`).join('') : '<div class="dim small">Nenhuma estrada por perto da vila.</div>';
    h += `<div class="sub">Mandar patrulha contra lobos (nas matas)</div><div class="arm-l">🐺 Matas selvagens perto da vila <button class="sbtn small" ${f(() => this.mandarMata(6))}>6 soldados</button><button class="sbtn small gold" ${f(() => this.mandarMata(12))}>12 soldados</button></div>`;
    return h + `<div class="dim small">A patrulha fica ${PAT_DIAS} dias na rua e volta com os sobreviventes. Onde ela passa quase não aparecem bandidos (ou lobos). Quando você está perto, os soldados aparecem e lutam de verdade. No mapa elas aparecem com 🛡.</div>`;
  },
  drawMap(ctx, toS) {
    ctx.font = '12px VT323, monospace';
    for (const p of this.ativas()) { const [x, y] = toS(p.x, p.y); ctx.fillStyle = '#000'; ctx.fillRect(x - 4, y - 4, 9, 9); ctx.fillStyle = p.tipo === 'bandidos' ? '#60b0ff' : '#a0e070'; ctx.fillRect(x - 3, y - 3, 7, 7); ctx.fillStyle = '#fff'; ctx.fillRect(x - 1, y - 2, 3, 5); }
  }
};

// ---------------- ganchos ----------------
(function () {
  const st0 = War.steer; War.steer = function (m, dt, sf) { if (m.patrulha) return Patrulhas.steer(m, dt, sf); return st0.apply(this, arguments); };
  // soldado da patrulha morreu / patrulha matou alguém
  const md0 = Game.onMonsterDeath;
  Game.onMonsterDeath = function (m, killer) {
    if (m.patrulha) { const p = Patrulhas.lista().find(q => q.id === m.patrulha); if (p && !p.fim) { p.n--; p.perdas++; } m.repr = 0; }
    else if (killer && killer.patrulha) { const p = Patrulhas.lista().find(q => q.id === killer.patrulha); if (p) p.abates++; }
    return md0.apply(this, arguments);
  };
  const m0 = War.drawMap; War.drawMap = function (ctx, toS, z) { m0.call(this, ctx, toS, z); Patrulhas.drawMap(ctx, toS); };
})();
