'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import loginIcon from '@/assets/images/login-icon.png';
import useLoginForm from '@/hooks/admin/login/useLoginForm';

function LoginFrom() {
  const { formHook } = useLoginForm();

  return (
    <div className="flex justify-center items-center flex-1">
      <Card className="w-100 bg-gray-100/50">
        <div className="flex justify-center items-center my-16">
          <img src={loginIcon.src} alt="login icon" width={100} height={100} />
        </div>
        <form
          onSubmit={formHook.handleSubmit(() => console.log('送信しました'))}
        >
          <CardContent>
            <div className="flex flex-col gap-4">
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                className="border-white bg-white rounded-full"
                {...formHook.register('username', {
                  required: 'ユーザー名の入力は必須です',
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                })}
              />
              {formHook.formState.errors.username?.message && (
                <div className="h-7 flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p>{formHook.formState.errors.username.message}</p>
                </div>
              )}
              <Input
                id="password"
                type="password"
                placeholder="password"
                className="border-white bg-white rounded-full"
                {...formHook.register('password', {
                  required: 'パスワードの入力は必須です',
                  minLength: { value: 8, message: '8文字以上入力してください' },
                  maxLength: {
                    value: 20,
                    message: '20文字以内で入力してください',
                  },
                })}
              />
              {formHook.formState.errors.password?.message && (
                <div className="h-7 flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p>{formHook.formState.errors.password.message}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button type="submit" className="w-full rounded-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginFrom;
