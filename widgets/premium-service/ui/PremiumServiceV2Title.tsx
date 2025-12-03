import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface PremiumServiceV2TitleProps {
  lang: Locale;
  dict: Dictionary;
}

export function PremiumServiceV2Title({ lang, dict }: PremiumServiceV2TitleProps) {
  return (
    <div className='flex flex-col gap-1'>
      <p className='text-2xl leading-8 font-semibold text-neutral-700'>
        {dict.premiumService?.title || 'K-DOC 프리미엄 서비스'}
      </p>
      <p className='text-sm leading-5 font-medium text-neutral-500'>
        {dict.premiumService?.subtitle || '시술부터 여행까지 모든 것을 지원합니다.'}
      </p>
    </div>
  );
}
