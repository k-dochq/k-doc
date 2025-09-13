import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalsInfiniteList } from './HospitalsInfiniteList';

interface HospitalsContentProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    sortBy?: string;
    specialtyType?: string;
    minRating?: string;
  };
}

export function HospitalsContent({ lang, dict, searchParams }: HospitalsContentProps) {
  return <HospitalsInfiniteList lang={lang} searchParams={searchParams} dict={dict} />;
}
