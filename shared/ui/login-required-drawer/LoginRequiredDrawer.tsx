'use client';

import Image from 'next/image';
import { type Locale } from 'shared/config';
import { closeDrawer } from 'shared/lib/drawer';

interface LoginRequiredDrawerProps {
  lang: Locale;
}

/**
 * 로그인 필요 시 표시되는 Drawer 컴포넌트
 * openDrawer의 content로 사용됩니다.
 */
export function LoginRequiredDrawer({ lang }: LoginRequiredDrawerProps) {
  // 한국어, 영어일 때는 영어 이미지, 태국어일 때는 태국어 이미지
  const imagePath =
    lang === 'th'
      ? '/images/login-required/login_required_background_th.png'
      : '/images/login-required/login_required_background_en.png';

  const handleClose = () => {
    closeDrawer();
  };

  return (
    <div className='relative flex flex-col bg-white'>
      {/* 닫기 버튼 */}
      <button
        onClick={handleClose}
        className='absolute top-[-50px] right-0 z-10 flex items-center justify-center'
        aria-label='닫기'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
        >
          <path
            d='M16 16L8 8M16 16L24 24M16 16L24 8M16 16L8 24'
            stroke='#A3A3A3'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {/* 첫 번째 섹션: 배경 이미지 */}
      <div className='relative w-full' style={{ aspectRatio: '375/272' }}>
        <Image src={imagePath} alt='Login Required' fill className='object-cover' priority />
      </div>
    </div>
  );
}
