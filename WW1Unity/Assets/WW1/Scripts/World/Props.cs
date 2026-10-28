using UnityEngine;

namespace WW1
{
    // Sacos de areia, degraus de tiro, estrados, arame farpado, árvores mortas, tanque destruído e destroços.
    public static class Props
    {
        static System.Random rng;

        static float R() { return (float)rng.NextDouble(); }
        static float R(float a, float b) { return Mathf.Lerp(a, b, (float)rng.NextDouble()); }

        public static void Build(Transform parent)
        {
            rng = new System.Random(1914);
            Battlefield.ammoCrates.Clear();
            BuildTrench(parent, Battlefield.PlayerTrenchZ, 1f, true);
            BuildTrench(parent, Battlefield.EnemyTrenchZ, -1f, false);
            BuildWire(parent);
            BuildTrees(parent);
            BuildTank(parent, new Vector3(17f, 0f, 97f));
            BuildDebris(parent);
            BuildCrates(parent);
        }

        // frontSign: lado voltado para o inimigo (+1 = +Z).
        static void BuildTrench(Transform parent, float baseZ, float frontSign, bool isPlayer)
        {
            var bags = new MeshBuilder();
            var wood = new MeshBuilder();
            var stepRoot = new GameObject(isPlayer ? "DegrausAliados" : "DegrausInimigos").transform;
            stepRoot.SetParent(parent, false);
            float hw = Battlefield.HalfW;

            // Sacos de areia no parapeito (frente: 1 fileira, para atirar por cima) e parados (atrás: 2 fileiras).
            for (float x = Battlefield.MinX + 7f; x < Battlefield.MaxX - 7f; x += 0.62f)
            {
                float zc = Battlefield.TrenchZ(x, baseZ);
                Quaternion rot = Quaternion.LookRotation(Battlefield.Tangent(x, baseZ));
                for (int s = -1; s <= 1; s += 2)
                {
                    bool front = Mathf.Approximately(s, frontSign);
                    if (isPlayer && front && Battlefield.NearRamp(x, 1.6f)) continue;
                    int rows = front ? 1 : 2;
                    float z = zc + s * (hw + 0.75f);
                    float y = Battlefield.Height(x, z);
                    for (int r = 0; r < rows; r++)
                    {
                        float ox = (r % 2) * 0.31f;
                        Vector3 p = new Vector3(x + ox, y + 0.1f + r * 0.2f, z + R(-0.05f, 0.05f));
                        Quaternion q = rot * Quaternion.Euler(R(-4f, 4f), R(-8f, 8f), R(-4f, 4f));
                        bags.Add(MeshKit.LowSphere, Matrix4x4.TRS(p, q, new Vector3(0.36f, 0.24f, 0.62f)));
                    }
                }
            }

            // Degraus de tiro (com colisor) e revestimento de madeira nas paredes.
            for (float x = Battlefield.MinX + 7f; x < Battlefield.MaxX - 7f; x += 1.8f)
            {
                float xm = x + 0.9f;
                float zc = Battlefield.TrenchZ(xm, baseZ);
                Vector3 tan = Battlefield.Tangent(xm, baseZ);
                Quaternion rot = Quaternion.LookRotation(tan);
                for (int s = -1; s <= 1; s += 2)
                {
                    bool front = Mathf.Approximately(s, frontSign);
                    if (isPlayer && !front) continue;
                    if (isPlayer && Battlefield.NearRamp(xm, 2f)) continue;
                    Vector3 c = new Vector3(xm, Battlefield.Floor + Battlefield.StepH * 0.5f, zc + s * Battlefield.StepOff);
                    Vector3 size = new Vector3(0.6f, Battlefield.StepH, 1.85f);
                    wood.Box(c, rot * Quaternion.Euler(0, 90f, 0), new Vector3(1.85f, Battlefield.StepH, 0.6f));
                    var col = new GameObject("Degrau");
                    col.transform.SetParent(stepRoot, false);
                    col.transform.position = c;
                    col.transform.rotation = rot;
                    col.AddComponent<BoxCollider>().size = size;
                }
            }

            // Estrados no fundo e estacas nas paredes.
            for (float x = Battlefield.MinX + 7f; x < Battlefield.MaxX - 7f; x += 1.2f)
            {
                float zc = Battlefield.TrenchZ(x, baseZ);
                Vector3 tan = Battlefield.Tangent(x, baseZ);
                Quaternion rot = Quaternion.LookRotation(tan);
                Vector3 c = new Vector3(x, Battlefield.Floor + 0.06f, zc);
                Vector3 side = Vector3.Cross(Vector3.up, tan);
                wood.Box(c + side * 0.28f, rot, new Vector3(0.06f, 0.06f, 1.2f), 2f);
                wood.Box(c - side * 0.28f, rot, new Vector3(0.06f, 0.06f, 1.2f), 2f);
                for (int k = 0; k < 4; k++)
                    wood.Box(c + tan * (-0.45f + k * 0.3f) + Vector3.up * 0.04f, rot * Quaternion.Euler(0, R(-3f, 3f), 0), new Vector3(0.7f, 0.025f, 0.12f));
                for (int s = -1; s <= 1; s += 2)
                {
                    Vector3 basePos = new Vector3(x, Battlefield.Floor, zc + s * (hw + 0.12f));
                    Vector3 top = basePos + Vector3.up * 1.75f + new Vector3(0, 0, s * 0.22f);
                    wood.Cyl(basePos, top, 0.045f);
                    if (R() < 0.6f)
                    {
                        float h = R(0.3f, 1.3f);
                        wood.Box(Vector3.Lerp(basePos, top, h / 1.75f) - new Vector3(0, 0, s * 0.05f), rot, new Vector3(0.03f, 0.18f, 1.2f));
                    }
                }
            }

            var bagGo = bags.Spawn(isPlayer ? "SacosAliados" : "SacosInimigos", Mats.SandbagMat, parent, true);
            if (bagGo != null) bagGo.isStatic = true;
            var woodGo = wood.Spawn(isPlayer ? "MadeiraAliada" : "MadeiraInimiga", Mats.WoodMat, parent, false);
            if (woodGo != null) woodGo.isStatic = true;
        }

