import { PageHeader } from 'shared/ui/page-header';
import { HeaderLanguageSwitcher } from 'widgets/header/ui/HeaderLanguageSwitcher';
import { HeaderProfile } from 'widgets/header/ui/HeaderProfile';
import { Footer } from 'widgets/footer';
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
      <PageHeader
        lang={lang}
        title={dict.notices.title}
        fallbackUrl={`/${lang}/main`}
        variant='light'
        rightContent={
          <div className='flex items-center'>
            <HeaderLanguageSwitcher currentLang={lang} />
            <HeaderProfile lang={lang} dict={dict} />
          </div>
        }
      />
      <main>
        <div className='min-h-screen'>{children}</div>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
