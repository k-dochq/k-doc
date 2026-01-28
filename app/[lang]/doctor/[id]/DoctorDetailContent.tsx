'use client';

import React from 'react';
import { PageHeader } from '@/shared/ui/page-header';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useDoctorDetail } from '@/lib/queries/doctor';
import { DoctorDetailSkeleton } from './DoctorDetailSkeleton';
import { DoctorDetailError } from './DoctorDetailError';
import { DoctorDetailNotFound } from './DoctorDetailNotFound';
import { getDoctorNameFromLocalizedText } from 'shared/lib/doctor-name';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { DoctorCard } from '@/widgets/hospital-detail-doctors/ui/DoctorCard';
import { transformDoctorDetailToHospitalDoctor } from '@/lib/utils/doctor-transform';
import { DoctorCareer } from '@/features/doctor-career';
import { HospitalCard } from '@/entities/hospital/ui/HospitalCard';
import { transformDoctorHospitalToHospitalCard } from '@/lib/utils/doctor-hospital-transform';
import { DoctorHospitalReviews } from '@/features/doctor-hospital-reviews';
import { DoctorDetailHeaderActions } from './DoctorDetailHeaderActions';

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

  const doctorName = getDoctorNameFromLocalizedText(doctor.name, lang) || '의사';
  const doctorPosition = getLocalizedTextByLocale(
    doctor.position,
    lang === 'tl' ? 'en' : lang,
  );
  const doctorTitle = doctorPosition ? `${doctorName} ${doctorPosition}` : doctorName;

  // 필리핀어(tl)일 때는 영어(en_US)와 동일하게 약력 표시
  const localeKey =
    lang === 'tl'
      ? 'en_US'
      : lang === 'ko'
        ? 'ko_KR'
        : lang === 'en'
          ? 'en_US'
          : lang === 'th'
            ? 'th_TH'
            : lang === 'zh-Hant'
              ? 'zh_TW'
              : 'ja_JP';
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
      <PageHeader
        lang={lang}
        title={doctorTitle}
        variant='light'
        rightContent={
          <DoctorDetailHeaderActions
            doctorId={doctorId}
            lang={lang}
            dict={dict}
            doctorName={doctorName}
          />
        }
      />
      <div className='py-5'>
        <div className='px-5'>
          <div className='rounded-xl border border-white bg-white/50 p-3 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px]'>
            <DoctorCard
              doctor={hospitalDoctorData}
              lang={lang}
              dict={dict}
              variant='dark'
              showMoreButton={false}
              showLikeButton={false}
              showBackground={false}
            />

            {/* 경력 섹션 */}
            <DoctorCareer
              career={doctorCareer}
              careerImages={careerImages}
              lang={lang}
              dict={dict}
            />
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

        {/* 시술후기 섹션 */}
        <DoctorHospitalReviews
          reviews={doctor.hospital.reviews}
          hospitalId={doctor.hospital.id}
          lang={lang}
          dict={dict}
        />
      </div>
    </div>
  );
}
