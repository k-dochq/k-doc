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
  title: 'K-DOC',
  description: 'K-DOC Service',
  openGraph: {
    title: 'K-DOC',
    description: 'K-DOC Service',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K-DOC',
    description: 'K-DOC Service',
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
