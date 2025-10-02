import type { Metadata } from 'next';
import './globals.css';

// metadata for SEO
export const metadata: Metadata = {
  title: {
    default: 'K-DOC | เค-ด็อค',
    template: 'K-DOC | เค-ด็อค',
  },
  description:
    'K-DOC: Your essential guide to Korean cosmetic surgery - compare clinics, book, check prices, events & deals, read real reviews, and get discounts.',
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
    siteName: 'K-DOC | เค-ด็อค',
    title: 'K-DOC | เค-ด็อค',
    description:
      'K-DOC: Your essential guide to Korean cosmetic surgery - compare clinics, book, check prices, events & deals, read real reviews, and get discounts.',
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
    title: 'K-DOC | เค-ด็อค',
    description:
      'K-DOC: Your essential guide to Korean cosmetic surgery - compare clinics, book, check prices, events & deals, read real reviews, and get discounts.',
    images: ['/twitter-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
