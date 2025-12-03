'use client';

import Image from 'next/image';
import { type ReviewImage } from '../model/types';

interface PopularReviewCardV2BeforeAfterProps {
  beforeImage: ReviewImage | null;
  afterImage: ReviewImage | null;
}

export function PopularReviewCardV2BeforeAfter({
  beforeImage,
  afterImage,
}: PopularReviewCardV2BeforeAfterProps) {
  const defaultImage = {
    imageUrl: '/images/shared/default_image.png',
    alt: '기본 이미지',
  };

  const beforeImageData = beforeImage || defaultImage;
  const afterImageData = afterImage || defaultImage;

  return (
    <div className='flex gap-0.5'>
      {/* Before 이미지 */}
      <div className='relative size-[142px] overflow-hidden bg-[#faf4fe]'>
        <Image
          src={beforeImageData.imageUrl}
          alt={beforeImageData.alt || 'Before 이미지'}
          fill
          className='object-cover'
          sizes='142px'
        />
        <div className='absolute bottom-0 left-0 rounded-tr-[6px] bg-neutral-700 px-[6px] py-1'>
          <p className='text-[11px] leading-[14px] font-medium text-white'>Before</p>
        </div>
      </div>

      {/* After 이미지 */}
      <div className='relative size-[142px] overflow-hidden bg-white'>
        <Image
          src={afterImageData.imageUrl}
          alt={afterImageData.alt || 'After 이미지'}
          fill
          className='object-cover'
          sizes='142px'
        />
        <div className='absolute bottom-0 left-0 rounded-tr-[6px] bg-[#f15bff] px-[6px] py-1'>
          <p className='text-[11px] leading-[14px] font-medium text-white'>After</p>
        </div>
      </div>
    </div>
  );
}
