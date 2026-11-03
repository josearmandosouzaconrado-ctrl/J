using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace WW1
{
    public static class Explosions
    {
        public static event Action<Vector3, float> Exploded;
        static readonly List<Health> tmp = new List<Health>();

        // spareTeam: time que não sofre dano (ex.: barragem aliada não atinge alemães nos abrigos).
        public static void Explode(Vector3 p, float radius, float maxDamage, float scale, bool spareCentral = false)
        {
            FX.Explosion(p, scale);
            Sfx.PlayAt(Sfx.Explosion, p, 1f, UnityEngine.Random.Range(0.85f, 1.1f) / Mathf.Sqrt(Mathf.Max(0.4f, scale)), 9f * scale);

            var pc = PlayerController.I;
            if (pc != null)
            {
                float d = Vector3.Distance(pc.transform.position, p);
                pc.AddShake(scale * Mathf.Clamp01(1f - d / 70f) * 0.9f);
            }

            if (maxDamage > 0f)
            {
                tmp.Clear();
                tmp.AddRange(Health.All);
                foreach (var h in tmp)
                {
                    if (h == null || h.Dead) continue;
                    if (spareCentral && h.team == Team.Central) continue;
                    float d = Vector3.Distance(h.AimPoint, p);
                    if (d > radius) continue;
                    float f = Mathf.Pow(1f - d / radius, 1.2f);
                    // Terra/sacos de areia no caminho reduzem o dano
                    Vector3 from = p + Vector3.up * 0.4f;
                    Vector3 dir = h.AimPoint - from;
                    RaycastHit hit;
                    if (Phys.FirstHit(from, dir.normalized, dir.magnitude, null, out hit) && hit.collider.GetComponentInParent<Health>() != h) f *= 0.35f;
                    h.Damage(maxDamage * f, p);
                    if (h.Dead && h.team == Team.Central && Game.I != null && !spareCentral) Game.I.kills++;
                }
            }
            if (Exploded != null && !spareCentral) Exploded(p, radius);
        }
    }

    // Artilharia: barragem aliada antes do ataque, obuses alemães e trovão distante.
    public class Artillery : MonoBehaviour
    {
        public static Artillery I;
        public bool friendlyBarrage;
        public float barrageZ0 = 145f, barrageZ1 = 158f, barrageInterval = 0.8f;
        public bool enemyShelling;
        public float shellInterval = 7f, shellMax = 55f;
        public bool menuAmbience = true;
        float nextFriendly, nextEnemy, nextRumble;

        void Awake() { I = this; }
        void OnDestroy() { if (I == this) I = null; }

        void Update()
        {
            if (Game.I == null) return;
            bool playing = Game.I.state == GameState.Playing;
            bool menu = Game.I.state == GameState.Menu || Game.I.state == GameState.Briefing;
            float t = Time.time;

            if ((friendlyBarrage && playing) || (menu && menuAmbience))
            {
                if (t >= nextFriendly)
                {
                    nextFriendly = t + barrageInterval * UnityEngine.Random.Range(0.5f, 1.5f) * (menu ? 2.5f : 1f);
                    float x = UnityEngine.Random.Range(Battlefield.MinX + 8f, Battlefield.MaxX - 8f);
                    float z = UnityEngine.Random.Range(barrageZ0, barrageZ1);
                    Vector3 p = Battlefield.Ground(x, z);
                    var pc = PlayerController.I;
                    if (pc == null || Vector3.Distance(pc.transform.position, p) > 18f)
                        Explosions.Explode(p, 8f, playing ? 200f : 0f, 1.3f, true);
                }
            }

            if (enemyShelling && playing && t >= nextEnemy)
            {
                nextEnemy = t + shellInterval * UnityEngine.Random.Range(0.6f, 1.4f);
                StartCoroutine(Shell());
            }

            if (t >= nextRumble)
            {
                nextRumble = t + UnityEngine.Random.Range(2.5f, 7f);
                if (playing || menu) Sfx.Play2D(Sfx.Rumble, UnityEngine.Random.Range(0.15f, 0.35f), UnityEngine.Random.Range(0.7f, 1.05f));
            }
        }

        IEnumerator Shell()
        {
            var pc = PlayerController.I;
            if (pc == null) yield break;
            float minD = Game.ShellMinDist;
            float ang = UnityEngine.Random.Range(0f, Mathf.PI * 2f);
            float dist = UnityEngine.Random.Range(minD, shellMax);
            Vector3 c = pc.transform.position;
            float x = Mathf.Clamp(c.x + Mathf.Cos(ang) * dist, Battlefield.MinX + 6f, Battlefield.MaxX - 6f);
            float z = Mathf.Clamp(c.z + Mathf.Sin(ang) * dist, Battlefield.MinZ + 6f, Battlefield.MaxZ - 6f);
            Vector3 p = Battlefield.Ground(x, z);
            Sfx.PlayAt(Sfx.Incoming, p + Vector3.up * 15f, 0.9f, UnityEngine.Random.Range(0.9f, 1.1f), 25f);
            yield return new WaitForSeconds(1.15f);
            if (Game.I == null || Game.I.state != GameState.Playing) yield break;
            Explosions.Explode(p, 8f, 140f, 1.2f);
        }
    }
}
