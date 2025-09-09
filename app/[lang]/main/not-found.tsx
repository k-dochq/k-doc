import Image from 'next/image';
import { Home, Search } from 'lucide-react';
import { LocaleLink } from 'shared/ui/locale-link';

// 다국어 메시지 정의
const messages = {
  ko: {
    title: '페이지를 찾을 수 없습니다',
    description: '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.',
    homeButton: '홈으로 돌아가기',
    searchButton: '병원 검색하기',
    logoAlt: 'K-DOC 로고',
  },
  en: {
    title: 'Page Not Found',
    description: 'The page you requested does not exist or may have been moved.',
    homeButton: 'Go Home',
    searchButton: 'Search Hospitals',
    logoAlt: 'K-DOC Logo',
  },
  th: {
    title: 'ไม่พบหน้าที่ต้องการ',
    description: 'หน้าที่คุณต้องการไม่มีอยู่หรืออาจถูกย้ายแล้ว',
    homeButton: 'กลับหน้าแรก',
    searchButton: 'ค้นหาโรงพยาบาล',
    logoAlt: 'โลโก้ K-DOC',
  },
} as const;

interface MainNotFoundProps {
  params?: Promise<{ lang?: 'ko' | 'en' | 'th' }>;
}

export default async function MainNotFound({ params }: MainNotFoundProps) {
  // params가 없으면 기본값으로 한국어 사용
  const lang = params ? (await params).lang || 'ko' : 'ko';
  const dict = messages[lang];

  return (
    <div className='flex min-h-[60vh] items-center justify-center px-4'>
      <div className='w-full max-w-md text-center'>
        {/* K-DOC 로고 */}
        <div className='mb-6 flex justify-center'>
          <div className='relative h-12 w-12'>
            <Image
              src='/kdoc_logo.png'
              alt={dict.logoAlt}
              fill
              className='object-contain'
              priority
            />
          </div>
        </div>

        {/* 404 메시지 */}
        <div className='mb-8'>
          <h1 className='mb-2 text-4xl font-bold text-gray-800'>404</h1>
          <h2 className='mb-3 text-lg font-semibold text-gray-700'>{dict.title}</h2>
          <p className='text-sm text-gray-500'>{dict.description}</p>
        </div>

        {/* 액션 버튼들 */}
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <LocaleLink
            href='/main'
            locale={lang}
            className='inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            <Home className='h-4 w-4' />
            {dict.homeButton}
          </LocaleLink>

          <LocaleLink
            href='/hospitals'
            locale={lang}
            className='inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            <Search className='h-4 w-4' />
            {dict.searchButton}
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
