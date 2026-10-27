import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { ATRIBUTOS, DIFICULDADES, POSICOES } from "./config.js";
import { TIMES, time, SELECOES, selecao, sementeSelecao } from "./data.js";
import { Partida, getPartida, temEspacoInventario } from "./match.js";
import { getEstadio, origemEstadio, construirEstadio } from "./stadium.js";
import { dinheiro, escolher } from "./util.js";
import * as C from "./career.js";
import * as M from "./midia.js";
import * as W from "./mundial.js";

const POS_CARREIRA = ["ATA", "MEI", "ZAG"];
const ic = (n) => `textures/ui/fut/${n}`;
const ICONES = {
  bola: ic("bola"),
  chute: "textures/items/fut_chute",
  jogar: ic("jogar"),
  simular: ic("simular"),
  tabela: ic("tabela"),
  copa: ic("copa"),
  mundo: ic("mundo"),
  treino: ic("treino"),
  loja: ic("loja"),
  perfil: ic("perfil"),
  celular: ic("celular"),
  config: ic("config"),
  apagar: ic("apagar"),
  estadio: ic("estadio"),
  ajuda: ic("ajuda"),
  voltar: ic("voltar"),
  trofeu: ic("premio"),
  entrevista: ic("entrevista"),
  noticias: ic("noticias"),
  mensagens: ic("mensagens"),
  rede: ic("rede"),
  agenda: ic("agenda"),
  banco: ic("banco"),
  apito: ic("apito"),
};
const SEP = "§8------------------------------";

const esperar = (ticks) => new Promise((res) => system.runTimeout(res, ticks));

function valido(p) {
  try {
    return !!p && p.isValid();
  } catch {
    return false;
  }
}

async function mostrar(player, form) {
  for (let i = 0; i < 40; i++) {
    if (!valido(player)) return { canceled: true };
    const r = await form.show(player);
    if (r.canceled && r.cancelationReason === "UserBusy") {
      await esperar(10);
      continue;
    }
    return r;
  }
  return { canceled: true };
}

/** Botão de menu: título em destaque e subtítulo menor. */
const btn = (titulo, sub = "") => (sub ? `§l${titulo}§r\n§8${sub}` : `§l${titulo}`);

/** Formulário de botões: recebe [texto, ícone, ação] e executa a ação escolhida. */
async function menu(player, titulo, corpo, botoes) {
  const f = new ActionFormData().title(titulo).body(corpo);
  for (const [txt, icone] of botoes) {
    if (icone) f.button(txt, icone);
    else f.button(txt);
  }
  const r = await mostrar(player, f);
  if (r.canceled || r.selection === undefined) return;
  const acao = botoes[r.selection]?.[2];
  if (acao) await acao();
}

async function confirmar(player, titulo, corpo, sim = "§2Confirmar", nao = "§4Cancelar") {
  const f = new ActionFormData().title(titulo).body(corpo).button(sim, ICONES.jogar).button(nao, ICONES.apagar);
  const r = await mostrar(player, f);
  return !r.canceled && r.selection === 0;
}

function nomeClube(id) {
  const t = time(id);
  return `${t.cor}${t.nome}§r`;
}

function barra(v, tam = 10) {
  const n = Math.round((v / 100) * tam);
  const cor = v >= 85 ? "§a" : v >= 70 ? "§e" : v >= 55 ? "§6" : "§c";
  return `${cor}${"|".repeat(n)}§8${"|".repeat(tam - n)}§r ${v}`;
}

const STATS_PADRAO = { vel: 65, chu: 65, pas: 65, dri: 65, def: 65, fis: 65 };

// ---------------------------------------------------------------- menu principal

export async function abrirMenu(player) {
  const p = getPartida();
  if (p && p.atorDoJogador(player)) return menuPartida(player, p);
  const est = getEstadio();
  const c = C.carregar(player);
  const ativa = c && !c.aposentado;
  const corpo = [
    "§l§2FUTEBOL CRAFT",
    "§7Jogue com e contra NPCs, dispute ligas, copas e a Copa do Mundo!",
    SEP,
    est ? `§fEstádio: §a${est.x}, ${est.y}, ${est.z}` : "§eSem estádio ainda: comece em §lEstádio§r§e.",
    ativa ? `§fCarreira: §b${c.nome} §7(${nomeClube(c.clube)}§7, OVR §a${C.overall(c)}§7)` : "§7Nenhuma carreira ativa.",
  ].join("\n");
  const botoes = [
    [btn("Modo Carreira", ativa ? `${time(c.clube).nome} - temporada ${c.temporada}` : "Crie seu jogador"), ICONES.trofeu, () => menuCarreira(player)],
    [btn("Partida Rápida", "Clubes ou seleções, até 7x7"), ICONES.jogar, () => menuPartidaRapida(player)],
    [btn("Treino de Finalização", "60 segundos contra o goleiro"), ICONES.chute, () => iniciarTreino(player)],
  ];
  if (ativa) botoes.push([btn("Celular", `${M.naoLidas(c)} mensagem(ns) nova(s)`), ICONES.celular, () => abrirCelular(player)]);
  botoes.push([btn("Estádio", "Construir ou visitar"), ICONES.estadio, () => menuEstadio(player)]);
  botoes.push([btn("Como Jogar", "Controles e dicas"), ICONES.ajuda, () => menuAjuda(player)]);
  await menu(player, "§lFutebol Craft", corpo, botoes);
}

async function menuPartida(player, p) {
  await menu(player, "Partida em andamento", `${p.placarTexto()}\n§7${p.minuto()}' - ${p.o.rotulo ?? ""}`, [
    [btn("Continuar jogando"), ICONES.jogar],
    [
      btn("§4Desistir da partida", "Encerra o jogo agora"),
      ICONES.apagar,
      async () => {
        const aviso = p.modo === "carreira" ? "Na carreira, desistir conta como derrota por W.O. (0x3)." : "A partida será encerrada.";
        if (await confirmar(player, "Desistir?", aviso)) p.finalizar("desistencia");
      },
    ],
  ]);
}

async function menuAjuda(player) {
  const txt = [
    "§l§eComeçando",
    "§f1. Num lugar plano, use §2Estádio > Construir aqui§f.",
    "§f2. Abra o §bMenu do Futebol§f e escolha um modo.",
    SEP,
    "§l§eControles (barra 1 a 5)",
    "§e[1] CHUTE§f: toque = chute normal. §lSegure§r§f para encher a barra de força e solte.",
    "§7    Mire no gol: a mira ajuda a corrigir. Olhe para cima para chutar alto.",
    "§a[2] PASSE§f: toque = passe rasteiro para quem está na mira. Segure = lançamento.",
    "§d[3] DRIBLE§f: arrancada. Com a bola, você fica imune a desarmes por 1 segundo.",
    "§c[4] DESARME§f: bote para roubar a bola do adversário.",
    "§6[5] PEDIR§f: o companheiro com a bola toca para você.",
    "§fBater na bola também chuta. Encostar na bola solta domina. Agachar protege a bola.",
    "§fA barra de ação mostra o placar e os botões úteis em cada momento.",
    SEP,
    "§l§eCarreira",
    "§fLiga com 10 clubes, Copa Craft, Copa do Mundo a cada 4 temporadas,",
    "§fentrevistas depois dos jogos e o §bCelular§f com rede social, mensagens e notícias.",
    "§fSua §emoral§f muda seus atributos em campo (até ±5).",
    SEP,
    "§7/scriptevent fut:menu  |  /scriptevent fut:item",
  ].join("\n");
  await menu(player, "Como Jogar", txt, [[btn("Voltar"), ICONES.voltar, () => abrirMenu(player)]]);
}

