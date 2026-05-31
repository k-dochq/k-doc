'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from 'shared/config';
import { isDismissed, dismiss } from '../lib/floating-cooldown';
import { KdocChatFloatingIcon } from './KdocChatFloatingIcon';

interface KdocFloatingButtonProps {
  lang: Locale;
}

export function KdocFloatingButton({ lang }: KdocFloatingButtonProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!isDismissed());
  }, []);

  if (!visible) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    dismiss();
    setVisible(false);
  };

  const handleClick = () => {
    router.push(`/${lang}/kdoc-chat`);
  };

  return (
    <button
      onClick={handleClick}
      className='fixed bottom-[88px] left-[max(20px,calc(50vw-230px))] z-[500] flex h-14 w-[236px] items-center gap-2 rounded-full px-4 py-2 shadow-[0px_2px_4px_rgba(0,0,0,0.2)]'
      style={{
        background: 'linear-gradient(94deg, #3E57E2 0%, #B133FF 40%, #FF5DCA 100%)',
      }}
      aria-label='K-DOC 무료 상담 시작하기'
    >
      {/* 채팅 아이콘 */}
      <KdocChatFloatingIcon className='h-10 w-10 shrink-0' />

      {/* 텍스트 */}
      <div className='flex flex-col items-start overflow-hidden'>
        <span className='whitespace-nowrap text-base font-semibold leading-6 text-white'>Free Consultation</span>
        <span className='whitespace-nowrap text-[11px] leading-[14px] text-white'>with K-DOC</span>
      </div>

      {/* X 닫기 버튼 */}
      <button
        onClick={handleClose}
        className='ml-auto shrink-0 p-1'
        aria-label='상담 버튼 닫기'
      >
        <svg
          width='9'
          height='9'
          viewBox='0 0 9 9'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M4.5 4.5L0.5 0.5M4.5 4.5L8.5 8.5M4.5 4.5L8.5 0.5M4.5 4.5L0.5 8.5'
            stroke='#F5F5F5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </button>
  );
}
