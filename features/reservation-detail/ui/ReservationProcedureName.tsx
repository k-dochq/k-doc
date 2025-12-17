'use client';

import { type Dictionary } from 'shared/model/types';

interface ReservationProcedureNameProps {
  procedureName: string;
  dict: Dictionary;
}

export function ReservationProcedureName({ procedureName, dict }: ReservationProcedureNameProps) {
  return (
    <div className='flex flex-col gap-3'>
      <p className='text-lg leading-[28px] font-semibold text-[#404040]'>
        {dict.consultation?.reservationDetail?.procedureName || '시술명'}
      </p>
      <div className='flex flex-col gap-0'>
        <p className='text-base leading-[24px] font-normal whitespace-pre-wrap text-[#737373]'>
          {procedureName}
        </p>
      </div>
    </div>
  );
}
