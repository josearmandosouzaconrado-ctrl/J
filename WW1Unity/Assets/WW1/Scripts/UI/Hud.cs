using UnityEngine;

namespace WW1
{
    // Interface (IMGUI, sem pacotes extras): menus, briefing, HUD de combate, telas de morte e vitória.
    public class Hud : MonoBehaviour
    {
        string msg;
        float msgUntil, hitUntil, hurtT = -10f;
        bool hitKill, hitHead;
        int victoryPage;
        float u, lastU = -1f;
        GUIStyle title, big, text, small, btn, tiny, center, mid;
        Texture2D dark, btnTex, btnHover;

        public void Message(string m, float seconds)
        {
            msg = m;
            msgUntil = Time.unscaledTime + seconds;
        }

        public void HitMarker(bool kill, bool head)
        {
            hitUntil = Time.unscaledTime + (kill ? 0.45f : 0.25f);
            hitKill = kill;
            hitHead = head;
            if (kill) Sfx.Play2D(Sfx.Thump, 0.35f, 1.6f);
        }

        public void OnPlayerHit() { hurtT = Time.time; }

        public void ResetVictoryPages() { victoryPage = 0; }

        void Update()
        {
            var g = Game.I;
            if (g == null || g.player == null) return;
            float hp = g.player.health.hp / g.player.health.max;
            Sfx.SetHeart(g.state == GameState.Playing && hp < 0.4f ? (0.4f - hp) / 0.4f + 0.3f : 0f);
        }

        void Styles()
        {
            u = Mathf.Min(Screen.height / 1080f, Screen.width / 1920f * 1.15f);
            if (title != null && Mathf.Approximately(u, lastU)) return;
            lastU = u;
            dark = Solid(new Color(0.03f, 0.03f, 0.02f, 0.78f));
            btnTex = Solid(new Color(0.16f, 0.15f, 0.11f, 0.92f));
            btnHover = Solid(new Color(0.32f, 0.27f, 0.17f, 0.95f));

            title = new GUIStyle(GUI.skin.label) { fontSize = Mathf.RoundToInt(92 * u), fontStyle = FontStyle.Bold, alignment = TextAnchor.MiddleLeft, wordWrap = false };
            big = new GUIStyle(GUI.skin.label) { fontSize = Mathf.RoundToInt(64 * u), fontStyle = FontStyle.Bold, alignment = TextAnchor.MiddleCenter, wordWrap = true };
            mid = new GUIStyle(GUI.skin.label) { fontSize = Mathf.RoundToInt(44 * u), fontStyle = FontStyle.Bold, alignment = TextAnchor.MiddleCenter, wordWrap = true };
            text = new GUIStyle(GUI.skin.label) { fontSize = Mathf.RoundToInt(34 * u), alignment = TextAnchor.UpperLeft, wordWrap = true };
            center = new GUIStyle(text) { alignment = TextAnchor.UpperCenter };
            small = new GUIStyle(GUI.skin.label) { fontSize = Mathf.RoundToInt(28 * u), alignment = TextAnchor.MiddleLeft, wordWrap = true };
            tiny = new GUIStyle(GUI.skin.label) { fontSize = Mathf.RoundToInt(24 * u), alignment = TextAnchor.MiddleCenter, fontStyle = FontStyle.Bold, wordWrap = false };
            foreach (var s in new[] { title, big, mid, text, center, small, tiny }) s.normal.textColor = Color.white;
            btn = new GUIStyle(GUI.skin.button) { fontSize = Mathf.RoundToInt(36 * u), fontStyle = FontStyle.Bold, alignment = TextAnchor.MiddleCenter };
            btn.normal.background = btnTex;
            btn.hover.background = btnHover;
            btn.active.background = btnHover;
            btn.focused.background = btnTex;
            btn.normal.textColor = btn.hover.textColor = btn.active.textColor = btn.focused.textColor = new Color(0.95f, 0.9f, 0.78f);
            btn.border = new RectOffset(0, 0, 0, 0);
        }

        static Texture2D Solid(Color c)
        {
            var t = new Texture2D(2, 2);
            t.SetPixels(new[] { c, c, c, c });
            t.Apply();
            return t;
        }

        void Label(Rect r, string s, GUIStyle st, Color c)
        {
            Color old = GUI.color;
            GUI.color = new Color(0, 0, 0, c.a * 0.85f);
            GUI.Label(new Rect(r.x + 3 * u, r.y + 3 * u, r.width, r.height), s, st);
            GUI.color = c;
            GUI.Label(r, s, st);
            GUI.color = old;
        }

