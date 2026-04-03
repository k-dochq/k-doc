import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface GlobalLiveBannerSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function GlobalLiveBannerSection({ lang, dict }: GlobalLiveBannerSectionProps) {
  return (
    <div
      className='flex flex-col items-center justify-center gap-3 px-5 py-[48px] text-center'
      style={{ background: 'linear-gradient(180deg, #7657FF 0%, #3A288E 100%)' }}
    >
      <div className='flex items-center gap-0.5 rounded-lg bg-[#4733A3] px-2 py-1.5'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
        >
          <path
            d='M2.99557 13.5C1.00147 10.8444 1.00147 7.15565 2.99557 4.5'
            stroke='white'
            strokeWidth='1.5'
            strokeMiterlimit='10'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M15 4.5C16.9941 7.15565 16.9941 10.8444 15 13.5'
            stroke='white'
            strokeWidth='1.5'
            strokeMiterlimit='10'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M5.64375 12C4.11875 10.2971 4.11875 7.7029 5.64375 6'
            stroke='white'
            strokeWidth='1.5'
            strokeMiterlimit='10'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.3516 6C13.8766 7.7029 13.8766 10.2971 12.3516 12'
            stroke='white'
            strokeWidth='1.5'
            strokeMiterlimit='10'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.5 9C10.5 9.82845 9.8284 10.5 9 10.5C8.1716 10.5 7.5 9.82845 7.5 9C7.5 8.17155 8.1716 7.5 9 7.5C9.8284 7.5 10.5 8.17155 10.5 9Z'
            fill='white'
          />
        </svg>
        <span className='text-sm font-semibold leading-5 text-white'>Global Live</span>
      </div>

      <div className='flex flex-col gap-1'>
        <h2 className='text-2xl font-semibold leading-8 text-white'>
          <span className='block'>{dict.globalLiveBanner.title1}</span>
          <span className='block'>{dict.globalLiveBanner.title2}</span>
        </h2>
        <p className='text-sm font-medium leading-5 text-[#E5E5E5]'>
          <span className='block'>{dict.globalLiveBanner.subtitle1}</span>
          <span className='block'>{dict.globalLiveBanner.subtitle2}</span>
        </p>
      </div>
    </div>
  );
}
