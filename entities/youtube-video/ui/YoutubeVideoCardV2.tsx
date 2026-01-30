'use client';

import { useState } from 'react';
import { type Prisma } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type YoutubeVideoData } from '../api/use-cases/get-youtube-videos';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { DEFAULT_IMAGES } from 'shared/config/images';
import { getYoutubeVideoThumbnail } from '../lib/get-thumbnail';
import { YoutubeVideoMediaContainer } from './YoutubeVideoMediaContainer';
import { YoutubeVideoTextContent } from './YoutubeVideoTextContent';

interface YoutubeVideoCardV2Props {
  video: YoutubeVideoData;
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

export function YoutubeVideoCardV2({ video, lang, dict, className = '' }: YoutubeVideoCardV2Props) {
  const [imageError, setImageError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // 썸네일 클릭 핸들러
  const handleThumbnailClick = () => {
    if (videoUrl) {
      setIsLoading(true);
      setIsPlaying(true);
    }
  };

  // iframe 로드 완료 핸들러
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative flex flex-col items-start gap-[12px] ${className}`}>
      <YoutubeVideoMediaContainer
        isPlaying={isPlaying}
        thumbnailImageSrc={imageSrc}
        thumbnailAlt={thumbnailAlt}
        videoUrl={videoUrl}
        videoTitle={title}
        isLoading={isLoading}
        onThumbnailClick={handleThumbnailClick}
        onThumbnailError={handleImageError}
        onIframeLoad={handleIframeLoad}
      />
      <YoutubeVideoTextContent title={title} description={description} lang={lang} />
    </div>
  );
}
