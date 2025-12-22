import { HeaderV2 } from 'widgets/header/ui/HeaderV2';
import { FooterV2 } from 'widgets/footer/ui/FooterV2';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface NoticesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function NoticesLayout({ children, params }: NoticesLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <HeaderV2 currentLang={lang} dict={dict} />
      <main className='min-h-screen bg-white'>{children}</main>
      <FooterV2 lang={lang} dict={dict} />
    </>
  );
}
