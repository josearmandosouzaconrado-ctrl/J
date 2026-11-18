'use strict';
// =====================================================================
//  PEQUENOS DETALHES DO CHÃO (feitos no Blender, convertidos em pixel art)
//  Sem mudar o estilo do jogo: florzinhas na grama, pedrinhas nas trilhas,
//  folhas caídas, gravetos e cogumelos no bosque, capim seco na tundra,
//  juncos e areia molhada na beira da água, montinhos de neve.
//  (tools/blender/detalhes.py + folha_detalhes.py -> img/detalhes.png)
//  Pintados uma vez por trecho, junto com o chão (sem custo por quadro).
// =====================================================================
const Detalhes = {
  img: null, ok: false,
  L: { tufo_seco: 1, flores: 2, pedrinhas: 3, folhas: 4, cogumelo: 5, junco: 6, graveto: 7, neve: 8 },
  NV: { flores: 4 },
  ligado() { return this.ok && typeof Visual !== 'undefined' && Visual.ligado(); },
  carregar() {
    const im = new Image();
    im.onload = () => { this.img = im; this.ok = true; try { if (Game.world && Game.world.canvases) Game.world.canvases.clear(); } catch (e) { } };
    im.src = typeof imgSrc === 'function' ? imgSrc('img/detalhes.png') : 'img/detalhes.png';
  },
  // [detalhe, chance] por terreno
  REGRAS: null,
  regras() {
    if (this.REGRAS) return this.REGRAS;
    const R = this.REGRAS = [];
    R[T.GRASS] = [['flores', 0.06], ['pedrinhas', 0.02]];
    R[T.ELFGRASS] = [['flores', 0.1]];
    R[T.DGRASS] = [['folhas', 0.08], ['graveto', 0.03], ['cogumelo', 0.025], ['flores', 0.02]];
    R[T.DIRT] = [['pedrinhas', 0.1], ['graveto', 0.02]];
    R[T.ROAD] = [['pedrinhas', 0.08]];
    R[T.SAND] = [['pedrinhas', 0.035]];
    R[T.DESERT] = [['pedrinhas', 0.03]];
    R[T.TUNDRA] = [['tufo_seco', 0.09], ['pedrinhas', 0.03]];
    R[T.DEADGRASS] = [['tufo_seco', 0.1], ['graveto', 0.02]];
    R[T.SNOW] = [['neve', 0.05]];
    R[T.SWAMP] = [['junco', 0.06]];
    R[T.MUD] = [['pedrinhas', 0.03]];
    return R;
  },
  desenha(ctx, nome, v, x, y) {
    const l = this.L[nome]; ctx.drawImage(this.img, v * 16, l * 16, 16, 16, x, y, 16, 16);
  },
  pintar(W, job) {
    const R = this.regras(), ch = job.ch, x0 = job.cx * 32, y0 = job.cy * 32, ctx = job.ctx, g = job.getT;
    ctx.save();
    for (let ly = 0; ly < 32; ly++) for (let lx = 0; lx < 32; lx++) {
      const i = ly * 32 + lx, t = ch.tiles[i];
      if (TWATER[t] || (TILE_DEFS[t] && TILE_DEFS[t].wall)) continue;
      const wx = x0 + lx, wy = y0 + ly, h = hash2(wx, wy, 4127);
      // beira da água: areia molhada (faixa mais escura) e juncos
      let agua = 0;
      if (TWATER[g(lx, ly - 1)]) agua |= 1; if (TWATER[g(lx, ly + 1)]) agua |= 2; if (TWATER[g(lx - 1, ly)]) agua |= 4; if (TWATER[g(lx + 1, ly)]) agua |= 8;
      if (agua && t !== T.BRIDGE) {
        const px = lx * 16, py = ly * 16;
        const faixa = (a, b, c, d, e, f, gg, hh) => { const gr = ctx.createLinearGradient(a, b, c, d); gr.addColorStop(0, 'rgba(50,38,24,0.30)'); gr.addColorStop(1, 'rgba(50,38,24,0)'); ctx.fillStyle = gr; ctx.fillRect(e, f, gg, hh); };
        if (agua & 1) faixa(0, py, 0, py + 5, px, py, 16, 5);
        if (agua & 2) faixa(0, py + 16, 0, py + 11, px, py + 11, 16, 5);
        if (agua & 4) faixa(px, 0, px + 5, 0, px, py, 5, 16);
        if (agua & 8) faixa(px + 16, 0, px + 11, 0, px + 11, py, 5, 16);
        if (!ch.objs[i] && (t === T.GRASS || t === T.DGRASS || t === T.SWAMP || t === T.MUD) && h < 0.3) { this.desenha(ctx, 'junco', Math.floor(hash2(wx, wy, 9) * 3), px + Math.round((hash2(wx, wy, 11) - 0.5) * 6), py - 2); continue; }
      }
      if (ch.objs[i]) continue;
      const lista = R[t]; if (!lista) continue;
      let acc = 0;
      for (const [nome, p] of lista) {
        if (h < acc + p) {
          const v = Math.floor(hash2(wx, wy, 77) * (this.NV[nome] || 3));
          this.desenha(ctx, nome, v, lx * 16 + Math.round((hash2(wx, wy, 13) - 0.5) * 6), ly * 16 + Math.round((hash2(wx, wy, 17) - 0.5) * 6) - 2);
          break;
        }
        acc += p;
      }
    }
    ctx.restore();
  }
};
Detalhes.carregar();
(function () {
  const f0 = World.prototype.finishChunk;
  World.prototype.finishChunk = function (job) {
    if (Detalhes.ligado()) { try { Detalhes.pintar(this, job); } catch (e) { console.warn('detalhes', e); } }
    return f0.apply(this, arguments);
  };
})();
