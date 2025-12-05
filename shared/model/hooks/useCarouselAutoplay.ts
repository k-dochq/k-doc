import { useEffect, useState } from 'react';
import { type CarouselApi } from 'shared/ui/carousel';

interface UseCarouselAutoplayOptions {
  /** Carousel API 인스턴스 */
  api: CarouselApi | undefined;
  /** 아이템 개수 */
  itemCount: number;
  /** 자동재생 간격 (밀리초, 기본값: 2500) */
  interval?: number;
  /** 자동재생 활성화 여부 (기본값: true) */
  enabled?: boolean;
}

/**
 * Carousel 자동재생 훅
 * 사용자 상호작용 중에는 자동재생을 일시정지합니다.
 */
export function useCarouselAutoplay({
  api,
  itemCount,
  interval = 2500,
  enabled = true,
}: UseCarouselAutoplayOptions) {
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // 사용자 상호작용 추적
  useEffect(() => {
    if (!api) return;

    const handlePointerDown = () => {
      setIsUserInteracting(true);
    };

    const handleSettle = () => {
      setIsUserInteracting(false);
    };

    api.on('pointerDown', handlePointerDown);
    api.on('settle', handleSettle);

    return () => {
      api.off('pointerDown', handlePointerDown);
      api.off('settle', handleSettle);
    };
  }, [api]);

  // 자동재생 기능
  useEffect(() => {
    if (!api || itemCount <= 1 || isUserInteracting || !enabled) {
      return;
    }

    const autoplayInterval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, interval);

    return () => clearInterval(autoplayInterval);
  }, [api, itemCount, isUserInteracting, interval, enabled]);
}
