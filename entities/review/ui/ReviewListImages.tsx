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
  return (
    <div className={`flex h-56 overflow-hidden rounded-xl ${className}`}>
      <BeforeImageSection beforeImages={beforeImages} />
      <AfterImageSection afterImages={afterImages} />
    </div>
  );
}
