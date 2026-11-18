'use strict';
// =====================================================================
//  PINDORAMA (continente 5): arte, natureza, povos e cidades
//  • Árvores da grande floresta: sumaúma gigante com cipós, açaí, buriti,
//    bananeira, ipê-amarelo/roxo, mandacaru do sertão, helicônias e
//    vitórias-régias nos rios e lagoas.
//  • Arquitetura de cada povo: ocas e malocas de palha (povos da mata),
//    casarões coloniais coloridos com azulejo e igrejas barrocas (Vera Cruz),
//    palafitas (Pantaneira), casas de taipa com telha de barro (Sertão e
//    garimpo) e mocambos de pau-a-pique (Quilombo da Serra Livre).
//  • Povos: a gente da mata (pintura de urucum e jenipapo, colares de
//    sementes, cocar de penas nos caciques, pajés e guerreiros) e o povo
//    misturado de Pindorama (chapéu de palha, chapéu de couro do cangaço).
//  • Geração: cidades, aldeias, masmorras, acampamentos, santuários,
//    portos na costa oeste (de frente para o Mar Verde) e estradas.
// =====================================================================
const Pindorama = {
  BIOMAS: new Set(SEM_NEVE_PINDORAMA),
  ehBioma(b) { return this.BIOMAS.has(b); }
};

// ---------- objetos novos ----------
Object.assign(O, { SUMAUMA: 165, ACAI: 166, BURITI: 167, BANANEIRA: 168, IPE: 169, MANDACARU: 170, HELICONIA: 171, VITORIA: 172 });
odef(O.SUMAUMA, { name: 'Sumaúma', solid: true });
odef(O.ACAI, { name: 'Açaizeiro', solid: true });
odef(O.BURITI, { name: 'Buriti', solid: true });
odef(O.BANANEIRA, { name: 'Bananeira', solid: true });
odef(O.IPE, { name: 'Ipê', solid: true });
odef(O.MANDACARU, { name: 'Mandacaru', solid: true });
odef(O.HELICONIA, { name: 'Helicônia' });
odef(O.VITORIA, { name: 'Vitória-régia' });
[O.SUMAUMA, O.ACAI, O.BURITI, O.BANANEIRA, O.IPE, O.MANDACARU].forEach(o => { OSOLID[o] = 1; TREE_OBJS.add(o); });
TREE_OBJS.delete(O.MANDACARU);
OBJ_BAKED[O.VITORIA] = 1;
Object.assign(OBJ_VARIANTS, { [O.SUMAUMA]: 3, [O.ACAI]: 3, [O.BURITI]: 3, [O.BANANEIRA]: 3, [O.IPE]: 3, [O.MANDACARU]: 3, [O.HELICONIA]: 3, [O.VITORIA]: 3 });
SEM_NEVE_PINDORAMA.forEach(b => SEM_NEVE.add(b));
Object.assign(ORE_BY_REGION, {
  veracruz: [O.ORE_FERRO, O.ORE_PRATA, O.ORE_OURO], jaguarete: [O.ORE_MALAQUITA, O.ORE_FERRO], guaraci: [O.ORE_MALAQUITA, O.ORE_OURO], pantaneira: [O.ORE_FERRO, O.ORE_PRATA],
  sertao: [O.ORE_FERRO, O.ORE_OURO, O.ORE_PRATA], quilombo: [O.ORE_FERRO, O.ORE_OURO], ourofino: [O.ORE_OURO, O.ORE_OURO, O.ORE_OURO, O.ORE_FERRO]
});

