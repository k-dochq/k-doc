import { type Locale } from 'shared/config';
import { MainPageLayout } from 'widgets/main-page-layout';

interface MainPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function MainPage({ params }: MainPageProps) {
  const { lang } = await params;

  return <MainPageLayout lang={lang} />;
}
