'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type DoctorDetail } from '@/lib/queries/doctor';
import { DoctorCareerImagesCarouselV2 } from 'features/doctor-career-images/ui/DoctorCareerImagesCarouselV2';

interface DoctorCareerAndActivityV2Props {
  doctor: DoctorDetail;
  lang: Locale;
  dict: Dictionary;
}

export function DoctorCareerAndActivityV2({ doctor, lang, dict }: DoctorCareerAndActivityV2Props) {
  // 경력 이미지 추출 (CAREER 타입만)
  const careerImages = doctor.doctorImages
    .filter((image) => image.imageType === 'CAREER')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // 경력 이미지가 없으면 렌더링하지 않음
  if (careerImages.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-col gap-3 bg-white px-5 py-5'>
      {/* 제목 */}
      <h3 className='text-[18px] leading-[28px] font-semibold text-neutral-700'>
        {dict.doctor.careerAndActivity}
      </h3>

      {/* 이미지 캐러셀 */}
      <DoctorCareerImagesCarouselV2 images={careerImages} lang={lang} />
    </div>
  );
}
