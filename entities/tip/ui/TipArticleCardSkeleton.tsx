export function TipArticleCardSkeleton() {
  return (
    <div className='flex animate-pulse items-center gap-3'>
      <div className='h-[100px] w-[150px] shrink-0 rounded-xl bg-neutral-200' />
      <div className='flex min-w-0 flex-1 flex-col gap-2'>
        <div className='h-4 w-12 rounded-full bg-neutral-200' />
        <div className='h-5 w-full rounded bg-neutral-200' />
        <div className='h-5 w-3/4 rounded bg-neutral-200' />
        <div className='flex items-center gap-2'>
          <div className='h-3 w-20 rounded bg-neutral-100' />
          <div className='h-3 w-8 rounded bg-neutral-100' />
        </div>
      </div>
    </div>
  );
}

export function TipArticleCardSkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className='flex flex-col gap-4 pt-4'>
      {Array.from({ length: count }, (_, i) => (
        <TipArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}
