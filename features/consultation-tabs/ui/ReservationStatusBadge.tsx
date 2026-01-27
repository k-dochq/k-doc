'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import {
  calculateReservationDaysLeft,
  getReservationStatusBadge,
} from 'shared/lib/reservation-date-utils';

interface ReservationStatusBadgeProps {
  reservationDate: Date | string;
  reservationTime: string;
  reservationStatus?: string;
  lang: Locale;
  dict?: Dictionary;
}

export function ReservationStatusBadge({
  reservationDate,
  reservationTime,
  reservationStatus,
  lang,
  dict,
}: ReservationStatusBadgeProps) {
  const daysLeft = calculateReservationDaysLeft(reservationDate, reservationTime);
  const isPast = daysLeft === null;
  const isCancelled = reservationStatus === 'CANCELLED';
  const isConfirmed = reservationStatus === 'CONFIRMED' && !isPast && !isCancelled;

  // 취소 상태가 최우선
  if (isCancelled) {
    return (
      <div className='flex items-center justify-center rounded-full bg-[#e5e5e5] px-3 py-1'>
        <p className='text-sm leading-5 font-semibold text-[#737373]'>
          {dict?.consultation?.reservationDetail?.cancelled || '예약 취소됨'}
        </p>
      </div>
    );
  }

  // CONFIRMED이고 예약 날짜 전일 때만 D-day 배지 표시
  if (isConfirmed) {
    const statusBadge = getReservationStatusBadge(reservationDate, reservationTime, lang);
    return (
      <div className='flex items-center justify-center rounded-full bg-primary-900 px-3 py-1'>
        <p className='text-sm leading-5 font-semibold text-white'>{statusBadge}</p>
      </div>
    );
  }

  // 과거 예약이거나 완료된 경우
  if (isPast) {
    const statusBadge = getReservationStatusBadge(reservationDate, reservationTime, lang);
    return (
      <div className='flex items-center justify-center rounded-full bg-[#e5e5e5] px-3 py-1'>
        <p className='text-sm leading-5 font-semibold text-[#737373]'>{statusBadge}</p>
      </div>
    );
  }

  // 그 외의 경우 배지 표시 안 함
  return null;
}
