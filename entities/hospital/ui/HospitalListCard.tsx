import Image from 'next/image';
import { Building2, MapPin, Star } from 'lucide-react';
import { extractLocalizedText } from 'shared/lib';
import { LocaleLink } from 'shared/ui/locale-link';
import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';

interface HospitalListCardProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalListCard({ hospital, lang }: HospitalListCardProps) {
  const hospitalName = extractLocalizedText(hospital.name, lang);
  const hospitalAddress = extractLocalizedText(hospital.address, lang);

  return (
    <LocaleLink
      href={`/hospitals/${hospital.id}`}
      locale={lang}
      className='block rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md'
    >
      {/* 썸네일 이미지 */}
      <div className='mb-3'>
        <div className='relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100'>
          {hospital.mainImageUrl ? (
            <Image
              src={hospital.mainImageUrl}
              alt={`${hospitalName} 썸네일`}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          ) : (
            <div className='flex h-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
              <div className='text-center'>
                <div className='mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm'>
                  <Building2 className='h-5 w-5 text-gray-600' />
                </div>
                <p className='text-xs text-gray-500'>이미지 준비중</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 병원명 */}
      <div className='mb-2'>
        <h3 className='line-clamp-1 text-lg font-semibold text-gray-900'>{hospitalName}</h3>
      </div>

      {/* 위치 */}
      {hospitalAddress && (
        <div className='mb-2 flex items-center gap-1'>
          <MapPin className='h-4 w-4 flex-shrink-0 text-gray-500' />
          <span className='line-clamp-1 text-sm text-gray-600'>{hospitalAddress}</span>
        </div>
      )}

      {/* 부위 태그 */}
      {hospital.medicalSpecialties && hospital.medicalSpecialties.length > 0 && (
        <div className='mb-3'>
          <div className='flex flex-wrap gap-1'>
            {hospital.medicalSpecialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty.id}
                className='inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700'
              >
                {extractLocalizedText(specialty.name, lang)}
              </span>
            ))}
            {hospital.medicalSpecialties.length > 3 && (
              <span className='inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600'>
                +{hospital.medicalSpecialties.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 평점 */}
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-1'>
          <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
          <span className='text-sm font-medium text-gray-900'>{hospital.rating.toFixed(1)}</span>
        </div>
        <span className='text-sm text-gray-500'>({hospital.reviewCount}개 리뷰)</span>
      </div>
    </LocaleLink>
  );
}
