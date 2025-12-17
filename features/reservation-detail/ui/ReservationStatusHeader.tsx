'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { CheckIcon } from 'shared/ui/check-icon';
import { ReservationStatusBadge } from 'features/consultation-tabs/ui/ReservationStatusBadge';
import { calculateReservationDaysLeft } from 'shared/lib/reservation-date-utils';

interface ReservationStatusHeaderProps {
  status: string;
  reservationDate: Date | string;
  reservationTime: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationStatusHeader({
  status,
  reservationDate,
  reservationTime,
  lang,
  dict,
}: ReservationStatusHeaderProps) {
  const daysLeft = calculateReservationDaysLeft(reservationDate, reservationTime);
  const isPast = daysLeft === null;
  const isCompleted = status === 'COMPLETED' || isPast;
  const isConfirmed = status === 'CONFIRMED' && !isPast;

  // 상태 텍스트 결정
  const statusText = isCompleted
    ? dict.consultation?.reservationDetail?.completed || '시술 완료'
    : dict.consultation?.reservationDetail?.confirmed || '예약 완료';

  // 체크 아이콘 색상 결정
  const checkIconStatus = isCompleted ? 'completed' : 'confirmed';

  return (
    <div className='flex items-center gap-2'>
      <CheckIcon size={24} status={checkIconStatus} />
      <div className='flex items-center gap-1'>
        <p className='text-2xl leading-8 font-semibold text-[#404040]'>{statusText}</p>
        {!isPast && (
          <ReservationStatusBadge
            reservationDate={reservationDate}
            reservationTime={reservationTime}
            lang={lang}
          />
        )}
      </div>
    </div>
  );
}
