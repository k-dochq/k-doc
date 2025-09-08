import { type Locale } from 'shared/config';

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
      <div className='mb-8 text-center'>
        <h1 className='mb-4 text-4xl font-bold text-gray-900'>{dict.title}</h1>
        <p className='text-lg text-gray-600'>{dict.description}</p>
      </div>

      <div className='rounded-lg bg-white p-8 shadow-md'>
        <h2 className='mb-4 text-2xl font-semibold text-gray-800'>{dict.welcome}</h2>
        <p className='text-gray-600'>
          {lang === 'ko' && '이곳은 K-DOC의 메인 페이지입니다. 다양한 기능을 이용해보세요.'}
          {lang === 'en' && 'This is the main page of K-DOC. Explore various features.'}
          {lang === 'th' && 'นี่คือหน้าหลักของ K-DOC ลองใช้ฟีเจอร์ต่างๆ ดู'}
        </p>
      </div>
    </>
  );
}
