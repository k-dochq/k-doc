import Image from 'next/image';

export function EventBannerRibbonSkeleton() {
  return (
    <div className='relative aspect-[375/80] w-full overflow-hidden'>
      <Image
        src='/images/banner_top_3.png'
        alt='Loading banner'
        fill
        sizes='500px'
        className='object-cover blur-xl'
        priority
      />
    </div>
  );
}
