using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace WW1
{
    // Campanha completa: bombardeio, apito, travessia da terra de ninguém, metralhadora,
    // tomada da trincheira, ataque de gás, contra-ataque e chegada dos reforços (final).
    public class Mission : MonoBehaviour
    {
        public const string BriefingText =
            "Depois de sete dias de bombardeio, o Exército Britânico vai atacar as linhas alemãs. " +
            "Você é o soldado Thomas Hale, do 1º Batalhão de Fuzileiros.\n\n" +
            "Quando o oficial apitar, saia da trincheira, atravesse a terra de ninguém, destrua o ninho de metralhadora " +
            "e tome a trincheira inimiga. Depois, segure a posição até os reforços chegarem.\n\n" +
            "• Use as crateras e o tanque destruído como cobertura.\n" +
            "• Agachado você é um alvo bem menor.\n" +
            "• Para sair da trincheira, use as rampas ou empurre contra a parede para escalar.\n" +
            "• Fique longe do arame farpado: passe pelas brechas abertas pela artilharia.\n\n" +
            "Boa sorte, soldado.";

        public const string EpilogueText =
            "Naquele 1º de julho de 1916, o primeiro dia da Batalha do Somme, cerca de 20 mil soldados britânicos morreram — " +
            "o dia mais sangrento da história do Exército Britânico.\n\n" +
            "A batalha durou até novembro de 1916 e deixou mais de um milhão de mortos e feridos entre britânicos, franceses e alemães, " +
            "para um avanço de poucos quilômetros.\n\n" +
            "Dois anos depois, às 11 horas do dia 11 de novembro de 1918, os canhões finalmente silenciaram na Frente Ocidental. " +
            "A Grande Guerra havia terminado.\n\n" +
            "Em memória de todos que lutaram e caíram.";

        public string objective;
        public string timerText;
        public bool hasMarker;
        public Vector3 markerPos;

        public readonly List<SoldierAI> allies = new List<SoldierAI>();
        public readonly List<SoldierAI> defenders = new List<SoldierAI>();
        public readonly List<SoldierAI> attackers = new List<SoldierAI>();
        SoldierAI officer;
        MachineGunNest mg;
        bool started;

        // Coloca os soldados no mapa (aparecem já no menu).
        public void SetupWorld(Transform world)
        {
            float[] allyX = { -17f, -14.5f, -9f, -6f, -3.2f, 4.5f, 7f, 9.5f, 15f, 18f };
            foreach (float x in allyX)
            {
                float z = Battlefield.TrenchZ(x, Battlefield.PlayerTrenchZ) + Battlefield.StepOff;
                var a = SoldierAI.Spawn(Team.Allies, Role.Ally, new Vector3(x, Battlefield.StepY, z), 0f, world);
                a.HoldStep(Battlefield.StepY, 0f);
                allies.Add(a);
            }
            float ox = 1.8f;
            officer = SoldierAI.Spawn(Team.Allies, Role.Officer, new Vector3(ox, Battlefield.Floor, Battlefield.TrenchZ(ox, 0f) - 0.4f), 20f, world);
            officer.HoldStep(Battlefield.Floor, 20f);
            allies.Add(officer);

            for (float x = -38f; x <= 38f; x += 6.4f)
            {
                if (Mathf.Abs(x - 6f) < 3f) continue;
                float z = Battlefield.TrenchZ(x, Battlefield.EnemyTrenchZ) - Battlefield.StepOff;
                var d = SoldierAI.Spawn(Team.Central, Role.Defender, new Vector3(x, Battlefield.StepY, z), 180f, world);
                d.HoldStep(Battlefield.StepY, 180f);
                d.rushes = false;
                d.accuracy = 0.2f;
                defenders.Add(d);
            }

            Vector3 mgp = Battlefield.Ground(6f, Battlefield.TrenchZ(6f, Battlefield.EnemyTrenchZ) - 3.6f);
            Battlefield.mgPos = mgp;
            mg = MachineGunNest.Build(world, mgp);
            defenders.Add(mg.gunner);

            // Corpos de ataques anteriores na terra de ninguém
            var rng = new System.Random(5);
            for (int i = 0; i < 8; i++)
            {
                float x = Mathf.Lerp(-40f, 40f, (float)rng.NextDouble());
                float z = Mathf.Lerp(50f, 125f, (float)rng.NextDouble());
                var rig = SoldierRig.Build(i % 3 == 0 ? Team.Central : Team.Allies, world, "Caido");
                rig.transform.position = Battlefield.Ground(x, z) + Vector3.up * 0.12f;
                rig.transform.rotation = Quaternion.Euler(0, (float)rng.NextDouble() * 360f, 0) * Quaternion.Euler(rng.NextDouble() < 0.5 ? 86f : -86f, 0, 0);
                rig.kneelTarget = 0f;
                rig.Animate(0f, 0.016f, 0f);
                rig.rifle.localRotation = Quaternion.Euler(0, 40f, 80f);
                Phys.SetLayerRecursive(rig.transform, Phys.IgnoreLayer);
                rig.enabled = false;
            }
        }

        public void Begin()
        {
            if (started) return;
            started = true;
            StartCoroutine(Run());
        }

        static int AliveCount(List<SoldierAI> list)
        {
            int n = 0;
            for (int i = 0; i < list.Count; i++) if (list[i] != null && list[i].Alive) n++;
            return n;
        }

        IEnumerator Run()
        {
            var game = Game.I;
            var hud = game.hud;
            var art = Artillery.I;
            var pc = game.player;

            // ---- 0. Bombardeio e espera pelo apito ----
            art.friendlyBarrage = true;
            art.barrageZ0 = 143f;
            art.barrageZ1 = 160f;
            art.barrageInterval = 0.55f;
            hasMarker = false;
            objective = "Aguarde o apito do oficial. A artilharia aliada está bombardeando a linha alemã.";
            hud.Message("Calar baionetas!", 3f);
            for (float t = 12f; t > 0f; t -= Time.deltaTime)
            {
                timerText = "Ataque em " + Mathf.CeilToInt(t) + " s";
                yield return null;
            }
            timerText = null;

            // ---- Apito! ----
            Sfx.PlayAt(Sfx.Whistle, officer.transform.position + Vector3.up * 1.6f, 1f, 1f, 15f);
            yield return new WaitForSeconds(0.4f);
            Sfx.PlayAt(Sfx.Whistle, pc.transform.position + new Vector3(-25f, 1.5f, 1f), 0.6f, 0.97f, 10f);
            Sfx.PlayAt(Sfx.Whistle, pc.transform.position + new Vector3(30f, 1.5f, 1f), 0.5f, 1.03f, 10f);
            hud.Message("AVANCEM! SAIAM DA TRINCHEIRA!", 3.5f);
            var rng = new System.Random(1);
            foreach (var a in allies)
            {
                if (!a.Alive) continue;
                float x0 = a.transform.position.x;
                a.active = true;
                a.GoTo(new Vector3(Clamp(x0 + R(rng, -5f, 5f)), 0, R(rng, 28f, 45f)));
                a.waypoints.Enqueue(new Vector3(Clamp(x0 + R(rng, -6f, 6f)), 0, R(rng, 60f, 85f)));
                a.waypoints.Enqueue(new Vector3(Clamp(x0 + R(rng, -6f, 6f)), 0, R(rng, 98f, 120f)));
                a.waypoints.Enqueue(new Vector3(Clamp(x0 + R(rng, -6f, 6f)), 0, R(rng, 124f, 133f)));
            }
            foreach (var d in defenders) if (d.Alive && d.role == Role.Defender) d.active = true;
            mg.active = true;
            art.barrageZ0 = 165f;
            art.barrageZ1 = 190f;
            art.barrageInterval = 1.1f;
            StartCoroutine(LiftBarrage(art, 18f));
            yield return new WaitForSeconds(4f);
            art.enemyShelling = true;
            art.shellInterval = 7.5f;
            art.shellMax = 55f;

            // ---- 1. Terra de ninguém até a cratera ----
            Vector3 crater = Battlefield.objectiveCrater;
            objective = "Saia da trincheira (pelas rampas ou escalando a parede) e avance até a grande cratera.";
            hasMarker = true;
            markerPos = crater;
            while (true)
            {
                Vector3 pp = pc.transform.position;
                Vector2 d = new Vector2(pp.x - crater.x, pp.z - crater.z);
                if (d.magnitude < 8f || pp.z > crater.z + 10f) break;
                yield return null;
            }
            hud.Message("Cratera alcançada! Pegue fôlego...", 2.5f);

            // ---- 2. Ninho de metralhadora ----
            if (!mg.destroyed)
            {
                objective = "Destrua o ninho de metralhadora: jogue uma granada nele ou abata o atirador.";
                markerPos = Battlefield.mgPos;
                while (!mg.destroyed) yield return null;
            }
            yield return new WaitForSeconds(1.5f);

            // ---- 3. Tomar a trincheira inimiga ----
            while (true)
            {
                int left = AliveCount(defenders);
                if (left == 0) break;
                objective = "Invada a trincheira alemã e elimine os defensores (" + left + " restantes).";
                Vector3 pp = pc.transform.position;
                SoldierAI nearest = null;
                float best = float.MaxValue;
                foreach (var d in defenders)
                {
                    if (!d.Alive) continue;
                    float dist = Vector3.Distance(d.transform.position, pp);
                    if (dist < best) { best = dist; nearest = d; }
                    if (pp.z > Battlefield.EnemyTrenchZ - 30f && dist < 22f && d.role == Role.Defender) d.chasePlayer = true;
                }
                if (nearest != null) markerPos = nearest.transform.position;
                yield return new WaitForSeconds(0.3f);
            }
            art.enemyShelling = false;
            hud.Message("TRINCHEIRA TOMADA!", 3.5f);

            // Aliados sobreviventes ocupam a trincheira capturada.
            int k = 0;
            foreach (var a in allies)
            {
                if (!a.Alive) continue;
                a.waypoints.Clear();
                float x = Clamp(pc.transform.position.x + (k % 2 == 0 ? 1 : -1) * (3f + k * 2.2f));
                k++;
                if (Mathf.Abs(x - 6f) < 2f) x += 3f;
                float z = Battlefield.TrenchZ(x, Battlefield.EnemyTrenchZ) + Battlefield.StepOff;
                a.GoTo(new Vector3(x, 0, Battlefield.TrenchZ(x, Battlefield.EnemyTrenchZ) - 6f));
                a.waypoints.Enqueue(new Vector3(x, 0, z));
                a.arrived = s => s.HoldStep(Battlefield.StepY, 0f);
            }

            // ---- Reabastecer ----
            Vector3 crate = Battlefield.ammoCrates[1];
            float cd = float.MaxValue;
            for (int i = 1; i < Battlefield.ammoCrates.Count; i++)
            {
                float dd = Vector3.Distance(Battlefield.ammoCrates[i], pc.transform.position);
                if (dd < cd) { cd = dd; crate = Battlefield.ammoCrates[i]; }
            }
            objective = "Pegue munição e granadas na caixa e prepare-se para o contra-ataque.";
            markerPos = crate;
            float wait = 18f;
            while (wait > 0f && !(pc.weapon.reserve >= PlayerWeapon.MaxReserve && pc.weapon.grenades >= PlayerWeapon.MaxGrenades))
            {
                wait -= Time.deltaTime;
                yield return null;
            }

            // ---- 4. Ataque de gás ----
            hasMarker = false;
            game.gasActive = true;
            Sfx.Play2D(Sfx.Bell, 0.8f, 1f);
            hud.Message("GÁS! GÁS! GÁS!", 3.5f);
            objective = "Ataque de gás! Coloque a máscara (botão MÁSCARA / tecla M).";
            float gasT = 0f;
            while (!pc.maskOn && gasT < 6f)
            {
                gasT += Time.deltaTime;
                yield return null;
            }

            // ---- 5. Defender até os reforços ----
            objective = "Defenda a trincheira capturada do contra-ataque alemão até os reforços chegarem.";
            art.enemyShelling = true;
            art.shellInterval = 6.5f;
            art.shellMax = 45f;
            const float defendTime = 100f;
            float[] waveAt = { 0f, 22f, 45f, 70f };
            int[] waveSize = { 5, 6, 6, 7 };
            int wave = 0;
            bool gasOver = false;
            for (float t = 0f; t < defendTime; t += Time.deltaTime)
            {
                if (wave < waveAt.Length && t >= waveAt[wave])
                {
                    SpawnWave(waveSize[wave] + (Game.Difficulty == 2 ? 2 : 0) - (Game.Difficulty == 0 ? 1 : 0));
                    if (wave > 0) hud.Message("Eles estão vindo de novo!", 2.5f);
                    wave++;
                }
                if (!gasOver && t > 30f)
                {
                    gasOver = true;
                    game.gasActive = false;
                    hud.Message("O gás se dissipou. Pode tirar a máscara.", 3f);
                }
                float left = defendTime - t;
                timerText = "Reforços em " + Game.FormatTime(left) + "   ·   Inimigos à vista: " + AliveCount(attackers);
                yield return null;
            }
            game.gasActive = false;
            timerText = null;

            // ---- Final: chegam os reforços ----
            art.enemyShelling = false;
            hud.Message("OS REFORÇOS CHEGARAM!", 4f);
            objective = "Posição garantida. Os alemães estão recuando!";
            for (int i = 0; i < 10; i++)
            {
                float x = Clamp(pc.transform.position.x + R(rng, -20f, 20f));
                var r = SoldierAI.Spawn(Team.Allies, Role.Ally, Battlefield.Ground(x, R(rng, 112f, 126f)), 0f, game.world);
                r.active = true;
                r.rushes = false;
                r.GoTo(new Vector3(x, 0, Battlefield.TrenchZ(x, Battlefield.EnemyTrenchZ) + Battlefield.StepOff));
                r.arrived = s => s.HoldStep(Battlefield.StepY, 0f);
            }
            foreach (var a in attackers)
            {
                if (!a.Alive) continue;
                a.retreating = true;
                a.active = false;
                a.chasePlayer = false;
                a.rushes = false;
                a.waypoints.Clear();
                a.GoTo(new Vector3(a.transform.position.x, 0, 266f));
                a.arrived = s => Destroy(s.gameObject);
            }
            yield return new WaitForSeconds(6f);
            game.Victory();
        }

        IEnumerator LiftBarrage(Artillery art, float after)
        {
            yield return new WaitForSeconds(after);
            art.friendlyBarrage = false;
        }

        void SpawnWave(int count)
        {
            var game = Game.I;
            float px = game.player.transform.position.x;
            int alive = AliveCount(attackers);
            for (int i = 0; i < count && alive < 12; i++, alive++)
            {
                float x = Clamp(px + Random.Range(-32f, 32f));
                float z = Random.Range(240f, 256f);
                var a = SoldierAI.Spawn(Team.Central, Role.Attacker, Battlefield.Ground(x, z), 180f, game.world);
                a.active = true;
                a.accuracy = 0.2f;
                a.range = 110f;
                a.runSpeed = Random.Range(3.4f, 4.2f);
                float tx = Clamp(x + Random.Range(-10f, 10f));
                a.GoTo(new Vector3(Clamp(x + Random.Range(-6f, 6f)), 0, Random.Range(195f, 212f)));
                a.waypoints.Enqueue(new Vector3(tx, 0, Battlefield.TrenchZ(tx, Battlefield.EnemyTrenchZ) + Random.Range(7f, 12f)));
                a.arrived = s => s.chasePlayer = true;
                attackers.Add(a);
            }
        }

        static float Clamp(float x)
        {
            return Mathf.Clamp(x, Battlefield.MinX + 9f, Battlefield.MaxX - 9f);
        }

        static float R(System.Random r, float a, float b)
        {
            return Mathf.Lerp(a, b, (float)r.NextDouble());
        }
    }
}
