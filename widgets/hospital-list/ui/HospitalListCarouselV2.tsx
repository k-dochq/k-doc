'use client';

import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';
import { type HospitalCardData, type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { HospitalCardV2 } from 'entities/hospital/ui/HospitalCardV2';
import React from 'react';

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
            const isLast = index === hospitals.length - 1;
            return (
              <React.Fragment key={hospital.id}>
                <CarouselItem
                  key={hospital.id}
                  className={`${isFirst ? 'basis-[170px] pl-5' : 'basis-[166px] pl-[16px]'}`}
                >
                  <HospitalCardV2 hospital={hospital} lang={lang} dict={dict} />
                </CarouselItem>
                {isLast && (
                  <CarouselItem key={`spacer-${hospital.id}`} className='basis-5'>
                    <div className='w-5' />
                  </CarouselItem>
                )}
              </React.Fragment>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
