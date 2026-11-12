// Tipos de unidades dos EUA, da Rússia e da China (valores ajustados para o jogo)
// classe: inf (infantaria), veic (veículo), aereo (helicóptero/drone), jato, naval
// de: onde é produzido (quartel, patio, heliporto, docas, porta)
// arma antitanque da infantaria (foguete): só dispara contra veículos e helicópteros
const AT = (arma, alcance = 160) => ({ alcance, dano: 420, splash: 2.5, cadencia: 14, precisao: 0.8, arma, antitanque: true });
export const TIPOS = {
  // ---------------- infantaria ----------------
  fuzileiro: { nome: 'Soldado', sub: 'Fuzil M4A1 + lança-foguetes AT4', icone: '🪖', classe: 'inf', hp: 100, vel: 6.5, alcance: 55, dano: 16, cadencia: 0.38, precisao: 0.6, arma: 'fuzil', sec: AT('at4'), custo: 60, tempo: 4, de: 'quartel', slots: 1, raio: 0.6 },
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
  seahawk: { nome: 'SH-60B Seahawk', sub: 'Marinha • M240 e mísseis Hellfire • leva 5', icone: '🚁', classe: 'aereo', modelo: 'seahawk', hp: 800, vel: 78, altCruz: 40, alcance: 100, dano: 11, cadencia: 0.16, precisao: 0.38, arma: 'm240', sec: { alcance: 520, dano: 320, splash: 9, cadencia: 9, precisao: 0.95, arma: 'hellfire' }, carga: 5, cargaTipos: ['inf', 'civil'], custo: 800, tempo: 16, de: 'heliporto', raio: 8 },
  chinook: { nome: 'CH-47 Chinook', sub: 'Leva 33 ou um Humvee', icone: '🚁', classe: 'aereo', modelo: 'chinook', hp: 1200, vel: 68, altCruz: 45, alcance: 80, dano: 11, cadencia: 0.16, precisao: 0.35, arma: 'm240', carga: 33, cargaTipos: ['inf', 'civil', 'leve'], custo: 950, tempo: 20, de: 'heliporto', raio: 10 },
  apache: { nome: 'AH-64 Apache', sub: 'Canhão 30mm + mísseis Hellfire', icone: '🚁', classe: 'aereo', modelo: 'apache', hp: 1000, vel: 80, altCruz: 55, alcance: 280, dano: 45, splash: 3, cadencia: 0.13, precisao: 0.55, arma: '30mm', sec: { alcance: 650, dano: 420, splash: 11, cadencia: 7, precisao: 0.95, arma: 'hellfire', missil: true }, custo: 1150, tempo: 22, de: 'heliporto', raio: 8 },
  littlebird: { nome: 'MH-6 Little Bird', sub: 'Leva 6 soldados nos bancos externos • rápido e pequeno', icone: '🚁', classe: 'aereo', modelo: 'littlebird', hp: 500, vel: 88, altCruz: 35, alcance: 75, dano: 12, cadencia: 0.16, precisao: 0.42, arma: 'fuzil', carga: 6, cargaTipos: ['inf'], custo: 450, tempo: 10, de: 'heliporto', raio: 5 },
  reaper: { nome: 'Drone MQ-9 Reaper', sub: 'Vigia em círculos e lança Hellfire', icone: '🛩️', classe: 'aereo', modelo: 'reaper', hp: 450, vel: 70, altCruz: 260, orbita: 240, alcance: 750, dano: 420, splash: 11, cadencia: 6.5, precisao: 0.95, arma: 'hellfire', missil: true, custo: 700, tempo: 15, de: 'heliporto', raio: 10 },
  // ---------------- Rússia ----------------
  ru_soldado: { nacao: 'russia', nome: 'Soldado russo', sub: 'Fuzil AK-12 + RPG-7', icone: '🪖', classe: 'inf', hp: 100, vel: 6.4, alcance: 55, dano: 17, cadencia: 0.4, precisao: 0.58, arma: 'fuzil', sec: AT('rpg', 150), custo: 55, tempo: 4, de: 'quartel', slots: 1, raio: 0.6 },
  ru_metralhador: { nacao: 'russia', nome: 'Metralhador russo', sub: 'Metralhadora PKP Pecheneg', icone: '🔫', classe: 'inf', hp: 120, vel: 5.9, alcance: 64, dano: 11, cadencia: 0.1, precisao: 0.42, arma: 'mg', custo: 95, tempo: 6, de: 'quartel', slots: 1, raio: 0.6 },
  ru_sniper: { nacao: 'russia', nome: 'Atirador russo', sub: 'Fuzil SVD Dragunov', icone: '🎯', classe: 'inf', hp: 90, vel: 6.2, alcance: 145, dano: 105, cadencia: 1.6, precisao: 0.9, arma: 'sniper', custo: 130, tempo: 8, de: 'quartel', slots: 1, raio: 0.6 },
  ru_medico: { nacao: 'russia', nome: 'Médico russo', sub: 'Cura soldados por perto', icone: '⚕️', classe: 'inf', hp: 100, vel: 6.6, alcance: 40, dano: 9, cadencia: 0.55, precisao: 0.5, arma: 'pistola', cura: 7, custo: 105, tempo: 6, de: 'quartel', slots: 1, raio: 0.6 },
  tigr: { nacao: 'russia', nome: 'GAZ Tigr', sub: 'Blindado leve 4x4 • metralhadora • leva 4', icone: '🚙', classe: 'veic', modelo: 'tigr', hp: 600, vel: 27, alcance: 85, dano: 22, cadencia: 0.16, precisao: 0.45, arma: '50cal', carga: 4, cargaTipos: ['inf', 'civil'], custo: 230, tempo: 8, de: 'patio', slots: 4, raio: 2.6, leve: true },
  btr82: { nacao: 'russia', nome: 'BTR-82A', sub: 'Blindado 8x8 • canhão 30mm • leva 7', icone: '🚐', classe: 'veic', modelo: 'btr82', hp: 1150, vel: 24, alcance: 115, dano: 48, splash: 2.5, cadencia: 0.3, precisao: 0.55, arma: '30mm', carga: 7, cargaTipos: ['inf', 'civil'], custo: 480, tempo: 12, de: 'patio', slots: 9, raio: 3.6 },
  bmp3: { nacao: 'russia', nome: 'BMP-3', sub: 'Blindado de esteiras • canhões 100mm e 30mm • leva 7', icone: '🛻', classe: 'veic', modelo: 'bmp3', hp: 1500, vel: 20, alcance: 125, dano: 70, splash: 3.5, cadencia: 0.45, precisao: 0.6, arma: '30mm', carga: 7, cargaTipos: ['inf', 'civil'], custo: 680, tempo: 15, de: 'patio', slots: 10, raio: 3.6 },
  t90: { nacao: 'russia', nome: 'Tanque T-90M', sub: 'Canhão 125mm', icone: '🛡️', classe: 'veic', modelo: 't90', hp: 3000, vel: 20, alcance: 170, dano: 310, splash: 8, cadencia: 4.4, precisao: 0.84, arma: '120mm', sec: { alcance: 90, dano: 12, cadencia: 0.11, precisao: 0.45, arma: 'mg' }, custo: 900, tempo: 20, de: 'patio', slots: 20, raio: 4.6, atropela: true },
  ka52: { nacao: 'russia', nome: 'Ka-52 Alligator', sub: 'Rotores coaxiais • canhão 30mm + mísseis Vikhr', icone: '🚁', classe: 'aereo', modelo: 'ka52', hp: 1050, vel: 82, altCruz: 55, alcance: 280, dano: 45, splash: 3, cadencia: 0.14, precisao: 0.55, arma: '30mm', sec: { alcance: 650, dano: 420, splash: 11, cadencia: 7, precisao: 0.95, arma: 'hellfire', missil: true }, custo: 1150, tempo: 22, de: 'heliporto', raio: 8 },
  mi8: { nacao: 'russia', nome: 'Mi-8AMTSh', sub: 'Transporte • foguetes • leva 20', icone: '🚁', classe: 'aereo', modelo: 'mi8', hp: 1000, vel: 70, altCruz: 45, alcance: 90, dano: 11, cadencia: 0.16, precisao: 0.38, arma: 'm240', carga: 20, cargaTipos: ['inf', 'civil'], custo: 850, tempo: 18, de: 'heliporto', raio: 10 },
  // ---------------- China ----------------
  cn_soldado: { nacao: 'china', nome: 'Soldado chinês', sub: 'Fuzil QBZ-191 + PF-98', icone: '🪖', classe: 'inf', hp: 100, vel: 6.5, alcance: 56, dano: 16, cadencia: 0.37, precisao: 0.6, arma: 'fuzil', sec: AT('rpg', 155), custo: 55, tempo: 4, de: 'quartel', slots: 1, raio: 0.6 },
  cn_metralhador: { nacao: 'china', nome: 'Metralhador chinês', sub: 'Metralhadora QJB-201', icone: '🔫', classe: 'inf', hp: 115, vel: 6.0, alcance: 62, dano: 10, cadencia: 0.09, precisao: 0.42, arma: 'mg', custo: 95, tempo: 6, de: 'quartel', slots: 1, raio: 0.6 },
  cn_sniper: { nacao: 'china', nome: 'Atirador chinês', sub: 'Fuzil QBU-191', icone: '🎯', classe: 'inf', hp: 90, vel: 6.3, alcance: 150, dano: 100, cadencia: 1.5, precisao: 0.9, arma: 'sniper', custo: 130, tempo: 8, de: 'quartel', slots: 1, raio: 0.6 },
  cn_medico: { nacao: 'china', nome: 'Médico chinês', sub: 'Cura soldados por perto', icone: '⚕️', classe: 'inf', hp: 100, vel: 6.6, alcance: 40, dano: 9, cadencia: 0.55, precisao: 0.5, arma: 'pistola', cura: 7, custo: 105, tempo: 6, de: 'quartel', slots: 1, raio: 0.6 },
  mengshi: { nacao: 'china', nome: 'Dongfeng Mengshi', sub: 'Blindado leve 4x4 • metralhadora • leva 4', icone: '🚙', classe: 'veic', modelo: 'mengshi', hp: 580, vel: 27, alcance: 85, dano: 22, cadencia: 0.16, precisao: 0.45, arma: '50cal', carga: 4, cargaTipos: ['inf', 'civil'], custo: 230, tempo: 8, de: 'patio', slots: 4, raio: 2.6, leve: true },
  zbl08: { nacao: 'china', nome: 'ZBL-08', sub: 'Blindado 8x8 • canhão 30mm • leva 7', icone: '🚐', classe: 'veic', modelo: 'zbl08', hp: 1150, vel: 24, alcance: 115, dano: 48, splash: 2.5, cadencia: 0.3, precisao: 0.55, arma: '30mm', carga: 7, cargaTipos: ['inf', 'civil'], custo: 480, tempo: 12, de: 'patio', slots: 9, raio: 3.6 },
  zbd04: { nacao: 'china', nome: 'ZBD-04A', sub: 'Blindado de esteiras • canhões 100mm e 30mm • leva 7', icone: '🛻', classe: 'veic', modelo: 'zbd04', hp: 1500, vel: 20, alcance: 125, dano: 68, splash: 3.5, cadencia: 0.45, precisao: 0.6, arma: '30mm', carga: 7, cargaTipos: ['inf', 'civil'], custo: 680, tempo: 15, de: 'patio', slots: 10, raio: 3.6 },
  type99: { nacao: 'china', nome: 'Tanque Type 99A', sub: 'Canhão 125mm', icone: '🛡️', classe: 'veic', modelo: 'type99', hp: 3100, vel: 21, alcance: 170, dano: 315, splash: 8, cadencia: 4.3, precisao: 0.85, arma: '120mm', sec: { alcance: 90, dano: 12, cadencia: 0.11, precisao: 0.45, arma: 'mg' }, custo: 920, tempo: 20, de: 'patio', slots: 20, raio: 4.8, atropela: true },
  z10: { nacao: 'china', nome: 'Z-10', sub: 'Helicóptero de ataque • canhão 23mm + mísseis HJ-10', icone: '🚁', classe: 'aereo', modelo: 'z10', hp: 950, vel: 84, altCruz: 55, alcance: 270, dano: 40, splash: 3, cadencia: 0.13, precisao: 0.55, arma: '30mm', sec: { alcance: 640, dano: 410, splash: 11, cadencia: 7, precisao: 0.95, arma: 'hellfire', missil: true }, custo: 1100, tempo: 22, de: 'heliporto', raio: 8 },
  z20: { nacao: 'china', nome: 'Z-20', sub: 'Transporte • metralhadoras • leva 11', icone: '🚁', classe: 'aereo', modelo: 'z20', hp: 850, vel: 76, altCruz: 40, alcance: 95, dano: 10, cadencia: 0.08, precisao: 0.35, arma: 'm134', carga: 11, cargaTipos: ['inf', 'civil'], custo: 760, tempo: 16, de: 'heliporto', raio: 8 },
  // jatos da Rússia e da China (pista de pouso)
  su57: { nacao: 'russia', nome: 'Su-57 Felon', sub: 'Caça furtivo • bombas guiadas KAB-500', icone: '✈️', classe: 'jato', modelo: 'su57', hp: 950, vel: 290, altCruz: 190, dano: 400, splash: 14, municao: 4, bombas: 4, arma: 'bomba', custo: 1700, tempo: 24, de: 'pista', raio: 9 },
  su25: { nacao: 'russia', nome: 'Su-25 Frogfoot', sub: 'Avião de ataque • canhão 30mm e foguetes', icone: '🛩️', classe: 'jato', modelo: 'su25', hp: 1500, vel: 160, altCruz: 90, dano: 65, splash: 4, municao: 5, arma: 'canhao', custo: 1300, tempo: 22, de: 'pista', raio: 9 },
  j20: { nacao: 'china', nome: 'J-20 Mighty Dragon', sub: 'Caça furtivo • bombas guiadas LS-6', icone: '✈️', classe: 'jato', modelo: 'j20', hp: 950, vel: 280, altCruz: 180, dano: 600, splash: 19, municao: 4, arma: 'bomba', custo: 1600, tempo: 24, de: 'pista', raio: 9 },
  j16: { nacao: 'china', nome: 'J-16', sub: 'Caça-bombardeiro • foguetes e bombas', icone: '✈️', classe: 'jato', modelo: 'j16', hp: 950, vel: 250, altCruz: 150, dano: 180, splash: 9, municao: 3, rajada: 6, arma: 'foguete', custo: 1250, tempo: 20, de: 'pista', raio: 9 },
  // ---------------- porta-aviões ----------------
  f35: { nome: 'F-35C Lightning II', sub: 'Caça furtivo • bombas guiadas GBU-31', icone: '✈️', classe: 'jato', modelo: 'f35', hp: 900, vel: 250, altCruz: 160, dano: 650, splash: 20, municao: 4, arma: 'bomba', custo: 1500, tempo: 22, de: 'porta', raio: 9 },
  f18: { nome: 'F/A-18E Super Hornet', sub: 'Foguetes e bombas • ataque rasante', icone: '✈️', classe: 'jato', modelo: 'f18', hp: 900, vel: 260, altCruz: 150, dano: 180, splash: 9, municao: 3, rajada: 6, arma: 'foguete', custo: 1250, tempo: 20, de: 'porta', raio: 9 },
  a10: { nome: 'A-10 Thunderbolt II', sub: 'Canhão GAU-8 de 30mm • metralha a faixa toda', icone: '🛩️', classe: 'jato', modelo: 'a10', hp: 1600, vel: 150, altCruz: 90, dano: 70, splash: 4, municao: 5, arma: 'canhao', custo: 1400, tempo: 22, de: 'pista', raio: 10 },
  f22: { nome: 'F-22 Raptor', sub: 'Mais rápido • 8 bombas pequenas SDB', icone: '✈️', classe: 'jato', modelo: 'f22', hp: 1000, vel: 300, altCruz: 200, dano: 380, splash: 13, municao: 4, bombas: 4, arma: 'bomba', custo: 1700, tempo: 24, de: 'pista', raio: 9 },
  osprey: { nome: 'MV-22 Osprey', sub: 'Rotores basculantes • leva 24', icone: '🛫', classe: 'aereo', modelo: 'osprey', hp: 1000, vel: 120, altCruz: 60, carga: 24, cargaTipos: ['inf', 'civil'], custo: 1200, tempo: 22, de: 'porta', raio: 9 },
  // ---------------- marinha (docas) ----------------
  lancha: { nome: 'Lancha Mark VI', sub: 'Patrulha • leva 8', icone: '🚤', classe: 'naval', modelo: 'lancha', nav: 1, hp: 800, vel: 28, alcance: 130, dano: 24, cadencia: 0.16, precisao: 0.45, arma: '50cal', carga: 8, cargaTipos: ['inf', 'civil'], custo: 320, tempo: 12, de: 'docas', raio: 8 },
  lcac: { nome: 'Hovercraft LCAC', sub: 'Anfíbio • leva tropas e veículos', icone: '🛥️', classe: 'naval', modelo: 'lcac', nav: 3, hp: 1400, vel: 26, carga: 30, cargaTipos: ['inf', 'civil', 'leve', 'veic'], custo: 750, tempo: 18, de: 'docas', raio: 12 },
  destroier: { nome: 'Destróier classe Arleigh Burke', sub: 'Canhão naval 5" de longo alcance', icone: '🚢', classe: 'naval', modelo: 'destroier', nav: 2, hp: 7000, vel: 16, alcance: 950, minAlc: 60, dano: 300, splash: 14, cadencia: 2.6, precisao: 0.8, arma: 'naval', arco: true, custo: 2400, tempo: 35, de: 'docas', raio: 30 },
  portaavioes: { nome: 'Porta-aviões USS Enterprise', sub: 'CVN-80, classe Ford • base flutuante', icone: '⚓', classe: 'naval', modelo: 'portaavioes', nav: 2, hp: 30000, vel: 7, carga: 0, custo: 0, de: null, raio: 60, unico: true },
};

