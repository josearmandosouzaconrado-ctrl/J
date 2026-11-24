'use strict';
// =====================================================================
//  GALERIA DE MODS — um lugar dentro do jogo para achar e publicar mods
//  • 🌍 Galeria: mods oficiais (vêm com o jogo) e mods que outros jogadores
//    publicaram na Sala Oficial. Um toque em "Ativar" instala e liga o mod.
//  • 📤 Publicar: manda um mod seu para a galeria. Quem publica recebe uma
//    chave guardada no aparelho; só com ela dá para atualizar ou retirar o mod.
//  O servidor (rede/servidor.js) só guarda o texto dos mods, nunca os executa.
// =====================================================================
const MODS_OFICIAIS = [
  { id: 'vaca_dourada', nome: 'A Vaca Dourada', autor: 'Crônicas de Eldoria', versao: '1.0', descricao: 'Leite Dourado que cura, a Vaca Brava para enfrentar e um presente a cada três dias.', codigo: () => EXEMPLO_MOD },
  { id: 'mercador_ambulante', nome: 'Mercador Ambulante', autor: 'Crônicas de Eldoria', versao: '1.0', descricao: 'Um mercador que aparece onde você estiver para vender poções — até no fundo das masmorras.', codigo: () => `// Mod oficial: Mercador Ambulante
Eldoria.registrar({
  id: 'mercador_ambulante', nome: 'Mercador Ambulante', versao: '1.0', autor: 'Crônicas de Eldoria',
  descricao: 'Um mercador que aparece onde você estiver para vender poções.',
  iniciar(api) {
    const comprar = (item, n, preco, nome) => {
      const P = api.jogador(); if (!P) return;
      if (P.gold < preco) return api.aviso('Ouro insuficiente: custa ' + preco + '.', '#ff8080');
      api.ouro(-preco); api.dar(item, n); api.aviso('Comprou ' + n + 'x ' + nome + '.', '#a0ffa0');
    };
    const abrir = () => api.dialogo('🛒 Mercador Ambulante', '"Saudações, viajante! Tenho o que você precisa, onde você estiver."', [
      { label: '3 Poções de Vida — 45 ouro', fn: () => { comprar('pocao_vida_p', 3, 45, 'Poção de Vida'); abrir(); } },
      { label: '3 Poções de Mana — 45 ouro', fn: () => { comprar('pocao_magia_p', 3, 45, 'Poção de Mana'); abrir(); } },
      { label: '1 Poção de Vigor — 25 ouro', fn: () => { comprar('pocao_vigor', 1, 25, 'Poção de Vigor'); abrir(); } },
      { label: 'Até logo' }
    ]);
    api.botao('🛒 Chamar o Mercador', abrir);
  }
});
` },
  { id: 'cacador_recompensas', nome: 'Caçador de Recompensas', autor: 'Crônicas de Eldoria', versao: '1.0', descricao: 'Conta os inimigos que você derrota e paga uma recompensa a cada 20 abates.', codigo: () => `// Mod oficial: Caçador de Recompensas
Eldoria.registrar({
  id: 'cacador_recompensas', nome: 'Caçador de Recompensas', versao: '1.0', autor: 'Crônicas de Eldoria',
  descricao: 'Conta os inimigos derrotados e paga uma recompensa a cada 20 abates.',
  iniciar(api) {
    api.ao('inimigoMorto', (m, quem) => {
      const P = api.jogador(); if (!P || quem !== P) return;
      const n = api.ler('abates', 0) + 1; api.salvar('abates', n);
      if (n % 20 === 0) { const premio = 30 + P.level * 10; api.ouro(premio); api.mensagem('Recompensa!', n + ' inimigos derrotados: +' + premio + ' ouro'); }
    });
    api.botao('📜 Meus abates', () => { const n = api.ler('abates', 0); api.dialogo('📜 Caçador de Recompensas', 'Inimigos derrotados: ' + n + '. Faltam ' + (20 - n % 20) + ' para a próxima recompensa.'); });
  }
});
` },
  { id: 'fogos_artificio', nome: 'Fogos de Artifício', autor: 'Crônicas de Eldoria', versao: '1.0', descricao: 'Solte fogos coloridos quando quiser. A cada 7 dias tem festa com fogos à noite.', codigo: () => `// Mod oficial: Fogos de Artifício
Eldoria.registrar({
  id: 'fogos_artificio', nome: 'Fogos de Artifício', versao: '1.0', autor: 'Crônicas de Eldoria',
  descricao: 'Fogos coloridos no céu. A cada 7 dias tem festa com fogos.',
  iniciar(api) {
    const fa = [], cores = ['#ff5050', '#ffd040', '#60ff80', '#60c0ff', '#ff70ff', '#ffffff'];
    let fila = 0, espera = 0;
    const estourar = () => {
      const P = api.jogador(); if (!P) return;
      const x = P.x + (Math.random() - 0.5) * 220, y = P.y - 70 - Math.random() * 80, c = cores[Math.floor(Math.random() * cores.length)];
      for (let i = 0; i < 36; i++) { const a = i / 36 * Math.PI * 2, v = 40 + Math.random() * 50; fa.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: 1.4 + Math.random() * 0.6, c }); }
    };
    api.ao('quadro', dt => {
      if (fila > 0 && (espera -= dt) <= 0) { estourar(); fila--; espera = 0.35 + Math.random() * 0.4; }
      for (let i = fa.length - 1; i >= 0; i--) { const p = fa[i]; p.t -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 30 * dt; if (p.t <= 0) fa.splice(i, 1); }
    });
    api.ao('desenhar', (ctx, cx, cy) => {
      for (const p of fa) { ctx.globalAlpha = Math.min(1, p.t); ctx.fillStyle = p.c; ctx.fillRect(Math.round(p.x - cx), Math.round(p.y - cy), 2, 2); }
      ctx.globalAlpha = 1;
    });
    api.botao('🎆 Soltar fogos', () => { fila += 6; });
    api.ao('diaNovo', dia => { if (dia % 7 === 0) { fila += 12; api.mensagem('Dia de Festa!', 'Fogos no céu de Eldoria'); } });
  }
});
` }
];

