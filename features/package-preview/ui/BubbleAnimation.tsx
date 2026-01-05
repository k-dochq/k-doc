import { BubbleSVG } from './BubbleSVG';
import { type Locale } from 'shared/config';

interface BubbleAnimationProps {
  locale: Locale;
  text: string;
}

export function BubbleAnimation({ locale, text }: BubbleAnimationProps) {
  return (
    <div className='animate-float pointer-events-none absolute left-1/2 -translate-x-1/2'>
      <BubbleSVG locale={locale} className='h-10' text={text} />
    </div>
  );
}
