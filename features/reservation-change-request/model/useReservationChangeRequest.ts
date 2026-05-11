'use client';

import { useMutation } from '@tanstack/react-query';

interface ChangeRequestParams {
  reservationId: string;
  requestedDate: string;
  requestedTime: string;
}

interface ChangeRequestResponse {
  success: boolean;
  error?: string;
}

export function useReservationChangeRequest() {
  return useMutation<ChangeRequestResponse, Error, ChangeRequestParams>({
    mutationFn: async ({ reservationId, requestedDate, requestedTime }) => {
      const response = await fetch(`/api/reservations/${reservationId}/change-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestedDate, requestedTime }),
      });

      const data: ChangeRequestResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'CHANGE_REQUEST_FAILED');
      }

      return data;
    },
  });
}
