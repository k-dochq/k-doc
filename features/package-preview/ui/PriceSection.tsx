import { ImageWithButtonSection } from './ImageWithButtonSection';

interface PriceSectionProps {
  priceImageSrc: string;
  priceImageAlt: string;
  buttonText: string;
  bubbleImageSrc: string;
}

export function PriceSection({
  priceImageSrc,
  priceImageAlt,
  buttonText,
  bubbleImageSrc,
}: PriceSectionProps) {
  return (
    <ImageWithButtonSection
      imageSrc={priceImageSrc}
      imageAlt={priceImageAlt}
      buttonText={buttonText}
      bubbleImageSrc={bubbleImageSrc}
    />
  );
}
