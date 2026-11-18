// Relevo real: tiles Terrarium (altitude = R*256 + G + B/256 - 32768 metros).
// Valores negativos = mar (batimetria) -> usados para saber onde é água.
import { baixarImagem, URL_RELEVO } from './rede.js';
import { lat2ty, lon2tx, paraLatLon } from './geo.js';

const cache = new Map(); // "z/x/y" -> { dados: Float32Array|null, estado, uso }
const MAX_CACHE = 260;
let quadro = 0;
const canvas = document.createElement('canvas');
canvas.width = canvas.height = 256;
const ctx = canvas.getContext('2d', { willReadFrequently: true });

export function tickRelevo() { quadro++; }

export function tileRelevo(z, x, y, prioridade = 5) {
  const k = z + '/' + x + '/' + y;
  let e = cache.get(k);
  if (e) { e.uso = quadro; return e; }
  e = { z, x, y, dados: null, estado: 1, uso: quadro, espera: [] };
  cache.set(k, e);
  baixarImagem(URL_RELEVO(z, x, y), prioridade).then((img) => {
    ctx.clearRect(0, 0, 256, 256);
    ctx.drawImage(img, 0, 0);
    const px = ctx.getImageData(0, 0, 256, 256).data;
    const d = new Float32Array(256 * 256);
    for (let i = 0; i < d.length; i++) d[i] = px[i * 4] * 256 + px[i * 4 + 1] + px[i * 4 + 2] / 256 - 32768;
    e.dados = d;
    e.estado = 2;
  }).catch(() => { e.estado = 3; }).finally(() => {
    e.espera.forEach((f) => f(e));
    e.espera = null;
    podar();
  });
  return e;
}

export function quandoPronto(e) {
  if (e.estado >= 2) return Promise.resolve(e);
  return new Promise((r) => e.espera.push(r));
}

function podar() {
  if (cache.size <= MAX_CACHE) return;
  const lista = [...cache.entries()].filter(([, e]) => e.estado >= 2 && e.z > 7).sort((a, b) => a[1].uso - b[1].uso);
  for (let i = 0; i < lista.length && cache.size > MAX_CACHE; i++) cache.delete(lista[i][0]);
}

// amostra bilinear dentro do tile (px, py em pixels 0..256)
export function amostrar(e, px, py) {
  const d = e.dados;
  if (!d) return 0;
  px = Math.min(255, Math.max(0, px - 0.5));
  py = Math.min(255, Math.max(0, py - 0.5));
  const x0 = Math.floor(px), y0 = Math.floor(py);
  const x1 = Math.min(255, x0 + 1), y1 = Math.min(255, y0 + 1);
  const fx = px - x0, fy = py - y0;
  const a = d[y0 * 256 + x0], b = d[y0 * 256 + x1], c = d[y1 * 256 + x0], dd = d[y1 * 256 + x1];
  return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + dd * fx) * fy;
}

// Altitude (m) num ponto lat/lon usando o tile de zoom z. Devolve null se ainda não carregou.
export function altitudeLatLon(lat, lon, z = 12, pedir = true) {
  const tx = lon2tx(lon, z), ty = lat2ty(lat, z);
  const x = Math.floor(tx), y = Math.floor(ty);
  const k = z + '/' + x + '/' + y;
  let e = cache.get(k);
  if (!e) {
    if (!pedir) return null;
    e = tileRelevo(z, x, y, z);
  }
  e.uso = quadro;
  if (e.estado !== 2) return null;
  return amostrar(e, (tx - x) * 256, (ty - y) * 256);
}

// Melhor altitude disponível (tenta zoom 12, depois 10 e 7, já carregados)
export function altitude(xm, zm, pedir = true) {
  const { lat, lon } = paraLatLon(xm, zm);
  let h = altitudeLatLon(lat, lon, 12, pedir);
  if (h === null) h = altitudeLatLon(lat, lon, 10, false);
  if (h === null) h = altitudeLatLon(lat, lon, 7, false);
  return h;
}

// Altura do chão onde as unidades andam (mar = 0)
export function chao(xm, zm, pedir = true) {
  const h = altitude(xm, zm, pedir);
  return h === null ? null : Math.max(0, h);
}

// É mar? (true / false / null = ainda não sabe)
export function ehAgua(xm, zm, pedir = true) {
  const { lat, lon } = paraLatLon(xm, zm);
  let h = altitudeLatLon(lat, lon, 10, pedir);
  if (h === null) h = altitudeLatLon(lat, lon, 7, false);
  if (h === null) return null;
  return h < 0;
}

// Pré-carrega o relevo grosso de uma região (lat/lon) para saber onde é terra e mar
export function preCarregar(latMin, latMax, lonMin, lonMax, z) {
  const x0 = Math.floor(lon2tx(lonMin, z)), x1 = Math.floor(lon2tx(lonMax, z));
  const y0 = Math.floor(lat2ty(latMax, z)), y1 = Math.floor(lat2ty(latMin, z));
  const ps = [];
  for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) ps.push(quandoPronto(tileRelevo(z, x, y, 0)));
  return Promise.all(ps);
}
