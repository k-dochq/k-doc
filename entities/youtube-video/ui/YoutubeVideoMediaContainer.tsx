'use client';

import { type RefObject } from 'react';
import { YoutubeVideoThumbnail } from './YoutubeVideoThumbnail';
import { YoutubeVideoEmbedPlayer } from './YoutubeVideoEmbedPlayer';

interface YoutubeVideoMediaContainerProps {
  isPlaying: boolean;
  thumbnailImageSrc: string;
  thumbnailAlt: string;
  videoUrl: string;
  videoTitle: string;
  isLoading: boolean;
  playerContainerRef: RefObject<HTMLDivElement | null>;
  onThumbnailClick: () => void;
  onThumbnailError: () => void;
  onIframeLoad: () => void;
}

export function YoutubeVideoMediaContainer({
  isPlaying,
  thumbnailImageSrc,
  thumbnailAlt,
  videoUrl,
  isLoading,
  playerContainerRef,
  onThumbnailClick,
  onThumbnailError,
  onIframeLoad,
}: YoutubeVideoMediaContainerProps) {
  return (
    <div className='relative h-[169px] w-full shrink-0 overflow-clip rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]'>
      {/* 플레이어는 항상 렌더링 (display:none 금지 — YT.Player 초기화 실패 원인) */}
      <YoutubeVideoEmbedPlayer
        playerContainerRef={playerContainerRef}
        isLoading={isPlaying && isLoading}
        onLoad={onIframeLoad}
      />
      {/* 재생 전: 썸네일이 플레이어 위를 덮음 */}
      {!isPlaying && (
        <div className='absolute inset-0 z-10'>
          <YoutubeVideoThumbnail
            imageSrc={thumbnailImageSrc}
            alt={thumbnailAlt}
            onClick={onThumbnailClick}
            isClickable={!!videoUrl}
            onError={onThumbnailError}
          />
        </div>
      )}
    </div>
  );
}
