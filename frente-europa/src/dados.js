// Dados do jogo: unidades da Segunda Guerra (EUA), estruturas, cidades reais e cenários.
// Velocidades em m/s reais, alcances em metros, tamanhos reais (modelos do Blender).
// alvos: t = terrestre, s = navio, a = aéreo, b = estrutura

export const TIPOS = {
  fuzileiro: {
    nome: 'Fuzileiro', desc: 'Infantaria com fuzil M1 Garand', modelo: 'soldado', lod: 'soldado_simples', cat: 'inf', hp: 100, vel: 1.7,
    custo: 50, tempo: 8, tam: 1.8, giro: 6,
    armas: [{ n: 'M1 Garand', alc: 350, dano: 14, cad: 1.4, alvos: 'tb', prec: 0.45, som: 'tiro' }],
  },
  bazuca: {
    nome: 'Bazuca', desc: 'Antitanque M1A1 "Bazooka"', modelo: 'soldado_bazuca', lod: 'soldado_bazuca_simples', cat: 'inf', hp: 100, vel: 1.6,
    custo: 90, tempo: 10, tam: 1.8, giro: 6,
    armas: [{ n: 'Bazuca M1A1', alc: 220, dano: 170, cad: 6, alvos: 'tsb', prec: 0.5, perfura: 1, som: 'canhao', fx: 'foguete' }],
  },
  jeep: {
    nome: 'Jipe Willys MB', desc: 'Reconhecimento rápido, leva 3 soldados', modelo: 'jeep', cat: 'veh', hp: 200, vel: 20,
    custo: 120, tempo: 10, tam: 3.4, giro: 1.6, cap: 3, blind: 0,
    armas: [{ n: 'Browning .30', alc: 550, dano: 10, cad: 0.15, alvos: 'tab', prec: 0.3, som: 'mg' }],
  },
  caminhao: {
    nome: 'Caminhão GMC CCKW', desc: 'Transporte: leva 12 soldados', modelo: 'caminhao', cat: 'veh', hp: 260, vel: 13,
    custo: 150, tempo: 12, tam: 6.9, giro: 0.9, cap: 12, blind: 0, armas: [],
  },
  halftrack: {
    nome: 'Half-track M3', desc: 'Blindado de tropas (10) com .50', modelo: 'halftrack', cat: 'veh', hp: 520, vel: 14,
    custo: 260, tempo: 16, tam: 6.2, giro: 0.9, cap: 10, blind: 1,
    armas: [{ n: 'Browning .50 M2', alc: 850, dano: 16, cad: 0.12, alvos: 'tab', prec: 0.3, som: 'mg' }],
  },
  sherman: {
    nome: 'M4A3 Sherman', desc: 'Tanque médio, canhão de 75 mm', modelo: 'sherman', cat: 'veh', hp: 1300, vel: 11,
    custo: 500, tempo: 25, tam: 5.9, giro: 0.7, blind: 2, torre: true,
    armas: [
      { n: 'Canhão 75 mm M3', alc: 1500, dano: 230, cad: 4, alvos: 'tsb', prec: 0.55, perfura: 1, area: 6, som: 'canhao', fx: 'granada' },
      { n: 'Browning .50 M2', alc: 850, dano: 14, cad: 0.12, alvos: 'ta', prec: 0.3, som: 'mg' },
    ],
  },
  m7: {
    nome: 'M7 Priest', desc: 'Artilharia autopropulsada 105 mm (alcance 11 km)', modelo: 'm7_priest', cat: 'veh', hp: 850,
    vel: 10, custo: 650, tempo: 30, tam: 6.0, giro: 0.7, blind: 1,
    armas: [{ n: 'Obus 105 mm', alc: 11000, min: 600, dano: 280, cad: 8, alvos: 'tsb', prec: 0.2, perfura: 1, area: 30, som: 'artilharia', fx: 'artilharia' }],
  },
  p51: {
    nome: 'P-51D Mustang', desc: 'Caça: domina a batalha aérea', modelo: 'p51', cat: 'air', hp: 380, vel: 170, alt: 900,
    custo: 700, tempo: 30, tam: 9.8, giro: 0.55, blind: 0, helice: true,
    armas: [{ n: '6x Browning .50', alc: 750, dano: 30, cad: 0.1, alvos: 'atsb', prec: 0.35, cone: 0.35, som: 'mg' }],
  },
  p80: {
    nome: 'P-80 Shooting Star', desc: 'Primeiro caça a JATO dos EUA', modelo: 'p80', cat: 'air', hp: 420, vel: 240,
    alt: 1100, custo: 1100, tempo: 40, tam: 10.5, giro: 0.5, jato: true,
    armas: [{ n: '6x Browning .50', alc: 800, dano: 32, cad: 0.09, alvos: 'atsb', prec: 0.35, cone: 0.35, som: 'mg' }],
  },
  b17: {
    nome: 'B-17G Flying Fortress', desc: 'Bombardeiro pesado', modelo: 'b17', cat: 'air', hp: 2400, vel: 85, alt: 1600,
    custo: 1500, tempo: 50, tam: 22.7, giro: 0.18, helice: true, bombardeiro: true,
    armas: [
      { n: 'Bombas de 500 lb', alc: 260, dano: 650, cad: 5, alvos: 'tsb', prec: 0.6, area: 70, bomba: true, som: 'explosao', fx: 'bomba' },
      { n: '13x Browning .50', alc: 700, dano: 12, cad: 0.15, alvos: 'a', prec: 0.25, cone: 7, som: 'mg' },
    ],
  },
  c47: {
    nome: 'C-47 Skytrain', desc: 'Transporte: 18 paraquedistas', modelo: 'c47', cat: 'air', hp: 900, vel: 70, alt: 500,
    custo: 600, tempo: 30, tam: 19.4, giro: 0.25, cap: 18, helice: true, paraquedas: true, armas: [],
  },
  higgins: {
    nome: 'Barco Higgins LCVP', desc: 'Desembarque: 12 soldados na praia', modelo: 'higgins', cat: 'ship', hp: 280,
    vel: 6, custo: 200, tempo: 15, tam: 11, giro: 0.5, cap: 12, anfibio: true,
    armas: [{ n: '2x Browning .30', alc: 500, dano: 10, cad: 0.2, alvos: 'ta', prec: 0.25, som: 'mg' }],
  },
  contratorpedeiro: {
    nome: 'Contratorpedeiro Fletcher', desc: '5 canhões de 127 mm (alcance 15 km)', modelo: 'contratorpedeiro', cat: 'ship',
    hp: 4000, vel: 18, custo: 1800, tempo: 60, tam: 115, giro: 0.12, blind: 1,
    armas: [
      { n: '5x 127 mm/38', alc: 15000, dano: 200, cad: 2.5, alvos: 'tsb', prec: 0.25, perfura: 1, area: 18, som: 'artilharia', fx: 'artilharia' },
      { n: 'Bofors 40 mm', alc: 3000, dano: 25, cad: 0.4, alvos: 'a', prec: 0.3, som: 'aa' },
    ],
  },
  porta_avioes: {
    nome: 'Porta-aviões classe Essex', desc: 'Leva 12 aviões no hangar', modelo: 'porta_avioes', cat: 'ship', hp: 14000,
    vel: 16, custo: 4000, tempo: 120, tam: 267, giro: 0.06, blind: 2, hangar: 12,
    armas: [{ n: '5"/38 e Bofors 40 mm', alc: 4000, dano: 40, cad: 0.35, alvos: 'as', prec: 0.3, som: 'aa' }],
  },
};

