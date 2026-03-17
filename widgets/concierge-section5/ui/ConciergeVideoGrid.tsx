'use client';

import { type Locale } from 'shared/config';

interface ConciergeVideoGridProps {
  lang: Locale;
}

export function ConciergeVideoGrid({ lang }: ConciergeVideoGridProps) {
  const base = `/images/premium_package/${lang}/video`;

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {/* video_1 — 가로형 전체 너비 (860×480) */}
      <div className='w-full overflow-hidden rounded-xl bg-[#adadad]' style={{ aspectRatio: '860 / 480' }}>
        <video
          className='h-full w-full object-cover'
          src={`${base}/premium_05_video_1.mp4`}
          autoPlay
          playsInline
          muted
          loop
          preload='auto'
        />
      </div>

      {/* video_2, video_3 — 세로형 나란히 (720×1280) */}
      <div className='flex gap-3'>
        {([2, 3] as const).map((n) => (
          <div
            key={n}
            className='flex-1 overflow-hidden rounded-xl bg-[#adadad]'
            style={{ aspectRatio: '720 / 1280' }}
          >
            <video
              className='h-full w-full object-cover'
              src={`${base}/premium_05_video_${n}.mp4`}
              autoPlay
              playsInline
              muted
              loop
              preload='auto'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
