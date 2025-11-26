import { BubbleSVG } from './BubbleSVG';
import { type Locale } from 'shared/config';

interface BubbleAnimationProps {
  locale: Locale;
}

export function BubbleAnimation({ locale }: BubbleAnimationProps) {
  return (
    <div className='animate-float pointer-events-none absolute left-1/2 -translate-x-1/2'>
      <BubbleSVG locale={locale} className='h-10' />
    </div>
  );
}