(function () {
  const S = Sprites, E = S.ellipse, X = S.extraObj;
  // copa de folhas: vários círculos com luz em cima e sombra embaixo
  const copa = (p, cx, cy, rx, ry, cores, r, n = 9) => {
    E(p, cx, cy + 1, rx, ry, cores[0]);
    for (let i = 0; i < n; i++) { const a = r.next() * Math.PI * 2, d = r.next() * 0.6; E(p, cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d - 1, rx * 0.45, ry * 0.45, cores[1]); }
    for (let i = 0; i < n * 0.6; i++) { const x = cx + (r.next() - 0.5) * rx * 1.3, y = cy - ry * 0.4 + (r.next() - 0.6) * ry * 0.8; E(p, x, y, rx * 0.22, ry * 0.22, cores[2]); }
  };
  // fronde de palmeira: uma linha curva com folíolos
  const fronde = (p, x0, y0, dx, dy, comp, cor, cor2) => {
    let x = x0, y = y0;
    for (let i = 0; i < comp; i++) {
      x += dx; y += dy + i * 0.09;
      p(Math.round(x), Math.round(y), cor);
      if (i > 1 && i % 2 === 0) { p(Math.round(x), Math.round(y) + 1, cor2); p(Math.round(x - dy * 0.6), Math.round(y + 1 + Math.abs(dx) * 0.4), cor2); }
    }
  };
  X[O.SUMAUMA] = (v, f, r, mk) => {
    const verde = [['#1e4a1c', '#2e6a24', '#4a8a30'], ['#204a22', '#2a6428', '#3e8230'], ['#1a4420', '#28602a', '#46883a']][v];
    const c = mk(56, 72, (p, ctx) => {
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(28, 69, 20, 3, 0, 0, Math.PI * 2); ctx.fill();
      // tronco claro e reto, com sapopemas (raízes-tábua) abertas na base
      p(24, 26, '#a89a86', 9, 44); p(24, 26, '#c4b8a4', 2, 44); p(31, 26, '#7a6e60', 2, 44);
      for (let k = 0; k < 4; k++) { const s = k < 2 ? -1 : 1, off = k % 2 ? 6 : 3; for (let y = 0; y < 14; y++) { const w = Math.round((y / 14) * (off + 4)); p(s < 0 ? 24 - w : 33, 56 + y, k % 2 ? '#8a7e6e' : '#b0a490', w, 1); } }
      for (let y = 30; y < 66; y += 6) p(25, y, '#8a7e70', 6, 1);
      // galhos abertos lá em cima
      for (const [x, y, w] of [[12, 22, 14], [32, 20, 14], [18, 16, 6], [32, 14, 8]]) p(x, y, '#8a7e6e', w, 2);
      // copa em guarda-chuva, larga
      copa(p, 28, 16, 27, 12, verde, r, 14);
      copa(p, 12, 20, 11, 7, verde, r, 5); copa(p, 44, 19, 11, 7, verde, r, 5);
      // cipós caindo da copa
      for (let i = 0; i < 6; i++) { let x = 6 + r.int(0, 44), y = 22 + r.int(0, 4); const L = r.int(10, 26); for (let k = 0; k < L; k++) { p(x, y + k, k % 5 === 4 ? '#5a8a30' : '#3a5a24'); if (k % 6 === 5) x += r.int(-1, 1); } }
      if (v === 2) for (let i = 0; i < 6; i++) p(r.int(8, 48), r.int(8, 24), '#f4f0e8', 2, 1);   // paina (algodão) branca
    });
    return { c, oy: 3 };
  };
  X[O.ACAI] = (v, f, r, mk) => {
    const c = mk(26, 46, (p, ctx) => {
      ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.beginPath(); ctx.ellipse(13, 44, 6, 1.6, 0, 0, Math.PI * 2); ctx.fill();
      const lean = v === 1 ? 1 : v === 2 ? -1 : 0;
      for (let y = 12; y < 44; y++) { const x = 12 + Math.round(lean * (44 - y) / 16); p(x, y, '#8a8478', 2, 1); if (y % 4 === 0) p(x, y, '#6a6458', 2, 1); }
      const tx = 12 + Math.round(lean * 2);
      for (const [dx, dy, L] of [[-1, 0.15, 11], [1, 0.15, 11], [-0.8, -0.35, 9], [0.8, -0.35, 9], [-0.4, -0.6, 7], [0.4, -0.6, 7], [-1, 0.5, 10], [1, 0.5, 10]]) fronde(p, tx + 1, 12, dx, dy, L, '#2e6a24', '#4a8a34');
      // cacho de açaí roxo
      E(p, tx + 3, 16, 2, 2, '#3a1a4a'); E(p, tx - 1, 17, 2, 1.5, '#4a2a5a'); p(tx + 3, 15, '#7a5a9a');
    });
    return { c, oy: 2 };
  };
  X[O.BURITI] = (v, f, r, mk) => {
    const c = mk(32, 46, (p, ctx) => {
      ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.beginPath(); ctx.ellipse(16, 44, 8, 2, 0, 0, Math.PI * 2); ctx.fill();
      p(14, 14, '#7a6a58', 4, 30); p(14, 14, '#9a8a74', 1, 30); for (let y = 16; y < 44; y += 3) p(14, y, '#5a4a3a', 4, 1);
      // folhas em leque: cada uma é um setor cheio com nervuras claras e escuras, caindo nas pontas
      const cx = 16, cy = 12;
      for (const ang of [-2.9, -2.3, -1.57, -0.85, -0.25, 2.55, 0.6]) {
        for (let rr = 2; rr <= 10; rr++) for (let a = -0.42; a <= 0.42; a += 0.06) {
          const t = ang + a, x = cx + Math.cos(t) * rr, y = cy + Math.sin(t) * rr * 0.8 + rr * rr * 0.035;
          const k = Math.round((a + 0.42) / 0.06);
          p(Math.round(x), Math.round(y), rr > 8 ? '#5a9a3a' : k % 3 === 0 ? '#245a1e' : k % 3 === 1 ? '#3a7a2a' : '#4a8a30');
        }
      }
      for (let i = 0; i < 5; i++) E(p, 13 + r.int(0, 6), 15 + r.int(0, 2), 1.6, 1.6, v === 1 ? '#8a3a1a' : '#6a3a1a');   // frutos de buriti
    });
    return { c, oy: 2 };
  };
  X[O.BANANEIRA] = (v, f, r, mk) => {
    const c = mk(26, 30, (p, ctx) => {
      ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(13, 28, 6, 1.6, 0, 0, Math.PI * 2); ctx.fill();
      p(11, 12, '#5a8a3a', 4, 17); p(11, 12, '#7aa04a', 1, 17); p(14, 12, '#3a6a2a', 1, 17);
      // folhas largas, algumas rasgadas
      for (const [dir, y, L] of [[-1, 8, 11], [1, 7, 11], [-1, 13, 9], [1, 12, 9], [0, 2, 8]]) {
        for (let k = 0; k < L; k++) {
          const x = 13 + dir * k, yy = y - Math.round(Math.sin(k / L * Math.PI) * 3) + (dir === 0 ? -k * 0.6 : 0);
          const xx = dir === 0 ? 13 : x;
          p(xx - (dir === 0 ? 2 : 0), Math.round(yy), '#3e8a2c', dir === 0 ? 4 : 1, 3);
          p(xx, Math.round(yy) + 1, '#2a6a20');
          if (k % 3 === 2 && r.chance(0.5)) p(xx, Math.round(yy) + 2, 'rgba(0,0,0,0)');
        }
      }
      // cacho de banana e o "coração" roxo
      if (v !== 2) { for (let i = 0; i < 4; i++) p(15 + (i % 2), 13 + i, v ? '#e8d040' : '#a8c040', 3, 1); p(17, 18, '#7a2a4a', 2, 3); }
    });
    return { c, oy: 1 };
  };
  X[O.IPE] = (v, f, r, mk) => {
    const flor = v === 2 ? ['#a04a90', '#c870b8', '#f0b0e0'] : ['#c89a10', '#f0c820', '#fff080'];
    const c = mk(36, 44, (p, ctx) => {
      ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.beginPath(); ctx.ellipse(18, 42, 10, 2, 0, 0, Math.PI * 2); ctx.fill();
      p(16, 20, '#5a3a2a', 4, 22); p(16, 20, '#7a5a40', 1, 22); p(10, 18, '#5a3a2a', 7, 2); p(19, 16, '#5a3a2a', 8, 2);
      copa(p, 18, 13, 16, 11, flor, r, 12);
      for (let i = 0; i < 10; i++) p(r.int(4, 32), r.int(36, 42), flor[1]);   // flores caídas no chão
    });
    return { c, oy: 2 };
  };
  X[O.MANDACARU] = (v, f, r, mk) => {
    const c = mk(22, 34, (p, ctx) => {
      ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.beginPath(); ctx.ellipse(11, 32, 6, 1.5, 0, 0, Math.PI * 2); ctx.fill();
      const col = (x, y0, y1) => { p(x, y0, '#3a7a3a', 4, y1 - y0); p(x + 1, y0, '#5a9a4a', 1, y1 - y0); p(x + 3, y0, '#2a5a2a', 1, y1 - y0); p(x, y0 - 1, '#4a8a3a', 4, 1); for (let y = y0 + 2; y < y1; y += 3) p(x + 2, y, '#e8e0b0'); };
      col(9, 4, 32);
      if (v !== 1) { col(3, 12, 22); p(5, 22, '#3a7a3a', 5, 3); }
      if (v !== 2) { col(15, 9, 19); p(12, 19, '#3a7a3a', 5, 3); }
      if (v === 0) { p(10, 2, '#f0f0e0', 2, 2); p(16, 7, '#c03a5a', 2, 2); }   // flor branca e fruto vermelho
    });
    return { c, oy: 1 };
  };
  X[O.HELICONIA] = (v, f, r, mk) => {
    const c = mk(14, 16, p => {
      p(6, 6, '#3a7a2a', 1, 10); p(3, 9, '#3e8a2c', 3, 2); p(8, 8, '#3e8a2c', 4, 2); p(2, 12, '#2a6a20', 4, 2);
      const cor = v === 1 ? '#f0c020' : '#e03a2a';
      for (let k = 0; k < 5; k++) { const s = k % 2 ? 1 : -1; p(6 + s, 1 + k * 1.6, cor, 3 * (s > 0 ? 1 : 1), 1); p(6 + s * 2, 1 + k * 1.6 + 1, k % 2 ? '#f0e040' : cor); }
    });
    return { c, oy: 0 };
  };
  X[O.VITORIA] = (v, f, r, mk) => {
    const c = mk(16, 14, p => {
      const pads = v === 0 ? [[8, 7, 6]] : v === 1 ? [[5, 5, 4], [11, 9, 4]] : [[6, 8, 5], [12, 4, 3]];
      for (const [x, y, rr] of pads) { E(p, x, y, rr + 0.6, rr * 0.7 + 0.6, '#5a8a2a'); E(p, x, y, rr, rr * 0.7, '#3e7a2a'); p(x - rr + 1, y, '#6aa040', rr * 2 - 2, 1); }
      if (v !== 1) { E(p, pads[0][0] + 1, pads[0][1] - 1, 1.6, 1.2, '#f0b0d0'); p(pads[0][0] + 1, pads[0][1] - 1, '#ffffff'); }
    }, false);
    return { c, oy: 0 };
  };
})();

