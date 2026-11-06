'use strict';
// =====================================================================
//  CRIADOR DE BATALHAS, PARTE 2 (SÓ NO MODO ADM)
//  • Canhões, obuseiros, morteiros, antitanques, antiaéreas, metralhadoras,
//    ninhos de metralhadora e bunkers ATIRAM de verdade pelo lado de quem os
//    colocou. Os de mão vêm com um soldado no posto; se ele morrer, outro
//    soldado perto assume (até do outro lado: a arma é capturada).
//  • Navios: destróier, submarino (torpedos), encouraçado, porta-aviões
//    (lança caças) e lancha de desembarque (leva 8 soldados até a praia).
//  • Cobertura: trincheira, toca, ninho de MG, troncos, sacos de areia,
//    muros e ÁRVORES. As tropas procuram sozinhas onde se esconder e levam
//    menos dano escondidas; na trincheira aparecem só da cintura para cima.
//  • 🎖 Comandar: escolha o lado (🔴 ou 🔵) e mande nas suas tropas: toque
//    nelas para escolher, toque no chão para mover (em formação), num
//    inimigo para atacar; ou use Esconder, Segurar, Avançar, Recuar e Livre.
//  • 🎭 Animar: toque num soldado e escolha o que ele faz: beber, comer,
//    conversar (com balões entre eles), rir, sentar, dormir, fumar, saudar,
//    dançar, vigiar, tocar gaita, rezar, ferido, fogueira, cozinhar...
//  • ☁ Clima e estação a qualquer hora (primavera, verão, outono, inverno
//    com o chão e as árvores mudando), chuva, tempestade, neve, nevasca e
//    neblina, e a hora do dia. 🗺 Minimapa para os mapas grandes e o global.
// =====================================================================
if (typeof IS_ADM !== 'undefined' && IS_ADM) (function () {
  const B = window.Batalhas; if (!B || !window.BatDeco) return;
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const TV = m => m && m.veic && window.Era && Era.TIPOS ? Era.TIPOS[m.veic.tipo] : null;
  const giro = (a, alvo, max) => a + clamp(angDiff(a, alvo), -max, max);
  const pxl = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), w, h); };
  const glifo = (ctx, x, y, pts, c) => { ctx.fillStyle = c; for (const [a, b] of pts) ctx.fillRect(Math.round(x + a), Math.round(y + b), 1, 1); };
  const Z = [[0, 0], [1, 0], [2, 0], [1, 1], [0, 2], [1, 2], [2, 2]], NOTA = [[1, 0], [2, 0], [1, 1], [1, 2], [0, 2], [0, 3], [1, 3]];
  const ARVORES = new Set(['OAK', 'PINE', 'SNOWPINE', 'PALM', 'DEADTREE', 'WILLOW', 'AUTUMN', 'BIRCH', 'CACTUS'].filter(k => O[k] !== undefined).map(k => O[k]));

  // ---------- as animações ----------
  const POSES = [
    ['beber', '🍺 Beber', { semArma: 1 }], ['comer', '🍖 Comer', { semArma: 1 }], ['conversar', '💬 Conversar', {}], ['rir', '😂 Rir', {}],
    ['sentar', '🪑 Sentar', { corpo: 'sentado', semArma: 1 }], ['dormir', '😴 Dormir', { corpo: 'deitado', semArma: 1 }], ['fumar', '🚬 Fumar', { semArma: 1 }],
    ['saudar', '🫡 Saudar', {}], ['dancar', '💃 Dançar', { semArma: 1 }], ['vigiar', '🔭 Vigiar', { semArma: 1 }], ['tocar', '🎵 Tocar gaita', { semArma: 1 }],
    ['rezar', '🙏 Rezar', { corpo: 'ajoelhado', semArma: 1 }], ['ferido', '🩸 Ferido', { corpo: 'deitado', semArma: 1 }], ['fogueira', '🔥 Na fogueira', { corpo: 'sentado', semArma: 1 }],
    ['cozinhar', '🍲 Cozinhar', { semArma: 1 }], ['limpar', '🧽 Limpar a arma', { corpo: 'sentado', semArma: 1 }], ['cartas', '🃏 Jogar cartas', { corpo: 'sentado', semArma: 1 }],
    ['exercicio', '💪 Flexões', { corpo: 'deitado', semArma: 1 }]
  ];
  const POSE = {}; for (const [id, n, o] of POSES) POSE[id] = Object.assign({ id, n }, o);
  const FALAS = [
    ['Saudade de casa...', 'Eu também. Minha mãe deve estar preocupada.'], ['Viu o tamanho daquele tanque?', 'Vi. Melhor nem pensar nisso.'],
    ['Quando isso acabar vou abrir uma padaria.', 'Eu vou ser o primeiro cliente!'], ['Escreveu pra sua noiva?', 'Todo dia. Ela nunca responde.'],
    ['Essa sopa tá horrível.', 'Pelo menos tá quente.'], ['Ouvi dizer que vem reforço.', 'Ouvi isso semana passada também.'],
    ['Fica de olho no flanco esquerdo.', 'Pode deixar, sargento.'], ['Que silêncio estranho...', 'Silêncio assim nunca é bom.'],
    ['O sargento ronca igual um trator.', 'Hahaha! Dormi do lado dele ontem.'], ['Você acredita em sorte?', 'Acredito neste capacete.'],
    ['Amanhã a gente avança.', 'Então hoje a gente descansa.'], ['Meu filho nasceu mês passado.', 'Parabéns! Qual o nome dele?'],
    ['Já tinha visto o mar antes?', 'Nunca. Achei que era menor.'], ['Se eu cair, entrega essa carta.', 'Ninguém vai cair hoje.'],
    ['Quanto tempo será que falta?', 'Não sei. Só sei que tô com fome.'], ['Ouviu isso?', 'Deve ser só o vento.'],
    ['Seu fuzil tá limpo?', 'Brilhando!'], ['Quem perder no carteado lava as panelas.', 'Então já pode ir lavando!'],
    ['Que bota apertada...', 'Troca com a minha, a minha é maior.'], ['Lembra da festa na vila?', 'Como esquecer! Você caiu no rio.'],
    ['Vamos voltar todos juntos.', 'Todos juntos. Prometido.'], ['O cozinheiro sumiu de novo.', 'Deve estar dormindo na despensa.']
  ];
  const FALAS_FRIO = [['Que frio...', 'Nem sinto mais os pés.'], ['Neve de novo?', 'Pelo menos fica bonito.'], ['Me passa o cobertor?', 'Só se você me passar o café.']];
  const FALAS_CHUVA = [['Que chuva...', 'Pelo menos a lama esconde a gente.'], ['Minha meia tá encharcada.', 'A minha já virou sopa.']];
  const SOZINHO = ['Cadê todo mundo?', 'Hmm...', 'Que dia longo.', 'Saudade de casa.'];

  const X = {
    obuses: [], selec: new Set(), cmd: null, ferr: null, mini: true, marcas: [], claims: new Map(), estacao: 'verao', neblina: false, _mt: 0,
    // ---------- começo, recomeço ----------
    abrir(L) {
      this.reset(); this.selec.clear(); this.cmd = null; this.ferr = null; this.mini = L.w > 96;
      this.estacao = B.estacao || 'verao'; this.aplicarEstacao(L, this.estacao); this.clima(B.clima);
      this.miniImg = null;
    },
    reset() {
      this.obuses = []; this.marcas = []; this.claims.clear();
      const L = Game.level; if (L && L.decos) for (const d of L.decos) if (d.hp0) { d.hp = d.hp0; d.morto = false; d.op = null; d.cd = 0; }
      if (L && L.refazMascara) L.refazMascara();
    },
    // ---------- cada unidade passa por aqui antes e depois da sua IA ----------
    envolver(m) {
      if (m._env) return; m._env = true;
      const T = TV(m); if (T && T.carga) { m.veic.carga = T.carga; m._ini = { x: m.x, y: m.y }; }
      const real = m._upd !== undefined ? m._upd : own(m, 'update') ? m.update : null;
      const w = function (dt) { if (X.antes(m, dt)) return; const x0 = m.x, y0 = m.y; (real || Object.getPrototypeOf(m).update).call(m, dt); X.depois(m, dt, x0, y0); };
      if (m._upd !== undefined) m._upd = w; else m.update = w;
    },
    antes(m, dt) {
      if (!B.on || B.fase !== 'lutar') return false;
      if (m.pose) {
        if (Combat.nearestHostile(m, m.x, m.y, 170)) { m.pose = null; Game.floater(m.x, m.y - 30, '!', '#ff6040'); }
        else { m.moving = false; if (m.pose === 'dancar' && Math.random() < dt * 3) m.setDir(Math.random() < 0.5 ? 0 : Math.PI); return true; }
      }
      const T = TV(m);
      if (T && T.nav === 'lancha') { this.lancha(m, dt, T); return true; }
      if (T && T.nav === 'submarino') this.submarino(m, dt, T);
      if (T && T.lanca) this.portaAvioes(m, dt);
      return false;
    },
    depois(m, dt, x0, y0) {
      if (!B.on || B.fase !== 'lutar' || m.dead) return;
      const T = TV(m);
      m._ct = (m._ct === undefined ? Math.random() * 0.3 : m._ct) - dt;
      if (m._ct <= 0) { m._ct = 0.3; this.cobertura(m); }
      let g = null, tol = 22, forte = false; const o = m.ordem;
      if (o) {
        if (o.tipo === 'atacar') {
          if (!o.alvo || o.alvo.dead) m.ordem = null;
          else { m.target = o.alvo; const alc = m.ai === 'musket' || m.ai === 'ranged' ? 240 : m.veic ? 220 : 18, d = dist(m.x, m.y, o.alvo.x, o.alvo.y); if (d > alc) { g = { x: o.alvo.x, y: o.alvo.y }; tol = alc; forte = true; } }
        } else { g = o; tol = o.tipo === 'segurar' ? 20 : 8; forte = o.tipo !== 'segurar'; }
      }
      if (!g && m.posto && !m.posto.morto && Game.level.decos.includes(m.posto)) { g = this.posto(m.posto); tol = 5; }
      if (!g && m.cob) { g = m.cob; tol = 5; }
      if (!g && m.ai === 'musket' && !m.veic) this.linhaLivre(m, dt);
      if (!g) { if (!o) m.home = { x: m.x, y: m.y }; return; }
      if (T && T.voa) { m.home = { x: g.x, y: g.y }; return; }
      const d = dist(m.x, m.y, g.x, g.y);
      if (o && o.tipo === 'mover' && d < 12) m.ordem = { tipo: 'segurar', x: g.x, y: g.y };
      const corpo = !m.veic && !(o && o.tipo === 'recuar') && Combat.nearestHostile(m, m.x, m.y, 30);
      if (d > tol && !corpo) { m.x = x0; m.y = y0; this.andar(m, g.x, g.y, dt, forte); }
      else if (m.ai === 'musket') m.line = { x: m.x, y: m.y };
      else if (!corpo && !m.veic) { m.x = x0; m.y = y0; m.moving = false; }
      else if (m.veic && d <= tol) { m.x = x0; m.y = y0; m.moving = false; }
      m.home = { x: m.x, y: m.y };
    },
    andar(m, gx, gy, dt, forte) {
      const T = TV(m), L = Game.level;
      if (T) {
        const v = m.veic; v.ang = giro(v.ang, angleTo(m.x, m.y, gx, gy), (T.giro || 1) * dt * 2.2);
        const sp = T.vel * 0.8 * dt, nx = m.x + Math.cos(v.ang) * sp, ny = m.y + Math.sin(v.ang) * sp;
        const ok = (x, y) => { const tx = Math.floor(x / 16), ty = Math.floor(y / 16), t = L.tileAt(tx, ty); return T.agua ? !!TWATER[t] : !L.solidAt(tx, ty) && !TWATER[t]; };
        let mv = false; if (ok(nx, m.y)) { m.x = nx; mv = true; } if (ok(m.x, ny)) { m.y = ny; mv = true; }
        m.moving = mv; v.anim += sp * 0.4; if (!Combat.nearestHostile(m, m.x, m.y, 300)) v.mira = v.ang;
        return;
      }
      m.moveToward(gx, gy, m.spd * (forte ? 1 : 0.85), dt); m.moving = true;
      if (m.ai === 'musket') m.line = { x: gx, y: gy };
    },
    // os fuzileiros sem ordem: avançam até o alcance e firmam a linha para atirar
    linhaLivre(m, dt) {
      m._lt = (m._lt || 0) - dt; if (m._lt > 0) return; m._lt = 0.8 + Math.random() * 0.4;
      const e = Combat.nearestHostile(m, m.x, m.y, 1400); if (!e) { m.line = undefined; return; }
      const d = dist(m.x, m.y, e.x, e.y);
      if ((m._trinch || m._cobV > 0) && d < 600) { m.line = { x: m.x, y: m.y }; return; }   // entrincheirado: segura a posição
      if (d > 300) { const a = angleTo(m.x, m.y, e.x, e.y); m.line = { x: m.x + Math.cos(a) * 60, y: m.y + Math.sin(a) * 60 }; }
      else m.line = { x: m.x, y: m.y };
    },
    // ---------- cobertura ----------
    cobreTile(tx, ty) {
      const L = Game.level; if (!L.inb(tx, ty)) return 0; const i = ty * L.w + tx, t = L.tiles[i];
      if (TWATER[t]) return 0;
      if (L.mask[i]) return 0.5;
      const o = L.objs[i]; if (o && OSOLID[o]) return ARVORES.has(o) ? 0.4 : 0.5;
      return TSOLID[t] ? 0.55 : 0;
    },
    cobertura(m) {
      m._cobV = 0; m._trinch = false;
      const T = TV(m); if (T) { if (T.nav === 'submarino' && m.veic.mergulho) m._cobV = 0.5; return; }
      const L = Game.level;
      for (const d of L.decos) {
        const D = BatDeco.porId[d.id]; if (!D) continue;
        if (D.trinch) { const im = BatDeco.imgR(D, d.r, d.f); if (Math.abs(m.x - d.x) < im.width / 2 - 2 && Math.abs(m.y - d.y) < im.height / 2 + 1) { m._cobV = D.trinch; m._trinch = true; return; } }
        else if (D.arma && D.arma.dentro && d.op === m && !d.morto) { const p = this.posto(d); if (dist(m.x, m.y, p.x, p.y) < 9) { m._cobV = D.arma.cob; m._trinch = true; return; } }
      }
      const e = Combat.nearestHostile(m, m.x, m.y, 520); if (!e) { if (m.cob) this.soltarCob(m); return; }
      const a = angleTo(m.x, m.y, e.x, e.y);
      m._cobV = this.cobreTile(Math.floor((m.x + Math.cos(a) * 14) / 16), Math.floor((m.y - 4 + Math.sin(a) * 14) / 16));
      // procurar onde se esconder (fuzileiros e arqueiros; os de corpo a corpo vão para cima)
      m._bt = (m._bt === undefined ? Math.random() * 3 : m._bt) - 0.3;
      if (m._bt > 0) return; m._bt = 3 + Math.random();
      if (m.cob) { const c = m.cob, dd = dist(c.x, c.y, e.x, e.y); if (dd < 60 || ((c.cx - c.x) * (e.x - c.x) + (c.cy - c.y) * (e.y - c.y)) < 0) this.soltarCob(m); return; }
      if (m.ordem || m.posto || m._cobV) return;
      if (m.ai !== 'musket' && m.ai !== 'ranged') return;
      if (dist(m.x, m.y, e.x, e.y) < 80) return;
      const s = this.acharCobertura(m, e, 130); if (s) this.pegarCob(m, s);
    },
    chave(s) { return Math.round(s.x / 9) + ',' + Math.round(s.y / 9); },
    pegarCob(m, s) { if (s.posto) { m.posto = s.posto; s.posto.op = m; return; } m.cob = s; this.claims.set(this.chave(s), m); },
    soltarCob(m) { if (m.cob) { const k = this.chave(m.cob); if (this.claims.get(k) === m) this.claims.delete(k); } m.cob = null; },
    acharCobertura(m, e, raio) {
      const L = Game.level, R = Math.ceil(raio / 16), tx0 = Math.floor(m.x / 16), ty0 = Math.floor(m.y / 16);
      const de = dist(m.x, m.y, e.x, e.y) || 1, ux = (e.x - m.x) / de, uy = (e.y - m.y) / de;
      let best = null, bs = Infinity;
      const ver = s => {
        const dm = dist(m.x, m.y, s.x, s.y); if (dm > raio) return;
        const dE = dist(s.x, s.y, e.x, e.y); if (dE < 70) return;
        const k = this.chave(s), c = this.claims.get(k); if (c && c !== m && !c.dead) return;
        const sc = dm + (dE < 150 ? 80 : 0) - s.k * 40 - (s.posto ? 70 : 0); if (sc < bs) { bs = sc; best = s; }
      };
      for (const d of L.decos) {
        const D = BatDeco.porId[d.id]; if (!D) continue;
        if (D.trinch) { const im = BatDeco.imgR(D, d.r, d.f); if (Math.abs(d.x - m.x) > raio + im.width) continue; if (im.width >= im.height) for (let x = d.x - im.width / 2 + 7; x <= d.x + im.width / 2 - 7; x += 13) ver({ x, y: d.y, cx: x + ux * 16, cy: d.y + uy * 16, k: D.trinch }); else for (let y = d.y - im.height + 7; y <= d.y - 4; y += 13) ver({ x: d.x, y, cx: d.x + ux * 16, cy: y + uy * 16, k: D.trinch }); }
        else if (D.arma && !D.arma.auto && !d.morto && (!d.op || d.op.dead) && d.lado === m.lado) { const p = this.posto(d); ver({ x: p.x, y: p.y, cx: d.x, cy: d.y, k: 0.6, posto: d }); }
      }
      for (let ty = ty0 - R; ty <= ty0 + R; ty++) for (let tx = tx0 - R; tx <= tx0 + R; tx++) {
        const k = this.cobreTile(tx, ty); if (!k) continue;
        const cx = tx * 16 + 8, cy = ty * 16 + 8, sx = cx - ux * 15, sy = cy - uy * 15 + 4, stx = Math.floor(sx / 16), sty = Math.floor((sy - 2) / 16);
        if (L.solidAt(stx, sty) || TWATER[L.tileAt(stx, sty)]) continue;
        ver({ x: sx, y: sy, cx, cy, k });
      }
      return best;
    },
    // ---------- as armas fixas ----------
    posto(d) {
      const D = BatDeco.porId[d.id], im = BatDeco.imgR(D, d.r, d.f);
      if (D.arma && D.arma.dentro) return { x: d.x, y: d.y - 4 };
      return { x: d.x + (d.f ? 1 : -1) * (im.width / 2 + 4), y: d.y - 1 };
    },
    novaArma(d, D, lado) {
      d.lado = lado; d.hp = d.hp0 = D.arma.hp; d.cd = 0;
      if (D.arma.auto || !window.Era) return;
      const p = this.posto(d), u = 'f:' + (D.arma.era || 'ww2'), m = B.criar(u, lado, p.x, p.y);
      if (m) { m.posto = d; d.op = m; m.x = p.x; m.y = p.y; B.colocadas.push({ u, lado, x: p.x, y: p.y, posto: d }); }
    },
    armas(dt) {
      const L = Game.level;
      for (const d of L.decos) {
        const D = BatDeco.porId[d.id], A = D && D.arma; if (!A || d.morto || !d.hp0) continue;
        let op = true;
        if (!A.auto) {
          if (d.op && (d.op.dead || d.op.posto !== d)) d.op = null;
          if (!d.op) {
            d._busca = (d._busca || 0) - dt;
            if (d._busca <= 0) { d._busca = 1.5; let bst = null, bd = 170; for (const a of Game.actors) if (a.batalha && !a.dead && !a.veic && !a.posto && !a.pose && (a.ai === 'musket' || a.ai === 'ranged' || a.ai === 'melee')) { const dd = dist(a.x, a.y, d.x, d.y) + (a.lado === d.lado ? 0 : 60); if (dd < bd) { bd = dd; bst = a; } } if (bst) { this.soltarCob(bst); bst.posto = d; d.op = bst; } }
            continue;
          }
          const p = this.posto(d); op = dist(d.op.x, d.op.y, p.x, p.y) < 14 ? d.op : null;
          if (!op) continue;
          if (op.lado !== d.lado) { d.lado = op.lado; Game.floater(d.x, d.y - 30, 'Capturada!', '#ffd060'); }
        }
        d.cd -= dt; if (d.cd > 0) continue;
        const src = d.src || (d.src = { team: 'war', r: 0, z: 0, dead: false, h: 10 });
        src.lado = d.lado; src.faction = B.reino(d.lado); src.x = d.x; src.y = d.y - 8;
        let alvo = null, bs = Infinity;
        for (const a of Game.actors) {
          if (!a.batalha || a.dead || !a.lado || a.lado === d.lado) continue;
          const dd = dist(d.x, d.y, a.x, a.y); if (dd > A.alc || (A.min && dd < A.min)) continue;
          const voa = (a.z || 0) > 4; if (voa && !A.ar && A.tipo !== 'mg') continue; if (!voa && A.ar && A.tipo === 'flak' && dd > 260) continue;
          const sc = dd * (A.ar && voa ? 0.3 : 1) * (A.tipo === 'at' && a.veic ? 0.5 : 1); if (sc < bs) { bs = sc; alvo = a; }
        }
        if (!alvo) { d.cd = 0.4; continue; }
        if (Math.abs(alvo.x - d.x) > 24 && (alvo.x < d.x) !== !!d.f) { d.f = alvo.x < d.x; d.cd = 0.5; continue; }   // vira para o alvo
        this.atirar(d, D, A, src, alvo);
      }
      // os obuses e morteiros caindo
      for (let i = this.obuses.length - 1; i >= 0; i--) {
        const b = this.obuses[i]; b.t -= dt; if (b.t > 0) continue; this.obuses.splice(i, 1);
        Combat.explode(b.x, b.y, b.r, b.dmg, b.src, { falloff: true, kb: 200, color: '#ff8030' }); Sfx.play('boom'); Game.shake = Math.max(Game.shake, 4);
        for (let k = 0; k < 10; k++) Game.particle(b.x + (Math.random() - 0.5) * b.r, b.y, (Math.random() - 0.5) * 30, -30 - Math.random() * 40, '#6a6a6a', 1.3);
        if (L.decos.filter(x => x.id === 'cratera16' || x.id === 'cratera28').length < 90 && !TWATER[L.tileAt(Math.floor(b.x / 16), Math.floor(b.y / 16))]) L.decos.push({ id: b.r > 44 ? 'cratera28' : 'cratera16', x: Math.round(b.x), y: Math.round(b.y) });
      }
    },
    atirar(d, D, A, src, alvo) {
      const im = BatDeco.imgR(D, d.r, d.f), dir = d.f ? -1 : 1, bx = d.x + dir * im.width * 0.45, by = d.y - im.height * 0.55;
      const ty = alvo.y - 6 - (alvo.z || 0) * 0.8, ang = angleTo(bx, by, alvo.x, ty);
      if (A.tipo === 'mg') {
        Combat.projectile(src, bx, by, ang + (Math.random() - 0.5) * 0.1, 'bullet', A.dmg, { spd: 600, life: A.alc / 600 + 0.1, color: '#ffe080', r: 2 });
        d.cd = A.cd; if (Math.random() < 0.45) Sfx.play('shot');
        if (Math.random() < 0.5) Game.fx.push({ kind: 'glowfx', x: bx, y: by, r: 6, t: 0, dur: 0.06, color: '#ffe080' });
        return;
      }
      Game.fx.push({ kind: 'glowfx', x: bx, y: by, r: 14, t: 0, dur: 0.18, color: '#ffd080' }); Game.musketFx(bx, by, ang, '#ffd080');
      for (let i = 0; i < 6; i++) Game.particle(bx, by, Math.cos(ang) * 30 + (Math.random() - 0.5) * 30, -20 - Math.random() * 20, '#9a9a9a', 0.9);
      Sfx.play('boom'); Game.shake = Math.max(Game.shake, 2); d.cd = A.cd * (0.85 + Math.random() * 0.3); d.recuo = Game.t + 0.15;
      if (A.tipo === 'obus' || A.tipo === 'morteiro') {
        const dd = dist(d.x, d.y, alvo.x, alvo.y), sp = dd * 0.07, x = alvo.x + (Math.random() - 0.5) * sp * 2, y = alvo.y + (Math.random() - 0.5) * sp, t = 0.9 + dd / 700;
        this.obuses.push({ x, y, t, r: A.aoe, dmg: A.dmg, src: Object.assign({}, src) });
        Game.fx.push({ kind: 'telegraph', x, y, r: A.aoe, t: 0, dur: t });
        return;
      }
      const dmg = A.tipo === 'at' && !alvo.veic ? 70 : A.dmg;
      Combat.projectile(src, bx, by, ang, 'bullet', dmg, { spd: A.tipo === 'flak' ? 720 : A.tipo === 'at' ? 640 : 470, life: A.alc / 460 + 0.2, aoe: A.aoe, color: '#ffb040', r: A.tipo === 'flak' ? 3 : 4 });
    },
    danoArmas(x, y, r, dmg, src) {
      const L = Game.level;
      for (const d of L.decos) {
        const D = BatDeco.porId[d.id], A = D && D.arma; if (!A || d.morto || !d.hp0) continue;
        if (src && src.lado && src.lado === d.lado) continue;
        if (dist(x, y, d.x, d.y - 6) > r + 16) continue;
        d.hp -= dmg * (A.duro || 0.6);
        if (d.hp <= 0) {
          d.morto = true; d.hp = 0; if (d.op) { d.op.posto = null; d.op = null; }
          Combat.explode(d.x, d.y - 6, 30, 60, null, { color: '#ff8030' }); Sfx.play('boom'); Game.shake = Math.max(Game.shake, 5);
          Game.floater(d.x, d.y - 34, 'Destruída!', '#ff9060'); if (D.sol) L.refazMascara();
        }
      }
    },
    // ---------- os navios especiais ----------
    portaAvioes(m, dt) {
      const v = m.veic; v.lanc = (v.lanc === undefined ? 3 : v.lanc) - dt; if (v.lanc > 0) return; v.lanc = 14;
      if (Game.actors.filter(a => a._pa === m && !a.dead).length >= 4) return;
      const p = B.criar('v:caca', m.lado, m.x + (m.veic.lado || 1) * 30, m.y - 20);
      if (p) { p._pa = m; p.veic.alt = 8; p.z = 8; p.veic.ang = m.lado === 'A' ? 0 : Math.PI; Game.floater(m.x, m.y - 56, '✈ Decolando!', '#e0f0ff'); Sfx.play('swing'); }
    },
    submarino(m, dt, T) {
      const v = m.veic; v.cdt = (v.cdt === undefined ? 2 : v.cdt) - dt;
      v.mergulho = Game.t - (v.atirou || -9) > 2.5;
      if (v.cdt > 0) return;
      let alvo = null, bd = T.torpedo.alc;
      for (const a of Game.actors) { const Ta = TV(a); if (!Ta || !Ta.agua || a.dead || !a.lado || a.lado === m.lado) continue; const d = dist(m.x, m.y, a.x, a.y); if (d < bd) { bd = d; alvo = a; } }
      if (!alvo) { v.cdt = 0.5; return; }
      v.cdt = T.torpedo.cd; v.atirou = Game.t; const ang = angleTo(m.x, m.y, alvo.x, alvo.y);
      const p = Combat.projectile(m, m.x + Math.cos(ang) * 20, m.y + 2, ang, 'bullet', T.torpedo.dmg, { spd: 170, life: T.torpedo.alc / 170, color: '#c0e8ff', r: 4, aoe: 26 });
      if (p) p.torpedo = true; Game.floater(m.x, m.y - 24, 'Torpedo!', '#c0e8ff'); Sfx.play('swing');
    },
    lancha(m, dt, T) {
      const v = m.veic, L = Game.level;
      v.cdmg = v.cdmg || 0;
      const e = Combat.nearestHostile(m, m.x, m.y, 220); if (e) { v.mira = angleTo(m.x, m.y - 8, e.x, e.y - 6); Era.metralhadora(m, m); }
      if (v.carga > 0) {
        const terra = (x, y) => { const t = L.tileAt(Math.floor(x / 16), Math.floor(y / 16)); return L.inb(Math.floor(x / 16), Math.floor(y / 16)) && !TWATER[t] && !L.solidAt(Math.floor(x / 16), Math.floor(y / 16)); };
        let praia = null; for (let a = 0; a < 16 && !praia; a++) { const an = a / 16 * 6.28, x = m.x + Math.cos(an) * 26, y = m.y + Math.sin(an) * 26; if (terra(x, y)) praia = { x, y }; }
        if (praia) {
          for (let i = 0; i < v.carga; i++) { const s = B.criar('f:ww2', m.lado, praia.x + (Math.random() - 0.5) * 30, praia.y + (Math.random() - 0.5) * 30); if (s) Game.findFree(s); }
          v.carga = 0; Game.floater(m.x, m.y - 30, 'Desembarcar!', '#ffe0a0'); Sfx.play('shout'); m.moving = false; return;
        }
        if (!v.destino || (v.presa || 0) > 2.5) {
          // a terra mais perto na direção do inimigo
          v.presa = 0; let alvo = null, bd = Infinity; for (const a of Game.actors) if (a.batalha && !a.dead && a.lado && a.lado !== m.lado) { const d = dist(m.x, m.y, a.x, a.y); if (d < bd) { bd = d; alvo = a; } }
          const ax = alvo ? alvo.x : L.w * 8, ay = alvo ? alvo.y : L.h * 8, base = angleTo(m.x, m.y, ax, ay) + (Math.random() - 0.5) * (v.destino ? 1.6 : 0.3);
          v.destino = null; for (let r = 16; r < 1400 && !v.destino; r += 16) { const x = m.x + Math.cos(base) * r, y = m.y + Math.sin(base) * r; if (terra(x, y)) v.destino = { x, y }; }
          if (!v.destino) v.destino = { x: ax, y: ay };
        }
        const x0 = m.x, y0 = m.y; this.andar(m, v.destino.x, v.destino.y, dt, true);
        if (Math.abs(m.x - x0) + Math.abs(m.y - y0) < 0.2) v.presa = (v.presa || 0) + dt;
        return;
      }
      // vazia: volta para trás
      if (m._ini && dist(m.x, m.y, m._ini.x, m._ini.y) > 40) this.andar(m, m._ini.x, m._ini.y, dt, false); else m.moving = false;
    },
    // ---------- a cada quadro ----------
    tick(dt) {
      if (!B.on) return;
      const G = Game, L = G.level; if (!L || !L.isBatalha) return;
      if (G.weather && B.clima !== undefined) { G.weather.kind = B.clima === 'neblina' ? null : B.clima; G.weather.t = 999; }
      G.time = B.hora * 60;
      for (let i = this.marcas.length - 1; i >= 0; i--) { this.marcas[i].t -= dt; if (this.marcas[i].t <= 0) this.marcas.splice(i, 1); }
      for (const a of this.selec) if (a.dead || !G.actors.includes(a)) this.selec.delete(a);
      if (B.fase === 'lutar') {
        this.armas(dt);
        for (const p of G.projectiles) {
          if (p._gx !== undefined && dist(p.x, p.y, p._gx, p._gy) > 34) { p.ghost = false; p._gx = undefined; }
          if (p.torpedo) { if (!TWATER[L.tileAt(Math.floor(p.x / 16), Math.floor(p.y / 16))]) p.life = 0; else if (Math.random() < 0.6) G.particle(p.x, p.y + 2, (Math.random() - 0.5) * 6, -4, '#e8f6ff', 0.5); }
        }
      }
      this._mt -= dt; if (this._mt <= 0) { this._mt = 0.25; this.desenharMini(); }
    },
    // ---------- o toque no mapa ----------
    perto(wx, wy, r, ok) { let b = null, bd = r; for (const a of Game.actors) if (a.batalha && !a.dead && (!ok || ok(a))) { const d = dist(a.x, a.y - 8 - (a.z || 0) * 0.8, wx, wy); if (d < bd) { bd = d; b = a; } } return b; },
    toque(wx, wy, e) {
      if (this.ferr === 'animar') { const u = this.perto(wx, wy, 20, a => !a.veic); if (u) this.menuPose(u, e); else B.aviso('Toque num soldado para escolher o que ele faz.'); return true; }
      if (this.ferr === 'comandar' && this.cmd) { this.comandoToque(wx, wy); return true; }
      return false;
    },
    comandoToque(wx, wy) {
      const u = this.perto(wx, wy, 22);
      if (u && u.lado === this.cmd) {
        const grupo = Game.actors.filter(a => a.batalha && !a.dead && a.lado === this.cmd && !!a.veic === !!u.veic && dist(a.x, a.y, u.x, u.y) < (u.veic ? 30 : 46));
        const todos = grupo.every(a => this.selec.has(a)); for (const a of grupo) todos ? this.selec.delete(a) : this.selec.add(a);
        Sfx.play('ui'); B.atualizar(); return;
      }
      if (!this.selec.size) return B.aviso('Toque nas suas tropas para escolher (ou em "Todos").');
      if (u && u.lado !== this.cmd) { for (const a of this.selec) { this.soltarCob(a); a.ordem = { tipo: 'atacar', alvo: u }; } this.marcas.push({ x: u.x, y: u.y, t: 1.4, cor: '#ff4030', alvo: u }); Sfx.play('shout'); return; }
      this.mover([...this.selec], wx, wy, 'mover'); this.marcas.push({ x: wx, y: wy, t: 1.4, cor: '#ffe040' }); Sfx.play('ui');
    },
    mover(lista, wx, wy, tipo) {
      if (!lista.length) return; let cx = 0, cy = 0; for (const a of lista) { cx += a.x; cy += a.y; } cx /= lista.length; cy /= lista.length;
      const L = Game.level;
      for (const a of lista) {
        this.soltarCob(a); if (a.posto) { if (a.posto.op === a) a.posto.op = null; a.posto = null; }
        let x = wx + clamp((a.x - cx) * 0.8, -90, 90), y = wy + clamp((a.y - cy) * 0.8, -90, 90);
        const T = TV(a); if (T && T.agua && !TWATER[L.tileAt(Math.floor(x / 16), Math.floor(y / 16))]) { x = wx; y = wy; }
        a.ordem = { tipo, x: clamp(x, 8, L.w * 16 - 8), y: clamp(y, 8, L.h * 16 - 8) };
      }
    },
    ordem(qual) {
      const lista = [...this.selec]; if (!lista.length) return B.aviso('Escolha tropas primeiro.');
      const inimigos = Game.actors.filter(a => a.batalha && !a.dead && a.lado && a.lado !== this.cmd);
      if (qual === 'livre') for (const a of lista) { a.ordem = null; this.soltarCob(a); }
      if (qual === 'segurar') for (const a of lista) a.ordem = { tipo: 'segurar', x: a.x, y: a.y };
      if (qual === 'esconder') { let n = 0; for (const a of lista) { if (a.veic) continue; const e = Combat.nearestHostile(a, a.x, a.y, 1600) || inimigos[0]; if (!e) continue; a.ordem = null; this.soltarCob(a); const s = this.acharCobertura(a, e, 220); if (s) { this.pegarCob(a, s); n++; } } B.aviso(n ? `🛡 ${n} soldados foram se esconder.` : 'Não há cobertura por perto (árvores, sacos de areia, trincheiras...).'); }
      if (qual === 'avancar' || qual === 'recuar') {
        let ex = 0, ey = 0; for (const e of inimigos) { ex += e.x; ey += e.y; } const n = inimigos.length || 1; ex /= n; ey /= n;
        let cx = 0, cy = 0; for (const a of lista) { cx += a.x; cy += a.y; } cx /= lista.length; cy /= lista.length;
        const ang = inimigos.length ? angleTo(cx, cy, ex, ey) : (this.cmd === 'A' ? 0 : Math.PI), passo = qual === 'avancar' ? 200 : -220;
        this.mover(lista, cx + Math.cos(ang) * passo, cy + Math.sin(ang) * passo, qual === 'recuar' ? 'recuar' : 'mover');
      }
      Sfx.play('shout');
    },
    selecionar(qual) {
      this.selec.clear();
      for (const a of Game.actors) if (a.batalha && !a.dead && a.lado === this.cmd) {
        const T = TV(a);
        if (qual === 'todos' || (qual === 'inf' && !a.veic) || (qual === 'veic' && T && !T.agua && !T.voa) || (qual === 'nav' && T && T.agua) || (qual === 'ar' && T && T.voa)) this.selec.add(a);
      }
      B.atualizar();
    },
    // ---------- o menu das animações ----------
    menuPose(m, e) {
      const ant = document.getElementById('bat-pose'); if (ant) ant.remove();
      const el = document.createElement('div'); el.id = 'bat-pose';
      el.style.cssText = 'position:absolute;z-index:40;left:4px;right:4px;bottom:4px;background:rgba(24,14,10,.95);border:2px solid #c8a050;padding:3px;display:flex;flex-wrap:wrap;gap:2px;pointer-events:auto;font-family:VT323,monospace;max-height:60%;overflow-y:auto';
      const grupoBox = document.createElement('label'); grupoBox.style.cssText = 'width:100%;color:#f0e0c0;font-size:14px;display:flex;gap:4px;align-items:center;white-space:nowrap;overflow:hidden';
      grupoBox.innerHTML = `<input type="checkbox" id="bat-pose-g" checked> 👥 O grupo todo perto dele <span style="margin-left:auto;color:#c8b890;overflow:hidden;text-overflow:ellipsis">${esc(m.name || '')}</span>`;
      el.append(grupoBox);
      const aplicar = id => {
        const g = document.getElementById('bat-pose-g').checked, alvos = g ? Game.actors.filter(a => a.batalha && !a.dead && !a.veic && a.lado === m.lado && dist(a.x, a.y, m.x, m.y) < 56) : [m];
        for (const a of alvos) {
          a.pose = id; a._par = null; a._conv = null; this.soltarCob(a);
          let ci = -1, cd = 24; B.colocadas.forEach((c, i) => { if (c.lado === a.lado) { const d = dist(c.x, c.y, a.x, a.y); if (d < cd) { cd = d; ci = i; } } }); if (ci >= 0) B.colocadas[ci].pose = id;
        }
        el.remove(); Sfx.play('ui');
      };
      for (const [id, n] of POSES) { const b = document.createElement('button'); b.className = 'sbtn'; b.style.cssText = 'font-size:13px;padding:1px 5px;white-space:nowrap'; b.textContent = n; b.onclick = ev => { ev.stopPropagation(); aplicar(id); }; el.append(b); }
      const fim = document.createElement('button'); fim.className = 'sbtn'; fim.style.cssText = 'font-size:14px;padding:2px 5px;border-color:#80c080'; fim.textContent = '⚔ Normal'; fim.onclick = ev => { ev.stopPropagation(); aplicar(null); }; el.append(fim);
      const fe = document.createElement('button'); fe.className = 'sbtn'; fe.style.cssText = 'font-size:14px;padding:2px 5px;border-color:#ff6060'; fe.textContent = '✖ Fechar'; fe.onclick = ev => { ev.stopPropagation(); el.remove(); }; el.append(fe);
      el.addEventListener('pointerdown', ev => ev.stopPropagation());
      document.getElementById('batalha-ui').append(el);
    },
    // ---------- clima, estação e hora ----------
    clima(k) { B.clima = k === undefined ? null : k; this.neblina = k === 'neblina'; if (Game.weather) { Game.weather.kind = k === 'neblina' ? null : (k || null); Game.weather.t = 999; } },
    aplicarEstacao(L, e) {
      this.estacao = e; B.estacao = e;
      if (!L.base) return; L.tiles.set(L.base); L.objs.set(L.baseO);
      const n = L.w * L.h, t = L.tiles, o = L.objs, h = i => hash2(i % L.w, (i / L.w) | 0, 91);
      for (let i = 0; i < n; i++) {
        const ti = t[i], oi = o[i];
        if (e === 'inverno') {
          if (ti === T.GRASS || ti === T.DGRASS || ti === T.DEADGRASS || ti === T.TUNDRA || ti === T.FARM || ti === T.SAVANNA || ti === T.SWAMP) t[i] = T.SNOW;
          else if ((ti === T.DIRT || ti === T.MUD) && h(i) < 0.6) t[i] = T.SNOW;
          else if (ti === T.WATER && L.cen === 'rio') t[i] = T.ICE;
          if (oi === O.OAK || oi === O.AUTUMN || (O.WILLOW !== undefined && oi === O.WILLOW)) o[i] = O.DEADTREE;
          else if (oi === O.PINE) o[i] = O.SNOWPINE;
          else if (oi === O.FLOWERS || oi === O.TALLGRASS || oi === O.REEDS) o[i] = 0;
        } else if (e === 'outono') {
          const x = i % L.w, y = (i / L.w) | 0;
          if (ti === T.GRASS && hash2(x >> 3, y >> 3, 93) * 0.75 + h(i) * 0.25 < 0.3) t[i] = T.DEADGRASS;
          if (oi === O.OAK && h(i) < 0.8) o[i] = O.AUTUMN; else if (oi === O.FLOWERS) o[i] = 0;
        } else if (e === 'primavera') {
          if ((ti === T.GRASS || ti === T.DGRASS) && !oi && h(i) < 0.045) o[i] = O.FLOWERS;
          if (oi === O.AUTUMN) o[i] = O.OAK;
        }
      }
      L.canvas = null; this.miniImg = null;
    },
    overlay(ctx) {
      const G = Game, vw = G.vw, vh = G.vh;
      if (G.weather && G.weather.kind) G.drawWeather(ctx, vw, vh);
      const cor = { inverno: 'rgba(170,195,255,0.08)', outono: 'rgba(255,170,90,0.06)', primavera: 'rgba(190,255,200,0.04)' }[this.estacao];
      if (cor) { ctx.fillStyle = cor; ctx.fillRect(0, 0, vw, vh); }
      if (this.neblina) {
        ctx.fillStyle = 'rgba(214,220,226,0.36)'; ctx.fillRect(0, 0, vw, vh);
        const t = G.t;
        for (let i = 0; i < 7; i++) { const x = ((i * 137 + t * (6 + i)) % (vw + 260)) - 130, y = (i * 53) % vh; ctx.fillStyle = 'rgba(235,238,242,0.22)'; ctx.beginPath(); ctx.ellipse(x, y, 120, 26, 0, 0, 6.29); ctx.fill(); }
      }
    },
    painelClima() {
      const ant = document.getElementById('bat-clima'); if (ant) { ant.remove(); return; }
      const el = document.createElement('div'); el.id = 'bat-clima';
      el.style.cssText = 'position:absolute;z-index:40;right:6px;top:' + ((document.getElementById('bat-topo') || {}).offsetHeight + 8 || 60) + 'px;background:rgba(24,14,10,.94);border:2px solid #c8a050;padding:6px;pointer-events:auto;font-family:VT323,monospace;color:#f0e0c0;font-size:15px;max-width:340px';
      const linha = (titulo, ops, atual, fn) => { const r = document.createElement('div'); r.style.cssText = 'display:flex;flex-wrap:wrap;gap:3px;margin-bottom:4px;align-items:center'; r.innerHTML = `<b style="width:100%">${titulo}</b>`; for (const [v, n] of ops) { const b = document.createElement('button'); b.className = 'sbtn' + (atual === v ? ' on' : ''); b.style.cssText = 'font-size:14px;padding:1px 6px'; b.textContent = n; b.onclick = ev => { ev.stopPropagation(); fn(v); el.remove(); this.painelClima(); }; r.append(b); } el.append(r); };
      linha('Estação', [['primavera', '🌸 Primavera'], ['verao', '☀ Verão'], ['outono', '🍂 Outono'], ['inverno', '❄ Inverno']], this.estacao, v => this.aplicarEstacao(Game.level, v));
      linha('Clima', [[null, '☀ Limpo'], ['rain', '🌧 Chuva'], ['storm', '⛈ Tempestade'], ['snow', '🌨 Neve'], ['nevasca', '❄ Nevasca'], ['neblina', '🌫 Neblina']], B.clima || null, v => this.clima(v));
      linha('Hora', [[7, 'Manhã'], [12, 'Meio-dia'], [16, 'Tarde'], [18, 'Pôr do sol'], [23, 'Noite']], B.hora, v => { B.hora = v; Game.time = v * 60; });
      const f = document.createElement('button'); f.className = 'sbtn'; f.style.cssText = 'font-size:14px;padding:1px 8px;border-color:#ff6060'; f.textContent = '✖ Fechar'; f.onclick = ev => { ev.stopPropagation(); el.remove(); }; el.append(f);
      el.addEventListener('pointerdown', ev => ev.stopPropagation());
      document.getElementById('batalha-ui').append(el);
    },
    // ---------- o minimapa ----------
    fazerMiniImg(L) {
      const c = document.createElement('canvas'); c.width = L.w; c.height = L.h; const x = c.getContext('2d'), im = x.createImageData(L.w, L.h);
      for (let i = 0; i < L.w * L.h; i++) { const o = L.objs[i], col = hexToRgb(o && OSOLID[o] ? '#2a4a1a' : (TILE_DEFS[L.tiles[i]] && TILE_DEFS[L.tiles[i]].c) || '#555'); im.data[i * 4] = col[0]; im.data[i * 4 + 1] = col[1]; im.data[i * 4 + 2] = col[2]; im.data[i * 4 + 3] = 255; }
      x.putImageData(im, 0, 0); return c;
    },
    desenharMini() {
      const cv = document.getElementById('bat-mini'), L = Game.level; if (!cv || !L || !L.isBatalha) return;
      cv.style.display = this.mini ? '' : 'none'; if (!this.mini) return;
      const s = Math.min(90 / L.w, 54 / L.h), W = Math.round(L.w * s), H = Math.round(L.h * s);
      if (cv.width !== W * 2) { cv.width = W * 2; cv.height = H * 2; cv.style.width = W + 'px'; cv.style.height = H + 'px'; }
      if (!this.miniImg) this.miniImg = this.fazerMiniImg(L);
      const x = cv.getContext('2d'), k = cv.width / (L.w * 16); x.imageSmoothingEnabled = false;
      x.drawImage(this.miniImg, 0, 0, cv.width, cv.height);
      x.fillStyle = 'rgba(40,30,20,0.7)'; for (const d of L.decos) { const D = BatDeco.porId[d.id]; if (D && D.sol) x.fillRect(d.x * k - 1, d.y * k - 1, 2, 2); }
      for (const a of Game.actors) if (a.batalha && !a.dead) { x.fillStyle = this.selec.has(a) ? '#ffffff' : B.cor(a.lado); const r = a.veic ? 3 : 2; x.fillRect(Math.round(a.x * k) - r / 2, Math.round(a.y * k) - r / 2, r, r); }
      x.strokeStyle = '#fff'; x.lineWidth = 1; x.strokeRect(Math.round(Game.camX * k) + 0.5, Math.round(Game.camY * k) + 0.5, Math.round(Game.vw * k), Math.round(Game.vh * k));
    },
    montarMini() {
      const ui = document.getElementById('batalha-ui'); if (!ui) return;
      let cv = document.getElementById('bat-mini');
      if (!cv) {
        cv = document.createElement('canvas'); cv.id = 'bat-mini';
        cv.style.cssText = 'position:absolute;right:6px;border:2px solid #6a4a2a;background:#000;pointer-events:auto;image-rendering:pixelated;touch-action:none';
        const ir = e => { e.stopPropagation(); const r = cv.getBoundingClientRect(), L = Game.level; Game.player.x = clamp((e.clientX - r.left) / r.width * L.w * 16, 0, L.w * 16); Game.player.y = clamp((e.clientY - r.top) / r.height * L.h * 16, 0, L.h * 16); };
        cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); cv._arr = true; ir(e); });
        cv.addEventListener('pointermove', e => { if (cv._arr) ir(e); });
        cv.addEventListener('pointerup', e => { cv._arr = false; e.stopPropagation(); });
        ui.append(cv);
      }
      const topo = document.getElementById('bat-topo'), th = topo ? topo.offsetHeight : 50, pl = document.getElementById('bat-placar');
      if (pl) pl.style.top = (th + 6) + 'px';
      cv.style.top = (th + 6) + 'px';
      this.desenharMini();
    },
    // ---------- a barra de botões ----------
    ui(topo, baixo, bt, lista) {
      if (B.apagar) this.ferr = null;
      const compacto = () => { for (const b of topo.children) b.style.cssText += ';font-size:13px;padding:1px 5px'; };
      const ladoIc = l => l === 'A' ? '🔴' : '🔵';
      topo.append(bt('🎭 Animar', this.ferr === 'animar', () => { this.ferr = this.ferr === 'animar' ? null : 'animar'; B.apagar = false; B.atualizar(); }, '#e0a0ff'));
      topo.append(bt(this.cmd ? `🎖 Comando: ${ladoIc(this.cmd)}` : '🎖 Comandar', this.ferr === 'comandar', () => { this.cmd = this.cmd === null ? 'A' : this.cmd === 'A' ? 'B' : null; this.ferr = this.cmd ? 'comandar' : null; this.selec.clear(); B.apagar = false; B.atualizar(); if (this.cmd) B.aviso(`Você comanda o lado ${ladoIc(this.cmd)}: toque nas suas tropas e depois no mapa. O outro lado é da IA.`); }, '#80c0ff'));
      topo.append(bt('☁ Clima', false, () => this.painelClima()));
      topo.append(bt('🗺', this.mini, () => { this.mini = !this.mini; this.desenharMini(); B.atualizar(); }));
      compacto();
      if (B._sub) {
        const mini = b => { b.style.cssText += ';flex:0 0 auto;white-space:nowrap;font-size:13px;padding:1px 6px'; return b; };
        B._sub.prepend(mini(bt(`↻ Girar ${B.rot * 90}°`, B.rot > 0, () => { B.rot = (B.rot + 1) & 3; B.atualizar(); }, '#ffd040')), mini(bt('⇋ Espelhar', B.esp, () => { B.esp = !B.esp; B.atualizar(); }, '#ffd040')));
      }
      if (this.ferr === 'comandar' && this.cmd) {
        const row = document.createElement('div'); row.style.cssText = 'display:flex;gap:3px;margin-bottom:3px;overflow-x:auto;flex-wrap:nowrap;background:rgba(20,12,10,.82);border:2px solid #4a6a9a;padding:3px';
        const mini = b => { b.style.cssText += ';flex:0 0 auto;white-space:nowrap;font-size:14px;padding:2px 6px'; return b; };
        const info = document.createElement('span'); info.style.cssText = 'flex:0 0 auto;align-self:center;font-size:15px;color:#c0e0ff;margin-right:4px'; info.textContent = `${ladoIc(this.cmd)} ${this.selec.size} escolhidos`; row.append(info);
        for (const [q, n] of [['todos', 'Todos'], ['inf', '🪖 Infantaria'], ['veic', '🛡 Blindados'], ['nav', '⚓ Navios'], ['ar', '✈ Aviões']]) row.append(mini(bt(n, false, () => this.selecionar(q))));
        row.append(mini(bt('✖ Nenhum', false, () => { this.selec.clear(); B.atualizar(); })));
        for (const [q, n, c] of [['esconder', '🛡 Esconder', '#80e080'], ['segurar', '⛺ Segurar', '#e0e080'], ['avancar', '⚔ Avançar', '#ff9060'], ['recuar', '↩ Recuar', '#c0c0ff'], ['livre', '🤖 Livre (IA)', '#c0c0c0']]) row.append(mini(bt(n, false, () => this.ordem(q), c)));
        baixo.insertBefore(row, lista); lista.style.display = 'none';
      } else if (this.ferr === 'animar') {
        const dica = document.createElement('div'); dica.style.cssText = 'font-size:15px;color:#f0d0ff;background:rgba(20,12,10,.82);border:2px solid #8a5aa0;padding:2px 6px;margin-bottom:3px'; dica.textContent = '🎭 Toque num soldado e escolha: beber, comer, conversar, dormir, fumar, dançar... Eles param e vão lutar quando o inimigo chegar perto.';
        baixo.insertBefore(dica, lista); lista.style.display = 'none';
      }
      this.montarMini();
    },
    // ---------- desenhos extras: seleção, ordens, armas, conversas ----------
    drawables(D, camX, camY, vw, vh) {
      const G = Game, L = G.level;
      for (const a of this.selec) if (!a.dead) D.push({ y: a.y - 0.5, fn: (ctx, cx, cy) => { ctx.strokeStyle = '#ffe040'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(Math.round(a.x - cx), Math.round(a.y - cy + 1), a.veic ? 20 : 7, a.veic ? 7 : 3, 0, 0, 6.29); ctx.stroke(); if (a.ordem && a.ordem.x !== undefined) { ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.moveTo(a.x - cx, a.y - cy); ctx.lineTo(a.ordem.x - cx, a.ordem.y - cy); ctx.stroke(); ctx.globalAlpha = 1; } } });
      for (const m of this.marcas) D.push({ y: m.y + 1, fn: (ctx, cx, cy) => { const x = Math.round((m.alvo && !m.alvo.dead ? m.alvo.x : m.x) - cx), y = Math.round((m.alvo && !m.alvo.dead ? m.alvo.y : m.y) - cy), k = m.t / 1.4; ctx.globalAlpha = Math.min(1, k * 2); ctx.strokeStyle = m.cor; ctx.beginPath(); ctx.ellipse(x, y, 4 + (1 - k) * 10, 2 + (1 - k) * 4, 0, 0, 6.29); ctx.stroke(); pxl(ctx, x, y - 12, 1, 12, '#3a2a1a'); pxl(ctx, x + 1, y - 12, 6, 4, m.cor); ctx.globalAlpha = 1; } });
      for (const d of L.decos) {
        const De = BatDeco.porId[d.id]; if (!De || !De.arma || !d.hp0) continue;
        if (d.x < camX - 60 || d.x > camX + vw + 60 || d.y < camY - 60 || d.y > camY + vh + 80) continue;
        D.push({ y: d.y + 0.6, fn: (ctx, cx, cy) => {
          const im = BatDeco.imgR(De, d.r, d.f), x = Math.round(d.x - cx), y = Math.round(d.y - im.height - cy);
          pxl(ctx, x - 1, y - 9, 1, 8, '#3a2a1a'); pxl(ctx, x, y - 9, 5, 3, d.morto ? '#5a5a5a' : B.cor(d.lado));
          if (d.hp < d.hp0 && !d.morto) { pxl(ctx, x - 10, y - 13, 20, 2, '#200'); pxl(ctx, x - 10, y - 13, Math.round(20 * d.hp / d.hp0), 2, '#e0a030'); }
          if (d.morto && Math.random() < 0.3) G.particle(d.x + (Math.random() - 0.5) * 10, d.y - im.height * 0.6, (Math.random() - 0.5) * 6, -18, '#4a4a4a', 1.5);
        } });
      }
      // as conversas: quem está conversando procura um par e eles se olham
      const conv = G.actors.filter(a => a.batalha && !a.dead && a.pose === 'conversar');
      for (const a of conv) {
        if (a._par && (a._par.dead || a._par.pose !== 'conversar' || a._par._par !== a)) a._par = null;
        if (!a._par) { let b = null, bd = 70; for (const o of conv) if (o !== a && (!o._par || o._par === a)) { const d = dist(a.x, a.y, o.x, o.y); if (d < bd) { bd = d; b = o; } } if (b) { a._par = b; b._par = a; } }
        if (a._par && a.setDir) a.setDir(angleTo(a.x, a.y, a._par.x, a._par.y));
      }
    },
    // o que cada animação desenha por cima do soldado
    falaDo(m) {
      const k = Game.weather && Game.weather.kind, lista = this.estacao === 'inverno' || k === 'snow' || k === 'nevasca' ? FALAS.concat(FALAS_FRIO, FALAS_FRIO) : k === 'rain' || k === 'storm' ? FALAS.concat(FALAS_CHUVA, FALAS_CHUVA) : FALAS;
      return lista[Math.floor(Math.random() * lista.length)];
    },
    poseDesenho(ctx, m, sx, sy) {
      const t = Game.t + (m.id || 0) * 0.37, h = m.h || 26, dx = m.dir === 'left' ? -1 : m.dir === 'right' ? 1 : 0, s = dx || 1;
      const hy = sy - h + 7, mao = { x: sx + s * 5, y: sy - 12 }, pele = (m.look && m.look.skin) || '#e0ac69';
      const balao = (txt, y) => { if (typeof Nitido !== 'undefined') Nitido.balao(sx, y === undefined ? sy - h - 6 : y, txt); };
      switch (m.pose) {
        case 'beber': { const c = t % 3.6 < 1; const x = c ? sx + s * 3 : mao.x, y = c ? hy + 2 : mao.y; pxl(ctx, x - 1, y, 3, 4, '#c88a30'); pxl(ctx, x - 1, y, 3, 1, '#f0f0e0'); pxl(ctx, x + 2 * s, y + 1, 1, 2, '#8a5a20'); if (t % 14 < 2) balao('Saúde!'); break; }
        case 'comer': { const c = t % 2.4 < 0.8; const x = c ? sx + s * 3 : mao.x, y = c ? hy + 3 : mao.y; pxl(ctx, x - 1, y, 3, 3, '#a05a28'); pxl(ctx, x + s * 2, y + 1, 2, 1, '#f0ead8'); if (c && Math.random() < 0.08) Game.particle(m.x + s * 3, m.y - h + 12, (Math.random() - 0.5) * 10, 10, '#d0a060', 0.4); break; }
        case 'fumar': { pxl(ctx, sx + s * 3, hy + 3, 3, 1, '#f0f0e8'); pxl(ctx, sx + s * 6, hy + 3, 1, 1, t % 1 < 0.5 ? '#ff7020' : '#d04010'); if (Math.random() < 0.06) Game.particle(m.x + s * 6, m.y - h + 9, (Math.random() - 0.5) * 4, -10, '#c8c8c8', 1.4); break; }
        case 'saudar': pxl(ctx, sx + s * 3, hy - 2, 3, 2, pele); pxl(ctx, sx + s * 5, hy, 1, 5, shade(pele, -0.2)); break;
        case 'vigiar': pxl(ctx, sx + s * 2, hy + 1, 4, 2, '#2a2a2a'); pxl(ctx, sx + s * 5, hy + 1, 1, 2, '#6a8aa0'); break;
        case 'tocar': { pxl(ctx, sx + s * 2, hy + 3, 4, 1, '#c8ccd4'); const f = (t * 0.8) % 1; glifo(ctx, sx + s * 6 + f * 6 * s, hy - 4 - f * 12, NOTA, `rgba(255,240,160,${1 - f})`); break; }
        case 'rezar': pxl(ctx, sx - 1, sy - 15, 2, 3, pele); break;
        case 'dormir': { const f = (t * 0.5) % 1; glifo(ctx, sx - 18 + f * 4, sy - 12 - f * 10, Z, `rgba(220,230,255,${1 - f})`); glifo(ctx, sx - 14 + f * 6, sy - 18 - f * 12, Z, `rgba(220,230,255,${(1 - f) * 0.6})`); break; }
        case 'ferido': if (t % 7 < 2) balao(t % 14 < 7 ? 'Médico!' : 'Ai...', sy - 16); break;
        case 'rir': if (t % 5 < 2) balao('Hahaha!'); break;
        case 'cartas': pxl(ctx, mao.x - 1, sy - 11, 2, 3, '#f0f0f0'); pxl(ctx, mao.x + 1, sy - 11, 2, 3, '#f0e8e0'); pxl(ctx, mao.x + 1, sy - 10, 1, 1, '#c02020'); if (t % 9 < 1.6) balao(t % 18 < 9 ? 'Truco!' : 'Seis!'); break;
        case 'limpar': pxl(ctx, sx - 7, sy - 9, 14, 1, '#4a3a2a'); pxl(ctx, sx + 2, sy - 9, 5, 1, '#3a3a3a'); pxl(ctx, sx - 4 + Math.round(Math.sin(t * 6) * 3), sy - 10, 2, 2, '#e8e8e0'); break;
        case 'fogueira': case 'cozinhar': {
          const fx = sx + s * 11, fy = sy - 1; pxl(ctx, fx - 4, fy, 8, 2, '#5a3a1a'); pxl(ctx, fx - 3, fy - 1, 2, 1, '#3a2a1a');
          const fl = Math.floor(t * 10) % 3; pxl(ctx, fx - 2, fy - 3 - fl, 4, 3 + fl, '#ff8020'); pxl(ctx, fx - 1, fy - 5 - fl, 2, 3, '#ffd040');
          if (m.pose === 'cozinhar') { pxl(ctx, fx - 4, fy - 8, 8, 5, '#4a4a50'); pxl(ctx, fx - 4, fy - 8, 8, 1, '#8a8a90'); if (Math.random() < 0.08) Game.particle(m.x + s * 11, m.y - 10, (Math.random() - 0.5) * 4, -12, '#e8e8f0', 1); }
          else if (Math.random() < 0.08) Game.particle(m.x + s * 11, m.y - 5, (Math.random() - 0.5) * 6, -16, '#ffb040', 0.5);
          break;
        }
        case 'conversar': {
          const p = m._par;
          if (!p) { if (t % 10 < 2.5) balao(SOZINHO[Math.floor(t / 10) % SOZINHO.length]); break; }
          if ((m.id || 0) > (p.id || 0)) break;                  // quem puxa o assunto é o de menor número
          const ciclo = 8, fase = (Game.t + (m.id || 0)) % ciclo, k = Math.floor((Game.t + (m.id || 0)) / ciclo);
          if (!m._conv || m._conv.k !== k) m._conv = { k, par: this.falaDo(m) };
          if (fase < 3) balao(m._conv.par[0]);
          else if (fase > 3.4 && fase < 6.6) Nitido.balao(Math.round(p.x - Game.camX), Math.round(p.y - (p.h || 26) - 6 - Game.camY), m._conv.par[1]);
          if (fase < 3 && Math.random() < 0.02) m.setDir(angleTo(m.x, m.y, p.x, p.y));
          break;
        }
      }
    }
  };
  window.BatX = X;

  // ---------------- ganchos ----------------
  // o soldado desenhado com a animação (deitado, sentado, ajoelhado, na trincheira) e a arma guardada
  const md0 = Monster.prototype.draw;
  Monster.prototype.draw = function (ctx, camX, camY) {
    if (!B.on || !this.batalha || this.veic || this.dead) return md0.apply(this, arguments);
    const P = this.pose && POSE[this.pose], corpo = P && P.corpo, trinch = this._trinch && !corpo;
    if (!P && !trinch) return md0.apply(this, arguments);
    const w0 = this.wimg; if (P && P.semArma) this.wimg = null;
    const sx = Math.round(this.x - camX), sy = Math.round(this.y - camY), t = Game.t + (this.id || 0) * 0.37;
    ctx.save();
    if (this.pose === 'ferido') { ctx.fillStyle = 'rgba(130,18,18,0.75)'; ctx.beginPath(); ctx.ellipse(sx - 10, sy + 1, 8, 2.5, 0, 0, 6.29); ctx.fill(); }
    if (corpo === 'deitado') { const sobe = this.pose === 'exercicio' ? -Math.abs(Math.sin(t * 3)) * 3 : 0; ctx.translate(sx, sy - 4 + sobe); ctx.rotate(-Math.PI / 2); ctx.translate(-sx, -sy + 4); }
    else if (corpo === 'sentado' || corpo === 'ajoelhado' || trinch) { const desce = trinch ? 7 : corpo === 'sentado' ? 4 : 3; ctx.beginPath(); ctx.rect(sx - 40, sy - 90, 80, 90 - (trinch ? 5 : 2)); ctx.clip(); ctx.translate(0, desce); }
    else if (this.pose === 'dancar') ctx.translate(0, -Math.round(Math.abs(Math.sin(t * 7)) * 2));
    else if (this.pose === 'rir') ctx.translate(Math.round(Math.sin(t * 25) * 0.6), 0);
    md0.apply(this, arguments);
    ctx.restore();
    this.wimg = w0;
    if (corpo === 'sentado') { pxl(ctx, sx - 6, sy - 3, 12, 4, '#7a5432'); pxl(ctx, sx - 6, sy - 3, 12, 1, '#9a7450'); pxl(ctx, sx - 6, sy, 12, 1, '#4a3420'); }
    if (P) X.poseDesenho(ctx, this, sx, sy);
  };
  // escondido leva menos dano (as minas não ligam para isso)
  const dm0 = Combat.damage;
  Combat.damage = function (t, amount, o) { if (B.on && t && t.batalha && t._cobV > 0 && !(o && o.mina)) amount *= 1 - t._cobV; return dm0.call(this, t, amount, o); };
  // os tiros da batalha: saem por cima da cobertura de quem atira e não somem quando o atirador morre
  const pj0 = Combat.projectile;
  Combat.projectile = function (src, x, y) { const p = pj0.apply(this, arguments); if (B.on && src && src.lado && p) { p._so = { team: p.team, faction: src.faction, lado: src.lado }; if (!p.ghost) { p.ghost = true; p._gx = x; p._gy = y; } } return p; };
  // as explosões estragam as armas fixas
  const ex0 = Combat.explode;
  Combat.explode = function (x, y, r, dmg, src) { const res = ex0.apply(this, arguments); if (B.on && Game.level && Game.level.isBatalha) X.danoArmas(x, y, r, dmg, src); return res; };
})();
