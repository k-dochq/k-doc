import Image from 'next/image';

interface ConciergeServiceCardProps {
  src: string;
  alt: string;
  line1: string;
  line2: string;
  overlayGradient: string;
  width: number;
  height: number;
  textSize?: number;
  textFromTop?: number;
  className?: string;
}

export function ConciergeServiceCard({
  src,
  alt,
  line1,
  line2,
  overlayGradient,
  width,
  height,
  textSize = 14,
  textFromTop,
  className = '',
}: ConciergeServiceCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ width, height }}
    >
      <Image src={src} alt={alt} fill className='object-cover' />
      <div className='absolute inset-0' style={{ backgroundImage: overlayGradient }} />
      <div
        className='absolute left-0 right-0 text-center leading-none text-white'
        style={
          textFromTop !== undefined
            ? { top: textFromTop, fontSize: textSize, letterSpacing: `-${textSize * 0.01}px`, fontFamily: 'var(--font-dm-serif-text)' }
            : { bottom: 8, fontSize: textSize, letterSpacing: `-${textSize * 0.01}px`, fontFamily: 'var(--font-dm-serif-text)' }
        }
      >
        <p className='mb-0'>{line1}</p>
        <p>{line2}</p>
      </div>
    </div>
  );
}
