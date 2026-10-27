import { TIMES, time } from "./data.js";
import { clamp, embaralhar, poisson, rand, randInt, escolher } from "./util.js";
import { midiaInicial } from "./midia.js";

const CHAVE = "fut:carreira";
const VERSAO = 1;

export const PESOS = {
  ATA: { vel: 0.2, chu: 0.3, pas: 0.1, dri: 0.25, def: 0.05, fis: 0.1 },
  MEI: { vel: 0.15, chu: 0.15, pas: 0.3, dri: 0.2, def: 0.1, fis: 0.1 },
  ZAG: { vel: 0.15, chu: 0.05, pas: 0.1, dri: 0.05, def: 0.4, fis: 0.25 },
};

const ATRIBUTOS_INICIAIS = {
  ATA: { vel: 62, chu: 64, pas: 55, dri: 62, def: 35, fis: 55 },
  MEI: { vel: 60, chu: 56, pas: 64, dri: 62, def: 48, fis: 55 },
  ZAG: { vel: 56, chu: 42, pas: 52, dri: 45, def: 66, fis: 64 },
};

export const LOJA = [
  { id: "chuteira", nome: "Chuteira de Ouro", desc: "+3 Finalização", preco: 15000, attr: "chu", bonus: 3 },
  { id: "tenis", nome: "Tênis de Velocidade", desc: "+3 Velocidade", preco: 15000, attr: "vel", bonus: 3 },
  { id: "bola", nome: "Bola de Treino Pro", desc: "+3 Drible", preco: 12000, attr: "dri", bonus: 3 },
  { id: "colete", nome: "Colete Tático", desc: "+3 Passe", preco: 12000, attr: "pas", bonus: 3 },
  { id: "caneleira", nome: "Caneleira Blindada", desc: "+3 Defesa", preco: 12000, attr: "def", bonus: 3 },
  { id: "academia", nome: "Plano de Academia", desc: "+3 Físico", preco: 12000, attr: "fis", bonus: 3 },
  { id: "personal", nome: "Personal Trainer", desc: "+3 pontos de treino (repetível)", preco: 8000, pontos: 3, repetivel: true },
];

// ---------------------------------------------------------------- armazenamento

export function carregar(player) {
  const s = player.getDynamicProperty(CHAVE);
  if (typeof s !== "string") return null;
  try {
    const c = JSON.parse(s);
    return c && c.v === VERSAO ? migrar(c) : null;
  } catch {
    return null;
  }
}

/** Completa carreiras salvas antes das novidades (mídia, nacionalidade, Copa do Mundo). */
function migrar(c) {
  c.nacionalidade ??= "BRA";
  c.midia = { ...midiaInicial(), ...(c.midia ?? {}) };
  c.mundial ??= null;
  c.selecaoTotal ??= { jogos: 0, gols: 0 };
  return c;
}

/** Atributos usados em campo: a moral dá até ±5 em tudo. */
export function statsEmCampo(c) {
  const bonus = Math.round((c.midia.moral - 50) / 10);
  const s = {};
  for (const k in c.attr) s[k] = clamp(c.attr[k] + bonus, 1, 99);
  return s;
}

export function salvar(player, c) {
  player.setDynamicProperty(CHAVE, JSON.stringify(c));
}

export function apagar(player) {
  player.setDynamicProperty(CHAVE, undefined);
}

// ---------------------------------------------------------------- criação

export function overall(c) {
  const p = PESOS[c.posicao];
  let s = 0;
  for (const k in p) s += c.attr[k] * p[k];
  return Math.round(s);
}

export function custoTreino(valor) {
  if (valor >= 99) return Infinity;
  if (valor < 70) return 1;
  if (valor < 80) return 2;
  if (valor < 90) return 3;
  return 4;
}

function estatVazia() {
  return { jogos: 0, gols: 0, assist: 0, notaSoma: 0, vitorias: 0 };
}

export function novaCarreira({ nome, posicao, numero, clube, dificuldade, duracao, tamanho, nacionalidade = "BRA" }) {
  const c = {
    v: VERSAO,
    nome,
    nacionalidade,
    midia: midiaInicial(),
    mundial: null,
    selecaoTotal: { jogos: 0, gols: 0 },
    posicao,
    numero,
    idade: 17,
    temporada: 1,
    clube,
    attr: { ...ATRIBUTOS_INICIAIS[posicao] },
    pontos: 3,
    dinheiro: 5000,
    salario: 0,
    reputacao: 5,
    compras: {},
    config: { dificuldade, duracao, tamanho },
    total: estatVazia(),
    temp: estatVazia(),
    trofeus: [],
    historico: [],
    ratings: Object.fromEntries(TIMES.map((t) => [t.id, t.rating])),
    ofertas: [],
    aposentado: false,
  };
  c.salario = salarioPara(c.ratings[clube], overall(c));
  iniciarTemporada(c);
  return c;
}

