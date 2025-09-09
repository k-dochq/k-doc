import Image from 'next/image';
import { Home } from 'lucide-react';
import { LocaleLink } from 'shared/ui/locale-link';
import { MaxWidthLayout } from 'widgets/max-width-layout';

// 다국어 메시지 정의
const messages = {
  ko: {
    title: '페이지를 찾을 수 없습니다',
    description: '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.',
    homeButton: '홈으로 돌아가기',
    logoAlt: 'K-DOC 로고',
  },
  en: {
    title: 'Page Not Found',
    description: 'The page you requested does not exist or may have been moved.',
    homeButton: 'Go Home',
    logoAlt: 'K-DOC Logo',
  },
  th: {
    title: 'ไม่พบหน้าที่ต้องการ',
    description: 'หน้าที่คุณต้องการไม่มีอยู่หรืออาจถูกย้ายแล้ว',
    homeButton: 'กลับหน้าแรก',
    logoAlt: 'โลโก้ K-DOC',
  },
} as const;

interface NotFoundProps {
  params?: Promise<{ lang?: 'ko' | 'en' | 'th' }>;
}

export default async function NotFound({ params }: NotFoundProps) {
  // params가 없으면 기본값으로 한국어 사용
  const lang = params ? (await params).lang || 'ko' : 'ko';
  const dict = messages[lang];

  return (
    <MaxWidthLayout>
      <div className='flex min-h-screen items-center justify-center px-4'>
        <div className='w-full max-w-md text-center'>
          {/* K-DOC 로고 */}
          <div className='mb-8 flex justify-center'>
            <div className='relative h-16 w-16'>
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
            <h1 className='mb-2 text-6xl font-bold text-gray-800'>404</h1>
            <h2 className='mb-4 text-xl font-semibold text-gray-700'>{dict.title}</h2>
            <p className='text-gray-500'>{dict.description}</p>
          </div>

          {/* 홈으로 돌아가기 버튼 */}
          <LocaleLink
            href='/'
            locale={lang}
            className='inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            <Home className='h-4 w-4' />
            {dict.homeButton}
          </LocaleLink>
        </div>
      </div>
    </MaxWidthLayout>
  );
}
