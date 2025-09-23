'use client';

import { Suspense } from 'react';
import { PageHeader } from '@/shared/ui/page-header';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useDoctorDetail } from '@/lib/queries/doctor';
import { DoctorDetailSkeleton } from './DoctorDetailSkeleton';
import { DoctorDetailError } from './DoctorDetailError';
import { DoctorDetailNotFound } from './DoctorDetailNotFound';
import { getLocalizedTextByLocale } from 'shared/model/types/common';

interface DoctorDetailContentProps {
  doctorId: string;
  lang: Locale;
  dict: Dictionary;
}

function DoctorDetailContentInner({ doctorId, lang, dict }: DoctorDetailContentProps) {
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
      <PageHeader lang={lang} title={doctorTitle} variant='light' />
    </div>
  );
}

export function DoctorDetailContent(props: DoctorDetailContentProps) {
  return (
    <Suspense fallback={<DoctorDetailSkeleton lang={props.lang} dict={props.dict} />}>
      <DoctorDetailContentInner {...props} />
    </Suspense>
  );
}
