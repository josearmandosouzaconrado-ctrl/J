'use strict';
// =====================================================================
//  TELA DE CARREGAMENTO — uma só para o jogo todo: a cena animada do
//  cavaleiro ao entardecer, o nome do jogo, uma barra dourada que anda de
//  verdade (com o nome de cada etapa) e dicas que trocam sozinhas.
//  O mundo agora é criado em etapas (World.etapas): a tela não congela e a
//  barra mostra o que está sendo feito. O mapa-múndi e a carta náutica usam
//  a mesma tela.
// =====================================================================
// pesos = tempo medido de cada etapa (a barra anda no ritmo real)
const CARGA_ETAPAS = {
  cidades: [2, 'Erguendo as cidades e as vilas...'], layout: [10, 'Construindo casas, praças e muralhas...'],
  masmorras: [1, 'Escondendo masmorras e tesouros...'], pois: [1, 'Acendendo fogueiras e santuários...'],
  estradas: [3, 'Abrindo as estradas entre os reinos...'], kaeloria: [5, 'Navegando até Kaeloria...'],
  valtheria: [20, 'Descobrindo Valtheria, o Grande Continente...'], elyndra: [18, 'Atravessando o Mar do Amanhecer até Elyndra...'],
  pindorama: [14, 'Desbravando as matas de Pindorama...'], aurevia: [26, 'Chegando a Aurévia, além do Mar das Rosas...'],
  ilhas: [4, 'Espalhando ilhas pelo oceano...'], hrimgard: [1, 'Levantando as muralhas de Hrimgard...'],
  fazendas: [5, 'Plantando as fazendas...'], dominios: [3, 'Dividindo as terras das casas nobres...']
};
const CARGA_TOTAL = Object.values(CARGA_ETAPAS).reduce((s, e) => s + e[0], 0);

