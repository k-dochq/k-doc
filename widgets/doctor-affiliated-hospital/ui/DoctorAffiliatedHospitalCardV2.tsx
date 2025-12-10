'use client';

import Image from 'next/image';
import { type HospitalCardData, type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { HospitalLikeButton } from 'features/hospital-like/ui/HospitalLikeButton';
import { MedicalSpecialtyTagsV2 } from 'shared/ui/medical-specialty-tags/MedicalSpecialtyTagsV2';
import { HospitalCardV2NameAndLocation } from 'entities/hospital/ui/HospitalCardV2NameAndLocation';
import { HospitalCardV2Rating } from 'entities/hospital/ui/HospitalCardV2Rating';
import { HospitalCardV2Price } from 'entities/hospital/ui/HospitalCardV2Price';
import { getLocalizedTextByLocale } from 'shared/model/types/common';

interface DoctorAffiliatedHospitalCardV2Props {
  hospital: HospitalCardData;
  lang: Locale;
  dict: Dictionary;
}

export function DoctorAffiliatedHospitalCardV2({
  hospital,
  lang,
  dict,
}: DoctorAffiliatedHospitalCardV2Props) {
  const hospitalName = getLocalizedTextByLocale(hospital.name, lang) || '';
  const displayLocationName = hospital.displayLocationName
    ? getLocalizedTextByLocale(hospital.displayLocationName, lang)
    : null;
  const address = getLocalizedTextByLocale(hospital.address, lang);
  const location = displayLocationName || address;
  const price = hospital.prices?.minPrice ? `$${hospital.prices.minPrice.toLocaleString()}~` : '';

  return (
    <div className='flex max-h-[135px] w-full items-start overflow-hidden rounded-xl bg-white shadow-[1px_2px_4px_0_rgba(0,0,0,0.40)]'>
      {/* 썸네일 영역 */}
      <div className='relative h-[135px] w-[156px] shrink-0 overflow-hidden rounded-l-xl bg-neutral-100'>
        <Image
          src={hospital.thumbnailImageUrl || '/images/shared/default_image_square.png'}
          alt={hospitalName || 'hospital thumbnail'}
          fill
          className='object-cover'
          sizes='104px'
        />
        <div className='absolute bottom-2 left-2'>
          <HospitalLikeButton
            hospitalId={hospital.id}
            locale={lang}
            dict={dict}
            showCount={false}
            size='sm'
          />
        </div>
      </div>

      {/* 정보 영역 */}
      <div className='flex min-w-0 flex-1 flex-col gap-2 px-3 pt-3'>
        {/* 이름 / 위치 */}
        <HospitalCardV2NameAndLocation
          hospitalName={hospitalName}
          location={location}
          dict={dict}
        />

        {/* 가격, 별점 */}
        <div className='flex flex-col gap-1'>
          <HospitalCardV2Price price={price} />
          <HospitalCardV2Rating rating={hospital.rating} reviewCount={hospital.reviewCount} />
        </div>
      </div>
    </div>
  );
}
