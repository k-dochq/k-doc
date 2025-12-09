'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useAuth } from 'shared/lib/auth/useAuth';
import { LocaleLink } from 'shared/ui/locale-link';

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

  const message = dict.hospital?.registrationPrompt?.message || 'Fast Reservation Guarantee!';
  const buttonText = dict.hospital?.registrationPrompt?.button || 'Register';

  return (
    <div className='px-5 py-1'>
      <div className='flex items-center justify-between overflow-clip rounded-lg bg-[#636363] p-3 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.4)]'>
        <p className='relative shrink-0 text-[16px] leading-[22px] font-semibold text-[#f15bff] italic'>
          {message}
        </p>
        <LocaleLink
          href='/auth/login'
          locale={lang}
          className='flex shrink-0 items-center justify-center gap-0 rounded bg-[#f15bff] px-2 py-1.5 text-[13px] leading-[19px] text-white'
        >
          {buttonText}
        </LocaleLink>
      </div>
    </div>
  );
}