export const ESTRUTURAS = {
  qg: {
    nome: 'Quartel-General', modelo: 'qg', hp: 7000, custo: 0, tam: 30, raioBase: 4000, renda: 30,
    produz: ['fuzileiro', 'bazuca', 'jeep'],
  },
  quartel: { nome: 'Quartel (Quonset)', modelo: 'quartel', hp: 2600, custo: 300, tam: 26, tempo: 20, produz: ['fuzileiro', 'bazuca'] },
  garagem: {
    nome: 'Garagem de Blindados', modelo: 'garagem', hp: 3200, custo: 500, tam: 30, tempo: 30,
    produz: ['jeep', 'caminhao', 'halftrack', 'sherman', 'm7'],
  },
  aerodromo: {
    nome: 'Aeródromo', modelo: 'aerodromo', hp: 4500, custo: 900, tam: 80, tempo: 45, pista: true,
    produz: ['p51', 'p80', 'b17', 'c47'],
  },
  porto: {
    nome: 'Porto Naval', modelo: 'porto', hp: 4500, custo: 800, tam: 70, tempo: 45, costa: true,
    produz: ['higgins', 'contratorpedeiro', 'porta_avioes'],
  },
  bunker: {
    nome: 'Bunker', modelo: 'bunker', hp: 4500, custo: 250, tam: 14, tempo: 20, guarnicao: 6, blind: 2,
    armas: [{ n: 'Metralhadora', alc: 700, dano: 12, cad: 0.15, alvos: 'ta', prec: 0.3, som: 'mg' }],
  },
  antiaerea: {
    nome: 'Canhão Antiaéreo Bofors', modelo: 'antiaerea', hp: 1600, custo: 300, tam: 8, tempo: 15, torre: true, blind: 1,
    armas: [{ n: 'Bofors 40 mm', alc: 3000, dano: 38, cad: 0.5, alvos: 'a', prec: 0.35, som: 'aa' }],
  },
};

