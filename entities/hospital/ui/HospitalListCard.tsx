import { LocaleLink } from 'shared/ui/locale-link';
import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { type User } from '@supabase/supabase-js';
import { type Dictionary } from 'shared/model/types';
import { HospitalCardImage } from './HospitalCardImage';
import { HospitalCardHeader } from './HospitalCardHeader';
import { HospitalCardName } from './HospitalCardName';
import { HospitalCardTags } from './HospitalCardTags';
import { HospitalCardRating } from './HospitalCardRating';

interface HospitalListCardProps {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
  user: User | null;
  onToggleLike?: (hospitalId: string) => void;
  isLikeLoading?: boolean;
}

export function HospitalListCard({
  hospital,
  lang,
  dict,
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
      <div className='h-full w-full rounded-xl border border-white bg-white/50'>
        {/* 병원 이미지 */}
        <HospitalCardImage hospital={hospital} lang={lang} />

        {/* 컨텐츠 영역 */}
        <div className='flex w-full flex-col items-start justify-start px-5 py-4'>
          <HospitalCardHeader
            hospital={hospital}
            lang={lang}
            dict={dict}
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
      </div>
    </LocaleLink>
  );
}
