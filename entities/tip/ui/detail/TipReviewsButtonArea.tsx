import { type Locale, MAX_MOBILE_WIDTH_CLASS } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';

interface TipReviewsButtonAreaProps {
  lang: Locale;
  dict: Dictionary;
}

export function TipReviewsButtonArea({ lang, dict }: TipReviewsButtonAreaProps) {
  return (
    <div
      className={`pointer-events-none fixed right-0 bottom-0 left-0 z-40 mx-auto px-5 pb-10 ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      <div
        className='pointer-events-auto rounded-xl'
        style={{ boxShadow: '#FFFFFF 0px 0px 30px 25px' }}
      >
        <LocaleLink
          href='/reviews'
          locale={lang}
          className='flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#7657ff] px-5 py-4 text-base font-medium leading-6 text-white'
        >
          {dict.tips?.viewReviews ?? 'View Reviews'}
        </LocaleLink>
      </div>
    </div>
  );
}
