'use client';

import { useMutation } from '@tanstack/react-query';
import { createClient } from 'shared/lib/supabase/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface UseDeleteAccountParams {
  locale: Locale;
  dict: Dictionary;
  onSuccess?: () => void;
}

interface UseDeleteAccountReturn {
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

export function useDeleteAccount({
  locale,
  dict,
  onSuccess,
}: UseDeleteAccountParams): UseDeleteAccountReturn {
  const mutation = useMutation({
    mutationFn: async (): Promise<{ success: boolean; error?: string }> => {
      try {
        const supabase = createClient();

        // API 엔드포인트로 사용자 삭제 요청
        const response = await fetch('/api/auth/delete-user', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || '회원탈퇴 중 오류가 발생했습니다.');
        }

        // 로그아웃 처리 (사용자가 이미 삭제되었으므로 에러가 발생할 수 있지만 무시)
        try {
          await supabase.auth.signOut();
        } catch (signOutError) {
          // 사용자가 이미 삭제되었으므로 로그아웃 에러는 무시
          console.log('사용자가 이미 삭제되어 로그아웃 처리를 건너뜁니다.');
        }

        return { success: true };
      } catch (err) {
        let errorMessage =
          dict.my?.account?.deleteAccountError ||
          '회원탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.';

        if (err instanceof Error) {
          errorMessage = err.message;
        }

        return { success: false, error: errorMessage };
      }
    },
    onSuccess: (result) => {
      if (result.success) {
        onSuccess?.();
        // 성공 시 로그인 페이지로 이동
        window.location.href = `/${locale}/auth/login`;
      }
    },
    onError: (error) => {
      console.error('회원탈퇴 실패:', error);
    },
  });

  return {
    deleteAccount: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
  };
}
