'use client';

import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type ReviewImagesData } from 'entities/review/model/image-navigation';

interface ReviewImagesCarouselProps {
  imagesData: ReviewImagesData;
}

export function ReviewImagesCarousel({ imagesData }: ReviewImagesCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className='flex flex-1 items-center justify-center'>
      <Carousel
        setApi={setApi}
        className='h-full w-full'
        opts={{
          loop: false,
          align: 'center',
        }}
      >
        <CarouselContent className='-ml-0 h-full'>
          {imagesData.allImages.map((image, index) => (
            <CarouselItem key={image.id} className='h-full basis-full pl-0'>
              <div className='flex h-full items-center justify-center'>
                <img
                  src={image.imageUrl}
                  alt={image.alt || '리뷰 이미지'}
                  className='max-h-full max-w-full object-contain'
                  draggable={false}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
