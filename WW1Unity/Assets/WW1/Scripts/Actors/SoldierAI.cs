using System;
using System.Collections.Generic;
using UnityEngine;

namespace WW1
{
    public enum Role { Defender, Attacker, Ally, Gunner, Officer }

    // Inteligência dos soldados: procurar alvos, avançar em lances, atirar, lutar de baioneta e morrer.
    public class SoldierAI : MonoBehaviour
    {
        public static readonly List<SoldierAI> All = new List<SoldierAI>();

        public Team team;
        public Role role;
        public Health health;
        public SoldierRig rig;

        public bool active;          // pode atirar
        public bool holdOnStep;      // fica no degrau de tiro (altura fixa)
        public float stepY;
        public bool moving;
        public Vector3 dest;
        public bool rushes = true;   // avança em lances e para para atirar
        public bool chasePlayer;     // persegue o jogador (combate na trincheira)
        public bool retreating;
        public float accuracy = 0.22f, damage = 22f, range = 115f, runSpeed = 3.9f;
        public Action<SoldierAI> arrived;
        public Action<SoldierAI> died;
        public readonly Queue<Vector3> waypoints = new Queue<Vector3>();

        Health target;
        float nextScan, nextFire, pauseUntil, nextRushStop, nextMelee, fallT = -1f, faceYaw;
        Quaternion fallFrom, fallTo;
        Vector3 fallPos;
        bool kneelWhenIdle;

        public static SoldierAI Spawn(Team team, Role role, Vector3 pos, float yaw, Transform parent)
        {
            var rig = SoldierRig.Build(team, parent, (team == Team.Allies ? "Tommy_" : "Alemao_") + role);
            rig.transform.position = pos;
            rig.transform.rotation = Quaternion.Euler(0, yaw, 0);
            var ai = rig.gameObject.AddComponent<SoldierAI>();
            ai.rig = rig;
            ai.team = team;
            ai.role = role;
            ai.faceYaw = yaw;
            ai.health = rig.gameObject.AddComponent<Health>();
            ai.health.team = team;
            ai.health.aimHeight = 1.3f;
            ai.health.Died += ai.OnDied;
            ai.health.Damaged += ai.OnDamaged;
            ai.dest = pos;
            ai.nextFire = Time.time + UnityEngine.Random.Range(1f, 4f);
            ai.nextRushStop = Time.time + UnityEngine.Random.Range(2f, 5f);
            if (team == Team.Allies)
            {
                ai.accuracy = 0.12f;
                ai.damage = 60f;
            }
            return ai;
        }

        void OnEnable() { All.Add(this); }
        void OnDisable() { All.Remove(this); }

        public void GoTo(Vector3 p)
        {
            dest = p;
            moving = true;
            holdOnStep = false;
        }

        public void HoldStep(float y, float yaw)
        {
            holdOnStep = true;
            stepY = y;
            moving = false;
            faceYaw = yaw;
        }

        public bool Alive { get { return health != null && !health.Dead; } }

        void OnDamaged(float amt, Vector3 from)
        {
            FX.Blood(health.AimPoint + UnityEngine.Random.insideUnitSphere * 0.15f);
        }

        void OnDied()
        {
            fallT = 0f;
            fallFrom = transform.rotation;
            float dir = UnityEngine.Random.value < 0.5f ? -1f : 1f;
            fallTo = Quaternion.Euler(0, transform.eulerAngles.y + UnityEngine.Random.Range(-30f, 30f), 0) * Quaternion.Euler(dir * 86f, 0, UnityEngine.Random.Range(-15f, 15f));
            fallPos = transform.position;
            Phys.SetLayerRecursive(transform, Phys.IgnoreLayer);
            Sfx.PlayAt(Sfx.Hurt, transform.position + Vector3.up, 0.8f, UnityEngine.Random.Range(0.8f, 1.05f), 3f);
            if (died != null) died(this);
        }

