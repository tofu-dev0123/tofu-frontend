import axios from 'axios';

// ビルド時の SSG / RSC はレイテンシ要件が緩く、重い記事で 10 秒を超えるため長めに取る
const TIMEOUT = typeof window === 'undefined' ? 30000 : 10000;

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプターを追加
apiClient.interceptors.request.use(
  (config) => {
    // FormDataの場合はContent-Typeを削除してaxiosに自動設定させる
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else if (!config.headers['Content-Type']) {
      // FormDataでない場合のみapplication/jsonを設定
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンス共通処理
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

// Next.jsルートハンドラ用のaxiosインスタンス（baseURLなし）
export const nextApiClient = axios.create({
  timeout: TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプターを追加
nextApiClient.interceptors.request.use(
  (config) => {
    // FormDataの場合はContent-Typeを削除してaxiosに自動設定させる
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else if (!config.headers['Content-Type']) {
      // FormDataでない場合のみapplication/jsonを設定
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンス共通処理
nextApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
