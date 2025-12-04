'use client';

interface YoutubeVideoEmbedPlayerProps {
  videoUrl: string;
  title: string;
  isLoading: boolean;
  onLoad: () => void;
}

export function YoutubeVideoEmbedPlayer({
  videoUrl,
  title,
  isLoading,
  onLoad,
}: YoutubeVideoEmbedPlayerProps) {
  // URL에 autoplay와 enablejsapi 파라미터 추가
  const embedUrl = `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1&enablejsapi=1`;

  return (
    <div className='relative h-full w-full'>
      {isLoading && (
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-gray-900'>
          <div className='h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-white'></div>
        </div>
      )}
      <iframe
        width='100%'
        height='100%'
        src={embedUrl}
        title={title || 'YouTube video player'}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
        className='h-full w-full'
        onLoad={onLoad}
      />
    </div>
  );
}
