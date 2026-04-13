'use client';

import { useEffect, useRef } from 'react';

/**
 * 컴포넌트가 마운트될 때 한 번 해당 아티클(slug)의 조회수를 +1 증가시킵니다.
 * React StrictMode의 double-mount를 막기 위해 ref로 가드합니다.
 */
export function useIncrementTipView(slug: string) {
  const incrementedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!slug || incrementedRef.current === slug) return;
    incrementedRef.current = slug;

    fetch(`/api/tips/${slug}/views`, { method: 'POST' }).catch((err) => {
      console.warn('Failed to increment tip view count:', err);
    });
  }, [slug]);
}
