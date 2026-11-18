#!/usr/bin/env bash
# Gera o APK: copia o jogo (dist/) para os assets do app e compila com o Gradle.
# Requer: Android SDK (ANDROID_HOME) e JDK 17+. Rode antes: npm run build
set -e
AQUI="$(cd "$(dirname "$0")" && pwd)"
RAIZ="$(dirname "$AQUI")"
[ -d "$RAIZ/dist" ] || (cd "$RAIZ" && npm run build)
rm -rf "$AQUI/app/src/main/assets/www"
mkdir -p "$AQUI/app/src/main/assets"
cp -r "$RAIZ/dist" "$AQUI/app/src/main/assets/www"
cd "$AQUI"
if [ -x ./gradlew ]; then G=./gradlew; else G=gradle; fi
$G --no-daemon assembleRelease
cp app/build/outputs/apk/release/app-release.apk "$RAIZ/FrenteEuropa1944.apk"
echo "APK pronto: $RAIZ/FrenteEuropa1944.apk"
