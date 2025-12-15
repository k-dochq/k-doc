'use client';

import { useMemo } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type User } from '@supabase/supabase-js';
import { HospitalDetailDoctorsV2 } from 'widgets/hospital-detail-doctors/ui/HospitalDetailDoctorsV2';
import { useInfiniteLikedDoctors } from 'features/favorites-tabs/model/useInfiniteLikedDoctors';
import { ErrorState } from 'shared/ui/error-state';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { EmptyFavoritesState } from 'shared/ui/empty-state';
import { type HospitalDoctor } from 'entities/hospital/api/entities/types';
import { FavoritesDoctorsTabV2Skeleton } from './FavoritesDoctorsTabV2Skeleton';

interface FavoritesDoctorsTabV2Props {
  lang: Locale;
  dict: Dictionary;
  user: User | null;
}

export function FavoritesDoctorsTabV2({ lang, dict }: FavoritesDoctorsTabV2Props) {
  // TanStack Query를 사용하여 좋아요한 의사 데이터 페칭
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteLikedDoctors({ limit: 10 });

  // 데이터 플래튼하여 HospitalDoctor 타입으로 변환 (hooks는 항상 같은 순서로 호출되어야 함)
  const allLikedDoctors = data?.pages.flatMap((page) => page.doctors) || [];
  const doctors: HospitalDoctor[] = useMemo(
    () =>
      allLikedDoctors.map((doctor) => ({
        id: doctor.id,
        name: doctor.name,
        position: doctor.position,
        description: doctor.description,
        genderType: doctor.genderType,
        hospital: doctor.hospital,
        doctorImages: doctor.doctorImages || [],
        medicalSpecialties: doctor.medicalSpecialties || [],
        order: doctor.order,
        createdAt: doctor.createdAt,
        updatedAt: doctor.updatedAt,
      })),
    [allLikedDoctors],
  );

  // 로딩 상태
  if (isLoading && !data) {
    return <FavoritesDoctorsTabV2Skeleton />;
  }

  // 에러 상태
  if (isError) {
    return (
      <ErrorState
        title={dict.favorites?.errorDoctors || '좋아요한 의사를 불러올 수 없습니다'}
        message={
          dict.favorites?.errorMessage || '네트워크 연결을 확인하고 잠시 후 다시 시도해주세요'
        }
        onRetry={() => refetch()}
        className='py-12'
      />
    );
  }

  // 빈 상태
  if (doctors.length === 0) {
    return <EmptyFavoritesState dict={dict} type='doctors' />;
  }

  return (
    <div className='p-5'>
      <HospitalDetailDoctorsV2
        doctors={doctors}
        lang={lang}
        dict={dict}
        showAllInitially={true}
        showTitle={false}
      />
      {/* 무한 스크롤 트리거 */}
      {hasNextPage && (
        <div className='mt-6'>
          <InfiniteScrollTrigger
            onIntersect={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            loadingText={dict.favorites?.loadingMoreDoctors || '더 많은 의사를 불러오는 중...'}
            endText={dict.favorites?.allLoadedDoctors || '모든 의사를 불러왔습니다.'}
          />
        </div>
      )}
    </div>
  );
}
