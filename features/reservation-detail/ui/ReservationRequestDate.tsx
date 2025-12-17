'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { formatReservationDate } from 'shared/lib/reservation-date-utils';
import dayjs from 'dayjs';

interface ReservationRequestDateProps {
  createdAt: Date | string;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationRequestDate({ createdAt, lang, dict }: ReservationRequestDateProps) {
  const formattedDate = formatReservationDate(createdAt, lang);
  const time = dayjs(createdAt).format('HH:mm');

  return (
    <div className='flex items-center gap-1 text-sm leading-5 font-medium text-[#a3a3a3]'>
      <p>{dict.consultation?.reservationDetail?.requestDate || '신청 일시'}</p>
      <p>{formattedDate}</p>
      <p>{time}</p>
      <p>({dict.consultation?.appointment?.timezone || 'KST'})</p>
    </div>
  );
}
