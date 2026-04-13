import Image from 'next/image';

interface TipCoverImageProps {
  src: string;
  alt: string;
}

export function TipCoverImage({ src, alt }: TipCoverImageProps) {
  return (
    <div className='relative aspect-[335/224] w-full overflow-hidden rounded-xl'>
      <Image
        src={src}
        alt={alt}
        fill
        sizes='(max-width: 500px) 100vw, 500px'
        priority
        className='object-cover'
      />
    </div>
  );
}
