'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { ProfileEditFloatingButton } from 'features/profile-edit';

interface PasswordChangeContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function PasswordChangeContentV2({ lang, dict }: PasswordChangeContentV2Props) {
  const handleComplete = () => {
    // TODO: Implement complete logic
  };

  const title = dict.my?.profile?.passwordChange?.title || '비밀번호 변경';
  const completeButtonLabel = dict.my?.profile?.passwordChange?.completeButton || '완료';

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2 title={title} fallbackUrl={`/${lang}/my`} backgroundColor='bg-white' />
      <div className='h-[58px]' />

      {/* Content area - placeholder for now */}
      <div className='p-5'>{/* Content will be added here */}</div>

      {/* Bottom spacing to prevent content overlap with floating button */}
      <div className='h-[112px]' />

      {/* Floating button section */}
      <ProfileEditFloatingButton label={completeButtonLabel} onClick={handleComplete} />
    </div>
  );
}
