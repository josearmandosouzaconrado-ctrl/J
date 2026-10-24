import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { ATRIBUTOS, DIFICULDADES, POSICOES } from "./config.js";
import { TIMES, time } from "./data.js";
import { Partida, getPartida, temEspacoInventario } from "./match.js";
import { getEstadio, origemEstadio, construirEstadio } from "./stadium.js";
import { dinheiro, escolher } from "./util.js";
import * as C from "./career.js";

const POS_CARREIRA = ["ATA", "MEI", "ZAG"];
const ICONES = {
  bola: "textures/items/fut_menu",
  chute: "textures/items/fut_chute",
  jogar: "textures/items/iron_sword",
  simular: "textures/items/book_writable",
  tabela: "textures/items/book_normal",
  copa: "textures/items/gold_ingot",
  treino: "textures/items/iron_boots",
  loja: "textures/items/emerald",
  perfil: "textures/items/paper",
  config: "textures/items/redstone_dust",
  apagar: "textures/blocks/barrier",
  estadio: "textures/blocks/grass_side_carried",
  ajuda: "textures/items/book_enchanted",
  voltar: "textures/items/arrow",
  trofeu: "textures/items/nether_star",
  diamante: "textures/items/diamond",
};

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

/** Formulário de botões: recebe [texto, ícone, ação] e executa a ação escolhida. */
async function menu(player, titulo, corpo, botoes) {
  const f = new ActionFormData().title(titulo).body(corpo);
  for (const [txt, icone] of botoes) {
    if (icone) f.button(txt, icone);
    else f.button(txt);
  }
  const r = await mostrar(player, f);
  if (r.canceled || r.selection === undefined) return;
  const acao = botoes[r.selection][2];
  if (acao) await acao();
}

async function confirmar(player, titulo, corpo, sim = "§aConfirmar", nao = "§cCancelar") {
  const f = new ActionFormData().title(titulo).body(corpo).button(sim).button(nao);
  const r = await mostrar(player, f);
  return !r.canceled && r.selection === 0;
}

function nomeClube(id) {
  const t = time(id);
  return `${t.cor}${t.nome}§r`;
}

// ---------------------------------------------------------------- menu principal

export async function abrirMenu(player) {
  const p = getPartida();
  if (p && p.atorDoJogador(player)) return menuPartida(player, p);
  const est = getEstadio();
  const c = C.carregar(player);
  const corpo = [
    "§l§aFUTEBOL CRAFT§r",
    "§7Jogue com e contra NPCs, dispute a Liga e a Copa e construa sua carreira!",
    "",
    est ? `§fEstádio: §a${est.x}, ${est.y}, ${est.z}` : "§eNenhum estádio construído. Comece em 'Estádio'.",
    c && !c.aposentado ? `§fCarreira: §b${c.nome}§f - ${nomeClube(c.clube)} §7(OVR ${C.overall(c)})` : "",
  ].join("\n");
  await menu(player, "§lFutebol Craft", corpo, [
    ["§lModo Carreira\n§r§8Liga, Copa, transferências", ICONES.trofeu, () => menuCarreira(player)],
    ["§lPartida Rápida\n§r§8Escolha os times", ICONES.jogar, () => menuPartidaRapida(player)],
    ["§lTreino de Finalização\n§r§860 segundos contra o goleiro", ICONES.chute, () => iniciarTreino(player)],
    ["§lEstádio\n§r§8Construir ou visitar", ICONES.estadio, () => menuEstadio(player)],
    ["§lComo Jogar", ICONES.ajuda, () => menuAjuda(player)],
  ]);
}

