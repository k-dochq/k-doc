interface KdocThreadSkeletonProps {
  count?: number;
}

export function KdocThreadSkeleton({ count = 3 }: KdocThreadSkeletonProps) {
  return (
    <div className='flex flex-col px-5'>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className='flex items-center gap-3 border-b border-neutral-200 py-5'>
          <div className='h-[46px] w-[46px] flex-shrink-0 animate-pulse rounded-full bg-neutral-200' />
          <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
            <div className='flex items-center gap-2'>
              <div className='h-6 w-32 animate-pulse rounded bg-neutral-200' />
              <div className='h-4 w-16 shrink-0 animate-pulse rounded bg-neutral-200' />
            </div>
            <div className='h-5 w-3/4 animate-pulse rounded bg-neutral-200' />
          </div>
        </div>
      ))}
    </div>
  );
}
