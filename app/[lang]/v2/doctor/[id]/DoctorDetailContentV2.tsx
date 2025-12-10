'use client';

import React from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useDoctorDetail } from '@/lib/queries/doctor';
import { DoctorDetailSkeleton } from '../../../doctor/[id]/DoctorDetailSkeleton';
import { DoctorDetailError } from '../../../doctor/[id]/DoctorDetailError';
import { DoctorDetailNotFound } from '../../../doctor/[id]/DoctorDetailNotFound';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { DoctorCard } from '@/widgets/hospital-detail-doctors/ui/DoctorCard';
import { transformDoctorDetailToHospitalDoctor } from '@/lib/utils/doctor-transform';
import { DoctorCareer } from '@/features/doctor-career';
import { HospitalCard } from '@/entities/hospital/ui/HospitalCard';
import { transformDoctorHospitalToHospitalCard } from '@/lib/utils/doctor-hospital-transform';
import { DoctorHospitalReviews } from '@/features/doctor-hospital-reviews';
import { DoctorDetailHeaderV2 } from 'widgets/doctor-detail-header/ui/DoctorDetailHeaderV2';
import { DoctorProfileV2 } from 'widgets/doctor-detail-profile/ui/DoctorProfileV2';

interface DoctorDetailContentV2Props {
  doctorId: string;
  lang: Locale;
  dict: Dictionary;
}

export function DoctorDetailContentV2({ doctorId, lang, dict }: DoctorDetailContentV2Props) {
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

  return (
    <div>
      <DoctorDetailHeaderV2 lang={lang} dict={dict} doctorId={doctorId} doctorName={doctorTitle} />
      <div className='h-[56px]' />
      {/* 의사 프로필 섹션 */}
      <DoctorProfileV2 doctor={doctor} lang={lang} dict={dict} />
    </div>
  );
}
