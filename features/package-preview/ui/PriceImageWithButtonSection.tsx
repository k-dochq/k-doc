import { PricePackageImage } from './PricePackageImage';
import { ExploreClinicsButton } from './ExploreClinicsButton';
import { BubbleAnimation } from './BubbleAnimation';
import type { StaticImageData } from 'next/image';
import { type Locale } from 'shared/config';

interface PriceImageWithButtonSectionProps {
  imageSrc: string | StaticImageData;
  imageAlt: string;
  buttonText: string;
  locale: Locale;
}

export function PriceImageWithButtonSection({
  imageSrc,
  imageAlt,
  buttonText,
  locale,
}: PriceImageWithButtonSectionProps) {
  return (
    <div className='relative'>
      <PricePackageImage src={imageSrc} alt={imageAlt} locale={locale} />
      <div
        className={`absolute right-[35px] left-[35px] ${locale === 'th' ? 'bottom-[100px] md:bottom-[140px]' : 'bottom-[120px] md:bottom-[160px]'}`}
      >
        <ExploreClinicsButton text={buttonText} />
        <BubbleAnimation locale={locale} />
      </div>
    </div>
  );
}
