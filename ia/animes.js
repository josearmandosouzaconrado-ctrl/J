/* Aba Animes: temporada, rankings, busca, detalhes, todos os episódios (com marcação do que já viu),
 * aberturas, onde assistir oficialmente e atalhos para a IA. Dados do MyAnimeList (API Jikan). */
'use strict';
const Animes = (() => {
  let iniciado = false, tipo = 'anime', listaAtual = 'temporada', pedido = 0;
  const favs = carregar('nexo_favs', {});      // "anime:123" -> resumo
  const vistos = carregar('nexo_vistos', {});  // "123" -> [números de episódios]
  const cache = new Map();
  const salvarFavs = () => guardar('nexo_favs', favs);
  const salvarVistos = () => guardar('nexo_vistos', vistos);

  // a Jikan aceita ~3 pedidos por segundo: fila simples com nova tentativa no 429
  let ultimo = 0;
  async function jikan(caminho) {
    if (cache.has(caminho)) return cache.get(caminho);
    for (let t = 0; t < 4; t++) {
      const espera = Math.max(0, ultimo + 400 - Date.now());
      ultimo = Date.now() + espera;
      if (espera) await new Promise(r => setTimeout(r, espera));
      try {
        const d = await json('https://api.jikan.moe/v4' + caminho, {}, 20000);
        cache.set(caminho, d);
        return d;
      } catch (e) {
        if (e.status !== 429 && e.status < 500) throw e;
        await new Promise(r => setTimeout(r, 1200 * (t + 1)));
      }
    }
    throw new Error('MyAnimeList ocupado, tente de novo');
  }

  const titulo = a => a.title_english || a.title;
  const imagem = a => { const i = a.images && (a.images.webp || a.images.jpg); return i && (i.large_image_url || i.image_url) || ''; };
  const yt = q => 'https://www.youtube.com/results?search_query=' + enc(q);
  const resumo = (a, t) => ({ id: a.mal_id, tipo: t, titulo: titulo(a), img: imagem(a), nota: a.score, episodios: a.episodes });

  function grade(itens, t) {
    const g = $('#gradeAnimes');
    g.innerHTML = '';
    if (!itens.length) { g.innerHTML = '<div class="carregando">Nada encontrado.</div>'; return; }
    for (const a of itens) {
      const b = document.createElement('button');
      b.className = 'poster';
      b.innerHTML = `<div class="capa" style="background-image:url('${esc(a.img)}')">${a.nota ? `<span>★ ${esc(a.nota)}</span>` : ''}</div><div class="t"></div>`;
      b.querySelector('.t').textContent = a.titulo;
      b.onclick = () => detalhe(a.id, a.tipo || t);
      g.appendChild(b);
    }
  }
  const carregando = () => { $('#gradeAnimes').innerHTML = '<div class="carregando">Carregando…</div>'; };
  const erro = e => { $('#gradeAnimes').innerHTML = `<div class="carregando">Não consegui carregar: ${esc(e.message)}<br><br><button class="botao" onclick="Animes.recarregar()">Tentar de novo</button></div>`; };

  async function carregarLista(l) {
    listaAtual = l;
    document.querySelectorAll('#chipsAnime button').forEach(b => b.classList.toggle('ativo', b.dataset.l === l));
    if (l === 'favoritos') {
      return grade(Object.values(favs).filter(f => f.tipo === tipo).reverse(), tipo);
    }
    const n = ++pedido;
    carregando();
    const caminho = tipo === 'manga'
      ? { temporada: '/top/manga?filter=publishing', top_em_exibicao: '/top/manga?filter=bypopularity', top_geral: '/top/manga', proximos: '/top/manga?filter=upcoming' }[l]
      : { temporada: '/seasons/now?limit=25', top_em_exibicao: '/top/anime?filter=airing', top_geral: '/top/anime', proximos: '/seasons/upcoming?limit=25' }[l];
    try {
      const d = await jikan(caminho);
      if (n !== pedido) return;
      const vistosIds = new Set();
      let itens = (d.data || []).filter(a => !vistosIds.has(a.mal_id) && vistosIds.add(a.mal_id));
      if (l === 'temporada' && tipo === 'anime') itens.sort((a, b) => (b.members || 0) - (a.members || 0));
      grade(itens.map(a => resumo(a, tipo)), tipo);
    } catch (e) { if (n === pedido) erro(e); }
  }

  async function buscar(q) {
    q = q.trim();
    if (!q) return carregarLista(listaAtual === 'favoritos' ? 'temporada' : listaAtual);
    document.querySelectorAll('#chipsAnime button').forEach(b => b.classList.remove('ativo'));
    const n = ++pedido;
    carregando();
    try {
      const d = await jikan(`/${tipo}?q=${enc(q)}&limit=24&order_by=members&sort=desc`);
      if (n === pedido) grade((d.data || []).map(a => resumo(a, tipo)), tipo);
    } catch (e) { if (n === pedido) erro(e); }
  }

  // ---------------- detalhes ----------------
  async function detalhe(id, t) {
    t = t || 'anime';
    $('#detTitulo').textContent = 'Carregando…';
    $('#detCorpo').innerHTML = '<div class="carregando">Carregando…</div>';
    abrirPainel('#detalheAnime');
    $('#detCorpo').scrollTop = 0;
    let a;
    try { a = (await jikan(`/${t}/${id}/full`)).data; }
    catch (e) { $('#detCorpo').innerHTML = `<div class="carregando">Erro: ${esc(e.message)}</div>`; return; }
    const nome = titulo(a);
    $('#detTitulo').textContent = nome;
    const chave = t + ':' + id;
    const c = $('#detCorpo');
    const linhas = t === 'anime' ? [
      a.score && `<b>★ ${a.score}</b> · #${a.rank || '?'} no ranking`,
      `${a.type || ''} · ${a.episodes ? a.episodes + ' episódios' : 'episódios: ?'}${a.duration ? ' · ' + a.duration.replace(' per ep', '/ep') : ''}`,
      a.status && traduzStatus(a.status),
      (a.season || a.year) && `Temporada: ${traduzEstacao(a.season)} ${a.year || ''}`,
      a.broadcast && a.broadcast.string && `Passa: ${a.broadcast.string}`,
      (a.studios || []).length && 'Estúdio: ' + a.studios.map(s => s.name).join(', '),
      a.rating && 'Classificação: ' + a.rating,
    ] : [
      a.score && `<b>★ ${a.score}</b> · #${a.rank || '?'} no ranking`,
      `${a.type || ''} · ${a.chapters ? a.chapters + ' capítulos' : 'capítulos: em andamento'}${a.volumes ? ' · ' + a.volumes + ' volumes' : ''}`,
      a.status && traduzStatus(a.status),
      a.published && a.published.string && 'Publicação: ' + a.published.string,
      (a.authors || []).length && 'Autor: ' + a.authors.map(s => s.name).join(', '),
    ];
    c.innerHTML = `
      <div class="detTopo"><img src="${esc(imagem(a))}" alt=""><div class="meta">
        ${a.title !== nome ? `<small>${esc(a.title)}</small>` : ''}${a.title_japanese ? `<small>${esc(a.title_japanese)}</small>` : ''}
        ${linhas.filter(Boolean).map(l => `<span>${l}</span>`).join('')}</div></div>
      <div class="etiquetas">${(a.genres || []).concat(a.themes || [], a.demographics || []).map(g => `<span>${esc(g.name)}</span>`).join('')}</div>
      <div class="botoes" id="detBotoes"></div>
      <h3>Onde ${t === 'anime' ? 'assistir' : 'ler'} oficialmente</h3><div class="botoes" id="detOnde"></div>
      <h3>Sinopse</h3><div class="sinopse">${esc(a.synopsis || 'Sem sinopse.')}</div>
      <div class="botoes"><button class="botao" id="detTraduzir">🇧🇷 Explicar em português com a IA</button></div>
      <div id="detTemas"></div>
      <div id="detRelacoes"></div>
      ${t === 'anime' ? '<h3>Episódios</h3><div id="detProgresso"></div><div id="detEps"><div class="carregando">Carregando episódios…</div></div>' : ''}`;

    // botões principais
    const bt = $('#detBotoes');
    const botao = (rot, fn, href) => {
      const el = document.createElement(href ? 'a' : 'button');
      el.className = 'botao'; el.textContent = rot;
      if (href) el.href = href; else el.onclick = fn;
      bt.appendChild(el); return el;
    };
    const bFav = botao(favs[chave] ? '💜 Na minha lista' : '🤍 Minha lista', () => {
      if (favs[chave]) delete favs[chave]; else favs[chave] = resumo(a, t);
      salvarFavs();
      bFav.textContent = favs[chave] ? '💜 Na minha lista' : '🤍 Minha lista';
    });
    if (t === 'anime') botao('▶ Trailer', null, a.trailer && a.trailer.url || yt(nome + ' trailer'));
    botao('🤖 Perguntar à IA', () => perguntarNoChat(`Me conta tudo sobre ${t === 'anime' ? 'o anime' : 'o mangá'} "${nome}": vale a pena, do que se trata (sem spoilers), ordem para ${t === 'anime' ? 'assistir' : 'ler'}, novidades e próxima temporada.`));
    botao('📰 Novidades', () => perguntarNoChat(`Quais as últimas novidades de "${nome}"? Pesquise notícias recentes.`));
    $('#detTraduzir').onclick = () => perguntarNoChat(`Explique em português a sinopse ${t === 'anime' ? 'do anime' : 'do mangá'} "${nome}" (sem spoilers) e diga para quem ele é recomendado.`);

    // onde assistir / ler
    const onde = $('#detOnde');
    const links = (a.streaming || []).concat(t === 'manga' ? (a.external || []) : []);
    for (const s of links) {
      const el = document.createElement('a');
      el.className = 'botao'; el.href = linkSeguro(s.url); el.textContent = '📺 ' + s.name;
      onde.appendChild(el);
    }
    if (t === 'anime' && !links.some(l => /crunchyroll/i.test(l.name))) {
      const cr = document.createElement('a');
      cr.className = 'botao'; cr.href = 'https://www.crunchyroll.com/pt-br/search?q=' + enc(a.title); cr.textContent = '🔎 Crunchyroll';
      onde.appendChild(cr);
    }
    if (t === 'anime') {
      const ytb = document.createElement('a');
      ytb.className = 'botao'; ytb.href = yt(a.title + ' episódio 1'); ytb.textContent = '🔎 YouTube';
      onde.appendChild(ytb);
    }
    const perg = document.createElement('button');
    perg.className = 'botao'; perg.textContent = '🤖 Onde no Brasil?';
    perg.onclick = () => perguntarNoChat(`Onde ${t === 'anime' ? 'assistir' : 'ler'} "${nome}" de forma oficial no Brasil (streaming, dublado/legendado, grátis ou pago)? Pesquise.`);
    onde.appendChild(perg);

    // aberturas e encerramentos
    const temas = a.theme || {};
    if ((temas.openings || []).length || (temas.endings || []).length) {
      const box = $('#detTemas');
      box.innerHTML = '<h3>Aberturas e encerramentos</h3>';
      const lst = document.createElement('div');
      for (const [rot, arr] of [['OP', temas.openings || []], ['ED', temas.endings || []]]) for (const m of arr) {
        const nomeMusica = m.replace(/^\d+:\s*/, '').replace(/\s*\(eps?.*\)$/i, '');
        const el = document.createElement('a');
        el.className = 'episodio'; el.href = yt(nomeMusica + ' ' + a.title);
        el.innerHTML = `<span class="n">${rot}</span><span class="i"></span><span>▶</span>`;
        el.querySelector('.i').textContent = nomeMusica;
        el.style.color = 'inherit'; el.style.textDecoration = 'none';
        lst.appendChild(el);
      }
      box.appendChild(lst);
    }

    // continuações / prelúdios
    const rel = (a.relations || []).filter(r => /Sequel|Prequel|Side story|Parent story|Spin-off|Alternative/i.test(r.relation));
    if (rel.length) {
      const box = $('#detRelacoes');
      box.innerHTML = '<h3>Relacionados</h3><div class="chips" style="padding:0;flex-wrap:wrap"></div>';
      for (const r of rel) for (const e of r.entry) {
        const b = document.createElement('button');
        b.textContent = `${traduzRelacao(r.relation)}: ${e.name}`;
        b.onclick = () => detalhe(e.mal_id, e.type === 'manga' ? 'manga' : 'anime');
        box.querySelector('.chips').appendChild(b);
      }
    }

    if (t === 'anime') episodios(a, 1, true);
  }

  async function episodios(a, pagina, limpar) {
    const box = $('#detEps');
    if (!box) return;
    let d;
    try { d = await jikan(`/anime/${a.mal_id}/episodes?page=${pagina}`); }
    catch (e) { box.innerHTML = `<div class="carregando">Não consegui carregar os episódios: ${esc(e.message)}</div>`; return; }
    if (!$('#detEps') || $('#detTitulo').textContent !== titulo(a)) return;   // o usuário já abriu outro
    if (limpar) box.innerHTML = '';
    const lista = d.data || [];
    const total = a.episodes || (d.pagination && d.pagination.last_visible_page > 1 ? null : lista.length) || lista.length;
    const id = String(a.mal_id);
    const progresso = () => {
      const n = (vistos[id] || []).length;
      $('#detProgresso').innerHTML = `<div class="dica">Você viu ${n} de ${total || '?'} episódios</div><div class="progresso"><i style="width:${total ? Math.min(100, n / total * 100) : 0}%"></i></div>`;
    };
    progresso();
    if (!lista.length && limpar) {
      // anime sem lista de episódios no MAL: monta pelos números
      const n = a.episodes || 0;
      if (!n) { box.innerHTML = '<div class="dica">Lista de episódios ainda não disponível.</div>'; return; }
      for (let i = 1; i <= n; i++) box.appendChild(linhaEp(a, { mal_id: i }, progresso));
      return;
    }
    for (const ep of lista) box.appendChild(linhaEp(a, ep, progresso));
    if (d.pagination && d.pagination.has_next_page) {
      const mais = document.createElement('button');
      mais.className = 'botao largo'; mais.textContent = 'Carregar mais episódios';
      mais.onclick = () => { mais.remove(); episodios(a, pagina + 1, false); };
      box.appendChild(mais);
    }
  }

  function linhaEp(a, ep, progresso) {
    const id = String(a.mal_id), n = ep.mal_id;
    const el = document.createElement('div');
    const visto = () => (vistos[id] || []).includes(n);
    el.className = 'episodio' + (visto() ? ' visto' : '');
    const data = ep.aired ? new Date(ep.aired).toLocaleDateString('pt-BR') : '';
    el.innerHTML = `<span class="n">${n}</span><span class="i"><span class="tt"></span>${ep.filler ? '<span class="tag">filler</span>' : ''}${ep.recap ? '<span class="tag">recap</span>' : ''}
      <small>${esc([data, ep.score ? '★ ' + ep.score : ''].filter(Boolean).join(' · '))}</small></span>
      <button data-v title="Marcar como visto">${visto() ? '✔' : '○'}</button><a href="${esc(yt(a.title + ' episódio ' + n))}" title="Procurar no YouTube">▶</a>`;
    el.querySelector('.tt').textContent = ep.title || ('Episódio ' + n);
    el.querySelector('[data-v]').onclick = e => {
      const l = new Set(vistos[id] || []);
      if (l.has(n)) l.delete(n); else l.add(n);
      vistos[id] = [...l].sort((x, y) => x - y);
      salvarVistos();
      el.classList.toggle('visto', l.has(n));
      e.target.textContent = l.has(n) ? '✔' : '○';
      progresso();
    };
    return el;
  }

  function traduzStatus(s) {
    return { 'Finished Airing': 'Finalizado', 'Currently Airing': '🟢 Em exibição', 'Not yet aired': 'Ainda não estreou', Finished: 'Finalizado',
      Publishing: '🟢 Em publicação', 'On Hiatus': 'Em hiato', Discontinued: 'Cancelado', 'Not yet published': 'Ainda não publicado' }[s] || s;
  }
  const traduzEstacao = s => ({ winter: 'Inverno', spring: 'Primavera', summer: 'Verão', fall: 'Outono' }[s] || s || '');
  const traduzRelacao = r => ({ Sequel: 'Continuação', Prequel: 'Anterior', 'Side story': 'História paralela', 'Parent story': 'História principal',
    'Spin-off': 'Spin-off', 'Alternative version': 'Versão alternativa', 'Alternative setting': 'Outro cenário' }[r] || r);

  // ---------------- eventos ----------------
  document.querySelectorAll('#chipsAnime button').forEach(b => b.onclick = () => { $('#buscaAnime').value = ''; carregarLista(b.dataset.l); });
  $('#buscaAnime').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); buscar(e.target.value); } });
  $('#buscaAnime').addEventListener('search', e => buscar(e.target.value));
  $('#tipoAnime').onchange = e => { tipo = e.target.value; $('#buscaAnime').value ? buscar($('#buscaAnime').value) : carregarLista(listaAtual); };

  return {
    abrir() { if (!iniciado) { iniciado = true; carregarLista('temporada'); } },
    recarregar() { cache.clear(); $('#buscaAnime').value ? buscar($('#buscaAnime').value) : carregarLista(listaAtual); },
    detalhe,
  };
})();
