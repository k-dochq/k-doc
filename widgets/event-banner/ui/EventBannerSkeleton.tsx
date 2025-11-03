export function EventBannerSkeleton() {
  return (
    <div className='w-full'>
      <div className='relative overflow-hidden rounded-xl'>
        <div className='flex gap-[11px]'>
          {/* 첫 번째 배너 스켈레톤 */}
          <div className='min-w-0 flex-[0_0_calc(50%-5.5px)]'>
            <div className='relative aspect-square w-full animate-pulse overflow-hidden rounded-xl border border-white bg-white/30 [box-shadow:1px_1px_12px_0_rgba(76,25,168,0.06),-4px_-4px_12px_1px_rgba(255,255,255,0.30)_inset]' />
          </div>
          {/* 두 번째 배너 스켈레톤 */}
          <div className='min-w-0 flex-[0_0_calc(50%-5.5px)]'>
            <div className='relative aspect-square w-full animate-pulse overflow-hidden rounded-xl border border-white bg-white/30 [box-shadow:1px_1px_12px_0_rgba(76,25,168,0.06),-4px_-4px_12px_1px_rgba(255,255,255,0.30)_inset]' />
          </div>
        </div>
      </div>

      {/* 페이징 인디케이터 스켈레톤 */}
      <div className='mt-4 flex justify-center'>
        <div className='flex items-center gap-2'>
          <div className='h-2 w-6 animate-pulse rounded-full bg-white/80' />
          <div className='h-2 w-2 animate-pulse rounded bg-white/80' />
        </div>
      </div>
    </div>
  );
}
