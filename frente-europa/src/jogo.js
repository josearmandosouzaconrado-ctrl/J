// Simulação: unidades, estruturas, combate, transporte, captura de cidades, economia e IA do Eixo.
import * as THREE from 'three';
import { CIDADES, ESTRUTURAS, TIPOS } from './dados.js';
import { paraMundo } from './geo.js';
import { chao, ehAgua } from './relevo.js';
import { instanciar, rotulo, texturaIcone } from './modelos.js';
import { paraquedas } from './efeitos.js';
import { tocar } from './audio.js';

export const ALIADOS = 0, EIXO = 1;
const CEL = 1500;
const DOIS_PI = Math.PI * 2;
const angDif = (a, b) => { let d = (a - b) % DOIS_PI; if (d > Math.PI) d -= DOIS_PI; if (d < -Math.PI) d += DOIS_PI; return d; };
const classe = (e) => (e.est ? 'b' : e.cat === 'air' ? (e.estado === 'voando' ? 'a' : 't') : e.cat === 'ship' ? 's' : 't');

let proxId = 1;

class Entidade {
  constructor(jogo, fac, x, z) {
    this.jogo = jogo; this.id = proxId++; this.fac = fac; this.x = x; this.z = z; this.y = 0; this.hd = 0;
    this.vivo = true; this.cds = []; this.alvos = []; this.busca = Math.random() * 0.5;
  }
  get pos() { return { x: this.x, y: this.y, z: this.z }; }
  _visual(nomeModelo, cat) {
    this.obj = new THREE.Group();
    this.modelo = instanciar(nomeModelo, this.fac);
    this.obj.add(this.modelo);
    this.icone = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaIcone(cat, this.fac), depthTest: false, transparent: true }));
    this.icone.material.sizeAttenuation = false;
    this.icone.scale.setScalar(cat === 'est' ? 0.05 : 0.04);
    this.icone.renderOrder = 10;
    this.jogo.cena.add(this.obj);
    this.jogo.cena.add(this.icone);
  }
  destruirVisual() {
    this.jogo.cena.remove(this.obj);
    this.jogo.cena.remove(this.icone);
    if (this.anel) this.jogo.cena.remove(this.anel);
  }
}

export class Unidade extends Entidade {
  constructor(jogo, tipo, fac, x, z) {
    super(jogo, fac, x, z);
    this.tipo = tipo;
    this.def = TIPOS[tipo];
    this.cat = this.def.cat;
    this.hp = this.hpMax = this.def.hp;
    this.estado = this.cat === 'air' ? 'voando' : 'solo';
    this.ordem = null;
    this.carga = [];
    this.dentro = null;
    this.v = this.cat === 'air' ? this.def.vel : 0;
    this.pitch = 0; this.bank = 0;
    this.cds = this.def.armas.map(() => Math.random());
    this.alvos = this.def.armas.map(() => null);
    this.y = chao(x, z, false) ?? 0;
    if (this.estado === 'voando') this.y += this.def.alt;
    this._visual(this.def.modelo, this.cat);
    if (this.def.lod) { // versão leve para quando a câmera está longe
      this.lod = instanciar(this.def.lod, fac);
      this.lod.visible = false;
      this.obj.add(this.lod);
    }
    if (this.cat === 'inf') this.passo = Math.random() * 6;
  }
  get nome() { return this.def.nome + (this.fac === EIXO ? ' (Eixo)' : ''); }
  get capacidade() { return this.def.cap || 0; }
  get transporte() { return this.capacidade > 0; }
  get voa() { return this.cat === 'air'; }
}

export class Estrutura extends Entidade {
  constructor(jogo, tipo, fac, x, z, rot = 0, pronta = true) {
    super(jogo, fac, x, z);
    this.est = true;
    this.tipo = tipo;
    this.def = ESTRUTURAS[tipo];
    this.cat = 'est';
    this.hpMax = this.def.hp;
    this.hp = pronta ? this.hpMax : this.hpMax * 0.1;
    this.construindo = pronta ? 0 : this.def.tempo || 10;
    this.hd = rot * Math.PI / 180;
    this.fila = [];
    this.guarnicao = [];
    this.estacionados = 0;
    const armas = this.def.armas || [];
    this.cds = armas.map(() => Math.random());
    this.alvos = armas.map(() => null);
    this.y = chao(x, z, false) ?? 0;
    this._visual(this.def.modelo, 'est');
  }
  get nome() { return this.def.nome + (this.fac === EIXO ? ' (Eixo)' : ''); }
  get armas() {
    const a = [...(this.def.armas || [])];
    for (const u of this.guarnicao) for (const w of u.def.armas) a.push({ ...w, alc: w.alc * 1.2 });
    return a;
  }
}

export class Jogo {
  constructor(cena) {
    this.cena = cena;
    this.unidades = [];
    this.estruturas = [];
    this.cidades = [];
    this.dinheiro = [0, 0];
    this.tempo = 0;            // segundos de jogo
    this.relogio = Date.UTC(1944, 5, 6, 6, 30) / 1000;
    this.eventos = [];         // impactos atrasados (granadas, bombas)
    this.msgs = [];
    this.fx = null;
    this.grade = new Map();
    this.timerCaptura = 0; this.timerRenda = 0; this.timerIA = 0; this.timerFim = 0;
    this.fim = null;
    this.camPos = new THREE.Vector3();
    this.cidadesGrupo = new THREE.Group();
    cena.add(this.cidadesGrupo);
  }

  msg(t, fac = ALIADOS) { if (fac === ALIADOS) this.msgs.push(t); }