export function salarioPara(ratingClube, ovr) {
  return Math.max(800, Math.round((ratingClube * 35 * (ovr / 60)) / 100) * 100);
}

/** Tabela de jogos em turno e returno (método do círculo). */
function gerarRodadas(ids) {
  const lista = embaralhar(ids);
  const n = lista.length;
  const turno = [];
  for (let r = 0; r < n - 1; r++) {
    const jogos = [];
    for (let i = 0; i < n / 2; i++) {
      const a = lista[i];
      const b = lista[n - 1 - i];
      jogos.push(r % 2 === 0 ? [a, b] : [b, a]);
    }
    turno.push(jogos);
    lista.splice(1, 0, lista.pop());
  }
  const returno = turno.map((r) => r.map(([a, b]) => [b, a]));
  return [...turno, ...returno];
}

export function iniciarTemporada(c) {
  const ids = TIMES.map((t) => t.id);
  const rodadas = gerarRodadas(ids);
  c.liga = {
    tabela: Object.fromEntries(ids.map((id) => [id, { p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 }])),
    rodadas,
    artilheiro: { nome: "", sigla: "", gols: 0 },
  };
  const outros = embaralhar(ids.filter((id) => id !== c.clube)).slice(0, 7);
  const participantes = embaralhar([c.clube, ...outros]);
  const confrontos = [];
  for (let i = 0; i < 8; i += 2) confrontos.push([participantes[i], participantes[i + 1]]);
  c.copa = { fase: 0, confrontos, vivo: true, campeao: null, resultados: [] };
  c.calendario = [];
  rodadas.forEach((_, r) => {
    c.calendario.push({ t: "L", r });
    if (r === 3) c.calendario.push({ t: "C", f: 0 });
    if (r === 8) c.calendario.push({ t: "C", f: 1 });
    if (r === 13) c.calendario.push({ t: "C", f: 2 });
  });
  c.idx = 0;
  c.temp = estatVazia();
  c.ofertas = [];
  c.treinoIdx = -1;
  c.resumoTemporada = null;
}

// ---------------------------------------------------------------- calendário

export const FASES_COPA = ["Quartas de final", "Semifinal", "Final"];

/** Descrição do próximo jogo do clube do jogador, ou null se a temporada acabou. */
export function proximoJogo(c) {
  const ev = c.calendario[c.idx];
  if (!ev) return null;
  if (ev.t === "L") {
    const jogo = c.liga.rodadas[ev.r].find((j) => j.includes(c.clube));
    const casa = jogo[0] === c.clube;
    return {
      tipo: "liga",
      rotulo: `Liga Craft - Rodada ${ev.r + 1}`,
      adversario: casa ? jogo[1] : jogo[0],
      casa,
      mataMata: false,
    };
  }
  const jogo = c.copa.confrontos.find((j) => j.includes(c.clube));
  if (!jogo || !c.copa.vivo) return { tipo: "copa_fora", rotulo: `Copa Craft - ${FASES_COPA[ev.f]}` };
  const casa = jogo[0] === c.clube;
  return {
    tipo: "copa",
    rotulo: `Copa Craft - ${FASES_COPA[ev.f]}`,
    adversario: casa ? jogo[1] : jogo[0],
    casa,
    mataMata: true,
  };
}

function ratingEfetivo(c, id) {
  const r = c.ratings[id];
  return id === c.clube ? r + (overall(c) - r) * 0.15 : r;
}

export function simularPlacar(rA, rB, casaA = true) {
  const lA = clamp(1.35 * Math.exp((rA - rB) / 22) + (casaA ? 0.2 : 0), 0.2, 4.5);
  const lB = clamp(1.35 * Math.exp((rB - rA) / 22), 0.2, 4.5);
  return [poisson(lA), poisson(lB)];
}

function penaltis(rA, rB) {
  const pA = clamp(0.5 + (rA - rB) / 100, 0.3, 0.7);
  let a = 0;
  let b = 0;
  for (let i = 0; i < 5; i++) {
    if (Math.random() < 0.75 + (rA - 70) / 200) a++;
    if (Math.random() < 0.75 + (rB - 70) / 200) b++;
  }
  while (a === b) {
    if (Math.random() < pA) a++;
    else b++;
  }
  return [a, b];
}

