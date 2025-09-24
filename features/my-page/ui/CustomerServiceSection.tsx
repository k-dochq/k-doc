'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { MenuItem } from './MenuItem';

interface CustomerServiceSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function CustomerServiceSection({ lang, dict }: CustomerServiceSectionProps) {
  const handlePhoneClick = () => {
    window.location.href = `tel:${dict.my?.customerService?.phoneNumber || '1588-4591'}`;
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:cs@k-doc.kr';
  };

  return (
    <div className='flex w-full flex-col gap-5'>
      <h2 className='text-lg font-semibold text-gray-900'>
        {dict.my?.customerService?.title || '고객센터'}
      </h2>

      <div className='flex w-full flex-col gap-3'>
        <MenuItem title={dict.my?.customerService?.email || '이메일'} onClick={handleEmailClick} />
        <MenuItem title={dict.my?.customerService?.phone || '전화'} onClick={handlePhoneClick} />
      </div>
    </div>
  );
}