  // -------------------------------------------------------------- criação
  carregarCenario(c) {
    this.cenario = c;
    this.dinheiro = [c.dinheiro, c.dinheiro * 0.6];
    for (const cd of CIDADES) {
      const p = paraMundo(cd.lat, cd.lon);
      const cid = { ...cd, x: p.x, z: p.z, ctrl: cd.dono === 0 ? -100 : cd.dono === 1 ? 100 : 0 };
      const r = rotulo(cd.nome);
      cid.rot = new THREE.Sprite(new THREE.SpriteMaterial({ map: r.textura, depthTest: false, transparent: true }));
      cid.rot.material.sizeAttenuation = false;
      cid.rot.scale.set(0.022 * r.aspecto, 0.022, 1);
      cid.rot.center.set(0.5, -0.6);
      cid.rot.renderOrder = 11;
      cid.bandeira = new THREE.Sprite(new THREE.SpriteMaterial({ depthTest: false, transparent: true }));
      cid.bandeira.material.sizeAttenuation = false;
      cid.bandeira.scale.setScalar(0.03);
      cid.bandeira.renderOrder = 11;
      this.cidadesGrupo.add(cid.rot, cid.bandeira);
      this._corCidade(cid);
      this.cidades.push(cid);
    }
    for (const [fac, lado] of [[ALIADOS, c.aliados], [EIXO, c.eixo]]) {
      for (const e of lado.estruturas) {
        const p = paraMundo(e.lat, e.lon);
        this.addEstrutura(e.tipo, fac, p.x, p.z, e.rot || 0, true);
      }
      for (const g of lado.unidades) {
        const p = paraMundo(g.lat, g.lon);
        const lista = this.criarGrupo(g.tipo, fac, p.x, p.z, g.n || 1);
        for (const u of lista) {
          if (g.pousado && u.voa) this.pousarEm(u, this.estruturaMaisProxima(u, fac, 'aerodromo', 3000), true);
          if (g.alt && u.voa) { u.y = (chao(u.x, u.z, false) ?? 0) + g.alt; }
          if (g.carga) for (const [t, n] of Object.entries(g.carga)) for (let i = 0; i < n; i++) this.embarcar(this.addUnidade(t, fac, u.x, u.z), u, true);
          if (g.hangar) for (const [t, n] of Object.entries(g.hangar)) for (let i = 0; i < n; i++) this.pousarEm(this.addUnidade(t, fac, u.x, u.z), u, true);
          if (g.jogador) this.jogadorInicial = u;
          if (fac === EIXO) u.guarda = { x: u.x, z: u.z };
        }
      }
    }
  }

  _corCidade(c) {
    const cor = c.dono === ALIADOS ? '#3d7bd9' : c.dono === EIXO ? '#d23b30' : '#bbbbbb';
    const k = 'band' + cor;
    if (!this[k]) {
      const cv = document.createElement('canvas');
      cv.width = cv.height = 48;
      const g = cv.getContext('2d');
      g.fillStyle = '#222'; g.fillRect(8, 4, 4, 42);
      g.fillStyle = cor; g.strokeStyle = '#111'; g.lineWidth = 2;
      g.beginPath(); g.moveTo(12, 6); g.lineTo(42, 14); g.lineTo(12, 24); g.closePath(); g.fill(); g.stroke();
      if (c.capital || true) { g.fillStyle = '#fff'; g.beginPath(); g.arc(22, 15, 3, 0, 7); g.fill(); }
      this[k] = new THREE.CanvasTexture(cv);
      this[k].colorSpace = THREE.SRGBColorSpace;
    }
    c.bandeira.material.map = this[k];
    c.bandeira.material.needsUpdate = true;
  }

  addUnidade(tipo, fac, x, z) {
    const u = new Unidade(this, tipo, fac, x, z);
    this.unidades.push(u);
    return u;
  }

  criarGrupo(tipo, fac, x, z, n) {
    const out = [];
    const esp = Math.max(4, TIPOS[tipo].tam * (TIPOS[tipo].cat === 'ship' ? 0.6 : 1.6));
    const lado = Math.ceil(Math.sqrt(n));
    for (let i = 0; i < n; i++) {
      const ox = ((i % lado) - (lado - 1) / 2) * esp, oz = (Math.floor(i / lado) - (lado - 1) / 2) * esp;
      out.push(this.addUnidade(tipo, fac, x + ox, z + oz));
    }
    return out;
  }

  addEstrutura(tipo, fac, x, z, rot = 0, pronta = true) {
    const e = new Estrutura(this, tipo, fac, x, z, rot, pronta);
    this.estruturas.push(e);
    return e;
  }

  // -------------------------------------------------------------- consultas
  _gradear() {
    this.grade.clear();
    const add = (e) => {
      const k = Math.floor(e.x / CEL) + ',' + Math.floor(e.z / CEL);
      let l = this.grade.get(k);
      if (!l) this.grade.set(k, l = []);
      l.push(e);
    };
    for (const u of this.unidades) if (u.vivo && !u.dentro) add(u);
    for (const e of this.estruturas) if (e.vivo) add(e);
  }

  perto(x, z, r, filtro) {
    const out = [];
    const cx0 = Math.floor((x - r) / CEL), cx1 = Math.floor((x + r) / CEL);
    const cz0 = Math.floor((z - r) / CEL), cz1 = Math.floor((z + r) / CEL);
    const r2 = r * r;
    for (let cx = cx0; cx <= cx1; cx++) {
      for (let cz = cz0; cz <= cz1; cz++) {
        const l = this.grade.get(cx + ',' + cz);
        if (!l) continue;
        for (const e of l) {
          const dx = e.x - x, dz = e.z - z;
          if (dx * dx + dz * dz <= r2 && (!filtro || filtro(e))) out.push(e);
        }
      }
    }
    return out;
  }

