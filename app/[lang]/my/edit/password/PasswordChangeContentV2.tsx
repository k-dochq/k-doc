'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { ProfileEditFloatingButton, PasswordChangeFormV2 } from 'features/profile-edit';

interface PasswordChangeContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function PasswordChangeContentV2({ lang, dict }: PasswordChangeContentV2Props) {
  const formId = 'password-change-form-v2';
  const [isFormValid, setIsFormValid] = useState(false);

  const handleComplete = () => {
    // Form submit 트리거
    const form = document.getElementById(formId) as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  const title = dict.my?.profile?.passwordChange?.title || 'Change Password';
  const completeButtonLabel = dict.my?.profile?.passwordChange?.completeButton || 'Complete';

  return (
    <div className='min-h-screen bg-neutral-100'>
      <PageHeaderV2 title={title} fallbackUrl={`/${lang}/my`} backgroundColor='bg-neutral-100' />
      <div className='h-[58px]' />

      {/* Content area */}
      <PasswordChangeFormV2
        lang={lang}
        dict={dict}
        formId={formId}
        onFormValidChange={setIsFormValid}
      />

      {/* Bottom spacing to prevent content overlap with floating button */}
      <div className='h-[112px]' />

      {/* Floating button section */}
      <ProfileEditFloatingButton
        label={completeButtonLabel}
        onClick={handleComplete}
        disabled={!isFormValid}
      />
    </div>
  );
}
