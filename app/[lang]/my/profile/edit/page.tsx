import { type Locale } from 'shared/config';
import { getDictionary } from '../../../dictionaries';
import { ProfileEditContent } from './ProfileEditContent';

interface ProfileEditPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function ProfileEditPage({ params }: ProfileEditPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ProfileEditContent lang={lang} dict={dict} />;
}
