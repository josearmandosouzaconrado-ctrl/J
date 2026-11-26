// Teste: embarcar num navio logo no começo (mapa ainda não montado) num celular lento não pode travar.
// 'pior' = maior travada enquanto a carta náutica é preparada; 'piorNavio' = montar e desenhar o navio (informativo).
//   node tools/testes/navio.js [url]
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 960, height: 540 } }); const e = []; p.on('pageerror', x => e.push(x.message + ' @ ' + (x.stack || '').split('\n').slice(1, 4).join(' | ')));
  await p.addInitScript(() => { localStorage.setItem('eldoria_lang', 'pt'); try { indexedDB.deleteDatabase('eldoria_mapa'); } catch (e) { } });
  await p.goto(process.argv[2] || 'http://localhost:8765/index.html'); await p.waitForTimeout(2500);
  await p.evaluate(() => Game.newGame({ name: 'T', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'm' }, seed: 777 }));
  await p.waitForTimeout(4000); await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); Game.player.invuln = 1e9; });
  const cdp = await p.context().newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const r = await p.evaluate(() => new Promise(ok => {
    const W = Game.world, de = W.ports[0], para = W.ports.find(q => q !== de && q.port.cont === de.port.cont) || W.ports[1];
    const antes = W.mapDone; let pior = 0, piorNavio = 0, ult = performance.now(); const T0 = ult;
    const T = performance.now(); const npc = Game.actors.find(a => a.team === 'npc' && a.look && a.look.k === 'hum') || Game.actors.find(a => a.look) || Game.player; Game.voyage(de, para, { name: 'Capitão', look: npc.look }); const chamada = performance.now() - T;
    const f = () => { const t = performance.now(); const navio = !!(Game.level && Game.level.isShip); if (!navio) pior = Math.max(pior, t - ult); else piorNavio = Math.max(piorNavio || 0, t - ult); ult = t;
      if (navio || t - T0 > 90000) setTimeout(() => ok({ antes, chamada, pior, piorNavio, navio, s: ((performance.now() - T0) / 1000).toFixed(1) }), 500); else requestAnimationFrame(f); };
    requestAnimationFrame(f); }));
  console.log(JSON.stringify(r), e.length ? e : 'sem erros');
  const ok = r.navio && r.pior < 1500 && r.chamada < 1500 && !e.length; console.log(ok ? 'SEM TRAVAR' : 'FALHOU');
  await b.close(); process.exit(ok ? 0 : 1); })();
