'use client';

import Image from 'next/image';
import { HotRibbonV2 } from 'shared/ui/hot-ribbon';
import { BestRibbonV2 } from 'shared/ui/best-ribbon';

interface DoctorAffiliatedHospitalThumbnailV2Props {
  imageUrl: string | null;
  alt: string;
  firstBadge?: string;
}

export function DoctorAffiliatedHospitalThumbnailV2({
  imageUrl,
  alt,
  firstBadge,
}: DoctorAffiliatedHospitalThumbnailV2Props) {
  return (
    <div className='relative h-[135px] w-[156px] shrink-0 rounded-l-xl bg-neutral-100'>
      {firstBadge === 'HOT' && (
        <div className='absolute top-[-3px] left-[0px]'>
          <HotRibbonV2 />
        </div>
      )}
      {firstBadge === 'BEST' && (
        <div className='absolute top-[-3px] left-[0px]'>
          <BestRibbonV2 />
        </div>
      )}

      <Image
        src={imageUrl || '/images/shared/default_image_square.png'}
        alt={alt || 'hospital thumbnail'}
        fill
        className='rounded-l-xl object-cover'
        sizes='104px'
      />
    </div>
  );
}
