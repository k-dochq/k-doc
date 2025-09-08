export function QuickMenuSkeleton() {
  return (
    <div className='w-full'>
      <div className='mb-4'>
        <div className='h-6 w-48 animate-pulse rounded bg-gray-200'></div>
      </div>
      <div className='grid grid-cols-5 gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className='flex flex-col items-center space-y-2 rounded-lg border border-gray-200 bg-white p-3'
          >
            <div className='h-12 w-12 animate-pulse rounded-full bg-gray-200'></div>
            <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
          </div>
        ))}
      </div>
    </div>
  );
}
