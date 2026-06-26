'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';
import { HospitalCardV2 } from 'entities/hospital/ui/HospitalCardV2';
import { useHospitalThumbnails } from '../model/useHospitalThumbnails';
import { toHospitalCardData, type HospitalCardItem } from '../lib/hospital-cards';

export type { HospitalCardItem };

interface KdocHospitalCarouselProps {
  hospitals: HospitalCardItem[];
  lang: Locale;
  dict: Dictionary;
}

export function KdocHospitalCarousel({ hospitals, lang, dict }: KdocHospitalCarouselProps) {
  const ids = hospitals.map((h) => h.id);
  const thumbnails = useHospitalThumbnails(ids);

  return (
    <div className='w-full'>
      <Carousel opts={{ align: 'start', dragFree: true }}>
        <CarouselContent className='-ml-3 pl-5'>
          {hospitals.map((h) => (
            <CarouselItem key={h.id} className='pl-3 basis-[175px] shrink-0'>
              <HospitalCardV2
                hospital={toHospitalCardData(h, thumbnails[h.id])}
                lang={lang}
                dict={dict}
                showLikeButton={false}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
