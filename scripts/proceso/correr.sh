#!/bin/zsh
# Corre los seis roles para una pieza. Cada rol es un chat NUEVO de `claude -p` (sin memoria de los otros):
# solo recibe lo que el rol anterior dejó escrito. Uso: scripts/proceso/correr.sh a|b|c
# Requiere Claude Code instalado. No usa ningún framework de agentes ni nada de paga aparte.
set -e
P=$1; RAIZ=$(cd "$(dirname "$0")/../.." && pwd); S="$RAIZ/scripts/proceso"; O="$RAIZ/docs/proceso/$P"
mkdir -p "$O"; touch "$O/tiempos.tsv"
cd "$RAIZ"
CTX=$(cat "$S/contexto.md"); ENC=$(cat "$S/encargos/$P.md")
rol() { # $1 archivo de rol, $2 nombre de salida, $3 texto de entradas
  # Si el rol ya dejó una salida buena, no se repite (reanudar después de un corte).
  if [ -s "$O/$2.md" ] && ! grep -q "hit your" "$O/$2.md"; then echo "$2: ya estaba"; return; fi
  grep -v "^$2	" "$O/tiempos.tsv" > "$O/tiempos.tmp" || true; mv "$O/tiempos.tmp" "$O/tiempos.tsv"
  local t0=$(date +%s)
  claude -p "$(cat "$S/roles/$1")

---
$CTX

---
$ENC

---
# Lo que recibe de los roles anteriores
$3" --allowedTools "Read Grep Glob" > "$O/$2.md"
  local t1=$(date +%s)
  printf "%s\t%s\t%s\n" "$2" "$((t1-t0))" "$(date '+%Y-%m-%d %H:%M')" >> "$O/tiempos.tsv"
  echo "$2: $((t1-t0)) s"
}
rol 1-investigacion.md 1-ficha "(nada: usted es el primero)"
rol 2-redaccion.md 2-borrador "## Ficha del investigador
$(cat "$O/1-ficha.md")"
rol 3-visual.md 3-visual "## Borrador
$(cat "$O/2-borrador.md")"
rol 4-afirmaciones.md 4-afirmaciones "## Ficha
$(cat "$O/1-ficha.md")

## Borrador
$(cat "$O/2-borrador.md")"
rol 5-estilo.md 5-estilo "## Borrador
$(cat "$O/2-borrador.md")"
rol 6-revision.md 6-final "## Borrador
$(cat "$O/2-borrador.md")

## Especificación visual
$(cat "$O/3-visual.md")

## Tabla del verificador
$(cat "$O/4-afirmaciones.md")

## Faltas de estilo
$(cat "$O/5-estilo.md")"
echo "listo: $O"
