import { Header } from 'widgets/header';
import { MaxWidthLayout } from 'widgets/max-width-layout';
import { BottomNavigation } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';

interface HospitalsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function HospitalsLayout({ children, params }: HospitalsLayoutProps) {
  const { lang } = await params;

  return (
    <MaxWidthLayout>
      <main className='py-8 pb-20'>{children}</main>
    </MaxWidthLayout>
  );
}
