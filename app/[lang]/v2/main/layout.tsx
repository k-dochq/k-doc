import { HeaderV2 } from 'widgets/header/ui/HeaderV2';
import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';

interface V2MainLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function V2MainLayout({ children, params }: V2MainLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <HeaderV2 currentLang={lang} dict={dict} />
      <main>{children}</main>
    </>
  );
}
