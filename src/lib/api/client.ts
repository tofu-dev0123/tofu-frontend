import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// レスポンス共通処理
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 / 403 / 500 などの共通ハンドリング
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // セッション切れ or 未ログイン
      window.location.href = '/admin/login';
    }

    return Promise.reject(error);
  }
);
