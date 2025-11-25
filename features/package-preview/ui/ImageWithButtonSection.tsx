import { PackageImage } from './PackageImage';
import { ExploreClinicsButton } from './ExploreClinicsButton';
import { BubbleAnimation } from './BubbleAnimation';

interface ImageWithButtonSectionProps {
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  bubbleImageSrc: string;
}

export function ImageWithButtonSection({
  imageSrc,
  imageAlt,
  buttonText,
  bubbleImageSrc,
}: ImageWithButtonSectionProps) {
  return (
    <div className='relative'>
      <PackageImage src={imageSrc} alt={imageAlt} />
      <div className='absolute right-[35px] bottom-[90px] left-[35px] md:bottom-[140px]'>
        <ExploreClinicsButton text={buttonText} />
        <BubbleAnimation src={bubbleImageSrc} />
      </div>
    </div>
  );
}
