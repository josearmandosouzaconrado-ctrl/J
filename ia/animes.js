/* Aba Animes: muitos animes e mangás (AniList, com o MyAnimeList como reserva), detalhes, todos os episódios,
 * links OFICIAIS de onde assistir/ler, próximos episódios, parecidos e a sua lista. */
'use strict';
const Animes = (() => {
  let iniciado = false, tipo = 'anime', lista = 'temporada', genero = '', busca = '', pagina = 1, temMais = false, pedido = 0;
  const favs = carregar('nexo_favs', {});
  const vistos = carregar('nexo_vistos', {});
  const salvarFavs = () => guardar('nexo_favs', favs);
  const salvarVistos = () => guardar('nexo_vistos', vistos);
  const cache = new Map();

  // ---------------- fontes ----------------
  async function anilist(query, variables) {
    const chave = query.length + JSON.stringify(variables);
    if (cache.has(chave)) return cache.get(chave);
    const d = await json('https://graphql.anilist.co', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query, variables }) }, 15000);
    if (d.errors && d.errors.length) throw new Error('AniList: ' + d.errors[0].message);
    cache.set(chave, d.data);
    return d.data;
  }
  async function jikan(caminho) {
    if (cache.has(caminho)) return cache.get(caminho);
    const d = await json('https://api.jikan.moe/v4' + caminho, {}, 12000);
    cache.set(caminho, d);
    return d;
  }
  const CARTAO = 'id idMal type format status episodes chapters averageScore title{romaji english} coverImage{large color} nextAiringEpisode{episode airingAt}';
  const Q_LISTA = `query($page:Int,$type:MediaType,$sort:[MediaSort],$season:MediaSeason,$year:Int,$status:MediaStatus,$genre:String,$search:String){
    Page(page:$page,perPage:30){pageInfo{hasNextPage} media(type:$type,sort:$sort,season:$season,seasonYear:$year,status:$status,genre:$genre,search:$search,isAdult:false){${CARTAO}}}}`;
  const Q_DETALHE = `query($id:Int,$idMal:Int,$type:MediaType){Media(id:$id,idMal:$idMal,type:$type){
    id idMal type format status episodes chapters volumes duration source season seasonYear averageScore popularity
    title{romaji english native} description(asHtml:false) coverImage{extraLarge large color} bannerImage genres
    tags{name rank isMediaSpoiler} studios(isMain:true){nodes{name}} startDate{year month day}
    trailer{id site} nextAiringEpisode{episode airingAt timeUntilAiring}
    externalLinks{site url type language} streamingEpisodes{title thumbnail url site}
    relations{edges{relationType node{id type format title{romaji english}}}}
    recommendations(perPage:12,sort:RATING_DESC){nodes{mediaRecommendation{${CARTAO}}}}}}`;

  const estacaoAtual = () => {
    const d = new Date(), m = d.getMonth();
    return { season: ['WINTER', 'WINTER', 'WINTER', 'SPRING', 'SPRING', 'SPRING', 'SUMMER', 'SUMMER', 'SUMMER', 'FALL', 'FALL', 'FALL'][m], year: d.getFullYear() };
  };
  const tituloDe = m => (m.title && (m.title.english || m.title.romaji)) || m.titulo || '?';
  const cartaoAL = m => ({ fonte: 'al', id: m.id, idMal: m.idMal, tipo: (m.type || tipo).toLowerCase(), titulo: tituloDe(m), img: m.coverImage && m.coverImage.large,
    nota: m.averageScore ? (m.averageScore / 10).toFixed(1) : null, novo: m.nextAiringEpisode ? 'EP ' + m.nextAiringEpisode.episode + ' ' + quando(m.nextAiringEpisode.airingAt) : null });
  const cartaoMal = (a, t) => { const i = a.images && (a.images.webp || a.images.jpg); return { fonte: 'mal', idMal: a.mal_id, tipo: t, titulo: a.title_english || a.title, img: i && (i.large_image_url || i.image_url), nota: a.score }; };
  function quando(seg) {
    const dias = Math.round((seg * 1000 - Date.now()) / 86400000);
    return dias <= 0 ? 'hoje' : dias === 1 ? 'amanhã' : 'em ' + dias + 'd';
  }

  // ---------------- grade ----------------
  function desenharGrade(itens, somar) {
    const g = $('#gradeAnimes');
    if (!somar) g.innerHTML = '';
    g.querySelectorAll('.maisAnimes,.carregando').forEach(x => x.remove());
    if (!itens.length && !somar) { g.innerHTML = '<div class="carregando">Nada encontrado.</div>'; return; }
    for (const a of itens) {
      const b = document.createElement('button');
      b.className = 'poster';
      b.innerHTML = `<div class="capa" style="background-image:url('${esc(a.img || '')}')">${a.nota ? `<span>★ ${esc(a.nota)}</span>` : ''}${a.novo ? `<em>${esc(a.novo)}</em>` : ''}</div><div class="t"></div>`;
      b.querySelector('.t').textContent = a.titulo;
      b.onclick = () => detalhe(a);
      g.appendChild(b);
    }
    if (temMais) {
      const m = document.createElement('button');
      m.className = 'botao largo maisAnimes'; m.textContent = 'Carregar mais';
      m.onclick = () => { pagina++; carregar_(true); };
      g.appendChild(m);
    }
  }
  const mostrarCarregando = somar => {
    if (somar) { const g = $('#gradeAnimes'); g.querySelectorAll('.maisAnimes').forEach(x => { x.disabled = true; x.textContent = 'Carregando…'; }); }
    else $('#gradeAnimes').innerHTML = '<div class="carregando">Carregando…</div>';
  };
  const mostrarErro = e => {
    $('#gradeAnimes').innerHTML = `<div class="carregando">Não consegui carregar.<br><small>${esc(e.message || String(e))}</small><br><br><button class="botao" id="tentarAnimes">Tentar de novo</button></div>`;
    $('#tentarAnimes').onclick = () => { cache.clear(); carregar_(false); };
  };

  async function carregar_(somar) {
    if (!somar) pagina = 1;
    document.querySelectorAll('#chipsAnime button').forEach(b => b.classList.toggle('ativo', !busca && b.dataset.l === lista));
    if (lista === 'favoritos' && !busca) {
      temMais = false;
      return desenharGrade(Object.values(favs).filter(f => (f.tipo || 'anime') === tipo && (!genero || (f.generos || []).includes(genero))).reverse(), false);
    }
    const n = ++pedido;
    mostrarCarregando(somar);
    const T = tipo.toUpperCase();
    const v = { page: pagina, type: T, genre: genero || undefined };
    if (busca) Object.assign(v, { search: busca, sort: ['SEARCH_MATCH'] });
    else if (lista === 'temporada') {
      if (tipo === 'anime') Object.assign(v, estacaoAtual(), { sort: ['POPULARITY_DESC'] });
      else Object.assign(v, { sort: ['TRENDING_DESC'] });
    }
    else if (lista === 'alta') v.sort = ['TRENDING_DESC'];
    else if (lista === 'exibicao') Object.assign(v, { status: 'RELEASING', sort: ['POPULARITY_DESC'] });
    else if (lista === 'top') v.sort = ['SCORE_DESC'];
    else if (lista === 'breve') Object.assign(v, { status: 'NOT_YET_RELEASED', sort: ['POPULARITY_DESC'] });
    try {
      const d = await anilist(Q_LISTA, v);
      if (n !== pedido) return;
      temMais = d.Page.pageInfo.hasNextPage;
      desenharGrade(d.Page.media.map(cartaoAL), somar);
    } catch (e) {
      // reserva: MyAnimeList (Jikan)
      try {
        let caminho;
        if (busca) caminho = `/${tipo}?q=${enc(busca)}&limit=24&order_by=members&sort=desc&page=${pagina}`;
        else if (tipo === 'anime') caminho = { temporada: '/seasons/now', alta: '/top/anime?filter=bypopularity', exibicao: '/top/anime?filter=airing', top: '/top/anime', breve: '/seasons/upcoming' }[lista] + (lista === 'temporada' || lista === 'breve' ? '?' : '&') + 'page=' + pagina;
        else caminho = { temporada: '/top/manga?filter=bypopularity', alta: '/top/manga?filter=bypopularity', exibicao: '/top/manga?filter=publishing', top: '/top/manga', breve: '/top/manga?filter=upcoming' }[lista] + '&page=' + pagina;
        const d = await jikan(caminho);
        if (n !== pedido) return;
        temMais = !!(d.pagination && d.pagination.has_next_page);
        const vistosIds = new Set();
        desenharGrade((d.data || []).filter(a => !vistosIds.has(a.mal_id) && vistosIds.add(a.mal_id)).map(a => cartaoMal(a, tipo)), somar);
      } catch (e2) { if (n === pedido) mostrarErro(new Error(e.message + ' | MyAnimeList: ' + e2.message)); }
    }
  }

  // ---------------- detalhes ----------------
  async function detalhe(a) {
    $('#detTitulo').textContent = a.titulo || 'Carregando…';
    $('#detCorpo').innerHTML = '<div class="carregando">Carregando…</div>';
    $('#detCorpo').scrollTop = 0;
    abrirPainel('#detalheAnime');
    let m;
    try {
      const v = a.id && a.fonte !== 'mal' ? { id: a.id } : { idMal: a.idMal, type: (a.tipo || 'anime').toUpperCase() };
      m = (await anilist(Q_DETALHE, v)).Media;
    } catch (e) {
      if (a.idMal) return detalheMal(a);
      $('#detCorpo').innerHTML = `<div class="carregando">Erro: ${esc(e.message)}</div>`; return;
    }
    const t = m.type === 'MANGA' ? 'manga' : 'anime';
    const nome = tituloDe(m);
    $('#detTitulo').textContent = nome;
    const chave = 'al:' + t + ':' + m.id;
    const statusPt = { FINISHED: 'Finalizado', RELEASING: t === 'anime' ? '🟢 Em exibição' : '🟢 Em publicação', NOT_YET_RELEASED: 'Ainda não lançado', CANCELLED: 'Cancelado', HIATUS: 'Em hiato' }[m.status] || m.status;
    const estPt = { WINTER: 'Inverno', SPRING: 'Primavera', SUMMER: 'Verão', FALL: 'Outono' }[m.season] || '';
    const prox = m.nextAiringEpisode;
    const linhas = [
      m.averageScore && `<b>★ ${(m.averageScore / 10).toFixed(1)}</b> · ${m.popularity ? m.popularity.toLocaleString('pt-BR') + ' fãs' : ''}`,
      t === 'anime' ? `${m.format || ''} · ${m.episodes ? m.episodes + ' episódios' : 'episódios: ?'}${m.duration ? ' · ' + m.duration + ' min' : ''}`
        : `${m.format || ''} · ${m.chapters ? m.chapters + ' capítulos' : 'capítulos: em andamento'}${m.volumes ? ' · ' + m.volumes + ' volumes' : ''}`,
      statusPt,
      (m.season || m.seasonYear) && `${estPt} ${m.seasonYear || ''}`,
      prox && `<b>Próximo: EP ${prox.episode} ${quando(prox.airingAt)}</b> (${new Date(prox.airingAt * 1000).toLocaleString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })})`,
      m.studios && m.studios.nodes.length && 'Estúdio: ' + m.studios.nodes.map(s => s.name).join(', '),
    ];
    const tags = (m.tags || []).filter(x => !x.isMediaSpoiler && x.rank >= 60).slice(0, 6).map(x => x.name);
    const sinopse = (m.description || 'Sem sinopse.').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/\n{3,}/g, '\n\n').trim();
    const c = $('#detCorpo');
    c.innerHTML = `
      ${m.bannerImage ? `<div class="banner" style="background-image:url('${esc(m.bannerImage)}')"></div>` : ''}
      <div class="detTopo"><img src="${esc((m.coverImage && (m.coverImage.extraLarge || m.coverImage.large)) || '')}" alt=""><div class="meta">
        ${m.title.romaji !== nome ? `<small>${esc(m.title.romaji)}</small>` : ''}${m.title.native ? `<small>${esc(m.title.native)}</small>` : ''}
        ${linhas.filter(Boolean).map(l => `<span>${l}</span>`).join('')}</div></div>
      <div class="etiquetas">${(m.genres || []).concat(tags).map(g => `<span>${esc(g)}</span>`).join('')}</div>
      <div class="botoes" id="detBotoes"></div>
      <h3>Onde ${t === 'anime' ? 'assistir' : 'ler'} oficialmente</h3><div class="botoes" id="detOnde"></div>
      <h3>Sinopse</h3><div class="sinopse">${esc(sinopse)}</div>
      <div class="botoes"><button class="botao" id="detTraduzir">🇧🇷 Explicar em português com a IA</button></div>
      <div id="detRelacoes"></div>
      ${t === 'anime' ? '<h3>Episódios</h3><div id="detProgresso"></div><div id="detEps"></div>' : '<div id="detProgresso"></div>'}
      <div id="detParecidos"></div>`;

    const bt = $('#detBotoes');
    const botao = (rot, fn, href) => {
      const el = document.createElement(href ? 'a' : 'button');
      el.className = 'botao'; el.textContent = rot;
      if (href) el.href = href; else el.onclick = fn;
      bt.appendChild(el); return el;
    };
    const bFav = botao(favs[chave] ? '💜 Na minha lista' : '🤍 Minha lista', () => {
      if (favs[chave]) delete favs[chave];
      else favs[chave] = Object.assign(cartaoAL(m), { generos: m.genres });
      salvarFavs();
      bFav.textContent = favs[chave] ? '💜 Na minha lista' : '🤍 Minha lista';
    });
    if (t === 'anime') botao('▶ Trailer', null, m.trailer && m.trailer.site === 'youtube' ? 'https://www.youtube.com/watch?v=' + m.trailer.id : yt(nome + ' trailer'));
    botao('🤖 Perguntar à IA', () => perguntarNoChat(`Me conta tudo sobre ${t === 'anime' ? 'o anime' : 'o mangá'} "${nome}": vale a pena, do que se trata (sem spoilers), ordem para ${t === 'anime' ? 'assistir' : 'ler'}, novidades e próxima temporada.`));
    botao('📰 Novidades', () => perguntarNoChat(`Quais as últimas novidades de "${nome}"? Pesquise notícias recentes.`));
    $('#detTraduzir').onclick = () => perguntarNoChat(`Explique em português a história ${t === 'anime' ? 'do anime' : 'do mangá'} "${nome}" (sem spoilers) e diga para quem é recomendado.`);

    // onde assistir / ler (só links oficiais cadastrados no AniList)
    const onde = $('#detOnde');
    const oficiais = (m.externalLinks || []).filter(l => l.type === 'STREAMING' || /official|oficial/i.test(l.site));
    for (const l of oficiais) {
      const el = document.createElement('a');
      el.className = 'botao'; el.href = linkSeguro(l.url);
      el.textContent = (t === 'anime' ? '📺 ' : '📖 ') + l.site + (l.language ? ' (' + ({ Portuguese: 'PT-BR', English: 'EN', Spanish: 'ES', Japanese: 'JP', French: 'FR', German: 'DE', Italian: 'IT' }[l.language] || l.language) + ')' : '');
      onde.appendChild(el);
    }
    if (t === 'anime' && !oficiais.some(l => /crunchyroll/i.test(l.site))) {
      const cr = document.createElement('a'); cr.className = 'botao'; cr.href = 'https://www.crunchyroll.com/pt-br/search?q=' + enc(m.title.romaji); cr.textContent = '🔎 Crunchyroll'; onde.appendChild(cr);
    }
    if (!oficiais.length) { const s = document.createElement('span'); s.className = 'dica'; s.textContent = 'Sem link oficial cadastrado. '; onde.prepend(s); }
    const perg = document.createElement('button');
    perg.className = 'botao'; perg.textContent = '🤖 Onde no Brasil?';
    perg.onclick = () => perguntarNoChat(`Onde ${t === 'anime' ? 'assistir' : 'ler'} "${nome}" de forma oficial no Brasil (streaming, dublado/legendado, grátis ou pago)? Pesquise.`);
    onde.appendChild(perg);

    // relacionados (continuações etc.)
    const REL = { SEQUEL: 'Continuação', PREQUEL: 'Anterior', SIDE_STORY: 'Paralela', PARENT: 'Principal', SPIN_OFF: 'Spin-off', ALTERNATIVE: 'Alternativa', ADAPTATION: 'Adaptação', SOURCE: 'Original' };
    const rels = ((m.relations && m.relations.edges) || []).filter(e => REL[e.relationType] && (e.node.type === 'ANIME' || e.node.type === 'MANGA'));
    if (rels.length) {
      const box = $('#detRelacoes');
      box.innerHTML = '<h3>Relacionados</h3><div class="chips" style="padding:0;flex-wrap:wrap"></div>';
      for (const e of rels.slice(0, 12)) {
        const b = document.createElement('button');
        b.textContent = `${REL[e.relationType]} (${e.node.type === 'MANGA' ? 'mangá' : e.node.format || 'anime'}): ${tituloDe(e.node)}`;
        b.onclick = () => detalhe({ fonte: 'al', id: e.node.id, titulo: tituloDe(e.node), tipo: e.node.type.toLowerCase() });
        box.querySelector('.chips').appendChild(b);
      }
    }

    // parecidos
    const recs = ((m.recommendations && m.recommendations.nodes) || []).map(r => r.mediaRecommendation).filter(Boolean);
    if (recs.length) {
      const box = $('#detParecidos');
      box.innerHTML = '<h3>Parecidos que você pode gostar</h3><div class="grade" style="padding:4px 0 10px"></div>';
      for (const r of recs.map(cartaoAL)) {
        const b = document.createElement('button');
        b.className = 'poster';
        b.innerHTML = `<div class="capa" style="background-image:url('${esc(r.img || '')}')">${r.nota ? `<span>★ ${esc(r.nota)}</span>` : ''}</div><div class="t"></div>`;
        b.querySelector('.t').textContent = r.titulo;
        b.onclick = () => detalhe(r);
        box.querySelector('.grade').appendChild(b);
      }
    }

    if (t === 'anime') episodios(m, nome);
    else {
      const id = 'al:' + m.id;
      const lidos = (vistos[id] || []).length;
      $('#detProgresso').innerHTML = `<h3>Capítulos</h3><div class="dica">${m.chapters ? m.chapters + ' capítulos' : 'Em andamento'} · você marcou ${lidos} como lido(s)</div>
        <div class="botoes"><button class="botao" id="lidoMais">+1 capítulo lido</button><button class="botao" id="lidoMenos">−1</button></div>`;
      const atualizar = d => { const l = Math.max(0, lidos + d); vistos[id] = Array.from({ length: l }, (_, i) => i + 1); salvarVistos(); detalhe({ fonte: 'al', id: m.id, titulo: nome, tipo: 'manga' }); };
      $('#lidoMais').onclick = () => atualizar(1); $('#lidoMenos').onclick = () => atualizar(-1);
    }
  }

  // todos os episódios: número, título, data, filler, link oficial do episódio (quando existe), marcar como visto
  async function episodios(m, nome) {
    const box = $('#detEps');
    const total = m.episodes || (m.nextAiringEpisode ? m.nextAiringEpisode.episode - 1 : 0) || (m.streamingEpisodes || []).length;
    const oficial = {};
    for (const s of m.streamingEpisodes || []) {
      const n = +((s.title || '').match(/(?:Episode|Episódio|Episodio|Ep\.?)\s*(\d+)/i) || [])[1];
      if (n) oficial[n] = { url: s.url, site: s.site, titulo: s.title.replace(/^.*?(?:Episode|Episódio|Episodio|Ep\.?)\s*\d+\s*[-–:]?\s*/i, '') };
    }
    const info = {};
    const id = 'al:' + m.id;
    const progresso = () => {
      const n = (vistos[id] || []).length;
      $('#detProgresso').innerHTML = `<div class="dica">Você viu ${n} de ${total || '?'} episódios${m.nextAiringEpisode ? ' · próximo: EP ' + m.nextAiringEpisode.episode + ' ' + quando(m.nextAiringEpisode.airingAt) : ''}</div><div class="progresso"><i style="width:${total ? Math.min(100, n / total * 100) : 0}%"></i></div>`;
    };
    const desenhar = () => {
      if (!$('#detEps') || $('#detTitulo').textContent !== nome) return;
      box.innerHTML = '';
      if (!total) { box.innerHTML = '<div class="dica">Ainda sem episódios lançados.</div>'; return; }
      const limite = box.dataset.limite ? +box.dataset.limite : 50;
      for (let n = 1; n <= Math.min(total, limite); n++) box.appendChild(linhaEp(n, info[n] || {}, oficial[n], nome, id, progresso));
      if (total > limite) {
        const mais = document.createElement('button');
        mais.className = 'botao largo'; mais.textContent = `Mostrar mais episódios (${total - limite} restantes)`;
        mais.onclick = () => { box.dataset.limite = limite + 100; desenhar(); };
        box.appendChild(mais);
      }
    };
    progresso(); desenhar();
    // títulos, datas e filler vêm do MyAnimeList (se responder)
    if (m.idMal) {
      try {
        for (let p = 1; p <= 4; p++) {
          const d = await jikan(`/anime/${m.idMal}/episodes?page=${p}`);
          for (const e of d.data || []) info[e.mal_id] = e;
          desenhar();
          if (!(d.pagination && d.pagination.has_next_page)) break;
          await new Promise(r => setTimeout(r, 450));
        }
      } catch (e) { /* sem títulos extras */ }
    }
  }

  function linhaEp(n, ep, of, nome, id, progresso) {
    const el = document.createElement('div');
    const visto = () => (vistos[id] || []).includes(n);
    el.className = 'episodio' + (visto() ? ' visto' : '');
    const data = ep.aired ? new Date(ep.aired).toLocaleDateString('pt-BR') : '';
    el.innerHTML = `<span class="n">${n}</span><span class="i"><span class="tt"></span>${ep.filler ? '<span class="tag">filler</span>' : ''}${ep.recap ? '<span class="tag">recap</span>' : ''}
      <small>${esc([data, ep.score ? '★ ' + ep.score : '', of ? 'oficial: ' + of.site : ''].filter(Boolean).join(' · '))}</small></span>
      <button data-v title="Marcar como visto">${visto() ? '✔' : '○'}</button><a href="${esc(of ? linkSeguro(of.url) : yt(nome + ' episódio ' + n))}" title="${of ? 'Assistir em ' + esc(of.site) : 'Procurar no YouTube'}">${of ? '▶' : '🔎'}</a>`;
    el.querySelector('.tt').textContent = ep.title || (of && of.titulo) || ('Episódio ' + n);
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

  // reserva quando o AniList não responde: detalhe básico pelo MyAnimeList
  async function detalheMal(a) {
    const t = a.tipo || 'anime';
    try {
      const d = (await jikan(`/${t}/${a.idMal}/full`)).data;
      $('#detTitulo').textContent = d.title_english || d.title;
      const i = d.images && (d.images.webp || d.images.jpg);
      $('#detCorpo').innerHTML = `<div class="detTopo"><img src="${esc(i && i.large_image_url || '')}" alt=""><div class="meta">
        <span><b>★ ${esc(d.score || '?')}</b></span><span>${esc(d.type || '')} · ${esc(d.episodes || d.chapters || '?')} ${t === 'anime' ? 'episódios' : 'capítulos'}</span><span>${esc(d.status || '')}</span></div></div>
        <h3>Onde ${t === 'anime' ? 'assistir' : 'ler'} oficialmente</h3><div class="botoes">${(d.streaming || []).concat(t === 'manga' ? d.external || [] : []).map(s => `<a class="botao" href="${esc(linkSeguro(s.url))}">📺 ${esc(s.name)}</a>`).join('') || '<span class="dica">Sem link oficial cadastrado.</span>'}</div>
        <h3>Sinopse</h3><div class="sinopse">${esc(d.synopsis || '')}</div>`;
    } catch (e) { $('#detCorpo').innerHTML = `<div class="carregando">Erro: ${esc(e.message)}</div>`; }
  }

  const yt = q => 'https://www.youtube.com/results?search_query=' + enc(q);

  // ---------------- eventos ----------------
  document.querySelectorAll('#chipsAnime button').forEach(b => b.onclick = () => { $('#buscaAnime').value = ''; busca = ''; lista = b.dataset.l; carregar_(false); });
  $('#buscaAnime').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); busca = e.target.value.trim(); carregar_(false); } });
  $('#buscaAnime').addEventListener('search', e => { busca = e.target.value.trim(); carregar_(false); });
  $('#tipoAnime').onchange = e => { tipo = e.target.value; carregar_(false); };
  $('#generoAnime').onchange = e => { genero = e.target.value; carregar_(false); };

  return {
    abrir() { if (!iniciado) { iniciado = true; carregar_(false); } },
    recarregar() { cache.clear(); carregar_(false); },
    detalhe,
  };
})();
