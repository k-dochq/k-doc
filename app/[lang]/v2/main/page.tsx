import { type Locale } from 'shared/config';
import { MainPageLayoutV2 } from 'widgets/main-page-layout';

interface V2MainPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function V2MainPage({ params }: V2MainPageProps) {
  const { lang } = await params;

  return <MainPageLayoutV2 lang={lang} />;
}
