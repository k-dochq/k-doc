'use client';

import { Star, MapPin } from 'lucide-react';

export interface HospitalCardItem {
  id: string;
  nameKo: string;
  nameEn: string;
  districtKo: string;
  rating: number;
  reviewCount: number;
}

interface KdocHospitalCarouselProps {
  hospitals: HospitalCardItem[];
}

export function parseHospitalCards(content: string): HospitalCardItem[] | null {
  try {
    const parsed = JSON.parse(content);
    if (parsed?.type === 'hospitalCards' && Array.isArray(parsed.hospitals)) {
      return parsed.hospitals;
    }
    return null;
  } catch {
    return null;
  }
}

export function KdocHospitalCarousel({ hospitals }: KdocHospitalCarouselProps) {
  return (
    <div className='max-w-[280px]'>
      <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-none'>
        {hospitals.map((h) => (
          <div
            key={h.id}
            className='flex w-52 shrink-0 flex-col gap-2 rounded-2xl border border-[#e5e5e5] bg-white p-4 shadow-sm'
          >
            {/* 병원 썸네일 자리 (이미지 없는 경우 placeholder) */}
            <div className='flex h-20 w-full items-center justify-center rounded-xl bg-[#f5f3ff]'>
              <span className='text-2xl'>🏥</span>
            </div>

            {/* 병원 정보 */}
            <div className='space-y-1'>
              <p className='line-clamp-2 text-sm font-semibold leading-tight text-gray-900'>
                {h.nameKo || h.nameEn}
              </p>

              {h.districtKo && (
                <div className='flex items-center gap-1 text-xs text-gray-400'>
                  <MapPin className='h-3 w-3' />
                  <span>{h.districtKo}</span>
                </div>
              )}

              {h.rating > 0 && (
                <div className='flex items-center gap-1 text-xs text-gray-500'>
                  <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                  <span>{h.rating.toFixed(1)}</span>
                  {h.reviewCount > 0 && (
                    <span className='text-gray-400'>({h.reviewCount})</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
