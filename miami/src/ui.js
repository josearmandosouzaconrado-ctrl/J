// Interface: barra do topo, seleção, produção, minimapa, marcadores, menus e controle direto
import { G } from './estado.js';
import { TIPOS, PRODUCAO, NOMES_PROD } from './tipos.js';
import { enfileirar, cancelar } from './jogo.js';
import { predios, canvasTerreno, LARG, ALT, lugares } from './mapa.js';
import { telaDe } from './entrada.js';
import { marcarSelecao, desembarcar, sairDoPredio, ordenar, entregarCivis, naZonaSegura } from './unidades.js';
import { somUI, somLigado, iniciarSom } from './som.js';

const $ = (s) => document.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const fmt = (n) => Math.floor(n).toLocaleString('pt-BR');

export class UI {
  constructor(camRTS) {
    this.cam = camRTS;
    this.pings = [];
    this.raiz = $('#ui');
    this.ov = $('#overlay');
    this.ctx = this.ov.getContext('2d');
    this.abaProd = 'quartel';
    this.montar();
    G.ui = this;
  }

  montar() {
    this.raiz.innerHTML = `
      <div id="topo">
        <span class="chip" id="t-din">💵 0</span>
        <span class="chip verde" id="t-res">✅ 0/0</span>
        <span class="chip" id="t-civ">🧍 0</span>
        <span class="chip verm" id="t-zum">🧟 0</span>
        <span class="chip" id="t-inf">☣️ 0%</span>
        <span class="chip" id="t-hora">☀️ Dia 1 08:00</span>
        <span class="esp"></span>
        <button class="bt" id="b-vel">1x</button>
        <button class="bt" id="b-pausa">⏸</button>
        <button class="bt" id="b-menu">⚙️</button>
      </div>
      <div id="alertas"></div>
      <div id="lateral">
        <button class="bt grande" id="b-prod">🏭<small>Produzir</small></button>
        <button class="bt" id="b-caixa">⬚<small>Caixa</small></button>
        <button class="bt" id="b-multi">➕<small>Várias</small></button>
        <button class="bt" id="b-terra">🪖<small>Tropas</small></button>
        <button class="bt" id="b-aereo">🚁<small>Aéreos</small></button>
        <button class="bt" id="b-naval">⚓<small>Navios</small></button>
        <button class="bt" id="b-jato">✈️<small>Jatos</small></button>
        <button class="bt" id="b-base">📍<small>Base</small></button>
        <button class="bt" id="b-porta">🛳️<small>Porta-av.</small></button>
        <button class="bt" id="b-alerta">⚠️<small>Alerta</small></button>
      </div>
      <canvas id="mini" width="220" height="128"></canvas>
      <div id="selecao" class="oculto"><div id="sel-info"></div><div id="sel-bts"></div></div>
      <div id="producao" class="oculto">
        <div class="cab"><b>Produção</b><span id="p-din"></span><button class="bt" id="p-fechar">✖</button></div>
        <div id="p-abas"></div>
        <div id="p-lista"></div>
        <div id="p-fila"></div>
      </div>
      <div id="info" class="oculto"></div>
      <div id="joy" class="oculto"><div id="joy-bola"></div></div>
      <button class="bt oculto" id="b-sair-controle">⏏ Sair do controle</button>
      <div id="creditos">Imagens/mapa © Esri, Maxar, Earthstar Geographics e comunidade GIS</div>
    `;
    const on = (id, fn) => $(id).addEventListener('click', (e) => { e.stopPropagation(); iniciarSom(); fn(e); });
    on('#b-pausa', () => { G.pausado = !G.pausado; this.atualizarTopo(); });
    on('#b-vel', () => { G.velocidade = G.velocidade >= 3 ? 1 : G.velocidade + 1; $('#b-vel').textContent = G.velocidade + 'x'; });
    on('#b-menu', () => this.menuPausa());
    on('#b-prod', () => this.abrirProducao());
    on('#p-fechar', () => $('#producao').classList.add('oculto'));
    on('#b-caixa', () => this.modoCaixa(!G.modoCaixa));
    on('#b-multi', () => { G.selecaoMultipla = !G.selecaoMultipla; $('#b-multi').classList.toggle('ativo', G.selecaoMultipla); });
    on('#b-terra', () => this.selecionarGrupo((u) => u.classe === 'inf' || u.classe === 'veic'));
    on('#b-aereo', () => this.selecionarGrupo((u) => u.classe === 'aereo'));
    on('#b-naval', () => this.selecionarGrupo((u) => u.classe === 'naval' && u.tipo !== 'portaavioes'));
    on('#b-jato', () => this.selecionarGrupo((u) => u.classe === 'jato'));
    on('#b-base', () => this.cam.irPara(G.estr.qg.x, G.estr.qg.z, 450));
    on('#b-porta', () => this.cam.irPara(G.porta.x, G.porta.z, 600));
    on('#b-alerta', () => { const a = [...G.alertas].reverse().find((x) => x.x != null); if (a) this.cam.irPara(a.x, a.z, Math.min(this.cam.dist, 350)); });
    on('#b-sair-controle', () => this.controlar(null));
    // minimapa
    const mini = $('#mini');
    const fundo = canvasTerreno(10);
    this.miniFundo = fundo;
    const tocarMini = (e) => {
      const r = mini.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * LARG, z = (e.clientY - r.top) / r.height * ALT;
      this.cam.irPara(x, z);
    };
    mini.addEventListener('pointerdown', (e) => { e.stopPropagation(); tocarMini(e); mini.setPointerCapture(e.pointerId); mini._arr = true; });
    mini.addEventListener('pointermove', (e) => { if (mini._arr) tocarMini(e); });
    mini.addEventListener('pointerup', () => { mini._arr = false; });
    // joystick
    const joy = $('#joy'), bola = $('#joy-bola');
    let jid = null;
    const mv = (e) => {
      const r = joy.getBoundingClientRect();
      let x = (e.clientX - r.left - r.width / 2) / (r.width / 2), y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      const m = Math.hypot(x, y); if (m > 1) { x /= m; y /= m; }
      G.joyUI = { x, y };
      bola.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
    };
    joy.addEventListener('pointerdown', (e) => { e.stopPropagation(); jid = e.pointerId; joy.setPointerCapture(jid); mv(e); });
    joy.addEventListener('pointermove', (e) => { if (e.pointerId === jid) mv(e); });
    const solta = () => { jid = null; G.joyUI = null; bola.style.transform = ''; };
    joy.addEventListener('pointerup', solta); joy.addEventListener('pointercancel', solta);
    for (const id of ['#topo', '#lateral', '#selecao', '#producao', '#info', '#alertas']) $(id).addEventListener('pointerdown', (e) => e.stopPropagation());
  }

