package com.ww1studio.frenteocidental;

import android.app.Activity;
import android.os.Bundle;
import android.os.SystemClock;
import android.view.InputDevice;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.webkit.WebViewAssetLoader;

// Tela cheia, deitada, com o jogo WebGL (pasta ww1/) servido de dentro do APK.
public class MainActivity extends Activity {
    private static final String URL = "https://appassets.androidplatform.net/assets/index.html";
    private WebView web;

    // Estado do controle (PS4/DualShock 4 via Bluetooth, Xbox, genéricos), lido pelo jogo a cada quadro.
    private volatile float lx, ly, rx, ry, l2, r2, hx, hy;
    private volatile int mask;
    private volatile boolean padConnected;
    private long lastDeviceCheck;

    // mesma ordem de bits do js/gamepad.js
    private static int bitFor(int keyCode) {
        switch (keyCode) {
            case KeyEvent.KEYCODE_BUTTON_A: return 0;       // X (cruz)
            case KeyEvent.KEYCODE_BUTTON_B: return 1;       // círculo
            case KeyEvent.KEYCODE_BUTTON_X: return 2;       // quadrado
            case KeyEvent.KEYCODE_BUTTON_Y: return 3;       // triângulo
            case KeyEvent.KEYCODE_BUTTON_L1: return 4;
            case KeyEvent.KEYCODE_BUTTON_R1: return 5;
            case KeyEvent.KEYCODE_BUTTON_L2: return 6;
            case KeyEvent.KEYCODE_BUTTON_R2: return 7;
            case KeyEvent.KEYCODE_BUTTON_SELECT: return 8;  // share
            case KeyEvent.KEYCODE_BUTTON_START: return 9;   // options
            case KeyEvent.KEYCODE_BUTTON_THUMBL: return 10;
            case KeyEvent.KEYCODE_BUTTON_THUMBR: return 11;
            case KeyEvent.KEYCODE_DPAD_UP: return 12;
            case KeyEvent.KEYCODE_DPAD_DOWN: return 13;
            case KeyEvent.KEYCODE_DPAD_LEFT: return 14;
            case KeyEvent.KEYCODE_DPAD_RIGHT: return 15;
            case KeyEvent.KEYCODE_BUTTON_MODE: return 16;   // PS
            default: return -1;
        }
    }

    private static boolean fromPad(int source) {
        return (source & InputDevice.SOURCE_GAMEPAD) == InputDevice.SOURCE_GAMEPAD
                || (source & InputDevice.SOURCE_JOYSTICK) == InputDevice.SOURCE_JOYSTICK;
    }

    private void checkDevices() {
        long now = SystemClock.uptimeMillis();
        if (now - lastDeviceCheck < 1500) return;
        lastDeviceCheck = now;
        boolean found = false;
        for (int id : InputDevice.getDeviceIds()) {
            InputDevice d = InputDevice.getDevice(id);
            if (d != null && fromPad(d.getSources())) { found = true; break; }
        }
        padConnected = found;
    }

    public class PadBridge {
        @JavascriptInterface
        public String state() {
            checkDevices();
            return lx + "," + ly + "," + rx + "," + ry + "," + l2 + "," + r2 + "," + hx + "," + hy + "," + mask + "," + (padConnected ? 1 : 0);
        }
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent e) {
        int bit = bitFor(e.getKeyCode());
        if (bit >= 0 && (fromPad(e.getSource()) || KeyEvent.isGamepadButton(e.getKeyCode()))) {
            if (e.getAction() == KeyEvent.ACTION_DOWN) mask |= (1 << bit);
            else if (e.getAction() == KeyEvent.ACTION_UP) mask &= ~(1 << bit);
            padConnected = true;
            return true;
        }
        return super.dispatchKeyEvent(e);
    }

    private static float axis(MotionEvent e, int a) {
        return e.getAxisValue(a);
    }

    @Override
    public boolean dispatchGenericMotionEvent(MotionEvent e) {
        if ((e.getSource() & InputDevice.SOURCE_JOYSTICK) == InputDevice.SOURCE_JOYSTICK && e.getAction() == MotionEvent.ACTION_MOVE) {
            lx = axis(e, MotionEvent.AXIS_X);
            ly = axis(e, MotionEvent.AXIS_Y);
            rx = axis(e, MotionEvent.AXIS_Z);
            ry = axis(e, MotionEvent.AXIS_RZ);
            l2 = Math.max(axis(e, MotionEvent.AXIS_LTRIGGER), axis(e, MotionEvent.AXIS_BRAKE));
            r2 = Math.max(axis(e, MotionEvent.AXIS_RTRIGGER), axis(e, MotionEvent.AXIS_GAS));
            hx = axis(e, MotionEvent.AXIS_HAT_X);
            hy = axis(e, MotionEvent.AXIS_HAT_Y);
            padConnected = true;
            return true;
        }
        return super.dispatchGenericMotionEvent(e);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON | WindowManager.LayoutParams.FLAG_FULLSCREEN);

        web = new WebView(this);
        web.setBackgroundColor(0xFF1B1A16);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);

        // Servir os arquivos por https evita bloqueios de arquivos locais (file://) nos Androids novos.
        final WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();
        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return loader.shouldInterceptRequest(request.getUrl());
            }
        });
        web.setWebChromeClient(new WebChromeClient());
        web.addJavascriptInterface(new PadBridge(), "AndroidPad");

        setContentView(web);
        hideBars();
        web.loadUrl(URL);
    }

    private void hideBars() {
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideBars();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (web != null) {
            web.evaluateJavascript("window.WW1&&WW1.game&&WW1.game.pause&&WW1.game.pause()", null);
            web.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (web != null) web.onResume();
    }

    @Override
    public void onBackPressed() {
        // o botão voltar pausa/continua o jogo em vez de fechar
        if (web != null) web.evaluateJavascript("window.androidBack&&androidBack()", null);
    }
}