// ---------- natureza de cada bioma (só nas regiões de Pindorama) ----------
(function () {
  const n0 = World.prototype.natObj;
  World.prototype.natObj = function (x, y, t, ri) {
    const reg = this.regions[ri];
    if (!reg || !Pindorama.ehBioma(reg.biome)) return n0.apply(this, arguments);
    const h = hash2(x, y, this.seed + 101), k = hash2(x, y, 9), b = reg.biome;
    const dens = Math.max(0, this.nD.noise(x / 46, y / 46));
    switch (t) {
      case T.DGRASS: case T.LIVEMOSS: {
        // a selva: árvores bem juntas e o chão cheio de plantas
        const mata = b === 'jungle' ? 0.24 + dens * 0.3 : b === 'serra' ? 0.05 + dens * 0.08 : 0.12 + dens * 0.2;
        if (h < mata) {
          if (b === 'jungle') return k < 0.13 ? O.SUMAUMA : k < 0.42 ? O.ACAI : k < 0.55 ? O.BANANEIRA : k < 0.6 ? O.IPE : k < 0.68 ? O.BURITI : O.OAK;
          if (b === 'serra') return k < 0.35 ? O.IPE : O.OAK;
          return k < 0.2 ? O.IPE : k < 0.4 ? O.BANANEIRA : k < 0.55 ? O.PALM : k < 0.65 ? O.ACAI : O.OAK;
        }
        if (h < mata + 0.03) return O.HELICONIA;
        if (h < mata + 0.06) return O.BUSH;
        if (h < mata + 0.1) return O.TALLGRASS;
        if (h < mata + 0.104) return O.HERB_RED;
        if (h < mata + 0.108) return O.HERB_SHROOM;
        return 0;
      }
      case T.GRASS: {
        if (b === 'tropical' || b === 'serraverde') {
          if (h < 0.014) return O.PALM; if (h < 0.022) return O.BANANEIRA; if (h < 0.03) return O.IPE; if (h < 0.036) return O.BURITI;
          if (h < 0.05) return O.BUSH; if (h < 0.12) return O.FLOWERS; if (h < 0.17) return O.TALLGRASS; if (h < 0.175) return O.ROCK; return 0;
        }
        if (h < 0.02) return O.BURITI; if (h < 0.1) return O.TALLGRASS; if (h < 0.14) return O.FLOWERS; return 0;
      }
      case T.SAND: { if (h < 0.045) return O.PALM; if (h < 0.055) return O.ROCK; return 0; }
      case T.MUD: case T.SWAMP: {
        if (h < 0.05) return O.BURITI; if (h < 0.06) return O.DEADTREE; if (h < 0.2) return O.REEDS; if (h < 0.23) return O.HELICONIA; if (h < 0.235) return O.HERB_SHROOM; return 0;
      }
      case T.WATER: { if (b === 'wetland' || b === 'jungle') { if (h < 0.05) return O.VITORIA; if (h < 0.08) return O.LILY; if (h < 0.1) return O.REEDS; } else if (h < 0.01) return O.REEDS; return 0; }
      case T.DIRT: case T.DEADGRASS: case T.SAVANNA: {
        if (b === 'caatinga') { if (h < 0.022) return O.MANDACARU; if (h < 0.036) return O.DEADTREE; if (h < 0.07) return O.BUSH; if (h < 0.09) return O.ROCK; if (h < 0.094) return O.BONES; if (h < 0.13 && t === T.SAVANNA) return O.TALLGRASS; return 0; }
        if (h < 0.02) return O.ROCK; if (h < 0.03) return O.BOULDER; if (h < 0.04) return O.BUSH; return 0;
      }
      case T.BADLAND: { if (h < 0.05) return O.ROCK; if (h < 0.07) return O.BOULDER; if (h < 0.08) return O.IPE; return 0; }
    }
    return n0.apply(this, arguments);
  };
})();

