import Image from 'next/image';

export function ConciergeHeroTitle() {
  return (
    <div className='relative h-[185px] w-full'>
      <Image
        src='/images/concierge/premium_01_main_title.png'
        alt='Choose Your Concierge Experience'
        fill
        className='object-contain'
        priority
      />
    </div>
  );
}
