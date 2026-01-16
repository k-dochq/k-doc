'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ContactButtonSectionV2Props {
  lang: Locale;
  dict: Dictionary;
}

/**
 * 언어별 입점신청 Google Forms 링크를 반환합니다.
 * 기본값(default)은 영어 버전 링크입니다.
 */
function getPartnershipFormLink(lang: Locale): string {
  switch (lang) {
    case 'ko':
      return 'https://forms.gle/ZJFDn86aZ2BCWTD57';
    case 'en':
      return 'https://forms.gle/mm882V8DZLyAgtVA6';
    case 'th':
      return 'https://forms.gle/QzSSzxBADm1nnN9u9';
    case 'zh-Hant':
      return 'https://forms.gle/g9yPXynG65gQWipt6';
    case 'ja':
      return 'https://forms.gle/E7oupAThzbqeqwio7';
    case 'hi':
      return 'https://forms.gle/sLV7iFcqgLY9nRYL6';
    default:
      return 'https://forms.gle/mm882V8DZLyAgtVA6';
  }
}

export function ContactButtonSectionV2({ lang, dict }: ContactButtonSectionV2Props) {
  const partnershipFormLink = getPartnershipFormLink(lang);

  return (
    <div className='mt-8 flex flex-col gap-2 px-5'>
      {/* 입점신청하기 버튼 */}
      <a
        href={partnershipFormLink}
        target='_blank'
        rel='noopener noreferrer'
        className='bg-sub-900 hover:bg-sub-900/90 flex h-14 w-full items-center justify-center rounded-xl px-5 py-4 text-base leading-6 font-medium text-white transition-colors duration-200'
      >
        {dict.contact?.partnershipInquiry?.button || '입점 신청하기'}
      </a>

      {/* 이메일 문의 버튼 */}
      <a
        href='mailto:cs@k-doc.kr'
        className='flex h-14 w-full items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 px-5 py-4 text-base leading-6 font-medium text-neutral-700 transition-colors duration-200 hover:bg-neutral-200'
      >
        {dict.contact?.emailInquiry?.button || '이메일 문의'}
      </a>
    </div>
  );
}