  estruturaMaisProxima(u, fac, tipo, rmax = 1e9) {
    let m = null, md = rmax;
    for (const e of this.estruturas) {
      if (!e.vivo || e.fac !== fac || (tipo && e.tipo !== tipo) || e.construindo) continue;
      const d = Math.hypot(e.x - u.x, e.z - u.z);
      if (d < md) { md = d; m = e; }
    }
    return m;
  }

  // -------------------------------------------------------------- ordens do jogador
  ordenarMover(lista, x, z, agressivo = false) {
    const n = lista.length;
    const lado = Math.ceil(Math.sqrt(n));
    lista.forEach((u, i) => {
      const esp = Math.max(5, u.def.tam * (u.cat === 'ship' ? 0.8 : u.voa ? 4 : 1.8));
      const ox = ((i % lado) - (lado - 1) / 2) * esp, oz = (Math.floor(i / lado) - (lado - 1) / 2) * esp;
      if (u.est) { u.encontro = { x, z }; return; }
      u.ordem = { t: 'mover', x: x + ox, z: z + oz, agressivo };
      u.orbita = null;
      if (u.guarnecendo) this.sairBunker(u);
    });
  }

  ordenarAtacar(lista, alvo) {
    for (const u of lista) if (!u.est) { u.ordem = { t: 'atacar', alvo }; u.orbita = null; }
  }

  ordenarEmbarcar(lista, transp) {
    for (const u of lista) {
      if (u === transp || u.est) continue;
      if (transp.est && transp.def.guarnicao && u.cat === 'inf') u.ordem = { t: 'embarcar', alvo: transp };
      else if (transp.def?.hangar && u.cat === 'air') u.ordem = { t: 'pousar', alvo: transp };
      else if (transp.tipo === 'aerodromo' && u.voa) u.ordem = { t: 'pousar', alvo: transp };
      else if (transp.capacidade && u.cat === 'inf') u.ordem = { t: 'embarcar', alvo: transp };
    }
  }

  parar(lista) { for (const u of lista) if (!u.est) { u.ordem = null; u.orbita = null; } }

  // Pousar: aviões vão ao aeródromo / porta-aviões mais próximo
  ordenarPousar(lista) {
    for (const u of lista) {
      if (u.cat !== 'air') continue;
      let melhor = null, md = 1e12;
      for (const e of [...this.estruturas, ...this.unidades]) {
        if (!e.vivo || e.fac !== u.fac) continue;
        const ok = (e.est && e.tipo === 'aerodromo' && !e.construindo) || (e.def?.hangar && e.carga.length < e.def.hangar);
        if (!ok) continue;
        const d = Math.hypot(e.x - u.x, e.z - u.z);
        if (d < md) { md = d; melhor = e; }
      }
      if (melhor) u.ordem = { t: 'pousar', alvo: melhor };
      else this.msg('Nenhum aeródromo ou porta-aviões disponível');
    }
  }

  decolar(lista) {
    for (const u of lista) {
      if (u.est && u.def.hangar === undefined && !u.carga) continue;
      if (u.def?.hangar) { // porta-aviões lança todos os aviões
        const avioes = u.carga.filter((a) => a.cat === 'air');
        avioes.forEach((a, i) => this.desembarcarUm(u, a, i));
        continue;
      }
      if (u.voa && u.estado === 'pousado') {
        u.estado = 'voando';
        u.v = u.cat === 'air' ? u.def.vel * 0.7 : 0;
        if (u.parque) { u.parque.estacionados--; u.parque = null; }
        u.ordem = { t: 'mover', x: u.x + Math.sin(u.hd) * 3000, z: u.z + Math.cos(u.hd) * 3000 };
      }
    }
  }

  embarcar(u, t, instantaneo = false) {
    if (t.est) {
      if (t.guarnicao.length >= t.def.guarnicao) return false;
      t.guarnicao.push(u);
      u.guarnecendo = t;
    } else {
      if (t.def.hangar) { if (t.carga.length >= t.def.hangar) return false; }
      else if (t.carga.length >= t.capacidade) return false;
      t.carga.push(u);
    }
    u.dentro = t;
    u.ordem = null;
    u.estado = u.voa ? 'pousado' : 'solo';
    u.obj.visible = false;
    u.icone.visible = false;
    if (!instantaneo) this.msg(`${u.def.nome} entrou em ${t.def.nome}`, u.fac);
    return true;
  }

  pousarEm(u, alvo, instantaneo = false) {
    if (!alvo) { // sem lugar: pousa no chão
      u.estado = 'pousado';
      u.y = chao(u.x, u.z, false) ?? 0;
      u.v = 0;
      return;
    }
    if (alvo.def?.hangar) { this.embarcar(u, alvo, instantaneo); return; }
    // aeródromo: estaciona ao lado da pista
    const i = alvo.estacionados++;
    const ang = alvo.hd;
    const lado = 55 + (i % 2) * 22, frente = -40 - Math.floor(i / 2) * 26;
    u.x = alvo.x + Math.cos(ang) * lado + Math.sin(ang) * frente;
    u.z = alvo.z - Math.sin(ang) * lado + Math.cos(ang) * frente;
    u.hd = ang + Math.PI;
    u.estado = 'pousado';
    u.parque = alvo;
    u.v = 0;
    u.ordem = null;
    u.y = chao(u.x, u.z, false) ?? alvo.y;
    if (!instantaneo) this.msg(`${u.def.nome} pousou`, u.fac);
  }

