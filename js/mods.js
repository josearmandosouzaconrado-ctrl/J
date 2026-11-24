'use strict';
// =====================================================================
//  MODS — qualquer pessoa pode criar um mod para Crônicas de Eldoria
//  Um mod é um arquivo .js que usa a API "Eldoria" (em português):
//    Eldoria.registrar({ id, nome, versao, autor, descricao, iniciar(api) { ... } })
//  Dentro de iniciar(api) o mod cria itens e inimigos, reage a eventos
//  (cada quadro, desenhar no mundo, mundo pronto, dia novo, inimigo morto,
//  falar com NPC), dá itens e ouro, mostra avisos e diálogos, cria botões
//  e guarda dados próprios. O guia completo está em docs/MODS.md e há um
//  mod de exemplo em mods/exemplo_vaca_dourada.js.
//  Instalação pelo menu 🧩 Mods (tela inicial ou Opções): arquivo .js,
//  texto colado ou link. Os mods ficam guardados no aparelho e rodam
//  quando o jogo abre. Abrir o jogo com ?semmods desliga todos os mods.
// =====================================================================
const MODS_CHAVE = 'eldoria_mods';
const Mods = {
  lista: [],          // mods instalados: { id, nome, codigo, ativo, origem, erro }
  carregados: [],     // mods que registraram: { def, botoes, eventos }
  eventos: { quadro: [], desenhar: [], mundoPronto: [], diaNovo: [], inimigoMorto: [], falarNPC: [] },
  _w: null, _dia: null,
  ler() { try { this.lista = JSON.parse(localStorage.getItem(MODS_CHAVE)) || []; } catch (e) { this.lista = []; } },
  gravar() { try { localStorage.setItem(MODS_CHAVE, JSON.stringify(this.lista)); return true; } catch (e) { Game.toast('Sem espaço para guardar o mod.', '#ff8080'); return false; } },
  // ---------- a API que o mod recebe ----------
  api(modId) {
    const M = this, reg = () => M.carregados.find(c => c.id === modId);
    const on = (ev, fn) => { if (!M.eventos[ev]) throw new Error('Evento desconhecido: ' + ev + ' (use: ' + Object.keys(M.eventos).join(', ') + ')'); M.eventos[ev].push({ modId, fn }); };
    return {
      versaoJogo: GAME_VERSION,
      ao: on, on,
      item(id, def) { return idef(id, Object.assign({ name: id, type: 'material', value: 10, stack: true, icon: { k: 'bottle', c: '#e0c050' }, desc: 'Item de mod.' }, def)); },
      inimigo(id, def) { ENEMIES[id] = Object.assign({ name: id, look: { k: 'slime', c: '#60c060' }, hp: 50, dmg: 8, spd: 50, ai: 'melee', xp: 20 }, def); return ENEMIES[id]; },
      criar(idInimigo, x, y, nivel) {
        const P = Game.player; if (!P || !ENEMIES[idInimigo]) return null;
        const m = new Monster(idInimigo, x != null ? x : P.x + 60, y != null ? y : P.y, nivel || P.level);
        Game.findFree(m); Game.actors.push(m); return m;
      },
      dar(idItem, n = 1) { const P = Game.player; if (!P || !ITEMS[idItem]) return false; P.addItem(Items.make(idItem, n)); return true; },
      ouro(n) { const P = Game.player; if (P) { P.gold += n; Game.toast((n >= 0 ? '+' : '') + n + ' ouro', '#ffd040'); } },
      aviso(texto, cor) { Game.toast(String(texto), cor || '#a0e0ff'); },
      mensagem(titulo, sub) { Game.centerMsg(String(titulo), sub ? String(sub) : ''); },
      dialogo(titulo, texto, opcoes) { UI.dialog(String(titulo), null, esc(String(texto)), (opcoes || [{ label: 'Ok' }]).map(o => ({ label: String(o.label || o.rotulo || 'Ok'), fn: o.fn || o.acao }))); },
      botao(rotulo, fn) { const r = reg(); if (r) r.botoes.push({ rotulo: String(rotulo), fn }); },
      jogador() { return Game.player; },
      mundo() { return Game.world; },
      hora() { return (Game.time / 60) % 24; },
      dia() { return Game.day; },
      salvar(chave, valor) { try { localStorage.setItem('eldoria_mod_' + modId + '_' + chave, JSON.stringify(valor)); } catch (e) { } },
      ler(chave, padrao) { try { const v = localStorage.getItem('eldoria_mod_' + modId + '_' + chave); return v === null ? padrao : JSON.parse(v); } catch (e) { return padrao; } },
      // acesso total para mods avançados (por sua conta e risco)
      jogo: Game, ui: UI, dados: { ITEMS, ENEMIES, REGIONS, RACES, SPAWNS, SPELLS: typeof SPELLS !== 'undefined' ? SPELLS : null }
    };
  },
  // ---------- rodar os mods ativos ----------
  iniciar() {
    this.ler();
    if (/[?&]semmods\b/.test(location.search)) { console.log('Mods desligados (?semmods)'); return; }
    for (const m of this.lista) {
      if (!m.ativo) continue;
      this._atual = m;
      try { new Function('Eldoria', '"use strict";\n' + m.codigo + '\n//# sourceURL=mod_' + m.id + '.js')(this.global); m.erro = null; }
      catch (e) { m.erro = String(e && e.message || e); console.warn('Mod com erro:', m.nome, e); }
      this._atual = null;
    }
    this.gravar();
  },
  global: {
    registrar(def) {
      const M = Mods, inst = M._atual;
      if (!def || typeof def !== 'object') throw new Error('Eldoria.registrar precisa de um objeto { id, nome, iniciar(api) }');
      const id = String(def.id || (inst && inst.id) || 'mod' + M.carregados.length);
      const c = { id, def, botoes: [], inst };
      M.carregados.push(c);
      if (inst) { inst.nome = def.nome || inst.nome; inst.autor = def.autor || ''; inst.versao = def.versao || ''; inst.descricao = def.descricao || ''; }
      if (typeof def.iniciar === 'function') def.iniciar(M.api(id));
      return c;
    },
    get versaoJogo() { return GAME_VERSION; }
  },
  emitir(ev, ...args) {
    const L = this.eventos[ev]; if (!L || !L.length) return undefined;
    for (const h of L.slice()) {
      try { const r = h.fn(...args); if (r === true) return true; }
      catch (e) {
        h.erros = (h.erros || 0) + 1; console.warn('Mod', h.modId, ev, e);
        if (h.erros >= 5) { L.splice(L.indexOf(h), 1); const m = this.lista.find(x => x.id === h.modId); if (m) { m.erro = `${ev}: ${e.message}`; this.gravar(); } Game.toast(`Mod "${h.modId}" deu erro e o evento "${ev}" foi desligado.`, '#ff8080'); }
      }
    }
    return undefined;
  },
  // ---------- instalar, ligar, desligar e remover ----------
  instalar(codigo, origem) {
    codigo = String(codigo || '').trim();
    if (!codigo) return Game.toast('O mod está vazio.', '#ff8080');
    if (codigo.length > 400000) return Game.toast('O mod é grande demais (máx. 400 KB).', '#ff8080');
    try { new Function('Eldoria', codigo); } catch (e) { return UI.dialog('Mod com erro', null, 'O código tem um erro e não foi instalado:<br><br><code>' + esc(e.message) + '</code>', [{ label: 'Voltar', fn: () => this.menu() }]); }
    const m0 = /id\s*:\s*['"]([\w-]{1,40})['"]/.exec(codigo), n0 = /nome\s*:\s*['"]([^'"]{1,60})['"]/.exec(codigo);
    const id = m0 ? m0[1] : 'mod' + Date.now().toString(36);
    const ex = this.lista.find(m => m.id === id);
    const novo = { id, nome: n0 ? n0[1] : id, codigo, ativo: true, origem: origem || 'texto', erro: null, data: Date.now() };
    if (ex) Object.assign(ex, novo); else this.lista.push(novo);
    if (this.gravar()) this.reiniciar(`O mod "${novo.nome}" foi ${ex ? 'atualizado' : 'instalado'}.`);
  },
  reiniciar(msg) {
    UI.dialog('🧩 Mods', null, esc(msg) + '<br><br>Os mods começam a valer quando o jogo é aberto de novo. O seu progresso salvo continua igual.', [
      { label: '🔄 Reabrir o jogo agora', cls: 'gold', fn: () => { if (Game.started) { try { Game.saveGame(0, true); } catch (e) { } } location.reload(); } },
      { label: 'Depois', fn: () => this.menu() }
    ]);
  },
  baixar(url) {
    url = String(url || '').trim();
    if (!/^https?:\/\//i.test(url)) return Game.toast('Coloque um link que comece com http:// ou https://', '#ff8080');
    Game.toast('Baixando o mod...', '#a0e0ff');
    fetch(url).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); }).then(t => this.instalar(t, url)).catch(e => Game.toast('Não consegui baixar: ' + e.message, '#ff8080'));
  },
  // ---------- a tela de mods ----------
  menu() {
    this.ler();
    const f = UI.reg();
    const rodando = new Set(this.carregados.map(c => c.id));
    const linhas = this.lista.map(m => {
      const c = this.carregados.find(x => x.id === m.id);
      const bot = c && c.botoes.length && Game.started ? c.botoes.map(b => `<button class="sbtn small" ${f(() => { try { b.fn(); } catch (e) { Game.toast('Erro no mod: ' + e.message, '#ff8080'); } })}>${esc(b.rotulo)}</button>`).join(' ') : '';
      const est = m.erro ? `<span style="color:#ff8080">⚠ erro: ${esc(m.erro)}</span>` : m.ativo ? (rodando.has(m.id) ? '<span style="color:#80ff90">● rodando</span>' : '<span style="color:#ffd070">● liga ao reabrir</span>') : '<span class="dim">○ desligado</span>';
      return `<div class="slot"><div><b>${esc(m.nome)}</b> ${m.versao ? `<span class="dim">v${esc(m.versao)}</span>` : ''}${m.autor ? ` <span class="dim">por ${esc(m.autor)}</span>` : ''}<br>
        ${m.descricao ? `<span class="small">${esc(m.descricao)}</span><br>` : ''}${est}${bot ? '<br>' + bot : ''}</div>
        <div><button class="sbtn small ${m.ativo ? 'on' : ''}" ${f(() => { m.ativo = !m.ativo; m.erro = null; this.gravar(); this.reiniciar(`O mod "${m.nome}" foi ${m.ativo ? 'ligado' : 'desligado'}.`); })}>${m.ativo ? 'Ligado' : 'Desligado'}</button>
        <button class="sbtn small danger" ${f(() => UI.dialog('Remover mod', null, `Remover <b>${esc(m.nome)}</b>?`, [{ label: 'Remover', cls: 'danger', fn: () => { this.lista = this.lista.filter(x => x !== m); this.gravar(); this.reiniciar(`O mod "${m.nome}" foi removido.`); } }, { label: 'Cancelar', fn: () => this.menu() }]))}>Remover</button></div></div>`;
    }).join('') || '<div class="dim" style="padding:8px">Nenhum mod instalado ainda.</div>';
    const voltar = () => Game.started ? UI.openMenu('system') : UI.showTitle();
    const el = UI.show('mods', `<div class="panel"><div class="ptitle">🧩 Mods</div>
      <div class="small dim">Mods mudam o jogo: itens, inimigos, eventos, missões... Instale só mods de quem você confia: um mod pode fazer qualquer coisa dentro do jogo.</div>
      <div class="row" style="gap:6px;flex-wrap:wrap;margin:6px 0">
        <button class="mbtn" style="flex:1;min-width:160px" ${f(() => ModsGaleria.abrir())}>🌍 Galeria de Mods<br><span class="small">ative mods feitos por outros jogadores</span></button>
        <button class="mbtn" style="flex:1;min-width:160px" ${f(() => ModsGaleria.publicar())}>📤 Publicar meu mod<br><span class="small">coloque o seu mod na galeria</span></button>
      </div>
      <div class="ptitle" style="font-size:18px">Instalados</div>
      <div class="slots">${linhas}</div>
      <div class="ptitle" style="font-size:18px;margin-top:8px">Instalar um mod</div>
      <div class="row" style="flex-wrap:wrap;gap:6px">
        <label class="sbtn">📁 Escolher arquivo .js<input type="file" id="mod-arq" accept=".js,.txt,text/javascript,text/plain" style="display:none"></label>
        <button class="sbtn" ${f(() => this.instalar(EXEMPLO_MOD, 'exemplo'))}>⭐ Instalar o mod de exemplo</button>
        <button class="sbtn" ${f(() => this.guia())}>📖 Como criar um mod</button>
      </div>
      <div class="row" style="gap:6px;margin-top:6px"><input id="mod-url" placeholder="https://... link do arquivo .js do mod" style="flex:1;min-width:0;font:inherit;padding:6px;background:#1a1420;color:#f2e6cc;border:1px solid #5a4a6a"><button class="sbtn" ${f(() => this.baixar(document.getElementById('mod-url').value))}>Baixar</button></div>
      <textarea id="mod-txt" placeholder="...ou cole aqui o código do mod" style="width:100%;height:90px;margin-top:6px;font:12px monospace;background:#1a1420;color:#f2e6cc;border:1px solid #5a4a6a;box-sizing:border-box"></textarea>
      <button class="sbtn" ${f(() => this.instalar(document.getElementById('mod-txt').value, 'texto'))}>Instalar o código colado</button>
      <button class="mbtn" ${f(voltar)}>Voltar</button></div>`, { onBack: voltar });
    UI.bind(el, f);
    const inp = el.querySelector('#mod-arq');
    if (inp) inp.addEventListener('change', () => { const a = inp.files && inp.files[0]; if (!a) return; const r = new FileReader(); r.onload = () => this.instalar(r.result, a.name); r.readAsText(a); });
  },
  guia() {
    UI.dialog('📖 Como criar um mod', null, `Um mod é um arquivo <b>.js</b>. O jogo entrega o objeto <code>Eldoria</code>; registre o seu mod assim:
<pre style="white-space:pre-wrap;font-size:11px;background:#140e18;padding:6px">Eldoria.registrar({
  id: 'meu_mod', nome: 'Meu Mod', versao: '1.0', autor: 'Você',
  descricao: 'O que o mod faz.',
  iniciar(api) {
    api.item('pao_magico', { name: 'Pão Mágico', type: 'food', use: { heal: 50 }, value: 30,
      icon: { k: 'bread', c: '#f0c040' }, desc: 'Cura 50 de vida.' });
    api.botao('Ganhar pão', () => api.dar('pao_magico', 3));
    api.ao('diaNovo', dia => api.aviso('Bom dia! Dia ' + dia));
    api.ao('inimigoMorto', m => { if (Math.random() < 0.1) api.ouro(5); });
  }
});</pre>
<b>Eventos</b> (api.ao): quadro(dt), desenhar(ctx, camX, camY), mundoPronto(mundo), diaNovo(dia), inimigoMorto(inimigo, matador), falarNPC(npc): retorne <i>true</i> para tratar a conversa você mesmo.<br>
<b>Funções</b>: item, inimigo, criar, dar, ouro, aviso, mensagem, dialogo, botao, jogador, mundo, hora, dia, salvar, ler. Acesso total: api.jogo, api.ui, api.dados.<br>
O guia completo fica em <b>docs/MODS.md</b> no GitHub do jogo, com o mod de exemplo em <b>mods/</b>.`, [{ label: 'Voltar', fn: () => this.menu() }]);
  }
};
// o mod de exemplo (também em mods/exemplo_vaca_dourada.js)
const EXEMPLO_MOD = `// Mod de exemplo: A Vaca Dourada
Eldoria.registrar({
  id: 'vaca_dourada', nome: 'A Vaca Dourada', versao: '1.0', autor: 'Crônicas de Eldoria',
  descricao: 'Adiciona o Leite Dourado, a Vaca Brava e um presente a cada novo dia.',
  iniciar(api) {
    api.item('leite_dourado', { name: 'Leite Dourado', type: 'potion', use: { heal: 80 }, value: 60, stack: true,
      icon: { k: 'potion', c: '#ffd040' }, desc: 'Leite de uma vaca mágica. Cura 80 de vida.' });
    api.inimigo('vaca_brava', { name: 'Vaca Brava', look: { k: 'boar', c: '#f0e8d8' }, hp: 90, dmg: 12, spd: 70,
      ai: 'charge', xp: 30, drops: [['leite_dourado', 0.8], ['carne_crua', 1]], animal: true });
    api.botao('🐄 Chamar uma Vaca Brava', () => { api.criar('vaca_brava'); api.aviso('Muuu! Uma Vaca Brava apareceu!', '#ffd040'); });
    api.botao('🥛 Ganhar Leite Dourado', () => api.dar('leite_dourado', 1));
    api.ao('diaNovo', dia => { const n = api.ler('presentes', 0) + 1; api.salvar('presentes', n); if (dia % 3 === 0) { api.dar('leite_dourado', 1); api.aviso('A Vaca Dourada deixou um presente! (' + n + ')', '#ffd040'); } });
    api.ao('inimigoMorto', m => { if (m.eid === 'vaca_brava') api.mensagem('Vaca vencida!', 'Que bicho bravo...'); });
  }
});
`;
// ---------- ligações com o jogo ----------
(function () {
  const t0 = Inverno.tick.bind(Inverno);
  Inverno.tick = function (dt) {
    t0(dt);
    const M = Mods; if (!M.carregados.length) return;
    if (Game.world && Game.world !== M._w) { M._w = Game.world; M._dia = Game.day; M.emitir('mundoPronto', Game.world); }
    if (Game.day !== M._dia) { M._dia = Game.day; M.emitir('diaNovo', Game.day); }
    M.emitir('quadro', dt);
  };
  const d0 = Inverno.drawables.bind(Inverno);
  Inverno.drawables = function (D, camX, camY, vw, vh) {
    d0(D, camX, camY, vw, vh);
    if (Mods.eventos.desenhar.length) D.push({ y: 1e9, fn: (ctx, cx, cy) => { ctx.save(); Mods.emitir('desenhar', ctx, cx, cy); ctx.restore(); } });
  };
  const k0 = Monster.prototype.die;
  Monster.prototype.die = function (killer) { const r = k0.apply(this, arguments); if (Mods.eventos.inimigoMorto.length) Mods.emitir('inimigoMorto', this, killer); return r; };
  const n0 = UI.talkNPC.bind(UI);
  UI.talkNPC = function (a) { if (Mods.eventos.falarNPC.length && Mods.emitir('falarNPC', a) === true) return; return n0(a); };
  window.Eldoria = Mods.global;
  Mods.iniciar();
})();