        static void BuildWire(Transform parent)
        {
            var stakes = new MeshBuilder();
            var root = new GameObject("ArameFarpado").transform;
            root.SetParent(parent, false);
            foreach (var w in Battlefield.wires)
            {
                float[] rows = { w.off0, (w.off0 + w.off1) * 0.5f, w.off1 };
                for (int r = 0; r < rows.Length; r++)
                {
                    var pts = new System.Collections.Generic.List<Vector3>();
                    for (float x = Battlefield.MinX + 8f; x < Battlefield.MaxX - 8f; x += 0.45f)
                    {
                        bool gap = false;
                        for (int g = 0; g < w.gaps.Length; g++)
                            if (Mathf.Abs(x - w.gaps[g]) < w.gapW * 0.5f) gap = true;
                        if (gap)
                        {
                            Flush(root, pts);
                            continue;
                        }
                        float z = Battlefield.TrenchZ(x, w.baseZ) + rows[r] + Mathf.Sin(x * 1.7f + r) * 0.35f;
                        float y = Battlefield.Height(x, z) + 0.25f + Mathf.Abs(Mathf.Sin(x * 1.3f + r * 2f)) * 0.75f;
                        pts.Add(new Vector3(x, y, z));
                        if (Mathf.Repeat(x, 2.7f) < 0.45f && r != 1)
                        {
                            Vector3 g0 = new Vector3(x, Battlefield.Height(x, z) - 0.2f, z);
                            stakes.Cyl(g0, g0 + new Vector3(R(-0.15f, 0.15f), 1.35f, R(-0.15f, 0.15f)), 0.035f);
                        }
                    }
                    Flush(root, pts);
                }
            }
            var go = stakes.Spawn("Estacas", Mats.WoodMat, parent, false);
            if (go != null) go.isStatic = true;
        }

        static void Flush(Transform root, System.Collections.Generic.List<Vector3> pts)
        {
            if (pts.Count >= 2)
            {
                var go = new GameObject("Arame");
                go.transform.SetParent(root, false);
                var lr = go.AddComponent<LineRenderer>();
                lr.sharedMaterial = Mats.WireMat;
                lr.widthMultiplier = 0.022f;
                lr.positionCount = pts.Count;
                lr.SetPositions(pts.ToArray());
                lr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                lr.receiveShadows = false;
                lr.numCapVertices = 0;
            }
            pts.Clear();
        }

