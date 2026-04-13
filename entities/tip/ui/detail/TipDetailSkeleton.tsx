export function TipDetailSkeleton() {
  return (
    <div className='animate-pulse'>
      <div className='flex flex-col items-center gap-2 pt-5 pb-5'>
        <div className='h-5 w-12 rounded-full bg-neutral-200' />
        <div className='h-7 w-4/5 rounded bg-neutral-200' />
        <div className='h-7 w-3/5 rounded bg-neutral-200' />
        <div className='h-4 w-20 rounded bg-neutral-100' />
      </div>
      <div className='space-y-3 pt-5'>
        <div className='aspect-[16/9] w-full rounded-xl bg-neutral-200' />
        <div className='h-4 w-full rounded bg-neutral-200' />
        <div className='h-4 w-full rounded bg-neutral-200' />
        <div className='h-4 w-2/3 rounded bg-neutral-200' />
      </div>
    </div>
  );
}
