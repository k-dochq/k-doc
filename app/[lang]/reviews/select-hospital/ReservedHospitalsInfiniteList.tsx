'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useInfiniteReservedHospitals } from 'entities/reservation';
import { HospitalCard } from 'entities/hospital/ui/HospitalCard';
import { LocaleLink } from 'shared/ui/locale-link';
import { ErrorState } from 'shared/ui/error-state';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { ReservedHospitalsSkeleton } from './ReservedHospitalsSkeleton';
import { EmptyReservedHospitalsState } from './EmptyReservedHospitalsState';
import { type ReservedHospitalData } from 'entities/reservation';
import { type HospitalCardData } from 'shared/model/types';

interface ReservedHospitalsInfiniteListProps {
  lang: Locale;
  dict: Dictionary;
}

/**
 * ReservedHospitalData를 HospitalCardData로 변환
 */
function convertReservedHospitalToCardData(
  reservedHospital: ReservedHospitalData,
): HospitalCardData {
  return {
    id: reservedHospital.id,
    name: reservedHospital.name,
    address: reservedHospital.address,
    rating: reservedHospital.rating,
    reviewCount: reservedHospital.reviewCount,
    bookmarkCount: reservedHospital.bookmarkCount,
    thumbnailImageUrl: reservedHospital.thumbnailUrl,
    medicalSpecialties: reservedHospital.specialties.map((specialty) => ({
      id: specialty.id,
      name: specialty.name,
      specialtyType: specialty.type,
    })),
    ranking: null,
    likedUserIds: [],
    displayLocationName: null,
    prices: null,
    discountRate: null,
  };
}

export function ReservedHospitalsInfiniteList({ lang, dict }: ReservedHospitalsInfiniteListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteReservedHospitals({
      limit: 10,
    });

  // 로딩 상태
  if (isLoading) {
    return <ReservedHospitalsSkeleton />;
  }

  // 에러 상태
  if (isError) {
    return (
      <ErrorState
        title={dict.reviewWrite?.selectHospital?.error?.title || 'Unable to load hospital data'}
        message={dict.reviewWrite?.selectHospital?.error?.message || 'Please try again'}
        onRetry={() => window.location.reload()}
        className='py-12'
      />
    );
  }

  // 데이터 플래튼 및 타입 변환
  const allReservedHospitals = data?.pages.flatMap((page) => page.hospitals) || [];
  const convertedHospitals = allReservedHospitals.map(convertReservedHospitalToCardData);

  return (
    <div>
      {/* 병원 리스트 */}
      {convertedHospitals.length > 0 ? (
        <div className='space-y-6 p-5'>
          {convertedHospitals.map((hospital) => (
            <LocaleLink key={hospital.id} href={`/hospital/${hospital.id}`} className='block'>
              <HospitalCard
                hospital={hospital}
                dict={dict}
                lang={lang}
                user={null}
                showLikeButton={false}
              />
            </LocaleLink>
          ))}

          {/* 무한 스크롤 트리거 */}
          <InfiniteScrollTrigger
            onIntersect={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            loadingText={
              dict.reviewWrite?.selectHospital?.infiniteScroll?.loading ||
              'Loading more hospitals...'
            }
            endText={
              dict.reviewWrite?.selectHospital?.infiniteScroll?.end || 'All hospitals loaded'
            }
          />
        </div>
      ) : (
        <EmptyReservedHospitalsState lang={lang} dict={dict} />
      )}
    </div>
  );
}
