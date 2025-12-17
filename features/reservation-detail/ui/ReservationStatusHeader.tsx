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
  const isCancelled = status === 'CANCELLED';
  const isCompleted = status === 'COMPLETED' || isPast;
  const isConfirmed = status === 'CONFIRMED' && !isPast && !isCancelled;

  // 상태 텍스트 결정
  const statusText = isCancelled
    ? dict.consultation?.reservationDetail?.cancelled || '예약 취소됨'
    : isCompleted
      ? dict.consultation?.reservationDetail?.completed || '시술 완료'
      : dict.consultation?.reservationDetail?.confirmed || '예약 완료';

  // 체크 아이콘 색상 결정 (취소된 경우도 회색)
  const checkIconStatus = isCancelled || isCompleted ? 'completed' : 'confirmed';

  return (
    <div className='flex items-center gap-2'>
      <CheckIcon size={24} status={checkIconStatus} />
      <div className='flex items-center gap-1'>
        <p className='text-2xl leading-8 font-semibold text-[#404040]'>{statusText}</p>
        {!isPast && !isCancelled && (
          <ReservationStatusBadge
            reservationDate={reservationDate}
            reservationTime={reservationTime}
            reservationStatus={status}
            lang={lang}
            dict={dict}
          />
        )}
      </div>
    </div>
  );
}
