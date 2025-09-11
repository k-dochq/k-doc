import type { Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { ConsultationTabs } from 'features/consultation-tabs';

interface ConsultationPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function ConsultationPage({ params }: ConsultationPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <ConsultationTabs lang={lang} dict={dict} />
      </div>
    </div>
  );
}