        static void BuildTrees(Transform parent)
        {
            var b = new MeshBuilder();
            var cols = new GameObject("ColisoresArvores").transform;
            cols.SetParent(parent, false);
            int placed = 0, tries = 0;
            while (placed < 26 && tries++ < 500)
            {
                float x = R(Battlefield.MinX + 6f, Battlefield.MaxX - 6f);
                float z = R(-28f, 262f);
                if (Mathf.Abs(z - Battlefield.PlayerTrenchZ) < 6f || Mathf.Abs(z - Battlefield.EnemyTrenchZ) < 6f) continue;
                Vector3 p = Battlefield.Ground(x, z) - Vector3.up * 0.3f;
                float h = R(2f, 7.5f), rad = R(0.14f, 0.3f);
                Vector3 top = p + new Vector3(R(-0.25f, 0.25f), h, R(-0.25f, 0.25f));
                b.Cyl(p, top, rad);
                b.Cyl(top, top + new Vector3(R(-0.2f, 0.2f), R(0.3f, 0.8f), R(-0.2f, 0.2f)), rad * 0.55f);
                int branches = rng.Next(0, 4);
                for (int i = 0; i < branches; i++)
                {
                    Vector3 s = Vector3.Lerp(p, top, R(0.45f, 0.95f));
                    Vector3 dir = new Vector3(R(-1f, 1f), R(0.3f, 1f), R(-1f, 1f)).normalized;
                    b.Cyl(s, s + dir * R(0.8f, 2.2f), rad * 0.35f);
                }
                var c = new GameObject("Tronco");
                c.transform.SetParent(cols, false);
                c.transform.position = (p + top) * 0.5f;
                c.transform.rotation = Quaternion.FromToRotation(Vector3.up, (top - p).normalized);
                var cap = c.AddComponent<CapsuleCollider>();
                cap.radius = rad;
                cap.height = h;
                placed++;
            }
            var go = b.Spawn("ArvoresMortas", Mats.Lit(new Color(0.55f, 0.5f, 0.45f), 0.05f, Mats.Wood), parent, false);
            if (go != null) go.isStatic = true;
        }

        // Tanque britânico Mark I destruído na terra de ninguém (boa cobertura).
        static void BuildTank(Transform parent, Vector3 at)
        {
            at.y = Battlefield.Height(at.x, at.z) - 0.55f;
            var root = new GameObject("TanqueMarkI").transform;
            root.SetParent(parent, false);
            root.position = at;
            root.rotation = Quaternion.Euler(-7f, 205f, 9f);

            var hull = Mats.Lit(new Color(0.52f, 0.5f, 0.42f), 0.2f, Mats.Metal, null, 2f, 0.3f);
            Vector2[] profile =
            {
                new Vector2(-3.0f, 0.0f), new Vector2(2.6f, 0.0f), new Vector2(4.1f, 1.5f),
                new Vector2(3.5f, 2.45f), new Vector2(-3.2f, 2.45f), new Vector2(-4.0f, 0.9f)
            };
            Mesh frame = MeshKit.Extrude(profile, 0.62f);
            var b = new MeshBuilder();
            b.Add(frame, Matrix4x4.TRS(new Vector3(-1.55f, 0, 0), Quaternion.identity, Vector3.one));
            b.Add(frame, Matrix4x4.TRS(new Vector3(1.55f, 0, 0), Quaternion.identity, Vector3.one));
            b.Box(new Vector3(0, 1.35f, 0.2f), Quaternion.identity, new Vector3(2.5f, 1.6f, 5.2f));
            b.Box(new Vector3(0, 2.25f, 1.4f), Quaternion.identity, new Vector3(1.3f, 0.5f, 1.2f));
            for (int s = -1; s <= 1; s += 2)
            {
                b.Box(new Vector3(s * 2.15f, 1.25f, 0.3f), Quaternion.identity, new Vector3(0.6f, 1.0f, 2.0f));
                b.Cyl(new Vector3(s * 2.4f, 1.35f, 0.9f), new Vector3(s * 2.55f, 1.3f, 2.6f), 0.06f);
                // Placas das esteiras
                for (int k = 0; k < 18; k++)
                {
                    float z = -3.0f + k * 0.33f;
                    b.Box(new Vector3(s * 1.55f, -0.02f, z), Quaternion.identity, new Vector3(0.68f, 0.06f, 0.2f));
                }
            }
            // Escotilha arrancada caída ao lado
            b.Box(new Vector3(-3.2f, 0.1f, -1.2f), Quaternion.Euler(10f, 30f, 70f), new Vector3(0.9f, 0.05f, 0.7f));
            var go = MeshKit.Spawn("Casco", b.Build("Tanque"), hull, root, false);
            go.transform.localPosition = Vector3.zero;
            var col = root.gameObject.AddComponent<BoxCollider>();
            col.center = new Vector3(0, 1.2f, 0.2f);
            col.size = new Vector3(4.6f, 2.4f, 7.2f);
            FX.Plume(root.position + Vector3.up * 2f, 0.5f);
        }

