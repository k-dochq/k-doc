'use client';

import { useState } from 'react';
import { type ReviewImage } from '../model/types';
import { BeforeImageSection } from './BeforeImageSection';
import { AfterImageSection } from './AfterImageSection';
import { ReviewImagesModal } from './ReviewImagesModal';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ReviewListImagesProps {
  beforeImages: ReviewImage[];
  afterImages: ReviewImage[];
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

export function ReviewListImages({
  beforeImages,
  afterImages,
  reviewId,
  lang,
  dict,
  className = '',
}: ReviewListImagesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // beforeImages와 afterImages가 모두 빈값이거나 없으면 컴포넌트를 렌더링하지 않음
  if ((!beforeImages || beforeImages.length === 0) && (!afterImages || afterImages.length === 0)) {
    return null;
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`flex h-56 overflow-hidden rounded-xl ${className}`}>
        <BeforeImageSection
          beforeImages={beforeImages}
          reviewId={reviewId}
          lang={lang}
          onImageClick={handleImageClick}
        />
        <AfterImageSection
          afterImages={afterImages}
          beforeImagesCount={beforeImages.length}
          reviewId={reviewId}
          lang={lang}
          onImageClick={handleImageClick}
        />
      </div>

      {/* 리뷰 이미지 모달 */}
      <ReviewImagesModal
        beforeImages={beforeImages}
        afterImages={afterImages}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dict={dict}
      />
    </>
  );
}
