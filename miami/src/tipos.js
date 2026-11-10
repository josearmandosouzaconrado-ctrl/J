// Tipos de unidades das Forças Armadas dos EUA (valores ajustados para o jogo)
// classe: inf (infantaria), veic (veículo), aereo (helicóptero/drone), jato, naval
// de: onde é produzido (quartel, patio, heliporto, docas, porta)
export const TIPOS = {
  // ---------------- infantaria ----------------
  fuzileiro: { nome: 'Soldado', sub: 'Fuzil M4A1', icone: '🪖', classe: 'inf', hp: 100, vel: 6.5, alcance: 55, dano: 16, cadencia: 0.38, precisao: 0.6, arma: 'fuzil', custo: 60, tempo: 4, de: 'quartel', slots: 1, raio: 0.6 },
  metralhador: { nome: 'Metralhador', sub: 'M249 SAW', icone: '🔫', classe: 'inf', hp: 120, vel: 6.0, alcance: 62, dano: 10, cadencia: 0.1, precisao: 0.42, arma: 'mg', custo: 100, tempo: 6, de: 'quartel', slots: 1, raio: 0.6 },
  sniper: { nome: 'Atirador de Elite', sub: 'M110 / Barrett M107', icone: '🎯', classe: 'inf', hp: 90, vel: 6.2, alcance: 150, dano: 110, cadencia: 1.7, precisao: 0.92, arma: 'sniper', custo: 140, tempo: 8, de: 'quartel', slots: 1, raio: 0.6 },
  medico: { nome: 'Médico de Combate', sub: 'Cura soldados por perto', icone: '⚕️', classe: 'inf', hp: 100, vel: 6.6, alcance: 40, dano: 9, cadencia: 0.55, precisao: 0.5, arma: 'pistola', cura: 7, custo: 110, tempo: 6, de: 'quartel', slots: 1, raio: 0.6 },
  // ---------------- veículos ----------------
  humvee: { nome: 'Humvee M1151', sub: 'Metralhadora .50 • leva 4', icone: '🚙', classe: 'veic', modelo: 'humvee', hp: 550, vel: 26, alcance: 85, dano: 24, cadencia: 0.16, precisao: 0.45, arma: '50cal', carga: 4, cargaTipos: ['inf', 'civil'], custo: 240, tempo: 9, de: 'patio', slots: 6, raio: 2.6, leve: true, atropela: true },
  ambulancia: { nome: 'Ambulância M997', sub: 'Leva 8 • cura passageiros', icone: '🚑', classe: 'veic', modelo: 'ambulancia', hp: 420, vel: 25, carga: 8, cargaTipos: ['inf', 'civil'], cura: 12, custo: 180, tempo: 8, de: 'patio', slots: 6, raio: 2.7, leve: true, atropela: true },
  stryker: { nome: 'Stryker M1126', sub: 'Blindado 8x8 • leva 9', icone: '🚐', classe: 'veic', modelo: 'stryker', hp: 1100, vel: 24, alcance: 95, dano: 26, cadencia: 0.15, precisao: 0.5, arma: '50cal', carga: 9, cargaTipos: ['inf', 'civil'], custo: 450, tempo: 13, de: 'patio', slots: 10, raio: 3.6, atropela: true },
  bradley: { nome: 'Bradley M2A3', sub: 'Canhão 25mm • leva 6', icone: '🛻', classe: 'veic', modelo: 'bradley', hp: 1500, vel: 20, alcance: 120, dano: 55, splash: 3, cadencia: 0.32, precisao: 0.6, arma: '25mm', carga: 6, cargaTipos: ['inf', 'civil'], custo: 620, tempo: 15, de: 'patio', slots: 12, raio: 3.4, atropela: true },
  abrams: { nome: 'Tanque M1A2 Abrams', sub: 'Canhão 120mm', icone: '🛡️', classe: 'veic', modelo: 'abrams', hp: 3200, vel: 19, alcance: 170, dano: 320, splash: 8, cadencia: 4.2, precisao: 0.85, arma: '120mm', sec: { alcance: 90, dano: 12, cadencia: 0.11, precisao: 0.45, arma: 'mg' }, custo: 950, tempo: 20, de: 'patio', slots: 20, raio: 4.8, atropela: true },
  paladin: { nome: 'Obuseiro M109A7 Paladin', sub: 'Artilharia 155mm • longo alcance', icone: '💥', classe: 'veic', modelo: 'paladin', hp: 1600, vel: 15, alcance: 700, minAlc: 80, dano: 300, splash: 15, cadencia: 6, precisao: 0.7, arma: '155mm', arco: true, custo: 900, tempo: 20, de: 'patio', slots: 18, raio: 4.6 },
  himars: { nome: 'HIMARS M142', sub: 'Lança-foguetes • 6 foguetes', icone: '🚀', classe: 'veic', modelo: 'himars', hp: 1100, vel: 22, alcance: 1100, minAlc: 150, dano: 230, splash: 16, cadencia: 0.5, salva: 6, recarga: 20, precisao: 0.75, arma: 'foguete', custo: 1200, tempo: 24, de: 'patio', slots: 16, raio: 3.8 },
  // ---------------- polícia SWAT de Miami (controlada pelo jogo, não pelo jogador) ----------------
  swat: { nome: 'Policial SWAT', sub: 'Polícia de Miami • age sozinha', icone: '🚓', classe: 'inf', hp: 115, vel: 6.4, alcance: 58, dano: 15, cadencia: 0.3, precisao: 0.58, arma: 'fuzil', custo: 0, slots: 1, raio: 0.6, policia: true },
  bearcat: { nome: 'Blindado SWAT BearCat', sub: 'Polícia de Miami • leva 10', icone: '🚓', classe: 'veic', modelo: 'bearcat', hp: 1300, vel: 25, carga: 10, cargaTipos: ['inf', 'civil'], custo: 0, slots: 10, raio: 3.0, atropela: true, policia: true },
  // ---------------- aeronaves (heliporto) ----------------
  blackhawk: { nome: 'UH-60 Black Hawk', sub: 'Metralhadoras M134 • leva 11', icone: '🚁', classe: 'aereo', modelo: 'blackhawk', hp: 850, vel: 75, altCruz: 40, alcance: 95, dano: 10, cadencia: 0.07, precisao: 0.35, arma: 'm134', carga: 11, cargaTipos: ['inf', 'civil'], custo: 750, tempo: 16, de: 'heliporto', raio: 8 },
  chinook: { nome: 'CH-47 Chinook', sub: 'Leva 33 ou um Humvee', icone: '🚁', classe: 'aereo', modelo: 'chinook', hp: 1200, vel: 68, altCruz: 45, alcance: 80, dano: 11, cadencia: 0.16, precisao: 0.35, arma: 'm240', carga: 33, cargaTipos: ['inf', 'civil', 'leve'], custo: 950, tempo: 20, de: 'heliporto', raio: 10 },
  apache: { nome: 'AH-64 Apache', sub: 'Canhão 30mm + mísseis Hellfire', icone: '🚁', classe: 'aereo', modelo: 'apache', hp: 1000, vel: 80, altCruz: 55, alcance: 280, dano: 45, splash: 3, cadencia: 0.13, precisao: 0.55, arma: '30mm', sec: { alcance: 650, dano: 420, splash: 11, cadencia: 7, precisao: 0.95, arma: 'hellfire', missil: true }, custo: 1150, tempo: 22, de: 'heliporto', raio: 8 },
  reaper: { nome: 'Drone MQ-9 Reaper', sub: 'Vigia em círculos e lança Hellfire', icone: '🛩️', classe: 'aereo', modelo: 'reaper', hp: 450, vel: 70, altCruz: 260, orbita: 240, alcance: 750, dano: 420, splash: 11, cadencia: 6.5, precisao: 0.95, arma: 'hellfire', missil: true, custo: 700, tempo: 15, de: 'heliporto', raio: 10 },
  // ---------------- porta-aviões ----------------
  f35: { nome: 'F-35C Lightning II', sub: 'Bombas guiadas GBU • ataque aéreo', icone: '✈️', classe: 'jato', modelo: 'f35', hp: 900, vel: 250, altCruz: 160, dano: 650, splash: 20, municao: 4, arma: 'bomba', custo: 1500, tempo: 22, de: 'porta', raio: 9 },
  f18: { nome: 'F/A-18E Super Hornet', sub: 'Foguetes e canhão • ataque rasante', icone: '✈️', classe: 'jato', modelo: 'f18', hp: 900, vel: 260, altCruz: 150, dano: 180, splash: 9, municao: 3, rajada: 6, arma: 'foguete', custo: 1250, tempo: 20, de: 'porta', raio: 9 },
  osprey: { nome: 'MV-22 Osprey', sub: 'Rotores basculantes • leva 24', icone: '🛫', classe: 'aereo', modelo: 'osprey', hp: 1000, vel: 120, altCruz: 60, carga: 24, cargaTipos: ['inf', 'civil'], custo: 1200, tempo: 22, de: 'porta', raio: 9 },
  // ---------------- marinha (docas) ----------------
  lancha: { nome: 'Lancha Mark VI', sub: 'Patrulha • leva 8', icone: '🚤', classe: 'naval', modelo: 'lancha', nav: 1, hp: 800, vel: 28, alcance: 130, dano: 24, cadencia: 0.16, precisao: 0.45, arma: '50cal', carga: 8, cargaTipos: ['inf', 'civil'], custo: 320, tempo: 12, de: 'docas', raio: 8 },
  lcac: { nome: 'Hovercraft LCAC', sub: 'Anfíbio • leva tropas e veículos', icone: '🛥️', classe: 'naval', modelo: 'lcac', nav: 3, hp: 1400, vel: 26, carga: 30, cargaTipos: ['inf', 'civil', 'leve', 'veic'], custo: 750, tempo: 18, de: 'docas', raio: 12 },
  destroier: { nome: 'Destróier classe Arleigh Burke', sub: 'Canhão naval 5" de longo alcance', icone: '🚢', classe: 'naval', modelo: 'destroier', nav: 2, hp: 7000, vel: 16, alcance: 950, minAlc: 60, dano: 300, splash: 14, cadencia: 2.6, precisao: 0.8, arma: 'naval', arco: true, custo: 2400, tempo: 35, de: 'docas', raio: 30 },
  portaavioes: { nome: 'Porta-aviões USS Liberty', sub: 'Classe Nimitz • base flutuante', icone: '⚓', classe: 'naval', modelo: 'portaavioes', nav: 2, hp: 30000, vel: 7, carga: 0, custo: 0, de: null, raio: 60, unico: true },
};

