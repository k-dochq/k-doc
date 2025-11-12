'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Dictionary } from 'shared/model/types';
import { ImageModalCarousel } from 'shared/ui/image-modal-carousel';

interface MessageImageProps {
  url: string;
  alt?: string;
  dict?: Dictionary;
}

export function MessageImage({ url, alt = 'Uploaded image', dict }: MessageImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const errorMessage = dict?.consultation?.input?.imageLoadError || '이미지를 불러올 수 없습니다';

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ImageModalCarousel에 맞는 형태로 변환 (이미지 1개만)
  const modalImage = {
    id: url, // url을 id로 사용
    imageUrl: url,
    alt: alt,
  };

  if (hasError) {
    return (
      <div className='flex h-[200px] w-full max-w-[280px] items-center justify-center rounded-xl'>
        <p className='text-sm text-gray-500'>{errorMessage}</p>
      </div>
    );
  }

  return (
    <>
      <button
        type='button'
        onClick={handleImageClick}
        className='relative w-full max-w-[280px] cursor-pointer overflow-hidden rounded-xl'
        aria-label='이미지 확대보기'
      >
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#DA47EF]' />
          </div>
        )}
        <Image
          src={url}
          alt={alt}
          width={280}
          height={280}
          className='h-auto w-full rounded-xl object-cover'
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          unoptimized
        />
      </button>

      {/* 이미지 모달 */}
      <ImageModalCarousel
        images={[modalImage]}
        initialIndex={0}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
