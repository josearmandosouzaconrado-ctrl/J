/* Voz do Nexo: ditado pelo microfone, respostas faladas e o modo assistente contínuo
 * (você fala, ele responde em voz alta e volta a ouvir). Usa o reconhecimento e a síntese de voz do Chrome. */
'use strict';
const Voz = (() => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const NATIVO = window.NexoNativo || null;            // no APK: voz do próprio Android
  const BOLHA = /[?&]bolha=1/.test(location.search);    // painel aberto pela bolha flutuante
  let podeOuvirNativo = false;
  try { podeOuvirNativo = !!(NATIVO && NATIVO.podeOuvir()); } catch (e) { /* sem ponte */ }
  const podeOuvir = podeOuvirNativo || !!SR, podeFalar = !!NATIVO || 'speechSynthesis' in window;
  // eventos que o Android manda para cá (window.NexoVoz.evento)
  let escuta = null, falaFim = null;
  window.NexoVoz = {
    evento(tipo, texto) {
      if (tipo === 'parcial' && escuta && escuta.aoParcial) escuta.aoParcial(texto);
      else if (tipo === 'final' && escuta) { const e = escuta; escuta = null; e.fim((texto || '').split('\n')[0].trim() || null); }
      else if (tipo === 'erro' && escuta) { const e = escuta; escuta = null; e.fim(texto === '9' ? { erro: 'permissao' } : null); }
      else if (tipo === 'fimFala' && falaFim) { const f = falaFim; falaFim = null; f(); }
      else if (tipo === 'bolha' && window.aoEventoBolha) window.aoEventoBolha(texto);
    },
  };
  let ativo = false, pausado = false, rec = null, vozes = [];

  const carregarVozes = () => { try { vozes = speechSynthesis.getVoices().filter(v => /^pt/i.test(v.lang)); } catch (e) { vozes = []; } };
  if (podeFalar) { carregarVozes(); speechSynthesis.onvoiceschanged = carregarVozes; }
  const escolherVoz = () => vozes.find(v => v.lang === 'pt-BR' && /google/i.test(v.name)) || vozes.find(v => v.lang === 'pt-BR') || vozes[0] || null;

  // transforma markdown em texto bom de ouvir
  function paraFala(t) {
    let s = String(t || '')
      .replace(/```[\s\S]*?(```|$)/g, ' (o código está na tela) ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\|\|([^|]+)\|\|/g, 'spoiler escondido')
      .replace(/^\s*\|.*\|\s*$/gm, '')
      .replace(/[*_#>`~|]/g, '')
      .replace(/^\s*[-•]\s+/gm, '')
      .replace(/\n{2,}/g, '. ').replace(/\n/g, ', ')
      .replace(/\s{2,}/g, ' ').trim();
    if (s.length > 700) s = s.slice(0, s.lastIndexOf('.', 650) + 1 || 650) + ' O resto está na tela.';
    return s;
  }

  function falar(texto) {
    return new Promise(fim => {
      if (!podeFalar || cfg.vozMudo) return fim();
      const s = paraFala(texto);
      if (!s) return fim();
      if (NATIVO) {
        if (falaFim) falaFim();
        falaFim = fim;
        try { NATIVO.falar(s, +cfg.vozVelocidade || 1.05); } catch (e) { falaFim = null; fim(); }
        return;
      }
      try { speechSynthesis.cancel(); } catch (e) { /* ok */ }
      // frases curtas: o Chrome do Android corta falas muito longas
      const partes = s.match(/[^.!?]+[.!?]*/g) || [s];
      let i = 0;
      const proxima = () => {
        if (i >= partes.length || !ativoOuDitado()) return fim();
        const u = new SpeechSynthesisUtterance(partes[i++].trim());
        u.lang = 'pt-BR';
        const v = escolherVoz(); if (v) u.voice = v;
        u.rate = +cfg.vozVelocidade || 1.05;
        u.onend = proxima; u.onerror = () => fim();
        speechSynthesis.speak(u);
      };
      proxima();
    });
  }
  let ditando = false;
  const ativoOuDitado = () => ativo || ditando;
  function calar() {
    if (NATIVO) { try { NATIVO.pararFala(); } catch (e) { /* ok */ } if (falaFim) { const f = falaFim; falaFim = null; f(); } return; }
    try { speechSynthesis.cancel(); } catch (e) { /* ok */ }
  }

  // ouve uma frase; mostra o texto parcial em aoParcial
  function ouvir(aoParcial) {
    return new Promise(fim => {
      if (!podeOuvir) return fim(null);
      if (podeOuvirNativo) {
        if (escuta) escuta.fim(null);
        escuta = { aoParcial, fim };
        try { NATIVO.ouvir(); } catch (e) { escuta = null; fim(null); }
        return;
      }
      let final = '', acabou = false;
      rec = new SR();
      rec.lang = 'pt-BR'; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 1;
      rec.onresult = e => {
        let parcial = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) final += e.results[i][0].transcript; else parcial += e.results[i][0].transcript;
        }
        if (aoParcial) aoParcial((final + ' ' + parcial).trim());
      };
      const terminar = v => { if (acabou) return; acabou = true; rec = null; fim(v); };
      rec.onerror = e => terminar(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? { erro: 'permissao' } : (final.trim() || null));
      rec.onend = () => terminar(final.trim() || null);
      try { rec.start(); } catch (e) { terminar(null); }
    });
  }
  function pararDeOuvir() {
    if (podeOuvirNativo) { try { NATIVO.pararOuvir(); } catch (e) { /* ok */ } if (escuta) { const e = escuta; escuta = null; e.fim(null); } return; }
    try { rec && rec.abort(); } catch (e) { /* ok */ }
  }

  // ---------- tela do assistente ----------
  const tela = () => $('#assistente');
  function estado(t, classe) {
    $('#asEstado').textContent = t;
    tela().dataset.estado = classe || '';
  }
  const nome = () => (cfg.nomeAssistente || 'Nexo').trim() || 'Nexo';
  const palavra = () => (cfg.vozPalavra || '').trim().toLowerCase();
  const DESPEDIDA = /^(tchau|at[ée] mais|pode parar|parar|desligar|desliga|encerrar|sair|obrigad[oa],? (é|e) s[óo] isso)\b/i;

  async function abrir(primeiro) {
    if (!podeOuvir) return avisar('O modo de voz precisa do reconhecimento de voz do Google Chrome.\n\nAbra o Nexo pelo site no Chrome (veja ⚙ → Assistente de voz) para conversar falando.');
    ativo = true; pausado = false;
    tela().classList.add('aberto');
    $('#asNome').textContent = nome();
    $('#asFalado').textContent = ''; $('#asResposta').textContent = ''; $('#asAcoes').innerHTML = '';
    if (!BOLHA && (!history.state || !history.state.painel)) history.pushState({ painel: '#assistente' }, '', '#p');
    if (typeof primeiro === 'string' && primeiro.trim()) laco(primeiro.trim());
    else { await falar(BOLHA ? 'Sim?' : saudacao()); laco(); }
  }
  function saudacao() {
    const h = new Date().getHours();
    const p = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    return `${p}! Aqui é ${nome()}. Em que posso ajudar?`;
  }
  function fechar(semHistorico) {
    if (!ativo) return;
    ativo = false; pararDeOuvir(); calar();
    if (BOLHA) { try { NATIVO.fecharPainel(); } catch (e) { /* ok */ } return; }
    tela().classList.remove('aberto');
    if (!semHistorico && history.state && history.state.painel === '#assistente') history.back();
  }
  async function laco(primeiro) {
    let vazios = 0;
    while (ativo) {
      if (pausado) { estado('Pausado — toque no círculo para continuar', 'pausado'); return; }
      let ouvido;
      if (primeiro) { ouvido = primeiro; primeiro = null; }
      else {
        estado('Ouvindo…', 'ouvindo');
        $('#asFalado').textContent = '';
        ouvido = await ouvir(t => { $('#asFalado').textContent = t; });
      }
      if (!ativo) return;
      if (!ouvido && BOLHA && vazios >= 1) return fechar();   // na bolha: silêncio fecha o painel e volta a esperar o nome
      if (ouvido && ouvido.erro === 'permissao') { estado('Sem permissão do microfone', ''); await avisar('Permita o uso do microfone para o site (ícone de cadeado ao lado do endereço → Permissões → Microfone).'); return fechar(); }
      if (!ouvido) { if (++vazios >= 3) { pausado = true; } continue; }
      vazios = 0;
      let texto = ouvido;
      if (palavra() && !BOLHA) {
        const i = texto.toLowerCase().indexOf(palavra());
        if (i < 0) continue;                                   // não chamou pelo nome: ignora
        texto = texto.slice(i + palavra().length).replace(/^[\s,.!?]+/, '');
        if (!texto) { await falar('Sim?'); continue; }
      }
      $('#asFalado').textContent = texto;
      if (DESPEDIDA.test(texto)) { estado('Até mais!', ''); await falar('Até mais!'); return fechar(); }
      estado('Pensando…', 'pensando');
      $('#asResposta').textContent = ''; $('#asAcoes').innerHTML = '';
      const r = await enviar(texto, { voz: true });
      if (!ativo) return;
      const resposta = r ? r.texto : 'Não consegui responder agora.';
      $('#asResposta').textContent = paraFala(resposta);
      const acoes = (r && r.cartoes || []).filter(c => c.tipo === 'acao' || c.tipo === 'video' || c.tipo === 'jogo');
      if (acoes.length) $('#asAcoes').appendChild(desenharCartoes(acoes.slice(0, 4)));
      estado('Falando…', 'falando');
      await falar(resposta);
      if (r && r.fecharDepois) return fechar();            // abriu um app ou jogo: sai do caminho
    }
  }

  // ditado de uma frase pelo botão 🎤 da caixa de texto
  async function ditar() {
    if (!podeOuvir) return avisar('O ditado por voz funciona no site do Nexo aberto no Google Chrome (⚙ → Assistente de voz).');
    if (ditando) { pararDeOuvir(); return; }
    ditando = true;
    const b = $('#btnMic'); b.classList.add('gravando');
    const antes = elTexto.value;
    const t = await ouvir(p => { elTexto.value = (antes ? antes + ' ' : '') + p; ajustarAltura(); });
    b.classList.remove('gravando');
    if (t && !t.erro) {
      elTexto.value = '';
      const r = await enviar((antes ? antes + ' ' : '') + t, { voz: !!cfg.vozResponder });
      if (r && cfg.vozResponder) await falar(r.texto);
    } else if (t && t.erro) avisar('Permita o uso do microfone para o site nas configurações do Chrome.');
    else elTexto.value = antes;
    ditando = false;
  }

  function iniciar() {
    $('#btnMic').onclick = ditar;
    $('#btnJarvis').onclick = abrir;
    $('#asFechar').onclick = () => fechar();
    $('#asMudo').onclick = () => { cfg.vozMudo = !cfg.vozMudo; guardar('nexo_cfg', cfg); $('#asMudo').textContent = cfg.vozMudo ? '🔇' : '🔊'; if (cfg.vozMudo) calar(); };
    $('#asMudo').textContent = cfg.vozMudo ? '🔇' : '🔊';
    $('#asOrbe').onclick = () => {
      if (tela().dataset.estado === 'falando') { calar(); return; }          // toque interrompe a fala
      if (pausado) { pausado = false; laco(); }
    };
    addEventListener('popstate', () => { if (ativo && !BOLHA) fechar(true); });
    if (!podeOuvir) { $('#btnMic').classList.add('semVoz'); }
    if (BOLHA) {
      document.documentElement.classList.add('bolha');
      window.NexoBolha = {
        ativar(comando) { if (ativo) { pararDeOuvir(); calar(); ativo = false; } abrir(comando || ''); },
        desativar() { ativo = false; pararDeOuvir(); calar(); },
      };
    }
  }

  return { podeOuvir, podeFalar, NATIVO, BOLHA, abrir, fechar, falar, ditar, iniciar, paraFala, ativo: () => ativo, ditando: () => ditando };
})();
Voz.iniciar();
