using System.Collections.Generic;
using UnityEngine;

namespace WW1
{
    public enum Btn { None, Fire, Aim, Reload, Grenade, Melee, Crouch, Mask, Pause }

    // Controles de celular: joystick flutuante à esquerda, arrastar à direita para mirar e botões.
    // No PC: WASD, mouse, clique esquerdo atira, direito mira, R recarrega, G granada, F baioneta, C agacha, M máscara, Esc pausa.
    public class TouchControls : MonoBehaviour
    {
        public static TouchControls I;

        public struct Circle { public Vector2 c; public float r; }

        public readonly Dictionary<Btn, Circle> buttons = new Dictionary<Btn, Circle>();
        public readonly HashSet<Btn> held = new HashSet<Btn>();
        public bool joyActive;
        public Vector2 joyOrigin, joyPos, joyHome;
        public float joyRadius, u;
        public bool showTouch;

        int joyFinger = -1, lookFinger = -1;
        readonly Dictionary<int, Btn> fingerBtn = new Dictionary<int, Btn>();

        void Awake()
        {
            I = this;
            showTouch = Application.isMobilePlatform || Input.touchSupported;
        }

        void OnDestroy() { if (I == this) I = null; }

        public bool MaskVisible
        {
            get { var g = Game.I; return g != null && (g.gasActive || (g.player != null && g.player.maskOn)); }
        }

        void Layout()
        {
            float W = Screen.width, H = Screen.height;
            u = Mathf.Min(H / 1080f, W / 1920f * 1.15f);
            buttons.Clear();
            buttons[Btn.Fire] = new Circle { c = new Vector2(W - 250f * u, H - 300f * u), r = 125f * u };
            buttons[Btn.Aim] = new Circle { c = new Vector2(W - 500f * u, H - 175f * u), r = 85f * u };
            buttons[Btn.Grenade] = new Circle { c = new Vector2(W - 480f * u, H - 420f * u), r = 72f * u };
            buttons[Btn.Melee] = new Circle { c = new Vector2(W - 225f * u, H - 560f * u), r = 72f * u };
            buttons[Btn.Reload] = new Circle { c = new Vector2(W - 700f * u, H - 120f * u), r = 68f * u };
            buttons[Btn.Crouch] = new Circle { c = new Vector2(W - 95f * u, H - 100f * u), r = 62f * u };
            if (MaskVisible) buttons[Btn.Mask] = new Circle { c = new Vector2(W - 680f * u, H - 330f * u), r = 78f * u };
            buttons[Btn.Pause] = new Circle { c = new Vector2(W - 70f * u, 70f * u), r = 48f * u };
            joyRadius = 150f * u;
            joyHome = new Vector2(270f * u, H - 280f * u);
        }

        Btn HitButton(Vector2 g)
        {
            foreach (var kv in buttons)
                if ((g - kv.Value.c).magnitude <= kv.Value.r * 1.12f) return kv.Key;
            return Btn.None;
        }

        void Press(Btn b)
        {
            var p = Game.I.player;
            switch (b)
            {
                case Btn.Fire: p.weapon.TryFire(); break;
                case Btn.Aim: p.ads = !p.ads; break;
                case Btn.Reload: p.weapon.TryReload(); break;
                case Btn.Grenade: p.weapon.TryGrenade(); break;
                case Btn.Melee: p.weapon.TryMelee(); break;
                case Btn.Crouch: p.crouch = !p.crouch; break;
                case Btn.Mask: ToggleMask(); break;
                case Btn.Pause: Game.I.Pause(); break;
            }
        }

        void ToggleMask()
        {
            var p = Game.I.player;
            p.maskOn = !p.maskOn;
            Sfx.Play2D(Sfx.Swish, 0.6f, 0.7f);
            if (p.maskOn) p.ads = false;
        }

        void ResetTouches()
        {
            joyFinger = lookFinger = -1;
            joyActive = false;
            fingerBtn.Clear();
            held.Clear();
        }

