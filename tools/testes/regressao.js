// Teste de regressão do jogo (Playwright). Uso:
//   python3 -m http.server 8765   (na pasta do jogo)
//   node tools/testes/regressao.js [http://localhost:8765/index.html]
// Percorre todos os continentes, entra e sai de um prédio, luta, abre os menus,
// avança o relógio (rotina dos moradores), salva e carrega. Falha com código 1 se houver erro.
const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:8765/index.html';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|net::/.test(m.text())) errs.push(m.text()); });
  const ok = []; const passo = (n, v) => { ok.push(n + ': ' + v); console.log('✔', n, v); };
  await p.addInitScript(() => { try { localStorage.setItem('eldoria_lang', 'pt'); } catch (e) { } });
  await p.goto(URL); await p.waitForTimeout(2500);
  passo('versão', await p.evaluate(() => GAME_VERSION + ' continentes=' + CONTINENTS.length));
  await p.evaluate(() => Mods.menu()); await p.waitForTimeout(300); await p.evaluate(() => UI.showTitle());
  await p.evaluate(() => Game.newGame({ name: 'Teste', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'm' }, seed: 777 }));
  await p.waitForTimeout(3500);
  await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); const P = Game.player; P.invuln = 1e9; Game.godMode = true; Game.day = 30; Game.time = 9 * 60; });
  passo('mundo', await p.evaluate(() => `cidades=${Game.world.settlements.length} fazendas=${(Game.world.fazendas || []).length} masmorras=${Game.world.dungeons.length}`));
  // todos os continentes
  for (let c = 0; c < 7; c++) {
    const r = await p.evaluate(c => { const s = Game.world.settlements.find(s => contAt(s.x, s.y) === c && (s.type === 'capital' || s.type === 'town') && !s.port) || Game.world.settlements.find(s => contAt(s.x, s.y) === c); if (!s) return null; const P = Game.player; P.x = s.mid.x * 16; P.y = (s.mid.y + 2) * 16; Game.findFree(P); return s.name; }, c);
    await p.waitForTimeout(3500);
    passo('continente ' + c, r + ' npcs=' + await p.evaluate(() => Game.actors.filter(a => a.team === 'npc').length));
  }
  // entrar num prédio e sair
  const ent = await p.evaluate(() => { const s = Game.world.settlements.find(s => s.active && s.buildings.some(b => b.role === 'inn' && b.door)); if (!s) return 'sem taverna'; const b = s.buildings.find(b => b.role === 'inn' && b.door); Game.enterInterior(b); return b.name + ' nível=' + (Game.level !== Game.world); });
  await p.waitForTimeout(2000);
  passo('interior', ent);
  await p.evaluate(() => { if (Game.level !== Game.world) Game.exitDungeon(); }); await p.waitForTimeout(2000);
  passo('saiu', await p.evaluate(() => Game.level === Game.world));
  // luta
  passo('luta', await p.evaluate(() => { const P = Game.player, m = new Monster('lobo', P.x + 40, P.y, 3); Game.actors.push(m); Combat.damage(m, 9999, { src: P }); return m.dead ? 'lobo morreu' : 'hp=' + m.hp; }));
  // menus
  for (const t of ['inv', 'char', 'magic', 'quests', 'system']) { await p.evaluate(t => UI.openMenu(t), t); await p.waitForTimeout(250); }
  await p.evaluate(() => UI.openMap()); await p.waitForTimeout(800); await p.evaluate(() => UI.close());
  passo('menus', 'ok');
  // relógio: a rotina dos moradores ao longo do dia
  const rot = [];
  for (const h of [6.5, 9, 12.4, 18, 21, 23.5]) { await p.evaluate(h => { Game.time = h * 60; }, h); await p.waitForTimeout(2500); rot.push(h + ':' + await p.evaluate(() => { const c = {}; for (const s of Game.world.settlements) if (s.active && s.npcs) for (const a of s.npcs) if (a.rot && a.rot.ativ) c[a.rot.ativ] = (c[a.rot.ativ] || 0) + 1; return JSON.stringify(c); })); }
  passo('rotina', rot.join(' '));
  // salvar e carregar
  const antes = await p.evaluate(() => { Game.saveGame(1, true); return [Math.round(Game.player.x), Game.day]; });
  await p.evaluate(() => Game.loadGame(1)); await p.waitForTimeout(4000);
  const depois = await p.evaluate(() => [Math.round(Game.player.x), Game.day]);
  passo('salvar/carregar', JSON.stringify(antes) + ' -> ' + JSON.stringify(depois));
  if (Math.abs(antes[0] - depois[0]) > 64 || antes[1] !== depois[1]) errs.push('save diferente');
  const fps = await p.evaluate(() => new Promise(r => { let n = 0; const t = performance.now(); const f = () => { n++; if (performance.now() - t < 2000) requestAnimationFrame(f); else r(Math.round(n / 2)); }; requestAnimationFrame(f); }));
  passo('fps', fps);
  console.log(errs.length ? 'ERROS ' + JSON.stringify(errs.slice(0, 10)) : 'SEM ERROS');
  await b.close();
  process.exit(errs.length ? 1 : 0);
})();
