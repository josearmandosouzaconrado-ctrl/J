'use strict';
// ===================== CRÔNICAS ESTELARES: galáxia, planetas e itens =====================
const ITENS = {
  cristal_laranja: { nome: 'Cristal de Âmbar', valor: 40, cor: '#ffa030' },
  cristal_azul: { nome: 'Cristal Glacial', valor: 55, cor: '#70c8ff' },
  cristal_verde: { nome: 'Cristal Vivo', valor: 45, cor: '#60f070' },
  cristal_vermelho: { nome: 'Cristal de Magma', valor: 70, cor: '#ff4030' },
  cristal_violeta: { nome: 'Cristal do Vazio', valor: 90, cor: '#c070ff' },
  cristal_ciano: { nome: 'Pérola Abissal', valor: 60, cor: '#40f0e0' },
  amostra: { nome: 'Amostra Biológica', valor: 25, cor: '#c0e060' },
  sucata: { nome: 'Sucata de Nave', valor: 30, cor: '#a0a8b0' },
  medkit: { nome: 'Kit Médico', valor: 60, cor: '#ff6060', uso: 'cura' },
  carga: { nome: 'Carga Lacrada', valor: 0, cor: '#e0c060', missao: true }
};
const BIOMAS = {
  selva: { nome: 'Selva', chao: ['#3a7a3a', '#2e6a32'], areia: '#8a7a4a', liquido: '#2a6a8a', rocha: '#5a5a4a', flora: 'arvore', floraCor: '#4ab04a', cristal: 'cristal_verde', agua: 0.12, arvores: 0.09, rochas: 0.02, espaco: ['#2a5a9a', '#3a8a3a', '#2e6a30', '#e8f0f0'], atmos: '#a0e0ff', fauna: [['rastejante', '#8aa040'], ['fera', '#6a8a3a'], ['voador', '#3a6a4a']], luz: null },
  desertico: { nome: 'Deserto', chao: ['#c8784a', '#b86a40'], areia: '#d8905a', liquido: '#6a3a2a', rocha: '#7a3e2a', flora: 'espinho', floraCor: '#7a9a3a', cristal: 'cristal_laranja', agua: -1, arvores: 0.02, rochas: 0.05, espaco: ['#a8583a', '#c8784a', '#d89060', '#f0c090'], atmos: '#ffc080', fauna: [['rastejante', '#b07a3a'], ['fera', '#a0603a']], luz: 'rgba(255,140,60,0.10)' },
  gelido: { nome: 'Gelo', chao: ['#d8e6f0', '#c8d8e8'], areia: '#b8c8d8', liquido: '#5a8ab8', rocha: '#7890a8', flora: 'cristal', floraCor: '#a0d8ff', cristal: 'cristal_azul', agua: 0.05, arvores: 0.03, rochas: 0.04, espaco: ['#6a9ac8', '#c8d8e8', '#e8f0f8', '#ffffff'], atmos: '#e0f0ff', fauna: [['fera', '#d0d8e8'], ['gosma', '#80b8e0']], luz: 'rgba(160,200,255,0.10)' },
  vulcanico: { nome: 'Vulcão', chao: ['#3a2a2a', '#2e2222'], areia: '#4a3430', liquido: '#ff6020', liquidoQuente: true, rocha: '#1e1616', flora: 'espinho', floraCor: '#5a3a3a', cristal: 'cristal_vermelho', agua: 0.08, arvores: 0.02, rochas: 0.07, espaco: ['#ff6020', '#3a2a2a', '#5a3a30', '#1e1616'], atmos: '#ff8040', fauna: [['golem', '#6a4a3a'], ['rastejante', '#a03a20']], luz: 'rgba(255,80,30,0.12)' },
  cristalino: { nome: 'Cristais', chao: ['#4a3a6a', '#3e3060'], areia: '#5a4a7a', liquido: '#2a1a4a', rocha: '#2a2240', flora: 'cristal', floraCor: '#d080ff', cristal: 'cristal_violeta', agua: 0.04, arvores: 0.06, rochas: 0.03, espaco: ['#2a1a4a', '#5a3a8a', '#8a5ac0', '#e0b0ff'], atmos: '#d0a0ff', fauna: [['golem', '#a070e0'], ['voador', '#6a3aa0']], luz: 'rgba(160,80,255,0.10)' },
  oceanico: { nome: 'Oceano', chao: ['#5a9a6a', '#4a8a5a'], areia: '#e0d090', liquido: '#2a70b0', rocha: '#6a6a5a', flora: 'palmeira', floraCor: '#40c080', cristal: 'cristal_ciano', agua: 0.32, arvores: 0.05, rochas: 0.01, espaco: ['#1a5aa0', '#2a70b0', '#e0d090', '#5a9a6a'], atmos: '#80c0ff', fauna: [['gosma', '#40c0b0'], ['voador', '#3a8ac0']], luz: null },
  gasoso: { nome: 'Gigante gasoso', espaco: ['#c89060', '#e0b080', '#a87050', '#f0d0a0'], faixas: true, atmos: '#ffd0a0', semSolo: true }
};
// 3 sistemas estelares, cada um com sua estrela, planetas e uma estação
const SISTEMAS = [
  { id: 'kael', nome: 'Sol Kael', estrela: '#fff0a0', gx: 0.22, gy: 0.55, estacao: 'Estação Órion', planetas: [
    { id: 'aurora', nome: 'Nova Aurora', bioma: 'selva', raca: 'humano', orbita: 900, r: 42, vel: 0.010 },
    { id: 'kharax', nome: 'Kharax', bioma: 'desertico', raca: 'krell', orbita: 1500, r: 36, vel: 0.007 },
    { id: 'pyros', nome: 'Pyros', bioma: 'vulcanico', raca: 'moruk', orbita: 2200, r: 34, vel: 0.005 },
    { id: 'titan', nome: 'Gorgon', bioma: 'gasoso', raca: null, orbita: 3000, r: 70, vel: 0.003, anel: true } ] },
  { id: 'zeta', nome: 'Zeta Vorn', estrela: '#a0c0ff', gx: 0.52, gy: 0.28, estacao: 'Estação Meridiana', planetas: [
    { id: 'zorkia', nome: 'Zorkia', bioma: 'cristalino', raca: 'zorkiano', orbita: 1000, r: 40, vel: 0.009 },
    { id: 'aquara', nome: 'Aquara', bioma: 'oceanico', raca: 'lumari', orbita: 1700, r: 46, vel: 0.006 },
    { id: 'ferrum', nome: 'Ferrum', bioma: 'desertico', raca: 'moruk', orbita: 2500, r: 32, vel: 0.004 } ] },
  { id: 'ishar', nome: 'Nebulosa Ishar', estrela: '#ff90c0', gx: 0.78, gy: 0.62, estacao: 'Estação Limiar', nebulosa: true, planetas: [
    { id: 'vaaris', nome: 'Vaaris', bioma: 'gelido', raca: 'vaari', orbita: 1100, r: 40, vel: 0.008 },
    { id: 'kryth', nome: 'Kryth', bioma: 'vulcanico', raca: 'krell', orbita: 1800, r: 34, vel: 0.006 },
    { id: 'lumina', nome: 'Lumina', bioma: 'cristalino', raca: 'lumari', orbita: 2600, r: 38, vel: 0.004 },
    { id: 'hydra', nome: 'Hydra', bioma: 'gasoso', raca: null, orbita: 3300, r: 64, vel: 0.002 } ] }
];
const LAR = { humano: 'aurora', krell: 'kharax', moruk: 'pyros', zorkiano: 'zorkia', lumari: 'aquara', vaari: 'vaaris' };
const FALAS = {
  humano: ['Bem-vindo a Nova Aurora, viajante. Aqui ainda chove de verdade.', 'Cuidado com os piratas no cinturão de asteroides.', 'Dizem que em Lumina os cristais cantam à noite.', 'Meu avô dizia que a Terra era azul. Eu nunca vi.'],
  zorkiano: ['Zib zib! Seus olhos são tão pequenos... como você enxerga?', 'Os cristais do vazio guardam pensamentos antigos.', 'Nós inventamos o salto estelar. Os terranos só copiaram.', 'Zorkia não aceita visitantes barulhentos. Fale baixo.'],
  krell: ['Krrr... A carapaça endurece no sol de Kharax.', 'Um Krell sem enxame é um Krell sem honra.', 'As feras do deserto são boa caça. Traga amostras.', 'Kryth é a nossa colônia de guerra. Não vá lá desarmado.'],
  vaari: ['...silêncio. As estrelas falam baixo.', 'Em Vaaris o gelo guarda nossos mortos.', 'Os Vaari enxergam no escuro do espaço.', 'Seu escudo está fraco, viajante. Recarregue antes de partir.'],
  moruk: ['HAH! Pele mole. Você derrete fácil.', 'O magma é o sangue dos Moruk.', 'Pyros forja as melhores armas da galáxia.', 'Trago pedra, levo ouro. Simples.'],
  lumari: ['Bluuu... você brilha pouco. Está triste?', 'Os mares de Aquara são mais fundos que o tempo.', 'Lumina é a nossa irmã de luz.', 'Cuidado: as gosmas comem qualquer coisa que brilha.']
};
const SOLO = 96;   // tamanho do mapa da superfície (tiles)

