'use client';

import Image from 'next/image';
import { DEFAULT_IMAGES } from 'shared/config/images';
import { type Dictionary } from 'shared/model/types';

interface ReservationHospitalInfoProps {
  hospitalName: string;
  logoImageUrl: string | null;
  displayLocationName: string | null;
  dict: Dictionary;
}

export function ReservationHospitalInfo({
  hospitalName,
  logoImageUrl,
  displayLocationName,
  dict,
}: ReservationHospitalInfoProps) {
  return (
    <div className='flex items-center gap-3'>
      {/* 로고 */}
      <div className='relative size-[46px] shrink-0 overflow-hidden rounded-full'>
        <Image
          src={logoImageUrl || DEFAULT_IMAGES.HOSPITAL_LOGO_DEFAULT}
          alt={hospitalName}
          fill
          className='object-cover'
        />
      </div>

      {/* 병원 이름 및 지역 */}
      <div className='min-w-0 flex-1 flex flex-col gap-0.5'>
        <p className='truncate text-sm leading-5 font-semibold text-[#404040]'>{hospitalName}</p>
        {displayLocationName && (
          <div className='flex min-w-0 items-center gap-1'>
            <p className='shrink-0 text-xs leading-4 font-medium text-[#a3a3a3]'>
              {dict.consultation?.appointment?.region || '지역'}
            </p>
            <div className='h-[10px] w-px shrink-0 bg-[#A3A3A3]' />
            <p className='min-w-0 truncate pl-0.5 text-xs leading-4 font-medium text-[#a3a3a3]'>
              {displayLocationName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
