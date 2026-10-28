using System.Collections;
using UnityEngine;

namespace WW1
{
    // Soldado em primeira pessoa: andar, correr, agachar, escalar parapeitos, câmera, saúde e máscara de gás.
    [RequireComponent(typeof(CharacterController))]
    public class PlayerController : MonoBehaviour
    {
        public static PlayerController I;

        public Camera cam;
        public Transform camPivot;
        public Health health;
        public PlayerWeapon weapon;

        // Entradas preenchidas pelos controles de toque / teclado
        public Vector2 moveInput;
        public Vector2 lookDelta;
        public bool sprint, crouch, ads;
        public bool controls;
        public bool maskOn;

        public bool InWire { get; private set; }
        public bool InTrench { get; private set; }
        public bool Mantling { get; private set; }
        public float LastHitTime { get; private set; }
        public Vector3 LastHitFrom { get; private set; }
        public float GasExposure { get; private set; }

        CharacterController cc;
        float yaw, pitch, vy, camH = 1.6f, bobT, shake, recoil, recoilVel, stepDist, coughT, deathT;
        Vector3 lastPos;
        float speedNow;

        public float Exposure
        {
            get
            {
                float f = 1f;
                if (crouch) f *= 0.55f;
                if (speedNow > 4.5f) f *= 0.7f;
                else if (speedNow > 1f) f *= 0.85f;
                if (InTrench) f *= 0.6f;
                return f;
            }
        }

        public static PlayerController Spawn(Transform parent, Vector3 pos, float yaw)
        {
            var go = new GameObject("Jogador");
            go.transform.SetParent(parent, false);
            go.transform.position = pos;
            var cc = go.AddComponent<CharacterController>();
            cc.height = 1.8f;
            cc.radius = 0.32f;
            cc.center = new Vector3(0, 0.9f, 0);
            cc.stepOffset = 0.75f;
            cc.slopeLimit = 50f;
            cc.skinWidth = 0.04f;
            var p = go.AddComponent<PlayerController>();
            p.yaw = yaw;

            p.camPivot = new GameObject("Cabeca").transform;
            p.camPivot.SetParent(go.transform, false);
            p.camPivot.localPosition = new Vector3(0, 1.6f, 0);
            var camGo = new GameObject("CameraJogador");
            camGo.transform.SetParent(p.camPivot, false);
            p.cam = camGo.AddComponent<Camera>();
            p.cam.nearClipPlane = 0.03f;
            p.cam.farClipPlane = 320f;
            p.cam.fieldOfView = 62f;
            p.cam.clearFlags = CameraClearFlags.SolidColor;
            p.cam.backgroundColor = RenderSettings.fogColor;
            camGo.AddComponent<AudioListener>();
            camGo.tag = "MainCamera";

            p.health = go.AddComponent<Health>();
            p.health.team = Team.Allies;
            p.health.isPlayer = true;
            p.health.Damaged += p.OnDamaged;
            p.health.Died += p.OnDied;
            p.weapon = go.AddComponent<PlayerWeapon>();
            p.weapon.Init(p);
            return p;
        }

        void Awake()
        {
            I = this;
            cc = GetComponent<CharacterController>();
        }

        void OnDestroy()
        {
            if (I == this) I = null;
        }

        void OnDamaged(float amt, Vector3 from)
        {
            LastHitTime = Time.time;
            if (amt < 1f) return; // gás: dano contínuo e silencioso
            LastHitFrom = from;
            AddShake(0.25f);
            Sfx.Play2D(Sfx.Hurt, 0.8f, Random.Range(0.9f, 1.1f));
            if (Game.I != null && Game.I.hud != null) Game.I.hud.OnPlayerHit();
        }

        void OnDied()
        {
            controls = false;
            deathT = 0f;
            Sfx.Play2D(Sfx.Hurt, 1f, 0.7f);
            if (Game.I != null) Game.I.PlayerDied();
        }

        public void AddShake(float amount)
        {
            shake = Mathf.Min(1.2f, shake + amount);
        }

        public void AddRecoil(float degrees)
        {
            recoilVel += degrees * 18f;
        }

        public void NearMiss(Vector3 from, Vector3 end)
        {
            Vector3 p = cam.transform.position;
            Vector3 d = end - from;
            float t = Mathf.Clamp01(Vector3.Dot(p - from, d) / d.sqrMagnitude);
            float miss = Vector3.Distance(from + d * t, p);
            if (miss < 3f)
            {
                Sfx.PlayAt(Sfx.Whiz, from + d * t, 0.8f, Random.Range(0.85f, 1.2f), 1.5f);
                AddShake(0.05f);
            }
        }

