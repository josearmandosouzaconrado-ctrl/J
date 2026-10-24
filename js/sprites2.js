'use strict';
// ===================== PIXEL ART: personagens, criaturas, armas, construções =====================
(function (S) {
  const cv = S.cv, P = S.P, outline = S.outline, flip = S.flip, ellipse = S.ellipse, blob = S.blob;

  // ---------- HUMANOIDES ----------
  // L: aparência. dir: 'down'|'up'|'side'. frame 0..2
  function humanoid(L, dir, frame) {
    const c = cv(16, 22), ctx = c.getContext('2d'), p = P(ctx);
    const sk = L.skin || '#e0ac69', skD = shade(sk, -0.22), skL = shade(sk, 0.14);
    const skel = !!L.skeleton, mum = !!L.mummy;
    const body = L.body !== undefined && L.body !== null ? L.body : (skel ? null : '#6a5a4a');
    const legsC = L.legs || (body ? shade(body, -0.35) : null);
    const boots = L.boots || '#3a2a1a';
    const hair = L.hair || '#3a2a1a';
    const short = L.short || 0, tall = L.tall || 0, bulky = L.bulky ? 1 : 0;
    const legH = short >= 3 ? 2 : short >= 2 ? 3 : tall ? 5 : 4;
    const torsoH = short >= 2 ? 4 : 5;
    const footY = 21;
    const legTop = footY - legH + 1;
    const tB = legTop - 1, tT = tB - torsoH + 1;
    const hB = tT - 1, hT = hB - 5;
    const eyes = L.eyes || (skel || L.zombie ? '#ff3020' : mum ? '#ffd040' : '#1a1420');
    const tx0 = 5 - bulky, tx1 = 10 + bulky;
    const bone = '#e8e0c8', boneD = '#a8a088';
    const robe = !!L.robe;
    const bandage = (x, y) => { if (mum && ((x + y) % 3 === 0)) p(x, y, '#9a8a6a'); };

    const drawTail = (side) => {
      if (!L.tail) return;
      const tc = L.tailC || sk;
      if (side) { p(tx0 - 1, tB, tc); p(tx0 - 2, tB + 1, tc); p(tx0 - 3, tB + 1, tc); p(tx0 - 4, tB + (frame === 1 ? 0 : 2), tc); }
      else { p(7, tB + 1, tc, 2, 1); p(8 - (frame === 1 ? 1 : 0), tB + 2, tc, 2, 1); p(9 - (frame === 2 ? 2 : 0), tB + 3, tc, 1, 1); }
    };

    if (dir === 'down' || dir === 'up') {
      const front = dir === 'down';
      if (!front) drawTail(false);
      // escudo atrás (vista de costas)
      if (L.shield && !front) { p(tx1 + 1, tT, L.shield, 3, torsoH + 1); p(tx1 + 2, tT + 1, shade(L.shield, 0.3), 1, torsoH - 1); }
      // pernas
      const lx = [tx0 + 1, tx0 + 2 + bulky], rx = [tx1 - 1 - bulky, tx1 - 1];
      const legs = (xs, up) => {
        for (let y = legTop; y <= footY - up; y++) {
          const isFoot = y === footY - up;
          let col = isFoot ? boots : legsC;
          if (skel && !L.legs) col = isFoot ? bone : bone;
          for (let x = xs[0]; x <= xs[1]; x++) {
            if (skel && !L.legs && x !== xs[0]) continue;
            p(x, y, col); bandage(x, y);
          }
        }
      };
      if (!robe) { legs(lx, frame === 1 ? 1 : 0); legs(rx, frame === 2 ? 1 : 0); }
      // torso
      if (skel && !L.body) {
        for (let y = tT; y <= tB; y++) { p(7, y, bone, 2, 1); if ((y - tT) % 2 === 0) p(tx0 + 1, y, bone, tx1 - tx0 - 1, 1); }
        p(tx0 + 1, tB, boneD, tx1 - tx0 - 1, 1);
      } else {
        const bot = robe ? footY - 1 : tB;
        for (let y = tT; y <= bot; y++) {
          const ext = robe && y > tB ? Math.min(2, Math.floor((y - tB) / 2)) : 0;
          for (let x = tx0 - ext; x <= tx1 + ext; x++) {
            let col = body;
            if (x <= tx0 - ext) col = shade(body, 0.15); else if (x >= tx1 + ext) col = shade(body, -0.22);
            if (L.fur && (x === tx0 - ext || x === tx1 + ext) && (y % 2)) col = shade(body, 0.25);
            if (L.zombie && ((x * 7 + y * 3) % 11 === 0)) col = shade(body, -0.4);
            p(x, y, col); bandage(x, y);
          }
        }
        if (robe) { p(7, tT, shade(body, 0.3), 2, footY - tT); if (front) { p(tx0, footY, boots, 2, 1); p(tx1 - 1, footY, boots, 2, 1); } }
        else if (!mum && !L.fur && !L.nobelt) { p(tx0, tB, '#3a2818', tx1 - tx0 + 1, 1); if (front) p(7, tB, '#c8a040', 2, 1); }
        if (L.cape && !front) { for (let y = tT; y <= Math.min(footY - 1, tB + 3); y++) p(tx0, y, L.cape, tx1 - tx0 + 1, 1); p(tx0, tT, shade(L.cape, 0.2), tx1 - tx0 + 1, 1); }
        if (L.cape && front) { p(tx0 - 1, tT, L.cape, 1, torsoH + 1); p(tx1 + 1, tT, L.cape, 1, torsoH + 1); }
        if (L.chestplate && front) { p(tx0 + 1, tT + 1, shade(body, 0.25), tx1 - tx0 - 1, 1); p(7, tT + 1, shade(body, 0.4), 2, torsoH - 2); }
      }
      // braços
      const armC = skel && !L.body ? bone : (L.sleeve || body);
      const arm = (x, sw) => {
        for (let y = tT + sw; y < tB + sw; y++) p(x, y, armC);
        p(x, tB + sw, skel ? bone : sk);
      };
      arm(tx0 - 1, frame === 1 ? 1 : 0); arm(tx1 + 1, frame === 2 ? 1 : 0);
      if (L.shield && front) { p(tx0 - 3, tT, L.shield, 3, torsoH + 1); p(tx0 - 2, tT + 1, shade(L.shield, 0.35), 1, torsoH - 1); p(tx0 - 3, tT, shade(L.shield, -0.3), 3, 1); }
      // cabeça
      for (let y = hT; y <= hB; y++) for (let x = 5; x <= 10; x++) {
        if ((y === hT || y === hB) && (x === 5 || x === 10)) continue;
        let col = skel ? bone : sk;
        if (x === 5) col = skel ? bone : skL; if (y === hB) col = skel ? boneD : skD;
        p(x, y, col); bandage(x, y);
      }
      // orelhas
      if (L.ears === 'elf') { p(4, hT + 2, sk); p(3, hT + 1, sk); p(11, hT + 2, sk); p(12, hT + 1, sk); }
      if (L.ears === 'goblin') { p(3, hT + 2, sk, 2, 1); p(2, hT + 1, sk); p(11, hT + 2, sk, 2, 1); p(13, hT + 1, sk); }
      if (L.catears) { const ec = L.hair || sk; p(5, hT - 1, sk, 2, 1); p(5, hT - 2, sk); p(9, hT - 1, sk, 2, 1); p(10, hT - 2, sk); p(6, hT - 1, '#e8a0a0'); p(9, hT - 1, '#e8a0a0'); }
      if (front) {
        if (skel) { p(6, hT + 2, '#1a1010', 2, 2); p(9, hT + 2, '#1a1010', 1, 2); p(8, hT + 2, '#1a1010'); p(6, hT + 2, eyes); p(9, hT + 2, eyes); p(7, hB - 1, '#5a5040', 2, 1); }
        else {
          const ey = L.snout ? hT + 2 : hT + 3;
          p(6, ey, eyes); p(9, ey, eyes);
          if (L.snout) { p(6, hT + 4, skL, 4, 2); p(7, hT + 4, skD); p(8, hT + 4, skD); }
          if (L.muzzle) { p(7, hT + 4, '#e08080', 2, 1); p(6, hT + 5, skL, 4, 1); }
          if (L.tusks) { p(6, hB, '#f0f0e0'); p(9, hB, '#f0f0e0'); }
          if (L.beard) { const bc = L.beardC || hair; p(6, hT + 4, bc, 4, 2); p(5, hT + 4, bc, 1, 2); p(10, hT + 4, bc, 1, 2); p(6, hB + 1, bc, 4, 1); p(7, hB + 2, bc, 2, 1); }
        }
      }
      if (L.horns) { p(5, hT - 1, '#e8dcc0'); p(4, hT - 2, '#e8dcc0'); p(10, hT - 1, '#e8dcc0'); p(11, hT - 2, '#e8dcc0'); }
      // cabelo
      if (!skel && !mum && !L.helm && !L.hood && L.hairStyle !== 2) {
        const hs = L.hairStyle || 0;
        if (front) {
          p(6, hT, hair, 4, 1); p(5, hT + 1, hair, 6, 1); p(5, hT + 2, hair); p(10, hT + 2, hair);
          if (hs === 1 || hs === 4) { p(5, hT + 3, hair, 1, 4); p(10, hT + 3, hair, 1, 4); p(4, hT + 3, hair, 1, 3); p(11, hT + 3, hair, 1, 3); }
          if (hs === 3) { p(7, hT - 2, hair, 2, 2); }
          if (hs === 4) { p(7, hT - 1, hair, 2, 1); }
          p(6, hT, shade(hair, 0.25), 2, 1);
        } else {
          for (let y = hT; y < hB; y++) p(5, y, hair, 6, 1);
          p(6, hT, shade(hair, 0.25), 3, 1);
          if (hs === 1) { p(5, hB, hair, 6, 3); }
          if (hs === 4) { p(7, hB, hair, 2, 4); }
          if (hs === 3) p(7, hT - 2, hair, 2, 2);
        }
      }
      if (!front && (skel || mum) && !L.hood && !L.helm) { /* cabeça careca já pintada */ }
      if (L.hood) {
        const hc = L.hood;
        p(6, hT - 1, hc, 4, 1); p(5, hT, hc, 6, 2); p(4, hT + 1, hc, 1, 6); p(11, hT + 1, hc, 1, 6);
        if (front) { p(5, hT + 2, hc); p(10, hT + 2, hc); p(6, hT + 2, shade(hc, -0.4), 4, 1); }
        else for (let y = hT; y <= hB + 1; y++) p(5, y, hc, 6, 1);
      }
      if (L.helm) {
        const h = L.helm, hh = shade(h, 0.3);
        p(6, hT - 1, h, 4, 1); p(5, hT, h, 6, 2); p(5, hT + 2, h); p(10, hT + 2, h); p(4, hT + 1, h, 1, 3); p(11, hT + 1, h, 1, 3);
        p(6, hT - 1, hh, 2, 1);
        if (front) p(7, hT + 2, h, 2, 2);
        else for (let y = hT; y < hB; y++) p(5, y, h, 6, 1);
        if (L.helmHorns) { p(3, hT - 1, '#e8dcc0'); p(3, hT - 2, '#e8dcc0'); p(12, hT - 1, '#e8dcc0'); p(12, hT - 2, '#e8dcc0'); }
      }
      if (L.crown) { const g = '#f0c030'; p(5, hT - 1, g, 6, 1); p(5, hT - 2, g); p(7, hT - 2, g); p(8, hT - 2, g); p(10, hT - 2, g); p(7, hT - 1, '#e02040'); }
    } else {
      // ---------- PERFIL (direita) ----------
      const sx0 = 6 - bulky, sx1 = 9 + bulky;
      drawTail(true);
      if (L.shield) { p(sx0 - 1, tT, shade(L.shield, -0.15), 2, torsoH); }
      // pernas
      const legCol = (back) => skel && !L.legs ? (back ? boneD : bone) : back ? shade(legsC, -0.2) : legsC;
      if (!robe) {
        const off = frame === 0 ? [0, 0] : frame === 1 ? [-1, 1] : [1, -1];
        for (let k = 0; k < 2; k++) {
          const lx = 7 + (k === 0 ? 0 : 1) + off[k];
          for (let y = legTop; y <= footY; y++) {
            const foot = y === footY;
            p(lx, y, foot ? boots : legCol(k === 0));
            if (foot) p(lx + 1, y, boots);
          }
        }
      }
      // torso
      if (skel && !L.body) {
        for (let y = tT; y <= tB; y++) { p(7, y, bone); if ((y - tT) % 2 === 0) p(sx0, y, bone, sx1 - sx0 + 1, 1); }
      } else {
        const bot = robe ? footY - 1 : tB;
        for (let y = tT; y <= bot; y++) {
          const ext = robe && y > tB ? Math.min(1, Math.floor((y - tB) / 2)) : 0;
          for (let x = sx0 - ext; x <= sx1 + ext; x++) {
            let col = body;
            if (x === sx1 + ext) col = shade(body, 0.12); else if (x === sx0 - ext) col = shade(body, -0.25);
            if (L.zombie && ((x * 7 + y * 3) % 11 === 0)) col = shade(body, -0.4);
            p(x, y, col); bandage(x, y);
          }
        }
        if (robe) { p(sx0 + 1, footY, boots, 3, 1); }
        else if (!mum && !L.fur && !L.nobelt) p(sx0, tB, '#3a2818', sx1 - sx0 + 1, 1);
        if (L.cape) { p(sx0 - 1, tT, L.cape, 1, torsoH + 3); p(sx0 - 2, tT + 3, L.cape, 1, torsoH); }
      }
      // cabeça
      for (let y = hT; y <= hB; y++) for (let x = 6; x <= 10; x++) {
        if ((y === hT || y === hB) && (x === 6 || x === 10)) continue;
        let col = skel ? bone : sk; if (y === hB) col = skel ? boneD : skD;
        p(x, y, col); bandage(x, y);
      }
      const ey = L.snout ? hT + 2 : hT + 3;
      if (skel) { p(9, hT + 2, '#1a1010', 1, 2); p(9, hT + 2, eyes); p(10, hB - 1, '#5a5040'); }
      else p(9, ey, eyes);
      if (L.snout) { p(11, hT + 3, sk, 2, 2); p(12, hT + 3, skD); p(11, hT + 4, skD, 2, 1); }
      if (L.muzzle) { p(11, hT + 4, skL); p(11, hT + 3, '#e08080'); }
      if (L.tusks) p(10, hB + 0, '#f0f0e0');
      if (L.ears === 'elf') { p(6, hT + 2, sk); p(5, hT + 1, sk); p(4, hT, sk); }
      if (L.ears === 'goblin') { p(5, hT + 2, sk); p(4, hT + 2, sk); p(3, hT + 1, sk); }
      if (L.catears) { p(7, hT - 1, sk, 2, 1); p(7, hT - 2, sk); }
      if (L.horns) { p(7, hT - 1, '#e8dcc0'); p(6, hT - 2, '#e8dcc0'); p(5, hT - 2, '#e8dcc0'); }
      if (L.beard && !skel) { const bc = L.beardC || hair; p(9, hT + 4, bc, 2, 2); p(8, hB, bc, 3, 1); p(8, hB + 1, bc, 2, 1); }
      if (!skel && !mum && !L.helm && !L.hood && L.hairStyle !== 2) {
        const hs = L.hairStyle || 0;
        p(6, hT, hair, 4, 1); p(6, hT + 1, hair, 4, 1); p(6, hT + 2, hair, 2, 1); p(6, hT + 3, hair);
        if (hs === 1) { p(5, hT + 1, hair, 1, 6); p(6, hT + 4, hair, 1, 3); }
        if (hs === 4) { p(5, hT + 2, hair, 1, 4); p(4, hT + 4, hair, 1, 2); }
        if (hs === 3) p(7, hT - 2, hair, 2, 2);
        p(7, hT, shade(hair, 0.25), 2, 1);
      }
      if (L.hood) { const hc = L.hood; p(6, hT - 1, hc, 4, 1); p(5, hT, hc, 5, 2); p(5, hT + 2, hc, 2, 5); p(10, hT, hc, 1, 2); }
      if (L.helm) { const h = L.helm; p(6, hT - 1, h, 4, 1); p(5, hT, h, 6, 2); p(5, hT + 2, h, 2, 3); p(10, hT + 2, h); p(7, hT - 1, shade(h, 0.3), 2, 1); if (L.helmHorns) { p(5, hT - 2, '#e8dcc0'); p(4, hT - 3, '#e8dcc0'); } }
      if (L.crown) { const g = '#f0c030'; p(6, hT - 1, g, 5, 1); p(6, hT - 2, g); p(8, hT - 2, g); p(10, hT - 2, g); }
      // braço frontal
      const armC = skel && !L.body ? bone : (L.sleeve || body);
      const ax = 8 + (frame === 1 ? 1 : frame === 2 ? -1 : 0);
      for (let y = tT; y < tB; y++) p(ax, y, armC);
      p(ax, tB, skel ? bone : sk);
    }
    outline(c);
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

  // Cache de sprites de atores: retorna {down:[3], up:[3], right:[3], left:[3]} ou {right:[2],left:[2]}
  const actorCache = new Map();
  S.actor = function (L) {
    const key = JSON.stringify(L);
    let s = actorCache.get(key);
    if (s) return s;
    if (L.k === 'hum') {
      const sc = L.size || 1;
      const mkf = (d, f) => { let c = humanoid(L, d, f); if (sc !== 1) c = S.scale(c, sc); return c; };
      s = { type: 'hum', down: [0, 1, 2].map(f => mkf('down', f)), up: [0, 1, 2].map(f => mkf('up', f)), right: [0, 1, 2].map(f => mkf('side', f)) };
      s.left = s.right.map(flip);
      s.w = s.down[0].width; s.h = s.down[0].height;
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
    c = cv(20, 16); const p = P(c.getContext('2d'));
    const hi = shade(col, 0.4), sh = shade(col, -0.3), wood = '#6a4424', gold = '#d8a838';
    switch (wclass) {
      case 'sword': p(0, 7, wood, 4, 2); p(4, 5, gold, 1, 6); p(5, 7, col, 10, 2); p(5, 7, hi, 10, 1); p(15, 7, col, 1, 1); break;
      case 'dagger': p(0, 7, wood, 4, 2); p(4, 6, gold, 1, 4); p(5, 7, col, 6, 2); p(5, 7, hi, 6, 1); p(11, 7, col); break;
      case 'great': p(0, 7, wood, 5, 2); p(5, 4, gold, 2, 8); p(7, 6, col, 12, 4); p(7, 6, hi, 12, 1); p(7, 9, sh, 12, 1); p(19, 7, col, 1, 2); break;
      case 'axe': p(0, 7, wood, 13, 2); p(10, 2, col, 4, 11); p(14, 3, col, 1, 9); p(14, 3, hi, 1, 9); p(10, 2, hi, 4, 1); break;
      case 'mace': p(0, 7, wood, 11, 2); S.ellipse(p, 13, 8, 3.5, 3.5, col); p(12, 6, hi, 2, 2); p(13, 3, col); p(17, 8, col); p(13, 12, col); break;
      case 'hammer': p(0, 7, wood, 12, 2); p(11, 2, col, 6, 12); p(11, 2, hi, 6, 1); p(16, 2, sh, 1, 12); break;
      case 'bow': for (let y = 0; y < 16; y++) { const x = 2 + Math.round(Math.sin(y / 15 * Math.PI) * 5); p(x, y, col, 2, 1); } p(2, 0, '#e8e8e0', 1, 16); break;
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
    let c = bCache.get(key);
    if (c) return c;
    c = makeBuilding(spec);
    bCache.set(key, c);
    return c;
  };
  function makeBuilding(sp) {
    const W = sp.w * 16, FH = sp.h * 16;
    const extra = sp.type === 'castle' || sp.type === 'palace' ? 30 : sp.type === 'tower' ? 34 : sp.type === 'temple' ? 18 : 14;
    const H = FH + extra;
    const c = cv(W + 2, H + 1), ctx = c.getContext('2d'), p = P(ctx);
    const r = new RNG(sp.seed || 1);
    const style = sp.style || 'timber';
    const roofC = sp.roof || '#a03a2a', wallC = sp.wall || '#e8dcc0';
    const rhi = shade(roofC, 0.2), rsh = shade(roofC, -0.3), rdk = shade(roofC, -0.5);
    const whi = shade(wallC, 0.12), wsh = shade(wallC, -0.2), wdk = shade(wallC, -0.4);
    const wallH = Math.max(14, Math.min(26, Math.round(FH * 0.55)));
    const wallTop = H - wallH;
    const ox = 1;
    const doorW = sp.type === 'castle' ? 12 : sp.type === 'palace' || sp.type === 'temple' || sp.type === 'guildhall' || sp.type === 'heroes' ? 10 : 8;
    const doorH = sp.type === 'castle' ? 16 : 12;
    const doorX = ox + Math.floor(W / 2) - Math.floor(doorW / 2);
    // ---- PAREDES
    const wallRect = (x, y, w, h) => {
      if (style === 'stone' || style === 'castle') {
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
    const window = (x, y, w = 5, h = 5, lit = '#f0d080') => {
      p(x - 1, y - 1, '#3a2a1a', w + 2, h + 2); p(x, y, lit, w, h); p(x + Math.floor(w / 2), y, '#3a2a1a', 1, h); p(x, y + Math.floor(h / 2), '#3a2a1a', w, 1); p(x, y, shade(lit, 0.4), 1, 1);
    };
    const door = (x, y, w, h, round) => {
      p(x - 1, y - 1, '#2a1a10', w + 2, h + 1);
      p(x, y, '#7a4a24', w, h); for (let xx = 1; xx < w; xx += 3) p(x + xx, y, '#5a3418', 1, h);
      p(x + w - 2, y + Math.floor(h / 2), '#e0c060');
      if (round) { p(x, y - 1, '#7a4a24', w, 1); p(x + 1, y - 2, '#7a4a24', w - 2, 1); }
    };
    // ---- TELHADOS
    const roofRect = (x, y, w, h) => {
      if (style === 'stone' || style === 'castle') {
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
        // telhado de duas águas (timber, log, stilt)
        for (let yy = 0; yy < h; yy++) {
          const shingleOff = (Math.floor(yy / 3) % 2) * 3;
          p(x, y + yy, yy % 3 === 2 ? rsh : roofC, w, 1);
          if (yy % 3 === 0) for (let xx = shingleOff; xx < w; xx += 6) p(x + xx, y + yy, rsh, 1, 3);
        }
        p(x, y, rhi, w, 2); p(x, y + h - 1, rdk, w, 1);
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
    } else if (style === 'hide') {
      // tenda orc
      for (let yy = 0; yy < H - 2; yy++) { const t = yy / (H - 2); const inset = Math.round((1 - t) * W * 0.42); p(ox + inset, yy + 2, Math.floor(yy / 4) % 2 ? roofC : rsh, W - inset * 2, 1); }
      p(ox + W / 2 - 1, 0, '#5a3a1a', 2, 6); p(ox + W / 2 - 4, 0, '#e8e0c8', 2, 4); p(ox + W / 2 + 2, 0, '#e8e0c8', 2, 4);
      for (let yy = H - doorH; yy < H; yy++) { const hw = Math.round((yy - (H - doorH)) * 0.4) + 2; p(ox + W / 2 - hw, yy, '#1a0e08', hw * 2, 1); }
      p(ox + 4, H - 10, '#c03030', 3, 6);
    } else {
      wallRect(ox, wallTop, W, wallH);
      const roofH = wallTop + 2;
      roofRect(ox - 1, 0, W + 2, roofH);
      // janelas
      const lit = style === 'elven' ? '#a0f0e0' : '#f0d080';
      const nwin = Math.floor((W - doorW) / 2 / 14);
      for (let i = 0; i < nwin; i++) { window(ox + 5 + i * 14, wallTop + 5, 5, 5, lit); window(ox + W - 10 - i * 14, wallTop + 5, 5, 5, lit); }
      door(doorX, H - doorH, doorW, doorH, style === 'round' || style === 'elven');
      if (style === 'round') { S.ellipse(p, doorX + doorW / 2, H - doorH / 2, doorW / 2 + 1, doorH / 2, '#2a6a2a'); p(doorX + doorW / 2, H - doorH / 2, '#e0c060'); }
      if (sp.type === 'guildhall' || sp.type === 'heroes') {
        const bc = sp.banner || '#e0b040';
        p(doorX - 8, wallTop + 2, bc, 5, 10); p(doorX + doorW + 3, wallTop + 2, bc, 5, 10);
        S.ellipse(p, ox + W / 2, wallTop - 4, 6, 5, '#c0c0c8'); S.ellipse(p, ox + W / 2, wallTop - 4, 4, 3, bc);
      }
      if (sp.chimney) { p(ox + W - 12, 0, '#7a6a6a', 5, 8); p(ox + W - 12, 0, '#9a8a8a', 5, 1); }
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

  // Cavalo (montaria)
  let horseC = null;
  S.horse = function () {
    if (horseC) return horseC;
    const mk = (f) => {
      const c = cv(24, 20), p = P(c.getContext('2d'));
      const col = '#7a4a2a', dk = '#4a2a1a', hi = '#9a6a3a';
      const legsOff = f === 1 ? [-1, 1, 1, -1] : f === 2 ? [1, -1, -1, 1] : [0, 0, 0, 0];
      [5, 7, 16, 18].forEach((x, i) => { for (let y = 0; y < 7; y++) p(x + (y > 3 ? legsOff[i] : 0), 12 + y, i % 2 ? col : dk, 2, 1); p(x + legsOff[i], 19, '#1a1a1a', 2, 1); });
      S.ellipse(p, 12, 10, 9, 4, col); p(5, 7, hi, 14, 1);
      p(18, 3, col, 4, 8); p(20, 1, col, 4, 4); p(23, 3, dk, 1, 2); p(21, 2, '#1a1010');
      p(17, 2, '#2a1a10', 2, 8); p(1, 8, '#2a1a10', 3, 7);
      p(9, 5, '#6a2a1a', 6, 3); p(10, 5, '#d0a030', 1, 1);
      S.outline(c); return c;
    };
    const right = [0, 1, 2].map(mk);
    horseC = { right, left: right.map(flip) };
    return horseC;
  };
})(Sprites);
