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

  const timezone = dict.consultation?.appointment?.timezone || 'KST';
  const dateTimeText = `${formattedDate} ${reservationTime} (${timezone})`;

  return (
    <div className='min-w-0 flex flex-col gap-0.5'>
      <p className='line-clamp-2 text-sm leading-5 font-semibold text-[#404040]'>
        {dict.consultation?.appointment?.reservationDateTime ||
          dict.consultation?.reservationDateTime ||
          '예약 일시'}
      </p>
      <p className='line-clamp-2 text-sm leading-5 text-[#737373]'>{dateTimeText}</p>
    </div>
  );
}
