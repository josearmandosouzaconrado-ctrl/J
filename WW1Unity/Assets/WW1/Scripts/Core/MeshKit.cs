using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

namespace WW1
{
    // Malhas básicas e um combinador para juntar centenas de peças em poucas chamadas de desenho.
    public static class MeshKit
    {
        static Mesh cube, cylinder, sphere, capsule, lowSphere;

        class MeshData
        {
            public Vector3[] v, n;
            public Vector2[] uv;
            public int[] t;
        }
        static readonly Dictionary<Mesh, MeshData> data = new Dictionary<Mesh, MeshData>();

        public static Mesh Cube { get { if (cube == null) cube = Prim(PrimitiveType.Cube); return cube; } }
        public static Mesh Cylinder { get { if (cylinder == null) cylinder = Prim(PrimitiveType.Cylinder); return cylinder; } }
        public static Mesh Sphere { get { if (sphere == null) sphere = Prim(PrimitiveType.Sphere); return sphere; } }
        public static Mesh Capsule { get { if (capsule == null) capsule = Prim(PrimitiveType.Capsule); return capsule; } }
        public static Mesh LowSphere { get { if (lowSphere == null) lowSphere = MakeSphere(9, 6); return lowSphere; } }

        static Mesh Prim(PrimitiveType t)
        {
            var go = GameObject.CreatePrimitive(t);
            go.SetActive(false);
            var m = go.GetComponent<MeshFilter>().sharedMesh;
            Object.Destroy(go);
            return m;
        }

        public static Mesh MakeSphere(int seg, int rings)
        {
            var v = new List<Vector3>();
            var uv = new List<Vector2>();
            var t = new List<int>();
            for (int r = 0; r <= rings; r++)
            {
                float a = Mathf.PI * r / rings;
                for (int s = 0; s <= seg; s++)
                {
                    float b = Mathf.PI * 2f * s / seg;
                    v.Add(new Vector3(Mathf.Sin(a) * Mathf.Cos(b), Mathf.Cos(a), Mathf.Sin(a) * Mathf.Sin(b)) * 0.5f);
                    uv.Add(new Vector2((float)s / seg, 1f - (float)r / rings));
                }
            }
            for (int r = 0; r < rings; r++)
            {
                for (int s = 0; s < seg; s++)
                {
                    int i = r * (seg + 1) + s;
                    t.Add(i); t.Add(i + 1); t.Add(i + seg + 1);
                    t.Add(i + 1); t.Add(i + seg + 2); t.Add(i + seg + 1);
                }
            }
            var m = new Mesh();
            m.SetVertices(v);
            m.SetUVs(0, uv);
            m.SetTriangles(t, 0);
            var n = new Vector3[v.Count];
            for (int i = 0; i < n.Length; i++) n[i] = v[i].normalized;
            m.normals = n;
            m.RecalculateBounds();
            return m;
        }

        // Extrusão de um polígono convexo desenhado no plano ZY (perfil lateral), com largura em X.
        public static Mesh Extrude(Vector2[] profileZY, float width)
        {
            var v = new List<Vector3>();
            var n = new List<Vector3>();
            var uv = new List<Vector2>();
            var t = new List<int>();
            float hw = width * 0.5f;
            int c = profileZY.Length;
            for (int side = -1; side <= 1; side += 2)
            {
                int start = v.Count;
                for (int i = 0; i < c; i++)
                {
                    v.Add(new Vector3(hw * side, profileZY[i].y, profileZY[i].x));
                    n.Add(new Vector3(side, 0, 0));
                    uv.Add(new Vector2(profileZY[i].x * 0.3f, profileZY[i].y * 0.3f));
                }
                for (int i = 1; i < c - 1; i++)
                {
                    if (side > 0) { t.Add(start); t.Add(start + i + 1); t.Add(start + i); }
                    else { t.Add(start); t.Add(start + i); t.Add(start + i + 1); }
                }
            }
            for (int i = 0; i < c; i++)
            {
                Vector2 a = profileZY[i], b = profileZY[(i + 1) % c];
                Vector2 e = b - a;
                Vector3 normal = new Vector3(0, -e.x, e.y).normalized;
                Vector3 p0 = new Vector3(-hw, a.y, a.x), p1 = new Vector3(hw, a.y, a.x);
                Vector3 p2 = new Vector3(hw, b.y, b.x), p3 = new Vector3(-hw, b.y, b.x);
                int s = v.Count;
                v.Add(p0); v.Add(p1); v.Add(p2); v.Add(p3);
                for (int k = 0; k < 4; k++) n.Add(normal);
                float len = e.magnitude;
                uv.Add(new Vector2(0, 0)); uv.Add(new Vector2(width * 0.3f, 0));
                uv.Add(new Vector2(width * 0.3f, len * 0.3f)); uv.Add(new Vector2(0, len * 0.3f));
                t.Add(s); t.Add(s + 1); t.Add(s + 2);
                t.Add(s); t.Add(s + 2); t.Add(s + 3);
            }
            var m = new Mesh();
            m.SetVertices(v);
            m.SetNormals(n);
            m.SetUVs(0, uv);
            m.SetTriangles(t, 0);
            m.RecalculateBounds();
            return m;
        }

