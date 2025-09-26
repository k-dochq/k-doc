import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LikeButtonWrapper } from 'features/hospital-like';
import { ShareButton } from 'shared/ui/share-button';

interface HospitalDetailHeaderActionsProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
  hospitalName?: string;
}

export function HospitalDetailHeaderActions({
  hospitalId,
  lang,
  dict,
  hospitalName,
}: HospitalDetailHeaderActionsProps) {
  const shareTitle = hospitalName ? `${hospitalName} - K-DOC` : 'K-DOC';
  const shareText = hospitalName
    ? `${hospitalName}의 상세 정보를 확인해보세요`
    : '병원 정보를 확인해보세요';

  return (
    <div className='flex items-center gap-1'>
      <div className='md:hidden'>
        <ShareButton title={shareTitle} text={shareText} />
      </div>
      <LikeButtonWrapper hospitalId={hospitalId} lang={lang} dict={dict} />
    </div>
  );
}
