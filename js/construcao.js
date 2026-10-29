'use strict';
// ===================== MODO CONSTRUÇÃO =====================
// Perto da sua vila (ou de uma cidade do seu reino) você escolhe uma peça, vê a silhueta dela na sua frente
// (verde = pode, vermelho = não pode), gira e constrói: casas, torres, muros, portões, cercas, chão e decoração.
// Tudo fica salvo em P.vila.obras e volta a ser montado no mundo ao carregar o jogo.
const OBRAS = {
  // casas e torres
  casa: { cat: 'Prédios', nome: 'Casa', bt: 'house', ouro: 250, mats: { tabua: 12, pedra: 6, prego: 12 }, cap: 3 },
  casa_grande: { cat: 'Prédios', nome: 'Casa grande', bt: 'house2', ouro: 320, mats: { tabua: 16, pedra: 8, prego: 16 }, cap: 4 },
  chale: { cat: 'Prédios', nome: 'Chalé', bt: 'house3', ouro: 180, mats: { tabua: 10, pedra: 4, prego: 8 }, cap: 2 },
  torre: { cat: 'Prédios', nome: 'Torre de vigia', bt: 'tower', ouro: 400, mats: { pedra: 20, tabua: 6 }, deco: true },
  // muralha
  muro: { cat: 'Muralha', nome: 'Muro (3 blocos)', muro: 3, gira: true, ouro: 30, mats: { pedra: 9 } },
  muro_longo: { cat: 'Muralha', nome: 'Muro longo (6 blocos)', muro: 6, gira: true, ouro: 55, mats: { pedra: 18 } },
  portao: { cat: 'Muralha', nome: 'Portão', portao: true, gira: true, ouro: 80, mats: { tabua: 8, pedra: 6 } },
  cerca: { cat: 'Muralha', nome: 'Cerca (3)', cerca: 3, gira: true, ouro: 10, mats: { tabua: 4 } },
  // chão
  calcada: { cat: 'Chão', nome: 'Calçada de pedra (3x3)', chao: () => T.COBBLE, tam: 3, ouro: 12, mats: { pedra: 4 } },
  estrada: { cat: 'Chão', nome: 'Estrada de terra (3x3)', chao: () => T.ROAD, tam: 3, ouro: 4 },
  piso: { cat: 'Chão', nome: 'Piso de madeira (3x3)', chao: () => T.WOOD, tam: 3, ouro: 10, mats: { tabua: 4 } },
  plantacao: { cat: 'Chão', nome: 'Plantação (3x3)', chao: () => T.FARM, planta: true, tam: 3, ouro: 15 },
  // decoração
  estatua: { cat: 'Decoração', nome: 'Estátua', obj: () => O.STATUE, ouro: 120, mats: { pedra: 8 } },
  estatua_anjo: { cat: 'Decoração', nome: 'Estátua de anjo', obj: () => O.ANGELSTATUE, ouro: 200, mats: { pedra: 10 } },
  fonte: { cat: 'Decoração', nome: 'Fonte', obj: () => O.FOUNTAIN, ouro: 150, mats: { pedra: 10 } },
  poco: { cat: 'Decoração', nome: 'Poço', obj: () => O.WELL, ouro: 60, mats: { pedra: 6 } },
  estandarte: { cat: 'Decoração', nome: 'Estandarte', obj: () => O.BANNER, ouro: 25, mats: { tabua: 2 } },
  lampiao: { cat: 'Decoração', nome: 'Lampião', obj: () => O.LAMP, ouro: 20, mats: { lingote_ferro: 1 } },
  tocha: { cat: 'Decoração', nome: 'Tocha', obj: () => O.TORCH, ouro: 5 },
  banco: { cat: 'Decoração', nome: 'Banco', obj: () => O.BENCH, ouro: 15, mats: { tabua: 3 } },
  flores: { cat: 'Decoração', nome: 'Canteiro de flores', obj: () => O.FLOWERS, ouro: 5 },
  arvore: { cat: 'Decoração', nome: 'Árvore', obj: () => O.OAK, ouro: 10 },
  arbusto: { cat: 'Decoração', nome: 'Arbusto', obj: () => O.BUSH, ouro: 5 },
  barril: { cat: 'Decoração', nome: 'Barril', obj: () => O.BARREL, ouro: 8, mats: { tabua: 2 } },
  caixote: { cat: 'Decoração', nome: 'Caixote', obj: () => O.CRATE, ouro: 6, mats: { tabua: 2 } },
  feno: { cat: 'Decoração', nome: 'Fardo de feno', obj: () => O.HAY, ouro: 4 },
  tenda: { cat: 'Decoração', nome: 'Tenda', obj: () => O.TENT, ouro: 30, mats: { couro: 2 } },
  fogueira: { cat: 'Decoração', nome: 'Fogueira', obj: () => O.CAMPFIRE, ouro: 5 },
  banca: { cat: 'Decoração', nome: 'Banca de mercado', obj: () => O.STALL, ouro: 40, mats: { tabua: 6 } },
  boneco: { cat: 'Decoração', nome: 'Boneco de treino', obj: () => O.DUMMY, ouro: 20, mats: { tabua: 3 } },
  pilar: { cat: 'Decoração', nome: 'Pilar', obj: () => O.PILLAR, ouro: 40, mats: { pedra: 4 } },
  canhao: { cat: 'Decoração', nome: 'Canhão', obj: () => O.CANNON, ouro: 300, mats: { lingote_ferro: 8 } }
};
const OBRA_CATS = ['Prédios', 'Muralha', 'Chão', 'Decoração'];

