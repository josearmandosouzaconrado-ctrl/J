'use strict';
// =====================================================================
//  DENTRO DO TREM: o vagão de passageiros com bancos, mesas, lampiões,
//  passageiros conversando, o cobrador e a paisagem correndo nas janelas.
//  Pela porta do fim do vagão dá para ir à varanda e ver o trem por fora.
// =====================================================================
const FALAS_PASSAGEIRO = ['Esse trem é uma maravilha! Antes eu levava três dias a pé.', 'Dizem que a fumaça faz mal... mas a vista compensa.', 'Vou visitar minha irmã na cidade. Levei um queijo para ela.', 'Os engenheiros de Ferrânia são uns gênios, isso sim.', 'Segura firme: na curva o vagão balança!', 'Comprei a passagem mais barata e mesmo assim tem lampião.'];
class TremLevel {
  constructor(l, de) {
    this.isWorld = false; this.isInterior = false; this.isTrem = true; this.dark = false;
    this.l = l; this.de = de;
    const W = Game.world, sid = de === 'a' ? l.a : l.b;
    this.s = W.settlements.find(o => o.id === sid) || W.settlements[0];
    this.regIndex = this.s.region.index; this.name = 'Vagão de passageiros';
    const w = this.w = 26, h = this.h = 9;
    this.tiles = new Uint8Array(w * h).fill(T.WOOD); this.objs = new Uint8Array(w * h);
    for (let x = 0; x < w; x++) { this.tiles[x] = T.HWALL; this.tiles[(h - 1) * w + x] = T.HWALL; }
    for (let y = 0; y < h; y++) { this.tiles[y * w] = T.HWALL; this.tiles[y * w + w - 1] = T.HWALL; }
    for (let x = 1; x < w - 1; x++) this.tiles[4 * w + x] = T.CARPET;      // tapete no corredor
    // bancos de frente um para o outro, com mesinha no meio, dos dois lados do corredor
    for (let x = 3; x < w - 3; x += 4) for (const y of [2, 6]) { this.objs[y * w + x] = O.BENCH; this.objs[y * w + x + 2] = O.BENCH; this.objs[(y === 2 ? 1 : 7) * w + x + 1] = O.TABLE; }
    for (const x of [2, 12, 23]) this.objs[1 * w + x] = O.LANTERN;
    this.portas = [{ x: 1, y: 4 }, { x: w - 2, y: 4 }];
    this.entry = { x: 2, y: 4 };
    this.canvas = null;
  }
  inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  tileAt(x, y) { return this.inb(x, y) ? this.tiles[y * this.w + x] : T.HWALL; }
  objAt(x, y) { return this.inb(x, y) ? this.objs[y * this.w + x] : 0; }
  regAt() { return this.regIndex; }
  setObj(x, y, o) { if (this.inb(x, y)) { this.objs[y * this.w + x] = o; this.canvas = null; } }
  solidAt(x, y) { if (!this.inb(x, y)) return true; const i = y * this.w + x; return TSOLID[this.tiles[i]] || OSOLID[this.objs[i]]; }
  render() {
    const c = Sprites.cv(this.w * 16, this.h * 16), ctx = c.getContext('2d');
    Sprites.paintTiles(ctx, this.w, this.h, (x, y) => this.tileAt(x, y), 4242);
    // lambris de madeira escura embaixo das janelas e portas nas pontas
    ctx.fillStyle = '#4a2c18'; ctx.fillRect(16, 16, (this.w - 2) * 16, 3);
    for (const p of this.portas) { ctx.fillStyle = '#2a1a10'; ctx.fillRect(p.x * 16 - (p.x === 1 ? 14 : -14), p.y * 16 - 10, 16, 26); ctx.fillStyle = '#6a4424'; ctx.fillRect(p.x * 16 - (p.x === 1 ? 12 : -16), p.y * 16 - 8, 12, 22); ctx.fillStyle = '#ffd870'; ctx.fillRect(p.x * 16 - (p.x === 1 ? 9 : -19), p.y * 16 - 5, 6, 6); }
    this.canvas = c;
  }
  // a paisagem lá fora, contínua atrás de todas as janelas
  paisagem(ctx, x0, y0, w, h, desl) {
    const t = Game.time / 60, noite = t < 5.5 || t > 19.5, inv = Estacoes.nivelPintado >= 0.4;
    const ceu = ctx.createLinearGradient(0, y0, 0, y0 + h); ceu.addColorStop(0, noite ? '#0a1028' : '#7ab8e8'); ceu.addColorStop(1, noite ? '#1a2448' : '#cfe6f4');
    ctx.fillStyle = ceu; ctx.fillRect(x0, y0, w, h);
    if (noite) { ctx.fillStyle = '#fff'; for (let i = 0; i < 8; i++) { const sx = ((i * 53 - desl * 0.02) % 400 + 400) % 400; ctx.fillRect(x0 + (sx % w), y0 + 1 + (i * 3) % 5, 1, 1); } }
    const camada = (vel, base, alt, cor, freq) => { ctx.fillStyle = cor; for (let x = 0; x < w; x++) { const gx = x + desl * vel; const hh = alt * (0.6 + 0.4 * Math.sin(gx * freq) * Math.sin(gx * freq * 0.37 + 1.3)); ctx.fillRect(x0 + x, y0 + h - base - hh, 1, base + hh); } };
    camada(0.08, 4, 3, noite ? '#1a2a3a' : inv ? '#c8d4e4' : '#7a9ab0', 0.09);
    camada(0.25, 3, 2, noite ? '#14261a' : inv ? '#e8eef6' : '#4a8a3a', 0.21);
    // árvores e postes do telégrafo passando rápido
    const per = 26, off = desl * 0.9, k0 = Math.floor(off / per);
    for (let k = k0 - 1; k <= k0 + Math.ceil(w / per) + 1; k++) {
      const cx = Math.round(x0 + k * per - off); if (cx < x0 - 6 || cx > x0 + w + 6) continue;
      if (hash2(k, 1, 9) < 0.6) { ctx.fillStyle = noite ? '#0e1a10' : '#5a3a20'; ctx.fillRect(cx, y0 + h - 4, 1, 4); ctx.fillStyle = noite ? '#10241a' : inv ? '#f0f4fa' : '#2e7a28'; ctx.beginPath(); ctx.arc(cx, y0 + h - 6, 3, 0, Math.PI * 2); ctx.fill(); }
      else { ctx.fillStyle = noite ? '#101010' : '#3a2a1a'; ctx.fillRect(cx, y0 + 1, 1, h - 1); ctx.fillRect(cx - 2, y0 + 2, 5, 1); }
    }
  }
  drawGround(ctx, camX, camY, vw, vh) {
    if (!this.canvas) this.render();
    ctx.fillStyle = '#120a08'; ctx.fillRect(0, 0, vw, vh);
    const bal = Math.round(Math.sin(Game.t * 9) * 0.6);   // o vagão balança de leve
    ctx.drawImage(this.canvas, -camX, -camY + bal);
    // janelas na parede de cima, com a paisagem correndo
    const desl = Game.t * 120;
    for (let x = 2; x < this.w - 2; x += 2) {
      const wx = x * 16 + 3 - camX, wy = 2 - camY + bal;
      ctx.fillStyle = '#3a2414'; ctx.fillRect(wx - 2, wy - 1, 14, 13);
      ctx.save(); ctx.beginPath(); ctx.rect(wx, wy + 1, 10, 9); ctx.clip();
      this.paisagem(ctx, wx, wy + 1, 10, 9, desl + x * 16);
      ctx.restore();
      ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(wx, wy + 1, 2, 9);
      ctx.fillStyle = '#c8a040'; ctx.fillRect(wx - 2, wy + 10, 14, 1);
    }
  }
}

