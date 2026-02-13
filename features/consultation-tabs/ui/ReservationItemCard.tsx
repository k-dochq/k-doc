'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReservationData } from 'entities/reservation';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { useAddressCopy } from 'widgets/hospital-detail-map/model/useAddressCopy';
import { getGoogleMapsUrl } from 'shared/lib/google-maps-utils';
import { ChevronRightIcon } from 'shared/ui/chevron-right-icon';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { ReservationStatusBadge } from './ReservationStatusBadge';
import { ReservationThumbnail } from './ReservationThumbnail';
import { ReservationDateTime } from './ReservationDateTime';
import { ReservationActionButtons } from './ReservationActionButtons';
import { ReservationHospitalInfo } from './ReservationHospitalInfo';
import { WriteReviewButton } from './WriteReviewButton';

interface ReservationItemCardProps {
  reservation: ReservationData;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationItemCard({ reservation, lang, dict }: ReservationItemCardProps) {
  const { copyAddress } = useAddressCopy(dict);
  const router = useLocalizedRouter();

  // 병원 정보
  const hospitalName = extractLocalizedText(reservation.hospital.name, lang);
  // 주소는 영어만 표시 (지도/복사용)
  const address = extractLocalizedText(
    reservation.hospital.directions || reservation.hospital.address,
    'en',
  );
  // 표시지역명 우선, 없으면 district.displayName, 그 다음 district.name (현재 언어로 표시)
  const displayLocationName = reservation.hospital.displayLocationName
    ? extractLocalizedText(reservation.hospital.displayLocationName, lang)
    : null;
  const districtName =
    displayLocationName ||
    (reservation.hospital.district
      ? extractLocalizedText(
          reservation.hospital.district.displayName || reservation.hospital.district.name,
          lang,
        )
      : null);

  // 주소복사 핸들러
  const handleCopyAddress = () => {
    if (address) {
      copyAddress(address);
    }
  };

  // 지도보기 핸들러
  const handleViewMap = () => {
    if (reservation.hospital.latitude && reservation.hospital.longitude) {
      const googleMapsUrl = getGoogleMapsUrl(
        reservation.hospital.latitude,
        reservation.hospital.longitude,
        hospitalName,
      );
      window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // 시술후기 작성 핸들러
  const handleWriteReview = () => {
    router.push(`/reviews-create?hospitalId=${reservation.hospital.id}`);
  };

  // 예약 상세로 이동 핸들러
  const handleViewDetail = () => {
    router.push(`/reservation/${reservation.id}`);
  };

  return (
    <div className='flex flex-col gap-4 rounded-xl bg-white p-3 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.4)]'>
      {/* 예약 상태 배지 및 병원 썸네일/예약 정보 영역 (클릭 가능) */}
      <button
        onClick={handleViewDetail}
        className='flex flex-col gap-3 text-left'
        aria-label='예약 상세 보기'
      >
        {/* 상단: D-day 배지 및 화살표 */}
        <div className='flex min-w-0 items-center justify-between gap-2'>
          <div className='shrink-0'>
              <ReservationStatusBadge
              reservationDate={reservation.reservationDate}
              reservationTime={reservation.reservationTime}
              reservationStatus={reservation.status}
              lang={lang}
              dict={dict}
            />
          </div>
          <ChevronRightIcon size={24} color='#A3A3A3' className='shrink-0' />
        </div>

        {/* 병원 썸네일 및 예약 정보 */}
        <div className='flex gap-3'>
          <ReservationThumbnail
            thumbnailImageUrl={reservation.hospital.thumbnailImageUrl}
            alt={hospitalName}
            dict={dict}
          />

          {/* 예약 정보 */}
          <div className='flex min-w-0 flex-1 flex-col gap-3'>
            <ReservationDateTime
              reservationDate={reservation.reservationDate}
              reservationTime={reservation.reservationTime}
              lang={lang}
              dict={dict}
            />

            <div onClick={(e) => e.stopPropagation()}>
              <ReservationActionButtons
                address={address}
                latitude={reservation.hospital.latitude}
                longitude={reservation.hospital.longitude}
                hospitalName={hospitalName}
                onCopyAddress={handleCopyAddress}
                onViewMap={handleViewMap}
                dict={dict}
              />
            </div>
          </div>
        </div>
      </button>

      {/* 구분선 */}
      <div className='border-t border-[#e5e5e5]' />

      {/* 병원 정보 */}
      <ReservationHospitalInfo
        hospitalName={hospitalName}
        logoImageUrl={reservation.hospital.logoImageUrl}
        displayLocationName={districtName}
        dict={dict}
      />

      {/* 시술후기 작성하기 버튼 */}
      <WriteReviewButton onClick={handleWriteReview} dict={dict} />
    </div>
  );
}