// ---------- arquitetura ----------
(function () {
  Object.assign(CASA_STYLES, {
    // ---------- povos da mata: oca de palha (cúpula alta até o chão) ----------
    oca: {
      top: 22, signC: '#c8a050',
      full(E) {
        const { p, r, W, H, ox, roofC, doorX, doorW, doorH, big } = E;
        // a casa inteira é uma cúpula de palha; as maiores (malocas) são compridas
        const topo = big ? 6 : 2;
        for (let yy = topo; yy < H; yy++) {
          const t = (yy - topo) / (H - topo), hw = Math.round((W / 2 - 1) * Math.sqrt(Math.min(1, t * (big ? 1.35 : 1.15))));
          for (let xx = -hw; xx < hw; xx += 1) {
            const cx = ox + W / 2 + xx, k = (xx + 40 + yy * 2) % 6;
            p(cx, yy, Math.floor(yy / 3) % 2 && k < 2 ? shade(roofC, -0.2) : k === 3 ? shade(roofC, 0.15) : roofC);
          }
          if (yy % 4 === 0) p(ox + W / 2 - hw, yy, shade(roofC, -0.35), hw * 2, 1);   // fiadas de palha amarrada
          p(ox + W / 2 - hw, yy, shade(roofC, -0.3)); p(ox + W / 2 + hw - 1, yy, shade(roofC, -0.4));
        }
        // ponta amarrada no alto e a barra de palha mais escura no chão
        p(ox + W / 2 - 1, topo - 2, shade(roofC, -0.4), 2, 3);
        p(ox + 2, H - 3, shade(roofC, -0.3), W - 4, 2);
        // porta baixa e escura, com moldura de varas
        for (let yy = H - doorH; yy < H - 1; yy++) { const hw = Math.min(doorW / 2, Math.round((yy - (H - doorH)) * 0.8) + 2); p(ox + W / 2 - hw, yy, '#1a120a', hw * 2, 1); }
        p(doorX - 1, H - doorH + 3, '#6a4a2a', 1, doorH - 4); p(doorX + doorW, H - doorH + 3, '#6a4a2a', 1, doorH - 4);
        // grafismo (pintura) vermelho e preto na barra de cima da porta, e fumaça das maiores
        for (let i = 0; i < doorW + 4; i += 2) p(doorX - 2 + i, H - doorH - 2, i % 4 ? '#b02a1a' : '#1a1410');
        if (big) for (let i = 0; i < 3; i++) p(ox + W / 2 - 4 + i * 4, 0 + i, 'rgba(220,220,220,0.5)', 2, 2);
        // enfeite: penas penduradas ou cabaças
        if (r.chance(0.6)) { const x = ox + 4; p(x, H - 12, '#6a4a2a', 1, 6); p(x - 1, H - 7, '#e8d080', 3, 3); }
      }
    },
    // ---------- Vera Cruz: casarões coloridos com azulejo, telhado de barro ----------
    colonial: {
      top: 10, signC: '#f0e0b0',
      wall(E, x, y, w, h) {
        const { p, r } = E, cor = E.cor || (E.cor = r.pick(['#f2ecdc', '#f4d878', '#a8d0e8', '#f0b8a0', '#c8e0a8', '#f2ecdc', '#e8c0e0']));
        p(x, y, cor, w, h);
        p(x, y, '#ffffff', w, 2); p(x, y + 2, shade(cor, -0.18), w, 1);             // cornija branca
        p(x, y, '#ffffff', 2, h); p(x + w - 2, y, '#ffffff', 2, h);                 // cunhais brancos
        // barra de azulejo azul e branco embaixo
        for (let xx = 2; xx < w - 2; xx += 2) for (let yy = 0; yy < 4; yy += 2) p(x + xx, y + h - 5 + yy, ((xx + yy) / 2) % 2 ? '#2a5aa8' : '#e8f0f8', 2, 2);
        p(x, y + h - 6, '#ffffff', w, 1);
      },
      roof(E, x, y, w, h) {
        const { p, roofC } = E;
        for (let yy = 0; yy < h; yy++) { const inset = Math.round((1 - yy / h) * Math.min(w * 0.3, h * 0.9)); p(x + inset, y + yy, yy % 3 === 0 ? shade(roofC, -0.22) : roofC, w - inset * 2, 1); for (let xx = x + inset + (yy % 6 < 3 ? 0 : 2); xx < x + w - inset; xx += 4) p(xx, y + yy, shade(roofC, 0.14)); }
        p(x + 1, y + h - 1, shade(roofC, -0.35), w - 2, 1);
      },
      win(E, x, y) { const { p } = E; p(x - 1, y + 1, '#2a6a4a', 1, 7); p(x + 5, y + 1, '#2a6a4a', 1, 7); p(x, y + 1, '#ffffff', 5, 8); p(x + 1, y + 2, '#2a3a4a', 3, 6); p(x + 1, y + 1, '#ffffff', 3, 1); p(x + 2, y + 2, '#5a7a9a', 1, 5); p(x - 1, y + 9, '#ffffff', 7, 1); },
      door(E, x, y, w, h) { const { p } = E; p(x - 1, y - 2, '#ffffff', w + 2, h + 2); p(x, y, '#6a3a1a', w, h); p(x + 1, y - 1, '#6a3a1a', w - 2, 1); p(x + w / 2 - 0.5, y, '#4a2a10', 1, h); p(x + 1, y + 2, '#8a5a2a', 1, h - 3); p(x + w - 2, y + 2, '#8a5a2a', 1, h - 3); },
      decor(E) {
        const { p, sp, W, ox, wallTop, temple, big } = E;
        if (temple) {
          // igreja barroca: duas torres brancas com sino e a cruz no frontão
          for (const tx of [ox, ox + W - 9]) { p(tx, wallTop - 18, '#f4f0e4', 9, 18); p(tx + 8, wallTop - 18, '#c8c0b0', 1, 18); p(tx + 2, wallTop - 14, '#2a2a30', 5, 6); E.p(tx + 3, wallTop - 11, '#d0a040', 3, 3); p(tx - 1, wallTop - 19, '#ffffff', 11, 2); p(tx + 2, wallTop - 24, '#e8e0d0', 5, 5); p(tx + 4, wallTop - 28, '#d0a040', 1, 4); }
          const cx = ox + W / 2; p(cx - 1, 0, '#f0d060', 2, 7); p(cx - 3, 2, '#f0d060', 6, 2);
          Sprites.ellipse(p, cx, wallTop + 3, 3, 3, '#ffffff'); Sprites.ellipse(p, cx, wallTop + 3, 2, 2, '#3a5aa8');
        } else if (big) {
          // bandeira verde e amarela do reino
          const fx = ox + W / 2; p(fx, 0, '#3a3a3a', 1, 14); p(fx + 1, 1, '#2a9a40', 8, 5); p(fx + 3, 2, '#f0d020', 4, 3); p(fx + 4, 3, '#2a4aa8', 2, 1);
        } else if (sp.seed % 3 === 0) {
          // floreira na janela
          p(ox + 4, wallTop + 15, '#a05a2a', 7, 2); p(ox + 5, wallTop + 14, '#e04a6a', 1, 1); p(ox + 7, wallTop + 14, '#f0d040'); p(ox + 9, wallTop + 14, '#e04a6a');
        }
      }
    },
    // ---------- Pantaneira: palafitas de madeira sobre a água ----------
    palafita: {
      top: 14, signC: '#c8a868',
      wall(E, x, y, w, h) {
        const { p, wallC } = E, stilt = 6;
        for (let xx = 0; xx < w; xx += 3) { p(x + xx, y, wallC, 3, h - stilt); p(x + xx, y, shade(wallC, 0.15), 1, h - stilt); p(x + xx + 2, y, shade(wallC, -0.25), 1, h - stilt); }
        p(x - 2, y + h - stilt, '#6a4a2a', w + 4, 2);                                // assoalho/varanda
        for (let xx = 0; xx < w; xx += 6) { p(x + xx, y + h - stilt + 2, '#4a3220', 2, stilt - 2); }
        p(x - 2, y + h - 2, 'rgba(90,150,190,0.55)', w + 4, 2);                      // água em volta das estacas
        p(x - 2, y + h - stilt - 5, '#6a4a2a', 1, 5); p(x + w + 1, y + h - stilt - 5, '#6a4a2a', 1, 5); p(x - 2, y + h - stilt - 5, '#8a6a3a', w + 4, 1);   // parapeito
      },
      roof(E, x, y, w, h) { const { p, roofC, r } = E; for (let yy = 0; yy < h; yy++) { const inset = Math.round((1 - yy / h) * w * 0.48); p(x + inset, y + yy, roofC, w - inset * 2, 1); } palhaRiscos(p, x, y, w, h, roofC, 0.48); p(x - 1, y + h - 1, shade(roofC, -0.4), w + 2, 2); },
      win(E, x, y) { const { p } = E; p(x, y, '#3a2a1a', 5, 5); p(x + 1, y + 1, '#2a1a10', 3, 3); p(x - 1, y - 1, '#8a6a3a', 7, 1); },
      door(E, x, y, w, h) { const { p } = E; p(x, y - 6, '#2a1a10', w, h - 2); p(x + 1, y - 5, '#5a3a20', w - 2, h - 4); for (let k = 0; k < 6; k++) p(x + 1, y + h - 6 + k, '#6a4a2a', w - 2, 1); },
      decor(E) { const { p, W, H, ox } = E; // canoa amarrada
        p(ox + W - 14, H - 3, '#5a3a1a', 12, 2); p(ox + W - 13, H - 4, '#7a5a2a', 10, 1); p(ox + W - 9, H - 7, '#c8a868', 1, 4); }
    },
    // ---------- Sertão e garimpo: casa de taipa com telha de barro ----------
    taipa: {
      top: 8, signC: '#d8b080',
      wall(E, x, y, w, h) {
        const { p, wallC, r } = E; p(x, y, wallC, w, h);
        // reboco caído mostrando o pau-a-pique
        for (let i = 0; i < Math.max(1, w * h / 260); i++) { const px = x + r.int(2, w - 9), py = y + r.int(2, h - 8); p(px, py, '#8a6a44', 6, 5); for (let k = 0; k < 6; k += 2) p(px + k, py, '#5a4028', 1, 5); p(px, py + 2, '#5a4028', 6, 1); }
        for (let i = 0; i < w * h / 30; i++) p(x + r.int(0, w - 1), y + r.int(0, h - 1), shade(wallC, r.chance(0.5) ? -0.08 : 0.08));
        p(x, y + h - 3, shade(wallC, -0.3), w, 3);                                    // barra de barro em baixo
      },
      roof(E, x, y, w, h) { const { p, roofC } = E; const hh = Math.min(h, 16), y0 = y + h - hh; for (let yy = 0; yy < hh; yy++) { const inset = Math.round((1 - yy / hh) * w * 0.22); p(x + inset, y0 + yy, yy % 2 ? shade(roofC, -0.15) : roofC, w - inset * 2, 1); for (let xx = x + inset + (yy % 4 ? 1 : 3); xx < x + w - inset; xx += 4) p(xx, y0 + yy, shade(roofC, 0.15)); } p(x - 1, y + h - 1, shade(roofC, -0.4), w + 2, 1); },
      win(E, x, y) { const { p } = E; p(x, y + 1, '#3a6aa0', 2, 6); p(x + 3, y + 1, '#3a6aa0', 2, 6); p(x + 2, y + 1, '#1a1410', 1, 6); p(x - 1, y, '#5a4028', 7, 1); },
      door(E, x, y, w, h) { const { p } = E; p(x, y, '#2a7a8a', w, h); p(x, y + h / 2, '#1a5a6a', w, 1); p(x + w - 2, y + h / 2 - 1, '#d0c060'); p(x - 1, y - 1, '#5a4028', w + 2, 1); },
      decor(E) { const { p, ox, W, H, sp } = E; if (sp.seed % 2) { p(ox + W - 6, H - 9, '#8a5a2a', 4, 6); p(ox + W - 7, H - 10, '#a06a32', 6, 1); } }   // pote de barro na porta
    },
    // ---------- Quilombo: mocambos de pau-a-pique com telhado de palha ----------
    mocambo: {
      top: 16, signC: '#c8a060',
      wall(E, x, y, w, h) { const { p, wallC, r } = E; p(x, y, wallC, w, h); for (let xx = 1; xx < w; xx += 3) p(x + xx, y, shade(wallC, -0.22), 1, h); for (let yy = 3; yy < h; yy += 5) p(x, y + yy, shade(wallC, -0.15), w, 1); for (let i = 0; i < w / 6; i++) p(x + r.int(0, w - 3), y + r.int(0, h - 3), shade(wallC, 0.12), 3, 2); },
      roof(E, x, y, w, h) { const { p, roofC } = E; for (let yy = 0; yy < h; yy++) { const inset = Math.round((1 - yy / h) * w * 0.47); p(x + inset - 1, y + yy, roofC, w - inset * 2 + 2, 1); } palhaRiscos(p, x, y, w, h, roofC, 0.47); p(x - 2, y + h - 1, shade(roofC, -0.4), w + 4, 2); },
      win(E, x, y) { const { p } = E; p(x, y, '#2a1a10', 4, 4); p(x - 1, y - 1, '#6a4a2a', 6, 1); },
      door(E, x, y, w, h) { const { p } = E; p(x, y, '#2a1a10', w, h); p(x, y, '#c84a2a', w, 2); p(x, y + 2, '#e8c040', w, 1); },   // pano colorido na porta
      decor(E) { const { p, ox, W, H, sp } = E; if (sp.seed % 3 === 1) { const x = ox + W - 7; p(x, H - 8, '#6a3a1a', 4, 7); p(x, H - 8, '#e8d0a0', 4, 1); p(x + 1, H - 6, '#c84a2a', 2, 1); } }   // atabaque
    }
  });
  // riscos da palha, só dentro do triângulo do telhado
  function palhaRiscos(p, x, y, w, h, c, f) { for (let yy = 2; yy < h; yy += 3) { const inset = Math.round((1 - yy / h) * w * f) + 1; for (let xx = x + inset + ((yy * 7) % 5); xx < x + w - inset; xx += 5) p(xx, y + yy, shade(c, -0.22)); } }
  for (const k of ['oca', 'colonial', 'palafita', 'taipa', 'mocambo']) Sprites.extraBuilding[k] = sp => Casas.build(sp, CASA_STYLES[k]);
})();

