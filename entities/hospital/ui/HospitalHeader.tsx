'use client';

import { HospitalAvatar } from './HospitalAvatar';
import { LocaleLink } from 'shared/ui/locale-link';

interface HospitalHeaderProps {
  hospitalName: string;
  imageUrl?: string;
  hospitalHref?: string;
}

export function HospitalHeader({ hospitalName, imageUrl, hospitalHref }: HospitalHeaderProps) {
  const content = (
    <>
      <HospitalAvatar imageUrl={imageUrl} hospitalName={hospitalName} />
      <div className="relative shrink-0 font-['Pretendard:SemiBold',_sans-serif] text-[14px] leading-[0] text-nowrap text-neutral-900 not-italic">
        <p className='leading-[20px] whitespace-pre'>{hospitalName}</p>
      </div>
    </>
  );

  if (hospitalHref) {
    return (
      <LocaleLink
        href={hospitalHref}
        className='relative flex shrink-0 content-stretch items-center justify-start gap-2'
      >
        {content}
      </LocaleLink>
    );
  }

  return (
    <div className='relative flex shrink-0 content-stretch items-center justify-start gap-2'>
      {content}
    </div>
  );
}
