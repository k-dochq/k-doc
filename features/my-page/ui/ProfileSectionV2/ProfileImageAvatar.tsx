'use client';

import { type ChangeEventHandler, type RefObject } from 'react';
import { ProfileAvatarButton } from './ProfileAvatarButton';

interface ProfileImageAvatarProps {
  profileImgUrl: string | null | undefined;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  onAvatarClick: () => void;
  isBusy: boolean;
}

export function ProfileImageAvatar({
  profileImgUrl,
  fileInputRef,
  onFileChange,
  onAvatarClick,
  isBusy,
}: ProfileImageAvatarProps) {
  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        aria-hidden
        onChange={onFileChange}
      />
      <ProfileAvatarButton profileImgUrl={profileImgUrl} isBusy={isBusy} onClick={onAvatarClick} />
    </>
  );
}
