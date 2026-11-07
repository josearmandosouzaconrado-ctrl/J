// Utilidades gerais: matemática, aleatório e grade espacial (hash) para buscas rápidas
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
export const randi = (a, b) => Math.floor(rand(a, b + 1));
export const escolher = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const dist2 = (ax, az, bx, bz) => { const dx = ax - bx, dz = az - bz; return dx * dx + dz * dz; };
export const dist = (ax, az, bx, bz) => Math.sqrt(dist2(ax, az, bx, bz));
export function angDif(a, b) { let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; }
export function girarPara(a, b, max) { const d = angDif(a, b); return Math.abs(d) <= max ? b : a + Math.sign(d) * max; }

// Grade espacial: guarda objetos com .x/.z; reconstruída a cada quadro
export class Hash {
  constructor(cel, larg, alt, cap) {
    this.cel = cel;
    this.nx = Math.ceil(larg / cel) + 1;
    this.nz = Math.ceil(alt / cel) + 1;
    this.head = new Int32Array(this.nx * this.nz).fill(-1);
    this.next = new Int32Array(cap);
    this.itens = [];
    this.usadas = [];
  }
  chave(x, z) {
    let cx = Math.floor(x / this.cel), cz = Math.floor(z / this.cel);
    if (cx < 0) cx = 0; else if (cx >= this.nx) cx = this.nx - 1;
    if (cz < 0) cz = 0; else if (cz >= this.nz) cz = this.nz - 1;
    return cz * this.nx + cx;
  }
  limpar() {
    for (const k of this.usadas) this.head[k] = -1;
    this.usadas.length = 0;
    this.itens.length = 0;
  }
  add(o) {
    const i = this.itens.length;
    if (i >= this.next.length) { const n = new Int32Array(this.next.length * 2); n.set(this.next); this.next = n; }
    this.itens.push(o);
    const k = this.chave(o.x, o.z);
    if (this.head[k] === -1) this.usadas.push(k);
    this.next[i] = this.head[k];
    this.head[k] = i;
  }
  // chama fn(obj, d2) para todos dentro do raio r; se fn retornar true, para
  busca(x, z, r, fn) {
    const c = this.cel;
    const x0 = Math.max(0, Math.floor((x - r) / c)), x1 = Math.min(this.nx - 1, Math.floor((x + r) / c));
    const z0 = Math.max(0, Math.floor((z - r) / c)), z1 = Math.min(this.nz - 1, Math.floor((z + r) / c));
    const r2 = r * r;
    for (let cz = z0; cz <= z1; cz++) {
      for (let cx = x0; cx <= x1; cx++) {
        let i = this.head[cz * this.nx + cx];
        while (i !== -1) {
          const o = this.itens[i];
          const dx = o.x - x, dz = o.z - z, d2 = dx * dx + dz * dz;
          if (d2 <= r2 && fn(o, d2)) return;
          i = this.next[i];
        }
      }
    }
  }
  maisProximo(x, z, r, filtro) {
    let melhor = null, md = Infinity;
    this.busca(x, z, r, (o, d2) => { if (d2 < md && (!filtro || filtro(o))) { md = d2; melhor = o; } });
    return melhor;
  }
  contar(x, z, r, filtro) {
    let n = 0;
    this.busca(x, z, r, (o) => { if (!filtro || filtro(o)) n++; });
    return n;
  }
}
