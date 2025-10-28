'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { PenSquare } from 'lucide-react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ReviewWriteFABProps {
  lang: Locale;
  dict: Dictionary;
}

export function ReviewWriteFAB({ lang, dict }: ReviewWriteFABProps) {
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

    // 병원 선택 페이지로 이동
    router.push('/reviews/select-hospital');
  };

  return (
    <div
      className={`floating-action-container pointer-events-none fixed right-0 bottom-20 left-0 z-40 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-32'
      }`}
    >
      <div className='mx-auto max-w-[500px] px-6'>
        <button
          onClick={handleClick}
          disabled={isLoading}
          className='pointer-events-auto mx-auto flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 text-white shadow-lg transition-all duration-200 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50'
          aria-label={dict.reviewWrite?.fab?.ariaLabel || '시술후기 작성'}
        >
          <PenSquare size={20} />
          <span className='text-sm font-semibold'>
            {dict.reviewWrite?.fab?.buttonText || '시술후기 쓰기'}
          </span>
        </button>
      </div>
    </div>
  );
}
