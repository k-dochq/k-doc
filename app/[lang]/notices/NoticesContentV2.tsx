'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { SearchBarV2 } from 'shared/ui/search-bar/SearchBarV2';

interface NoticesContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function NoticesContentV2({ lang, dict }: NoticesContentV2Props) {
  return (
    <div className='px-5 pt-8 pb-20'>
      <h1 className='mb-8 text-3xl font-semibold text-neutral-700'>{dict.notices.title}</h1>
      <SearchBarV2 lang={lang} dict={dict} />
    </div>
  );
}
