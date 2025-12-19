'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { MenuItemV2 } from './MenuItemV2';

interface CustomerServiceSectionV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function CustomerServiceSectionV2({ lang, dict }: CustomerServiceSectionV2Props) {
  const handlePhoneClick = () => {
    window.location.href = `tel:${dict.my?.customerService?.phoneNumber || '1588-6930'}`;
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:cs@k-doc.kr';
  };

  const title = dict.my?.customerService?.title || '고객센터';
  const emailLabel = dict.my?.customerService?.email || '이메일';
  const phoneLabel = dict.my?.customerService?.phone || '전화';

  return (
    <div className='flex w-full flex-col'>
      <h2 className='text-lg font-semibold text-neutral-700'>{title}</h2>

      <div className='mt-2 flex w-full flex-col'>
        <MenuItemV2 title={emailLabel} onClick={handleEmailClick} />
        <div className='mt-3'>
          <MenuItemV2 title={phoneLabel} onClick={handlePhoneClick} />
        </div>
      </div>
    </div>
  );
}
