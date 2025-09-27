import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getTermsOfServiceLink, getPrivacyPolicyLink } from 'shared/config/policy-links';
import { LocaleLink } from 'shared/ui/locale-link';

interface FooterPolicyLinksProps {
  lang: Locale;
  dict: Dictionary;
}

export function FooterPolicyLinks({ lang, dict }: FooterPolicyLinksProps) {
  return (
    <div className='flex items-center justify-between text-xs font-medium text-neutral-500'>
      <a
        href={getTermsOfServiceLink(lang)}
        target='_blank'
        rel='noopener noreferrer'
        className='transition-colors hover:text-neutral-800'
      >
        {dict.footer.termsOfService}
      </a>
      <a
        href={getPrivacyPolicyLink(lang)}
        target='_blank'
        rel='noopener noreferrer'
        className='transition-colors hover:text-neutral-800'
      >
        {dict.footer.privacyPolicy}
      </a>
      <LocaleLink href='/contact' className='transition-colors hover:text-neutral-800'>
        {dict.footer.contactUs}
      </LocaleLink>
    </div>
  );
}
