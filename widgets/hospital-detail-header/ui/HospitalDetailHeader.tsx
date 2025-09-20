import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeader } from 'shared/ui/page-header';
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
    <PageHeader
      lang={lang}
      title={hospitalName || ''}
      fallbackUrl={`/${lang}/hospitals`}
      variant='dark'
      bgClassName='bg-white/50'
      rightContent={<LikeButtonWrapper hospitalId={hospitalId} lang={lang} dict={dict} />}
    />
  );
}
