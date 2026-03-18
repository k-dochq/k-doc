'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openDrawer } from 'shared/lib/drawer';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';
import { K_DOC_TEST_HOSPITAL_ID } from 'entities/hospital/api/entities/types';

async function sendConciergeConsultationMessage(content: string): Promise<void> {
  const res = await fetch('/api/concierge/consultation-messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, senderType: 'ADMIN' }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? 'SEND_FAILED');
  }
}

/**
 * 컨시어지 "Start Free Consultation" / "Go Premium" 버튼 공통 액션 훅.
 * - 미인증: LoginRequiredDrawer 표시
 * - 인증됨: 상담 메시지 전송 → 채팅 페이지 이동
 */
export function useConciergeConsultation(lang: Locale, dict: Dictionary) {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const content = dict.concierge.consultationMessage;
      return sendConciergeConsultationMessage(content);
    },
    onSuccess: () => {
      router.push(`/${lang}/chat/${K_DOC_TEST_HOSPITAL_ID}`);
    },
    onError: (error: Error) => {
      // 세션 만료 등 인증 오류 → 로그인 드로어 표시
      if (error.message === 'UNAUTHORIZED') {
        openDrawer({ content: <LoginRequiredDrawer lang={lang} dict={dict} /> });
      }
    },
  });

  const handleConsult = () => {
    if (isAuthLoading || isPending) return;

    if (!user) {
      openDrawer({ content: <LoginRequiredDrawer lang={lang} dict={dict} /> });
      return;
    }

    mutate();
  };

  return {
    handleConsult,
    isLoading: isAuthLoading || isPending,
  };
}