  modoCaixa(v) { G.modoCaixa = v; $('#b-caixa').classList.toggle('ativo', v); }

  selecionarGrupo(f) {
    G.selecao.slice().forEach((u) => marcarSelecao(u, false));
    G.selecao = G.unidades.filter((u) => u.vivo && !u.estr && !u.dentro && f(u));
    G.selecao.forEach((u) => marcarSelecao(u, true));
    somUI('clique');
    this.atualizarSelecao();
    if (G.selecao.length) {
      let x = 0, z = 0; for (const u of G.selecao) { x += u.x; z += u.z; }
      if (G.selecao.length === 1 || G.selecao.every((u) => u.classe === 'jato')) this.cam.irPara(x / G.selecao.length, z / G.selecao.length);
    }
  }

  // ---------------- topo ----------------
  atualizarTopo() {
    $('#t-din').textContent = '💵 $' + fmt(G.dinheiro);
    $('#t-res').textContent = `✅ ${G.resgatados}/${G.meta}`;
    const presos = this._presos || 0;
    $('#t-civ').textContent = `🧍 ${G.nCivis || 0}` + (presos ? ` +${presos}🏢` : '');
    $('#t-zum').textContent = `🧟 ${G.nZumbis || 0}`;
    const inf = G.populacao ? Math.round(G.infectados / G.populacao * 100) : 0;
    $('#t-inf').textContent = `☣️ ${inf}%`;
    const h = Math.floor(G.hora || 8), m = Math.floor(((G.hora || 8) % 1) * 60);
    $('#t-hora').textContent = `${G.noite ? '🌙' : '☀️'} Dia ${G.dia || 1} ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    $('#b-pausa').textContent = G.pausado ? '▶' : '⏸';
    if (!$('#producao').classList.contains('oculto')) this.atualizarProducao();
  }

  // ---------------- alertas ----------------
  alerta(txt, x, z, tipo) {
    const box = $('#alertas');
    if (!box) return;
    const a = el('div', 'alerta ' + tipo, txt);
    if (x != null) { a.classList.add('clicavel'); a.addEventListener('click', (e) => { e.stopPropagation(); this.cam.irPara(x, z, Math.min(this.cam.dist, 350)); }); }
    box.prepend(a);
    while (box.children.length > 4) box.lastChild.remove();
    setTimeout(() => { a.classList.add('saindo'); setTimeout(() => a.remove(), 600); }, tipo === 'surto' ? 9000 : 5500);
  }

  ping(x, z, tipo) { this.pings.push({ x, z, tipo, t: 0 }); }

  // ---------------- seleção ----------------
  atualizarSelecao() {
    const s = G.selecao.filter((u) => u.vivo && !u.dentro);
    G.selecao = s;
    const box = $('#selecao');
    if (!s.length) { box.classList.add('oculto'); return; }
    box.classList.remove('oculto');
    const cont = {};
    for (const u of s) cont[u.tipo] = (cont[u.tipo] || 0) + 1;
    let html = Object.entries(cont).map(([t, n]) => `<span class="tag">${TIPOS[t].icone} ${n > 1 ? n + '× ' : ''}${TIPOS[t].nome}</span>`).join('');
    if (s.length === 1) {
      const u = s[0];
      html += `<div class="sub">${u.d.sub || ''}</div><div class="barra"><i style="width:${Math.max(0, u.hp / u.hpMax * 100)}%"></i></div>`;
      if (u.d.carga) {
        const civ = u.passageiros.filter((p) => p.agente).length, sol = u.passageiros.length - civ;
        html += `<div class="sub">Carga: ${u.cargaUsada}/${u.d.carga} • ${sol} militares, ${civ} civis</div>`;
      }
      if (u.predio) html += `<div class="sub">No telhado (${u.predio.guarnicao.length}/${u.predio.cap}) • estrutura ${Math.round(u.predio.integridade)}</div>`;
      if (u.classe === 'jato') html += `<div class="sub">${{ pronto: 'Pronto no convés', voando: 'Em missão', voltando: 'Voltando', rearmando: 'Rearmando...' }[u.estadoJato]} • munição ${u.municao}/${u.d.municao}</div>`;
    }
    $('#sel-info').innerHTML = html;
    const bts = $('#sel-bts');
    bts.innerHTML = '';
    const bt = (txt, fn, cls = '') => { const b = el('button', 'bt ' + cls, txt); b.addEventListener('click', (e) => { e.stopPropagation(); iniciarSom(); somUI('clique'); fn(); this.atualizarSelecao(); }); bts.appendChild(b); };
    bt('🛑 Parar', () => { for (const u of s) { u.ordem = null; u.caminho = null; u.alvo = null; if (u.classe === 'aereo') u.altAlvo = Math.max(u.y, u.d.altCruz * 0.6); } });
    if (s.some((u) => u.passageiros && u.passageiros.length)) bt('⬇️ Desembarcar', () => { for (const u of s) if (u.passageiros && u.passageiros.length) desembarcar(u); });
    if (s.some((u) => u.classe === 'aereo')) bt('🛬 Pousar', () => { for (const u of s) if (u.classe === 'aereo') u.ordem = { tipo: 'pousar' }; });
    if (s.some((u) => u.predio)) bt('🏃 Sair do prédio', () => { for (const u of s) if (u.predio) sairDoPredio(u); });
    if (s.some((u) => u.classe === 'jato')) bt('🛳️ Voltar', () => { for (const u of s) if (u.classe === 'jato' && u.estadoJato === 'voando') u.estadoJato = 'voltando'; });
    if (s.length === 1 && s[0].classe !== 'jato') bt('🎮 Controlar', () => this.controlar(s[0]), 'destaque');
    bt('🎥 Seguir', () => { this.cam.seguir = s[0]; if (this.cam.dist > 300) this.cam.dist = s[0].classe === 'inf' ? 60 : 150; });
    bt('✖', () => { s.forEach((u) => marcarSelecao(u, false)); G.selecao = []; });
  }

  controlar(u) {
    if (G.controlando) G.controlando.ordem = null;
    G.controlando = u;
    $('#joy').classList.toggle('oculto', !u);
    $('#b-sair-controle').classList.toggle('oculto', !u);
    $('#lateral').classList.toggle('oculto', !!u);
    $('#mini').classList.toggle('oculto', !!u);
    $('#selecao').classList.toggle('escondida', !!u);
    if (u) {
      this.cam.seguir = u;
      this.cam.dist = u.classe === 'inf' ? 22 : u.classe === 'aereo' ? 90 : u.classe === 'naval' ? (u.d.raio > 20 ? 400 : 90) : 45;
      this.cam.inclExtra = -0.1;
    } else { this.cam.inclExtra = 0; }
  }

  // ---------------- produção ----------------
  abrirProducao(aba) {
    if (aba) this.abaProd = aba;
    if (!PRODUCAO[this.abaProd]) this.abaProd = 'quartel';
    $('#producao').classList.remove('oculto');
    const abas = $('#p-abas');
    abas.innerHTML = '';
    for (const k in PRODUCAO) {
      const b = el('button', 'aba' + (k === this.abaProd ? ' ativo' : ''), NOMES_PROD[k]);
      b.addEventListener('click', (e) => { e.stopPropagation(); this.abaProd = k; this.abrirProducao(); });
      abas.appendChild(b);
    }
    const lista = $('#p-lista');
    lista.innerHTML = '';
    for (const t of PRODUCAO[this.abaProd]) {
      const d = TIPOS[t];
      const c = el('div', 'carta', `<div class="ic">${d.icone}</div><div class="tx"><b>${d.nome}</b><small>${d.sub}</small><span>$${d.custo} • ${d.tempo}s</span></div>`);
      c.dataset.custo = d.custo;
      c.addEventListener('click', (e) => { e.stopPropagation(); iniciarSom(); if (enfileirar(t)) this.atualizarProducao(); });
      lista.appendChild(c);
    }
    this.atualizarProducao();
  }

  atualizarProducao() {
    $('#p-din').textContent = ' 💵 $' + fmt(G.dinheiro);
    for (const c of document.querySelectorAll('#p-lista .carta')) c.classList.toggle('caro', G.dinheiro < +c.dataset.custo);
    const fonte = this.abaProd === 'porta' ? G.porta : G.estr[this.abaProd];
    const fila = $('#p-fila');
    if (!fonte || !fonte.vivo) { fila.innerHTML = '<i>Estrutura destruída</i>'; return; }
    const chave = fonte.fila.map((f) => f.tipo).join(',');
    if (fila._chave !== chave) {
      fila._chave = chave;
      fila.innerHTML = fonte.fila.length ? '' : '<i>Fila vazia — toque numa unidade para produzir</i>';
      fonte.fila.forEach((f, i) => {
        const b = el('div', 'item', `${TIPOS[f.tipo].icone}<i></i>`);
        b.title = 'Cancelar';
        b.addEventListener('click', (e) => { e.stopPropagation(); cancelar(this.abaProd, i); this.atualizarProducao(); });
        fila.appendChild(b);
      });
    }
    fonte.fila.forEach((f, i) => { const it = fila.children[i]; if (it && it.querySelector('i')) it.querySelector('i').style.width = (100 - f.t / f.total * 100) + '%'; });
  }

  infoPredio(p) {
    const box = $('#info');
    box.classList.remove('oculto');
    const tipo = p.base ? 'Prédio da base' : p.h > 60 ? 'Arranha-céu' : p.h > 15 ? 'Prédio' : 'Casa / loja';
    box.innerHTML = `<b>🏢 ${tipo}</b> • ${Math.round(p.h)} m de altura<br>
      Soldados no telhado: ${p.guarnicao.length}/${p.cap}<br>
      ${p.civis ? (p.sos ? `🆘 <b>${p.civis} civis presos</b> pedindo socorro!` : `🏠 ${p.civis} civis abrigados`) : 'Sem civis'}<br>
      <small>Selecione soldados e toque no prédio para colocá-los no telhado. Com civis dentro, as tropas os resgatam; helicópteros pegam pelo telhado.</small>`;
    clearTimeout(this._tInfo);
    this._tInfo = setTimeout(() => box.classList.add('oculto'), 6000);
  }

  // ---------------- minimapa ----------------
  desenharMini() {
    const c = $('#mini'), g = c.getContext('2d');
    const sx = c.width / LARG, sz = c.height / ALT;
    g.drawImage(this.miniFundo, 0, 0, c.width, c.height);
    g.fillStyle = '#ff3b3b';
    for (const a of G.agentes) if (a.vivo && a.zumbi && !a.dentro && a.estado !== 'morto') g.fillRect(a.x * sx - 0.5, a.z * sz - 0.5, 1.6, 1.6);
    g.fillStyle = '#ffffff';
    for (const a of G.agentes) if (a.vivo && !a.zumbi && !a.dentro && a.estado !== 'morto') g.fillRect(a.x * sx - 0.5, a.z * sz - 0.5, 1.2, 1.2);
    for (const p of predios) if (p.civis > 0) { g.fillStyle = p.sos ? '#ffd23b' : '#5bc0ff'; g.fillRect(p.cx * sx - 1.5, p.cz * sz - 1.5, 3, 3); }
    for (const u of G.unidades) {
      if (!u.vivo || u.dentro) continue;
      g.fillStyle = u.estr ? '#7ad1ff' : u.sel ? '#7dff8a' : '#3b8bff';
      const r = u.tipo === 'portaavioes' ? 3.5 : u.estr ? 2.5 : 2;
      g.fillRect(u.x * sx - r / 2, u.z * sz - r / 2, r, r);
    }
    // área vista
    const cs = [[0, 0], [innerWidth, 0], [innerWidth, innerHeight], [0, innerHeight]].map(([x, y]) => this.cam.chao(x, y));
    if (cs.every((p) => p)) {
      g.strokeStyle = 'rgba(255,255,255,0.8)'; g.lineWidth = 1;
      g.beginPath(); cs.forEach((p, i) => (i ? g.lineTo : g.moveTo).call(g, p.x * sx, p.z * sz)); g.closePath(); g.stroke();
    }
  }

  // ---------------- marcadores sobre o 3D ----------------
  desenharOverlay(dt) {
    const W = innerWidth, H = innerHeight, dpr = Math.min(2, devicePixelRatio || 1);
    if (this.ov.width !== Math.round(W * dpr)) { this.ov.width = Math.round(W * dpr); this.ov.height = Math.round(H * dpr); }
    const g = this.ctx;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);
    const cam = this.cam.cam, longe = this.cam.dist > 900;
    G.longe = longe;
    // visão estratégica: pontos
    if (longe) {
      for (const a of G.agentes) {
        if (!a.vivo || a.dentro || a.estado === 'morto') continue;
        const t = telaDe(a.x, 0, a.z, cam);
        if (!t || t.x < 0 || t.y < 0 || t.x > W || t.y > H) continue;
        g.fillStyle = a.zumbi ? '#ff2a2a' : '#ffffff';
        g.fillRect(t.x - 1.5, t.y - 1.5, 3, 3);
      }
      for (const u of G.unidades) {
        if (!u.vivo || u.dentro || u.estr) continue;
        const t = telaDe(u.x, u.y, u.z, cam);
        if (!t) continue;
        g.fillStyle = u.sel ? '#5dff6f' : '#3d8bff';
        g.strokeStyle = '#001b44';
        g.beginPath(); g.arc(t.x, t.y, u.classe === 'inf' ? 3 : 5, 0, 6.29); g.fill(); g.stroke();
      }
    }
    // prédios com civis / soldados
    g.textAlign = 'center'; g.textBaseline = 'middle';
    for (const p of predios) {
      if (!(p.civis > 0 || p.guarnicao.length)) continue;
      const t = telaDe(p.cx, p.h + 4, p.cz, cam);
      if (!t || t.x < -40 || t.y < -40 || t.x > W + 40 || t.y > H + 40) continue;
      let y = t.y;
      if (p.civis > 0) {
        const pis = p.sos ? (Math.sin(performance.now() / 250) > 0 ? '#ff3030' : '#ffd23b') : '#2e8bd8';
        g.fillStyle = pis; rr(g, t.x - 26, y - 11, 52, 20, 6); g.fill();
        g.fillStyle = '#fff'; g.font = 'bold 12px sans-serif';
        g.fillText((p.sos ? 'SOS ' : '🏠 ') + p.civis, t.x, y);
        y -= 24;
      }
      if (p.guarnicao.length) {
        g.fillStyle = 'rgba(20,70,20,0.85)'; rr(g, t.x - 24, y - 10, 48, 18, 5); g.fill();
        g.fillStyle = '#bfffbf'; g.font = 'bold 11px sans-serif';
        g.fillText('🪖 ' + p.guarnicao.length + '/' + p.cap, t.x, y - 1);
        const f = p.integridade / p.integMax;
        g.fillStyle = '#300'; g.fillRect(t.x - 22, y + 6, 44, 3);
        g.fillStyle = f > 0.5 ? '#4f4' : f > 0.2 ? '#fd3' : '#f33'; g.fillRect(t.x - 22, y + 6, 44 * f, 3);
      }
    }
    // barras de vida
    for (const u of G.unidades) {
      if (!u.vivo || u.dentro) continue;
      if (!(u.sel || u.hp < u.hpMax * 0.98) || (longe && !u.sel)) continue;
      const alt = u.classe === 'inf' ? 2.3 : u.estr ? 22 : (u.d.raio || 2) * 0.9 + 2;
      const t = telaDe(u.x, u.y + alt, u.z, cam);
      if (!t) continue;
      const w = u.estr ? 60 : u.classe === 'inf' ? 18 : 34, f = Math.max(0, u.hp / u.hpMax);
      g.fillStyle = 'rgba(0,0,0,0.6)'; g.fillRect(t.x - w / 2 - 1, t.y - 1, w + 2, 5);
      g.fillStyle = f > 0.6 ? '#46e05a' : f > 0.3 ? '#f2d43a' : '#ef3b3b'; g.fillRect(t.x - w / 2, t.y, w * f, 3);
      if (u.sel && u.classe === 'inf') { g.strokeStyle = '#5dff6f'; g.lineWidth = 1.5; g.beginPath(); g.arc(t.x, t.y + 14, 9, 0, 6.29); g.stroke(); }
      if (u.d.carga && u.passageiros.length) { g.fillStyle = '#fff'; g.font = '10px sans-serif'; g.fillText(`${u.passageiros.length}👤`, t.x, t.y - 8); }
    }
    // pings de comando
    for (let i = this.pings.length - 1; i >= 0; i--) {
      const p = this.pings[i];
      p.t += dt;
      if (p.t > 0.8) { this.pings.splice(i, 1); continue; }
      const t = telaDe(p.x, 0.5, p.z, cam);
      if (!t) continue;
      const cor = { mover: '#5dff6f', atacar: '#ff4040', embarque: '#5bc0ff', guarnecer: '#ffd23b', resgate: '#ffd23b' }[p.tipo] || '#fff';
      g.strokeStyle = cor; g.lineWidth = 2.5; g.globalAlpha = 1 - p.t / 0.8;
      g.beginPath(); g.arc(t.x, t.y, 6 + p.t * 30, 0, 6.29); g.stroke();
      g.globalAlpha = 1;
    }
    // caixa de seleção
    if (G.caixa) {
      const c = G.caixa;
      g.strokeStyle = '#5dff6f'; g.lineWidth = 1.5; g.fillStyle = 'rgba(93,255,111,0.12)';
      g.fillRect(Math.min(c.x0, c.x1), Math.min(c.y0, c.y1), Math.abs(c.x1 - c.x0), Math.abs(c.y1 - c.y0));
      g.strokeRect(Math.min(c.x0, c.x1), Math.min(c.y0, c.y1), Math.abs(c.x1 - c.x0), Math.abs(c.y1 - c.y0));
    }
    // noite: escurece um pouco a tela
  }

  // ---------------- menus ----------------
  menuPausa() {
    G.pausado = true; this.atualizarTopo();
    const m = this.modal(`<h2>Pausado</h2>
      <button class="bt grande" data-a="voltar">▶ Continuar</button>
      <button class="bt" data-a="ajuda">❓ Como jogar</button>
      <label><input type="checkbox" data-a="sat" ${G.cfg.satelite ? 'checked' : ''}> 🛰️ Imagens de satélite (precisa de internet)</label>
      <label><input type="checkbox" data-a="som" ${G.cfg.som ? 'checked' : ''}> 🔊 Som</label>
      <button class="bt" data-a="nova">🔄 Nova partida</button>`);
    m.querySelector('[data-a=voltar]').onclick = () => { m.remove(); G.pausado = false; this.atualizarTopo(); };
    m.querySelector('[data-a=ajuda]').onclick = () => this.ajuda();
    m.querySelector('[data-a=sat]').onchange = (e) => { G.cfg.satelite = e.target.checked; G.ligarSatelite && G.ligarSatelite(e.target.checked); G.salvarCfg(); };
    m.querySelector('[data-a=som]').onchange = (e) => { G.cfg.som = e.target.checked; somLigado(e.target.checked); G.salvarCfg(); };
    m.querySelector('[data-a=nova]').onclick = () => location.reload();
  }

  ajuda() {
    const m = this.modal(`<h2>Como jogar</h2><div class="ajuda">${AJUDA}</div><button class="bt grande" data-a="ok">Entendi</button>`);
    m.querySelector('[data-a=ok]').onclick = () => m.remove();
  }

  modal(html) {
    const m = el('div', 'modal', `<div class="caixa">${html}</div>`);
    m.addEventListener('pointerdown', (e) => e.stopPropagation());
    document.body.appendChild(m);
    return m;
  }

  fim(venceu, txt) {
    const min = Math.floor(G.tempo / 60);
    const m = this.modal(`<h2>${venceu ? '🏆 Vitória!' : '☠️ Derrota'}</h2><p>${txt}</p>
      <div class="stats">✅ Civis resgatados: <b>${G.resgatados}</b><br>🧟 Zumbis eliminados: <b>${G.zumbisMortos}</b><br>
      ☣️ Pessoas infectadas: <b>${G.infectados}</b><br>💀 Civis mortos: <b>${G.civisMortos}</b><br>🪖 Unidades perdidas: <b>${G.perdas}</b><br>⏱️ Tempo: <b>${min} min</b> (dia ${G.dia})</div>
      ${venceu ? '<button class="bt grande" data-a="cont">Continuar jogando</button>' : ''}
      <button class="bt grande" data-a="nova">🔄 Nova partida</button>`);
    const c = m.querySelector('[data-a=cont]');
    if (c) c.onclick = () => { m.remove(); G.pausado = false; G.meta = 99999; this.atualizarTopo(); };
    m.querySelector('[data-a=nova]').onclick = () => location.reload();
  }

  quadro(dt) {
    this._t = (this._t || 0) + dt;
    this._tm = (this._tm || 0) + dt;
    if (this._t > 0.25) {
      this._t = 0;
      this._presos = predios.reduce((s, p) => s + (p.base ? 0 : p.civis), 0);
      this.atualizarTopo();
      if (G.selecao.length) this.atualizarSelecaoLeve();
    }
    if (this._tm > 0.5) { this._tm = 0; this.desenharMini(); }
    this.desenharOverlay(dt);
  }

  atualizarSelecaoLeve() {
    // atualiza só textos (sem recriar botões) a cada 1s
    this._ts = (this._ts || 0) + 1;
    if (this._ts % 4 === 0) this.atualizarSelecao();
  }
}

function rr(g, x, y, w, h, r) {
  g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}

export const AJUDA = `
<p><b>Objetivo:</b> um surto zumbi começou em Miami e se espalha aos poucos. Resgate os civis e leve-os para a <b>Zona Segura</b> da base (no Porto de Miami) ou para o <b>porta-aviões</b>. Se o Quartel-General cair, você perde.</p>
<p><b>Câmera:</b> arraste com um dedo para mover • pinça com dois dedos para zoom • gire os dois dedos para rodar • arraste dois dedos para cima/baixo para inclinar. No PC: arraste, roda do mouse, botão direito gira, WASD e Q/E.</p>
<p><b>Selecionar:</b> toque numa unidade. Toque duplo seleciona todas do mesmo tipo na tela. Segure o dedo parado e arraste para selecionar em caixa (ou use ⬚ Caixa). ➕ Várias soma unidades à seleção. Os botões 🪖 🚁 ⚓ ✈️ selecionam grupos.</p>
<p><b>Ordens</b> (com unidades selecionadas): toque no chão para mover • num zumbi para atacar • num <b>prédio</b> para pôr os soldados no telhado (atiram de cima com mais alcance) • num prédio com <b>SOS</b> para resgatar os civis presos (helicópteros pegam pelo telhado) • num <b>veículo, helicóptero ou barco</b> para embarcar as tropas • com aeronaves selecionadas, toque no porta-aviões para pousar no convés.</p>
<p><b>Civis</b> seguem soldados e veículos que chegam perto e entram sozinhos em transportes. Leve-os para a zona segura: ao chegar lá, são resgatados (+$40 cada). Civis que acenam viram você ao longe.</p>
<p><b>Produção:</b> 🏭 Produzir abre o Quartel (infantaria), o Pátio (Humvee, Stryker, Bradley, Abrams, Paladin, HIMARS, ambulância), o Heliporto (Black Hawk, Chinook, Apache, drone Reaper), as Docas (lancha, hovercraft LCAC, destróier) e o porta-aviões (F-35, F/A-18, Osprey).</p>
<p><b>Jatos:</b> selecione um jato e toque no mapa: ele decola do porta-aviões, bombardeia o ponto e volta para rearmar.</p>
<p><b>🎮 Controlar:</b> com uma unidade selecionada, assuma o controle em 3ª pessoa com o joystick; ela atira sozinha nos zumbis.</p>
<p><b>Dicas:</b> tiros e explosões fazem barulho e atraem zumbis. À noite eles ficam mais rápidos. A partir do dia 2 chegam hordas do continente e aparecem zumbis corredores; no dia 3, brutamontes. Cuidado com o fogo amigo de artilharia perto de civis.</p>`;
