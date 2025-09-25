import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LikeButtonWrapper } from 'features/hospital-like';
import { ShareButton } from 'shared/ui/share-button';

interface HospitalDetailHeaderActionsProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailHeaderActions({
  hospitalId,
  lang,
  dict,
}: HospitalDetailHeaderActionsProps) {
  return (
    <div className='flex items-center gap-3'>
      <LikeButtonWrapper hospitalId={hospitalId} lang={lang} dict={dict} />
    </div>
  );
}
