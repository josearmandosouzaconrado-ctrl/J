'use strict';
// ===================== CRÔNICAS ESTELARES: o jogo =====================
const T_SOLIDO = new Set(['rocha', 'planta', 'cristal', 'bloco', 'torre', 'lampada']);

// ---------- entrada: teclado e toque ----------
const Input = {
  keys: {}, move: { x: 0, y: 0, mag: 0 }, stick: null, fire: false,
  init() {
    addEventListener('keydown', e => { this.keys[e.code] = true; if (e.code === 'KeyE' || e.code === 'Enter') J.acao(); if (e.code === 'KeyM') UI.mapa(); if (e.code === 'Escape') UI.menu(); if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code) && J.estado === 'jogo') e.preventDefault(); });
    addEventListener('keyup', e => { this.keys[e.code] = false; });
    const z = document.getElementById('stick-zone'), base = document.getElementById('stick-base'), knob = document.getElementById('stick-knob');
    const fim = () => { this.stick = null; base.classList.remove('on'); knob.style.transform = ''; };
    z.addEventListener('pointerdown', e => { this.stick = { id: e.pointerId, x: e.clientX, y: e.clientY, dx: 0, dy: 0 }; base.style.left = (e.clientX - 50) + 'px'; base.style.top = (e.clientY - 50) + 'px'; base.classList.add('on'); z.setPointerCapture(e.pointerId); });
    z.addEventListener('pointermove', e => { const s = this.stick; if (!s || s.id !== e.pointerId) return; let dx = e.clientX - s.x, dy = e.clientY - s.y; const m = Math.hypot(dx, dy); if (m > 44) { dx *= 44 / m; dy *= 44 / m; } s.dx = dx / 44; s.dy = dy / 44; knob.style.transform = `translate(${dx}px,${dy}px)`; });
    z.addEventListener('pointerup', fim); z.addEventListener('pointercancel', fim);
    const bt = (id, dn, up) => { const b = document.getElementById(id); b.addEventListener('pointerdown', e => { e.preventDefault(); dn(); }); if (up) { b.addEventListener('pointerup', up); b.addEventListener('pointerleave', up); b.addEventListener('pointercancel', up); } };
    bt('b-fogo', () => { this.fireTouch = true; }, () => { this.fireTouch = false; });
    bt('b-acao', () => J.acao());
    bt('b-mapa', () => UI.mapa());
    bt('b-menu', () => UI.menu());
    bt('b-med', () => J.usarMedkit());
  },
  update() {
    const k = this.keys; let x = (k.ArrowRight || k.KeyD ? 1 : 0) - (k.ArrowLeft || k.KeyA ? 1 : 0), y = (k.ArrowDown || k.KeyS ? 1 : 0) - (k.ArrowUp || k.KeyW ? 1 : 0);
    if (this.stick) { x = this.stick.dx; y = this.stick.dy; }
    const m = Math.hypot(x, y); this.move = { x: m > 1 ? x / m : x, y: m > 1 ? y / m : y, mag: Math.min(1, m) };
    this.fire = !!(k.Space || k.KeyJ || this.fireTouch);
  }
};

