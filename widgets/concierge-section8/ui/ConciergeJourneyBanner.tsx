import Image from 'next/image';

export function ConciergeJourneyBanner() {
  return (
    <div className='relative w-full' style={{ aspectRatio: '375 / 320' }}>
      <Image
        src='/images/concierge/premium_08_img.png'
        alt='Start Your Medical Journey'
        fill
        className='object-cover'
      />
    </div>
  );
}
