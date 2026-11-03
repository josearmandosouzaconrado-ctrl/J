using UnityEngine;

namespace WW1
{
    // Granada Mills nº 5: espoleta de ~3,5 segundos.
    public class Grenade : MonoBehaviour
    {
        float fuse = 3.4f;

        public static void Throw(Vector3 pos, Vector3 vel, Transform parent)
        {
            var go = new GameObject("GranadaMills");
            go.transform.SetParent(parent, false);
            go.transform.position = pos;
            go.layer = Phys.IgnoreLayer;
            var mat = Mats.Lit(new Color(0.3f, 0.33f, 0.24f), 0.3f, Mats.Metal, null, 1f, 0.3f);
            var body = MeshKit.Part("Corpo", MeshKit.LowSphere, mat, go.transform, Vector3.zero, new Vector3(0.062f, 0.09f, 0.062f), Quaternion.identity, false);
            body.layer = Phys.IgnoreLayer;
            var lever = MeshKit.Part("Alavanca", MeshKit.Cube, mat, go.transform, new Vector3(0.03f, 0.01f, 0), new Vector3(0.01f, 0.08f, 0.02f), Quaternion.identity, false);
            lever.layer = Phys.IgnoreLayer;
            var col = go.AddComponent<SphereCollider>();
            col.radius = 0.05f;
#if UNITY_6000_0_OR_NEWER
            var pm = new PhysicsMaterial("Lama");
#else
            var pm = new PhysicMaterial("Lama");
#endif
            pm.bounciness = 0.15f;
            pm.dynamicFriction = 0.9f;
            pm.staticFriction = 0.9f;
            col.sharedMaterial = pm;
            var rb = go.AddComponent<Rigidbody>();
            rb.mass = 0.7f;
            rb.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;
#if UNITY_6000_0_OR_NEWER
            rb.linearDamping = 0.05f;
            rb.angularDamping = 1.5f;
            rb.linearVelocity = vel;
#else
            rb.drag = 0.05f;
            rb.angularDrag = 1.5f;
            rb.velocity = vel;
#endif
            rb.angularVelocity = Random.insideUnitSphere * 10f;
            go.AddComponent<Grenade>();
        }

        void Update()
        {
            fuse -= Time.deltaTime;
            if (fuse <= 0f)
            {
                Explosions.Explode(transform.position + Vector3.up * 0.1f, 7.5f, 170f, 0.8f);
                Destroy(gameObject);
            }
        }
    }
}
