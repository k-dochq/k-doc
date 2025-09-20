'use client';

import { useEffect, useRef, useCallback } from 'react';
import { LoadingIcon } from 'shared/ui/loading-icon/LoadingIcon';

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadingText?: string;
  endText?: string;
  className?: string;
}

export function InfiniteScrollTrigger({
  onIntersect,
  hasNextPage,
  isFetchingNextPage,
  loadingText = '더 많은 데이터를 불러오는 중...',
  endText = '모든 데이터를 불러왔습니다.',
  className = 'py-4',
}: InfiniteScrollTriggerProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        onIntersect();
      }
    },
    [onIntersect, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '100px',
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection]);

  return (
    <div ref={loadMoreRef} className={className}>
      {isFetchingNextPage && (
        <div className='flex justify-center'>
          <div className='flex items-center space-x-2'>
            <LoadingIcon size={16} className='text-white' />
            <span className='text-sm text-white'>{loadingText}</span>
          </div>
        </div>
      )}
    </div>
  );
}
