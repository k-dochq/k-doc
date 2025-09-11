'use client';

import { useEffect, useRef, useCallback } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type GetHospitalReviewsResponse } from 'entities/review';
import { ReviewCard } from 'entities/review/ui';
import { useInfiniteHospitalReviews } from 'entities/review/model/useInfiniteHospitalReviews';
import { HospitalReviewsSkeleton } from './HospitalReviewsSkeleton';

interface HospitalReviewsInfiniteListProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
  initialData?: GetHospitalReviewsResponse;
}

export function HospitalReviewsInfiniteList({
  hospitalId,
  lang,
  dict,
  initialData: _initialData,
}: HospitalReviewsInfiniteListProps) {
  // 파라미터 설정
  const queryParams = {
    hospitalId,
    limit: 10,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteHospitalReviews(queryParams);

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

  // 로딩 상태
  if (isLoading) {
    return <HospitalReviewsSkeleton />;
  }

  // 에러 상태
  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='text-center'>
          <p className='mb-4 text-red-500'>
            {error instanceof Error ? error.message : '데이터를 불러오는 중 오류가 발생했습니다.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            {dict.hospitalReviews?.retry || '다시 시도'}
          </button>
        </div>
      </div>
    );
  }

  // 데이터 플래튼 및 중복 제거
  const allReviews = data?.pages.flatMap((page) => page.reviews) || [];

  // 중복된 리뷰 ID 제거
  const uniqueReviews = allReviews.filter(
    (review, index, array) => array.findIndex((r) => r.id === review.id) === index,
  );

  const totalCount = data?.pages[0]?.totalCount || 0;

  return (
    <div>
      {/* 총 개수 */}
      <div className='mb-6'>
        <p className='text-sm text-gray-600'>
          총 <span className='font-semibold text-gray-900'>{totalCount}</span>개의 후기
        </p>
      </div>

      {/* 리뷰 리스트 */}
      {uniqueReviews.length > 0 ? (
        <div className='space-y-6'>
          {uniqueReviews.map((review) => (
            <div
              key={review.id}
              className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'
            >
              <ReviewCard review={review} lang={lang} dict={dict} />
            </div>
          ))}

          {/* 무한 스크롤 트리거 */}
          <div ref={loadMoreRef} className='py-4'>
            {isFetchingNextPage && (
              <div className='flex justify-center'>
                <div className='flex items-center space-x-2'>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500'></div>
                  <span className='text-sm text-gray-500'>
                    {dict.hospitalReviews?.loadingMore || '더 많은 후기를 불러오는 중...'}
                  </span>
                </div>
              </div>
            )}
            {!hasNextPage && uniqueReviews.length > 0 && (
              <div className='text-center text-sm text-gray-500'>
                {dict.hospitalReviews?.allLoaded || '모든 후기를 불러왔습니다.'}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-12'>
          <div className='text-center'>
            <div className='mb-4'>
              <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
                <svg
                  className='h-6 w-6 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h6a2 2 0 002-2V8M9 12h6'
                  />
                </svg>
              </div>
            </div>
            <h3 className='mb-2 text-lg font-medium text-gray-900'>
              {dict.hospitalReviews?.empty?.title || '아직 후기가 없습니다'}
            </h3>
            <p className='text-gray-500'>
              {dict.hospitalReviews?.empty?.description || '첫 번째 후기를 작성해보세요.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
