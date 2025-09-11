'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type GetAllReviewsResponse, type MedicalSpecialtyOption } from 'entities/review';
import { ReviewCard } from 'entities/review/ui';
import { useInfiniteAllReviews } from 'entities/review/model/useInfiniteAllReviews';
import { MedicalSpecialtyFilter, SortFilter } from 'features/review-filter';
import { AllReviewsSkeleton } from './AllReviewsSkeleton';

interface AllReviewsInfiniteListProps {
  lang: Locale;
  dict: Dictionary;
  specialties: MedicalSpecialtyOption[];
  initialData?: GetAllReviewsResponse;
}

export function AllReviewsInfiniteList({
  lang,
  dict,
  specialties,
  initialData: _initialData,
}: AllReviewsInfiniteListProps) {
  // 필터 상태
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  // 파라미터 설정
  const queryParams = {
    limit: 10,
    medicalSpecialtyId: selectedSpecialtyId,
    sortBy,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, refetch } =
    useInfiniteAllReviews(queryParams);

  // Intersection Observer를 위한 ref
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 무한 스크롤 로직
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
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

  // 필터 변경 핸들러
  const handleSpecialtyChange = (specialtyId?: string) => {
    setSelectedSpecialtyId(specialtyId);
  };

  const handleSortChange = (newSortBy: 'latest' | 'popular') => {
    setSortBy(newSortBy);
  };

  // 모든 페이지의 리뷰 데이터 합치기
  const allReviews = data?.pages.flatMap((page) => page.reviews) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  // 로딩 상태
  if (isLoading) {
    return <AllReviewsSkeleton />;
  }

  // 에러 상태
  if (error) {
    return (
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='text-center'>
          <p className='mb-4 text-gray-500'>
            {dict.allReviews?.retry || '리뷰를 불러오는 중 오류가 발생했습니다.'}
          </p>
          <button
            onClick={() => refetch()}
            className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            {dict.allReviews?.retry || '다시 시도'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* 필터 섹션 */}
      <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4'>
        {/* 부위별 필터 */}
        <MedicalSpecialtyFilter
          specialties={specialties}
          selectedSpecialtyId={selectedSpecialtyId}
          onSpecialtyChange={handleSpecialtyChange}
          lang={lang}
          dict={dict}
        />

        {/* 정렬 옵션 */}
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-sm text-gray-600'>총 {totalCount.toLocaleString()}개의 후기</div>
          <SortFilter sortBy={sortBy} onSortChange={handleSortChange} lang={lang} dict={dict} />
        </div>
      </div>

      {/* 리뷰 리스트 */}
      {allReviews.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-12'>
          <div className='text-center'>
            <h3 className='mb-2 text-lg font-medium text-gray-900'>
              {dict.allReviews?.empty?.title || '검색된 후기가 없습니다'}
            </h3>
            <p className='text-gray-500'>
              {dict.allReviews?.empty?.description || '다른 조건으로 검색해보세요.'}
            </p>
          </div>
        </div>
      ) : (
        <div className='space-y-6'>
          {allReviews.map((review) => (
            <ReviewCard key={review.id} review={review} lang={lang} dict={dict} />
          ))}

          {/* 무한 스크롤 트리거 */}
          <div ref={loadMoreRef} className='flex justify-center py-4'>
            {isFetchingNextPage ? (
              <div className='text-gray-500'>
                {dict.allReviews?.loadingMore || '더 많은 후기를 불러오는 중...'}
              </div>
            ) : hasNextPage ? (
              <div className='h-4' /> // 빈 공간 (Intersection Observer 트리거용)
            ) : allReviews.length > 0 ? (
              <div className='text-gray-500'>
                {dict.allReviews?.allLoaded || '모든 후기를 불러왔습니다.'}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
