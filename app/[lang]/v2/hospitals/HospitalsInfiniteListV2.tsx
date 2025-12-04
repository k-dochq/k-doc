'use client';

import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import {
  type Dictionary,
  type HospitalSortOption,
  HOSPITAL_SORT_OPTIONS,
} from 'shared/model/types';
import { HospitalCardV2 } from 'entities/hospital/ui/HospitalCardV2';
import { convertHospitalsToCardData } from 'entities/hospital';
import { useInfiniteHospitals } from 'entities/hospital/model/useInfiniteHospitals';
import { HospitalsSkeletonV2 } from './HospitalsSkeletonV2';
import { ErrorState } from 'shared/ui/error-state';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { EmptyHospitalsState } from 'shared/ui/empty-state';

interface HospitalsInfiniteListV2Props {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: MedicalSpecialtyType;
    sort?: HospitalSortOption;
    search?: string;
    districtIds?: string[];
  };
}

export function HospitalsInfiniteListV2({
  lang,
  dict,
  searchParams,
}: HospitalsInfiniteListV2Props) {
  const { category, sort, search, districtIds } = searchParams;

  // 타입 안전한 파라미터 구성
  const queryParams = {
    limit: 10,
    sortBy: sort || HOSPITAL_SORT_OPTIONS.POPULAR,
    sortOrder: 'desc' as const,
    category,
    search,
    districtIds,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteHospitals(queryParams);

  // 로딩 상태
  if (isLoading) {
    return <HospitalsSkeletonV2 />;
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

  // 데이터 플래튼 및 타입 변환
  const allHospitals = data?.pages.flatMap((page) => page.hospitals) || [];
  const convertedHospitals = convertHospitalsToCardData(allHospitals);

  return (
    <div>
      {/* 병원 리스트 */}
      {convertedHospitals.length > 0 ? (
        <div className='px-5 py-[11px]'>
          {/* 2열 그리드 레이아웃 */}
          <div className='grid grid-cols-2 gap-x-[15px] gap-y-[16px]'>
            {convertedHospitals.map((hospital) => (
              <HospitalCardV2
                key={hospital.id}
                hospital={hospital}
                lang={lang}
                dict={dict}
                showHotTag={true}
              />
            ))}
          </div>

          {/* 무한 스크롤 트리거 */}
          <div className='mt-6'>
            <InfiniteScrollTrigger
              onIntersect={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              loadingText={dict.hospitals.infiniteScroll.loading}
              endText={dict.hospitals.infiniteScroll.end}
            />
          </div>
        </div>
      ) : (
        <EmptyHospitalsState dict={dict} />
      )}
    </div>
  );
}
