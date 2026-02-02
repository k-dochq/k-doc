import { HeaderLogoV2 } from './HeaderLogoV2';
import { HeaderLanguageSwitcherV2 } from './HeaderLanguageSwitcherV2';
import { HeaderProfileV2 } from './HeaderProfileV2';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';

interface HeaderV2Props {
  currentLang: Locale;
  dict: Dictionary;
}

export function HeaderV2({ currentLang, dict }: HeaderV2Props) {
  return (
    <header
      className='sticky top-0 z-50 w-full border-b border-neutral-200 bg-white'
      dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className='flex h-[58px] items-center justify-between px-5'>
        <LocaleLink href='/main' className='text-primary'>
          <HeaderLogoV2 />
        </LocaleLink>
        <div className='flex items-center gap-3'>
          <HeaderLanguageSwitcherV2 currentLang={currentLang} />
          <HeaderProfileV2 lang={currentLang} dict={dict} />
        </div>
      </div>
    </header>
  );
}
