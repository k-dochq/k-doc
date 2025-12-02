'use client';

interface QuickMenuIndicatorV2Props {
  scrollProgress: number; // 0~1 사이 값
}

export function QuickMenuIndicatorV2({ scrollProgress }: QuickMenuIndicatorV2Props) {
  const maxOffset = 16; // 40px - 24px
  const offset = scrollProgress * maxOffset;

  return (
    <div className='flex flex-col items-center gap-[10px] px-5 py-0'>
      <div className='relative h-[6px] w-[40px]'>
        <div className='absolute top-0 left-1/2 h-[6px] w-[40px] -translate-x-1/2 rounded-full bg-neutral-200' />
        <div
          className='absolute top-0 h-[6px] w-[24px] rounded-full bg-neutral-400 transition-transform duration-100'
          style={{ transform: `translateX(${offset}px)` }}
        />
      </div>
    </div>
  );
}
