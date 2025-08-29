import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'K-DOC',
  description: 'K-DOC Service',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
