'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { type Prisma } from '@prisma/client';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface HospitalInfoCardProps {
  hospital: {
    id: string;
    name: unknown;
    address: unknown;
    thumbnailImageUrl: string | null;
  };
  lang: Locale;
}

export function HospitalInfoCard({ hospital, lang }: HospitalInfoCardProps) {
  const hospitalName = extractLocalizedText(hospital.name as Prisma.JsonValue, lang);
  const hospitalAddress = extractLocalizedText(hospital.address as Prisma.JsonValue, lang);

  return (
    <div className='rounded-xl border border-white bg-white/50 p-4 shadow-sm backdrop-blur-sm'>
      <div className='flex gap-3'>
        {/* 병원 썸네일 */}
        <div className='relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg'>
          {hospital.thumbnailImageUrl ? (
            <Image
              src={hospital.thumbnailImageUrl}
              alt={hospitalName}
              fill
              className='object-cover'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center bg-gray-200'>
              <MapPin size={24} className='text-gray-400' />
            </div>
          )}
        </div>

        {/* 병원 정보 */}
        <div className='flex-1 space-y-1'>
          <h3 className='font-semibold text-gray-900'>{hospitalName}</h3>
          <p className='text-sm text-gray-600'>{hospitalAddress}</p>
        </div>
      </div>
    </div>
  );
}
