'use client';

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type ReviewImagesData } from 'entities/review/model/image-navigation';

interface ReviewImagesCarouselProps {
  imagesData: ReviewImagesData;
  setApi: (api: CarouselApi) => void;
}

export function ReviewImagesCarousel({ imagesData, setApi }: ReviewImagesCarouselProps) {
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
        <CarouselContent className='ml-0 h-full'>
          {imagesData.allImages.map((image, index) => (
            <CarouselItem
              key={image.id}
              className='flex h-full w-full basis-full items-center justify-center pr-0 pl-0'
            >
              <div className='h-full w-full bg-black'>
                <img
                  src={image.imageUrl}
                  alt={image.alt || '리뷰 이미지'}
                  className='h-full w-full object-contain'
                  draggable={false}
                  style={{
                    display: 'block',
                    margin: 'auto',
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
