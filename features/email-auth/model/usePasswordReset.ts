'use client';

import { useMutation } from '@tanstack/react-query';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';
import { useCheckEmailExists } from './useCheckEmailExists';

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
  const checkEmailMutation = useCheckEmailExists();
  const mutation = useMutation({
    mutationFn: async (email: string): Promise<{ success: boolean }> => {
      // 1) 이메일 존재 여부 사전 검증 (TanStack Query 사용)
      const checkResult = await checkEmailMutation.mutateAsync({ email });

      if (!checkResult.exists) {
        const notFoundMsg =
          dict.auth?.forgotPassword?.errors?.userNotFound ||
          '해당 이메일로 가입된 계정을 찾을 수 없습니다.';
        throw new Error(notFoundMsg);
      }

      // 2) 존재하는 경우에만 비밀번호 재설정 메일 전송
      const supabase = createClient();
      if (!supabase) {
        throw new Error('Supabase client 생성 실패');
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${locale}/auth/reset-password`,
      });

      if (resetError) {
        // Supabase 에러 메시지 매핑 후 throw
        if (resetError.message.includes('User not found')) {
          throw new Error(
            dict.auth?.forgotPassword?.errors?.userNotFound ||
              '해당 이메일로 가입된 계정을 찾을 수 없습니다.',
          );
        }
        if (resetError.message.includes('Email rate limit exceeded')) {
          throw new Error(
            dict.auth?.forgotPassword?.errors?.rateLimitExceeded ||
              '너무 많은 요청이 있었습니다. 잠시 후 다시 시도해주세요.',
          );
        }
        throw new Error(
          dict.auth?.forgotPassword?.resetError || '비밀번호 재설정 중 오류가 발생했습니다',
        );
      }

      return { success: true };
    },
  });

  const resetPassword = (email: string) =>
    mutation.mutateAsync(email).catch((err: Error) => {
      return { success: false, error: err.message } as { success: boolean; error?: string };
    });

  return {
    resetPassword,
    isLoading: mutation.isPending,
    error: (mutation.error as Error | null)?.message ?? null,
    isSuccess: mutation.isSuccess,
  };
}
