'use client';

import { useState } from 'react';
import { type NoticeWithFiles } from '@/entities/notice';
import { ImageModalCarouselV2 } from 'shared/ui/image-modal-carousel/ImageModalCarouselV2';
import { type ImageModalItem } from 'shared/ui/image-modal-carousel/types';
import { ZoomIcon } from 'shared/ui/icons/ZoomIcon';

interface NoticeImagesSectionProps {
  notice: NoticeWithFiles;
}

export function NoticeImagesSection({ notice }: NoticeImagesSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // IMAGE 타입 파일만 필터링
  const imageFiles = notice.NoticeFile.filter((file) => file.fileType === 'IMAGE');

  if (imageFiles.length === 0) {
    return null;
  }

  // 모달용 데이터 변환
  const modalImages: ImageModalItem[] = imageFiles.map((file) => ({
    id: file.id,
    imageUrl: file.fileUrl,
    alt: file.alt || file.fileName,
  }));

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='space-y-4'>
        {imageFiles.map((file, index) => (
          <div key={file.id} className='relative'>
            {/* 이미지 */}
            <div className='relative h-[293px] w-[220px] overflow-hidden rounded-xl'>
              <button
                onClick={() => handleImageClick(index)}
                className='h-full w-full'
                aria-label={`이미지 ${index + 1} 확대보기`}
              >
                <img
                  src={file.fileUrl}
                  alt={file.alt || file.fileName}
                  className='h-full w-full object-cover'
                />
              </button>

              {/* 줌 버튼 */}
              <button
                onClick={() => handleImageClick(index)}
                className='absolute right-3 bottom-3 flex items-center justify-center rounded bg-[rgba(64,64,64,0.5)] p-1 transition-colors hover:bg-[rgba(64,64,64,0.7)]'
                aria-label={`이미지 ${index + 1} 확대보기`}
              >
                <ZoomIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 이미지 모달 */}
      <ImageModalCarouselV2
        images={modalImages}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