const Vagao = {
  entrar(l, de) {
    const G = Game, P = G.player, L = new TremLevel(l, de);
    G.level = L; P.mounted = false;
    G.actors = [];
    // passageiros e o cobrador
    const rng = new RNG(Math.floor(Math.random() * 1e9));
    const lugares = [[4, 3], [6, 3], [8, 5], [12, 3], [14, 5], [16, 3], [19, 5], [20, 3]];
    for (const [x, y] of rng.shuffle(lugares).slice(0, 5)) { const a = new NPC({ role: 'passageiro', x, y }, L.s, rng); a.passageiro = true; a.setDir(rng.chance(0.5) ? Math.PI / 2 : -Math.PI / 2); G.actors.push(a); }
    const c = new NPC({ role: 'passageiro', x: 22, y: 4 }, L.s, rng); c.passageiro = true; c.cobrador = true; c.name = 'Cobrador ' + c.name.split(' ')[0];
    c.look = Object.assign({}, c.look, { body: '#2a3a6a', legs: '#1a2440', hat: 'cap', hatC: '#1a2440', tabard: undefined, apron: undefined }); c.S = Sprites.actor(c.look); c.h = c.S.h; G.actors.push(c);
    P.x = L.entry.x * 16 + 8; P.y = L.entry.y * 16 + 8; P.alpha = 1;
    G.projectiles = []; G.clouds = []; G.pickups = [];
    G.camX = P.x - G.vw / 2; G.camY = P.y - G.vh / 2; G.flow = null;
    UI.fade(); Sfx.play('door');
  },
  // vai para a varanda: o mundo lá fora com o trem andando
  varanda() {
    const G = Game, P = G.player, l = Trem.linhas().find(x => x.id === P.trem.id); if (!l) return;
    const C = Trem.carros(l); G.worldPos = { x: C[2].x, y: C[2].y };
    G.exitDungeon(); P.trem.fora = true;
    G.toast('Na varanda do vagão: o vento no rosto! Toque em Entrar para voltar.', '#ffe0a0');
  },
  falar(a) {
    const P = Game.player, l = P.trem && Trem.linhas().find(x => x.id === P.trem.id);
    a.talkT = 4;
    if (a.cobrador && l) {
      const falta = Math.max(0, Math.ceil((P.trem.chegada || Game.t) - Game.t)), para = P.trem.para === 'b' ? l.bn : l.an;
      return UI.dialog(a.name, a.look, `Próxima estação: <b>${esc(para)}</b>. Chegamos em uns <b>${falta} segundos</b>.<br><span class="dim">Passagem conferida, pode ficar à vontade!</span>`, [{ label: '🚪 Ir para a varanda (ver o trem por fora)', fn: () => { UI.close(); this.varanda(); } }, { label: 'Obrigado' }]);
    }
    UI.dialog(a.name, a.look, FALAS_PASSAGEIRO[Math.floor(Math.random() * FALAS_PASSAGEIRO.length)], [{ label: 'Boa viagem!' }]);
  }
};
(function () {
  const t0 = UI.talkNPC; UI.talkNPC = function (a) { if (a.passageiro) return Vagao.falar(a); return t0.call(this, a); };
})();
