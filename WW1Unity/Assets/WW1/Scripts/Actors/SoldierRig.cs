using UnityEngine;

namespace WW1
{
    // Modelo de soldado montado por peças, com animação procedural (andar, ajoelhar, morrer).
    public class SoldierRig : MonoBehaviour
    {
        public Transform hips, thighL, thighR, shinL, shinR, upper, armL, armR, head, rifle, muzzle;
        public float kneelTarget;
        float kneel, phase;
        float hipsBaseY = 0.95f;

        public static SoldierRig Build(Team team, Transform parent, string name)
        {
            bool brit = team == Team.Allies;
            Color tunic = brit ? new Color(0.46f, 0.41f, 0.27f) : new Color(0.43f, 0.45f, 0.40f);
            Color trousers = brit ? new Color(0.44f, 0.39f, 0.26f) : new Color(0.37f, 0.38f, 0.35f);
            Color legwear = brit ? new Color(0.36f, 0.31f, 0.21f) : new Color(0.12f, 0.10f, 0.08f); // perneiras / botas altas
            Color helmetC = brit ? new Color(0.35f, 0.36f, 0.26f) : new Color(0.32f, 0.35f, 0.32f);
            Color webbing = brit ? new Color(0.58f, 0.53f, 0.38f) : new Color(0.24f, 0.17f, 0.11f);
            Color skin = new Color(0.78f, 0.60f, 0.49f);

            Material mTunic = Mats.Cloth01(tunic), mTrousers = Mats.Cloth01(trousers), mLeg = Mats.Cloth01(legwear);
            Material mHelmet = Mats.Lit(helmetC, 0.25f, Mats.Metal, null, 1f, 0.2f);
            Material mWeb = Mats.Cloth01(webbing), mSkin = Mats.Lit(skin, 0.2f);
            Material mBoot = Mats.Lit(new Color(0.16f, 0.11f, 0.08f), 0.3f);
            Material mWood = Mats.WoodMat, mSteel = Mats.MetalMat;

            var go = new GameObject(name);
            go.transform.SetParent(parent, false);
            var rig = go.AddComponent<SoldierRig>();
            Transform root = go.transform;

            rig.hips = Pivot("Quadril", root, new Vector3(0, 0.95f, 0));
            rig.thighL = Pivot("CoxaE", rig.hips, new Vector3(-0.11f, 0, 0));
            rig.thighR = Pivot("CoxaD", rig.hips, new Vector3(0.11f, 0, 0));
            foreach (var th in new[] { rig.thighL, rig.thighR })
            {
                MeshKit.Part("Coxa", MeshKit.Capsule, mTrousers, th, new Vector3(0, -0.23f, 0), new Vector3(0.17f, 0.25f, 0.17f), Quaternion.identity, true);
                var shin = Pivot("Joelho", th, new Vector3(0, -0.46f, 0));
                MeshKit.Part("Canela", MeshKit.Capsule, mLeg, shin, new Vector3(0, -0.22f, 0), new Vector3(0.14f, 0.23f, 0.14f), Quaternion.identity, true);
                MeshKit.Part("Bota", MeshKit.Cube, mBoot, shin, new Vector3(0, -0.45f, 0.05f), new Vector3(0.12f, 0.08f, 0.27f), Quaternion.identity, false);
                if (th == rig.thighL) rig.shinL = shin; else rig.shinR = shin;
            }

            rig.upper = Pivot("Tronco", rig.hips, new Vector3(0, 0.03f, 0));
            MeshKit.Part("Torso", MeshKit.Cube, mTunic, rig.upper, new Vector3(0, 0.3f, 0), new Vector3(0.42f, 0.6f, 0.25f), Quaternion.identity, true);
            MeshKit.Part("Aba", MeshKit.Cube, mTunic, rig.upper, new Vector3(0, -0.02f, 0), new Vector3(0.44f, 0.14f, 0.27f), Quaternion.identity, false);
            MeshKit.Part("Cinto", MeshKit.Cube, mWeb, rig.upper, new Vector3(0, 0.07f, 0), new Vector3(0.45f, 0.06f, 0.28f), Quaternion.identity, false);
            MeshKit.Part("Correia", MeshKit.Cube, mWeb, rig.upper, new Vector3(0, 0.33f, 0.01f), new Vector3(0.05f, 0.62f, 0.27f), Quaternion.Euler(0, 0, 28f), false);
            MeshKit.Part("Cartucheira", MeshKit.Cube, mWeb, rig.upper, new Vector3(0.12f, 0.13f, 0.14f), new Vector3(0.14f, 0.1f, 0.06f), Quaternion.identity, false);
            MeshKit.Part("Cartucheira", MeshKit.Cube, mWeb, rig.upper, new Vector3(-0.12f, 0.13f, 0.14f), new Vector3(0.14f, 0.1f, 0.06f), Quaternion.identity, false);
            MeshKit.Part("Mochila", MeshKit.Cube, mWeb, rig.upper, new Vector3(0, 0.36f, -0.18f), new Vector3(0.32f, 0.34f, 0.13f), Quaternion.identity, false);
            MeshKit.Part("Cantil", MeshKit.Capsule, mWeb, rig.upper, new Vector3(-0.24f, 0.08f, -0.05f), new Vector3(0.1f, 0.08f, 0.1f), Quaternion.identity, false);
            MeshKit.Part("Pescoco", MeshKit.Cylinder, mSkin, rig.upper, new Vector3(0, 0.63f, 0), new Vector3(0.1f, 0.05f, 0.1f), Quaternion.identity, false);

            rig.head = Pivot("Cabeca", rig.upper, new Vector3(0, 0.76f, 0));
            MeshKit.Part("Head", MeshKit.Sphere, mSkin, rig.head, Vector3.zero, new Vector3(0.2f, 0.23f, 0.21f), Quaternion.identity, true);
            if (brit)
            {
                // Capacete Brodie (bacia de aba larga)
                MeshKit.Part("Capacete", MeshKit.LowSphere, mHelmet, rig.head, new Vector3(0, 0.07f, 0), new Vector3(0.27f, 0.13f, 0.29f), Quaternion.identity, false);
                MeshKit.Part("Aba", MeshKit.Cylinder, mHelmet, rig.head, new Vector3(0, 0.065f, 0), new Vector3(0.38f, 0.006f, 0.40f), Quaternion.identity, false);
            }
            else
            {
                // Stahlhelm M1916 (formato de "balde de carvão")
                MeshKit.Part("Capacete", MeshKit.LowSphere, mHelmet, rig.head, new Vector3(0, 0.05f, -0.005f), new Vector3(0.25f, 0.2f, 0.27f), Quaternion.identity, false);
                MeshKit.Part("Saia", MeshKit.Cylinder, mHelmet, rig.head, new Vector3(0, -0.005f, -0.012f), new Vector3(0.28f, 0.045f, 0.3f), Quaternion.identity, false);
                MeshKit.Part("Viseira", MeshKit.Cube, mHelmet, rig.head, new Vector3(0, 0.03f, 0.125f), new Vector3(0.2f, 0.02f, 0.05f), Quaternion.Euler(-20f, 0, 0), false);
            }

            rig.armR = Pivot("BracoD", rig.upper, new Vector3(0.25f, 0.53f, 0));
            rig.armL = Pivot("BracoE", rig.upper, new Vector3(-0.25f, 0.53f, 0));
            foreach (var arm in new[] { rig.armL, rig.armR })
            {
                MeshKit.Part("Braco", MeshKit.Capsule, mTunic, arm, new Vector3(0, -0.28f, 0), new Vector3(0.12f, 0.3f, 0.12f), Quaternion.identity, false);
                MeshKit.Part("Mao", MeshKit.Sphere, mSkin, arm, new Vector3(0, -0.58f, 0), new Vector3(0.08f, 0.09f, 0.08f), Quaternion.identity, false);
            }
            rig.armR.localRotation = Quaternion.Euler(-62f, 0, 0);
            rig.armL.localRotation = Quaternion.Euler(-78f, 28f, 0);

            rig.rifle = Pivot("Fuzil", rig.upper, new Vector3(0.06f, 0.36f, 0.22f));
            MeshKit.Part("Coronha", MeshKit.Cube, mWood, rig.rifle, new Vector3(0, -0.03f, -0.15f), new Vector3(0.045f, 0.1f, 0.38f), Quaternion.identity, false);
            MeshKit.Part("Guarda", MeshKit.Cube, mWood, rig.rifle, new Vector3(0, 0, 0.32f), new Vector3(0.045f, 0.05f, 0.6f), Quaternion.identity, false);
            MeshKit.Part("Cano", MeshKit.Cylinder, mSteel, rig.rifle, new Vector3(0, 0.01f, 0.68f), new Vector3(0.02f, 0.08f, 0.02f), Quaternion.Euler(90f, 0, 0), false);
            MeshKit.Part("Baioneta", MeshKit.Cube, mSteel, rig.rifle, new Vector3(0, -0.01f, 0.92f), new Vector3(0.008f, 0.025f, 0.38f), Quaternion.identity, false);
            rig.muzzle = Pivot("Boca", rig.rifle, new Vector3(0, 0.01f, 0.77f));

            var rb = go.AddComponent<Rigidbody>();
            rb.isKinematic = true;
            return rig;
        }

