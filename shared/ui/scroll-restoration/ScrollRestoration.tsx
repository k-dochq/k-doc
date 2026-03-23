'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * iOS Safari production 환경에서 발생하는 스크롤 위치 버그 수정
 *
 * 원인: history.scrollRestoration='auto'(기본값) 상태에서
 * production 번들 청크 로딩 지연 동안 iOS Safari가 스크롤 위치를
 * 자동 복원하여 Next.js의 scroll-to-top과 충돌
 */
export function ScrollRestoration() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
