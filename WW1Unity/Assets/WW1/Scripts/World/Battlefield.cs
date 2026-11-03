using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

namespace WW1
{
    public struct Crater { public float x, z, r, depth; }

    public struct WireBand
    {
        public float baseZ, off0, off1; // faixa relativa à linha da trincheira
        public float[] gaps;             // centros das passagens abertas no arame
        public float gapW;
    }

    // Terra de ninguém: relevo, trincheiras em zigue-zague, crateras e arame farpado.
    public static class Battlefield
    {
        public const float MinX = -64f, MaxX = 64f, MinZ = -34f, MaxZ = 270f, Grid = 0.8f;
        public const float PlayerTrenchZ = 0f, EnemyTrenchZ = 150f;
        public const float HalfW = 1.3f, Floor = -1.55f, StepH = 0.7f, StepOff = 1.0f;
        public static readonly float[] Ramps = { -36f, -12f, 12f, 36f };

        public static Crater[] craters = new Crater[0];
        public static readonly List<WireBand> wires = new List<WireBand>();
        public static readonly List<Vector3> ammoCrates = new List<Vector3>();
        public static Vector3 objectiveCrater;
        public static Vector3 mgPos;

        public static float StepY { get { return Floor + StepH; } }

        public static float Smooth(float a, float b, float x)
        {
            float t = Mathf.Clamp01((x - a) / (b - a));
            return t * t * (3f - 2f * t);
        }

        static float Bump(float x, float center, float width)
        {
            float d = (x - center) / width;
            return Mathf.Exp(-d * d);
        }

        // Traçado em zigue-zague (as "baias" das trincheiras reais).
        public static float Zig(float x)
        {
            const float p = 16f;
            float f = x / p - Mathf.Floor(x / p);
            return Mathf.Abs(f - 0.5f) * 4f - 1f;
        }

        public static float TrenchZ(float x, float baseZ)
        {
            return baseZ + Zig(x + baseZ * 0.37f);
        }

        public static Vector3 Tangent(float x, float baseZ)
        {
            float dz = (TrenchZ(x + 0.25f, baseZ) - TrenchZ(x - 0.25f, baseZ)) / 0.5f;
            return new Vector3(1f, 0f, dz).normalized;
        }

        public static bool NearRamp(float x, float w)
        {
            for (int i = 0; i < Ramps.Length; i++)
                if (Mathf.Abs(x - Ramps[i]) < w) return true;
            return false;
        }

        public static float Base(float x, float z)
        {
            return (Mathf.PerlinNoise(x * 0.021f + 31.7f, z * 0.021f + 11.3f) - 0.5f) * 1.3f
                 + (Mathf.PerlinNoise(x * 0.09f + 5.1f, z * 0.09f + 91.7f) - 0.5f) * 0.35f
                 + (Mathf.PerlinNoise(x * 0.35f + 2f, z * 0.35f + 7f) - 0.5f) * 0.08f;
        }

        public static float Height(float x, float z)
        {
            float h = Base(x, z);
            float dp = z - TrenchZ(x, PlayerTrenchZ);
            float de = z - TrenchZ(x, EnemyTrenchZ);
            float near = Mathf.Min(Mathf.Abs(dp), Mathf.Abs(de));
            h *= Mathf.Lerp(0.2f, 1f, Smooth(3f, 10f, near));

            for (int i = 0; i < craters.Length; i++)
            {
                Crater c = craters[i];
                float dx = x - c.x, dz = z - c.z;
                float d2 = dx * dx + dz * dz;
                float rr = c.r * 1.7f;
                if (d2 > rr * rr) continue;
                float d = Mathf.Sqrt(d2) / c.r;
                if (d < 1f) h -= c.depth * (1f - d * d);
                h += c.depth * 0.28f * Mathf.Exp(-(d - 1f) * (d - 1f) / 0.08f);
            }

            // Montes de terra (parapeito e parados).
            h += 0.28f * Bump(Mathf.Abs(dp), 2.3f, 0.75f) + 0.28f * Bump(Mathf.Abs(de), 2.3f, 0.75f);

            h = Cut(h, dp, x, true);
            h = Cut(h, de, x, false);

            float edge = Mathf.Min(Mathf.Min(x - MinX, MaxX - x), Mathf.Min(z - MinZ, MaxZ - z));
            return Mathf.Lerp(0f, h, Smooth(0f, 8f, edge));
        }

