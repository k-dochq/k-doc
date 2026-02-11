'use client';

import Image from 'next/image';
import { LocaleLink } from 'shared/ui/locale-link';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';

const WATER_BTN_SVG = '/images/event/donation_water/common/water_btn.svg';

export function DonationFloatingButton() {
  return (
    <div className={`fixed right-0 bottom-0 left-0 z-50 mx-auto px-5 pb-8 ${MAX_MOBILE_WIDTH_CLASS}`}>
      <LocaleLink href='/hospitals' className='relative block'>
        <Image
          src={WATER_BTN_SVG}
          alt='병원 보기'
          width={335}
          height={62}
          className='w-full h-auto'
          style={{ maxHeight: '62px' }}
        />
        <span className='absolute inset-0 flex items-center justify-center text-base font-medium leading-6 text-white'>
          Find Clinics & Consult
        </span>
      </LocaleLink>
    </div>
  );
}
