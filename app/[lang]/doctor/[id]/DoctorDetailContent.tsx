'use client';

import React from 'react';
import { PageHeader } from '@/shared/ui/page-header';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useDoctorDetail } from '@/lib/queries/doctor';
import { DoctorDetailSkeleton } from './DoctorDetailSkeleton';
import { DoctorDetailError } from './DoctorDetailError';
import { DoctorDetailNotFound } from './DoctorDetailNotFound';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { DoctorCard } from '@/widgets/hospital-detail-doctors/ui/DoctorCard';
import { transformDoctorDetailToHospitalDoctor } from '@/lib/utils/doctor-transform';
import { DoctorCareerImagesCarousel } from '@/features/doctor-career-images';
import { HospitalCard } from '@/entities/hospital/ui/HospitalCard';
import { transformDoctorHospitalToHospitalCard } from '@/lib/utils/doctor-hospital-transform';

interface DoctorDetailContentProps {
  doctorId: string;
  lang: Locale;
  dict: Dictionary;
}

export function DoctorDetailContent({ doctorId, lang, dict }: DoctorDetailContentProps) {
  const { data: doctor, isLoading, error } = useDoctorDetail(doctorId);

  if (isLoading) {
    return <DoctorDetailSkeleton lang={lang} dict={dict} />;
  }

  if (error) {
    return <DoctorDetailError lang={lang} dict={dict} error={error} />;
  }

  if (!doctor) {
    return <DoctorDetailNotFound lang={lang} dict={dict} />;
  }

  const doctorName = getLocalizedTextByLocale(doctor.name, lang) || '의사';
  const doctorPosition = getLocalizedTextByLocale(doctor.position, lang);
  const doctorTitle = doctorPosition ? `${doctorName} ${doctorPosition}` : doctorName;

  // 직접 접근으로 테스트
  const localeKey = lang === 'ko' ? 'ko_KR' : lang === 'en' ? 'en_US' : 'th_TH';
  const doctorCareer =
    doctor.career[localeKey] ||
    doctor.career.ko_KR ||
    doctor.career.en_US ||
    doctor.career.th_TH ||
    '';

  // DoctorCard에 맞는 데이터 구조로 변환
  const hospitalDoctorData = transformDoctorDetailToHospitalDoctor(doctor);

  // HospitalCard에 맞는 데이터 구조로 변환
  const hospitalCardData = transformDoctorHospitalToHospitalCard(doctor);

  // 경력 이미지 추출 (CAREER 타입만)
  const careerImages = doctor.doctorImages
    .filter((image) => image.imageType === 'CAREER')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div>
      <PageHeader lang={lang} title={doctorTitle} variant='light' />
      <div className='py-5'>
        <div className='px-5'>
          <div className='rounded-xl border border-white bg-white/50 p-3 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px]'>
            <DoctorCard doctor={hospitalDoctorData} lang={lang} variant='dark' />
            {/* 경력 데이터가 있을 때만 섹션 렌더링 */}
            {doctorCareer && (
              <div className='mt-4'>
                {/* 경력 및 활동 제목 */}
                <h3 className='text-primary text-sm font-semibold'>
                  {dict.doctor.careerAndActivity}
                </h3>

                {/* 경력 데이터 */}
                <div className='mt-1'>
                  <div
                    className='text-[13px] text-neutral-900'
                    dangerouslySetInnerHTML={{
                      __html: doctorCareer.replace(/\n/g, '<br />'),
                    }}
                  />
                </div>
              </div>
            )}

            {/* 경력 이미지 캐러셀 */}
            {careerImages.length > 0 && (
              <div className='mt-3'>
                <DoctorCareerImagesCarousel images={careerImages} lang={lang} />
              </div>
            )}
          </div>
        </div>

        {/* 소속병원 섹션 */}
        <div className='mt-10 px-5'>
          {/* 소속병원 제목 */}
          <h3 className='text-base font-bold'>{dict.doctor.affiliatedHospital}</h3>

          {/* 병원 카드 */}
          <div className='mt-4'>
            <HospitalCard
              hospital={hospitalCardData}
              dict={dict}
              lang={lang}
              showLikeButton={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
