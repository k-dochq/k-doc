import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ConciergeHeroCards } from './ConciergeHeroCards';
import { ConciergeHeroTitle } from './ConciergeHeroTitle';

interface ConciergeHeroProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConciergeHero({ lang, dict }: ConciergeHeroProps) {
  return (
    <section className='relative w-full overflow-hidden' style={{ aspectRatio: '375 / 584' }}>
      <Image
        src='/images/premium_package/common/premium_01_main_bg.png'
        alt=''
        fill
        className='object-cover'
        sizes='(max-width: 500px) 100vw, 500px'
        priority
      />
      <div className='relative flex h-full w-full flex-col items-center pt-4'>
        <ConciergeHeroTitle lang={lang} />
        <div className='mt-6 w-full px-5'>
          <ConciergeHeroCards lang={lang} dict={dict} />
        </div>
      </div>
    </section>
  );
}
