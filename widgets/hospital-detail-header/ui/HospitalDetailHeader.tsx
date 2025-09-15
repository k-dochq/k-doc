import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { DetailHeader } from 'shared/ui/detail-header';
import { LikeButtonWrapper } from 'features/hospital-like';

interface HospitalDetailHeaderProps {
  lang: Locale;
  dict: Dictionary;
  hospitalId: string;
  hospitalName?: string;
}

export function HospitalDetailHeader({
  lang,
  dict,
  hospitalId,
  hospitalName,
}: HospitalDetailHeaderProps) {
  return (
    <DetailHeader
      lang={lang}
      title={hospitalName || ''}
      fallbackUrl={`/${lang}/hospitals`}
      variant='dark'
      bgClassName='bg-gradient-to-b from-[#FE906C] to-[#FF6CA5]'
      rightContent={<LikeButtonWrapper hospitalId={hospitalId} />}
    />
  );
}
