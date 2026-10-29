'use strict';
// ===================== AS RAÇAS DE ELYNDRA E OS ANJOS =====================
// Cada morador é montado pelo desenhista de personagens do jogo (o mesmo tamanho dos outros
// NPCs, andando e virando para os quatro lados), com a paleta, as roupas e os traços do seu
// povo tirados da arte original (tools/racas_ref.png e tools/anjos_ref.png): asas, auréola,
// cristais, chifres de galho, rachaduras de magma, olho cósmico, névoa, pedra viva...
const ANJO_PAPEIS = ['cidadao', 'guerreiro', 'arqueiro', 'mago', 'clerigo', 'assassino'];
const RACE_STYLE = {
  voralis: { skins: ['#3a8ad0', '#4aa0d8', '#3a70c0', '#58b8d8'], hairs: ['#40c0f0', '#8a60e0', '#60e0e0', '#b080f0', '#2a6ac0'], eyes: '#a0fff0',
    clothes: ['#2a8a9a', '#1a6a8a', '#e07a8a', '#3aa0a0', '#5a4ab0', '#2a5a7a'], legs: ['#1a4a6a', '#2a3a5a', '#1a5a5a'], boots: '#1a3a4a', trim: '#f0e0a0', ears: 'elf', robeF: 0.6, robeM: 0.15, metal: '#4ab0c0' },
  zephyran: { skins: ['#f0dcc8', '#e8d0b8', '#f4e4d4', '#e0c8a8'], hairs: ['#f0f0f4', '#d8dce8', '#e8e0c8', '#c8c0b0'], eyes: '#3a6ab0',
    clothes: ['#e8dcc0', '#c8b090', '#a0c0e0', '#f0f0f0', '#8a6a4a', '#b0905a'], legs: ['#6a5a4a', '#4a4a5a', '#7a6a50'], boots: '#5a4028', capes: ['#4a90d0', '#80b0e0', '#e0e8f0', '#d0a050'], capeP: 0.45, wings: 'mid', wingC: '#f0e6d4', robeF: 0.35, robeM: 0, tall: true, metal: '#c0c8d8' },
  thaldrim: { skins: ['#9a8ae0', '#8a7ad0', '#b0a0f0', '#a090e8'], hairs: ['#c0b0ff'], eyes: '#e0f8ff', bald: true,
    clothes: ['#3a2a5a', '#4a3a7a', '#2a2a4a', '#5a4a8a'], legs: ['#2a2240', '#3a3060'], boots: '#2a2040', chest: 0.6, pauldron: '#b0a0f0', bulkyM: 0.5, robeF: 0.3, robeM: 0, metal: '#a090f0' },
  silvano: { skins: ['#6a9a3a', '#5a8a3a', '#7aa04a', '#8a9a50'], hairs: ['#4aa040', '#6ab840', '#a0c050', '#3a8a3a'], eyes: '#f0c040',
    clothes: ['#5a7a2a', '#7a5a2a', '#4a6a3a', '#8a6a3a', '#3a5a2a'], legs: ['#4a3a20', '#3a4a20'], boots: '#3a2a14', robeF: 0.4, robeM: 0.1, metal: '#6a8a3a' },
  krazul: { skins: ['#4a2a22', '#3a2420', '#5a3028', '#2e1e1a'], hairs: ['#ff7a20', '#ffb030', '#2a1a1a'], eyes: '#ffb020', bald: 0.6,
    clothes: ['#3a2a2a', '#5a2a1a', '#2a2020', '#4a3020'], legs: ['#2a1a1a', '#3a2418'], boots: '#1a1010', pauldron: '#4a4a50', pauldronP: 0.5, bulkyM: 0.8, bulkyF: 0.3, beardM: 0.3, robeF: 0.1, robeM: 0, metal: '#5a5a62' },
  nimbor: { skins: ['#5a4a8a', '#4a3a7a', '#6a5a9a', '#3e3270'], hairs: ['#1a1440', '#2a2060', '#c0b0f0', '#0e0a24'], eyes: '#f0e8ff',
    clothes: ['#2a1a4a', '#3a2a5a', '#1a1a3a', '#4a2a6a'], legs: ['#1a1430', '#2a1a40'], boots: '#140e24', trim: '#c0a0ff', capes: ['#4a2a7a', '#2a1a4a'], capeP: 0.4, ears: 'elf', robeF: 0.7, robeM: 0.5, tall: true, metal: '#6a5aa0' },
  vaelith: { skins: ['#b08050', '#9a6a40', '#c09060', '#8a5a34'], hairs: ['#3a2410', '#1a1410', '#6a4020', '#8a6a40'], eyes: '#e0a020',
    clothes: ['#8a6a3a', '#6a4a2a', '#a07a4a', '#5a4020'], legs: ['#5a3a20', '#4a3018'], boots: '#3a2410', fur: true, catears: true, tail: true, beardM: 0.4, bulkyM: 0.4, robeF: 0, robeM: 0, metal: '#8a7a6a' },
  xarqin: { skins: ['#6a48c0', '#5a3aa8', '#7a58d0', '#4e34a0'], hairs: ['#c0a0ff', '#e0c8ff', '#8a60f0', '#f0e0ff'], eyes: '#ffffff',
    clothes: ['#1a1a4a', '#2a1a5a', '#3a2a7a', '#141238'], legs: ['#141238', '#1a1a40'], boots: '#0e0c24', trim: '#ffe080', robeF: 0.85, robeM: 0.7, tall: true, metal: '#8070d0' },
  brumario: { skins: ['#7ab0e0', '#8ac0e8', '#6aa0d0', '#9ad0f0'], hairs: ['#c0e0f8', '#a0c8e8', '#e0f0ff'], eyes: '#e8f8ff',
    clothes: ['#6a8090', '#5a7080', '#8a9aa8', '#4a6070'], legs: ['#4a5a68', '#3a4a58'], boots: '#2a3a48', trim: '#c0e0f0', robeF: 0.8, robeM: 0.6, misty: true, metal: '#90a8c0' },
  terralux: { skins: ['#b09060', '#a08050', '#c0a070', '#9a7a48'], hairs: ['#40e0d0'], eyes: '#40e0d0', bald: true,
    clothes: ['#7a6a4a', '#5a4a3a', '#8a7a5a', '#6a5a40'], legs: ['#4a3a2a', '#3a3020'], boots: '#3a2a1a', chest: 0.7, bulkyM: 0.9, bulkyF: 0.5, robeF: 0.1, robeM: 0, metal: '#8a7a5a' },
  anjo: { skins: ['#f4dcc4', '#f0d0b0', '#e8c0a0', '#f8e4d0', '#c8946a'], hairs: ['#f0d890', '#e8e0d0', '#c09040', '#2a2a30', '#f4f0e8'], eyes: '#3a7ad0',
    clothes: ['#f4f0e4'], legs: ['#e8e0d0'], boots: '#c0a050', trim: '#e0c050', wings: 'big', tall: true, metal: '#f0d060' }
};
const Racas = {
  // compatibilidade: a função de carregar imagens não existe mais (era a arte recortada)
  load() { },
  pick(rng, a) { return Array.isArray(a) ? rng.pick(a) : a; },
  // aparência de um morador (usada por npcLook)
  look(race, sex, rng, role) {
    const R = RACE_STYLE[race] || RACE_STYLE.voralis, f = sex === 'f';
    const L = { k: 'hum', feat: race, skin: rng.pick(R.skins), hair: rng.pick(R.hairs), eyes: R.eyes, legs: rng.pick(R.legs), boots: R.boots };
    if (f) { L.fem = true; L.hairStyle = rng.pick([1, 1, 4, 1]); }
    else L.hairStyle = rng.pick([0, 0, 3, 0, 2]);
    if (R.bald === true || (typeof R.bald === 'number' && rng.chance(R.bald) && !f)) L.hairStyle = 2;
    if (R.ears) L.ears = R.ears;
    if (R.catears) L.catears = true;
    if (R.tail) { L.tail = true; L.tailC = shade(L.hair, 0.1); }
    if (R.fur) L.fur = true;
    if (R.tall) L.tall = 1;
    if (R.wings) { L.wings = R.wings; if (R.wingC) L.wingC = rng.pick([R.wingC, '#e8dcc8', '#d8c8b0']); }
    if (R.misty) L.misty = true;
    if (!f && R.bulkyM && rng.chance(R.bulkyM)) L.bulky = true;
    if (f && R.bulkyF && rng.chance(R.bulkyF)) L.bulky = true;
    if (!f && R.beardM && rng.chance(R.beardM)) L.beard = true;
    L.body = rng.pick(R.clothes);
    if (rng.chance(f ? R.robeF : R.robeM)) { L.robe = true; if (R.trim) L.trim = R.trim; }
    if (R.chest && rng.chance(R.chest)) L.chestplate = true;
    if (R.pauldron && rng.chance(R.pauldronP || 0.5)) L.pauldron = R.pauldron;
    if (R.capes && rng.chance(R.capeP || 0.3)) L.cape = rng.pick(R.capes);
    if (f) L.lips = shade(L.skin, -0.35);
    if (race === 'anjo') this.angel(L, rng, role);
    else if (role === 'guard') { L.chestplate = true; L.robe = false; L.helm = R.metal; L.pauldron = shade(R.metal, 0.2); L.weapon = 'sword'; L.wc = '#d0d0d8'; L.shield = shade(R.metal, -0.2); }
    else if (role === 'ruler') { L.crown = true; L.cape = '#8a2040'; L.body = shade(L.body, 0.1); L.trim = '#f0d060'; }
    else if (role === 'merchant') { L.robe = false; L.body = rng.pick(['#a06a30', '#8a5a2a', L.body]); }
    if (role === 'kid' || role === 'child') { L.size = 0.7; delete L.beard; delete L.bulky; delete L.weapon; }
    return L;
  },
  // anjos: roupa e arma de acordo com o papel (cidadão, guerreiro, arqueiro, mago, clérigo, assassino)
  angel(L, rng, role) {
    const papel = role === 'guard' ? 'guerreiro' : ANJO_PAPEIS.includes(role) ? role : rng.pick(['cidadao', 'cidadao', 'clerigo', 'mago']);
    L.halo = true; L.wings = 'big'; L.papel = papel;
    switch (papel) {
      case 'cidadao': L.body = rng.pick(['#f4f0e4', '#e8e4f0', '#f0e8d8']); L.robe = L.fem || rng.chance(0.5); L.trim = '#e0c050'; break;
      case 'guerreiro': L.body = '#e8e4dc'; L.chestplate = true; L.pauldron = '#e0c050'; L.robe = false; L.legs = '#d8d0c0'; L.boots = '#b09040'; L.weapon = 'sword'; L.wc = '#f0f0ff'; L.shield = '#e0c050'; L.cape = '#3a6ab0'; break;
      case 'arqueiro': L.body = rng.pick(['#e8e0d0', '#d8c8a8']); L.legs = '#8a7a5a'; L.boots = '#6a5030'; L.hood = rng.chance(0.4) ? '#f0ece0' : undefined; L.weapon = 'bow'; L.wc = '#e0b040'; break;
      case 'mago': L.body = rng.pick(['#2a4a9a', '#3a5ab0']); L.robe = true; L.trim = '#f0d060'; L.weapon = 'staff'; L.wc = '#e0c050'; break;
      case 'clerigo': L.body = '#f8f4ec'; L.robe = true; L.trim = '#f0d060'; L.weapon = 'staff'; L.wc = '#f0d060'; break;
      case 'assassino': L.body = '#1e1e26'; L.legs = '#16161c'; L.boots = '#101014'; L.hood = '#26262e'; L.wingC = '#3a3a48'; L.halo = rng.chance(0.3); L.weapon = 'dagger'; L.wc = '#c0c0d0'; L.hair = '#1a1a20'; break;
    }
  },
  // looks antigos (arte recortada) guardados em saves: vira um morador novo equivalente
  fromLegacy(L) {
    const rng = new RNG(hashStr(JSON.stringify(L)));
    if (L.r === 'anjo') return this.look('anjo', (L.sz || 1) < 0.9 ? 'f' : 'm', rng, ANJO_PAPEIS[L.v | 0] || 'cidadao');
    return this.look(L.r || 'voralis', rng.chance(0.5) ? 'f' : 'm', rng, 'citizen');
  },

  // ---------- Traços desenhados junto com o corpo ----------
  // asas: linhas de penas, mais claras na raiz e com pontas acinzentadas; batem levemente ao andar
  wing(p, L, side, x0, y0, y1, span, frame) {
    const base = L.wingC || '#f4f4f8', mid = shade(base, -0.12), tip = shade(base, -0.28), lineC = shade(base, -0.4);
    const flap = frame === 1 ? -1 : frame === 2 ? 1 : 0;
    for (let y = y0 + flap; y <= y1; y++) {
      const t = (y - y0 - flap) / Math.max(1, y1 - y0 - flap);
      const w = Math.max(1, Math.round(span * (t < 0.25 ? 0.55 + t * 1.8 : 1 - (t - 0.25) * 0.9)));
      for (let k = 0; k < w; k++) {
        const x = x0 + side * k, edge = k >= w - 1;
        p(x, y, edge ? tip : k < w * 0.4 ? base : mid);
      }
      if ((y - y0) % 3 === 2) p(x0 + side * Math.max(0, w - 2), y, lineC);
    }
  },
  drawBehind(p, L, dir, G) {
    if (L.wings && dir !== 'up') {
      const big = L.wings === 'big', span = big ? 7 : L.wings === 'mid' ? 5 : 4, y0 = G.tT - (big ? 7 : 5), y1 = G.tB + (big ? 3 : 1);
      if (dir === 'down') { this.wing(p, L, -1, G.tx0 - 1, y0, y1, span, G.frame); this.wing(p, L, 1, G.tx1 + 1, y0, y1, span, G.frame); }
      else this.wing(p, L, -1, 8, y0, y1, span + 1, G.frame);
    }
  },
  drawFront(p, L, dir, G) {
    const { hT, hB, tT, tB, ey, front, side } = G, back = dir === 'up';
    if (L.wings && back) {
      const big = L.wings === 'big', span = big ? 7 : L.wings === 'mid' ? 5 : 4, y0 = tT - (big ? 7 : 5), y1 = tB + (big ? 3 : 1);
      this.wing(p, L, -1, 9, y0, y1, span + 2, G.frame); this.wing(p, L, 1, 10, y0, y1, span + 2, G.frame);
    }
    const cx = side ? 10 : 9;   // centro da cabeça
    switch (L.feat) {
      case 'voralis': {
        const glow = '#a0fff0';
        if (front) { p(G.hx0, ey + 2, glow); p(G.hx1, ey + 2, glow); p(9, hT + 1, glow, 2, 1); p(G.tx0 - 1, tT + 3, glow); p(G.tx1 + 1, tT + 4, glow); p(G.hx0 - 2, hT + 3, '#2a8ab0', 1, 3); p(G.hx1 + 2, hT + 3, '#2a8ab0', 1, 3); }
        else if (side) { p(11, ey + 2, glow); p(10, tT + 3, glow); p(6, hT + 2, '#2a8ab0', 1, 3); }
        else { p(9, tT + 2, glow); p(10, tT + 4, glow); }
        break;
      }
      case 'zephyran': {
        const fc = '#60a0e0';
        if (!back) { p(side ? 8 : 13, hT - 2, fc); p(side ? 7 : 14, hT - 3, fc); p(side ? 6 : 15, hT - 4, '#e0e8f0'); }
        break;
      }
      case 'thaldrim': {
        const c1 = '#c8b8ff', c2 = '#8a70e0', c3 = '#ffffff';
        if (side) { p(9, hT - 3, c2, 2, 3); p(9, hT - 3, c3); p(11, hT - 2, c1, 1, 2); p(7, tT - 2, c2, 2, 2); p(7, tT - 2, c3); }
        else { p(7, hT - 2, c2, 1, 2); p(9, hT - 4, c1, 2, 4); p(9, hT - 4, c3); p(12, hT - 2, c2, 1, 2); p(G.tx0 - 2, tT - 2, c1, 2, 2); p(G.tx1 + 1, tT - 2, c1, 2, 2); p(G.tx0 - 2, tT - 2, c3); p(G.tx1 + 2, tT - 2, c3); }
        break;
      }
      case 'silvano': {
        const br = '#6a4a28', lf = '#7ad050';
        const antler = (x, s) => { p(x, hT - 1, br); p(x + s, hT - 2, br); p(x + s, hT - 3, br); p(x + s * 2, hT - 4, br); p(x + s * 2, hT - 5, br); p(x, hT - 3, br); p(x - s, hT - 4, br); p(x + s * 3, hT - 4, lf); p(x - s, hT - 5, lf); };
        if (side) antler(10, -1); else { antler(G.hx0 + 1, -1); antler(G.hx1 - 1, 1); }
        if (L.fem && !back) { p(side ? 12 : 8, hT, '#f080b0'); p(side ? 11 : 12, hT + 1, '#f0f080'); }
        break;
      }
      case 'krazul': {
        const m1 = '#ff7a20', m2 = '#ffd060', hc = '#5a4a48';
        if (side) { p(9, hT - 1, hc); p(8, hT - 2, hc); p(11, hT + 2, m1); p(12, hT + 3, m1); p(9, tT + 2, m1); p(10, tT + 3, m2); p(9, tT + 4, m1); }
        else {
          p(G.hx0, hT - 1, hc); p(G.hx0 - 1, hT - 2, hc); p(G.hx1, hT - 1, hc); p(G.hx1 + 1, hT - 2, hc);
          if (front) { p(7, hT + 2, m1); p(8, hT + 3, m1); p(12, hT + 5, m1); p(11, hT + 6, m2); }
          p(8, tT + 1, m1); p(9, tT + 2, m2); p(8, tT + 3, m1); p(11, tT + 3, m1); p(12, tT + 4, m1); p(G.tx0 - 2, tT + 3, m1); p(G.tx1 + 1, tT + 2, m1);
        }
        break;
      }
      case 'nimbor': {
        const g = '#c0a0ff';
        if (front) { p(7, ey + 2, g); p(12, ey + 2, g); p(9, hT + 1, '#e0d0ff', 2, 1); }
        else if (side) { p(11, ey + 2, g); p(12, hT + 1, '#e0d0ff'); }
        break;
      }
      case 'vaelith': {
        if (front) { p(7, ey + 2, '#c03020', 2, 1); p(11, ey + 2, '#c03020', 2, 1); p(G.tx0, tT, shade(L.hair, 0.2), G.tx1 - G.tx0 + 1, 1); }
        else if (side) { p(11, ey + 2, '#c03020', 2, 1); }
        break;
      }
      case 'xarqin': {
        if (front) { p(9, hT + 1, '#ffffff', 2, 1); p(9, hT + 1, '#80f0ff'); p(G.hx0, hT + 5, '#ffe080'); p(G.hx1, hT + 4, '#ffe080'); }
        else if (side) { p(12, hT + 1, '#80f0ff'); p(7, hT + 6, '#ffe080'); }
        else { p(7, hT + 5, '#ffe080'); p(12, hT + 7, '#ffe080'); }
        if (L.robe) for (let i = 0; i < 4; i++) p(7 + ((i * 5) % 6), tB + 1 + i, '#ffe080');
        break;
      }
      case 'brumario': {
        const w = 'rgba(220,240,255,0.7)';
        for (let i = 0; i < 6; i++) p(5 + ((i * 7 + G.frame * 3) % 11), G.footY - (i % 2), w);
        if (front) { p(7, ey + 2, '#e0f4ff'); p(12, ey + 2, '#e0f4ff'); }
        break;
      }
      case 'terralux': {
        const cr = '#40e0d0', ch = '#b0fff8', rk = shade(G.sk, -0.25);
        if (side) { p(10, hT - 3, cr, 2, 3); p(10, hT - 3, ch); p(8, hT + 2, rk, 2, 1); p(8, tT - 1, cr, 2, 2); }
        else { p(9, hT - 3, cr, 2, 3); p(9, hT - 3, ch); if (front) { p(7, hT + 1, rk, 2, 1); p(11, hT + 6, rk, 2, 1); } p(G.tx0 - 1, tT - 2, cr, 2, 2); p(G.tx1, tT - 2, cr, 2, 2); p(G.tx0 - 1, tT - 2, ch); }
        break;
      }
    }
    if (L.halo) {
      const g = '#ffe070', gs = '#d0a030';
      if (side) { p(cx - 1, hT - 4, g, 4, 1); p(cx - 2, hT - 3, gs); p(cx + 3, hT - 3, gs); }
      else { p(8, hT - 5, g, 4, 1); p(7, hT - 4, gs); p(12, hT - 4, gs); p(8, hT - 3, gs, 4, 1); }
    }
  }
};
// aparência de qualquer raça especial (Nyxar continua com a arte própria)
function sheetLook(race, sex, rng, role) { return race === 'nyxar' ? Nyxar.look(sex, rng, role) : Racas.look(race, sex, rng, role); }
// anjos inimigos (o guerreiro invocado e Aurelith no duelo do Coro)
ENEMIES.anjo_guerreiro.look = Racas.look('anjo', 'm', new RNG(71), 'guerreiro');
ENEMIES.serafim_quarto.look = Object.assign(Racas.look('anjo', 'f', new RNG(4), 'guerreiro'), { size: 1.25, cape: '#a02040', hair: '#f0d890' });
