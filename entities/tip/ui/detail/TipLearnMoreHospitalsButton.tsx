import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';

interface TipLearnMoreHospitalsButtonProps {
  lang: Locale;
  dict: Dictionary;
}

export function TipLearnMoreHospitalsButton({ lang, dict }: TipLearnMoreHospitalsButtonProps) {
  return (
    <LocaleLink
      href='/hospitals'
      locale={lang}
      className='flex w-full items-center justify-center gap-2 rounded-xl bg-[#7657ff] px-5 py-4 text-base font-medium leading-6 text-white'
    >
      {dict.tips?.learnMoreHospitals ?? 'Learn More About Hospitals'}
    </LocaleLink>
  );
}
