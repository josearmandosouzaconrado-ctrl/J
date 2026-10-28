using System.Collections;
using UnityEngine;
using UnityEngine.Rendering;

namespace WW1
{
    // Fuzil Lee-Enfield (ferrolho, 10 tiros, baioneta) e granadas Mills.
    public class PlayerWeapon : MonoBehaviour
    {
        public const int MagSize = 10, MaxReserve = 60, MaxGrenades = 4;
        public int mag = MagSize, reserve = 50, grenades = 3;

        public bool Reloading { get; private set; }
        public float AdsAmount { get { return adsT; } }
        public float ReloadProgress { get { return Reloading ? Mathf.InverseLerp(reloadStart, reloadEnd, Time.time) : 0f; } }

        PlayerController p;
        Transform vm, rifle, bolt, muzzle;
        float busyUntil, reloadStart, reloadEnd, boltStart = -10f, meleeT = -1f, throwT = -1f, adsT, kick, swayT;
        readonly Vector3 hipPos = new Vector3(0.15f, -0.19f, 0.30f);
        readonly Vector3 adsPos = new Vector3(0f, -0.052f, 0.06f);

        public void Init(PlayerController owner)
        {
            p = owner;
            BuildViewModel();
        }

        void BuildViewModel()
        {
            vm = new GameObject("ArmaPrimeiraPessoa").transform;
            vm.SetParent(p.cam.transform, false);
            rifle = new GameObject("LeeEnfield").transform;
            rifle.SetParent(vm, false);

            Material wood = Mats.Lit(new Color(0.85f, 0.75f, 0.65f), 0.25f, Mats.Wood);
            Material steel = Mats.Lit(new Color(0.4f, 0.41f, 0.42f), 0.55f, Mats.Metal, null, 1f, 0.8f);
            Material sleeve = Mats.Cloth01(new Color(0.46f, 0.41f, 0.27f));
            Material skin = Mats.Lit(new Color(0.78f, 0.6f, 0.49f), 0.25f);

            V("Coronha", MeshKit.Cube, wood, new Vector3(0, -0.045f, -0.27f), new Vector3(0.042f, 0.11f, 0.3f), Quaternion.Euler(6f, 0, 0));
            V("Punho", MeshKit.Cube, wood, new Vector3(0, -0.015f, -0.08f), new Vector3(0.038f, 0.06f, 0.14f), Quaternion.Euler(10f, 0, 0));
            V("Culatra", MeshKit.Cube, steel, new Vector3(0, 0.014f, 0.05f), new Vector3(0.036f, 0.045f, 0.2f), Quaternion.identity);
            V("Carregador", MeshKit.Cube, steel, new Vector3(0, -0.035f, 0.07f), new Vector3(0.03f, 0.05f, 0.08f), Quaternion.identity);
            V("Guarda", MeshKit.Cube, wood, new Vector3(0, 0.0f, 0.37f), new Vector3(0.044f, 0.045f, 0.5f), Quaternion.identity);
            V("GuardaSup", MeshKit.Cube, wood, new Vector3(0, 0.028f, 0.36f), new Vector3(0.032f, 0.014f, 0.42f), Quaternion.identity);
            V("Cano", MeshKit.Cylinder, steel, new Vector3(0, 0.012f, 0.66f), new Vector3(0.017f, 0.06f, 0.017f), Quaternion.Euler(90f, 0, 0));
            V("MiraFrente", MeshKit.Cube, steel, new Vector3(0, 0.041f, 0.64f), new Vector3(0.004f, 0.022f, 0.006f), Quaternion.identity);
            V("ProtecaoMira", MeshKit.Cube, steel, new Vector3(0.011f, 0.038f, 0.64f), new Vector3(0.003f, 0.028f, 0.02f), Quaternion.identity);
            V("ProtecaoMira", MeshKit.Cube, steel, new Vector3(-0.011f, 0.038f, 0.64f), new Vector3(0.003f, 0.028f, 0.02f), Quaternion.identity);
            V("MiraTrasE", MeshKit.Cube, steel, new Vector3(-0.009f, 0.046f, 0.13f), new Vector3(0.012f, 0.012f, 0.01f), Quaternion.identity);
            V("MiraTrasD", MeshKit.Cube, steel, new Vector3(0.009f, 0.046f, 0.13f), new Vector3(0.012f, 0.012f, 0.01f), Quaternion.identity);
            V("Baioneta", MeshKit.Cube, steel, new Vector3(0, -0.018f, 0.9f), new Vector3(0.005f, 0.022f, 0.42f), Quaternion.identity);
            V("Guardamato", MeshKit.Cube, steel, new Vector3(0, -0.04f, -0.01f), new Vector3(0.012f, 0.03f, 0.06f), Quaternion.identity);

            bolt = new GameObject("Ferrolho").transform;
            bolt.SetParent(rifle, false);
            bolt.localPosition = new Vector3(0.02f, 0.02f, -0.01f);
            var knob = MeshKit.Part("Alavanca", MeshKit.Cylinder, steel, bolt, new Vector3(0.03f, 0, 0), new Vector3(0.012f, 0.03f, 0.012f), Quaternion.Euler(0, 0, 90f), false);
            NoShadow(knob);
            NoShadow(MeshKit.Part("Bola", MeshKit.Sphere, steel, bolt, new Vector3(0.06f, 0, 0), Vector3.one * 0.022f, Quaternion.identity, false));

            // Mãos e mangas
            V("MaoD", MeshKit.Cube, skin, new Vector3(0.018f, -0.045f, -0.09f), new Vector3(0.05f, 0.08f, 0.09f), Quaternion.Euler(10f, 0, 0));
            V("MangaD", MeshKit.Cube, sleeve, new Vector3(0.07f, -0.1f, -0.26f), new Vector3(0.09f, 0.09f, 0.32f), Quaternion.Euler(18f, -18f, 0));
            V("MaoE", MeshKit.Cube, skin, new Vector3(-0.012f, -0.04f, 0.33f), new Vector3(0.06f, 0.07f, 0.1f), Quaternion.identity);
            V("MangaE", MeshKit.Cube, sleeve, new Vector3(-0.1f, -0.12f, 0.16f), new Vector3(0.09f, 0.09f, 0.36f), Quaternion.Euler(14f, 32f, 0));

            muzzle = new GameObject("Boca").transform;
            muzzle.SetParent(rifle, false);
            muzzle.localPosition = new Vector3(0, 0.012f, 0.71f);
            vm.localPosition = hipPos;
        }