        void Tex(Rect r, Texture t, Color c)
        {
            Color old = GUI.color;
            GUI.color = c;
            GUI.DrawTexture(r, t);
            GUI.color = old;
        }

        bool Button(Rect r, string s)
        {
            bool b = GUI.Button(r, s, btn);
            if (b) Sfx.Play2D(Sfx.Click, 0.6f, 0.9f);
            return b;
        }

        void OnGUI()
        {
            var g = Game.I;
            if (g == null) return;
            Styles();
            GUI.depth = 0;
            float W = Screen.width, H = Screen.height;

            switch (g.state)
            {
                case GameState.Menu: DrawMenu(g, W, H); break;
                case GameState.Briefing: DrawBriefing(g, W, H); break;
                case GameState.Playing: DrawHud(g, W, H); break;
                case GameState.Paused: DrawHud(g, W, H); DrawPause(g, W, H); break;
                case GameState.Dead: DrawHud(g, W, H); DrawDead(g, W, H); break;
                case GameState.Victory: DrawVictory(g, W, H); break;
            }

            if (g.fade > 0.001f) Tex(new Rect(0, 0, W, H), Mats.White, new Color(0, 0, 0, g.fade));
        }

        // ---------------- MENU ----------------
        void DrawMenu(Game g, float W, float H)
        {
            Tex(new Rect(0, 0, W * 0.55f, H), dark, new Color(1, 1, 1, 0.75f));
            Tex(new Rect(0, 0, W, H), Mats.Vignette, new Color(0, 0, 0, 0.7f));
            float x = 90 * u, y = 110 * u, bw = 640 * u, bh = 92 * u, gap = 22 * u;
            Label(new Rect(x, y, W, 110 * u), "FRENTE OCIDENTAL", title, new Color(0.93f, 0.88f, 0.74f));
            y += 105 * u;
            Label(new Rect(x + 6 * u, y, W, 60 * u), "1916  ·  A Batalha do Somme", small, new Color(0.8f, 0.72f, 0.55f));
            y += 110 * u;

            if (Button(new Rect(x, y, bw, bh), "INICIAR CAMPANHA")) g.StartBriefing();
            y += bh + gap;
            string[] diff = { "Recruta", "Soldado", "Veterano" };
            if (Button(new Rect(x, y, bw, bh), "Dificuldade: " + diff[Game.Difficulty])) Game.Difficulty = (Game.Difficulty + 1) % 3;
            y += bh + gap;
            if (Button(new Rect(x, y, bw, bh), "Gráficos: " + (Game.LowQuality ? "Desempenho" : "Realista")))
            {
                Game.LowQuality = !Game.LowQuality;
                g.ApplyQuality();
            }
            y += bh + gap;
            float sw = bh * 1.2f;
            if (Button(new Rect(x, y, sw, bh), "-")) Game.Sensitivity = Mathf.Max(0.3f, Game.Sensitivity - 0.1f);
            GUI.Box(new Rect(x + sw + gap, y, bw - 2 * (sw + gap), bh), "", btn);
            Label(new Rect(x + sw + gap, y, bw - 2 * (sw + gap), bh), "Sensibilidade " + Game.Sensitivity.ToString("0.0"), tiny, Color.white);
            if (Button(new Rect(x + bw - sw, y, sw, bh), "+")) Game.Sensitivity = Mathf.Min(3f, Game.Sensitivity + 0.1f);
            y += bh + gap;
            if (Application.platform != RuntimePlatform.WebGLPlayer && Button(new Rect(x, y, bw, bh), "Sair")) Application.Quit();

            Label(new Rect(x, H - 150 * u, W * 0.5f, 120 * u),
                "Use fones de ouvido.  Celular: joystick à esquerda, arraste à direita para olhar.\nPC: WASD, mouse, clique atira, botão direito mira, R, G, F, C, M, Esc.",
                small, new Color(0.75f, 0.72f, 0.65f, 0.9f));
        }

