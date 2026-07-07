# API処理ガイドライン

このドキュメントは、本プロジェクトにおけるAPI処理の実装ガイドラインです。

## 目次

1. [ディレクトリ構造](#1-ディレクトリ構造)
2. [API呼び出し](#2-api呼び出し)
3. [型定義](#3-型定義)
4. [Hooksの実装パターン](#4-hooksの実装パターン)
5. [エラーハンドリング](#5-エラーハンドリング)
6. [状態管理](#6-状態管理)
7. [レスポンス処理](#7-レスポンス処理)

---

## 1. ディレクトリ構造

### API関連ファイルの配置

```
src/
├── lib/api/
│   ├── client.ts      # Axiosクライアント設定
│   ├── endpoint.ts    # APIエンドポイント定義
│   └── http.ts        # HTTP関数（get, post, patch, del, uploadFile）
├── types/api/
│   ├── error.ts       # エラー型
│   ├── login.ts       # ログイン関連
│   ├── post.ts        # 記事関連
│   ├── imagesUpload.ts
│   └── public/        # 公開API用
│       └── posts.ts
└── hooks/admin/
    ├── common/        # 共通hooks
    ├── posts/         # 記事管理
    ├── home/          # ホーム画面
    └── login/         # ログイン
```

### 命名規則

| 種類         | 命名パターン       | 例                                  |
| ------------ | ------------------ | ----------------------------------- |
| hooks        | `use[機能名].ts`   | `usePostList.ts`, `useLoginForm.ts` |
| 型定義       | `[リソース名].ts`  | `post.ts`, `login.ts`               |
| リクエスト型 | `[機能名]Request`  | `LoginRequest`, `PostRequest`       |
| レスポンス型 | `[機能名]Response` | `LoginResponse`, `PostResponse`     |

---

## 2. API呼び出し

### 基本的なHTTP関数

`src/lib/api/http.ts`で提供される関数を使用する。

```typescript
import { get, post, patch, del, uploadFile } from '@/lib/api/http';
```

#### GET

```typescript
const response = await get<PostResponse>(API_ENDPOINTS.posts.get);
```

#### POST

```typescript
const response = await post<LoginResponse>(API_ENDPOINTS.login.post, request);
```

#### PATCH

```typescript
const response = await patch<PostStatusPatchResponse>(
  API_ENDPOINTS.posts.patchStatus(postId),
  request
);
```

#### DELETE

```typescript
const response = await del<PostDeleteResponse>(
  API_ENDPOINTS.posts.delete(postId)
);
```

#### ファイルアップロード

```typescript
const formData = new FormData();
formData.append('image_file', file);
formData.append('alt_text', '');

const response = await uploadFile<ImagesUploadResponse>(
  API_ENDPOINTS.images.post,
  formData
);
```

### エンドポイント定義

`src/lib/api/endpoint.ts`でエンドポイントを一元管理する。

```typescript
export const API_ENDPOINTS = {
  login: {
    post: '/admin/auth/login',
  },
  posts: {
    get: '/admin/posts/',
    post: '/admin/posts/',
    put: (id: number) => `/admin/posts/${id}`,
    delete: (id: number) => `/admin/posts/${id}`,
    patchStatus: (id: number) => `/admin/posts/${id}`,
    edit: (id: number) => `/admin/posts/${id}`,
  },
  images: {
    post: '/admin/images/upload',
    delete: (id: number) => `/admin/images/${id}`,
  },
};
```

### クエリパラメータの構築

`URLSearchParams`を使用する。

```typescript
const queryParams = new URLSearchParams();
if (offset) queryParams.append('offset', offset.toString());
if (limit) queryParams.append('limit', limit.toString());
if (keyword) queryParams.append('keyword', keyword);

const response = await get<PostResponse>(
  `${API_ENDPOINTS.posts.get}?${queryParams.toString()}`
);
```

---

## 3. 型定義

### 基本構造

リクエストとレスポンスを分離して定義する。

```typescript
// src/types/api/login.ts
export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  token: string;
};
```

### エラー型

```typescript
// src/types/api/error.ts
export type ErrorDetail = {
  message: string;
  value: string;
};

export type ErrorResponse = {
  message: string;
  error: string;
  details: ErrorDetail[];
};
```

### リスト形式のレスポンス

ページネーション情報を含める。

```typescript
export type PostResponse = {
  total_count: number;
  total_pages: number;
  posts: Post[];
};
```

### 詳細と一覧で型を分離

```typescript
// 一覧表示用（軽量）
export type Post = {
  post_id: number;
  title: string;
  slug: string;
  status: PostStatus;
  createdAt: string;
};

// 詳細表示用（フル情報）
export type PostDetail = {
  post_id: number;
  title: string;
  content_md: string;
  content_html: string;
  thumbnail_url: string | null;
  images: PostImage[];
  tags: PostTag[];
};
```

---

## 4. Hooksの実装パターン

### パターン1: データ取得hook

```typescript
// src/hooks/admin/posts/usePostData.ts
export function usePostData({ postId, showError }: UsePostDataProps) {
  const [postData, setPostData] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await get<PostDetail>(
          API_ENDPOINTS.posts.edit(postId)
        );
        setPostData(response);
      } catch (error) {
        exceptErrorHandling(error, showError);
        setPostData(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, showError]);

  return { postData, isLoading };
}
```

### パターン2: アクション実行hook

```typescript
// src/hooks/admin/posts/usePostDeleteAlert.ts
function usePostDeleteAlert({ showError }: UsePostDeleteAlertProps) {
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setOpen(true);
    setPostId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setPostId(null);
  };

  const handleDelete = async () => {
    if (!postId) return;
    try {
      const response = await del<PostDeleteResponse>(
        API_ENDPOINTS.posts.delete(postId)
      );
      useToastStore.getState().show({
        type: 'success',
        message: response.message,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      exceptErrorHandling(error, showError);
      handleClose();
    }
  };

  return { open, handleOpen, handleClose, handleDelete };
}
```

### パターン3: 複合hook

複数の小さなhooksを組み合わせる。

```typescript
// src/hooks/admin/posts/usePostList.ts
function usePostList() {
  const { showError } = useErrorModal();
  const searchPostHook = useSearchPost();
  const statusHook = useStatus();
  const deleteAlertHook = usePostDeleteAlert({ showError });
  const patchStatusAlertHook = usePatchStatusAlert({ showError });

  useEffect(() => {
    // 初期処理
    searchPostHook.search(offset, limit);
  }, []);

  return {
    searchPost: searchPostHook,
    status: statusHook,
    deleteAlert: deleteAlertHook,
    patchStatusAlert: patchStatusAlertHook,
  };
}
```

### Hooks設計のポイント

1. **単一責任**: 1つのhookは1つの責任を持つ
2. **依存関係の注入**: `showError`などは引数で受け取る
3. **状態の初期化**: 適切な初期値を設定する
4. **クリーンアップ**: useEffectで不要なリソースを解放

---

## 5. エラーハンドリング

### 統一されたエラー処理

`exceptErrorHandling`を使用する。

```typescript
import { exceptErrorHandling } from '@/lib/utils/exceptErrorHandling';

try {
  const response = await get<PostResponse>(API_ENDPOINTS.posts.get);
  // 成功処理
} catch (error) {
  exceptErrorHandling(error, showError);
}
```

### exceptErrorHandlingの実装

```typescript
// src/lib/utils/exceptErrorHandling.ts
export const exceptErrorHandling = (
  error: unknown,
  showError: (message: string[]) => void
) => {
  if (axios.isAxiosError(error) && error.response) {
    const errorMessage = getErrorMessage(error.response.data);
    showError(errorMessage);
  } else {
    showError([MESSAGES.errors.common.failed]);
  }
};
```

### エラーメッセージの抽出

```typescript
// src/lib/utils/getErrorMessage.ts
export const getErrorMessage = (error: ErrorResponse) => {
  if (error.message) {
    return [error.message];
  } else if (error.details) {
    return error.details.map((detail) => detail.message);
  }
  return [];
};
```

### 401エラーの自動処理

APIクライアントのインターセプターで自動リダイレクト。

```typescript
// src/lib/api/client.ts
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 6. 状態管理

### ローディング状態

`finally`で必ずリセットする。

```typescript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await post<Response>(url, data);
    // 成功処理
  } catch (error) {
    exceptErrorHandling(error, showError);
  } finally {
    setIsLoading(false); // 必ず実行される
  }
};
```

### Zustandによるグローバル状態

トースト通知などグローバルな状態管理に使用。

```typescript
// src/stores/toastStore.ts
import { create } from 'zustand';

interface ToastState {
  toasts: Toast[];
  show: (toast: Omit<Toast, 'id'>) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
```

### 使用例

```typescript
useToastStore.getState().show({
  type: 'success',
  message: '保存しました',
});
```

---

## 7. レスポンス処理

### 成功時のトースト表示

```typescript
const response = await del<PostDeleteResponse>(
  API_ENDPOINTS.posts.delete(postId)
);

useToastStore.getState().show({
  type: 'success',
  message: response.message,
});
```

### ページ遷移を伴う処理

```typescript
try {
  await post<Response>(url, data);

  useToastStore.getState().show({
    type: 'success',
    message: '保存しました',
  });

  // 少し待ってから遷移（トーストを見せるため）
  setTimeout(() => {
    router.push('/admin/home');
  }, 1500);
} catch (error) {
  exceptErrorHandling(error, showError);
}
```

### リスト取得時の状態更新

```typescript
const response = await get<PostResponse>(
  `${API_ENDPOINTS.posts.get}?${queryParams.toString()}`
);

setPostList(response.posts);
setTotalCount(response.total_count);
setTotalPages(response.total_pages);
```

---

## チェックリスト

新しいAPI処理を実装する際のチェックリスト:

- [ ] `src/lib/api/endpoint.ts`にエンドポイントを追加したか
- [ ] `src/types/api/`にリクエスト/レスポンス型を定義したか
- [ ] 型付きのHTTP関数（`get`, `post`, `patch`, `del`）を使用しているか
- [ ] `exceptErrorHandling`でエラー処理を統一しているか
- [ ] ローディング状態を`finally`でリセットしているか
- [ ] 成功時にトーストで通知しているか
- [ ] hooksは単一責任になっているか
