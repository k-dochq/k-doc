import { type Locale } from 'shared/config';

interface LiveReviewCardV2ContentProps {
  content: string;
  lang?: Locale;
}

export function LiveReviewCardV2Content({ content, lang }: LiveReviewCardV2ContentProps) {
  return (
    <p
      className='relative w-full shrink-0 truncate text-base leading-6 font-medium text-neutral-700'
      dir={lang === 'ar' ? 'rtl' : undefined}
    >
      {content}
    </p>
  );
}
