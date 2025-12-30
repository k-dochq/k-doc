import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { type Locale } from 'shared/config';

interface PricePackageImageProps {
  src: string | StaticImageData;
  alt: string;
  locale: Locale;
}

export function PricePackageImage({ src, alt, locale }: PricePackageImageProps) {
  const aspectRatio = locale === 'th' ? '750/2430' : '750/2420';
  const isStaticImage = typeof src !== 'string' && 'src' in src;

  return (
    <div className='relative w-full' style={{ aspectRatio }}>
      <Image
        src={src}
        alt={alt}
        fill
        className='object-cover'
        {...(isStaticImage && { placeholder: 'blur' })}
        priority
        sizes='100vw'
        quality={100}
      />
    </div>
  );
}
