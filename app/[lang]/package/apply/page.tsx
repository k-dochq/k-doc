import { getDictionary } from 'app/[lang]/dictionaries';
import { type Locale } from 'shared/config';
import { AllInOnePackageForm } from 'features/van-reservation/ui/AllInOnePackageForm';

interface PageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function AllInOnePackagePage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <AllInOnePackageForm lang={lang} dict={dict} />;
}