        void DrawBriefing(Game g, float W, float H)
        {
            Tex(new Rect(0, 0, W, H), dark, new Color(1, 1, 1, 0.9f));
            float pw = Mathf.Min(W - 120 * u, 1500 * u);
            float px = (W - pw) * 0.5f;
            float y = 90 * u;
            Label(new Rect(px, y, pw, 80 * u), "1º DE JULHO DE 1916 — RIO SOMME, FRANÇA", mid, new Color(0.93f, 0.85f, 0.65f));
            y += 120 * u;
            Label(new Rect(px, y, pw, H * 0.55f), Mission.BriefingText, text, new Color(0.92f, 0.9f, 0.85f));
            if (Button(new Rect(W * 0.5f - 380 * u, H - 190 * u, 760 * u, 110 * u), "IR PARA A TRINCHEIRA")) g.BeginMission();
        }

        // ---------------- HUD ----------------
        void DrawHud(Game g, float W, float H)
        {
            var p = g.player;
            var m = g.mission;
            if (p == null) return;

            // Gás e máscara
            if (p.GasExposure > 0.01f) Tex(new Rect(0, 0, W, H), Mats.White, new Color(0.55f, 0.6f, 0.2f, p.GasExposure * 0.45f));
            if (p.maskOn)
            {
                Tex(new Rect(0, 0, W, H), Mats.White, new Color(0.35f, 0.4f, 0.3f, 0.12f));
                Tex(new Rect(-W * 0.05f, -H * 0.1f, W * 1.1f, H * 1.2f), Mats.MaskView, Color.white);
            }

            // Dano: vinheta vermelha e indicador de direção
            float hp = p.health.hp / p.health.max;
            float hurt = Mathf.Clamp01(1f - (Time.time - hurtT) / 0.8f);
            float low = hp < 0.45f ? (0.45f - hp) / 0.45f * (0.75f + 0.25f * Mathf.Sin(Time.time * 6f)) : 0f;
            float red = Mathf.Max(hurt * 0.7f, low * 0.85f);
            if (red > 0.01f) Tex(new Rect(0, 0, W, H), Mats.Vignette, new Color(0.55f, 0f, 0f, red));
            if (hurt > 0.01f && p.cam != null)
            {
                Vector3 d = p.LastHitFrom - p.transform.position;
                d.y = 0f;
                Vector3 f = p.cam.transform.forward;
                f.y = 0f;
                float ang = Vector3.SignedAngle(f, d, Vector3.up);
                Vector2 c = new Vector2(W * 0.5f, H * 0.5f);
                Matrix4x4 old = GUI.matrix;
                GUIUtility.RotateAroundPivot(ang, c);
                Tex(new Rect(c.x - 90 * u, c.y - 300 * u, 180 * u, 26 * u), Mats.White, new Color(0.8f, 0.05f, 0.02f, hurt * 0.85f));
                GUI.matrix = old;
            }

            bool showTouch = TouchControls.I != null && TouchControls.I.showTouch;

            // Mira
            if (p.weapon.AdsAmount < 0.5f && !p.health.Dead)
            {
                float spread = (14f + p.moveInput.magnitude * 22f) * u;
                Vector2 c = new Vector2(W * 0.5f, H * 0.5f);
                Color cc = new Color(1f, 1f, 1f, 0.75f);
                float l = 16f * u, t = 3f * u;
                Tex(new Rect(c.x - spread - l, c.y - t * 0.5f, l, t), Mats.White, cc);
                Tex(new Rect(c.x + spread, c.y - t * 0.5f, l, t), Mats.White, cc);
                Tex(new Rect(c.x - t * 0.5f, c.y + spread, t, l), Mats.White, cc);
                Tex(new Rect(c.x - t * 0.5f, c.y - 2f * u, t, 4f * u), Mats.White, cc);
            }
            if (Time.unscaledTime < hitUntil)
            {
                Vector2 c = new Vector2(W * 0.5f, H * 0.5f);
                Color hc = hitKill ? (hitHead ? new Color(1f, 0.35f, 0.2f) : new Color(1f, 0.2f, 0.15f)) : Color.white;
                Matrix4x4 old = GUI.matrix;
                GUIUtility.RotateAroundPivot(45f, c);
                float a = 12f * u, b = 22f * u, t = 4f * u;
                Tex(new Rect(c.x - b - a, c.y - t / 2, b, t), Mats.White, hc);
                Tex(new Rect(c.x + a, c.y - t / 2, b, t), Mats.White, hc);
                Tex(new Rect(c.x - t / 2, c.y - b - a, t, b), Mats.White, hc);
                Tex(new Rect(c.x - t / 2, c.y + a, t, b), Mats.White, hc);
                GUI.matrix = old;
            }
            if (p.weapon.Reloading)
            {
                Rect r = new Rect(W * 0.5f - 120 * u, H * 0.5f + 70 * u, 240 * u, 12 * u);
                Tex(r, Mats.White, new Color(0, 0, 0, 0.5f));
                Tex(new Rect(r.x, r.y, r.width * p.weapon.ReloadProgress, r.height), Mats.White, new Color(0.95f, 0.85f, 0.6f, 0.9f));
                Label(new Rect(r.x - 100 * u, r.y + 16 * u, r.width + 200 * u, 40 * u), "RECARREGANDO", tiny, Color.white);
            }

            // Objetivo
            if (m != null && !string.IsNullOrEmpty(m.objective))
            {
                float ow = Mathf.Min(900 * u, W * 0.5f);
                Rect box = new Rect(30 * u, 26 * u, ow, (m.timerText != null ? 175 : 130) * u);
                Tex(box, dark, new Color(1, 1, 1, 0.55f));
                Label(new Rect(box.x + 22 * u, box.y + 8 * u, ow, 36 * u), "OBJETIVO", tiny, new Color(0.9f, 0.75f, 0.45f));
                var st = new GUIStyle(small) { alignment = TextAnchor.UpperLeft };
                Label(new Rect(box.x + 22 * u, box.y + 46 * u, ow - 40 * u, 90 * u), m.objective, st, Color.white);
                if (m.timerText != null)
                    Label(new Rect(box.x + 22 * u, box.y + 128 * u, ow, 40 * u), m.timerText, small, new Color(1f, 0.85f, 0.5f));
            }

            // Marcador do objetivo no mundo
            if (m != null && m.hasMarker && p.cam != null && !p.health.Dead)
            {
                Vector3 sp = p.cam.WorldToScreenPoint(m.markerPos + Vector3.up * 1.5f);
                bool behind = sp.z < 0f;
                Vector2 s = new Vector2(sp.x, H - sp.y);
                if (behind) s = new Vector2(W - s.x, H - s.y);
                float mx = 80 * u, my = 220 * u;
                bool clamped = behind || s.x < mx || s.x > W - mx || s.y < my || s.y > H - my;
                s.x = Mathf.Clamp(s.x, mx, W - mx);
                s.y = Mathf.Clamp(behind ? H - my : s.y, my, H - my);
                float dist = Vector3.Distance(p.transform.position, m.markerPos);
                float pulse = 0.75f + 0.25f * Mathf.Sin(Time.time * 4f);
                Matrix4x4 old = GUI.matrix;
                GUIUtility.RotateAroundPivot(45f, s);
                Tex(new Rect(s.x - 16 * u, s.y - 16 * u, 32 * u, 32 * u), Mats.White, new Color(1f, 0.82f, 0.35f, 0.9f * pulse));
                GUI.matrix = old;
                Label(new Rect(s.x - 150 * u, s.y + 22 * u, 300 * u, 40 * u), (clamped ? "> " : "") + Mathf.RoundToInt(dist) + " m", tiny, new Color(1f, 0.9f, 0.6f));
            }

            // Vida
            {
                float bw = 520 * u, bh = 22 * u;
                Rect r = new Rect(W * 0.5f - bw * 0.5f, H - 58 * u, bw, bh);
                Tex(new Rect(r.x - 4 * u, r.y - 4 * u, r.width + 8 * u, r.height + 8 * u), Mats.White, new Color(0, 0, 0, 0.5f));
                Color hc = Color.Lerp(new Color(0.75f, 0.1f, 0.05f), new Color(0.75f, 0.72f, 0.55f), hp);
                Tex(new Rect(r.x, r.y, r.width * hp, r.height), Mats.White, hc);
                Label(new Rect(r.x, r.y - 42 * u, r.width, 36 * u), "VIDA", tiny, new Color(1, 1, 1, 0.8f));
            }

            // Munição
            {
                var w = p.weapon;
                float ax = showTouch ? W - 760 * u : W - 420 * u;
                float ay = showTouch ? 30 * u : H - 170 * u;
                var st = new GUIStyle(big) { alignment = TextAnchor.MiddleRight };
                Label(new Rect(ax, ay, 300 * u, 80 * u), w.mag.ToString(), st, w.mag == 0 ? new Color(1f, 0.4f, 0.3f) : Color.white);
                Label(new Rect(ax + 310 * u, ay + 10 * u, 200 * u, 70 * u), "/ " + w.reserve, small, new Color(1, 1, 1, 0.8f));
                Label(new Rect(ax + 310 * u, ay + 70 * u, 300 * u, 50 * u), "Granadas: " + w.grenades, small, new Color(0.9f, 0.88f, 0.7f));
            }

            if (p.InWire) Label(new Rect(0, H * 0.62f, W, 60 * u), "ARAME FARPADO — você está lento!", mid, new Color(1f, 0.6f, 0.4f));
            if (g.gasActive && !p.maskOn) Label(new Rect(0, H * 0.68f, W, 60 * u), "GÁS! COLOQUE A MÁSCARA!", mid, new Color(0.85f, 1f, 0.4f, 0.6f + 0.4f * Mathf.Sin(Time.time * 8f)));

            if (Time.unscaledTime < msgUntil && !string.IsNullOrEmpty(msg))
            {
                float a = Mathf.Clamp01((msgUntil - Time.unscaledTime) * 2f);
                Label(new Rect(W * 0.1f, H * 0.24f, W * 0.8f, 160 * u), msg, big, new Color(1f, 0.95f, 0.85f, a));
            }

            if (showTouch && g.state == GameState.Playing) DrawTouch(p, W, H);
            else if (g.state == GameState.Playing && g.playTime < 25f && Cursor.lockState != CursorLockMode.Locked)
                Label(new Rect(0, H - 130 * u, W, 50 * u), "Clique na tela para controlar a mira com o mouse", tiny, new Color(1, 1, 1, 0.8f));
        }

