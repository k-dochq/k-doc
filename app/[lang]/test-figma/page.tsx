import { type Locale } from 'shared/config';
import { FigmaSearchBar } from './FigmaSearchBar';
import { QuickMenuIconItem } from './QuickMenuIconItem';

interface TestFigmaPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function TestFigmaPage({ params }: TestFigmaPageProps) {
  const { lang } = await params;

  return (
    <div className='min-h-screen bg-white p-8'>
      <div className='mx-auto max-w-2xl'>
        <h1 className='mb-8 text-2xl font-bold text-gray-900'>Figma MCP 디자인 테스트 페이지</h1>

        <div className='space-y-8'>
          {/* 검색 바 - Tailwind 최적화 버전 */}
          <section>
            <h2 className='mb-4 text-lg font-semibold text-gray-700'>검색 바</h2>
            <FigmaSearchBar />
          </section>

          {/* QuickMenu 아이콘 아이템 - Tailwind 최적화 버전 */}
          <section>
            <h2 className='mb-4 text-lg font-semibold text-gray-700'>QuickMenu 아이콘 아이템</h2>
            <QuickMenuIconItem label='눈' />
          </section>
        </div>
      </div>
    </div>
  );
}
