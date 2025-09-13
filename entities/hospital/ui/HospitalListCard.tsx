import { LocaleLink } from 'shared/ui/locale-link';
import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { type User } from '@supabase/supabase-js';
import { HospitalCardImage } from './HospitalCardImage';
import { HospitalCardHeader } from './HospitalCardHeader';
import { HospitalCardName } from './HospitalCardName';
import { HospitalCardTags } from './HospitalCardTags';
import { HospitalCardRating } from './HospitalCardRating';

interface HospitalListCardProps {
  hospital: Hospital;
  lang: Locale;
  user: User | null;
  onToggleLike?: (hospitalId: string) => void;
  isLikeLoading?: boolean;
}

export function HospitalListCard({
  hospital,
  lang,
  user,
  onToggleLike,
  isLikeLoading = false,
}: HospitalListCardProps) {
  return (
    <LocaleLink
      href={`/hospital/${hospital.id}`}
      locale={lang}
      className='flex w-full flex-col items-start justify-start px-5 py-4'
    >
      {/* 병원 이미지 */}
      <HospitalCardImage hospital={hospital} lang={lang} />

      <div className='h-3' />

      {/* 컨텐츠 영역 */}
      <div className='flex w-full flex-col items-start justify-start'>
        <HospitalCardHeader
          hospital={hospital}
          lang={lang}
          user={user}
          onToggleLike={onToggleLike}
          isLikeLoading={isLikeLoading}
        />

        <div className='h-0.5' />

        <HospitalCardName hospital={hospital} lang={lang} />

        <div className='h-[6px]' />

        <HospitalCardTags hospital={hospital} lang={lang} />

        <div className='h-2' />

        <HospitalCardRating hospital={hospital} />
      </div>
    </LocaleLink>
  );
}
