// Geografia: converte latitude/longitude em metros reais no mundo 3D.
// Projeção sinusoidal centrada na França: distâncias norte-sul são exatas em todo lugar
// e leste-oeste são exatas em cada paralelo -> o mapa fica em TAMANHO REAL (1 unidade = 1 metro).
// Eixos: x = leste, z = sul (norte = -z), y = altitude.

export const R_TERRA = 6378137;
export const ORIGEM = { lat: 46.6, lon: 2.4 };
const D2R = Math.PI / 180;

export function paraMundo(lat, lon) {
  return {
    x: R_TERRA * (lon - ORIGEM.lon) * D2R * Math.cos(lat * D2R),
    z: -R_TERRA * (lat - ORIGEM.lat) * D2R,
  };
}

export function paraLatLon(x, z) {
  const lat = ORIGEM.lat - z / R_TERRA / D2R;
  const lon = ORIGEM.lon + x / (R_TERRA * Math.cos(lat * D2R)) / D2R;
  return { lat, lon };
}

// --- Tiles "slippy map" (Web Mercator), usados pelas imagens de satélite e pelo relevo ---
export const lon2tx = (lon, z) => ((lon + 180) / 360) * 2 ** z;
export const lat2ty = (lat, z) => {
  const r = lat * D2R;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z;
};
export const tx2lon = (x, z) => (x / 2 ** z) * 360 - 180;
export const ty2lat = (y, z) => {
  const n = Math.PI - (2 * Math.PI * y) / 2 ** z;
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
};

export function distancia(a, b) {
  const dx = a.x - b.x, dz = a.z - b.z;
  return Math.hypot(dx, dz);
}

export function formatarDist(m) {
  return m >= 1000 ? (m / 1000).toFixed(m >= 10000 ? 0 : 1) + ' km' : Math.round(m) + ' m';
}
