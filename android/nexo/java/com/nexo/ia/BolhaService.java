package com.nexo.ia;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.PixelFormat;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.InputStream;
import java.text.Normalizer;

/**
 * Bolha flutuante do Nexo: fica por cima dos outros apps, ouve o nome do assistente
 * (ex.: "Jarvis") e abre o painel de conversa por cima de qualquer app.
 * Toque na bolha: abre/fecha o painel. Toque longo: desliga.
 */
public class BolhaService extends Service implements Ponte.Anfitriao {
    static volatile boolean rodando;
    private static final String CANAL = "nexo_bolha", PARAR = "com.nexo.ia.PARAR";

    private final Handler h = new Handler(Looper.getMainLooper());
    private WindowManager wm;
    private ImageView bolha;
    private WindowManager.LayoutParams pBolha, pPainel;
    private FrameLayout painel;
    private WebView web;
    private boolean painelAberto, webPronta, telaLigada = true;
    private String comandoPendente;
    private VozNativa vigia, vozPainel;
    private int esperaErro = 300;
    private BroadcastReceiver telaRx;

    @Override public IBinder onBind(Intent i) { return null; }

    private static int tipoJanela() {
        return Build.VERSION.SDK_INT >= 26 ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY : legado();
    }
    @SuppressWarnings("deprecation") private static int legado() { return WindowManager.LayoutParams.TYPE_PHONE; }

    private int dp(int v) { return Math.round(v * getResources().getDisplayMetrics().density); }

    @Override public void onCreate() {
        super.onCreate();
        rodando = true;
        comecarPrimeiroPlano();
        wm = (WindowManager) getSystemService(WINDOW_SERVICE);
        criarBolha();
        vigia = new VozNativa(this);
        vigia.silenciarBip = prefs().getBoolean("silenciar", true);
        vigia.setOuvinte(this::eventoVigia);
        telaRx = new BroadcastReceiver() {
            @Override public void onReceive(Context c, Intent i) {
                telaLigada = Intent.ACTION_SCREEN_ON.equals(i.getAction());
                if (telaLigada) vigiar(500); else vigia.pararOuvir();
            }
        };
        IntentFilter f = new IntentFilter();
        f.addAction(Intent.ACTION_SCREEN_ON);
        f.addAction(Intent.ACTION_SCREEN_OFF);
        if (Build.VERSION.SDK_INT >= 33) registerReceiver(telaRx, f, Context.RECEIVER_NOT_EXPORTED); else registerReceiver(telaRx, f);
        vigiar(800);
        Toast.makeText(this, "Nexo: diga \"" + palavra() + "\" para chamar", Toast.LENGTH_LONG).show();
    }

    @Override public int onStartCommand(Intent i, int flags, int id) {
        if (i != null && PARAR.equals(i.getAction())) stopSelf();
        return START_NOT_STICKY;
    }

    private SharedPreferences prefs() { return Ponte.prefs(this); }

    private String palavra() {
        String p = prefs().getString("palavra", "");
        if (p == null || p.trim().isEmpty()) p = prefs().getString("nome", "Nexo");
        return p == null || p.trim().isEmpty() ? "Nexo" : p.trim();
    }

