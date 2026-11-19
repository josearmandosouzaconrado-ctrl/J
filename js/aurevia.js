'use strict';
// =====================================================================
//  AURÉVIA (continente 6): a bandeira, os cavaleiros e a geração
//  • A bandeira do Sacro Império da Rosa Branca (tools/bandeira_ref.jpg):
//    fundo branco, cruz vermelha denteada em X, cruz negra, sol negro de
//    oito raios curvos e a rosa branca no centro. Aparece nas torres, nos
//    portões e na praça de cada cidade do império, nos exércitos e no
//    estandarte do reino.
//  • As ordens de cavaleiros, desenhadas a partir da arte de referência:
//    Cruzados da Rosa (tabardo vermelho, cruz branca, elmo fechado e
//    alabarda), Ordem do Sol Negro (armadura negra e dourada com chifres e
//    fitas vermelhas), Cavaleiros de Prata (pluma vermelha, saiote branco
//    com faixas vermelhas), Legião Escarlate (crista vermelha, capa e
//    gládio), Guarda Azul (alabardeiros de túnica azul e peitoral de aço)
//    e o Imperador Leão (armadura com louros dourados e espada grande).
// =====================================================================
Object.assign(ORE_BY_REGION, {
  rosalba: [O.ORE_FERRO, O.ORE_PRATA, O.ORE_OURO], cruzada: [O.ORE_FERRO, O.ORE_PRATA], solnegro: [O.ORE_FERRO, O.ORE_OBSIDIANA], argentea: [O.ORE_PRATA, O.ORE_PRATA, O.ORE_FERRO],
  solaria: [O.ORE_OURO, O.ORE_FERRO], campos: [O.ORE_FERRO], azurmar: [O.ORE_FERRO, O.ORE_PRATA], santarosa: [O.ORE_PRATA], deserto_ambar: [O.ORE_OURO, O.ORE_OURO, O.ORE_FERRO],
  uivos: [O.ORE_FERRO], picos_brancos: [O.ORE_PRATA, O.ORE_FERRO], ilha_rubra: [O.ORE_OBSIDIANA, O.ORE_OURO]
});

// ---------- a bandeira ----------
Object.assign(Aurevia, {
  _band: {},
  // desenha a bandeira em W x H (desenho vetorial reduzido, nítido em qualquer tamanho)
  bandeira(W, H) {
    const k = W + 'x' + H;
    if (this._band[k]) return this._band[k];
    const c = Sprites.cv(W, H), x = c.getContext('2d');
    x.save(); x.scale(W / 96, H / 64);
    x.fillStyle = '#f4f2ee'; x.fillRect(0, 0, 96, 64);
    // cruz vermelha denteada em X (a cruz de galhos cortados)
    const verm = '#c8141e';
    for (const [x0, y0, x1, y1] of [[0, 0, 96, 64], [96, 0, 0, 64]]) {
      const a = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0);
      x.save(); x.translate(x0, y0); x.rotate(a); x.fillStyle = verm;
      x.fillRect(-4, -6.5, L + 8, 13);
      for (let t = 6, i = 0; t < L - 4; t += 10, i++) { const s = i % 2 ? 1 : -1; x.beginPath(); x.moveTo(t, s * 6); x.lineTo(t + 3, s * 11); x.lineTo(t + 7, s * 11); x.lineTo(t + 6, s * 6); x.fill(); }
      x.restore();
    }
    // cruz negra
    x.fillStyle = '#0c0c0e'; x.fillRect(40, 0, 16, 64); x.fillRect(0, 26, 96, 12);
    // sol negro: oito raios curvos em volta da rosa
    x.save(); x.translate(48, 32); x.fillStyle = '#0c0c0e';
    for (let i = 0; i < 8; i++) {
      x.save(); x.rotate(i * Math.PI / 4 + Math.PI / 8);
      x.beginPath(); x.moveTo(9, -3.2); x.bezierCurveTo(17, -6, 21, 4, 29, 1); x.bezierCurveTo(22, 7, 15, 2, 9, 3.2); x.closePath(); x.fill();
      x.restore();
    }
    // a rosa branca
    x.fillStyle = '#0c0c0e'; x.beginPath(); x.arc(0, 0, 10.5, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(0, 0, 9, 0, Math.PI * 2); x.fill();
    x.strokeStyle = '#0c0c0e'; x.lineWidth = 1.3;
    for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(0, 0, 2 + i * 1.5, i * 1.3, i * 1.3 + Math.PI * 1.2); x.stroke(); }
    x.restore();
    x.restore();
    return (this._band[k] = c);
  },
  // bandeira ondulando presa num mastro (para o mundo): fatias verticais com seno
  desenharMastro(ctx, sx, sy, W, H, alt, t) {
    const b = this.bandeira(W, H);
    ctx.fillStyle = '#4a3a28'; ctx.fillRect(sx - 1, sy - alt, 2, alt);
    ctx.fillStyle = '#e0c060'; ctx.fillRect(sx - 2, sy - alt - 3, 4, 3);
    ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.beginPath(); ctx.ellipse(sx + W * 0.4, sy, W * 0.4, 2, 0, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < W; i += 2) {
      const off = Math.sin(t * 4 - i * 0.35) * (i / W) * 2.5, sh = 1 - 0.12 * Math.max(0, Math.cos(t * 4 - i * 0.35));
      ctx.globalAlpha = 1; ctx.drawImage(b, i, 0, 2, H, sx + 1 + i, sy - alt + 1 + off, 2, H);
      if (sh < 0.97) { ctx.fillStyle = `rgba(0,0,0,${(1 - sh).toFixed(3)})`; ctx.fillRect(sx + 1 + i, sy - alt + 1 + off, 2, H); }
    }
  }
});

