const CHAVE = "guerra:perfil";

export const UPGRADES = {
  dano: { nome: "Dano das armas", desc: "+2 de dano no rifle e +3 no canhão por nível" },
  escudo: { nome: "Escudo de energia", desc: "Escudo mais forte e recarga 5s mais rápida por nível" },
  reforcos: { nome: "Reforços", desc: "+1 soldado por chamado e recarga mais rápida" },
  orbital: { nome: "Ataque orbital", desc: "+2 explosões e recarga 15s mais rápida por nível" },
};
export const CUSTO_UPGRADE = [100, 250, 500];

const PATENTES = [
  [0, "§7Recruta"],
  [50, "§fSoldado"],
  [150, "§aCabo"],
  [350, "§2Sargento"],
  [700, "§bTenente"],
  [1200, "§9Capitão"],
  [2000, "§5Major"],
  [3500, "§6Comandante"],
  [6000, "§c§lLenda da Guerra"],
];

export function carregarPerfil(player) {
  const s = player.getDynamicProperty(CHAVE);
  const base = { creditos: 0, abates: 0, vitorias: 0, derrotas: 0, batalhas: 0, up: { dano: 0, escudo: 0, reforcos: 0, orbital: 0 } };
  if (typeof s !== "string") return base;
  try {
    const p = JSON.parse(s);
    return { ...base, ...p, up: { ...base.up, ...p.up } };
  } catch {
    return base;
  }
}

export function salvarPerfil(player, p) {
  player.setDynamicProperty(CHAVE, JSON.stringify(p));
}

export function pontosPatente(p) {
  return p.abates + p.vitorias * 25;
}

export function patente(p) {
  const pts = pontosPatente(p);
  let atual = PATENTES[0][1];
  let prox = null;
  for (const [min, nome] of PATENTES) {
    if (pts >= min) atual = nome;
    else if (prox === null) prox = min;
  }
  return { nome: atual, proxima: prox, pontos: pts };
}

/** Soma créditos/estatísticas e devolve o perfil salvo. */
export function registrar(player, mudancas) {
  const p = carregarPerfil(player);
  for (const [k, v] of Object.entries(mudancas)) p[k] = (p[k] ?? 0) + v;
  salvarPerfil(player, p);
  return p;
}

export function comprarUpgrade(player, id) {
  const p = carregarPerfil(player);
  const nivel = p.up[id] ?? 0;
  if (nivel >= CUSTO_UPGRADE.length) return "Nível máximo atingido.";
  const custo = CUSTO_UPGRADE[nivel];
  if (p.creditos < custo) return `Créditos insuficientes (precisa de ${custo}).`;
  p.creditos -= custo;
  p.up[id] = nivel + 1;
  salvarPerfil(player, p);
  return null;
}
