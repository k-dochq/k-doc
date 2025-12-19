'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIconV2 } from 'shared/ui/icon/ArrowLeftIconV2';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';

interface PageHeaderV2Props {
  title: string;
  fallbackUrl?: string;
  rightContent?: React.ReactNode;
  className?: string;
  enableScrollTransparency?: boolean;
  backgroundColor?: string;
}

export function PageHeaderV2({
  title,
  fallbackUrl,
  rightContent,
  className = '',
  enableScrollTransparency = false,
  backgroundColor = 'bg-white',
}: PageHeaderV2Props) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const tickingRef = useRef(false);

  // 스크롤 감지 (requestAnimationFrame으로 성능 최적화)
  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollThreshold = 100;

        setIsScrolled(currentScrollY > scrollThreshold);
        tickingRef.current = false;
      });

      tickingRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!enableScrollTransparency) {
      return;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 초기 상태 설정
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, enableScrollTransparency]);

  const handleBack = () => {
    // 브라우저 히스토리가 있으면 뒤로가기, 없으면 fallbackUrl로 이동
    if (window.history.length > 1) {
      router.back();
    } else if (fallbackUrl) {
      router.push(fallbackUrl);
    }
  };

  const getHeaderStyles = () => {
    if (!enableScrollTransparency) {
      return {
        container: `border-b border-neutral-200 ${backgroundColor}`,
        text: 'text-neutral-700',
        button: 'hover:bg-neutral-100',
        title: 'opacity-100',
      };
    }

    if (isScrolled) {
      return {
        container: `border-b border-neutral-200 ${backgroundColor}`,
        text: 'text-neutral-700',
        button: 'hover:bg-neutral-100',
        title: 'opacity-100',
      };
    }

    return {
      container: 'border-b border-transparent bg-transparent',
      text: 'text-white',
      button: 'hover:bg-white/20',
      title: 'opacity-0',
    };
  };

  const styles = getHeaderStyles();

  return (
    <div
      className={`fixed top-0 left-1/2 z-50 flex h-[58px] w-full -translate-x-1/2 items-center justify-between px-5 transition-all duration-300 ${MAX_MOBILE_WIDTH_CLASS} ${styles.container} ${className}`}
    >
      <div className='flex items-center gap-1'>
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${styles.button}`}
        >
          <ArrowLeftIconV2 className={styles.text} width={24} height={24} />
        </button>
        {/* 제목 */}
        <h1
          className={`text-lg leading-tight font-semibold transition-opacity duration-300 ${styles.text} ${styles.title}`}
        >
          {title}
        </h1>
      </div>

      {/* 오른쪽 컨텐츠 (공유하기, 좋아요 버튼 등) */}
      {rightContent && (
        <div className={`flex items-center gap-3 ${styles.text}`}>{rightContent}</div>
      )}
    </div>
  );
}
