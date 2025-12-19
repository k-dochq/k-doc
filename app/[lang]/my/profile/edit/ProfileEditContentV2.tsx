'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { ProfileEditFloatingButton, ProfileEditFormV2 } from 'features/profile-edit';

interface ProfileEditContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ProfileEditContentV2({ lang, dict }: ProfileEditContentV2Props) {
  const formId = 'profile-edit-form-v2';

  const handleSave = () => {
    // Form submit 트리거
    const form = document.getElementById(formId) as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  const title = dict.my?.profile?.edit?.title || '프로필 수정';
  const saveButtonLabel = dict.my?.profile?.edit?.saveButton || '저장';

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2 title={title} fallbackUrl={`/${lang}/my`} backgroundColor='bg-white' />
      <div className='h-[58px]' />

      {/* Content area */}
      <ProfileEditFormV2 lang={lang} dict={dict} formId={formId} />

      {/* Bottom spacing to prevent content overlap with floating button */}
      <div className='h-[112px]' />

      {/* Floating button section */}
      <ProfileEditFloatingButton label={saveButtonLabel} onClick={handleSave} />
    </div>
  );
}
