'use client';
import { useForm } from 'react-hook-form';
import { post } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { LoginRequest, LoginResponse } from '@/types/api/login';
import { useState } from 'react';
import { MESSAGES } from '@/constants/messages';
import axios from 'axios';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import { useRouter } from 'next/navigation';

interface LoginForm {
  username: string;
  password: string;
}

function useLoginForm() {
  const router = useRouter();
  const formHook = useForm<LoginForm>();

  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  // ログイン処理
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage([]);
    const request: LoginRequest = {
      username: formHook.getValues('username'),
      password: formHook.getValues('password'),
    };
    try {
      await post<LoginResponse>(API_ENDPOINTS.login.post, request);

      // クッキーが反映されるまで少し待機
      await new Promise((resolve) => setTimeout(resolve, 500));

      // ログイン成功後にホームページにリダイレクト
      window.location.href = '/admin/home';
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // APIからエラーレスポンスが返ってきた場合
        const errorMessage = getErrorMessage(error.response.data);
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage([MESSAGES.errors.login.failed]);
      }
    }
  };

  return {
    formHook,
    onSubmit,
    errorMessage,
  };
}

export default useLoginForm;
