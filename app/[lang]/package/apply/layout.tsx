import { Header } from 'widgets/header';
import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';

interface PackageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function PackageLayout({ children, params }: PackageLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header currentLang={lang} dict={dict} />
      <main>{children}</main>
      <div className='h-16' />
    </>
  );
}
