'use strict';
// ===================== MINAS E RECURSOS =====================
// Nas suas cidades dá para construir minas (no Modo Construção). Cada mina rende todo dia pedra,
// minério de ferro e às vezes ouro, guardados no armazém da cidade. As obras e as armas de cerco
// usam o que estiver no armazém quando falta na sua bolsa.
O.MINA = 162;
odef(O.MINA, { name: 'Mina', solid: true, interact: 'mina' });
OSOLID[O.MINA] = 1;
OBRAS.mina = { cat: 'Prédios', nome: 'Mina (pedra, ferro e ouro)', obj: () => O.MINA, ouro: 600, mats: { tabua: 20, pedra: 10 } };
const RECURSOS = [['pedra', 'Pedra'], ['minerio_ferro', 'Minério de ferro'], ['minerio_ouro', 'Minério de ouro'], ['tabua', 'Tábua'], ['bloco_pedra', 'Bloco de pedra']];

Sprites.extraObj[O.MINA] = (v, f, r, mk) => {
  // entrada de mina com vigas, trilhos e um carrinho cheio de minério
  const c = mk(34, 30, p => {
    p(2, 8, '#5a3a1e', 24, 18); p(2, 8, '#7a5030', 24, 2);
    for (let y = 10; y < 26; y += 4) p(2, y, '#4a2c14', 24, 1);
    p(2, 2, '#8a5a30', 26, 7); for (let x = 2; x < 28; x += 4) p(x, 2, '#6a4020', 1, 7); p(2, 2, '#a87440', 26, 1);
    p(8, 12, '#140c08', 12, 14); p(8, 12, '#2a1a10', 12, 2); p(7, 11, '#6a4020', 2, 15); p(19, 11, '#6a4020', 2, 15);
    p(10, 26, '#5a5a62', 1, 4); p(17, 26, '#5a5a62', 1, 4); for (let y = 26; y < 30; y += 2) p(9, y, '#6a4020', 10, 1);
    p(20, 21, '#5a3a20', 12, 6); p(20, 21, '#7a5030', 12, 1); p(21, 18, '#7a7a82', 3, 3); p(24, 17, '#9a9aa2', 3, 4); p(27, 18, '#d0a030', 3, 3);
    p(22, 27, '#2a2a30', 3, 3); p(28, 27, '#2a2a30', 3, 3);
    p(0, 24, '#3a7a3a', 3, 2); p(26, 6, '#3a6a2a', 3, 2);
  });
  return { c, oy: 0 };
};

const Recursos = {
  armazem() { const V = Vila.st(); if (!V) return null; return V.armazem || (V.armazem = {}); },
  minas() { return Construcao.obras().filter(o => o.k === 'mina').length; },
  total() { const A = this.armazem(); return A ? Object.values(A).reduce((s, n) => s + n, 0) : 0; },
  // produção do dia (chamada pela vila ao virar o dia)
  dia() {
    const n = this.minas(), A = this.armazem(); if (!n || !A) return;
    const add = (id, q) => { A[id] = Math.min(999, (A[id] || 0) + q); };
    for (let i = 0; i < n; i++) { add('pedra', 6 + Math.floor(Math.random() * 5)); add('minerio_ferro', 2 + Math.floor(Math.random() * 3)); if (Math.random() < 0.45) add('minerio_ouro', 1 + Math.floor(Math.random() * 2)); }
  },
  texto() {
    const A = this.armazem() || {};
    const l = RECURSOS.filter(([id]) => A[id]).map(([id, nome]) => `${nome}: <b>${A[id]}</b>`).join(' • ');
    return l || '<span class="dim">vazio</span>';
  },
  menu(volta) {
    const P = Game.player, A = this.armazem(); if (!A) return;
    const opts = [];
    if (this.total()) opts.push({ label: '📦 Pegar tudo para a bolsa', cls: 'gold', fn: () => { for (const [id, n] of Object.entries(A)) if (n > 0 && ITEMS[id]) P.addItem(Items.make(id, n)); for (const k in A) A[k] = 0; Sfx.play('pickup'); Game.toast('Recursos do armazém na sua bolsa.', '#c8f0a0'); this.menu(volta); } });
    if ((A.minerio_ouro || 0) >= 1) opts.push({ label: `💰 Vender o ouro bruto ao tesouro (${A.minerio_ouro * 40} ouro)`, fn: () => { P.gold += A.minerio_ouro * 40; A.minerio_ouro = 0; Sfx.play('coin'); this.menu(volta); } });
    opts.push({ label: volta ? 'Voltar' : 'Fechar', fn: volta });
    UI.dialog('Armazém de recursos', null, `Minas na cidade: <b>${this.minas()}</b> (cada uma rende pedra, ferro e às vezes ouro todo dia).<br><br>${this.texto()}<br><span class="dim small">As obras usam o armazém automaticamente quando falta material na bolsa.</span>`, opts);
  },
  opcao(volta) { return { label: `📦 Armazém de recursos (${this.total()})`, fn: () => this.menu(volta) }; }
};

// ---------- as obras e armas de cerco tiram do armazém o que faltar na bolsa ----------
(function () {
  const has0 = Game.hasMats, take0 = Game.takeMats;
  Game.hasMats = function (mats, mul = 1) { const P = this.player, A = Recursos.armazem() || {}; return Object.entries(mats).every(([id, n]) => P.count(id) + (A[id] || 0) >= Math.ceil(n * mul)); };
  Game.takeMats = function (mats, mul = 1) {
    const P = this.player, A = Recursos.armazem() || {};
    for (const [id, n0] of Object.entries(mats)) { let n = Math.ceil(n0 * mul); const tem = P.count(id), da = Math.min(tem, n); if (da) P.removeItem(id, da); n -= da; if (n > 0 && A[id]) A[id] = Math.max(0, A[id] - n); }
  };
  void has0; void take0;
})();
