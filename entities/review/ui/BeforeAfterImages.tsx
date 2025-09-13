'use client';

import Image from 'next/image';
import { type ReviewImage } from '../model/types';

interface BeforeAfterImagesProps {
  beforeImages: ReviewImage[];
  afterImages: ReviewImage[];
  className?: string;
}

export function BeforeAfterImages({
  beforeImages,
  afterImages,
  className = '',
}: BeforeAfterImagesProps) {
  // 기본 이미지 설정
  const defaultImage = {
    imageUrl: '/images/shared/default_image.png',
    alt: '기본 이미지',
  };

  const beforeImage = beforeImages.length > 0 ? beforeImages[0] : defaultImage;
  const afterImage = afterImages.length > 0 ? afterImages[0] : defaultImage;

  return (
    <div className={`flex ${className}`}>
      {/* Before 이미지 */}
      <div className='relative aspect-square flex-1 overflow-hidden rounded-l-lg rounded-r-none'>
        <Image
          src={beforeImage.imageUrl}
          alt={beforeImage.alt || 'Before 이미지'}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 45vw, 200px'
        />

        <span
          className='absolute bottom-0 left-0 rounded-tl-none rounded-tr-sm rounded-br-none rounded-bl-none px-1 py-0.5 text-[11px] font-medium text-white'
          style={{ backgroundColor: 'rgba(23, 23, 23, 0.70)' }}
        >
          Before
        </span>
      </div>

      {/* After 이미지 */}
      <div className='relative aspect-square flex-1 overflow-hidden rounded-l-none rounded-r-sm'>
        <Image
          src={afterImage.imageUrl}
          alt={afterImage.alt || 'After 이미지'}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 45vw, 200px'
        />
        <span
          className='absolute right-0 bottom-0 rounded-tl-sm rounded-tr-none rounded-br-none rounded-bl-none px-1 py-0.5 text-[11px] font-medium text-white'
          style={{ backgroundColor: 'rgba(218, 71, 239, 0.70)' }}
        >
          After
        </span>
      </div>
    </div>
  );
}
