interface DistrictListErrorProps {
  onRetry?: () => void;
  className?: string;
}

export function DistrictListError({ onRetry, className }: DistrictListErrorProps) {
  return (
    <div className={`flex h-full flex-col items-center justify-center ${className || ''}`}>
      <div className='flex flex-col items-center gap-3'>
        {/* 에러 아이콘 */}
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-red-50'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-red-500'
          >
            <path
              d='M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>

        {/* 에러 메시지 */}
        <div className='text-center'>
          <h3 className='text-sm font-medium text-gray-900'>지역 목록을 불러올 수 없습니다</h3>
          <p className='mt-1 text-xs text-gray-500'>잠시 후 다시 시도해주세요</p>
        </div>

        {/* 재시도 버튼 */}
        {onRetry && (
          <button
            onClick={onRetry}
            className='rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none'
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
}
