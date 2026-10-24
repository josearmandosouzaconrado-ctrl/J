export const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);
export const hyp = (x, z) => Math.sqrt(x * x + z * z);
export const rand = (min = 0, max = 1) => min + Math.random() * (max - min);
export const randInt = (min, max) => Math.floor(rand(min, max + 1));
export const escolher = (lista) => lista[Math.floor(Math.random() * lista.length)];

export function embaralhar(lista) {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function poisson(lambda) {
  const l = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > l && k < 12);
  return k - 1;
}

/** Gerador pseudoaleatório determinístico (mulberry32). */
export function rng(semente) {
  let s = semente >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function dinheiro(v) {
  return "R$ " + Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Distância de um ponto (px,pz) ao segmento (ax,az)-(bx,bz). */
export function distSegmento(px, pz, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const l2 = dx * dx + dz * dz;
  if (l2 === 0) return hyp(px - ax, pz - az);
  const t = clamp(((px - ax) * dx + (pz - az) * dz) / l2, 0, 1);
  return hyp(px - (ax + t * dx), pz - (az + t * dz));
}
