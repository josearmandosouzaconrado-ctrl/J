// Conteúdo procedural da carreira: entrevistas, rede social (BolaGram), notícias e mensagens.
import { time } from "./data.js";
import { clamp, escolher, randInt, embaralhar } from "./util.js";

const MAX_FEED = 18;
const MAX_NOTICIAS = 14;
const MAX_MENSAGENS = 16;

export const VEICULOS = ["Gazeta da Bola", "Diário do Craque", "Rádio Arquibancada", "TV Gol", "Lance Craft", "Jornal do Apito", "Canal Resenha"];
const REPORTERES = ["Galvão Pixel", "Mauro Redstone", "Juca Bloco", "Renata Creeper", "Tati Ender", "Cléber Picareta", "Milton Bigorna"];
const JORNALISTAS = ["@juca_bloco", "@renata.fut", "@milton_comenta", "@tati_resenha", "@galvao_pixel", "@lance_craft"];
const PREFIXOS_FAS = ["fiel", "ultra", "doido", "raiz", "torcedor", "rei", "mago", "brabo", "vovo", "fanatico"];

/** Valores iniciais de mídia (também usados para migrar carreiras antigas). */
export function midiaInicial() {
  return {
    moral: 60,
    torcida: 50,
    tecnico: 60,
    seguidores: 150,
    feed: [],
    noticias: [],
    mensagens: [],
    postIdx: "",
    sequencia: "",
    patrocinios: 0,
  };
}

function fa(sigla) {
  return `@${escolher(PREFIXOS_FAS)}_${sigla.toLowerCase()}${randInt(1, 99)}`;
}

function curtidas(seg, fator = 1) {
  return Math.max(1, Math.round(seg * (0.04 + Math.random() * 0.1) * fator));
}

