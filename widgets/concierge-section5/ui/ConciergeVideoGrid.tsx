'use client';

const VIDEO_SRC = '/images/event/donation_water/en/donation_03_video.mp4';

export function ConciergeVideoGrid() {
  return (
    <div className='mt-6'>
      <div className='flex flex-col gap-3'>
        {([0, 1] as const).map((row) => (
          <div key={row} className='flex gap-[11px]'>
            {([0, 1] as const).map((col) => (
              <div
                key={col}
                className='flex-1 overflow-hidden rounded-xl bg-[#adadad]'
                style={{ aspectRatio: '162 / 288' }}
              >
                <video
                  className='h-full w-full object-cover'
                  src={VIDEO_SRC}
                  autoPlay
                  playsInline
                  muted
                  loop
                  preload='auto'
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
