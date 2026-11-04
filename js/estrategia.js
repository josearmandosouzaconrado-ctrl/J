'use strict';
// =====================================================================
//  ESTRATÉGIA DOS REINOS: exércitos que escolhem bem o alvo, defendem as
//  próprias cidades, interceptam invasores, fogem de inimigos muito maiores,
//  se juntam, e reinos que aproveitam a fraqueza dos vizinhos e pedem paz
//  quando estão perdendo. Na batalha, o lado que perde a coragem foge.
//  E em guerra a viagem rápida só leva para as suas próprias cidades.
// =====================================================================
const Estrategia = {
  // ---------- viagem rápida em tempo de guerra ----------
  emGuerra() {
    const P = Game.player; if (!P) return false;
    const R = P.reino;
    if (R && R.status === 'guerra') return true;                                   // guerra de independência
    if (R && Reino.ativo() && War.warOf('jogador').length) return true;            // o seu reino em guerra
    if (P.army && War.K[P.army.k] && War.warOf(P.army.k).length) return true;      // soldado de um reino em guerra
    return false;
  },
  minha(s) {
    const P = Game.player, dono = War.ownerOf(s);
    if (s.playerVila || dono === 'jogador') return true;
    if (P.army && dono === P.army.k) return true;                                  // quem serve num exército vai para as cidades do seu reino
    return false;
  },
  bloqueado(s) { return this.emGuerra() && !this.minha(s); },

  // ---------- o valor de cada alvo ----------
  alvo(a) {
    const S = War.st();
    let best = null, bs = -Infinity;
    for (const s of Game.world.settlements) {
      if (War.ownerOf(s) !== a.foe) continue;
      const d = dist(a.x, a.y, s.mid.x, s.mid.y), g = War.garrison(s), forca = a.n / Math.max(1, g);
      if (forca < 0.85) continue;                                                   // forte demais para este exército
      const valor = s.type === 'capital' ? (forca >= 1.3 ? 3.2 : 0.4) : s.type === 'town' ? 2 : 1;
      let sc = valor * 100 - d * 1.1 + Math.min(1.5, forca - 1) * 60;
      if (s.region.id === a.k) sc += 130;                                           // retomar uma cidade que era nossa
      sc -= S.armies.filter(o => o !== a && o.k === a.k && o.target === s.id).length * 45;   // outro exército já vai para lá
      if (S.armies.some(o => o.k === a.foe && o.state !== 'battle' && dist(o.x, o.y, s.mid.x, s.mid.y) < 25 && o.n > a.n * 0.6)) sc -= 90;   // defendida por um exército
      if (sc > bs) { bs = sc; best = s; }
    }
    return best;
  },
  // ---------- a cada hora, antes do movimento normal ----------
  hora() {
    const S = War.st(), livre = a => a.k !== 'jogador' && !a.cidade && !a.squad && (a.state === 'march' || a.state === 'camp');
    // 1) juntar dois exércitos do mesmo reino que estão perto
    for (const a of S.armies) for (const b of S.armies) {
      if (a === b || a.k !== b.k || a.foe !== b.foe || a.foe === 'jogador' || !livre(a) || !livre(b) || a.n < b.n || a.n + b.n > 140) continue;
      if (dist(a.x, a.y, b.x, b.y) < 14) { a.n += b.n; a.n0 = Math.max(a.n0, a.n); b._fundido = true; }
    }
    if (S.armies.some(a => a._fundido)) S.armies = S.armies.filter(a => !a._fundido);
    // 2) defender as cidades ameaçadas: interceptar o invasor ou reforçar a guarnição
    for (const e of S.armies) {
      if (e.state === 'battle' || !e.target) continue;
      const s = War.settlement(e.target); if (!s) continue;
      const dono = War.ownerOf(s); if (!dono || dono === 'jogador' || dono === e.k || !War.K[dono]) continue;
      if (dist(e.x, e.y, s.mid.x, s.mid.y) > 70) continue;
      const nossos = S.armies.filter(a => a.k === dono && a.foe === e.k && livre(a) && !a._int && !a.defende).sort((x, y) => dist(x.x, x.y, s.mid.x, s.mid.y) - dist(y.x, y.y, s.mid.x, s.mid.y));
      const a = nossos[0]; if (!a || dist(a.x, a.y, s.mid.x, s.mid.y) > 150) continue;
      if (a.n >= e.n * 0.75) { a._int = e.id; War.news(`🛡 ${War.K[dono].short} marcha para interceptar o exército de ${War.K[e.k].short} antes que chegue a ${s.name}.`, false, [dono, e.k]); }
      else { a.defende = s.id; War.news(`🏰 ${War.K[dono].short} recolhe o exército para dentro de ${s.name}: a cidade vai resistir ao cerco.`, false, [dono, e.k]); }
    }
    // 3) fugir de um inimigo muito maior
    for (const a of S.armies) {
      if (!livre(a) || a._int || a.defende || a.state === 'camp') continue;
      const e = S.armies.find(o => o.k === a.foe && o.foe === a.k && o.state !== 'battle' && dist(o.x, o.y, a.x, a.y) < 30);
      if (e && a.n < e.n * 0.55) War.retreat(a);
    }
    // 4) mover quem intercepta ou defende (o movimento normal não mexe neles)
    for (const a of S.armies) {
      if (a._int) {
        const e = War.army(a._int);
        if (!e || e.state === 'battle' || e.k !== a.foe || a.state === 'battle') { a._int = null; continue; }
        const d = dist(a.x, a.y, e.x, e.y); if (d > 1) { const v = Math.min(d, 11); a.x += (e.x - a.x) / d * v; a.y += (e.y - a.y) / d * v; }
        a.state = 'march'; a._pausa = true;
      } else if (a.defende) {
        const s = War.settlement(a.defende), ameaca = s && S.armies.some(e => e.target === a.defende && e.k !== War.ownerOf(s) && dist(e.x, e.y, s.mid.x, s.mid.y) < 80);
        if (!s || War.ownerOf(s) !== a.k || !ameaca) { a.defende = null; continue; }
        const d = dist(a.x, a.y, s.mid.x, s.mid.y); if (d > 4) { const v = Math.min(d - 3, 10); a.x += (s.mid.x - a.x) / d * v; a.y += (s.mid.y - a.y) / d * v; }
        a.n = Math.min(a.n0, a.n + 1); a._pausa = true;
      }
    }
    for (const a of S.armies) if (a._pausa) { a._estado = a.state; a.state = 'follow'; }   // o movimento normal pula estes
  },
  depoisHora() { for (const a of War.st().armies) if (a._pausa) { if (a.state === 'follow') a.state = a._estado || 'march'; a._pausa = false; } },
  // ---------- uma vez por dia: oportunismo, paz e cansaço ----------
  dia() {
    const S = War.st(), rng = new RNG(Game.world.seed + Game.day * 311);
    const ks = War.kingdoms().filter(k => k.id !== 'jogador' && !k.extinto);
    const poder = k => Vassalagem.poder(k);
    // atacar um vizinho que já está enfraquecido por outra guerra
    for (const K of ks) {
      if (War.warOf(K.id).length >= 1 || !rng.chance(0.06)) continue;
      for (const o of K.nb) {
        const O = War.K[o]; if (!O || O.extinto || o === 'jogador' || War.atWar(K.id, o)) continue;
        if (!War.warOf(o).length || War.rel(K.id, o) > -15 || poder(o) > poder(K.id) * 0.7) continue;
        War.declare(K.id, o);
        War.news(`🦅 ${K.short} aproveitou que ${O.short} está enfraquecido pela guerra e o atacou!`, true, [K.id, o]);
        break;
      }
    }
    // quem está perdendo feio pede paz; guerras longas sem vencedor cansam os dois lados
    for (const w of S.wars.slice()) {
      if (w.a === 'jogador' || w.b === 'jogador') continue;
      const ga = (w.won[w.a] || []).length, gb = (w.won[w.b] || []).length, dias = Game.day - w.since;
      const perdedor = gb - ga >= 2 ? w.a : ga - gb >= 2 ? w.b : null;
      if (perdedor) {
        const ganhador = perdedor === w.a ? w.b : w.a;
        if (poder(perdedor) < poder(ganhador) * 0.7 && rng.chance(0.35)) { War.peace(w); War.news(`🏳 ${War.K[perdedor].short} pediu paz a ${War.K[ganhador].short}: as cidades tomadas ficam com o vencedor.`, true, [perdedor, ganhador]); continue; }
      }
      if (dias > 12 && Math.abs(ga - gb) <= 1 && rng.chance(0.12)) { War.peace(w); War.news(`🕊 Cansados de ${dias} dias de guerra, ${War.K[w.a].short} e ${War.K[w.b].short} assinaram uma trégua.`, true, [w.a, w.b]); }
    }
  },
  // ---------- na batalha: o lado que perdeu a coragem foge ----------
  moral(m, bt) {
    if (!bt._t || Game.t - bt._t > 0.5) {
      bt._t = Game.t; const c = {};
      for (const o of Game.actors) if (o.battleId === bt.id && !o.dead && !o.fuga) c[o.armyId] = (c[o.armyId] || 0) + 1;
      bt._vivos = c; bt._max = bt._max || {};
      for (const k in c) bt._max[k] = Math.max(bt._max[k] || 0, c[k]);
    }
    const meus = bt._vivos[m.armyId] || 0, outro = m.armyId === bt.a ? bt.b : bt.a, deles = bt._vivos[outro] || 0, max = bt._max[m.armyId] || 1;
    return meus <= max * 0.35 && deles >= meus * 2 && max >= 4;
  }
};

