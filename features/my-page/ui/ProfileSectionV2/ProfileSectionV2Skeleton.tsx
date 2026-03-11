export function ProfileSectionV2Skeleton() {
  return (
    <div className='flex w-full items-center gap-4'>
      <div className='size-[64px] shrink-0 animate-pulse rounded-full bg-neutral-200' />
      <div className='flex min-w-0 flex-1 flex-col items-start gap-2'>
        <div className='h-7 w-32 animate-pulse rounded bg-neutral-200' />
        <div className='h-5 w-40 animate-pulse rounded bg-neutral-200' />
      </div>
      <div className='size-[20px] shrink-0 animate-pulse rounded bg-neutral-200' />
    </div>
  );
}
