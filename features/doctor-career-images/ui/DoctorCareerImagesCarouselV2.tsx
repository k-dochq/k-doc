'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from 'shared/ui/carousel';
import { ImageModalCarouselV2 } from 'shared/ui/image-modal-carousel/ImageModalCarouselV2';
import { type ImageModalItem } from 'shared/ui/image-modal-carousel/types';
import { type DoctorCareerImage } from '../model/types';
import { type Locale } from 'shared/config';

interface DoctorCareerImagesCarouselV2Props {
  images: DoctorCareerImage[];
  lang: Locale;
}

export function DoctorCareerImagesCarouselV2({ images, lang }: DoctorCareerImagesCarouselV2Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      // 캐러셀 상태 업데이트 (필요시)
    });
  }, [api]);

  // DoctorCareerImage를 ImageModalItem으로 변환
  const modalImages: ImageModalItem[] = images.map((image) => ({
    id: image.id,
    imageUrl: image.imageUrl,
    alt: image.alt,
  }));

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 빈 데이터 상태 처리
  if (images.length === 0) {
    return null;
  }

  return (
    <div className='w-full'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-2'>
          {images.map((image, index) => (
            <CarouselItem key={image.id} className='basis-auto pl-2'>
              <button
                onClick={() => handleImageClick(index)}
                className='focus:ring-primary relative h-[100px] w-[100px] overflow-hidden rounded-lg transition-transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none'
              >
                <Image
                  src={image.imageUrl}
                  alt={image.alt || '의사 경력 이미지'}
                  fill
                  className='object-cover'
                  sizes='100px'
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 네비게이션 버튼 (이미지가 4개 이상일 때만 표시) */}
        {images.length > 4 && (
          <>
            <CarouselPrevious className='left-0' />
            <CarouselNext className='right-0' />
          </>
        )}
      </Carousel>

      {/* 이미지 모달 V2 */}
      <ImageModalCarouselV2
        images={modalImages}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
