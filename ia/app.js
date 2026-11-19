/* Nexo IA — chat com IA que pesquisa no Google, YouTube, MyAnimeList, TVmaze e Wikipédia.
 * Roda num WebView (APK) aberto de file:///android_asset; o APK libera fetch para qualquer site
 * (setAllowUniversalAccessFromFileURLs), então dá para ler as páginas de busca sem servidor próprio. */
'use strict';

// ======================================================================
// Provedores de IA
// ======================================================================
const PROVEDORES = {
  gemini: { nome: 'Google Gemini (grátis)', tipo: 'gemini', modelo: 'gemini-flash-latest',
    dica: 'Grátis: crie a chave em aistudio.google.com/apikey (entre com sua conta Google e toque em "Create API key"). Também libera a pesquisa no Google.' },
  openrouter: { nome: 'OpenRouter (centenas de modelos)', tipo: 'openai', base: 'https://openrouter.ai/api/v1', modelo: 'openrouter/auto',
    dica: 'Chave em openrouter.ai/keys. Dá acesso a GPT, Claude, Grok, Llama, DeepSeek, Qwen, Mistral e modelos abertos (alguns grátis, com ":free" no nome).' },
  groq: { nome: 'Groq (grátis, muito rápido)', tipo: 'openai', base: 'https://api.groq.com/openai/v1', modelo: 'openai/gpt-oss-120b',
    dica: 'Grátis: chave em console.groq.com/keys. Modelos abertos com respostas instantâneas.' },
  openai: { nome: 'OpenAI (ChatGPT)', tipo: 'openai', base: 'https://api.openai.com/v1', modelo: 'gpt-5-mini',
    dica: 'Pago: chave em platform.openai.com/api-keys.' },
  anthropic: { nome: 'Anthropic (Claude)', tipo: 'anthropic', modelo: 'claude-opus-5-5',
    dica: 'Pago: chave em platform.claude.com. Para gastar menos, use claude-sonnet-5-5 ou claude-haiku-5-5.' },
  xai: { nome: 'xAI (Grok)', tipo: 'openai', base: 'https://api.x.ai/v1', modelo: 'grok-4',
    dica: 'Pago: chave em console.x.ai.' },
  deepseek: { nome: 'DeepSeek', tipo: 'openai', base: 'https://api.deepseek.com/v1', modelo: 'deepseek-chat',
    dica: 'Barato: chave em platform.deepseek.com.' },
  custom: { nome: 'Outro / modelo no seu PC (Ollama, LM Studio)', tipo: 'openai', base: '', modelo: '',
    dica: 'Qualquer API compatível com OpenAI. Para rodar um modelo aberto no seu PC, use o Ollama ou o LM Studio e coloque o IP do PC na rede Wi-Fi (ex.: http://192.168.0.10:11434/v1). Chave pode ficar vazia.' },
};

const CFG_PADRAO = { prov: 'gemini', chaves: {}, modelos: {}, base: '', gemini: '', youtube: '', livre: true, persona: '' };
let cfg = carregar('nexo_cfg', CFG_PADRAO);
cfg = Object.assign({}, CFG_PADRAO, cfg);
let conversas = carregar('nexo_conversas', []);
let atual = null;          // conversa aberta
let ocupado = null;        // AbortController da resposta em andamento

function carregar(k, padrao) {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : JSON.parse(JSON.stringify(padrao)); }
  catch (e) { return JSON.parse(JSON.stringify(padrao)); }
}
function guardar(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); return true; }
  catch (e) { return false; }
}
function salvarConversas() {
  if (guardar('nexo_conversas', conversas)) return;
  // sem espaço: tira o histórico técnico (resultados de ferramentas) das conversas mais antigas
  for (let i = conversas.length - 1; i >= 0; i--) {
    if (conversas[i] !== atual && conversas[i].api) { delete conversas[i].api; if (guardar('nexo_conversas', conversas)) return; }
  }
  while (conversas.length > 1) { conversas.pop(); if (guardar('nexo_conversas', conversas)) return; }
}

const prov = () => PROVEDORES[cfg.prov] || PROVEDORES.gemini;
const chaveAtual = () => (cfg.chaves[cfg.prov] || '').trim();
const modeloAtual = () => (cfg.modelos[cfg.prov] || prov().modelo || '').trim();
const chaveGemini = () => (cfg.prov === 'gemini' ? chaveAtual() : '') || (cfg.gemini || '').trim() || (cfg.chaves.gemini || '').trim();

