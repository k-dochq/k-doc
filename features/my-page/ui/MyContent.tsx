'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ProfileSection } from './ProfileSection';
import { ActivitySection } from './ActivitySection';
import { NotificationSection } from './NotificationSection';
import { CustomerServiceSection } from './CustomerServiceSection';
import { AccountSection } from './AccountSection';

interface MyContentProps {
  lang: Locale;
  dict: Dictionary;
}

export function MyContent({ lang, dict }: MyContentProps) {
  return (
    <div className='flex w-full flex-col px-4 py-6 pt-0'>
      {/* 프로필 섹션 */}
      <ProfileSection lang={lang} dict={dict} />

      {/* 구분선 */}
      <div className='my-6 border-t border-gray-200' />

      {/* 활동 섹션 */}
      <ActivitySection lang={lang} dict={dict} />

      {/* 구분선 */}
      <div className='my-6 border-t border-gray-200' />

      {/* 알림 섹션 */}
      <NotificationSection lang={lang} dict={dict} />

      {/* 구분선 */}
      <div className='my-6 border-t border-gray-200' />

      {/* 고객센터 섹션 */}
      <CustomerServiceSection lang={lang} dict={dict} />

      {/* 구분선 */}
      <div className='my-6 border-t border-gray-200' />

      {/* 계정 섹션 */}
      <AccountSection lang={lang} dict={dict} />
    </div>
  );
}