function registrarTabela(c, casa, fora, gc, gf) {
  const t = c.liga.tabela;
  const A = t[casa];
  const B = t[fora];
  A.j++;
  B.j++;
  A.gp += gc;
  A.gc += gf;
  B.gp += gf;
  B.gc += gc;
  if (gc > gf) {
    A.v++;
    A.p += 3;
    B.d++;
  } else if (gc < gf) {
    B.v++;
    B.p += 3;
    A.d++;
  } else {
    A.e++;
    B.e++;
    A.p++;
    B.p++;
  }
}

export function classificacao(c) {
  return Object.entries(c.liga.tabela)
    .map(([id, s]) => ({ id: Number(id), ...s }))
    .sort((a, b) => b.p - a.p || b.gp - b.gc - (a.gp - a.gc) || b.gp - a.gp || b.v - a.v);
}

export function posicaoNaLiga(c) {
  return classificacao(c).findIndex((l) => l.id === c.clube) + 1;
}

const ARTILHEIROS = ["Ronaldão", "Bebeto Jr.", "Careca", "Dadá", "Fred Gol", "Tita", "Viola", "Zé Roberto", "Romarinho", "Serginho"];

function atualizarArtilheiro(c) {
  const a = c.liga.artilheiro;
  if (!a.nome) {
    const t = escolher(TIMES.filter((x) => x.id !== c.clube));
    a.nome = escolher(ARTILHEIROS);
    a.sigla = t.sigla;
  }
  a.gols += poisson(0.8);
}

/** Simula os demais jogos do evento atual e avança o calendário. Retorna linhas para o resumo. */
function fecharEvento(c, placarJogador) {
  const ev = c.calendario[c.idx];
  const linhas = [];
  if (ev.t === "L") {
    for (const [a, b] of c.liga.rodadas[ev.r]) {
      let ga;
      let gb;
      if (a === c.clube || b === c.clube) {
        if (!placarJogador) continue;
        [ga, gb] = a === c.clube ? placarJogador : [placarJogador[1], placarJogador[0]];
      } else {
        [ga, gb] = simularPlacar(ratingEfetivo(c, a), ratingEfetivo(c, b), true);
      }
      registrarTabela(c, a, b, ga, gb);
      linhas.push(`${time(a).cor}${time(a).sigla}§r ${ga} x ${gb} ${time(b).cor}${time(b).sigla}§r`);
    }
    atualizarArtilheiro(c);
  } else {
    const vencedores = [];
    const resultados = [];
    for (const [a, b] of c.copa.confrontos) {
      let ga;
      let gb;
      let pen = null;
      if ((a === c.clube || b === c.clube) && placarJogador) {
        [ga, gb] = a === c.clube ? placarJogador : [placarJogador[1], placarJogador[0]];
      } else {
        [ga, gb] = simularPlacar(ratingEfetivo(c, a), ratingEfetivo(c, b), true);
      }
      let venc = ga > gb ? a : b;
      if (ga === gb) {
        pen = penaltis(ratingEfetivo(c, a), ratingEfetivo(c, b));
        venc = pen[0] > pen[1] ? a : b;
      }
      vencedores.push(venc);
      const txt = `${time(a).cor}${time(a).sigla}§r ${ga} x ${gb} ${time(b).cor}${time(b).sigla}§r${pen ? ` §7(pên. ${pen[0]}-${pen[1]})` : ""}`;
      resultados.push(txt);
      linhas.push(txt);
      if ((a === c.clube || b === c.clube) && venc !== c.clube) c.copa.vivo = false;
    }
    c.copa.resultados.push({ fase: FASES_COPA[ev.f], jogos: resultados });
    if (vencedores.length === 1) {
      c.copa.campeao = vencedores[0];
      c.copa.confrontos = [];
    } else {
      c.copa.confrontos = [];
      for (let i = 0; i < vencedores.length; i += 2) c.copa.confrontos.push([vencedores[i], vencedores[i + 1]]);
    }
  }
  c.idx++;
  return linhas;
}

/** Pula automaticamente fases da copa em que o jogador já foi eliminado. */
export function pularEventosSemJogo(c) {
  const msgs = [];
  while (c.idx < c.calendario.length) {
    const p = proximoJogo(c);
    if (p.tipo !== "copa_fora") break;
    const linhas = fecharEvento(c, null);
    msgs.push(`§7${p.rotulo} (eliminado): ${linhas.join(" §8|§r ")}`);
  }
  return msgs;
}

