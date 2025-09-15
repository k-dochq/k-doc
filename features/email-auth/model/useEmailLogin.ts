'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface UseEmailLoginParams {
  locale: Locale;
  dict: Dictionary;
}

interface UseEmailLoginReturn {
  signInWithEmail: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

export function useEmailLogin({ locale, dict }: UseEmailLoginParams): UseEmailLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithEmail = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: 실제 이메일 로그인 로직 구현
      console.log('Email login:', { email, password, locale });

      // 임시로 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : dict.auth?.login?.loginError || '로그인 중 오류가 발생했습니다';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithEmail,
    isLoading,
    error,
  };
}