        void DrawTouch(PlayerController p, float W, float H)
        {
            var tc = TouchControls.I;
            Vector2 jo = tc.joyActive ? tc.joyOrigin : tc.joyHome;
            Vector2 jp = tc.joyActive ? tc.joyPos : tc.joyHome;
            Vector2 dd = jp - jo;
            if (dd.magnitude > tc.joyRadius) jp = jo + dd.normalized * tc.joyRadius;
            float r = tc.joyRadius;
            Tex(new Rect(jo.x - r, jo.y - r, r * 2, r * 2), Mats.Circle, new Color(0, 0, 0, 0.22f));
            Tex(new Rect(jo.x - r, jo.y - r, r * 2, r * 2), Mats.Ring, new Color(1, 1, 1, 0.35f));
            float k = r * 0.45f;
            Tex(new Rect(jp.x - k, jp.y - k, k * 2, k * 2), Mats.Circle, new Color(0.9f, 0.85f, 0.7f, 0.5f));

            foreach (var kv in tc.buttons)
            {
                var c = kv.Value;
                bool held = tc.held.Contains(kv.Key);
                bool on = (kv.Key == Btn.Aim && p.ads) || (kv.Key == Btn.Crouch && p.crouch) || (kv.Key == Btn.Mask && p.maskOn);
                Color fill = held ? new Color(0.85f, 0.7f, 0.4f, 0.55f) : on ? new Color(0.6f, 0.5f, 0.3f, 0.5f) : new Color(0, 0, 0, 0.32f);
                if (kv.Key == Btn.Mask && !p.maskOn) fill = new Color(0.45f, 0.6f, 0.1f, 0.45f + 0.25f * Mathf.Sin(Time.time * 8f));
                Tex(new Rect(c.c.x - c.r, c.c.y - c.r, c.r * 2, c.r * 2), Mats.Circle, fill);
                Tex(new Rect(c.c.x - c.r, c.c.y - c.r, c.r * 2, c.r * 2), Mats.Ring, new Color(1, 1, 1, 0.5f));
                Label(new Rect(c.c.x - c.r * 1.3f, c.c.y - 22 * u, c.r * 2.6f, 44 * u), BtnLabel(kv.Key, p), tiny, Color.white);
            }
        }

