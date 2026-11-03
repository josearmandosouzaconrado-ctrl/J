using System.Collections;
using UnityEngine;

namespace WW1
{
    public enum GameState { Menu, Briefing, Playing, Paused, Dead, Victory }

    // Ponto de entrada: monta o mundo inteiro por código ao iniciar qualquer cena.
    public class Game : MonoBehaviour
    {
        public static Game I;
        static bool skipMenuOnce;

        public GameState state = GameState.Menu;
        public Transform world;
        public PlayerController player;
        public Mission mission;
        public Hud hud;
        public Camera menuCam;
        public Light sun;
        public bool gasActive;
        public float playTime, fade = 1f;
        public int kills, shots, hits;
        float menuT;
        int pauseFrame;

        public static int Difficulty
        {
            get { return Mathf.Clamp(PlayerPrefs.GetInt("ww1_diff", 1), 0, 2); }
            set { PlayerPrefs.SetInt("ww1_diff", value); PlayerPrefs.Save(); }
        }

        public static bool LowQuality
        {
            get { return PlayerPrefs.GetInt("ww1_low", 0) == 1; }
            set { PlayerPrefs.SetInt("ww1_low", value ? 1 : 0); PlayerPrefs.Save(); }
        }

        public static float Sensitivity
        {
            get { return PlayerPrefs.GetFloat("ww1_sens", 1f); }
            set { PlayerPrefs.SetFloat("ww1_sens", value); PlayerPrefs.Save(); }
        }

        public static float EnemyAccuracy
        {
            get { int d = Difficulty; return d == 0 ? 0.55f : d == 1 ? 0.85f : 1.2f; }
        }

        public static float ShellMinDist
        {
            get { int d = Difficulty; return d == 0 ? 14f : d == 1 ? 10f : 7f; }
        }

