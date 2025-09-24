'use client';

import { CloseIcon } from '../close-icon';

interface ImageModalHeaderProps {
  currentIndex: number;
  totalCount: number;
  centerText?: string;
  onClose: () => void;
}

export function ImageModalHeader({
  currentIndex,
  totalCount,
  centerText,
  onClose,
}: ImageModalHeaderProps) {
  return (
    <div
      className='flex items-center justify-between bg-[#FEDBF9B2] pr-5 pl-2'
      style={{
        paddingTop: 'max(1rem, var(--safe-area-inset-top))',
        paddingBottom: '1rem',
        minHeight: 'calc(3.5rem + var(--safe-area-inset-top))', // 기본 높이 + Safe Area
      }}
    >
      {/* 왼쪽 X 버튼 */}
      <button onClick={onClose} className='rounded-full p-2 hover:bg-white/10' aria-label='닫기'>
        <CloseIcon className='h-6 w-6 text-neutral-500' color='#737373' />
      </button>

      {/* 오른쪽 영역: 센터 텍스트 또는 페이지 정보 */}
      <div className='text-lg font-semibold text-neutral-900'>
        {centerText ? centerText : `${currentIndex + 1} / ${totalCount}`}
      </div>
    </div>
  );
}
