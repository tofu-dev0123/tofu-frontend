#!/usr/bin/env bash
# PreToolUse(Bash) hook:
# allow に入れている git diff / log / show:* などのワイルドカード許可を悪用した
# 秘匿ファイルの読み取り・任意ファイルへの書き込みをブロックする。
# - .env 系ファイルを参照するコマンド（.env.example は除く）
# - git の --no-index（管理外ファイルの読み取り）/ --output（任意パスへの書き込み）
set -uo pipefail

cmd=$(jq -r '.tool_input.command // empty')

# .env.example への言及を除いたうえで、パスとしての .env / .env.* を含むか判定する
# （process.env のような識別子は対象外）
stripped=${cmd//.env.example/}
env_path_re='(^|[[:space:]/:=<>"'"'"'])\.env(\.[A-Za-z0-9_-]+)?([[:space:]"'"'"';|&)<>]|$)'
if [[ "$stripped" =~ $env_path_re ]]; then
  echo ".env ファイルを参照するコマンドはブロックされています（.env.example は可）。" >&2
  exit 2
fi

case "$cmd" in
  *"git "*"--no-index"* | *"git "*"--output"*)
    echo "git の --no-index / --output オプションはブロックされています。" >&2
    exit 2
    ;;
esac

exit 0
