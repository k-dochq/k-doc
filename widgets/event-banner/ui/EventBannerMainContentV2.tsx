'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { EventBannerMainItemV2 } from './EventBannerMainItemV2';
import { type EventBannerWithImage } from '../model/types';

export interface EventBannerMainContentV2Props {
  banners: EventBannerWithImage[];
  currentLocale: 'ko' | 'en' | 'th';
  className?: string;
}

const TWEEN_FACTOR_BASE = 0.1;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export function EventBannerMainContentV2({
  banners,
  currentLocale,
  className = '',
}: EventBannerMainContentV2Props) {
  const [api, setApi] = useState<CarouselApi>();
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

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

        // const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1);
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `scale(${scale})`;
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!api) return;

    setTweenNodes(api);
    setTweenFactor(api);
    tweenScale(api);

    api
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale);

    return () => {
      api
        .off('reInit', setTweenNodes)
        .off('reInit', setTweenFactor)
        .off('reInit', tweenScale)
        .off('scroll', tweenScale)
        .off('slideFocus', tweenScale);
    };
  }, [api, tweenScale, setTweenNodes, setTweenFactor]);

  // 자동재생 기능
  useEffect(() => {
    if (!api || banners.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 2500); // 2.5초 간격

    return () => clearInterval(interval);
  }, [api, banners.length]);

  return (
    <div className={`w-full ${className}`}>
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
              <div className='embla__slide__item [backface-visibility:hidden]'>
                <EventBannerMainItemV2
                  id={banner.id}
                  title={banner.title}
                  linkUrl={banner.linkUrl}
                  imageUrl={banner.currentImage.imageUrl}
                  alt={banner.currentImage.alt}
                  currentLocale={currentLocale}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
