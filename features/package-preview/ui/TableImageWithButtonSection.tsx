import { PackageImage } from './PackageImage';
import { ExploreClinicsButton } from './ExploreClinicsButton';
import { BubbleAnimation } from './BubbleAnimation';
import { type Locale } from 'shared/config';

interface TableImageWithButtonSectionProps {
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  locale: Locale;
  bubbleText: string;
}

export function TableImageWithButtonSection({
  imageSrc,
  imageAlt,
  buttonText,
  locale,
  bubbleText,
}: TableImageWithButtonSectionProps) {
  return (
    <div className='relative'>
      <PackageImage src={imageSrc} alt={imageAlt} />
      <div className='absolute right-[35px] bottom-[110px] left-[35px] md:bottom-[160px]'>
        <ExploreClinicsButton text={buttonText} />
        <BubbleAnimation locale={locale} text={bubbleText} />
      </div>
    </div>
  );
}
