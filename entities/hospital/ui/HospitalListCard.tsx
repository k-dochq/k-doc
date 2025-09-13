import { LocaleLink } from 'shared/ui/locale-link';
import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { HospitalCardImage } from './HospitalCardImage';
import { HospitalCardHeader } from './HospitalCardHeader';
import { HospitalCardTags } from './HospitalCardTags';
import { HospitalCardRating } from './HospitalCardRating';

interface HospitalListCardProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalListCard({ hospital, lang }: HospitalListCardProps) {
  return (
    <LocaleLink
      href={`/hospitals/${hospital.id}`}
      locale={lang}
      className='flex w-full flex-col items-start justify-start px-5 py-4'
    >
      {/* 병원 이미지 */}
      <HospitalCardImage hospital={hospital} lang={lang} />

      <div className='h-3' />

      {/* 컨텐츠 영역 */}
      <div className='flex w-full flex-col items-start justify-start'>
        <HospitalCardHeader hospital={hospital} lang={lang} />

        <div className='flex w-full flex-col items-start justify-start gap-2'>
          <HospitalCardTags hospital={hospital} lang={lang} />
          <HospitalCardRating hospital={hospital} />
        </div>
      </div>
    </LocaleLink>
  );
}
