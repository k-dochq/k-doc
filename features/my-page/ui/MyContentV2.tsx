'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';

interface MyContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function MyContentV2({ lang, dict }: MyContentV2Props) {
  return (
    <div className='min-h-screen bg-neutral-100'>
      <PageHeaderV2
        title={dict.my?.title || '마이페이지'}
        fallbackUrl={`/${lang}/main`}
        backgroundColor='bg-neutral-100'
      />
      <div className='p-5'>{/* Content will be added later */}</div>
    </div>
  );
}
