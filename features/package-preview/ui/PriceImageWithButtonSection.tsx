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

const guaranteeSvgPaths: Record<Locale, string> = {
  ko: '/images/event/package/guarantee_text_en.svg',
  en: '/images/event/package/guarantee_text_en.svg',
  th: '/images/event/package/guarantee_text_th.svg',
  'zh-Hant': '/images/event/package/guarantee_text_en.svg',
};

export function PriceImageWithButtonSection({
  imageSrc,
  imageAlt,
  buttonText,
  locale,
}: PriceImageWithButtonSectionProps) {
  const guaranteeSvgPath = guaranteeSvgPaths[locale];

  return (
    <div className='relative'>
      <PricePackageImage src={imageSrc} alt={imageAlt} locale={locale} />
      <div
        className={`absolute right-[35px] left-[35px] ${locale === 'th' ? 'bottom-[100px] md:bottom-[160px]' : 'bottom-[120px] md:bottom-[180px]'}`}
      >
        <div className='flex flex-col items-center'>
          <img
            src={guaranteeSvgPath}
            alt='Fast Reservation Guarantee'
            className='mb-[32px] h-6 w-auto'
            style={{
              animation: 'fadePulse 0.9s ease-in-out infinite',
            }}
          />
          <ExploreClinicsButton text={buttonText} />
        </div>
        <BubbleAnimation locale={locale} />
      </div>
    </div>
  );
}
