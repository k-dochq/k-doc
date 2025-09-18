import type { Metadata } from 'next';
import { type Locale, SUPPORTED_LOCALES } from 'shared/config';
import { MaxWidthLayout } from 'widgets/max-width-layout';

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

// 모든 하위 페이지에 적용되는 정적 파라미터 생성
export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({
    lang,
  }));
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    ko: 'K-DOC - Korean Plastic Surgery Booking & Reviews',
    en: 'K-DOC - Korean Plastic Surgery Booking & Reviews',
    th: 'K-DOC - Korean Plastic Surgery Booking & Reviews',
  };

  const descriptions = {
    ko: 'Book Korean plastic surgery consultations and read authentic reviews. Connect with top-rated Korean plastic surgery clinics.',
    en: 'Book Korean plastic surgery consultations and read authentic reviews. Connect with top-rated Korean plastic surgery clinics.',
    th: 'Book Korean plastic surgery consultations and read authentic reviews. Connect with top-rated Korean plastic surgery clinics.',
  };

  return {
    title: {
      default: titles[lang],
      template: 'K-DOC',
    },
    description: descriptions[lang],
    keywords: [
      'Korean plastic surgery',
      'plastic surgery Korea',
      'Korean cosmetic surgery',
      'surgery booking Korea',
      'plastic surgery reviews',
      'Korean beauty clinics',
    ],
    metadataBase: new URL('https://k-doc.kr'),
    openGraph: {
      type: 'website',
      siteName: 'K-DOC',
      title: titles[lang],
      description: descriptions[lang],
      locale: lang === 'ko' ? 'ko_KR' : lang === 'en' ? 'en_US' : 'th_TH',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'K-DOC - Korean Plastic Surgery Platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: ['/twitter-image.png'],
    },
  };
}

export default async function LangLayout({ children }: LangLayoutProps) {
  return <MaxWidthLayout>{children}</MaxWidthLayout>;
}
