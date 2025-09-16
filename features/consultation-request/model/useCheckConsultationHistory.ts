'use client';

import { useMutation } from '@tanstack/react-query';

interface CheckConsultationHistoryRequest {
  hospitalId: string;
}

interface CheckConsultationHistoryResponse {
  hasHistory: boolean;
  consultationId: string | null;
}

export function useCheckConsultationHistory() {
  return useMutation({
    mutationFn: async (
      data: CheckConsultationHistoryRequest,
    ): Promise<CheckConsultationHistoryResponse> => {
      const response = await fetch('/api/consultation/check-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '상담 내역 확인에 실패했습니다.');
      }

      return response.json();
    },
    onError: (error) => {
      console.error('상담 내역 확인 실패:', error);
    },
  });
}
