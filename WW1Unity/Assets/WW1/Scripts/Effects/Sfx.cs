using UnityEngine;

namespace WW1
{
    // Todos os sons são sintetizados em código: tiros, explosões, apito, chuva, gás...
    public static class Sfx
    {
        const int SR = 22050;
        static bool ready;
        public static AudioClip Rifle, MG, Explosion, Incoming, Whistle, Bolt, Reload, Click, Rain, Wind, Hurt,
                                Cough, Breath, Step, Swish, Thump, Heart, Bell, Whiz, Rumble;

        static AudioSource[] pool;
        static int poolIdx;
        static AudioSource ui, rainSrc, windSrc, breathSrc, heartSrc;
        static System.Random rng = new System.Random(1918);

        static float N() { return (float)rng.NextDouble() * 2f - 1f; }

        public static void Init()
        {
            if (ready) return;
            ready = true;
            Rifle = Gun("Fuzil", 1.1f, 1f);
            MG = Gun("MG08", 0.32f, 0.75f);
            Explosion = Boom("Explosao", 3.2f, 0.05f, 1f);
            Rumble = Boom("Trovao", 3.5f, 0.02f, 0.6f);
            Incoming = MakeIncoming();
            Whistle = MakeWhistle();
            Bolt = Clicks("Ferrolho", 0.5f, new[] { 0.0f, 0.12f, 0.3f, 0.42f });
            Reload = Clicks("Recarga", 2.4f, new[] { 0.1f, 0.3f, 0.7f, 0.85f, 1.0f, 1.15f, 1.3f, 1.6f, 1.9f, 2.1f });
            Click = Clicks("Clique", 0.12f, new[] { 0.0f });
            Rain = MakeRain();
            Wind = MakeWind();
            Hurt = MakeThud("Dor", 0.35f, 70f, 0.8f);
            Thump = MakeThud("Baque", 0.25f, 110f, 0.5f);
            Cough = MakeCough();
            Breath = MakeBreath();
            Step = MakeStep();
            Swish = MakeSwish();
            Heart = MakeHeart();
            Bell = MakeBell();
            Whiz = MakeWhiz();
        }

        static AudioClip Clip(string name, float[] d)
        {
            float peak = 0.0001f;
            for (int i = 0; i < d.Length; i++) peak = Mathf.Max(peak, Mathf.Abs(d[i]));
            float g = 0.95f / peak;
            for (int i = 0; i < d.Length; i++) d[i] *= g;
            var c = AudioClip.Create(name, d.Length, 1, SR, false);
            c.SetData(d, 0);
            return c;
        }

        static AudioClip Gun(string name, float len, float body)
        {
            int n = (int)(len * SR);
            var d = new float[n];
            float lp = 0, lp2 = 0, lp3 = 0;
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float x = N();
                lp += (x - lp) * 0.09f;
                lp2 += (x - lp2) * 0.025f;
                lp3 += (lp2 - lp3) * 0.05f;
                float crack = x * Mathf.Exp(-t * 110f);
                float boom = lp * Mathf.Exp(-t * 9f) * 2.4f * body;
                float tail = lp3 * Mathf.Exp(-t * (3.2f / body)) * 9f * body;   // eco rolando pelo campo
                float thump = Mathf.Sin(2f * Mathf.PI * 85f * t) * Mathf.Exp(-t * 28f) * 0.9f;
                d[i] = crack * 0.9f + boom + tail + thump;
            }
            return Clip(name, d);
        }

