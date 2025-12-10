'use client';

interface ImageModalHeaderV2Props {
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
}

export function ImageModalHeaderV2({ currentIndex, totalCount, onClose }: ImageModalHeaderV2Props) {
  return (
    <div
      className='relative flex h-[58px] w-full items-center justify-center'
      style={{
        paddingTop: 'max(17px, var(--safe-area-inset-top))',
      }}
    >
      {/* 왼쪽 X 버튼 */}
      <button
        onClick={onClose}
        className='absolute left-5 flex size-6 items-center justify-center'
        aria-label='닫기'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M12 12L18 6M12 12L6 18M12 12L6 6M12 12L18 18'
            stroke='#A3A3A3'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {/* 가운데 페이지 정보 */}
      <p className='text-[16px] leading-[24px] font-semibold text-white'>
        {currentIndex + 1} of {totalCount}
      </p>
    </div>
  );
}
