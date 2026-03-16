import localFont from 'next/font/local';

const highSummit = localFont({
  src: '../../../fonts/concierge/HighSummit.woff2',
  display: 'swap',
  variable: '--font-high-summit',
  preload: false,
});

const dmSerifText = localFont({
  src: '../../../fonts/concierge/DMSerifText-Regular.woff2',
  display: 'swap',
  variable: '--font-dm-serif-text',
  preload: false,
});

export default function ConciergeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${highSummit.variable} ${dmSerifText.variable}`}>
      {children}
    </div>
  );
}
