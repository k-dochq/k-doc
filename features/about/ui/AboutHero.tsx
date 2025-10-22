import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import Image from 'next/image';

interface AboutHeroProps {
  lang: Locale;
  dict: Dictionary;
}

export function AboutHero({ lang, dict }: AboutHeroProps) {
  return (
    <>
      <h1 className='text-primary text-5xl font-bold'>{dict.about.title}</h1>
      <div className='mt-8'>
        <h2 className='text-primary text-2xl font-bold'>{dict.about.subtitle}</h2>
      </div>
      <div className='mt-6 grid grid-cols-2'>
        <div className='flex flex-col items-center'>
          <Image
            src='/images/profile_woo.png'
            alt='Dr. Woo Jung Ho'
            width={120}
            height={198}
            className='w-[120px] object-contain'
            priority
          />
          <div className='mt-2 text-center'>
            <p className='text-xs font-normal text-neutral-600 whitespace-pre-line'>{dict.about.profiles.woo.description}</p>
            <p className='text-xs font-bold text-neutral-600 mt-0.5'>{dict.about.profiles.woo.name}</p>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <Image
            src='/images/profile_park.png'
            alt='Dr. Park Jong Hyeon'
            width={120}
            height={198}
            className='w-[120px] object-contain'
            priority
          />
          <div className='mt-2 text-center flex items-center justify-center h-full'>
            <p className='text-xs font-bold text-neutral-600 whitespace-pre-line'>
              {dict.about.profiles.park.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
