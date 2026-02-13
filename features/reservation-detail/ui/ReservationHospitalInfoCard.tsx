'use client';

import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { DEFAULT_IMAGES } from 'shared/config/images';
import { ChevronRightIcon } from 'shared/ui/chevron-right-icon';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { type Prisma } from '@prisma/client';

interface ReservationHospitalInfoCardProps {
  hospitalId: string;
  hospitalName: string;
  logoImageUrl: string | null;
  displayLocationName: Prisma.JsonValue | null;
  district: {
    name: Prisma.JsonValue;
    displayName: Prisma.JsonValue | null;
  } | null;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationHospitalInfoCard({
  hospitalId,
  hospitalName,
  logoImageUrl,
  displayLocationName,
  district,
  lang,
  dict,
}: ReservationHospitalInfoCardProps) {
  const router = useLocalizedRouter();

  // 지역명 추출: displayLocationName 우선, 없으면 district.displayName, 그것도 없으면 district.name (현재 언어로 표시)
  const locationName = displayLocationName
    ? extractLocalizedText(displayLocationName, lang)
    : district
      ? extractLocalizedText(district.displayName || district.name, lang)
      : null;

  const handleClick = () => {
    router.push(`/hospital/${hospitalId}`);
  };

  return (
    <button
      onClick={handleClick}
      className='flex w-full items-center gap-3 text-left'
      type='button'
    >
      {/* 로고 */}
      <div className='relative size-[46px] shrink-0 overflow-hidden rounded-full'>
        <Image
          src={logoImageUrl || DEFAULT_IMAGES.HOSPITAL_LOGO_DEFAULT}
          alt={hospitalName}
          fill
          className='object-cover'
        />
      </div>

      {/* 병원 이름 및 지역 */}
      <div className='flex flex-1 flex-col gap-[2px]'>
        <p className='text-sm leading-[20px] font-semibold whitespace-pre-wrap text-[#404040]'>
          {hospitalName}
        </p>
        {locationName && (
          <div className='flex items-center gap-1'>
            <p className='text-xs leading-[16px] font-medium text-[#a3a3a3]'>
              {dict.consultation?.appointment?.region || '지역'}
            </p>
            <div className='h-[10px] w-px bg-[#A3A3A3]' />
            <p className='pl-0.5 text-xs leading-[16px] font-medium text-[#a3a3a3]'>
              {locationName}
            </p>
          </div>
        )}
      </div>

      {/* ChevronRight 아이콘 */}
      <div className='shrink-0'>
        <ChevronRightIcon size={24} color='#A3A3A3' />
      </div>
    </button>
  );
}