        void V(string name, Mesh mesh, Material mat, Vector3 pos, Vector3 scale, Quaternion rot)
        {
            NoShadow(MeshKit.Part(name, mesh, mat, rifle, pos, scale, rot, false));
        }

        static void NoShadow(GameObject go)
        {
            var r = go.GetComponent<MeshRenderer>();
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
        }

        bool CanAct()
        {
            return p.controls && !p.Mantling && !p.health.Dead && !Reloading && Time.time >= busyUntil;
        }

        public void TryFire()
        {
            if (!CanAct()) return;
            if (mag <= 0)
            {
                Sfx.Play2D(Sfx.Click, 0.7f, 1f);
                TryReload();
                return;
            }
            mag--;
            Game.I.shots++;
            Transform c = p.cam.transform;
            float moveSpread = Mathf.Clamp01(p.moveInput.magnitude) * 1.6f * (1f - adsT * 0.7f);
            float spread = Mathf.Lerp(2.2f, 0.12f, adsT) + moveSpread;
            Vector3 dir = Quaternion.AngleAxis(Random.Range(-spread, spread), c.up) * Quaternion.AngleAxis(Random.Range(-spread, spread), c.right) * c.forward;
            dir = AimAssist(c.position, dir);

            RaycastHit hit;
            if (Phys.FirstHit(c.position, dir, 450f, p.transform, out hit))
            {
                var h = hit.collider.GetComponentInParent<Health>();
                if (h != null && h.team == Team.Central && !h.Dead)
                {
                    bool head = hit.collider.name == "Head";
                    float dmg = head ? 250f : hit.collider.name == "Torso" ? 120f : 75f;
                    h.Damage(dmg, c.position);
                    Game.I.hits++;
                    if (h.Dead) Game.I.kills++;
                    Game.I.hud.HitMarker(h.Dead, head);
                }
                else if (h == null) FX.Impact(hit.point, hit.normal);
            }

            FX.Muzzle(muzzle.position, dir);
            FX.Flash(muzzle.position, 0.6f);
            Sfx.Play2D(Sfx.Rifle, 1f, Random.Range(0.96f, 1.04f));
            p.AddRecoil(adsT > 0.5f ? 1.5f : 2.3f);
            p.AddShake(0.06f);
            kick = 1f;
            busyUntil = Time.time + 1.0f;
            boltStart = Time.time + 0.2f;
            StartCoroutine(Delayed(0.25f, () => Sfx.Play2D(Sfx.Bolt, 0.8f, 1f)));
        }