        static AudioClip Boom(string name, float len, float transient, float bright)
        {
            int n = (int)(len * SR);
            var d = new float[n];
            float a = 0, b = 0, c = 0;
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float x = N();
                a += (x - a) * 0.08f * bright;
                b += (a - b) * 0.06f * bright;
                c += (b - c) * 0.04f;
                float env = Mathf.Min(1f, t / 0.008f) * Mathf.Exp(-t * 1.5f);
                float sub = Mathf.Sin(2f * Mathf.PI * (48f - 14f * t) * t) * Mathf.Exp(-t * 2.6f);
                float crackle = (t < 1.4f && rng.NextDouble() < 0.0015) ? N() * 0.6f : 0f;
                d[i] = c * 14f * env + x * Mathf.Exp(-t * 35f) * transient * 10f + sub * 0.8f + crackle * Mathf.Exp(-t * 2f);
            }
            return Clip(name, d);
        }

        static AudioClip MakeIncoming()
        {
            float len = 1.2f;
            int n = (int)(len * SR);
            var d = new float[n];
            float ph = 0;
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float k = t / len;
                float f = 1450f - 850f * k;
                ph += 2f * Mathf.PI * f / SR;
                float amp = 0.08f + 0.92f * k * k;
                d[i] = (Mathf.Sin(ph) * 0.6f + N() * 0.12f) * amp;
            }
            return Clip("Assobio", d);
        }

        static AudioClip MakeWhistle()
        {
            float len = 1.7f;
            int n = (int)(len * SR);
            var d = new float[n];
            float ph = 0;
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float trill = Mathf.Sin(2f * Mathf.PI * 27f * t);
                float f = 2650f + 140f * trill;
                ph += 2f * Mathf.PI * f / SR;
                float env = Mathf.Min(1f, t / 0.03f) * Mathf.Clamp01((len - t) / 0.15f);
                d[i] = (Mathf.Sin(ph) * (0.7f + 0.3f * trill) + N() * 0.05f) * env;
            }
            return Clip("Apito", d);
        }

        static AudioClip Clicks(string name, float len, float[] at)
        {
            int n = (int)(len * SR);
            var d = new float[n];
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float s = 0;
                for (int k = 0; k < at.Length; k++)
                {
                    float dt = t - at[k];
                    if (dt < 0 || dt > 0.08f) continue;
                    float f = 2600f + 700f * (k % 3);
                    s += N() * Mathf.Exp(-dt * 380f) + Mathf.Sin(2f * Mathf.PI * f * dt) * Mathf.Exp(-dt * 110f) * 0.45f;
                }
                d[i] = s;
            }
            return Clip(name, d);
        }

        static AudioClip MakeRain()
        {
            float len = 4f;
            int n = (int)(len * SR);
            var d = new float[n];
            float lp = 0, lp2 = 0;
            for (int i = 0; i < n; i++)
            {
                float x = N();
                lp += (x - lp) * 0.35f;
                lp2 += (x - lp2) * 0.03f;
                float drops = rng.NextDouble() < 0.004 ? N() * 2f : 0f;
                d[i] = (x - lp2) * 0.25f + lp * 0.35f + drops;
            }
            Crossfade(d, SR / 2);
            return Clip("Chuva", d);
        }

        static AudioClip MakeWind()
        {
            float len = 6f;
            int n = (int)(len * SR);
            var d = new float[n];
            float a = 0, b = 0;
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                a += (N() - a) * 0.02f;
                b += (a - b) * 0.02f;
                float mod = 0.55f + 0.45f * Mathf.Sin(2f * Mathf.PI * t / len) * Mathf.Sin(2f * Mathf.PI * 2f * t / len + 1f);
                d[i] = b * mod;
            }
            Crossfade(d, SR / 2);
            return Clip("Vento", d);
        }

        static void Crossfade(float[] d, int fade)
        {
            // Mistura o fim com o começo para o loop não estalar.
            int n = d.Length;
            for (int i = 0; i < fade; i++)
            {
                float k = (float)i / fade;
                d[i] = d[i] * k + d[n - fade + i] * (1f - k);
            }
        }

        static AudioClip MakeThud(string name, float len, float f, float noise)
        {
            int n = (int)(len * SR);
            var d = new float[n];
            float lp = 0;
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                lp += (N() - lp) * 0.1f;
                d[i] = Mathf.Sin(2f * Mathf.PI * f * t * (1f - t)) * Mathf.Exp(-t * 18f) + lp * noise * Mathf.Exp(-t * 25f) * 3f;
            }
            return Clip(name, d);
        }

        static AudioClip MakeCough()
        {
            float len = 0.9f;
            int n = (int)(len * SR);
            var d = new float[n];
            float a = 0, b = 0;
            float[] at = { 0f, 0.28f, 0.55f };
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float x = N();
                a += (x - a) * 0.25f;
                b += (a - b) * 0.25f;
                float env = 0;
                for (int k = 0; k < at.Length; k++)
                {
                    float dt = t - at[k];
                    if (dt >= 0f && dt < 0.25f) env += Mathf.Min(1f, dt / 0.01f) * Mathf.Exp(-dt * 14f);
                }
                d[i] = (a - b) * env * 3f + Mathf.Sin(2f * Mathf.PI * 160f * t) * env * 0.2f;
            }
            return Clip("Tosse", d);
        }

        static AudioClip MakeBreath()
        {
            float len = 3.2f;
            int n = (int)(len * SR);
            var d = new float[n];
            float a = 0, b = 0;
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float x = N();
                a += (x - a) * 0.3f;
                b += (a - b) * 0.08f;
                float inhale = t < 1.3f ? Mathf.Sin(t / 1.3f * Mathf.PI) : 0f;
                float exhale = t > 1.6f && t < 2.9f ? Mathf.Sin((t - 1.6f) / 1.3f * Mathf.PI) : 0f;
                float valve = (t > 1.6f && t < 1.62f) ? N() : 0f;
                d[i] = (a - b) * (inhale * 0.8f + exhale * 0.5f) + b * exhale * 0.6f + valve * 0.4f;
            }
            return Clip("Respiracao", d);
        }

        static AudioClip MakeStep()
        {
            float len = 0.22f;
            int n = (int)(len * SR);
            var d = new float[n];
            float a = 0, b = 0;
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float x = N();
                a += (x - a) * 0.12f;
                b += (a - b) * 0.2f;
                float env = Mathf.Min(1f, t / 0.015f) * Mathf.Exp(-t * 18f);
                float squelch = Mathf.Sin(2f * Mathf.PI * (180f + 300f * t) * t) * Mathf.Exp(-t * 30f) * 0.3f;
                d[i] = b * env * 3f + squelch;
            }
            return Clip("Passo", d);
        }

        static AudioClip MakeSwish()
        {
            float len = 0.35f;
            int n = (int)(len * SR);
            var d = new float[n];
            float a = 0, b = 0;
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float k = t / len;
                float x = N();
                float cut = 0.05f + 0.4f * Mathf.Sin(k * Mathf.PI);
                a += (x - a) * cut;
                b += (a - b) * cut;
                d[i] = (a - b) * Mathf.Sin(k * Mathf.PI);
            }
            return Clip("Golpe", d);
        }

        static AudioClip MakeHeart()
        {
            float len = 0.95f;
            int n = (int)(len * SR);
            var d = new float[n];
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float s = 0;
                float t1 = t, t2 = t - 0.25f;
                s += Mathf.Sin(2f * Mathf.PI * 55f * t1) * Mathf.Exp(-t1 * 22f);
                if (t2 > 0) s += Mathf.Sin(2f * Mathf.PI * 50f * t2) * Mathf.Exp(-t2 * 26f) * 0.7f;
                d[i] = s;
            }
            return Clip("Coracao", d);
        }

        static AudioClip MakeBell()
        {
            float len = 2.4f;
            int n = (int)(len * SR);
            var d = new float[n];
            float[] fr = { 520f, 1243f, 1690f, 2210f, 2830f };
            float[] strikes = { 0f, 0.4f, 0.8f, 1.2f, 1.6f };
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float s = 0;
                foreach (var st in strikes)
                {
                    float dt = t - st;
                    if (dt < 0) continue;
                    for (int k = 0; k < fr.Length; k++)
                        s += Mathf.Sin(2f * Mathf.PI * fr[k] * dt) * Mathf.Exp(-dt * (2.5f + k * 1.5f)) / (k + 1);
                }
                d[i] = s;
            }
            return Clip("Sino", d);
        }

        static AudioClip MakeWhiz()
        {
            float len = 0.28f;
            int n = (int)(len * SR);
            var d = new float[n];
            float ph = 0;
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / SR;
                float k = t / len;
                ph += 2f * Mathf.PI * (3200f - 2000f * k) / SR;
                d[i] = (Mathf.Sin(ph) * 0.5f + N() * 0.4f) * Mathf.Sin(k * Mathf.PI) * Mathf.Sin(k * Mathf.PI);
            }
            return Clip("Zunido", d);
        }

        // ---------- Reprodução ----------

        public static void InitScene(Transform parent)
        {
            var root = new GameObject("Audio").transform;
            root.SetParent(parent, false);
            pool = new AudioSource[24];
            for (int i = 0; i < pool.Length; i++)
            {
                var s = new GameObject("Fonte" + i).AddComponent<AudioSource>();
                s.transform.SetParent(root, false);
                s.playOnAwake = false;
                s.spatialBlend = 1f;
                s.rolloffMode = AudioRolloffMode.Logarithmic;
                s.maxDistance = 600f;
                s.dopplerLevel = 0f;
                pool[i] = s;
            }
            ui = Loop(root, "UI", null, 0f);
            ui.loop = false;
            rainSrc = Loop(root, "Chuva", Rain, 0.35f);
            windSrc = Loop(root, "Vento", Wind, 0.3f);
            breathSrc = Loop(root, "Respiracao", Breath, 0f);
            heartSrc = Loop(root, "Coracao", Heart, 0f);
        }

        static AudioSource Loop(Transform root, string name, AudioClip clip, float vol)
        {
            var s = new GameObject(name).AddComponent<AudioSource>();
            s.transform.SetParent(root, false);
            s.playOnAwake = false;
            s.spatialBlend = 0f;
            s.loop = true;
            s.clip = clip;
            s.volume = vol;
            if (clip != null) s.Play();
            return s;
        }

        public static void PlayAt(AudioClip c, Vector3 p, float vol, float pitch, float minDist)
        {
            if (pool == null || c == null) return;
            var s = pool[poolIdx++ % pool.Length];
            s.transform.position = p;
            s.clip = c;
            s.volume = vol;
            s.pitch = pitch;
            s.minDistance = minDist;
            s.Play();
        }

        public static void Play2D(AudioClip c, float vol, float pitch)
        {
            if (ui == null || c == null) return;
            ui.pitch = pitch;
            ui.PlayOneShot(c, vol);
        }

        public static void SetBreath(bool on)
        {
            if (breathSrc == null) return;
            breathSrc.volume = Mathf.MoveTowards(breathSrc.volume, on ? 0.55f : 0f, Time.deltaTime * 2f);
            if (breathSrc.volume > 0f && !breathSrc.isPlaying) breathSrc.Play();
        }

        public static void SetHeart(float amount)
        {
            if (heartSrc == null) return;
            heartSrc.volume = Mathf.MoveTowards(heartSrc.volume, amount * 0.8f, Time.deltaTime);
            heartSrc.pitch = 1f + amount * 0.3f;
        }

        public static void SetAmbience(float rain, float wind)
        {
            if (rainSrc != null) rainSrc.volume = rain;
            if (windSrc != null) windSrc.volume = wind;
        }
    }
}
