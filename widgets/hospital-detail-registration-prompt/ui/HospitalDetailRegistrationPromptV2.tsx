'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useAuth } from 'shared/lib/auth/useAuth';
import { LocaleLink } from 'shared/ui/locale-link';
import GuaranteeEn from '../guarantee_en';
import GuaranteeTh from '../guarantee_th';
import GuaranteeZhHant from '../guarantee_zh_Hant';
import GuaranteeJa from '../guarantee_ja';
import GuaranteeHi from '../guarantee_hi';

interface HospitalDetailRegistrationPromptV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailRegistrationPromptV2({
  lang,
  dict,
}: HospitalDetailRegistrationPromptV2Props) {
  const { isAuthenticated, isLoading } = useAuth();

  // 로그인 중이거나 로그인한 경우 렌더링하지 않음
  if (isLoading || isAuthenticated) {
    return null;
  }

  const buttonText = dict.hospital?.registrationPrompt?.button || 'Register';

  // 언어에 따라 적절한 SVG 컴포넌트 선택
  const getGuaranteeSvg = (locale: Locale) => {
    switch (locale) {
      case 'th':
        return GuaranteeTh;
      case 'zh-Hant':
        return GuaranteeZhHant;
      case 'ja':
        return GuaranteeJa;
      case 'hi':
        return GuaranteeHi;
      case 'tl':
      case 'en':
      case 'ko':
      default:
        return GuaranteeEn; // 필리핀어, 영어, 한국어 및 기본값은 영어 SVG 사용
    }
  };

  const GuaranteeSvg = getGuaranteeSvg(lang);

  return (
    <div className='px-2 pt-1 pb-5 min-[371px]:px-5'>
      <div className='flex items-center justify-between overflow-clip rounded-lg border-2 border-[#F15BFF] bg-white p-3 shadow-[1px_2px_4px_0_rgba(0,0,0,0.40)]'>
        <div
          className='relative'
          style={{
            animation: 'fadePulse 0.9s ease-in-out infinite',
          }}
        >
          <GuaranteeSvg />
        </div>
        <LocaleLink
          href='/auth/login'
          locale={lang}
          className='flex shrink-0 items-center justify-center gap-0 rounded bg-[#F15BFF] px-2 py-1.5 text-[13px] leading-[19px] font-medium text-white'
        >
          {buttonText}
        </LocaleLink>
      </div>
    </div>
  );
}
