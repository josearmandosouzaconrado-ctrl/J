'use strict';
// =====================================================================
//  ATIVIDADES NOS CONTINENTES — muito mais coisa para fazer pelo mundo
//  • Quadro de Caçadas (capitais): a fera lendária da região, com
//    recompensa, e mapas do tesouro para cavar o X no mapa.
//  • Corrida de cavalos (hipódromos perto das capitais): 6 postos com
//    bandeiras, contra o tempo de 3 rivais.
//  • Dados na praça (capitais e cidades): aposta contra a casa.
//  • Roda de capoeira (Vera Cruz e Quilombo) e Desafio dos Tambores
//    (nórdicos, gigantes, orcs e tribos): ritmo com as setas.
//  • Mergulho de pérolas (portos e costas): quanto mais fundo, mais
//    pérolas e mais perigo de faltar fôlego.
//  • Escavações (Valtheria, Elyndra e Pindorama): relíquias antigas
//    para vender aos colecionadores.
//  • Colheita tropical (Pindorama): açaí, banana e buriti nas árvores.
//  Tudo é gerado a partir da semente do mundo (o mesmo mundo tem sempre
//  as mesmas atividades) e o progresso fica salvo no jogador (P.atv).
// =====================================================================
idef('trofeu_lenda', { name: 'Troféu de Fera Lendária', type: 'material', value: 260, stack: true, icon: { k: 'crate', c: '#e0b040' }, desc: 'A prova de que você venceu uma lenda. Colecionadores pagam bem.' });
idef('reliquia_antiga', { name: 'Relíquia Antiga', type: 'material', value: 120, stack: true, icon: { k: 'ring', c: '#c0a070' }, desc: 'Um objeto de um povo esquecido, tirado de uma escavação.' });
idef('idolo_dourado', { name: 'Ídolo Dourado', type: 'material', value: 320, stack: true, icon: { k: 'ring', c: '#f0c040' }, desc: 'Pequena estátua de ouro maciço. Muito rara.' });
idef('tabua_runas', { name: 'Tábua de Runas', type: 'material', value: 180, stack: true, icon: { k: 'crate', c: '#8a8a9a' }, desc: 'Pedra gravada com uma escrita que ninguém mais sabe ler.' });
idef('ceramica_pintada', { name: 'Cerâmica Pintada', type: 'material', value: 150, stack: true, icon: { k: 'bottle', c: '#c0603a' }, desc: 'Vaso antigo com grafismos vermelhos e pretos, achado na terra de Pindorama.' });
idef('acai', { name: 'Tigela de Açaí', type: 'food', use: { heal: 12, drink: 15 }, value: 6, stack: true, icon: { k: 'bottle', c: '#5a2a6a' } });
idef('banana', { name: 'Cacho de Banana', type: 'food', use: { heal: 10 }, value: 4, stack: true, icon: { k: 'apple', c: '#f0d040' } });
idef('buriti', { name: 'Frutos de Buriti', type: 'food', use: { heal: 8, drink: 8 }, value: 4, stack: true, icon: { k: 'apple', c: '#a0461e' } });

