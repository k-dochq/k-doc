'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { formatReservationDate } from 'shared/lib/reservation-date-utils';

interface ReservationDateTimeProps {
  reservationDate: Date | string;
  reservationTime: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationDateTime({
  reservationDate,
  reservationTime,
  lang,
  dict,
}: ReservationDateTimeProps) {
  const formattedDate = formatReservationDate(reservationDate, lang);

  return (
    <div className='flex flex-col gap-0.5'>
      <p className='text-sm leading-5 font-semibold text-[#404040]'>
        {dict.consultation?.appointment?.reservationDateTime ||
          dict.consultation?.reservationDateTime ||
          '예약 일시'}
      </p>
      <div className='flex items-start gap-1 text-sm leading-5 text-[#737373]'>
        <p>{formattedDate}</p>
        <p>{reservationTime}</p>
        <p>({dict.consultation?.appointment?.timezone || 'KST'})</p>
      </div>
    </div>
  );
}
