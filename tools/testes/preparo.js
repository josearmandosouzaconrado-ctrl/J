// Teste: sem telas de carregamento. No menu (criando o herói) o mundo e o mapa são preparados escondidos;
// ao apertar Jogar o jogo entra na hora, o mapa abre na hora e o navio parte na hora.
// Depois: salvar, reabrir o jogo e "Continuar" também entra na hora.   node tools/testes/preparo.js [url]
const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:8765/index.html';
(async () => {
  const b = await chromium.launch(), e = [], falhas = [];
  const chk = (n, c, i) => { console.log(c ? '✔' : '✘', n, i === undefined ? '' : i); if (!c) falhas.push(n); };
  const ctx = await b.newContext({ viewport: { width: 960, height: 540 } }), p = await ctx.newPage();
  p.on('pageerror', x => e.push(x.message));
  await p.addInitScript(() => localStorage.setItem('eldoria_lang', 'pt'));
  await p.goto(URL); await p.waitForTimeout(2000);
  // criando o herói (o jogador leva uns segundos escolhendo raça, classe e aparência)
  await p.evaluate(() => UI.showCreate()); await p.waitForTimeout(15000);
  const prep = await p.evaluate(() => ({ seed: Game.proximaSeed, pronto: !!(Preparo.job && Preparo.job.pronto), mapa: !!(Preparo.job && Preparo.job.W && Preparo.job.W.mapDone), fps: Game.fps }));
  chk('o mundo e o mapa ficam prontos enquanto cria o herói', prep.pronto && prep.mapa, `menu a ${prep.fps} FPS`);
  const t = await p.evaluate(() => { const t0 = performance.now(); Game.newGame({ name: 'Rápido', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'm' } }); return { ms: performance.now() - t0, iniciou: Game.started, mapa: Game.world.mapDone }; });
  chk('apertou Jogar: o jogo entra na hora', t.iniciou && t.ms < 600, Math.round(t.ms) + ' ms');
  await p.waitForTimeout(3000); await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); });
  const m = await p.evaluate(() => { const t0 = performance.now(); UI.openMap(); const ms = performance.now() - t0; const tela = !!document.querySelector('.carga, #carga-mapa'); UI.close(); return { ms, tela }; });
  chk('o mapa abre na hora, sem tela de carregamento', m.ms < 400 && !m.tela, Math.round(m.ms) + ' ms');
  const nav = await p.evaluate(() => { const W = Game.world, de = W.ports[0], para = W.ports.find(q => q !== de && q.port.cont === de.port.cont) || W.ports[1]; const t0 = performance.now(); Game.voyage(de, para, { name: 'Capitão', look: Game.player.look }); return { ms: performance.now() - t0, navio: !!(Game.level && Game.level.isShip) }; });
  chk('o navio parte na hora', nav.navio, Math.round(nav.ms) + ' ms');
  // salvar, reabrir o jogo e Continuar
  await p.evaluate(() => { Game.exitDungeon && Game.level !== Game.world && Game.exitDungeon(); Game.saveGame(0, true); });
  await p.reload(); await p.waitForTimeout(12000);
  const c = await p.evaluate(() => { const t0 = performance.now(); Game.loadGame(0); return { ms: performance.now() - t0, iniciou: Game.started, nome: Game.player && Game.player.name }; });
  await p.waitForTimeout(800);
  chk('Continuar entra na hora', c.iniciou && c.ms < 800 && c.nome === 'Rápido', Math.round(c.ms) + ' ms');
  console.log(e.length ? 'ERROS: ' + e.join(' | ') : 'sem erros', falhas.length ? '— FALHAS: ' + falhas.join(', ') : '— tudo certo');
  await b.close(); process.exit(falhas.length || e.length ? 1 : 0);
})();
