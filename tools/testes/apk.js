// (APK completo: python3 android/build_apk.py --completo. O APK leve tem o teste tools/testes/apk_leve.js)
// Teste do APK: abre o jogo de dentro do APK (assets) como o aplicativo Android abriria.
// Uso: node tools/testes/apk.js CronicasDeEldoria.apk
const { chromium } = require('playwright'); const { execSync } = require('child_process'); const fs = require('fs'); const os = require('os'); const path = require('path');
const apk = path.resolve(process.argv[2] || 'CronicasDeEldoria.apk');
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'apkx-'));
execSync(`unzip -q "${apk}" -d "${dir}"`);
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 860, height: 400 }, userAgent: 'Mozilla/5.0 (Linux; Android 14; wv) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36 EldoriaAPK', isMobile: true, hasTouch: true });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(() => { try { localStorage.setItem('eldoria_lang', 'pt'); } catch (e) { } });
  await p.goto('file://' + dir + '/assets/index.html'); await p.waitForTimeout(4000);
  console.log('abriu', await p.evaluate(() => JSON.stringify({ v: GAME_VERSION, apk: IS_APK, adm: IS_ADM, cont: CONTINENTS.length, mods: typeof Mods, galeria: typeof ModsGaleria, oficiais: typeof MODS_OFICIAIS !== 'undefined' ? MODS_OFICIAIS.length : 0, rotina: typeof Rotina, fazendas: typeof Fazendas })));
  await p.evaluate(() => Game.newGame({ name: 'Apk', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'm' }, seed: 55 }));
  await p.waitForTimeout(5000);
  await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); Game.saveGame(1, true); });
  console.log('jogo', await p.evaluate(() => 'cidades=' + Game.world.settlements.length + ' fazendas=' + Game.world.fazendas.length + ' salvo=' + Game.hasSave(1)));
  console.log(errs.length ? 'ERROS ' + JSON.stringify(errs.slice(0, 8)) : 'SEM ERROS');
  await b.close(); fs.rmSync(dir, { recursive: true, force: true });
  process.exit(errs.length ? 1 : 0);
})();
