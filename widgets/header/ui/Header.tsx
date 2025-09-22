import { HeaderLogo } from './HeaderLogo';
import { HeaderLanguageSwitcher } from './HeaderLanguageSwitcher';
import { HeaderProfile } from './HeaderProfile';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';

interface HeaderProps {
  currentLang: Locale;
  dict: Dictionary;
}

export function Header({ currentLang, dict }: HeaderProps) {
  return (
    <header
      className='sticky top-0 z-50 w-full'
      style={{ background: 'rgba(254, 219, 249, 0.70)', backdropFilter: 'blur(15px)' }}
    >
      <div className='flex h-[58px] items-center justify-between px-5'>
        <LocaleLink href='/main' className='text-primary'>
          <HeaderLogo />
        </LocaleLink>
        <div className='flex items-center'>
          <HeaderLanguageSwitcher currentLang={currentLang} />
          <HeaderProfile lang={currentLang} dict={dict} />
        </div>
      </div>
    </header>
  );
}
