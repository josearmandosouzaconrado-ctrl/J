using System.IO;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

namespace WW1.EditorTools
{
    // Prepara o projeto automaticamente ao abrir no Unity e gera o APK pelo menu "WW1".
    [InitializeOnLoad]
    public static class WW1Setup
    {
        const string ScenePath = "Assets/WW1/Scenes/FrenteOcidental.unity";
        const string ResDir = "Assets/WW1/Resources/WW1";

        static WW1Setup()
        {
            EditorApplication.delayCall += () => Prepare(false);
        }

        [MenuItem("WW1/1. Preparar projeto")]
        public static void PrepareMenu()
        {
            Prepare(true);
        }

        static void Prepare(bool verbose)
        {
            if (EditorApplication.isPlayingOrWillChangePlaymode) return;
            EnsureMaterials();
            EnsureScene();
            ConfigurePlayer();
            EnsureLegacyInput();
            if (verbose) EditorUtility.DisplayDialog("Frente Ocidental 1916", "Projeto preparado.\n\nAperte Play para testar no editor ou use WW1 > 2. Gerar APK Android.", "OK");
        }

        // Materiais em Resources garantem que o shader Standard (e a variante com normal map) entre no build.
        static void EnsureMaterials()
        {
            Directory.CreateDirectory(ResDir);
            Shader std = Shader.Find("Standard");
            if (std == null) return;
            if (AssetDatabase.LoadAssetAtPath<Material>(ResDir + "/LitBase.mat") == null)
            {
                var m = new Material(std) { enableInstancing = true };
                AssetDatabase.CreateAsset(m, ResDir + "/LitBase.mat");
            }
            if (AssetDatabase.LoadAssetAtPath<Material>(ResDir + "/LitNormal.mat") == null)
            {
                var m = new Material(std) { enableInstancing = true };
                m.EnableKeyword("_NORMALMAP");
                m.SetTexture("_BumpMap", Texture2D.normalTexture);
                AssetDatabase.CreateAsset(m, ResDir + "/LitNormal.mat");
            }
            AssetDatabase.SaveAssets();
        }

        static void EnsureScene()
        {
            if (!File.Exists(ScenePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(ScenePath));
                var active = EditorSceneManager.GetActiveScene();
                if (active.isDirty) return; // não descarta o trabalho de ninguém
                var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
                EditorSceneManager.SaveScene(scene, ScenePath);
            }
            var scenes = EditorBuildSettings.scenes;
            if (scenes.Length == 0 || scenes[0].path != ScenePath)
                EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(ScenePath, true) };
        }

        static void ConfigurePlayer()
        {
            PlayerSettings.companyName = "WW1 Studio";
            PlayerSettings.productName = "Frente Ocidental 1916";
            PlayerSettings.defaultInterfaceOrientation = UIOrientation.AutoRotation;
            PlayerSettings.allowedAutorotateToPortrait = false;
            PlayerSettings.allowedAutorotateToPortraitUpsideDown = false;
            PlayerSettings.allowedAutorotateToLandscapeLeft = true;
            PlayerSettings.allowedAutorotateToLandscapeRight = true;
            PlayerSettings.colorSpace = ColorSpace.Linear;
            PlayerSettings.Android.minSdkVersion = AndroidSdkVersions.AndroidApiLevel24;
            PlayerSettings.Android.targetArchitectures = AndroidArchitecture.ARM64;
#if UNITY_2021_2_OR_NEWER
            PlayerSettings.SetApplicationIdentifier(UnityEditor.Build.NamedBuildTarget.Android, "com.ww1studio.frenteocidental");
            PlayerSettings.SetScriptingBackend(UnityEditor.Build.NamedBuildTarget.Android, ScriptingImplementation.IL2CPP);
#else
            PlayerSettings.SetApplicationIdentifier(BuildTargetGroup.Android, "com.ww1studio.frenteocidental");
            PlayerSettings.SetScriptingBackend(BuildTargetGroup.Android, ScriptingImplementation.IL2CPP);
#endif
        }

        // O jogo usa o Input clássico (toque + teclado). Se o projeto estiver só no Input System novo, liga "Both".
        static void EnsureLegacyInput()
        {
            var assets = AssetDatabase.LoadAllAssetsAtPath("ProjectSettings/ProjectSettings.asset");
            if (assets == null || assets.Length == 0) return;
            var so = new SerializedObject(assets[0]);
            var prop = so.FindProperty("activeInputHandler");
            if (prop != null && prop.intValue == 1)
            {
                prop.intValue = 2;
                so.ApplyModifiedProperties();
                EditorUtility.DisplayDialog("Frente Ocidental 1916",
                    "O sistema de entrada foi ajustado para \"Both\" (necessário para os controles de toque).\nReinicie o Unity para aplicar.", "OK");
            }
        }

        [MenuItem("WW1/2. Gerar APK Android")]
        public static void BuildAndroid()
        {
            Prepare(false);
            if (EditorUserBuildSettings.activeBuildTarget != BuildTarget.Android)
                EditorUserBuildSettings.SwitchActiveBuildTarget(BuildTargetGroup.Android, BuildTarget.Android);
            Directory.CreateDirectory("Builds");
            var opts = new BuildPlayerOptions
            {
                scenes = new[] { ScenePath },
                locationPathName = "Builds/FrenteOcidental1916.apk",
                target = BuildTarget.Android,
                options = BuildOptions.None
            };
            var report = BuildPipeline.BuildPlayer(opts);
            bool ok = report.summary.result == UnityEditor.Build.Reporting.BuildResult.Succeeded;
            EditorUtility.DisplayDialog("Frente Ocidental 1916",
                ok ? "APK gerado em Builds/FrenteOcidental1916.apk" : "O build falhou. Veja o Console para detalhes.", "OK");
            if (ok) EditorUtility.RevealInFinder("Builds/FrenteOcidental1916.apk");
        }

        // Para builds pela linha de comando:  Unity -batchmode -quit -projectPath . -executeMethod WW1.EditorTools.WW1Setup.BuildAndroidBatch
        public static void BuildAndroidBatch()
        {
            EnsureMaterials();
            if (!File.Exists(ScenePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(ScenePath));
                var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
                EditorSceneManager.SaveScene(scene, ScenePath);
            }
            EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(ScenePath, true) };
            ConfigurePlayer();
            EditorUserBuildSettings.SwitchActiveBuildTarget(BuildTargetGroup.Android, BuildTarget.Android);
            Directory.CreateDirectory("Builds");
            var report = BuildPipeline.BuildPlayer(new[] { ScenePath }, "Builds/FrenteOcidental1916.apk", BuildTarget.Android, BuildOptions.None);
            if (report.summary.result != UnityEditor.Build.Reporting.BuildResult.Succeeded) EditorApplication.Exit(1);
        }
    }
}