        static string BtnLabel(Btn b, PlayerController p)
        {
            switch (b)
            {
                case Btn.Fire: return "ATIRAR";
                case Btn.Aim: return "MIRAR";
                case Btn.Reload: return "RECARR.";
                case Btn.Grenade: return "GRANADA";
                case Btn.Melee: return "BAIONETA";
                case Btn.Crouch: return p.crouch ? "LEVANTAR" : "AGACHAR";
                case Btn.Mask: return p.maskOn ? "TIRAR" : "MÁSCARA";
                case Btn.Pause: return "II";
            }
            return "";
        }

        // ---------------- PAUSA / MORTE / VITÓRIA ----------------
        void DrawPause(Game g, float W, float H)
        {
            Tex(new Rect(0, 0, W, H), dark, Color.white);
            Label(new Rect(0, H * 0.18f, W, 100 * u), "PAUSA", big, Color.white);
            float bw = 640 * u, bh = 96 * u, x = (W - bw) * 0.5f, y = H * 0.36f;
            if (Button(new Rect(x, y, bw, bh), "Continuar")) g.Resume();
            if (Button(new Rect(x, y + bh + 24 * u, bw, bh), "Reiniciar missão")) Game.Restart(true);
            if (Button(new Rect(x, y + (bh + 24 * u) * 2, bw, bh), "Menu principal")) Game.Restart(false);
        }

