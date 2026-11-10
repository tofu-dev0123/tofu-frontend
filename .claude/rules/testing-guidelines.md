# テストガイドライン

UT は Vitest + Testing Library（jsdom）で書く。設定は `vitest.config.mts` / `vitest.setup.ts`。

| 用途             | コマンド                        |
| ---------------- | ------------------------------- |
| 全件実行         | `npm test`                      |
| ウォッチ         | `npm run test:watch`            |
| ファイル指定実行 | `npx vitest run <ファイルパス>` |

## テスト設計

`/implement` の実装計画には、以下の形式でテスト設計を含める。

```
### テスト設計
| 対象 | ケース | 入力 / 操作 | 期待値 |
| ---- | ------ | ----------- | ------ |
| `formatDate` | タイムゾーンなしは UTC 扱い | `'2024-01-10T15:00:00'` | `'2024年01月11日'` |

UT 対象外: <対象> — <理由（例: RSC ページのため目視確認）>
```

- 観点: 正常系 / 異常系（不正入力・API エラー）/ 境界値（0・空・上限ちょうど・上限 +1・日付またぎ）
- バグ改修は、不具合を再現するテストを先に書き、失敗することを確認してから修正する

## UT 対象の基準

| 対象                                                 | 方針                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------- |
| `src/lib/` のユーティリティ・純粋関数                | 必ず書く                                                            |
| `src/lib/api/` の API 呼び出し関数                   | 書く（HTTP 層をモックし、パラメータ組み立て・レスポンス変換を確認） |
| `src/hooks/` のカスタムフック                        | 書く（`renderHook`）                                                |
| `src/stores/` の Zustand ストア                      | 書く                                                                |
| ロジック・条件分岐を持つ Client Component            | 書く（表示切り替え・ユーザー操作・コールバック）                    |
| 見た目のみのコンポーネント・アニメーション中心のもの | 書かない（目視確認）                                                |
| `src/app/` のページ（RSC）・レイアウト               | 書かない（ロジックは `lib` / `hooks` に切り出してそちらをテスト）   |
| `src/components/ui/`（shadcn-ui）                    | 書かない（独自に手を入れた場合のみ）                                |

## 書き方

- 配置: テスト対象と同じディレクトリに `<対象ファイル名>.test.ts(x)`
- import: `describe` / `it` / `expect` / `vi` は `vitest` から明示的に import する。対象は `@/*` alias で import する
- 命名: `describe` は対象（関数・フック・コンポーネント名）、`it` は日本語で振る舞いを書く（例: `'不正な日付文字列は「日付エラー」を返す'`）
- 1 つの `it` では 1 つの振る舞いを検証する
- 実装の内部（private な関数・state の中身・呼び出し順）ではなく、入出力・画面に見える結果を検証する
- コンポーネントの要素取得は `getByRole` / `getByLabelText` / `getByText` を優先し、`data-testid` は最後の手段にする
- ユーザー操作は `@testing-library/user-event` を使う（`fireEvent` より優先）

## モック

- API: `vi.mock('@/lib/api/http')` で HTTP 関数をモックする。axios やネットワークを直接叩かない
- 時刻: `vi.useFakeTimers()` / `vi.setSystemTime()` で固定し、`afterEach` で `vi.useRealTimers()` に戻す
- Next.js: `next/navigation`（`useRouter` / `usePathname` / `useSearchParams`）は `vi.mock('next/navigation')` でモックする
- `window.matchMedia` などの jsdom に無い API は、そのテストファイル内でスタブする
- モックは `afterEach(() => vi.restoreAllMocks())` などでテスト間に漏らさない