// ---------- povos ----------
Object.assign(RACE_STYLE, {
  indigena: { skins: ['#b0703e', '#a0643a', '#9a5e34', '#b8784a', '#8e5630'], hairs: ['#14100c', '#1a1410', '#100c0a'], eyes: '#2a1a10',
    clothes: ['#b0703e'], legs: ['#b0703e'], boots: '#8e5630', robeF: 0, robeM: 0, metal: '#8a6a3a' },
  brasilico: { skins: ['#f0c8a0', '#e0ac69', '#c68642', '#a8683c', '#8d5524', '#6a4028', '#5a3420'], hairs: ['#1a1410', '#2a1a10', '#3a2414', '#5a3a1a', '#14100c', '#8a5a2a'], eyes: '#2a1a10',
    clothes: ['#f4f0e4', '#e8d8a0', '#a8c8e0', '#d84a3a', '#3a8a4a', '#f0c040', '#e88a40', '#8a5aa8'], legs: ['#3a4a6a', '#5a4a3a', '#e8e0d0', '#4a3a2a'], boots: '#4a3020', robeF: 0.45, robeM: 0, metal: '#a0a0a8' }
});
(function () {
  const look0 = Racas.look.bind(Racas);
  Racas.look = function (race, sex, rng, role) {
    const L = look0(race, sex, rng, role), f = sex === 'f';
    if (race === 'indigena') {
      // corpo pintado (sem camisa), tanga de fibra e os pés descalços
      L.body = L.skin; L.legs = L.skin; L.boots = shade(L.skin, -0.15);
      L.tanga = rng.pick(['#c8a050', '#b02a1a', '#e0c070']);
      if (f) { L.hairStyle = rng.pick([1, 4]); L.body = rng.chance(0.5) ? L.skin : rng.pick(['#b02a1a', '#c8a050']); } else L.hairStyle = rng.pick([0, 0, 3]);
      L.pintura = rng.pick(['urucum', 'jenipapo', 'ambos']);
      L.colar = rng.pick(['#e8e0c8', '#c03a2a', '#2a8a5a', '#f0c040']);
      if (role === 'ruler' || role === 'guard' || rng.chance(0.18)) L.cocar = role === 'ruler' ? 'grande' : 'pequeno';
      if (role === 'guard') { L.chestplate = false; delete L.helm; delete L.pauldron; delete L.shield; L.weapon = rng.chance(0.5) ? 'bow' : 'spear'; L.wc = '#6a4a2a'; }
      if (role === 'ruler') { delete L.crown; delete L.cape; L.trim = undefined; }
      delete L.beard;
    } else if (race === 'brasilico') {
      if (!f && rng.chance(0.4)) L.chapeu = 'palha';
      if (rng.chance(0.25) && !f) L.beard = true;
      if (role === 'guard') { L.chapeu = rng.chance(0.5) ? 'couro' : null; }
    }
    return L;
  };
  // pintura, colar, tanga e cocar dos povos da mata; chapéu de palha ou de couro do povo de Pindorama
  const front0 = Racas.drawFront.bind(Racas);
  Racas.drawFront = function (p, L, dir, G) {
    front0(p, L, dir, G);
    const { hT, tT, tB, ey, front, side, tx0, tx1 } = G, back = dir === 'up', cx = side ? 10 : 9;
    if (L.feat === 'indigena') {
      if (L.tanga) p(tx0, tB, L.tanga, tx1 - tx0 + 1, 2);
      if (!back && L.colar) for (let x = tx0 + 1; x < tx1; x++) p(x, tT + ((x % 2) ? 1 : 0), x % 2 ? L.colar : '#e8e0c8');
      if (front) {
        if (L.pintura !== 'jenipapo') { p(6, ey + 2, '#c0281a', 2, 1); p(12, ey + 2, '#c0281a', 2, 1); }
        if (L.pintura !== 'urucum' && L.body === L.skin) for (let y = tT + 3; y < tB - 1; y += 3) p(tx0 + 1, y, '#1a1410', tx1 - tx0 - 1, 1);
      } else if (side) { if (L.pintura !== 'jenipapo') p(11, ey + 2, '#c0281a', 2, 1); if (L.pintura !== 'urucum' && L.body === L.skin) for (let y = tT + 3; y < tB - 1; y += 3) p(8, y, '#1a1410', 4, 1); }
      if (L.cocar) {
        // cocar de penas em leque sobre a cabeça (vermelho, amarelo e azul)
        const cores = ['#e0281a', '#f0c020', '#2a6ad0', '#e0281a', '#f0f0e8'], n = L.cocar === 'grande' ? 5 : 3;
        if (!side) for (let i = -n; i <= n; i++) { const h = (L.cocar === 'grande' ? 6 : 4) - Math.round(Math.abs(i) * 0.6); p(cx + i, hT - h, cores[(i + 10) % cores.length], 1, h); }
        else for (let i = 0; i < n + 1; i++) p(cx - 2 - i, hT - 4 + i, cores[i % cores.length], 1, 4);
        p(side ? cx - 3 : cx - n, hT, '#f0c020', side ? 6 : n * 2 + 1, 1);
      }
    } else if (L.feat === 'brasilico' && L.chapeu) {
      if (L.chapeu === 'palha') { p(cx - 6, hT + 2, '#d8b860', 13, 1); p(cx - 4, hT - 1, '#e0c070', 9, 3); p(cx - 4, hT + 1, '#8a3a2a', 9, 1); }
      else { p(cx - 6, hT + 1, '#6a4a22', 13, 2); p(cx - 7, hT - 1, '#6a4a22', 2, 2); p(cx + 6, hT - 1, '#6a4a22', 2, 2); p(cx - 3, hT - 3, '#7a5a2a', 7, 4); if (!back) p(cx - 1, hT - 2, '#e8c040', 2, 2); }
    }
  };
})();

