using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

namespace WW1
{
    // Efeitos visuais: explosões, terra levantada, fumaça, clarões, traçantes, chuva e nuvem de gás.
    public class FX : MonoBehaviour
    {
        static FX I;

        class Sys
        {
            public ParticleSystem ps;
            public float sMin, sMax, lMin, lMax, vMin, vMax;
        }

        class TracerLine
        {
            public LineRenderer lr;
            public Vector3 a, dir;
            public float dist, t, len, speed;
            public bool on;
        }

        Sys fire, chunks, spray, smoke, puff, blood, gas;
        ParticleSystem rain;
        Transform rainRoot;
        Light flash;
        float flashI;
        readonly List<TracerLine> tracers = new List<TracerLine>();
        Material tracerMat;
        float nextGasPuff;

        public static void Init(Transform parent)
        {
            var go = new GameObject("FX");
            go.transform.SetParent(parent, false);
            I = go.AddComponent<FX>();
            I.Build();
        }

        void OnDestroy() { if (I == this) I = null; }

        void Build()
        {
            fire = Make("Fogo", Mats.Puff, 300, 0.15f, 0.35f, 1.2f, 3.2f, 1f, 6f, -0.1f, new Color(1f, 0.75f, 0.35f), new Color(1f, 0.5f, 0.15f), 1.6f, ParticleSystemShapeType.Sphere);
            chunks = Make("Torroes", Mats.Soft, 800, 1.2f, 2.4f, 0.12f, 0.45f, 8f, 18f, 1.6f, new Color(0.17f, 0.13f, 0.1f), new Color(0.3f, 0.24f, 0.17f), 0.8f, ParticleSystemShapeType.Cone);
            spray = Make("Jato", Mats.Puff, 500, 0.9f, 1.8f, 0.8f, 2.4f, 5f, 12f, 0.9f, new Color(0.26f, 0.21f, 0.16f, 0.9f), new Color(0.36f, 0.3f, 0.23f, 0.8f), 2.2f, ParticleSystemShapeType.Cone);
            smoke = Make("Fumaca", Mats.Puff, 600, 4f, 8f, 2.5f, 6f, 0.6f, 2.6f, -0.03f, new Color(0.32f, 0.31f, 0.29f, 0.65f), new Color(0.45f, 0.44f, 0.41f, 0.5f), 2.6f, ParticleSystemShapeType.Sphere);
            puff = Make("Poeira", Mats.Puff, 400, 0.5f, 1.2f, 0.25f, 0.6f, 0.5f, 2f, 0.3f, new Color(0.33f, 0.28f, 0.22f, 0.85f), new Color(0.45f, 0.4f, 0.33f, 0.7f), 2.2f, ParticleSystemShapeType.Sphere);
            blood = Make("Sangue", Mats.Soft, 200, 0.25f, 0.5f, 0.12f, 0.3f, 0.5f, 2f, 0.8f, new Color(0.35f, 0.03f, 0.02f, 0.9f), new Color(0.5f, 0.06f, 0.04f, 0.8f), 1.8f, ParticleSystemShapeType.Sphere);
            gas = Make("Gas", Mats.Puff, 500, 6f, 10f, 4f, 9f, 0.2f, 0.8f, 0f, new Color(0.62f, 0.66f, 0.38f, 0.32f), new Color(0.72f, 0.72f, 0.45f, 0.26f), 1.6f, ParticleSystemShapeType.Sphere);

            var shape = chunks.ps.shape;
            shape.angle = 30f;
            shape.radius = 0.4f;
            shape.rotation = new Vector3(-90f, 0, 0);
            shape = spray.ps.shape;
            shape.angle = 18f;
            shape.radius = 0.6f;
            shape.rotation = new Vector3(-90f, 0, 0);
            shape = smoke.ps.shape;
            shape.radius = 1.5f;

            // Chuva que acompanha a câmera
            rainRoot = new GameObject("Chuva").transform;
            rainRoot.SetParent(transform, false);
            var rgo = new GameObject("Gotas");
            rgo.transform.SetParent(rainRoot, false);
            rgo.transform.localPosition = new Vector3(0, 12f, 0);
            rain = rgo.AddComponent<ParticleSystem>();
            rain.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            var main = rain.main;
            main.loop = true;
            main.playOnAwake = false;
            main.simulationSpace = ParticleSystemSimulationSpace.World;
            main.startLifetime = 0.95f;
            main.startSpeed = 0f;
            main.startSize = 0.022f;
            main.maxParticles = 2500;
            main.startColor = new Color(0.75f, 0.77f, 0.8f, 0.32f);
            var vel = rain.velocityOverLifetime;
            vel.enabled = true;
            vel.space = ParticleSystemSimulationSpace.World;
            vel.x = new ParticleSystem.MinMaxCurve(-1.5f, -1.0f);
            vel.y = new ParticleSystem.MinMaxCurve(-16f, -14f);
            vel.z = new ParticleSystem.MinMaxCurve(0.4f, 0.8f);
            var em = rain.emission;
            em.rateOverTime = Game.LowQuality ? 700f : 1800f;
            var rs = rain.shape;
            rs.shapeType = ParticleSystemShapeType.Box;
            rs.scale = new Vector3(36f, 0.5f, 36f);
            var rr = rgo.GetComponent<ParticleSystemRenderer>();
            rr.renderMode = ParticleSystemRenderMode.Stretch;
            rr.velocityScale = 0.035f;
            rr.lengthScale = 1f;
            rr.sharedMaterial = Mats.Sprite(Mats.Soft, Color.white);
            rr.shadowCastingMode = ShadowCastingMode.Off;
            rr.receiveShadows = false;
            rain.Play();

            var lgo = new GameObject("Clarao");
            lgo.transform.SetParent(transform, false);
            flash = lgo.AddComponent<Light>();
            flash.type = LightType.Point;
            flash.range = 30f;
            flash.color = new Color(1f, 0.72f, 0.42f);
            flash.intensity = 0f;
            flash.shadows = LightShadows.None;
            flash.enabled = false;

            tracerMat = Mats.Sprite(Mats.Soft, Color.white);
            for (int i = 0; i < 40; i++)
            {
                var tgo = new GameObject("Tracante");
                tgo.transform.SetParent(transform, false);
                var lr = tgo.AddComponent<LineRenderer>();
                lr.sharedMaterial = tracerMat;
                lr.positionCount = 2;
                lr.shadowCastingMode = ShadowCastingMode.Off;
                lr.receiveShadows = false;
                lr.enabled = false;
                lr.textureMode = LineTextureMode.Stretch;
                tracers.Add(new TracerLine { lr = lr });
            }
        }

