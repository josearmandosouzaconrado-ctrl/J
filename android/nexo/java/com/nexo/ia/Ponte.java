package com.nexo.ia;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import org.json.JSONObject;

/** Ponte entre a interface (JavaScript, objeto window.NexoNativo) e o Android. */
final class Ponte {

    interface Anfitriao {
        void pedirMicrofone(Runnable depois);
        boolean naBolha();
        void fecharPainel();
        void ligarBolha();
        void desligarBolha();
        boolean bolhaLigada();
        void abrirPermissoesExtras();
    }

    private final Context ctx;
    private final WebView web;
    private final VozNativa voz;
    private final Anfitriao anf;
    private final Handler h = new Handler(Looper.getMainLooper());

    Ponte(Context c, WebView w, VozNativa v, Anfitriao a) {
        ctx = c; web = w; voz = v; anf = a;
        voz.setOuvinte((tipo, texto) -> evento(tipo, texto));
    }

    void evento(String tipo, String texto) {
        js("window.NexoVoz&&NexoVoz.evento(" + JSONObject.quote(tipo) + "," + JSONObject.quote(texto == null ? "" : texto) + ")");
    }

    void js(String codigo) { web.post(() -> web.evaluateJavascript(codigo, null)); }

    static SharedPreferences prefs(Context c) { return c.getSharedPreferences("nexo", Context.MODE_PRIVATE); }

    @JavascriptInterface public String versao() { return "1"; }
    @JavascriptInterface public boolean podeOuvir() { return voz.disponivel(); }
    @JavascriptInterface public void ouvir() { h.post(() -> anf.pedirMicrofone(() -> voz.ouvir(true))); }
    @JavascriptInterface public void pararOuvir() { voz.pararOuvir(); }
    @JavascriptInterface public void falar(String texto, double velocidade) { voz.falar(texto, (float) velocidade); }
    @JavascriptInterface public void pararFala() { voz.pararFala(); }
    @JavascriptInterface public String apps() { return Apps.listar(ctx); }
    @JavascriptInterface public boolean abrirApp(String pacote) { return Apps.abrir(ctx, pacote); }
    @JavascriptInterface public boolean naBolha() { return anf.naBolha(); }
    @JavascriptInterface public void fecharPainel() { h.post(anf::fecharPainel); }
    @JavascriptInterface public boolean bolhaLigada() { return anf.bolhaLigada(); }
    @JavascriptInterface public void ligarBolha() { h.post(anf::ligarBolha); }
    @JavascriptInterface public void desligarBolha() { h.post(anf::desligarBolha); }
    @JavascriptInterface public void permissoesExtras() { h.post(anf::abrirPermissoesExtras); }

    /** Nome e palavra que a bolha espera ouvir (o serviço não enxerga o localStorage). */
    @JavascriptInterface public void salvarConfig(String nome, String palavra, boolean silenciarBip) {
        prefs(ctx).edit().putString("nome", nome).putString("palavra", palavra).putBoolean("silenciar", silenciarBip).apply();
    }
}
