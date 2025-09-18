'use client';

import { type ReviewImage } from '../model/types';
import { BeforeImageSection } from './BeforeImageSection';
import { AfterImageSection } from './AfterImageSection';
import { type Locale } from 'shared/config';

interface ReviewListImagesProps {
  beforeImages: ReviewImage[];
  afterImages: ReviewImage[];
  reviewId: string;
  lang: Locale;
  className?: string;
}

export function ReviewListImages({
  beforeImages,
  afterImages,
  reviewId,
  lang,
  className = '',
}: ReviewListImagesProps) {
  // beforeImages와 afterImages가 모두 빈값이거나 없으면 컴포넌트를 렌더링하지 않음
  if ((!beforeImages || beforeImages.length === 0) && (!afterImages || afterImages.length === 0)) {
    return null;
  }

  return (
    <div className={`flex h-56 overflow-hidden rounded-xl ${className}`}>
      <BeforeImageSection beforeImages={beforeImages} reviewId={reviewId} lang={lang} />
      <AfterImageSection afterImages={afterImages} reviewId={reviewId} lang={lang} />
    </div>
  );
}
