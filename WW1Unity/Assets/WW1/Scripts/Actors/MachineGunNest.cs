using UnityEngine;

namespace WW1
{
    // Ninho de metralhadora MG 08 (Maxim) protegido por sacos de areia.
    public class MachineGunNest : MonoBehaviour
    {
        public static MachineGunNest I;
        public bool active, destroyed;
        public SoldierAI gunner;
        Transform yawPivot, muzzle;
        Health target;
        float nextScan, nextShot, burstEnd, pauseUntil, yaw;
        int shotCount;

        public static MachineGunNest Build(Transform parent, Vector3 pos)
        {
            var go = new GameObject("NinhoMetralhadora");
            go.transform.SetParent(parent, false);
            go.transform.position = pos;
            var nest = go.AddComponent<MachineGunNest>();
            I = nest;

            // Anel de sacos de areia virado para os aliados (-Z)
            var bags = new MeshBuilder();
            for (int row = 0; row < 3; row++)
            {
                for (float a = -110f; a <= 110f; a += 13f)
                {
                    float ang = (a + row * 6.5f) * Mathf.Deg2Rad;
                    Vector3 local = new Vector3(Mathf.Sin(ang) * 1.6f, 0, -Mathf.Cos(ang) * 1.6f);
                    Vector3 wp = pos + local;
                    float y = Battlefield.Height(wp.x, wp.z) + 0.1f + row * 0.2f;
                    Quaternion q = Quaternion.LookRotation(new Vector3(Mathf.Cos(ang), 0, Mathf.Sin(ang)));
                    bags.Add(MeshKit.LowSphere, Matrix4x4.TRS(new Vector3(wp.x, y, wp.z) - pos, q, new Vector3(0.36f, 0.24f, 0.62f)));
                }
            }
            bags.Spawn("Sacos", Mats.SandbagMat, go.transform, true);

            // Metralhadora no trenó
            nest.yawPivot = new GameObject("Giro").transform;
            nest.yawPivot.SetParent(go.transform, false);
            nest.yawPivot.localPosition = new Vector3(0, 0.42f, 0.3f);
            nest.yawPivot.localRotation = Quaternion.Euler(0, 180f, 0);
            nest.yaw = 180f;
            var g = new MeshBuilder();
            g.Box(new Vector3(0, -0.12f, -0.1f), Quaternion.identity, new Vector3(0.5f, 0.06f, 0.9f));    // trenó
            g.Box(new Vector3(0, 0.05f, -0.05f), Quaternion.identity, new Vector3(0.12f, 0.3f, 0.12f));   // suporte
            g.Box(new Vector3(0, 0.28f, -0.1f), Quaternion.identity, new Vector3(0.15f, 0.16f, 0.4f));    // caixa da culatra
            g.Cyl(new Vector3(0, 0.29f, 0.1f), new Vector3(0, 0.29f, 0.75f), 0.055f);                   // camisa d'água
            g.Cyl(new Vector3(0, 0.29f, 0.75f), new Vector3(0, 0.29f, 0.88f), 0.02f);                   // boca
            g.Box(new Vector3(0, 0.27f, -0.36f), Quaternion.identity, new Vector3(0.14f, 0.1f, 0.08f));   // empunhaduras
            g.Box(new Vector3(0.22f, 0.25f, -0.1f), Quaternion.identity, new Vector3(0.12f, 0.12f, 0.24f)); // cofre de munição
            MeshKit.Spawn("MG08", g.Build("MG08"), Mats.Lit(new Color(0.3f, 0.31f, 0.28f), 0.4f, Mats.Metal, null, 1f, 0.5f), nest.yawPivot, false);
            nest.muzzle = new GameObject("Boca").transform;
            nest.muzzle.SetParent(nest.yawPivot, false);
            nest.muzzle.localPosition = new Vector3(0, 0.29f, 0.9f);

            // Atirador ajoelhado atrás da arma
            Vector3 gp = pos + new Vector3(0, 0, 0.95f);
            gp.y = Battlefield.Height(gp.x, gp.z);
            nest.gunner = SoldierAI.Spawn(Team.Central, Role.Gunner, gp, 180f, go.transform);
            nest.gunner.health.max = nest.gunner.health.hp = 70f;
            nest.gunner.rushes = false;
            nest.gunner.died += s => nest.Wreck("Atirador da metralhadora abatido!");
            return nest;
        }

        void OnEnable()
        {
            Explosions.Exploded += OnExplosion;
        }

