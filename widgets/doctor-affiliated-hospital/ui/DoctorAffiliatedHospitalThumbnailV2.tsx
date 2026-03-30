'use client';

import Image from 'next/image';
import { HotRibbonV2 } from 'shared/ui/hot-ribbon';
import { BestRibbonV2 } from 'shared/ui/best-ribbon';
import { type Locale } from 'shared/config';

interface DoctorAffiliatedHospitalThumbnailV2Props {
  imageUrl: string | null;
  alt: string;
  firstBadge?: string;
  lang?: Locale;
}

export function DoctorAffiliatedHospitalThumbnailV2({
  imageUrl,
  alt,
  firstBadge,
  lang,
}: DoctorAffiliatedHospitalThumbnailV2Props) {
  const isRtl = lang === 'ar';

  return (
    <div
      className={`relative h-[135px] w-[156px] shrink-0 bg-neutral-100 ${isRtl ? 'rounded-r-xl' : 'rounded-l-xl'}`}
    >
      {firstBadge === 'HOT' && <HotRibbonV2 mirrored={isRtl} />}
      {firstBadge === 'BEST' && <BestRibbonV2 mirrored={isRtl} />}

      <Image
        src={imageUrl || '/images/shared/default_image_square.png'}
        alt={alt || 'hospital thumbnail'}
        fill
        className={`object-cover ${isRtl ? 'rounded-r-xl' : 'rounded-l-xl'}`}
        sizes='104px'
      />
    </div>
  );
}