        static void BuildDebris(Transform parent)
        {
            var wood = new MeshBuilder();
            var metal = new MeshBuilder();
            for (int i = 0; i < 70; i++)
            {
                float x = R(Battlefield.MinX + 8f, Battlefield.MaxX - 8f);
                float z = R(6f, 250f);
                Vector3 p = Battlefield.Ground(x, z);
                float kind = R();
                if (kind < 0.55f)
                    wood.Box(p + Vector3.up * 0.04f, Quaternion.Euler(R(-10f, 10f), R(0f, 360f), R(-15f, 15f)), new Vector3(R(0.12f, 0.25f), 0.04f, R(0.8f, 2.4f)));
                else if (kind < 0.75f)
                    metal.Cyl(p - Vector3.up * 0.1f, p + new Vector3(R(-0.3f, 0.3f), R(0.2f, 0.5f), R(-0.3f, 0.3f)), 0.08f); // cápsula de obus enterrada
                else if (kind < 0.9f)
                {
                    // Capacete perdido
                    metal.Add(MeshKit.LowSphere, Matrix4x4.TRS(p + Vector3.up * 0.04f, Quaternion.Euler(R(-30f, 30f), R(0, 360f), R(-30f, 30f)), new Vector3(0.3f, 0.14f, 0.32f)));
                }
                else
                {
                    // Barril tombado
                    Vector3 dir = Quaternion.Euler(0, R(0, 360f), 0) * Vector3.forward;
                    metal.Cyl(p + Vector3.up * 0.3f - dir * 0.45f, p + Vector3.up * 0.3f + dir * 0.45f, 0.3f);
                }
            }
            var a = wood.Spawn("Destrocos", Mats.WoodMat, parent, false);
            if (a != null) a.isStatic = true;
            var b = metal.Spawn("Sucata", Mats.RustMat, parent, false);
            if (b != null) b.isStatic = true;
        }

        static void BuildCrates(Transform parent)
        {
            var b = new MeshBuilder();
            float[] xs = { 3.5f, -5f, 13.5f, -18.5f };
            float[] zs = { Battlefield.PlayerTrenchZ, Battlefield.EnemyTrenchZ, Battlefield.EnemyTrenchZ, Battlefield.EnemyTrenchZ };
            for (int i = 0; i < xs.Length; i++)
            {
                float x = xs[i];
                float zc = Battlefield.TrenchZ(x, zs[i]);
                Vector3 p = new Vector3(x, Battlefield.Floor + 0.22f, zc + (i == 0 ? -0.55f : 0.55f));
                Quaternion q = Quaternion.LookRotation(Battlefield.Tangent(x, zs[i]));
                b.Box(p, q, new Vector3(0.5f, 0.44f, 0.85f));
                b.Box(p + Vector3.up * 0.23f, q, new Vector3(0.54f, 0.04f, 0.9f));
                b.Box(p + q * new Vector3(0.26f, 0, 0), q, new Vector3(0.02f, 0.1f, 0.6f));
                Battlefield.ammoCrates.Add(p);
            }
            var go = b.Spawn("CaixasMunicao", Mats.Lit(new Color(0.55f, 0.6f, 0.45f), 0.1f, Mats.Wood), parent, false);
            if (go != null) go.isStatic = true;
        }
    }
}
