'use client';

import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';
import { type HospitalCardData, type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { HospitalCardV2 } from 'entities/hospital/ui/HospitalCardV2';

interface HospitalListCarouselV2Props {
  hospitals: HospitalCardData[];
  lang: Locale;
  dict: Dictionary;
}

export function HospitalListCarouselV2({ hospitals, lang, dict }: HospitalListCarouselV2Props) {
  return (
    <div className='w-full'>
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className=''>
          {hospitals.map((hospital, index) => {
            const isFirst = index === 0;
            return (
              <CarouselItem
                key={hospital.id}
                className={`basis-[150px] ${isFirst ? 'pl-[5px]' : 'pl-[16px]'}`}
              >
                <HospitalCardV2 hospital={hospital} lang={lang} dict={dict} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
