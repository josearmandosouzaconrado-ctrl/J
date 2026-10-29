'use strict';
// ===================== PIXEL ART: personagens, criaturas, armas, construções =====================
(function (S) {
  const cv = S.cv, P = S.P, outline = S.outline, flip = S.flip, ellipse = S.ellipse, blob = S.blob;

  // ---------- HUMANOIDES (20x40, proporções realistas) ----------
  // Cabeça pequena (6x7), pescoço, ombros mais largos que a cintura, braços até o quadril, pernas longas com joelho e botas.
  // L: aparência. dir: 'down'|'up'|'side'. frame 0..2 (0 parado, 1 e 2 passos)
  function humanoid(L, dir, frame) {
    // asas precisam de espaço dos lados: o desenho é deslocado OX pixels para dentro
    const OX = L.wings ? (L.wings === 'small' ? 3 : L.wings === 'mid' ? 5 : 6) : 0;
    const W = 20 + OX * 2, H = 40;
    const c = cv(W, H), ctx = c.getContext('2d'), p0 = P(ctx);
    const p = OX ? (x, y, col, w = 1, h = 1) => p0(x + OX, y, col, w, h) : p0;
    const skel = !!L.skeleton, mum = !!L.mummy, det = !skel && !mum;
    const sk = skel ? '#e8e0c8' : (L.skin || '#e0ac69');
    const skS = shade(sk, -0.16), skD = shade(sk, -0.32), skH = shade(sk, 0.14);
    // rosto: sombras suaves (o contorno já separa a cabeça do fundo)
    const fS = shade(sk, -0.1), fM = shade(sk, -0.05), fH = shade(sk, 0.06);
    const lum = sk.length !== 7 ? 0.5 : (parseInt(sk.slice(1, 3), 16) * 0.3 + parseInt(sk.slice(3, 5), 16) * 0.59 + parseInt(sk.slice(5, 7), 16) * 0.11) / 255;
    const escura = !skel && lum < 0.42, boca = mix(sk, '#5a2020', escura ? 0.45 : 0.32);
    const hair = L.hair || '#3a2a1a', hS = shade(hair, -0.28), hH = shade(hair, 0.28), hD = shade(hair, -0.45);
    const body = L.body !== undefined && L.body !== null ? L.body : (skel ? null : '#6a5a4a');
    const bH = body ? shade(body, 0.18) : null, bS = body ? shade(body, -0.18) : null, bD = body ? shade(body, -0.36) : null;
    const legs = L.legs || (body ? shade(body, -0.4) : '#3a3028'), lS = shade(legs, -0.25), lH = shade(legs, 0.16);
    const boots = L.boots || '#3a2618', btH = shade(boots, 0.28), btS = shade(boots, -0.3);
    const bone = '#ece4cc', boneS = '#b8ae94';
    const eyeC = L.eyes || (skel || L.zombie ? '#ff3020' : mum ? '#ffd040' : '#20142a');
    const short = L.short || 0, tall = L.tall ? 1 : 0, bulky = L.bulky ? 1 : 0;
    const pequeno = short >= 3, anao = short === 2 || short === 1;
    // ---- geometria (y cresce para baixo; os pés tocam a última linha)
    const footY = 39;   // linhas de cima livres para chapéus altos e plumas
    const legH = pequeno ? 6 : anao ? 7 : 11 + tall;
    const torsoH = pequeno ? 6 : anao ? 8 : 9 + tall;
    const legTop = footY - legH + 1;
    const tB = legTop - 1, tT = tB - torsoH + 1;
    const neck = pequeno ? 0 : 1;
    const hB = tT - 1 - neck, hT = hB - 6;
    const hx0 = pequeno ? 6 : 7, hx1 = pequeno ? 13 : 12;            // cabeça
    const ombro0 = (anao ? 5 : 6) - bulky, ombro1 = (anao ? 14 : 13) + bulky;   // ombros
    const tx0 = (anao ? 6 : pequeno ? 7 : 7) - bulky, tx1 = (anao ? 13 : pequeno ? 12 : 12) + bulky; // cintura
    const robe = !!L.robe;
    const band = (x, y) => { if (mum && ((x * 2 + y) % 4 === 0)) p(x, y, '#8a7a5a'); };
    const hs = L.hairStyle || 0;
    const covered = !!(L.helm || L.hood);
    const noHair = skel || mum || hs === 2;
    const ey = L.snout ? hT + 2 : hT + 3;
    const front = dir === 'down', back = dir === 'up', side = !front && !back;
    const armC = skel && !L.body ? bone : (L.sleeve || body), armS = skel && !L.body ? boneS : shade(armC, -0.22), armH = skel && !L.body ? bone : shade(armC, 0.15);
    const hatOk = det && L.hat && !L.helm && !L.hood;
    // traços das raças de Elyndra e dos anjos (asas atrás do corpo, marcas, cristais, auréola...)
    const G = (L.feat || L.wings || L.halo) ? { hT, hB, tT, tB, tx0: ombro0, tx1: ombro1, footY, ey, legTop, sk, skS, skH, hair, front, side, frame, hx0, hx1 } : null;
    if (G && typeof Racas !== 'undefined') Racas.drawBehind(p, L, dir, G);

    // ---------- chapéus (todas as vistas) ----------
    const chapeu = () => {
      const hc = L.hatC || '#c8a050', hcS = shade(hc, -0.25), hcH = shade(hc, 0.22), fita = L.hatBand || shade(hc, -0.45);
      const c0 = side ? hx0 + 1 : hx0, c1 = side ? hx1 : hx1;   // copa
      switch (L.hat) {
        case 'straw': case 'wide': {
          const alto = L.hat === 'wide' ? 4 : 3, b0 = side ? hx0 - 2 : hx0 - 3, b1 = side ? hx1 + 4 : hx1 + 3;
          p(b0, hT + 1, hc, b1 - b0 + 1, 1); p(b0, hT + 1, hcH, 3, 1); if (!side) { p(b0, hT + 2, hcS, 2, 1); p(b1 - 1, hT + 2, hcS, 2, 1); }
          p(c0, hT + 1 - alto, hc, c1 - c0 + 1, alto); p(c0, hT + 1 - alto, hcH, c1 - c0 + 1, 1); p(c0, hT, fita, c1 - c0 + 1, 1); p(c1, hT + 1 - alto, hcS, 1, alto);
          if (L.hat === 'straw') { p(c0 + 1, hT - 1, hcH); p(c1 - 1, hT - 2, hcH); p(b0 + 2, hT + 1, hcS); }
          if (L.pena) { p(side ? c0 : c1, hT - alto, L.pena, 1, 3); p(side ? c0 - 1 : c1 + 1, hT - alto - 1, shade(L.pena, 0.25)); }
          break;
        }
        case 'cap': p(c0, hT - 2, hc, c1 - c0 + 1, 1); p(c0 - 1, hT - 1, hc, c1 - c0 + 3, 2); p(c0, hT - 2, hcH, 3, 1); if (side) p(hx1 + 1, hT + 1, hcS, 3, 1); else if (front) p(hx0, hT + 1, hcS, 6, 1); break;
        case 'bandana': p(hx0, hT - 1, hc, hx1 - hx0 + 1, 2); p(hx0 - 1, hT, hc, 1, 2); if (!side) p(hx1 + 1, hT, hcS, 1, 2); p(hx0 + 1, hT, hcH); p(hx0 + 3, hT - 1, hcH); if (back || side) { const kx = side ? hx0 - 1 : 9; p(kx, hT + 1, hc, side ? 1 : 2, 2); p(kx, hT + 3, hcS, 1, 2); } break;
        case 'beret': p(hx0 - 1, hT - 2, hc, hx1 - hx0 + 3, 2); p(hx0, hT - 3, hc, hx1 - hx0 + 1, 1); p(hx0, hT - 3, hcH, 3, 1); p(10, hT - 4, hcS); break;
        case 'lenco': p(hx0 - 1, hT - 1, hc, hx1 - hx0 + 3, 3); p(hx0, hT - 2, hcH, hx1 - hx0, 1); if (front) { p(hx0 - 1, hT + 2, hc, 1, 4); p(hx1 + 1, hT + 2, hcS, 1, 4); } else for (let y = hT + 2; y <= hB + 1; y++) p(side ? hx0 - 1 : hx0, y, y % 2 ? hc : hcS, side ? 3 : hx1 - hx0 + 1, 1); break;
        case 'flores': { const fl = ['#f06080', '#f0e060', '#ffffff', '#b070f0', '#ff9040']; for (let x = hx0 - 1, i = 0; x <= hx1 + 1; x += 2, i++) { p(x, hT - (i % 2), fl[(i + (L.seed || 0)) % fl.length]); if (i % 2) p(x + 1, hT, '#4a9a40'); } break; }
      }
    };

    if (!side) {
      // ================= FRENTE / COSTAS =================
      // cabelo longo atrás do corpo
      if (!noHair && !covered && hs === 1 && front) { for (let y = hT + 3; y <= tT + 3; y++) p(hx0 - 1, y, y > tT ? hD : hS, hx1 - hx0 + 3, 1); }
      if (back && L.tail) { const tc = L.tailC || sk, sw = frame === 1 ? -1 : frame === 2 ? 1 : 0; p(9, tB, tc, 2, 2); p(9 + sw, tB + 2, tc, 2, 2); p(9 + sw * 2, tB + 4, shade(tc, -0.2), 2, 1); }
      if (L.cape && front) { p(ombro0 - 1, tT, shade(L.cape, -0.15), 1, torsoH + 3); p(ombro1 + 1, tT, shade(L.cape, -0.15), 1, torsoH + 3); }
      // ---- pernas
      if (!robe) {
        const leg = (x0, x1, raise, outer) => {
          const bottom = footY - raise, knee = legTop + Math.floor(legH * 0.45);
          for (let y = legTop; y <= bottom; y++) {
            const bota = y >= bottom - (pequeno || anao ? 1 : 2);
            for (let x = x0; x <= x1; x++) {
              let col;
              if (skel && !L.legs) { if (x !== x0 + 1) continue; col = bota ? boneS : bone; }
              else if (bota) col = y === bottom - (pequeno || anao ? 1 : 2) ? btH : x === outer ? btS : boots;
              else col = x === outer ? lS : (x === (outer === x0 ? x1 : x0) ? lH : legs);
              if (!bota && y === knee && !skel) col = x === outer ? lS : shade(legs, 0.08);
              p(x, y, col); band(x, y);
            }
          }
          if (!(skel && !L.legs)) p(x0, bottom, btS, x1 - x0 + 1, 1);
        };
        const lx0 = 7 - bulky, rx1 = 12 + bulky;
        leg(lx0, 9, frame === 1 ? 1 : 0, lx0);
        leg(10, rx1, frame === 2 ? 1 : 0, rx1);
        if (det && L.patch && legH >= 8) p(lx0, legTop + 2, shade(legs, 0.3), 2, 2);
      }
      // ---- tronco
      if (skel && !L.body) {
        for (let y = tT; y <= tB; y++) { p(9, y, bone, 2, 1); if ((y - tT) % 2 === 0 && y < tB - 1) p(tx0, y, bone, tx1 - tx0 + 1, 1); }
        p(tx0 + 1, tB, boneS, tx1 - tx0 - 1, 1);
      } else {
        const bot = robe ? footY - 1 : tB;
        for (let y = tT; y <= bot; y++) {
          const ombros = y <= tT + 1, ext = robe && y > tB ? Math.min(2, Math.floor((y - tB + 1) / 3)) : 0;
          const a = (ombros ? ombro0 : tx0) - ext, b = (ombros ? ombro1 : tx1) + ext;
          for (let x = a; x <= b; x++) {
            let col = body;
            if (x === a) col = bH; else if (x === b) col = bD; else if (x === b - 1) col = bS;
            if (y === tT && (x === a || x === b)) continue;
            if (L.fur && (x === a || x === b) && (y % 2)) col = bH;
            if (L.zombie && ((x * 7 + y * 3) % 9 === 0)) col = bD;
            p(x, y, col); band(x, y);
          }
        }
        if (front && !mum) {
          // decote, costura e dobras do tecido
          p(9, tT, skS, 2, 1); p(8, tT, bD); p(11, tT, bD);
          if (L.chestplate) { p(tx0 + 1, tT + 1, shade(body, 0.35), tx1 - tx0 - 1, 2); p(9, tT + 3, bH, 2, torsoH - 5); p(tx0 + 1, tT + 4, bS, tx1 - tx0 - 1, 1); }
          else if (!robe) { p(9, tT + 2, bS, 1, torsoH - 4); p(tx0 + 1, tT + Math.floor(torsoH / 2), bS); }
        }
        if (back && !mum) { p(9, tT + 1, bS, 2, 1); p(tx0 + 1, tT + 3, bS, 1, torsoH - 5); p(tx1 - 1, tT + 3, bD, 1, torsoH - 5); }
        if (robe) {
          const tr = L.trim || shade(body, 0.4);
          if (front) for (let y = tT + 1; y < footY; y++) p(9, y, tr, 2, 1);
          p(tx0 - 2, footY - 1, bD, tx1 - tx0 + 5, 1);
          if (front) { p(7, footY, boots, 2, 1); p(11, footY, boots, 2, 1); }
          if (det) for (let y = tB + 1; y < footY - 1; y++) { p(tx0, y, bS); p(tx1 - 1, y, bS); }
          if (L.sash) p(tx0, tB - 2, L.sash, tx1 - tx0 + 1, 1);
        } else if (!mum && !L.fur && !L.nobelt) {
          p(tx0, tB, '#3a2416', tx1 - tx0 + 1, 1);
          if (front) p(9, tB, '#e0b848', 2, 1);
        }
        if (L.crossbelt && !robe) { for (let k = 0; k < torsoH; k++) { const x = ombro0 + 1 + Math.round(k * (ombro1 - ombro0 - 2) / (torsoH - 1)); p(x, tT + k, '#f0ece0'); if (front) p(ombro1 - 1 - (x - ombro0 - 1), tT + k, '#e4e0d4'); } if (front) p(9, tT + 3, '#e0c060', 2, 2); }
        if (L.tabard && !robe) {
          const tc = L.tabard, tS = shade(tc, -0.25);
          for (let y = tT + 1; y <= tB + 3; y++) { p(8, y, tc, 4, 1); p(11, y, tS); }
          if (front) { p(9, tT + 2, L.tabardSign || '#f0d060', 2, 2); p(8, tB + 3, tS, 4, 1); }
        }
        // ---- roupas em camadas e acessórios
        if (det && !L.tabard && !L.chestplate) {
          if (L.vest && !robe) {
            const v = L.vest, vS = shade(v, -0.25), vH = shade(v, 0.18), sh = L.shirt || '#e8dcc0';
            for (let y = tT; y < tB; y++) {
              const a = y <= tT + 1 ? ombro0 : tx0, b = y <= tT + 1 ? ombro1 : tx1;
              if (front) { p(a, y, vH); p(a + 1, y, v, 2, 1); p(b - 2, y, v, 2, 1); p(b, y, vS); p(a + 3, y, y === tT ? shade(sh, -0.15) : sh, b - a - 5, 1); }
              else { p(a, y, vH); p(a + 1, y, y % 3 ? v : vS, b - a - 1, 1); p(b, y, vS); }
            }
            if (front) { for (let y = tT + 1; y < tB; y += 2) p(9, y, shade(sh, -0.4), 2, 1); p(tx0 + 1, tT + 3, shade(v, 0.35)); p(tx1 - 1, tT + 3, shade(v, 0.35)); }
          } else if (L.stripes && !robe) for (let y = tT + 1; y < tB; y += 2) p(tx0 + 1, y, shade(body, 0.24), tx1 - tx0 - 1, 1);
          if (L.collar && front) { p(8, tT, L.collar, 4, 1); p(7, tT + 1, L.collar); p(12, tT + 1, shade(L.collar, -0.2)); }
          if (L.scarf) { const sc = L.scarf, scS = shade(sc, -0.22); p(7, tT, sc, 6, 1); p(7, tT + 1, scS, 6, 1); if (front) { p(11, tT + 2, sc, 2, 3); p(11, tT + 5, scS); p(7, tT, shade(sc, 0.25), 2, 1); } else p(8, tT + 2, sc, 2, 3); }
          if (L.apron) {
            const a = L.apron, aS = shade(a, -0.16), top = tT + 3, bot = robe ? footY - 3 : tB + 4;
            if (front) {
              p(8, tT, aS, 1, 3); p(11, tT, aS, 1, 3);
              for (let y = top; y <= bot; y++) { p(7, y, a, 6, 1); p(12, y, aS); }
              p(7, top, shade(a, 0.14), 6, 1); p(8, top + 4, aS, 4, 1); p(8, bot, aS, 4, 1);
            } else { for (let k = 0; k < torsoH - 1; k++) { p(8 + Math.floor(k / 3), tT + k, aS); p(11 - Math.floor(k / 3), tT + k, aS); } p(9, tB - 1, a, 2, 1); p(8, tB, a); p(11, tB, a); }
          }
          if (L.pouch && !robe) { const px = front ? tx1 - 1 : tx0; p(px, tB, '#6a3e1c', 2, 2); p(px, tB, '#8a5a30', 2, 1); }
          if (L.bag) {
            for (let k = 0; k < torsoH; k++) p(front ? ombro0 + 1 + k : ombro1 - 1 - k, tT + k, '#4a2e18');
            const bx = front ? tx1 - 1 : tx0 - 1; p(bx, tB - 1, L.bag, 3, 3); p(bx, tB - 1, shade(L.bag, 0.2), 3, 1); p(bx + 1, tB, '#d8b048');
          }
        }
        if (L.cape && back) { for (let y = tT; y <= Math.min(footY - 1, tB + 5); y++) { const a = ombro0 - (y > tB ? 1 : 0), b = ombro1 + (y > tB ? 1 : 0); p(a, y, y % 3 === 0 ? shade(L.cape, -0.15) : L.cape, b - a + 1, 1); p(b, y, shade(L.cape, -0.3)); } p(ombro0, tT, shade(L.cape, 0.2), ombro1 - ombro0 + 1, 1); }
        if (L.cape && front) p(8, tT, shade(L.cape, 0.2), 4, 1);
      }
      // ---- pescoço
      if (neck && !(L.helm && L.helmStyle === 'full')) { p(9, tT - 1, skel ? bone : skS, 2, 1); }
      // ---- braços
      const arm = (x, sw, outer) => {
        const fim = tB + sw;
        for (let y = tT + 1 + sw; y <= fim; y++) {
          if (skel && !L.body) { p(x + (outer === x ? 1 : 0), y, bone); continue; }
          const cot = y === tT + 1 + sw + Math.floor(torsoH / 2);
          p(x, y, x === outer ? armS : cot ? armS : armC); p(x + 1, y, x + 1 === outer ? armS : y === tT + 1 + sw ? armH : armC);
        }
        const hc = skel ? bone : sk;
        p(x, fim + 1, hc, 2, 1); p(x, fim + 2, skel ? boneS : skS, 2, 1);
      };
      const ax0 = ombro0 - 2, ax1 = ombro1 + 1;
      arm(ax0, frame === 1 ? 1 : 0, ax0); arm(ax1, frame === 2 ? 1 : 0, ax1 + 1);
      if (L.pauldron) { const pc = L.pauldron; p(ax0 - 1, tT, pc, 4, 2); p(ax1 - 1, tT, pc, 4, 2); p(ax0 - 1, tT, shade(pc, 0.35), 3, 1); p(ax1 + 2, tT + 1, shade(pc, -0.3)); }
      if (L.shield) {
        const sc = L.shield;
        if (front) { for (let y = tT + 2; y <= tB + 3; y++) { const w = y > tB + 1 ? 2 : 4; p(ax0 - 2 + (4 - w) / 2, y, sc, w, 1); } p(ax0 - 2, tT + 2, shade(sc, 0.3), 4, 1); p(ax0 - 1, tT + 3, '#e0c060', 2, 3); }
        else { p(tx0, tT + 2, shade(sc, -0.2), tx1 - tx0 + 1, torsoH - 2); p(tx0 + 1, tT + 3, sc, tx1 - tx0 - 1, torsoH - 4); }
      }
      if (det && L.cane && front) { const cx = ax1 + 2; p(cx, tB + 2, '#7a5030', 1, footY - tB - 1); p(cx - 1, tB + 2, '#5a3a20', 2, 1); p(cx, tB + 3, '#9a7048'); }
      // ---- cabeça
      for (let y = hT; y <= hB; y++) for (let x = hx0; x <= hx1; x++) {
        if ((y === hT || y === hB) && (x === hx0 || x === hx1)) continue;
        let col = skel ? bone : sk;
        if (!skel) { if (x === hx1 && y > ey) col = fS; else if (x === hx1 || y === hB) col = fM; }
        else if (x === hx1 || y === hB) col = boneS;
        p(x, y, col); band(x, y);
      }
      // orelhas
      if (L.ears === 'elf') { p(hx0 - 1, ey, sk); p(hx0 - 2, ey - 1, sk); p(hx0 - 3, ey - 2, skH); p(hx1 + 1, ey, skS); p(hx1 + 2, ey - 1, sk); p(hx1 + 3, ey - 2, skH); }
      else if (L.ears === 'goblin') { p(hx0 - 3, ey - 1, sk, 3, 1); p(hx0 - 4, ey - 2, sk, 2, 1); p(hx1 + 1, ey - 1, sk, 3, 1); p(hx1 + 3, ey - 2, sk, 2, 1); }
      else if (!covered && (noHair || hs === 3) && !L.catears && !skel) { p(hx0 - 1, ey + 1, fM); p(hx1 + 1, ey + 1, fS); }   // orelhas só aparecem sem cabelo dos lados
      if (L.catears) { p(hx0, hT - 1, hair, 2, 1); p(hx0, hT - 2, hair); p(hx0 + 1, hT - 1, '#f0a0b0'); p(hx1 - 1, hT - 1, hair, 2, 1); p(hx1, hT - 2, hair); p(hx1 - 1, hT - 1, '#f0a0b0'); }
      const exL = pequeno ? 8 : 8, exR = pequeno ? 11 : 11;
      if (front) {
        if (skel) {
          p(exL, ey, '#1a1010', 1, 2); p(exR, ey, '#1a1010', 1, 2); p(exL, ey, eyeC); p(exR, ey, eyeC); p(9, ey + 2, '#3a3028', 2, 1);
          for (let x = hx0 + 1; x < hx1; x += 2) p(x, hB - 1, '#4a4034');
        } else {
          // olhos: um ponto escuro com o branco do olho do lado de fora (pele escura ou rosto pequeno)
          p(exL, ey, eyeC); p(exR, ey, eyeC);
          if (pequeno || escura) { const br = pequeno ? '#f4f0ec' : mix('#f0ece4', sk, 0.35); p(exL - 1, ey, br); p(exR + 1, ey, br); }
          if (!L.snout && !L.muzzle) {
            p(10, ey + 1, fS);                                   // sombra do nariz
            if (!L.beard) p(9, ey + 2, boca, 2, 1);              // boca discreta
            p(exL, ey + 1, fH);                                  // maçã do rosto
          }
          if ((L.blush || L.child || pequeno || L.fem) && !L.snout && !L.muzzle) { p(exL, ey + 1, mix(sk, '#ff6878', L.fem && !L.blush ? 0.16 : 0.26)); p(exR, ey + 1, mix(sk, '#ff6878', L.fem && !L.blush ? 0.16 : 0.26)); }
          if (L.old) { p(exL, ey + 1, fS); p(exR, ey + 1, fS); }
          if (L.snout) { p(hx0, hT + 4, skH, hx1 - hx0 + 1, 3); p(8, hT + 4, skD); p(11, hT + 4, skD); p(hx0, hB, skS, hx1 - hx0 + 1, 1); }
          if (L.muzzle) { p(9, ey + 1, '#e07888', 2, 1); p(8, ey + 2, skH, 4, 1); }
          if (L.tusks) { p(8, hB - 1, '#f4f0e0'); p(11, hB - 1, '#f4f0e0'); p(8, hB, '#f4f0e0'); p(11, hB, '#f4f0e0'); }
          if (L.beard) {
            const bc = L.beardC || hair, bcS = shade(bc, -0.25), longa = anao || L.short >= 2;
            p(hx0, ey + 1, bc, 1, hB - ey); p(hx1, ey + 1, bcS, 1, hB - ey);
            p(hx0, hB - 1, bc, hx1 - hx0 + 1, 2); p(9, ey + 2, shade(bc, -0.35), 2, 1);
            p(hx0 + 1, hB + 1, bc, hx1 - hx0 - 1, 1);
            if (longa) { p(hx0 + 1, hB + 2, bc, hx1 - hx0 - 1, 2); p(9, hB + 4, bcS, 2, 2); }
            p(hx0 + 1, hB, hH);
          }
        }
      }
      if (L.horns) { const hc = '#ece0c4'; p(hx0, hT - 1, hc); p(hx0 - 1, hT - 2, hc); p(hx0 - 1, hT - 3, '#c8b898'); p(hx1, hT - 1, hc); p(hx1 + 1, hT - 2, hc); p(hx1 + 1, hT - 3, '#c8b898'); }
      // ---- cabelo
      if (!noHair && !covered) {
        if (front) {
          p(hx0 + 1, hT - 1, hair, hx1 - hx0 - 1, 1); p(hx0, hT, hair, hx1 - hx0 + 1, 1);
          p(hx0 - 1, hT + 1, hair, 1, 3); p(hx1 + 1, hT + 1, hS, 1, 3);
          p(hx0, hT + 1, hair, 3, 1); p(hx0 + 3, hT + 1, hS, hx1 - hx0 - 2, 1); p(hx0, hT + 2, hS); p(hx1, hT + 2, hS);
          p(hx0 + 1, hT - 1, hH, 2, 1); p(hx0, hT, hH); p(hx0 + 2, hT, hH, 2, 1);
          if (hs === 1) { p(hx0 - 1, hT + 1, hair, 1, 7); p(hx1 + 1, hT + 1, hS, 1, 7); p(hx0 - 1, hT + 8, hS); p(hx1 + 1, hT + 8, hD); }
          if (hs === 3) { for (let y = hT - 3; y <= hT; y++) p(9, y, y < hT - 1 ? hH : hair, 2, 1); p(hx0, hT, fM); p(hx1, hT, fS); }
          if (hs === 4) { p(8, hT - 3, hair, 4, 2); p(9, hT - 3, hH, 2, 1); }
        } else {
          for (let y = hT - 1; y <= hB - 1; y++) { const a = y === hT - 1 ? hx0 + 1 : hx0 - 1, w = y === hT - 1 ? hx1 - hx0 - 1 : hx1 - hx0 + 3; p(a, y, y % 3 === 0 ? hS : hair, w, 1); }
          p(hx0 + 1, hT, hH, 3, 1); p(hx0 + 2, hT - 1, hH, 2, 1);
          if (hs === 1) { p(hx0 - 1, hB, hair, hx1 - hx0 + 3, 4); p(hx0, hB + 3, hS, hx1 - hx0 + 1, 1); }
          if (hs === 4) p(8, hT - 3, hair, 4, 2);
          if (hs === 3) p(9, hT - 3, hair, 2, 3);
        }
      } else if (noHair && !covered && !skel && !mum && back) p(hx0, hT, skH, hx1 - hx0 + 1, 1);
      if (hatOk) chapeu();
      if (L.hood) {
        const hc = L.hood, hcS = shade(hc, -0.3), hcH = shade(hc, 0.2);
        p(hx0, hT - 2, hc, hx1 - hx0 + 1, 1); p(hx0 - 1, hT - 1, hc, hx1 - hx0 + 3, 2); p(hx0 - 1, hT + 1, hc, 2, 6); p(hx1, hT + 1, hcS, 2, 6); p(hx0 - 2, hT + 2, hcS, 1, 5); p(hx1 + 2, hT + 2, hcS, 1, 5);
        p(hx0 + 1, hT - 2, hcH, 3, 1);
        if (front) p(hx0 + 1, hT + 1, shade(hc, -0.45), hx1 - hx0 - 1, 1);
        else for (let y = hT; y <= hB + 1; y++) p(hx0 - 1, y, y % 3 ? hc : hcS, hx1 - hx0 + 3, 1);
      }
      if (L.helm) {
        const h = L.helm, hh = shade(h, 0.35), hsd = shade(h, -0.3), a = hx0 - 1, b = hx1 + 1;
        p(hx0, hT - 2, h, hx1 - hx0 + 1, 1); p(a, hT - 1, h, b - a + 1, 3); p(a, hT + 2, h, 1, 3); p(b, hT + 2, hsd, 1, 3);
        p(hx0, hT - 2, hh, 3, 1); p(a, hT - 1, hh, 2, 1); p(a, hT + 1, hsd, b - a + 1, 1);
        if (front) { p(9, hT + 2, h, 2, 2); p(a, hT, '#ffffff'); }
        else for (let y = hT + 2; y < hB; y++) p(hx0, y, y % 2 ? h : hsd, hx1 - hx0 + 1, 1);
        if (L.helmHorns) { const hc = '#ece0c4'; p(a - 1, hT, hc); p(a - 2, hT - 1, hc); p(a - 2, hT - 2, hc); p(b + 1, hT, hc); p(b + 2, hT - 1, hc); p(b + 2, hT - 2, hc); }
        const hst = L.helmStyle;
        if (hst === 'tricorne') { p(a - 2, hT, h, b - a + 5, 2); p(a - 3, hT - 1, h, 2, 2); p(b + 2, hT - 1, h, 2, 2); p(9, hT - 2, h, 2, 2); p(a - 1, hT, '#e0c060', b - a + 3, 1); }
        if (hst === 'shako') { p(hx0, hT - 7, h, hx1 - hx0 + 1, 7); p(hx0, hT - 7, hh, hx1 - hx0 + 1, 1); p(hx0, hT - 2, '#e0c060', hx1 - hx0 + 1, 1); p(a, hT + 1, '#101010', b - a + 1, 1); if (front) p(9, hT - 5, '#e0c060', 2, 2); if (L.plume) { p(9, hT - 10, L.plume, 2, 3); p(10, hT - 11, shade(L.plume, 0.3)); } }
        if (hst === 'bearskin') { for (let y = hT - 9; y <= hT + 1; y++) { const w = y < hT - 7 ? 6 : 8; p(10 - w / 2, y, y % 3 ? '#1a1a1e' : '#2a2a30', w, 1); } p(12, hT - 6, L.plume || '#c02020', 1, 5); if (front) p(hx0, hT + 1, '#e0c060', hx1 - hx0 + 1, 1); }
        if (hst === 'kettle') { p(a - 2, hT + 1, h, b - a + 5, 1); p(a - 2, hT + 2, hsd, b - a + 5, 1); }
        if (hst === 'full' && front) { p(hx0, hT + 2, h, hx1 - hx0 + 1, 5); p(hx0, hT + 2, hh, 1, 5); p(hx1, hT + 2, hsd, 1, 5); p(hx0 + 1, ey, '#101018', hx1 - hx0 - 1, 1); p(9, ey + 2, hsd, 2, 2); p(8, ey + 2, '#101018'); p(11, ey + 2, '#101018'); }
        if (hst === 'spike') { p(9, hT - 5, hsd, 2, 3); p(9, hT - 6, h); p(a - 1, hT, hsd, 1, 2); p(b + 1, hT, hsd, 1, 2); if (front) p(hx0 + 1, ey, '#101018', hx1 - hx0 - 1, 1); }
        if (hst === 'leaf') { p(9, hT - 4, hh, 2, 2); p(8, hT - 3, h, 4, 1); p(a - 1, hT, hh, 2, 1); p(a - 2, hT - 1, hh); p(b, hT, h, 2, 1); p(b + 2, hT - 1, h); }
        if (hst === 'turban') { for (let y = hT - 3; y <= hT + 1; y++) p(a, y, (y % 2) ? h : hh, b - a + 1, 1); p(hx0, hT - 4, h, hx1 - hx0 + 1, 1); if (front) { p(9, hT - 1, '#e02848', 2, 2); p(9, hT - 2, '#f0d060', 2, 1); } }
        if (L.plume) { const pl = L.plume; p(9, hT - 5, pl, 2, 2); p(10, hT - 6, pl, 2, 1); p(11, hT - 7, shade(pl, 0.25), 2, 1); if (back) p(10, hT - 4, pl, 2, 3); }
        if (L.crest) { const cr = L.crest; for (let x = hx0; x <= hx1; x++) p(x, hT - 4 - (x > hx0 + 1 && x < hx1 - 1 ? 1 : 0), x % 2 ? cr : shade(cr, 0.2), 1, 2); }
      }
      if (L.crown) { const g = '#f4c838', gS = '#b08820'; p(hx0, hT - 1, gS, hx1 - hx0 + 1, 1); p(hx0, hT - 2, g, hx1 - hx0 + 1, 1); p(hx0, hT - 3, g); p(9, hT - 3, g, 2, 1); p(hx1, hT - 3, g); p(9, hT - 2, '#e02848', 2, 1); }
    } else {
      // ================= PERFIL (olhando para a direita) =================
      const sx0 = tx0, sx1 = tx1;                       // tronco de lado
      const fx0 = hx0 + 1, fx1 = hx1 + 1;              // cabeça de lado (um pouco para a frente)
      if (L.tail) { const tc = L.tailC || sk, sw = frame === 1 ? -1 : frame === 2 ? 1 : 0; p(sx0 - 1, tB - 1, tc); p(sx0 - 2, tB, tc); p(sx0 - 3, tB + 1 + sw, tc); p(sx0 - 4, tB + sw, shade(tc, -0.2)); }
      if (!noHair && !covered && hs === 1) for (let y = hT + 2; y <= tT + 3; y++) p(fx0 - 1, y, y > tT ? hD : hS, 3, 1);
      if (L.cape) { for (let y = tT; y <= Math.min(footY - 1, tB + 5); y++) p(sx0 - 1 - (y > tB + 2 ? 1 : 0), y, y % 3 ? L.cape : shade(L.cape, -0.15), 2, 1); }
      if (L.shield) p(sx0 - 2, tT + 2, shade(L.shield, -0.25), 2, torsoH - 1);
      // braço de trás
      const swing = frame === 1 ? 1 : frame === 2 ? -1 : 0;
      if (!(skel && !L.body)) { for (let y = tT + 1; y <= tB; y++) p(9 - swing + Math.round((y - tT) * swing * 0.25), y, shade(armC, -0.35)); p(9 - swing * 2, tB + 1, skD); }
      // pernas
      if (!robe) {
        const off = frame === 0 ? [0, 0] : frame === 1 ? [-3, 3] : [3, -3];
        for (let k = 0; k < 2; k++) {
          const tras = k === 0;
          for (let y = legTop; y <= footY; y++) {
            const t = (y - legTop) / Math.max(1, legH - 1);
            const lx = 9 + Math.round(off[k] * t) + (tras ? -1 : 0);
            const bota = y >= footY - (pequeno || anao ? 1 : 2);
            let col = bota ? (tras ? btS : boots) : (tras ? lS : legs);
            if (skel && !L.legs) col = tras ? boneS : bone;
            p(lx, y, col, 2, 1);
            if (!bota && !tras && !(skel && !L.legs)) p(lx + 1, y, lH);
            if (y === footY && !(skel && !L.legs)) p(lx + 2, y, tras ? btS : boots);
            if (y === footY - (pequeno || anao ? 1 : 2) && !tras && !(skel && !L.legs)) p(lx, y, btH, 2, 1);
          }
        }
      }
      // tronco
      if (skel && !L.body) {
        for (let y = tT; y <= tB; y++) { p(9, y, bone); if ((y - tT) % 2 === 0) p(sx0 + 1, y, bone, sx1 - sx0 - 1, 1); }
      } else {
        const bot = robe ? footY - 1 : tB;
        for (let y = tT; y <= bot; y++) {
          const ext = robe && y > tB ? Math.min(2, Math.floor((y - tB + 1) / 3)) : 0, peito = y <= tT + 2 ? 1 : 0;
          for (let x = sx0 - ext; x <= sx1 + ext + peito; x++) {
            let col = body;
            if (x >= sx1 + ext + peito - 1) col = bH; else if (x === sx0 - ext) col = bD; else if (x === sx0 - ext + 1) col = bS;
            if (L.zombie && ((x * 7 + y * 3) % 9 === 0)) col = bD;
            p(x, y, col); band(x, y);
          }
        }
        if (robe) { p(sx0 + 1, footY, boots, 4, 1); p(sx1, tT + 1, L.trim || shade(body, 0.4), 1, footY - tT - 1); if (L.sash) p(sx0, tB - 2, L.sash, sx1 - sx0 + 1, 1); }
        else if (!mum && !L.fur && !L.nobelt) { p(sx0, tB, '#3a2416', sx1 - sx0 + 1, 1); p(sx1, tB, '#e0b848'); }
        if (L.chestplate) p(sx1 - 1, tT + 1, shade(body, 0.35), 2, 3);
        if (L.tabard && !robe) for (let y = tT + 1; y <= tB + 3; y++) p(sx1, y, L.tabard, 2, 1);
        if (L.crossbelt && !robe) for (let k = 0; k < torsoH; k++) p(sx0 + 1 + Math.floor(k * (sx1 - sx0) / torsoH), tT + k, '#f0ece0');
        if (det && !L.tabard && !L.chestplate) {
          if (L.vest && !robe) for (let y = tT; y < tB; y++) { p(sx0, y, shade(L.vest, -0.3), 3, 1); p(sx1, y, L.shirt || '#e8dcc0', 2, 1); p(sx1 - 1, y, L.vest); }
          else if (L.stripes && !robe) for (let y = tT + 1; y < tB; y += 2) p(sx0 + 1, y, shade(body, 0.24), sx1 - sx0, 1);
          if (L.scarf) { p(sx0 + 1, tT, L.scarf, sx1 - sx0 + 1, 1); p(sx0 - 1, tT + 1, shade(L.scarf, -0.2), 1, 3); }
          if (L.apron) { for (let y = tT + 3; y <= (robe ? footY - 3 : tB + 4); y++) p(sx1 + 1, y, L.apron, robe ? 2 : 1, 1); p(sx1, tT, shade(L.apron, -0.15), 1, 3); }
          if (L.pouch && !robe) p(sx1, tB, '#6a3e1c', 1, 2);
          if (L.bag) { for (let k = 0; k < torsoH; k++) p(sx1 - Math.floor(k * (sx1 - sx0) / torsoH), tT + k, '#4a2e18'); p(sx0 - 2, tB - 1, L.bag, 3, 3); p(sx0 - 2, tB - 1, shade(L.bag, 0.2), 3, 1); }
        }
      }
      if (neck) p(10, tT - 1, skel ? bone : skS, 2, 1);
      // cabeça
      for (let y = hT; y <= hB; y++) for (let x = fx0; x <= fx1; x++) {
        if ((y === hT || y === hB) && (x === fx0 || x === fx1)) continue;
        let col = skel ? bone : sk; if (y === hB || x === fx0) col = skel ? boneS : fM;
        p(x, y, col); band(x, y);
      }
      if (!skel && !L.snout) { p(fx1 + 1, ey + 1, sk); p(fx1 + 1, ey + 2, fM); }   // nariz
      if (skel) { p(fx1 - 1, ey, '#1a1010', 2, 2); p(fx1, ey, eyeC); p(fx1, hB - 1, '#4a4034'); }
      else {
        p(fx1 - 1, ey, eyeC);
        if (escura) p(fx1, ey, mix('#f0ece4', sk, 0.35));
        if (!L.snout && !L.muzzle && !L.beard) p(fx1, ey + 2, boca);
        if (L.blush || L.child || pequeno || L.fem) p(fx1 - 1, ey + 1, mix(sk, '#ff6878', 0.2));
      }
      if (L.snout) { p(fx1, hT + 3, sk, 3, 3); p(fx1 + 2, hT + 3, skD); p(fx1, hT + 5, skS, 3, 1); }
      if (L.muzzle) { p(fx1 + 1, ey + 1, '#e07888'); p(fx1, ey + 2, skH, 2, 1); }
      if (L.tusks) { p(fx1, hB - 1, '#f4f0e0'); p(fx1, hB, '#f4f0e0'); }
      if (L.ears === 'elf') { p(fx0 + 1, ey, sk); p(fx0, ey - 1, sk); p(fx0 - 1, ey - 2, skH); p(fx0 - 2, ey - 3, skH); }
      else if (L.ears === 'goblin') { p(fx0, ey - 1, sk); p(fx0 - 2, ey - 1, sk, 2, 1); p(fx0 - 3, ey - 2, sk); }
      else if (!covered && !L.catears) p(fx0 + 2, ey, skS, 1, 2);
      if (L.catears) { p(fx0 + 2, hT - 1, hair, 2, 1); p(fx0 + 2, hT - 2, hair); p(fx0 + 3, hT - 1, '#f0a0b0'); }
      if (L.horns) { p(fx0 + 2, hT - 1, '#ece0c4'); p(fx0 + 1, hT - 2, '#ece0c4'); p(fx0, hT - 3, '#c8b898'); }
      if (L.beard && !skel) { const bc = L.beardC || hair; p(fx0 + 2, ey + 1, bc, fx1 - fx0 - 1, hB - ey + 1); p(fx0 + 3, hB + 1, bc, 3, 1); if (anao || L.short >= 2) p(fx0 + 3, hB + 2, shade(bc, -0.25), 2, 3); }
      if (!noHair && !covered) {
        p(fx0 + 1, hT - 1, hair, fx1 - fx0 - 1, 1); p(fx0, hT, hair, fx1 - fx0 + 1, 1); p(fx0, hT + 1, hair, fx1 - fx0, 1); p(fx0 - 1, hT + 1, hair, 1, 4); p(fx0, hT + 2, hair, 3, 2); p(fx0, hT + 4, hS, 2, 2);
        p(fx1 - 1, hT + 2, hair, 2, 1); p(fx0 + 2, hT - 1, hH, 3, 1); p(fx0 + 1, hT, hH, 2, 1);
        if (hs === 1) { p(fx0 - 1, hT + 1, hair, 2, 9); p(fx0, hT + 7, hS, 1, 3); }
        if (hs === 3) { p(fx0 + 2, hT - 3, hair, 3, 2); p(fx0 + 3, hT - 3, hH); }
        if (hs === 4) p(fx0 - 1, hT - 2, hair, 3, 3);
      }
      if (hatOk) chapeu();
      if (L.hood) { const hc = L.hood; p(fx0 + 1, hT - 2, hc, fx1 - fx0, 1); p(fx0 - 1, hT - 1, hc, fx1 - fx0 + 2, 2); p(fx0 - 1, hT + 1, hc, 3, 7); p(fx1, hT + 1, shade(hc, -0.3), 1, 2); p(fx0 - 2, hT + 2, shade(hc, -0.3), 1, 6); }
      if (L.helm) {
        const h = L.helm, hd = shade(h, -0.3);
        p(fx0 + 1, hT - 2, h, fx1 - fx0, 1); p(fx0 - 1, hT - 1, h, fx1 - fx0 + 2, 3); p(fx0 - 1, hT + 2, h, 3, 4); p(fx1, hT + 2, h, 1, 2); p(fx0 + 1, hT - 2, shade(h, 0.35), 3, 1); p(fx0 - 1, hT + 1, hd, fx1 - fx0 + 2, 1);
        if (L.helmHorns) { p(fx0, hT - 2, '#ece0c4'); p(fx0 - 1, hT - 3, '#ece0c4'); }
        const hst = L.helmStyle;
        if (hst === 'kettle') p(fx0 - 2, hT + 1, h, fx1 - fx0 + 5, 1);
        if (hst === 'tricorne') { p(fx0 - 2, hT, h, fx1 - fx0 + 5, 2); p(fx0 - 3, hT - 1, h, 2, 2); p(fx1 + 2, hT - 1, h, 2, 2); }
        if (hst === 'shako') { p(fx0, hT - 7, h, fx1 - fx0 + 1, 7); p(fx0, hT - 2, '#e0c060', fx1 - fx0 + 1, 1); p(fx1, hT + 1, '#101010', 3, 1); if (L.plume) p(fx0 + 2, hT - 10, L.plume, 2, 3); }
        if (hst === 'bearskin') for (let y = hT - 9; y <= hT + 1; y++) p(y < hT - 7 ? fx0 + 1 : fx0 - 1, y, '#1a1a1e', y < hT - 7 ? 5 : 8, 1);
        if (hst === 'full') { p(fx0 + 2, hT + 2, h, fx1 - fx0 - 1, 5); p(fx0 + 3, ey, '#101018', fx1 - fx0 - 2, 1); }
        if (hst === 'spike') p(fx0 + 3, hT - 5, hd, 2, 3);
        if (hst === 'leaf') { p(fx0 + 3, hT - 4, shade(h, 0.3), 2, 2); p(fx0 - 2, hT, shade(h, 0.3), 2, 1); }
        if (hst === 'turban') for (let y = hT - 3; y <= hT + 1; y++) p(fx0 - 1, y, y % 2 ? h : shade(h, 0.3), fx1 - fx0 + 2, 1);
        if (L.plume) { p(fx0 + 2, hT - 5, L.plume, 2, 2); p(fx0, hT - 6, L.plume, 3, 1); p(fx0 - 1, hT - 5, L.plume, 1, 2); }
        if (L.crest) { p(fx0, hT - 4, L.crest, fx1 - fx0 + 1, 1); p(fx0 + 1, hT - 5, L.crest, fx1 - fx0 - 1, 1); }
      }
      if (L.crown) { const g = '#f4c838'; p(fx0, hT - 2, g, fx1 - fx0 + 1, 1); p(fx0, hT - 3, g); p(fx0 + 3, hT - 3, g); p(fx1, hT - 3, g); p(fx0 + 3, hT - 2, '#e02848'); }
      // braço da frente
      const ax = 10 - swing;
      for (let y = tT + 1; y <= tB; y++) p(ax + Math.round((y - tT) * -swing * 0.25), y, skel && !L.body ? bone : (y === tT + 1 ? armH : armC), 2, 1);
      const hxs = ax + Math.round((tB + 1 - tT) * -swing * 0.25);
      p(hxs, tB + 1, skel ? bone : sk, 2, 1); p(hxs, tB + 2, skel ? boneS : skS, 2, 1);
      if (L.pauldron) { p(ax - 1, tT, L.pauldron, 4, 2); p(ax - 1, tT, shade(L.pauldron, 0.35), 3, 1); }
      if (det && L.cane) { p(hxs + 2, tB + 1, '#5a3a20'); p(hxs + 2, tB + 2, '#7a5030', 1, footY - tB - 1); }
    }
    if (G && typeof Racas !== 'undefined') Racas.drawFront(p, L, dir, G);
    // feminino: cílios e lábios para dar para distinguir homens e mulheres
    if (L.fem && !skel && !covered) {
      const lab = mix(sk, L.lips && L.lips !== shade(sk, -0.35) ? L.lips : '#c04a5a', 0.55);
      if (front) { if (!L.snout && !L.muzzle) p(9, ey + 2, lab, 2, 1); }
      else if (side && !L.snout && !L.muzzle) p(hx1 + 1, ey + 2, lab);
    }
    S.outlineSel(c);
    if (L.misty) { const x = c.getContext('2d'); x.globalCompositeOperation = 'destination-in'; x.fillStyle = 'rgba(0,0,0,0.78)'; x.fillRect(0, 0, W, H); x.globalCompositeOperation = 'source-over'; }
    c.handY = footY - tB - 1;   // altura da mão (para desenhar a arma)
    return c;
  }
  S.humanoid = humanoid;

  // ---------- CRIATURAS (perfil voltado à direita) ----------
  function quad(L, frame) {
    const k = L.k;
    const col = L.c || '#7a7a82';
    const hi = shade(col, 0.2), sh = shade(col, -0.25), belly = shade(col, 0.35), dk = shade(col, -0.45);
    let c;
    const legs = (p, xs, top, len, w, fr) => {
      xs.forEach((x, i) => {
        const ph = (i % 2 === 0) ? fr : (fr === 1 ? 2 : fr === 2 ? 1 : 0);
        const off = ph === 1 ? -1 : ph === 2 ? 1 : 0;
        for (let y = 0; y < len; y++) p(x + (y > len / 2 ? off : 0), top + y, i < 2 ? sh : col, w, 1);
      });
    };
    if (k === 'wolf') {
      c = cv(22, 16); const p = P(c.getContext('2d'));
      legs(p, [5, 7, 13, 15], 10, 5, 2, frame);
      ellipse(p, 10, 8, 7, 3.2, col); p(5, 6, hi, 10, 1); p(6, 10, belly, 8, 1);
      p(15, 3, col, 4, 5); p(18, 5, col, 3, 2); p(20, 6, dk); p(16, 1, col, 1, 2); p(18, 1, col, 1, 2); p(17, 4, '#ffe040');
      p(1, 5 + (frame === 1 ? -1 : 0), col, 4, 2); p(0, 4 + (frame === 1 ? -1 : 0), hi, 2, 2);
      if (L.ghostly) { const x = c.getContext('2d'); x.globalCompositeOperation = 'source-atop'; x.fillStyle = 'rgba(160,220,255,0.35)'; x.fillRect(0, 0, 22, 16); }
    } else if (k === 'bear') {
      c = cv(24, 18); const p = P(c.getContext('2d'));
      legs(p, [4, 7, 14, 17], 12, 5, 3, frame);
      ellipse(p, 11, 9, 9, 5, col); p(4, 5, hi, 12, 1);
      ellipse(p, 19, 7, 4, 3.5, col); p(22, 8, dk, 2, 2); p(16, 3, col, 2, 2); p(20, 3, col, 2, 2); p(20, 6, '#1a1010');
    } else if (k === 'boar') {
      c = cv(22, 15); const p = P(c.getContext('2d'));
      legs(p, [5, 7, 13, 15], 10, 4, 2, frame);
      ellipse(p, 10, 8, 7.5, 3.8, col); for (let x = 4; x < 15; x += 2) p(x, 4, dk, 1, 2);
      p(16, 6, col, 4, 5); p(20, 8, '#d08080', 2, 3); p(19, 10, '#f0f0e0', 1, 2); p(18, 7, '#1a1010'); p(16, 5, sh, 2, 1);
      p(2, 6, col, 2, 1);
    } else if (k === 'deer') {
      c = cv(20, 20); const p = P(c.getContext('2d'));
      const cc = '#a8784a';
      legs(p, [5, 6, 12, 13], 12, 7, 1, frame);
      ellipse(p, 9, 10, 6, 3, cc); p(5, 12, '#e8d8c0', 7, 1);
      p(13, 4, cc, 2, 6); p(13, 2, cc, 4, 3); p(17, 3, '#3a2a1a'); p(15, 3, '#1a1010');
      p(12, 0, '#d8c8a0', 1, 2); p(11, 0, '#d8c8a0'); p(15, 0, '#d8c8a0', 1, 2); p(16, 0, '#d8c8a0');
      p(3, 8, '#f0f0f0', 2, 2);
    } else if (k === 'rabbit') {
      c = cv(12, 11); const p = P(c.getContext('2d'));
      const cc = '#b0a090';
      ellipse(p, 5, 7, 4, 3, cc); ellipse(p, 9, 5, 2.5, 2, cc); p(8, 0, cc, 1, 4); p(10, 1, cc, 1, 3); p(10, 5, '#1a1010'); p(1, 6, '#ffffff', 2, 2);
      if (frame === 1) { p(2, 9, cc, 2, 2); p(7, 9, cc, 2, 1); } else { p(3, 10, cc, 2, 1); p(6, 10, cc, 2, 1); }
    } else if (k === 'lizard') {
      c = cv(24, 14); const p = P(c.getContext('2d'));
      legs(p, [6, 8, 14, 16], 10, 3, 2, frame);
      ellipse(p, 11, 8, 7, 2.6, col); p(5, 6, hi, 12, 1); p(6, 9, belly, 9, 1);
      p(17, 6, col, 5, 4); p(21, 8, col, 2, 2); p(19, 6, '#ffe040'); p(22, 9, dk);
      for (let i = 0; i < 5; i++) p(4 - i, 8 + (i > 2 ? 1 : 0) + (frame === 1 && i > 2 ? -1 : 0), i < 3 ? col : sh, 1, 2);
      for (let x = 6; x < 16; x += 3) p(x, 5, dk);
    } else if (k === 'spider') {
      const s = L.size || 1;
      c = cv(20, 14); const p = P(c.getContext('2d'));
      for (let i = 0; i < 4; i++) {
        const ph = (i + frame) % 2;
        const bx = 7 + i * 2;
        p(bx - 3, 4 + ph, dk, 1, 3); p(bx - 4, 7 + ph, dk, 1, 5); p(bx + 3, 4 + ph, dk, 1, 3); p(bx + 4, 7 + ph, dk, 1, 5);
        p(bx - 3, 4 + ph, dk, 3, 1); p(bx + 1, 4 + ph, dk, 3, 1);
      }
      ellipse(p, 6, 7, 5, 4.2, col); p(3, 5, hi, 4, 1); p(5, 7, '#c03030', 2, 2);
      ellipse(p, 13, 8, 3.5, 3, sh); p(15, 7, '#ff3030'); p(15, 9, '#ff3030'); p(16, 8, '#ff3030');
    } else if (k === 'scorpion') {
      c = cv(22, 16); const p = P(c.getContext('2d'));
      for (let i = 0; i < 3; i++) { const ph = (i + frame) % 2; p(7 + i * 3, 12 + ph, dk, 1, 3); p(8 + i * 3, 14, dk, 1, 1); }
      ellipse(p, 10, 11, 6, 2.6, col); for (let x = 5; x < 16; x += 3) p(x, 9, sh, 1, 5);
      p(16, 10, col, 3, 2); p(19, 8, col, 3, 2); p(19, 12, col, 3, 2); p(21, 8, hi); p(21, 12, hi);
      const tailUp = frame === 2 ? 1 : 0;
      p(3, 9, col, 2, 2); p(2, 6, col, 2, 3); p(3, 3 + tailUp, col, 2, 3); p(5, 2 + tailUp, col, 3, 2); p(8, 3 + tailUp, '#e0e060', 2, 2);
    }
    outline(c);
    if (L.size && L.size !== 1) c = S.scale(c, L.size);
    return c;
  }
  function slime(L, frame) {
    const col = L.c || '#50c050';
    const c = cv(16, 13), p = P(c.getContext('2d'));
    const sq = frame === 1 ? 1 : 0;
    ellipse(p, 8, 8 + sq * 0.5, 7 + sq, 5 - sq, col);
    ellipse(p, 8, 7, 5, 3, shade(col, 0.15)); p(4, 5, shade(col, 0.6), 2, 2); p(5, 9, '#1a1a1a'); p(10, 9, '#1a1a1a'); p(1, 12, shade(col, -0.3), 14, 1);
    outline(c);
    return L.size ? S.scale(c, L.size) : c;
  }
  function bat(L, frame) {
    const col = L.c || '#4a3a4a';
    const c = cv(18, 12), p = P(c.getContext('2d'));
    ellipse(p, 9, 6, 2.5, 3, col); p(8, 2, col, 1, 2); p(10, 2, col, 1, 2); p(8, 5, '#ff3030'); p(10, 5, '#ff3030');
    if (frame === 1) { for (let i = 0; i < 6; i++) { p(6 - i, 5 - Math.floor(i / 2), col, 1, 2); p(12 + i, 5 - Math.floor(i / 2), col, 1, 2); } }
    else { for (let i = 0; i < 6; i++) { p(6 - i, 6 + Math.floor(i / 2), col, 1, 2); p(12 + i, 6 + Math.floor(i / 2), col, 1, 2); } }
    outline(c); return c;
  }
  function ghost(L, frame) {
    const col = L.c || '#a0e8e0';
    const c = cv(16, 20), x = c.getContext('2d'), p = P(x);
    x.globalAlpha = 0.85;
    ellipse(p, 8, 7, 5, 5.5, col); p(3, 7, col, 10, 7);
    for (let i = 0; i < 5; i++) p(3 + i * 2, 14 + ((i + frame) % 2), col, 2, 2 + ((i + frame) % 2));
    p(4, 4, shade(col, 0.4), 3, 3);
    x.globalAlpha = 1;
    p(5, 6, '#102030', 2, 3); p(9, 6, '#102030', 2, 3); p(5, 7, '#40f0ff'); p(9, 7, '#40f0ff');
    p(1, 9 + frame, col, 2, 3); p(13, 9 + (1 - frame), col, 2, 3);
    outline(c, '#1a3a40'); return c;
  }
  function golem(L, frame) {
    const col = L.c || '#8a8580';
    const c = cv(20, 22), p = P(c.getContext('2d'));
    const hi = shade(col, 0.25), sh = shade(col, -0.3);
    const lo = frame === 1 ? 1 : 0, ro = frame === 2 ? 1 : 0;
    p(5, 16, sh, 4, 6 - lo); p(11, 16, sh, 4, 6 - ro);
    p(3, 6, col, 14, 11); p(3, 6, hi, 14, 2); p(15, 8, sh, 2, 9);
    p(0, 7 + lo, col, 3, 10); p(17, 7 + ro, col, 3, 10); p(0, 16 + lo, sh, 3, 2); p(17, 16 + ro, sh, 3, 2);
    p(7, 1, col, 6, 5); p(7, 1, hi, 6, 1); p(8, 3, L.rune ? '#60e0ff' : '#ffb030', 1, 1); p(11, 3, L.rune ? '#60e0ff' : '#ffb030', 1, 1);
    if (L.rune) { p(8, 9, '#60e0ff', 4, 1); p(9, 8, '#60e0ff', 2, 4); p(5, 12, '#60e0ff'); p(14, 12, '#60e0ff'); }
    else { p(6, 10, sh, 3, 2); p(12, 12, sh, 2, 2); }
    outline(c);
    return L.size ? S.scale(c, L.size) : c;
  }
  function elemental(L, frame) {
    const col = L.c || '#ff7020';
    const c = cv(16, 22), p = P(c.getContext('2d'));
    const hi = shade(col, 0.5), core = '#fff8d0';
    for (let y = 0; y < 22; y++) {
      const w = Math.round(Math.sin(y / 22 * Math.PI) * 6 + 1 + Math.sin(y * 0.9 + frame * 2) * 1);
      p(8 - w, y, col, w * 2, 1);
    }
    for (let y = 5; y < 18; y++) { const w = Math.round(Math.sin((y - 5) / 13 * Math.PI) * 3); p(8 - w, y, hi, w * 2, 1); }
    p(7, 10, core, 2, 4); p(5, 7, '#1a0a00', 2, 2); p(9, 7, '#1a0a00', 2, 2);
    p(1 + frame, 3, hi); p(14 - frame, 5, hi); p(3, 1, col);
    outline(c, shade(col, -0.6));
    return L.size ? S.scale(c, L.size) : c;
  }
  function dragon(L, frame) {
    const col = L.c || '#7a2a2a';
    const hi = shade(col, 0.25), sh = shade(col, -0.3), belly = mix(col, '#e0c080', 0.5), dk = shade(col, -0.5);
    const glow = L.glow || '#ffb030';
    const c = cv(56, 40), p = P(c.getContext('2d'));
    const r = new RNG(7);
    // asa traseira
    const wing = (ox, up, cc) => {
      const wy = up ? -6 : 4;
      for (let i = 0; i < 18; i++) {
        const x = ox + i, top = 12 + wy * (1 - i / 18) - (up ? i * 0.4 : -i * 0.2);
        for (let y = Math.round(top); y < 18 - i * 0.2; y++) p(x, y, (i % 5 === 0) ? dk : cc);
      }
    };
    wing(14, frame === 0, sh);
    // cauda
    for (let i = 0; i < 16; i++) { const y = 22 + Math.round(Math.sin(i / 3 + frame) * 2); p(i, y, i < 4 ? sh : col, 2, Math.max(1, 3 - i / 6)); }
    p(0, 21, glow, 2, 2);
    // corpo
    ellipse(p, 26, 22, 12, 7, col); ellipse(p, 26, 25, 9, 3, belly); p(16, 17, hi, 18, 1);
    for (let x = 16; x < 36; x += 3) p(x, 15, dk, 2, 2);
    // pernas
    const lo = frame ? 1 : 0;
    p(19, 27, sh, 4, 7 - lo); p(30, 27, col, 4, 7 + lo - 1); p(18, 33 - lo, dk, 6, 1); p(29, 33, dk, 6, 1);
    // pescoço e cabeça(s)
    const heads = L.heads || 1;
    for (let h = 0; h < heads; h++) {
      const hy = heads > 1 ? -6 + h * 6 : 0, hx = heads > 1 ? -h * 2 : 0;
      for (let i = 0; i < 8; i++) p(34 + i + hx, 18 - i + hy, col, 4, 4);
      const hxx = 42 + hx, hyy = 7 + hy;
      p(hxx, hyy, col, 8, 6); p(hxx + 8, hyy + 2, col, 5, 4); p(hxx + 1, hyy, hi, 6, 1);
      p(hxx + 9, hyy + 5, dk, 4, 1); p(hxx + 4, hyy + 2, glow, 2, 1);
      p(hxx, hyy - 3, '#e8dcc0', 1, 3); p(hxx - 1, hyy - 4, '#e8dcc0'); p(hxx + 3, hyy - 2, '#e8dcc0', 1, 2);
      p(hxx + 12, hyy + 3, dk);
    }
    // asa frontal
    wing(20, frame === 0, col);
    for (let i = 0; i < 5; i++) p(r.int(16, 36), r.int(18, 26), hi);
    S.outline(c);
    return L.size ? S.scale(c, L.size) : c;
  }

  // caches com limite: o usado por último vai para o fim, e os esquecidos há mais tempo saem primeiro
  // (cada sprite guardado é uma imagem na memória do celular; sem limite elas se acumulavam aos milhares)
  function lruGet(map, key) { const v = map.get(key); if (v !== undefined) { map.delete(key); map.set(key, v); } return v; }
  function lruTrim(map, max) { while (map.size > max) map.delete(map.keys().next().value); }
  // Cache de sprites de atores: retorna {down:[3], up:[3], right:[3], left:[3]} ou {right:[2],left:[2]}
  // altura visível (do pé até o pixel mais alto), para nomes, barras e números flutuarem logo acima da cabeça
  function altura(c) { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) if (d[(y * c.width + x) * 4 + 3]) return c.height - y; return c.height; }
  const actorCache = new Map();
  S.actor = function (L) {
    if (L.k === 'sombra') return Sombra.sheet();
    if (L.k === 'nyxar') return Nyxar.sheet(L);
    if (L.k === 'raca') return S.actor(Racas.fromLegacy(L));   // saves antigos (arte recortada)
    const key = JSON.stringify(L);
    let s = lruGet(actorCache, key);
    if (s) return s;
    lruTrim(actorCache, 220);
    if (L.k === 'hum') {
      const sc = L.size || 1;
      const mkf = (d, f) => { let c = humanoid(L, d, f); const hy = c.handY; if (sc !== 1) c = S.scale(c, sc); c.handY = hy * sc; return c; };
      s = { type: 'hum', down: [0, 1, 2].map(f => mkf('down', f)), up: [0, 1, 2].map(f => mkf('up', f)), right: [0, 1, 2].map(f => mkf('side', f)) };
      s.left = s.right.map(flip);
      s.w = s.down[0].width; s.h = altura(s.down[0]); s.handY = s.down[0].handY;
    } else {
      let fn;
      switch (L.k) {
        case 'slime': fn = slime; break; case 'bat': fn = bat; break; case 'ghost': fn = ghost; break;
        case 'golem': fn = golem; break; case 'elemental': fn = elemental; break; case 'dragon': fn = dragon; break;
        default: fn = quad;
      }
      const right = [0, 1, 2].map(f => fn(L, f));
      s = { type: 'side', right, left: right.map(flip) };
      s.w = right[0].width; s.h = right[0].height;
    }
    s.white = {};
    actorCache.set(key, s);
    return s;
  };
  S.cacheStats = () => ({ atores: actorCache.size, quadros: [...actorCache.values()].reduce((n, s) => n + ['down', 'up', 'left', 'right'].reduce((m, d) => m + (s[d] ? s[d].length : 0), 0) + Object.keys(s.white).length, 0), construcoes: bCache.size, armas: wCache.size, objetos: S.objCount(), icones: S.iconCount() });
  S.actorWhite = function (s, dirKey, f) {
    const k = dirKey + f;
    if (!s.white[k]) s.white[k] = S.whiteMask(s[dirKey][f]);
    return s.white[k];
  };

  // ---------- ARMAS (apontando para direita, empunhadura em (3,8)) ----------
  const wCache = new Map();
  S.weapon = function (wclass, col, glow) {
    const k = wclass + col + (glow || '');
    let c = wCache.get(k);
    if (c) return c;
    c = cv(wclass === 'musketb' ? 27 : 20, 16); const p = P(c.getContext('2d'));
    const hi = shade(col, 0.4), sh = shade(col, -0.3), wood = '#6a4424', gold = '#d8a838';
    switch (wclass) {
      case 'sword': p(0, 7, wood, 4, 2); p(4, 5, gold, 1, 6); p(5, 7, col, 10, 2); p(5, 7, hi, 10, 1); p(15, 7, col, 1, 1); break;
      case 'dagger': p(0, 7, wood, 4, 2); p(4, 6, gold, 1, 4); p(5, 7, col, 6, 2); p(5, 7, hi, 6, 1); p(11, 7, col); break;
      case 'great': p(0, 7, wood, 5, 2); p(5, 4, gold, 2, 8); p(7, 6, col, 12, 4); p(7, 6, hi, 12, 1); p(7, 9, sh, 12, 1); p(19, 7, col, 1, 2); break;
      case 'axe': p(0, 7, wood, 13, 2); p(10, 2, col, 4, 11); p(14, 3, col, 1, 9); p(14, 3, hi, 1, 9); p(10, 2, hi, 4, 1); break;
      case 'mace': p(0, 7, wood, 11, 2); S.ellipse(p, 13, 8, 3.5, 3.5, col); p(12, 6, hi, 2, 2); p(13, 3, col); p(17, 8, col); p(13, 12, col); break;
      case 'hammer': p(0, 7, wood, 12, 2); p(11, 2, col, 6, 12); p(11, 2, hi, 6, 1); p(16, 2, sh, 1, 12); break;
      case 'bow': for (let y = 0; y < 16; y++) { const x = 2 + Math.round(Math.sin(y / 15 * Math.PI) * 5); p(x, y, col, 2, 1); } p(2, 0, '#e8e8e0', 1, 16); break;
      case 'musket': p(0, 7, wood, 7, 3); p(0, 9, shade(wood, -0.3), 4, 1); p(6, 7, '#3a3a40', 13, 2); p(6, 7, '#6a6a74', 13, 1); p(9, 9, '#c0a040', 2, 1); p(13, 6, glow || '#80c0ff', 2, 1); p(18, 6, '#a0a0a8', 2, 1); break;
      case 'musketb': p(0, 7, wood, 7, 3); p(0, 9, shade(wood, -0.3), 4, 1); p(6, 7, '#3a3a40', 13, 2); p(6, 7, '#6a6a74', 13, 1); p(9, 9, '#c0a040', 2, 1); p(13, 6, glow || '#80c0ff', 2, 1); p(18, 6, '#a0a0a8', 2, 1); p(18, 9, '#5a5a62', 2, 1); p(19, 9, '#c8ccd4', 7, 1); p(19, 10, '#8a8e96', 6, 1); p(26, 9, '#e8ecf4'); break;
      case 'pistol': p(2, 8, wood, 4, 4); p(5, 7, '#3a3a40', 8, 2); p(5, 7, '#6a6a74', 8, 1); p(6, 9, '#c0a040', 1, 2); p(9, 6, glow || '#80c0ff', 2, 1); break;
      case 'spear': p(0, 7, wood, 16, 1); p(0, 8, shade(wood, -0.25), 16, 1); p(16, 6, col, 2, 4); p(18, 7, col, 2, 2); p(16, 6, hi, 2, 1); p(14, 6, '#c03030', 1, 4); break;
      case 'staff': p(0, 7, col, 15, 2); p(0, 7, shade(col, 0.2), 15, 1); S.ellipse(p, 16.5, 8, 2.8, 2.8, glow || '#60a0ff'); p(15, 7, '#ffffff'); break;
    }
    outline(c);
    wCache.set(k, c);
    return c;
  };

  // ---------- CONSTRUÇÕES ----------
  const bCache = new Map();
  S.building = function (spec) {
    const key = JSON.stringify(spec);
    let c = lruGet(bCache, key);
    if (c) return c;
    c = makeBuilding(spec);
    bCache.set(key, c); lruTrim(bCache, 160);
    return c;
  };
  S.extraBuilding = {};
  S.drawSignIcon = (p, x, y, k) => drawSignIcon(p, x, y, k);
  function makeBuilding(sp) {
    if (S.extraBuilding[sp.style]) return S.extraBuilding[sp.style](sp);
    const W = sp.w * 16, FH = sp.h * 16;
    const extra = sp.type === 'castle' || sp.type === 'palace' ? 30 : sp.type === 'tower' ? 34 : sp.type === 'temple' ? 18 : sp.type === 'factory' ? 40 : sp.style === 'brick' ? 20 : 14;
    const H = FH + extra;
    const c = cv(W + 2, H + 1), ctx = c.getContext('2d'), p = P(ctx);
    const r = new RNG(sp.seed || 1);
    const style = sp.style || 'timber';
    const roofC = sp.roof || '#a03a2a', wallC = sp.wall || '#e8dcc0';
    const rhi = shade(roofC, 0.2), rsh = shade(roofC, -0.3), rdk = shade(roofC, -0.5);
    const whi = shade(wallC, 0.12), wsh = shade(wallC, -0.2), wdk = shade(wallC, -0.4);
    const wallH = sp.style === 'brick' || sp.type === 'factory' ? Math.max(20, Math.min(36, Math.round(FH * 0.78))) : Math.max(14, Math.min(26, Math.round(FH * 0.55)));
    const wallTop = H - wallH;
    const ox = 1;
    const doorW = sp.type === 'castle' ? 12 : sp.type === 'palace' || sp.type === 'temple' || sp.type === 'guildhall' || sp.type === 'heroes' ? 10 : 8;
    const doorH = sp.type === 'castle' ? 16 : 12;
    const doorX = ox + Math.floor(W / 2) - Math.floor(doorW / 2);
    // ---- PAREDES
    const wallRect = (x, y, w, h) => {
      if (style === 'brick') {
        // tijolos aparentes com argamassa, cantos de pedra e faixa entre os andares
        p(x, y, shade(wallC, -0.25), w, h);
        for (let yy = 0; yy < h; yy += 3) { const off = (yy / 3) % 2 ? 3 : 0; for (let xx = -off; xx < w; xx += 6) { const sx = Math.max(0, xx), sw = Math.min(5, w - sx, xx + 5 - sx); if (sw > 0) p(x + sx, y + yy, shade(wallC, (r.next() - 0.5) * 0.14), sw, 2); } }
        for (let yy = 0; yy < h; yy += 4) { p(x, y + yy, '#d8d0c0', 3, 3); p(x + w - 3, y + yy, '#c8c0b0', 3, 3); }
        if (h > 22) { p(x, y + Math.floor(h / 2) - 1, '#d8d0c0', w, 2); p(x, y + Math.floor(h / 2) + 1, '#a09888', w, 1); }
      } else if (style === 'stone' || style === 'castle') {
        p(x, y, wallC, w, h);
        for (let yy = 0; yy < h; yy += 4) { const off = (yy / 4) % 2 * 4; p(x, y + yy, wdk, w, 1); for (let xx = -off; xx < w; xx += 8) if (xx >= 0) p(x + xx, y + yy, wdk, 1, 4); }
      } else if (style === 'log') {
        for (let yy = 0; yy < h; yy += 3) { p(x, y + yy, wallC, w, 3); p(x, y + yy, whi, w, 1); p(x, y + yy + 2, wdk, w, 1); }
      } else if (style === 'adobe') {
        p(x, y, wallC, w, h); for (let i = 0; i < w * h / 30; i++) p(x + r.int(0, w - 2), y + r.int(0, h - 1), wsh, 2, 1);
      } else if (style === 'stilt') {
        for (let xx = 0; xx < w; xx += 3) { p(x + xx, y, wallC, 3, h - 4); p(x + xx, y, whi, 1, h - 4); }
        p(x, y + h - 4, '#3a2a1a', w, 4); for (let xx = 2; xx < w; xx += 8) p(x + xx, y + h - 4, '#5a4020', 2, 4);
      } else if (style === 'elven') {
        p(x, y, wallC, w, h); p(x, y, whi, w, 1); for (let xx = 0; xx < w; xx += 12) p(x + xx, y, '#b0c8c0', 2, h);
      } else if (style === 'round') {
        p(x, y, wallC, w, h); for (let xx = 0; xx < w; xx += 6) p(x + xx, y + 2, wsh, 1, h - 3);
      } else {
        // timber
        p(x, y, wallC, w, h);
        const beam = '#5a3a20';
        p(x, y, beam, w, 2); p(x, y + Math.floor(h / 2), beam, w, 1); p(x, y + h - 2, beam, w, 2);
        for (let xx = 0; xx < w; xx += 12) { p(x + xx, y, beam, 2, h); }
        p(x + w - 2, y, beam, 2, h);
        for (let xx = 0; xx + 12 <= w; xx += 12) { for (let i = 0; i < Math.floor(h / 2) - 1; i++) p(x + xx + 2 + i * 10 / (h / 2), y + 2 + i, beam); }
      }
    };
    const shutC = r.pick(['#3a5a8a', '#2a6a4a', '#8a3a2a', '#5a4a3a', '#6a4a7a']);
    const homey = style === 'timber' || style === 'stone' || style === 'log' || style === 'round';
    const window = (x, y, w = 5, h = 5, lit) => {
      p(x - 1, y - 1, '#3a2a1a', w + 2, h + 2);
      if (lit) { p(x, y, lit, w, h); p(x, y, shade(lit, 0.4), 1, 1); }
      else {
        p(x, y, '#4a6a88', w, h); p(x, y, '#7aa0bc', w, Math.ceil(h / 2));        // vidro com céu refletido
        p(x + 1, y + h - 2, '#e8c070', 1, 1);                                       // luz de vela lá dentro
        for (let i = 0; i < 3; i++) p(x + i, y + 2 - i, '#d8ecf8', 1, 1);         // reflexo diagonal
      }
      p(x + Math.floor(w / 2), y, '#3a2a1a', 1, h); p(x, y + Math.floor(h / 2), '#3a2a1a', w, 1);
      p(x - 2, y + h + 1, '#b0a088', w + 4, 1); p(x - 2, y + h + 2, '#7a6a58', w + 4, 1); // peitoril
      if (homey && !lit) {
        if (r.chance(0.65)) for (const sx of [x - 4, x + w + 2]) { p(sx, y - 1, shutC, 2, h + 2); p(sx, y - 1, shade(shutC, 0.25), 1, h + 2); for (let yy = 1; yy < h + 2; yy += 2) p(sx, y - 1 + yy, shade(shutC, -0.3), 2, 1); }
        if (r.chance(0.4)) { p(x - 1, y + h + 1, '#6a4428', w + 2, 2); for (let i = 0; i < w + 2; i += 2) { p(x - 1 + i, y + h, '#3a8a3a', 1, 1); p(x - 1 + i, y + h - 1, r.pick(['#e04070', '#f0d040', '#ffffff', '#c060e0']), 1, 1); } }
      }
    };
    const door = (x, y, w, h, round) => {
      p(x - 2, y - 2, homey ? '#8a7a6a' : '#2a1a10', w + 4, h + 2);                 // batente de pedra
      p(x - 1, y - 1, '#2a1a10', w + 2, h + 1);
      p(x, y, '#7a4a24', w, h); for (let xx = 1; xx < w; xx += 3) { p(x + xx, y, '#5a3418', 1, h); p(x + xx - 1, y, '#8e5a30', 1, h); }
      p(x, y + 2, '#2e2e34', w - 2, 1); p(x, y + h - 4, '#2e2e34', w - 2, 1);        // dobradiças de ferro
      p(x + w - 2, y + Math.floor(h / 2), '#e0c060');
      if (h >= 12 && w >= 8) { p(x + 2, y + 3, '#3a2a1a', w - 4, 3); p(x + 3, y + 4, '#e8c070', w - 6, 1); }
      if (round) { p(x, y - 1, '#7a4a24', w, 1); p(x + 1, y - 2, '#7a4a24', w - 2, 1); }
      p(x - 3, y + h - 1, '#9a9088', w + 6, 1);                                    // degrau
    };
    // ---- TELHADOS
    const roofRect = (x, y, w, h) => {
      if (style === 'castle') {
        p(x, y, roofC, w, h); for (let yy = 2; yy < h; yy += 4) p(x, y + yy, rsh, w, 1);
        p(x, y, rhi, w, 1); for (let xx = 0; xx < w; xx += 4) p(x + xx, y - 2, roofC, 2, 2);
      } else if (style === 'hide') {
        // tenda grande
        for (let yy = 0; yy < h; yy++) { const inset = Math.floor((h - yy) * 0.5); p(x + inset, y + yy, yy % 4 === 0 ? rsh : roofC, w - inset * 2, 1); }
      } else if (style === 'adobe') {
        p(x, y + h - 4, roofC, w, 4); p(x, y + h - 4, rhi, w, 1);
        if (sp.dome !== false) { S.ellipse(p, x + w / 2, y + h - 4, Math.min(w / 3, 14), Math.min(h - 2, 12), sp.domeC || '#4a80c0'); p(x + w / 2 - 1, y + h - 4 - Math.min(h - 2, 12) - 2, '#f0d060', 2, 3); }
      } else if (style === 'round') {
        for (let yy = 0; yy < h; yy++) { const t = yy / h; const inset = Math.round((1 - Math.sqrt(t)) * w * 0.25); p(x + inset, y + yy, yy < 2 ? rhi : (yy % 3 ? roofC : rsh), w - inset * 2, 1); }
        for (let i = 0; i < 8; i++) p(x + r.int(4, w - 6), y + r.int(3, h - 2), r.pick(['#f0e040', '#e04070', '#ffffff']));
        p(x + w - 10, y - 4, '#8a7a6a', 4, 7);
      } else if (style === 'elven') {
        for (let yy = 0; yy < h; yy++) { const t = yy / h; const inset = Math.round((1 - t) * (1 - t) * w * 0.42); p(x + inset, y + yy, yy % 3 ? roofC : rsh, w - inset * 2, 1); p(x + inset, y + yy, rhi, 1, 1); }
        p(x + w / 2 - 1, y - 5, '#e0d080', 2, 6);
      } else {
        // telhado de duas águas: telha por telha, claro no alto e escuro na beirada
        const rows = Math.ceil(h / 3);
        for (let row = 0; row < rows; row++) {
          const yy = row * 3, t = row / Math.max(1, rows - 1), rh = Math.min(3, h - yy);
          const base = shade(roofC, 0.2 - t * 0.4), off = (row % 2) * 3;
          p(x, y + yy, base, w, rh);
          for (let xx = -off; xx < w; xx += 6) {
            const sx = Math.max(0, xx), sw = Math.min(6, w - sx, xx + 6 - sx);
            if (sw <= 0) continue;
            const sc = shade(base, (r.next() - 0.5) * 0.18);
            p(x + sx, y + yy, sc, sw, rh);
            p(x + sx, y + yy, shade(sc, 0.18), sw, 1);
            p(x + sx, y + yy, shade(sc, -0.3), 1, rh);
          }
          if (rh === 3) p(x, y + yy + 2, shade(base, -0.32), w, 1);
        }
        p(x, y, shade(roofC, -0.45), w, 1); p(x, y + 1, shade(roofC, 0.35), w, 1);   // cumeeira
        p(x, y, rdk, 2, h); p(x + w - 2, y, rdk, 2, h); p(x + 2, y, shade(roofC, 0.1), 1, h); // beirais laterais
        p(x, y + h - 1, rdk, w, 1);
        if (!sp.snow && style !== 'stilt') for (let i = 0; i < 5; i++) if (r.chance(0.5)) p(x + r.int(3, w - 7), y + r.int(4, h - 3), r.chance(0.5) ? '#5a7a3a' : '#6a8a44', r.int(2, 4), 1); // musgo
        if (sp.snow) { p(x, y, '#f4f8fc', w, 3); for (let xx = 0; xx < w; xx++) if (r.chance(0.4)) p(x + xx, y + 3, '#e0e8f0', 1, r.int(1, 3)); }
        if (style === 'stilt' || sp.thatch) for (let i = 0; i < w; i += 2) p(x + i, y + h - 1, rsh, 1, 2);
      }
    };

    if (sp.type === 'castle' || sp.type === 'palace') {
      const tw = 14;
      const bodyTop = wallTop - 6;
      wallRect(ox + tw - 2, bodyTop, W - (tw - 2) * 2, H - bodyTop);
      roofRect(ox + tw - 4, 12, W - (tw - 4) * 2, bodyTop - 12);
      // torres
      for (const tx of [ox, ox + W - tw]) {
        wallRect(tx, 8, tw, H - 8);
        p(tx, 8, shade(wallC, 0.15), tw, 2);
        for (let xx = 0; xx < tw; xx += 4) p(tx + xx, 4, wallC, 2, 4);
        if (sp.type === 'palace') { for (let yy = 0; yy < 12; yy++) { const inset = Math.round((12 - yy) * 0.55); p(tx + inset, -4 + yy + 4, roofC, tw - inset * 2, 1); } }
        window(tx + 5, 16, 4, 6); window(tx + 5, wallTop + 4, 4, 6);
      }
      // portão
      p(doorX - 2, H - doorH - 3, wdk, doorW + 4, doorH + 3);
      p(doorX, H - doorH, '#2a1a10', doorW, doorH);
      for (let xx = 1; xx < doorW; xx += 3) p(doorX + xx, H - doorH, '#6a6a6a', 1, doorH);
      for (let yy = 2; yy < doorH; yy += 4) p(doorX, H - doorH + yy, '#6a6a6a', doorW, 1);
      for (let i = 0; i < Math.floor((W - 2 * tw) / 20); i++) window(ox + tw + 6 + i * 20, wallTop + 2, 5, 7);
      // estandartes
      const bc = sp.banner || '#c03030';
      for (const bx of [doorX - 10, doorX + doorW + 6]) { p(bx, wallTop - 2, bc, 5, 12); p(bx + 1, wallTop + 2, '#f0d060', 3, 3); p(bx, wallTop + 10, bc, 2, 2); p(bx + 3, wallTop + 10, bc, 2, 2); }
    } else if (sp.type === 'tower') {
      const tw = W - 4;
      wallRect(ox + 2, 20, tw, H - 20);
      for (let yy = 0; yy < 26; yy++) { const inset = Math.round((26 - yy) / 26 * tw * 0.5); p(ox + 2 + inset - 2, yy, yy % 4 === 0 ? rsh : roofC, tw - inset * 2 + 4, 1); }
      p(ox + W / 2 - 1, 0, '#f0e060', 2, 2);
      for (let i = 0; i < 4; i++) p(ox + r.int(6, W - 6), r.int(8, 22), '#ffff80');
      window(ox + W / 2 - 2, 30, 4, 6, '#c0a0ff');
      door(doorX, H - doorH, doorW, doorH, true);
    } else if (sp.type === 'temple') {
      wallRect(ox, wallTop, W, wallH);
      // frontão
      for (let yy = 0; yy < wallTop; yy++) { const inset = Math.round((wallTop - yy) / wallTop * W * 0.45); p(ox + inset, yy, yy % 4 === 3 ? rsh : roofC, W - inset * 2, 1); }
      p(ox + W / 2 - 2, wallTop - 12, '#f0d060', 4, 8); p(ox + W / 2 - 4, wallTop - 10, '#f0d060', 8, 2);
      for (let xx = 4; xx < W - 4; xx += 10) { p(ox + xx, wallTop + 1, '#f0f0f0', 4, wallH - 1); p(ox + xx, wallTop + 1, '#ffffff', 1, wallH - 1); }
      door(doorX, H - doorH, doorW, doorH, true);
    } else if (sp.type === 'factory') {
      // fábrica: galpão de tijolos, telhado em dente de serra e chaminés altas
      wallRect(ox, wallTop, W, wallH);
      const roofTop = wallTop - 14;
      for (let x = 0; x < W; x++) { const k = x % 16, hgt = k < 12 ? Math.round(k / 12 * 12) : Math.round((16 - k) / 4 * 12); for (let y = 0; y < hgt; y++) p(ox + x, wallTop - 1 - y, k < 12 ? (y % 3 ? '#4a4a56' : '#3a3a44') : '#a0c0d8', 1, 1); }
      p(ox, wallTop - 2, '#2a2a34', W, 2);
      for (const sx of [ox + 6, ox + W - 14]) { for (let y = 0; y < wallTop; y++) p(sx, y, y % 4 === 0 ? '#6a3a2a' : '#8a4a36', 7, 1); p(sx - 1, 0, '#3a2a2a', 9, 3); p(sx + 1, 0, '#1a1010', 5, 1); }
      for (let i = 0; i < Math.floor((W - 10) / 12); i++) { const wx = ox + 6 + i * 12; p(wx - 1, wallTop + 4, '#d8d0c0', 8, 1); p(wx, wallTop + 5, '#3a4a5a', 6, 9); p(wx, wallTop + 5, '#7aa0bc', 6, 3); p(wx + 3, wallTop + 5, '#2a2a30', 1, 9); for (let y = wallTop + 8; y < wallTop + 14; y += 3) p(wx, y, '#2a2a30', 6, 1); }
      p(doorX - 3, H - 16, '#d8d0c0', doorW + 6, 2); p(doorX - 2, H - 14, '#3a3a40', doorW + 4, 14); for (let y = H - 13; y < H; y += 2) p(doorX - 2, y, '#5a5a62', doorW + 4, 1);
      p(ox + W / 2 - 8, wallTop + 1, '#e8e0d0', 16, 4); p(ox + W / 2 - 7, wallTop + 2, '#3a2a2a', 14, 1);
      void roofTop;
    } else if (style === 'hide') {
      // tenda orc
      for (let yy = 0; yy < H - 2; yy++) { const t = yy / (H - 2); const inset = Math.round((1 - t) * W * 0.42); p(ox + inset, yy + 2, Math.floor(yy / 4) % 2 ? roofC : rsh, W - inset * 2, 1); }
      p(ox + W / 2 - 1, 0, '#5a3a1a', 2, 6); p(ox + W / 2 - 4, 0, '#e8e0c8', 2, 4); p(ox + W / 2 + 2, 0, '#e8e0c8', 2, 4);
      for (let yy = H - doorH; yy < H; yy++) { const hw = Math.round((yy - (H - doorH)) * 0.4) + 2; p(ox + W / 2 - hw, yy, '#1a0e08', hw * 2, 1); }
      p(ox + 4, H - 10, '#c03030', 3, 6);
    } else {
      wallRect(ox, wallTop, W, wallH);
      // sombra do beiral e alicerce de pedra
      p(ox, wallTop, 'rgba(0,0,0,0.3)', W, 2); p(ox, wallTop + 2, 'rgba(0,0,0,0.14)', W, 2);
      if (style !== 'stilt' && style !== 'hide') {
        p(ox, H - 3, '#7a7068', W, 3); p(ox, H - 3, '#9a9088', W, 1);
        for (let xx = r.int(0, 4); xx < W; xx += r.int(4, 7)) p(ox + xx, H - 3, '#5a5048', 1, 3);
      }
      const roofH = wallTop + 2;
      roofRect(ox - 1, 0, W + 2, roofH);
      // janelas
      const lit = style === 'elven' ? '#a0f0e0' : undefined;
      const nwin = Math.floor((W - doorW) / 2 / 14);
      if (style === 'brick') {
        // sobrado: janelas altas com vergas de pedra nos dois andares e mansardas no telhado
        const tall = (x, y) => { p(x - 1, y - 2, '#e0d8c8', 7, 2); p(x - 1, y - 1, '#2a2020', 7, 10); p(x, y, '#4a6a88', 5, 8); p(x, y, '#8ab0cc', 5, 3); p(x + 2, y, '#2a2020', 1, 8); p(x, y + 4, '#2a2020', 5, 1); p(x + 1, y + 1, '#e0f0ff', 1, 1); p(x - 2, y + 8, '#e0d8c8', 9, 1); };
        for (let i = 0; i < Math.max(1, nwin); i++) { tall(ox + 5 + i * 14, wallTop + 5); tall(ox + W - 10 - i * 14, wallTop + 5); }
        if (wallH > 22) for (let x = ox + 5; x < ox + W - 8; x += 12) if (x + 7 < doorX - 1 || x > doorX + doorW + 2) tall(x, wallTop + Math.floor(wallH / 2) + 4);
        for (let x = ox + 8; x < ox + W - 10; x += 16) { p(x, wallTop - 9, '#3a3a44', 8, 7); p(x + 1, wallTop - 11, '#3a3a44', 6, 2); p(x + 2, wallTop - 7, '#8ab0cc', 4, 4); p(x + 4, wallTop - 7, '#2a2020', 1, 4); }
        p(ox, wallTop, '#e0d8c8', W, 2);
      } else
      for (let i = 0; i < nwin; i++) { window(ox + 5 + i * 14, wallTop + 5, 5, 5, lit); window(ox + W - 10 - i * 14, wallTop + 5, 5, 5, lit); }
      door(doorX, H - doorH, doorW, doorH, style === 'round' || style === 'elven');
      if (style === 'round') { S.ellipse(p, doorX + doorW / 2, H - doorH / 2, doorW / 2 + 1, doorH / 2, '#2a6a2a'); p(doorX + doorW / 2, H - doorH / 2, '#e0c060'); }
      if (sp.type === 'guildhall' || sp.type === 'heroes') {
        const bc = sp.banner || '#e0b040';
        p(doorX - 8, wallTop + 2, bc, 5, 10); p(doorX + doorW + 3, wallTop + 2, bc, 5, 10);
        S.ellipse(p, ox + W / 2, wallTop - 4, 6, 5, '#c0c0c8'); S.ellipse(p, ox + W / 2, wallTop - 4, 4, 3, bc);
      }
      if (sp.chimney) { const cx = ox + W - 12; for (let yy = 0; yy < 7; yy += 2) { p(cx, yy, yy % 4 ? '#8a5a48' : '#9a6a54', 6, 2); p(cx + (yy % 4 ? 3 : 0), yy, '#6a4034', 1, 2); } p(cx - 1, 0, '#4a4a4a', 8, 2); }
    }
    // qualidade (casas construídas pelo jogador)
    if (sp.quality !== undefined) {
      const q = sp.quality;
      if (q === 0) { for (let i = 0; i < 6; i++) p(ox + r.int(2, W - 6), r.int(2, wallTop - 4), '#2a1a10', r.int(2, 4), 2); for (let i = 0; i < 4; i++) p(ox + r.int(2, W - 4), wallTop + r.int(2, wallH - 4), shade(wallC, -0.35), 3, 1); p(ox + 3, wallTop + 4, '#2a1a10', 5, 5); }
      if (q === 1) { for (let i = 0; i < 2; i++) p(ox + r.int(2, W - 6), r.int(2, wallTop - 4), '#3a2a1a', 3, 1); }
      if (q >= 3) { p(ox, wallTop, '#e0c060', W, 1); for (let x = 6; x < W - 6; x += 14) { p(ox + x, wallTop + 11, '#6a4a2a', 6, 2); p(ox + x, wallTop + 9, '#e04070', 2, 2); p(ox + x + 3, wallTop + 9, '#f0e040', 2, 2); } }
      if (q >= 4) { p(ox + W / 2 - 2, 0, '#ffd040', 4, 3); p(ox, H - 1, '#e0c060', W, 1); }
    }
    // placa
    if (sp.sign) {
      const sx = doorX + doorW + 3, sy = H - doorH - 2;
      if (sx + 9 < W) {
        p(sx, sy, '#5a3a1a', 9, 8); p(sx + 1, sy + 1, '#c09050', 7, 6);
        drawSignIcon(p, sx + 2, sy + 2, sp.sign);
      }
    }
    S.outline(c);
    // sombra no chão à direita
    if (sp.type !== 'castle' && sp.type !== 'palace') { const x2 = c.getContext('2d'); x2.save(); x2.globalCompositeOperation = 'destination-over'; x2.fillStyle = 'rgba(10,20,10,0.22)'; x2.beginPath(); x2.moveTo(W, wallTop + 2); x2.lineTo(W + 2, wallTop + 2); x2.lineTo(W + 2, H); x2.lineTo(W - 4, H); x2.closePath(); x2.fill(); x2.restore(); }
    return c;
  }
  function drawSignIcon(p, x, y, kind) {
    switch (kind) {
      case 'smith': p(x, y + 1, '#3a3a40', 5, 2); p(x + 1, y + 3, '#3a3a40', 3, 1); p(x + 2, y, '#3a3a40', 1, 1); break;
      case 'inn': p(x, y, '#e0e0e0', 4, 1); p(x, y + 1, '#d0a030', 4, 3); p(x + 4, y + 1, '#d0a030', 1, 2); break;
      case 'general': p(x, y + 1, '#8a5a2a', 5, 3); p(x + 1, y, '#8a5a2a', 3, 1); break;
      case 'alchemist': p(x + 1, y, '#c0c0d0', 2, 1); p(x, y + 1, '#e03030', 4, 3); break;
      case 'magic': p(x + 2, y, '#8040e0'); p(x + 1, y + 1, '#8040e0', 3, 1); p(x, y + 2, '#a060ff', 5, 1); p(x + 1, y + 3, '#8040e0', 3, 1); break;
      case 'guild': p(x, y, '#c0c0c8', 5, 3); p(x + 1, y + 3, '#c0c0c8', 3, 1); p(x + 2, y + 1, '#d03030', 1, 2); break;
      case 'temple': p(x + 2, y, '#f0d060', 1, 4); p(x, y + 1, '#f0d060', 5, 1); break;
      case 'stable': p(x, y + 1, '#8a5a2a', 4, 2); p(x + 3, y, '#8a5a2a', 2, 2); p(x, y + 3, '#5a3a1a', 1, 1); p(x + 3, y + 3, '#5a3a1a', 1, 1); break;
      case 'house': p(x + 1, y + 2, '#a03030', 3, 2); p(x, y + 1, '#a03030', 5, 1); p(x + 2, y, '#a03030', 1, 1); break;
    }
  }

  // Montarias
  const mountC = {};
  S.horse = function (kind = 'cavalo') {
    if (mountC[kind]) return mountC[kind];
    const M = MOUNTS[kind] || MOUNTS.cavalo;
    if (M.wolf) {
      const right = [0, 1, 2].map(f => { let c = quad({ k: 'wolf', c: M.c }, f); c = S.scale(c, 1.25); const o = cv(28, 22), x = o.getContext('2d'); x.drawImage(c, 0, 0); P(x)(10, 6, '#7a2a1a', 6, 3); return o; });
      return (mountC[kind] = { right, left: right.map(flip) });
    }
    const mk = (f) => {
      const c = cv(26, 22), p = P(c.getContext('2d'));
      const col = M.c, dk = shade(col, -0.4), hi = shade(col, 0.22), mane = kind === 'corcel' ? '#c0d0ff' : kind === 'camelo' ? shade(col, -0.2) : shade(col, -0.55);
      const small = kind === 'burro';
      const legsOff = f === 1 ? [-1, 1, 1, -1] : f === 2 ? [1, -1, -1, 1] : [0, 0, 0, 0];
      const lh = small ? 5 : 7, by = small ? 14 : 12;
      [5, 7, 16, 18].forEach((x, i) => { for (let y = 0; y < lh; y++) p(x + (y > lh / 2 ? legsOff[i] : 0), by + y, i % 2 ? col : dk, 2, 1); p(x + legsOff[i], by + lh, '#1a1a1a', 2, 1); });
      S.ellipse(p, 12, by - 2, small ? 8 : 9, 4, col); p(5, by - 5, hi, 14, 1); p(6, by, shade(col, -0.15), 12, 1);
      if (kind === 'camelo') { S.ellipse(p, 9, by - 6, 3, 3, col); S.ellipse(p, 15, by - 6, 3, 3, col); }
      const hx = small ? 17 : 18;
      p(hx, by - 9, col, 4, 8); p(hx + 2, by - 11, col, 4, 4); p(hx + 5, by - 9, dk, 1, 2); p(hx + 3, by - 10, '#1a1010');
      if (small) { p(hx + 1, by - 15, col, 1, 4); p(hx + 3, by - 15, col, 1, 4); }
      p(hx - 1, by - 10, mane, 2, 8); p(1, by - 4, mane, 3, 7);
      if (M.antlers) { p(hx + 1, by - 15, '#d8c8a0', 1, 4); p(hx, by - 15, '#d8c8a0', 3, 1); p(hx + 4, by - 15, '#d8c8a0', 1, 4); p(hx + 4, by - 15, '#d8c8a0', 3, 1); }
      p(9, by - 7, '#6a2a1a', 6, 3); p(10, by - 7, '#d0a030', 1, 1);
      if (kind === 'cavalo_guerra') { p(6, by - 5, '#8a8a94', 12, 3); p(hx + 1, by - 11, '#8a8a94', 4, 2); }
      if (kind === 'corcel') { p(9, by - 7, '#3a5aa0', 6, 3); p(10, by - 7, '#e0e0ff', 1, 1); }
      S.outline(c); return c;
    };
    const right = [0, 1, 2].map(mk);
    return (mountC[kind] = { right, left: right.map(flip) });
  };
  // Carroça (vista lateral, voltada à direita)
  let cartC = null;
  S.cart = function () {
    if (cartC) return cartC;
    const mk = (f) => {
      const c = cv(34, 22), p = P(c.getContext('2d'));
      p(2, 6, '#8a5a2e', 26, 9); p(2, 6, '#a87440', 26, 1); for (let x = 2; x < 28; x += 5) p(x, 6, '#6a4020', 1, 9); p(2, 14, '#5a3418', 26, 1);
      p(0, 5, '#6a4020', 2, 10); p(28, 5, '#6a4020', 2, 10);
      p(29, 11, '#5a3418', 5, 2);
      for (const wx of [8, 22]) { S.ellipse(p, wx, 16.5, 4.5, 4.5, '#4a2e14'); S.ellipse(p, wx, 16.5, 2.5, 2.5, '#8a5a2e'); const a = f * 0.8; p(wx + Math.round(Math.cos(a) * 3), 16 + Math.round(Math.sin(a) * 3), '#3a2410'); p(wx - Math.round(Math.cos(a) * 3), 16 - Math.round(Math.sin(a) * 3), '#3a2410'); p(wx, 16, '#c0a060'); }
      S.outline(c); return c;
    };
    const right = [0, 1, 2].map(mk);
    return (cartC = { right, left: right.map(flip) });
  };
  // Carcaça (sprite do animal deitado)
  const carcC = new Map();
  S.carcass = function (eid) {
    if (carcC.has(eid)) return carcC.get(eid);
    const look = ENEMIES[eid].look;
    if (look.k === 'sombra') { if (!Sombra.ready) return Sombra.sheet().down[0]; const c = Sombra.sheetS.dead.right[0]; carcC.set(eid, c); return c; }
    const sp = S.actor(look);
    const img = (sp.right || sp.down)[0];
    const c = cv(img.width, img.height), x = c.getContext('2d');
    x.translate(0, img.height); x.scale(1, -1); x.drawImage(img, 0, 0);
    x.globalCompositeOperation = 'source-atop'; x.fillStyle = 'rgba(60,20,20,0.25)'; x.fillRect(0, 0, c.width, c.height);
    carcC.set(eid, c);
    return c;
  };
  // Obra (andaimes) por progresso
  S.scaffold = function (w, h, prog) {
    const W = w * 16, H = h * 16 + 14;
    const c = cv(W + 2, H + 1), p = P(c.getContext('2d'));
    const lvl = Math.floor(prog * 4);
    p(1, H - 4, '#8a8580', W, 4);
    if (lvl >= 1) { for (let x = 1; x < W; x += 6) p(x, H - 4 - Math.min(16, H * 0.3), '#8a5a2e', 4, Math.min(16, H * 0.3)); }
    if (lvl >= 2) { p(1, H - 26, '#a87440', W, 22); for (let x = 1; x < W; x += 8) p(x, H - 26, '#6a4020', 1, 22); }
    if (lvl >= 3) { for (let y = 0; y < 12; y++) p(1 + (12 - y), H - 38 + y, '#8a3a2a', W - (12 - y) * 2, 1); }
    for (let x = 0; x < W; x += 12) p(x, 4, '#c09050', 2, H - 4);
    for (let y = 10; y < H; y += 12) p(0, y, '#c09050', W + 2, 2);
    S.outline(c);
    return c;
  };
})(Sprites);