const Atividades = {
  spots: [], W: null, ritmoEl: null,
  st() { const P = Game.player; if (!P.atv) P.atv = { feitas: {}, cd: {} }; return P.atv; },
  dia() { return Game.day || 0; },
  // ---------- onde fica cada atividade ----------
  lista() {
    const W = Game.world;
    if (!W || this.W === W) return this.spots;
    this.W = W; this.spots = [];
    const rng = new RNG(W.seed * 41 + 2027), S = this.spots;
    const livre = (x, y) => {
      const t = W.baseTile(x, y); if (TSOLID[t] || TWATER[t] || t === T.LAVA) return false;
      for (const s of W.stampIndex.get(W.ckey(x >> 5, y >> 5)) || []) {
        if (x < s.x0 || y < s.y0 || x >= s.x0 + s.w || y >= s.y0 + s.h) continue;
        const i = (y - s.y0) * s.w + (x - s.x0), tt = s.tiles[i], o = s.objs[i];
        if (o || (tt !== 255 && (TSOLID[tt] || TWATER[tt]))) return false;
      }
      return true;
    };
    const perto = (s, dx0, dy0) => {
      for (let r = 0; r < 9; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        const x = s.mid.x + dx0 + dx, y = s.mid.y + dy0 + dy;
        if (livre(x, y) && livre(x + 1, y) && livre(x - 1, y) && livre(x, y + 1) && !S.some(q => Math.abs(q.x - x) < 3 && Math.abs(q.y - y) < 3)) return { x, y };
      }
      return null;
    };
    const add = (kind, s, p, extra) => { if (p) S.push(Object.assign({ kind, x: p.x, y: p.y, s, id: kind + ':' + (s ? s.id : p.x + ',' + p.y) }, extra || {})); };
    const RITMO = { colonial: 'capoeira', quilombo: 'capoeira', nordic: 'tambores', giant: 'tambores', orc: 'tambores', tribal: 'tambores', oca: 'tambores' };
    const CAVALOS = new Set(['human', 'imperial', 'industrial', 'colonial', 'nordic', 'orc', 'desert', 'giant', 'jade', 'tribal', 'taipa', 'elf', 'halfling', 'dwarf', 'fort']);
    for (const s of W.settlements) {
      if (!s.mid || s.academy || s.region.neutral || s.pirata) continue;
      const cul = s.region.culture;
      if (s.type === 'port') { if (rng.chance(0.5)) add('perolas', s, perto(s, 0, 0)); continue; }
      if (s.type === 'capital') {
        add('quadro', s, perto(s, -4, 3));
        add('dados', s, perto(s, 4, 3));
        if (CAVALOS.has(cul) && !s.region.hostile) {
          // hipódromo: um círculo de terra firme fora da cidade
          for (const [ox, oy] of [[0, 1], [1, 0], [-1, 0], [0, -1]]) {
            const cx = s.mid.x + ox * 70, cy = s.mid.y + oy * 70;
            const pts = []; let ok = true;
            for (let k = 0; k < 6 && ok; k++) { const a = k / 6 * Math.PI * 2, x = Math.round(cx + Math.cos(a) * 24), y = Math.round(cy + Math.sin(a) * 15); if (!W.isLand(x, y) || !W.isLand(x + 1, y) || !W.isLand(x, y + 1)) ok = false; pts.push({ x, y }); }
            if (!ok || !W.isLand(cx, cy) || W.settlements.some(q => q !== s && dist(q.x, q.y, cx, cy) < 45)) continue;
            add('hipodromo', s, { x: pts[0].x + 3, y: pts[0].y }, { pista: pts });
            break;
          }
        }
      } else if (s.type === 'town' && rng.chance(0.55)) add('dados', s, perto(s, 3, 3));
      if (RITMO[cul] && (s.type === 'capital' || (s.type === 'town' && rng.chance(0.6)) || (s.type === 'village' && rng.chance(0.25)))) add(RITMO[cul], s, perto(s, -3, -4));
    }
    // escavações: sítios antigos espalhados por Valtheria, Elyndra, Nyxhal e Pindorama
    for (const R of W.regions) {
      const c = R.cont || 0; if (c !== 2 && c !== 4 && c !== 5) continue;
      for (let i = 0, n = 0; i < 80 && n < 2; i++) {
        const a = rng.next() * Math.PI * 2, d = 200 + rng.next() * 700, x = Math.round(R.cx + Math.cos(a) * d), y = Math.round(R.cy + Math.sin(a) * d);
        if (contAt(x, y) !== c || W.regionAt(x, y) !== R.index || !W.isLand(x, y) || !W.isLand(x + 1, y) || !W.isLand(x, y + 1)) continue;
        if (!W.farFrom(x, y, W.settlements, 40) || !W.farFrom(x, y, W.dungeons, 25) || !livre(x, y)) continue;
        add('escavacao', null, { x, y }, { R, id: 'escavacao:' + R.id + n }); n++;
      }
    }
    return S;
  },
  NOMES: { quadro: 'Quadro de Caçadas', dados: 'Mesa de Dados', hipodromo: 'Hipódromo', capoeira: 'Roda de Capoeira', tambores: 'Desafio dos Tambores', perolas: 'Mergulho de Pérolas', escavacao: 'Sítio de Escavação' },
  ROTULO: { quadro: 'Ler', dados: 'Apostar', hipodromo: 'Correr', capoeira: 'Jogar', tambores: 'Tocar', perolas: 'Mergulhar', escavacao: 'Escavar' },

  // ---------- interação ----------
  findInteract(fx, fy) {
    const G = Game, L = G.level, P = G.player; if (!L || !L.isWorld || !P) return null;
    let best = null, bd = 26;
    for (const s of this.lista()) {
      const d = dist(fx, fy, s.x * 16 + 8, s.y * 16 + 4); if (d >= bd) continue;
      bd = d; best = { kind: 'mar', fn: () => this.usar(s), label: this.ROTULO[s.kind], name: this.NOMES[s.kind] + (s.s ? ' de ' + s.s.name : ''), d: d - 20 };
    }
    const A = P.atv;
    if (A && A.tesouro && dist(P.x, P.y, A.tesouro.x * 16 + 8, A.tesouro.y * 16 + 8) < 30) best = { kind: 'mar', fn: () => this.cavarTesouro(), label: 'Cavar', name: 'X do mapa do tesouro', d: -10 };
    // frutas das árvores de Pindorama
    if (!best) {
      const tx0 = Math.floor(fx / 16), ty0 = Math.floor(fy / 16);
      for (let dy = -1; dy <= 1 && !best; dy++) for (let dx = -1; dx <= 1 && !best; dx++) {
        const tx = tx0 + dx, ty = ty0 + dy, o = L.objAt(tx, ty), f = o === O.ACAI ? 'acai' : o === O.BANANEIRA ? 'banana' : o === O.BURITI ? 'buriti' : null;
        if (!f) continue;
        const k = 'fruta:' + tkey(tx, ty), cd = this.st().cd[k];
        if (cd !== undefined && this.dia() - cd < 3) continue;
        best = { kind: 'mar', fn: () => this.colher(tx, ty, f, k), label: 'Colher', name: OBJ_DEFS[o].name, d: -2 };
      }
    }
    return best;
  },
  usar(s) {
    switch (s.kind) {
      case 'quadro': return this.quadro(s.s);
      case 'dados': return this.dados(s, 0);
      case 'hipodromo': return this.corridaMenu(s);
      case 'capoeira': case 'tambores': return this.ritmoMenu(s);
      case 'perolas': return this.perolas(s);
      case 'escavacao': return this.escavar(s);
    }
  },

  // ---------- quadro de caçadas: fera lendária e mapas do tesouro ----------
  feraDe(R) {
    const lista = (SPAWNS[R.id] || SPAWNS.valdoria || { day: [] }).day.concat((SPAWNS[R.id] || { night: [] }).night || []);
    let best = null, hp = 0;
    for (const [id] of lista) { const d = ENEMIES[id]; if (!d || d.boss || d.passive || d.ally) continue; if (d.hp > hp) { hp = d.hp; best = id; } }
    return best || 'lobo';
  },
  quadro(s) {
    const A = this.st(), R = s.region, P = Game.player, fera = this.feraDe(R), def = ENEMIES[fera];
    const chave = 'lenda:' + R.id, feita = A.feitas[chave], lvl = (R.lvl ? R.lvl[1] : 20) + 4;
    const premio = 250 + lvl * 18;
    const nome = `${def.name}, o Terror de ${R.short || R.name}`;
    let html = `<b>Caçada Lendária</b><br>${feita ? `<span class="good">A lenda desta região já foi abatida por você.</span>` : `Procura-se: <b>${esc(nome)}</b> (nível ${lvl}). Recompensa: <b>${premio} ouro</b> e o troféu da fera.`}`;
    if (A.cacada && A.cacada.regiao === R.id) html += `<br><span class="dim">Você já aceitou esta caçada. Siga a seta na tela.</span>`;
    html += `<br><br><b>Mapas do tesouro</b><br>Um velho mapa com um X marcado em algum lugar deste continente: 120 ouro.` + (A.tesouro ? '<br><span class="dim">Você já tem um mapa em andamento.</span>' : '');
    const op = [];
    if (!feita && !(A.cacada && A.cacada.regiao === R.id)) op.push({ label: '🏹 Aceitar a caçada', cls: 'gold', fn: () => { UI.close(); this.aceitarCacada(s, fera, nome, lvl, premio); } });
    if (!A.tesouro) op.push({ label: '🗺 Comprar mapa do tesouro (120 ouro)', fn: () => { if (P.gold < 120) return Game.toast('Ouro insuficiente.', '#ff8080'); UI.close(); this.novoTesouro(s); } });
    op.push({ label: 'Voltar', fn: () => UI.close() });
    UI.dialog(this.NOMES.quadro + ' de ' + esc(s.name), null, html, op);
  },
  aceitarCacada(s, fera, nome, lvl, premio) {
    const W = Game.world, R = s.region, rng = new RNG(W.seed + hashStr(R.id) * 7);
    let alvo = null;
    for (let i = 0; i < 300 && !alvo; i++) {
      const a = rng.next() * Math.PI * 2, d = 120 + rng.next() * 260, x = Math.round(s.mid.x + Math.cos(a) * d), y = Math.round(s.mid.y + Math.sin(a) * d);
      if (contAt(x, y) === contAt(s.x, s.y) && W.isLand(x, y) && W.farFrom(x, y, W.settlements, 30)) alvo = { x, y };
    }
    if (!alvo) return Game.toast('Ninguém sabe onde a fera anda agora. Tente mais tarde.', '#ffd080');
    this.st().cacada = { regiao: R.id, fera, nome, lvl, premio, x: alvo.x, y: alvo.y };
    Sfx.play('quest'); Game.centerMsg('Caçada Lendária', `${nome} foi vista longe da cidade. Siga a seta.`);
  },
  novoTesouro(s) {
    const W = Game.world, P = Game.player, rng = new RNG(W.seed + this.dia() * 131 + Math.floor(P.x));
    for (let i = 0; i < 400; i++) {
      const a = rng.next() * Math.PI * 2, d = 160 + rng.next() * 480, x = Math.round(s.mid.x + Math.cos(a) * d), y = Math.round(s.mid.y + Math.sin(a) * d);
      if (contAt(x, y) !== contAt(s.x, s.y) || !W.isLand(x, y) || !W.isLand(x + 1, y) || !W.farFrom(x, y, W.settlements, 25)) continue;
      P.gold -= 120; this.st().tesouro = { x, y }; Sfx.play('coin');
      Game.centerMsg('Mapa do tesouro', 'O X está marcado. Siga a seta e cave quando chegar.');
      return;
    }
    Game.toast('O mapa está borrado demais... tente outro dia.', '#ffd080');
  },
  cavarTesouro() {
    const P = Game.player, A = this.st(), rng = new RNG(hashStr(tkey(A.tesouro.x, A.tesouro.y)));
    const pa = P.count('picareta') ? 1 : 0;
    const ouro = rng.int(150, 420) + pa * 80, lvl = Math.max(5, P.level + 2);
    P.gold += ouro;
    const ganhos = [`${ouro} ouro`];
    if (rng.chance(0.6)) { const g = rng.pick(['rubi', 'safira', 'esmeralda', 'ametista']); P.addItem(Items.make(g)); ganhos.push(ITEMS[g].name); }
    if (rng.chance(0.45)) { const it = Items.randomGear(lvl, rng, 0.12); P.addItem(it); ganhos.push(it.name); }
    if (rng.chance(0.2)) { P.addItem(Items.make('idolo_dourado')); ganhos.push('Ídolo Dourado'); }
    A.tesouro = null; A.tesouros = (A.tesouros || 0) + 1;
    Game.burst(P.x, P.y, '#e0c050', 20, 70); Sfx.play('coin'); Game.shake = 3;
    Game.centerMsg('Tesouro encontrado!', ganhos.join(' • '));
    if (Game.chron) Game.chron('Desenterrei um tesouro marcado num velho mapa.');
  },

  // ---------- dados ----------
  dados(s, ult) {
    const P = Game.player, lance = () => [1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)];
    const jogar = aposta => {
      if (P.gold < aposta) return Game.toast('Ouro insuficiente.', '#ff8080');
      const a = lance(), b = lance(), va = a[0] + a[1], vb = b[0] + b[1];
      let txt = `Você: <b>${a.join(' + ')} = ${va}</b><br>Casa: <b>${b.join(' + ')} = ${vb}</b><br><br>`;
      if (va === 12 && vb !== 12) { P.gold += aposta * 3; txt += `<span class="good">Dois seis! Você ganha ${aposta * 3} ouro!</span>`; Sfx.play('levelup'); }
      else if (va > vb) { P.gold += aposta; txt += `<span class="good">Você ganhou ${aposta} ouro!</span>`; Sfx.play('coin'); }
      else if (va < vb) { P.gold -= aposta; txt += `<span class="bad">Perdeu ${aposta} ouro.</span>`; Sfx.play('roll'); }
      else txt += 'Empate: cada um fica com o seu.';
      this.dados(s, txt);
    };
    const op = [10, 50, 200].map(v => ({ label: `🎲 Apostar ${v} ouro`, cls: v === 200 ? 'gold' : '', fn: () => jogar(v) }));
    op.push({ label: 'Sair da mesa', fn: () => UI.close() });
    UI.dialog('Mesa de Dados', null, (ult || 'Dois dados para você, dois para a casa. Quem somar mais leva a aposta; <b>dois seis</b> pagam o triplo.') + `<br><br><span class="dim">Seu ouro: ${P.gold}</span>`, op);
  },

  // ---------- corrida de cavalos ----------
  corridaMenu(s) {
    const P = Game.player, rec = this.st().feitas['corrida:' + s.s.id];
    const op = [{ label: '🐎 Correr (inscrição 30 ouro)', cls: 'gold', fn: () => {
      if (!P.mounted) return Game.toast('Monte no seu cavalo para correr.', '#ffd080');
      if (P.gold < 30) return Game.toast('Ouro insuficiente.', '#ff8080');
      UI.close(); this.largada(s);
    } }, { label: 'Voltar', fn: () => UI.close() }];
    UI.dialog('Hipódromo de ' + esc(s.s.name), null, `Passe pelas <b>6 bandeiras</b> na ordem, o mais rápido que puder, e volte à largada. Três cavaleiros da cidade correm também.<br>Prêmios: 1º lugar 300 ouro • 2º 120 • 3º 40.${rec ? `<br><span class="dim">Seu recorde: ${rec.toFixed(1)}s</span>` : ''}<br><br>${P.mounted ? '' : '<span class="bad">Você precisa estar montado.</span>'}`, op);
  },
  largada(s) {
    const P = Game.player, rng = new RNG(Math.floor(Math.random() * 1e9));
    P.gold -= 30;
    let total = 0; const pts = s.pista.concat([s.pista[0]]);
    for (let i = 1; i < pts.length; i++) total += dist(pts[i - 1].x, pts[i - 1].y, pts[i].x, pts[i].y) * 16;
    total += dist(P.x, P.y, pts[0].x * 16, pts[0].y * 16);
    const base = total / 150;   // um bom cavaleiro
    const rivais = ['Bento Ferradura', 'Inês Galope', 'Rui Esporas'].map((n, i) => ({ n, t: base * (0.92 + i * 0.09 + rng.next() * 0.12) }));
    this.corrida = { s, pts, i: 0, t: 0, rivais };
    Sfx.play('horse'); Game.centerMsg('Largada!', 'Siga as bandeiras na ordem.');
  },
  tickCorrida(dt) {
    const C = this.corrida; if (!C) return;
    const P = Game.player; C.t += dt;
    if (!P.mounted || C.t > 150 || !Game.level.isWorld) { this.corrida = null; Game.toast('Corrida abandonada.', '#ff9080'); return; }
    const q = C.pts[C.i];
    if (dist(P.x, P.y, q.x * 16 + 8, q.y * 16 + 8) < 34) {
      C.i++; Sfx.play('coin');
      if (C.i >= C.pts.length) {
        const pos = 1 + C.rivais.filter(r => r.t < C.t).length, premio = [300, 120, 40, 0][pos - 1];
        P.gold += premio; const A = this.st(), k = 'corrida:' + C.s.s.id;
        if (!A.feitas[k] || C.t < A.feitas[k]) A.feitas[k] = C.t;
        if (pos === 1) Sfx.play('levelup');
        Game.centerMsg(pos === 1 ? '🏆 Vitória!' : `${pos}º lugar`, `Seu tempo: ${C.t.toFixed(1)}s` + (premio ? ` • prêmio ${premio} ouro` : '') + ` • ${C.rivais.map(r => r.n.split(' ')[0] + ' ' + r.t.toFixed(1) + 's').join(', ')}`);
        if (P.train) P.train('equitacao', 6);
        this.corrida = null;
      }
    }
  },

  // ---------- ritmo: capoeira e tambores ----------
  ritmoMenu(s) {
    const cap = s.kind === 'capoeira', k = s.kind + ':' + s.s.id + ':' + this.dia();
    if (this.st().cd[k]) return UI.dialog(this.NOMES[s.kind], null, 'A roda já acabou por hoje. Volte amanhã!', [{ label: 'Ok', fn: () => UI.close() }]);
    UI.dialog(this.NOMES[s.kind] + ' de ' + esc(s.s.name), null, cap ? 'O berimbau puxa o toque e a roda canta. Entre na ginga: aperte a <b>seta</b> (ou o botão) do movimento que aparecer, antes do tempo acabar. Ginga, esquiva, meia-lua e aú!' : 'Os tambores batem e o povo bate os pés. Acompanhe o ritmo: aperte a <b>seta</b> (ou o botão) que aparecer, antes do tempo acabar.', [
      { label: cap ? '🤸 Entrar na roda' : '🥁 Pegar as baquetas', cls: 'gold', fn: () => { UI.close(); this.st().cd[k] = 1; this.ritmo(s); } },
      { label: 'Só assistir', fn: () => UI.close() }]);
  },
  ritmo(s) {
    const cap = s.kind === 'capoeira', SET = ['←', '↑', '→', '↓'], KEYS = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
    const MOV = cap ? ['Esquiva', 'Aú', 'Meia-lua', 'Rasteira'] : ['Tum', 'Tá', 'Tum-tum', 'Pá'];
    const R = 10, el = document.createElement('div'); el.id = 'ritmo';
    el.innerHTML = `<div class="rt-t">${cap ? '🤸 Roda de Capoeira' : '🥁 Desafio dos Tambores'}</div><div class="rt-seta"></div><div class="rt-nome"></div><div class="rt-barra"><i></i></div><div class="rt-pts"></div><div class="rt-bts">${SET.map((a, i) => `<button data-i="${i}">${a}</button>`).join('')}</div>`;
    document.body.appendChild(el); this.ritmoEl = el;
    const wasPaused = Game.paused; Game.paused = true;
    let ronda = 0, acertos = 0, alvo = 0, t0 = 0, lim = 1.5, fim = false, espera = 0;
    const seta = el.querySelector('.rt-seta'), nome = el.querySelector('.rt-nome'), barra = el.querySelector('.rt-barra i'), pts = el.querySelector('.rt-pts');
    const nova = () => { alvo = Math.floor(Math.random() * 4); t0 = performance.now(); lim = Math.max(0.65, 1.5 - ronda * 0.09); seta.textContent = SET[alvo]; seta.className = 'rt-seta'; nome.textContent = MOV[alvo]; pts.textContent = `${ronda + 1}/${R} • acertos ${acertos}`; Sfx.play(cap ? 'swing' : 'hit'); };
    const resp = i => {
      if (fim || espera) return;
      const ok = i === alvo; if (ok) acertos++;
      seta.className = 'rt-seta ' + (ok ? 'ok' : 'erro'); Sfx.play(ok ? 'coin' : 'block');
      ronda++; espera = performance.now();
    };
    const tecla = e => { const i = KEYS.indexOf(e.key); if (i >= 0) { e.preventDefault(); e.stopPropagation(); resp(i); } };
    el.addEventListener('pointerdown', e => { const b = e.target.closest('button'); if (b) { e.preventDefault(); resp(+b.dataset.i); } });
    window.addEventListener('keydown', tecla, true);
    const loop = () => {
      if (fim) return;
      const agora = performance.now();
      if (espera) { if (agora - espera > 380) { espera = 0; if (ronda >= R) return acabar(); nova(); } }
      else { const f = (agora - t0) / 1000 / lim; barra.style.width = Math.max(0, 100 - f * 100) + '%'; if (f >= 1) { seta.className = 'rt-seta erro'; Sfx.play('block'); ronda++; espera = agora; } }
      requestAnimationFrame(loop);
    };
    const acabar = () => {
      fim = true; window.removeEventListener('keydown', tecla, true); el.remove(); this.ritmoEl = null; Game.paused = wasPaused;
      const P = Game.player, ouro = acertos * (cap ? 12 : 10);
      P.gold += ouro; if (P.train) P.train(cap ? 'combate' : 'eloquencia', acertos * 1.5);
      if (acertos >= 9 && typeof Vida !== 'undefined' && Vida.honra) Vida.honra(2, cap ? 'brilhei na roda de capoeira' : 'toquei nos tambores da festa');
      Sfx.play(acertos >= 7 ? 'levelup' : 'quest');
      Game.centerMsg(acertos >= 9 ? 'A roda inteira aplaudiu!' : acertos >= 6 ? 'Bonito!' : 'Precisa treinar mais...', `${acertos}/${R} acertos • ${ouro} ouro de gorjeta`);
    };
    setTimeout(() => { nova(); requestAnimationFrame(loop); }, 500);
  },

  // ---------- mergulho de pérolas ----------
  perolas(s, estado) {
    const P = Game.player, k = 'perolas:' + s.s.id + ':' + this.dia();
    if (!estado && this.st().cd[k]) return UI.dialog('Mergulho de Pérolas', null, 'As ostras perto do píer já foram abertas hoje. Volte amanhã.', [{ label: 'Ok', fn: () => UI.close() }]);
    const E = estado || { fundo: 0, achou: 0 };
    const subir = () => { this.st().cd[k] = 1; UI.close(); if (E.achou) { P.addItem(Items.make('perola', E.achou)); Sfx.play('coin'); Game.centerMsg('De volta à superfície', `${E.achou} pérola${E.achou > 1 ? 's' : ''}!`); } else Game.toast('Nenhuma pérola desta vez.', '#c0e0ff'); };
    const descer = () => {
      E.fundo++;
      const risco = 0.06 + E.fundo * 0.11, chance = 0.32 + E.fundo * 0.1;
      if (Math.random() < risco) {
        this.st().cd[k] = 1; UI.close(); P.hp = Math.max(1, P.hp - P.stat.maxHp * 0.2); Sfx.play('hurt'); Game.shake = 4;
        const perde = Math.floor(E.achou / 2); if (E.achou - perde) P.addItem(Items.make('perola', E.achou - perde));
        return Game.centerMsg('O fôlego acabou!', `Você subiu às pressas e perdeu ${perde} pérola${perde === 1 ? '' : 's'} no caminho.`);
      }
      const n = Math.random() < chance ? (E.fundo >= 4 && Math.random() < 0.3 ? 2 : 1) : 0; E.achou += n;
      Sfx.play(n ? 'pickup' : 'swing');
      this.perolas(s, Object.assign(E, { msg: n ? `A ${E.fundo * 4} braças: uma ostra com ${n > 1 ? 'duas pérolas' : 'uma pérola'}!` : `A ${E.fundo * 4} braças: só areia e conchas vazias.` }));
    };
    UI.dialog('Mergulho de Pérolas', null, (E.msg ? E.msg + '<br><br>' : 'O mar aqui é cheio de ostras. Quanto mais fundo, mais pérolas... e menos ar.<br><br>') + `Profundidade: <b>${E.fundo * 4} braças</b> • pérolas na bolsa: <b>${E.achou}</b><br><span class="dim">Risco de faltar fôlego no próximo mergulho: ${Math.round((0.06 + (E.fundo + 1) * 0.11) * 100)}%</span>`,
      [{ label: E.fundo ? '🌊 Descer mais fundo' : '🌊 Mergulhar', cls: 'gold', fn: descer }, ...(E.fundo ? [{ label: '⬆ Subir com as pérolas', fn: subir }] : [{ label: 'Voltar', fn: () => UI.close() }])]);
  },

  // ---------- escavações ----------
  escavar(s) {
    const P = Game.player, A = this.st(), cd = A.cd[s.id];
    if (cd !== undefined && this.dia() - cd < 2) return Game.toast('A terra aqui já foi revirada. Volte daqui a uns dias.', '#ffd080');
    A.cd[s.id] = this.dia();
    const pa = P.count('picareta'), c = s.R.cont, rng = new RNG(hashStr(s.id) + this.dia());
    const tabela = c === 5 ? ['ceramica_pintada', 'ceramica_pintada', 'reliquia_antiga', 'idolo_dourado'] : c === 4 ? ['tabua_runas', 'reliquia_antiga', 'reliquia_antiga', 'idolo_dourado'] : ['reliquia_antiga', 'tabua_runas', 'reliquia_antiga', 'idolo_dourado'];
    const n = rng.int(1, 2) + (pa ? 1 : 0), ach = [];
    for (let i = 0; i < n; i++) { const r = rng.next(), id = r < 0.08 ? tabela[3] : tabela[Math.floor(rng.next() * 3)]; P.addItem(Items.make(id)); ach.push(ITEMS[id].name); }
    if (P.train) P.train('construcao', 3);
    Game.burst(s.x * 16 + 8, s.y * 16 + 8, '#8a6a43', 16, 50); Sfx.play('mine'); Game.shake = 2;
    Game.centerMsg('Escavação', ach.join(' • ') + (pa ? '' : ' (com uma picareta você acharia mais)'));
  },

  // ---------- colheita tropical ----------
  colher(tx, ty, f, k) {
    const P = Game.player, n = f === 'banana' ? 1 : 1 + Math.floor(Math.random() * 2);
    P.addItem(Items.make(f, n)); this.st().cd[k] = this.dia();
    if (P.train) P.train('sobrevivencia', 1);
    Sfx.play('harvest'); Game.burst(tx * 16 + 8, ty * 16 - 6, f === 'acai' ? '#5a2a6a' : f === 'banana' ? '#f0d040' : '#a0461e', 8, 40);
    Game.toast(`+${n} ${ITEMS[f].name}`, '#a0f080');
  },

  // ---------- a cada quadro: caçada, corrida e chegada ----------
  tick(dt) {
    const G = Game, P = G.player; if (!P || !G.level || !G.level.isWorld) return;
    this.tickCorrida(dt);
    const A = P.atv, C = A && A.cacada;
    if (C) {
      if (!C.m && dist(P.x, P.y, C.x * 16, C.y * 16) < 380) {
        const def = ENEMIES[C.fera], look = Object.assign({}, def.look, { size: ((def.look && def.look.size) || 1) * 1.45 });
        const m = new Monster(C.fera, C.x * 16 + 8, C.y * 16 + 8, C.lvl, { name: C.nome, look, hpMul: 4, dmgMul: 1.5 });
        m.lenda = true; m.aggro = Math.max(m.aggro || 0, 220); G.actors.push(m); C.m = m;
        Sfx.play('shout'); G.toast(`⚠ ${C.nome} está por perto!`, '#ff9060');
      }
      if (C.m && C.m.dead) {
        A.feitas['lenda:' + C.regiao] = this.dia(); A.cacada = null;
        P.gold += C.premio; P.addItem(Items.make('trofeu_lenda'));
        P.addItem(Items.randomGear(C.lvl, new RNG(Math.floor(Math.random() * 1e9)), 0.18));
        Sfx.play('levelup'); G.centerMsg('Lenda abatida!', `${C.nome} • ${C.premio} ouro, troféu e um equipamento`);
        if (G.chron) G.chron(`Abati ${C.nome}.`);
      } else if (C.m && !G.actors.includes(C.m)) C.m = null;   // sumiu (você se afastou): reaparece quando voltar
    }
  },

  // ---------- desenho: placas, mesas, bandeiras, sítios e as setas ----------
  drawables(D, camX, camY, vw, vh) {
    const G = Game; if (!G.level || !G.level.isWorld) return;
    for (const s of this.lista()) {
      const x = s.x * 16 + 8 - camX, y = s.y * 16 + 8 - camY;
      if (x < -40 || y < -40 || x > vw + 40 || y > vh + 40) continue;
      D.push({ y: s.y * 16 + 10, fn: ctx => this.desenhaSpot(ctx, s, Math.round(x), Math.round(y)) });
    }
    const C = this.corrida;
    if (C) D.push({ y: -1e8, fn: ctx => {
      C.pts.forEach((q, i) => {
        if (i < C.i || i === C.pts.length - 1 && C.i < i) return;
        const x = q.x * 16 + 8 - camX, y = q.y * 16 + 8 - camY, prox = i === C.i;
        ctx.strokeStyle = prox ? 'rgba(255,220,80,0.9)' : 'rgba(255,255,255,0.35)'; ctx.lineWidth = prox ? 2 : 1;
        ctx.beginPath(); ctx.ellipse(x, y, 28, 16, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = '#5a3a1a'; ctx.fillRect(x - 1, y - 22, 2, 22); ctx.fillStyle = prox ? '#e03030' : '#a0a0b0'; ctx.fillRect(x + 1, y - 22, 9, 6);
      });
    } });
    const T_ = G.player.atv && G.player.atv.tesouro;
    if (T_) { const x = T_.x * 16 + 8 - camX, y = T_.y * 16 + 8 - camY; if (x > -20 && y > -20 && x < vw + 20 && y < vh + 20) D.push({ y: -1e8, fn: ctx => { ctx.strokeStyle = 'rgba(200,30,20,0.85)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 5, y - 4); ctx.lineTo(x + 5, y + 4); ctx.moveTo(x + 5, y - 4); ctx.lineTo(x - 5, y + 4); ctx.stroke(); } }); }
  },
  desenhaSpot(ctx, s, x, y) {
    const p = (a, b, c, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect(x + a, y + b, w, h); };
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(x, y + 4, 8, 2.5, 0, 0, Math.PI * 2); ctx.fill();
    switch (s.kind) {
      case 'quadro':   // quadro de avisos com cartazes e uma cabeça de fera desenhada
        p(-7, -16, '#4a2e16', 2, 20); p(5, -16, '#4a2e16', 2, 20); p(-8, -18, '#6a4424', 16, 13); p(-7, -17, '#8a5a30', 14, 11);
        p(-6, -16, '#f0e6c8', 5, 6); p(0, -15, '#e8dcb8', 5, 7); p(-5, -14, '#8a2020', 3, 2); p(1, -13, '#2a2a2a', 3, 1); p(1, -11, '#2a2a2a', 2, 1); p(-6, -9, '#e0c050', 4, 1); break;
      case 'dados':    // mesinha com copo e dois dados
        p(-6, -6, '#5a3a1e', 12, 3); p(-5, -3, '#4a2e16', 1, 6); p(4, -3, '#4a2e16', 1, 6); p(-6, -7, '#7a5230', 12, 1);
        p(-4, -10, '#f4f0e8', 3, 3); p(-3, -9, '#1a1a1a'); p(0, -9, '#f4f0e8', 3, 3); p(1, -9, '#c02020'); p(4, -12, '#6a3a1a', 3, 5); break;
      case 'hipodromo':   // poste de largada com bandeira
        p(-1, -22, '#5a3a1a', 2, 24); p(1, -22, '#e03030', 10, 7); p(3, -20, '#f0f0f0', 4, 3); p(-6, -2, '#e8e0c8', 12, 2); break;
      case 'capoeira':   // berimbau e atabaque
        p(-6, -20, '#8a5a2a', 1, 22); p(-5, -20, '#d8c8a0', 1, 1); p(-5, -1, '#d8c8a0', 1, 1); ctx.fillStyle = '#c89a50'; ctx.beginPath(); ctx.ellipse(x - 5, y - 6, 3, 3, 0, 0, Math.PI * 2); ctx.fill();
        p(1, -10, '#6a3a1a', 7, 12); p(1, -11, '#e8d8b0', 7, 2); p(2, -6, '#c8402a', 5, 1); p(2, -3, '#e8c040', 5, 1); break;
      case 'tambores':
        for (const [dx, h] of [[-7, 10], [1, 13]]) { p(dx, -h, '#7a4a22', 7, h + 1); p(dx, -h - 1, '#e8dcc0', 7, 2); p(dx + 1, -h + 3, '#c03020', 5, 1); p(dx + 1, -h + 6, '#2a1a10', 5, 1); } p(-2, -18, '#6a4a2a', 1, 6); p(5, -20, '#6a4a2a', 1, 6); break;
      case 'perolas':   // boia e uma cesta de ostras
        ctx.fillStyle = '#e03030'; ctx.beginPath(); ctx.arc(x - 3, y - 4, 4, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f4f4f4'; ctx.fillRect(x - 7, y - 5, 8, 2);
        p(3, -6, '#a0804a', 6, 6); p(4, -7, '#c8a868', 4, 1); p(4, -8, '#e8e4f0', 2, 1); p(6, -8, '#f8f8ff'); break;
      case 'escavacao':  // monte de terra com estacas e corda
        ctx.fillStyle = '#7a5a36'; ctx.beginPath(); ctx.ellipse(x, y - 1, 9, 4, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#5a4026'; ctx.fillRect(x - 3, y - 3, 6, 2);
        for (const dx of [-11, 11]) p(dx, -9, '#c8a060', 1, 10); p(-11, -8, '#d8c890', 23, 1); p(5, -12, '#8a8a90', 1, 8); p(4, -13, '#6a4a2a', 3, 2); break;
    }
  },
  // seta na borda da tela até a caçada, o tesouro ou a próxima bandeira (com a distância)
  tela(ctx, vw, vh) {
    const G = Game, P = G.player; if (!P || !G.level || !G.level.isWorld) return;
    const alvos = [];
    const A = P.atv;
    if (A && A.cacada) alvos.push({ x: A.cacada.x * 16, y: A.cacada.y * 16, c: '#ff7050', t: '🏹' });
    if (A && A.tesouro) alvos.push({ x: A.tesouro.x * 16, y: A.tesouro.y * 16, c: '#ffd040', t: 'X' });
    if (this.corrida) { const q = this.corrida.pts[this.corrida.i]; alvos.push({ x: q.x * 16, y: q.y * 16, c: '#80e0ff', t: '🏁' }); }
    for (const a of alvos) {
      const sx = a.x - G.camX, sy = a.y - G.camY;
      if (sx > 12 && sy > 12 && sx < vw - 12 && sy < vh - 12) continue;
      const cx = vw / 2, cy = vh / 2, ang = Math.atan2(sy - cy, sx - cx), r = Math.min(vw, vh) / 2 - 16;
      const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r * 0.9;
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = a.c; ctx.strokeStyle = '#1a1010'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(7, 0); ctx.lineTo(-4, -5); ctx.lineTo(-2, 0); ctx.lineTo(-4, 5); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
      const dm = Math.round(dist(P.x, P.y, a.x, a.y) / 16);
      ctx.font = '8px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#000'; ctx.fillText(dm + 'm', x + 1, y - 8 + 1); ctx.fillStyle = '#fff'; ctx.fillText(dm + 'm', x, y - 8);
    }
    if (this.corrida) { const C = this.corrida; ctx.font = '10px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#000'; ctx.fillText(`🏁 ${Math.min(C.i, 6)}/6 • ${C.t.toFixed(1)}s`, vw / 2 + 1, 31); ctx.fillStyle = '#ffe080'; ctx.fillText(`🏁 ${Math.min(C.i, 6)}/6 • ${C.t.toFixed(1)}s`, vw / 2, 30); }
    ctx.textAlign = 'left';
  }
};

// ---------------- ganchos ----------------
(function () {
  const fi0 = Mar.findInteract;
  Mar.findInteract = function (fx, fy) {
    const a = fi0.call(this, fx, fy); let b = null;
    try { b = Atividades.findInteract(fx, fy); } catch (e) { }
    return !a ? b : !b ? a : (b.d < a.d ? b : a);
  };
  const t0 = Inverno.tick; Inverno.tick = function (dt) { const r = t0.call(this, dt); try { Atividades.tick(dt); } catch (e) { } return r; };
  const d0 = Inverno.drawables; Inverno.drawables = function (D, camX, camY, vw, vh) { d0.call(this, D, camX, camY, vw, vh); try { Atividades.drawables(D, camX, camY, vw, vh); } catch (e) { } };
  const tl0 = Inverno.tela; Inverno.tela = function (ctx, vw, vh) { tl0.call(this, ctx, vw, vh); try { Atividades.tela(ctx, vw, vh); } catch (e) { } };
  const tj0 = Player.prototype.toJSON; Player.prototype.toJSON = function () { const o = tj0.call(this); if (this.atv) { const a = Object.assign({}, this.atv); if (a.cacada) a.cacada = Object.assign({}, a.cacada, { m: undefined }); o.atv = a; } return o; };
})();
