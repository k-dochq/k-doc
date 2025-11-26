import { PricePackageImage } from './PricePackageImage';
import { ExploreClinicsButton } from './ExploreClinicsButton';
import { BubbleAnimation } from './BubbleAnimation';
import type { StaticImageData } from 'next/image';
import { type Locale } from 'shared/config';

interface PriceImageWithButtonSectionProps {
  imageSrc: string | StaticImageData;
  imageAlt: string;
  buttonText: string;
  bubbleImageSrc: string;
  locale: Locale;
}

export function PriceImageWithButtonSection({
  imageSrc,
  imageAlt,
  buttonText,
  bubbleImageSrc,
  locale,
}: PriceImageWithButtonSectionProps) {
  return (
    <div className='relative'>
      <PricePackageImage src={imageSrc} alt={imageAlt} locale={locale} />
      <div className='absolute right-[35px] bottom-[90px] left-[35px] md:bottom-[140px]'>
        <ExploreClinicsButton text={buttonText} />
        <BubbleAnimation src={bubbleImageSrc} />
      </div>
    </div>
  );
}
