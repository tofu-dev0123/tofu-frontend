#!/usr/bin/env bash
# lint / 型チェック / フォーマットチェック / UT を実行し、成功したら HEAD の sha を
# .claude/.last-check に記録する。
# .claude/hooks/require-check.sh が git push / gh pr create 時にこの記録と HEAD を照合する。
#
# next build は含めない（RSC ページがビルド時にバックエンドへ fetch するため遅く、
# 環境に依存する。ビルド起因の問題は Vercel プレビューで確認する）。
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

MARKER="$ROOT/.claude/.last-check"

rm -f "$MARKER"

echo "==> lint"
npm run lint

echo "==> type"
npm run type

echo "==> format"
npx prettier --check .

echo "==> test"
npm test

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "==> チェックは成功しましたが、未コミットの変更があるため記録しません。コミット後に再実行してください。" >&2
  exit 1
fi

git rev-parse HEAD > "$MARKER"
echo "==> OK: $(cat "$MARKER") を記録しました"
