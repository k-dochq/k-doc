import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getTermsOfServiceLink, getPrivacyPolicyLink, getDataRequestLink } from 'shared/config/policy-links';
import { LocaleLink } from 'shared/ui/locale-link';

interface FooterPolicyLinksProps {
  lang: Locale;
  dict: Dictionary;
}

export function FooterPolicyLinks({ lang, dict }: FooterPolicyLinksProps) {
  return (
    <div className='space-y-2 text-xs font-medium text-neutral-500'>
      {/* 첫 번째 라인: 이용약관 | Contact us */}
      <div className='flex items-center justify-between'>
        <a
          href={getTermsOfServiceLink(lang)}
          target='_blank'
          rel='noopener noreferrer'
          className='transition-colors hover:text-neutral-800'
        >
          {dict.footer.termsOfService}
        </a>
        <LocaleLink href='/contact' className='transition-colors hover:text-neutral-800'>
          {dict.footer.contactUs}
        </LocaleLink>
      </div>
      
      {/* 두 번째 라인: 개인정보 처리방침 | 정보 수정/삭제 요청 */}
      <div className='flex items-center justify-between'>
        <a
          href={getPrivacyPolicyLink(lang)}
          target='_blank'
          rel='noopener noreferrer'
          className='transition-colors hover:text-neutral-800'
        >
          {dict.footer.privacyPolicy}
        </a>
        <a
          href={getDataRequestLink(lang)}
          target='_blank'
          rel='noopener noreferrer'
          className='text-neutral-400 transition-colors hover:text-neutral-800'
        >
          {dict.footer.dataRequest}
        </a>
      </div>
    </div>
  );
}