        void Update()
        {
            float dt = Time.deltaTime;
            if (dt <= 0f) return;
            if (health.Dead)
            {
                if (fallT >= 0f && fallT < 1f)
                {
                    fallT = Mathf.Min(1f, fallT + dt * 1.6f);
                    float e = fallT * fallT;
                    transform.rotation = Quaternion.Slerp(fallFrom, fallTo, e);
                    float gy = Battlefield.Height(fallPos.x, fallPos.z);
                    float baseY = holdOnStep ? Mathf.Max(gy, stepY) : gy;
                    transform.position = new Vector3(fallPos.x, Mathf.Lerp(fallPos.y, baseY + 0.12f, e), fallPos.z);
                    rig.kneelTarget = 0f;
                    rig.Animate(0f, dt, 0f);
                }
                return;
            }

            var game = Game.I;
            bool playing = game != null && game.state == GameState.Playing;

            if (Time.time >= nextScan)
            {
                nextScan = Time.time + UnityEngine.Random.Range(0.35f, 0.75f);
                target = (active && playing && !retreating) ? FindTarget() : null;
            }
            if (target != null && target.Dead) target = null;

            Vector3 pos = transform.position;
            float speed = 0f;
            bool paused = Time.time < pauseUntil;
            Vector3 moveDir = Vector3.zero;

            if (chasePlayer && playing && PlayerController.I != null && !PlayerController.I.health.Dead)
            {
                Vector3 pp = PlayerController.I.transform.position;
                if ((pp - pos).sqrMagnitude < 30f * 30f)
                {
                    dest = pp;
                    moving = true;
                    holdOnStep = false;
                    paused = paused && (pp - pos).sqrMagnitude > 12f * 12f;
                }
            }

            if (moving && !paused && playing)
            {
                Vector3 to = dest - pos;
                to.y = 0f;
                float d = to.magnitude;
                float stopDist = chasePlayer ? 1.3f : 0.6f;
                if (d < stopDist)
                {
                    if (waypoints.Count > 0) dest = waypoints.Dequeue();
                    else
                    {
                        moving = chasePlayer;
                        if (!chasePlayer && arrived != null) arrived(this);
                    }
                }
                else
                {
                    float spd = runSpeed * (Battlefield.InWire(pos.x, pos.z) ? 0.45f : 1f);
                    moveDir = to / d;
                    Vector3 step = moveDir * Mathf.Min(spd * dt, d);
                    step += Separation(pos) * dt;
                    pos += step;
                    speed = spd;
                    if (rushes && !chasePlayer && Time.time > nextRushStop && target != null)
                    {
                        pauseUntil = Time.time + UnityEngine.Random.Range(1.6f, 3.4f);
                        nextRushStop = pauseUntil + UnityEngine.Random.Range(3f, 6f);
                    }
                }
            }

            float ground = Battlefield.Height(pos.x, pos.z);
            pos.y = holdOnStep ? stepY : ground;
            transform.position = pos;

            // Para onde olhar
            Vector3 look = Vector3.zero;
            if (target != null && (speed < 0.1f || role == Role.Defender)) look = target.transform.position - pos;
            else if (moveDir.sqrMagnitude > 0.01f) look = moveDir;
            if (look.sqrMagnitude > 0.01f) faceYaw = Mathf.Atan2(look.x, look.z) * Mathf.Rad2Deg;
            transform.rotation = Quaternion.RotateTowards(transform.rotation, Quaternion.Euler(0, faceYaw, 0), 300f * dt);

            float aimPitch = 0f;
            if (target != null)
            {
                Vector3 d = target.AimPoint - (pos + Vector3.up * 1.4f);
                aimPitch = -Mathf.Atan2(d.y, new Vector2(d.x, d.z).magnitude) * Mathf.Rad2Deg;
            }

            // Combate corpo a corpo de baioneta
            if (target != null && playing && Time.time >= nextMelee)
            {
                Vector3 dd = target.transform.position - pos;
                dd.y = 0f;
                if (dd.magnitude < 1.9f)
                {
                    nextMelee = Time.time + 1.3f;
                    Sfx.PlayAt(Sfx.Swish, pos + Vector3.up, 0.9f, 1f, 2f);
                    target.Damage(target.isPlayer ? 30f : 70f, pos + Vector3.up * 1.2f);
                    nextFire = Time.time + 1f;
                }
            }

            bool canShoot = target != null && playing && Time.time >= nextFire && (speed < 0.1f || role == Role.Defender);
            if (canShoot) Fire();

            kneelWhenIdle = role == Role.Attacker || role == Role.Ally || role == Role.Gunner;
            rig.kneelTarget = (speed < 0.1f && kneelWhenIdle && !holdOnStep) || role == Role.Gunner ? 1f : 0f;
            rig.Animate(speed, dt, aimPitch);
        }

