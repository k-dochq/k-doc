import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface MainPackageImageProps {
  src: string | StaticImageData;
  alt: string;
}

export function MainPackageImage({ src, alt }: MainPackageImageProps) {
  return (
    <div className='relative w-full' style={{ aspectRatio: '750/990' }}>
      <Image
        src={src}
        alt={alt}
        fill
        className='object-contain'
        placeholder='blur'
        priority
        sizes='100vw'
        quality={100}
      />
    </div>
  );
}