// ---------------------------------------------------------------- estádio

async function menuEstadio(player) {
  const est = getEstadio();
  const botoes = [
    [
      btn("Construir aqui", "63 x 45 blocos centrado em você"),
      ICONES.estadio,
      async () => {
        if (getPartida()) return player.sendMessage("§cTermine a partida atual antes de construir.");
        const ok = await confirmar(
          player,
          "Construir estádio",
          "O estádio (63 x 45 blocos) será construído centrado em você.\n\n§cTodos os blocos da área serão substituídos!§r\n\nProcure um terreno plano e aberto.",
          "§2Construir",
        );
        if (ok) construirEstadio(player);
      },
    ],
  ];
  if (est) {
    botoes.push([
      btn("Ir para o estádio"),
      ICONES.jogar,
      () => player.teleport({ x: est.x + 0.5, y: est.y + 0.1, z: est.z + 0.5 }, { dimension: world.getDimension(est.dim) }),
    ]);
  }
  botoes.push([btn("Voltar"), ICONES.voltar, () => abrirMenu(player)]);
  await menu(player, "Estádio", est ? `Estádio atual em §a${est.x}, ${est.y}, ${est.z}` : "Nenhum estádio construído ainda.", botoes);
}

function prepararPartida(players) {
  const est = getEstadio();
  if (!est) {
    players[0].sendMessage("§c[Futebol] Construa um estádio primeiro (Menu > Estádio).");
    return null;
  }
  if (getPartida()) {
    players[0].sendMessage("§c[Futebol] Já existe uma partida em andamento.");
    return null;
  }
  const sem = players.filter((p) => !temEspacoInventario(p));
  if (sem.length) {
    for (const p of sem) p.sendMessage("§c[Futebol] Libere espaço no inventário (os itens da barra 1-5 são guardados na mochila).");
    return null;
  }
  return { dimension: world.getDimension(est.dim), origem: origemEstadio(est) };
}

/** Dados de time para o motor da partida: clube (número) ou seleção (código). */
function infoTime(id, rating, temporada = 1) {
  if (typeof id === "string") {
    const s = selecao(id);
    return { timeId: s.kit, kit: s.kit, semente: sementeSelecao(s.id), nomes: s.grupo, nome: s.nome, sigla: s.id, cor: s.cor, rating, temporada };
  }
  const t = time(id);
  return { timeId: id, nome: t.nome, sigla: t.sigla, cor: t.cor, rating, temporada };
}

// ---------------------------------------------------------------- partida rápida

async function menuPartidaRapida(player) {
  const opcoes = [...TIMES.map((t) => ({ id: t.id, nome: t.nome, rating: t.rating })), ...SELECOES.map((s) => ({ id: s.id, nome: `${s.nome} (seleção)`, rating: s.rating }))];
  const outros = world.getAllPlayers().filter((p) => p.id !== player.id);
  const c = C.carregar(player);
  const f = new ModalFormData()
    .title("Partida Rápida")
    .dropdown("Seu time", opcoes.map((o) => o.nome), c && !c.aposentado ? c.clube : 2)
    .dropdown("Adversário", opcoes.map((o) => o.nome), 6)
    .dropdown("Formato", ["5 contra 5", "7 contra 7"], 0)
    .slider("Duração (minutos reais)", 2, 10, 1, 4)
    .dropdown("Dificuldade", DIFICULDADES.map((d) => d.nome), 1)
    .dropdown("Sua posição", POS_CARREIRA.map((p) => POSICOES[p]), c ? Math.max(0, POS_CARREIRA.indexOf(c.posicao)) : 0);
  if (outros.length) f.toggle(`Incluir outros jogadores online (${outros.length})`, false);
  const r = await mostrar(player, f);
  if (r.canceled || !r.formValues) return;
  const [ta, tbRaw, fmt, dur, dif, pos, incluir] = r.formValues;
  const tb = tbRaw === ta ? (ta + 1) % opcoes.length : tbRaw;

  const participantes = [player, ...(incluir ? outros : [])];
  const base = prepararPartida(participantes);
  if (!base) return;

  const humanos = participantes.map((p, i) => {
    const cc = C.carregar(p);
    const stats = cc ? { ...cc.attr } : { ...STATS_PADRAO };
    const papel = i === 0 ? POS_CARREIRA[pos] : cc?.posicao ?? "MEI";
    return { player: p, time: i % 2 === 0 ? 0 : 1, papel, stats, nome: cc?.nome ?? p.name, numero: cc?.numero ?? 10 + i };
  });
  const ajuste = humanos.some((h) => h.time === 1) ? 0 : DIFICULDADES[dif].ajuste;
  new Partida({
    ...base,
    modo: "rapida",
    times: [infoTime(opcoes[ta].id, opcoes[ta].rating), infoTime(opcoes[tb].id, opcoes[tb].rating + ajuste)],
    tamanho: fmt === 0 ? 5 : 7,
    humanos,
    duracaoSeg: dur * 60,
    rotulo: "Partida Rápida",
    aoTerminar: async (res) => {
      await esperar(30);
      for (const h of res.humanos) if (valido(h.player)) resumoPartida(h.player, res, null, null);
    },
  }).iniciar();
}

// ---------------------------------------------------------------- treino

async function iniciarTreino(player) {
  const base = prepararPartida([player]);
  if (!base) return;
  const c = C.carregar(player);
  const ativa = c && !c.aposentado;
  const clube = ativa ? c.clube : 2;
  const adv = escolher(TIMES.filter((t) => t.id !== clube)).id;
  const valeRecompensa = ativa && c.treinoIdx !== `${c.temporada}:${c.idx}`;
  if (ativa && !valeRecompensa) player.sendMessage("§7[Futebol] Você já treinou nesta rodada: este treino não dará pontos.");
  new Partida({
    ...base,
    modo: "treino",
    times: [infoTime(clube, 70), infoTime(adv, ativa ? c.ratings[adv] : 70)],
    tamanho: 5,
    humanos: [{
      player,
      time: 0,
      papel: "ATA",
      stats: ativa ? C.statsEmCampo(c) : { ...STATS_PADRAO },
      nome: ativa ? c.nome : player.name,
      numero: ativa ? c.numero : 9,
    }],
    duracaoSeg: 60,
    rotulo: "Treino de Finalização",
    aoTerminar: async (res) => {
      if (!valido(player) || res.abandonada) return;
      const gols = res.placar[0];
      const linhas = [`§fGols marcados: §a${gols}`, `§fChutes: §e${res.humanos[0]?.est.chutes ?? 0}`];
      if (valeRecompensa) {
        const cc = C.carregar(player);
        if (cc) {
          const pts = Math.min(5, Math.floor(gols / 2));
          cc.pontos += pts;
          cc.treinoIdx = `${cc.temporada}:${cc.idx}`;
          M.ajustar(cc, { tecnico: Math.min(4, gols) });
          C.salvar(player, cc);
          linhas.push(`§b+${pts} pontos de treino §7(1 a cada 2 gols, máx. 5)`, `§a+${Math.min(4, gols)} relação com o técnico`);
        }
      }
      await esperar(30);
      await menu(player, "Fim do treino", linhas.join("\n"), [[btn("OK"), ICONES.voltar, () => (ativa ? menuCarreira(player) : abrirMenu(player))]]);
    },
  }).iniciar();
}

