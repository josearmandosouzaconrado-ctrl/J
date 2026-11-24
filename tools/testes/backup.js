// Teste da cópia do progresso: salva, exporta, apaga tudo, importa e confere.
const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:8765/index.html';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(() => { try { localStorage.setItem('eldoria_lang', 'pt'); } catch (e) { } });
  await p.goto(URL); await p.waitForTimeout(2500);
  await p.evaluate(() => Game.newGame({ name: 'Copia', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'm' }, seed: 31 }));
  await p.waitForTimeout(3500);
  const txt = await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); Game.player.gold = 4242; Game.saveGame(2, true); UI.options(); Backup.menu(); return Backup.exportar(); });
  await p.evaluate(() => { for (const k of Backup.chaves()) localStorage.removeItem(k); });
  const vazio = await p.evaluate(() => Game.hasSave(2));
  await p.evaluate(t => { Backup.importar(t); document.querySelector('.dlg-opts .dbtn').click(); }, txt);
  await p.waitForTimeout(500);
  const info = await p.evaluate(() => JSON.stringify(Game.saveInfo(2)));
  console.log('tamanho', txt.length, 'apagado', !vazio, 'importado', info);
  const ok = !vazio && info && info.includes('Copia');
  console.log(ok && !errs.length ? 'SEM ERROS' : 'ERROS ' + JSON.stringify(errs));
  await b.close(); process.exit(ok && !errs.length ? 0 : 1);
})();
