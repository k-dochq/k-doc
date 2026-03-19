'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { type Locale } from 'shared/config';
import { useAuth } from 'shared/lib/auth/useAuth';
import { K_DOC_TEST_HOSPITAL_ID } from 'entities/hospital/api/entities/types';

const PENDING_CONSULT_KEY = 'pending_concierge_consult';

interface PendingConsult {
  content: string;
  lang: Locale;
}

interface ConsultRedirectContentProps {
  lang: Locale;
}

export function ConsultRedirectContent({ lang }: ConsultRedirectContentProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace(`/${lang}/concierge`);
      return;
    }

    const raw = sessionStorage.getItem(PENDING_CONSULT_KEY);

    if (!raw) {
      router.replace(`/${lang}/chat/${K_DOC_TEST_HOSPITAL_ID}`);
      return;
    }

    const pending = JSON.parse(raw) as PendingConsult;
    sessionStorage.removeItem(PENDING_CONSULT_KEY);

    fetch('/api/concierge/consultation-messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: pending.content, senderType: 'ADMIN' }),
    }).finally(() => {
      router.replace(`/${pending.lang}/chat/${K_DOC_TEST_HOSPITAL_ID}`);
    });
  }, [user, isLoading, lang, router]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Loader2 className='h-8 w-8 animate-spin text-[#7657ff]' />
    </div>
  );
}