// ---------------------------------------------------------------- carreira

async function menuCarreira(player) {
  const c = C.carregar(player);
  if (!c) return criarCarreira(player);
  if (c.aposentado) return telaAposentado(player, c);

  const msgs = C.pularEventosSemJogo(c);
  if (msgs.length) {
    C.salvar(player, c);
    for (const m of msgs) player.sendMessage(m);
  }
  if (C.temporadaAcabou(c)) return fluxoFimDaLiga(player, c);

  const prox = C.proximoJogo(c);
  const ovr = C.overall(c);
  const t = c.liga.tabela[c.clube];
  const media = c.temp.jogos ? (c.temp.notaSoma / c.temp.jogos).toFixed(1) : "-";
  const sel = selecao(c.nacionalidade);
  const faltam = (2 - (c.temporada % 4) + 4) % 4;
  const copaEm = faltam === 0 ? "§6nesta temporada!" : `na temporada ${c.temporada + faltam}`;
  const corpo = [
    `§l§b${c.nome}§r §7#${c.numero} | ${POSICOES[c.posicao]} | ${c.idade} anos | ${sel.cor}${sel.nome}`,
    `${nomeClube(c.clube)} §7| §fOVR §a${ovr} §7| §fTemporada §e${c.temporada}`,
    SEP,
    `§6§lPRÓXIMO JOGO`,
    `§f${prox.rotulo}`,
    `${nomeClube(c.clube)} §fx ${nomeClube(prox.adversario)} §7(${prox.casa ? "em casa" : "fora"})`,
    SEP,
    `§fLiga: §e${C.posicaoNaLiga(c)}º§f (${t.p} pts) §7| §fCopa Craft: ${c.copa.vivo ? "§avivo" : "§celiminado"}`,
    `§fTemporada: §e${c.temp.jogos}§fJ §a${c.temp.gols}§fG §b${c.temp.assist}§fA §7| §fmédia §e${media}`,
    `§fMoral ${barra(c.midia.moral, 8)}  §fTorcida ${barra(c.midia.torcida, 8)}`,
    `§fTreino: §b${c.pontos} pts §7| §a${dinheiro(c.dinheiro)} §7| §fCopa do Mundo ${copaEm}`,
  ].join("\n");

  const novas = M.naoLidas(c);
  await menu(player, "Modo Carreira", corpo, [
    [btn("§2Jogar partida", `${time(c.clube).sigla} x ${time(prox.adversario).sigla}`), ICONES.jogar, () => jogarPartidaCarreira(player)],
    [btn("Simular partida", "Rápido, rende menos pontos"), ICONES.simular, () => simularPartidaCarreira(player)],
    [btn("Celular", novas ? `§c${novas} nova(s)§8 | ${M.formatarNumero(c.midia.seguidores)} seguidores` : `${M.formatarNumero(c.midia.seguidores)} seguidores`), ICONES.celular, () => abrirCelular(player)],
    [btn("Classificação", "Liga Craft"), ICONES.tabela, () => telaClassificacao(player)],
    [btn("Copa Craft", "Mata-mata"), ICONES.copa, () => telaCopa(player)],
    [btn("Treinar", `${c.pontos} pontos disponíveis`), ICONES.treino, () => telaTreino(player)],
    [btn("Loja", dinheiro(c.dinheiro)), ICONES.loja, () => telaLoja(player)],
    [btn("Perfil e Troféus", `${c.trofeus.length} troféu(s)`), ICONES.perfil, () => telaPerfil(player)],
    [btn("Configurações"), ICONES.config, () => telaConfig(player)],
    [btn("§4Encerrar carreira"), ICONES.apagar, () => telaEncerrar(player)],
    [btn("Voltar"), ICONES.voltar, () => abrirMenu(player)],
  ]);
}

/** Depois da última rodada: Copa do Mundo (se for ano de Copa) e então fim de temporada. */
async function fluxoFimDaLiga(player, c) {
  if (W.anoDeCopa(c) && c.mundial?.edicao !== c.temporada) {
    const convocado = W.iniciarMundial(c, C.overall(c));
    if (!convocado) W.simularResto(c);
    C.salvar(player, c);
    return telaConvocacao(player, c, convocado);
  }
  if (c.mundial?.edicao === c.temporada && !c.mundial.encerrado) {
    const m = c.mundial;
    if (m.fase === "fim" || !m.convocado || m.eliminado) {
      W.simularResto(c);
      W.encerrarMundial(c);
      C.salvar(player, c);
      return telaFimMundial(player, c);
    }
    return menuMundial(player, c);
  }
  return fimDeTemporada(player, c);
}

async function criarCarreira(player) {
  const iniciais = [...TIMES].sort((a, b) => a.rating - b.rating).slice(0, 4);
  const f = new ModalFormData()
    .title("Nova Carreira")
    .textField("Nome do jogador", "Ex.: Zico Craft", player.name)
    .dropdown("Nacionalidade (para a Copa do Mundo)", SELECOES.map((s) => s.nome), 0)
    .dropdown("Posição", POS_CARREIRA.map((p) => POSICOES[p]), 0)
    .slider("Número da camisa", 1, 99, 1, 9)
    .dropdown("Clube inicial (base)", iniciais.map((t) => `${t.nome} (${t.rating})`), 0)
    .dropdown("Dificuldade", DIFICULDADES.map((d) => d.nome), 1)
    .slider("Duração das partidas (minutos reais)", 2, 10, 1, 4)
    .dropdown("Formato", ["5 contra 5", "7 contra 7"], 0);
  const r = await mostrar(player, f);
  if (r.canceled || !r.formValues) return;
  const [nome, nac, pos, numero, clubeIdx, dif, dur, fmt] = r.formValues;
  const c = C.novaCarreira({
    nome: String(nome).trim().slice(0, 20) || player.name,
    nacionalidade: SELECOES[nac].id,
    posicao: POS_CARREIRA[pos],
    numero,
    clube: iniciais[clubeIdx].id,
    dificuldade: dif,
    duracao: dur,
    tamanho: fmt === 0 ? 5 : 7,
  });
  M.mensagem(c, "Presidente do clube", "Bem-vindo!", `Seja bem-vindo ao ${time(c.clube).nome}, ${c.nome}! A torcida está ansiosa para ver você jogar.`);
  M.mensagem(c, "Empresário", "Seu celular novo", "Use o BolaGram para ganhar seguidores e patrocínios. Mas cuidado com o que você posta!");
  M.noticia(c, `${time(c.clube).nome} apresenta a promessa ${c.nome}, de ${SELECOES[nac].nome}`);
  C.salvar(player, c);
  player.sendMessage(`§a[Futebol] Bem-vindo ao ${nomeClube(c.clube)}§a, ${c.nome}! Sua carreira começa agora.`);
  player.playSound("random.levelup");
  await menuCarreira(player);
}

