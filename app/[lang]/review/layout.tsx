import { Header } from 'widgets/header';
import { MaxWidthLayout } from 'widgets/max-width-layout';
import { BottomNavigation } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';

interface ReviewLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ReviewLayout({ children, params }: ReviewLayoutProps) {
  const { lang } = await params;

  return (
    <MaxWidthLayout>
      <main>{children}</main>
    </MaxWidthLayout>
  );
}
