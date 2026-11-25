'use strict';
// =====================================================================
//  CASAL NO MULTIPLAYER — dois jogadores (um homem e uma mulher, os dois
//  adultos) podem namorar, casar e ter filhos juntos.
//  No menu do outro jogador (💬 → nome): 💌 Pedir em namoro. Namorando:
//  💕 mandar um carinho, 💍 pedir em casamento (aliança de 200 de ouro) e
//  💔 terminar. Casados: 👶 ter um filho (os dois perto um do outro no
//  mundo). O bebê nasce 3 dias depois nos dois jogos, com o mesmo nome e o
//  mesmo rosto, e entra na lista de filhos de cada um.
//  As mensagens vão só para o outro jogador (tipo "rel" no servidor/sala).
// =====================================================================
const CASAL_IDADE = 16, CASAL_GESTACAO = 3, CASAL_FILHOS_MAX = 8, CASAL_ALIANCA = 200;
const CasalMP = {
  P() { return Game.player; },
  par() { const P = this.P(); return P && P.casalMP; },
  sexo() { const P = this.P(); return (P && P.app && P.app.sex) === 'f' ? 'f' : 'm'; },
  adulto() { try { return Geracoes.anos() >= CASAL_IDADE; } catch (e) { return true; } },
  ela(sx) { return sx === 'f'; },
  eu() { const P = this.P(); return { sexo: this.sexo(), adulto: this.adulto(), nome: P.name, race: P.race }; },
  send(id, k, d) { Rede.send({ t: 'rel', to: id, k, d: d || {} }); },
  pedidos: {},          // pedidos que eu mandei e esperam resposta: id → tipo
  // ---------- o menu do outro jogador ----------
  opcoes(o) {
    const C = this.par(), P = this.P(), ops = [];
    if (!C) {
      ops.push({ label: '💌 Pedir em namoro', cls: 'gold', fn: () => {
        if (!this.adulto()) return Game.toast(`Só depois dos ${CASAL_IDADE} anos.`, '#ffb080');
        if (P.spouse) return Game.toast('Você já é casado(a) com alguém do jogo.', '#ffb080');
        this.pedidos[o.id] = 'namoro'; this.send(o.id, 'namoro', this.eu());
        Game.toast(`💌 Pedido de namoro enviado para ${o.nome}.`, '#ffb0d0'); UI.close();
      } });
    } else if (C.id === o.id) {
      ops.push({ label: '💕 Mandar um carinho', fn: () => { this.send(o.id, 'carinho', {}); Game.toast(`💕 Você mandou um carinho para ${o.nome}.`, '#ffb0d0'); UI.close(); } });
      if (C.fase === 'namoro') ops.push({ label: `💍 Pedir em casamento (aliança: ${CASAL_ALIANCA} ouro)`, cls: 'gold', fn: () => {
        if (P.gold < CASAL_ALIANCA) return Game.toast(`A aliança custa ${CASAL_ALIANCA} de ouro.`, '#ff8080');
        this.pedidos[o.id] = 'casar'; this.send(o.id, 'casar', this.eu()); Game.toast(`💍 Você pediu ${o.nome} em casamento! Esperando a resposta...`, '#ffd0e0'); UI.close();
      } });
      if (C.fase === 'casados') ops.push({ label: '👶 Vamos ter um filho?', cls: 'gold', fn: () => this.pedirFilho(o) });
      ops.push({ label: C.fase === 'casados' ? '💔 Pedir o divórcio' : '💔 Terminar o namoro', cls: 'danger', fn: () => UI.confirm(`${C.fase === 'casados' ? 'Divorciar de' : 'Terminar com'} <b>${esc(o.nome)}</b>?<br><small class="dim">Os filhos continuam sendo seus.</small>`, () => { this.send(o.id, 'fim', {}); this.terminar(`Você ${C.fase === 'casados' ? 'se divorciou de' : 'terminou com'} ${o.nome}.`); UI.close(); }, () => Rede.menu(o)) });
    }
    return ops;
  },
  statusTxt(o) {
    const C = this.par(); if (!C) return '';
    if (C.id === o.id) return `<br><span style="color:#ff90c0">${C.fase === 'casados' ? `💍 Casados desde o dia ${C.casouDia}` : `💕 Namorando desde o dia ${C.desde}`}${C.filhos ? ` • ${C.filhos} filho(s) juntos` : ''}${C.gravidez ? ` • 👶 bebê a caminho (dia ${C.gravidez.dia})` : ''}</span>`;
    return `<br><span class="dim">Você está com ${esc(C.nome)}.</span>`;
  },
  pedirFilho(o) {
    const C = this.par(), P = this.P(), G = Game;
    if (C.gravidez) return Game.toast('Já tem um bebê a caminho!', '#ffd0e0');
    if (C.filhos >= CASAL_FILHOS_MAX) return Game.toast('Vocês já têm filhos demais para cuidar!', '#ffb080');
    if (C.ultimoFilho && G.day - C.ultimoFilho < 3) return Game.toast(`O bebê ainda é muito pequeno. Esperem até o dia ${C.ultimoFilho + 3}.`, '#ffb080');
    if (!G.level || !G.level.isWorld || o.area !== 'w' || dist(o.x, o.y, P.x, P.y) > 16 * 12) return Game.toast(`Fique pertinho de ${o.nome} no mundo para isso.`, '#ffb080');
    // o bebê é decidido aqui e vai igual para os dois jogos
    const rng = new RNG(Date.now() & 0xffffff), race = rng.chance(0.5) && C.race && NAMES[C.race] ? C.race : P.race, sex = rng.chance(0.5) ? 'm' : 'f';
    const look = npcLook(race, sex, rng, 'kid'); look.short = 3; look.blush = true; delete look.beard;
    const crianca = { id: 'kmp' + Date.now().toString(36), name: rng.pick(NAMES[race][sex]), race, sex, look, mp: true };
    this.pedidos[o.id] = { filho: crianca };
    this.send(o.id, 'filho', { crianca });
    Game.toast(`👶 Você perguntou a ${o.nome} se querem ter um filho...`, '#ffd0e0'); UI.close();
  },
  // ---------- mensagens do outro jogador ----------
  receber(m) {
    const P = this.P(); if (!P) return;
    const d = m.d || {}, C = this.par(), o = Rede.outros.get(m.from), look = o ? o.look : null, nome = String(m.nome || 'Alguém').slice(0, 20);
    const recusar = (k, motivo) => this.send(m.from, k, { ok: false, motivo });
    switch (m.k) {
      case 'namoro': {
        if (C) return recusar('namoroR', `${P.name} já está com outra pessoa.`);
        if (P.spouse) return recusar('namoroR', `${P.name} já é casado(a).`);
        if (!this.adulto()) return recusar('namoroR', `${P.name} ainda é criança.`);
        if (!d.adulto) return recusar('namoroR', `${P.name} só namora gente adulta.`);
        if (d.sexo === this.sexo()) return recusar('namoroR', 'Aqui o namoro é entre um homem e uma mulher.');
        UI.dialog('💌 Pedido de namoro', look, `<b>${esc(nome)}</b> quer namorar com você!`, [
          { label: '💕 Aceitar', cls: 'gold', fn: () => { this.comecar(m.from, nome, d); this.send(m.from, 'namoroR', Object.assign({ ok: true }, this.eu())); UI.close(); } },
          { label: 'Agora não', fn: () => { recusar('namoroR', `${P.name} disse "agora não".`); UI.close(); } }
        ]);
        return;
      }
      case 'namoroR': {
        if (this.pedidos[m.from] !== 'namoro') return; delete this.pedidos[m.from];
        if (!d.ok) return Game.toast(`💔 ${d.motivo || nome + ' recusou.'}`, '#ffb0b0');
        if (C || d.sexo === this.sexo()) return;
        this.comecar(m.from, nome, d);
        return;
      }
      case 'carinho': {
        if (!C || C.id !== m.from) return;
        Game.toast(`💕 ${nome} mandou um carinho para você!`, '#ffb0d0');
        P.hp = Math.min(P.stat.maxHp, P.hp + P.stat.maxHp * 0.1);
        if (Game.level && Game.level.isWorld) Game.burst(P.x, P.y - 24, '#ff80b0', 10, 40);
        return;
      }
      case 'casar': {
        if (!C || C.id !== m.from || C.fase !== 'namoro') return recusar('casarR', 'Vocês precisam estar namorando.');
        UI.dialog('💍 Pedido de casamento', look, `<b>${esc(nome)}</b> se ajoelhou com uma aliança na mão: <i>"Quer casar comigo?"</i>`, [
          { label: '💍 Sim, eu aceito!', cls: 'gold', fn: () => { this.casar(); this.send(m.from, 'casarR', { ok: true }); UI.close(); } },
          { label: 'Ainda não', fn: () => { recusar('casarR', `${P.name} pediu um pouco mais de tempo.`); UI.close(); } }
        ]);
        return;
      }
      case 'casarR': {
        if (this.pedidos[m.from] !== 'casar') return; delete this.pedidos[m.from];
        if (!d.ok) return Game.toast(`💔 ${d.motivo || nome + ' recusou.'}`, '#ffb0b0');
        if (!C || C.id !== m.from) return;
        P.gold = Math.max(0, P.gold - CASAL_ALIANCA);
        this.casar();
        Rede.send({ t: 'chat', txt: `💍 ${P.name} e ${nome} se casaram!` });
        return;
      }
      case 'filho': {
        if (!C || C.id !== m.from || C.fase !== 'casados') return recusar('filhoR', 'Só casados.');
        if (C.gravidez) return recusar('filhoR', 'Já tem um bebê a caminho.');
        const k = d.crianca; if (!k || !k.name || !NAMES[k.race]) return;
        UI.dialog('👶 Um filho?', look, `<b>${esc(nome)}</b> pergunta: <i>"Vamos ter um filho?"</i>`, [
          { label: '❤ Vamos!', cls: 'gold', fn: () => { this.gravidez(k); this.send(m.from, 'filhoR', { ok: true }); UI.close(); } },
          { label: 'Ainda não', fn: () => { recusar('filhoR', `${P.name} quer esperar mais um pouco.`); UI.close(); } }
        ]);
        return;
      }
      case 'filhoR': {
        const pd = this.pedidos[m.from]; if (!pd || !pd.filho) return; delete this.pedidos[m.from];
        if (!d.ok) return Game.toast(`${d.motivo || nome + ' quer esperar.'}`, '#ffd0e0');
        if (C && C.id === m.from) this.gravidez(pd.filho);
        return;
      }
      case 'fim': {
        if (!C || C.id !== m.from) return;
        this.terminar(`💔 ${nome} ${C.fase === 'casados' ? 'pediu o divórcio' : 'terminou com você'}.`);
        return;
      }
    }
  },
  // ---------- o casal ----------
  comecar(id, nome, d) {
    const P = this.P();
    P.casalMP = { id, nome, sexo: d.sexo === 'f' ? 'f' : 'm', race: NAMES[d.race] ? d.race : 'humano', fase: 'namoro', desde: Game.day, filhos: 0 };
    Game.centerMsg('💕 NAMORANDO!', `${P.name} e ${nome}`); Sfx.play('quest');
    Game.chron(`Comecei a namorar ${nome}.`);
  },
  casar() {
    const P = this.P(), C = this.par();
    C.fase = 'casados'; C.casouDia = Game.day;
    Game.centerMsg('💍 CASAMENTO!', `${P.name} e ${C.nome} agora são marido e mulher`); Sfx.play('levelup');
    Game.chron(`Casei com ${C.nome}.`);
    try { Vida.honra(3, 'casei'); } catch (e) { }
  },
  gravidez(k) {
    const C = this.par(); if (!C) return;
    C.gravidez = { dia: Game.day + CASAL_GESTACAO, crianca: k };
    const mae = this.sexo() === 'f' ? 'Você está' : `${C.nome} está`;
    Game.centerMsg('👶 UM BEBÊ A CAMINHO!', `${mae} grávida • nasce no dia ${C.gravidez.dia}`); Sfx.play('quest');
    Game.chron(`${mae} esperando um bebê.`);
  },
  terminar(txt) {
    const P = this.P(); P.casalMP = null;
    Game.toast(txt, '#ffb0b0'); Game.chron(txt.replace(/^💔 /, ''));
  },
  dia() {
    const P = this.P(), C = this.par(); if (!C || !C.gravidez || Game.day < C.gravidez.dia) return;
    const k = Object.assign({}, C.gravidez.crianca, { born: Game.day, pais: [P.name, C.nome] });
    C.gravidez = null; C.filhos = (C.filhos || 0) + 1; C.ultimoFilho = Game.day;
    if (!(P.children || []).some(x => x.id === k.id)) (P.children = P.children || []).push(k);
    Game.centerMsg('SEU BEBÊ NASCEU!', `${k.sex === 'm' ? 'O pequeno' : 'A pequena'} ${k.name}, filho(a) de ${P.name} e ${C.nome}`); Sfx.play('levelup');
    Game.chron(`Nasceu ${k.name}, meu(minha) filho(a) com ${C.nome}.`);
  },
  secaoFamilia() {
    const C = this.par(); if (!C) return '';
    const on = typeof Rede !== 'undefined' && Rede.on && Rede.outros.has(C.id);
    return `<h3>💞 Multiplayer</h3><div class="quest">${C.fase === 'casados' ? `💍 Casado(a) com <b>${esc(C.nome)}</b> desde o dia ${C.casouDia}` : `💕 Namorando <b>${esc(C.nome)}</b> desde o dia ${C.desde}`} ${on ? '<span class="good">(online)</span>' : '<span class="dim">(offline)</span>'}<br><small>Filhos juntos: ${C.filhos || 0}${C.gravidez ? ` • 👶 bebê a caminho: nasce no dia ${C.gravidez.dia}` : ''}. Para falar com ${esc(C.nome)}, abra 💬 e toque no nome.</small></div>`;
  }
};
(function () {
  const r0 = Rede.receber;
  Rede.receber = function (m, cb) { if (m && m.t === 'rel') { try { CasalMP.receber(m); } catch (e) { console.warn('Casal', e); } return; } return r0.apply(this, arguments); };
  // as opções de namoro entram no menu do outro jogador
  const mn0 = Rede.menu;
  Rede.menu = function (o) {
    const d0 = UI.dialog;
    UI.dialog = function (n, l, html, ops) {
      UI.dialog = d0;
      try { const ex = CasalMP.opcoes(o), i = ops.findIndex(x => x.label === 'Voltar'); ops.splice(i < 0 ? ops.length : i, 0, ...ex); html += CasalMP.statusTxt(o); } catch (e) { console.warn('Casal', e); }
      return d0.call(this, n, l, html, ops);
    };
    try { return mn0.apply(this, arguments); } finally { UI.dialog = d0; }
  };
  const tj0 = Player.prototype.toJSON;
  Player.prototype.toJSON = function () { const o = tj0.call(this); if (this.casalMP) o.casalMP = this.casalMP; return o; };
  const dt0 = Game.dayTick; Game.dayTick = function () { const r = dt0.apply(this, arguments); try { CasalMP.dia(); } catch (e) { } return r; };
  const ft0 = UI.familyTab;
  UI.familyTab = function (f) { let h = ft0.call(this, f); try { h = CasalMP.secaoFamilia() + h; } catch (e) { } return h; };
})();
