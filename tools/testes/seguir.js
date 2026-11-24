// Teste: o jogador segue moradores de perto nas horas em que eles trocam de atividade
// e conta quantas vezes um deles "some" (teletransporte ou ficar invisível fora de um prédio).
//   node tools/testes/seguir.js [url]
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 960, height: 540 } }); const e = []; p.on('pageerror', x => e.push(x.message));
  await p.addInitScript(() => localStorage.setItem('eldoria_lang', 'pt'));
  await p.goto(process.argv[2] || 'http://localhost:8765/index.html'); await p.waitForTimeout(2500);
  await p.evaluate(() => Game.newGame({ name: 'T', race: 'humano', cls: 'guerreiro', app: { skin: '#e0ac69', hair: '#5a3a1a', hairStyle: 0, sex: 'm' }, seed: 777 }));
  await p.waitForTimeout(4000); await p.evaluate(() => { try { Abertura.fim(true); } catch (e) { } UI.close(); Game.player.invuln = 1e9; Game.godMode = true; });
  let tot = { seguidos: 0, pulos: 0, sumiuFora: 0, entrou: 0, achouDentro: 0 }, saidas = [];
  for (const [hora, cid] of [[7.6, 0], [11.9, 1], [16.4, 2], [18.2, 3], [20.8, 4]]) {
    const r = await p.evaluate(async ([hora, cid]) => {
      const W = Game.world, P = Game.player;
      const ss = W.settlements.filter(s => (s.type === 'town' || s.type === 'capital') && !s.port && contAt(s.x, s.y) === 0);
      const s = ss[cid % ss.length]; P.x = s.mid.x * 16; P.y = (s.mid.y + 2) * 16; Game.findFree(P);
      Game.time = hora * 60;
      await new Promise(r => setTimeout(r, 3500));
      const cands = (s.npcs || []).filter(a => a.rot && !a.dead && !a.rot.dentro && a.rot.casa);
      const res = { seguidos: 0, pulos: 0, sumiuFora: 0, entrou: 0, achouDentro: 0, ex: [] };
      for (const a of cands.slice(0, 3)) { if (res.entrou) break;
        res.seguidos++;
        let lx = a.x, ly = a.y, oculto = false;
        for (let t = 0; t < 120; t++) {           // 12 s seguindo
          await new Promise(r => setTimeout(r, 100));
          if (Game.level !== W) break;
          const h = a.hidden;
          if (!h) { const d = Math.hypot(a.x - lx, a.y - ly); if (d > 40 && !oculto) { res.pulos++; if (res.ex.length < 4) res.ex.push(`${a.name} pulou ${Math.round(d)}px (${a.rot.ativ})`); } lx = a.x; ly = a.y; P.x = a.x - 24; P.y = a.y + 6; }
          if (h && !oculto) { if (a.rot.dentro) {
            res.entrou++;
            // o jogador entra atrás: o morador tem que estar lá dentro
            const b = s.buildings.concat((W.fazendas || []).flatMap(f => f.buildings)).find(b => b.door && a.rot.alvo && b.door.x === a.rot.alvo.x && b.door.y + 1 === a.rot.alvo.y);
            if (b) { Game.enterInterior(b); await new Promise(r => setTimeout(r, 1200));
              const dentro = Game.actors.find(x => x.name === a.name && x.rotVisita);
              if (dentro) { res.achouDentro++; if (res.ex.length < 6) res.ex.push(`${a.name} encontrado em ${b.name} (${dentro.rot.ativ}): "${Rotina.fala(dentro) || ''}"`); }
              else res.ex.push(`${a.name} NÃO estava em ${b.name}`);
              if (dentro && !res.saida) { // adianta o relógio até ele querer ir para outro lugar
                for (let k = 0; k < 40 && !dentro.saindo; k++) { Game.time += 30; await new Promise(r => setTimeout(r, 1100)); }
                const t0 = performance.now(); while (Game.actors.includes(dentro) && performance.now() - t0 < 14000) await new Promise(r => setTimeout(r, 200));
                res.saida = dentro.saindo ? (Game.actors.includes(dentro) ? 'não saiu' : `saiu pela porta para ${dentro.rot.ativ}`) : 'não quis sair';
              }
              Game.exitDungeon(); await new Promise(r => setTimeout(r, 2500));
              // na rua de novo: quem saiu pela porta tem que estar perto da porta, andando
              if (dentro && dentro.saindo) { const de = (s.npcs || []).find(x => x.name === a.name);
                res.rua = de ? `${a.name} na rua a ${Math.round(dist(de.x, de.y, b.door.x * 16 + 8, (b.door.y + 1) * 16) / 16)} passos da porta, ${de.hidden ? 'invisível' : 'visível'} (${de.rot && de.rot.ativ})` : `${a.name} não existe mais na rua`; }
              break; }
          } else { res.sumiuFora++; res.ex.push(`${a.name} sumiu fora (${a.rot.ativ})`); } }
          oculto = h;
          if (h || Game.level !== W) break;
        }
      }
      return res;
    }, [hora, cid]);
    console.log(hora + 'h', JSON.stringify(r));
    for (const k in tot) tot[k] += r[k]; if (r.saida) saidas.push(r.saida); if (r.rua) saidas.push(r.rua);
  }
  console.log('TOTAL', JSON.stringify(tot), e.length ? e : 'sem erros');
  await b.close(); console.log('saídas:', saidas.join(' | '));
  process.exit(tot.pulos || tot.sumiuFora || tot.achouDentro < tot.entrou || e.length || saidas.some(x => /não saiu|não quis|não existe|invisível/.test(x) || (/passos da porta/.test(x) && +x.match(/a (\d+) passos/)[1] > 4)) ? 1 : 0); })();
