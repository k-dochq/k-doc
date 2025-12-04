import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FooterLogoV2 } from './FooterLogoV2';
import { FooterAboutButtonV2 } from './FooterAboutButtonV2';
import { FooterCompanyInfoV2 } from './FooterCompanyInfoV2';
import { FooterPolicyLinksV2 } from './FooterPolicyLinksV2';

interface FooterV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function FooterV2({ lang, dict }: FooterV2Props) {
  return (
    <footer className='bg-[#2D3138] px-5 py-12'>
      <div className='flex flex-col gap-8'>
        {/* 상단 섹션: 로고와 회사소개/Contact us */}
        <div className='flex items-end justify-between'>
          <FooterLogoV2 />
          <FooterAboutButtonV2 dict={dict} />
        </div>

        {/* 회사 정보 리스트 */}
        <FooterCompanyInfoV2 dict={dict} lang={lang} />

        {/* 하단 섹션: 정책 링크, 구분선, COPYRIGHT, 정보 수정/삭제 요청 */}
        <FooterPolicyLinksV2 lang={lang} dict={dict} />
      </div>
    </footer>
  );
}
