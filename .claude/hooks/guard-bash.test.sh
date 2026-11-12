#!/usr/bin/env bash
# guard-bash.sh の判定を guard-bash.cases のケースで検証する。
# 期待どおりでないケースが 1 件でもあれば非 0 で終了する。
set -uo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
HOOK="$DIR/guard-bash.sh"
CASES="$DIR/guard-bash.cases"

pass=0
fail=0

check() {
  local expected=$1 desc=$2 actual=$3
  if [ "$expected" = "$actual" ]; then
    pass=$((pass + 1))
  else
    fail=$((fail + 1))
    printf 'NG: expected=%s actual=%s: %s\n' "$expected" "$actual" "$desc"
  fi
}

result() {
  case $1 in
    0) echo allow ;;
    2) echo block ;;
    *) echo "exit$1" ;;
  esac
}

while IFS=$'\t' read -r expected cmd; do
  case $expected in '' | '#'*) continue ;; esac
  jq -n --arg c "$cmd" '{tool_input: {command: $c}}' | "$HOOK" 2>/dev/null
  check "$expected" "$cmd" "$(result $?)"
done <"$CASES"

# fail closed: jq がない
printf '%s' '{"tool_input":{"command":"ls"}}' |
  env PATH=/nonexistent /bin/bash "$HOOK" 2>/dev/null
check block '(jq がない)' "$(result $?)"

# fail closed: コマンドを取得できない
printf '%s' 'not json' | "$HOOK" 2>/dev/null
check block '(JSON でない入力)' "$(result $?)"

echo "guard-bash: ${pass} passed, ${fail} failed"
[ "$fail" -eq 0 ]
