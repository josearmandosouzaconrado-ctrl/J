// Teste: domínios das casas nobres, mansões (exterior e interior), soldados das casas e demolir casas.
//   node tools/testes/dominios.js [url] [pasta-das-fotos]
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 960, height: 540 }, deviceScaleFactor: 2 }); const e = []; p.on('pageerror', x => e.push(x.message + ' @ ' + (x.stack || '').split('\n')[1]));
  const OUT = process.argv[3]; const falhas = []; const chk = (n, c, i) => { console.log(c ? '✔' : '✘', n, i === undefined ? '' : i); if (!c) falhas.push(n); };
  await p.addInitScript(() => localStorage.setItem('eldoria_lang', 'pt'));
  await p.goto(process.argv[2] || 'http://localhost:8765/index.html'); await p.waitForTimeout(2500);
  await p.evaluate(() => Game.newGame({ name: 'Aurora', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'f' }, seed: 777 }));
  await p.waitForTimeout(4000); await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); Game.player.invuln = 1e9; Game.godMode = true; Game.time = 11 * 60; });
  const g = await p.evaluate(() => { const W = Game.world; const ks = new Set(W.mansoes.map(f => f.dominio.k)); return { mans: W.mansoes.length, reinos: ks.size, dom: W.settlements.filter(s => s.dominio).length, coroa: W.settlements.filter(s => s.coroa).length }; });
  chk('domínios e mansões gerados', g.mans > 30 && g.dom > 50, `${g.mans} mansões em ${g.reinos} reinos; ${g.dom} cidades em domínios nobres, ${g.coroa} da Coroa`);
  // mansões diferentes entre si
  const dif = await p.evaluate(() => { const set = new Set(Game.world.mansoes.map(f => { const s = f.buildings[0].spec; return [s.wall, s.roof, s.alas, s.torres, s.telhado, s.material, s.c1, s.jardim].join('|'); })); return set.size + ' de ' + Game.world.mansoes.length; });
  chk('cada mansão é diferente', +dif.split(' ')[0] === +dif.split(' ').pop(), dif);
  // ir até uma mansão de Valdoria
  const m = await p.evaluate(() => { const f = Game.world.mansoes.find(f => f.dominio.k === 'valdoria') || Game.world.mansoes[0]; const P = Game.player; P.x = (f.mid.x) * 16 + 8; P.y = (f.y0 + f.h + 3) * 16; Game.findFree(P); return f.id; });
  await p.waitForTimeout(3500);
  const ext = await p.evaluate(id => { const f = Game.world.mansoes.find(x => x.id === id), b = f.buildings[0]; return { nome: b.name, dono: b.owner && b.owner.name, guardas: (f.guardas || []).map(a => a.name), toast: [...document.querySelectorAll('#toasts *')].map(x => x.textContent).join(' | ') }; }, m);
  chk('mansão com nome, dono e guardas no portão', /Mansão da Casa/.test(ext.nome) && ext.guardas.length === 2, `${ext.nome} • ${ext.dono} • ${ext.guardas.join(', ')}`);
  if (OUT) { await p.evaluate(() => { const P = Game.player; P.y -= 16 * 4; }); await p.waitForTimeout(1500); await p.screenshot({ path: OUT + '/mansao1.png' }); }
  // outras duas mansões para comparar
  for (let j = 1; j <= 3 && OUT; j++) {
    await p.evaluate(j => { const L = Game.world.mansoes; const f = L[(j * 7) % L.length]; const P = Game.player; P.x = f.mid.x * 16 + 8; P.y = (f.y0 + f.h - 3) * 16; Game.findFree(P); }, j);
    await p.waitForTimeout(3500); await p.screenshot({ path: OUT + '/mansao' + (j + 1) + '.png' });
  }
  // entrar
  const dentro = await p.evaluate(id => { const f = Game.world.mansoes.find(x => x.id === id), b = f.buildings[0]; Game.enterInterior(b); const L = Game.level; const dono = Game.actors.find(a => a.role === 'owner'); const gu = Game.actors.filter(a => a instanceof Monster && /Guarda da/.test(a.name)); return { int: L.b === b, dono: dono && dono.name, guardas: gu.length, nomeG: gu[0] && gu[0].name }; }, m);
  chk('interior da mansão com o nobre e guardas da casa', dentro.int && dentro.dono && dentro.guardas >= 3, `${dentro.dono}; ${dentro.guardas} × ${dentro.nomeG}`);
  await p.waitForTimeout(1200);
  await p.evaluate(() => { const a = Game.actors.find(a => a.role === 'owner'); const P = Game.player; P.x = a.x; P.y = a.y + 24; UI.talkNPC(a); }); await p.waitForTimeout(500);
  const fala = await p.evaluate(() => document.querySelector('.dlg-text') && document.querySelector('.dlg-text').innerText);
  chk('conversa com o chefe da casa', /Governamos estas terras/.test(fala || ''), (fala || '').slice(0, 120));
  if (OUT) await p.screenshot({ path: OUT + '/mansao_dentro.png' });
  await p.evaluate(() => { UI.close(); Game.exitDungeon(); }); await p.waitForTimeout(1500);
  // soldados: uniformes por reino e tropas das casas
  const sold = await p.evaluate(() => { const r = {}; let casas = 0, n = 0; const ex = [];
    for (const K of War.kingdoms().filter(K => K.id !== 'jogador').slice(0, 8)) { const L = []; for (let v = 0; v < 8; v++) { const m = War.makeSoldier(K.id, 'soldado', 0, 0, new RNG(v * 13 + 1)); n++; if (m.look.casa !== undefined) { casas++; if (ex.length < 3) ex.push(m.name); } L.push(m.look.helmStyle + '/' + m.look.tabard + '/' + m.look.tabardSign); } r[K.id] = new Set(L).size; }
    return { r, casas, n, ex }; });
  chk('tropas das casas nobres nos exércitos', sold.casas > 0 && sold.casas < sold.n, `${sold.casas} de ${sold.n} soldados são de casas nobres (${sold.ex.join('; ')})`);
  if (OUT) {   // uma fila de soldados de vários reinos e casas, para ver as armaduras
    await p.evaluate(() => { const P = Game.player, L = War.kingdoms().filter(K => K.id !== 'jogador' && !KSTYLE[K.id].musket).slice(0, 7);
      Game.actors = Game.actors.filter(a => a.team !== 'war');
      L.forEach((K, j) => { for (let v = 0; v < 4; v++) { const m = War.makeSoldier(K.id, v === 3 ? 'cavaleiro' : 'soldado', P.x - 150 + j * 44 + (v % 2) * 18, P.y - 70 + Math.floor(v / 2) * 40, new RNG(j * 100 + v * 3 + (v === 1 ? 7 : 0))); m.ai = 'idle'; m.spd = 0; m.team = 'npc'; m.dmg = 0; Game.actors.push(m); } }); });
    await p.waitForTimeout(800); await p.screenshot({ path: OUT + '/soldados.png' });
    await p.evaluate(() => { Game.actors = Game.actors.filter(a => a.team !== 'npc' || !a.kind); });
  }
  // demolir: constrói uma casa e manda derrubar
  const dem = await p.evaluate(() => { const P = Game.player; P.gold = 50000; for (const [id, q] of Object.entries(HOME_TIERS.cabana.mats)) P.addItem(Items.make(id, q)); 
    let h = null; for (let t = 0; t < 40 && !h; t++) { P.x += 16 * 9; const pos = Game.canBuildHere('cabana'); if (typeof pos !== 'string') h = Game.startHome('cabana', 'hire', false); }
    if (!h) return { erro: 'não achou lugar' }; Game.finishHome(h); UI.close();
    const html = UI.familyTab(UI.reg()); return { id: h.id, nome: h.name, secao: /Demolir/.test(html) && /Mandar demolir/.test(html) }; });
  chk('aba Família mostra a opção de demolir', dem.secao, dem.nome || dem.erro);
  const dem2 = await p.evaluate(id => new Promise(ok => { const h = Game.world.homes.find(x => x.id === id); const it = Demolir.minhas().find(x => x.h === h); Demolir.pedir(it); const bt = [...document.querySelectorAll('button')].find(x => /Contratar os trabalhadores/.test(x.textContent)); bt.click();
    setTimeout(() => { const gente = [...Demolir.gente.values()].flat().length; Game.time += 6 * 60; setTimeout(() => ok({ gente, existe: Game.world.homes.some(x => x.id === id), casas: Game.player.houses.includes(id), salva: Game.mods.homes.some(x => x.id === id) }), 2500); }, 2500); }), dem.id);
  chk('trabalhadores aparecem e a casa é demolida', dem2.gente === 3 && !dem2.existe && !dem2.casas && !dem2.salva, JSON.stringify(dem2));
  console.log(e.length ? 'ERROS: ' + e.join(' | ') : 'sem erros', falhas.length ? '— FALHAS: ' + falhas.join(', ') : '— tudo certo');
  await b.close(); process.exit(falhas.length || e.length ? 1 : 0); })();
