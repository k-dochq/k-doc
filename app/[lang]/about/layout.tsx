import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { HeaderV2 } from '@/widgets/header/ui/HeaderV2';
import { FooterV2 } from '@/widgets/footer/ui/FooterV2';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../../fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

interface AboutLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function AboutLayout({ children, params }: AboutLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <HeaderV2 currentLang={lang} dict={dict} />
      <main className={`min-h-screen bg-white ${pretendard.className}`}>
        {children}
      </main>
      <FooterV2 lang={lang} dict={dict} />
    </>
  );
}
