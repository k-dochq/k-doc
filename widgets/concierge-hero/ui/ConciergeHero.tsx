import Image from 'next/image';
import { ConciergeHeroCards } from './ConciergeHeroCards';
import { ConciergeHeroTitle } from './ConciergeHeroTitle';

const BLUE_GRADIENT =
  'linear-gradient(180deg, rgb(15, 86, 176) 13.947%, rgba(54, 43, 219, 0.8) 31.23%, rgba(54, 43, 219, 0.5) 82.841%, rgba(54, 43, 219, 0) 100%)';

export function ConciergeHero() {
  return (
    <section
      className='relative w-full overflow-hidden'
      style={{ height: '584px', backgroundColor: '#fef8ff' }}
    >
      {/* Background image - 의도적으로 섹션 밖으로 확장되는 장식 요소 */}
      <div
        className='absolute z-0 blur-[0.5px]'
        style={{ left: '-248px', top: '56px', width: '967px', height: '540px' }}
      >
        <Image
          src='/images/concierge/section1-bg.jpg'
          alt=''
          fill
          className='pointer-events-none object-cover'
          priority
        />
      </div>

      {/* Blue gradient dim overlay - 배경 위에 덮는 반투명 레이어 */}
      <div
        className='absolute inset-x-0 top-0 z-[1]'
        style={{ height: '527px', backgroundImage: BLUE_GRADIENT }}
      />

      {/* Main content - flex 레이아웃으로 타이틀 + 카드 순서 배치 */}
      <div className='relative z-[2] flex w-full flex-col items-center pt-4'>
        <ConciergeHeroTitle />
        <ConciergeHeroCards />
      </div>
    </section>
  );
}