function ctxMidia(c, adv, dados, extra) {
  return { ...dados, adv: { nome: adv.nome, sigla: adv.sigla }, meu: { nome: extra.meuNome, sigla: extra.meuSigla }, rotulo: extra.rotulo, mataMata: extra.mataMata, selecao: extra.selecao };
}

async function jogarPartidaCarreira(player) {
  const c = C.carregar(player);
  const prox = C.proximoJogo(c);
  if (!prox || prox.adversario === undefined) return menuCarreira(player);
  const base = prepararPartida([player]);
  if (!base) return;
  const chave = `${c.temporada}:${c.idx}`;
  new Partida({
    ...base,
    modo: "carreira",
    times: [infoTime(c.clube, c.ratings[c.clube], c.temporada), infoTime(prox.adversario, c.ratings[prox.adversario] + DIFICULDADES[c.config.dificuldade].ajuste, c.temporada)],
    tamanho: c.config.tamanho,
    humanos: [{ player, time: 0, papel: c.posicao, stats: C.statsEmCampo(c), nome: c.nome, numero: c.numero }],
    duracaoSeg: c.config.duracao * 60,
    rotulo: prox.rotulo,
    aoTerminar: (res) => posPartidaCarreira(player, res, chave),
  }).iniciar();
}

function dadosDoResultado(res) {
  if (res.motivo === "desistencia") return { golsPro: 0, golsContra: 3, gols: 0, assist: 0, nota: 3, simulado: false, wo: true };
  const h = res.humanos[0];
  return { golsPro: res.placar[0], golsContra: res.placar[1], gols: h.est.gols, assist: h.est.assist, nota: h.nota, simulado: false };
}

async function posPartidaCarreira(player, res, chave) {
  if (!valido(player)) return;
  const c = C.carregar(player);
  if (!c || `${c.temporada}:${c.idx}` !== chave) return;
  if (res.motivo === "erro" || res.motivo === "abandono") {
    player.sendMessage("§e[Futebol] A partida foi interrompida e não contou. Você pode jogá-la de novo.");
    return;
  }
  const prox = C.proximoJogo(c);
  const dados = dadosDoResultado(res);
  await concluirJogoClube(player, c, prox, dados, res);
}

async function simularPartidaCarreira(player) {
  const c = C.carregar(player);
  const prox = C.proximoJogo(c);
  if (!prox || prox.adversario === undefined) return menuCarreira(player);
  const sim = C.simularJogoDoJogador(c, DIFICULDADES[c.config.dificuldade].ajuste);
  const res = {
    placar: [sim.golsPro, sim.golsContra],
    times: [infoTime(c.clube, 0), infoTime(prox.adversario, 0)],
    eventos: [],
    craque: null,
    humanos: [{ player, nome: c.nome, est: { gols: sim.gols, assist: sim.assist }, nota: sim.nota }],
    simulada: true,
  };
  await concluirJogoClube(player, c, prox, { ...sim, simulado: true }, res);
}

/** Registra o jogo do clube, gera reações na mídia, mostra o resumo e a entrevista. */
async function concluirJogoClube(player, c, prox, dados, res) {
  const rel = C.registrarJogo(c, dados);
  const adv = time(prox.adversario);
  const ctx = ctxMidia(c, adv, dados, { meuNome: time(c.clube).nome, meuSigla: time(c.clube).sigla, rotulo: prox.rotulo, mataMata: prox.mataMata });
  M.reagirAoJogo(c, ctx);
  if (prox.tipo === "liga") M.noticiasDaRodada(c, C.classificacao(c));
  const ent = M.gerarEntrevista(c, ctx);
  C.salvar(player, c);
  if (!res.simulada) await esperar(30);
  await resumoPartida(player, res, rel, prox, dados, () => (ent ? telaEntrevista(player, ent, () => menuCarreira(player)) : menuCarreira(player)));
}

async function resumoPartida(player, res, rel, prox, dados, continuar = null) {
  const [t0, t1] = res.times;
  const [g0, g1] = res.placar;
  const linhas = [];
  if (prox) linhas.push(`§7${prox.rotulo}${res.simulada ? " (simulada)" : ""}`);
  linhas.push(`§l${t0.cor}${t0.nome} §f${g0} x ${g1} ${t1.cor}${t1.nome}§r`);
  const venc = g0 > g1 ? "§2§lVITÓRIA" : g0 < g1 ? "§4§lDERROTA" : "§6§lEMPATE";
  linhas.push(dados?.wo ? "§4Derrota por W.O." : venc);
  if (res.eventos?.length) linhas.push(SEP);
  for (const e of res.eventos ?? []) {
    const t = res.times[e.time];
    linhas.push(`§7${e.min}' ${t.cor}${t.sigla}§r ${e.contra ? `§7(contra) ${e.autor}` : e.autor}${e.assist ? ` §8(assist. ${e.assist})` : ""}`);
  }
  const h = res.humanos.find((x) => x.player?.id === player.id) ?? res.humanos[0];
  if (h) {
    linhas.push(SEP);
    linhas.push(`§fSua nota: §e§l${h.nota.toFixed(1)}`);
    const e = h.est;
    let s = `§fGols §a${e.gols} §7| §fAssist. §b${e.assist}`;
    if (e.passesTent !== undefined) s += ` §7| §fPasses §e${e.passes}/${e.passesTent} §7| §fDesarmes §e${e.desarmes} §7| §fChutes §e${e.chutes}`;
    linhas.push(s);
  }
  if (res.craque) linhas.push(`§6Craque do jogo: §f${res.craque.nome} (${res.craque.nota.toFixed(1)})`);
  if (rel) {
    linhas.push(SEP, "§l§eRecompensas", ...rel.recompensa);
    if (rel.linhas.length) linhas.push(SEP, "§l§eOutros resultados", ...rel.linhas);
  }
  const voltar = continuar ?? (rel ? () => menuCarreira(player) : () => abrirMenu(player));
  await menu(player, "Fim de Jogo", linhas.join("\n"), [[btn("Continuar"), ICONES.jogar, voltar]]);
}

const TONS = [
  ["§2A - Humilde", ICONES.rede],
  ["§9B - Confiante", ICONES.trofeu],
  ["§4C - Polêmico", ICONES.apito],
];

async function telaEntrevista(player, ent, depois) {
  const corpo = [
    `§l§e${ent.veiculo.toUpperCase()}`,
    `§7Repórter: ${ent.reporter}`,
    SEP,
    `§f"${ent.pergunta}"`,
    SEP,
    ...ent.opcoes.map((o, i) => `${TONS[i][0]}§r§f: "${o.texto}"`),
  ].join("\n");
  const botoes = ent.opcoes.map((_, i) => [btn(TONS[i][0]), TONS[i][1], () => i]);
  botoes.push([btn("§8Recusar entrevista", "A imprensa não vai gostar"), ICONES.apagar, () => -1]);
  const f = new ActionFormData().title("Entrevista").body(corpo);
  for (const [t, icone] of botoes) f.button(t, icone);
  const r = await mostrar(player, f);
  const escolha = r.canceled || !botoes[r.selection] ? -1 : botoes[r.selection][2]();
  const c = C.carregar(player);
  const efeitos = M.responderEntrevista(c, ent, escolha);
  C.salvar(player, c);
  player.sendMessage(`§e[Entrevista] §7${M.descreverEfeitos(efeitos) || "sem efeito"}`);
  await depois();
}