        void OnDisable()
        {
            Explosions.Exploded -= OnExplosion;
            if (I == this) I = null;
        }

        void OnExplosion(Vector3 p, float radius)
        {
            if (destroyed) return;
            if (Vector3.Distance(p, transform.position) < Mathf.Max(5.5f, radius * 0.75f))
            {
                if (gunner != null && gunner.Alive) gunner.health.Damage(999f, p);
                Wreck("Ninho de metralhadora destruído!");
            }
        }

        public void Wreck(string msg)
        {
            if (destroyed) return;
            destroyed = true;
            active = false;
            yawPivot.localRotation *= Quaternion.Euler(-25f, 20f, 30f);
            FX.Plume(transform.position + Vector3.up * 0.5f, 0.35f);
            if (Game.I != null && Game.I.hud != null) Game.I.hud.Message(msg, 3f);
        }

        void Update()
        {
            if (destroyed || !active || Game.I == null || Game.I.state != GameState.Playing) return;
            float dt = Time.deltaTime;

            if (Time.time >= nextScan)
            {
                nextScan = Time.time + 0.6f;
                target = FindTarget();
            }
            if (target == null || target.Dead) return;

            Vector3 to = target.AimPoint - yawPivot.position;
            float wantYaw = Mathf.Atan2(to.x, to.z) * Mathf.Rad2Deg;
            yaw = Mathf.MoveTowardsAngle(yaw, wantYaw + Mathf.Sin(Time.time * 2.3f) * 2.5f, 45f * dt);
            float pitch = -Mathf.Atan2(to.y, new Vector2(to.x, to.z).magnitude) * Mathf.Rad2Deg;
            yawPivot.rotation = Quaternion.Euler(pitch, yaw, 0);

            if (Time.time < pauseUntil) return;
            if (burstEnd <= 0f) burstEnd = Time.time + Random.Range(1.2f, 2.4f);
            if (Time.time > burstEnd)
            {
                burstEnd = 0f;
                pauseUntil = Time.time + Random.Range(1.3f, 2.6f);
                return;
            }
            if (Time.time >= nextShot)
            {
                nextShot = Time.time + 0.11f; // ~550 tiros por minuto
                Shoot();
            }
        }

        Health FindTarget()
        {
            Vector3 eye = muzzle.position;
            Health best = null;
            float bestScore = float.MaxValue;
            for (int i = 0; i < Health.All.Count; i++)
            {
                var h = Health.All[i];
                if (h.team != Team.Allies || h.Dead) continue;
                float d = Vector3.Distance(h.transform.position, transform.position);
                if (d > 170f) continue;
                float score = d * (h.isPlayer ? 0.9f : 1f) + Random.Range(0f, 25f);
                if (score < bestScore && Phys.CanSee(eye, transform, h))
                {
                    bestScore = score;
                    best = h;
                }
            }
            return best;
        }

        void Shoot()
        {
            shotCount++;
            Vector3 m = muzzle.position;
            Vector3 aim = target.AimPoint;
            float dist = Vector3.Distance(m, aim);
            float chance = (target.isPlayer ? 0.075f : 0.11f) * Mathf.Clamp01(1.3f - dist / 170f) * Game.EnemyAccuracy;
            if (target.isPlayer) chance *= PlayerController.I.Exposure;
            bool hitRoll = Random.value < chance;
            Vector3 end = aim;
            if (!hitRoll)
            {
                float s = Mathf.Lerp(0.8f, 2.8f, dist / 170f);
                end = aim + new Vector3(Random.Range(-s, s), Random.Range(-s * 0.8f, s * 0.3f), Random.Range(-s, s));
            }
            Vector3 dir = (end - m).normalized;
            RaycastHit hit;
            bool damaged = false;
            if (Phys.FirstHit(m, dir, dist + 40f, transform, out hit))
            {
                var h = hit.collider.GetComponentInParent<Health>();
                if (hitRoll && h == target)
                {
                    target.Damage(target.isPlayer ? 15f : 45f, m);
                    damaged = true;
                }
                else if (h == null) FX.Impact(hit.point, hit.normal);
                end = hit.point;
            }
            else end = m + dir * (dist + 40f);

            if (shotCount % 2 == 0) FX.Tracer(m, end, true);
            FX.Muzzle(m, dir);
            Sfx.PlayAt(Sfx.MG, m, 1f, Random.Range(0.95f, 1.05f), 8f);
            if (!damaged && target.isPlayer) PlayerController.I.NearMiss(m, end);
        }
    }
}
