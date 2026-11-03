'use strict';
// ===================== CAMAS =====================
// Qualquer cama dá para usar chegando perto: nas suas casas (compradas ou construídas), na sua vila,
// no seu palácio e nos castelos do seu reino é de graça; na taverna você aluga o quarto ali mesmo.
// Cama de outra pessoa não: o dono não gostaria nada disso.
OBJ_DEFS[O.BED].interact = 'cama';
OBJ_DEFS[O.BEDSMALL].interact = 'cama';
const Camas = {
  dono(L) {
    const P = Game.player, b = L.b, s = L.s;
    if (!b) return null;
    if (b.player || b.home || (s && s.playerVila)) return 'meu';
    if (b.role === 'playerhouse' && P.houses.includes(s.id)) return 'meu';
    if ((b.kind === 'castle' || b.kind === 'palace') && War.ownerOf(s) === 'jogador') return 'meu';
    if (b.role === 'inn') return 'taverna';
    return null;
  },
  usar() {
    const G = Game, L = G.level, P = G.player;
    if (!L || !L.isInterior) return;
    if (G.actors.some(a => a.team === 'enemy' && !a.dead && dist(a.x, a.y, P.x, P.y) < 220)) return G.toast('Não dá para dormir com inimigos por perto!', '#ff8080');
    const d = this.dono(L);
    if (d === 'meu') return UI.dialog('Cama', null, 'Dormir até de manhã?', [{ label: '💤 Dormir', cls: 'gold', fn: () => UI.rest(L.b, 0) }, { label: 'Agora não' }]);
    if (d === 'taverna') return UI.dialog('Quarto da taverna', null, 'O quarto custa <b>15 de ouro</b> a noite. Deitar aqui e dormir até de manhã?', [{ label: '💤 Alugar e dormir (15 ouro)', cls: 'gold', fn: () => UI.rest(L.b, 15) }, { label: 'Agora não' }]);
    const nome = L.b && L.b.owner ? L.b.owner.name : 'outra pessoa';
    G.toast(`Esta cama é de ${nome}. Durma na sua casa ou alugue um quarto numa taverna.`, '#ffb080');
  }
};
