'use client';

import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';
import { LocaleLink } from 'shared/ui/locale-link';
import { HeaderLogo } from 'widgets/header/ui/HeaderLogo';
import { extractLocaleFromPathname } from 'shared/lib/locale/utils';
import { DEFAULT_LOCALE } from 'shared/config/locales';

// 다국어 메시지 정의
const messages = {
  ko: {
    title: '페이지를 찾을 수 없습니다',
    description: '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.',
    homeButton: '홈으로 돌아가기',
  },
  en: {
    title: 'Page Not Found',
    description: "The page you are looking for doesn't exist or may have been moved.",
    homeButton: 'Go back to Home',
  },
  th: {
    title: 'ไม่พบหน้านี้',
    description: 'ไม่พบหน้าที่คุณกำลังค้นหา หรืออาจถูกย้ายไปแล้วค่ะ',
    homeButton: 'กลับไปหน้าแรก',
  },
  'zh-Hant': {
    title: 'Page Not Found',
    description: "The page you are looking for doesn't exist or may have been moved.",
    homeButton: 'Go back to Home',
  },
  ja: {
    title: 'ページが見つかりません',
    description: 'お探しのページは存在しないか、移動された可能性があります。',
    homeButton: 'ホームに戻る',
  },
  hi: {
    title: 'पृष्ठ नहीं मिला',
    description:
      'आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है या स्थानांतरित हो गया हो सकता है।',
    homeButton: 'होम पर वापस जाएं',
  },
  tl: {
    title: 'Page Not Found',
    description: "The page you are looking for doesn't exist or may have been moved.",
    homeButton: 'Go back to Home',
  },
  ar: {
    title: 'الصفحة غير موجودة',
    description: 'الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.',
    homeButton: 'العودة إلى الرئيسية',
  },
  ru: {
    title: 'Страница не найдена',
    description: 'Запрашиваемая страница не существует или была перемещена.',
    homeButton: 'Вернуться на главную',
  },
} as const;

export default function NotFound() {
  // pathname에서 locale 추출
  const pathname = usePathname();
  const lang = pathname ? extractLocaleFromPathname(pathname) : DEFAULT_LOCALE;
  const dict = messages[lang];

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-md text-center'>
        {/* K-DOC 로고 */}
        <div className='mb-8 flex justify-center'>
          <div className='text-primary'>
            <HeaderLogo />
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
          className='inline-flex items-center gap-2 rounded-lg bg-[#DA47EF] px-6 py-3 text-white transition-colors hover:bg-[#DA47EF]/90 focus:ring-2 focus:ring-[#DA47EF] focus:ring-offset-2 focus:outline-none'
        >
          <Home className='h-4 w-4' />
          {dict.homeButton}
        </LocaleLink>
      </div>
    </div>
  );
}
