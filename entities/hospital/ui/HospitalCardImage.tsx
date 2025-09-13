import Image from 'next/image';
import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';

interface HospitalCardImageProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalCardImage({ hospital, lang }: HospitalCardImageProps) {
  const hospitalName = extractLocalizedText(hospital.name, lang);

  return (
    <div className='relative h-[216px] w-full overflow-hidden rounded-xl bg-neutral-300'>
      {hospital.mainImageUrl ? (
        <Image
          src={hospital.mainImageUrl}
          alt={`${hospitalName} 썸네일`}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      ) : (
        <Image
          src='/images/shared/default_image.png'
          alt={`${hospitalName} 기본 이미지`}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}
    </div>
  );
}
