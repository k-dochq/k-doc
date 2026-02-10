'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { DonationCarouselPageIndicator } from './DonationCarouselPageIndicator';

export interface DonationCarouselImage {
  src: string;
  alt: string;
}

export interface DonationCarouselSectionProps {
  images: DonationCarouselImage[];
  className?: string;
}

const TWEEN_FACTOR_BASE = 0.1;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export function DonationCarouselSection({ images, className = '' }: DonationCarouselSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentPage, setCurrentPage] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const totalPages = images.length;

  const setTweenNodes = useCallback((emblaApi: CarouselApi): void => {
    if (!emblaApi) return;
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__slide__item') as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi: CarouselApi, eventName?: string) => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scaleY = numberWithinRange(tweenValue, 0, 1);

        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `scaleY(${scaleY})`;
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!api) return;

    const updatePage = () => {
      const slideIndex = api.selectedScrollSnap();
      const page = slideIndex % totalPages;
      setCurrentPage(page);
    };

    const handlePointerDown = () => {
      setIsUserInteracting(true);
    };

    const handleSettle = () => {
      setIsUserInteracting(false);
    };

    setTweenNodes(api);
    setTweenFactor(api);
    tweenScale(api);
    updatePage();

    api
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
      .on('select', updatePage)
      .on('pointerDown', handlePointerDown)
      .on('settle', handleSettle);

    return () => {
      api
        .off('reInit', setTweenNodes)
        .off('reInit', setTweenFactor)
        .off('reInit', tweenScale)
        .off('scroll', tweenScale)
        .off('slideFocus', tweenScale)
        .off('select', updatePage)
        .off('pointerDown', handlePointerDown)
        .off('settle', handleSettle);
    };
  }, [api, tweenScale, setTweenNodes, setTweenFactor, totalPages]);

  useEffect(() => {
    if (!api || images.length <= 1 || isUserInteracting) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [api, images.length, isUserInteracting]);

  if (images.length === 0) return null;

  const itemClassName =
    'relative aspect-[1048/1480] w-full overflow-hidden rounded-xl shadow-[2px_3px_5px_0_rgba(0,0,0,0.4)]';

  return (
    <div className={`relative w-full bg-white ${className}`}>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: 'center',
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className=''>
          {images.map((image, index) => (
            <CarouselItem key={`${image.src}-${index}`} className='shrink-0 basis-[82.67%]'>
              <div className='embla__slide__item px-[6px] [backface-visibility:hidden]'>
                <div className='block'>
                  <div className={itemClassName}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes='414px'
                      className='object-cover'
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {totalPages > 1 && (
        <DonationCarouselPageIndicator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageClick={(page) => api?.scrollTo(page)}
        />
      )}
    </div>
  );
}
