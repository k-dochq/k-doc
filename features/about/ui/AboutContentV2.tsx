import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { AboutCertificationImagesV2 } from './AboutCertificationImagesV2';

interface AboutContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function AboutContentV2({ lang, dict }: AboutContentV2Props) {
  return (
    <div className='relative px-5 py-14'>
      {/* 배경 이미지 */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/buildings.png'
          alt='Buildings background'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* 콘텐츠 */}
      <div className='relative z-10'>
        <h2 className='mb-6 text-3xl font-bold whitespace-pre-line text-white'>
          {dict.about.governmentCertified.title}
        </h2>
        <p className='text-base font-normal whitespace-pre-line text-white'>
          {dict.about.governmentCertified.description}
        </p>

        {/* 인증서 이미지 섹션 */}
        <AboutCertificationImagesV2 lang={lang} dict={dict} />
      </div>
    </div>
  );
}
