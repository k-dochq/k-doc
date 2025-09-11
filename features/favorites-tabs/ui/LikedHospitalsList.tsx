'use client';

import { useEffect, useRef, useCallback } from 'react';
import { type Locale } from 'shared/config';
import { HospitalListCard } from 'entities/hospital';
import { useInfiniteLikedHospitals } from '../model/useInfiniteLikedHospitals';

interface LikedHospitalsListProps {
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

export function LikedHospitalsList({ lang, dict }: LikedHospitalsListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteLikedHospitals({ limit: 10 });

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
    return (
      <div className='space-y-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='animate-pulse'>
            <div className='rounded-lg border border-gray-200 bg-white p-4'>
              <div className='flex space-x-4'>
                <div className='h-20 w-20 rounded-lg bg-gray-200'></div>
                <div className='flex-1 space-y-2'>
                  <div className='h-4 w-3/4 rounded bg-gray-200'></div>
                  <div className='h-3 w-1/2 rounded bg-gray-200'></div>
                  <div className='h-3 w-2/3 rounded bg-gray-200'></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='text-center'>
          <p className='mb-4 text-red-500'>{error instanceof Error ? error.message : dict.error}</p>
          <button
            onClick={() => window.location.reload()}
            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            {dict.retry}
          </button>
        </div>
      </div>
    );
  }

  // 데이터 플래튼 및 중복 제거
  const allHospitals = data?.pages.flatMap((page) => page.hospitals) || [];

  // 중복된 병원 ID 제거
  const uniqueHospitals = allHospitals.filter(
    (hospital, index, array) => array.findIndex((h) => h.id === hospital.id) === index,
  );

  // 빈 상태
  if (uniqueHospitals.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='text-center'>
          <div className='mb-4 text-6xl'>💙</div>
          <h3 className='mb-2 text-lg font-medium text-gray-900'>{dict.empty.title}</h3>
          <p className='text-gray-500'>{dict.empty.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* 병원 리스트 */}
      {uniqueHospitals.map((hospital) => (
        <HospitalListCard key={hospital.id} hospital={hospital} lang={lang} />
      ))}

      {/* 무한 스크롤 트리거 */}
      <div ref={loadMoreRef} className='py-4'>
        {isFetchingNextPage && (
          <div className='flex justify-center'>
            <div className='flex items-center space-x-2'>
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500'></div>
              <span className='text-sm text-gray-500'>{dict.loadingMore}</span>
            </div>
          </div>
        )}
        {!hasNextPage && uniqueHospitals.length > 0 && (
          <div className='text-center text-sm text-gray-500'>{dict.allLoaded}</div>
        )}
      </div>
    </div>
  );
}
