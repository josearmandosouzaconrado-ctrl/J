'use strict';
// =====================================================================
//  O SUBMUNDO: a Guilda dos Bandidos (beco das capitais → esconderijo na montanha)
//  e o Mercado Negro (contrabandista de Zahrim → caverna que só tem acesso pelo mar)
// =====================================================================

// ---------- objetos roubados e mercadorias do mercado negro ----------
idef('bolsa_furtada', { name: 'Bolsa de Moedas Furtada', type: 'misc', value: 45, stack: true, furto: true, icon: { k: 'crate', c: '#8a6a3a' }, desc: 'Tirada do cinto de um morador. A guilda dos bandidos quer isto.' });
idef('anel_furtado', { name: 'Anel Furtado', type: 'misc', value: 70, stack: true, furto: true, icon: { k: 'ring', c: '#e0c050' }, desc: 'Um anel que não é seu. Um receptador paga bem.' });
idef('colar_furtado', { name: 'Colar Furtado', type: 'misc', value: 90, stack: true, furto: true, icon: { k: 'amulet', c: '#d0d0e0' }, desc: 'Um colar arrancado com mãos leves.' });
idef('joia_furtada', { name: 'Joia Furtada', type: 'misc', value: 120, stack: true, furto: true, icon: { k: 'gem', c: '#e04080' }, desc: 'Uma pedra preciosa roubada.' });
idef('carta_selada', { name: 'Carta Selada Furtada', type: 'misc', value: 60, stack: true, furto: true, icon: { k: 'scroll', c: '#c04040' }, desc: 'Segredos de alguém. Vale ouro no submundo.' });
idef('veneno_lamina', { name: 'Veneno de Lâmina', type: 'potion', use: { buff: { k: 'dmg', v: 0.45, t: 90 } }, value: 160, stack: true, icon: { k: 'potion', c: '#40c040' }, desc: 'Passe na arma: +45% de dano por 90 segundos.' });
idef('veneno_mortal', { name: 'Frasco de Veneno Mortal', type: 'misc', value: 400, stack: true, icon: { k: 'potion', c: '#204020' }, desc: 'Uma única gota mata um rei. Contrabando caríssimo.' });
const FURTOS = ['bolsa_furtada', 'anel_furtado', 'colar_furtado', 'joia_furtada', 'carta_selada'];
const RANKS_BANDIDO = ['Rato de Beco', 'Ladrão', 'Salteador', 'Mestre-Ladrão', 'Rei dos Bandidos'];
INTERIOR_SIZES.esconderijo = [22, 15];
INTERIOR_SIZES.mercado_negro = [26, 16];

