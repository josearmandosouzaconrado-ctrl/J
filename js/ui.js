'use strict';
// ===================== INTERFACE =====================
const UI = {
  current: null,
  init() {
    this.root = document.getElementById('screens');
    this.hud = document.getElementById('hud');
    this.controls = document.getElementById('controls');
    this.toasts = document.getElementById('toasts');
    this.mm = document.getElementById('minimap');
    this.mmx = this.mm.getContext('2d');
    this.hudCache = {};
    this.mmT = 0;
    this.portraitCache = new Map();
    const setIcon = (id, icon, size = 30) => { const b = document.getElementById(id); if (b) b.innerHTML = `<img src="${Sprites.iconURL(icon)}" style="width:${size}px;height:${size}px">`; };
    setIcon('b-attack', { k: 'sword', c: '#d0d8e0' }, 38);
    setIcon('b-potion', { k: 'potion', c: '#e03030' }, 26);
    setIcon('b-mana', { k: 'potion', c: '#3070f0' }, 22);
    setIcon('b-shout', { k: 'soul', c: '#ffb040' }, 26);
    setIcon('b-roll', { k: 'feet', c: '#a08060' }, 26);
    const H = Sprites.horse(); document.getElementById('b-mount').innerHTML = `<img src="${H.right[0].toDataURL()}" style="width:30px;height:25px">`;
    document.getElementById('b-map').innerHTML = `<img src="${Sprites.iconURL({ k: 'scroll', c: '#e0d0a0' })}" style="width:24px;height:24px">`;
    document.getElementById('b-menu').innerHTML = `<img src="${Sprites.iconURL({ k: 'tome', c: '#a03030' })}" style="width:24px;height:24px">`;
    document.getElementById('tracker').addEventListener('click', () => { if (Game.started && !UI.current) UI.openMenu('quests'); });
    this.mm.addEventListener('click', () => { if (Game.started && !UI.current) UI.openMap(); });
    document.addEventListener('contextmenu', e => e.preventDefault());
  },
  reg() { const fns = []; const f = fn => 'data-fn="' + (fns.push(fn) - 1) + '"'; f.fns = fns; return f; },
  bind(el, f) {
    el.querySelectorAll('[data-fn]').forEach(e => {
      const fn = f.fns[+e.dataset.fn];
      e.addEventListener('click', ev => { ev.stopPropagation(); Sfx.unlock(); Sfx.play('pickup'); fn(ev, e); });
    });
  },
  icon(icon, cls = 'ic') { return `<img class="${cls}" src="${Sprites.iconURL(icon)}">`; },
  portrait(look) {
    if (!look) return '';
    const k = JSON.stringify(look);
    let u = this.portraitCache.get(k);
    if (!u) { const S = Sprites.actor(look); const img = S.down ? S.down[0] : S.right[0]; const c = Sprites.scale(img, 4); u = c.toDataURL(); this.portraitCache.set(k, u); }
    return `<img class="portrait" src="${u}">`;
  },
  // ---------- gerenciamento de telas ----------
  show(name, html, opts = {}) {
    this.closeAll(true);
    const el = document.createElement('div');
    el.className = 'screen ' + (opts.cls || '');
    el.innerHTML = html;
    this.root.appendChild(el);
    this.current = { name, el, onBack: opts.onBack };
    if (Game.started) Game.paused = true;
    Input.clear();
    return el;
  },
  closeAll(keepPause) {
    this.root.innerHTML = '';
    this.current = null;
    if (!keepPause && Game.started && Game.player && !Game.player.dead) Game.paused = false;
  },
  close() { this.closeAll(false); Input.clear(); },
  back() { if (this.current && this.current.onBack) this.current.onBack(); else if (this.current && this.current.name !== 'title' && this.current.name !== 'death' && this.current.name !== 'loading' && this.current.name !== 'create') this.close(); },
  showHUD(on) { this.hud.classList.toggle('hidden', !on); this.controls.classList.toggle('hidden', !on); },
  fade() { const f = document.getElementById('fade'); f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); },
  toast(text, color = '#f0e0c0', icon) {
    const now = performance.now();
    if (this.lastToast === text && now - this.lastToastT < 1500) return;
    this.lastToast = text; this.lastToastT = now;
    const d = document.createElement('div');
    d.className = 'toast';
    d.innerHTML = (icon ? this.icon(icon) : '') + `<span style="color:${color}">${esc(text)}</span>`;
    this.toasts.appendChild(d);
    while (this.toasts.children.length > 5) this.toasts.removeChild(this.toasts.firstChild);
    setTimeout(() => d.classList.add('out'), 2600);
    setTimeout(() => d.remove(), 3200);
  },
  centerMsg(title, sub) {
    const c = document.getElementById('center-msg');
    c.innerHTML = `<div class="cm-title">${esc(title)}</div>${sub ? `<div class="cm-sub">${esc(sub)}</div>` : ''}`;
    c.classList.remove('show'); void c.offsetWidth; c.classList.add('show');
  },
  worldText(x, y, text, color, size) {
    const d = document.createElement('div');
    d.className = 'wtext';
    d.style.left = ((x - Game.camX) * Game.scale) + 'px'; d.style.top = ((y - Game.camY) * Game.scale) + 'px';
    d.style.color = color; d.style.fontSize = (16 * size) + 'px';
    d.textContent = text;
    this.hud.appendChild(d);
    setTimeout(() => d.remove(), 1400);
  },
  showLoading(text) {
    this.show('loading', `<div class="loading"><div class="lt">${esc(text)}</div><div class="spinner"></div><div class="dim">Gerando reinos, cidades, estradas e masmorras...</div></div>`, { cls: 'dark' });
  },

  // ---------- Título ----------
  showTitle() {
    this.showHUD(false);
    const f = this.reg();
    const saves = [0, 1, 2, 3].filter(i => Game.hasSave(i)).map(i => ({ i, s: Game.saveInfo(i) })).sort((a, b) => (b.s ? b.s.date : 0) - (a.s ? a.s.date : 0));
    const el = this.show('title', `
      <div class="title-screen">
        <h1 class="logo">CRÔNICAS<small>de</small>ELDORIA</h1>
        <div class="tagline">Um RPG de fantasia medieval em mundo aberto</div>
        <div class="menu-col">
          ${saves.length ? `<button class="mbtn gold" ${f(() => Game.loadGame(saves[0].i))}>Continuar<br><small>${esc(saves[0].s ? saves[0].s.name + ' • Nv ' + saves[0].s.level : '')}</small></button>` : ''}
          <button class="mbtn" ${f(() => this.showCreate())}>Novo Jogo</button>
          ${saves.length ? `<button class="mbtn" ${f(() => this.slots('load'))}>Carregar</button>` : ''}
          <button class="mbtn" ${f(() => this.multiplayer())}>Multiplayer <small class="soon">EM BREVE</small></button>
          <button class="mbtn" ${f(() => this.options())}>Opções</button>
          <button class="mbtn" ${f(() => this.help())}>Como Jogar</button>
        </div>
        <div class="ver">2 continentes • 12 reinos • 9 raças • guerras entre reinos • 160+ masmorras</div>
      </div>`, { cls: 'transparent' });
    this.bind(el, f);
    Game.state = 'title';
  },
  multiplayer() {
    const f = this.reg();
    const el = this.show('multi', `<div class="panel small"><div class="ptitle">Multiplayer</div>
      <div class="ctext"><b class="gold">Em breve!</b><br><br>Explore Eldoria com amigos, forme guildas, lute nas guerras entre reinos e negocie nas cidades.<br><br><span class="dim">O modo multiplayer ainda está em desenvolvimento.</span></div>
      <div class="menu-col"><button class="mbtn" disabled style="opacity:.5">Criar Sala</button><button class="mbtn" disabled style="opacity:.5">Entrar em Sala</button><button class="mbtn" ${f(() => this.showTitle())}>Voltar</button></div></div>`, { cls: 'transparent', onBack: () => this.showTitle() });
    this.bind(el, f);
  },
  // ---------- Criação de personagem ----------
  showCreate() {
    const c = this.cc = this.cc || { race: 'humano', cls: 'aventureiro', sex: 'm', skin: 0, hair: 0, hairStyle: 0, name: '', seed: '' };
    const render = () => {
      c.cls = 'aventureiro';
      const R = RACES[c.race], C = CLASSES[c.cls];
      c.skin = Math.min(c.skin, R.skins.length - 1); c.hair = Math.min(c.hair, R.hairs.length - 1);
      if (!c.name) { const N = NAMES[c.race]; c.name = N[c.sex][Math.floor(Math.random() * N[c.sex].length)]; }
      const f = this.reg();
      const look = this.previewLook(c);
      const el = this.show('create', `
        <div class="panel create">
          <div class="ptitle">Criar Personagem</div>
          <div class="create-grid">
            <div class="create-left">
              <div class="preview">${this.portrait(look)}</div>
              <label>Nome</label>
              <input id="cc-name" maxlength="18" value="${esc(c.name)}">
              <div class="row">
                <button class="sbtn ${c.sex === 'm' ? 'on' : ''}" ${f(() => { c.sex = 'm'; c.name = ''; render(); })}>Masculino</button>
                <button class="sbtn ${c.sex === 'f' ? 'on' : ''}" ${f(() => { c.sex = 'f'; c.name = ''; render(); })}>Feminino</button>
              </div>
              <label>Pele</label><div class="row swatches">${R.skins.map((s, i) => `<button class="sw ${c.skin === i ? 'on' : ''}" style="background:${s}" ${f(() => { c.skin = i; render(); })}></button>`).join('')}</div>
              <label>${c.race === 'draconato' ? 'Detalhes' : 'Cabelo'}</label><div class="row swatches">${R.hairs.map((s, i) => `<button class="sw ${c.hair === i ? 'on' : ''}" style="background:${s}" ${f(() => { c.hair = i; render(); })}></button>`).join('')}</div>
              <label>Estilo</label><div class="row">${['Curto', 'Longo', 'Careca', 'Moicano', 'Coque'].map((n, i) => `<button class="sbtn small ${c.hairStyle === i ? 'on' : ''}" ${f(() => { c.hairStyle = i; render(); })}>${n}</button>`).join('')}</div>
              <label>Semente do mundo (opcional)</label>
              <input id="cc-seed" placeholder="aleatória" value="${esc(c.seed)}" inputmode="numeric">
            </div>
            <div class="create-right">
              <label>Raça</label>
              <div class="choice-grid">${Object.entries(RACES).map(([k, r]) => `<button class="choice ${c.race === k ? 'on' : ''}" ${f(() => { c.race = k; c.name = ''; render(); })}>${this.portrait(this.previewLook(Object.assign({}, c, { race: k, skin: 0, hair: 0 })))}<span>${r.name}</span></button>`).join('')}</div>
              <div class="desc"><b>${R.name}:</b> ${R.desc}<br><span class="dim">Habilidade: ${RACE_ABILITIES[R.ability].name} — ${RACE_ABILITIES[R.ability].desc}</span></div>
              <div class="desc"><b>Sem classe fixa.</b> Você começa como Aventureiro e decide jogando: quem usa espadas vira Guerreiro, quem lança magias vira Mago, quem atira flechas vira Arqueiro... Você também pode escolher uma bênção nas <b>Pedras do Destino</b> perto da capital.</div>
            </div>
          </div>
          <div class="row end">
            <button class="mbtn small" ${f(() => this.showTitle())}>Voltar</button>
            <button class="mbtn gold" ${f(() => {
              c.name = (document.getElementById('cc-name').value || '').trim() || c.name;
              const seedv = parseInt((document.getElementById('cc-seed').value || '').replace(/\D/g, '')) || 0;
              Game.newGame({ name: c.name, race: c.race, cls: c.cls, app: { skin: RACES[c.race].skins[c.skin], hair: RACES[c.race].hairs[c.hair], hairStyle: c.hairStyle, sex: c.sex }, seed: seedv });
            })}>Começar Aventura ▶</button>
          </div>
        </div>`, { cls: 'scroll' });
      this.bind(el, f);
      const ni = document.getElementById('cc-name'); ni.addEventListener('input', () => c.name = ni.value);
      const si = document.getElementById('cc-seed'); si.addEventListener('input', () => c.seed = si.value);
    };
    render();
  },
  previewLook(c) {
    const R = RACES[c.race];
    const L = { k: 'hum', skin: R.skins[Math.min(c.skin, R.skins.length - 1)], hair: R.hairs[Math.min(c.hair, R.hairs.length - 1)], hairStyle: c.hairStyle, body: CLASSES[c.cls].color, legs: '#3a3028' };
    if (R.ears) L.ears = R.ears; if (R.tall) L.tall = 1; if (R.short) L.short = R.short; if (R.bulky) L.bulky = true;
    if (R.beard && c.sex === 'm') L.beard = true; if (R.tusks) L.tusks = true; if (R.snout) L.snout = true; if (R.horns) L.horns = true;
    if (R.tail) { L.tail = true; L.tailC = L.skin; } if (R.catears) L.catears = true; if (R.muzzle) L.muzzle = true;
    return L;
  },
  story(lines, cb) {
    let i = 0;
    const render = () => {
      const f = this.reg();
      const el = this.show('story', `<div class="story"><div class="story-text">${esc(lines[i])}</div><button class="mbtn" ${f(() => { i++; if (i < lines.length) render(); else { this.close(); cb && cb(); } })}>${i < lines.length - 1 ? 'Continuar ▶' : 'Começar'}</button></div>`, { cls: 'dark', onBack: () => { this.close(); cb && cb(); } });
      this.bind(el, f);
    };
    render();
  },
  help() {
    const f = this.reg();
    const el = this.show('help', `<div class="panel scrollp"><div class="ptitle">Como Jogar</div><div class="helptext">
      <p><b>Celular:</b> arraste o lado esquerdo da tela para andar (empurre até o fim para correr). Botões à direita: ⚔ atacar (mira automática), magia, esquiva, poção, grito, habilidade racial e cavalo. O botão de ação aparece quando há algo para interagir.</p>
      <p><b>Teclado:</b> WASD/setas andar • Shift correr • J/Espaço atacar • K magia • Q trocar magia • 1-9 escolher magia • L esquivar • E interagir • F poção de vida • G poção de magia • R grito • C trocar grito • T habilidade racial • H cavalo • I/Tab menu • M mapa.</p>
      <p><b>Mundo:</b> 9 reinos com 65+ cidades, 140+ masmorras, acampamentos, santuários e pedras rúnicas. Explore! Regiões mais distantes de Valdoria são mais perigosas.</p>
      <p><b>Guildas:</b> entre na Guilda dos Heróis (em toda cidade) e suba do Rank F ao S. Cada reino tem a sede de uma guilda especial com recompensas únicas.</p>
      <p><b>Dragões:</b> a partir do nível 5 dragões atacam pelo mundo. Mate-os, absorva suas almas e use-as nas Pedras Rúnicas para aprender Gritos.</p>
      <p><b>Criação:</b> minere veios, colete ervas, use forjas e bancadas (nas lojas) para criar armas, armaduras e poções. Cozinhe em fogueiras.</p>
      <p><b>Dica:</b> instale no celular pelo menu do navegador “Adicionar à tela inicial” para jogar em tela cheia e offline.</p>
    </div><button class="mbtn" ${f(() => Game.started ? this.openMenu('system') : this.showTitle())}>Voltar</button></div>`, { cls: 'scroll', onBack: () => Game.started ? this.openMenu('system') : this.showTitle() });
    this.bind(el, f);
  },
  options() {
    const S = Game.settings;
    const render = () => {
      const f = this.reg();
      const tog = (k, label) => `<button class="sbtn ${S[k] ? 'on' : ''}" ${f(() => { S[k] = !S[k]; Game.saveSettings(); Sfx.unlock(); render(); })}>${label}: ${S[k] ? 'SIM' : 'NÃO'}</button>`;
      const el = this.show('options', `<div class="panel"><div class="ptitle">Opções</div>
        <div class="opts">
          ${tog('sfx', 'Efeitos sonoros')} ${tog('music', 'Música')} ${tog('weather', 'Clima')} ${tog('showFps', 'Mostrar FPS')}
          <div class="row"><span>Tamanho dos botões</span>${[0.8, 1, 1.2, 1.4].map(v => `<button class="sbtn small ${S.btnScale === v ? 'on' : ''}" ${f(() => { S.btnScale = v; Game.saveSettings(); render(); })}>${Math.round(v * 100)}%</button>`).join('')}</div>
          <div class="row"><span>Zoom da câmera</span>${[0.8, 1, 1.25, 1.5].map(v => `<button class="sbtn small ${S.zoom === v ? 'on' : ''}" ${f(() => { S.zoom = v; Game.saveSettings(); render(); })}>${Math.round(v * 100)}%</button>`).join('')}</div>
          <div class="row"><span>Volume música</span>${[0.15, 0.35, 0.6].map(v => `<button class="sbtn small ${S.musicVol === v ? 'on' : ''}" ${f(() => { S.musicVol = v; Game.saveSettings(); render(); })}>${v === 0.15 ? 'Baixo' : v === 0.35 ? 'Médio' : 'Alto'}</button>`).join('')}</div>
        </div>
        <button class="mbtn" ${f(() => Game.started ? this.openMenu('system') : this.showTitle())}>Voltar</button></div>`, { onBack: () => Game.started ? this.openMenu('system') : this.showTitle() });
      this.bind(el, f);
    };
    render();
  },
  slots(mode) {
    const f = this.reg();
    const rows = [0, 1, 2, 3].map(i => {
      const s = Game.saveInfo(i);
      const label = i === 0 ? 'Automático' : 'Espaço ' + i;
      if (mode === 'save' && i === 0) return '';
      const info = s ? `${esc(s.name)} • Nv ${s.level} ${esc(s.race)} ${esc(s.cls)}<br><span class="dim">${esc(s.loc)} • ${new Date(s.date).toLocaleString('pt-BR')}</span>` : '<span class="dim">Vazio</span>';
      return `<div class="slot"><div><b>${label}</b><br>${info}</div>${mode === 'load' ? (s ? `<button class="sbtn" ${f(() => Game.loadGame(i))}>Carregar</button>` : '') : `<button class="sbtn" ${f(() => { Game.saveGame(i); this.slots('save'); })}>Salvar</button>`}${s ? `<button class="sbtn small danger" ${f(() => this.confirm('Apagar este jogo salvo?', () => { try { localStorage.removeItem(SAVE_PREFIX + i); } catch (e) { } this.slots(mode); }, () => this.slots(mode)))}>✕</button>` : ''}</div>`;
    }).join('');
    const backFn = () => Game.started ? this.openMenu('system') : this.showTitle();
    const el = this.show('slots', `<div class="panel"><div class="ptitle">${mode === 'load' ? 'Carregar Jogo' : 'Salvar Jogo'}</div><div class="slots">${rows}</div><button class="mbtn" ${f(backFn)}>Voltar</button></div>`, { onBack: backFn });
    this.bind(el, f);
  },
  confirm(html, yes, no) {
    const f = this.reg();
    const el = this.show('confirm', `<div class="panel small"><div class="ctext">${html}</div><div class="row end"><button class="mbtn small" ${f(() => { if (no) no(); else this.close(); })}>Não</button><button class="mbtn small gold" ${f(() => { this.close(); yes(); })}>Sim</button></div></div>`, { onBack: () => { if (no) no(); else this.close(); } });
    this.bind(el, f);
  },
  dialog(name, look, html, options) {
    const f = this.reg();
    const el = this.show('dialog', `<div class="dialog">
      <div class="dlg-head">${look ? this.portrait(look) : ''}<div class="dlg-name">${esc(name)}</div></div>
      <div class="dlg-text">${html}</div>
      <div class="dlg-opts">${options.map(o => `<button class="dbtn ${o.cls || ''}" ${f(() => { if (o.fn) o.fn(); else this.close(); })}>${o.label}</button>`).join('')}</div>
    </div>`, { cls: 'bottom' });
    this.bind(el, f);
    return el;
  },
  sign(s) {
    const W = Game.world;
    const near = W.settlements.filter(o => o !== s).sort((a, b) => dist(a.x, a.y, s.x, s.y) - dist(b.x, b.y, s.x, s.y)).slice(0, 4);
    const dir = (o) => { const a = Math.atan2(o.y - s.y, o.x - s.x) * 180 / Math.PI; const dirs = ['Leste', 'Sudeste', 'Sul', 'Sudoeste', 'Oeste', 'Noroeste', 'Norte', 'Nordeste']; return dirs[Math.round(((a + 360) % 360) / 45) % 8]; };
    this.dialog('Placa', null, `<b>${esc(s.name)}</b> — ${esc(s.region.name)}<br><br>${near.map(o => `→ ${esc(o.name)}: ${dir(o)}, ${(dist(o.x, o.y, s.x, s.y) * 2 / 1000).toFixed(1)} km`).join('<br>')}`, [{ label: 'Ok' }]);
  },

  // ---------- NPCs ----------
  talkNPC(a) {
    const P = Game.player;
    if (a.guard) {
      const s = a.guardOf;
      const lines = GUARD_LINES.concat(s ? RUMORS[s.region.id] : []);
      this.dialog(a.name, a.look, esc(lines[Math.floor(Math.random() * lines.length)]), [{ label: 'Tchau' }]);
      return;
    }
    if (a.isFollower && a.studentId) return Academy.followerTalk(a);
    if (a.faction && !a.guard) return War.talk(a);
    if (a.role === 'captain' && a.s && a.s.port) return Game.captainTalk(a);
    if (a.student) return Academy.talk(a);
    if (a.isFollower && a.spouse) {
      this.dialog(a.name, a.look, 'Estou com você, meu amor. Para onde vamos?', [
        { label: 'Continue comigo' },
        { label: 'Volte para casa', fn: () => { P.follower = null; a.isFollower = false; a.vanish(); this.close(); Game.toast(`${a.name} voltou para casa.`, '#ff90c0'); } }
      ]);
      return;
    }
    if (a.isFollower) {
      this.dialog(a.name, a.look, 'Às suas ordens, chefe. Para onde vamos?', [
        { label: 'Continue me seguindo' },
        { label: 'Dispensar mercenário', cls: 'danger', fn: () => { P.follower = null; a.isFollower = false; a.vanish(); this.close(); Game.toast('Mercenário dispensado.', '#c0c0c0'); } }
      ]);
      return;
    }
    a.talkT = 3;
    const s = a.s;
    if (a.role === 'owner' && a.building) { this._ownerNpc = a; this.building(a.building); return; }
    if (a.role === 'resident' || a.role === 'spouse') { this.personal(a); return; }
    if (a.role === 'child' || a.role === 'kid') { this.childNPC(a); return; }
    if (a.role === 'merchant') { this.shop({ settlement: s, tx: Math.round(a.home.x), ty: Math.round(a.home.y), role: 'stall', name: 'Barraca de ' + a.name.split(' ')[0], owner: { name: a.name } }, 'stall'); return; }
    if (a.role === 'quest') { this.questGiver(a); return; }
    const greet = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    const rum = RUMORS[s.region.id];
    const opts = [
      { label: 'Ouviu algum boato?', fn: () => this.dialog(a.name, a.look, esc(rum[Math.floor(Math.random() * rum.length)]), [{ label: 'Interessante. Tchau.' }]) },
      { label: 'Onde fica a guilda?', fn: () => { const b = s.buildings.find(b => b.role === 'guild'); this.dialog(a.name, a.look, b ? `A ${esc(b.name)} fica ${this.dirText(a, b.door)} daqui.` : 'Não temos guilda aqui. Procure numa cidade maior.', [{ label: 'Obrigado.' }]); } },
      { label: 'Tchau' }
    ];
    this.dialog(a.name, a.look, `${esc(greet)} <span class="dim">(${RACES[a.race].name})</span>`, opts);
  },
  dirText(a, p) {
    if (!p) return 'por aí';
    const ang = Math.atan2(p.y * 16 - a.y, p.x * 16 - a.x) * 180 / Math.PI;
    return ['a leste', 'a sudeste', 'ao sul', 'a sudoeste', 'a oeste', 'a noroeste', 'ao norte', 'a nordeste'][Math.round(((ang + 360) % 360) / 45) % 8];
  },
  questGiver(a) {
    const P = Game.player, s = a.s;
    const ready = P.quests.filter(q => Quests.turnInNpc(q, s));
    const opts = [];
    for (const q of ready) opts.push({ label: `✔ Entregar: ${esc(q.title)}`, cls: 'gold', fn: () => { if (Quests.complete(q)) this.questGiver(a); } });
    const offers = Quests.offers(null, s);
    for (const q of offers) opts.push({ label: `${esc(q.title)} <span class="dim">(${q.reward.gold}o)</span>`, fn: () => this.questOffer(q, () => this.questGiver(a), a) });
    opts.push({ label: 'Tchau' });
    this.dialog(a.name, a.look, offers.length ? 'Aventureiro! Tenho alguns pedidos, se estiver disposto a ajudar...' : 'Obrigado pela ajuda! Volte amanhã.', opts);
  },
  questOffer(q, back, a) {
    this.dialog(a ? a.name : 'Missão', a ? a.look : null, `<b class="gold">${esc(q.title)}</b><br>${esc(q.desc)}<br><br>Recompensa: <span class="gold">${q.reward.gold} ouro</span>, ${q.reward.xp} XP${q.guild ? `, +${q.reward.rep} reputação` : ''}`, [
      { label: 'Aceitar', cls: 'gold', fn: () => { if (Quests.accept(q)) back(); } },
      { label: 'Voltar', fn: back }
    ]);
  },

  // ---------- Prédios ----------
  building(b) {
    const P = Game.player, s = b.settlement;
    const o = b.owner;
    const look = this.ownerLook(b);
    const opts = [];
    const deliveries = P.quests.filter(q => q.kind === 'deliver' && q.t.dest === s.id);
    if (deliveries.length) opts.push({ label: `📦 Entregar encomenda (${deliveries.length})`, cls: 'gold', fn: () => { Quests.deliverHere(s); this.building(b); } });
    let text = '';
    const own = this._ownerNpc && this._ownerNpc.building === b && Game.level.isInterior ? this._ownerNpc : null;
    if ((b.role === 'general' || b.role === 'inn') && P.cart && P.cart.load && P.cart.load.length && dist(P.cart.x / 16, P.cart.y / 16, b.door ? b.door.x : b.tx, b.door ? b.door.y : b.ty) < 40) opts.push({ label: `🛒 Vender carga da carroça (${P.cart.load.length} caças)`, cls: 'gold', fn: () => this.sellCart(b) });
    if (b.role !== 'playerhouse' && b.role !== 'house' && b.role !== 'guild') this.jobOptions(b, opts);
    if (own && b.role !== 'ruler' && b.role !== 'guild') opts.push({ label: 'Conversa pessoal 💬', fn: () => this.personal(own, () => this.building(b)) });
    switch (b.role) {
      case 'ruler': return this.ruler(b);
      case 'academy': return Academy.hall(b);
      case 'fencing': return Academy.fencingHall(b);
      case 'dorm': {
        const A = Academy.state(), mine = A.enrolled && A.dorm === b.kind;
        text = mine ? 'Seu quarto está arrumado e sua cama, feita. Silêncio depois das 22h, hein!' : b.kind === 'dorm_real' ? 'Este é o Dormitório Real. Só príncipes, princesas, nobres e bolsistas de honra dormem aqui.' : 'Dormitório dos estudantes. Só alunos matriculados podem dormir aqui.';
        if (mine) opts.push({ label: 'Dormir na sua cama (grátis)', fn: () => this.rest(b, 0) });
        break;
      }
      case 'guild': return this.guild(b);
      case 'inn':
        text = `Bem-vindo à <b>${esc(b.name)}</b>! Quer comida, uma cama ou companhia para a estrada?`;
        opts.push({ label: 'Comprar comida e bebida', fn: () => this.shop(b, 'inn') });
        opts.push({ label: 'Alugar quarto (15 ouro)', fn: () => this.rest(b, 15) });
        if (!P.follower) opts.push({ label: `Contratar mercenário (${300 + P.level * 40} ouro)`, fn: () => this.hire(b) });
        opts.push({ label: 'Ouvir boatos', fn: () => this.dialog(o.name, look, esc(RUMORS[s.region.id][Math.floor(Math.random() * RUMORS[s.region.id].length)]), [{ label: 'Voltar', fn: () => this.building(b) }]) });
        break;
      case 'smith':
        text = `<b>${esc(b.name)}</b>. Aço bom não sai barato!`;
        opts.push({ label: 'Comprar / Vender', fn: () => this.shop(b, 'smith') });
        opts.push({ label: 'Usar a forja', fn: () => this.craft('forge', b) });
        opts.push({ label: 'Usar a bancada de carpintaria', fn: () => this.craft('carpentry', b) });
        break;
      case 'general': text = `<b>${esc(b.name)}</b>. Tenho de tudo um pouco!`; opts.push({ label: 'Comprar / Vender', fn: () => this.shop(b, 'general') }); opts.push({ label: 'Cozinhar no fogão', fn: () => this.craft('cook', b) }); break;
      case 'alchemist': text = `<b>${esc(b.name)}</b>. Poções, ervas e elixires.`; opts.push({ label: 'Comprar / Vender', fn: () => this.shop(b, 'alchemist') }); opts.push({ label: 'Usar bancada de alquimia', fn: () => this.craft('alchemy', b) }); break;
      case 'magic': text = `<b>${esc(b.name)}</b>. Tomos arcanos, cajados e joias encantadas.`; opts.push({ label: 'Comprar / Vender', fn: () => this.shop(b, 'magic') }); opts.push({ label: 'Encantar equipamento', fn: () => this.enchant(b) }); break;
      case 'temple':
        text = 'Que a luz dos deuses te proteja, viajante.';
        opts.push({ label: 'Pedir cura (grátis)', fn: () => { P.hp = P.stat.maxHp; P.fx = []; Sfx.play('learn'); Game.toast('Você foi curado.', '#80ff80'); this.building(b); } });
        opts.push({ label: 'Bênção divina (50 ouro)', fn: () => { if (P.gold < 50) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= 50; P.addBuff('dmg', 0.1, 900, 'Bênção'); P.addBuff('regen', 2, 900, 'Bênção'); P.addBuff('resFire', 0.15, 900); P.addBuff('resFrost', 0.15, 900); Sfx.play('learn'); Game.toast('Abençoado! +10% dano e regeneração.', '#fff0a0'); this.building(b); } });
        opts.push({ label: 'Comprar itens sagrados', fn: () => this.shop(b, 'temple') });
        opts.push({ label: 'Orfanato: adotar uma criança', fn: () => this.adopt(b) });
        if (!P.magicAwake) opts.push({ label: 'Ritual do Despertar da magia (3000 ouro)', fn: () => { if (P.gold < 3000) return Game.toast('Ouro insuficiente. (A Academia de Astralis desperta a magia dos alunos.)', '#ff8080'); P.gold -= 3000; P.magicAwake = true; Sfx.play('learn'); Game.centerMsg('MAGIA DESPERTADA!', 'Agora você pode aprender magias com tomos'); Game.chron('Despertei minha magia num ritual do templo.'); this.building(b); } });
        break;
      case 'stable':
        text = P.hasHorse ? 'Seu cavalo está bem cuidado! Use o botão do cavalo para montar.' : 'Um bom cavalo deixa qualquer viagem mais curta. 800 de ouro.';
        opts.push({ label: 'Montarias e carroça', cls: 'gold', fn: () => this.mountsShop(b) });
        opts.push({ label: 'Animais de estimação', fn: () => this.pets(b) });
        break;
      case 'playerhouse': {
        const owned = P.houses.includes(s.id);
        const price = s.region.id === 'valdoria' ? 2500 : 2000;
        if (owned) {
          text = `Sua casa em ${esc(s.name)}. Lar, doce lar.`;
          opts.push({ label: 'Dormir (grátis)', fn: () => this.rest(b, 0) });
          opts.push({ label: 'Baú de armazenamento', fn: () => this.storage(s) });
          if (b.home) { opts.push({ label: `Reformar eu mesmo(a) (qualidade: ${HOME_QUALITY[b.home.quality]})`, fn: () => { this.close(); Game.reformHome(b.home, false); } }); opts.push({ label: `Contratar reforma (${Math.round(HOME_TIERS[b.home.tier].hire * 0.35)}o)`, fn: () => { this.close(); Game.reformHome(b.home, true); } }); }
          opts.push({ label: 'Usar forja doméstica', fn: () => this.craft('forge', b) });
          opts.push({ label: 'Usar bancada de alquimia', fn: () => this.craft('alchemy', b) });
        } else {
          text = `Esta casa está à venda por <span class="gold">${price} ouro</span>. Com ela você terá cama, baú e bancadas.`;
          opts.push({ label: `Comprar casa (${price})`, cls: 'gold', fn: () => { if (P.gold < price) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= price; P.houses.push(s.id); P.storage[s.id] = P.storage[s.id] || []; Sfx.play('coin'); Game.centerMsg('CASA COMPRADA!', s.name); Game.chron(`Comprei uma casa em ${s.name}.`); this.building(b); } });
        }
        break;
      }
      case 'house': {
        const r = new RNG(hashStr(b.name) + Game.day);
        text = r.pick(['A porta está trancada.', `${esc(o.name)} grita lá de dentro: "Vá embora!"`, `${esc(o.name)}: "Olá! Cuidado com os lobos lá fora."`, `${esc(o.name)}: "${esc(r.pick(RUMORS[s.region.id]))}"`, 'Você ouve roncos lá dentro.']);
        break;
      }
      default: text = esc(b.name);
    }
    opts.push({ label: 'Sair' });
    this.dialog(b.role === 'house' ? b.name : `${o.name} — ${b.name}`, b.role === 'house' ? null : look, text, opts);
  },
  ownerLook(b) {
    const o = b.owner;
    if (!o.look) o.look = npcLook(o.race, o.sex, new RNG(o.seed || 1), o.ruler ? 'ruler' : 'shop');
    return o.look;
  },
  ruler(b) {
    const P = Game.player, s = b.settlement, look = this.ownerLook(b);
    const st = Quests.mainStep();
    const opts = [];
    if (st && st.type === 'talk' && st.region === s.region.id) {
      let i = 0;
      const next = () => {
        if (i < st.talk.length) { this.dialog(b.owner.name, look, esc(st.talk[i++]), [{ label: i < st.talk.length ? 'Continuar ▶' : 'Entendido!', fn: next }]); }
        else { this.close(); Quests.advanceMain(); }
      };
      next();
      return;
    }
    const lines = {
      valdoria: 'Valdoria precisa de heróis. Fale com a Ordem da Aurora e a Guilda dos Heróis.', sylvaris: 'A floresta sussurra seu nome, Portador.', khazdurim: 'Hah! Volte quando tiver minério de verdade!',
      nordheim: 'Bem-vindo ao salão de Nordheim. Hidromel e honra para todos!', gorthak: 'Fale rápido, forasteiro.', zahrim: 'As areias contam histórias... e você será uma delas.',
      ssarak: 'Sssseja bem-vindo, sangue-quente.', colinas: 'Aceita um segundo café da manhã?', talassa: 'As marés trouxeram você até nós, viajante de Eldoria.', aurelion: 'Todo caminho leva a Aurélion. Ajoelhe-se diante do Império.', gromhald: 'HAH! Tão pequeno! Sente-se, coma um javali inteiro.', lunethar: 'A lua nos contou que você viria.', rodafina: 'Cuidado onde pisa! Este chão é uma invenção minha.', kumari: 'A savana respeita quem tem coragem. Você tem?', azhkar: 'Ajoelhe-se diante do Império... ou saia.', shirokai: 'Seja bem-vindo. Que as cerejeiras guiem seus passos.', morvath: 'Cada espada conta neste bastião. Os mortos não dormem!'
    };
    const extra = st ? `<br><br><span class="dim">História atual: ${esc(st.title)}</span>` : '';
    const wtxt = War.castleOptions(b, opts);
    opts.push({ label: 'Sair' });
    this.dialog(b.owner.name, look, esc(lines[s.region.id] || 'Saudações.') + extra + wtxt, opts);
  },
  guild(b) {
    const P = Game.player, gid = b.guild, G = GUILDS[gid], look = this.ownerLook(b);
    const m = P.guilds[gid];
    const opts = [];
    let text;
    if (!m) {
      text = `<b style="color:${G.color}">${esc(G.name)}</b><br>${esc(G.desc)}<br><br>Deseja se juntar a nós?`;
      opts.push({ label: 'Entrar para a guilda', cls: 'gold', fn: () => { Quests.join(gid); this.guild(b); } });
    } else {
      const next = G.th[m.rank + 1];
      text = `<b style="color:${G.color}">${esc(G.name)}</b><br>Seu posto: <b>${G.ranks[m.rank]}</b> • Reputação ${m.rep}${next !== undefined ? '/' + next : ' (máximo)'}`;
      const ready = P.quests.filter(q => Quests.turnInHere(q, b));
      for (const q of ready) opts.push({ label: `✔ Entregar: ${esc(q.title)}`, cls: 'gold', fn: () => { if (Quests.complete(q)) this.guild(b); } });
      const active = P.quests.filter(q => q.guild === gid && q.status === 'active');
      if (active.length >= 3) text += '<br><span class="dim">Termine suas missões atuais antes de pegar novas.</span>';
      else for (const q of Quests.offers(gid, b.settlement)) opts.push({ label: `${esc(q.title)} <span class="dim">(${q.reward.gold}o)</span>`, fn: () => this.questOffer(q, () => this.guild(b), { name: b.owner.name, look }) });
    }
    opts.push({ label: 'Sair' });
    this.dialog(`${b.owner.name} — ${G.name}`, look, text, opts);
  },
  rest(b, cost) {
    const P = Game.player;
    if (P.gold < cost) { Game.toast('Ouro insuficiente.', '#ff8080'); return; }
    P.gold -= cost;
    if (Game.time > 7 * 60) Game.day++;
    Game.time = 7 * 60; Game.mods.day = Game.day;
    P.hp = P.stat.maxHp; P.mp = P.stat.maxMp; P.st = P.stat.maxSt; P.fx = [];
    P.addBuff('regen', 1, 600, 'Bem descansado');
    this.close(); UI.fade();
    Game.saveGame(0, true);
    Game.centerMsg('Você dormiu bem', `Dia ${Game.day}, 07:00 • Jogo salvo`);
  },
  hire(b) {
    const P = Game.player, price = 300 + P.level * 40;
    if (P.gold < price) { Game.toast('Ouro insuficiente.', '#ff8080'); return; }
    P.gold -= price;
    const r = new RNG(Date.now() & 0xffffff);
    const race = r.pick(Object.keys(NAMES)), sex = r.chance(0.5) ? 'm' : 'f';
    P.follower = { name: r.pick(NAMES[race][sex]) + ' (Mercenário)' };
    Game.spawnFollower();
    this.close();
    Game.toast(`${P.follower.name} agora segue você!`, '#80c0ff');
  },
  storage(s) {
    const P = Game.player;
    const box = P.storage[s.id] = P.storage[s.id] || [];
    const render = () => {
      const f = this.reg();
      const row = (it, fn) => `<div class="irow" ${f(fn)}>${this.icon(Items.icon(it))}<span style="color:${Items.color(it)}">${esc(Items.name(it))}${it.n > 1 ? ' x' + it.n : ''}</span></div>`;
      const el = this.show('storage', `<div class="panel wide"><div class="ptitle">Baú de ${esc(s.name)}</div>
        <div class="two-col"><div><h3>Mochila</h3><div class="ilist">${P.inv.filter(it => !P.isEquipped(it) && ITEMS[it.id].type !== 'quest').map(it => row(it, () => { P.inv.splice(P.inv.indexOf(it), 1); const ex = Items.stackable(it) && box.find(i => i.id === it.id && !i.ench); if (ex) ex.n += it.n; else box.push(it); render(); })).join('') || '<div class="dim">Vazio</div>'}</div></div>
        <div><h3>Baú</h3><div class="ilist">${box.map(it => row(it, () => { box.splice(box.indexOf(it), 1); P.addItem(it, true); render(); })).join('') || '<div class="dim">Vazio</div>'}</div></div></div>
        <button class="mbtn" ${f(() => this.close())}>Fechar</button></div>`);
      this.bind(el, f);
    };
    render();
  },

  enchant(b) {
    const P = Game.player;
    const gems = ['ametista', 'rubi', 'safira', 'esmeralda', 'diamante'];
    const render = () => {
      const f = this.reg();
      const gem = gems.find(g => P.count(g) > 0);
      const list = P.inv.filter(it => { const d = ITEMS[it.id]; return d.slot && !d.unique && (!it.ench || it.ench.length < 3); });
      const cost = it => 120 + P.level * 35 * ((it.ench ? it.ench.length : 0) + 1);
      const rows = list.map(it => `<div class="crow">${this.icon(Items.icon(it))}<div class="cinfo"><b style="color:${Items.color(it)}">${esc(Items.name(it))}</b>${P.isEquipped(it) ? ' <span class="good">(E)</span>' : ''}<br><small>${(it.ench || []).map(e => ENCHANTS[e.k].desc(e.v)).join(' • ') || 'Sem encantamentos'}</small></div>${gem ? `<button class="sbtn gold" ${f(() => {
        const c = cost(it); if (P.gold < c) return Game.toast('Ouro insuficiente.', '#ff8080');
        const g = gems.find(g => P.count(g) > 0); P.removeItem(g, 1); P.gold -= c;
        const lvl = P.level + (g === 'diamante' ? 8 : 0);
        Items.addEnchants(it, 1, lvl, new RNG((Date.now() ^ hashStr(it.u)) & 0xffffff)); it.r = Math.min(4, Math.max(it.r || 0, it.ench.length + 1));
        P.recalc(); Sfx.play('learn'); Game.toast('Encantado: ' + Items.name(it), '#c080ff'); render();
      })}>${cost(it)}o</button>` : ''}</div>`).join('') || '<div class="dim pad">Nenhum equipamento pode ser encantado.</div>';
      const el = this.show('enchant', `<div class="panel wide"><div class="ptitle">Altar de Encantamento <span class="gold right">${fmt(P.gold)} ouro</span></div>
        <div class="dim">Cada encantamento consome 1 gema (${gems.map(g => ITEMS[g].name + ': ' + P.count(g)).join(', ')}). Diamantes geram encantamentos mais fortes. Máximo 3 por item.</div>
        <div class="clist">${rows}</div><button class="mbtn small" ${f(() => this.building(b))}>Voltar</button></div>`, { onBack: () => this.building(b) });
      this.bind(el, f);
    };
    render();
  },
  // ---------- Loja ----------
  shop(b, kind) {
    const P = Game.player;
    const stock = Shops.stock(b, kind);
    let tab = 'buy', sel = null;
    const render = () => {
      const f = this.reg();
      const list = tab === 'buy' ? stock : P.inv.filter(it => !P.isEquipped(it) && ITEMS[it.id].type !== 'quest');
      const price = it => tab === 'buy' ? Shops.buyPrice(it) : Shops.sellPrice(it);
      const rows = list.map(it => `<div class="irow ${sel === it ? 'sel' : ''}" ${f(() => { sel = it; render(); })}>${this.icon(Items.icon(it))}<span class="iname" style="color:${Items.color(it)}">${esc(Items.name(it))}${it.n > 1 ? ' <span class="dim">x' + it.n + '</span>' : ''}</span><span class="gold">${price(it)}</span></div>`).join('') || '<div class="dim pad">Nada aqui.</div>';
      let detail = '<div class="dim pad">Toque num item para ver detalhes.</div>';
      if (sel && list.includes(sel)) {
        const p = price(sel);
        const cmp = this.compareText(sel);
        detail = `<div class="idetail">${Items.describe(sel)}${cmp}</div><div class="row">` +
          (tab === 'buy' ? `<button class="sbtn gold" ${f(() => this.buy(stock, sel, 1, render))}>Comprar (${p})</button>${sel.n > 1 ? `<button class="sbtn" ${f(() => this.buy(stock, sel, Math.min(sel.n, Math.floor(P.gold / p)), render))}>Comprar máx.</button>` : ''}`
            : `<button class="sbtn gold" ${f(() => this.sell(stock, sel, 1, render))}>Vender (${p})</button>${sel.n > 1 ? `<button class="sbtn" ${f(() => this.sell(stock, sel, sel.n, render))}>Vender todos (${p * sel.n})</button>` : ''}`) + '</div>';
      }
      const el = this.show('shop', `<div class="panel wide shop">
        <div class="ptitle">${esc(b.name)} <span class="gold right">${fmt(P.gold)} ouro</span></div>
        <div class="tabs"><button class="tab ${tab === 'buy' ? 'on' : ''}" ${f(() => { tab = 'buy'; sel = null; render(); })}>Comprar</button><button class="tab ${tab === 'sell' ? 'on' : ''}" ${f(() => { tab = 'sell'; sel = null; render(); })}>Vender</button></div>
        <div class="shop-body"><div class="ilist">${rows}</div><div class="dpane">${detail}</div></div>
        <button class="mbtn small" ${f(() => b.role === 'stall' ? this.close() : this.building(b))}>Voltar</button></div>`, { onBack: () => b.role === 'stall' ? this.close() : this.building(b) });
      this.bind(el, f);
    };
    render();
  },
  buy(stock, it, n, render) {
    const P = Game.player;
    if (n <= 0) { Game.toast('Ouro insuficiente.', '#ff8080'); return; }
    const p = Shops.buyPrice(it) * n;
    if (P.gold < p) { Game.toast('Ouro insuficiente.', '#ff8080'); return; }
    P.gold -= p;
    const copy = Object.assign({}, it, { n, u: uid() });
    if (copy.ench) copy.ench = copy.ench.map(e => Object.assign({}, e));
    it.n -= n; if (it.n <= 0) stock.splice(stock.indexOf(it), 1);
    P.addItem(copy, true); Sfx.play('coin');
    P.train('eloquencia', Math.min(8, p / 40));
    render();
  },
  sell(stock, it, n, render) {
    const P = Game.player;
    const p = Shops.sellPrice(it) * n;
    P.gold += p;
    P.removeInst(it, n);
    const copy = Object.assign({}, it, { n, u: uid() });
    const ex = Items.stackable(copy) && stock.find(i => i.id === copy.id && !i.ench);
    if (ex) ex.n += n; else stock.push(copy);
    Sfx.play('coin');
    P.train('eloquencia', Math.min(8, p / 40));
    Quests.onInventory();
    render();
  },
  compareText(it) {
    const P = Game.player, d = ITEMS[it.id];
    if (!d.slot) return '';
    const cur = P.equip[d.slot];
    if (!cur || cur.u === it.u) return '';
    const cd = ITEMS[cur.id];
    let t = '';
    if (d.dmg !== undefined && cd.dmg !== undefined) { const diff = Items.dmg(it) - Items.dmg(cur); t += `Dano ${diff >= 0 ? '<span class="good">+' + diff : '<span class="bad">' + diff}</span> `; }
    if (d.armor !== undefined || cd.armor !== undefined) { const diff = Items.armor(it) - Items.armor(cur); if (diff) t += `Armadura ${diff >= 0 ? '<span class="good">+' + diff : '<span class="bad">' + diff}</span>`; }
    return t ? `<div class="cmp">vs. equipado: ${t}</div>` : '';
  },

  // ---------- Criação ----------
  craft(kind, b) {
    const P = Game.player;
    let tab = kind === 'forge' ? 'smelt' : kind;
    const skillK = kind === 'alchemy' ? 'alquimia' : kind === 'cook' ? null : kind === 'carpentry' ? 'construcao' : 'ferraria';
    const render = () => {
      const f = this.reg();
      const red = (skillK === 'ferraria' && P.perks.has('ferreiro')) ? 20 : 0;
      let recipes = RECIPES[tab].filter(r => !skillK || P.skill(skillK) + red >= r.skill - 25);
      if (tab === 'forge') recipes = recipes.filter(r => ITEMS[r.out.split(':')[0]].lvl <= P.level + 8).sort((a, b) => a.skill - b.skill);
      const canMake = r => (!skillK || P.skill(skillK) + red >= r.skill) && Object.entries(r.in).every(([id, n]) => P.count(id) >= n);
      const rows = recipes.map(r => {
        const [oid, on] = Items.parse(r.out);
        const ok = canMake(r);
        const req = Object.entries(r.in).map(([id, n]) => `<span class="${P.count(id) >= n ? 'good' : 'bad'}">${ITEMS[id].name} ${P.count(id)}/${n}</span>`).join(', ');
        const sk = skillK && r.skill ? ` <span class="${P.skill(skillK) + red >= r.skill ? 'dim' : 'bad'}">(${SKILLS[skillK]} ${r.skill})</span>` : '';
        return `<div class="crow ${ok ? '' : 'off'}">${this.icon(ITEMS[oid].icon || Items.icon({ id: oid }))}<div class="cinfo"><b>${ITEMS[oid].name}${on > 1 ? ' x' + on : ''}</b>${sk}<br><small>${req}</small></div>${ok ? `<button class="sbtn gold" ${f(() => { this.doCraft(r, skillK); render(); })}>Criar</button>` : ''}</div>`;
      }).join('') || '<div class="dim pad">Nenhuma receita disponível. Treine sua habilidade.</div>';
      const tabs = kind === 'forge' ? `<div class="tabs"><button class="tab ${tab === 'smelt' ? 'on' : ''}" ${f(() => { tab = 'smelt'; render(); })}>Fundir</button><button class="tab ${tab === 'forge' ? 'on' : ''}" ${f(() => { tab = 'forge'; render(); })}>Forjar</button></div>` : '';
      const title = { forge: 'Forja', alchemy: 'Bancada de Alquimia', cook: 'Cozinhar', carpentry: 'Bancada de Carpintaria' }[kind];
      const backFn = () => b ? this.building(b) : this.close();
      const el = this.show('craft', `<div class="panel wide"><div class="ptitle">${title}${skillK ? ` <span class="dim right">${SKILLS[skillK]}: ${P.skill(skillK)}</span>` : ''}</div>${tabs}<div class="clist">${rows}</div><button class="mbtn small" ${f(backFn)}>Voltar</button></div>`, { onBack: backFn });
      this.bind(el, f);
    };
    render();
  },
  doCraft(r, skillK) {
    const P = Game.player;
    for (const [id, n] of Object.entries(r.in)) P.removeItem(id, n);
    const [oid, on] = Items.parse(r.out);
    const it = Items.make(oid, on);
    const d = ITEMS[oid];
    if (d.slot && skillK === 'ferraria') {
      const ch = P.skill('ferraria') / 220;
      const rng = new RNG(Date.now() & 0xffffff);
      if (rng.chance(ch)) { it.r = rng.chance(ch * 0.5) ? 3 : rng.chance(0.4) ? 2 : 1; Items.addEnchants(it, RARITY[it.r].ench, P.level, rng); }
    }
    if (skillK === 'alquimia' && P.skill('alquimia') > 40 && Math.random() < 0.25) it.n++;
    P.addItem(it);
    if (skillK) P.train(skillK, 3 + (r.skill || 0) / 8);
    Sfx.play(skillK === 'ferraria' ? 'forge' : skillK === 'alquimia' ? 'drink' : 'eat');
  },

  // ---------- Menu principal ----------
  openMenu(tab) {
    this.menuTab = tab || this.menuTab || 'inv';
    const P = Game.player;
    if (P.pendingLevels > 0 && !tab) { this.levelUp(); return; }
    const tabs = [['inv', 'Mochila'], ['char', 'Herói'], ['magic', 'Magias'], ['quests', 'Missões'], ['family', 'Família'], ['guilds', 'Guildas'], ['war', 'Reinos'], ['map', 'Mapa'], ['system', 'Sistema']];
    const f = this.reg();
    const head = `<div class="tabs top">${tabs.map(([k, n]) => `<button class="tab ${this.menuTab === k ? 'on' : ''}" ${f(() => k === 'map' ? this.openMap() : this.openMenu(k))}>${n}</button>`).join('')}<button class="tab close" ${f(() => this.close())}>✕</button></div>`;
    let body = '';
    switch (this.menuTab) {
      case 'inv': body = this.invTab(f); break;
      case 'char': body = this.charTab(f); break;
      case 'magic': body = this.magicTab(f); break;
      case 'quests': body = this.questTab(f); break;
      case 'guilds': body = this.guildTab(f); break;
      case 'family': body = this.familyTab(f); break;
      case 'war': body = War.tab(f); break;
      case 'system': body = this.systemTab(f); break;
    }
    const el = this.show('menu', `<div class="panel menu">${head}<div class="menu-body">${body}</div></div>`);
    this.bind(el, f);
  },
  invTab(f) {
    const P = Game.player;
    this.invFilter = this.invFilter || 'all';
    const filters = [['all', 'Tudo'], ['weapon', 'Armas'], ['armor', 'Equip.'], ['use', 'Consumíveis'], ['material', 'Materiais'], ['other', 'Outros']];
    const match = it => {
      const d = ITEMS[it.id];
      switch (this.invFilter) {
        case 'weapon': return d.type === 'weapon';
        case 'armor': return d.type === 'armor';
        case 'use': return d.type === 'potion' || d.type === 'food' || d.type === 'tome';
        case 'material': return d.type === 'material';
        case 'other': return ['ammo', 'quest', 'misc'].includes(d.type);
      }
      return true;
    };
    const items = P.inv.filter(match).sort((a, b) => (P.isEquipped(b) - P.isEquipped(a)) || ITEMS[a.id].type.localeCompare(ITEMS[b.id].type) || Items.value(b) - Items.value(a));
    const sel = this.invSel && P.inv.includes(this.invSel) ? this.invSel : null;
    const slots = EQUIP_SLOTS.map(s => { const it = P.equip[s]; return `<div class="eslot ${it ? '' : 'empty'}" ${f(() => { if (it) { this.invSel = it; this.openMenu('inv'); } })}>${it ? this.icon(Items.icon(it)) : '<span class="ph"></span>'}<small>${SLOT_NAMES[s]}</small></div>`; }).join('');
    const grid = items.map(it => `<div class="cell ${sel === it ? 'sel' : ''} ${P.isEquipped(it) ? 'eq' : ''}" style="border-color:${Items.color(it)}" ${f(() => { this.invSel = it; this.openMenu('inv'); })}>${this.icon(Items.icon(it))}${it.n > 1 ? `<span class="qty">${it.n > 999 ? '999+' : it.n}</span>` : ''}${P.isEquipped(it) ? '<span class="eqm">E</span>' : ''}</div>`).join('') || '<div class="dim pad">Vazio</div>';
    let detail = '<div class="dim pad">Toque num item.</div>';
    if (sel) {
      const d = ITEMS[sel.id];
      const acts = [];
      if (d.slot) acts.push(`<button class="sbtn gold" ${f(() => { P.useItem(sel); this.openMenu('inv'); })}>${P.isEquipped(sel) ? 'Desequipar' : 'Equipar'}</button>`);
      else if (d.use || d.type === 'tome') acts.push(`<button class="sbtn gold" ${f(() => { P.useItem(sel); this.openMenu('inv'); })}>Usar</button>`);
      if (d.type !== 'quest') acts.push(`<button class="sbtn danger" ${f(() => { P.removeInst(sel, sel.n); Game.dropItem(P.x, P.y + 10, sel); this.invSel = null; P.recalc(); this.openMenu('inv'); })}>Largar</button>`);
      detail = `<div class="idetail">${Items.describe(sel)}${this.compareText(sel)}</div><div class="row">${acts.join('')}</div>`;
    }
    return `<div class="inv">
      <div class="inv-left"><div class="eslots">${slots}</div>
        <div class="statline">⚔ ${Math.round(P.rollDamageAvg ? 0 : Items.dmg(P.equip.weapon || { id: 'sword_ferro', r: 0 }) * (P.equip.weapon ? 1 : 0.4))} • 🛡 ${P.stat.armor} • <span class="gold">${fmt(P.gold)} ouro</span></div>
        <div class="dpane">${detail}</div></div>
      <div class="inv-right"><div class="tabs small">${filters.map(([k, n]) => `<button class="tab ${this.invFilter === k ? 'on' : ''}" ${f(() => { this.invFilter = k; this.openMenu('inv'); })}>${n}</button>`).join('')}</div><div class="grid">${grid}</div></div>
    </div>`;
  },
  charTab(f) {
    const P = Game.player, R = RACES[P.race], C = CLASSES[P.cls], S = P.stat;
    const bar = (v, max, col) => `<div class="mbar"><div style="width:${Math.min(100, v / max * 100)}%;background:${col}"></div></div>`;
    const skills = Object.entries(SKILLS).map(([k, n]) => `<div class="skrow"><span>${n}</span><b>${P.skill(k)}</b>${bar(P.skills[k].xp, 8 + P.skill(k) * 2.2, '#60a0e0')}</div>`).join('');
    const perks = PERKS.map(p => {
      const has = P.perks.has(p.id), can = !has && P.perkPts > 0 && P.level >= p.req;
      return `<div class="perk ${has ? 'has' : ''} ${can ? 'can' : ''}" ${can ? f(() => { P.perks.add(p.id); P.perkPts--; P.recalc(); Sfx.play('learn'); this.openMenu('char'); }) : ''}><b>${p.name}</b> <small class="dim">Nv ${p.req}</small><br><small>${p.desc}</small>${has ? '<span class="good right">✔</span>' : can ? '<span class="gold right">+</span>' : ''}</div>`;
    }).join('');
    const A = RACE_ABILITIES[R.ability];
    const res = ['fire', 'frost', 'poison'].map(e => `${({ fire: 'Fogo', frost: 'Gelo', poison: 'Veneno' })[e]} ${Math.round(P.res(e) * 100)}%`).join(' • ');
    return `<div class="char">
      <div class="char-left">
        <div class="row">${this.portrait(P.look)}<div><b class="big">${esc(P.name)}</b><br>${R.name} • <span class="gold">${esc(P.style)}</span><br>Nível <b>${P.level}</b> • XP ${P.xp}/${P.needXP()}</div></div>
        <div class="stats">
          <div>Vida <b>${Math.round(P.hp)}/${S.maxHp}</b></div><div>Magia <b>${Math.round(P.mp)}/${S.maxMp}</b></div><div>Vigor <b>${Math.round(P.st)}/${S.maxSt}</b></div>
          <div>Armadura <b>${S.armor}</b></div><div>Crítico <b>${Math.round((0.05 + S.crit) * 100)}%</b></div><div>Poder mágico <b>+${Math.round(S.magic * 100)}%</b></div>
          <div>Velocidade <b>${Math.round(S.speed / 70 * 100)}%</b></div><div>Almas de dragão <b>${P.souls}</b></div><div>Ouro <b class="gold">${fmt(P.gold)}</b></div>
        </div>
        <div class="dim">Resistências: ${res}</div>
        <div class="desc"><b>Estilo: ${esc(P.style)}</b> — ${(STYLE_BONUS[P.style] || {}).d || ''}<br><span class="dim">Seu estilo muda conforme as habilidades que você mais usa.</span><br><b>Bênção:</b> ${P.sign ? DESTINY[P.sign].name + ' — ' + DESTINY[P.sign].desc : '<span class="dim">nenhuma (visite as Pedras do Destino perto de Valdoria)</span>'}</div>
        <div class="desc"><b>${A.name}</b> (racial): ${A.desc}</div>
        <h3>Habilidades</h3><div class="skills">${skills}</div>
        <h3>Estatísticas</h3><div class="dim small">Inimigos: ${P.stats.kills} • Chefes: ${P.stats.bosses} • Dragões: ${P.stats.dragons} • Missões: ${P.stats.quests} • Baús: ${P.stats.chests} • Mortes: ${P.stats.deaths} • Distância: ${(P.stats.dist / 16 * 2 / 1000).toFixed(1)} km • Tempo: ${Math.floor(P.stats.playTime / 3600)}h${Math.floor(P.stats.playTime / 60) % 60}m</div>
      </div>
      <div class="char-right"><h3>Talentos <span class="gold">(${P.perkPts} pontos)</span></h3><div class="perks">${perks}</div></div>
    </div>`;
  },
  magicTab(f) {
    const P = Game.player;
    const sp = P.spells.map((k, i) => { const s = SPELLS[k]; return `<div class="spell ${P.spellIdx === i ? 'sel' : ''}" ${f(() => { P.spellIdx = i; this.openMenu('magic'); })}>${this.icon({ k: 'spell', c: s.color })}<div><b>${i + 1}. ${s.name}</b> <span class="dim">${SKILLS[s.school]} • ${s.cost} magia</span><br><small>${s.desc}</small></div>${P.spellIdx === i ? '<span class="good">●</span>' : ''}</div>`; }).join('') || '<div class="dim pad">Nenhuma magia. Compre tomos em lojas de magia ou templos.</div>';
    const sh = P.shouts.map((k, i) => { const s = SHOUTS[k]; const lv = P.shoutLvl[k] || 1; return `<div class="spell ${P.shoutIdx === i ? 'sel' : ''}" ${f(() => { P.shoutIdx = i; this.openMenu('magic'); })}>${this.icon({ k: 'soul', c: '#ffb040' })}<div><b>${s.name}</b> <span class="gold">"${s.words.split(' ').slice(0, lv).join(' ')}"</span> <span class="dim">Nv ${lv}/3 • ${s.cd}s</span><br><small>${s.desc}</small></div></div>`; }).join('') || '<div class="dim pad">Nenhum grito. Mate dragões e encontre Pedras Rúnicas.</div>';
    return `<h3>Magias</h3><div class="spells">${sp}</div><h3>Gritos do Dragão <span class="gold">(${P.souls} almas)</span></h3><div class="spells">${sh}</div>`;
  },
  questTab(f) {
    const P = Game.player;
    const st = Quests.mainStep();
    const trk = Game.track;
    const main = st ? `<div class="quest main ${trk === 'main' ? 'trk' : ''}" ${f(() => { Game.track = 'main'; this.openMenu('quests'); })}><b class="gold">★ ${esc(st.title)}</b> <small class="dim">(Nv recomendado ${st.lvl})</small><br><small>${esc(st.desc)}</small></div>` : '<div class="quest main"><b class="gold">★ História concluída!</b><br><small>Eldoria está salva. Continue explorando!</small></div>';
    const tre = Game.mods.treasures.length ? `<div class="quest ${trk === 'treasure' ? 'trk' : ''}" ${f(() => { Game.track = 'treasure'; this.openMenu('quests'); })}><b>✖ Mapa do tesouro</b><br><small>Siga a bússola até o X.</small></div>` : '';
    const list = P.quests.map(q => `<div class="quest ${trk === q.id ? 'trk' : ''} ${q.status === 'ready' ? 'ready' : ''}" ${f(() => { Game.track = q.id; this.openMenu('quests'); })}>
      <b>${esc(q.title)}</b> ${q.guild ? `<small style="color:${GUILDS[q.guild].color}">${GUILDS[q.guild].name}</small>` : `<small class="dim">${esc(q.giver.name)}</small>`}<br>
      <small>${esc(q.desc)}</small><br><small class="${q.status === 'ready' ? 'good' : 'gold'}">${esc(Quests.progressText(q))}</small> <small class="dim">• ${q.reward.gold}o ${q.reward.xp}xp</small>
      <button class="sbtn small danger right" ${f(() => this.confirm('Abandonar esta missão?', () => { P.quests = P.quests.filter(x => x !== q); if (q.kind === 'deliver') P.removeItem(q.t.item, 1); this.openMenu('quests'); }, () => this.openMenu('quests')))}>Abandonar</button></div>`).join('');
    return `${P.freeMode ? this.chronicleHTML() + (P.job ? `<div class="quest"><b>💼 ${JOBS[P.job.id].name}</b> em ${esc(P.job.sname || '')} — ${JOB_RANKS[Game.jobRank(P.job)][0]} (${P.job.shifts} turnos)</div>` : '') + '<h3>Missões</h3>' : ''}<div class="dim small">Toque numa missão para rastreá-la na bússola.</div>${P.freeMode ? '' : main}${tre}${list || '<div class="dim pad">Sem outras missões. Visite guildas e pessoas com <span class="gold">!</span> nas cidades.</div>'}`;
  },
  guildTab(f) {
    const P = Game.player, W = Game.world;
    return Object.entries(GUILDS).map(([gid, g]) => {
      const m = P.guilds[gid];
      const hq = g.hq ? W.settlements.find(s => s.region.id === g.hq && (s.type === 'capital' || s.region.hostile)) : null;
      const next = m ? g.th[m.rank + 1] : null;
      return `<div class="guild ${m ? 'joined' : ''}"><b style="color:${g.color}">${g.name}</b> ${m ? `<span class="gold right">${g.ranks[m.rank]}</span>` : '<span class="dim right">Não membro</span>'}<br>
        <small>${g.desc}</small><br><small class="dim">Sede: ${hq ? hq.name + ' (' + hq.region.short + ')' : 'Todas as cidades'}${m ? ` • Reputação ${m.rep}${next !== undefined ? '/' + next : ''}` : ''}</small></div>`;
    }).join('');
  },
  systemTab(f) {
    return `<div class="menu-col">
      <button class="mbtn" ${f(() => this.slots('save'))}>Salvar Jogo</button>
      <button class="mbtn" ${f(() => this.slots('load'))}>Carregar Jogo</button>
      <button class="mbtn" ${f(() => this.options())}>Opções</button>
      <button class="mbtn" ${f(() => this.help())}>Como Jogar</button>
      <button class="mbtn danger" ${f(() => this.confirm('Voltar ao título? O progresso desde o último salvamento será perdido.', () => { Game.saveGame(0, true); Game.toTitle(); }, () => this.openMenu('system')))}>Sair para o Título</button>
      <div class="dim small">Dia ${Game.day} • ${Game.timeStr()} • Semente do mundo: ${Game.world.seed}</div>
    </div>`;
  },

  // ---------- Mapa ----------
  openMap() {
    const W = Game.world, P = Game.player, M = Game.mods;
    const f = this.reg();
    const el = this.show('map', `<div class="mapwrap"><canvas id="mapcv"></canvas>
      <div class="map-ui"><button class="sbtn" ${f(() => { this.mz = Math.min(12, this.mz * 1.5); this.drawMap(); })}>+</button><button class="sbtn" ${f(() => { this.mz = Math.max(0.5, this.mz / 1.5); this.drawMap(); })}>−</button><button class="sbtn" ${f(() => { this.mox = P.x / 256; this.moy = P.y / 256; this.drawMap(); })}>◎</button><button class="sbtn" ${f(() => this.close())}>✕</button></div>
      <div class="map-info" id="mapinfo"></div></div>`, { cls: 'full' });
    this.bind(el, f);
    const cv = document.getElementById('mapcv');
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    this.mcv = cv; this.mctx = cv.getContext('2d');
    if (!this.mz) this.mz = Math.max(1.2, Math.min(cv.width / MAP_W, cv.height / 256) * 1.1);
    const wp0 = Game.level.isWorld ? P : (Game.worldPos || P);
    this.mox = wp0.x / 256; this.moy = wp0.y / 256;
    // névoa
    const fog = Sprites.cv(MAP_W, MAP_H), fx = fog.getContext('2d'), img = fx.createImageData(MAP_W, MAP_H);
    for (let i = 0; i < MAP_W * MAP_H; i++) { img.data[i * 4 + 3] = M.explored[i] ? 0 : 205; img.data[i * 4] = 20; img.data[i * 4 + 1] = 16; img.data[i * 4 + 2] = 28; }
    fx.putImageData(img, 0, 0);
    this.fog = fog;
    // interação: arrastar/pinçar/tocar
    let drag = null, pinch = null, moved = false;
    const pt = e => e.touches ? [...e.touches].map(t => [t.clientX, t.clientY]) : [[e.clientX, e.clientY]];
    const start = e => { e.preventDefault(); const p = pt(e); moved = false; if (p.length >= 2) pinch = { d: Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]), z: this.mz }; else drag = { x: p[0][0], y: p[0][1], ox: this.mox, oy: this.moy }; };
    const move = e => { e.preventDefault(); const p = pt(e); if (pinch && p.length >= 2) { this.mz = clamp(pinch.z * Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]) / pinch.d, 0.5, 12); moved = true; this.drawMap(); } else if (drag) { const dx = p[0][0] - drag.x, dy = p[0][1] - drag.y; if (Math.abs(dx) + Math.abs(dy) > 6) moved = true; this.mox = drag.ox - dx / this.mz; this.moy = drag.oy - dy / this.mz; this.drawMap(); } };
    const end = e => { if (drag && !moved && !pinch) this.mapTap(drag.x, drag.y); drag = null; if (!e.touches || e.touches.length < 2) pinch = null; };
    cv.addEventListener('touchstart', start, { passive: false }); cv.addEventListener('touchmove', move, { passive: false }); cv.addEventListener('touchend', end);
    cv.addEventListener('mousedown', start); cv.addEventListener('mousemove', e => { if (drag) move(e); }); cv.addEventListener('mouseup', end);
    cv.addEventListener('wheel', e => { e.preventDefault(); this.mz = clamp(this.mz * (e.deltaY < 0 ? 1.2 : 1 / 1.2), 0.5, 12); this.drawMap(); }, { passive: false });
    this.mapSel = null;
    this.drawMap();
  },
  mapMarkers() {
    const W = Game.world, M = Game.mods, out = [];
    for (const s of W.settlements) { const known = M.discovered.has(s.id); if (known || s.type === 'capital' || s.academy) out.push({ x: s.x, y: s.y, kind: 's', s, known, name: known ? s.name : '???' }); }
    for (const d of W.dungeons) if (M.discovered.has(d.id)) out.push({ x: d.x, y: d.y, kind: 'd', d, name: d.name + ' (Nv ' + d.lvl + ')' });
    for (const p of W.pois) if (M.discovered.has(p.id)) out.push({ x: p.x, y: p.y, kind: 'p', p, name: p.name + (p.kind === 'runestone' && M.runes.has(p.id) ? ' (absorvida)' : '') });
    return out;
  },
  drawMap() {
    const cv = this.mcv, ctx = this.mctx, W = Game.world, P = Game.player, M = Game.mods;
    if (!cv) return;
    const z = this.mz, cw = cv.width, ch = cv.height;
    const ox = cw / 2 - this.mox * z, oy = ch / 2 - this.moy * z;
    ctx.fillStyle = '#10182a'; ctx.fillRect(0, 0, cw, ch);
    ctx.imageSmoothingEnabled = false;
    if (!W.mapDone) { while (!W.mapDone) W.stepMapImage(32); }
    ctx.drawImage(W.mapCanvas, ox, oy, MAP_W * z, MAP_H * z);
    ctx.drawImage(this.fog, ox, oy, MAP_W * z, MAP_H * z);
    const toS = (tx, ty) => [ox + tx / 16 * z, oy + ty / 16 * z];
    ctx.font = 'bold 22px VT323, monospace'; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,240,200,0.4)';
    { let [x, y] = toS(2048, 120); ctx.fillText('ELDORIA', x, y); [x, y] = toS(5180, 120); ctx.fillText('KAELORIA', x, y); [x, y] = toS(4250, 2048); ctx.font = 'italic 16px VT323, monospace'; ctx.fillStyle = 'rgba(200,230,255,0.45)'; ctx.fillText('Mar das Brumas', x, y); [x, y] = toS(3000, 4250); ctx.fillText('Oceano do Sul', x, y); ctx.font = 'bold 22px VT323, monospace'; ctx.fillStyle = 'rgba(255,240,200,0.4)'; [x, y] = toS(3080, 4700); ctx.fillText('VALTHERIA', x, y); }
    ctx.font = 'bold 14px VT323, monospace'; ctx.textAlign = 'center';
    for (const r of W.regions) { const [x, y] = toS(r.cx, r.cy); ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillText(r.name.toUpperCase(), x + 1, y - 30 + 1); ctx.fillStyle = 'rgba(255,240,200,0.75)'; ctx.fillText(r.name.toUpperCase(), x, y - 30); }
    ctx.font = '15px VT323, monospace';
    War.drawMap(ctx, toS, z);
    for (const m of this.mapMarkers()) {
      const [x, y] = toS(m.x, m.y);
      if (x < -20 || y < -20 || x > cw + 20 || y > ch + 20) continue;
      if (m.kind === 's') {
        const sz = m.s.type === 'capital' || m.s.academy ? 7 : m.s.type === 'town' ? 5 : 4;
        ctx.fillStyle = '#1a1010'; ctx.fillRect(x - sz - 1, y - sz - 1, sz * 2 + 2, sz * 2 + 2);
        ctx.fillStyle = m.s.port ? '#80d8ff' : m.s.academy ? '#6090ff' : m.known ? (m.s.type === 'capital' ? '#ffd040' : '#f0e0c0') : '#807060'; ctx.fillRect(x - sz, y - sz, sz * 2, sz * 2);
        if (m.s.type === 'capital' || m.s.academy || z > 3.5 || this.mapSel === m) { ctx.fillStyle = '#000'; ctx.fillText(m.name, x + 1, y - sz - 3 + 1); ctx.fillStyle = m.known ? '#fff' : '#b0a090'; ctx.fillText(m.name, x, y - sz - 3); }
      } else if (m.kind === 'd') {
        const cl = M.cleared[m.d.id] !== undefined;
        ctx.fillStyle = '#1a1010'; ctx.fillRect(x - 4, y - 4, 8, 8);
        ctx.fillStyle = m.d.unique ? '#ff60ff' : cl ? '#60c060' : '#e04040'; ctx.fillRect(x - 3, y - 3, 6, 6);
        if (z > 5 || this.mapSel === m) { ctx.fillStyle = '#000'; ctx.fillText(m.name, x + 1, y - 6); ctx.fillStyle = '#ffc0c0'; ctx.fillText(m.name, x, y - 7); }
      } else {
        ctx.fillStyle = '#1a1010'; ctx.fillRect(x - 3, y - 3, 7, 7);
        ctx.fillStyle = m.p.kind === 'destiny' ? '#ff80ff' : m.p.kind === 'runestone' ? '#60e0ff' : m.p.kind === 'shrine' ? '#fff0a0' : (Game.campCleared(m.p) ? '#808080' : '#ff9030'); ctx.fillRect(x - 2, y - 2, 5, 5);
        if (z > 5 || this.mapSel === m) { ctx.fillStyle = '#000'; ctx.fillText(m.name, x + 1, y - 5); ctx.fillStyle = '#e0f0ff'; ctx.fillText(m.name, x, y - 6); }
      }
    }
    // alvo rastreado
    const q = Game.trackedQuest();
    const tgt = Game.trackTarget(q);
    if (tgt) { const [x, y] = toS(tgt.x, tgt.y); const r = 6 + Math.sin(Game.t * 6) * 2; ctx.strokeStyle = '#ffd040'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r + (tgt.region ? 20 : 0), 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = '#ffd040'; ctx.fillText('★', x, y + 5); }
    for (const t of M.treasures) { const [x, y] = toS(t.x, t.y); ctx.fillStyle = '#ff3030'; ctx.font = 'bold 18px VT323, monospace'; ctx.fillText('X', x, y + 5); }
    // jogador
    const wp = Game.level.isWorld ? P : (Game.worldPos || P);
    const [px, py] = toS(wp.x / 16, wp.y / 16);
    ctx.save(); ctx.translate(px, py); ctx.rotate(P.face + Math.PI / 2);
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(7, 7); ctx.lineTo(-7, 7); ctx.fill();
    ctx.fillStyle = '#ff3030'; ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(5, 5); ctx.lineTo(-5, 5); ctx.fill();
    ctx.restore();
    ctx.textAlign = 'left';
    const info = document.getElementById('mapinfo');
    if (info && !this.mapSel) info.innerHTML = `<b>${esc(Game.locationName())}</b> • Dia ${Game.day} ${Game.timeStr()}<br><small class="dim">Toque em uma cidade descoberta para viajar rápido. Arraste para mover, pinça para zoom.</small>`;
  },
  mapTap(sx, sy) {
    const z = this.mz, cw = this.mcv.width, ch = this.mcv.height;
    const ox = cw / 2 - this.mox * z, oy = ch / 2 - this.moy * z;
    let best = null, bd = 22;
    for (const m of this.mapMarkers()) { const x = ox + m.x / 16 * z, y = oy + m.y / 16 * z; const d = Math.hypot(sx - x, sy - y); if (d < bd) { bd = d; best = m; } }
    this.mapSel = best;
    this.drawMap();
    const info = document.getElementById('mapinfo');
    if (!best) return;
    const f = this.reg();
    let html = `<b>${esc(best.name)}</b>`;
    if (best.kind === 's') {
      html += `<br><small class="dim">${esc(best.s.region.name)} • ${{ capital: 'Capital', town: 'Cidade', village: 'Vila' }[best.s.type]}</small>`;
      if (best.known && Game.level.isWorld) html += `<br><button class="sbtn gold" ${f(() => { this.close(); Game.fastTravel(best.s); })}>Viajar rápido</button>`;
    } else if (best.kind === 'd') html += `<br><small class="dim">${DUNGEON_TYPES[best.d.type].name} • ${Game.mods.cleared[best.d.id] !== undefined ? 'Conquistada' : 'Não conquistada'}</small>`;
    info.innerHTML = html;
    this.bind(info, f);
  },

  // ---------- Nível, morte, vitória ----------
  levelUp() {
    const P = Game.player;
    if (P.pendingLevels <= 0) { this.openMenu('char'); return; }
    const f = this.reg();
    const pick = k => { P.base[k] += 10; P.pendingLevels--; P.recalc(); P.hp = P.stat.maxHp; P.mp = P.stat.maxMp; P.st = P.stat.maxSt; Sfx.play('learn'); if (P.pendingLevels > 0) this.levelUp(); else this.openMenu('char'); };
    const el = this.show('levelup', `<div class="panel small center"><div class="ptitle gold">NÍVEL ${P.level - P.pendingLevels + 1}!</div>
      <p>Escolha um atributo para aumentar (+10):</p>
      <div class="lvl-opts">
        <button class="lvbtn hp" ${f(() => pick('hp'))}>VIDA<br><small>${P.stat.maxHp} → ${P.stat.maxHp + 10}</small></button>
        <button class="lvbtn mp" ${f(() => pick('mp'))}>MAGIA<br><small>${P.stat.maxMp} → ${P.stat.maxMp + 10}</small></button>
        <button class="lvbtn st" ${f(() => pick('st'))}>VIGOR<br><small>${P.stat.maxSt} → ${P.stat.maxSt + 10}</small></button>
      </div><p class="dim">Você também ganhou 1 ponto de talento (aba Herói).</p></div>`, { onBack: () => { } });
    this.bind(el, f);
  },
  death() {
    const f = this.reg();
    const el = this.show('death', `<div class="death"><h1>VOCÊ MORREU</h1><p class="dim">Sua lenda não termina aqui...</p>
      <button class="mbtn gold" ${f(() => { this.close(); Game.respawn(); })}>Despertar na última cidade (-10% ouro)</button>
      ${Game.hasSave(0) ? `<button class="mbtn" ${f(() => Game.loadGame(0))}>Carregar salvamento automático</button>` : ''}
      <button class="mbtn" ${f(() => Game.toTitle())}>Título</button></div>`, { cls: 'dark' });
    this.bind(el, f);
  },
  victory() {
    const P = Game.player;
    const f = this.reg();
    const el = this.show('victory', `<div class="story"><h1 class="logo small">VITÓRIA!</h1><div class="story-text">
      Com o golpe final, Vorthax, o Devorador, desaba sobre a lava. O céu de Eldoria clareia pela primeira vez em séculos.<br><br>
      Os nove reinos celebram o nome de <b class="gold">${esc(P.name)}</b>, o Portador da Chama.<br><br>
      <small class="dim">Nível ${P.level} • ${P.stats.kills} inimigos • ${P.stats.dragons} dragões • ${P.stats.quests} missões • ${Math.floor(P.stats.playTime / 60)} minutos</small><br><br>
      O mundo continua aberto. Ainda há masmorras, guildas e tesouros esperando por você!</div>
      <button class="mbtn gold" ${f(() => { this.close(); Game.saveGame(0, true); })}>Continuar explorando</button></div>`, { cls: 'dark' });
    this.bind(el, f);
  },

  // ---------- HUD ----------
  setText(id, v) { if (this.hudCache[id] !== v) { this.hudCache[id] = v; const e = document.getElementById(id); if (e) e.innerHTML = v; } },
  setStyle(id, prop, v) { const k = id + prop; if (this.hudCache[k] !== v) { this.hudCache[k] = v; const e = document.getElementById(id); if (e) e.style[prop] = v; } },
  setClass(id, cls, on) { const k = id + '.' + cls; if (this.hudCache[k] !== on) { this.hudCache[k] = on; const e = document.getElementById(id); if (e) e.classList.toggle(cls, on); } },
  updateHUD(dt) {
    if (!Game.started || !Game.player) return;
    const P = Game.player, S = P.stat;
    this.setStyle('hp-fill', 'width', (P.hp / S.maxHp * 100).toFixed(1) + '%');
    this.setStyle('mp-fill', 'width', (P.mp / S.maxMp * 100).toFixed(1) + '%');
    this.setStyle('st-fill', 'width', (P.st / S.maxSt * 100).toFixed(1) + '%');
    this.setStyle('xp-fill', 'width', (P.xp / P.needXP() * 100).toFixed(1) + '%');
    this.setText('hp-txt', `${Math.ceil(P.hp)}/${S.maxHp}`);
    this.setText('mp-txt', `${Math.floor(P.mp)}/${S.maxMp}`);
    this.setText('st-txt', `${Math.floor(P.st)}/${S.maxSt}`);
    this.setText('hud-lvl', `Nv ${P.level}${P.pendingLevels > 0 || P.perkPts > 0 ? ' <span class="pulse">▲</span>' : ''}`);
    this.setText('hud-gold', `${fmt(P.gold)}<span class="coin"></span>`);
    this.setText('hud-loc', esc(Game.locationName()));
    this.setText('hud-time', `${Game.isNight() ? '☾' : '☀'} ${Game.timeStr()} • Dia ${Game.day}`);
    // buffs
    const bk = P.buffs.map(b => b.k + Math.ceil(b.t / 10)).join(',') + P.fx.map(e => e.k).join(',');
    if (this.hudCache.buffs !== bk) {
      this.hudCache.buffs = bk;
      const names = { dmg: 'Força', regen: 'Regeneração', resFire: 'Anti-fogo', resFrost: 'Anti-gelo', speed: 'Velocidade', armor: 'Escudo', light: 'Luz', coragem: 'Coragem', graca: 'Graça', pele_pedra: 'Pele de Pedra', furia: 'Fúria', sorte: 'Sorte', garras: 'Garras', sangue_gelo: 'Sangue de Gelo' };
      const fxn = { burn: '🔥 Queimando', poison: '☠ Envenenado' };
      document.getElementById('buffs').innerHTML = P.buffs.map(b => `<span class="buff">${names[b.k] || b.k} ${Math.ceil(b.t)}s</span>`).join('') + P.fx.map(e => `<span class="buff bad">${fxn[e.k] || e.k}</span>`).join('');
    }
    // magia selecionada
    const sp = SPELLS[P.spells[P.spellIdx]];
    const spk = sp ? P.spells[P.spellIdx] : 'none';
    if (this.hudCache.spell !== spk) {
      this.hudCache.spell = spk;
      document.getElementById('b-spell').innerHTML = sp ? `<img src="${Sprites.iconURL({ k: 'spell', c: sp.color })}" style="width:26px;height:26px"><span class="blabel">${sp.name.split(' ')[0]}</span>` : '<span class="blabel">—</span>';
    }
    const cdk = sp ? (P.cds['sp_' + P.spells[P.spellIdx]] || 0) / sp.cd : 0;
    this.setClass('b-spell', 'nomana', !!sp && P.mp < sp.cost * 0.75);
    this.setStyle('b-spell', 'opacity', cdk > 0 ? '0.6' : '1');
    this.setClass('b-spellnext', 'hidden', P.spells.length < 2);
    this.setClass('b-shout', 'hidden', !P.shouts.length);
    if (P.shouts.length) this.setClass('b-shout', 'cool', !!P.cds['sh_' + P.shouts[P.shoutIdx]]);
    this.setClass('b-racial', 'cool', !!P.cds.racial);
    this.setClass('b-mount', 'hidden', !P.mount);
    this.setClass('b-mana', 'hidden', !(P.count('pocao_magia_p') || P.count('pocao_magia_m') || P.count('pocao_magia_g')));
    const pots = P.count('pocao_vida_p') + P.count('pocao_vida_m') + P.count('pocao_vida_g');
    this.setText('pot-n', pots ? String(pots) : '');
    // interação
    const it = Game.interact;
    this.setClass('b-interact', 'show', !!it);
    if (it) this.setText('b-interact', `<span class="ilabel">${esc(it.label)}</span>`);
    this.setText('prompt', it ? `${Input.usingTouch ? '' : '[E] '}${esc(it.label)}: ${esc(it.name || '')}` : '');
    this.setClass('prompt', 'hidden', !it);
    // rastreador e bússola
    const q = Game.trackedQuest();
    let tt = '', tgt = null;
    if (q === 'main') { const st = Quests.mainStep(); tt = `<b class="gold">★ ${esc(st.title)}</b>`; tgt = Quests.targetPos('main'); }
    else if (q === 'treasure') { tt = '<b class="gold">✖ Tesouro escondido</b>'; tgt = Game.treasureTarget(); }
    else if (q === 'war') { tgt = War.orderTarget(); tt = `<b class="gold">⚔ Ordens</b><br><small>Junte-se ao exército ${esc(tgt ? tgt.name : '')}</small>`; }
    else if (q) { tt = `<b>${esc(q.title)}</b><br><small>${esc(Quests.progressText(q))}</small>`; tgt = Quests.targetPos(q); }
    this.setText('tracker', tt);
    if (tgt && Game.level.isWorld) {
      const dx = tgt.x * 16 + 8 - P.x, dy = tgt.y * 16 - P.y;
      const d = Math.hypot(dx, dy) / 16;
      const a = Math.atan2(dy, dx);
      this.setStyle('compass-arrow', 'transform', `rotate(${(a * 180 / Math.PI + 90).toFixed(0)}deg)`);
      this.setText('compass-dist', d < 12 ? 'Aqui!' : (d * 2 >= 1000 ? (d * 2 / 1000).toFixed(1) + ' km' : Math.round(d * 2) + ' m'));
      this.setClass('compass', 'hidden', false);
    } else if (tgt && Game.level.def && tgt.dungeon === Game.level.def.id) {
      this.setText('compass-dist', 'Nesta masmorra'); this.setClass('compass', 'hidden', false); this.setStyle('compass-arrow', 'transform', 'rotate(0deg)');
    } else this.setClass('compass', 'hidden', true);
    // barra de chefe
    let boss = null;
    for (const a of Game.actors) if (a.boss && !a.dead && a.team === 'enemy' && a.target === P && dist(a.x, a.y, P.x, P.y) < 320) { boss = a; break; }
    this.setClass('bossbar', 'hidden', !boss);
    if (boss) { this.setText('boss-name', `${esc(boss.name)} <small>Nv ${boss.lvl}</small>`); this.setStyle('boss-fill', 'width', (boss.hp / boss.maxHp * 100).toFixed(1) + '%'); }
    // minimapa
    this.mmT -= dt;
    if (this.mmT <= 0) { this.mmT = 0.25; this.drawMinimap(); }
  },
  drawMinimap() {
    const ctx = this.mmx, L = Game.level, P = Game.player;
    const N = 48, S = 2;
    if (!this.mmImg) { this.mmImg = ctx.createImageData(N * S, N * S); }
    const img = this.mmImg, d = img.data;
    const ptx = Math.floor(P.x / 16), pty = Math.floor(P.y / 16);
    if (!this.tileRGB) { this.tileRGB = TILE_DEFS.map(t => t ? hexToRgb(t.c) : [0, 0, 0]); }
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const tx = ptx + x - N / 2, ty = pty + y - N / 2;
      let c;
      if (L.isWorld && (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H)) c = [20, 40, 80];
      else if (L.isWorld && !L.chunks.has(L.ckey(tx >> 5, ty >> 5))) c = [16, 14, 24];
      else {
        c = this.tileRGB[L.tileAt(tx, ty)];
        const o = L.objAt(tx, ty);
        if (o && OSOLID[o]) c = o === O.BLOCK ? [150, 100, 70] : [c[0] * 0.65, c[1] * 0.65, c[2] * 0.65];
      }
      for (let sy = 0; sy < S; sy++) for (let sx = 0; sx < S; sx++) { const i = ((y * S + sy) * N * S + x * S + sx) * 4; d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255; }
    }
    ctx.putImageData(img, 0, 0);
    const toM = (wx, wy) => [(wx / 16 - ptx + N / 2) * S, (wy / 16 - pty + N / 2) * S];
    for (const a of Game.actors) {
      if (a.dead || a.hidden) continue;
      const [x, y] = toM(a.x, a.y); if (x < 0 || y < 0 || x > N * S || y > N * S) continue;
      ctx.fillStyle = a.team === 'enemy' ? (a.boss ? '#ff40ff' : '#ff3030') : a.team === 'ally' ? '#40a0ff' : (a.role === 'quest' ? '#ffd040' : '#e0e0e0');
      ctx.fillRect(x - 1, y - 1, a.boss ? 3 : 2, a.boss ? 3 : 2);
    }
    const q = Game.trackedQuest();
    const tgt = Game.trackTarget(q);
    if (tgt && L.isWorld) { let [x, y] = toM(tgt.x * 16, tgt.y * 16); x = clamp(x, 3, N * S - 3); y = clamp(y, 3, N * S - 3); ctx.fillStyle = '#000'; ctx.fillRect(x - 2, y - 2, 5, 5); ctx.fillStyle = '#ffd040'; ctx.fillRect(x - 1, y - 1, 3, 3); }
    ctx.fillStyle = '#fff'; ctx.fillRect(N / 2 * S - 1, N / 2 * S - 1, 3, 3);
  }
};