        Vector3 Separation(Vector3 pos)
        {
            Vector3 push = Vector3.zero;
            for (int i = 0; i < All.Count; i++)
            {
                var o = All[i];
                if (o == this || !o.Alive) continue;
                Vector3 d = pos - o.transform.position;
                d.y = 0f;
                float m = d.sqrMagnitude;
                if (m < 1.2f && m > 0.0001f) push += d.normalized * (1.2f - m) * 2.5f;
            }
            return push;
        }

        Health FindTarget()
        {
            Vector3 eye = transform.position + Vector3.up * (rig.kneelTarget > 0.5f ? 1.05f : 1.55f);
            Health c0 = null, c1 = null, c2 = null;
            float s0 = float.MaxValue, s1 = float.MaxValue, s2 = float.MaxValue;
            for (int i = 0; i < Health.All.Count; i++)
            {
                var h = Health.All[i];
                if (h.team == team || h.Dead) continue;
                float d = Vector3.Distance(h.transform.position, transform.position);
                if (d > range) continue;
                float score = d * (h.isPlayer ? 0.8f : 1f);
                if (score < s0) { c2 = c1; s2 = s1; c1 = c0; s1 = s0; c0 = h; s0 = score; }
                else if (score < s1) { c2 = c1; s2 = s1; c1 = h; s1 = score; }
                else if (score < s2) { c2 = h; s2 = score; }
            }
            // Testa a linha de visão dos 3 candidatos mais próximos.
            if (c0 != null && Phys.CanSee(eye, transform, c0)) return c0;
            if (c1 != null && Phys.CanSee(eye, transform, c1)) return c1;
            if (c2 != null && Phys.CanSee(eye, transform, c2)) return c2;
            return null;
        }

        void Fire()
        {
            nextFire = Time.time + UnityEngine.Random.Range(2.4f, 4.6f) * (team == Team.Allies ? 1.2f : 1f);
            Vector3 m = rig.muzzle.position;
            Vector3 aim = target.AimPoint;
            float dist = Vector3.Distance(m, aim);
            float chance = accuracy * Mathf.Clamp01(1.25f - dist / range);
            if (team == Team.Central) chance *= Game.EnemyAccuracy;
            if (target.isPlayer) chance *= PlayerController.I.Exposure;
            bool hitRoll = UnityEngine.Random.value < chance;

            Vector3 end = aim;
            if (!hitRoll)
            {
                float spread = Mathf.Lerp(0.7f, 2.6f, dist / range);
                end = aim + new Vector3(UnityEngine.Random.Range(-spread, spread), UnityEngine.Random.Range(-spread * 0.6f, spread * 0.5f), UnityEngine.Random.Range(-spread, spread));
            }
            Vector3 dir = (end - m).normalized;
            RaycastHit hit;
            bool damaged = false;
            if (Phys.FirstHit(m, dir, dist + 30f, transform, out hit))
            {
                var h = hit.collider.GetComponentInParent<Health>();
                if (hitRoll && h == target)
                {
                    target.Damage(damage, m);
                    damaged = true;
                }
                else if (h == null) FX.Impact(hit.point, hit.normal);
                end = hit.point;
            }
            else end = m + dir * (dist + 30f);

            FX.Tracer(m, end, false);
            FX.Muzzle(m, dir);
            Sfx.PlayAt(Sfx.Rifle, m, 1f, UnityEngine.Random.Range(0.92f, 1.08f), 6f);

            if (!damaged && target.isPlayer) PlayerController.I.NearMiss(m, end);
        }

        // Atualização periódica do alvo mesmo sem estar visível (usado pela missão).
        public void ForceTarget(Health h) { target = h; }
    }
}
