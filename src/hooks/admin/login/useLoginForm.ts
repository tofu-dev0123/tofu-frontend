'use client';
import { useForm } from 'react-hook-form';

interface LoginForm {
  username: string;
  password: string;
}

function useLoginForm() {
  const formHook = useForm<LoginForm>();

  return {
    formHook,
  };
}

export default useLoginForm;
