'use client';

import { useState, useMemo } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type HospitalDoctor } from 'entities/hospital/api/entities/types';
import { DoctorCardV2 } from './DoctorCardV2';
import { ArrowRightIcon } from 'shared/ui/arrow-right-icon';

interface HospitalDetailDoctorsV2Props {
  doctors: HospitalDoctor[];
  lang: Locale;
  dict: Dictionary;
  showAllInitially?: boolean;
}

export function HospitalDetailDoctorsV2({
  doctors,
  lang,
  dict,
  showAllInitially = false,
}: HospitalDetailDoctorsV2Props) {
  const [showAll, setShowAll] = useState(showAllInitially);
  const doctorCount = doctors.length;
  const displayDoctors = useMemo(
    () => (showAll ? doctors : doctors.slice(0, 3)),
    [showAll, doctors],
  );

  if (!doctors || doctors.length === 0) {
    return null;
  }

  const handleToggle = () => {
    setShowAll(true);
  };

  const viewAllLabel = dict.hospitals?.doctors?.viewAll ?? '모든 의사 보기';

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-1'>
        <h2 className='text-lg leading-7 font-semibold text-neutral-700'>
          {dict.hospitals?.doctors?.title || '소속 의료진'}
        </h2>
        <span className='text-sm leading-5 font-medium text-neutral-700'>({doctorCount})</span>
      </div>

      <div className='space-y-4'>
        {displayDoctors.map((doctor) => (
          <DoctorCardV2 key={doctor.id} doctor={doctor} lang={lang} dict={dict} />
        ))}
      </div>

      {!showAll && doctorCount > 3 && (
        <button
          onClick={handleToggle}
          className='flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-100 px-5 py-2 text-sm leading-5 text-neutral-500'
        >
          <span>{viewAllLabel}</span>
          <ArrowRightIcon size={14} className='text-neutral-500' />
        </button>
      )}
    </div>
  );
}
