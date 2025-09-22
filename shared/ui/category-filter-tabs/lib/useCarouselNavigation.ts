'use client';

import { useState, useEffect } from 'react';
import { type CarouselApi } from 'shared/ui/carousel';

export function useCarouselNavigation(api: CarouselApi | undefined) {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    // 초기 상태 설정
    updateScrollState();

    // 스크롤 상태 변경 감지
    api.on('select', updateScrollState);

    return () => {
      api.off('select', updateScrollState);
    };
  }, [api]);

  const scrollPrev = () => {
    if (api && canScrollPrev) {
      // 더 많이 스크롤하기 위해 여러 번 호출
      api.scrollPrev();
      setTimeout(() => api.scrollPrev(), 50);
      setTimeout(() => api.scrollPrev(), 100);
    }
  };

  const scrollNext = () => {
    if (api && canScrollNext) {
      // 더 많이 스크롤하기 위해 여러 번 호출
      api.scrollNext();
      setTimeout(() => api.scrollNext(), 50);
      setTimeout(() => api.scrollNext(), 100);
    }
  };

  return {
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  };
}