async function telaClassificacao(player) {
  const c = C.carregar(player);
  const linhas = ["§7Pos  Time    Pts   J   V  E  D   SG"];
  C.classificacao(c).forEach((l, i) => {
    const t = time(l.id);
    const eu = l.id === c.clube ? "§l" : "";
    const sg = l.gp - l.gc;
    linhas.push(`${eu}§f${i + 1}. ${t.cor}${t.sigla}§r${eu}  §f${l.p} pts  §7${l.j}J ${l.v}V ${l.e}E ${l.d}D  SG ${sg > 0 ? "+" : ""}${sg}§r`);
  });
  const a = c.liga.artilheiro;
  linhas.push(SEP, `§6Artilheiro: §f${a.nome || "-"} ${a.sigla ? `(${a.sigla})` : ""} - ${a.gols} gols`, `§bVocê: §f${c.temp.gols} gols`);
  await menu(player, "Liga Craft", linhas.join("\n"), [[btn("Voltar"), ICONES.voltar, () => menuCarreira(player)]]);
}

async function telaCopa(player) {
  const c = C.carregar(player);
  const linhas = [];
  if (c.copa.campeao !== null) linhas.push(`§6Campeão: ${nomeClube(c.copa.campeao)}`);
  else linhas.push(c.copa.vivo ? "§aSeu time está na disputa!" : "§cSeu time foi eliminado.");
  if (c.copa.confrontos.length) {
    const ev = c.calendario.slice(c.idx).find((e) => e.t === "C");
    linhas.push(SEP, `§e${ev ? C.FASES_COPA[ev.f] : "Próxima fase"}:`);
    for (const [a, b] of c.copa.confrontos) linhas.push(`  ${nomeClube(a)} §7x ${nomeClube(b)}`);
  }
  for (const r of [...c.copa.resultados].reverse()) {
    linhas.push(SEP, `§e${r.fase}:`);
    for (const j of r.jogos) linhas.push(`  ${j}`);
  }
  await menu(player, "Copa Craft", linhas.join("\n"), [[btn("Voltar"), ICONES.voltar, () => menuCarreira(player)]]);
}

async function telaTreino(player) {
  const c = C.carregar(player);
  const corpo = `§fPontos de treino: §b${c.pontos}\n§fOVR atual: §a${C.overall(c)}\n\n§7Custo por ponto: até 69 = 1, 70-79 = 2, 80-89 = 3, 90+ = 4.`;
  const botoes = Object.entries(ATRIBUTOS).map(([k, nome]) => {
    const custo = C.custoTreino(c.attr[k]);
    return [
      `§l${nome}§r ${barra(c.attr[k])}\n§8+1 custa ${custo === Infinity ? "MÁX" : custo}`,
      ICONES.treino,
      async () => {
        const cc = C.carregar(player);
        if (C.treinar(cc, k)) {
          C.salvar(player, cc);
          player.playSound("random.orb");
        } else {
          player.sendMessage("§c[Futebol] Pontos de treino insuficientes.");
        }
        await telaTreino(player);
      },
    ];
  });
  botoes.push([btn("Treino de finalização", "Mini-jogo: ganhe pontos"), ICONES.chute, () => iniciarTreino(player)]);
  botoes.push([btn("Voltar"), ICONES.voltar, () => menuCarreira(player)]);
  await menu(player, "Centro de Treinamento", corpo, botoes);
}

async function telaLoja(player) {
  const c = C.carregar(player);
  const botoes = C.LOJA.map((item) => {
    const comprado = !item.repetivel && c.compras[item.id];
    return [
      `§l${item.nome}§r ${comprado ? "§2(comprado)" : `§2${dinheiro(item.preco)}`}\n§8${item.desc}`,
      item.attr ? ICONES.loja : ICONES.treino,
      async () => {
        const cc = C.carregar(player);
        const erro = C.comprar(cc, item.id);
        if (erro) player.sendMessage(`§c[Futebol] ${erro}`);
        else {
          C.salvar(player, cc);
          player.sendMessage(`§a[Futebol] Você comprou ${item.nome}!`);
          player.playSound("random.levelup");
        }
        await telaLoja(player);
      },
    ];
  });
  botoes.push([btn("Voltar"), ICONES.voltar, () => menuCarreira(player)]);
  await menu(player, "Loja", `§fDinheiro: §a${dinheiro(c.dinheiro)}`, botoes);
}

function nomeTrofeu(t) {
  const onde = t.selecao ? selecao(t.selecao).nome : time(t.clube).sigla;
  return `§6* §f${t.nome} §7(T${t.temporada}, ${onde})`;
}

async function telaPerfil(player) {
  const c = C.carregar(player);
  const total = c.total;
  const sel = selecao(c.nacionalidade);
  const linhas = [
    `§l§b${c.nome}§r §7#${c.numero} - ${sel.cor}${sel.nome}`,
    `§f${POSICOES[c.posicao]}, ${c.idade} anos - ${nomeClube(c.clube)}`,
    `§fOVR: §a${C.overall(c)} §7| §fSalário: §a${dinheiro(c.salario)}/jogo`,
    SEP,
    ...Object.entries(ATRIBUTOS).map(([k, n]) => `§f${n}: ${barra(c.attr[k])}`),
    SEP,
    `§fMoral ${barra(c.midia.moral)} §7(${C.statsEmCampo(c).chu - c.attr.chu >= 0 ? "+" : ""}${C.statsEmCampo(c).chu - c.attr.chu} em campo)`,
    `§fTorcida ${barra(c.midia.torcida)}`,
    `§fTécnico ${barra(c.midia.tecnico)}`,
    SEP,
    `§l§eCarreira§r: ${total.jogos} jogos, ${total.gols} gols, ${total.assist} assist., ${total.vitorias} vitórias`,
    `§fSeleção: ${c.selecaoTotal.jogos} jogos, ${c.selecaoTotal.gols} gols`,
    `§fMédia geral: §e${total.jogos ? (total.notaSoma / total.jogos).toFixed(2) : "-"}`,
    SEP,
    `§l§6Troféus (${c.trofeus.length})`,
    ...(c.trofeus.length ? c.trofeus.map(nomeTrofeu) : ["§7Nenhum ainda."]),
    SEP,
    "§l§eHistórico",
    ...(c.historico.length
      ? c.historico.map((h) => `§7T${h.temporada} ${time(h.clube).sigla}: §f${h.jogos}J ${h.gols}G ${h.assist}A, média ${h.media}, ${h.pos}º`)
      : ["§7Primeira temporada em andamento."]),
  ];
  await menu(player, "Perfil", linhas.join("\n"), [[btn("Voltar"), ICONES.voltar, () => menuCarreira(player)]]);
}

async function telaConfig(player) {
  const c = C.carregar(player);
  const f = new ModalFormData()
    .title("Configurações da Carreira")
    .dropdown("Dificuldade", DIFICULDADES.map((d) => d.nome), c.config.dificuldade)
    .slider("Duração das partidas (minutos reais)", 2, 10, 1, c.config.duracao)
    .dropdown("Formato", ["5 contra 5", "7 contra 7"], c.config.tamanho === 7 ? 1 : 0)
    .dropdown("Nacionalidade", SELECOES.map((s) => s.nome), Math.max(0, SELECOES.findIndex((s) => s.id === c.nacionalidade)));
  const r = await mostrar(player, f);
  if (!r.canceled && r.formValues) {
    const [dif, dur, fmt, nac] = r.formValues;
    c.config = { dificuldade: dif, duracao: dur, tamanho: fmt === 0 ? 5 : 7 };
    if (!c.mundial || c.mundial.encerrado || c.mundial.edicao !== c.temporada) c.nacionalidade = SELECOES[nac].id;
    C.salvar(player, c);
    player.sendMessage("§a[Futebol] Configurações salvas.");
  }
  await menuCarreira(player);
}