  // Desembarcar tropas / guarnição
  desembarcar(t) {
    if (t.est) { [...t.guarnicao].forEach((u, i) => this.sairBunker(u, i)); return; }
    if (!t.carga.length) return;
    if (t.cat === 'air' && t.estado === 'voando') { this.saltar(t); return; }
    if (t.cat === 'air' && t.def.hangar === undefined && t.estado === 'pousado') { /* ok, no aeródromo */ }
    if (t.cat === 'ship' && !t.def.hangar) {
      const p = this.pontoTerra(t.x, t.z, 400);
      if (!p) { this.msg('O barco precisa chegar à praia/costa para desembarcar'); return; }
      [...t.carga].forEach((u, i) => this.desembarcarUm(t, u, i, p));
      return;
    }
    [...t.carga].forEach((u, i) => this.desembarcarUm(t, u, i));
  }

  desembarcarUm(t, u, i, ponto) {
    t.carga.splice(t.carga.indexOf(u), 1);
    u.dentro = null;
    const a = i * 2.4;
    const r = Math.max(4, t.def.tam * 0.6) + i * 0.6;
    const px = ponto ? ponto.x : t.x, pz = ponto ? ponto.z : t.z;
    u.x = px + Math.cos(a) * r;
    u.z = pz + Math.sin(a) * r;
    u.obj.visible = true;
    if (u.cat === 'air') { // decola do porta-aviões
      u.x = t.x + Math.sin(t.hd) * 100; u.z = t.z + Math.cos(t.hd) * 100;
      u.hd = t.hd; u.y = 25 + i * 15; u.estado = 'voando'; u.v = u.def.vel * 0.7;
      u.ordem = { t: 'mover', x: u.x + Math.sin(t.hd) * 4000 + (i - 3) * 300, z: u.z + Math.cos(t.hd) * 4000 };
      return;
    }
    u.y = chao(u.x, u.z, false) ?? t.y;
    u.ordem = null;
  }

  saltar(t) {
    const n = t.carga.length;
    [...t.carga].forEach((u, i) => {
      t.carga.splice(t.carga.indexOf(u), 1);
      u.dentro = null;
      u.x = t.x - Math.sin(t.hd) * (i * 12) + (Math.random() - 0.5) * 30;
      u.z = t.z - Math.cos(t.hd) * (i * 12) + (Math.random() - 0.5) * 30;
      u.y = t.y - 10;
      u.estado = 'caindo';
      u.obj.visible = true;
      u.para = paraquedas();
      u.obj.add(u.para);
    });
    this.msg(`${n} paraquedistas saltaram!`, t.fac);
  }

  sairBunker(u, i = 0) {
    const b = u.guarnecendo;
    if (!b) return;
    b.guarnicao.splice(b.guarnicao.indexOf(u), 1);
    u.guarnecendo = null;
    u.dentro = null;
    u.x = b.x + Math.cos(i) * (b.def.tam * 0.7);
    u.z = b.z + Math.sin(i) * (b.def.tam * 0.7);
    u.obj.visible = true;
  }

  pontoTerra(x, z, rmax) {
    for (let r = 20; r <= rmax; r += 40) {
      for (let k = 0; k < 12; k++) {
        const a = k / 12 * DOIS_PI;
        const px = x + Math.cos(a) * r, pz = z + Math.sin(a) * r;
        if (ehAgua(px, pz, true) === false) return { x: px, z: pz };
      }
    }
    return null;
  }

  pontoAgua(x, z, rmax) {
    for (let r = 30; r <= rmax; r += 40) {
      for (let k = 0; k < 12; k++) {
        const a = k / 12 * DOIS_PI;
        const px = x + Math.cos(a) * r, pz = z + Math.sin(a) * r;
        if (ehAgua(px, pz, true) === true) return { x: px, z: pz, a };
      }
    }
    return null;
  }

  // -------------------------------------------------------------- construção
  podeConstruir(tipo, fac, x, z) {
    const d = ESTRUTURAS[tipo];
    if (this.dinheiro[fac] < d.custo) return 'Suprimentos insuficientes';
    const agua = ehAgua(x, z, true);
    if (agua === true) return 'Não dá para construir no mar';
    let perto = false;
    for (const e of this.estruturas) {
      if (!e.vivo || e.fac !== fac) continue;
      const r = e.tipo === 'qg' ? 4000 : 1500;
      if (Math.hypot(e.x - x, e.z - z) < r) perto = true;
      if (Math.hypot(e.x - x, e.z - z) < (e.def.tam + d.tam) * 0.6) return 'Muito perto de outra estrutura';
    }
    for (const c of this.cidades) if (c.dono === fac && Math.hypot(c.x - x, c.z - z) < 3000) perto = true;
    if (!perto) return 'Longe demais: construa perto do QG (4 km), de cidades suas (3 km) ou de outras estruturas';
    if (d.costa && !this.pontoAgua(x, z, 300)) return 'O porto precisa ficar na costa (mar a menos de 300 m)';
    return null;
  }

  construir(tipo, fac, x, z) {
    const erro = this.podeConstruir(tipo, fac, x, z);
    if (erro) { this.msg(erro, fac); return null; }
    const d = ESTRUTURAS[tipo];
    this.dinheiro[fac] -= d.custo;
    let rot = Math.random() * 360;
    if (d.costa) {
      const a = this.pontoAgua(x, z, 300);
      rot = Math.atan2(a.x - x, a.z - z) * 180 / Math.PI + 180; // cais (frente -z do modelo) aponta para o mar
    }
    const e = this.addEstrutura(tipo, fac, x, z, rot, false);
    this.msg(`Construindo ${d.nome}...`, fac);
    return e;
  }

  produzir(est, tipo) {
    const d = TIPOS[tipo];
    if (est.construindo) { this.msg('A estrutura ainda está em construção', est.fac); return; }
    if (this.dinheiro[est.fac] < d.custo) { this.msg('Suprimentos insuficientes', est.fac); return; }
    if (est.fila.length >= 8) return;
    this.dinheiro[est.fac] -= d.custo;
    est.fila.push({ tipo, resta: d.tempo });
  }