// ---------- cavaleiros: aparência de cada ordem ----------
Object.assign(RACE_STYLE, {
  aur_base: { skins: ['#f0d0b0', '#e8c0a0', '#d8a880', '#f4dcc4', '#c89070'], hairs: ['#3a2a1a', '#6a4a2a', '#a07040', '#d8b060', '#1a1410', '#8a3a1a'], eyes: '#2a3a5a',
    clothes: ['#8a2a2a', '#f0e8d8', '#3a4a7a', '#6a5a3a', '#e8dcc0', '#5a3a2a', '#2a4a3a', '#a08050'], legs: ['#3a3028', '#4a3a2a', '#2a2a30', '#5a4a3a'], boots: '#3a2618', robeF: 0.5, robeM: 0.05, beardM: 0.35, metal: '#c8ccd4' }
});
['aur_imperial', 'aur_cruzado', 'aur_negro', 'aur_prata', 'aur_legiao', 'aur_azul'].forEach(r => RACE_STYLE[r] = RACE_STYLE.aur_base);
const AUR_HALB = '#c9cdd6';   // cor de lâmina que marca a alabarda (a arma é uma lança para o combate)
Aurevia.ORDENS = ['aur_cruzado', 'aur_negro', 'aur_prata', 'aur_legiao', 'aur_azul'];
Aurevia.kit = function (L, ordem, role, rng) {
  const f = !!L.fem;
  ['robe', 'hood', 'hat', 'apron', 'vest', 'bag', 'scarf', 'shield', 'crown', 'trim'].forEach(k => delete L[k]);
  L.kit = ordem; L.boots = '#5a6068'; L.chestplate = true;
  switch (ordem) {
    case 'aur_cruzado':
      L.helm = '#9aa0aa'; L.helmStyle = 'full'; L.body = '#a02424'; L.sleeve = '#8a909a'; L.legs = '#7a808a'; L.pauldron = '#8a909a'; L.weapon = 'spear'; L.wc = AUR_HALB; break;
    case 'aur_negro':
      L.helm = '#26242a'; L.helmStyle = 'full'; L.body = '#2a282e'; L.sleeve = '#2a282e'; L.legs = '#1e1c22'; L.boots = '#1a181c'; L.pauldron = '#34323a'; L.weapon = 'spear'; L.wc = AUR_HALB; break;
    case 'aur_prata':
      L.helm = '#cdd1da'; L.helmStyle = 'full'; L.plume = '#c81e1e'; L.body = '#cdd1da'; L.sleeve = '#b4b8c2'; L.legs = '#a8acb6'; L.boots = '#9a9ea8'; L.pauldron = '#dfe2ea'; L.weapon = 'sword'; L.wc = '#e4e8f0'; break;
    case 'aur_legiao':
      L.helm = '#cdd1da'; L.helmStyle = 'full'; L.crest = '#d42020'; L.body = '#cdd1da'; L.sleeve = '#8a4a2a'; L.legs = '#6a3a2a'; L.boots = '#c8ccd4'; L.cape = '#c01c1c'; L.weapon = 'sword'; L.wc = '#d8dce4'; break;
    case 'aur_azul':
      L.helm = '#b4b8c0'; L.helmStyle = 'kettle'; L.body = '#b8bcc6'; L.sleeve = '#2a4aa0'; L.legs = '#24346a'; L.boots = '#4a4e58'; L.weapon = 'spear'; L.wc = AUR_HALB; break;
  }
  if (role === 'ruler') {
    if (ordem === 'aur_cruzado') L.cape = '#f0ece0';
    if (ordem === 'aur_negro') L.cape = '#7a1414';
    if (ordem === 'aur_azul') { L.cape = '#1a3a8a'; delete L.helm; }
    if (ordem === 'aur_prata') L.cape = '#c81e1e';
    L.size = 1.06;
  }
  if (f && (ordem === 'aur_legiao' || ordem === 'aur_prata')) L.hairStyle = 1;
  return L;
};
// o Imperador Leão: sem elmo, coroa de louros, barba, armadura clara com filigrana dourada, faixa vermelha e espada grande
Aurevia.imperador = function (L) {
  ['robe', 'hood', 'hat', 'helm', 'crown', 'apron', 'vest', 'bag', 'scarf'].forEach(k => delete L[k]);
  Object.assign(L, { kit: 'aur_leao', hair: '#7a4a28', hairStyle: 0, beard: true, body: '#d4d8e0', sleeve: '#d4d8e0', legs: '#c8ccd4', boots: '#c0c4cc', chestplate: true, pauldron: '#e0c050', cape: '#a01a1a', weapon: 'great', wc: '#e8ecf4', size: 1.1 });
  return L;
};
(function () {
  const look0 = Racas.look.bind(Racas);
  Racas.look = function (race, sex, rng, role) {
    if (!/^aur_/.test(race)) return look0(race, sex, rng, role);
    const L = look0(race, sex, rng, role === 'guard' || role === 'ruler' ? 'citizen' : role);
    L.feat = 'aur';
    if (role === 'guard') {
      // a Guarda Imperial tem um cavaleiro de cada ordem; nas províncias, a ordem da terra
      const ordem = race === 'aur_imperial' ? rng.pick(Aurevia.ORDENS) : race;
      if (ordem === 'aur_legiao' && rng.chance(0.4)) { L.fem = true; L.lips = shade(L.skin, -0.35); }
      Aurevia.kit(L, ordem, role, rng);
    } else if (role === 'ruler') {
      if (race === 'aur_imperial') Aurevia.imperador(L);
      else Aurevia.kit(L, race, role, rng);
    }
    return L;
  };
  const front0 = Racas.drawFront.bind(Racas);
  Racas.drawFront = function (p, L, dir, G) {
    front0(p, L, dir, G);
    if (L.feat !== 'aur' || !L.kit) return;
    const { hT, tT, tB, tx0, tx1, ey, front, side } = G, back = dir === 'up', w = tx1 - tx0 + 1, ouro = '#e0b040', ouroS = '#a07a20';
    switch (L.kit) {
      case 'aur_cruzado': {
        // tabardo vermelho com a cruz branca na frente e nas costas, aba do tabardo entre as pernas, braçadeiras douradas
        if (!side) { p(9, tT + 1, '#f0ece0', 2, tB - tT - 1); p(7, tT + 2, '#f0ece0', 6, 1); p(8, tB + 1, '#a02424', 4, 4); p(9, tB + 1, '#f0ece0', 2, 3); p(8, tB + 4, '#7a1a1a', 4, 1); }
        else { p(9, tT + 2, '#f0ece0', 2, 1); p(9, tT + 1, '#f0ece0', 1, 4); p(8, tB + 1, '#a02424', 3, 4); }
        if (!side) { p(tx0 - 2, tB - 2, ouro, 2, 1); p(tx1 + 1, tB - 2, ouro, 2, 1); }
        p(tx0, tB - 1, '#5a3a20', w, 1);
        break;
      }
      case 'aur_negro': {
        // filetes dourados no peito, saiote vermelho com bordado dourado e chifres com fitas vermelhas
        if (!side) { p(tx0 + 1, tT + 2, ouro, w - 2, 1); p(tx0 + 1, tT + 4, ouroS, w - 2, 1); p(9, tT + 1, ouro, 2, 1); }
        else p(8, tT + 2, ouro, 4, 1);
        const sx = side ? 7 : tx0, sw = side ? 6 : w;
        p(sx, tB + 1, '#8a1414', sw, 4); for (let i = 0; i < sw; i += 2) p(sx + i, tB + 2 + (i % 4 ? 1 : 0), ouro); p(sx, tB + 4, '#5a0e0e', sw, 1);
        const ch = '#3a3640', chH = '#5a5660', fita = '#d02020';
        if (side) { p(8, hT - 1, ch); p(7, hT - 2, ch); p(7, hT - 3, chH); p(8, hT - 4, chH); p(6, hT, fita); p(5, hT + 1, fita); }
        else {
          p(4, hT + 1, ch); p(3, hT, ch); p(3, hT - 1, ch); p(3, hT - 2, chH); p(4, hT - 3, chH);
          p(15, hT + 1, ch); p(16, hT, ch); p(16, hT - 1, ch); p(16, hT - 2, chH); p(15, hT - 3, chH);
          p(5, hT, fita); p(4, hT + 2, fita); p(14, hT, fita); p(15, hT + 2, fita);
        }
        break;
      }
      case 'aur_prata': {
        // saiote branco com faixas vermelhas e ombreiras redondas polidas
        const sx = side ? 7 : tx0 - 1, sw = side ? 6 : w + 2;
        p(sx, tB + 1, '#ece6d4', sw, 5); p(sx, tB + 3, '#c81e1e', sw, 1); p(sx, tB + 5, '#c81e1e', sw, 1);
        if (!side && !back) p(9, tB + 1, '#d8d0bc', 2, 5);
        if (!side) { p(tx0 - 2, tT, '#eef0f6', 2, 2); p(tx1 + 1, tT, '#eef0f6', 2, 2); p(tx0 - 2, tT, '#ffffff'); }
        p(tx0, tB - 1, '#6a5a3a', side ? 6 : w, 1);
        break;
      }
      case 'aur_legiao': {
        // borda dourada do peitoral e saiote de tiras (pteruges) vermelhas e brancas
        if (!side) { p(tx0, tT, ouro, w, 1); p(tx0, tB - 1, ouro, w, 1); if (front) p(9, tT + 2, ouro, 2, 2); }
        else p(8, tB - 1, ouro, 5, 1);
        const sx = side ? 7 : tx0, sw = side ? 6 : w;
        for (let i = 0; i < sw; i++) p(sx + i, tB, i % 2 ? '#c01c1c' : '#f0ece0', 1, 3 + (i % 2));
        p(sx, tB, '#2a2a2a', sw, 1);
        break;
      }
      case 'aur_azul': {
        // túnica azul longa até o joelho, aberta no meio, por baixo do peitoral
        const sx = side ? 7 : tx0 - 1, sw = side ? 6 : w + 2;
        p(sx, tB, '#2a4aa0', sw, 6); p(sx, tB + 5, '#1a3478', sw, 1);
        if (!side) p(9, tB + 2, '#1a3478', 2, 4);
        p(tx0, tB - 1, '#3a2a1a', side ? 6 : w, 1); if (front) p(9, tB - 1, '#c8ccd4', 2, 1);
        break;
      }
      case 'aur_leao': {
        // coroa de louros, filigrana dourada, o leão de ouro no peito e a faixa vermelha
        const lou = '#e8c040', louS = '#b08a20';
        if (side) { for (let x = 7; x <= 12; x++) p(x, hT + 1 - (x % 2), x % 2 ? lou : louS); }
        else { for (let x = 6; x <= 13; x++) p(x, hT + (x === 6 || x === 13 ? 1 : 0) - ((x % 2) ? 0 : 1), x % 2 ? lou : louS); p(5, hT + 2, lou); p(14, hT + 2, lou); }
        if (!side && !back) {
          p(8, tT + 1, ouro, 4, 3); p(9, tT + 1, '#fff0a0', 1, 1); p(8, tT + 3, ouroS, 4, 1);       // o leão
          p(tx0, tT + 1, ouro, 1, tB - tT - 1); p(tx1, tT + 1, ouro, 1, tB - tT - 1);
          for (let k = 0; k < 5; k++) p(tx0 + 1 + k, tB - 2 + (k > 2 ? 1 : 0), '#a01a1a');   // faixa vermelha
        }
        p(tx0, tB, '#a01a1a', side ? 6 : w, 3); p(9, tB + 1, '#e0c050', 2, 4);
        break;
      }
    }
  };
})();
// alabarda: haste longa, lâmina curva de machado, espeto na ponta e gancho atrás
(function () {
  const w0 = Sprites.weapon;
  Sprites.weapon = function (wclass, col, glow) {
    if (!(wclass === 'spear' && col === AUR_HALB)) return w0.apply(this, arguments);
    const k = 'halberd';
    Sprites._halb = Sprites._halb || null;
    if (Sprites._halb) return Sprites._halb;
    const c = Sprites.cv(26, 16), p = Sprites.P(c.getContext('2d'));
    p(0, 7, '#4a3020', 19, 2); p(0, 7, '#6a4a2c', 19, 1); p(3, 7, '#c8a040', 1, 2); p(10, 7, '#c8a040', 1, 2);
    p(18, 7, '#c9cdd6', 8, 2); p(24, 7, '#ffffff', 2, 1);                       // espeto
    for (let y = 0; y < 7; y++) { const wd = 4 - Math.abs(y - 3) * 0.6; p(17, 7 - y - 1, '#c9cdd6', Math.max(1, Math.round(wd)), 1); }   // lâmina de cima
    p(16, 1, '#e8ecf4', 1, 6); p(20, 1, '#9aa0aa', 1, 3);
    for (let y = 0; y < 5; y++) p(17, 9 + y, y > 2 ? '#9aa0aa' : '#c9cdd6', 3 - (y > 2 ? 1 : 0), 1);    // gancho de baixo
    p(18, 6, '#c8a040', 1, 4);
    Sprites.outline(c);
    return (Sprites._halb = c);
  };
})();

