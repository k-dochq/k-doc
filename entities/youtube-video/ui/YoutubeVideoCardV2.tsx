'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Prisma } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type YoutubeVideoData } from '../api/use-cases/get-youtube-videos';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { DEFAULT_IMAGES } from 'shared/config/images';
import { getYoutubeVideoThumbnail } from '../lib/get-thumbnail';

interface YoutubeVideoCardV2Props {
  video: YoutubeVideoData;
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

export function YoutubeVideoCardV2({ video, lang, dict, className = '' }: YoutubeVideoCardV2Props) {
  const [imageError, setImageError] = useState(false);

  // 썸네일 선택 (fallback: en -> th -> ko)
  const thumbnail = getYoutubeVideoThumbnail(video.thumbnails, lang);
  const thumbnailUrl = thumbnail?.imageUrl || null;

  // 이미지 에러 처리
  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowDefaultImage = !thumbnailUrl || imageError;
  const imageSrc = shouldShowDefaultImage ? DEFAULT_IMAGES.HOSPITAL_DEFAULT : thumbnailUrl;

  // 다국어 필드 추출
  const title = extractLocalizedText(video.title as Prisma.JsonValue, lang) || '';
  const description =
    extractLocalizedText((video.description as Prisma.JsonValue) || null, lang) || '';
  const videoUrl = extractLocalizedText(video.videoUrl as Prisma.JsonValue, lang) || '';
  const thumbnailAlt = thumbnail?.alt || title || 'Youtube video';

  // 카드 컨텐츠
  const cardContent = (
    <div className={`relative flex flex-col items-start gap-[12px] ${className}`}>
      {/* 썸네일 이미지 */}
      <div className='relative h-[169px] w-[300px] shrink-0 overflow-clip rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]'>
        <div className='absolute top-0 left-0 h-[169px] w-[300px]'>
          <Image
            alt={thumbnailAlt}
            src={imageSrc}
            fill
            sizes='300px'
            className='pointer-events-none absolute inset-0 max-w-none object-cover object-[50%_50%]'
            onError={handleImageError}
            quality={100}
          />
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className='relative box-border flex w-full shrink-0 flex-col items-start gap-[2px] px-2 py-0 not-italic'>
        {/* 타이틀 (한 줄 ellipsis) */}
        <p className='relative w-[min-content] min-w-full shrink-0 overflow-hidden text-[18px] leading-[28px] font-semibold text-ellipsis whitespace-nowrap text-neutral-700'>
          {title}
        </p>
        {/* 설명 (한 줄 ellipsis) */}
        <p className='relative w-full shrink-0 overflow-hidden text-[14px] leading-[20px] font-[500] text-ellipsis whitespace-nowrap text-neutral-500'>
          {description}
        </p>
      </div>
    </div>
  );

  // videoUrl이 있으면 외부 링크로 감싸기
  if (videoUrl) {
    return (
      <a href={videoUrl} target='_blank' rel='noopener noreferrer' className='block'>
        {cardContent}
      </a>
    );
  }

  // videoUrl이 없으면 클릭 불가
  return cardContent;
}
