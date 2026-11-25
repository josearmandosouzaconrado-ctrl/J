// Teste do casal no multiplayer: dois jogadores (homem e mulher) na mesma sala namoram, casam e têm um filho.
// Precisa do servidor: node rede/servidor.js (porta 8790).   node tools/testes/casal_mp.js [url] [pasta-das-fotos]
const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:8765/index.html', OUT = process.argv[3];
(async () => {
  const b = await chromium.launch(), e = [], falhas = [];
  const chk = (n, c, i) => { console.log(c ? '✔' : '✘', n, i === undefined ? '' : i); if (!c) falhas.push(n); };
  const jogador = async (nome, sex) => {
    const ctx = await b.newContext({ viewport: { width: 960, height: 540 } }), p = await ctx.newPage();
    p.on('pageerror', x => e.push(nome + ': ' + x.message));
    await p.addInitScript(() => { localStorage.setItem('eldoria_lang', 'pt'); localStorage.setItem('eldoria_mp_url', 'ws://localhost:8790/ws'); });
    await p.goto(URL); await p.waitForTimeout(2500);
    await p.evaluate(([nome, sex]) => Game.newGame({ name: nome, race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: sex === 'f' ? 1 : 0, sex }, seed: 777777 }), [nome, sex]);
    await p.waitForTimeout(4000);
    await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); Game.player.invuln = 1e9; Game.player.gold = 1000; const s = Game.world.settlements.find(s => s.type === 'capital'); Game.player.x = s.mid.x * 16; Game.player.y = (s.mid.y + 3) * 16; Game.findFree(Game.player); });
    await p.evaluate(() => Rede.conectar(Rede.url(), () => { }));
    await p.waitForFunction(() => Rede.pendente || Rede.on, null, { timeout: 15000 });
    await p.evaluate(() => Rede.entrou());
    await p.waitForTimeout(1500);
    return p;
  };
  const ana = await jogador('Ana', 'f'), beto = await jogador('Beto', 'm'), caio = await jogador('Caio', 'm');
  await p_wait();
  async function p_wait() { await ana.waitForTimeout(3000); }
  const idDe = async (p, nome) => p.evaluate(n => { const o = [...Rede.outros.values()].find(o => o.nome === n); return o && o.id; }, nome);
  const clicar = async (p, re) => p.evaluate(src => { const r = new RegExp(src); const bt = [...document.querySelectorAll('.dlg-opts button, button')].find(x => r.test(x.textContent)); if (bt) bt.click(); return !!bt; }, re.source);
  const anaId = await idDe(beto, 'Ana'), betoId = await idDe(ana, 'Beto');
  chk('os três estão na mesma sala', !!anaId && !!betoId, `${anaId} / ${betoId}`);
  // Caio (homem) pede Beto (homem) em namoro: recusado sozinho
  const caioBeto = await idDe(caio, 'Beto');
  await caio.evaluate(id => { const o = Rede.outros.get(id); Rede.menu(o); [...document.querySelectorAll('.dlg-opts button')].find(x => /Pedir em namoro/.test(x.textContent)).click(); }, caioBeto);
  await caio.waitForTimeout(1500);
  const msgCaio = await caio.evaluate(() => [...document.querySelectorAll('#toasts *')].map(x => x.textContent).join(' | '));
  chk('dois homens não namoram (recusa automática)', /homem e uma mulher/.test(msgCaio), msgCaio.slice(-80));
  // Beto pede Ana em namoro
  await beto.evaluate(id => { const o = Rede.outros.get(id); Rede.menu(o); }, anaId); await beto.waitForTimeout(300);
  if (OUT) await beto.screenshot({ path: OUT + '/mp_menu.png' });
  await clicar(beto, /Pedir em namoro/); await ana.waitForTimeout(1200);
  if (OUT) await ana.screenshot({ path: OUT + '/mp_pedido.png' });
  chk('Ana recebe o pedido', await clicar(ana, /Aceitar/)); await beto.waitForTimeout(1500);
  const namoro = [await ana.evaluate(() => Game.player.casalMP && Game.player.casalMP.fase), await beto.evaluate(() => Game.player.casalMP && Game.player.casalMP.fase)];
  chk('os dois estão namorando', namoro[0] === 'namoro' && namoro[1] === 'namoro', namoro.join(','));
  // casamento
  await beto.evaluate(id => { Rede.menu(Rede.outros.get(id)); }, anaId); await beto.waitForTimeout(200); await clicar(beto, /Pedir em casamento/); await ana.waitForTimeout(1200);
  chk('pedido de casamento chega', await clicar(ana, /Sim, eu aceito/)); await beto.waitForTimeout(1500);
  const cas = [await ana.evaluate(() => Game.player.casalMP.fase), await beto.evaluate(() => [Game.player.casalMP.fase, Game.player.gold])];
  chk('casados nos dois jogos (aliança paga)', cas[0] === 'casados' && cas[1][0] === 'casados' && cas[1][1] === 800, JSON.stringify(cas));
  // filho: os dois perto um do outro
  await ana.evaluate(() => { Game.player.x += 0; }); await ana.waitForTimeout(1500);
  await beto.evaluate(id => { const o = Rede.outros.get(id); const P = Game.player; P.x = o.x + 20; P.y = o.y; }, anaId); await beto.waitForTimeout(1500);
  await beto.evaluate(id => { Rede.menu(Rede.outros.get(id)); }, anaId); await beto.waitForTimeout(200); await clicar(beto, /Vamos ter um filho/); await ana.waitForTimeout(1200);
  chk('pedido de filho chega', await clicar(ana, /Vamos!/)); await beto.waitForTimeout(1500);
  const gr = [await ana.evaluate(() => !!Game.player.casalMP.gravidez), await beto.evaluate(() => !!Game.player.casalMP.gravidez)];
  chk('bebê a caminho nos dois jogos', gr[0] && gr[1]);
  for (const p of [ana, beto]) await p.evaluate(() => { for (let i = 0; i < 3; i++) { Game.day++; Game.mods.day = Game.day; Game.dayTick(); } UI.close(); });
  const k = [await ana.evaluate(() => Game.player.children.filter(c => c.mp).map(c => c.id + ':' + c.name)), await beto.evaluate(() => Game.player.children.filter(c => c.mp).map(c => c.id + ':' + c.name))];
  chk('o mesmo bebê nasceu nos dois jogos', k[0].length === 1 && k[0][0] === k[1][0], k[0].join(','));
  await ana.evaluate(() => UI.openMenu('family')); await ana.waitForTimeout(400);
  if (OUT) await ana.screenshot({ path: OUT + '/mp_familia.png' });
  const sv = await ana.evaluate(() => { const o = Game.player.toJSON(); return !!(o.casalMP && o.casalMP.fase === 'casados'); });
  chk('o casamento fica salvo', sv);
  // divórcio
  await ana.evaluate(() => UI.close());
  await ana.evaluate(id => { Rede.menu(Rede.outros.get(id)); }, betoId); await ana.waitForTimeout(200); await clicar(ana, /divórcio/); await ana.waitForTimeout(200); await clicar(ana, /^Sim|Confirmar|OK|Ok/); await beto.waitForTimeout(1500);
  const fim = [await ana.evaluate(() => Game.player.casalMP), await beto.evaluate(() => Game.player.casalMP), await beto.evaluate(() => Game.player.children.length)];
  chk('divórcio nos dois jogos (os filhos ficam)', !fim[0] && !fim[1] && fim[2] >= 1, JSON.stringify(fim));
  console.log(e.length ? 'ERROS: ' + e.join(' | ') : 'sem erros', falhas.length ? '— FALHAS: ' + falhas.join(', ') : '— tudo certo');
  await b.close(); process.exit(falhas.length || e.length ? 1 : 0);
})();