// ---------- o jogo ----------
const J = {
  estado: 'titulo', t: 0, P: null, modo: null, cam: { x: 0, y: 0 }, vw: 400, vh: 225, esc: 3,
  ents: [], tiros: [], parts: [], coletas: [], shake: 0,
  init() {
    this.cv = document.getElementById('cv'); this.ctx = this.cv.getContext('2d');
    this.mm = document.getElementById('minimapa').getContext('2d');
    addEventListener('resize', () => this.tamanho()); this.tamanho();
    Input.init(); UI.init(); UI.titulo();
    let last = performance.now();
    const loop = (now) => { const dt = Math.min(0.05, (now - last) / 1000); last = now; this.frame(dt); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  },
  tamanho() {
    const W = innerWidth, H = innerHeight; this.esc = Math.max(2, Math.round(Math.min(W / 420, H / 236)));
    this.vw = Math.ceil(W / this.esc); this.vh = Math.ceil(H / this.esc);
    this.cv.width = this.vw; this.cv.height = this.vh; this.cv.style.width = this.vw * this.esc + 'px'; this.cv.style.height = this.vh * this.esc + 'px';
    this.ctx.imageSmoothingEnabled = false;
  },
  // ---------- atributos ----------
  st() {
    const P = this.P, B = RACAS[P.raca].bonus, u = P.up;
    return { maxVida: 100 + (B.vida || 0) + u.armadura * 25, maxEscudo: 40 + (B.escudo || 0) + u.escudo * 25, dano: 12 + u.blaster * 8, armadura: (B.armadura || 0) + u.armadura * 0.04,
      maxCasco: 120 + u.casco * 60, canhao: 10 + u.canhao * 7, velNave: 240 + u.motor * 40, maxComb: 60 + u.tanque * 30, velPe: 72 * (1 + (B.vel || 0)), regen: 6 * (B.regen || 1) };
  },
  novo(nome, raca, look) {
    const B = RACAS[raca].bonus, lar = LAR[raca], S = Galaxia.sistemaDe(lar);
    this.P = { nome, raca, look, creditos: 500 + (B.creditos || 0), itens: { medkit: 2 }, up: { blaster: 0, armadura: 0, escudo: 0, casco: 0, canhao: 0, motor: 0, tanque: 0 }, sistema: S.id, planeta: lar, tempo: 0, missoes: [], minerados: {}, visitados: [lar], abates: 0, piratas: 0 };
    const s = this.st(); Object.assign(this.P, { vida: s.maxVida, escudo: s.maxEscudo, casco: s.maxCasco, comb: s.maxComb });
    this.estado = 'jogo'; UI.mostrarHUD(true);
    this.pousar(Galaxia.planeta(lar), true);
    UI.centro(Galaxia.planeta(lar).nome.toUpperCase(), `${RACAS[raca].nome} • seu planeta natal`);
    setTimeout(() => UI.dialog('Chefe da Colônia', null, `Bem-vindo(a), ${esc(nome)}! Sua nave está na pista ao sul da cidade.<br><br>• Fale com o <b>mercador</b> (loja amarela) para vender cristais e comprar melhorias.<br>• Fale com o <b>chefe</b> para pegar missões.<br>• Minere <b>cristais</b> e cuidado com as criaturas fora da cidade.<br>• Na nave, toque em <b>Decolar</b> para ir ao espaço, visitar outros planetas e a estação.`, [{ label: 'Vamos lá!' }]), 600);
  },
  salvar() { if (!this.P) return; try { localStorage.setItem('estelar_v1', JSON.stringify({ P: this.P, modo: this.modo, nave: this.nave ? { x: this.nave.x, y: this.nave.y } : null, pe: this.eu ? { x: this.eu.x, y: this.eu.y } : null })); } catch (e) { /* sem armazenamento */ } },
  temSave() { try { return !!localStorage.getItem('estelar_v1'); } catch (e) { return false; } },
  carregar() {
    let d = null; try { d = JSON.parse(localStorage.getItem('estelar_v1')); } catch (e) { d = null; }
    if (!d) return false;
    this.P = d.P; this.estado = 'jogo'; UI.mostrarHUD(true);
    if (d.modo === 'planeta' && this.P.planeta) { this.pousar(Galaxia.planeta(this.P.planeta), true); if (d.pe) { this.eu.x = d.pe.x; this.eu.y = d.pe.y; } }
    else { this.espaco(d.nave); }
    return true;
  },
  // ---------- dano e cura ----------
  ferir(n) {
    const P = this.P, s = this.st(); if (this.invuln > 0) return;
    n *= 1 - s.armadura; this.semDano = 0;
    const e = Math.min(P.escudo, n); P.escudo -= e; n -= e;
    if (this.modo === 'espaco') { P.casco -= n; if (P.casco <= 0) this.morreuNave(); }
    else { P.vida -= n; if (P.vida <= 0) this.morreu(); }
    this.shake = Math.max(this.shake, n > 0 ? 3 : 1); this.flash = 0.15;
  },
  usarMedkit() {
    const P = this.P; if (!P || !P.itens.medkit) return UI.toast('Sem kits médicos.', '#ff8080');
    const s = this.st(); if (this.modo === 'espaco') { if (P.casco >= s.maxCasco) return; P.casco = Math.min(s.maxCasco, P.casco + 60); }
    else { if (P.vida >= s.maxVida) return; P.vida = Math.min(s.maxVida, P.vida + 60); }
    P.itens.medkit--; UI.toast('+60 de ' + (this.modo === 'espaco' ? 'casco (reparo rápido)' : 'vida'), '#80ff80');
  },
  dar(id, n = 1) { const P = this.P; P.itens[id] = (P.itens[id] || 0) + n; UI.toast(`+${n} ${ITENS[id].nome}`, ITENS[id].cor); Missoes.checar(); },
  particula(x, y, vx, vy, cor, vida, tam = 1) { if (this.parts.length > 400) return; this.parts.push({ x, y, vx, vy, cor, vida, v0: vida, tam }); },
  explosao(x, y, cor, n = 14, f = 90) { for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, v = Math.random() * f; this.particula(x, y, Math.cos(a) * v, Math.sin(a) * v, Math.random() < 0.5 ? cor : '#ffe080', 0.4 + Math.random() * 0.5, Math.random() < 0.3 ? 2 : 1); } },

  // =============== ESPAÇO ===============
  espaco(pos) {
    const P = this.P, S = Galaxia.sistema(P.sistema);
    this.modo = 'espaco'; P.planeta = null; this.solo = null; this.chao = null;
    this.nave = { x: pos ? pos.x : 1400, y: pos ? pos.y : 300, vx: 0, vy: 0, ang: -Math.PI / 2, cd: 0 };
    this.ents = []; this.tiros = []; this.coletas = []; this.parts = [];
    // cinturão de asteroides
    const rng = new RNG(hashStr(S.id) + 77), anel = (S.planetas[1].orbita + S.planetas[2].orbita) / 2;
    for (let i = 0; i < 70; i++) { const a = rng.range(0, Math.PI * 2), r = anel + rng.range(-110, 110); this.ents.push({ tipo: 'ast', x: Math.cos(a) * r, y: Math.sin(a) * r, r: rng.int(7, 15), seed: rng.int(1, 9999), hp: 3, rot: rng.range(-1, 1), a: 0 }); }
    this.pirT = 20; this.merT = 3;
    UI.local(); this.salvar();
  },
  updEspaco(dt) {
    const P = this.P, N = this.nave, S = Galaxia.sistema(P.sistema), s = this.st(), m = Input.move;
    // pilotagem: o joystick aponta para onde a nave vai
    if (m.mag > 0.2) { const want = Math.atan2(m.y, m.x), da = angDiff(N.ang, want); N.ang += clamp(da, -4 * dt, 4 * dt); const ac = 300 * m.mag * Math.max(0.2, Math.cos(da)); N.vx += Math.cos(N.ang) * ac * dt; N.vy += Math.sin(N.ang) * ac * dt; N.motor = m.mag; } else N.motor = 0;
    const v = Math.hypot(N.vx, N.vy); if (v > s.velNave) { N.vx *= s.velNave / v; N.vy *= s.velNave / v; }
    const dr = Math.pow(0.55, dt); N.vx *= dr; N.vy *= dr; N.x += N.vx * dt; N.y += N.vy * dt;
    if (N.motor && Math.random() < 0.8) { const bx = N.x - Math.cos(N.ang) * 12, by = N.y - Math.sin(N.ang) * 12; this.particula(bx + (Math.random() - 0.5) * 4, by + (Math.random() - 0.5) * 4, -Math.cos(N.ang) * 60 + N.vx * 0.5, -Math.sin(N.ang) * 60 + N.vy * 0.5, Math.random() < 0.5 ? '#ffb040' : '#fff0a0', 0.35); }
    // a estrela queima
    const dSol = Math.max(1, Math.hypot(N.x, N.y)); if (dSol < 150) { this.ferir(30 * dt); N.vx += N.x / dSol * 200 * dt; N.vy += N.y / dSol * 200 * dt; if (Math.random() < 0.05) UI.toast('Perto demais da estrela!', '#ff8040'); }
    if (dSol > 4200) { N.vx -= N.x / dSol * 120 * dt; N.vy -= N.y / dSol * 120 * dt; }
    // canhões
    N.cd -= dt;
    if (Input.fire && N.cd <= 0) { N.cd = 0.22; for (const o of [-5, 5]) { const px = -Math.sin(N.ang) * o, py = Math.cos(N.ang) * o; this.tiros.push({ x: N.x + Math.cos(N.ang) * 14 + px, y: N.y + Math.sin(N.ang) * 14 + py, vx: Math.cos(N.ang) * 560 + N.vx, vy: Math.sin(N.ang) * 560 + N.vy, vida: 0.9, dono: 'eu', dano: s.canhao, cor: '#60e0ff' }); } Som.laser(); }
    // piratas e mercadores
    const est = Galaxia.posEstacao(S, P.tempo);
    this.pirT -= dt;
    if (this.pirT <= 0) { this.pirT = 22 + Math.random() * 20; if (this.ents.filter(e => e.tipo === 'pirata').length < 2 + (S.id === 'ishar' ? 1 : 0) && dist(N.x, N.y, est.x, est.y) > 800) { const a = Math.random() * Math.PI * 2; this.ents.push({ tipo: 'pirata', x: N.x + Math.cos(a) * 520, y: N.y + Math.sin(a) * 520, vx: 0, vy: 0, ang: a + Math.PI, hp: 40 * this.nivel(), max: 40 * this.nivel(), cd: 2 }); UI.toast('⚠ Piratas no radar!', '#ff8080'); } }
    this.merT -= dt;
    if (this.merT <= 0) { this.merT = 18 + Math.random() * 12; if (this.ents.filter(e => e.tipo === 'mercante').length < 2) { const pl = S.planetas, a = Galaxia.pos(pl[Math.floor(Math.random() * pl.length)], P.tempo), b = Galaxia.pos(pl[Math.floor(Math.random() * pl.length)], P.tempo); this.ents.push({ tipo: 'mercante', x: a.x, y: a.y, tx: b.x, ty: b.y, ang: Math.atan2(b.y - a.y, b.x - a.x), hp: 60 }); } }
    for (let i = this.ents.length - 1; i >= 0; i--) {
      const e = this.ents[i];
      if (e.tipo === 'ast') { e.a += e.rot * dt; if (dist(e.x, e.y, N.x, N.y) < e.r + 10) { const a = Math.atan2(N.y - e.y, N.x - e.x); N.vx = Math.cos(a) * 120; N.vy = Math.sin(a) * 120; this.ferir(6); } continue; }
      if (e.tipo === 'mercante') { const d = dist(e.x, e.y, e.tx, e.ty); if (d < 30) { this.ents.splice(i, 1); continue; } e.ang = Math.atan2(e.ty - e.y, e.tx - e.x); e.x += Math.cos(e.ang) * 60 * dt; e.y += Math.sin(e.ang) * 60 * dt; continue; }
      if (e.tipo === 'pirata') {
        const d = dist(e.x, e.y, N.x, N.y), alvo = Math.atan2(N.y - e.y, N.x - e.x) + (d < 180 ? 1.2 : 0);
        e.ang += clamp(angDiff(e.ang, alvo), -2.4 * dt, 2.4 * dt);
        const ac = d > 160 ? 220 : 90; e.vx += Math.cos(e.ang) * ac * dt; e.vy += Math.sin(e.ang) * ac * dt; const vv = Math.hypot(e.vx, e.vy); if (vv > 190) { e.vx *= 190 / vv; e.vy *= 190 / vv; }
        e.vx *= Math.pow(0.7, dt); e.vy *= Math.pow(0.7, dt); e.x += e.vx * dt; e.y += e.vy * dt;
        e.cd -= dt; const mira = Math.abs(angDiff(e.ang, Math.atan2(N.y - e.y, N.x - e.x)));
        if (e.cd <= 0 && d < 430 && mira < 0.4) { e.cd = 1.1 + Math.random() * 0.6; this.tiros.push({ x: e.x + Math.cos(e.ang) * 12, y: e.y + Math.sin(e.ang) * 12, vx: Math.cos(e.ang) * 380, vy: Math.sin(e.ang) * 380, vida: 1.3, dono: 'pirata', dano: 7 * this.nivel(), cor: '#ff5040' }); Som.laser(0.6); }
        if (d > 1600) this.ents.splice(i, 1);
      }
    }
    // tiros
    for (let i = this.tiros.length - 1; i >= 0; i--) {
      const t = this.tiros[i]; t.x += t.vx * dt; t.y += t.vy * dt; t.vida -= dt; let morto = t.vida <= 0;
      if (!morto && t.dono === 'pirata' && dist(t.x, t.y, N.x, N.y) < 12) { this.ferir(t.dano); morto = true; this.explosao(t.x, t.y, '#ff6040', 5, 40); }
      if (!morto && t.dono === 'eu') for (const e of this.ents) { if (e.tipo === 'mercante') continue; const rr = e.tipo === 'ast' ? e.r : 13; if (dist(t.x, t.y, e.x, e.y) < rr) { morto = true; e.hp -= e.tipo === 'ast' ? 1 : t.dano; this.explosao(t.x, t.y, e.tipo === 'ast' ? '#9a8a7a' : '#ff8040', 4, 40); if (e.hp <= 0) this.destruir(e); break; } }
      if (morto) this.tiros.splice(i, 1);
    }
    // itens flutuando
    for (let i = this.coletas.length - 1; i >= 0; i--) { const c = this.coletas[i]; c.x += c.vx * dt; c.y += c.vy * dt; c.vx *= 0.98; c.vy *= 0.98; const d = dist(c.x, c.y, N.x, N.y); if (d < 70) { c.x += (N.x - c.x) * 3 * dt; c.y += (N.y - c.y) * 3 * dt; } if (d < 14) { this.coletas.splice(i, 1); if (c.creditos) { P.creditos += c.creditos; UI.toast(`+${c.creditos} créditos`, '#ffd040'); } else this.dar(c.id, c.n); Som.pega(); } }
    // o que há por perto para a ação
    this.alvo = null;
    for (const pl of S.planetas) { const q = Galaxia.pos(pl, P.tempo), d = dist(q.x, q.y, N.x, N.y); if (d < pl.r + 46) this.alvo = BIOMAS[pl.bioma].semSolo ? { k: 'gas', pl, txt: `Coletar gás de ${pl.nome} (combustível)` } : { k: 'pousar', pl, txt: `Pousar em ${pl.nome}` }; }
    if (dist(est.x, est.y, N.x, N.y) < 80) this.alvo = { k: 'estacao', txt: `Atracar na ${S.estacao}` };
    // câmera à frente da nave
    const cx = N.x + N.vx * 0.35 - this.vw / 2, cy = N.y + N.vy * 0.35 - this.vh / 2;
    this.cam.x += (cx - this.cam.x) * Math.min(1, dt * 5); this.cam.y += (cy - this.cam.y) * Math.min(1, dt * 5);
  },
  nivel() { const i = SISTEMAS.findIndex(s => s.id === this.P.sistema); return [1, 1.4, 1.9][i] || 1; },
  destruir(e) {
    const i = this.ents.indexOf(e); if (i >= 0) this.ents.splice(i, 1);
    Som.boom(); this.explosao(e.x, e.y, e.tipo === 'ast' ? '#9a8a7a' : '#ff8040', 22, 120); this.shake = 4;
    if (e.tipo === 'ast') { const r = Math.random(); this.coletas.push({ x: e.x, y: e.y, vx: (Math.random() - 0.5) * 40, vy: (Math.random() - 0.5) * 40, id: r < 0.5 ? 'sucata' : ['cristal_laranja', 'cristal_azul', 'cristal_violeta', 'cristal_vermelho'][Math.floor(Math.random() * 4)], n: 1 }); return; }
    if (e.tipo === 'pirata') {
      this.P.piratas++; Missoes.evento('pirata');
      this.coletas.push({ x: e.x, y: e.y, vx: 20, vy: -10, id: 'sucata', n: 1 + Math.floor(Math.random() * 2) }, { x: e.x, y: e.y, vx: -20, vy: 10, creditos: Math.round((60 + Math.random() * 80) * this.nivel()) });
      UI.toast('Pirata destruído!', '#ffe080');
    }
  },
  morreuNave() {
    const P = this.P, S = Galaxia.sistema(P.sistema), s = this.st(), est = Galaxia.posEstacao(S, P.tempo), perda = Math.floor(P.creditos * 0.15);
    P.creditos -= perda; P.casco = s.maxCasco * 0.5; P.escudo = s.maxEscudo;
    this.explosao(this.nave.x, this.nave.y, '#ff8040', 40, 160); Som.boom();
    UI.centro('NAVE DESTRUÍDA', `O rebocador levou você para a ${S.estacao} (−${perda} créditos)`);
    this.espaco({ x: est.x + 90, y: est.y });
  },
  saltar(sid) {
    const P = this.P; if (sid === P.sistema) return;
    if (P.comb < 15) return UI.toast('Combustível insuficiente para o salto (15).', '#ff8080');
    P.comb -= 15; UI.fechar(); this.hiper = 1.3; this.hiperPara = sid; Som.salto();
  },
  // =============== PLANETA ===============
  pousar(pl, direto) {
    const P = this.P;
    if (!direto) { if (P.comb < 2) return UI.toast('Combustível insuficiente para pousar (2).', '#ff8080'); P.comb -= 2; }
    this.modo = 'planeta'; P.planeta = pl.id; P.sistema = Galaxia.sistemaDe(pl.id).id;
    if (!P.visitados.includes(pl.id)) P.visitados.push(pl.id);
    const sol = this.solo = Galaxia.solo(pl); this.pl = pl;
    const mn = P.minerados[pl.id] || []; for (const i of mn) sol.O[i] = null;
    this.chao = this.renderChao(pl, sol);
    this.ents = []; this.tiros = []; this.coletas = []; this.parts = [];
    this.eu = { x: (sol.pista.x + 2) * 16 + 8, y: (sol.pista.y) * 16 + 8, dir: 'down', anim: 0, r: 5, cd: 0 };
    // moradores
    const R = RACAS[pl.raca], rng = new RNG(hashStr(pl.id) + 5), cx = SOLO / 2, cy = SOLO / 2;
    const gente = (x, y, papel, nome) => { const look = { raca: pl.raca, pele: rng.pick(R.pele), cabelo: R.cabelo ? rng.pick(R.cabelo) : null, roupa: rng.pick(['#5a4a6a', '#4a6a5a', '#7a5a3a', '#3a4a6a', '#6a3a3a', '#5a5a5a']), luz: rng.pick(['#60e0ff', '#ffd040', '#ff6060', '#80ff80']) }; this.ents.push({ tipo: 'npc', papel, nome, x: x * 16 + 8, y: y * 16 + 8, hx: x * 16 + 8, hy: y * 16 + 8, dir: 'down', anim: 0, r: 5, look, wT: rng.range(0, 3) }); };
    gente(cx + 7, cy - 5, 'mercador', 'Mercador ' + this.nomeAlien(rng));
    gente(cx, cy - 2, 'chefe', 'Chefe ' + this.nomeAlien(rng));
    for (let i = 0; i < 7; i++) gente(cx + rng.int(-9, 9), cy + rng.int(-5, 6), 'cidadao', this.nomeAlien(rng));
    if (rng.chance(0.7)) { const outra = rng.pick(Object.keys(RACAS).filter(k => k !== pl.raca)), RR = RACAS[outra]; this.ents.push({ tipo: 'npc', papel: 'viajante', nome: 'Viajante ' + RR.nome, x: (cx + 3) * 16, y: (cy + 5) * 16, hx: (cx + 3) * 16, hy: (cy + 5) * 16, dir: 'down', anim: 0, r: 5, look: { raca: outra, pele: RR.pele[1], roupa: '#4a5a7a', capacete: true }, wT: 1, raca: outra }); }
    for (let i = 0; i < 16; i++) this.criarFera(rng);
    UI.local(); Missoes.evento('pouso', pl.id); this.salvar();
    if (!direto) UI.centro(pl.nome.toUpperCase(), `${BIOMAS[pl.bioma].nome} • ${RACAS[pl.raca].plural}`);
  },
  nomeAlien(rng) { const s = ['Ka', 'Zor', 'Vel', 'Mu', 'Tha', 'Xi', 'Ru', 'Lo', 'Gre', 'Nak', 'Ish', 'Om', 'Pra', 'Dru', 'Ae'], f = ['rin', 'gul', 'ax', 'eth', 'om', 'ira', 'uk', 'ael', 'tis', 'mon', 'ra', 'zek']; return rng.pick(s) + rng.pick(f); },
  criarFera(rng) {
    const sol = this.solo, B = sol.B, cx = SOLO / 2, cy = SOLO / 2;
    for (let k = 0; k < 30; k++) {
      const x = rng.int(4, SOLO - 5), y = rng.int(4, SOLO - 5); if (dist(x, y, cx, cy) < 20 || this.solido(x, y)) continue;
      if (this.eu && dist(x * 16, y * 16, this.eu.x, this.eu.y) < 220) continue;
      const [tipo, cor] = rng.pick(B.fauna), lv = this.nivel();
      const base = { rastejante: [30, 9, 58], gosma: [26, 7, 38], voador: [20, 7, 82], fera: [55, 13, 66], golem: [90, 16, 40] }[tipo];
      this.ents.push({ tipo: 'fera', especie: tipo, cor, x: x * 16 + 8, y: y * 16 + 8, hx: x * 16 + 8, hy: y * 16 + 8, hp: base[0] * lv, max: base[0] * lv, dano: base[1] * lv, vel: base[2], r: tipo === 'golem' || tipo === 'fera' ? 8 : 6, dir: 'right', anim: 0, cd: 0, wT: 0, voa: tipo === 'voador' });
      return;
    }
  },
  solido(tx, ty) { const S = this.solo; if (tx < 0 || ty < 0 || tx >= SOLO || ty >= SOLO) return true; const i = ty * SOLO + tx; return S.T[i] === 2 || T_SOLIDO.has(S.O[i]); },
  colide(x, y, r) { for (const [dx, dy] of [[-r, -r * 0.5], [r, -r * 0.5], [-r, r * 0.4], [r, r * 0.4]]) if (this.solido(Math.floor((x + dx) / 16), Math.floor((y + dy) / 16))) return true; return false; },
  mover(a, dx, dy) { if (a.voa) { a.x += dx; a.y += dy; return; } if (!this.colide(a.x + dx, a.y, a.r)) a.x += dx; if (!this.colide(a.x, a.y + dy, a.r)) a.y += dy; },
  renderChao(pl, sol) {
    const c = Px.cv(SOLO * 16, SOLO * 16), x = c.getContext('2d');
    for (let ty = 0; ty < SOLO; ty++) for (let tx = 0; tx < SOLO; tx++) { const t = sol.T[ty * SOLO + tx]; x.drawImage(Arte.tile(pl.bioma, t, (tx * 7 + ty * 13) % 3), tx * 16, ty * 16); }
    // bordas suaves entre líquido e chão
    x.fillStyle = 'rgba(0,0,0,0.18)'; for (let ty = 1; ty < SOLO; ty++) for (let tx = 0; tx < SOLO; tx++) if (sol.T[ty * SOLO + tx] === 2 && sol.T[(ty - 1) * SOLO + tx] !== 2) x.fillRect(tx * 16, ty * 16, 16, 3);
    // marcas da pista de pouso
    const p = sol.pista; x.fillStyle = '#ffd040'; for (let i = -3; i <= 3; i++) { x.fillRect((p.x + i) * 16 + 6, (p.y - 2) * 16 + 2, 4, 2); x.fillRect((p.x + i) * 16 + 6, (p.y + 2) * 16 + 12, 4, 2); }
    return c;
  },
  updPlaneta(dt) {
    const P = this.P, E = this.eu, s = this.st(), m = Input.move;
    if (m.mag > 0.15) { const v = s.velPe * (0.5 + 0.5 * m.mag); this.mover(E, m.x * v * dt, m.y * v * dt); E.anim += dt; E.andando = true; E.dir = Math.abs(m.x) > Math.abs(m.y) ? (m.x > 0 ? 'right' : 'left') : (m.y > 0 ? 'down' : 'up'); E.face = Math.atan2(m.y, m.x); } else E.andando = false;
    // blaster (mira automática na criatura mais perto)
    E.cd -= dt;
    if (Input.fire && E.cd <= 0) {
      E.cd = 0.28;
      let alvo = null, bd = 160; for (const e of this.ents) if (e.tipo === 'fera' && !e.morto) { const d = dist(e.x, e.y, E.x, E.y); if (d < bd) { bd = d; alvo = e; } }
      const a = alvo ? Math.atan2(alvo.y - 6 - (E.y - 10), alvo.x - E.x) : (E.face !== undefined ? E.face : { right: 0, left: Math.PI, up: -Math.PI / 2, down: Math.PI / 2 }[E.dir]);
      if (alvo) E.dir = Math.abs(Math.cos(a)) > Math.abs(Math.sin(a)) ? (Math.cos(a) > 0 ? 'right' : 'left') : (Math.sin(a) > 0 ? 'down' : 'up');
      this.tiros.push({ x: E.x + Math.cos(a) * 8, y: E.y - 10 + Math.sin(a) * 8, vx: Math.cos(a) * 320, vy: Math.sin(a) * 320, vida: 0.7, dono: 'eu', dano: s.dano, cor: '#60e0ff' }); Som.laser(0.8);
    }
    // criaturas e moradores
    for (let i = this.ents.length - 1; i >= 0; i--) {
      const e = this.ents[i];
      if (e.morto) { e.morto -= dt; if (e.morto <= 0) this.ents.splice(i, 1); continue; }
      if (e.tipo === 'npc') {
        if (e.papel === 'cidadao' || e.papel === 'viajante') { e.wT -= dt; if (e.wT <= 0) { e.wT = 2 + Math.random() * 4; e.alvo = Math.random() < 0.6 ? { x: e.hx + (Math.random() - 0.5) * 120, y: e.hy + (Math.random() - 0.5) * 90 } : null; } }
        if (e.alvo) { const d = dist(e.x, e.y, e.alvo.x, e.alvo.y); if (d < 3) e.alvo = null; else { const a = Math.atan2(e.alvo.y - e.y, e.alvo.x - e.x); this.mover(e, Math.cos(a) * 26 * dt, Math.sin(a) * 26 * dt); e.anim += dt; e.dir = Math.abs(Math.cos(a)) > Math.abs(Math.sin(a)) ? (Math.cos(a) > 0 ? 'right' : 'left') : (Math.sin(a) > 0 ? 'down' : 'up'); } }
        continue;
      }
      // fera
      const d = dist(e.x, e.y, E.x, E.y); e.cd -= dt;
      const naCidade = Math.abs(e.x / 16 - SOLO / 2) < 13 && Math.abs(e.y / 16 - SOLO / 2) < 10;
      if (d < 130 && !naCidade || e.bravo > 0) {
        if (e.bravo > 0) e.bravo -= dt;
        const a = Math.atan2(E.y - e.y, E.x - e.x);
        if (d > e.r + 7) { this.mover(e, Math.cos(a) * e.vel * dt, Math.sin(a) * e.vel * dt); e.anim += dt; }
        else if (e.cd <= 0) { e.cd = 1.1; this.ferir(e.dano); Som.mordida(); E.x += Math.cos(a) * 6; E.y += Math.sin(a) * 6; }
        e.dir = Math.cos(a) < 0 ? 'left' : 'right';
      } else {
        e.wT -= dt; if (e.wT <= 0) { e.wT = 2 + Math.random() * 3; e.alvo = { x: e.hx + (Math.random() - 0.5) * 140, y: e.hy + (Math.random() - 0.5) * 140 }; }
        if (e.alvo) { const dd = dist(e.x, e.y, e.alvo.x, e.alvo.y); if (dd > 3) { const a = Math.atan2(e.alvo.y - e.y, e.alvo.x - e.x); this.mover(e, Math.cos(a) * e.vel * 0.35 * dt, Math.sin(a) * e.vel * 0.35 * dt); e.anim += dt; e.dir = Math.cos(a) < 0 ? 'left' : 'right'; } }
      }
    }
    if (this.ents.filter(e => e.tipo === 'fera' && !e.morto).length < 12 && Math.random() < dt * 0.15) this.criarFera(new RNG(Math.random() * 1e9));
    // tiros do blaster
    for (let i = this.tiros.length - 1; i >= 0; i--) {
      const t = this.tiros[i]; t.x += t.vx * dt; t.y += t.vy * dt; t.vida -= dt; let morto = t.vida <= 0 || this.solido(Math.floor(t.x / 16), Math.floor((t.y + 10) / 16));
      if (!morto) for (const e of this.ents) { if (e.tipo !== 'fera' || e.morto) continue; if (Math.abs(e.x - t.x) < e.r + 4 && Math.abs(e.y - 8 - t.y) < e.r + 8) { morto = true; e.hp -= t.dano; e.bravo = 6; e.flash = 0.1; this.explosao(t.x, t.y, e.cor, 4, 40); if (e.hp <= 0) this.matarFera(e); break; } }
      if (morto) { if (t.vida > 0) this.explosao(t.x, t.y, '#60e0ff', 3, 30); this.tiros.splice(i, 1); }
    }
    // o que dá para fazer aqui
    this.alvo = null;
    const sol = this.solo, ex = Math.floor(E.x / 16), ey = Math.floor(E.y / 16);
    if (dist(E.x, E.y, sol.pista.x * 16 + 8, sol.pista.y * 16 + 8) < 34) this.alvo = { k: 'decolar', txt: 'Decolar' };
    for (let dy = -1; dy <= 1 && !this.alvo; dy++) for (let dx = -1; dx <= 1; dx++) { const i = (ey + dy) * SOLO + ex + dx; if (sol.O[i] === 'cristal') { this.alvo = { k: 'minerar', i, txt: 'Minerar ' + ITENS[sol.B.cristal].nome }; break; } }
    let bn = 26; for (const e of this.ents) if (e.tipo === 'npc') { const d = dist(e.x, e.y, E.x, E.y); if (d < bn) { bn = d; this.alvo = { k: 'falar', e, txt: 'Falar: ' + e.nome }; } }
    // câmera
    const cx = clamp(E.x - this.vw / 2, 0, SOLO * 16 - this.vw), cy = clamp(E.y - 10 - this.vh / 2, 0, SOLO * 16 - this.vh);
    this.cam.x += (cx - this.cam.x) * Math.min(1, dt * 8); this.cam.y += (cy - this.cam.y) * Math.min(1, dt * 8);
  },
  matarFera(e) {
    e.morto = 0.5; this.P.abates++; Som.boom(0.5); this.explosao(e.x, e.y - 6, e.cor, 14, 70);
    if (Math.random() < 0.55) this.dar('amostra', 1);
    if (Math.random() < 0.3) { const c = Math.round(10 + Math.random() * 20 * this.nivel()); this.P.creditos += c; UI.toast(`+${c} créditos`, '#ffd040'); }
    Missoes.evento('fera', this.pl.id);
  },
  morreu() {
    const P = this.P, s = this.st(), perda = Math.floor(P.creditos * 0.1);
    P.creditos -= perda; P.vida = s.maxVida; P.escudo = s.maxEscudo;
    const sol = this.solo; this.eu.x = (sol.pista.x + 2) * 16 + 8; this.eu.y = sol.pista.y * 16 + 8; this.invuln = 2;
    UI.centro('VOCÊ DESMAIOU', `Os médicos da colônia cuidaram de você (−${perda} créditos)`);
  },
  // ---------- o botão de ação ----------
  acao() {
    if (this.estado !== 'jogo' || UI.aberto()) return;
    const a = this.alvo; if (!a) return;
    const P = this.P;
    if (a.k === 'pousar') { this.fade(() => this.pousar(a.pl)); Som.salto(0.5); }
    else if (a.k === 'gas') { const agora = P.tempo; if (this.gasT && agora - this.gasT < 40) return UI.toast('Os coletores ainda estão processando o gás...', '#ffd080'); this.gasT = agora; const s = this.st(); P.comb = Math.min(s.maxComb, P.comb + 15); UI.toast('+15 de combustível coletado das nuvens de ' + a.pl.nome, '#ffe080'); }
    else if (a.k === 'estacao') { this.nave.vx = this.nave.vy = 0; Missoes.checar(); UI.estacao(); this.salvar(); }
    else if (a.k === 'decolar') { const S = Galaxia.sistemaDe(P.planeta), pl = Galaxia.planeta(P.planeta), q = Galaxia.pos(pl, P.tempo); this.fade(() => this.espaco({ x: q.x + pl.r + 60, y: q.y })); Som.salto(0.5); }
    else if (a.k === 'minerar') { const sol = this.solo; sol.O[a.i] = null; (P.minerados[this.pl.id] = P.minerados[this.pl.id] || []).push(a.i); this.dar(sol.B.cristal, 1 + (Math.random() < 0.4 ? 1 : 0)); Som.pega(); this.explosao((a.i % SOLO) * 16 + 8, Math.floor(a.i / SOLO) * 16 + 8, ITENS[sol.B.cristal].cor, 12, 60); }
    else if (a.k === 'falar') UI.falar(a.e);
  },
  fade(fn) { const f = document.getElementById('fade'); f.classList.add('on'); setTimeout(() => { fn(); f.classList.remove('on'); }, 350); },
  // ---------- quadro a quadro ----------
  frame(dt) {
    const ctx = this.ctx;
    if (this.estado !== 'jogo' || !this.P) { this.desenharFundoTitulo(ctx, dt); return; }
    Input.update();
    const pausa = UI.aberto();
    if (!pausa) {
      this.t += dt; this.P.tempo += dt; if (this.invuln > 0) this.invuln -= dt; if (this.flash > 0) this.flash -= dt;
      const s = this.st(), P = this.P; this.semDano = (this.semDano || 0) + dt; if (this.semDano > 3 && P.escudo < s.maxEscudo) P.escudo = Math.min(s.maxEscudo, P.escudo + s.regen * dt);
      if (this.hiper > 0) { this.hiper -= dt; if (this.hiper <= 0) { this.P.sistema = this.hiperPara; const sn = Galaxia.sistema(this.hiperPara); this.espaco({ x: 1500, y: -200 }); UI.centro(sn.nome.toUpperCase(), 'Salto estelar concluído'); } }
      else if (this.modo === 'espaco') this.updEspaco(dt); else this.updPlaneta(dt);
      for (let i = this.parts.length - 1; i >= 0; i--) { const q = this.parts[i]; q.x += q.vx * dt; q.y += q.vy * dt; q.vx *= 0.94; q.vy *= 0.94; q.vida -= dt; if (q.vida <= 0) this.parts.splice(i, 1); }
      this.autoT = (this.autoT || 0) + dt; if (this.autoT > 30) { this.autoT = 0; this.salvar(); }
    }
    if (this.shake > 0) this.shake = Math.max(0, this.shake - dt * 12);
    const sx = this.shake ? (Math.random() - 0.5) * this.shake : 0, sy = this.shake ? (Math.random() - 0.5) * this.shake : 0;
    ctx.save(); ctx.translate(Math.round(sx), Math.round(sy));
    if (this.modo === 'espaco') Desenho.espaco(ctx); else Desenho.planeta(ctx);
    ctx.restore();
    if (this.flash > 0) { ctx.fillStyle = `rgba(255,60,60,${this.flash * 2})`; ctx.fillRect(0, 0, this.vw, this.vh); }
    UI.hud(dt);
  },
  desenharFundoTitulo(ctx, dt) {
    this.t += dt; ctx.fillStyle = '#05060e'; ctx.fillRect(0, 0, this.vw, this.vh);
    Desenho.estrelas(ctx, this.t * 30, this.t * 6);
    const pl = SISTEMAS[0].planetas[0], img = Arte.planeta(pl); ctx.drawImage(img, Math.round(this.vw * 0.72 - img.width / 2), Math.round(this.vh * 0.62 - img.height / 2));
    const n = Arte.nave('jogador', '#c8d0e0'), k = Math.floor(((Math.sin(this.t * 0.5) * 0.3) / (Math.PI * 2) * 32 + 32)) % 32, im = n[k];
    ctx.drawImage(im, Math.round(this.vw * 0.3 - im.width / 2), Math.round(this.vh * 0.6 + Math.sin(this.t) * 4 - im.height / 2));
  }
};

