import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from 'shared/ui/providers';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

// metadata for SEO
export const metadata: Metadata = {
  title: {
    default: 'K-DOC - Korean Plastic Surgery Booking & Reviews',
    template: 'K-DOC',
  },
  description:
    'Book Korean plastic surgery consultations and read authentic reviews. Connect with top-rated Korean plastic surgery clinics.',
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
    title: 'K-DOC - Korean Plastic Surgery Booking & Reviews',
    description:
      'Book Korean plastic surgery consultations and read authentic reviews. Connect with top-rated Korean plastic surgery clinics.',
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
    title: 'K-DOC - Korean Plastic Surgery Booking & Reviews',
    description: 'Book Korean plastic surgery consultations and read authentic reviews.',
    images: ['/twitter-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
