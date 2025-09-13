'use client';

import { type Locale } from 'shared/config';

interface CautionSectionProps {
  lang: Locale;
  dict: {
    cautionSection: {
      title: string;
      items: (string | { title: string; details: string[] })[];
    };
  };
}

const imgBull2Px = 'http://localhost:3845/assets/d970b4f257fdfb5193234b94f8df39cbbf524488.svg';

export function CautionSection({ lang, dict }: CautionSectionProps) {
  const renderItem = (item: string | { title: string; details: string[] }, index: number) => {
    if (typeof item === 'string') {
      return (
        <div
          key={index}
          className='relative flex w-full shrink-0 content-stretch items-center justify-start gap-1'
        >
          <div className='flex flex-row items-center self-stretch'>
            <div className='relative flex h-full shrink-0 content-stretch items-center justify-start gap-2.5'>
              <div className='relative size-0.5 shrink-0'>
                <img alt='' className='block size-full max-w-none' src={imgBull2Px} />
              </div>
            </div>
          </div>
          <div className='relative min-h-px min-w-px shrink-0 grow basis-0 text-[12px] leading-[0] font-normal text-[#636363] not-italic'>
            <p className='leading-[16px]'>{item}</p>
          </div>
        </div>
      );
    }

    return (
      <div
        key={index}
        className='relative flex w-full shrink-0 flex-col content-stretch items-start justify-start gap-0.5'
      >
        <div className='relative flex w-full shrink-0 content-stretch items-center justify-start gap-1'>
          <div className='flex flex-row items-center self-stretch'>
            <div className='relative box-border flex h-full shrink-0 content-stretch items-start justify-start gap-2.5 px-0 pt-[7px] pb-0'>
              <div className='relative size-0.5 shrink-0'>
                <img alt='' className='block size-full max-w-none' src={imgBull2Px} />
              </div>
            </div>
          </div>
          <div className='relative min-h-px min-w-px shrink-0 grow basis-0 text-[12px] leading-[0] font-normal text-[#636363] not-italic'>
            <p className='leading-[16px]'>{item.title}</p>
          </div>
        </div>
        <div className='relative box-border flex w-full shrink-0 content-stretch items-center justify-start gap-1 py-0 pr-0 pl-1.5'>
          <div className='relative min-h-px min-w-px shrink-0 grow basis-0 text-[12px] leading-[16px] font-normal text-[#636363] not-italic'>
            {item.details.map((detail, detailIndex) => (
              <p
                key={detailIndex}
                className={detailIndex === item.details.length - 1 ? '' : 'mb-0'}
              >
                {detail}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='relative box-border flex size-full flex-col content-stretch items-start justify-start gap-3 bg-white py-5'>
      <div className='relative flex shrink-0 content-stretch items-center justify-start gap-1'>
        <div className='relative shrink-0 text-[13px] leading-[0] font-bold text-nowrap text-neutral-500 not-italic'>
          <p className='leading-[18px] whitespace-pre'>{dict.cautionSection.title}</p>
        </div>
      </div>
      <div className='relative flex w-full shrink-0 flex-col content-stretch items-start justify-start gap-2'>
        {dict.cautionSection.items.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  );
}