        static float Cut(float h, float d, float x, bool ramps)
        {
            float ad = Mathf.Abs(d);
            float cut = 1f - Smooth(HalfW, HalfW + 0.55f, ad);
            if (ramps && d > 0f)
            {
                for (int i = 0; i < Ramps.Length; i++)
                {
                    float dx = Mathf.Abs(x - Ramps[i]);
                    if (dx > 1.2f) continue;
                    float t = Mathf.Clamp01(1f - (d - HalfW) / 5.5f);
                    float w = 1f - Smooth(0.7f, 1.2f, dx);
                    cut = Mathf.Max(cut, t * w);
                }
            }
            return Mathf.Lerp(h, Floor, cut);
        }

        // Está dentro de alguma trincheira? Retorna a linha (0 ou 150).
        public static bool InTrench(Vector3 p, out float baseZ)
        {
            baseZ = PlayerTrenchZ;
            if (Mathf.Abs(p.z - TrenchZ(p.x, PlayerTrenchZ)) < HalfW + 0.3f && p.y < Floor + 1.0f) return true;
            baseZ = EnemyTrenchZ;
            if (Mathf.Abs(p.z - TrenchZ(p.x, EnemyTrenchZ)) < HalfW + 0.3f && p.y < Floor + 1.0f) return true;
            return false;
        }

        public static bool InWire(float x, float z)
        {
            for (int i = 0; i < wires.Count; i++)
            {
                WireBand w = wires[i];
                float rel = z - TrenchZ(x, w.baseZ);
                float lo = Mathf.Min(w.off0, w.off1), hi = Mathf.Max(w.off0, w.off1);
                if (rel < lo || rel > hi) continue;
                bool gap = false;
                for (int g = 0; g < w.gaps.Length; g++)
                    if (Mathf.Abs(x - w.gaps[g]) < w.gapW * 0.5f) gap = true;
                if (!gap) return true;
            }
            return false;
        }

        public static Vector3 Ground(float x, float z)
        {
            return new Vector3(x, Height(x, z), z);
        }

        static void GenerateLayout()
        {
            var rng = new System.Random(1916);
            var list = new List<Crater>();
            objectiveCrater = new Vector3(-3f, 0f, 70f);
            list.Add(new Crater { x = -3f, z = 70f, r = 6.5f, depth = 1.9f });
            AddCraters(list, rng, 80, 12f, 138f);
            AddCraters(list, rng, 26, 162f, 262f);
            AddCraters(list, rng, 6, -30f, -9f);
            craters = list.ToArray();
            objectiveCrater.y = Height(objectiveCrater.x, objectiveCrater.z);

            wires.Clear();
            wires.Add(new WireBand { baseZ = PlayerTrenchZ, off0 = 9f, off1 = 12.5f, gaps = new[] { -30f, -6f, 8f, 28f }, gapW = 4f });
            wires.Add(new WireBand { baseZ = EnemyTrenchZ, off0 = -14f, off1 = -9.5f, gaps = new[] { -22f, -4f, 15f, 33f }, gapW = 5f });
        }

        static void AddCraters(List<Crater> list, System.Random rng, int count, float z0, float z1)
        {
            int tries = 0;
            while (count > 0 && tries++ < 4000)
            {
                float x = Mathf.Lerp(MinX + 6f, MaxX - 6f, (float)rng.NextDouble());
                float z = Mathf.Lerp(z0, z1, (float)rng.NextDouble());
                float r = 1.8f + (float)(rng.NextDouble() * rng.NextDouble()) * 4.5f;
                if (Mathf.Abs(z - TrenchZ(x, PlayerTrenchZ)) < r + 8f) continue;
                if (Mathf.Abs(z - TrenchZ(x, EnemyTrenchZ)) < r + 8f) continue;
                bool overlap = false;
                for (int i = 0; i < list.Count; i++)
                {
                    float dx = list[i].x - x, dz = list[i].z - z;
                    if (dx * dx + dz * dz < (list[i].r + r) * (list[i].r + r) * 0.55f) { overlap = true; break; }
                }
                if (overlap) continue;
                list.Add(new Crater { x = x, z = z, r = r, depth = r * (0.28f + 0.1f * (float)rng.NextDouble()) });
                count--;
            }
        }

        public static void Build(Transform parent)
        {
            GenerateLayout();
            BuildTerrain(parent);
            BuildOuterGround(parent);
            BuildWater(parent);
            Props.Build(parent);
        }