        Sys Make(string name, Texture2D tex, int max, float lMin, float lMax, float sMin, float sMax, float vMin, float vMax, float gravity, Color c0, Color c1, float grow, ParticleSystemShapeType shapeType)
        {
            var go = new GameObject(name);
            go.transform.SetParent(transform, false);
            var ps = go.AddComponent<ParticleSystem>();
            ps.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            var main = ps.main;
            main.loop = true;
            main.duration = 1f;
            main.playOnAwake = false;
            main.maxParticles = max;
            main.simulationSpace = ParticleSystemSimulationSpace.World;
            main.startLifetime = new ParticleSystem.MinMaxCurve(lMin, lMax);
            main.startSize = new ParticleSystem.MinMaxCurve(sMin, sMax);
            main.startSpeed = new ParticleSystem.MinMaxCurve(vMin, vMax);
            main.gravityModifier = gravity;
            main.startRotation = new ParticleSystem.MinMaxCurve(0f, Mathf.PI * 2f);
            main.startColor = new ParticleSystem.MinMaxGradient(c0, c1);
            var em = ps.emission;
            em.rateOverTime = 0f;
            var shape = ps.shape;
            shape.shapeType = shapeType;
            shape.radius = 0.3f;
            var col = ps.colorOverLifetime;
            col.enabled = true;
            var g = new Gradient();
            g.SetKeys(new[] { new GradientColorKey(Color.white, 0f), new GradientColorKey(Color.white, 1f) },
                      new[] { new GradientAlphaKey(1f, 0f), new GradientAlphaKey(0.8f, 0.5f), new GradientAlphaKey(0f, 1f) });
            col.color = new ParticleSystem.MinMaxGradient(g);
            var sz = ps.sizeOverLifetime;
            sz.enabled = true;
            sz.size = new ParticleSystem.MinMaxCurve(1f, AnimationCurve.Linear(0f, 1f, 1f, grow));
            var rot = ps.rotationOverLifetime;
            rot.enabled = true;
            rot.z = new ParticleSystem.MinMaxCurve(-0.6f, 0.6f);
            var r = go.GetComponent<ParticleSystemRenderer>();
            r.sharedMaterial = Mats.Sprite(tex, Color.white);
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            ps.Play();
            return new Sys { ps = ps, sMin = sMin, sMax = sMax, lMin = lMin, lMax = lMax, vMin = vMin, vMax = vMax };
        }

