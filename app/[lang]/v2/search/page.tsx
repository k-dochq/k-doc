import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { SearchV2Content } from './SearchV2Content';

interface SearchV2PageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchV2Page({ params, searchParams }: SearchV2PageProps) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  return <SearchV2Content lang={lang} dict={dict} searchParams={resolvedSearchParams} />;
}
