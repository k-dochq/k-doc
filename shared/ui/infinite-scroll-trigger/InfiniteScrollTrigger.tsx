'use client';

import { useEffect, useRef, useCallback } from 'react';

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
            <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500'></div>
            <span className='text-sm text-white'>{loadingText}</span>
          </div>
        </div>
      )}
      {/* {!hasNextPage && <div className='text-center text-sm text-gray-500'>{endText}</div>} */}
    </div>
  );
}