  cancelar(est) {
    const f = est.fila.pop();
    if (f) this.dinheiro[est.fac] += TIPOS[f.tipo].custo;
  }

  _spawn(est, tipo) {
    const d = TIPOS[tipo];
    let x = est.x, z = est.z;
    if (d.cat === 'ship') {
      const fx = est.x - Math.sin(est.hd) * 90, fz = est.z - Math.cos(est.hd) * 90;
      const a = ehAgua(fx, fz, true) ? { x: fx, z: fz } : this.pontoAgua(est.x, est.z, 600);
      if (!a) { this.msg('Porto sem saída para o mar!', est.fac); this.dinheiro[est.fac] += d.custo; return; }
      x = a.x + (Math.random() - 0.5) * 40; z = a.z + (Math.random() - 0.5) * 40;
    } else if (d.cat !== 'air') {
      const a = Math.random() * DOIS_PI;
      const r = est.def.tam * 0.7 + 8;
      x += Math.cos(a) * r; z += Math.sin(a) * r;
    }
    const u = this.addUnidade(tipo, est.fac, x, z);
    if (d.cat === 'air') this.pousarEm(u, est, true);
    if (d.cat === 'ship' && d.hangar) u.hd = est.hd + Math.PI;
    if (est.encontro && !u.voa) u.ordem = { t: 'mover', x: est.encontro.x, z: est.encontro.z };
    this.msg(`Pronto: ${d.nome}`, est.fac);
    if (est.fac === EIXO) this.ia?.novo(u);
    return u;
  }

  // -------------------------------------------------------------- simulação
  passo(dt) {
    if (this.fim && this.fim.pausar) return;
    this.tempo += dt;
    this.relogio += dt;
    this._gradear();
    for (const u of this.unidades) if (u.vivo && !u.dentro) this._mover(u, dt);
    for (const u of this.unidades) if (u.vivo && !u.dentro && u.estado !== 'caindo' && !u.pilotado) this._combater(u, u.def.armas, dt);
    for (const e of this.estruturas) if (e.vivo) this._estrutura(e, dt);
    // impactos atrasados
    for (let i = this.eventos.length - 1; i >= 0; i--) {
      const ev = this.eventos[i];
      ev.t -= dt;
      if (ev.t <= 0) { this.eventos.splice(i, 1); this._impacto(ev); }
    }
    this.timerCaptura += dt;
    if (this.timerCaptura >= 1) { this._captura(this.timerCaptura); this.timerCaptura = 0; }
    this.timerRenda += dt;
    if (this.timerRenda >= 60) { this._renda(); this.timerRenda = 0; }
    this.timerIA += dt;
    if (this.ia && this.timerIA >= 5) { this.ia.pensar(this.timerIA); this.timerIA = 0; }
    this.timerFim += dt;
    if (this.timerFim > 3) { this._verificarFim(); this.timerFim = 0; }
    // limpa mortos
    if (this.unidades.some((u) => !u.vivo)) this.unidades = this.unidades.filter((u) => u.vivo);
    if (this.estruturas.some((e) => !e.vivo)) this.estruturas = this.estruturas.filter((e) => e.vivo);
  }

  _estrutura(e, dt) {
    if (e.construindo > 0) {
      e.construindo -= dt;
      e.hp = Math.min(e.hpMax, e.hp + e.hpMax * 0.9 * dt / e.def.tempo);
      if (e.construindo <= 0) { e.construindo = 0; this.msg(`${e.def.nome} concluído`, e.fac); }
      return;
    }
    if (e.fila.length) {
      const f = e.fila[0];
      f.resta -= dt;
      if (f.resta <= 0) { e.fila.shift(); this._spawn(e, f.tipo); }
    }
    const armas = e.armas;
    while (e.cds.length < armas.length) { e.cds.push(0); e.alvos.push(null); }
    if (armas.length) this._combater(e, armas, dt);
  }

