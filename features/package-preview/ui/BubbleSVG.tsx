import { type Locale } from 'shared/config';

interface BubbleSVGProps {
  locale: Locale;
  className?: string;
}

export function BubbleSVG({ locale, className = '' }: BubbleSVGProps) {
  const text = locale === 'th' ? 'รับสิทธิพิเศษทันที' : 'Get your benefits now';

  if (locale === 'th') {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='160'
        height='40'
        viewBox='0 0 160 40'
        fill='none'
        className={className}
      >
        <path
          d='M0 23.4667C0 14.3356 7.4734 6.93333 16.6923 6.93333H143.308C152.527 6.93333 160 14.3356 160 23.4667C160 32.5978 152.527 40 143.308 40H16.6923C7.47341 40 0 32.5978 0 23.4667Z'
          fill='white'
        />
        <path d='M22.0769 0V10.6667H6.46154L22.0769 0Z' fill='white' />
        <text
          x='80'
          y='26'
          textAnchor='middle'
          dominantBaseline='middle'
          fill='#FF5DCA'
          fontFamily='Inter'
          fontSize='16'
          fontStyle='normal'
          fontWeight='600'
          style={{ letterSpacing: '-0.32px' }}
        >
          {text}
        </text>
      </svg>
    );
  }

  // en, ko
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='200'
      height='40'
      viewBox='0 0 200 40'
      fill='none'
      className={className}
    >
      <path
        d='M0 23.4667C0 14.3356 7.4734 6.93333 16.6923 6.93333H183.308C192.527 6.93333 200 14.3356 200 23.4667C200 32.5978 192.527 40 183.308 40H16.6923C7.47341 40 0 32.5978 0 23.4667Z'
        fill='white'
      />
      <path d='M22.0769 0V10.6667H6.46154L22.0769 0Z' fill='white' />
      <text
        x='100'
        y='26'
        textAnchor='middle'
        dominantBaseline='middle'
        fill='#FF5DCA'
        fontFamily='Inter'
        fontSize='16'
        fontStyle='normal'
        fontWeight='600'
        style={{ letterSpacing: '-0.32px' }}
      >
        {text}
      </text>
    </svg>
  );
}