export function formatarNumero(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")} mi`;
  if (n >= 10_000) return `${Math.round(n / 1000)} mil`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".", ",")} mil`;
  return String(n);
}

function postar(c, autor, texto, fator = 1, cor = "§f") {
  c.midia.feed.unshift({ autor, texto, curtidas: curtidas(c.midia.seguidores, fator), cor, temp: c.temporada });
  c.midia.feed.length = Math.min(c.midia.feed.length, MAX_FEED);
}

export function noticia(c, manchete) {
  manchete = manchete.charAt(0).toUpperCase() + manchete.slice(1);
  c.midia.noticias.unshift({ manchete, temp: c.temporada });
  c.midia.noticias.length = Math.min(c.midia.noticias.length, MAX_NOTICIAS);
}

export function mensagem(c, de, assunto, texto) {
  c.midia.mensagens.unshift({ de, assunto, texto, lida: false, temp: c.temporada });
  c.midia.mensagens.length = Math.min(c.midia.mensagens.length, MAX_MENSAGENS);
}

export function naoLidas(c) {
  return c.midia.mensagens.filter((m) => !m.lida).length;
}

/** Teto de seguidores: cresce com a reputação (rep 50 ~ 750 mil, rep 100 ~ 3 milhões). */
export function tetoSeguidores(c) {
  return 2000 + c.reputacao * c.reputacao * 300;
}

function limitarSeguidores(c) {
  const teto = tetoSeguidores(c);
  const m = c.midia;
  if (m.seguidores > teto) m.seguidores = Math.round(teto + (m.seguidores - teto) * 0.3);
  m.seguidores = Math.max(10, Math.round(m.seguidores));
}

export function ajustar(c, efeitos = {}) {
  const m = c.midia;
  for (const k of ["moral", "torcida", "tecnico"]) if (efeitos[k]) m[k] = clamp(m[k] + efeitos[k], 0, 100);
  if (efeitos.seguidores) m.seguidores = Math.max(10, Math.round(m.seguidores + efeitos.seguidores));
  if (efeitos.seguidoresPct) m.seguidores = Math.max(10, Math.round(m.seguidores * (1 + efeitos.seguidoresPct / 100)));
  if (efeitos.reputacao) c.reputacao = clamp(c.reputacao + efeitos.reputacao, 0, 100);
  if (efeitos.dinheiro) c.dinheiro += efeitos.dinheiro;
  limitarSeguidores(c);
}

export function descreverEfeitos(e) {
  const nomes = { moral: "moral", torcida: "torcida", tecnico: "técnico", reputacao: "reputação" };
  const partes = [];
  for (const [k, n] of Object.entries(nomes)) if (e[k]) partes.push(`${e[k] > 0 ? "§a+" : "§c"}${e[k]} ${n}`);
  if (e.seguidoresPct) partes.push(`${e.seguidoresPct > 0 ? "§a+" : "§c"}${e.seguidoresPct}% seguidores`);
  if (e.dinheiro) partes.push(`§a+R$ ${e.dinheiro}`);
  return partes.join("§7, ");
}

// ---------------------------------------------------------------- depois de cada jogo

/**
 * ctx: { golsPro, golsContra, gols, assist, nota, adv: {nome, sigla}, meu: {nome, sigla}, rotulo, mataMata, selecao, simulado, wo }
 */
export function reagirAoJogo(c, ctx) {
  const m = c.midia;
  const venceu = ctx.golsPro > ctx.golsContra;
  const perdeu = ctx.golsPro < ctx.golsContra;
  m.sequencia = (m.sequencia + (venceu ? "V" : perdeu ? "D" : "E")).slice(-6);

  // humor volta aos poucos para o normal; depois o jogo mexe nele
  m.moral += (60 - m.moral) * 0.2;
  m.torcida += (50 - m.torcida) * 0.06;
  m.tecnico += (55 - m.tecnico) * 0.08;
  for (const k of ["moral", "torcida", "tecnico"]) m[k] = Math.round(m[k]);
  // seguidores: crescem mais rápido longe do teto da sua fama
  const folga = clamp(1 - m.seguidores / tetoSeguidores(c), 0.05, 1);
  const ganho = ((ctx.nota - 5.5) * m.seguidores * 0.025 + ctx.gols * (60 + c.reputacao * 3) + (venceu ? 40 : 0) + (ctx.selecao ? 300 : 0)) * folga;
  m.seguidores = Math.max(10, m.seguidores + Math.max(-m.seguidores * 0.03, ganho));
  limitarSeguidores(c);
  m.moral = clamp(m.moral + (venceu ? 3 : perdeu ? -3 : 0) + (ctx.nota >= 8 ? 3 : ctx.nota < 5.5 ? -3 : 0), 0, 100);
  m.torcida = clamp(m.torcida + (ctx.nota >= 7.5 ? 2 : ctx.nota < 5.5 ? -2 : 0) + ctx.gols, 0, 100);
  m.tecnico = clamp(m.tecnico + (ctx.nota >= 7 ? 1 : ctx.nota < 5.5 ? -2 : 0), 0, 100);

  const placar = `${ctx.meu.sigla} ${ctx.golsPro} x ${ctx.golsContra} ${ctx.adv.sigla}`;
  const oficial = ctx.selecao ? `@${ctx.meu.sigla.toLowerCase()}_oficial` : `@${ctx.meu.sigla.toLowerCase()}oficial`;
  if (ctx.wo) {
    postar(c, oficial, `Comunicado: o jogo contra o ${ctx.adv.nome} terminou em W.O. Vamos apurar o ocorrido.`, 0.5, "§7");
    postar(c, fa(ctx.meu.sigla), `W.O.?! ${c.nome} sumiu do jogo? Que vergonha!`, 0.8, "§c");
    noticia(c, `Escândalo: ${ctx.meu.nome} perde por W.O. para o ${ctx.adv.nome}`);
    ajustar(c, { torcida: -6, tecnico: -6 });
    return;
  }
  const fim = venceu ? escolher(["VITÓRIA!", "É DO TIME!", "TRÊS PONTOS!"]) : perdeu ? "Fim de jogo." : "Empate.";
  postar(c, oficial, `${fim} ${placar}${ctx.gols ? ` - gol${ctx.gols > 1 ? "s" : ""} de ${c.nome}` : ""}.`, 1.2, "§b");

  const sig = ctx.meu.sigla;
  if (ctx.gols >= 3) {
    postar(c, fa(sig), `HAT-TRICK DO ${c.nome.toUpperCase()}!!! ESSE CARA É DE OUTRO PLANETA`, 3, "§6");
    postar(c, "@memes_da_bola", `O goleiro do ${ctx.adv.nome} depois de hoje: *pede demissão*`, 4, "§d");
  } else if (ctx.gols > 0) {
    postar(c, fa(sig), escolher([`Que golaço do ${c.nome}! Craque demais!`, `${c.nome} decidindo de novo. Renova logo!`, `Joga muito esse ${c.nome}, ídolo!`]), 1.5, "§a");
  }
  if (ctx.nota >= 8) postar(c, escolher(JORNALISTAS), `Atuação de gala de ${c.nome}: nota ${ctx.nota.toFixed(1)}. Merece chance maior.`, 1, "§e");
  else if (ctx.nota < 5.5) {
    postar(c, fa(sig), escolher([`${c.nome} hoje parecia um creeper perdido em campo...`, `Sai do time, ${c.nome}! Não dá mais!`, `Cadê o ${c.nome} da temporada passada?`]), 1, "§c");
    postar(c, escolher(JORNALISTAS), `${c.nome} vai mal (nota ${ctx.nota.toFixed(1)}) e vira alvo da torcida.`, 0.8, "§e");
  }
  if (ctx.gols > 0 && !ctx.selecao) postar(c, fa(ctx.adv.sigla), escolher([`Juiz ladrão! ${c.nome} tava impedido!`, `Sorte de principiante esse ${c.nome}...`, `Tomara que o ${c.nome} venha pro nosso time`]), 0.6, "§7");
  if (perdeu && Math.random() < 0.6) postar(c, fa(sig), escolher(["Time sem alma. Precisamos de reforços!", "Fora técnico! Essa tática não funciona!", "Dia triste. Mas eu não abandono!"]), 0.9, "§c");

  // notícias
  if (ctx.gols >= 2) noticia(c, `${c.nome} marca ${ctx.gols} vezes e ${venceu ? "garante vitória" : "não evita tropeço"} do ${ctx.meu.nome}`);
  else if (venceu && ctx.golsPro - ctx.golsContra >= 3) noticia(c, `Goleada! ${ctx.meu.nome} atropela o ${ctx.adv.nome} por ${ctx.golsPro} a ${ctx.golsContra}`);
  else if (perdeu && ctx.golsContra - ctx.golsPro >= 3) noticia(c, `Vexame: ${ctx.meu.nome} leva ${ctx.golsContra} do ${ctx.adv.nome}`);
  else if (ctx.mataMata) noticia(c, `${ctx.rotulo}: ${placar}`);
  if (m.sequencia.endsWith("DDD")) noticia(c, `Crise no ${ctx.meu.nome}: três derrotas seguidas`);
  if (m.sequencia.endsWith("VVVV")) noticia(c, `${ctx.meu.nome} embala quarta vitória seguida`);

  // mensagens
  if (ctx.nota >= 8.5 && Math.random() < 0.7) mensagem(c, "Técnico", "Parabéns!", `Que partida, ${c.nome}! É isso que eu quero ver. Continue assim no treino.`);
  else if (ctx.nota < 5 && Math.random() < 0.7) mensagem(c, "Técnico", "Precisamos conversar", "Sua atuação ficou abaixo. Quero mais entrega, senão vai para o banco.");
  if (Math.random() < 0.12) mensagem(c, "Mãe", "Assisti o jogo!", escolher(["Filho, vi você na TV! Estou tão orgulhosa. Come direito, hein?", "Não liga para as críticas, você é o melhor para mim!", "Seu avô ficou gritando 'é meu neto!' a cada lance."]));
  if (c.reputacao >= 25 && Math.random() < 0.1) {
    const outros = embaralhar([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((i) => i !== c.clube));
    mensagem(c, "Empresário", "Sondagens", `O ${time(outros[0]).nome} perguntou sobre você. Continue jogando bem que no fim da temporada chegam propostas.`);
  }
}

/** Notícias gerais da liga depois de uma rodada. */
export function noticiasDaRodada(c, tabelaOrdenada) {
  const lider = tabelaOrdenada[0];
  const lanterna = tabelaOrdenada[tabelaOrdenada.length - 1];
  const opcoes = [
    `${time(lider.id).nome} lidera a Liga Craft com ${lider.p} pontos`,
    `${time(lanterna.id).nome} afunda na lanterna e torcida protesta`,
    `Artilharia: ${c.liga.artilheiro.nome || "ninguém"} soma ${c.liga.artilheiro.gols} gols`,
  ];
  if (Math.random() < 0.6) noticia(c, escolher(opcoes));
}

// ---------------------------------------------------------------- entrevistas

function resp(texto, efeitos, manchete) {
  return { texto, efeitos, manchete };
}

/** Monta uma entrevista para o contexto do jogo (ou null se a imprensa não aparecer). */
export function gerarEntrevista(c, ctx) {
  if (ctx.wo) return null;
  const venceu = ctx.golsPro > ctx.golsContra;
  const perdeu = ctx.golsPro < ctx.golsContra;
  const grande = ctx.mataMata || ctx.selecao || ctx.gols >= 2;
  if (!grande && Math.random() > 0.5) return null;

  const N = c.nome;
  const meu = ctx.meu.nome;
  const adv = ctx.adv.nome;
  const bancos = [];

  if (ctx.selecao) {
    bancos.push({
      p: "Como é defender a seleção numa Copa do Mundo?",
      r: [
        resp("É um sonho de criança. Jogo por todo o povo do meu país.", { torcida: 4, moral: 3, seguidoresPct: 4 }, `${N}: "Jogo por todo o povo"`),
        resp("Vim para ser campeão. Não aceito menos que a taça.", { moral: 6, reputacao: 2, seguidoresPct: 6 }, `${N} promete o título mundial`),
        resp(`O ${adv}? Nem conheço o time deles.`, { seguidoresPct: 10, tecnico: -4, reputacao: -1 }, `Polêmica! ${N} esnoba o ${adv}`),
      ],
    });
  }
  if (ctx.gols >= 2) {
    bancos.push({
      p: `${ctx.gols} gols contra o ${adv}! Foi a melhor atuação da sua carreira?`,
      r: [
        resp("O mérito é do grupo. Sem os passes dos companheiros eu não faço nada.", { tecnico: 4, torcida: 2, moral: 2 }, `Humilde, ${N} divide os méritos com o elenco`),
        resp("Trabalho muito para isso. E ainda vem muito mais por aí!", { moral: 6, reputacao: 2, seguidoresPct: 5 }, `${N}: "Ainda vem muito mais por aí"`),
        resp(`O goleiro do ${adv} não viu a cor da bola hoje.`, { seguidoresPct: 12, torcida: 3, tecnico: -4, reputacao: -1 }, `${N} provoca o ${adv} após show`),
      ],
    });
  }
  if (venceu) {
    bancos.push({
      p: `Boa vitória do ${meu}. O time pode sonhar com o título?`,
      r: [
        resp("Pé no chão. É jogo a jogo, ainda falta muito.", { tecnico: 3, moral: 1 }, `${N} pede pé no chão no ${meu}`),
        resp("Pode! Esse grupo tem tudo para ser campeão.", { torcida: 4, moral: 4, seguidoresPct: 3 }, `${N} acredita no título do ${meu}`),
        resp("Com esse elenco? Só se eu fizer tudo sozinho...", { seguidoresPct: 8, tecnico: -6, torcida: -3 }, `Climão: ${N} critica elenco mesmo após vitória`),
      ],
    });
  }
  if (perdeu) {
    bancos.push({
      p: `O ${meu} perdeu para o ${adv}. O que faltou hoje?`,
      r: [
        resp("Faltou eficiência. Assumo minha parte e vamos corrigir no treino.", { tecnico: 4, torcida: 2, moral: -1 }, `${N} assume a culpa pela derrota`),
        resp("Foi um tropeço. Semana que vem a gente dá a resposta em campo.", { moral: 4, torcida: 1 }, `${N} promete reação do ${meu}`),
        resp("A arbitragem decidiu o jogo. Foi um assalto!", { seguidoresPct: 7, torcida: 3, tecnico: -2, reputacao: -2 }, `${N} detona a arbitragem após derrota`),
      ],
    });
  }
  if (!venceu && !perdeu) {
    bancos.push({
      p: `Empate com o ${adv}. Ficou um gosto amargo?`,
      r: [
        resp("Um ponto fora de casa também tem valor. Seguimos.", { tecnico: 3 }, `${N} valoriza empate do ${meu}`),
        resp("Ficou. A gente tinha que ter vencido, e eu também podia mais.", { moral: 2, torcida: 3 }, `${N} lamenta empate: "podia mais"`),
        resp("O adversário só se defendeu. Isso não é futebol.", { seguidoresPct: 6, tecnico: -2, reputacao: -1 }, `${N} reclama da retranca do ${adv}`),
      ],
    });
  }
  if (ctx.nota < 5.5) {
    bancos.push({
      p: "Parte da torcida vaiou sua atuação. Como você responde?",
      r: [
        resp("A torcida tem razão. Vou trabalhar o dobro para merecer o carinho.", { torcida: 5, tecnico: 2, moral: -2 }, `${N} pede desculpas à torcida`),
        resp("Fase ruim passa. Confio no meu futebol.", { moral: 4 }, `${N} confia na volta por cima`),
        resp("Quem vaia não entende nada de futebol.", { seguidoresPct: 6, torcida: -8, reputacao: -2 }, `${N} rebate vaias e irrita torcedores`),
      ],
    });
  }
  if (c.reputacao >= 25 && Math.random() < 0.4 && !ctx.selecao) {
    const clubes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((i) => i !== c.clube).sort((a, b) => c.ratings[b] - c.ratings[a]);
    const gigante = time(clubes[randInt(0, 2)]).nome;
    bancos.push({
      p: `Dizem que o ${gigante} quer te contratar. Pensa em sair do ${meu}?`,
      r: [
        resp(`Sou muito feliz no ${meu}. Meu foco é aqui.`, { torcida: 6, tecnico: 3 }, `${N} jura amor ao ${meu}`),
        resp("Estou aberto a propostas. Meu empresário cuida disso.", { reputacao: 3, torcida: -5 }, `${N} abre a porta para o ${gigante}`),
        resp(`Todo mundo sabe que eu nasci para jogar num gigante como o ${gigante}.`, { seguidoresPct: 8, torcida: -9, tecnico: -3, reputacao: 2 }, `Bomba: ${N} se declara ao ${gigante}`),
      ],
    });
  }
  if (!bancos.length) return null;
  const escolhida = escolher(bancos);
  return {
    veiculo: escolher(VEICULOS),
    reporter: escolher(REPORTERES),
    pergunta: escolhida.p,
    opcoes: escolhida.r,
  };
}

export function responderEntrevista(c, ent, i) {
  if (i < 0) {
    ajustar(c, { torcida: -2, reputacao: -1 });
    noticia(c, `${c.nome} se recusa a falar com a imprensa`);
    return { torcida: -2, reputacao: -1 };
  }
  const op = ent.opcoes[i];
  ajustar(c, op.efeitos);
  noticia(c, `${ent.veiculo}: ${op.manchete}`);
  const sig = time(c.clube).sigla;
  if ((op.efeitos.seguidoresPct ?? 0) >= 6) {
    postar(c, "@memes_da_bola", `"${op.texto}" - ${c.nome}, ${ent.veiculo}. A internet não perdoa`, 3, "§d");
    postar(c, fa(sig), escolher(["Falou o que todo mundo pensa! Pode isso?", "Ele não tem filtro kkkkk", "Precisava falar isso, craque?"]), 1, "§7");
  } else {
    postar(c, escolher(JORNALISTAS), `${c.nome} à ${ent.veiculo}: "${op.texto}"`, 0.8, "§e");
  }
  return op.efeitos;
}

// ---------------------------------------------------------------- publicações do jogador

export function opcoesDePost(c) {
  const ultimo = c.midia.sequencia.slice(-1);
  const ops = [];
  if (ultimo === "V") ops.push({ id: "comemorar", nome: "Foto comemorando a vitória", efeitos: { seguidoresPct: 4, moral: 3, torcida: 2 } });
  if (ultimo === "D") ops.push({ id: "desabafo", nome: "Desabafo depois da derrota", efeitos: { moral: 4, torcida: 2, seguidoresPct: 1 } });
  ops.push({ id: "torcida", nome: "Agradecer a torcida", efeitos: { torcida: 5, seguidoresPct: 2 } });
  ops.push({ id: "treino", nome: "Vídeo do treino pesado", efeitos: { tecnico: 4, moral: 1, seguidoresPct: 2 } });
  ops.push({ id: "provocar", nome: "Provocar o próximo adversário", efeitos: { seguidoresPct: 8, torcida: 3, tecnico: -5, moral: 2 } });
  ops.push({ id: "lifestyle", nome: "Foto de férias e carrão", efeitos: { seguidoresPct: 6, torcida: -3, tecnico: -1 } });
  if (c.midia.seguidores >= 1000) {
    const valor = Math.round(c.midia.seguidores * 0.8 / 100) * 100;
    ops.push({ id: "publi", nome: `Post patrocinado (+R$ ${valor})`, efeitos: { dinheiro: valor, torcida: -1, seguidoresPct: -1 } });
  }
  return ops;
}

const TEXTOS_POST = {
  comemorar: ["Que vitória! Obrigado a todos que acreditaram! #VamosJuntos", "Três pontos e sorriso no rosto. Bora pra próxima!"],
  desabafo: ["Hoje não deu. Mas eu prometo: vamos voltar mais fortes.", "Derrota dói, mas faz parte. Cabeça erguida."],
  torcida: ["Vocês são a razão de tudo. Obrigado, torcida! <3", "Arrepiei com o grito da arquibancada hoje. Obrigado!"],
  treino: ["Treino de hoje: 200 finalizações e muito suor. Sem atalhos.", "Enquanto vocês dormem, eu treino. Bom dia!"],
  provocar: ["Próximo jogo? Já pode ir separando a bola do jogo pra mim.", "Ouvi dizer que o próximo adversário está com medo. Faz bem."],
  lifestyle: ["Folga merecida. Vista bonita, carro novo.", "Dia de descanso no iate. A vida é boa."],
  publi: ["Só jogo com a chuteira BlocoMax! Use meu cupom CRAQUE10", "Hidratação de campeão: refrigerante PixelCola!"],
};

export function publicar(c, op) {
  const texto = escolher(TEXTOS_POST[op.id] ?? ["..."]);
  postar(c, `@${c.nome.toLowerCase().replace(/\s+/g, "")}`, texto, op.id === "provocar" ? 2.5 : 1.6, "§b");
  ajustar(c, op.efeitos);
  const sig = time(c.clube).sigla;
  if (op.id === "provocar") {
    postar(c, "@memes_da_bola", `${c.nome} provocou o rival... agora é bom fazer gol, hein?`, 2, "§d");
    noticia(c, `${c.nome} provoca adversário nas redes e esquenta o clássico`);
  } else if (op.id === "lifestyle") {
    postar(c, fa(sig), "Enquanto o time perde, o cara passeando de iate...", 1, "§c");
  } else if (op.id === "publi") {
    c.midia.patrocinios++;
  } else {
    postar(c, fa(sig), escolher(["Esse é o nosso camisa " + c.numero + "!", "Ídolo demais!", "Orgulho de ter você no time!"]), 1, "§a");
  }
  c.midia.postIdx = `${c.temporada}:${c.idx}`;
  return texto;
}

export function podePostar(c) {
  return c.midia.postIdx !== `${c.temporada}:${c.idx}`;
}
