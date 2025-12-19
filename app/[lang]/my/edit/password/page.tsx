import { type Locale } from 'shared/config';
import { getDictionary } from '../../../dictionaries';
import { PasswordChangeContentV2 } from './PasswordChangeContentV2';

interface PasswordChangePageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function PasswordChangePage({ params }: PasswordChangePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <PasswordChangeContentV2 lang={lang} dict={dict} />;
}
