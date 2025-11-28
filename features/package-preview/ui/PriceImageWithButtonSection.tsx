import { PricePackageImage } from './PricePackageImage';
import { ExploreClinicsButton } from './ExploreClinicsButton';
import { BubbleAnimation } from './BubbleAnimation';
import type { StaticImageData } from 'next/image';
import { type Locale } from 'shared/config';

interface PriceImageWithButtonSectionProps {
  imageSrc: string | StaticImageData;
  imageAlt: string;
  buttonText: string;
  guaranteeText: string;
  locale: Locale;
}

export function PriceImageWithButtonSection({
  imageSrc,
  imageAlt,
  buttonText,
  guaranteeText,
  locale,
}: PriceImageWithButtonSectionProps) {
  return (
    <div className='relative'>
      <PricePackageImage src={imageSrc} alt={imageAlt} locale={locale} />
      <div
        className={`absolute right-[35px] left-[35px] ${locale === 'th' ? 'bottom-[100px] md:bottom-[160px]' : 'bottom-[120px] md:bottom-[180px]'}`}
      >
        <div className='flex flex-col items-center'>
          <p
            className='mb-[32px] text-center text-[24px] leading-[100%] font-normal italic'
            style={{
              color: '#FF5DCA',
              letterSpacing: '-0.48px',
            }}
          >
            {guaranteeText}
          </p>
          <ExploreClinicsButton text={buttonText} />
        </div>
        <BubbleAnimation locale={locale} />
      </div>
    </div>
  );
}
