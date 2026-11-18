// Dados do OpenStreetMap (Overpass) por tile de zoom 15 (~800 m): prédios e ruas/estradas.
// Compartilhado entre o chão (ruas pintadas) e as cidades 3D (prédios). Sem internet: devolve null.
import { tx2lon, ty2lat } from './geo.js';

const OVERPASS = 'https://overpass-api.de/api/interpreter';
export const Z_OSM = 15;
const cache = new Map();
let falhas = 0, pausaAte = 0;
export const configOSM = { ligado: true };

export function dadosOSM(x, y) {
  const k = x + '/' + y;
  if (cache.has(k)) return cache.get(k);
  const p = baixar(x, y);
  cache.set(k, p);
  p.then((d) => { if (!d) setTimeout(() => cache.delete(k), 120000); });
  if (cache.size > 120) cache.delete(cache.keys().next().value);
  return p;
}

async function baixar(x, y) {
  if (!configOSM.ligado || performance.now() < pausaAte) return null;
  const s = ty2lat(y + 1, Z_OSM), n = ty2lat(y, Z_OSM), w = tx2lon(x, Z_OSM), e = tx2lon(x + 1, Z_OSM);
  const bb = `(${s.toFixed(6)},${w.toFixed(6)},${n.toFixed(6)},${e.toFixed(6)})`;
  const q = `[out:json][timeout:25];(way["building"]${bb};way["highway"]${bb};way["waterway"]${bb};);out geom;`;
  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), 25000);
  try {
    const r = await fetch(OVERPASS, {
      method: 'POST', body: 'data=' + encodeURIComponent(q), signal: ctl.signal,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (!r.ok) throw new Error('overpass ' + r.status);
    const d = await r.json();
    falhas = 0;
    const el = (d.elements || []).filter((e) => e.type === 'way' && e.geometry);
    return {
      predios: el.filter((e) => e.tags?.building),
      ruas: el.filter((e) => e.tags?.highway),
      rios: el.filter((e) => e.tags?.waterway),
    };
  } catch (err) {
    if (++falhas >= 2) pausaAte = performance.now() + 120000; // tenta de novo em 2 min
    return null;
  } finally {
    clearTimeout(to);
  }
}