// blindagem (0 = nenhuma, 1 = imune a tiros comuns): quanto do dano de armas leves é barrado
const BLIND = { humvee: 0.5, tigr: 0.5, mengshi: 0.5, ambulancia: 0.4, bearcat: 0.55, stryker: 0.75, btr82: 0.75, zbl08: 0.75, bradley: 0.85, bmp3: 0.85, zbd04: 0.85,
  abrams: 0.95, t90: 0.95, type99: 0.95, paladin: 0.85, himars: 0.6 };
for (const k in TIPOS) {
  const d = TIPOS[k];
  if (!d.nacao) d.nacao = 'eua';
  d.blindagem = BLIND[k] ?? (d.classe === 'inf' ? 0 : d.classe === 'aereo' ? 0.45 : d.classe === 'jato' ? 0.6 : d.classe === 'naval' ? 0.85 : 0.5);
}

export const ESTRUTURAS = {
  qg: { nome: 'Quartel-General', hp: 12000, raio: 26 },
  quartel: { nome: 'Quartel (Infantaria)', hp: 3000, raio: 30 },
  patio: { nome: 'Pátio de Veículos', hp: 3500, raio: 34 },
  heliporto: { nome: 'Heliporto', hp: 2500, raio: 40 },
  docas: { nome: 'Docas da Marinha', hp: 3000, raio: 30 },
  zona: { nome: 'Zona Segura (abrigo de civis)', hp: 2000, raio: 32 },
  torre: { nome: 'Torre de Vigia', hp: 900, raio: 4, alcance: 110, dano: 22, cadencia: 0.18, precisao: 0.5, arma: '50cal' },
  muro: { nome: 'Barreira', hp: 900, raio: 5 },
  fob: { nome: 'Posto Avançado (FOB)', hp: 2500, raio: 28 },
  pista: { nome: 'Pista de Pouso', hp: 8000, raio: 60 },
  patriot: { nome: 'Bateria antiaérea', hp: 1500, raio: 6, alcance: 900, dano: 520, cadencia: 5, precisao: 0.8, arma: 'sam', soAereo: true, antiaereo: true },
};

