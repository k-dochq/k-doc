'use client';

import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { type NoticeWithFiles } from '@/entities/notice';
import { NoticeImageModal } from './NoticeImageModal';

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
                className='absolute right-3 bottom-3 rounded-xl bg-[#f9d1ff] p-2 transition-colors hover:bg-[#f5c7ff]'
              >
                <ZoomIn className='h-6 w-6 text-[#da47ef]' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 이미지 모달 */}
      <NoticeImageModal
        images={imageFiles}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
