import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface AboutVisionV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function AboutVisionV2({ lang, dict }: AboutVisionV2Props) {
  const sections = dict.about.visionV2.sections;

  return (
    <div className='flex flex-col items-start pb-20'>
      {/* 타이틀 섹션 */}
      <div className='flex flex-col gap-1 px-5 pt-20 pb-6'>
        <p className='text-base leading-6 font-bold text-neutral-400'>K-DOC VISION</p>
        <p className='text-xl leading-7 font-bold whitespace-pre-line text-neutral-700'>
          {dict.about.visionV2.subtitle}
        </p>
      </div>

      {/* 섹션 1: Global Medical Platform */}
      <div className='flex flex-col gap-4 border-t border-neutral-700 px-5 py-6'>
        <p className='text-2xl leading-8 font-semibold text-neutral-700'>{sections[0].title}</p>
        <div className='relative h-[220px] w-full overflow-hidden rounded-xl bg-neutral-200'>
          <Image
            src='/images/figma/about-vision-global-platform.png'
            alt={sections[0].title}
            fill
            className='object-cover'
          />
        </div>
        <p className='text-base leading-6 font-normal whitespace-pre-line text-neutral-500'>
          {sections[0].description}
        </p>
      </div>

      {/* 섹션 2: Your Trusted Choice */}
      <div className='flex flex-col gap-4 border-t border-neutral-700 px-5 py-6'>
        <p className='text-2xl leading-8 font-semibold text-neutral-700'>{sections[1].title}</p>
        <div className='relative h-[220px] w-full overflow-hidden rounded-xl bg-neutral-200'>
          <Image
            src='/images/figma/about-vision-trusted-choice.png'
            alt={sections[1].title}
            fill
            className='object-cover'
          />
        </div>
        <p className='text-base leading-6 font-normal whitespace-pre-line text-neutral-500'>
          {sections[1].description}
        </p>
      </div>

      {/* 섹션 3: Curated Clinics & Hospitals */}
      <div className='flex flex-col gap-4 border-t border-b border-neutral-700 px-5 py-6'>
        <p className='text-2xl leading-8 font-semibold text-neutral-700'>{sections[2].title}</p>
        <div className='relative h-[220px] w-full overflow-hidden rounded-xl bg-neutral-200'>
          <Image
            src='/images/figma/about-vision-curated-clinics.png'
            alt={sections[2].title}
            fill
            className='object-cover'
          />
        </div>
        <p className='text-base leading-6 font-normal whitespace-pre-line text-neutral-500'>
          {sections[2].description}
        </p>
      </div>
    </div>
  );
}
