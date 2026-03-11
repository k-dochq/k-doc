'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useUserProfile, useProfileImageUpload } from 'features/user-profile';
import { ProfileSectionV2Skeleton } from './ProfileSectionV2Skeleton';
import { ProfileAvatarButton } from './ProfileAvatarButton';
import { ProfileSectionInfo } from './ProfileSectionInfo';

interface ProfileSectionV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ProfileSectionV2({ lang, dict }: ProfileSectionV2Props) {
  const { data: user, isLoading } = useUserProfile();
  const { uploadProfileImage, isUploading, error: uploadError } = useProfileImageUpload(user?.id);

  const displayName = user?.nickName || user?.displayName || user?.name || 'User';
  const displayEmail = user?.email || 'user@example.com';

  const handleFileChange = (file: File) => {
    uploadProfileImage(file).catch(() => {
      // Error handled by hook / onError
    });
  };

  if (isLoading) {
    return <ProfileSectionV2Skeleton />;
  }

  return (
    <div className='flex w-full items-center gap-4'>
      <ProfileAvatarButton
        profileImgUrl={user?.profileImgUrl}
        isUploading={isUploading}
        onFileChange={handleFileChange}
      />
      <ProfileSectionInfo
        displayName={displayName}
        displayEmail={displayEmail}
        uploadError={uploadError ?? null}
      />
    </div>
  );
}
