'use client';

import { useMutation } from '@tanstack/react-query';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Locale } from 'shared/config';
import { type SurveyAnswer } from '../api/entities/types';
import { extractHospitalIdFromRoomId } from 'features/consultation-chat/lib/chat-utils';

interface SubmitMedicalSurveyRequest {
  consultationId: string;
  answers: SurveyAnswer[];
  locale: Locale;
}

interface SubmitMedicalSurveyResponse {
  success: boolean;
  data?: {
    hospitalId: string;
    consultationId: string;
  };
  error?: string;
}

async function submitMedicalSurvey(
  request: SubmitMedicalSurveyRequest,
): Promise<SubmitMedicalSurveyResponse> {
  const response = await fetch('/api/medical-survey/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit medical survey');
  }

  return response.json();
}

interface UseSubmitMedicalSurveyOptions {
  consultationId: string;
  locale: Locale;
  cooldownDays?: number;
  onSuccess?: (hospitalId: string) => void;
  onError?: (error: Error) => void;
}

export function useSubmitMedicalSurvey({
  consultationId,
  locale,
  cooldownDays,
  onSuccess,
  onError,
}: UseSubmitMedicalSurveyOptions) {
  const router = useLocalizedRouter();

  return useMutation({
    mutationFn: (answers: SurveyAnswer[]) =>
      submitMedicalSurvey({
        consultationId,
        answers,
        locale,
      }),
    onSuccess: (data) => {
      if (data.success && data.data) {
        const hospitalId = data.data.hospitalId;

        // 로컬스토리지에 설문 완료 정보 저장
        const storageKey = `medical-survey-${consultationId}`;
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            completedAt: Date.now(),
            cooldownDays: cooldownDays || 0,
          }),
        );

        // 완료 페이지로 이동
        router.push(`/medical-survey/${consultationId}/complete`);
        onSuccess?.(hospitalId);
      }
    },
    onError: (error: Error) => {
      console.error('Failed to submit medical survey:', error);
      onError?.(error);
    },
  });
}
