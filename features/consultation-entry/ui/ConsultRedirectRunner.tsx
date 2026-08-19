'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { type Locale } from 'shared/config';
import { useAuth } from 'shared/lib/auth/useAuth';
import { K_DOC_TEST_HOSPITAL_ID } from 'entities/hospital/api/entities/types';

import { sendConsultationMessage } from '../api/sendConsultationMessage';
import { takePendingConsult } from '../model/pendingConsult';

export interface ConsultRedirectRunnerProps {
  lang: Locale;
  /** 대기 중인 메시지를 담아둔 sessionStorage 키 */
  storageKey: string;
  /** 로그인이 끝내 확인되지 않았을 때 돌려보낼 경로 */
  fallbackPath: string;
}

/**
 * 로그인 직후 거쳐 가는 화면. 대기 중이던 안내 메시지를 발송하고 채팅방으로 보낸다.
 *
 * 발송 실패해도 채팅방으로는 보낸다 — 메시지 하나 때문에 사용자를 빈 화면에 세워둘 이유가 없다.
 */
export function ConsultRedirectRunner({
  lang,
  storageKey,
  fallbackPath,
}: ConsultRedirectRunnerProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace(fallbackPath);
      return;
    }

    const pending = takePendingConsult(storageKey);

    if (!pending) {
      router.replace(`/${lang}/chat/${K_DOC_TEST_HOSPITAL_ID}`);
      return;
    }

    sendConsultationMessage(pending.content)
      .catch(() => undefined)
      .finally(() => {
        router.replace(`/${pending.lang}/chat/${K_DOC_TEST_HOSPITAL_ID}`);
      });
  }, [user, isLoading, lang, router, storageKey, fallbackPath]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Loader2 className='h-8 w-8 animate-spin text-primary-900' />
    </div>
  );
}
