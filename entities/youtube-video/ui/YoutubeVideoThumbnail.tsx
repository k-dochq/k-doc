'use client';

import Image from 'next/image';
import { DEFAULT_IMAGES } from 'shared/config/images';

interface YoutubeVideoThumbnailProps {
  imageSrc: string;
  alt: string;
  onClick?: () => void;
  isClickable: boolean;
  onError: () => void;
}

export function YoutubeVideoThumbnail({
  imageSrc,
  alt,
  onClick,
  isClickable,
  onError,
}: YoutubeVideoThumbnailProps) {
  return (
    <div
      onClick={onClick}
      className={`relative h-full w-full ${isClickable ? 'cursor-pointer' : ''}`}
    >
      <Image
        alt={alt}
        src={imageSrc}
        fill
        sizes='100%'
        className='absolute inset-0 max-w-none object-cover object-[50%_50%]'
        onError={onError}
        quality={100}
      />
    </div>
  );
}
