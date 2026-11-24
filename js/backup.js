'use strict';
// =====================================================================
//  CÓPIA DO PROGRESSO — levar os saves para outro aparelho ou outra versão
//  Exporta tudo o que o jogo guarda no aparelho (os 4 espaços de save,
//  opções, idioma e mods) num texto/arquivo e importa de volta. Serve para
//  passar o jogo do navegador para o APK (e o contrário), trocar de celular
//  ou reinstalar o aplicativo sem perder nada.
// =====================================================================
const Backup = {
  chaves() { const L = []; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (/^eldoria/.test(k)) L.push(k); } } catch (e) { } return L; },
  exportar() {
    const dados = {};
    for (const k of this.chaves()) dados[k] = localStorage.getItem(k);
    return 'ELDORIA1:' + btoa(unescape(encodeURIComponent(JSON.stringify({ v: GAME_VERSION, data: Date.now(), dados }))));
  },
  importar(txt) {
    txt = String(txt || '').trim();
    if (!txt.startsWith('ELDORIA1:')) return Game.toast('Isso não parece uma cópia do progresso de Eldoria.', '#ff8080');
    let o; try { o = JSON.parse(decodeURIComponent(escape(atob(txt.slice(9))))); } catch (e) { return Game.toast('A cópia está incompleta ou estragada.', '#ff8080'); }
    const n = Object.keys(o.dados || {}).length;
    UI.dialog('💾 Importar progresso', null, `Esta cópia é da versão <b>${esc(o.v || '?')}</b>, feita em ${new Date(o.data).toLocaleString('pt-BR')}, com ${n} registro(s).<br><br>Ela <b>substitui</b> os saves deste aparelho. Continuar?`, [
      { label: 'Importar', cls: 'gold', fn: () => {
        try { for (const k in o.dados) localStorage.setItem(k, o.dados[k]); } catch (e) { return Game.toast('Sem espaço no aparelho para importar.', '#ff8080'); }
        UI.dialog('💾 Importar progresso', null, 'Pronto! O progresso foi importado. O jogo vai abrir de novo.', [{ label: 'Ok', fn: () => location.reload() }]);
      } },
      { label: 'Cancelar', fn: () => this.menu() }
    ]);
  },
  menu() {
    const f = UI.reg(), txt = this.exportar(), kb = Math.round(txt.length / 1024);
    const voltar = () => UI.options();
    const el = UI.show('backup', `<div class="panel"><div class="ptitle">💾 Copiar o progresso</div>
      <div class="small">Leve os seus saves para outro aparelho, do navegador para o APK (ou o contrário) ou para uma reinstalação do jogo.</div>
      <div class="ptitle" style="font-size:18px;margin-top:6px">1. Exportar (${kb} KB)</div>
      <div class="row" style="gap:6px;flex-wrap:wrap">
        <button class="sbtn" ${f(() => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain' })); a.download = 'eldoria_progresso_' + new Date().toISOString().slice(0, 10) + '.txt'; document.body.appendChild(a); a.click(); a.remove(); })}>⬇ Baixar arquivo</button>
        <button class="sbtn" ${f(() => { const t = document.getElementById('bk-out'); t.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (e) { } try { navigator.clipboard.writeText(txt).then(() => Game.toast('Copiado!', '#a0ffa0')); } catch (e) { } if (ok) Game.toast('Copiado!', '#a0ffa0'); })}>📋 Copiar o texto</button>
      </div>
      <textarea id="bk-out" readonly style="width:100%;height:60px;margin-top:6px;font:10px monospace;background:#1a1420;color:#a0a090;border:1px solid #5a4a6a;box-sizing:border-box">${esc(txt)}</textarea>
      <div class="ptitle" style="font-size:18px;margin-top:6px">2. Importar</div>
      <div class="row" style="gap:6px;flex-wrap:wrap"><label class="sbtn">📁 Escolher arquivo<input type="file" id="bk-arq" accept=".txt,text/plain" style="display:none"></label></div>
      <textarea id="bk-in" placeholder="...ou cole aqui o texto copiado (começa com ELDORIA1:)" style="width:100%;height:60px;margin-top:6px;font:10px monospace;background:#1a1420;color:#f2e6cc;border:1px solid #5a4a6a;box-sizing:border-box"></textarea>
      <button class="sbtn" ${f(() => this.importar(document.getElementById('bk-in').value))}>Importar o texto colado</button>
      <button class="mbtn" ${f(voltar)}>Voltar</button></div>`, { onBack: voltar });
    UI.bind(el, f);
    const inp = el.querySelector('#bk-arq');
    if (inp) inp.addEventListener('change', () => { const a = inp.files && inp.files[0]; if (!a) return; const r = new FileReader(); r.onload = () => this.importar(r.result); r.readAsText(a); });
  }
};