const ModsGaleria = {
  lista: null, estado: 'parado', erro: '', filtro: '',
  CHAVES: 'eldoria_mods_chaves',
  base() {
    let u = '';
    try { u = Rede.url(); } catch (e) { u = typeof REDE_SERVIDOR !== 'undefined' ? REDE_SERVIDOR : ''; }
    return String(u).replace(/^ws(s?):\/\//, 'http$1://').replace(/\/ws\/?$/, '');
  },
  pedir(caminho, corpo) {
    const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const tm = setTimeout(() => ctl && ctl.abort(), 75000);   // o servidor gratuito pode levar ~1 min para acordar
    const op = corpo ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(corpo) } : {};
    if (ctl) op.signal = ctl.signal;
    return fetch(this.base() + caminho, op).then(r => r.json().catch(() => ({ ok: false, erro: 'Resposta inválida do servidor (HTTP ' + r.status + ').' })))
      .catch(e => ({ ok: false, erro: e && e.name === 'AbortError' ? 'O servidor demorou demais para responder.' : 'Sem conexão com a galeria.' }))
      .finally(() => clearTimeout(tm));
  },
  chaves() { try { return JSON.parse(localStorage.getItem(this.CHAVES)) || {}; } catch (e) { return {}; } },
  guardarChave(id, chave, nome) { const c = this.chaves(); c[id] = { chave, nome, data: Date.now() }; try { localStorage.setItem(this.CHAVES, JSON.stringify(c)); } catch (e) { } },
  instalado(id) { Mods.ler(); return Mods.lista.find(m => m.id === id); },
  // ---------- 🌍 a galeria ----------
  carregar() {
    this.estado = 'carregando'; this.erro = '';
    this.pedir('/mods').then(r => {
      if (r && r.ok && Array.isArray(r.mods)) { this.lista = r.mods; this.estado = 'ok'; } else { this.estado = 'erro'; this.erro = (r && r.erro) || 'Erro desconhecido.'; }
      if (UI.cur === 'modsgal' || document.querySelector('.modsgal')) this.abrir(true);
    });
  },
  cartao(f, m, oficial) {
    const inst = this.instalado(m.id);
    const vemDaqui = inst && (oficial ? inst.origem === 'oficial' || inst.origem === 'exemplo' : inst.origem === 'galeria:' + m.id);
    let bt;
    if (!inst) bt = `<button class="sbtn gold" ${f(() => this.ativar(m, oficial))}>▶ Ativar</button>`;
    else if (vemDaqui && !oficial && m.atualizado > (inst.data || 0)) bt = `<button class="sbtn gold" ${f(() => this.ativar(m, oficial))}>⟳ Atualizar</button>`;
    else if (!inst.ativo) bt = `<button class="sbtn gold" ${f(() => { inst.ativo = true; inst.erro = null; Mods.gravar(); Mods.reiniciar(`O mod "${inst.nome}" foi ligado.`); })}>▶ Ativar</button>`;
    else bt = `<button class="sbtn on" ${f(() => { inst.ativo = false; Mods.gravar(); Mods.reiniciar(`O mod "${inst.nome}" foi desligado.`); })}>✓ Ativo</button>`;
    const extra = oficial ? '<span style="color:#ffd070">⭐ Oficial</span>' : `<span class="dim">⬇ ${m.baixados || 0}</span>`;
    return `<div class="slot"><div><b>${esc(m.nome)}</b> ${m.versao ? `<span class="dim">v${esc(m.versao)}</span>` : ''} <span class="dim">por ${esc(m.autor || 'Anônimo')}</span> ${extra}<br>
      <span class="small">${esc(m.descricao || 'Sem descrição.')}</span></div>
      <div style="display:flex;flex-direction:column;gap:3px">${bt}
      <button class="sbtn small" ${f(() => this.verCodigo(m, oficial))}>Ver código</button>
      ${oficial ? '' : `<button class="sbtn small danger" ${f(() => this.denunciar(m))}>🚩 Denunciar</button>`}</div></div>`;
  },
  abrir(soAtualizar) {
    if (!soAtualizar && this.estado !== 'carregando') this.carregar();
    const f = UI.reg(), q = this.filtro.toLowerCase();
    const casa = m => !q || (m.nome + ' ' + (m.autor || '') + ' ' + (m.descricao || '')).toLowerCase().includes(q);
    const ofi = MODS_OFICIAIS.filter(casa).map(m => this.cartao(f, m, true)).join('');
    let com;
    if (this.estado === 'carregando') com = '<div class="dim" style="padding:8px">⏳ Conectando à galeria... Se o servidor estava dormindo, pode levar até 1 minuto.</div>';
    else if (this.estado === 'erro') com = `<div style="padding:8px;color:#ff9080">Não foi possível abrir a galeria da comunidade: ${esc(this.erro)}<br><span class="dim">Os mods oficiais acima funcionam mesmo sem internet.</span></div><button class="sbtn" ${f(() => this.abrir())}>🔄 Tentar de novo</button>`;
    else { const l = (this.lista || []).filter(casa); com = l.map(m => this.cartao(f, m, false)).join('') || `<div class="dim" style="padding:8px">${q ? 'Nenhum mod encontrado com essa busca.' : 'Ainda não há mods da comunidade. Seja o primeiro a publicar!'}</div>`; }
    const voltar = () => Mods.menu();
    const el = UI.show('modsgal', `<div class="panel modsgal"><div class="ptitle">🌍 Galeria de Mods</div>
      <div class="small dim">Toque em <b>Ativar</b> e o mod é instalado e ligado. Mods da comunidade são feitos por outros jogadores e não são conferidos pela equipe do jogo — se um mod for ruim ou perigoso, denuncie.</div>
      <div class="row" style="gap:6px;margin-top:6px"><input id="modgal-busca" value="${esc(this.filtro)}" placeholder="🔎 Procurar mod..." style="flex:1;min-width:0;font:inherit;padding:6px;background:#1a1420;color:#f2e6cc;border:1px solid #5a4a6a">
        <button class="sbtn" ${f(() => this.abrir())}>🔄</button><button class="sbtn" ${f(() => this.publicar())}>📤 Publicar</button></div>
      <div class="ptitle" style="font-size:18px;margin-top:6px">⭐ Oficiais</div><div class="slots">${ofi || '<div class="dim" style="padding:8px">Nenhum.</div>'}</div>
      <div class="ptitle" style="font-size:18px;margin-top:6px">🌍 Da comunidade${this.estado === 'ok' ? ` <span class="dim" style="font-size:14px">(${(this.lista || []).length})</span>` : ''}</div><div class="slots">${com}</div>
      <button class="mbtn" ${f(voltar)}>Voltar</button></div>`, { onBack: voltar });
    UI.bind(el, f);
    const b = el.querySelector('#modgal-busca');
    if (b) { b.addEventListener('change', () => { this.filtro = b.value; this.abrir(true); }); b.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') { this.filtro = b.value; this.abrir(true); } }); }
  },
  baixarCodigo(m, oficial) {
    if (oficial) return Promise.resolve({ ok: true, codigo: m.codigo() });
    Game.toast('Baixando o mod...', '#a0e0ff');
    return this.pedir('/mods/' + encodeURIComponent(m.id));
  },
  ativar(m, oficial) {
    const fazer = () => this.baixarCodigo(m, oficial).then(r => {
      if (!r || !r.ok) return Game.toast('Não consegui baixar: ' + ((r && r.erro) || 'erro'), '#ff8080');
      Mods.instalar(r.codigo, oficial ? 'oficial' : 'galeria:' + m.id);
      const i = this.instalado(m.id); if (i && !oficial) { i.data = Math.max(Date.now(), m.atualizado || 0); Mods.gravar(); }
    });
    if (oficial) return fazer();
    UI.dialog('🌍 Ativar mod da comunidade', null, `<b>${esc(m.nome)}</b> foi feito por <b>${esc(m.autor || 'Anônimo')}</b> e não foi conferido pela equipe do jogo.<br><br>Um mod pode mudar qualquer coisa dentro do jogo. Ative só se confiar em quem fez. Se der problema, desligue em 🧩 Mods (ou abra o jogo com <code>?semmods</code>).`, [
      { label: '▶ Ativar', cls: 'gold', fn: fazer },
      { label: 'Ver o código', fn: () => this.verCodigo(m, false) },
      { label: 'Cancelar', fn: () => this.abrir(true) }
    ]);
  },
  verCodigo(m, oficial) {
    this.baixarCodigo(m, oficial).then(r => {
      if (!r || !r.ok) return Game.toast('Não consegui baixar: ' + ((r && r.erro) || 'erro'), '#ff8080');
      UI.dialog('📄 ' + m.nome, null, `<pre style="white-space:pre-wrap;font-size:10px;max-height:52vh;overflow:auto;background:#140e18;padding:6px;text-align:left">${esc(r.codigo)}</pre>`, [
        { label: '▶ Ativar', cls: 'gold', fn: () => this.ativar(m, oficial) }, { label: 'Voltar', fn: () => this.abrir(true) }]);
    });
  },
  denunciar(m) {
    UI.dialog('🚩 Denunciar mod', null, `Denunciar <b>${esc(m.nome)}</b> por ser quebrado, ofensivo ou perigoso? Com 3 denúncias de jogadores diferentes o mod sai da galeria.`, [
      { label: '🚩 Denunciar', cls: 'danger', fn: () => this.pedir('/mods/' + encodeURIComponent(m.id) + '/denunciar', {}).then(r => { Game.toast(r && r.ok ? (r.removido ? 'Obrigado! O mod saiu da galeria.' : 'Obrigado! A denúncia foi registrada.') : 'Não consegui denunciar: ' + ((r && r.erro) || 'erro'), r && r.ok ? '#a0ffa0' : '#ff8080'); this.carregar(); this.abrir(true); }) },
      { label: 'Cancelar', fn: () => this.abrir(true) }
    ]);
  },
  // ---------- 📤 publicar ----------
  publicar() {
    Mods.ler();
    const f = UI.reg(), ch = this.chaves();
    const meus = Mods.lista.filter(m => m.origem !== 'oficial' && m.origem !== 'exemplo' && !String(m.origem || '').startsWith('galeria:'));
    const linhas = meus.map(m => `<div class="slot"><div><b>${esc(m.nome)}</b> <span class="dim">${esc(m.id)}</span>${ch[m.id] ? ' <span style="color:#80ff90">● publicado</span>' : ''}<br><span class="small">${esc(m.descricao || '')}</span></div>
      <div><button class="sbtn gold" ${f(() => this.enviar(m.codigo))}>${ch[m.id] ? '⟳ Atualizar' : '📤 Publicar'}</button></div></div>`).join('') || '<div class="dim" style="padding:8px">Você ainda não instalou nenhum mod próprio. Instale o seu em 🧩 Mods (arquivo ou código colado) ou cole o código aqui embaixo.</div>';
    const pub = Object.keys(ch).map(id => `<div class="slot"><div><b>${esc(ch[id].nome || id)}</b> <span class="dim">${esc(id)}</span></div>
      <div><button class="sbtn small danger" ${f(() => this.retirar(id))}>Retirar da galeria</button></div></div>`).join('');
    const voltar = () => this.abrir(true);
    const el = UI.show('modspub', `<div class="panel"><div class="ptitle">📤 Publicar meu mod</div>
      <div class="small">Mande o seu mod para a <b>🌍 Galeria</b>: todos os jogadores vão poder ativá-lo com um toque.<br>
      Regras: o mod precisa chamar <code>Eldoria.registrar({ id, nome, autor, descricao, ... })</code>, ter um <b>id</b> único e no máximo 120 KB. Nada de conteúdo ofensivo ou que estrague o jogo dos outros — mods denunciados saem da galeria.</div>
      <div class="ptitle" style="font-size:18px;margin-top:6px">Meus mods instalados</div><div class="slots">${linhas}</div>
      <div class="ptitle" style="font-size:18px;margin-top:6px">Ou cole o código</div>
      <textarea id="modpub-txt" placeholder="Eldoria.registrar({ id: 'meu_mod', nome: 'Meu Mod', autor: 'Você', ... })" style="width:100%;height:90px;font:12px monospace;background:#1a1420;color:#f2e6cc;border:1px solid #5a4a6a;box-sizing:border-box"></textarea>
      <div class="row" style="gap:6px;flex-wrap:wrap"><button class="sbtn gold" ${f(() => this.enviar(document.getElementById('modpub-txt').value))}>📤 Publicar o código colado</button>
        <label class="sbtn">📁 Publicar arquivo .js<input type="file" id="modpub-arq" accept=".js,.txt,text/javascript,text/plain" style="display:none"></label>
        <button class="sbtn" ${f(() => Mods.guia())}>📖 Como criar um mod</button></div>
      ${pub ? `<div class="ptitle" style="font-size:18px;margin-top:6px">Publicados por mim</div><div class="slots">${pub}</div>` : ''}
      <button class="mbtn" ${f(voltar)}>Voltar</button></div>`, { onBack: voltar });
    UI.bind(el, f);
    const t = el.querySelector('#modpub-txt'); if (t) t.addEventListener('keydown', e => e.stopPropagation());
    const inp = el.querySelector('#modpub-arq');
    if (inp) inp.addEventListener('change', () => { const a = inp.files && inp.files[0]; if (!a) return; const r = new FileReader(); r.onload = () => this.enviar(r.result); r.readAsText(a); });
  },
  enviar(codigo) {
    codigo = String(codigo || '').trim();
    if (!codigo) return Game.toast('Cole o código do mod primeiro.', '#ff8080');
    if (codigo.length > 120000) return Game.toast('O mod é grande demais para a galeria (máx. 120 KB).', '#ff8080');
    try { new Function('Eldoria', codigo); } catch (e) { return Game.toast('O código tem um erro: ' + e.message, '#ff8080'); }
    const mid = /\bid\s*:\s*['"`]([\w-]{2,40})['"`]/.exec(codigo), nome = /\bnome\s*:\s*['"`]([^'"`\n]{1,60})['"`]/.exec(codigo);
    if (!mid) return Game.toast("O mod precisa de um id: 'meu_mod' dentro de Eldoria.registrar({...}).", '#ff8080');
    const ch = this.chaves()[mid[1]];
    UI.dialog('📤 Publicar mod', null, `${ch ? 'Atualizar' : 'Publicar'} <b>${esc(nome ? nome[1] : mid[1])}</b> (id <code>${esc(mid[1])}</code>) na galeria? Todos os jogadores vão poder ver o código e ativar o mod.`, [
      { label: ch ? '⟳ Atualizar' : '📤 Publicar', cls: 'gold', fn: () => {
        Game.toast('Enviando... (o servidor pode levar até 1 minuto para acordar)', '#a0e0ff');
        this.pedir('/mods', { codigo, chave: ch ? ch.chave : undefined }).then(r => {
          if (!r || !r.ok) return UI.dialog('📤 Publicar mod', null, 'Não deu para publicar: ' + esc((r && r.erro) || 'erro desconhecido'), [{ label: 'Voltar', fn: () => this.publicar() }]);
          this.guardarChave(r.id, r.chave, r.nome);
          this.carregar();
          UI.dialog('📤 Publicar mod', null, `Pronto! <b>${esc(r.nome)}</b> foi ${r.atualizado ? 'atualizado' : 'publicado'} na 🌍 Galeria.<br><br><span class="dim">Este aparelho guardou a chave do mod: só daqui dá para atualizá-lo ou retirá-lo. Se for trocar de aparelho, use 💾 Copiar o progresso para levar a chave junto.</span>`, [{ label: 'Ver a galeria', cls: 'gold', fn: () => this.abrir(true) }, { label: 'Ok', fn: () => this.publicar() }]);
        });
      } },
      { label: 'Cancelar', fn: () => this.publicar() }
    ]);
  },
  retirar(id) {
    const ch = this.chaves()[id]; if (!ch) return;
    UI.dialog('Retirar da galeria', null, `Retirar <b>${esc(ch.nome || id)}</b> da galeria? Quem já ativou continua com o mod.`, [
      { label: 'Retirar', cls: 'danger', fn: () => this.pedir('/mods/' + encodeURIComponent(id) + '/retirar', { chave: ch.chave }).then(r => {
        if (r && (r.ok || /não encontrado/i.test(r.erro || ''))) { const c = this.chaves(); delete c[id]; try { localStorage.setItem(this.CHAVES, JSON.stringify(c)); } catch (e) { } Game.toast('Mod retirado da galeria.', '#a0ffa0'); this.carregar(); }
        else Game.toast('Não consegui retirar: ' + ((r && r.erro) || 'erro'), '#ff8080');
        this.publicar();
      }) },
      { label: 'Cancelar', fn: () => this.publicar() }
    ]);
  }
};