        public static MeshDataRef Get(Mesh m)
        {
            MeshData d;
            if (!data.TryGetValue(m, out d))
            {
                d = new MeshData { v = m.vertices, n = m.normals, uv = m.uv, t = m.triangles };
                data[m] = d;
            }
            return new MeshDataRef { v = d.v, n = d.n, uv = d.uv, t = d.t };
        }

        public struct MeshDataRef
        {
            public Vector3[] v, n;
            public Vector2[] uv;
            public int[] t;
        }

        public static GameObject Spawn(string name, Mesh mesh, Material mat, Transform parent, bool collider, bool shadows = true)
        {
            var go = new GameObject(name);
            go.transform.SetParent(parent, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var mr = go.AddComponent<MeshRenderer>();
            mr.sharedMaterial = mat;
            mr.shadowCastingMode = shadows ? ShadowCastingMode.On : ShadowCastingMode.Off;
            if (collider) go.AddComponent<MeshCollider>().sharedMesh = mesh;
            return go;
        }

        // Cria uma peça simples (com ou sem colisor) presa a um pai.
        public static GameObject Part(string name, Mesh mesh, Material mat, Transform parent, Vector3 pos, Vector3 scale, Quaternion rot, bool collider)
        {
            var go = new GameObject(name);
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            go.transform.localRotation = rot;
            go.transform.localScale = scale;
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            go.AddComponent<MeshRenderer>().sharedMaterial = mat;
            if (collider)
            {
                if (mesh == Cube) go.AddComponent<BoxCollider>();
                else if (mesh == Sphere || mesh == LowSphere) go.AddComponent<SphereCollider>();
                else if (mesh == Capsule || mesh == Cylinder) go.AddComponent<CapsuleCollider>();
                else go.AddComponent<BoxCollider>();
            }
            return go;
        }
    }

    public class MeshBuilder
    {
        readonly List<Vector3> v = new List<Vector3>();
        readonly List<Vector3> n = new List<Vector3>();
        readonly List<Vector2> uv = new List<Vector2>();
        readonly List<int> t = new List<int>();

        public int Count { get { return v.Count; } }

        public void Add(Mesh m, Matrix4x4 mtx, float uvScale = 1f)
        {
            var d = MeshKit.Get(m);
            Matrix4x4 nm = mtx.inverse.transpose;
            int off = v.Count;
            for (int i = 0; i < d.v.Length; i++)
            {
                v.Add(mtx.MultiplyPoint3x4(d.v[i]));
                n.Add(nm.MultiplyVector(d.n[i]).normalized);
                uv.Add(d.uv.Length > 0 ? d.uv[i] * uvScale : Vector2.zero);
            }
            for (int i = 0; i < d.t.Length; i++) t.Add(off + d.t[i]);
        }

        public void Box(Vector3 pos, Quaternion rot, Vector3 size, float uvScale = 1f)
        {
            Add(MeshKit.Cube, Matrix4x4.TRS(pos, rot, size), uvScale);
        }

        public void Cyl(Vector3 a, Vector3 b, float radius)
        {
            Vector3 d = b - a;
            float len = d.magnitude;
            if (len < 0.001f) return;
            Quaternion rot = Quaternion.FromToRotation(Vector3.up, d / len);
            Add(MeshKit.Cylinder, Matrix4x4.TRS((a + b) * 0.5f, rot, new Vector3(radius * 2f, len * 0.5f, radius * 2f)));
        }

        public Mesh Build(string name)
        {
            var m = new Mesh();
            m.name = name;
            if (v.Count > 65000) m.indexFormat = IndexFormat.UInt32;
            m.SetVertices(v);
            m.SetNormals(n);
            m.SetUVs(0, uv);
            m.SetTriangles(t, 0);
            m.RecalculateBounds();
            return m;
        }

        public GameObject Spawn(string name, Material mat, Transform parent, bool collider, bool shadows = true)
        {
            if (v.Count == 0) return null;
            return MeshKit.Spawn(name, Build(name), mat, parent, collider, shadows);
        }
    }
}
