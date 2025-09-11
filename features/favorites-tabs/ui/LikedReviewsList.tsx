'use client';

import { useEffect, useRef, useCallback } from 'react';
import { type Locale } from 'shared/config';
import { ReviewCard } from 'entities/review/ui/ReviewCard';
import { useInfiniteLikedReviews } from '../model/useInfiniteLikedReviews';
import type { Dictionary } from 'shared/model/types';

interface LikedReviewsListProps {
  lang: Locale;
  dict: {
    loading: string;
    error: string;
    retry: string;
    empty: {
      title: string;
      description: string;
    };
    loadingMore: string;
    allLoaded: string;
  };
}

export function LikedReviewsList({ lang, dict }: LikedReviewsListProps) {
  // 임시 dict 객체 - 실제로는 상위에서 전달받아야 함
  const reviewDict: Dictionary = {} as Dictionary;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteLikedReviews({ limit: 10 });

  // 무한 스크롤을 위한 Intersection Observer
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
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

  // 모든 페이지의 리뷰를 평탄화
  const allReviews = data?.pages.flatMap((page) => page.reviews) ?? [];

  // 로딩 상태
  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-center'>
          <div className='mb-4 text-4xl'>⏳</div>
          <p className='text-gray-500'>{dict.loading}</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-center'>
          <div className='mb-4 text-4xl'>❌</div>
          <p className='mb-4 text-gray-500'>{dict.error}</p>
          <button
            onClick={() => window.location.reload()}
            className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            {dict.retry}
          </button>
        </div>
      </div>
    );
  }

  // 빈 상태
  if (allReviews.length === 0) {
    return (
      <div className='py-8 text-center'>
        <div className='mb-4 text-6xl'>💭</div>
        <h3 className='mb-2 text-lg font-medium text-gray-900'>{dict.empty.title}</h3>
        <p className='text-gray-500'>{dict.empty.description}</p>
      </div>
    );
  }

  // 리뷰 목록 렌더링
  return (
    <div className='space-y-6'>
      {allReviews.map((review) => (
        <ReviewCard key={review.id} review={review} lang={lang} dict={reviewDict} />
      ))}

      {/* 무한 스크롤 트리거 */}
      <div ref={loadMoreRef} className='flex justify-center py-4'>
        {isFetchingNextPage ? (
          <div className='text-center'>
            <div className='mb-2 text-2xl'>⏳</div>
            <p className='text-sm text-gray-500'>{dict.loadingMore}</p>
          </div>
        ) : hasNextPage ? (
          <div className='h-4' /> // 스크롤 트리거용 빈 공간
        ) : allReviews.length > 0 ? (
          <div className='text-center'>
            <div className='mb-2 text-2xl'>✅</div>
            <p className='text-sm text-gray-500'>{dict.allLoaded}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
