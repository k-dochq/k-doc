'use client';

import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type YoutubeVideoData } from 'entities/youtube-video';
import { YoutubeVideoCardV2 } from 'entities/youtube-video/ui/YoutubeVideoCardV2';
import { YoutubeVideosPageIndicator } from './YoutubeVideosPageIndicator';

interface YoutubeVideosCarouselV2Props {
  videos: YoutubeVideoData[];
  lang: Locale;
  dict: Dictionary;
}

export function YoutubeVideosCarouselV2({ videos, lang, dict }: YoutubeVideosCarouselV2Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // 페이지 클릭 핸들러
  const handlePageClick = (page: number) => {
    if (api) {
      api.scrollTo(page);
    }
  };

  return (
    <div className='w-full'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className=''>
          {videos.map((video) => (
            <CarouselItem key={video.id} className='basis-[316px] pr-4'>
              <YoutubeVideoCardV2 video={video} lang={lang} dict={dict} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <YoutubeVideosPageIndicator
        currentPage={currentSlide}
        totalPages={videos.length}
        onPageClick={handlePageClick}
      />
    </div>
  );
}
