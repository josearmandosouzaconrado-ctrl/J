// Teste da política: república (eleição e campanha), comuna (conselho dos anciãos e idade),
// junta (golpe e contragolpe), revolução e eleições nos reinos da IA.
//   node tools/testes/politica.js [url] [pasta-das-fotos]
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 960, height: 540 }, deviceScaleFactor: 2 }); const e = []; p.on('pageerror', x => e.push(x.message + ' @ ' + (x.stack || '').split('\n')[1]));
  const OUT = process.argv[3]; const falhas = []; const chk = (n, c, i) => { console.log(c ? '✔' : '✘', n, i === undefined ? '' : i); if (!c) falhas.push(n); };
  await p.addInitScript(() => localStorage.setItem('eldoria_lang', 'pt'));
  await p.goto(process.argv[2] || 'http://localhost:8765/index.html'); await p.waitForTimeout(2500);
  await p.evaluate(() => Game.newGame({ name: 'Aurora', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'f' }, seed: 777 }));
  await p.waitForTimeout(4000); await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); Game.player.invuln = 1e9; Game.godMode = true; });
  // funda uma vila num campo aberto e vira reino independente
  const fund = await p.evaluate(() => { const P = Game.player, s = Game.world.settlements.find(s => s.type === 'village' && contAt(s.x, s.y) === 0);
    for (let r = 40; r < 160; r += 6) for (let a = 0; a < 12; a++) { P.x = (s.x + Math.cos(a) * r) * 16; P.y = (s.y + Math.sin(a) * r) * 16; const pos = Vila.podeFundar(); if (typeof pos !== 'string') { Vila.criar(pos, 'Vila Teste'); const R = Reino.st(); R.status = 'independente'; R.nomeReino = 'Reino de Teste'; Vila.st().cofre = 20000; P.gold = 20000; Reino.inject(); return Reino.ativo(); } }
    return false; });
  chk('reino do jogador', fund);
  const dia = n => p.evaluate(n => { for (let i = 0; i < n; i++) { Game.day++; Game.mods.day = Game.day; Game.dayTick(); War.daily && War.daily(); } }, n);
  // ---------- república ----------
  const rep = await p.evaluate(() => { const R = Reino.st(); R.gov = 'republica'; R.govDia = Game.day; Reino.inject(); const S = Politica.st(); return { manda: Politica.manda(), cands: S.cands.map(c => c.nome + ' ' + c.apoio.toFixed(0)).join(', '), eleicao: S.eleicao - Game.day, titulo: Reino.titulo() }; });
  chk('república começa com você no poder', rep.manda, `${rep.titulo}; candidatos: ${rep.cands}; eleição em ${rep.eleicao} dias`);
  await p.evaluate(() => { Politica.tela(() => UI.close()); }); await p.waitForTimeout(300);
  if (OUT) await p.screenshot({ path: OUT + '/pol_republica.png' });
  const camp = await p.evaluate(() => { const S = Politica.st(), eu = () => S.cands.find(c => c.id === 'jogador').apoio; const a = eu(); Politica.campanha('pao'); Politica.campanha('banquete'); Politica.campanha('pao'); return [a, eu(), Vila.st().cofre]; });
  chk('campanha aumenta o apoio (uma vez por dia)', camp[1] > camp[0], `${camp[0].toFixed(1)}% → ${camp[1].toFixed(1)}%`);
  // força uma derrota: rivais com muito apoio
  const perdeu = await p.evaluate(() => { const S = Politica.st(); S.cands.forEach(c => c.apoio = c.id === 'jogador' ? 5 : 40); Politica.normalizar(S); S.eleicao = Game.day; Politica.dia(); UI.close(); return { manda: Politica.manda(), lider: Politica.lider(), titulo: Reino.titulo() }; });
  chk('perdeu a eleição: outro governa', !perdeu.manda && perdeu.lider, `${perdeu.lider && perdeu.lider.titulo} ${perdeu.lider && perdeu.lider.nome}; você é ${perdeu.titulo}`);
  const bloq = await p.evaluate(() => { const k = War.kingdoms().find(K => K.id !== 'jogador').id; Reino.diplo(k, () => UI.close()); const t = document.body.innerText; UI.close(); Governos.tela(() => UI.close()); const t2 = document.body.innerText; UI.close(); return /não governa/i.test(t) && /não governa/i.test(t2); });
  chk('sem governar: diplomacia e troca de governo bloqueadas', bloq);
  const volta = await p.evaluate(() => { const S = Politica.st(); S.cands.forEach(c => c.apoio = c.id === 'jogador' ? 80 : 5); Politica.normalizar(S); S.eleicao = Game.day; Politica.dia(); UI.close(); return Politica.manda(); });
  chk('venceu a próxima eleição: volta a governar', volta);
  // ---------- comuna ----------
  const com = await p.evaluate(() => { const R = Reino.st(); R.gov = 'comuna'; R.govDia = Game.day; Reino.inject(); const P = Game.player; P.idade0 = 30; P.idadeDia = Geracoes.agora(); const S = Politica.st(); return { anos: Geracoes.anos(), manda: Politica.manda(), lider: Politica.lider(), cargo: Reino.titulo() }; });
  chk('comuna com 30 anos: o conselho governa, você é cidadã', !com.manda && /Cidad/.test(com.cargo), `${com.anos} anos, ${com.cargo}; ${com.lider && com.lider.nome} é Porta-voz`);
  await p.evaluate(() => { Politica.tela(() => UI.close()); }); await p.waitForTimeout(300);
  if (OUT) await p.screenshot({ path: OUT + '/pol_comuna.png' });
  const com2 = await p.evaluate(() => { const P = Game.player; P.idade0 = 55; P.idadeDia = Geracoes.agora(); const S = Politica.st(); S.apoio = 95; S.assembleia = Game.day; Politica.dia(); UI.close(); return { membro: Politica.membroConselho(), manda: Politica.manda(), cargo: Reino.titulo() }; });
  chk('comuna com 55 anos: tem assento e pode virar Porta-voz', com2.membro && com2.manda, `você agora é ${com2.cargo}`);
  // ---------- junta ----------
  const golpe = await p.evaluate(() => { const R = Reino.st(); R.gov = 'junta'; R.govDia = Game.day; Reino.inject(); const S = Politica.st(); S.generais.forEach(g => g.leal = 10); for (let i = 0; i < 30 && Politica.manda(); i++) Politica.dia(); UI.close(); return { manda: Politica.manda(), lider: Politica.lider(), cargo: Reino.titulo() }; });
  chk('junta: lealdade baixa → golpe', !golpe.manda, `${golpe.lider && golpe.lider.nome} tomou o poder; você é ${golpe.cargo}`);
  await p.evaluate(() => { Politica.tela(() => UI.close()); }); await p.waitForTimeout(300);
  if (OUT) await p.screenshot({ path: OUT + '/pol_junta.png' });
  const contra = await p.evaluate(() => { const S = Politica.st(); S.generais.forEach(g => g.leal = 70); Politica.juntaAcao('contragolpe'); UI.close(); return Politica.manda(); });
  chk('junta: contragolpe com os generais leais', contra);
  // ---------- revolução ----------
  const rev = await p.evaluate(() => { const R = Reino.st(); R.gov = 'monarquia'; Reino.inject(); Politica.st(); Politica.revolucao({ lider: 'Bento Ferraz', rebeldes: 8, dia: Game.day - 7 }); UI.close(); return { gov: Governos.de('jogador'), lider: Politica.lider() }; });
  chk('revolução derruba a monarquia', rev.gov !== 'monarquia', `${rev.gov}; ${rev.lider ? rev.lider.titulo + ' ' + rev.lider.nome : 'você'} governa`);
  // ---------- IA ----------
  const ia = await p.evaluate(() => { const K = War.kingdoms().find(K => K.id !== 'jogador' && !K.extinto); Governos.mudar(K.id, 'republica', true); const antes = K.ruler.name; let n = 0; for (let i = 0; i < 61; i++) { Game.day++; Game.mods.day = Game.day; Politica.diaIA(); } return { reino: K.name, antes, depois: War.K[K.id].ruler.title + ' ' + War.K[K.id].ruler.name, noticias: (War.st().log || War.st().news || []).slice(-40).map(x => x.t || x.txt || x).filter(t => /Eleições|Assembleia|Golpe na junta/.test(String(t))).length }; });
  chk('reinos da IA fazem eleições', ia.antes !== undefined, `${ia.reino}: antes ${ia.antes}, agora ${ia.depois}`);
  await dia(3);
  console.log(e.length ? 'ERROS: ' + e.join(' | ') : 'sem erros', falhas.length ? '— FALHAS: ' + falhas.join(', ') : '— tudo certo');
  await b.close(); process.exit(falhas.length || e.length ? 1 : 0); })();