        // Pequena ajuda de mira para telas de toque.
        Vector3 AimAssist(Vector3 origin, Vector3 dir)
        {
            float bestAng = Mathf.Lerp(4.5f, 2.2f, adsT);
            Vector3 best = Vector3.zero;
            for (int i = 0; i < SoldierAI.All.Count; i++)
            {
                var ai = SoldierAI.All[i];
                if (ai.team != Team.Central || !ai.Alive) continue;
                Vector3 torso = ai.rig.upper.position + ai.rig.upper.up * 0.3f;
                Vector3 headP = ai.rig.head.position;
                for (int k = 0; k < 2; k++)
                {
                    Vector3 pt = k == 0 ? torso : headP;
                    Vector3 to = pt - origin;
                    if (to.sqrMagnitude > 160f * 160f) continue;
                    float ang = Vector3.Angle(dir, to);
                    if (ang >= bestAng) continue;
                    RaycastHit hit;
                    if (Phys.FirstHit(origin, to.normalized, to.magnitude + 0.5f, p.transform, out hit) && hit.collider.GetComponentInParent<Health>() == ai.health)
                    {
                        bestAng = ang;
                        best = to.normalized;
                        break;
                    }
                }
            }
            return best == Vector3.zero ? dir : Vector3.Slerp(dir, best, 0.85f).normalized;
        }

        public void TryReload()
        {
            if (Reloading || Time.time < busyUntil || mag >= MagSize || reserve <= 0 || !p.controls) return;
            Reloading = true;
            reloadStart = Time.time;
            reloadEnd = Time.time + 2.5f;
            Sfx.Play2D(Sfx.Reload, 0.85f, 1f);
        }

        public void TryGrenade()
        {
            if (!CanAct() || grenades <= 0) return;
            grenades--;
            throwT = 0f;
            busyUntil = Time.time + 0.95f;
            Sfx.Play2D(Sfx.Click, 0.8f, 1.4f);
            StartCoroutine(Delayed(0.35f, () =>
            {
                Transform c = p.cam.transform;
                Vector3 pos = c.position + c.forward * 0.5f + c.right * 0.12f;
                Vector3 vel = c.forward * 16f + Vector3.up * 3.5f;
                Grenade.Throw(pos, vel, Game.I.world);
                Sfx.Play2D(Sfx.Swish, 0.6f, 0.8f);
            }));
        }

        public void TryMelee()
        {
            if (!CanAct()) return;
            meleeT = 0f;
            busyUntil = Time.time + 0.75f;
            Sfx.Play2D(Sfx.Swish, 0.9f, 1.1f);
            StartCoroutine(Delayed(0.15f, MeleeHit));
        }

        void MeleeHit()
        {
            Vector3 me = p.transform.position;
            for (int i = 0; i < Health.All.Count; i++)
            {
                var h = Health.All[i];
                if (h.team != Team.Central || h.Dead) continue;
                Vector3 d = h.transform.position - me;
                d.y = 0f;
                if (d.magnitude > 2.6f || Vector3.Angle(p.transform.forward, d) > 60f) continue;
                h.Damage(150f, me + Vector3.up);
                Game.I.hits++;
                if (h.Dead) Game.I.kills++;
                Game.I.hud.HitMarker(h.Dead, false);
                Sfx.Play2D(Sfx.Thump, 0.9f, 1.2f);
                p.AddShake(0.12f);
                break;
            }
        }

        public bool Resupply()
        {
            if (reserve >= MaxReserve && grenades >= MaxGrenades) return false;
            reserve = MaxReserve;
            grenades = MaxGrenades;
            Sfx.Play2D(Sfx.Reload, 0.5f, 1.3f);
            return true;
        }

        IEnumerator Delayed(float t, System.Action a)
        {
            yield return new WaitForSeconds(t);
            if (p != null && !p.health.Dead) a();
        }

