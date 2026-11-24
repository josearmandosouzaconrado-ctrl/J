package com.nexo.ia;

import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;

import java.util.ArrayList;
import java.util.Locale;

/** Reconhecimento de voz e voz falada do próprio Android (funciona dentro do APK, ao contrário do WebView). */
final class VozNativa implements RecognitionListener, TextToSpeech.OnInitListener {

    interface Ouvinte { void evento(String tipo, String texto); }

    private final Context ctx;
    private final Handler h = new Handler(Looper.getMainLooper());
    private final AudioManager am;
    private SpeechRecognizer rec;
    private TextToSpeech tts;
    private boolean ttsPronto;
    private Ouvinte ouvinte = (t, x) -> {};
    private boolean mutado;
    boolean silenciarBip;
    private int fala;

    VozNativa(Context c) {
        ctx = c;
        am = (AudioManager) c.getSystemService(Context.AUDIO_SERVICE);
        tts = new TextToSpeech(c, this);
    }

    void setOuvinte(Ouvinte o) { ouvinte = o; }

    boolean disponivel() { return SpeechRecognizer.isRecognitionAvailable(ctx); }

    @Override public void onInit(int estado) {
        if (estado != TextToSpeech.SUCCESS) return;
        tts.setLanguage(new Locale("pt", "BR"));
        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override public void onStart(String id) {}
            @Override public void onDone(String id) { if (id.endsWith("#fim")) h.post(() -> ouvinte.evento("fimFala", id)); }
            @Override public void onError(String id) { h.post(() -> ouvinte.evento("fimFala", id)); }
        });
        ttsPronto = true;
    }

    // ---------- ouvir ----------
    void ouvir(boolean parciais) {
        h.post(() -> {
            fecharReconhecedor();
            try {
                rec = SpeechRecognizer.createSpeechRecognizer(ctx);
                rec.setRecognitionListener(this);
                Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "pt-BR");
                i.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, parciais);
                i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 3);
                i.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, ctx.getPackageName());
                if (silenciarBip) mutar(true);
                rec.startListening(i);
            } catch (Exception e) {
                mutar(false);
                ouvinte.evento("erro", "5");
            }
        });
    }

    void pararOuvir() { h.post(this::fecharReconhecedor); }

    private void fecharReconhecedor() {
        if (rec != null) {
            try { rec.cancel(); } catch (Exception ignored) {}
            try { rec.destroy(); } catch (Exception ignored) {}
            rec = null;
        }
        mutar(false);
    }

    private void mutar(boolean m) {
        if (m == mutado || am == null) return;
        try {
            am.adjustStreamVolume(AudioManager.STREAM_MUSIC, m ? AudioManager.ADJUST_MUTE : AudioManager.ADJUST_UNMUTE, 0);
            mutado = m;
        } catch (Exception ignored) {}
    }

    @Override public void onReadyForSpeech(Bundle b) {
        if (mutado) h.postDelayed(() -> mutar(false), 400);
        ouvinte.evento("pronto", "");
    }
    @Override public void onBeginningOfSpeech() {}
    @Override public void onRmsChanged(float v) {}
    @Override public void onBufferReceived(byte[] b) {}
    @Override public void onEndOfSpeech() {}
    @Override public void onEvent(int t, Bundle b) {}

    @Override public void onPartialResults(Bundle b) {
        ArrayList<String> r = b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        if (r != null && !r.isEmpty()) ouvinte.evento("parcial", r.get(0));
    }

    @Override public void onResults(Bundle b) {
        mutar(false);
        ArrayList<String> r = b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        StringBuilder s = new StringBuilder();
        if (r != null) for (String x : r) { if (s.length() > 0) s.append('\n'); s.append(x); }
        ouvinte.evento("final", s.toString());
    }

    @Override public void onError(int erro) {
        mutar(false);
        ouvinte.evento("erro", String.valueOf(erro));
    }

    // ---------- falar ----------
    void falar(String texto, float velocidade) {
        h.post(() -> {
            fecharReconhecedor();
            if (!ttsPronto || texto == null || texto.trim().isEmpty()) { ouvinte.evento("fimFala", ""); return; }
            tts.setSpeechRate(velocidade > 0 ? velocidade : 1f);
            int max = Math.max(500, TextToSpeech.getMaxSpeechInputLength() - 100);
            String t = texto.trim();
            int n = ++fala, parte = 0;
            while (!t.isEmpty()) {
                String pedaco = t.length() > max ? t.substring(0, max) : t;
                t = t.substring(pedaco.length());
                String id = "f" + n + "_" + (parte++) + (t.isEmpty() ? "#fim" : "");
                tts.speak(pedaco, parte == 1 ? TextToSpeech.QUEUE_FLUSH : TextToSpeech.QUEUE_ADD, null, id);
            }
        });
    }

    void pararFala() { h.post(() -> { if (tts != null) tts.stop(); }); }

    void destruir() {
        fecharReconhecedor();
        if (tts != null) { try { tts.shutdown(); } catch (Exception ignored) {} tts = null; }
    }
}
