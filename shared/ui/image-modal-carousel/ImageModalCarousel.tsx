'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from 'shared/ui/dialog';
import { type ImageModalCarouselProps } from './types';
import { ImageModalHeader } from './ImageModalHeader';
import { ImageModalCarouselContent } from './ImageModalCarouselContent';
import { MAX_MOBILE_WIDTH_CLASS } from '@/shared/config';

export function ImageModalCarousel({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  centerText,
  onIndexChange,
}: ImageModalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
    onIndexChange?.(index);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${MAX_MOBILE_WIDTH_CLASS} bg-gradient-primary min-h-screen rounded-none border-none p-0 shadow-none`}
      >
        <div className=''>
          {/* 헤더 */}
          <ImageModalHeader
            currentIndex={currentIndex}
            totalCount={images.length}
            centerText={centerText}
            onClose={onClose}
          />

          {/* 캐러셀 컨텐츠 */}
          <ImageModalCarouselContent
            images={images}
            initialIndex={initialIndex}
            onIndexChange={handleIndexChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
