import Image from 'next/image';

interface ConciergeServiceCardProps {
  src: string;
  alt: string;
  line1: string;
  line2: string;
  overlayGradient: string;
  className?: string;
}

export function ConciergeServiceCard({
  src,
  alt,
  line1,
  line2,
  overlayGradient,
  className = '',
}: ConciergeServiceCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ width: '100%', aspectRatio: '180 / 192', containerType: 'inline-size' }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className='object-cover'
        sizes='(max-width: 500px) 54vw, 247px'
        priority
      />
    </div>
  );
}
