'use client';

import { type Locale } from 'shared/config';
import { getReservationStatusBadge } from 'shared/lib/reservation-date-utils';

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
  const statusBadge = getReservationStatusBadge(reservationDate, reservationTime, lang);

  return <p className='text-primary-900 text-2xl font-semibold'>{statusBadge}</p>;
}
