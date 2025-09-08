import { type Locale } from 'shared/config';
import { SearchBar } from 'features/search';

interface MainPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function MainPage({ params }: MainPageProps) {
  const { lang } = await params;

  const messages = {
    ko: {
      title: '메인 페이지',
      description: 'K-DOC 메인 페이지에 오신 것을 환영합니다.',
      welcome: '환영합니다!',
    },
    en: {
      title: 'Main Page',
      description: 'Welcome to the K-DOC main page.',
      welcome: 'Welcome!',
    },
    th: {
      title: 'หน้าหลัก',
      description: 'ยินดีต้อนรับสู่หน้าหลักของ K-DOC',
      welcome: 'ยินดีต้อนรับ!',
    },
  };

  const dict = messages[lang];

  return (
    <>
      <div className='mb-8'>
        <SearchBar lang={lang} />
      </div>
    </>
  );
}
