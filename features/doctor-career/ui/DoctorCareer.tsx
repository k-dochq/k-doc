'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { DoctorCareerImagesCarousel } from '@/features/doctor-career-images';
import { getLocalizedTextByLocale } from 'shared/model/types/common';

interface DoctorCareerProps {
  career: string;
  careerImages: Array<{
    id: string;
    imageType: 'PROFILE' | 'CAREER';
    imageUrl: string;
    alt: string | null;
    order: number | null;
  }>;
  lang: Locale;
  dict: Dictionary;
}

export function DoctorCareer({ career, careerImages, lang, dict }: DoctorCareerProps) {
  if (!career) {
    return null;
  }

  return (
    <>
      {/* 경력 데이터가 있을 때만 섹션 렌더링 */}
      <div className='mt-4'>
        {/* 경력 및 활동 제목 */}
        <h3 className='text-primary text-sm font-semibold'>{dict.doctor.careerAndActivity}</h3>

        {/* 경력 데이터 */}
        <div className='mt-1'>
          <div
            className='text-[13px] text-neutral-900'
            dangerouslySetInnerHTML={{
              __html: career.replace(/\n/g, '<br />'),
            }}
          />
        </div>
      </div>

      {/* 경력 이미지 캐러셀 */}
      {careerImages.length > 0 && (
        <div className='mt-3'>
          <DoctorCareerImagesCarousel images={careerImages} lang={lang} />
        </div>
      )}
    </>
  );
}
