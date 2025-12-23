'use client';

import { useRouter } from 'next/navigation';
import { post } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { LogoutResponse } from '@/types/api/logout';

function useHeader() {
  const router = useRouter();

  // ロゴクリック処理
  const handleClickLogo = () => {
    router.push('/admin/home');
  };

  // ログアウト
  const handleClickLogout = async () => {
    try {
      const result = await confirm('ログアウトしますか？');
      if (result) {
        await post<LogoutResponse>(API_ENDPOINTS.logout);
        router.push('/admin/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleClickLogo, handleClickLogout };
}

export default useHeader;
