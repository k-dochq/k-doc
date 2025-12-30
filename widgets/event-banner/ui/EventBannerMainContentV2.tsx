'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type Locale } from 'shared/config';
import { EventBannerMainItemV2 } from './EventBannerMainItemV2';
import { EventBannerMainPaginationV2 } from './EventBannerMainPaginationV2';
import { type EventBannerWithImage } from '../model/types';

export interface EventBannerMainContentV2Props {
  banners: EventBannerWithImage[];
  currentLocale: Locale;
  className?: string;
  isBlur?: boolean;
}

const TWEEN_FACTOR_BASE = 0.1;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export function EventBannerMainContentV2({
  banners,
  currentLocale,
  className = '',
  isBlur = false,
}: EventBannerMainContentV2Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentPage, setCurrentPage] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const totalPages = banners.length;

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

        // 중앙 아이템인지 확인
        // const isCenterSlide = Math.abs(diffToTarget) < 0.01;

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

  // 자동재생 기능
  useEffect(() => {
    if (!api || banners.length <= 1 || isUserInteracting) {
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
  }, [api, banners.length, isUserInteracting]);

  return (
    <div className={`relative w-full ${className}`}>
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
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className='shrink-0 basis-[82.67%]'>
              <div className='embla__slide__item px-[6px] [backface-visibility:hidden]'>
                <EventBannerMainItemV2
                  id={banner.id}
                  title={banner.title}
                  linkUrl={banner.linkUrl}
                  imageUrl={banner.currentImage.imageUrl}
                  alt={banner.currentImage.alt}
                  currentLocale={currentLocale}
                  isBlur={isBlur}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {totalPages > 1 && (
        <EventBannerMainPaginationV2 currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
