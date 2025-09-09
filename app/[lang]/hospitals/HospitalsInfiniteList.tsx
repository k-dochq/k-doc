'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { interpolateTemplate } from 'shared/lib';
import { HospitalListCard } from 'entities/hospital';
import { useInfiniteHospitals } from 'entities/hospital/model/useInfiniteHospitals';
import { HospitalSortSelector, type SortOption } from 'features/hospital-sort';
import { HospitalsSkeleton } from './HospitalsSkeleton';

interface HospitalsInfiniteListProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    sortBy?: string;
    specialtyType?: string;
    minRating?: string;
  };
}

export function HospitalsInfiniteList({ lang, dict, searchParams }: HospitalsInfiniteListProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const { sortBy = 'createdAt', specialtyType, minRating = '0' } = searchParams;

  // 파라미터 변환
  const queryParams = {
    limit: 10,
    sortBy: sortBy as 'createdAt' | 'viewCount',
    sortOrder: 'desc' as const,
    specialtyType: specialtyType as MedicalSpecialtyType | undefined,
    minRating: parseFloat(minRating),
  };

  // 정렬 변경 핸들러
  const handleSortChange = useCallback(
    (newSort: SortOption) => {
      const params = new URLSearchParams(currentSearchParams.toString());
      params.set('sortBy', newSort);
      params.set('sortOrder', 'desc'); // 기본값으로 desc 설정
      router.push(`/${lang}/hospitals?${params.toString()}`);
    },
    [currentSearchParams, router, lang],
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
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
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='text-center'>
          <p className='mb-4 text-red-500'>
            {error instanceof Error ? error.message : '데이터를 불러오는 중 오류가 발생했습니다.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 데이터 플래튼 및 중복 제거
  const allHospitals = data?.pages.flatMap((page) => page.hospitals) || [];

  // 중복된 병원 ID 제거 (같은 병원이 여러 페이지에 나타나는 것을 방지)
  const uniqueHospitals = allHospitals.filter(
    (hospital, index, array) => array.findIndex((h) => h.id === hospital.id) === index,
  );

  const totalCount = data?.pages[0]?.totalCount || 0;

  return (
    <div>
      {/* 총 개수 */}
      <div className='mb-4'>
        <p className='text-sm text-gray-600'>
          {interpolateTemplate(dict.hospitals.totalCount, { count: totalCount })}
        </p>
      </div>

      {/* 정렬 선택기 */}
      <HospitalSortSelector currentSort={sortBy as SortOption} onSortChange={handleSortChange} />

      {/* 병원 리스트 */}
      {uniqueHospitals.length > 0 ? (
        <div className='space-y-4'>
          {uniqueHospitals.map((hospital) => (
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
            {!hasNextPage && uniqueHospitals.length > 0 && (
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
