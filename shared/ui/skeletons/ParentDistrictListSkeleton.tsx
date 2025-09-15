export function ParentDistrictListSkeleton() {
  return (
    <div className='flex h-full flex-col items-start justify-start'>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className='flex w-full items-start gap-0.5 px-6 py-3'>
          <div className='h-6 w-20 animate-pulse rounded bg-gray-200' />
        </div>
      ))}
    </div>
  );
}
