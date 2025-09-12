export function HospitalListSkeleton() {
  return (
    <div className='w-full'>
      <div className='mb-4'>
        <div className='h-6 w-48 animate-pulse rounded bg-gray-200'></div>
      </div>
      <div className='mx-auto w-full'>
        <div className='relative'>
          <div className='flex space-x-4 overflow-hidden'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='flex-shrink-0 basis-1/2 md:basis-1/3'>
                <div className='rounded-lg border border-gray-200 bg-white p-4'>
                  <div className='mb-3'>
                    <div className='h-5 w-32 animate-pulse rounded bg-gray-200'></div>
                  </div>
                  <div className='mb-3 flex items-center space-x-2'>
                    <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
                    <div className='h-4 w-12 animate-pulse rounded bg-gray-200'></div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='h-4 w-12 animate-pulse rounded bg-gray-200'></div>
                    <div className='h-6 w-8 animate-pulse rounded-full bg-gray-200'></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-4 flex justify-center space-x-2'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='h-2 w-2 animate-pulse rounded-full bg-gray-200'></div>
          ))}
        </div>
      </div>
    </div>
  );
}
