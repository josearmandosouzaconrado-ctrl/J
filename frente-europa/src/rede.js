// Fila de downloads com limite de conexões simultâneas e prioridade.
// Imagens de satélite (Esri World Imagery) e relevo (AWS Terrain Tiles / Terrarium).

export const URL_SATELITE = (z, x, y) =>
  `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
export const URL_RELEVO = (z, x, y) =>
  `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`;

const MAX_ATIVOS = 8;
let ativos = 0;
const fila = [];
export const estatRede = { ok: 0, erros: 0, pendentes: 0 };

export function baixarImagem(url, prioridade = 0) {
  return new Promise((resolve, reject) => {
    fila.push({ url, prioridade, resolve, reject });
    estatRede.pendentes = fila.length + ativos;
    bombear();
  });
}

function bombear() {
  if (ativos >= MAX_ATIVOS || !fila.length) return;
  // menor prioridade primeiro (tiles mais grossos / mais perto da câmera)
  let mi = 0;
  for (let i = 1; i < fila.length; i++) if (fila[i].prioridade < fila[mi].prioridade) mi = i;
  const job = fila.splice(mi, 1)[0];
  if (job.cancelado) return bombear();
  ativos++;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.decoding = 'async';
  const fim = () => {
    ativos--;
    estatRede.pendentes = fila.length + ativos;
    bombear();
  };
  img.onload = () => { estatRede.ok++; fim(); job.resolve(img); };
  img.onerror = () => { estatRede.erros++; fim(); job.reject(new Error('falha ' + job.url)); };
  img.src = job.url;
  bombear();
}

// Reordena prioridades de pedidos ainda na fila (ex.: quando a câmera se move)
export function limparFilaAntiga(manter) {
  for (let i = fila.length - 1; i >= 0; i--) {
    if (!manter(fila[i].url)) {
      fila[i].reject(new Error('cancelado'));
      fila.splice(i, 1);
    }
  }
  estatRede.pendentes = fila.length + ativos;
}
