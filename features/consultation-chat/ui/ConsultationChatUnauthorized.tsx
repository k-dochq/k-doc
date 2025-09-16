'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeader } from 'shared/ui/page-header';

interface ConsultationChatUnauthorizedProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationChatUnauthorized({ lang, dict }: ConsultationChatUnauthorizedProps) {
  return (
    <div className='flex h-screen flex-col'>
      <PageHeader
        lang={lang}
        title={dict.consultation?.chat || '상담채팅'}
        fallbackUrl={`/${lang}/consultation`}
        variant='light'
      />
      <div className='flex flex-1 items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 text-6xl'>🔒</div>
          <h2 className='mb-2 text-xl font-semibold text-gray-700'>로그인이 필요합니다</h2>
          <p className='text-gray-500'>상담채팅을 이용하려면 로그인해주세요.</p>
        </div>
      </div>
    </div>
  );
}
