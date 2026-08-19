'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openDrawer } from 'shared/lib/drawer';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';
import { K_DOC_TEST_HOSPITAL_ID } from 'entities/hospital/api/entities/types';

import { sendConsultationMessage } from '../api/sendConsultationMessage';
import { savePendingConsult } from './pendingConsult';

export interface ConsultationEntryParams {
  lang: Locale;
  dict: Dictionary;
  /** 채팅방 진입과 함께 자동으로 남길 안내 메시지 */
  message: string;
  /** 로그인 완료 후 돌아올 경로 — 이 경로에서 실제 발송이 일어난다 */
  redirectPath: string;
  /** 대기 중인 메시지를 담아둘 sessionStorage 키 */
  storageKey: string;
}

/**
 * 상담 진입 버튼의 공통 동작.
 *
 * - 로그인 상태: 안내 메시지를 먼저 저장하고 채팅방으로 이동
 * - 비로그인: 메시지를 sessionStorage 에 맡기고 로그인 드로어 → 복귀 경로에서 발송
 *
 * 컨시어지와 이벤트 페이지가 같은 흐름을 쓰므로 여기로 모았다.
 * 진입점마다 다른 것은 메시지 · 복귀 경로 · 저장 키뿐이다.
 */
export function useConsultationEntry({
  lang,
  dict,
  message,
  redirectPath,
  storageKey,
}: ConsultationEntryParams) {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: () => sendConsultationMessage(message),
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
      savePendingConsult(storageKey, { content: message, lang });
      openDrawer({
        content: <LoginRequiredDrawer lang={lang} dict={dict} redirectPath={redirectPath} />,
      });
      return;
    }

    mutate();
  };

  return {
    handleConsult,
    isLoading: isAuthLoading || isPending,
  };
}
