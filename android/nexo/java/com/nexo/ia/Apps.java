package com.nexo.ia;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.os.Build;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/** Lista os apps instalados que aparecem na tela inicial e abre qualquer um deles. */
final class Apps {
    private Apps() {}

    // jogos que nem sempre se declaram como jogo para o Android
    private static final String[] PREFIXOS_JOGOS = {
        "com.dts.freefire", "com.garena.game", "com.mojang", "com.roblox", "com.supercell", "com.tencent.ig", "com.pubg",
        "com.activision", "com.miHoYo", "com.HoYoverse", "com.ea.", "com.gameloft", "com.king.", "com.kiloo", "com.outfit7",
        "com.rockstargames", "com.netmarble", "com.nexon", "com.innersloth", "com.mobile.legends", "com.miniclip", "com.rovio",
        "com.imangi", "com.halfbrick", "com.fingersoft", "com.playrix", "com.ubisoft", "com.square_enix", "com.bandainamcoent",
        "com.sega", "com.konami", "com.chess", "com.nianticlabs", "com.epicgames", "com.riotgames", "com.levelinfinite",
        "com.proximabeta", "com.sybogames", "com.ketchapp", "com.voodoo", "com.nexo.jogo", "com.eldoria", "com.miami",
    };

    @SuppressWarnings("deprecation")
    static boolean ehJogo(ApplicationInfo ai) {
        if (ai == null) return false;
        if (Build.VERSION.SDK_INT >= 26 && ai.category == ApplicationInfo.CATEGORY_GAME) return true;
        if ((ai.flags & ApplicationInfo.FLAG_IS_GAME) != 0) return true;
        for (String p : PREFIXOS_JOGOS) if (ai.packageName.startsWith(p)) return true;
        return false;
    }

    static String listar(Context c) {
        JSONArray lista = new JSONArray();
        try {
            PackageManager pm = c.getPackageManager();
            Intent i = new Intent(Intent.ACTION_MAIN);
            i.addCategory(Intent.CATEGORY_LAUNCHER);
            List<ResolveInfo> achados = pm.queryIntentActivities(i, 0);
            Set<String> vistos = new HashSet<>();
            for (ResolveInfo r : achados) {
                String pacote = r.activityInfo.packageName;
                if (pacote.equals(c.getPackageName()) || !vistos.add(pacote)) continue;
                JSONObject o = new JSONObject();
                o.put("nome", String.valueOf(r.loadLabel(pm)));
                o.put("pacote", pacote);
                o.put("jogo", ehJogo(r.activityInfo.applicationInfo));
                lista.put(o);
            }
        } catch (Exception e) {
            // devolve o que conseguiu
        }
        return lista.toString();
    }

    static boolean abrir(Context c, String pacote) {
        try {
            Intent i = c.getPackageManager().getLaunchIntentForPackage(pacote);
            if (i == null) return false;
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
            c.startActivity(i);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
