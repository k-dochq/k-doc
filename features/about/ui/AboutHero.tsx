import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import Image from 'next/image';

interface AboutHeroProps {
  lang: Locale;
  dict: Dictionary;
}

export function AboutHero({ lang, dict }: AboutHeroProps) {
  // 언어별 이미지 경로 설정
  const getImageSrc = (locale: Locale) => {
    switch (locale) {
      case 'ko':
        return '/images/k-doc_make_kr.png';
      case 'en':
        return '/images/k-doc_make_en.png';
      case 'th':
        return '/images/k-doc_make_th.png';
      default:
        return '/images/k-doc_make_kr.png';
    }
  };

  return (
    <>
      <h1 className='text-primary text-5xl font-bold'>{dict.about.title}</h1>
      <div className='mt-8'>
        <h2 className='text-primary text-2xl font-bold'>{dict.about.subtitle}</h2>
      </div>
      <div className='md:mt-8'>
        <Image
          src={getImageSrc(lang)}
          alt={dict.about.subtitle}
          width={468}
          height={387}
          className='h-[387px] w-full max-w-[468px] object-contain'
          priority
        />
      </div>
    </>
  );
}
