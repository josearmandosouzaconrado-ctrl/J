'use strict';
// =====================================================================
//  PREPARO — sem telas de carregamento: enquanto o jogador está no menu
//  (tela inicial ou criando o personagem), o mundo é preparado aos pouquinhos,
//  escondido (World.etapas), junto com o mapa-múndi. Ao apertar "Continuar"
//  ou "Jogar" o mundo já está pronto e o jogo entra na hora. Se o jogador for
//  rápido demais, o que falta é terminado na mesma hora, sem tela.
//  • Tela inicial: prepara o mundo do save mais recente.
//  • Criando um herói novo: prepara o mundo do jogo novo (a semente é sorteada antes).
// =====================================================================
const Preparo = {
  job: null,      // { seed, layout, W, it, pronto }
  alvo(seed, layout) {
    layout = layout || LAYOUT_NOVO;
    if (!seed || (this.job && this.job.seed === seed && this.job.layout === layout)) return;
    this.job = { seed, layout, W: null, it: null, pronto: false };
  },
  // trabalha até "ms" milissegundos (chamado a cada quadro do menu)
  passo(ms) {
    const J = this.job; if (!J || (J.pronto && J.W.mapDone)) return;
    const ini = performance.now(), antes = LAYOUT_N;
    try {
      setLayout(J.layout);
      if (!J.W) J.W = new World(J.seed, true), J.it = J.W.etapas();
      while (!J.pronto && performance.now() - ini < ms) { if (J.it.next().done) { J.pronto = true; J.W.startMapImage(); } }
      const sobra = ms - (performance.now() - ini);
      if (J.pronto && !J.W.mapDone && sobra > 1) J.W.stepMapImage(100000, sobra);
    } catch (e) { console.warn('Preparo', e); this.job = null; }
    finally { setLayout(antes); }
  },
  // o jogo pediu este mundo: entrega pronto (terminando o que faltar)
  pegar(seed, layout) {
    const J = this.job; layout = layout || LAYOUT_NOVO;
    if (!J || J.seed !== seed || J.layout !== layout || !J.W) return null;
    setLayout(layout);
    while (!J.pronto) { if (J.it.next().done) { J.pronto = true; J.W.startMapImage(); } }
    this.job = null;
    return J.W;
  },
  // o save mais recente (para "Continuar")
  ultimoSave() {
    let best = null;
    for (const i of [0, 1, 2, 3]) {
      try { const s = JSON.parse(localStorage.getItem(SAVE_PREFIX + i)); if (s && s.seed && (!best || (s.date || 0) > (best.date || 0))) best = s; } catch (e) { }
    }
    return best;
  }
};
(function () {
  // criar o mundo: sem tela, na hora (pronto se o menu já preparou)
  Game.buildWorld = function (seed, cb, layout) {
    layout = layout || LAYOUT_NOVO;
    let W = Preparo.pegar(seed, layout);
    if (!W) { setLayout(layout); W = new World(seed); W.startMapImage(); }
    this.world = W;
    cb();
  };
  UI.showLoading = function () { };
  // jogo novo: usa a semente que o menu já sorteou (e cujo mundo já está sendo preparado)
  const ng0 = Game.newGame;
  Game.newGame = function (opts) { if (opts && !opts.seed && this.proximaSeed) { opts = Object.assign({}, opts, { seed: this.proximaSeed }); this.proximaSeed = null; } return ng0.call(this, opts); };
  // tela inicial: prepara o mundo do "Continuar"
  const st0 = UI.showTitle;
  UI.showTitle = function () { const r = st0.apply(this, arguments); try { const s = Preparo.ultimoSave(); if (s) Preparo.alvo(s.seed, s.layout || 1); } catch (e) { } return r; };
  // criando o herói: prepara o mundo do jogo novo
  const sc0 = UI.showCreate;
  UI.showCreate = function () { const r = sc0.apply(this, arguments); if (!Game.proximaSeed) Game.proximaSeed = Math.floor(Math.random() * 1e9) + 1; Preparo.alvo(Game.proximaSeed, LAYOUT_NOVO); return r; };
  // um pouquinho a cada quadro enquanto o jogo não começou (o menu continua leve)
  const fr0 = Game.frame;
  Game.frame = function (dt) { const r = fr0.apply(this, arguments); if (!this.started) Preparo.passo(12); return r; };
})();
