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

// nomes por idioma: as seleções usam o grupo do país; os clubes usam "pt"
const NOMES_POR_GRUPO = {
  pt: {
    nomes: ["Lucas", "Gabriel", "Rafael", "Bruno", "Thiago", "Diego", "Mateus", "Felipe", "Caio", "Vinícius",
      "Pedro", "João", "André", "Rodrigo", "Gustavo", "Danilo", "Renan", "Igor", "Murilo", "Henrique",
      "Leandro", "Paulo", "Wesley", "Everton", "Alex", "Douglas", "Marcos", "Hugo", "Otávio", "Júlio"],
    sobrenomes: ["Silva", "Souza", "Santos", "Oliveira", "Pereira", "Costa", "Ramos", "Almeida", "Ferreira", "Lima",
      "Gomes", "Ribeiro", "Martins", "Rocha", "Barbosa", "Cardoso", "Teixeira", "Moreira", "Pinheiro", "Neves",
      "Batista", "Campos", "Freitas", "Machado", "Moura", "Nunes", "Vieira", "Carvalho", "Mendes", "Duarte"],
  },
  es: {
    nomes: ["Santiago", "Mateo", "Facundo", "Nicolás", "Julián", "Lautaro", "Diego", "Rodrigo", "Álvaro", "Sergio", "Iker", "Javier"],
    sobrenomes: ["González", "Fernández", "Rodríguez", "Martínez", "López", "Sánchez", "Romero", "Díaz", "Torres", "Ruiz", "Navarro", "Herrera"],
  },
  fr: {
    nomes: ["Lucas", "Hugo", "Théo", "Antoine", "Kylian", "Olivier", "Raphaël", "Jules", "Mathis", "Youssef", "Romain", "Axel"],
    sobrenomes: ["Martin", "Bernard", "Dubois", "Moreau", "Laurent", "Lefèvre", "Girard", "Mercier", "Fontaine", "Dupont", "Lambert", "Rousseau"],
  },
  de: {
    nomes: ["Lukas", "Jonas", "Leon", "Felix", "Niklas", "Julian", "Florian", "Tobias", "Kai", "Timo", "Marco", "Jan"],
    sobrenomes: ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Becker", "Wagner", "Hoffmann", "Koch", "Richter", "Klein", "Wolf"],
  },
  nl: {
    nomes: ["Daan", "Sem", "Luuk", "Milan", "Jesse", "Bram", "Thijs", "Ruben", "Stijn", "Joris", "Frenkie", "Virgil"],
    sobrenomes: ["de Jong", "Jansen", "de Vries", "van Dijk", "Bakker", "Visser", "Smit", "Meijer", "de Boer", "Mulder", "Bos", "Dekker"],
  },
  en: {
    nomes: ["Harry", "Jack", "James", "Oliver", "Mason", "Declan", "Jordan", "Kyle", "Tyler", "Christian", "Josh", "Bukayo"],
    sobrenomes: ["Smith", "Johnson", "Walker", "Taylor", "Brown", "Wilson", "Evans", "Thomas", "Roberts", "Wright", "Turner", "Adams"],
  },
  it: {
    nomes: ["Lorenzo", "Federico", "Alessandro", "Marco", "Nicolò", "Giorgio", "Davide", "Matteo", "Andrea", "Francesco", "Gianluca", "Ciro"],
    sobrenomes: ["Rossi", "Russo", "Ferrari", "Esposito", "Bianchi", "Romano", "Colombo", "Ricci", "Marino", "Greco", "Bruno", "Conti"],
  },
  hr: {
    nomes: ["Luka", "Ivan", "Mateo", "Josip", "Marko", "Ante", "Dominik", "Mario", "Nikola", "Borna"],
    sobrenomes: ["Horvat", "Kovačić", "Babić", "Marić", "Jurić", "Novak", "Perišić", "Vlašić", "Petković", "Šimić"],
  },
  ja: {
    nomes: ["Takumi", "Kaoru", "Daichi", "Ritsu", "Wataru", "Junya", "Shuto", "Hiroki", "Ayase", "Kyogo"],
    sobrenomes: ["Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Nakamura", "Kobayashi", "Yamamoto", "Endo"],
  },
  ar: {
    nomes: ["Achraf", "Hakim", "Youssef", "Sofyan", "Azzedine", "Nayef", "Bilal", "Selim", "Ilias", "Amine"],
    sobrenomes: ["El Amrani", "Benali", "Ziani", "Haddad", "Saidi", "Bennani", "Alaoui", "Tazi", "Idrissi", "Chakir"],
  },
};

// Seleções da Copa do Mundo: kit é o índice de um uniforme existente; força média do elenco
export const SELECOES = [
  { id: "BRA", de: "do", nome: "Brasil", cor: "§e", kit: 3, rating: 84, grupo: "pt" },
  { id: "ARG", de: "da", nome: "Argentina", cor: "§b", kit: 4, rating: 84, grupo: "es" },
  { id: "FRA", de: "da", nome: "França", cor: "§9", kit: 0, rating: 84, grupo: "fr" },
  { id: "ALE", de: "da", nome: "Alemanha", cor: "§f", kit: 6, rating: 82, grupo: "de" },
  { id: "ESP", de: "da", nome: "Espanha", cor: "§c", kit: 7, rating: 83, grupo: "es" },
  { id: "ING", de: "da", nome: "Inglaterra", cor: "§f", kit: 2, rating: 82, grupo: "en" },
  { id: "POR", de: "de", nome: "Portugal", cor: "§4", kit: 1, rating: 81, grupo: "pt" },
  { id: "HOL", de: "da", nome: "Holanda", cor: "§6", kit: 5, rating: 80, grupo: "nl" },
  { id: "ITA", de: "da", nome: "Itália", cor: "§9", kit: 0, rating: 80, grupo: "it" },
  { id: "URU", de: "do", nome: "Uruguai", cor: "§b", kit: 4, rating: 77, grupo: "es" },
  { id: "CRO", de: "da", nome: "Croácia", cor: "§c", kit: 1, rating: 78, grupo: "hr" },
  { id: "BEL", de: "da", nome: "Bélgica", cor: "§4", kit: 1, rating: 78, grupo: "fr" },
  { id: "MEX", de: "do", nome: "México", cor: "§2", kit: 8, rating: 75, grupo: "es" },
  { id: "JAP", de: "do", nome: "Japão", cor: "§9", kit: 0, rating: 75, grupo: "ja" },
  { id: "EUA", de: "dos", nome: "Estados Unidos", cor: "§f", kit: 2, rating: 74, grupo: "en" },
  { id: "MAR", de: "de", nome: "Marrocos", cor: "§c", kit: 7, rating: 77, grupo: "ar" },
];

export function selecao(id) {
  return SELECOES.find((s) => s.id === id) ?? SELECOES[0];
}

/** Semente numérica estável a partir do código da seleção (separada das sementes dos clubes). */
export function sementeSelecao(id) {
  let h = 1000;
  for (const ch of id) h = h * 31 + ch.charCodeAt(0);
  return h % 100000;
}

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
export function gerarElenco(timeId, temporada, papeis, grupoNomes = "pt") {
  const { nomes: NOMES, sobrenomes: APELIDOS } = NOMES_POR_GRUPO[grupoNomes] ?? NOMES_POR_GRUPO.pt;
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
