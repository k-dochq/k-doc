'use client';

/// <reference types="youtube" />

import { useEffect, useRef, useState } from 'react';
import { type Prisma } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type YoutubeVideoData } from '../api/use-cases/get-youtube-videos';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { DEFAULT_IMAGES } from 'shared/config/images';
import { getYoutubeVideoThumbnail } from '../lib/get-thumbnail';
import { loadYouTubeIframeAPI, extractYouTubeVideoId } from 'shared/lib/youtube-iframe-api';
import { YoutubeVideoMediaContainer } from './YoutubeVideoMediaContainer';
import { YoutubeVideoTextContent } from './YoutubeVideoTextContent';

interface YoutubeVideoCardV2Props {
  video: YoutubeVideoData;
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

export function YoutubeVideoCardV2({ video, lang, dict: _dict, className = '' }: YoutubeVideoCardV2Props) {
  const [imageError, setImageError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const isPlayerReadyRef = useRef(false);

  // 썸네일 선택 (fallback: en -> th -> ko)
  const thumbnail = getYoutubeVideoThumbnail(video.thumbnails, lang);
  const thumbnailUrl = thumbnail?.imageUrl || null;

  const handleImageError = () => setImageError(true);

  const shouldShowDefaultImage = !thumbnailUrl || imageError;
  const imageSrc = shouldShowDefaultImage ? DEFAULT_IMAGES.HOSPITAL_DEFAULT : thumbnailUrl;

  // 다국어 필드 추출
  const title = extractLocalizedText(video.title as Prisma.JsonValue, lang) || '';
  const description =
    extractLocalizedText((video.description as Prisma.JsonValue) || null, lang) || '';
  const videoUrl = extractLocalizedText(video.videoUrl as Prisma.JsonValue, lang) || '';
  const thumbnailAlt = thumbnail?.alt || title || 'Youtube video';

  // YT.Player 초기화 (컴포넌트 마운트 시)
  useEffect(() => {
    const videoId = extractYouTubeVideoId(videoUrl);
    if (!videoId) return;

    let destroyed = false;

    loadYouTubeIframeAPI().then(() => {
      if (destroyed || !playerContainerRef.current) return;

      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        videoId,
        playerVars: {
          playsinline: 1,
          rel: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: () => {
            if (!destroyed) isPlayerReadyRef.current = true;
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsLoading(false);
            }
          },
        },
      });
    });

    return () => {
      destroyed = true;
      isPlayerReadyRef.current = false;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoUrl]);

  // 썸네일 클릭 핸들러
  const handleThumbnailClick = () => {
    if (!videoUrl) return;

    setIsPlaying(true);

    if (isPlayerReadyRef.current && playerRef.current) {
      // YT.Player가 준비된 경우: gesture window 안에서 동기 호출
      setIsLoading(false);
      playerRef.current.playVideo();
    } else {
      // 아직 준비 안 된 경우: 로딩 표시 후 onReady에서 재생
      setIsLoading(true);
    }
  };

  const handleIframeLoad = () => setIsLoading(false);

  return (
    <div className={`relative flex flex-col items-start gap-[12px] ${className}`}>
      <YoutubeVideoMediaContainer
        isPlaying={isPlaying}
        thumbnailImageSrc={imageSrc}
        thumbnailAlt={thumbnailAlt}
        videoUrl={videoUrl}
        videoTitle={title}
        isLoading={isLoading}
        playerContainerRef={playerContainerRef}
        onThumbnailClick={handleThumbnailClick}
        onThumbnailError={handleImageError}
        onIframeLoad={handleIframeLoad}
      />
      <YoutubeVideoTextContent title={title} description={description} lang={lang} />
    </div>
  );
}
