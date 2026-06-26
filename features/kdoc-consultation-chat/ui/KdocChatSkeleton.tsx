export function KdocWelcomeSkeleton() {
  return (
    <div className='mb-4 flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        <div className='h-7 w-7 animate-pulse rounded-full bg-[#e5e5e5]' />
        <div className='h-4 w-14 animate-pulse rounded bg-[#e5e5e5]' />
      </div>
      <div className='pl-[38px]'>
        <div className='max-w-[75%] space-y-2 rounded-xl bg-[#f5f5f5] px-3 py-2'>
          <div className='h-3 w-full animate-pulse rounded bg-[#e5e5e5]' />
          <div className='h-3 w-5/6 animate-pulse rounded bg-[#e5e5e5]' />
          <div className='h-3 w-4/6 animate-pulse rounded bg-[#e5e5e5]' />
        </div>
      </div>
    </div>
  );
}

export function KdocMenuSkeleton() {
  return (
    <div className='mb-4 flex flex-col items-start gap-2 pl-[38px]'>
      {[80, 112, 128, 96].map((w, i) => (
        <div
          key={i}
          className='h-9 animate-pulse rounded-full bg-[#ede9ff]'
          style={{ width: w }}
        />
      ))}
    </div>
  );
}
