using System;
using System.Collections.Generic;
using UnityEngine;

namespace WW1
{
    public enum Team { Allies, Central }

    public class Health : MonoBehaviour
    {
        public static readonly List<Health> All = new List<Health>();

        public Team team;
        public float max = 100f, hp = 100f;
        public float aimHeight = 1.35f;
        public bool isPlayer;

        public event Action<float, Vector3> Damaged;
        public event Action Died;

        public bool Dead { get { return hp <= 0f; } }
        public Vector3 AimPoint { get { return transform.position + Vector3.up * aimHeight; } }

        void OnEnable() { if (!All.Contains(this)) All.Add(this); }
        void OnDisable() { All.Remove(this); }

        public void Damage(float amount, Vector3 from)
        {
            if (Dead || amount <= 0f) return;
            hp = Mathf.Max(0f, hp - amount);
            if (Damaged != null) Damaged(amount, from);
            if (hp <= 0f && Died != null) Died();
        }

        public void Heal(float amount)
        {
            if (!Dead) hp = Mathf.Min(max, hp + amount);
        }
    }
}
