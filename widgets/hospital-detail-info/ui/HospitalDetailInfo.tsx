'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { HotLabel } from '@/shared/ui/hot-label';
import { StarIcon } from 'shared/ui/star-icon';
import { MedicalSpecialtyTags } from 'shared/ui/medical-specialty-tags';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { formatHospitalPrice } from 'shared/lib/utils/hospital-price';

interface HospitalDetailInfoProps {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailInfo({ hospital, lang, dict }: HospitalDetailInfoProps) {
  // hospital.displayLocationName이 있으면 사용하고, 없으면 기존 address 사용
  const displayAddress = hospital.displayLocationName
    ? (hospital.displayLocationName as {
        ko_KR?: string;
        en_US?: string;
        th_TH?: string;
        zh_TW?: string;
        ja_JP?: string;
        hi_IN?: string;
      })
    : hospital.address;

  const hospitalName = extractLocalizedText(hospital.name, lang) || '';
  const hospitalAddress = extractLocalizedText(displayAddress, lang) || '';

  return (
    <div className='relative z-10 -mt-3 rounded-xl border border-white bg-white/50 p-4 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px]'>
      {/* 병원명 */}
      <h2 className='text-xl font-bold text-neutral-900'>{hospitalName}</h2>

      <div className='h-0.5' />

      {/* 지역 정보 */}
      <div className='flex items-center gap-1 text-xs font-medium text-neutral-500'>
        {hospitalAddress !== '' && (
          <>
            <span>{dict.hospital?.region || '지역'}</span>
            <div className='h-[10px] w-px bg-neutral-500'></div>
            <span>{hospitalAddress}</span>
          </>
        )}
      </div>

      <div className='h-2' />

      {/* 평점과 가격 정보 */}
      <div className='flex items-center gap-2'>
        {/* 평점 */}
        <div className='flex items-center gap-0.5'>
          <StarIcon width={20} height={20} />
          <span className='text-primary text-lg font-bold'>
            {(hospital.rating || 0).toFixed(1)}
          </span>
          <span className='text-primary text-sm'>({hospital.reviewCount || 0})</span>
        </div>

        {/* 가격 정보 */}
        <div className='flex items-center gap-1'>
          <span
            className={`font-semibold text-neutral-900 ${
              hospital.prices?.minPrice ? 'text-base' : 'text-sm'
            }`}
          >
            {formatHospitalPrice(hospital.prices, dict)}
          </span>
          {hospital.discountRate != null && hospital.discountRate > 0 && (
            <div className='flex items-center justify-center rounded-[4px] bg-[#0B99FF] px-1 py-0.5 text-xs font-semibold text-white'>
              {hospital.discountRate}% OFF
            </div>
          )}
        </div>
      </div>

      <div className='h-2' />

      {/* 시술부위 태그 */}
      {hospital.medicalSpecialties && hospital.medicalSpecialties.length > 0 && (
        <div>
          <MedicalSpecialtyTags
            specialties={hospital.medicalSpecialties as any}
            lang={lang}
            maxDisplay={3}
          />
        </div>
      )}
    </div>
  );
}
