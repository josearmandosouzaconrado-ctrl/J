/* Nexo Local: IA que roda dentro do celular, sem chave e sem servidor.
 * Usa o llama.cpp compilado para WebAssembly (biblioteca wllama, licença MIT) e um modelo aberto
 * (família Qwen, licença Apache 2.0) baixado uma única vez do Hugging Face e guardado no aparelho. */
'use strict';
const NexoLocal = (() => {
  const MODELOS = {
    leve: { nome: 'Leve (Qwen 2.5 0.5B)', tamanho: '≈ 0,5 GB', url: 'https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q4_k_m.gguf', ctx: 8192 },
    equilibrado: { nome: 'Equilibrado (Qwen 2.5 1.5B)', tamanho: '≈ 1,1 GB', url: 'https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/qwen2.5-1.5b-instruct-q4_k_m.gguf', ctx: 8192 },
    forte: { nome: 'Forte (Qwen 3 1.7B)', tamanho: '≈ 1,1 GB', url: 'https://huggingface.co/unsloth/Qwen3-1.7B-GGUF/resolve/main/Qwen3-1.7B-Q4_K_M.gguf', semPensar: true, ctx: 4096 },
  };
  const WASM_CDN = 'https://cdn.jsdelivr.net/npm/@wllama/wllama@3.13.0/esm/wasm/wllama.wasm';
  let w = null, carregadoUrl = null, wasmUrl = null;

  const escolhido = () => {
    const m = (cfg.modelos.local || 'equilibrado').trim();
    if (MODELOS[m]) return Object.assign({ chave: m }, MODELOS[m]);
    if (/^https?:\/\/.+\.gguf(\?.*)?$/i.test(m)) return { chave: m, nome: m.split('/').pop(), tamanho: '?', url: m, ctx: 4096 };
    return Object.assign({ chave: 'equilibrado' }, MODELOS.equilibrado);
  };

  function lerArquivo(u) {
    return new Promise((ok, falha) => {
      const x = new XMLHttpRequest();
      x.open('GET', u); x.responseType = 'arraybuffer';
      x.onload = () => (x.status === 0 || x.status === 200) && x.response && x.response.byteLength ? ok(x.response) : falha(new Error('sem arquivo'));
      x.onerror = () => falha(new Error('sem arquivo'));
      x.send();
    });
  }
  async function motor() {
    if (w) return w;
    if (typeof Wllama === 'undefined') throw new Error('o motor de IA local não carregou');
    if (!wasmUrl) {
      try { wasmUrl = URL.createObjectURL(new Blob([await lerArquivo('wllama.wasm')], { type: 'application/wasm' })); }
      catch (e) { wasmUrl = WASM_CDN; }   // fora do APK (ou se o arquivo faltar), baixa da CDN
    }
    w = new Wllama({ default: wasmUrl }, { suppressNativeLog: true });
    return w;
  }

  // ---------- armazenamento próprio no IndexedDB (funciona na página aberta de file://) ----------
  const PEDACO = 32 * 1048576;
  let banco = null;
  function db() {
    if (banco) return banco;
    banco = new Promise((ok, falha) => {
      const r = indexedDB.open('nexo_modelos', 1);
      r.onupgradeneeded = () => { r.result.createObjectStore('meta'); r.result.createObjectStore('partes'); };
      r.onsuccess = () => ok(r.result);
      r.onerror = () => { banco = null; falha(r.error || new Error('sem IndexedDB')); };
    });
    return banco;
  }
  async function op(loja, modo, fn) {
    const d = await db();
    return new Promise((ok, falha) => {
      const tx = d.transaction(loja, modo);
      let res;
      const req = fn(tx.objectStore(loja));
      if (req) req.onsuccess = () => { res = req.result; };
      tx.oncomplete = () => ok(res);
      tx.onerror = tx.onabort = () => falha(tx.error || new Error('erro no IndexedDB'));
    });
  }
  const lerMeta = url => op('meta', 'readonly', s => s.get(url));
  const gravarMeta = (url, m) => op('meta', 'readwrite', s => s.put(m, url));
  const gravarParte = (url, i, blob) => op('partes', 'readwrite', s => s.put(blob, url + '#' + i));
  const lerParte = (url, i) => op('partes', 'readonly', s => s.get(url + '#' + i));

  async function baixados() {
    try {
      const todas = await op('meta', 'readonly', s => s.getAll());
      return (todas || []).filter(m => m.completo).map(m => ({ url: m.url, size: m.total }));
    } catch (e) { return []; }
  }

  // baixa em pedaços de 32 MB; se a internet cair, continua de onde parou na próxima vez
  async function baixar(url, aoProgresso) {
    let meta = (await lerMeta(url)) || { url, partes: 0, salvos: 0, total: 0, completo: false };
    if (meta.completo) return meta;
    const headers = meta.salvos ? { Range: 'bytes=' + meta.salvos + '-' } : {};
    const r = await fetch(url, { headers });
    if (!r.ok) throw Object.assign(new Error('não consegui baixar o modelo (HTTP ' + r.status + ')'), { status: r.status });
    if (meta.salvos && r.status !== 206) meta = { url, partes: 0, salvos: 0, total: 0, completo: false };   // servidor não continuou: recomeça
    const tam = +r.headers.get('content-length') || 0;
    meta.total = meta.salvos + tam;
    const leitor = r.body.getReader();
    let buf = [], nBuf = 0, ultimo = 0;
    const mb = x => (x / 1048576).toFixed(0);
    const mostrar = () => aoProgresso(`⬇️ Baixando o cérebro: ${meta.total ? Math.floor((meta.salvos + nBuf) / meta.total * 100) : 0}% (${mb(meta.salvos + nBuf)} de ${mb(meta.total)} MB)`);
    const descarregar = async () => {
      if (!nBuf) return;
      await gravarParte(url, meta.partes, new Blob(buf));
      meta.partes++; meta.salvos += nBuf; buf = []; nBuf = 0;
      await gravarMeta(url, meta);
    };
    for (;;) {
      const { done, value } = await leitor.read();
      if (done) break;
      buf.push(value); nBuf += value.length;
      if (nBuf >= PEDACO) await descarregar();
      if (Date.now() - ultimo > 300) { ultimo = Date.now(); mostrar(); }
    }
    await descarregar();
    if (meta.total && meta.salvos < meta.total) throw new Error('download interrompido; tente de novo que ele continua de onde parou');
    meta.completo = true; meta.total = meta.salvos;
    await gravarMeta(url, meta);
    return meta;
  }
  async function abrir(url) {
    const meta = await lerMeta(url);
    const partes = [];
    for (let i = 0; i < meta.partes; i++) partes.push(await lerParte(url, i));
    return new Blob(partes);
  }

  // garante o modelo baixado e carregado; aoProgresso(texto) mostra o andamento
  async function preparar(aoProgresso) {
    const mod = escolhido();
    const m = await motor();
    if (carregadoUrl === mod.url && m.isModelLoaded()) return mod;
    const meta = await lerMeta(mod.url).catch(() => null);
    if (!meta || !meta.completo) {
      if (!(meta && meta.salvos) && !await dialogo(`Para conversar sem chave, o Nexo vai baixar o cérebro "${mod.nome}" (${mod.tamanho}) UMA VEZ e guardar no celular.\n\nDepois funciona até sem internet. Use Wi-Fi.`, { sim: 'Baixar', nao: 'Agora não' })) {
        throw Object.assign(new Error('Download cancelado. Você pode escolher outro tamanho em ⚙ → Nexo Local.'), { status: 0, local: true });
      }
      await baixar(mod.url, aoProgresso);
    }
    if (m.isModelLoaded()) { try { await m.exit(); } catch (e) { /* já fechado */ } w = null; await motor(); }
    aoProgresso('🧠 Carregando o cérebro na memória…');
    await w.loadModel([await abrir(mod.url)], { n_ctx: mod.ctx || 4096, n_batch: 256 });
    carregadoUrl = mod.url;
    return mod;
  }

  async function conversar(mensagens, { aoTexto, sinal, maxTokens }) {
    let texto = '';
    const fluxo = await w.createChatCompletion({ messages: mensagens, max_tokens: maxTokens || 1500, temperature: 0.7, top_p: 0.9, top_k: 40,
      stream: true, abortSignal: sinal });
    for await (const c of fluxo) {
      const d = c.choices && c.choices[0] && c.choices[0].delta;
      if (d && d.content) { texto += d.content; aoTexto(texto); }
    }
    return texto.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  }

  async function apagarTudo() {
    if (w && w.isModelLoaded()) { try { await w.exit(); } catch (e) { /* ok */ } w = null; carregadoUrl = null; }
    await op('meta', 'readwrite', s => s.clear());
    await op('partes', 'readwrite', s => s.clear());
  }

  return { MODELOS, escolhido, preparar, conversar, baixados, apagarTudo };
})();
