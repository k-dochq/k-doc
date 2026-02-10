'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { useCarouselAutoplay } from 'shared/model/hooks';
import { DonationAfterPageIndicator } from './DonationAfterPageIndicator';

export interface DonationAfterCarouselImage {
  src: string;
  alt: string;
}

export interface DonationAfterCarouselSectionProps {
  images: DonationAfterCarouselImage[];
  className?: string;
}

export function DonationAfterCarouselSection({
  images,
  className = '',
}: DonationAfterCarouselSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useCarouselAutoplay({
    api,
    itemCount: images.length,
    interval: 2500,
    enabled: true,
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on('select', () => {
      const newSlide = api.selectedScrollSnap();
      setCurrentSlide(newSlide);
    });
  }, [api]);

  if (images.length === 0) return null;

  return (
    <div className={`w-full bg-neutral-100 pb-[120px] ${className}`}>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className=''>
          {images.map((image, index) => (
            <CarouselItem key={`${image.src}-${index}`} className='basis-[100%] pl-0'>
              <Image
                src={image.src}
                alt={image.alt}
                width={750}
                height={953}
                className='w-full h-auto'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='h-6' />
      <div className='px-5'>
        <DonationAfterPageIndicator totalPages={images.length} currentPage={currentSlide} />
      </div>
    </div>
  );
}
