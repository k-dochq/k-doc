/// <reference types="youtube" />

let apiReadyPromise: Promise<void> | null = null;

/**
 * YouTube IFrame Player API를 한 번만 로드하는 싱글톤 로더.
 * 이미 로드된 경우 즉시 resolve되는 Promise를 반환합니다.
 */
export function loadYouTubeIframeAPI(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  if (apiReadyPromise) return apiReadyPromise;

  if (window.YT?.Player) {
    apiReadyPromise = Promise.resolve();
    return apiReadyPromise;
  }

  apiReadyPromise = new Promise<void>((resolve) => {
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevCallback?.();
      resolve();
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }
  });

  return apiReadyPromise;
}

/**
 * YouTube embed URL 또는 일반 URL에서 video ID를 추출합니다.
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 */
export function extractYouTubeVideoId(url: string): string | null {
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&/]+)/);
  if (embedMatch) return embedMatch[1];

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];

  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/);
  if (shortMatch) return shortMatch[1];

  return null;
}
