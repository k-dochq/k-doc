import type { Metadata } from 'next';
import './globals.css';

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
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
