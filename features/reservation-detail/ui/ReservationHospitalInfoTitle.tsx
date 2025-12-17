'use client';

import { type Dictionary } from 'shared/model/types';

interface ReservationHospitalInfoTitleProps {
  dict: Dictionary;
}

export function ReservationHospitalInfoTitle({ dict }: ReservationHospitalInfoTitleProps) {
  return (
    <div className='flex flex-col gap-3'>
      <p className='text-lg leading-[28px] font-semibold text-[#404040]'>
        {dict.consultation?.reservationDetail?.hospitalInfo || '병원 정보'}
      </p>
    </div>
  );
}
