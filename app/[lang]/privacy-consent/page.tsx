import { type Locale } from 'shared/config';
import type { Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import { PrivacyConsentContentV2 } from './PrivacyConsentContentV2';

interface PrivacyConsentPageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PrivacyConsentPageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title = dict.auth?.signup?.termsAgreement?.privacyPolicy || '개인정보 수집/이용 동의';

  return {
    title: `${title} | K-DOC`,
    description: title,
    openGraph: {
      title: `${title} | K-DOC`,
      description: title,
    },
  };
}

export default async function PrivacyConsentPage({ params }: PrivacyConsentPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <PrivacyConsentContentV2 lang={lang} dict={dict} />;
}
