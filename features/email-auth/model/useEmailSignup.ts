'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

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
      // TODO: 실제 이메일 회원가입 로직 구현
      console.log('Email signup:', { email, password, locale });

      // 임시로 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : dict.auth?.signup?.signupError || '회원가입 중 오류가 발생했습니다';
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
