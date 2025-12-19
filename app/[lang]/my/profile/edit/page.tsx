import { type Locale } from 'shared/config';
import { getDictionary } from '../../../dictionaries';
import { ProfileEditContent } from './ProfileEditContent';
import { ProfileEditContentV2 } from './ProfileEditContentV2';

interface ProfileEditPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function ProfileEditPage({ params }: ProfileEditPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ProfileEditContentV2 lang={lang} dict={dict} />;
}