// ---------------- cutscenes desenhadas com os sprites do jogo ----------------
const Cena = {
  tocar(tipo, falas, fim) {
    const G = Game, game = document.getElementById('game');
    G.paused = true;
    const cv = document.createElement('canvas'); cv.id = 'cena'; cv.width = 320; cv.height = 180;
    const tx = document.createElement('div'); tx.id = 'cena-txt';
    const sk = document.createElement('button'); sk.id = 'cena-pular'; sk.textContent = 'Pular ▶';
    game.appendChild(cv); game.appendChild(tx); game.appendChild(sk);
    const ctx = cv.getContext('2d'); ctx.imageSmoothingEnabled = false;
    const P = G.player, DUR = 9;
    const mk = (id, look, nome) => { const m = new Monster(id, 0, 0, 1, { look, name: nome }); m.dir = 'right'; m.moving = true; m.anim = 0; return m; };
    const eu = mk('bandido', Object.assign({}, P.look), P.name);
    const guia = mk('bandido', tipo === 'mar' ? Object.assign({}, ENEMIES.bandido.look, { body: '#c8a060', hood: '#e8dcc0', legs: '#6a5030', skin: '#b07848' }) : Object.assign({}, ENEMIES.bandido.look, { hood: '#1a1a1a', body: '#2a2a2a', cape: '#3a1010' }), 'Guia');
    if (tipo === 'montanha') { eu.montado = guia.montado = true; eu.cavalo = P.mount || 'cavalo'; guia.cavalo = 'cavalo_guerra'; }
    let t = 0, last = performance.now(), acabou = false, iFala = -1;
    const terminar = () => { if (acabou) return; acabou = true; cv.remove(); tx.remove(); sk.remove(); G.paused = false; UI.fade(); fim && fim(); };
    sk.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); terminar(); });
    const estrelas = Array.from({ length: 50 }, (_, i) => [(i * 73) % 320, (i * 37) % 90, i % 3]);
    const loop = (now) => {
      if (acabou) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
      eu.anim += dt; guia.anim += dt;
      const fi = Math.min(falas.length - 1, Math.floor(t / (DUR / falas.length)));
      if (fi !== iFala) { iFala = fi; tx.textContent = falas[fi]; }
      if (tipo === 'montanha') this.montanha(ctx, t, DUR, eu, guia, estrelas); else this.mar(ctx, t, DUR, eu, guia, estrelas);
      // entrada e saída em fade
      const a = t < 0.8 ? 1 - t / 0.8 : t > DUR - 1 ? (t - (DUR - 1)) : 0;
      if (a > 0) { ctx.fillStyle = `rgba(0,0,0,${Math.min(1, a)})`; ctx.fillRect(0, 0, 320, 180); }
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 320, 14); ctx.fillRect(0, 166, 320, 14);
      if (t >= DUR) return terminar();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    this.ativa = { terminar };
  },
  serra(ctx, cor, base, amp, seed, passo) {
    ctx.fillStyle = cor; ctx.beginPath(); ctx.moveTo(0, 180);
    for (let x = 0; x <= 320; x += passo) ctx.lineTo(x, base - Math.abs(Math.sin(x * 0.021 + seed) * amp) - Math.abs(Math.sin(x * 0.057 + seed * 2)) * amp * 0.4);
    ctx.lineTo(320, 180); ctx.closePath(); ctx.fill();
  },
  // o bandido do beco e você, a cavalo, entrando numa montanha abandonada
  montanha(ctx, t, DUR, eu, guia, est) {
    const g = ctx.createLinearGradient(0, 0, 0, 140); g.addColorStop(0, '#1a1030'); g.addColorStop(0.6, '#6a3050'); g.addColorStop(1, '#e08050');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 320, 180);
    for (const [x, y, k] of est) if (y < 50) { ctx.fillStyle = k ? '#c0b0d0' : '#ffffff'; ctx.fillRect(x, y + 14, 1, 1); }
    ctx.fillStyle = '#ffd0a0'; ctx.beginPath(); ctx.arc(70, 112, 14, 0, Math.PI * 2); ctx.fill();
    this.serra(ctx, '#4a2a48', 118, 34, 1.3, 8);
    this.serra(ctx, '#2e1e30', 132, 24, 4.1, 6);
    // a montanha abandonada
    ctx.fillStyle = '#3a2e2a'; ctx.beginPath(); ctx.moveTo(150, 180); ctx.lineTo(205, 70); ctx.lineTo(228, 52); ctx.lineTo(252, 66); ctx.lineTo(282, 40); ctx.lineTo(320, 70); ctx.lineTo(320, 180); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#4c3c34'; ctx.beginPath(); ctx.moveTo(205, 70); ctx.lineTo(228, 52); ctx.lineTo(240, 100); ctx.lineTo(214, 120); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#2a201c'; for (let i = 0; i < 40; i++) ctx.fillRect(170 + (i * 47) % 150, 80 + (i * 29) % 90, 3, 2);
    // boca da mina velha, com vigas de madeira e uma placa quebrada
    ctx.fillStyle = '#080506'; ctx.beginPath(); ctx.moveTo(240, 146); ctx.lineTo(240, 122); ctx.quadraticCurveTo(256, 106, 272, 122); ctx.lineTo(272, 146); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#6a4a2a'; ctx.fillRect(237, 118, 4, 28); ctx.fillRect(271, 118, 4, 28); ctx.fillRect(235, 115, 42, 4);
    ctx.fillStyle = '#8a6a3a'; ctx.fillRect(282, 132, 12, 7); ctx.fillStyle = '#5a3a1a'; ctx.fillRect(287, 139, 2, 8);
    const fl = 0.6 + Math.sin(t * 13) * 0.2; ctx.fillStyle = `rgba(255,160,60,${0.25 * fl})`; ctx.beginPath(); ctx.arc(256, 134, 9, 0, Math.PI * 2); ctx.fill();
    // chão e trilha
    ctx.fillStyle = '#3a2c22'; ctx.fillRect(0, 144, 320, 36);
    ctx.fillStyle = '#5a4630'; ctx.beginPath(); ctx.moveTo(0, 156); ctx.lineTo(240, 146); ctx.lineTo(272, 146); ctx.lineTo(320, 160); ctx.lineTo(320, 166); ctx.lineTo(0, 166); ctx.closePath(); ctx.fill();
    for (const x of [30, 120, 180]) { ctx.fillStyle = '#1a1210'; ctx.fillRect(x, 120, 2, 26); ctx.fillRect(x - 6, 126, 6, 1); ctx.fillRect(x + 2, 122, 7, 1); ctx.fillRect(x - 4, 132, 4, 1); }
    // os cavaleiros
    const k = Math.min(1, t / (DUR - 1.6));
    const xg = -20 + k * 278, xe = xg - 34;
    for (const [m, x] of [[eu, xe], [guia, xg]]) {
      if (x > 262) continue;
      m.x = x; m.y = 155 - Math.max(0, x - 150) * 0.06;
      ctx.globalAlpha = x > 238 ? Math.max(0, 1 - (x - 238) / 22) : 1;
      m.draw(ctx, 0, 0); ctx.globalAlpha = 1;
    }
    // poeira dos cascos
    ctx.fillStyle = 'rgba(160,130,100,0.5)'; for (let i = 0; i < 6; i++) { const px = xe - 10 - i * 5 + Math.sin(t * 9 + i) * 2; if (px > 0) ctx.fillRect(px, 152 + (i % 2), 2, 2); }
  },
  // o contrabandista rema com você até uma caverna que só tem entrada pelo mar
  mar(ctx, t, DUR, eu, guia, est) {
    const g = ctx.createLinearGradient(0, 0, 0, 120); g.addColorStop(0, '#060a18'); g.addColorStop(1, '#1a2a50');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 320, 180);
    for (const [x, y, k] of est) { ctx.fillStyle = k === 2 ? '#8090c0' : '#ffffff'; if ((Math.floor(t * 3) + x) % 7) ctx.fillRect(x, y + 14, 1, 1); }
    ctx.fillStyle = '#f0f0e0'; ctx.beginPath(); ctx.arc(60, 40, 10, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#1a2a50'; ctx.beginPath(); ctx.arc(65, 37, 9, 0, Math.PI * 2); ctx.fill();
    // a montanha no meio do mar
    ctx.fillStyle = '#20201e'; ctx.beginPath(); ctx.moveTo(140, 130); ctx.lineTo(170, 70); ctx.lineTo(196, 40); ctx.lineTo(220, 58); ctx.lineTo(250, 30); ctx.lineTo(290, 66); ctx.lineTo(320, 80); ctx.lineTo(320, 130); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#30302c'; ctx.beginPath(); ctx.moveTo(196, 40); ctx.lineTo(220, 58); ctx.lineTo(214, 100); ctx.lineTo(186, 96); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#16161a'; for (let i = 0; i < 30; i++) ctx.fillRect(160 + (i * 41) % 160, 66 + (i * 23) % 60, 3, 2);
    // a boca da caverna na linha d'água, com luz de lanternas lá dentro
    ctx.fillStyle = '#040404'; ctx.beginPath(); ctx.moveTo(226, 130); ctx.lineTo(226, 110); ctx.quadraticCurveTo(250, 88, 274, 110); ctx.lineTo(274, 130); ctx.closePath(); ctx.fill();
    const fl = 0.7 + Math.sin(t * 11) * 0.15 + Math.sin(t * 23) * 0.1;
    const lg = ctx.createRadialGradient(250, 118, 1, 250, 118, 22); lg.addColorStop(0, `rgba(255,170,70,${0.55 * fl})`); lg.addColorStop(1, 'rgba(255,120,40,0)'); ctx.fillStyle = lg; ctx.fillRect(226, 96, 48, 34);
    ctx.fillStyle = '#ffd080'; ctx.fillRect(240, 112, 2, 3); ctx.fillRect(262, 114, 2, 3);
    // o mar
    ctx.fillStyle = '#10284a'; ctx.fillRect(0, 128, 320, 52);
    ctx.fillStyle = 'rgba(255,200,120,0.25)'; for (let i = 0; i < 6; i++) ctx.fillRect(238 + Math.sin(t * 2 + i) * 6, 132 + i * 4, 24 - i * 3, 1);
    ctx.fillStyle = '#2a5080'; for (let i = 0; i < 26; i++) { const x = ((i * 53) + t * 14) % 340 - 10, y = 134 + (i * 17) % 30; ctx.fillRect(Math.round(x), y, 6, 1); }
    ctx.fillStyle = 'rgba(240,240,220,0.5)'; ctx.fillRect(56, 132, 10, 1); ctx.fillRect(58, 138, 6, 1);
    // o bote
    const k = Math.min(1, t / (DUR - 1.4)), bx = -40 + k * 286, by = 140 + Math.sin(t * 2.4) * 1.5;
    if (bx < 262) {
      ctx.save(); ctx.globalAlpha = bx > 226 ? Math.max(0, 1 - (bx - 226) / 30) : 1;
      // as duas pessoas sentadas (só a parte de cima aparece por cima do bote)
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 320, by - 1); ctx.clip();
      guia.x = bx + 14; guia.y = by + 8; guia.moving = false; guia.dir = 'right'; guia.draw(ctx, 0, 0);
      eu.x = bx - 6; eu.y = by + 8; eu.moving = false; eu.dir = 'right'; eu.draw(ctx, 0, 0);
      ctx.restore();
      ctx.fillStyle = '#3a2412'; ctx.beginPath(); ctx.moveTo(bx - 22, by - 3); ctx.lineTo(bx + 30, by - 3); ctx.lineTo(bx + 24, by + 5); ctx.lineTo(bx - 17, by + 5); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#6a4424'; ctx.fillRect(bx - 21, by - 3, 50, 2);
      // remos
      const r = Math.sin(t * 4) * 5; ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx + 14, by - 6); ctx.lineTo(bx + 4 - r, by + 7); ctx.stroke();
      ctx.fillStyle = 'rgba(220,230,255,0.6)'; ctx.fillRect(bx + 2 - r, by + 6, 4, 1);
      // lanterna do bote
      ctx.fillStyle = '#ffd060'; ctx.fillRect(bx + 26, by - 8, 2, 3); ctx.fillStyle = 'rgba(255,200,80,0.18)'; ctx.beginPath(); ctx.arc(bx + 27, by - 6, 8, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  }
};

