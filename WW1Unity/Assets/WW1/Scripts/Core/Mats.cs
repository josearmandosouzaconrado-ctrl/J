using System.Collections.Generic;
using UnityEngine;

namespace WW1
{
    // Texturas e materiais gerados por código (nenhum arquivo de arte é necessário).
    public static class Mats
    {
        static bool ready;
        static Material litBase, litNormalBase, spriteBase;
        static readonly Dictionary<string, Material> cache = new Dictionary<string, Material>();

        public static Texture2D Mud, MudNormal, Cloth, Wood, Burlap, Metal, Soft, Puff, Circle, Ring, Vignette, MaskView, White;
        public static Material MudMat, WaterMat, WoodMat, SandbagMat, MetalMat, RustMat, WireMat;

        public static void Init()
        {
            if (ready) return;
            ready = true;

            Shader std = Shader.Find("Standard");
            litBase = Resources.Load<Material>("WW1/LitBase");
            litNormalBase = Resources.Load<Material>("WW1/LitNormal");
            if (litBase == null) litBase = new Material(std);
            if (litNormalBase == null)
            {
                litNormalBase = new Material(std);
                litNormalBase.EnableKeyword("_NORMALMAP");
            }
            spriteBase = new Material(Shader.Find("Sprites/Default"));

            MakeMud();
            Cloth = MakeTex(128, false, (u, v) =>
            {
                float n = Noise.Fbm(u, v, 16, 3, 21);
                float weave = 0.5f + 0.5f * Mathf.Sin(u * Mathf.PI * 2f * 64f) * Mathf.Sin(v * Mathf.PI * 2f * 64f);
                float g = 0.78f + 0.18f * n + 0.05f * weave;
                float dirt = Noise.Fbm(u, v, 4, 3, 22);
                g *= Mathf.Lerp(1f, 0.75f, Battlefield.Smooth(0.55f, 0.8f, dirt));
                return new Color(g, g * 0.98f, g * 0.94f, 1f);
            });
            Wood = MakeTex(256, false, (u, v) =>
            {
                float warp = Noise.Fbm(u, v, 4, 4, 31) * 6f;
                float s = 0.5f + 0.5f * Mathf.Sin((u * 24f + warp) * Mathf.PI * 2f);
                float n = Noise.Fbm(u, v, 32, 2, 32);
                Color a = new Color(0.30f, 0.22f, 0.15f), b = new Color(0.46f, 0.36f, 0.25f);
                Color c = Color.Lerp(a, b, s * 0.6f + n * 0.4f);
                c = Color.Lerp(c, new Color(0.40f, 0.39f, 0.35f), 0.35f);
                return c;
            });
            Burlap = MakeTex(128, false, (u, v) =>
            {
                float wx = Mathf.Abs(Mathf.Sin(u * Mathf.PI * 48f));
                float wy = Mathf.Abs(Mathf.Sin(v * Mathf.PI * 48f));
                float weave = Mathf.Lerp(wx, wy, (Mathf.Floor(u * 48f) + Mathf.Floor(v * 48f)) % 2f);
                float dirt = Noise.Fbm(u, v, 4, 4, 41);
                Color c = new Color(0.56f, 0.49f, 0.36f) * (0.8f + 0.2f * weave);
                c = Color.Lerp(c, new Color(0.30f, 0.25f, 0.18f), Battlefield.Smooth(0.45f, 0.75f, dirt));
                c.a = 1f;
                return c;
            });
            Metal = MakeTex(128, false, (u, v) =>
            {
                float n = Noise.Fbm(u, v, 8, 4, 51);
                float rust = Battlefield.Smooth(0.55f, 0.75f, Noise.Fbm(u, v, 4, 4, 52));
                Color c = Color.Lerp(new Color(0.26f, 0.27f, 0.26f), new Color(0.36f, 0.36f, 0.34f), n);
                return Color.Lerp(c, new Color(0.38f, 0.21f, 0.12f), rust * 0.8f);
            });
            Soft = MakeTex(64, true, (u, v) =>
            {
                float d = Vector2.Distance(new Vector2(u, v), new Vector2(0.5f, 0.5f)) * 2f;
                float a = Mathf.Clamp01(1f - d);
                return new Color(1f, 1f, 1f, a * a);
            });
            Soft.wrapMode = TextureWrapMode.Clamp;
            Puff = MakeTex(128, true, (u, v) =>
            {
                float d = Vector2.Distance(new Vector2(u, v), new Vector2(0.5f, 0.5f)) * 2f;
                float n = Noise.Fbm(u, v, 4, 4, 61);
                float a = Mathf.Clamp01(1f - d * (0.75f + n * 0.6f));
                float shade = 0.75f + 0.25f * Noise.Fbm(u, v, 8, 3, 62);
                return new Color(shade, shade, shade, a * a);
            });
            Puff.wrapMode = TextureWrapMode.Clamp;
            Circle = MakeTex(128, true, (u, v) =>
            {
                float d = Vector2.Distance(new Vector2(u, v), new Vector2(0.5f, 0.5f)) * 2f;
                return new Color(1f, 1f, 1f, Mathf.Clamp01((1f - d) * 40f));
            });
            Circle.wrapMode = TextureWrapMode.Clamp;
            Ring = MakeTex(128, true, (u, v) =>
            {
                float d = Vector2.Distance(new Vector2(u, v), new Vector2(0.5f, 0.5f)) * 2f;
                float a = Mathf.Clamp01((1f - d) * 40f) * Mathf.Clamp01((d - 0.86f) * 40f);
                return new Color(1f, 1f, 1f, a);
            });
            Ring.wrapMode = TextureWrapMode.Clamp;
            Vignette = MakeTex(256, true, (u, v) =>
            {
                float d = Vector2.Distance(new Vector2(u, v), new Vector2(0.5f, 0.5f)) * 1.45f;
                float a = Battlefield.Smooth(0.45f, 1.0f, d);
                return new Color(1f, 1f, 1f, a);
            });
            Vignette.wrapMode = TextureWrapMode.Clamp;
            MaskView = MakeTex(512, true, (u, v) =>
            {
                // Visão de dentro da máscara de gás: duas lentes redondas.
                float x = (u - 0.5f) * 2f, y = (v - 0.5f) * 2f;
                float l = Mathf.Sqrt((x + 0.42f) * (x + 0.42f) * 1.0f + (y - 0.08f) * (y - 0.08f) * 1.25f);
                float r = Mathf.Sqrt((x - 0.42f) * (x - 0.42f) * 1.0f + (y - 0.08f) * (y - 0.08f) * 1.25f);
                float lens = Mathf.Min(l, r);
                float a = Battlefield.Smooth(0.36f, 0.44f, lens);
                return new Color(0.03f, 0.03f, 0.02f, Mathf.Max(a, 0.12f));
            });
            MaskView.wrapMode = TextureWrapMode.Clamp;
            White = MakeTex(4, false, (u, v) => Color.white);

            MudMat = Lit(Color.white, 0.18f, Mud, MudNormal, 1f);
            WaterMat = Lit(new Color(0.16f, 0.17f, 0.15f), 0.93f);
            WoodMat = Lit(Color.white, 0.08f, Wood);
            SandbagMat = Lit(Color.white, 0.05f, Burlap);
            MetalMat = Lit(new Color(0.75f, 0.75f, 0.72f), 0.35f, Metal, null, 1f, 0.55f);
            RustMat = Lit(new Color(0.85f, 0.7f, 0.6f), 0.15f, Metal, null, 1f, 0.2f);
            WireMat = Sprite(White, new Color(0.13f, 0.12f, 0.11f, 1f));
        }