const Galaxia = {
  sistema(id) { return SISTEMAS.find(s => s.id === id); },
  planeta(id) { for (const s of SISTEMAS) for (const p of s.planetas) if (p.id === id) return p; return null; },
  sistemaDe(pid) { return SISTEMAS.find(s => s.planetas.some(p => p.id === pid)); },
  // posição do planeta na órbita (o tempo da galáxia anda devagar)
  pos(pl, t) { const a = hashStr(pl.id) % 628 / 100 + t * pl.vel; return { x: Math.cos(a) * pl.orbita, y: Math.sin(a) * pl.orbita }; },
  posEstacao(S, t) { const a = 1.3 + t * 0.006; return { x: Math.cos(a) * 600, y: Math.sin(a) * 600 }; },
  // ---------- superfície de um planeta ----------
  solo(pl) {
    const B = BIOMAS[pl.bioma], n = new Simplex(hashStr(pl.id) + 7), m = new Simplex(hashStr(pl.id) + 19), rng = new RNG(hashStr(pl.id) + 3);
    const T = new Uint8Array(SOLO * SOLO), O = new Array(SOLO * SOLO).fill(null);
    const cx = SOLO / 2, cy = SOLO / 2;
    for (let y = 0; y < SOLO; y++) for (let x = 0; x < SOLO; x++) {
      const i = y * SOLO + x, e = fbm(n, x * 0.045, y * 0.045, 4), q = m.noise(x * 0.11, y * 0.11);
      const borda = Math.max(Math.abs(x - cx), Math.abs(y - cy)) > SOLO / 2 - 3;
      const cidade = Math.abs(x - cx) < 12 && Math.abs(y - cy) < 9;
      if (borda) { T[i] = 0; O[i] = 'rocha'; continue; }
      if (cidade) { T[i] = 4; continue; }
      if (e < -0.35 + B.agua * 1.6 && B.agua >= 0 && dist(x, y, cx, cy) > 16) { T[i] = 2; continue; }
      T[i] = e < -0.2 + B.agua * 1.6 ? 3 : q > 0.2 ? 1 : 0;
      const r = rng.next(), dc = dist(x, y, cx, cy);
      if (dc < 14) continue;
      if (r < B.rochas) O[i] = 'rocha'; else if (r < B.rochas + B.arvores) O[i] = 'planta'; else if (r < B.rochas + B.arvores + 0.006 + (dc > 30 ? 0.006 : 0)) O[i] = 'cristal';
    }
    // a cidade: domos, loja, torre e postes
    const cid = [];
    const domo = (x, y, k) => { cid.push({ x, y, k }); for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 3; dx++) O[(y + dy) * SOLO + x + dx] = 'bloco'; };
    domo(cx - 10, cy - 8, 'domo'); domo(cx + 6, cy - 8, 'loja'); domo(cx - 10, cy + 3, 'domo'); domo(cx + 6, cy + 3, 'domo'); domo(cx - 2, cy - 8, 'domo');
    O[(cy + 6) * SOLO + cx - 4] = 'torre'; for (const [x, y] of [[cx - 4, cy - 3], [cx + 4, cy - 3], [cx - 4, cy + 1], [cx + 4, cy + 1]]) O[y * SOLO + x] = 'lampada';
    // pista de pouso ao sul da cidade
    const pista = { x: cx, y: cy + 12 };
    for (let dy = -2; dy <= 2; dy++) for (let dx = -3; dx <= 3; dx++) { const i = (pista.y + dy) * SOLO + pista.x + dx; T[i] = 4; O[i] = null; }
    return { T, O, cid, pista, B };
  }
};
