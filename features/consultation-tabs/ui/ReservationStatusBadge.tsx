'use client';

import { type Locale } from 'shared/config';
import {
  calculateReservationDaysLeft,
  getReservationStatusBadge,
} from 'shared/lib/reservation-date-utils';

interface ReservationStatusBadgeProps {
  reservationDate: Date | string;
  reservationTime: string;
  lang: Locale;
}

export function ReservationStatusBadge({
  reservationDate,
  reservationTime,
  lang,
}: ReservationStatusBadgeProps) {
  const daysLeft = calculateReservationDaysLeft(reservationDate, reservationTime);
  const isPast = daysLeft === null;
  const statusBadge = getReservationStatusBadge(reservationDate, reservationTime, lang);

  return (
    <div
      className={`flex items-center justify-center rounded-full px-3 py-1 ${
        isPast ? 'bg-[#e5e5e5]' : 'bg-[#f15bff]'
      }`}
    >
      <p className={`text-sm leading-5 font-semibold ${isPast ? 'text-[#737373]' : 'text-white'}`}>
        {statusBadge}
      </p>
    </div>
  );
}
