import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import {
  getTermsOfServiceLink,
  getPrivacyPolicyLink,
  getDataRequestLink,
} from 'shared/config/policy-links';

interface FooterPolicyLinksV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function FooterPolicyLinksV2({ lang, dict }: FooterPolicyLinksV2Props) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        {/* 정책 링크 */}
        <div className='flex items-start gap-6 text-xs leading-[16px] font-normal text-[#BABEC4]'>
          <a
            href={getTermsOfServiceLink(lang)}
            target='_blank'
            rel='noopener noreferrer'
            className='shrink-0 transition-colors hover:text-neutral-200'
          >
            {dict.footer.termsOfService}
          </a>
          <a
            href={getPrivacyPolicyLink(lang)}
            target='_blank'
            rel='noopener noreferrer'
            className='shrink-0 transition-colors hover:text-neutral-200'
          >
            {dict.footer.privacyPolicy}
          </a>
        </div>

        {/* 구분선 */}
        <div className='h-px w-full bg-[#7E848D]' />

        {/* COPYRIGHT */}
        <p className='text-left text-xs leading-[16px] font-normal text-[#BABEC4]'>
          COPYRIGHT © K-DOC. ALL RIGHT RESERVED
        </p>
      </div>

      {/* 정보 수정/삭제 요청 */}
      <div className='flex items-center justify-end'>
        <a
          href={getDataRequestLink(lang)}
          target='_blank'
          rel='noopener noreferrer'
          className='text-right text-xs leading-[16px] font-normal text-[#BABEC4] transition-colors'
        >
          {dict.footer.dataRequest}
        </a>
      </div>
    </div>
  );
}