    @SuppressWarnings("deprecation")
    private void comecarPrimeiroPlano() {
        NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel c = new NotificationChannel(CANAL, "Assistente flutuante", NotificationManager.IMPORTANCE_LOW);
            c.setDescription("Mostra que o Nexo está esperando você chamar pelo nome");
            nm.createNotificationChannel(c);
        }
        Intent parar = new Intent(this, BolhaService.class).setAction(PARAR);
        PendingIntent pParar = PendingIntent.getService(this, 1, parar, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
        Intent abrir = new Intent(this, MainActivity.class);
        PendingIntent pAbrir = PendingIntent.getActivity(this, 2, abrir, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
        Notification.Builder b = Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(this, CANAL) : new Notification.Builder(this);
        b.setSmallIcon(android.R.drawable.ic_btn_speak_now)
         .setContentTitle("Nexo está ouvindo")
         .setContentText("Diga \"" + palavra() + "\" para chamar o assistente")
         .setOngoing(true)
         .setContentIntent(pAbrir)
         .addAction(new Notification.Action.Builder((android.graphics.drawable.Icon) null, "Desligar", pParar).build());
        Notification n = b.build();
        if (Build.VERSION.SDK_INT >= 30) startForeground(1, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_MICROPHONE);
        else startForeground(1, n);
    }

    // ---------- bolha ----------
    private void criarBolha() {
        bolha = new ImageView(this);
        try (InputStream in = getAssets().open("icon-192.png")) {
            Bitmap bm = BitmapFactory.decodeStream(in);
            bolha.setImageBitmap(bm);
        } catch (Exception e) {
            bolha.setImageResource(android.R.drawable.ic_btn_speak_now);
        }
        GradientDrawable fundo = new GradientDrawable();
        fundo.setShape(GradientDrawable.OVAL);
        fundo.setColor(0xff1a1240);
        fundo.setStroke(dp(2), 0xff7c3aed);
        bolha.setBackground(fundo);
        bolha.setClipToOutline(true);
        bolha.setScaleType(ImageView.ScaleType.CENTER_CROP);
        bolha.setElevation(dp(6));
        bolha.setAlpha(0.9f);
        int tam = dp(58);
        pBolha = new WindowManager.LayoutParams(tam, tam, tipoJanela(),
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, PixelFormat.TRANSLUCENT);
        pBolha.gravity = Gravity.TOP | Gravity.START;
        DisplayMetrics m = getResources().getDisplayMetrics();
        pBolha.x = m.widthPixels - tam - dp(6);
        pBolha.y = m.heightPixels / 3;
        bolha.setOnTouchListener(new View.OnTouchListener() {
            float ix, iy; int bx, by; long t0; boolean moveu, longo;
            final Runnable toqueLongo = () -> { longo = true; Toast.makeText(BolhaService.this, "Nexo desligado", Toast.LENGTH_SHORT).show(); stopSelf(); };
            @Override public boolean onTouch(View v, MotionEvent e) {
                switch (e.getActionMasked()) {
                    case MotionEvent.ACTION_DOWN:
                        ix = e.getRawX(); iy = e.getRawY(); bx = pBolha.x; by = pBolha.y; t0 = System.currentTimeMillis(); moveu = false; longo = false;
                        h.postDelayed(toqueLongo, 900);
                        return true;
                    case MotionEvent.ACTION_MOVE:
                        float dx = e.getRawX() - ix, dy = e.getRawY() - iy;
                        if (!moveu && Math.hypot(dx, dy) > dp(8)) { moveu = true; h.removeCallbacks(toqueLongo); }
                        if (moveu) { pBolha.x = bx + Math.round(dx); pBolha.y = by + Math.round(dy); atualizar(bolha, pBolha); }
                        return true;
                    case MotionEvent.ACTION_UP:
                    case MotionEvent.ACTION_CANCEL:
                        h.removeCallbacks(toqueLongo);
                        if (longo) return true;
                        if (!moveu) { if (painelAberto) fecharPainel(); else abrirPainel(""); }
                        else {   // gruda na borda mais próxima
                            int largura = getResources().getDisplayMetrics().widthPixels;
                            pBolha.x = pBolha.x + bolha.getWidth() / 2 < largura / 2 ? dp(4) : largura - bolha.getWidth() - dp(4);
                            atualizar(bolha, pBolha);
                        }
                        return true;
                }
                return false;
            }
        });
        wm.addView(bolha, pBolha);
    }

    private void atualizar(View v, WindowManager.LayoutParams p) { try { wm.updateViewLayout(v, p); } catch (Exception ignored) {} }

    // ---------- esperando o nome ----------
    private void vigiar(int atraso) {
        h.removeCallbacks(rodarVigia);
        h.postDelayed(rodarVigia, atraso);
    }
    private final Runnable rodarVigia = () -> { if (rodando && !painelAberto && telaLigada) vigia.ouvir(false); };

    private static String normalizar(String s) {
        String n = Normalizer.normalize(s == null ? "" : s, Normalizer.Form.NFD).replaceAll("\\p{M}", "");
        return n.toLowerCase(java.util.Locale.ROOT);
    }

    private void eventoVigia(String tipo, String texto) {
        if ("final".equals(tipo)) {
            esperaErro = 300;
            String alvo = normalizar(palavra());
            for (String frase : texto.split("\n")) {
                String n = normalizar(frase);
                int i = n.indexOf(alvo);
                if (i >= 0) {
                    String resto = frase.length() >= i + alvo.length() ? frase.substring(i + alvo.length()) : "";
                    resto = resto.replaceAll("^[\\s,.!?:;-]+", "").trim();
                    abrirPainel(resto);
                    return;
                }
            }
            vigiar(250);
        } else if ("erro".equals(tipo)) {
            int e = 0;
            try { e = Integer.parseInt(texto); } catch (NumberFormatException ignored) {}
            if (e == 9) { Toast.makeText(this, "Nexo: sem permissão do microfone", Toast.LENGTH_LONG).show(); stopSelf(); return; }
            if (e == 6 || e == 7) { vigiar(250); return; }               // silêncio ou nada reconhecido: volta a ouvir
            esperaErro = Math.min(15000, e == 10 ? 5000 : esperaErro * 2); // ocupado, sem rede, muitos pedidos
            vigiar(esperaErro);
        }
    }

    // ---------- painel de conversa ----------
    private void criarPainel() {
        painel = new FrameLayout(this);
        web = new WebView(this);
        MainActivity.configurar(web);
        web.setBackgroundColor(0x00000000);
        web.setWebChromeClient(new WebChromeClient());
        web.setWebViewClient(new ClienteWeb(this, () -> { webPronta = true; enviarComando(); }));
        vozPainel = new VozNativa(this);
        web.addJavascriptInterface(new Ponte(this, web, vozPainel, this), "NexoNativo");
        painel.addView(web, new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        int altura = Math.round(getResources().getDisplayMetrics().heightPixels * 0.6f);
        pPainel = new WindowManager.LayoutParams(WindowManager.LayoutParams.MATCH_PARENT, altura, tipoJanela(),
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL, PixelFormat.TRANSLUCENT);
        pPainel.gravity = Gravity.BOTTOM;
        web.loadUrl(MainActivity.URL + "?bolha=1");
    }

    private void abrirPainel(String comando) {
        vigia.pararOuvir();
        if (painel == null) criarPainel();
        comandoPendente = comando == null ? "" : comando;
        if (!painelAberto) {
            try { wm.addView(painel, pPainel); } catch (Exception e) { return; }
            painelAberto = true;
            web.onResume();
            bolha.setAlpha(1f);
            // a bolha fica por cima do painel
            try { wm.removeView(bolha); wm.addView(bolha, pBolha); } catch (Exception ignored) {}
        }
        enviarComando();
    }

    private void enviarComando() {
        if (!webPronta || comandoPendente == null || !painelAberto) return;
        String c = comandoPendente;
        comandoPendente = null;
        web.evaluateJavascript("window.NexoBolha&&NexoBolha.ativar(" + JSONObject.quote(c) + ")", null);
    }

    @Override public void fecharPainel() {
        if (!painelAberto) return;
        painelAberto = false;
        if (vozPainel != null) { vozPainel.pararOuvir(); vozPainel.pararFala(); }
        web.evaluateJavascript("window.NexoBolha&&NexoBolha.desativar()", null);
        try { wm.removeView(painel); } catch (Exception ignored) {}
        web.onPause();
        bolha.setAlpha(0.9f);
        vigiar(700);
    }

    // ---------- ponte do painel ----------
    @Override public void pedirMicrofone(Runnable depois) {
        if (Build.VERSION.SDK_INT < 23 || checkSelfPermission(android.Manifest.permission.RECORD_AUDIO) == android.content.pm.PackageManager.PERMISSION_GRANTED) depois.run();
        else Toast.makeText(this, "Abra o Nexo e permita o microfone", Toast.LENGTH_LONG).show();
    }
    @Override public boolean naBolha() { return true; }
    @Override public void ligarBolha() {}
    @Override public void desligarBolha() { stopSelf(); }
    @Override public boolean bolhaLigada() { return true; }
    @Override public void abrirPermissoesExtras() {
        Intent i = new Intent(this, MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(i);
    }

    @Override public void onDestroy() {
        rodando = false;
        h.removeCallbacksAndMessages(null);
        try { unregisterReceiver(telaRx); } catch (Exception ignored) {}
        if (vigia != null) vigia.destruir();
        if (vozPainel != null) vozPainel.destruir();
        try { if (painelAberto) wm.removeView(painel); } catch (Exception ignored) {}
        try { wm.removeView(bolha); } catch (Exception ignored) {}
        if (web != null) web.destroy();
        super.onDestroy();
    }
}
