'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useInfiniteReservedHospitals } from 'entities/reservation';
import { DoctorAffiliatedHospitalCardV2 } from 'widgets/doctor-affiliated-hospital/ui/DoctorAffiliatedHospitalCardV2';
import { LocaleLink } from 'shared/ui/locale-link';
import { ErrorState } from 'shared/ui/error-state';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { ReservedHospitalsSkeletonV2 } from './ReservedHospitalsSkeletonV2';
import { EmptyReservedHospitalsState } from './EmptyReservedHospitalsState';
import { type ReservedHospitalData } from 'entities/reservation';
import { type HospitalCardData, parseLocalizedText, parsePriceInfo } from 'shared/model/types';
import { getHospitalThumbnailImageUrl } from 'entities/hospital/lib/image-utils';
import { type DistrictCountryCode } from '@prisma/client';

interface ReservedHospitalsInfiniteListProps {
  lang: Locale;
  dict: Dictionary;
}

/**
 * ReservedHospitalData를 HospitalCardData로 변환
 * 리뷰 작성 페이지의 convertHospitalToCardData와 동일한 구조로 변환
 */
function convertReservedHospitalToCardData(
  reservedHospital: ReservedHospitalData,
): HospitalCardData {
  // HospitalImage 형식으로 변환 (getHospitalThumbnailImageUrl 사용을 위해)
  const hospitalImages = reservedHospital.hospitalImages.map((img) => ({
    imageType: img.imageType as 'MAIN' | 'THUMBNAIL' | 'DETAIL' | 'INTERIOR' | 'PROMOTION',
    imageUrl: img.imageUrl,
  }));

  // District 정보 변환 (JsonValue 타입 그대로 유지)
  const district = reservedHospital.district
    ? {
        id: reservedHospital.district.id,
        name: reservedHospital.district.name,
        displayName: reservedHospital.district.displayName,
        countryCode: reservedHospital.district.countryCode as DistrictCountryCode,
        level: reservedHospital.district.level,
        order: reservedHospital.district.order,
        parentId: reservedHospital.district.parentId,
      }
    : null;

  return {
    id: reservedHospital.id,
    name: parseLocalizedText(reservedHospital.name),
    address: parseLocalizedText(reservedHospital.address || '{}'),
    prices: reservedHospital.prices ? parsePriceInfo(reservedHospital.prices) : null,
    rating: reservedHospital.rating,
    reviewCount: reservedHospital.reviewCount,
    // 썸네일 이미지 URL (getHospitalThumbnailImageUrl 사용)
    thumbnailImageUrl:
      hospitalImages.length > 0 ? getHospitalThumbnailImageUrl(hospitalImages) : null,
    discountRate: reservedHospital.discountRate || null,
    // 시술부위 태그 변환
    medicalSpecialties: reservedHospital.specialties.map((specialty) => ({
      id: specialty.id,
      name: parseLocalizedText(specialty.name),
      specialtyType: specialty.type,
    })),
    // 지역 정보
    district: district,
    displayLocationName: reservedHospital.displayLocationName
      ? parseLocalizedText(reservedHospital.displayLocationName)
      : null,
    // 좋아요 관련 필드 (예약 API에서 제공하지 않음)
    likeCount: 0,
    isLiked: false,
    likedUserIds: [],
    // HOT 태그 표시를 위한 ranking
    ranking: reservedHospital.ranking,
    // 뱃지 배열
    badge: reservedHospital.badge,
    // HospitalCardData 호환성을 위한 추가 필드
    bookmarkCount: reservedHospital.bookmarkCount,
  };
}

export function ReservedHospitalsInfiniteList({ lang, dict }: ReservedHospitalsInfiniteListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteReservedHospitals({
      limit: 10,
    });

  // 로딩 상태
  if (isLoading) {
    return <ReservedHospitalsSkeletonV2 />;
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
        <div className='space-y-3 p-5'>
          {convertedHospitals.map((hospital) => (
            <LocaleLink
              key={hospital.id}
              href={`/reviews-create?hospitalId=${hospital.id}`}
              className='block'
            >
              <DoctorAffiliatedHospitalCardV2 hospital={hospital} dict={dict} lang={lang} />
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