        static void MakeMud()
        {
            const int S = 512;
            float[] h = new float[S * S];
            var px = new Color32[S * S];
            for (int y = 0; y < S; y++)
            {
                float v = (y + 0.5f) / S;
                for (int x = 0; x < S; x++)
                {
                    float u = (x + 0.5f) / S;
                    float big = Noise.Fbm(u, v, 6, 5, 11);
                    float fine = Noise.Fbm(u, v, 48, 2, 12);
                    float stones = Battlefield.Smooth(0.78f, 0.86f, Noise.Value(u * 96f, v * 96f, 96, 13));
                    float height = big * 0.65f + fine * 0.25f + stones * 0.25f;
                    h[y * S + x] = height;

                    float wet = Noise.Fbm(u, v, 3, 4, 14);
                    float clay = Noise.Fbm(u, v, 5, 3, 15);
                    Color c = Color.Lerp(new Color(0.20f, 0.16f, 0.12f), new Color(0.40f, 0.33f, 0.24f), big * 0.8f + fine * 0.3f);
                    c = Color.Lerp(c, new Color(0.40f, 0.38f, 0.33f), Battlefield.Smooth(0.55f, 0.75f, clay) * 0.6f);
                    c = Color.Lerp(c, new Color(0.47f, 0.45f, 0.41f), stones * 0.7f);
                    c *= Mathf.Lerp(1f, 0.62f, Battlefield.Smooth(0.52f, 0.72f, wet));
                    c.a = 1f;
                    px[y * S + x] = c;
                }
            }
            Mud = NewTex(S, false);
            Mud.SetPixels32(px);
            Mud.Apply(true, true);
            MudNormal = NormalFromHeight(h, S, 5f);
        }