const Construcao = {
  on: false, cat: 0, item: 0, rot: 0, extras: [],
  lista() { const c = OBRA_CATS[this.cat]; return Object.keys(OBRAS).filter(k => OBRAS[k].cat === c); },
  atual() { const l = this.lista(); return l[this.item % l.length]; },
  obras() { const V = Vila.st(); if (!V) return []; return V.obras || (V.obras = []); },
  // onde dá para construir: perto da sua vila ou de uma cidade do seu reino
  zona(tx, ty) {
    const V = Vila.st(); if (!V) return null;
    if (dist(tx, ty, V.cx, V.cy) <= 48) return Vila.s;
    for (const s of Game.world.settlements) if (War.ownerOf(s) === 'jogador' && !s.playerVila && dist(tx, ty, s.mid.x, s.mid.y) <= 40) return s;
    return null;
  },
  pertoDeCasa() { const P = Game.player; return Game.level && Game.level.isWorld && !!this.zona(P.x / 16, P.y / 16); },
  // tamanho (já girado) da peça
  tamanho(k, rot) {
    const d = OBRAS[k];
    if (d.bt) { const B = BUILDINGS[d.bt]; return [B.w, B.h]; }
    if (d.muro || d.cerca) { const n = d.muro || d.cerca; return rot % 2 ? [1, n] : [n, 1]; }
    if (d.portao) return rot % 2 ? [1, 4] : [4, 1];
    if (d.chao) return [d.tam, d.tam];
    return [1, 1];
  },
  // a silhueta fica na frente do jogador
  posicao(k, rot) {
    const P = Game.player, [w, h] = this.tamanho(k, rot);
    const ptx = Math.floor(P.x / 16), pty = Math.floor((P.y - 2) / 16);
    switch (P.dir) {
      case 'right': return [ptx + 2, pty - (h >> 1)];
      case 'left': return [ptx - 1 - w, pty - (h >> 1)];
      case 'up': return [ptx - (w >> 1), pty - 1 - h];
      default: return [ptx - (w >> 1), pty + 2];
    }
  },
  pode(k, x0, y0, rot) {
    const W = Game.world, d = OBRAS[k], [w, h] = this.tamanho(k, rot);
    if (!this.zona(x0 + w / 2, y0 + h / 2)) return 'Fora das suas terras: construa perto da sua vila ou das cidades do seu reino.';
    const hh = d.bt ? h + 1 : h;      // prédios precisam da frente livre para a porta
    for (let y = y0; y < y0 + hh; y++) for (let x = x0; x < x0 + w; x++) {
      const t = W.tileAt(x, y), o = W.objAt(x, y);
      if (TWATER[t] || t === T.LAVA || t === T.DEEP) return 'Não dá para construir na água.';
      if (d.portao) { if (OSOLID[o] && o !== O.FENCE) return 'Há algo no caminho.'; continue; }       // portão pode ficar em cima de um muro
      if (TSOLID[t] && !d.chao) return 'Há uma parede ou rocha no caminho.';
      if (o && OSOLID[o] && !(d.chao && y >= y0 + h)) return o === O.BLOCK ? 'Há um prédio no caminho.' : 'Há algo no caminho (limpe o terreno).';
      if (W.doors.has(tkey(x, y))) return 'Não bloqueie a porta de um prédio.';
    }
    const P = Game.player, px = Math.floor(P.x / 16), py = Math.floor(P.y / 16);
    if (!d.chao && px >= x0 && px < x0 + w && py >= y0 && py < y0 + h) return 'Você está em cima do lugar.';
    return null;
  },
  custoTxt(k) { const d = OBRAS[k], P = Game.player; return `${d.ouro} ouro` + Object.entries(d.mats || {}).map(([id, n]) => ` • <span class="${P.count(id) >= n ? '' : 'bad'}">${n} ${esc(ITEMS[id] ? ITEMS[id].name : id)}</span>`).join(''); },
  // ---------- montar as obras no mundo ----------
  aplicar() {
    const W = Game.world; if (!W) return;
    for (const [k, list] of W.stampIndex) W.stampIndex.set(k, list.filter(st => !st.obra));
    for (const [k, d] of W.doors) if (d.obra) W.doors.delete(k);
    const sujos = new Set(this.extras.map(b => W.ckey(b.tx >> 5, b.ty >> 5)));
    this.extras = []; W.extras = this.extras;
    const V = Vila.st(); if (!V) { this.limpar(sujos); return; }
    const vs = Vila.s, base = vs && vs.buildings[0] ? vs.buildings[0].spec : { style: 'timber', roof: '#8a4a2a', wall: '#e8dcc0' };
    const R = Game.player.reino;
    for (const ob of this.obras()) {
      const d = OBRAS[ob.k]; if (!d) continue;
      const [w, h] = this.tamanho(ob.k, ob.r);
      const tiles = new Uint8Array(w * (h + 1)).fill(255), objs = new Uint8Array(w * (h + 1)).fill(255);
      const st = { x0: ob.x, y0: ob.y, w, h: h + 1, tiles, objs, obra: true };
      if (d.bt) {
        for (let i = 0; i < w * h; i++) objs[i] = O.BLOCK;
        const s = this.zona(ob.x + w / 2, ob.y + h / 2) || vs;
        const spec = { type: d.bt, w, h, style: base.style, roof: base.roof, wall: base.wall, seed: hashStr(ob.k + ob.x + ',' + ob.y), chimney: d.bt !== 'tower', banner: R ? R.cor : '#c03030', sign: null };
        const b = { kind: d.bt, role: d.deco ? 'tower' : 'house', tx: ob.x, ty: ob.y, w, h, spec, name: d.deco ? d.nome : 'Casa de colono', owner: { name: 'Colonos de ' + V.nome, race: Game.player.race, sex: 'm', seed: 7 }, settlement: s, decorative: !!d.deco, obra: true };
        if (!d.deco) { b.door = { x: ob.x + (w >> 1), y: ob.y + h - 1 }; W.doors.set(tkey(b.door.x, b.door.y), b); tiles[h * w + (w >> 1)] = T.DIRT; }
        this.extras.push(b);
      } else if (d.muro) {
        const wt = (vs && CULTURES[vs.region.culture].wall) || T.WALL;
        for (let i = 0; i < w * h; i++) { tiles[i] = wt; objs[i] = 0; }
      } else if (d.portao) {
        // dois pilares e a passagem no meio
        for (let i = 0; i < w * h; i++) { tiles[i] = T.COBBLE; objs[i] = 0; }
        objs[0] = O.PILLAR; objs[(ob.r % 2 ? (h - 1) * w : w - 1)] = O.PILLAR;
      } else if (d.cerca) {
        for (let i = 0; i < w * h; i++) objs[i] = O.FENCE;
      } else if (d.chao) {
        for (let i = 0; i < w * h; i++) { tiles[i] = d.chao(); objs[i] = d.planta ? ((i % w) % 2 ? O.CROP : 0) : 0; }
      } else {
        objs[0] = d.obj();
      }
      W.addStamp(st);
      for (let cy = (ob.y >> 5) - 1; cy <= ((ob.y + h + 1) >> 5) + 1; cy++) for (let cx = (ob.x >> 5) - 1; cx <= ((ob.x + w) >> 5) + 1; cx++) sujos.add(W.ckey(cx, cy));
    }
    this.limpar(sujos);
  },
  limpar(sujos) { const W = Game.world; for (const k of sujos) { W.chunks.delete(k); W.canvases.delete(k); } },
  cap() { let c = 0; for (const ob of this.obras()) { const d = OBRAS[ob.k]; if (d && d.cap) c += d.cap; } return c; },
  // ---------- ações ----------
  construir() {
    const G = Game, P = G.player, k = this.atual(), d = OBRAS[k], [x0, y0] = this.posicao(k, this.rot);
    const erro = this.pode(k, x0, y0, this.rot); if (erro) return G.toast(erro, '#ff9080');
    if (P.gold < d.ouro) return G.toast('Ouro insuficiente.', '#ff8080');
    if (d.mats && !G.hasMats(d.mats)) return G.toast('Faltam materiais.', '#ff8080');
    P.gold -= d.ouro; if (d.mats) G.takeMats(d.mats);
    this.obras().push({ k, x: x0, y: y0, r: this.rot });
    this.aplicar();
    P.train('construcao', d.bt ? 6 : 1);
    Sfx.play(d.bt || d.muro ? 'forge' : 'pickup');
    G.burst((x0 + 0.5) * 16, (y0 + 0.5) * 16, '#c8a070', d.bt ? 20 : 8, 50);
    G.floater((x0 + 0.5) * 16, y0 * 16 - 4, d.cap ? `+${d.cap} colonos` : 'Pronto!', '#c8f0a0');
    this.painelKey = '';
  },
  remover() {
    const G = Game, P = G.player, k = this.atual(), [x0, y0] = this.posicao(k, this.rot), [w, h] = this.tamanho(k, this.rot);
    const cx = x0 + w / 2, cy = y0 + h / 2, L = this.obras();
    let best = -1, bd = 4;
    L.forEach((ob, i) => { const [ow, oh] = this.tamanho(ob.k, ob.r); const d = dist(cx, cy, ob.x + ow / 2, ob.y + oh / 2); if (d < bd + Math.max(ow, oh) / 2) { bd = d; best = i; } });
    if (best < 0) return G.toast('Não há nada seu para remover aqui na frente.', '#ffa0a0');
    const ob = L.splice(best, 1)[0], d = OBRAS[ob.k], volta = Math.floor(d.ouro / 2);
    P.gold += volta; this.aplicar();
    Sfx.play('pickup'); G.floater((ob.x + 0.5) * 16, ob.y * 16, `+${volta} ouro`, '#ffe080');
    this.painelKey = '';
  },
  entrar() { if (!this.pertoDeCasa()) return Game.toast('Vá até a sua vila ou a uma cidade do seu reino para construir.', '#ffa0a0'); this.on = true; this.painelKey = ''; Game.toast('Modo construção: a silhueta aparece na sua frente. Ande e vire para escolher o lugar.', '#c8e0a0'); },
  sair() { this.on = false; this.painelKey = ''; },
  // ---------- quadro a quadro ----------
  tick() {
    const G = Game; if (!G.started || !G.player) return;
    if (this.on && (!G.level.isWorld || !this.pertoDeCasa())) { this.sair(); G.toast('Você saiu da área de construção.', '#ffb080'); }
    this.painel();
  },
  drawGhost(ctx, camX, camY) {
    if (!this.on) return;
    const k = this.atual(), d = OBRAS[k], [x0, y0] = this.posicao(k, this.rot), [w, h] = this.tamanho(k, this.rot);
    const ok = !this.pode(k, x0, y0, this.rot), t = Game.t;
    const px = x0 * 16 - camX, py = y0 * 16 - camY;
    ctx.save();
    ctx.globalAlpha = 0.55 + Math.sin(t * 5) * 0.1;
    if (d.bt) {
      const spec = { type: d.bt, w, h, style: 'timber', roof: '#8a4a2a', wall: '#e8dcc0', seed: 1, banner: '#c03030' };
      const vs = Vila.s; if (vs && vs.buildings[0]) Object.assign(spec, { style: vs.buildings[0].spec.style, roof: vs.buildings[0].spec.roof, wall: vs.buildings[0].spec.wall });
      const img = Sprites.building(spec);
      ctx.drawImage(img, Math.round(px - 1), Math.round(py + h * 16 - img.height + 1));
    } else if (d.obj || d.cerca || d.portao) {
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const o = d.obj ? d.obj() : d.cerca ? O.FENCE : (x === 0 && y === 0) || (x === w - 1 && y === h - 1) ? O.PILLAR : 0;
        if (!o) continue;
        const s = Sprites.obj(o, 0, 0);
        ctx.drawImage(s.c, Math.round(px + x * 16 + 8 - (s.w >> 1)), Math.round(py + y * 16 + 16 - s.h + s.oy));
      }
    }
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = ok ? '#40ff60' : '#ff3030';
    ctx.fillRect(Math.round(px), Math.round(py), w * 16, h * 16);
    ctx.globalAlpha = 1; ctx.strokeStyle = ok ? '#80ff90' : '#ff6060'; ctx.lineWidth = 1;
    ctx.strokeRect(Math.round(px) + 0.5, Math.round(py) + 0.5, w * 16 - 1, h * 16 - 1);
    ctx.restore();
  },
  // painel (lado esquerdo) e o botão 🔨
  painel() {
    const hud = document.getElementById('hud'); if (!hud) return;
    if (!this.btn) {
      this.btn = document.createElement('button'); this.btn.id = 'b-obra'; this.btn.textContent = '🔨 Construir'; this.btn.className = 'hidden';
      UI.topbar().appendChild(this.btn);
      this.btn.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); if (this.on) this.sair(); else this.entrar(); });
      this.el = document.createElement('div'); this.el.id = 'obra'; this.el.className = 'hidden'; hud.appendChild(this.el);
      this.el.addEventListener('pointerdown', e => {
        const b = e.target.closest('button'); if (!b) return; e.preventDefault(); e.stopPropagation();
        const a = b.dataset.a, n = this.lista().length;
        if (a === 'cat') { this.cat = (this.cat + 1) % OBRA_CATS.length; this.item = 0; this.rot = 0; }
        else if (a === 'prev') this.item = (this.item - 1 + n) % n;
        else if (a === 'next') this.item = (this.item + 1) % n;
        else if (a === 'rot') this.rot = (this.rot + 1) % 4;
        else if (a === 'ok') this.construir();
        else if (a === 'del') this.remover();
        else if (a === 'sair') this.sair();
        this.painelKey = '';
      });
    }
    const G = Game, perto = G.started && G.level && G.level.isWorld && !G.paused && this.pertoDeCasa();
    const showBtn = perto || this.on;
    if (this._showBtn !== showBtn) { this._showBtn = showBtn; this.btn.classList.toggle('hidden', !showBtn); }
    this.btn.textContent = this.on ? '✖ Sair da construção' : '🔨 Construir';
    const show = this.on && !G.paused;
    const k = this.atual(), key = show + '|' + this.cat + '|' + k + '|' + this.rot + '|' + G.player.gold;
    if (key === this.painelKey) return;
    this.painelKey = key;
    this.el.classList.toggle('hidden', !show);
    if (Reino.el) Reino.el.style.display = show ? 'none' : '';
    if (!show) return;
    const d = OBRAS[k];
    this.el.innerHTML = `<div class="tat-t">🔨 Construção</div>
      <button data-a="cat">📂 ${OBRA_CATS[this.cat]} ▸</button>
      <div class="obra-sel"><button data-a="prev">◀</button><span>${esc(d.nome)}</span><button data-a="next">▶</button></div>
      <div class="obra-custo">${this.custoTxt(k)}</div>
      ${d.gira ? '<button data-a="rot">↻ Girar</button>' : ''}
      <button data-a="ok" class="gold">✔ Construir</button>
      <button data-a="del">🗑 Remover</button>`;
  }
};
