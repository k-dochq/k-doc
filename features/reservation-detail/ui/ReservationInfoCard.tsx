'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ReservationThumbnail } from 'features/consultation-tabs/ui/ReservationThumbnail';
import { ReservationDateTime } from 'features/consultation-tabs/ui/ReservationDateTime';
import { WriteReviewButton } from 'features/consultation-tabs/ui/WriteReviewButton';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface ReservationInfoCardProps {
  thumbnailImageUrl: string | null;
  hospitalName: string;
  reservationDate: Date | string;
  reservationTime: string;
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationInfoCard({
  thumbnailImageUrl,
  hospitalName,
  reservationDate,
  reservationTime,
  hospitalId,
  lang,
  dict,
}: ReservationInfoCardProps) {
  const router = useLocalizedRouter();

  // 시술후기 작성 핸들러
  const handleWriteReview = () => {
    router.push(`/reviews-create?hospitalId=${hospitalId}`);
  };

  return (
    <div className='flex flex-col gap-4 rounded-xl bg-white p-3 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.4)]'>
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

      {/* 시술후기 작성하기 버튼 */}
      <WriteReviewButton onClick={handleWriteReview} dict={dict} />
    </div>
  );
}
