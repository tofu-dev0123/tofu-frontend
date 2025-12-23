'use client';

import { useState } from 'react';
import { post } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { LogoutResponse } from '@/types/api/logout';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import { MESSAGES } from '@/constants/messages';
import useErrorModal from './useErrorModal';

function useDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  // エラーモーダル状態管理フック
  const errorModalHook = useErrorModal();

  const handleClickMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ログアウト
  const handleClickLogout = async () => {
    try {
      const result = await confirm('ログアウトしますか？');
      if (result) {
        await post<LogoutResponse>(API_ENDPOINTS.logout.post);
        router.push('/admin/login');
      }
    } catch (error) {
      errorModalHook.setIsOpen(true);
      if (axios.isAxiosError(error) && error.response) {
        // APIからエラーレスポンスが返ってきた場合
        const errorMessage = getErrorMessage(error.response.data);
        errorModalHook.setErrorMessage(errorMessage);
      } else {
        errorModalHook.setErrorMessage([MESSAGES.errors.common.failed]);
      }
    }
  };

  return {
    isMenuOpen,
    handleClickMenu,
    handleClickLogout,
    errorModalHook,
  };
}

export default useDashboard;