// ---------- o império na guerra: estilo do exército, bandeira e soldados com as armaduras das ordens ----------
KSTYLE.rosalba = { metal: '#c8ccd4', helm1: 'full', helm2: 'full', weapons: ['spear', 'sword', 'spear'], wItem: 'sword', mat2: 'aco', archers: 0.15 };
(function () {
  const k0 = War.kingdoms.bind(War);
  War.kingdoms = function () {
    const l = k0();
    if (this.K && this.K.rosalba) Object.assign(this.K.rosalba, { emb: 'rosa_branca', cor2: '#ffffff', name: 'Sacro Império da Rosa Branca', short: 'Rosa Branca' });
    return l;
  };
  const f0 = War.flagImg.bind(War);
  War.flagImg = function (col, emb, col2) {
    if (emb !== 'rosa_branca') return f0(col, emb, col2);
    this._flags = this._flags || {};
    if (this._flags.rosa_branca) return this._flags.rosa_branca;
    // estandarte com a bandeira do império (o mesmo tamanho das outras: 14x30)
    const c = Sprites.cv(16, 30), x = c.getContext('2d'), p = Sprites.P(x);
    p(1, 0, '#e0c060', 2, 2); p(1, 2, '#6a4a2a', 2, 28);
    x.imageSmoothingEnabled = true; x.drawImage(Aurevia.bandeira(96, 64), 3, 3, 13, 9);
    return (this._flags.rosa_branca = c);
  };
  const l0 = War.look.bind(War);
  War.look = function (k, kind, rng) {
    const L = l0(k, kind, rng);
    if (k !== 'rosalba') return L;
    if (kind === 'arqueiro' || kind === 'mosqueteiro') { L.tabard = '#c8141e'; L.tabardSign = '#ffffff'; return L; }
    const ordem = kind === 'milicia' ? 'aur_azul' : kind === 'soldado' ? rng.pick(['aur_cruzado', 'aur_cruzado', 'aur_legiao', 'aur_azul']) : kind === 'cavaleiro' ? rng.pick(['aur_prata', 'aur_cruzado']) : 'aur_negro';
    const N = Racas.look('aur_imperial', 'm', rng, 'citizen');
    Aurevia.kit(N, ordem, 'guard', rng);
    return N;
  };
})();
EMBLEMAS.rosa_branca = EMBLEMAS.rosa_branca || { nome: 'Rosa Branca', px: ['.###.', '#.#.#', '##.##', '#.#.#', '.###.'] };

