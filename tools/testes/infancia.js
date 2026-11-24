// Teste: nascer de novo como bebê começa dentro da casa da família, com os pais; conversar, ajudar,
// jantar, dormir; sair e voltar (de dia o pai está no trabalho). E a neve não cobre mansões no deserto.
//   node tools/testes/infancia.js [url] [pasta-das-fotos]
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 960, height: 540 }, deviceScaleFactor: 2 }); const e = []; p.on('pageerror', x => e.push(x.message + ' @ ' + (x.stack || '').split('\n')[1]));
  const OUT = process.argv[3]; const falhas = []; const chk = (n, c, i) => { console.log(c ? '✔' : '✘', n, i === undefined ? '' : i); if (!c) falhas.push(n); };
  await p.addInitScript(() => localStorage.setItem('eldoria_lang', 'pt'));
  await p.goto(process.argv[2] || 'http://localhost:8765/index.html'); await p.waitForTimeout(2500);
  await p.evaluate(() => Game.newGame({ name: 'Velho Teste', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'm' }, seed: 777 }));
  await p.waitForTimeout(4000); await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); });
  // morre de velhice e nasce de novo
  await p.evaluate(() => { const P = Game.player; P.dead = true; Geracoes.renascer(Geracoes.registro(P, 'morreu de velhice')); });
  await p.waitForTimeout(2500);
  const r = await p.evaluate(() => { const L = Game.level, P = Game.player, fam = Game.actors.filter(a => a.res && a.res.familia); return { dentro: !!(L && L.isInterior), casa: L && L.b && L.b.name, nome: P.name, idade: Geracoes.anos(), fam: fam.map(a => a.res.familia + ':' + a.name), pais: P.origem.pais.map(x => x.name) }; });
  chk('nasce dentro da casa da família', r.dentro && /Casa da família/.test(r.casa), `${r.nome}, ${r.idade} anos, em ${r.casa}`);
  chk('os pais estão em casa', r.fam.length >= 1 && r.fam.some(x => /^mae/.test(x)), r.fam.join(', '));
  await p.evaluate(() => { while (document.querySelector('.story, .dialog')) { const bt = document.querySelector('.story button, .dlg-opts button, .dialog button'); if (!bt) break; bt.click(); } UI.close(); });
  await p.waitForTimeout(500);
  if (OUT) await p.screenshot({ path: OUT + '/casa_familia.png' });
  // conversar com a mãe
  await p.evaluate(() => { const a = Game.actors.find(a => a.res && a.res.familia === 'mae'); UI.talkNPC(a); }); await p.waitForTimeout(400);
  const op = await p.evaluate(() => [...document.querySelectorAll('.dlg-opts button')].map(b => b.textContent.trim()));
  chk('conversa com a mãe tem as opções de casa', ['Ajudar', 'Jantar', 'Dormir', 'mesada', 'abraço'].every(k => op.some(o => o.includes(k))), op.join(' | '));
  if (OUT) await p.screenshot({ path: OUT + '/falar_mae.png' });
  const aj = await p.evaluate(() => { const g = Game.player.gold; [...document.querySelectorAll('.dlg-opts button')].find(b => /Ajudar/.test(b.textContent)).click(); return Game.player.gold - g; });
  chk('ajudar em casa dá umas moedas', aj > 0, '+' + aj + ' ouro');
  const ja = await p.evaluate(() => { UI.close(); const P = Game.player; P.needs.fome = 20; P.needs.sede = 20; const a = Game.actors.find(a => a.res && a.res.familia); UI.talkNPC(a); [...document.querySelectorAll('.dlg-opts button')].find(b => /Jantar/.test(b.textContent)).click(); return [P.needs.fome, P.needs.sede]; });
  chk('jantar em família enche a fome e a sede', ja[0] === 100 && ja[1] === 100);
  const cama = await p.evaluate(() => { UI.close(); return Camas.dono(Game.level); });
  chk('a cama da casa é sua', cama === 'meu');
  // sai e volta de dia: o pai está no trabalho, a mãe em casa
  const dia = await p.evaluate(() => new Promise(ok => { UI.close(); Game.exitDungeon(); setTimeout(() => { Game.time = 11 * 60; const b = Infancia.casaB(); Game.enterInterior(b); setTimeout(() => ok(Game.actors.filter(a => a.res && a.res.familia).map(a => a.res.familia)), 800); }, 1200); }));
  chk('de dia o pai está no trabalho', !dia.includes('pai') && dia.includes('mae'), dia.join(','));
  const noite = await p.evaluate(() => new Promise(ok => { Game.exitDungeon(); setTimeout(() => { Game.time = 19 * 60; Game.enterInterior(Infancia.casaB()); setTimeout(() => ok(Game.actors.filter(a => a.res && a.res.familia).map(a => a.res.familia)), 800); }, 1200); }));
  chk('de noite os dois estão em casa', noite.includes('pai') && noite.includes('mae'), noite.join(','));
  // salvar e carregar mantém a casa
  const sv = await p.evaluate(() => new Promise(ok => { Game.exitDungeon(); setTimeout(() => { const c0 = JSON.stringify(Game.player.origem.casa); Game.saveGame(0, true); Game.loadGame(0); setTimeout(() => ok([c0, JSON.stringify(Game.player.origem.casa), Infancia.casaB() && Infancia.casaB().name]), 3000); }, 1200); }));
  chk('a casa continua depois de salvar e carregar', sv[0] === sv[1] && /família/.test(sv[2] || ''), sv[2]);
  // neve: mansões em areia não ficam brancas
  const nv = await p.evaluate(() => { const W = Game.world; let ruim = 0, tot = 0;
    for (const f of W.mansoes) for (let y = f.y0; y < f.y0 + f.h; y += 2) for (let x = f.x0; x < f.x0 + f.w; x += 2) { const bt = W.baseTile(x, y); if (bt !== T.SAND && bt !== T.DESERT && bt !== T.BADLAND) continue; tot++; if (Estacoes.tileVisual(W, x, y, W.tileAt(x, y)) === T.SNOW) ruim++; }
    return [ruim, tot]; });
  chk('sem neve nas mansões em areia', nv[0] === 0, `${nv[0]} de ${nv[1]} pontos de areia com neve`);
  console.log(e.length ? 'ERROS: ' + e.join(' | ') : 'sem erros', falhas.length ? '— FALHAS: ' + falhas.join(', ') : '— tudo certo');
  await b.close(); process.exit(falhas.length || e.length ? 1 : 0); })();
