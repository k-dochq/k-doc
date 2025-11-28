import { PriceImageWithButtonSection } from './PriceImageWithButtonSection';
import type { StaticImageData } from 'next/image';
import { type Locale } from 'shared/config';

interface PriceSectionProps {
  priceImageSrc: string | StaticImageData;
  priceImageAlt: string;
  buttonText: string;
  guaranteeText: string;
  locale: Locale;
}

export function PriceSection({
  priceImageSrc,
  priceImageAlt,
  buttonText,
  guaranteeText,
  locale,
}: PriceSectionProps) {
  return (
    <PriceImageWithButtonSection
      imageSrc={priceImageSrc}
      imageAlt={priceImageAlt}
      buttonText={buttonText}
      guaranteeText={guaranteeText}
      locale={locale}
    />
  );
}