// ---------- natureza: o bioma de cada tile vem do mapa (não da região) ----------
(function () {
  const n0 = World.prototype.natObj;
  World.prototype.natObj = function (x, y, t, ri) {
    if (x < AUREVIA.x0) return n0.apply(this, arguments);
    const reg = this.regions[ri];
    if (!reg || reg.cont !== 6) return n0.apply(this, arguments);
    const wx = x + 150 * this.nW.noise(x / 520, y / 520), wy = y + 150 * this.nW.noise(x / 520 + 91.3, y / 520 + 47.1);
    const b = Aurevia.BIOMA[Aurevia.classe((x + (wx - x) * 0.6 - AUREVIA.ox) / AUREVIA.sc, (y + (wy - y) * 0.6 - AUREVIA.oy) / AUREVIA.sc)] || 'plains';
    const b0 = reg.biome; reg.biome = b === 'rubra' ? 'desert' : b === 'estepe' ? 'hills' : b;
    try { return n0.apply(this, arguments); } finally { reg.biome = b0; }
  };
})();

// ---------- geração: cidades, masmorras, acampamentos, santuários, portos e estradas ----------
World.prototype.generateAurevia = function () {
  const rng = new RNG(this.seed * 173 + 91);
  const regs = this.regions.filter(r => r.cont === 6);
  const made = [];
  let sid = 0;
  const em = (x, y, R) => contAt(x, y) === 6 && this.regionAt(x, y) === R.index;
  for (const reg of regs) {
    if (!reg.ruler) continue;
    const names = SETTLEMENT_NAMES[reg.id], pool = rng.shuffle(names.list.slice());
    const types = ['capital'];
    for (let i = 0; i < reg.towns; i++) types.push('town');
    for (let i = 0; i < reg.villages; i++) types.push('village');
    for (const type of types) {
      const size = type === 'capital' ? 50 : type === 'town' ? 34 : 24, half = size / 2 + 4;
      const ok = (x, y) => {
        if (!em(x, y, reg)) return false;
        const pts = [[0, 0], [-half, -half], [half, -half], [-half, half], [half, half], [0, -half], [0, half], [-half, 0], [half, 0]];
        let bad = 0;
        for (const [dx, dy] of pts) { const t = this.baseTile(x + dx, y + dy); if (t === T.DEEP || t === T.LAVA) return false; if (TSOLID[t] || TWATER[t]) bad++; }
        return bad <= 2 && this.farFrom(x, y, made, type === 'village' ? 110 : 170);
      };
      const raio = type === 'capital' ? 700 : reg.id === 'santarosa' ? 900 : 3600;
      const pos = this.findLand(reg.cx, reg.cy, rng, raio, ok) || this.findLand(reg.cx, reg.cy, rng, raio * 1.6, ok);
      if (!pos) continue;
      const st = { id: 'a' + (sid++), name: type === 'capital' ? names.cap : (pool.pop() || ('Vila ' + sid)), type, region: reg, x: pos.x, y: pos.y, cx: pos.x, cy: pos.y, imperio: true };
      made.push(st); this.settlements.push(st);
    }
  }
  for (const st of made) this.layoutSettlement(st);
  let uid = this.dungeons.reduce((m, d) => Math.max(m, d.uid), 0) + 1;
  const dl = [];
  const campName = { rosalba: 'Acampamento de Desertores', cruzada: 'Acampamento de Renegados', solnegro: 'Covil dos Caídos', argentea: 'Acampamento de Caçadores Ilegais', solaria: 'Acampamento de Saqueadores do Deserto', campos: 'Acampamento de Ladrões de Trigo', azurmar: 'Esconderijo de Piratas', santarosa: 'Acampamento de Hereges', deserto_ambar: 'Forte de Renegados', uivos: 'Acampamento de Bandoleiros', picos_brancos: 'Acampamento de Saqueadores', ilha_rubra: 'Acampamento de Caçadores de Dragão' };
  for (const R of regs) {
    const types = REGION_DUNGEONS[R.id];
    for (let i = 0; i < R.dungeons; i++) {
      const pos = this.findLand(R.cx, R.cy, rng, R.id === 'santarosa' || R.id === 'ilha_rubra' ? 900 : 3800, (x, y) => em(x, y, R) && this.isLand(x, y) && this.isLand(x, y + 1) && this._e < 0.69 && this.farFrom(x, y, made, 40) && this.farFrom(x, y, dl, 60));
      if (!pos) continue;
      const type = rng.pick(types), dt = DUNGEON_TYPES[type];
      const d = { id: 'ad' + uid, uid: uid++, name: dt.name + ' ' + rng.pick(DUNGEON_NOUNS), type, boss: dt.boss, lvl: rng.int(R.lvl[0], R.lvl[1]), size: rng.int(48, 64), x: pos.x, y: pos.y, region: R };
      dl.push(d); this.stampDungeon(d); this.dungeons.push(d); this.dungeonById[d.id] = d;
    }
    for (let i = 0; i < 4; i++) {
      const pos = this.findLand(R.cx, R.cy, rng, 3200, (x, y) => em(x, y, R) && this.isLand(x, y) && this._e < 0.66 && this.farFrom(x, y, made, 60) && this.farFrom(x, y, dl, 25) && this.farFrom(x, y, this.pois, 40));
      if (!pos) continue;
      const pc = { id: 'acamp' + R.id + i, kind: 'camp', x: pos.x, y: pos.y, region: R, lvl: rng.int(R.lvl[0], R.lvl[1]), name: campName[R.id] || 'Acampamento Bandido' };
      this.stampCamp(pc, rng); this.pois.push(pc);
    }
    for (let i = 0; i < 2; i++) {
      const pos = this.findLand(R.cx, R.cy, rng, 2400, (x, y) => em(x, y, R) && this.isLand(x, y) && this.isLand(x, y + 1) && this.farFrom(x, y, made, 40) && this.farFrom(x, y, this.pois, 40) && this.farFrom(x, y, dl, 30));
      if (pos) { const pc = { id: 'ashrine' + R.id + i, kind: 'shrine', x: pos.x, y: pos.y, region: R, name: R.ruler ? 'Capela da Rosa' : 'Santuário Esquecido' }; this.stampSmall(pc, O.SHRINE, rng); this.pois.push(pc); }
    }
  }
  // portos na costa oeste das terras (procurando de oeste para leste, linha por linha do mapa)
  const before = this.ports.length;
  const seaAt = (x, y) => { const t = this.baseTile(x, y); return TWATER[t] || t === T.DEEP; };
  [[0, 175, 'Porto de Prata'], [0, 380, 'Porto da Legião'], [300, 300, 'Porto do Trigo'], [345, 255, 'Porto dos Cruzados'], [360, 60, 'Porto Imperial da Rosa'], [560, 300, 'Porto de Azurmar']].forEach(([px0, py, name], n) => {
    const y0 = Math.round(AUREVIA.oy + py * AUREVIA.sc), xs = Math.round(AUREVIA.ox + px0 * AUREVIA.sc);
    for (let dy = 0; dy < 1400; dy += 10) for (const yy of [y0 + dy, y0 - dy]) {
      let x = xs + 40;
      const lim = xs + 9000;
      while (x < lim) { if (this.isLand(x, yy)) break; x += 2; }
      if (x >= lim || contAt(x, yy) !== 6) continue;
      while (!this.isLand(x - 1, yy) && x > xs) x--;
      let land = 0, sea = 0;
      for (let k = 1; k <= 12; k++) { if (this.isLand(x + k, yy) && this.isLand(x + k, yy - 3) && this.isLand(x + k, yy + 3)) land++; if (seaAt(x - k, yy) && seaAt(x - k, yy - 3) && seaAt(x - k, yy + 4)) sea++; }
      const R = this.regions[this.regionAt(x, yy)];
      if (land < 11 || sea < 11 || R.hostile || !this.farFrom(x, yy, this.settlements, 40) || !this.farFrom(x, yy, this.dungeons, 20)) continue;
      this.layoutPort({ x, y: yy, R }, 6, -1, name, n, rng);
      return;
    }
  });
  const nv = this.ports.slice(before);
  this.buildRoads(rng, made.concat(nv), false);
};

