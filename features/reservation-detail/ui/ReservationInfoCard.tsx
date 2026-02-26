'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ReservationThumbnail } from 'features/consultation-tabs/ui/ReservationThumbnail';
import { ReservationDateTime } from 'features/consultation-tabs/ui/ReservationDateTime';
import { WriteReviewButton } from 'features/consultation-tabs/ui/WriteReviewButton';
import { ReservationStatusBadge } from 'features/consultation-tabs/ui/ReservationStatusBadge';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { calculateReservationDaysLeft } from 'shared/lib/reservation-date-utils';

interface ReservationInfoCardProps {
  thumbnailImageUrl: string | null;
  hospitalName: string;
  reservationDate: Date | string;
  reservationTime: string;
  reservationStatus: string;
  hospitalId: string;
  reviewId?: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationInfoCard({
  thumbnailImageUrl,
  hospitalName,
  reservationDate,
  reservationTime,
  reservationStatus,
  hospitalId,
  reviewId,
  lang,
  dict,
}: ReservationInfoCardProps) {
  const router = useLocalizedRouter();

  const daysLeft = calculateReservationDaysLeft(reservationDate, reservationTime);
  const isPast = daysLeft === null;
  const isCancelled = reservationStatus === 'CANCELLED';
  const isConfirmed = reservationStatus === 'CONFIRMED' && !isPast && !isCancelled;
  const isCompleted = reservationStatus === 'COMPLETED' || isPast;

  // 상태 배지 표시 조건: 취소된 경우 또는 CONFIRMED이고 예약 날짜 전일 때
  const shouldShowStatusBadge = isCancelled || isConfirmed;

  // 시술후기 작성/수정 핸들러
  const handleWriteReview = () => {
    if (reviewId) {
      router.push(`/reviews-edit/${reviewId}`);
    } else {
      router.push(`/reviews-create?hospitalId=${hospitalId}`);
    }
  };

  return (
    <div className='flex flex-col gap-4 rounded-xl bg-white p-3 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.4)]'>
      {/* 상단: 상태 배지 (취소된 경우 또는 CONFIRMED이고 예약 날짜 전일 때) */}
      {shouldShowStatusBadge && (
        <div className='flex items-center justify-start'>
          <ReservationStatusBadge
            reservationDate={reservationDate}
            reservationTime={reservationTime}
            reservationStatus={reservationStatus}
            lang={lang}
            dict={dict}
          />
        </div>
      )}

      <div className='flex gap-3'>
        {/* 병원 썸네일 */}
        <ReservationThumbnail
          thumbnailImageUrl={thumbnailImageUrl}
          alt={hospitalName}
          dict={dict}
        />

        {/* 예약 일시 */}
        <div className='flex flex-1 flex-col pt-[7px]'>
          <ReservationDateTime
            reservationDate={reservationDate}
            reservationTime={reservationTime}
            lang={lang}
            dict={dict}
          />
        </div>
      </div>

      {/* 시술후기 작성하기 버튼 (과거 예약이거나 완료된 경우만) */}
      {isCompleted && (
        <WriteReviewButton onClick={handleWriteReview} dict={dict} reviewId={reviewId} />
      )}
    </div>
  );
}
