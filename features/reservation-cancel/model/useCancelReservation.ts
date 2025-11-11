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
      console.log('[useCancelReservation] 취소 요청 시작, reservationId:', reservationId);

      const url = `/api/reservations/${reservationId}/cancel`;
      console.log('[useCancelReservation] 요청 URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('[useCancelReservation] 응답 상태:', response.status, response.statusText);

      const data: CancelReservationResponse = await response.json();
      console.log('[useCancelReservation] 응답 데이터:', data);

      if (!response.ok) {
        console.error('[useCancelReservation] 요청 실패:', data);
        throw new Error(data.error || data.message || 'CANCEL_FAILED');
      }

      return data;
    },
  });
}
