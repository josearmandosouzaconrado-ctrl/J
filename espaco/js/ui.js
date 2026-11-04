'use strict';
// ===================== CRÔNICAS ESTELARES: telas, HUD, lojas e missões =====================
const MELHORIAS = {
  blaster: { nome: 'Blaster', desc: '+8 de dano a pé', preco: 300, onde: 'loja' },
  armadura: { nome: 'Traje blindado', desc: '+25 de vida e menos dano', preco: 280, onde: 'loja' },
  escudo: { nome: 'Gerador de escudo', desc: '+25 de escudo', preco: 260, onde: 'ambos' },
  casco: { nome: 'Casco reforçado', desc: '+60 de casco da nave', preco: 400, onde: 'estacao' },
  canhao: { nome: 'Canhões de plasma', desc: '+7 de dano da nave', preco: 380, onde: 'estacao' },
  motor: { nome: 'Motor de fusão', desc: '+40 de velocidade da nave', preco: 350, onde: 'estacao' },
  tanque: { nome: 'Tanque extra', desc: '+30 de combustível máximo', preco: 250, onde: 'estacao' }
};
const UI = {
  init() {
    this.el = id => document.getElementById(id);
    this.dlg = this.el('dlg'); this.tela = this.el('tela');
  },
  aberto() { return !this.dlg.classList.contains('hidden') || !this.tela.classList.contains('hidden'); },
  fechar() { this.dlg.classList.add('hidden'); this.tela.classList.add('hidden'); },
  mostrarHUD(v) { this.el('hud').classList.toggle('hidden', !v); this.el('controles').classList.toggle('hidden', !v); },
  toast(txt, cor = '#e0f0ff') { const t = document.createElement('div'); t.className = 'toast'; t.style.color = cor; t.textContent = txt; const box = this.el('toasts'); box.appendChild(t); while (box.children.length > 4) box.firstChild.remove(); setTimeout(() => t.remove(), 3200); },
  centro(a, b) { const c = this.el('centro'); c.innerHTML = `<b>${esc(a)}</b><small>${esc(b || '')}</small>`; c.classList.remove('vai'); void c.offsetWidth; c.classList.add('vai'); },
  retrato(look) { const S = Arte.pessoa(look), im = S.down[0], c = Px.cv(im.width * 3, im.height * 3), x = c.getContext('2d'); x.imageSmoothingEnabled = false; x.drawImage(im, 0, 0, c.width, c.height); return c.toDataURL(); },
  dialog(titulo, look, html, opts) {
    const d = this.dlg; d.classList.remove('hidden');
    d.innerHTML = `<div class="dlg-box">${look ? `<img class="ret" src="${this.retrato(look)}">` : ''}<div class="dlg-t">${esc(titulo)}</div><div class="dlg-txt">${html}</div><div class="dlg-ops"></div></div>`;
    const box = d.querySelector('.dlg-ops');
    for (const o of opts || [{ label: 'Ok' }]) { const b = document.createElement('button'); b.className = 'btn ' + (o.cls || ''); b.innerHTML = o.label; b.addEventListener('click', () => { if (o.fn) o.fn(); else this.fechar(); }); box.appendChild(b); }
  },
  painel(titulo, html, botoes) {
    const t = this.tela; t.classList.remove('hidden'); this.dlg.classList.add('hidden');
    t.innerHTML = `<div class="painel"><div class="p-t">${titulo}<button class="x">✕</button></div><div class="p-c">${html}</div></div>`;
    t.querySelector('.x').addEventListener('click', () => this.fechar());
    t.querySelectorAll('[data-i]').forEach(b => b.addEventListener('click', () => { const f = botoes[+b.dataset.i]; if (f) f(); }));
  },
  // ---------- título e criação ----------
  titulo() {
    this.mostrarHUD(false); J.estado = 'titulo';
    const t = this.tela; t.classList.remove('hidden');
    t.innerHTML = `<div class="titulo"><div class="logo">CRÔNICAS<br><span>ESTELARES</span></div><div class="sub">Um protótipo no universo de Crônicas de Eldoria — agora entre as estrelas</div>
      <button class="btn grande" id="t-novo">🚀 Novo jogo</button>${J.temSave() ? '<button class="btn grande" id="t-cont">▶ Continuar</button>' : ''}
      ${/\/espaco\/(index\.html)?$/.test(location.pathname) ? '<a class="btn" href="../index.html">⚔ Voltar para Crônicas de Eldoria</a>' : ''}<div class="dim small">Protótipo de teste • o jogo medieval continua existindo</div></div>`;
    this.el('t-novo').onclick = () => this.criacao();
    if (this.el('t-cont')) this.el('t-cont').onclick = () => { this.fechar(); J.carregar(); };
  },
  criacao() {
    let raca = 'humano', roupa = '#3a5a8a', nave = '#c8d0e0', pele = 0;
    const roupas = ['#3a5a8a', '#8a3a3a', '#3a7a4a', '#7a6a3a', '#5a3a7a', '#4a4a52'], naves = ['#c8d0e0', '#d08040', '#5a90d0', '#a04040', '#60a070', '#a080d0'];
    const desenha = () => {
      const R = RACAS[raca], look = { raca, pele: R.pele[pele % R.pele.length], roupa, cabelo: R.cabelo ? R.cabelo[pele % R.cabelo.length] : null, capacete: true, arma: true };
      this.tela.innerHTML = `<div class="painel criacao"><div class="p-t">Novo explorador</div><div class="p-c">
        <div class="cria-top"><img class="ret grande" src="${this.retrato(look)}"><div><b class="ouro">${R.nome}</b><br><span class="dim">${R.desc}</span><br><span class="bom">Bônus: ${R.bonusTxt}</span><br><span class="dim small">Planeta natal: ${Galaxia.planeta(LAR[raca]).nome}</span></div></div>
        <div class="lbl">Nome</div><input id="c-nome" maxlength="16" value="${esc(this._nome || 'Kael')}">
        <div class="lbl">Raça</div><div class="linha">${Object.entries(RACAS).map(([k, r]) => `<button class="btn mini ${k === raca ? 'on' : ''}" data-r="${k}">${r.nome}</button>`).join('')}</div>
        <div class="lbl">Tom</div><div class="linha">${R.pele.map((c, i) => `<button class="cor ${i === pele ? 'on' : ''}" data-p="${i}" style="background:${c}"></button>`).join('')}</div>
        <div class="lbl">Traje</div><div class="linha">${roupas.map(c => `<button class="cor ${c === roupa ? 'on' : ''}" data-ro="${c}" style="background:${c}"></button>`).join('')}</div>
        <div class="lbl">Nave</div><div class="linha">${naves.map(c => `<button class="cor ${c === nave ? 'on' : ''}" data-n="${c}" style="background:${c}"></button>`).join('')}</div>
        <button class="btn grande ouro" id="c-ok">Começar a aventura</button> <button class="btn" id="c-volta">Voltar</button></div></div>`;
      const nm = this.el('c-nome'); nm.addEventListener('input', () => this._nome = nm.value);
      this.tela.querySelectorAll('[data-r]').forEach(b => b.onclick = () => { raca = b.dataset.r; pele = 0; desenha(); });
      this.tela.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { pele = +b.dataset.p; desenha(); });
      this.tela.querySelectorAll('[data-ro]').forEach(b => b.onclick = () => { roupa = b.dataset.ro; desenha(); });
      this.tela.querySelectorAll('[data-n]').forEach(b => b.onclick = () => { nave = b.dataset.n; desenha(); });
      this.el('c-ok').onclick = () => { const nome = (nm.value || 'Kael').trim().slice(0, 16) || 'Kael'; this.fechar(); J.novo(nome, raca, { pele: look.pele, cabelo: look.cabelo, roupa, nave }); };
      this.el('c-volta').onclick = () => this.titulo();
    };
    this.tela.classList.remove('hidden'); desenha();
  },
  // ---------- HUD ----------
  hud(dt) {
    const P = J.P, s = J.st(), esp = J.modo === 'espaco';
    const bar = (id, v, m, txt) => { const f = this.el(id); f.querySelector('i').style.width = clamp(v / m * 100, 0, 100) + '%'; f.querySelector('span').textContent = txt; };
    bar('b1', esp ? P.casco : P.vida, esp ? s.maxCasco : s.maxVida, (esp ? 'Casco ' : 'Vida ') + Math.ceil(esp ? P.casco : P.vida));
    bar('b2', P.escudo, s.maxEscudo, 'Escudo ' + Math.ceil(P.escudo));
    bar('b3', P.comb, s.maxComb, 'Combustível ' + Math.ceil(P.comb));
    this.el('creditos').textContent = '◈ ' + fmt(P.creditos);
    const pr = this.el('prompt'); if (J.alvo && !this.aberto()) { pr.textContent = '[E] ' + J.alvo.txt; pr.classList.remove('hidden'); this.el('b-acao').classList.add('pulsa'); } else { pr.classList.add('hidden'); this.el('b-acao').classList.remove('pulsa'); }
    this.el('b-med').querySelector('b').textContent = P.itens.medkit || 0;
    this.el('missao').innerHTML = P.missoes.length ? '🎯 ' + P.missoes.map(m => esc(Missoes.texto(m))).join('<br>🎯 ') : '';
    this.mmT = (this.mmT || 0) - dt; if (this.mmT <= 0) { this.mmT = 0.25; this.minimapa(); }
  },
  local() { const P = J.P, S = Galaxia.sistema(P.sistema); this.el('local').textContent = J.modo === 'planeta' ? `${J.pl.nome} • ${S.nome}` : S.nome; this.el('b-mapa').classList.toggle('hidden', J.modo !== 'espaco'); },
  minimapa() {
    const x = J.mm, W = 90, H = 90; x.fillStyle = '#04060e'; x.fillRect(0, 0, W, H);
    const P = J.P;
    if (J.modo === 'espaco') {
      const S = Galaxia.sistema(P.sistema), k = W / 7400, c = (wx, wy) => [W / 2 + wx * k, H / 2 + wy * k];
      x.fillStyle = S.estrela; x.fillRect(W / 2 - 2, H / 2 - 2, 4, 4);
      x.strokeStyle = 'rgba(120,140,200,0.25)'; for (const pl of S.planetas) { x.beginPath(); x.arc(W / 2, H / 2, pl.orbita * k, 0, Math.PI * 2); x.stroke(); }
      for (const pl of S.planetas) { const q = Galaxia.pos(pl, P.tempo), [a, b] = c(q.x, q.y); x.fillStyle = BIOMAS[pl.bioma].espaco[1]; x.fillRect(a - 2, b - 2, 4, 4); }
      const e = Galaxia.posEstacao(S, P.tempo), [ea, eb] = c(e.x, e.y); x.fillStyle = '#ffe080'; x.fillRect(ea - 1, eb - 1, 3, 3);
      for (const n of J.ents) if (n.tipo === 'pirata') { const [a, b] = c(n.x, n.y); x.fillStyle = '#ff4040'; x.fillRect(a - 1, b - 1, 2, 2); }
      const [na, nb] = c(J.nave.x, J.nave.y); x.fillStyle = '#ffffff'; x.fillRect(na - 1, nb - 1, 3, 3);
    } else {
      const k = W / (SOLO * 16); x.drawImage(J.chao, 0, 0, W, H);
      for (const e of J.ents) { x.fillStyle = e.tipo === 'fera' ? '#ff4040' : '#60e0ff'; x.fillRect(e.x * k - 1, e.y * k - 1, 2, 2); }
      x.fillStyle = '#ffd040'; x.fillRect(J.solo.pista.x * 16 * k - 2, J.solo.pista.y * 16 * k - 2, 4, 4);
      x.fillStyle = '#ffffff'; x.fillRect(J.eu.x * k - 1, J.eu.y * k - 1, 3, 3);
    }
  },
  // ---------- conversas ----------
  falar(e) {
    const P = J.P, pl = J.pl, raca = e.raca || pl.raca, R = RACAS[raca];
    const fala = FALAS[raca][Math.floor(Math.random() * FALAS[raca].length)];
    const o = [];
    if (e.papel === 'mercador') { o.push({ label: '🛒 Comprar e vender', cls: 'ouro', fn: () => this.loja('loja') }); }
    if (e.papel === 'chefe') { o.push({ label: '🎯 Missões', cls: 'ouro', fn: () => this.missoes(hashStr(pl.id) + Math.floor(P.tempo / 300)) }); }
    o.push({ label: 'Tchau' });
    const intro = e.papel === 'mercador' ? `Cristais, amostras, sucata... eu compro tudo. E vendo o que você precisa para sobreviver.` : e.papel === 'chefe' ? `Sou o chefe desta colônia ${R.nome.toLowerCase()}. ${fala}` : fala;
    if (raca !== P.raca && e.papel === 'cidadao' && Math.random() < 0.3) Missoes.checar();
    this.dialog(e.nome, e.look, intro, o);
  },
  // ---------- loja (cidade) e estação ----------
  loja(onde) {
    const P = J.P, s = J.st(), venda = Object.entries(P.itens).filter(([id, n]) => n > 0 && ITENS[id].valor > 0 && id !== 'medkit');
    const total = venda.reduce((t, [id, n]) => t + ITENS[id].valor * n, 0);
    const btns = []; let i = 0; const b = (label, fn, cls = '') => { btns.push(fn); return `<button class="btn ${cls}" data-i="${i++}">${label}</button>`; };
    let h = `<div class="sec">Vender</div>${venda.length ? venda.map(([id, n]) => `<div class="item"><i style="background:${ITENS[id].cor}"></i>${n}× ${ITENS[id].nome} <span class="ouro">◈ ${ITENS[id].valor * n}</span></div>`).join('') + b(`Vender tudo (◈ ${fmt(total)})`, () => { for (const [id] of venda) delete P.itens[id]; P.creditos += total; Som.pega(); this.toast(`+${fmt(total)} créditos`, '#ffd040'); this.loja(onde); }, 'ouro') : '<div class="dim">Nada para vender. Minere cristais, cace criaturas, destrua piratas.</div>'}`;
    h += `<div class="sec">Comprar</div>`;
    h += b(`🩹 Kit médico (◈ 60) — você tem ${P.itens.medkit || 0}`, () => { if (P.creditos < 60) return this.toast('Créditos insuficientes.', '#ff8080'); P.creditos -= 60; P.itens.medkit = (P.itens.medkit || 0) + 1; this.loja(onde); });
    const falta = Math.ceil(s.maxComb - P.comb), pc = falta * 4;
    if (falta > 0) h += b(`⛽ Encher o tanque: ${falta} (◈ ${pc})`, () => { if (P.creditos < pc) return this.toast('Créditos insuficientes.', '#ff8080'); P.creditos -= pc; P.comb = s.maxComb; this.loja(onde); });
    if (onde === 'estacao') { const dano = Math.ceil(s.maxCasco - P.casco), pr = dano * 2; if (dano > 0) h += b(`🔧 Reparar o casco: ${dano} (◈ ${pr})`, () => { if (P.creditos < pr) return this.toast('Créditos insuficientes.', '#ff8080'); P.creditos -= pr; P.casco = s.maxCasco; this.loja(onde); }); }
    h += `<div class="sec">Melhorias</div>`;
    for (const [k, M] of Object.entries(MELHORIAS)) {
      if (M.onde !== 'ambos' && M.onde !== onde) continue;
      const nv = P.up[k], preco = M.preco * (nv + 1);
      h += nv >= 5 ? `<div class="item dim">${M.nome} — nível máximo</div>` : b(`⬆ ${M.nome} ${nv + 1}/5 — ${M.desc} (◈ ${fmt(preco)})`, () => { if (P.creditos < preco) return this.toast('Créditos insuficientes.', '#ff8080'); P.creditos -= preco; P.up[k]++; const s2 = J.st(); if (k === 'armadura') P.vida = s2.maxVida; if (k === 'escudo') P.escudo = s2.maxEscudo; if (k === 'casco') P.casco = s2.maxCasco; Som.pega(); this.toast(`${M.nome} nível ${P.up[k]}!`, '#80ff80'); this.loja(onde); });
    }
    this.painel(onde === 'estacao' ? '🛰 Mercado da estação' : '🛒 Loja da colônia', `<div class="ouro">◈ ${fmt(P.creditos)} créditos</div>${h}`, btns);
  },
  estacao() {
    const S = Galaxia.sistema(J.P.sistema), btns = [() => this.loja('estacao'), () => this.missoes(hashStr(S.id) + Math.floor(J.P.tempo / 300)), () => { J.salvar(); this.toast('Jogo salvo.', '#80ff80'); }, () => this.fechar()];
    this.painel(`🛰 ${S.estacao}`, `<div class="dim">Bem-vindo(a) à estação. Aqui você conserta a nave, compra melhorias e encontra trabalho.</div>
      <button class="btn ouro" data-i="0">🛒 Mercado, reparos e melhorias</button><button class="btn" data-i="1">🎯 Quadro de missões</button><button class="btn" data-i="2">💾 Salvar</button><button class="btn" data-i="3">🚀 Voltar para a nave</button>`, btns);
  },
  // ---------- missões ----------
  missoes(seed) {
    const P = J.P, lista = Missoes.gerar(seed), btns = []; let i = 0;
    const tem = P.missoes.map(m => `<div class="item">🎯 ${esc(Missoes.texto(m))} <span class="ouro">◈ ${m.rec}</span></div>`).join('') || '<div class="dim">Nenhuma missão ativa.</div>';
    const ofertas = lista.map(m => { const ja = P.missoes.some(x => x.id === m.id); btns.push(() => { if (ja) return; if (P.missoes.length >= 3) return this.toast('Máximo de 3 missões.', '#ff8080'); Missoes.aceitar(m); this.missoes(seed); }); return `<button class="btn ${ja ? 'on' : ''}" data-i="${i++}">${ja ? '✔ ' : ''}${esc(m.desc)} — <span class="ouro">◈ ${m.rec}</span></button>`; }).join('');
    this.painel('🎯 Missões', `<div class="sec">Suas missões</div>${tem}<div class="sec">Trabalhos disponíveis</div>${ofertas}`, btns);
  },
  // ---------- mapa da galáxia ----------
  mapa() {
    if (J.estado !== 'jogo') return;
    if (J.modo !== 'espaco') return this.toast('Volte para a nave e decole para usar o mapa da galáxia.', '#ffd080');
    if (this.aberto()) return this.fechar();
    const P = J.P, btns = []; let i = 0;
    const cv = Px.cv(300, 150), x = cv.getContext('2d');
    x.fillStyle = '#04060e'; x.fillRect(0, 0, 300, 150); for (let k = 0; k < 120; k++) { x.fillStyle = k % 5 ? '#4a5070' : '#c0c8e8'; x.fillRect(hash2(k, 1, 9) * 300, hash2(k, 2, 9) * 150, 1, 1); }
    x.strokeStyle = 'rgba(120,160,255,0.3)'; x.beginPath(); SISTEMAS.forEach((s, k) => { const a = s.gx * 300, b = s.gy * 150; if (k) x.lineTo(a, b); else x.moveTo(a, b); }); x.stroke();
    x.font = '12px VT323, monospace'; x.textAlign = 'center';
    for (const s of SISTEMAS) { const a = s.gx * 300, b = s.gy * 150; x.fillStyle = s.estrela; x.beginPath(); x.arc(a, b, s.id === P.sistema ? 6 : 4, 0, Math.PI * 2); x.fill(); if (s.id === P.sistema) { x.strokeStyle = '#ffffff'; x.beginPath(); x.arc(a, b, 9, 0, Math.PI * 2); x.stroke(); } x.fillStyle = '#e0f0ff'; x.fillText(s.nome, a, b + 18); }
    const sistemas = SISTEMAS.map(s => { btns.push(() => J.saltar(s.id)); return `<button class="btn ${s.id === P.sistema ? 'on' : ''}" data-i="${i++}">${s.id === P.sistema ? '📍 Você está em ' + s.nome : '🌀 Saltar para ' + s.nome + ' (15 de combustível)'}</button>`; }).join('');
    const S = Galaxia.sistema(P.sistema);
    const planetas = S.planetas.map(pl => `<div class="item"><i style="background:${BIOMAS[pl.bioma].espaco[1]}"></i><b>${pl.nome}</b> — ${BIOMAS[pl.bioma].nome}${pl.raca ? ' • ' + RACAS[pl.raca].plural : ' • sem solo (gás: combustível)'}${P.visitados.includes(pl.id) ? ' <span class="bom">✔</span>' : ''}</div>`).join('');
    this.painel('🌌 Mapa da galáxia', `<img class="mapa" src="${cv.toDataURL()}"><div class="ouro">Combustível: ${Math.ceil(P.comb)}</div>${sistemas}<div class="sec">Planetas de ${S.nome}</div>${planetas}`, btns);
  },
  // ---------- menu ----------
  menu() {
    if (J.estado !== 'jogo') return;
    if (this.aberto()) return this.fechar();
    const P = J.P, s = J.st(), R = RACAS[P.raca], btns = [() => this.inventario(), () => this.missoes(hashStr('menu') + Math.floor(P.tempo / 300)), () => { J.salvar(); this.toast('Jogo salvo.', '#80ff80'); }, () => { J.salvar(); this.fechar(); this.titulo(); }];
    this.painel('☰ ' + esc(P.nome), `<div class="cria-top"><img class="ret" src="${this.retrato(Object.assign({ capacete: true, arma: true }, P.look, { raca: P.raca }))}"><div><b class="ouro">${R.nome}</b> • ${R.bonusTxt}<br>Vida ${Math.ceil(P.vida)}/${s.maxVida} • Escudo ${Math.ceil(P.escudo)}/${s.maxEscudo} • Dano ${s.dano}<br>Nave: casco ${Math.ceil(P.casco)}/${s.maxCasco} • canhões ${s.canhao} • velocidade ${s.velNave}<br>Criaturas abatidas: ${P.abates} • Piratas destruídos: ${P.piratas} • Planetas visitados: ${P.visitados.length}</div></div>
      <button class="btn" data-i="0">🎒 Inventário</button><button class="btn" data-i="1">🎯 Missões</button><button class="btn" data-i="2">💾 Salvar</button><button class="btn" data-i="3">⏏ Salvar e sair para o título</button>`, btns);
  },
  inventario() {
    const P = J.P, it = Object.entries(P.itens).filter(([, n]) => n > 0);
    this.painel('🎒 Inventário', `<div class="ouro">◈ ${fmt(P.creditos)} créditos</div>${it.map(([id, n]) => `<div class="item"><i style="background:${ITENS[id].cor}"></i>${n}× ${ITENS[id].nome}${ITENS[id].valor ? ` <span class="dim">(◈ ${ITENS[id].valor} cada)</span>` : ''}</div>`).join('') || '<div class="dim">Vazio.</div>'}<button class="btn" data-i="0">🩹 Usar kit médico</button>`, [() => { J.usarMedkit(); this.inventario(); }]);
  }
};

