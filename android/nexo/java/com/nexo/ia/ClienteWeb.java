package com.nexo.ia;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

/** Mantém a interface dentro do app e manda links (sites, telefone, WhatsApp, alarme…) para os apps certos. */
class ClienteWeb extends WebViewClient {
    private final Context ctx;
    private final Runnable aoCarregar;

    ClienteWeb(Context c, Runnable aoCarregar) { ctx = c; this.aoCarregar = aoCarregar; }

    static boolean abrirFora(Context c, String url) {
        if (url == null || url.startsWith("file:") || url.startsWith("about:") || url.startsWith("blob:") || url.startsWith("data:") || url.startsWith("javascript:")) return false;
        try {
            Intent i;
            if (url.startsWith("intent:")) {
                i = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
                i.setComponent(null);
                i.setSelector(null);
            } else {
                i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            }
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            c.startActivity(i);
        } catch (Exception e) {
            Toast.makeText(c, "Não achei um app para abrir isso", Toast.LENGTH_SHORT).show();
        }
        return true;
    }

    @Override public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) { return abrirFora(ctx, r.getUrl().toString()); }

    @SuppressWarnings("deprecation")
    @Override public boolean shouldOverrideUrlLoading(WebView v, String url) { return abrirFora(ctx, url); }

    @Override public void onPageFinished(WebView v, String url) { if (aoCarregar != null) aoCarregar.run(); }
}
