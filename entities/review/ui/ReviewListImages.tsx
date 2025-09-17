'use client';

import { type ReviewImage } from '../model/types';
import { BeforeImageSection } from './BeforeImageSection';
import { AfterImageSection } from './AfterImageSection';

interface ReviewListImagesProps {
  beforeImages: ReviewImage[];
  afterImages: ReviewImage[];
  className?: string;
}

export function ReviewListImages({
  beforeImages,
  afterImages,
  className = '',
}: ReviewListImagesProps) {
  // beforeImages와 afterImages가 모두 빈값이거나 없으면 컴포넌트를 렌더링하지 않음
  if ((!beforeImages || beforeImages.length === 0) && (!afterImages || afterImages.length === 0)) {
    return null;
  }

  return (
    <div className={`flex h-56 overflow-hidden rounded-xl ${className}`}>
      <BeforeImageSection beforeImages={beforeImages} />
      <AfterImageSection afterImages={afterImages} />
    </div>
  );
}