async function telaEncerrar(player) {
  await menu(player, "Encerrar carreira", "§fO que deseja fazer?", [
    [
      btn("§6Aposentar-se", "Mantém o histórico"),
      ICONES.trofeu,
      async () => {
        if (!(await confirmar(player, "Aposentar", "Você vai pendurar as chuteiras. Tem certeza?"))) return menuCarreira(player);
        const c = C.carregar(player);
        C.aposentar(c);
        C.salvar(player, c);
        await telaAposentado(player, c);
      },
    ],
    [
      btn("§4Apagar carreira", "Não pode ser desfeito"),
      ICONES.apagar,
      async () => {
        if (!(await confirmar(player, "Apagar carreira", "§cTodos os dados da carreira serão apagados."))) return menuCarreira(player);
        C.apagar(player);
        player.sendMessage("§e[Futebol] Carreira apagada.");
        await abrirMenu(player);
      },
    ],
    [btn("Voltar"), ICONES.voltar, () => menuCarreira(player)],
  ]);
}

async function telaAposentado(player, c) {
  const total = c.total;
  const corpo = [
    `§l§6${c.nome} - Lenda aposentada`,
    `§f${total.jogos} jogos, §a${total.gols} gols§f, §b${total.assist} assistências`,
    `§fSeguidores: §d${M.formatarNumero(c.midia.seguidores)}`,
    `§fTroféus: §6${c.trofeus.length}`,
    ...c.trofeus.map(nomeTrofeu),
  ].join("\n");
  await menu(player, "Fim de Carreira", corpo, [
    [
      btn("§2Começar nova carreira"),
      ICONES.trofeu,
      async () => {
        if (await confirmar(player, "Nova carreira", "A carreira atual será substituída.")) {
          C.apagar(player);
          await criarCarreira(player);
        }
      },
    ],
    [btn("Voltar"), ICONES.voltar, () => abrirMenu(player)],
  ]);
}

async function fimDeTemporada(player, c) {
  const res = C.encerrarTemporada(c);
  C.salvar(player, c);
  const linhas = [
    `§l§eFim da Temporada ${c.temporada}`,
    SEP,
    `§fCampeão da Liga: ${nomeClube(res.campeao)}`,
    `§fCampeão da Copa: ${res.campeaoCopa !== null ? nomeClube(res.campeaoCopa) : "-"}`,
    `§fSeu clube terminou em §e${res.pos}º`,
    `§fSua temporada: ${c.temp.jogos} jogos, ${c.temp.gols} gols, ${c.temp.assist} assist., média ${res.media}`,
    `§fArtilheiro NPC: ${res.artilheiro.nome || "-"} (${res.artilheiro.gols} gols)`,
    SEP,
    res.premios.length ? "§l§6Conquistas:" : "§7Nenhum troféu nesta temporada.",
    ...res.premios.map((p) => `§6* ${p}`),
  ];
  if (res.premios.length) player.playSound("random.totem");
  await menu(player, "Fim de Temporada", linhas.join("\n"), [[btn("Continuar", "Janela de transferências"), ICONES.jogar, () => telaPropostas(player)]]);
}

async function telaPropostas(player) {
  const c = C.carregar(player);
  const botoes = c.ofertas.map((o) => [
    btn(time(o.clube).nome, `força ${c.ratings[o.clube]} | ${dinheiro(o.salario)}/jogo`),
    ICONES.perfil,
    () => iniciarNovaTemporada(player, o),
  ]);
  botoes.push([btn(`Ficar no ${time(c.clube).nome}`, "Renovar contrato"), ICONES.voltar, () => iniciarNovaTemporada(player, null)]);
  const corpo = c.ofertas.length
    ? `§fVocê recebeu §e${c.ofertas.length}§f proposta(s)!\n§7Salário atual: ${dinheiro(c.salario)}/jogo, força do clube ${c.ratings[c.clube]}.`
    : "§7Nenhuma proposta nesta janela. Aumente sua reputação jogando bem!";
  await menu(player, "Janela de Transferências", corpo, botoes);
}

async function iniciarNovaTemporada(player, oferta) {
  const c = C.carregar(player);
  if (!C.temporadaAcabou(c)) return menuCarreira(player);
  C.encerrarTemporada(c);
  const clubeAntigo = c.clube;
  const msgs = C.novaTemporada(c, oferta);
  if (oferta) {
    M.noticia(c, `Mercado: ${c.nome} troca o ${time(clubeAntigo).nome} pelo ${time(c.clube).nome}`);
    M.mensagem(c, "Presidente do clube", "Contrato assinado", `Bem-vindo ao ${time(c.clube).nome}! Esperamos títulos.`);
    M.ajustar(c, { seguidoresPct: 10 });
    c.midia.torcida = 50; // torcida nova, começa do zero
  }
  if (!c.aposentado) M.mensagem(c, "Mãe", "Feliz aniversário!", `Parabéns pelos ${c.idade} anos, meu filho! Te amo. Boa temporada!`);
  C.salvar(player, c);
  for (const m of msgs) player.sendMessage(`§7[Futebol] ${m}`);
  if (c.aposentado) return telaAposentado(player, c);
  player.sendMessage(`§a[Futebol] Começa a temporada ${c.temporada}! Boa sorte, ${c.nome}.`);
  await menuCarreira(player);
}

// ---------------------------------------------------------------- Copa do Mundo

async function telaConvocacao(player, c, convocado) {
  const sel = selecao(c.nacionalidade);
  const m = c.mundial;
  const g = m.grupos.findIndex((x) => x.includes(sel.id));
  const corpo = convocado
    ? [
        "§l§6VOCÊ FOI CONVOCADO!",
        `§fA seleção de ${sel.cor}${sel.nome}§f conta com você na Copa do Mundo.`,
        SEP,
        `§eGrupo ${"ABCD"[g]}: §f${m.grupos[g].map(W.nomeSel).join("§7, ")}`,
        "",
        "§7Fase de grupos (3 jogos), depois quartas, semifinal e final.",
      ].join("\n")
    : [
        "§l§7Fora da Copa",
        `§f${sel.nome} não te convocou desta vez.`,
        "§7É preciso OVR 70 ou reputação 40 (OVR 65 em seleções mais fracas).",
        SEP,
        `§fCampeão do mundo: ${W.nomeSel(m.campeao)}`,
      ].join("\n");
  if (convocado) player.playSound("random.totem");
  await menu(player, "Copa do Mundo", corpo, [[btn("Continuar"), ICONES.mundo, () => menuCarreira(player)]]);
}