        void DrawDead(Game g, float W, float H)
        {
            Tex(new Rect(0, 0, W, H), Mats.White, new Color(0.15f, 0f, 0f, 0.55f));
            Tex(new Rect(0, 0, W, H), Mats.Vignette, new Color(0, 0, 0, 0.9f));
            Label(new Rect(0, H * 0.16f, W, 110 * u), "VOCÊ CAIU EM COMBATE", big, new Color(0.95f, 0.85f, 0.75f));
            Label(new Rect(W * 0.15f, H * 0.3f, W * 0.7f, 120 * u),
                "\"Se eu morrer, pense apenas isto de mim: que há algum canto de um campo estrangeiro que é para sempre a Inglaterra.\"\n— Rupert Brooke, 1914",
                center, new Color(0.9f, 0.88f, 0.82f, 0.9f));
            Label(new Rect(0, H * 0.5f, W, 50 * u), "Inimigos abatidos: " + g.kills + "    Tempo: " + Game.FormatTime(g.playTime), tiny, Color.white);
            float bw = 640 * u, bh = 96 * u, x = (W - bw) * 0.5f, y = H * 0.6f;
            if (Button(new Rect(x, y, bw, bh), "Tentar novamente")) Game.Restart(true);
            if (Button(new Rect(x, y + bh + 24 * u, bw, bh), "Menu principal")) Game.Restart(false);
        }

        void DrawVictory(Game g, float W, float H)
        {
            Tex(new Rect(0, 0, W, H), dark, new Color(1, 1, 1, 0.92f));
            float pw = Mathf.Min(W - 120 * u, 1500 * u), px = (W - pw) * 0.5f;
            if (victoryPage == 0)
            {
                Label(new Rect(0, H * 0.1f, W, 120 * u), "VITÓRIA", new GUIStyle(big) { fontSize = Mathf.RoundToInt(110 * u) }, new Color(0.95f, 0.85f, 0.6f));
                Label(new Rect(0, H * 0.24f, W, 60 * u), "A trincheira alemã foi tomada e mantida até a chegada dos reforços.", center, Color.white);
                int acc = g.shots > 0 ? Mathf.RoundToInt(100f * g.hits / g.shots) : 0;
                string[] diff = { "Recruta", "Soldado", "Veterano" };
                string stats = "Inimigos abatidos:  " + g.kills + "\nTiros disparados:  " + g.shots + "\nPrecisão:  " + acc + "%\nTempo de missão:  " + Game.FormatTime(g.playTime) + "\nDificuldade:  " + diff[Game.Difficulty];
                Label(new Rect(px, H * 0.36f, pw, H * 0.35f), stats, center, new Color(0.9f, 0.88f, 0.8f));
                if (Button(new Rect(W * 0.5f - 320 * u, H - 180 * u, 640 * u, 100 * u), "Continuar")) victoryPage = 1;
            }
            else
            {
                Label(new Rect(px, H * 0.08f, pw, H * 0.6f), Mission.EpilogueText, text, new Color(0.92f, 0.9f, 0.85f));
                Label(new Rect(0, H * 0.66f, W, 120 * u), "FIM", new GUIStyle(big) { fontSize = Mathf.RoundToInt(120 * u) }, new Color(0.95f, 0.85f, 0.6f));
                float bw = 560 * u, bh = 96 * u, y = H - 160 * u;
                if (Button(new Rect(W * 0.5f - bw - 20 * u, y, bw, bh), "Jogar novamente")) Game.Restart(true);
                if (Button(new Rect(W * 0.5f + 20 * u, y, bw, bh), "Menu principal")) Game.Restart(false);
            }
        }
    }
}
