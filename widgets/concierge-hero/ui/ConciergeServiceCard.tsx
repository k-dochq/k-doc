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
      style={{ width: 180, height: 192 }}
    >
      <Image src={src} alt={alt} fill className='object-cover' />
      <div className='absolute inset-0' style={{ backgroundImage: overlayGradient }} />
      <div
        className='absolute left-0 right-0 text-center leading-none text-white'
        style={{ top: 124, fontSize: 22, letterSpacing: '-0.22px' }}
      >
        <p className='mb-0'>{line1}</p>
        <p>{line2}</p>
      </div>
    </div>
  );
}