// ---------------- a guilda dos bandidos ----------------
const Submundo = {
  st() { const P = Game.player; if (!P.bandidos) P.bandidos = { etapa: 'nada', nivel: 0, feitos: 0, missao: null, negro: 0, treino: 0 }; return P.bandidos; },
  furtos() { const P = Game.player; return FURTOS.reduce((n, id) => n + P.count(id), 0); },
  rank() { return RANKS_BANDIDO[Math.min(RANKS_BANDIDO.length - 1, this.st().nivel)]; },
  membro() { return this.st().etapa === 'membro'; },
  // um beco: um chão livre com paredes dos dois lados
  beco(s) {
    const W = Game.world, rng = new RNG(hashStr(s.id) + 41), achados = [];
    for (let y = s.y0 + 3; y < s.y0 + s.h - 3; y++) for (let x = s.x0 + 3; x < s.x0 + s.w - 3; x++) {
      if (W.solidAt(x, y) || TWATER[W.tileAt(x, y)]) continue;
      const lados = (W.solidAt(x - 1, y) && W.solidAt(x + 1, y)) || (W.solidAt(x, y - 1) && W.solidAt(x, y + 1));
      if (lados && !W.solidAt(x, y + 1 - (W.solidAt(x, y + 1) ? 2 : 0))) achados.push({ x, y });
    }
    if (achados.length) return achados[rng.int(0, achados.length - 1)];
    return { x: s.mid.x + 6, y: s.mid.y + 6 };
  },
  // os homens do beco (em toda capital) e o contrabandista (na capital de Zahrim)
  tick(dt) {
    const G = Game, P = G.player; if (!P || !G.level || !G.level.isWorld) return;
    this.tT = (this.tT || 0) - dt; if (this.tT > 0) return; this.tT = 1;
    const W = G.world, ptx = Math.floor(P.x / 16), pty = Math.floor(P.y / 16);
    for (const a of G.actors.slice()) if (a.sub && (!a.subS || dist(ptx, pty, a.subS.mid.x, a.subS.mid.y) > 90)) G.actors.splice(G.actors.indexOf(a), 1);
    const s = W.settlementAt(ptx, pty);
    if (!s || s.type !== 'capital' || s.pirata || s.playerVila) return;
    if (G.actors.some(a => a.sub && a.subS === s)) return;
    const rng = new RNG(hashStr(s.id) + 7), b = this.beco(s);
    const add = (dx, dy, sub, nome, look) => {
      const a = new NPC({ role: 'citizen', x: b.x + dx, y: b.y + dy }, s, rng);
      a.sub = sub; a.subS = s; a.name = nome; a.look = Object.assign({}, a.look, look); a.S = Sprites.actor(a.look); a.h = a.S.h;
      a.home = { x: a.x, y: a.y }; a.wander = 0; a.parado = true;
      G.findFree(a); G.actors.push(a); return a;
    };
    const capuz = { hood: '#1e1a1a', body: '#2e2a28', legs: '#1e1e22', cape: '#3a1414', robe: false, weapon: 'dagger', wc: '#b0b0b8' };
    add(0, 0, 'beco', 'Homem Encapuzado', capuz);
    add(1, 0, 'capanga', 'Capanga do Beco', Object.assign({}, capuz, { cape: undefined, hood: '#2a2420' }));
    add(0, 1, 'capanga', 'Capanga do Beco', Object.assign({}, capuz, { cape: undefined, hood: '#24201c', weapon: 'sword' }));
    if (s.region.id === 'zahrim') {
      const c = this.beco(Object.assign({}, s, { id: s.id + '_porto' }));
      const a = new NPC({ role: 'citizen', x: c.x, y: c.y }, s, rng);
      a.sub = 'contrabandista'; a.subS = s; a.name = 'Kasim, o Contrabandista'; a.look = Object.assign({}, a.look, { body: '#c8a060', hood: '#e8dcc0', legs: '#6a5030', robe: false, pouch: true }); a.S = Sprites.actor(a.look); a.h = a.S.h; a.parado = true;
      G.findFree(a); a.home = { x: a.x, y: a.y }; G.actors.push(a);
    }
  },
  falar(a) {
    const P = Game.player, B = this.st(), volta = () => this.falar(a);
    if (a.sub === 'capanga') return UI.dialog(a.name, a.look, B.etapa === 'membro' ? `E aí, ${esc(this.rank().toLowerCase())}. O chefe está esperando lá na montanha.` : 'Tá olhando o quê? Fala com ele, não comigo.', [{ label: 'Tchau' }]);
    if (a.sub === 'contrabandista') return Mercado.falar(a);
    if (a.sub === 'beco') {
      if (B.etapa === 'nada') return UI.dialog(a.name, a.look, 'Psiu... você aí. Tem cara de quem precisa de ouro fácil.<br><br>Somos os <b>Corvos da Montanha</b>, a guilda dos bandidos. Mãos leves são sempre bem-vindas. Quer entrar? Prove o seu valor: <b>roube 5 coisas</b> dos moradores — bolsas, anéis, joias — e traga aqui para mim.<br><span class="dim">Converse com um morador e escolha 🤏 Furtar. Se for pego, os guardas vão atrás de você.</span>', [
        { label: 'Estou dentro.', cls: 'gold', fn: () => { B.etapa = 'furtar'; B.cap = a.subS.id; Game.chron('Os Corvos da Montanha me pediram para roubar 5 coisas para entrar na guilda dos bandidos.'); Game.toast('Missão: furte 5 objetos dos moradores (🤏 Furtar).', '#ffd080'); UI.close(); } },
        { label: 'Não me meto com bandidos.' }
      ]);
      if (B.etapa === 'furtar') {
        const n = this.furtos();
        if (n < 5) return UI.dialog(a.name, a.look, `Você trouxe ${n} de 5. Volte quando tiver tudo.<br><span class="dim">Dica: converse com moradores e escolha 🤏 Furtar. Longe dos guardas é mais fácil.</span>`, [{ label: 'Tchau' }]);
        return UI.dialog(a.name, a.look, 'Hm. Cinco, como combinado... Nada mal. Agora você vem comigo. Monte no cavalo e não faça perguntas.', [{ label: '🐎 Seguir o bandido', cls: 'gold', fn: () => { UI.close(); this.tirarFurtos(5); B.etapa = 'membro'; B.nivel = 0; Game.chron('Entreguei os 5 objetos roubados e fui levado(a) ao esconderijo dos Corvos da Montanha.'); this.irEsconderijo(a.subS, true); } }, { label: 'Agora não' }]);
      }
      const n = this.furtos();
      return UI.dialog(a.name, a.look, `${esc(this.rank())}! Quer ir para o esconderijo?`, [
        { label: '🐎 Ir ao esconderijo na montanha', cls: 'gold', fn: () => { UI.close(); this.irEsconderijo(a.subS, false); } },
        ...(n ? [{ label: `💰 Vender os ${n} objeto(s) roubado(s)`, fn: () => this.vender(volta, 1.3) }] : []),
        { label: 'Tchau' }
      ]);
    }
    if (a.sub === 'chefe') return this.chefe(a);
    if (a.sub === 'receptador') { const n = this.furtos(); return UI.dialog(a.name, a.look, n ? `Deixa eu ver... ${n} peça(s) boa(s). Pago melhor que o beco.` : 'Traga o que você roubar. Pago bem e não faço perguntas.', (n ? [{ label: '💰 Vender tudo', cls: 'gold', fn: () => this.vender(() => this.falar(a), 1.7) }] : []).concat([{ label: 'Tchau' }])); }
    if (a.sub === 'mestre') {
      const preco = 300 + B.treino * 250;
      return UI.dialog(a.name, a.look, `Quer mãos mais leves? Eu ensino. <span class="dim">(Treino atual: ${B.treino}/4 • cada nível dá +8% de chance de furto)</span>`, (B.treino < 4 ? [{ label: `🤏 Treinar furto (${preco} ouro)`, cls: 'gold', fn: () => { if (P.gold < preco) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= preco; B.treino++; Sfx.play('levelup'); Game.toast(`Treino de furto: nível ${B.treino}`, '#ffd080'); this.falar(a); } }] : []).concat([{ label: 'Tchau' }]));
    }
    if (a.sub === 'dica') return UI.dialog(a.name, a.look, 'Dizem que no reino do deserto, em <b>Zahrim</b>, um tal de <b>Kasim</b> leva quem paga bem até o <b>Mercado Negro</b>... Uma caverna numa montanha no meio do mar. Lá se vende de tudo: armas, venenos, perdões... e até gente.', [{ label: 'Interessante...' }]);
    UI.dialog(a.name, a.look, ['Shh. Aqui ninguém tem nome.', 'Ouvi dizer que a caravana do sal sai amanhã cedo...', 'Esse esconderijo era uma mina de prata, antes de desabar.'][Math.floor(Math.random() * 3)], [{ label: 'Tchau' }]);
  },
  tirarFurtos(n) { const P = Game.player; for (const id of FURTOS) { while (n > 0 && P.count(id) > 0) { P.removeItem(id, 1); n--; } } },
  vender(volta, mul) {
    const P = Game.player; let g = 0;
    for (const it of P.inv.slice()) if (FURTOS.includes(it.id)) { g += Math.round(ITEMS[it.id].value * mul) * (it.n || 1); P.removeInst(it, it.n || 1); }
    P.gold += g; Sfx.play('coin'); Game.toast(`+${g} de ouro`, '#ffd040'); volta();
  },
  // ---------- furtar os moradores ----------
  podeFurtar(a) {
    if (!(a instanceof NPC) || a.sub || a.vilaNPC || a.shipCrew || a.evento || a.remote || a.cena || a.workCust || a.res || a.child) return false;
    const B = Game.player.bandidos; return !!(B && B.etapa !== 'nada');
  },
  furtar(a) {
    const P = Game.player, B = this.st();
    if (a.furtadoDia === Game.day) return UI.dialog(a.name, a.look, 'Esta pessoa já está de olho no próprio bolso.', [{ label: 'Ok' }]);
    a.furtadoDia = Game.day;
    const guardas = Game.actors.filter(g => g.guardOf && !g.dead && dist(g.x, g.y, P.x, P.y) < 130).length;
    const ch = clamp(0.5 + P.level * 0.008 + B.treino * 0.08 + (P.perks && P.perks.has('furtivo') ? 0.15 : 0) + (P.sign === 'ladrao' ? 0.1 : 0) - guardas * 0.12 + (Game.isNight() ? 0.08 : 0), 0.1, 0.92);
    if (Math.random() < ch) {
      const id = FURTOS[Math.floor(Math.random() * FURTOS.length)];
      P.addItem(Items.make(id, 1)); Vida.honra(-1);
      Sfx.play('coin'); UI.close();
      Game.toast(`🤏 Você furtou: ${ITEMS[id].name}${B.etapa === 'furtar' ? ` (${this.furtos()}/5)` : ''}`, '#c0ffc0');
    } else {
      Vida.honra(-4, 'fui pego(a) roubando');
      const E = Eventos.state(); E.procurado = (E.procurado || 0) + 1;
      const g = Game.actors.find(g => g.guardOf && !g.dead && dist(g.x, g.y, P.x, P.y) < 260);
      if (g) { g.provoked = P; g.target = P; }
      UI.dialog(a.name, a.look, '<b class="bad">LADRÃO! LADRÃO!</b> Socorro, guardas!', [{ label: 'Fugir!' }]);
      Sfx.play('shout');
    }
  },
  // ---------- o esconderijo ----------
  irEsconderijo(s, cena) {
    const b = this.local(s, 'esconderijo', 'Esconderijo dos Corvos da Montanha');
    const ir = () => Game.enterInterior(b);
    if (!cena) return ir();
    Cena.tocar('montanha', ['O homem encapuzado monta no cavalo. — Siga-me. E não olhe para trás.', 'Vocês cavalgam para fora da cidade, por trilhas que nenhum mapa mostra...', 'Até uma montanha abandonada. Uma mina velha, esquecida por todos.', '— Bem-vindo(a) aos Corvos da Montanha.'], ir);
  },
  local(s, kind, nome) {
    const b = this.beco(s);
    return { name: nome, kind, sub: kind, settlement: s, tx: b.x, ty: b.y + 1, door: { x: b.x, y: b.y }, role: kind };
  },
  chefe(a) {
    const P = Game.player, B = this.st(), M = B.missao;
    const prox = B.nivel < RANKS_BANDIDO.length - 1 ? (B.nivel + 1) * 2 : null;
    let txt = `Eu sou o <b>Corvo Negro</b>. Aqui você é <b>${esc(this.rank())}</b>.${prox ? ` <span class="dim">(Missões feitas: ${B.feitos}/${prox} para subir)</span>` : ''}`;
    const o = [];
    if (M) {
      if (M.tipo === 'furto') { const n = this.furtos(); txt += `<br><br>Missão: furtar <b>${M.n}</b> objetos. Você tem ${n}.`; if (n >= M.n) o.push({ label: `Entregar ${M.n} objetos`, cls: 'gold', fn: () => { this.tirarFurtos(M.n); this.recompensa(M.ouro, a); } }); }
      if (M.tipo === 'caravana') { txt += `<br><br>Missão: <b>assaltar uma caravana</b> numa estrada. ${M.feito ? '<span class="good">Feito!</span>' : 'Ande pelas estradas até encontrar uma caravana escoltada (💰 no mapa).'}`; if (M.feito) o.push({ label: 'Contar como foi o assalto', cls: 'gold', fn: () => this.recompensa(M.ouro, a) }); }
      o.push({ label: 'Desistir da missão', cls: 'danger', fn: () => { B.missao = null; this.chefe(a); } });
    } else {
      o.push({ label: '🤏 Missão: grande furto', fn: () => { B.missao = { tipo: 'furto', n: 3 + B.nivel, ouro: 220 + B.nivel * 120 }; Game.toast(`Missão: furte ${3 + B.nivel} objetos.`, '#ffd080'); this.chefe(a); } });
      o.push({ label: '🐎 Missão: assaltar uma caravana', fn: () => { B.missao = { tipo: 'caravana', ouro: 450 + B.nivel * 200 }; if (typeof Caravanas !== 'undefined') Caravanas.alvo = true; Game.toast('Missão: assalte uma caravana nas estradas.', '#ffd080'); this.chefe(a); } });
    }
    o.push({ label: 'Tchau' });
    UI.dialog('Corvo Negro', a.look, txt, o);
  },
  recompensa(ouro, a) {
    const P = Game.player, B = this.st();
    B.missao = null; B.feitos++; P.gold += ouro; P.addXP(120 + B.nivel * 60); Sfx.play('quest');
    let sub = '';
    if (B.nivel < RANKS_BANDIDO.length - 1 && B.feitos >= (B.nivel + 1) * 2) { B.nivel++; sub = ` Agora você é ${this.rank()}!`; Sfx.play('levelup'); }
    Game.centerMsg('MISSÃO DOS CORVOS', `+${ouro} de ouro.${sub}`);
    Game.chron(`Cumpri uma missão para os Corvos da Montanha.${sub}`);
    this.chefe(a);
  },

  // ---------- os interiores: o esconderijo e o mercado negro ----------
  construir(L, kind) {
    const W = L.w, H = L.h, dx = L.dx, r = L.rng;
    L.wallT = T.CWALL; L.floorT = T.CFLOOR; L.caverna = true;
    for (let i = 0; i < W * H; i++) L.tiles[i] = T.CWALL;
    for (let y = 2; y < H - 1; y++) for (let x = 1; x < W - 1; x++) L.tiles[y * W + x] = T.CFLOOR;
    // paredes de pedra irregulares
    for (let y = 2; y < H - 1; y++) for (const x of [1, W - 2]) if (r.chance(0.35)) L.tiles[y * W + x] = T.CWALL;
    L.tiles[(H - 1) * W + dx] = T.CFLOOR;
    for (let x = 2; x < W - 2; x += 3) L.wall(x, O.TORCH);
    if (kind === 'esconderijo') {
      L.put(dx, 3, O.TABLE); L.put(dx - 1, 3, O.CHAIR); L.put(dx + 1, 3, O.MAPTABLE);
      L.put(2, 2, O.BANNER); L.put(W - 3, 2, O.BANNER);
      for (const [x, y] of [[3, 5], [4, 5], [3, 6], [W - 4, 5], [W - 5, 6], [W - 4, 9]]) L.put(x, y, r.chance(0.5) ? O.BARREL : O.CRATE);
      L.put(dx, 8, O.CAMPFIRE); L.put(dx - 3, 10, O.BEDSMALL); L.put(dx + 3, 10, O.BEDSMALL); L.put(2, H - 3, O.HAMMOCK);
      L.put(W - 3, 3, O.WEAPONRACK); L.put(W - 3, 7, O.CHEST); L.put(5, 3, O.MINEBEAM); L.put(W - 6, 3, O.MINEBEAM); L.put(6, 11, O.MINECART);
      L.put(2, 9, O.SACKS); L.put(W - 2 - 1, H - 3, O.KEG);
      L.subNPCs = [['chefe', dx, 4, 'Corvo Negro', { hood: '#101010', body: '#1a1a1a', cape: '#5a0a0a', weapon: 'sword', wc: '#d0d0d8' }], ['receptador', 4, 8, 'Receptador da Guilda', { apron: '#4a3020', hood: '#3a3028' }], ['mestre', W - 5, 8, 'Mestre-Ladrão Sombra', { hood: '#202030', body: '#2a2a3a', weapon: 'dagger' }], ['dica', dx + 2, 9, 'Bandido Falador', { hood: '#3a2a20' }], ['bandido', dx - 2, 9, 'Bandido', { hood: '#2a2420' }], ['bandido', 6, 12, 'Bandido', { hood: '#30281c', weapon: 'sword' }]];
    } else {
      // a caverna do mercado negro: um cais na água do mar e as barracas
      for (let x = 1; x < W - 1; x++) for (const y of [H - 3, H - 2]) if (Math.abs(x - dx) > 2) L.tiles[y * W + x] = T.WATER;
      L.objs[L.idx(dx - 4, H - 3)] = O.LIFEBOAT;
      for (let x = 3; x < W - 3; x += 5) { L.put(x, 4, O.STALL); L.put(x + 1, 3, O.LANTERN); }
      for (const [x, y] of [[2, 6], [W - 3, 6], [2, 8], [W - 3, 9], [8, 9], [W - 9, 9]]) L.put(x, y, r.chance(0.5) ? O.BARREL : O.CRATE);
      // jaulas dos escravos
      for (let x = 2; x < 7; x++) L.put(x, 10, O.FENCE);
      L.put(W - 4, 3, O.GUNRACK); L.put(dx, 7, O.CAMPFIRE); L.put(dx + 4, 6, O.POTSHELF); L.put(dx - 5, 6, O.SACKS); L.put(W - 2, 11, O.KEG);
      L.subNPCs = [['escravista', 4, 8, 'Mercador de Escravos Varkus', { body: '#4a1a1a', cape: '#2a0a0a', weapon: 'mace' }], ['armeiro', 8, 5, 'Armeiro Contrabandista', { apron: '#3a2a1a' }], ['boticario', 13, 5, 'Boticária dos Venenos', { robe: true, hood: '#1a3a1a' }], ['falsario', 18, 5, 'Falsário Mestre', { hood: '#3a3a5a' }], ['mercenarios', W - 5, 8, 'Capitão dos Mercenários', { weapon: 'sword', helm: '#808890' }], ['receptador', dx + 3, 9, 'Receptador do Mercado', { apron: '#4a3020' }], ['escravo', 3, 11, 'Escravo acorrentado', { body: '#8a7a6a', robe: true }], ['escravo', 5, 11, 'Escrava acorrentada', { body: '#7a6a5a', robe: true }]];
    }
  },
  spawnNPCs(L) {
    const rng = new RNG(hashStr(L.b.name) + Game.day);
    for (const [sub, x, y, nome, look] of L.subNPCs || []) {
      const a = new NPC({ role: 'patron', x, y }, L.s, rng);
      a.sub = sub; a.name = nome; a.look = Object.assign({}, a.look, look); a.S = Sprites.actor(a.look); a.h = a.S.h; a.indoor = true; a.parado = true;
      Game.findFree(a); a.home = { x: a.x, y: a.y }; Game.actors.push(a);
    }
  }
};

