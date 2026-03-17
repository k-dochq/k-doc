import Image from 'next/image';
import { type Locale } from 'shared/config';

interface ConciergeJourneyBannerProps {
  lang: Locale;
}

export function ConciergeJourneyBanner({ lang }: ConciergeJourneyBannerProps) {
  return (
    <div className='relative w-full' style={{ aspectRatio: '375 / 320' }}>
      <Image
        src={`/images/premium_package/${lang}/premium_08_img.png`}
        alt='Start Your Medical Journey'
        fill
        className='object-cover'
      />
    </div>
  );
}
