'use strict';
// ===================== CENA DE ABERTURA: O REINO TIRANO =====================
// Logo depois que o prefeito acorda o jogador, guardas do reino arrancam uma família de casa,
// acusam os pais de tramar uma rebelião e os executam. A filha pequena é levada para trabalhar
// nas minas do rei. Desde então o reino natal do jogador é conhecido como um reino tirano.
const FALAS_TIRANO = ['Abaixe a cabeça, plebeu. Aqui quem fala é o Rei.', 'Mais uma reclamação sobre impostos e você vai fazer companhia aos rebeldes nas minas.', 'O Rei vê tudo. Lembre-se disso.', 'Circulando! Nada de grupinhos na praça.', 'Quem esconde traidores vira traidor.'];
const Abertura = {
  ativa: null, corpos: [],
  reino(vill) { const k = War.ownerOf(vill) || vill.region.id; return { k, nome: War.K && War.K[k] ? War.K[k].name : vill.region.name }; },
  iniciar(vill, prefeito) {
    const G = Game, P = G.player;
    try {
      const casas = vill.buildings.filter(b => b.door && !b.decorative && /house/.test(b.kind)), lista = casas.length ? casas : vill.buildings.filter(b => b.door && !b.decorative);
      if (!lista.length) return;
      const casa = lista.sort((a, b) => dist(a.door.x * 16, a.door.y * 16, P.x, P.y) - dist(b.door.x * 16, b.door.y * 16, P.x, P.y))[0];
      if (dist(casa.door.x * 16, casa.door.y * 16, P.x, P.y) > 520) return;
      const rng = new RNG(G.world.seed + 911), race = CULTURES[vill.region.culture].race, R = this.reino(vill);
      const porta = { x: casa.door.x * 16 + 8, y: casa.door.y * 16 + 20 };
      const g = vill.gates.slice().sort((a, b) => dist(a.x, a.y, casa.door.x, casa.door.y) - dist(b.x, b.y, casa.door.x, casa.door.y))[0];
      const ent = g ? { x: g.x * 16 + 8, y: g.y * 16 + 8 } : { x: porta.x + 160, y: porta.y + 60 };
      // guardas do reino (fardados com as cores da coroa) que não atacam ninguém durante a cena
      const guardas = [0, 1, 2].map(i => {
        let look; try { look = War.look(R.k, i === 0 ? 'elite' : 'soldado', new RNG(rng.int(1, 1e6))); } catch (e) { look = null; }
        if (!look) look = Object.assign({}, ENEMIES.guarda.look, { body: shade(vill.region.color, -0.25), shield: vill.region.color });
        const m = new Monster('guarda', ent.x + (i - 1) * 14, ent.y + i * 6, Math.max(10, P.level + 5), { look, name: i === 0 ? 'Capitão da Guarda Real' : 'Soldado do Rei' });
        m.team = 'npc'; m.cena = true; m.update = (dt) => { if (m.swingT > 0) m.swingT -= dt; };
        G.findFree(m); G.actors.push(m); return m;
      });
      const pai = this.morador(vill, race, 'm', rng), mae = this.morador(vill, race, 'f', rng), filha = this.morador(vill, race, 'f', rng, true);
      const nomeFilha = filha.name.split(' ')[0];
      if (prefeito) { prefeito.update = () => { prefeito.moving = false; }; }
      this.ativa = { t: 0, passo: 0, vill, casa, porta, ent, guardas, pai, mae, filha, nomeFilha, R, prefeito, falas: [], flash: 0 };
      P.sleeping = false;
    } catch (e) { console.error('abertura', e); this.ativa = null; }
  },
  morador(vill, race, sex, rng, crianca) {
    const a = new NPC({ role: 'resident', x: 0, y: 0, race }, vill, rng);
    a.sex = sex; a.name = rng.pick(NAMES[race][sex]) + ' ' + rng.pick(NAMES[race].s);
    a.look = npcLook(race, sex, rng, crianca ? 'kid' : 'citizen');
    if (crianca) { a.look = Object.assign({}, a.look, { size: 0.62, child: true, blush: true }); delete a.look.beard; delete a.look.cane; }
    a.S = Sprites.actor(a.look); a.h = a.S.h; a.cena = true;
    a.update = () => {};
    return a;
  },
  andar(a, x, y, dt, spd = 42) {
    const d = dist(a.x, a.y, x, y);
    if (d < 3) { a.moving = false; return true; }
    const ang = Math.atan2(y - a.y, x - a.x), st = Math.min(d, spd * dt);
    moveActor(a, Math.cos(ang) * st, Math.sin(ang) * st);
    if (a.blocked) { a.x += Math.cos(ang) * st; a.y += Math.sin(ang) * st; }
    a.moving = true; a.anim += dt; a.setDir(ang);
    return false;
  },
  fala(a, txt, dur) { const S = this.ativa; S.falas = S.falas.filter(f => f.a !== a); S.falas.push({ a, txt, t: dur }); },
  olhar(a, b) { a.moving = false; a.setDir(Math.atan2(b.y - a.y, b.x - a.x)); },
  tick(dt) {
    const S = this.ativa, G = Game, P = G.player;
    if (this.corpos.length && G.level.isWorld && this.corpos[0].vill && dist(P.x, P.y, this.corpos[0].x, this.corpos[0].y) > 1400) this.corpos = [];
    if (!S) return;
    if (!G.level.isWorld || dist(P.x, P.y, S.porta.x, S.porta.y) > 900) return this.fim(true);
    S.t += dt;
    for (const f of S.falas) f.t -= dt; S.falas = S.falas.filter(f => f.t > 0);
    if (S.flash > 0) S.flash -= dt;
    // câmera olhando a cena
    G.world.camOff = { x: clamp((S.porta.x - P.x) * 0.8, -170, 170), y: clamp((S.porta.y - 10 - P.y) * 0.8, -90, 90) };
    const [cap, g1, g2] = S.guardas, { pai, mae, filha, porta } = S;
    const alvo = [{ x: porta.x, y: porta.y + 34 }, { x: porta.x - 22, y: porta.y + 30 }, { x: porta.x + 22, y: porta.y + 30 }];
    const passo = (n, dur) => { if (S.passo === n && S.t >= dur) { S.passo++; S.t = 0; return true; } return false; };
    switch (S.passo) {
      case 0: { let ok = true; S.guardas.forEach((m, i) => { if (!this.andar(m, alvo[i].x, alvo[i].y, dt, 46)) ok = false; }); if (ok || S.t > 9) { S.guardas.forEach(m => this.olhar(m, porta)); S.passo = 1; S.t = 0; this.fala(cap, 'Abram! Por ordem do Rei!', 2.3); Sfx.play('shout'); } break; }
      case 1: if (passo(1, 2.3)) {
        Sfx.play('door');
        for (const [a, dx] of [[pai, -6], [mae, 6], [filha, 0]]) { a.x = porta.x + dx; a.y = porta.y - 4; G.actors.push(a); }
      } break;
      case 2: { this.andar(pai, porta.x - 12, porta.y + 12, dt, 30); this.andar(mae, porta.x + 12, porta.y + 12, dt, 30); this.andar(filha, porta.x, porta.y + 6, dt, 30); if (S.t > 1.2 && !S.f2) { S.f2 = 1; this.fala(pai, 'O que querem de nós?!', 2); } if (passo(2, 3.2)) { [pai, mae, filha].forEach(a => this.olhar(a, cap)); this.fala(cap, 'Vocês estão presos por tramar uma rebelião contra a Coroa!', 3); } break; }
      case 3: if (passo(3, 3)) this.fala(pai, 'Mentira! Só pedimos pão para passar o inverno!', 2.6); break;
      case 4: if (passo(4, 2.6)) this.fala(mae, 'Por piedade... temos uma filha!', 2.4); break;
      case 5: if (passo(5, 2.4)) this.fala(cap, 'O Rei não perdoa traidores.', 2.2); break;
      case 6: if (passo(6, 2.2)) {
        // os guardas atacam os pais
        this.olhar(g1, pai); this.olhar(g2, mae); g1.face = Math.atan2(pai.y - g1.y, pai.x - g1.x); g2.face = Math.atan2(mae.y - g2.y, mae.x - g2.x); g1.swingT = 0.2; g2.swingT = 0.2;
        Sfx.play('swing'); Sfx.play('hit'); G.shake = 7; S.flash = 0.5;
        for (const a of [pai, mae]) { this.corpos.push({ x: a.x, y: a.y, img: a.S.right[0], vill: S.vill }); G.actors = G.actors.filter(x => x !== a); }
        this.fala(filha, 'MAMÃE! PAPAI! NÃÃÃO!', 2.6);
      } break;
      case 7: { filha.x += Math.sin(G.t * 40) * 0.6; if (passo(7, 2.6)) this.fala(cap, `A pirralha vai quebrar pedra nas minas do Rei. Lá ela aprende a obedecer.`, 3.2); break; }
      case 8: if (passo(8, 3.2)) { this.fala(filha, 'Me solta! Socorro!', 2.5); Sfx.play('hurt'); } break;
      case 9: {
        // vão embora levando a menina
        const e = S.ent; let ok = true;
        S.guardas.forEach((m, i) => { if (!this.andar(m, e.x + (i - 1) * 12, e.y + i * 4, dt, 38)) ok = false; });
        if (!this.andar(filha, g1.x + 8, g1.y + 4, dt, 40)) ok = false;
        if (ok || S.t > 8) { S.passo = 10; S.t = 0; }
        break;
      }
      case 10: this.fim(false); break;
    }
  },
  fim(pulou) {
    const S = this.ativa, G = Game, P = G.player; if (!S) return;
    this.ativa = null; G.world.camOff = null;
    const remover = new Set([...S.guardas, S.filha, ...(pulou ? [S.pai, S.mae] : [])]);
    G.actors = G.actors.filter(a => !remover.has(a));
    if (S.prefeito) delete S.prefeito.update;
    P.tirania = { k: S.R.k, nome: S.R.nome, crianca: S.nomeFilha, dia: G.day };
    const reg = S.vill.region, rei = reg.ruler ? `${reg.ruler.title} ${reg.ruler.name}` : 'o Rei';
    G.chron(`No dia em que acordei em ${S.vill.name}, vi soldados de ${S.R.nome} matarem uma família acusada de rebelião e levarem a pequena ${S.nomeFilha} para as minas do rei.`);
    if (pulou) return;
    const n = S.prefeito, look = n ? n.look : null, nome = n ? n.name : 'Morador';
    const falas = [
      'Não olhe para eles! Abaixe a cabeça... por favor.',
      `Este é o ${S.R.nome}. Desde que ${rei} subiu ao trono, quem reclama da fome ou dos impostos some no meio da noite.`,
      `Os pais da pequena ${S.nomeFilha} só pediram mais pão para o inverno. Agora ela vai quebrar pedra nas minas do rei até não aguentar mais.`,
      'Se quer viver aqui, fique quieto(a) e não chame atenção. Ou... encontre um jeito de mudar as coisas. Mas eu não disse isso.'
    ];
    let i = 0;
    const prox = () => {
      if (i < falas.length) { const t = falas[i++]; UI.dialog(nome, look, esc(t), [{ label: i < falas.length ? 'Continuar ▶' : '...', fn: prox }]); }
      else { UI.close(); G.centerMsg(`${S.R.nome.toUpperCase()} É UM REINO TIRANO`, `A pequena ${S.nomeFilha} foi levada para as minas do rei.`); }
    };
    G.later(0.8, prox);
  },
  bloqueia() { return !!this.ativa; },
  falar(a) { UI.dialog(a.name, a.look, a instanceof NPC ? '...' : 'Circulando, plebeu! Isso não é da sua conta.', [{ label: '...' }]); },
  imposto() {
    const P = Game.player, T_ = P && P.tirania; if (!T_) return 1;
    const L = Game.level, s = L && (L.s || (L.b && L.b.settlement)); if (!s) return 1;
    return (War.ownerOf(s) || s.region.id) === T_.k ? 1.15 : 1;
  },
  falaGuarda(s) { const T_ = Game.player.tirania; if (!T_ || !s || (War.ownerOf(s) || s.region.id) !== T_.k || Math.random() > 0.5) return null; return FALAS_TIRANO[Math.floor(Math.random() * FALAS_TIRANO.length)]; },
  // corpos no chão (deitados, sem sangue) e falas em balões
  drawables(D, camX, camY) {
    for (const c of this.corpos) D.push({ y: c.y - 6, fn: (ctx) => { ctx.save(); ctx.translate(Math.round(c.x - camX), Math.round(c.y - camY - 3)); ctx.rotate(-Math.PI / 2); ctx.globalAlpha = 0.9; ctx.drawImage(c.img, -c.img.width + 4, -c.img.height / 2); ctx.restore(); } });
  },
  desenhar(ctx, camX, camY) {
    const S = this.ativa; if (!S) return;
    const vw = Game.vw, vh = Game.vh;
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, vw, 16); ctx.fillRect(0, vh - 16, vw, 16);   // faixas de cinema
    if (S.flash > 0) { ctx.fillStyle = `rgba(160,10,10,${S.flash})`; ctx.fillRect(0, 0, vw, vh); }
    ctx.font = '10px VT323, monospace'; ctx.textAlign = 'center';
    for (const f of S.falas) {
      const a = f.a, x = Math.round(a.x - camX), y = Math.round(a.y - (a.h || 24) - 8 - camY), w = Math.min(170, ctx.measureText(f.txt).width + 8);
      ctx.fillStyle = 'rgba(250,246,232,0.96)'; ctx.fillRect(x - w / 2, y - 10, w, 12); ctx.fillRect(x - 2, y + 2, 4, 2);
      ctx.strokeStyle = a === S.guardas[0] ? '#8a1010' : '#3a2a1a'; ctx.lineWidth = 1; ctx.strokeRect(x - w / 2 + 0.5, y - 9.5, w - 1, 11);
      ctx.fillStyle = '#2a1a10'; ctx.fillText(f.txt, x, y - 1, 164);
    }
    ctx.textAlign = 'left';
  }
};
