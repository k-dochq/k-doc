import { type Locale } from 'shared/config';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { getDictionary } from 'app/[lang]/dictionaries';
import { HospitalsInfiniteList } from './HospitalsInfiniteList';

interface HospitalsPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    sortBy?: string;
    specialtyType?: string;
    minRating?: string;
  }>;
}

export default async function HospitalsPage({ params, searchParams }: HospitalsPageProps) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
      <HospitalsInfiniteList lang={lang} searchParams={resolvedSearchParams} dict={dict} />
    </ErrorBoundary>
  );
}
