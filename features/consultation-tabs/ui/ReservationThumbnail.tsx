'use client';

import Image from 'next/image';
import { type Dictionary } from 'shared/model/types';

interface ReservationThumbnailProps {
  thumbnailImageUrl: string | null;
  alt: string;
  dict: Dictionary;
}

export function ReservationThumbnail({ thumbnailImageUrl, alt, dict }: ReservationThumbnailProps) {
  return (
    <div className='relative h-[90px] w-[104px] shrink-0 overflow-hidden rounded-lg bg-[#e0e0e0]'>
      {thumbnailImageUrl ? (
        <Image src={thumbnailImageUrl} alt={alt} fill className='object-cover' />
      ) : (
        <div className='flex h-full w-full items-center justify-center text-xs text-neutral-400'>
          {dict.consultation?.appointment?.noImage || 'No Image'}
        </div>
      )}
    </div>
  );
}
