import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ConciergeVideoGrid } from './ConciergeVideoGrid';
import { ConciergeReviewCarousel } from './ConciergeReviewCarousel';

interface ConciergeReviewsProps {
  dict: Dictionary;
  lang: Locale;
}

export function ConciergeReviews({ dict, lang }: ConciergeReviewsProps) {
  return (
    <section
      className='w-full px-5 pt-12 pb-12'
      style={{
        background: 'linear-gradient(180deg, #ffffff 13.47%, #7657ff 100%)',
      }}
    >
      <p className='concierge-title whitespace-pre-line text-center text-[42px] leading-[1.1] text-[#7657ff]'>
        {dict.concierge?.section5Title}
      </p>

      <ConciergeVideoGrid lang={lang} />

      <ConciergeReviewCarousel dict={dict} lang={lang} />
    </section>
  );
}
