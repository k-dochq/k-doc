'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { ProfileSectionV2 } from './ProfileSectionV2';
import { ActivityStatsSectionV2 } from './ActivityStatsSectionV2';
import { NotificationSectionV2 } from './NotificationSectionV2';

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
      <div className='h-[58px]' />
      <div className='p-5'>
        <ProfileSectionV2 lang={lang} dict={dict} />
        <div className='mt-5'>
          <ActivityStatsSectionV2 lang={lang} dict={dict} />
        </div>
        <div className='mt-5'>
          <NotificationSectionV2 lang={lang} dict={dict} />
        </div>
      </div>
    </div>
  );
}
