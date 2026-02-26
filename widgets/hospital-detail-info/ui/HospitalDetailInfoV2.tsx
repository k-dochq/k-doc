'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { MedicalSpecialtyTagsV2 } from 'shared/ui/medical-specialty-tags/MedicalSpecialtyTagsV2';
import { HospitalDetailBadgeV2 } from 'widgets/hospital-detail-badge/ui/HospitalDetailBadgeV2';
import { HospitalDetailLogoV2 } from 'widgets/hospital-detail-logo/ui/HospitalDetailLogoV2';
import { HospitalReviewStatsV2 } from 'widgets/popular-reviews/ui/HospitalReviewStatsV2';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { formatHospitalPrice } from 'shared/lib/utils/hospital-price';
import { sortMedicalSpecialtiesByDisplayOrder } from 'entities/hospital/lib/medical-specialty-display-order';

interface HospitalDetailInfoV2Props {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailInfoV2({ hospital, lang, dict }: HospitalDetailInfoV2Props) {
  // hospital.displayLocationName이 있으면 사용하고, 없으면 기존 address 사용
  const displayAddress = hospital.displayLocationName
    ? (hospital.displayLocationName as {
        ko_KR?: string;
        en_US?: string;
        th_TH?: string;
        zh_TW?: string;
        ja_JP?: string;
        hi_IN?: string;
        ru_RU?: string;
        tl_PH?: string;
        ar_SA?: string;
      })
    : hospital.address;

  const hospitalName = extractLocalizedText(hospital.name, lang) || '';
  const hospitalAddress = extractLocalizedText(displayAddress, lang) || '';
  const medicalSpecialties = hospital.medicalSpecialties
    ? sortMedicalSpecialtiesByDisplayOrder(hospital.medicalSpecialties, (s) => ({
        id: s.id,
        specialtyType: 'specialtyType' in s ? (s.specialtyType as string) : undefined,
        parentSpecialtyId: 'parentSpecialtyId' in s ? s.parentSpecialtyId : undefined,
        name: 'name' in s ? s.name : undefined,
        order: 'order' in s ? s.order : undefined,
      }))
    : [];

  return (
    <div className='relative z-10 -mt-3 rounded-tl-2xl rounded-tr-2xl bg-white px-5 pt-10 pb-4'>
      {/* 로고 - 병원정보 섹션 기준으로 위치 설정 */}
      <div className='absolute -top-[28px] left-5 z-20'>
        <HospitalDetailLogoV2 hospital={hospital} />
      </div>

      {/* 뱃지 - 병원정보 섹션에 위치, 이미지 섹션 쪽으로 5px 삐져나감 */}
      <HospitalDetailBadgeV2 hospital={hospital} />

      {/* 병원명 */}
      <div className='flex flex-col gap-0.5'>
        <h2 className='text-2xl leading-8 font-semibold text-neutral-700'>{hospitalName}</h2>

        {/* 지역 정보 */}
        {hospitalAddress !== '' && (
          <div className='flex items-center gap-1'>
            <span className='text-sm leading-5 font-medium text-neutral-400'>
              {dict.hospital?.region || '지역'}
            </span>
            <div className='relative flex h-3 w-0 shrink-0 items-center justify-center'>
              <div className='flex-none rotate-90'>
                <div className='relative h-0 w-3'>
                  <svg
                    width='12'
                    height='1'
                    viewBox='0 0 12 1'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='absolute inset-0'
                  >
                    <line y1='0.5' x2='12' y2='0.5' stroke='#A3A3A3' />
                  </svg>
                </div>
              </div>
            </div>
            <div className='relative flex shrink-0 items-center py-0 pr-0 pl-0.5'>
              <span className='text-sm leading-5 font-medium text-neutral-400'>
                {hospitalAddress}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 평점과 가격 정보 */}
      <div className='mt-1.5 flex items-center gap-2'>
        {/* 평점 */}
        <HospitalReviewStatsV2
          hospitalId={hospital.id}
          lang={lang}
          dict={dict}
          showPadding={false}
        />

        {/* 구분선 */}
        <div className='relative flex h-3 w-0 shrink-0 items-center justify-center'>
          <div className='flex-none rotate-90'>
            <div className='relative h-0 w-3'>
              <svg
                width='12'
                height='1'
                viewBox='0 0 12 1'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute inset-0'
              >
                <line y1='0.5' x2='12' y2='0.5' stroke='#A3A3A3' />
              </svg>
            </div>
          </div>
        </div>

        {/* 가격 정보 */}
        <div className='flex flex-1 items-center gap-0'>
          <span
            className={`leading-7 font-semibold text-[#7657FF] ${
              hospital.prices?.minPrice ? 'text-lg' : 'text-sm'
            }`}
          >
            {formatHospitalPrice(hospital.prices, dict)}
          </span>
        </div>
      </div>

      {/* 시술부위 태그 */}
      {medicalSpecialties.length > 0 && (
        <div className='mt-1.5'>
          <MedicalSpecialtyTagsV2
            specialties={medicalSpecialties}
            lang={lang}
            maxDisplay={3}
            textClassName='!text-sm !leading-5'
          />
        </div>
      )}
    </div>
  );
}
