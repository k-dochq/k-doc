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

  return (
    <div>
      <PageHeader lang={lang} title={doctorTitle} variant='light' />
      <div className='p-5'>
        <div className=''>
          <DoctorCard doctor={hospitalDoctorData} lang={lang} variant='dark' />
        </div>
        <div className='mt-4'>
          {/* 경력 및 활동 제목 */}
          <h3 className='text-primary text-sm font-semibold'>{dict.doctor.careerAndActivity}</h3>

          {/* 경력 데이터 */}
          <div className='mt-1'>
            <div
              className='text-[13px] text-neutral-900'
              dangerouslySetInnerHTML={{
                __html: doctorCareer
                  ? doctorCareer.replace(/\n/g, '<br />')
                  : dict.doctor.noCareerInfo,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
