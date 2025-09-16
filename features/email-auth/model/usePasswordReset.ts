'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';

interface UsePasswordResetParams {
  locale: Locale;
  dict: Dictionary;
}

interface UsePasswordResetReturn {
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export function usePasswordReset({ locale, dict }: UsePasswordResetParams): UsePasswordResetReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const supabase = createClient();

      // 비밀번호 재설정 이메일 전송
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${locale}/auth/reset-password`,
      });

      if (resetError) {
        throw resetError;
      }

      setIsSuccess(true);
      return { success: true };
    } catch (err) {
      let errorMessage =
        dict.auth?.forgotPassword?.resetError || '비밀번호 재설정 중 오류가 발생했습니다';

      if (err instanceof Error) {
        // Supabase 에러 메시지 매핑
        if (err.message.includes('User not found')) {
          errorMessage =
            dict.auth?.forgotPassword?.errors?.userNotFound ||
            '해당 이메일로 가입된 계정을 찾을 수 없습니다.';
        } else if (err.message.includes('Email rate limit exceeded')) {
          errorMessage =
            dict.auth?.forgotPassword?.errors?.rateLimitExceeded ||
            '너무 많은 요청이 있었습니다. 잠시 후 다시 시도해주세요.';
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
    resetPassword,
    isLoading,
    error,
    isSuccess,
  };
}
