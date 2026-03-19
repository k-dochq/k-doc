import { type Locale } from 'shared/config';
import { ConsultRedirectContent } from './ConsultRedirectContent';

interface ConsultRedirectPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ConsultRedirectPage({ params }: ConsultRedirectPageProps) {
  const { lang } = await params;
  return <ConsultRedirectContent lang={lang} />;
}
