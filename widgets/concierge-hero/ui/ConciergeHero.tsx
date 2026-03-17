import Image from 'next/image';
import { type Locale } from 'shared/config';
import { ConciergeHeroCards } from './ConciergeHeroCards';
import { ConciergeHeroTitle } from './ConciergeHeroTitle';

interface ConciergeHeroProps {
  lang: Locale;
}

export function ConciergeHero({ lang }: ConciergeHeroProps) {
  return (
    <section className='relative w-full overflow-hidden' style={{ aspectRatio: '375 / 584' }}>
      <Image
        src='/images/premium_package/common/premium_01_main_bg.png'
        alt=''
        fill
        className='object-cover'
        priority
      />
      <div className='relative flex h-full w-full flex-col items-center pt-4'>
        <ConciergeHeroTitle lang={lang} />
        <div className='mt-6 w-full px-5'>
          <ConciergeHeroCards lang={lang} />
        </div>
      </div>
    </section>
  );
}