        static Transform Pivot(string name, Transform parent, Vector3 pos)
        {
            var t = new GameObject(name).transform;
            t.SetParent(parent, false);
            t.localPosition = pos;
            return t;
        }

        public void Animate(float speed, float dt, float aimPitch)
        {
            kneel = Mathf.MoveTowards(kneel, kneelTarget, dt * 3.5f);
            float moveAmt = Mathf.Clamp01(speed / 3.5f);
            phase += dt * (3f + speed * 1.9f) * (moveAmt > 0.01f ? 1f : 0f);
            float s = Mathf.Sin(phase);
            float swing = s * 34f * moveAmt;
            float kneeL = Mathf.Max(0f, -s) * 55f * moveAmt + 8f * moveAmt;
            float kneeR = Mathf.Max(0f, s) * 55f * moveAmt + 8f * moveAmt;

            // Pose de joelhos: perna esquerda à frente, direita apoiada no chão.
            thighL.localRotation = Quaternion.Euler(Mathf.Lerp(swing, -88f, kneel), 0, 0);
            shinL.localRotation = Quaternion.Euler(Mathf.Lerp(kneeL, 88f, kneel), 0, 0);
            thighR.localRotation = Quaternion.Euler(Mathf.Lerp(-swing, 5f, kneel), 0, 0);
            shinR.localRotation = Quaternion.Euler(Mathf.Lerp(kneeR, 85f, kneel), 0, 0);

            float bob = Mathf.Abs(Mathf.Cos(phase)) * 0.05f * moveAmt;
            hips.localPosition = new Vector3(0, hipsBaseY - kneel * 0.45f + bob, 0);
            float lean = 12f * moveAmt;
            upper.localRotation = Quaternion.Euler(lean + Mathf.Clamp(aimPitch, -30f, 30f) * 0.6f, 0, 0);
            head.localRotation = Quaternion.Euler(Mathf.Clamp(aimPitch, -30f, 30f) * 0.4f - lean * 0.5f, 0, 0);
        }
    }
}
