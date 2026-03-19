import Image from 'next/image';
import { type Dictionary } from 'shared/model/types';

interface ConciergeTravelProps {
  dict: Dictionary;
}

export function ConciergeTravel({ dict }: ConciergeTravelProps) {
  const t = dict.concierge;

  return (
    <section className='flex w-full flex-col items-center gap-6 bg-white py-12'>
      {/* Title + Description */}
      <div className='flex w-full flex-col items-center gap-3 px-5 text-center'>
        <div className='concierge-title w-full text-[42px] leading-[1.1] text-[#7657ff]'>
          <p className='mb-0'>{t?.section7TitleLine1}</p>
          <p>
            <span className='italic'>{t?.section7TitleLine2Italic} </span>
            <span>{t?.section7TitleLine2Normal}</span>
          </p>
        </div>
        <p className='w-full text-[14px] leading-5 text-[#737373]'>{t?.section7Description}</p>
      </div>

      {/* Full-width image */}
      <div className='relative w-full' style={{ aspectRatio: '375 / 562' }}>
        <Image
          src='/images/premium_package/common/premium_07_travel_bg.png'
          alt='Beyond Medical Travel'
          fill
          className='object-cover'
        />
      </div>
    </section>
  );
}