// ---------- desenho ----------
const Desenho = {
  estrelas(ctx, cx, cy) {
    for (const [cam, cel, n, cores] of [[0.1, 64, 3, ['#4a5070', '#6a6a90']], [0.3, 80, 3, ['#9098c0', '#c0c8e8']], [0.6, 120, 2, ['#ffffff', '#ffe0b0', '#b0d0ff']]]) {
      const ox = cx * cam, oy = cy * cam, x0 = Math.floor(ox / cel), y0 = Math.floor(oy / cel), nx = Math.ceil(J.vw / cel) + 1, ny = Math.ceil(J.vh / cel) + 1;
      for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) for (let k = 0; k < n; k++) {
        const gx = x0 + i, gy = y0 + j, h = hash2(gx, gy, k * 31 + cel), h2 = hash2(gx, gy, k * 17 + 5);
        const x = Math.round(gx * cel + h * cel - ox), y = Math.round(gy * cel + h2 * cel - oy);
        ctx.fillStyle = cores[(h * 100 | 0) % cores.length]; ctx.fillRect(x, y, 1, 1);
        if (cam > 0.5 && h > 0.92) { ctx.fillRect(x - 1, y, 3, 1); ctx.fillRect(x, y - 1, 1, 3); }
      }
    }
  },
  espaco(ctx) {
    const P = J.P, S = Galaxia.sistema(P.sistema), cam = J.cam, vw = J.vw, vh = J.vh;
    ctx.fillStyle = '#04050c'; ctx.fillRect(0, 0, vw, vh);
    if (S.nebulosa) { const g = ctx.createRadialGradient(vw * 0.3 - cam.x * 0.05, vh * 0.4 - cam.y * 0.05, 10, vw * 0.3 - cam.x * 0.05, vh * 0.4 - cam.y * 0.05, vw * 0.9); g.addColorStop(0, 'rgba(160,40,120,0.35)'); g.addColorStop(0.5, 'rgba(60,20,90,0.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, vw, vh); }
    this.estrelas(ctx, cam.x, cam.y);
    if (J.hiper > 0) { ctx.strokeStyle = 'rgba(200,220,255,0.7)'; for (let i = 0; i < 80; i++) { const a = hash2(i, 1, 3) * Math.PI * 2, r0 = hash2(i, 2, 3) * vw * 0.6, L = (1.3 - J.hiper) * 260; ctx.beginPath(); ctx.moveTo(vw / 2 + Math.cos(a) * r0, vh / 2 + Math.sin(a) * r0); ctx.lineTo(vw / 2 + Math.cos(a) * (r0 + L), vh / 2 + Math.sin(a) * (r0 + L)); ctx.stroke(); } }
    // a estrela
    const sx = -cam.x, sy = -cam.y;
    if (sx > -400 && sx < vw + 400 && sy > -400 && sy < vh + 400) { const g = ctx.createRadialGradient(sx, sy, 20, sx, sy, 240); g.addColorStop(0, S.estrela); g.addColorStop(0.25, 'rgba(255,220,140,0.45)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(sx - 240, sy - 240, 480, 480); ctx.fillStyle = S.estrela; ctx.beginPath(); ctx.arc(sx, sy, 70 + Math.sin(J.t * 2) * 1.5, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(sx - 12, sy - 14, 34, 0, Math.PI * 2); ctx.globalAlpha = 0.5; ctx.fill(); ctx.globalAlpha = 1; }
    // órbitas
    ctx.strokeStyle = 'rgba(120,140,200,0.12)'; ctx.lineWidth = 1; for (const pl of S.planetas) { ctx.beginPath(); ctx.arc(sx, sy, pl.orbita, 0, Math.PI * 2); ctx.stroke(); }
    // planetas
    ctx.font = '10px VT323, monospace'; ctx.textAlign = 'center';
    for (const pl of S.planetas) {
      const q = Galaxia.pos(pl, P.tempo), x = q.x - cam.x, y = q.y - cam.y; if (x < -pl.r * 3 || x > vw + pl.r * 3 || y < -pl.r * 3 || y > vh + pl.r * 3) continue;
      const img = Arte.planeta(pl); ctx.drawImage(img, Math.round(x - img.width / 2), Math.round(y - img.height / 2));
      if (pl.anel) { const a = Arte.anel(pl); ctx.drawImage(a, Math.round(x - a.width / 2), Math.round(y - a.height / 2)); }
      ctx.fillStyle = '#000'; ctx.fillText(pl.nome, Math.round(x) + 1, Math.round(y + pl.r + 13)); ctx.fillStyle = pl.raca ? '#c0e8ff' : '#d8c8a0'; ctx.fillText(pl.nome, Math.round(x), Math.round(y + pl.r + 12));
    }
    // estação
    const est = Galaxia.posEstacao(S, P.tempo), ei = Arte.estacao(); ctx.save(); ctx.translate(Math.round(est.x - cam.x), Math.round(est.y - cam.y)); ctx.rotate(J.t * 0.1); ctx.drawImage(ei, -40, -40); ctx.restore();
    ctx.fillStyle = '#ffe080'; ctx.fillText(S.estacao, Math.round(est.x - cam.x), Math.round(est.y - cam.y + 50));
    // asteroides, naves, itens
    for (const e of J.ents) {
      const x = e.x - cam.x, y = e.y - cam.y; if (x < -40 || x > vw + 40 || y < -40 || y > vh + 40) continue;
      if (e.tipo === 'ast') { const img = Arte.asteroide(e.seed, e.r); ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(e.a); ctx.drawImage(img, -img.width / 2, -img.height / 2); ctx.restore(); continue; }
      const N = Arte.nave(e.tipo, e.tipo === 'pirata' ? '#8a2a2a' : '#8a7a5a'), k = ((Math.round(e.ang / (Math.PI * 2) * 32) % 32) + 32) % 32, im = N[k];
      ctx.drawImage(im, Math.round(x - im.width / 2), Math.round(y - im.height / 2));
      if (e.tipo === 'pirata' && e.hp < e.max) { ctx.fillStyle = '#100808'; ctx.fillRect(Math.round(x - 12), Math.round(y - 18), 24, 3); ctx.fillStyle = '#ff4040'; ctx.fillRect(Math.round(x - 11), Math.round(y - 17), Math.ceil(22 * e.hp / e.max), 1); }
    }
    for (const c of J.coletas) { const x = Math.round(c.x - cam.x), y = Math.round(c.y - cam.y), b = Math.sin(J.t * 6 + c.x) > 0; ctx.fillStyle = '#000'; ctx.fillRect(x - 3, y - 3, 7, 7); ctx.fillStyle = c.creditos ? '#ffd040' : ITENS[c.id].cor; ctx.fillRect(x - 2, y - 2, 5, 5); if (b) { ctx.fillStyle = '#fff'; ctx.fillRect(x - 1, y - 2, 1, 1); } }
    // a nave do jogador
    if (!(J.hiper > 0)) { const N = J.nave, Ns = Arte.nave('jogador', J.P.look.nave || '#c8d0e0'), k = ((Math.round(N.ang / (Math.PI * 2) * 32) % 32) + 32) % 32, im = Ns[k]; if (!(J.invuln > 0 && Math.floor(J.t * 20) % 2)) ctx.drawImage(im, Math.round(N.x - cam.x - im.width / 2), Math.round(N.y - cam.y - im.height / 2)); if (J.P.escudo > 0 && J.semDano < 0.3) { ctx.strokeStyle = 'rgba(100,200,255,0.6)'; ctx.beginPath(); ctx.arc(Math.round(N.x - cam.x), Math.round(N.y - cam.y), 17, 0, Math.PI * 2); ctx.stroke(); } }
    this.tirosEParts(ctx);
    // seta para a estação e missões fora da tela
    this.seta(ctx, est.x, est.y, '#ffe080');
    for (const e of J.ents) if (e.tipo === 'pirata') this.seta(ctx, e.x, e.y, '#ff5050');
  },
  seta(ctx, wx, wy, cor) {
    const cam = J.cam, x = wx - cam.x, y = wy - cam.y, vw = J.vw, vh = J.vh;
    if (x > 8 && y > 8 && x < vw - 8 && y < vh - 8) return;
    const a = Math.atan2(y - vh / 2, x - vw / 2), k = Math.min((vw / 2 - 12) / Math.max(1e-3, Math.abs(Math.cos(a))), (vh / 2 - 12) / Math.max(1e-3, Math.abs(Math.sin(a))));
    ctx.save(); ctx.translate(vw / 2 + Math.cos(a) * k, vh / 2 + Math.sin(a) * k); ctx.rotate(a); ctx.fillStyle = '#000'; ctx.beginPath(); ctx.moveTo(7, 0); ctx.lineTo(-5, -6); ctx.lineTo(-5, 6); ctx.fill(); ctx.fillStyle = cor; ctx.beginPath(); ctx.moveTo(5, 0); ctx.lineTo(-3, -4); ctx.lineTo(-3, 4); ctx.fill(); ctx.restore();
  },
  tirosEParts(ctx) {
    const cam = J.cam;
    for (const t of J.tiros) { const x = t.x - cam.x, y = t.y - cam.y, a = Math.atan2(t.vy, t.vx); ctx.strokeStyle = t.cor; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - Math.cos(a) * 7, y - Math.sin(a) * 7); ctx.stroke(); ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(x), Math.round(y), 1, 1); }
    for (const q of J.parts) { ctx.globalAlpha = Math.min(1, q.vida / q.v0 * 1.5); ctx.fillStyle = q.cor; ctx.fillRect(Math.round(q.x - cam.x), Math.round(q.y - cam.y), q.tam, q.tam); } ctx.globalAlpha = 1;
  },
  planeta(ctx) {
    const cam = J.cam, vw = J.vw, vh = J.vh, sol = J.solo, pl = J.pl, cx = Math.round(cam.x), cy = Math.round(cam.y);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, vw, vh);
    ctx.drawImage(J.chao, cx, cy, vw, vh, 0, 0, vw, vh);
    // brilho do líquido (lava ou água)
    const D = [];
    const tx0 = Math.max(0, Math.floor(cam.x / 16) - 2), ty0 = Math.max(0, Math.floor(cam.y / 16) - 1), tx1 = Math.min(SOLO - 1, Math.ceil((cam.x + vw) / 16) + 2), ty1 = Math.min(SOLO - 1, Math.ceil((cam.y + vh) / 16) + 3);
    for (let ty = ty0; ty <= ty1; ty++) for (let tx = tx0; tx <= tx1; tx++) {
      const o = sol.O[ty * SOLO + tx]; if (!o || o === 'bloco') continue;
      const img = Arte.objeto(pl.bioma, o); D.push({ y: ty * 16 + 15, img, x: tx * 16 + 8 - img.width / 2, yy: ty * 16 + 16 - img.height + (o === 'rocha' ? 1 : 0), brilho: o === 'cristal' });
    }
    for (const c of sol.cid) { const img = Arte.objeto(pl.bioma, c.k); D.push({ y: (c.y + 2) * 16, img, x: c.x * 16 - 2, yy: (c.y + 2) * 16 - img.height + 2 }); }
    // a nave pousada
    const np = Arte.navePousada(J.P.look.nave || '#c8d0e0'); D.push({ y: J.solo.pista.y * 16 + 14, img: np, x: J.solo.pista.x * 16 + 8 - np.width / 2, yy: J.solo.pista.y * 16 + 8 - np.height / 2 });
    for (const e of J.ents) D.push({ y: e.y, e });
    D.push({ y: J.eu.y, eu: true });
    D.sort((a, b) => a.y - b.y);
    for (const d of D) {
      if (d.img) { ctx.drawImage(d.img, Math.round(d.x - cx), Math.round(d.yy - cy)); if (d.brilho && Math.floor(J.t * 3 + d.x) % 5 === 0) { ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(d.x - cx + d.img.width / 2), Math.round(d.yy - cy + 4), 1, 1); } continue; }
      if (d.eu) { this.pessoa(ctx, J.eu, Object.assign({ capacete: true, arma: true }, J.P.look, { raca: J.P.raca }), cx, cy, J.invuln > 0 && Math.floor(J.t * 20) % 2); continue; }
      const e = d.e;
      if (e.tipo === 'npc') { this.pessoa(ctx, e, e.look, cx, cy); continue; }
      const f = e.morto ? 0 : 1 + (Math.floor(e.anim * 6) % 2), img0 = Arte.criatura(e.especie, e.cor, f);
      if (e.morto) ctx.globalAlpha = Math.max(0, e.morto * 2);
      const bob = e.voa ? Math.sin(J.t * 6 + e.x) * 2 - 10 : 0;
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(Math.round(e.x - cx - e.r), Math.round(e.y - cy - 1), e.r * 2, 2);
      if (e.dir === 'left') { ctx.save(); ctx.translate(Math.round(e.x - cx + img0.width / 2), Math.round(e.y - cy - img0.height + 2 + bob)); ctx.scale(-1, 1); ctx.drawImage(img0, 0, 0); ctx.restore(); }
      else ctx.drawImage(img0, Math.round(e.x - cx - img0.width / 2), Math.round(e.y - cy - img0.height + 2 + bob));
      ctx.globalAlpha = 1;
      if (!e.morto && e.hp < e.max) { ctx.fillStyle = '#100808'; ctx.fillRect(Math.round(e.x - cx - 9), Math.round(e.y - cy - img0.height - 4 + bob), 18, 3); ctx.fillStyle = '#e03030'; ctx.fillRect(Math.round(e.x - cx - 8), Math.round(e.y - cy - img0.height - 3 + bob), Math.ceil(16 * e.hp / e.max), 1); }
    }
    this.tirosEParts(ctx);
    if (sol.B.luz) { ctx.fillStyle = sol.B.luz; ctx.fillRect(0, 0, vw, vh); }
    // brilho da lava e dos cristais à noite não existe aqui: a luz do planeta já tinge tudo
  },
  pessoa(ctx, a, look, cx, cy, pisca) {
    const S = Arte.pessoa(look), f = a.andando || a.alvo ? 1 + (Math.floor(a.anim * 7) % 2) : 0, img = S[a.dir || 'down'][f];
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(Math.round(a.x - cx - 5), Math.round(a.y - cy), 10, 2);
    if (pisca) ctx.globalAlpha = 0.4;
    ctx.drawImage(img, Math.round(a.x - cx - img.width / 2), Math.round(a.y - cy - img.height + 2)); ctx.globalAlpha = 1;
  }
};

// ---------- som (sintetizado) ----------
const Som = {
  ctx: null,
  ac() { if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.ctx = null; } } return this.ctx; },
  bip(f0, f1, dur, tipo = 'square', vol = 0.05) { const a = this.ac(); if (!a) return; const o = a.createOscillator(), g = a.createGain(), t = a.currentTime; o.type = tipo; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur); },
  laser(v = 1) { this.bip(1200, 300, 0.09, 'square', 0.025 * v); },
  boom(v = 1) { this.bip(160, 40, 0.35, 'sawtooth', 0.06 * v); },
  pega() { this.bip(600, 1200, 0.1, 'triangle', 0.05); },
  mordida() { this.bip(220, 90, 0.12, 'sawtooth', 0.05); },
  salto(v = 1) { this.bip(100, 1400, 0.9, 'sine', 0.06 * v); }
};
