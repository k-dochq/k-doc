'use client';

import { useState, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';

interface UsePasswordUpdateParams {
  locale: Locale;
  dict: Dictionary;
  tokenHash: string;
}

interface UsePasswordUpdateReturn {
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export function usePasswordUpdate({
  locale,
  dict,
  tokenHash,
}: UsePasswordUpdateParams): UsePasswordUpdateReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 토큰 검증 및 세션 설정
    const verifyToken = async () => {
      const supabase = createClient();

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'recovery',
        });

        if (error) {
          console.error('Error verifying token:', error);
          setError(dict.auth?.resetPassword?.sessionError || '토큰 검증 중 오류가 발생했습니다.');
        }
      } catch (err) {
        console.error('Error verifying token:', err);
        setError(dict.auth?.resetPassword?.sessionError || '토큰 검증 중 오류가 발생했습니다.');
      }
    };

    verifyToken();
  }, [tokenHash, dict]);

  const updatePassword = async (
    newPassword: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const supabase = createClient();

      // 비밀번호 업데이트
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        throw updateError;
      }

      setIsSuccess(true);
      return { success: true };
    } catch (err) {
      let errorMessage =
        dict.auth?.resetPassword?.updateError || '비밀번호 변경 중 오류가 발생했습니다';

      if (err instanceof Error) {
        // Supabase 에러 메시지 매핑
        if (err.message.includes('Password should be at least')) {
          errorMessage =
            dict.auth?.resetPassword?.errors?.passwordTooShort ||
            '비밀번호는 8자 이상이어야 합니다.';
        } else if (err.message.includes('Unable to validate email address')) {
          errorMessage =
            dict.auth?.resetPassword?.errors?.invalidSession ||
            '세션이 유효하지 않습니다. 다시 시도해주세요.';
        } else if (err.message.includes('Auth session missing')) {
          errorMessage =
            dict.auth?.resetPassword?.errors?.sessionMissing ||
            '인증 세션이 없습니다. 다시 시도해주세요.';
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
    updatePassword,
    isLoading,
    error,
    isSuccess,
  };
}
