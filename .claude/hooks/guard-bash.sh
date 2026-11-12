#!/usr/bin/env bash
# PreToolUse(Bash) hook（多重防御・ベストエフォート）:
# 秘匿ファイルの読み取り・git による任意パスへの書き込みを、コマンド文字列から検出してブロックする。
# 主たる防御は settings.json の allow を固定形のコマンドに限定すること。この hook は
# 文字列判定のため完全ではない（誤検知・すり抜けの余地がある）。
#
# - .env 系ファイルの参照（.env.example は除く）、および .en / env 付近のグロブ・ブレース・変数展開
# - git の --no-index / --output（省略形 --no-ind* / --ou* を含む）
# - jq がない、またはコマンドを取得できない場合はブロックする（fail closed）
set -uo pipefail

block() {
  echo "$1" >&2
  exit 2
}

command -v jq >/dev/null 2>&1 || block "guard-bash: jq が見つからないため Bash コマンドを検査できません。jq をインストールしてください。"

input=$(cat)
cmd=$(printf '%s' "$input" | jq -er '.tool_input.command' 2>/dev/null) ||
  block "guard-bash: コマンドを取得できませんでした。"

# .env.example への言及を除いて判定する（process.env のような識別子は対象外）
stripped=${cmd//.env.example/}

env_path_re='(^|[[:space:]/:=<>"'"'"'])\.env(\.[A-Za-z0-9_-]+)?([[:space:]"'"'"';|&)<>]|$)'
if [[ "$stripped" =~ $env_path_re ]]; then
  block ".env ファイルを参照するコマンドはブロックされています（.env.example は可）。"
fi

# .en* / .e?v / .{env} / .* / $'...' / ${...} などで .env を組み立てる形。
# クォートを解釈し、シェルが展開しない部分（'.[]' や '*.test.*' など）は対象外にする。
#   glob_view:   クォート文字を除き、クォート内・エスケープされたグロブ文字を無害化したもの
#   expand_view: シングルクォート内（変数展開されない部分）を無害化したもの
glob_msg=".env を参照し得るグロブ・ブレース・変数展開を含むコマンドはブロックされています。"
glob_view=''
expand_view=''
state=none
LC_ALL=C
n=${#stripped}
i=0
while ((i < n)); do
  c=${stripped:i:1}
  case $state in
    none)
      case $c in
        \\)
          next=${stripped:i+1:1}
          case $next in [*?[{]) next=_ ;; esac
          glob_view+=$next
          expand_view+=__
          ((i += 2))
          continue
          ;;
        \') state=single ;;
        \") state=double ;;
        \$)
          # ANSI-C クォート $'...' はエスケープで任意の文字を組み立てられる
          [[ ${stripped:i+1:1} == \' ]] && block "$glob_msg"
          glob_view+=$c
          expand_view+=$c
          ;;
        *)
          glob_view+=$c
          expand_view+=$c
          ;;
      esac
      ;;
    single)
      if [[ $c == \' ]]; then
        state=none
      else
        case $c in [*?[{]) glob_view+=_ ;; *) glob_view+=$c ;; esac
        expand_view+=_
      fi
      ;;
    double)
      case $c in
        \") state=none ;;
        \\)
          glob_view+=__
          expand_view+=__
          ((i += 2))
          continue
          ;;
        [*?[{])
          glob_view+=_
          expand_view+=$c
          ;;
        *)
          glob_view+=$c
          expand_view+=$c
          ;;
      esac
      ;;
  esac
  ((i += 1))
done

env_glob_re='(^|[[:space:]/:=<>;|&(])\.(e|en|env)?[*?[{]'
if [[ "$glob_view" =~ $env_glob_re || "$expand_view" =~ \$\{ ]]; then
  block "$glob_msg"
fi

if [[ "$cmd" =~ (^|[^[:alnum:]_-])git[[:space:]] ]]; then
  git_opt_re='(^|[[:space:]=])--(no-ind|ou)[[:alnum:]-]*'
  if [[ "$cmd" =~ $git_opt_re ]]; then
    block "git の --no-index / --output（省略形を含む）はブロックされています。"
  fi
fi

exit 0
