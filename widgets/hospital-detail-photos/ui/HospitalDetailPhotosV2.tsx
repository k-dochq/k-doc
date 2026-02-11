'use client';

import { useState, useEffect } from 'react';
import { type Hospital, type HospitalImage } from 'entities/hospital/api/entities/types';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalMainImage } from 'entities/hospital/ui/HospitalMainImage';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { LocaleLink } from 'shared/ui/locale-link';
import { DEFAULT_IMAGES } from 'shared/config/images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from 'shared/ui/carousel';

interface HospitalDetailPhotosV2Props {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
  /** 활성(노출) 리뷰가 1개 이상일 때만 플로팅 버튼 클릭 시 리뷰 페이지로 이동. 기본값 true(기존 동작 유지) */
  hasActiveReviews?: boolean;
}

export function HospitalDetailPhotosV2({
  hospital,
  lang,
  dict,
  hasActiveReviews = true,
}: HospitalDetailPhotosV2Props) {
  const hospitalName = extractLocalizedText(hospital.name, lang) || '병원명 없음';
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 병원 이미지 배열 생성 (메인 이미지 + 상세 이미지들)
  const hospitalImages: Array<Pick<HospitalImage, 'id' | 'imageUrl' | 'imageType' | 'alt'>> = [
    // 메인 이미지가 있으면 첫 번째로 추가
    ...(hospital.mainImageUrl
      ? [
          {
            id: 'main',
            imageUrl: hospital.mainImageUrl,
            imageType: 'MAIN' as const,
            alt: hospitalName,
          },
        ]
      : []),
    // 상세 이미지들 추가 (DETAIL 타입만)
    ...(hospital.hospitalImages || [])
      .filter((img) => img.imageType === 'DETAIL')
      .map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl,
        imageType: img.imageType,
        alt: img.alt || hospitalName,
      })),
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // 이미지가 없으면 기본 이미지를 carousel로 표시
  if (hospitalImages.length === 0) {
    hospitalImages.push({
      id: 'default',
      imageUrl: DEFAULT_IMAGES.HOSPITAL_DEFAULT,
      imageType: 'MAIN' as const,
      alt: hospitalName,
    });
  }

  return (
    <div className='relative max-h-[242px] w-full'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: hospitalImages.length > 1,
        }}
        className='h-full w-full'
      >
        <CarouselContent className='ml-0 h-full'>
          {hospitalImages.map((image, index) => (
            <CarouselItem key={image.id} className='h-full pl-0'>
              <div className='h-full w-full'>
                <HospitalMainImage
                  imageUrl={image.imageUrl}
                  hospitalName={image.alt || hospitalName}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 시술후기 버튼 - 활성 리뷰가 있을 때만 링크, 없으면 같은 스타일의 비링크 */}
      {hasActiveReviews ? (
        <LocaleLink
          href={`/hospital/${hospital.id}/reviews`}
          locale={lang}
          className='fixed top-[120px] right-[20px] z-[60] flex min-h-[66px] min-w-[66px] items-center justify-center rounded-full bg-gradient-to-r from-[#3E57E2] via-[#B133FF] to-[#FF5DCA] shadow-[1px_3px_8px_0_rgba(0,0,0,0.15)] md:right-[calc(50vw-250px+20px)]'
        >
          <span className='text-[13px] font-semibold text-white'>
            {dict.hospital?.reviewsButton || '시술후기'}
          </span>
        </LocaleLink>
      ) : (
        <div
          role='presentation'
          className='fixed top-[120px] right-[20px] z-[60] flex min-h-[66px] min-w-[66px] cursor-default items-center justify-center rounded-full bg-gradient-to-r from-[#3E57E2] via-[#B133FF] to-[#FF5DCA] shadow-[1px_3px_8px_0_rgba(0,0,0,0.15)] md:right-[calc(50vw-250px+20px)]'
        >
          <span className='text-[13px] font-semibold text-white'>
            {dict.hospital?.reviewsButton || '시술후기'}
          </span>
        </div>
      )}

      {/* 인디케이터 - 이미지가 2개 이상일 때만 표시 */}
      {hospitalImages.length > 1 && (
        <div className='absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1'>
          {hospitalImages.map((_, index) => (
            <button
              key={index}
              className={`size-1.5 shrink-0 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
