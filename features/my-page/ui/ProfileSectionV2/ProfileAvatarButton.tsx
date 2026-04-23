'use client';

import { ProfileIcon, CameraIcon } from './ProfileAvatarIcons';

interface ProfileAvatarButtonProps {
  profileImgUrl: string | null | undefined;
  isBusy: boolean;
  onClick: () => void;
}

export function ProfileAvatarButton({ profileImgUrl, isBusy, onClick }: ProfileAvatarButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={isBusy}
      className='relative size-[64px] shrink-0 cursor-pointer rounded-full border-0 p-0 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed'
      aria-label='프로필 사진 변경'
    >
      <div className='absolute inset-0 size-[64px] overflow-clip rounded-full bg-[#FBCEFF]'>
        {profileImgUrl ? (
          <img
            src={profileImgUrl}
            alt=''
            className='size-full object-cover'
            width={64}
            height={64}
          />
        ) : (
          <ProfileIcon />
        )}
      </div>
      {isBusy && (
        <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/30'>
          <span className='h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent' />
        </div>
      )}
      <div className='absolute right-0 bottom-0 flex size-[20px] items-center justify-center rounded-full bg-white shadow-[1px_2px_4px_0px_rgba(0,0,0,0.2)]'>
        <CameraIcon />
      </div>
    </button>
  );
}
