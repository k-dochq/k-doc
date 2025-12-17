'use client';

import { type Dictionary } from 'shared/model/types';

interface ReservationUserInfoTitleProps {
  dict: Dictionary;
}

export function ReservationUserInfoTitle({ dict }: ReservationUserInfoTitleProps) {
  return (
    <div className='flex flex-col gap-3'>
      <p className='text-lg leading-[28px] font-semibold text-[#404040]'>
        {dict.consultation?.reservationDetail?.userInfo?.title || '예약자 정보'}
      </p>
    </div>
  );
}
