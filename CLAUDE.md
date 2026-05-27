# blog-platform-frontend

個人ブログプラットフォームのフロントエンド（管理画面 + 公開サイト）。

## 技術スタック

- Next.js 16 (App Router) / React 19 / TypeScript
- Tailwind CSS v4 / shadcn-ui (style: new-york, icon: lucide)
- 状態管理: Zustand / フォーム: react-hook-form
- HTTP: axios / Markdown: react-markdown + remark-gfm + rehype-highlight

## コマンド

| 用途         | コマンド         |
| ------------ | ---------------- |
| 開発サーバ   | `npm run dev`    |
| ビルド       | `npm run build`  |
| Lint         | `npm run lint`   |
| フォーマット | `npm run format` |
| 型チェック   | `npm run type`   |

## コーディング規約

- import は alias `@/*` を使う。相対パス `../*` は ESLint で禁止（同階層 `./` は可）
- `any` 禁止（`@typescript-eslint/no-explicit-any: error`）
- Prettier 準拠（シングルクォート / セミコロンあり / printWidth 80）。編集後は自動整形される
- UI コンポーネントは shadcn-ui を `@/components/ui` に配置

## ディレクトリ構成

- `src/app/` — ルーティング。`(public)` 公開サイト / `admin` 管理画面 / `api` Route Handler
- `src/components/features/{admin,public}/` — 機能別コンポーネント
- `src/components/ui/` — shadcn-ui 共通コンポーネント
- `src/hooks/{admin,public}/` — 機能別カスタムフック
- `src/lib/api/` — API クライアント（client/endpoint/http）
- `src/types/api/` — API リクエスト/レスポンス型
- `src/stores/` — Zustand ストア

## API 処理

API 呼び出し・型定義・エラーハンドリングの規約は @docs/api-guidelines.md に従う。

## ブランチ・コミット

- `develop` 起点で `feature/issue#<番号>` を切る
- コミットメッセージに `Co-Authored-By` 行は付けない
