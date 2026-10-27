// Copa do Mundo: a cada 4 temporadas, 16 seleções em 4 grupos + mata-mata.
import { SELECOES, selecao } from "./data.js";
import { clamp, embaralhar, poisson, randInt, escolher } from "./util.js";
import { noticia, mensagem } from "./midia.js";

const LETRAS = ["A", "B", "C", "D"];
const RODADAS_GRUPO = [[[0, 1], [2, 3]], [[0, 2], [1, 3]], [[0, 3], [1, 2]]];
export const FASES = { grupos: "Fase de grupos", quartas: "Quartas de final", semi: "Semifinal", final: "Final", fim: "Encerrada" };
const ARTILHEIROS = ["Kanu Blocks", "Ronaldo Pixel", "Mbappix", "Haaland Bloco", "Messiah", "Kane Redstone", "Vini Craft", "Lewan Dirt"];

/** A Copa acontece nas temporadas 2, 6, 10, ... */
export function anoDeCopa(c) {
  return c.temporada % 4 === 2;
}

export function convocavel(c, ovr) {
  const sel = selecao(c.nacionalidade);
  return ovr >= 70 || c.reputacao >= 40 || (ovr >= 65 && sel.rating < 78);
}

function placar(rA, rB) {
  const lA = clamp(1.3 * Math.exp((rA - rB) / 22), 0.25, 4);
  const lB = clamp(1.3 * Math.exp((rB - rA) / 22), 0.25, 4);
  return [poisson(lA), poisson(lB)];
}

function penaltis(rA, rB) {
  let a = 0;
  let b = 0;
  for (let i = 0; i < 5; i++) {
    if (Math.random() < 0.72 + (rA - 78) / 200) a++;
    if (Math.random() < 0.72 + (rB - 78) / 200) b++;
  }
  while (a === b) {
    if (Math.random() < 0.5 + (rA - rB) / 100) a++;
    else b++;
  }
  return [a, b];
}

export function nomeSel(id) {
  const s = selecao(id);
  return `${s.cor}${s.nome}§r`;
}

export function iniciarMundial(c, ovr) {
  const nac = c.nacionalidade;
  const ratings = Object.fromEntries(SELECOES.map((s) => [s.id, clamp(s.rating + randInt(-3, 3), 65, 90)]));
  // potes por força: cada grupo recebe uma seleção de cada pote
  const ordem = [...SELECOES].sort((a, b) => ratings[b.id] - ratings[a.id]).map((s) => s.id);
  const grupos = [[], [], [], []];
  for (let pote = 0; pote < 4; pote++) {
    const ids = embaralhar(ordem.slice(pote * 4, pote * 4 + 4));
    ids.forEach((id, g) => grupos[g].push(id));
  }
  const convocado = convocavel(c, ovr);
  c.mundial = {
    edicao: c.temporada,
    convocado,
    ratings,
    grupos,
    tabela: Object.fromEntries(SELECOES.map((s) => [s.id, { p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 }])),
    rodada: 0,
    fase: "grupos",
    confrontos: [],
    resultados: [],
    campeao: null,
    eliminado: false,
    artilheiro: { nome: escolher(ARTILHEIROS), sel: escolher(ordem.slice(0, 8)), gols: 0 },
    jogador: { jogos: 0, gols: 0, assist: 0, notaSoma: 0 },
    premios: [],
  };
  const sel = selecao(nac);
  if (convocado) {
    mensagem(c, `Federação de ${sel.nome}`, "CONVOCAÇÃO!", `Parabéns, ${c.nome}! Você foi convocado para defender ${sel.nome} na Copa do Mundo. Apresente-se imediatamente.`);
    noticia(c, `${c.nome} está na lista de ${sel.nome} para a Copa do Mundo!`);
  } else {
    mensagem(c, "Empresário", "Ficou fora da Copa", `Não foi dessa vez: ${sel.nome} não te convocou para a Copa. Precisamos de OVR 70 ou mais reputação.`);
    noticia(c, `Técnico de ${sel.nome} deixa ${c.nome} fora da Copa do Mundo`);
  }
  return convocado;
}

function grupoDe(m, id) {
  return m.grupos.findIndex((g) => g.includes(id));
}

export function tabelaGrupo(m, g) {
  return m.grupos[g]
    .map((id) => ({ id, ...m.tabela[id] }))
    .sort((a, b) => b.p - a.p || b.gp - b.gc - (a.gp - a.gc) || b.gp - a.gp || m.ratings[b.id] - m.ratings[a.id]);
}

/** Próximo jogo da seleção do jogador (ou null se não houver). */
export function proximoJogoMundial(c) {
  const m = c.mundial;
  if (!m || m.fase === "fim" || !m.convocado || m.eliminado) return null;
  const nac = c.nacionalidade;
  if (m.fase === "grupos") {
    const g = grupoDe(m, nac);
    const par = RODADAS_GRUPO[m.rodada].map(([a, b]) => [m.grupos[g][a], m.grupos[g][b]]).find((p) => p.includes(nac));
    return { adversario: par[0] === nac ? par[1] : par[0], rotulo: `Copa do Mundo - Grupo ${LETRAS[g]}, ${m.rodada + 1}ª rodada`, mataMata: false };
  }
  const par = m.confrontos.find((p) => p.includes(nac));
  if (!par) return null;
  return { adversario: par[0] === nac ? par[1] : par[0], rotulo: `Copa do Mundo - ${FASES[m.fase]}`, mataMata: true };
}