export const PRODUCAO = {
  quartel: ['fuzileiro', 'metralhador', 'sniper', 'medico'],
  patio: ['humvee', 'ambulancia', 'stryker', 'bradley', 'abrams', 'paladin', 'himars'],
  heliporto: ['littlebird', 'blackhawk', 'seahawk', 'chinook', 'apache', 'reaper'],
  docas: ['lancha', 'lcac', 'destroier'],
  porta: ['f35', 'f18', 'osprey', 'seahawk'],
  pista: ['f22', 'a10', 'f35', 'f18'],
};
// o que cada nação produz em cada estrutura
export const PRODUCAO_N = {
  eua: PRODUCAO,
  russia: { quartel: ['ru_soldado', 'ru_metralhador', 'ru_sniper', 'ru_medico'], patio: ['tigr', 'btr82', 'bmp3', 't90'], heliporto: ['ka52', 'mi8'], pista: ['su57', 'su25'] },
  china: { quartel: ['cn_soldado', 'cn_metralhador', 'cn_sniper', 'cn_medico'], patio: ['mengshi', 'zbl08', 'zbd04', 'type99'], heliporto: ['z10', 'z20'], pista: ['j20', 'j16'] },
};
export const NOMES_PROD = { quartel: '🪖 Quartel', patio: '🚙 Pátio', heliporto: '🚁 Heliporto', docas: '⚓ Docas', porta: '🛳️ Porta-aviões', pista: '🛫 Pista de pouso' };
// estruturas que o jogador pode construir em qualquer lugar do mapa
export const CONSTRUIR = {
  fob: { nome: 'Posto Avançado (FOB)', sub: 'Zona segura para civis + QG de campo', icone: '⛺', custo: 900, tempo: 25, raio: 30 },
  quartel: { nome: 'Quartel', sub: 'Treina infantaria aqui', icone: '🪖', custo: 1200, tempo: 35, raio: 34 },
  patio: { nome: 'Pátio de Veículos', sub: 'Produz blindados aqui', icone: '🚙', custo: 1600, tempo: 45, raio: 38 },
  heliporto: { nome: 'Heliporto', sub: 'Produz helicópteros aqui', icone: '🚁', custo: 1500, tempo: 40, raio: 44 },
  docas: { nome: 'Docas', sub: 'Precisa ficar na beira da água', icone: '⚓', custo: 1400, tempo: 40, raio: 34, agua: true },
  zona: { nome: 'Zona Segura', sub: 'Abrigo de civis (resgate)', icone: '🏥', custo: 700, tempo: 20, raio: 32 },
  torre: { nome: 'Torre de Vigia', sub: 'Metralhadora .50 automática', icone: '🗼', custo: 300, tempo: 10, raio: 6 },
  muro: { nome: 'Barreira', sub: 'Gabiões que seguram o avanço inimigo', icone: '🧱', custo: 60, tempo: 4, raio: 6 },
  patriot: { nome: 'Bateria antiaérea', sub: 'Mísseis contra jatos e helicópteros (Patriot / S-400 / HQ-9)', icone: '🛰️', custo: 600, tempo: 15, raio: 8 },
  pista: { nome: 'Pista de Pouso', sub: 'Base aérea: F-22 e A-10 (precisa de muito espaço)', icone: '🛫', custo: 2500, tempo: 50, raio: 60, grande: true },
};
