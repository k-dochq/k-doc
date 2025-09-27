import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface ContactLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ContactLayout({ children, params }: ContactLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header currentLang={lang} dict={dict} />
      <main>
        <div className='min-h-screen'>{children}</div>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