// Cidades reais (lat, lon). valor = suprimentos por minuto de jogo. dono: 0 Aliados, 1 Eixo, -1 neutra
export const CIDADES = [
  { nome: 'Londres', lat: 51.5074, lon: -0.1278, valor: 60, dono: 0 },
  { nome: 'Portsmouth', lat: 50.8198, lon: -1.088, valor: 25, dono: 0 },
  { nome: 'Plymouth', lat: 50.3755, lon: -4.1427, valor: 20, dono: 0 },
  { nome: 'Omaha Beach', lat: 49.3695, lon: -0.882, valor: 15, dono: -1 },
  { nome: 'Utah Beach', lat: 49.4146, lon: -1.1755, valor: 10, dono: -1 },
  { nome: 'Bayeux', lat: 49.2764, lon: -0.7024, valor: 15, dono: 1 },
  { nome: 'Caen', lat: 49.1829, lon: -0.3707, valor: 25, dono: 1 },
  { nome: 'Saint-Lô', lat: 49.1157, lon: -1.0906, valor: 15, dono: 1 },
  { nome: 'Cherbourg', lat: 49.6337, lon: -1.6222, valor: 30, dono: 1, porto: true },
  { nome: 'Le Havre', lat: 49.4944, lon: 0.1079, valor: 30, dono: 1, porto: true },
  { nome: 'Rouen', lat: 49.4432, lon: 1.0999, valor: 25, dono: 1 },
  { nome: 'Rennes', lat: 48.1173, lon: -1.6778, valor: 25, dono: 1 },
  { nome: 'Brest', lat: 48.3904, lon: -4.4861, valor: 30, dono: 1, porto: true },
  { nome: 'Le Mans', lat: 48.0061, lon: 0.1996, valor: 20, dono: 1 },
  { nome: 'Nantes', lat: 47.2184, lon: -1.5536, valor: 25, dono: 1 },
  { nome: 'Paris', lat: 48.8566, lon: 2.3522, valor: 80, dono: 1, capital: true },
  { nome: 'Orléans', lat: 47.9029, lon: 1.9093, valor: 20, dono: 1 },
  { nome: 'Calais', lat: 50.9513, lon: 1.8587, valor: 20, dono: 1, porto: true },
  { nome: 'Lille', lat: 50.6292, lon: 3.0573, valor: 30, dono: 1 },
  { nome: 'Reims', lat: 49.2583, lon: 4.0317, valor: 20, dono: 1 },
  { nome: 'Strasbourg', lat: 48.5734, lon: 7.7521, valor: 25, dono: 1 },
  { nome: 'Dijon', lat: 47.322, lon: 5.0415, valor: 20, dono: 1 },
  { nome: 'Lyon', lat: 45.764, lon: 4.8357, valor: 40, dono: 1 },
  { nome: 'Bordeaux', lat: 44.8378, lon: -0.5792, valor: 35, dono: 1, porto: true },
  { nome: 'Toulouse', lat: 43.6047, lon: 1.4442, valor: 30, dono: 1 },
  { nome: 'Marseille', lat: 43.2965, lon: 5.3698, valor: 40, dono: 1, porto: true },
  { nome: 'Toulon', lat: 43.1242, lon: 5.928, valor: 30, dono: 1, porto: true },
  { nome: 'Nice', lat: 43.7102, lon: 7.262, valor: 20, dono: 1 },
  { nome: 'Bruxelas', lat: 50.8503, lon: 4.3517, valor: 35, dono: 1 },
  { nome: 'Amsterdã', lat: 52.3676, lon: 4.9041, valor: 35, dono: 1, porto: true },
  { nome: 'Colônia', lat: 50.9375, lon: 6.9603, valor: 30, dono: 1 },
  { nome: 'Berlim', lat: 52.52, lon: 13.405, valor: 90, dono: 1, capital: true },
  { nome: 'Munique', lat: 48.1351, lon: 11.582, valor: 35, dono: 1 },
  { nome: 'Roma', lat: 41.9028, lon: 12.4964, valor: 45, dono: 1 },
  { nome: 'Milão', lat: 45.4642, lon: 9.19, valor: 35, dono: 1 },
  { nome: 'Madri', lat: 40.4168, lon: -3.7038, valor: 30, dono: -1 },
  { nome: 'Genebra', lat: 46.2044, lon: 6.1432, valor: 20, dono: -1 },
];