const Carregamento = {
  css() {
    if (document.getElementById('carga-css')) return;
    const st = document.createElement('style'); st.id = 'carga-css';
    st.textContent = `
.carga{position:absolute;inset:0;overflow:hidden;background:#140c24;font-family:VT323,monospace;color:#f2e6cc;z-index:5}
.carga canvas{position:absolute;inset:0;width:100%;height:100%;image-rendering:pixelated;image-rendering:crisp-edges}
.carga-logo{position:absolute;left:0;right:0;top:5%;text-align:center;font-size:clamp(34px,7.5vw,72px);line-height:.9;color:#f0c040;text-shadow:3px 3px 0 #5a1a10,6px 6px 0 #000;letter-spacing:2px}
.carga-logo small{display:block;font-size:.36em;color:#f2e6cc;letter-spacing:5px;text-shadow:2px 2px 0 #000;margin-top:4px}
.carga-baixo{position:absolute;left:50%;bottom:max(12px,3%);transform:translateX(-50%);width:min(620px,88%);text-align:center}
.carga-titulo{font-size:clamp(22px,3.6vw,30px);color:#ffe8a0;text-shadow:2px 2px 0 #000}
.carga-etapa{font-size:clamp(16px,2.6vw,20px);color:#e0d0b8;text-shadow:1px 1px 0 #000;min-height:1.2em;margin:2px 0 6px}
.carga-barra{position:relative;height:18px;border:3px solid #c8a050;box-shadow:0 0 0 2px #2a1a10,inset 0 0 0 2px #000,0 4px 0 rgba(0,0,0,.5);background:#1a0e14;overflow:hidden}
.carga-fill{position:absolute;left:0;top:0;bottom:0;width:100%;transform-origin:left;transform:scaleX(0);background:linear-gradient(#ffe080,#f0b030 45%,#c07018);transition:transform .25s steps(6)}
.carga-brilho{position:absolute;top:0;bottom:0;width:28%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);animation:carga-br 1.6s linear infinite}
@keyframes carga-br{from{transform:translateX(-120%)}to{transform:translateX(420%)}}
.carga-pct{position:absolute;right:6px;top:-1px;font-size:16px;color:#fff;text-shadow:1px 1px 0 #000}
.carga-dica{margin-top:10px;font-size:clamp(15px,2.4vw,19px);color:#d8c8a8;background:rgba(10,6,16,.72);border:2px solid #5a4030;padding:6px 10px;min-height:2.4em;animation:carga-in .5s}
.carga-dica b{color:#f0c040}
@keyframes carga-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
`;
    document.head.appendChild(st);
  },
  dicaI: Math.floor(Math.random() * DICAS_CARGA.length),
  abrir(titulo, etapa) {
    this.css();
    const el = UI.show('loading', `<div class="carga"><canvas class="carga-cena"></canvas>
      <div class="carga-logo">Crônicas de Eldoria<small>${esc(typeof GAME_VERSION !== 'undefined' ? 'versão ' + GAME_VERSION : '')}</small></div>
      <div class="carga-baixo"><div class="carga-titulo" id="carga-titulo">${esc(titulo || 'Carregando')}</div>
        <div class="carga-etapa" id="carga-etapa">${esc(etapa || '')}</div>
        <div class="carga-barra"><div class="carga-fill" id="carga-fill"></div><div class="carga-brilho"></div><div class="carga-pct" id="carga-pct"></div></div>
        <div class="carga-dica" id="carga-dica"></div></div></div>`, { cls: 'full' });
    const cv = el && el.querySelector('.carga-cena'); if (cv) CenaCarga.animar(cv);
    this.dica();
    clearInterval(this.dicaT); this.dicaT = setInterval(() => { if (!document.getElementById('carga-dica')) return clearInterval(this.dicaT); this.dica(); }, 5500);
    this.progresso(0);
    return el;
  },
  dica() {
    const d = document.getElementById('carga-dica'); if (!d) return;
    this.dicaI = (this.dicaI + 1) % DICAS_CARGA.length;
    d.innerHTML = `<b>Dica:</b> ${esc(DICAS_CARGA[this.dicaI])}`;
    d.style.animation = 'none'; void d.offsetWidth; d.style.animation = '';
  },
  progresso(k, etapa) {
    const f = document.getElementById('carga-fill'), p = document.getElementById('carga-pct'), e = document.getElementById('carga-etapa');
    k = Math.max(0, Math.min(1, k || 0));
    if (f) f.style.transform = `scaleX(${k})`;
    if (p) p.textContent = Math.floor(k * 100) + '%';
    if (e && etapa !== undefined && e.textContent !== etapa) e.textContent = etapa;
  },
  // ---------- criar o mundo aos poucos ----------
  criarMundo(game, seed, cb, layout) {
    this.abrir('Forjando o mundo de Eldoria', 'Preparando a terra e os mares...');
    game.gerandoMundo = true;
    setTimeout(() => {
      try {
        setLayout(layout || LAYOUT_NOVO);   // jogos novos: mares largos; saves antigos ficam como eram
        const W = new World(seed, true), it = W.etapas(), t0 = performance.now();
        let feito = 0, atual = null;
        const passo = () => {
          try {
            const ini = performance.now(); let r;
            do {
              r = it.next(); if (r.done) break;
              const [k, fr] = r.value, E = CARGA_ETAPAS[k] || [1, 'Quase pronto...'];
              if (k !== atual) { if (atual) feito += (CARGA_ETAPAS[atual] || [1])[0]; atual = k; }
              this.progresso((feito + E[0] * (fr || 0)) / CARGA_TOTAL, E[1]);
            } while (performance.now() - ini < 45);
            if (!r.done) return setTimeout(passo, 0);
            W.genTime = performance.now() - t0;
            this.progresso(1, 'Quase pronto...');
            setTimeout(() => {
              try { game.world = W; W.startMapImage(); game.gerandoMundo = false; cb(); }
              catch (e) { game.gerandoMundo = false; console.error(e); this.erro(e); }
            }, 40);
          } catch (e) { game.gerandoMundo = false; console.error(e); this.erro(e); }
        };
        passo();
      } catch (e) { game.gerandoMundo = false; console.error(e); this.erro(e); }
    }, 80);
  },
  erro(e) { this.progresso(0, ''); const t = document.getElementById('carga-titulo'); if (t) t.textContent = 'Erro ao gerar o mundo: ' + (e && e.message || e); }
};
(function () {
  // a tela antiga ("Forjando o mundo...", "Carregando...") vira a nova
  UI.showLoading = function (text) { return Carregamento.abrir(String(text || 'Carregando').replace(/\.\.\.$/, ''), ''); };
  Game.buildWorld = function (seed, cb, layout) { return Carregamento.criarMundo(this, seed, cb, layout); };
  // enquanto o mundo novo é criado, o jogo espera (nada é desenhado nem atualizado por baixo)
  const fr0 = Game.frame;
  Game.frame = function (dt) { if (this.gerandoMundo) return; return fr0.apply(this, arguments); };
  // a carta náutica (navios): a mesma tela, com a barra de verdade
  UI.esperarMapa = function (titulo, fn) {
    const W = Game.world;
    if (!W || W.mapDone) return fn();
    const nome = String(titulo || '').replace(/^\S+\s/, '') || 'Preparando a viagem';
    Carregamento.abrir(nome, 'Desenhando a carta náutica dos mares...');
    const passo = () => {
      if (Game.world !== W) return;
      W.stepMapImage(100000, 45);
      Carregamento.progresso(W.mapRow / MAP_H, W.mapDone ? 'Pronto! Levantar âncora!' : 'Desenhando a carta náutica dos mares...');
      if (W.mapDone) { setTimeout(() => { UI.close(); fn(); }, 250); } else setTimeout(passo, 0);
    };
    setTimeout(passo, 30);
  };
  // o mapa-múndi na primeira vez: a mesma tela por cima do mapa
  const dm0 = UI.drawMap;
  UI.drawMap = function () {
    const W = Game.world;
    if (W && !W.mapDone && this.mcv) {
      let ov = document.getElementById('carga-mapa');
      if (!ov) {
        Carregamento.css();
        const wrap = this.mcv.parentElement; ov = document.createElement('div'); ov.id = 'carga-mapa'; ov.className = 'carga';
        ov.innerHTML = `<canvas class="carga-cena"></canvas><div class="carga-logo">Mapa do Mundo<small>só na primeira vez: depois fica guardado</small></div><div class="carga-baixo"><div class="carga-titulo">Desenhando o mapa do mundo</div><div class="carga-etapa" id="carga-etapa">Os cartógrafos estão trabalhando...</div><div class="carga-barra"><div class="carga-fill" id="carga-fill"></div><div class="carga-brilho"></div><div class="carga-pct" id="carga-pct"></div></div><div class="carga-dica" id="carga-dica"></div></div>`;
        wrap.appendChild(ov); CenaCarga.animar(ov.querySelector('canvas')); Carregamento.dica();
        clearInterval(Carregamento.dicaT); Carregamento.dicaT = setInterval(() => { if (!document.getElementById('carga-dica')) return clearInterval(Carregamento.dicaT); Carregamento.dica(); }, 5500);
      }
      W.stepMapImage(100000, 45);
      Carregamento.progresso(W.mapRow / MAP_H);
      if (!W.mapDone) { if (!this._mapAF) this._mapAF = setTimeout(() => { this._mapAF = 0; if (this.mcv && this.mcv.isConnected) this.drawMap(); }, 0); return; }
    }
    const ov = document.getElementById('carga-mapa'); if (ov) ov.remove();
    return dm0.apply(this, arguments);
  };
})();