// ======================================================================
// Rede
// ======================================================================
async function rede(url, opcoes = {}, ms = 25000) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  const externo = opcoes.signal;
  if (externo) externo.addEventListener('abort', () => ctl.abort());
  try {
    const r = await fetch(url, Object.assign({}, opcoes, { signal: ctl.signal }));
    return r;
  } finally { clearTimeout(t); }
}
async function json(url, opcoes, ms) {
  const r = await rede(url, opcoes, ms);
  const txt = await r.text();
  let d = null;
  try { d = JSON.parse(txt); } catch (e) { /* não é JSON */ }
  if (!r.ok) {
    const msg = (d && (d.error && (d.error.message || d.error) || d.message)) || txt.slice(0, 300) || r.statusText;
    const e = new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
    e.status = r.status; throw e;
  }
  if (d === null) throw new Error('resposta inválida de ' + new URL(url).host);
  return d;
}
async function texto(url, ms) {
  const r = await rede(url, { headers: { 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8' } }, ms);
  if (!r.ok) throw new Error('HTTP ' + r.status + ' em ' + new URL(url).host);
  return r.text();
}
const cortar = (s, n) => (s = String(s || '').trim()).length > n ? s.slice(0, n) + '…' : s;
const semHtml = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const enc = encodeURIComponent;

// ======================================================================
// Ferramentas que a IA pode usar
// ======================================================================
const FERRAMENTAS = [
  { nome: 'pesquisar_web', desc: 'Pesquisa no Google (ou DuckDuckGo/Bing se não houver chave do Gemini) e devolve um resumo com as fontes. Use para notícias, datas de lançamento, novas temporadas, rumores, onde assistir, curiosidades, qualquer coisa atual ou que você não tenha certeza.',
    params: { consulta: { type: 'string', description: 'o que pesquisar (escreva como no Google)' } }, obrig: ['consulta'] },
  { nome: 'pesquisar_youtube', desc: 'Pesquisa vídeos no YouTube (trailers, aberturas, análises, teorias, episódios, músicas, clipes, tutoriais) e mostra os vídeos para o usuário tocar.',
    params: { consulta: { type: 'string', description: 'o que procurar no YouTube' }, quantidade: { type: 'integer', description: 'quantos vídeos (1 a 10, padrão 6)' } }, obrig: ['consulta'] },
  { nome: 'buscar_anime', desc: 'Busca anime ou mangá no MyAnimeList: nota, episódios, status, temporada, estúdio, gêneros, sinopse, trailer e link.',
    params: { nome: { type: 'string', description: 'nome do anime ou mangá' }, tipo: { type: 'string', enum: ['anime', 'manga'], description: 'anime (padrão) ou manga' } }, obrig: ['nome'] },
  { nome: 'animes_da_temporada', desc: 'Lista os animes de uma temporada (a atual por padrão) ou o top de animes em exibição/mais populares, com notas do MyAnimeList.',
    params: { ano: { type: 'integer', description: 'ano (opcional)' }, estacao: { type: 'string', enum: ['winter', 'spring', 'summer', 'fall'], description: 'estação (opcional)' }, lista: { type: 'string', enum: ['temporada', 'top_em_exibicao', 'top_geral', 'proximos'], description: 'qual lista (padrão temporada)' } }, obrig: [] },
  { nome: 'buscar_serie', desc: 'Busca série de TV / dorama / desenho no TVmaze: temporadas, número de episódios, último e próximo episódio com data, emissora/streaming, elenco, nota e status.',
    params: { nome: { type: 'string', description: 'nome da série' } }, obrig: ['nome'] },
  { nome: 'wikipedia', desc: 'Lê o artigo da Wikipédia sobre um assunto (filmes, personagens, história, ciência, pessoas).',
    params: { termo: { type: 'string', description: 'assunto' }, idioma: { type: 'string', description: 'pt (padrão) ou en' } }, obrig: ['termo'] },
  { nome: 'ler_pagina', desc: 'Abre um link e lê o texto da página (para aprofundar um resultado de pesquisa).',
    params: { url: { type: 'string', description: 'endereço completo da página' } }, obrig: ['url'] },
];

const ROTULOS = {
  pesquisar_web: a => '🔎 Pesquisando no Google: ' + a.consulta,
  pesquisar_youtube: a => '▶️ Procurando no YouTube: ' + a.consulta,
  buscar_anime: a => '🎌 MyAnimeList: ' + a.nome,
  animes_da_temporada: a => '📅 Animes da temporada' + (a.ano ? ' ' + (a.estacao || '') + ' ' + a.ano : ''),
  buscar_serie: a => '📺 TVmaze: ' + a.nome,
  wikipedia: a => '📚 Wikipédia: ' + a.termo,
  ler_pagina: a => '📄 Lendo ' + (a.url || '').replace(/^https?:\/\//, '').slice(0, 50),
};

// cada ferramenta devolve { ia: dados para a IA, cartoes: [...] para mostrar }
const EXECUTAR = {
  async pesquisar_web({ consulta }) {
    const erros = [];
    if (chaveGemini()) {
      try { return await googleViaGemini(consulta); } catch (e) { erros.push('Google/Gemini: ' + e.message); }
    }
    for (const [nome, fn] of [['DuckDuckGo', duckduckgo], ['Bing', bing]]) {
      try {
        const r = await fn(consulta);
        if (r.length) return { ia: { fonte: nome, resultados: r }, cartoes: [] };
      } catch (e) { erros.push(nome + ': ' + e.message); }
    }
    return { ia: { erro: 'pesquisa falhou', detalhes: erros } };
  },

  async pesquisar_youtube({ consulta, quantidade }) {
    const n = Math.max(1, Math.min(10, quantidade || 6));
    let videos = [];
    if ((cfg.youtube || '').trim()) {
      try { videos = await youtubeApi(consulta, n); } catch (e) { /* cai para o site */ }
    }
    if (!videos.length) videos = await youtubeSite(consulta, n);
    if (!videos.length) return { ia: { erro: 'nenhum vídeo encontrado', link_busca: 'https://www.youtube.com/results?search_query=' + enc(consulta) } };
    return {
      ia: { videos: videos.map(v => ({ titulo: v.titulo, canal: v.canal, duracao: v.duracao, visualizacoes: v.views, publicado: v.quando, link: v.url })) },
      cartoes: videos.map(v => Object.assign({ tipo: 'video' }, v)),
    };
  },

  async buscar_anime({ nome, tipo }) {
    tipo = tipo === 'manga' ? 'manga' : 'anime';
    const d = await json(`https://api.jikan.moe/v4/${tipo}?q=${enc(nome)}&limit=5&order_by=members&sort=desc`);
    const lista = (d.data || []).slice(0, 4);
    if (!lista.length) return { ia: { erro: 'não encontrado no MyAnimeList' } };
    return {
      ia: lista.map((a, i) => resumoMal(a, i === 0)),
      cartoes: lista.map(a => cartaoMal(a)),
    };
  },

  async animes_da_temporada({ ano, estacao, lista }) {
    let url;
    if (lista === 'top_em_exibicao') url = 'https://api.jikan.moe/v4/top/anime?filter=airing&limit=20';
    else if (lista === 'top_geral') url = 'https://api.jikan.moe/v4/top/anime?limit=20';
    else if (lista === 'proximos') url = 'https://api.jikan.moe/v4/seasons/upcoming?limit=20';
    else if (ano && estacao) url = `https://api.jikan.moe/v4/seasons/${ano}/${estacao}?limit=24`;
    else url = 'https://api.jikan.moe/v4/seasons/now?limit=24';
    const d = await json(url);
    const vistos = new Set();
    const itens = (d.data || []).filter(a => !vistos.has(a.mal_id) && vistos.add(a.mal_id))
      .sort((a, b) => (b.members || 0) - (a.members || 0)).slice(0, 18);
    return {
      ia: itens.map(a => ({ titulo: a.title, ingles: a.title_english, nota: a.score, membros: a.members, episodios: a.episodes,
        status: a.status, generos: (a.genres || []).map(g => g.name).join(', '), estudio: (a.studios || []).map(s => s.name).join(', '),
        exibicao: a.broadcast && a.broadcast.string, sinopse: cortar(a.synopsis, 220), link: a.url })),
      cartoes: itens.slice(0, 12).map(cartaoMal),
    };
  },

  async buscar_serie({ nome }) {
    const busca = await json('https://api.tvmaze.com/search/shows?q=' + enc(nome));
    if (!busca.length) return { ia: { erro: 'série não encontrada no TVmaze' } };
    const id = busca[0].show.id;
    const s = await json(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=nextepisode&embed[]=previousepisode&embed[]=cast`);
    const e = s._embedded || {};
    const ep = x => x && { temporada: x.season, episodio: x.number, titulo: x.name, data: x.airdate, resumo: cortar(semHtml(x.summary), 300) };
    const info = {
      nome: s.name, idioma: s.language, generos: (s.genres || []).join(', '), status: s.status, estreia: s.premiered, fim: s.ended,
      emissora: (s.network && s.network.name) || (s.webChannel && s.webChannel.name), nota: s.rating && s.rating.average,
      sinopse: cortar(semHtml(s.summary), 900), site_oficial: s.officialSite, link: s.url,
      temporadas: (e.seasons || []).map(t => ({ numero: t.number, episodios: t.episodeOrder, estreia: t.premiereDate, fim: t.endDate })),
      ultimo_episodio: ep(e.previousepisode), proximo_episodio: ep(e.nextepisode),
      elenco: (e.cast || []).slice(0, 12).map(c => c.person.name + (c.character ? ' como ' + c.character.name : '')),
      outros_resultados: busca.slice(1, 4).map(b => b.show.name + (b.show.premiered ? ' (' + b.show.premiered.slice(0, 4) + ')' : '')),
    };
    return {
      ia: info,
      cartoes: [{ tipo: 'poster', titulo: s.name, img: s.image && (s.image.original || s.image.medium), url: s.url,
        linha: [s.premiered && s.premiered.slice(0, 4), s.status === 'Running' ? 'em exibição' : s.status === 'Ended' ? 'finalizada' : s.status].filter(Boolean).join(' · '),
        nota: s.rating && s.rating.average }],
    };
  },

  async wikipedia({ termo, idioma }) {
    const lang = /^[a-z]{2,3}$/.test(idioma || '') ? idioma : 'pt';
    const base = `https://${lang}.wikipedia.org/w/api.php?origin=*&format=json`;
    const b = await json(`${base}&action=query&list=search&srlimit=3&srsearch=${enc(termo)}`);
    const achados = (b.query && b.query.search) || [];
    if (!achados.length) return { ia: { erro: 'nenhum artigo encontrado' } };
    const titulo = achados[0].title;
    const d = await json(`${base}&action=query&prop=extracts|pageimages&explaintext=1&piprop=thumbnail&pithumbsize=400&redirects=1&titles=${enc(titulo)}`);
    const pag = Object.values((d.query && d.query.pages) || {})[0] || {};
    const url = `https://${lang}.wikipedia.org/wiki/${enc(titulo.replace(/ /g, '_'))}`;
    return {
      ia: { titulo, link: url, texto: cortar(pag.extract, 9000), outros_artigos: achados.slice(1).map(x => x.title) },
      cartoes: pag.thumbnail ? [{ tipo: 'poster', titulo, img: pag.thumbnail.source, url, linha: 'Wikipédia' }] : [],
    };
  },

  async ler_pagina({ url }) {
    if (!/^https?:\/\//i.test(url || '')) return { ia: { erro: 'link inválido' } };
    const html = await texto(url, 20000);
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('script,style,noscript,svg,nav,footer,header,form,iframe,aside').forEach(n => n.remove());
    const corpo = doc.querySelector('article,main,[role=main]') || doc.body;
    const t = (corpo ? corpo.innerText || corpo.textContent : '').replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
    return { ia: { titulo: (doc.title || '').trim(), link: url, texto: cortar(t, 9000) } };
  },
};

function resumoMal(a, completo) {
  const r = { titulo: a.title, ingles: a.title_english, japones: a.title_japanese, tipo: a.type, nota: a.score, rank: a.rank,
    popularidade: a.popularity, membros: a.members, status: a.status, generos: (a.genres || []).concat(a.themes || []).map(g => g.name).join(', '),
    link: a.url };
  if (a.episodes !== undefined) Object.assign(r, { episodios: a.episodes, exibicao: a.aired && a.aired.string, temporada: [a.season, a.year].filter(Boolean).join(' '),
    estudio: (a.studios || []).map(s => s.name).join(', '), fonte: a.source, classificacao: a.rating, horario: a.broadcast && a.broadcast.string,
    trailer: a.trailer && a.trailer.url });
  if (a.chapters !== undefined) Object.assign(r, { capitulos: a.chapters, volumes: a.volumes, publicacao: a.published && a.published.string,
    autores: (a.authors || []).map(s => s.name).join(', ') });
  r.sinopse = cortar(a.synopsis, completo ? 1500 : 300);
  if (completo && a.background) r.contexto = cortar(a.background, 600);
  return r;
}
function cartaoMal(a) {
  const img = a.images && (a.images.webp || a.images.jpg);
  return { tipo: 'poster', titulo: a.title_english || a.title, img: img && (img.large_image_url || img.image_url), url: a.url,
    linha: [a.type, a.episodes ? a.episodes + ' ep' : a.chapters ? a.chapters + ' cap' : '', a.year].filter(Boolean).join(' · '), nota: a.score };
}

// ---------- Google (pela IA do Gemini com a busca do Google) ----------
async function googleViaGemini(consulta) {
  const modelo = (cfg.prov === 'gemini' && modeloAtual()) || 'gemini-flash-latest';
  const hoje = new Date().toLocaleDateString('pt-BR');
  const corpo = {
    contents: [{ role: 'user', parts: [{ text: `Hoje é ${hoje}. Pesquise no Google e escreva um resumo completo e factual (com datas, números e nomes) sobre: ${consulta}` }] }],
    tools: [{ google_search: {} }],
  };
  const d = await json(`https://generativelanguage.googleapis.com/v1beta/models/${enc(modelo)}:generateContent`,
    { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': chaveGemini() }, body: JSON.stringify(corpo) }, 45000);
  const c = (d.candidates || [])[0] || {};
  const resumo = ((c.content && c.content.parts) || []).map(p => p.text || '').join('').trim();
  const fontes = ((c.groundingMetadata && c.groundingMetadata.groundingChunks) || [])
    .map(g => g.web && { titulo: g.web.title, link: g.web.uri }).filter(Boolean).slice(0, 8);
  if (!resumo) throw new Error('sem resposta');
  return { ia: { fonte: 'Google', resumo, fontes }, cartoes: [] };
}

// ---------- DuckDuckGo e Bing (lendo a página de resultados) ----------
async function duckduckgo(q) {
  const html = await texto('https://html.duckduckgo.com/html/?kl=br-pt&q=' + enc(q));
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return [...doc.querySelectorAll('.result')].map(r => {
    const a = r.querySelector('a.result__a');
    if (!a) return null;
    let link = a.getAttribute('href') || '';
    const m = link.match(/[?&]uddg=([^&]+)/);
    if (m) link = decodeURIComponent(m[1]);
    if (link.startsWith('//')) link = 'https:' + link;
    if (/duckduckgo\.com\/y\.js/.test(link)) return null;   // anúncio
    const s = r.querySelector('.result__snippet');
    return { titulo: a.textContent.trim(), link, trecho: s ? s.textContent.trim() : '' };
  }).filter(Boolean).slice(0, 8);
}
async function bing(q) {
  const html = await texto('https://www.bing.com/search?setlang=pt-br&q=' + enc(q));
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return [...doc.querySelectorAll('li.b_algo')].map(li => {
    const a = li.querySelector('h2 a');
    if (!a) return null;
    const p = li.querySelector('.b_caption p, p');
    return { titulo: a.textContent.trim(), link: a.getAttribute('href'), trecho: p ? p.textContent.trim() : '' };
  }).filter(Boolean).slice(0, 8);
}

// ---------- YouTube ----------
async function youtubeApi(q, n) {
  const d = await json(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${n}&q=${enc(q)}&key=${enc(cfg.youtube.trim())}`);
  return (d.items || []).map(i => ({
    id: i.id.videoId, titulo: decodificar(i.snippet.title), canal: i.snippet.channelTitle, quando: (i.snippet.publishedAt || '').slice(0, 10),
    url: 'https://www.youtube.com/watch?v=' + i.id.videoId, img: `https://i.ytimg.com/vi/${i.id.videoId}/hqdefault.jpg`,
  }));
}
async function youtubeSite(q, n) {
  const html = await texto('https://www.youtube.com/results?hl=pt-BR&gl=BR&search_query=' + enc(q));
  const i = html.indexOf('ytInitialData');
  if (i < 0) throw new Error('o YouTube não devolveu resultados');
  const ini = html.indexOf('{', i);
  const fim = html.indexOf(';</script>', ini);
  const dados = JSON.parse(html.slice(ini, fim));
  const vids = [];
  const txt = o => o ? (o.simpleText || (o.runs || []).map(r => r.text).join('')) : '';
  (function andar(o) {
    if (!o || typeof o !== 'object' || vids.length >= n) return;
    if (o.videoRenderer && o.videoRenderer.videoId) {
      const v = o.videoRenderer;
      vids.push({ id: v.videoId, titulo: txt(v.title), canal: txt(v.ownerText || v.longBylineText), duracao: txt(v.lengthText),
        views: txt(v.shortViewCountText || v.viewCountText), quando: txt(v.publishedTimeText),
        url: 'https://www.youtube.com/watch?v=' + v.videoId, img: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg` });
      return;
    }
    for (const k in o) andar(o[k]);
  })(dados);
  return vids;
}
function decodificar(s) { const t = document.createElement('textarea'); t.innerHTML = s; return t.value; }

// ======================================================================
// Instruções da IA
// ======================================================================
function instrucoes() {
  const agora = new Date();
  let s = `Você é o Nexo, um assistente de IA brilhante, curioso e divertido, dentro de um app de celular.
Data e hora de agora: ${agora.toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'short' })}.

Como você trabalha:
- Você é especialista em séries, animes, mangás, filmes, games, doramas, cultura pop e cultura geral, mas ajuda com qualquer assunto.
- Seu conhecimento interno tem data de corte. Para qualquer coisa que pode ter mudado (lançamentos, temporadas novas, episódios, datas, notícias, rankings, onde assistir, preços, eventos), USE AS FERRAMENTAS antes de responder. Prefira pesquisar a chutar. Pode usar várias ferramentas em sequência ou ao mesmo tempo.
- Animes e mangás: buscar_anime / animes_da_temporada. Séries de TV: buscar_serie. Notícias e fatos atuais: pesquisar_web. Vídeos, trailers, aberturas, análises, músicas: pesquisar_youtube (os vídeos aparecem como cartões que o usuário toca para assistir).
- Quando o usuário pedir vídeo, trailer, abertura, música ou "mostra no YouTube", sempre chame pesquisar_youtube.
- Cruze as fontes, diga de onde veio a informação e coloque os links principais em markdown. Se as fontes discordarem, diga.
- Nunca invente datas, números de episódios, nomes ou links. Se não achar, diga que não achou.
- Responda no idioma do usuário (padrão: português do Brasil), com markdown leve: títulos curtos, listas e **negrito** quando ajudar. Sem enrolação.
- Spoilers: avise antes de contar spoilers grandes, a menos que o usuário peça. Para esconder um trecho use ||assim||.
- Dê opinião própria quando pedirem (melhores animes, ranking de personagens, teorias, power scaling), justificando.`;
  if (cfg.livre) s += `

Modo livre ATIVADO pelo usuário (adulto):
- Converse como um amigo adulto e franco: pode usar palavrão e humor ácido se combinar com a conversa.
- Fale abertamente sobre temas maduros das obras: violência, gore, morte, terror psicológico, temas sexuais da trama, crimes e polêmicas — descreva e analise sem suavizar.
- Não dê sermão, não moralize e não encha a resposta de avisos. Só se recuse ao que for realmente perigoso no mundo real.`;
  if ((cfg.persona || '').trim()) s += '\n\nInstruções do usuário sobre sua personalidade (siga-as):\n' + cfg.persona.trim();
  return s;
}

// ======================================================================
// Conversa com cada tipo de API (com laço de ferramentas)
// ======================================================================
const MAX_RODADAS = 8;

// histórico técnico guardado por conversa: { prov, msgs } no formato do provedor
function historicoApi(conv) {
  const tipo = prov().tipo;
  const chave = cfg.prov + '|' + tipo;
  const grande = conv.api && JSON.stringify(conv.api.msgs).length > 150000;
  if (conv.api && conv.api.prov === chave && !grande) return conv.api.msgs;
  // trocou de provedor (ou ficou grande demais): recria só com os textos
  const msgs = [];
  const ultimas = conv.msgs.filter(m => !m.erro && m.texto).slice(-24);
  for (const m of ultimas) {
    const papel = m.papel === 'eu' ? 'user' : 'assistant';
    if (tipo === 'gemini') msgs.push({ role: papel === 'user' ? 'user' : 'model', parts: [{ text: m.texto }] });
    else msgs.push({ role: papel, content: m.texto });
  }
  // a conversa precisa começar pelo usuário
  while (msgs.length && (msgs[0].role !== 'user')) msgs.shift();
  conv.api = { prov: chave, msgs };
  return msgs;
}

async function responder(conv, aoPasso, sinal) {
  const msgs = historicoApi(conv);
  const tipo = prov().tipo;
  const cartoes = [];
  const rodar = async (nome, args) => {
    const passo = aoPasso((ROTULOS[nome] || (() => '🔧 ' + nome))(args || {}));
    try {
      if (!EXECUTAR[nome]) throw new Error('ferramenta desconhecida');
      const r = await EXECUTAR[nome](args || {});
      if (r.cartoes) cartoes.push(...r.cartoes);
      passo(true);
      return cortar(JSON.stringify(r.ia), 12000);
    } catch (e) {
      passo(false);
      return JSON.stringify({ erro: e.message || String(e) });
    }
  };
  let texto;
  if (tipo === 'gemini') texto = await laçoGemini(msgs, rodar, sinal);
  else if (tipo === 'anthropic') texto = await laçoAnthropic(msgs, rodar, sinal);
  else texto = await laçoOpenAI(msgs, rodar, sinal);
  return { texto, cartoes };
}

function lerArgs(s) { try { return typeof s === 'string' ? JSON.parse(s || '{}') : (s || {}); } catch (e) { return {}; } }

// ---------- OpenAI e compatíveis (OpenRouter, Groq, xAI, DeepSeek, Ollama…) ----------
async function laçoOpenAI(msgs, rodar, sinal) {
  const p = prov();
  const base = (cfg.prov === 'custom' ? cfg.base : p.base).replace(/\/+$/, '');
  if (!base) throw new Error('Coloque o endereço da API nas configurações.');
  const tools = FERRAMENTAS.map(f => ({ type: 'function', function: { name: f.nome, description: f.desc,
    parameters: { type: 'object', properties: f.params, required: f.obrig } } }));
  let comFerramentas = true;
  for (let i = 0; i < MAX_RODADAS; i++) {
    const corpo = { model: modeloAtual(), messages: [{ role: 'system', content: instrucoes() }].concat(msgs) };
    if (comFerramentas) { corpo.tools = tools; corpo.tool_choice = i === MAX_RODADAS - 1 ? 'none' : 'auto'; }
    const headers = { 'Content-Type': 'application/json' };
    if (chaveAtual()) headers.Authorization = 'Bearer ' + chaveAtual();
    if (cfg.prov === 'openrouter') { headers['X-Title'] = 'Nexo IA'; headers['HTTP-Referer'] = 'https://nexo-ia.app'; }
    let d;
    try {
      d = await json(base + '/chat/completions', { method: 'POST', headers, body: JSON.stringify(corpo), signal: sinal }, 120000);
    } catch (e) {
      // modelo sem suporte a ferramentas: tenta de novo sem elas
      if (comFerramentas && e.status >= 400 && e.status < 500 && /tool|function/i.test(e.message)) { comFerramentas = false; i--; continue; }
      throw e;
    }
    const m = (d.choices && d.choices[0] && d.choices[0].message) || {};
    const calls = m.tool_calls || [];
    const guardada = { role: 'assistant', content: m.content || (calls.length ? null : '') };
    if (calls.length) guardada.tool_calls = calls;
    msgs.push(guardada);
    if (!calls.length) return m.content || '(resposta vazia)';
    const res = await Promise.all(calls.map(c => rodar(c.function.name, lerArgs(c.function.arguments))));
    calls.forEach((c, k) => msgs.push({ role: 'tool', tool_call_id: c.id, content: res[k] }));
  }
  return 'Fiz pesquisas demais nesta pergunta. Pode reformular?';
}

// ---------- Google Gemini ----------
function esquemaGemini(o) {
  if (Array.isArray(o)) return o.map(esquemaGemini);
  if (!o || typeof o !== 'object') return o;
  const r = {};
  for (const k in o) r[k] = k === 'type' ? String(o[k]).toUpperCase() : esquemaGemini(o[k]);
  return r;
}
async function laçoGemini(msgs, rodar, sinal) {
  const decl = FERRAMENTAS.map(f => ({ name: f.nome, description: f.desc,
    parameters: esquemaGemini({ type: 'object', properties: f.params, required: f.obrig }) }));
  if (!chaveAtual()) throw Object.assign(new Error('Falta a chave do Gemini'), { status: 401 });
  for (let i = 0; i < MAX_RODADAS; i++) {
    const corpo = {
      systemInstruction: { parts: [{ text: instrucoes() }] },
      contents: msgs,
      tools: [{ functionDeclarations: decl }],
      toolConfig: { functionCallingConfig: { mode: i === MAX_RODADAS - 1 ? 'NONE' : 'AUTO' } },
    };
    if (cfg.livre) corpo.safetySettings = ['HARM_CATEGORY_HARASSMENT', 'HARM_CATEGORY_HATE_SPEECH', 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'HARM_CATEGORY_DANGEROUS_CONTENT']
      .map(category => ({ category, threshold: 'BLOCK_NONE' }));
    const d = await json(`https://generativelanguage.googleapis.com/v1beta/models/${enc(modeloAtual())}:generateContent`,
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': chaveAtual() }, body: JSON.stringify(corpo), signal: sinal }, 120000);
    const c = (d.candidates || [])[0];
    if (!c || !c.content) {
      const motivo = (c && c.finishReason) || (d.promptFeedback && d.promptFeedback.blockReason) || 'desconhecido';
      return `⚠️ O Google bloqueou esta resposta (motivo: ${motivo}). Tente reformular ou troque de provedor nas configurações.`;
    }
    const partes = c.content.parts || [];
    msgs.push({ role: 'model', parts: partes });
    const calls = partes.filter(p => p.functionCall);
    if (!calls.length) return partes.filter(p => p.text && !p.thought).map(p => p.text).join('') || '(resposta vazia)';
    const res = await Promise.all(calls.map(p => rodar(p.functionCall.name, p.functionCall.args)));
    msgs.push({ role: 'user', parts: calls.map((p, k) => {
      const fr = { name: p.functionCall.name, response: { resultado: lerArgs(res[k]) } };
      if (p.functionCall.id) fr.id = p.functionCall.id;
      return { functionResponse: fr };
    }) });
  }
  return 'Fiz pesquisas demais nesta pergunta. Pode reformular?';
}

// ---------- Anthropic (Claude) — Messages API ----------
async function laçoAnthropic(msgs, rodar, sinal) {
  const tools = FERRAMENTAS.map(f => ({ name: f.nome, description: f.desc,
    input_schema: { type: 'object', properties: f.params, required: f.obrig } }));
  const modelo = modeloAtual();
  // modelos que aceitam a troca automática de modelo quando recusam (fallback no servidor)
  const comFallback = /^claude-(opus-5-5|opus-5$|sonnet-5-5|fable-5)/.test(modelo);
  for (let i = 0; i < MAX_RODADAS; i++) {
    const corpo = { model: modelo, max_tokens: 16000, system: instrucoes(), messages: msgs, tools };
    if (i === MAX_RODADAS - 1) corpo.tool_choice = { type: 'none' };
    const headers = { 'Content-Type': 'application/json', 'x-api-key': chaveAtual(), 'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true' };
    if (comFallback) { corpo.fallbacks = 'default'; headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; }
    const d = await json('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(corpo), signal: sinal }, 180000);
    const blocos = d.content || [];
    const textoFinal = blocos.filter(b => b.type === 'text').map(b => b.text).join('');
    if (d.stop_reason === 'refusal') {
      return textoFinal + '\n\n⚠️ O Claude recusou esta pergunta' + (d.stop_details && d.stop_details.explanation ? ': ' + d.stop_details.explanation : '.');
    }
    msgs.push({ role: 'assistant', content: blocos });
    const usos = blocos.filter(b => b.type === 'tool_use');
    if (d.stop_reason !== 'tool_use' || !usos.length) return textoFinal || '(resposta vazia)';
    const res = await Promise.all(usos.map(b => rodar(b.name, b.input)));
    msgs.push({ role: 'user', content: usos.map((b, k) => ({ type: 'tool_result', tool_use_id: b.id, content: res[k] })) });
  }
  return 'Fiz pesquisas demais nesta pergunta. Pode reformular?';
}

// ---------- lista de modelos do provedor ----------
async function listarModelos() {
  const p = prov();
  if (p.tipo === 'gemini') {
    const d = await json('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200', { headers: { 'x-goog-api-key': chaveAtual() } });
    return (d.models || []).filter(m => (m.supportedGenerationMethods || []).includes('generateContent'))
      .map(m => m.name.replace(/^models\//, '')).filter(n => /gemini/.test(n));
  }
  if (p.tipo === 'anthropic') {
    const d = await json('https://api.anthropic.com/v1/models?limit=100', { headers: { 'x-api-key': chaveAtual(), 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' } });
    return (d.data || []).map(m => m.id);
  }
  const base = (cfg.prov === 'custom' ? cfg.base : p.base).replace(/\/+$/, '');
  const headers = chaveAtual() ? { Authorization: 'Bearer ' + chaveAtual() } : {};
  const d = await json(base + '/models', { headers });
  return (d.data || d.models || []).map(m => m.id || m.name).filter(Boolean).sort();
}

// ======================================================================
// Markdown → HTML (simples e seguro: escapa tudo antes)
// ======================================================================
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function linkSeguro(u) { return /^https?:\/\//i.test(u) ? u : '#'; }
function inline(s) {
  const codigos = [];
  s = s.replace(/`([^`\n]+)`/g, (_, c) => { codigos.push(c); return '\u0000' + (codigos.length - 1) + '\u0000'; });
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, u) => `<img alt="${alt}" src="${linkSeguro(u.replace(/&amp;/g, '&'))}">`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${esc(linkSeguro(u.replace(/&amp;/g, '&')))}">${t}</a>`);
  s = s.replace(/(^|[\s(])(https?:\/\/[^\s<)]+[^\s<).,!?;:])/g, (_, a, u) => `${a}<a href="${u}">${u.length > 60 ? u.slice(0, 57) + '…' : u}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/__([^_]+)__/g, '<b>$1</b>');
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1<i>$2</i>').replace(/(^|[^_\w])_([^_\n]+)_(?!\w)/g, '$1<i>$2</i>');
  s = s.replace(/~~([^~]+)~~/g, '<s>$1</s>');
  s = s.replace(/\|\|([^|]+)\|\|/g, '<span class="spoiler">$1</span>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => '<code>' + esc(codigos[i]) + '</code>');
}
function markdown(md) {
  const linhas = String(md || '').replace(/\r/g, '').split('\n');
  let out = '', i = 0;
  const lista = [];
  const fechaListas = () => { while (lista.length) out += '</' + lista.pop() + '>'; };
  while (i < linhas.length) {
    const l = linhas[i];
    let m;
    if ((m = l.match(/^\s*```(\w*)/))) {
      fechaListas();
      const cod = [];
      i++;
      while (i < linhas.length && !/^\s*```/.test(linhas[i])) cod.push(linhas[i++]);
      i++;
      out += '<pre><code>' + esc(cod.join('\n')) + '</code></pre>';
      continue;
    }
    if (/^\s*\|.*\|\s*$/.test(l) && i + 1 < linhas.length && /^\s*\|?\s*:?-{2,}/.test(linhas[i + 1])) {
      fechaListas();
      const cel = x => x.trim().replace(/^\||\|$/g, '').split('|').map(c => inline(c.trim()));
      out += '<table><tr>' + cel(l).map(c => '<th>' + c + '</th>').join('') + '</tr>';
      i += 2;
      while (i < linhas.length && /^\s*\|/.test(linhas[i])) out += '<tr>' + cel(linhas[i++]).map(c => '<td>' + c + '</td>').join('') + '</tr>';
      out += '</table>';
      continue;
    }
    if ((m = l.match(/^(#{1,4})\s+(.*)/))) { fechaListas(); const n = Math.min(3, m[1].length); out += `<h${n}>${inline(m[2])}</h${n}>`; i++; continue; }
    if ((m = l.match(/^\s*([-*+]|\d+[.)])\s+(.*)/))) {
      const tag = /\d/.test(m[1]) ? 'ol' : 'ul';
      if (lista[lista.length - 1] !== tag) { fechaListas(); out += '<' + tag + '>'; lista.push(tag); }
      out += '<li>' + inline(m[2]) + '</li>';
      i++; continue;
    }
    if (/^\s*>/.test(l)) { fechaListas(); out += '<blockquote>' + inline(l.replace(/^\s*>\s?/, '')) + '</blockquote>'; i++; continue; }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(l)) { fechaListas(); out += '<hr>'; i++; continue; }
    if (!l.trim()) { fechaListas(); i++; continue; }
    fechaListas();
    const par = [l];
    i++;
    while (i < linhas.length && linhas[i].trim() && !/^(\s*```|#{1,4}\s|\s*([-*+]|\d+[.)])\s|\s*>|\s*\|)/.test(linhas[i])) par.push(linhas[i++]);
    out += '<p>' + par.map(inline).join('<br>') + '</p>';
  }
  fechaListas();
  return out;
}

// ======================================================================
// Interface
// ======================================================================
const $ = s => document.querySelector(s);
const elMsgs = $('#mensagens'), elChat = $('#chat'), elTexto = $('#texto'), elEnviar = $('#btnEnviar');

function aviso(t) {
  const a = $('#aviso');
  a.textContent = t; a.classList.add('ver');
  clearTimeout(aviso.t); aviso.t = setTimeout(() => a.classList.remove('ver'), 2600);
}
function rolarFim() { requestAnimationFrame(() => { elChat.scrollTop = elChat.scrollHeight; }); }

const SUGESTOES = [
  ['🔥', 'Quais os animes mais populares desta temporada?'],
  ['▶️', 'Mostra o trailer mais recente de One Piece'],
  ['📺', 'Quando sai o próximo episódio de The Boys?'],
  ['🎌', 'Me recomende animes parecidos com Attack on Titan'],
  ['🕵️', 'Explica as teorias mais malucas sobre Chainsaw Man'],
  ['🎵', 'Toca as melhores aberturas de anime de todos os tempos'],
];
function montarSugestoes() {
  $('#sugestoes').innerHTML = '';
  for (const [ic, t] of SUGESTOES) {
    const b = document.createElement('button');
    b.className = 'sug';
    b.innerHTML = `<b>${ic}</b>${esc(t)}`;
    b.onclick = () => enviar(t);
    $('#sugestoes').appendChild(b);
  }
}

function desenharCartoes(lista) {
  const box = document.createElement('div');
  box.className = 'cartoes';
  for (const c of lista) {
    const a = document.createElement('a');
    a.href = linkSeguro(c.url || '');
    if (c.tipo === 'video') {
      a.className = 'cartao';
      a.innerHTML = `<div class="capa" style="background-image:url('${esc(c.img)}')"><div class="play">▶</div>${c.duracao ? `<span class="dur">${esc(c.duracao)}</span>` : ''}</div>
        <div class="info"><b>${esc(c.titulo)}</b><span>${esc([c.canal, c.views].filter(Boolean).join(' · '))}</span></div>`;
    } else {
      a.className = 'cartao poster';
      a.innerHTML = `<div class="capa" style="background-image:url('${esc(c.img || '')}')"></div>
        <div class="info"><b>${esc(c.titulo)}</b><span>${esc(c.linha || '')}</span>${c.nota ? `<br><span class="nota">★ ${esc(c.nota)}</span>` : ''}</div>`;
    }
    box.appendChild(a);
  }
  return box;
}

function desenharMsg(m) {
  const linha = document.createElement('div');
  linha.className = 'msg ' + (m.papel === 'eu' ? 'eu' : 'ia') + (m.erro ? ' erro' : '');
  const b = document.createElement('div');
  b.className = 'bolha';
  if (m.papel === 'eu') b.textContent = m.texto;
  else {
    if (m.passos && m.passos.length) {
      const p = document.createElement('div');
      p.className = 'passos';
      p.innerHTML = m.passos.map(x => `<div class="passo">${esc(x)}</div>`).join('');
      b.appendChild(p);
    }
    const corpo = document.createElement('div');
    corpo.innerHTML = markdown(m.texto);
    b.appendChild(corpo);
    if (m.cartoes && m.cartoes.length) b.appendChild(desenharCartoes(m.cartoes));
    if (!m.erro) {
      const ac = document.createElement('div');
      ac.className = 'acoes';
      ac.innerHTML = '<button data-a="copiar">Copiar</button><button data-a="refazer">Refazer</button>';
      ac.querySelector('[data-a=copiar]').onclick = () => copiar(m.texto);
      ac.querySelector('[data-a=refazer]').onclick = () => refazer(m);
      b.appendChild(ac);
    }
  }
  linha.appendChild(b);
  return linha;
}

function copiar(t) {
  const fim = () => aviso('Copiado!');
  if (navigator.clipboard) navigator.clipboard.writeText(t).then(fim, () => copiaVelha(t, fim));
  else copiaVelha(t, fim);
}
function copiaVelha(t, fim) {
  const x = document.createElement('textarea');
  x.value = t; document.body.appendChild(x); x.select();
  try { document.execCommand('copy'); fim(); } catch (e) { aviso('Não deu para copiar'); }
  x.remove();
}

elMsgs.addEventListener('click', e => {
  const s = e.target.closest('.spoiler');
  if (s) s.classList.toggle('aberto');
});

function mostrarConversa() {
  elMsgs.innerHTML = '';
  const vazia = !atual || !atual.msgs.length;
  $('#boasVindas').style.display = vazia ? '' : 'none';
  if (atual) for (const m of atual.msgs) elMsgs.appendChild(desenharMsg(m));
  rolarFim();
  atualizarChip();
}
function atualizarChip() {
  $('#chipModelo').textContent = chaveAtual() || cfg.prov === 'custom' ? (prov().nome.split(' (')[0] + ' · ' + (modeloAtual() || '?')) : 'toque em ⚙ para configurar';
}

function novaConversa() {
  if (atual && !atual.msgs.length) { fecharPaineis(); return mostrarConversa(); }
  atual = { id: Date.now().toString(36), titulo: 'Nova conversa', criada: Date.now(), msgs: [] };
  conversas.unshift(atual);
  fecharPaineis();
  mostrarConversa();
}

function precisaConfigurar() {
  return !chaveAtual() && cfg.prov !== 'custom';
}

async function enviar(textoUsuario) {
  textoUsuario = (textoUsuario || '').trim();
  if (!textoUsuario || ocupado) return;
  if (precisaConfigurar()) { abrirConfig(); aviso('Primeiro coloque a chave da IA (o Gemini é grátis)'); return; }
  if (!atual) novaConversa();
  if (!atual.msgs.length) atual.titulo = cortar(textoUsuario, 48);
  // conversa sobe para o topo da lista
  conversas = [atual].concat(conversas.filter(c => c !== atual));
  historicoApi(atual);   // antes de guardar a pergunta, para ela não entrar duas vezes
  const minha = { papel: 'eu', texto: textoUsuario };
  atual.msgs.push(minha);
  $('#boasVindas').style.display = 'none';
  elMsgs.appendChild(desenharMsg(minha));
  elTexto.value = ''; ajustarAltura();

  // bolha provisória com os passos
  const linha = document.createElement('div');
  linha.className = 'msg ia';
  linha.innerHTML = '<div class="bolha"><div class="passos"></div><div class="digitando"><i></i><i></i><i></i></div></div>';
  elMsgs.appendChild(linha);
  rolarFim();
  const passos = [];
  const aoPasso = rotulo => {
    const el = document.createElement('div');
    el.className = 'passo';
    el.innerHTML = '<span class="gira"></span><span></span>';
    el.lastChild.textContent = rotulo;
    linha.querySelector('.passos').appendChild(el);
    rolarFim();
    return ok => { el.firstChild.outerHTML = ok ? '<span>✔</span>' : '<span>✖</span>'; passos.push((ok ? '✔ ' : '✖ ') + rotulo); };
  };

  const conv = atual;
  const apiAntes = conv.api ? JSON.stringify(conv.api) : null;
  ocupado = new AbortController();
  elEnviar.classList.add('parar'); elEnviar.textContent = '■';
  let resposta;
  try {
    const msgsApi = conv.api.msgs;
    if (prov().tipo === 'gemini') msgsApi.push({ role: 'user', parts: [{ text: textoUsuario }] });
    else msgsApi.push({ role: 'user', content: textoUsuario });
    const r = await responder(conv, aoPasso, ocupado.signal);
    resposta = { papel: 'ia', texto: r.texto, cartoes: r.cartoes.slice(0, 20), passos };
  } catch (e) {
    conv.api = apiAntes ? JSON.parse(apiAntes) : undefined;   // desfaz a rodada que falhou
    resposta = { papel: 'ia', erro: true, passos, texto: explicarErro(e) };
  }
  ocupado = null;
  elEnviar.classList.remove('parar'); elEnviar.textContent = '➤';
  conv.msgs.push(resposta);
  salvarConversas();
  if (conv === atual) { linha.replaceWith(desenharMsg(resposta)); rolarFim(); }
}

function explicarErro(e) {
  if (e.name === 'AbortError') return '⏹ Resposta interrompida.';
  const s = e.status, msg = e.message || String(e);
  let dica = '';
  if (s === 400 && /api key|API_KEY/i.test(msg)) dica = 'A chave parece inválida. Confira nas configurações (⚙).';
  else if (s === 401 || s === 403) dica = 'A chave foi recusada. Confira se copiou ela inteira nas configurações (⚙).';
  else if (s === 404 || /model/i.test(msg) && s === 400) dica = 'Esse modelo não existe ou não está liberado na sua conta. Em ⚙ toque em "Listar" e escolha outro.';
  else if (s === 429) dica = 'Limite de uso atingido. Espere um pouco ou troque de modelo/provedor.';
  else if (s === 402) dica = 'Sem créditos nessa conta do provedor.';
  else if (!s) dica = 'Sem conexão com o servidor. Confira sua internet' + (cfg.prov === 'custom' ? ' e se o PC com o modelo está ligado na mesma rede.' : '.');
  return `**Erro${s ? ' ' + s : ''}:** ${msg}\n\n${dica}`;
}

function refazer(m) {
  if (ocupado || !atual) return;
  const i = atual.msgs.indexOf(m);
  if (i < 1) return;
  const pergunta = atual.msgs[i - 1];
  if (pergunta.papel !== 'eu') return;
  atual.msgs.splice(i - 1);
  delete atual.api;   // recria o histórico a partir dos textos
  mostrarConversa();
  enviar(pergunta.texto);
}

// ---------- caixa de texto ----------
function ajustarAltura() { elTexto.style.height = 'auto'; elTexto.style.height = Math.min(150, elTexto.scrollHeight) + 'px'; }
elTexto.addEventListener('input', ajustarAltura);
elTexto.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey && !('ontouchstart' in window)) { e.preventDefault(); enviar(elTexto.value); }
});
elEnviar.onclick = () => { if (ocupado) ocupado.abort(); else enviar(elTexto.value); };

// ---------- painéis (o botão Voltar do Android fecha o painel via histórico) ----------
function abrirPainel(id) {
  fecharPaineis(true);
  $(id).classList.add('aberto');
  $('#veu').classList.add('aberto');
  if (!history.state || !history.state.painel) history.pushState({ painel: id }, '', '#p');
}
function fecharPaineis(semHistorico) {
  const aberto = document.querySelector('.painel.aberto,.painel-lateral.aberto');
  document.querySelectorAll('.painel,.painel-lateral').forEach(p => p.classList.remove('aberto'));
  $('#veu').classList.remove('aberto');
  if (aberto && !semHistorico && history.state && history.state.painel) history.back();
}
window.addEventListener('popstate', () => {
  document.querySelectorAll('.painel,.painel-lateral').forEach(p => p.classList.remove('aberto'));
  $('#veu').classList.remove('aberto');
});
window.androidBack = () => fecharPaineis();
document.querySelectorAll('[data-fechar]').forEach(b => b.onclick = () => fecharPaineis());
$('#veu').onclick = () => fecharPaineis();

$('#btnMenu').onclick = () => { desenharLista(); abrirPainel('#gaveta'); };
$('#btnNovo').onclick = novaConversa;
$('#btnNovo2').onclick = novaConversa;
$('#btnConfig').onclick = () => abrirConfig();

function desenharLista() {
  const box = $('#listaConversas');
  box.innerHTML = '';
  const reais = conversas.filter(c => c.msgs.length);
  if (!reais.length) box.innerHTML = '<p class="dica" style="padding:10px">Nenhuma conversa ainda.</p>';
  for (const c of reais) {
    const el = document.createElement('div');
    el.className = 'conv' + (c === atual ? ' atual' : '');
    el.innerHTML = '<span class="t"></span><button aria-label="Apagar">🗑</button>';
    el.querySelector('.t').textContent = c.titulo;
    el.querySelector('.t').onclick = () => { atual = c; fecharPaineis(); mostrarConversa(); };
    el.querySelector('button').onclick = () => {
      if (!confirm('Apagar "' + c.titulo + '"?')) return;
      conversas = conversas.filter(x => x !== c);
      if (atual === c) { atual = null; mostrarConversa(); }
      salvarConversas(); desenharLista();
    };
    box.appendChild(el);
  }
}

// ---------- configurações ----------
const sel = $('#cfgProv');
for (const k in PROVEDORES) {
  const o = document.createElement('option');
  o.value = k; o.textContent = PROVEDORES[k].nome;
  sel.appendChild(o);
}
let provEditando = cfg.prov;
function preencherProv() {
  const p = PROVEDORES[provEditando];
  $('#dicaProv').textContent = p.dica;
  $('#cfgChave').value = cfg.chaves[provEditando] || '';
  $('#cfgModelo').value = cfg.modelos[provEditando] || p.modelo;
  $('#rotBase').style.display = provEditando === 'custom' ? '' : 'none';
  $('#listaModelos').innerHTML = '';
  $('#dicaModelos').textContent = '';
}
function lerCampos() {
  cfg.chaves[provEditando] = $('#cfgChave').value.trim();
  cfg.modelos[provEditando] = $('#cfgModelo').value.trim();
}
function abrirConfig() {
  provEditando = cfg.prov;
  sel.value = cfg.prov;
  preencherProv();
  $('#cfgBase').value = cfg.base || '';
  $('#cfgGemini').value = cfg.gemini || '';
  $('#cfgYoutube').value = cfg.youtube || '';
  $('#cfgLivre').checked = !!cfg.livre;
  $('#cfgPersona').value = cfg.persona || '';
  abrirPainel('#config');
}
sel.onchange = () => { lerCampos(); provEditando = sel.value; preencherProv(); };
$('#verChave').onclick = () => { const i = $('#cfgChave'); i.type = i.type === 'password' ? 'text' : 'password'; };
$('#carregarModelos').onclick = async () => {
  lerCampos();
  const antes = cfg.prov; const baseAntes = cfg.base;
  cfg.prov = provEditando; cfg.base = $('#cfgBase').value.trim();
  $('#dicaModelos').textContent = 'Carregando…';
  try {
    const lista = await listarModelos();
    $('#listaModelos').innerHTML = lista.map(m => `<option value="${esc(m)}">`).join('');
    $('#dicaModelos').textContent = lista.length + ' modelos. Toque no campo Modelo para escolher (ou apague o texto para ver todos).';
  } catch (e) {
    $('#dicaModelos').textContent = 'Não consegui listar: ' + e.message;
  }
  cfg.prov = antes; cfg.base = baseAntes;
};
$('#salvarCfg').onclick = () => {
  lerCampos();
  const trocou = cfg.prov !== provEditando;
  cfg.prov = provEditando;
  cfg.base = $('#cfgBase').value.trim();
  cfg.gemini = $('#cfgGemini').value.trim();
  cfg.youtube = $('#cfgYoutube').value.trim();
  cfg.livre = $('#cfgLivre').checked;
  cfg.persona = $('#cfgPersona').value;
  guardar('nexo_cfg', cfg);
  if (trocou && atual) delete atual.api;
  atualizarChip();
  fecharPaineis();
  aviso('Configurações salvas');
};
$('#apagarTudo').onclick = () => {
  if (!confirm('Apagar TODAS as conversas?')) return;
  conversas = []; atual = null; salvarConversas(); mostrarConversa(); aviso('Conversas apagadas');
};

// ---------- início ----------
montarSugestoes();
atual = conversas.find(c => c.msgs.length) || null;
if (atual && Date.now() - (atual.criada || 0) > 6 * 3600e3) atual = null;   // depois de um tempo abre uma conversa nova
mostrarConversa();
if (precisaConfigurar()) setTimeout(() => { abrirConfig(); aviso('Bem-vindo! Escolha a IA e cole a chave'); }, 400);
