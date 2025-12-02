import { FigmaSearchBar } from './FigmaSearchBar';
import { QuickMenuIconItem } from './QuickMenuIconItem';
import { SectionTitle } from './SectionTitle';
import { HospitalCard } from './HospitalCard';

export default async function TestFigmaPage() {
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

          {/* 섹션 제목 - Tailwind 최적화 버전 */}
          <section>
            <h2 className='mb-4 text-lg font-semibold text-gray-700'>섹션 제목</h2>
            <SectionTitle title='많이 찾는 병원' />
          </section>

          {/* 병원 카드 - Tailwind 최적화 버전 */}
          <section>
            <h2 className='mb-4 text-lg font-semibold text-gray-700'>병원 카드</h2>
            <HospitalCard
              hotTag={true}
              categoryTag='리프팅'
              hospitalName='압구정미라클의원'
              area='지역'
              location='압구정'
              price='$1,500~'
              rating={5.0}
              reviewCount={49}
            />
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
