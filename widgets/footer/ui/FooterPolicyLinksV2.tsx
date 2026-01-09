import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getPrivacyPolicyLink, getDataRequestLink } from 'shared/config/policy-links';
import { LocaleLink } from 'shared/ui/locale-link';

interface FooterPolicyLinksV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function FooterPolicyLinksV2({ lang, dict }: FooterPolicyLinksV2Props) {
  // 태국어일 경우에만 spacing 4, 그 외에는 spacing 6
  const linkGap = lang === 'th' ? 'gap-4' : 'gap-6';

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        {/* 정책 링크 */}
        <div
          className={`flex items-start ${linkGap} text-xs leading-[16px] font-normal text-[#BABEC4]`}
        >
          <LocaleLink
            href='/terms-of-service'
            locale={lang}
            className='shrink-0 transition-colors hover:text-neutral-200'
          >
            {dict.footer.termsOfService}
          </LocaleLink>
          <a
            href={getPrivacyPolicyLink(lang)}
            target='_blank'
            rel='noopener noreferrer'
            className='shrink-0 transition-colors hover:text-neutral-200'
          >
            {dict.footer.privacyPolicy}
          </a>
          <LocaleLink
            href='/notices'
            locale={lang}
            className='shrink-0 transition-colors hover:text-neutral-200'
          >
            {dict.footer.notices}
          </LocaleLink>
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
