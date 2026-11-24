// Teste: tochas das masmorras ficam na parede e não bloqueiam a passagem.
//   node tools/testes/tochas.js [url] [pasta-das-fotos]
const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:8765/index.html', OUT = process.argv[3];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 960, height: 540 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(() => { try { localStorage.setItem('eldoria_lang', 'pt'); } catch (e) { } });
  await p.goto(URL); await p.waitForTimeout(2500);
  await p.evaluate(() => Game.newGame({ name: 'Teste', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'm' }, seed: 777 }));
  await p.waitForTimeout(3500);
  await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); Game.player.invuln = 1e9; Game.godMode = true; });
  const tipos = await p.evaluate(() => [...new Set(Game.world.dungeons.map(d => d.type))]);
  let falhas = 0, n = 0;
  for (const t of tipos) {
    const r = await p.evaluate(t => {
      const d = Game.world.dungeons.find(d => d.type === t); Game.enterDungeon(d); const L = Game.level;
      let tot = 0, solta = 0, bloq = 0, alvo = null;
      for (let y = 1; y < L.h - 1; y++) for (let x = 1; x < L.w - 1; x++) if (L.objAt(x, y) === O.TORCH) {
        tot++; if (!TSOLID[L.tileAt(x, y - 1)]) solta++; if (L.solidAt(x, y)) bloq++; if (!alvo) alvo = [x, y];
      }
      if (alvo) { const P = Game.player; P.x = alvo[0] * 16 + 8; P.y = alvo[1] * 16 + 12; Game.actors.filter(a => a.team === 'enemy').forEach(a => a.hp = 0); }
      return { t, tot, solta, bloq };
    }, t);
    await p.waitForTimeout(700);
    n++; const ruim = r.solta || r.bloq; if (ruim) falhas++;
    console.log(ruim ? '✘' : '✔', r.t, 'tochas=' + r.tot, 'fora da parede=' + r.solta, 'bloqueando=' + r.bloq);
    if (OUT && n <= 2) await p.screenshot({ path: `${OUT}/tocha_${r.t}.png` });
    await p.evaluate(() => Game.exitDungeon()); await p.waitForTimeout(800);
  }
  console.log(errs.length ? 'ERROS: ' + errs.join(' | ') : 'sem erros', `— ${n} tipos, ${falhas} com problema`);
  await b.close(); process.exit(falhas || errs.length ? 1 : 0);
})();