// Marcos famosos (modelos do Blender). rot = rumo em graus; livre = raio sem prédios gerados em volta
export const MARCOS = [
  { nome: 'Torre Eiffel', modelo: 'torre_eiffel', lat: 48.85826, lon: 2.29450, rot: 47, livre: 110 },
  { nome: 'Arco do Triunfo', modelo: 'arco_triunfo', lat: 48.87378, lon: 2.29504, rot: 63, livre: 140 },
  { nome: 'Notre-Dame de Paris', modelo: 'notre_dame', lat: 48.85297, lon: 2.34989, rot: 290, livre: 85 },
  { nome: 'Catedral de Bayeux', modelo: 'catedral_bayeux', lat: 49.27866, lon: -0.70360, rot: 275, livre: 70 },
];

// Cenário principal: Dia D, 6 de junho de 1944
export const CENARIO_NORMANDIA = {
  nome: 'Dia D: Normandia → Paris',
  dinheiro: 3500,
  aliados: {
    estruturas: [
      { tipo: 'qg', lat: 49.3555, lon: -0.8565 },
      { tipo: 'garagem', lat: 49.3528, lon: -0.8735 },
      { tipo: 'antiaerea', lat: 49.3585, lon: -0.8420 },
      { tipo: 'aerodromo', lat: 50.8594, lon: -0.7584, rot: 70 },   // RAF Tangmere (Inglaterra)
      { tipo: 'porto', lat: 50.7987, lon: -1.1072, rot: 180 },       // Portsmouth
      { tipo: 'qg', lat: 51.5033, lon: -0.1276 },                     // Londres
    ],
    unidades: [
      { tipo: 'fuzileiro', n: 14, lat: 49.3600, lon: -0.8600 },
      { tipo: 'bazuca', n: 4, lat: 49.3590, lon: -0.8540 },
      { tipo: 'sherman', n: 4, lat: 49.3530, lon: -0.8650 },
      { tipo: 'jeep', n: 2, lat: 49.3545, lon: -0.8500 },
      { tipo: 'halftrack', n: 2, lat: 49.3520, lon: -0.8590, carga: { fuzileiro: 6 } },
      { tipo: 'm7', n: 1, lat: 49.3560, lon: -0.8700 },
      { tipo: 'fuzileiro', n: 8, lat: 49.4070, lon: -1.1650 },
      { tipo: 'sherman', n: 2, lat: 49.4040, lon: -1.1680 },
      { tipo: 'higgins', n: 3, lat: 49.3800, lon: -0.8700, carga: { fuzileiro: 8, bazuca: 2 } },
      { tipo: 'contratorpedeiro', n: 1, lat: 49.4300, lon: -0.9000 },
      { tipo: 'contratorpedeiro', n: 1, lat: 49.4400, lon: -1.1000 },
      { tipo: 'porta_avioes', n: 1, lat: 49.6500, lon: -0.9500, hangar: { p51: 4, p80: 1 } },
      { tipo: 'p51', n: 4, lat: 50.8594, lon: -0.7584, pousado: true },
      { tipo: 'b17', n: 2, lat: 50.8560, lon: -0.7500, pousado: true },
      { tipo: 'c47', n: 1, lat: 50.8620, lon: -0.7650, pousado: true, carga: { fuzileiro: 14, bazuca: 4 } },
    ],
  },
  eixo: {
    estruturas: [
      { tipo: 'qg', lat: 48.8606, lon: 2.3376 },          // Paris
      { tipo: 'garagem', lat: 48.8790, lon: 2.3100 },
      { tipo: 'quartel', lat: 48.8480, lon: 2.3950 },
      { tipo: 'aerodromo', lat: 48.7262, lon: 2.3652, rot: 20 }, // Orly
      { tipo: 'antiaerea', lat: 48.8700, lon: 2.3600 },
      { tipo: 'antiaerea', lat: 48.8450, lon: 2.3000 },
      { tipo: 'bunker', lat: 49.3640, lon: -0.8800 },       // Muralha do Atlântico (Omaha)
      { tipo: 'bunker', lat: 49.3615, lon: -0.8350 },
      { tipo: 'bunker', lat: 49.4120, lon: -1.1900 },
      { tipo: 'bunker', lat: 49.1850, lon: -0.3600 },       // Caen
      { tipo: 'garagem', lat: 49.1950, lon: -0.3900 },
      { tipo: 'bunker', lat: 49.6400, lon: -1.6100 },       // Cherbourg
      { tipo: 'porto', lat: 49.6480, lon: -1.6150, rot: 0 },
      { tipo: 'aerodromo', lat: 50.5636, lon: 3.0868, rot: 80 }, // Lille-Lesquin
      { tipo: 'porto', lat: 48.3800, lon: -4.4950, rot: 180 },   // Brest
      { tipo: 'porto', lat: 43.1180, lon: 5.9100, rot: 180 },    // Toulon
      { tipo: 'qg', lat: 52.5163, lon: 13.3777 },               // Berlim
    ],
    unidades: [
      { tipo: 'fuzileiro', n: 6, lat: 49.3480, lon: -0.8700 },
      { tipo: 'fuzileiro', n: 4, lat: 49.3500, lon: -0.8300 },
      { tipo: 'fuzileiro', n: 10, lat: 49.2780, lon: -0.7020 },
      { tipo: 'bazuca', n: 3, lat: 49.2760, lon: -0.7050 },
      { tipo: 'sherman', n: 2, lat: 49.2740, lon: -0.7000 },
      { tipo: 'fuzileiro', n: 12, lat: 49.1830, lon: -0.3700 },
      { tipo: 'sherman', n: 5, lat: 49.1900, lon: -0.3900 },
      { tipo: 'halftrack', n: 2, lat: 49.1870, lon: -0.3800 },
      { tipo: 'fuzileiro', n: 8, lat: 49.1157, lon: -1.0906 },
      { tipo: 'sherman', n: 2, lat: 49.1180, lon: -1.0950 },
      { tipo: 'fuzileiro', n: 10, lat: 49.6337, lon: -1.6222 },
      { tipo: 'm7', n: 2, lat: 49.6250, lon: -1.6100 },
      { tipo: 'fuzileiro', n: 6, lat: 49.4944, lon: 0.1079 },
      { tipo: 'fuzileiro', n: 6, lat: 49.4432, lon: 1.0999 },
      { tipo: 'sherman', n: 2, lat: 49.4400, lon: 1.0950 },
      { tipo: 'fuzileiro', n: 20, lat: 48.8566, lon: 2.3522 },
      { tipo: 'bazuca', n: 6, lat: 48.8600, lon: 2.3400 },
      { tipo: 'sherman', n: 8, lat: 48.8790, lon: 2.3100 },
      { tipo: 'halftrack', n: 3, lat: 48.8750, lon: 2.3200 },
      { tipo: 'm7', n: 3, lat: 48.8400, lon: 2.3300 },
      { tipo: 'p51', n: 4, lat: 48.7262, lon: 2.3652, pousado: true },
      { tipo: 'p51', n: 3, lat: 50.5636, lon: 3.0868, pousado: true },
      { tipo: 'b17', n: 1, lat: 50.5600, lon: 3.0800, pousado: true },
      { tipo: 'contratorpedeiro', n: 1, lat: 49.7200, lon: -1.6200 },
      { tipo: 'contratorpedeiro', n: 1, lat: 48.3300, lon: -4.6000 },
      { tipo: 'contratorpedeiro', n: 1, lat: 43.0700, lon: 5.9300 },
      { tipo: 'fuzileiro', n: 6, lat: 48.1173, lon: -1.6778 },
      { tipo: 'fuzileiro', n: 6, lat: 50.6292, lon: 3.0573 },
      { tipo: 'sherman', n: 3, lat: 50.6300, lon: 3.0500 },
      { tipo: 'fuzileiro', n: 6, lat: 45.7640, lon: 4.8357 },
      { tipo: 'fuzileiro', n: 6, lat: 43.2965, lon: 5.3698 },
      { tipo: 'fuzileiro', n: 4, lat: 44.8378, lon: -0.5792 },
      { tipo: 'fuzileiro', n: 4, lat: 50.9513, lon: 1.8587 },
      { tipo: 'fuzileiro', n: 8, lat: 52.5200, lon: 13.4050 },
      { tipo: 'sherman', n: 4, lat: 52.5150, lon: 13.3900 },
    ],
  },
  camera: { lat: 49.352, lon: -0.858, dist: 2000, rumo: 0, inclinacao: 0.8 },
};

