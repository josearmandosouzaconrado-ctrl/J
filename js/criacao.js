'use strict';
// =====================================================================
//  CRIAÇÃO DE PERSONAGEM: prévia andando nas 4 direções, abas de Raça,
//  Corpo, Cabelo, Roupas e Detalhes, cores livres, barba, olhos, traços
//  femininos, capa, cachecol, chapéu e botão de tudo aleatório.
//  A roupa escolhida é a que o herói usa até vestir uma armadura.
// =====================================================================
const CRIA = {
  olhos: ['#20142a', '#3a2a1a', '#3a6ab0', '#2a8a4a', '#7a4a20', '#8a8a9a', '#c0a020', '#b02020', '#8a40c0', '#40c0c0'],
  cabelo: ['#1a1410', '#3a2a1a', '#5a3a1a', '#8a5a2a', '#c08030', '#e0c070', '#f0e0b0', '#a03020', '#e05030', '#d8d8d8', '#f4f4f4', '#3a4a8a', '#8a3a8a', '#2a6a4a', '#e070a0'],
  roupa: ['#7a4a2a', '#4a6a3a', '#3a4a7a', '#7a3a3a', '#6a5a3a', '#5a3a6a', '#8a7a5a', '#3a6a6a', '#e8e0d0', '#2a2a30', '#a02848', '#c0a040', '#4a8ad0', '#d07030'],
  calca: ['#3a3020', '#2a2a30', '#4a3a2a', '#3a3a3a', '#e8e4dc', '#2a3a5a', '#5a2a2a', '#3a4a2a'],
  botas: ['#3a2a1a', '#1a1a1a', '#5a3a20', '#6a6a70', '#8a6a40', '#2a2a3a'],
  acess: ['#7a1a1a', '#1a3a6a', '#2a5a2a', '#3a2a4a', '#e0d8c0', '#1a1a1a', '#c0a040', '#a04060'],
  labios: ['#c04a5a', '#a03040', '#d07080', '#8a3a4a', '#5a2a3a'],
  estilos: [['tunica', 'Túnica'], ['vestido', 'Vestido / manto'], ['colete', 'Colete'], ['avental', 'Avental'], ['listrada', 'Listrada']],
  penteados: ['Curto', 'Longo', 'Careca', 'Moicano', 'Coque'],
  chapeus: [[null, 'Nenhum'], ['straw', 'Palha'], ['wide', 'Abas largas'], ['cap', 'Boné'], ['bandana', 'Bandana'], ['beret', 'Boina'], ['flores', 'Flores'], ['lenco', 'Lenço']],
  abas: [['raca', 'Raça'], ['corpo', 'Corpo'], ['cabelo', 'Cabelo'], ['roupa', 'Roupas'], ['detalhes', 'Detalhes']]
};

