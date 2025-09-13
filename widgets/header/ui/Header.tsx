import { HeaderLogo } from './HeaderLogo';
import { HeaderLanguageSwitcher } from './HeaderLanguageSwitcher';
import { HeaderProfile } from './HeaderProfile';
import { type Locale } from 'shared/config';
import { LocaleLink } from 'shared/ui/locale-link';

interface HeaderProps {
  currentLang: Locale;
}

export function Header({ currentLang }: HeaderProps) {
  return (
    <header className='sticky top-0 z-50 w-full bg-white px-5 py-4'>
      <div className='flex items-center justify-between'>
        <LocaleLink href='/' className='text-primary'>
          <HeaderLogo />
        </LocaleLink>
        <div className='flex items-center'>
          <HeaderLanguageSwitcher currentLang={currentLang} />
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
}
