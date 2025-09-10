import { Header } from 'widgets/header';
import { MaxWidthLayout } from 'widgets/max-width-layout';
import { BottomNavigation } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';

interface ReviewsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ReviewsLayout({ children, params }: ReviewsLayoutProps) {
  const { lang } = await params;

  return (
    <MaxWidthLayout>
      <Header currentLang={lang} />
      <main className='py-8 pb-20'>{children}</main>
      <BottomNavigation currentLang={lang} />
    </MaxWidthLayout>
  );
}
