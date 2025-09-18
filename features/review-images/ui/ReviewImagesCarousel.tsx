'use client';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
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
            <CarouselItem key={image.id} className='h-full basis-full pr-0 pl-0'>
              <div className='flex h-full items-center justify-center'>
                <TransformWrapper
                  initialScale={1}
                  minScale={0.8}
                  maxScale={4}
                  doubleClick={{
                    disabled: false,
                    mode: 'toggle',
                    animationTime: 200,
                    step: 0.7,
                  }}
                  wheel={{
                    step: 0.1,
                    disabled: false,
                    wheelDisabled: false,
                    touchPadDisabled: false,
                  }}
                  pinch={{
                    step: 5,
                    disabled: false,
                  }}
                  panning={{
                    disabled: false,
                    velocityDisabled: true,
                    lockAxisX: false,
                    lockAxisY: false,
                  }}
                  limitToBounds={true}
                  centerOnInit={true}
                  disablePadding={false}
                  smooth={true}
                >
                  <TransformComponent
                    wrapperClass='!w-full !h-full flex items-center justify-center'
                    contentClass='!w-auto !h-auto max-w-full max-h-full'
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.alt || '리뷰 이미지'}
                      className='max-h-full max-w-full object-contain'
                      draggable={false}
                      style={{
                        userSelect: 'none',
                        pointerEvents: 'none',
                      }}
                    />
                  </TransformComponent>
                </TransformWrapper>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
