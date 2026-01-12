import { type Locale } from 'shared/config';
import type { Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import { TermsOfServiceContentV2 } from './TermsOfServiceContentV2';

interface TermsOfServicePageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: TermsOfServicePageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.footer.termsOfService} | K-DOC`,
    description: dict.footer.termsOfService,
    openGraph: {
      title: `${dict.footer.termsOfService} | K-DOC`,
      description: dict.footer.termsOfService,
    },
  };
}

export default async function TermsOfServicePage({ params }: TermsOfServicePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <TermsOfServiceContentV2 lang={lang} dict={dict} />;
}