        static Texture2D NewTex(int size, bool linear)
        {
            var t = new Texture2D(size, size, TextureFormat.RGBA32, true, linear);
            t.wrapMode = TextureWrapMode.Repeat;
            t.filterMode = FilterMode.Trilinear;
            t.anisoLevel = 4;
            return t;
        }

        static Texture2D MakeTex(int size, bool linear, System.Func<float, float, Color> f)
        {
            var t = NewTex(size, linear);
            var px = new Color32[size * size];
            for (int y = 0; y < size; y++)
                for (int x = 0; x < size; x++)
                    px[y * size + x] = f((x + 0.5f) / size, (y + 0.5f) / size);
            t.SetPixels32(px);
            t.Apply(true, true);
            return t;
        }

        static Texture2D NormalFromHeight(float[] h, int s, float strength)
        {
            var t = NewTex(s, true);
            var px = new Color32[s * s];
            for (int y = 0; y < s; y++)
            {
                for (int x = 0; x < s; x++)
                {
                    float l = h[y * s + (x - 1 + s) % s], r = h[y * s + (x + 1) % s];
                    float d = h[((y - 1 + s) % s) * s + x], u = h[((y + 1) % s) * s + x];
                    Vector3 n = new Vector3((l - r) * strength, (d - u) * strength, 1f).normalized;
                    px[y * s + x] = new Color(n.x * 0.5f + 0.5f, n.y * 0.5f + 0.5f, n.z * 0.5f + 0.5f, 1f);
                }
            }
            t.SetPixels32(px);
            t.Apply(true, true);
            return t;
        }

        // Material "Standard" com cor/textura; materiais iguais são reaproveitados (instancing).
        public static Material Lit(Color c, float gloss = 0.15f, Texture2D tex = null, Texture2D normal = null, float tiling = 1f, float metal = 0f)
        {
            string key = c.ToString("F3") + gloss.ToString("F2") + (tex != null ? tex.GetInstanceID() : 0) + "_" +
                         (normal != null ? normal.GetInstanceID() : 0) + "_" + tiling.ToString("F2") + metal.ToString("F2");
            Material m;
            if (cache.TryGetValue(key, out m)) return m;
            m = new Material(normal != null ? litNormalBase : litBase);
            m.color = c;
            m.SetFloat("_Glossiness", gloss);
            m.SetFloat("_Metallic", metal);
            if (tex != null)
            {
                m.mainTexture = tex;
                m.mainTextureScale = new Vector2(tiling, tiling);
            }
            if (normal != null)
            {
                m.SetTexture("_BumpMap", normal);
                m.SetFloat("_BumpScale", 1f);
            }
            m.enableInstancing = true;
            cache[key] = m;
            return m;
        }

        public static Material Cloth01(Color c)
        {
            return Lit(c, 0.06f, Cloth);
        }

        // Material sem iluminação (partículas, arame, traçantes).
        public static Material Sprite(Texture2D tex, Color c)
        {
            var m = new Material(spriteBase);
            m.mainTexture = tex;
            m.color = c;
            return m;
        }
    }
}
