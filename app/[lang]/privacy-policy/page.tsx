import { type Locale } from 'shared/config';
import type { Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import { PrivacyPolicyContentV2 } from './PrivacyPolicyContentV2';

interface PrivacyPolicyPageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.footer.privacyPolicy} | K-DOC`,
    description: dict.footer.privacyPolicy,
    openGraph: {
      title: `${dict.footer.privacyPolicy} | K-DOC`,
      description: dict.footer.privacyPolicy,
    },
  };
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <PrivacyPolicyContentV2 lang={lang} dict={dict} />;
}
