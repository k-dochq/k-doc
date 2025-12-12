'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';
import { type Locale } from 'shared/config';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ReviewWriteFABV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ReviewWriteFABV2({ lang, dict }: ReviewWriteFABV2Props) {
  const router = useLocalizedRouter();
  const { user, isLoading } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  // 병원 선택 페이지 미리 로드
  useEffect(() => {
    router.prefetch('/reviews/select-hospital');
  }, [router]);

  // 스크롤 감지 (requestAnimationFrame으로 성능 최적화)
  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const lastScrollY = lastScrollYRef.current;

        // 스크롤 다운: 80px 이상 스크롤하고 이전보다 아래로 내려가면 숨김
        if (currentScrollY > 80 && currentScrollY > lastScrollY) {
          setIsVisible(false);
        }
        // 스크롤 업: 위로 올라가면 보임
        else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }

        lastScrollYRef.current = currentScrollY;
        tickingRef.current = false;
      });

      tickingRef.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClick = () => {
    // 로그인 확인
    if (!user) {
      openModal({
        content: (
          <LoginRequiredModal lang={lang} dict={dict} redirectPath={window.location.pathname} />
        ),
      });
      return;
    }

    // 병원 선택 페이지로 바로 이동
    router.push('/reviews/select-hospital');
  };

  return (
    <div
      className={`floating-action-container pointer-events-none fixed right-0 bottom-20 left-0 z-40 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-32'
      }`}
    >
      <div className={`mx-auto ${MAX_MOBILE_WIDTH_CLASS} px-6`}>
        <button
          onClick={handleClick}
          disabled={isLoading}
          className='pointer-events-auto mx-auto flex items-center justify-center gap-1 rounded-full bg-[#1A2E89] px-4 py-3 text-white shadow-lg transition-all duration-200 hover:bg-[#152570] hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50'
          aria-label={dict.reviewWrite?.fab?.ariaLabel || '시술후기 작성'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            className='shrink-0'
          >
            <path
              d='M13.5045 4.88749C13.6615 4.73046 13.7861 4.54402 13.8712 4.33882C13.9562 4.13363 14 3.91369 14 3.69158C14 3.46947 13.9563 3.24952 13.8713 3.0443C13.7864 2.83909 13.6618 2.65262 13.5048 2.49554C13.3477 2.33846 13.1613 2.21385 12.9561 2.12883C12.7509 2.0438 12.531 2.00003 12.3089 2C12.0868 1.99997 11.8668 2.04369 11.6616 2.12867C11.4564 2.21364 11.2699 2.3382 11.1128 2.49524L3.10517 10.5048C2.96586 10.6437 2.86284 10.8147 2.80517 11.0028L2.01256 13.6141C1.99705 13.666 1.99588 13.7211 2.00917 13.7736C2.02246 13.8261 2.04971 13.874 2.08804 13.9123C2.12637 13.9506 2.17433 13.9777 2.22686 13.9909C2.27938 14.0042 2.3345 14.0029 2.38636 13.9873L4.99819 13.1953C5.18609 13.1381 5.3571 13.0357 5.49619 12.8971L13.5045 4.88749Z'
              fill='white'
            />
            <path d='M8.60156 13.4005H13.4016H8.60156Z' fill='white' />
            <path
              d='M8.60156 13.4005H13.4016'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span className='text-sm leading-5 font-semibold'>
            {dict.reviewWrite?.fab?.buttonText || '시술후기 쓰기'}
          </span>
        </button>
      </div>
    </div>
  );
}
