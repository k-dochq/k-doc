'use client';

import { YoutubeVideoThumbnail } from './YoutubeVideoThumbnail';
import { YoutubeVideoEmbedPlayer } from './YoutubeVideoEmbedPlayer';

interface YoutubeVideoMediaContainerProps {
  isPlaying: boolean;
  thumbnailImageSrc: string;
  thumbnailAlt: string;
  videoUrl: string;
  videoTitle: string;
  isLoading: boolean;
  onThumbnailClick: () => void;
  onThumbnailError: () => void;
  onIframeLoad: () => void;
}

export function YoutubeVideoMediaContainer({
  isPlaying,
  thumbnailImageSrc,
  thumbnailAlt,
  videoUrl,
  videoTitle,
  isLoading,
  onThumbnailClick,
  onThumbnailError,
  onIframeLoad,
}: YoutubeVideoMediaContainerProps) {
  return (
    <div className='relative h-[169px] w-full shrink-0 overflow-clip rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]'>
      {!isPlaying ? (
        <YoutubeVideoThumbnail
          imageSrc={thumbnailImageSrc}
          alt={thumbnailAlt}
          onClick={onThumbnailClick}
          isClickable={!!videoUrl}
          onError={onThumbnailError}
        />
      ) : (
        <YoutubeVideoEmbedPlayer
          videoUrl={videoUrl}
          title={videoTitle}
          isLoading={isLoading}
          onLoad={onIframeLoad}
        />
      )}
    </div>
  );
}