        void Update()
        {
            Layout();
            var game = Game.I;
            if (game == null || game.player == null) return;
            var p = game.player;
            if (game.state != GameState.Playing || !p.controls)
            {
                ResetTouches();
                return;
            }

            Vector2 look = Vector2.zero;
            Vector2 move = Vector2.zero;
            float touchScale = 0.11f * Game.Sensitivity * (1080f / Mathf.Max(1f, Screen.height));

            for (int i = 0; i < Input.touchCount; i++)
            {
                Touch t = Input.GetTouch(i);
                Vector2 g = new Vector2(t.position.x, Screen.height - t.position.y);
                int id = t.fingerId;
                switch (t.phase)
                {
                    case TouchPhase.Began:
                        {
                            Btn b = HitButton(g);
                            if (b != Btn.None)
                            {
                                fingerBtn[id] = b;
                                held.Add(b);
                                Press(b);
                            }
                            else if (g.x < Screen.width * 0.42f && joyFinger < 0)
                            {
                                joyFinger = id;
                                joyOrigin = g;
                                joyPos = g;
                                joyActive = true;
                            }
                            else if (lookFinger < 0) lookFinger = id;
                            break;
                        }
                    case TouchPhase.Moved:
                    case TouchPhase.Stationary:
                        {
                            Btn b;
                            if (id == joyFinger) joyPos = g;
                            else if (id == lookFinger) look += t.deltaPosition * touchScale;
                            else if (fingerBtn.TryGetValue(id, out b) && b == Btn.Fire) look += t.deltaPosition * touchScale; // arrastar o dedo no botão de tiro também mira
                            break;
                        }
                    case TouchPhase.Ended:
                    case TouchPhase.Canceled:
                        {
                            Btn b;
                            if (id == joyFinger) { joyFinger = -1; joyActive = false; }
                            if (id == lookFinger) lookFinger = -1;
                            if (fingerBtn.TryGetValue(id, out b)) { held.Remove(b); fingerBtn.Remove(id); }
                            break;
                        }
                }
            }

            if (joyActive)
            {
                Vector2 d = (joyPos - joyOrigin) / joyRadius;
                if (d.magnitude > 1f)
                {
                    // O joystick acompanha o dedo quando passa do limite.
                    joyOrigin = joyPos - d.normalized * joyRadius;
                    d = d.normalized;
                }
                move = new Vector2(d.x, -d.y);
            }
            bool sprint = joyActive && move.y > 0.92f;

            // Teclado e mouse (PC / editor)
            if (!Application.isMobilePlatform)
            {
                Vector2 k = Vector2.zero;
                if (Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.UpArrow)) k.y += 1f;
                if (Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.DownArrow)) k.y -= 1f;
                if (Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow)) k.x += 1f;
                if (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow)) k.x -= 1f;
                if (k != Vector2.zero) move = k;
                if (Input.GetKey(KeyCode.LeftShift)) sprint = true;
                if (Input.GetKeyDown(KeyCode.C) || Input.GetKeyDown(KeyCode.LeftControl)) p.crouch = !p.crouch;
                if (Input.GetKeyDown(KeyCode.R)) p.weapon.TryReload();
                if (Input.GetKeyDown(KeyCode.G)) p.weapon.TryGrenade();
                if (Input.GetKeyDown(KeyCode.F) || Input.GetKeyDown(KeyCode.V)) p.weapon.TryMelee();
                if (Input.GetKeyDown(KeyCode.M) && MaskVisible) ToggleMask();
                if (Input.GetKeyDown(KeyCode.Escape) || Input.GetKeyDown(KeyCode.P)) game.Pause();

                if (Input.touchCount == 0)
                {
                    if (Cursor.lockState == CursorLockMode.Locked)
                    {
                        look += new Vector2(Input.GetAxisRaw("Mouse X"), Input.GetAxisRaw("Mouse Y")) * 2.2f * Game.Sensitivity;
                        if (Input.GetMouseButtonDown(0)) p.weapon.TryFire();
                        p.ads = Input.GetMouseButton(1) || held.Contains(Btn.Aim) && p.ads;
                    }
                    else if (Input.GetMouseButtonDown(0) && HitButton(new Vector2(Input.mousePosition.x, Screen.height - Input.mousePosition.y)) == Btn.None)
                    {
                        Cursor.lockState = CursorLockMode.Locked;
                        Cursor.visible = false;
                    }
                }
            }

            p.moveInput = Vector2.ClampMagnitude(move, 1f);
            p.lookDelta += look;
            p.sprint = sprint;
            if (sprint && p.crouch && move.y > 0.5f) p.crouch = false;
        }
    }
}