async function menuMundial(player, c) {
  const m = c.mundial;
  const prox = W.proximoJogoMundial(c);
  if (!prox) return menuCarreira(player);
  const sel = selecao(c.nacionalidade);
  const corpo = [
    `§l§6COPA DO MUNDO §r§7- ${W.FASES[m.fase]}`,
    `§fVocê defende ${sel.cor}§l${sel.nome}`,
    SEP,
    `§6§lPRÓXIMO JOGO`,
    `§f${prox.rotulo}`,
    `${W.nomeSel(sel.id)} §fx ${W.nomeSel(prox.adversario)}`,
    SEP,
    `§fNa Copa: §e${m.jogador.jogos}§fJ §a${m.jogador.gols}§fG §b${m.jogador.assist}§fA`,
    `§fArtilheiro: ${m.artilheiro.nome} (${m.artilheiro.sel}) - ${m.artilheiro.gols} gols`,
  ].join("\n");
  await menu(player, "Copa do Mundo", corpo, [
    [btn("§2Jogar partida", `${sel.id} x ${prox.adversario}`), ICONES.jogar, () => jogarMundial(player)],
    [btn("Simular partida"), ICONES.simular, () => simularMundial(player)],
    [btn("Grupos e chaveamento"), ICONES.tabela, () => telaGruposMundial(player)],
    [btn("Celular", `${M.naoLidas(c)} nova(s)`), ICONES.celular, () => abrirCelular(player)],
    [btn("Voltar"), ICONES.voltar, () => abrirMenu(player)],
  ]);
}

async function telaGruposMundial(player) {
  const c = C.carregar(player);
  const m = c.mundial;
  const linhas = [];
  m.grupos.forEach((_, g) => {
    linhas.push(`§e§lGrupo ${"ABCD"[g]}`);
    W.tabelaGrupo(m, g).forEach((l, i) => linhas.push(`§f${i + 1}. ${W.nomeSel(l.id)} §f${l.p} pts §7(${l.j}J, SG ${l.gp - l.gc})`));
  });
  if (m.confrontos.length) {
    linhas.push(SEP, `§e§l${W.FASES[m.fase]}`);
    for (const [a, b] of m.confrontos) linhas.push(`  ${W.nomeSel(a)} §7x ${W.nomeSel(b)}`);
  }
  for (const r of [...m.resultados].reverse().slice(0, 3)) {
    linhas.push(SEP, `§7${r.fase}:`);
    for (const j of r.jogos) linhas.push(`  ${j}`);
  }
  await menu(player, "Copa do Mundo", linhas.join("\n"), [[btn("Voltar"), ICONES.voltar, () => menuCarreira(player)]]);
}

function infoSelecaoJogador(c) {
  const sel = selecao(c.nacionalidade);
  const r = c.mundial.ratings[sel.id];
  return infoTime(sel.id, Math.round(r + (C.overall(c) - r) * 0.12), c.temporada);
}

async function jogarMundial(player) {
  const c = C.carregar(player);
  const prox = W.proximoJogoMundial(c);
  if (!prox) return menuCarreira(player);
  const base = prepararPartida([player]);
  if (!base) return;
  const chave = `${c.temporada}:${c.mundial.fase}:${c.mundial.rodada}`;
  new Partida({
    ...base,
    modo: "carreira",
    times: [infoSelecaoJogador(c), infoTime(prox.adversario, c.mundial.ratings[prox.adversario] + DIFICULDADES[c.config.dificuldade].ajuste, c.temporada)],
    tamanho: c.config.tamanho,
    humanos: [{ player, time: 0, papel: c.posicao, stats: C.statsEmCampo(c), nome: c.nome, numero: c.numero }],
    duracaoSeg: c.config.duracao * 60,
    rotulo: prox.rotulo,
    aoTerminar: async (res) => {
      if (!valido(player)) return;
      const cc = C.carregar(player);
      if (!cc?.mundial || `${cc.temporada}:${cc.mundial.fase}:${cc.mundial.rodada}` !== chave) return;
      if (res.motivo === "erro" || res.motivo === "abandono") return player.sendMessage("§e[Futebol] A partida foi interrompida e não contou.");
      await esperar(30);
      await concluirJogoMundial(player, cc, prox, dadosDoResultado(res), res);
    },
  }).iniciar();
}

async function simularMundial(player) {
  const c = C.carregar(player);
  const prox = W.proximoJogoMundial(c);
  if (!prox) return menuCarreira(player);
  const meu = infoSelecaoJogador(c);
  const sim = C.simularDesempenho(c, meu.rating, c.mundial.ratings[prox.adversario], true);
  const res = {
    placar: [sim.golsPro, sim.golsContra],
    times: [meu, infoTime(prox.adversario, 0)],
    eventos: [],
    craque: null,
    humanos: [{ player, nome: c.nome, est: { gols: sim.gols, assist: sim.assist }, nota: sim.nota }],
    simulada: true,
  };
  await concluirJogoMundial(player, c, prox, { ...sim, simulado: true }, res);
}

async function concluirJogoMundial(player, c, prox, dados, res) {
  const sel = selecao(c.nacionalidade);
  const linhas = W.registrarJogoMundial(c, dados);
  const venceu = dados.golsPro > dados.golsContra;
  const premio = (venceu ? 3000 : 1000) + dados.gols * 800;
  const pts = dados.simulado ? 1 : 1 + Math.min(2, dados.gols) + (dados.nota >= 7.5 ? 1 : 0);
  c.dinheiro += premio;
  c.pontos += pts;
  const adv = selecao(prox.adversario);
  // "time da Argentina", "time do Brasil": encaixa nas frases "do ___" / "contra o ___"
  const ctx = ctxMidia(c, { nome: `time ${adv.de} ${adv.nome}`, sigla: adv.id }, dados, {
    meuNome: `time ${sel.de} ${sel.nome}`, meuSigla: sel.id, rotulo: prox.rotulo, mataMata: prox.mataMata, selecao: true,
  });
  M.reagirAoJogo(c, ctx);
  const ent = M.gerarEntrevista(c, ctx);
  C.salvar(player, c);
  const rel = { recompensa: [`§b+${pts} pontos de treino`, `§a+R$ ${premio} §7(prêmio da federação)`], linhas };
  if (c.mundial.eliminado) rel.recompensa.push(`§c${sel.nome} foi eliminado da Copa.`);
  const seguir = () => menuCarreira(player);
  await resumoPartida(player, res, rel, prox, dados, () => (ent ? telaEntrevista(player, ent, seguir) : seguir()));
}

async function telaFimMundial(player, c) {
  const m = c.mundial;
  const sel = selecao(c.nacionalidade);
  const media = m.jogador.jogos ? (m.jogador.notaSoma / m.jogador.jogos).toFixed(1) : "-";
  const final = m.resultados[m.resultados.length - 1];
  const corpo = [
    "§l§6FIM DA COPA DO MUNDO",
    SEP,
    `§fCampeão: §l${W.nomeSel(m.campeao)}`,
    final ? `§7Final: ${final.jogos[0]}` : "",
    `§fArtilheiro NPC: ${m.artilheiro.nome} (${m.artilheiro.gols} gols)`,
    SEP,
    m.convocado ? `§fVocê por ${sel.cor}${sel.nome}§f: ${m.jogador.jogos} jogos, ${m.jogador.gols} gols, ${m.jogador.assist} assist., média ${media}` : "§7Você não foi convocado.",
    m.premios.length ? "§l§6Conquistas:" : "",
    ...m.premios.map((p) => `§6* ${p}`),
  ].join("\n");
  if (m.premios.length) player.playSound("random.totem");
  await menu(player, "Copa do Mundo", corpo, [[btn("Continuar", "Fim de temporada"), ICONES.jogar, () => menuCarreira(player)]]);
}

