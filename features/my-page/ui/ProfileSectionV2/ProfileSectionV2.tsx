'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useUserProfile } from 'features/user-profile';
import { ProfileSectionV2Skeleton } from './ProfileSectionV2Skeleton';
import { ProfileImageAvatar } from './ProfileImageAvatar';
import { ProfileSectionInfo } from './ProfileSectionInfo';
import { useProfileImageActions } from './useProfileImageActions';

interface ProfileSectionV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ProfileSectionV2({ lang: _lang, dict }: ProfileSectionV2Props) {
  const { data: user, isLoading } = useUserProfile();
  const { fileInputRef, handleFileChange, handleAvatarClick, isBusy, uploadError } =
    useProfileImageActions({
      userId: user?.id,
      profileImgUrl: user?.profileImgUrl,
      dict,
    });

  const displayName = user?.nickName || user?.displayName || user?.name || 'User';
  const displayEmail = user?.email || 'user@example.com';

  if (isLoading) {
    return <ProfileSectionV2Skeleton />;
  }

  return (
    <div className='flex w-full items-center gap-4'>
      <ProfileImageAvatar
        profileImgUrl={user?.profileImgUrl}
        fileInputRef={fileInputRef}
        onFileChange={handleFileChange}
        onAvatarClick={handleAvatarClick}
        isBusy={isBusy}
      />
      <ProfileSectionInfo
        displayName={displayName}
        displayEmail={displayEmail}
        uploadError={uploadError ?? null}
      />
    </div>
  );
}
