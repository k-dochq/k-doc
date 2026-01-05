import { PriceImageWithButtonSection } from './PriceImageWithButtonSection';
import type { StaticImageData } from 'next/image';
import { type Locale } from 'shared/config';

interface PriceSectionProps {
  priceImageSrc: string | StaticImageData;
  priceImageAlt: string;
  buttonText: string;
  locale: Locale;
  bubbleText: string;
}

export function PriceSection({
  priceImageSrc,
  priceImageAlt,
  buttonText,
  locale,
  bubbleText,
}: PriceSectionProps) {
  return (
    <PriceImageWithButtonSection
      imageSrc={priceImageSrc}
      imageAlt={priceImageAlt}
      buttonText={buttonText}
      locale={locale}
      bubbleText={bubbleText}
    />
  );
}
