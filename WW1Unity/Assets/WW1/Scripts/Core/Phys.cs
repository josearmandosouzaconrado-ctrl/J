using UnityEngine;

namespace WW1
{
    public static class Phys
    {
        public const int IgnoreLayer = 2; // camada "Ignore Raycast" (corpos, granadas)
        public const int Mask = ~(1 << IgnoreLayer);
        static readonly RaycastHit[] buf = new RaycastHit[24];

        // Primeiro acerto ignorando os colisores de "ignore" (o próprio atirador).
        public static bool FirstHit(Vector3 origin, Vector3 dir, float maxDist, Transform ignore, out RaycastHit hit)
        {
            hit = new RaycastHit();
            int n = Physics.RaycastNonAlloc(origin, dir, buf, maxDist, Mask, QueryTriggerInteraction.Ignore);
            float best = float.MaxValue;
            bool found = false;
            for (int i = 0; i < n; i++)
            {
                if (ignore != null && buf[i].transform.IsChildOf(ignore)) continue;
                if (buf[i].distance < best)
                {
                    best = buf[i].distance;
                    hit = buf[i];
                    found = true;
                }
            }
            return found;
        }

        // Existe linha de visão de "from" até "target"?
        public static bool CanSee(Vector3 from, Transform self, Health target)
        {
            Vector3 to = target.AimPoint;
            Vector3 d = to - from;
            float dist = d.magnitude;
            RaycastHit hit;
            if (!FirstHit(from, d / dist, dist + 0.5f, self, out hit)) return true;
            if (hit.distance >= dist - 0.4f) return true;
            return hit.collider.GetComponentInParent<Health>() == target;
        }

        public static void SetLayerRecursive(Transform t, int layer)
        {
            t.gameObject.layer = layer;
            for (int i = 0; i < t.childCount; i++) SetLayerRecursive(t.GetChild(i), layer);
        }
    }
}
