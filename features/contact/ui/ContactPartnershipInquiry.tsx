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
      return 'https://docs.google.com/forms/d/1HxiHa4hVG4lbTTaO7lW78FiAiMmQnTLlGjzPVYb9iZ8/edit';
    case 'en':
      return 'https://docs.google.com/forms/d/e/1FAIpQLSexE6A_k_pUeatu9NAWP2nsFwQ9qI-tiMkdueodCw7bKtk0Qg/viewform?usp=header';
    case 'th':
      return 'https://docs.google.com/forms/d/e/1FAIpQLSehKU-3JTge6aOaQZSczUVSUF0dS-fZ9pUAx8n1dCjFF9FkKg/viewform?usp=header';
    default:
      return 'https://docs.google.com/forms/d/e/1FAIpQLSexE6A_k_pUeatu9NAWP2nsFwQ9qI-tiMkdueodCw7bKtk0Qg/viewform?usp=header';
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
