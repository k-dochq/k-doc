import { type Locale } from 'shared/config';

interface BubbleSVGProps {
  locale: Locale;
  className?: string;
  text: string;
}

export function BubbleSVG({ locale, className = '', text }: BubbleSVGProps) {
  if (locale === 'th') {
    return (
      <div className={`relative ${className}`} style={{ width: '160px', height: '40px' }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='160'
          height='40'
          viewBox='0 0 160 40'
          fill='none'
          className='absolute inset-0'
        >
          <path
            d='M0 23.4667C0 14.3356 7.4734 6.93333 16.6923 6.93333H143.308C152.527 6.93333 160 14.3356 160 23.4667C160 32.5978 152.527 40 143.308 40H16.6923C7.47341 40 0 32.5978 0 23.4667Z'
            fill='white'
          />
          <path d='M22.0769 0V10.6667H6.46154L22.0769 0Z' fill='white' />
        </svg>
        <span
          className='absolute top-[54%] left-1/2 w-[140px] -translate-x-1/2 -translate-y-1/2 text-center text-[16px] leading-[130%] font-semibold break-words text-[#FF5DCA]'
          style={{ letterSpacing: '-0.32px' }}
        >
          {text}
        </span>
      </div>
    );
  }

  if (locale === 'zh-Hant') {
    return (
      <div className={`relative ${className}`} style={{ width: '190px', height: '40px' }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='190'
          height='40'
          viewBox='0 0 190 40'
          fill='none'
          className='absolute inset-0'
        >
          <path
            d='M0 23.4667C0 14.3356 7.4734 6.93333 16.6923 6.93333H173.308C182.527 6.93333 190 14.3356 190 23.4667C190 32.5978 182.527 40 173.308 40H16.6923C7.47341 40 0 32.5978 0 23.4667Z'
            fill='white'
          />
          <path d='M22.0769 0V10.6667H6.46154L22.0769 0Z' fill='white' />
        </svg>
        <span
          className='absolute top-[54%] left-1/2 w-[170px] -translate-x-1/2 -translate-y-1/2 text-center text-[16px] leading-[130%] font-semibold break-words text-[#FF5DCA]'
          style={{ letterSpacing: '-0.32px' }}
        >
          {text}
        </span>
      </div>
    );
  }

  if (locale === 'ja') {
    return (
      <div className={`relative ${className}`} style={{ width: '180px', height: '40px' }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='180'
          height='40'
          viewBox='0 0 180 40'
          fill='none'
          className='absolute inset-0'
        >
          <path
            d='M0 23.4667C0 14.3356 7.4734 6.93333 16.6923 6.93333H163.308C172.527 6.93333 180 14.3356 180 23.4667C180 32.5978 172.527 40 163.308 40H16.6923C7.47341 40 0 32.5978 0 23.4667Z'
            fill='white'
          />
          <path d='M22.0769 0V10.6667H6.46154L22.0769 0Z' fill='white' />
        </svg>
        <span
          className='absolute top-[54%] left-1/2 w-[160px] -translate-x-1/2 -translate-y-1/2 text-center text-[16px] leading-[130%] font-semibold break-words text-[#FF5DCA]'
          style={{ letterSpacing: '-0.32px' }}
        >
          {text}
        </span>
      </div>
    );
  }

  // en, ko
  return (
    <div className={`relative ${className}`} style={{ width: '200px', height: '40px' }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='200'
        height='40'
        viewBox='0 0 200 40'
        fill='none'
        className='absolute inset-0'
      >
        <path
          d='M0 23.4667C0 14.3356 7.4734 6.93333 16.6923 6.93333H183.308C192.527 6.93333 200 14.3356 200 23.4667C200 32.5978 192.527 40 183.308 40H16.6923C7.47341 40 0 32.5978 0 23.4667Z'
          fill='white'
        />
        <path d='M22.0769 0V10.6667H6.46154L22.0769 0Z' fill='white' />
      </svg>
      <span
        className='absolute top-[54%] left-1/2 w-[180px] -translate-x-1/2 -translate-y-1/2 text-center text-[16px] leading-[130%] font-semibold break-words text-[#FF5DCA]'
        style={{ letterSpacing: '-0.32px' }}
      >
        {text}
      </span>
    </div>
  );
}
