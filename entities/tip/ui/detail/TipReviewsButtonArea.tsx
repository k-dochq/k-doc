import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';

interface TipReviewsButtonAreaProps {
  lang: Locale;
  dict: Dictionary;
}

export function TipReviewsButtonArea({ lang, dict }: TipReviewsButtonAreaProps) {
  return (
    <div
      className='relative -mx-5 px-5 pt-4 pb-10'
      style={{
        background:
          'linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, #FFF 13.84%)',
      }}
    >
      <LocaleLink
        href='/reviews'
        locale={lang}
        className='flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#7657ff] px-5 py-4 text-base font-medium leading-6 text-white'
      >
        {dict.tips?.viewReviews ?? 'View Reviews'}
      </LocaleLink>
    </div>
  );
}