// ---------- geração: cidades, masmorras, acampamentos e portos ----------
World.prototype.generatePindorama = function () {
  const rng = new RNG(this.seed * 131 + 77);
  const regs = this.regions.filter(r => r.cont === 5);
  const made = [];
  let sid = 0;
  for (const reg of regs) {
    const names = SETTLEMENT_NAMES[reg.id], pool = rng.shuffle(names.list.slice());
    const types = ['capital'];
    for (let i = 0; i < reg.towns; i++) types.push('town');
    for (let i = 0; i < reg.villages; i++) types.push('village');
    for (const type of types) {
      const size = type === 'capital' ? 50 : type === 'town' ? 34 : 24, half = size / 2 + 4;
      const ok = (x, y) => {
        if (contAt(x, y) !== 5 || this.regionAt(x, y) !== reg.index) return false;
        const pts = [[0, 0], [-half, -half], [half, -half], [-half, half], [half, half], [0, -half], [0, half], [-half, 0], [half, 0]];
        let bad = 0;
        // os ribeirinhos aceitam um pouco mais de água em volta (as casas são palafitas)
        for (const [dx, dy] of pts) { const t = this.baseTile(x + dx, y + dy); if (t === T.DEEP || t === T.LAVA) return false; if (TSOLID[t] || TWATER[t]) bad++; }
        return bad <= (reg.culture === 'palafita' ? 3 : 2) && this.farFrom(x, y, made, type === 'village' ? 85 : 130);
      };
      const pos = this.findLand(reg.cx, reg.cy, rng, type === 'capital' ? 320 : type === 'town' ? 1300 : 1500, ok) || (type === 'capital' ? this.findLand(reg.cx, reg.cy, rng, 900, ok) : null);
      if (!pos) continue;
      const st = { id: 'p' + (sid++), name: type === 'capital' ? names.cap : (pool.pop() || ('Vila ' + sid)), type, region: reg, x: pos.x, y: pos.y, cx: pos.x, cy: pos.y };
      made.push(st); this.settlements.push(st);
    }
  }
  for (const st of made) this.layoutSettlement(st);
  let uid = this.dungeons.reduce((m, d) => Math.max(m, d.uid), 0) + 1;
  const dl = [];
  const campName = { veracruz: 'Acampamento de Piratas', jaguarete: 'Acampamento de Madeireiros Ilegais', guaraci: 'Acampamento de Caçadores de Peles', pantaneira: 'Acampamento de Contrabandistas', sertao: 'Coito de Cangaceiros', quilombo: 'Acampamento de Capitães-do-Mato', ourofino: 'Garimpo dos Bandeirantes' };
  for (const R of regs) {
    const types = REGION_DUNGEONS[R.id];
    for (let i = 0; i < R.dungeons; i++) {
      const pos = this.findLand(R.cx, R.cy, rng, 1500, (x, y) => contAt(x, y) === 5 && this.regionAt(x, y) === R.index && this.isLand(x, y) && this.isLand(x, y + 1) && this._e < 0.69 && this.farFrom(x, y, made, 36) && this.farFrom(x, y, dl, 34));
      if (!pos) continue;
      const type = rng.pick(types), dt = DUNGEON_TYPES[type];
      const d = { id: 'pd' + uid, uid: uid++, name: dt.name + ' ' + rng.pick(DUNGEON_NOUNS), type, boss: dt.boss, lvl: rng.int(R.lvl[0], R.lvl[1]), size: rng.int(48, 64), x: pos.x, y: pos.y, region: R };
      dl.push(d); this.stampDungeon(d); this.dungeons.push(d); this.dungeonById[d.id] = d;
    }
    for (let i = 0; i < 3; i++) {
      const pos = this.findLand(R.cx, R.cy, rng, 1200, (x, y) => contAt(x, y) === 5 && this.regionAt(x, y) === R.index && this.isLand(x, y) && this._e < 0.66 && this.farFrom(x, y, made, 60) && this.farFrom(x, y, dl, 25) && this.farFrom(x, y, this.pois, 40));
      if (!pos) continue;
      const pc = { id: 'pcamp' + R.id + i, kind: 'camp', x: pos.x, y: pos.y, region: R, lvl: rng.int(R.lvl[0], R.lvl[1]), name: campName[R.id] || 'Acampamento Bandido' };
      this.stampCamp(pc, rng); this.pois.push(pc);
    }
    for (let i = 0; i < 2; i++) {
      const pos = this.findLand(R.cx, R.cy, rng, 900, (x, y) => contAt(x, y) === 5 && this.regionAt(x, y) === R.index && this.isLand(x, y) && this.isLand(x, y + 1) && this.farFrom(x, y, made, 40) && this.farFrom(x, y, this.pois, 40) && this.farFrom(x, y, dl, 30));
      if (pos) { const pc = { id: 'pshrine' + R.id + i, kind: 'shrine', x: pos.x, y: pos.y, region: R, name: R.culture === 'oca' ? 'Árvore Sagrada' : R.culture === 'colonial' ? 'Capelinha' : 'Santuário' }; this.stampSmall(pc, O.SHRINE, rng); this.pois.push(pc); }
    }
  }
  // portos na costa oeste, de frente para o Mar Verde (a viagem vem de Elyndra e dos outros continentes)
  const before = this.ports.length;
  [[2400, 'Porto do Tucano'], [5200, 'Porto das Sumaúmas'], [8200, 'Porto das Águas Verdes'], [10400, 'Porto Seguro da Cruz']].forEach(([y0, name], n) => {
    const seaAt = (x, y) => { const t = this.baseTile(x, y); return TWATER[t] || t === T.DEEP; };
    for (let dy = 0; dy < 1000; dy += 10) for (const yy of [y0 + dy, y0 - dy]) {
      let x = PINDORAMA.x0 + 60;
      while (x < PINDORAMA.x0 + 3400) { if (this.isLand(x, yy)) break; x++; }
      if (x >= PINDORAMA.x0 + 3400 || contAt(x, yy) !== 5) continue;
      let land = 0, sea = 0;
      for (let k = 1; k <= 12; k++) { if (this.isLand(x + k, yy) && this.isLand(x + k, yy - 3) && this.isLand(x + k, yy + 3)) land++; if (seaAt(x - k, yy) && seaAt(x - k, yy - 3) && seaAt(x - k, yy + 4)) sea++; }
      const R = this.regions[this.regionAt(x, yy)];
      if (land < 11 || sea < 11 || R.hostile || !this.farFrom(x, yy, this.settlements, 40) || !this.farFrom(x, yy, this.dungeons, 20)) continue;
      this.layoutPort({ x, y: yy, R }, 5, -1, name, n, rng);
      return;
    }
  });
  const nv = this.ports.slice(before);
  this.buildRoads(rng, made.concat(nv), false);
};

// ---------- mar e conversas ----------
(function () {
  const s0 = Elyndra.seaName.bind(Elyndra);
  Elyndra.seaName = (a, b) => a === 5 || b === 5 ? 'Mar Verde' : s0(a, b);
})();