        static void Emit(Sys s, Vector3 pos, int count, float sizeMul, float lifeMul = 1f)
        {
            var ep = new ParticleSystem.EmitParams();
            ep.position = pos;
            ep.applyShapeToPosition = true;
            for (int i = 0; i < count; i++)
            {
                ep.startSize = Random.Range(s.sMin, s.sMax) * sizeMul;
                ep.startLifetime = Random.Range(s.lMin, s.lMax) * lifeMul;
                s.ps.Emit(ep, 1);
            }
        }

        static void EmitVel(Sys s, Vector3 pos, Vector3 vel, float size, float life)
        {
            var ep = new ParticleSystem.EmitParams();
            ep.position = pos;
            ep.velocity = vel;
            ep.startSize = size;
            ep.startLifetime = life;
            s.ps.Emit(ep, 1);
        }

        public static void Explosion(Vector3 p, float scale)
        {
            if (I == null) return;
            float q = Game.LowQuality ? 0.5f : 1f;
            Emit(I.fire, p + Vector3.up * 0.6f, Mathf.CeilToInt(8 * scale), scale);
            Emit(I.chunks, p, Mathf.CeilToInt(40 * scale * q), 1f);
            Emit(I.spray, p, Mathf.CeilToInt(14 * scale * q), scale);
            Emit(I.smoke, p + Vector3.up * 1.2f, Mathf.CeilToInt(10 * scale * q), scale);
            Flash(p + Vector3.up * 1.5f, 3.5f * scale);
        }

        public static void Impact(Vector3 p, Vector3 n)
        {
            if (I == null) return;
            for (int i = 0; i < 3; i++)
            {
                Vector3 v = (n + Random.insideUnitSphere * 0.6f).normalized * Random.Range(1f, 3.5f) + Vector3.up;
                EmitVel(I.puff, p, v, Random.Range(0.2f, 0.45f), Random.Range(0.5f, 1.1f));
            }
            EmitVel(I.chunks, p, (n + Random.insideUnitSphere * 0.5f) * 3f, 0.05f, 0.6f);
        }

        public static void Blood(Vector3 p)
        {
            if (I == null) return;
            for (int i = 0; i < 4; i++)
                EmitVel(I.blood, p, Random.insideUnitSphere * 1.5f, Random.Range(0.1f, 0.25f), Random.Range(0.25f, 0.5f));
        }

        public static void Muzzle(Vector3 p, Vector3 dir)
        {
            if (I == null) return;
            EmitVel(I.fire, p + dir * 0.08f, dir * 2f, Random.Range(0.22f, 0.4f), 0.05f);
            EmitVel(I.puff, p + dir * 0.2f, dir * 1.5f + Vector3.up * 0.4f, 0.35f, 1.2f);
        }

        public static void Flash(Vector3 p, float intensity)
        {
            if (I == null || Game.LowQuality) return;
            if (I.flash.enabled && I.flashI > intensity) return;
            I.flash.transform.position = p;
            I.flash.enabled = true;
            I.flashI = intensity;
        }

        public static void Tracer(Vector3 a, Vector3 b, bool bright)
        {
            if (I == null) return;
            TracerLine t = null;
            for (int i = 0; i < I.tracers.Count; i++) if (!I.tracers[i].on) { t = I.tracers[i]; break; }
            if (t == null) return;
            Vector3 d = b - a;
            t.a = a;
            t.dist = d.magnitude;
            if (t.dist < 0.5f) return;
            t.dir = d / t.dist;
            t.t = 0f;
            t.len = bright ? 7f : 4f;
            t.speed = bright ? 420f : 500f;
            t.on = true;
            t.lr.enabled = true;
            Color head = bright ? new Color(1f, 0.85f, 0.55f, 0.95f) : new Color(1f, 0.9f, 0.75f, 0.28f);
            t.lr.startColor = new Color(head.r, head.g, head.b, 0f);
            t.lr.endColor = head;
            t.lr.widthMultiplier = bright ? 0.05f : 0.025f;
        }