/**
 * Registra o jogo do jogador (real ou simulado).
 * @returns {{linhas:string[], recompensa:string[], penaltis:string|null}}
 */
export function registrarJogo(c, { golsPro, golsContra, gols, assist, nota, simulado, wo = false }) {
  const linhas = fecharEvento(c, [golsPro, golsContra]);

  const venceu = golsPro > golsContra;
  c.temp.jogos++;
  c.total.jogos++;
  c.temp.gols += gols;
  c.total.gols += gols;
  c.temp.assist += assist;
  c.total.assist += assist;
  c.temp.notaSoma += nota;
  c.total.notaSoma += nota;
  if (venceu) {
    c.temp.vitorias++;
    c.total.vitorias++;
  }

  const recompensa = [];
  let pts;
  if (wo) pts = 0;
  else if (simulado) pts = 1;
  else pts = 1 + (nota >= 7 ? 1 : 0) + (nota >= 8.5 ? 1 : 0) + Math.min(2, gols);
  c.pontos += pts;
  const bicho = venceu ? Math.round(c.salario * 0.5) : 0;
  const premioGols = gols * 300;
  const ganho = wo ? 0 : c.salario + bicho + premioGols;
  c.dinheiro += ganho;
  const rep = wo ? -2 : (nota >= 7 ? 1 : 0) + (nota >= 8.5 ? 1 : 0) + Math.floor(gols / 2) + (venceu ? 1 : 0);
  c.reputacao = clamp(c.reputacao + rep, 0, 100);
  recompensa.push(`§b+${pts} pontos de treino`);
  recompensa.push(`§a+R$ ${ganho} §7(salário ${c.salario}${bicho ? `, bicho ${bicho}` : ""}${premioGols ? `, gols ${premioGols}` : ""})`);
  if (rep) recompensa.push(`§e${rep > 0 ? "+" : ""}${rep} reputação`);
  return { linhas, recompensa };
}

/** Simula a participação do jogador numa partida sem jogá-la. */
export function simularJogoDoJogador(c, ajusteDificuldade = 0) {
  const prox = proximoJogo(c);
  const rClube = ratingEfetivo(c, c.clube);
  const rAdv = c.ratings[prox.adversario] + ajusteDificuldade * 0.5;
  return simularDesempenho(c, rClube, rAdv, prox.casa);
}

/** Simula placar e desempenho individual do jogador num jogo entre forças rMeu e rAdv. */
export function simularDesempenho(c, rMeu, rAdv, casa = true) {
  const [gp, gc] = simularPlacar(rMeu, rAdv, casa);
  const st = statsEmCampo(c);
  const pGol = { ATA: 0.3, MEI: 0.16, ZAG: 0.06 }[c.posicao] * (st.chu / 70);
  const pAss = { ATA: 0.2, MEI: 0.33, ZAG: 0.1 }[c.posicao] * (st.pas / 70);
  let gols = 0;
  let assist = 0;
  for (let i = 0; i < gp; i++) {
    const r = Math.random();
    if (r < pGol) gols++;
    else if (r < pGol + pAss) assist++;
  }
  let nota = 6 + gols + assist * 0.7 + (gp > gc ? 0.4 : gp < gc ? -0.4 : 0) + rand(-0.6, 0.6);
  if (c.posicao === "ZAG" && gc === 0) nota += 0.8;
  nota = Math.round(clamp(nota, 3, 10) * 10) / 10;
  return { golsPro: gp, golsContra: gc, gols, assist, nota };
}

export function temporadaAcabou(c) {
  return c.idx >= c.calendario.length;
}

