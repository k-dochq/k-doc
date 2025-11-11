'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface TaxiReservationSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function TaxiReservationSection({ lang, dict }: TaxiReservationSectionProps) {
  return (
    <div
      className=''
      style={{
        background:
          'linear-gradient(180deg, #FFAFF2 0.19%, #BF9CFF 99.82%), linear-gradient(180deg, #FE906C 0%, #FF6CA5 100%)',
      }}
    >
      <div className='relative overflow-hidden px-5 py-7'>
        {/* 제목 */}
        <h2 className='mb-6 text-center text-2xl font-semibold text-white'>
          {dict.taxiReservation?.title || 'Taxi reservation'}
        </h2>

        {/* 예약 버튼 */}
        <div className='flex gap-2'>
          {/* 국제 택시 버튼 */}
          <a
            href='https://www.intltaxi.co.kr/'
            target='_blank'
            rel='noopener noreferrer'
            className='flex h-14 flex-1 items-center justify-center rounded-xl bg-[#DA47EF] px-6 text-base font-medium text-white transition-colors'
          >
            <span>{dict.taxiReservation?.internationalTaxi || 'International Taxi'}</span>
          </a>

          {/* 우버 택시 버튼 */}
          <a
            href='https://rides.sng.link/Aw5zn/njuh?_dl=uber%3A%2F%2F&_smtype=3&pcn=download_rider&mvid=b5ea2fc9-50ae-4db6-8c0b-18eb50268f33'
            target='_blank'
            rel='noopener noreferrer'
            className='flex h-14 flex-1 items-center justify-center rounded-xl bg-[#DA47EF] px-6 text-base font-medium text-white transition-colors'
          >
            <span>{dict.taxiReservation?.uberTaxi || 'Uber Taxi'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