  _mover(u, dt) {
    const d = u.def;
    if (u.estado === 'caindo') {
      u.y -= 6 * dt;
      const g = chao(u.x, u.z, false) ?? 0;
      if (u.y <= g) {
        u.y = g; u.estado = 'solo';
        if (u.para) { u.obj.remove(u.para); u.para = null; }
        if (ehAgua(u.x, u.z, false)) this._matar(u);
      }
      return;
    }
    if (u.pilotado) return;
    if (u.cat === 'air') return this._moverAviao(u, dt);
    let alvo = null;
    const o = u.ordem;
    if (o) {
      if (o.t === 'mover') alvo = o;
      else if (o.t === 'atacar') {
        if (!o.alvo.vivo || o.alvo.dentro) { u.ordem = null; return; }
        const alc = u.def.armas[0]?.alc || 50;
        if (Math.hypot(o.alvo.x - u.x, o.alvo.z - u.z) > alc * 0.85) alvo = o.alvo;
      } else if (o.t === 'embarcar') {
        const t = o.alvo;
        if (!t.vivo) { u.ordem = null; return; }
        const dist = Math.hypot(t.x - u.x, t.z - u.z);
        const raio = t.est ? t.def.tam * 0.8 + 6 : t.cat === 'ship' ? t.def.tam * 0.6 + 60 : t.def.tam * 0.6 + 6;
        const podeEntrar = t.est || !t.voa || t.estado === 'pousado';
        if (dist < raio && podeEntrar) {
          if (!this.embarcar(u, t)) { this.msg(`${t.def.nome} está cheio`, u.fac); u.ordem = null; }
          return;
        }
        alvo = t;
      }
    }
    if (o && o.agressivo && this._temAlvo(u)) alvo = null;
    if (!alvo) { u.andando = false; return; }
    const dx = alvo.x - u.x, dz = alvo.z - u.z;
    const dist = Math.hypot(dx, dz);
    if (dist < Math.max(1.5, d.tam * 0.3)) { if (o.t === 'mover') u.ordem = null; u.andando = false; return; }
    const desejado = Math.atan2(dx, dz);
    const da = angDif(desejado, u.hd);
    const giro = d.giro * dt;
    u.hd += Math.max(-giro, Math.min(giro, da));
    if (Math.abs(da) > 1.2 && u.cat !== 'inf') { u.andando = false; return; } // gira parado
    const v = d.vel * (u.cat === 'inf' ? 1 : Math.max(0.3, 1 - Math.abs(da) / 1.5));
    const passo = Math.min(dist, v * dt);
    const nx = u.x + Math.sin(u.hd) * passo, nz = u.z + Math.cos(u.hd) * passo;
    const agua = ehAgua(nx, nz, false);
    if (u.cat === 'ship') {
      if (agua === false) {
        u.praia = true;
        if (o && o.t === 'mover') u.ordem = null;
        u.andando = false;
        return;
      }
      u.praia = false;
    } else if (agua === true) {
      // terra: não entra no mar (a não ser para embarcar num navio, que espera na costa)
      if (o && o.t === 'embarcar' && o.alvo.cat === 'ship') {
        if (Math.hypot(o.alvo.x - u.x, o.alvo.z - u.z) < o.alvo.def.tam * 0.6 + 400) this.embarcar(u, o.alvo);
      }
      if (o && o.t === 'mover') u.ordem = null;
      u.andando = false;
      return;
    }
    u.x = nx; u.z = nz;
    u.andando = true;
    if (u.cat === 'ship') u.y = 0;
  }

  _temAlvo(u) {
    return u.alvos.some((a) => a && a.vivo);
  }

  _moverAviao(u, dt) {
    const d = u.def;
    if (u.estado === 'pousado') {
      u.y = chao(u.x, u.z, false) ?? u.y;
      const o = u.ordem;
      if (o && (o.t === 'mover' || o.t === 'atacar')) {
        u.estado = 'voando';
        u.v = d.vel * 0.6;
        if (u.parque) { u.parque.estacionados = Math.max(0, u.parque.estacionados - 1); u.hd = u.parque.hd + Math.PI; u.parque = null; }
      } else return;
    }
    const g = chao(u.x, u.z, false) ?? 0;
    let P = null, altDes = g + d.alt;
    const o = u.ordem;
    if (o) {
      if (o.t === 'mover') {
        P = o;
        if (Math.hypot(o.x - u.x, o.z - u.z) < 500) { u.orbita = { x: o.x, z: o.z }; u.ordem = null; }
      } else if (o.t === 'atacar') {
        if (!o.alvo.vivo || o.alvo.dentro) { u.ordem = null; u.orbita = { x: u.x, z: u.z }; }
        else P = o.alvo;
      } else if (o.t === 'pousar') {
        const a = o.alvo;
        if (!a || !a.vivo) { u.ordem = null; }
        else {
          P = a;
          const dist = Math.hypot(a.x - u.x, a.z - u.z);
          altDes = g + Math.min(d.alt, dist * 0.12);
          if (dist < 350) { this.pousarEm(u, a); return; }
        }
      }
    }
    // caça automático: procura aviões inimigos por perto quando está livre
    if (!P && d.armas.some((w) => w.alvos.includes('a'))) {
      if (!u.cacar || !u.cacar.vivo || u.cacar.estado !== 'voando' || Math.hypot(u.cacar.x - u.x, u.cacar.z - u.z) > 7000) {
        u.cacar = null;
        if ((u.busca -= dt) <= 0) {
          u.busca = 1;
          const inim = this.perto(u.x, u.z, 5000, (e) => e.fac !== u.fac && !e.est && e.voa && e.estado === 'voando');
          let md = 1e9;
          for (const e of inim) { const dd = Math.hypot(e.x - u.x, e.z - u.z); if (dd < md) { md = dd; u.cacar = e; } }
        }
      }
      if (u.cacar) P = u.cacar;
    }
    if (P && P.vivo !== undefined && !P.est && P.voa && P.estado === 'voando') altDes = P.y;
    else if (P && (P.est || (P.vivo !== undefined && !P.voa)) && !d.bombardeiro) {
      // ataque ao solo: mergulho rasante
      const dist = Math.hypot(P.x - u.x, P.z - u.z);
      if (dist < 3000) altDes = (P.y || g) + 120 + dist * 0.12;
    }
    if (!P) {
      if (!u.orbita) u.orbita = { x: u.x + Math.sin(u.hd) * 800, z: u.z + Math.cos(u.hd) * 800 };
      const r = Math.max(700, d.vel / d.giro * 1.3);
      const dx = u.orbita.x - u.x, dz = u.orbita.z - u.z;
      const dist = Math.hypot(dx, dz);
      const b = Math.atan2(dx, dz);
      const des = dist > r * 1.4 ? b : b + (Math.PI / 2 + (1 - Math.min(1, dist / r)) * Math.PI / 3);
      P = { x: u.x + Math.sin(des) * 1000, z: u.z + Math.cos(des) * 1000 };
    }
    // direção
    let tx = P.x, tz = P.z;
    if (P.vivo !== undefined && P.voa && P.estado === 'voando') { tx += Math.sin(P.hd) * (P.v || 0) * 1.2; tz += Math.cos(P.hd) * (P.v || 0) * 1.2; }
    const da = angDif(Math.atan2(tx - u.x, tz - u.z), u.hd);
    const taxa = Math.max(-d.giro, Math.min(d.giro, da * 1.5));
    u.hd += taxa * dt;
    u.bank += ((-taxa / d.giro) * 1.0 - u.bank) * Math.min(1, dt * 3);
    const subida = Math.max(-35, Math.min(22, (altDes - u.y) * 0.4));
    u.pitch = Math.atan2(subida, Math.max(30, u.v));
    u.v += (d.vel - u.v) * Math.min(1, dt * 0.5);
    u.x += Math.sin(u.hd) * u.v * Math.cos(u.pitch) * dt;
    u.z += Math.cos(u.hd) * u.v * Math.cos(u.pitch) * dt;
    u.y += subida * dt;
    if (u.y < g + 25) u.y = g + 25;
  }

