'use client';

import Image from 'next/image';
import { DEFAULT_IMAGES } from 'shared/config/images';
import { type Dictionary } from 'shared/model/types';

interface ReservationHospitalInfoProps {
  hospitalName: string;
  logoImageUrl: string | null;
  districtName: string | null;
  dict: Dictionary;
}

export function ReservationHospitalInfo({
  hospitalName,
  logoImageUrl,
  districtName,
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
          className={logoImageUrl ? 'object-contain p-2' : 'object-cover'}
        />
      </div>

      {/* 병원 이름 및 지역 */}
      <div className='flex flex-1 flex-col gap-0.5'>
        <p className='text-sm leading-5 font-semibold text-[#404040]'>{hospitalName}</p>
        {districtName && (
          <div className='flex items-center gap-1'>
            <p className='text-xs leading-4 font-medium text-[#a3a3a3]'>
              {dict.consultation?.appointment?.region || '지역'}
            </p>
            <div className='h-[10px] w-px bg-[#A3A3A3]' />
            <p className='pl-0.5 text-xs leading-4 font-medium text-[#a3a3a3]'>{districtName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
