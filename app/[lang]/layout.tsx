import type { Metadata } from 'next';
import { type Locale } from 'shared/config';

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    ko: 'K-DOC',
    en: 'K-DOC',
    th: 'K-DOC',
  };

  const descriptions = {
    ko: 'K-DOC 서비스',
    en: 'K-DOC Service',
    th: 'บริการ K-DOC',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      type: 'website',
      locale: lang === 'ko' ? 'ko_KR' : lang === 'en' ? 'en_US' : 'th_TH',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
    },
  };
}

export default async function LangLayout({ children }: LangLayoutProps) {
  return <>{children}</>;
}
