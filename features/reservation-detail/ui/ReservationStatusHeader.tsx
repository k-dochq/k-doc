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
  const isChangeRequested = status === 'CHANGE_REQUESTED';
  const isChangeConfirmed = status === 'CHANGE_CONFIRMED';

  const rd = dict.consultation?.reservationDetail;

  function getStatusText(): string {
    if (isCancelled) return rd?.cancelled || '예약 취소됨';
    if (isCompleted) return rd?.completed || '시술 완료';
    if (isChangeRequested) return rd?.changeRequested || '변경 요청됨';
    if (isChangeConfirmed) return rd?.changeConfirmed || '변경 확정됨';
    return rd?.confirmed || '예약 완료';
  }

  const statusText = getStatusText();
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
