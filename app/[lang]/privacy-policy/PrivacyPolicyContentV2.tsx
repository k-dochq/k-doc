import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface PrivacyPolicyContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function PrivacyPolicyContentV2({ lang, dict }: PrivacyPolicyContentV2Props) {
  return (
    <div className='px-5 pt-8 pb-20'>
      <h1 className='mb-8 text-3xl font-semibold text-neutral-700'>{dict.footer.privacyPolicy}</h1>

      <div className='flex flex-col gap-10'>{/* 내용은 추후 추가 예정 */}</div>
    </div>
  );
}
