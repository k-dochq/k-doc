import Image from 'next/image';
import { ConciergeHeroCards } from './ConciergeHeroCards';
import { ConciergeHeroTitle } from './ConciergeHeroTitle';

export function ConciergeHero() {
  return (
    <section className='relative w-full overflow-hidden' style={{ aspectRatio: '375 / 584' }}>
      <Image
        src='/images/concierge/premium_01_main_bg.png'
        alt=''
        fill
        className='object-cover'
        priority
      />
      <div className='relative flex h-full w-full flex-col items-center pt-4'>
        <ConciergeHeroTitle />
        <div className='mt-6 w-full px-5'>
          <ConciergeHeroCards />
        </div>
      </div>
    </section>
  );
}
