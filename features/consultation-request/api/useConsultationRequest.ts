'use client';

import { useMutation } from '@tanstack/react-query';
import { type ConsultationFormData } from '../model/types';

interface ConsultationRequestData {
  hospitalId: string;
  name: string;
  gender: 'MALE' | 'FEMALE';
  ageGroup: string;
  phoneNumber: string;
  preferredDate: string;
  content: string;
}

interface ConsultationRequestResponse {
  success: boolean;
  data?: {
    hospitalId: string;
    messageCount: number;
  };
  error?: string;
}

const submitConsultationRequest = async (
  data: ConsultationRequestData,
): Promise<ConsultationRequestResponse> => {
  const response = await fetch('/api/consultation-messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit consultation request');
  }

  return response.json();
};

export function useConsultationRequest() {
  return useMutation({
    mutationFn: submitConsultationRequest,
    onSuccess: (data) => {
      console.log('상담신청 성공:', data);
    },
    onError: (error) => {
      console.error('상담신청 실패:', error);
    },
  });
}

export type { ConsultationRequestData, ConsultationRequestResponse };