/** Fecha a temporada: troféus, prêmios, histórico e propostas. */
export function encerrarTemporada(c) {
  if (c.resumoTemporada) return c.resumoTemporada;
  const tabela = classificacao(c);
  const pos = tabela.findIndex((l) => l.id === c.clube) + 1;
  const campeao = tabela[0].id;
  const premios = [];
  const media = c.temp.jogos ? c.temp.notaSoma / c.temp.jogos : 0;

  if (pos === 1) premios.push("Campeão da Liga Craft");
  if (c.copa.campeao === c.clube) premios.push("Campeão da Copa Craft");
  if (c.temp.gols > 0 && c.temp.gols >= c.liga.artilheiro.gols) premios.push("Artilheiro da Liga");
  if (media >= 7.8 && c.temp.jogos >= 10) premios.push("Bola de Ouro Craft");
  else if (media >= 7.2 && c.temp.jogos >= 10) premios.push("Seleção da Temporada");
  for (const p of premios) c.trofeus.push({ nome: p, temporada: c.temporada, clube: c.clube });

  c.historico.push({
    temporada: c.temporada,
    clube: c.clube,
    jogos: c.temp.jogos,
    gols: c.temp.gols,
    assist: c.temp.assist,
    media: Math.round(media * 10) / 10,
    pos,
  });
  c.reputacao = clamp(c.reputacao + (11 - pos) + premios.length * 5, 0, 100);

  for (const t of TIMES) {
    let r = c.ratings[t.id] + randInt(-3, 3);
    if (t.id === campeao) r += 1;
    c.ratings[t.id] = clamp(r, 55, 88);
  }
  c.ofertas = gerarOfertas(c);
  c.resumoTemporada = {
    pos,
    campeao,
    campeaoCopa: c.copa.campeao,
    premios,
    media: Math.round(media * 10) / 10,
    artilheiro: c.liga.artilheiro,
  };
  return c.resumoTemporada;
}

function gerarOfertas(c) {
  const ovr = overall(c);
  const limite = ovr + 4 + c.reputacao / 12;
  const atual = c.ratings[c.clube];
  const candidatos = embaralhar(
    TIMES.filter((t) => t.id !== c.clube && c.ratings[t.id] <= limite && c.ratings[t.id] >= atual - 6),
  );
  const qtd = c.reputacao >= 40 ? 3 : c.reputacao >= 15 ? 2 : 1;
  return candidatos.slice(0, qtd).map((t) => ({
    clube: t.id,
    salario: salarioPara(c.ratings[t.id], ovr) + randInt(0, 5) * 100,
  }));
}

/** Começa a próxima temporada, opcionalmente transferindo para outro clube. */
export function novaTemporada(c, oferta) {
  const msgs = [];
  if (oferta) {
    msgs.push(`§aVocê assinou com ${time(oferta.clube).cor}${time(oferta.clube).nome}§a!`);
    c.clube = oferta.clube;
    c.salario = oferta.salario;
  } else {
    c.salario = Math.max(c.salario, salarioPara(c.ratings[c.clube], overall(c)));
  }
  c.idade++;
  c.temporada++;

  if (c.idade <= 23) {
    const ganhos = [];
    for (let i = 0; i < 2; i++) {
      const k = escolher(Object.keys(c.attr));
      if (c.attr[k] < 99) {
        c.attr[k]++;
        ganhos.push(k);
      }
    }
    if (ganhos.length) msgs.push(`§bEvolução natural da juventude: +1 em ${ganhos.join(", ")}`);
  } else if (c.idade >= 31) {
    const queda = c.idade - 30;
    c.attr.vel = clamp(c.attr.vel - randInt(1, 1 + Math.min(3, queda)), 30, 99);
    c.attr.fis = clamp(c.attr.fis - randInt(0, Math.min(3, queda)), 30, 99);
    for (const k of ["chu", "pas", "dri", "def"]) c.attr[k] = clamp(c.attr[k] - randInt(0, 1), 30, 99);
    msgs.push("§7A idade começa a pesar: seus atributos físicos caíram um pouco.");
  }
  if (c.idade >= 38) {
    c.aposentado = true;
    msgs.push("§6Aos 38 anos, você pendurou as chuteiras. Obrigado pela carreira!");
    return msgs;
  }
  iniciarTemporada(c);
  return msgs;
}

export function aposentar(c) {
  c.aposentado = true;
}

export function comprar(c, itemId) {
  const item = LOJA.find((i) => i.id === itemId);
  if (!item) return "Item inexistente.";
  if (!item.repetivel && c.compras[item.id]) return "Você já comprou este item.";
  if (c.dinheiro < item.preco) return "Dinheiro insuficiente.";
  c.dinheiro -= item.preco;
  if (item.attr) c.attr[item.attr] = clamp(c.attr[item.attr] + item.bonus, 1, 99);
  if (item.pontos) c.pontos += item.pontos;
  c.compras[item.id] = (c.compras[item.id] ?? 0) + 1;
  return null;
}

export function treinar(c, attr) {
  const custo = custoTreino(c.attr[attr]);
  if (c.pontos < custo) return false;
  c.pontos -= custo;
  c.attr[attr]++;
  return true;
}
