// Teste da galeria de mods. Precisa do servidor com a galeria vazia:
//   DADOS=/tmp/x/sala.json node rede/servidor.js   (porta 8790)
//   node tools/testes/galeria.js [url-do-jogo] [pasta-das-fotos]
const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:8765/index.html', OUT = process.argv[3];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 960, height: 540 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const ok = (n, v) => console.log(v ? '✔' : '✘', n, v === true ? '' : v), falhas = [];
  const chk = (n, c, info) => { ok(n, c ? (info || true) : false); if (!c) falhas.push(n); };
  await p.addInitScript(() => { try { localStorage.setItem('eldoria_lang', 'pt'); localStorage.setItem('eldoria_mp_url', 'ws://localhost:8790/ws'); } catch (e) { } });
  await p.goto(URL); await p.waitForTimeout(2500);
  // um mod "de outra pessoa" já publicado (nome com HTML para testar o escape)
  await p.evaluate(() => fetch('http://localhost:8790/mods', { method: 'POST', body: JSON.stringify({ codigo: "Eldoria.registrar({ id: 'teste_mod', nome: 'Mod <b>Teste</b>', autor: 'Ana', descricao: 'Um teste', iniciar(api){} });" }) }));
  chk('base do servidor', await p.evaluate(() => ModsGaleria.base()) === 'http://localhost:8790');
  // publicar
  await p.evaluate(() => Mods.menu()); await p.waitForTimeout(200);
  chk('botões no menu', await p.evaluate(() => /Galeria de Mods/.test(document.body.innerText) && /Publicar meu mod/.test(document.body.innerText)));
  await p.evaluate(() => ModsGaleria.publicar()); await p.waitForTimeout(200);
  await p.fill('#modpub-txt', "Eldoria.registrar({ id: 'mod_do_joao', nome: 'Espada do João', autor: 'João', versao: '1.2', descricao: 'Dá uma poção ao começar o dia.', iniciar(api){ api.botao('Poção!', () => api.dar('pocao_vida_p', 1)); } });");
  await p.evaluate(() => ModsGaleria.enviar(document.getElementById('modpub-txt').value)); await p.waitForTimeout(200);
  await p.evaluate(() => [...document.querySelectorAll('button')].find(x => /Publicar$/.test(x.textContent.trim())).click()); await p.waitForTimeout(1200);
  chk('publicado', await p.evaluate(() => !!ModsGaleria.chaves().mod_do_joao), await p.evaluate(() => document.body.innerText.match(/Pronto!.*|Não deu.*/)?.[0]));
  // galeria
  await p.evaluate(() => ModsGaleria.abrir()); await p.waitForTimeout(1500);
  const txt = await p.evaluate(() => document.body.innerText);
  chk('galeria lista oficiais', /Mercador Ambulante/.test(txt) && /Fogos de Artifício/.test(txt));
  chk('galeria lista comunidade', /Espada do João/.test(txt) && /Mod <b>Teste<\/b>|Mod Teste/.test(txt), (txt.match(/Da comunidade.*\(\d+\)/) || [''])[0]);
  chk('html escapado', await p.evaluate(() => !document.querySelector('.modsgal b b')));
  if (OUT) await p.screenshot({ path: OUT + '/galeria.png' });
  // ativar mod da comunidade
  await p.evaluate(() => ModsGaleria.ativar(ModsGaleria.lista.find(m => m.id === 'mod_do_joao'), false)); await p.waitForTimeout(200);
  await p.evaluate(() => [...document.querySelectorAll('button')].find(x => x.textContent.trim() === '▶ Ativar').click()); await p.waitForTimeout(1200);
  chk('mod da comunidade instalado', await p.evaluate(() => { const m = Mods.lista.find(m => m.id === 'mod_do_joao'); return m && m.ativo && m.origem; }));
  // ativar oficiais
  for (const id of ['mercador_ambulante', 'cacador_recompensas', 'fogos_artificio']) await p.evaluate(id => ModsGaleria.ativar(MODS_OFICIAIS.find(m => m.id === id), true), id);
  await p.waitForTimeout(300);
  chk('oficiais instalados', await p.evaluate(() => Mods.lista.filter(m => m.ativo).length), );
  // reabrir: os mods rodam
  await p.reload(); await p.waitForTimeout(2500);
  await p.evaluate(() => Game.newGame({ name: 'Teste', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'm' }, seed: 777 }));
  await p.waitForTimeout(3500);
  await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); Game.player.gold = 500; });
  chk('mods rodando', await p.evaluate(() => Mods.carregados.map(c => c.id).join(',')));
  const g0 = await p.evaluate(() => Game.player.gold);
  await p.evaluate(() => { Mods.carregados.find(c => c.id === 'mercador_ambulante').botoes[0].fn(); }); await p.waitForTimeout(200);
  await p.evaluate(() => [...document.querySelectorAll('button')].find(x => /Poções de Vida/.test(x.textContent)).click()); await p.waitForTimeout(200);
  chk('mercador vendeu', await p.evaluate(g0 => Game.player.gold === g0 - 45 && Game.player.count('pocao_vida_p') >= 3, g0));
  await p.evaluate(() => { UI.close(); Mods.carregados.find(c => c.id === 'fogos_artificio').botoes[0].fn(); }); await p.waitForTimeout(1500);
  if (OUT) await p.screenshot({ path: OUT + '/fogos.png' });
  await p.evaluate(() => ModsGaleria.abrir()); await p.waitForTimeout(1500);
  chk('aparece como ativo', await p.evaluate(() => (document.body.innerText.match(/✓ Ativo/g) || []).length >= 4));
  // denunciar 3x vindo de IPs diferentes é coberto pelo servidor; aqui 1 denúncia
  await p.evaluate(() => ModsGaleria.denunciar(ModsGaleria.lista.find(m => m.id === 'teste_mod'))); await p.waitForTimeout(200);
  await p.evaluate(() => [...document.querySelectorAll('button')].find(x => x.textContent.trim() === '🚩 Denunciar').click()); await p.waitForTimeout(800);
  // retirar
  await p.evaluate(() => ModsGaleria.retirar('mod_do_joao')); await p.waitForTimeout(200);
  await p.evaluate(() => [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Retirar').click()); await p.waitForTimeout(1000);
  chk('retirado', await p.evaluate(() => fetch('http://localhost:8790/mods').then(r => r.json()).then(r => !r.mods.some(m => m.id === 'mod_do_joao'))));
  console.log(errs.length ? 'ERROS: ' + errs.join(' | ') : 'sem erros', falhas.length ? '— FALHAS: ' + falhas.join(', ') : '— tudo certo');
  await b.close(); process.exit(falhas.length || errs.length ? 1 : 0);
})();