        void Update()
        {
            float dt = Time.deltaTime;
            if (dt <= 0f) return;

            if (Reloading && Time.time >= reloadEnd)
            {
                int n = Mathf.Min(MagSize - mag, reserve);
                mag += n;
                reserve -= n;
                Reloading = false;
            }
            if (mag == 0 && reserve > 0 && !Reloading && Time.time >= busyUntil && p.controls) TryReload();

            bool wantAds = p.ads && !Reloading && throwT < 0f && meleeT < 0f && !p.Mantling;
            adsT = Mathf.MoveTowards(adsT, wantAds ? 1f : 0f, dt * 6f);

            Vector3 pos = Vector3.Lerp(hipPos, adsPos, Mathf.SmoothStep(0, 1, adsT));
            Quaternion rot = Quaternion.Slerp(Quaternion.Euler(1f, -3f, 3f), Quaternion.identity, adsT);

            // Balanço ao andar
            float moving = Mathf.Clamp01(p.moveInput.magnitude);
            swayT += dt * (p.sprint ? 11f : 7f) * moving;
            float sw = (1f - adsT * 0.85f);
            pos += new Vector3(Mathf.Cos(swayT * 0.5f) * 0.012f, Mathf.Abs(Mathf.Sin(swayT * 0.5f)) * 0.012f, 0) * moving * sw;
            pos += new Vector3(0, Mathf.Sin(Time.time * 1.3f) * 0.002f, 0) * sw;
            if (p.sprint && moving > 0.5f && adsT < 0.1f)
            {
                pos += new Vector3(-0.05f, -0.06f, -0.03f);
                rot *= Quaternion.Euler(10f, -25f, 15f);
            }

            // Ferrolho
            float bt = (Time.time - boltStart) / 0.65f;
            if (bt >= 0f && bt <= 1f)
            {
                float up = Mathf.Sin(Mathf.Clamp01(bt * 1.0f) * Mathf.PI);
                float back = Mathf.Sin(Mathf.Clamp01((bt - 0.15f) / 0.7f) * Mathf.PI);
                bolt.localRotation = Quaternion.Euler(0, 0, 70f * up);
                bolt.localPosition = new Vector3(0.02f, 0.02f, -0.01f - 0.075f * back);
                rot *= Quaternion.Euler(-3f * up, 0, -12f * up * (1f - adsT * 0.5f));
                pos += new Vector3(0, -0.015f * up, 0);
            }
            else
            {
                bolt.localRotation = Quaternion.identity;
                bolt.localPosition = new Vector3(0.02f, 0.02f, -0.01f);
            }

            // Recarga: abaixa e inclina o fuzil
            if (Reloading)
            {
                float r = ReloadProgress;
                float w = Mathf.Sin(r * Mathf.PI);
                pos += new Vector3(-0.03f, -0.09f, -0.03f) * w;
                rot *= Quaternion.Euler(-18f * w, 10f * w, -32f * w);
                bolt.localRotation = Quaternion.Euler(0, 0, 70f * Mathf.Clamp01(w * 3f));
                bolt.localPosition = new Vector3(0.02f, 0.02f, -0.01f - 0.075f * Mathf.Clamp01(w * 3f));
            }

            // Arremesso de granada
            if (throwT >= 0f)
            {
                throwT += dt / 0.9f;
                float w = Mathf.Sin(Mathf.Clamp01(throwT) * Mathf.PI);
                pos += new Vector3(0.05f, -0.35f, 0) * w;
                rot *= Quaternion.Euler(25f * w, 0, 0);
                if (throwT >= 1f) throwT = -1f;
            }

            // Estocada de baioneta
            if (meleeT >= 0f)
            {
                meleeT += dt / 0.6f;
                float m = meleeT < 0.25f ? meleeT / 0.25f : Mathf.Clamp01(1f - (meleeT - 0.25f) / 0.75f);
                pos += new Vector3(-0.08f, 0.04f, 0.32f) * m;
                rot *= Quaternion.Euler(-4f * m, 6f * m, 0);
                if (meleeT >= 1f) meleeT = -1f;
            }

            kick = Mathf.MoveTowards(kick, 0f, dt * 5f);
            pos += new Vector3(0, 0.01f, -0.06f) * kick;
            rot *= Quaternion.Euler(-7f * kick, 0, 0);

            vm.localPosition = pos;
            vm.localRotation = rot;
        }
    }
}
