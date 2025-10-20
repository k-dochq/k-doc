'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';

interface UseEmailLoginParams {
  locale: Locale;
  dict: Dictionary;
}

interface LoginData {
  email: string;
  password: string;
}

interface UseEmailLoginReturn {
  loginWithEmail: (data: LoginData) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

export function useEmailLogin({ locale, dict }: UseEmailLoginParams): UseEmailLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithEmail = async (
    loginData: LoginData,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      if (!supabase) {
        console.error('Supabase client 생성 실패');
        return { success: false, error: 'Supabase client 생성 실패' };
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (signInError) {
        throw signInError;
      }

      if (data.user) {
        return { success: true };
      }

      return { success: false, error: '로그인에 실패했습니다.' };
    } catch (err) {
      let errorMessage = dict.auth?.login?.loginError || '로그인 중 오류가 발생했습니다';

      if (err instanceof Error) {
        // Supabase 에러 메시지 매핑
        if (err.message.includes('Invalid login credentials')) {
          errorMessage =
            dict.auth?.login?.errors?.invalidCredentials ||
            '이메일 또는 비밀번호가 올바르지 않습니다.';
        } else if (err.message.includes('Email not confirmed')) {
          errorMessage =
            dict.auth?.login?.errors?.emailNotConfirmed || '이메일을 확인하고 계정을 인증해주세요.';
        } else if (err.message.includes('Too many requests')) {
          errorMessage = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginWithEmail,
    isLoading,
    error,
  };
}
