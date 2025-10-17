import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import type { Metadata } from 'next';

interface NoticesPageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: NoticesPageProps): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    ko: '공지사항 | K-DOC',
    en: 'Notices | K-DOC',
    th: 'ประกาศ | K-DOC',
  };

  const descriptions = {
    ko: 'K-DOC 공지사항을 확인하세요. 새로운 서비스, 이벤트, 업데이트 소식을 받아보세요.',
    en: 'Check K-DOC notices for new services, events, and updates.',
    th: 'ตรวจสอบประกาศของ K-DOC สำหรับบริการใหม่ เหตุการณ์ และการอัปเดต',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
    },
  };
}

export default async function NoticesPage({ params }: NoticesPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='px-5 pt-12 pb-20'>
      <div className='text-center'>
        <h1 className='mb-4 text-3xl font-bold'>
          {lang === 'ko' && '공지사항'}
          {lang === 'en' && 'Notices'}
          {lang === 'th' && 'ประกาศ'}
        </h1>
        <p className='text-gray-600'>
          {lang === 'ko' && '공지사항 페이지입니다.'}
          {lang === 'en' && 'This is the notices page.'}
          {lang === 'th' && 'นี่คือหน้าประกาศ'}
        </p>
      </div>
    </div>
  );
}
