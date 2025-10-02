import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FooterLogo } from './FooterLogo';
import { FooterAboutButton } from './FooterAboutButton';
import { FooterCompanyInfo } from './FooterCompanyInfo';
import { FooterPolicyLinks } from './FooterPolicyLinks';

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className='bg-gradient-to-t from-[#FCE4FF] to-[#FCE4FF] px-5 pt-5 pb-16'>
      {/* 상단 섹션: 로고와 회사소개 버튼 */}
      <div className='mb-4 flex items-center justify-between'>
        <FooterLogo />
        <FooterAboutButton dict={dict} />
      </div>

      {/* 회사 정보 */}
      <div className='mb-6'>
        <FooterCompanyInfo dict={dict} />
      </div>

      {/* 하단 정책 링크 */}
      <FooterPolicyLinks lang={lang} dict={dict} />
    </footer>
  );
}