// Batalha aérea sobre o Canal da Mancha
export const CENARIO_AEREO = {
  nome: 'Batalha Aérea sobre o Canal',
  dinheiro: 4000,
  aereo: true,
  aliados: {
    estruturas: [
      { tipo: 'aerodromo', lat: 50.8594, lon: -0.7584, rot: 70 },
      { tipo: 'qg', lat: 50.8450, lon: -0.7900 },
    ],
    unidades: [
      { tipo: 'p51', n: 1, lat: 50.20, lon: -0.70, alt: 1500, jogador: true },
      { tipo: 'p51', n: 3, lat: 50.21, lon: -0.73, alt: 1500 },
      { tipo: 'p80', n: 2, lat: 50.19, lon: -0.66, alt: 1700 },
      { tipo: 'b17', n: 3, lat: 50.30, lon: -0.70, alt: 2000 },
      { tipo: 'porta_avioes', n: 1, lat: 50.10, lon: -1.0, hangar: { p51: 6 } },
      { tipo: 'contratorpedeiro', n: 2, lat: 50.05, lon: -0.8 },
    ],
  },
  eixo: {
    estruturas: [
      { tipo: 'aerodromo', lat: 49.4700, lon: 0.2000, rot: 30 },
      { tipo: 'antiaerea', lat: 49.4900, lon: 0.1100 },
      { tipo: 'antiaerea', lat: 49.4800, lon: 0.1500 },
      { tipo: 'qg', lat: 49.4950, lon: 0.1000 },
    ],
    unidades: [
      { tipo: 'p51', n: 6, lat: 49.85, lon: -0.55, alt: 1400 },
      { tipo: 'p80', n: 2, lat: 49.80, lon: -0.40, alt: 1800 },
      { tipo: 'p51', n: 4, lat: 49.47, lon: 0.20, pousado: true },
    ],
  },
  camera: { lat: 50.20, lon: -0.70, dist: 400, rumo: 0, inclinacao: 0.4 },
};

// Europa livre: muito dinheiro para construir e experimentar
export const CENARIO_LIVRE = {
  ...CENARIO_NORMANDIA,
  nome: 'Europa Livre (sandbox)',
  dinheiro: 100000,
};
