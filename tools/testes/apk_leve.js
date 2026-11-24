// Teste do APK leve: abre assets/index.html do APK como no celular (file://), serve o GitHub
// a partir desta pasta, confere o 1º download, a 2ª abertura sem internet e o save.
//   node tools/testes/apk_leve.js [CronicasDeEldoria.apk] [pasta-das-fotos]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');
const APK = process.argv[2] || 'CronicasDeEldoria.apk', OUT = process.argv[3], RAIZ = path.resolve(__dirname, '../..');
(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'leve-')); cp.execSync(`unzip -q -o ${path.resolve(APK)} -d ${tmp}`);
  const adm = /ADM/.test(APK), ua = 'Mozilla/5.0 (Linux; Android 13) Chrome/120 Mobile EldoriaAPK' + (adm ? ' EldoriaADM' : '');
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'perfil-'));
  let online = true, baixado = 0; const erros = [], falhas = [];
  const chk = (n, c, i) => { console.log(c ? '✔' : '✘', n, i || ''); if (!c) falhas.push(n); };
  const abrir = async () => {
    const ctx = await chromium.launchPersistentContext(perfil, { userAgent: ua, viewport: { width: 960, height: 540 }, args: ['--allow-file-access-from-files'] });
    await ctx.route('https://raw.githubusercontent.com/**', r => {
      if (!online) return r.abort();
      const u = new URL(r.request().url()); const rel = decodeURIComponent(u.pathname.split('/HEAD/')[1]);
      const f = path.join(RAIZ, rel); if (!fs.existsSync(f)) return r.fulfill({ status: 404, body: '' });
      const b = fs.readFileSync(f); baixado += b.length;
      r.fulfill({ status: 200, body: b, headers: { 'access-control-allow-origin': '*', 'content-type': 'text/plain' } });
    });
    const p = ctx.pages()[0] || await ctx.newPage(); p.on('pageerror', e => erros.push(e.message));
    await p.goto('file://' + tmp + '/assets/index.html');
    return { ctx, p };
  };
  // 1ª vez, com internet
  let { ctx, p } = await abrir();
  await p.waitForFunction(() => typeof Game !== 'undefined' && document.querySelector('#screens .mbtn'), null, { timeout: 60000 }).catch(() => { });
  chk('1ª abertura baixa e abre', await p.evaluate(() => typeof Game !== 'undefined' && IS_APK), `baixou ${Math.round(baixado / 1024)} KB`);
  chk('edição certa', await p.evaluate(a => IS_ADM === a, adm), adm ? 'ADM' : 'normal');
  chk('imagens baixadas', await p.evaluate(() => Object.keys(ARQ_LEVE).length > 30 && imgSrc('img/oceano.webp').startsWith('data:image/webp')));
  if (OUT) await p.screenshot({ path: OUT + '/leve_titulo.png' });
  await p.evaluate(() => Game.newGame({ name: 'Leve', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'm' }, seed: 777 }));
  await p.waitForTimeout(4000);
  await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); Game.player.gold = 4321; Game.saveGame(0, true); });
  await p.waitForTimeout(500);
  if (OUT) await p.screenshot({ path: OUT + '/leve_jogo.png' });
  // a arte do anime carrega
  chk('arte do anime', await p.evaluate(() => new Promise(ok => { const i = new Image(); i.onload = () => ok(i.width > 100); i.onerror = () => ok(false); i.src = imgSrc('anime/arte/vila.webp'); })));
  await ctx.close();
  // 2ª vez, SEM internet
  online = false; baixado = 0; ({ ctx, p } = await abrir());
  await p.waitForFunction(() => typeof Game !== 'undefined' && document.querySelector('#screens .mbtn'), null, { timeout: 60000 }).catch(() => { });
  chk('2ª abertura sem internet', await p.evaluate(() => typeof Game !== 'undefined'));
  await p.evaluate(() => Game.loadGame(0)); await p.waitForTimeout(3000);
  chk('save mantido', await p.evaluate(() => Game.player && Game.player.gold === 4321), await p.evaluate(() => Game.player && Game.player.gold));
  await ctx.close();
  // 3ª vez, com internet e sem mudanças: não baixa o jogo de novo
  online = true; baixado = 0; ({ ctx, p } = await abrir());
  await p.waitForFunction(() => typeof Game !== 'undefined', null, { timeout: 60000 }).catch(() => { });
  await p.waitForTimeout(17000);
  chk('sem download repetido', baixado < 100000, `baixou ${Math.round(baixado / 1024)} KB`);
  await ctx.close();
  console.log(erros.length ? 'ERROS: ' + erros.join(' | ') : 'sem erros', falhas.length ? '— FALHAS: ' + falhas.join(', ') : '— tudo certo');
  process.exit(falhas.length || erros.length ? 1 : 0);
})();
