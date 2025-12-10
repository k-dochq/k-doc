'use client';

import React from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useDoctorDetail } from '@/lib/queries/doctor';
import { DoctorDetailSkeletonV2 } from './DoctorDetailSkeletonV2';
import { DoctorDetailErrorV2 } from './DoctorDetailErrorV2';
import { DoctorDetailNotFoundV2 } from './DoctorDetailNotFoundV2';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { transformDoctorHospitalToHospitalCard } from '@/lib/utils/doctor-hospital-transform';
import { DoctorDetailHeaderV2 } from 'widgets/doctor-detail-header/ui/DoctorDetailHeaderV2';
import { DoctorProfileV2 } from 'widgets/doctor-detail-profile/ui/DoctorProfileV2';
import { DoctorCareerV2 } from 'widgets/doctor-detail-career/ui/DoctorCareerV2';
import { DoctorCareerAndActivityV2 } from 'widgets/doctor-detail-career/ui/DoctorCareerAndActivityV2';
import { DoctorAffiliatedHospitalSectionV2 } from 'widgets/doctor-affiliated-hospital/ui';
import { PopularReviewsV2ContainerForHospital } from 'widgets/popular-reviews/ui/PopularReviewsV2ContainerForHospital';

interface DoctorDetailContentV2Props {
  doctorId: string;
  lang: Locale;
  dict: Dictionary;
}

export function DoctorDetailContentV2({ doctorId, lang, dict }: DoctorDetailContentV2Props) {
  const { data: doctor, isLoading, error } = useDoctorDetail(doctorId);

  if (isLoading) {
    return <DoctorDetailSkeletonV2 lang={lang} dict={dict} />;
  }

  if (error) {
    return <DoctorDetailErrorV2 lang={lang} dict={dict} error={error} />;
  }

  if (!doctor) {
    return <DoctorDetailNotFoundV2 lang={lang} dict={dict} />;
  }

  const doctorName = getLocalizedTextByLocale(doctor.name, lang) || '의사';
  const doctorPosition = getLocalizedTextByLocale(doctor.position, lang);
  const doctorTitle = doctorPosition ? `${doctorName} ${doctorPosition}` : doctorName;
  const affiliatedHospital = transformDoctorHospitalToHospitalCard(doctor);
  const hospitalId = doctor.hospital?.id;

  return (
    <div>
      <DoctorDetailHeaderV2 lang={lang} dict={dict} doctorId={doctorId} doctorName={doctorTitle} />
      <div className='h-[56px]' />
      {/* 의사 프로필 섹션 */}
      <DoctorProfileV2 doctor={doctor} lang={lang} dict={dict} />
      {/* 의사 약력 섹션 */}
      <DoctorCareerV2 doctor={doctor} lang={lang} dict={dict} />
      {/* 경력 및 활동 섹션 */}
      <DoctorCareerAndActivityV2 doctor={doctor} lang={lang} dict={dict} />
      {/* 소속 병원 섹션 */}
      {affiliatedHospital && (
        <DoctorAffiliatedHospitalSectionV2 doctor={doctor} lang={lang} dict={dict} />
      )}
      {/* 시술후기(인기후기) 섹션 */}
      {hospitalId && (
        <div className='pt-5 pb-11'>
          <PopularReviewsV2ContainerForHospital hospitalId={hospitalId} lang={lang} dict={dict} />
        </div>
      )}
    </div>
  );
}
