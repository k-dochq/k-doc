'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from 'shared/ui/dialog';
import { type ImageModalItem } from './types';
import { ImageModalHeaderV2 } from './ImageModalHeaderV2';
import { ImageModalCarouselContentV2 } from './ImageModalCarouselContentV2';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';

interface ImageModalCarouselV2Props {
  images: ImageModalItem[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export function ImageModalCarouselV2({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onIndexChange,
}: ImageModalCarouselV2Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
    onIndexChange?.(index);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${MAX_MOBILE_WIDTH_CLASS} rounded-none border-none bg-black p-0 shadow-none sm:rounded-none`}
        style={{
          minHeight: '100dvh',
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
          <ImageModalHeaderV2
            currentIndex={currentIndex}
            totalCount={images.length}
            onClose={onClose}
          />

          {/* 캐러셀 컨텐츠 */}
          <div className='flex-1 overflow-hidden'>
            <ImageModalCarouselContentV2
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