const Criacao = {
  novo() { return { race: 'humano', sex: 'm', skin: 0, hairC: null, hairStyle: 0, olhos: null, beard: null, beardC: null, tracos: true, labios: null, blush: false, estilo: 'tunica', cor: '#7a5a3a', cor2: '#3a2a1a', calca: '#3a3020', botas: '#3a2a1a', capa: null, cachecol: null, faixa: null, bolsa: false, chapeu: null, chapeuC: '#c8a050', name: '', seed: '', aba: 'raca' }; },
  // o que fica salvo no herói (P.app)
  app(c) {
    const R = RACES[c.race];
    return { skin: R.skins[Math.min(c.skin, R.skins.length - 1)], hair: c.hairC || R.hairs[0], hairStyle: c.hairStyle, sex: c.sex, olhos: c.olhos, beard: c.sex === 'm' ? !!c.beard : false, beardC: c.beardC, tracos: c.tracos, labios: c.labios, blush: c.blush,
      roupa: { estilo: c.estilo, cor: c.cor, cor2: c.cor2, calca: c.calca, botas: c.botas, capa: c.capa, cachecol: c.cachecol, faixa: c.faixa, bolsa: c.bolsa, chapeu: c.chapeu, chapeuC: c.chapeuC } };
  },
  // a aparência personalizada por cima da aparência da raça
  aplicar(L, a, semArmadura, semElmo, semBotas) {
    if (a.olhos) L.eyes = a.olhos;
    if (a.sex === 'f' && a.tracos !== false) { L.fem = true; if (a.labios) L.lips = a.labios; }
    if (a.sex === 'm' && a.beard === true && !L.snout && !L.muzzle) L.beard = true;
    if (a.beard === false) delete L.beard;
    if (L.beard && a.beardC) L.beardC = a.beardC;
    if (a.blush) L.blush = true;
    const r = a.roupa; if (!r) return L;
    if (semArmadura) {
      delete L.chestplate; L.robe = r.estilo === 'vestido'; L.body = r.cor; L.legs = r.calca;
      if (r.estilo === 'colete') { L.vest = r.cor2; L.shirt = shade(r.cor, 0.45); }
      if (r.estilo === 'avental') L.apron = r.cor2;
      if (r.estilo === 'listrada') L.stripes = r.cor2;
      if (r.bolsa) L.pouch = true;
    }
    if (semBotas && r.botas) L.boots = r.botas;
    if (r.capa) L.cape = r.capa;
    if (r.cachecol) L.scarf = r.cachecol;
    if (r.faixa) L.sash = r.faixa;
    if (semElmo && r.chapeu) { L.hat = r.chapeu; L.hatC = r.chapeuC || '#c8a050'; }
    return L;
  },
  // a prévia: igual ao que o herói vai vestir no começo (Roupas Gastas = a roupa escolhida)
  look(c, raca) {
    const R = RACES[raca || c.race], cc = raca ? Object.assign({}, c, { race: raca, skin: 0, hairC: null }) : c, a = this.app(cc);
    const L = { k: 'hum', skin: a.skin, hair: a.hair, hairStyle: a.hairStyle, body: CLASSES.aventureiro.color, legs: '#3a3028', boots: '#3a2a1a' };
    if (R.ears) L.ears = R.ears; if (R.tall) L.tall = 1; if (R.short) L.short = R.short; if (R.bulky) L.bulky = true;
    if (R.beard && a.sex === 'm' && a.beard !== false) L.beard = true;
    if (R.tusks) L.tusks = true; if (R.snout) L.snout = true; if (R.horns) L.horns = true;
    if (R.tail) { L.tail = true; L.tailC = R.tailHair ? a.hair : a.skin; }
    if (R.catears) L.catears = true; if (R.muzzle) L.muzzle = true; if (R.eyes) L.eyes = R.eyes;
    return this.aplicar(L, a, true, true, true);
  },
  aleatorio(c) {
    const r = a => a[Math.floor(Math.random() * a.length)], racas = Object.keys(RACES).filter(k => !RACES[k].npcOnly);
    const fica = { seed: c.seed, aba: c.aba };
    Object.assign(c, this.novo(), fica);
    c.race = r(racas); c.sex = Math.random() < 0.5 ? 'm' : 'f';
    const R = RACES[c.race];
    c.skin = Math.floor(Math.random() * R.skins.length); c.hairC = Math.random() < 0.7 ? r(R.hairs) : r(CRIA.cabelo);
    c.hairStyle = c.sex === 'f' ? r([1, 1, 4, 0, 3]) : r([0, 0, 2, 3, 4, 1]);
    c.olhos = Math.random() < 0.5 ? null : r(CRIA.olhos); c.beard = R.beard ? Math.random() < 0.85 : Math.random() < 0.3; c.labios = c.sex === 'f' && Math.random() < 0.5 ? r(CRIA.labios) : null; c.blush = Math.random() < 0.25;
    c.estilo = r(CRIA.estilos)[0]; c.cor = r(CRIA.roupa); c.cor2 = r(CRIA.roupa); c.calca = r(CRIA.calca); c.botas = r(CRIA.botas);
    c.capa = Math.random() < 0.35 ? r(CRIA.acess) : null; c.cachecol = Math.random() < 0.25 ? r(CRIA.acess) : null; c.faixa = Math.random() < 0.3 ? r(CRIA.acess) : null; c.bolsa = Math.random() < 0.4;
    c.chapeu = Math.random() < 0.3 ? r(CRIA.chapeus.slice(1))[0] : null; c.chapeuC = r(CRIA.roupa);
  },
  nomeAleatorio(c) { const N = NAMES[c.race]; c.name = N[c.sex][Math.floor(Math.random() * N[c.sex].length)]; c._auto = true; },

  // ---------- a tela ----------
  tela() {
    const U = UI, c = U.cc = U.cc && U.cc.estilo ? U.cc : this.novo();
    const render = () => {
      const R = RACES[c.race]; c.skin = Math.min(c.skin, R.skins.length - 1);
      if (c.beard === null) c.beard = !!R.beard;   // barba começa como a raça costuma usar
      // nome sorteado acompanha o sexo e a raça; nome digitado fica como está
      if (!c.name || (c._auto && (c._sx !== c.sex || c._rc !== c.race))) { this.nomeAleatorio(c); c._auto = true; }
      c._sx = c.sex; c._rc = c.race;
      const f = U.reg(), set = (k, v) => f(() => { c[k] = v; render(); });
      const cores = (k, lista, nada) => `<div class="row swatches">${nada ? `<button class="sw nada ${!c[k] ? 'on' : ''}" ${set(k, null)}>✕</button>` : ''}${lista.map(s => `<button class="sw ${c[k] === s ? 'on' : ''}" style="background:${s}" ${set(k, s)}></button>`).join('')}</div>`;
      const botoes = (k, lista) => `<div class="row wrap">${lista.map(([v, n]) => `<button class="sbtn small ${c[k] === v ? 'on' : ''}" ${set(k, v)}>${n}</button>`).join('')}</div>`;
      let aba = '';
      if (c.aba === 'raca') aba = `<div class="choice-grid">${Object.entries(RACES).filter(([k, r]) => !r.npcOnly).map(([k, r]) => `<button class="choice ${c.race === k ? 'on' : ''}" ${f(() => { c.race = k; c.skin = 0; c.hairC = null; c.beard = null; c.name = ''; render(); })}>${U.portrait(this.look(c, k))}<span>${r.name}</span></button>`).join('')}</div>
        <div class="desc"><b>${R.name}:</b> ${R.desc}<br><span class="dim">Habilidade: ${RACE_ABILITIES[R.ability].name} — ${RACE_ABILITIES[R.ability].desc}</span></div>`;
      else if (c.aba === 'corpo') aba = `<label>Sexo</label>${botoes('sex', [['m', 'Masculino'], ['f', 'Feminino']])}
        <label>Tom de pele</label><div class="row swatches">${R.skins.map((s, i) => `<button class="sw ${c.skin === i ? 'on' : ''}" style="background:${s}" ${set('skin', i)}></button>`).join('')}</div>
        <label>Cor dos olhos</label>${cores('olhos', CRIA.olhos, true)}
        ${c.sex === 'f' ? `<label>Traços femininos (cílios e boca)</label>${botoes('tracos', [[true, 'Sim'], [false, 'Não']])}${c.tracos ? `<label>Cor da boca</label>${cores('labios', CRIA.labios, true)}` : ''}` : ''}
        <label>Bochechas coradas</label>${botoes('blush', [[false, 'Não'], [true, 'Sim']])}`;
      else if (c.aba === 'cabelo') aba = `<label>${c.race === 'draconato' ? 'Detalhes' : 'Penteado'}</label>${botoes('hairStyle', CRIA.penteados.map((n, i) => [i, n]))}
        <label>Cor do cabelo <span class="dim small">(da raça)</span></label><div class="row swatches">${R.hairs.map(s => `<button class="sw ${(c.hairC || R.hairs[0]) === s ? 'on' : ''}" style="background:${s}" ${set('hairC', s)}></button>`).join('')}</div>
        <label>Outras cores</label>${cores('hairC', CRIA.cabelo.filter(x => !R.hairs.includes(x)))}
        ${c.sex === 'm' && !R.snout && !R.muzzle ? `<label>Barba</label>${botoes('beard', [[true, 'Com barba'], [false, 'Sem barba']])}${c.beard ? `<label>Cor da barba</label>${cores('beardC', CRIA.cabelo, true)}<span class="dim small">✕ = a mesma do cabelo</span>` : ''}` : ''}`;
      else if (c.aba === 'roupa') aba = `<label>Estilo</label>${botoes('estilo', CRIA.estilos)}
        <label>Cor da roupa</label>${cores('cor', CRIA.roupa)}
        ${c.estilo === 'colete' || c.estilo === 'avental' || c.estilo === 'listrada' ? `<label>Cor do ${c.estilo === 'colete' ? 'colete' : c.estilo === 'avental' ? 'avental' : 'listrado'}</label>${cores('cor2', CRIA.roupa)}` : ''}
        ${c.estilo !== 'vestido' ? `<label>Calça</label>${cores('calca', CRIA.calca)}` : ''}
        <label>Botas</label>${cores('botas', CRIA.botas)}
        <label>Capa</label>${cores('capa', CRIA.acess, true)}`;
      else aba = `<label>Chapéu</label>${botoes('chapeu', CRIA.chapeus)}${c.chapeu ? `<label>Cor do chapéu</label>${cores('chapeuC', CRIA.roupa)}` : ''}
        <label>Cachecol</label>${cores('cachecol', CRIA.acess, true)}
        <label>Faixa na cintura</label>${cores('faixa', CRIA.acess, true)}
        <label>Bolsa no cinto</label>${botoes('bolsa', [[false, 'Não'], [true, 'Sim']])}
        <div class="dim small" style="margin-top:6px">A roupa e os acessórios aparecem até você vestir uma armadura. Capa, cachecol e faixa continuam por cima dela.</div>`;
      const el = U.show('create', `
        <div class="panel create">
          <div class="ptitle">Criar Personagem</div>
          <div class="create-grid">
            <div class="create-left">
              <div class="preview"><canvas id="cc-prev" width="160" height="72"></canvas><div class="dim small">${R.name} • ${c.sex === 'f' ? 'Feminino' : 'Masculino'}</div></div>
              <button class="mbtn small" ${f(() => { this.aleatorio(c); this.nomeAleatorio(c); render(); })}>🎲 Tudo aleatório</button>
              <label>Nome</label>
              <div class="row"><input id="cc-name" maxlength="18" value="${esc(c.name)}" style="flex:1"><button class="sbtn" title="Nome aleatório" ${f(() => { this.nomeAleatorio(c); render(); })}>🎲</button></div>
              ${Rede.pendente ? '<label>Mundo</label><div class="gold">🌐 Mundo do multiplayer</div><input id="cc-seed" type="hidden" value="">' : `<label>Semente do mundo (opcional)</label><input id="cc-seed" placeholder="aleatória" value="${esc(c.seed)}" inputmode="numeric">`}
            </div>
            <div class="create-right">
              <div class="row wrap abas">${CRIA.abas.map(([k, n]) => `<button class="sbtn ${c.aba === k ? 'on' : ''}" ${set('aba', k)}>${n}</button>`).join('')}</div>
              ${aba}
              ${c.aba === 'raca' ? '<div class="desc"><b>Sem classe fixa.</b> Você começa como Aventureiro e decide jogando: quem usa espadas vira Guerreiro, quem lança magias vira Mago, quem atira flechas vira Arqueiro... Você também pode escolher uma bênção nas <b>Pedras do Destino</b> perto da capital.</div>' : ''}
            </div>
          </div>
          <div class="row end">
            <button class="mbtn small" ${f(() => Rede.pendente ? U.multiplayer() : U.showTitle())}>Voltar</button>
            <button class="mbtn gold" ${f(() => {
              c.name = (document.getElementById('cc-name').value || '').trim() || c.name;
              const seedv = Rede.pendente ? Rede.seed : parseInt((document.getElementById('cc-seed').value || '').replace(/\D/g, '')) || 0;
              Game.mp = !!Rede.pendente;
              clearInterval(this.anim);
              Game.newGame({ name: c.name, race: c.race, cls: 'aventureiro', app: this.app(c), seed: seedv });
            })}>Começar Aventura ▶</button>
          </div>
        </div>`, { cls: 'scroll' });
      U.bind(el, f);
      const ni = document.getElementById('cc-name'); ni.addEventListener('input', () => { c.name = ni.value; c._auto = false; }); ni.addEventListener('keydown', e => e.stopPropagation());
      const si = document.getElementById('cc-seed'); si.addEventListener('input', () => c.seed = si.value);
      this.prever(this.look(c));
    };
    render();
  },
  // prévia andando nas quatro direções
  prever(L) {
    const S = Sprites.actor(L);
    clearInterval(this.anim); let q = 0;
    const desenha = () => {
      const cv = document.getElementById('cc-prev'); if (!cv) { clearInterval(this.anim); return; }
      const x = cv.getContext('2d'), f = [0, 1, 0, 2][q++ % 4], dirs = ['down', 'right', 'up', 'left'], w = S.down[0].width, h = S.down[0].height;
      const esc2 = Math.max(1, Math.floor(Math.min(cv.width / 4 / w, cv.height / h)));
      x.clearRect(0, 0, cv.width, cv.height); x.imageSmoothingEnabled = false;
      dirs.forEach((d, i) => { const im = S[d][f]; x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(i * cv.width / 4 + cv.width / 8 - w * esc2 * 0.3, cv.height - 4, w * esc2 * 0.6, 3); x.drawImage(im, Math.round(i * cv.width / 4 + cv.width / 8 - im.width * esc2 / 2), cv.height - im.height * esc2 - 2, im.width * esc2, im.height * esc2); });
    };
    desenha(); this.anim = setInterval(desenha, 220);
  }
};

// ---------------- ganchos ----------------
(function () {
  UI.showCreate = function () { Criacao.tela(); };
  UI.previewLook = function (c) { return c && c.estilo ? Criacao.look(c) : Criacao.look(Object.assign(Criacao.novo(), c, { hairC: c && RACES[c.race] ? RACES[c.race].hairs[c.hair || 0] : null })); };
  // no jogo: a aparência personalizada por cima do que o herói veste
  const b0 = Player.prototype.buildLook;
  Player.prototype.buildLook = function () {
    b0.call(this);
    const a = this.app; if (!a || (!a.roupa && !a.olhos && a.sex !== 'f' && a.beard === undefined && !a.blush)) return;
    const b = this.equip.body, semArmadura = !b || b.id === 'roupa_simples';
    Criacao.aplicar(this.look, a, semArmadura, !this.equip.head, !this.equip.feet);
    this.S = Sprites.actor(this.look); this.h = this.S.h;
  };
})();
