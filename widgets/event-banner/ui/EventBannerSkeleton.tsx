export function EventBannerSkeleton() {
  return (
    <div className='w-full'>
      <div className='relative aspect-[335/140] w-full animate-pulse overflow-hidden rounded-xl bg-white/50'>
        {/* 페이징 인디케이터 스켈레톤 */}
        <div className='absolute right-3 bottom-3'>
          <div className='h-5 w-12 rounded-full bg-white/50' />
        </div>
      </div>
    </div>
  );
}