// ---------------- missões ----------------
const Missoes = {
  gerar(seed) {
    const rng = new RNG(seed), P = J.P, S = Galaxia.sistema(P.sistema), solo = S.planetas.filter(p => p.raca), todos = SISTEMAS.flatMap(s => s.planetas.filter(p => p.raca)), out = [];
    const cr = ['cristal_laranja', 'cristal_azul', 'cristal_verde', 'cristal_vermelho', 'cristal_violeta', 'cristal_ciano'];
    for (let k = 0; k < 3; k++) {
      const t = rng.pick(['coletar', 'cacar', 'piratas', 'entrega']), id = seed + '-' + k;
      if (t === 'coletar') { const item = rng.pick(cr), n = rng.int(3, 6); out.push({ id, tipo: t, item, n, rec: Math.round(ITENS[item].valor * n * 1.7), desc: `Traga ${n} ${ITENS[item].nome}` }); }
      else if (t === 'cacar') { const pl = rng.pick(solo), n = rng.int(4, 8); out.push({ id, tipo: t, pl: pl.id, n, prog: 0, rec: Math.round(55 * n * J.nivel()), desc: `Elimine ${n} criaturas em ${pl.nome}` }); }
      else if (t === 'piratas') { const n = rng.int(2, 4); out.push({ id, tipo: t, n, prog: 0, rec: Math.round(160 * n * J.nivel()), desc: `Destrua ${n} naves piratas` }); }
      else { const pl = rng.pick(todos.filter(p => p.id !== P.planeta)); out.push({ id, tipo: t, pl: pl.id, n: 1, rec: 180 + (Galaxia.sistemaDe(pl.id).id !== P.sistema ? 260 : 0), desc: `Leve uma carga lacrada até ${pl.nome} (${Galaxia.sistemaDe(pl.id).nome})` }); }
    }
    return out;
  },
  aceitar(m) { const P = J.P; P.missoes.push(Object.assign({ prog: 0 }, m)); if (m.tipo === 'entrega') P.itens.carga = (P.itens.carga || 0) + 1; UI.toast('Missão aceita: ' + m.desc, '#ffe080'); this.checar(); },
  texto(m) { return m.tipo === 'coletar' ? `${m.desc} (${Math.min(m.n, J.P.itens[m.item] || 0)}/${m.n})` : m.tipo === 'entrega' ? m.desc : `${m.desc} (${m.prog}/${m.n})`; },
  pagar(m) { const P = J.P; P.missoes = P.missoes.filter(x => x !== m); P.creditos += m.rec; Som.salto(0.4); UI.centro('MISSÃO CUMPRIDA!', `${m.desc} • +${m.rec} créditos`); },
  evento(tipo, arg) {
    for (const m of J.P.missoes.slice()) {
      if (tipo === 'fera' && m.tipo === 'cacar' && m.pl === arg) { m.prog++; if (m.prog >= m.n) this.pagar(m); }
      if (tipo === 'pirata' && m.tipo === 'piratas') { m.prog++; if (m.prog >= m.n) this.pagar(m); }
      if (tipo === 'pouso' && m.tipo === 'entrega' && m.pl === arg) { J.P.itens.carga = Math.max(0, (J.P.itens.carga || 1) - 1); this.pagar(m); }
    }
  },
  checar() { const P = J.P; if (!P) return; for (const m of P.missoes.slice()) if (m.tipo === 'coletar' && (P.itens[m.item] || 0) >= m.n) { P.itens[m.item] -= m.n; this.pagar(m); } }
};

addEventListener('load', () => J.init());
