/* Modelos de jogos do Nexo: jogos completos feitos com o Nexo Motor.
 * A IA (ou o próprio usuário) só escolhe tipo, tema, nomes e dificuldade; o jogo sai sempre funcionando. */
'use strict';
const Modelos = (() => {
  const TEMAS = {
    neon: { nome: 'Neon', fundo: '#0b0820', fundo2: '#1a1240', chao: '#3a1d6e', heroi: '#22d3ee', inimigo: '#ff3d7f', item: '#ffe14d', destaque: '#f472b6', texto: '#ffffff' },
    floresta: { nome: 'Floresta', fundo: '#87ceeb', fundo2: '#5aa469', chao: '#3f7d20', heroi: '#e63946', inimigo: '#6a4c93', item: '#ffd60a', destaque: '#ffd60a', texto: '#ffffff' },
    deserto: { nome: 'Deserto', fundo: '#f6bd60', fundo2: '#e09f3e', chao: '#9c6644', heroi: '#1d3557', inimigo: '#9e2a2b', item: '#ffffff', destaque: '#fff3b0', texto: '#2b2d42' },
    gelo: { nome: 'Gelo', fundo: '#caf0f8', fundo2: '#90e0ef', chao: '#0077b6', heroi: '#ef476f', inimigo: '#3a0ca3', item: '#ffd166', destaque: '#03045e', texto: '#03045e' },
    inferno: { nome: 'Inferno', fundo: '#1a0000', fundo2: '#4a0404', chao: '#7f1d1d', heroi: '#facc15', inimigo: '#ef4444', item: '#22d3ee', destaque: '#fb923c', texto: '#ffffff' },
    espaco: { nome: 'Espaço', fundo: '#020617', fundo2: '#0f172a', chao: '#334155', heroi: '#38bdf8', inimigo: '#a3e635', item: '#fbbf24', destaque: '#38bdf8', texto: '#ffffff' },
    gameboy: { nome: 'Retrô (Game Boy)', fundo: '#9bbc0f', fundo2: '#8bac0f', chao: '#306230', heroi: '#0f380f', inimigo: '#306230', item: '#0f380f', destaque: '#0f380f', texto: '#0f380f' },
    doce: { nome: 'Doce', fundo: '#ffe5ec', fundo2: '#ffc2d1', chao: '#fb6f92', heroi: '#7b2cbf', inimigo: '#3a86ff', item: '#ffbe0b', destaque: '#c9184a', texto: '#590d22' },
  };
  const TIPOS = {
    plataforma: { nome: 'Plataforma (pular e correr)', emoji: '🏃', orientacao: 'paisagem', tema: 'floresta', heroi: 'Herói', inimigo: 'Gosma', item: 'Moeda' },
    nave: { nome: 'Nave (tiro espacial)', emoji: '🚀', orientacao: 'retrato', tema: 'espaco', heroi: 'Nave', inimigo: 'Alien', item: 'Energia' },
    cobrinha: { nome: 'Cobrinha', emoji: '🐍', orientacao: 'retrato', tema: 'gameboy', heroi: 'Cobrinha', inimigo: 'Parede', item: 'Fruta' },
    aventura: { nome: 'Aventura (espada, visão de cima)', emoji: '⚔️', orientacao: 'retrato', tema: 'floresta', heroi: 'Cavaleiro', inimigo: 'Monstro', item: 'Gema' },
    corrida: { nome: 'Corrida (desviar dos carros)', emoji: '🏎️', orientacao: 'retrato', tema: 'neon', heroi: 'Piloto', inimigo: 'Carro', item: 'Moeda' },
  };
  const PALAVRAS_TIPO = [
    ['nave', /nave|tiro|espa[çc]o|space|shooter|avi[ãa]o|alien|gal[áa]x|invasor|shmup/i],
    ['cobrinha', /cobr|snake|minhoca|serpente/i],
    ['corrida', /corrida|carro|moto|estrada|race|racing|pista|f[óo]rmula|kart/i],
    ['aventura', /rpg|aventura|zelda|espada|masmorra|dungeon|guerreir|cavaleir|samurai|monstros|vis[ãa]o de cima|top.?down/i],
    ['plataforma', /plataforma|pul(o|ar)|mario|sonic|correr|corredor|runner|ninja|pixel ?art|2d/i],
  ];
  const PALAVRAS_TEMA = [
    ['espaco', /espa[çc]o|gal[áa]x|alien|planeta|estrela|c[óo]smic/i], ['floresta', /floresta|selva|mato|natureza|jardim/i],
    ['deserto', /deserto|areia|egito|faraó|faraó|western|velho oeste/i], ['gelo', /gelo|neve|inverno|polar|congelad/i],
    ['inferno', /inferno|fogo|lava|dem[ôo]ni|vulc|terror|sombr/i], ['neon', /neon|cyber|futur|synth|noite|ninja|rob[ôo]/i],
    ['gameboy', /game ?boy|retr[ôo]|antig|8.?bit|cl[áa]ssic/i], ['doce', /doce|fofo|kawaii|rosa|bala|chocolate|gatinh/i],
  ];
  function detectarTipo(texto) { for (const [t, r] of PALAVRAS_TIPO) if (r.test(texto || '')) return t; return null; }
  function detectarTema(texto) { for (const [t, r] of PALAVRAS_TEMA) if (r.test(texto || '')) return t; return null; }

  // junta o que a IA sugeriu com valores seguros
  function normalizar(c = {}) {
    const tipo = TIPOS[c.tipo] ? c.tipo : 'plataforma';
    const base = TIPOS[tipo];
    const tema = TEMAS[c.tema] ? c.tema : base.tema;
    const limpa = (s, n, d) => (typeof s === 'string' && s.trim() ? s.trim().replace(/[<>"`\\]/g, '').slice(0, n) : d);
    return {
      tipo, tema,
      titulo: limpa(c.titulo, 28, base.nome.split(' (')[0]),
      heroi: limpa(c.heroi, 16, base.heroi), inimigo: limpa(c.inimigo, 16, base.inimigo), item: limpa(c.item, 16, base.item),
      dificuldade: Math.max(1, Math.min(3, Math.round(+c.dificuldade || 2))),
      emoji: limpa(c.emoji, 4, base.emoji),
      cores: Object.assign({}, TEMAS[tema]),
    };
  }

  // ================= jogos (cada função roda dentro da página do jogo, com o motor) =================
  function JOGO_PLATAFORMA(C) {
    const N = Nexo, K = C.cores, W = 192, H = 144;
    N.iniciar({ largura: W, altura: H, borda: '#000' }); N.controles(['esq', 'dir', 'a']);
    const P = { h: K.heroi, d: N.misturar(K.heroi, '#000', 0.45), w: '#fff', k: '#111', s: '#f4c39b' };
    const heroiA = N.sprite(['...kkkk.', '..khhhhk', '..kkssss', '..kswksw', '...ssss.', '.kkhhhk.', 'k.hhhh.k', '..dhhd..', '..d..d..', '.kk..kk.'], P);
    const heroiB = N.sprite(['...kkkk.', '..khhhhk', '..kkssss', '..kswksw', '...ssss.', '.kkhhhk.', '.khhhhk.', '..dhhd..', '.d....d.', 'kk....kk'], P);
    const inim = N.sprite(['..kkkk..', '.kiiiik.', 'kiwkiwki', 'kiiiiiik', 'kieiieik', '.kkkkkk.'], { i: K.inimigo, e: N.misturar(K.inimigo, '#000', 0.4), w: '#fff', k: '#111' });
    const moeda = [N.sprite(['.kkk.', 'kycck', 'kcyck', 'kccck', '.kkk.'], { c: K.item, y: '#fff', k: '#111' }),
      N.sprite(['.kk.', 'kcyk', 'kcck', '.kk.'], { c: K.item, y: '#fff', k: '#111' })];
    const dif = C.dificuldade;
    let estado = 'titulo', heroi, plats, moedas, inimigos, camX, genX, pontos, bonus, vidas, recorde = N.recorde('plat', 0), invul, ultimoChao, t = 0;
    function novo() {
      heroi = { x: 20, y: 60, w: 8, h: 10, vx: 0, vy: 0, chao: false, virar: false, coyote: 0 };
      plats = [{ x: -40, y: 120, w: 220, h: 40 }]; moedas = []; inimigos = []; camX = 0; genX = 180; pontos = 0; bonus = 0; vidas = 3; invul = 0; ultimoChao = { x: 20, y: 100 };
      gerar();
    }
    function gerar() {
      while (genX < camX + W * 2) {
        const buraco = N.sorteio(18, 26 + dif * 8), y = N.sorteioInt(95, 125), larg = N.sorteioInt(50, 140);
        genX += buraco;
        const p = { x: genX, y, w: larg, h: H - y + 20 };
        plats.push(p);
        if (Math.random() < 0.45 + dif * 0.12 && larg > 60) inimigos.push({ x: p.x + larg / 2, y: y - 6, w: 8, h: 6, vx: (Math.random() < 0.5 ? -1 : 1) * (14 + dif * 6), p, vivo: true });
        for (let i = 0; i < N.sorteioInt(1, 3); i++) moedas.push({ x: p.x + 10 + i * 14, y: y - 18, w: 5, h: 5, ok: false });
        if (Math.random() < 0.5) { const fy = y - N.sorteioInt(30, 42), fx = p.x + N.sorteio(0, larg - 30); plats.push({ x: fx, y: fy, w: 34, h: 6, flut: true }); moedas.push({ x: fx + 14, y: fy - 9, w: 5, h: 5, ok: false }); }
        genX += larg;
      }
      plats = plats.filter(p => p.x + p.w > camX - 40); moedas = moedas.filter(m => m.x > camX - 20 && !m.ok); inimigos = inimigos.filter(e => e.x > camX - 20 && e.vivo);
    }
    function machucar() {
      if (invul > 0) return;
      vidas--; invul = 1.6; N.som('dano'); N.tremer(4); N.explodir(heroi.x + 4, heroi.y + 5, K.heroi, 14);
      if (vidas <= 0) { estado = 'fim'; recorde = N.recorde('plat', pontos); N.som('fim'); return; }
      heroi.x = ultimoChao.x; heroi.y = ultimoChao.y - 20; heroi.vy = 0;
    }
    function atualizar(dt) {
      t += dt;
      if (estado !== 'jogo') { if (N.querComecar()) { novo(); estado = 'jogo'; N.som('inicio'); } return; }
      const acel = 340, max = 70 + dif * 6;
      if (N.segurando('esq')) { heroi.vx -= acel * dt; heroi.virar = true; } else if (N.segurando('dir')) { heroi.vx += acel * dt; heroi.virar = false; } else heroi.vx *= Math.pow(0.0005, dt);
      heroi.vx = Math.max(-max, Math.min(max, heroi.vx));
      heroi.coyote -= dt;
      if ((N.apertou('a') || N.apertou('cima') || N.tocou()) && (heroi.chao || heroi.coyote > 0)) { heroi.vy = -175; heroi.chao = false; heroi.coyote = 0; N.som('pulo'); }
      if (!N.segurando('a') && !N.segurando('cima') && heroi.vy < -60) heroi.vy += 600 * dt;
      heroi.vy = Math.min(260, heroi.vy + 520 * dt);
      heroi.x += heroi.vx * dt;
      for (const p of plats) if (N.colide(heroi, p) && !p.flut) { if (heroi.vx > 0) heroi.x = p.x - heroi.w; else if (heroi.vx < 0) heroi.x = p.x + p.w; heroi.vx = 0; }
      const yAntes = heroi.y; heroi.y += heroi.vy * dt; heroi.chao = false;
      for (const p of plats) if (N.colide(heroi, p)) {
        if (heroi.vy >= 0 && yAntes + heroi.h <= p.y + 2) { heroi.y = p.y - heroi.h; heroi.vy = 0; heroi.chao = true; heroi.coyote = 0.1; if (!p.flut) ultimoChao = { x: Math.max(p.x + 4, Math.min(p.x + p.w - 12, heroi.x)), y: p.y }; }
        else if (!p.flut && heroi.vy < 0) { heroi.y = p.y + p.h; heroi.vy = 0; }
      }
      if (heroi.x < camX) heroi.x = camX;
      if (heroi.y > H + 20) machucar();
      camX = Math.max(camX, heroi.x - W * 0.4);
      pontos = Math.max(0, Math.floor(heroi.x / 10)) + bonus;
      for (const m of moedas) if (!m.ok && N.colide(heroi, m)) { m.ok = true; bonus += 10; N.som('moeda'); N.explodir(m.x + 2, m.y + 2, K.item, 6, 40); }
      for (const e of inimigos) {
        if (!e.vivo) continue;
        e.x += e.vx * dt;
        if (e.x < e.p.x || e.x + e.w > e.p.x + e.p.w) { e.vx *= -1; e.x = Math.max(e.p.x, Math.min(e.p.x + e.p.w - e.w, e.x)); }
        if (N.colide(heroi, e)) {
          if (heroi.vy > 0 && heroi.y + heroi.h - e.y < 6) { e.vivo = false; heroi.vy = -140; bonus += 25; N.som('explosao'); N.explodir(e.x + 4, e.y + 3, K.inimigo, 16); N.tremer(2); }
          else machucar();
        }
      }
      invul = Math.max(0, invul - dt);
      gerar();
    }
    function fundo() {
      N.ret(0, 0, W, H, K.fundo);
      const cor2 = K.fundo2;
      for (let i = -1; i < 5; i++) { const bx = i * 70 - (camX * 0.3) % 70; N.ctx.fillStyle = cor2; N.ctx.beginPath(); N.ctx.arc(bx + 35, 120, 40, Math.PI, 0); N.ctx.fill(); }
    }
    function desenhar() {
      fundo();
      if (estado === 'titulo') { N.telaTitulo(C.titulo, `${C.heroi} contra ${C.inimigo}s`, K); N.texto('◀ ▶ andar   A pular', W / 2, H * 0.78, { tam: 7, cor: K.texto }); N.texto('RECORDE ' + recorde, W / 2, 8, { tam: 7, cor: K.texto }); return; }
      const cx = Math.round(camX);
      for (const p of plats) { N.ret(p.x - cx, p.y, p.w, p.h, K.chao); N.ret(p.x - cx, p.y, p.w, 2, N.misturar(K.chao, '#fff', 0.35)); }
      for (const m of moedas) if (!m.ok) N.desenhar(moeda[Math.floor(t * 6 + m.x) % 2], m.x - cx, m.y + Math.sin(t * 5 + m.x) * 1.5);
      for (const e of inimigos) if (e.vivo) N.desenhar(inim, e.x - cx, e.y, e.vx > 0);
      if (!(invul > 0 && Math.floor(t * 12) % 2)) N.desenhar(Math.abs(heroi.vx) > 10 && heroi.chao && Math.floor(t * 10) % 2 ? heroiB : heroiA, heroi.x - cx, heroi.y, heroi.virar);
      N.texto('PONTOS ' + pontos, 4, 4, { tam: 7, alinhar: 'left', cor: K.texto });
      N.texto('♥'.repeat(Math.max(0, vidas)), W - 4, 4, { tam: 8, alinhar: 'right', cor: '#ff4d6d' });
      if (estado === 'fim') { N.ret(0, H * 0.25, W, 60, '#000b'); N.texto('FIM DE JOGO', W / 2, H * 0.3, { tam: 12, cor: K.destaque }); N.texto('PONTOS ' + pontos + '  RECORDE ' + recorde, W / 2, H * 0.3 + 18, { tam: 7 }); N.texto('toque para jogar de novo', W / 2, H * 0.3 + 32, { tam: 7 }); }
    }
    novo(); N.rodar(atualizar, desenhar);
  }

  function JOGO_NAVE(C) {
    const N = Nexo, K = C.cores, W = 144, H = 216;
    N.iniciar({ largura: W, altura: H }); N.controles(['esq', 'dir', 'a']);
    const nave = N.sprite(['....k....', '...khk...', '...khk...', '..khwhk..', '..khhhk..', '.khhhhhk.', 'khhdhdhhk', 'khk.k.khk', 'kk.....kk'], { h: K.heroi, d: N.misturar(K.heroi, '#000', 0.4), w: '#fff', k: '#111' });
    const alien = N.sprite(['..k...k..', '...kkk...', '.kiiiiik.', 'kiwiiiwik', 'kiiiiiiik', 'ki.kik.ik', '.k.....k.'], { i: K.inimigo, w: '#fff', k: '#111' });
    const chefe = N.sprite(['....kkkkkkk....', '..kkiiiiiiikk..', '.kiiiiiiiiiiik.', 'kiiwwiiiiiwwiik', 'kiiwkiiiiikwiik', 'kiiiiiiiiiiiiik', 'kiekekekekekeik', '.kiiiiiiiiiiik.', '..kik.kik.kik..', '...k...k...k...'],
      { i: K.inimigo, e: N.misturar(K.inimigo, '#000', 0.5), w: '#fff', k: '#111' });
    const poder = N.sprite(['.kkk.', 'kyyyk', 'kykyk', 'kyyyk', '.kkk.'], { y: K.item, k: '#111' });
    const dif = C.dificuldade;
    const estrelas = Array.from({ length: 50 }, () => ({ x: Math.random() * W, y: Math.random() * H, v: N.sorteio(10, 50) }));
    let estado = 'titulo', h, tiros, inimigos, balas, poderes, pontos, vidas, cad, spawn, nivel, boss, bombas, duplo, invul, recorde = N.recorde('nave', 0), t = 0;
    function novo() { h = { x: W / 2 - 4, y: H - 24, w: 9, h: 9 }; tiros = []; inimigos = []; balas = []; poderes = []; pontos = 0; vidas = 3; cad = 0; spawn = 1; nivel = 1; boss = null; bombas = 2; duplo = 0; invul = 0; }
    function dano() {
      if (invul > 0) return;
      vidas--; invul = 2; N.som('dano'); N.tremer(5); N.explodir(h.x + 4, h.y + 4, K.heroi, 20);
      if (vidas <= 0) { estado = 'fim'; recorde = N.recorde('nave', pontos); N.som('fim'); }
    }
    function atualizar(dt) {
      t += dt;
      for (const s of estrelas) { s.y += s.v * dt * (estado === 'jogo' ? 1 + nivel * 0.2 : 1); if (s.y > H) { s.y = 0; s.x = Math.random() * W; } }
      if (estado !== 'jogo') { if (N.querComecar()) { novo(); estado = 'jogo'; N.som('inicio'); } return; }
      const vel = 90;
      if (N.segurando('esq')) h.x -= vel * dt;
      if (N.segurando('dir')) h.x += vel * dt;
      if (N.posToque) h.x += Math.max(-vel * dt * 1.5, Math.min(vel * dt * 1.5, N.posToque.x - (h.x + 4)));
      h.x = Math.max(0, Math.min(W - h.w, h.x));
      cad -= dt;
      if (cad <= 0) { cad = duplo > 0 ? 0.16 : 0.24; tiros.push({ x: h.x + 3.5, y: h.y - 2, w: 2, h: 5 }); if (duplo > 0) { tiros.push({ x: h.x, y: h.y + 2, w: 2, h: 5, vx: -20 }); tiros.push({ x: h.x + 7, y: h.y + 2, w: 2, h: 5, vx: 20 }); } N.som('tiro'); }
      if (N.apertou('a') && bombas > 0) { bombas--; N.som('explosao'); N.tremer(6); for (const e of inimigos) { e.hp = 0; N.explodir(e.x + 4, e.y + 3, K.inimigo, 12); pontos += 10; } balas = []; if (boss) boss.hp -= 15; }
      duplo = Math.max(0, duplo - dt); invul = Math.max(0, invul - dt);
      for (const b of tiros) { b.y -= 220 * dt; b.x += (b.vx || 0) * dt; }
      tiros = tiros.filter(b => b.y > -10);
      spawn -= dt;
      if (!boss && spawn <= 0) {
        spawn = Math.max(0.35, 1.1 - nivel * 0.08 - dif * 0.12);
        const tipo = Math.random();
        inimigos.push({ x: N.sorteio(4, W - 13), y: -8, w: 9, h: 7, hp: 1 + Math.floor(nivel / 3), vy: 30 + nivel * 4 + dif * 6, zig: tipo < 0.35 ? N.sorteio(20, 50) : 0, atira: tipo > 0.75, cd: N.sorteio(0.5, 2), fase: Math.random() * 6 });
      }
      if (!boss && pontos >= nivel * 400) { boss = { x: W / 2 - 15, y: -24, w: 30, h: 20, hp: 30 + nivel * 15, max: 30 + nivel * 15, vx: 30, cd: 1 }; N.som('poder'); }
      for (const e of inimigos) {
        e.y += e.vy * dt; e.fase += dt * 3; if (e.zig) e.x += Math.cos(e.fase) * e.zig * dt;
        e.cd -= dt; if (e.atira && e.cd <= 0 && e.y < H * 0.7) { e.cd = 1.6; const a = Math.atan2(h.y - e.y, h.x - e.x); balas.push({ x: e.x + 4, y: e.y + 6, w: 3, h: 3, vx: Math.cos(a) * 70, vy: Math.sin(a) * 70 }); }
        if (N.colide(e, h)) { e.hp = 0; dano(); }
      }
      if (boss) {
        boss.y = Math.min(20, boss.y + 20 * dt); boss.x += boss.vx * dt; if (boss.x < 2 || boss.x > W - 32) boss.vx *= -1;
        boss.cd -= dt;
        if (boss.cd <= 0) { boss.cd = Math.max(0.5, 1.3 - dif * 0.2); for (let i = -2; i <= 2; i++) balas.push({ x: boss.x + 15, y: boss.y + 18, w: 3, h: 3, vx: i * 25, vy: 80 }); }
        if (N.colide(boss, h)) dano();
      }
      for (const b of tiros) {
        for (const e of inimigos) if (e.hp > 0 && N.colide(b, e)) { e.hp--; b.y = -99; if (e.hp <= 0) { pontos += 20; N.explodir(e.x + 4, e.y + 3, K.inimigo, 10); N.som('explosao'); if (Math.random() < 0.08) poderes.push({ x: e.x, y: e.y, w: 5, h: 5 }); } }
        if (boss && N.colide(b, boss)) { boss.hp--; b.y = -99; N.explodir(b.x, b.y + 99, '#fff', 2, 20); }
      }
      if (boss && boss.hp <= 0) { pontos += 300; N.explodir(boss.x + 15, boss.y + 10, K.inimigo, 60, 100); N.tremer(8); N.som('explosao'); boss = null; nivel++; poderes.push({ x: W / 2, y: 30, w: 5, h: 5 }); }
      inimigos = inimigos.filter(e => e.hp > 0 && e.y < H + 10);
      for (const b of balas) { b.x += b.vx * dt; b.y += b.vy * dt; if (N.colide(b, h)) { b.y = 999; dano(); } }
      balas = balas.filter(b => b.y < H + 5 && b.y > -5 && b.x > -5 && b.x < W + 5);
      for (const p of poderes) { p.y += 40 * dt; if (N.colide(p, h)) { p.y = 999; duplo = 8; bombas = Math.min(3, bombas + 1); N.som('poder'); pontos += 50; } }
      poderes = poderes.filter(p => p.y < H);
    }
    function desenhar() {
      N.ret(0, 0, W, H, K.fundo);
      for (const s of estrelas) N.ret(s.x, s.y, 1, s.v > 35 ? 2 : 1, s.v > 35 ? '#fff' : N.misturar(K.fundo, '#fff', 0.4));
      if (estado === 'titulo') { N.telaTitulo(C.titulo, `${C.heroi} contra ${C.inimigo}s`, K); N.texto('arraste ou ◀ ▶   A = bomba', W / 2, H * 0.75, { tam: 7, cor: K.texto }); N.texto('RECORDE ' + recorde, W / 2, 8, { tam: 7 }); return; }
      for (const b of tiros) N.ret(b.x, b.y, b.w, b.h, K.item);
      for (const e of inimigos) N.desenhar(alien, e.x, e.y);
      if (boss) { N.desenhar(chefe, boss.x, boss.y, false, 2); N.ret(20, 4, W - 40, 4, '#0008'); N.ret(20, 4, (W - 40) * boss.hp / boss.max, 4, K.inimigo); }
      for (const b of balas) N.ret(b.x, b.y, b.w, b.h, '#ff6b6b');
      for (const p of poderes) N.desenhar(poder, p.x, p.y);
      if (!(invul > 0 && Math.floor(t * 12) % 2)) N.desenhar(nave, h.x, h.y);
      N.ret(h.x + 3, h.y + 9, 3, 2 + Math.random() * 3, '#ffb703');
      N.texto(String(pontos), 4, boss ? 12 : 4, { tam: 7, alinhar: 'left' });
      N.texto('♥'.repeat(Math.max(0, vidas)) + '  ✹' + bombas, W - 4, boss ? 12 : 4, { tam: 7, alinhar: 'right', cor: '#ff4d6d' });
      if (estado === 'fim') { N.ret(0, H * 0.3, W, 56, '#000b'); N.texto('FIM DE JOGO', W / 2, H * 0.33, { tam: 12, cor: K.destaque }); N.texto('PONTOS ' + pontos, W / 2, H * 0.33 + 18, { tam: 7 }); N.texto('RECORDE ' + recorde, W / 2, H * 0.33 + 30, { tam: 7 }); }
    }
    novo(); N.rodar(atualizar, desenhar);
  }

  function JOGO_COBRINHA(C) {
    const N = Nexo, K = C.cores, T = 8, CW = 16, CH = 24, W = CW * T, H = CH * T + 12;
    N.iniciar({ largura: W, altura: H }); N.controles(['esq', 'dir', 'cima', 'baixo']);
    const dif = C.dificuldade;
    let estado = 'titulo', corpo, dir, prox, comida, bonus, pontos, passo, acum, recorde = N.recorde('cobra', 0), t = 0;
    function lugar() { let p; do { p = { x: N.sorteioInt(0, CW - 1), y: N.sorteioInt(0, CH - 1) }; } while (corpo.some(c => c.x === p.x && c.y === p.y)); return p; }
    function novo() { corpo = [{ x: 8, y: 12 }, { x: 7, y: 12 }, { x: 6, y: 12 }]; dir = { x: 1, y: 0 }; prox = dir; comida = lugar(); bonus = null; pontos = 0; passo = 0.16 - dif * 0.02; acum = 0; }
    const DIRS = { esq: { x: -1, y: 0 }, dir: { x: 1, y: 0 }, cima: { x: 0, y: -1 }, baixo: { x: 0, y: 1 } };
    function atualizar(dt) {
      t += dt;
      if (estado !== 'jogo') { if (N.querComecar()) { novo(); estado = 'jogo'; N.som('inicio'); } return; }
      const d = N.deslize();
      for (const k of ['esq', 'dir', 'cima', 'baixo']) if (N.apertou(k) || d === k) { const nd = DIRS[k]; if (nd.x !== -dir.x || nd.y !== -dir.y) prox = nd; }
      acum += dt;
      if (acum < passo) return;
      acum = 0; dir = prox;
      const cab = { x: corpo[0].x + dir.x, y: corpo[0].y + dir.y };
      if (cab.x < 0 || cab.y < 0 || cab.x >= CW || cab.y >= CH || corpo.some(c => c.x === cab.x && c.y === cab.y)) {
        estado = 'fim'; recorde = N.recorde('cobra', pontos); N.som('fim'); N.tremer(5); N.explodir(corpo[0].x * T + 4, corpo[0].y * T + 16, K.heroi, 20); return;
      }
      corpo.unshift(cab);
      if (cab.x === comida.x && cab.y === comida.y) {
        pontos += 10; N.som('moeda'); N.explodir(cab.x * T + 4, cab.y * T + 16, K.item, 8, 40); comida = lugar();
        passo = Math.max(0.055, passo - 0.004);
        if (!bonus && Math.random() < 0.25) bonus = Object.assign(lugar(), { t: 6 });
      } else if (bonus && cab.x === bonus.x && cab.y === bonus.y) { pontos += 50; N.som('poder'); bonus = null; corpo.push(corpo[corpo.length - 1]); }
      else corpo.pop();
      if (bonus && (bonus.t -= passo) <= 0) bonus = null;
    }
    function desenhar() {
      N.ret(0, 0, W, H, K.fundo);
      for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) if ((x + y) % 2) N.ret(x * T, y * T + 12, T, T, K.fundo2);
      N.ret(0, 0, W, 12, K.chao);
      N.texto(String(pontos), 4, 2, { tam: 8, alinhar: 'left', cor: '#fff', sombra: false });
      N.texto('REC ' + recorde, W - 4, 2, { tam: 8, alinhar: 'right', cor: '#fff', sombra: false });
      if (estado === 'titulo') { N.telaTitulo(C.titulo, `${C.heroi} come ${C.item}`, K); N.texto('deslize ou use as setas', W / 2, H * 0.75, { tam: 7, cor: K.texto }); return; }
      const pisca = 1 + Math.sin(t * 8) * 0.5;
      N.ret(comida.x * T + 1, comida.y * T + 13, T - 2, T - 2, K.item); N.ret(comida.x * T + 3, comida.y * T + 12 - pisca, 2, 2, '#4caf50');
      if (bonus) N.ret(bonus.x * T, bonus.y * T + 12, T, T, Math.floor(t * 8) % 2 ? '#fff' : K.destaque);
      corpo.forEach((c, i) => {
        N.ret(c.x * T, c.y * T + 12, T, T, i === 0 ? N.misturar(K.heroi, '#000', 0.25) : K.heroi);
        N.ret(c.x * T + 1, c.y * T + 13, T - 2, T - 2, i === 0 ? K.heroi : N.misturar(K.heroi, '#fff', 0.2));
      });
      const c0 = corpo[0];
      N.ret(c0.x * T + 2 + dir.x, c0.y * T + 14 + dir.y, 1, 1, '#fff'); N.ret(c0.x * T + 5 + dir.x, c0.y * T + 14 + dir.y, 1, 1, '#fff');
      if (estado === 'fim') { N.ret(0, H * 0.32, W, 54, '#000b'); N.texto('FIM DE JOGO', W / 2, H * 0.35, { tam: 12, cor: K.destaque === K.texto ? '#fff' : K.destaque }); N.texto('PONTOS ' + pontos, W / 2, H * 0.35 + 18, { tam: 8 }); N.texto('toque para recomeçar', W / 2, H * 0.35 + 32, { tam: 7 }); }
    }
    novo(); N.rodar(atualizar, desenhar);
  }

  function JOGO_AVENTURA(C) {
    const N = Nexo, K = C.cores, W = 144, H = 192;
    N.iniciar({ largura: W, altura: H }); N.controles(['esq', 'dir', 'cima', 'baixo', 'a']);
    const P = { h: K.heroi, d: N.misturar(K.heroi, '#000', 0.45), s: '#f4c39b', k: '#111', w: '#fff', m: '#c0c0c0' };
    const heroi = N.sprite(['..kkkk..', '.khhhhk.', '.kssssk.', '.kswswk.', '..ssss..', '.khhhhk.', 'kshhhhsk', '..dddd..', '..d..d..', '..k..k..'], P);
    const inimS = N.sprite(['.k....k.', 'kik..kik', 'kiiiiiik', 'kiwkkwik', 'kiiiiiik', '.kieeik.', 'ki.ii.ik', 'k......k'], { i: K.inimigo, e: N.misturar(K.inimigo, '#000', 0.4), w: '#ff0', k: '#111' });
    const gema = N.sprite(['..k..', '.kyk.', 'kyyyk', '.kyk.', '..k..'], { y: K.item, k: '#111' });
    const pedra = N.sprite(['..kkkk..', '.kppppk.', 'kppqppqk', 'kpppppqk', 'kqppqppk', '.kkkkkk.'], { p: K.chao, q: N.misturar(K.chao, '#000', 0.3), k: '#111' });
    const dif = C.dificuldade;
    let estado = 'titulo', h, inimigos, gemas, pedras, coracoes, pontos, vidas, onda, ataque, olhar, invul, recorde = N.recorde('aventura', 0), t = 0;
    function livre(x, y, w, hh) { return !pedras.some(p => N.colide({ x, y, w, h: hh }, p)); }
    function novaOnda() {
      onda++;
      for (let i = 0; i < 2 + onda + dif; i++) {
        const lado = N.sorteioInt(0, 3), x = lado === 0 ? -8 : lado === 1 ? W : N.sorteio(0, W - 8), y = lado === 2 ? 14 : lado === 3 ? H : N.sorteio(14, H - 8);
        inimigos.push({ x, y, w: 8, h: 8, vel: 18 + onda * 2 + dif * 4 + N.sorteio(0, 8), hp: 1 + Math.floor(onda / 4), recuo: 0 });
      }
      for (let i = 0; i < 3; i++) { let x, y; do { x = N.sorteio(8, W - 14); y = N.sorteio(22, H - 14); } while (!livre(x, y, 5, 5)); gemas.push({ x, y, w: 5, h: 5 }); }
    }
    function novo() {
      h = { x: W / 2 - 4, y: H / 2, w: 7, h: 9 }; inimigos = []; gemas = []; coracoes = []; pontos = 0; vidas = 5; onda = 0; ataque = 0; olhar = { x: 0, y: 1 }; invul = 0;
      pedras = [];
      for (let i = 0; i < 10; i++) { const p = { x: N.sorteioInt(0, 8) * 16 + 4, y: N.sorteioInt(2, 11) * 16, w: 8, h: 6 }; if (Math.abs(p.x - h.x) + Math.abs(p.y - h.y) > 30) pedras.push(p); }
      novaOnda();
    }
    function atualizar(dt) {
      t += dt;
      if (estado !== 'jogo') { if (N.querComecar()) { novo(); estado = 'jogo'; N.som('inicio'); } return; }
      let dx = 0, dy = 0;
      if (N.segurando('esq')) dx--; if (N.segurando('dir')) dx++; if (N.segurando('cima')) dy--; if (N.segurando('baixo')) dy++;
      if (dx || dy) { olhar = { x: dx, y: dy }; const v = 60 / Math.hypot(dx, dy); if (livre(h.x + dx * v * dt, h.y, h.w, h.h)) h.x += dx * v * dt; if (livre(h.x, h.y + dy * v * dt, h.w, h.h)) h.y += dy * v * dt; }
      h.x = Math.max(0, Math.min(W - h.w, h.x)); h.y = Math.max(12, Math.min(H - h.h, h.y));
      if ((N.apertou('a') || N.tocou()) && ataque <= 0) { ataque = 0.25; N.som('tiro'); }
      ataque -= dt; invul = Math.max(0, invul - dt);
      const golpe = ataque > 0.1 ? { x: h.x + 3 + olhar.x * 9 - 6, y: h.y + 4 + olhar.y * 9 - 6, w: 12, h: 12 } : null;
      for (const e of inimigos) {
        if (e.recuo > 0) { e.recuo -= dt; e.x += e.rx * dt; e.y += e.ry * dt; }
        else { const a = Math.atan2(h.y - e.y, h.x - e.x), nx = e.x + Math.cos(a) * e.vel * dt, ny = e.y + Math.sin(a) * e.vel * dt; if (livre(nx, e.y, e.w, e.h)) e.x = nx; if (livre(e.x, ny, e.w, e.h)) e.y = ny; }
        if (golpe && e.recuo <= 0 && N.colide(golpe, e)) {
          e.hp--; e.recuo = 0.2; const a = Math.atan2(e.y - h.y, e.x - h.x); e.rx = Math.cos(a) * 160; e.ry = Math.sin(a) * 160; N.explodir(e.x + 4, e.y + 4, '#fff', 4, 30);
          if (e.hp <= 0) { pontos += 25; N.som('explosao'); N.explodir(e.x + 4, e.y + 4, K.inimigo, 14); if (Math.random() < 0.15) coracoes.push({ x: e.x, y: e.y, w: 6, h: 6 }); }
        }
        if (e.hp > 0 && N.colide(e, h) && invul <= 0) { vidas--; invul = 1.2; N.som('dano'); N.tremer(4); if (vidas <= 0) { estado = 'fim'; recorde = N.recorde('aventura', pontos); N.som('fim'); } }
      }
      inimigos = inimigos.filter(e => e.hp > 0);
      for (const g of gemas) if (N.colide(g, h)) { g.ok = true; pontos += 50; N.som('moeda'); N.explodir(g.x + 2, g.y + 2, K.item, 8, 40); }
      gemas = gemas.filter(g => !g.ok);
      for (const c of coracoes) if (N.colide(c, h)) { c.ok = true; vidas = Math.min(5, vidas + 1); N.som('poder'); }
      coracoes = coracoes.filter(c => !c.ok);
      if (!inimigos.length && !gemas.length) { pontos += 100 * onda; N.som('poder'); novaOnda(); }
    }
    function desenhar() {
      N.ret(0, 0, W, H, K.fundo2);
      for (let y = 12; y < H; y += 16) for (let x = (y / 16 % 2) * 8; x < W; x += 16) N.ret(x, y, 2, 2, N.misturar(K.fundo2, '#000', 0.12));
      if (estado === 'titulo') { N.telaTitulo(C.titulo, `${C.heroi} contra os ${C.inimigo}s`, K); N.texto('setas andam   A ataca', W / 2, H * 0.75, { tam: 7, cor: K.texto }); N.texto('pegue todas as ' + C.item.toLowerCase() + 's', W / 2, H * 0.75 + 10, { tam: 7, cor: K.texto }); return; }
      for (const p of pedras) N.desenhar(pedra, p.x, p.y - 2);
      for (const g of gemas) N.desenhar(gema, g.x, g.y + Math.sin(t * 4 + g.x) * 1.5);
      for (const c of coracoes) N.texto('♥', c.x + 3, c.y - 1, { tam: 8, cor: '#ff4d6d' });
      for (const e of inimigos) N.desenhar(inimS, e.x, e.y, e.x > h.x);
      if (!(invul > 0 && Math.floor(t * 12) % 2)) N.desenhar(heroi, h.x, h.y, olhar.x < 0);
      if (ataque > 0.1) { const ex = h.x + 3 + olhar.x * 8, ey = h.y + 4 + olhar.y * 8; N.ret(ex - 1, ey - 1, 3 + Math.abs(olhar.x) * 4, 3 + Math.abs(olhar.y) * 4, '#e0e0e0'); N.explodir(ex, ey, '#fff', 1, 10); }
      N.ret(0, 0, W, 12, '#000a');
      N.texto('♥'.repeat(Math.max(0, vidas)), 3, 2, { tam: 8, alinhar: 'left', cor: '#ff4d6d', sombra: false });
      N.texto('ONDA ' + onda + '  ' + pontos, W - 3, 2, { tam: 7, alinhar: 'right', sombra: false });
      if (estado === 'fim') { N.ret(0, H * 0.32, W, 56, '#000b'); N.texto('VOCÊ CAIU!', W / 2, H * 0.35, { tam: 12, cor: K.destaque }); N.texto('PONTOS ' + pontos + '  REC ' + recorde, W / 2, H * 0.35 + 18, { tam: 7 }); N.texto('toque para tentar de novo', W / 2, H * 0.35 + 32, { tam: 7 }); }
    }
    novo(); N.rodar(atualizar, desenhar);
  }

  function JOGO_CORRIDA(C) {
    const N = Nexo, K = C.cores, W = 120, H = 200, PISTAS = [28, 56, 84];
    N.iniciar({ largura: W, altura: H }); N.controles(['esq', 'dir', 'a']);
    const carro = c => N.sprite(['.kkkkkk.', 'kcccccck', 'kcwwwwck', 'kcccccck', 'kkcccckk', 'kcccccck', 'kcccccck', 'kcwwwwck', 'kkcccckk', '.kkkkkk.'], { c, w: '#9be7ff', k: '#111' });
    const meu = carro(K.heroi), outros = [carro(K.inimigo), carro(N.misturar(K.inimigo, '#fff', 0.3)), carro(N.misturar(K.inimigo, '#000', 0.3))];
    const dif = C.dificuldade;
    let estado = 'titulo', pista, x, vel, dist, carros, moedas, pontos, faixa, spawn, turbo, recorde = N.recorde('corrida', 0), t = 0;
    function novo() { pista = 1; x = PISTAS[1]; vel = 70 + dif * 15; dist = 0; carros = []; moedas = []; pontos = 0; faixa = 0; spawn = 1; turbo = 0; }
    function atualizar(dt) {
      t += dt;
      if (estado !== 'jogo') { faixa = (faixa + 60 * dt) % 20; if (N.querComecar()) { novo(); estado = 'jogo'; N.som('inicio'); } return; }
      let alvo = null;
      if (N.apertou('esq')) alvo = -1; if (N.apertou('dir')) alvo = 1;
      const d = N.deslize(); if (d === 'esq') alvo = -1; if (d === 'dir') alvo = 1;
      if (N.tocou() && N.posToque) alvo = N.posToque.x < W / 2 ? -1 : 1;
      if (alvo) pista = Math.max(0, Math.min(2, pista + alvo));
      if (N.apertou('a') && turbo <= 0) { turbo = 2.5; N.som('poder'); }
      x += (PISTAS[pista] - x) * Math.min(1, dt * 12);
      const v = vel * (turbo > 0 ? 1.6 : 1);
      turbo = Math.max(-4, turbo - dt);
      vel += dt * (2 + dif);
      dist += v * dt; pontos = Math.floor(dist / 10) + 0;
      faixa = (faixa + v * dt) % 20;
      spawn -= dt;
      if (spawn <= 0) {
        spawn = Math.max(0.45, 1.2 - vel / 300 - dif * 0.1);
        const livres = [0, 1, 2].filter(p => !carros.some(c => c.p === p && c.y < 30));
        if (livres.length > 1) { const p = livres[N.sorteioInt(0, livres.length - 1)]; carros.push({ p, x: PISTAS[p] - 4, y: -12, w: 8, h: 10, v: N.sorteio(0.3, 0.6), spr: outros[N.sorteioInt(0, 2)] }); }
        if (Math.random() < 0.5) moedas.push({ x: PISTAS[N.sorteioInt(0, 2)] - 2, y: -8, w: 5, h: 5 });
      }
      const eu = { x: x - 4, y: H - 30, w: 8, h: 10 };
      for (const c of carros) { c.y += v * (1 - c.v) * dt; if (N.colide({ x: c.x + 1, y: c.y + 1, w: 6, h: 8 }, { x: eu.x + 1, y: eu.y + 1, w: 6, h: 8 })) { if (turbo > 0) { N.explodir(c.x + 4, c.y + 5, K.inimigo, 12); c.y = 999; dist += 300; N.som('explosao'); } else { estado = 'fim'; recorde = N.recorde('corrida', pontos + Math.floor(dist / 10)); N.tremer(6); N.som('explosao'); N.explodir(eu.x + 4, eu.y + 5, K.heroi, 30, 90); } } }
      for (const m of moedas) { m.y += v * dt; if (N.colide(m, eu)) { m.ok = true; dist += 150; N.som('moeda'); N.explodir(m.x + 2, m.y + 2, K.item, 6, 40); } }
      carros = carros.filter(c => c.y < H + 20); moedas = moedas.filter(m => !m.ok && m.y < H + 10);
    }
    function desenhar() {
      N.ret(0, 0, W, H, K.fundo2);
      N.ret(14, 0, W - 28, H, '#2b2b35'); N.ret(14, 0, 2, H, '#fff'); N.ret(W - 16, 0, 2, H, '#fff');
      for (let y = -20 + faixa; y < H; y += 20) { N.ret(41, y, 2, 10, '#ffffffaa'); N.ret(69, y, 2, 10, '#ffffffaa'); }
      for (let y = -20 + faixa; y < H; y += 20) { N.ret(4, y, 6, 6, K.chao); N.ret(W - 10, y + 10, 6, 6, K.chao); }
      if (estado === 'titulo') { N.telaTitulo(C.titulo, `${C.heroi} na pista`, K); N.texto('◀ ▶ trocar de pista', W / 2, H * 0.75, { tam: 7, cor: K.texto }); N.texto('A = turbo (atravessa)', W / 2, H * 0.75 + 10, { tam: 7, cor: K.texto }); return; }
      for (const m of moedas) { N.ret(m.x, m.y, 5, 5, K.item); N.ret(m.x + 1, m.y + 1, 2, 2, '#fff'); }
      for (const c of carros) N.desenhar(c.spr, c.x, c.y);
      if (estado !== 'fim') N.desenhar(meu, x - 4, H - 30);
      if (turbo > 0) { N.ret(x - 3, H - 20, 2, 4 + Math.random() * 6, '#ffb703'); N.ret(x + 1, H - 20, 2, 4 + Math.random() * 6, '#ffb703'); }
      N.ret(0, 0, W, 11, '#000a');
      N.texto(String(pontos) + ' m', 3, 2, { tam: 7, alinhar: 'left', sombra: false });
      N.texto(turbo > 0 ? 'TURBO!' : turbo > -4 ? 'turbo...' : 'A: TURBO', W - 3, 2, { tam: 7, alinhar: 'right', cor: turbo > -4 && turbo <= 0 ? '#888' : K.item, sombra: false });
      if (estado === 'fim') { N.ret(0, H * 0.3, W, 56, '#000b'); N.texto('BATEU!', W / 2, H * 0.33, { tam: 12, cor: K.destaque }); N.texto(pontos + ' m  REC ' + recorde, W / 2, H * 0.33 + 18, { tam: 7 }); N.texto('toque para correr de novo', W / 2, H * 0.33 + 32, { tam: 7 }); }
    }
    novo(); N.rodar(atualizar, desenhar);
  }

  const FUNCOES = { plataforma: JOGO_PLATAFORMA, nave: JOGO_NAVE, cobrinha: JOGO_COBRINHA, aventura: JOGO_AVENTURA, corrida: JOGO_CORRIDA };

  // monta o HTML completo de um jogo a partir da configuração
  function gerar(cfgJogo) {
    const C = normalizar(cfgJogo);
    const json = JSON.stringify(C).replace(/</g, '\\u003c');
    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"><title>${C.titulo}</title></head>
<body><script>
${NEXO_MOTOR.toString()}
NEXO_MOTOR();
(${FUNCOES[C.tipo].toString()})(${json});
</script></body></html>`;
    return { html, config: C, orientacao: TIPOS[C.tipo].orientacao };
  }

  return { TEMAS, TIPOS, detectarTipo, detectarTema, normalizar, gerar };
})();