// ---------------- o mercado negro ----------------
const Mercado = {
  falar(a) {
    const P = Game.player, B = Submundo.st();
    if (a.sub === 'contrabandista') {
      const preco = B.negro ? (Submundo.membro() ? 75 : 150) : (Submundo.membro() ? 300 : 600);
      return UI.dialog(a.name, a.look, B.negro ? 'De volta? O bote está esperando. Pague e vamos.' : 'Você quer chegar onde ninguém chega, hein? Eu conheço uma caverna numa montanha no meio do mar. Só se entra de bote... e só se entra comigo.<br><span class="dim">Lá fica o Mercado Negro: armas contrabandeadas, venenos, perdões, mercenários e escravos.</span>' + (Submundo.membro() ? '<br><span class="good">Um Corvo da Montanha? Faço desconto.</span>' : ''), [
        { label: `⛵ Pagar ${preco} ouro e ir ao Mercado Negro`, cls: 'gold', fn: () => { if (P.gold < preco) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= preco; Sfx.play('coin'); UI.close(); const primeira = !B.negro; B.negro = (B.negro || 0) + 1; if (primeira) Game.chron('Paguei Kasim, o contrabandista de Zahrim, para me levar ao Mercado Negro.'); this.ir(a.subS, true); } },
        { label: 'Agora não' }
      ]);
    }
    const b = Game.level.b, volta = () => this.falar(a);
    switch (a.sub) {
      case 'escravista': return this.escravos(a);
      case 'armeiro': UI.close(); return UI.shop(Object.assign(Object.create(b), { voltar: () => UI.close() }), 'negro_armas');
      case 'boticario': UI.close(); return UI.shop(Object.assign(Object.create(b), { voltar: () => UI.close() }), 'negro_venenos');
      case 'falsario': {
        const E = Eventos.state(), pd = 400 + (E.procurado || 0) * 250;
        return UI.dialog(a.name, a.look, 'Papéis, selos, assinaturas... Eu falsifico qualquer coisa.', [
          ...(E.procurado > 0 || (P.honra || 0) < -20 ? [{ label: `📜 Perdão real falsificado (${pd} ouro)`, cls: 'gold', fn: () => { if (P.gold < pd) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= pd; E.procurado = 0; if (P.honra < -20) P.honra = -20; Sfx.play('quest'); Game.toast('Ninguém mais procura você.', '#a0ffa0'); volta(); } }] : []),
          { label: '📜 Carta de Fundação falsa (450 ouro)', fn: () => { if (P.gold < 450) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= 450; P.addItem(Items.make('carta_fundacao', 1)); Sfx.play('coin'); volta(); } },
          { label: '🗺 Mapa do tesouro (250 ouro)', fn: () => { if (P.gold < 250) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= 250; P.addItem(Items.make('mapa_tesouro', 1)); Sfx.play('coin'); volta(); } },
          { label: 'Tchau' }
        ]);
      }
      case 'mercenarios': {
        const o = [];
        if (Reino.ativo()) o.push({ label: '⚔ 10 mercenários para o seu exército (1100 ouro)', cls: 'gold', fn: () => { if (P.gold < 1100) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= 1100; Reino.st().tropas.soldado += 10; Sfx.play('coin'); Game.toast('+10 soldados mercenários no seu quartel', '#ffd080'); volta(); } });
        if (!P.follower) o.push({ label: `🗡 Guarda-costas veterano (${600 + P.level * 50} ouro)`, fn: () => { const c = 600 + P.level * 50; if (P.gold < c) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= c; P.follower = { name: 'Dravon (Mercenário Veterano)', look: Object.assign({}, ENEMIES.bandido.look, { helm: '#606870', body: '#3a3a3a', cape: '#2a1a1a' }) }; Game.spawnFollower(); UI.close(); Game.toast('Dravon agora protege você.', '#ffd080'); } });
        o.push({ label: 'Tchau' });
        return UI.dialog(a.name, a.look, 'Nós lutamos por quem paga mais. Sem bandeira, sem perguntas.', o);
      }
      case 'receptador': return Submundo.falar(a);
      case 'escravo': return UI.dialog(a.name, a.look, '...por favor... tire-nos daqui...', [{ label: 'Falar com o mercador', fn: () => { const m = Game.actors.find(x => x.sub === 'escravista'); if (m) this.escravos(m); else UI.close(); } }, { label: 'Sair' }]);
    }
    return Submundo.falar(a);
  },
  // o mercado de escravos: você pode libertar ou comprar
  lista() {
    const rng = new RNG(Game.day * 13 + 5), out = [];
    for (let i = 0; i < 3; i++) { const race = rng.pick(['humano', 'elfo', 'anao', 'orc', 'felino']), N = NAMES[race] || NAMES.humano, sx = rng.chance(0.5) ? 'm' : 'f'; out.push({ id: Game.day * 10 + i, nome: rng.pick(N[sx]), race, sx, preco: rng.int(5, 11) * 100, forte: rng.chance(0.4) }); }
    return out;
  },
  escravos(a) {
    const P = Game.player, B = Submundo.st(); B.livres = B.livres || [];
    const L = this.lista().filter(e => !B.livres.includes(e.id));
    const o = L.map(e => ({ label: `${esc(e.nome)} (${e.race === 'anao' ? 'anão' : e.race}${e.forte ? ', forte' : ''}) — ${e.preco} ouro`, fn: () => this.escravo(a, e) }));
    o.push({ label: 'Sair' });
    UI.dialog(a.name, a.look, L.length ? 'Mercadoria fresca, capturada nas fronteiras. Bons para as minas, para os campos... ou para lutar.<br><span class="dim">Comprar gente é crime e desonra. Você também pode pagar para libertá-los.</span>' : 'Acabou o estoque de hoje. Volte amanhã.', o);
  },
  escravo(a, e) {
    const P = Game.player, B = Submundo.st(), V = Vila.st();
    const pagar = () => { if (P.gold < e.preco) { Game.toast('Ouro insuficiente.', '#ff8080'); return false; } P.gold -= e.preco; B.livres.push(e.id); Sfx.play('coin'); return true; };
    UI.dialog(a.name, a.look, `<b>${esc(e.nome)}</b> olha para você em silêncio.`, [
      { label: `🕊 Comprar e libertar (${e.preco} ouro)`, cls: 'gold', fn: () => { if (!pagar()) return; Vida.honra(8, 'libertei um escravo'); Game.chron(`Comprei a liberdade de ${e.nome} no Mercado Negro.`); UI.dialog(e.nome, null, 'Livre... Eu nunca vou esquecer o que você fez. Que os deuses te protejam!', [{ label: 'Voltar', fn: () => this.escravos(a) }]); } },
      { label: V ? `⛓ Comprar como servo para ${V.nome} (${e.preco} ouro)` : `⛓ Comprar como servo (${e.preco} ouro)`, cls: 'danger', fn: () => {
        if (!V && P.follower) return Game.toast('Você já tem um acompanhante.', '#ff8080');
        if (!pagar()) return;
        Vida.honra(-15, 'comprei um escravo');
        if (V) { V.pop++; V.servos = (V.servos || 0) + 1; Vila.restore && Vila.restore(); Game.toast(`${e.nome} foi levado(a) para trabalhar em ${V.nome}.`, '#ffb080'); }
        else { P.follower = { name: `${e.nome} (Servo)` }; Game.spawnFollower(); Game.toast(`${e.nome} agora segue você.`, '#ffb080'); }
        Game.chron(`Comprei ${e.nome} como servo no Mercado Negro.`); this.escravos(a);
      } },
      { label: 'Voltar', fn: () => this.escravos(a) }
    ]);
  },
  ir(s, cena) {
    const b = Submundo.local(s, 'mercado_negro', 'Mercado Negro da Caverna do Mar');
    b.door = Submundo.beco(Object.assign({}, s, { id: s.id + '_porto' }));
    const ir = () => Game.enterInterior(b);
    if (!cena) return ir();
    Cena.tocar('mar', ['Kasim leva você até um velho cais escondido. — Entre no bote. Eu remo.', 'A noite cai. O bote corta o mar escuro, longe de qualquer porto...', 'Uma montanha surge das ondas. Na base, uma caverna iluminada por lanternas.', '— O único caminho é pelo mar. Bem-vindo(a) ao Mercado Negro.'], ir);
  }
};

