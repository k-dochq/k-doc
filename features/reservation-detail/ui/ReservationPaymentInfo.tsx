'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { formatReservationDate } from 'shared/lib/reservation-date-utils';
import dayjs from 'dayjs';

interface ReservationPaymentInfoProps {
  depositAmount: number;
  currency: string;
  paymentDeadline: Date | string;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationPaymentInfo({
  depositAmount,
  currency,
  paymentDeadline,
  lang,
  dict,
}: ReservationPaymentInfoProps) {
  // depositAmount는 센트 단위이므로 100으로 나눔
  const depositAmountInCurrency = depositAmount / 100;
  const formattedDate = formatReservationDate(paymentDeadline, lang);
  const time = dayjs(paymentDeadline).format('HH:mm');

  return (
    <div className='flex flex-col gap-3'>
      <p className='text-lg leading-[28px] font-semibold text-[#404040]'>
        {dict.consultation?.reservationDetail?.paymentInfo || '결제 정보'}
      </p>
      <div className='flex flex-col gap-1'>
        {/* 예약금 */}
        <div className='flex gap-2 text-base leading-[24px]'>
          <p className='font-medium text-[#404040]'>
            {dict.consultation?.reservationDetail?.deposit || '예약금'}
          </p>
          <p className='font-normal text-[#737373]'>
            {depositAmountInCurrency} {currency}
          </p>
        </div>
        {/* 이체 일시 */}
        <div className='flex gap-2 text-base leading-[24px]'>
          <p className='font-medium text-[#404040]'>
            {dict.consultation?.reservationDetail?.transferDate || '이체 일시'}
          </p>
          <p className='font-normal text-[#737373]'>
            {formattedDate} {time} ({dict.consultation?.appointment?.timezone || 'KST'})
          </p>
        </div>
      </div>
    </div>
  );
}
