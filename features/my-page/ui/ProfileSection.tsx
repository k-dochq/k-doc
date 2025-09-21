'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { useUserProfile } from 'features/user-profile';

interface ProfileSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function ProfileSection({ lang, dict }: ProfileSectionProps) {
  const { data: user, isLoading, error } = useUserProfile();

  // 사용자 정보가 로딩 중이거나 에러가 있을 때 기본값 표시
  const displayName = user?.nickName || user?.displayName || user?.name || '사용자';
  const displayEmail = user?.email || 'user@example.com';

  return (
    <div className='flex w-full flex-col gap-5'>
      {/* 프로필 헤더 - 클릭 가능한 전체 영역 */}
      <LocaleLink
        href='/my/profile/edit'
        className='flex w-full items-center gap-4 rounded-lg bg-white/50 p-4 transition-colors hover:bg-white/30'
      >
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gray-100'>
          <svg
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-gray-400'
          >
            <path
              d='M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-gray-900'>
            {isLoading ? '로딩 중...' : displayName}
          </h3>
          <p className='text-sm text-gray-500'>{isLoading ? '로딩 중...' : displayEmail}</p>
        </div>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='flex-shrink-0 text-gray-400'
        >
          <path
            d='M6 4L10 8L6 12'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </LocaleLink>
    </div>
  );
}
