'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeader } from 'shared/ui/page-header';
import { ProfileEditForm } from 'features/profile-edit';

interface ProfileEditContentProps {
  lang: Locale;
  dict: Dictionary;
}

export function ProfileEditContent({ lang, dict }: ProfileEditContentProps) {
  return (
    <div>
      <PageHeader
        title={dict.my?.profile?.edit?.title || '프로필 수정'}
        lang={lang}
        variant='light'
      />
      <ProfileEditForm lang={lang} dict={dict} />
    </div>
  );
}