        // Coluna de fumaça permanente (destroços queimando).
        public static void Plume(Vector3 p, float scale)
        {
            if (I == null) return;
            var go = new GameObject("ColunaFumaca");
            go.transform.SetParent(I.transform, false);
            go.transform.position = p;
            var ps = go.AddComponent<ParticleSystem>();
            ps.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            var main = ps.main;
            main.loop = true;
            main.playOnAwake = false;
            main.simulationSpace = ParticleSystemSimulationSpace.World;
            main.startLifetime = new ParticleSystem.MinMaxCurve(6f, 10f);
            main.startSpeed = new ParticleSystem.MinMaxCurve(0.6f, 1.4f);
            main.startSize = new ParticleSystem.MinMaxCurve(1.5f * scale, 3.5f * scale);
            main.startRotation = new ParticleSystem.MinMaxCurve(0f, Mathf.PI * 2f);
            main.startColor = new ParticleSystem.MinMaxGradient(new Color(0.15f, 0.14f, 0.13f, 0.55f), new Color(0.3f, 0.29f, 0.27f, 0.45f));
            main.maxParticles = 60;
            var em = ps.emission;
            em.rateOverTime = Game.LowQuality ? 3f : 6f;
            var shape = ps.shape;
            shape.shapeType = ParticleSystemShapeType.Cone;
            shape.angle = 8f;
            shape.radius = 0.3f;
            shape.rotation = new Vector3(-90f, 0, 0);
            var vel = ps.velocityOverLifetime;
            vel.enabled = true;
            vel.space = ParticleSystemSimulationSpace.World;
            vel.x = new ParticleSystem.MinMaxCurve(0.6f, 1.2f);
            vel.y = new ParticleSystem.MinMaxCurve(0f, 0.2f);
            vel.z = new ParticleSystem.MinMaxCurve(0.2f, 0.5f);
            var col = ps.colorOverLifetime;
            col.enabled = true;
            var g = new Gradient();
            g.SetKeys(new[] { new GradientColorKey(Color.white, 0f), new GradientColorKey(Color.white, 1f) },
                      new[] { new GradientAlphaKey(0f, 0f), new GradientAlphaKey(1f, 0.15f), new GradientAlphaKey(0f, 1f) });
            col.color = new ParticleSystem.MinMaxGradient(g);
            var sz = ps.sizeOverLifetime;
            sz.enabled = true;
            sz.size = new ParticleSystem.MinMaxCurve(1f, AnimationCurve.Linear(0f, 0.6f, 1f, 3f));
            var r = go.GetComponent<ParticleSystemRenderer>();
            r.sharedMaterial = Mats.Sprite(Mats.Puff, Color.white);
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            ps.Play();
        }

        void Update()
        {
            float dt = Time.deltaTime;
            Camera cam = Game.I != null ? Game.I.ActiveCamera : null;
            if (cam != null) rainRoot.position = cam.transform.position + cam.transform.forward * 6f;

            if (flash.enabled)
            {
                flashI = Mathf.MoveTowards(flashI, 0f, dt * 40f);
                flash.intensity = flashI;
                if (flashI <= 0.01f) flash.enabled = false;
            }

            for (int i = 0; i < tracers.Count; i++)
            {
                var t = tracers[i];
                if (!t.on) continue;
                t.t += dt;
                float head = Mathf.Min(t.dist, t.t * t.speed);
                float tail = Mathf.Max(0f, t.t * t.speed - t.len);
                if (tail >= t.dist)
                {
                    t.on = false;
                    t.lr.enabled = false;
                    continue;
                }
                t.lr.SetPosition(0, t.a + t.dir * tail);
                t.lr.SetPosition(1, t.a + t.dir * head);
            }

            // Nuvem de gás de cloro rolando pela trincheira
            if (Game.I != null && Game.I.gasActive && PlayerController.I != null && Time.time >= nextGasPuff)
            {
                nextGasPuff = Time.time + (Game.LowQuality ? 0.25f : 0.12f);
                Vector3 c = PlayerController.I.transform.position;
                Vector3 p = new Vector3(c.x + Random.Range(-22f, 22f), 0f, c.z + Random.Range(-10f, 26f));
                p.y = Battlefield.Height(p.x, p.z) + Random.Range(0.3f, 1.5f);
                EmitVel(gas, p, new Vector3(Random.Range(-0.2f, 0.2f), 0.05f, -1.1f), Random.Range(4f, 9f), Random.Range(6f, 10f));
            }
        }
    }
}
