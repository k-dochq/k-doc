'use client';

import { useEffect, useRef, useCallback } from 'react';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary, type HospitalSort } from 'shared/model/types';
import { HospitalListCard } from 'entities/hospital';
import { useInfiniteHospitals } from 'entities/hospital/model/useInfiniteHospitals';
import { HospitalsSkeleton } from './HospitalsSkeleton';
import { ErrorState } from 'shared/ui/error-state';

interface HospitalsInfiniteListProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: MedicalSpecialtyType;
    sort?: HospitalSort;
  };
}

export function HospitalsInfiniteList({ lang, dict, searchParams }: HospitalsInfiniteListProps) {
  const { category, sort } = searchParams;

  // 정렬 파라미터를 API 형식으로 변환
  const getSortParams = (sortType?: HospitalSort) => {
    switch (sortType) {
      case 'popular':
        return { sortBy: 'viewCount' as const, sortOrder: 'desc' as const };
      case 'recommended':
        return { sortBy: 'createdAt' as const, sortOrder: 'desc' as const };
      default:
        return { sortBy: 'viewCount' as const, sortOrder: 'desc' as const };
    }
  };

  const sortParams = getSortParams(sort);

  // 파라미터 변환
  const queryParams = {
    limit: 10,
    ...sortParams,
    specialtyType: category as MedicalSpecialtyType | undefined,
    minRating: 0,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteHospitals(queryParams);

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
    return <HospitalsSkeleton />;
  }

  // 에러 상태
  if (isError) {
    return (
      <ErrorState
        title='병원 데이터를 불러올 수 없습니다'
        message='네트워크 연결을 확인하고 잠시 후 다시 시도해주세요'
        onRetry={() => window.location.reload()}
        className='py-12'
      />
    );
  }

  // 데이터 플래튼
  const allHospitals = data?.pages.flatMap((page) => page.hospitals) || [];

  return (
    <div>
      {/* 병원 리스트 */}
      {allHospitals.length > 0 ? (
        <div className='space-y-4'>
          {allHospitals.map((hospital) => (
            <HospitalListCard key={hospital.id} hospital={hospital} lang={lang} />
          ))}

          {/* 무한 스크롤 트리거 */}
          <div ref={loadMoreRef} className='py-4'>
            {isFetchingNextPage && (
              <div className='flex justify-center'>
                <div className='flex items-center space-x-2'>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500'></div>
                  <span className='text-sm text-gray-500'>더 많은 병원을 불러오는 중...</span>
                </div>
              </div>
            )}
            {!hasNextPage && allHospitals.length > 0 && (
              <div className='text-center text-sm text-gray-500'>모든 병원을 불러왔습니다.</div>
            )}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-12'>
          <div className='text-center'>
            <p className='text-gray-500'>{dict.hospitals.empty.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