export const ESTRUTURAS = {
  qg: { nome: 'Quartel-General', hp: 6000, raio: 26 },
  quartel: { nome: 'Quartel (Infantaria)', hp: 3000, raio: 30 },
  patio: { nome: 'Pátio de Veículos', hp: 3500, raio: 34 },
  heliporto: { nome: 'Heliporto', hp: 2500, raio: 40 },
  docas: { nome: 'Docas da Marinha', hp: 3000, raio: 30 },
  zona: { nome: 'Zona Segura (abrigo de civis)', hp: 2000, raio: 32 },
  torre: { nome: 'Torre de Vigia', hp: 900, raio: 4, alcance: 110, dano: 22, cadencia: 0.18, precisao: 0.5, arma: '50cal' },
  muro: { nome: 'Barreira', hp: 700, raio: 5 },
  patriot: { nome: 'Bateria Patriot', hp: 1500, raio: 6 },
};

export const PRODUCAO = {
  quartel: ['fuzileiro', 'metralhador', 'sniper', 'medico'],
  patio: ['humvee', 'ambulancia', 'stryker', 'bradley', 'abrams', 'paladin', 'himars'],
  heliporto: ['blackhawk', 'chinook', 'apache', 'reaper'],
  docas: ['lancha', 'lcac', 'destroier'],
  porta: ['f35', 'f18', 'osprey'],
};
export const NOMES_PROD = { quartel: '🪖 Quartel', patio: '🚙 Pátio', heliporto: '🚁 Heliporto', docas: '⚓ Docas', porta: '🛳️ Porta-aviões' };
