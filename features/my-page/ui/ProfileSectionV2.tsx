'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { useUserProfile } from 'features/user-profile';
import { ArrowRightIcon } from 'features/terms-agreement/ui/AgreementIcons';

interface ProfileSectionV2Props {
  lang: Locale;
  dict: Dictionary;
}

function ProfileIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' fill='none'>
      <path
        d='M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z'
        fill='#FBCEFF'
      />
      <path
        d='M24 21.1368C24 25.7332 27.5893 29.4737 32 29.4737C36.4107 29.4737 40 25.7332 40 21.1368C40 16.5405 36.4107 12.8 32 12.8C27.5893 12.8 24 16.5405 24 21.1368ZM46.2222 48H48V46.1474C48 38.998 42.416 33.1789 35.5556 33.1789H28.4444C21.5822 33.1789 16 38.998 16 46.1474V48H46.2222Z'
        fill='#F58CFF'
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 28 28' fill='none'>
      <path
        d='M14 11.6672C12.103 11.6672 10.5 13.2702 10.5 15.1672C10.5 17.0642 12.103 18.6672 14 18.6672C15.897 18.6672 17.5 17.0642 17.5 15.1672C17.5 13.2702 15.897 11.6672 14 11.6672Z'
        fill='#A3A3A3'
      />
      <path
        d='M23.3379 7H20.3209L17.1627 3.84183C16.944 3.62303 16.6473 3.50007 16.3379 3.5H11.6712C11.3618 3.50007 11.0651 3.62303 10.8464 3.84183L7.68822 7H4.67122C3.38439 7 2.33789 8.0465 2.33789 9.33333V22.1667C2.33789 23.4535 3.38439 24.5 4.67122 24.5H23.3379C24.6247 24.5 25.6712 23.4535 25.6712 22.1667V9.33333C25.6712 8.0465 24.6247 7 23.3379 7ZM14.0046 21C10.8429 21 8.17122 18.3283 8.17122 15.1667C8.17122 12.005 10.8429 9.33333 14.0046 9.33333C17.1662 9.33333 19.8379 12.005 19.8379 15.1667C19.8379 18.3283 17.1662 21 14.0046 21Z'
        fill='#A3A3A3'
      />
    </svg>
  );
}

export function ProfileSectionV2({ lang, dict }: ProfileSectionV2Props) {
  const { data: user, isLoading, error } = useUserProfile();

  // 사용자 정보가 로딩 중이거나 에러가 있을 때 기본값 표시
  const displayName =
    user?.nickName || user?.displayName || user?.name || (lang === 'ko' ? '사용자' : 'User');
  const displayEmail = user?.email || 'user@example.com';

  if (isLoading) {
    return (
      <div className='flex w-full items-center gap-4'>
        {/* 프로필 아이콘 스켈레톤 */}
        <div className='size-[64px] shrink-0 animate-pulse rounded-full bg-neutral-200' />

        {/* 텍스트 영역 스켈레톤 */}
        <div className='flex min-w-0 flex-1 flex-col items-start gap-2'>
          <div className='h-7 w-32 animate-pulse rounded bg-neutral-200' />
          <div className='h-5 w-40 animate-pulse rounded bg-neutral-200' />
        </div>

        {/* 오른쪽 화살표 아이콘 스켈레톤 */}
        <div className='size-[20px] shrink-0 animate-pulse rounded bg-neutral-200' />
      </div>
    );
  }

  return (
    <LocaleLink href='/my/profile/edit' className='flex w-full items-center gap-4'>
      {/* 프로필 아이콘 영역 */}
      <div className='relative size-[64px] shrink-0'>
        <div className='absolute top-0 left-0 size-[64px] overflow-clip rounded-full bg-[#FBCEFF]'>
          <ProfileIcon />
        </div>
        {/* 카메라 배지 */}
        <div className='absolute right-0 bottom-0 flex size-[20px] items-center justify-center rounded-full bg-white shadow-[1px_2px_4px_0px_rgba(0,0,0,0.2)]'>
          <CameraIcon />
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className='flex min-w-0 flex-1 flex-col items-start'>
        <p className='w-full text-lg leading-[28px] font-semibold text-neutral-700'>
          {displayName}
        </p>
        <p className='w-full text-sm leading-[20px] font-normal text-neutral-500'>{displayEmail}</p>
      </div>

      {/* 오른쪽 화살표 아이콘 */}
      <div className='size-[20px] shrink-0 overflow-clip'>
        <ArrowRightIcon />
      </div>
    </LocaleLink>
  );
}