// ---------------------------------------------------------------- celular

export async function abrirCelular(player) {
  const c = C.carregar(player);
  if (!c || c.aposentado) return player.sendMessage("§7[Futebol] Crie uma carreira para usar o celular.");
  const novas = M.naoLidas(c);
  const corpo = [
    `§l§fCRAFTPHONE §r§7| ${c.nome}`,
    SEP,
    `§dBolaGram: §f${M.formatarNumero(c.midia.seguidores)} seguidores`,
    `§aMensagens: §f${novas ? `§c${novas} nova(s)` : "nenhuma nova"}`,
    `§eÚltima notícia: §f${c.midia.noticias[0]?.manchete ?? "-"}`,
  ].join("\n");
  await menu(player, "Celular", corpo, [
    [btn("BolaGram", "Rede social: feed e publicações"), ICONES.rede, () => appRede(player)],
    [btn("Mensagens", novas ? `§c${novas} não lida(s)` : "Caixa de entrada"), ICONES.mensagens, () => appMensagens(player)],
    [btn("Notícias", "Manchetes do futebol"), ICONES.noticias, () => appNoticias(player)],
    [btn("Agenda", "Próximos jogos"), ICONES.agenda, () => appAgenda(player)],
    [btn("Banco e Status", dinheiro(c.dinheiro)), ICONES.banco, () => appBanco(player)],
    [btn("Fechar"), ICONES.voltar],
  ]);
}

async function appRede(player) {
  const c = C.carregar(player);
  const handle = `@${c.nome.toLowerCase().replace(/\s+/g, "")}`;
  const feed = c.midia.feed.slice(0, 10).map((p) => `${p.cor}§l${p.autor}§r\n§f${p.texto} §8(${M.formatarNumero(p.curtidas)} curtidas)`);
  const corpo = [
    `§l§dBolaGram §r§7| ${handle}`,
    `§f${M.formatarNumero(c.midia.seguidores)} seguidores §7| ${c.midia.patrocinios} publi(s)`,
    SEP,
    ...(feed.length ? feed : ["§7Seu feed está vazio. Jogue partidas para movimentar a rede!"]),
  ].join("\n\n");
  const botoes = [];
  if (M.podePostar(c)) botoes.push([btn("§dPublicar", "1 post por rodada"), ICONES.rede, () => appPublicar(player)]);
  else botoes.push([btn("§8Publicar", "Você já postou nesta rodada"), ICONES.rede, () => appRede(player)]);
  botoes.push([btn("Voltar"), ICONES.voltar, () => abrirCelular(player)]);
  await menu(player, "BolaGram", corpo, botoes);
}

async function appPublicar(player) {
  const c = C.carregar(player);
  const ops = M.opcoesDePost(c);
  const botoes = ops.map((op) => [
    btn(op.nome, M.descreverEfeitos(op.efeitos).replace(/§./g, "")),
    ICONES.rede,
    async () => {
      const cc = C.carregar(player);
      if (!M.podePostar(cc)) return appRede(player);
      const texto = M.publicar(cc, op);
      C.salvar(player, cc);
      player.playSound("random.pop");
      player.sendMessage(`§d[BolaGram] §fVocê postou: §7"${texto}" §8(${M.descreverEfeitos(op.efeitos)}§8)`);
      await appRede(player);
    },
  ]);
  botoes.push([btn("Cancelar"), ICONES.voltar, () => appRede(player)]);
  await menu(player, "Nova publicação", "§fO que você quer postar?\n§7Cada post mexe com seguidores, torcida, moral e com o técnico.", botoes);
}

async function appMensagens(player) {
  const c = C.carregar(player);
  const botoes = c.midia.mensagens.map((m, i) => [
    btn(`${m.lida ? "§8" : "§c* §0"}${m.de}`, m.assunto),
    ICONES.mensagens,
    async () => {
      const cc = C.carregar(player);
      const msg = cc.midia.mensagens[i];
      if (msg) msg.lida = true;
      C.salvar(player, cc);
      await menu(player, msg?.de ?? "Mensagem", `§l${msg?.assunto ?? ""}§r\n§7Temporada ${msg?.temp ?? "-"}\n${SEP}\n§f${msg?.texto ?? ""}`, [[btn("Voltar"), ICONES.voltar, () => appMensagens(player)]]);
    },
  ]);
  botoes.push([btn("Voltar"), ICONES.voltar, () => abrirCelular(player)]);
  await menu(player, "Mensagens", c.midia.mensagens.length ? "§7Toque numa conversa para ler." : "§7Nenhuma mensagem.", botoes);
}

async function appNoticias(player) {
  const c = C.carregar(player);
  const linhas = c.midia.noticias.map((n) => `§e* §f${n.manchete} §8(T${n.temp})`);
  await menu(player, "Notícias", linhas.length ? linhas.join("\n\n") : "§7Sem notícias ainda.", [[btn("Voltar"), ICONES.voltar, () => abrirCelular(player)]]);
}

async function appAgenda(player) {
  const c = C.carregar(player);
  const linhas = [];
  for (let i = c.idx; i < c.calendario.length && linhas.length < 6; i++) {
    const ev = c.calendario[i];
    if (ev.t === "L") {
      const jogo = c.liga.rodadas[ev.r].find((j) => j.includes(c.clube));
      const adv = jogo[0] === c.clube ? jogo[1] : jogo[0];
      linhas.push(`§fRodada ${ev.r + 1}: §7${jogo[0] === c.clube ? "casa" : "fora"} §fvs ${nomeClube(adv)}`);
    } else {
      linhas.push(`§6Copa Craft - ${C.FASES_COPA[ev.f]}${c.copa.vivo ? "" : " §8(eliminado)"}`);
    }
  }
  if (!linhas.length) linhas.push("§7Fim do calendário da liga.");
  const prox = c.mundial && !c.mundial.encerrado ? W.proximoJogoMundial(c) : null;
  if (prox) linhas.unshift(`§6${prox.rotulo}: §fvs ${W.nomeSel(prox.adversario)}`);
  if (W.anoDeCopa(c) && !c.mundial?.encerrado) linhas.push(SEP, "§6Copa do Mundo depois da última rodada!");
  await menu(player, "Agenda", linhas.join("\n"), [[btn("Voltar"), ICONES.voltar, () => abrirCelular(player)]]);
}

async function appBanco(player) {
  const c = C.carregar(player);
  const corpo = [
    `§fSaldo: §a§l${dinheiro(c.dinheiro)}`,
    `§fSalário: §a${dinheiro(c.salario)}/jogo`,
    `§fPatrocínios publicados: §e${c.midia.patrocinios}`,
    SEP,
    `§fMoral    ${barra(c.midia.moral)}`,
    `§fTorcida  ${barra(c.midia.torcida)}`,
    `§fTécnico  ${barra(c.midia.tecnico)}`,
    `§fReputação ${barra(c.reputacao)}`,
    SEP,
    "§7Moral alta melhora seus atributos em campo. Torcida e técnico",
    "§7reagem às suas entrevistas, posts e atuações.",
  ].join("\n");
  await menu(player, "Banco e Status", corpo, [[btn("Voltar"), ICONES.voltar, () => abrirCelular(player)]]);
}
