'use client';

import { type RefObject } from 'react';

interface YoutubeVideoEmbedPlayerProps {
  playerContainerRef: RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  onLoad: () => void;
}

export function YoutubeVideoEmbedPlayer({
  playerContainerRef,
  isLoading,
  onLoad,
}: YoutubeVideoEmbedPlayerProps) {
  return (
    <div className='relative h-full w-full'>
      {isLoading && (
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-gray-900'>
          <div className='h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-white'></div>
        </div>
      )}
      {/* YT.Player가 이 div 안에 iframe을 주입합니다. display:none 없이 항상 렌더링. */}
      <div ref={playerContainerRef} className='h-full w-full' />
    </div>
  );
}
