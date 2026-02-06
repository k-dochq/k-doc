'use client';

import Image from 'next/image';
import { type Locale } from 'shared/config';

interface PremiumServiceCardV2Props {
  lang: Locale;
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
}

export function PremiumServiceCardV2({
  lang,
  imageUrl,
  imageAlt,
  title,
  description,
}: PremiumServiceCardV2Props) {
  const isKorean = lang === 'ko';

  return (
    <div className='relative min-h-[210px] w-full overflow-hidden rounded-xl bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]'>
      {/* 이미지 */}
      <div className='absolute inset-0'>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className='object-cover object-center'
          sizes='(max-width: 768px) 100vw, 335px'
          quality={100}
        />
      </div>

      {/* 그라데이션 오버레이 */}
      <div className='absolute bottom-0 left-0 h-[110px] w-full bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.194)] to-[rgba(0,0,0,0.8)]' />

      {/* 텍스트 영역: 한국어만 고정 너비, 그 외는 pr-5 */}
      <div
        className={`absolute bottom-5 left-5 flex flex-col gap-0.5 whitespace-pre-wrap text-white ${isKorean ? 'w-[267px]' : 'pr-5'}`}
      >
        <p className='w-full text-lg leading-7 font-semibold'>{title}</p>
        <p className='w-full text-[13px] leading-[19px] font-medium'>{description}</p>
      </div>
    </div>
  );
}