        public Camera ActiveCamera
        {
            get { return state == GameState.Menu || state == GameState.Briefing || player == null ? menuCam : player.cam; }
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Boot()
        {
            if (FindObjectOfType<Game>() == null) new GameObject("WW1_Jogo").AddComponent<Game>();
        }

        public static void Restart(bool skipMenu)
        {
            skipMenuOnce = skipMenu;
            Time.timeScale = 1f;
            AudioListener.pause = false;
            if (I != null) Destroy(I.gameObject);
            I = null;
            new GameObject("WW1_Reinicio").AddComponent<Restarter>();
        }

        class Restarter : MonoBehaviour
        {
            IEnumerator Start()
            {
                yield return null;
                new GameObject("WW1_Jogo").AddComponent<Game>();
                Destroy(gameObject);
            }
        }

        public static string FormatTime(float s)
        {
            int t = Mathf.Max(0, Mathf.CeilToInt(s));
            return (t / 60) + ":" + (t % 60).ToString("00");
        }

        void Awake()
        {
            I = this;
            Time.timeScale = 1f;
            Application.targetFrameRate = 60;
            Screen.sleepTimeout = SleepTimeout.NeverSleep;
            Screen.autorotateToPortrait = false;
            Screen.autorotateToPortraitUpsideDown = false;
            Screen.autorotateToLandscapeLeft = true;
            Screen.autorotateToLandscapeRight = true;
            Screen.orientation = ScreenOrientation.AutoRotation;

            CleanScene();
            Mats.Init();
            Sfx.Init();
            SetupAtmosphere();
            ApplyQuality();

            world = new GameObject("Mundo").transform;
            world.SetParent(transform, false);
            Sfx.InitScene(transform);
            FX.Init(transform);
            Battlefield.Build(world);
            gameObject.AddComponent<Artillery>();

            float px = 0f;
            Vector3 spawn = new Vector3(px, Battlefield.Floor + 0.05f, Battlefield.TrenchZ(px, Battlefield.PlayerTrenchZ) - 0.2f);
            player = PlayerController.Spawn(transform, spawn, 0f);

            var mc = new GameObject("CameraMenu");
            mc.transform.SetParent(transform, false);
            menuCam = mc.AddComponent<Camera>();
            menuCam.fieldOfView = 55f;
            menuCam.farClipPlane = 320f;
            menuCam.nearClipPlane = 0.1f;
            menuCam.clearFlags = CameraClearFlags.SolidColor;
            menuCam.backgroundColor = RenderSettings.fogColor;
            mc.AddComponent<AudioListener>();

            mission = gameObject.AddComponent<Mission>();
            mission.SetupWorld(world);
            hud = gameObject.AddComponent<Hud>();
            gameObject.AddComponent<TouchControls>();

            if (skipMenuOnce)
            {
                skipMenuOnce = false;
                SetCameras(false);
                BeginMission();
            }
            else EnterMenu();
        }

        void OnDestroy()
        {
            if (I == this) I = null;
        }

        void CleanScene()
        {
            // Remove câmera/luz padrão da cena (o jogo cria as suas).
            foreach (var c in FindObjectsOfType<Camera>()) if (c.transform.root != transform) Destroy(c.gameObject);
            foreach (var l in FindObjectsOfType<Light>()) if (l.transform.root != transform) Destroy(l.gameObject);
            foreach (var a in FindObjectsOfType<AudioListener>()) if (a.transform.root != transform) Destroy(a);
        }

        void SetupAtmosphere()
        {
            // Céu encoberto, garoa e névoa sobre a terra revirada.
            Color fog = new Color(0.47f, 0.48f, 0.47f);
            RenderSettings.fog = true;
            RenderSettings.fogMode = FogMode.ExponentialSquared;
            RenderSettings.fogColor = fog;
            RenderSettings.fogDensity = 0.0115f;
            RenderSettings.skybox = null;
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Trilight;
            RenderSettings.ambientSkyColor = new Color(0.5f, 0.52f, 0.54f);
            RenderSettings.ambientEquatorColor = new Color(0.4f, 0.39f, 0.36f);
            RenderSettings.ambientGroundColor = new Color(0.2f, 0.18f, 0.15f);

            var cube = new Cubemap(16, TextureFormat.RGBA32, false);
            for (int f = 0; f < 6; f++)
            {
                var face = (CubemapFace)f;
                Color c = face == CubemapFace.PositiveY ? new Color(0.62f, 0.63f, 0.64f) : face == CubemapFace.NegativeY ? new Color(0.18f, 0.16f, 0.13f) : fog;
                var px = new Color[16 * 16];
                for (int i = 0; i < px.Length; i++) px[i] = c;
                cube.SetPixels(px, face);
            }
            cube.Apply();
            RenderSettings.defaultReflectionMode = UnityEngine.Rendering.DefaultReflectionMode.Custom;
#if UNITY_2022_1_OR_NEWER
            RenderSettings.customReflectionTexture = cube;
#else
            RenderSettings.customReflection = cube;
#endif
            RenderSettings.reflectionIntensity = 0.8f;

            var sg = new GameObject("SolEncoberto");
            sg.transform.SetParent(transform, false);
            sg.transform.rotation = Quaternion.Euler(36f, 35f, 0f);
            sun = sg.AddComponent<Light>();
            sun.type = LightType.Directional;
            sun.color = new Color(0.86f, 0.84f, 0.78f);
            sun.intensity = 0.95f;
            sun.shadowStrength = 0.65f;
            sun.shadowBias = 0.06f;
            sun.shadowNormalBias = 0.5f;
            RenderSettings.sun = sun;
        }

        public void ApplyQuality()
        {
            bool low = LowQuality;
            if (sun != null) sun.shadows = low ? LightShadows.None : LightShadows.Soft;
            QualitySettings.shadows = low ? ShadowQuality.Disable : ShadowQuality.All;
            QualitySettings.shadowResolution = ShadowResolution.Medium;
            QualitySettings.shadowDistance = 45f;
            QualitySettings.shadowCascades = 2;
            QualitySettings.antiAliasing = low ? 0 : 2;
            QualitySettings.pixelLightCount = low ? 0 : 2;
            QualitySettings.lodBias = low ? 0.7f : 1.2f;
            QualitySettings.anisotropicFiltering = low ? AnisotropicFiltering.Disable : AnisotropicFiltering.Enable;
            QualitySettings.vSyncCount = 0;
            RenderSettings.fogDensity = low ? 0.014f : 0.0115f;
        }

        void SetCameras(bool menu)
        {
            menuCam.enabled = menu;
            menuCam.GetComponent<AudioListener>().enabled = menu;
            player.cam.enabled = !menu;
            player.cam.GetComponent<AudioListener>().enabled = !menu;
        }

        void EnterMenu()
        {
            state = GameState.Menu;
            SetCameras(true);
            player.controls = false;
            Cursor.lockState = CursorLockMode.None;
            Cursor.visible = true;
            Sfx.SetAmbience(0.3f, 0.35f);
        }

        public void StartBriefing()
        {
            state = GameState.Briefing;
        }

        public void BeginMission()
        {
            state = GameState.Playing;
            SetCameras(false);
            player.controls = true;
            player.SetLook(0f, -4f);
            fade = 1f;
            Sfx.SetAmbience(0.4f, 0.3f);
            mission.Begin();
        }

        public void Pause()
        {
            if (state != GameState.Playing) return;
            state = GameState.Paused;
            pauseFrame = Time.frameCount;
            Time.timeScale = 0f;
            AudioListener.pause = true;
            Cursor.lockState = CursorLockMode.None;
            Cursor.visible = true;
        }

        public void Resume()
        {
            if (state != GameState.Paused) return;
            state = GameState.Playing;
            Time.timeScale = 1f;
            AudioListener.pause = false;
        }

        public void PlayerDied()
        {
            StartCoroutine(DeathRoutine());
        }

        IEnumerator DeathRoutine()
        {
            gasActive = false;
            yield return new WaitForSeconds(2.2f);
            state = GameState.Dead;
            Cursor.lockState = CursorLockMode.None;
            Cursor.visible = true;
        }

        public void Victory()
        {
            if (state != GameState.Playing || player.health.Dead) return;
            StartCoroutine(VictoryRoutine());
        }

        IEnumerator VictoryRoutine()
        {
            player.controls = false;
            player.maskOn = false;
            for (float t = 0; t < 1f; t += Time.deltaTime / 2f)
            {
                fade = t;
                yield return null;
            }
            state = GameState.Victory;
            hud.ResetVictoryPages();
            Cursor.lockState = CursorLockMode.None;
            Cursor.visible = true;
            Sfx.SetAmbience(0.15f, 0.2f);
            for (float t = 1; t > 0f; t -= Time.deltaTime / 1.5f)
            {
                fade = t;
                yield return null;
            }
            fade = 0f;
        }

        void Update()
        {
            float dt = Time.deltaTime;
            if (state == GameState.Playing)
            {
                playTime += dt;
                if (fade > 0f) fade = Mathf.MoveTowards(fade, 0f, dt * 0.8f);
            }
            else if (state == GameState.Menu || state == GameState.Briefing)
            {
                fade = Mathf.MoveTowards(fade, 0f, Time.unscaledDeltaTime * 0.6f);
                // Câmera do menu: travelling lento pelo parapeito olhando a terra de ninguém.
                menuT += dt;
                float x = -14f + Mathf.Sin(menuT * 0.05f) * 10f;
                float z = Battlefield.TrenchZ(x, Battlefield.PlayerTrenchZ) + 2.6f;
                Vector3 pos = new Vector3(x, Battlefield.Height(x, z) + 1.2f, z);
                menuCam.transform.position = pos;
                menuCam.transform.rotation = Quaternion.Euler(4f + Mathf.Sin(menuT * 0.13f) * 1.5f, 12f + Mathf.Sin(menuT * 0.07f) * 14f, 0f);
            }

            if (state == GameState.Paused && Time.frameCount != pauseFrame && Input.GetKeyDown(KeyCode.Escape)) Resume();
        }
    }
}