  // -------------------------------------------------------------- combate
  _combater(u, armas, dt) {
    for (let i = 0; i < armas.length; i++) {
      u.cds[i] -= dt;
      if (u.cds[i] > 0) continue;
      const w = armas[i];
      let alvo = u.alvos[i];
      if (u.ordem && u.ordem.t === 'atacar' && this._valido(u, w, u.ordem.alvo)) alvo = u.ordem.alvo;
      if (!alvo || !this._valido(u, w, alvo)) {
        u.alvos[i] = alvo = null;
        alvo = this._procurar(u, w);
        u.alvos[i] = alvo;
        if (!alvo) { u.cds[i] = 0.3 + Math.random() * 0.4; continue; }
      }
      this._disparar(u, w, alvo);
      u.cds[i] = w.cad * (0.85 + Math.random() * 0.3);
    }
  }

  _valido(u, w, a) {
    if (!a || !a.vivo || a.dentro || a.fac === u.fac || a.estado === 'caindo') return false;
    if (!w.alvos.includes(classe(a))) return false;
    const dx = a.x - u.x, dz = a.z - u.z;
    const dh = Math.hypot(dx, dz);
    if (w.bomba) return dh < w.alc && u.estado === 'voando';
    const d = Math.hypot(dh, (a.y || 0) - u.y);
    if (d > w.alc || (w.min && d < w.min)) return false;
    if (w.cone && u.cat === 'air') {
      const fx = Math.sin(u.hd), fz = Math.cos(u.hd);
      if ((dx * fx + dz * fz) / (dh || 1) < Math.cos(w.cone)) return false;
    }
    return true;
  }

  _procurar(u, w) {
    const r = w.bomba ? w.alc : w.alc;
    const lista = this.perto(u.x, u.z, r, (e) => e.fac !== u.fac && this._valido(u, w, e));
    let melhor = null, md = 1e12;
    for (const e of lista) {
      let d = Math.hypot(e.x - u.x, e.z - u.z);
      if (w.perfura && e.cat === 'veh') d *= 0.5;   // antitanque prefere blindados
      if (w.perfura && e.cat === 'inf') d *= 1.6;
      if (e.est && !w.area && !w.perfura) d *= 2;
      if (d < md) { md = d; melhor = e; }
    }
    return melhor;
  }

  _disparar(u, w, alvo) {
    const dist = Math.hypot(alvo.x - u.x, alvo.z - u.z, (alvo.y || 0) - u.y);
    const camD = Math.hypot(u.x - this.camPos.x, u.z - this.camPos.z, u.y - this.camPos.y);
    const visivel = camD < 8000;
    let p = w.prec * (1 - 0.45 * dist / w.alc);
    const ca = classe(alvo);
    if (ca === 'a' && u.cat !== 'air') p *= 0.55;
    if (ca === 'a' && u.cat === 'air') p *= 0.8;
    if (alvo.cat === 'inf' && alvo.andando === false) p *= 0.75; // deitado / em cobertura
    if (alvo.est) p = Math.max(p, 0.8);
    const acerto = Math.random() < p;
    const altBoca = u.est ? 3 : u.cat === 'inf' ? 1.4 : u.voa ? 0 : u.cat === 'ship' ? u.def.tam * 0.1 : 2.2;
    const boca = new THREE.Vector3(u.x, u.y + altBoca, u.z);
    if (u.cat === 'air') { boca.x += Math.sin(u.hd) * 6; boca.z += Math.cos(u.hd) * 6; }
    const ay = (alvo.y || 0) + (alvo.est ? 3 : alvo.cat === 'inf' ? 1 : alvo.voa ? 0 : 1.5);
    const destino = new THREE.Vector3(alvo.x, ay, alvo.z);
    if (!acerto) {
      const erro = Math.max(3, dist * 0.04);
      destino.x += (Math.random() - 0.5) * erro * 2;
      destino.z += (Math.random() - 0.5) * erro * 2;
      destino.y += (Math.random() - 0.3) * erro * 0.5;
    }
    if (visivel) {
      if (w.som) tocar(w.som, camD);
      if (!w.area && !w.bomba) {
        this.fx?.tracante(boca, destino, w.fx === 'foguete' ? 0xffa040 : 0xffd27a);
        this.fx?.clarao(boca, u.cat === 'inf' ? 0.8 : 1.6);
      } else if (!w.bomba) this.fx?.clarao(boca, w.fx === 'artilharia' ? 6 : 3);
    }
    if (w.area || w.bomba || dist > 900) {
      const vproj = w.bomba ? 0 : w.fx === 'artilharia' ? 450 : 800;
      const t = w.bomba ? Math.sqrt(2 * Math.max(10, u.y - ay) / 9.8) : dist / vproj;
      if (w.bomba) { destino.x = alvo.x + (Math.random() - 0.5) * 60; destino.z = alvo.z + (Math.random() - 0.5) * 60; }
      this.eventos.push({ t, w, fac: u.fac, x: destino.x, y: destino.y, z: destino.z, alvo: acerto ? alvo : null, de: u });
    } else if (acerto) {
      this._dano(alvo, w, w.dano, u);
      if (visivel && w.perfura) this.fx?.explosao(destino, 3, false);
    }
  }

