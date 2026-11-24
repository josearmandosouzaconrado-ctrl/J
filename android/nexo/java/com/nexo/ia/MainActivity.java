package com.nexo.ia;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.Window;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends Activity implements Ponte.Anfitriao {
    static final String URL = "file:///android_asset/index.html";
    private static final int PEDIDO_MIC = 1, PEDIDO_NOTIF = 3;

    private WebView web;
    private VozNativa voz;
    private Ponte ponte;
    private Runnable aposMic;
    private boolean querBolha;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    static void configurar(WebView w) {
        WebSettings s = w.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowUniversalAccessFromFileURLs(true);
        s.setMediaPlaybackRequiresUserGesture(false);
    }

    @Override protected void onCreate(Bundle b) {
        super.onCreate(b);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        web = new WebView(this);
        web.setBackgroundColor(0xff0d0f14);
        configurar(web);
        web.setWebViewClient(new ClienteWeb(this, null));
        web.setWebChromeClient(new WebChromeClient());
        voz = new VozNativa(this);
        ponte = new Ponte(this, web, voz, this);
        web.addJavascriptInterface(ponte, "NexoNativo");
        setContentView(web);
        web.loadUrl(URL);
    }

    // ---------- microfone ----------
    @Override public void pedirMicrofone(Runnable depois) {
        if (Build.VERSION.SDK_INT < 23 || checkSelfPermission(Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED) { depois.run(); return; }
        aposMic = depois;
        requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, PEDIDO_MIC);
    }

    @Override public void onRequestPermissionsResult(int pedido, String[] perms, int[] res) {
        boolean ok = res.length > 0 && res[0] == PackageManager.PERMISSION_GRANTED;
        if (pedido == PEDIDO_MIC) {
            Runnable r = aposMic; aposMic = null;
            if (ok && r != null) r.run(); else ponte.evento("erro", "9");
        } else if (pedido == PEDIDO_NOTIF) {
            iniciarServico();
        }
    }

    // ---------- bolha flutuante ----------
    @Override public void ligarBolha() {
        querBolha = true;
        pedirMicrofone(() -> {
            if (Build.VERSION.SDK_INT >= 23 && !Settings.canDrawOverlays(this)) {
                ponte.evento("bolha", "sobreposicao");
                try { startActivity(new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getPackageName()))); }
                catch (ActivityNotFoundException e) { abrirPermissoesExtras(); }
                return;   // continua em onResume, quando a pessoa voltar com a permissão
            }
            if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, PEDIDO_NOTIF);
                return;
            }
            iniciarServico();
        });
    }

    private void iniciarServico() {
        querBolha = false;
        Intent i = new Intent(this, BolhaService.class);
        try {
            if (Build.VERSION.SDK_INT >= 26) startForegroundService(i); else startService(i);
            ponte.evento("bolha", "ligada");
        } catch (Exception e) {
            ponte.evento("bolha", "erro:" + e.getMessage());
        }
    }

    @Override public void desligarBolha() {
        stopService(new Intent(this, BolhaService.class));
        ponte.evento("bolha", "desligada");
    }

    @Override public boolean bolhaLigada() { return BolhaService.rodando; }
    @Override public boolean naBolha() { return false; }
    @Override public void fecharPainel() {}

    @Override public void abrirPermissoesExtras() {
        // Xiaomi/Redmi (MIUI/HyperOS): tela com "pop-up em segundo plano", "exibir na tela de bloqueio" e outras
        try {
            Intent i = new Intent("miui.intent.action.APP_PERM_EDITOR");
            i.setClassName("com.miui.securitycenter", "com.miui.permcenter.permissions.PermissionsEditorActivity");
            i.putExtra("extra_pkgname", getPackageName());
            startActivity(i);
        } catch (Exception e) {
            startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:" + getPackageName())));
        }
    }

    // ---------- ciclo de vida ----------
    @Override protected void onResume() {
        super.onResume();
        web.onResume();
        if (querBolha && !BolhaService.rodando && (Build.VERSION.SDK_INT < 23 || Settings.canDrawOverlays(this))) ligarBolha();
        ponte.js("window.NexoVoz&&NexoVoz.evento('voltou','')");
    }

    @Override protected void onPause() {
        super.onPause();
        web.onPause();
        voz.pararOuvir();
        voz.pararFala();
    }

    @Override protected void onDestroy() {
        voz.destruir();
        web.destroy();
        super.onDestroy();
    }

    @SuppressWarnings("deprecation")
    @Override public void onBackPressed() {
        if (web.canGoBack()) web.goBack(); else super.onBackPressed();
    }
}