        static void BuildTerrain(Transform parent)
        {
            int nx = Mathf.RoundToInt((MaxX - MinX) / Grid) + 1;
            int nz = Mathf.RoundToInt((MaxZ - MinZ) / Grid) + 1;
            var H = new float[nx * nz];
            for (int j = 0; j < nz; j++)
                for (int i = 0; i < nx; i++)
                    H[j * nx + i] = Height(MinX + i * Grid, MinZ + j * Grid);

            const int chunks = 4;
            int rows = (nz - 1 + chunks - 1) / chunks;
            for (int c = 0; c < chunks; c++)
            {
                int j0 = c * rows, j1 = Mathf.Min(nz - 1, j0 + rows);
                if (j0 >= j1) break;
                int cols = j1 - j0 + 1;
                var v = new Vector3[nx * cols];
                var n = new Vector3[v.Length];
                var uv = new Vector2[v.Length];
                for (int j = j0; j <= j1; j++)
                {
                    for (int i = 0; i < nx; i++)
                    {
                        int k = (j - j0) * nx + i;
                        float x = MinX + i * Grid, z = MinZ + j * Grid;
                        v[k] = new Vector3(x, H[j * nx + i], z);
                        float hl = H[j * nx + Mathf.Max(0, i - 1)], hr = H[j * nx + Mathf.Min(nx - 1, i + 1)];
                        float hd = H[Mathf.Max(0, j - 1) * nx + i], hu = H[Mathf.Min(nz - 1, j + 1) * nx + i];
                        n[k] = new Vector3(hl - hr, 2f * Grid, hd - hu).normalized;
                        uv[k] = new Vector2(x, z) * 0.22f;
                    }
                }
                var t = new int[(nx - 1) * (cols - 1) * 6];
                int ti = 0;
                for (int j = 0; j < cols - 1; j++)
                {
                    for (int i = 0; i < nx - 1; i++)
                    {
                        int a = j * nx + i, b = a + 1, cI = a + nx, d = cI + 1;
                        t[ti++] = a; t[ti++] = cI; t[ti++] = b;
                        t[ti++] = b; t[ti++] = cI; t[ti++] = d;
                    }
                }
                var m = new Mesh();
                m.name = "Terreno" + c;
                m.indexFormat = IndexFormat.UInt32;
                m.vertices = v;
                m.normals = n;
                m.uv = uv;
                m.triangles = t;
                m.RecalculateBounds();
                var go = MeshKit.Spawn("Terreno" + c, m, Mats.MudMat, parent, true, true);
                go.isStatic = true;
            }
        }

        // Chão ao redor do mapa para não aparecer borda no nevoeiro.
        static void BuildOuterGround(Transform parent)
        {
            var b = new MeshBuilder();
            const float far = 700f;
            AddQuad(b, -far, MinX, -far, far);
            AddQuad(b, MaxX, far, -far, far);
            AddQuad(b, MinX, MaxX, -far, MinZ);
            AddQuad(b, MinX, MaxX, MaxZ, far);
            var go = MeshKit.Spawn("ChaoDistante", b.Build("ChaoDistante"), Mats.MudMat, parent, false, false);
            go.isStatic = true;
        }

        static void AddQuad(MeshBuilder b, float x0, float x1, float z0, float z1)
        {
            // Subdivide para a textura (UV em coordenadas do mundo) não esticar.
            const float step = 40f;
            for (float x = x0; x < x1; x += step)
            {
                for (float z = z0; z < z1; z += step)
                {
                    float xa = x, xb = Mathf.Min(x + step, x1), za = z, zb = Mathf.Min(z + step, z1);
                    var mtx = Matrix4x4.TRS(new Vector3((xa + xb) * 0.5f, -0.02f, (za + zb) * 0.5f), Quaternion.identity, new Vector3(xb - xa, 0.02f, zb - za));
                    b.Add(MeshKit.Cube, mtx, (xb - xa) * 0.22f);
                }
            }
        }

        static void BuildWater(Transform parent)
        {
            var rng = new System.Random(77);
            var b = new MeshBuilder();
            for (int i = 0; i < craters.Length; i++)
            {
                Crater c = craters[i];
                if (c.r < 3f || rng.NextDouble() > 0.4) continue;
                float bottom = Height(c.x, c.z);
                float y = bottom + c.depth * 0.32f;
                b.Box(new Vector3(c.x, y, c.z), Quaternion.Euler(0, (float)rng.NextDouble() * 360f, 0), new Vector3(c.r * 1.3f, 0.01f, c.r * 1.3f));
            }
            var go = b.Spawn("PocasDagua", Mats.WaterMat, parent, false, false);
            if (go != null) go.GetComponent<MeshRenderer>().receiveShadows = true;
        }
    }
}
