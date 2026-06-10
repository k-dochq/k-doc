import { BottomNavigationV2 } from '@/widgets/bottom-navigation';
import { HeaderV2 } from '@/widgets/header/ui/HeaderV2';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface TipsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function TipsLayout({ children, params }: TipsLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen bg-white'>
      <div className='sticky top-0 z-50'>
        <HeaderV2 currentLang={lang} dict={dict} sticky={false} />
      </div>
      <main>{children}</main>
      <div className='h-16' />
      <BottomNavigationV2 currentLang={lang} dict={dict} />
    </div>
  );
}
