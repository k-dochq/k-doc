import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { TipsContent } from './TipsContent';

interface TipsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function TipsPage({ params }: TipsPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='px-5'>
      <img
        src='/images/tips-top-banner.png'
        alt='K-DOC Tips'
        className='w-full'
      />
      <TipsContent lang={lang} dict={dict} />
    </div>
  );
}
