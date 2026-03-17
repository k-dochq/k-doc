import Image from 'next/image';
import { type Locale } from 'shared/config';

interface ConciergeHeroTitleProps {
  lang: Locale;
}

export function ConciergeHeroTitle({ lang }: ConciergeHeroTitleProps) {
  return (
    <div className='relative h-[185px] w-full'>
      <Image
        src={`/images/premium_package/${lang}/premium_01_main_title.png`}
        alt='Choose Your Concierge Experience'
        fill
        className='object-contain'
        priority
      />
    </div>
  );
}
