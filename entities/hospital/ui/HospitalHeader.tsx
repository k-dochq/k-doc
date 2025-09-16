'use client';

import { HospitalAvatar } from './HospitalAvatar';

interface HospitalHeaderProps {
  hospitalName: string;
  imageUrl?: string;
}

export function HospitalHeader({ hospitalName, imageUrl }: HospitalHeaderProps) {
  return (
    <div className='relative flex shrink-0 content-stretch items-center justify-start gap-2'>
      <HospitalAvatar imageUrl={imageUrl} hospitalName={hospitalName} />
      <div className="relative shrink-0 font-['Pretendard:SemiBold',_sans-serif] text-[14px] leading-[0] text-nowrap text-neutral-900 not-italic">
        <p className='leading-[20px] whitespace-pre'>{hospitalName}</p>
      </div>
    </div>
  );
}
