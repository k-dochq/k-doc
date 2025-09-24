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
        className={`${MAX_MOBILE_WIDTH_CLASS} bg-gradient-primary rounded-none border-none p-0 shadow-none`}
        style={{
          minHeight: '100dvh', // 동적 뷰포트 높이 지원
          height: '100dvh',
        }}
      >
        <div
          className='flex h-full flex-col'
          style={{
            paddingTop: 'var(--safe-area-inset-top)',
            paddingBottom: 'var(--safe-area-inset-bottom)',
            paddingLeft: 'var(--safe-area-inset-left)',
            paddingRight: 'var(--safe-area-inset-right)',
          }}
        >
          {/* 헤더 */}
          <ImageModalHeader
            currentIndex={currentIndex}
            totalCount={images.length}
            centerText={centerText}
            onClose={onClose}
          />

          {/* 캐러셀 컨텐츠 */}
          <div className='flex-1 overflow-hidden'>
            <ImageModalCarouselContent
              images={images}
              initialIndex={initialIndex}
              onIndexChange={handleIndexChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
