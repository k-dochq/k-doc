'use client';

import { type Hospital } from 'entities/hospital/api/entities/types';

interface HospitalDetailLogoV2Props {
  hospital: Hospital;
}

export function HospitalDetailLogoV2({ hospital }: HospitalDetailLogoV2Props) {
  // 로고 이미지 찾기 (imageType === 'LOGO')
  const logoImage = hospital.hospitalImages?.find((img) => img.imageType === 'LOGO');

  // 로고 이미지가 없으면 렌더링하지 않음
  if (!logoImage) {
    return null;
  }

  return (
    <div className='size-[56px] overflow-clip rounded-full border border-neutral-200 bg-[#001872] shadow-[1px_2px_4px_0px_rgba(0,0,0,0.4)]'>
      <img
        src={logoImage.imageUrl}
        alt={logoImage.alt || '병원 로고'}
        className='size-full object-cover'
      />
    </div>
  );
}
