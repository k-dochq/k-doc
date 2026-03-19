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
      <Image src={src} alt={alt} fill className='object-cover' sizes='(max-width: 500px) 54vw, 247px' priority />
      <div className='absolute inset-0' style={{ backgroundImage: overlayGradient }} />
      <div
        className='concierge-title absolute left-0 right-0 text-center leading-none text-white'
        style={{
          top: '64.58%',      // 124 / 192 * 100%
          fontSize: '12.22cqi', // 22 / 180 * 100 — 카드 width 기준
          letterSpacing: '-0.22px',
        }}
      >
        <p className='mb-0'>{line1}</p>
        <p>{line2}</p>
      </div>
    </div>
  );
}
