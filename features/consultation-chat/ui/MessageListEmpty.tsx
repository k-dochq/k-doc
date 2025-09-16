'use client';

export function MessageListEmpty() {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className='text-center'>
        <div className='mb-4 text-6xl'>💬</div>
        <h2 className='mb-2 text-xl font-semibold text-gray-700'>상담을 시작해보세요</h2>
        <p className='text-gray-500'>궁금한 것이 있으면 언제든 물어보세요!</p>
      </div>
    </div>
  );
}