async function menuPartida(player, p) {
  await menu(player, "Partida em andamento", `${p.placarTexto()}\n§7${p.minuto()}' - ${p.o.rotulo ?? ""}`, [
    ["§aContinuar jogando", ICONES.jogar],
    [
      "§cDesistir da partida",
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
    "§l§eComeçando§r",
    "1. Vá para um lugar plano e aberto e use §aEstádio > Construir aqui§r.",
    "2. Abra o §bMenu do Futebol§r e escolha um modo.",
    "",
    "§l§eControles na partida§r",
    "§eChutar§r: use perto da bola. A mira define a direção; olhe para cima para chutar alto.",
    "§aPassar§r: toca para o companheiro na direção em que você olha. Agachado = lançamento.",
    "§cDividida§r: dá um bote e tenta roubar a bola do adversário próximo.",
    "§6Pedir a Bola§r: o companheiro com a bola passa para você.",
    "Bater na bola (ataque) também chuta. Encostar na bola solta faz você dominá-la.",
    "Correr com a bola conduz automaticamente. Agachar protege a bola.",
    "",
    "§l§eCarreira§r",
    "Liga com 10 clubes (turno e returno) + Copa mata-mata. Ganhe pontos de treino jogando,",
    "evolua atributos, compre equipamentos, receba propostas e conquiste troféus.",
    "Sua Velocidade vira efeito de velocidade em campo; os outros atributos afetam chutes,",
    "passes, dribles e desarmes.",
    "",
    "§7Comandos: /scriptevent fut:menu  |  /scriptevent fut:item",
  ].join("\n");
  await menu(player, "Como Jogar", txt, [["Voltar", ICONES.voltar, () => abrirMenu(player)]]);
}

// ---------------------------------------------------------------- estádio

async function menuEstadio(player) {
  const est = getEstadio();
  const botoes = [
    [
      "§lConstruir aqui",
      ICONES.estadio,
      async () => {
        if (getPartida()) return player.sendMessage("§cTermine a partida atual antes de construir.");
        const ok = await confirmar(
          player,
          "Construir estádio",
          "O estádio (63 x 45 blocos) será construído centrado em você.\n\n§cTodos os blocos da área serão substituídos!§r\n\nProcure um terreno plano e aberto.",
          "§aConstruir",
        );
        if (ok) construirEstadio(player);
      },
    ],
  ];
  if (est) {
    botoes.push([
      "§lIr para o estádio",
      ICONES.voltar,
      () => player.teleport({ x: est.x + 0.5, y: est.y + 0.1, z: est.z + 0.5 }, { dimension: world.getDimension(est.dim) }),
    ]);
  }
  botoes.push(["Voltar", ICONES.voltar, () => abrirMenu(player)]);
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
    for (const p of sem) p.sendMessage("§c[Futebol] Libere espaço no inventário (os itens da barra 1-4 são guardados na mochila).");
    return null;
  }
  return { dimension: world.getDimension(est.dim), origem: origemEstadio(est) };
}

// ---------------------------------------------------------------- partida rápida

async function menuPartidaRapida(player) {
  const nomes = TIMES.map((t) => t.nome);
  const outros = world.getAllPlayers().filter((p) => p.id !== player.id);
  const c = C.carregar(player);
  const f = new ModalFormData()
    .title("Partida Rápida")
    .dropdown("Seu time", nomes, c && !c.aposentado ? c.clube : 2)
    .dropdown("Adversário", nomes, 6)
    .dropdown("Formato", ["5 contra 5", "7 contra 7"], 0)
    .slider("Duração (minutos reais)", 2, 10, 1, 4)
    .dropdown("Dificuldade", DIFICULDADES.map((d) => d.nome), 1)
    .dropdown("Sua posição", POS_CARREIRA.map((p) => POSICOES[p]), c ? Math.max(0, POS_CARREIRA.indexOf(c.posicao)) : 0);
  if (outros.length) f.toggle(`Incluir outros jogadores online (${outros.length})`, false);
  const r = await mostrar(player, f);
  if (r.canceled || !r.formValues) return;
  const [ta, tbRaw, fmt, dur, dif, pos, incluir] = r.formValues;
  const tb = tbRaw === ta ? (ta + 1) % TIMES.length : tbRaw;

  const participantes = [player, ...(incluir ? outros : [])];
  const base = prepararPartida(participantes);
  if (!base) return;

  const humanos = participantes.map((p, i) => {
    const cc = C.carregar(p);
    const stats = cc ? { ...cc.attr } : { vel: 65, chu: 65, pas: 65, dri: 65, def: 65, fis: 65 };
    const papel = i === 0 ? POS_CARREIRA[pos] : cc?.posicao ?? "MEI";
    return { player: p, time: i % 2 === 0 ? 0 : 1, papel, stats, nome: cc?.nome ?? p.name, numero: cc?.numero ?? 10 + i };
  });
  const ajuste = DIFICULDADES[dif].ajuste;
  const infoTime = (id, extra) => ({ timeId: id, nome: time(id).nome, sigla: time(id).sigla, cor: time(id).cor, rating: time(id).rating + extra });
  new Partida({
    ...base,
    modo: "rapida",
    times: [infoTime(ta, 0), infoTime(tb, humanos.some((h) => h.time === 1) ? 0 : ajuste)],
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
  const infoTime = (id, rating) => ({ timeId: id, nome: time(id).nome, sigla: time(id).sigla, cor: time(id).cor, rating });
  new Partida({
    ...base,
    modo: "treino",
    times: [infoTime(clube, 70), infoTime(adv, ativa ? c.ratings[adv] : 70)],
    tamanho: 5,
    humanos: [{
      player,
      time: 0,
      papel: "ATA",
      stats: ativa ? { ...c.attr } : { vel: 65, chu: 65, pas: 65, dri: 65, def: 65, fis: 65 },
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
          C.salvar(player, cc);
          linhas.push(`§b+${pts} pontos de treino §7(1 ponto a cada 2 gols, máx. 5)`);
        }
      }
      await esperar(30);
      await menu(player, "Fim do treino", linhas.join("\n"), [["OK", ICONES.voltar, () => (ativa ? menuCarreira(player) : abrirMenu(player))]]);
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
  if (C.temporadaAcabou(c)) return fimDeTemporada(player, c);

  const prox = C.proximoJogo(c);
  const ovr = C.overall(c);
  const t = c.liga.tabela[c.clube];
  const media = c.temp.jogos ? (c.temp.notaSoma / c.temp.jogos).toFixed(1) : "-";
  const corpo = [
    `§l§b${c.nome}§r §7#${c.numero} - ${POSICOES[c.posicao]}, ${c.idade} anos`,
    `§fClube: ${nomeClube(c.clube)} §7| §fOVR: §a${ovr}`,
    `§fTemporada §e${c.temporada}§f | Liga: §e${C.posicaoNaLiga(c)}º§f (${t.p} pts)`,
    `§fCopa: ${c.copa.vivo ? "§aNa disputa" : "§cEliminado"}`,
    "",
    `§6Próximo: §f${prox.rotulo}`,
    `   ${nomeClube(c.clube)} §fx ${nomeClube(prox.adversario)} §7(${prox.casa ? "em casa" : "fora"})`,
    "",
    `§fTemporada: §e${c.temp.jogos}§f jogos, §a${c.temp.gols}§f gols, §b${c.temp.assist}§f assist., média §e${media}`,
    `§fPontos de treino: §b${c.pontos} §7| §fDinheiro: §a${dinheiro(c.dinheiro)} §7| §fReputação: §e${c.reputacao}`,
  ].join("\n");

  await menu(player, "Modo Carreira", corpo, [
    ["§l§2Jogar próxima partida", ICONES.jogar, () => jogarPartidaCarreira(player)],
    ["§lSimular partida\n§r§8Rápido, rende menos pontos", ICONES.simular, () => simularPartidaCarreira(player)],
    ["§lClassificação da Liga", ICONES.tabela, () => telaClassificacao(player)],
    ["§lCopa Craft", ICONES.copa, () => telaCopa(player)],
    [`§lTreinar §r§8(${c.pontos} pts)`, ICONES.treino, () => telaTreino(player)],
    ["§lLoja", ICONES.loja, () => telaLoja(player)],
    ["§lPerfil e Troféus", ICONES.perfil, () => telaPerfil(player)],
    ["§lConfigurações", ICONES.config, () => telaConfig(player)],
    ["§cEncerrar carreira", ICONES.apagar, () => telaEncerrar(player)],
    ["Voltar", ICONES.voltar, () => abrirMenu(player)],
  ]);
}

async function criarCarreira(player) {
  const iniciais = [...TIMES].sort((a, b) => a.rating - b.rating).slice(0, 4);
  const f = new ModalFormData()
    .title("Nova Carreira")
    .textField("Nome do jogador", "Ex.: Zico Craft", player.name)
    .dropdown("Posição", POS_CARREIRA.map((p) => POSICOES[p]), 0)
    .slider("Número da camisa", 1, 99, 1, 9)
    .dropdown("Clube inicial (base)", iniciais.map((t) => `${t.nome} (${t.rating})`), 0)
    .dropdown("Dificuldade", DIFICULDADES.map((d) => d.nome), 1)
    .slider("Duração das partidas (minutos reais)", 2, 10, 1, 4)
    .dropdown("Formato", ["5 contra 5", "7 contra 7"], 0);
  const r = await mostrar(player, f);
  if (r.canceled || !r.formValues) return;
  const [nome, pos, numero, clubeIdx, dif, dur, fmt] = r.formValues;
  const c = C.novaCarreira({
    nome: String(nome).trim().slice(0, 20) || player.name,
    posicao: POS_CARREIRA[pos],
    numero,
    clube: iniciais[clubeIdx].id,
    dificuldade: dif,
    duracao: dur,
    tamanho: fmt === 0 ? 5 : 7,
  });
  C.salvar(player, c);
  player.sendMessage(`§a[Futebol] Bem-vindo ao ${nomeClube(c.clube)}§a, ${c.nome}! Sua carreira começa agora.`);
  player.playSound("random.levelup");
  await menuCarreira(player);
}

function infoTimeCarreira(c, id, ajuste = 0) {
  const t = time(id);
  return { timeId: id, nome: t.nome, sigla: t.sigla, cor: t.cor, rating: c.ratings[id] + ajuste, temporada: c.temporada };
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
    times: [infoTimeCarreira(c, c.clube), infoTimeCarreira(c, prox.adversario, DIFICULDADES[c.config.dificuldade].ajuste)],
    tamanho: c.config.tamanho,
    humanos: [{ player, time: 0, papel: c.posicao, stats: { ...c.attr }, nome: c.nome, numero: c.numero }],
    duracaoSeg: c.config.duracao * 60,
    rotulo: prox.rotulo,
    aoTerminar: (res) => posPartidaCarreira(player, res, chave),
  }).iniciar();
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
  let dados;
  if (res.motivo === "desistencia") {
    dados = { golsPro: 0, golsContra: 3, gols: 0, assist: 0, nota: 3, simulado: false, wo: true };
  } else {
    const h = res.humanos[0];
    dados = { golsPro: res.placar[0], golsContra: res.placar[1], gols: h.est.gols, assist: h.est.assist, nota: h.nota, simulado: false };
  }
  const rel = C.registrarJogo(c, dados);
  C.salvar(player, c);
  await esperar(30);
  await resumoPartida(player, res, rel, prox, dados);
}

async function simularPartidaCarreira(player) {
  const c = C.carregar(player);
  const prox = C.proximoJogo(c);
  if (!prox || prox.adversario === undefined) return menuCarreira(player);
  const sim = C.simularJogoDoJogador(c, DIFICULDADES[c.config.dificuldade].ajuste);
  const rel = C.registrarJogo(c, { ...sim, simulado: true });
  C.salvar(player, c);
  const res = {
    placar: [sim.golsPro, sim.golsContra],
    times: [infoTimeCarreira(c, c.clube), infoTimeCarreira(c, prox.adversario)],
    eventos: [],
    craque: null,
    humanos: [{ player, nome: c.nome, est: { gols: sim.gols, assist: sim.assist }, nota: sim.nota }],
    simulada: true,
  };
  await resumoPartida(player, res, rel, prox, sim);
}

async function resumoPartida(player, res, rel, prox, dados) {
  const [t0, t1] = res.times;
  const [g0, g1] = res.placar;
  const linhas = [];
  if (prox) linhas.push(`§7${prox.rotulo}${res.simulada ? " (simulada)" : ""}`);
  linhas.push(`§l${t0.cor}${t0.nome} §f${g0} x ${g1} ${t1.cor}${t1.nome}§r`);
  const venc = g0 > g1 ? "§aVITÓRIA" : g0 < g1 ? "§cDERROTA" : "§eEMPATE";
  linhas.push(dados?.wo ? "§cDerrota por W.O." : venc);
  linhas.push("");
  for (const e of res.eventos ?? []) {
    const t = res.times[e.time];
    linhas.push(`§7${e.min}' ${t.cor}${t.sigla}§r ${e.contra ? `§7(contra) ${e.autor}` : e.autor}${e.assist ? ` §8(assist. ${e.assist})` : ""}`);
  }
  const h = res.humanos.find((x) => x.player?.id === player.id) ?? res.humanos[0];
  if (h) {
    linhas.push("");
    linhas.push(`§fSua nota: §e${h.nota.toFixed(1)}`);
    const e = h.est;
    let s = `§fGols: §a${e.gols} §f| Assist.: §b${e.assist}`;
    if (e.passesTent !== undefined) s += ` §f| Passes: §e${e.passes}/${e.passesTent} §f| Desarmes: §e${e.desarmes} §f| Chutes: §e${e.chutes}`;
    linhas.push(s);
  }
  if (res.craque) linhas.push(`§6Craque do jogo: §f${res.craque.nome} (${res.craque.nota.toFixed(1)})`);
  if (rel) {
    linhas.push("", "§l§eRecompensas§r", ...rel.recompensa);
    if (rel.linhas.length) linhas.push("", "§l§eOutros resultados§r", ...rel.linhas);
  }
  const voltar = rel ? () => menuCarreira(player) : () => abrirMenu(player);
  await menu(player, "Fim de Jogo", linhas.join("\n"), [["Continuar", ICONES.voltar, voltar]]);
}

async function telaClassificacao(player) {
  const c = C.carregar(player);
  const linhas = ["§7Pos  Time   P   J  V  E  D  SG"];
  C.classificacao(c).forEach((l, i) => {
    const t = time(l.id);
    const eu = l.id === c.clube ? "§l" : "";
    const sg = l.gp - l.gc;
    linhas.push(`${eu}§f${i + 1}. ${t.cor}${t.sigla}§r${eu}  §f${l.p} pts  §7${l.j}J ${l.v}V ${l.e}E ${l.d}D  SG ${sg > 0 ? "+" : ""}${sg}§r`);
  });
  const a = c.liga.artilheiro;
  linhas.push("", `§6Artilheiro: §f${a.nome || "-"} ${a.sigla ? `(${a.sigla})` : ""} - ${a.gols} gols`);
  linhas.push(`§bVocê: §f${c.temp.gols} gols`);
  await menu(player, "Liga Craft", linhas.join("\n"), [["Voltar", ICONES.voltar, () => menuCarreira(player)]]);
}

async function telaCopa(player) {
  const c = C.carregar(player);
  const linhas = [];
  if (c.copa.campeao !== null) linhas.push(`§6Campeão: ${nomeClube(c.copa.campeao)}`);
  else linhas.push(c.copa.vivo ? "§aSeu time está na disputa!" : "§cSeu time foi eliminado.");
  if (c.copa.confrontos.length) {
    const ev = c.calendario.slice(c.idx).find((e) => e.t === "C");
    linhas.push("", `§e${ev ? C.FASES_COPA[ev.f] : "Próxima fase"}:`);
    for (const [a, b] of c.copa.confrontos) linhas.push(`  ${nomeClube(a)} §7x ${nomeClube(b)}`);
  }
  for (const r of [...c.copa.resultados].reverse()) {
    linhas.push("", `§e${r.fase}:`);
    for (const j of r.jogos) linhas.push(`  ${j}`);
  }
  await menu(player, "Copa Craft", linhas.join("\n"), [["Voltar", ICONES.voltar, () => menuCarreira(player)]]);
}

function barra(v) {
  const n = Math.round(v / 10);
  const cor = v >= 85 ? "§a" : v >= 70 ? "§e" : v >= 55 ? "§6" : "§c";
  return `${cor}${"|".repeat(n)}§8${"|".repeat(10 - n)}§r ${v}`;
}

async function telaTreino(player) {
  const c = C.carregar(player);
  const corpo = `§fPontos de treino: §b${c.pontos}\n§fOVR atual: §a${C.overall(c)}\n\n§7Custo por ponto: até 69 = 1, 70-79 = 2, 80-89 = 3, 90+ = 4.`;
  const botoes = Object.entries(ATRIBUTOS).map(([k, nome]) => {
    const custo = C.custoTreino(c.attr[k]);
    return [
      `§l${nome}§r ${barra(c.attr[k])}\n§8+1 custa ${custo === Infinity ? "MÁX" : custo}`,
      null,
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
  botoes.push(["§lTreino de finalização\n§r§8Mini-jogo: ganhe pontos", ICONES.chute, () => iniciarTreino(player)]);
  botoes.push(["Voltar", ICONES.voltar, () => menuCarreira(player)]);
  await menu(player, "Centro de Treinamento", corpo, botoes);
}

async function telaLoja(player) {
  const c = C.carregar(player);
  const botoes = C.LOJA.map((item) => {
    const comprado = !item.repetivel && c.compras[item.id];
    return [
      `§l${item.nome}§r ${comprado ? "§a(comprado)" : `§2${dinheiro(item.preco)}`}\n§8${item.desc}`,
      item.attr ? ICONES.diamante : ICONES.treino,
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
  botoes.push(["Voltar", ICONES.voltar, () => menuCarreira(player)]);
  await menu(player, "Loja", `§fDinheiro: §a${dinheiro(c.dinheiro)}`, botoes);
}

async function telaPerfil(player) {
  const c = C.carregar(player);
  const total = c.total;
  const linhas = [
    `§l§b${c.nome}§r §7#${c.numero}`,
    `§f${POSICOES[c.posicao]}, ${c.idade} anos - ${nomeClube(c.clube)}`,
    `§fOVR: §a${C.overall(c)} §7| §fSalário: §a${dinheiro(c.salario)}/jogo`,
    "",
    ...Object.entries(ATRIBUTOS).map(([k, n]) => `§f${n}: ${barra(c.attr[k])}`),
    "",
    `§l§eCarreira§r: ${total.jogos} jogos, ${total.gols} gols, ${total.assist} assist., ${total.vitorias} vitórias`,
    `§fMédia geral: §e${total.jogos ? (total.notaSoma / total.jogos).toFixed(2) : "-"}`,
    "",
    `§l§6Troféus (${c.trofeus.length})§r`,
    ...(c.trofeus.length ? c.trofeus.map((t) => `§6★ §f${t.nome} §7(T${t.temporada}, ${time(t.clube).sigla})`) : ["§7Nenhum ainda."]),
    "",
    "§l§eHistórico§r",
    ...(c.historico.length
      ? c.historico.map((h) => `§7T${h.temporada} ${time(h.clube).sigla}: §f${h.jogos}J ${h.gols}G ${h.assist}A, média ${h.media}, ${h.pos}º`)
      : ["§7Primeira temporada em andamento."]),
  ];
  await menu(player, "Perfil", linhas.join("\n"), [["Voltar", ICONES.voltar, () => menuCarreira(player)]]);
}

async function telaConfig(player) {
  const c = C.carregar(player);
  const f = new ModalFormData()
    .title("Configurações da Carreira")
    .dropdown("Dificuldade", DIFICULDADES.map((d) => d.nome), c.config.dificuldade)
    .slider("Duração das partidas (minutos reais)", 2, 10, 1, c.config.duracao)
    .dropdown("Formato", ["5 contra 5", "7 contra 7"], c.config.tamanho === 7 ? 1 : 0);
  const r = await mostrar(player, f);
  if (!r.canceled && r.formValues) {
    const [dif, dur, fmt] = r.formValues;
    c.config = { dificuldade: dif, duracao: dur, tamanho: fmt === 0 ? 5 : 7 };
    C.salvar(player, c);
    player.sendMessage("§a[Futebol] Configurações salvas.");
  }
  await menuCarreira(player);
}

async function telaEncerrar(player) {
  await menu(player, "Encerrar carreira", "§fO que deseja fazer?", [
    [
      "§eAposentar-se\n§r§8Mantém o histórico",
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
      "§cApagar carreira\n§r§8Não pode ser desfeito",
      ICONES.apagar,
      async () => {
        if (!(await confirmar(player, "Apagar carreira", "§cTodos os dados da carreira serão apagados."))) return menuCarreira(player);
        C.apagar(player);
        player.sendMessage("§e[Futebol] Carreira apagada.");
        await abrirMenu(player);
      },
    ],
    ["Voltar", ICONES.voltar, () => menuCarreira(player)],
  ]);
}

async function telaAposentado(player, c) {
  const total = c.total;
  const corpo = [
    `§l§6${c.nome} - Lenda aposentada§r`,
    `§f${total.jogos} jogos, §a${total.gols} gols§f, §b${total.assist} assistências`,
    `§fTroféus: §6${c.trofeus.length}`,
    ...c.trofeus.map((t) => `§6★ §f${t.nome} §7(T${t.temporada})`),
  ].join("\n");
  await menu(player, "Fim de Carreira", corpo, [
    [
      "§aComeçar nova carreira",
      ICONES.trofeu,
      async () => {
        if (await confirmar(player, "Nova carreira", "A carreira atual será substituída.")) {
          C.apagar(player);
          await criarCarreira(player);
        }
      },
    ],
    ["Voltar", ICONES.voltar, () => abrirMenu(player)],
  ]);
}

async function fimDeTemporada(player, c) {
  const res = C.encerrarTemporada(c);
  C.salvar(player, c);
  const linhas = [
    `§l§eFim da Temporada ${c.temporada}§r`,
    "",
    `§fCampeão da Liga: ${nomeClube(res.campeao)}`,
    `§fCampeão da Copa: ${res.campeaoCopa !== null ? nomeClube(res.campeaoCopa) : "-"}`,
    `§fSeu clube terminou em §e${res.pos}º`,
    `§fSua temporada: ${c.temp.jogos} jogos, ${c.temp.gols} gols, ${c.temp.assist} assist., média ${res.media}`,
    `§fArtilheiro NPC: ${res.artilheiro.nome || "-"} (${res.artilheiro.gols} gols)`,
    "",
    res.premios.length ? "§l§6Conquistas:" : "§7Nenhum troféu nesta temporada.",
    ...res.premios.map((p) => `§6★ ${p}`),
  ];
  if (res.premios.length) player.playSound("random.totem");
  await menu(player, "Fim de Temporada", linhas.join("\n"), [["Continuar", ICONES.voltar, () => telaPropostas(player)]]);
}

async function telaPropostas(player) {
  const c = C.carregar(player);
  const botoes = c.ofertas.map((o) => [
    `§l${time(o.clube).nome}§r §7(força ${c.ratings[o.clube]})\n§2${dinheiro(o.salario)}/jogo`,
    ICONES.perfil,
    () => iniciarNovaTemporada(player, o),
  ]);
  botoes.push([`§lFicar no ${time(c.clube).nome}\n§r§8Renovar contrato`, ICONES.voltar, () => iniciarNovaTemporada(player, null)]);
  const corpo = c.ofertas.length
    ? `§fVocê recebeu §e${c.ofertas.length}§f proposta(s)!\n§7Salário atual: ${dinheiro(c.salario)}/jogo, força do clube ${c.ratings[c.clube]}.`
    : "§7Nenhuma proposta nesta janela. Aumente sua reputação jogando bem!";
  await menu(player, "Janela de Transferências", corpo, botoes);
}

async function iniciarNovaTemporada(player, oferta) {
  const c = C.carregar(player);
  if (!C.temporadaAcabou(c)) return menuCarreira(player);
  C.encerrarTemporada(c);
  const msgs = C.novaTemporada(c, oferta);
  C.salvar(player, c);
  for (const m of msgs) player.sendMessage(`§7[Futebol] ${m}`);
  if (c.aposentado) return telaAposentado(player, c);
  player.sendMessage(`§a[Futebol] Começa a temporada ${c.temporada}! Boa sorte, ${c.nome}.`);
  await menuCarreira(player);
}
