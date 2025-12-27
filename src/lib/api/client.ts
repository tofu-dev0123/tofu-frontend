import axios from 'axios';
import { getToken, removeToken } from '@/lib/utils/token';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
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
    // localStorageからトークンを取得してヘッダーに追加
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
    const status = error.response?.status;

    if (status === 401) {
      // セッション切れ or 未ログイン
      removeToken();
      window.location.href = '/admin/login';
    }

    return Promise.reject(error);
  }
);
