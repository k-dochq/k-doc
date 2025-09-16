'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';

interface UseEmailSignupParams {
  locale: Locale;
  dict: Dictionary;
}

interface UseEmailSignupReturn {
  signUpWithEmail: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

export function useEmailSignup({ locale, dict }: UseEmailSignupParams): UseEmailSignupReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpWithEmail = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.user && !data.user.email_confirmed_at) {
        // 이메일 인증이 필요한 경우
        const confirmationMessage =
          '회원가입이 완료되었습니다. 이메일을 확인하여 계정을 활성화해주세요.';
        setError(confirmationMessage);
        return { success: true };
      }

      return { success: true };
    } catch (err) {
      let errorMessage = dict.auth?.signup?.signupError || '회원가입 중 오류가 발생했습니다';

      if (err instanceof Error) {
        // Supabase 에러 메시지 매핑
        if (err.message.includes('User already registered')) {
          errorMessage = '이미 가입된 이메일입니다.';
        } else if (err.message.includes('Password should be at least')) {
          errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
        } else if (err.message.includes('Invalid email')) {
          errorMessage = '올바른 이메일 주소를 입력해주세요.';
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
    signUpWithEmail,
    isLoading,
    error,
  };
}
