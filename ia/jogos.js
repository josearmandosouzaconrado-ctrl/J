/* Aba Jogos: guarda os jogos criados pela IA, roda dentro do app e gera o APK (enviado ao GitHub do usuário). */
'use strict';
const Jogos = (() => {
  let lista = carregar('nexo_jogos', []);
  const salvarLista = () => { if (!guardar('nexo_jogos', lista)) aviso('Sem espaço para salvar: apague algum jogo'); };
  const slug = t => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'jogo';
  const achar = t => { const s = slug(t); return lista.find(j => j.id === t || slug(j.titulo) === s); };

  function salvar({ titulo, emoji, orientacao, html, config }) {
    titulo = String(titulo || 'Jogo').trim().slice(0, 60);
    let j = achar(titulo);
    if (j) {
      Object.assign(j, { html, versao: (j.versao || 1) + 1, atualizado: Date.now() });
      if (emoji) j.emoji = emoji;
      if (orientacao) j.orientacao = orientacao;
      if (config) j.config = config; else delete j.config;
      delete j.apk;
      lista = [j].concat(lista.filter(x => x !== j));
    } else {
      j = { id: Date.now().toString(36), titulo, emoji: emoji || '🎮', orientacao: orientacao || 'livre', html, versao: 1, criado: Date.now(), atualizado: Date.now() };
      if (config) j.config = config;
      lista.unshift(j);
    }
    salvarLista();
    desenhar();
    return j;
  }

  function jogarHtml(html) {
    abrirPainel('#telaJogo');
    $('#quadroJogo').srcdoc = html;
  }
  function jogar(id) {
    const j = lista.find(x => x.id === id);
    if (!j) return aviso('Jogo não encontrado');
    jogarHtml(j.html);
  }

  function desenhar() {
    const box = $('#listaJogos');
    if (!box) return;
    box.innerHTML = lista.length ? '' : '<p class="dica" style="text-align:center;padding:20px">Nenhum jogo ainda. Peça um no chat!</p>';
    for (const j of lista) {
      const el = document.createElement('div');
      el.className = 'jogo';
      el.innerHTML = `<div class="ic"></div><div class="i"><b></b><small></small>
        <div class="botoes"><button class="botao" data-a="jogar">▶ Jogar</button><button class="botao" data-a="apk">📦 APK</button>
        ${j.config ? '<button class="botao" data-a="editar">✏️ Editar</button>' : ''}<button class="botao" data-a="melhorar">✨ Melhorar</button><button class="botao" data-a="apagar">🗑</button></div>
        ${j.apk ? `<div class="botoes"><a class="botao forte" href="${esc(j.apk)}">⬇ Baixar APK v${esc(j.versaoApk || j.versao)}</a></div>` : ''}</div>`;
      el.querySelector('.ic').textContent = j.emoji || '🎮';
      el.querySelector('b').textContent = j.titulo;
      el.querySelector('small').textContent = `versão ${j.versao} · ${Math.max(1, Math.round(j.html.length / 1024))} KB · ${({ paisagem: 'deitado', retrato: 'em pé', livre: 'gira a tela' })[j.orientacao] || ''}`;
      el.querySelector('[data-a=jogar]').onclick = () => jogarHtml(j.html);
      el.querySelector('[data-a=apk]').onclick = e => gerarApk(j, e.target);
      el.querySelector('[data-a=melhorar]').onclick = async () => {
        const pedido = await pedirTexto(`O que mudar em "${j.titulo}"?`, 'Deixe mais bonito, com mais fases e efeitos');
        if (pedido) perguntarNoChat(`Melhore o jogo "${j.titulo}" (use ler_jogo e depois criar_jogo com o mesmo título): ${pedido}`);
      };
      if (j.config) el.querySelector('[data-a=editar]').onclick = () => abrirCriador(j.config);
      el.querySelector('[data-a=apagar]').onclick = async () => {
        if (!await confirmar(`Apagar o jogo "${j.titulo}"?`, 'Apagar')) return;
        lista = lista.filter(x => x !== j); salvarLista(); desenhar();
      };
      box.appendChild(el);
    }
  }

  // ícone do APK: emoji do jogo sobre um gradiente
  function icone(j) {
    return new Promise(res => {
      const c = document.createElement('canvas');
      c.width = c.height = 192;
      const g = c.getContext('2d');
      const gr = g.createLinearGradient(0, 0, 192, 192);
      gr.addColorStop(0, '#6d28d9'); gr.addColorStop(1, '#0891b2');
      g.fillStyle = gr;
      g.beginPath(); g.roundRect ? g.roundRect(0, 0, 192, 192, 42) : g.rect(0, 0, 192, 192); g.fill();
      g.font = '112px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(j.emoji || '🎮', 96, 104);
      c.toBlob(b => b.arrayBuffer().then(a => res(new Uint8Array(a))), 'image/png');
    });
  }

  let gerando = false;
  async function gerarApk(j, botao) {
    if (gerando) return;
    if (!(cfg.github || '').trim()) {
      await avisar('Para baixar o APK, configure o Plugin do GitHub em ⚙ (token).\n\nO app monta o APK aqui no celular, envia para um repositório seu e abre o link de download.');
      return abrirConfig();
    }
    gerando = true;
    const txt = botao.textContent;
    botao.textContent = '⏳ Montando…';
    try {
      const login = await usuarioGithub();
      const nomeRepo = cfg.repoJogos || 'nexo-jogos';
      const repo = login + '/' + nomeRepo;
      let info;
      try { info = await gh('/repos/' + repo); }
      catch (e) {
        if (e.status !== 404) throw e;
        if (!await confirmar(`Vou criar o repositório "${nomeRepo}" (${cfg.repoPrivado ? 'privado' : 'público'}) no seu GitHub para guardar os APKs. Continuar?`)) throw new Error('cancelado');
        await gh('/user/repos', { method: 'POST', body: JSON.stringify({ name: nomeRepo, description: 'Jogos criados com o Nexo IA', private: !!cfg.repoPrivado, auto_init: true }) });
        await new Promise(r => setTimeout(r, 2000));
        info = await gh('/repos/' + repo);
      }
      const branch = info.default_branch || 'main';
      let nome = slug(j.titulo).replace(/-/g, '');
      if (!/^[a-z]/.test(nome)) nome = 'j' + nome;
      botao.textContent = '⏳ Assinando…';
      const apk = await NexoAPK.construir({ nome: j.titulo, pacote: 'com.nexo.jogo.' + nome.slice(0, 40), versionCode: j.versao, versionName: '1.' + j.versao,
        html: j.html, icone: await icone(j), orientacao: j.orientacao });
      botao.textContent = '⏳ Enviando…';
      const arq = slug(j.titulo);
      await ghSalvar(repo, `apks/${arq}.apk`, apk, `APK de ${j.titulo} v${j.versao} (Nexo IA)`, branch);
      await ghSalvar(repo, `jogos/${arq}/index.html`, new TextEncoder().encode(j.html), `${j.titulo} v${j.versao} (Nexo IA)`, branch);
      j.apk = `https://github.com/${repo}/raw/${branch}/apks/${arq}.apk`;
      j.versaoApk = j.versao;
      salvarLista();
      desenhar();
      aviso('APK pronto! Toque em "Baixar APK"');
    } catch (e) {
      if (e.message !== 'cancelado') avisar('Não consegui gerar o APK: ' + e.message + (e.status === 403 || e.status === 404 ? '\n\nConfira se o token do GitHub tem permissão de "Contents" (escrita) e "Administration" para criar o repositório.' : ''));
      botao.textContent = txt;
    } finally { gerando = false; }
  }

  // ---------- teste automático: roda o jogo escondido e devolve os erros de JavaScript ----------
  function testar(html, ms = 3000) {
    return new Promise(res => {
      const f = document.createElement('iframe');
      f.setAttribute('sandbox', 'allow-scripts');
      f.style.cssText = 'position:fixed;left:-9999px;top:0;width:360px;height:640px;opacity:0;pointer-events:none';
      const erros = new Set();
      const ouvir = e => { if (e.source === f.contentWindow && e.data && e.data.nexoErro) erros.add(String(e.data.nexoErro).slice(0, 300)); };
      addEventListener('message', ouvir);
      const espiao = '<script>(function(){var P=function(m){parent.postMessage({nexoErro:String(m)},"*")};' +
        'window.onerror=function(m,s,l){P(m+(l?" (linha "+l+")":""))};' +
        'addEventListener("unhandledrejection",function(e){P("Promise: "+(e.reason&&e.reason.message||e.reason))});' +
        'var ce=console.error;console.error=function(){P("console.error: "+[].map.call(arguments,String).join(" "));ce.apply(console,arguments)};' +
        // aperta teclas e toca na tela para o jogo sair do menu e rodar um pouco
        'function K(t,c){var ev=new KeyboardEvent(t,{code:c,key:c=="Space"?" ":c,bubbles:true});document.dispatchEvent(ev);window.dispatchEvent(ev)}' +
        'function T(t){var c=document.querySelector("canvas")||document.body;try{c.dispatchEvent(new PointerEvent(t,{bubbles:true,clientX:60,clientY:60}));c.dispatchEvent(new MouseEvent(t=="pointerdown"?"mousedown":"mouseup",{bubbles:true,clientX:60,clientY:60}))}catch(e){}}' +
        'setTimeout(function(){K("keydown","Space");T("pointerdown");setTimeout(function(){K("keyup","Space");T("pointerup");K("keydown","ArrowRight")},120);setTimeout(function(){K("keyup","ArrowRight");K("keydown","Space")},900);setTimeout(function(){K("keyup","Space")},1000)},500)' +
        '})()<' + '/script>';
      f.srcdoc = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, m => m + espiao) : espiao + html;
      document.body.appendChild(f);
      setTimeout(() => { removeEventListener('message', ouvir); f.remove(); res([...erros].slice(0, 6)); }, ms);
    });
  }

  // ---------- criar jogo na hora (modelos prontos, sem IA) ----------
  function criarDeModelo(config) {
    const r = Modelos.gerar(config);
    return salvar({ titulo: r.config.titulo, emoji: r.config.emoji, orientacao: r.orientacao, html: r.html, config: r.config });
  }
  function abrirCriador(c) {
    c = c || {};
    const box = $('#criadorJogo');
    box.style.display = '';
    $('#cjTipo').value = c.tipo || 'plataforma';
    $('#cjTema').value = c.tema || Modelos.TIPOS[$('#cjTipo').value].tema;
    $('#cjTitulo').value = c.titulo || '';
    $('#cjHeroi').value = c.heroi || '';
    $('#cjInimigo').value = c.inimigo || '';
    $('#cjItem').value = c.item || '';
    $('#cjDif').value = c.dificuldade || 2;
    irPara('vJogos');
    box.scrollIntoView({ behavior: 'smooth' });
  }
  (function montarCriador() {
    const tipo = $('#cjTipo'), tema = $('#cjTema');
    for (const k in Modelos.TIPOS) tipo.insertAdjacentHTML('beforeend', `<option value="${k}">${Modelos.TIPOS[k].emoji} ${Modelos.TIPOS[k].nome}</option>`);
    for (const k in Modelos.TEMAS) tema.insertAdjacentHTML('beforeend', `<option value="${k}">${Modelos.TEMAS[k].nome}</option>`);
    tipo.onchange = () => { tema.value = Modelos.TIPOS[tipo.value].tema; };
    $('#cjAbrir').onclick = () => { const b = $('#criadorJogo'); b.style.display = b.style.display === 'none' ? '' : 'none'; };
    $('#cjCriar').onclick = () => {
      const j = criarDeModelo({ tipo: tipo.value, tema: tema.value, titulo: $('#cjTitulo').value, heroi: $('#cjHeroi').value,
        inimigo: $('#cjInimigo').value, item: $('#cjItem').value, dificuldade: +$('#cjDif').value });
      $('#criadorJogo').style.display = 'none';
      aviso('Jogo criado: ' + j.titulo);
      jogarHtml(j.html);
    };
  })();

  return { salvar, achar, todos: () => lista, jogar, jogarHtml, desenhar, slug, testar, criarDeModelo, abrirCriador };
})();
