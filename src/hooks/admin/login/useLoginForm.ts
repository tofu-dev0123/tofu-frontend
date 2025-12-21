'use client';
import { useForm } from 'react-hook-form';
import { post } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { LoginRequest, LoginResponse } from '@/types/api/login';
import { useRouter } from 'next/navigation';
interface LoginForm {
  username: string;
  password: string;
}

function useLoginForm() {
  const router = useRouter();
  const formHook = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    const request: LoginRequest = {
      username: data.username,
      password: data.password,
    };
    try {
      await post<LoginResponse>(API_ENDPOINTS.login, request);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    formHook,
    onSubmit,
  };
}

export default useLoginForm;
