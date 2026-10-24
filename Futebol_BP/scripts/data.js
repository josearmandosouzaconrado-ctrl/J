import { clamp, rng } from "./util.js";

// O índice do uniforme (textura) é o próprio id do time; 10 e 11 são uniformes de goleiro.
export const TIMES = [
  { id: 0, nome: "Tubarões do Litoral", sigla: "TUB", cor: "§9", rating: 66, cidade: "Baía Azul" },
  { id: 1, nome: "Atlético Serrano", sigla: "ATS", cor: "§c", rating: 72, cidade: "Serra Alta" },
  { id: 2, nome: "Real Paulistano", sigla: "RPA", cor: "§f", rating: 81, cidade: "Nova Paulista" },
  { id: 3, nome: "EC Ipê", sigla: "IPE", cor: "§e", rating: 64, cidade: "Ipê Dourado" },
  { id: 4, nome: "Grêmio Estrela", sigla: "EST", cor: "§b", rating: 76, cidade: "Porto Estrela" },
  { id: 5, nome: "União Cerrado", sigla: "UNI", cor: "§6", rating: 61, cidade: "Vale do Cerrado" },
  { id: 6, nome: "SC Aurora", sigla: "AUR", cor: "§8", rating: 78, cidade: "Aurora" },
  { id: 7, nome: "Fênix FC", sigla: "FEN", cor: "§4", rating: 70, cidade: "Brasa" },
  { id: 8, nome: "Imperial do Norte", sigla: "IMP", cor: "§2", rating: 74, cidade: "Rio Imperial" },
  { id: 9, nome: "Vila Nova Capital", sigla: "VNC", cor: "§5", rating: 59, cidade: "Capital" },
];

export const KIT_GOLEIRO = [10, 11];
export const NUM_PELES = 3;

const NOMES = [
  "Lucas", "Gabriel", "Rafael", "Bruno", "Thiago", "Diego", "Mateus", "Felipe", "Caio", "Vinícius",
  "Pedro", "João", "André", "Rodrigo", "Gustavo", "Danilo", "Renan", "Igor", "Murilo", "Henrique",
  "Leandro", "Paulo", "Wesley", "Everton", "Alex", "Douglas", "Marcos", "Hugo", "Otávio", "Júlio",
];
const APELIDOS = [
  "Silva", "Souza", "Santos", "Oliveira", "Pereira", "Costa", "Ramos", "Almeida", "Ferreira", "Lima",
  "Gomes", "Ribeiro", "Martins", "Rocha", "Barbosa", "Cardoso", "Teixeira", "Moreira", "Pinheiro", "Neves",
  "Batista", "Campos", "Freitas", "Machado", "Moura", "Nunes", "Vieira", "Carvalho", "Mendes", "Duarte",
];
const NUMEROS = { GOL: [1, 12], ZAG: [3, 4, 2, 6, 13], MEI: [8, 10, 5, 7], ATA: [9, 11, 7] };

export function time(id) {
  return TIMES[id];
}

export function skinIndex(kit, pele) {
  return kit * NUM_PELES + pele;
}

/**
 * Elenco determinístico por time (muda a cada duas temporadas).
 * Retorna um jogador por papel da formação recebida.
 */
export function gerarElenco(timeId, temporada, papeis) {
  const r = rng(timeId * 7919 + Math.floor((temporada - 1) / 2) * 104729 + 17);
  const usados = new Set();
  const numerosUsados = new Set();
  return papeis.map((papel) => {
    let nome;
    do {
      const n = NOMES[Math.floor(r() * NOMES.length)];
      const s = APELIDOS[Math.floor(r() * APELIDOS.length)];
      nome = r() < 0.35 ? n : `${n} ${s}`;
    } while (usados.has(nome));
    usados.add(nome);
    let numero = NUMEROS[papel].find((n) => !numerosUsados.has(n));
    while (numero === undefined || numerosUsados.has(numero)) numero = 14 + Math.floor(r() * 80);
    numerosUsados.add(numero);
    return { nome, numero, pele: Math.floor(r() * NUM_PELES), variacao: r() };
  });
}

export function statsPorPapel(base, papel, variacao = 0.5) {
  const v = Math.round((variacao - 0.5) * 10);
  const b = base + v;
  const s = {
    GOL: { vel: b - 10, chu: b - 20, pas: b - 8, dri: b - 20, def: b + 5, fis: b },
    ZAG: { vel: b - 3, chu: b - 15, pas: b - 5, dri: b - 10, def: b + 6, fis: b + 4 },
    MEI: { vel: b, chu: b - 3, pas: b + 6, dri: b + 4, def: b - 6, fis: b - 2 },
    ATA: { vel: b + 4, chu: b + 6, pas: b - 3, dri: b + 4, def: b - 18, fis: b },
  }[papel];
  for (const k in s) s[k] = clamp(Math.round(s[k]), 20, 99);
  return s;
}