  _impacto(ev) {
    const w = ev.w;
    const camD = Math.hypot(ev.x - this.camPos.x, ev.z - this.camPos.z);
    if (camD < 12000) {
      this.fx?.explosao({ x: ev.x, y: ev.y, z: ev.z }, w.area ? Math.max(6, w.area * 0.5) : 4);
      if (w.area) tocar('explosao', camD);
    }
    if (w.area) {
      for (const e of this.perto(ev.x, ev.z, w.area * 1.5, (e) => e.fac !== ev.fac && !(e.voa && e.estado === 'voando'))) {
        const d = Math.hypot(e.x - ev.x, e.z - ev.z);
        const f = Math.max(0, 1 - d / (w.area * 1.5));
        this._dano(e, w, w.dano * f * f, ev.de);
      }
    } else if (ev.alvo && ev.alvo.vivo) this._dano(ev.alvo, w, w.dano, ev.de);
  }

  _dano(e, w, dano, de) {
    if (!e.vivo) return;
    const b = e.def.blind || 0;
    if (b && !w.perfura && !w.area && !w.bomba) dano *= b === 1 ? 0.25 : 0.05;
    if (e.cat === 'inf' && (w.perfura || w.area)) dano *= 1.0;
    e.hp -= dano;
    e.atacadoEm = this.tempo;
    if (de && de.vivo && e.fac === EIXO) this.ia?.atacado(e, de);
    if (e.hp <= 0) this._matar(e);
  }

  _matar(e) {
    if (!e.vivo) return;
    e.vivo = false;
    const camD = Math.hypot(e.x - this.camPos.x, e.z - this.camPos.z);
    if (camD < 15000 && e.cat !== 'inf') {
      this.fx?.explosao({ x: e.x, y: e.y, z: e.z }, e.est ? e.def.tam * 0.8 : Math.max(5, e.def.tam * 0.9));
      tocar('explosao', camD);
    }
    if (e.est) {
      [...e.guarnicao].forEach((u, i) => { this.sairBunker(u, i); u.hp *= 0.5; });
      this.msg(`${e.nome} foi destruído!`, ALIADOS);
    } else {
      for (const c of e.carga) { c.vivo = false; c.destruirVisual(); }
      if (e.dentro) {
        const t = e.dentro;
        const l = t.est ? t.guarnicao : t.carga;
        l.splice(l.indexOf(e), 1);
      }
      if (e.parque) e.parque.estacionados = Math.max(0, e.parque.estacionados - 1);
      if (e.pilotado) this.aoMorrerPiloto?.(e);
      if (e.fac === ALIADOS && e.cat !== 'inf') this.msg(`Perdemos: ${e.def.nome}`);
    }
    e.destruirVisual();
    this.selecaoMudou?.();
  }

  // -------------------------------------------------------------- cidades, renda, fim
  _captura(dt) {
    for (const c of this.cidades) {
      const ali = this.perto(c.x, c.z, 1500, (e) => !e.est && e.fac === ALIADOS && (e.cat === 'inf' || e.cat === 'veh')).length;
      const eix = this.perto(c.x, c.z, 1500, (e) => !e.est && e.fac === EIXO && (e.cat === 'inf' || e.cat === 'veh')).length;
      c.disputa = ali > 0 && eix > 0;
      if (ali && !eix) c.ctrl = Math.max(-100, c.ctrl - 4 * Math.sqrt(ali) * dt);
      if (eix && !ali) c.ctrl = Math.min(100, c.ctrl + 4 * Math.sqrt(eix) * dt);
      const antes = c.dono;
      if (c.ctrl <= -100) c.dono = ALIADOS;
      else if (c.ctrl >= 100) c.dono = EIXO;
      else if (Math.abs(c.ctrl) < 1 && antes !== -1 && ((antes === ALIADOS && eix) || (antes === EIXO && ali))) c.dono = -1;
      if (antes !== c.dono) {
        this._corCidade(c);
        if (c.dono === ALIADOS) this.msg(`🏳 ${c.nome} foi libertada!`);
        else if (c.dono === EIXO) this.msg(`⚠ O Eixo tomou ${c.nome}`);
        else this.msg(`${c.nome} está em disputa`);
      }
    }
  }

  renda(fac) {
    let r = 0;
    for (const c of this.cidades) if (c.dono === fac) r += c.valor;
    for (const e of this.estruturas) if (e.vivo && e.fac === fac && e.def.renda) r += e.def.renda;
    return r;
  }

  _renda() {
    this.dinheiro[ALIADOS] += this.renda(ALIADOS);
    this.dinheiro[EIXO] += this.renda(EIXO) * 0.8;
  }

  _verificarFim() {
    if (this.fim || this.cenario.aereo) {
      if (this.cenario.aereo && !this.fim) {
        const inimigosAr = this.unidades.filter((u) => u.fac === EIXO && u.voa).length;
        if (inimigosAr === 0) this.fim = { vitoria: true, texto: 'Vitória! Os céus do Canal estão livres.' };
      }
      return;
    }
    const paris = this.cidades.find((c) => c.nome === 'Paris');
    if (paris && paris.dono === ALIADOS) this.fim = { vitoria: true, texto: 'Vitória! Paris foi libertada (25 de agosto de 1944).' };
    const temAlgo = this.unidades.some((u) => u.fac === ALIADOS) || this.estruturas.some((e) => e.fac === ALIADOS);
    if (!temAlgo) this.fim = { vitoria: false, texto: 'Derrota... As forças aliadas foram destruídas.' };
  }
}
