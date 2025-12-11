'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { type Dictionary } from 'shared/model/types';
import { type DoctorDetail } from '@/lib/queries/doctor';
import { MedicalSpecialtyTagsV2 } from 'shared/ui/medical-specialty-tags/MedicalSpecialtyTagsV2';

interface DoctorProfileV2Props {
  doctor: DoctorDetail;
  lang: Locale;
  dict: Dictionary;
}

export function DoctorProfileV2({ doctor, lang, dict }: DoctorProfileV2Props) {
  const doctorName = getLocalizedTextByLocale(doctor.name, lang) || '';
  const position = getLocalizedTextByLocale(doctor.position, lang) || '';
  const hospitalName = getLocalizedTextByLocale(doctor.hospital.name, lang) || '';

  // 프로필 이미지 추출 (PROFILE 타입 우선, 없으면 첫 번째 이미지)
  const profileImage = useMemo(() => {
    const profileImg = doctor.doctorImages.find((img) => img.imageType === 'PROFILE');
    if (profileImg) return profileImg;
    return doctor.doctorImages.length > 0 ? doctor.doctorImages[0] : null;
  }, [doctor.doctorImages]);

  const tagSpecialties = useMemo(
    () => doctor.medicalSpecialties || [],
    [doctor.medicalSpecialties],
  );

  return (
    <div className='flex items-start gap-3 px-5 pt-5 pb-2'>
      {/* 프로필 이미지 */}
      <div className='relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-full bg-[#cde3ff] shadow-[1px_2px_4px_0px_rgba(0,0,0,0.4)]'>
        <Image
          src={profileImage?.imageUrl || '/images/shared/default_image_square.png'}
          alt={profileImage?.alt || `${doctorName || 'doctor'} profile`}
          fill
          className='object-cover'
          sizes='100px'
        />
      </div>

      {/* 내용 */}
      <div className='flex min-w-0 flex-1 flex-col gap-2'>
        {/* 이름과 직책 */}
        <div className='flex min-w-0 flex-col gap-0.5 leading-tight'>
          <div className='line-clamp-2 min-w-0 text-[18px] leading-[28px] font-semibold text-neutral-700'>
            {doctorName}
            {position && ` ${position}`}
          </div>
          {hospitalName && (
            <p className='truncate text-[14px] leading-[20px] font-medium text-neutral-400'>
              {hospitalName}
            </p>
          )}
        </div>

        {/* 태그 */}
        {tagSpecialties.length > 0 && (
          <div className='min-w-0'>
            <MedicalSpecialtyTagsV2 specialties={tagSpecialties} lang={lang} />
          </div>
        )}
      </div>
    </div>
  );
}
