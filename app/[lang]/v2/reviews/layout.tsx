import { HeaderV2 } from 'widgets/header/ui/HeaderV2';
import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { BottomNavigationV2 } from '@/widgets/bottom-navigation';

interface V2ReviewsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function V2ReviewsLayout({ children, params }: V2ReviewsLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen bg-white'>
      <HeaderV2 currentLang={lang} dict={dict} />
      <main>{children}</main>
      <div className='h-16' />
      <BottomNavigationV2 currentLang={lang} dict={dict} />
    </div>
  );
}