        public void SetLook(float newYaw, float newPitch)
        {
            yaw = newYaw;
            pitch = newPitch;
        }

        void Update()
        {
            float dt = Time.deltaTime;
            if (dt <= 0f) return;

            if (health.Dead)
            {
                deathT = Mathf.Min(1f, deathT + dt * 1.2f);
                camPivot.localPosition = Vector3.Lerp(camPivot.localPosition, new Vector3(0, 0.25f, 0), dt * 3f);
                camPivot.localRotation = Quaternion.Slerp(camPivot.localRotation, Quaternion.Euler(-20f, 0, 75f), dt * 2f);
                return;
            }

            bool playing = controls && Game.I != null && Game.I.state == GameState.Playing;
            if (!playing) moveInput = Vector2.zero;

            // Olhar
            if (playing && !Mantling)
            {
                float zoom = ads ? 0.55f : 1f;
                yaw += lookDelta.x * zoom;
                pitch = Mathf.Clamp(pitch - lookDelta.y * zoom, -80f, 80f);
            }
            lookDelta = Vector2.zero;

            recoilVel -= recoil * 120f * dt;
            recoilVel *= Mathf.Exp(-14f * dt);
            recoil += recoilVel * dt;
            transform.rotation = Quaternion.Euler(0, yaw, 0);

            // Movimento
            InWire = Battlefield.InWire(transform.position.x, transform.position.z);
            float trenchBase;
            InTrench = Battlefield.InTrench(transform.position, out trenchBase);
            if (!Mantling)
            {
                Vector3 wish = transform.right * moveInput.x + transform.forward * moveInput.y;
                if (wish.sqrMagnitude > 1f) wish.Normalize();
                bool running = sprint && moveInput.y > 0.5f && !crouch && !ads;
                float speed = crouch ? 1.7f : running ? 5.4f : 3.3f;
                if (ads) speed *= 0.6f;
                if (InWire) speed *= 0.4f;
                if (cc.isGrounded) vy = -2f;
                else vy -= 18f * dt;
                Vector3 vel = wish * speed + Vector3.up * vy;
                cc.Move(vel * dt);
                ClampToMap();

                if (playing && cc.isGrounded && wish.sqrMagnitude > 0.2f && (cc.collisionFlags & CollisionFlags.Sides) != 0)
                    TryMantle(wish.normalized);
            }

            Vector3 moved = transform.position - lastPos;
            moved.y = 0f;
            speedNow = moved.magnitude / dt;
            lastPos = transform.position;

            // Agachar (altura da cápsula e da câmera)
            float targetH = crouch ? 1.0f : 1.6f;
            camH = Mathf.MoveTowards(camH, targetH, dt * 4f);
            float ch = crouch ? 1.2f : 1.8f;
            if (!crouch && cc.height < 1.79f)
            {
                // só levanta se houver espaço
                if (Physics.Raycast(transform.position + Vector3.up * 1.1f, Vector3.up, 0.8f, Phys.Mask, QueryTriggerInteraction.Ignore)) ch = cc.height;
            }
            cc.height = ch;
            cc.center = new Vector3(0, ch * 0.5f, 0);
            health.aimHeight = crouch ? 0.9f : 1.35f;

            // Balanço da câmera ao andar e passos na lama
            if (cc.isGrounded && speedNow > 0.5f)
            {
                bobT += dt * (speedNow > 4.5f ? 11f : 7.5f);
                stepDist += speedNow * dt;
                float stride = speedNow > 4.5f ? 1.6f : 1.1f;
                if (stepDist > stride)
                {
                    stepDist = 0f;
                    Sfx.Play2D(Sfx.Step, 0.35f, Random.Range(0.85f, 1.15f));
                }
            }
            float bobAmt = Mathf.Clamp01(speedNow / 5f) * (ads ? 0.2f : 1f);
            Vector3 bob = new Vector3(Mathf.Cos(bobT * 0.5f) * 0.03f, Mathf.Abs(Mathf.Sin(bobT * 0.5f)) * 0.05f, 0) * bobAmt;

            shake = Mathf.MoveTowards(shake, 0f, dt * 1.5f);
            Vector3 sh = new Vector3(Mathf.PerlinNoise(Time.time * 25f, 0f) - 0.5f, Mathf.PerlinNoise(0f, Time.time * 25f) - 0.5f, 0f) * shake * 0.35f;
            camPivot.localPosition = new Vector3(0, camH, 0) + bob + sh * 0.3f;
            camPivot.localRotation = Quaternion.Euler(pitch - recoil + sh.y * 6f, sh.x * 6f, sh.x * 4f);

            float fov = ads ? 36f : 62f;
            cam.fieldOfView = Mathf.Lerp(cam.fieldOfView, fov, dt * 10f);

            // Recupera a vida depois de alguns segundos sem levar tiro
            if (Time.time - LastHitTime > 4.5f) health.Heal(9f * dt);

            UpdateGas(dt);
            CheckCrates();
        }