// ---------------- ganchos ----------------
(function () {
  const ft0 = Game.fastTravel;
  Game.fastTravel = function (s) {
    if (Estrategia.bloqueado(s)) { this.toast('Em guerra! A viagem rápida só leva para as suas cidades.', '#ff9080'); return; }
    return ft0.call(this, s);
  };
  const p0 = War.pickTarget;
  War.pickTarget = function (a) { if (a.k === 'jogador') return p0.call(this, a); return Estrategia.alvo(a) || p0.call(this, a); };
  const g0 = War.garrison;
  War.garrison = function (s) {
    let n = g0.call(this, s); if (s.playerVila) return n;
    const dono = this.ownerOf(s); if (!dono || !this._kList) return n;
    for (const a of this.st().armies) if (a.k === dono && a.defende === s.id && dist(a.x, a.y, s.mid.x, s.mid.y) < 10) n += Math.round(a.n * 0.8);   // o exército dentro da cidade ajuda a defender
    return n;
  };
  const h0 = War.hour;
  War.hour = function () { try { Estrategia.hora(); } catch (e) { console.error('estrategia', e); } h0.call(this); Estrategia.depoisHora(); };
  const d0 = War.daily;
  War.daily = function () { d0.call(this); try { Estrategia.dia(); } catch (e) { console.error('estrategia dia', e); } };
  // o exército derrotado recua para a cidade sua mais próxima, não para a capital distante
  const r0 = War.retreat;
  War.retreat = function (a) {
    if (a.k === 'jogador') return r0.call(this, a);
    let best = null, bd = Infinity;
    for (const s of Game.world.settlements) { if (this.ownerOf(s) !== a.k) continue; const d = dist(a.x, a.y, s.mid.x, s.mid.y); if (d < bd) { bd = d; best = s; } }
    if (!best) return r0.call(this, a);
    const step = Math.min(45, Math.max(6, bd - 6));
    a.x += (best.mid.x - a.x) / (bd || 1) * step; a.y += (best.mid.y - a.y) / (bd || 1) * step;
    a.state = 'camp'; a.target = null; a._int = null;
    this.dropSquad(a);
  };
  // reinos maiores levantam exércitos maiores
  const ra0 = War.raise;
  War.raise = function (k, foe, rng, advance) {
    const S = this.st(), n0 = S.armies.length; ra0.call(this, k, foe, rng, advance);
    // contra você o tamanho continua o de antes (só a estratégia muda)
    if (S.armies.length > n0 && foe !== 'jogador') { const a = S.armies[S.armies.length - 1], cid = Game.world.settlements.filter(s => this.ownerOf(s) === k).length; a.n = a.n0 = Math.round(a.n * clamp(0.65 + cid * 0.07, 0.7, 1.6)); }
  };
  // moral na batalha ao vivo (as suas tropas não fogem: você comanda)
  const ia0 = War.ia;
  War.ia = function (m, t, dt, sf) {
    const bt = this.st().battles.find(b => b.id === m.battleId);
    if (m.fuga > 0) {
      m.fuga -= dt;
      if (bt) { const lado = m.armyId === bt.a ? 1 : -1; m.moveToward((bt.x + bt.ax * 40 * lado) * 16, (bt.y + bt.ay * 40 * lado) * 16, m.spd * 1.15 * sf, dt); }
      if (m.fuga <= 0) m.vanish();
      return true;
    }
    if (bt && m.faction !== 'jogador' && Estrategia.moral(m, bt)) { m.fuga = 4 + Math.random() * 3; m.target = null; if (Math.random() < 0.35) Game.floater(m.x, m.y - 26, 'Fujam!', '#ffd0a0'); return true; }
    return ia0.call(this, m, t, dt, sf);
  };
})();
