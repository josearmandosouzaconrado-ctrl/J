// Teste do mapa-múndi: abrir o mapa pela 1ª vez num celular lento (CPU 4x mais lenta) não pode travar.
//   node tools/testes/mapa.js [url] [pasta-das-fotos]
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 960, height: 540 } }); const e = []; p.on('pageerror', x => e.push(x.message));
  await p.addInitScript(() => { localStorage.setItem('eldoria_lang', 'pt'); try { indexedDB.deleteDatabase('eldoria_mapa'); } catch (e) { } });
  await p.goto((process.argv[2] || 'http://localhost:8765/index.html')); await p.waitForTimeout(2500);
  await p.evaluate(() => Game.newGame({ name: 'T', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'm' }, seed: 777 }));
  await p.waitForTimeout(4000); await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); });
  const cdp = await p.context().newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  console.log('mapa pronto antes de abrir?', await p.evaluate(() => Game.world.mapDone + ' linha ' + Game.world.mapRow + '/' + MAP_H));
  // maior travada de um quadro enquanto o mapa abre
  const r = await p.evaluate(() => new Promise(ok => { let pior = 0, ult = performance.now(); const T0 = performance.now();
    const T = performance.now(); UI.openMap(); const abrir = performance.now() - T;
    const f = () => { const t = performance.now(); pior = Math.max(pior, t - ult); ult = t; if (Game.world.mapDone || t - T0 > 120000) { setTimeout(() => ok({ abrir, pior, total: performance.now() - T0 }), 300); } else requestAnimationFrame(f); }; requestAnimationFrame(f); }));
  console.log('abrir', r.abrir.toFixed(0), 'ms; maior quadro', r.pior.toFixed(0), 'ms; mapa completo em', (r.total / 1000).toFixed(1), 's', e); const ok = r.pior < 1500 && r.abrir < 1500 && !e.length; console.log(ok ? 'SEM TRAVAR' : 'TRAVOU'); process.exitCode = ok ? 0 : 1;
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  await p.evaluate(() => { Game.mods.explored.fill(1); UI.close(); UI.openMap(); const rg = Game.world.regions.find(r => /Khaz/.test(r.name)); UI.mox = rg.cx / 16; UI.moy = rg.cy / 16; UI.mz = 5; UI.drawMap(); });
  await p.waitForTimeout(500); await p.screenshot({ path: (process.argv[3] || require('os').tmpdir()) + '/mapa.png' });
  await b.close(); })();
