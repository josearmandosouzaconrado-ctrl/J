// Estado compartilhado do jogo
export const G = {
  cena: null, camera: null, renderer: null, bonecos: null, efeitos: null,
  unidades: [], agentes: [], projeteis: [],
  hashA: null, hashU: null,
  dinheiro: 3000, tempo: 0, velocidade: 1, pausado: true, fim: false,
  resgatados: 0, civisMortos: 0, zumbisMortos: 0, perdas: 0, populacao: 0, meta: 250,
  selecao: [], alertas: [], focos: 0, proxFoco: 25,
  dificuldade: 'normal', base: null, porta: null, estr: {},
  satelite: null, cfg: { satelite: true, som: true, qualidade: 1 },
  controlando: null,
  idSeq: 1,
};

export function alerta(txt, x, z, tipo = 'info') {
  G.alertas.push({ txt, x, z, tipo, t: G.tempo, criado: performance.now() });
  if (G.alertas.length > 30) G.alertas.shift();
  if (G.ui) G.ui.alerta(txt, x, z, tipo);
}
