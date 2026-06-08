'use client';

import { type Locale } from 'shared/config';
import { type Dictionary, type HospitalCardData } from 'shared/model/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from 'shared/ui/carousel';
import { HospitalCardV2 } from 'entities/hospital/ui/HospitalCardV2';

export interface HospitalCardItem {
  id: string;
  nameKo: string;
  nameEn: string;
  districtKo: string;
  thumbnailImageUrl: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  rating: number;
  reviewCount: number;
  badges: string[];
  specialties: Array<{ id: string; nameKo: string; nameEn: string; specialtyType: string }>;
}

interface KdocHospitalCarouselProps {
  hospitals: HospitalCardItem[];
  lang: Locale;
  dict: Dictionary;
}

export interface HospitalCardsPayload {
  text?: string;
  hospitals: HospitalCardItem[];
}

export function parseHospitalCards(content: string): HospitalCardsPayload | null {
  try {
    const parsed = JSON.parse(content);
    if (parsed?.type === 'hospitalCards' && Array.isArray(parsed.hospitals)) {
      return { text: parsed.text, hospitals: parsed.hospitals };
    }
    return null;
  } catch {
    return null;
  }
}

function toHospitalCardData(h: HospitalCardItem): HospitalCardData {
  return {
    id: h.id,
    name: { ko_KR: h.nameKo, en_US: h.nameEn },
    address: { ko_KR: h.districtKo },
    thumbnailImageUrl: h.thumbnailImageUrl ?? null,
    prices: h.minPrice != null ? { minPrice: h.minPrice, maxPrice: h.maxPrice ?? undefined } : null,
    rating: h.rating,
    reviewCount: h.reviewCount,
    discountRate: null,
    badge: h.badges?.length ? h.badges : null,
    displayLocationName: h.districtKo ? { ko_KR: h.districtKo } : null,
    medicalSpecialties: h.specialties?.map((s) => ({
      id: s.id,
      name: { ko_KR: s.nameKo, en_US: s.nameEn },
      specialtyType: s.specialtyType,
      order: null,
    })) ?? [],
  };
}

export function KdocHospitalCarousel({ hospitals, lang, dict }: KdocHospitalCarouselProps) {
  return (
    <div className='w-[260px]'>
      <Carousel opts={{ align: 'start', dragFree: true }}>
        <CarouselContent className='-ml-3'>
          {hospitals.map((h) => (
            <CarouselItem key={h.id} className='pl-3 basis-[175px]'>
              <HospitalCardV2
                hospital={toHospitalCardData(h)}
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