// ---------------- ganchos ----------------
(function () {
  // os interiores do submundo
  const b0 = Interior.prototype.build;
  Interior.prototype.build = function (kind, r) { if (kind === 'esconderijo' || kind === 'mercado_negro') return Submundo.construir(this, kind); return b0.call(this, kind, r); };
  const s0 = Game.spawnInteriorNPCs;
  Game.spawnInteriorNPCs = function (L) { s0.call(this, L); if (L.subNPCs) Submundo.spawnNPCs(L); };
  // conversas
  const t0 = UI.talkNPC;
  UI.talkNPC = function (a) {
    if (a.sub) return a.sub === 'contrabandista' || (Game.level && Game.level.b && Game.level.b.sub === 'mercado_negro') ? Mercado.falar(a) : Submundo.falar(a);
    Submundo._alvo = Submundo.podeFurtar(a) ? a : null;
    try { return t0.call(this, a); } finally { Submundo._alvo = null; }
  };
  // a opção de furtar entra na conversa com qualquer morador
  const d0 = UI.dialog;
  UI.dialog = function (name, look, html, opts, ...r) {
    const a = Submundo._alvo;
    if (a && Array.isArray(opts)) { Submundo._alvo = null; opts = opts.slice(); opts.splice(Math.max(0, opts.length - 1), 0, { label: '🤏 Furtar', cls: 'danger', fn: () => Submundo.furtar(a) }); }
    return d0.call(this, name, look, html, opts, ...r);
  };
  // as lojas do mercado negro
  const g0 = Shops.generate;
  Shops.generate = function (b, role, rng) {
    if (role === 'negro_armas') {
      const P = Game.player, lvl = Math.max(P.level, 10) + 6, out = [];
      for (let i = 0; i < 6; i++) out.push(Items.randomGear(lvl, rng, 0.35, 'weapon'));
      for (let i = 0; i < 2; i++) out.push(Items.randomGear(lvl, rng, 0.3, 'armor'));
      for (const id of ['bacamarte_arcano', 'mosquete_imperial']) if (ITEMS[id]) out.push(Items.make(id));
      if (ITEMS.bala_arcana) out.push(Items.make('bala_arcana', rng.int(40, 100)));
      return out;
    }
    if (role === 'negro_venenos') return ['veneno_lamina', 'veneno_mortal', 'pocao_forca', 'pocao_velocidade', 'antidoto', 'elixir_heroi', 'pocao_vida_g'].filter(id => ITEMS[id]).map(id => Items.make(id, ITEMS[id].stack ? rng.int(2, 5) : 1));
    return g0.call(this, b, role, rng);
  };
  // NPCs do submundo ficam no lugar
  const u0 = NPC.prototype.update;
  if (u0) NPC.prototype.update = function (dt) { if (this.parado) { this.moving = false; return; } return u0.call(this, dt); };
})();
