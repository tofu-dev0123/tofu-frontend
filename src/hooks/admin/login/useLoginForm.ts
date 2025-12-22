'use client';
import { useForm } from 'react-hook-form';
import { post } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { LoginRequest, LoginResponse } from '@/types/api/login';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MESSAGES } from '@/constants/messages';
import axios from 'axios';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';

interface LoginForm {
  username: string;
  password: string;
}

function useLoginForm() {
  const router = useRouter();
  const formHook = useForm<LoginForm>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  // ログイン処理
  const onSubmit = async (data: LoginForm) => {
    setErrorMessage([]);
    setIsLoading(true);
    const request: LoginRequest = {
      username: data.username,
      password: data.password,
    };
    try {
      await post<LoginResponse>(API_ENDPOINTS.login, request);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // APIからエラーレスポンスが返ってきた場合
        const errorMessage = getErrorMessage(error.response.data);
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage([MESSAGES.errors.login.failed]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formHook,
    onSubmit,
    errorMessage,
  };
}

export default useLoginForm;
