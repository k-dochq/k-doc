'use client';

import { useState } from 'react';
import { type ReviewImage } from '../model/types';
import { BeforeImageSection } from './BeforeImageSection';
import { AfterImageSection } from './AfterImageSection';
import { ReviewImagesModal } from './ReviewImagesModal';
import { ImageTag } from './ImageTag';
import { SmartImage } from './SmartImage';
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

  // Before만 있고 After가 없는 경우 (Before 2개를 가로로 배치)
  const isBeforeOnlyLayout = beforeImages.length >= 2 && (!afterImages || afterImages.length === 0);

  // Before와 After 이미지가 모두 2개 이상일 때 최대 3개만 표시하도록 제한
  // 2개: Before 1개 + After 1개
  // 3개: Before 1개 + After 2개 OR Before 2개 + After 1개
  // 3개 (둘 다 2개 이상): Before 1개 + After 2개 + 나머지 +N 표시
  const shouldLimitToThree = beforeImages.length >= 2 && afterImages.length >= 2;
  const displayBeforeImages = shouldLimitToThree ? beforeImages.slice(0, 1) : beforeImages;
  const displayAfterImages = shouldLimitToThree ? afterImages.slice(0, 2) : afterImages;

  // Before 1개 + After 1개일 때는 고정 높이 필요 & 50:50 비율
  const isSingleImageLayout = displayBeforeImages.length === 1 && displayAfterImages.length === 1;
  const heightClass = (isSingleImageLayout || isBeforeOnlyLayout) ? 'h-56' : '';
  const gridColsClass = (isSingleImageLayout || isBeforeOnlyLayout) ? 'grid-cols-2' : 'grid-cols-[2fr_1fr]';

  // Before만 있는 경우 (Before 2개를 가로 배치)
  if (isBeforeOnlyLayout) {
    const handleBeforeImageClick = (imageIndex: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleImageClick(imageIndex);
    };

    const additionalBeforeCount = beforeImages.length > 2 ? beforeImages.length - 2 : 0;

    return (
      <>
        <div className={`grid ${gridColsClass} ${heightClass} overflow-hidden rounded-xl ${className}`}>
          {/* 첫 번째 Before 이미지 */}
          <div className='relative h-full w-full cursor-pointer overflow-hidden bg-[#F9D1FF]' onClick={handleBeforeImageClick(0)}>
            <SmartImage
              src={beforeImages[0].imageUrl}
              alt={beforeImages[0].alt || 'Before 이미지 1'}
              sizes='(max-width: 768px) 50vw, 336px'
            />
            <ImageTag type='before' />
          </div>

          {/* 두 번째 Before 이미지 */}
          <div 
            className='relative h-full w-full cursor-pointer overflow-hidden border-l border-white bg-[#F9D1FF]' 
            onClick={handleBeforeImageClick(1)}
          >
            <SmartImage
              src={beforeImages[1].imageUrl}
              alt={beforeImages[1].alt || 'Before 이미지 2'}
              sizes='(max-width: 768px) 50vw, 336px'
            />
            <ImageTag type='before' />
            
            {/* 추가 이미지 오버레이 */}
            {additionalBeforeCount > 0 && (
              <div
                className='absolute inset-0 flex items-center justify-center'
                style={{ background: 'rgba(0, 0, 0, 0.40)' }}
              >
                <span className='text-sm font-semibold text-white'>+{additionalBeforeCount}</span>
              </div>
            )}
          </div>
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

  return (
    <>
      <div className={`grid ${gridColsClass} ${heightClass} overflow-hidden rounded-xl ${className}`}>
        <BeforeImageSection
          beforeImages={displayBeforeImages}
          reviewId={reviewId}
          lang={lang}
          onImageClick={handleImageClick}
          shouldLimitDisplay={shouldLimitToThree}
          totalBeforeCount={beforeImages.length}
        />
        <AfterImageSection
          afterImages={displayAfterImages}
          beforeImagesCount={beforeImages.length}
          reviewId={reviewId}
          lang={lang}
          onImageClick={handleImageClick}
          shouldLimitDisplay={shouldLimitToThree}
          totalAfterCount={afterImages.length}
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
