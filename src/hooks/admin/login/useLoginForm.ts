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
import { saveToken } from '@/lib/utils/token';

interface LoginForm {
  username: string;
  password: string;
}

function useLoginForm() {
  const router = useRouter();
  const formHook = useForm<LoginForm>();

  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  // ログイン処理
  const onSubmit = async (data: LoginForm) => {
    setErrorMessage([]);
    const request: LoginRequest = {
      username: data.username,
      password: data.password,
    };
    try {
      const response = await post<LoginResponse>(
        API_ENDPOINTS.login.post,
        request
      );

      // トークンをlocalStorageに保存
      if (response.token) {
        saveToken(response.token);
      }

      router.push('/admin/home');
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
    onSubmit: formHook.handleSubmit(onSubmit),
    errorMessage,
  };
}

export default useLoginForm;
