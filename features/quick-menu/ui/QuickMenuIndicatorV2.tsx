'use client';

interface QuickMenuIndicatorV2Props {
  indicatorRef: React.RefObject<HTMLDivElement | null>;
  isRtl?: boolean;
}

export function QuickMenuIndicatorV2({ indicatorRef, isRtl = false }: QuickMenuIndicatorV2Props) {
  return (
    <div className='flex flex-col items-center gap-[10px] px-5 py-0 min-[460px]:hidden'>
      <div className='relative h-[6px] w-[40px]'>
        <div className='absolute top-0 left-1/2 h-[6px] w-[40px] -translate-x-1/2 rounded-full bg-neutral-200' />
        <div
          ref={indicatorRef}
          className='absolute top-0 left-0 h-[6px] w-[24px] rounded-full bg-neutral-400'
          style={{
            transform: `translateX(${isRtl ? 16 : 0}px)`,
            willChange: 'transform',
          }}
        />
      </div>
    </div>
  );
}
