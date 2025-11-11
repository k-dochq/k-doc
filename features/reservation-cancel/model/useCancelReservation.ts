'use client';

import { useMutation } from '@tanstack/react-query';

interface CancelReservationResponse {
  success: boolean;
  data?: {
    requiresWebhook: boolean;
    message: string;
  };
  error?: string;
  message?: string;
  requestId?: string;
}

/**
 * 예약 취소 훅
 * TanStack Query의 useMutation을 사용하여 예약 취소 요청을 처리합니다.
 */
export function useCancelReservation() {
  return useMutation<CancelReservationResponse, Error, string>({
    mutationFn: async (reservationId: string) => {
      const response = await fetch(`/api/reservations/${reservationId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: CancelReservationResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'CANCEL_FAILED');
      }

      return data;
    },
  });
}
