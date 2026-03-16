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
      {/* Background image */}
      <div
        className='absolute blur-[0.5px]'
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

      {/* Blue gradient dim overlay */}
      <div
        className='absolute top-0 left-0 w-full'
        style={{ height: '527px', backgroundImage: BLUE_GRADIENT }}
      />

      {/* Title - top frame starts at y:16 */}
      <div className='absolute top-4 left-0 right-0'>
        <ConciergeHeroTitle />
      </div>

      {/* Service cards */}
      <ConciergeHeroCards />
    </section>
  );
}
