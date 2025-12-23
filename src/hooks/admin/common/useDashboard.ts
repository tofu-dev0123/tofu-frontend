'use client';

import { useState } from 'react';
import { post } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { LogoutResponse } from '@/types/api/logout';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import { MESSAGES } from '@/constants/messages';

function useDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const router = useRouter();

  const handleClickMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      setIsErrorModalOpen(true);
      if (axios.isAxiosError(error) && error.response) {
        // APIからエラーレスポンスが返ってきた場合
        const errorMessage = getErrorMessage(error.response.data);
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage([MESSAGES.errors.common.failed]);
      }
    }
  };

  return {
    isMenuOpen,
    handleClickMenu,
    handleClickLogout,
    errorMessage,
    isErrorModalOpen,
    setIsErrorModalOpen,
  };
}

export default useDashboard;