        void UpdateGas(float dt)
        {
            bool gas = Game.I != null && Game.I.gasActive;
            GasExposure = Mathf.MoveTowards(GasExposure, gas && !maskOn ? 1f : 0f, dt * (gas ? 0.6f : 0.3f));
            if (gas && !maskOn && Game.I.state == GameState.Playing)
            {
                health.Damage(6f * dt, transform.position + Vector3.forward);
                LastHitTime = Time.time;
                coughT -= dt;
                if (coughT <= 0f)
                {
                    coughT = Random.Range(1.2f, 2.2f);
                    Sfx.Play2D(Sfx.Cough, 0.9f, Random.Range(0.9f, 1.1f));
                }
            }
            Sfx.SetBreath(maskOn && Game.I != null && Game.I.state == GameState.Playing);
        }

        void CheckCrates()
        {
            if (weapon == null) return;
            for (int i = 0; i < Battlefield.ammoCrates.Count; i++)
            {
                if ((Battlefield.ammoCrates[i] - transform.position).sqrMagnitude < 2.2f * 2.2f)
                {
                    if (weapon.Resupply() && Game.I != null && Game.I.hud != null)
                        Game.I.hud.Message("Munição e granadas reabastecidas", 2f);
                }
            }
        }

        void ClampToMap()
        {
            Vector3 p = transform.position;
            float x = Mathf.Clamp(p.x, Battlefield.MinX + 7f, Battlefield.MaxX - 7f);
            float z = Mathf.Clamp(p.z, Battlefield.MinZ + 7f, Battlefield.MaxZ - 9f);
            if (!Mathf.Approximately(x, p.x) || !Mathf.Approximately(z, p.z))
            {
                cc.enabled = false;
                transform.position = new Vector3(x, p.y, z);
                cc.enabled = true;
            }
            if (p.y < -12f)
            {
                cc.enabled = false;
                transform.position = Battlefield.Ground(p.x, p.z) + Vector3.up * 0.5f;
                cc.enabled = true;
            }
        }

        // Escalar o parapeito / a borda da cratera quando empurra contra uma parede.
        void TryMantle(Vector3 dir)
        {
            Vector3 probe = transform.position + dir * 0.8f + Vector3.up * 2.6f;
            RaycastHit hit;
            if (!Physics.Raycast(probe, Vector3.down, out hit, 3.3f, Phys.Mask, QueryTriggerInteraction.Ignore)) return;
            float rise = hit.point.y - transform.position.y;
            if (rise < 0.45f || rise > 2.4f || hit.normal.y < 0.55f) return;
            Vector3 top = hit.point + Vector3.up * 0.05f;
            if (Physics.CheckCapsule(top + Vector3.up * 0.75f, top + Vector3.up * 1.5f, 0.25f, Phys.Mask, QueryTriggerInteraction.Ignore)) return;
            StartCoroutine(Mantle(top));
        }

        IEnumerator Mantle(Vector3 top)
        {
            Mantling = true;
            cc.enabled = false;
            Vector3 start = transform.position;
            Vector3 up = new Vector3(start.x, top.y, start.z);
            Sfx.Play2D(Sfx.Step, 0.6f, 0.7f);
            float t = 0f;
            while (t < 1f)
            {
                t += Time.deltaTime / 0.45f;
                transform.position = Vector3.Lerp(start, up, Mathf.SmoothStep(0, 1, t));
                yield return null;
            }
            t = 0f;
            while (t < 1f)
            {
                t += Time.deltaTime / 0.22f;
                transform.position = Vector3.Lerp(up, top, t);
                yield return null;
            }
            cc.enabled = true;
            lastPos = transform.position;
            Mantling = false;
        }
    }
}