// ---------- mar, mapa e conversas ----------
(function () {
  const s0 = Elyndra.seaName.bind(Elyndra);
  Elyndra.seaName = (a, b) => a === 6 || b === 6 ? 'Mar das Rosas' : s0(a, b);
})();

// ---------- bandeiras nas cidades do império: na praça, nos portões e nas torres do palácio ----------
Aurevia.drawables = function (D, camX, camY, vw, vh) {
  const W = Game.world;
  if (!W || !W.isWorld || !Game.player || Game.player.x / 16 < AUREVIA.x0 - 200) return;
  const t = Game.t;
  for (const s of W.settlements) {
    if (!s.imperio || !s.mid) continue;
    const mx = s.mid.x * 16, my = s.mid.y * 16;
    if (mx < camX - 900 || mx > camX + vw + 900 || my < camY - 900 || my > camY + vh + 900) continue;
    const mastros = s._mastros || (s._mastros = (() => {
      const l = [{ x: s.mid.x * 16 + 40, y: s.mid.y * 16 - 8, g: true }];
      for (const g of s.gates || []) { const ox = g.dir === 'n' || g.dir === 's' ? 40 : 0, oy = g.dir === 'e' || g.dir === 'w' ? 40 : 0; l.push({ x: g.x * 16 + 8 + ox, y: g.y * 16 + 8 + oy }, { x: g.x * 16 + 8 - ox, y: g.y * 16 + 8 - oy }); }
      return l;
    })());
    for (const m of mastros) {
      if (m.x < camX - 60 || m.x > camX + vw + 60 || m.y < camY - 20 || m.y > camY + vh + 90) continue;
      const big = m.g && s.type === 'capital';
      D.push({ y: m.y, fn: (ctx, cx, cy) => Aurevia.desenharMastro(ctx, Math.round(m.x - cx), Math.round(m.y - cy), big ? 36 : 24, big ? 24 : 16, big ? 64 : 44, t + m.x * 0.01) });
    }
  }
};
(function () {
  const d0 = Inverno.drawables.bind(Inverno);
  Inverno.drawables = function (D, camX, camY, vw, vh) { d0(D, camX, camY, vw, vh); try { Aurevia.drawables(D, camX, camY, vw, vh); } catch (e) { } };
})();