function registrar(m, a, b, ga, gb) {
  const A = m.tabela[a];
  const B = m.tabela[b];
  A.j++;
  B.j++;
  A.gp += ga;
  A.gc += gb;
  B.gp += gb;
  B.gc += ga;
  if (ga > gb) {
    A.v++;
    A.p += 3;
    B.d++;
  } else if (ga < gb) {
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

const fmt = (a, b, ga, gb, pen) => `${nomeSel(a)} ${ga} x ${gb} ${nomeSel(b)}${pen ? ` §7(pên. ${pen[0]}-${pen[1]})` : ""}`;

/**
 * Fecha a etapa atual (rodada de grupos ou fase de mata-mata).
 * placarJogador: [pró, contra] do jogo da seleção do jogador, se ele jogou.
 */
function fecharEtapa(c, placarJogador) {
  const m = c.mundial;
  const nac = c.nacionalidade;
  const linhas = [];
  const jogo = (a, b) => {
    if ((a === nac || b === nac) && placarJogador) return a === nac ? placarJogador : [placarJogador[1], placarJogador[0]];
    return placar(m.ratings[a], m.ratings[b]);
  };
  m.artilheiro.gols += poisson(0.7);
  if (m.fase === "grupos") {
    m.grupos.forEach((g) => {
      for (const [i, j] of RODADAS_GRUPO[m.rodada]) {
        const [ga, gb] = jogo(g[i], g[j]);
        registrar(m, g[i], g[j], ga, gb);
        linhas.push(fmt(g[i], g[j], ga, gb));
      }
    });
    m.resultados.push({ fase: `Grupos - ${m.rodada + 1}ª rodada`, jogos: linhas });
    m.rodada++;
    if (m.rodada >= 3) {
      const t = m.grupos.map((_, g) => tabelaGrupo(m, g));
      const classificados = t.flatMap((tg) => [tg[0].id, tg[1].id]);
      if (!classificados.includes(nac)) m.eliminado = true;
      m.confrontos = [
        [t[0][0].id, t[1][1].id],
        [t[1][0].id, t[0][1].id],
        [t[2][0].id, t[3][1].id],
        [t[3][0].id, t[2][1].id],
      ];
      m.fase = "quartas";
    }
    return linhas;
  }
  const vencedores = [];
  for (const [a, b] of m.confrontos) {
    const [ga, gb] = jogo(a, b);
    let pen = null;
    let venc = ga > gb ? a : b;
    if (ga === gb) {
      pen = penaltis(m.ratings[a], m.ratings[b]);
      venc = pen[0] > pen[1] ? a : b;
    }
    if ((a === nac || b === nac) && venc !== nac) m.eliminado = true;
    vencedores.push(venc);
    linhas.push(fmt(a, b, ga, gb, pen));
  }
  m.resultados.push({ fase: FASES[m.fase], jogos: linhas });
  if (m.fase === "final") {
    m.campeao = vencedores[0];
    m.fase = "fim";
    m.confrontos = [];
  } else {
    m.confrontos = [];
    for (let i = 0; i < vencedores.length; i += 2) m.confrontos.push([vencedores[i], vencedores[i + 1]]);
    m.fase = m.fase === "quartas" ? "semi" : "final";
  }
  return linhas;
}

/** Registra o jogo da seleção do jogador. Devolve as linhas da etapa. */
export function registrarJogoMundial(c, { golsPro, golsContra, gols, assist, nota }) {
  const m = c.mundial;
  m.jogador.jogos++;
  m.jogador.gols += gols;
  m.jogador.assist += assist;
  m.jogador.notaSoma += nota;
  c.total.jogos++;
  c.total.gols += gols;
  c.total.assist += assist;
  c.selecaoTotal = c.selecaoTotal ?? { jogos: 0, gols: 0 };
  c.selecaoTotal.jogos++;
  c.selecaoTotal.gols += gols;
  return fecharEtapa(c, [golsPro, golsContra]);
}

/** Simula o que faltar da Copa (jogador fora ou eliminado). */
export function simularResto(c) {
  const linhas = [];
  while (c.mundial.fase !== "fim") linhas.push(...fecharEtapa(c, null));
  return linhas;
}

/** Prêmios e notícias do fim da Copa (chamar uma vez quando fase === "fim"). */
export function encerrarMundial(c) {
  const m = c.mundial;
  if (m.encerrado) return m.premios;
  m.encerrado = true;
  const nac = c.nacionalidade;
  const sel = selecao(nac);
  const premios = [];
  if (m.convocado && m.campeao === nac) premios.push("Campeão da Copa do Mundo");
  if (m.convocado && m.jogador.gols > 0 && m.jogador.gols >= m.artilheiro.gols) premios.push("Chuteira de Ouro da Copa");
  const media = m.jogador.jogos ? m.jogador.notaSoma / m.jogador.jogos : 0;
  if (m.convocado && m.jogador.jogos >= 4 && media >= 7.5) premios.push("Bola de Ouro da Copa");
  for (const p of premios) c.trofeus.push({ nome: p, temporada: c.temporada, clube: c.clube, selecao: nac });
  c.reputacao = clamp(c.reputacao + premios.length * 8 + (m.convocado ? 3 : 0), 0, 100);
  if (m.campeao === nac) {
    noticia(c, `${sel.nome} conquista a Copa do Mundo!${m.convocado ? ` ${c.nome} entra para a história!` : ""}`);
    if (m.convocado) c.midia.seguidores = Math.min(Math.round(c.midia.seguidores * 1.5 + 5000), 2000 + c.reputacao * c.reputacao * 400);
  } else {
    noticia(c, `${selecao(m.campeao).nome} conquista a Copa do Mundo`);
  }
  m.premios = premios;
  return premios;
}
