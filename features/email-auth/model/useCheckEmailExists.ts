'use client';

import { useMutation } from '@tanstack/react-query';

interface CheckEmailRequest {
  email: string;
}

interface CheckEmailResponse {
  success: boolean;
  exists?: boolean;
  error?: string;
}

/**
 * 이메일 존재 여부 확인을 위한 TanStack Query mutation
 */
export function useCheckEmailExists() {
  return useMutation({
    mutationFn: async (data: CheckEmailRequest): Promise<CheckEmailResponse> => {
      const response = await fetch('/api/email/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to check email');
      }

      const result: CheckEmailResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to check email');
      }

      return result;
    },
    onError: (error) => {
      console.error('이메일 체크 실패:', error);
    },
  });
}
