import Image from 'next/image';
import { type Dictionary } from 'shared/model/types';

interface ConciergeWhyChooseProps {
  dict: Dictionary;
}

const ICON_LIST_IMAGES = [
  '/images/concierge/premium_06_icon_list_1.png',
  '/images/concierge/premium_06_icon_list_2.png',
  '/images/concierge/premium_06_icon_list_3.png',
  '/images/concierge/premium_06_icon_list_4.png',
  '/images/concierge/premium_06_icon_list_5.png',
];

export function ConciergeWhyChoose({ dict }: ConciergeWhyChooseProps) {
  const t = dict.concierge;

  return (
    <section className='flex w-full flex-col items-center gap-6 bg-[#7657ff] px-5 py-12'>
      {/* Title */}
      <div className='w-full text-center text-[42px] leading-[1.1] text-white'>
        <p className='mb-0'>Why Choose</p>
        <p>K-DOC</p>
      </div>

      {/* Description */}
      <p className='w-full text-center text-[14px] leading-5 text-[#f5f5f5]'>
        {t?.section6Description}
      </p>

      {/* Icon list images */}
      <div className='flex w-full flex-col gap-4'>
        {ICON_LIST_IMAGES.map((src, index) => (
          <div
            key={src}
            className='relative w-full overflow-hidden rounded-2xl'
            style={{ aspectRatio: '335 / 124' }}
          >
            <Image
              src={src}
              alt={`K-DOC service ${index + 1}`}
              fill
              className='object-cover'
            />
          </div>
        ))}
      </div>

      {/* Notice */}
      <div className='flex w-full flex-col gap-0.5'>
        <p className='text-[16px] font-semibold leading-6 text-white'>{t?.section6NoticeTitle}</p>
        <p className='text-[14px] leading-5 text-[#f5f5f5]'>{t?.section6NoticeBody}</p>
      </div>
    </section>
  );
}
