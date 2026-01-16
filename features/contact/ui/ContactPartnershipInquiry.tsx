import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ContactPartnershipInquiryProps {
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

export function ContactPartnershipInquiry({ lang, dict }: ContactPartnershipInquiryProps) {
  const partnershipFormLink = getPartnershipFormLink(lang);

  return (
    <div className='mt-9'>
      {/* 입점 신청 상담 제목 */}
      <h2 className='text-2xl font-bold' style={{ color: '#AE33FB' }}>
        {dict.contact.partnershipInquiry.title}
      </h2>

      {/* 입점 신청하기 버튼 */}
      <div className='mt-6'>
        <a
          href={partnershipFormLink}
          target='_blank'
          rel='noopener noreferrer'
          className='flex h-14 w-full items-center justify-center gap-2 rounded-xl px-10 text-base leading-6 font-medium text-white'
          style={{ backgroundColor: '#AE33FB' }}
        >
          {dict.contact.partnershipInquiry.button}
        </a>
      </div>
    </div>
  );
}
