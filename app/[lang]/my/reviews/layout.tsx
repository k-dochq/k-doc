import { FooterV2 } from 'widgets/footer/ui/FooterV2';
import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { BottomNavigationV2 } from '@/widgets/bottom-navigation';

interface MyReviewsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function MyReviewsLayout({ children, params }: MyReviewsLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <div className='min-h-screen bg-white'>{children}</div>
      <BottomNavigationV2 currentLang={lang} dict={dict} />
    </>
  );
}
